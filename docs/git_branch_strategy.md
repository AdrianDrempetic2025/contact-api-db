# Git Branch Strategy

This document outlines the recommended Git branching strategy for this repository, based on a simplified Git Flow model. This strategy aims to ensure a clear, organized, and efficient development workflow.

## Branch Types

### 1. `main` Branch

*   **Purpose:** This branch represents the stable, production-ready version of the codebase. Only releases are merged into `main`.
*   **Workflow:**
    *   Direct commits to `main` are strictly forbidden.
    *   New releases are created by merging the `develop` branch into `main` (or a dedicated release branch, if applicable).
    *   Tags are applied to `main` for each release version.
    *   Hotfixes (critical bug fixes for production) are branched directly from `main` and merged back into `main` and `develop`.

### 2. `develop` Branch

*   **Purpose:** This branch serves as the integration branch for all new features and bug fixes. It represents the latest development state.
*   **Workflow:**
    *   All new feature branches and bugfix branches are branched off `develop`.
    *   Completed feature and bugfix branches are merged back into `develop`.
    *   `develop` is regularly merged into `main` for new releases.

### 3. `feature` Branches (`feat/<scope>`)

*   **Purpose:** These branches are used for developing new features. Each feature should have its own dedicated branch. The `<scope>` part should briefly describe the feature (e.g., `feat/user-authentication`, `feat/contact-form`).
*   **Workflow:**
    *   Branch off `develop`: `git checkout -b feat/<scope> develop`
    *   Develop the feature, committing regularly.
    *   Once the feature is complete and thoroughly tested, it is merged back into `develop` via a Pull Request.
    *   Delete the feature branch after merging.

### 4. `bugfix` Branches (`fix/<scope>`)

*   **Purpose:** These branches are used for fixing bugs that are not critical enough to warrant a hotfix on `main`. The `<scope>` part should briefly describe the bug (e.g., `fix/login-error`, `fix/data-validation`).
*   **Workflow:**
    *   Branch off `develop`: `git checkout -b fix/<scope> develop`
    *   Implement the bug fix, committing regularly.
    *   Once the bug fix is complete and tested, it is merged back into `develop` via a Pull Request.
    *   Delete the bugfix branch after merging.

## General Workflow Guidelines

*   **Pull Requests (PRs):** All merges into `develop` and `main` must be done via Pull Requests. PRs facilitate code review, automated testing, and discussion.
*   **Branch Naming:** Adhere to the specified naming conventions (`feat/<scope>`, `fix/<scope>`).
*   **Commit Messages:** Write clear, concise, and descriptive commit messages.
*   **Regular Updates:** Developers should regularly pull changes from `develop` into their feature/bugfix branches to minimize merge conflicts.
*   **Testing:** Ensure all code is thoroughly tested before creating a Pull Request.
