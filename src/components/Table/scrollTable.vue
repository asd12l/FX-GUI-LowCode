<!--
 * @Descripttion: 
 * @version: 
 * @Author: ydl
 * @Date: 2023-07-21 09:10:12
 * @LastEditors: ydl
 * @LastEditTime: 2023-11-23 17:02:07
-->
<template>
  <div class="table-box" :style="styleObj1" v-show="isShowModuleFunc(config)">
    <div class="theader" :style="styleObj2">
      <div
        v-for="item in config.otherData.tableHead"
        :key="item.id"
        :style="styleObj3(item)"
      >
        {{ item.label }}
      </div>
    </div>
    <div class="tbody" :style="getHeight">
      <vue-seamless-scroll
        :data="config.data"
        :class-option="defaultOption"
        style="height: 100%;overflow: hidden;"
        v-if="isShowScroll"
      >
        <div
          class="list"
          v-for="(item, i) in config.data"
          :key="i"
          :style="styleObj4"
        >
          <div
            class="cell"
            v-for="v in config.otherData.tableHead"
            :key="v.id"
            :style="styleObj5(v, item)"
          >
            {{ item[v.value] }}
          </div>
        </div>
      </vue-seamless-scroll>
    </div>
  </div>
</template>

<script>
import vueSeamlessScroll from "vue-seamless-scroll";
import { setStyleObj } from "@/utils/index.js";
export default {
  props: {
    config: {
      type: Object,
    },
    changeSize: {
      type: Function,
    },
    changeValue: {
      type: Function,
    },
  },
  components: { vueSeamlessScroll },
  data() {
    return {
      isShowScroll: true,
      isShow: true,
      tableKeyDataString: "",
    };
  },
  created() {},
  mounted() {
    // this.setTableKeyData();
  },
  methods: {
    setTableKeyData() {
      console.log(this.config.data, "===scrolltable");
      let d = [];
      let obj = this.config.data[0];
      Object.keys(obj).forEach((k) => {
        d.push(k);
      });
      this.$emit("changeValue", "otherData", "tableKeyData", d);
      // this.config.otherData.tableKeyData = d;
    },
    changeScroll() {
      if (this.$route.name === "Chart") {
        this.isShowScroll = false;
        setTimeout(() => {
          this.isShowScroll = true;
        }, 100);
      }
    },
  },
  watch: {
    "config.data": {
      handler() {
        console.log(this.config.sourceType);
        if (this.config.sourceType !== "工作表") {
          this.setTableKeyData();
        }
      },
      deep: true,
    },
    // "config.otherData.tableKeyDataString": {
    //   handler(nVal, oVal) {
    //     this.$emit("changeValue", "otherData", "tableHead", []);
    //     // this.config.otherData.tableHead = [];
    //   },
    //   deep: true,
    // },
    "config.height"() {
      this.changeScroll();
    },
    "config.tbody.limitMoveNum"() {
      this.changeScroll();
    },
    "config.tbody.height"() {
      this.changeScroll();
    },
    "config.tbody.marginTop"() {
      this.changeScroll();
    },
    "config.otherData.tableHead": {
      handler(nVal) {
        this.tableKeyDataString = JSON.stringify(nVal);
      },
      deep: true,
    },
    tableKeyDataString: {
      handler(nVal) {
        this.changeScroll();
      },
      deep: true,
    },
  },
  computed: {
    defaultOption() {
      return {
        step: this.config.tbody.step * 1 || 0.3, // 数值越大速度滚动越快
        limitMoveNum: this.config.tbody.limitMoveNum * 1, // 开始无缝滚动的数据量 this.dataList.length
        hoverStop: true, // 是否开启鼠标悬停stop
        direction: 1, // 0向下 1向上 2向左 3向右
        openWatch: true, // 开启数据实时监控刷新dom
        singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        waitTime: 1000, // 单步运动停止的时间(默认值1000ms)
      };
    },
    styleObj1() {
      let d = setStyleObj({ ...this.config });
      d.background = this.config.otherData.background;
      return d;
    },
    styleObj2() {
      let d = setStyleObj({ ...this.config.theader });
      return d;
    },
    getHeight() {
      let height = "calc(100% - " + this.config.theader.height + "px)";
      return { height };
    },
    styleObj3() {
      return function(item) {
        let d = setStyleObj({
          width: item.width,
        });
        return d;
      };
    },
    styleObj4() {
      let d = setStyleObj({ ...this.config.tbody });
      return d;
    },
    styleObj5() {
      return function(v, item) {
        let color = v.color;
        if (v.colorData.length > 0) {
          v.colorData.some((val, i) => {
            if (val.label == item[v.value]) {
              color = val.color;
              return true;
            }
          });
        }
        let d = setStyleObj({
          width: v.width,
          color: color,
        });
        return d;
      };
    },
    sassStyle() {
      return {
        "--selectColor": this.config.selection.color,
      };
    },
  },
};
</script>
<style lang="scss" scoped>
// @import "../../styles/darkTable.scss";
.table-box {
  pointer-events: all;
  display: flex;
  flex-direction: column;
  .theader {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .tbody {
    // height: calc(100% - 26px);
    .list {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .cell {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding: 0 2px;
      }
    }
  }
}
</style>
