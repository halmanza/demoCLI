type cliOptions =
{
    "addDelimiter": boolean,
    "convertToBinary": boolean,
    "convertToStream": boolean,
    "convertToBase64String": boolean,
    "createEncodedLink": boolean
}

const commandLineOptions = (userInput:string):cliOptions => {
  const options:cliOptions =
    {
      convertToBinary: false,
      addDelimiter: false,
      convertToBase64String: false,
      convertToStream: false,
      createEncodedLink: false
    }
  switch (userInput) {
    case "--binary":
      options.convertToBinary = true
      break
    case "--binary -d":
      options.addDelimiter = true
      options.convertToBinary = true
      break
    case "--base64":
      options.convertToBase64String = true
      break
    case "--stream":
      options.convertToStream = true
      break
    case "--encoded":
      options.createEncodedLink = true
      break
    default:
      throw new Error("Improper options parameter.")
  }

  return options
}

export { commandLineOptions, cliOptions }
