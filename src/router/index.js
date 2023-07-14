// 路由配置
import Vue from 'vue'
import VueRouter from 'vue-router'
// 引入路由组件
import Home from '../views/Home'
import Myuser from '../views/Myuser'
import Main from '../views/Main'
import Mall from '../views/Mall'
import PageOne from '../views/PageOne'
import PageTwo from '../views/PageTwo'
import Login from '../views/Login'
import Cookies from 'js-cookie'




// 1创建路由组件
// 2将路由与组件映射
// 3创建router实列 


Vue.use(VueRouter)
const router = new VueRouter({
    routes:[
        {
            path:'/',
            component:Main,
            redirect:'/home',
            children:[
                {path:'home' ,name:'home' , component:Home,meta:{ title:'主页'}},
                {path:'myuser' ,name:'myuser' ,component:Myuser,meta:{ title:'用户管理'}},
                {path:'mall' ,name:'mall' ,component:Mall,meta:{ title:'商品管理'}},
                {path:'page1' ,name:'page1' ,component:PageOne,meta:{ title:'页面1'}},
                {path:'page2' ,name:'page2',component:PageTwo,meta:{ title:'页面2'}}

            ]
        },
        {
            name:'login',
            path:'/Login',
            component:Login,
            meta:{isAuth:true , title:'登录'}
        }
    ]
})


// 全局路由前置守卫
router.beforeEach((to,from, next) =>{
    const token  = Cookies.get("token")
    // 判断token是否存在  token不存在就跳转到login界面
    if(!token && to.name !== 'login'){  
        next({
            path:'/login'
        })
    }else if(token && to.name === 'login'){
        next({name:'home'})
    }else{
        next()
    }
})

// 全局后置路由守卫
router.afterEach((to,from) =>{
    if(to.meta.title) {
        document.title = to.meta.title
    }else{
        document.title = '后台管理'
    }
})

//暴露router
export default router