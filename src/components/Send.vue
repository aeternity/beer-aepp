<template>
  <div class="send">
    <div v-if="state === 'qrcode'" class="shell">
      <div class="close cross" @click="state = 'input'" style="position:absolute;top:10vh;right:5vw;">
        <p>+</p>
      </div>
      <h1 class="screen-title" style="margin-top:10vh;">
        Scan QR
      </h1>
      <p class="screen-subtitle">
        From somebody who you want to send your tokens to. They need to reveil their QR Code in the ‘Receive’ tab.
      </p>
      <div class="loader" v-if="loading">
        <ae-loader></ae-loader> Loading
      </div>
      <div class="qr-warning" v-if="qrWarning">
        {{qrWarning}}
      </div>
      <qrcode-reader @decode="onDecode" @init="onInit"></qrcode-reader>
    </div>
    <div v-if="state === 'input'" class="input shell">
      <h1 class="screen-title">
        Give Tokens
      </h1>
      <p class="screen-subtitle">
        Not such a beer drinker? Transfer <br>
        tokens to someone who is!
      </p>
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
      <!-- <span v-if="!isSameAddress">It seems you are trying to send tokens to yourself! Why tho?</span> -->
      <div class="actions" v-if="receiver">
        <ae-button

        @click="modalVisible = true"
        type="dramatic"
        class="send-button"
        :inactive="errors.any()"
        >
        💸 Send Tokens</ae-button>
      </div>
      <ae-modal-light
              v-if="modalVisible == true"
              @close="modalVisible = false">
            <div class="icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="27" height="31" viewBox="0 0 27 31">
                  <path fill="#F7296E" fill-rule="evenodd" d="M26.803 6.571c-.243-1.293-.858-2.47-1.732-3.318-.915-.888-2.079-1.376-3.274-1.376-.23 0-.464.02-.698.058C20.135.756 18.809.09 17.395.09 16.32.09 15.29.48 14.427 1.2 13.543.42 12.473 0 11.35 0 9.856 0 8.445.763 7.478 2.067a4.398 4.398 0 0 0-1.276-.191c-1.196 0-2.358.49-3.274 1.376-.875.848-1.49 2.026-1.732 3.318-.08.423-.12.859-.12 1.294 0 1.802.688 3.488 1.863 4.62C1.23 13.069 0 14.678 0 16.574V18.3c0 2.39 1.952 4.329 4.358 4.329h.28v4.76C4.637 29.384 6.422 31 8.624 31H19.43c2.203 0 3.987-1.616 3.987-3.611V13.545c.105-.04.21-.083.312-.133 1.94-.92 3.193-3.099 3.193-5.548a6.747 6.747 0 0 0-.118-1.293zM4.895 21.211c-1.401-.284-2.448-1.387-2.448-2.709v-1.11c0-1.32 1.047-2.423 2.448-2.708v6.527zm18.04-8.87c-.419.2-.856.3-1.303.3-1.043 0-2.042-.565-2.74-1.548a.722.722 0 0 0-1.266.174c-.59 1.65-1.903 2.718-3.346 2.718-.183 0-.38-.022-.596-.066a.72.72 0 0 0-.867.706v5.506c0 1.045-1.026 1.895-2.288 1.895-1.26 0-2.287-.85-2.287-1.895v-7.055a.719.719 0 0 0-.995-.666c-1.049.43-2.174.243-3.081-.469-1.076-.846-1.719-2.29-1.719-3.864 0-.348.033-.696.095-1.033.382-2.047 1.881-3.532 3.566-3.532.422 0 .843.095 1.254.283a.72.72 0 0 0 .92-.288c.692-1.174 1.795-1.875 2.95-1.875.93 0 1.817.44 2.501 1.24a.72.72 0 0 0 1.083.014c.675-.751 1.539-1.165 2.43-1.165 1.075 0 2.093.59 2.793 1.618a.724.724 0 0 0 .79.29 2.95 2.95 0 0 1 .8-.116c1.685 0 3.185 1.486 3.566 3.532.063.338.094.686.094 1.034.005 1.873-.944 3.587-2.355 4.261z"/>
              </svg>
            </div>
            <h1 class="modal-title">
              beer app
            </h1>
            <p class="modal-subtitle">
              requests a transaction
            </p>
            <div class="row" style="display:flex;align-items:center;">
                <div>
                  <ae-identity-avatar :address="account.pub"></ae-identity-avatar>
                </div>
                <div>
                  <ae-icon name="arrow" />
                </div>
                <div>
                  <ae-identity-avatar :address="barPubKey"></ae-identity-avatar>
                </div>
              </div>
              <div class="row" style="display:flex;align-items:center;">
                <div>
                  <p class="modal-address-name">
                    {{account.name}}
                  </p>
                </div>
                <div></div>
                <div>
                  <p class="modal-address-name">
                    <ae-address size='short' :address="receiver"/>
                  </p>
                </div>
              </div>
              <ae-divider />
              <div class="summary">
                <h4 class="modal-token-amount">
                  {{amount.amount}}
                  <span class="modal-token-amount-sub">tokens</span>
                </h4>
                <h5 class="modal-beer-count">
                  {{beerCount}} beer(s)
                </h5>
              </div>
              <ae-divider />
              <div class="fees">
                <div>
                  <strong>
                    Additional fees
                  </strong>
                </div>
                <div>
                  <strong>
                    1
                  </strong>
                </div>
              </div>
              <ae-button
                size="smaller"
                type="exciting"
                uppercase
                @click="modalVisible = false"
                slot="buttons"
              >cancel</ae-button>
              <ae-button
                size="smaller"
                type="dramatic"
                uppercase
                @click="sendTokens()"
                slot="buttons"
              >send</ae-button>
            </ae-modal-light>
    </div>
    <div class="link shell" v-if="isSameAddress">
      <h1 class="screen-title">
        🤷‍♂️
      </h1>
      <h1 class="screen-title">
        Why send money to yourself?
      </h1>
      <p class="screen-subtitle">
        Scanning your own code <br>
        doesn’t make any sense. Scan <br>
        another one.
      </p>
    </div>
    <div v-if="state === 'waiting'" class="waiting">
      <div style="font-size:50px;margin-top:15vh;">
        <ae-loader /> Waiting
      </div>
    </div>
    <div v-if="state === 'done'" class="done">
      Done
    </div>
  </div>
</template>

<script>
import { AeButton, AeInput, AeAddressInput, AeAmountInput, AeLabel, AeLoader, AeAddress, AeModalLight, AeIdentityAvatar, AeIcon, AeDivider } from '@aeternity/aepp-components'
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
    QrcodeReader,
    AeModalLight,
    AeIdentityAvatar,
    AeIcon,
    AeDivider
  },
  data () {
    return {
      domainInput: null,
      receiver: null,
      amount: {
        amount: 0,
        symbol: 'BT'
      },
      units: [
        { symbol: 'TOKENS', name: 'Beer Token' }
      ],
      state: 'qrcode',
      loading: true,
      hasCamera: false,
      qrWarning: null,
      domainError: null,
      modalVisible: false
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
    },
    beerCount () {
      return parseInt(this.amount.amount / 1000)
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
label {
  text-transform:capitalize;
  font-size:18px;
  line-height:1.58;
  color: #1e1e1e;
  text-align:left;
  font-weight:700;
}
</style>
