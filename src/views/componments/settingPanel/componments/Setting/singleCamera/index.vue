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
      <el-form-item
        label="默认展示隐藏："
        label-width="110px"
      >
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
      <el-form-item label="背景颜色：">
        <el-color-picker
          v-model="config.box.backgroundColor"
          show-alpha
          size="mini"
        ></el-color-picker>
      </el-form-item>
      <el-form-item label="弹窗背景色：">
        <el-color-picker
          v-model="config.box.modalBgc"
          show-alpha
          size="mini"
        ></el-color-picker>
      </el-form-item>
      <!-- <el-form-item label="弹窗头部图片：">
        <el-select v-model="config.box.headPic">
          <el-option
            v-for="item,index in headPicList"
            :key="index"
            :label="`图片${index + 1}`"
            :value="item.DownloadUrl"
          >
            <img
              :src="item.DownloadUrl"
              alt=""
              style="max-width: 100px;max-height: 100px"
            >
          </el-option>
        </el-select>
      </el-form-item> -->
      <ImageSelector
        label="弹窗头部图片："
        @changeSrc="(val) => $emit('changeValue', 'box', 'headPic', val)"
        worksheetId="jkzj"
        imageField="headPic"
        :src="config.box.headPic"
      ></ImageSelector>
      <!-- <el-form-item label="关闭按钮图片：">
        <el-select v-model="config.box.closePic">
          <el-option
            v-for="item,index in closePicList"
            :key="index"
            :label="`图片${index + 1}`"
            :value="item.DownloadUrl"
          >
            <img
              :src="item.DownloadUrl"
              alt=""
              style="max-width: 100px;max-height: 100px"
            >
          </el-option>
        </el-select>
      </el-form-item> -->
      <ImageSelector
        label="关闭按钮图片："
        @changeSrc="(val) => $emit('changeValue', 'box', 'closePic', val)"
        worksheetId="jkzj"
        imageField="closePic"
        :src="config.box.closePic"
      ></ImageSelector>
      <!-- <el-form-item label="暂无画面图片：">
        <el-select v-model="config.box.emptyPic">
          <el-option
            v-for="item,index in emptyPicList"
            :key="index"
            :label="`图片${index + 1}`"
            :value="item.DownloadUrl"
          >
            <img
              :src="item.DownloadUrl"
              alt=""
              style="max-width: 100px;max-height: 100px"
            >
          </el-option>
        </el-select>
      </el-form-item> -->
      <ImageSelector
        label="暂无画面图片："
        @changeSrc="(val) => $emit('changeValue', 'box', 'emptyPic', val)"
        worksheetId="jkzj"
        imageField="emptyPic"
        :src="config.box.emptyPic"
      ></ImageSelector>
      <el-form-item label="标题字体大小：">
        <el-input
          v-model="config.box.headFontSize"
          size="mini"
        ></el-input>
      </el-form-item>
      <el-form-item label="是否POI点弹窗:">
        <el-switch
          v-model="config.isRelationPoi"
          @change="(val) => $emit('changeSize', 'isRelationPoi', val)"
        ></el-switch>
      </el-form-item>
      <el-form-item label="关联图层表ID：">
        <el-input
          v-model="relationWorksheetId"
          size="mini"
          @blur="getLayer"
        ></el-input>
      </el-form-item>
      <el-form-item label="关联图层：">
        <el-select
          v-model="relationLayerId"
          @change="$emit('changeSize', 'relationLayerId', relationLayerId)"
          size="small"
          multiple=""
        >
          <el-option
            v-for="(item) in layerList"
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
          title="控制按钮图片"
          name="title"
        >
          <el-form-item label="按钮宽度：">
            <el-input
              v-model="config.controlBtn.width"
              size="mini"
              placeholder="请输入按钮宽度"
            ></el-input>
          </el-form-item>
          <el-form-item label="按钮高度：">
            <el-input
              v-model="config.controlBtn.height"
              size="mini"
              placeholder="请输入按钮高度"
            ></el-input>
          </el-form-item>
          <el-select
            v-model="picType"
            style="width: 100%;margin-bottom: 20px"
          >
            <el-option
              label="默认图片"
              value="默认图片"
            >
            </el-option>
            <el-option
              label="选中图片"
              value="选中图片"
            >
            </el-option>
          </el-select>
          <div v-show="picType === '默认图片'">
            <ImageSelector
              label="上："
              @changeSrc="(val) => $emit('changeValue', 'controlBtn', 'upwardPic', val)"
              worksheetId="jkzj"
              imageField="upwardPic"
              :src="config.controlBtn.upwardPic"
            ></ImageSelector>
            <ImageSelector
              label="放大："
              @changeSrc="(val) => $emit('changeValue', 'controlBtn', 'enlargePic', val)"
              worksheetId="jkzj"
              imageField="enlarge"
              :src="config.controlBtn.enlargePic"
            ></ImageSelector>
            <ImageSelector
              label="缩小："
              @changeSrc="(val) => $emit('changeValue', 'controlBtn', 'shrinkPic', val)"
              worksheetId="jkzj"
              imageField="shrink"
              :src="config.controlBtn.shrinkPic"
            ></ImageSelector>
          </div>
          <div v-show="picType === '选中图片'">
            <ImageSelector
              label="上："
              @changeSrc="(val) => $emit('changeValue', 'controlBtn', 'upwardPic_hover', val)"
              worksheetId="jkzj"
              imageField="upwardSPic"
              :src="config.controlBtn.upwardPic_hover"
            ></ImageSelector>
            <ImageSelector
              label="放大："
              @changeSrc="(val) => $emit('changeValue', 'controlBtn', 'enlargePic_hover', val)"
              worksheetId="jkzj"
              imageField="enlargeSelect"
              :src="config.controlBtn.enlargePic_hover"
            ></ImageSelector>
            <ImageSelector
              label="缩小："
              @changeSrc="(val) => $emit('changeValue', 'controlBtn', 'shrinkPic_hover', val)"
              worksheetId="jkzj"
              imageField="shrinkSelect"
              :src="config.controlBtn.shrinkPic_hover"
            ></ImageSelector>
          </div>
        </el-collapse-item>
      </el-collapse>

    </el-form>

    <el-form
      label-width="130px"
      size="small"
      class="border-box"
      style="padding: 8px 16px"
    >
      <el-collapse>
        <el-collapse-item
          title="控制按钮图片"
          name="title"
        >
          <template slot="title">
            <span style="margin-right: 10px">掉线记录</span>
            <el-switch v-model="config.offline_record.isShow">
            </el-switch>
          </template>
          <ImageSelector
            label="tab选项卡图片："
            @changeSrc="(val) => $emit('changeValue', 'offline_record', 'pic', val)"
            worksheetId="jkzj"
            imageField="tabPic"
            :src="config.offline_record.pic"
          ></ImageSelector>
          <el-form-item label="标题行字体大小：">
            <el-input
              v-model="config.offline_record.headFont"
              size="mini"
            ></el-input>
          </el-form-item>
          <el-form-item label="数据行字体大小：">
            <el-input
              v-model="config.offline_record.dataFont"
              size="mini"
            ></el-input>
          </el-form-item>
          <el-form-item label="标题与第二列文字颜色：">
            <el-color-picker
              v-model="config.offline_record.color"
              show-alpha
              size="mini"
            ></el-color-picker>
          </el-form-item>
          <el-form-item label="奇偶行交错颜色：">
            <el-color-picker
              v-model="config.offline_record.lineColor"
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
import { getFilterRows } from '@/utils/api';
import { appKey, sign } from '@/utils/const.js';
export default {
  name: 'SingleCamera',
  props: {
    config: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  components: {
    ImageSelector
  },
  data() {
    return {
      relationWorksheetId: '',
      relationLayerId: '',
      layerList: [],
      picType: '默认图片'
    };
  },
  watch: {
    config: {
      handler() {
        this.layerList = this.config.layerList;
        this.relationWorksheetId = this.config.relationWorksheetId;
        this.relationLayerId = this.config.relationLayerId;
      },
      immediate: true,
      deep: true
    }
  },
  mounted() {},
  methods: {
    async getLayer() {
      this.$emit('changeSize', 'relationWorksheetId', this.relationWorksheetId);

      let { data } = await getFilterRows({
        appKey: appKey,
        sign: sign,
        worksheetId: this.relationWorksheetId,
        pageSize: 500,
        pageIndex: 1
      });
      this.layerList = data.rows;
      this.$emit('changeSize', 'layerList', this.layerList);
    }
  }
};
</script>
