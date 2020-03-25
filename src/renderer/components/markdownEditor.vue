<template>
  <div id="main">
    <div class="row">
      <div class="col-2">
        <el-button size="mini" type="primary" @click="save">save</el-button>
      </div>
      <div class="offset-5 col-5">
        <p class="last-saved-text">saved: {{ last_saved_date }}</p>
      </div>
    </div>
    <!-- <el-button size="mini" type="primary" @click="createPDF">print to PDF</el-button> -->
    <mavon-editor v-model="value" language="en" :toolbars="toolbars" />
  </div>
</template>

<script>
  import { ipcRenderer } from 'electron'
  import moment from 'moment'
  import firebase from 'firebase'
  import mavonEditor from 'mavon-editor'
  require('mavon-editor/dist/css/index.css')
  export default {
    data() {
      return {
        value: '',
        toolbars: {
          bold: true,
          italic: true,
          header: true,
          underline: true,
          strikethrough: true,
          mark: true,
          superscript: true,
          subscript: true,
          quote: true,
          ol: true,
          ul: true,
          link: true,
          imagelink: true,
          code: true,
          table: true,
          help: true,
          alignleft: true,
          aligncenter: true,
          alignright: true,
          subfield: true,
          preview: true,
          // false
          undo: false,
          redo: false,
          fullscreen: false,
          readmodel: false,
          htmlcode: false,
          trash: false,
          save: false,
          navigation: false,
        },
        markdownRef: null,
        database: null,
        uid: firebase.auth().currentUser.uid,
        interval_id: null,
        last_saved_date: "None",
        pre_value: ''
      }
    },

    components: {
      'mavon-editor': mavonEditor.mavonEditor
    },

    created: function() {
      this.database = firebase.database()
      this.uid = firebase.auth().currentUser.uid
      if (process.env.NODE_ENV == 'development') {
        this.markdownRef = this.database.ref('development/' + this.uid + '/markdown')
      } else {
        this.markdownRef = this.database.ref('production/' + this.uid + '/markdown')
      }
      var _this = this
      this.markdownRef.on('value', function(snapshot) {
        if (snapshot.val() == null) {
          _this.value = ""
        } else {
          _this.value = snapshot.val() // データに変化が起きたときに再取得する
        }
      });
      this.interval_id = setInterval(function() {
        if (this.value !== this.pre_value) {
          this.save()
        }
      }.bind(this), 5000);
    },

    methods: {
      save: function() {
        // console.log(this.value)
        this.markdownRef.set(this.value, function(error) {
          if (error) {
            alert(error)
          } else {
            console.log('saved')
          }
        });
        this.pre_value = this.value
        this.last_saved_date = moment().format("YYYY-MM-DD-HH:mm:ss")
      },

      createPDF: function() {
        this.$prompt('Please PDF title', 'hoge', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
        }).then(({ value }) => {
          this.$message({
            type: 'success',
            message: 'saved PDF' + value
          });
          console.log(value)
          console.log(typeof(value))
          ipcRenderer.send('print-to-pdf', value)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'Input canceled'
          });
        });
      }
    },

    mounted: function() {
      ipcRenderer.on('wrote-pdf', function(event, path) {
        console.log(path + ' saved')
      })
    },

    beforeDestroy: function() {
      this.save()
      clearInterval(this.interval_id)
    }
  }
</script>

<style>
  .v-note-wrapper {
    height: calc(100vh - 187px);
  }
</style>