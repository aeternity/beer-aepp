<template>
  <div class="beerListEntryRow">
    <div class="cell hash">
      {{beerHash.substring(3,9)}} <router-link v-if="wasMined && !wasScanned" :to="{name: 'beer', params: {beerHash: beerHash}}">collect</router-link>
    </div>
    <div class="cell mined">
      {{wasMined ? 'bought' : 'buying'}}
    </div>
    <div class="cell collected">
      {{wasScanned ? 'collected' : 'ready'}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'BeerListEntry',
  components: {
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
  .beerListEntryRow {
    display: flex;
    flex-wrap: wrap;
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
</style>
