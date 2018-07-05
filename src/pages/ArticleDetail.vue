<template>
  <section>
    <div>
      <h1>这是文章详情页</h1>



      <div>

        <el-row :gutter="20">
          <el-col :span="16" :offset="2">


            <h1 style="align-content: center">{{ this.detail.title}}</h1>
            <br/>
            <h3> 作者: {{ this.detail.userId}}  </h3>
            <h4> 摘要: {{ this.detail.summary}}  </h4>

            <p>文章类别:  {{ this.detail.categoryId }}</p>
            <br/><br/>

            <p>封面:  {{this.detail.image}}</p>

            <img :src="imgDataUrl" />

            <div class="card text-center" style="width: 16rem;">
              <img class="card-img" :src="imgDataUrl" style="height: 16rem;">
              <div class="card-footer text-muted">
                <input type="file" id="image" name="image" @change="preview($event)">
              </div>
            </div>


            <p>正文: {{ this.detail.content }}</p>
            <p>点赞数:  {{this.detail.likeCount}}</p>
            <p>评论数:  {{this.detail.commentCount}}</p>
            <p>浏览数:  {{this.detail.viewCount}}</p>
            <p>发布日期: {{ this.detail.createTime }}</p>
            <p>最后修改日期: {{ this.detail.updateTime }}</p>

          </el-col>
        </el-row>

      </div>
    </div>
  </section>
</template>

<script>

  let data = () => {
    return {
      name: "article-detail",
      detail:{},
      imgDataUrl: ''
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

  let  preview = function(event){
    this.imgDataUrl = event.target.value;
  };

  export default {
    data: data,
    methods: {
      //获取路由参数,
      getParams,
      // 预览图片
      preview,
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

