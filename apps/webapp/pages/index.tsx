import Link from 'next/link';
// import confetti from 'https://cdn.skypack.dev/canvas-confetti'
// import { useEffect } from 'react'

export function Index() {
  // useEffect(() => {
  //   confetti()
  // })

  console.log(process.env);
  console.log(process.env.NEXT_PUBLIC_ANALYTICS_ID);
  console.log(process.env.branch);
  console.log(process.env.hash);

  console.log('hello next.js');

  return (
    <div className="bg-gray-50 h-screen w-screen overflow-hidden">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          <span className="block">🐝 BEE supportive,</span>
          <span className="block text-indigo-600">, help real people </span>
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
            <Link href="/about/">
              <a className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50">
                About
              </a>
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Index;
