<template>
  <div class="order-edit">
    <div class="header">异常申请</div>
    <div class="body">
      <ul>
        <li
          v-for="(item,ind) in btns"
          :class="{'actived': actived === item.type}"
          :key="ind"
          @click="actived = item.type"
        >{{item.name}}</li>
      </ul>
      <p>申请原因</p>
      <textarea v-model="reason" id cols="30" rows="2" :placeholder="`请输入${current.name}原因`"></textarea>
    </div>
    <div class="footer">
      <span @click.stop="$emit('update:editStatus', false)">关闭</span>
      <span>确定</span>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    editStatus: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      reason: '',
      btns: [
        { name: '转单', type: 0 },
        { name: '撤单', type: 1 },
        { name: '挂单', type: 2 }
      ],
      actived: 0
    }
  },
  computed: {
    current() {
      return this.btns.find(item => item.type === this.actived)
    }
  },
  created() { },
  mounted() { },
  methods: {}
}
</script>
<style lang="scss" scoped>
.order-edit {
  position: relative;
  width: 270px;
  background: #fff;
  border-radius: 7px;
  .header {
    line-height: 45px;
    text-align: center;
    font-size: 18px;
    color: #000000;
    border-bottom: 1px solid #d7d7d7;
  }
  .body {
    padding-bottom: 15px;
    border-bottom: 1px solid #d7d7d7;
    ul {
      padding: 13px 0 19px;
      text-align: center;
      li {
        margin: 0 3.5px;
        display: inline-block;
        width: 72px;
        line-height: 28px;
        font-size: 14px;
        border: 1px solid #979797;
        &.actived {
          color: #fff;
          border-color: #108ee9;
          background: #108ee9;
        }
      }
    }
    p {
      padding-left: 21px;
      margin: 0 0 8px 0;
    }
    textarea {
      display: block;
      width: 228px;
      height: 68px;
      margin: 0 auto;
      padding: 10px;
      font-size: 14px;
      border: 1px solid #dddddd;
      border-radius: 4px;
      box-sizing: border-box;
      resize: none;
    }
  }
  .footer {
    display: flex;
    span {
      flex: 1;
      font-size: 18px;
      line-height: 50px;
      text-align: center;
      border-right: 1px solid #dcdee3;
      &:last-of-type {
        border-right: none;
        color: #006eff;
      }
    }
  }
}
</style>
