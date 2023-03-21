<template>

  <div id="app">
    <Header></Header>

    <div id="content">
      <Left class='left'
            :option1='option1'
            :option3='option3'
            :option5='option5'>
      </Left>
      <Center class='center'
              :centerTop='centerTop'
              :foreignData='foreignData'>
      </Center>
      <Right class='right'
             :option2='option2'
             :option4='option4'
             :option6='option6'>

      </Right>
    </div>

  </div>
</template>

<script>
import Header from 'components/Header.vue'
import Left from 'components/Left.vue'
import Center from 'components/Center.vue'
import Right from 'components/Right.vue'

import {
  getForeinData,
  getChinaData
} from 'assets/js/charts.js'

export default {
  name: 'app',
  data() {
    return {
      option1: {},
      option2: {},
      option3: {},
      option4: {},
      option5: {},
      option6: {},
      centerTop: {},
      foreignData: {},
    }
  },
  methods: {},
  components: {
    Header,
    Left,
    Center,
    Right
  },
  mounted() {
    getForeinData().then(res => {
      console.log(res.option1)
      this.option1 = res.option1;
      this.option3 = res.option3;
      this.option5 = res.option5;
      this.option6 = res.option6;
      this.centerTop = res.centerTop;
      this.foreignData = res.foreinData;
      /**
       * 做假数据，response数据有误
       */
      this.foreignData.foreignList.forEach(item => {
        if (item.name === "印度") {
          item.confirm = 151351553
        }
      })
      this.foreignData.foreignList.forEach(item => {
        if (item.name === "印度") {
          console.log(item.confirm)
        }
      })
    })

    getChinaData().then(res => {
      this.option2 = res.option2
      this.option4 = res.option4
    })
  }
}
</script>
<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

@font-face {
  font-family: electronicFont;
  src: url(assets/font/DS-DIGIT.TTF);
}

li {
  list-style: none;
}

#app {
  background: url(assets/image/bg8.jpg) top center;
  width: calc(100vw - 17px);
}

#content {
  padding: 10px 10px 0;
  display: flex;
}

#content .left {
  flex: 3
}

#content .center {
  flex: 5
}

#content .right {
  flex: 3
}

</style>
