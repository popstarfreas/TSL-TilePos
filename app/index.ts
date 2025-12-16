import Client from "terrariaserver-lite/client";
import TerrariaServer from "terrariaserver-lite/terrariaserver";
import Extension from "terrariaserver-lite/extensions/extension";
import PacketHandler from "./packethandler.js";
import TilePosCommand from "./commands/tilepos/index.js";

class TilePos extends Extension {
    public name = "TilePos";
    public version = "v1.0";
    public description = "Tells a client the local server position of a tile";
    public waitingTilePos: Map<Client, Boolean> = new Map();

    constructor(server: TerrariaServer) {
        super(server);
        this.loadCommands(__dirname);
        this.packetHandler = new PacketHandler(this);
        this.addCommand(new TilePosCommand(this, this.server.commandHandler));
    }

    public handleClientDisconnect(client: Client): void {
        if (this.waitingTilePos.has(client)) {
            this.waitingTilePos.delete(client);
        }
    }
}

export default TilePos;
