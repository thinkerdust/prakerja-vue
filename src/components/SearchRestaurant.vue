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

  <v-container v-else-if="noData">
    <div class="text-xs-center">
    <h2>Restaurant with name : {{this.name}}, Not Found!</h2>
    </div>
  </v-container>

  <v-container v-else grid-list-xl>
    <v-layout wrap>
      <v-flex xs4
        v-for="(item, index) in restaurantResponse"
        :key="index"
        mb-2>
        <v-card>
          <v-img
            :src="'https://restaurant-api.dicoding.dev/images/medium/'+item.pictureId"
            aspect-ratio="1"
          ></v-img>

          <v-card-title primary-title>
            <div>
              <h2>{{item.name}}</h2>
              <h5>City: {{item.city}}</h5>
              <div>Description: {{item.description}}</div>
              <h3 class="red--text">Rating: {{item.rating}}</h3>
            </div>
          </v-card-title>

          <v-card-actions class="justify-center">
            <v-btn flat
              color="green"
              @click="detailRestaurant(item.imdbID)"
              >View</v-btn>
          </v-card-actions>

        </v-card>
      </v-flex>
  </v-layout>
  </v-container>
</template>

<script>
import restaurantApi from '@/services/RestaurantApi'

export default {
  props: ['name'],
  data () {
    return {
      restaurantResponse: [],
      loading: true,
      noData: false
    }
  },
  methods: {
    detailRestaurant (id) {
      this.$router.push('/restaurant/' + id)
    },

    fetchResult (value) {
      restaurantApi.searchRestaurant(value)
        .then(response => {
          console.log(response)
          if (response.length > 0) {
            this.restaurantResponse = response
            this.loading = false
            this.noData = false
          } else {
            this.noData = true
            this.loading = false
          }
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  mounted () {
    this.fetchResult(this.name)
  },
  watch: {
    name (value) {
      this.fetchResult(value)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .v-progress-circular
    margin: 1rem
</style>
