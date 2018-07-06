<template>
  <section>
    <div>
      <h1>这是新闻详情页</h1>



      <div>

        <el-row :gutter="20">
          <el-col :span="16" :offset="2">


            <h3 style="align-content: center">{{ this.detail.title}}</h3>
            <br/>
            <h3> 发布日期: {{ this.detail.date}}  </h3>
            <p>新闻类别:  {{ this.detail.tag }}</p>
            <br/><br/>
            <p>{{ this.detail.content}}</p>

          </el-col>
        </el-row>

      </div>
    </div>
  </section>
</template>

<script>

  let data = () => {
    return {
      name: "news-detail",
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

      console.log("调转页面:获取参数-> " + this.detail.title + " - " + this.detail.date)


    }
  }

</script>

<style scoped>
</style>

