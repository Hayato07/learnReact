import React from 'react';
import ReactDOM from 'react-dom';

/**
 * 要素(elements)は、Reactにおける最小のパーツであり、要素によってコンポーネントが作られる
 * ReactDOMのrenderメソッドで、レンダリングする。
 */
const element = <h1>Hello, world</h1>;
ReactDOM.render(element, document.getElementById('root'));

/**
 * React要素は不変。要素を作成すると、その子や属性を変更できない。(特定時点のUIを表現している)
 * 要素を更新するには、新しい要素を作成して、ReactDOM.renderに渡してあげることで実現できる。
 * だが実際には、ReactDOM.renderは一度だけ実行するのが一般的。(4_components_and _props.jsxで確認する)
 */

function tick() {
    const element = (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {new Date().toLocaleTimeString()}.</h2>
      </div>
    );
    // Reactは、渡された要素と変更する要素の差分を確認し、変更部分のみ更新する
    ReactDOM.render(element, document.getElementById('root'));
  }
  
  setInterval(tick, 1000);