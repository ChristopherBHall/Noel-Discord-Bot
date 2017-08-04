const Discord = require("discord.js");
const client = new Discord.Client();
const YTDL = require("ytdl-core");
const YTSearch = require("youtube-search");
let prefix = ".";
var servers = {};
var video;

var opts = {
  maxResults: 1,
  key: 'Add your key here'
};

var reddit = require('reddit-joke');
var max = 25;
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

client.login("Discord client key");

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
        console.log(reddit.joke);
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
