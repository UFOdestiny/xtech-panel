<!-- 滑块验证 -->
<template>
  <div class="slide-verify" id="slideVerify" ref="dialogopen" :style="widthlable" onselectstart="return false;">
    <canvas :width="w" :height="h" ref="canvas"></canvas>

    <canvas :width="w" :height="h" ref="block" class="slide-verify-block"></canvas>
    <div @click="refresh" class="slide-verify-refresh-icon el-icon-refresh"></div>
    <div @click="refresh" class="slide-verify-info" :class="{ fail: fail, show: showInfo }">
      {{ infoText }}
    </div>
    <div class="slide-verify-slider" :style="widthlable" :class="{
      'container-active': containerActive,
      'container-success': containerSuccess,
      'container-fail': containerFail
    }">
      <div class="slide-verify-slider-mask" :style="{ width: sliderMaskWidth }">
        <!-- slider -->
        <div @mousedown="sliderDown" @touchstart="touchStartEvent" @touchmove="touchMoveEvent" @touchend="touchEndEvent"
          class="slide-verify-slider-mask-item" :style="{ left: sliderLeft }">
          <div class="slide-verify-slider-mask-item-icon"></div>
        </div>
      </div>
      <span class="slide-verify-slider-text">{{ sliderText }}</span>
    </div>
  </div>
</template>
<script>
// function sum(x, y) {
//   return x + y
// }

// function square(x) {
//   return x * x
// }
export default {
  name: 'SlideVerify',
  props: {
    // block length
    l: {
      type: Number,
      default: 42
    },
    // block radius
    r: {
      type: Number,
      default: 10
    },
    // canvas width
    w: {
      type: Number,
      default: 300
    },
    // canvas height
    h: {
      type: Number,
      default: 150
    },
    block_x: {
      type: Number,
      default: 150
    },
    block_y: {
      type: Number,
      default: 20
    },
    sliderText: {
      type: String,
      default: 'Slide filled right'
    },
    imgurl: {
      type: String,
      default: ''
    },
    miniimgurl: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      containerActive: false, // container active class
      containerSuccess: false, // container success class
      containerFail: false, // container fail class
      canvasCtx: null,
      blockCtx: null,
      block: null,
      canvasStr: null,
      //block_x: undefined, // container random position
      // block_y: undefined,
      L: this.l + this.r * 2 + 3, // block real lenght
      img: undefined,
      originX: undefined,
      originY: undefined,
      isMouseDown: false,
      trail: [],
      widthlable: '',
      sliderLeft: 0, // block right offset
      sliderMaskWidth: 0, // mask width
      dialogVisible: false,
      infoText: '验证成功',
      fail: false,
      showInfo: false
    }
  },
  mounted() {
    //随机生成数this.block_x =
    this.init()
  },
  methods: {
    init() {
      this.initDom()
      this.bindEvents()
      this.widthlable = 'width:' + this.w + 'px;'
    },
    initDom() {
      this.block = this.$refs.block
      this.canvasStr = this.$refs.canvas
      this.canvasCtx = this.canvasStr.getContext('2d')
      this.blockCtx = this.block.getContext('2d')
      this.blockCtx.fillStyle = '#111111'
      this.blockCtx.shadowOffsetX = 1 // 阴影Y轴偏移
      this.blockCtx.shadowOffsetY = -1 // 阴影X轴偏移
      this.blockCtx.shadowBlur = 2 // 模糊尺寸
      this.blockCtx.shadowColor = 'rgba(0, 0, 0, 0.8)' // 颜色
      // this.initImg()
    },
    initImg(h) {
      var that = this
      const img = document.createElement('img')
      img.onload = onload
      img.onerror = () => {
        img.src = that.imgurl
      }
      img.src = that.imgurl
      img.onload = function () {
        that.canvasCtx.drawImage(img, 0, 0, that.w, that.h)
      }

      this.img = img
      const img1 = document.createElement('img')
      var blockCtx = that.blockCtx
      var block_y = h || that.block_y
      img1.onerror = () => {
        img1.src = that.miniimgurl
      }
      img1.src = that.miniimgurl
      img1.onload = function () {
        blockCtx.drawImage(img1, 0, block_y, 60, 60)
        blockCtx.fillStyle = '#111111'
        blockCtx.shadowOffsetX = 1 // 阴影Y轴偏移
        blockCtx.shadowOffsetY = -1 // 阴影X轴偏移
        blockCtx.shadowBlur = 2 // 模糊尺寸
        blockCtx.shadowColor = 'rgba(0, 0, 0, 0.8)' // 颜色
      }
    },
    refresh() {
      this.$emit('refresh')
    },
    sliderDown(event) {
      this.originX = event.clientX
      this.originY = event.clientY
      this.isMouseDown = true
    },
    touchStartEvent(e) {
      this.originX = e.changedTouches[0].pageX
      this.originY = e.changedTouches[0].pageY
      this.isMouseDown = true
    },
    bindEvents() {
      document.addEventListener('mousemove', e => {
        if (!this.isMouseDown) return false
        const moveX = e.clientX - this.originX
        const moveY = e.clientY - this.originY
        if (moveX < 0 || moveX + 38 >= this.w) return false
        this.sliderLeft = moveX + 'px'
        let blockLeft = ((this.w - 40 - 20) / (this.w - 40)) * moveX
        this.block.style.left = blockLeft + 'px'

        this.containerActive = true // add active
        this.sliderMaskWidth = moveX + 'px'
        this.trail.push(moveY)
      })
      document.addEventListener('mouseup', e => {
        if (!this.isMouseDown) return false
        this.isMouseDown = false
        if (e.clientX === this.originX) return false
        this.containerActive = false // remove active
        this.verify()
      })
    },
    touchMoveEvent(e) {
      if (!this.isMouseDown) return false
      const moveX = e.changedTouches[0].pageX - this.originX
      const moveY = e.changedTouches[0].pageY - this.originY
      if (moveX < 0 || moveX + 38 >= this.w) return false
      this.sliderLeft = moveX + 'px'
      let blockLeft = ((this.w - 40 - 20) / (this.w - 40)) * moveX
      this.block.style.left = blockLeft + 'px'

      this.containerActive = true
      this.sliderMaskWidth = moveX + 'px'
      this.trail.push(moveY)
    },
    touchEndEvent(e) {
      if (!this.isMouseDown) return false
      this.isMouseDown = false
      if (e.changedTouches[0].pageX === this.originX) return false
      this.containerActive = false
      this.verify()
    },
    verify() {
      // const arr = this.trail // drag y move distance
      // const average = arr.reduce(sum) / arr.length // average
      // const deviations = arr.map(x => x - average) // deviation array
      // const stddev = Math.sqrt(deviations.map(square).reduce(sum) / arr.length) // standard deviation

      const left = parseInt(this.block.style.left)
      this.$emit('success', left)
    },
    reset(h) {
      this.containerActive = false
      this.containerSuccess = false
      this.containerFail = false
      this.sliderLeft = 0
      this.block.style.left = 0
      this.sliderMaskWidth = 0
      this.canvasCtx.clearRect(0, 0, this.w, this.h)
      this.blockCtx.clearRect(0, 0, this.w, this.h)
      this.initImg(h)
    },
    handleFail() {
      this.fail = true
      this.showInfo = true
      this.infoText = '验证失败,请重试'
      this.containerFail = true
      setTimeout(() => {
        this.block.style.left = 0
        this.sliderMaskWidth = 0
        this.sliderLeft = 0
        this.fail = false
        this.showInfo = false
        this.containerFail = false
      }, 500)
    },
    handleSuccess() {
      this.showInfo = true
      this.infoText = '验证成功'
      this.containerSuccess = true
      setTimeout(() => {
        this.block.style.left = 0
        this.sliderMaskWidth = 0
        this.sliderLeft = 0
        this.fail = false
        this.showInfo = false
        this.containerSuccess = false
      }, 1000)
    }
  }
}
</script>
<style scoped>
.slide-verify {
  position: relative;
  width: 310px;
  margin: auto;
}

.slide-verify-block {
  position: absolute;
  left: 0;
  top: 0;
}

.slide-verify-refresh-icon {
  position: absolute;
  right: 0;
  top: 0;
  width: 34px;
  height: 34px;
  cursor: pointer;
  content: '刷新';
  font-size: 20px;
  line-height: 34px;
  text-align: center;
  font-weight: bold;
  color: rgb(255 255 255 / 80%);
  background-size: 34px 471px;
}

.slide-verify-refresh-icon:hover {
  transform: rotate(180deg);
  transition: all 0.2s ease-in-out;
}

.slide-verify-slider {
  position: relative;
  text-align: center;
  height: 40px;
  line-height: 40px;
  margin-top: 7px;
  color: #45494c;
  border: 1px solid #e4e7eb;
  background-color: #f7f9fa;
  border-radius: 2px;
}

.slide-verify-slider-mask {
  position: absolute;
  left: 0;
  top: 0;
  height: 40px;
  border: 0 solid #1991fa;
  background: #d1e9fe;
}

.slide-verify-info {
  position: absolute;
  top: 164px;
  left: 30px;
  height: 40px;
  color: #fff;
  text-align: center;
  line-height: 40px;
  background-color: #52ccba;
  opacity: 0;
}

.slide-verify-info.fail {
  background-color: #f57a7a;
}

.slide-verify-info.show {
  animation: hide 1s ease;
}

@keyframes hide {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 0.9;
  }
}

.slide-verify-slider-mask-item {
  width: 40px;
  height: 40px;
  position: absolute;
  top: -1px;
  left: -1px;
  height: 100%;
  background-color: #fff;
  border: 1px solid #e4e7eb;
  box-shadow: 0 0 1px rgb(0 0 0 / 30%);
  cursor: pointer;
  transition: background 0.2s linear;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 2px;
}

.slide-verify-slider-mask-item:hover {
  background: #1991fa;
}

.slide-verify-slider-mask-item:hover .slide-verify-slider-mask-item-icon {
  background-position: 0 0;
}

.slide-verify-slider-mask-item-icon {
  width: 14px;
  height: 12px;
  background: url('@/assets/icon-light.png') 0 -13px;
  background-size: 32px 172px;
}

.container-active .slide-verify-slider-mask-item {
  height: 40px;
  top: -1px;
  border: 1px solid #1991fa;
}

.container-active .slide-verify-slider-mask {
  height: 40px;
  border-width: 1px;
}

.container-success .slide-verify-slider-mask-item {
  height: 40px;
  top: -1px;
  border: 1px solid #52ccba;
  background-color: #52ccba !important;
}

.container-success .slide-verify-slider-mask {
  height: 40px;
  border: 1px solid #52ccba;
  background-color: #d2f4ef;
}

.container-success .slide-verify-slider-mask-item-icon {
  background-position: 0 0 !important;
}

.container-fail .slide-verify-slider-mask-item {
  height: 40px;
  top: -1px;
  border: 1px solid #f57a7a;
  background-color: #f57a7a !important;
}

.container-fail .slide-verify-slider-mask {
  height: 40px;
  border: 1px solid #f57a7a;
  background-color: #fce1e1;
}

.container-fail .slide-verify-slider-mask-item-icon {
  top: 14px;
  background-position: 0 -82px !important;
}

.container-active .slide-verify-slider-text,
.container-success .slide-verify-slider-text,
.container-fail .slide-verify-slider-text {
  display: none;
}
</style>
