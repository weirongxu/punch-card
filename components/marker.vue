<template>
  <button @click="mark()">打卡</button>
  <input class="clockpicker" type="text" />
  <ul v-for="mark in marks">
    <li>
      <input class="clockpicker" type="text" value="{{mark.time.getHours()}}:{{mark.time.getMinutes()}}" @change="change(mark)" />
      {{mark.time.getHours()}}:{{mark.time.getMinutes()}}
      <span>{{$index % 2 == 0 ? '工作' : '休息'}}</span>
      <button @click="remove(mark)">删除</button>
    </li>
  </ul>
  历时: {{worktime()}}
</template>

<script type="text/javascript">
  function render() {
    $('.clockpicker').clockpicker({
      autoclose: true
    });
  }

  export default {
    data() {
      return {
        marks: [],
      }
    },
    methods: {
      mark() {
        var now = new Date();
        this.marks.push({
          time: now,
        });
        setTimeout(render);
      },
      remove(mark) {
        this.marks.$remove(mark);
      },
      worktime() {
        var throughMs = 0;
        for (var i=0; i+1 < this.marks.length; i+=2) {
          var start = this.marks[i].time;
          var end = this.marks[i+1].time;
          var diffMs = end - start;
          throughMs += diffMs;
        }
        var through_minute = parseInt(throughMs / 1000 / 60);

        return `${parseInt(through_minute/60)}:${through_minute%60}`
      },
    },
    ready() {
      render();
    },
  }
</script>

<style scoped>
  input[type=range] {
    -webkit-appearance: slider-vertical;
    height: 300px;
  }
</style>
