<!--
 * @Descripttion: 说明
 * @version: V1.0
 * @Author: 卜倩倩
 * @Date: 2022-10-14 16:34:29
 * @LastEditors: 卜倩倩
 * @LastEditTime: 2023-11-21 14:07:27
-->
<template>
  <div
    class="playback-wrapper1"
    :style="{
    height: active === 1 ? (config.width - 40) * 0.45 / 1.8 + 'px': (config.width - 40) * 0.45 / 1.8 + 117 + 'px'
  }"
  >
    <div class="videoContent">
      <div
        v-if="isShowNoVideo"
        class="videoContent__empty__box"
      />
      <div v-else>

        <live-player
          id="live-player-container"
          :video-url="videoUrl"
          alt="加载中..."
          fluent
          autoplay
          live
          stretch
        />
      </div>
      <div class="videoContent__operate">
        <div
          v-show="active == 1 && camera_data.camera_type === '球机'"
          class="control"
        >
          <span
            @mousedown="controlYun('up')"
            @mouseup="controlStop"
          />
          <span
            @mousedown="controlYun('left')"
            @mouseup="controlStop"
          />
          <span
            @mousedown="controlYun('right')"
            @mouseup="controlStop"
          />
          <span
            @mousedown="controlYun('down')"
            @mouseup="controlStop"
          />
          <span
            @mousedown="controlYun('zoomin')"
            @mouseup="controlStop"
          />
          <span
            @mousedown="controlYun('zoomout')"
            @mouseup="controlStop"
          />
        </div>
        <div
          class="playback"
          :style="{
              borderColor: this.config.box.mainColor.slice(
                0,
                this.config.box.mainColor.lastIndexOf(',')
              ) + ',1)',
              backgroundColor: this.config.box.mainColor.slice(
                0,
                this.config.box.mainColor.lastIndexOf(',')
              ) + ',1)',
              color: '#000',
            }"
          v-if="videoUrl"
          @click="getplayCamera()"
        >
          {{active === 1 ? '查看回放': '实时监控'}}
        </div>
      </div>
    </div>
    <div
      v-if="active == 2"
      class="playback-btn"
    >
      <div
        v-show="active == 2"
        class="operat_date"
      >
        <el-date-picker
          v-model="value"
          popper-class="jinshanCockpit-playback"
          type="date"
          placeholder="选择日期时间"
          size="small"
          value-format="yyyy-MM-dd"
          @change="dateChange"
        />
        <i
          class="el-icon-circle-close"
          @click="(active = 1), getStreamStart()"
        ></i>
      </div>

      <TimeRule
        ref="timeRule"
        :videos="videos"
        @timeChange="onTimeChange"
      />
    </div>
  </div>
</template>

<script>
import TimeRule from '../../components/SingleCamera/timeRule.vue';
import {
  stream_start,
  playback_start,
  playback_recordlist,
  getControl_ptz
} from '@/utils/api';
export default {
  props: ['camera_data', 'config'],
  components: {
    TimeRule
  },
  data() {
    return {
      videoUrl: '',
      videos: [],
      value: '',
      time: '',
      start_time: '',
      end_time: '',
      isShowNoVideo: false,
      active: 1,
      is_intranet: false
    };
  },
  watch: {
    camera_data: {
      handler(nval, oval) {
        console.log(nval, oval);
        // if (nval.rowid !== oval.rowid) {
        this.getStreamStart();
        // }
      }
      // deep: true,
      // immediate: true
    }
  },
  computed: {
    // is_intranet() {
    //   return this.$store.state.popup.is_intranet;
    // },
    allCamera() {
      return this.$store.state.popup.allCamera;
    }
  },
  mounted() {
    this.value = this.dateFormat(new Date(), 'yyyy-MM-dd');
    // this.getStreamStart(); // 获取实时播放流
    this.getStreamStart();
  },
  methods: {
    dateFormat(date, format) {
      date = new Date(date);
      date.setHours(date.getHours());
      const o = {
        'M+': date.getMonth() + 1, // month
        'd+': date.getDate(), // day
        'H+': date.getHours(), // hour
        'm+': date.getMinutes(), // minute
        's+': date.getSeconds(), // second
        'q+': Math.floor((date.getMonth() + 3) / 3), // quarter
        S: date.getMilliseconds() // millisecond
      };

      if (/(y+)/.test(format))
        format = format.replace(
          RegExp.$1,
          (date.getFullYear() + '').substr(4 - RegExp.$1.length)
        );

      for (const k in o) {
        if (new RegExp('(' + k + ')').test(format)) {
          format = format.replace(
            RegExp.$1,
            RegExp.$1.length == 1
              ? o[k]
              : ('00' + o[k]).substr(('' + o[k]).length)
          );
        }
      }
      return format;
    },
    getplayCamera() {
      if (this.active === 1) {
        this.active = 2;
        this.getRecordList();
      } else {
        this.active = 1;
        this.getStreamStart();
      }
    },
    closeWindow() {
      this.$store.commit('setPopupName', '');
    },
    getStreamStart() {
      console.log(this.camera_data, '6666666666');
      stream_start({
        serial:
          this.camera_data.national_num || this.camera_data.master_national_num,
        code: this.camera_data.channel || this.camera_data.master_channel,
        svs_url: this.camera_data.movieurls || window.location.origin
      })
        .then((res) => {
          this.videoUrl = res.WS_FLV;
          console.log(this.videoUrl, 'ws_flv---------------');
          this.isShowNoVideo = !this.videoUrl;
        })
        .catch(() => {
          this.videoUrl = '';
          this.isShowNoVideo = true;
        });
    },
    getPlayStart() {
      playback_start({
        serial:
          this.camera_data.national_num || this.camera_data.master_national_num,
        code: this.camera_data.channel || this.camera_data.master_channel,
        svs_url: this.camera_data.movieurls,
        starttime: this.start_time,
        endtime: this.end_time,
        is_intranet: this.is_intranet
      })
        .then((res) => {
          if (res == null) {
            this.videoUrl = '';
          } else {
            this.videoUrl = res.WS_FLV;
          }
          this.isShowNoVideo = !this.videoUrl;
        })
        .catch(() => {
          this.videoUrl = '';
          this.isShowNoVideo = true;
        });
    },
    async getRecordList() {
      const res = await playback_recordlist({
        serial:
          this.camera_data.national_num || this.camera_data.master_national_num,
        code: this.camera_data.channel || this.camera_data.master_channel,
        svs_url: this.camera_data.movieurls,
        starttime: this.value + 'T' + '00:00:00',
        is_intranet: this.is_intranet,
        endtime: this.dateFormat(new Date(), 'yyyy-MM-ddTHH:mm:ss')
      });
      this.recordList = res.RecordList;
      this.start_time = this.recordList[0].StartTime;
      this.end_time = this.recordList[0].EndTime;
      this.getPlayStart();
    },
    dateChange() {
      this.start_time = this.value + 'T' + this.time;
      this.end_time = this.dateFormat(new Date(), 'yyyy-MM-ddTHH:mm:ss');
      this.getPlayStart();
    },
    onTimeChange(e) {
      this.time = e;
      if (!this.value) {
        this.start_time =
          this.dateFormat(new Date(), 'yyyy-MM-dd') + 'T' + this.time;
        const curTime = new Date(
          this.dateFormat(new Date(), 'yyyy-MM-dd') + ' ' + this.time
        );
        this.end_time = this.dateFormat(
          new Date(curTime.setMinutes(curTime.getMinutes() + 10)),
          'yyyy-MM-ddTHH:mm:ss'
        );
      } else {
        this.start_time = this.value + 'T' + this.time;
        const curTime = new Date(this.value + ' ' + this.time);
        this.end_time = this.dateFormat(
          new Date(curTime.setMinutes(curTime.getMinutes() + 10)),
          'yyyy-MM-ddTHH:mm:ss'
        );
      }
      this.getPlayStart();
    },
    reback() {
      // this.$parent.isShowPlayback = false;
    },
    async controlYun(command) {
      if (this.videoUrl) {
        const res = await getControl_ptz({
          serial:
            this.camera_data.national_num ||
            this.camera_data.master_national_num,
          code: this.camera_data.channel || this.camera_data.master_channel,
          svs_url: this.$videoUrl,
          command: command
        });
      } else {
        this.$Message.error('摄像头信息不全无法查看画面');
      }
    },
    controlStop() {
      setTimeout(() => {
        this.controlYun('stop');
      }, 1000);
    }
  }
};
</script>

<style lang="scss">
.playback-wrapper1 {
  //  position:absolute;
  //   left: 50%;
  //   top: 50%;
  //   transform: translate(-50%, -50%);
  pointer-events: all;
  width: 100%;

  .videoContent {
    // padding: 10px;
    background-color: #031527;
    width: 100%;
    position: relative;

    &__empty__box {
      width: 100%;
      height: 210px;
      // background-image: url('../../assets/img/weichuan/monitor/empty-box.png');
      background-repeat: no-repeat;
      background-position: center;
    }

    &__operate {
      width: 100%;
      padding: 0 20px;
      position: absolute;
      bottom: 20px;
      left: 0;
      display: flex;
      justify-content: space-between;

      .control {
        width: 150px;
        height: 220px;
        position: absolute;
        bottom: 0;
        left: 20px;

        span {
          cursor: pointer;
        }

        span:nth-child(1) {
          display: inline-block;
          width: 70px;
          height: 70px;
          // background-image: url('../../assets/img/weichuan/monitor/arrow-top.png');
          position: absolute;
          top: 0;
          left: 40px;

          &:hover {
            // background-image: url('../../assets/img/weichuan/monitor/arrow-top-active.png');
          }
        }

        span:nth-child(2) {
          display: inline-block;
          width: 70px;
          height: 70px;
          // background-image: url('../../assets/img/weichuan/monitor/arrow-left.png');
          position: absolute;
          top: 40px;
          left: 0;

          &:hover {
            // background-image: url('../../assets/img/weichuan/monitor/arrow-left-active.png');
          }
        }

        span:nth-child(3) {
          display: inline-block;
          width: 70px;
          height: 70px;
          // background-image: url('../../assets/img/weichuan/monitor/arrow-right.png');
          position: absolute;
          top: 40px;
          right: 0;

          &:hover {
            // background-image: url('../../assets/img/weichuan/monitor/arrow-right-active.png');
          }
        }

        span:nth-child(4) {
          display: inline-block;
          width: 70px;
          height: 70px;
          // background-image: url('../../assets/img/weichuan/monitor/arrow-bottom.png');
          position: absolute;
          top: 80px;
          left: 40px;

          &:hover {
            // background-image: url('../../assets/img/weichuan/monitor/arrow-bottom-active.png');
          }
        }

        span:nth-child(5) {
          display: inline-block;
          width: 50px;
          height: 50px;
          // background-image: url('../../assets/img/weichuan/monitor/enlarge.png');
          position: absolute;
          bottom: 0;
          left: 0;

          &:hover {
            // background-image: url('../../assets/img/weichuan/monitor/enlarge-active.png');
          }
        }

        span:nth-child(6) {
          display: inline-block;
          width: 50px;
          height: 50px;
          // background-image: url('../../assets/img/weichuan/monitor/reduce.png');
          position: absolute;
          bottom: 0;
          right: 0;

          &:hover {
            // background-image: url('../../assets/img/weichuan/monitor/reduce-active.png');
          }
        }
      }

      .playback {
        width: 78px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        cursor: pointer;
        font-size: 16px;
        color: #fff;
        border-radius: 2px;
        position: absolute;
        right: 10px;
        bottom: 0;
      }
    }
  }

  .playback-btn {
    width: 100%;
    position: relative;
    box-shadow: 0px 0px 14px 0px rgba(100, 190, 255, 0.4);
    background: #031527;
    border: 1px solid #308dff;
    .el-input--small .el-input__icon {
      line-height: 24px;
    }
    .operat_date {
      margin-top: 15px;
      margin-bottom: 8px;
      display: flex;
      justify-content: space-between;
      padding: 0 10px;

      .el-icon-circle-close {
        position: absolute;
        right: 10px;
        top: 10px;
        width: 10px;
        height: 10px;
        margin-top: 10px;
        color: #fff;
        cursor: pointer;
      }
    }
    .el-date-editor {
      width: 200px;
      .el-input__inner {
        background: rgba(6, 20, 44, 0.8);
        border: 1px solid rgba(108, 175, 255, 0.5);
        color: #99b3c8;
      }
    }
  }
}
</style>
