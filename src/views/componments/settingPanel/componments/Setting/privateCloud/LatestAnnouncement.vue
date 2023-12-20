<template>
  <el-scrollbar class="right-setting scrollbar-wrapper imageSelector">
    <el-form
      label-width="110px"
      size="small"
      class="border-box"
      style="padding: 8px 16px"
    >
      <commonSetTitle
        :config="config"
        @changeSize="(type, val) => $emit('changeSize', type, val)"
      />
      <el-collapse>
        <el-form-item label="单个容器高度：">
              <div class="flex align-center">
                <el-input
                  v-model="config.box.height"
                  size="mini"
                  style="margin: 0 8px 0 0px"
                ></el-input
                >px
              </div>
            </el-form-item>
            <el-form-item label="边框颜色：">
                  <el-color-picker
                    v-model="config.box.borderColor"
                    show-alpha
                    size="mini"
                    style="margin-right: 5px;"
                  ></el-color-picker>
                </el-form-item>
                <el-form-item label="边框宽度：">
              <div class="flex align-center" style="margin-left:10px;width:95%">
                <el-slider v-model="config.box.borderWidth"></el-slider>
              </div>
            </el-form-item>
             
        <el-collapse-item title="标题样式配置">
          <el-form-item label="是否显示标题：" label-width="140px">
            <el-switch
              style="margin-top: 7px;"
              v-model="config.titleStyle.show"
            ></el-switch>
          </el-form-item>

          <div v-if="config.titleStyle.show">
            <commonTab
              :config="config"
              type1="titleStyle"
              @changeValue="
                (param1, param2, val) =>
                  $emit('changeValue', param1, param2, val)
              "
            ></commonTab>
            <el-form-item label="宽度：">
              <div class="flex align-center">
                <el-input
                  v-model="config.titleStyle.width"
                  size="mini"
                  style="margin: 0 8px 0 0px"
                ></el-input
                >px
              </div>
            </el-form-item>
            <el-form-item label="行间距">
              <div class="flex align-center">
                <el-input
                  v-model="config.titleStyle.lineHeight"
                  size="mini"
                  style="margin: 0 8px 0 0px"
                ></el-input
                >px
              </div>
            </el-form-item>
            <el-form-item label="上边距">
              <div class="flex align-center">
                <el-input
                  v-model="config.lineStyle.marginTop"
                  size="mini"
                  style="margin: 0 8px 0 0px"
                ></el-input
                >px
              </div>
            </el-form-item>
            <el-form-item label="下边距">
              <div class="flex align-center">
                <el-input
                  v-model="config.lineStyle.marginBottom"
                  size="mini"
                  style="margin: 0 8px 0 0px"
                ></el-input
                >px
              </div>
            </el-form-item>
          </div>
        </el-collapse-item>
        <el-collapse-item title="时间样式配置">
          <el-form-item label="是否显示时间：" label-width="140px">
            <el-switch
              style="margin-top: 7px;"
              v-model="config.timeStyle.show"
            ></el-switch>
          </el-form-item>
          <div v-if="config.timeStyle.show">
            <commonTab
              :config="config"
              type1="timeStyle"
              @changeValue="
                (param1, param2, val) =>
                  $emit('changeValue', param1, param2, val)
              "
            ></commonTab>
            <div>
              <el-form-item label="宽度：">
                <div class="flex align-center">
                  <el-input
                    v-model="config.timeStyle.width"
                    size="mini"
                    style="margin: 0 8px 0 0px"
                  ></el-input
                  >px
                </div>
              </el-form-item>
              <el-form-item label="行间距">
              <div class="flex align-center">
                <el-input
                  v-model="config.timeStyle.lineHeight"
                  size="mini"
                  style="margin: 0 8px 0 0px"
                ></el-input
                >px
              </div>
            </el-form-item>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item title="内容样式配置">
          <el-form-item label="是否显示内容：" label-width="140px">
            <el-switch
              style="margin-top: 7px;"
              v-model="config.contantText.show"
            ></el-switch>
          </el-form-item>
          <div v-if="config.contantText.show">
            <commonTab
              :config="config"
              type1="contantText"
              @changeValue="
                (param1, param2, val) =>
                  $emit('changeValue', param1, param2, val)
              "
            ></commonTab>
            <div>
              <el-form-item label="宽度：">
                <div class="flex align-center">
                  <el-input
                    v-model="config.contantText.width"
                    size="mini"
                    style="margin: 0 8px 0 0px"
                  ></el-input
                  >px
                </div>
              </el-form-item>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </el-form>
  </el-scrollbar>
</template>

<script>
import StylesFilter from "../common";
import commonTab from "../componments/commonTab";
import ImageSelector from "../componments/ImageSelector";
import commonSetTitle from "../componments/commonSetTitle";
export default {
  name: "setting",
  components: {
    StylesFilter,
    commonTab,
    ImageSelector,
    commonSetTitle,
  },
  data() {
    return {
      fontList: ["Microsoft YaHei", "YouSheBiaoTiHei"],
      imgList: [],
      tabsList: [],
      activeName: "",
      dialogVisible: false,
      indexImg: "",
      imageField: "",
    };
  },
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
  computed: {},
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.imageSelector {
  .el-slider {
    width: 200px;
  }

  .img-item {
    width: 95px;
    height: 95px;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
    }
    &.pointer {
      cursor: pointer;
    }
  }
}
.right-setting {
  .el-form-item__label {
    font-family: MicrosoftYaHei;
    font-size: 14px;
    font-weight: normal;
    letter-spacing: 0em;
    color: #ffffff;
    display: flex;
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
