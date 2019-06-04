import { Command, flags } from "@oclif/command";
import { safeParse } from "../common/safe-parse";
import { TestFilter } from "../test-utils/common";
import { runTest } from "../test-utils/test-runner";

const ARG_API = "spot_contract";

/**
 * oclif command to test a spot contract
 */
export default class Test extends Command {
  static description = "Test a Spot contract";

  static examples = [
    "$ spot test api.ts -u http://localhost:3000",
    "$ spot test api.ts -u http://localhost:3000 -s http://localhost:3000/spot",
    "$ spot test api.ts -u http://localhost:3000 -t MyEndpoint:myTest"
  ];

  static args = [
    {
      name: ARG_API,
      required: true,
      description: "path to Spot contract",
      hidden: false
    }
  ];

  static flags = {
    help: flags.help({ char: "h" }),
    debug: flags.boolean(),
    url: flags.string({
      required: true,
      char: "u",
      description: "Base URL"
    }),
    stateUrl: flags.string({
      char: "s",
      description: "Base URL for state changes"
    }),
    testFilter: flags.string({
      char: "t",
      description: "Filter by endpoint and test"
    })
  };

  async run() {
    const { args, flags } = this.parse(Test);
    const { url: baseUrl, stateUrl: baseStateUrl, testFilter, debug } = flags;
    const { definition } = safeParse.call(this, args[ARG_API]);

    const testConfig = {
      baseStateUrl: baseStateUrl ? baseStateUrl : `${baseUrl}/state`,
      baseUrl,
      testFilter: testFilter ? parseTestFilter(testFilter) : undefined,
      debugMode: debug
    };

    const allPassed = await runTest(definition, testConfig);

    if (!allPassed) {
      this.exit(1);
    }
  }
}

function parseTestFilter(rawTestFilter: string): TestFilter {
  const [specificEndpoint, specificTest] = rawTestFilter.split(":");
  return {
    endpoint: specificEndpoint,
    test: specificTest
  };
}
