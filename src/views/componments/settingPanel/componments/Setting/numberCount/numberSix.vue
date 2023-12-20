<template>
  <el-scrollbar class="right-setting scrollbar-wrapper">
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
      <el-form-item label="外边距(上右下左)：">
        <el-input
          v-model="config.contain.margin"
          size="mini"
          placeholder="请输入边距"
        ></el-input>
      </el-form-item>
      <el-form-item label="内边距(上右下左)：">
        <el-input
          v-model="config.contain.padding"
          size="mini"
          placeholder="请输入边距"
        ></el-input>
      </el-form-item>
      <ImageSelector
        label="背景图："
        @changeSrc="(val) => $emit('changeValue', 'contain', 'background', val)"
        worksheetId="shuzhiliu"
        imageField="rqbjt"
        :src="config.contain.background"
      ></ImageSelector>

      <el-form-item label="显示选中背景图：">
        <el-switch
          style="margin-top: 7px;"
          v-model="config.contain.isShowActiveBg"
        ></el-switch>
      </el-form-item>
      <span v-if="config.contain.isShowActiveBg">
        <ImageSelector
          label="选中背景图片："
          @changeSrc="(val) => $emit('changeValue', 'contain', 'activeBg', val)"
          worksheetId="shuzhiliu"
          imageField="rqxzbjt"
          :src="config.contain.activeBg"
        ></ImageSelector>
        <el-form-item label="选中方式：">
          <el-radio v-model="config.contain.selectType" label="radio"
            >单选</el-radio
          >
          <el-radio v-model="config.contain.selectType" label="check"
            >多选</el-radio
          >
        </el-form-item>
      </span>
      <el-collapse>
        <el-collapse-item title="图标" name="icon">
          <el-form-item label="显示：">
            <el-switch
              style="margin-top: 7px;"
              v-model="config.bImg.show"
            ></el-switch>
          </el-form-item>
          <div v-show="config.bImg.show">
            <el-form-item label="宽度：">
              <div class="flex align-center">
                <el-input
                  v-model="config.bImg.width"
                  size="mini"
                  style="margin: 0 8px 0 0px"
                ></el-input
                >px
              </div>
            </el-form-item>
            <el-form-item label="高度：">
              <div class="flex align-center">
                <el-input
                  v-model="config.bImg.height"
                  size="mini"
                  style="margin: 0 8px 0 0px"
                ></el-input
                >px
              </div>
            </el-form-item>
            <el-form-item label="右边距：">
              <el-input
                v-model="config.bImg.marginRight"
                size="mini"
              ></el-input>
            </el-form-item>
          </div>
        </el-collapse-item>
        <el-collapse-item title="文本(第一行)(名称)" name="rowone">
          <el-form-item label="显示：">
            <el-switch
              style="margin-top: 7px;"
              v-model="config.rowOne.show"
            ></el-switch>
          </el-form-item>
          <div v-show="config.rowOne.show">
            <commonTab
              :config="config"
              type1="rowOne"
              :isShowColor="false"
              @changeValue="
                (param1, param2, val) =>
                  $emit('changeValue', param1, param2, val)
              "
            ></commonTab>
            <txtGradient
              :config="config"
              type="titleTxt1"
              parentType="rowOne"
              @changeValue="
                (param1, param2, val) =>
                  $emit('changeValue', param1, param2, val)
              "
            />
          </div>
          <el-form-item label="宽度：">
            <div class="flex align-center">
              <el-input
                v-model="config.rowOne.width"
                size="mini"
                style="margin: 0 8px 0 0px"
              ></el-input
              >{{ config.rowOne.width === "auto" ? "" : "px" }}
            </div>
          </el-form-item>
          <el-form-item label="显示背景：">
            <el-switch
              style="margin-top: 7px;"
              v-model="config.rowOne.isShowBg"
            ></el-switch>
          </el-form-item>
          <span v-if="config.rowOne.isShowBg">
            <el-form-item label="高度：">
              <div class="flex align-center">
                <el-input
                  v-model="config.rowOne.height"
                  size="mini"
                  style="margin: 0 8px 0 0px"
                ></el-input
                >{{ config.rowOne.height === "auto" ? "" : "px" }}
              </div>
            </el-form-item>
            <el-form-item label="左边距：">
              <div class="flex align-center">
                <el-input
                  v-model="config.rowOne.paddingLeft"
                  size="mini"
                  style="margin: 0 8px 0 0px"
                ></el-input
                >px
              </div>
            </el-form-item>
            <el-form-item label="背景图：">
              <el-switch
                style="margin-top: 7px;"
                v-model="config.rowOne.isBgImg"
                active-text="背景图"
                inactive-text="背景色"
              ></el-switch>
            </el-form-item>
            <ImageSelector
              v-if="config.rowOne.isBgImg"
              label="背景图片："
              @changeSrc="
                (val) => $emit('changeValue', 'rowOne', 'backgroundImg', val)
              "
              worksheetId="shuzhiliu"
              imageField="wbybjt"
              :src="config.rowOne.backgroundImg"
            ></ImageSelector>
            <span v-else>
              <txtGradient
                :config="config"
                type="rowOneBgStyle"
                gradientType="background"
                txt="背景是否渐变："
                @changeValue="
                  (param1, param2, val) =>
                    $emit('changeValue', param1, param2, val)
                "
              />
              <el-form-item label="显示边框：">
                <el-switch
                  style="margin-top: 7px;"
                  v-model="config.rowOne.isShowBorder"
                ></el-switch>
              </el-form-item>
              <span v-if="config.rowTwo.isShowBorder">
                <el-form-item label="边框宽度：">
                  <div class="flex align-center">
                    <el-input
                      v-model="config.rowOne.borderStyle.borderWidth"
                      size="mini"
                      placeholder="请输入边框宽度"
                      style="margin-right: 12px"
                    ></el-input
                    >px
                  </div>
                </el-form-item>
                <el-form-item label="边框样式：">
                  <el-select
                    popper-class="setting-select"
                    v-model="config.rowOne.borderStyle.borderStyle"
                    placeholder="请选边框样式"
                  >
                    <el-option
                      v-for="(item, i) in styleList"
                      :label="item"
                      :key="i"
                      :value="item"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="边框色：">
                  <el-color-picker
                    v-model="config.rowOne.borderStyle.borderColor"
                    size="mini"
                    show-alpha
                  ></el-color-picker>
                </el-form-item>
              </span>
            </span>
          </span>
        </el-collapse-item>
        <el-collapse-item title="文本(第二行)" name="rowTwo">
          <el-form-item label="上外边距：">
            <div class="flex align-center">
              <el-input
                v-model="config.rowTwo.marginTop"
                size="mini"
                style="margin: 0 8px 0 0px"
              ></el-input
              >px
            </div>
          </el-form-item>
          <el-form-item label="显示背景：">
            <el-switch
              style="margin-top: 7px;"
              v-model="config.rowTwo.isShowBg"
            ></el-switch>
          </el-form-item>
          <span v-if="config.rowTwo.isShowBg">
            <el-form-item label="宽度：">
              <div class="flex align-center">
                <el-input
                  v-model="config.rowTwo.width"
                  size="mini"
                  style="margin: 0 8px 0 0px"
                ></el-input
                >{{ config.rowTwo.width === "auto" ? "" : "px" }}
              </div>
            </el-form-item>
            <el-form-item label="高度：">
              <div class="flex align-center">
                <el-input
                  v-model="config.rowTwo.height"
                  size="mini"
                  style="margin: 0 8px 0 0px"
                ></el-input
                >{{ config.rowTwo.height === "auto" ? "" : "px" }}
              </div>
            </el-form-item>
            <el-form-item label="左内边距：">
              <div class="flex align-center">
                <el-input
                  v-model="config.rowTwo.paddingLeft"
                  size="mini"
                  style="margin: 0 8px 0 0px"
                ></el-input
                >px
              </div>
            </el-form-item>
            <el-form-item label="背景图：">
              <el-switch
                style="margin-top: 7px;"
                v-model="config.rowTwo.isBgImg"
                active-text="背景图"
                inactive-text="背景色"
              ></el-switch>
            </el-form-item>
            <ImageSelector
              v-if="config.rowTwo.isBgImg"
              label="背景图片："
              @changeSrc="
                (val) => $emit('changeValue', 'rowTwo', 'backgroundImg', val)
              "
              worksheetId="shuzhiliu"
              imageField="wbebjt"
              :src="config.rowTwo.backgroundImg"
            ></ImageSelector>
            <span v-else>
              <txtGradient
                :config="config"
                type="rowTwoBgStyle"
                gradientType="background"
                txt="背景是否渐变："
                @changeValue="
                  (param1, param2, val) =>
                    $emit('changeValue', param1, param2, val)
                "
              />
              <el-form-item label="显示边框：">
                <el-switch
                  style="margin-top: 7px;"
                  v-model="config.rowTwo.isShowBorder"
                ></el-switch>
              </el-form-item>
              <span v-if="config.rowTwo.isShowBorder">
                <el-form-item label="边框宽度：">
                  <div class="flex align-center">
                    <el-input
                      v-model="config.rowTwo.borderStyle.borderWidth"
                      size="mini"
                      placeholder="请输入边框宽度"
                      style="margin-right: 12px"
                    ></el-input
                    >px
                  </div>
                </el-form-item>
                <el-form-item label="边框样式：">
                  <el-select
                    popper-class="setting-select"
                    v-model="config.rowTwo.borderStyle.borderStyle"
                    placeholder="请选边框样式"
                  >
                    <el-option
                      v-for="(item, i) in styleList"
                      :label="item"
                      :key="i"
                      :value="item"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="边框色：">
                  <el-color-picker
                    v-model="config.rowTwo.borderStyle.borderColor"
                    size="mini"
                    show-alpha
                  ></el-color-picker>
                </el-form-item>
              </span>
              <!-- <txtGradient
                v-if="config.rowTwo.isShowBorder"
                :config="config"
                type="rowTwo"
                gradientType="border"
                txt="边框是否渐变："
              /> -->
            </span>
          </span>
          <el-collapse-item title="文本(数值)" name="rowTwoTxt1">
            <el-form-item label="显示：">
              <el-switch
                style="margin-top: 7px;"
                v-model="config.rowTwoTxt1.show"
              ></el-switch>
            </el-form-item>
            <div v-show="config.rowTwoTxt1.show">
              <el-form-item label="宽度：">
                <div class="flex align-center">
                  <el-input
                    v-model="config.rowTwoTxt1.width"
                    size="mini"
                    style="margin: 0 8px 0 0px"
                  ></el-input
                  >{{ config.rowTwoTxt1.width === "auto" ? "" : "px" }}
                </div>
              </el-form-item>
              <commonTab
                :config="config"
                type1="rowTwoTxt1"
                :isShowColor="false"
                @changeValue="
                  (param1, param2, val) =>
                    $emit('changeValue', param1, param2, val)
                "
              ></commonTab>
              <txtGradient
                :config="config"
                type="titleTxt2"
                parentType="rowTwoTxt1"
              />
            </div>
          </el-collapse-item>
          <el-collapse-item title="文本(单位)" name="rowTwoTxt2">
            <el-form-item label="显示：">
              <el-switch
                style="margin-top: 7px;"
                v-model="config.rowTwoTxt2.show"
              ></el-switch>
            </el-form-item>
            <div v-show="config.rowTwoTxt2.show">
              <el-form-item label="宽度：">
                <div class="flex align-center">
                  <el-input
                    v-model="config.rowTwoTxt2.width"
                    size="mini"
                    style="margin: 0 8px 0 0px"
                  ></el-input
                  >{{ config.rowTwoTxt2.width === "auto" ? "" : "px" }}
                </div>
              </el-form-item>
              <el-form-item label="左边距：">
                <div class="flex align-center">
                  <el-input
                    v-model="config.rowTwoTxt2.marginLeft"
                    size="mini"
                    style="margin: 0 8px 0 0px"
                  ></el-input
                  >px
                </div>
              </el-form-item>
              <commonTab
                :config="config"
                type1="rowTwoTxt2"
                :isShowColor="false"
                @changeValue="
                  (param1, param2, val) =>
                    $emit('changeValue', param1, param2, val)
                "
              ></commonTab>
              <txtGradient
                :config="config"
                type="titleTxt3"
                parentType="rowTwoTxt2"
                @changeValue="
                  (param1, param2, val) =>
                    $emit('changeValue', param1, param2, val)
                "
              />
            </div>
          </el-collapse-item>
        </el-collapse-item>
        <el-collapse-item title="文本(标签)" name="tag" v-if="config.tagsStyle&&config.tagsStyle.colorArr">
          <el-form-item label="显示：">
            <el-switch
              style="margin-top: 7px;"
              v-model="config.tagsStyle.show"
            ></el-switch>
          </el-form-item>
          <div v-show="config.tagsStyle.show">
            <commonTab
              :config="config"
              type1="tagsStyle"
              :isTxtAlign2="false"
              :isTxtAlign="false"
              @changeValue="
                (param1, param2, val) =>
                  $emit('changeValue', param1, param2, val)
              "
            ></commonTab>
            <el-form-item label="上外边距：">
            <div class="flex align-center">
              <el-input
                v-model="config.tagsStyle.marginTop"
                size="mini"
                style="margin: 0 8px 0 0px"
              ></el-input
              >px
            </div>
          </el-form-item>
          <el-form-item label="圆角：">
            <div class="flex align-center">
              <el-input
                v-model="config.tagsStyle.borderRadius"
                size="mini"
                style="margin: 0 8px 0 0px"
              ></el-input
              >px
            </div>
          </el-form-item>
            <el-form-item label="字体背景默认颜色：" label-width="145px">
              <div class="flex align-center">
                <el-color-picker
                  v-model="config.tagsStyle.color"
                  show-alpha
                  size="mini"
                  style="margin-right: 5px;"
                ></el-color-picker>
                <el-color-picker
                  v-model="config.tagsStyle.backgroundColor"
                  show-alpha
                  size="mini"
                  style="margin-right: 5px;"
                ></el-color-picker>
                
              </div>
            </el-form-item>
            <el-form-item label="枚举文本颜色：">
                <el-button
                  type="primary"
                  size="mini"
                  icon="el-icon-plus"
                  @click="addColorData()"
                  >添加颜色配置</el-button
                >
              </el-form-item>
              <div
                class="colorData"
                v-for="(v, i) in config.tagsStyle.colorArr"
                :key="i"
              >
                <el-form-item class="no-margin">

                  <el-input
                    v-model="v.txt"
                    size="mini"
                    placeholder="请输入值"
                  ></el-input>
                  <el-color-picker
                    v-model="v.color"
                    size="mini"
                    style="margin-left: 5px;"
                    show-alpha
                  ></el-color-picker>
                  <el-color-picker
                    v-model="v.background"
                    size="mini"
                    style="margin-left: 5px;"
                    show-alpha
                  ></el-color-picker>
                  <i
                    style="color: red"
                    class="el-icon-delete"
                    @click="delColor(i)"
                  />
                </el-form-item>
              </div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </el-form>
  </el-scrollbar>
</template>

<script>
import commonTab from "../componments/commonTab";
import txtGradient from "../componments/txtGradient";
import ImageSelector from "../componments/ImageSelector";
import { getImgData } from "@/utils/index.js";
import commonSetTitle from "../componments/commonSetTitle";
export default {
  name: "setting",
  components: { commonTab, txtGradient, ImageSelector ,commonSetTitle},
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
      styleList: ["solid", "dashed"],
      imgList: [
        { name: "图1", src: require("@/assets/component/img/icon1.png") },
        { name: "图2", src: require("@/assets/component/img/camera_list.png") },
        { name: "图3", src: require("@/assets/component/img/icon1.png") },
      ],
      backgroundData: "",
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
  mounted() {
    this.getBackgroundData();
  },
  watch:{
    "config.tagsStyle.colorArr":{
      handler(n){
        console.log(n,'====n');
      }
    }
  },
  methods: {
    addColorData(){
        this.config.tagsStyle.colorArr.push( {
        txt:'',
        color:'rgba(83, 195, 255, 1)',
        background:'rgba(83, 195, 255, 0.102)'
      })
    },
    delColor(i) {
      this.config.tagsStyle.colorArr.splice(i, 1);
    },
    async getBackgroundData() {
      this.backgroundData = await getImgData(this.config);
    },
    changeBar(data) {
      this.currectBar = data.key;
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
  },
};
</script>

<style lang="scss" scoped>
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
