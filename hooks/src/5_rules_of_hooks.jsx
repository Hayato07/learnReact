import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

/**
 * Hooksのルール
 * HooksはJavaScriptの関数であるが、２つのルールがそれとは別に課される
 * - Hooksは、トップレベルでのみ呼び出すこと
 * ループや、条件分岐、ネストされた関数から呼び出してはいけない。
 * Hooksは、データを管理するために呼び出された順番をもとにデータと呼び出し元を紐づけています。
 * なので、その順番が変わりうる処理を行ってしまうと、データの管理が破綻します。
 * 順番が保証されていれば、useStateやuseEffectを何度用いても問題ありません。
 * - Reactの関数からのみ呼び出すこと
 * Reactの関数コンポーネントと、カスタムHookからのみ呼び出せます。
 * 
 * 上記の２条件をチェックするためのLintプラグインもあります。
 * npm install eslint-plugin-react-hooks --save-dev
 * このプラグインは、CRAに基本でついています。
 */

function Form() {
    const [name, setName] = useState('hayato07');

    // これはだめ　以下のエラーがでる
    // error  React Hook "useEffect" is called conditionally. React Hooks must be called in the exact same order in every component render  react-hooks/rules-of-hooks
    // if(name !== '') {
    //     useEffect(function persistForm() {
    //         localStorage.setItem('formData', name);
    //     });
    // }
    // ある場合にのみ値を更新する場合は、useEffect内部で条件分岐を設ける
    useEffect(function persistForm() {
        if(name !== '') {
            localStorage.setItem('formData', name);
        }
    });

    const [surname, setSurname] = useState('Haya');

    useEffect(() => {
        document.title = name + ' ' + surname;
    });

    return (
        <div>
            hello {name} {surname}
        </div>
    );
}