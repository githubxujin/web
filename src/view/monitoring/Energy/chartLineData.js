export default {
  color: ['#3398DB'],
  tooltip: {
    trigger: 'item',
    formatter: '{b} <br/> 实际能耗: {c}',
    position: 'right'
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      data: [
        'Mon',
        'Tue',
        'Wed',
        'Thu',
        'Fri',
        'Sat',
        'Sun',
        'Mon',
        'Tue',
        'Wed',
        'Thu',
        'Fri',
        'Sat',
        'Sun',
        'Mon',
        'Tue',
        'Wed',
        'Thu',
        'Fri',
        'Sat',
        'Sun'
      ],
      axisTick: {
        alignWithLabel: true
      }
    }
  ],
  yAxis: [
    // {
    //   show: false,
    //   type: 'value'
    // }
    {
      // show: false,
      type: 'value',
      axisTick: { show: false },
      splitLine: { show: true, lineStyle: { type: 'dashed' }}
    }
  ],
  series: [
    {
      name: '',
      type: 'bar',
      barWidth: '30',
      data: [10, 52, 200, 334, 390, 330, 220]
    }
  ]
}
