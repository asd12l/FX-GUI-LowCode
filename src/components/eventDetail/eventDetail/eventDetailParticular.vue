<!--
 * @Descripttion: 说明
 * @version: V1.0
 * @Author: 卜倩倩
 * @Date: 2023-10-09 10:58:20
 * @LastEditors: 卜倩倩
 * @LastEditTime: 2023-11-17 17:24:32
-->
<template>
  <div
    class="eventDetail-wrapper"
    :style="{
      width: config.width + 'px',
      height: config.height + 'px',
      backgroundImage: 'url('+config.box.backgroundPic+')'
    }"
    v-show="isShowModuleFunc(config)"
  >
    <div
      class="head"
      :style="{
        
      }"
    >
      <span :style="{
          width: config.box.headWidth + 'px',
          height: config.box.headHeight + 'px',
          lineHeight: config.box.headHeight + 'px',
          backgroundImage: 'url(' + config.box.headPic + ')',
          fontSize: config.box.headFontSize + 'px',
        }">事件基本信息</span>
      <span
        class="close-icon"
        @click="config.isShowModule = false"
        :style="{
          width: config.box.closeIconWidth + 'px',
          height: config.box.closeIconHeight + 'px',
          backgroundImage: 'url(' + config.box.closePic + ')',
        }"
      ></span>
    </div>
    <div
      class="eventDetail-content"
      :style="scssStyle"
    >
      <div
        class="eventDetail-left"
        :style="{
        width: (config.width - 40) * 0.45 + 'px',
        height: '100%'
      }"
      >
        <div
          v-if="eventDetail.alarm_img"
          class="alarm-img"
          :style="{
          width: (config.width - 40) * 0.45 + 'px',
          height: (config.width - 40) * 0.45 / 1.8 + 'px',
          backgroundImage: 'url(' + config.box.emptyPic + ')',
        }"
        >
          <CanvasImg
            :id="eventDetail.rowid"
            ref="canvas"
            :width="(config.width - 40) * 0.45"
            :height="(config.width - 40) * 0.45 / 1.8"
            :link="eventDetail.alarm_img"
            :info="eventDetail.alam_drawbox"
            :area_new="area_new"
            :is-can-draw="false"
            :is-show-drag="eventDetail.alam_drawbox && showArea"
          />
          <span
            class="showArea"
            v-show="eventDetail.alam_drawbox"
            :style="{
              borderColor: this.config.box.mainColor.slice(
                0,
                this.config.box.mainColor.lastIndexOf(',')
              ) + ',1)',
              color: this.config.box.mainColor.slice(
                0,
                this.config.box.mainColor.lastIndexOf(',')
              ) + ',1)',
            }"
            @click="showArea = !showArea"
          >{{showArea ? '隐藏': '显示'}}区域</span>
        </div>
        <div
          class="alarm-img"
          style="margin-top: 10px"
          v-if="eventDetail.camera_info && eventDetail.camera_info.movieurls"
          :style="{
          width: (config.width - 40) * 0.45 + 'px',
          height: 'auto',
          backgroundImage: 'url(' + config.box.emptyPic + ')',
        }"
        >
          <Playback
            ref="cameraScreen"
            :show_full="'noshow'"
            :config="config"
            :camera_data="eventDetail.camera_info"
          />
        </div>
        <div
          class="alarm-info"
          :style="{
            fontSize: config.showField.fontSize + 'px',
          }"
        >
          <div
            v-for="item,index in config.fieldConfig"
            :key="index"
          >
            <span class="alarm-info-key">{{item.name}}：</span>
            <span
              class="alarm-info-value"
              :style="{
                color: getColor(item.byname, 'valueColor'),
                backgroundColor: getColor(item.byname, 'valueBackground')
            }"
            >{{getVal(item.byname)}}</span>
          </div>
        </div>
      </div>
      <div
        class="eventDetail-right"
        :style="{
        width: (config.width - (config.width - 40) * 0.45 - 60) + 'px',
      }"
      >
        <EventList
          v-if="config.history.show"
          :alarm_history="alarm_history"
          :eventDetail="eventDetail"
          :rowid="eventDetail.rowid"
          :config="config"
          @toggleEvent="toggleEvent"
        ></EventList>
        <StepRecord
          v-if="config.progressRecord.show"
          :step-data="workflow"
          :config="config"
        />
        <div class="buttons">
          <span
            v-for="(item, index) in config.buttons"
            :key="index"
            v-show="!item.hidevalue || (item.hidevalue && item.hidevalue !== config.fields.filter(el=> el.key === item.hidekey)[0].value)"
            @click="handleClickBtn(item)"
          >
            <span :style="{
              backgroundColor: item.fillColor,
              borderColor: item.borderColor,
              color: item.textColor
            }">{{ item.title }}</span>
          </span>
        </div>
      </div>
    </div>
    <div
      class="disposal-modal"
      v-if="isShowDisposal"
      :style="{
      backgroundImage: 'url('+config.box.backgroundPic+')',
      ...scssStyle
    }"
    >
      <div class="head">
        <span>处置描述</span>
        <span
          @click="isShowDisposal = false"
          :style="{
          width: config.box.closeIconWidth + 'px',
          height: config.box.closeIconHeight + 'px',
          backgroundImage: 'url(' + config.box.closePic + ')',
        }"
        ></span>
      </div>
      <div class="disposal-content">
        <el-form
          label-width="90px"
          size="small"
          class="border-box"
          style="padding: 8px 16px"
        >
          <el-form-item label="事件类型：">
            <el-select
              v-model="disposal.eventType"
              size="small"
              style="width: 100%"
              popper-class="eventDetailParticular-select"
              @focus="showPopper"
            >
              <el-option
                v-for="(item, index) in modalOptions"
                :label="item.value"
                :key="item.key"
                :value="item.key"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="处置时间：">
            <el-date-picker
              v-model="disposal.time"
              align="right"
              type="datetime"
              style="width: 100%"
              placeholder="选择日期"
              :picker-options="pickerOptions"
              popper-class="eventDetailParticular-daterange"
              @focus="showPopper"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="处置描述：">
            <el-input
              type="textarea"
              v-model="disposal.description"
              size="mini"
              placeholder=""
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span>提交</span>
    </div>
  </div>
</template>

<script>
import CanvasImg from './CanvasImg.vue';
import Playback from './playback.vue';
import EventList from './eventList.vue';
import StepRecord from './StepRecord.vue';
import {
  getRowDetail,
  getv2WorksheetInfo,
  getFilterRows,
  getProcessDetail,
  getTodoList,
  getWorkflow
} from '@/utils/api';
import { appKey, sign } from '@/utils/const.js';
export default {
  components: {
    CanvasImg,
    Playback,
    EventList,
    StepRecord
  },
  props: {
    config: {
      type: Object
    }
  },
  data() {
    return {
      id: '',
      showArea: true,
      eventDetail: {
        rowid: '',
        camera_info: {
          movieurls: '',
          national_num: '',
          channel: ''
        }
      },
      disposal: {
        eventType: '',
        description: '',
        time: ''
      },
      area_new: {
        area_n: [],
        area_y: [],
        max_box: '',
        min_box: ''
      },
      alarm_history: [],
      workflow: [],
      isShowDisposal: false,
      modalOptions: [],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          },
          {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          },
          {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }
        ]
      }
    };
  },
  computed: {
    scssStyle() {
      return {
        '--firstColor': this.config.showField.first,
        '--secondColor': this.config.showField.second,
        '--mainColor': this.config.box.mainColor
      };
    }
  },
  // watch: {
  //   config: {
  //     handler() {
  //       console.log('111111111111111111');
  //     },
  //     immediate: true,
  //     deep: true
  //   }
  // },
  mounted() {
    this.getWorksheetInfo();
    // this.updateComponentData({ rowid: '16472949-95ce-4b3e-9eca-2a454341dfe6' });
  },
  methods: {
    showPopper() {
      setTimeout(() => {
        let select = document.getElementsByClassName(
          'eventDetailParticular-select'
        );
        let daterangeDom = document.getElementsByClassName(
          'eventDetailParticular-daterange'
        );
        let sidebar = document.getElementsByClassName(
          'el-picker-panel__sidebar'
        );
        let foot = document.getElementsByClassName('el-picker-panel__footer');
        let timeDom = document.getElementsByClassName('el-date-picker');
        for (let item of daterangeDom) {
          item.style.background = this.config.box.backgroundColor;
          item.style.border =
            '1px' + ' solid ' + this.config.box.backgroundColor;
        }
        for (let item of sidebar) {
          item.style.background = this.config.box.backgroundColor;
        }
        for (let item of foot) {
          item.style.background = this.config.box.backgroundColor;
        }
        for (let item of select) {
          item.style.background = this.config.box.backgroundColor;
          item.style.border =
            '1px' + ' solid ' + this.config.box.backgroundColor;
        }
        for (let item of timeDom) {
          item.style.background = this.config.box.backgroundColor;
        }
      }, 0);
    },
    getVal(byname) {
      if (this.config.fields.filter((item) => item.key === byname).length) {
        return this.config.fields.filter((item) => item.key === byname)[0]
          .value;
      }
    },
    getColor(byname, param) {
      if (
        this.config.fieldConfig.filter((item) => item.byname === byname).length
      ) {
        let colorList = this.config.fieldConfig.filter(
          (item) => item.byname === byname
        )[0].valueSet;
        let color = '';
        colorList.forEach((item) => {
          if (item.value === this.getVal(byname)) {
            color = item[param];
          }
        });
        return color;
      }
    },
    cancel() {
      this.isShowModal = true;
    },
    async updateComponentData({ rowid }) {
      this.id = rowid;
      // this.config.isShowModule = true;
      const data = {
        appKey: appKey,
        sign: sign,
        worksheetId: 'alarm_event',
        rowId: rowid
      };
      const result = await getRowDetail(data);
      this.eventDetail = result.data;
      this.eventDetail.camera_info = {};

      if (result.data.camera) {
        this.eventDetail.camera_info.movieurls = JSON.parse(
          result.data.camera
        ).CameraType;
        this.eventDetail.camera_info.national_num = JSON.parse(
          result.data.camera
        )
          .CameraAddress.split('&')[0]
          .split('=')[1];
        this.eventDetail.camera_info.channel = JSON.parse(result.data.camera)
          .CameraAddress.split('&')[1]
          .split('=')[1];
      }
      if (
        JSON.parse(result.data.alarm_img) &&
        JSON.parse(result.data.alarm_img).length
      ) {
        this.eventDetail.alarm_img = JSON.parse(
          result.data.alarm_img
        )[0].preview_url;
      }
      await this.getFilterRows();
      // await this.getWorkflow();
      await this.getTodoList({});
      await this.getTodoList({
        complete: true
      });
    },
    handleClickBtn(item) {
      if (item.currentEffect === '出弹窗') {
        this.isShowDisposal = true;
      }
    },
    async getWorksheetInfo() {
      const res = await getv2WorksheetInfo({
        appKey: appKey,
        sign: sign,
        worksheetId: 'alarm_event'
      });
      this.modalOptions = res.data.controls.filter(
        (item) => item.controlName === '告警类型'
      )[0].options;
    },
    async getFilterRows() {
      const res = await getFilterRows({
        appKey: appKey,
        sign: sign,
        worksheetId: 'alarm_event',
        pageSize: 500,
        pageIndex: 1,
        filters: [
          {
            controlId: 'camera',
            dataType: 2,
            spliceType: 1,
            filterType: 1,
            value: this.eventDetail.camera_info.national_num
          }
        ]
      });
      this.alarm_history = res.data.rows;
    },
    async getEventProcess(param) {
      const res = await getWorkflow({
        ...param
      });
      if (res.data.works && res.data.works.length) {
        res.data.works.forEach((item) => {
          this.workflow.push({
            name: item.flowNode.name,
            workItems: item.workItems
          });
        });
      }
    },
    toggleEvent(data) {
      this.updateComponentData({ rowid: data });
    },
    async getTodoList(data) {
      const res = await getTodoList({
        ...data,
        // startAppId: 'alarm_event',
        startSourceId: this.eventDetail.rowid,
        startAppId: '652cd71a1f76aeb5855bc634'
        // startSourceId: '4ad5233b-c6e6-4c09-be0c-bb2f9a92a512'
      });
      if (res.data.length) {
        this.getEventProcess({
          id: res.data[0].id,
          workId: res.data[0].workId
        });
      }
    }
  }
};
</script>


<style lang="scss" scoped>
.eventDetail-wrapper {
  position: relative;
  pointer-events: all;
  background-size: 100% 100%;
  .head {
    width: 100%;
    height: auto;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: relative;
    font-size: 20px;
    font-family: YouSheBiaoTiHei;
    font-weight: normal;
    color: #fff;

    > span:nth-child(1) {
      display: flex;
      padding-left: 20px;
    }
  }
  .close-icon {
    display: inline-block;
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    background-size: 100% 100%;
    cursor: pointer;
  }
  .eventDetail-content {
    padding: 20px;
    width: 100%;
    height: calc(100% - 48px);
    display: flex;

    .eventDetail-left {
      .alarm-img {
        width: 100%;
        height: 358px;
        background-size: 100% 100%;
        position: relative;

        .showArea {
          display: inline-block;
          width: 78px;
          height: 30px;
          text-align: center;
          line-height: 30px;
          border: 1px solid;
          border-radius: 2px;
          position: absolute;
          bottom: 10px;
          right: 10px;
          background-color: rgba(0, 0, 0, 0.3);
          cursor: pointer;
        }
      }

      .alarm-info {
        font-family: Alibaba PuHuiTi 2;
        font-size: 16px;
        font-weight: normal;
        line-height: normal;
        letter-spacing: 0em;
        margin-top: 10px;
        // height: calc(100% - );

        > div {
          line-height: 32px;

          .alarm-info-key {
            color: var(--firstColor);
          }

          .alarm-info-value {
            color: var(--secondColor);
          }
        }
      }
    }

    .eventDetail-right {
      height: 100%;
      margin-left: 20px;
      position: relative;
    }

    .buttons {
      width: 100%;
      height: 38px;
      margin-top: 30px;
      display: flex;
      justify-content: space-evenly;
      position: absolute;
      left: 0;
      bottom: 20px;

      span {
        width: 90px;
        height: 38px;

        > span {
          display: inline-block;
          width: 100%;
          height: 100%;
          line-height: 38px;
          text-align: center;
          font-size: 16px;
          border: 1px solid;
          border-radius: 2px;
          cursor: pointer;
        }
      }
    }
  }

  .disposal-modal {
    width: 400px;
    height: 400px;
    padding: 20px;
    background-size: 100% 100%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;

    .head {
      width: 100%;
      display: flex;
      justify-content: center;
      font-family: 'Microsoft YaHei';
      margin-bottom: 20px;

      span:nth-child(2) {
        position: absolute;
        right: 20px;
        top: 3px;
        background-size: 100% 100%;
        cursor: pointer;
      }
    }

    .el-form-item__label {
      color: var(--mainColor);
    }

    .el-input__inner {
      background-color: transparent;
      border: 1px solid;
      border-color: var(--mainColor);
    }

    .el-textarea__inner {
      background-color: transparent;
      border: 1px solid;
      border-color: var(--mainColor);
    }

    > span {
      display: inline-block;
      width: 80px;
      height: 30px;
      text-align: center;
      line-height: 30px;
      position: absolute;
      right: 20px;
      bottom: 40px;
      background-color: var(--mainColor);
      color: #fff;
      border-radius: 3px;
      cursor: pointer;
    }
  }
}
</style>
<style lang="scss">
.eventDetailParticular-select {
  .el-select-dropdown__item.hover,
  .el-select-dropdown__item:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
}
.eventDetailParticular-daterange {
  .el-date-picker__time-header {
    .el-input__inner {
      background: transparent !important;
      border: none;
    }
  }
  .el-picker-panel__footer {
    .el-button {
      background-color: transparent;
      border: none;
    }
  }
  .el-date-table td.disabled div {
    background-color: rgba(0, 0, 0, 0.3);
  }
}
</style>