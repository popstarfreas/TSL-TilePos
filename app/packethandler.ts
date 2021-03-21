import PacketReader from "@popstarfreas/packetfactory/packetreader";
import PacketWriter from "@popstarfreas/packetfactory/packetwriter";
import PacketTypes from "terrariaserver-lite/packettypes";
import TilePos from ".";
import Client from "terrariaserver-lite/client";
import GenericPacketHandler from "terrariaserver-lite/handlers/genericpackethandler";
import Packet from "terrariaserver-lite/packet";

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
        const reader = new PacketReader(packet.data);
        reader.readByte();
        const pos = {
            x: reader.readInt16(),
            y: reader.readInt16()
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
