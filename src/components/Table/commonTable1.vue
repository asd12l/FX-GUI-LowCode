<template>
  <div
    class="table-box"
    :style="sassStyle"
    v-show="isShowModuleFunc(config)"
  >
    <div
      class="box"
      :style="styleObj1"
    >
      <div
        class="top"
        :style="styleObj2"
        v-show="config.header.show"
      >
        <div class="top-left">
          <img
            :src="config.header.icon"
            v-if="config.header.icon"
            class="icon"
          />
          <div
            :class="['title', config.headerTxt.isShowColors ? 'gradient' : '']"
            :style="{
              background: config.headerTxt.isShowColors
                ? config.headerTxt.background
                : '',
            }"
          >
            {{ config.header.txt }}
          </div>
        </div>
        <div class="top-right">
          <div
            class="tab-list"
            v-if="config.tab.isShowChange"
          >
            <div
              :class="['tab', 'tab1', active == 'table' ? 'active1' : '']"
              @click="active = 'table'"
            />
            <div
              :class="['tab', 'tab2', active == 'card' ? 'active2' : '']"
              @click="active = 'card'"
            />
          </div>
          <div
            v-show="config.close.show"
            class="close"
            :style="styleObj3"
            @click="closeBox"
          ></div>
        </div>
      </div>
      <div
        class="middle"
        ref="middle"
        :style="styleObj4"
        v-if="config.otherData.selectTypeData.length > 0"
      >
        <div
          class="select-box"
          v-for="item in config.otherData.selectTypeData"
          :key="item.id"
          :style="styleObj5(item)"
        >
          <span
            style="margin-right: 8px;"
            v-if="item.isShowLabel"
          >{{
            item.label
          }}</span>
          <span v-if="item.seletedType === 'dateTimePicker'">
            <el-date-picker
              v-model="timevalue"
              popper-class="cockpit-daterange"
              type="datetimerange"
              value-format="yyyy-MM-dd HH:mm:ss"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :style="styleObj6(item)"
              @focus="showPopper"
              @change="(val) => changeData(val, item, 'dateTimePicker')"
              size="mini"
            />
          </span>
          <span
            class="search"
            v-if="item.seletedType === 'search'"
          >
            <el-input
              v-model="filter[item.value]"
              :placeholder="`请输入${item.label}搜索`"
              size="mini"
              :style="styleObj6(item)"
              @change="(val) => changeData(val, item, 'search')"
            >
              <el-button
                slot="append"
                icon="el-icon-search"
                @click.stop="
                  () => changeData(filter[item.value], item, 'search')
                "
              >
                搜索
              </el-button>
            </el-input>
            <i />
          </span>
          <span v-if="item.seletedType === 'select'">
            <el-select
              v-model="filter[item.value]"
              class="cockpit-select-blue"
              popper-class="cockpit-select"
              placeholder="请选择"
              :style="styleObj6(item)"
              :popper-append-to-body="false"
              clearable
              @change="(val) => changeData(val, item, 'select')"
            >
              <el-option
                v-for="item in optionData[item.value]"
                :key="item.key"
                :label="item.value"
                :value="item.key"
              />
            </el-select>
          </span>
        </div>
      </div>
      <div
        v-if="active === 'table'"
        :style="tableStyle"
      >
        <Common-table
          :config="config"
          :tableHead="config.otherData.tableHead"
          :offsetHeight="offsetHeight"
          @handleRowClick="handleRowClick"
        ></Common-table>
      </div>
      <div
        v-else
        :style="{
          height: config.table.height + 'px',
        }"
      >
        <el-scrollbar style="height: 100%">
          <div class="list-box">
            <div
              v-for="(item, index) in config.data.tableData"
              :key="index"
              :style="styleObj7"
              class="box"
              ref="eventDom"
            >
              <div
                class="data-box"
                v-for="(v, i) in config.otherData.cardData"
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
                  <span v-if="v.isShowLabel">{{ v.label }}:</span>
                  {{ item[v.value] }}
                </div>
              </div>
              <div class="btn">
                <div
                  v-for="(v, i) in config.otherData.buttonData"
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
  </div>
</template>

<script>
import CommonTable from '../commonTable/index.vue';
import { setStyleObj, toLoadData, isJSON } from '@/utils/index.js';
import { loadCustomApiData } from '@/utils/api';
import apiDataProcessing from '../../views/componments/apiDataProcessing.js';
import { getWorksheetControls } from '@/utils/api';
export default {
  props: {
    config: {
      type: Object
    },
    callBack: {
      type: Function
    },
    changeSize: {
      type: Function
    },
    changeValue: {
      type: Function
    }
  },
  components: { CommonTable },
  data() {
    return {
      imgUrl: 'https://www.sjxks.com',
      option: {},
      timevalue: '',
      filter: {},
      offsetHeight: 0,
      isShow: true,
      active: 1,
      optionData: {},
      filters: [],
      active: ''
    };
  },
  watch: {
    'config.requestParams.pageSize'(nVal) {
      if (nVal) {
        this.config.requestParams.page = 1;
        this.toLoadData();
      }
    },
    'config.otherData.showData': {
      handler(nl, ol) {
        console.log(nl, ol, '=====nl1111111');
        this.getData();
      },
      deep: true,
      immediate: false
    },
    'config.otherData.selectTypeData': {
      handler(nVal, oVal) {
        // let n = JSON.stringify(nVal.map((item) => item.controlId));
        // let o = JSON.stringify(oVal.map((item) => item.controlId));
        // console.log(nVal, oVal, n, o);
        // if (n !== o) {
        this.getSelected();
        // }
      },
      deep: true
    },
    'config.showDataType'(nVal) {
      this.active = nVal;
    }
  },
  created() {
    this.active = this.config.showDataType;
    // this.toLoadData();
    this.setTableHeadStyle();
    this.getData();
    this.getSelected();
  },
  methods: {
    handleRowClick(item) {
      this.callBack && this.callBack(item);
    },
    // 加载接口数据
    async toLoadData() {
      if (this.config.sourceType === 'api') {
        let data = await toLoadData(this.config, 'commonTable');
        this.setTableHeadStyle();
        this.$emit('changeSize', 'data', data);
      } else {
        let data = await toLoadData(this.config, 'commonTable');
        // this.config.data = {
        //   tableData: data.rows,
        //   total: data.total,
        // };
        this.$emit('changeSize', 'data', {
          tableData: data.rows,
          total: data.total
        });
      }
    },
    getMoreEnventList(val) {
      // this.config.requestParams.page = val;
      this.$emit('changeValue', 'requestParams', 'page', val);
      this.toLoadData();
    },
    getData() {
      let d = JSON.parse(JSON.stringify(this.config.otherData.showData));
      let tableHead = [],
        card = [],
        button = [],
        select = [],
        selectType = [];
      d.forEach((item) => {
        if (item.location.indexOf('table') > -1) {
          tableHead.push(item);
        }
        if (item.location.indexOf('card') > -1) {
          card.push(item);
        }
        if (item.location.indexOf('button') > -1) {
          button.push(item);
        }
        if (item.seletedType) {
          let type = item.seletedType;
          let seletedType;
          switch (type) {
            case 'dateTimePicker':
            case '日期和时间':
              seletedType = 'dateTimePicker';
              break;
            case 'select':
            case '单选':
            case '等级':
              seletedType = 'select';
              break;
            case 'search':
            case '文本框':
            case '自动编号':
              seletedType = 'search';
              break;
            default:
              seletedType = 'search';
              break;
          }
          item.seletedType = seletedType;
          select.push(item);
          // if (seletedType !== "search") {
          //   select.push(item);
          // } else {
          //   let seat = selectType.indexOf(seletedType);
          //   let controlId = [];
          //   controlId.push(item.controlId);
          //   if (seat === -1) {
          //     let item1 = { ...item };
          //     let sort = select.length + 1;
          //     item1.label = "关键字";
          //     item1.value = "keyword";
          //     item1.controlId = controlId;
          //     select.push(item1);
          //   }
          // }
          // selectType.push(item.seletedType);
        }
      });
      this.dealDiffData(
        tableHead,
        [...this.config.otherData.tableHead],
        'tableHead'
      );
      this.dealDiffData(card, [...this.config.otherData.cardData], 'cardData');
      this.dealDiffData(
        button,
        [...this.config.otherData.buttonData],
        'buttonData'
      );
      this.dealDiffData(
        select,
        [...this.config.otherData.selectTypeData],
        'selectTypeData'
      );
    },
    /**
     * d1 展示数据中处理得来的数据
     * d2 相关类型上次保存的数据
     * type 数据类型
     */
    dealDiffData(d1, d2, type) {
      let value1 = d1.map((item) => item.label);
      let value2 = d2.map((item) => item.label);
      // d2中有d1中没有的key 把d2中的数据删除
      value2.forEach((item, i) => {
        let seat = value1.indexOf(item);
        if (seat === -1) {
          d2.splice(i, 1, '');
        }
      });
      /**
       * d1中有d2没有的key d2中添加相关数据  d1和d2都有的key
       * d2的label改成d1中的数据(table修改label)
       *  */
      // if (d2.length === 0) {
      let index = 0;
      value1.forEach((item, i) => {
        let seat = value2.indexOf(item);
        if (seat > -1) {
          let i1 = i;
          if (d1[i1] && d2[seat]) {
            if (type === 'selectTypeData') {
              d2[seat].seletedType = d1[i1].seletedType;
              d2[seat].controlId = d1[i1].controlId;
              d2[seat].type = d1[i1].type;
            }
            // d2[seat].label = d1[i1].label;
            d2[seat].value = d1[i1].value;
          }
        } else {
          let sort = d2.length + 1;
          if (type === 'tableHead') {
            d2.push({
              label: d1[i].label,
              value: d1[i].value,
              width: '',
              color: '#fff',
              colorData: [],
              sort: sort
            });
          } else if (type === 'cardData') {
            let width = '';
            let height = '';
            if (d1[i].value.indexOf('img') > -1) {
              width = 250;
              height = 146;
            }
            d2.push({
              label: d1[i].label,
              value: d1[i].value,
              isShowLabel: false,
              width,
              height,
              sort
            });
          } else if (type === 'buttonData') {
            d2.push({
              label: d1[i].label,
              value: d1[i].value,
              width: 80,
              color: 'rgba(255, 151, 77, 1)',
              colorData: [],
              isShowBorder: false,
              sort
            });
          } else if (type === 'selectTypeData') {
            d2.push({
              label: d1[i].label,
              seletedType: d1[i].seletedType,
              type: d1[i].type,
              value: d1[i].value,
              controlId: d1[i].controlId,
              type: d1[i].type,
              isShowLabel: true,
              width: '',
              marginLeft: 20,
              marginTop: 20,
              sort
            });
          }
          index++;
        }
      });
      // }
      let reduceI = 0;
      let d = [];
      d2.forEach((v, i) => {
        let index = i - reduceI + 1;
        if (v) {
          v.sort = index;
          d.push(v);
        } else {
          reduceI++;
        }
      });
      this.config.otherData[type] = d;
      // this.$emit("changeValue", "otherData", type, d);
    },
    setTableHeadStyle() {
      let l = this.config.data.tableData;
      this.config.otherData.tableKeyData = l[0] && Object.keys(l[0]);
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
    async getSelected() {
      let s = [];
      let t = [];
      this.config.otherData.selectTypeData.forEach((item) => {
        if (item.seletedType === 'select' && item.controlId) {
          s.push(item.controlId);
          t.push(item);
        }
      });
      if (s.length > 0) {
        const { data } = await getWorksheetControls({
          worksheetId: this.config.worksheetId,
          getRelationSearch: true
        });
        let d = data.data.controls;
        console.log(s, d, '====d');
        d.forEach((item) => {
          let seat = s.indexOf(item.controlId);
          if (seat > -1) {
            console.log(t[seat], item);
            if (!this.optionData[t[seat].value]) {
              this.$set(this.optionData, t[seat].value, []);
              // this.optionData[t[seat].value] = [];
            }
            if (t[seat].type === '等级') {
              let o = JSON.parse(item.advancedSetting.itemnames);
              this.$set(this.optionData, t[seat].value, o);
            } else {
              // this.optionData[t[seat].value] = item.options;
              this.$set(this.optionData, t[seat].value, item.options);
            }
          }
        });
      }
      console.log(this.optionData, '====optionData');
    },
    changeData(val, item, filter) {
      if (val) {
        let obj = {};
        let value = val;
        let type = item.type;
        let dataType;
        let filterType;
        switch (type) {
          case '等级':
            dataType = 28;
            break;
          case '单选':
            dataType = 11;
            break;
          case '文本框':
            dataType = 2;
            break;
          case '自动编号':
            dataType = 33;
            break;
          case '时间和日期':
            dataType = 16;
            break;
        }
        if (filter === 'select') {
          filterType = 2;
        } else if (filter === 'search') {
          filterType = 1;
        } else if (filter === 'dateTimePicker') {
          filterType = 31;
          (value = ''),
            (obj = {
              minValue: val[0],
              maxValue: val[1]
            });
        }
        if (this.filters.length === 0) {
          this.filters.push({
            controlId: item.controlId,
            dataType,
            spliceType: 1,
            filterType,
            value,
            ...obj
          });
        } else {
          let id = this.filters.map((item) => item.controlId);
          let seat = id.indexOf(item.controlId);
          if (seat === -1) {
            this.filters.push({
              controlId: item.controlId,
              dataType,
              spliceType: 1,
              filterType,
              value,
              ...obj
            });
          } else {
            this.filters[seat].value = val;
          }
        }
      } else {
        let id = this.filters.map((item) => item.controlId);
        let seat = id.indexOf(item.controlId);
        if (seat > -1) {
          this.filters.splice(seat, 1);
        }
      }
      this.config.requestParams.filters = this.filters;
      this.config.requestParams.page = 1;
      this.toLoadData();
      console.log(val, item, '===item');
    },
    closeBox() {
      this.$emit('changeSize', 'isShowModule', false);
      this.$emit('changeValue', 'requestParams', 'page', 1);
      this.filters = [];
    }
    // changeKeyword(item){
    //   let type = item.type;

    //   let dataType;
    //     switch (type) {
    //       case "文本框":
    //         dataType = 2;
    //         break;
    //       case "自动编号":
    //         dataType = 33;
    //         break;
    //     }
    // }
  },
  computed: {
    tableStyle() {
      return setStyleObj({
        margin: this.config.table.margin
      });
    },
    styleObj1() {
      let c = { ...this.config };
      let d = setStyleObj(c);
      let b = c.box;
      if (b.isShowBackgroundImg) {
        b.background && (d.background = `url(${b.background}) no-repeat`);
      } else {
        b.background && (d.background = b.background);
        b.borderWidth && (d.borderWidth = b.borderWidth + 'px');
        b.borderStyle && (d.borderStyle = b.borderStyle);
        if (b.isShowColors) {
          b.borderImage && (d.borderImage = b.borderImage);
        } else {
          b.borderColor && (d.borderColor = b.borderColor);
        }
      }
      return d;
    },
    styleObj2() {
      let d = setStyleObj({ ...this.config.header });
      d.display = d.display === 'block' ? 'flex' : 'none';
      return d;
    },
    styleObj3() {
      let d = setStyleObj({ ...this.config.close });
      return d;
    },
    styleObj4() {
      let d = setStyleObj({
        margin: this.config.selection.margin
      });
      return d;
    },
    styleObj5() {
      return function (item) {
        let d = setStyleObj({
          color: this.config.selection.color,
          fontSize: this.config.selection.fontSize,
          marginLeft: item.marginLeft,
          marginTop: item.marginTop
        });
        return d;
      };
    },
    styleObj6() {
      return function (item) {
        let d = setStyleObj(item);
        let s = setStyleObj(this.config.selection);
        delete s.fontSize;
        delete s.margin;
        delete d.marginLeft;
        delete d.marginTop;
        Object.assign(d, s);
        return d;
      };
    },
    styleObj7() {
      let d = setStyleObj({ ...this.config.card });
      return d;
    },
    styleObj8() {
      return function (v, i, item) {
        let d = setStyleObj({ ...this.config.card.button });
        let s = setStyleObj(v);
        let b = this.config.otherData.buttonData[i];
        if (b.colorData.length > 0) {
          b.colorData.some((val, i) => {
            if (val.label == item[v.value]) {
              // console.log(i, "=====index");
              s.color = val.color;
              return true;
            }
            // console.log(i, "=====i222222");
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
        '--selectColor': this.config.selection.color,
        '--background': this.config.dropdownBox.boxbackground,
        '--border': '1px' + ' solid ' + this.config.dropdownBox.borderColor,
        '--hoverBackground': this.config.dropdownBox.hoverBackground,
        '--btnLine': this.config.card.button.height + 'px',
        '--paginationMarginTop': this.config.pagination.marginTop + 'px',
        '--paginationBackground': this.config.pagination.background,
        '--paginationColor': this.config.pagination.color,
        '--paginationActiveBackground': this.config.pagination.activeBackground,
        '--paginationActiveColor': this.config.pagination.activeColor,
        '--selectFontSize': this.config.selection.fontSize * 1 - 2 + 'px',
        '--selectHeight': this.config.selection.height + 'px',
        '--selectFontFamily': this.config.selection.fontFamily,
        '--tabWidth': this.config.tab.width + 'px',
        '--tabHeight': this.config.tab.width + 'px',
        '--tabImg1': `url(${this.config.tab.img1}) 0% 0% / 100% 100% no-repeat`,
        '--tabActiveImg1': `url(${this.config.tab.activeImg1}) 0% 0% / 100% 100% no-repeat`,
        '--tabImg2': `url(${this.config.tab.img2}) 0% 0% / 100% 100% no-repeat`,
        '--tabActiveImg2': `url(${this.config.tab.activeImg2}) 0% 0% / 100% 100% no-repeat`,
        height: this.config.height + 'px'
      };
    }
  }
};
</script>
<style lang="scss" scoped>
// @import "../../styles/darkTable.scss";
.table-box {
  background-size: 100% 100% !important;
  pointer-events: all;
  z-index: 99;
  .box {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }
  .top {
    width: 100%;
    background-size: 100% 100% !important;
    display: flex;
    align-items: center;
    justify-content: space-between;
    &-left {
      display: flex;
      align-items: center;
      .icon {
        margin-right: 15px;
      }
    }
    &-right {
      display: flex;
      align-items: center;

      .tab-list {
        display: flex;
        cursor: pointer;
        margin-right: 20px;
        .tab {
          width: var(--tabWidth);
          height: var(--tabHeight);
        }
        .tab1 {
          background: var(--tabImg1);
        }
        .tab2 {
          background: var(--tabImg2);
        }
        .active1 {
          background: var(--tabActiveImg1);
        }
        .active2 {
          background: var(--tabActiveImg2);
        }
      }
      .close {
        background-size: 100% 100% !important;
        cursor: pointer;
      }
    }
  }
  .gradient {
    -webkit-background-clip: text !important;
    -webkit-text-fill-color: transparent;
  }
  .middle {
    display: flex;
    flex-wrap: wrap;
    .select-box {
      display: flex;
      align-items: center;
      ::v-deep .el-range-input {
        background: transparent;
      }
      ::v-deep .el-input__inner {
        background: transparent;
        border: 0;
        color: var(--selectColor);
        height: var(--selectHeight);
        line-height: var(--selectHeight);
        font-size: var(--selectFontSize);
        font-family: var(--selectFontFamily);
      }
      ::v-deep .el-range-input {
        color: var(--selectColor);
        height: var(--selectHeight);
        line-height: var(--selectHeight);
        font-size: var(--selectFontSize);
        font-family: var(--selectFontFamily);
      }
      ::v-deep .el-input-group__append {
        background: transparent;
        color: var(--selectColor);
        height: var(--selectHeight);
        line-height: var(--selectHeight);
        font-size: var(--selectFontSize);
        border: 0;
        .el-button {
          background: transparent;
          border: 0;
        }
      }
      ::v-deep .el-date-editor {
        .el-range-separator {
          display: flex;
          align-items: center;
          color: var(--selectColor);
          line-height: var(--selectHeight);
          font-size: var(--selectFontSize);
        }
      }
      ::v-deep .el-select {
        .el-input {
          height: var(--selectHeight);
          .el-input__suffix-inner {
            display: inline-block;
          }
          .el-input__icon {
            line-height: var(--selectHeight) !important;
          }
        }
      }
      ::v-deep .cockpit-select {
        background: var(--background);
        border: var(--border);
        left: 0 !important;
        .el-select-dropdown__list {
          width: 100%;
          padding: 6px 0 !important;
          .el-select-dropdown__item {
            width: 100%;
            text-align: left;
            padding: 0 20px;
            color: #fff;
          }
          .el-select-dropdown__item.hover,
          .el-select-dropdown__item:hover {
            background: var(--hoverBackground);
          }
        }
      }
    }
  }

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
      }
    }
  }
}
</style>
