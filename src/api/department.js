import request from '@/utils/request'

// 获取员工简单列表
export const GetSimpleAPI = () => {
  return request({
    url: '/sys/user/simple'
  })
}

// 查询企业的部门列表
export const GetDepartmentAPI = () => {
  return request({
    url: '/company/department'
  })
}

// 新增部门
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

// 根据ID修改部门详情
export const PutDepartmentAPI = data => {
  return request({
    url: '/company/department/' + data.id,
    method: 'put',
    data
  })
}

// 根据ID查询部门详情
export const GetDepartmentDetailsAPI = id => {
  return request({
    url: '/company/department/' + id
  })
}

// 根据ID删除部门
export const DeleteDepartmentAPI = id => {
  return request({
    url: '/company/department/' + id,
    method: 'delete'
  })
}
