import styles from './hive-list.module.css';

/* eslint-disable-next-line */
export interface HiveListProps {}
const items = ['a', 'b', 'c'];

export function HiveList(props: HiveListProps) {
    return (
        <div className={styles['container']}>
            <ul className="h-full flex flex-wrap list-none mt-4">
                {items.map((item, index) => (
                    <li
                        className="block relative p-2 w-full "
                        id={'item-' + index}
                        key={'item-' + index}
                    >
                        <span className="absolute z-30 left-0 top-0 mt-[-4px] transform translate-y-1/4 w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
                        <div className="w-full ring-2 ring-gray-300 ">
                            <p className="text-white">
                                <span>0x...820</span>
                            </p>

                            <div className="">
                                <p className="text-orange-500">
                                    🐝<span>6/6</span>
                                </p>
                                <p className="text-orange-500">
                                    👑<span>0x...820</span>
                                </p>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default HiveList;
