<template>
  <div
    class="right-top"
    :style="{
    width: config.history.width + 'px',
    height: config.history.height + 'px',
    ...scssStyle
  }"
  >
    <div
      class="table-head"
      :style="{
      backgroundImage: 'url('+config.box.subtitlePic+')',
      width: config.box.subtitleWidth + 'px',
      height: config.box.subtitleHeight + 'px',
      lineHeight: config.box.subtitleHeight + 'px'
    }"
    >
      历史事件
    </div>
    <div class="table-body">
      <el-scrollbar
        v-if="alarmHistory && alarmHistory.length"
        style="height: 100%"
      >
        <div
          v-for="(item, index) in alarmHistory"
          :key="index"
          :class="['table-body-row',rowid ===  item.rowid?'active-row':'']"
          @click="$emit('toggleEvent',item.rowid)"
        >
          <div class="img-box">
            <el-image
              :src="JSON.parse(
                  item.alarm_img
                )[0].preview_url"
              :preview-src-list="[JSON.parse(
                  item.alarm_img
                )[0].preview_url]"
              @click.native.stop
            >
              <div
                slot="error"
                class="image-slot"
              >
                <img
                  :src="config.history.emptyPic"
                  alt=""
                >
              </div>
            </el-image>
          </div>
          <div class="table-body-cell">
            <div class="cell_event_name">
              <span
                class="event_name txt-ellipsis"
                :title="item.event_name"
              >{{ item.event_name }}</span>
              <span
                class="event_status"
                :style="{
                  color: getColor('alarm_grade', item.alarm_grade)
                }"
              >{{ item.alarm_grade }}</span>
            </div>
            <div class="cell_event_time">
              {{ item.alarm_time }}
            </div>
            <div class="cell_event_device">
              <!-- <span
                class="event_device txt-ellipsis"
                :title="item.camera_name"
              >{{ item.camera_name }}</span> -->
              <span
                class="event_type"
                :style="{
                color: getColor('alarm_type', item.alarm_type)
              }"
              >{{ item.alarm_type }}</span>
            </div>
          </div>
        </div>
      </el-scrollbar>
      <div
        v-else
        class="nodata"
      >暂无数据</div>
    </div>
    <div class="line" />
  </div>
</template>

<script>
export default {
  props: ['eventDetail', 'alarm_history', 'config', 'rowid'],
  computed: {
    scssStyle() {
      return {
        '--selectedColor': this.config.history.selectedColor
      };
    }
  },
  data() {
    return {
      alarmHistory: []
    };
  },
  watch: {
    alarm_history: {
      handler(nval) {
        this.alarmHistory = nval;
      },
      deep: true,
      immediate: true
    }
  },
  mounted() {},
  methods: {
    getColor(byname, type) {
      if (
        this.config.historyFieldConfig.filter((item) => item.byname === byname)
          .length
      ) {
        let colorList = this.config.historyFieldConfig.filter(
          (item) => item.byname === byname
        )[0].valueSet;
        let color = '';
        colorList.forEach((item) => {
          if (item.value === type) {
            color = item.valueColor;
          }
        });
        return color;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.right-top {
  height: 365px;

  .table-head {
    font-family: Alibaba PuHuiTi 2;
    color: #fff;
    padding-left: 40px;
    background-size: 100% 100%;
  }
  .nodata {
    color: #999;
    text-align: center;
    margin-top: 50px;
  }
  .table-body {
    height: calc(100% - 40px);
    // overflow-y: auto;
    ::-webkit-scrollbar,
    div::-webkit-scrollbar {
      display: none;
    }
    .table-body-row:hover {
      // background: rgba(0, 0, 0, 0.2);
      background: var(--selectedColor);
    }
    .active-row {
      // background: rgba(0, 0, 0, 0.2);
      background: var(--selectedColor);
    }
    .table-body-row {
      width: 100%;
      height: 90px;
      display: flex;
      align-items: center;
      padding: 10px;
      cursor: pointer;
      .img-box {
        width: 100px;
        height: 60px;
        margin-right: 10px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .table-body-cell {
        flex: 1;
        align-self: center;
        font-family: MicrosoftYaHei;
        font-weight: normal;

        .cell_event_name {
          display: flex;
          align-items: center;
          justify-content: space-between;
          .event_name {
            font-size: 16px;
            color: #fff;
            width: 240px;
          }
          .event_status {
            font-size: 14px;
            color: #c23737;
          }
        }
        .cell_event_time {
          font-size: 14px;
          color: #99b3c8;
        }

        .cell_event_device {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .event_device {
            width: 200px;
            font-size: 16px;
            color: #fff;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .event_type {
            font-size: 14px;
            border-radius: 4px;
            line-height: 26px;
            height: 26px;
            padding: 0 6px;
            background: rgba(0, 219, 204, 0.1);
          }
        }
      }
    }
  }
  .body {
    color: #fff;
    height: calc(100% - 40px);
    ::-webkit-scrollbar,
    div::-webkit-scrollbar {
      display: none;
    }
    .el-checkbox__inner {
      background: rgba(24, 57, 85, 1);
    }
    .el-checkbox {
      color: #fff;
    }
    .body-top {
      height: 34px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
      > div:nth-child(1) {
        font-size: 14px;
        color: #fff;
      }
      > div:nth-child(2) {
        width: 64px;
        height: 24px;
        font-size: 12px;
        text-align: center;
        line-height: 24px;
        background-color: #7dddff;
      }
    }
    > div:nth-child(2) {
      height: calc(100% - 40px);
      // background-color: #90b2cf;
      // overflow-y: auto;
    }
    .body-contant {
      height: 50px;
      display: flex;
      align-items: center;
      > div {
        margin-right: 10px;
      }
      > div:nth-child(1) {
      }
      > div:nth-child(2) {
        width: 60px;
        height: 36px;
        //    background-color: #35D3FF;
        img {
          width: 100%;
          height: 100%;
        }
      }
      > div:nth-child(3) {
        width: 18px;
        height: 100%;
        // background: url("../../../assets/img/zhongshan/wulian/icon-tree1.png")
        // no-repeat;
        background-position-y: 50%;
      }
      > div:nth-child(4) {
        font-size: 14px;
        color: #fff;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      > div:nth-child(5) {
        color: rgba(125, 221, 255, 1);
      }
    }
    .body-contant:hover {
      background: rgba(125, 221, 255, 0.1);
    }
    .body-row {
      height: 56px;
      padding: 0 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      &:hover {
        background: rgba(48, 141, 255, 0.5);
      }
      &-left {
        font-size: 16px;
        display: flex;
        > span:nth-child(1) {
          margin-right: 10px;
        }
      }
      &-right {
        display: flex;
        > span:nth-child(1) {
          margin-right: 10px;
          font-size: 16px;
          color: #308dff;
        }
        .type {
          border-radius: 4px;
          height: 26px;
          line-height: 26px;
          font-size: 14px;
          padding: 0 6px;
        }
        .dangyuan {
          padding: 0 20px;
          color: #b32626;
          background: rgba(179, 38, 38, 0.1);
        }
        .move {
          color: #00dbcc;
          background: rgba(0, 219, 204, 0.1);
        }
        .cun {
          color: #ffd03b;
          background: rgba(255, 208, 59, 0.1);
        }
      }
    }
  }
  .line {
    margin-top: 10px;
    width: 380px;
    height: 1px;
    border-bottom: 1px solid;
    border-image: linear-gradient(
      90deg,
      rgba(48, 141, 255, 0) 0%,
      #64beff 52%,
      rgba(48, 141, 255, 0) 104%
    );
  }
}
</style>