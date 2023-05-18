import {
  DisplayProcessor,
  // SpecReporter,
  StacktraceOption,
} from 'jasmine-spec-reporter';
import SuiteInfo = jasmine.SuiteInfo;

/* eslint @typescript-eslint/no-var-requires: "off" */
const SpecReporter = require('jasmine-spec-reporter').SpecReporter;
// new
// import CustomReporter = jasmine.CustomReporter;

class CustomProcessor extends DisplayProcessor {
  public displayJasmineStarted(info: SuiteInfo, log: string): string {
    return `${log}`;
  }
}

jasmine.getEnv().clearReporters();

// new
// jasmine.getEnv().addReporter(new SpecReporter() as unknown as CustomReporter);

jasmine.getEnv().addReporter(
  new SpecReporter({
    spec: {
      displayStacktrace: StacktraceOption.NONE,
    },
    customProcessors: [CustomProcessor],
  })
);
