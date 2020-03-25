# study-support
## What this app?
* ポモドーロ・テクニックに準じたストップウオッチ
* Todoリスト
* 日報 + カレンダー
* Markdownエディタ
上記を各種PCでどこでもシームレスにデータ共有できるデスクトップアプリ

E-mailとパスワードを登録して、使用してください.

## Debug and Build
``` bash
npm install
npm run dev

npm run build:mac  # build for mac
npm run build:windows
npm run build:linux
```

## Error
Uncaught Error: Failed to load gRPC binary module because it was not installed for the current systemが出た時
```
npm ls  # electronのversionを探す
npm rebuild --runtime=electron --disturl=https://atom.io/download/electron --target=?.?.? --target_libc=glibc --target_platform=linux
```
`--target_platform`のオプション: `darwin`, `win32`, `linux`

## electon-vue
This project was generated with [electron-vue](https://github.com/SimulatedGREG/electron-vue)@[8fae476](https://github.com/SimulatedGREG/electron-vue/tree/8fae4763e9d225d3691b627e83b9e09b56f6c935) using [vue-cli](https://github.com/vuejs/vue-cli). Documentation about the original structure can be found [here](https://simulatedgreg.gitbooks.io/electron-vue/content/index.html).

