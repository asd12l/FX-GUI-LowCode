/*
 * @Descripttion: 说明
 * @version: V1.0
 * @Author: 卜倩倩
 * @Date: 2023-10-13 09:46:16
 * @LastEditors: 卜倩倩
 * @LastEditTime: 2023-11-24 13:35:35
 */
export default {
  width: 870,
  height: 536,
  left: 100,
  top: 100,
  name: '摄像头',
  isShow: true,
  isLock: false,
  isShowModule: true,
  isRelationPoi: false,
  relationWorksheetId: '',
  relationLayerId: '',
  box: {
    width: 870,
    height: 650,
    backgroundColor: 'rgba(4, 21, 27, 0.95)',
    headPic: require('../../../assets/image/img/map/camera/8.png'),
    headFontSize: 26,
    closePic: require('../../../assets/image/img/map/eventDetail/2.png'),
    emptyPic: require('../../../assets/image/img/map/camera/6.png'),
    closeIconWidth: 20,
    closeIconHeight: 20,
    modalBgc: 'rgba(0,0,0,.5)',
    svs_url: window.location.host
  },
  controlBtn: {
    width: 70,
    height: 70,
    upwardPic: require('../../../assets/image/img/map/camera/2.png'),
    upwardPic_hover: require('../../../assets/image/img/map/camera/3.png'),
    shrinkPic: require('../../../assets/image/img/map/camera/5.png'),
    shrinkPic_hover: require('../../../assets/image/img/map/camera/5.png'),
    enlargePic: require('../../../assets/image/img/map/camera/4.png'),
    enlargePic_hover: require('../../../assets/image/img/map/camera/4.png'),
  },
  offline_record: {
    isShow: false,
    pic: require('../../../assets/image/img/map/camera/1.png'),
    headFont: 16,
    dataFont: 16,
    color: '#fff',
    lineColor: 'rgba(12, 223, 242, 0.05)'
  }
}