import React from 'react';
import ReactDOM from 'react-dom';

/**
 * stateをどこで管理するか。
 * 複数のコンポーネントが同じ状態を管理することはよくある。
 * その場合、それぞれで状態管理をするのは面倒なので、共通の親コンポーネントを
 * 利用するのが一般的です。
 * 
 * 以下では、沸騰する温度について教えてくれるプログラムを作成しています。
 * ここでは、二つの入力欄がありますが、それぞれ独立して存在しています。
 * 今回は、独立してほしいわけではなく、同期していて欲しいとします。
 */

function BoilingVerdict(props) {
    return (props.celsius >= 100)
        ? <p>The water would boil.</p>
        : <p>The water would not boil.</p>;
}

const scaleNames = {
    c: 'Celsius',
    f: 'Fahrenheit'
};

class TemperatureInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            temperature: ''
        };
    }

    handleChange = (e) => {
        this.setState({
            temperature: e.target.value
        });
    }

    render() {
        const temperature = this.state.temperature;
        const scale = this.props.scale;

        return (
            <fieldset>
                <legend>Enter temperature in {scaleNames[scale]}: </legend>
                <input
                    type="number"
                    value={temperature}
                    onChange={this.handleChange}
                />
                <BoilingVerdict celsius={parseFloat(temperature)} />
            </fieldset>
        )
    }
}

class Calculator extends React.Component {
    render() {
        return (
            <div>
                <TemperatureInput scale="c" />
                <TemperatureInput scale="f" />
            </div>
        );
    }
}

ReactDOM.render(
    <Calculator />,
    document.getElementById('root')
);



/**
 * 上記のコードを変更して、入力値が同期されるようにしてみます。
 */

// まずは、二つの単位を変換する関数を作る
function toCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
    return (celsius * 9 / 5) + 32;
}

// 二つの関数を実行するための関数
function tryConvert(temperature, convert) {
    const input = parseFloat(temperature);
    if (Number.isNaN(input)) {
        return '';
    }

    const output = convert(input);
    const rounded = Math.round(output * 1000) / 1000;
    return rounded.toString();
}

/** 個別に管理されているstateを一つ上のコンポーネントで管理する
 * 手順としては、
 * TemperatureInputコンポーネント
 * ①state管理していた物をpropsで上のコンポーネントから渡す
 * ②stateを更新するための関数も、propsで外部から受け取るようにする。
 * 
 * Calculatorコンポーネント
 * ①新規に管理するstateを追加する(tepmerature)
 * ②更新するための関数を追加
 * ③①、②を子コンポーネントに渡す
*/

class TemperatureInput2 extends React.Component {
    constructor(props) {
        super(props);
    }

    handleChange = (e) => {
        this.props.onTemperatureChange(e.target.value);
    }

    render() {
        const temperature = this.props.temperature;
        const scale = this.props.scale;

        return (
            <fieldset>
                <legend>Enter temperature in {scaleNames[scale]}: </legend>
                <input
                    type="number"
                    value={temperature}
                    onChange={this.handleChange}
                />
                {/* 沸騰しているかどうかの表示も親のコンポーネントで表示 */}
                {/* <BoilingVerdict celsius={parseFloat(temperature)} /> */}
            </fieldset>
        )
    }
}

class Calculator2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            temperature :'',
            scale: 'C'
        };
    }

    handleCelsiusChange(temperature) {
        this.setState({
            temperature,
            scale: 'c'
        });
    }

    handleFahrenheitChange(temperature) {
        this.setState({
            temperature,
            scale: 'f'
        });
    }


    render() {
        const scale = this.state.scale;
        const temperature = this.state.temperature;
        const celsius = (scale === 'f') ? tryConvert(temperature, toCelsius)
            : temperature;
        const fahrenheit = (scale === 'c') ? tryConvert(temperature, toFahrenheit)
            : temperature;

        return (
            <div>
                <TemperatureInput2 
                    scale="c"
                    temperature={celsius}
                    onTemperatureChange={(temp) => this.handleCelsiusChange(temp)}  />
                <TemperatureInput2 
                    scale="f" 
                    temperature={fahrenheit}
                    onTemperatureChange={(temp) => this.handleFahrenheitChange(temp)}  />
                <BoilingVerdict celsius={parseFloat(celsius)} />
            </div>
        );
    }
}

ReactDOM.render(
    <Calculator2 />,
    document.getElementById('root')
);