import router from './router'
import store from './store'
// import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
// import 'nprogress/nprogress.css' // progress bar style
// import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'
import { asyncRoutes } from './router'

// NProgress.configure({ showSpinner: false }) // NProgress Configuration

// const whiteList = ['/login'] // no redirect whitelist

// router.beforeEach(async(to, from, next) => {
//   // start progress bar
//   NProgress.start()
// 设置页面标题
router.beforeEach((to, from, next) => {
  document.title = getPageTitle(to.meta.title)
  next()
})

const arr = ['/login', '/404']
router.beforeEach(async(to, from, next) => {
  NProgress.start()
  const token = store.state.user.token
  if (token) {
    if (to.path === '/login') {
      next('/')
    } else {
      if (!store.getters.userId) {
        await store.dispatch('user/PostProfile')
        // 用户实际能访问的页面
        const menu = store.state.user.userInfo.roles.menus
        // 根据本用户实际的权限menus去 asyncRoutes 中做过滤，选出本用户能访问的页面
        const arr = asyncRoutes.filter(item => {
          const name = item.children[0].name
          return menu.includes(name)
        })
        // 404
        arr.push({ path: '*', redirect: '/404', hidden: true })
        // 根据用户实际能访问几个页面来决定从整体8个路由设置中，过滤中出来几个，然后保存到vuex中
        store.commit('menus/setmenuList', arr)
        // 改写成动态添加的方式
        router.addRoutes(arr)
        // 解决刷新白屏
        next({
          ...to,
          replace: true
        })
        // 我的解决刷新白屏思路
        // next(router.replace(to.path))
      }
      next()
    }
  } else {
    if (arr.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
//   // set page title
//   document.title = getPageTitle(to.meta.title)

//   // determine whether the user has logged in
//   const hasToken = getToken()

//   if (hasToken) {
//     if (to.path === '/login') {
//       // if is logged in, redirect to the home page
//       next({ path: '/' })
//       NProgress.done()
//     } else {
//       const hasGetUserInfo = store.getters.name
//       if (hasGetUserInfo) {
//         next()
//       } else {
//         try {
//           // get user info
//           await store.dispatch('user/getInfo')

//           next()
//         } catch (error) {
//           // remove token and go to login page to re-login
//           await store.dispatch('user/resetToken')
//           Message.error(error || 'Has Error')
//           next(`/login?redirect=${to.path}`)
//           NProgress.done()
//         }
//       }
//     }
//   } else {
//     /* has no token*/

//     if (whiteList.indexOf(to.path) !== -1) {
//       // in the free login whitelist, go directly
//       next()
//     } else {
//       // other pages that do not have permission to access are redirected to the login page.
//       next(`/login?redirect=${to.path}`)
//       NProgress.done()
//     }
//   }
// })

