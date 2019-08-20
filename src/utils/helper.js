// 存储数据到localStorage
export const setItem = (key, val) => {
  const storage = window.localStorage;
  storage.setItem(key, JSON.stringify(val));
  return val;
}
// 从localStorage获取数据
export const getItem = (key) => {
  const storage = window.localStorage;
  const val = JSON.parse(storage.getItem(key));
  return val;
}
// 从localStorage删除数据
export const removeItem = (key) => {
  const storage = window.localStorage;
  if (key) {
    storage.removeItem(key);
  } else {
    storage.removeItem('point');
    storage.removeItem('classesTime');
    storage.removeItem('forceTime');
    storage.removeItem('shiftObject');
    storage.removeItem('department');
    storage.removeItem('departMember');
    storage.removeItem('selectList');
    storage.removeItem('strlist');
    storage.removeItem('classesName');
    storage.removeItem('startState');
    storage.removeItem('issunday');
    storage.removeItem('issaturday');
    storage.removeItem('classesID');
    storage.removeItem('countmember');
    storage.removeItem('flag');
  }
}
export const removeStorage = () => {
  const storage = window.localStorage;
  storage.removeItem('view');
  storage.removeItem('userInfo');
  storage.removeItem('token');
  storage.removeItem('perssion');
  storage.removeItem('uid');
  storage.removeItem('sdktoken');
}
export const timeTodate = (val) => {
  const date = new Date(val);
  const seperator1 = '-';
  const seperator2 = ':';
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  let days = date.getDate();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  if (month >= 0 && month <= 9) {
    month = '0' + month;
  }
  if (days >= 0 && days <= 9) {
    days = '0' + days;
  }
  if (hours >= 0 && hours <= 9) {
    hours = '0' + hours;
  }
  if (minutes >= 0 && minutes <= 9) {
    minutes = '0' + minutes;
  }
  if (seconds >= 0 && seconds <= 9) {
    seconds = '0' + seconds;
  }
  const time = year + seperator1 + month + seperator1 + days +
    ' ' + hours + seperator2 + minutes +
    seperator2 + seconds;
  return time;
}
export const remainder = (key) => {
  const str = key.toString().replace('.', '小时');
  return str + '分钟';
}
export const replaceTime = (key) => {
  const str = key.toString().replace('T', ' ');
  return str;
}

export const deepCopy = (obj) => {
  return JSON.parse(JSON.stringify(obj))
}

// 图片压缩
export const imgcompress = (img) => {
  const originWidth = img.width; // 压缩后的宽
  const originHeight = img.height;
  const maxWidth = 400; const maxHeight = 400;
  const quality = 0.5; // 压缩质量
  const canvas = document.createElement('canvas');
  const drawer = canvas.getContext('2d');
  canvas.width = maxWidth;
  canvas.height = originHeight / originWidth * maxWidth;
  drawer.drawImage(img, 0, 0, canvas.width, canvas.height);
  const base64 = canvas.toDataURL('image/jpeg', quality); // 压缩后的base64图片
  let file = dataURLtoFile(base64, Date.parse(Date()) + '.jpg');
  file = { content: base64, file: file };
  console.log(file);// 压缩后的file
  return file;
}
// base64转file
export const dataURLtoFile = (dataurl, filename) => {
  const arr = dataurl.split(','); const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]); let n = bstr.length; const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}
