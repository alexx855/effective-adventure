import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import beeUrl, { ReactComponent as Bee } from '../public/bee/SVG/full.svg';
// import Bee from '../public/bee/SVG/full.svg';

// import confetti from 'https://cdn.skypack.dev/canvas-confetti'
// import { useEffect } from 'react'

export function Index() {
    // useEffect(() => {
    //   confetti()
    // })

    // const items = ['a', 'b', 'c'];

    return (
        <div className="h-screen w-screen overflow-hidden">

            <header className="bg-gray-50 w-full">
                <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
                    <h2 className="flex text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                        <img className="w-10" src={beeUrl} alt="bee" />
                        {/* <Bee /> */}

                        <span className="pl-2">BEE positivee</span>
                        {/* <span className="block text-orange-600">helping real people in real time</span> */}
                    </h2>
                    <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
                        <div className="inline-flex rounded-md shadow">
                            <Link href="/hive/">
                                <a className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700">
                                    Hive
                                </a>
                            </Link>
                        </div>
                        <div className="ml-3 inline-flex rounded-md shadow">
                            <Link href="/arena/">
                                <a className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-orange-600 bg-white hover:bg-orange-50">
                                    Arena
                                </a>
                            </Link>
                        </div>

                        <div className="ml-3 inline-flex rounded-md shadow">
                            <Link href="/about/">
                                <a className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-orange-600 bg-white hover:bg-orange-50">
                                    About
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>
            </header>


            <section className="w-full h-full flex flex-center justify-center items-center relative bg-gray-400">
                {/* TODO: add pixi emmiter bg here */}

                {/* TODO: rm, from test too */}
                <span className='hidden'>
                    <h1>Welcome webapp</h1>
                </span>
                
                <button
                    onClick={(e) => console.log('TODO')}
                    className="block px-10 py-6 border border-transparent text-base font-large rounded-md  text-white  bg-orange-600 hover:bg-orange-700"
                >
                    Mint
                </button>

                {/* TODO: list */}
                {/* <ul>
                    {items.map((item, index) => (
                        <li id={'item-' + index} key={'item-' + index}>
                            <Link href={`/item/${encodeURIComponent(item)}`}>
                                <a>{item}</a>
                            </Link>
                        </li>
                    ))}
                </ul> */}
            </section>
        </div>
    );
}

export default Index;
