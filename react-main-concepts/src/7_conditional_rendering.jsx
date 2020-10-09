import React from 'react';
import ReactDOM from 'react-dom';

/**
 * 条件付きレンダリング
 * アプリの状態に応じて、一部のコンポーネントをレンダリングすることができる。
 * JSの条件分岐と同じ。
 */

function UserGreeting(props) {
    return <h1>Welcome back!!</h1>;
}

function GuestGreeting(props) {
    return <h1>Please sign up.</h1>;
}

function Greeting(props) {
    const isLoggedIn = props.isLoggedIn;

    if (isLoggedIn) {
        return <UserGreeting />;
    }

    return <GuestGreeting />;
}


ReactDOM.render(
    <Greeting isLoggedIn={true} />,
    document.getElementById('root')
);

/**
 * 要素を変数として持つことができる
 */

function LoginButton(props) {
    return (
        <button onClick={props.onClick}>
            Login
        </button>
    );
}

function LogoutButton(props) {
    return (
        <button onClick={props.onClick}>
            Logout
        </button>
    );
}

class LoginControl extends React.Component {
    constructor(props) {
        super(props);
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);

        this.state = {
            isLoggedIn: false
        };
    }

    handleLoginClick() {
        this.setState({
            isLoggedIn: true
        });
    }

    handleLogoutClick() {
        this.setState({
            isLoggedIn: false
        });
    }

    render() {
        const isLoggedIn = this.state.isLoggedIn;
        let button;

        // ここは三項演算子を使ってもかける
        if (isLoggedIn) {
            button = <LogoutButton onClick={this.handleLogoutClick} />
        } else {
            button = <LoginButton onClick={this.handleLoginClick} />
        }

        return (
            <div>
                <Greeting isLoggedIn={isLoggedIn} />
                {button}
            </div>
        )
    }
}

ReactDOM.render(
    <LoginControl />,
    document.getElementById('root')
);


/**
 * 条件をインラインで書く方法
 * 条件がごちゃごちゃしてきたら、コンポーネントを分割するチャンス！
 */

function MailBox(props) {
    const isLoggedIn = true;
    const unreadMessages = props.unreadMessages;
    const count = 0;
    return (
        <div>
            <h1>Hello!</h1>
            {/* 以下のように書くと、最初の条件が正の時のみ、メッセージが表示される。 */}
            {unreadMessages.length > 0 &&
                <h2>
                    You have {unreadMessages.length} unread messages.
                </h2>
            }
            {/* 下の場合、二番目の条件式は実行されないが、最初のものは実行されるので0が表示される
                 なので、不等号など条件文になるよう配慮が必要。
              */}
            { count && <h1>Messages: {count}</h1>}
            {/* 三項演算子はよく使う印象 */}
            <h2>
                the user is <b>{isLoggedIn ? 'currently' : 'not'}</b>
            </h2>
        </div>
    );
}

const messages = ['Re: React', 'Re:Re: React'];
ReactDOM.render(
    <MailBox unreadMessages={messages} />,
    document.getElementById('root')
);


/**
 * コンポーネントのレンダリング自体を避ける方法
 * 他のコンポーネントからレンダリングされるときに、コンポーネントそれ自体を非表示にしたいことが
 * あるかもしれない。その場合には、nullをリターンすること。
 * 
 * nullを返すと、ライフサイクルへ影響を与えず非表示にできる。
 */

function WarningBanner(props) {
    if (!props.warn) {
        return null;
    }

    return (
        <div className="warning">
            Warning!!
            <br />{props.message}
        </div>
    );
}

class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            showWarning: true,
            message: ""
        };
    }

    handleToggleClick() {
        this.setState({
            showWarning: !this.state.showWarning
        });
    }

    inputText(e) {
        this.setState({
            message: e.target.value
        })
    }

    render() {
        return (
            <div>
                <WarningBanner 
                    warn={this.state.showWarning} 
                    message={this.state.message} 
                />
                <button onClick={() => this.handleToggleClick()}>
                    {this.state.showWarning ? 'Hide' : 'show'}
                </button>
                <input type="text" onChange={(e) => this.inputText(e)}/>
            </div>
        )
    }
}

ReactDOM.render(
    <Page />,
    document.getElementById('root')
);