import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import beeUrl, { ReactComponent as Bee } from '../public/bee/SVG/full.svg';
import honeypotUrl, {
    ReactComponent as Honeypot,
} from '../public/pot/SVG/full.svg';
// import Bee from '../public/bee/SVG/full.svg';
// import Honeypot from '../public/pot/SVG/full.svg';

// import confetti from 'https://cdn.skypack.dev/canvas-confetti'
// import { useEffect } from 'react'

export function Index() {
    // useEffect(() => {
    //   confetti()
    // })

    // console.log(process.env.NEXT_PUBLIC_ANALYTICS_ID);
    // console.log(process.env.RELEASE_VERSION);

    const items = ['a', 'b', 'c'];
    
    return (
        <div className="h-screen w-screen overflow-hidden">
            <div id="hero" className="bg-gray-50">
                <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
                    <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                        <img src={beeUrl} alt="bee" />
                        {/* <Bee /> */}

                        <span className="inline pl-2">BEE supportivee</span>
                        {/* <span className="block text-indigo-600">helping real people in real time</span> */}
                    </h2>
                    <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
                        <div className="inline-flex rounded-md shadow">
                            <Link href="/hive/">
                                <a className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                                    Hive
                                </a>
                            </Link>
                        </div>
                        <div className="ml-3 inline-flex rounded-md shadow">
                            <Link href="/arena/react">
                                <a className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50">
                                    Arena React
                                </a>
                            </Link>
                        </div>
                        <div className="ml-3 inline-flex rounded-md shadow">
                            <Link href="/arena/web">
                                <a className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50">
                                    Arena Web
                                </a>
                            </Link>
                        </div>
                        <div className="ml-3 inline-flex rounded-md shadow">
                            <Link href="/about/">
                                <a className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50">
                                    About
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="">
                <h1>Welcome webapp</h1>
                {/* <Honeypot /> */}
                {/* <img src={honeypotUrl} alt="honeypot" /> */}
                <Link href="/about/">
                    <a className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50">
                        Mint
                    </a>
                </Link>

                <ul>
                    {items.map((item, index) => (
                        <li id={'item-' + index} key={'item-' + index}>
                            <Link href={`/item/${encodeURIComponent(item)}`}>
                                <a>{item}</a>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Index;
