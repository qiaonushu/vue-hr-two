import request from '@/utils/request'

// 登录接口
export function LoginAPI(data) {
  return request({
    url: '/sys/login',
    method: 'post',
    data
  })
}

// 获取用户基本资料
export function PostProfileAPI() {
  return request({
    url: '/sys/profile',
    method: 'post'
  })
}

// 获取员工列表
export const GetUserAPI = (id) => {
  return request({
    url: '/sys/user/' + id
  })
}

// 获取员工简单列表
export const GetSimpleAPI = () => {
  return request({
    url: '/sys/user/simple'
  })
}

export const GetSysRoleAPI = params => {
  return request({
    url: '/sys/role',
    params
  })
}
