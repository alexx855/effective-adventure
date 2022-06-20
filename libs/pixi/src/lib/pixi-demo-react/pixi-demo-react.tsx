// your Stage:
import { Stage as PixiStage, Sprite, PixiComponent } from '@inlet/react-pixi';
import { ReactReduxContext } from 'react-redux';
import { Graphics, Texture } from 'pixi.js';
import React from 'react';
import { Spring } from 'react-spring';

// the context bridge:
const ContextBridge = ({ children, Context, render }: any) => {
    return (
        <Context.Consumer>
            {(value: any) =>
                render(
                    <Context.Provider value={value}>
                        {children}
                    </Context.Provider>
                )
            }
        </Context.Consumer>
    );
};

export const Stage = ({ children, ...props }: any) => {
    return (
        <ContextBridge
            Context={ReactReduxContext}
            render={(children: any) => (
                <PixiStage {...props}>{children}</PixiStage>
            )}
        >
            {children}
        </ContextBridge>
    );
};

const Box = (props: any) => (
    <Spring to={props.to} config={props.config}>
        {(props: any) => (
            <Sprite
                texture={Texture.WHITE}
                tint={0xaddb67}
                anchor={0.5}
                {...props}
            />
        )}
    </Spring>
);

/* eslint-disable-next-line */
export interface PixiDemoReactProps {
    config: {
        size: { width: number; height: number };
        spring: { mass: number; tension: number; friction: number };
        stage: { antialias: boolean; backgroundColor: number };
    };
    onPointerUp: () => void;
}

interface RectangleProps {
    x: number;
    y: number;
    width: number;
    height: number;
    color: number;
}

const Rectangle = PixiComponent<RectangleProps, Graphics>('Rectangle', {
    create: () => new Graphics(),
    applyProps: (ins, _, props) => {
        ins.x = props.x;
        ins.beginFill(props.color);
        ins.drawRect(props.x, props.y, props.width, props.height);
        ins.endFill();
    },
});

export function PixiDemoReact(props: PixiDemoReactProps) {
    // const [transform, setTransform] = React.useState(set);

    return (
        <Stage
            {...props.config.size}
            options={props.config.stage}
            onPointerUp={props.onPointerUp}
        >
            {/* <Box {...transform} /> */}
            <Rectangle
                x={100}
                y={100}
                width={100}
                height={100}
                color={0xff0000}
            />
        </Stage>
    );
}

export default PixiDemoReact;
