import React from 'react';
import { PixiDemoReact } from '@whitehoneypot/pixi';
import { Navbar } from '@whitehoneypot/ui';
import { BackButton } from '@whitehoneypot/ui';
import { useAppSelector, useWindowSize } from '../../app/hooks';
import Counter from '../../app/counter/counter';

/* eslint-disable-next-line */
export interface ArenaProps {}

// TODO: get id from router

export function Arena(props: ArenaProps) {
    // const [transform, setTransform] = React.useState(set);

    const { width, height } = useWindowSize();
    // const count = useAppSelector(selectCount)
    return (
        <>
            <div className="z-30 h-screen absolute left-0 top-0">
                <Counter />
                <Navbar />
            </div>

            <div className="z-20 absolute top-4 right-4">
                {/* TODO: network and account select like uniswap */}
                <BackButton />
            </div>

            <div className="z-10 absolute left-0 top-0 h-screen w-screen overflow-hidden">
                {width && height && (
                    <PixiDemoReact
                        config={{
                            size: { width: width, height: height },
                            spring: { mass: 10, tension: 1000, friction: 100 },
                            stage: {
                                antialias: true,
                                backgroundColor: 0xff0ff0,
                            },
                        }}
                        onPointerUp={console.log}
                    />
                )}
            </div>
        </>
    );
}

export default Arena;
