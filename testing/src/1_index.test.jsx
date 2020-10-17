/**
 * @jest-environment jsdom
 */

/**
 * テストの実行方法について
 * - コンポーネントツリーをテスト環境でレンダリングし、出力をassertする
 * - 完全なアプリをブラウザ環境でじっこうする(エンドツーエンドと呼ばれるテスト。E2E)
 *
 * 以下は、前者を行う方法についてのもの
 */

/**
 * テストツールに関する考慮すべきトレードオフの関係
 * 何を重要視するかによって、ツールの選択やテスト対象は大きく異なる可能性があります。
 * - 速度と環境
 *     素早いフィードバックをくれることを優先するか、本番環境をできる限り再現することを優先するか
 *     この二つの関係は、片方をとるともう片方のクオリティを落とす必要がある場合が多い
 * - モックの量
 *     コンポーネントでは、単体テストと結合テストの協会が曖昧になることがあります。
 *     例えば、フォームコンポーネントであれば、送信ボタンはフォームコンポーネントでテストを行うべきでしょうか。
 *     あるいは、ボタンコンポーネントでテストを行うべきでしょうか。
 */

/**
 * おすすめのテストツール
 * - Jest
 *  jsdom経由でDOMにアクセスできるJavaScriptのテストランナーです。
 *  jsdomはブラウザに似た動作を行うだけですが、Reactのコンポーネント をテストするのであれば
 *  十分なことが多いです。
 *  モジュールのモックやタイマーなどの機能に加え、優れた反復速度を提供してくれます。
 * 
 * - React Testing Library
 *  実装の詳細に依存せずにReactコンポーネントをテストできます。
 *  これにより、リファクタリングが簡単になり、アクセシビリティのベストプラクティス
 *  に近づけやすくなります。
 */

 /**
  * Jestを利用してみる
  * beforeEachで初期設定、afterEachでクリーンアップする
  * テストの実行が成功しようが失敗しようが、最後には必ずクリーンアップの必要がある。
  * でないと、他のテストに影響を及ぼす可能性があるため。
  * 
  * テスト実行は以下(package.jsonにalias作成済み)
  * jest --env=jsdom --passWithNoTests
  * jsdomを利用しないと、documentが何かわからないというエラーが発生する
  * test対象のファイルにtestという名前をつけておくと、jestが見つけ出して実行してくれる様子。
  * 
  * あるいはファイル上記に、 
  * @jest-environment jsdom
  * を付与しておくこと
  */


import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Hello from "./hello";

let container = null;
beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
});

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

/** 
 * Reactの公式のコードでは、test()ではなく、if()となっていたが、test()
 * で動作するようになった。if()でも動作するものなのか。。。
 * 自己解決,if()ではなく、it()であった。it()は、test()と同様の処理の様子
 */
it("renders with or without a name", () => {
    act(() => {
        render(<Hello />, container);
    });
    expect(container.textContent).toBe("Hey stranger");

    act(() => {
        render(<Hello name="hayato07" />, container);
    });
    expect(container.textContent).toBe("Hello hayato07!");

    act(() => {
        render(<Hello name="Margaret" />, container);
    });
    expect(container.textContent).toBe("Hello Margaret!");
});