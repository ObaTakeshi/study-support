<template>
  <div class="p-2">
    <!-- タスクリスト -->
    <h1 class="tasklisth1">Task List</h1>
    <el-button class="ml-2" size="mini" type="info" @click="top_append">Top Append</el-button>
    <div class="custom-tree-container">
      <div class="block">
        <el-tree
          :data="data"
          show-checkbox
          node-key="id"
          default-expand-all
          :expand-on-click-node="false"
          :render-content="renderContent">
        </el-tree>
      </div>
    </div>
  </div>
</template>

<script>
  import firebase from 'firebase'
  let re = new RegExp('"id":([0-9]+)', 'g');
  export default {
    data() {
      const data = [];
      return {
        data: JSON.parse(JSON.stringify(data)),
        id: 0,
        times: [],
        animateFrame: 0,
        nowTime: 0,
        diffTime: 0,
        startTime: 0,
        isTrainingLap: true,
        beforeLapMinutes: 0,
        isRunning: false,
        taskListRef: null,
        database: null,
      }
    },

    created: function() {
      this.database = firebase.database();
      this.taskListRef = this.database.ref('taskList');
      var _this = this;
      this.taskListRef.on('value', function(snapshot) {
        if (snapshot.val() == null) {
          _this.data = [{id:1, label:'New Task', status:'wip'}]
          _this.taskListRef.set(JSON.parse(JSON.stringify(_this.data))); // JSON送信
        } else {
          _this.data = snapshot.val(); // データに変化が起きたときに再取得する
        }
      });
    },

    methods: {
      top_append() {
        let hoge = Math.max(...JSON.stringify(this.data).match(re).map(function(v) {
          return parseInt(v.split(':')[1])})) + 1
        this.$prompt('Please input your task', 'New Task', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          inputErrorMessage: 'Invalid'
        }).then(({ value }) => {
          this.$message({
            type: 'success',
            message: 'New task is:' + value
          });
          const newChild = { id: hoge, label: value, status: 'wip', children: [] };
          let new_key =  Math.max(...Object.keys(this.data)) + 1;
          this.data[new_key] = newChild;
          this.taskListRef.set(JSON.parse(JSON.stringify(this.data))); // JSON送信
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'Input canceled'
          });
        });
      },

      append(data) {
        let hoge = Math.max(...JSON.stringify(this.data).match(re).map(function(v) {
          return parseInt(v.split(':')[1])})) + 1
        this.$prompt('Please input your task', 'New Task', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          inputErrorMessage: 'Invalid'
        }).then(({ value }) => {
          this.$message({
            type: 'success',
            message: 'New task is:' + value
          });
          const newChild = { id: hoge, label: value, status: 'wip', children: [] };
          if (!data.children) {
            this.$set(data, 'children', []);
          }
          data.children.push(newChild);
          this.taskListRef.set(JSON.parse(JSON.stringify(this.data))); // JSON送信
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'Input canceled'
          });
        });
      },

      remove(node, data) {
        const parent = node.parent;
        const children = parent.data.children || parent.data;
        const index = children.findIndex(d => d.id === data.id);
        children.splice(index, 1);
        this.taskListRef.set(JSON.parse(JSON.stringify(this.data))); // JSON送信
      },

      edit(data) {
        this.$prompt('Please input your task', 'Edit Task', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          inputErrorMessage: 'Invalid',
          inputValue: data.label
        }).then(({ value }) => {
          this.$message({
            type: 'success',
            message: 'New task is:' + value
          });
          data.label = value;
          this.taskListRef.set(JSON.parse(JSON.stringify(this.data))); // JSON送信
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'Input canceled'
          });
        });
      },

      renderContent(h, { node, data, store }) {
        return (<span class="custom-tree-node">
            <span>{node.label}</span>
            <span>
              <el-button size="mini" type="success" on-click={ () => this.edit(data) }>Edit</el-button>
              <el-button size="mini" type="text" on-click={ () => this.append(data) }>Append</el-button>
              <el-button size="mini" type="danger" on-click={ () => this.remove(node, data) }>Delete</el-button>
            </span>
          </span>
        );
      }
    }
  }
</script>

<style>
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }

  .tasklisth1 {
    display: inline;
  }
</style>
