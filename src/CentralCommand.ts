import {cliOptions} from "./commandLineOptions.js";
import * as utils from './conversionUtils.js';

export default class CentralCommand
{
   private static GenerateCentralCommand: CentralCommand | null;
   private CommandOptions:cliOptions; 

   private constructor(options: cliOptions)
   { 
        this.CommandOptions = options;
   }
   
   public static GetInstance(options:cliOptions):CentralCommand
   {
        if(CentralCommand.GenerateCentralCommand == null)
        {
            CentralCommand.GenerateCentralCommand = new CentralCommand(options);

            return CentralCommand.GenerateCentralCommand;
        }

        return CentralCommand.GenerateCentralCommand;
   }

   public CurrentOptions = () => this.CommandOptions;

   public ProcessRequest(fileContent:string):void|string|ArrayBuffer
   {
        if(this.CommandOptions.convertToBase64String)
        {
            return utils.convertToBase64(fileContent, this.CommandOptions);
        }
        else if(this.CommandOptions.convertToBase64String)
        {
            return utils.convertToBinaryString(fileContent, this.CommandOptions);
        }
        else if(this.CommandOptions.convertToStream)
        {

        }
   }


}