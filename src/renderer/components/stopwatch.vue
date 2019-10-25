<template>
  <div>
    <!-- ストップウォッチ -->
    <div class="row delete-margin">
      <div class="col-sm-6 text-center">
        <h1>
          <!-- ポモドーロ・テクニック -->
          <div v-if="isTrainingLap">
            <font color="#F56C6C">Training time</font>
          </div>
          <div v-else>
            <font color="#67C23A">Breaking time</font>
          </div>
        </h1>
        <h2>
          {{ lapMinutes | zeroPad }} : {{ lapSeconds | zeroPad}}
        </h2>
      </div>
      <div class="col-sm-6 text-center">
        <h1 class="ui header">Total time</h1>
        <h2>
          {{ hours }} : {{ minutes | zeroPad }} : {{ seconds | zeroPad }}
        </h2>
      </div>
    </div>
    <div class="row delete-margin">
      <div class="col-6 text-center">
        <div v-if="!isRunning">
          <el-button size="mini" type="primary" @click="startTimer">start</el-button>
        </div>
        <div v-else>
          <el-button size="mini" type="info" @click="stopTimer">stop</el-button>
        </div>
      </div>
      <div class="col-6 text-center">
        <el-button size="mini" type="danger" @click="clearAll" :disabled="isRunning">reset</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        animateFrame: 0,
        nowTime: 0,
        diffTime: 0,
        startTime: 0,
        isTrainingLap: true,
        beforeLapMinutes: 0,
        isRunning: false,
      };
    },
    methods: {
      // 現在時刻から引数に渡した数値を startTime に代入
      setSubtractStartTime: function (time) {
        var time = typeof time !== 'undefined' ? time : 0;
        this.startTime = Math.floor(performance.now() - time);
      },
      // タイマーをスタートさせる
      startTimer: function () {
        // loop()内で this の値が変更されるので退避
        var vm = this;
        vm.setSubtractStartTime(vm.diffTime);
        // ループ処理
        (function loop(){
          vm.nowTime = Math.floor(performance.now());
          vm.diffTime = vm.nowTime - vm.startTime;
          vm.animateFrame = requestAnimationFrame(loop);
        }());
        vm.isRunning = true;
      },
      // タイマーを停止させる
      stopTimer: function () {
        this.isRunning = false;
        cancelAnimationFrame(this.animateFrame);
      },
      // 初期化
      clearAll: function () {
        this.startTime = 0;
        this.nowTime = 0;
        this.diffTime = 0;
        this.times = [];
        this.stopTimer();
        this.animateFrame = 0;
        this.isTrainingLap = true;
      }
    },

    computed: {
      // 時間を計算
      hours: function () {
        return Math.floor(this.diffTime / 1000 / 60 / 60);
      },
      // 分数を計算 (60分になったら0分に戻る)
      minutes: function () {
        return Math.floor(this.diffTime / 1000 / 60) % 60;
      },
      // 秒数を計算 (60秒になったら0秒に戻る)
      seconds: function () {
        return Math.floor(this.diffTime / 1000) % 60;
      },
      // lap timeを計算
      lapMinutes: function() {
        let trainingMinutes = this.isTrainingLap ? 25 : 5;
        let nowLapMinutes = Math.floor(this.diffTime / 1000 / 60) % trainingMinutes;
        if (this.beforeLapMinutes > nowLapMinutes) {
          this.isTrainingLap = !this.isTrainingLap;
        }
        this.beforeLapMinutes = nowLapMinutes;
        return nowLapMinutes;
      },
      lapSeconds: function() {
        return Math.floor(this.diffTime / 1000) % 60;
      }
    },
    filters: {
      // ゼロ埋めフィルタ 引数に桁数を入力する
      // ※ String.prototype.padStart() は IEじゃ使えない
      zeroPad: function(value, num){
        var num = typeof num !== 'undefined' ? num : 2;
        return value.toString().padStart(num,"0");
      }
    }
  }
</script>

<!-- style中身は省略 -->
<style scoped>
.delete-margin {
  margin-left: 0px !important;
  margin-right: 0px !important;
}
</style>
