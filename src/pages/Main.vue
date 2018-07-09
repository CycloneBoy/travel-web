<template>
<section>
  <el-container class="container">
    <!--左边-->
    <el-aside :width="collapsed? '65px' : '220px' "  >
      <el-container>
        <el-header>
          <span class="menu-button" v-if="collapsed" @click.prevent="collapsed=!collapsed">
            <i class="fa fa-align-justify"></i>
          </span>
          <span v-else class="system-name">{{systemName}}</span>
        </el-header>
        <el-main>
          <el-menu :default-active="$route.path" :collapse="collapsed" v-if="isAdmin">
            <template v-for="(item,index) in menus">
              <el-submenu :index="index+''" v-if="!item.leaf">
                <template slot="title"><i :class="item.iconCls"></i><span v-if="!collapsed">{{item.name}}</span></template>
            <el-menu-item v-for="child in item.children" :index="child.path" :key="child.path" @click="$router.push(child.path)">{{child.name}}</el-menu-item>
            </el-submenu>
            <el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path"><i :class="item.iconCls"></i>{{item.children[0].name}}</el-menu-item>
            </template>
          </el-menu>

          <el-menu v-if="!isAdmin"
            class="el-menu-vertical-demo"
            :collapse="collapsed" >
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>搜索管理</span>
              </template>
              <el-menu-item-group>
                <template slot="title">分组一</template>
                <el-menu-item index="1-1" route="/news/search" @click="$router.push('/news/search')">新闻搜索页</el-menu-item>
                <el-menu-item index="1-2" route="/news/detail" @click="$router.push('/news/detail')">新闻详情页</el-menu-item>

              </el-menu-item-group>

            </el-submenu>

          </el-menu>

        </el-main>
      </el-container>
    </el-aside>


    <!--内容-->
    <el-container class="main-content">
      <!--页眉-->
      <el-header class="header">
        <el-row>
          <el-col :span="18" class="header-title">
            <span v-if="collapsed" class="system-name">{{systemName}}</span>
            <span v-else class="menu-button" @click.prevent="collapsed=!collapsed">
              <i class="fa fa-align-justify"></i>
            </span>
          </el-col>

          <el-col :span="6">
            <el-dropdown @command="handleUserCommand">
              <span class="el-dropdown-link userinfo-inner">
                你好：{{userName}}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="setting">设置</el-dropdown-item>
                <el-dropdown-item command="logout">注销</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>

          </el-col>

        </el-row>
      </el-header>


      <!--中间-->
      <el-main class="main">
        <transition name="fade" mode="out-in">
          <router-view></router-view>
        </transition>
      </el-main>


      <!--页脚-->
      <el-footer class="footer">
        <el-row type="flex" class="row-bg" justify="center">
          <el-col :span="10">
            <div class="grid-content bg-purple">
              <h3 class="h3 ">
                Copyright ©  My Web Info Website 2018 power by cycloneboy
              </h3>
            </div>
          </el-col>
        </el-row>



      </el-footer>
    </el-container>
  </el-container>
</section>
</template>

<script>
let data = () => {
  return {
    collapsed: false,
    systemName: '环球旅行管理系统',
    userName: '',
    menus: [],
    msg: '',
    loginUser: undefined,
    isAdmin: true
  }
}

let initMenu = function() {
  for (let i in this.$router.options.routes) {
    let root = this.$router.options.routes[i]
    if (root.hidden)
      continue
    let children = []
    for (let j in root.children) {
      let item = root.children[j]
      if (item.hidden)
        continue
      children.push(item)
    }

    if (children.length < 1)
      continue

    this.menus.push(root)
    root.children = children
  }
}

let getParams  = function () {
  // 取到路由带过来的参数
  let routerParams = this.$route.params.dataObj

  this.userName = this.$route.params.userName

  console.log("从路由参数中获取用户参数 :" + this.userName)

  // 将数据放在当前组件的数据内
  this.msg = routerParams

  this.loginUser = this.$route.params.loginUser

  this.userName  = this.getCookie("username")
  console.log("从cookie中获取用户参数 :" + this.userName)
}

let isLogin = function () {
   if(this.userName == undefined){
     //跳转到登录页
     console.log("用户未登录，请登录")
     this.$router.push({
       path:'/login',
       name:'管理员登录',
       params:{
       }
     })
      return false;
   }else{
     console.log("用户已经登录: " + this.userName)
     return true;
   }
}

let handleUserCommand = function (command) {
  if(command == "logout"){
    //跳转到首页
    console.log("用户注销,进行跳转")
    this.delCookie("username")
    this.delCookie("usertype")
    this.delCookie("usernameid")
    this.$router.push({
      path:'/login',
      name:"管理员登录",
      params:{
      }
    })
  }

}

//获取cookie
let getCookie = function (cname) {
  var arr, reg = new RegExp("(^| )" + cname + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg))
    return (arr[2]);
  else
    return null;
}

//删除cookie
let delCookie = function (name) {
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval = getCookie(name);
  if (cval != null)
    document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}

export default {
  data: data,
  methods: {
    initMenu,
    //获取路由参数,
    getParams,
    // 判断用户是否登录
    isLogin,
    //用户菜单处理
    handleUserCommand,
    //获取cookie
    getCookie,
    //删除cookie
    delCookie
  },
  mounted: function() {
    console.log("主页面: " + this.$route.path)

    this.getParams()
    console.log("主页面:获取参数-> " + this.userName)
    if(this.isLogin()){

      if(this.getCookie("usertype") == 2){
          this.isAdmin = false
          console.log("用户类型:   "  + this.isAdmin)
      }

      this.initMenu()


    }else{
      console.log("主页面: 没有登录成功" )
    }

  },
  watch: {
    // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
    '$route': getParams
  }
}
</script>

<style scoped="scoped"
  lang="scss">
$width: 100%;
$height: 100%;
$background-color: 	#9400D3;
$header-color: #fff;
$header-height: 60px;

.container {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    .el-aside {
        .el-header {
            line-height: $header-height;
            background-color: $background-color;
            color: $header-color;
            text-align: center;
        }
        .el-container {
            height: $height;
            .el-main {
                padding: 0;
            }
        }
    }

    .main {
        width: $width;
        height: $height;
    }

    .menu-button {
        width: 14px;
        cursor: pointer;
    }

    .userinfo-inner {
        cursor: pointer;
        color: white;
    }

    .el-menu {
        height: $height;
    }

    .header {
        background-color: $background-color;
        color: $header-color;
        text-align: center;
        line-height: $header-height;
        padding: 0;
      width: 100%;
        .header-title {

            text-align: left;
            span {
                padding: 0 20px;
            }
        }
    }

    .system-name {
        font-size: large;
        font-weight: bold;
    }

    .main-content{
      width: $width;
      height: $height;
    }
}
</style>
