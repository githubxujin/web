<template>
  <div class="common-header clear">
    <span class="fl">
      {{title}}
      <span v-show="num">({{num}})</span>
    </span>
    <i class="iconfont iconic_join_dialing_norm fr right-btn" @click="goAddRepair"></i>
    <i class="iconfont iconhuihua fr right-btn"></i>
    <i class="iconfont iconsearch fr right-btn"></i>
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
    }
  },
  data() {
    return {

    };
  },
  computed: {

  },
  created() {

  },
  mounted() {

  },
  watch: {

  },
  methods: {
    goAddRepair() {
      this.$router.push({ name: 'add-repair' })
    }
  }
};
</script>

<style scoped lang="scss">
.common-header {
  // position: fixed;
  // z-index: 2;
  .right-btn {
    margin-right: 5px;
    font-size: 20px;
    &:first-child {
      margin-right: 0px;
    }
  }
}
</style>
