---
title: Встановлення
description: Передумови, варіанти встановлення та початкове налаштування.
---

# Встановлення

## Передумови

- Google Antigravity (2026+)
- Bun
- uv

## Варіант 1: Інтерактивне встановлення

```bash
bunx oh-my-agent
```

Встановлює навички та робочі процеси в `.agents/` поточного проєкту.

## Варіант 2: Глобальне встановлення

```bash
bun install --global oh-my-agent
```

Рекомендується, якщо ви часто використовуєте команди оркестратора.

## Варіант 3: Інтеграція в існуючий проєкт

### Шлях через CLI

```bash
bunx oh-my-agent
bunx oh-my-agent doctor
```

### Ручне копіювання

```bash
cp -r oh-my-agent/.agents/skills /path/to/project/.agents/
cp -r oh-my-agent/.agents/workflows /path/to/project/.agents/
cp -r oh-my-agent/.agents/config /path/to/project/.agents/
```

## Початкова команда налаштування

```text
/setup
```

Створює `.agents/config/user-preferences.yaml`.

## Необхідні CLI-постачальники

Встановіть та авторизуйте принаймні одного:

- Gemini
- Claude
- Codex
- Qwen
