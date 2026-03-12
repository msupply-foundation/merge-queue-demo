# Merge Queue Demo

This repo demonstrates how **semantic merge conflicts** can break your main branch even when every PR passes CI individually — and how GitHub's branch protection settings prevent it.

## The Problem

Two PRs that don't touch the same lines can still be **logically incompatible**:

- **PR A** removes `API_URL` from `config.js` (moves it to an env var)
- **PR B** adds a health check that reads `config.API_URL`

Both pass CI on their own. But if PR A merges first, PR B's code breaks because `config.API_URL` no longer exists. Git sees no merge conflict because the changes are in different files.

## The Demos

Each demo has its own `develop` branch with an identical pair of PRs, but different branch protection settings.

### Demo 1 — No protection

**Branches:** `demo-1/develop` ← PRs from `demo-1/pr-a` and `demo-1/pr-b`

**What happens:** Both PRs show green CI and can be merged. After merging PR A then PR B, CI fails on `demo-1/develop`. The main branch is now broken.

**Takeaway:** Requiring status checks alone is not enough.

### Demo 2 — Require branch to be up-to-date

**Branches:** `demo-2/develop` ← PRs from `demo-2/pr-a` and `demo-2/pr-b`

**What happens:** Merge PR A. Now PR B is blocked — GitHub shows "This branch is out-of-date with the base branch" and requires you to update. Click "Update branch", CI re-runs against the latest `demo-2/develop` (which now includes PR A's changes), and the test **fails**. The bug is caught before merging.

**Takeaway:** This works, but developers must manually update and wait for CI. With many concurrent PRs, this creates a frustrating loop.

### Demo 3 — Merge queue

**Branches:** `demo-3/develop` ← PRs from `demo-3/pr-a` and `demo-3/pr-b`

**What happens:** Click "Merge when ready" on both PRs. The merge queue automatically rebases each PR onto the latest base + any earlier queue entries, then runs CI. PR A passes and merges. PR B is rebased on top of PR A, CI fails, and it's **automatically rejected** from the queue.

**Takeaway:** Same protection as "require up-to-date", but fully automated. Developers click merge and walk away.
