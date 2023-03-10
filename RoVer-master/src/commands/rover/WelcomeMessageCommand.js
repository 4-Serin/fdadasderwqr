const Command = require("../Command")
const config = require("../../data/client.json")

module.exports = class WelcomeMessageCommand extends Command {
  constructor(client) {
    super(client, {
      name: "welcomemessage",
      properName: "WelcomeMessage",
      aliases: ["roverwelcomemessage"],
      description:
        "`<Message>` Set the message the user gets when they join your server. This is only shown to verified members. Available replacements can be seen at https://rover.link/manual. Default: Welcome to %SERVER%, %USERNAME%!.",

      args: [
        {
          key: "message",
          label: "message",
          prompt: "Welcome message",
          type: "string",
          default: false,
          optional: true,
        },
      ],
    })
  }

  async fn(msg, args) {
    if (config.settingsFrozen) return msg.reply(config.settingsFrozen)
    if (this.server.ongoingSettingsUpdate)
      return msg.reply(
        "Server settings are currently being saved - please try again in a few moments.",
      )
    if (args.message) {
      this.server.setSetting("welcomeMessage", args.message)
      msg.reply(`Set welcome message to \`${args.message}\``)
    } else {
      this.server.setSetting("welcomeMessage", undefined)
      msg.reply("Set welcome message back to default")
    }
  }
}
