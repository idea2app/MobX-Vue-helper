# Publishing Guide

This document provides step-by-step instructions for publishing the `mobx-vue-helper` package to NPM.

## Prerequisites

- Access to the NPM organization/account
- NPM_TOKEN secret configured in GitHub repository settings (for automatic publishing)
- OR npm login credentials for manual publishing

## Automatic Publishing (Recommended)

The package is configured with GitHub Actions to automatically publish when a new release is created.

### Steps:

1. **Update the version number** in `package.json`:
   ```bash
   npm version patch  # for bug fixes (0.1.0 -> 0.1.1)
   npm version minor  # for new features (0.1.0 -> 0.2.0)
   npm version major  # for breaking changes (0.1.0 -> 1.0.0)
   ```

2. **Update CHANGELOG.md** with the new version and changes

3. **Commit and push the changes**:
   ```bash
   git add package.json CHANGELOG.md
   git commit -m "Bump version to X.Y.Z"
   git push
   ```

4. **Create a GitHub Release**:
   - Go to https://github.com/idea2app/MobX-Vue-helper/releases/new
   - Tag version: `vX.Y.Z` (e.g., `v0.1.0`)
   - Release title: `vX.Y.Z`
   - Description: Copy content from CHANGELOG.md for this version
   - Click "Publish release"

5. **Monitor the workflow**:
   - Check https://github.com/idea2app/MobX-Vue-helper/actions
   - The "Publish to NPM" workflow should start automatically
   - Once completed, verify the package on NPM: https://www.npmjs.com/package/mobx-vue-helper

## Manual Publishing

If you prefer to publish manually or if automatic publishing fails:

1. **Login to NPM**:
   ```bash
   npm login
   ```
   Enter your npm credentials when prompted.

2. **Update version** (if not already done):
   ```bash
   npm version patch  # or minor/major
   ```

3. **Build the package**:
   ```bash
   npm run build
   ```

4. **Verify the package contents**:
   ```bash
   npm pack --dry-run
   ```
   This shows what files will be included in the published package.

5. **Publish to NPM**:
   ```bash
   npm publish
   ```

6. **Verify the publication**:
   - Check https://www.npmjs.com/package/mobx-vue-helper
   - Test installation: `npm install mobx-vue-helper`

## First-Time Setup

### Configure NPM Token for GitHub Actions

1. Generate an NPM access token:
   - Login to https://www.npmjs.com
   - Go to Account Settings → Access Tokens
   - Generate New Token → Automation
   - Copy the token

2. Add the token to GitHub:
   - Go to https://github.com/idea2app/MobX-Vue-helper/settings/secrets/actions
   - New repository secret
   - Name: `NPM_TOKEN`
   - Value: (paste your NPM token)
   - Add secret

## Verification

After publishing, verify the package:

1. Check the package page: https://www.npmjs.com/package/mobx-vue-helper
2. Test installation in a fresh project:
   ```bash
   mkdir test-mobx-vue-helper
   cd test-mobx-vue-helper
   npm init -y
   npm install mobx-vue-helper mobx mobx-vue-lite vue vue-facing-decorator web-utility
   ```
3. Verify the types are working in TypeScript

## Troubleshooting

### "You do not have permission to publish"
- Ensure you're logged into the correct NPM account
- Verify the account has access to the `mobx-vue-helper` package name
- Check if the package name is available or owned by your organization

### "Version already exists"
- Update the version number in package.json
- Each publish must have a unique version number

### Build errors
- Run `npm install` to ensure all dependencies are installed
- Check TypeScript version compatibility
- Review error messages in the build output

## Current Version

The package is currently at version **0.1.0** and ready for its initial NPM publication.
