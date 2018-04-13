<template>
  <div class="send">
    <div v-if="state === 'qrcode'">
      <div class="loader" v-if="loading">
        <ae-loader></ae-loader> Loading
      </div>
      <qrcode-reader @decode="onDecode" @init="onInit"></qrcode-reader>
      <ae-button @click="state = 'input'">Skip</ae-button>
    </div>
    <div v-if="state === 'input'" class="input">
      <ae-button v-if="hasCamera" @click="startQrCode()">Read Code</ae-button>
      <ae-label for="receiver" :help-text="errors.first('receiver')">Receiver</ae-label>
      <ae-input id="receiver" name="receiver" v-model="receiver" v-validate="{regex: /^(\w+.(aet|test)|ak\$[123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ]{94})$/i}"></ae-input>
      <ae-label for="amount" :help-text="errors.first('amount')">Amount</ae-label>
      <ae-amount-input
        id="amount"
        v-model="amount"
        name="amount"
        :units="units"
        v-validate:amountInt="`required|integer|min_value:1|max_value:${maxAmount}`"
        data-vv-delay="1"
        placeholder="0.00"></ae-amount-input>
      <ae-button
        @click="sendTokens"
        type="dramatic"
        class="send-button"
        :inactive="errors.any()"
        >
        Send</ae-button>
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
import { AeButton, AeInput, AeAddressInput, AeAmountInput, AeLabel, AeLoader } from '@aeternity/aepp-components'
import { QrcodeReader } from 'vue-qrcode-reader'

export default {
  name: 'Send',
  components: {
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
      hasCamera: false
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
