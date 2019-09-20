import { Command, flags } from "@oclif/command";
import { parse } from "../../../lib/src/neu/parser";
import { runValidationServer } from "../../../lib/src/validation-server/server";

const ARG_API = "spot_contract";

/**
 * oclif command to start the spot contract validation server
 */
export default class Serve extends Command {
  static description = "Start the spot contract validation server";

  static examples = ["$ spot serve api.ts"];

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
    port: flags.integer({
      char: "p",
      default: 5907,
      description: "The port where application will be available"
    })
  };

  async run() {
    const { args, flags } = this.parse(Serve);
    const contractPath = args[ARG_API];
    const { port } = flags;

    try {
      this.log("Parsing contract...");
      const contract = parse(contractPath);

      this.log("Starting validation server...");
      await runValidationServer(port, contract, this).defer();
      this.log(`Validation server running on port ${port}`);
    } catch (e) {
      this.error(e, { exit: 1 });
    }
  }
}
