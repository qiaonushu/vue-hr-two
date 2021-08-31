import Layout from '@/layout'

export default {
  path: '/permissions',
  component: Layout,
  children: [{
    path: '',
    name: 'permissions',
    component: () => import('@/views/permissions'),
    meta: { title: '权限', icon: 'dashboard' }
  }]
}

