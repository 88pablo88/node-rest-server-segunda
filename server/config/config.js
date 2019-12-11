/*el objeto global procees que corre a lo largo de toda la aplicacion de node */

process.env.PORT = process.env.PORT || 3000;


/* entorno */

process.env.NODE_ENV = process.env.NODE_ENV || 'dev'


/*base de datos */

let urlDB;



if (process.env.NODE_ENV === 'dev') {

    urlDB = 'mongodb://localhost:27017/cafe'

} else {

    urlDB = process.env.MONGO_URI //Variable de entorno configurada en la terminal
}


process.env.URLDB = urlDB;