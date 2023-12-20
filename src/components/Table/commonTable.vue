<template>
  <div
    class="table-box"
    :style="sassStyle"
    v-show="isShowModuleFunc(config)"
  >
    <Common-table
      v-if="config.showDataType === 'table'"
      :config="config"
      :tableHead="config.data.tableHead"
      :offsetHeight="offsetHeight"
      @handleRowClick="handleRowClick"
    ></Common-table>
    <div
      v-else
      :style="{ height: config.table.height + 'px' }"
    >
      <el-scrollbar style="height: 100%">
        <div class="list-box">
          <div
            v-for="(item, index) in config.data.tableData"
            :key="index"
            :style="styleObj7"
            class="box"
            ref="eventDom"
            @click="handleRowClick(item)"
          >
            <div
              class="data-box"
              v-for="(v, i) in config.data.cardData"
              :key="i"
              :style="styleObj9(v)"
            >
              <div
                class="img-box"
                v-if="v.value.includes('img')"
              >
                <el-image
                  style="width: 100%; height: 100%"
                  :src="
                    item[v.value].includes('http')
                      ? item[v.value]
                      : imgUrl + item[v.value]
                  "
                  :preview-src-list="
                    item[v.value].includes('http')
                      ? [item[v.value]]
                      : [imgUrl + item[v.value]]
                  "
                  @click.native.stop
                >
                  <div
                    slot="error"
                    class="image-slot"
                    style="max-width: 100%; max-height: 100%"
                  >
                    <img
                      style="max-width: 100%; max-height: 100%"
                      src="@/assets/image/xiaokunshan/default-img.png"
                      alt=""
                    />
                  </div>
                </el-image>
              </div>
              <div
                class="title txt-ellipsis"
                v-else
              >
                <span v-if="v.label">{{ v.label }}:</span>
                {{ item[v.value] }}
              </div>
            </div>
            <div class="btn">
              <div
                v-for="(v, i) in config.data.buttonData"
                :key="i"
                class="txt-box"
                :style="styleObj8(v, i, item)"
              >
                {{ item[v.value] }}
              </div>
            </div>
          </div>
        </div>
      </el-scrollbar>
    </div>
    <el-pagination
      ref="pagination"
      v-if="config.pagination.show && config.data.tableData.length > 0"
      layout="prev, pager, next, total,jumper"
      :page-size="config.requestParams.pageSize * 1"
      :total="config.data.total"
      :current-page="config.requestParams.page"
      @current-change="getMoreEnventList"
    >
    </el-pagination>
  </div>
</template>

<script>
import CommonTable from '../commonTable/index.vue';
import { setStyleObj, toLoadData, hexToRgba } from '@/utils/index.js';
import { loadCustomApiData } from '@/utils/api';
import apiDataProcessing from '../../views/componments/apiDataProcessing.js';
export default {
  props: {
    config: {
      type: Object
    },
    callBack: {
      type: Function,
      default: () => {
        return () => {};
      }
    }
  },
  components: { CommonTable },
  data() {
    return {
      imgUrl: 'https://www.sjxks.com',
      timevalue: '',
      filter: {},
      eventSourceData: [
        { name: '选项一', rowid: 1 },
        { name: '选项二', rowid: 2 }
      ],
      offsetHeight: 0,
      isShow: true,
      active: 1
    };
  },
  watch: {
    'config.requestParams.pageSize'(nVal) {
      if (nVal) {
        this.config.requestParams.page = 1;
        this.toLoadData();
      }
    },
    'config.showDataType'() {
      console.log(this.config.showDataType, '===showDataType');
    },
    'config.data': {
      handler(nVal) {
        // console.log(nVal, "====nVal");
      },
      deep: true
    },
    'config.isShowModule'(nVal) {
      console.log(nVal, '====nVal');
      if (nVal) {
        this.config.requestParams.page = 1;
      }
    }
  },
  created() {
    // this.toLoadData();
    this.setTableHeadStyle();
  },
  methods: {
    handleRowClick(item) {
      console.log('item:::::::', item);
      this.callBack && this.callBack(item);
    },
    showPopper() {
      setTimeout(() => {
        let daterangeDom = document.getElementsByClassName('cockpit-daterange');
        let timeDom = document.getElementsByClassName('el-time-panel');
        for (let item of daterangeDom) {
          item.style.background = this.config.dropdownBox.boxbackground;
          item.style.border =
            '1px' + ' solid ' + this.config.dropdownBox.borderColor;
        }
        for (let item of timeDom) {
          item.style.background = this.config.dropdownBox.timebackground;
        }
      }, 0);
    },
    // 加载接口数据
    async toLoadData() {
      this.config.data = await toLoadData(this.config, 'commonTable');
      // this.$emit("changeValue", "data", "tableData", data.tableData);
    },
    getMoreEnventList(val) {
      this.config.requestParams.page = val;
      // this.$emit("changeValue", "requestParams", "page", val);
      this.toLoadData();
    },
    setTableHeadStyle() {
      let l = this.config.data.tableData;
      this.config.data.tableKeyData = l[0] && Object.keys(l[0]);
      // this.$emit(
      //   "changeValue",
      //   "data",
      //   "tableKeyData",
      //   l[0] && Object.keys(l[0])
      // );
      // let t = { ...this.config.tableHeadStyle };
      let t = this.config.tableHeadStyle;
      if (!t.styleData) {
        this.$set(t, 'styleData', []);
      }
      if (!t.buttonStyleData) {
        this.$set(t, 'buttonStyleData', []);
      }
      this.config.data.tableHead.forEach((item, i) => {
        if (!t.styleData[i]) {
          t.styleData.push({
            width: '',
            color: '#fff',
            colorData: []
          });
        }
      });
      this.config.data.buttonData.forEach((item, i) => {
        if (!t.buttonStyleData[i]) {
          t.buttonStyleData.push({
            colorData: [],
            isShowBorder: false
          });
        }
      });
      // this.$emit("changeSize", "tableHeadStyle", t);
    }
  },
  computed: {
    styleObj7() {
      let d = setStyleObj({ ...this.config.card });
      return d;
    },
    styleObj8() {
      return function (v, i, item) {
        let d = setStyleObj({ ...this.config.card.button });
        let s = setStyleObj(v);
        let b = this.config.tableHeadStyle.buttonStyleData[i];
        if (b.colorData.length > 0) {
          b.colorData.forEach((val) => {
            if (val.label == item[v.value]) {
              s.color = val.color;
            }
          });
        }
        let r;
        if (s.color.includes('#')) {
          r = hexToRgba(s.color);
        } else {
          r = s.color.slice(0, s.color.lastIndexOf(','));
        }
        s.background = r + ',0.1)';
        if (b.isShowBorder) {
          s.borderWidth = '1px';
          s.borderStyle = 'solid';
          s.borderColor = r + ',.5)';
        }
        Object.assign(d, s);
        return d;
      };
    },
    styleObj9() {
      return function (v) {
        let d = setStyleObj(v);
        return d;
      };
    },
    sassStyle() {
      return {
        '--btnLine': this.config.card.button.height + 'px',
        '--paginationMarginTop': this.config.pagination.marginTop + 'px',
        '--paginationBackground': this.config.pagination.background,
        '--paginationColor': this.config.pagination.color,
        '--paginationActiveBackground': this.config.pagination.activeBackground,
        '--paginationActiveColor': this.config.pagination.activeColor,
        height: this.config.height + 'px'
      };
    }
  }
};
</script>
<style lang="scss" scoped>
// @import "../../styles/darkTable.scss";
.table-box {
  pointer-events: all;
  ::v-deep .el-scrollbar__wrap {
    overflow-y: scroll;
    overflow-x: hidden;
  }
  .pagination {
    height: 40px;
    line-height: 40px;
    text-align: center;
    margin-top: 10px;
  }
  ::v-deep .el-pagination {
    margin-top: var(--paginationMarginTop);
    color: var(--paginationColor);
    display: flex;
    justify-content: center;
    .btn-prev,
    .btn-next {
      background: var(--paginationBackground);
    }
    .btn-next {
      margin-left: 10px;
    }
    .el-pager {
      li {
        background: var(--paginationBackground);
        color: var(--paginationColor);
        margin-left: 10px;
      }
      li.active {
        background: var(--paginationActiveBackground);
        color: var(--paginationActiveColor);
      }
    }
    .el-pagination__total {
      margin: 0 30px 0 10px;
      color: var(--paginationColor);
    }
    .el-pagination__jump {
      margin-left: 24px;
      color: var(--paginationColor);
      .el-pagination__editor {
        margin: 0 6px;
        .el-input__inner {
          background: var(--paginationBackground);
          color: var(--paginationColor);
          border: 0;
        }
      }
    }
  }
  .list-box {
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px;
    padding: 0 10px;
    // overflow-y: auto;
    .box {
      padding: 0 10px;
      .img-box {
        width: 100%;
        height: 100%;
        margin-bottom: 5px;
        position: relative;
        ::v-deep.el-image {
          .el-image__inner {
            max-width: 100% !important;
            max-height: 100% !important;
            width: auto !important;
            height: auto !important;
            position: absolute;
            left: 0;
            bottom: 0;
            top: 0;
            right: 0;
            margin: auto;
          }
          .image-slot {
            padding-top: 5px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
      }
    }
    .btn {
      display: flex;
      margin-top: 5px;
      .txt-box {
        line-height: var(--btnLine);
        margin-right: 10px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        padding: 0 5px;
      }
    }
  }
}
</style>
