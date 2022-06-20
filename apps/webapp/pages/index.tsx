import Link from 'next/link';
import { Logo } from '@whitehoneypot/ui';
import React from 'react';
import { HiveList } from '@whitehoneypot/ui';

export function Index() {
    return (
        <div className="bg-amber-300 h-screen w-screen overflow-hidden grid grid-rows-4 grid-flow-col">
            <header className="bg-gray-50 w-full row-span-1">
                <div className="max-w-7xl mx-auto h-full sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
                    <h1 className="flex text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                        <Logo />
                        <span className="pl-2">BEE positivee</span>
                    </h1>
                    <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
                        <div className="ml-3 inline-flex">
                            <Link href="/arena/">
                                <a className="px-5 h-10 leading-10 rounded shadow border border-transparent text-base font-medium text-orange-600 bg-white hover:bg-orange-50">
                                    Play now
                                </a>
                            </Link>
                        </div>

                        {/* <div className="ml-3 inline-flex">
                            <Link href="/hive/">
                                <a className="px-5 h-10 leading-10 rounded shadow border border-transparent text-base font-medium text-orange-600 bg-white hover:bg-orange-50">
                                    Hive
                                </a>
                            </Link>
                        </div>

                        <div className="ml-3 inline-flex">
                            <Link href="/about/">
                                <a className="px-5 h-10 leading-10 rounded shadow border border-transparent text-base font-medium text-orange-600 bg-white hover:bg-orange-50">
                                    About
                                </a>
                            </Link>
                        </div> */}
                    </div>
                </div>
            </header>

            <section className="row-span-3 h-full flex flex-center justify-center items-center relative bg-gray-400">
                {/* TODO: rm, from test too */}
                <span className="hidden">
                    <h1>Welcome webapp</h1>
                </span>

                <HiveList />
            </section>
        </div>
    );
}

export default Index;
