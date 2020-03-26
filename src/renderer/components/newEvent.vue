<template>
  <div class="m-2">
    <h3>Content</h3>
    <el-input
      type="textarea"
      :rows="15"
      placeholder="Please input"
      v-model="detail">
    </el-input>

    <h3>Date</h3>
    <el-date-picker
      v-model="onceDate"
      type="date"
      placeholder="Pick a day">
    </el-date-picker>

    <div class="mt-2">
      <el-button @click="submit">submit</el-button>
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
        uid: firebase.auth().currentUser.uid
      }
    },

    created: function() {
      this.database = firebase.database();
      this.uid = firebase.auth().currentUser.uid
      if (process.env.NODE_ENV == 'development') {
        this.eventListRef = this.database.ref('development/' + this.uid + '/eventList');
      } else {
        this.eventListRef = this.database.ref('production/' + this.uid + 'eventList');
      }
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
      submit() {
        if (this.onceDate == '' || this.detail == '') {
          this.$message.error('空欄があるぞ.')
          return
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
            return parseInt(v.split(':')[1]);})) + 1
        }

        if (!this.dateRange == '') {
          while (this.onceDate <= this.dateRange[1]) {
            event.id = new_id
            this.eventListRef.push(event);
            event.onceDate = moment(new Date(this.onceDate.setDate(this.onceDate.getDate() + 7))).format("YYYY-MM-DD");
            new_id += 1;
            console.log(event)
          }
        } else {
          event.id = new_id;
          event.onceDate = moment(this.onceDate).format("YYYY-MM-DD")
          this.eventListRef.push(event)
          console.log(event, this.dateRange)
        }
        this.$emit('close')
      }
    }
  }
</script>

<style>

</style>