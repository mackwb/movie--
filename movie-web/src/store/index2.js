import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";


export default createStore({
  state: {
    movieId: 1242,
    videoId: 12639009,
    id: 1224712,
    token: ''

  },
  getters: {
  },
  mutations: {
    detail(state, id) {
      state.id = id
    },
    setMovieId(state, value) {
      state.movieId = value
    },

    setVideoId(state, value) {
      // console.log(value);
      state.videoId = value
    },
    setShortVideoId(state, value) {
      // console.log(value);
      state.shortVideoId = value
    },
    updateToken(state,value){
      state.token = value
    }
  },
  actions: {

  },
  modules: {
  },
  plugins: [createPersistedState({
    paths: ['token']
  })],
})
