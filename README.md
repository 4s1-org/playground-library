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
  - deploy

validate-job:
  stage: validate
  image: registry.gitlab.com/4s1/docker/node:14-alpine-dev
  cache:
    key: '$CI_COMMIT_REF_SLUG'
    paths:
      - .pnpm-store
  before_script:
    # Access to private packages
    - echo "//gitlab.com/api/v4/packages/npm/:_authToken=${CI_JOB_TOKEN}" >> .npmrc
  script:
    - pnpm i
    - pnpm run lint
    - pnpm run build
    - pnpm run test

.deploy-job:
  stage: deploy
  image:
    name: gcr.io/kaniko-project/executor:debug
    entrypoint: ['']
  rules:
    - if: '$CI_COMMIT_TAG != null'
  cache:
    key: '$CI_COMMIT_REF_SLUG'
    paths:
      - .pnpm-store
  script:
    - mkdir -p /kaniko/.docker
    - echo "{\"auths\":{\"$CI_REGISTRY\":{\"auth\":\"$(echo -n ${CI_REGISTRY_USER}:${CI_REGISTRY_PASSWORD} | base64)\"}}}" > /kaniko/.docker/config.json
    - /kaniko/executor
      --context $CI_PROJECT_DIR
      --dockerfile $CI_PROJECT_DIR/Dockerfile
      --destination $CI_REGISTRY_IMAGE:latest
```
