import React from 'react';
import ReactDOM from 'react-dom';

/**
 * フォーム
 * HTMLフォーム要素は、Reactの他のDOM要素と少し異なる動作をします。
 * フォーム要素が内部状態を保持するためです。
 */

// 通常のhtmlフォーム これもReact上で動作する
function NormalForm(props) {
    return (
        <form>
            <label>
                Name: <input type="text" name="name" />
            </label>
            <input type="submit" value="Submit" />
        </form>
    )
}

ReactDOM.render(
    <NormalForm />,
    document.getElementById('root')
);

/**
 * 上記でも動くが、送信時のハンドラーやユーザーが入力したデータへアクセスできる関数がある方がよくある
 * このために「制御されたコンポーネント」というテクニックを利用されることがよくあります。
 * 
 * inputやtextarea, selectなどは独自にstateを持っており、それをユーザー入力に応じて更新します。
 * Reactではstateはコンポーネントのstateで管理し、setStateでのみ更新します。
 * Reactの状態を信頼できる唯一の情報源とすることで、上記の二点を合わせます。
 * 以下のようにすることで、inputやtextareaの変更をコンポーネントのstateで管理できる。
 */

class NameForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: '',
            textAreaValue: 'test'
        };
    }

    handleChange(target, event) {
        // 少し変な気持ちになるが、[]でオブジェクトのキーに変数を入れられる
        this.setState({ [target]: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.state.inputValue.length === 0) {
            alert('you need enter your name.');
            return;
        }
        alert('A name was submitted: ' + this.state.inputValue);
    }

    render() {
        return (
            <form onSubmit={(e) => this.handleSubmit(e)}>
                <label>
                    Name: <input type="text" onChange={(e) => this.handleChange("inputValue", e)} value={this.state.inputValue} />
                </label>
                {/* textareaの場合も属性値としてvalueを設定する */}
                <textarea onChange={(e) => this.handleChange("textAreaValue", e)} name="content" value={this.state.textAreaValue}></textarea>
                <input type="submit" value="Submit" />
            </form>
        )
    }
}

ReactDOM.render(
    <NameForm />,
    document.getElementById('root')
);

/**
 * selectタグの場合
 * Reactではselectedの代わりに、
 * selectタグにvalueを利用する。
 */

class FlavorForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 'coconut'
        }
    };

    handleChange(event) {
        this.setState({
            value: event.target.value
        });
    }

    handleSubmit(event) {
        alert('your favorite flavor is: ' + this.state.value);
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={(e) => this.handleSubmit(e)}>
                <label>
                    pick your favorite flavor:
                    
                    <select value={this.state.value} onChange={(e) => this.handleChange(e)}>
                        <option value="grapefruit">Grapefruit</option>
                        <option value="lime">Lime</option>
                        <option value="coconut">Coconut</option>        
                        <option value="mango">Mango</option>
                    </select>

                    {/* 複数選択にも対応している。stateの記述は変更がいる。 */}
                    <select value={['grapefruit', 'lime']} multiple={true} onChange={(e) => this.handleChange(e)}>
                        <option value="grapefruit">Grapefruit</option>
                        <option value="lime">Lime</option>
                        <option value="coconut">Coconut</option>        
                        <option value="mango">Mango</option>
                    </select>

                    {/* type=fileは通常の記述と同じ。読み取り専用なので制御されていないコンポーネントである。 */}
                    <input type="file"/>
                </label>

                <input type="submit" value="Submit" />
            </form>
        );
    }
}

ReactDOM.render(
    <FlavorForm />,
    document.getElementById('root')
);

/**
 * 複数inputをどう扱うか
 * name属性をkeyとしてstate管理する！！
*/

class Reservation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isGoing: true,
            numberOfGuests: 2
        };
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    onSubmit = (event) => {
        event.preventDefault();
        alert("hello");
    }

    render() {
        return (
            <form onSubmit={(event) => this.onSubmit(event)}>
                <label>
                    is going:
                    <input 
                        name="isGoing"
                        type="checkbox"
                        checked={this.state.isGoing}
                        onChange={(e) => this.handleInputChange(e)}
                    />
                </label>
                <br/>
                <label>
                    Number of guests:
                    <input 
                        name="numberOfGuests"
                        type="number"
                        value={this.state.numberOfGuests}
                        onChange={(e) => this.handleInputChange(e)}
                    />
                </label>
                <button type="submit" name="Submit">submit</button>
            </form>
        );
    }
}

ReactDOM.render(
    <Reservation />,
    document.getElementById('root')
);

/**
 * valueがnullまたは、未定義の場合には、編集できます。通常は、''などを指定すべきです。
 */
// こちらは、入力が許されず値が初期値に固定される
// ReactDOM.render(<input value="hi" />, document.getElementById('root'));

// setTimeout(function() {
//   ReactDOM.render(<input value={null} />, document.getElementById('root'));
// }, 1000);

/**
 * 制御されたコンポーネントはいちいちハンドラーを作成しないといけないので、
 * 面倒になりがちです。
 * そういう場合には、制御されていないコンポーネントについて知っておく必要があります。
 * https://reactjs.org/docs/uncontrolled-components.html
 * 
 * フォームを簡単に作るには、以下のライブラリを利用することもできます。
 * 制御されたコンポーネントの概念に基づいたライブラリなので、その辺りの知識はあった方がいいです。
 * https://formik.org/
 */