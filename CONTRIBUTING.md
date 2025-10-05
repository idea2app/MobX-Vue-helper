# Contributing to MobX-Vue-helper

## Development Setup

1. Clone the repository:
```bash
git clone https://github.com/idea2app/MobX-Vue-helper.git
cd MobX-Vue-helper
```

2. Install dependencies:
```bash
npm install
```

3. Build the package:
```bash
npm run build
```

## Project Structure

```
mobx-vue-helper/
├── src/
│   ├── index.ts        # Main entry point
│   └── observer.tsx    # Observer decorator implementation
├── dist/               # Compiled output (git-ignored)
├── .github/
│   └── workflows/      # CI/CD workflows
├── package.json        # Package configuration
├── tsconfig.json       # TypeScript configuration
└── README.md          # Documentation
```

## Building

The package uses TypeScript compiler for building:

```bash
npm run build
```

This will compile TypeScript files from `src/` to `dist/` with:
- JavaScript files (`.js`)
- Type definitions (`.d.ts`)
- Source maps (`.js.map`, `.d.ts.map`)

## Publishing to NPM

### Automatic Publishing (Recommended)

1. Update the version in `package.json`:
   ```bash
   npm version patch  # for bug fixes
   npm version minor  # for new features
   npm version major  # for breaking changes
   ```

2. Update `CHANGELOG.md` with the changes

3. Create a GitHub release with the tag `v{version}`
   - The GitHub Actions workflow will automatically build and publish to NPM

### Manual Publishing

1. Ensure you're logged in to NPM:
   ```bash
   npm login
   ```

2. Build the package:
   ```bash
   npm run build
   ```

3. Publish to NPM:
   ```bash
   npm publish
   ```

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
