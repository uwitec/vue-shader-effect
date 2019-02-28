# vue-shader-effect
PIXI.jsのShader連携するコンポーネント

## DEMO
<ul>
	<li><a href="https://yoshihitofujiwara.github.io/vue-shader-effect/#/distortion" target="_blank">distortion</a></li>
	<li><a href="https://yoshihitofujiwara.github.io/vue-shader-effect/#/line" target="_blank">line</a></li>
</ul>

## 追加モジュール(package.json追加済み)
``` bash
npm i sass-loader node-sass --save-dev

// shaderファイルをモジュール管理するためのnpm
npm i glslify --save-dev
npm i glslify-import-loader --save-dev
npm i glslify-loader --save-dev
npm i glsl-strip-comments --save-dev
```

## webpack設定追加
```
webpack.base.conf.js
shaderファイルをモジュール管理するためのnpm処理追加
```


> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test

```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
