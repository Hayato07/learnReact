import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// class Square extends React.Component {
//   render() {
//     return (
//       <button className="square"
//         onClick={() => this.props.onClick()}>
//         {this.props.value}
//       </button>
//     );
//   }
// }

function Square(props) {
  return (
    <button
      className="square"
      onClick={props.onClick}>
      {props.value}
    </button>
  )
}

class Board extends React.Component {
  // Gameクラスにあげる（履歴を管理するため）
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     squares: Array(9).fill(null),
  //     xIsNext: true,
  //   }
  // }

  // handleClick(i) {
  //   /**
  //    * コピーを作成する理由(sliceはシャローコピー)
  //    * 不変性の重要性
  //    * データの変更方法には大きく２種類ある
  //    *  - ①元のデータを直接変更するもの
  //    *  - ②元データのコピーを作成して、変更するもの
  //    * 最終的な結果は同じなのになぜ②がいいのか
  //    * ②の利点
  //    *  - 以前のデータに戻すのが容易(以前のデータを変更しているわけではないので、そのまま履歴として利用できる)
  //    *  - データの変更点が容易に検出できる以前のデータと変更後のデータを比較できるので、変更箇所が見つけられる(再レンダリングの点で優れている?)
  //    *  - Reactが再レンダリングのタイミングをキャッチできる
  //   */
  //   const squares = this.state.squares.slice();
  //   if (calculateWinner(squares) || squares[i]) {
  //     return;
  //   }
  //   squares[i] = this.state.xIsNext ? 'x' : '○';
  //   this.setState({
  //     squares: squares,
  //     xIsNext: !this.state.xIsNext,
  //   });
  // }
  renderSquare(i) {
    return <Square
      // value={this.state.squares[i]}
      // onClick={() => this.handleClick(i)} />
        key={i}
      value={this.props.squares[i]}
      onClick={() => this.props.onClick(i)} />
    // pass the property from a parent Board component to Square component.
    // 親コンポーネント から子コンポーネント への情報の流れがpropsを渡すという行為によって表現される。
  }

  render() {
    // const winner = calculateWinner(this.state.squares);
    // let status;
    // if (winner) {
    //   status = 'Winner: ' + winner;
    // } else {
    //   status = 'Next player: ' + (this.state.xIsNext ? 'x' : '○');
    // }

    let squares = [];

    for (let i = 0; i < 3; i++) {
      let row = [];

      for (let j = 0; j < 3; j++) {
        const num = i * 3 + j;
        row.push(this.renderSquare(num));
      }
      squares.push(<div key={i} className="board-row">{row}</div>);
    };

    return (
      <div>
        {squares}
        {/* <div className="status">{status}</div> */}
        {/* <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div> */}
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      xIsNext: true,
      stepNumber: 0,
    }
  }
  handleClick(i) {
    // 戻る動作を行った場合、それ以降の履歴を削除
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? 'x' : '○';
    this.setState({
      history: history.concat([{ squares: squares, }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    console.log(step);
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  toggleOrder() {
  	this.setState({
  		ascendingOrder: !this.state.ascendingOrder
  	});
  }

  render() {

    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';

      let position = null;
      if (move) {
        const before = history[move - 1].squares;
        const after = step.squares;
        after.forEach((value, index) => {
          if (before[index] !== value) {
            position = "(" + Math.floor(index / 3 + 1) + " ," + (index % 3 + 1) + ")";
          }
        })
      }

      const hasBold = this.state.stepNumber === move ? "bold" : "";
      return (
        // Reactが再レンダリングしやすいように一意のキーをわたす
        // 配列インデックスを渡すのは推奨されない。
        // 並び変えや、挿入、削除時に問題が発生するため。
        // グローバルに一意である必要はなく、コンポーネント内で一意であればよい
        <li key={move}>
          <button className={hasBold} onClick={() => this.jumpTo(move)}>{desc}</button>
          {position}
        </li>
      )
    })


    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    if (!this.state.ascendingOrder) {
      moves.sort(function(a,b) {
         return b.key - a.key;
       });
    } 

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
          <button onClick={() => this.toggleOrder()}>Change order</button>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]; // 分割代入ってやつか
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);