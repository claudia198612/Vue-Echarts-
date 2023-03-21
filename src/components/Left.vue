<template>
  <div id="Left">
    <Panel>
      <div slot='panelcontent'>
        <h2>世界各国24h新增确诊TOP10</h2>
        <div class="chart topteninfected"></div>
      </div>
    </Panel>
    <Panel>
      <div slot='panelcontent'>
        <h2>主要疫情大洲感染总人数趋势图</h2>
        <div class="chart infectedstates"></div>
      </div>
    </Panel>
    <Panel>
      <div slot='panelcontent'>
        <h2>世界新冠致死/治愈人数趋势</h2>
        <div class="chart infectedstatesPie"></div>
      </div>
    </Panel>
  </div>
</template>

<script>
import Panel from './common/Panel.vue'

import {
  addChart,
} from 'assets/js/charts.js'

export default {
  name: 'Left',
  props: {
    /**
     * 拿到父组件传来的图表option
     */
    option1: {},
    option3: {},
    option5: {}
  },
  components: {
    Panel
  },
  watch: {
    option1() {
      //添加到上面的div中
      let topteninfected = document.querySelector('.topteninfected');
      addChart(topteninfected, this.option1);
    },
    option3() {
      let infectedstates = document.querySelector('.infectedstates');
      addChart(infectedstates, this.option3);
    },
    option5() {
      let infectedstatesPie = document.querySelector('.infectedstatesPie');
      addChart(infectedstatesPie, this.option5);
    },
  }
}
</script>
<style scoped>
</style>
