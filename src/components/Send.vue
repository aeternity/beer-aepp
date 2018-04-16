<template>
  <div class="send">
    <div v-if="state === 'qrcode'">
      <div class="loader" v-if="loading">
        <ae-loader></ae-loader> Loading
      </div>
      <div class="qr-warning" v-if="qrWarning">
        {{qrWarning}}
      </div>
      <qrcode-reader @decode="onDecode" @init="onInit"></qrcode-reader>
      <ae-button @click="state = 'input'">Skip</ae-button>
    </div>
    <div v-if="state === 'input'" class="input">
      <div class="domainInput" v-if="!receiver">
        <ae-label for="receiver" :help-text="errors.first('receiver')">Receiver Name</ae-label>
        <ae-input id="receiver" name="receiver" v-model="domainInput" v-validate="`min:3`"></ae-input>
        <span v-if="domainError">{{domainError}}</span>
        <ae-button @click="lookupDomain()">lookupDomain</ae-button>
        <ae-button v-if="hasCamera" @click="startQrCode()">Read QR Code</ae-button>
      </div>
      <div class="privateKeyInput" v-if="receiver">
        <ae-label>Receiver Public Key</ae-label>
        <ae-address show-avatar size='short' :address="receiver"/>
      </div>
      <div class="amount" v-if="receiver">
        <ae-label for="amount" :help-text="errors.first('amount')">Amount</ae-label>
        <ae-amount-input
        id="amount"
        v-model="amount"
        name="amount"
        :units="units"
        v-validate:amountInt="`required|integer|min_value:1|max_value:${maxAmount}`"
        data-vv-delay="1"
        placeholder="0.00"></ae-amount-input>
      </div>
      <span v-if="isSameAddress">It seems you are trying to send tokens to yourself! Why tho?</span>
      <div class="actions" v-if="receiver">
        <ae-button
        @click="sendTokens"
        type="dramatic"
        class="send-button"
        :inactive="errors.any()"
        >
        Send</ae-button>
      </div>
    </div>
    <div v-if="state === 'waiting'" class="waiting">
      <ae-loader /> Waiting
    </div>
    <div v-if="state === 'done'" class="done">
      Done
    </div>
  </div>
</template>

<script>
import { AeButton, AeInput, AeAddressInput, AeAmountInput, AeLabel, AeLoader, AeAddress } from '@aeternity/aepp-components'
import { QrcodeReader } from 'vue-qrcode-reader'

export default {
  name: 'Send',
  components: {
    AeAddress,
    AeInput,
    AeButton,
    AeAddressInput,
    AeAmountInput,
    AeLabel,
    AeLoader,
    QrcodeReader
  },
  data () {
    return {
      domainInput: null,
      receiver: null,
      amount: {
        amount: 0,
        symbol: 'Æ'
      },
      units: [
        { symbol: 'Æ', name: 'æternity' }
      ],
      state: 'qrcode',
      loading: true,
      hasCamera: false,
      qrWarning: null,
      domainError: null
    }
  },
  computed: {
    account () {
      return this.$store.state.account
    },
    wallet () {
      return {
        priv: this.account.priv,
        pub: this.account.pub
      }
    },
    balance () {
      return this.$store.state.balance
    },
    maxAmount () {
      if (this.balance > 0) {
        return this.balance - 1
      }
      return 0
    },
    amountInt () {
      if (!this.amount && !this.amount.amount) {
        return 0
      }
      return parseInt(this.amount.amount)
    },
    client () {
      return this.$store.getters.client
    },
    isSameAddress () {
      return this.receiver === this.account.pub
    }
  },
  methods: {
    async sendTokens () {
      if (!await this.$validator.validateAll()) return
      try {
        const spendTx = await this.client.base.spend(this.receiver, this.amountInt, this.wallet, {fee: 1})
        this.state = 'waiting'
        console.log('spendTx', spendTx)
        await this.client.tx.waitForTransaction(spendTx['tx_hash'])
        this.state = 'done'
      } catch (err) {
        console.log(err)
        this.state = 'input'
      }
    },
    onDecode (content) {
      console.log(content)
      // check valid address
      if (this.isValidAddress(content)) {
        this.receiver = content
        this.state = 'input'
      } else if (/^https?:\/\/aet\.li/.test(content)) {
        this.qrWarning = 'Somebody let you scan their private key. This is terrible. Please tell them to let you scan the other code.'
      }
    },
    async onInit (promise) {
      console.log('onInit')
      try {
        await promise
        this.hasCamera = true
      } catch (e) {
        console.log(e)
        this.hasCamera = false
        this.state = 'input'
      } finally {
        // hide loader
        this.loading = false
      }
    },
    startQrCode () {
      this.state = 'qrcode'
      this.loading = true
    },
    isValidAddress (value) {
      const regex = /^(\w+.(aet|test)|ak\$[123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ]{94})$/i
      return regex.test(value)
    },
    async lookupDomain () {
      this.domainError = null
      let domain = this.domainInput.toLowerCase()
      if (!domain.endsWith('.aet')) {
        domain += '.aet'
      }
      try {
        const domainData = await this.client.aens.getName(domain)
        if (!domainData) {
          this.domainError = 'Domain not found. Check for typos'
        }
        if (domainData && domainData.pointers && typeof domainData.pointers === 'string') {
          domainData.pointers = JSON.parse(domainData.pointers)
        }
        console.log('domainData', domainData)
        if (domainData.pointers && domainData.pointers.account_pubkey) {
          this.receiver = domainData.pointers.account_pubkey
        }
      } catch (err) {
        console.log(err)
        this.domainError = 'Domain lookup error. ' + err.message
      }
    }
  },
  async mounted () {
    // refresh balance once
    await this.$store.dispatch('updateBalance')
    this.amount.amount = this.maxAmount
  }
}
</script>

<style scoped lang="scss">

</style>
