---
title: Installatie
description: Vereisten, installatieopties en eerste configuratie.
---

# Installatie

## Vereisten

- Google Antigravity (2026+)
- Bun
- uv

## Optie 1: Interactieve installatie

```bash
bunx oh-my-ag
```

Installeert skills en workflows in `.agents/` in het huidige project.

## Optie 2: Globale installatie

```bash
bun install --global oh-my-ag
```

Aanbevolen als u regelmatig orkestratiecommando's gebruikt.

## Optie 3: Integratie in bestaand project

### CLI-pad

```bash
bunx oh-my-ag
bunx oh-my-ag doctor
```

### Handmatig kopieerpad

```bash
cp -r oh-my-ag/.agents/skills /path/to/project/.agents/
cp -r oh-my-ag/.agents/workflows /path/to/project/.agents/
cp -r oh-my-ag/.agents/config /path/to/project/.agents/
```

## Initieel configuratiecommando

```text
/setup
```

Maakt `.agents/config/user-preferences.yaml` aan.

## Vereiste CLI-vendors

Installeer en authenticeer minimaal een van de volgende:

- Gemini
- Claude
- Codex
- Qwen
