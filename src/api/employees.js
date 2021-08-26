import request from '@/utils/request'

// 删除员工
export const DeleteSysUserAPI = id => {
  return request({
    url: '/sys/user/' + id,
    method: 'delete'
  })
}

// 新增员工
export const PostSysUserAPI = data => {
  return request({
    url: '/sys/user',
    method: 'post',
    data
  })
}

// 批量导入员工
export const PostSysUserBatchAPI = data => {
  return request({
    url: '/sys/user/batch',
    method: 'post',
    data
  })
}

