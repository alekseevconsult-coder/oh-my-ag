---
title: Instalacion
description: Prerequisitos, opciones de instalacion y configuracion inicial.
---

# Instalacion

## Prerequisitos

- Google Antigravity (2026+)
- Bun
- uv

## Opcion 1: Instalacion interactiva

```bash
bunx oh-my-ag
```

Instala skills y flujos de trabajo en `.agents/` en el proyecto actual.

## Opcion 2: Instalacion global

```bash
bun install --global oh-my-ag
```

Recomendado si utiliza los comandos del orquestador con frecuencia.

## Opcion 3: Integracion en proyecto existente

### Via CLI

```bash
bunx oh-my-ag
bunx oh-my-ag doctor
```

### Copia manual

```bash
cp -r oh-my-ag/.agents/skills /path/to/project/.agents/
cp -r oh-my-ag/.agents/workflows /path/to/project/.agents/
cp -r oh-my-ag/.agents/config /path/to/project/.agents/
```

## Comando de configuracion inicial

```text
/setup
```

Crea `.agents/config/user-preferences.yaml`.

## Proveedores de CLI requeridos

Instale y autentique al menos uno:

- Gemini
- Claude
- Codex
- Qwen
