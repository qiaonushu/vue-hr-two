import request from '@/utils/request'

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

// 根据ID更新角色
export const PutSysRoleAPI = data => {
  return request({
    url: '/sys/role/' + data.id,
    method: 'put',
    data
  })
}

