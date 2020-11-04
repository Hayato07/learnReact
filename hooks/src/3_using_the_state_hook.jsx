import React, { useState } from 'react';
import ReactDOM from 'react-dom';

/**
 * State Hookを使ってみる
 * Hooksはv16.8から追加された
 * classなしでstateやその他のReactの機能を利用できる
 * classではHooksは機能しない
 * 関数コンポーネントと呼ぶことが多い
 * 
 * Hookとは、Reactの機能をフックする関数
 * 全てのHooksは、useから始まる
 * useStateは、stateを関数コンポーネントに追加する
 * 
 * 関数コンポーネントがあり、後からstateを追加する必要が出てきた時
 * これまではclassに変換する必要があった。Hookを使えば関数のままでよい
 * 
 * useStateはstateの変数を宣言する。
 * 引数には初期値を渡す
 * 配列やオブジェクトも保持できる。データの関心ごとに分てあげるのがベスト
 * useStateは現在の値と、値を更新するための関数を返す
 */

function Example() {
    // 左辺で行っているのは分割代入
    const [obj, setObj] = useState({count: 0, name: 'stranger'});

    return (
        <div>
            <p>{obj.name} Clicked {obj.count} times</p>
            <button onClick={() => setObj({count: obj.count + 1, name: obj.name})}>
                Click me
             </button>

             <p>
                 <input type="text" onChange={(e) => setObj({count: obj.count, name: e.target.value})}/>
             </p>
        </div>
    );
}

// 上記と同様の動作をするclass

class Example_class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        };
    }

    render() {
        return (
            <div>
                <p>You Clicked {this.state.count} times</p>
                <button onClick={() => this.setState({count: this.state.count + 1})}>
                    Click me
             </button>
            </div>
        );
    }
}

ReactDOM.render(
    <Example />, document.getElementById('root')
);