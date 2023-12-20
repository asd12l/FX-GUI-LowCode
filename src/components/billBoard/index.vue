<!--
 * @Descripttion: 
 * @version: 
 * @Author: ydl
 * @Date: 2023-07-25 14:03:50
 * @LastEditors: ydl
 * @LastEditTime: 2023-08-22 17:09:54
-->
<template>
  <div
    class="billBoard-box"
    :style="{...styleObj}"
    v-show="isShowCom"
  >
    我是点位
  </div>
</template>


<script>
import { setStyleObj } from "@/utils/index.js";
export default {
  props: {
    config: {
      type: Object,
    },
    earth: {
      type: Object,
      default: () => {
        return {};
      },
    },
    component: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      billBoardList: []
    };
  },
  mounted() {
    if (Object.keys(this.earth).length > 0) {
      const { data, styleObj } = this.config;
      for (let index = 0; index < data.length; index++) {
        this.creatScenePin(data[index], styleObj)
      }
    }
  },
  computed: {
    isShowCom() {
      return  this.isShowModuleFunc(this.config) && (location.href.includes('#/chart'))
    },
    styleObj() {
      let d = setStyleObj({ ...this.config });
      if (!this.config.isShowImg) {
        d.background = this.config.backgroundColor;
      }
      return d;
    },
  },
  watch: {
    'config.isShowModule': {
      handler(nVal, oVal) {
        this.billBoardList.forEach((item) => { 
          item.show = nVal
        });
      },
      deep: true,
    },
  },
  methods: {
    // 创建地图点位
    creatScenePin(componentData, styleObj) {
      // const { json, is_selected } = componentData;
      const billBoardList = [];
      // if (!json) {
      //   this.$message({
      //     type: 'error', // success error warning
      //     message: '请先配置点位样式',
      //     duration: 2000
      //   });
      //   return;
      // }
      const billBoardData = styleObj;
      const positions = componentData.position
        .split(',')
        .map((item) => Number(item));
      const { show, position, distanceDisplayCondition } = billBoardData;
      const { showTitle, title = {} } = billBoardData;
      // title.text = componentData.name
      let boardTitle = JSON.parse(JSON.stringify(title)) ;
      boardTitle.text = componentData.title
     
      
      if (componentData.position) { 
        for (let index = 0; index < billBoardData.boardList.length; index++) {
          if (componentData.subtitle) {
            billBoardData.boardList[index].label.text = componentData.subtitle
          }
          const billBoard = this.earth._earthApi.createCustomBillBoard({
            customAttribute: {
              id: this.id,
              config: {...this.config, id: this.id, component: this.component},
              component: 'billBoard',
              data: componentData,
              // ...componentData,
              type: 'building',
              ...styleObj, 
              showTitle, 
              title: boardTitle,
            },
            show: this.config.isShowModule,
            position: positions,
            distanceDisplayCondition,
            ...billBoardData.boardList[index]
          });
          billBoardList.push(billBoard);
        } 
        this.billBoardList.push(...billBoardList);
      }
    },
     // 将点位的变量替换
     contentReplacement(str = '', componentData) {
      const keys = Object.keys(componentData);
      let resultStr = str;
      for (let index = 0; index < keys.length; index++) {
        if (str.includes(`{{${keys[index]}}}`)) {
          resultStr = str.replace(
            `{{${keys[index]}}}`,
            componentData[keys[index]]
          );
        }
      }
      return resultStr;
    },
  },
};
</script>

<style lang="scss" scoped> 
.billBoard-box {
  background-size: 100% 100% !important;
  // pointer-events: all;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
