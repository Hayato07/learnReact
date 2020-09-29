/* 
propsとstateを使えば、簡単なアプリが作れます。
*/

class TodoApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            item: [], // 追加されたtodoを管理
            text: "", // 現在入力中のtextを管理
        };

        /*
            bindは、子コンポーネントが親コンポーネントのプロパティやメソッドにアクセス
            するためのものっぽい？
        */
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        // 削除処理を追加
        // 削除処理は、親のコンポーネントに持たせてpropsで渡してみた
        // listにidを持たせて、一致するidの物があれば、削除を行うようにした。
        this.handleDelete = this.handleDelete.bind(this);
    }

    render() {
        return (
            <div>
                <h3>TODO APP</h3>
                <TodoList items={this.state.items} deletefunc={this.handleDelete} />
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="new-todo">
                        What needs to be done?
                    </label>
                    <input
                        id="new-todo"
                        onChange={this.handleChange}
                        value={this.state.text}
                    />
                    <button>
                        Add #{this.state.item.length + 1}
                    </button>
                </form>
            </div>
        );
    }

    handleChange(e) {
        this.setState({ text: e.target.value });
    }

    handleDelete(e) {
        if(!e.target.id) {
        return;
        }
        
        var items = this.state.items.filter(item => item.id != e.target.id);
        
        this.setState(state => ({
            items: items,
            text:  state.text
        }));
    }

    handleSubmit(e) {
        e.preventDefault();
        if(this.state.text.length === 0) {
            return;
        }

        const newItem = {
            text: this.state.text,
            id: Date.now()
        };

        this.setState(state => ({
            items: state.items.concat(mewItem),
            text: '',
        }));
    }
}

class TodoList extends React.Component {
    rendeer() {
        return (
            <ul>
                {this.props.items.map(item => (
                    <li 
                        class={item.id}
                        key={item.id}
                        onClick={this.props.Deletefunc}
                    >
                        {item.text}
                    </li>
                ))}
            </ul>
        );
    }
}

ReactDom.render(
    <TodoApp />,
    document.getElementById("root")
);