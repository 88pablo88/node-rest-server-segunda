/*el objeto global procees que corre a lo largo de toda la aplicacion de node */

process.env.PORT = process.env.PORT || 3000;


/* entorno */

process.env.NODE_ENV = process.env.NODE_ENV || 'dev'


/*base de datos */

let urlDB;

if (process.env.NODE_ENV = 'dev') {

    urlDB = 'mongodb://localhost:27017/cafe'

} else {

    urlDB = 'mongodb+srv://Pablo:Wx3ON6uANP5ThksD@cluster0-q2ikz.mongodb.net/cafe'
}


process.env.URLDB = urlDB;