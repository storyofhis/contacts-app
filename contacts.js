// const { rejects } = require('assert');
const fs = require('fs');
// const { resolve } = require('path');
// const readline = require('readline');
 
// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
// });

// membuat folder data
const dirPath = `./data`;
if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
}

// membuat file contacts.json jika belom ada 
const dataPath = `./data/contacts.json`;
if (!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, '[]', 'utf-8');
}


// const tulisPertanyaan  = (pertanyaan) => {
//     return new Promise((resolve, reject) => {
//         rl.question(pertanyaan, (tanya) =>{ 
//             resolve(tanya)
//         })
//     })
// }

const simpanContact = (name, email, noHP) => {
    const contact = {
        name, email, noHP
    } 
    const fileBuffer = fs.readFileSync('data/contacts.json', 'utf-8');
    const contacts = JSON.parse(fileBuffer); // string menjadi json

    // cek duplikat
    const duplikat = contacts.find((contact) => contact.name === name);
    if (duplikat !== undefined && duplikat) {
        console.log(`${duplikat.name} sudah terdaftar gunakan nama yang lain !!!`);
        return false;
    }
    contacts.push(contact); 

    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));
    console.log("Terimakasih Sudah Mengisi");
    // rl.close();
    
}

module.exports = {simpanContact};
