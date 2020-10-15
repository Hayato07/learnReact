import React from 'react';
import ReactDOM from 'react-dom';

/**
 * https://reactjs.org/docs/thinking-in-react.html
 * Reactで実装する際の思考プロセス
 * 前提: JSON APIとデザインモックがすでにあるとする。
 * 
 * ①UIをコンポーネント階層に分割する(考え方によって、分割後の構造はへんかする)
 *   デザインをHTML構造にする作業と同じではないかと。(再利用性の部分が少しことなる印象)
 *   単一責任の原則に基づいて分割する。
 *   全体を統括するコンポーネント, 入力を受け取るコンポーネント、入力から結果を返すコンポーネント
 *   各カテゴリの見出しを表示するコンポーネント、各製品情報を表示するコンポーネントなど
 * ②静的なバージョンを作成する
 *  状態を使わないこと(どのデータにpropsを、どのデータにstateを利用すべきかの理解は必須)
 * ③UIに使われている最小限（ただし完全な）stateが何かを特定する
 *   stateとして何を持っていれば、このアプリケーションは動作するのか
 *   - 使われているデータを把握する
 *   - 各データについて3つの質問を行いどれがstate管理であるか認識する
 *      1. 親からpropsを介して渡されるものか。そうであればstate管理ではない
 *      2. 時間経過で値は変化するか。しないのであれば、state管理ではない
 *      3. コンポーネントないの他のstateまたは、propsに基づいて計算できるデータか。そうであれば、state管理ではない
 * ④ どのコンポーネントが③で洗い出したstateを管理するべきか特定する  
 * Reactはデータが親から子へと流れていくフローをとっています。
 * ⑤ 状態を更新するための関数を小コンポーネント に渡す
 * 
*/

class ProductCategoryRow extends React.Component {
    render() {
        const category = this.props.category;

        return (
            <tr>
                <th colSpan="2">
                    {category}
                </th>
            </tr>
        );
    }
}

class ProductRow extends React.Component {
    render() {
        const product = this.props.product;
        const name = product.stocked
            ? product.name
            : <span style={{ color: 'red' }}>
                {product.name}
            </span>;

        return (
            <tr>
                <td>{name}</td>
                <td>{product.price}</td>
            </tr>
        );
    }
}

class ProductTable extends React.Component {
    render() {
        // ④でFilterableProductTableで、state管理することに決めたので、
        // propsでfilterTextとinStockOnlyを受け取り処理を加える。
        const filterText = this.props.filterText;
        const inStockOnly = this.props.inStockOnly;

        const rows = [];
        let lastCategory = null;

        this.props.products.forEach((product) => {
            // 追加処理
            if (product.name.indexOf(filterText) === -1) {
                return;
            }
            if (inStockOnly && !product.stocked) {
                return;
            }

            if (product.category !== lastCategory) {
                rows.push(
                    <ProductCategoryRow
                        category={product.category}
                        key={product.category}
                    />
                );
            }

            rows.push(
                <ProductRow
                    product={product}
                    key={product.name}
                />
            );

            lastCategory = product.category;
        });

        return (
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        );
    }
}

class SearchBar extends React.Component {
    handleFilterTextChange(e) {
        this.props.onFilterTextChange(e.target.value);
    }

    handleInStockChange(e) {
        this.props.onInStockChange(e.target.checked);
    }

    render() {
        // 同じくpropsを受け取り、表示(後ほど、更新できるようにpropsを受け取り、onChangeを追加する)
        const filterText = this.props.filterText;
        const inStockOnly = this.props.inStockOnly;

        return (
            <form>
                <input
                    type="text"
                    placeholder="Search..."
                    value={filterText}
                    onChange={(e) => this.handleFilterTextChange(e)}
                />
                <p>
                    <label>
                        <input
                            type="checkbox"
                            checked={inStockOnly}
                            onChange={(e) => this.handleInStockChange(e)}
                        />
                        {'  '}
                    Only show products in stock
                </label>
                </p>
            </form>
        );
    }
}

class FilterableProductTable extends React.Component {
    // state管理を追加
    constructor(props) {
        super(props);
        this.state = {
            filterText: '',
            inStockOnly: false
        }
    }

    handleFilterTextChange(filterText) {
        this.setState({
            filterText: filterText
        });
    }

    handleInStockChange(inStockOnly) {
        this.setState({
            inStockOnly: inStockOnly
        })
    }


    render() {
        return (
            <div>
                <SearchBar
                    filterText={this.state.filterText}
                    inStockOnly={this.state.inStockOnly}
                    onFilterTextChange={(filterText) => this.handleFilterTextChange(filterText)}
                    onInStockChange={(inStockOnly) => this.handleInStockChange(inStockOnly)}
                />
                <ProductTable
                    products={this.props.products}
                    filterText={this.state.filterText}
                    inStockOnly={this.state.inStockOnly}
                />
            </div>
        );
    }
}

const PRODUCTS = [
    { category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football' },
    { category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball' },
    { category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball' },
    { category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch' },
    { category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5' },
    { category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7' }
];

ReactDOM.render(
    <FilterableProductTable
        products={PRODUCTS}
    />,
    document.getElementById('root')
);