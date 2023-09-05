<template>
  <el-dialog
      title="详情"
      :visible.sync="show"
      :show-close="false"
      :fullscreen="fullscreenB"
      :top="'8vh'"
      :width="'900px'"
      :close-on-click-modal="false"
  >
    <div slot="title">
      <span>详情</span>
      <el-button type="primary" icon="el-icon-circle-plus-outline" v-if="!fullscreenB" style="float: right"
                 @click="fullscreenB = true">全屏
      </el-button>
      <el-button type="primary" icon="el-icon-remove-outline" v-else style="float: right" @click="fullscreenB = false">
        取消全屏
      </el-button>
    </div>
    <div :style="fullscreenB?{}:notFullScreen">
      <el-collapse v-model="activeName">
        <el-collapse-item title="商品信息" name="1">
          <template slot="title">
            <span style="font-size: 16px">商品信息</span>
          </template>
          <div>
            <!-- 商品图片 -->
            <el-image
                class="product-image"
                :src="item.imgUrl"
                alt="商品图片"
            ></el-image>

            <div class="product-info">
              <!-- 商品标题 -->
              <h2 class="product-title">{{ item.title }}</h2>

              <!-- 商品描述 -->
              <p class="product-description">{{ item.content }}</p>

              <!-- 原价（划线价）和售价 -->
              <div class="price-info">

              </div>

              <!-- 创建时间、创建人、浏览次数和收藏次数 -->
              <div class="extra-info">
                <p class="original-price" style="font-size: 18px;color: #ff5500;">原价:￥ {{ item.originalPrice }}</p>
                <p class="sale-price" style="font-size: 18px;color: #ff5500;">售价: ￥{{ item.salePrice }}</p>
                <p>发布时间: {{ item.createTime }}</p>
                <p>发布人: {{ item.createByName }}</p>
                <p>浏览次数: {{ item.viewed }}</p>
                <p>收藏次数: {{ item.collectionCount }}</p>
                <el-button v-if="showMsg && isCollect" type="warning" icon="el-icon-star-off" @click="collectSubmit">
                  收藏
                </el-button>
              </div>

            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item title="留言" name="2">
          <template slot="title" style="font-size: 16px">
            <span style="font-size: 16px">留言</span>
          </template>
          <el-row>
            <el-timeline>
              <el-timeline-item v-for="msgItem in msgList" :timestamp="msgItem.createTime" placement="top">
                <el-card>
                  <h4>{{ msgItem.message }}</h4>
                  <p v-if="userInfo.id === msgItem.userId">我 提交于 {{ msgItem.createTime }}</p>
                  <p v-else>{{ msgItem.createByName }} 提交于 {{ msgItem.createTime }}</p>
                  <el-button @click="removeMsg(msgItem)" size="mini" style="float: right;margin: 10px"
                             v-if="userInfo.id === msgItem.userId" type="danger" icon="el-icon-delete"
                             circle></el-button>
                </el-card>
              </el-timeline-item>
            </el-timeline>
          </el-row>
          <el-row v-if="showMsg">
            <el-col :span="22">
              <el-input v-model="sendMsg" placeholder="输入留言信息"></el-input>
            </el-col>
            <el-col :span="2">
              <el-button style="float: right" type="primary" icon="el-icon-chat-dot-round" :disabled="!sendMsg"
                         @click="sendMsgPost"></el-button>
            </el-col>
          </el-row>
        </el-collapse-item>
      </el-collapse>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="removeInfo" icon="el-icon-delete" v-if="isMy">删除</el-button>
     <el-button type="danger" @click="handleClose">关闭</el-button>
  </span>

  </el-dialog>
</template>

<script>


import {deleteAction, getAction, postAction} from "@/api/manage";

export default {
  name: 'details-view',

  data() {
    return {
      userInfo: {},
      isMy: false,
      isCollect: false,
      sendMsg: '',
      showMsg: false,
      msgList: [],
      fullscreenB: false,
      activeName: '1',
      show: false,
      item: {},
      notFullScreen: {'height': '400px', 'max-height': '400px', 'overflow-y': 'auto'},
      fullScreen: {'height': '800px', 'max-height': '800px', 'overflow-y': 'auto'}
    }
  },
  methods: {
    init(item) {
      this.sendMsg = ''
      let userInfo = this.$ls.get('userInfo');
      if (userInfo) {
        this.userInfo = userInfo;
        this.showMsg = (userInfo.id !== item.createBy)
        this.isMy = (userInfo.id === item.createBy)
      } else {
        this.userInfo = {}
        this.showMsg = false
      }
      this.item = item;
      this.getInfo(item)
      this.show = true
      this.addUpTheNumberOfViews()
      this.getMsg()
      this.countByProductId()
    },
    getInfo(item) {
      getAction('product/info/' + item.id).then(res => {
        this.item = res.data
      })
    },
    addUpTheNumberOfViews() {
      getAction('product/addUpTheNumberOfViews/' + this.item.id).then(() => {
      })
    },
    addCollectionTimes() {
      getAction('product/addCollectionTimes/' + this.item.id).then(() => {
      })
    },
    countByProductId() {
      getAction('favorites/countByProductId/' + this.item.id).then(res => {
        this.isCollect = res.data
      })
    },
    getMsg() {
      this.msgList = []
      getAction('message/list', {productId: this.item.id, pageNum: 1, pageSize: 1000000}).then(res => {
        this.msgList = res.rows
      })
    },
    removeMsg(item) {
      this.$confirm('确定删除留言吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteAction('message/' + item.id).then(() => {
          this.$message.success("删除留言成功!")
          this.getMsg()
        })
      })

    },
    removeInfo() {
      this.$confirm('确定删除商品吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteAction('product/' + this.item.id).then(() => {
          this.$message.success("删除商品成功!")
          this.handleClose()
        })
      })

    },
    sendMsgPost() {
      postAction('message', {productId: this.item.id, message: this.sendMsg}).then(() => {
        this.$message.success("留言成功!")
        this.sendMsg = ''
        this.getMsg()
      })
    },
    collectSubmit() {
      postAction('favorites', {productId: this.item.id}).then(() => {
        this.addCollectionTimes()
        this.countByProductId()
        this.$message.success("收藏成功!")
      })
    },
    handleClose() {
      this.$emit('getList')
      this.item = {};
      this.show = false
      this.fullscreenB = false
    }
  },
  computed: {}
}

</script>

<style scoped>
.product-details {
  display: flex;
  flex-direction: column; /* 将子元素垂直排列 */
  align-items: center; /* 水平居中对齐 */
  padding: 20px;
}

.product-image {
  max-width: 100%;
  border: 1px solid #ddd;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px; /* 图片下方留出一些间距 */
}

.product-info {
  max-width: 100%;
  text-align: center; /* 文本居中对齐 */

}

.product-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;
}

.product-description {
  font-size: 16px;
  margin-bottom: 20px;
  color: #666;
}

.price-info {
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  color: #ff5500;
  margin-bottom: 20px;
}

.original-price {
  text-decoration: line-through;
  font-size: 18px;
  color: #ff5500;
}

.extra-info p {
  justify-content: space-between;
  display: flex;
  font-size: 14px;
  margin: 5px 0;
  color: #999;
}
</style>
