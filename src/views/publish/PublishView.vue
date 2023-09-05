<template>
  <el-card class="box-card">
    <el-row style="width: 50%;margin: 10px;margin-left:300px;padding: 20px">
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="商品标题:" prop="title">
          <el-input placeholder="请输入商品标题" v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="商品描述:" prop="content">
          <el-input placeholder="请输入商品描述" type="textarea" v-model="form.content"></el-input>
        </el-form-item>
        <el-form-item label="商品图片:" prop="imgUrl">
          <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
          >
            <img v-if="form.imgUrl" :src="form.imgUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="商品原价:" prop="originalPrice">
          <el-input-number :precision="2" placeholder="请输入商品原价" style="width: 50%"
                           v-model="form.originalPrice"></el-input-number>
        </el-form-item>
        <el-form-item label="商品售价:" prop="salePrice">
          <el-input-number :precision="2" placeholder="请输入商品售价" style="width: 50%"
                           v-model="form.salePrice"></el-input-number>
        </el-form-item>
      </el-form>
      <el-button style="float: right;margin-left: 20px" type="primary" @click="onSubmit">发布</el-button>
      <el-button style="float: right;" @click="clear">清空</el-button>

    </el-row>

  </el-card>

</template>
<script>
import {postAction} from "@/api/manage";

export default {
  name: 'PublishView',
  components: {},
  data() {
    return {
      uploadUrl: window._CONFIG['baseUrl'] + '/image/upload',
      rules: {
        title: [
          {required: true, message: '请输入商品标题', trigger: 'blur'},
        ],
        content: [{required: true, message: '请输入商品描述', trigger: 'blur'}],
        imgUrl: [{required: true, message: '请上传图片', trigger: 'blur'}],
        originalPrice: [{required: true, message: '请输入商品原价', trigger: 'blur'}],
        salePrice: [{required: true, message: '请输入商品售价', trigger: 'blur'}],
      },
      form: {
        title: '',
        content: '',
        imgUrl: '',
        originalPrice: '',
        salePrice: '',
      }
    }
  },
  created() {

  },
  methods: {
    clear() {
      this.$refs.form.resetFields()
    },
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          postAction('product', this.form).then(res => {
            this.$message.success("发布成功");
            this.$refs.form.resetFields()
          })
        }
      });
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 1;
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 1MB!');
      }
      return isLt2M;
    },
    handleAvatarSuccess(res, file) {
      this.form.imgUrl = window._CONFIG['baseUrl'] + res.data
      this.$message.success("上传成功")
    },
  }
}
</script>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #8c939d !important;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}

.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
</style>
