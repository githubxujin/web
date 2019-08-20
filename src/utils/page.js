import config from '../config/im';
import router from '../router/router.js';
import Vue from 'vue';
const pageMap = {
  login: config.loginUrl,
  regist: config.registUrl
};

var scrollTimer = null;

var page = {
  // 切换页面，并错误提示
  turnPage: (message, url) => {
    if (message) {
      // alert(message)
    }
    if (url) {
      router.push({
        name: 'login'
      });
    }
  },
  // 滚动聊天列表到底部
  scrollChatListDown: (pos, initCount) => {
    // console.log(4454444)
    let dom = document.getElementById('chat-list');
    // console.log(dom)
    if (!dom) {
      return;
    }
    const maxCount = 5;
    initCount = initCount || 1;
    if (typeof pos !== 'number') {
      pos = Math.max(dom.scrollHeight - dom.clientHeight, 888888);
    }
    dom.scrollBottom = pos;
    // console.log(dom.scrollTop, dom.scrollHeight)
    if (dom.scrollTop < pos && initCount < maxCount) {
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        initCount++;
        page.scrollChatListDown(pos, initCount);
      }, 200);
    }
  },
  getChatListHeight: () => {
    return document.getElementById('chat-list').scrollHeight;
  },
  getChatListScroll: () => {
    return document.getElementById('chat-list').scrollTop;
  }
};

export default page;
