<!--
 * @Descripttion: 说明
 * @version: V1.0
 * @Author: 卜倩倩
 * @Date: 2023-10-09 11:05:32
 * @LastEditors: 卜倩倩
 * @LastEditTime: 2023-11-20 11:36:00
-->
<template>
  <el-scrollbar class="right-setting scrollbar-wrapper">
    <el-form
      label-width="115px"
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
            @change="(val) => $emit('changeSize', 'name', val)"
          ></el-input>
          <span
            :class="config.isLock ? 'active': ''"
            @click="(val) => $emit('changeSize', 'isLock', !config.isLock)"
          ></span>
          <span
            :class="config.isShow? 'active': ''"
            @click="(val) => $emit('changeSize', 'isShow', !config.isShow)"
          ></span>
        </div>
      </el-form-item>
      <el-form-item label="默认展示隐藏：">
        <el-switch
          v-model="config.isShowModule"
          @change="(val) => $emit('changeSize', 'isShowModule', val)"
        ></el-switch>
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
      <el-form-item label="组件主色：">
        <el-color-picker
          v-model="config.box.mainColor"
          show-alpha
          size="mini"
        ></el-color-picker>
      </el-form-item>
      <!-- <el-form-item label="背景颜色：">
        <el-color-picker
          v-model="config.box.backgroundColor"
          show-alpha
          size="mini"
        ></el-color-picker>
      </el-form-item> -->
      <el-form-item label="弹窗背景色：">
        <el-color-picker
          v-model="config.box.modalBgc"
          show-alpha
          size="mini"
        ></el-color-picker>
      </el-form-item>
      <ImageSelector
        label="背景图片："
        @changeSrc="(val) => $emit('changeValue', 'box', 'backgroundPic', val)"
        worksheetId="tc_sjxqwzbzj"
        imageField="backgroundPic"
        :src="config.box.backgroundPic"
      ></ImageSelector>
      <ImageSelector
        label="弹窗头部图片："
        @changeSrc="(val) => $emit('changeValue', 'box', 'headPic', val)"
        worksheetId="tc_sjxqwzbzj"
        imageField="headPic"
        :src="config.box.headPic"
      ></ImageSelector>
      <el-form-item label="头部宽高：">
        <div style="display: flex">
          <el-input
            v-model="config.box.headWidth"
            size="mini"
          ></el-input>x
          <el-input
            v-model="config.box.headHeight"
            size="mini"
          ></el-input>
        </div>
      </el-form-item>
      <ImageSelector
        label="关闭按钮图片："
        @changeSrc="(val) => $emit('changeValue', 'box', 'closePic', val)"
        worksheetId="tc_sjxqwzbzj"
        imageField="closePic"
        :src="config.box.closePic"
      ></ImageSelector>
      <el-form-item label="关闭按钮宽高：">
        <div style="display: flex">
          <el-input
            v-model="config.box.closeIconWidth"
            size="mini"
          ></el-input>x
          <el-input
            v-model="config.box.closeIconHeight"
            size="mini"
          ></el-input>
        </div>
      </el-form-item>
      <el-form-item label="标题字体大小：">
        <el-input
          v-model="config.box.headFontSize"
          size="mini"
        ></el-input>
      </el-form-item>
      <ImageSelector
        label="页面小标题图片："
        @changeSrc="(val) => $emit('changeValue', 'box', 'subtitlePic', val)"
        worksheetId="tc_sjxqwzbzj"
        imageField="subtitlePic"
        :src="config.box.subtitlePic"
      ></ImageSelector>
      <el-form-item label="小标题宽高：">
        <div style="display: flex">
          <el-input
            v-model="config.box.subtitleWidth"
            size="mini"
          ></el-input>x
          <el-input
            v-model="config.box.subtitleHeight"
            size="mini"
          ></el-input>
        </div>
      </el-form-item>
      <el-form-item label="是否POI点弹窗:">
        <el-switch
          v-model="config.isRelationPoi"
          @change="(val) => $emit('changeSize', 'isRelationPoi', val)"
        ></el-switch>
      </el-form-item>
      <el-form-item label="关联图层表ID：">
        <el-input
          v-model="config.relationWorksheetId"
          size="mini"
          @blur="getLayer"
        ></el-input>
      </el-form-item>
      <el-form-item label="关联图层：">
        <el-select
          v-model="config.relationLayerId"
          @change="$emit('changeSize', 'relationLayerId', config.relationLayerId)"
          size="small"
          clearable
          multiple
        >
          <el-option
            v-for="(item) in config.layerList"
            :key="item.rowid"
            :label="item.name"
            :value="item.rowid"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="视频流地址：">
        <el-input
          v-model="config.box.svs_url"
          size="mini"
        ></el-input>
      </el-form-item>
      <el-collapse>
        <el-collapse-item
          title="展示字段"
          name="title"
        >
          <el-form-item label="第一列颜色：">
            <el-color-picker
              v-model="config.showField.first"
              show-alpha
              size="mini"
            ></el-color-picker>
          </el-form-item>
          <el-form-item label="第二列颜色：">
            <el-color-picker
              v-model="config.showField.second"
              show-alpha
              size="mini"
            ></el-color-picker>
          </el-form-item>
          <el-form-item label="字体大小：">
            <el-input
              v-model="config.showField.fontSize"
              size="mini"
            ></el-input>
          </el-form-item>
          <div style="color: #0CB8F2;font-size: 16px;display:flex;align-items:center;padding-left: 40px;margin-bottom: 10px">
            <span style="margin-right: 20px">字段配置</span>
            <i
              class="el-icon-circle-plus-outline"
              style="cursor: pointer"
              @click="addFiledKey"
            ></i>
          </div>
          <div
            v-for="(el,index) in config.fieldConfig"
            :key="index"
          >
            <el-collapse style="margin-bottom: 5px">
              <el-collapse-item>
                <template slot="title">
                  <div
                    class="custom-title"
                    style="padding-left: 40px;color: #C23737;font-size: 16px"
                    @click.stop
                  >
                    <span style="font-size: 14px">字段{{index + 1}}</span>
                    <i
                      class="el-icon-delete"
                      style="cursor: pointer;"
                      @click="delFieldConfig('fieldConfig', index)"
                    ></i>
                  </div>
                </template>
                <el-form-item label="字段别名：">
                  <el-select
                    v-model="el.byname"
                    size="small"
                    style="width: 100px"
                    clearable
                  >
                    <el-option
                      v-for="(item, index) in config.fields"
                      :key="index"
                      :label="item.controlName"
                      :value="item.alias"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="字段名：">
                  <el-input
                    v-model="el.name"
                    size="mini"
                  ></el-input>
                </el-form-item>
                <div style="padding-left: 40px">
                  <div style="display: flex;align-items:center; padding-left: 20px;margin-bottom: 20px;color: #00DBCC;">
                    <span>字段值颜色枚举</span>
                    <i
                      class="el-icon-circle-plus-outline"
                      style="font-size: 18px;margin-left: 20px;cursor: pointer"
                      @click="addFiledvalueColor(el, index)"
                    ></i>
                  </div>
                  <div
                    v-for="(e,ind) in el.valueSet"
                    :key="ind"
                    style="position: relative"
                  >
                    <i
                      class="el-icon-delete"
                      style="cursor: pointer;position:absolute;left: 0;top: 10px;font-size: 16px;color: #C23737"
                      @click="delValueSet('fieldConfig', index, ind)"
                    ></i>
                    <el-form-item label="字段值：">
                      <el-input
                        v-model="e.value"
                        size="mini"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="字体颜色：">
                      <el-color-picker
                        v-model="e.valueColor"
                        show-alpha
                        size="mini"
                      ></el-color-picker>
                    </el-form-item>
                    <el-form-item label="背景颜色：">
                      <el-color-picker
                        v-model="e.valueBackground"
                        show-alpha
                        size="mini"
                      ></el-color-picker>
                    </el-form-item>
                  </div>
                </div>
              </el-collapse-item>
            </el-collapse>
          </div>
        </el-collapse-item>
      </el-collapse>
      <el-collapse>
        <el-collapse-item>
          <template slot="title">
            <div
              class="custom-title"
              @click.stop
            >
              <span>历史事件</span>
            </div>
          </template>
          <el-form
            label-width="110px"
            size="small"
            class="border-box"
            style="padding: 8px 16px"
          >
            <el-form-item label="历史事件宽度：">
              <el-input
                v-model="config.history.width"
                size="mini"
                placeholder="请输入组件宽度"
              ></el-input>
            </el-form-item>
            <el-form-item label="历史事件高度：">
              <el-input
                v-model="config.history.height"
                size="mini"
                placeholder="请输入组件高度"
              ></el-input>
            </el-form-item>
            <el-form-item label="选中颜色：">
              <el-color-picker
                v-model="config.history.selectedColor"
                show-alpha
                size="mini"
              ></el-color-picker>
            </el-form-item>
            <div style="color: #0CB8F2;font-size: 16px;display:flex;align-items:center;padding-left: 40px;margin-bottom: 10px">
              <span style="margin-right: 20px">文本颜色枚举</span>
              <i
                class="el-icon-circle-plus-outline"
                style="cursor: pointer"
                @click="addHistoryFiledKey"
              ></i>
            </div>
            <div
              v-for="(el,index) in config.historyFieldConfig"
              :key="index"
            >
              <el-collapse style="margin-bottom: 5px">
                <el-collapse-item>
                  <template slot="title">
                    <div
                      class="custom-title"
                      style="padding-left: 40px;color: #C23737;font-size: 16px"
                      @click.stop
                    >
                      <span style="font-size: 14px">选项{{index + 1}}</span>
                      <i
                        class="el-icon-delete"
                        style="cursor: pointer;"
                        @click="delFieldConfig('historyFieldConfig', index)"
                      ></i>
                    </div>
                  </template>
                  <el-form-item label="字段别名：">
                    <el-select
                      v-model="el.byname"
                      size="small"
                      style="width: 100px"
                      clearable
                    >
                      <el-option
                        v-for="(item, index) in config.fields"
                        :key="index"
                        :label="item.controlName"
                        :value="item.alias"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <div style="padding-left: 40px">
                    <div style="display: flex;align-items:center; padding-left: 20px;margin-bottom: 20px;color: #00DBCC;">
                      <span>字段值颜色枚举</span>
                      <i
                        class="el-icon-circle-plus-outline"
                        style="font-size: 18px;margin-left: 20px;cursor: pointer"
                        @click="addHistoryFiledvalueColor(el, index)"
                      ></i>
                    </div>
                    <div
                      v-for="(e,ind) in el.valueSet"
                      :key="ind"
                      style="position: relative"
                    >
                      <i
                        class="el-icon-delete"
                        style="cursor: pointer;position:absolute;left: 0;top: 10px;font-size: 16px;color: #C23737"
                        @click="delValueSet('historyFieldConfig', index, ind)"
                      ></i>
                      <el-form-item label="选项：">
                        <el-input
                          v-model="e.value"
                          size="mini"
                        ></el-input>
                      </el-form-item>
                      <el-form-item label="字体颜色：">
                        <el-color-picker
                          v-model="e.valueColor"
                          show-alpha
                          size="mini"
                        ></el-color-picker>
                      </el-form-item>
                    </div>
                  </div>
                </el-collapse-item>
              </el-collapse>
            </div>
          </el-form>
        </el-collapse-item>
      </el-collapse>
      <el-collapse>
        <el-collapse-item>
          <template slot="title">
            <div
              class="custom-title"
              @click.stop
            >
              <span>进度记录</span>
            </div>
          </template>
          <el-form-item label="高度：">
            <el-input
              v-model="config.progressRecord.height"
              size="mini"
            ></el-input>
          </el-form-item>
          <div style="color: #0CB8F2;font-size: 16px;display:flex;align-items:center;padding-left: 40px;margin-bottom: 10px">
            <span style="margin-right: 20px">操作文本颜色枚举</span>
            <i
              class="el-icon-circle-plus-outline"
              style="cursor: pointer"
              @click="addStepFiledKey"
            ></i>
          </div>
          <div
            v-for="(el,index) in config.stepFieldConfig"
            :key="index"
          >
            <el-collapse style="margin-bottom: 5px">
              <el-collapse-item>
                <template slot="title">
                  <div
                    class="custom-title"
                    style="padding-left: 40px;color: #C23737;font-size: 16px"
                    @click.stop
                  >
                    <span style="font-size: 14px">选项{{index + 1}}</span>
                    <i
                      class="el-icon-delete"
                      style="cursor: pointer;"
                      @click="delFieldConfig('stepFieldConfig', index)"
                    ></i>
                  </div>
                </template>
                <div style="padding-left: 40px">
                  <el-form-item label="选项：">
                    <el-input
                      v-model="el.value"
                      size="mini"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="字体颜色：">
                    <el-color-picker
                      v-model="el.valueColor"
                      show-alpha
                      size="mini"
                    ></el-color-picker>
                  </el-form-item>
                </div>
                <!-- </div> -->
              </el-collapse-item>
            </el-collapse>
          </div>
        </el-collapse-item>
      </el-collapse>
      <el-collapse>
        <el-collapse-item>
          <template slot="title">
            <div
              class="custom-title"
              @click.stop
            >
              <span>事件操作按钮</span>
              <i
                class="el-icon-circle-plus-outline"
                style="font-size: 18px"
                @click="addBtn"
              ></i>
            </div>
          </template>
          <el-form
            label-width="110px"
            size="small"
            class="border-box"
            style="padding: 8px 16px"
          >
            <el-select
              v-model="config.box.currentBtn"
              placeholder="请选择"
              style="width: 100%;margin-bottom: 20px"
              size="mini"
              @change="selectChange"
              clearable
            >
              <el-option
                v-for="item,index in config.buttons"
                :key="item.id"
                :label="item.title"
                :value="item.id"
              >
                <div class="outer-select">
                  <span>{{item.title}}</span>
                  <i
                    class="el-icon-circle-close"
                    @click.stop="delLevel1Tab(index)"
                  ></i>
                </div>
              </el-option>
            </el-select>
            <el-form-item label="标题：">
              <el-input
                v-model="title"
                @input="valueChange('title')"
              ></el-input>
            </el-form-item>
            <el-form-item label="按钮填充颜色：">
              <el-color-picker
                v-model="fillColor"
                show-alpha
                size="mini"
                @change="valueChange('fillColor')"
              ></el-color-picker>
            </el-form-item>
            <el-form-item label="按钮边框颜色：">
              <el-color-picker
                v-model="borderColor"
                show-alpha
                size="mini"
                @change="valueChange('borderColor')"
              ></el-color-picker>
            </el-form-item>
            <el-form-item label="按钮文本颜色：">
              <el-color-picker
                v-model="textColor"
                show-alpha
                size="mini"
                @change="valueChange('textColor')"
              ></el-color-picker>
            </el-form-item>
            <el-form-item label="操作效果：">
              <el-select
                v-model="currentEffect"
                @change="valueChange('currentEffect')"
                size="small"
                clearable
              >
                <el-option
                  v-for="(item) in options"
                  :key="item.key"
                  :label="item.value"
                  :value="item.value"
                ></el-option>
                <el-option
                  label="处置完成"
                  value="处置完成"
                ></el-option>
              </el-select>
            </el-form-item>
            <!-- <el-form-item label="弹窗背景色：">
              <el-color-picker
                v-model="textColor"
                show-alpha
                size="mini"
                @change="valueChange('textColor')"
              ></el-color-picker>
            </el-form-item> -->
            <!-- <el-form-item label="传参：">
              <el-input
                v-model="param"
                @input="valueChange('param')"
              ></el-input>
            </el-form-item>
            <div style="display: flex; align-items: center">
              <span style="width: 40px;color:#fff">隐藏</span>
              <el-select
                v-model="hidekey"
                size="small"
                style="width: 100px"
                @change="valueChange('hidekey')"
                clearable
              >
                <el-option
                  v-for="(item, index) in config.fields"
                  :key="index"
                  :label="item.controlName"
                  :value="item.alias"
                ></el-option>
              </el-select>
              <span style="width: 40px;margin-left: 10px;color:#fff">等于</span>
              <el-input
                size="small"
                @input="valueChange('hidevalue')"
                v-model="hidevalue"
                style="width: 80px"
              ></el-input>
            </div> -->
          </el-form>
        </el-collapse-item>
      </el-collapse>
      <el-collapse>
        <el-collapse-item>
          <template slot="title">
            <div
              class="custom-title"
              @click.stop
            >
              <span>按钮弹窗</span>
            </div>
          </template>
          <el-form-item label="弹窗背景颜色：">
            <el-color-picker
              v-model="config.box.btnModalBgc"
              show-alpha
              size="mini"
            ></el-color-picker>
          </el-form-item>
          <el-form-item label="下拉框背景颜色：">
            <el-color-picker
              v-model="config.box.selectBgc"
              show-alpha
              size="mini"
            ></el-color-picker>
          </el-form-item>

        </el-collapse-item>
      </el-collapse>
    </el-form>
  </el-scrollbar>
</template>

<script>
import ImageSelector from '../componments/ImageSelector';
import { getFilterRows, getRowDetail, getv2WorksheetInfo } from '@/utils/api';
import { appKey, sign } from '@/utils/const.js';
export default {
  name: 'eventDetail',
  components: {
    ImageSelector
  },
  data() {
    return {
      currentEffect: '',
      title: '',
      fillColor: '',
      textColor: '',
      borderColor: '',
      param: '',
      hidekey: '',
      hidevalue: '',
      id: '',
      options: []
    };
  },
  props: {
    config: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  mounted() {
    this.getFieldKeys(); //获取字段列表
    this.config.box.currentBtn && this.selectChange();
  },
  methods: {
    addFiledKey() {
      this.config.fieldConfig.push({
        name: '',
        byname: '',
        value: '',
        valueSet: []
      });
    },
    addHistoryFiledKey() {
      this.config.historyFieldConfig.push({
        name: '',
        valueSet: []
      });
    },
    addStepFiledKey() {
      this.config.stepFieldConfig.push({
        value: '',
        valueColor: ''
      });
    },
    addFiledvalueColor(el, index) {
      this.config.fieldConfig[index].valueSet.push({
        value: '',
        valueColor: '',
        valueBackground: ''
      });
    },
    addHistoryFiledvalueColor(el, index) {
      this.config.historyFieldConfig[index].valueSet.push({
        value: '',
        valueColor: ''
      });
    },
    delFieldConfig(key, index) {
      this.config[key].splice(index, 1);
    },
    delValueSet(key, index, ind) {
      this.config[key][index].valueSet.splice(ind, 1);
    },
    async getFieldKeys() {
      const res = await getv2WorksheetInfo({
        appKey: appKey,
        sign: sign,
        worksheetId: 'alarm_event'
      });
      this.options = res.data.controls.filter(
        (item) => item.controlName === '审核结果'
      )[0].options;
      this.config.fields = res.data.controls;
    },
    addBtn() {
      this.config.buttons.push({
        id: new Date().getTime(),
        title: '新增',
        effect: '',
        fillColor: '',
        borderColor: '',
        textColor: '',
        param: '',
        hidekey: '',
        hidevalue: ''
      });
    },
    selectChange() {
      let index = this.config.buttons.findIndex(
        (item) => item.id === this.config.box.currentBtn
      );
      this.title = this.config.buttons[index].title;
      this.fillColor = this.config.buttons[index].fillColor;
      this.borderColor = this.config.buttons[index].borderColor;
      this.textColor = this.config.buttons[index].textColor;
      this.currentEffect = this.config.buttons[index].currentEffect;
      this.param = this.config.buttons[index].param;
      this.hidekey = this.config.buttons[index].hidekey;
      this.hidevalue = this.config.buttons[index].hidevalue;
    },
    valueChange(data) {
      let index = this.config.buttons.findIndex(
        (item) => item.id === this.config.box.currentBtn
      );
      this.config.buttons[index][data] = this[data];
    },
    async getLayer() {
      this.$emit(
        'changeSize',
        'relationWorksheetId',
        this.config.relationWorksheetId
      );

      let { data } = await getFilterRows({
        appKey: appKey,
        sign: sign,
        worksheetId: this.config.relationWorksheetId,
        pageSize: 500,
        pageIndex: 1
      });
      this.$emit('changeSize', 'layerList', data.rows);
    },
    delLevel1Tab(index) {
      this.config.buttons.splice(index, 1);
    }
  }
};
</script>

<style lang="scss" scoped>
.img-bock {
  display: inline-block;
  font-size: 0;
  margin-right: 10px;
  position: relative;
  height: 50px;

  > div {
    height: 0;
  }

  &:nth-child(3n) {
    margin-right: 0;
  }

  img {
    width: 50px;
    height: 50px;
  }

  i {
    color: red;
    width: 20px;
    height: 20px;
    z-index: 1;
    font-size: 16px;
  }

  .el-icon-delete {
    position: absolute;
    right: 0;
    top: 5px;
    cursor: pointer;
  }

  .icon-delete {
    position: absolute;
    right: 3px;
    top: 0px;
  }
}

.el-form-item {
  .el-icon-plus.avatar-uploader-icon {
    color: #fff;
    font-size: 50px;
  }

  .el-form-item__content {
    flex-wrap: wrap;
  }
}
</style>