# sui-registry

## 0.5.1

### Patch Changes

- 6abff34: bug fix

## 0.5.0

### Minor Changes

- 590da63: Added new pages and pets

## 0.4.0

### Minor Changes

- 2f2f7d4: Refactored the registry to use path-based unique identifiers (IDs).

  - Replaced filename-based keys with full relative paths (e.g., `components/layout/texted-separator`) to prevent naming collisions.
  - Updated dependency resolution to use these path-based IDs, ensuring `requires` always matches registry keys.
  - Added a `name` field to registry items for clean display in the CLI.
  - Fixed inconsistent import paths in `faq-accordion.tsx` to match the new registry structure.
  - Removed unreliable PascalCase transformations from the build process.

## 0.3.0

### Minor Changes

- 9e86454: Automated registry management with a new builder script and updated registry.json to include all current components, sections, pages, and pets.

## 0.2.0

### Minor Changes

- 1533266: Registry updated and new components added

  - typography components
  - list and table components
  - texted-seperator (layout) component
  - compoenent grouped in folder
  - registry updated for newly added components

## 0.1.1

### Patch Changes

- fixed section file typo

## 0.1.0

### Minor Changes

- 809d294: Add:
  - registy.json
  - one component and one faq section
  - sync-version.js to sync between package.json and registry.json
