<template>
  <button @click="mark()">打卡</button>
  <input class="clockpicker" type="text" />
  <ul v-for="mark in marks">
    <li>
      <input class="clockpicker" type="time" v-model="mark.time" />
      <span>{{$index % 2 == 0 ? '工作' : '休息'}}</span>
      <button @click="remove(mark)">删除</button>
    </li>
  </ul>
  历时: {{worktime()}}
</template>

<script type="text/javascript">
  import Cache from "./cache"

  var now = new Date();
  var today = `${now.getYear()}-${now.getMonth()}-${now.getDay()}`;
  var cache = new Cache('marker-' + today);

  export default {
    data() {
      return {
        marks: cache.get('marks', []),
      }
    },
    methods: {
      mark() {
        var now = new Date();
        this.marks.push({
          time: `${now.getHours()}:${now.getMinutes()}`,
        });
      },
      remove(mark) {
        this.marks.$remove(mark);
      },
      worktime() {
        // FIXME
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
    watch: {
      'marks': function(val, old_val){
        cache.set('marks', val);
      },
    },
  }
</script>

<style scoped>
  input[type=range] {
    -webkit-appearance: slider-vertical;
    height: 300px;
  }
</style>
