/**
 * Hooksとは
 * v16.8で追加された機能。それまでクラスでしか管理できなかったstateをhooksを通せば
 * 関数でも使えるようになった様子
 * 
 * useStateを筆頭にHookにはいくつかの種類がある
 * - useState 状態を持たせることができる
 * - useEffect componentDidMountなどを実現できる
 * 
 * なぜHooksは生まれたのか
 * - コンポーネント間でステートフルロジックを再利用しづらい
 * - クラスではコンポーネントが複雑になりやすい
 * - JSにおけるthisの動作
 */

import React, { useState } from "react";
import ReactDOM from "react-dom";

function Example () {
    //　分割代入[stateの現在値、現在の値を更新するための関数]
    // useState関数の戻り値が、[value, function]ということ。それを受け取っているだけ
    const [count, setCount] = useState(0); // useState(0)で初期値を0と指定

    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>
                Click me
            </button>
        </div>
    );
}

ReactDOM.render(
    <Example />,
    document.getElementById('root')
);