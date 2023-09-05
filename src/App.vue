<template>
  <div id="app">
    <el-container>
      <el-header>
        <menu-component/>
      </el-header>
      <el-main>
        <main>
          <keep-alive>
            <router-view/>
          </keep-alive>
        </main>
      </el-main>
      <el-footer>
        <h3 style="margin: 20px 0;text-align: center;color: #0DA5DD;">
          本二手交易市场完全不收取中介费用，全凭客户喜好打赏。如有不便请多见谅！！！</h3>
      </el-footer>
    </el-container>
  </div>
</template>

<script>

import MenuComponent from "@/components/MenuComponent.vue";

export default {
  name: 'App',
  components: {
    MenuComponent

  }
}
</script>

<style>
.el-header, .el-footer {
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-main {
  margin: 0;
  padding: 0;
  background-color: #E9EEF3;
  color: #333;
  height: calc(100vh - 150px);
}

html {
  position: relative;
  bottom: 0;
  left: 0;
}

body {
  position: relative;
  bottom: 0;
  left: 0;
}
</style>
