/* 
props コンポーネントを利用する時に設定する属性値
コンポーネントを描画するソースを返す関数と考えれば、propsは
引数と考えて良さそう？
*/


class HelloMessage extends React.Component {
    render() {
        return (
            <div>
                Hello {this.props.name}
            </div>
        )
    }
}

ReactDom.render(
    <HelloMessage name="Hayato07" />,
    document.getElementById("root")
);

// 関数Ver
function MyConmponent(props) {
    return (
        <div>
            <p>name: {props.name}</p>
            <p>years: {props.years}</p>
        </div>
    )
}

ReactDom.render(
    <MyConmponent name="hayato07" years="24" />,
    document.getElementById("introduction")
)