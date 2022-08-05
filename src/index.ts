#!/usr/bin/env node
import fs from 'fs/promises';
import {commandLineOptions, cliOptions} from "./commandLineOptions.js";
import CentralCommand from './CentralCommand.js';

const fileName:string = process.argv[2];
const optionsArgument:string = process.argv[3];
const optionsAddedAttribute:string = process.argv[4];

try
{
        let file:Promise<string> = fs.readFile(fileName, {encoding: "utf-8"});
        let stringFromFile = await file;
        let formattedSecondArgument:string = optionsAddedAttribute ? 
            `${optionsArgument.toLowerCase().trim()} ${optionsAddedAttribute.toLowerCase().trim()}`: optionsArgument.toLowerCase();
            
        const options:cliOptions = commandLineOptions(formattedSecondArgument);
        const commandCenter = CentralCommand.GetInstance(options);
        
        const userRequestOutput = commandCenter.ProcessRequest(stringFromFile);
        console.log(userRequestOutput);
}
catch(error:unknown)
{
    let message:string = "";

    if(error instanceof Error) message = error.message;
    
    if(message.includes('properties') && message.includes('undefined'))
    {
        console.error("improper property flag.")
    }
    else
    {
        console.error(message);
    }
}


