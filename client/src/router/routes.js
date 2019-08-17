const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', name: 'Home', component: () => import('pages/Index.vue') },
      {
        path: 'register',
        name: 'Register',
        component: () => import('pages/Register.vue'),
        meta: {
          onlyWhenLoggedOut: true,
        },
      },
      {
        path: 'login',
        name: 'Login',
        component: () => import('pages/Login.vue'),
        meta: {
          onlyWhenLoggedOut: true,
        },
      },
    ],
  },
];

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue'),
  });
}

export default routes;
