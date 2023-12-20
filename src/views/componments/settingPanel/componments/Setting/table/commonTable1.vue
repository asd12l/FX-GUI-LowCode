<template>
  <el-scrollbar class="right-setting scrollbar-wrapper">
    <el-form
      label-width="136px"
      size="small"
      class="border-box"
      style="padding: 8px 16px"
    >
      <commonSetTitle
        :config="config"
        @changeSize="(type, val) => $emit('changeSize', type, val)"
      />
      <el-form-item label="数据展示类型">
        <el-radio-group
          v-model="config.showDataType"
          @input="(val) => $emit('changeSize', 'showDataType', val)"
        >
          <el-radio label="table">表格</el-radio>
          <el-radio label="card">卡片</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-collapse>
        <el-collapse-item title="组件配置">
          <el-form-item label="是否使用背景图：">
            <el-switch
              v-model="config.isShowBackgroundImg"
              @change="(val) => $emit('changeSize', 'isShowBackgroundImg', val)"
            ></el-switch>
          </el-form-item>
          <ImageSelector
            v-if="config.isShowBackgroundImg"
            label="背景图："
            @changeSrc="(val) => $emit('changeSize', 'background', val)"
            worksheetId="cockpit_dialog"
            imageField="beijingtu"
            :src="config.background"
          ></ImageSelector>
          <span v-else>
            <el-form-item label="背景色：">
              <el-color-picker
                v-model="config.box.background"
                size="mini"
                show-alpha
              ></el-color-picker>
            </el-form-item>
            <el-form-item label="边框宽度：">
              <div class="flex align-center">
                <el-input
                  v-model="config.box.borderWidth"
                  size="mini"
                  placeholder="请输入边框宽度"
                  style="margin-right: 12px"
                ></el-input>px
              </div>
            </el-form-item>
            <el-form-item label="边框样式：">
              <el-select
                popper-class="setting-select"
                v-model="config.box.borderStyle"
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
            <txtGradient
              :config="config"
              type="box"
              gradientType="border"
              txt="边框是否渐变："
              @changeValue="
                (param1, param2, val) =>
                  $emit('changeValue', param1, param2, val)
              "
            />
          </span>
        </el-collapse-item>
        <el-collapse-item title="头部">
          <el-form-item label="显示头部：">
            <el-switch v-model="config.header.show"></el-switch>
          </el-form-item>
          <el-form-item label="高度：">
            <el-input
              v-model="config.header.height"
              size="mini"
              placeholder="请输入高度"
            ></el-input>
          </el-form-item>
          <ImageSelector
            label="背景图："
            @changeSrc="
              (val) => $emit('changeValue', 'header', 'background', val)
            "
            worksheetId="cockpit_dialog"
            imageField="tbbjt"
            :src="config.header.background"
          ></ImageSelector>
          <el-collapse-item title="标题">
            <el-form-item label="标题：">
              <el-input
                v-model="config.header.txt"
                size="mini"
                placeholder="请输入文本"
              ></el-input>
            </el-form-item>
            <commonTab
              :config="config"
              type1="header"
              :isShowFontStyle="false"
              :isTxtAlign="false"
              @changeValue="
                (param1, param2, val) =>
                  $emit('changeValue', param1, param2, val)
              "
            />
            <txtGradient
              :config="config"
              type="headerTxt"
              parentType="header"
              txt="标题是否渐变："
              @changeValue="
                (param1, param2, val) =>
                  $emit('changeValue', param1, param2, val)
              "
            />
            <ImageSelector
              label="图标："
              @changeSrc="(val) => $emit('changeSize', 'header.icon', val)"
              worksheetId="cockpit_dialog"
              imageField="gbanbjt"
              @changeOpenFilter="
                (val) => $emit('changeSize', 'openFilter', val)
              "
              :openFilter="config.openFilter"
              :src="config.header.icon"
              :filterObj="config.filterObj"
            ></ImageSelector>
          </el-collapse-item>
          <el-collapse-item
            title="关闭按钮"
            style="margin-top: 2px"
          >
            <el-form-item label="显示关闭按钮：">
              <el-switch v-model="config.close.show"></el-switch>
            </el-form-item>
            <el-form-item label="宽度：">
              <el-input
                v-model="config.close.width"
                size="mini"
                placeholder="请输入宽度"
              ></el-input>
            </el-form-item>
            <el-form-item label="高度：">
              <el-input
                v-model="config.close.height"
                size="mini"
                placeholder="请输入高度"
              ></el-input>
            </el-form-item>
            <ImageSelector
              label="背景图："
              @changeSrc="(val) => $emit('changeSize', 'close.background', val)"
              worksheetId="cockpit_dialog"
              imageField="gbanbjt"
              @changeOpenFilter="
                (val) => $emit('changeSize', 'openFilter', val)
              "
              :openFilter="config.openFilter"
              :src="config.close.background"
              :filterObj="config.filterObj"
            ></ImageSelector>
          </el-collapse-item>
          <el-collapse-item title="tab标签">
            <el-form-item label="是否显示：">
              <el-switch v-model="config.tab.isShowChange"></el-switch>
            </el-form-item>
            <span v-if="config.tab.isShowChange">
              <el-form-item label="宽度：">
                <el-input
                  v-model="config.tab.width"
                  size="mini"
                  placeholder="请输入宽度"
                ></el-input>
              </el-form-item>
              <el-form-item label="高度：">
                <el-input
                  v-model="config.tab.height"
                  size="mini"
                  placeholder="请输入高度"
                ></el-input>
              </el-form-item>
              <ImageSelector
                label="tab1图片："
                @changeSrc="(val) => $emit('changeValue', 'tab', 'img1', val)"
                worksheetId="tabmbzj"
                imageField="default_img"
                @changeOpenFilter="
                  (val) => $emit('changeSize', 'openFilter', val)
                "
                :openFilter="config.openFilter"
                :src="config.tab.img1"
                :filterObj="config.filterObj"
              ></ImageSelector>
              <ImageSelector
                label="tab1选中图片："
                @changeSrc="
                  (val) => $emit('changeValue', 'tab', 'activeImg1', val)
                "
                worksheetId="tabmbzj"
                imageField="active_img"
                @changeOpenFilter="
                  (val) => $emit('changeSize', 'openFilter', val)
                "
                :openFilter="config.openFilter"
                :src="config.tab.activeImg1"
                :filterObj="config.filterObj"
              ></ImageSelector>
              <ImageSelector
                label="tab2图片："
                @changeSrc="(val) => $emit('changeValue', 'tab', 'img2', val)"
                worksheetId="tabmbzj"
                imageField="default_img"
                @changeOpenFilter="
                  (val) => $emit('changeSize', 'openFilter', val)
                "
                :openFilter="config.openFilter"
                :src="config.tab.img2"
                :filterObj="config.filterObj"
              ></ImageSelector>
              <ImageSelector
                label="tab2选中图片："
                @changeSrc="
                  (val) => $emit('changeValue', 'tab', 'activeImg2', val)
                "
                worksheetId="tabmbzj"
                imageField="active_img"
                @changeOpenFilter="
                  (val) => $emit('changeSize', 'openFilter', val)
                "
                :openFilter="config.openFilter"
                :src="config.tab.activeImg2"
                :filterObj="config.filterObj"
              ></ImageSelector>
            </span>
          </el-collapse-item>
        </el-collapse-item>
        <el-collapse-item title="展示数据">
          <div class="button-box">
            <el-button
              type="danger"
              size="mini"
              @click="clearShowTxt"
            >清除文本</el-button>
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-plus"
              @click="addShowTxt"
            >添加文本</el-button>
            <el-button
              type="primary"
              size="mini"
              @click="changeShowTxt"
            >修改数据</el-button>
          </div>
          <el-collapse-item
            v-for="(item, i) in showData"
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
              <el-select
                popper-class="setting-select"
                v-model="item.value"
                placeholder="请选择数据key"
              >
                <el-option
                  v-for="(item, i) in config.otherData.tableKeyData"
                  :label="item.label || item"
                  :key="i"
                  :value="item.value || item"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="筛选类型：">
              <el-select
                popper-class="setting-select"
                v-model="item.seletedType"
                placeholder="请选择类型"
                clearable
              >
                <el-option
                  v-for="(v, i) in selectTypeData"
                  :label="v.txt"
                  :key="i"
                  :value="v.type"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="展示位置：">
              <el-checkbox-group v-model="item.location">
                <el-checkbox label="table">表格</el-checkbox>
                <el-checkbox label="card">卡片</el-checkbox>
                <el-checkbox label="button">按钮</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <span style="margin-left:30px">
              <el-button
                type="danger"
                size="mini"
                @click="delData(i)"
              >删除选项</el-button>
            </span>
          </el-collapse-item>
        </el-collapse-item>
        <el-collapse-item title="表头样式">
          <commonTab
            :config="config"
            type1="table"
            type2="theader"
            @changeValue="
              (param1, param2, val) => $emit('changeValue', param1, param2, val)
            "
          ></commonTab>
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
          <el-form-item label="每页显示条数：">
            <el-input
              v-model="pageSize"
              size="mini"
              placeholder="请输入显示条数"
              @change="
                (val) => $emit('changeValue', 'requestParams', 'pageSize', val)
              "
            ></el-input>
          </el-form-item>
          <!-- <el-form-item label="显示序号：">
            <el-switch v-model="config.table.indexShow"></el-switch>
          </el-form-item> -->
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
                ></el-input>px
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
          <el-form-item label="外间距(上右下左)：">
            <div class="flex align-center">
              <el-input
                v-model="config.table.margin"
                size="mini"
                placeholder="请输入外间距"
                style="margin-right:12px"
              ></el-input>
            </div>
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
            @changeValue="
              (param1, param2, val) => $emit('changeValue', param1, param2, val)
            "
          ></commonTab>
          <el-collapse-item title="展示数据排序：">
            <div
              class="select-box"
              v-for="(val, index) in config.otherData.tableHead"
              :key="index"
            >
              <el-form-item :label="val.label">
                <el-input
                  v-model="val.sort"
                  size="mini"
                  placeholder="请输入排序"
                ></el-input>
              </el-form-item>
            </div>
            <div class="button-box">
              <el-button
                type="primary"
                size="mini"
                @click="changeSort('tableHead')"
              >修改排序</el-button>
            </div>
          </el-collapse-item>
          <el-collapse-item
            v-for="(item, i) in config.otherData.tableHead"
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
            <el-form-item label="枚举文本颜色：">
              <el-button
                type="primary"
                size="mini"
                icon="el-icon-plus"
                @click="addColorData(i)"
              >添加颜色配置</el-button>
            </el-form-item>
            <el-form-item
              class="no-margin"
              v-for="(v, index) in item.colorData"
              :key="index"
            >
              <el-input
                v-model="v.label"
                size="mini"
                placeholder="请输入值"
                style="width:200px"
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
                @click="delColor(i, index)"
              />
            </el-form-item>
            <el-form-item label="内容是否隐藏：">
              <el-switch v-model="item.showOverflow"></el-switch>
            </el-form-item>
          </el-collapse-item>
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
          <el-form-item label="选项高度：">
            <el-input
              v-model="config.selection.height"
              size="mini"
              placeholder="请输入高度"
            ></el-input>
          </el-form-item>
          <commonTab
            :config="config"
            type1="selection"
            :isShowFontStyle="false"
            @changeValue="
              (param1, param2, val) => $emit('changeValue', param1, param2, val)
            "
          ></commonTab>
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
              ></el-input>px
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
          <el-collapse-item title="选项排序：">
            <div
              class="select-box"
              v-for="(val, index) in config.otherData.selectTypeData"
              :key="index"
            >
              <el-form-item :label="val.label">
                <el-input
                  v-model="val.sort"
                  size="mini"
                  placeholder="请输入排序"
                ></el-input>
              </el-form-item>
            </div>
            <div class="button-box">
              <el-button
                type="primary"
                size="mini"
                @click="changeSort('selectTypeData')"
              >修改排序</el-button>
            </div>
          </el-collapse-item>
          <el-collapse-item
            v-for="(item, i) in config.otherData.selectTypeData"
            :key="i"
            :title="`选项 ${i + 1} 配置：`"
          >
            <el-form-item label="选项数据：">
              <el-input
                v-model="item.label"
                size="mini"
                disabled
              ></el-input>
            </el-form-item>
            <el-form-item label="显示label：">
              <el-switch v-model="item.isShowLabel"> </el-switch>
            </el-form-item>
            <el-form-item label="选项宽度：">
              <el-input
                v-model="item.width"
                size="mini"
                placeholder="请输入宽度"
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
          </el-collapse-item>
        </el-collapse-item>
        <el-collapse-item
          title="搜索项下拉框样式"
          v-if="config.otherData.selectTypeData.length > 0"
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
          <commonTab
            :config="config"
            type1="card"
            @changeValue="
              (param1, param2, val) => $emit('changeValue', param1, param2, val)
            "
          ></commonTab>
          <el-collapse-item title="展示数据排序(卡片)：">
            <div
              class="select-box"
              v-for="(val, index) in config.otherData.cardData"
              :key="index"
            >
              <el-form-item :label="val.label">
                <el-input
                  v-model="val.sort"
                  size="mini"
                  placeholder="请输入排序"
                ></el-input>
              </el-form-item>
            </div>
            <div class="button-box">
              <el-button
                type="primary"
                size="mini"
                @click="changeSort('cardData')"
              >修改排序</el-button>
            </div>
          </el-collapse-item>
          <el-collapse-item
            v-for="(item, i) in config.otherData.cardData"
            :key="i"
            :title="`文本 ${i + 1} 配置：`"
            style="margin-top:2px;"
          >
            <el-form-item label="数据：">
              <el-input
                v-model="item.label"
                size="mini"
                disabled
              ></el-input>
            </el-form-item>
            <el-form-item label="显示label：">
              <el-switch v-model="item.isShowLabel"> </el-switch>
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
          </el-collapse-item>
          <el-collapse-item title="按钮内容">
            <commonTab
              :config="config"
              :isShowColor="false"
              type1="card"
              type2="button"
              @changeValue="
                (param1, param2, val) =>
                  $emit('changeValue', param1, param2, val)
              "
            ></commonTab>
            <el-form-item label="高度：">
              <el-input
                v-model="config.card.button.height"
                size="mini"
                placeholder="请输入高度："
              ></el-input>
            </el-form-item>
            <el-collapse-item title="按钮排序：">
              <div
                class="select-box"
                v-for="(val, index) in config.otherData.buttonData"
                :key="index"
              >
                <el-form-item :label="val.label">
                  <el-input
                    v-model="val.sort"
                    size="mini"
                    placeholder="请输入排序"
                  ></el-input>
                </el-form-item>
              </div>
              <div class="button-box">
                <el-button
                  type="primary"
                  size="mini"
                  @click="changeSort('buttonData')"
                >修改排序</el-button>
              </div>
            </el-collapse-item>
            <el-collapse-item
              v-for="(item, i) in config.otherData.buttonData"
              :key="i"
              :title="`文本 ${i + 1} 配置：`"
              style="margin-top:2px;"
            >
              <el-form-item label="数据：">
                <el-input
                  v-model="item.label"
                  size="mini"
                  disabled
                ></el-input>
              </el-form-item>
              <el-form-item label="宽度：">
                <el-input
                  v-model="item.width"
                  size="mini"
                  placeholder="请输入宽度："
                ></el-input>
              </el-form-item>
              <el-form-item label="是否显示边框">
                <el-switch v-model="item.isShowBorder"> </el-switch>
              </el-form-item>
              <el-form-item label="颜色：">
                <el-color-picker
                  v-model="item.color"
                  size="mini"
                  show-alpha
                ></el-color-picker>
              </el-form-item>

              <el-form-item label="枚举文本颜色：">
                <el-button
                  type="primary"
                  size="mini"
                  icon="el-icon-plus"
                  @click="addButtonColorData(i)"
                >添加颜色配置</el-button>
              </el-form-item>
              <el-form-item
                class="no-margin"
                v-for="(v, index) in item.colorData"
                :key="index"
              >
                <el-input
                  v-model="v.label"
                  size="mini"
                  placeholder="请输入值"
                  style="width:180px"
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
                  @click="delButtonColor(i, index)"
                />
              </el-form-item>
            </el-collapse-item>
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
      </el-collapse>
    </el-form>
  </el-scrollbar>
</template>

<script>
import commonTab from '../componments/commonTab';
import commonSetTitle from '../componments/commonSetTitle';
import ImageSelector from '../componments/ImageSelector';
import txtGradient from '../componments/txtGradient';
export default {
  name: 'setting',
  components: { commonTab, commonSetTitle, ImageSelector, txtGradient },
  data() {
    return {
      styleList: ['solid', 'dashed'],
      border: {
        width: '',
        type: '',
        color: ''
      },
      selectTypeData: [
        { txt: '日期时间', type: 'dateTimePicker' },
        { txt: '时间', type: 'timePicker' },
        { txt: '关键字搜索', type: 'search' },
        { txt: '选择器', type: 'select' }
      ],
      selectData: {},
      pageSize: 10,
      b: [],
      showData: []
    };
  },
  props: {
    config: {
      type: Object,
      default: () => {
        return {};
      }
    },
    changeSize: {
      type: Function
    }
  },
  watch: {
    'config.otherData.showData': {
      handler(nl, ol) {
        this.showData = JSON.parse(JSON.stringify(nl));
        // this.getData(nl);
      },
      deep: true,
      immediate: false
    }
  },
  mounted() {
    this.showData = JSON.parse(JSON.stringify(this.config.otherData.showData));
    this.pageSize = this.config.requestParams.pageSize;
  },
  methods: {
    changefilterObj(val) {
      this.$emit('changeSize', 'filterObj', val);
    },
    clearShowTxt() {
      this.showData = [];
      let t = [...this.config.otherData.showData];
      t.splice(0, t.length);
      this.$emit('changeValue', 'otherData', 'showData', t);
    },
    addShowTxt() {
      this.showData.push({
        label: '',
        value: '',
        seletedType: '',
        location: []
      });
      // this.$emit("changeValue", "otherData", "showData", t);
    },
    changeShowTxt() {
      let s = JSON.parse(JSON.stringify(this.showData));
      this.$emit('changeValue', 'otherData', 'showData', s);
    },
    changeFieldMap(e, i, type) {
      let f = [...this.config.fieldMap];
      if (f && f.length > 0) {
        f[i][type] = e;
        this.$emit('changeSize', 'fieldMap', f);
      }
    },
    addColorData(i) {
      let t = [...this.config.otherData.tableHead];
      t[i].colorData.push({
        label: '',
        color: ''
      });
      this.$emit('changeValue', 'otherData', 'tableHead', t);
    },
    delColor(i, index) {
      let t = [...this.config.otherData.tableHead];
      t[i].colorData.splice(index, 1);
      this.$emit('changeValue', 'otherData', 'tableHead', t);
    },
    clearShowCardTxt() {
      this.$emit('changeValue', 'otherData', 'cardData', []);
    },
    addShowCardTxt() {
      let c = [...this.config.otherData.cardData];
      c.push({
        label: '',
        value: '',
        width: '',
        height: '',
        location: 'card'
      });
      this.$emit('changeValue', 'otherData', 'cardData', c);
    },
    clearShowButtonTxt() {
      this.$emit('changeValue', 'otherData', 'buttonData', []);
    },
    addShowButtonTxt() {
      let b = [...this.config.otherData.buttonData];
      let length = b.length;
      b.push({
        value: '',
        width: '',
        color: '',
        colorData: [],
        isShowBorder: false,
        location: 'button'
      });
      this.$emit('changeValue', 'otherData', 'buttonData', b);
    },
    addButtonColorData(i) {
      let b = this.config.otherData.buttonData;
      b[i].colorData.push({
        label: '',
        color: ''
      });
      this.$emit('changeValue', 'otherData', 'buttonData', b);
    },
    delButtonColor(i, index) {
      let b = this.config.otherData.buttonData;
      b[i].colorData.splice(index, 1);
      this.$emit('changeValue', 'otherData', 'buttonData', b);
    },
    delData(i) {
      this.showData.splice(i, 1);
      this.$emit('changeValue', 'otherData', 'showData', [...this.showData]);
    },
    changeSort(type) {
      let d1 = [...this.config.otherData[type]];
      let d = d1.sort(this.down('sort'));
      this.$emit('changeValue', 'otherData', type, d);
    },
    down(type) {
      return function (obj1, obj2) {
        const val1 = obj1[type] * 1;
        const val2 = obj2[type] * 1;
        return val1 - val2;
      };
    },
    changeIndex(type, dataType, i, data) {
      let index;
      if (type === 'pre') {
        if (i === 0) {
          this.$message.warning('当前已经是第一个，无法再上移');
          return;
        } else {
          index = i - 1;
        }
      } else {
        if (i === this.config.otherData[dataType].length - 1) {
          this.$message.warning('当前已经是最后一个，无法再下移');
          return;
        } else {
          index = i + 1;
        }
      }
      let d = [...this.config.otherData[dataType]];
      d.splice(index, 1, ...d.splice(i, 1, d[index]));
      this.$emit('changeValue', 'otherData', dataType, d);
    }
  }
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
