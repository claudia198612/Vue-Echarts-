<template>
  <div id="Center">
    <CenterTop :centerTop='centerTop'></CenterTop>
    <CenterContainer :foreignData='foreignData'></CenterContainer>
  </div>
</template>

<script>
import CenterTop from './common/CenterTop.vue'
import CenterContainer from 'components/common/CenterContainer.vue'

export default {
  name: 'Center',
  props: {
    centerTop: {},
    foreignData: {}
  },
  components: {
    CenterTop,
    CenterContainer
  },
  created() {
    console.log(this.foreignData)
  }
}
</script>
<style scoped>
#Center {
  padding: 0 10px 15px;
}
</style>
