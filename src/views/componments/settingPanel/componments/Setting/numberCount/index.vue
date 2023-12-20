<template>
  <el-scrollbar class="right-setting scrollbar-wrapper number imageSelector">
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
      <el-form-item label="单个容器宽度：">
        <el-input
          v-model="config.contain.width"
          size="mini"
          placeholder="请输入单个容器宽度"
        ></el-input>
      </el-form-item>
      <el-form-item label="单个容器高度：">
        <el-input
          v-model="config.contain.height"
          size="mini"
          placeholder="请输入单个容器高度"
        ></el-input>
      </el-form-item>
      <el-form-item label="排列：">
        <div class="flex" style="color: #fff">
          <div style="margin-right: 10px">一行</div>
          <el-input-number
            v-model="config.contain.arrangeNum"
            :min="1"
            :max="config.data.length"
            label=""
          ></el-input-number>
          <div style="margin-left: 10px">个</div>
        </div>
      </el-form-item>
      <el-form-item label="容器右边距：">
        <el-input
          v-model="config.contain.marginRight"
          size="mini"
          placeholder="请输入右边距高度"
        ></el-input>
      </el-form-item>
      <el-form-item label="容器下边距：">
        <el-input
          v-model="config.contain.marginBottom"
          size="mini"
          placeholder="请输入下边距高度"
        ></el-input>
      </el-form-item>
      <el-collapse>
        <el-collapse-item title="文本(数值)" name="title">
          <el-form-item label="显示文本：">
            <el-switch
              v-model="config.title1.show"
              style="margin-top: 7px;"
            ></el-switch>
          </el-form-item>
          <div v-if="config.title1.show">
            <commonTab
              :config="config.title1"
              type1="txtFamily"
              :isShowFontSet="false"
              @changeValue="
                (param1, param2, val) =>
                  $emit('changeValue', param1, param2, val)
              "
            ></commonTab>
            <el-form-item label="渐变颜色：">
              <el-switch
                v-model="config.title1.linearTxt"
                style="margin-top: 7px;"
              ></el-switch>
            </el-form-item>
            <el-form-item label="颜色：">
              <div class="flex align-center">
                <el-color-picker
                  v-model="config.title1.txtColor.txtBackground[0]"
                  show-alpha
                  size="mini"
                  style="margin-right: 5px;"
                ></el-color-picker>
                <el-color-picker
                  v-if="config.title1.linearTxt"
                  v-model="config.title1.txtColor.txtBackground[1]"
                  show-alpha
                  size="mini"
                ></el-color-picker>
              </div>
            </el-form-item>
            <el-form-item label="字体大小：">
              <div class="flex align-center">
                <el-input
                  v-model="config.title1.textStylePx.fontSize"
                  size="mini"
                  style="margin: 0 8px 0 0px"
                ></el-input
                >px
              </div>
            </el-form-item>
            <el-form-item label="字体：">
              <el-select
                v-model="config.title1.txtFamily.fontFamily"
                placeholder="请选择字体"
              >
                <el-option
                  v-for="(item, i) in fontList"
                  :label="item"
                  :key="i"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="字间距：">
              <div class="flex align-center">
                <el-input
                  v-model="config.title1.textStylePx.letterSpacing"
                  size="mini"
                  style="margin: 0 8px 0 0px"
                ></el-input
                >px
              </div>
            </el-form-item>
            <el-form-item label="上边距：">
              <div class="flex align-center">
                <el-input
                  v-model="config.title1.textStylePx.top"
                  size="mini"
                  style="margin: 0 8px 0 0px"
                ></el-input
                >px
              </div>
            </el-form-item>
          </div>
        </el-collapse-item>

        <el-collapse-item title="文本(名称)">
          <el-form-item label="显示文本：">
            <el-switch
              v-model="config.title2.show"
              style="margin-top: 7px;"
            ></el-switch>
          </el-form-item>
          <div v-if="config.title2.show">
            <commonTab
              :config="config.title2"
              type1="txtFamily"
              :isShowFontSet="false"
              @changeValue="
                (param1, param2, val) =>
                  $emit('changeValue', param1, param2, val)
              "
            ></commonTab>

            <el-form-item label="渐变颜色：">
              <el-switch
                v-model="config.title2.linearTxt"
                style="margin-top: 7px;"
              ></el-switch>
            </el-form-item>
            <el-form-item label="颜色：">
              <div class="flex align-center">
                <el-color-picker
                  v-model="config.title2.txtColor.txtBackground[0]"
                  show-alpha
                  size="mini"
                  style="margin-right: 5px;"
                ></el-color-picker>
                <el-color-picker
                  v-if="config.title2.linearTxt"
                  v-model="config.title2.txtColor.txtBackground[1]"
                  show-alpha
                  size="mini"
                ></el-color-picker>
              </div>
            </el-form-item>
            <el-form-item label="字体大小：">
              <div class="flex align-center">
                <el-input
                  v-model="config.title2.textStylePx.fontSize"
                  size="mini"
                  style="margin: 0 8px 0 0px"
                ></el-input
                >px
              </div>
            </el-form-item>
            <el-form-item label="字体：">
              <el-select
                v-model="config.title2.txtFamily.fontFamily"
                placeholder="请选择字体"
              >
                <el-option
                  v-for="(item, i) in fontList"
                  :label="item"
                  :key="i"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="字间距：">
              <div class="flex align-center">
                <el-input
                  v-model="config.title2.textStylePx.letterSpacing"
                  size="mini"
                  style="margin: 0 8px 0 0px"
                ></el-input
                >px
              </div>
            </el-form-item>
            <el-form-item label="上边距：">
              <div class="flex align-center">
                <el-input
                  v-model="config.title2.textStylePx.top"
                  size="mini"
                  style="margin: 0 8px 0 0px"
                ></el-input
                >px
              </div>
            </el-form-item>
          </div>
        </el-collapse-item>
        <el-collapse-item title="文本(说明)">
          <el-form-item label="显示文本：">
            <el-switch
              v-model="config.title3.show"
              style="margin-top: 7px;"
            ></el-switch>
          </el-form-item>
          <div v-if="config.title3.show">
            <commonTab
              :config="config.title3"
              type1="txtFamily"
              :isShowFontSet="false"
              @changeValue="
                (param1, param2, val) =>
                  $emit('changeValue', param1, param2, val)
              "
            ></commonTab>
            <el-form-item label="渐变颜色：">
              <el-switch
                v-model="config.title3.linearTxt"
                style="margin-top: 7px;"
              ></el-switch>
            </el-form-item>
            <el-form-item label="颜色：">
              <div class="flex align-center">
                <el-color-picker
                  v-model="config.title3.txtColor.txtBackground[0]"
                  show-alpha
                  size="mini"
                  style="margin-right: 5px;"
                ></el-color-picker>
                <el-color-picker
                  v-if="config.title3.linearTxt"
                  v-model="config.title3.txtColor.txtBackground[1]"
                  show-alpha
                  size="mini"
                ></el-color-picker>
              </div>
            </el-form-item>
            <el-form-item label="字体大小：">
              <div class="flex align-center">
                <el-input
                  v-model="config.title3.textStylePx.fontSize"
                  size="mini"
                  style="margin: 0 8px 0 0px"
                ></el-input
                >px
              </div>
            </el-form-item>
            <el-form-item label="字体：">
              <el-select
                v-model="config.title3.txtFamily.fontFamily"
                placeholder="请选择字体"
              >
                <el-option
                  v-for="(item, i) in fontList"
                  :label="item"
                  :key="i"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="字间距：">
              <div class="flex align-center">
                <el-input
                  v-model="config.title3.textStylePx.letterSpacing"
                  size="mini"
                  style="margin: 0 8px 0 0px"
                ></el-input
                >px
              </div>
            </el-form-item>
            <el-form-item label="上边距：">
              <div class="flex align-center">
                <el-input
                  v-model="config.title3.textStylePx.top"
                  size="mini"
                  style="margin: 0 8px 0 0px"
                ></el-input
                >px
              </div>
            </el-form-item>
          </div>
        </el-collapse-item>
        <el-collapse-item title="图片1" name="img1">
          <el-form-item label="显示图片：">
            <el-switch
              v-model="config.backgroundImg1.show"
              style="margin-top: 7px;"
            ></el-switch>
          </el-form-item>
          <div v-if="config.backgroundImg1.show">
            <el-form-item label="图片宽度：">
              <el-input
                v-model="config.backgroundImg1.bgImg.width"
                size="mini"
              ></el-input>
            </el-form-item>
            <el-form-item label="图片高度：">
              <el-input
                v-model="config.backgroundImg1.bgImg.height"
                size="mini"
              ></el-input>
            </el-form-item>
            <el-form-item label="上边距：">
              <el-input
                v-model="config.backgroundImg1.bgImg.top"
                size="mini"
              ></el-input>
            </el-form-item>
            <el-form-item label="左边距：">
              <el-input
                v-model="config.backgroundImg1.bgImg.left"
                size="mini"
              ></el-input>
            </el-form-item>

            <el-collapse-item
              title="图标配置"
              name="rowfour"
              v-if="config.txtRowImgs && config.txtRowImgs.length"
            >
              <el-form-item
                v-for="(item, i) in config.txtRowImgs"
                :key="i"
                :label="`图标${i + 1}：`"
              >
                <div
                  class="img-item pointer"
                  @click="openDialogVisible('tpyfj', i)"
                >
                  <img :src="config.txtRowImgs[i].background" alt="" />
                </div>
              </el-form-item>
            </el-collapse-item>
          </div>
        </el-collapse-item>
        <el-collapse-item title="图片2" name="img2">
          <el-form-item label="显示图片：">
            <el-switch
              v-model="config.backgroundImg2.show"
              style="margin-top: 7px;"
            ></el-switch>
          </el-form-item>
          <div v-if="config.backgroundImg2.show">
            <el-form-item label="图片：" v-if="config.backgroundImg2.bgImg.background"> 
              <div
                class="img-item pointer"
                @click="openDialogVisible('tpefj', '图片2')"
              > 
                <img 
                :src="config.backgroundImg2.bgImg.background" alt="" />
              </div>
            </el-form-item>

            <el-form-item label="图片宽度：">
              <el-input
                v-model="config.backgroundImg2.bgImg.width"
                size="mini"
              ></el-input>
            </el-form-item>
            <el-form-item label="图片高度：">
              <el-input
                v-model="config.backgroundImg2.bgImg.height"
                size="mini"
              ></el-input>
            </el-form-item>
            <el-form-item label="上边距：">
              <el-input
                v-model="config.backgroundImg2.bgImg.top"
                size="mini"
              ></el-input>
            </el-form-item>
            <el-form-item label="左边距：">
              <el-input
                v-model="config.backgroundImg2.bgImg.left"
                size="mini"
              ></el-input>
            </el-form-item>
          </div>
        </el-collapse-item>
      </el-collapse>
    </el-form>
    <!-- 图片弹框 -->
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
        <!--  :class="{
              active:
                img.src ===
                  (config.txtRowImgs[indexImg] &&
                    config.txtRowImgs[indexImg].background) ||
               ( img.src === config.backgroundImg2.bgImg.background),
            }" -->
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
import commonTab from "../componments/commonTab";
import { appKey, sign } from "@/utils/const.js";
import { getFilterRows } from "@/utils/api";

import commonSetTitle from "../componments/commonSetTitle";
import ImageSelector from "../componments/ImageSelector";
export default {
  name: "setting",
  components: { commonTab, commonSetTitle, ImageSelector },
  data() {
    return {
      directionOption: [
        {
          label: "纵向",
          value: "vertical",
        },
        {
          label: "横向",
          value: "horizontal",
        },
      ],
      iconOption: [
        {
          label: "圆形",
          icon: "circle",
        },
        {
          label: "矩形",
          icon: "rect",
        },
        {
          label: "圆矩形",
          icon: "roundRect",
        },
        {
          label: "三角形",
          icon: "triangle",
        },
        {
          label: "菱形",
          icon: "diamond",
        },
        {
          label: "椭圆形",
          icon: "pin",
        },
      ],
      orientOption: [
        {
          label: "水平",
          value: "horizontal",
        },
        {
          label: "垂直",
          value: "vertical",
        },
      ],
      positionOption: [
        {
          label: "内部",
          value: "inside",
        },
        {
          label: "外部",
          value: "outside",
        },
      ],
      fontList: ["Microsoft YaHei"],
      imgList: [],
      tabsList: [],
      activeName: "",
      dialogVisible: false,
      indexImg: "",
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
  watch: {
    "config.txtRowImgs": {
      handler(nVal, oVal) {},
      deep: true,
    },
  },
  computed: {
    tabImagesList() {
      let d = this.imgList.find((item) => item.name === this.activeName);
      let src = d ? d.src : [];
      return src;
    },
  },
  created() {},
  methods: {
    changeImageSrc(v) {
      if (this.indexImg == "图片2") {
        console.log("this.indexImg图片2");
        this.$set(this.config.backgroundImg2.bgImg, "background", v);
      } else {
        this.$set(this.config.txtRowImgs[this.indexImg], "background", v);
      }
      this.dialogVisible = false;
    },
    async openDialogVisible(imageField, i) {
      this.indexImg = i;
      console.log("this.indexImg", this.indexImg, i);
      let {
        data: { rows },
      } = await getFilterRows({
        appKey: appKey,
        sign: sign,
        worksheetId: 'szyzj',
        pageSize: 500,
        pageIndex: 1,
      });
      const enableImageList = rows.filter((item) => item.sfqy === "启用");
      this.tabsList = enableImageList.map((item) => item.mingcheng);
      this.imgList = enableImageList
        .map((item) => {
          if (item[imageField]) {
            console.log("item[imageField]", JSON.parse(item[imageField]));
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
.right-setting {
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
</style>
