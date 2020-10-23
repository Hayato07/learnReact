/**
 * Hooksの概要
 * 関数コンポーネントからReactの状態とライフサイクルにフックできる関数
 * クラスでは機能しない。
 * 1. ステートフック(useState)
 * 関数コンポーネントで呼び出し、状態を追加する
 */

import React, { useState } from 'react';
import ReactDOM from 'react-dom';

function Example() {
    // useStateは何度でも使える
    // ただし条件が一つあり、レンダリングごとにuseStateを呼び出す
    // 順番が変わってはいけない（順番でどのデータの値を管理しているから）
    const [count, setCount] = useState(0);
    const [age, setAge] = useState(12);

    return (
        <div>
            <p>your age: {age}</p>
            <input type="number" onChange={(e) => setAge(e.target.value)} />
            <p>you clicked {count} times</p>
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

/**
 * 2. effect hook(useEffect)
 * componentDidMountやcomponentDidUpdate, componentWillUnmountといったものに対応
 * 基本的には、レンダリング後に関数を実行させるhookという認識でOK
 * デフォルトでは、最初のレンダリングを含む全てのレンダリング後に実行する
 * = componentDidMount, componentDidUpdate
 * 
 * useEffect(function, array)
 * functionは実行した関数。arrayは、特定の変数が変化した場合のレンダリング時のみ関数を実行する際に用いる(countが変化したら実行したい => [count])
 * arrayに空配列をわたすことで、componentDidMount時にのみ実行させることができる
 */

import { useEffect } from 'react';

function Example2() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        document.title = `You clicked ${count} times`;
    });

    return (
        <div>
            <p>you clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>
                Click me
             </button>
        </div>
    );
}

ReactDOM.render(
    <Example2 />,
    document.getElementById('root')
);


/**
 * クリーンアップについて
 * イベントリスナーの介助やタイマーのキャンセル
 */
function FriendStatus(props) {
    const [isOnline, setIsOnline] = useState(null);

    function handleStatusChange(status) {
        setIsOnline(status.isOnline);
    }

    useEffect(() => {
        // サブスクライブを始めるための関数
        ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);

        // この部分がクリーンアップ componentWillUnmountで実行される
        // マウント時に実行した処理をアンマウント時に介助する処理を書く
        return () => {
            // サブスクライブをやめるための関数
            ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
        }
    });

    if (isOnline === null) {
        return 'Loading';
    }
    return isOnline ? 'Online' : 'Offline';
}

/**
 * Hooksのルール
 * - トップレベルで呼び出すこと
 * Hooksは、呼び出される順番によって、それぞれの状態を管理しています
 * なので、ループの中や、if文の中にあり呼び出される回数が変わるとそれぞれのstateが混じる状態が発生します。
 * - Reactの関数コンポーネントからのみ呼び出す
 * classからは呼び出してはいけませんし、友情のJavaScriptの関数から呼び出してもいけません。
 * カスタムHooksからならOKです。
 * これらを強要してくれる便利なlinterがあります。
 * https://www.npmjs.com/package/eslint-plugin-react-hooks
 */

/**
 * 独自のhooksを作ろう
 * 便利なロジックを再利用する際にこれまでは、さらに高次のコンポーネントを用意してpropsで子コンポーネントに
 * 渡すという方法をとっていました。
 * しかし独自のhooksを作ることでこの作業から開放されます。
 */

// クリーンアップの説明で利用した関数の処理を独自hooksにして再利用する
// フック部分の処理を切り離してあげるだけ！！
// use○○○○○とすることでフックとみなす慣例(中にuseStateなどを使っていれば)
function useFriendStatus(friendID) {
    const [isOnline, setIsOnline] = useState(null);

    function handleStatusChange(status) {
        setIsOnline(status.isOnline);
    }

    useEffect(() => {
        ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
        return () => {
            ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
        };
    });
}

function FriendStatus(props) {
    const isOnline = useFriendStatus(props.friend.id);

    if(isOnline === null) {
        return 'Loading...';
    }
    return isOnline ? 'Online' : 'Offline';
}

function FriendListItem(props) {
    const isOnline = useFriendStatus(props.friend.id);

    return (
        <li style={{ color: isOnline ? 'green' : 'black'}}>
            {props.friend.name}
        </li>
    );
}

/**
 * 他にもあるhooks
 * useContext
 * useReducer
 * などなど
 */