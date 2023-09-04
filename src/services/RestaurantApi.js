import axios from 'axios'

export default {
  getRestaurantCollection () {
    return axios.get('/list')
      .then(response => {
        return response.data.restaurants
      })
  },

  getDetailRestaurant (id) {
    return axios.get('/detail/' + id)
      .then(response => {
        return response.data.restaurant
      })
  },

  searchRestaurant (q) {
    return axios.get('/search?q=' + q)
      .then(response => {
        return response.data.restaurants
      })
  }
}
