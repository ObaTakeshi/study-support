<template>
  <div class="m-2">
    <h3>イベント名</h3>
    <el-input v-model="eventName" placeholder="New event" clearable></el-input>

    <h3>備考</h3>
    <el-input
      type="textarea"
      :rows="2"
      placeholder="Please input"
      v-model="detail">
    </el-input>

    <!--
    <h3>通知</h3>
    <el-switch
      v-model="notif"
      active-text="あり"
      inactive-text="なし">
    </el-switch>
    -->
    
    <h3>時間</h3>
    <el-time-picker
      is-range
      v-model="timePick"
      selectableRange="00:00:00 - 23:59:59"
      start-placeholder="Start time"
      end-placeholder="End time"
      format="HH:mm">
    </el-time-picker>

    <h3>日にち</h3>
    <el-date-picker
      v-model="onceDate"
      type="date"
      placeholder="Pick a day">
    </el-date-picker>
    <h3>種別</h3>
    <div>
      <el-radio v-model="radio" label="1">一回限り</el-radio>
      <el-radio v-model="radio" label="2">毎週</el-radio>
    </div>
    <div v-if="radio == 2">
      <el-date-picker
        v-model="dateRange"
        type="daterange"
        start-placeholder="Start date"
        end-placeholder="End date">
      </el-date-picker>
    </div>

    <div class="mt-2">
      <el-button @click="test">submit</el-button>
    </div>
  </div>
</template>

<script>
  import firebase from 'firebase'
  import moment from 'moment'
  const re = new RegExp('"id":([0-9]+)', 'g');
  export default {
    data() {
      return {
        eventName: '',
        detail: '',
        radio: '1',
        notif: true,
        timePick: [new Date(1999, 0, 1, 0, 0, 0), new Date(1999, 0, 1, 23, 59, 59)],
        onceDate: '',
        dateRange: '',
        eventList: [],
        eventListRef: [],
      }
    },

    created: function() {
      this.database = firebase.database();
      this.eventListRef = this.database.ref('eventList');
      var _this = this;
      this.eventListRef.on('value', function(snapshot) {
        if (snapshot.val() == null) {
          _this.eventList = [];
        } else {
          _this.eventList = snapshot.val(); // データに変化が起きたときに再取得する
        }
      });
    },

    methods: {
      test() {
        if (this.eventName == '' || this.onceDate == '' || (this.radio == 2 && this.dateRange == '')) {
          this.$message.error('空欄があるぞ.');
        }
        let tmp_notif = 1;
        if (!this.notif) {
          tmp_notif = 0;
        }
        
        let event = {
          eventName: this.eventName,
          detail: this.detail,
          notif: tmp_notif,
          timePick: this.timePick.map(function(x) { return moment(x).format('HH:mm'); }),
          onceDate: moment(this.onceDate).format("YYYY-MM-DD")
        }
        
        let new_id = 1;
        if (!(Object.keys(this.eventList).length === 0)) {
          new_id = Math.max(...JSON.stringify(this.eventList).match(re).map(function(v) {
            return parseInt(v.split(':')[1]);})) + 1;
        }

        if (!this.dateRange == '') {
          while (this.onceDate <= this.dateRange[1]) {
            event.id = new_id;
            this.eventListRef.push(event);
            event.onceDate = moment(new Date(this.onceDate.setDate(this.onceDate.getDate() + 7))).format("YYYY-MM-DD");
            new_id += 1;
            console.log(event);
          }
        } else {
          event.id = new_id;
          event.onceDate = moment(this.onceDate).format("YYYY-MM-DD");
          this.eventListRef.push(event);
          console.log(event, this.dateRange);
        }
        this.$router.push('calendar');
      }
    }
  }
</script>

<style>

</style>