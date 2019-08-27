const Discord = require('discord.js');
const Bot = new Discord.Client();

const Token = "";

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
          db.run(`INSERT INTO listing(name, id) VALUES(?, ?)`, [msg.author.username, msg.author.id],  function(err) {
            if (err) {
              return console.log(err.message);
            }
            msg.channel.send('You have sucessfully signed up (this means nothig right now as this function is still in development')
            console.log(`A row has been inserted into listing with rowid ${this.lastID}`);
          });
          
           
          db.close();
      break;
      case 'list':
                  
      break;
      case 'register':
          
        let reg = "SELECT ID FROM InGameNames WHERE ID = "+ msg.author.id
        
        db.all(reg, function(err, player) {
          console.log(player)
          if (err) {
            return console.log(err.message);
          }
          
          if(player.length > 0){
            console.log(`user `+ msg.author.username + ` allredy exists`);
            msg.channel.send('You have allready registered your in game name with me')
          }else{
            console.log(`user dosent allredy exists`);
            if(args[1]){
              msg.guild.members.fetch;
              db.run(`INSERT INTO InGameNames(IGN, ID) VALUES(?, ?)`, [args[1], msg.author.id],  function(err) {
                if (err) {
                  return console.log(err.message);
                }
                msg.channel.send('You have sucessfully registered your in game name with me')
                console.log(`A row has been inserted into InGameNames with rowid ${this.lastID}`);
              });
          }else{
              msg.channel.send('please include your username. An example of how to use this command is ?register NullByte')
          } 
          }
        });
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
        case "sendnewts" :
        var pet = Math.floor(Math.random() * 10);
            msg.reply({files:[__dirname + "/liz/" + pet + ".jpg"]})
            
            console.log("the lizard number was " + pet);
        break;
        case "showthelizard" :
        var pet = Math.floor(Math.random() * 10);
            msg.reply({files:[__dirname + "/liz/" + pet + ".jpg"]})
            
            console.log("the lizard number was " + pet);
        break;
    };

   });

   Bot.on('message', msg=>{
    
   });

Bot.login(Token).catch(console.error);
