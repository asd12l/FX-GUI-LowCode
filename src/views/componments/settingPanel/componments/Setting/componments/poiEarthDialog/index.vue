<template>
  <div class="poiEarthWrap">
    <el-dialog
      :close-on-click-modal="false"
      :modal-append-to-body="false"
      title="POI设置"
      top="3vh"
      :visible.sync="dialogVisible"
      width="80%"
      @close="$emit('changeIsShowEarthDialog', false)"
      custom-class="poiEarthDialog"
      :destroy-on-close="true"
    >
      <div slot="title" class="dipoiEarthDialogalog-title_wrap">
        <div class="title">
          POI设置
        </div>
        <div class="btns">
          <el-button size="mini" @click="$emit('changeIsShowEarthDialog', false)">取 消</el-button>
          <el-button size="mini" type="primary" @click="toSave">确 定</el-button>
        </div>
      </div>
      <div class="earth-content">
        <div ref="poiEarthContainer" id="poiEarthContainer">
          <div class="messageDialog" id="messageDialog"></div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getFilterRows } from "@/utils/api";
import { appKey, sign } from "@/utils/const.js";
// opacity: opacity,
//  filter: `saturate(${saturate}) contrast(${contrast}) hue-rotate(${hueRotate}deg) brightness(${brightness})`
export default {
  name: "poiEarthDialog",
  data() {
    return {
      _earth: {},
    };
  },
  computed: {},
  methods: {
    toSave() {

    },
    earthCancelCb() {
      this.$emit("changeIsShowEarthDialog", false);
      // this.dialogVisible = false;
    },
    earthOnSure(data) {
      // this.onSureCb()
      if (this.type === "polygonArea") {
        const sceneJson = this._earth.labScene.getSenceJson();
        const senceJsonParams = sceneJson.sceneTree.root.children.find(
          (item) => item.czmObject.name === "多边形"
        );
        this.$emit("onSureCb", senceJsonParams);
      } else {
        this.$emit("onSureCb", data);
      }
      this.$emit("changeIsShowEarthDialog", false);
    },
    watchLeftClick(pick) {
      if (pick) {
        // messageDialog2.style.display = "block";
      }
    },
    watchMouseMove(pick) {
      const messageDialog = document.getElementById("messageDialog");

      if (pick && pick.id && pick.id.canvasPosition) {
        console.log("pick.id::::::::111", pick.id, pick.id.customAttribute.showTitle)
        if (pick.id.customAttribute.showTitle) {
          const { title } = pick.id.customAttribute;
          // messageDialog.innerHTML = `${this.contentReplacement(
          //   title.text,
          //   pick.id.customAttribute
          // )}`;
          console.log("pick.id::::::::", pick.id.canvasPosition.y - title.offsetY, pick.id.canvasPosition.x - title.width / 2)
          messageDialog.style.cssText = `
                  position: absolute;
                  min-width: ${title.width}px;
                  height: ${title.height}px;
                  color: ${title.color};
                  top: ${pick.id.canvasPosition.y - title.offsetY}px;
                  left: ${pick.id.canvasPosition.x - title.width / 2}px;
                  z-index: 99999;
                  // overflow: hidden;
                  text-align: ${title.textAlign};
                  background-image: url('${title.bgImg}');
                  background-size: 100% ${title.height}px;
                  background-position: center;
                  background-repeat: no-repeat;
                  line-height: ${title.height}px;
                  display: inline-block;
                  padding: 0 10px;
              `;
          const width = messageDialog.offsetWidth;
          messageDialog.style.left = `${pick.id.canvasPosition.x -
            width / 2}px`;
          messageDialog.style.display = "block";
        } else {
          messageDialog.style.display = "none";
        }
      } else {
        messageDialog.style.display = "none";
      }
    },
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: "",
    },
    styleObj: {
      type: Object,
      default: () => {
        return {};
      },
    },
    onSureCb: {
      type: Function,
      default: () => {
        return () => {};
      },
    },
  },
  mounted() {
    this.$nextTick(() => {
      let cloneXbsjEarthUI = null;
      if (this.$store.state.XbsjEarthUI) {
        cloneXbsjEarthUI = this.$lodash.cloneDeep(
          this.$store.state.XbsjEarthUI
        );
      } else {
        this.$store.commit("SET_XBSJEARTHUI", XbsjEarthUI);
        cloneXbsjEarthUI = XbsjEarthUI;
      }

      cloneXbsjEarthUI
        .create("poiEarthContainer")
        .then(async (earthUI) => {
          this._earth = earthUI;
          // 设置earth导航
          // this._earth._mainbar.mainBarList = ["entity", "extend"];

          earthUI._earthApi.loadImageryObject({});
          earthUI._earthApi.watchLeftClick(this.watchLeftClick);
          earthUI._earthApi.watchMouseMove(this.watchMouseMove);

          // 区域
          if (this.type === "polygonArea") {
            if (Object.keys(this.styleObj).length === 0) {
              const Polygon = new XE.Obj.Plots.GeoPolygon(earthUI._earth);
              Polygon.creating = true;
              Polygon.isCreating = true;
              Polygon.name = "多边形";
              (Polygon.cancelCb = this.earthCancelCb),
                (Polygon.okCb = this.earthOnSure),
                earthUI.showPropertyWindow(Polygon);
            } else {
              this._earth._earthApi.addSceneObject(this.styleObj);
            }
          }

          // 点位
          if (this.type === "billBoard") {
            // const {
            //   showTitle,
            //   title = {},
            //   position,
            //   distanceDisplayCondition,
            //   boardList,
            // } = this.styleObj;
            // boardList.forEach((element) => {
            //   const billBoard = earthUI._earthApi.createCustomBillBoard({
            //     customAttribute: {
            //       type: "building",
            //       showTitle,
            //       title,
            //     },
            //     // show: is_selected === 1,
            //     position,
            //     distanceDisplayCondition,
            //     ...element,
            //   });
            //   // billBoardList.push(billBoard);
            // });

            earthUI.showPropertyWindow(
              {
                name: "自定义点位",
                billBoardData: this.styleObj,
                cancelCb: this.earthCancelCb,
                okCb: this.earthOnSure,
              },
              {
                component: "CustomBillBoard",
              }
            );
          }
        })
        .catch((err) => console.log("err:::::", err));
    });
  },
  updated(nval, oval) {
    // console.log("nval:::::::::::::::", this.filterObj);
  },
  watch: {
    dialogVisible(newvalue) {
      if (newvalue && this.json) {
        // this.json.forEach((element) => {
        //     // label文字
        //     // element.label.text = this.contentReplacement(
        //     //     element.label.text,
        //     //     czmObject
        //     // );
        //     const billBoard = this._earth._earthApi.createCustomBillBoard({
        //         customAttribute: {
        //             id: componentData.rowid,
        //             type: 'building',
        //             showTitle,
        //             title,
        //             ...czmObject
        //         },
        //         show: is_selected === 1,
        //         position: positions,
        //         distanceDisplayCondition,
        //         ...element
        //     });
        //     billBoardList.push(billBoard);
        // });
      }
    },
  },
};
</script>

<style lang="scss">
.poiEarthDialog {

  .dipoiEarthDialogalog-title_wrap {
    display: flex;
    align-items: center;
    .btns {
      margin-left: auto;
      padding-right: 30px;
    }
  }
  .earth-content {
    height: 80vh;

    #poiEarthContainer {
      position: relative;

      > div {
        position: relative !important;
      }
    }
  }
}
</style>
