import beeUrl from '../../bee/SVG/full.svg';
import Image from 'next/image';

/* eslint-disable-next-line */
export interface NavbarProps {
    counter?: JSX.Element;
}
const items = ['a', 'b', 'c', 'a', 'b', 'c'];
export function Navbar(props: NavbarProps) {
    // const entities = useSelector(selectAllCounterSlice);
    // TODO: navbar, should list players and their scores/health
    return (
        <div className="h-full grid  grid-rows-6 gap-4  p-0 m-0 ">
            {/* <h3>
                Counter <span>{entities.length}</span>
            </h3> */}
            {items.map((item, index) => (
                <div
                    className="flex flex-wrap justify-center items-center relative p-2 w-full bg-sky-500/50 hover:bg-sky-500"
                    id={'item-' + index}
                    key={'item-' + index}
                >
                    {/* <span className="absolute z-30 left-0 top-0 mt-[-4px] transform translate-y-1/4 w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span> */}
                    <div
                        className="relative flex items-center"
                        onClick={(e) => console.log('TODO')}
                    >
                        <span
                            role="img"
                            aria-label="crown"
                            className="absolute z-30 left-0 top-0 mt-[-4px]"
                        >
                            👑
                        </span>

                        <Image
                            width="40"
                            height="40"
                            layout="fixed"
                            className="w-10 h-10 rounded"
                            src={beeUrl}
                            // TODO:
                            alt="bee"
                        />

                        <span className="ml-2">0x...820</span>

                        {props.counter && props.counter}
                    </div>

                    {/* <p className="text-orange-500">
                                    🪙 <span>1000</span>
                                </p> */}
                    <p className="text-red-500 w-full text-center">
                        <span role="img" aria-label="heart">
                            💓
                        </span>
                        <span>1000</span>
                    </p>
                </div>
            ))}
        </div>
    );
}

export default Navbar;
