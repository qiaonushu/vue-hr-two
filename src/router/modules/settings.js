import Layout from '@/layout'

export default {
  path: '/settings',
  component: Layout,
  children: [{
    path: '',
    name: 'settings',
    component: () => import('@/views/settings'),
    meta: { title: '设置', icon: 'dashboard' }
  }]
}

