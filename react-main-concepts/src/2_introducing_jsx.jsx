import React from 'react';
import ReactDOM from 'react-dom';

/**
 * 2. Introducing JSX
 * JSXとは何か
 * JavaScriptの文法を拡張したもの
 * ReactのUI部分はJSXを使う(実際には使う必要はないが、みやすいのでつかう)
 */
let element;

element = <h1>Hello World</h1>;

/**
 * マークアップとロジックの分離ではなく、
 * 両者を含む小さなコンポーネントを利用している。(緩い関心の分離)
 */

const name = 'hayato07';
element = <h1>Hello, {name}</h1>;

ReactDOM.render(
  element,
  document.getElementById('root')
);

/**
 * JavaScriptの文法にしたがって入れば、JSXであらゆることができる。
 */

function formatName(user) {
  return user.firstName + ' ' + user.lastName;
}

const user = {
  firstName: 'hayato',
  lastName: '07'
};


element = ( // カッコは必要そうなとこはつける、見た目的にも良いし、JavaScript側に任せると狙いと違った解釈をされる可能性もある
  <h2>
    Hello, {formatName(user)}
  </h2>
);

ReactDOM.render(
  element,
  document.getElementById('root')
);

/**
 * JSXをJavaScriptにトランスパイルすると、当たり前ですがただのJavaScriptになります。
 * なのでもちろん、JavaScriptに存在する、ifやforなんかもJSXで使えちゃいます。
 */

function getGreeting(user) {
  if (user) {
    return <h1>Hello, {formatName(user)}!</h1>;
  }

  return <h1>Hello, Stranger!</h1>;
}

/**
 * 属性値
 * タグの属性値には、引用符("", '')を用いた文字列や、大カッコ{}を用いたJavaScriptの表現を利用できます。
 * ただし、{}の場合に引用符をつける必要はありません。
 * 
 * JSXはHTMLよりJavaScriptに近いので、
 * HTML属性の代わりにキャメルケースの命名を利用します。
 */

element = <div tabIndex="0"></div>;

element = <img src={user.avatarUrl}></img>;
// element = <img src="{user.avatarUrl}""></img>;　 これはだめ

/**
 * タグに子要素がない場合は、/>で閉じられます。
 * JSXタグは、複数の子要素を含むことができます。
 */

element = <img src={user.avatarUrl} />;

element = (
  <div>
    <p>user image</p>
    <img src={user.avatarUrl} />
  </div>
);

/**
 * JSXは、XSSを防ぎます。
 * ユーザーの入力を埋め込んでOK!
 * デフォルトで、エスケープ処理を行います。
 * 明示的にしなければ、エスケープが行われないことはないです。
 */

 var response = {
   "potentiallyMaliciousInput" : "<script>alert('test');</script>"
 }

const title = response.potentiallyMaliciousInput; // 潜在的な悪意のある入力という意味らしい
element = <h1>{title}</h1>;

/**
 * JSXは、オブジェクトです。
 * JSXをトランスパイルすると、以下のようなものになります。
 * React.createElementは、いくつかバグがないかのチェック処理を行いますが、
 * 最終的には、以下のようなオブジェクトを作成します。
 * このオブジェクト一つ一つがReactの要素と言われており、
 * これらがあなたが画面に表示したいものに関するコードと捉えることができます。
 * Reactは、これらのオブジェクトを解読し、DOMの構築、再構築を行います。
 */

 // JSX
 element = (
  <h1 className="greeting">
    Hello, world!
  </h1>
);

// JS
element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
);

// オブジェクト(簡略化されています)
element = {
  type: 'h1',
  props: {
    className: 'greeting',
    children: 'Hello, world!'
  }
};

