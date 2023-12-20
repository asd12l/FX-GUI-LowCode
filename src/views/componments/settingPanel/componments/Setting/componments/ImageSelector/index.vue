<template>
  <div class="imageSelector">
    <el-form-item :label="label">
      <div
        class="img-item pointer"
        @click="openDialogVisible"
      >
        <img
          :src="imageSrc"
          alt=""
        />
      </div>
    </el-form-item>
    <el-form-item
      v-show="showFilter"
      label="开启滤镜："
    >
      <el-switch
        v-model="isOpenFilter"
        @change="(val) => $emit('changeOpenFilter', val)"
      ></el-switch>
    </el-form-item>
    <div v-show="isOpenFilter">
      <el-form-item label="色相：">
        <div class="selector-item">
          <el-slider
            v-model="imgFilterObj.hueRotate"
            :step="3"
            :min="0"
            :max="360"
            :format-tooltip="degFormatTooltip"
          ></el-slider>
          <div class="item-value">值：{{ `${imgFilterObj.hueRotate}deg` }}</div>
        </div>
      </el-form-item>
      <el-form-item label="饱和度：">
        <div class="selector-item">
          <el-slider
            v-model="imgFilterObj.saturate"
            :step="0.1"
            :min="0"
            :max="2"
            :format-tooltip="sliderFormatTooltip"
          ></el-slider>
          <div class="item-value">
            值：{{ `${(parseFloat(imgFilterObj.saturate) * 100).toFixed(0)}%` }}
          </div>
        </div>
      </el-form-item>
      <el-form-item label="对比度：">
        <div class="selector-item">
          <el-slider
            v-model="imgFilterObj.contrast"
            :step="0.1"
            :min="0"
            :max="2"
            :format-tooltip="sliderFormatTooltip"
          ></el-slider>
          <div class="item-value">
            值：{{ `${(parseFloat(imgFilterObj.contrast) * 100).toFixed(0)}%` }}
          </div>
        </div>
      </el-form-item>
      <el-form-item label="亮度：">
        <div class="selector-item">
          <el-slider
            v-model="imgFilterObj.brightness"
            :step="0.1"
            :min="0"
            :max="2"
            :format-tooltip="sliderFormatTooltip"
          ></el-slider>
          <div class="item-value">
            值：{{
              `${(parseFloat(imgFilterObj.brightness) * 100).toFixed(0)}%`
            }}
          </div>
        </div>
      </el-form-item>
      <el-form-item label="透明度：">
        <div class="selector-item">
          <el-slider
            v-model="imgFilterObj.opacity"
            :step="0.1"
            :min="0"
            :max="1"
            :format-tooltip="sliderFormatTooltip"
          ></el-slider>
          <div class="item-value">
            值：{{ `${(parseFloat(imgFilterObj.opacity) * 100).toFixed(0)}%` }}
          </div>
        </div>
      </el-form-item>
    </div>
    <el-dialog
      :modal="false"
      :visible.sync="dialogVisible"
      width="30%"
      custom-class="image-selector"
    >
      <div
        slot="title"
        class="dialog-title"
      >
        <span>图片</span>
        <el-switch
          v-model="isStaticPic"
          active-text="静态资源图片"
          inactive-text="接口地址图片"
        >
        </el-switch>
      </div>
      <el-tabs
        v-model="activeName"
        v-if="!isStaticPic"
      >
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
            :class="{ active: img.src === imageSrc }"
            v-for="img in tabImagesList"
            :key="img"
          >
            <img
              :src="img"
              alt=""
            />
          </div>
        </el-tab-pane>
      </el-tabs>
      <el-tabs
        v-model="activeName"
        v-if="isStaticPic"
        @tab-click="imageList = []"
      >
        <el-tab-pane
          :label="item.title"
          :name="item.key"
          v-for="item in list"
          :key="item.key"
        >
          <el-tabs
            v-model="subActiveName"
            @tab-click="handleClick"
          >
            <el-tab-pane
              :label="el.title"
              :name="el.key"
              v-for="el in item.children"
              :key="el.key"
              class="tab-image"
            >
              <div
                v-if="!imageList.length"
                class="empty-content"
              >暂无图片</div>
              <div
                v-else
                class="image-wrap"
                @click="changeImageSrc(img)"
                :class="{ active: img.src === imageSrc }"
                v-for="img in imageList"
                :key="img"
              >
                <img
                  :src="img"
                  alt=""
                />
              </div>
            </el-tab-pane>
          </el-tabs>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>

<script>
import { getFilterRows } from '@/utils/api';
import { appKey, sign } from '@/utils/const.js';
import list from '@/assets/component/list.js';
import imageIndex from '@/assets/component/imageIndex.js';
// opacity: opacity,
//  filter: `saturate(${saturate}) contrast(${contrast}) hue-rotate(${hueRotate}deg) brightness(${brightness})`
export default {
  name: 'imageSelector',
  data() {
    return {
      opacity: 1,
      brightness: 1,
      contrast: 1,
      saturate: 1,
      hueRotate: 0,
      dialogVisible: false,
      activeName: 'echarts',
      subActiveName: 'lineChart',
      isStaticPic: true,
      tabsList: [],
      imageList: [],
      imgFilterObj: {},
      list: [],
      imgList: []
    };
  },
  computed: {
    tabImagesList() {
      let d = this.imageList.find((item) => item.name === this.activeName);
      let src = d ? d.src : [];
      return src;
    },
    imageSrc() {
      console.log(':this.src::::::::::', this.src);
      return this.src;
    },
    isOpenFilter: {
      get() {
        return this.openFilter;
      },
      set() {}
    }
    // imgFilterObj: {
    //   get() {
    //     console.log("this.filterObj::::::::::", this.filterObj);
    //     return this.filterObj;
    //   },
    //   set(val) {
    //     console.log("val::::::::::11", val);
    //   },
    // },
  },
  methods: {
    handleClick(tab) {
      console.log(tab.name, imageIndex);
      this.imageList = [];
      if (imageIndex.filter((item) => item.name === tab.name).length) {
        this.imageList = imageIndex.filter(
          (item) => item.name === tab.name
        )[0].pics;
      }
    },
    changeImageSrc(img) {
      //   this.imageSrc = img.src;
      this.$emit('changefilterObj', {
        hueRotate: 0, // 色相
        saturate: 1, // 饱和度
        contrast: 1, // 对比度
        brightness: 1, // 亮度
        opacity: 1 // 透明度
      });
      console.log('img:::::::::::', img);
      this.$emit('changeSrc', img);
      this.dialogVisible = false;
    },
    degFormatTooltip(val) {
      return `${val}deg`;
    },
    // 百分比格式化 person
    sliderFormatTooltip(val) {
      return `${(parseFloat(val) * 100).toFixed(0)}%`;
    },
    async openDialogVisible() {
      this.dialogVisible = true;
      if (!this.isStaticPic) {
        const data = {
          appKey: appKey,
          sign: sign,
          worksheetId: this.worksheetId,
          rowId: sessionStorage.getItem('rowid'),
          pageIndex: 1,
          pageSize: 100
        };
        const {
          data: { rows }
        } = await getFilterRows(data);
        const enableImageList = rows.filter((item) => item.sfqy === '启用');
        this.tabsList = enableImageList.map((item) => item.mingcheng);

        this.imageList = enableImageList
          .map((item) => {
            if (item[this.imageField]) {
              return {
                name: item.mingcheng,
                src: JSON.parse(item[this.imageField]).map(
                  (ele) => ele.DownloadUrl
                )
              };
            }
            return '';
          })
          .filter((item) => item);
        this.activeName = this.tabsList[0];
      }
    }
  },
  props: {
    // 过滤属性配置
    filterObj: {
      type: Object,
      default: () => {
        return {
          hueRotate: 0, // 色相
          saturate: 1, // 饱和度
          contrast: 1, // 对比度
          brightness: 1, // 亮度
          opacity: 1 // 透明度
        };
      }
    },
    label: {
      type: String,
      default: ''
    },
    // 表名
    worksheetId: {
      type: String,
      default: ''
    },
    // 取表里的那个字段
    imageField: {
      type: String,
      default: ''
    },
    // 预览图片展示的地址
    src: {
      type: String,
      default: ''
    },
    // 是否开启过滤
    openFilter: {
      type: Boolean,
      default: false
    },
    showFilter: {
      type: Boolean,
      default: false
    },
    changeOpenFilter: {
      type: Function,
      default: () => {}
    },
    changeSrc: {
      type: Function,
      default: () => {}
    },
    changefilterObj: {
      type: Function,
      default: () => {}
    }
  },
  mounted() {
    this.imgFilterObj = this.filterObj;
    this.list = list;
    console.log('list====');
    console.log(list, 'list============');
  },
  updated(nval, oval) {
    console.log('nval:::::::::::::::', this.filterObj);
  },
  watch: {
    imgFilterObj: {
      handler(newVal) {
        this.$emit('changefilterObj', newVal);
      },
      deep: true
      //   immediate: true,
    }
  }
};
</script>

<style lang="scss">
.image-selector {
  .tab-image {
    display: flex;
    flex-wrap: wrap;
  }

  .dialog-title {
    display: flex;
    align-items: center;

    > span {
      font-size: 16px;
      margin-right: 20px;
    }
  }

  .el-tabs__content {
    height: calc(100% - 55px);

    .el-tab-pane {
      width: 100%;
      height: 100%;

      .empty-content {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }

  .el-tabs {
    width: 100%;
    height: 100%;
  }

  .el-dialog__body {
    height: 500px;
  }

  .image-wrap {
    width: 95px;
    height: 95px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 10px;

    &:hover,
    &.active {
      border: 1px solid #1b5cff;
    }

    img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
    }
  }

  .el-tabs__item {
    color: #303133 !important;
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
    background-color: rgba(255, 255, 255, 0.05);

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
