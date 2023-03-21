<template>
  <div class="Panel">
    <div class='panelcontent'>
      <slot name="panelcontent">
        <div class="chart"></div>
      </slot>
    </div>
    <div class="panelfooter"></div>
  </div>
</template>

<script>
export default {
  name: 'Panel',
}
</script>
<style scoped>
.Panel {
  position: relative;
  height: 310px;
  border: 1px solid rgba(25, 186, 139, 0.17);
  background: url(~assets/image/line\(1\).png);
  padding: 0 15px 40px;
  margin-bottom: 15px;
}

.Panel:before {
  position: absolute;
  top: 0;
  left: 0;
  content: "";
  width: 10px;
  height: 10px;
  border-top: 2px solid #02a6b5;
  border-left: 2px solid #02a6b5;
}

.Panel:after {
  position: absolute;
  top: 0;
  right: 0;
  content: "";
  width: 10px;
  height: 10px;
  border-top: 2px solid #02a6b5;
  border-right: 2px solid #02a6b5;
}

.Panel .panelfooter {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
}

.Panel .panelfooter:before {
  position: absolute;
  bottom: 0;
  left: 0;
  content: "";
  width: 10px;
  height: 10px;
  border-bottom: 2px solid #02a6b5;
  border-left: 2px solid #02a6b5;
}

.Panel .panelfooter:after {
  position: absolute;
  bottom: 0;
  right: 0;
  content: "";
  width: 10px;
  height: 10px;
  border-bottom: 2px solid #02a6b5;
  border-right: 2px solid #02a6b5;
}

.panelcontent h2 {
  height: 48px;
  line-height: 48px;
  color: white;
  font-size: 20px;
  text-align: center;
  font-weight: 400;
}

.panelcontent .chart {
  height: 240px;
}

</style>
