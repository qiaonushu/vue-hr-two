import { LoginAPI, PostProfileAPI, GetUserAPI } from '@/api'
import { getToken, setToken, removeToken } from '@/utils/auth'
// import { resetRouter } from '@/router'

const user = {
  namespaced: true,
  state() {
    return {
      token: getToken() || null,
      userInfo: {},
      roleTotal: 0
    }
  },
  mutations: {
    setToken(state, val) {
      state.token = val
      setToken(val)
    },
    removeToken(state) {
      state.token = null
      removeToken()
    },
    setUserInfo(state, val) {
      state.userInfo = val
    },
    setroleTotal(state, val) {
      state.roleTotal = val
    }
  },
  actions: {
    // 调用登录接口
    async Login(store, data) {
      const res = await LoginAPI(data)
      store.commit('setToken', res.data)
    },
    async  PostProfile(store) {
      const res = await PostProfileAPI()
      const data = await GetUserAPI(res.data.userId)
      store.commit('setUserInfo', { ...res.data, ...data.data })
    },
    logOut(store) {
      store.commit('removeToken')
      store.commit('setUserInfo', {})
    }
  }
}

export default user
