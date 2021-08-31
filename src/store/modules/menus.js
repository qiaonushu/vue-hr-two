import { constantRoutes } from '@/router'

export default {
  namespaced: true,
  state() {
    return {
      menuList: [...constantRoutes]
    }
  },
  mutations: {
    setmenuList(state, val) {
      state.menuList = [...constantRoutes, ...val]
    }
  }
}
