<template>
  <div
    class="house"
    v-show="isShowModuleFunc(config)"
    :style="[
      {
        width: config.width + 'px',
        height: config.height + 'px',
        background: `url(${
          config.box.backgroundImg
        }) 100% 100%/100% 100% no-repeat`,
      },
      sassStyle,
    ]"
  >
    <div class="title" :style="[styleTitle]">
      <span>{{ config.data[config.box.name] }}</span
      ><span
        :style="{
          background: styleTitle.backgroundClose,
        }"
        @click="config.isShowModule = false"
      ></span>
    </div>
    <div class="box">
      <div class="box_top">
        <div class="box_title" :style="[styleTitle2]">
          {{ config.data.name }}
        </div>
        <div class="box_top_table">
          <div
            class="row"
            v-if="config.houseData && config.houseData.tableHead"
            :style="{ fontSize: config.houseData.fontSize + 'px' }"
          >
            <div v-for="(item, i) in config.houseData.tableHead" :key="i">
              <span :style="styleHouseData.left">{{ item.label }}</span>
              <span
                :style="[
                  styleHouseData.right,
                  {
                    color:
                      (styleColor[i] &&
                        styleColor[i][config.data[item.value]] &&
                        styleColor[i][config.data[item.value]].color) ||
                      config.houseData.tableRight.color,
                  },
                ]"
                :title="config.data[item.value]"
              >
                {{ config.data[item.value] }}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="box_bottom">
        <div class="box_title" :style="[styleTitle2]">
          {{ config.personnelData && config.personnelData.titleName }}
        </div>
        <div class="table community">
          <el-table :data="config.data.people" height="370">
            <el-table-column
              v-for="(item, i) in config.personnelData &&
                config.personnelData.tableHead"
              :key="item.id"
              :label="item.label"
              align="center"
            >
              <template slot-scope="scope">
                <span v-if="Array.isArray(scope.row[item.value])">
                  <div style="display: flex; justify-content: center">
                    <span
                      class="tag"
                      v-for="(x, y) in scope.row[item.value].slice(
                        0,
                        config.personnelData.dataNumber
                      )"
                      :key="y"
                      :style="{
                        color:
                          (styleColorTable[i] &&
                            styleColorTable[i][x] &&
                            styleColorTable[i][x].color) ||
                          config.personnelData.tbody.color,
                        backgroundColor: changeColor(
                          (styleColorTable[i] &&
                            styleColorTable[i][x] &&
                            styleColorTable[i][x].color) ||
                            config.personnelData.tbody.color
                        ),
                      }"
                      >{{ x }}
                    </span>
                  </div>
                </span>
                <span
                  v-else
                  :style="{
                    color:
                      (styleColorTable[i] &&
                        styleColorTable[i][scope.row[item.value]] &&
                        styleColorTable[i][scope.row[item.value]].color) ||
                      config.personnelData.tbody.color,
                  }"
                  >{{ scope.row[item.value] }}</span
                >
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { setStyleObj, toLoadData } from "@/utils/index.js";
import { getRowDetail, getRowRelation } from "@/utils/api";
import { appKey, sign } from "@/utils/const.js";
export default {
  props: {
    config: {
      type: Object,
    },
  },
  data() {
    return {
      houseDetailPeople: [],
      data: {},

      // color1:[],
    };
  },
  watch: {
    "config.box": {
      handler(n, v) {
        let data = this.config.data;
        if (n.desensitization && n.input.length) {
          Object.keys(data).forEach((key) => {
            n.input.forEach((item) => {
              this.config.data[key] =
                item == key
                  ? this.config.data[key] &&
                    this.config.data[key].replace(
                      /(\d{5})\d{4}(\d{4})/,
                      "$1****$2"
                    )
                  : this.config.data[key];
            });
          });
          data.people &&
            data.people.length &&
            data.people.forEach((item) => {
              n.input.forEach((it) => {
                if (it in item) {
                  item[it] = item[it]
                    ? item[it].replace(/(\d{5})\d{4}(\d{4})/, "$1****$2")
                    : item[it];
                }
              });
            });
        } else {
          this.config.data = JSON.parse(JSON.stringify(this.data));
        }
      },
      deep: true,
    },
  },
  computed: {
    changeColor() {
      return function(a) {
        let opacity = this.config.personnelData.opacity;
        if (a.includes("#")) {
          var rgx = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
          var hex = a.replace(rgx, function(m, r, g, b) {
            return r + r + g + g + b + b;
          });
          var rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
          if (!rgb) {
            return a;
          }
          var r = parseInt(rgb[1], 16);
          var g = parseInt(rgb[2], 16);
          var b = parseInt(rgb[3], 16);
          return "rgba(" + r + "," + g + "," + b + "," + opacity + ")";
        } else {
          let x = a.split(",")[0];
          let b = a.split(",")[1];
          let c = a.split(",")[2];
          return x + "," + b + "," + c + "," + `${opacity})`;
        }
      };
    },
    styleColor() {
      let color = [];
      let arr = this.config.houseData.colorData;
      arr.length &&
        arr.forEach((item, index) => {
          color.push({});
          item.length &&
            item.forEach((x) => {
              color[index][x.label] = x;
            });
        });
      return color;
    },
    styleColorTable() {
      let color = [];
      let arr = this.config.personnelData.colorData;
      arr.length &&
        arr.forEach((item, index) => {
          color.push({});
          item.length &&
            item.forEach((x) => {
              color[index][x.label] = x;
            });
        });
      return color;
    },
    styleTitle() {
      let d = setStyleObj({ ...this.config.box });
      d.background = `url(${
        this.config.box.headImg
      }) 100% 100%/100% 100% no-repeat`;
      d.backgroundClose = `url(${
        this.config.box.closeImg
      }) 100% 100%/100% 100% no-repeat`;
      return d;
    },
    styleTitle2() {
      let d = setStyleObj({ ...this.config.box.smallTitle });
      d.background = ` url(${this.config.box.smallImg}) no-repeat`;
      return d;
    },
    styleHouseData() {
      let left = setStyleObj({ ...this.config.houseData.tableLeft });
      let right = setStyleObj({ ...this.config.houseData.tableRight });
      return { left, right };
    },
    sassStyle() {
      let style = this.config.personnelData;
      let headerBoder = "1px" + " " + "solid" + " " + style.theader.borderColor;
      return {
        "--border": headerBoder,
        "--headerColor": style.theader.color,
        "--headerheight": style.theader.height + "px",
        "--backgroundHeader": style.theader.background,
        "--backgroundTbody": style.tbody.background,
        "--bodyColor": style.tbody.color,
        "--tableFontsize": style.theader.fontSize + "px",
      };
    },
  },
  mounted() {
    this.data = JSON.parse(JSON.stringify(this.config.data));
    // this.updateComponentData({rowid:'96cd1a13-48cc-43d4-9bf0-272bb4053a24'})
  },
  methods: {
    dataFilter() {
      let data = this.config.data;
      if (this.config.box.desensitization && this.config.box.input.length) {
        Object.keys(data).forEach((key) => {
          this.config.box.input.forEach((item) => {
            this.config.data[key] =
              item == key
                ? this.config.data[key] &&
                  this.config.data[key].replace(
                    /(\d{5})\d{4}(\d{4})/,
                    "$1****$2"
                  )
                : this.config.data[key];
          });
        });
        data.people &&
          data.people.length &&
          data.people.forEach((item) => {
            this.config.box.input.forEach((it) => {
              if (it in item) {
                item[it] = item[it]
                  ? item[it].replace(/(\d{5})\d{4}(\d{4})/, "$1****$2")
                  : item[it];
              }
            });
          });
      } else {
        this.config.data = JSON.parse(JSON.stringify(this.data));
      }
    },
    async updateComponentData({ rowid }) {
      this.id = rowid;
      this.config.isShowModule = true;
      const data = {
        appKey: appKey,
        sign: sign,
        worksheetId: "building",
        rowId: rowid,
        controlId: "people", //需要字段名获取相关关联表
      };
      const result = await getRowDetail(data);
      const people = await getRowRelation(data);
      this.config.data = JSON.parse(JSON.stringify(result.data));
      this.config.data.people = people.data.rows;

      this.config.houseData.tableKeyData =
        result.data && Object.keys(result.data);
      this.config.personnelData.tableKeyData =
        people.data.rows[0] && Object.keys(people.data.rows[0]);
      this.data = JSON.parse(JSON.stringify(this.config.data));
      this.dataFilter();
    },
  },
};
</script>

<style lang="scss" scoped>
.house {
  color: #ffffff;
  pointer-events: all;
  z-index: 3;

  .title {
    width: 100%;
    // height: 44px;
    // font-size: 26px;
    //   background-image: url("../../assets/image/xiaokunshan/pop-title.png");
    // font-family: YouSheBiaoTiHei;
    padding: 0 20px;
    display: flex;
    align-items: center;

    > span:nth-child(1) {
      flex: 1;
    }

    > span:nth-child(2) {
      width: 24px;
      height: 24px;
      // background-image: url("../../assets/image/xiaokunshan/bg11.png");
    }
  }

  .box {
    height: calc(100% - 44px);
    width: 100%;
    padding: 20px;

    .box_title {
      width: 100%;
      //   height: 40px;
      //   background: url("../../assets/image/xiaokunshan/title2.png") no-repeat;
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      justify-content: space-between;

      .name {
        // font-size: 20px;
        flex: 1;
      }

      .tag {
        display: flex;
        font-size: 16px;

        > span {
          margin-left: 20px;
          text-indent: 24px;
        }

        //   > span:nth-child(1) {
        //     background: url("../../../assets/img/common/popup/dangyuan.png")
        //       no-repeat;
        //     background-position: 0 50%;
        //   }
        //   > span:nth-child(2) {
        //     background: url("../../../assets/img/common/popup/daren.png")
        //       no-repeat;
        //     background-position: 0 50%;
        //   }
        //   > span:nth-child(3) {
        //     background: url("../../../assets/img/common/popup/cunmin.png")
        //       no-repeat;
        //     background-position: 0 50%;
        //   }
      }
    }

    &_top {
      width: 100%;
      height: 196px;

      &_table {
        width: 100%;

        .row {
          width: 100%;
          display: flex;
          flex-wrap: wrap;

          > div {
            display: flex;
            flex-wrap: wrap;
            line-height: 34px;
            margin-bottom: 2px;
            margin-right: 2px;

            > span {
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }

            > span:nth-child(1) {
              margin-right: 2px;
              border-width: 1px;
              border-style: solid;
              box-sizing: border-box;
              text-indent: 10px;
            }

            > span:nth-child(2) {
              border-width: 1px;
              border-style: solid;
              box-sizing: border-box;
              padding: 0 10px;
            }
          }
        }
      }
    }

    &_bottom {
      .table {
        margin-top: 10px;
      }
    }

    ::v-deep {
      .el-table {
        background: transparent;
        font-size: var(--tableFontsize);

        .tag {
          height: 26px;
          line-height: 26px;
          font-size: 14px;
          border-radius: 4px;
          padding: 0 6px;
          margin-right: 5px;
        }

        th,
        tr {
          background: transparent;
        }

        .empty-description {
          color: #fff;
        }

        .el-table__body {
          .image-slot {
            width: 100%;
            height: 100%;
            display: table;

            .img {
              width: 100%;
              height: 100%;
              display: table-cell;
              vertical-align: middle;

              img {
                max-width: 100%;
                max-height: 100%;
              }
            }
          }

          tr {
            // height: 40px;
            height: var(--headerheight);

            .img-box {
              width: 100%;
              // height: var(--badyheight);
              padding: 5px 0;

              .el-image {
                box-sizing: border-box;
                width: 100%;
                height: 100%;

                // display: flex;
                // align-items: center;
                .el-image__inner {
                  max-width: 100%;
                  max-height: 100%;
                  width: auto !important;
                  height: auto !important;
                }
              }
            }
          }
        }

        .el-table__header {
          border: var(--border);

          tr {
            // height: 40px;
            // color: #acdaff;
            // background: rgba(69, 162, 255, 0.15);
            height: var(--headerheight);
            color: var(--headerColor);
            background: var(--backgroundHeader);
          }
        }

        th,
        td {
          padding: 0;
        }

        .el-table__body {
          color: var(--bodyColor);

          .el-table__row:nth-child(2n-1) {
            //   background: var(--background1);
          }

          .el-table__row:nth-child(2n) {
            //   background: var(--background2);
          }

          tr:hover > td {
            // background: rgba(48, 141, 255, 0.3);
            background: var(--backgroundTbody);
          }
        }
      }

      .el-table::before {
        height: 0 !important;
      }

      .el-table td,
      .el-table th.is-leaf {
        border-bottom: none;
        //   border-bottom: var(--border);
      }
    }
  }
}
</style>
