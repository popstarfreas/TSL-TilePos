import PacketTypes from "terrariaserver-lite/packettypes";
import TilePos from ".";
import Client from "terrariaserver-lite/client";
import GenericPacketHandler from "terrariaserver-lite/handlers/genericpackethandler";
import Packet from "terrariaserver-lite/packet";
import * as TileModify from "@darkgaming/rescript-terrariapacket/src/packet/Packet_TileModify.gen";

class PacketHandler implements GenericPacketHandler {
    constructor(private tilePos: TilePos) { }

    public handlePacket(client: Client, packet: Packet): boolean {
        let handled = false;
        switch (packet.packetType) {
            case PacketTypes.ModifyTile:
                handled = this.handleModifyTile(client, packet);
                break;
        }

        return handled;
    }

    private handleModifyTile(client: Client, packet: Packet): boolean {
        const tileModify = TileModify.parse(packet.data);
        if (typeof tileModify === "undefined") {
            return false;
        }
        const pos = {
            x: tileModify.tileX,
            y: tileModify.tileY
        };

        if (this.tilePos.waitingTilePos.get(client)) {
            pos.x -= client.server.world.offset.x;
            pos.y -= client.server.world.offset.y;
            client.sendChatMessage(`Tile Pos: X: ${pos.x}, Y: ${pos.y}`);
            this.tilePos.waitingTilePos.delete(client);
            return true;
        }
        return false;
    }
}

export default PacketHandler;
