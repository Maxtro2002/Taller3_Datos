import sql from 'mssql';

const dbSettings = {
    user:'gestion',
    password:'123456789',
    server:'localhost',
    database:'asientos',
    options:{
        encrypt: true, // for azure
        trustServerCertificate: true, // change to true for local dev / self-signed certs
    },
}

export async function getConnection() {
    try {
        const pool = await sql.connect(dbSettings);
        return pool;
    } catch (error) {
        console.log(error);
    }
}

export {sql};