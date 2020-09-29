/**
 * what is react??
 * react is declarative, efficient, and flexible javascript library
 * for building UI.
 * 複雑なUIを小さく独立したコンポーネントと呼ぶ単位を組み合わせて作る
 * react has a few different kinds of components.
 * first we use React.Component subclasses.
 */

class ShoppingList extends React.Component {
    render() {
        return (
            <div className="shopping-list">
                <h1>Shopping List for {this.props.name}</h1>
                <ul>
                    <li>Instagram</li>
                    <li>WhatsApp</li>
                    <li>Oculus</li>
                </ul>
            </div>
        );
    }
}

<ShoppingList name="Tom" />

/**
 * it looks like XML tags. we use component to tell
 * React what we want to see on the screen.
 * When our data changes, React will efficiently update and re-render our components.
 * 
 * ShoppingList is a React component class, 
 * or React component type. A component takes in parameters,
 * called props (short for “properties”), and returns a hierarchy of views to display via the render method.
 * The render method returns a description of what you want to see on the screen
 * 
 * render returns a React element, which is a lightweight description of what to render. Most React developers use a special syntax called “JSX” which makes these structures easier to write. 
 * JSX makes us read react element easier.
 * JavaScriptでの表現をJSXのタグないなら使えます。
 */


 /**
  * propsを使って親コンポーネント から情報を渡す
  * stateを使って、状態を管理する。
  * To “remember” things, components use state.
  */

  /**
   * Squareに状態を持たせて、Boardに都度情報を渡すのは、ナンセンス。
   * コードが複雑になり、バグの温床になりやすい。リファクタリングも大変。
   * ゲームの状態管理は、Boardで一括管理がわかりやすい。
   * Boardで管理して、propsでSquareに表示情報を渡す。
   * 
   * 制御されたコンポーネント と　制御するコンポーネント
   * 状態管理するコンポーネント(制御するコンポーネント)とそのコンポーネント から情報を受け取り
   * イベントを伝えるだけのコンポーネント(制御されたコンポーネント) そして、コンポーネント内で完結するコンポーネント がある。
   * 
   */

   /**
    * クラスコンポーネント と 関数コンポーネント 
    * Reactではコンポーネントの作成方法として、関数コンポーネントが
    * よりシンプルな方法です。
    * 関数コンポーネント = (stateを持たず、renderメソッドだけを持つもの)
    * propsを引数として持つ
    */

function Sample(props) {
    return (
        <button className="testButton" onClick={props.changeText}>
            {props.text}
        </button>
    )
}