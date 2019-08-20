/**
 * 提取给排水websocket公用模块
 */
import { initWebSocketString } from '@/utils/websocket'
export default {
  data() {
    return {
      websocketInstance: null
    }
  },
  computed: {
    shopNumber() {
      return this.$store.getters.shopNumber
    }
  },
  created() {
    this.websocketInstance = initWebSocketString(
      this.shopNumber,
      result => {
        console.log('收到监测的消息', result)
        this.refreshData(result)
      },
      'ws://192.168.1.152/ws/common/drainage-ws/websocket'
    )
  },
  destroyed() {
    this.websocketInstance.close()
    this.websocketInstance = null
  }
}
