<template>
  <div
    class="step-box"
    :style="{
    ...scssStyle,
    height: config.progressRecord.height + 'px'
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
      事件进度记录
    </div>
    <div :style="{
      height: config.progressRecord.height - 49 + 'px',
      'overflow-y': 'auto'
    }">
      <el-steps
        direction="vertical"
        :style="{
        height: config.progressRecord.height - 49 + 'px'
      }"
      >
        <el-step
          v-for="(item, index) in stepData"
          :key="index"
        >
          <template slot="description">
            <div class="step-content">
              <div
                class="stepinfo-single"
                v-if="item.workItems && item.workItems.length<=1"
              >
                <div class="nodeinfo">
                  <div class="stepinfo-single-left">
                    <div class="step-txt-box">
                      <div class="step-txt">
                        {{ item.name }}
                      </div>
                      <div
                        v-if="item.workItems[0].opinion"
                        class="control-box"
                        @click="changeShowRemarks(item.workItems[0])"
                      >
                        <span class="control-txt">{{
                        isShowRemarks[index] ? "收起" : "展开"
                      }}</span>
                        <i
                          v-show="!isShowRemarks[index]"
                          class="el-icon-arrow-down"
                        />
                        <i
                          v-show="isShowRemarks[index]"
                          class="el-icon-arrow-up"
                        />
                      </div>
                    </div>
                    <div class="step-time">
                      {{ item.workItems[0].operationTime || item.workItems[0].dueTime }}
                    </div>
                  </div>
                  <div class="stepinfo-single-right">
                    <!-- <div class="operator">操作人员:
                      {{ item.workItems[0].workItemAccount.fullName }}</div>
                    <div class="status-box">
                      <div
                        class="status-txt"
                        style="font-size: 14px;"
                      >
                        {{ getOperation(item.workItems[0]) }}
                      </div>
                    </div> -->
                    <span>操作人员：{{ item.workItems[0].workItemAccount.fullName }}</span>
                    <span
                      class="dot"
                      v-if="getOperation(item.workItems[0])"
                    ></span>
                    <span>{{ getOperation(item.workItems[0]) }}</span>
                  </div>
                </div>
                <div
                  class="remarks"
                  v-if="item.workItems[0].opinion && item.workItems[0].showRemarks"
                >
                  <div class="remarks-txt">
                    备注:
                  </div>
                  <div class="remarks-value">
                    {{ item.workItems[0].opinion || '-' }}
                  </div>
                </div>
              </div>
              <div
                class="stepinfo-multiple"
                v-if="item.workItems && item.workItems.length > 1"
              >
                <div class="stepinfo-multiple-nodename">{{ item.name }}</div>
                <div
                  class="stepinfo-multiple-nodeinfo"
                  v-for="el,ind in item.workItems"
                  :key="ind"
                >
                  <div class="nodeinfo">
                    <div class="left">
                      <span>{{el.operationTime || el.dueTime}}</span>
                      <span
                        v-if="el.opinion"
                        @click="changeShowRemarks(el)"
                      >
                        <span class="control-txt">{{
                            el.showRemarks ? "收起" : "展开"
                          }}</span>
                        <i
                          v-show="!el.showRemarks"
                          class="el-icon-arrow-down"
                        />
                        <i
                          v-show="el.showRemarks"
                          class="el-icon-arrow-up"
                        />
                      </span>
                    </div>
                    <div class="right">
                      <span>操作人员：{{el.workItemAccount.fullName}}</span>
                      <span
                        class="dot"
                        v-if="getOperation(el)"
                      ></span>
                      <span>{{getOperation(el)}}</span>
                    </div>
                  </div>
                  <div
                    class="remarks"
                    v-if="el.opinion && el.showRemarks"
                  >
                    <div class="remarks-txt">
                      备注:
                    </div>
                    <div class="remarks-value">
                      {{ el.opinion || '-' }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </el-step>
      </el-steps>
    </div>
  </div>
</template>

<script>
export default {
  props: ['stepData', 'config'],
  data() {
    return {
      isShowRemarks: []
    };
  },
  computed: {
    scssStyle() {
      return {
        '--mainColor': this.config.box.mainColor
      };
    }
  },
  mounted() {
    this.getShowRemarkData();
  },
  methods: {
    getShowRemarkData() {
      this.isShowRemarks = [];
      this.stepData.forEach((item) => {
        item.showRemarks = [];
        console.log(item);
        item.workItems.forEach((el) => {
          el.opinion = '1111';
          if (el.opinion) {
            this.$set(el, 'showRemarks', false);
          }
        });
      });
      this.$forceUpdate();
    },
    changeShowRemarks(el) {
      console.log(el, 'pppppppppp');
      el.showRemarks = !el.showRemarks;
    },
    getOperation(item) {
      if (item.operationType == 1) {
        return '通过';
      } else if (item.operationType == 2) {
        return '否决';
      } else if (item.operationType == 9) {
        return '上报事件';
      } else if (item.operationType == 5) {
        return '无需审批';
      } else if (!item.viewTime) {
        return '未查看';
      } else if (item.operationType == 0) {
        return '待审核';
      }
    }
  }
};
</script>

<style lang="scss" scoped>
::-webkit-scrollbar {
  width: 5px;
  height: 5px;
  border-radius: 10px;
}
// 滑块
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #adadaba4;
}
// 轨道
::-webkit-scrollbar-track {
  border-radius: 10px;
  background-color: #fff;
}
</style>

<style lang="scss">
.step-box {
  .table-head {
    font-family: Alibaba PuHuiTi 2;
    color: #fff;
    padding-left: 40px;
    background-size: 100% 100%;
    margin-bottom: 15px;
  }

  .el-step__head {
    border-color: var(--mainColor);

    &.is-wait {
      color: #0e1e30;
      border-color: var(--mainColor);
    }
    .el-step__line {
      width: 1px;
      background-color: var(--mainColor);
    }
    .el-step__icon {
      background-color: var(--mainColor);
    }
  }

  .el-step__description {
    padding-right: 0 !important;
  }

  .el-step {
    flex-basis: 0% !important;
  }

  .step-content {
    padding-bottom: 30px;

    .stepinfo-single {
      width: 100%;
      .nodeinfo {
        display: flex;
        justify-content: space-between;
      }
      &-left {
        .step-time {
          color: #99b3c8;
          margin-top: 5px;
          font-size: 14px;
        }
        .step-txt-box {
          display: flex;
          color: var(--mainColor);
          font-size: 16px;
          .control-box {
            font-size: 14px;
            display: flex;
            align-items: center;
            margin-left: 10px;
            color: var(--mainColor);
            cursor: pointer;
            .control-txt {
              margin-right: 5px;
            }
          }
        }
      }
      &-right {
        display: flex;
        align-items: center;
        height: 20px;
        span:nth-child(1) {
          color: #fff;
        }
        span:nth-child(2) {
          width: 6px;
          height: 6px;
          border-radius: 6px;
          background-color: #fff;
          margin-left: 10px;
        }
        span:nth-child(3) {
          margin-left: 5px;
        }
      }
    }

    .stepinfo-multiple {
      &-nodename {
        font-size: 16px;
        color: var(--mainColor);
      }
      &-nodeinfo {
        margin-bottom: 10px;
        font-size: 14px;
        .nodeinfo {
          display: flex;
          justify-content: space-between;
        }
        .left > span:nth-child(1) {
          margin-right: 10px;
        }
        .left > span:nth-child(2) {
          cursor: pointer;
        }

        .control-txt,
        i {
          color: var(--mainColor);
        }

        .right {
          display: flex;
          align-items: center;
          span:nth-child(1) {
            color: #fff;
          }
          span:nth-child(2) {
            width: 6px;
            height: 6px;
            border-radius: 6px;
            background-color: #fff;
            margin-left: 10px;
          }
          span:nth-child(3) {
            margin-left: 5px;
          }
        }
      }
    }

    .remarks {
      display: flex;
      padding: 10px;
      font-size: 14px;
      background: #0e1e30;
      margin-top: 10px;
      .remarks-txt {
        width: 36px;
        color: #999;
      }
      .remarks-value {
        width: calc(100% - 36px);
      }
    }
  }
}
</style>