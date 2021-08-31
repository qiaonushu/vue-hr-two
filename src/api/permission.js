import request from '@/utils/request'

// 获取所有权限点
export const GetSysPermissionAPI = () => {
  return request({
    url: '/sys/permission'
  })
}

// 添加权限点
export const PostSysPermissionAPI = data => {
  return request({
    url: '/sys/permission',
    method: 'post',
    data
  })
}

// 根据ID获取权限点详情
export const GetPermissionAPI = id => {
  return request({
    url: '/sys/permission/' + id
  })
}

// 根据ID更新权限点详情
export const PutPermissionAPI = data => {
  return request({
    url: '/sys/permission/' + data.id,
    method: 'put',
    data
  })
}

// 根据id删除权限点
export const DeletePermissionAPI = id => {
  return request({
    url: '/sys/permission/' + id,
    method: 'delete'
  })
}

