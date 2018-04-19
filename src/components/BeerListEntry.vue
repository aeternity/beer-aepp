<template>
  <div class="beerListEntryRow">
    <div class="cell hash">
      {{beerHash.substring(3,9)}} <router-link v-if="wasMined && !wasCollected" :to="{name: 'beer', params: {beerHash: beerHash}}">collect</router-link>
    </div>
    <div class="cell mined">
      {{wasMined ? 'bought' : 'buying'}}
    </div>
    <div class="cell collected">
      {{wasCollected ? 'collected' : 'ready'}}
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
    },
    wasCollected () {
      return this.beerApiState > 0
    }
  },
  data () {
    return {
      beerTx: null,
      beerApiState: 1
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
        this.$socket.emit('get_beer_state', txHash, (beerState) => {
          // console.log('beerState', beerState)
          if (Number.isInteger(beerState.state)) {
            return resolve(beerState.state)
          }
          return reject(new Error('Error asking beer status'))
        })
      })
    }
  },
  async mounted () {
    if (this.beerHash) {
      this.beerTx = await this.client.tx.getTransaction(this.beerHash)
      this.beerApiState = await this.getBeerState(this.beerHash)
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
