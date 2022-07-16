// const { rejects } = require('assert');
const fs = require('fs');
const validator = require(`validator`);
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

const loadContact = () => {
    const fileBuffer = fs.readFileSync('data/contacts.json', 'utf-8');
    const contacts = JSON.parse(fileBuffer); // string menjadi json
    
    return contacts
}

const simpanContact = (name, email, noHP) => {
    const contact = {
        name, email, noHP
    } 
    // const fileBuffer = fs.readFileSync('data/contacts.json', 'utf-8');
    // const contacts = JSON.parse(fileBuffer); // string menjadi json
    const contacts = loadContact();

    // cek duplikat
    const duplikat = contacts.find((contact) => contact.name === name);
    if (duplikat !== undefined && duplikat) {
        console.log(`${duplikat.name} sudah terdaftar gunakan nama yang lain !!!`);
        return false;
    }
    contacts.push(contact);
    
    // cek email
    if (email) {
        if (!validator.isEmail(email)){
            console.log(`${email} tidak valid !!!`);
            return false;
        }
    }

    // cek no hp
    if (noHP) {
        if (!validator.isMobilePhone(noHP, `id-ID`)) {
            console.log(`${noHP} tidak valid !!! `);
            return false;
        }
    }

    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));
    console.log("Terimakasih Sudah Mengisi");
    // rl.close();
    
}

const listContact = () => {
    const contacts = loadContact();
    console.log(`Daftar Contact : `)
    contacts.forEach((contact, index) => {
        console.log(`${index + 1}. ${contact.name} - ${contact.email} - ${contact.noHP}`)
    });
}

const detailContact = (name) => {
    const contacts = loadContact();

    const contact = contacts.find((param) => param.name.toLowerCase() === name.toLowerCase());
    if (!contact){
        console.log(`${name} tidak ditemukan !!!`);
        return false;
    }

    console.log(`${contact.name}`);
    console.log(`${contact.noHP}`);
    contact.email ? console.log(`${contact.email}`) : console.log(`anda tidak mengisi email`);
}

const deleteContact = (name) => {
    const contacts = loadContact();
    
    const newContacts = contacts.filter((param) => param.name.toLowerCase() !== name.toLowerCase());
    if (contacts.length === newContacts.length) {
        console.log(`${name} tidak ditemukan !!!`);
        return false;
    }

    fs.writeFileSync(`data/contacts.json`, JSON.stringify(newContacts));
    console.log(`data dengan contact ${name} berhasil dihapus !!!`);
}
module.exports = {simpanContact, listContact, detailContact, deleteContact};
