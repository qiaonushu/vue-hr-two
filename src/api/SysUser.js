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

// 获取所有角色列表
export const GetSysRoleAPI = params => {
  return request({
    url: '/sys/role',
    params
  })
}

// 根据ID删除角色
export const DeleteSysRoleAPI = id => {
  return request({
    url: '/sys/role/' + id,
    method: 'delete'
  })
}

// 添加角色
export const PostSysRoleAPI = data => {
  return request({
    url: '/sys/role',
    method: 'post',
    data
  })
}
