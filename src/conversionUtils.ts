import { cliOptions } from "./commandLineOptions.js";
import { createWriteStream } from "fs";

/**
 * @Description Converts string from a file into a base64 string representation.
 * @param { string } fileContent - string from selected file.
 * @param { cliOptions } options - options object with selected conversion actions.
 * @returns { string } returns a base64 encoded string with utf-16 formatting.
 */
const convertToBase64 = (fileContent: string, options: cliOptions): string => {
  if (!options.convertToBase64String) {
    throw new Error("Base64 option not chosen.");
  }

  return Buffer.from(fileContent).toString("base64");
};

/**
 * @description converts a string to a Uint8Array and returns binary representation of the original string.
 * @param { string } fileContent - string content from a file.
 * @param { cliOptions } options - contains settings from CLI for converting values.
 * @returns - A string representation of binary content from Uint8Array.
 */
const convertToBinaryString = (
  fileContent: string,
  options: cliOptions
): string => {
  const encoder = new TextEncoder();
  const encodedStringArray = encoder.encode(fileContent.trim());

  if (options.addDelimiter) {
    const delimitedArray = addDelimiter(encodedStringArray);
    return binaryStringRepresentation(delimitedArray, options);
  }

  return binaryStringRepresentation(encodedStringArray, options);
};

/**
 * @description Used in the convertToBinaryString function for adding an optional byte delimiter between values.
 * @param fileContent - File content encoded in Uint8Array.
 * @returns new byte array with added empty byte delimiter.
 */
const addDelimiter = (fileContent: Uint8Array): Uint8Array => {
  const byteUint8Array: Uint8Array = new Uint8Array(new ArrayBuffer(1));
  const appendedBuffer = new ArrayBuffer(
    fileContent.length + byteUint8Array.length
  );
  const appendedTypedArray = new Uint8Array(appendedBuffer);

  appendedTypedArray.set(fileContent, 0);
  appendedTypedArray.set(byteUint8Array, fileContent.length);

  return appendedTypedArray;
};

/**
 * @description converts Uint8Array binary into a string representation.
 * @param { Uint8Array } typedArray
 * @returns
 */
const binaryStringRepresentation = (typedArray: Uint8Array, options:cliOptions): string => {
  let storageString = "";
  
  typedArray.forEach((item:number) => 
  {
    storageString += item.toString(2).padStart(8, "0") + " ";
  });

  if (options.convertToBinaryOutputStringFile)
  {
    const streamWriter = options.outputLocation 
      ? createWriteStream(`${options.outputLocation}generatedBinary.txt`)
      : createWriteStream("generatedBinary.txt");

    for (const item of storageString)
    {
      streamWriter.write(item.trim());
    }
  } 
  
  return storageString;
};

const convertBinaryStringToUint8 = (binaryInput: string): Uint8Array =>
{
  return new TextEncoder().encode(binaryInput);
}

export { convertToBase64, convertToBinaryString, convertBinaryStringToUint8 };
