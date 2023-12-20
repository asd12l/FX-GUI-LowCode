<!--
 * @Descripttion: 说明
 * @version: V1.0
 * @Author: 卜倩倩
 * @Date: 2023-10-13 09:55:57
 * @LastEditors: 卜倩倩
 * @LastEditTime: 2023-11-21 14:08:13
-->
<template>
  <transition
    name="el-fade-in"
    v-show="isShowModuleFunc(config)"
  >
    <div
      class="singleCamera-wrapper"
      v-show="isShowModuleFunc(config)"
      :style="{
        width: config.width + 'px',
        height: config.height + 'px',
        background: config.box.backgroundColor,
        ...scssStyle
        }"
    >
      <div
        class="head"
        :style="{
      backgroundImage: 'url('+ config.box.headPic +')'
    }"
      >
        <span :style="{
          fontSize: config.box.headFontSize + 'px',
        }">{{camera && camera.device_name}}</span>
        <span
          class="close-icon"
          @click="closeModal"
          :style="{
          width: config.box.closeIconWidth + 'px',
          height: config.box.closeIconHeight + 'px',
          backgroundImage: 'url(' + config.box.closePic + ')',
        }"
        ></span>
        <div
          class="tabs"
          v-if="config.offline_record.isShow"
          :style="{
          fontSize: config.offline_record.headFont + 'px'
        }"
        >
          <span
            :class="activeTab === 1? 'active':''"
            @click="activeTab = 1"
          >视频播放</span>
          <span
            :class="activeTab === 2? 'active':''"
            @click="activeTab = 2"
          >掉线记录</span>
        </div>
      </div>
      <div class="singleCamera-content">
        <Camera
          ref="camera"
          v-if="config.isShowModule"
          v-show="(activeTab === 1 && config.offline_record.isShow) || !config.offline_record.isShow"
          @changeHeight="changeHeight"
          :config="config"
          :camera_data="camera"
        ></Camera>
        <div
          class="offline-record"
          v-show="activeTab === 2"
        >
          <div :style="{
          fontSize: config.offline_record.headFont + 'px',
          color: config.offline_record.color,
          marginBottom: '15px'
        }">历史掉线记录：</div>
          <div
            class="data-line"
            v-for="item in offlineRecords"
            :key="item"
            :style="{
          fontSize: config.offline_record.dataFont + 'px'
        }"
          >
            <span>{{item.riqi}}</span>
            <span :style="{
            color: config.offline_record.color
          }">掉线</span>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import 'element-ui/lib/theme-chalk/base.css';
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';
import Camera from './camera.vue';
import { getRowDetail, getFilterRows } from '@/utils/api';
import { appKey, sign } from '@/utils/const.js';
export default {
  name: 'SingleCamera',
  components: {
    Camera,
    CollapseTransition
  },
  props: {
    config: {
      type: Object
    }
  },
  data() {
    return {
      activeTab: 1,
      camera: {},
      offlineRecords: []
    };
  },
  computed: {
    scssStyle() {
      return {
        '--borderColor': '2px solid ' + this.config.box.backgroundColor,
        '--lineColor': this.config.offline_record.lineColor,
        '--activeTab': 'url(' + this.config.offline_record.pic + ')'
      };
    }
  },
  watch: {
    'config.isShowModule': {
      handler(nval, oval) {
        if (nval) {
          this.$setModal(this.config.box.modalBgc);
        } else {
          this.$removeModal();
          this.camera = {};
        }
      }
    }
  },
  mounted() {
    this.boxHeight = this.config.height;
    // this.updateComponentData({ rowid: 'c3027c13-e55f-4e3c-be0d-bebff5dd3169' });
  },
  // watch: {
  //   'config.height'(newValue) {
  //     console.log(newVal);
  //   }
  // },
  methods: {
    closeModal() {
      this.config.isShowModule = false;
      this.$refs.camera.closeModal();
    },
    changeHeight(param) {
      if (param === 1) {
        this.config.height = this.config.height - 114;
      } else {
        this.config.height = this.config.height + 114;
      }
    },
    async updateComponentData({ rowid }) {
      try {
        this.id = rowid;
        // this.config.isShowModule = true;
        const data = {
          appKey: appKey,
          sign: sign,
          worksheetId: 'camera',
          rowId: rowid
        };
        const result = await getRowDetail(data);
        this.camera = result.data;
        if (!result.success) {
          this.camera = null;
        }
      } catch (error) {
        this.camera = null;
      }

      this.getDeviceOfflineRecord(rowid);
    },
    async getDeviceOfflineRecord(rowid) {
      try {
        const data = {
          appKey: appKey,
          sign: sign,
          worksheetId: 'dropRecord',
          rowId: rowid,
          filters: [
            {
              controlId: 'camera_list',
              dataType: 29,
              spliceType: 1,
              filterType: 24,
              dynamicSource: [],
              values: [
                rowid //监控rowid
              ]
            }
          ]
        };
        const result = await getFilterRows(data);
        this.offlineRecords = result.data.rows;
      } catch (error) {}
    }
  }
};
</script>

<style lang="scss" scoped>
.singleCamera-wrapper {
  pointer-events: all;
  border: var(--backgroundColor);
  box-sizing: border-box;
  box-shadow: 0px 0px 14px 0px rgba(100, 190, 255, 0.4),
    inset 0px 0px 50px 0px rgba(48, 141, 255, 0.5);
  z-index: 100;

  .head {
    width: 100%;
    height: 44px;
    line-height: 44px;
    position: relative;
    padding-left: 20px;
    font-size: 20px;
    font-family: YouSheBiaoTiHei;
    font-weight: normal;
    color: #fff;
    position: relative;
    background-size: 100% 100%;
    background-repeat: no-repeat;

    .close-icon {
      display: inline-block;
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
      background-size: 100% 100%;
      cursor: pointer;
    }

    .tabs {
      display: flex;
      width: 168px;
      height: 32px;
      line-height: 32px;
      background-color: rgba(255, 255, 255, 0.1);
      position: absolute;
      right: 50px;
      top: 8px;
      border-radius: 4px;
      overflow: hidden;

      > span {
        width: 84px;
        text-align: center;
        font-family: MicrosoftYaHei;
        font-size: 16px;
        cursor: pointer;

        &.active {
          background-image: var(--activeTab);
          background-size: 100% 100%;
        }
      }
    }
  }

  .singleCamera-content {
    width: 100%;
    height: calc(100% - 44px);
    padding: 10px;
    box-sizing: border-box;
    position: relative;
    overflow: hidden;

    .offline-record {
      width: 100%;
      height: 100%;
      color: #fff;

      .data-line {
        display: flex;
        width: 100%;
        height: 40px;
        line-height: 40px;
        justify-content: space-between;

        &:nth-child(odd) {
          background: var(--lineColor);
        }
      }
    }
  }
}
</style>