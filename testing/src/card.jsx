import React, { useEffect } from "react";

export default function Card(props) {
    useEffect(() => {
        const timeoutID = setTimeout(() => {
            props.onSelect(null);
        }, 5000);
        return () => {
            clearTimeout(timeoutID);
        };
    }, [props.onSelect]);


    // 以前から気になっていたが、テスト用のdata-は本番環境でも設定したままなのだろうか？？（webpackがうまいことしてくれる？）
    return [1,2,3,4].map(choice => (
        <button
            key={choice}
            data-testid={choice}
            onClick={() => props.onSelect(choice)}
        >
            {choice}
        </button>
    ));
}