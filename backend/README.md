# This app is the core of all other musdey.cloud projects

We use TypeScript as the main language, node as the main runtime environment and jest as the main test framework

### To setup the project & environment follow this website

https://khalilstemmler.com/blogs/typescript/node-starter-project/

This are the steps that are followed

#### Setup node & typescript

1. yarn init -y
2. yarn add -D typescript @types/node ts-node nodemon
3. npx tsc --init --rootDir src --outDir build \
   --esModuleInterop --resolveJsonModule --lib es6 \
   --module commonjs --allowJs true --noImplicitAny true
4. mkdir src
5. touch src/index.ts

#### Setup nodemon

6. touch nodemon.json
7. add this to nodemon.json :{
   "watch": ["src"],
   "ext": ".ts,.js",
   "ignore": [],
   "exec": "ts-node ./src/index.ts"
   }
8. Add "develop":"nodemon" to package.json script
9. Add "build":"tsc to package.json script

#### Setup ESLINT

10. yarn add -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
11. touch .eslint
12. Copy this {
    "root": true,
    "parser": "@typescript-eslint/parser",
    "plugins": [
    "@typescript-eslint"
    ],
    "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended"
    ]
    }
13. Touch .eslintignore and add build and node_modules into it

#### Setup Express

1. yarn add express
2. yarn add -D @types/express
3. index.ts -> const express = import \* from express
4. Create routes folder with some routes files
