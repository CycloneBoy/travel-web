<template>
  <section>

    <el-container class="container">
      <el-header class="header" height="400px">
        <img :src="imageHeaderUrl" alt="article-cover" width="100%" height="100%">

      </el-header>

      <el-main class="main" >
        <el-row :gutter="20">
          <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>

          <el-col :span="16">
            <div class="grid-content bg-purple">

              <hzqing-vue-timeline
                timelineColor="#5bbcd5"
                timeContentColor="#fff"
                :dataList="timelineData"
              ></hzqing-vue-timeline>

            </div>
          </el-col>

          <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
        </el-row>

        <el-row :gutter="10">
          <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"><div class="grid-content bg-purple"></div></el-col>
          <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11"><div class="grid-content bg-purple-light"></div></el-col>
          <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11"><div class="grid-content bg-purple"></div></el-col>
          <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"><div class="grid-content bg-purple-light"></div></el-col>
        </el-row>

      </el-main>

      <!--页脚-->
      <el-footer class="footer" height="50px">
        <el-row type="flex" class="row-bg" justify="center">
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <h3 class="copyright">
                Copyright ©  My Timeline Website 2018 power by cycloneboy

              </h3>
            </div>
          </el-col>
        </el-row>
      </el-footer>

    </el-container>


  </section>




</template>

<script>



  let data = () => {
    return {
      name: "home",
      imageHeaderUrl:'/static/front/header.jpg',
      // 时间线获取的数据集
      timelineData:[],
      // 后端URL
      backgroundUrl:'/travel/timeline',
      loginUserName:null,
      loginUserId:null,
      // 测试数据集
      detail: [
        {
          time: 1522372393000,
          img: 'static/touxiang.jpeg',
          title: 'hzqing.com',
          content: '这是衡钊清的个人博客'
        },
        {
          time: '2016-03-30 14:36:35',
          img: 'static/one.jpeg',
          title: '这是一个简单的vue时间轴插件',
          content: '这是一个简单的vue时间轴插件，使用非常的方便'
        },
        {
          time: 1522372393000,
          img: 'static/three.jpg',
          title: '努力奋斗',
          content: '旋风小子努力学习吧。。。。。。'
        },
        {
          time: '2018-02-20 14:36:35',
          img: 'static/touxiang.jpeg',
          title: 'cycloneboy.com',
          content: '这是旋风小子的个人博客'
        },
        {
          time: '2016-01-10 14:36:35',
          img: 'static/one.jpeg',
          title: '这是一个简单的blog',
          content: '这是一个简单的vue时间轴插件，使用非常的方便这是一个简单的vue时间轴插件，' +
          '使用非常的方便这是一个简单的vue时间轴插件，使用非常的方便这是一个简单的vue时间轴插件，' +
          '使用非常的方便这是一个简单的vue时间轴插件，使用非常的方便这是一个简单的vue时间轴插件，' +
          '使用非常的方便这是一个简单的vue时间轴插件，使用非常的方便这是一个简单的vue时间轴插件，' +
          '使用非常的方便'
        },
        {
          time: '2017-03-30 14:36:35',
          img: 'static/three.jpg',
          title: '努力奋斗111111',
          content: '当你发现你的才华撑不起野心时，就请安静下来学习吧~~~'
        },
        {
          time: '2016-03-30 14:36:35',
          img: 'static/one.jpeg',
          title: '这是一个简单的vue时间轴插件',
          content: '这是一个简单的vue时间轴插件，使用非常的方便'
        },
        {
          time: 1522372393000,
          img: 'static/three.jpg',
          title: '努力奋斗',
          content: '旋风小子努力学习吧。。。。。。'
        },
        {
          time: '2018-02-20 14:36:35',
          img: 'static/touxiang.jpeg',
          title: 'cycloneboy.com',
          content: '这是旋风小子的个人博客'
        },
        {
          time: '2016-01-10 14:36:35',
          img: 'static/one.jpeg',
          title: '这是一个简单的blog',
          content: '这是一个简单的vue时间轴插件，使用非常的方便这是一个简单的vue时间轴插件，' +
          '使用非常的方便这是一个简单的vue时间轴插件，使用非常的方便这是一个简单的vue时间轴插件，' +
          '使用非常的方便这是一个简单的vue时间轴插件，使用非常的方便这是一个简单的vue时间轴插件，' +
          '使用非常的方便这是一个简单的vue时间轴插件，使用非常的方便这是一个简单的vue时间轴插件，' +
          '使用非常的方便'
        },
        {
          time: '2017-03-30 14:36:35',
          img: 'static/three.jpg',
          title: '努力奋斗111111',
          content: '当你发现你的才华撑不起野心时，就请安静下来学习吧~~~'
        }
      ]
    }
  }

  //获取cookie
  let  getCookie = function (cname) {
    var arr, reg = new RegExp("(^| )" + cname + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
      return (arr[2]);
    else
      return null;
  };


  export default {

    data: data,
    methods: {
      //获取cookie
      getCookie,
    },
    mounted: function () {

      this.loginUserId  = this.getCookie("usernameid")
      console.log("从cookie中获取用户ID参数 :" + this.loginUserId)

      let params = {
        page: 1,
        size: 5000,
        query:this.loginUserId,
      }



      //调用post请求
      this.$axios.post('/api' + this.backgroundUrl + '/loadUserTimeline', params).then(res => {

        this.pageLoading = false
        if (!res.data || !res.data.rows){
          console.log("没有返回数据")
          return
        }

        console.log("返回数据: " + res.data.total )
        //页面元素赋值
        this.timelineData = res.data.rows;

        console.log("返回的数据集: " + res.data.rows.toString() )


      }).catch(e => this.pageLoading = false)


    }
  }


</script>

<style scoped>

  .container{

    .header{
      width: 100%;
      height: 200px;

    }

    .footer{
      background-color: black;
    }
  }

  .el-col {
    border-radius: 4px;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
</style>
