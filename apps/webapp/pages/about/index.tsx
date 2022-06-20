import { BackButton } from '@whitehoneypot/ui';
import { Logo } from '@whitehoneypot/ui';
/* eslint-disable-next-line */
export interface AboutProps {}

export function About(props: AboutProps) {
    return (
        <>
            <div className="h-screen w-screen overflow-hidden grid grid-rows-4 grid-flow-col">
                <header className="row-span-1 bg-gray-50 w-full">
                    <div className="max-w-7xl mx-auto h-full sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
                        <h1 className="flex text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                            <Logo />
                            <span className="pl-2">About</span>
                        </h1>
                        <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
                            <div className="ml-3">
                                <BackButton />
                            </div>
                        </div>
                    </div>
                </header>

                <div className="row-span-3 max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Ea minus soluta officiis sequi nesciunt illum tempore
                        similique laboriosam dolorem corporis accusamus alias,
                        mollitia libero reprehenderit, maxime molestiae fuga
                        aliquam vero.
                    </p>
                </div>
            </div>
        </>
    );
}

export default About;
