import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

/**
 * effect hookは、関数コンポーネントで副作用を起こすためのフック。
 * レンダリング後に何かの処理を行うためのHook。Reactにレンダリング後に実行する処理を伝える。
 * データの取得・更新や、サブスクリプションの設定、DOMの変更など
 * classで言うとcomponentDidMount, componentDidUpdate, componentWillUnmountを合わせたもの
 * クリーンアップを必要とするものとしないものがある
 */

function Example() {
    const [count, setCount] = useState(0);

    // ボタンがクリックされた時に、タイトルを書き換える
    // 第一引数にレンダリング後に実行する関数を受け取る
    useEffect(() => {
        document.title = `You clicked ${count} times`;
    });

    return (
        <div>
            <p>You clicked {count} times.</p>
            <button onClick={() => { setCount(count + 1) }}>
                click me
            </button>
        </div>
    );
}

/**
 * クリーンアップを必要としないもの
 * ReactのDOM更新の後に処理を追加したい場合、
 * 例えば、DOM操作、ログ、ネットワークへのリクエストなどは、
 * クリーンアップを必要としない。
 * 実行後に、その実行した情報を保持する必要がないから。
 */

// クラス
class Example2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        };
    }

    // 同じ処理を２箇所に書く必要がある
    componentDidMount() {
        document.title = `You clicked ${this.state.count} times`;
    }

    componentDidUpdate() {
        document.title = `You clicked ${this.state.count} times`;
    }

    render() {
        return (
            <div>
                <p>You clicked {this.state.count} times</p>
                <button onClick={() => this.setState({ count: this.state.count + 1 })}>
                    Click me
                </button>
            </div>
        );
    }
}

/**
 * クリーンアップを必要とする場合
 */

// クラス
class FriendStatus extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isOnline: null };
        this.handleStatusChange = this.handleStatusChange.bind(this);
    }

    componentDidMount() {
        ChatAPI.subscribeToFriendStatus(
            this.props.friend.id,
            this.handleStatusChange
        );
    }

    componentWillUnmount() {
        ChatAPI.unsubscribeFromFriendStatus(
            this.props.friend.id,
            this.handleStatusChange
        );
    }

    handleStatusChange(status) {
        this.setState({
            isOnline: status.isOnline
        });
    }

    render() {
        if (this.state.isOnline === null) {
            return 'Loading...';
        }
        return this.state.isOnline ? 'Online' : 'Offline';
    }
}

// 関数
function FriendStatus2() {
    const [isOnline, setIsOnline] = useState(null);

    useEffect(()=>{
        function handleStatusChange(status) {
            setIsOnline(status.isOnline);
        }

        ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);

        // 第一引数の関数に戻り値があればそれが、クリーンアップ処理になる
        // アロー関数で返しても動作する
        return function cleanup() {
            ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
        };
    });

    if(isOnline === null) {
        return 'Loading ...';
    }
    return isOnline ? 'Online' : 'Offline';
}

/**
 * Hooksの利点
 * クラスだと処理の関心ごとがまざってしまう。
 * Hooksなら、関心ごとにHookを利用すればいい（独自Hookを作るという手段もある？）
 * 
 * なぜクリーンアップ処理は再レンダリングの度に実行されるのか。
 * FriendStatusクラスで考えてみると、
 * コンポーネントがunmountされずにfriendのpropsの値が変わった場合、別のfriendのオンライン状況を表示し続けてしまう。
 * クラスだとそれをさけるためにcomponentDidUpdateも書く必要あり！
 * useEffectだとその心配がない。
 * また特定のstateの更新のときだけ副作用を利用したい場合には、第二引数に観察したい変数を配列でセットしておけばよい
 * これにより第二引数の値の変化が怒った場合のみuseEffectの第一引数の処理が実行される。
 */

 useEffect(() => {
     document.title = `You clicked ${count} times`;
 }, [count]);

 // []をわたすことで、mount時とunmount時にのみ実行させることも可能

 useEffect(() => {
    document.title = `You clicked ${count} times`; // clickしても変化しない
}, []);