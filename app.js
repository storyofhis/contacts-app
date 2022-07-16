const { rejects } = require('assert');
const fs = require('fs');
const { resolve } = require('path');

// menuliskan string ke file secara synchronous
// try{
//     fs.writeFileSync('test.txt', 'Hello World! secara synchronous');
// }catch(e){
//     console.log(e)
// }

// menuliskan string ke file secara asynchronous
// fs.writeFile('test.txt', 
//     'Hello World secara asynchronous', 
//     (error) => {
//         console.log(error);
//     }
// )

// membaca file secara synchronous
// const data = fs.readFileSync('test.txt', 'utf-8');
// console.log(data.toString()); // tidak perlu menggunakan toString() karena menggunakan utf-8
// console.log(data);

// membaca file secara asynchronous
// const path = `test.txt`;
// const encode = `utf-8`;
// fs.readFile(path, encode, (error, data) => {
//     if (error) throw error;
//     console.log(data);
// })

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

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

const ask1 = () => {
    return new Promise((resolve, rejects) => {
        rl.question(`Masukkan nama anda : `, (name) => {
            resolve(name)
        })
    })
}

const ask2 = () => {
    return new Promise((resolve, rejects) => {
        rl.question(`Masukkan email anda : `, (email) => {
            resolve(email)
        })
    })
}

const main = async () => {
    const name = await ask1()
    const email = await ask2()
    const contact = {
        nama: name,
        email: email,
    }
    const file = fs.readFileSync('./data/contacts.json', 'utf-8');
    const contacts = JSON.parse(file); // string menjadi json

    contacts.push(contact);

    fs.writeFileSync('./data/contacts.json', JSON.stringify(contacts));
    console.log("Terimakasih Sudah Mengisi");
    rl.close();
}

main()
// rl.question(`Masukkan nama anda : `, (name) => {
//     rl.question(`Masukkan umur anda : `, (umur) => {
//         const contact = {
//             nama: name,
//             age: umur,
//         }
//         const file = fs.readFileSync('./data/contacts.json', 'utf-8');
//         const contacts = JSON.parse(file); // string menjadi json

//         contacts.push(contact);

//         fs.writeFileSync('./data/contacts.json', JSON.stringify(contacts));
//         console.log("Terimakasih Sudah Mengisi");
//         rl.close();
//     })
// });