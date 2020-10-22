/**
 * Hooksの概要
 * 関数コンポーネントからReactの状態とライフサイクルにフックできる関数
 * クラスでは機能しない。
 * 1. ステートフック(useState)
 * 関数コンポーネントで呼び出し、状態を追加する
 */

import React, {useState} from 'react';
import ReactDOM from 'react-dom';

function Example() {
    // useStateは何度でも使える
    // ただし条件が一つあり、レンダリングごとにuseStateを呼び出す
    // 順番が変わってはいけない（順番でどのデータの値を管理しているから）
    const [count, setCount] = useState(0);
    const [age, setAge] = useState(12);

    return(
        <div>
            <p>your age: {age}</p>
            <input type="number" onChange={(e) => setAge(e.target.value)}/>
            <p>you clicked {count} times</p>
            <button onClick={()=> setCount(count+1)}>
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

 import {useEffect} from 'react';

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

    if(isOnline === null) {
        return 'Loading';
    }
    return isOnline ? 'Online' : 'Offline';
}