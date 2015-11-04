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
  历时: {{worktime()}}/8小时
</template>

<script type="text/javascript">
  import Cache from "./cache"

  var now = new Date();
  var today = `${now.getFullYear()}-${now.getMonth()}-${now.getDay()}`;
  var cache = new Cache('marker-' + today);

  function timestr2date(time_str) {
    var time = time_str.split(':');
    var date = new Date();
    date.setHours(parseInt(time[0]));
    date.setMinutes(parseInt(time[1]));
    return date;
  }

  function date2timestr(date) {
    return time_format({hours: date.getHours(), minutes: now.getMinutes()});
  }

  function time_format({hours=0, minutes=0}) {
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

  export default {
    data() {
      return {
        marks: cache.get('marks', []),
      }
    },
    methods: {
      mark() {
        this.marks.push({
          time: date2timestr(new Date()),
        });
      },
      remove(mark) {
        this.marks.$remove(mark);
      },
      worktime() {
        var throughMs = 0;
        for (var i=0; i < this.marks.length; i+=2) {
          var start = timestr2date(this.marks[i].time);
          if (i+1 in this.marks) {
            var end = timestr2date(this.marks[i+1].time);
          } else {
            var end = new Date();
          }
          var diffMs = end - start;
          throughMs += diffMs;
        }
        var through_minute = throughMs / 1000 / 60;
        return time_format({minutes: through_minute})
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
