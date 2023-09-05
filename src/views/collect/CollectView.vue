<template>
  <el-card>
    <el-empty v-if="listData.length===0" description="未收藏任何商品"></el-empty>
    <div v-else>
      <el-row>
        <el-col :span="22">
          <el-input v-model="queryParams.title" style="width: 50%;float: right"
                    placeholder="输入商品标题搜索"></el-input>
        </el-col>
        <el-col :span="2">
          <el-button clearable type="primary" style="margin-left:2px;" @click="getList(1)">搜索</el-button>
        </el-col>
      </el-row>
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
            <el-button @click="cancel(item)" size="mini" type="danger"
                       style="float: right;margin-top: 2px;margin-bottom:4px">取消收藏
            </el-button>
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
    <details-view ref="details" @getList="getList(1)"></details-view>
  </el-card>

</template>
<script>
import {deleteAction, getAction} from "@/api/manage";
import DetailsView from "@/views/home/DetailsView.vue";

export default {
  components: {DetailsView},
  data() {
    return {
      userInfo: {},
      queryParams: {
        title: '',
        pageNum: 1,
        pageSize: 8,
      },
      listData: [],
      total: 0,
    }
  },
  created() {
    this.getList()
  },
  methods: {
    cancel(item) {
      this.$confirm('确定取消收藏吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteAction('favorites/' + item.favoritesId).then(() => {
          this.$message.success("取消收藏成功")
          this.getList(1)
        })
      })

    },
    details(item) {
      this.$refs.details.init(item)
    },
    getList(pageNum) {
      var userInfo = this.$ls.get('userInfo');
      if (!userInfo) {
        return
      }
      if (pageNum) {
        this.queryParams.pageNum = pageNum
      }
      getAction('product/myList', this.queryParams).then(res => {
        this.$set(this, 'listData', res.rows)
        this.$set(this, 'total', res.total)
      })
    },
    handleCurrentChange(val) {
      this.queryParams.pageNum = val
      this.getList()
    },
  }
}
</script>
<style scoped>
.main {
  margin: 0;
  padding: 0;
  background-color: #E9EEF3;
  color: #333;
  height: calc(100vh - 150px);
  max-height: calc(100vh - 150px);
  overflow-y: auto;
}
</style>
