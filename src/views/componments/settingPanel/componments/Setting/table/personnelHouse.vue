<template>
  <el-scrollbar class="right-setting scrollbar-wrapper">
    <el-form
      label-width="110px"
      size="small"
      class="border-box"
      style="padding: 8px 16px"
    >
      <commonSetTitle
        :config="config"
        @changeSize="(type, val) => $emit('changeSize', type, val)"
      />
      <ImageSelector
              label="背景图片："
              @changeSrc="(val) => $emit('changeValue','box', 'backgroundImg', val)"
              worksheetId="zhsq_rfyhyl"
              imageField="bg_img"
              :src="config.box.backgroundImg"
            ></ImageSelector>
            <ImageSelector
              label="关闭按钮图片："
              @changeSrc="(val) => $emit('changeValue','box', 'closeImg', val)"
              worksheetId="zhsq_rfyhyl"
              imageField="close_img"
              :src="config.box.closeImg"
            ></ImageSelector>
   
      <el-form-item label="是否POI点弹窗:"  label-width="120px">
        <el-switch
          v-model="config.isRelationPoi"
          @change="(val) => $emit('changeSize', 'isRelationPoi', val)"
        ></el-switch>
      </el-form-item>
      <div v-if="config.isRelationPoi">
        <el-form-item label="关联图层表ID：" label-width="115px">
          <el-input
            v-model="relationWorksheetId"
            size="mini"
            @blur="getLayer"
          ></el-input>
        </el-form-item>
        <el-form-item label="关联图层：">
          <el-select
            v-model="config.box.relationLayerId"
            size="small"
            multiple
            class="currentPic"
          >
            <el-option
              v-for="item in layerList"
              :key="item.rowid"
              :label="item.name"
              :value="item.rowid"
            ></el-option>
          </el-select>
        </el-form-item>
      </div>
      <el-form-item label="手机号是否脱敏:"  label-width="120px">
        <el-switch
          v-model="config.box.desensitization"
          @change="(val) => $emit('changeSize', 'desensitization', val)"
        ></el-switch>
      </el-form-item>
      <div v-if="config.box.desensitization">
       
        <el-form-item label="脱敏字段：">
          <el-select
            v-model="config.box.input"
            popper-class="setting-select"
            size="small"
            multiple
            class="currentPic"
          >
            <el-option
              v-for="item in config.box.numDesensitization"
              :key="item"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
      </div>
      <el-collapse>
        <el-collapse-item title="弹窗头部">
          <commonTab
            :config="config"
            type1="box"
            @changeValue="
              (param1, param2, val) => $emit('changeValue', param1, param2, val)
            "
          />
          <ImageSelector
              label="头部图片："
              @changeSrc="(val) => $emit('changeValue','box', 'headImg', val)"
              worksheetId="zhsq_rfyhyl"
              imageField="header_img"
              :src="config.box.headImg"
            ></ImageSelector>
         
          <el-form-item label="图片高度：">
            <div class="flex align-center">
              <el-input
                v-model="config.box.height"
                size="mini"
                placeholder="请输入..."
              ></el-input
              >px
            </div>
          </el-form-item>
        </el-collapse-item>

        <el-collapse-item title="页面中小标题样式">
          <div style="position: relative;">
            <div class="hidden"></div>
            <commonTab
              :config="config"
              type1="box"
              type2="smallTitle"
              @changeValue="
                (param1, param2, val) =>
                  $emit('changeValue', param1, param2, val)
              "
            />
            <el-form-item label="文本缩进值：">
              <div class="flex align-center">
                <el-input
                  v-model="config.box.smallTitle.textIndent"
                  size="mini"
                  placeholder="请输入..."
                ></el-input
                >px
              </div>
            </el-form-item>
            <ImageSelector
              label="标题样式图片："
              @changeSrc="(val) => $emit('changeValue','box', 'smallImg', val)"
              worksheetId="zhsq_rfyhyl"
              imageField="small_img"
              :src="config.box.smallImg"
            ></ImageSelector>
            <el-form-item label="图片高度：">
              <div class="flex align-center">
                <el-input
                  v-model="config.box.smallTitle.height"
                  size="mini"
                  placeholder="请输入..."
                ></el-input
                >px
              </div>
            </el-form-item>
          </div>
        </el-collapse-item>
        <el-collapse-item title="房屋信息">
          <el-collapse-item title="标题" style="margin-bottom:10px;">
            <el-form-item label="表ID：">
              <el-input
                size="mini"
                v-model="config.box.houseWorksheetId"
                @blur="getFont"
                placeholder="请输入..."
              ></el-input>
            </el-form-item>
            <el-form-item label="字段值：">
              <el-select
                popper-class="setting-select"
                placeholder="请选择字段"
                v-model="config.box.name"
              >
                <el-option
                  v-for="(item, i) in fontList"
                  :label="item"
                  :key="i"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-collapse-item>
          <el-collapse-item title="字段展示">
            <!-- <el-form-item label="表ID：" label-width="90px">
              <el-input
                v-model="houseTableId"
                size="mini"
                placeholder="请输入..."
              ></el-input>
            </el-form-item> -->
            <!-- <el-form-item label="字段排列：" label-width="90px">
          <div
            class="flex"
            style="color: #fff;"
          > 
          <div style="margin-right: 10px">一行</div>
            <el-input-number
              :min="1"
              :step="1" step-strictly
              label=""
            ></el-input-number>
            <div style="margin-left: 10px">个</div>
          </div>
        </el-form-item> -->
            <el-form-item label="字段名称宽高：" label-width="120px">
              <div class="flex align-center">
                <el-input
                  v-model="config.houseData.tableLeft.width"
                  size="mini"
                  placeholder="宽"
                ></el-input
                >x<el-input
                  v-model="config.houseData.tableLeft.height"
                  size="mini"
                  placeholder="高"
                ></el-input>
              </div>
            </el-form-item>
            <el-form-item label="字段值宽高：" label-width="120px">
              <div class="flex align-center">
                <el-input
                  v-model="config.houseData.tableRight.width"
                  size="mini"
                  placeholder="宽"
                ></el-input
                >x<el-input
                  v-model="config.houseData.tableRight.height"
                  size="mini"
                  placeholder="高"
                ></el-input>
              </div>
            </el-form-item>
            <el-form-item label="字体大小：">
              <div class="flex align-center">
                <el-input
                  v-model="config.houseData.fontSize"
                  size="mini"
                  placeholder="请输入..."
                ></el-input
                >px
              </div>
            </el-form-item>
            <el-form-item label="字体颜色(左右)：" label-width="120px">
              <el-color-picker
                v-model="config.houseData.tableLeft.color"
                size="mini"
                show-alpha
                style="margin-right:10px"
              ></el-color-picker>
              <el-color-picker
                v-model="config.houseData.tableRight.color"
                size="mini"
                show-alpha
              ></el-color-picker>
            </el-form-item>
            <el-form-item label="边框颜色(左右)： " label-width="120px">
              <el-color-picker
                v-model="config.houseData.tableLeft.borderColor"
                size="mini"
                show-alpha
                style="margin-right:10px"
              ></el-color-picker>
              <el-color-picker
                v-model="config.houseData.tableRight.borderColor"
                size="mini"
                show-alpha
              ></el-color-picker>
            </el-form-item>
            <el-form-item label="背景颜色(左右)：" label-width="120px">
              <el-color-picker
                v-model="config.houseData.tableLeft.background"
                size="mini"
                show-alpha
                style="margin-right:10px"
              ></el-color-picker>
              <el-color-picker
                v-model="config.houseData.tableRight.background"
                size="mini"
                show-alpha
              ></el-color-picker>
            </el-form-item>
            <el-form-item label="字段配置：">
              <el-button
                type="primary"
                size="mini"
                icon="el-icon-plus"
                @click="addToptxt('houseData')"
              ></el-button>
            </el-form-item>
            <el-collapse-item
              v-for="(item, index) in config.houseData.tableHead"
              :key="index"
              :title="`文本 ${index + 1} 配置：`"
              style="margin-top:2px;"
            >
              <el-form-item label="文本名称：">
                <el-input
                  v-model="item.label"
                  size="mini"
                  placeholder="请输入名称"
                ></el-input>
              </el-form-item>
              <el-form-item label="数据：">
                <el-select
                  popper-class="setting-select"
                  v-model="item.value"
                  placeholder="请选择数据key"
                >
                  <el-option
                    v-for="(item, i) in config.houseData.tableKeyData"
                    :label="item"
                    :key="i"
                    :value="item"
                  >
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="枚举文本颜色：">
                <el-button
                  type="primary"
                  size="mini"
                  icon="el-icon-plus"
                  @click="addColorData(index, 'houseData')"
                  >添加颜色配置</el-button
                >
              </el-form-item>
              <div
                class="colorData"
                v-for="(v, i) in config.houseData.colorData[index]"
                :key="i"
              >
                <el-form-item class="no-margin">
                  <el-input
                    v-model="v.label"
                    size="mini"
                    placeholder="请输入值"
                  ></el-input>
                  <el-color-picker
                    v-model="v.color"
                    size="mini"
                    style="margin-left: 5px;"
                    show-alpha
                  ></el-color-picker>
                  <i
                    style="color: red"
                    class="el-icon-delete"
                    @click="delColor('houseData', index, i)"
                  />
                </el-form-item>
              </div>
              <span style="margin-left:163px">
                <el-button
                  type="danger"
                  size="mini"
                  @click="delData('houseData', index)"
                  >删除选项</el-button
                >
              </span>
            </el-collapse-item>
          </el-collapse-item>
        </el-collapse-item>
        <el-collapse-item title="住户信息">
          <el-collapse-item title="标题" style="margin-bottom:10px;">
            <el-form-item label="文本名称：">
              <el-input
                v-model="config.personnelData.titleName"
                size="mini"
                placeholder="请输入名称"
              ></el-input>
            </el-form-item>
          </el-collapse-item>
          <el-collapse-item title="表格" style="margin-bottom:10px;">
            <el-form-item label="表ID：" label-width="90px">
              <el-input
                v-model="config.personnelData.houseTableId"
                size="mini"
                placeholder="请输入..."
                @blur="getFont('personnel')"
              ></el-input>
            </el-form-item>
            <el-form-item label="表格高度：" label-width="90px">
              <div class="flex align-center">
                <el-input
                  v-model="config.personnelData.height"
                  size="mini"
                  placeholder="请输入.."
                  style="margin-right:12px"
                ></el-input
                >px
              </div>
            </el-form-item>
            <!-- <commonTab :config="config" type1="personnelData" type2="theader"></commonTab> -->
            <el-form-item label="表行高度：" label-width="90px">
              <div class="flex align-center">
                <el-input
                  v-model="config.personnelData.theader.height"
                  size="mini"
                  placeholder="请输入.."
                  style="margin-right:12px"
                ></el-input
                >px
              </div>
            </el-form-item>
            <el-form-item label="字体大小：" label-width="90px">
              <div class="flex align-center">
                <el-input
                  v-model="config.personnelData.theader.fontSize"
                  size="mini"
                  placeholder="请输入..."
                  style="margin-right:12px"
                ></el-input
                >px
              </div>
            </el-form-item>
            <el-form-item label="表头边框背景颜色：" label-width="150px">
              <el-color-picker
                v-model="config.personnelData.theader.borderColor"
                size="mini"
                style="margin-right:10px"
                show-alpha
              ></el-color-picker>
              <el-color-picker
                v-model="config.personnelData.theader.background"
                size="mini"
                show-alpha
              ></el-color-picker>
            </el-form-item>

            <el-form-item label="文字颜色(表头表体)：" label-width="150px">
              <el-color-picker
                v-model="config.personnelData.theader.color"
                size="mini"
                show-alpha
                style="margin-right:10px"
              ></el-color-picker>
              <el-color-picker
                v-model="config.personnelData.tbody.color"
                size="mini"
                show-alpha
              ></el-color-picker>
            </el-form-item>

            <el-form-item label="表行滑过填充颜色：" label-width="150px">
              <el-color-picker
                v-model="config.personnelData.tbody.background"
                size="mini"
                show-alpha
              ></el-color-picker>
            </el-form-item>
            <el-form-item label="字段配置：">
              <el-button
                type="primary"
                size="mini"
                icon="el-icon-plus"
                @click="addToptxt('personnelData')"
              ></el-button>
            </el-form-item>
            <el-collapse-item
              v-for="(item, index) in config.personnelData.tableHead"
              :key="index"
              :title="`文本 ${index + 1} 配置：`"
              style="margin-top:2px;"
            >
              <el-form-item label="文本名称：">
                <el-input
                  v-model="item.label"
                  size="mini"
                  placeholder="请输入名称"
                ></el-input>
              </el-form-item>
              <el-form-item label="数据：">
                <el-select
                  popper-class="setting-select"
                  v-model="item.value"
                  placeholder="请选择数据key"
                >
                  <el-option
                    v-for="(item, i) in config.personnelData.tableKeyData"
                    :label="item"
                    :key="i"
                    :value="item"
                  >
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="枚举文本颜色：">
                <el-button
                  type="primary"
                  size="mini"
                  icon="el-icon-plus"
                  @click="addColorData(index, 'personnelData')"
                  >添加颜色配置</el-button
                >
              </el-form-item>
              <div
                class="colorData"
                v-for="(v, i) in config.personnelData.colorData[index]"
                :key="i"
              >
                <el-form-item class="no-margin">
                  <el-input
                    v-model="v.label"
                    size="mini"
                    placeholder="请输入值"
                  ></el-input>
                  <el-color-picker
                    v-model="v.color"
                    size="mini"
                    style="margin-left: 5px;"
                    show-alpha
                  ></el-color-picker>
                  <i
                    style="color: red"
                    class="el-icon-delete"
                    @click="delColor('personnelData', index, i)"
                  />
                </el-form-item>
              </div>
              <span style="margin-left:163px">
                <el-button
                  type="danger"
                  size="mini"
                  @click="delData('personnelData', index)"
                  >删除选项</el-button
                >
              </span>
            </el-collapse-item>
          </el-collapse-item>
          <el-collapse-item title="人员标签">
            <el-form-item label="最多显示：">
              <div class="flex" style="color: #fff;margin-left:10px">
                <el-input-number
                  v-model="config.personnelData.dataNumber"
                  :min="1"
                  :step="1"
                  step-strictly
                  label=""
                ></el-input-number>
                <div style="margin-left: 10px">个</div>
              </div>
            </el-form-item>
            <el-form-item label="背景色透明度：" label-width="120px">
              <el-input
                v-model="config.personnelData.opacity"
                size="mini"
                placeholder="请输入..."
              ></el-input>
            </el-form-item>
          </el-collapse-item>
        </el-collapse-item>
      </el-collapse>
    </el-form>
  </el-scrollbar>
</template>

<script>
import commonTab from "../componments/commonTab";
import commonSetTitle from "../componments/commonSetTitle";
import { getFilterRows } from "@/utils/api";
import { appKey, sign } from "@/utils/const.js";
import ImageSelector from "../componments/ImageSelector";
export default {
  name: "setting",
  components: { commonTab, commonSetTitle,ImageSelector },
  data() {
    return {
      styleList: ["solid", "dashed"],
      border: {
        width: "",
        type: "",
        color: "",
      },
      selectTypeData: [
        { txt: "日期时间", type: "dateTimePicker" },
        // { txt: "时间", type: "timePicker" },
        { txt: "关键字搜索", type: "search" },
        { txt: "选择器", type: "select" },
      ],
      optionData: [],
      selectData: [],
      imgList: {},
      dialogVisible: false,
      relationWorksheetId: "", //关联图层表id
      layerList: [],
      houseTableId: "", //楼宇详情表id
      houseTableOption: [],
      fontList: [],
    };
  },
  props: {
    config: {
      type: Object,
      default: () => {
        return {};
      },
    },
    changeSize: {
      type: Function,
    },
  },
  watch: {},
  mounted() {
    // this.getSelectData();

    this.getImgData();
  },
  methods: {
    async getFont(type) {
      let id =
        type == "personnel"
          ? this.config.personnelData.houseTableId
          : this.config.box.houseWorksheetId;
      let { data } = await getFilterRows({
        appKey: appKey,
        sign: sign,
        worksheetId: id,
        pageSize: 500,
        pageIndex: 1,
      });
      if (type == "personnel") {
        this.config.personnelData.tableKeyData =
          data.rows[0] && Object.keys(data.rows[0]);
      } else {
        this.fontList = data.rows[0] && Object.keys(data.rows[0]);
        this.config.houseData.tableKeyData = [...this.fontList];
        this.config.box.numDesensitization = [...this.fontList];
      }
    },
    async getLayer() {
      this.$emit("changeSize", "relationWorksheetId", this.relationWorksheetId);
      let { data } = await getFilterRows({
        appKey: appKey,
        sign: sign,
        worksheetId: this.relationWorksheetId,
        pageSize: 500,
        pageIndex: 1,
      });
      this.layerList = data.rows;
      // this.$emit('changeSize', 'layerList', this.layerList);
    },
    addToptxt(type) {
      let length = this.config[type].tableHead.length;
      this.config[type].tableHead.push({
        label: "",
        value: "",
        id: length,
      });
    },
    async getImgData() {
      let { data } = await getFilterRows({
        appKey: appKey,
        sign: sign,
        worksheetId: this.config.worksheetId,
        pageSize: 500,
        pageIndex: 1,
      });
      let dataImg = data;
      this.imgList = {};
      dataImg.rows.forEach((item) => {
        if (item.sfqy === "启用") {
          let bg_img = item.bg_img ? JSON.parse(item.bg_img) : [];
          let close_img = item.close_img ? JSON.parse(item.close_img) : [];
          let header_img = item.header_img ? JSON.parse(item.header_img) : [];
          let small_img = item.small_img ? JSON.parse(item.small_img) : [];
          bg_img.length &&
            bg_img.forEach((v) => {
              this.imgList.bg_img = [];
              this.imgList.bg_img.push(v.DownloadUrl);
            });
          close_img.length &&
            close_img.forEach((v) => {
              this.imgList.close_img = [];
              this.imgList.close_img.push(v.DownloadUrl);
            });
          header_img.length &&
            header_img.forEach((v) => {
              this.imgList.header_img = [];
              this.imgList.header_img.push(v.DownloadUrl);
            });
          small_img.length &&
            small_img.forEach((v) => {
              this.imgList.small_img = [];
              this.imgList.small_img.push(v.DownloadUrl);
            });
        }
      });
    },

    addColorData(i, type) {
      if (this.config[type].colorData[i]) {
        this.config[type].colorData[i].push({
          label: "",
          color: "",
        });
      } else {
        let len1 = this.config[type].tableHead.length;
        let len2 = this.config[type].colorData.length;
        const len = len1 - len2;
        for (let i = 0; i < len; i++) {
          this.config[type].colorData.push([]);
        }
        this.config[type].colorData[i].push({
          label: "",
          color: "",
        });
      }
    },
    delColor(type, index, i) {
      this.config[type].colorData[index].splice(i, 1);
    },

    delData(dataType, i) {
      this.config[dataType].tableHead.splice(i, 1);
    },
  },
};
</script>

<style lang="scss">
.right-setting {
  height: calc(100% - 45px) !important;
  .no-margin {
    .el-form-item__content {
      margin-left: 0 !important;
      display: flex;
      align-items: center;
      .el-icon-delete {
        line-height: normal;
        margin-left: 10px;
        cursor: pointer;
      }
    }
  }
  .el-form-item__label {
    font-family: MicrosoftYaHei;
    font-size: 14px;
    font-weight: normal;
    letter-spacing: 0em;
    color: #ffffff;
  }

  .el-input__inner {
    background-color: #191a1a;
    color: #ffffff;
    border: none;
  }

  .el-collapse {
    border: none;
    .el-input-number--small {
      width: 100px;
    }
    .box {
      color: #fff;
      height: 48px;
      font-size: 13px;
      display: flex;
      align-items: center;
      margin-top: 5px;
      margin-bottom: 18px;
      > span {
        margin-right: 20px;
        width: 70px;
        text-align: right;
      }
      .el-dialog__wrapper {
        display: flex;
        align-items: center;
        .el-dialog {
          margin-top: 0 !important;
          .el-dialog__header {
            font-weight: 900;
          }
        }
      }
    }
    .el-collapse-item__header {
      background-color: #25262a;
      color: #ffffff;
      border: none;
    }

    .el-collapse-item__content {
      padding-bottom: 0;
    }

    .el-collapse-item__wrap {
      background: #1c1c1f;
      border: none;
      padding: 10px;
      box-sizing: border-box;

      .el-input__inner {
        background-color: #25262a;
        color: #ffffff;
        border: none;
      }
    }
  }
  .button-box {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 10px;
  }
  .colorData {
    display: flex;
    .el-form-item__content {
      flex-wrap: nowrap;
      .el-input {
        margin-right: 5px;
      }
    }
  }
}
.el-select-dropdown__list {
  display: flex;
  flex-wrap: wrap;
  width: 200px;
  padding: 6px !important;
  .el-select-dropdown__item {
    height: auto;
    padding: 0 7px;
  }
  .img-box {
    width: 80px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      max-width: 100%;
      max-height: 100%;
    }
  }
}
.hidden {
  width: 100px;
  height: 30px;
  background-color: #1c1c1f;
  position: absolute;
  right: 100px;
  top: 0;
}
</style>
