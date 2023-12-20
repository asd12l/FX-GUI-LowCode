<!--
 * @Descripttion: 
 * @version: 
 * @Author: ydl
 * @Date: 2023-07-21 09:10:12
 * @LastEditors: ydl
 * @LastEditTime: 2023-08-25 17:54:07
-->
<template>
  <div
    v-show="isShowModuleFunc(config)"
    :style="{
      width: config.width + 'px',
      height: config.height + 'px',
      overflow: 'hidden',
    }"
  >
    <div
      class="tab"
      :style="{
        flexDirection: config.contain.direction,
      }"
    >
      <div
        v-for="(item, i) in config.data"
        :key="i"
        :class="config.contain.defaultIndex == i + 1 ? 'cursor' : 'pointer'"
      >
        <div
          ref="eventDom"
          :class="[
            'box',
            config.contain.defaultIndex == i + 1 ? 'disabled' : '',
          ]"
          :style="[
            config.contain.defaultIndex == i + 1 ? activeTxt : defaultTxt,
          ]"
          @click="
            config.dataStyle.length > 0 && config.dataStyle[i].isShowImg
              ? ''
              : activeColor(i)
          "
        >
          <span
            class="title"
            v-if="config.dataStyle.length > 0 && config.dataStyle[i].isShowTxt"
            >{{ item.name }}</span
          >
          <img
            v-if="config.dataStyle.length > 0 && config.dataStyle[i].isShowImg"
            @click="activeColor(i)"
            :src="
              config.contain.defaultIndex == i + 1
                ? config.dataStyle[i].activeImg
                : config.dataStyle[i].img
            "
            :style="{
              width: config.dataStyle[i].width + 'px',
              height: config.dataStyle[i].height + 'px',
              cursor: 'pointer',
            }"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "tabPanel",
  props: {
    config: {
      type: Object,
    },
  },
  data() {
    return {
      isShow: true,
    };
  },
  watch: {
    config: {
      handler(nVal, oVal) {},
      deep: true,
    },
  },
  computed: {
    activeTxt() {
      return {
        width: this.config.contain.width + "px",
        height: this.config.contain.height + "px",
        color: this.config.ActiveTxt.color,
        backgroundColor: this.config.ActiveTxt.backgroundColor,
        borderColor: this.config.ActiveTxt.borderColor,
        borderWidth: this.config.ActiveTxt.borderWidth + "px",
        fontSize: this.config.defaultTxt.fontSize + "px",
        lineHeight: this.config.defaultTxt.lineHeight + "px",
        fontWeight: this.config.defaultTxt.fontWeight,
        fontStyle: this.config.defaultTxt.fontStyle,
        textAlign: this.config.defaultTxt.textAlign,
        fontFamily: this.config.ActiveTxt.fontFamily,
      };
    },
    defaultTxt() {
      return {
        width: this.config.contain.width + "px",
        height: this.config.contain.height + "px",
        color: this.config.defaultTxt.color,
        backgroundColor: this.config.defaultTxt.backgroundColor,
        borderColor: this.config.defaultTxt.borderColor,
        lineHeight: this.config.defaultTxt.lineHeight + "px",
        fontSize: this.config.defaultTxt.fontSize + "px",
        borderWidth: this.config.defaultTxt.borderWidth + "px",
        fontWeight: this.config.defaultTxt.fontWeight,
        fontStyle: this.config.defaultTxt.fontStyle,
        textAlign: this.config.defaultTxt.textAlign,
        fontFamily: this.config.defaultTxt.fontFamily,
      };
    },
  },
  created() {},
  mounted() {},
  methods: {
    activeColor(i) {
      this.config.contain.defaultIndex = i + 1;
    },
  },
};
</script>
<style lang="scss" scoped>
.tab {
  display: flex;
  .disabled {
    pointer-events: none !important;
  }
  .cursor {
    cursor: not-allowed !important;
    pointer-events: all !important;
  }
  .pointer {
    cursor: pointer !important;
    pointer-events: all !important;
  }
  .box {
    border-style: solid;
    padding-right: 3px;
    pointer-events: all;
    position: relative;
  }
  img {
    z-index: 1;
  }
  .title {
    z-index: 2;
    pointer-events: none;
  }
  img,
  .title {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    margin: auto;
  }
}
</style>
