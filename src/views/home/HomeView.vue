<template>
  <div id="home" class="home">
    <el-row style="height: 130px;width: 100%;background-color:rgb(246, 246, 246)">
      <el-col :span="8" style="margin-top: 25px;padding-left: 70px">
        <img style="width: 150px;height: 52px;margin: 0" src="../../assets/img/fav.png" alt="">
        <div style="background: #56040e;width: 1px;height: 36px;display: inline-block;margin-top: 5px;"></div>
        <div style="display: inline-block;padding: 0;margin-left: 1px">
          <p style="font-size: 18px;font-weight: 600;margin: 0">校园二手交易</p>
          <p style="font-size: 14px;font-weight: 400;;margin: 0;color: #333333">为校友量身打造的二手交易平台</p>
        </div>
      </el-col>
      <el-col :span="9" style="margin-top: 40px">
        <el-input style="width: 510px;height: 40px;border: 2px solid #4DA5FF;" clearable
                  v-model="queryParams.title" placeholder="输入商品标题搜索"></el-input>
      </el-col>
      <el-col :span="2" style="margin-top: 40px">
        <el-button @click="getListByOne" type="primary" style="height: 45px">搜索</el-button>
      </el-col>
      <el-col :span="5" id="release">
        <div class="releaseBd" @click="sell">
          <div class="circle"><span id="sell">卖</span></div>
          <div class="reisin">
            <p>发布闲置</p>
            <p>
              <span>闲置换钱</span><span>快速出售</span>
            </p>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-empty v-if="listData.length===0" description="没有商品快去发布吧"></el-empty>
    <div v-else>
      <el-row>
        <el-col :span="6" v-for="(item, index) in listData" :key="index" style="padding: 10px">
          <el-card shadow="hover">
            <img style=";width: 300px;height: 250px" :src="item.imgUrl" class="image" @click="details(item)">
            <div style="padding: 14px;">
              <el-button type="text" style="font-size: 20px" @click="details(item)"><span>{{ item.title }}</span>
              </el-button>
              <div class="bottom clearfix">
                <time class="time">{{ item.createTime }}</time>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-row>
        <el-pagination style="float: right"
                       @current-change="handleCurrentChange"
                       :current-page="queryParams.pageNum"
                       :page-size="queryParams.pageSize"
                       layout="total, prev, pager, next, jumper"
                       :total="total">
        </el-pagination>
      </el-row>
    </div>

    <register-or-login ref="registerOrLogin"></register-or-login>
    <details-view ref="details" @getList="getList(1)"></details-view>
  </div>
</template>

<script>
import RegisterOrLogin from "@/views/login/RegisterOrLogin.vue";
import {getAction} from "@/api/manage";
import DetailsView from "@/views/home/DetailsView.vue";

export default {
  name: 'HomeView',
  components: {DetailsView, RegisterOrLogin},
  data() {
    return {
      queryParams: {
        title: '',
        state: '1',
        pageNum: 1,
        pageSize: 8

      },
      listData: [],
      total: 0,
    }
  },
  created() {
    this.getList()
  },
  methods: {
    details(item) {
      this.$refs.details.init(item)
    },
    getListByOne() {
      this.queryParams.pageNum = 1
      this.getList()
    },
    handleCurrentChange(val) {
      this.queryParams.pageNum = val
      this.getList()
    },
    getList() {
      getAction('product/list', this.queryParams).then(res => {
        this.$set(this, 'listData', res.rows)
        this.$set(this, 'total', res.total)
      })
    },
    sell() {
      if (!this.$ls.get('userInfo')) {
        this.$refs.registerOrLogin.init()
      } else {
        this.$router.replace('publish')
      }
    }
  }
}
</script>

<style>
#release {
  height: 50px;
  margin: 37px 0;
  position: relative;
}

.releaseBd {
  display: inline-block;
  position: absolute;
  right: 40px;
  width: 160px;
  top: 4px;
  cursor: pointer;
}

.releaseBd > .circle {
  display: inline-block;
  width: 40px;
  height: 40px;
  line-height: 40px;
  border-radius: 50%;
  text-align: center;
  border: 2px solid #4DA5FF;
  margin-right: 5px;
}

.releaseBd div {
  display: inline-block;
}

.reisin {
  text-align: left;
  position: absolute;
  width: 150px;
  top: 4px;
}

.reisin > p:first-of-type {
  font-size: 16px;
  font-weight: 600;
  margin: 0;
}

.reisin > p:last-of-type {
  font-size: 13px;
  font-weight: 400;
  margin: 0;
}

#sell {
  font-size: 18px;
  font-weight: 700;
  color: #4DA5FF;
}

.time {
  font-size: 13px;
  color: #999;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}
</style>
