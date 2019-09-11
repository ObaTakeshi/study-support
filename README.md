# study-support

> An electron-vue project

#### Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:9080
npm run dev

# build electron application for production
npm run build


```

---

This project was generated with [electron-vue](https://github.com/SimulatedGREG/electron-vue)@[8fae476](https://github.com/SimulatedGREG/electron-vue/tree/8fae4763e9d225d3691b627e83b9e09b56f6c935) using [vue-cli](https://github.com/vuejs/vue-cli). Documentation about the original structure can be found [here](https://simulatedgreg.gitbooks.io/electron-vue/content/index.html).

## For me
### Debug and Build
```
npm run dev  # debug

npm run build:mac  # build for mac
```

### Error
Uncaught Error: Failed to load gRPC binary module because it was not installed for the current systemが出た時
```
npm ls  # electronのversionを探す
npm rebuild --runtime=electron --disturl=https://atom.io/download/electron --target=?.?.?
```