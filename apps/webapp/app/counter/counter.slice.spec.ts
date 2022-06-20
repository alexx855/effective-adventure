import { fetchCounter, counterAdapter, counterReducer } from './counter.slice';

describe('counter reducer', () => {
    it('should handle initial state', () => {
        const expected = counterAdapter.getInitialState({
            loadingStatus: 'not loaded',
            error: null,
        });

        expect(counterReducer(undefined, { type: '' })).toEqual(expected);
    });

    it('should handle fetchCounters', () => {
        let state = counterReducer(undefined, fetchCounter.pending(null, null));

        expect(state).toEqual(
            expect.objectContaining({
                loadingStatus: 'loading',
                error: null,
                entities: {},
            })
        );

        state = counterReducer(
            state,
            fetchCounter.fulfilled([{ id: 1 }], null, null)
        );

        expect(state).toEqual(
            expect.objectContaining({
                loadingStatus: 'loaded',
                error: null,
                entities: { 1: { id: 1 } },
            })
        );

        state = counterReducer(
            state,
            fetchCounter.rejected(new Error('Uh oh'), null, null)
        );

        expect(state).toEqual(
            expect.objectContaining({
                loadingStatus: 'error',
                error: 'Uh oh',
                entities: { 1: { id: 1 } },
            })
        );
    });
});
