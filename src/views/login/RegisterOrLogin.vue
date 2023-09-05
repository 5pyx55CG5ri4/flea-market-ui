<template>
  <el-dialog
      title="请登录"
      :visible.sync="loginVisible"
      :width="'600px'"
      center
      :close-on-click-modal="false"
      :before-close="handleClose">
    <el-form :model="form" :rules="rules" ref="form" label-width="80px">
      <el-form-item label="邮箱:" prop="email">
        <el-input placeholder="请输入有效的邮箱地址" v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="验证码:" prop="code">
        <div class="countdown-container">
          <el-input placeholder="请输入验证码" v-model="form.code" style="width: 80%;margin-right: 2px"></el-input>
          <el-button :disabled="countdown > 0 || !isEmailValid" @click="sendCaptcha" class="send-button">
            <span v-if="countdown > 0" class="countdown-text">{{ countdown }}秒</span>
            <span v-else>发送验证码</span>
          </el-button>
        </div>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
     <el-button @click="handleClose">取消</el-button>
     <el-button type="primary" @click="submitForm">登录</el-button>
  </span>
  </el-dialog>
</template>

<script>


import {getAction, postAction} from "@/api/manage";

export default {
  name: 'register-or-login',
  watch: {
    'form.email'(newVal) {
      // 使用正则表达式来校验邮箱格式
      const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
      this.isEmailValid = emailRegex.test(newVal);
    },
  },
  data() {
    return {
      form: {email: '', code: ''},
      rules: {
        email: [
          {required: true, message: '请输入邮箱', trigger: 'blur'},
          {type: 'email', message: '请输入有效的邮箱地址', trigger: 'blur'},
        ],
        code: [{required: true, message: '请输入验证码', trigger: 'blur'}],
      },
      countdown: 0,
      loginVisible: false,
      isEmailValid: false,
    }
  },
  methods: {
    init() {
      this.$nextTick(() => {
        console.log(11)
        this.$set(this, 'loginVisible', true)
        this.loginVisible = true
      })
    },
    submitForm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          postAction('registeredOrLogin', this.form).then(res => {
            this.$ls.set("userInfo", res.data)
            this.$ls.set("token", res.data.token)
            this.$message.success("登录成功")
            this.$emit('loginThen')
            this.handleClose()
          })
        }
      });
    },
    handleClose() {
      this.loginVisible = false;
      this.$refs.form.resetFields()
      setTimeout(() => {
        location.reload();
      }, 500)
    },
    sendCaptcha() {
      if (!this.isEmailValid) {
        this.$message.error('请先输入有效的邮箱地址');
        return;
      }
      getAction('sendVerificationCode/' + this.form.email).then(() => {
        this.$message.success("发送成功")
      }).finally(() => {
        this.countdown = 60;
        const timer = setInterval(() => {
          if (this.countdown > 0) {
            this.countdown--;
          } else {
            clearInterval(timer);
          }
        }, 1000);
      })

    },
  },
  computed: {}
}

</script>

<style>
.countdown-container {
  display: flex;
  align-items: center;
}

.countdown-text {
  margin-right: 10px;
}

.send-button {
  flex-shrink: 0;
}
</style>
