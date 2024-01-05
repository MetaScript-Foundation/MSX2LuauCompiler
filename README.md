# MSX2LuauCompiler
Copyright 2024 MetaScript Foundation, a subsidary of MetaTable Games. All Rights reserved.
Copyright 2024 MetaTable Games. All Rights reserved.

MetaScript Raw (MSRAW) to Luau Compiler. MPM (MetaScript Package Manager) packages are not supported. This is primarily for converting MSX to Luau, however this convertor only supports MSRAW, therefore you must use MSX2MSRAW to convert MSX to MSRAW.

Is this scuffed? Yes
Will it be actively fixed? Prob not, contributors are welcomed.

## Prerequisites
Before you begin, ensure you have the following installed:
- [MSX2MSRAW](https://github.com/MetaScript-Foundation/MSX2MSRAW)
- [Node.js](https://nodejs.org/)
- [TypeScript](https://www.typescriptlang.org/)

## Installation / Usage
1. Clone the repository:

   ```bash
   git clone https://github.com/MetaScript-Foundation/MSX2LuauCompiler.git
   ```
2. Building binaries:
   
   ```bash
   cd MSX2LuauCompiler
   npm i
   tsc convert.ts
   node convert.js
   ```
3. Follow instructions within CLI