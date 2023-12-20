<!--
 * @Descripttion: 说明
 * @version: V1.0
 * @Author: 卜倩倩
 * @Date: 2023-10-09 10:58:20
 * @LastEditors: 卜倩倩
 * @LastEditTime: 2023-11-24 16:01:23
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
        @click="onClose"
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
          class="alarm-img"
          :style="{
          width: (config.width - 40) * 0.45 + 'px',
          height: (config.width - 40) * 0.45 / 1.8 + 'px'
        }"
        >
          <CanvasImg
            v-if="config.isShowModule && eventDetail.alarm_img"
            :id="eventDetail.rowid"
            ref="canvas"
            :width="(config.width - 40) * 0.45"
            :height="(config.width - 40) * 0.45 / 1.8"
            :link="eventDetail.alarm_img"
            :info="eventDetail.alarm_show? JSON.parse(JSON.parse(eventDetail.alarm_show).WarningTarget): ''"
            :area_new="eventDetail.alarm_show? JSON.parse(JSON.parse(eventDetail.alarm_show).DetectionArea): ''"
            :is-can-draw="false"
            :is-show-drag="eventDetail.alarm_show && showArea"
          />
          <div
            style="text-align:center;color: #fff"
            v-else
            :style="{
              width: (config.width - 40) * 0.45 + 'px',
              height: (config.width - 40) * 0.45 / 1.8 + 'px',
              lineHeight: (config.width - 40) * 0.45 / 1.8 + 'px'
            }"
          >暂无数据</div>
          <span
            class="showArea"
            v-show="eventDetail.alarm_show"
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
          v-if="eventDetail.camera_info && eventDetail.camera_info.channel && eventDetail.camera_info.national_num"
          :style="{
          width: (config.width - 40) * 0.45 + 'px',
          height: 'auto'
        }"
        >
          <Playback
            v-if="config.isShowModule"
            ref="cameraScreen"
            :show_full="'noshow'"
            :config="config"
            :camera_data="eventDetail.camera_info"
          />
        </div>
        <div
          v-else
          class="alarm-img"
          :style="{
            width: (config.width - 40) * 0.45 + 'px',
            height: (config.width - 40) * 0.45 / 1.8 + 'px'
          }"
          style="margin-top: 10px;color: #fff;display:flex;justify-content:center;align-items:center"
        >暂无画面</div>
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
            <span
              class="alarm-info-key"
              v-show="item.value"
            >{{item.name}}：</span>
            <span
              v-show="item.value"
              class="alarm-info-value"
              :style="{
                color: item.color,
                backgroundColor: item.background
            }"
            >{{item.value}}</span>
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
          :alarm_history="alarm_history"
          :eventDetail="eventDetail"
          :rowid="eventDetail.rowid"
          :config="config"
          @toggleEvent="toggleEvent"
        ></EventList>
        <StepRecord
          v-show="false"
          :step-data="workflow"
          :config="config"
        />
        <div
          class="buttons"
          v-if="eventDetail.state === '未确认' && workflow.length"
        >

          <span
            v-for="item,index in buttons"
            :key="index"
            :style="{
              backgroundColor: getColor(item).fillColor,
              borderColor: getColor(item).borderColor,
              color: getColor(item).textColor,
            }"
            v-show="!item.hidevalue || (item.hidevalue && item.hidevalue !== config.fields.filter(el=> el.key === item.hidekey)[0].value)"
            @click="handleClickBtn(item)"
          >{{getValue(item)}}</span>
        </div>
        <div
          :key="index"
          class="buttons"
          v-if="eventDetail.state === '处理中' && workflow.length"
        >
          <span
            :style="{
                backgroundColor: getColor({value: '处置完成'}).fillColor,
                borderColor: getColor({value: '处置完成'}).borderColor,
                color: getColor({value: '处置完成'}).textColor,
              }"
            @click="handleClickBtn({value: '处置完成'})"
          >{{getValue({
              value: '处置完成'
            })}}</span>
        </div>
      </div>
    </div>
    <div
      class="disposal-modal"
      v-if="isShowDisposal"
      :style="{
      background: config.box.btnModalBgc,
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
          ref="form"
          label-width="100px"
          :model="disposal"
          :rules="rules"
          size="small"
          class="border-box"
          style="padding: 8px 16px"
        >
          <el-form-item
            label="处置人："
            prop="disposer"
          >
            <el-select
              v-model="disposal.disposer"
              size="small"
              style="width: 100%"
              popper-class="eventDetailParticular-select"
              @focus="showPopper(),getDisposer()"
            >
              <el-option
                v-for="(item, index) in modalOptions"
                :label="item[userId]"
                :key="item.rowid"
                :value="item.rowid"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="处置时间："
            prop="time"
          >
            <el-date-picker
              v-model="disposal.time"
              align="right"
              type="datetime"
              style="width: 100%"
              placeholder="选择日期"
              format="yyyy-MM-dd HH:mm:ss"
              :picker-options="pickerOptions"
              popper-class="eventDetailParticular-daterange"
              @focus="showPopper"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item
            label="处置描述："
            prop="description"
          >
            <el-input
              type="textarea"
              v-model="disposal.description"
              size="mini"
              placeholder=""
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span @click="handleSubmit">提交</span>
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
  GetFilterRows,
  getWorkflow,
  getWorksheetIdByAlias,
  updateWorksheetRow,
  submit,
  GetRowDetail,
  getWorksheetInfo,
  getWorksheetApiInfo,
  instanceSubmit,
  getTodoListV1,
  getTodoListV2
} from '@/utils/api';
import { appKey, sign } from '@/utils/const.js';
export default {
  name: 'eventDetailParticular',
  components: {
    CanvasImg,
    Playback,
    EventList,
    StepRecord
  },
  props: {
    config: {
      type: Object
    },
    closeCallBack: {
      type: Function,
      default: () => {
        return () => {};
      }
    },
    statusDialogCb: {
      type: Function,
      default: () => {
        return () => {};
      }
    }
  },
  data() {
    return {
      id: '',
      showArea: true,
      rules: {
        disposer: [
          { required: true, message: '请选择处置人', trigger: 'change' }
        ],
        time: [{ required: true, message: '请选择时间', trigger: 'change' }],
        description: [
          { required: true, message: '输入处置描述', trigger: 'blur' }
        ]
      },
      eventDetail: {
        // rowid: '',
        // camera_info: {
        //   movieurls: 'http://101.227.231.145:81',
        //   national_num: '34020000001110000105',
        //   channel: '34020000001320000002'
        // }
      },
      disposal: {
        disposer: '',
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
      },
      buttons: [],
      worksheetId: '',
      workId: '',
      logId: '',
      instanceId: '',
      controlId: '',
      controlId1: '',
      controlId2: '',
      controlId3: '',
      dataSource: '',
      userId: ''
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
  watch: {
    'config.fieldConfig': {
      handler() {
        this.config.fieldConfig.forEach((item) => {
          for (let key in this.eventDetail) {
            if (key === item.byname) {
              item.value = this.eventDetail[key];
              if (
                item.valueSet.length &&
                item.valueSet.filter((el) => el.value === item.value).length
              ) {
                item.color = item.valueSet.filter(
                  (el) => el.value === item.value
                )[0].valueColor;
                item.background = item.valueSet.filter(
                  (el) => el.value === item.value
                )[0].valueBackground;
              } else {
                item.color = '';
                item.background = '';
              }
            }
          }
        });
        this.$forceUpdate();
      },
      deep: true
    },
    'config.isShowModule': {
      handler(nval) {
        this.workflow = [];
        this.eventDetail = {};
        if (nval) {
          this.$setModal(this.config.box.modalBgc);
        } else {
          this.$removeModal();
        }
      }
    },
    'config.buttons': {
      handler(nval) {
        //为了解决修改事件操作按钮改动时页面不刷新问题
        this.buttons.push({});
        this.buttons.pop();
      },
      deep: true
    }
  },
  mounted() {
    this.getWorksheetInfo();
    // this.updateComponentData({
    //   rowid: '1cfad791-1798-42a5-a1c1-fa07a5dccce7'
    // });
    if (!this.id) {
      this.getEventList();
    }
  },
  methods: {
    async getEventList() {
      const res = await getFilterRows({
        appKey: appKey,
        sign: sign,
        worksheetId: 'alarm_event',
        viewId: '',
        pageSize: 10,
        pageIndex: 1,
        filters: [],
        notGetTotal: true,
        getSystemControl: true
      });
      if (res.data.rows.length) {
        this.updateComponentData({ rowid: res.data.rows[0].rowid });
      }
    },
    onClose() {
      this.config.isShowModule = false;
      this.closeCallBack && this.closeCallBack();
    },
    //显示处置人弹窗
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
          item.style.background = this.config.box.selectBgc;
          item.style.border = '1px' + ' solid ' + this.config.box.selectBgc;
        }
        for (let item of sidebar) {
          item.style.background = this.config.box.selectBgc;
        }
        for (let item of foot) {
          item.style.background = this.config.box.selectBgc;
        }
        for (let item of select) {
          item.style.background = this.config.box.selectBgc;
          item.style.border = '1px' + ' solid ' + this.config.box.selectBgc;
        }
        for (let item of timeDom) {
          item.style.background = this.config.box.selectBgc;
        }
      }, 0);
    },
    //获取处置人信息
    async getDisposer() {
      const result = await getWorksheetInfo({
        getTemplate: true,
        worksheetId: '65433c39857fde90c1f859d2'
      });
      this.userId = result.data.template.controls.filter(
        (item) => item.controlName === '名称'
      )[0].controlId;
      const res = await GetFilterRows({
        controlId: this.userId,
        getType: 7,
        isGetWorksheet: true,
        keyWords: '',
        pageIndex: 1,
        pageSize: 50,
        relationWorksheetId: this.worksheetId,
        searchType: 1,
        status: 1,
        viewId: '',
        worksheetId: this.dataSource
      });
      this.modalOptions = res.data.data;
    },
    cancel() {
      this.isShowModal = true;
    },
    //获取事件详情
    async updateComponentData({ rowid }) {
      this.id = rowid;
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
        result.data.alarm_img &&
        JSON.parse(result.data.alarm_img) &&
        JSON.parse(result.data.alarm_img).length
      ) {
        this.eventDetail.alarm_img = JSON.parse(
          result.data.alarm_img
        )[0].large_thumbnail_full_path;
      }
      this.config.fieldConfig.forEach((item) => {
        for (let key in result.data) {
          if (key === item.byname) {
            item.value = result.data[key];
            if (
              item.valueSet.length &&
              item.valueSet.filter((el) => el.value === item.value).length
            ) {
              item.color = item.valueSet.filter(
                (el) => el.value === item.value
              )[0].valueColor;
              item.background = item.valueSet.filter(
                (el) => el.value === item.value
              )[0].valueBackground;
            } else {
              item.color = '';
              item.background = '';
            }
          }
        }
      });
      await this.getFilterRows(); //事件历史记录
      await this.getWorksheetIdByAlias(); //获取当前字段对照表
      await this.GetRowDetail(); //获取操作buttons(胡家埭项目)
    },
    //获取历史记录
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
            value: this.eventDetail.camera_info.channel
          }
        ]
      });
      this.alarm_history = res.data.rows;
    },
    //获取字段对照表
    async getWorksheetIdByAlias() {
      const res = await getWorksheetIdByAlias({
        appKey: appKey,
        sign: sign
      });
      let startAppId = res.data.sections
        .filter((item) => item.name === '告警中心')[0]
        .items.filter((item) => item.alias === 'alarm_event')[0].id;
      this.worksheetId = startAppId;
      // await this.getTodoListV1({
      //   startAppId: this.worksheetId,
      //   startSourceId: this.id
      // });
      // await this.getTodoListV1({
      //   complete: true,
      //   startAppId: this.worksheetId,
      //   startSourceId: this.id
      // });
      // return;
      if (this.eventDetail.state === '未确认') {
        await this.getTodoListV1({
          startAppId,
          keyword: this.eventDetail.event_name.slice(1),
          pageIndex: 1,
          pageSize: 30,
          apkId: '',
          processId: ''
        });
        await this.getTodoListV1({
          complete: true,
          keyword: this.eventDetail.event_name.slice(1),
          pageIndex: 1,
          pageSize: 30,
          apkId: '',
          processId: ''
        });
      } else if (this.eventDetail.state === '处理中') {
        // await this.getTodoListV1({
        //   startAppId: this.worksheetId,
        //   startSourceId: this.id
        // });
        // await this.getTodoListV1({
        //   complete: true,
        //   startAppId: this.worksheetId,
        //   startSourceId: this.id
        // });
        let param = {
          pageIndex: 1,
          pageSize: 30,
          type: 3,
          keyword: this.eventDetail.event_name.slice(1)
        };
        await this.getTodoListV1(param);
        // try {
        //   const res = await this.getTodoListV2(param);
        //   if (!res.data.length) {
        //     param = {
        //       pageIndex: 1,
        //       pageSize: 30,
        //       type: 4,
        //       keyword: this.eventDetail.event_name.slice(1)
        //     };
        //     await this.getTodoListV2(param);
        //   }
        // } catch (error) {
        //   param = {
        //     pageIndex: 1,
        //     pageSize: 30,
        //     type: 4,
        //     keyword: this.eventDetail.event_name.slice(1)
        //   };
        //   await this.getTodoListV2(param);
        // }
      } else {
        if (this.eventDetail.shjg === '生成工单') {
          await this.getTodoListV1({
            startAppId: this.worksheetId,
            startSourceId: this.id
          });
          await this.getTodoListV1({
            complete: true,
            startAppId: this.worksheetId,
            startSourceId: this.id
          });
        }
        if (this.eventDetail.shjg === '已恢复' || '误报') {
          await this.getTodoListV1({
            complete: true,
            type: -1, //已完成已恢复
            startAppId: this.worksheetId,
            startSourceId: this.id
          });
        }
      }
    },
    async getTodoListV2(param) {
      const res = await getTodoListV2(param);
      if (res.data.length) {
        this.getEventProcess({
          id: res.data[0].id,
          workId: res.data[0].workId
        });
        this.workId = res.data[0].workId;
        this.instanceId = res.data[0].id;
      } else if (!param.hasOwnProperty('complete')) {
        this.workflow = [];
      }
    },
    async getTodoListV1(param) {
      const res = await getTodoListV1(param);
      if (res.data.length) {
        this.getEventProcess({
          id: res.data[0].id,
          workId: res.data[0].workId
        });
        this.workId = res.data[0].workId;
        this.instanceId = res.data[0].id;
      } else if (!param.hasOwnProperty('complete')) {
        this.workflow = [];
      }
    },
    //获取事件进度记录
    async getEventProcess(param) {
      const res = await getWorkflow({
        ...param
      });
      if (res.data.works && res.data.works.length) {
        this.workflow = [];
        res.data.works.forEach((item) => {
          this.workflow.push({
            name: item.flowNode.name,
            workItems: item.workItems
          });
        });
      }
    },
    //胡家埭项目获取操作按钮
    async GetRowDetail() {
      const res = await GetRowDetail({
        checkView: false,
        getTemplate: true,
        getType: 9,
        instanceId: this.instanceId,
        rowId: this.id,
        viewId: '',
        workId: this.workId,
        worksheetId: this.worksheetId
      });
      this.buttons = res.data.templateControls.filter(
        (item) => item.controlName === '审核结果'
      )[0].options;
    },
    async handleClickBtn(item) {
      this.workflow = [];
      if (item.value === '处置完成') {
        this.isShowDisposal = true;
      } else {
        const res = await updateWorksheetRow({
          getType: 9,
          instanceId: this.instanceId,
          newOldControl: [
            {
              controlId: this.controlId,
              controlName: '审核结果',
              dot: 0,
              type: 11,
              value: JSON.stringify([item.key])
            }
          ],
          rowId: this.id,
          viewId: '',
          workId: this.workId,
          worksheetId: this.worksheetId
        });
        this.logId = res.data.requestLogId;
        const result = await submit({
          id: this.instanceId,
          logId: this.logId,
          workId: this.workId
        });
        if (result.msg === '成功') {
          this.updateComponentData({ rowid: this.id });
          this.statusDialogCb && this.statusDialogCb();
        } else {
          this.$Message.error(result.msg);
        }
      }
    },
    //处置人处置
    handleSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.submitForm();
          this.statusDialogCb && this.statusDialogCb();
        } else {
          return false;
        }
      });
    },
    async submitForm() {
      const res = await updateWorksheetRow({
        getType: 9,
        instanceId: this.instanceId,
        newOldControl: [
          {
            controlId: this.controlId1,
            controlName: '处置员信息',
            dot: 0,
            type: 29,
            value: JSON.stringify([{ sid: this.disposal.disposer }])
          },
          {
            controlId: this.controlId2,
            controlName: '处置日期',
            dot: 0,
            type: 16,
            value: this.disposal.time //事件格式要改2023-11-08T02:09:56.000Z
          },
          {
            controlId: this.controlId3,
            controlName: '处置描述',
            dot: 0,
            type: 2,
            value: this.disposal.description
          }
        ],
        rowId: this.id,
        viewId: '',
        workId: this.workId,
        worksheetId: this.worksheetId
      });
      const result = await instanceSubmit({
        id: this.instanceId,
        logId: res.data.requestLogId,
        workId: this.workId
      });
      if (result.code === 2000) {
        this.$Message.error(result.message);
      } else {
        this.isShowDisposal = false;
        this.updateComponentData({ rowid: this.id });
      }
    },
    async getWorksheetInfo() {
      const res = await getv2WorksheetInfo({
        appKey: appKey,
        sign: sign,
        worksheetId: 'alarm_event'
      });
      this.controlId = res.data.controls.filter(
        (item) => item.controlName === '审核结果'
      )[0].controlId;
      this.controlId1 = res.data.controls.filter(
        (item) => item.controlName === '处置员信息'
      )[0].controlId;
      this.dataSource = res.data.controls.filter(
        (item) => item.controlName === '处置员信息'
      )[0].dataSource;
      this.controlId2 = res.data.controls.filter(
        (item) => item.controlName === '处置日期'
      )[0].controlId;
      this.controlId3 = res.data.controls.filter(
        (item) => item.controlName === '处置描述'
      )[0].controlId;
    },
    getColor(item) {
      let values = this.config.buttons.filter(
        (el) => el.currentEffect === item.value
      );
      if (values.length) {
        return {
          textColor: values[0].textColor,
          borderColor: values[0].borderColor,
          fillColor: values[0].fillColor
        };
      } else {
        return {
          textColor: '#fff',
          borderColor: '',
          fillColor: ''
        };
      }
    },
    getValue(item) {
      let values = this.config.buttons.filter(
        (el) => el.currentEffect === item.value
      );
      if (values.length) {
        return values[0].title;
      } else {
        return item.value;
      }
    },
    toggleEvent(data) {
      this.updateComponentData({ rowid: data });
    }
  }
};
</script>


<style lang="scss" scoped>
.eventDetail-wrapper {
  position: relative;
  pointer-events: all;
  background-size: 100% 100%;
  z-index: 100;
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
        display: inline-block;
        // width: 100%;
        // height: 100%;
        line-height: 38px;
        text-align: center;
        font-size: 16px;
        border: 1px solid;
        border-radius: 2px;
        cursor: pointer;

        // > span {
        //   display: inline-block;
        //   width: 100%;
        //   height: 100%;
        //   line-height: 38px;
        //   text-align: center;
        //   font-size: 16px;
        //   border: 1px solid;
        //   border-radius: 2px;
        //   cursor: pointer;
        // }
      }
    }
  }
}
</style>
<style lang="scss">
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
    .el-button--text {
      color: #fff;
    }
  }
  .el-date-table td.disabled div {
    background-color: rgba(0, 0, 0, 0.3);
  }
}
</style>