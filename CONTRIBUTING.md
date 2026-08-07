# Contributing

## Getting Started

1. Fork the repository
2. Clone your fork
3. Run `npm install`
4. Create a feature branch: `git checkout -b feature/your-feature`
5. Make changes, write tests, commit with conventional commits
6. Push and open a pull request

## Branch Naming

- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation
- `refactor/` - Refactoring
- `test/` - Test additions
- `chore/` - Maintenance

## Development

```bash
npm run dev         # Start dev servers
npm test            # Run tests
npm run lint        # Lint
npm run type-check  # Type check
npm run format      # Format code
```

## Commit Messages

[Conventional commits](https://www.conventionalcommits.org/) are recommended but not enforced locally. CI may surface non-conventional messages but won't block.

```bash
git commit -m "feat(ui): add dialog component"
git commit -m "fix(api): handle token expiration"
git commit -m "docs: update testing guide"
```

## Code Style

- TypeScript strict mode with explicit types on params and returns
- No `any` without documented justification
- Functional React components with hooks
- Use existing `@numeral/ui` components from shadcn/ui
- JSDoc on public APIs (`@param`, `@returns`, `@example`)

## Testing

- Write tests alongside code (co-located or in `tests/`)
- Use accessible queries (`getByRole`, `getByLabelText`)
- Mock only external APIs
- Include accessibility tests for UI components

## Pull Requests

Use the PR template. Every PR must:

- [ ] Pass CI checks
- [ ] Follow conventional commits (PR title, at minimum)
- [ ] Include testing instructions
- [ ] Update relevant documentation

## Adding Dependencies

```bash
# Add to a specific workspace
npm install <package> --workspace=apps/web
npm install -D <package> --workspace=@numeral/ui
```

## Troubleshooting

```bash
# Clear everything and reinstall
rm -rf node_modules apps/*/node_modules packages/*/node_modules
npm install

# Clear build caches
npx turbo clean
```
