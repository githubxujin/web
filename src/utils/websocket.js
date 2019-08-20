let ws = null
function initWebSocket(params, callback, url) {
  ws = new WebSocket(url)
  ws.onopen = function() {
    console.log('连接成功')
    ws.send(JSON.stringify(params))
    console.log('webSocket发送参数为', params)
  }
  ws.onmessage = function(e) {
    // 连接成功信息不存name属性
    // console.log('onmessage', e);
    if (!e.data) return
    const res = JSON.parse(e.data)
    if (res) {
      callback && callback(res)
    }
  }
  ws.onclose = function(e) {
    console.log('close')
  }

  ws.onerror = function(event) {
    console.log('WebSocket连接发生错误', event)
    // 连接建立失败重连
    // let _self = this
    // window.setTimeout(function () {
    //     _self.ws.readyState === 3 && _self.initWebSocket()
    // }, 1000)
  }
  return ws // 返回这个对象便于后续发送参数
}
function initWebSocketString(params, callback, url) {
  ws = new WebSocket(url)
  // ws = 'MozWebSocket' in window ? new MozWebSocket(url) : new WebSocket(url)
  ws.onopen = function() {
    console.log('连接成功')
    ws.send(params)
    console.log('webSocket发送参数为', params)
  }
  ws.onmessage = function(e) {
    // 连接成功信息不存name属性
    // console.log('onmessage', e);
    if (!e.data) return
    const res = JSON.parse(e.data)
    if (res) {
      callback && callback(res)
    }
  }
  ws.onclose = function(e) {
    console.log('close')
  }

  ws.onerror = function(event) {
    console.log('WebSocket连接发生错误', event)
    // 连接建立失败重连
    // const _self = this
    // window.setTimeout(function() {
    //   _self.ws.readyState === 3 && _self.initWebSocket()
    // }, 1000)
  }
  return ws // 返回这个对象便于后续发送参数
}
export { initWebSocket, initWebSocketString }
