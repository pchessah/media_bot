const Telegraf = require("telegraf");
const bot = new Telegraf("1196443354:AAHvGpMk1dzrvNrU7ow8FereMnu8SGEQh_Q");

bot.command("test", (ctx) => {
  // bot.telegram.sendPhoto(ctx.chat.id, "https://cdn.pixabay.com/photo/2013/10/09/02/26/beef-192976_960_720.jpg")
  //bot.telegram.sendPhoto(ctx.chat.id, { source: "res/dubai.jpg" });
  //   bot.telegram.sendPhoto(
  //     ctx.chat.id,
  //     "AgACAgQAAxkBAAMLXut_edLeaoI1ky7ky1-5nhKaeSAAAni0MRv_nWFTNXhgZ1VTb6kGuUskXQADAQADAgADeAAD9xIBAAEaBA"
  //   );
});

bot.command("newyork", (ctx) => {
  bot.telegram.sendChatAction(ctx.chat.id, "upload_photo");
  bot.telegram.sendPhoto(
    ctx.chat.id,
    { source: "res/newyork.jpg" },
    { reply_to_message_id: ctx.message.message_id }
  );
});

bot.command("dubai", (ctx) => {
  bot.telegram.sendChatAction(ctx.chat.id, "upload_video");
  bot.telegram.sendAnimation(
    ctx.chat.id,
    "https://media3.giphy.com/media/PjTzEI1tD0m2h3yin5/giphy.gif",
    { reply_to_message_id: ctx.message.message_id }
  );
});

bot.command("cities", (ctx) => {
  let cities = [
    "res/dubai.jpg",
    "res/hongkong.jpg",
    "res/london.jpg",
    "res/newyork.jpg",
    "res/singapore.jpg",
  ];
  let result = cities.map((city) => {
    return {
      type: "photo",
      media: {
        source: city,
      },
    };
  });
  bot.telegram.sendMediaGroup(ctx.chat.id, result);
});

bot.command("citieslist", (ctx) => {
  bot.telegram.sendDocument(ctx.chat.id, { source: "res/citieslist.txt" }),
    { thumb: { source: "res/dubai.jpg" } };
});

bot.command('home', (ctx)=>{
    bot.telegram.sendLocation(ctx.chat.id, -0.073750,34.780803)
})

bot.on("message", async (ctx)=>{
    if(ctx.updateSubTypes[0] == "document"){
        try{
            let link = await bot.telegram.getFileLink(ctx.message.document.file_id)
            ctx.reply("Your download link is ready: " + link)
        } catch(error){
            console.log(error);
            ctx.reply(error.description)
        }
    }
})
bot.launch();
