<!--
 * @Descripttion: 说明
 * @version: V1.0
 * @Author: 卜倩倩
 * @Date: 2023-08-08 14:54:17
 * @LastEditors: 卜倩倩
 * @LastEditTime: 2023-11-24 13:12:14
-->
<template>
  <el-scrollbar class="right-setting scrollbar-wrapper">
    <el-form
      label-width="113px"
      size="small"
      class="border-box"
      style="padding: 8px 16px"
    >
      <el-form-item label="名称：">
        <div
          class="componentName"
          style="display:flex;align-items:center"
        >
          <el-input
            v-model="config.name"
            size="mini"
            placeholder=""
          ></el-input>
          <span
            :class="config.isLock ? 'active' : ''"
            @click="(val) => $emit('changeSize', 'isLock', !config.isLock)"
          ></span>
          <span
            :class="config.isShow ? 'active' : ''"
            @click="(val) => $emit('changeSize', 'isShow', !config.isShow)"
          ></span>
        </div>
      </el-form-item>

      <el-form-item label="组件宽度：">
        <el-input
          v-model="config.width"
          size="mini"
          @change="(val) => $emit('changeSize', 'width', val)"
          placeholder="请输入组件宽度"
        ></el-input>
      </el-form-item>
      <el-form-item label="组件高度：">
        <el-input
          v-model="config.height"
          size="mini"
          @change="(val) => $emit('changeSize', 'height', val)"
          placeholder="请输入组件高度"
        ></el-input>
      </el-form-item>
      <el-form-item label="X距离：">
        <el-input
          v-model="config.left"
          size="mini"
          @change="(val) => $emit('changeSize', 'left', val)"
        ></el-input>
      </el-form-item>
      <el-form-item label="Y距离：">
        <el-input
          v-model="config.top"
          size="mini"
          @change="(val) => $emit('changeSize', 'top', val)"
        ></el-input>
      </el-form-item>
      <el-form-item label="单条数据宽高：">
        <div style="display: flex">
          <el-input
            v-model="config.box.width"
            size="mini"
            placeholder="高度"
          ></el-input>
          <span style="margin: 0 10px">x</span>
          <el-input
            v-model="config.box.height"
            size="mini"
            placeholder="宽度"
          ></el-input>
        </div>
      </el-form-item>
      <el-form-item label="是否滚动：">
        <el-switch
          v-model="config.box.isScroll"
          style="margin-right: 10px"
        ></el-switch>
      </el-form-item>
      <el-form-item label="排列方向：">
        <el-select v-model="config.box.direction">
          <el-option
            label="横"
            value="row"
          ></el-option>
          <el-option
            label="竖"
            value="column"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="是否错落排序：">
        <el-switch
          v-model="config.box.multiple"
          style="margin-right: 10px"
        ></el-switch>
      </el-form-item> -->
      <el-form-item label="排列数量：">
        <!-- <span>一{{config.box.direction === 'row'? '行':'列'}}</span> -->
        <el-input-number
          v-model="config.box.arrangeNum"
          :min="1"
          label=""
        ></el-input-number>
        <span>{{config.box.direction === 'row'? '行':'列'}}</span>
      </el-form-item>
      <el-form-item label="卡片背景颜色：">
        <el-color-picker
          v-model="config.box.backgroundColor"
          show-alpha
        ></el-color-picker>
      </el-form-item>
      <el-form-item label="边框：">
        <el-color-picker
          v-model="config.box.borderColor"
          show-alpha
        ></el-color-picker>
        <span>粗细</span>
        <el-slider v-model="config.box.borderWidth"></el-slider>
      </el-form-item>

      <el-collapse>
        <el-collapse-item
          title="文本(标题)"
          name="title"
        >
          <div class="fontStyle">
            <div class="block">
              <span
                class="bg"
                :class="config.first.fontWeight=== 'bold'? 'active':''"
              ><span
                  :class="config.first.fontWeight=== 'bold'? 'bold':'non-bold'"
                  @click="$emit('changeValue', 'first','fontWeight', config.first.fontWeight=== 'bold'? 'normal':'bold')"
                ></span></span>
              <span class="title">加粗</span>
            </div>
            <div class="block">
              <span
                class="bg"
                :class="config.first.fontStyle === 'italic'? 'active':''"
              ><span
                  :class="config.first.fontStyle === 'italic'? 'incline':'non-incline'"
                  @click="$emit('changeValue', 'first','fontStyle', config.first.fontStyle=== 'normal'? 'italic':'normal')"
                ></span></span>
              <span class="title">倾斜</span>
            </div>
            <div class="block">
              <span
                class="bg"
                :class="config.first.textAlign === 'left'? 'active':''"
              ><span
                  :class="config.first.textAlign==='left'? 'left':'non-left'"
                  @click="$emit('changeValue', 'first','textAlign', 'left')"
                ></span></span>
              <span class="title">左对齐</span>
            </div>
            <div class="block">
              <span
                class="bg"
                :class="config.first.textAlign==='center'? 'active':''"
              ><span
                  :class="config.first.textAlign==='center'? 'center':'non-center'"
                  @click="$emit('changeValue', 'first','textAlign', 'center')"
                ></span></span>
              <span class="title">居中</span>
            </div>
            <div class="block">
              <span
                class="bg"
                :class="config.first.textAlign==='right'? 'active':''"
              ><span
                  :class="config.first.textAlign==='right'? 'right':'non-right'"
                  @click="$emit('changeValue', 'first','textAlign', 'right')"
                ></span></span>
              <span class="title">右对齐</span>
            </div>
          </div>
          <el-form-item label="是否显示：">
            <el-switch
              v-model="config.first.display"
              active-value="block"
              inactive-value="none"
            ></el-switch>
          </el-form-item>
          <el-form-item label="颜色/字号：">
            <div class="flex align-center">
              <el-color-picker
                v-model="config.first.color"
                show-alpha
                size="mini"
              ></el-color-picker>
              <el-input
                v-model="config.first.fontSize"
                size="mini"
                style="margin: 0 8px 0 12px"
              ></el-input>px
            </div>
          </el-form-item>
          <el-form-item label="字体：">
            <div class="flex align-center">
              <el-select
                v-model="config.first.fontFamily"
                placeholder="请选择"
              >
                <el-option
                  label="微软雅黑"
                  value="微软雅黑"
                ></el-option>
              </el-select>
            </div>
          </el-form-item>
          <el-form-item label="字间距：">
            <el-input
              v-model="config.first.letterSpacing"
              size="mini"
            ></el-input>
          </el-form-item>
        </el-collapse-item>
      </el-collapse>

      <el-collapse>
        <el-collapse-item
          title="文本(第二行)"
          name="title"
        >
          <div class="fontStyle">
            <div class="block">
              <span
                class="bg"
                :class="config.second.fontWeight=== 'bold'? 'active':''"
              ><span
                  :class="config.second.fontWeight=== 'bold'? 'bold':'non-bold'"
                  @click="$emit('changeValue', 'second','fontWeight', config.second.fontWeight=== 'bold'? 'normal':'bold')"
                ></span></span>
              <span class="title">加粗</span>
            </div>
            <div class="block">
              <span
                class="bg"
                :class="config.second.fontStyle === 'italic'? 'active':''"
              ><span
                  :class="config.second.fontStyle === 'italic'? 'incline':'non-incline'"
                  @click="$emit('changeValue', 'second','fontStyle', config.second.fontStyle=== 'normal'? 'italic':'normal')"
                ></span></span>
              <span class="title">倾斜</span>
            </div>
            <div class="block">
              <span
                class="bg"
                :class="config.second.textAlign === 'left'? 'active':''"
              ><span
                  :class="config.second.textAlign==='left'? 'left':'non-left'"
                  @click="$emit('changeValue', 'second','textAlign', 'left')"
                ></span></span>
              <span class="title">左对齐</span>
            </div>
            <div class="block">
              <span
                class="bg"
                :class="config.second.textAlign==='center'? 'active':''"
              ><span
                  :class="config.second.textAlign==='center'? 'center':'non-center'"
                  @click="$emit('changeValue', 'second','textAlign', 'center')"
                ></span></span>
              <span class="title">居中</span>
            </div>
            <div class="block">
              <span
                class="bg"
                :class="config.second.textAlign==='right'? 'active':''"
              ><span
                  :class="config.second.textAlign==='right'? 'right':'non-right'"
                  @click="$emit('changeValue', 'second','textAlign', 'right')"
                ></span></span>
              <span class="title">右对齐</span>
            </div>
          </div>
          <el-form-item label="是否显示：">
            <el-switch
              v-model="config.second.display"
              active-value="block"
              inactive-value="none"
            ></el-switch>
          </el-form-item>
          <el-form-item label="颜色/字号：">
            <div class="flex align-center">
              <el-color-picker
                v-model="config.second.color"
                show-alpha
                size="mini"
              ></el-color-picker>
              <el-input
                v-model="config.second.fontSize"
                size="mini"
                style="margin: 0 8px 0 12px"
              ></el-input>px
            </div>
          </el-form-item>
          <el-form-item label="字体：">
            <div class="flex align-center">
              <el-select
                v-model="config.second.fontFamily"
                placeholder="请选择"
              >
                <el-option
                  label="微软雅黑"
                  value="微软雅黑"
                ></el-option>
              </el-select>
            </div>
          </el-form-item>
          <el-form-item label="字间距：">
            <el-input
              v-model="config.second.letterSpacing"
              size="mini"
            ></el-input>
          </el-form-item>
          <el-form-item label="文本前置图片：">
            <el-switch
              v-model="config.second.firstPic"
              style="margin-right: 10px"
            ></el-switch>
          </el-form-item>
          <!-- <el-form-item label="文本内容：">
            <el-input
              v-model="config.second.text"
              size="mini"
            ></el-input>
          </el-form-item> -->
          <ImageSelector
            label="图片："
            @changeSrc="(val) => $emit('changeValue', 'second', 'selectedPic', val)"
            worksheetId="pykpzj"
            imageField="selectedPic"
            :src="config.second.selectedPic"
          ></ImageSelector>
        </el-collapse-item>
      </el-collapse>

      <el-collapse>
        <el-collapse-item
          title="文本(第三行)"
          name="title"
        >
          <div class="fontStyle">
            <div class="block">
              <span
                class="bg"
                :class="config.third.fontWeight=== 'bold'? 'active':''"
              ><span
                  :class="config.third.fontWeight=== 'bold'? 'bold':'non-bold'"
                  @click="$emit('changeValue', 'third','fontWeight', config.third.fontWeight=== 'bold'? 'normal':'bold')"
                ></span></span>
              <span class="title">加粗</span>
            </div>
            <div class="block">
              <span
                class="bg"
                :class="config.third.fontStyle === 'italic'? 'active':''"
              ><span
                  :class="config.third.fontStyle === 'italic'? 'incline':'non-incline'"
                  @click="$emit('changeValue', 'third','fontStyle', config.third.fontStyle=== 'normal'? 'italic':'normal')"
                ></span></span>
              <span class="title">倾斜</span>
            </div>
            <div class="block">
              <span
                class="bg"
                :class="config.third.textAlign === 'left'? 'active':''"
              ><span
                  :class="config.third.textAlign==='left'? 'left':'non-left'"
                  @click="$emit('changeValue', 'third','textAlign', 'left')"
                ></span></span>
              <span class="title">左对齐</span>
            </div>
            <div class="block">
              <span
                class="bg"
                :class="config.third.textAlign==='center'? 'active':''"
              ><span
                  :class="config.third.textAlign==='center'? 'center':'non-center'"
                  @click="$emit('changeValue', 'third','textAlign', 'center')"
                ></span></span>
              <span class="title">居中</span>
            </div>
            <div class="block">
              <span
                class="bg"
                :class="config.third.textAlign==='right'? 'active':''"
              ><span
                  :class="config.third.textAlign==='right'? 'right':'non-right'"
                  @click="$emit('changeValue', 'third','textAlign', 'right')"
                ></span></span>
              <span class="title">右对齐</span>
            </div>
          </div>
          <el-form-item label="是否显示：">
            <el-switch
              v-model="config.third.display"
              active-value="block"
              inactive-value="none"
            ></el-switch>
          </el-form-item>
          <el-form-item label="颜色/字号：">
            <div class="flex align-center">
              <el-color-picker
                v-model="config.third.color"
                show-alpha
                size="mini"
              ></el-color-picker>
              <el-input
                v-model="config.third.fontSize"
                size="mini"
                style="margin: 0 8px 0 12px"
              ></el-input>px
            </div>
          </el-form-item>
          <el-form-item label="字体：">
            <div class="flex align-center">
              <el-select
                v-model="config.third.fontFamily"
                placeholder="请选择"
              >
                <el-option
                  label="微软雅黑"
                  value="微软雅黑"
                ></el-option>
              </el-select>
            </div>
          </el-form-item>
          <el-form-item label="字间距：">
            <el-input
              v-model="config.third.letterSpacing"
              size="mini"
            ></el-input>
          </el-form-item>
        </el-collapse-item>
      </el-collapse>

      <el-collapse>
        <el-collapse-item
          title="图片"
          name="title"
        >
          <el-form-item label="宽高">
            <div style="display: flex">
              <el-input
                v-model="config.pic.width"
                size="mini"
                placeholder="高度"
              ></el-input>
              <span style="margin: 0 10px">x</span>
              <el-input
                v-model="config.pic.height"
                size="mini"
                placeholder="宽度"
              ></el-input>
            </div>
          </el-form-item>
          <el-form-item label="自适应: ">
            <el-switch
              v-model="config.pic.selfAdaption"
              style="margin-right: 10px"
            ></el-switch>
          </el-form-item>
        </el-collapse-item>
      </el-collapse>
      <el-collapse>
      <el-collapse-item title="文本(标签)" name="tag" v-if="config.tagsStyle&&config.tagsStyle.colorArr">
          <el-form-item label="显示：">
            <el-switch
              style="margin-top: 7px;"
              v-model="config.tagsStyle.show"
            ></el-switch>
          </el-form-item>
          <div v-show="config.tagsStyle.show">
            <div class="fontStyle">
            <div class="block">
              <span
                class="bg"
                :class="config.tagsStyle.fontWeight=== 'bold'? 'active':''"
              ><span
                  :class="config.tagsStyle.fontWeight=== 'bold'? 'bold':'non-bold'"
                  @click="$emit('changeValue', 'tagsStyle','fontWeight', config.tagsStyle.fontWeight=== 'bold'? 'normal':'bold')"
                ></span></span>
              <span class="title">加粗</span>
            </div>
            <div class="block">
              <span
                class="bg"
                :class="config.tagsStyle.fontStyle === 'italic'? 'active':''"
              ><span
                  :class="config.tagsStyle.fontStyle === 'italic'? 'incline':'non-incline'"
                  @click="$emit('changeValue', 'tagsStyle','fontStyle', config.tagsStyle.fontStyle=== 'normal'? 'italic':'normal')"
                ></span></span>
              <span class="title">倾斜</span>
            </div>
            </div>
            <el-form-item label="字体大小：">
            <div class="flex align-center">
              <el-input
                v-model="config.tagsStyle.fontSize"
                size="mini"
                style="margin: 0 8px 0 0px"
              ></el-input
              >px
            </div>
          </el-form-item>
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
import ImageSelector from '../componments/ImageSelector';
export default {
  name: 'appraisingCard',
  components: {
    ImageSelector,
  },
  props: {
    config: {
      type: Object
    }
  },
  methods:{
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
  }
};
</script>

<style lang="scss" scoped>
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
    background-image: url('../../../../../../assets/image/jiesuo.png');
    cursor: pointer;

    &.active {
      background-image: url('../../../../../../assets/image/suoding.png');
    }
  }

  > span:nth-of-type(2) {
    width: 20px;
    height: 20px;
    background-size: 100% 100%;
    background-image: url('../../../../../../assets/image/yanjing_yincang.png');
    cursor: pointer;

    &.active {
      background-image: url('../../../../../../assets/image/yanjing_xianshi.png');
    }
  }
}
.fontStyle {
  display: flex;
  justify-content: center;
  color: #fff;
  font-size: 12px;

  .block {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 40px;
  }

  .bg {
    width: 24px;
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    &.active {
      background-color: rgba(255, 255, 255, 0.1);
    }

    &:hover {
      background-color: rgba(255, 255, 255, 0.1);

      .non-bold {
        background-image: url('../image/bold_hover.png');
      }
      .non-incline {
        background-image: url('../image/incline_hover.png');
      }
      .non-left {
        background-image: url('../image/left_hover.png');
      }
      .non-center {
        background-image: url('../image/center_hover.png');
      }
      .non-right {
        background-image: url('../image/right_hover.png');
      }
    }

    span {
      width: 18px;
      height: 18px;
      background-size: 100% 100%;

      &.non-bold {
        background-image: url('../image/bold.png');
      }
      &.bold {
        background-image: url('../image/bold_hover.png');
        background-color: rgba(255, 255, 255, 0.1);
      }
      &.non-incline {
        background-image: url('../image/incline.png');
      }
      &.incline {
        background-image: url('../image/incline_hover.png');
        background-color: rgba(255, 255, 255, 0.1);
      }
      &.left {
        background-image: url('../image/left_hover.png');
        background-color: rgba(255, 255, 255, 0.1);
      }
      &.non-left {
        background-image: url('../image/left.png');
      }
      &.center {
        background-image: url('../image/center_hover.png');
        background-color: rgba(255, 255, 255, 0.1);
      }
      &.non-center {
        background-image: url('../image/center.png');
      }
      &.right {
        background-image: url('../image/right_hover.png');
        background-color: rgba(255, 255, 255, 0.1);
      }
      &.non-right {
        background-image: url('../image/right.png');
      }
    }
  }

  span:nth-child(2) {
    width: 100%;
    text-align: center;
  }
}
.el-input-number--small {
  width: 110px;
}
.el-slider {
  width: 113px;
}
// .selectedPic {
//   display: flex;

//   > span {
//     color: #fff;
//     margin-right: 20px;
//   }
// }
// .selectedPic-select {
//   ul {
//     display: flex;
//     flex-wrap: wrap;

//     li {
//       width: 50px !important;
//       margin: 0 5px;
//     }

//     img {
//       width: 50px;
//       height: 50px;
//       border: 1px solid transparent;

//       &.active {
//         border: 1px solid #fff;
//       }
//     }
//   }
// }
</style>