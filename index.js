const request = require('request');
const chalk = require('chalk');
const fs = require('fs');

const config = require('./config.json');

fs.writeFileSync('Data/invalid.txt', '');
fs.writeFileSync('Data/verified.txt', '');
fs.writeFileSync('Data/unverified.txt', '');

const tokens = fs.readFileSync('tokens.txt', 'utf-8').replace(/\r/gi, '').split("\n");

var invalid = [];
var verified = [];
var unverified = [];

class Checker {
    constructor(token) {
        this.token = token;
    }
    check() {
        request({
            method: "GET",
            url: "https://discordapp.com/api/v7/users/@me",
            headers: {
                authorization: this.token
            }
        }, (error, response, body) => {
            if (!body) return;
            var json = JSON.parse(body);
            if (!json.id) {
                invalid.push(this.token);
                fs.appendFile('Data/invalid.txt', this.token + "\n", (err) => {
                    if (err) throw err;
                });
            } else if (!json.verified) {
                unverified.push(this.token);
                fs.appendFile('Data/unverified.txt', this.token + "\n", (err) => {
                    if (err) throw err;
                });
            } else {
                verified.push(this.token);
                fs.appendFile('Data/verified.txt', this.token + "\n", (err) => {
                    if (err) throw err;
                });
            }
            console.clear();
            var text = "";
            
console.log("");
console.log((chalk.magenta(`                @@@@@@@@@@    @@@@@@   @@@@@@@   @@@@@@@@   @@@@@@   @@@@@@@   @@@@@@@   @@@@@@@@  @@@@@@@`))); 
console.log((chalk.magenta(`                @@@@@@@@@@@  @@@@@@@@  @@@@@@@  @@@@@@@@@  @@@@@@@@  @@@@@@@@  @@@@@@@@  @@@@@@@@  @@@@@@@@`))); 
console.log((chalk.magenta(`                @@! @@! @@!  @@!  @@@    @@!    !@@        @@!  @@@  @@!  @@@  @@!  @@@  @@!       @@!  @@@`))); 
console.log((chalk.magenta(`                !@! !@! !@!  !@!  @!@    !@!    !@!        !@!  @!@  !@!  @!@  !@!  @!@  !@!       !@!  @!@ `))); 
console.log((chalk.magenta(`                @!! !!@ @!@  @!@!@!@!    @!!    !@! @!@!@  @!@  !@!  @!@!!@!   @!@  !@!  @!!!:!    @!@!!@!`))); 
console.log((chalk.magenta(`                !@!   ! !@!  !!!@!!!!    !!!    !!! !!@!!  !@!  !!!  !!@!@!    !@!  !!!  !!!!!:    !!@!@!`))); 
console.log((chalk.magenta(`                !!:     !!:  !!:  !!!    !!:    :!!   !!:  !!:  !!!  !!: :!!   !!:  !!!  !!:       !!: :!!`))); 
console.log((chalk.magenta(`                :!:     :!:  :!:  !:!    :!:    :!:   !::  :!:  !:!  :!:  !:!  :!:  !:!  :!:       :!:  !:!`))); 
console.log((chalk.magenta(`                :::     ::   ::   :::     ::     ::: ::::  ::::: ::  ::   :::   :::: ::   ::       ::   :::`))); 
console.log((chalk.magenta(`                 :      :     :   : :     :      :: :: :    : :  :    :   : :  :: :  :    :         :   : :`))); 
console.log("");
console.log("");
console.log((chalk.magenta(`                                                   Crée par MatgordFR#1805 !`)));  
console.log((chalk.magenta(`                                                     © 2022 Matgord, Inc.`))); 
console.log("");
console.log((chalk.magenta(`                                       PayPal: https://www.paypal.com/paypalme/matgord`)));   
console.log((chalk.magenta(`                                           Twitter: https://twitter.com/MatgordFR`)));   
console.log((chalk.magenta(`                                            Github: https://github.com/MatgordFR`)));   
console.log("");
console.log("");
console.log("");

text += chalk.red(`Invalid: ${invalid.length}`);
text += chalk.blue(" | ");
text += chalk.yellow(`Unverified: ${unverified.length}`);
text += chalk.blue(" | ");
text += chalk.green(`Verified: ${verified.length}`);

var title = `Discord Token Verification`;
            log(text, title);
        });
    }
}

function log(text, title) {
    if (process.platform == 'win32') {
        process.title = title;
    } else {
        process.stdout.write('\x1b]2;' + title + '\x1b\x5c');
    }
    console.log(text);
}

var i = 0;
setInterval(() => {
    if (i >= tokens.length) {
        console.log((chalk.gray(`Vérification des Token discord terminée!`)));   
        process.exit(1);
    }
    Bot.check(tokens[i]);
    i++;
}, config.timeout);


const Bot = {
    check: function(token) {
        new Checker(token).check();
    }
};

module.exports = Bot;