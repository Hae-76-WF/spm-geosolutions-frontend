#!/usr/bin/env bash
set -e

echo "🔧 [Git Hooks Setup] Configuring Git hooks for Frontend project..."

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

cd "$PROJECT_ROOT"

if [ -d ".git" ]; then
  mkdir -p .git/hooks
  cp .githooks/* .git/hooks/
  chmod +x .git/hooks/* 2>/dev/null || true
  git config core.hooksPath .githooks 2>/dev/null || true
  echo "✅ Git hooks installed to .git/hooks/ and core.hooksPath set to .githooks!"
else
  git config core.hooksPath .githooks 2>/dev/null || true
  echo "ℹ️ .git folder not yet initialized locally. Configured core.hooksPath to .githooks."
fi
