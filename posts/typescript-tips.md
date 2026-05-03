---
title: Three Small TypeScript Habits
date: 2026-04-15
description: Tiny habits that make TypeScript code easier to read and refactor.
tags: [typescript, tips]
---

Three habits that compound over time.

## 1. Discriminated unions over flag fields

```ts
type Result =
  | { ok: true; value: number }
  | { ok: false; error: string };
```

The compiler narrows for you — no manual checks.

## 2. `readonly` by default for arrays you don't mutate

```ts
function sum(xs: readonly number[]): number {
  return xs.reduce((a, b) => a + b, 0);
}
```

Catches accidental mutation at the type level.

## 3. Prefer `type` for unions, `interface` for object shapes that may be extended

A simple split that keeps intent clear.
