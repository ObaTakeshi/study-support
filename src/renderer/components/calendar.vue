<template>
  <div id="app">
    <el-button type="text" class="float-right"><router-link to="newEvent">+</router-link></el-button>
    <div id="calendar-nav">
      <el-button type="text" @click="moveLastMonth"> < </el-button>
      <span>{{calData.year}} - {{getMonthName(calData.month)}}</span>
      <el-button type="text" @click="moveNextMonth"> > </el-button>
    </div>
    <table id="calendar" class="table table-bordered">
      <thead>
        <tr>
          <th v-for="week in weeks">{{ week }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="weeks in calendar">
          <td v-for="day in weeks">
            <el-badge :value=day.events.length :hidden=!Boolean(day.events.length) class="item" type="primary">
              <el-button type="text" @click="selectDay(day.dd, day.events)">
                {{ day.day }}
              </el-button>
            </el-badge>
          </td>
        </tr>
      </tbody>
    </table>
    <h3>{{ selectedDay.format("YYYY年MM月DD日(ddd)") }}</h3>
    <div v-for="e in selectedDayEvents" class="ml-2">
      <el-button type="text" @click="eventOpen(e)">{{ e.eventName }}</el-button>
      <el-button type="danger" @click="eventDelete(e)">削除</el-button>
    </div>
  </div>
</template>

<script>
  import firebase from 'firebase'
  import moment from 'moment'
  moment().locale("ja");
  export default {
    data() {
      return {
        weeks: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        calData: {year: 0, month: 0},
        selectedDay: moment(),
        selectedDayEvents: [],
        eventListRef: null,
        database: null,
        data: [],
      }
    },

    created: function (){
      var date = new Date();
      this.calData.year = date.getFullYear();
      this.calData.month = date.getMonth() + 1;

      this.database = firebase.database();
      this.eventListRef = this.database.ref('eventList');
      var _this = this;
      this.eventListRef.on('value', function(snapshot) {
        if (snapshot.val() == null) {
          _this.data = [];
          _this.evebtListRef.set(JSON.parse(JSON.stringify(_this.data))); // JSON送信
        } else {
          _this.data = snapshot.val(); // データに変化が起きたときに再取得する
        }
      });
    },

    methods: {
      eventOpen(e) {
        this.$alert(e.detail, e.eventName, {
          confirmButtonText: 'OK'
        });
      },

      eventDelete(e) {
        this.$confirm('削除してもいいですか?', 'Warning', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          let index = Object.keys(this.data).find(key => this.data[key].id === e.id);
          delete this.data[index];
          this.eventListRef.set(JSON.parse(JSON.stringify(this.data))); // JSON送信
          this.$message({
            type: 'success',
            message: 'Delete completed'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'Delete canceled'
          });          
        });
      },

      selectDay(day, events) {
        this.selectedDay = day;
        this.selectedDayEvents = events;
      },

      getMonthName: function(month) {
        var monthName = ['January','February','March','April','May','June','July','August','September','October','November','December'];
        return monthName[month - 1];
      },

      moveLastMonth: function() {
        if (this.calData.month == 1) {
          this.calData.year--;
          this.calData.month = 12;
        }
        else {
          this.calData.month--;
        }
        this.calcSelectedDay();
      },

      moveNextMonth: function() {
        if (this.calData.month == 12) {
          this.calData.year++;
          this.calData.month = 1;
        }
        else {
          this.calData.month++;
        }
        this.calcSelectedDay();
      },

      calcSelectedDay() {
        let today = moment();
        if (this.calData.month == today.month() + 1 && this.calData.year == today.year()) {
          this.selectedDay = today;
          for (let i=0; i<7; i++) {
            for (let l=0; l<7; l++) {
              if (this.calendar[i][l].day == today.date())
                this.selectedDayEvents = this.calendar[i][l].events;
                return;
            }
          }
        } else {
          this.selectedDay = moment().year(this.calData.year).month(this.calData.month-1).startOf('month');
          for (let i=0; i<7; i++) {
            if (this.calendar[0][i].day == 1) {
              this.selectedDayEvents = this.calendar[0][i].events;
              return;
            }
          }
        }
      }
    },

    computed: {
      calendar: function () {
        // 月の開始日
        var firstDay = new Date(this.calData.year, this.calData.month - 1, 1).getDay();
        // 月の最終日
        var lastDate = new Date(this.calData.year, this.calData.month, 0).getDate();
        // 日にちのカウント
        var dayIdx = 1;
        var calendar = [];
        for (var w = 0; w < 6; w++) {
          var week = [];
          if (lastDate < dayIdx) {
            break;
          }
          for (var d = 0; d < 7; d++) {
            if (w == 0 && d < firstDay) {
              week[d] = {day: '', dd: '', events: []};
            } else if (w == 6 && lastDate < dayIdx) {
              week[d] = {day: '', dd: '', events: []};
              dayIdx++;
            } else if (lastDate < dayIdx) {
              week[d] = {day: '', dd: '', events: []};
              dayIdx++;
            } else {
              let dayEvents = [];
              let today = moment().year(this.calData.year).month(this.calData.month-1).date(dayIdx);
              let todayFormat = moment().year(this.calData.year).month(this.calData.month-1).date(dayIdx).format("YYYY-MM-DD");
              for (let k in this.data) {
                let event = this.data[k];
                if (todayFormat == event.onceDate) {
                  dayEvents.push(event);
                }
              }
              week[d] = {day: dayIdx, dd: today, events: dayEvents};
              dayIdx++;
            }
          }
          calendar.push(week);
        }
        return calendar;
      }
    }
  }
</script>

<style>
.table {
  table-layout: fixed;
}

  #calendar-nav {
      text-align: center;
  }

  #calendar-nav span {
      display: inline-block;
      width: 200px;
  }

  #calendar-nav i:hover {
      cursor: pointer;
  }

  /* カレンダーのスタイル */
  .table th, td{
      text-align: center;
  }

  #calendar th:first-child {
      background-color: #FEEEFF;
  }
  #calendar td:first-child {
      background-color: #FEEEFF;
  }
  #calendar th:nth-child(7) {
      background-color: #DFFFFF
  }
  #calendar td:nth-child(7) {
      background-color: #DFFFFF
  }

  #calendar td:hover {
      opacity: 0.6;
  }
</style>