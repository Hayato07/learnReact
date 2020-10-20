/**
 * スナップショットを用いたテスト
 * 便利そう！
 */

import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
// パッケージ追加 npm install --save pretty
// npm install --save-dev prettier
import pretty from "pretty";

import Hello from "./hello";

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("should render a greeting", () => {
  act(() => {
    render(<Hello />, container);
  });

  expect(pretty(container.innerHTML)).toMatchInlineSnapshot(
    `"<span>Hey stranger</span>"` // テストを実行すると自動でこの部分gな追加される
  );

  act(() => {
    render(<Hello name="hayato07" />, container);
  });

  expect(pretty(container.innerHTML)).toMatchInlineSnapshot(
    `"<h1>Hello hayato07!</h1>"` // テストを実行すると自動でこの部分gな追加される
  );

  act(() => {
    render(<Hello name="burugari" />, container);
  });

  expect(pretty(container.innerHTML)).toMatchInlineSnapshot(
    `"<h1>Hello burugari!</h1>"` // テストを実行すると自動でこの部分gな追加される
  );
});
