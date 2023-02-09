import { createStore } from 'vuex'


export default createStore({
  state: {
    movieId:1242,
    videoId:12639009,
    id:1224712,

  },
  getters: {
  },
  mutations: {
    detail(state,id){
      state.id=id
    },
    setMovieId(state,value){
    
      state.movieId=value
    },


    setVideoId(state,value){
      // console.log(value);
      state.videoId=value

    },
    setShortVideoId(state,value){
      // console.log(value);
      state.shortVideoId=value
    }
  },
  actions: {
    
  },
  modules: {
  }
})
