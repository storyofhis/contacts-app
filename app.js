const { string } = require("yargs");
const yargs = require("yargs");
const { simpanContact } = require("./contacts");

yargs.command(
    {
        command: `add`,
        describe: `Menambahkan Contact Baru`,
        builder: {
            name: {
                describe: `Nama Lengkap`,
                demandOption: true,
                type: 'string',
            },
            email: {
                describe: `Email`,
                demandOption: false,
                type: 'string',
            }, 
            nohp: {
                describe: `Nomor Handphone`,
                demandOption: false,
                type: 'string',
            }
        },
        handler: function (argv) {
            const contact = {
                name : argv.name,
                email : argv.email,
                noHP : argv.nohp
            }; 
            simpanContact(
                argv.name,
                argv.email,
                argv.nohp
            )
            console.log(contact);
        }
    }
); 

yargs.parse();

// const command = process.argv[2];
// if (command === `add`) {

// }else if (command === `remove`){

// }else if (command === `list`) {

// }



// const {tulisPertanyaan, simpanContact} = require(`./contacts`);

// const main = async () => {
//     const name = await tulisPertanyaan(`Masukkan nama anda : `);
//     const email = await tulisPertanyaan(`Masukkan Email anda : `);
//     const noHP = await tulisPertanyaan(`Masukkan no Hp anda : `);

//     simpanContact(name, email, noHP);
// }

// main()