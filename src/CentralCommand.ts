import { mkdir } from "fs/promises";
import { cliOptions } from "./commandLineOptions.js";
import * as utils from "./conversionUtils.js";

/**
 * @description CentralCommand class converts values based upon the cliOptions settings.
 */
export default class CentralCommand
{
  // eslint-disable-next-line no-use-before-define
  private static GenerateCentralCommand: CentralCommand | null;
  private CommandOptions: cliOptions;

  /**
   * @param { cliOptions } options - Object containing which settings will be used by the CLI.
   */
  private constructor (options: cliOptions) {
    this.CommandOptions = options;
  }

  /**
   * @description Creates an instance of the CentralCommand if one doesn't already exist.
   * @param { cliOptions } options - Options Object. 
   * @returns { CentralCommand } - CentralCommand object with the desired settings based on cliOptions object.
   */
  public static GetInstance (options: cliOptions): CentralCommand 
  {
    if (CentralCommand.GenerateCentralCommand == null) 
    {
      CentralCommand.GenerateCentralCommand = new CentralCommand(options);

      return CentralCommand.GenerateCentralCommand;
    }

    return CentralCommand.GenerateCentralCommand;
  }

  /**
   * @description The CentralCommand objects current settings.
   * @returns { cliOptions } - The field that stores the cliOptions settings.
   */
  public CurrentOptions = (): cliOptions => this.CommandOptions;

  /**
   * @description Processes the desired value conversion and outputs the value.
   * @param { string } fileContent - The string content located in a file.
   */
  public ProcessRequest (fileContent: string): void | string | ArrayBuffer 
  {
    if (this.CommandOptions.convertToBase64String) 
    {
      console.log(utils.convertToBase64(fileContent, this.CommandOptions));
    } else if (this.CommandOptions.convertToBinary) 
    {
      console.log(utils.convertToBinaryString(fileContent, this.CommandOptions));
    }
    else if (this.CommandOptions.convertToBinaryOutputStringFile)
    {
      mkdir("./build/convertedValues");
      utils.convertToBinaryString(fileContent, this.CommandOptions);
    }
    else
    {
      console.log("Please add an encoding option.")
    }
  }
}
