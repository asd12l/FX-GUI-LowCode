/*
 * @Descripttion: 说明
 * @version: V1.0
 * @Author: 卜倩倩
 * @Date: 2023-10-11 15:51:14
 * @LastEditors: 卜倩倩
 * @LastEditTime: 2023-11-17 17:35:59
 */
export default {
  width: 888,
  height: 800,
  left: 100,
  top: 100,
  name: '事件详情',
  isShow: true,
  isLock: false,
  isShowModule: true,
  isRelationPoi: false,
  relationWorksheetId: '',
  relationLayerId: '',
  box: {
    mainColor: 'rgba(89, 190, 225, 0.95)',
    currentBtn: '',
    backgroundPic: '',
    subtitlePic: '',
    headPic: '',
    headFontSize: 28,
    headWidth: 888,
    headHeight: 40,
    subtitleWidth: 400,
    subtitleHeight: 34,
    closePic: '',
    closeIconWidth: 20,
    closeIconHeight: 20,
    backgroundColor: 'rgba(89, 190, 225, 0.95)',
    modalBgc: 'rgba(0,0,0,.5)',
    btnModalBgc: 'rgba(89, 190, 225, 0.95)',
    selectBgc: 'rgba(89, 190, 225, 0.95)',
    svs_url: window.location.host
  },
  history: {
    show: true,
    width: 450,
    height: 400,
    selectedColor: '',
    emptyPic: ''
  },
  progressRecord: {
    show: false,
    height: 200
  },
  showField: {
    first: '#7EDEFF',
    second: '#fff',
    fontSize: 18
  },
  fields: [],
  fieldConfig: [],
  historyFieldConfig: [],
  stepFieldConfig: [],
  buttons: [],
  layerList: []
};