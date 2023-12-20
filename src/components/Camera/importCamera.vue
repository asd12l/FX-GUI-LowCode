<template>
  <div
    class="camera-box"
    v-show="isShowModuleFunc(config)"
    :style="{
      width: config.width + 'px',
      height: config.height + 'px',
      color: '#ffff',
    }"
  >
    <div class="main">
      <div v-if="list && list.length && list[0].length" class="main-contant">
        <el-carousel
          height="100%"
          width="100%"
          :interval="isNaN(video.time * 1000) ? 10000 : video.time * 1000"
          :arrow="config.video.scroll ? 'always' : 'never'"
          :autoplay="config.video.scroll ? true : false"
          :indicator-position="config.video.scroll ? '' : 'none'"
        >
          <el-carousel-item v-for="(item, i) in list" :key="i">
            <div
              class="camera-outer"
              :style="{
                justifyContent: item.length > 1 ? 'space-between' : 'center',
              }"
            >
              <div
                v-for="(it, i) in item"
                :key="i"
                class="camera"
                :style="{
                  width: video.width + 'px',
                  height: video.height + 'px',
                }"
              >
                <cameraPlay
                  :camera_data="it"
                  :config="config"
                  :svs_url="config.svs_url"
                  :address="config.address"
                />
                
              </div>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div v-else class="nodata">暂无数据</div>
    </div>
  </div>
</template>

<script>
import cameraPlay from "./components/cameraPlay.vue";
import { loadCustomApiData } from "@/utils/api";
export default {
  name: "importCamera",
  components: { cameraPlay },
  props: {
    config: {
      type: Object,
    },
  },
  data() {
    return {
      list: [],
    };
  },
  watch: {
    "config.data": {
      handler(nVal, oVal) {
        console.log("config::::::", this.config);
        if (nVal.length && this.config.video.dataNumber) {
          this.getArr(nVal, Number(this.config.video.dataNumber));
        } else {
          this.list = [[]];
        }
      },
      deep: true,
      immediate: true,
    },
    "config.video.dataNumber": {
      handler(nVal, oVal) {
        if (this.config.data.length && nVal) {
          this.getArr(this.config.data, Number(nVal));
        }
      },
      deep: true,
      immediate: true,
    },
  },
  //   watch: {
  //   "config.data": {
  //     handler() {
  //       console.log(this.config.data, "====config.data");
  //     },
  //     deep: true,
  //     immediate: true,
  //   },
  // },
  computed: {
    video() {
      let obj = { ...this.config.video };
      return obj;
    },
  },
  created() {},
  mounted() {
    console.log(this.config, "===config");
    //  this.getImportCamera()
  },
  methods: {
    getArr(arr, num) {
      let newArr =
        arr.length &&
        arr.map((item, index) => {
          return {
            ...item,
            rank: index + 1,
          };
        }); // 因为splice会改变原数组，要深拷贝一下
      let list = [];
      for (let i = 0; i < newArr.length; ) {
        list.push(newArr.splice(i, num));
      }
      this.list = list;
    },
    async getImportCamera() {
      const api = this.config.api;
      const { data } = await loadCustomApiData({
        api,
        type: this.config.requestType,
      });
      let d = [...data.list];
      this.config.data = d;
    },
  },
};
</script>
<style lang="scss" scoped>
.camera-box {
  pointer-events: all;
}
.el-carousel {
  width: 100%;
  height: 100%;
}
.main {
  height: 100%;
  align-items: center;
  color: #ccc;
  justify-content: center;
  display: flex;
  &-contant {
    width: 100%;
    // margin-right: 10px;
    height: 100%;
    display: flex;
    justify-content: space-between;

    flex-wrap: wrap;
    .camera-outer {
      align-items: center;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-content: space-around;
      flex-wrap: wrap;
      .camera {
        position: relative;
       .fullsrceen{
        position: absolute;
        right: 20px;
        bottom: 20px;
        display: none;
       } 
       &:hover .fullsrceen{
        display: block;
       }
      }
    }
  }
  .el-carousel__button{
    
  }
}
</style>
