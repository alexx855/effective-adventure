import Link from 'next/link';
import Image from 'next/image';
import iconClose from '../../iconmonstr-x-mark-lined.svg';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface BackButtonProps {}

export function BackButton(props: BackButtonProps) {
    return (
        <Link href="/">
            <a
                href="/"
                className="px-5 h-10 leading-10 relative block rounded shadow hover:bg-orange-50"
            >
                <Image
                    // width="40"
                    // height="40"
                    layout="fill"
                    className=""
                    src={iconClose}
                    alt="bee"
                />
            </a>
        </Link>
    );
}

export default BackButton;
