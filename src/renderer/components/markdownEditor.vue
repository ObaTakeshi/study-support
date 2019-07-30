<template>
  <div id="main">
    <el-input size="small" placeholder="Title" v-model="input"></el-input>
    <el-button size="mini" type="primary" @click="save">save</el-button>
    <el-button size="mini" type="primary" @click="createPDF">print to PDF</el-button>
    <mavon-editor v-model="value" language="en" :toolbars="toolbars" />
  </div>
</template>

<script>
  import { ipcRenderer } from 'electron'
  import firebase from 'firebase'
  import mavonEditor from 'mavon-editor'
  require('mavon-editor/dist/css/index.css')
  export default {
    data() {
      return {
        input: '',
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
      };
    },

    components: {
      'mavon-editor': mavonEditor.mavonEditor
    },

    created: function() {
      this.database = firebase.database();
      this.markdownRef = this.database.ref('markdown');
      var _this = this;
      this.markdownRef.on('value', function(snapshot) {
        if (snapshot.val() == null) {
          _this.value = ""
        } else {
          _this.value = snapshot.val(); // データに変化が起きたときに再取得する
        }
      });
    },

    methods: {
      save: function() {
        console.log(this.value);
        this.markdownRef.set(this.value);
      },

      createPDF: function() {
        if (this.input == '') {
          this.input = 'study-support'
        }
        ipcRenderer.send('print-to-pdf', this.input)
      }
    },

    mounted: function() {
      ipcRenderer.on('wrote-pdf', function(event, path) {
        console.log(path + ' saved')
      })
    }
  }
</script>

<style>
  .v-note-wrapper {
    height: calc(100vh - 187px);
  }
</style>