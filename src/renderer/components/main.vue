<template>
  <div id="app">
    <div class="top">
      <stopwatch/>
      <!-- ヘッダー -->
      <div class="header_obj">
        <el-menu :default-active="activeIndex" mode="horizontal" @select="selectIndex" class="row delete-margin">
          <div class="col-sm-4 text-center">
            <el-menu-item index="1">Tasks</el-menu-item>
          </div>
          <div to="calendar" class="col-sm-4 text-center">
            <el-menu-item index="2">Calendar</el-menu-item>
          </div>
          <div to="markdownEditor" class="col-sm-4 text-center">
            <el-menu-item index="3">Markdown</el-menu-item>
          </div>
        </el-menu>
      </div>
    </div>
    <div class="content">
      <div v-if="activeIndex==1">
        <taskList/>
      </div>
      <div v-else-if="activeIndex==2">
        <calendar/>
      </div>
      <div v-else-if="activeIndex==3">
        <markdownEditor/>
      </div>
    </div>
  </div>
</template>

<script>
  import stopwatch from './stopwatch'
  import taskList from './taskList'
  import calendar from './calendar'
  import markdownEditor from './markdownEditor'
  export default {
    components: {
      stopwatch,
      taskList,
      calendar,
      markdownEditor
    },
    data() {
      return {
        activeIndex: '1'
      }
    },
    methods: {
      selectIndex: function(key, path) {
        this.activeIndex = key
      }
    }
  }
</script>

<style>
  /* CSS */
  ::-webkit-scrollbar {
    display: none;
  }

  .top {
    background-color: #ffffff;
    position: sticky;
    top: 0;
    z-index: 24;
  }
</style>
