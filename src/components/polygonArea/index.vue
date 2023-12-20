<!--
 * @Descripttion: 
 * @version: 
 * @Author: ydl
 * @Date: 2023-07-25 14:03:50
 * @LastEditors: ydl
 * @LastEditTime: 2023-08-22 17:09:54
-->
<template>
  <div class="area-box" :style="{ ...styleObj }" v-show="isShowCom">
    我是区域
  </div>
</template>


<script>
import { setStyleObj, guid } from "@/utils/index.js";
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
  },
  data() {
    return {
      isShow: true,
      xbsjGuid: '',
      guids: []
    };
  },
  mounted() {

    if (Object.keys(this.earth).length > 0) {
      const { isShowModule } = this.config;

      const { data } = this.config;
      console.log()
      let guids = []
      for (let index = 0; index < data.length; index++) {
        const styleObj = { "czmObject": { "xbsjType": "GeoPolygon", "xbsjGuid": "a84b571b-8422-4b28-84f1-b8e03d6b4cd3", "name": "多边形", "positions": [[[1.856887325505471, 0.7672875712791964, 4.05954098658699e-9], [1.6336778586255598, 0.5336950412779867, 1.3183746082831785e-9], [1.987278989048881, 0.3759398990176441, 1.122427246830794e-8], [2.294164493585404, 0.45626395406913506, 1.3969838619232178e-9], [2.3004247401917657, 0.6039663961130035, -1.6130980174698654e-9]]] } }
        const { lineWidth = 0, lineColor = "[195, 66, 66]", areaColor = "[149, 0, 213]", areaColorOpacity = 1, positions } = data[index];
        styleObj.czmObject.outlineWidth = Number(lineWidth);
        styleObj.czmObject.outlineColor = [...JSON.parse(lineColor).map(item => item / 255), 1];
        styleObj.czmObject.color = [...JSON.parse(areaColor).map(item => item / 255), Number(areaColorOpacity)];
        // styleObj.czmObject.show = true;
        styleObj.czmObject.height = 0;
        styleObj.czmObject.ground = true;
        styleObj.czmObject.show = isShowModule;
        if (positions) {
          const positionsAngle = JSON.parse(positions);
          for (let inx = 0; inx < positionsAngle.length; inx++) {
            for (let i = 0; i < positionsAngle[inx].length; i++) {
              positionsAngle[inx][i] = positionsAngle[inx][i].map(item => (Math.PI / 180) * Number(item))
            }
            styleObj.czmObject.positions = positionsAngle[inx];
            const xbsjGuid = guid()
            guids.push(xbsjGuid)
            styleObj.czmObject.xbsjGuid = xbsjGuid;
            this.earth._earthApi.addSceneObject(styleObj);
          }
          this.guids = guids
        }

      }
    }

  },
  computed: {
    isShowCom() {
      return this.isShowModuleFunc(this.config) && (location.href.includes('#/chart'))
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
        this.earth._earth.sceneTree.root.children.forEach(element => {
          if (element.czmObject && (this.guids.includes(element.czmObject.xbsjGuid))) {
            element.czmObject.show = nVal
          }
        });
      },
      deep: true,
    },
  },
  methods: {

  },
};
</script>

<style lang="scss" scoped> .area-box {
   background-size: 100% 100% !important;
   // pointer-events: all;
   display: flex;
   align-items: center;
   justify-content: center;
 }
</style>
