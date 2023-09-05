<template>
  <div id="Help">
    <div class="top">
      <div class="help_title">
        <h1 class="help_center">HELP CENTER</h1>
        <h1 class="help">帮助中心</h1>
        <p class="serve">扫描下方二维码获取帮助</p>
      </div>
    </div>
    <div class="help_main">
      <div class="help_mainBd">
        <div class="help_mainBd_top">
          <ul class="clear">
            <li>
              <img src="@/assets/img/coderxk.png" alt="">
            </li>
            <li>
              <img src="@/assets/img/coderoylf.png" alt="">
            </li>
            <li>
              <img src="@/assets/img/codermain.png" alt="">
            </li>
          </ul>

        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#Help .top {
  background-image: url('../../assets/img/help.jpg');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: 100%;
  height: calc(100vh - 200px);
}

.help_title {
  text-align: center;
  padding-top: 30px;
}

.help_title > p {
  color: #ffffff;

}

h1 {
  color: #ffffff;
}

.help_center {
  font-size: 30px;
  margin-bottom: 15px;
}

.help {
  font-size: 30px;
  margin-bottom: 15px;
}

.serve {
  margin-top: 40px;
  font-size: 14px;
}

.help_main {
  position: relative;
  width: 730px;
  margin: 0 auto;
  color: #fff;
}

.help_mainBd_top > h3 {
  margin-top: 15px;
  margin-left: 25px;
}

.help_mainBd {
  width: 100%;
  margin: 0 auto;
  background-color: #ffffff;
  position: absolute;
  top: -250px;
  background-color: rgba(11, 27, 56, 0.3);
}


.help_mainBd_top > ul li {
  float: right;
  width: 30%;
  //text-align: center;
}

.help_mainBd_top > ul li > span {
  display: inline-block;
  margin-bottom: 30px;
}

.help_mainBd_top > ul li img {
  width: 130px;
  height: 200px;
}

.help_mainBd_top p {
  color: #f00;
  text-align: center;
  font-size: 16px;
  padding-top: 30px;
  margin-bottom: 50px;
}

.help_mainBd_top > ul {
  list-style-type: none;
  //margin-left: 15%;
}

</style>
<script setup>
</script>
