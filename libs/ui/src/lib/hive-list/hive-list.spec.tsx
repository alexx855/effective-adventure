import { render } from '@testing-library/react';

import HiveList from './hive-list';

describe('HiveList', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<HiveList />);
        expect(baseElement).toBeTruthy();
    });
});
