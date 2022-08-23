# DEMO CLI

A CLI Project that will attempt to create a useful utility for various conversion of values to common types used in every day development.
### Example Value Type Utilities
- String to Base64
- String to binary string representation
- String to binary string with added byte delimiter
- Byte Array, UInt8Array decoded to string
- Byte array, UInt8Array with delimiter to string
- And many more... !

### Project Intentions
The primary purpose is to work on producing a useful utility CLI for everyday user utilities. At the same time its an opportunity for me to learn more about producing a npm package. It would be great if something useful for multiple developers arose out of this project

### Running CLI locally
For simulating the project I would recommend cloning the repo and then using npm link in the base directory. You will be able to run the CLI with the *demo* command in your terminal. The other option is running the index file using node i.e *node index.js {filePath} {command} {optionalCommand}*

  #### Some Command Options
    demo {filepath} --binary          // binary string representation of string content.
    demo {filepath} --binary -d       // binary string representation of string content with added empty byte delimiter.
    demo {filepath} --base64          // base64 of string content.
