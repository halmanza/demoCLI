import { cliOptions } from "./commandLineOptions.js";

/**
 * @Description - Converts string from a file into a base64 string representation.
 * @param { string } fileContent - string from selected file.
 * @param { cliOptions } options - options object with selected conversion actions.
 * @returns { string } - returns a base64 encoded string with utf-16 formatting.
 */
const convertToBase64 = (fileContent: string, options: cliOptions): string => 
{
  if (!options.convertToBase64String) {
    throw new Error("Base64 option not chosen.");
  }

  return Buffer.from(fileContent).toString("base64");
};

const convertToBinaryString = (fileContent: string, options: cliOptions): string => 
{
  const encoder = new TextEncoder();
  const encodedStringArray = encoder.encode(fileContent);

  if (options.addDelimiter) {
    const delimitedArray = addDelimiter(encodedStringArray);
    return binaryStringUtF8Conversion(delimitedArray);
  }

  return binaryStringUtF8Conversion(encodedStringArray);
};

const addDelimiter = (fileContent: Uint8Array): Uint8Array => 
{
  const byteUint8Array: Uint8Array = new Uint8Array(new ArrayBuffer(1));
  const appendedBuffer = new ArrayBuffer(
    fileContent.length + byteUint8Array.length
  );
  const appendedTypedArray = new Uint8Array(appendedBuffer);

  appendedTypedArray.set(fileContent, 0);
  appendedTypedArray.set(byteUint8Array, fileContent.length);

  return appendedTypedArray;
};

const binaryStringUtF8Conversion = (typedArray: Uint8Array): string => 
{
  let storageString = "";
  const view: DataView = new DataView(typedArray.buffer);

  [...typedArray].forEach((item: number, index: number) => {
    const addedString = (storageString += view.getUint8(index).toString(2));
    return addedString;
  });

  return storageString;
};

export { convertToBase64, convertToBinaryString };
