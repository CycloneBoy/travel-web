<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input v-model="filters.query" placeholder="文章标题等条件" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="handleQuery" icon="el-icon-search">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="success" v-on:click="handleAdd" icon="el-icon-plus">点击添加</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-table :data="rows" style="width: 100%;overflow: auto;" :height="clientHeight" stripe border highlight-current-row v-loading="pageLoading">
      <el-table-column align="center"
                       type="selection"
                       width="50">
      </el-table-column>
      <el-table-column
        label="列数" width="50" align="center"
        type="index"
        :index="indexMethod">
      </el-table-column>

      <el-table-column prop="id" label="编号" width="50" align="center" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>

      <el-table-column prop="title" label="文章标题" width="350" align="center" :show-overflow-tooltip="true">

        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>标题: {{scope.row.title}}</p>
            <p>作者:  {{scope.row.userId}}</p>
            <p>摘要:  {{scope.row.summary }}</p>
            <p>栏目:  {{scope.row.categoryId}}</p>
            <p>封面:  {{scope.row.image}}</p>
            <p>正文: {{ scope.row.content.length < 100 ? scope.row.content: scope.row.content.substr(0,100) + " ... ..." }}</p>
            <p>点赞数:  {{scope.row.likeCount}}</p>
            <p>评论数:  {{scope.row.commentCount}}</p>
            <p>浏览数:  {{scope.row.viewCount}}</p>
            <p>发布日期: {{ scope.row.createTime }}</p>
            <p>最后修改日期: {{ scope.row.updateTime }}</p>

            <div slot="reference" class="name-wrapper">
              <el-tag size="medium"> {{scope.row.title}}</el-tag>
            </div>
          </el-popover>
        </template>
        <!--<template slot-scope="scope">-->
        <!--{{scope.row.title}}-->
        <!--</template>-->
      </el-table-column>

      <el-table-column prop="summary" label="摘要" width="180" align="center" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{scope.row.summary }}
        </template>
      </el-table-column>

      <el-table-column prop="userId" label="作者" width="80" align="center" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{scope.row.userId}}
        </template>
      </el-table-column>

      <el-table-column label="发布日期" width="180" align="center">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.createTime.substr(0,16) }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="success"
            @click="handleDetail(scope.$index, scope.row)"><i class="el-icon-success"></i>详情</el-button>
          <el-button
            size="mini"
            type="primary"
            @click="handleEdit(scope.$index, scope.row)"><i class="el-icon-edit"></i>编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"><i class="el-icon-delete"></i>删除</el-button>
        </template>
      </el-table-column>

    </el-table>

    <!--底部-->
    <el-col :span="24" class="toolbar">

      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[20, 50, 100, 200]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>


    </el-col>

    <!--对话框-->
    <el-dialog :title="form && form.id ? '编辑' : '新增' " :visible.sync="formVisible" :close-on-click-modal="false">
      <el-form :model="form" label-width="100px" :rules="rules" ref="form">
        <el-form-item label="ID" prop="id" HIDDEN>
          <el-input v-model="form.id" />
        </el-form-item>


        <el-form-item label="文章标题 " prop="title">
          <el-input v-model="form.title" />
        </el-form-item>
        <el-form-item label="用户ID" prop="userId" >
          <el-input v-model="form.userId" v-value="1"/>
        </el-form-item>

        <el-form-item label="栏目" prop="categoryId">
          <el-radio-group v-model="form.categoryId">
            <el-radio :label="1">工作</el-radio>
            <el-radio :label="2">生活感悟</el-radio>
            <el-radio :label="3">随笔</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="文章摘要" prop="summary">
          <el-input v-model="form.summary" />
        </el-form-item>

        <!--<el-form-item label="文章封面图片" prop="image">-->
          <!--<el-input v-model="form.image" />-->
        <!--</el-form-item>-->

        <el-form-item label="书籍封面" prop="image">
          <!--<el-input v-model="form.cover" />-->
          <p>书籍封面地址: {{ form.image }}</p>
          <el-upload
            :action="fileUploadUrl"
            :name="form.image"
            :limit="1"
            list-type="picture-card"
            :on-preview="handleCoverPictureCardPreview"
            :on-success="handlePicturePostSuccess">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="coverImageVisible">
            <img width="100%" :src="form.cover" alt="文章封面大图">
          </el-dialog>
        </el-form-item>


        <el-form-item label="文章內容" prop="content">
          <el-input  type="textarea"
                     :rows="6"
                     v-model="form.content" />
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="formVisible = false">取消</el-button>
        <el-button type="primary" @click.native="handleSubmit" :loading="formLoading">提交</el-button>
      </div>
    </el-dialog>

  </section>
</template>

<script>
  //表单验证
  const rules = {
    title: [{
      required: true,
      message: '请输入文章标题',
      trigger: 'blur'
    }],
    categoryId: [{
      required: true,
      message: '请选择文章栏目',
      trigger: 'blur'
    }],
    summary: [{
      required: true,
      message: '请输入文章摘要',
      trigger: 'blur'
    }],
    image: [{
      required: true,
      message: '请上传文章封面图片',
      trigger: 'blur'
    }],
    content: [{
      required: true,
      message: '请输入文章内容',
      trigger: 'blur'
    }]
  }

  let data = () => {
    return {
      //页码
      page: 1,
      //每页数量
      size: 20,
      //总数
      total: 10,
      //查询条件
      filters: {},
      //页面数据
      rows: [],
      //页面载入状态
      pageLoading: false,
      //列表高度
      clientHeight: 700,
      //表单数据
      form: {},
      //验证规则
      rules: rules,
      //对话框隐藏状态
      formVisible: false,
      //表单提交状态
      formLoading: false,
      // 后端URL
      backgroundUrl:'/travel/article',
      // 文件上传api
      fileUploadUrl:'/api/travel/book/fileupload',
      // 封面是否可见
      coverImageVisible:false,



    }
  }

  //文件上传
  let handleFileUpload = function (file) {
    console.log("文件上传: " + file)

    let params = {
      file: file
    }
    console.log("请求列表: " + params.file )

    //调用post请求
    this.$axios.post('/api/travel/book/fileupload',params).then(res => { this.pageLoading = false
      if (!res.data.success) {
        this.$message({
          type: 'error',
          message: res.data.message
        })
        return
      }
      this.$message({
        type: 'success',
        message: res.data.message
      })
      this.from.image = res.data.value
      console.info("文件上传成功: " + this.from.image)
    }).catch(e => this.pageLoading = false)

  }

  // 封面上传
  let handleCoverPictureCardPreview = function(file){
    // this.form.cover = file.url;
    this.coverImageVisible = true;
    console.log("封面图片上传: ",this.form.image,file.url,file);
  }

  // 封面上传成功
  let handlePicturePostSuccess = function(response, file, fileList){
    this.form.image = response.value
    console.log("封面图片上传成功: ",response.value,file, fileList)
  }



  let getTotalRows = function () {
    this.pageLoading = true
    this.$axios.get('/api' + this.backgroundUrl + '/total/').then(res => {

      this.pageLoading = false
      if (!res.data.success) {
        this.$message({
          type: 'error',
          message: res.data.message
        })
        return
      }

      this.total = res.data.value

      console.info(res.data.message + " - " + res.data.value)

    }).catch(e => this.pageLoading = false)
  }

  let handleAdd = function() {
    this.form = {}
    this.formVisible = true
  }

  let handleEdit = function(index, row) {
    this.form = Object.assign({}, row)
    this.formVisible = true
  }

  let handleDetail = function (index, row) {

    console.info("查看详情: " +  index + " " + row.id + " " + row.title)

    //跳转到首页
    console.log("用户登录成功：进行页面跳转到根目录,同时设置cookie")
    this.$router.push({
      path:'/blog/detail',
      name:"文章详情页",
      params:{
        data: row,
      }
    })


  }

  let handleDelete = function(index, row) {
    if (this.pageLoading)
      return

    this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      this.pageLoading = true
      this.$axios.get('/api' + this.backgroundUrl + '/remove/' + row.id).then(res => {
        this.pageLoading = false
        if (!res.data.success) {
          this.$message({
            type: 'error',
            message: res.data.message
          })
          return
        }
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.page = 1
        this.getRows()
      }).catch(e => this.pageLoading = false)
    }).catch(e => {})
  }

  let getRows = function() {


    if (this.pageLoading)
      return
    this.pageLoading = true

    let params = {
      page: this.page,
      size: this.size,
      query: this.filters.query
    }
    console.log("请求列表: " + params.page + " " + params.size + " " + params.query)

    //调用post请求
    this.$axios.post('/api' + this.backgroundUrl + '/loadpage', params).then(res => {

      this.pageLoading = false
      if (!res.data || !res.data.rows){
        console.log("没有返回数据")
        return
      }

      console.log("返回数据: " + res.data.total)
      //页面元素赋值
      this.rows = res.data.rows
    }).catch(e => this.pageLoading = false)
  }

  let handleSubmit = function() {
    if (this.formLoading)
      return

    this.$refs.form.validate(valid => {
      if (!valid)
        return

      this.formLoading = true

      if(this.form.id ){  // 更新
        //调用http协议
        console.log("修改新闻：URL : " + this.form.id)
        this.$axios.post('/api' + this.backgroundUrl + '/update', this.form).then(res => {
          this.formLoading = false
          console.log("修改新闻：")
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
            message: '修改成功!'
          })
          //重新载入数据
          this.page = 1
          this.getRows()
          this.formVisible = false
        }).catch(e => this.formLoading = false)
      }else{

        console.log("发布文章的作者ID是: " + this.form.userId)
        this.form.userId = getCookie("usernameid");
        console.log("发布文章的作者ID是: " + this.form.userId)

        //调用http协议
        this.$axios.post('/api' + this.backgroundUrl + '/save', this.form).then(res => {
          this.formLoading = false
          console.log("保存新闻：")
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
            message: '保存成功!'
          })
          //重新载入数据
          this.page = 1
          this.getRows()
          this.formVisible = false
        }).catch(e => this.formLoading = false)
      }

    })
  };

  let handleQuery = function() {
    this.page = 1
    this.getRows()
  };

  let handleCurrentChange = function(val) {
    this.page = val
    this.getRows()
  };

  let handleSizeChange = function (val) {
    this.size = val
    this.getRows()
  };

  let initHeight = function() {
    this.clientHeight = (document.documentElement.clientHeight - 258) + 'px'
  };

  let indexMethod = function(index) {
    return index + 1;
  };

  //获取cookie
  let getCookie = function (cname) {
    var arr, reg = new RegExp("(^| )" + cname + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
      return (arr[2]);
    else
      return null;
  };

  export default {
    data: data,
    methods: {
      //查询
      handleQuery,
      //添加
      handleAdd,
      //修改
      handleEdit,
      //删除
      handleDelete,
      //页数改变
      handleCurrentChange,
      //获取分页
      getRows,
      //初始化高度
      initHeight,
      //提交数据
      handleSubmit,
      //显示列号
      indexMethod,
      //页码大小改变
      handleSizeChange,
      //获取总数
      getTotalRows,
      //查看详情
      handleDetail,
      // 封面上传
      handleCoverPictureCardPreview,
      // 封面上传成功
      handlePicturePostSuccess,
      // 文件上传
      handleFileUpload,
      // 获取cookie
      getCookie,

    },
    mounted: function() {
      window.addEventListener('resize', this.initHeight)
      // this.initHeight()

      this.getRows()
      this.getTotalRows()
    }
  }
</script>

<style scoped>
</style>
