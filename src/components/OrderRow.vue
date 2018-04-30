<template>
  <div class="order-row">
    <div>{{noOfBeer}} Beer</div>
    <div>
      <span v-if="!wasMined">
        <ae-loader />
      </span>
      <span v-if="wasMined && !wasScanned"></span>
      <span v-if="wasMined && wasScanned">
        <ae-icon name="check" />
      </span>
    </div>
    <div class="arrow">
      <ae-icon name="arrow" />
    </div>
  </div>
</template>

<script>
import { AeIcon, AeLoader } from '@aeternity/aepp-components'

export default {
  name: 'OrderRow',
  components: {
    AeIcon,
    AeLoader
  },
  computed: {
    account () {
      return this.$store.state.account
    },
    client () {
      return this.$store.getters.client
    },
    wasMined () {
      if (!this.beerTx) {
        return false
      }
      return this.beerTx.block_height >= 0
    },
    noOfBeer () {
      if (this.beerTx && this.beerTx.tx && this.beerTx.tx.amount) {
        return Math.ceil(this.beerTx.tx.amount / this.$store.state.beerPrice)
      }
      return ''
    }
  },
  data () {
    return {
      beerTx: null,
      wasScanned: false
    }
  },
  props: {
    beerHash: {
      type: String
    }
  },
  methods: {
    async getBeerState (txHash) {
      return new Promise((resolve, reject) => {
        console.log('asking beer state')
        this.$socket.emit('was_beer_scanned', txHash, (beerState) => {
          console.log('beerState', beerState)
          if (beerState && typeof beerState.scanned === 'boolean') {
            return resolve(beerState.scanned)
          }
          return reject(new Error('Error asking beer status'))
        })
      })
    }
  },
  async mounted () {
    if (this.beerHash) {
      try {
        this.beerTx = await this.client.tx.getTransaction(this.beerHash)
        this.wasScanned = await this.getBeerState(this.beerHash)
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .orderRow {
    display: flex;
    // flex-wrap: wrap;
    border: 1px solid black;
    margin-bottom: 5px;
    padding: 15px;
  }

  .cell {
    width: 33.33%;
    box-sizing: border-box;
    flex-grow: 1;
    overflow: hidden;
    list-style: none;
  }
  .order-row div {
    flex:1;
  }
  .order-row  .ae-icon {
    // transform: rotate(-40deg);
  }
</style>
