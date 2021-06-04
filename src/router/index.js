import Vue from 'vue'
import VueRouter from 'vue-router'
// 在VueCLI创建的项目中@表示src目录
// 它是src目录的路径别名
// 好处:不受当前文件路径影响
// 注意:@就是src路径,后面别忘了写那个斜杠
// 使用建议:如果加载的资源路径就在当前目录下,那就正常写
//      如果需要进行父级路径查找的都是使用@
import Login from '@/views/login/index.vue'
import Home from '@/views/home/index.vue'
import Layout from '@/views/layout/index.vue'
import Article from '@/views/article/index.vue'
import Publish from '@/views/publish/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    // 命名路由layout有一个默认子路由，这个名字没有意义，所以会警告
    // 正确的做法是：如果有默认子路由，就不要给父路由起名字了
    // name: 'layout',
    component: Layout,
    children: [ // 配置子路由
      {
        // 我们通常会把根路径/设置为网站的首页
        // 因为我们在手动输入网址访问网站的时候，可以省略/
        // 如果是别的名字，则必须加上
        path: '', // path不填，会作为默认子路由渲染到父路由layout页面中的子路由出口处，填空格的话渲染不出来
        name: 'home',
        component: Home
      },
      {
        path: '/article',
        name: 'article',
        component: Article
      },
      {
        path: '/publish',
        name: 'publish',
        component:Publish
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

// 路由导航守卫（拦截器）的作用就是控制页面的访问状态
// beforeEach是全局前置守卫，任何页面的访问都要经过这里
// 路由导航守卫：所有页面的导航都会经过这里
// 守卫页面的导航的
// to:要去的路由信息
// from:来自哪儿的路由信息
// next:放行方法
router.beforeEach((to, from, next) => {
  // 如果要访问的页面不是/login,校验登录状态
  // 如果没有登录，则跳转到登录页面
  // 如果登录了，则允许通过
  // 允许通过
  // next()

  const user = JSON.parse(window.localStorage.getItem('user'))
  // 校验非登录页面的登录状态
  if (to.path !== '/login') {
    if (user) {
      next()
    } else {
      // 没有登录，跳转到登录页面
      next('/login')
      // 这里不能使用this,这里没有this,只有组件里面才使用this
      // 所以组件中可以设置this.$router.push('/login),
      // 而这里不能
    }
  } else {
    next()
  }
})
export default router
