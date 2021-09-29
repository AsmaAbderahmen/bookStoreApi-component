# bookStoreApi-component
RestFullAPI based  on components architecture 


# project

The project contains sveral files and directories:
    #index.js: the entry point of the project
    #package.json : the heart of the project wish contain all its dependencies and dev-dependencies
    #component-generator: a script file to automatically generate components based on .template directory
    #.template : directory that contains the general structure for the project components
    #.components : directory that contains generated component, each component is a directory with its name 


# Usage

Choose the main branch in this repository to get the code.

Install all dependencies
```sh
npm install 
```
test the project
```sh
npm run test
```

Run the server on the dev mode
```sh
npm run start
```
main path
```sh
http://localhost:3000

```
test the server
```sh
http://localhost:3000/test

```

link to the project documentaion
```sh
http://localhost:3000/bookStore/api/documentation/#/

```


# Other

generate a new component in a git bash terminal run the following command
```sh
sh component-generator nameOfTheComponent
```
