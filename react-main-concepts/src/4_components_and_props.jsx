import React from 'react';
import ReactDOM from 'react-dom';

/**
 * コンポーネント UIの独立した1要素、再利用しやすい
 * コンポーネントはJSの関数に似ている。propsと呼ばれる任意の入力を受け取り、
 * Reactエレメント(表示要素)を返す。
 * コンポーネント名は大文字スタート！！ 通常のタグが小文字なので、区別しやすい。
 */

// 関数コンポーネント stateを持たない(関数は状態を持てない)
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

// クラスコンポーネント stateを持てる(クラスは状態を持てる)
class WelcomeClass extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}

/**
 * 以下内容 参考元 :最近Reactを始めた人向けのReact Hooks入門 https://sbfl.net/blog/2019/11/12/react-hooks-introduction/
 * 関数コンポーネントは、独自に状態管理をできないので、クラスコンポーネントの劣化版のように思える。
 * but React Hooksを用いることであたかも状態管理ができているように関数コンポーネントを使うことが可能。
 * そこまでして、関数コンポーネントを使う意味は何か。それは、クラスコンポーネントにいくつかの問題があるため。
 * 処理が散らばりやすい: それぞれのクラスコンポーネントで独自の処理を実装するため、処理が散らばりやすい。
 * Hooksであれば、あるフックを利用しているのであれば、そのフックのところに処理があることがわかる様子。(詳しくはまだわからない。)
 * この詳細については、まだ先の様子。
 */

const element = <Welcome name="hayato07" />;
const element2 = <WelcomeClass name="hayato08" />;

ReactDOM.render(
  <div>
    {element}  {/* renderメソッドを(name="hayato07"で、Welcomeコンポーネントを渡して)実行。 ReactがWelcomeコンポーネントにpropsを渡して実行。Welcomeコンポーネントが、<h1></h1>を返す。それをもとにDOM更新。 */}
    {element2}
  </div>,
  document.getElementById('root')
);

/**
 *  コンポーネントは他のコンポーネントから呼び出せる。
 * 同じコンポーネント を何度でも利用できる(再利用可能！)
 * 新しいReactアプリには、Appコンポーネントがあり、そこからアプリの機能が
 * 派生している。
 * 既存のアプリにReactを加える場合は、ボタンなど小さな部分から初めて徐々に全体に
 * 派生させていくなどもできる。
 */

function App() {
  return (
    <div>
      <Welcome name="ha" />
      <Welcome name="ya" />
      <Welcome name="to" />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

/**
 * 既存コンポーネントを分割する
 * 既存コンポーネントを小さなコンポーネントに分割することもできる。
 * 大きくなってきた場合、適宜サイズを小さくしていく。
 * 
 * 分割作業は退屈に感じるかもしれないが、
 * 大きなアプリになると再利用できるコンポーネント にしておくと後々助かる。
 */

// Commentコンポーネント(分割前)

function Comment(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">
        <img className="Avatar"
          src={props.author.avatarUrl}
          alt={props.author.name}
        />
        <div className="UserInfo-name">
          {props.author.name}
        </div>
      </div>
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}

// 分割1 avatarをコメントから分割する
function Avatar1(props) {
  return (
    <img src={props.user.avatarUrl} alt={props.user.name} className="Avatar"/>
  )
}

function Comment1(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">
        <Avatar1 user={props.author} />
        <div className="UserInfo-name">
          {props.author.name}
        </div>
      </div>
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}

// 分割2 ユーザー情報を分割する

function UserInfo(props) {
  return (
    <div className="UserInfo">
      <Avatar1 user={props.user} />
      <div className="UserInfo-name">
        {props.user.name}
      </div>
    </div>
  );
}

function Comment2(props) {
  return (
    <div className="Comment">
      <UserInfo user={props.author} />
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}

function formatDate(date) {
  return date;
}
const author = {
  "avatarUrl" : "example.com/avatar_img",
  "name": "hayato07"
};

ReactDOM.render(
  <Comment2 author={author} text="hello" date="2020/10/06" />,
  document.getElementById('root')
);

/**
 * All React components must act like pure functions with respect to their props.
 * Reactでは、全てのコンポーネントが純粋関数(引数に変化を与えない。同じ引数の場合、常に同じ結果になる)のように機能する必要がある。
 */