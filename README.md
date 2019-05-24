## SmartContract Workshop
The starter code for the next NEO-ONE SmartContract Workshop.  This repo contains a simple Token SmartContract under `one/contracts/Token.ts` and tests of that Token running on a private, local NEO blockchain under `src/__tests__/Token.test.ts`.  The goal of this workshop will be to flesh out this Token by adding your own features to it.

### Requirements

- Install NodeJs >= 8.9.0. Note I have used version 10.13 for this project.
    - For Linux & Mac we recommend [Node Version Manager](https://github.com/nvm-sh/nvm#installation-and-update).
    - For Windows we recommend using [Chocolatey](https://chocolatey.org/).
- The npm package manager comes with NodeJs and can be used to run commands. I will be using [yarn](https://yarnpkg.com/en/). Feel free to use whatever you prefer.

### Confirm the Token Works
If you'd like to build the Token yourself, we encourage you to head to [neo-one.io](https://neo-one.io) and complete the first online course or the tutorial which walk through the construction of this basic Token SmartContract. If not, this repo and the below instructions are all you need to participate in the upcoming workshop!.  

1. Fork and clone this repository.
2. cd into the newly created `token-workshop` directory.
3. `yarn install` or `npm install` to load all dependencies.
4. `yarn neo-one build` or `npm neo-one build` will start a neo-one local blockchain, deploy the Token contract contained in `one/contracts/Token.ts` to the blockchain, and setup some helper utilities for working with the Token.  You should see a series of green checks if the command succeeds. 
5. `yarn test` or `npm test` will test your Token on a local blockchain by running the tests in `src/__tests__/Token.test.ts`.  You should see four green checks if the tests pass.
6.  That's it! If you've made it this far you have a working token smart contract and are ready to add more.  If you have problems with any of the above steps, please feel free to look through our tutorials and documentation at [neo-one.io](https://neo-one.io) or reach our to us with questions on our [NEO-ONE Discord](https://discordapp.com/invite/S86PqDE). 

