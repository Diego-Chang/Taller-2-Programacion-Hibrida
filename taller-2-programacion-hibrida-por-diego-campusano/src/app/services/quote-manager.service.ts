import { Injectable } from '@angular/core';
import { Quote } from '../models/quote';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { Capacitor } from '@capacitor/core';

@Injectable({
  providedIn: 'root'
})
export class QuoteManagerService {

  //Variables needed for starting the DB plugin.
  sqlite: SQLiteConnection = new SQLiteConnection(CapacitorSQLite)
  platform: string = ""
  initiated:boolean = false 
  db!: SQLiteDBConnection
  DB_NAME: string = "quotes_table"
  DB_ENCRYPTION: boolean = false
  DB_MODE: string = "no-encryption"
  DB_VERSION: number = 1
  DB_READ_ONLY: boolean = false

   //Variables that save names of table components.
   COL_ID: string = "id"
   TABLE_NAME: string = "quotes_table"
   COL_QUOTESQL: string = "quote"
   COL_AUTHORSQL: string = "author"

   //String with SQL table creation command.
  DB_SQL_TABLES: string = `
    CREATE TABLE IF NOT EXISTS ${this.TABLE_NAME} (
      ${this.COL_ID} INTEGER PRIMARY KEY AUTOINCREMENT,
      ${this.COL_QUOTESQL} TEXT NOT NULL,
      ${this.COL_AUTHORSQL} TEXT NOT NULL
    );`

  constructor() { }

  async startPlugin() { //DB plugin to initiate DB plugin.
    try {
      console.log("DbService::iniciarPlugin")
      this.platform = Capacitor.getPlatform()
  
      console.log("DbService::iniciarPlugin plataform="+this.platform)
      if(this.platform == "web") {        
        await customElements.whenDefined('jeep-sqlite')        
        const jeepSqliteEl = document.querySelector('jeep-sqlite')
        if(jeepSqliteEl != null) {
          console.log("DbService::iniciarPlugin::initWebStore")
          await this.sqlite.initWebStore()
        }
      }
  
      console.log("sqlite::createConnection()")
      this.db = await this.sqlite.createConnection(
        this.DB_NAME,
        this.DB_ENCRYPTION,
        this.DB_MODE,
        this.DB_VERSION,
        this.DB_READ_ONLY
      )
      console.dir(this.db)    
  
      console.log("db.open()")      
      const ret = await this.sqlite.checkConnectionsConsistency()
      const isConn = (await this.sqlite.isConnection(this.DB_NAME, this.DB_READ_ONLY)).result;      
      if (ret.result && isConn) {
        this.db = await this.sqlite.retrieveConnection(this.DB_NAME, this.DB_READ_ONLY);
      } else {
        this.db = await this.sqlite.createConnection(this.DB_NAME, this.DB_ENCRYPTION, this.DB_MODE, this.DB_VERSION, this.DB_READ_ONLY);
      }    

      await this.db.open() 
      console.dir(this.db)    
  
      console.log("db.execute(SQL_TABLES)")
      console.log(this.DB_SQL_TABLES)
      await this.db.execute(this.DB_SQL_TABLES)
  
      if(this.platform == "web") {
        console.log("DbService::iniciarPlugin::saveStore()")
        await this.sqlite.saveToStore(this.DB_NAME)
      }
      this.initiated = true 
    } catch(e) {
      console.error(e)
    }


    //Default quotes, manually commented after first insert.

    /*await this.addQuote({id: 0, quote: "Religion is the opiate of the masses", author: "Karl Marx"})
    await this.addQuote({id: 0, quote: "First stop lying, then start speaking the truth", author: "Jordan Peterson"})
    await this.addQuote({id: 0, quote: "Never interrupt your opponent while he is in the middle of making a mistake", author: "Sun Tzu"})*/
    
  }

  async terminateConnection() { //Closes DB connection.
    await this.db.close()
  }

  async addQuote(quoteReceive: Quote) { //Adds a quote to DB based on object Quote received.
    const sqlINSERT = `INSERT INTO ${this.TABLE_NAME}
                      (${this.COL_QUOTESQL}, ${this.COL_AUTHORSQL})
                       VALUES (?, ?)`
    await this.db.run(sqlINSERT, [quoteReceive.quote, quoteReceive.author])
  }

  async getQuoteListRandom(): Promise<Quote> { //Gets a random quote from DB.
    const sqlSELECT = `SELECT * FROM ${this.TABLE_NAME} ORDER BY RANDOM() LIMIT 1`
    const getQuoteListQuery = await this.db.query(sqlSELECT)
    return getQuoteListQuery?.values?.[0] ?? null
  }

  async getQuoteList(): Promise<Quote[]> { //Gets the whole list of quotes on DB.
    const sqlSELECT = `SELECT * FROM ${this.TABLE_NAME}`
    const getQuoteListQuery = await this.db.query(sqlSELECT)
    return getQuoteListQuery?.values ?? []
  }

  async deleteQuote(id: number){ //Deletes a quote from DB based on id received.
    const sqlDELETE = `DELETE FROM ${this.TABLE_NAME} WHERE ${this.COL_ID} = ?`
    await this.db.run(sqlDELETE, [id])
  }
}
