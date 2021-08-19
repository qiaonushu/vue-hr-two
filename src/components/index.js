import Pagetools from './Pagetools'

const MyPlugin = {
  install(Vue) {
    Vue.component('Pagetools', Pagetools)
  }
}

export default MyPlugin

