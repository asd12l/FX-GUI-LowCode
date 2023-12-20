<template>
  <el-scrollbar class="right-setting scrollbar-wrapper">
    <el-form
      label-width="100px"
      size="small"
      class="border-box"
      style="padding: 8px 16px"
    >
      <commonSetTitle
        :config="config"
        @changeSize="(type, val) => $emit('changeSize', type, val)"
      />
      <StylesFilter
        @changeOpenFilter="(val) => $emit('changeSize', 'openFilter', val)"
        :openFilter="config.openFilter"
        :filterObj="config.filterObj"
        @changefilterObj="changefilterObj"
      ></StylesFilter>
      <el-form-item label="是否为图片：">
        <el-switch
          v-model="config.isShowImg"
          @change="(val) => $emit('changeSize', 'isShowImg', val)"
        ></el-switch>
      </el-form-item>
      <ImageSelector
        v-if="config.isShowImg"
        label="背景图："
        @changeSrc="(val) => $emit('changeSize', 'background', val)"
        worksheetId="cockpit_images"
        imageField="beijingtu"
        :src="config.background"
      ></ImageSelector>
      <el-form-item label="颜色：" v-else>
        <el-color-picker
          v-model="config.backgroundColor"
          size="mini"
          show-alpha
          @change="(val) => $emit('changeSize', 'backgroundColor', val)"
        ></el-color-picker>
      </el-form-item>
    </el-form>
  </el-scrollbar>
</template>

<script>
import ImageSelector from "../componments/ImageSelector";
import commonSetTitle from "../componments/commonSetTitle";
import StylesFilter from "../common";
export default {
  props: {
    config: {
      type: Object,
      default: () => {
        return {};
      },
    },
    changeSize: {
      type: Function,
    },
  },
  components: { commonSetTitle, ImageSelector, StylesFilter },
  data() {
    return {
      aa: 10,
      imgList1: [],
    };
  },
  mounted() {
    this.getImgList1();
  },
  methods: {
    changefilterObj(val) {
      this.$emit("changeSize", "filterObj", val);
    },
    getImgList1() {
      this.imgList1 = [
        { txt: "背景图1", url: require("@/assets/image/xiaokunshan/bg6.png") },
        { txt: "背景图2", url: require("@/assets/image/xiaokunshan/bg7.png") },
        { txt: "背景图3", url: require("@/assets/image/xiaokunshan/bg8.png") },
        { txt: "背景图4", url: require("@/assets/image/xiaokunshan/bg9.png") },
        { txt: "背景图5", url: require("@/assets/image/xiaokunshan/bg10.png") },
      ];
    },
  },
};
</script>

<style lang="scss">
.right-setting {
  height: calc(100% - 45px) !important;
  .el-form-item__label {
    font-family: MicrosoftYaHei;
    font-size: 14px;
    font-weight: normal;
    letter-spacing: 0em;
    color: #ffffff;
  }

  .el-input__inner {
    background-color: #191a1a;
    color: #ffffff;
    border: none;
  }

  .el-collapse {
    border: none;

    .el-collapse-item__header {
      background-color: #25262a;
      color: #ffffff;
      border: none;
    }

    .el-collapse-item__content {
      padding-bottom: 0;
    }

    .el-collapse-item__wrap {
      background: #1c1c1f;
      border: none;
      padding: 10px;
      box-sizing: border-box;

      .el-input__inner {
        background-color: #25262a;
        color: #ffffff;
        border: none;
      }
    }
  }
}
</style>
