---
title: Інтеграція в існуючий проєкт
description: Безпечний та неруйнівний процес інтеграції для додавання навичок oh-my-agent до існуючого проєкту Antigravity.
---

# Інтеграція в існуючий проєкт

Цей посібник замінює застарілий робочий процес із кореневим `AGENT_GUIDE.md` та відображає поточну структуру робочого простору (`cli` + `web`) і поведінку CLI.

## Мета

Додати навички `oh-my-agent` до існуючого проєкту без перезапису поточних ресурсів.

## Рекомендований шлях (CLI)

Виконайте це в кореневій директорії цільового проєкту:

```bash
bunx oh-my-agent
```

Що це робить:

- Встановлює або оновлює `.agents/skills/*`
- Встановлює спільні ресурси в `.agents/skills/_shared`
- Встановлює `.agents/workflows/*`
- Встановлює `.agents/config/user-preferences.yaml`
- За бажанням встановлює глобальні робочі процеси в `~/.gemini/antigravity/global_workflows`

## Безпечний ручний шлях

Використовуйте цей варіант, коли потрібен повний контроль над кожною скопійованою директорією.

```bash
cd /path/to/your-project

mkdir -p .agents/skills .agents/workflows .agents/config

# Copy only missing skill directories (example)
for skill in workflow-guide pm-agent frontend-agent backend-agent mobile-agent qa-agent debug-agent orchestrator commit; do
  if [ ! -d ".agents/skills/$skill" ]; then
    cp -r /path/to/oh-my-agent/.agents/skills/$skill .agents/skills/$skill
  fi
done

# Copy shared resources if missing
[ -d .agents/skills/_shared ] || cp -r /path/to/oh-my-agent/.agents/skills/_shared .agents/skills/_shared

# Copy workflows if missing
for wf in coordinate.md orchestrate.md plan.md review.md debug.md setup.md tools.md; do
  [ -f ".agents/workflows/$wf" ] || cp /path/to/oh-my-agent/.agents/workflows/$wf .agents/workflows/$wf
done

# Copy default user preferences only if missing
[ -f .agents/config/user-preferences.yaml ] || cp /path/to/oh-my-agent/.agents/config/user-preferences.yaml .agents/config/user-preferences.yaml
```

## Чек-лист верифікації

```bash
# 9 installable skills (excluding _shared)
find .agents/skills -mindepth 1 -maxdepth 1 -type d ! -name '_shared' | wc -l

# Shared resources
[ -d .agents/skills/_shared ] && echo ok

# 7 workflows
find .agents/workflows -maxdepth 1 -name '*.md' | wc -l

# Basic command health
bunx oh-my-agent doctor
```

## Додаткові панелі моніторингу

Панелі моніторингу є необов'язковими та використовують встановлений CLI:

```bash
bunx oh-my-agent dashboard
bunx oh-my-agent dashboard:web
```

URL веб-панелі за замовчуванням: `http://localhost:9847`

## Стратегія відкату

Перед інтеграцією створіть контрольний коміт у вашому проєкті:

```bash
git add -A
git commit -m "chore: checkpoint before oh-my-agent integration"
```

Якщо потрібно скасувати, відкотіть цей коміт стандартним процесом вашої команди.

## Підтримка симлінків мульти-CLI

Після запуску `bunx oh-my-agent` ви побачите такий запит після вибору навичок:

```text
Also develop with other CLI tools?
  ○ Claude Code (.claude/skills/)
  ○ OpenCode, Amp, Codex (.agents/skills/)
  ○ GitHub Copilot (.github/skills/)
```

Оберіть будь-які додаткові CLI-інструменти, які ви використовуєте поряд з Antigravity. Інсталятор:

1. Встановить навички в `.agents/skills/` (рідне розташування Antigravity)
2. Створить симлінки з директорії навичок кожного обраного CLI до `.agents/skills/`

Це забезпечує єдине джерело істини, дозволяючи навичкам працювати з кількома CLI-інструментами.

### Структура симлінків

```
.agents/skills/frontend-agent/      ← Джерело (SSOT)
.claude/skills/frontend-agent/     → ../../.agents/skills/frontend-agent/
.agents/skills/frontend-agent/     → ../../.agents/skills/frontend-agent/ (OpenCode, Amp, Codex)
.github/skills/frontend-agent/     → ../../.agents/skills/frontend-agent/ (GitHub Copilot)
```

Інсталятор пропускає існуючі симлінки та попереджає, якщо в цільовому розташуванні існує реальна директорія.

## Примітки

- Не перезаписуйте існуючі папки `.agents/skills/*`, якщо ви не маєте наміру замінити налаштовані навички.
- Зберігайте файли політик проєкту (`.agents/config/*`) під управлінням вашого репозиторію.
- Для патернів мульти-агентної оркестрації перейдіть до [`Посібника з використання`](./usage.md).
