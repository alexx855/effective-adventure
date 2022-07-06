import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import {
    selectCount,
    decrement,
    increment,
    incrementByAmount,
    incrementAsync,
    incrementIfOdd,
} from './counter.slice';

/* eslint-disable-next-line */
export interface CounterProps {
    showIncrement?: boolean;
}

export function Counter(props: CounterProps) {
    const dispatch = useAppDispatch();
    const count = useAppSelector(selectCount);
    const [incrementAmount, setIncrementAmount] = useState('2');

    const incrementValue = Number(incrementAmount) || 0;

    const { showIncrement } = props;

    return (
        <div>
            <div>
                <button
                    aria-label="Decrement value"
                    onClick={() => dispatch(decrement())}
                >
                    -
                </button>
                <span>{count}</span>
                <button
                    aria-label="Increment value"
                    onClick={() => dispatch(increment())}
                >
                    +
                </button>
            </div>
            {showIncrement && (
                <div>
                    <input
                        aria-label="Set increment amount"
                        value={incrementAmount}
                        onChange={(e) => setIncrementAmount(e.target.value)}
                    />
                    <button
                        onClick={() =>
                            dispatch(incrementByAmount(incrementValue))
                        }
                    >
                        Add Amount
                    </button>
                    <button
                        onClick={() => dispatch(incrementAsync(incrementValue))}
                    >
                        Add Async
                    </button>
                    <button
                        onClick={() => dispatch(incrementIfOdd(incrementValue))}
                    >
                        Add If Odd
                    </button>
                </div>
            )}
        </div>
    );
}

export default Counter;
