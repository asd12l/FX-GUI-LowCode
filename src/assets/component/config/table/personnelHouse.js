/*
 * @Descripttion:
 * @version:
 * @Author: ydl
 * @Date: 2023-07-21 09:10:10
 * @LastEditors: 卜倩倩
 * @LastEditTime: 2023-11-21 13:56:14
 */
export default {
  name: "人房信息",
  width: 794,
  height: 700,
  left: 0,
  top: 0,
  relationWorksheetId: '652cee0d1f76aeb5855bcbed',
  box: {
    relationLayerId: '',
    desensitization: false,//手机号脱敏
    input: ['mobile'],
    numDesensitization: ['mobile'],
    houseWorksheetId: '652cd71a1f76aeb5855bc643',
    name: 'name',
    backgroundImg: require('@/assets/image/xiaokunshan/bg14.png'),
    headImg: require('@/assets/image/xiaokunshan/pop-title.png'),
    closeImg: require('@/assets/image/xiaokunshan/bg11.png'),
    smallImg: require('@/assets/image/xiaokunshan/title2.png'),
    height: 44,
    color: '#fff',
    fontSize: 26,
    fontWeight: "bold",
    fontStyle: "normal", //'italic' 倾斜
    fontFamily: "Microsoft YaHei",
    textAlign: "left",
    smallTitle: {
      height: 40,
      fontSize: 20,
      fontWeight: "normal",
      fontStyle: "normal", //'italic' 倾斜
      fontFamily: "Microsoft YaHei",
      textAlign: "left",
      textIndent: 50,
    }
  },
  sourceType: "静态",
  showDataType: "table",
  worksheetId: 'zhsq_rfyhyl',
  isRelationPoi: false,
  tableHeadStyle: {
    styleData: [],
  },
  houseData: {
    fontSize: 16,
    tableLeft: {
      width: 120,
      height: 34,
      color: '#64beff',
      borderColor: 'rgba(48, 141, 255, 0.2)',
      background: 'rgba(48, 141, 255, 0.05)',
    },
    tableRight: {
      width: 250,
      height: 34,
      color: '#fff',
      borderColor: 'rgba(48, 141, 255, 0.3)',
      background: 'rgba(48, 141, 255, 0.15)',
    },
    tableKeyData: ['rental_type', "people_num", "is_rental", "mobile", "address", "obligee", 'household_name'],
    tableHead: [
      {
        label: "房屋性质：",
        value: "rental_type"
      },
      {
        label: "居住人数：", value: "people_num", color: "#fff",
      },
      {
        label: "户主姓名：", value: "household_name", color: "#fff",
      },
      {
        label: "详细地址：", value: "address", color: "#fff",
      },
      { label: "权利人：", value: "obligee", color: "#fff" },
      { label: "权利人电话：", value: "mobile", color: "#fff" },
    ],
    colorData: [[], [], [], [], [], []],
  },
  personnelData: {
    height: 370,
    houseTableId: '652cd71a1f76aeb5855bc652',
    opacity: 0.2,
    dataNumber: 1,
    tableKeyData: ['name', "mobile", "attr", "mobile", "skill"],
    titleName: '住户名称',
    theader: {
      background: "rgba(125, 221, 255, 0.1)",
      borderColor: ' rgba(69, 162, 255, 0.3)',
      color: "#ACDAFF",
      height: 40,
      fontSize: 16,
      fontWeight: "normal",
      fontStyle: "normal", //'italic' 倾斜
      fontFamily: "Microsoft YaHei",
      textAlign: "center",
    },
    tbody: {
      height: 60,
      background: 'rgba(48, 141, 255, 0.3)',
      fontSize: 14,
      fontWeight: "normal",
      fontStyle: "normal", //'italic' 倾斜
      fontFamily: "Microsoft YaHei",
      letterSpacing: 0,
      color: "#fff",
    },
    tableHead: [
      {
        label: "住户姓名",
        value: "name",
        color: "#FFDB6B",
      },
      { label: "手机号码", value: "mobile", color: "#fff", },
      { label: "类型", value: "attr", color: "#fff", },
      { label: "特殊人员标签", value: "skill", color: "#fff", },
    ],
    colorData: [[], [], [], [], [], []],
  },
  data: {
    position: "121.6,28.6,19.58",
    district: "[]",
    type: "大套",
    is_rental: "否",
    obligee: "张三",
    mobile: "+86136xxxx2677",
    address: "三区45幢3",
    people: [
      {
        household_name: "张三",
        name: "张三",
        mobile: "+86139xxxx8099",
        attr: "子",
        type: [],
        skill: ['80+', '退役军人'],
        tags: [],
        rowid: "c4f730ca-21b2-4a82-a7b0-b19014a643d9",
      },
      {
        household_name: "张三",
        name: "李四",
        mobile: "+86139xxxx8099",
        attr: "妻",
        type: ["村民代表"],
        skill: [],
        tags: ["村民代表"],
        rowid: "2b3fea9d-bf5d-4e91-bfde-892128a4409d",
      }
    ],
    name: "C7-3",
    rowid: "24346621-fb24-48d4-9976-fa703381b667",
    rental_type: "自住",
    people_num: 4,
    household_name: "张三,李四",
  },
};
