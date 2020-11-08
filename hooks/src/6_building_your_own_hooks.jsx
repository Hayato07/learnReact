import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

/**
 * 独自のHooksを作る
 * 独自のHooksを作成することで、コンポーネントのロジックを再利用可能な関数に切り離せます。
 */

function FriendStatus(props) {
    const [isOnline, setIsOnline] = useState(null);

    useEffect(() => {
        function handleStatusChange(Status) {
            setIsOnline(status.isOnline);
        }

        ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);

        return () => {
            ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
        }
    });

    if (isOnline === null) {
        return 'Loading ...';
    }

    return isOnline ? 'Online' : 'Offline';
}

// 上記と同じロジックを必要とするコンポーネントがあったとする
function FriendListItem(props) {
    const [isOnline, setIsOnline] = useState(null);

    useEffect(() => {
        function handleStatusChange(Status) {
            setIsOnline(status.isOnline);
        }

        ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);

        return () => {
            ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
        }
    });

    return (
        <li style={{ color: isOnline ? 'green' : 'black' }}>
            {props.friend.name}
        </li>
    );
}

/**
 * 上記の方法では、同じロジックを複数書く必要がある
 * これまでは、さらに高次のコンポーネントを用意して、propsで処理を子コンポーネントに
 * 渡していたが、カスタムHookを作ることで、親コンポーネントなしで共有できる。
 * 
 * カスタムHookは、useで始まるJavaScriptの関数です。
 * useから始めないと、条件を満たしているかプログラムでチェックできません。
 * カスタムHookは、該当の処理を以下のように切り出すだけでできる。
**/

function useFriendStatus(friendID) {
    const [isOnline, seetIsOnline] = useState(null);

    useEffect(() => {
        function handleStatusChange(status) {
            setIsOnline(status.isOnline);
        }
        ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
        return () => {
            ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
        };
    });

    return isOnline;
}

/**
 * カスタムHookを利用する
 * 既存の、処理を取り除き、カスタムHookを追加するだけ
 * 
 * それぞれのコンポーネントで利用されるカスタムHookは、状態を共有していません。
 * 独立しているため、同じカスタムHookを利用している他のコンポーネントに影響を与えることはありません。
 */

function FriendStatus2(props) {
    const isOnline = useFriendStatus(props.friend.id);

    if (isOnline === null) {
        return 'Loading ... ';
    }

    return isOnline ? 'Online' : 'Offline';
}

function FriendListItem2(props) {
    const isOnline = useFriendStatus(props.friend.id);

    return (
        <li style={{ color: isOnline ? 'green' : 'balck' }}>
            {props.friend.name}
        </li>
    );
}
