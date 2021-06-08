<template>
  <div class='image-container'>
    <el-card class="box-card" >
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
          <el-breadcrumb-item>素材管理</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
      </div>
      <div style='padding-bottom: 20px'>
        <!-- <el-radio-group v-model="radio1">
          <el-radio-button @click.native="loadImages(false)" label="全部"></el-radio-button>
          <el-radio-button @click.native="loadImages(true)" label="收藏"></el-radio-button>
        </el-radio-group> -->
        <el-radio-group size = 'mini' v-model="collect" @change='loadImages(1)'>
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
        <el-button style="float: right" size = 'mini' type="success" @click="dialogUploadVisible='true'">上传素材</el-button>
      </div>
      <!-- 素材列表 -->
      <el-row :gutter="10">
        <el-col :xs="8" :sm="6" :md="4" :lg="3" v-for="(image,index) in images" :key="index">
          <el-image
          style="height: 100px"
          :src="image.url"
          fit="cover"
          class="el-icon-star-off el-icon-delete">
            <span class="el-icon-star-off"></span>
            <span class="el-icon-delete"></span></el-image>
        </el-col>
      </el-row>
      <!-- /素材列表 -->
      <!-- 数据分页 -->
      <el-pagination
        background
        layout="prev, pager, next"
        :total="totalCount"
        @current-change="onPageChange">
      </el-pagination>
      <!-- /数据分页 -->
    </el-card>
    <el-dialog title="上传素材"
    :visible.sync="dialogUploadVisible"
    :append-to-body='true'
    >
    <!--
    :modal-append-to-body='false'默认为true 遮罩层是否插入至 body 元素上，若为 false，则遮罩层会插入至 Dialog 的父元素上
    这个dialog和弹出层一起跑到image-container里面了,若为false一起跑进去-->
    <!-- :append-to-body='false'  建议用它，因为这个页面本身是在其它层上面，默认为false Dialog 自身是否插入至 body 元素上。嵌套的 Dialog 必须指定该属性并赋值为 true
    弹出层的遮挡效果，为false那么弹出层内容也被遮罩遮住，为true那么弹出层内容不会被遮罩遮住 若为true,一起跑出来到body下 -->

      <!-- upload组件本身就支持请求提交上传操作，使用它不用自己去发请求，它会自己发，
      请求方法：默认就是POST
      请求路径：action，必须写完整路径
      请求头：headers-->
      <!-- v-if="dialogUploadVisible"如果不加，那么每次添加图片时弹出层dialog会记忆之前添加的图片就是有个小勾勾那个，
      加上这个就会自动删除。
      或者设置 :show-file-list="false" 是否显示已上传文件列表,默认是true就是会显示.-->
      <el-upload
        v-if="dialogUploadVisible"
        class="upload-demo"
        drag
        action="http://api-toutiao-web.itheima.net/mp/v1_0/user/images"
        :headers="uploadHeaders"
        name="image"
        :on-success="onUploadSuccess"
        multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </el-dialog>
  </div>
</template>
<script>
import { getImages } from '@/api/image.js'
export default {
  name: 'ImageIndex',
  components: {
  },
  props: {
  },
  data () {
    const user = JSON.parse(window.localStorage.getItem('user'))
    // console.log(user)
    return {
      collect: false, // 默认查询全部素材列表
      images: [], // 图片素材列表
      dialogUploadVisible: false,
      // page: 1, 老师代码在125集的时候没有加它
      totalCount: 0, // 总图片数量
      uploadHeaders: {
        Authorization: `Bearer ${user.token}`
      }
    }
  },
  computed: {
  },
  watch: {
  },
  created () {
    // 页面初始化加载第一页的数据
    this.loadImages(1, false)
  },
  mounted () {
  },
  methods: {
    // loadImages(collect=false) {
    //   getImages({collect}).then(res => {
    //     console.log(res)
    //     this.images = res.data.data.results // 如果把后面的.url加上就实现不了，网页vue里面是空的
    //   })
    // }
    loadImages (page = 1) {
      getImages({ page, per_page: 10, collect: this.collect }).then(res => {
        // console.log(res)
        this.totalCount = res.data.data.total_count
        this.images = res.data.data.results // 如果把后面的.url加上就实现不了，网页vue里面是空的
      })
    },
    // onImagesChange (value) {
    //   this.loadImages(1, value)
    // },
    onUploadSuccess () {
      // 关闭对话框
      this.dialogUploadVisible = false
      // 更新素材列表
      this.loadImages(false) // 因为更新到全部图片，不是值只看收藏图片，所以这里传参数为false
    },
    onPageChange (page) {
      this.loadImages(page)
    }
  }
}
</script>
<style lang="less" scoped>
</style>
