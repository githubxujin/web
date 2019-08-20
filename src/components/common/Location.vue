<template>
  <div class="location">
    <span>
      <i class="iconfont icondingwei"></i>
      {{shopTitle}}
    </span>
    <span>
      <slot></slot>
    </span>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  computed: {
    // 门店名称
    shopTitle() {
      return this.$store.getters.getUserInfo.shopName;
    }
  },
  created() { },
  mounted() { },
  methods: {}
}
</script>
<style lang="scss" scoped>
.location {
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 40px;
  line-height: 40px;
  padding: 0 15px;
  font-size: 16px;
  color: #333333;
  background-color: #ffffff;
  overflow: hidden;
  .icondingwei {
    background-image: linear-gradient(
      180deg,
      rgba(255, 135, 104, 1) 0%,
      rgba(246, 85, 68, 1) 100%
    );
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}
</style>
