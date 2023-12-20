<template>
  <el-dialog
    v-if="isShow"
    title="数据源"
    width="700px"
    class="importDataDialog"
    :visible="isShow"
    @close="toClose"
  >
    <div class="fieldMapDialogWrap">
      <div class="data-list">
        <div class="data-item">
          <div class="data-source_wrap title">
            <div class="title">组件字段</div>
          </div>
          <div v-if="isConfigurable" class="data-point-to" @click="addTableKey">
            <i
              class="el-icon-circle-plus-outline"
              style="font-size: 24px;cursor: pointer"
            />
          </div>
          <div class="data-target_wrap  title">
            <div class="title">工作表字段</div>
          </div>
          <div
            class="switch-box title"
            v-if="config.component === 'commonTable1'"
          >
            <div class="title">开启筛选</div>
          </div>
          <div
            class="check-box title"
            v-if="config.component === 'commonTable1'"
          >
            <div class="title">展示位置</div>
          </div>
          <div class="data-point-del" v-if="isConfigurable"></div>
        </div>
        <div class="data-item" v-for="(item, index) in targetData" :key="index">
          <div class="data-source_wrap">
            <el-input
              v-model="
                targetData[index].sourceName || targetData[index].sourceFiled
              "
              size="mini"
              :disabled="!isConfigurable"
            ></el-input>
            <!-- {{ targetData[index].sourceName || targetData[index].sourceFiled }} -->
          </div>
          <div class="data-point-to">
            <img
              :src="require('@/assets/image/arrow.png')"
              width="20px"
              alt=""
              srcset=""
            />
          </div>
          <div class="data-target_wrap">
            <el-select
              size="mini"
              filterable
              @change="(e) => changeTargetFiled(e, index)"
              v-model="targetData[index].targetFiled"
              clearable
              placeholder="请选择"
            >
              <el-option
                v-for="item in targetOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <div class="switch-box" v-if="config.component === 'commonTable1'">
            <el-switch
              v-model="item.isSelected"
              active-color="#13ce66"
              inactive-color="#ff4949"
              :disabled="!targetData[index].type"
            ></el-switch>
          </div>
          <div class="check-box" v-if="config.component === 'commonTable1'">
            <el-checkbox-group v-model="item.location">
              <el-checkbox label="table">表格</el-checkbox>
              <el-checkbox label="card">卡片</el-checkbox>
              <el-checkbox label="button">按钮</el-checkbox>
            </el-checkbox-group>
          </div>
          <div class="data-point-del" v-if="isConfigurable">
            <i
              class="el-icon-remove-outline"
              style="font-size: 24px;cursor: pointer;color:red;margin-left:10px;"
              @click="delTableKey(index)"
            />
          </div>
        </div>
      </div>
    </div>

    <div slot="footer" class="dialog-footer">
      <el-button
        size="mini"
        class="cancel-btn dialog-btn"
        :loading="isLoading"
        @click="toClose"
        >取 消</el-button
      >
      <el-button
        type="primary"
        :loading="isLoading"
        class="dialog-btn"
        size="mini"
        @click="importData"
        >确 定</el-button
      >
    </div>
  </el-dialog>
</template>

<script>
import "./index.scss";
import {
  getAppInfo,
  getWorksheetInfo,
  getSheetInfo,
  getFilterRows,
  getAppSectionDetail,
  getWorksheetsByAppId,
  getPage,
  getWorksheetApiInfo,
} from "@/utils/api";
import { guid, changeTableData } from "@/utils/index";
import {
  appKey,
  sign,
  chartTypeList,
  chartReportTypeMap,
} from "@/utils/const.js";
import fieldMap from "./fieldSourceMap.js";

export default {
  name: "dataSourceDialog",
  components: {},
  data() {
    return {
      targetData: [],
      isLoading: false,
      targetOptions: [{}],
      isConfigurable: false,
      selectData: [],
    };
  },
  created() {
    // this.loadData();
  },
  watch: {},
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Array,
      default: () => {
        return [];
      },
    },
    config: {
      type: Object,
    },
  },
  async mounted() {
    this.changeConfigurable();
    const appInfo = localStorage.getItem("appInfo");
    const { data: filedData } = await getWorksheetApiInfo({
      worksheetId: this.config.worksheetId,
      appId: JSON.parse(appInfo).id,
    });
    const targetOptions = [];

    this.targetOptions = filedData[0].controls.map((item) => {
      return {
        ...item,
        label: item.controlName,
        value: item.alias || item.controlId,
      };
    });
    if (
      this.config.component === "commonTable1" ||
      this.config.component === "scrollTable"
    ) {
      // 保存接口里或者的数据key字段
      this.$emit(
        "changeValue",
        "otherData",
        "tableKeyData",
        this.targetOptions
      );
    }
    if (
      this.config.component === "commonTable1" ||
      this.config.component === "scrollTable"
    ) {
      this.targetData =
        fieldMap[this.config.component] &&
        fieldMap[this.config.component](this.config);
      return;
    }
    if (this.config.fieldMap && this.config.fieldMap.length > 0) {
      this.targetData = this.config.fieldMap;
      return;
    }
    // const data = [];
    // const targetDataList = Object.keys(this.data[0]);

    this.targetData =
      fieldMap[this.config.component] &&
      fieldMap[this.config.component](this.config);
  },
  methods: {
    changeConfigurable() {
      let c = this.config.component;
      if (c === "commonTable1" || c === "scrollTable") {
        this.isConfigurable = true;
      } else {
        this.isConfigurable = false;
      }
    },
    addTableKey() {
      let length = this.targetData.length;
      let obj = {};
      if (this.config.component === "commonTable1") {
        obj = {
          location: [],
          isSelected: false,
        };
      }
      this.targetData.push({
        sourceName: "",
        sourceFiled: "",
        isMatchComplete: false,
        targetFiled: "",
        ...obj,
      });
    },
    delTableKey(i) {
      this.targetData.splice(i, 1);
    },
    changeTargetFiled(e, index) {
      const selectedObj = this.targetOptions.find(
        (item) => item.controlId === e || item.alias === e
      );
      // console.log(selectedObj, "===selectedObj");
      this.targetData[index].type = selectedObj.type;
      // this.targetData[index].alias = selectedObj.alias;
      this.targetData[index].controlId = selectedObj.controlId;
    },
    importData() {
      if (this.config.component === "commonTable1") {
        this.changeShowData();
      }
      this.$emit("toSave", this.targetData);
    },
    changeShowData() {
      let t = changeTableData(this.targetData, this.config);
      if (this.config.component === "commonTable1") {
        this.$emit("changeValue", "otherData", "showData", t);
      } else {
        this.$emit("changeValue", "otherData", "tableHead", t);
      }
    },
    reset() {
      this.form = {
        viewId: "",
        sheetId: "",
        appId: "",
      };
    },
    toClose() {
      this.$emit("toClose", false);
    },
  },
  watch: {
    isShow() {
      this.reset();
    },
  },
};
</script>
<style lang="scss">
.v-modal {
  z-index: 9 !important;
}

.fieldMapDialogWrap {
  max-height: 400px;
  // overflow-y: scroll;

  .data-list {
    .data-item {
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      height: 40px;

      .data-source_wrap,
      .data-target_wrap {
        flex: 1;
      }
      .switch-box {
        width: 80px;
        text-align: center;
      }
      .check-box {
        width: 150px;
        text-align: center;
        .el-checkbox-group {
          display: flex;
          .el-checkbox {
            margin-right: 5px;
            .el-checkbox__label {
              padding-left: 5px;
            }
          }
        }
      }
      .data-point-del {
        width: 34px;
        margin-left: 15px;
      }

      .data-source_wrap {
        background-color: #242729;
        line-height: 30px;
        border-radius: 4px;
        padding-left: 20px;
        box-sizing: border-box;

        &.title {
          background-color: rgba($color: #000000, $alpha: 0);
        }
      }

      .data-point-to {
        width: 50px;
        margin: 0 15px;
        text-align: center;
      }
    }
  }
}

.importDataDialog {
  z-index: 2001 !important;

  .el-dialog {
    background: #323538;

    .el-dialog__title {
      color: #ffffff;
      font-weight: bold;
    }

    .el-dialog__body {
      padding-top: 10px;

      .el-form-item__label {
        color: #ffffff;
        padding: 0 !important;
      }

      .el-select {
        width: 100%;
      }

      .el-input__inner {
        background: #242729;
        border: none;
      }

      .el-select-dropdown {
        background: #242729;
      }
    }

    .cancel-btn {
      background: #666666;
      color: #ffffff;
    }

    .dialog-btn {
      border: none;
    }
  }
}

.el-select-dropdown.el-popper {
  z-index: 999999 !important;
}

.setting-select {
  border: none !important;
  background: #45494c !important;

  .el-select-dropdown__empty {
    background: #45494c;
    color: #ffffff;
    border-radius: 4px;
  }

  // el-select-dropdown el-popper
  .el-select-dropdown__item.hover {
    background: rgba(255, 255, 255, 0.1) !important;
  }

  .el-select-dropdown__item {
    color: #ffffff !important;
    min-height: 40px;
    width: 200px;
    position: relative;
    display: flex;
    justify-content: center;
    align-content: center;

    .img {
      height: auto;
      max-width: 200px;
      align-self: center;
    }
  }

  .popper__arrow:after,
  .popper__arrow {
    border-bottom-color: #45494c !important;
  }
}
</style>
