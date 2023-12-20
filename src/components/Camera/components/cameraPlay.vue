<!--
 * @Descripttion:
 * @version:
 * @Author: ydl
 * @Date: 2022-11-18 16:55:39
 * @LastEditors: 卜倩倩
 * @LastEditTime: 2023-11-20 15:55:13
-->
<template>
  <div
    :style="sassStyle"
    :class="[
      'camera-play-box',
      config && config.splitVideo && config.splitVideo.noControl
        ? 'no-control'
        : '',
    ]"
  >
    <template v-if="isShowUnLine">
      <img
        src="../../../assets/component/img/cameraUnline.png"
        alt=""
      />
    </template>
    <!--  -->
    <template v-else-if="isShowNoVideo">
      <div
        class="no-video-box"
        :style="{
          background:
            (config && config.splitVideo && config.splitVideo.background) || '',
        }"
      >
        <img
          v-if="config.cameraType === 'splitCamera'"
          :src="config && config.splitVideo && config.splitVideo.whmtp"
          alt=""
        />
        <img
          class="img"
          v-else
          :src="config && config.video && config.video.background"
          alt=""
        />
      </div>
    </template>
    <template v-else-if="isShowNoSelect">
      <div
        class="no-video-box"
        :style="{
          background:
            (config && config.splitVideo && config.splitVideo.background) || '',
        }"
      >
        <img
          :src="config && config.splitVideo && config.splitVideo.wxzsxtmrtp"
          alt=""
        />
      </div>
    </template>
    <template v-else>
      <LivePlayer
        id="live-player-container"
        :video-url="videoUrl"
        alt="加载中..."
        fluent
        autoplay
        live
        style="width: 100%"
      />
      <!-- <live-player
          id="live-player-container"
          :video-url="videoUrl"
          alt="加载中..."
          fluent
          autoplay
          live
          style="width: 100%"
        /> -->
    </template>
  </div>
</template>

<script>
import { loadCustomApiData } from '@/utils/api';
import LivePlayer from '@liveqing/liveplayer';
export default {
  name: 'CameraPlay',
  props: ['camera_data', 'address', 'config', 'svs_url'],
  components: {
    LivePlayer
  },

  data() {
    return {
      videoUrl: '',
      isShowUnLine: false,
      isShowNoVideo: false,
      isShowNoSelect: false
    };
  },
  watch: {
    camera_data: {
      handler(nval, oval) {
        if (JSON.stringify(nval) == '{}') {
          this.isShowNoSelect = true;
        } else {
          this.isShowNoSelect = false;
        }
        if (nval.rowid !== oval.rowid) {
          this.getStreamStart();
        }
      }
    },
    address: {
      handler(nval, oval) {
        if (nval !== oval) {
          this.getStreamStart();
        }
      }
    },
    svs_url: {
      handler(nval, oval) {
        if (nval !== oval) {
          this.getStreamStart();
        }
      }
    }
  },
  computed: {
    sassStyle() {
      let d = this.config;
      if (d && d.controlSize) {
        return { '--fontSizeControl': `${d.controlSize}px` };
      } else {
        return { '--fontSizeControl': '14px' };
      }
    }
  },

  mounted() {
    if (this.camera_data.device_status === '离线') {
      this.isShowUnLine = true;
    } else {
      this.isShowUnLine = false;
      if (JSON.stringify(this.camera_data) == '{}') {
        this.isShowNoSelect = true;
      } else {
        this.isShowNoSelect = false;
        this.getStreamStart();
      }
    }
  },
  methods: {
    getStreamStart() {
      loadCustomApiData({
        api: this.address,
        type: 'get',
        data: {
          serial:
            this.camera_data.national_num ||
            this.camera_data.master_national_num, //主国标号
          code: this.camera_data.channel || this.camera_data.master_channel, //通道号
          svs_url: this.svs_url
        }
      })
        .then((res) => {
          const url = res.WS_FLV;
          this.videoUrl = url;
          this.isShowNoVideo = !url;
        })
        .catch(() => {
          this.videoUrl = '';
          this.isShowNoVideo = true;
        });
    }
  }
};
</script>

<style lang="scss">
.camera-play-box {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  // background: #031820;
  .player-wrapper {
    .vjs-control-bar {
      font-size: var(--fontSizeControl) !important;
    }
    .vjs-live-control,
    .vjs-snapshot-control {
      display: none !important;
    }
    .vjs-volume-panel {
      flex: auto;
    }
  }
  .no-video-box {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 14px;
    .img {
      width: 100%;
      height: 100%;
    }
    // .img {
    //   background: var(--whmtp);
    // }
  }
}
.no-control {
  .vjs-control-bar {
    display: none !important;
  }
}
</style>
