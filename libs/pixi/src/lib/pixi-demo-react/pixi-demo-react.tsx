import {
    Stage,
    PixiComponent,
    applyDefaultProps,
    useTick,
    Sprite,
} from '@inlet/react-pixi';
import { Graphics, Text } from 'pixi.js';
import { useState } from 'react';
import PixiContainer from '../pixi';

interface RectangleProps {
    x: number;
    y: number;
    width: number;
    height: number;
    color: number;
}

export const Rectangle = PixiComponent<RectangleProps, Graphics>('Rectangle', {
    create: () => new Graphics(),
    applyProps: (ins, _, props) => {
        ins.x = props.x;
        ins.beginFill(props.color);
        ins.drawRect(props.x, props.y, props.width, props.height);
        ins.endFill();
    },
});

interface CounterProps {
    count: number;
}

export const Counter = PixiComponent<CounterProps, Text>('Counter', {
    create: ({ count }: { count: number }) => {
        return new Text(count.toString());
    },
    applyProps: (instance: any, oldProps: any, newProps: any) => {
        const { ...oldP } = oldProps;

        const { ...newP } = newProps;

        // apply rest props to PIXI.Text
        applyDefaultProps(instance, oldP, newP);

        // set new count
        if (newProps.count && newProps.count !== oldProps.count)
            instance.text = newProps.count.toString();
    },
});

let i = 0;

const Bunny = () => {
    // states
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [scale, setScale] = useState(1);
    const [rotation, setRotation] = useState(0);

    // custom ticker
    useTick((delta) => {
        i += 0.05 * delta;

        setX(Math.sin(i) * 100);
        setY(Math.sin(i / 1.5) * 100);
        setRotation(-10 + Math.sin(i / 10 + Math.PI * 2) * 10);
    });

    return (
        <Sprite
            image="https://s3-us-west-2.amazonaws.com/s.cdpn.io/693612/IaUrttj.png"
            anchor={0.5}
            cursor="zoom-in"
            interactive={true}
            scale={scale}
            pointerdown={() => {
                console.log('click');
                setScale(scale * 1.25);
            }}
            x={x}
            y={y}
            rotation={rotation}
        />
    );
};

export interface PixiDemoReactProps {
    count: number;
    config: {
        size: { width: number; height: number };
        spring: { mass: number; tension: number; friction: number };
        stage?: {
            antialias: boolean;
            backgroundColor: number;
            backgroundAlpha?: number;
            autoDensity?: boolean;
        };
    };
    onPointerUp: (e: any) => void;
}
export function PixiDemoReact(props: PixiDemoReactProps) {
    return (
        <Stage
            {...props.config.size}
            options={props.config.stage}
            onPointerUp={props.onPointerUp}
        >
            <PixiContainer x={150} y={150}>
                <Bunny />
            </PixiContainer>

            <Counter count={props.count} />
            <Rectangle
                x={props.config.size.width / 2 - 50}
                y={props.config.size.height / 2 - 50}
                width={100}
                height={100}
                color={0xff0000}
            />
        </Stage>
    );
}

export default PixiDemoReact;
