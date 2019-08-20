<template>
  <div class="workList">
    <div class="list-item" v-for="(item,index) in dataList " :key="index" @click="lookDetails">
      <div class="left-picture">
        <span
          v-html="item.type==1?'商户报修':(item.type==2?'平台报修':(item.type==3?'巡检':'保养'))"
          class="left-picture-item"
        ></span>
      </div>
      <div class="right-info">
        <p>工单号：{{item.number}}</p>
        <p>
          <span v-html="item.type==1?'报修人：'+item.repairMan:item.repairMan" class="repairMen"></span>
          <span>位置：{{item.position}}</span>
        </p>
        <p>{{item.problem}}</p>
        <p>{{item.time}}</p>
        <van-button type="default" class="detail-btn">查看详情</van-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    dataList: {
      type: Array
    },
    type: {
      type: Number
    }
  },
  data() {
    return {

    }
  },
  computed: {
    roleType: function() {
      return this.$store.getters.getUserInfo.roleType;
    }
  },
  methods: {
    lookDetails() {
      this.$router.push({ name: 'orderDetail' })
    }
  }
}
</script>

<style lang="scss" scoped>
.workList {
  .list-item {
    width: 100%;
    height: 100%;
    padding: 6px;
    box-sizing: border-box;
    background-color: #fff;
    margin-bottom: 3px;
    display: flex;
    &:last-child {
      margin-bottom: 0px;
    }
    .left-picture {
      flex-basis: 35px;
      height: 60px;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #dedede;
      margin-right: 10px;
      .left-picture-item {
        display: inline-block;
        width: 24px;
      }
    }
    .right-info {
      flex: 1;
      height: 100%;
      position: relative;
      .repairMen {
        margin-right: 8px;
      }
      .detail-btn {
        position: absolute;
        bottom: 0px;
        right: 30px;
      }
      /deep/ .van-button {
        height: 30px;
        line-height: 30px;
      }
    }
  }
}
</style>

