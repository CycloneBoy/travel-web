<!--suppress ALL -->
<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input v-model="filters.query" placeholder="书籍名称等条件" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="handleQuery" icon="el-icon-search">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" v-on:click="handleAdd" icon="el-icon-c">添加</el-button>
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
      <el-table-column prop="id" label="书籍编号" width="60" align="center" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>

      <el-table-column label="书籍名称(点击查看详情)" width="180" align="center" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <h4 align="center">书籍详情</h4>
            <p>标签ID: {{ scope.row.id }}</p>
            <p>书籍名称: {{ scope.row.title }}</p>
            <p>图书封面大图: {{ scope.row.cover }}</p>
            <!--<img width="100%" src={{ scope.row.cover }} alt="图书封面大图">-->

            <p>书籍作者: {{ scope.row.authorsId }}</p>
            <p>书籍栏目: {{ scope.row.channelId }}</p>
            <p>书籍价格: {{ scope.row.price }} 元</p>
            <p>书籍描述: {{ scope.row.content }}</p>
            <p>书籍评分: {{ scope.row.score }} 分</p>
            <p>书籍总章节数: {{ scope.row.title }} 章</p>
            <p>书籍总字数: {{ scope.row.wordCount }} 字</p>

            <p>书籍正文: {{ scope.row.url }}</p>

            <p>是否完结:  {{ scope.row.finish ===0?'未完结':'已完结'}}</p>
            <p>是否免费:  {{ scope.row.allowFreeRead ===0?'免费':'付费'}}</p>
            <p>是否上架: {{ scope.row.onSale ===0?'上架中': (scope.row.onSale ===1?'已下架':'待审核') }}</p>
            <p>创建时间: {{ scope.row.createTime }}</p>
            <p>最近更新时间: {{ scope.row.updateTime }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.title }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="authorsId" label="作者编号" width="50" align="center" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.authorsId }}
        </template>
      </el-table-column>
      <el-table-column prop="channelId" label="书籍栏目" width="50" align="center" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.channelId }}
        </template>
      </el-table-column>
      <el-table-column prop="finish" label="是否完结" width="70" align="center" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.finish ===0?'未完结':'已完结'}}
        </template>
      </el-table-column>
      <el-table-column prop="allowFreeRead" label="是否免费" width="60" align="center" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.allowFreeRead ===0?'免费':'付费'}}
        </template>
      </el-table-column>
      <el-table-column prop="onSale" label="是否下架" width="70" align="center" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.onSale ===0?'上架中': (scope.row.onSale ===1?'已下架':'待审核') }}
        </template>
      </el-table-column>
      <el-table-column prop="updateTime" label="更新时间" width="130" align="center" :show-overflow-tooltip="true">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        {{ scope.row.updateTime }}
      </template>
    </el-table-column>

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleEdit(scope.$index, scope.row)"><i class="el-icon-edit"></i>编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"><i class="el-icon-delete"></i>删除</el-button>

          <el-button
            size="mini"
            type="success"
            @click="handleBookcategoryEdit(scope.$index, scope.row)"><i class="el-icon-c"></i>标签管理</el-button>


        </template>
      </el-table-column>
    </el-table>
    <!--底部-->
    <el-col :span="24" class="toolbar">
      <el-pagination layout="total, sizes, prev, pager, next, jumper"
                     @current-change="handleCurrentChange"
                     :page-size="size"
                     style="float:right;">
      </el-pagination>
    </el-col>

    <!--对话框-->
    <el-dialog :title="form && form.id ? '编辑' : '新增' " :visible.sync="formVisible" :close-on-click-modal="false">
      <el-form :model="form" label-width="100px" :rules="rules" ref="form">
        <el-form-item label="ID" prop="id" HIDDEN>
          <el-input v-model="form.id" />
        </el-form-item>
        <el-form-item label="书籍名称" prop="title">
          <el-input v-model="form.title" />
        </el-form-item>
        <el-form-item label="书籍作者" prop="authorsId">
          <el-input v-model="form.authorsId" />
        </el-form-item>
        <el-form-item label="书籍栏目" prop="channelId">
          <el-input v-model="form.channelId" />
        </el-form-item>
        <el-form-item label="书籍价格" prop="price">
          <el-input v-model="form.price"  placeholder="请输入书籍价格(必须为整数)元"/>
        </el-form-item>
        <el-form-item label="书籍描述" prop="content" >
          <el-input v-model="form.content" type="textarea"  :rows="4"/>
        </el-form-item>
        <el-form-item label="完结状态" prop="finish">
          <el-radio-group v-model="form.finish">
            <el-radio :label="0">未完结</el-radio>
            <el-radio :label="1">已完结</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="是否免费" prop="allowFreeRead">
          <el-radio-group v-model="form.allowFreeRead">
            <el-radio :label="0">免费</el-radio>
            <el-radio :label="1">付费</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="是否下架" prop="onSale">
          <el-radio-group v-model="form.onSale">
            <el-radio :label="0">上架中</el-radio>
            <el-radio :label="1">已下架</el-radio>
            <el-radio :label="2">待审核</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="总章节数" prop="chapterCount">
          <el-input v-model="form.chapterCount" />
        </el-form-item>

        <el-form-item label="书籍封面" prop="cover">
          <!--<el-input v-model="form.cover" />-->
          <p>书籍封面地址: {{ form.cover }}</p>
          <el-upload
            :action="fileUploadUrl"
            :name="form.cover"
            :limit="1"
            list-type="picture-card"
            :on-preview="handleCoverPictureCardPreview"
            :on-success="handlePicturePostSuccess">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="coverImageVisible">
            <img width="100%" :src="form.cover" alt="图书封面大图">
          </el-dialog>
        </el-form-item>

        <el-form-item label="书籍正文" prop="url">
          <!--<el-input v-model="form.cover" />-->
          <p>书籍正文地址: {{ form.url }}</p>
          <el-upload
            :action="fileUploadUrl"
            :name="form.url"
            :limit="1"
            list-type="picture-card"
            :on-preview="handleCoverPictureCardPreview"
            :on-success="handlePicturePostSuccess2">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="coverImageVisible">
            <img width="100%" :src="form.url" alt="图书正文">
          </el-dialog>
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
      message: '请输入书籍名称',
      trigger: 'blur'
    }],
    authorsId: [{
      required: true,
      message: '请输入书籍作者',
      trigger: 'blur'
    }],
    channelId: [{
      required: true,
      message: '请输入书籍栏目',
      trigger: 'blur'
    }],
    price: [{
      required: true,
      message: '请输入书籍价格(必须为整数)元',
      trigger: 'blur'
    }],
    content: [{
      required: true,
      message: '请输入书籍描述',
      trigger: 'blur'
    }],
    finish: [{
      required: true,
      message: '请选择书籍完结状态',
      trigger: 'blur'
    }],
    allowFreeRead: [{
      required: true,
      message: '请选择书籍是否可免费阅读',
      trigger: 'blur'
    }],
    onSale: [{
      required: true,
      message: '请选择书籍是否下架',
      trigger: 'blur'
    }],
    chapterCount: [{
      required: true,
      message: '请输入书籍总的章节数',
      trigger: 'blur'
    }],
    cover: [{
      required: true,
      message: '请输入封面',
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
      total: 0,
      //查询条件
      filters: {},
      //页面数据
      rows: [],
      //页面载入状态
      pageLoading: false,
      //列表高度
      clientHeight: 500,
      //表单数据
      form: {},
      //验证规则
      rules: rules,
      //对话框隐藏状态
      formVisible: false,
      //表单提交状态
      formLoading: false,
      //表单数据
      formCheckin: {},
      // 后端URL
      backgroundUrl:'/travel/book',
      // 封面是否可见
      coverImageVisible:false,
      // 文件上传api
      fileUploadUrl:'/api/travel/book/fileupload',
      // 图书上传列表
      bookUploadlist:[],
      // 图书是否可见
      bookVisible:false
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
    this.$axios.post('/api' + this.backgroundUrl + '/fileupload',params).then(res => { this.pageLoading = false
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
      this.from.cover = res.data.value
      console.info("文件上传成功: " + this.from.cover)
    }).catch(e => this.pageLoading = false)

  }

  // 封面上传
  let handleCoverPictureCardPreview = function(file){
    // this.form.cover = file.url;
    this.coverImageVisible = true;
    console.log("封面图片上传: ",this.form.cover,file.url,file);
  }

  // 封面上传成功
  let handlePicturePostSuccess = function(response, file, fileList){
    this.form.cover = response.value
    console.log("封面图片上传成功: ",response.value,file, fileList)
  }

  // 封面上传成功
  let handlePicturePostSuccess2 = function(response, file, fileList){
    this.form.url = response.value
    console.log("封面图片上传成功2: ",response.value,file, fileList)
  }


  // 图书上传成功
  let handleBookPostSuccess = function(response, file, fileList){
    this.form.url = response.value
    console.log("图书上传成功: ",response.value,file, fileList)
  }


  // 图书上传预览
  let handleBookPreview = function(file){
    // this.form.url = file.url;
    this.bookVisible = true;
    console.log("图书上传预览: ",this.form.url,file.url,file);
  }

  let handleAdd = function() {
    this.form = {}
    this.form.gender = 0
    this.formVisible = true
  }

  let handleEdit = function(index, row) {
    this.form = Object.assign({}, row)
    this.formVisible = true
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
      this.$axios.get('/api' + this.backgroundUrl + '/remove/' + row.id).then(res => { this.pageLoading = false
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

      //总数赋值
      this.total = res.data.total
      console.log("返回数据: " + this.total)
      this.page++;
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
        console.log("修改书籍：URL : " + this.form.id)
        this.$axios.post('/api' + this.backgroundUrl + '/update', this.form).then(res => {
          this.formLoading = false
          console.log("修改书籍：")
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
        //调用http协议
        this.$axios.post('/api' + this.backgroundUrl + '/save', this.form).then(res => {
          this.formLoading = false
          console.log("保存书籍：")
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
  }

  let handleQuery = function() {
    this.page = 1
    this.getRows()
  }

  let handleCurrentChange = function(val) {
    this.page = val
    this.getRows()
  }

  let initHeight = function() {
    this.clientHeight = (document.documentElement.clientHeight - 258) + 'px'
  }

  let indexMethod = function(index) {
    return index + 1;
  }

  let handleBookcategoryEdit = function(index, row) {

  }

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
      // 封面上传
      handleCoverPictureCardPreview,
      // 封面上传成功
      handlePicturePostSuccess,
      // 文件上传
      handleFileUpload,
      // 图书上传成功
      handleBookPostSuccess,
      // 图书上传预览
      handleBookPreview,
      // 封面上传成功
      handlePicturePostSuccess2,
      // 书籍标签管理
      handleBookcategoryEdit
    },
    mounted: function() {
      window.addEventListener('resize', this.initHeight)
      // this.initHeight()
      this.getRows()
    }
  }
</script>

<style scoped>
</style>
