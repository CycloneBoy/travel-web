<template>
  <section>
    <div>
      <h1>这是时间线详情页</h1>



      <div>

        <el-row :gutter="20">
          <el-col :span="16" :offset="2">

            <h1 style="align-content: center">标题: {{ this.detail.title}}</h1>
            <br/>
            <h3> 作者: {{ this.detail.userId}}  </h3>
            <p>正文: {{ this.detail.content }}</p>


            <br/><br/>

            <p>封面图片路径:  {{this.detail.image}}</p>

            <img :src="imageCoverUrl" alt="article-cover" width="800" height="400"/>

            <p>发布日期: {{ this.detail.createTime }}</p>
            <p>最后修改日期: {{ this.detail.updateTime }}</p>

          </el-col>
        </el-row>

      </div>
    </div>
  </section>
</template>

<script >




  let data = () => {
    return {
      name: "timeline-detail",
      detail:{},
      imageCoverUrl:null,
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
      console.log("时间线调转页面: " + this.$route.path)


      this.detail = this.$route.params.data

      console.log("调转页面:获取参数-> " + this.detail.title + " - " + this.detail.image.toString())


      console.log("时间线图片URL -> "  + this.detail.image.toString().substring(20));

      this.imageCoverUrl =  this.detail.image.toString().substring(20);
      console.log("时间线URL: " + this.imageCoverUrl)

    }
  }

</script>

<style scoped>
</style>

