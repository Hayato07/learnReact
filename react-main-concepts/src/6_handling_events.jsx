import React from 'react';
import ReactDOM from 'react-dom';

/**
 * ハンドリングイベント
 * Reactエレメントのハンドリングイベント処理は、DOM要素における処理と
 * 似ています。構文が少し異なるので注意が必要です。
 * - Reactではキャメルケースを使います。
 * - JSXを利用すると、文字列ではなく関数をイベントハンドラーに渡します。
 * - return falseで通常の動作を止めることはできない
 */

/**HTML ver
<button onclick="activateLasers()">
    Activate LAsers
</button>
 */

/** React(JSX) ver
<button onClick={activateLasers}>
   Activate Lasers
</button>
*/

/** HTML
<a href="#" onclick="consol.log('the link was clicked.); return false;">
    Click me
</a>
 */

/** Reactで書くと
function ActionLink() {
    function handleClick(e) { // eは合成イベント。Reactがブラウザ間の互換性を取り除いてくれているらしい。
        e.preventDefault();
        console.log('the link was clicked.);
    };

    return (
        <a href="#" onClick={handleClick}>
            Click me
        </a>
    );
}
 */

/**
 * 要素の生成後にaddEventListenerを呼び出す必要がない。
 * ただ、要素のレンダリング部分に、リスナーを指定するだけ。
 */

class Toggle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isToggleOn: true
        };

        // アロー関数でイベントハンドラを実行しない場合には、以下の記述が必要
        // thisの参照先が変わるため
        //  this.handleClick = this.handleClick.bind(this);
    }

    //  イベントハンドラ
    handleClick(name, e) {
        console.log(name);
        console.log(e);
        this.setState(state => ({
            isToggleOn: !state.isToggleOn
        }));
    }

    render() {
        return (
            <div>
                {/* // 以下の方法だとコールバック関数が毎回作成されるという現象が起き、
                    // 下層のコンポーネントに渡されると、仮想コンポーネントが余分に再描画される問題が生じる。 */}
                <button onClick={() => this.handleClick()}>{this.state.isToggleOn ? "ON" : "OFF"}</button>
                
                {/* <button onClick={this.handleClick}>{this.state.isToggleOn ? "ON" : "OFF"}</button> */}
                <button onClick={(e) => this.handleClick("hayato07", e)}>Delete Row</button>
                <button onClick={this.handleClick.bind(this, "hayato07")}>Delete Row</button>
            </div>
        );
    }
}

ReactDOM.render(
    <Toggle />,
    document.getElementById('root')
);
