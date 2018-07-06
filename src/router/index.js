import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Main from '@/pages/Main'
import Dashboard from '@/pages/Dashboard'
import Member from '@/pages/Member'
import Login from  "@/pages/Login"
import Register from  "@/pages/Register"
import News from '@/pages/News'

import Category from '@/pages/Category'
import Book from '@/pages/Book'
import Bookcategory from '@/pages/Bookcategory'
import NewsDetail from '@/pages/NewsDetail'
import SearchNews from '@/pages/SearchNews'
import Article from '@/pages/Article'
import ArticleDetail from '@/pages/ArticleDetail'
import Comment from '@/pages/Comment'

// hidden: true,

let routes = [{
  path: '/',
  component: Main,
  name: '设置',
  iconCls: 'fa fa-cogs',
  children: [
    {path: '/', component: Dashboard, name: '后台首页'},
    // {path: '/login', component: Login, name: '用户登录'},
    // {path: '/logout', component: Login, name: '用户注销'}
  ]
}]

routes.push({
  path: '/member',
  name: '用户管理',
  component: Main,
  iconCls: 'fa fa-user-circle-o',
  children: [
    {path: '/member/data', component: Member, name: '用户信息管理'},
    // {path: '/register', component: Login, name: '用户注册'}
  ]
})

routes.push({
  path: '/news',
  name: '新闻管理',
  component: Main,
  iconCls: 'fa fa-address-card',
  children: [
    {path: '/news/data', component: News, name: '新闻列表管理'},
    {path: '/news/detail', component: NewsDetail, name: '新闻详情页'},
    {path: '/news/search', component: SearchNews, name: '新闻搜索页'},
  ]
})

routes.push({
  path: '/category',
  name: '标签管理',
  component: Main,
  iconCls: 'fa  fa-tags',
  children: [
    {path: '/category/data', component: Category, name: '标签列表'},
    // {path: '/bookcategory/data', component: Bookcategory, name: '标签列表'},
    // {path: '/register', component: Login, name: '用户注册'}
  ]
})

routes.push({
  path: '/book',
  name: '书籍管理',
  component: Main,
  iconCls: 'fa  fa-book',
  children: [
    {path: '/book/data', component: Book, name: '书籍列表'},
  ]
})

routes.push({
  path: '/blog',
  name: '博客管理',
  component: Main,
  iconCls: 'fa  fa-rss',
  children: [
    {path: '/blog/data', component: Article, name: '文章列表'},
    {path: '/blog/detail', component: ArticleDetail, name: '文章详情页'},
  ]
})

routes.push({
  path: '/comment',
  name: '评论管理',
  component: Main,
  iconCls: 'fa  fa-comments',
  children: [
    {path: '/comment/data', component: Comment, name: '评论列表'},
  ]
})

routes.push({path: '/login',  component: Login,name: '管理员登录', iconCls: 'fa fa-user-circle-o'})
routes.push({path: '/logout', component: Login, name: '用户注销'})
routes.push({path: '/register', component: Register, name: '用户注册'})

const router = new Router({
  mode: 'history',
  // base: __dirname,
  linkActiveClass: 'active',
  routes: routes
})

export default router
