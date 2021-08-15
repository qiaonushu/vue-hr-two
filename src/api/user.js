import request from '@/utils/request'

export function LoginAPI(data) {
  return request({
    url: '/sys/login',
    method: 'post',
    data
  })
}

export function PostProfileAPI() {
  return request({
    url: '/sys/profile',
    method: 'post'
  })
}

export const GetUserAPI = (id) => {
  return request({
    url: '/sys/user/' + id
  })
}

export const GetSimpleAPI = () => {
  return request({
    url: '/sys/user/simple'
  })
}
