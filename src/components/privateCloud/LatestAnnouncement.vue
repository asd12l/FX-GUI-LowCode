<template>
  <div
    v-show="isShowModuleFunc(config)"
  >
   <div  :style="{
      width: config.width + 'px',
      height: config.height + 'px',
      overflow:'hidden'
    }">
    <el-scrollbar>
    <div
      class="integrationCenter"
      v-for="(item, i) in config.data"
      :key="i"
      :style="boxStyle"
    >
      <div class="txt" :style="lineStyle">
        <span
          class="ellipsis"
          v-if="config.titleStyle.show"
          :style="titleStyle"
          >{{ item.title }}</span
        >
        <span v-if="config.timeStyle.show" :style="timeStyle"   class="ellipsis">{{
          item.time
        }}</span>
      </div>
      <div class="ellipsis" v-if="config.contantText.show" :style="contantText">
        {{ item.contant }}
      </div>
    </div>
   </el-scrollbar>
   </div>
  </div>
</template>

<script>
import { setStyleObj } from "@/utils/index.js";
export default {
  name: "LatestAnnouncement",
  props: {
    config: {
      type: Object,
    },
    changeValue: {
      type: Function,
    },
  },
  data() {
    return {};
  },
  watch: {
    config: {
      handler(nVal, oVal) {},
      deep: true,
    },
  },
  computed: {
    boxStyle() {
      let d = setStyleObj({ ...this.config.box });
      return d;
    },
    contantText() {
      let d = setStyleObj({ ...this.config.contantText });
      return d;
    },
    titleStyle() {
      let d = setStyleObj({ ...this.config.titleStyle });
      return d;
    },
    timeStyle() {
      let d = setStyleObj({ ...this.config.timeStyle });
      return d;
    },
    lineStyle() {
      let d = setStyleObj({ ...this.config.lineStyle });
      return d;
    },
  },
  created() {},
  mounted() {},
  methods: {},
};
</script>
<style lang="scss" scoped>
 ::v-deep{
    .el-scrollbar ::-webkit-scrollbar-track {
        height: 0px !important;
      background: transparent !important;
    }
 }
.integrationCenter {
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-bottom-style: solid;
  cursor: pointer;
  .ellipsis {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .txt {
    display: flex;
  }
}
</style>
