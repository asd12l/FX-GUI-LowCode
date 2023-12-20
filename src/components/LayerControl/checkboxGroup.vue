<!--
 * @Descripttion: 说明
 * @version: V1.0
 * @Author: 卜倩倩
 * @Date: 2023-07-25 16:40:17
 * @LastEditors: 卜倩倩
 * @LastEditTime: 2023-11-22 12:52:32
-->
<template>
  <div
    class="checkboxGroup-wrapper"
    v-show="isShowModuleFunc(config)"
    :style="{ width: config.width + 'px', height: config.height + 'px', backgroundImage: 'url('+config.icon.backgroundUrl+')' }"
  >
    <div class="top">
      <el-checkbox
        :style="{ width: config.icon.width + 'px' }"
        :indeterminate="isIndeterminate"
        v-model="checkAll"
        @change="handleCheckAllChange"
      ></el-checkbox>
      <span :style="{
          width: config.label.width + 'px',
          color: config.label.color,
          fontSize: config.label.fontSize + 'px',
          fontFamily: config.label.fontFamily,
          fontStyle: config.label.fontStyle,
          textAlign: config.label.textAlign,
          fontWeight: config.label.fontWeight,
          letterSpacing: config.label.letterSpacing + 'px',
        }">{{ checkAll ? "取消全选" : "全选" }}</span>
    </div>
    <div class="bottom">
      <div
        class="rows"
        v-for="(splitArr, index) in list"
        :key="index"
      >
        <div
          class="block"
          :style="{
            width: config.box.width + 'px',
            height: config.box.height + 'px',
          }"
          v-for="(item, inx) in splitArr"
          :key="item.rowid"
        >
          <div
            ref="eventDom"
            class="radio-wrap"
            style="display: inline-block ;"
          >
            <el-checkbox
              :key="item.rowid"
              label=""
              :true-label="1"
              :false-label="0"
              v-model="item.is_selected"
              @change="handleCheckSingleChange(item, index, inx)"
            ></el-checkbox>
          </div>
          <!-- {{item.default_icon}} -->
          <img
            v-if="item.default_icon"
            :style="{
              width: config.icon.width + 'px',
              height: config.icon.height + 'px',
            }"
            :src="item.default_icon"
            alt=""
          />
          <span :style="{
              width: config.label.width + 'px',
              color: config.label.color,
              fontSize: config.label.fontSize + 'px',
              fontFamily: config.label.fontFamily,
              fontStyle: config.label.fontStyle,
              textAlign: config.label.textAlign,
              fontWeight: config.label.fontWeight,
              letterSpacing: config.label.letterSpacing + 'px',
              marginRight: config.label.marginRight,
              pointerEvents: 'none!important'
            }">{{ item.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
  data() {
    return {
      list: [],
      checkAll: false,
      checkedItems: [],
      isIndeterminate: false,
      IMG_URL:
        window.location.host.includes('localhost') ||
        window.location.host.includes('192.168') ||
        window.location.host.includes('127.0.0.1')
          ? 'https://www.sjxks.com'
          : window.location.protocol + '//' + window.location.host
    };
  },
  watch: {
    config: {
      handler(nl) {
        if (nl.data.length && this.config.label.columns) {
          let data;
          if (this.config.box.page_name) {
            let page_name =
              this.config.box.page_name || window.location.hash.slice(2);
            data = nl.data.filter((item) => item.page_name === page_name);
          } else {
            data = nl.data;
          }
          data = data.map((item) => {
            return {
              ...item,
              is_selected:
                item.is_selected === '是' || item.is_selected === 1 ? 1 : 0
            };
          });
          this.splitArray(data, this.config.label.columns);
          this.checkedItems = data.filter((item) => item.is_selected);
          if (this.checkedItems.length === data.length) {
            this.isIndeterminate = false;
            this.checkAll = true;
          } else if (!this.checkedItems.length) {
            this.isIndeterminate = false;
            this.checkAll = false;
          } else {
            this.isIndeterminate = true;
            this.checkAll = false;
          }
        }
      },
      deep: true,
      immediate: true
    }
  },
  mounted() {
    // this.splitArray(this.config.data, this.config.label.columns);
    // this.callBack && this.callBack(this.checkedItems)
  },
  methods: {
    splitArray(data, length) {
      let list = [];
      const arr = data.map((item) => {
        return {
          ...item
        };
      });
      for (let i = 0; i < arr.length; ) {
        list.push(arr.splice(i, length));
      }
      this.list = list;
    },
    handleCheckAllChange(val) {
      this.checkedItems = val ? this.config.data : [];
      // this.callBack && this.callBack(val);
      this.callBack &&
        this.callBack({ data: this.config.data, isAllSelected: val });
      let data = this.config.data;
      this.isIndeterminate = false;
      this.list.forEach((item, index) => {
        item.forEach((el, inx) => {
          console.log(val, el.is_selected);
          if (Boolean(el.is_selected) !== val) {
            el.is_selected = val;
            this.handleCheckSingleChange(el, index, inx);
            // this.$refs[item.id][0].$children[0].$refs.eventDom
            // console.log("this.$refs['eventDom']:::::::::::",    this.$refs['eventDom'][index].click)
          }

          data.forEach((v) => {
            if (v.rowid === el.rowid && v.is_selected !== val) {
              v.is_selected = val;
            }
          });
        });
      });
      this.$emit('changeSize', 'data', data);
    },
    handleCheckSingleChange(item, rowIndex, colIndex) {
      let data = this.config.data;

      this.$refs['eventDom'][
        rowIndex * this.config.label.columns + colIndex
      ].click();
      this.callBack && this.callBack(item);
      data.forEach((v) => {
        if (v.rowid === item.rowid) {
          v.is_selected = item.is_selected;
        }
      });
      console.log(data);
      this.$emit('changeSize', 'data', data);
      // this.callBack && this.callBack(item)
      let arr = [].concat.apply([], this.list);
      if (
        arr.filter((item) => item.is_selected).length &&
        arr.filter((item) => item.is_selected).length < arr.length
      ) {
        this.isIndeterminate = true;
      } else if (arr.filter((item) => item.is_selected).length === arr.length) {
        this.isIndeterminate = false;
        this.checkAll = true;
      } else {
        this.isIndeterminate = false;
        this.checkAll = false;
      }
    }
  }
};
</script>

<style lang="scss">
.checkboxGroup-wrapper {
  padding: 20px;
  pointer-events: none;
  background-size: 100% 100%;

  .el-checkbox__label {
    width: 100px;
    font-weight: var(--fontWeight);
    font-style: italic;
    text-align: left;
  }

  .el-checkbox__inner {
    z-index: 0;
  }

  .el-checkbox__input.is-checked .el-checkbox__inner {
    width: 15px;
    height: 15px;
    background-color: #1b7ef2 !important;
    border-color: #1b7ef2 !important;

    &::after {
      border-color: #143452;
    }
  }

  .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background-color: #1b7ef2;
    &::before {
      background-color: #143452;
    }
  }

  .top {
    margin-bottom: 20px;
    display: flex;
    align-items: center;

    .el-checkbox {
      display: flex;
      justify-content: center;
      pointer-events: all;
    }

    > span {
      margin-left: 15px;
    }
  }

  .bottom {
    .rows {
      width: 100%;
      display: flex;

      .radio-wrap {
        margin-right: 20px;

        .el-checkbox {
          flex: 1;
          display: flex;
          align-items: center;

          pointer-events: all;

          .el-checkbox__label {
            flex: 1;
          }
        }
      }
    }
    .block {
      display: flex;
      align-items: center;
      flex-shrink: 0;
      margin-right: 30px;

      > span {
        margin: 0 15px;
      }
    }
  }
}
</style>