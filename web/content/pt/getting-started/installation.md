---
title: Instalação
description: Pré-requisitos, opções de instalação e configuração inicial.
---

# Instalação

## Pré-requisitos

- Google Antigravity (2026+)
- Bun
- uv

## Opção 1: Instalação Interativa

```bash
bunx oh-my-ag
```

Instala skills e workflows em `.agents/` no projeto atual.

## Opção 2: Instalação Global

```bash
bun install --global oh-my-ag
```

Recomendado se você usa os comandos do orquestrador com frequência.

## Opção 3: Integração com Projeto Existente

### Via CLI

```bash
bunx oh-my-ag
bunx oh-my-ag doctor
```

### Cópia manual

```bash
cp -r oh-my-ag/.agents/skills /path/to/project/.agents/
cp -r oh-my-ag/.agents/workflows /path/to/project/.agents/
cp -r oh-my-ag/.agents/config /path/to/project/.agents/
```

## Comando de Configuração Inicial

```text
/setup
```

Cria `.agents/config/user-preferences.yaml`.

## Vendors CLI Necessários

Instale e autentique pelo menos um:

- Gemini
- Claude
- Codex
- Qwen
