import request from '@/utils/request'

// 获取所有权限点
export const GetSysPermissionAPI = () => {
  return request({
    url: '/sys/permission'
  })
}
