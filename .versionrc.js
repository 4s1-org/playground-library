module.exports = {
  scripts: {
    // https://github.com/conventional-changelog/standard-version/issues/317
    // prettier-ignore
    postchangelog: "pnpm run changelog:fix:indent",
  },
  types: [
    { type: 'build', section: 'Build System', hidden: false },
    { type: 'chore', section: 'Miscellaneous Chores', hidden: false },
    { type: 'ci', section: 'Continuous Integration', hidden: false },
    { type: 'docs', section: 'Documentation', hidden: false },
    { type: 'feat', section: 'Features', hidden: false },
    { type: 'fix', section: 'Bug Fixes', hidden: false },
    { type: 'perf', section: 'Performance Improvements', hidden: false },
    { type: 'refactor', section: 'Code Refactoring', hidden: false },
    { type: 'revert', section: 'Reverts', hidden: false },
    { type: 'style', section: 'Styles', hidden: false },
    { type: 'test', section: 'Tests', hidden: false },
  ],
  commitUrlFormat: 'https://gitlab.com/4s1/playground/some-library/commit/{{hash}}',
  compareUrlFormat: 'https://gitlab.com/4s1/playground/some-library/compare/{{previousTag}}...{{currentTag}}',
  releaseCommitMessageFormat: 'chore(release): {{currentTag}} [skip ci]',
}