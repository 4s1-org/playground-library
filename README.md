# Some Library

## Remove

```
pnpm remove \
  @semantic-release/changelog \
  @semantic-release/git \
  @semantic-release/gitlab \
  conventional-changelog \
  conventional-changelog-conventionalcommits \
  semantic-release  \
  @4s1/semantic-release-config
```

## Files

### .versionrc.js

`touch .versionrc.js`

```js
const config = require('@4s1/changelog-config')

module.exports = config('https://gitlab.com/4s1/<PROJECT_URL>')
```

### .commitlintrc.json

`touch .commitlintrc.json`

```json
{
  "extends": ["@commitlint/config-conventional"]
}
```

### husky - commit-msg

`touch .husky/commit-msg && chmod +x .husky/commit-msg`

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

pnpm exec commitlint --edit "$1"
```

## Install

```bash
pnpm add -E -D \
  @4s1/changelog-config \
  @commitlint/cli \
  @commitlint/config-conventional \
  standard-version \
  @types/node@14.17.17 \
  @4s1/eslint-config \
  eslint \
  husky \
  prettier \
  typescript
```

## package.json Scripts

```text
"build": "rm -rf dist && tsc",
"test": "echo no tests",
"format": "prettier --write src/",
"preinstall": "npx only-allow pnpm",
"lbt": "npm run lint && npm run build && npm run test",
"lint": "echo no linting",
"lint:fix": "npm run lint -- --fix",
"release": "git diff --exit-code --quiet && pnpm run lbt && standard-version",
"release:major": "pnpm run release -- --release-as major",
"release:minor": "pnpm run release -- --release-as minor",
"release:patch": "pnpm run release -- --release-as patch",
"prepare": "husky install",
```

## Pipeline

```yaml
stages:
  - validate

validate-job:
  stage: validate
  image: registry.gitlab.com/4s1/docker/node:14-alpine-dev
  cache:
    key: '$CI_COMMIT_REF_SLUG'
    paths:
      - .pnpm-store
  script:
    - pnpm i
    - pnpm run lint
    - pnpm run build
    - pnpm run test
```
