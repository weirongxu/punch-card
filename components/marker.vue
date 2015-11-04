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
  var today = `${now.getFullYear()}-${now.getMonth()}-${now.getDay()}`;
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
          time: this.format({hours: now.getHours(), minutes: now.getMinutes()}),
        });
      },
      remove(mark) {
        this.marks.$remove(mark);
      },
      worktime() {
        var throughMs = 0;
        for (var i=0; i+1 < this.marks.length; i+=2) {
          var start = this.marks[i].time.split(':');
          var end = this.marks[i+1].time.split(':');
          var start_date = new Date();
          var end_date = new Date();
          start_date.setHours(parseInt(start[0]));
          start_date.setMinutes(parseInt(start[1]));
          end_date.setHours(parseInt(end[0]));
          end_date.setMinutes(parseInt(end[1]));
          var diffMs = end_date - start_date;
          throughMs += diffMs;
        }
        var through_minute = throughMs / 1000 / 60;
        return this.format({minutes: through_minute})
      },
      format({hours=0, minutes=0}) {
        var hour = (hours + parseInt(minutes/60)).toString();
        var minute = parseInt(minutes%60).toString();
        if (hour.length === 1) {
          hour = '0' + hour;
        }
        if (minute.length === 1) {
          minute = '0' + minute;
        }
        return `${hour}:${minute}`
      }
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
