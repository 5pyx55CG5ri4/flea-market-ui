<template>
  <el-row :gutter="20">
    <el-col :span="6">
      <div class="imgbox">
        <a href="/home">
          <img src="@/assets/img/logo.png" class="top_img" alt="">
        </a>
      </div>
    </el-col>
    <el-col :span="14">
      <div style="margin-left: 70px">
        <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect">
          <el-menu-item index="home" class="px16 pointer">首页</el-menu-item>
          <el-menu-item index="publish" class="px16 pointer">发布</el-menu-item>
          <el-menu-item index="collect" class="px16 pointer">收藏</el-menu-item>
          <el-menu-item index="help" class="px16 pointer">帮助</el-menu-item>
        </el-menu>
      </div>
    </el-col>
    <el-col :span="4">
      <div class="px14" v-if="userInfo">
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
          <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" size="small"  />{{userInfo.nickName}}
            <i
                class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="loginOut">退出登录</el-dropdown-item>

          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <el-button v-else type="text" @click="login"><span class="px16 pointer">登录</span></el-button>
    </el-col>
    <register-or-login ref="registerOrLogin" @loginThen="loginThen"></register-or-login>
  </el-row>
</template>
<script>

import RegisterOrLogin from "@/views/login/RegisterOrLogin.vue";

export default {
  name: 'menuComponent',
  computed: {
    activeIndex() {
      const {name} = this.$route;
      return name
    }
  },
  components: {RegisterOrLogin},
  data() {
    return {
      userInfo: null,
    };
  },
  created() {
    this.loginThen()
  },
  methods: {
    handleCommand(command) {
      switch (command) {
        case 'loginOut':
          this.$confirm('确定退出账号吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$ls.remove('userInfo')
            this.$ls.remove('token')
            this.loginThen()
            this.$message.success("退出成功!")
            setTimeout(() => {
              this.$router.replace('home')
            }, 500)
          })
          break
      }
    },
    loginThen() {
      this.userInfo = this.$ls.get('userInfo');
    },
    login() {
      this.$refs.registerOrLogin.init()
    },
    handleSelect(key) {
      if (key === 'collect' || key === 'publish') {
        this.loginThen()
        if (!this.userInfo) {
          this.login()
          return
        }
      }
      this.$router.replace(key)
    }
  }
}
</script>
<style>
.px16 {
  font-size: 16px;
}

.pointer {
  cursor: pointer;
}

.top_img {
  width: 100%;
  height: 100%;
}

.px14 {
  font-size: 14px;
}

.imgbox {
  height: 60px;
  width: 220px;
  margin-right: 100px;
  line-height: 50px;
}
</style>
