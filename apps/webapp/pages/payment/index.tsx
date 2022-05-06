import { BackButton } from '@whitehoneypot/ui';

/* eslint-disable-next-line */
export interface PaymentProps {}

export function Payment(props: PaymentProps) {
    return (
        <>
            <div className="bg-gray-50">
                <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
                    <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                        <span className="block">Payment</span>
                    </h1>
                    <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
                        <div className="ml-3 inline-flex rounded-md shadow">
                            <BackButton />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Payment;
