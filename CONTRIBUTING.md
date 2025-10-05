# Contributing to MobX-Vue-helper

## Development Setup

```bash
git clone https://github.com/idea2app/MobX-Vue-helper.git
cd MobX-Vue-helper
pnpm i
pnpm build
```

## Project Structure

```text
mobx-vue-helper/
├── src/
│   ├── index.ts        # Main entry point
│   └── observer.tsx    # Observer decorator implementation
├── dist/               # Compiled output (git-ignored)
├── .github/
│   └── workflows/      # CI/CD workflows
├── package.json        # Package configuration
├── tsconfig.json       # TypeScript configuration
└── README.md           # Documentation
```

## Building

The package uses TypeScript compiler for building:

```bash
pnpm build
```

This will compile TypeScript files from `src/` to `dist/` with:

- JavaScript files (`.js`)
- Type definitions (`.d.ts`)
- Source maps (`.js.map`, `.d.ts.map`)

## Code Style

- Use TypeScript for all source files
- Follow existing code style and conventions
- Add JSDoc comments for public APIs
- Include examples in documentation

## Testing

Currently, the package uses type checking and successful compilation as validation. When adding new features:

1. Ensure TypeScript compilation succeeds
2. Manually test with example Vue applications
3. Verify type definitions are correct

## Pull Requests

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Ensure the build succeeds
5. Submit a pull request with a clear description

## License

This project is licensed under LGPL-2.1. By contributing, you agree that your contributions will be licensed under the same license.
