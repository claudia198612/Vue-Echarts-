<template>
  <div id="right">
    <Panel>
      <div slot='panelcontent'>
        <h2>中国新增病例省份排行</h2>
        <div class="chart curerates"></div>
      </div>
    </Panel>
    <Panel>
      <div slot='panelcontent'>
        <h2>中国新冠肺炎病例分布</h2>
        <div class="chart deadheal"></div>
      </div>
    </Panel>
    <Panel>
      <div slot='panelcontent'>
        <h2>中国境外输入病情top10省份</h2>
        <div class="chart toptenimported"></div>
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
  name: 'right',
  props: {
    option2: {},
    option4: {},
    option6: {}
  },
  components: {
    Panel
  },
  watch: {
    option4() {
      let curerates = document.querySelector('.curerates');
      addChart(curerates, this.option4)
    },
    option2() {
      let deadheal = document.querySelector('.deadheal');
      addChart(deadheal, this.option2)
    },
    option6() {
      let toptenimported = document.querySelector('.toptenimported');
      addChart(toptenimported, this.option6)
    },
  }

}
</script>
<style scoped>
</style>
