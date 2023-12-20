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
      <el-form-item label="默认展示数量：">
        <div class="flex" style="color: #fff">
          <el-input-number
            v-model="config.contain.arrangeNum"
            :min="1"
            :max="config.data.length"
            label=""
          ></el-input-number>
          <div style="margin-left: 10px">个</div>
        </div>
      </el-form-item>
      <el-form-item label="是否显示翻页按钮：" label-width="138px">
        <el-switch
          style="margin-top: 7px;"
          v-model="config.contain.scroll"
        ></el-switch>
      </el-form-item>
      <el-form-item label="间隔时间：" v-show="config.contain.scroll">
        <div class="flex align-center">
          <el-input
            v-model="config.contain.time"
            size="mini"
            style="margin: 0 8px 0 0px"
          ></el-input
          >秒
        </div>
      </el-form-item>
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
      <el-form-item label="容器右边距：">
        <el-input
          v-model="config.contain.marginRight"
          size="mini"
          placeholder="请输入右边距高度"
        ></el-input>
      </el-form-item>
      <el-collapse>
        <el-collapse-item title="文本(名称)" name="titleNumber">
          <el-form-item label="显示：">
            <el-switch
              style="margin-top: 7px;"
              v-model="config.textTitle.show"
            ></el-switch>
          </el-form-item>
          <div v-show="config.textTitle.show">
            <commonTab
              :config="config"
              type1="textTitle"
              @changeValue="
                (param1, param2, val) =>
                  $emit('changeValue', param1, param2, val)
              "
            ></commonTab>
            <el-form-item label="上边距：">
              <div class="flex align-center">
                <el-input
                  v-model="config.textTitle.marginTop"
                  size="mini"
                  style="margin: 0 8px 0 0px"
                ></el-input
                >px
              </div>
            </el-form-item>
          </div>
        </el-collapse-item>
        <el-collapse-item title="文本(数值一)" name="rowone">
          <el-form-item label="显示：">
            <el-switch
              style="margin-top: 7px;"
              v-model="config.txtRowOne.show"
            ></el-switch>
          </el-form-item>
          <div v-show="config.txtRowOne.show">
            <commonTab
              :config="config"
              type1="txtRowOne"
              @changeValue="
                (param1, param2, val) =>
                  $emit('changeValue', param1, param2, val)
              "
            ></commonTab>
            <el-form-item label="上边距：">
              <div class="flex align-center">
                <el-input
                  v-model="config.txtRowOne.marginTop"
                  size="mini"
                  style="margin: 0 8px 0 0px"
                ></el-input
                >px
              </div>
            </el-form-item>
          </div>
        </el-collapse-item>
        <el-collapse-item title="文本(数值二)" name="rowTwo">
          <el-form-item label="显示：">
            <el-switch
              style="margin-top: 7px;"
              v-model="config.txtRowtwo.show"
            ></el-switch>
          </el-form-item>
          <div v-show="config.txtRowtwo.show">
            <commonTab
              :config="config"
              type1="txtRowtwo"
              :isShowFontSet="false"
              @changeValue="
                (param1, param2, val) =>
                  $emit('changeValue', param1, param2, val)
              "
            ></commonTab>
            <el-form-item label="字体：">
              <el-select
                v-model="config.txtRowtwo.fontFamily"
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
            <el-form-item label="字体大小：">
              <div class="flex align-center">
                <el-input
                  v-model="config.txtRowtwo.fontSize"
                  size="mini"
                  style="margin: 0 8px 0 0px"
                ></el-input
                >px
              </div>
            </el-form-item>
            <el-form-item label="字体颜色(左中右)：" label-width="135px">
              <div class="flex align-center">
                <el-color-picker
                  v-model="config.txtRowtwo.colorLeft"
                  show-alpha
                  size="mini"
                  style="margin-right: 5px;"
                ></el-color-picker>
                <el-color-picker
                  v-model="config.txtRowtwo.color"
                  show-alpha
                  size="mini"
                  style="margin-right: 5px;"
                ></el-color-picker>
                <el-color-picker
                  v-model="config.txtRowtwo.colorRight"
                  show-alpha
                  size="mini"
                  style="margin-right: 5px;"
                ></el-color-picker>
              </div>
            </el-form-item>
            <el-form-item label="中间内容">
              <div class="flex align-center">
                <el-input
                  v-model="config.contain.contain"
                  size="mini"
                  style="margin: 0 8px 0 0px"
                ></el-input
                >
              </div>
            </el-form-item>
            <el-form-item label="上边距：">
              <div class="flex align-center">
                <el-input
                  v-model="config.txtRowtwo.marginTop"
                  size="mini"
                  style="margin: 0 8px 0 0px"
                ></el-input
                >px
              </div>
            </el-form-item>
          </div>
        </el-collapse-item>
        <el-collapse-item title="图片" name="rowThree">
          <el-form-item label="背景图：">
            <el-switch
              style="margin-top: 7px;"
              v-model="config.contain.show"
            ></el-switch>
          </el-form-item>
          <ImageSelector
            v-if="config.contain.show"
            label="图片："
            @changeSrc="
              (val) => $emit('changeValue', 'contain', 'background', val)
            "
            worksheetId="szwzj"
            imageField="background_img"
            :src="config.contain.background"
          ></ImageSelector>
          <el-form-item label="背景色：" v-else>
            <div class="flex align-center">
              <el-color-picker
                v-model="config.contain.backgroundColor"
                show-alpha
                size="mini"
                style="margin-right: 5px;"
              ></el-color-picker>
            </div>
          </el-form-item>
          <el-form-item label="选中边框颜色：">
            <div class="flex align-center">
              <el-color-picker
                v-model="config.contain.borderColor"
                show-alpha
                size="mini"
                style="margin-right: 5px;"
              ></el-color-picker>
            </div>
          </el-form-item>
          <el-form-item label="中心图标：">
            <el-switch
              style="margin-top: 7px;"
              v-model="config.txtRowImg.show"
            ></el-switch>
          </el-form-item>
          <div v-show="config.txtRowImg.show">
            <el-form-item label="中心图标宽度：">
              <div class="flex align-center">
                <el-input
                  v-model="config.txtRowImg.width"
                  size="mini"
                  style="margin: 0 8px 0 0px"
                ></el-input
                >px
              </div>
            </el-form-item>

            <el-form-item label="中心图标高度：">
              <div class="flex align-center">
                <el-input
                  v-model="config.txtRowImg.height"
                  size="mini"
                  style="margin: 0 8px 0 0px"
                ></el-input
                >px
              </div>
            </el-form-item>
            <el-form-item label="上间距：">
              <div class="flex align-center">
                <el-input
                  v-model="config.txtRowImg.marginTop"
                  size="mini"
                  style="margin: 0 8px 0 0px"
                ></el-input
                >px
              </div>
            </el-form-item>
            <el-form-item label="左边距：">
              <div class="flex align-center">
                <el-input
                  v-model="config.txtRowImg.marginLeft"
                  size="mini"
                  style="margin: 0 8px 0 0px"
                ></el-input
                >px
              </div>
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
                <div class="img-item pointer" @click="openDialogVisible('center_img',i)">
                  <img :src="config.txtRowImgs[i].background" alt="" />
                </div>
              </el-form-item>
            </el-collapse-item>
          </div>
        </el-collapse-item>
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
            :class="{ active: img.src === config.txtRowImgs[indexImg].background }"
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
      tabsList:[],
      activeName:'',
      dialogVisible:false,
      indexImg:"",
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
  created() {
  },
  computed: {
    tabImagesList() {
      let d = this.imgList.find((item) => item.name === this.activeName);
      let src = d ? d.src : [];
      return src;
    },
  },
  methods: {
    async openDialogVisible(imageField,i) {
      this.indexImg = i ;
      let {  data: { rows }, } = await getFilterRows({
        appKey: appKey,
        sign: sign,
        worksheetId:'szwzj',
        pageSize: 500,
        pageIndex: 1,
        rowId: sessionStorage.getItem('rowid'),
      });
      const enableImageList = rows.filter((item) => item.sfqy === "启用");
      this.tabsList = enableImageList.map((item) => item.mingcheng);
      this.imgList = enableImageList
        .map((item) => {
          if (item[imageField]) {
            return {
              name: item.mingcheng,
              src: JSON.parse(item[imageField]).map(
                (ele) => ele.DownloadUrl
              ),
            };
          }
          return "";
        })
        .filter((item) => item);
      this.activeName = this.tabsList[0];
      this.dialogVisible = true;
    },
    changeImageSrc(img) {
      this.config.txtRowImgs[this.indexImg].background = img
      this.dialogVisible = false;
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
  .componentName {
    display: flex;
    align-items: center;

    .el-input {
      flex: 1;
    }

    > span:nth-of-type(1) {
      width: 20px;
      height: 20px;
      background-size: 100% 100%;
      background-image: url("../../../../../../assets/image/jiesuo.png");
      cursor: pointer;

      &.active {
        background-image: url("../../../../../../assets/image/suoding.png");
      }
    }

    > span:nth-of-type(2) {
      width: 20px;
      height: 20px;
      background-size: 100% 100%;
      background-image: url("../../../../../../assets/image/yanjing_yincang.png");
      cursor: pointer;

      &.active {
        background-image: url("../../../../../../assets/image/yanjing_xianshi.png");
      }
    }
  }
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
