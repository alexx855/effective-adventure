import React from 'react';
import { PixiDemoReact } from '@whitehoneypot/pixi';
import { Navbar } from '@whitehoneypot/ui';

/* eslint-disable-next-line */
export interface ArenaProps {}

export function Arena(props: ArenaProps) {
    return (
        <>
            {/* <h1>Arena</h1> */}
            <Navbar />

            <div className="bg-black h-screen w-screen overflow-hidden">
                <div className="z-9 absolute top-5 right-0">
                    <PixiDemoReact />
                </div>
            </div>
        </>
    );
}

export default Arena;
