<template>
  <div id="Header">
    <h1>基于ECharts的疫情数据可视化系统</h1>
    <Time class="time"></Time>
  </div>
</template>

<script>
import Time from './common/ZpTime.vue'

export default {
  name: 'Header',
  components: {
    Time
  },
}
</script>
<style scoped>
#Header {
  height: 100px;
  position: relative;
  background: url(~assets/image/head_bg.png) no-repeat top center;
  background-size: 100% 100%;
}

#Header h1 {
  color: white;
  font-size: 38px;
  line-height: 80px;
  text-align: center;
}

.time {
  position: absolute;
  top: 0;
  right: 30px
}
</style>
