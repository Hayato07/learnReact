**https://ics.media/entry/12140/**
主に上記のページを参考にしている。

webpackは、JSファイルを束ねるモジュールバンドラーのこと。
モジュール(役割ごとにファイル分けできるようになった)を実際に使う際に、全てまとめる役割を担う。

つまりは、複数ファイルを一つにまとめる作業を行うツール。(どのブラウザでも対応できるために +　速さの点もある)
webpack.config.jsで開発環境を合わせられる。(もちろんwebpackのバージョンを合わせる必要が時もある)

## webpack環境構築

```bash
# node.jsをインストールし、あるディレクトリで
npm init -y

# webpackをインストール (webpack-cliは、cuiとほとんど同義でターミナル操作できるようにするやつ)
# --save-devでインストール先をdevDependenciesに指定(グローバルではない！)
npm i --save-dev webpack webpack-cli

# 現状確認
ls
cat package.json

# JSファイルは、srcに配置する
mkdir src
```

## モジュールの書き方

webpackをインストールしてもモジュールの書き方を知らなければ、意味がない。
本来なら、JSファイルに書くのがよいが、ひとまずここで書いてみる。

```javascript
// モジュールを作る
// @calcDogAge.js
export default function calcDogAge(years) {
    return Number.isInteger(years) ? (years + 4)* 4 : null;
}

// モジュールを読み込む
// @index.js
import calcDogAge from "./calcDogAge.js";

console.log(calcDogAge(12));
```

```bash
# webpackでモジュールを結合する
npx webpack
```

ちなみに
npm scriptを利用するとエイリアスを登録することができる。
なので、例えば、
npm run build
npm run dev
といった同じ処理で、ことなった環境でも同じ内容の動作を設定することができる。
(サーバー構築は、npm run startなどと統一することで、環境差をなくせる)

## webpackをカスタマイズする
webpack.config.jsファイルを作成し、設定を記述することができる。
チーム開発が容易に！

```javascript
module.exports = {
  // エントリーポイント 全てのファイルのimport元となる出発点と考えればよい。
  entry: `./src/index.js`,
  // ファイルの出力設定
  output: {
    //  出力ファイルのディレクトリ名
    // __dirnameは、webpack.config.jsがあるディレクトリ名
    path: `${__dirname}/dist`,
    // 出力ファイル名 モジュール解決後の出力ファイル名
    filename: "main.js"
  },
  // モード値を production に設定すると最適化された状態で、development に設定するとソースマップ有効でJSファイルが出力される
  mode: "development",
};
```

## ローカルサーバーでホットリロード

VS Codeであれば、
'''bash
# 
npx webpack --watch
'''
と
Live Serverを利用すれば実現できる様子


あるいは、webpack-dev-serverを利用する(手順は以下)

```bash
npm i -D webpack-dev-server
```

```json
{
  "scripts": {
    "build": "webpack",
    "start": "webpack-dev-server"
  },
  ...(以下略)
}
```

webpack.config.js
```javascript
module.exports = {
  // エントリーポイント 全てのファイルのimport元となる出発点と考えればよい。
  entry: `./src/index.js`,
  // ファイルの出力設定
  output: {
    //  出力ファイルのディレクトリ名
    // __dirnameは、webpack.config.jsがあるディレクトリ名
    path: `${__dirname}/dist`,
    // 出力ファイル名 モジュール解決後の出力ファイル名
    filename: "main.js"
  },
  // モード値を production に設定すると最適化された状態で、development に設定するとソースマップ有効でJSファイルが出力される
  mode: "development",
  // 
  devServer: {
    contentBase: "dist",
    open: true
  }
};
```