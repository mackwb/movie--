import { createStore } from 'vuex'

import createPersistedState from "vuex-persistedstate";//持久化

//模块化+状态管理 
//命名空见
const store = createStore({
    modules: {
      mes

    },
    plugins: [createPersistedState({
      paths: ['users.token']
    })],
  })

export default store

