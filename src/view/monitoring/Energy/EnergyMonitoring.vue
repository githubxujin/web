<template>
  <div class="energy-monitoring">
    <nav-bar title="能耗监控" :boxStyle="style"></nav-bar>
    <location></location>
    <div class="devices-switch-condition box-size">
      <div class="time-tab box-size">
        <span class="time" @click="showDatePicker = true">{{time}}</span>
        <span class="fr" @click="selectDevice">
          {{deviceName}}
          <i class="iconfont iconright2"></i>
        </span>
      </div>
    </div>
    <!-- 饼图展示本日电费和电量 -->
    <div class="echarts-pie flex">
      <div class="left-pie flex">
        <span>
          <i class="iconfont iconyongdianliang"></i>
          本日电量 (kWh)
        </span>
        <div class="chart">
          <v-chart :isLoading="loading" :option="todayBattery"></v-chart>
        </div>
      </div>
      <div class="right-pie flex">
        <span>
          <i class="iconfont iconqian"></i>
          本日电费 (元)
        </span>
        <div class="chart">
          <v-chart :isLoading="loading" :option="todayElectricity"></v-chart>
        </div>
      </div>
    </div>
    <div class="detail-data box-size">
      <ul class="flex">
        <li class="flex data-item">
          <span>昨日电量 (kWh)</span>
          <span class="item-text">15000</span>
        </li>
        <li class="flex data-item">
          <span>昨日电费 (元)</span>
          <span class="item-text">9200</span>
        </li>
        <li class="flex data-item">
          <span>与昨日相比</span>
          <span class="item-text">增加4.17%</span>
        </li>
      </ul>
      <ul class="flex">
        <li class="flex data-item">
          <span>本月电量 (kWh)</span>
          <span class="item-text">345000</span>
        </li>
        <li class="flex data-item">
          <span>本月电费 (元)</span>
          <span class="item-text">276000</span>
        </li>
        <li class="flex data-item">
          <span>与定额相比</span>
          <span class="item-text">减少3%</span>
        </li>
      </ul>
    </div>
    <div class="chart-line">
      <span class="title">实际能耗</span>
      <div class="chart-content">
        <v-chart class="chart" :isLoading="loading" :option="todayEnergy"></v-chart>
      </div>
    </div>
    <!-- 弹窗 -->
    <van-popup v-model="showPicker" position="bottom" :style="{ height: '35%' }">
      <!-- 选择设备时展示 -->
      <div class="listContain">
        <van-radio-group v-model="deviceNum">
          <van-cell-group>
            <van-cell
              clickable
              @click="checkPersonnel(item)"
              v-for="(item,ind) in columns"
              :key="ind"
            >
              <div class="List">
                <span>{{item.name}}</span>
              </div>
              <van-radio slot="right-icon" :name="item.value" />
            </van-cell>
          </van-cell-group>
        </van-radio-group>
      </div>
    </van-popup>
    <!-- 选择时间 -->
    <van-popup class="popup" v-model="showDatePicker" position="bottom" :style="{ height: '40%' }">
      <!-- 年 -->
      <ul class="data-type">
        <li
          v-for="(item,ind) in dateArr"
          :class="{'actived': item.value === timeType}"
          :key="ind"
          @click="gettimeType(item.value)"
        >{{item.label}}</li>
      </ul>
      <van-picker
        show-toolbar
        :columns="yearArr"
        @cancel="showDatePicker = false"
        @confirm="onConfirm"
        v-show="timeType==1"
      />
      <!-- 月 -->
      <van-datetime-picker
        v-model="currentDate"
        type="year-month"
        :min-date="minDate"
        @cancel="showDatePicker = false"
        @confirm="onConfirm"
        v-show="timeType==2"
      />
      <!-- 日 -->
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        :min-date="minDate"
        @cancel="showDatePicker = false"
        @confirm="onConfirm"
        v-show="timeType==3"
      />
    </van-popup>
  </div>
</template>
<script>
import tabBtn from '@/components/common/Tabs.vue'
import vChart from '@/components/common/Charts.vue'
import navBar from '@/components/common/NavBar.vue'
import location from '@/components/common/Location.vue'
import chartLineData from './chartLineData'
// import $ from 'jquery'
export default {
  components: { vChart, navBar, location },
  data() {
    return {
      style: {
        height: '38px',
        lineHeight: '38px',
        'background-color': '#f5f5f5'
      },
      curShop: '深圳民治天虹商城',
      deviceName: '总量',
      showPicker: false,
      showDatePicker: false,
      type: 'device', // 控制弹框中的显示内容
      deviceNum: '',
      columns: [{ name: '总量', value: '1' }, { name: '变压器1', value: 2 }, { name: '变压器2', value: 3 }, { name: '变压器3', value: 4 }],
      dateArr: [
        { label: '日', value: 3 },
        { label: '月', value: 2 },
        { label: '年', value: 1 }
      ],
      timeType: 3,
      time: '',
      yearArr: [],
      currentDate: new Date(),
      minDate: new Date(new Date().getFullYear() - 12, '00', '01'),
      loading: false,
      todayBattery: '', // 今日电量
      todayElectricity: '',
      todayEnergy: '', // 今日能耗
      option: {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
          position: 'right'
        },
        legend: {
          x: 'center',
          y: 'bottom',
          data: []
        },
        graphic: {
          type: 'text',
          left: 'center',
          top: 'center',
          // zlevel:100,
          z: 2,
          style: {
            text: '',
            fill: '#000',
            width: 100,
            height: 40,
            font: '16px Microsoft YaHei'
          }
        },
        series: [
          {
            name: '',
            type: 'pie',
            radius: ['40%', '60%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: []
          }
        ]
      }
    }
  },
  watch: {
    'showDatePicker': function(newVal) {
      if (newVal) {
        this.$nextTick(_ => {
          const dom = document.getElementsByClassName('data-type');
          if (dom) {
            dom[0].style.top = '40px';
          }
        })
      }
    }
  },
  created() {
    var month = new Date().getMonth() + 1 > 9 ? new Date().getMonth() + 1 : '0' + (new Date().getMonth() + 1);
    this.time = new Date().getFullYear() + '-' + month + '-' + new Date().getDate();
    this.getYear();
    this.getTodayEleData();
  },
  methods: {
    selectDevice() {
      this.type = 'device';
      this.showPicker = true;
    },
    // 选择设备
    checkPersonnel(item) {
      this.deviceName = item.name;
      this.deviceNum = item.value;
      this.showPicker = false;
    },
    // 切换时间
    gettimeType(val) {
      this.timeType = val;
    },
    getYear() {
      let year = new Date().getFullYear()
      for (let i = 0; i < 10; i++) {
        year++
        this.yearArr.push(year)
      }
    },
    onConfirm(val) {
      console.log(val)
      if (this.timeType != 1) {
        var month = val.getMonth() + 1 >= 10 ? val.getMonth() + 1 : '0' + (val.getMonth() + 1);
      }
      switch (this.timeType) {
        case 1:
          this.time = val + '年';
          break;
        case 2:
          this.time = val.getFullYear() + '-' + month;
          break;
        default:
          const date = val.getDate() >= 10 ? val.getDate() : '0' + val.getDate();
          this.time = val.getFullYear() + '-' + month + '-' + date;
          break;
      }
      this.showDatePicker = false;
    },
    getTodayEleData() {
      this.todayBattery = JSON.parse(JSON.stringify(this.option));
      this.todayBattery.legend.data = ['峰', '谷', '平'];
      this.todayBattery.series[0].name = '用电量';
      this.todayBattery.color = ['#2597FF', '#08D8AA', '#FACC14'];
      this.todayBattery.graphic.style.text = '5000';
      this.todayBattery.series[0].data = [
        { value: 2500, name: '峰' },
        { value: 1500, name: '谷' },
        { value: 1000, name: '平' }
      ];
      this.todayElectricity = JSON.parse(JSON.stringify(this.option));
      this.todayElectricity.legend.data = ['峰', '谷', '平'];
      this.todayElectricity.series[0].name = '电费';
      this.todayElectricity.color = ['#2597FF', '#08D8AA', '#FACC14'];
      this.todayElectricity.graphic.style.text = '2700';
      this.todayElectricity.tooltip.position = 'left';
      this.todayElectricity.series[0].data = [
        { value: 1400, name: '峰' },
        { value: 700, name: '谷' },
        { value: 600, name: '平' }
      ];
      this.todayEnergy = JSON.parse(JSON.stringify(chartLineData));
    }
  }
}
</script>
<style lang="scss" scoped>
.energy-monitoring {
  width: 100%;
  height: 100%;
  background-color: #fff;
  .popup {
    /deep/ .van-picker__toolbar {
      background: #fff;
    }
    .data-type {
      border: 1px solid #007aff;
      border-radius: 4px;
      overflow: hidden;
      display: flex;
      width: 360px;
      left: 7px;
      margin: 0 auto;
      background: #fff;
      position: absolute;
      z-index: 11;
      li {
        flex: 1;
        line-height: 29px;
        text-align: center;
        border-right: 1px solid #007aff;
        &.actived {
          background: #007aff;
          color: #fff;
        }
        &:last-of-type {
          border: none;
        }
      }
    }
    /deep/ .van-picker__toolbar {
      position: absolute;
      width: 100%;
      z-index: 10;
    }
  }
  .devices-switch-condition {
    background-color: #f5f5f5;
    padding: 10px;
    .curShop {
      font-size: 14px;
    }
    .iconright2 {
      font-size: 12px;
      position: relative;
      bottom: -2px;
    }
  }
  .time-tab {
    width: 100%;
    span {
      position: relative;
      display: inline-block;
      line-height: 24px;
      padding: 0 30px 0 25px;
      font-size: 14px;
      border-radius: 24px;
      color: #006eff;
      background: #fff;
      &:after {
        content: "";
        position: absolute;
        width: 0px;
        height: 0px;
        right: 17px;
        bottom: 6px;
        border-left: 4px solid transparent;
        border-top: 4px solid #006eff;
        border-right: 4px solid transparent;
        border-bottom: 4px solid transparent;
      }
    }
    .time-type {
      margin-left: 8px;
    }
    .time {
      font-size: 12px;
    }
    i {
      transform: rotate(90deg);
    }
  }
  .echarts-pie {
    width: 100%;
    padding-top: 10px;
    border-bottom: 3px solid #f5f5f5;
    overflow: hidden;
    .left-pie,
    .right-pie {
      flex: 1;
      flex-direction: column;
      > span {
        display: flex;
        .iconyongdianliang {
          color: #ff942b;
        }
        .iconqian {
          color: #ff4444;
        }
      }
      .chart {
        width: 100%;
        height: 150px;
      }
    }
  }
  .chart-line {
    position: relative;
    height: 250px;

    .title {
      position: absolute;
      left: 15px;
      top: 20px;
      color: #555555;
      font-size: 11px;
    }
    .chart-content {
      overflow: auto;
      height: 250px;
      -webkit-overflow-scrolling: touch;
      .chart {
        width: 1280px;
      }
    }
  }
  .detail-data {
    width: 100%;
    padding: 5px 15px;
    border-bottom: 3px solid #f5f5f5;
    .data-item {
      flex: 1;
      flex-direction: column;
      border-bottom: 5px;
      .item-text {
        color: #000;
        font-weight: 600;
      }
    }
  }
}
</style>

