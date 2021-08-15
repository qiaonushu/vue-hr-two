import Layout from '@/layout'

export default {
  path: '/departments',
  component: Layout,
  children: [{
    path: '',
    name: 'departments',
    component: () => import('@/views/departments'),
    meta: { title: '部门管理', icon: 'dashboard' }
  }]
}

