# sui-registry

A headless registry for modern UI components, sections, and patterns built with React, TypeScript, and Tailwind CSS.

## Overview

This repository serves as a centralized source of truth for a collection of reusable UI elements. Unlike traditional component libraries, this registry is designed to be consumed by a distribution system that injects source code directly into projects, ensuring zero-dependency bloat and full customizability.

## Content Structure

The registry is organized into several logical categories:

- **components / pets**: Atomic and molecular UI primitives.
- **sections**: Larger, composable layout blocks.
- **pages**: Full-page templates and layouts.
- **utils**: Shared logic and helper functions.

## Registry Automation

The project features a custom automation system to ensure that `registry.json` is always in sync with the physical file system.

- **Automated Mapping**: A builder script scans the category directories and automatically maps file paths, requirements, and dependencies.
- **Dependency Detection**: The system analyzes import statements to identify and link necessary internal requirements and external npm packages.
- **Metadata Management**: Descriptions and configuration can be managed directly within the file metadata or preserved within the registry.

## Development

### Registry Management

To rebuild the registry after adding new files or updating imports:

```bash
pnpm run build:registry
```

### Versioning

The project uses Changesets for version management. To prepare a new version:

1. Create a changeset:
   ```bash
   pnpm changeset
   ```
2. Bump the version and sync the registry:
   ```bash
   pnpm bump
   ```

## Tech Stack

- **Framework**: [React](https://reactjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Variant Management**: [Class Variance Authority](https://cva.style/)
- **Icons**: [Lucide React](https://lucide.dev/)
