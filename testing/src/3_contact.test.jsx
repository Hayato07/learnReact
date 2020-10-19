
/**
 * モック
 * 一部のモジュールは、テスト環境ではうまく機能しなかったり、
 * テストに必要ない時があります。
 * そういうモジュールには、ダミーのモジュールをモックアウトすることで、
 * より簡単にテストを書くことができます。
 */

import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Contact from "./contact";
// 実際にこのコンポーネントを利用しようとすると、APIキーが必要である。
// モックを利用すれば、このコンポーネントが返す値を仮決めすることができる。
import MockedMap from "./map";

jest.mock("./map", () => {
    return function DummyMap(props) {
        return (
            <div data-testid="map">
                {props.center.lat} : {props.center.long}
            </div>
        );
    };
});


let container = null;
beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

it("should render contact information", () => {
    const center = {lat:0, long:0};
    act(() => {
        render(
            <Contact
                name="hayato07"
                email="test@example.com"
                site="http://test.com"
                center={center}
            />,
            container
        );
    });


    expect(
        container.querySelector('[data-testid="site"]').getAttribute('href')
    ).toEqual("http://test.com");

    expect(container.querySelector('[data-testid="map"]').textContent).toEqual("0 : 0");
    
});

