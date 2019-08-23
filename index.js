const Discord = require('discord.js');
const Bot = new Discord.Client();

const Token = 'NTc3MjkzMzE5MjE5MTgzNjM4.XOmoCg.pI1biNHSYMACWaPmRpDsvmK7llg';

const Prefix = '?';

const Prefix2 = "It's";

require('log-timestamp');

const sqlite3 = require('sqlite3').verbose();

var heartbeats = require('heartbeats');
var heart = heartbeats.createHeart(1000);
Bot.on('ready', () => {
    console.log("Bot online");

    let db = new sqlite3.Database('./db/players.db', (err) => {
      if (err) {
        console.error(err.message);
      }
   })
   heart.createEvent(300, function(count, last){
    console.log('My heart is still beating');
  });
  heart.createEvent(1800, function(count, last){
    Bot.channels.get("594960312327733258").send("this is my my half hourly alive checkin")    
  });
  });
   Bot.on('message', msg=>{
    let args = msg.content.substring(Prefix.length).split(" ")

    let prospect = msg.guild.roles.find(r => r.name === "prospect");
    let member = msg.member;
    let db = new sqlite3.Database('./db/players.db', sqlite3.OPEN_READWRITE, (err) => {
      if (err) {
        console.error(err.message);
      }
      //console.log('Connected to the player database.');
      
    });

    switch(args[0]){
      case 'signup':
          msg.guild.members.fetch;
          db.run(`INSERT INTO listing(name) VALUES(?)`, [msg.author.username], function(err) {
            if (err) {
              return console.log(err.message);
            }
            msg.channel.send('You have sucessfully signed up (this means nothig right now as this function is still in development')
            console.log(`A row has been inserted with rowid ${this.lastID}`);
          });
         
           
          db.close();
      break;
      case 'list':
                  
      break;
      case 'clear':
          db.run(`DELETE FROM listing `, function(err) {
            if (err) {
              return console.log(err.message);
            }
            msg.channel.send('You have sucessfully cleared the list')
            console.log(`listing cleared`);
          });
         
           
          db.close();
      break;  
      case 'Interested' :
        msg.guild.members.fetch;  
        member.addRole(prospect).catch(console.error);
        msg.channel.send('You now have the prospect role')
        console.log(member + msg.author.username + ' prospect added');
              
      break;
      case 'Uninterested' :
      msg.guild.members.fetch;  
      member.removeRole(prospect).catch(console.error);
        msg.channel.send('You no longer have the prospect role')
        console.log(member + msg.author.username + ' prospect removed');
      break;
      case 'interested' :
        msg.guild.members.fetch;  
        member.addRole(prospect).catch(console.error);
        msg.channel.send('You now have the prospect role')
        console.log(member + msg.author.username + ' prospect added');
              
      break;
      case 'uninterested' :
      msg.guild.members.fetch;  
      member.removeRole(prospect).catch(console.error);
        msg.channel.send('You no longer have the prospect role')
        console.log(member + msg.author.username + ' prospect removed');
      break;
      case 'connect':
        if(msg.member.voiceChannel){
            if (!msg.guild.voiceConnection)
            {
            msg.member.voiceChannel.join()
                .then(connection =>{
                    msg.reply('JOINED!');
                })
            }
        }else{
            msg.reply('You need to be in a voice channle to force me to join you.');
        }
        break;
        case 'disconnect':
        if(msg.guild.voiceConnection){
            msg.guild.voiceConnection.disconnect();
        }else{
            msg.reply('YOU CAN NOT MAKE ME LEAVE IF I WAS NEVER THERE!')
        }
        break;
    };

   });

   Bot.on('message', msg=>{
    
   });

Bot.login(Token).catch(console.error);