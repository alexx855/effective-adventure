import { BackButton, HiveList } from '@whitehoneypot/ui';
import { Logo } from '@whitehoneypot/ui';
/* eslint-disable-next-line */
export interface HiveProps {}

export function Hive(props: HiveProps) {
    return (
        <>
            <div className="h-screen w-screen overflow-hidden grid grid-rows-4 grid-flow-col">
                <header className="row-span-1 bg-gray-50 w-full">
                    <div className="max-w-7xl mx-auto h-full sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
                        <h1 className="flex text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                            <Logo />
                            <span className="pl-2">Hive</span>
                        </h1>
                        <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
                            <div className="ml-3">
                                <BackButton />
                            </div>
                        </div>
                    </div>
                </header>

                <section className="row-span-3 h-full flex flex-center justify-center items-center relative">
                    <div>
                        <h3 className="w-full">HiveList</h3>
                        <HiveList />
                    </div>
                </section>
            </div>
        </>
    );
}

export default Hive;
