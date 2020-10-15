import React from 'react';
import ReactDOM from 'react-dom';

/**
 * コンポジションと継承
 * Reactには、強力なコンポジションモデルがあります。
 * そのため、コンポーネント間でコードを再利用する場合には、
 * 継承ではなく、コンポジションを利用することが勧められています。
 * 継承の問題点と、それをコンポジション解決する方法を紹介します。
 * 
 * props.childrenは、特殊なpropertyです。
 * 以下のように、childrenに該当する部分が表示されます。
 */


function FancyBorder(props) {
    return (
        <div className={'FancyBorder FancyBorder-' + props.color}>
            {props.children}
        </div>
    );
}

function WelcomeDialog() {
    return (
        <FancyBorder color="blue">
            <h1 className="Dialog-title">
                Welcome
            </h1>
            <p className="Dialog-messages">
                Thank you for visiting our spacecraft.
            </p>
        </FancyBorder>
    );
}

ReactDOM.render(
    <WelcomeDialog />,
    document.getElementById('root')
);

// childrenを使わない場合は特定のpropsを利用して以下のようにかけます。
function SplitPane(props) {
    return (
        <div className="SplitPane">
            <div className="SplitPane-left">
                {props.left}
            </div>
            <div className="SplitPane-right">
                {props.right}
            </div>
        </div>
    );
}

function App() {
    return (
        // コンポーネントはオブジェクトなので、propsとして渡すことができる
        <SplitPane
            left={<Contacts />}
            right={<Chat />}
        />
    );
}

/** 
 * あるコンポーネントが他のコンポーネントの特殊なケースである場合
 * 最初のWelcomeDialogがDialogコンポーネントの特殊ケースである場合、
 * コンポジションを用いて以下のように書くこともできる。
 */

function Dialog(props) {
    return (
        <FancyBorder color="blue">
            <h1 className="Dialog-title">
                {props.title}
            </h1>
            <p className="Dialog-message">
                {props.message}
            </p>
            {props.children}
        </FancyBorder>
    );
}

function WelcomeDialog2() {
    return (
        <Dialog
            title="Welcome"
            message="thank you for visiting our spacecraft!"
        >
            <p>TEST</p>
        </Dialog>
    );
}

// コンポジションは、クラスでも同じように使える
class SignUpDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = { login: '' };
    }

    handleChange(e) {
        this.setState({ login: e.target.value });
    }

    handleSignUp() {
        alert(`Welcome aboard, ${this.state.login}!`);
    }

    render() {
        return (
            <Dialog
                title="Mars Exploration Program"
                message="How should we refer to you?"
            >
                <input
                    value={this.state.login}
                    onChange={(e) => this.handleChange(e)}
                />
                <button onClick={() => this.handleSignUp()}>
                    Sign me up!
                </button>
            </Dialog>
        )
    }
}

ReactDOM.render(
    <div>
        <WelcomeDialog2 />
        <hr/>
        <SignUpDialog />
    </div>,
    document.getElementById('root')
);

// Facebook社の経験上、継承がコンポジションより優れる場合はなかったらしい。