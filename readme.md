# Directory Encryptor

## Requirements:
* Have node.js and npm latest version installed on your system [Guide](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
* Install all npm modules that are required. Follow the steps below to install the npm modules.
---
## Steps:
* Open terminal and go to folder location where you downloaded the codes of dirEncryptor using `cd fileLocation`.
* Now use `npm i` to install all required packages.
* To install the other required packages for encryptor and decryptor we need to use `cd /edtor` to enter in edtor directory and use `npm i` again.
* Again go back to the main directory of the project and use `node app.js` and answer the asked questions to encrypt or decrypt anything.
---
## Conclusion:
* We can easily encrypt or decrypt any folder or file but it has a limitation/problem that I am facing, i.e. if you try to decrypt a file/folder with wrong password then you may face some issues.
* We can use any other modules for accepting user input.
* If we want to use `import * as folderEncrypt from 'folder-encrypt';` for encrypting or decrypting anything then we must need to use a different package.json and add `"type": "module"` to make it work otherwise it will throw error.
* The encrypted file that is generated can't be executed or unzipped/decrypted by any other software(WinRAR,tar,Gzip,etc).
