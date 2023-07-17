module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-case": [2, "always", ["lower-case", "upper-case"]],
    "type-enum": [2, "always", ["feat", "fix", "docs", "style", "refactor", "perf", "test", "chore", "revert"]],
  },
  /*
   * Functions that return true if commitlint should ignore the given message.
   * Fix semantic-release commit失效
   */
  ignores: [(commit = "") => commit.replace(/^\s+/, "").startsWith("chore(release)")],
};
