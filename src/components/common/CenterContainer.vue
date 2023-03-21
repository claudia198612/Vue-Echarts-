<template>
  <div id="CenterContainer">
    <div class="bg1"></div>
    <div class="bg2"></div>
    <div class="bg3"></div>
    <div class="btn">
      <button @click='btnclick1' :class='{click:ifclick1}'>累计确诊</button>
      <button @click='btnclick2' :class='{click:ifclick2}'>现存确诊</button>
    </div>
    <div class="worldmap"></div>
  </div>
</template>

<script>
import 'assets/js/world.js'
import {nameMap} from 'assets/js/nameMap.js'
import {worldMapOption} from 'assets/js/options.js'
import {getMapData, addChart} from 'assets/js/charts.js'

export default {
  name: 'CenterContainer',
  props: {
    foreignData: {}
  },
  data() {
    return {
      confirmData: [],
      confirmNowData: [],
      worldMapOption: {},
      chart: {},
      ifclick1: true,
      ifclick2: false
    }
  },
  created() {
  },
  methods: {
    btnclick1() {
      if (this.ifclick1) {
        return
      } else {
        this.ifclick2 = false;
        this.ifclick1 = true;
        this.worldMapOption.series[0].data = this.confirmData;
        this.chart.setOption(this.worldMapOption)
      }
    },
    btnclick2() {
      if (this.ifclick2) {
        return
      } else {
        this.ifclick1 = false;
        this.ifclick2 = true;
        this.worldMapOption.series[0].data = this.confirmNowData;
        this.chart.setOption(this.worldMapOption)
      }
    },

  },
  mounted() {
    let option = worldMapOption();
    // console.log(option);
    this.worldMapOption = option;
    this.worldMapOption.series[0].nameMap = nameMap;
    let that = this;

    getMapData().then(res => {
      console.log(res)
      let name = res[1].name;
      let confirm = res[1].confirm;
      let nowConfirm = res[1].nowConfirm;
      res[0].confirmData.forEach((item, index) => {
        if (item.name === "印度") {
          item.value = 25496330
        } else if (item.name === "日本") {
          item.value = 699504
        } else if (item.name === "巴西") {
          item.value = 15735485
        } else if (item.name === "蒙古") {
          item.value = 59962
        } else if (item.name === "哈萨克斯坦") {
          item.value = 325036
        } else if (item.name === "俄罗斯") {
          item.value = 4051362
        } else if (item.name === "澳大利亚") {
          item.value = 30000
        } else if (item.name === "印度尼西亚") {
          item.value = 1754535
        } else if (item.name === "缅甸") {
          item.value = 142523
        } else if (item.name === "泰国") {
          item.value = 185562
        }
      })
      res[0].confirmData.push({name, value: confirm})
      res[0].nowConfirmData.push({name, value: nowConfirm})
      that.confirmData = res[0].confirmData;
      that.confirmNowData = res[0].nowConfirmData;

      that.worldMapOption.series[0].data = that.confirmData;

      let worldmap = document.querySelector('.worldmap');
      console.log(that.worldMapOption)
      that.chart = addChart(worldmap, that.worldMapOption);

    })
  },
}
</script>
<style scoped>
#CenterContainer {
  position: relative;
  height: 810px;
  overflow: hidden;
}

.bg1 {
  height: 518px;
  width: 518px;
  background: url(../../assets/image/map.png);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-size: 100% 100%;
  opacity: 0.3;
}

.bg2 {
  height: 643px;
  width: 643px;
  background: url(../../assets/image/lbx.png);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-size: 100% 100%;
  opacity: 0.6;
  animation: rotate1 15s linear infinite;
}

.bg3 {
  height: 566px;
  width: 566px;
  background: url(../../assets/image/jt.png);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-size: 100% 100%;
  opacity: 0.8;
  animation: rotate2 15s linear infinite;
}

.btn {
  width: 810px;
  position: absolute;
  top: 40px;
  display: flex;
  justify-content: space-around;
}

.btn button {
  height: 60px;
  width: 200px;
  font-size: 25px;
  z-index: 10;
  border-radius: 30px;
  background-color: #62b6ff3d;
  border: none;
  color: white;
  cursor: pointer;
}

.btn button:focus {
  outline: none;
}

.worldmap {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 5;
  height: 810px;
  width: 100%;
}

@keyframes rotate1 {
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

@keyframes rotate2 {
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  to {
    transform: translate(-50%, -50%) rotate(-360deg);
  }
}
</style>
