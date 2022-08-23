type cliOptions = {
  addDelimiter: boolean;
  convertToBinary: boolean;
  convertToStream: boolean;
  convertToBase64String: boolean;
  createEncodedLink: boolean;
  convertToBinaryOutputStringFile: boolean;
  outputLocation: string | null;
};

const commandLineOptions = (userInput: string): cliOptions => {
  const options: cliOptions = {
    convertToBinary: false,
    addDelimiter: false,
    convertToBase64String: false,
    convertToStream: false,
    createEncodedLink: false,
    convertToBinaryOutputStringFile: false,
    outputLocation: null 
  };
  const checkLength = userInput.split(" ");
  const OutputSourceDestination: string =
    checkLength.length >= 3 ? checkLength[checkLength.length - 1] : "";

  switch (userInput) {
    case "--binary":
      options.convertToBinary = true;
      break;
    case "--binary -d":
      options.addDelimiter = true;
      options.convertToBinary = true;
      break;
    case "--binary -output":
      options.convertToBinaryOutputStringFile = true;
      break;
    case `--binary -output ${OutputSourceDestination}`:
      options.outputLocation = OutputSourceDestination;
      options.convertToBinaryOutputStringFile = true;
      break;
    case `--binary -d -output ${OutputSourceDestination}`:
      options.outputLocation = OutputSourceDestination;
      options.convertToBinaryOutputStringFile = true;
      options.convertToBinary = true;
      options.addDelimiter = true;
      break;
    case "--base64":
      options.convertToBase64String = true;
      break;
    case "--stream":
      options.convertToStream = true;
      break;
    case "--encoded":
      options.createEncodedLink = true;
      break;
    default:
      throw new Error("Improper options parameter.");
  }

  return options;
};

export { commandLineOptions, cliOptions };
