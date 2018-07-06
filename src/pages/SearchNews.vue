<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar search">


      <div class="grid-content bg-purple">

        <el-row :gutter="20">
          <el-col :span="16" :offset="9" style="padding-bottom: 5px">

            <img class="img-fluid" src="@/assets/logo8.jpg" alt="输入搜索条件">

          </el-col>
        </el-row>

        <el-form :inline="true" :model="filters" class="search-form" style="align-self: center">

          <el-row :gutter="20">
            <el-col :span="16" :offset="9">

              <el-form-item>
                <el-input v-model="filters.query" placeholder="新闻标题等条件" style="width: 323px"/>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" v-on:click="handleQuery" icon="el-icon-search">查询</el-button>
              </el-form-item>

            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="16" :offset="4">
              <div class="search-condtion ">
                <div>
                  <el-form-item label=" 查询时间:">
                    <el-date-picker
                      v-model="filters.startdate"
                      type="date"
                      placeholder="开始日期">
                    </el-date-picker>


                    <el-date-picker
                      v-model="filters.enddate"
                      type="date"
                      placeholder="结束日期">
                    </el-date-picker>
                  </el-form-item>
                </div>
              </div>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="16" :offset="4">
              <div class="search-condtion ">
                <div>
                  <el-form-item label=" 新闻类型:">
                    <el-radio-group v-model="filters.type">
                      <el-radio label="不限" value="0" ></el-radio>
                    <el-radio label="考研"  value="1" ></el-radio>
                    <el-radio label="出国"  value="2"></el-radio>
                    <el-radio label="工作" value="3"></el-radio>
                    <el-radio label="其他" value="4"></el-radio>
                    </el-radio-group>
                  </el-form-item>
                </div>
              </div>
            </el-col>
          </el-row>


          <el-row :gutter="20">
            <el-col :span="16" :offset="4">
              <div class="search-condtion ">
                <div>
                  <el-form-item label="新闻标签:">
                    <el-radio-group v-model="filters.tag">
                      <el-radio label="不限" value="0" ></el-radio>
                      <el-radio label="研招新闻" value="1" ></el-radio>
                      <el-radio label="招生简章"  value="2" ></el-radio>
                      <el-radio label="学习资讯"  value="3"></el-radio>
                      <el-radio label="工作单位" value="4"></el-radio>
                    </el-radio-group>
                  </el-form-item>
                </div>
              </div>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="16" :offset="4">
              <div class="search-condtion ">

                <el-form-item label="关键词" prop="type">
                  <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>

                  <el-checkbox-group v-model="filters.cities"  @change="handleCheckedCitiesChange">
                    <el-checkbox v-for="city in mycities" :label="city.label" :key="city.label">{{ city.label}}</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>


              </div>
            </el-col>
          </el-row>


        </el-form>

      </div>


    </el-col>


    <el-table :data="rows" style="width: 100%;overflow: auto;" :height="clientHeight" stripe border
              highlight-current-row v-loading="pageLoading">
      <el-table-column align="center"
                       type="selection"
                       width="50">
      </el-table-column>
      <el-table-column
        label="列数" width="50" align="center"
        type="index"
        :index="indexMethod">
      </el-table-column>

      <el-table-column prop="id" label="新闻编号" width="50" align="center" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>

      <el-table-column prop="title" label="新闻标题" width="350" align="center" :show-overflow-tooltip="true">

        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>标题: {{scope.row.title}}</p>
            <p>大类: {{scope.row.type===1?'考研':(scope.row.type===2? '出国' : '工作') }}</p>
            <p>小类: {{scope.row.tag}}</p>
            <p>内容: {{ scope.row.content.substr(0,100) + " ... ..." }}</p>
            <p>发布日期: {{ scope.row.date }}</p>

            <div slot="reference" class="name-wrapper">
              <el-tag size="medium"> {{scope.row.title}}</el-tag>
            </div>
          </el-popover>
        </template>
        <!--<template slot-scope="scope">-->
        <!--{{scope.row.title}}-->
        <!--</template>-->
      </el-table-column>

      <el-table-column prop="type" label="大类" width="80" align="center" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{scope.row.type===1?'考研':(scope.row.type===2? '出国' : '工作') }}
        </template>
      </el-table-column>

      <el-table-column prop="tag" label="小类" width="120" align="center" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{scope.row.tag}}
        </template>
      </el-table-column>

      <!--<el-table-column label="内容" width="200"  align="center">-->
      <!--<template slot-scope="scope">-->
      <!--{{ scope.row.content }}-->
      <!--</template>-->
      <!--</el-table-column>-->


      <el-table-column label="发布日期" width="100" align="center">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.date.substr(0,10) }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="success"
            @click="handleDetail(scope.$index, scope.row)"><i class="el-icon-success"></i>详情
          </el-button>
          <el-button
            size="mini"
            type="primary"
            @click="handleEdit(scope.$index, scope.row)"><i class="el-icon-edit"></i>编辑
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"><i class="el-icon-delete"></i>删除
          </el-button>
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
          <el-input v-model="form.id"/>
        </el-form-item>
        <el-form-item label="新闻标题 " prop="title">
          <el-input v-model="form.title"/>
        </el-form-item>
        <el-form-item label="大类" prop="type">
          <el-radio-group v-model="form.type">
            <el-radio :label="1">考研</el-radio>
            <el-radio :label="2">出国</el-radio>
            <el-radio :label="3">工作</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="新闻分类" prop="tag">
          <el-input v-model="form.tag"/>
        </el-form-item>

        <el-form-item label="新闻內容" prop="content">
          <el-input type="textarea"
                    :rows="6"
                    v-model="form.content"/>
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
      message: '请输入新闻标题',
      trigger: 'blur'
    }],
    tag: [{
      required: true,
      message: '请输入新闻分类',
      trigger: 'blur'
    }],
    content: [{
      required: true,
      message: '请输入新闻內容',
      trigger: 'blur'
    }]
  }

  let cityOptions = ['上海', '北京', '广州', '深圳','华中','华南','华北','华东','武汉','杭州','成都',
                        '西南','西北','广东','浙江','福建','江苏','河北','河南'];

  let data = () => {
    return {
      name: "search-news",
      //页码
      page: 1,
      //每页数量
      size: 100,
      //总数
      total: 100,
      //查询条件
      filters: {
        type:1,
        cities:[],
        tag:1,
      },
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
      //后端URL
      searchUrl: '/bookstore/search',
      //后端URL
      backgroundUrl: '/bookstore/news',

      //城市列表选择
      mycities: [],

      checkAll: false,
      isIndeterminate: true

    }
  }


 let handleCheckAllChange = function(val) {
    console.info("全选: " +  val)
    console.info("mycities-> " +this.mycities )
    this.filters.cities = val ? this.mycities : [];
    this.isIndeterminate = false;

   console.info("filters.cities-> " +this.filters.cities + " - " +  this.isIndeterminate)
  }

   let handleCheckedCitiesChange = function(value) {
    let checkedCount = value.length;
    this.checkAll = checkedCount === this.total;
    this.isIndeterminate = checkedCount > 0 && checkedCount < this.total;
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

  let handleAdd = function () {
    this.form = {}
    this.formVisible = true
  }

  let handleEdit = function (index, row) {
    this.form = Object.assign({}, row)
    this.formVisible = true
  }

  let handleDetail = function (index, row) {

    console.info("查看详情: " + index + " " + row.id + " " + row.title)

    //跳转到首页
    console.log("用户登录成功：进行页面跳转到根目录,同时设置cookie")
    this.$router.push({
      path: '/news/detail',
      name: "新闻详情页",
      params: {
        data: row,
      }
    })


  }

  let handleDelete = function (index, row) {
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
    }).catch(e => {
    })
  }

  let getRows = function () {


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
    this.$axios.post('/api' + this.searchUrl + '/news', params).then(res => {

      this.pageLoading = false
      if (!res.data || !res.data.rows) {
        console.log("没有返回数据")
        return
      }

      console.log("返回数据: " + res.data.total)
      //页面元素赋值
      this.rows = res.data.rows
      //查询总数
      this.total = res.data.total

    }).catch(e => this.pageLoading = false)
  }

  let handleSubmit = function () {
    if (this.formLoading)
      return

    this.$refs.form.validate(valid => {
      if (!valid)
        return

      this.formLoading = true

      if (this.form.id) {  // 更新
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
      } else {
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
  }

  let handleQuery = function () {


    console.info("查询参数: "+ this.filters.query  + " - " + this.filters)

    this.page = 1
    this.getRows()
  }

  let handleCurrentChange = function (val) {
    this.page = val
    this.getRows()
  }

  let handleSizeChange = function (val) {
    this.size = val
    this.getRows()
  }

  let initHeight = function () {
    this.clientHeight = (document.documentElement.clientHeight - 258) + 'px'
  }

  let indexMethod = function (index) {
    return index + 1;
  }

  let selectCity = function () {

    let params = {
      page: 1,
      size: 100,
      query: null
    }
    console.log("请求列表: " + params.page + " " + params.size + " " + params.query)

    //调用post请求
    this.$axios.post('/api/bookstore/category/loadpage', params).then(res => {

      this.pageLoading = false
      if (!res.data || !res.data.rows){
        console.log("没有返回地区数据")
        return
      }

      //总数赋值

      this.mycities = res.data.rows


      console.info(res.data.rows )


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
      //页码大小改变
      handleSizeChange,
      //获取总数
      getTotalRows,
      //查看详情
      handleDetail,
      //选择城市
      selectCity,

      handleCheckAllChange,
      handleCheckedCitiesChange,


    },
    mounted: function () {
      window.addEventListener('resize', this.initHeight)
      // // this.initHeight()
      //
      // this.getRows()
      // this.getTotalRows()
      this.selectCity()
    }
  }
</script>

<style scoped>

  .search {
    background-color: white;
    padding-top: 50px;
    align-content: center;
  }

  .search-form {
    align-items: center;
  }

  .search-condtion {
    background-color: white;
    padding-top: 10px;
    padding-left: 10px;
    text-emphasis: #0B0A3E;
  }

</style>
