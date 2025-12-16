import TilePos from "../../index.js";
import Client from "terrariaserver-lite/client";
import Command from "terrariaserver-lite/command";
import CommandHandler from "terrariaserver-lite/commandhandler";
import CommandHandlers from "terrariaserver-lite/commandhandlers";

class TilePosCommand extends CommandHandler {
    public names = ["tilepos"];
    public permission = "tsl.tilepos";

    constructor(private tilePos: TilePos, commandHandlers: CommandHandlers) {
        super(commandHandlers);
    }

    public handle(command: Command, client: Client): void {
        client.sendChatMessage("Waiting tile edit...");
        this.tilePos.waitingTilePos.set(client, true);
    }
}

export default TilePosCommand;
