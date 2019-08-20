<template>
  <div class="main-container">
    <div class="loading" v-show="isLoading">
      <van-loading size="24px" vertical color="#1989fa" type="spinner">数据加载中...</van-loading>
    </div>
    <div class="shadow" v-show="!isLoading && isOptionAbnormal">数据为空</div>
    <div class="wrap-container" v-show="!isLoading && !isOptionAbnormal">
      <div class="echarts" :id="randomId"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Echarts',
  props: {
    option: {
      default() {
        return {}
      }
    },
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      myEcharts: null,
      isOptionAbnormal: false,
      randomId: 'echarts-dom' + Date.now() + Math.random()
    }
  },
  created() {

  },
  mounted() {
    this.init();
    this.mapClick();
    this.checkAndSetOption();
  },
  watch: {
    option: {
      handler: function(newVal, oldVal) {
        this.checkAndSetOption();
      },
      deep: true
    }
  },
  methods: {
    init() {
      const $echartsDOM = document.getElementById(this.randomId)
      if (!$echartsDOM) return
      const myEcharts = this.$echarts.init($echartsDOM);
      this.myEcharts = myEcharts;
      window.addEventListener('resize', () => { this.myEcharts.resize(); });
    },
    isValidOption(option) {
      return this.isObject(option) && !this.isEmptyObject(option) &&
        this.hasSeriesKey(option) &&
        this.isSeriesArray(option) && !this.isSeriesEmpty(option)
    },

    isObject(option) {
      return Object.prototype.isPrototypeOf(option)
    },

    isEmptyObject(option) {
      return Object.keys(option).length === 0
    },

    hasSeriesKey(option) {
      return !!option['series']
    },

    isSeriesArray(option) {
      return Array.isArray(option['series'])
    },

    isSeriesEmpty(option) {
      return option['series'].length === 0
    },
    checkAndSetOption() {
      const option = this.option;
      if (this.isValidOption(option)) {
        // console.log(option.series[0].mapType)
        this.myEcharts.setOption(option)
        this.isOptionAbnormal = false
      } else {
        this.isOptionAbnormal = true
      }
    },
    mapClick() {
      const that = this;
      this.myEcharts.on('click', function(params) {
        if (params.seriesType == 'map') {
          that.$emit('mapValue', params.name);
        }
      })
    }
  }
}

</script>
<style>
.main-container {
  width: 100%;
  position: relative;
  height: 100% !important;
}

.wrap-container,
.loading,
.shadow {
  position: absolute;
}

.wrap-container,
.echarts {
  width: 100%;
  height: 100%;
}

.shadow,
.loading {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  color: #8590a6;
}
</style>
