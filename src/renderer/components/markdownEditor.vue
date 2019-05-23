<template>
  <div id="main">
    <mavon-editor v-model="value" language="en" :toolbars="toolbars" />
  </div>
</template>

<script>
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
        }
      };
    },

    components: {
      'mavon-editor': mavonEditor.mavonEditor
    }
  }
</script>

<style>
  .v-note-wrapper {
    height: calc(100vh - 187px);
  }
</style>