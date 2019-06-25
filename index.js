const Discord = require('discord.js');
const Bot = new Discord.Client();

const Token = 'NTc3MjkzMzE5MjE5MTgzNjM4.XOmoCg.pI1biNHSYMACWaPmRpDsvmK7llg';

const Prefix = '?';

require('log-timestamp');

const sqlite3 = require('sqlite3').verbose();

Bot.on('ready', () => {
    console.log("Bot online");

    let db = new sqlite3.Database('./db/players.db', (err) => {
      if (err) {
        console.error(err.message);
      }
   })
  });
   Bot.on('message', msg=>{
    let args = msg.content.substring(Prefix.length).split(" ")

    let db = new sqlite3.Database('./db/players.db', sqlite3.OPEN_READWRITE, (err) => {
      if (err) {
        console.error(err.message);
      }
      console.log('Connected to the player database.');
      
    });

    switch(args[0]){
      case 'signup':
          db.run(`INSERT INTO listing(name) VALUES(?)`, [msg.author.username], function(err) {
            if (err) {
              return console.log(err.message);
            }
            // get the last insert id
            console.log(`A row has been inserted with rowid ${this.lastID}`);
          });
         
          // close the database connection
          db.close();
      break;
      case 'list':

      break;
      case 'clear':
        
      break;  
    };

   });

Bot.login(Token);