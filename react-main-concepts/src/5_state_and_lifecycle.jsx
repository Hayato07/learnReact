

import React from 'react';
import ReactDOM from 'react-dom';

/**
 * Stateとライフサイクルについて
 * 3_rendering_elementsで作成したDOMの更新方法は次の方法
 */

// function tick() {
//   const element = (
//     <div>
//       <h1>HEllo world!</h1>
//       <h2>It is {new Date().toLocaleTimeString()}.</h2>
//     </div>
//   );

//   ReactDOM.render(
//     element,
//     document.getElementById('root')
//   );
// }

// setInterval(tick, 1000);

/**
 * 今回は、もっと再利用しやすく、カプセル化された
 * コンポーネントの作り方を学ぶ
 * まずは見た目を切り離す
 */

// function Clock(props) {
//   return (
//     <div>
//       <h1>HEllo world! take 2</h1>
//       <h2>It is {props.date.toLocaleTimeString()}.</h2>
//     </div>
//   );
// }

// function tick2() {
//   ReactDOM.render(
//     <Clock date={new Date()} />,
//     document.getElementById('root')
//   )
// }

// setInterval(tick2, 1000);

/**
 * しかしここで気になる点がある。
 * Clock関数があるのに、時計の更新処理がその外側にあることだ。
 * できれば以下のように書きたいというのが本音
 * そのためにはstateを知る必要がある
 */

/**
// setIntervalの実行内容がClock内で完結しているのがポイント
ReactDOM.render(
  <Clock />,
  document.getElementById('root')
)

 */

/**
 * 関数コンポーネントにはstateを扱えない
 * そのため、クラスコンポーネントに変更する
 * React Hooksを使えばなんとかできるのだろう
 */

class Clock2 extends React.Component {
  render() {
    return (
      <div>
        <h1>HEllo world! take 2</h1>
        <h2>It is {this.props.date.toLocaleTimeString()}.</h2>
      </div>
    )
  }
}

/**
 * renderメソッドは、更新処理が発生する度にに実行される
 * しかし、同じDOMノード内にレンダリングする限り、1つのインスタンスが利用される。
 * これにより、local stateやライフサイクルメソッドを利用できる。
 * propsをstateに変更する
 */

/**
 * Reactのライフサイクル
 * - mounting コンポーネントが初めてレンダリングされた時(コンポーネントの出力(renderメソッド部分)がDOMにレンダリングされた後に実行)
 * - unmounting レンダリングされていたコンポーネントが削除された時
 */

class Clock3 extends React.Component {
  constructor(props) {
    super(props); // 必須!!!
    // state管理するものを定義する
    this.state = { date: new Date() };
  }

  componentDidMount() {
    // state管理するわけではないので、クラス変数として保存
    this.timerID = setInterval(
      () => this.tick(), // アロー関数で書かないと、tick関数のthisの参照オブジェクトがWindowになる
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <h1>HEllo world! take 3</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    )
  }
}
ReactDOM.render(
  <Clock3 />,
  document.getElementById('root')
);

/**
 * Clock3 処理の流れ
 * 1: <Clock3 />がReactDOM.render()に渡され、ReactによりClock3コンポーネントのconstructorがコールされる。
 *    現在時刻を表示するために、stateを現在時刻を含むオブジェクトに初期化する。stateは後ほど更新する
 *
 * 2: Reactは続いて、Clock3のrenderメソッドをコールする。Reactはここから何を表示するのかを知る。
 *    そして、renderメソッドの出力に応じて、DOMを更新する。
 *
 * 3: Clock3の出力がDOMに追加されたとき、ReactはcomponentDidMount()めそっどをコールする。
 *    Clock3コンポーネントは、mount時にtickメソッドを毎秒実行するよう設定する。
 *
 * 4: 毎秒ブラウザが、tickメソッドをコールする。Clock3コンポーネントのstateが更新される(現在時刻)
 *    stateを変更するためにsetStateが実行されるので、Reactはstateが変更されたことを知る。
 *    それによりClock3のrenderメソッドを再度実行し何を表示するか確認する。
 *    変更箇所部分のDOMがどこかわかるので、その部分のみ変更する
 * 5: もし、Clock3コンポーネントがDOMから削除された場合(今回の処理にはないが、コンソールから削除した場合なども考えられる？)
 *    ReactはcomponentWillUnmountを実行し、timerを止める。
 */


/**
 * stateを正しく使うための3つの掟
*/

/** ①stateを直接変更しない
// No !!!
this.state.comment = 'Hello';

// Correct!
this.setState({
  comment: 'HEllo
});
 */


/** ②状態更新は非同期である可能性を理解する
// this.state.hogeの中身が "hoge"だとする。
this.setState({
 hoge: 'fuga'
});
console.log(this.state.hoge); // hogeが出力される。

// stateとpropsを頼りに次の値を設定しようとしないこと
// No!!!
this.setState({
 counter: this.state.counter + this.props.increment,
});

// stateとpropsなどが必要な場合は、引数に関数を渡すこと
// Correct
this.setState((state, props) => ({
 counter: state.counter + props.increment,
}))
 */

/** state更新はマージされる
// 下記のようなstateがあるとする
constructor(props) {
  super(props);
  this.state= {
    posts: [],
    comments: []
  }:
}

// 上記のstateを更新する場合、毎回setStateにpostsとcommentsを含める必要はない
// 以下のような形で別々に記述できる
componentDidMount() {
  fetchPosts().then(response => {
    this.setState({
      posts: response.posts
    });
  });

  fetchComments().then(response => {
    this.setState({
      comments: response.comments
    });
  });
}
 */

/**
 * データの流れ
 * 親、子、どのコンポーネントもどのコンポーネントがstatelessでstatefulかを知らない。
 * それが関数コンポーネントかクラスコンポーネントであるかもさえも。
 */

// FormattedDateコンポーネントは、dateがstateが渡されたのか、誰かが入力を行ったデータなのか分かりません。
// これは、トップダウン(あるいは、単方向)データフローと呼ばれます。
// 全ての状態は常に特定のコンポーネントによって所有され、その状態から派生したデータorUIはツリー内のそれらの「下」(子)に
// あるコンポーネントにのみ影響を与えます。
// コンポーネントツリーは、propsを子コンポーネントに渡していく滝のようなものです。
function FormattedDate(props) {
  return <h2>It is {props.date.toLocaleTimeString()}.</h2>;
}