<template>
    <section>
      <!--登录对话框-->
      <el-row :gutter="20">
        <el-col :span="8" :offset="8">
          <div class="grid-content bg-purple">
            <div align="center">
              <p>&nbsp;&nbsp;<br/></p>
              <img  src="@/assets/web-info-2.jpg"  alt="环球旅行管理系统">
              <h1>环球旅行管理系统</h1>
              <h4>请输入邮箱和密码</h4>
            </div>

            <el-form :model="form" label-width="80px" :rules="rules" ref="form">
              <el-form-item label="ID" prop="id" HIDDEN>
                <el-input v-model="form.id" />
              </el-form-item>
              <el-form-item label="邮箱" prop="email">
                <el-col :span="22">
                  <el-input v-model="form.email" />
                </el-col>

              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-col :span="22">
                  <el-input v-model="form.password" type="password" />
                </el-col>
              </el-form-item>
              <el-form-item>
                <el-row type="flex"  justify="center">
                  <el-button @click.native="formVisible = false">取消</el-button>
                  <el-button type="primary" @click.native="handleSubmit" :loading="formLoading">登录</el-button>
                </el-row>
              </el-form-item>
            </el-form>
            <div align="center">
              <p>已有管理员账户请登录，<br/>如果没有请联系系统管理员分配一下新的账户</p>
              <a href="/login" >管理员登录</a>
              <br/><p>或者是新用户，请注册<br/></p>
              <a href="/register" >注册</a>
            </div>

          </div>
        </el-col>
      </el-row>


    </section>
</template>

<script>
  //表单验证
  const rules = {
    email: [{
      required: true,
      message: '请输入邮箱地址',
      trigger: 'blur'
    }],
    password: [{
      required: true,
      message: '请输入密码',
      trigger: 'blur'
    }]
  }

  let data = () => {
    return {
      //表单数据
      form: {},
      //验证规则
      rules: rules,
      //登录URL
      loginUrl: '/api/travel/persons/login',
      //对话框隐藏状态
      formVisible: false,
      //表单提交状态
      formLoading: false,

      msg: 'test message'
    }
  }

  //设置cookie
  let setCookie = function (cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    console.info(cname + "=" + cvalue + "; " + expires);
    document.cookie = cname + "=" + cvalue + "; " + expires;
    console.info(document.cookie);
  }

  let handleSubmit = function() {

    this.$refs.form.validate(valid => {
      if (!valid)
        return

      this.formLoading = true


        console.log("用户登录：" + this.form.email + " " + this.form.password)
        //调用http协议
        this.$axios.post(this.loginUrl, this.form).then(res => {
          this.formLoading = false

          if (!res.data.success) {
            this.$message({
              showClose: true,
              message: res.data.message,
              type: 'error'
            });
            return
          }
          this.$message({
            type: 'success',
            message: '登录成功!'
          })

          this.setCookie("username",res.data.value.username,1)
          this.setCookie("usertype",res.data.value.userType,1)
          this.setCookie("usernameid",res.data.value.id,1)

          //跳转到首页
          console.log("用户登录成功：进行页面跳转到根目录,同时设置cookie")
          this.$router.push({
            path:'/',
            name:"后台首页",
            params:{
              userName: res.data.value.username,
              dataObj: this.msg,
              loginUser: res.data.value
            }
          })

        }).catch(e => this.formLoading = false)


    })
  }

  export default {
        name: "login",
        data: data,
        methods: {
          //提交数据
          handleSubmit,
          //设置cookie
          setCookie
        },
        mounted: function() {
        }
    }
</script>

<style scoped>
  .el-row {
    margin-top: 50px;
    margin-bottom: 50px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #9370DB;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
