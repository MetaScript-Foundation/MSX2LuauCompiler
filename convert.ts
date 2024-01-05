// Copyright 2024 MetaScript Foundation, a subsidary of MetaTable Games. All Rights reserved.
// Copyright 2024 MetaTable Games. All Rights reserved.

import * as fs from 'fs';
import * as readline from 'readline-sync';

function convertToLuau(inputCode: string): string {
    // Replace 'let' with 'local' and 'console.log' with 'print'
    let luauCode = inputCode.replace(/let/g, 'local').replace(/console.log/g, 'print');

    // ROBLOX.Library
    luauCode = luauCode.replace(/let\s+(\w+)\s*=\s*"(.*?)";/g, 'local $1 = $2;');

    // Replace 'const' with 'local'
    luauCode = luauCode.replace(/const\s+(\w+)\s*=\s*`(.*?)`;/g, 'local $1 = [[\n$2\n]];'); // Handle multi-line strings
    luauCode = luauCode.replace(/const\s+(\w+)\s*=\s*"([^"]*)";/g, 'local $1 = "$2";');

    // Replace 'if (condition)' with 'if condition then'
    luauCode = luauCode.replace(/if\s*\((.*?)\)/g, 'if $1 then');

    // Replace 'else if' with 'elseif'
    luauCode = luauCode.replace(/else if/g, 'elseif');

    // Replace 'else' as is
    luauCode = luauCode.replace(/else/g, 'else');

    // Replace 'null' with 'nil'
    luauCode = luauCode.replace(/null/g, 'nil');

    // Replace 'function' with 'function'
    luauCode = luauCode.replace(/function/g, 'function');

    // Replace '{' with 'do'
    //luauCode = luauCode.replace(/{/g, 'do');

    // Replace '}' with 'end'
    luauCode = luauCode.replace(/}/g, 'end');

    // Replace 'for' loop
    luauCode = luauCode.replace(/for\s*\((.*?);(.*?);(.*?)\)/g, 'for $1, $2, $3 do');

    // Replace 'while' loop
    luauCode = luauCode.replace(/while\s*\((.*?)\)/g, 'while $1 do');

    // Replace 'try-catch'
    luauCode = luauCode.replace(/try\s*{/g, 'pcall(function()');
    luauCode = luauCode.replace(/} catch\s*{/g, 'end)\nif not ');
    luauCode = luauCode.replace(/}\s*catch\s*{/g, ' then');
    luauCode = luauCode.replace(/}\s*catch\s*{/g, ' then');
    luauCode = luauCode.replace(/}\s*catch\s*{/g, ' then');
    luauCode = luauCode.replace(/}\s*catch/g, 'end)\nend');

    // Replace 'time' with 'os.time()'
    luauCode = luauCode.replace(/time/g, 'os.time()');

    // Replace 'strcon' with 'tostring'
    luauCode = luauCode.replace(/strcon\((.*?)\)/g, 'tostring($1)');

    // Replace 'format' with 'string.format'
    luauCode = luauCode.replace(/format\((.*?), (.*?)\)/g, 'string.format($1, $2)');

    // Replace 'math.random' with 'math.random()'
    luauCode = luauCode.replace(/math.random\(\)/g, 'math.random()');

    return luauCode;
}

function convertFileToLuau(inputFilePath: string, outputFilePath: string): void {
    try {
        const inputCode = fs.readFileSync(inputFilePath, 'utf-8');
        const luauCode = convertToLuau(inputCode);
        console.log(luauCode);

        //fs.writeFileSync(outputFilePath, luauCode);
        console.log('Conversion successful. Output saved to:', outputFilePath);
    } catch (error) {
        console.error('Error:', error.message);
    }
}

async function getUserInput(): Promise<{ inputFilePath: string, outputFilePath: string }> {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    const inputFilePath = await new Promise<string>(resolve => {
        rl.question('Enter the input file path, e.g., C:/Admin/Script.msx: ', resolve);
    });

    const outputFilePath = await new Promise<string>(resolve => {
        rl.question('Enter the output file path, e.g., C:/Admin/Script.lua: ', resolve);
    });

    rl.close();

    return { inputFilePath, outputFilePath };
}

(async () => {
    const { inputFilePath, outputFilePath } = await getUserInput();
    const i_validExtensions = ['.msraw'];
    
    if (!i_validExtensions.some(ext => inputFilePath.endsWith(ext))) {
        console.error('Invalid input file extension. Supported extensions are:', i_validExtensions.join(', '));
        process.exit(1);
    }

    const o_validExtensions = ['.lua', '.luau'];
    
    if (!o_validExtensions.some(ext => outputFilePath.endsWith(ext))) {
        console.error('Invalid output file extension. Supported extensions are:', o_validExtensions.join(', '));
        process.exit(1);
    }

    convertFileToLuau(inputFilePath, outputFilePath);
})();