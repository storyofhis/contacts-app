const { string } = require("yargs");
const yargs = require("yargs");
const { simpanContact, listContact, detailContact, deleteContact } = require("./contacts");

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
).demandCommand();

// menampilkan data contacts
yargs.command({
    command: 'list',
    describe: 'Menampilkan data contacts',
    handler() {
        listContact()
    }
})

// menampilkan detail dari sebuah contacts
yargs.command({
    command: `detail`,
    describe: `Menampilkan detail dari sebuah contact berdasarkan nama : `,
    builder: {
        name: {
            describe: `Nama Lengkap`,
            demandOption: true,
            type: `string`,
        }
    },
    handler(argv) {
        detailContact(argv.name)
    }
})

// menghapus contact berdasarkan nama
yargs.command({
    command: `delete`,
    describe: `Menghapus Contact berdasarkan Nama`,
    builder: {
        name: {
            describe: `Nama Lengkap`,
            demandOption: true,
            type: `string`,
        }
    },
    handler(argv){
        deleteContact(argv.name);
    }
})
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