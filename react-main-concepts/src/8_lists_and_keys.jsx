import React from 'react';
import ReactDOM from 'react-dom';

/**
 * ListsとKeys
 */

// JavaScriptでの配列操作
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map((number) => number * 2);
console.log(doubled);

// 複数のコンポーネントをレンダリングする
// const listItems = numbers.map((number) =>
//     <li>{number * 2}</li>
// );

// ReactDOM.render(
//     <ul>{listItems}</ul>,
//     document.getElementById('root')
// );

// リストを外部から渡す
// function NumberList(props) {
//     const numbers = props.numbers;
//     const listItems = numbers.map((number) =>
//         <li>{number}</li>
//     );
//     return (
//         <div>
//             <p>NumberList!!</p>
//             <ul>{listItems}</ul>
//         </div>
//     );
// }

// ReactDOM.render(
//     <NumberList numbers={numbers} />,
//     document.getElementById('root')
// );

/**
 * これまでのリストを表示するとコンソールに以下のwarningが表示される。
 * react.development.js:315 Warning: Each child in a list should have a unique "key" prop.
 * 大雑把な訳「リストの各要素に一意のkeyが必要ですよ」
 * reactではリストを構成する際に、keyが必要です。(なくても動きはします)
 */

// keyを追加する
function NumberList2(props) {
    const numbers = props.numbers;
    const listItems = numbers.map((number) =>
        <li key={number.toString()}>
            {number}
        </li>
    );
    return (
        <div>
            <p>NumberList2!!</p>
            <ul>{listItems}</ul>
        </div>
    );
}
ReactDOM.render(
    <NumberList2 numbers={numbers} />,
    document.getElementById('root')
);

/**
 * keyはなぜ必要なのか
 * Reactではkeyを利用して、リストの各要素の変化、追加、削除を識別しています。
 * 要素を識別するために、キーを付与しているわけです。
 * 基本的には、データについているIDをキーとして用います
 */
const todos = [
    {
        id: 1,
        text: "React"
    }
]
const todoItems = todos.map((todo) =>
    <li key={todo.id}>
        {todo.text}
    </li>
);

/**
 * データに一意に見分けられるものがない場合のみ、配列のインデックスを利用する。
 * ただし、順序が変わるようなものでは推奨されない。
 * パフォーマンスに悪影響があり、コンポーネントの状態にも問題が生じる可能性がある。
 * keyを明示しない場合には、Reactがインデックスキーをデフォルトで利用する。
 */
const todoItems2 = todos.map((todo, index) =>
    <li key={index}>
        {todo.text}
    </li>
);


// keysは、配列に必要なのであって、li要素に必要なわけではない。
function ListItem3(props) {
    const value = props.value;
    return (
        // ここでkeyを付与する必要はない
        //   <li key={value.toString()}>{value}</li>
        <li>{props.value}</li>
    );
}

function NumberList3(props) {
    const numbers = props.numbers;
    // mapを使うところにはkeyがいると考えてもよい
    const listItems = numbers.map((number) =>
        // 配列の要素なので、ここにkeyが必要になる
        // <ListItem3 value={number} />
        <ListItem3
            value={number}
            key={number.toString()}
            // keyはコンポーネントに渡されないので、
            // 渡したい場合には、別の名前を用意して渡す。
            id={number.toString()}
        />
    );
    return (
        <ul>
            {listItems}
        </ul>
    );
}

ReactDOM.render(
    <NumberList3 numbers={numbers} />,
    document.getElementById('root')
);

/**
 * keyは属する配列の中で一意であればよい
 * グローバルにユニークであることは求められない
 * 異なる配列であれば、同じキーを用いて良い
 * 参照: 
 * https://reactjs.org/docs/reconciliation.html#recursing-on-children
 * https://medium.com/@robinpokorny/index-as-a-key-is-an-anti-pattern-e0349aece318
 * Reactはkeyによって、状態を把握しているので、keyにindexを利用していると、
 * 順番が変わってもReactは気がつけない。(indexは順番が変わった後に上から振られるため)
 */
function Blog(props) {
    const header = (
        <ul>
            {props.posts.map((post) =>
                <li key={post.id}>
                    {post.title}
                </li>
            )}
        </ul>
    );

    const content = props.posts.map((post) =>
        <div key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
        </div>
    );

    return (
        <div>
            {header}
            <hr />
            {content}
        </div>
    );
}

const posts = [
    { id: 1, title: "hello world", content: "welcome to learning React" },
    { id: 2, title: "installation", content: "you can install react from npm" }
];

ReactDOM.render(
    <Blog posts={posts} />,
    document.getElementById('root')
);

// JSXではmapを埋め込むことも可能
function NumberList4(props) {
    const numbers = props.numbers;

    return (
        <div>
            <h1>NumberList4!!</h1>
            <ul>
                {numbers.map((number) =>
                    <ListItem3 key={number.toString()}
                        value={number} />
                )}
            </ul>
        </div>
    );
}

ReactDOM.render(
    <NumberList4 numbers={numbers} />,
    document.getElementById('root')
);