/*
 * @Descripttion:
 * @version:
 * @Author: ydl
 * @Date: 2023-08-02 09:19:37
 * @LastEditors: 卜倩倩
 * @LastEditTime: 2023-11-21 13:52:41
 */
export default {
  name: "滚动表格",
  width: 400,
  height: 200,
  left: 0,
  top: 0,
  api:
    "",
  sourceType: "api",
  requestType: "get",
  theader: {
    height: 26,
    background: "rgba(172, 246, 255, 0.15);",
    color: "#70e0ff",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "rgba(172, 246, 255, 0.15)",
    fontSize: 14,
    fontWeight: "normal",
    fontStyle: "normal", //'italic' 倾斜
    textAlign: "center",
    fontFamily: "Microsoft YaHei",
    letterSpacing: 0,
  },
  tbody: {
    height: 26,
    fontSize: 14,
    fontWeight: "normal",
    fontStyle: "normal", //'italic' 倾斜
    textAlign: "center",
    fontFamily: "Microsoft YaHei",
    letterSpacing: 0,
    background: "rgba(172, 246, 255, 0.05)",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "rgba(172, 246, 255, 0.05)",
    limitMoveNum: 6,
    step: 0.3,
    marginTop: 2,
  },
  otherData: {
    tableKeyData: ["name", "project_status", "rowid", "color"],
    tableKeyDataString: '["name","project_status","rowid","color"]',
    tableHead: [
      {
        label: "状态",
        value: "project_status",
        color: "#0db681",
        width: 100,
        colorData: [],
      },
      {
        label: "数据",
        value: "name",
        color: "#fff",
        width: 260,
        colorData: [],
      },
    ],
    isShowColors: false,
    background: "",
  },
  data: [
    {
      name: "数据1",
      project_status: "进行中",
      rowid: "e8167e21-454a-454d-a0a9-1fd29cf8ab5b",
      color: "#08C9C9",
    },
    {
      name: "数据2",
      project_status: "进行中",
      rowid: "28f2a862-972f-43cb-ad59-5172ef7244b8",
      color: "#08C9C9",
    },
  ],
};
