# Figma Dev Mode + MCP デザイン→Next.js自動コード生成キット

> 🌐 **[English Documentation (README.md)](./README.md)**

**Figma Dev Mode + MCP** から取得したデザイントークンおよびコンポーネント仕様を自動検証（カラーコード・アクセシビリティ `aria-label`・命名規則）し、**型安全な React / Next.js 15 + Tailwind CSS コンポーネント**を自動生成・CI検証するパイプラインです。

```bash
npm install && npm run codegen && npm run typecheck && npm test && npm run build
```

**作成者:** あぶどら・まもん（工学博士 / PMP） · [GitHub](https://github.com/mabdullah-ml) · [LinkedIn](https://www.linkedin.com/in/mamunabdullah01)
