<!--
 * @Descripttion: 说明
 * @version: V1.0
 * @Author: 卜倩倩
 * @Date: 2023-08-01 13:58:48
 * @LastEditors: 卜倩倩
 * @LastEditTime: 2023-11-23 10:16:42
-->
<template>
  <div
    class="editor-wrapper"
    :style="{
      width: config.width + 'px',
      height: config.height + 'px'
    }"
    v-show="isShowModuleFunc(config)"
  >
    <div
      :style="{
      writingMode: config.writingMode,
      textOrientation: 'mixed'
    }"
      v-html="data"
    ></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: ''
    };
  },
  props: {
    config: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  watch: {
    'config.data': {
      handler(nval) {
        if (typeof nval === 'string') {
          this.data = nval;
        } else {
          this.data = nval[0].text;
        }
      },
      immediate: true,
      deep: true
    }
  },
  mounted() {},
  methods: {}
};
</script>

<style lang="scss">
.editor-wrapper {
  strong {
    font-weight: bold;
  }
  em {
    font-style: italic;
  }
}
</style>
