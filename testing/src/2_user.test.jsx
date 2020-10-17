
/**
 * データフェッチ部分をモックで対応する
 * バックエンドからデータを取得するようなアプリの場合、
 * そのテストを行うためにはその部分のデータを返すバックエンドの処理が必要になる。
 * フロントだけで完結させるために、モックで対応できるのが好ましい。
 */

import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import User from "./user";

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

// ReferenceError: regeneratorRuntime is not defined
// というエラーが発生するが、これは古いjavascriptには、asyncがないため。
// .babelrcのpreset-envの設定で、バージョンを最新のみで対応
it("renders user data", async () => {
    const fakeUser = {
        name: "hayato07",
        age: "24",
        address: "yamaguchi pref"
    };

    // jest.spyOn(global, "fetch").mockImplementation(() => 
    //     Promise.resolve({
    //         json: () => Promise.resolve(fakeUser)
    //     })
    // );
    // jsdomの場合、fetchが未実装なので、fetch関数を実装する
    // https://jaketrent.com/post/mock-fetch-jest-test/
    // https://medium.com/@rishabhsrao/mocking-and-testing-fetch-with-jest-c4d670e2e167
    global.fetch = jest.fn().mockImplementation(() => 
        Promise.resolve({
            json: () => Promise.resolve(fakeUser)
        })
    );

    await act(async () => {
        render(<User id="123" />, container);
    });

    expect(container.querySelector("summary").textContent).toBe(fakeUser.name);
    expect(container.querySelector("strong").textContent).toBe(fakeUser.age);
    expect(container.textContent).toContain(fakeUser.address);

    global.fetch.mockRestore();
    global.fetch.mockClear();
    delete global.fetch;
});

