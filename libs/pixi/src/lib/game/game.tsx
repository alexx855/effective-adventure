// import { Stage } from '../pixi';
import { Stage } from '@inlet/react-pixi';
import { useState } from 'react';
import PixiBoard from '../board/board';
import PixiContainer from '../pixi';
import { Counter } from '../pixi-demo-react/pixi-demo-react';
import PixiPlayer from '../player/player';
import { DEMO_ADDRESS, IGameState, INIT_GAME_STATE } from '../utils';
import PixiViewport from '../viewport/viewport';

/* eslint-disable-next-line */
export interface GameProps {
    state?: number;
    count?: number;
    config: {
        size: { width: number; height: number };
        stage: {
            antialias: boolean;
            backgroundColor: number;
            backgroundAlpha: number;
            autoDensity: boolean;
        };
    };
    onPointerUp: (e: any) => void;
}

export function Game(props: GameProps) {
    // const [account, setAccount] = useState(ethersAppContext.account);
    const [account, setAccount] = useState(DEMO_ADDRESS[0]);
    const [gameState, setGameState] = useState<IGameState>(INIT_GAME_STATE);
    const { players, honeycomb } = gameState;

    return (
        <Stage
            {...props.config.size}
            options={props.config.stage}
            onPointerUp={props.onPointerUp}
        >
            <PixiViewport
                // ref={viewportRef}
                plugins={['drag', 'pinch', 'wheel']}
                // plugins={['drag', 'pinch', 'wheel', 'bounce']}
                screenWidth={props.config.size.width}
                screenHeight={props.config.size.height}
                // worldWidth={worldWidth}
                // worldHeight={worldHeight}
                didMount={(viewport: any): void =>
                    console.log('viewport didMount')
                }
                pointerdown={(event: any): void => {
                    // console.log('pointerdown', event);
                    // const { offsetX, offsetY } = event.data.originalEvent;
                    // const hexCoordinates = Grid.pointToHex({ x: offsetX, y: offsetY });
                    // if (!hexCoordinates) {
                    //   console.log('no hex found for ', offsetX, offsetY);
                    //   return;
                    // }
                    // // get hex from hex coordinates
                    // const hex = Hexagon.get(hexCoordinates);
                    // if (!hex) {
                    //   console.log('no hex found for ', hexCoordinates);
                    //   return;
                    // }
                    // console.log('hex', hex);
                    // move([hex.x, hex.y]);
                }}
            ></PixiViewport>
        </Stage>
    );
}

export default Game;
