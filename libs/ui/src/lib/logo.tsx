import styles from './logo.module.css';
import Image from 'next/image';
import beeUrl from '../bee/SVG/full.svg';
/* eslint-disable-next-line */
export interface LogoProps {}

export function Logo(props: LogoProps) {
    return (
        <div className={styles['container']}>
            <Image
                width="40"
                height="40"
                layout="fixed"
                className="w-10"
                src={beeUrl}
                alt="bee"
            />
        </div>
    );
}

export default Logo;
