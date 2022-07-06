import { PixiComponent, useApp } from '@inlet/react-pixi';
import { drawHexGrid, IHoneycombProps } from '@whitehoneypot/pixi';
import { Graphics } from 'pixi.js';
import { forwardRef } from 'react';

// TODO: make intrectactive, add pointerdown, pointerup, pointermove
const PixiBoardComponent = PixiComponent<IHoneycombProps, Graphics>(
    'Honeycomb',
    {
        create: (props) => {
            // console.log('create honeycomb grid');
            const graphics = drawHexGrid(new Graphics(), props.honeycomb);
            return graphics;
        },
        applyProps: (graphics, oldProps, props) => {
            // console.log('apply IHoneycombProps', props);

            // clear previous hex
            graphics.clear();

            // TODO: check if honeycomb have changed before updating
            drawHexGrid(graphics, props.honeycomb);
        },
    }
);

// create a component that can be consumed that automatically pass down the app
const PixiBoard = forwardRef((props: any, ref) => (
    <PixiBoardComponent ref={ref} app={useApp()} {...props} />
));
PixiBoard.displayName = 'PixiBoard';

export default PixiBoard;
