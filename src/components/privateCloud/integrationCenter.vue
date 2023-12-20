<template>
  <div
    v-show="isShowModuleFunc(config)"
    :style="{
      width: config.width + 'px',
      height: config.height + 'px',
    }"
  >
    <div class="integrationCenter">
      <div
        v-for="(item, i) in config.data"
        :key="i"
        class="box"
        @mouseover="active = i"
        @mouseleave="active = '0'"
        :style="boxStyle(i)"
      >
        <div class="img" v-if="config.box.iconShow" :style="iconStyle(i)">
          <img :src="config.box.style[i].src" alt="" />
        </div>
        <div class="txt">
          <span class="ellipsis" :style="textStyle(i)">{{ item.title }}</span>
          <span
            :style="[
              subText(i),
              {
                display: '-webkit-box',
                '-webkit-box-orient': 'vertical',
                overflow: 'hidden',
                '-webkit-line-clamp': config.subText.txtNum,
              },
            ]"
            v-if="config.subText.show"
            >{{ item.subTitle }}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { setStyleObj } from "@/utils/index.js";
export default {
  name: "integrationCenter",
  props: {
    config: {
      type: Object,
    },
    changeValue: {
      type: Function,
    },
  },
  data() {
    return {
      active: "0",
    };
  },
  watch: {
    config: {
      handler(nVal, oVal) {},
      deep: true,
    },
    "config.box.addShow": {
      handler(n) {
        let d = this.config;
        if (n) {
          d.data.push({
            title: "添加应用",
            subTitle: "",
            link: "",
          });
          d.box.style.push({
            backgroundColor: "rgba(255, 143, 31, 0)",
            color: "#4B5F88",
            background: require("@/assets/image/common/1-2.png"),
            src: require("@/assets/image/common/add.png"),
          });
        } else {
          if (d.data.length) {
            d.data.pop();
            d.box.style.pop();
          }
        }
      },
      deep: true,
    },
    "config.data": {
      handler(n) {
        let d = this.config.box.style;
        if (n.length != d.length && n.length > d.length) {
          let num = n.length - d.length;
          for (let i = 0; i < num; i++) {
            d.push({
              backgroundColor: "rgba(40, 121, 255, 0.05)",
              color: "#4B5F88",
              background: require("@/assets/image/common/1-1.png"),
              src: require("@/assets/image/common/privateCloud1.png"),
            });
          }
        }
        else if(n.length == d.length) {
        }else {
          d = d.slice(0, n.length);
        }
        this.$emit("changeValue", "box", "style", d);
      },
      deep: true,
      immediate:true,
    },
  },
  computed: {
    boxStyle() {
      return function(i) {
        let d = setStyleObj({ ...this.config.box });
        let a = { ...this.config.box };
        console.log(a.style, "a.style");
        if (a.hoverShow && this.active === i) {
          d.background = a.imgShow
            ? `url(${a.background}) 100% 100%/100% 100% no-repeat`
            : a.backgroundColor;
        } else {
          d.background = a.imgShow
            ? `url(${a.style[i].background}) 100% 100%/100% 100% no-repeat`
            : a.style[i].backgroundColor;
        }
        return d;
      };
    },
    iconStyle() {
      return function(i) {
        let d = setStyleObj({ ...this.config.iconStyle });
        let c = setStyleObj({ ...this.config.iconHoverStyle });
        let a = { ...this.config.box };
        if (a.hoverShow && this.active === i) {
          return c;
        } else {
          return d;
        }
      };
    },
    textStyle() {
      return function(i) {
        let d = setStyleObj({ ...this.config.textStyle });
        let c = setStyleObj({ ...this.config.textHoverStyle });
        let a = { ...this.config.box };
        if (a.hoverShow && this.active === i) {
          return c;
        } else {
          return d;
        }
      };
    },
    subText() {
      return function(i) {
        let d = setStyleObj({ ...this.config.subText });
        if (!this.config.subText.fontColor) {
          d.color = this.config.box.style[i].color;
        } else {
          d.color = this.config.subText.color;
        }
        return d;
      };
    },
  },
  created() {},
  mounted() {
    console.log("config=================",this.config);
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
.integrationCenter {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  .box {
    display: flex;
    position: relative;
    cursor: pointer;
    .img {
      position: absolute;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .txt {
      span {
        display: block;
      }
      .ellipsis {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      .txt-ellipsis {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        overflow: hidden;
        // -webkit-line-clamp: var(txtNum);
      }
    }
  }
}
</style>
