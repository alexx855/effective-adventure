import { Game } from '@whitehoneypot/pixi';
import { Navbar } from '@whitehoneypot/ui';
import { BackButton } from '@whitehoneypot/ui';
import { useAppDispatch, useAppSelector, useWindowSize } from '../../app/hooks';
import { increment, selectCount } from '../../app/counter/counter.slice';
import { Counter } from '../../app/counter/counter';
import React from 'react';
// import dynamic from 'next/dynamic';

// const DynamicGame = dynamic(() => import('../components/header'), {
//     ssr: false,
//   })
export interface ArenaProps {
    onBack?: () => void;
}

export function Arena(props: ArenaProps) {
    const { width, height } = useWindowSize();
    const count = useAppSelector(selectCount);

    const dispatch = useAppDispatch();

    const status = 'ready';

    return (
        <>
            <div className="z-30 h-screen absolute left-0 top-0">
                <Navbar counter={<Counter />} />
            </div>

            <div className="z-20 absolute top-4 right-4">
                {/* TODO: network and account select like uniswap */}
                <BackButton />

                {/* {account && players[account] && status === 'playing' && (
                    <>
                        <button onClick={(): void => move()}>Auto Move</button>
                        <button onClick={(): void => changePlayer()}>Next Bee</button>

                        <p className="p-2 mt-2 text-2xl bg-white">
                            <small>Playing as {trimAddress(account)}</small>{' '}
                            <br />
                            <small>
                                {players[account].status === 'moving'
                                    ? `Moving to ${
                                          players[account].coords || 'err'
                                      }`
                                    : players[account].status === 'dead'
                                    ? `Died at ${
                                          players[account].coords || 'err'
                                      }`
                                    : `Iddling at ${
                                          players[account].coords || 'err'
                                      }`}
                            </small>{' '}
                            <br />
                            <small>Points {players[account].points}</small>{' '}
                            <br />
                            <small>Current block {block}</small>
                        </p>
                    </>
                )} */}
            </div>

            <div className="z-10 absolute left-0 top-0 h-screen w-screen overflow-hidden">
                {width && height && (
                    <Game
                        config={{
                            size: {
                                width: width as number,
                                height: height as number,
                            },
                            stage: {
                                antialias: true,
                                backgroundColor: 0xff0ff0,
                                backgroundAlpha: 0.5,
                                autoDensity: true,
                            },
                        }}
                        count={count}
                        onPointerUp={(e: any) => {
                            dispatch(increment());
                        }}
                    />
                )}
            </div>
        </>
    );
}

export default Arena;
