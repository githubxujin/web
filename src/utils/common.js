/**
 * 挂载到Vue上面的公共方法
 */
/** 原型扩展 */
Array.prototype.indexOf = function(val) {
  // prototype 给数组添加属性
  for (var i = 0; i < this.length; i++) {
    // this是指向数组，this.length指的数组类元素的数量
    if (this[i] == val) return i; // 数组中元素等于传入的参数，i是下标，如果存在，就将i返回
  }
  return -1;
};
Array.prototype.remove = function(val) {
  var index = this.indexOf(val);
  // console.log('remove', val, index);
  if (index > -1) {
    this.splice(index, 1);
  }
};
// 声明----如果有此 contains 直接用最好
Array.prototype.contains = function(needle) {
  for (var i in this) {
    if (this[i] === needle) return true;
  }
  return false;
};
// 移除字符串两边的空格
String.prototype.trim = function() {
  return this.replace(/(^\s*)|(\s*$)/g, '');
};
/**
 * 校验只要是数字（包含正负整数，0以及正负浮点数）就返回true
 **/
String.prototype.isNumber = function() {
  var regPos = /^\d+(\.\d+)?$/; // 非负浮点数
  var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; // 负浮点数
  if (regPos.test(this) || regNeg.test(this)) {
    return true;
  } else {
    return false;
  }
};
export default class common {
  /**
               * 防抖函数
               * @param {
               *  function
               * }
               * @returns {
               *  function
               * }
               */
  static debounce(method, delay = 400) {
    let timer = null;
    return function() {
      const self = this;
      const args = arguments;
      timer && clearTimeout(timer);
      timer = setTimeout(function() {
        method.apply(self, args);
      }, delay);
    };
  }
  // 节流函数
  static throttle(method, context) {
    clearTimeout(method.tId);
    return function() {
      method.tId = setTimeout(function() {
        method.call(context);
      }, 300);
    }
  }
}
