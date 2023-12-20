<template>
  <el-scrollbar class="right-setting scrollbar-wrapper">
    <el-form
      label-width="136px"
      size="small"
      class="border-box"
      style="padding: 8px 16px"
    >
      <el-form-item label="名称：">
        <div class="componentName" style="display:flex;align-items:center">
          <el-input v-model="config.name" size="mini" placeholder=""></el-input>
          <span
            :class="config.lock ? 'active' : ''"
            @click="config.lock = !config.lock"
          ></span>
          <span
            :class="config.show ? 'active' : ''"
            @click="config.show = !config.show"
          ></span>
        </div>
      </el-form-item>
      <el-form-item label="显示组件：">
        <el-switch v-model="config.data.isShow"></el-switch>
      </el-form-item>
      <el-form-item label="组件宽度：">
        <el-input
          v-model="config.width"
          size="mini"
          placeholder="请输入组件宽度"
          @change="(val) => $emit('changeSize', 'width', val)"
        ></el-input>
      </el-form-item>
      <el-form-item label="组件高度：">
        <el-input
          v-model="config.height"
          size="mini"
          @change="(val) => $emit('changeSize', 'height', val)"
          placeholder="请输入组件高度"
        ></el-input>
      </el-form-item>
      <el-form-item label="X距离：">
        <el-input
          v-model="config.left"
          size="mini"
          @change="(val) => $emit('changeSize', 'left', val)"
        ></el-input>
      </el-form-item>
      <el-form-item label="Y距离：">
        <el-input
          v-model="config.top"
          size="mini"
          @change="(val) => $emit('changeSize', 'top', val)"
        ></el-input>
      </el-form-item>

      <el-collapse>
        <el-collapse-item title="表格数据">
          <!-- <el-form-item label="显示序号：">
            <el-switch v-model="config.table.indexShow"></el-switch>
          </el-form-item> -->
          <el-form-item label="每页显示条数：">
            <el-input
              v-model="config.requestParams.pageSize"
              size="mini"
              placeholder="请输入高度"
            ></el-input>
          </el-form-item>
          <div class="button-box">
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-plus"
              @click="addShowTxt"
              >添加文本</el-button
            >
          </div>
          <el-collapse-item
            v-for="(item, i) in config.data.tableHead"
            :key="i"
            :title="`文本 ${i + 1} 配置：`"
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
              <el-input
                v-model="item.value"
                size="mini"
                placeholder="请输入数据"
              ></el-input>
            </el-form-item>
            <el-form-item label="文本宽度：">
              <el-input
                v-model="item.width"
                size="mini"
                placeholder="请输入宽度"
              ></el-input>
            </el-form-item>
            <el-form-item label="文本颜色：">
              <el-color-picker
                v-model="item.color"
                size="mini"
                show-alpha
              ></el-color-picker>
            </el-form-item>
            <el-form-item label="内容是否隐藏：">
              <el-switch v-model="item.showOverflow"></el-switch>
            </el-form-item>
            <span style="margin-left:30px">
              <el-button
                type="primary"
                size="mini"
                @click="changeIndex('pre', 'tableHead', i, item)"
                >上移</el-button
              >
              <el-button
                type="primary"
                size="mini"
                @click="changeIndex('next', 'tableHead', i, item)"
                >下移</el-button
              >
              <el-button
                type="danger"
                size="mini"
                @click="delData('tableHead', i)"
                >删除选项</el-button
              >
            </span>
          </el-collapse-item>
        </el-collapse-item>
        <el-collapse-item title="表头样式">
          <commonTab :config="config" type1="table" type2="theader"></commonTab>
          <el-form-item label="高度：">
            <el-input
              v-model="config.table.theader.height"
              size="mini"
              placeholder="请输入高度"
              style="margin-right:12px"
            ></el-input>
          </el-form-item>
          <el-form-item label="背景颜色：">
            <el-color-picker
              v-model="config.table.theader.background"
              size="mini"
              show-alpha
            ></el-color-picker>
          </el-form-item>
        </el-collapse-item>
        <el-collapse-item title="表格样式">
          <el-form-item label="显示下边框：">
            <el-switch v-model="config.table.borderShow"></el-switch>
          </el-form-item>
          <span v-if="config.table.borderShow">
            <el-form-item label="边框宽度：">
              <div class="flex align-center">
                <el-input
                  v-model="config.table.borderWidth"
                  size="mini"
                  placeholder="请输入边框宽度"
                  style="margin-right:12px"
                ></el-input
                >px
              </div>
            </el-form-item>
            <el-form-item label="边框样式：">
              <el-select
                popper-class="setting-select"
                v-model="config.table.borderStyle"
                placeholder="请选边框样式"
              >
                <el-option
                  v-for="(item, i) in styleList"
                  :label="item"
                  :key="i"
                  :value="item"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="边框颜色：">
              <el-color-picker
                v-model="config.table.borderColor"
                size="mini"
                show-alpha
              ></el-color-picker>
            </el-form-item>
          </span>
          <el-form-item label="高度：">
            <el-input
              v-model="config.table.height"
              size="mini"
              placeholder="请输入高度"
            ></el-input>
          </el-form-item>
          <el-form-item label="行高：">
            <el-input
              v-model="config.table.tbody.height"
              size="mini"
              placeholder="请输入行高"
            ></el-input>
          </el-form-item>
          <el-form-item label="单行文本背景色：">
            <el-color-picker
              v-model="config.table.tbody.background1"
              size="mini"
              show-alpha
            ></el-color-picker>
          </el-form-item>
          <el-form-item label="双行文本背景色：">
            <el-color-picker
              v-model="config.table.tbody.background2"
              size="mini"
              show-alpha
            ></el-color-picker>
          </el-form-item>
          <el-form-item label="鼠标滑过背景色：">
            <el-color-picker
              v-model="config.table.tbody.background3"
              size="mini"
              show-alpha
            ></el-color-picker>
          </el-form-item>
          <commonTab
            :config="config"
            type1="table"
            type2="tbody"
            :isTxtAlign="false"
          ></commonTab>
        </el-collapse-item>
        <el-collapse-item title="搜索项">
          <el-form-item label="外间距(上右下左)：">
            <div class="flex align-center">
              <el-input
                v-model="config.selection.margin"
                size="mini"
                placeholder="请输入外间距"
                style="margin-right:12px"
              ></el-input>
            </div>
          </el-form-item>
          <el-form-item label="字体大小：">
            <div class="flex align-center">
              <el-input
                v-model="config.selection.fontSize"
                size="mini"
                placeholder="请输入字体大小"
                style="margin-right:12px"
              ></el-input
              >px
            </div>
          </el-form-item>
          <el-form-item label="字体颜色：">
            <el-color-picker
              v-model="config.selection.color"
              size="mini"
              show-alpha
            ></el-color-picker>
          </el-form-item>
          <el-form-item label="字体：">
            <el-select
              popper-class="setting-select"
              v-model="config.selection.fontFamily"
              placeholder="请选择字体"
            >
              <el-option
                v-for="(item, i) in fontList"
                :label="item"
                :key="i"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="字间距：">
            <div class="flex align-center">
              <el-input
                v-model="config.selection.letterSpacing"
                size="mini"
                placeholder="请输入字间距"
                style="margin-right:12px"
              ></el-input
              >px
            </div>
          </el-form-item>
          <el-form-item label="背景颜色：">
            <el-color-picker
              v-model="config.selection.background"
              size="mini"
              show-alpha
            ></el-color-picker>
          </el-form-item>
          <el-form-item label="边框宽度：">
            <div class="flex align-center">
              <el-input
                v-model="config.selection.borderWidth"
                size="mini"
                placeholder="请输入边框宽度"
                style="margin-right:12px"
              ></el-input
              >px
            </div>
          </el-form-item>
          <el-form-item label="边框样式：">
            <el-select
              popper-class="setting-select"
              v-model="config.selection.borderStyle"
              placeholder="请选边框样式"
            >
              <el-option
                v-for="(item, i) in styleList"
                :label="item"
                :key="i"
                :value="item"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="边框颜色：">
            <el-color-picker
              v-model="config.selection.borderColor"
              size="mini"
              show-alpha
            ></el-color-picker>
          </el-form-item>
          <el-form-item label="边框圆角：">
            <el-input
              v-model="config.selection.borderRadius"
              size="mini"
              placeholder="请输入边框圆角"
            ></el-input>
          </el-form-item>
          <div class="button-box">
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-plus"
              @click="addSelect"
              >添加选项</el-button
            >
          </div>
          <el-collapse-item
            v-for="(item, i) in config.data.selectTypeData"
            :key="i"
            :title="`选项 ${i + 1} 配置：`"
          >
            <el-form-item label="选项字段：">
              <el-select
                popper-class="setting-select"
                v-model="item.data"
                filterable
                placeholder="请选择"
              >
                <el-option
                  v-for="(item, i) in selectData"
                  :label="item.label"
                  :key="i"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="选项类型：">
              <el-select
                popper-class="setting-select"
                v-model="item.type"
                placeholder="请选择类型"
              >
                <el-option
                  v-for="(v, i) in selectTypeData"
                  :label="v.txt"
                  :key="i"
                  :value="v.type"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="选项宽度：">
              <el-input
                v-model="item.width"
                size="mini"
                placeholder="请输入宽度"
              ></el-input>
            </el-form-item>
            <el-form-item label="选项高度：">
              <el-input
                v-model="item.height"
                size="mini"
                placeholder="请输入高度"
              ></el-input>
            </el-form-item>
            <el-form-item label="外间距(左)：">
              <el-input
                v-model="item.marginLeft"
                size="mini"
                placeholder="请输入外间距(左)"
              ></el-input>
            </el-form-item>
            <el-form-item label="外间距(上)：">
              <el-input
                v-model="item.marginTop"
                size="mini"
                placeholder="请输入外间距(上)"
              ></el-input>
            </el-form-item>
            <span style="margin-left:30px">
              <el-button
                type="primary"
                size="mini"
                @click="changeIndex('pre', 'selectTypeData', i, item)"
                >上移</el-button
              >
              <el-button
                type="primary"
                size="mini"
                @click="changeIndex('next', 'selectTypeData', i, item)"
                >下移</el-button
              >
              <el-button
                type="danger"
                size="mini"
                @click="delData('selectTypeData', i)"
                >删除选项</el-button
              >
            </span>
          </el-collapse-item>
        </el-collapse-item>
        <el-collapse-item
          title="搜索项下拉框样式"
          v-if="config.data.selectTypeData.length > 0"
        >
          <el-form-item label="背景颜色：">
            <el-color-picker
              v-model="config.dropdownBox.boxbackground"
              size="mini"
              show-alpha
            ></el-color-picker>
          </el-form-item>
          <el-form-item label="边框颜色：">
            <el-color-picker
              v-model="config.dropdownBox.borderColor"
              size="mini"
              show-alpha
            ></el-color-picker>
          </el-form-item>
          <el-collapse-item title="日期时间选择框样式">
            <el-form-item label="时间选择背景色：">
              <el-color-picker
                v-model="config.dropdownBox.timebackground"
                size="mini"
                show-alpha
              ></el-color-picker>
            </el-form-item>
          </el-collapse-item>
          <el-collapse-item title="选择框样式">
            <el-form-item label="选择项滑过背景色：">
              <el-color-picker
                v-model="config.dropdownBox.hoverBackground"
                size="mini"
                show-alpha
              ></el-color-picker>
            </el-form-item>
          </el-collapse-item>
        </el-collapse-item>
        <el-collapse-item title="分页">
          <el-form-item label="显示分页：">
            <el-switch v-model="config.pagination.show"></el-switch>
          </el-form-item>
          <el-form-item label="外间距(上)：">
            <el-input
              v-model="config.pagination.marginTop"
              size="mini"
              placeholder="请输入外间距(上)"
            ></el-input>
          </el-form-item>
          <el-form-item label="背景色：">
            <el-color-picker
              v-model="config.pagination.background"
              size="mini"
              show-alpha
            ></el-color-picker>
          </el-form-item>
          <el-form-item label="字体颜色：">
            <el-color-picker
              v-model="config.pagination.color"
              size="mini"
              show-alpha
            ></el-color-picker>
          </el-form-item>
          <el-form-item label="选中背景色：">
            <el-color-picker
              v-model="config.pagination.activeBackground"
              size="mini"
              show-alpha
            ></el-color-picker>
          </el-form-item>
          <el-form-item label="选中字体颜色：">
            <el-color-picker
              v-model="config.pagination.activeColor"
              size="mini"
              show-alpha
            ></el-color-picker>
          </el-form-item>
        </el-collapse-item>
        <el-collapse-item title="卡片式数据展示内容">
          <el-form-item label="宽度：">
            <el-input
              v-model="config.card.width"
              size="mini"
              placeholder="请输入宽度："
            ></el-input>
          </el-form-item>
          <el-form-item label="高度：">
            <el-input
              v-model="config.card.height"
              size="mini"
              placeholder="请输入高度："
            ></el-input>
          </el-form-item>
          <el-form-item label="外间距(上右下左)：">
            <div class="flex align-center">
              <el-input
                v-model="config.card.margin"
                size="mini"
                placeholder="请输入外间距"
                style="margin-right:12px"
              ></el-input>
            </div>
          </el-form-item>
          <div class="button-box">
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-plus"
              @click="addShowCardTxt"
              >添加文本</el-button
            >
          </div>
          <commonTab :config="config" type1="card"></commonTab>
          <el-form-item label="高度：">
            <el-input
              v-model="config.card.button.height"
              size="mini"
              placeholder="请输入高度："
            ></el-input>
          </el-form-item>
          <el-collapse-item
            v-for="(item, i) in config.data.cardData"
            :key="i"
            :title="`文本 ${i + 1} 配置：`"
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
              <el-input
                v-model="item.value"
                size="mini"
                placeholder="请输入数据"
              ></el-input>
            </el-form-item>
            <span v-if="item.value.includes('img')">
              <el-form-item label="快照宽度：">
                <el-input
                  v-model="item.width"
                  size="mini"
                  placeholder="请输入快照宽度："
                ></el-input>
              </el-form-item>
              <el-form-item label="快照高度：">
                <el-input
                  v-model="item.height"
                  size="mini"
                  placeholder="请输入快照高度："
                ></el-input>
              </el-form-item>
            </span>
            <span style="margin-left:30px">
              <el-button
                type="primary"
                size="mini"
                @click="changeIndex('pre', 'cardData', i, item)"
                >上移</el-button
              >
              <el-button
                type="primary"
                size="mini"
                @click="changeIndex('next', 'cardData', i, item)"
                >下移</el-button
              >
              <el-button
                type="danger"
                size="mini"
                @click="delData('cardData', i)"
                >删除选项</el-button
              >
            </span>
          </el-collapse-item>
          <el-collapse-item title="按钮内容">
            <commonTab :config="config" type1="card" type2="button"></commonTab>
            <el-form-item label="高度：">
              <el-input
                v-model="config.card.height"
                size="mini"
                placeholder="请输入高度："
              ></el-input>
            </el-form-item>
            <div class="button-box">
              <el-button
                type="primary"
                size="mini"
                icon="el-icon-plus"
                @click="addShowButtonTxt"
                >添加文本</el-button
              >
            </div>
            <el-collapse-item
              v-for="(item, i) in config.data.buttonData"
              :key="i"
              :title="`文本 ${i + 1} 配置：`"
              style="margin-top:2px;"
            >
              <el-form-item label="数据：">
                <el-input
                  v-model="item.value"
                  size="mini"
                  placeholder="请输入数据"
                ></el-input>
              </el-form-item>
              <el-form-item label="宽度：">
                <el-input
                  v-model="item.height"
                  size="mini"
                  placeholder="请输入宽度："
                ></el-input>
              </el-form-item>
              <el-form-item label="背景色：">
                <el-color-picker
                  v-model="item.background"
                  size="mini"
                  show-alpha
                ></el-color-picker>
              </el-form-item>
              <el-form-item label="颜色：">
                <el-color-picker
                  v-model="item.color"
                  size="mini"
                  show-alpha
                ></el-color-picker>
              </el-form-item>
              <span style="margin-left:20px">
                <el-button
                  type="primary"
                  size="mini"
                  @click="changeIndex('pre', 'buttonData', i, item)"
                  >上移</el-button
                >
                <el-button
                  type="primary"
                  size="mini"
                  @click="changeIndex('next', 'buttonData', i, item)"
                  >下移</el-button
                >
                <el-button
                  type="danger"
                  size="mini"
                  @click="delData('buttonData', i)"
                  >删除选项</el-button
                >
              </span>
            </el-collapse-item>
          </el-collapse-item>
        </el-collapse-item>
      </el-collapse>
    </el-form>
  </el-scrollbar>
</template>

<script>
import commonTab from "../componments/commonTab";
import txtGradient from "../componments/txtGradient";
export default {
  name: "setting",
  components: { commonTab, txtGradient },
  data() {
    return {
      fontList: ["Microsoft YaHei", "YouSheBiaoTiHei"],
      imgList1: [],
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
  watch: {
    "config.data.selectTypeData": {
      handler() {
        let arr = this.config.data.selectTypeData.map((item) => item.data.type);
        this.optionData = new Set(arr);
      },
      deep: true,
    },
    "config.data.tableHead": {
      handler() {
        this.getSelectData();
      },
      deep: true,
    },
  },
  mounted() {
    this.getImgList1();
    this.getSelectData();
  },
  methods: {
    change(val) {
      console.log(val);
    },
    getImgList1() {
      this.imgList1 = [
        { txt: "背景图1", url: require("@/assets/image/xiaokunshan/bg9.png") },
        { txt: "背景图2", url: require("@/assets/image/xiaokunshan/bg11.png") },
        { txt: "背景图3", url: require("@/assets/image/xiaokunshan/bg10.png") },
        { txt: "背景图4", url: require("@/assets/image/xiaokunshan/bg4.png") },
        { txt: "背景图5", url: require("@/assets/image/xiaokunshan/bg5.png") },
      ];
    },
    addShowTxt() {
      let length = this.config.data.tableHead.length;
      this.config.data.tableHead.push({
        label: "",
        value: "",
        width: "",
        color: "",
        showOverflow: false,
        id: length,
      });
      this.$emit(
        "changeValue",
        "data",
        "tableHead",
        this.config.data.tableHead
      );
    },
    addShowCardTxt() {
      let length = this.config.data.cardData.length;
      this.config.data.cardData.push({
        label: "",
        value: "",
        width: "",
        height: "",
        id: length,
      });
      this.$emit("changeValue", "data", "cardData", this.config.data.cardData);
    },
    addShowButtonTxt() {
      let length = this.config.data.buttonData.length;
      this.config.data.buttonData.push({
        label: "",
        value: "",
        width: "",
        background: "",
        color: "",
        id: length,
      });
      this.$emit(
        "changeValue",
        "data",
        "buttonData",
        this.config.data.buttonData
      );
    },
    delData(dataType, i) {
      this.config.data[dataType].splice(i, 1);
      this.$emit("changeValue", "data", dataType, this.config.data[dataType]);
      if (dataType === "tableHead") {
        this.getSelectData();
      }
    },
    getSelectData() {
      this.selectData = [...this.config.data.tableHead];
      this.selectData.push({ label: "关键字", type: "search" });
    },
    changeIndex(type, dataType, i, data) {
      let index;
      if (type === "pre") {
        if (i === 0) {
          this.$message.warning("当前已经是第一个，无法再上移");
          return;
        } else {
          index = i - 1;
        }
      } else {
        if (i === this.config.data[dataType].length - 1) {
          this.$message.warning("当前已经是最后一个，无法再下移");
          return;
        } else {
          index = i + 1;
        }
      }
      let d = this.config.data[dataType];
      d.splice(index, 1, ...d.splice(i, 1, d[index]));
      this.$emit("changeValue", "data", dataType, this.config.data[dataType]);
    },
    addSelect() {
      let length = this.config.data.selectTypeData.length;
      this.config.data.selectTypeData.push({
        data: "",
        width: "",
        height: 32,
        type: "",
        marginLeft: "",
        marginTop: "",
        id: length,
      });
      this.$emit(
        "changeValue",
        "data",
        "selectTypeData",
        this.config.data.selectTypeData
      );
    },
  },
};
</script>

<style lang="scss">
.right-setting {
  height: calc(100% - 45px) !important;
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
</style>
