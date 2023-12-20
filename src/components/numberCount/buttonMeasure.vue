<template>
  <div v-show="isShowModuleFunc(config)">
    <div
      class="buttonOne"
      :style="{
        width: config.width + 'px',
        height: config.height + 'px',
      }"
    >
      <!-- 按钮 -->
      <div
        class="element"
        @click="flag = !flag"
        @mouseover="isShowTxt = true"
        @mouseleave="isShowTxt = false"
        :style="
          isShowTxt || (config.optionStyle.optionShow && flag)
            ? backgroundActive
            : backgroundImg
        "
      >
        <span
          v-show="config.buttonStyle.txtShow"
          :style="{
            color: config.buttonStyle.color,
            fontSize: config.buttonStyle.fontSize + 'px',
            lineHeight: config.buttonStyle.lineHeight + 'px',
            fontFamily: config.buttonStyle.fontFamily,
          }"
          >{{ config.buttonStyle.txt }}</span
        >
      </div>
      <!-- 鼠标滑过出现文字 -->
      <div
        class="hover"
        v-show="
          isShowTxt &&
            (!config.optionStyle.optionShow || !flag) &&
            config.buttonStyle.hoverShow
        "
        :style="hoverStyle"
      >
        {{ config.hoverStyle.txt }}
      </div>
      <!-- 下拉框 -->
      <div
        class="clickShow"
        v-show="config.optionStyle.optionShow && flag"
        :style="optionStyle"
      >
        <el-scrollbar>
          <span
            v-for="(item, i) in config.data"
            :key="item.rowid"
            ref="eventDom"
            @mouseover="(isShowBac = true), (active = i)"
            @mouseleave="isShowBac = false"
            @click.stop="setSurvey(item,i)"
            :style="{
              height: config.optionStyle.span.height + 'px',
              color: config.optionStyle.color,
              fontSize: config.optionStyle.fontSize + 'px',
              background: bacColor(i)
             
            }"
          >
            <img
              v-if="config.img[i]"
              :src="config.img[i]"
              alt=""
              :style="{
                width: item.width + 'px',
                height: item.height + 'px',
                marginRight: item.marginRight + 'px',
              }"
            /><span :title="item.name">
              {{ item.name }}
            </span>
          </span>
        </el-scrollbar>
        <div :style="cleanBtn" class="btn" @click="clearResults()">
          <span>清除</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { setStyleObj } from "@/utils/index.js";
export default {
  components: {},
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
      active: "0",
      flag: false,
      isShowTxt: false,
      isShowBac: true,
      id: 1,
      activeIndex:"0",
    };
  },
  watch: {
    config: {
      handler(nVal, oVal) {},
      deep: true,
    },
  },
  computed: {
    inputStyle() {
      let d = setStyleObj({ ...this.config.input });
      return d;
    },
    hoverStyle() {
      let d = setStyleObj({ ...this.config.hoverStyle });
      return d;
    },
    backgroundImg() {
      let d = setStyleObj({ ...this.config.backgroundImg });
      return d;
    },
    backgroundActive() {
      let d = setStyleObj({ ...this.config.backgroundActive });
      return d;
    },
    optionStyle() {
      let d = setStyleObj({ ...this.config.optionStyle });
      return d;
    },
    addView() {
      let d = setStyleObj({ ...this.config.addView });
      d.lineHeight = d.height;
      return d;
    },
    cleanBtn() {
      let d = setStyleObj({ ...this.config.cleanBtn });
      return d;
    },
    bacColor() {
      return function(i) {
        let background = "";
        if (this.activeIndex === i) {
          background = this.config.optionStyle.span.backgroundClick;
        }else if (this.isShowBac && this.active === i) {
          background = this.config.optionStyle.span.background;
        }
        else {
          background = "transparent";
        }
        return background;
      };
    },
  },
  created() {},
  mounted() {},
  methods: {
    setSurvey(obj,i) {
      if (this.earth && this.earth._earth) {
        this.activeIndex=i;
        switch (obj.name) {
          case "面积":
            this.earth._earthApi.areaSurvey();
            break;
          case "高度":
            this.earth._earthApi.heightSurvey();
            break;
          case "角度":
            this.earth._earthApi.angleSurvey();
            break;
          case "距离":
            this.earth._earthApi.distanceSurvey();
            break;
        }
      } else {
        this.$message({
          message: "请先建立一个场景",
          type: "warning",
        });
      }
    },
    clearResults() {
      this.activeIndex='0'
      if (this.earth && this.earth._earth) {
        this.earth._earthApi.clearResults();
      } else {
        this.$message({
          message: "请先建立一个场景",
          type: "warning",
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.buttonOne {
  color: #fff;
  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;
  pointer-events: all;
  .element {
    width: 60px;
    height: 65px;
    background-size: 100% 100%;
    text-align: center;
    white-space: nowrap;
    cursor: pointer;
  }

  .hover {
    text-align: center;
    position: absolute;
    pointer-events: none;
  }
  .clickShow {
    position: absolute;
    border: 1px solid #1b7ef2;
    display: flex;
    align-items: center;
    flex-direction: column;
    ::v-deep.el-scrollbar__view {
      display: flex;
      flex-direction: column;
      > span {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
      }
    }
    ::v-deep::-webkit-scrollbar-track {
      background: transparent !important;
    }
    .btn {
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 10px;
      border-radius: 2px;
    }
  }
}
</style>
