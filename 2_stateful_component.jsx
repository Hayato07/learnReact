/* 
this.propsが入力データなら、
this.stateは、内部データ、
初期化時などにデータを作成し、状態変化に応じてデータも変化させることができる。
コンポーネントのstateが変化すると、renderが再実行される
*/

class Timer extends React.Component {
    constructor(props) {
        // JavaScriptはコンストラクターで親のコンストラクターを呼ぶまでthisが使えない仕様
        super(props);
        this.state = { seconds: 0 };
    }

    tick() {
        this.setState(state => ({
            seconds: state.seconds + 1
        }));
    }

    componentDidMount() {
        this.interval = setInterval(() => this.componentWillReceiveProps, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }
    
    render() {
        return (
            <div>
                seconds: {this.state.seconds}
            </div>
        )
    }
}

ReactDOM.render(
    <Timer />,
    document.getElementById("root")
)