export default [
  {
    path: '/',
    layout: false,
    name: 'login',
    component: './user/Login',
  },
  {
    path: '/list',
    name: '绩效明细查询',
    icon: 'smile',
    component: './Welcome',
  },
  {
    path:'/hbjzgcxy',
    name: '绩效上传',
    icon:'table',
    component: './Admin',
  },
  {
    component: './404',
  },
];
