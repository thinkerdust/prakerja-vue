<template>

  <v-container v-if="loading">
    <div class="text-xs-center">
        <v-progress-circular
          indeterminate
          :size="150"
          :width="8"
          color="yellow">
        </v-progress-circular>
      </div>
  </v-container>

  <v-container v-else>
    <v-layout wrap>
      <v-flex xs12 mr-1 ml-1>
        <v-card>
          <v-img
            :src="'https://restaurant-api.dicoding.dev/images/medium/'+detailRestaurant.pictureId"
            aspect-ratio="2"
          ></v-img>
          <v-card-title primary-title>
            <div>
              <h2 class="headline mb-0">{{detailRestaurant.name}}</h2>
              <p>{{ detailRestaurant.description}} </p>
              <h3>Address:</h3>{{detailRestaurant.address}} - {{detailRestaurant.city}}
              <h4>Rating:</h4> {{detailRestaurant.rating}}
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn flat color="black" @click="back">back</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>

    <v-layout row wrap>
      <v-flex xs12>
        <div class="text-xs-center">
        <v-dialog
          v-model="dialog"
          width="500">
          <v-btn
            slot="activator"
            color="blue"
            dark>
            View Menu
          </v-btn>
          <v-card>
            <v-card-title
              class="headline grey lighten-2"
              primary-title
            >
              List Menus
            </v-card-title>
            <v-card-text>
              <table style="width:100%" border="1" >
                <tr>
                  <th>No</th>
                  <th>Menu</th>
                </tr>
                <tr v-for="(menu,index) in this.menus" :key="index">
                  <td align="center">{{index+1}}</td>
                  <td align="center">{{menus[index].name}}</td>
                </tr>
              </table>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                flat
                @click="dialog = false"
              >
                OK
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import restaurantApi from '@/services/RestaurantApi'
export default {
  props: ['id'],

  data () {
    return {
      detailRestaurant: '',
      dialog: false,
      loading: true,
      menus: []
    }
  },

  mounted () {
    restaurantApi.getDetailRestaurant(this.id)
      .then(response => {
        console.log(response)
        this.detailRestaurant = response
        this.menus = this.detailRestaurant.menus.foods
        this.menus = this.detailRestaurant.menus.drinks
        this.loading = false
      })
      .catch(error => {
        console.log(error)
      })
  },
  methods: {
    back () {
      this.$router.push('/')
    }
  }
}

</script>

<style lang="stylus" scoped>
  .v-progress-circular
    margin: 1rem
</style>
