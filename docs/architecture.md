# Architecture

## Overview

Midjourney-U is a self-paced tutorial companion guide for learning Midjourney. It is designed to help users unlock the full potential of Midjourney's capabilities through structured, digestible lessons.

## Project Structure

```
Midjourney-U/
├── CLAUDE.md              # AI assistant guidelines
├── README.md              # Project overview and documentation
├── LICENSE                # Apache 2.0
├── CHANGELOG.md           # Release history
├── SECURITY.md            # Vulnerability reporting
├── CONTRIBUTING.md        # Contribution guidelines
├── CODE_OF_CONDUCT.md     # Community standards
├── .editorconfig          # Editor consistency
├── .gitignore             # Git exclusions
├── .env.example           # Environment variable template
│
├── .claude/               # Claude Code configuration
│   └── settings.json
│
├── .github/workflows/     # CI/CD pipelines
│   └── ci.yml
│
├── docs/                  # Project documentation
│   ├── architecture.md    # This file
│   ├── decisions/         # Architecture Decision Records
│   └── runbooks/          # Operational procedures
│
└── tasks/                 # Work tracking
    ├── lessons.md         # Debugging lessons learned
    └── todo.md            # Deferred work items
```

## Decisions

Architecture Decision Records are stored in `docs/decisions/`. See that directory for rationale behind key technical choices.
