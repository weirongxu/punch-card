<template>
  <div class="center-block col-sm-6 text-center">
    <button class="btn btn-primary btn-lg marker-btn" @click="mark()">打卡</button>
    <ul>
      <li v-for="mark in marks" class="flex">
        <input class="form-control felx-1" type="time" v-model="mark.time" />
        <span>{{$index % 2 == 0 ? '开始工作' : '停下工作'}}</span>
        <a class="text-danger remove-btn" @click="remove(mark)">
          <i class="glyphicon glyphicon-remove"></i>
        </a>
      </li>
    </ul>
    历时: {{worktime}}/8小时
  </div>
</template>

<script>
  import Cache from "./cache";

  var now = new Date();
  var today = `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`;
  var cache = new Cache('marker-' + today);

  function timestr2date(time_str) {
    var time = time_str.split(':');
    var date = new Date();
    date.setHours(parseInt(time[0]));
    date.setMinutes(parseInt(time[1]));
    return date;
  }

  function date2timestr(date) {
    return time_format({hours: date.getHours(), minutes: date.getMinutes()});
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
    return `${hour}:${minute}`;
  }

  export default {
    replace: false,
    data() {
      return {
        marks: cache.get('marks', []),
        worktime: '',
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
      update_worktime() {
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
        this.$data.worktime = time_format({minutes: through_minute})
      },
    },
    ready: function(){
      setInterval(() => {
        this.update_worktime();
      }, 60 * 1000);
    },
    watch: {
      'marks': {
        handler: function(val, old_val){
          cache.set('marks', val);
          this.update_worktime();
        },
        deep: true,
        immediate: true,
      },
    }
  }
</script>

<style lang="sass" scoped>
  input[type=range] {
    -webkit-appearance: slider-vertical;
    height: 300px;
  }
  .marker-btn {
    margin: 20px;
  }
  .center-block {
    float: none;
  }
  li {
    white-space: nowrap;
    line-height: 35px;
    input {
      margin-right: 10px;
    }
    .remove-btn {
      margin-left: 10px;
      &:hover {
        cursor: pointer;
      }
    }
  }
</style>
