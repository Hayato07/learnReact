// module.exports = {
//     // エントリーポイント 全てのファイルのimport元となる出発点と考えればよい。
//     // entry: `./src/index.js`,
//     entry: `./src/1_hello_world.jsx`,
//     // ファイルの出力設定
//     output: {
//       //  出力ファイルのディレクトリ名
//       // __dirnameは、webpack.config.jsがあるディレクトリ名
//       path: `${__dirname}/dist`,
//       // 出力ファイル名 モジュール解決後の出力ファイル名
//       filename: "main.js"
//     },
//     // モード値を production に設定すると最適化された状態で、development に設定するとソースマップ有効でJSファイルが出力される
//     mode: "development",
//   };

const src  = `${__dirname}/src`;
const dist = `${__dirname}/dist`;

module.exports = {
  mode: 'development',
  entry: src + '/6_handling_events.jsx',
  output: {
    path: dist,
    filename: 'jsx_bundle.js'
  },

  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },

  resolve: {
    extensions: ['.js', '.jsx']
  },

  plugins: []
}