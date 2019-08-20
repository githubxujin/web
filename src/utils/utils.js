// 图片压缩
export const imgcompress = img => {
  const originWidth = img.width; // 压缩后的宽
  const originHeight = img.height;
  const maxWidth = 400;
  const maxHeight = 400;
  const quality = 0.5; // 压缩质量
  const canvas = document.createElement('canvas');
  const drawer = canvas.getContext('2d');
  canvas.width = maxWidth;
  canvas.height = (originHeight / originWidth) * maxWidth;
  drawer.drawImage(img, 0, 0, canvas.width, canvas.height);
  const base64 = canvas.toDataURL('image/jpeg', quality); // 压缩后的base64图片
  let file = dataURLtoFile(base64, Date.parse(Date()) + '.jpg');
  file = { content: base64, file: file };
  console.log('1111' + JSON.stringify(file), file.file); // 压缩后的file
  return file;
};
// base64转file
export const dataURLtoFile = (dataurl, filename) => {
  const arr = dataurl.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
};
/**
 * 浏览器版本
 */
export const browserVersions = function() {
  var u = navigator.userAgent;
  var app = navigator.appVersion;
  if (window.plus && window.plus.os) {
    return {
      ios: window.plus.os.name == 'iOS',
      android: window.plus.os.name != 'iOS'
    };
  } else {
    return {
      trident: u.indexOf('Trident') > -1, // IE内核
      presto: u.indexOf('Presto') > -1, // opera内核
      webKit: u.indexOf('AppleWebKit') > -1, // 苹果、谷歌内核
      gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, // 火狐内核
      mobile: !!u.match(/AppleWebKit.*Mobile.*/), // 是否为移动终端
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
      android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, // android终端
      iPhone: u.indexOf('iPhone') > -1, // 是否为iPhone或者QQHD浏览器
      iPad: u.indexOf('iPad') > -1, // 是否iPad
      webApp: u.indexOf('Safari') == -1, // 是否web应该程序，没有头部与底部
      weixin: u.indexOf('MicroMessenger') > -1, // 是否微信 （2015-01-22新增）
      qq: u.match(/\sQQ/i) == ' qq' // 是否QQ
    };
  }
};
/**
 * 获取网络状态
 */
export const getNetStatus = function() {
  if (window.plus && window.plus.networkinfo) {
    var ret = true;
    // 获取当前网络类型
    var nt = window.plus.networkinfo.getCurrentType();
    switch (nt) {
      case window.plus.networkinfo.CONNECTION_ETHERNET:
      case window.plus.networkinfo.CONNECTION_WIFI:
        ret = true; // console.log("当前网络为WiFi");
        break;
      case window.plus.networkinfo.CONNECTION_CELL2G:
      case window.plus.networkinfo.CONNECTION_CELL3G:
      case window.plus.networkinfo.CONNECTION_CELL4G:
        ret = true; // console.log("当前网络非WiFi");
        break;
      default:
        ret = false; // console.log("当前没有网络");
        break;
    }
    return ret;
  } else {
    return navigator.onLine;
  }
};
