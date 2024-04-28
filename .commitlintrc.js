/*
 * @Author: kasuie
 * @Date: 2024-04-28 21:20:19
 * @LastEditors: kasuie
 * @LastEditTime: 2024-04-28 21:20:23
 * @Description:
 */
module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "init",
        "ci",
        "wip",
        "feat",
        "fix",
        "merge",
        "docs",
        "style",
        "refactor",
        "perf",
        "test",
        "chore",
        "revert",
        "build",
      ],
    ],
    "subject-case": [0],
  },
};
