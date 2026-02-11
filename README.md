# webmcp_test

このリポジトリは、WebMCP APIのテスト用プロジェクトです。

## ファイル構成

- **index.html**: 商品ページ（ヘッドホン）のHTMLファイルです。WebMCP APIを読み込み、カスタマーレビューを表示します。
- **webmcp-api.js**: WebMCP APIの実装スクリプトです。レビュー情報の取得などの機能を提供します。
- **product_image.png**: 商品ページで使用されているヘッドホンの画像ファイルです。

試す方法
1.Chrome146以上のバージョンでindex.htmlを開く
2.テスト用の以下の拡張機能を入れる
https://chromewebstore.google.com/detail/model-context-tool-inspec/gbpdfapgefenggkahomfgkhfehlcenpd

3.拡張機能を開くとサイドパネルが開く
　開くとWebMCP ToolsにgetProductReviewsが取得できる

4.Set Gemini API Keyを押してGeminiのAPIKeyを入力する
5.User Promptに以下のプロンプトに「評価の高いレビューを取得して」などを入力
6.下のところに取得処理が記述される

※APIKeyはレート制限に注意して使用してください
