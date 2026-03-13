---
title: 安装
description: 前置条件、安装选项与首次运行设置。
---

# 安装

## 前置条件

- Google Antigravity (2026+)
- Bun
- uv

## 选项 1：交互式安装

```bash
bunx oh-my-ag
```

将技能和工作流安装到当前项目的 `.agents/` 目录中。

## 选项 2：全局安装

```bash
bun install --global oh-my-ag
```

如果您经常使用编排器命令，建议采用此方式。

## 选项 3：集成到现有项目

### CLI 方式

```bash
bunx oh-my-ag
bunx oh-my-ag doctor
```

### 手动复制方式

```bash
cp -r oh-my-ag/.agents/skills /path/to/project/.agents/
cp -r oh-my-ag/.agents/workflows /path/to/project/.agents/
cp -r oh-my-ag/.agents/config /path/to/project/.agents/
```

## 初始设置命令

```text
/setup
```

创建 `.agents/config/user-preferences.yaml`。

## 必需的 CLI 供应商

至少安装并认证一个：

- Gemini
- Claude
- Codex
- Qwen
