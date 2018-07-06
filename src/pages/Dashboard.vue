<template>
<section>
  <div>
    <h1>这是首页</h1>

    <div class="hello">
      <h1>{{ msg }}</h1>
      <h2>Essential Links</h2>
      <ul>
        <li><a href="https://vuejs.org" target="_blank">Core Docs</a></li>
        <li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>
        <li><a href="https://chat.vuejs.org" target="_blank">Community Chat</a></li>
        <li><a href="https://twitter.com/vuejs" target="_blank">Twitter</a></li>
        <br>
        <li><a href="http://vuejs-templates.github.io/webpack/" target="_blank">Docs for This Template</a></li>
      </ul>
      <h2>Ecosystem</h2>
      <ul>
        <li><a href="http://router.vuejs.org/" target="_blank">vue-router</a></li>
        <li><a href="http://vuex.vuejs.org/" target="_blank">vuex</a></li>
        <li><a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a></li>
        <li><a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a></li>
      </ul>
      <div class="btn-group" role="group" aria-label="...">
        <button type="button" class="btn btn-default">Left</button>
        <button type="button" class="btn btn-default">Middle</button>
        <button type="button" class="btn btn-default">Right</button>
      </div>
      <div id="cc">cc</div>
    </div>

  </div>
</section>
</template>

<script>




  let data = () => {
    return {
     detail:{}
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



  export default {
    data: data,
    methods: {
      //获取路由参数,
      getParams,
    },
    mounted: function () {
      console.log("调转页面: " + this.$route.path)


      this.detail = this.$route.params.data

      $(function () {
        alert(123);
      });

    }
  }

</script>

<style scoped>
</style>
