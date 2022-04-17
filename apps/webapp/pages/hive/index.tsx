// import styles from './index.module.css';

import Link from 'next/link';

/* eslint-disable-next-line */
export interface HiveProps {}

export function Hive(props: HiveProps) {

  return (
    <>
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            <span className="block">Hive</span>
          </h1>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="ml-3 inline-flex rounded-md shadow">
              <Link href="/">
                <a className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50">
                  Back home
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Hive;
