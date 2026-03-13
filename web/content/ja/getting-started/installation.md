---
title: インストール
description: 前提条件、インストールオプション、初回セットアップ。
---

# インストール

## 前提条件

- Google Antigravity (2026+)
- Bun
- uv

## オプション 1: インタラクティブインストール

```bash
bunx oh-my-ag
```

現在のプロジェクトの `.agents/` にスキルとワークフローをインストールします。

## オプション 2: グローバルインストール

```bash
bun install --global oh-my-ag
```

オーケストレーターコマンドを頻繁に使用する場合に推奨です。

## オプション 3: 既存プロジェクトへの統合

### CLI パス

```bash
bunx oh-my-ag
bunx oh-my-ag doctor
```

### 手動コピーパス

```bash
cp -r oh-my-ag/.agents/skills /path/to/project/.agents/
cp -r oh-my-ag/.agents/workflows /path/to/project/.agents/
cp -r oh-my-ag/.agents/config /path/to/project/.agents/
```

## 初期セットアップコマンド

```text
/setup
```

`.agents/config/user-preferences.yaml` を作成します。

## 必要な CLI ベンダー

少なくとも1つをインストールして認証してください:

- Gemini
- Claude
- Codex
- Qwen
