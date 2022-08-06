export type cliArguments =
{
  mainCommand: string,
  optionsCommand: string | null
}

/**
 * @description Processes user entered CLI arguments. 
 * @param { cliArguments } commandLineArguments - user entered arguments object.
 * @returns A string of formatted CLI arguments.
 */
export const argumentProcessor = (commandLineArguments:cliArguments):string =>
{
  const defaultCommand:string = commandLineArguments.mainCommand.trim().toLowerCase();
  const optionalArgument:string | null = commandLineArguments?.optionsCommand 
    ? commandLineArguments.optionsCommand.trim().toLowerCase() 
    : null;

  const cleanedArguments:string = commandLineArguments.optionsCommand !== null
    ? `${defaultCommand}${optionalArgument}`
    : `${defaultCommand}`

  return cleanedArguments;
}

export const createCLIArgumentsObject = (mainCommandArg:string, optionalCommandArg:string | null = null):cliArguments =>
{
  const cliArgumentsObject:cliArguments = 
  {
    mainCommand: mainCommandArg,
    optionsCommand: optionalCommandArg
  }

  return cliArgumentsObject;

}
