<template>
  <el-scrollbar class="right-setting scrollbar-wrapper">
    <el-form label-width="100px" size="small" class="border-box" style="padding: 8px 16px">
      <commonSetTitle :config="config" @changeSize="(type, val) => $emit('changeSize', type, val)" />
      <el-form-item label="广告牌样式：">
        <el-input type="textarea" v-model="styleStr" height="200px"></el-input>
      </el-form-item>
      <el-button type="primary" size="mini" @click="isShowEarthDialog = true">编辑</el-button>
    </el-form>
    <poiEarthDialog @onSureCb="data => $emit('changeSize', 'styleObj', data)" :styleObj="styleObj" v-if="isShowEarthDialog" :dialogVisible="isShowEarthDialog"
      :type="'polygonArea'" @changeIsShowEarthDialog="status => isShowEarthDialog = status"></poiEarthDialog>
  </el-scrollbar>
</template>

<script>
import commonSetTitle from "../componments/commonSetTitle";
import poiEarthDialog from "../componments/poiEarthDialog";
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
  components: { commonSetTitle, poiEarthDialog },
  data() {
    return {
      isShowEarthDialog: false,
    };
  },
  mounted() {
  },
  computed: {
    styleObj() {
      console.log("this.config.styleObj:::::::::::", this.config.styleObj, JSON.stringify(this.config.styleObj))
      return this.config.styleObj;
    },
    styleStr() {
      return JSON.stringify(this.styleObj)
    }
  },
  methods: {
  
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
