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
      <el-form-item label="是否显示默认模块：" label-width="140px">
            <el-switch
              style="margin-top: 7px;"
              v-model="config.box.addShow"
            ></el-switch>
          </el-form-item>
      <el-collapse>
        <el-collapse-item title="模块整体样式配置">
          <el-form-item label="宽度：">
            <div class="flex align-center">
              <el-input
                v-model="config.box.width"
                size="mini"
                style="margin: 0 8px 0 0px"
              ></el-input
              >px
            </div>
          </el-form-item>
          <el-form-item label="高度：">
            <div class="flex align-center">
              <el-input
                v-model="config.box.height"
                size="mini"
                style="margin: 0 8px 0 0px"
              ></el-input
              >px
            </div>
          </el-form-item>
          <el-form-item label="右边距">
            <div class="flex align-center">
              <el-input
                v-model="config.box.marginRight"
                size="mini"
                style="margin: 0 8px 0 0px"
              ></el-input
              >px
            </div>
          </el-form-item>
          <el-form-item label="下边距">
            <div class="flex align-center">
              <el-input
                v-model="config.box.marginBottom"
                size="mini"
                style="margin: 0 8px 0 0px"
              ></el-input
              >px
            </div>
          </el-form-item>
          <el-form-item label="圆角">
            <div class="flex align-center">
              <el-input
                v-model="config.box.borderRadius"
                size="mini"
                style="margin: 0 8px 0 0px"
              ></el-input
              >px
            </div>
          </el-form-item>

          <el-form-item label="是否显示背景图：" label-width="140px">
            <el-switch
              style="margin-top: 7px;"
              v-model="config.box.imgShow"
            ></el-switch>
          </el-form-item>
          <div v-if="config.box.imgShow">
            <el-collapse-item title="背景图">
              <el-form-item label="是否展示鼠标滑过样式：" label-width="170px">
                <el-switch
                  style="margin-top: 7px;"
                  v-model="config.box.hoverShow"
                ></el-switch>
              </el-form-item>
              <el-form-item
                v-if="config.box.hoverShow"
                label="鼠标滑过背景图："
                label-width="140px"
              >
                <div
                  class="img-item pointer"
                  @click="openDialogVisible('hover_img', '0000')"
                >
                  <img :src="config.box.background" alt="" />
                </div>
              </el-form-item>

              <el-form-item
                v-for="(item, i) in config.box.style"
                :key="i"
                :label="`背景图${i + 1}：`"
              >
                <div
                  class="img-item pointer"
                  @click="openDialogVisible('beijingtu', i)"
                >
                  <img :src="config.box.style[i].background" alt="" />
                </div>
              </el-form-item>
            </el-collapse-item>
          </div>
          <div v-else>
            <el-collapse-item title="背景色">
              <el-form-item label="是否展示鼠标滑过样式：" label-width="170px">
                <el-switch
                  style="margin-top: 7px;"
                  v-model="config.box.hoverShow"
                ></el-switch>
              </el-form-item>
              <el-form-item
                v-if="config.box.hoverShow"
                label="鼠标滑过背景色："
                label-width="140px"
              >
                <el-color-picker
                  v-model="config.box.backgroundColor"
                  show-alpha
                  size="mini"
                  style="margin-right: 5px;"
                ></el-color-picker>
              </el-form-item>
              <el-form-item
                v-for="(item, i) in config.box.style"
                :key="i"
                :label="`背景色${i + 1}：`"
              >
                <el-color-picker
                  v-model="config.box.style[i].backgroundColor"
                  show-alpha
                  size="mini"
                  style="margin-right: 5px;"
                ></el-color-picker>
              </el-form-item>
            </el-collapse-item>
          </div>
        </el-collapse-item>
        <el-collapse-item title="主标题样式配置">
          <commonTab
            :config="config"
            type1="textStyle"
            @changeValue="
              (param1, param2, val) => $emit('changeValue', param1, param2, val)
            "
          ></commonTab>
          <div>
            <el-form-item label="宽度：">
              <div class="flex align-center">
                <el-input
                  v-model="config.textStyle.width"
                  size="mini"
                  style="margin: 0 8px 0 0px"
                ></el-input
                >px
              </div>
            </el-form-item>
            <!-- <el-form-item label="高度：">
            <div class="flex align-center">
              <el-input
                v-model="config.textStyle.height"
                size="mini"
                style="margin: 0 8px 0 0px"
              ></el-input
              >px
            </div>
          </el-form-item> -->
            <el-form-item label="上边距">
              <div class="flex align-center">
                <el-input
                  v-model="config.textStyle.marginTop"
                  size="mini"
                  style="margin: 0 8px 0 0px"
                ></el-input
                >px
              </div>
            </el-form-item>
            <el-form-item label="左边距">
              <div class="flex align-center">
                <el-input
                  v-model="config.textStyle.marginLeft"
                  size="mini"
                  style="margin: 0 8px 0 0px"
                ></el-input
                >px
              </div>
            </el-form-item>
           
            
          </div>
          <el-collapse-item title="鼠标滑过样式："   v-if="config.box.hoverShow">
            <commonTab
            :config="config"
            type1="textHoverStyle"
            @changeValue="
              (param1, param2, val) => $emit('changeValue', param1, param2, val)
            "
          ></commonTab>
          <div>
            <el-form-item label="宽度：">
              <div class="flex align-center">
                <el-input
                  v-model="config.textHoverStyle.width"
                  size="mini"
                  style="margin: 0 8px 0 0px"
                ></el-input
                >px
              </div>
            </el-form-item>
            <el-form-item label="上边距">
              <div class="flex align-center">
                <el-input
                  v-model="config.textHoverStyle.marginTop"
                  size="mini"
                  style="margin: 0 8px 0 0px"
                ></el-input
                >px
              </div>
            </el-form-item>
            <el-form-item label="左边距">
              <div class="flex align-center">
                <el-input
                  v-model="config.textHoverStyle.marginLeft"
                  size="mini"
                  style="margin: 0 8px 0 0px"
                ></el-input
                >px
              </div>
            </el-form-item>
           
            
          </div>
            </el-collapse-item>
        </el-collapse-item>
        <el-collapse-item title="副标题样式配置">
          <el-form-item label="是否显示副标题：" label-width="140px">
            <el-switch
              style="margin-top: 7px;"
              v-model="config.subText.show"
            ></el-switch>
          </el-form-item>
          <div v-if="config.subText.show">
            <commonTab
              :config="config"
              :isShowColor="false"
              type1="subText"
              @changeValue="
                (param1, param2, val) =>
                  $emit('changeValue', param1, param2, val)
              "
            ></commonTab>
            <div>
              <el-form-item label="宽度：">
                <div class="flex align-center">
                  <el-input
                    v-model="config.subText.width"
                    size="mini"
                    style="margin: 0 8px 0 0px"
                  ></el-input
                  >px
                </div>
              </el-form-item>
              <el-form-item label="上边距">
                <div class="flex align-center">
                  <el-input
                    v-model="config.subText.marginTop"
                    size="mini"
                    style="margin: 0 8px 0 0px"
                  ></el-input
                  >px
                </div>
              </el-form-item>
              <el-form-item label="左边距">
                <div class="flex align-center">
                  <el-input
                    v-model="config.subText.marginLeft"
                    size="mini"
                    style="margin: 0 8px 0 0px"
                  ></el-input
                  >px
                </div>
              </el-form-item>
              <el-form-item label="文本省略号">
              <div class="flex align-center" style="margin-left:10px">
                <el-input-number
                  v-model="config.subText.txtNum"
                  :min="1"
                  :step="1"
                  step-strictly
                  label=""
                ></el-input-number>
                <div style="margin-left: 10px"></div>
              </div>
            </el-form-item>
              <el-form-item label="字体颜色是否统一：" label-width="140px">
                <el-switch
                  style="margin-top: 7px;"
                  v-model="config.subText.fontColor"
                ></el-switch>
              </el-form-item>
              <div v-if="config.subText.fontColor">
                <el-form-item label="字体颜色：">
                  <el-color-picker
                    v-model="config.subText.color"
                    show-alpha
                    size="mini"
                    style="margin-right: 5px;"
                  ></el-color-picker>
                </el-form-item>
              </div>
              <div v-else>
                <el-form-item label="字体颜色：">
                  <el-color-picker
                    v-for="(it, i) in config.box.style"
                    :key="i"
                    v-model="it.color"
                    show-alpha
                    size="mini"
                    style="margin-right: 5px;"
                  ></el-color-picker>
                </el-form-item>
              </div>
             
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item title="图标样式配置" style="margin-bottom:5px">
          <el-form-item label="是否显示图标：" label-width="140px">
            <el-switch
              style="margin-top: 7px;"
              v-model="config.box.iconShow"
            ></el-switch>
          </el-form-item>
          <el-form
            v-if="config.box.iconShow"
            label-width="90px"
            size="small"
            class="border-box"
          >
            <el-form-item label="宽度：">
              <div class="flex align-center">
                <el-input
                  v-model="config.iconStyle.width"
                  size="mini"
                  style="margin: 0 8px 0 0px"
                ></el-input
                >px
              </div>
            </el-form-item>
            <el-form-item label="高度：">
              <div class="flex align-center">
                <el-input
                  v-model="config.iconStyle.height"
                  size="mini"
                  style="margin: 0 8px 0 0px"
                ></el-input
                >px
              </div>
            </el-form-item>
            <el-form-item label="上边距">
              <div class="flex align-center">
                <el-input
                  v-model="config.iconStyle.top"
                  size="mini"
                  style="margin: 0 8px 0 0px"
                ></el-input
                >px
              </div>
            </el-form-item>
            <el-form-item label="左边距">
              <div class="flex align-center">
                <el-input
                  v-model="config.iconStyle.left"
                  size="mini"
                  style="margin: 0 8px 0 0px"
                ></el-input
                >px
              </div>
            </el-form-item>
            <el-collapse-item title="鼠标滑过样式："   v-if="config.box.hoverShow">
                <el-form-item label="宽度：">
              <div class="flex align-center">
                <el-input
                  v-model="config.iconHoverStyle.width"
                  size="mini"
                  style="margin: 0 8px 0 0px"
                ></el-input
                >px
              </div>
            </el-form-item>
            <el-form-item label="高度：">
              <div class="flex align-center">
                <el-input
                  v-model="config.iconHoverStyle.height"
                  size="mini"
                  style="margin: 0 8px 0 0px"
                ></el-input
                >px
              </div>
            </el-form-item>
            <el-form-item label="上边距">
              <div class="flex align-center">
                <el-input
                  v-model="config.iconHoverStyle.top"
                  size="mini"
                  style="margin: 0 8px 0 0px"
                ></el-input
                >px
              </div>
            </el-form-item>
            <el-form-item label="左边距">
              <div class="flex align-center">
                <el-input
                  v-model="config.iconHoverStyle.left"
                  size="mini"
                  style="margin: 0 8px 0 0px"
                ></el-input
                >px
              </div>
            </el-form-item>
            </el-collapse-item>
            <el-form-item
              v-for="(item, i) in config.box.style"
              :key="i"
              :label="`图标${i + 1}：`"
            >
              <div
                class="img-item pointer"
                @click="openDialogVisible('tubiao', i)"
              >
                <img :src="config.box.style[i].src" alt="" />
              </div>
            </el-form-item>
          </el-form>
        </el-collapse-item>

        <!-- <el-collapse-item title="模块数据配置">
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-plus"
            style="margin-left:175px;margin-bottom:10px"
            @click="addData()"
            >添加模块</el-button
          >
          <el-collapse-item
            v-for="(item, i) in config.data"
            :key="i"
            :title="`  模块${i + 1}：`"
            style="margin-bottom:5px"
          >
            <el-form-item label="主标题：">
              <el-input
                v-model="config.data[i].title"
                size="mini"
                placeholder="请输入名称"
              ></el-input>
            </el-form-item>
            <el-form-item label="副标题：" v-if="config.subText.show">
              <el-input
                v-model="config.data[i].subTitle"
                size="mini"
                placeholder="请输入名称"
              ></el-input>
            </el-form-item>
            <span style="margin-left:163px">
              <el-button type="danger" size="mini" @click="delData(i)"
                >删除选项</el-button
              >
            </span>
          </el-collapse-item>
        </el-collapse-item> -->
      </el-collapse>
     
    </el-form>
    <el-dialog
      :modal="false"
      title="图片选择"
      :visible.sync="dialogVisible"
      width="30%"
      custom-class="image-selector"
    >
      <el-tabs v-model="activeName">
        <el-tab-pane
          :label="item"
          :name="item"
          v-for="item in tabsList"
          :key="item"
          class="tab-image"
        >
          <div
            class="image-wrap"
            @click="changeImageSrc(img)"
            v-for="img in tabImagesList"
            :key="img"
          >
            <img :src="img" alt="" />
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </el-scrollbar>
</template>

<script>
import { getImgData } from "@/utils/index.js";
import StylesFilter from "../common";
import commonTab from "../componments/commonTab";
import ImageSelector from "../componments/ImageSelector";
import commonSetTitle from "../componments/commonSetTitle";
import { getFilterRows } from "@/utils/api";
import { appKey, sign } from "@/utils/const.js";
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
  computed: {
    tabImagesList() {
      let d = this.imgList.find((item) => item.name === this.activeName);
      let src = d ? d.src : [];
      return src;
    },
  },
  mounted() {},
  methods: {
    delData(i) {
      this.config.data.splice(i, 1);
      this.config.box.style.splice(i, 1);
    },
    addData() {
      this.config.data.push({
        title: "主标题",
        subTitle: "副标题",
      });
      this.config.box.style.push({
        backgroundColor: "rgba(40, 121, 255, 0.05)",
        color: "#4B5F88",
        background: require("@/assets/image/common/1-1.png"),
        src: require("@/assets/image/common/privateCloud1.png"),
      });
    },
    changeImageSrc(v) {
      if (this.imageField == "beijingtu") {
        this.$set(this.config.box.style[this.indexImg], "background", v);
      } else if (this.imageField == "tubiao") {
        this.$set(this.config.box.style[this.indexImg], "src", v);
      } else {
        this.$set(this.config.box, "background", v);
      }
      this.dialogVisible = false;
    },
    async openDialogVisible(imageField, i) {
      this.imageField = imageField;
      this.indexImg = i;
      let {
        data: { rows },
      } = await getFilterRows({
        appKey: appKey,
        sign: sign,
        worksheetId: 'jczx',
        pageSize: 500,
        pageIndex: 1,
      });
      const enableImageList = rows.filter((item) => item.sfqy === "启用");
      this.tabsList = enableImageList.map((item) => item.mingcheng);
      this.imgList = enableImageList
        .map((item) => {
          if (item[imageField]) {
            return {
              name: item.mingcheng,
              src: JSON.parse(item[imageField]).map((ele) => ele.DownloadUrl),
            };
          }
          return "";
        })
        .filter((item) => item);
      this.activeName = this.tabsList[0];
      this.dialogVisible = true;
    },
  },
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
