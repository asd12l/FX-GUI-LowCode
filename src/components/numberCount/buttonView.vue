<template>
  <div v-show="isShowModuleFunc(config)">
    <div
      class="buttonOne"
      :style="{
        width: config.width + 'px',
        height: config.height + 'px',
      }"
    >
      <!-- 按钮 -->
      <div
        class="element"
        @click="flag = !flag"
        @mouseover="isShowTxt = true"
        @mouseleave="isShowTxt = false"
        :style="
          isShowTxt || (config.optionStyle.optionShow && flag)
            ? backgroundActive
            : backgroundImg
        "
      >
        <span
          v-show="config.buttonStyle.txtShow"
          :style="{
            color: config.buttonStyle.color,
            fontSize: config.buttonStyle.fontSize + 'px',
            lineHeight: config.buttonStyle.lineHeight + 'px',
            fontFamily: config.buttonStyle.fontFamily,
          }"
          >{{ config.buttonStyle.txt }}</span
        >
      </div>
      <!-- 鼠标滑过出现文字 -->
      <div
        class="hover"
        v-show="
          isShowTxt &&
            (!config.optionStyle.optionShow || !flag) &&
            config.buttonStyle.hoverShow
        "
        :style="hoverStyle"
      >
        {{ config.hoverStyle.txt }}
      </div>
      <!-- 下拉框 -->
      <div
        class="clickShow"
        v-show="config.optionStyle.optionShow && flag"
        :style="optionStyle"
      >
        <el-scrollbar :style="{ height: optionStyleHeight }">
          <span
            v-for="(item, i) in config.data"
            :key="item.rowid"
            ref="eventDom"
            @mouseover="(isShowBac = true), (active = i)"
            @mouseleave="isShowBac = false"
            @click.stop="setCameraView(item, i)"
            :style="{
              height: config.optionStyle.span.height + 'px',
              color: config.optionStyle.color,
              fontSize: config.optionStyle.fontSize + 'px',
              background: bacColor(i),
            }"
          >
            <div class="left">
              <img
                :src="config.optionStyle.src"
                alt=""
                :style="imgStyle"
              /><span :title="item.name">
                {{ item.name }}
              </span>
            </div>
            <img
              v-show="isShowBac && active === i"
              @click.stop="deleteRow(item.rowid, i)"
              class="right"
              src="../../assets/image/xiaokunshan/icon5.png"
              alt=""
            />
          </span>
        </el-scrollbar>
        <div v-if="showAddview" class="addview-input">
          <input
            v-model="viewname"
            placeholder="  请输入..."
            :style="inputStyle"
          />
          <div class="btns">
            <span
              @click="cancel"
              :style="{
                borderColor: config.input.borderColor,
                color: config.input.borderColor,
              }"
              >取消</span
            >
            <span
              :style="{
                background: config.input.borderColor,
              }"
              @click.stop="addPrivateView"
              >确定</span
            >
          </div>
        </div>
        <div
          class="add"
          v-if="!showAddview"
          :style="addView"
          @click.stop="showAddview = true"
        >
          {{ config.addView.txt }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { setStyleObj } from "@/utils/index.js";
import { addRow, getFilterRows, delRow } from "@/utils/api";
import { appKey, sign } from "@/utils/const.js";
export default {
  components: {},
  props: {
    config: {
      type: Object,
    },
    earth: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      active: "0",
      flag: false,
      isShowTxt: false,
      isShowBac: true,
      showAddview: false,
      viewname: "",
      id: 1,
      height: "",
      activeIndex: "0",
    };
  },
  watch: {
    config: {
      handler(nVal, oVal) {},
      deep: true,
    },
  },
  computed: {
    optionStyleHeight() {
      if (this.showAddview) {
        let num =
          Number(this.config.input.height) < 15
            ? 15
            : Number(this.config.input.height);
        this.height = `calc(100% - ${num + 35}px)`;
      } else {
        this.height = `calc(100% - ${this.config.addView.height}px)`;
      }
      return this.height;
    },
    inputStyle() {
      let d = setStyleObj({ ...this.config.input });
      return d;
    },
    hoverStyle() {
      let d = setStyleObj({ ...this.config.hoverStyle });
      return d;
    },
    backgroundImg() {
      let d = setStyleObj({ ...this.config.backgroundImg });
      return d;
    },
    backgroundActive() {
      let d = setStyleObj({ ...this.config.backgroundActive });
      return d;
    },
    optionStyle() {
      let d = setStyleObj({ ...this.config.optionStyle });
      return d;
    },
    addView() {
      let d = setStyleObj({ ...this.config.addView });
      d.lineHeight = d.height;
      return d;
    },
    imgStyle() {
      let d = { ...this.config.optionStyle.span };
      d.width = d.srcWidth && d.srcWidth + "px";
      d.height = d.srcHeight && d.srcHeight + "px";
      d.marginLeft = d.marginLeft && d.marginLeft + "px";
      d.marginRight = d.marginRight && d.marginRight + "px";
      d.background = "";
      return d;
    },
    bacColor() {
      return function(i) {
        let background = "";
        if (this.activeIndex === i) {
          background = this.config.optionStyle.span.backgroundClick;
        } else if (this.isShowBac && this.active === i) {
          background = this.config.optionStyle.span.background;
        } else {
          background = "transparent";
        }
        return background;
      };
    },
  },
  created() {},
  mounted() {
    this.angleViewList();
  },
  methods: {
    //添加视角
    addPrivateView() {
      if (this.earth && this.earth._earth) {
        const obj = this.earth._earthApi.getViewPoint();
        if (this.viewname) {
          const flag = this.config.data.filter(
            (item) => item.name == this.viewname
          );
          if (flag.length) {
            this.$message.error("名称不能重复");
          } else {
            this.addRow(obj);
          }
        } else {
          this.$message.error("名称不能为空");
        }
      } else {
        this.$message({
          message: "请先建立一个场景",
          type: "warning",
        });
        this.showAddview = false;
        this.viewname = "";
      }
    },
    //视角定位
    setCameraView(row, i) {
      if (this.earth && this.earth._earth) {
        this.activeIndex = i;
        const orientation = {
          heading: Number(row.yaw),
          pitch: Number(row.pitch),
          roll: Number(row.roll),
        };
        const destination = {
          x: Number(row.position.split(",")[0]),
          y: Number(row.position.split(",")[1]),
          z: Number(row.height),
        };
        this.earth._earthApi.setCameraView({ destination, orientation });
      } else {
        this.$message({
          message: "请先建立一个场景",
          type: "warning",
        });
      }
    },
    //视角列表
    async angleViewList() {
      const res = await getFilterRows({
        appKey: appKey,
        sign: sign,
        worksheetId: this.config.angleViewID,
        pageSize: 500,
        pageIndex: 1,
      });
      this.config.data = res.data.rows || [];
    },
    //添加视角
    async addRow(obj) {
      const res = await addRow({
        appKey: appKey,
        sign: sign,
        worksheetId: this.config.angleViewID,
        controls: [
          {
            controlId: "name",
            value: this.viewname,
          },
          {
            controlId: "position",
            value: obj.position.x + "," + obj.position.y,
          },
          {
            controlId: "height",
            value: obj.position.z,
          },
          {
            controlId: "pitch",
            value: obj.orientation.pitch,
          },
          {
            controlId: "yaw",
            value: obj.orientation.heading,
          },
          {
            controlId: "distance",
            value: obj.position.z,
          },
          {
            controlId: "roll",
            value: obj.orientation.roll,
          },
        ],
      });
      this.angleViewList();
      this.showAddview = false;
      this.viewname = "";
    },
    //删除视角
    async deleteRow(rowId, i) {
      const res = await delRow({
        appKey: appKey,
        sign: sign,
        worksheetId: this.config.angleViewID,
        pageSize: 500,
        pageIndex: 1,
        rowId,
      });
      this.config.data.splice(i, 1);
      if (this.activeIndex === i) {
        this.activeIndex = "0";
      }
    },
    cancel() {
      this.showAddview = false;
      this.viewname = "";
    },
  },
};
</script>
<style lang="scss" scoped>
.buttonOne {
  color: #fff;
  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;
  pointer-events: all;
  .element {
    width: 60px;
    height: 65px;
    background-size: 100% 100%;
    text-align: center;
    white-space: nowrap;
    cursor: pointer;
  }

  .hover {
    text-align: center;
    position: absolute;
    pointer-events: none;
  }
  .clickShow {
    position: absolute;
    border: 1px solid #1b7ef2;
    ::v-deep.el-scrollbar__view {
      display: flex;
      flex-direction: column;
      > span {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;
        .right {
          margin-right: 10px;
        }
      }
    }
    ::v-deep::-webkit-scrollbar-track {
      background: transparent !important;
    }
    .add {
      cursor: pointer;
    }
    .addview-input {
      width: 100%;
      padding: 0 10px 0 10px;
      input {
        width: 100%;
        box-sizing: border-box;
        border-width: 1px;
        border-style: solid;
        border-radius: 2px;
      }
      .btns {
        width: 100%;
        margin-top: 5px;
        left: 0;
        display: flex;
        justify-content: space-evenly;

        span {
          width: 60px;
          height: 24px;
          font-size: 12px;
          line-height: 24px;
          box-sizing: border-box;
          cursor: pointer;
          text-align: center;
        }
        > span:nth-child(1) {
          border-width: 1px;
          border-style: solid;
        }
        > span:nth-child(2) {
          color: #000;
        }
      }
    }
  }
}
</style>
