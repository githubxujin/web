/**
 * 正则表达式
 */
export default class Regexps {
  constructor() {}
  /** *
   * 手机号码正则表达式
   */
  static mobile = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
  /**
   * 汉字
   */
  static chinese = /^[\u4e00-\u9fa5]*$/;
}
