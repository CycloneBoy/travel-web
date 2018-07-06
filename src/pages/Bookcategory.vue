<!--suppress ALL -->
<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input v-model="filters.query" placeholder="标签名等条件" />
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
      <el-table-column prop="id" label="编号" width="100" align="center" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>

      <el-table-column label="书籍名称" width="100" align="center" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>编号ID: {{ scope.row.id }}</p>
            <p>书籍名称: {{ scope.row.bookTitle }}</p>
            <p>作者名称: {{ scope.row.authorsName }}</p>
            <p>标签名称: {{ scope.row.categoryLabel }}</p>
            <p>创建时间: {{ scope.row.createTime }}</p>
            <p>修改时间: {{ scope.row.updateTime }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.bookTitle }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column prop="authorsName" label="作者名称" width="100" align="center" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.authorsName }}
        </template>
      </el-table-column>

      <el-table-column prop="categoryLabel" label="标签名称" width="100" align="center" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.categoryLabel }}
        </template>
      </el-table-column>

      <el-table-column prop="updateTime" label="更新时间" width="130" align="center" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          {{ scope.row.updateTime }}
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
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
        <el-form-item label="书籍名称" prop="bookTitle">
          <el-input v-model="form.bookTitle" />
        </el-form-item>
        <!--<el-form-item label="标签名称" prop="categoryLabel">-->
          <!--<el-input v-model="form.categoryLabel" />-->
        <!--</el-form-item>-->

        <el-form-item label="标签名称" prop="categoryLabel">
          <el-select v-model="form.categoryLabel" clearable   placeholder="请选择">
            <el-option
              v-for="item in categoryRows"
              :key="item.id"
              :label="item.label"
              :value="item.label">
            </el-option>
          </el-select>
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
    bookTitle: [{
      required: true,
      message: '请输入书籍名称',
      trigger: 'blur'
    }],
    categoryLabel: [{
      required: true,
      message: '请选择标签名称',
      trigger: 'blur'
    }]

  }

  let data = () => {
    return {
      //页码
      page: 1,
      //每页数量
      size: 20,

      //查询条件
      filters: {},
      //页面数据
      rows: [],
      //页面载入状态//总数
      total: 0,
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
      backgroundUrl:'/bookstore/bookcategory',
      // 标签列表数据
      categoryRows: [],
      // 标签列表总数
      categoryTotal: 0,
      // 后端categoryURL
      backgroundCategoryUrl:'/bookstore/category',
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
        console.log("修改书籍标签：URL : " + this.form.id)
        this.$axios.post('/api' + this.backgroundUrl + '/update', this.form).then(res => {
          this.formLoading = false
          console.log("修改书籍标签：")
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

        this.form.authorsName = this.getCookie("username")
        this.form.authorsId = this.getCookie("userid")

        //调用http协议
        this.$axios.post('/api' + this.backgroundUrl + '/save', this.form).then(res => {
          this.formLoading = false
          console.log("保存标签：")
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

  let getCategoryRows = function () {
    //调用post请求
    this.$axios.get('/api' + this.backgroundCategoryUrl + '/list').then(res => {

      this.pageLoading = false
      if (!res.data || !res.data.rows){
        console.log("没有返回数据")
        return
      }

      //总数赋值
      this.categoryTotal = res.data.total
      console.log("返回数据: " + this.total)

      //页面元素赋值
      this.categoryRows = res.data.rows
    }).catch(e => this.pageLoading = false)
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
      //获取cookie
      getCookie,
      // 获取标签列表
      getCategoryRows
    },
    mounted: function() {
      window.addEventListener('resize', this.initHeight)
      // this.initHeight()
      this.getRows()
      this.getCategoryRows()
    }
  }
</script>

<style scoped>
</style>
