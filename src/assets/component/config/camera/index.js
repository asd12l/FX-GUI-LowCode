/*
 * @Descripttion: 说明
 * @version: V1.0
 * @Author: 卜倩倩
 * @Date: 2023-08-01 13:53:44
 * @LastEditors: 卜倩倩
 * @LastEditTime: 2023-11-21 13:40:22
 */
export default {
  width: 848,
  height: 240,
  left: 0,
  top: 0,
  name: "视频",
  show: true,
  lock: true,
  isShowModule: true,
  series: {
    type: "",
  },
  // sourceType: "api",
  // api:
  // 'https://www.sjxks.com/v1/xiaokunshan/administer/getImportantCameraData?camera_tag=%E5%9F%8E%E8%BF%90%E9%87%8D%E7%82%B9%E7%9B%91%E6%8E%A7&account_id=eb71dac7-a4dc-4cbb-9022-251c93acca1e',
  // requestType: "get",
  // data:[],
  sourceType: "静态",
  address:
    "",
  svs_url: `${document.location.protocol}//${window.location.host}`,
  data: [
    {
      rowid: "7f863e2f-515c-4cb5-84c8-84d8a879a47e",
      device_name: "视频1",
      camera_type: "枪机",
      master_national_num: "31011700011180000006",
      device_status: "在线",
      master_channel: "31011712101320000008",
    },
    {
      rowid: "4da3e9f8-a4ce-49ea-9d2d-95b8c30e503d",
      device_name: "视频2",
      camera_type: "枪机",
      master_national_num: "31011700011180000006",
      device_status: "在线",
      master_channel: "31011712101320000006",
    },
    {
      rowid: "104ee131-a331-44bf-9845-b6ad9e06ed4e",
      device_name: "视频3",
      camera_type: "枪机",
      master_national_num: "31011700011180000006",
      device_status: "在线",
      master_channel: "31011712101320000004",
    }
  ],

  video: {
    width: 420,
    height: 237,
    dataNumber: 2,
    time: 10,
    scroll: true,
    background: require("@/assets/component/img/cameraNo.png"),
  },
  controlSize: 14,
};
