module.exports = {
  default: {
    formatOptions: {
      snippetInterface: "async-await",
    },
    paths: ["./cucumber/features"],
    dryRun: false,
    require: [
      "cucumber/step-definitions/**/*.steps.ts",
      "cucumber/setup/world.ts",
    ],
    requireModule: ["ts-node/register"],
    format: [
      "progress-bar",
      "progress",
      "html:test-results/cucumber-report.html",
      // "json:test-results/cucumber-report.json",
      // "rerun:@rerun.txt",
    ],
    parallel: 1,
  },
  // rerun: {
  //   formatOptions: {
  //     snippetInterface: "async-await",
  //   },
  //   publishQuiet: true,
  //   dryRun: false,
  //   require: ["src/test/steps/*.ts", "src/hooks/hooks.ts"],
  //   requireModule: ["ts-node/register"],
  //   format: [
  //     "progress-bar",
  //     "html:test-results/cucumber-report.html",
  //     "json:test-results/cucumber-report.json",
  //     "rerun:@rerun.txt",
  //   ],
  //   parallel: 2,
  // },
};
