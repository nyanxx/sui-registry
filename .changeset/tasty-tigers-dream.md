---
"sui-registry": minor
---


Refactored the registry to use path-based unique identifiers (IDs).

- Replaced filename-based keys with full relative paths (e.g., `components/layout/texted-separator`) to prevent naming collisions.
- Updated dependency resolution to use these path-based IDs, ensuring `requires` always matches registry keys.
- Added a `name` field to registry items for clean display in the CLI.
- Fixed inconsistent import paths in `faq-accordion.tsx` to match the new registry structure.
- Removed unreliable PascalCase transformations from the build process.
