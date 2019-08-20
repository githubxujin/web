<template>
  <div class="nav-bar clear">
    <div class="left-content">
      <i class="iconfont iconleft fl" @click="goBack"></i>
      <span class="title">{{title}}</span>
      <span v-show="num" class="number">({{num}})</span>
      <slot name="search"></slot>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String
    },
    num: {
      type: Number
    },
    type: {
      type: String
    }
  },
  data() {
    return {

    }
  },
  methods: {
    goBack() {
      if (this.type) {
        this.$router.push({ name: 'monitoring' })
      } else {
        this.$router.go(-1)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.nav-bar {
  width: 100%;
  height: 46px;
  line-height: 46px;
  background-color: #fff;
  padding: 0px 5px;
  text-align: center;
  color: #666;
  font-size: 16px;
  box-sizing: border-box;
  overflow: hidden;
  border-bottom: 1px solid #f8f8f8;
  i {
    margin-left: 3px;
    color: #3e3b3b;
    font-size: 22px;
    font-weight: 700;
  }
  .title,
  .number {
    font-size: 17px;
    color: #333333;
    font-weight: 600;
  }
  .number {
    margin-left: 5px;
  }
}
</style>

