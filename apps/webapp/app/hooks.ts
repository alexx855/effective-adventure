/* eslint-disable @typescript-eslint/ban-types */
import { ChangeEvent, useState } from 'react';
import { useEffect, useRef } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import type { AppDispatch, AppState } from './store';

export const useForm =
    <TContent>(defaultValues: TContent) =>
    (handler: (content: TContent) => void) =>
    async (event: ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        event.persist();

        const form = event.target as HTMLFormElement;
        const elements = Array.from(form.elements) as HTMLInputElement[];
        const data = elements
            .filter((element) => element.hasAttribute('name'))
            .reduce(
                (object, element) => ({
                    ...object,
                    [`${element.getAttribute('name')}`]: element.value,
                }),
                defaultValues
            );
        await handler(data);
        form.reset();
    };

// https://overreacted.io/making-setinterval-declarative-with-react-hooks/
export const useInterval = (callback: Function, delay: number) => {
    const savedCallback = useRef<Function>();
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);
    useEffect(() => {
        const handler = (...args: any) => savedCallback.current?.(...args);

        if (delay !== null) {
            const id = setInterval(handler, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
};

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

// TODO: move to app state
export function useWindowSize(): {
    width: number | undefined;
    height: number | undefined;
} {
    const [windowSize, setWindowSize] = useState({
        width: undefined as undefined | number,
        height: undefined as undefined | number,
    });

    useEffect(() => {
        // Handler to call on window resize
        function handleResize(): void {
            // Set window width/height to state
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }
        // Add event listener
        window.addEventListener('resize', handleResize);
        // Call handler right away so state gets updated with initial window size
        handleResize();
        // Remove event listener on cleanup
        return () => window.removeEventListener('resize', handleResize);
    }, []); // Empty array ensures that effect is only run on mount
    return windowSize;
}
