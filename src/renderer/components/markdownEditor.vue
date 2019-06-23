<template>
  <div id="main">
    <el-button size="mini" type="info" @click="save">save</el-button>
    <mavon-editor v-model="value" language="en" :toolbars="toolbars" />
  </div>
</template>

<script>
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
      }
    }
  }
</script>

<style>
  .v-note-wrapper {
    height: calc(100vh - 187px);
  }
</style>