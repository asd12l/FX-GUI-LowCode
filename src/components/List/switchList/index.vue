<!--
 * @Descripttion: 说明
 * @version: V1.0
 * @Author: 卜倩倩
 * @Date: 2023-08-23 14:07:52
 * @LastEditors: 卜倩倩
 * @LastEditTime: 2023-11-24 13:55:24
-->
<template>
  <div
    class="switchList-wrapper"
    :style="{
      width: config.width + 'px',
      height: config.height + 'px',
    }"
    v-show="isShowModuleFunc(config)"
  >
    <div
      class="background"
      :style="{
        backgroundImage: 'url(' + config.box.backgroundImage + ')',
        opacity: config.box.opacity,
      }"
    ></div>
    <div
      class="level_1_tab"
      :style="{
        display: config.level_1.display,
        background: config.level_1.background,
        height: config.level_1.height + 'px',
        borderRadius: config.level_1.height + 'px',
      }"
    >
      <span
        v-for="(item, index) in config.level_1_tab"
        :key="index"
        :style="{
          lineHeight: config.level_1.height + 'px',
          color: config.level_1.color,
          fontSize: config.level_1.fontSize + 'px',
          fontFamily: config.level_1.fontFamily,
          letterSpacing: config.level_1.letterSpacing + 'px',
          borderRadius: config.level_1.height + 'px',
          fontWeight: config.level_1.fontWeight,
          fontStyle: config.level_1.fontStyle,
          border:
            level_1_activeIndex === index
              ? config.level_1.borderWidth + 'px solid ' + config.box.mainColor
              : '2px solid transparent',
          background:
            level_1_activeIndex === index
              ? 'linear-gradient(90deg,' +
                config.box.mainColor.slice(
                  0,
                  config.box.mainColor.lastIndexOf(',')
                ) +
                ',.5),rgba(255, 119, 66, 0))'
              : '',
          boxShadow:
            level_1_activeIndex === index
              ? 'inset 10px 0 10px 0 ' +
                config.box.mainColor.slice(
                  0,
                  config.box.mainColor.lastIndexOf(',')
                ) +
                ',.5)'
              : '',
        }"
        :class="level_1_activeIndex === index ? 'active' : ''"
        @click="level_1_activeIndex = index"
      >{{ item }}</span>
    </div>
    <div
      class="level_2_tab"
      :style="{
        display: config.level_2.display,
        height: config.level_2.height + 'px',
      }"
    >
      <span
        v-for="(item, index) in config.level_2_tab[level_1_activeIndex]"
        :key="index"
        :style="{
          lineHeight: config.level_2.height + 'px',
          color:
            level_2_activeIndex === index
              ? config.box.mainColor
              : config.level_2.color,
          fontSize: config.level_2.fontSize + 'px',
          fontFamily: config.level_2.fontFamily,
          fontWeight: config.level_2.fontWeight,
          fontStyle: config.level_2.fontStyle,
          letterSpacing: config.level_2.letterSpacing + 'px',
          ...cssVars,
        }"
        :class="level_2_activeIndex === index ? 'clickactive' : ''"
        @click="(level_2_activeIndex = index), getTreeData()"
      >{{ item }}</span>
    </div>
    <div
      v-if="config.searchBox.display === 'flex'"
      :style="{
        width: config.searchBox.width + 'px',
        height: config.searchBox.height + 'px',
        margin: '20px 0',
        position: 'relative',
      }"
    >
      <el-input
        v-model="input"
        :style="{
          ...cssVars,
          width: config.searchBox.width + 'px',
          height: config.searchBox.height + 'px',
          left: config.searchBox.left + 'px',
          top: config.searchBox.top + 'px',
        }"
        :placeholder="config.searchBox.placeHolder"
        @keyup.enter.native="filterNode"
      >
        <i
          slot="suffix"
          class="el-input__icon el-icon-search"
          @click="filterNode"
        ></i>
      </el-input>
    </div>
    <div
      class="buttons"
      v-if="config.isShowCheckbox"
    >
      <el-checkbox
        v-model="checked"
        :indeterminate="indeterminate"
        @change="allCheckHandle"
      >
        全选
      </el-checkbox>
      <span
        class="btns"
        :style="{
          backgroundColor: config.box.mainColor,
        }"
        @click="showSplitScreen"
      >查看画面</span>
    </div>
    <el-scrollbar>
      <el-tree
        ref="tree"
        :data="data"
        :props="defaultProps"
        node-key="rowid"
        :title="config.data.name"
        :expand-on-click-node="true"
        :show-checkbox="config.isShowCheckbox"
        :filter-node-method="filterNode"
        :default-expanded-keys="defaultShowNodes"
        @check-change="handleCheckChange"
        @node-expand="handleNodeExpand"
        @node-collapse="handleNodeCollapse"
        :default-expand-all="config.box.isExpand"
        :style="{
          ...cssVars,
        }"
      >
        <div
          slot-scope="{ node, data }"
          class="span-ellipsis"
        >
          <div
            class="span-ellipsis-left"
            style="display: flex; align-items:center;"
            :style="{
              width:
                !config.right.show ||
                (!config.right.hoverPic && !config.right.defaultPic)
                  ? '100%'
                  : !data.children && config.level_3_text.isShowIcon
                  ? 'calc(100% - 50px)'
                  : 'calc(100% - 100px)',
            }"
            @click="(openTree = true), handleNodeClick(data)"
            :class="data.children ? 'level1' : 'level2'"
          >
            <span
              v-if="!data.children && config.level_3_text.isShowIcon"
              style="width: 20px;height: 20px;margin-right:10px;display:flex;align-items:center"
            >
              <img
                style="width: 20px;height: 20px"
                v-if="
                  data.camera_type === '枪机' && data.device_status === '在线'
                "
                src="../../../assets/image/common/qiang_online.png"
                alt=""
              />
              <img
                style="width: 20px;height: 20px"
                v-if="
                  data.camera_type === '枪机' && data.device_status === '离线'
                "
                src="../../../assets/image/common/qiang_offline.png"
                alt=""
              />
              <img
                style="width: 20px;height: 20px"
                v-if="
                  data.camera_type === '球机' && data.device_status === '在线'
                "
                src="../../../assets/image/common/qiu_online.png"
                alt=""
              />
              <img
                style="width: 20px;height: 20px"
                v-if="
                  data.camera_type === '球机' && data.device_status === '离线'
                "
                src="../../../assets/image/common/qiu_offline.png"
                alt=""
              />
            </span>
            <span
              :title="data.name"
              style="font-size: 20px;width: 100%;overflow:hidden;white-space: nowrap;text-overflow:ellipsis"
              :style="{
                fontWeight: data.children
                  ? config.level_1_text.fontWeight
                  : config.level_2_text.fontWeight,
                fontStyle: data.children
                  ? config.level_1_text.fontStyle
                  : config.level_2_text.fontStyle,
                textAlign: data.children
                  ? config.level_1_text.textAlign
                  : config.level_2_text.textAlign,
                color: data.children
                  ? config.level_1_text.color
                  : config.level_2_text.color,
                fontSize: data.children
                  ? config.level_1_text.fontSize + 'px'
                  : config.level_2_text.fontSize + 'px',
                fontFamily: data.children
                  ? config.level_1_text.fontFamily
                  : config.level_2_text.fontFamily,
              }"
            >
              {{ data.name }}</span>
          </div>
          <div
            class="span-ellipsis-right"
            v-if="
              config.right.show &&
                (config.right.hoverPic || config.right.defaultPic)
            "
          >
            <span
              v-if="data.children"
              @click="(openTree = false), eachMap(node, data)"
            >{{ data.count }}</span>
            <span
              v-else-if="!data.children"
              class="right-icon"
              @click.stop="collectItem(data)"
              :style="{
                width: config.right.picWidth + 'px',
                height: config.right.picHeight + 'px',
                backgroundImage:
                  'url(' +
                  (data.is_emphasis === '是'
                    ? config.right.hoverPic
                    : config.right.defaultPic) +
                  ')',
              }"
            ></span>
          </div>
        </div>
      </el-tree>
    </el-scrollbar>
    <transition name="el-fade-in">
      <div
        class="message-dialog"
        v-show="isShowModal"
        :style="{
          ...cssVars,
          background: config.box.subboxColor,
        }"
      >
        <div class="head">
          <span>提示</span>
          <span
            class="close-icon"
            @click="isShowModal = false"
          ></span>
        </div>
        <div class="message">是否取消重点监控</div>
        <div class="btns">
          <span @click="isShowModal = false">取消</span>
          <span @click="confirm">确定</span>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import 'element-ui/lib/theme-chalk/base.css';
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';
import { getFilterRows, editSceneJson } from '@/utils/api';
import { appKey, sign } from '@/utils/const.js';
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
    },
    confirmCallBack: {
      type: Function,
      default: () => {
        return () => {};
      }
    }
  },
  components: {
    // CollapseTransition.name,
    CollapseTransition
  },
  data() {
    return {
      isShowModal: false,
      currentRow: null,
      defaultShowNodes: [],
      level_1_tab: [],
      level_1_activeIndex: 0,
      level_2_activeIndex: 0,
      input: '',
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      openTree: false,
      data: [],
      piclist: [],
      indeterminate: false,
      checked: false,
      checkedNodes: [],
      totalNum: 0,
      tree: [],
      hasChildNode: []
    };
  },
  watch: {
    'config.level_1_text.display': {
      handler() {
        this.remapData();
      },
      deep: true,
      immediate: true
    },
    'config.level_2_text.display': {
      handler() {
        this.remapData();
      },
      deep: true,
      immediate: true
    },
    input(val) {
      this.$refs.tree.filter(val);
    }
  },
  computed: {
    cssVars() {
      return {
        '--backgroundColor':
          this.config.box.mainColor.slice(
            0,
            this.config.box.mainColor.lastIndexOf(',')
          ) + ',.1)',
        '--borderColor':
          this.config.box.mainColor.slice(
            0,
            this.config.box.mainColor.lastIndexOf(',')
          ) + ',.4)',
        '--background':
          'linear-gradient(90deg,rgba(255, 119, 66, 0) 3%,' +
          this.config.box.mainColor.slice(
            0,
            this.config.box.mainColor.lastIndexOf(',')
          ) +
          ',.5)' +
          ' 53%,rgba(255, 119, 66, 0) 101%)',
        '--mainColor': this.config.box.mainColor,
        '--leafShow': this.config.level_2_text.display,
        '--inputHeight': this.config.searchBox.height + 'px',
        '--inputColor': this.config.searchBox.color,
        '--inputFontSize': this.config.searchBox.fontSize + 'px',
        '--hoverColor': this.config.box.hoverColor,
        '--activeColor': this.config.box.activeColor,
        '--rightColor': this.config.right.color,
        '--rightFontSize': this.config.right.fontSize + 'px'
      };
    }
  },
  mounted() {
    this.getPicData();
    this.getTreeData();
  },
  methods: {
    remapData() {
      if (
        this.config.level_1_text.display === 'flex' &&
        this.config.level_2_text.display === 'flex'
      ) {
        this.data = JSON.parse(JSON.stringify(this.tree));
      } else if (
        this.config.level_1_text.display === 'flex' &&
        this.config.level_2_text.display !== 'flex'
      ) {
        const renderTree = (tree) => {
          let treeItem = [];
          const mapTree = (data) => {
            data.forEach((item) => {
              if (item.children && item.children.length) {
                mapTree(item.children);
              } else if (!item.children) {
                treeItem.push(item);
              }
            });
          };
          mapTree(tree);
          return treeItem;
        };
        let tree = JSON.parse(JSON.stringify(this.tree));
        this.data = tree.map((item) => {
          if (item.children && item.children.length) {
            return {
              count: item.count,
              name: item.name,
              rowid: item.rowid,
              children: renderTree(item.children)
            };
          } else {
            return item;
          }
        });
      } else if (
        this.config.level_1_text.display !== 'flex' &&
        this.config.level_2_text.display !== 'flex'
      ) {
        let treedata = [];
        const renderTree = (data) => {
          data.forEach((item) => {
            if (item.children && item.children.length) {
              renderTree(item.children);
            } else if (!item.children) {
              treedata.push(item);
            }
          });
        };
        renderTree(JSON.parse(JSON.stringify(this.tree)));
        this.data = treedata;
        console.log(this.data, '===data');
      }
      this.$nextTick(() => {
        var allNodes = this.$refs.tree.store._getAllNodes();
        this.totalNum = allNodes.filter((item) => item.isLeaf).length;
      });

      this.$forceUpdate();
    },
    // 树节点展开
    handleNodeExpand(data) {
      // 保存当前展开的节点
      let flag = false;
      this.defaultShowNodes.some((item) => {
        if (item === data.rowid) {
          // 判断当前节点是否存在， 存在不做处理
          flag = true;
          return true;
        }
      });
      if (!flag) {
        // 不存在则存到数组里
        this.defaultShowNodes.push(data.rowid);
      }
    },
    // 树节点关闭
    handleNodeCollapse(data) {
      this.defaultShowNodes.some((item, i) => {
        if (item === data.rowid) {
          // 删除关闭节点
          this.defaultShowNodes.length = i;
        }
      });
    },
    async getTreeData() {
      // const worksheetid =
      //   this.config.level_2_worksheetid[this.level_1_activeIndex][
      //     this.level_2_activeIndex
      //   ];
      // const param =
      //   this.config.level_2_params[this.level_1_activeIndex][
      //     this.level_2_activeIndex
      //   ];
      // const worksheetid1 =
      //   this.config.level_2_worksheetid1[this.level_1_activeIndex][
      //     this.level_2_activeIndex
      //   ];
      // const param1 =
      //   this.config.level_2_params1[this.level_1_activeIndex][
      //     this.level_2_activeIndex
      //   ];
      let result = null,
        result1 = null;
      // if (worksheetid) {
      //   const data = {
      //     appKey: appKey,
      //     sign: sign,
      //     worksheetId: worksheetid,
      //     // rowId: sessionStorage.getItem('rowid'),
      //     pageIndex: 1,
      //     pageSize: 100,
      //     filters: param || []
      //   };
      //   result = await getFilterRows(data);
      //   var group = this.remapGroup(result.data.rows, '');
      // }
      result = [
        {
          rowid: '4f726266-35c1-41bb-9da4-44a01ca60fa6',
          pid: '[]',
          '63bcfbbf524295b04be7857f': '[]',
          '63bcfbbf524295b04be78580':
            '["6827fcfc-1a9a-44b1-aa14-707fccec40bf","69c28549-2f4b-4566-9ada-a9ed48f655de","bdae13a3-dd1a-4b18-88e1-dcd070e4db9e","a2bf4639-bc5b-490a-bd8b-8f681adbf739","59c0ebf4-e3cb-4f08-9bbb-c862a6b47345","154c80ed-83ce-49d8-8cc1-39203da98779","2dc05afd-ca89-4b8d-af3f-03705b8b8d69","94bbf685-964c-41eb-9efa-c72c54c41ba4","ff030c08-e10e-452b-800d-ef6076dcd66a","e4c23d10-3707-4e58-a7a7-96f563e60b54","ba788b72-7ce7-43ed-bd39-620334705b41","119172b7-a221-4499-bcea-bbe68c2684e8","7898a4a3-4f43-4c16-91e9-386aba51876f","0d4dfc17-6da5-4fc9-86b1-4389832a07c0","f2f7fca6-aa49-44fe-8ab0-b0de3197f6a9","0d9ac173-7f13-4abe-8fd0-2439e7f24192","58e55edc-0d19-4893-b143-e30bf5163738","8f530f5d-c654-4f18-8b67-aa3089670c60","9ecb89c3-a946-4d8a-a0fe-2e68f5d552f4","6d1fc011-29ed-4eb0-b2de-ec5e1d5b5272","4be375a5-04b9-429a-a89f-2cd6b2557bba","0a64c84d-1ab5-48f9-b9dc-054885119851","7c4d0c3e-a9cc-44e8-834c-f19e4677a340","f16c7156-f7a8-4ff3-bd44-22df3aac34a5","cd7be013-a2ac-48d3-9413-6de5c51610e1","8bfd6d48-ad15-428d-a8c3-206a88fe3300","2d6556b2-9a5a-47ed-840f-ec6dec9a21bf"]',
          group_name: '层级1'
        }
      ];
      var group = this.remapGroup(result, '');
      // if (worksheetid1) {
      // const data1 = {
      //   appKey: appKey,
      //   sign: sign,
      //   worksheetId: worksheetid1,
      //   // rowId: sessionStorage.getItem('rowid'),
      //   pageIndex: 1,
      //   pageSize: 100,
      //   sortId: 'sort',
      //   isAsc: true,
      //   filters: param1 || []
      // };
      // result1 = await getFilterRows(data1);
      this.tree = [
        {
          camera: '',
          device_name: '设备1',
          camera_group:
            '[{"type":0,"sid":"4f726266-35c1-41bb-9da4-44a01ca60fa6","sidext":"","accountId":"","fullname":"","avatar":"","name":"设备1","ext1":"","ext2":"","link":"/worksheet/652cd71a1f76aeb5855bc633/row/4f726266-35c1-41bb-9da4-44a01ca60fa6","projectId":"","sourcevalue":"{\\"_id\\":\\"6530fbcf8213dcf19d97cd1d\\",\\"wsid\\":\\"652cd71a1f76aeb5855bc633\\",\\"rowid\\":\\"4f726266-35c1-41bb-9da4-44a01ca60fa6\\",\\"status\\":1,\\"63bcfbbf524295b04be7857d\\":\\"胡家埭方家哈\\",\\"63bcfbbf524295b04be7857f\\":0,\\"63bcfbbf524295b04be7857e\\":\\"[]\\",\\"unreads\\":false,\\"autoid\\":0,\\"allowedit\\":false,\\"allowdelete\\":false,\\"controlpermissions\\":\\"\\",\\"rq63bcfbbf524295b04be7857f\\":0,\\"discussunreads\\":false,\\"rq63bcfbbf524295b04be78580\\":0,\\"rc63bcfbbf524295b04be7857f\\":\\"[]\\"}"}]',
          camera_manufacturer: '海康',
          camera_type: '枪机'
        }
      ];
      this.tree = this.remapTree(this.tree, group);
      // worksheetid && (this.tree = this.remapTree(this.tree, group));
      var toTreeCount = (data = [], countField = 'count') =>
        data.reduce(
          (total, cur) =>
            total +
            (cur[countField] = toTreeCount(cur.children || [], countField)),
          data.filter((item) => !item.children).length
        );
      toTreeCount(this.tree, 'count');
      this.remapData();
      // }
    },
    calc(node) {
      if (!node) return 0;
      const children = node.children;
      const count = node.count === undefined ? 1 : node.count;
      if (!children) return count;
      const value = count + children.reduce((v, child) => v + calc(child), 0);
      node.count = value;
      return value;
    },
    remapGroup(arr, parent) {
      let tree = [];
      let that = this;
      for (var i = 0; i < arr.length; i++) {
        let pid = '';
        if (arr[i].pid && JSON.parse(arr[i].pid).length) {
          pid = JSON.parse(arr[i].pid)[0].sid;
        }
        if (pid === parent) {
          var node = {
            rowid: arr[i].rowid,
            name: arr[i].group_name,
            children: that.remapGroup(arr, arr[i].rowid)
          };
          tree.push(node);
        }
      }
      return tree;
    },
    remapTree(tree, group) {
      let that = this;
      group.forEach((item) => {
        tree.forEach((el) => {
          if (
            JSON.parse(el.camera_group)[0] &&
            item.rowid === JSON.parse(el.camera_group)[0].sid
          ) {
            el.name = el.device_name;
            item.children.push(el);
          }
        });
        if (item.children && item.children.length) {
          this.hasChildNode.push(item.rowid);
          that.remapTree(tree, item.children);
        }
      });
      return group;
    },
    allCheckHandle() {
      if (this.checked) {
        let ids = [];
        this.data.forEach((item) => {
          ids.push(item.rowid);
        });
        this.$refs.tree.setCheckedKeys(ids);
      } else {
        this.$refs.tree.setCheckedKeys([]);
      }
    },
    showSplitScreen() {
      this.checkedNodes = this.$refs.tree.getCheckedNodes(true); // 叶子节点
      console.log(this.checkedNodes);
      // if (this.checkedNodes.length && this.checkedNodes.length <= 9) {
      //   this.$store.commit('setPopupName', 'splitCameraScreenPopup');
      // } else if (this.checkedNodes.length > 9) {
      //   this.checkedNodes = this.checkedNodes.slice(0, 9);
      //   this.$emit('showError', '最多显示九路摄像头');
      //   this.$store.commit('setPopupName', 'splitCameraScreenPopup');
      // } else {
      //   this.$emit('showError', '请选择摄像头');
      // }
      // this.$store.commit('setSplitCameraScreenData', this.checkedNodes);
    },
    handleCheckChange() {
      const checkedNodes = this.$refs.tree.getCheckedNodes(true, false);
      if (checkedNodes.length < this.totalNum && checkedNodes.length > 0) {
        this.indeterminate = true;
        this.checked = false;
      } else if (checkedNodes.length === this.totalNum) {
        this.indeterminate = false;
        this.checked = true;
      } else {
        this.indeterminate = false;
        this.checked = false;
      }
    },
    filterNode(value, data) {
      console.log(value, data);
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    handleNodeClick(data) {
      if (!data.children) {
        console.log('data::::::', data);
        this.callBack && this.callBack(data);
      }
    },
    async getPicData() {
      // try {
      const data = {
        appKey: appKey,
        sign: sign,
        worksheetId: 'fylbbj',
        rowId: sessionStorage.getItem('rowid'),
        pageIndex: 1,
        pageSize: 100
      };
      const result = await getFilterRows(data);
      this.piclist = result.data.rows.map(
        (item) => item.titleIcon && JSON.parse(item.titleIcon)[0].DownloadUrl
      );
      // if (result.success) {
      //   this.$message.success('获取成功');
      // } else {
      //   this.$message.error('获取失败');
      // }
      // } catch (error) {
      //   this.$message.error('获取失败');
      // }
    },
    async collectItem(data) {
      if (data.is_emphasis === '是') {
        this.isShowModal = true;
        this.currentRow = data;
      } else {
        await this.updateData(data);
        this.confirmCallBack && this.confirmCallBack(data);
      }
    },
    async confirm() {
      await this.updateData(this.currentRow);
      this.confirmCallBack && this.confirmCallBack(this.currentRow);
    },
    async updateData(data) {
      const param = {
        appKey: appKey,
        sign: sign,
        worksheetId: 'camera',
        rowId: data.rowid,
        controls: [
          {
            controlId: 'is_emphasis',
            value: data.is_emphasis === '是' ? '否' : '是',
            valueType: 1
          }
        ]
      };
      const result = await editSceneJson(param);
      if (result.success) {
        this.getTreeData();
        this.isShowModal = false;
      }
    }
  }
};
</script>

<style lang="scss">
.switchList-wrapper {
  padding: 30px 20px;
  position: relative;
  display: flex;
  flex-direction: column;

  ::-webkit-scrollbar-track {
    display: none;
  }

  .background {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background-size: 100% 100%;
    z-index: -1;
  }

  .buttons {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .el-checkbox__inner {
      background-color: transparent;
      border: 1px solid #999;
    }

    .is-checked .el-checkbox__inner {
      background-color: #21a3ff;
      border: 1px solid #21a3ff;

      &:after {
        border: 1px solid #000;
        border-left: 0;
        border-top: 0;
      }
    }

    .btns {
      width: 90px;
      height: 34px;
      color: #06142c;
      font-size: 16px;
      background: #308dff;
      border-radius: 2px;
      line-height: 34px;
      text-align: center;
      cursor: pointer;
    }
  }

  .level_1_tab {
    display: flex;

    span {
      flex: 1;
      text-align: center;
      pointer-events: all;
      border: 2px solid transparent;
      cursor: pointer;
    }
  }

  .level_2_tab {
    display: flex;
    margin-top: 20px;
    border-bottom: 1px solid hsla(0, 0%, 100%, 0.2);
    pointer-events: all;

    span {
      flex: 1;
      text-align: center;
      cursor: pointer;

      &.clickactive {
        position: relative;

        &::before {
          content: '';
          display: block;
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translate(-50%);
          width: 60px;
          height: 4px;
          background: var(--background);
        }
      }
    }
  }

  .el-input {
    position: absolute;
    pointer-events: all;

    .el-input__inner {
      background-color: var(--backgroundColor);
      border-color: var(--borderColor);
      height: var(--inputHeight);
      color: var(--inputColor);
      font-size: var(--inputFontSize);
    }

    .el-input__prefix,
    .el-input__suffix {
      color: var(--borderColor);
    }
  }

  input::-webkit-input-placeholder {
  }

  .el-scrollbar__wrap {
    overflow-x: hidden;
  }

  .el-scrollbar {
    height: 100%;
  }

  .el-scrollbar__bar.is-horizontal {
    display: none;
  }

  .el-tree {
    font-size: 16px;
    background-color: transparent;
    color: #fff;
    pointer-events: all;

    .el-tree-node__content:active {
      background: var(--activeColor);
    }

    .el-tree-node__content:hover {
      background: var(--hoverColor);
    }

    .el-tree-node:focus > .el-tree-node__content {
      background: var(--activeColor) !important;
    }

    .el-tree-node__content {
      // width: calc(100% - 36px);
      height: 50px;
    }

    .el-tree-node.is-current > .el-tree-node__content {
      background: var(--activeColor) !important;
    }

    .el-tree-node__expand-icon {
      color: var(--mainColor);
      font-size: 16px;
    }

    .el-tree-node__expand-icon.is-leaf {
      color: transparent;
      display: var(--leafShow);
    }

    .span-ellipsis {
      display: flex;
      justify-content: space-between;
      // flex: 1;
      width: calc(100% - 28px);
      height: 100%;
      line-height: 50px;

      &-left {
        width: calc(100% - 50px);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      &-right {
        display: flex;
        width: 50px;
        align-items: center;
        justify-content: center;
        color: var(--rightColor);
        font-size: var(--rightFontSize);

        .right-icon {
          display: flex;
          background-size: 100% 100%;
        }
      }

      .level1 span {
        display: block;
        width: 100%;
        padding-right: 5px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .level2 span {
        display: block;
        width: 100%;
        // padding-right: 23px;
      }
    }

    .el-checkbox {
      .el-checkbox__inner {
        background-color: transparent;
        border: 1px solid #999;
        border-radius: none;
      }

      &.is-checked .el-checkbox__inner {
        background-color: #21a3ff;
        border: 1px solid #21a3ff;

        &:after {
          border: 1px solid #000;
          border-left: 0;
          border-top: 0;
        }
      }
    }
  }

  .message-dialog {
    width: 350px;
    height: 232px;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    // background: rgba(0, 0, 0, 1);
    box-sizing: border-box;
    border-radius: 4px;
    pointer-events: all;
    z-index: 1;

    .head {
      width: 100%;
      height: 40px;
      line-height: 40px;
      background: rgba(255, 255, 255, 0.1);
      color: #fff;
      text-align: center;
      font-size: 18px;
      position: relative;

      .close-icon {
        width: 24px;
        height: 24px;
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        background-image: url('../../../assets/image/close.png');
        background-size: 100% 100%;
        cursor: pointer;
      }
    }

    .message {
      width: 100%;
      height: 124px;
      line-height: 124px;
      text-align: center;
      color: #fff;
    }

    .btns {
      display: flex;
      justify-content: space-evenly;

      span {
        width: 90px;
        height: 38px;
        line-height: 38px;
        text-align: center;
        border-radius: 2px;
        cursor: pointer;

        &:nth-child(1) {
          border-color: var(--mainColor);
          border: 1px solid;
          color: var(--mainColor);
        }

        &:nth-child(2) {
          background: var(--mainColor);
          color: #081b22;
        }
      }
    }
  }
}
</style>
