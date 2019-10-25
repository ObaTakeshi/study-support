<template>
  <div>
    <!-- ヘッダー -->
    <div class="header_obj">
      <el-menu :default-active="activeIndex" mode="horizontal">
        <div class="row delete-margin">
          <router-link to="taskList" class="col-sm-4 text-center">
            <el-menu-item index="1">Tasks</el-menu-item>
          </router-link>
          <router-link to="calendar" class="col-sm-4 text-center">
            <el-menu-item index="2">Calendar</el-menu-item>
          </router-link>
          <router-link to="markdownEditor" class="col-sm-4 text-center">
            <el-menu-item index="3">Markdown</el-menu-item>
          </router-link>
        </div>
      </el-menu>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        activeIndex: '1'
      };
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
