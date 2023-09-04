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

  <v-container v-else grid-list-xl>
    <v-layout wrap>
      <v-flex xs4
        v-for="(item, index) in wholeResponse"
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
              color="blue"
              @click="detailRestaurant(item.id)"
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
  data () {
    return {
      wholeResponse: [],
      loading: true
    }
  },
  mounted () {
    restaurantApi.getRestaurantCollection()
      .then(response => {
        this.wholeResponse = response
        this.loading = false
      })
      .catch(error => {
        console.log(error)
      })
  },
  methods: {
    detailRestaurant (id) {
      this.$router.push('/restaurant/' + id)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .v-progress-circular
    margin: 1rem
</style>
