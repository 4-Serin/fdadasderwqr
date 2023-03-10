const Command = require("../Command")
const config = require("../../data/client.json")

module.exports = class UnbindAllGroupCommand extends Command {
  constructor(client) {
    super(client, {
      name: "unbindall",
      properName: "UnbindAll",
      aliases: [
        "roverunbindallgroupranks",
        "unbindallgroupranks",
        "unbindallranks",
      ],
      description: "Unbind all group ranks",
    })
  }

  async fn(msg) {
    if (config.settingsFrozen) return msg.reply(config.settingsFrozen)
    if (this.server.ongoingSettingsUpdate)
      return msg.reply(
        "Server settings are currently being saved - please try again in a few moments.",
      )
    this.server.deleteGroupRankBinding("all")
    msg.reply("Deleted all group rank bindings.")
  }
}
