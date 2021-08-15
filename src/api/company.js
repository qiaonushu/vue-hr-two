import request from '@/utils/request'

export const GetDepartmentAPI = () => {
  return request({
    url: '/company/department'
  })
}

export const PostDepartmentAPI = ({ code, introduce, manager, name, pid }) => {
  return request({
    url: '/company/department',
    method: 'post',
    data: {
      code,
      introduce,
      manager,
      name,
      pid
    }
  })
}

export const PutDepartmentAPI = data => {
  return request({
    url: '/company/department/' + data.id,
    method: 'put',
    data
  })
}

export const GetDepartmentDetailsAPI = id => {
  return request({
    url: '/company/department/' + id
  })
}

export const DeleteDepartmentAPI = id => {
  return request({
    url: '/company/department/' + id,
    method: 'delete'
  })
}
