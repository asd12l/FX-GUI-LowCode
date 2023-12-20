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
    class="area-box"
    :style="{...styleObj}"
    v-show="isShowCom"
  >
    我是区域
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
  },
  data() {
    return {
      isShow: true,
      xbsjGuid: ''
    };
  },
  mounted() {
    
    if (Object.keys(this.earth).length > 0) {
      const { styleObj, isShowModule } = this.config;
      styleObj.czmObject.show = isShowModule
      this.xbsjGuid = styleObj.czmObject.xbsjGuid
      this.earth._earthApi.addSceneObject(styleObj);
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
        this.earth._earth.sceneTree.root.children.forEach(element => {
           if (element.czmObject && (element.czmObject.xbsjGuid === this.xbsjGuid)) {
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

<style lang="scss" scoped> 
.area-box {
  background-size: 100% 100% !important;
  // pointer-events: all;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
