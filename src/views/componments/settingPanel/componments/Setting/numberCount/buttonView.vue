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
      <el-collapse>
        <el-collapse-item title="按钮图片" name="titleNumber">
          <div>
            <ImageSelector
              label="默认图片："
              
              @changeSrc="(val) =>  $emit('changeValue', 'backgroundImg', 'background', val)"
              worksheetId="buttonView"
              imageField="default_img"
              :src="config.backgroundImg.background"
            ></ImageSelector>
            <div v-if="config.buttonStyle.imgShow">
              <el-form-item label="图片宽度：">
                <el-input
                  v-model="config.backgroundImg.width"
                  size="mini"
                  placeholder="请输入图片宽度"
                ></el-input>
              </el-form-item>
              <el-form-item label="图片高度：">
                <el-input
                  v-model="config.backgroundImg.height"
                  size="mini"
                  placeholder="请输入图片高度"
                ></el-input>
              </el-form-item>
            </div>
            <ImageSelector
              label="选中图片："
              @changeSrc="(val) =>  $emit('changeValue', 'backgroundActive', 'background', val)"
              worksheetId="buttonView"
              imageField="active_img"
              :src="config.backgroundActive.background"
            ></ImageSelector>
            <div v-if="config.buttonStyle.imgShow">
              <el-form-item label="图片宽度：">
                <el-input
                  v-model="config.backgroundActive.width"
                  size="mini"
                  placeholder="请输入图片宽度"
                ></el-input>
              </el-form-item>
              <el-form-item label="图片高度：">
                <el-input
                  v-model="config.backgroundActive.height"
                  size="mini"
                  placeholder="请输入图片高度"
                ></el-input>
              </el-form-item>
            </div>
            <el-form-item label="按钮是否显示文字：" label-width="140px">
              <el-switch
                style="margin-top: 7px;"
                v-model="config.buttonStyle.txtShow"
              ></el-switch>
            </el-form-item>
            <div v-if="config.buttonStyle.txtShow">
              <el-form-item label="文字内容：">
                <div class="flex align-center">
                  <el-input
                    v-model="config.buttonStyle.txt"
                    size="mini"
                    style="margin: 0 8px 0 0px"
                  ></el-input
                  >px
                </div>
              </el-form-item>
              <el-form-item label="文字颜色：">
                <div class="flex align-center" style="color: aliceblue;">
                  <el-color-picker
                    v-model="config.buttonStyle.color"
                    show-alpha
                    size="mini"
                    style="margin-right: 5px;"
                  ></el-color-picker>
                </div>
              </el-form-item>
              <el-form-item label="字体：">
                <el-select
                  v-model="config.buttonStyle.fontFamily"
                  placeholder="请选择字体"
                  @change="
                    (val) =>
                      $emit('changeValue', 'buttonStyle', 'fontFamily', val)
                  "
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
                    v-model="config.buttonStyle.fontSize"
                    size="mini"
                    style="margin: 0 8px 0 0px"
                  ></el-input
                  >px
                </div>
              </el-form-item>
              <el-form-item label="行间距：">
                <div class="flex align-center">
                  <el-input
                    v-model="config.buttonStyle.lineHeight"
                    size="mini"
                    style="margin: 0 8px 0 0px"
                  ></el-input
                  >px
                </div>
              </el-form-item>
            </div>
          </div>
          <el-collapse-item
            title="浮入时文字"
            style="margin-bottom:5px"
            name="hoverTxt"
          >
            <el-form-item label="是否显示浮入文字：" label-width="140px">
              <el-switch
                style="margin-top: 7px;"
                v-model="config.buttonStyle.hoverShow"
              ></el-switch>
            </el-form-item>

            <div v-if="config.buttonStyle.hoverShow">
              <ImageSelector
              label="边框图片："
              @changeSrc="
                (val) =>
                  $emit('changeValue', 'hoverStyle', 'background', val)
              "
              worksheetId="buttonView"
              imageField="hover_img"
              :src="config.hoverStyle.background"
            ></ImageSelector>
              <el-form-item label="图片宽度：">
                <el-input
                  v-model="config.hoverStyle.width"
                  size="mini"
                  placeholder="请输入图片宽度"
                ></el-input>
              </el-form-item>
              <el-form-item label="图片高度：">
                <el-input
                  v-model="config.hoverStyle.height"
                  size="mini"
                  placeholder="请输入图片高度"
                ></el-input>
              </el-form-item>
              <el-form-item label="文字内容：">
                <div class="flex align-center">
                  <el-input
                    v-model="config.hoverStyle.txt"
                    size="mini"
                    style="margin: 0 8px 0 0px"
                  ></el-input
                  >px
                </div>
              </el-form-item>
              <el-form-item label="字体：">
                <el-select
                  v-model="config.hoverStyle.fontFamily"
                  placeholder="请选择字体"
                  @change="
                    (val) =>
                      $emit('changeValue', 'hoverStyle', 'fontFamily', val)
                  "
                >
                  <el-option
                    v-for="(item, i) in fontList"
                    :label="item"
                    :key="i"
                    :value="item"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="文字颜色：">
                <div class="flex align-center" style="color: aliceblue;">
                  <el-color-picker
                    v-model="config.hoverStyle.color"
                    show-alpha
                    size="mini"
                    style="margin-right: 5px;"
                  ></el-color-picker>
                </div>
              </el-form-item>
              <el-form-item label="字体大小：">
                <div class="flex align-center">
                  <el-input
                    v-model="config.hoverStyle.fontSize"
                    size="mini"
                    style="margin: 0 8px 0 0px"
                  ></el-input
                  >px
                </div>
              </el-form-item>
              <el-form-item label="行间距：">
                <div class="flex align-center">
                  <el-input
                    v-model="config.hoverStyle.lineHeight"
                    size="mini"
                    style="margin: 0 8px 0 0px"
                  ></el-input
                  >px
                </div>
              </el-form-item>
              <el-form-item label="y距离：">
                <div class="flex align-center">
                  <el-input
                    v-model="config.hoverStyle.bottom"
                    size="mini"
                    style="margin: 0 8px 0 0px"
                  ></el-input
                  >px
                </div>
              </el-form-item>
            </div>
          </el-collapse-item>
          <el-collapse-item title="视角列表框" name="droupOption">
            <el-form-item label="是否显示下拉选项：" label-width="140px">
              <el-switch
                style="margin-top: 7px;"
                v-model="config.optionStyle.optionShow"
              ></el-switch>
            </el-form-item>

            <div v-if="config.optionStyle.optionShow">
              <el-form-item label="宽度：">
                <el-input
                  v-model="config.optionStyle.width"
                  size="mini"
                  placeholder="请输入宽度"
                ></el-input>
              </el-form-item>
              <el-form-item label="高度：">
                <el-input
                  v-model="config.optionStyle.height"
                  size="mini"
                  placeholder="请输入..."
                ></el-input>
              </el-form-item>
              <el-form-item label="字体大小：">
                  <div class="flex align-center">
                    <el-input v-model="config.optionStyle.fontSize" size="mini"></el-input>
                  </div>
                </el-form-item>
              <el-form-item label="文本缩进值：">
                <el-input
                  v-model="config.optionStyle.span.textIndent"
                  size="mini"
                  placeholder="请输入..."
                ></el-input>
              </el-form-item>
              <el-form-item label="行间距：">
                <el-input
                  v-model="config.optionStyle.span.height"
                  size="mini"
                  placeholder="请输入高度"
                ></el-input>
              </el-form-item>
              <el-form-item label="y距离：">
                <el-input
                  v-model="config.optionStyle.bottom"
                  size="mini"
                  placeholder="请输入高度"
                ></el-input>
              </el-form-item>
              <el-form-item label="边框填充颜色：" label-width="125px">
                <div class="flex align-center" style="color: aliceblue;">
                  <el-color-picker
                    v-model="config.optionStyle.borderColor"
                    show-alpha
                    size="mini"
                    style="margin-right: 5px;"
                  ></el-color-picker>
                  <el-color-picker
                    v-model="config.optionStyle.background"
                    show-alpha
                    size="mini"
                    style="margin-right: 5px;"
                  ></el-color-picker>
                </div>
              </el-form-item>
              <el-form-item label="鼠标滑过背景色：" label-width="125px">
                <div class="flex align-center" style="color: aliceblue;">
                  <el-color-picker
                    v-model="config.optionStyle.span.background"
                    show-alpha
                    size="mini"
                    style="margin-right: 5px;"
                  ></el-color-picker>
                </div>
              </el-form-item>
              <el-form-item label="鼠标点击背景色：" label-width="125px">
                  <div class="flex align-center" style="color: aliceblue;">
                    <el-color-picker
                      v-model="config.optionStyle.span.backgroundClick"
                      show-alpha
                      size="mini"
                      style="margin-right: 5px;"
                    ></el-color-picker>
                  </div>
                </el-form-item>
                <el-collapse-item
              title="输入框"
              name="inputConfiguration"
              style="margin-bottom:5px"
            >
              <div>
                <el-form-item label="高度：">
                  <el-input
                    v-model="config.input.height"
                    size="mini"
                    placeholder="请输入..."
                  ></el-input>
                </el-form-item>
                <el-form-item label="背景边框颜色：" label-width="125px">
                  <div class="flex align-center" style="color: aliceblue;">
                    <el-color-picker
                      v-model="config.input.background"
                      show-alpha
                      size="mini"
                      style="margin-right: 5px;"
                    ></el-color-picker>
                    <el-color-picker
                      v-model="config.input.borderColor"
                      show-alpha
                      size="mini"
                      style="margin-right: 5px;"
                    ></el-color-picker>
                  </div>
                </el-form-item>
              </div>
            </el-collapse-item>
            <el-collapse-item
              title="添加视角文字"
              name="addViewTxt"
              style="margin-bottom:5px"
            >
              <div>
                <el-form-item label="高度：">
                  <el-input
                    v-model="config.addView.height"
                    size="mini"
                    placeholder="请输入..."
                  ></el-input>
                </el-form-item>
                <el-form-item label="文字内容：">
                  <el-input
                    v-model="config.addView.txt"
                    size="mini"
                    placeholder="请输入..."
                  ></el-input>
                </el-form-item>
                <el-form-item label="背景文字颜色：" label-width="125px">
                  <div class="flex align-center" style="color: aliceblue;">
                    <el-color-picker
                      v-model="config.addView.background"
                      show-alpha
                      size="mini"
                      style="margin-right: 5px;"
                    ></el-color-picker>
                    <el-color-picker
                      v-model="config.addView.color"
                      show-alpha
                      size="mini"
                      style="margin-right: 5px;"
                    ></el-color-picker>
                  </div>
                </el-form-item>
                <el-form-item label="字体大小：">
                  <el-input
                    v-model="config.addView.fontSize"
                    size="mini"
                    placeholder="请输入..."
                  ></el-input>
                </el-form-item>
              </div>
              <el-collapse-item title="视角" name="viewTxt">
              <div>
                <el-form-item label="高度：">
                  <el-input
                    v-model="config.optionStyle.span.height"
                    size="mini"
                    placeholder="请输入..."
                  ></el-input>
                </el-form-item>
                <el-form-item label="文字颜色：" label-width="125px">
                  <div class="flex align-center" style="color: aliceblue;">
                    <el-color-picker
                      v-model="config.optionStyle.color"
                      show-alpha
                      size="mini"
                      style="margin-right: 5px;"
                    ></el-color-picker>
                  </div>
                </el-form-item>
                <el-form-item label="鼠标滑过颜色：" label-width="125px">
                  <div class="flex align-center" style="color: aliceblue;">
                    <el-color-picker
                      v-model="config.optionStyle.span.background"
                      show-alpha
                      size="mini"
                      style="margin-right: 5px;"
                    ></el-color-picker>
                  </div>
                </el-form-item>
                <el-form-item label="字体大小：">
                  <el-input
                    v-model="config.optionStyle.fontSize"
                    size="mini"
                    placeholder="请输入..."
                  ></el-input>
                </el-form-item>
                <ImageSelector
                  label="文本前图片："
                  @changeSrc="(val) => $emit('changeValue', 'optionStyle','src', val)"
                  worksheetId="buttonView"
                  imageField="wbqtp"
                  :src="config.optionStyle.src"
                ></ImageSelector>
                <el-form-item label="图片宽高：" label-width="120px">
                  <div class="flex align-center">
                    <el-input
                      v-model="config.optionStyle.span.srcWidth"
                      size="mini"
                      placeholder="宽"
                    ></el-input
                    >x<el-input
                      v-model="config.optionStyle.span.srcHeight"
                      size="mini"
                      placeholder="高"
                    ></el-input>
                  </div>
                </el-form-item>
                <el-form-item label="图片边距(左右)：" label-width="120px">
                  <div class="flex align-center">
                    <el-input
                      v-model="config.optionStyle.span.marginLeft"
                      size="mini"
                      placeholder=""
                    ></el-input
                    >x<el-input
                      v-model="config.optionStyle.span.marginRight"
                      size="mini"
                      placeholder=""
                    ></el-input>
                  </div>
                </el-form-item>
              </div>
            </el-collapse-item>
            </el-collapse-item>
            </div>
          </el-collapse-item>
        </el-collapse-item>
      </el-collapse>
    </el-form>
  </el-scrollbar>
</template>

<script>
import { getImgData } from "@/utils/index.js";
import imgSelect from "../imgSelect";
import StylesFilter from "../common";
import commonTab from "../componments/commonTab";
import ImageSelector from "../componments/ImageSelector";
import commonSetTitle from "../componments/commonSetTitle";
export default {
  name: "setting",
  components: { imgSelect, StylesFilter, commonTab ,ImageSelector,commonSetTitle},
  data() {
    return {
      fontFamily: "Microsoft YaHei",
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
      fontList: ["Microsoft YaHei", "YouSheBiaoTiHei"],
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
  computed: {},
  mounted() {
    this.getBackgroundData();
  },
  methods: {
    async getBackgroundData() {
      this.backgroundData = await getImgData(this.config);
    },
    addShowTab() {
      this.config.data.push({
        color: "#fff",
        fontSize: 14,
        name: "默认文本",
      });
      //   this.config.dataStyle.push({
      //     isShowImg: false,
      //     img: "",
      //     activeImg: "",
      //   });
    },
    delData(i) {
      this.config.data.splice(i, 1);
      //   this.config.dataStyle.splice(i, 1);
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
