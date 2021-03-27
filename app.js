const fs = require('fs');
const prompt = require('prompt-sync')();
var childProcess = require('child_process');
let isErr = false;

const name = prompt('What is your code folder/encrypted file name? - ');
if (fs.existsSync(name)) {
    if (name.endsWith("encrypted")) {
        const pass = prompt('What should be password? - ');
        if (fs.existsSync(`./edtor/decrypt.js`)) {
            fs.rmdirSync(`./edtor/decrypt.js`, { recursive: true });
        }
        var decrypt = fs.createWriteStream(`./edtor/decrypt.js`, {
            flags: 'a'
        });
        decrypt.write(`import * as folderEncrypt from 'folder-encrypt';\n`
            + `folderEncrypt.decrypt({\n`
            + ` password: '${pass}',\n`
            + ` input: '${name}',\n`
            + ` output: '${name.replace(".encrypted", "")}'\n`
            + `}).then(() => {\n`
            + ` console.log('Decrypted!');\n`
            + `}).catch((err) => {\n`
            + ` console.log(err);\n`
            + `});`);

        runScript('./edtor/decrypt.js', function (err) {
            if (err) {
                throw err;
            }
            //fs.rmdirSync(`./${name}`, { recursive: true });
            //fs.rmdirSync(`./edtor/decrypt.js`, { recursive: true });

        });
    }
    else {
        const pass = prompt('What should be password? - ');
        if (fs.existsSync(`./edtor/encrypt.js`)) {
            fs.rmdirSync(`./edtor/encrypt.js`, { recursive: true });
        }
        var encrypt = fs.createWriteStream(`./edtor/encrypt.js`, {
            flags: 'a'
        });
        encrypt.write(`import * as folderEncrypt from 'folder-encrypt';\n`
            + `folderEncrypt.encrypt({\n`
            + ` password: '${pass}',\n`
            + ` input: 'codes',\n`
            + ` output: 'codes.encrypted'\n`
            + `}).then(() => {\n`
            + ` console.log('Encrypted!');\n`
            + `}).catch((err) => {\n`
            + ` console.log(err);\n`
            + `});`);

        runScript('./edtor/encrypt.js', function (err) {
            if (err) throw err;
            fs.rmdirSync(name, { recursive: true });
            fs.rmdirSync(`./edtor/encrypt.js`, { recursive: true });
        });
    }
}
else {
    console.log(`${name} doesn't exists.`);
}

function runScript(scriptPath, callback) {

    // keep track of whether callback has been invoked to prevent multiple invocations
    var invoked = false;

    var process = childProcess.fork(scriptPath);

    // listen for errors as they may prevent the exit event from firing
    process.on('error', function (err) {
        if (invoked) return;
        invoked = true;
        callback(err);
    });

    // execute the callback once the process has finished running
    process.on('exit', function (code) {
        if (invoked) return;
        invoked = true;
        var err = code === 0 ? null : new Error('exit code ' + code);
        callback(err);
    });

}