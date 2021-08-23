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
  console.log(data)
  return request({
    url: '/sys/user',
    method: 'post',
    data
  })
}

