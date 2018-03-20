const Discord = require("discord.js");
const client = new Discord.Client();
const YTDL = require("ytdl-core");
const YTSearch = require("youtube-search");
let prefix = ".";
var servers = {};
var video;

var opts = {
  maxResults: 1,
  key: ' Removed for security '
};

var reddit = require('reddit-joke');
var max = 500;
reddit.joke(max);

function play(connection, message){
  var server = servers[message.guild.id];

  server.dispatcher = connection.playStream(YTDL(server.queue[0], {filter: "audioonly"}));

  server.queue.shift();
  server.dispatcher.on("end", function(){
      if(server.queue[0]) play(connection, message);
      else connection.disconnect();
  });
}

client.login(" Removed for security ");

client.on("ready", () => {
  console.log("https://discordapp.com/oauth2/authorize?client_id=259978576558948352&scope=bot");
  console.log("I am ready!");
});

client.on("message", (message) => {
  // Voice only works in guilds, if the message does not come from a guild,
  // we ignore it
  if (!message.guild) return;

	if(!message.content.startsWith(prefix)) return;

var msgSubstrings = message.content.substring(prefix.length).split(" ");

switch(msgSubstrings[0].toLowerCase()){
    case "test":
        message.channel.send("success!");
        break;
    case "join":
        if (message.member.voiceChannel) {
          message.member.voiceChannel.join()
            .then(connection => { message.reply('I have successfully connected to the channel!'); })
            .catch(console.log);  }
            else { message.reply('You need to join a voice channel first!'); }
        break;

    case "play":
        if(!msgSubstrings[1]){
          message.channel.sendMessage("Add something after " + prefix +"play, to search for and play.");
          return;
        }
        if(!message.member.voiceChannel){
          message.channel.sendMessage("You have to be in a voice channel that I can join!");
          return;
        }
        if(!servers[message.guild.id]) servers[message.guild.id] = {
          queue: []
        };
        server = servers[message.guild.id];

        searchTxt = msgSubstrings.slice(1, msgSubstrings.length).join(" ");
        console.log(searchTxt);
        YTSearch(searchTxt, opts, function(err, results) {
          if(err) return console.log(err);
            video = results[0].link;
            server.queue.push(video);
            console.log(video);
          });



          if(!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection){
              play(connection, message);

        });


        break;
    case "skip":
        var server = servers[message.guild.id];
        if(server.dispatcher) server.dispatcher.end();
        break;
    case "stop":
        var server = servers[message.guild.id];
        server.queue = [];
        if(server.dispatcher) server.dispatcher.end();
        break;
    case "joke":
      message.channel.sendMessage(reddit.joke());
      //console.log(reddit.joke());
    break;
    case "kickdoor":
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    var kick = getRandomInt(1, 20);
      switch(kick) {
      case 0:  message.channel.sendMessage("Rolled a 0. wait... what? This shouldn't be possible."); break;
      case 1:  message.channel.sendMessage("Rolled a 1. The chain reaction of pressure and force upon your joints shatters your entire skeletel frame. Dropping you to the ground in a blob like form."); break;
      case 2:  message.channel.sendMessage("Rolled a 2. Turns out this door is solid Mahogany. You easily break your leg, putting you in a state known by the doctors as Mahagony."); break;
      case 3:  message.channel.sendMessage("Rolled a 3. You break your foot. This door looks really solid, why did you even attempt this? What did this door do to you? You mean door hating person!"); break;
      case 4:  message.channel.sendMessage("Rolled a 4. You go to kick the door, but you slip and fall on your back. Everyone laughts at you. But this is nothing new, is it? You've always been laughed at.. you waste of renewable resources."); break;
      case 5:  message.channel.sendMessage("Rolled a 5. You kick the door. It makes a very loud thud noise. Also, you stubbed your toe. That sucks."); break;
      case 6:  message.channel.sendMessage("Rolled a 6. You kick the door and scratch your new Nikes. Bro those are limited edition Jordans! What are you doing?"); break;
      case 7:  message.channel.sendMessage("Rolled a 7. You kick the door and it opens slightly to a board room of people important looking at you. Wow you must look like an idiot. Who even let you in here?"); break;
      case 8:  message.channel.sendMessage("Rolled a 8. You kick the door half open. Looks like you'll still have to open it like a normal person. weirdo."); break;
      case 9:  message.channel.sendMessage("Rolled a 9. You kick the door mostly open. A slight bump of your shoulder is all you need to enter the room. Good enough I suppose."); break;
      case 10:  message.channel.sendMessage("Rolled a 10. You kick the door open. What? You want a cookie?"); break;
      case 11:  message.channel.sendMessage("Rolled a 11. You kick the door open, and in the process put a small dent in the wall it hits. Wish you payed for that door stopper now huh?"); break;
      case 12:  message.channel.sendMessage("Rolled a 12. You kick the door open slightly scratching the door. ooooo your gonna be in troubleeeee!"); break;
      case 13:  message.channel.sendMessage("Rolled a 13. You kick the door open putting a mild dent in the door. Wow, theres no way you can afford to replace this door. Why did you even do this?"); break;
      case 14:  message.channel.sendMessage("Rolled a 14. You crack the door with your foot as it slams open. Jesus, open the door like a normal person next time!"); break;
      case 15:  message.channel.sendMessage("Rolled a 15. Your foot goes straight through the door! Noone can question your strength. We can, however; question your intelligence. "); break;
      case 16:  message.channel.sendMessage("Rolled a 16. You kick the door breaking the hinge that kept it locked. Fuck locksmiths, I rolled a 16!"); break;
      case 17:  message.channel.sendMessage("Rolled a 17. You kick the door, breaking it off of one of its hinges. It dangles from the frame as you stare at it... Limping in defeat... you monster."); break;
      case 18:  message.channel.sendMessage("Rolled a 18. You kick the door off its hinges, and onto the floor. Anything standing behind it would probably have a minor case of serious brain trauma."); break;
      case 19:  message.channel.sendMessage("Rolled a 19. You kick the door off its hinges, and I mean REALLY kicked it. That door flew 15 feet to the other side of the room and put a crack in the wall. Holy shit."); break;
      case 20:  message.channel.sendMessage("Rolled a 20. The door explodes into saw dust. Everyone in the room is now dead from the sheer force of the blow. This is the last time you are allowed in the nursing home."); break;
    }
    break;
    case "debug":
        YTSearch("test", opts, function(err, results) {
          if(err) return console.log(err);
          message.channel.sendMessage(results[0]);
          console.dir(results[0].link);
        });
        break;
    default:
    message.channel.sendMessage("Invalid Command. If you would like this to be a command, please send a message to @Rastilan.");

    } //End of message switch statement


});
