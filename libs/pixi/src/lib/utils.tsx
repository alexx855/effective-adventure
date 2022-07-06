import { defineGrid, extendHex } from 'honeycomb-grid';
import { Graphics, Text } from 'pixi.js';
import { Application } from 'pixi.js';

export interface IPlayerState {
    status: null | 'idle' | 'moving' | 'dead';
    coords: string | null; // honecomb coordinates ref
    points: number;
    movingTo?: string | null;
}
export interface IHoneyComb {
    // honecomb coordinates as key
    [key: string]: {
        addresses: string[]; // player address ref to IGameState.players
        redward: boolean; // vrf spawn, gives the bee a redward
        cursed: boolean; // instantly kill bees
    };
}
export interface IGameState {
    status:
        | 'loading'
        | 'loaded'
        | 'queuing'
        | 'ready'
        | 'playing'
        | 'finished'
        | 'error';
    players: {
        // player address as key
        [key: string]: IPlayerState;
    };
    honeycomb: IHoneyComb;
    address: string | null;
    block: number;
    prevGameResults?: string | null;
}

export interface IHoneycombProps {
    honeycomb: IHoneyComb;
    app: Application;
    [key: string]: any;
}

export interface IBeeProps {
    players: { [key: string]: IPlayerState };
    address: string;
    [key: string]: any;
}
export interface IViewportProps {
    app: Application;
    screenWidth: number;
    screenHeight: number;
    worldWidth: number;
    worldHeight: number;
    plugins?: any[];
    [key: string]: any;
}

export const INIT_GAME_STATE: IGameState = {
    status: 'loading',
    address: null, // contract address
    honeycomb: {},
    players: {},
    block: 0,
};

export const DEMO_ADDRESS = [
    '0x94ca0F69A3E9dDffe090E59Bac5186ddE97B5820',
    '0xFFdeFcab295a19e402987B8cb7E55f3987E0321f',
    '0x04431191382AfFE9C5c86F5bB7636297541CC3DD',
    '0xc9a308A266dE5b3276b41B8E8B1f52a2E4B67c76',
    '0x9dd5CA189bC98e2cF4F99179BF7F003305640414',
    '0x9d8720629D646a7453B461631c4b3702FaeafDF4',
    '0xbDA5747bFD65F08deb54cb465eB87D40e51B197E',
    '0x9d8720629D646a7453B461631c4b3702FaeafD33',
    '0x94ca0F69A3E9dDffe090E59Bac5186ddE97B5820',
    '0xFFdeFcab295a19e402987B8cb7E55f3987E0321f',
    '0x04431191382AfFE9C5c86F5bB7636297541CC3DD',
    '0xc9a308A266dE5b3276b41B8E8B1f52a2E4B67c76',
    '0x9dd5CA189bC98e2cF4F99179BF7F003305640414',
    '0x9d8720629D646a7453B461631c4b3702FaeafDF4',
    '0xbDA5747bFD65F08deb54cb465eB87D40e51B197E',
    '0x9d8720629D646a7453B461631c4b3702FaeafD33',
];
export const SETTINGS = {
    screenW: undefined,
    screenH: undefined,
    hexSize: 250,
    hexOrientation: 'flat',
    hexColums: 2, // x rectangle grid only
    hexRows: 2, // y rectangle grid only
    radius: 4,
    lineThickness: 4,
    lineColor: 0x999999,
    hideCoords: false,
    hideGrid: true,
    fillHexagons: true,
    gridColor: 0x000000,
    initialPoints: 100,
    maxPlayers: 6,
};

// initial coords point on the honeycomb grid
export const SPAWN_POINTS: [number, number][] = [
    [-SETTINGS.radius, 0],
    [SETTINGS.radius, 0],
    [-(SETTINGS.radius / 2), SETTINGS.radius],
    [SETTINGS.radius / 2, SETTINGS.radius],
    [-(SETTINGS.radius / 2), -SETTINGS.radius],
    [SETTINGS.radius / 2, -SETTINGS.radius],
];

export const INIT_PLAYER_STATE: IPlayerState = {
    status: null,
    coords: null,
    points: 0,
};

export const hextendHex = extendHex({
    size: SETTINGS.hexSize,
    redward: false,
    cursed: false,
});
export const Grid = defineGrid(hextendHex);
export const Hexagon = Grid.spiral({ radius: SETTINGS.radius, center: [0, 0] });

export const trimAddress = (address: string): string => {
    return '0x...' + address.substring(address.length - 3, address.length);
};

export function drawHexGrid(
    graphics: Graphics,
    honeycomb: IHoneyComb
): Graphics {
    // set the grid line style
    graphics.lineStyle(SETTINGS.lineThickness, SETTINGS.gridColor);

    // render width x * height y hexes
    Object.keys(honeycomb).forEach((coord) => {
        // Grid.rectangle({ width: SETTINGS.hexColums, height: SETTINGS.hexRows }).forEach((hex) => {

        const hex = Hexagon.get(coordFromString(coord));
        if (!hex) {
            return;
        }

        if (SETTINGS.fillHexagons) {
            // default color
            const { cursed, redward, addresses } = honeycomb[coord];
            let fillColor = 0xf6f2cb;
            if (cursed) {
                fillColor = 0x8c0707;
            } else if (redward) {
                fillColor = 0xc88c00;
            }

            // TODO: highlight player posible moves
            // else if( addresses.length > 0 && addresses[playerAddress] ) {

            graphics.beginFill(fillColor);
        }

        const point = hex.toPoint();
        // add the hex's position to each of its corner points
        const corners = hex.corners().map((corner) => corner.add(point));
        // separate the first from the other corners
        const [firstCorner, ...otherCorners] = corners;

        // move the "pen" to the first corner
        graphics.moveTo(firstCorner.x, firstCorner.y);
        // draw lines to the other corners
        otherCorners.forEach(({ x, y }) => graphics.lineTo(x, y));
        // finish at the first corner
        graphics.lineTo(firstCorner.x, firstCorner.y);

        if (SETTINGS.hideCoords === false) {
            // const point = hex.toPoint();
            const centerPosition = hex.center().add(hex.toPoint());
            const coordinates = hex.coordinates();

            const x: string = coordinates.x.toString();
            const y: string = coordinates.y.toString();

            let fontSize = 100;
            if (SETTINGS.hexSize < 15) fontSize = SETTINGS.hexSize / 1.5;

            const text = new Text(x + ',' + y, {
                fontFamily: 'Arial',
                fontSize: fontSize,
                fill: 0x000000,
                align: 'center',
            });

            text.x = centerPosition.x;
            text.y = centerPosition.y;
            text.anchor.set(0.5);

            graphics.addChild(text);
        }

        // props.app.stage.addChild(graphics);
    });

    return graphics;
}

export const coordFromString = (str: string): [number, number] => {
    const [x, y] = str.split(',');
    return [+x, +y];
};
