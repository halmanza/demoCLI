#!/usr/bin/env node
import fs from "fs/promises";
import { commandLineOptions, cliOptions } from "./commandLineOptions.js";
import { argumentProcessor, cliArguments, createCLIArgumentsObject } from "./utils/argumentProcessing.js";
import CentralCommand from "./CentralCommand.js";

const fileName: string = process.argv[2];
const argumentsObject:cliArguments = createCLIArgumentsObject(process.argv[3], process.argv[4]);

try 
{
  const file: Promise<string> = fs.readFile(fileName, { encoding: "utf-8" });
  const stringFromFile = await file;
  const formattedArguments = argumentProcessor(argumentsObject)
  const options: cliOptions = commandLineOptions(formattedArguments);
  const commandCenter = CentralCommand.GetInstance(options);

  commandCenter.ProcessRequest(stringFromFile);

} 
catch (error: unknown) 
{
  const message:string = error instanceof Error ? error.message : "";

  if (message.includes("properties") && message.includes("undefined")) 
  {
    console.error("improper flag. Please input a proper command or optional flag.");
  } 
  else 
  {
    console.error(message);
  }
}
