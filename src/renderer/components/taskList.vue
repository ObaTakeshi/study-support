<template>
  <div class="p-2">
    <!-- タスクリスト -->
    <h1 class="tasklisth1">Task List</h1>
    <el-button class="ml-2" size="mini" type="info" @click="top_append">Top Append</el-button>
    <div class="custom-tree-container mt-2">
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
  const re = new RegExp('"id":([0-9]+)', 'g');
  export default {
    data() {
      const data = [];
      return {
        data: JSON.parse(JSON.stringify(data)),
        id: 0,
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
          _this.data = [{id:1, label:'New Task', status:'wip', level: 1}]
          _this.taskListRef.set(JSON.parse(JSON.stringify(_this.data))); // JSON送信
        } else {
          _this.data = snapshot.val(); // データに変化が起きたときに再取得する
        }
      });
    },

    methods: {
      top_append() {
        let new_id = Math.max(...JSON.stringify(this.data).match(re).map(function(v) {
          return parseInt(v.split(':')[1]); })) + 1;
        let placeholder = 'New task'
        this.$alert(`<form name="append_task" onsubmit="return false">
          <input class="edit_form" name="task_name" placeholder="${placeholder}"></input>`,
          'New Task', {
          dangerouslyUseHTMLString: true,
          showCancelButton: true,
          cancelButtonText: 'Cancel',
        }).then(({ value }) => {
          let append_task = document.forms.append_task.task_name.value;
          if (append_task == '') {
            append_task = placeholder;
          }
          const newChild = { id: new_id, label: append_task, status: 'wip', level: 1, children: [] };
          let new_key =  Math.max(...Object.keys(this.data)) + 1;
          this.data[new_key] = newChild;
          this.taskListRef.set(JSON.parse(JSON.stringify(this.data))); // JSON送信
          this.$message({
            type: 'success',
            message: 'New task is:' + append_task
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'Input canceled'
          });
        });
      },

      append(data) {
        let new_id = Math.max(...JSON.stringify(this.data).match(re).map(function(v) {
          return parseInt(v.split(':')[1]); })) + 1;
        let placeholder = 'New task'
        this.$alert(`<form name="append_task" onsubmit="return false">
          <input class="edit_form" name="task_name" placeholder="${placeholder}"></input>`,
          'New Task', {
          dangerouslyUseHTMLString: true,
          showCancelButton: true,
          cancelButtonText: 'Cancel',
        }).then(({ value }) => {
          let append_task = document.forms.append_task.task_name.value;
          if (append_task == '') {
            append_task = placeholder;
          }
          let new_level = data.level + 1;
          const newChild = { id: new_id, label: append_task, status: 'wip', level: new_level, children: [] };
          if (!data.children) {
            this.$set(data, 'children', []);
          }
          data.children.push(newChild);
          this.taskListRef.set(JSON.parse(JSON.stringify(this.data))); // JSON送信
          this.$message({
            type: 'success',
            message: 'New task is:' + append_task
          });
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
        this.$alert(`<form name="edit_task" onsubmit="return false">
          <input class="edit_form" name="task_name" placeholder="${data.label}"></input>`,
          'Edit Task', {
          dangerouslyUseHTMLString: true,
          showCancelButton: true,
          cancelButtonText: 'Cancel',
        }).then(({ value }) => {
          let edit_task = document.forms.edit_task.task_name.value;
          if (!(edit_task == '')) {
            data.label = edit_task;
          }
          this.taskListRef.set(JSON.parse(JSON.stringify(this.data))); // JSON送信
          this.$message({
            type: 'success',
            message: 'New task is:' + edit_task
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'Input canceled'
          });
        });
      },

      renderContent(h, { node, data, store }) {
        if (data.level == 1) {
          return (<span class="custom-tree-node">
              <span><h3>{node.label}</h3></span>
                <span>
                  <el-button size="mini" type="success" on-click={ () => this.edit(data) }>Edit</el-button>
                  <el-button size="mini" type="text" on-click={ () => this.append(data) }>Append</el-button>
                  <el-button size="mini" type="danger" on-click={ () => this.remove(node, data) }>Delete</el-button>
                </span>
              </span>
          );
        } else if (data.level == 2) {
          return (<span class="custom-tree-node">
              <span><h4>{node.label}</h4></span>
                <span>
                  <el-button size="mini" type="success" on-click={ () => this.edit(data) }>Edit</el-button>
                  <el-button size="mini" type="text" on-click={ () => this.append(data) }>Append</el-button>
                  <el-button size="mini" type="danger" on-click={ () => this.remove(node, data) }>Delete</el-button>
                </span>
              </span>
          );
        } else {
          return (<span class="custom-tree-node">
              <span><h5>{node.label}</h5></span>
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

  .edit_form {
    border:0;
    padding:10px;
    font-size:1.3em;
    font-family:Arial, sans-serif;
    color: #606266;
    border:solid 1px #ccc;
    margin:0 0 20px;
    width:300px;
  }
</style>
