import { render } from '@testing-library/react';

import BackButton from './back-button';

describe('BackButton', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<BackButton />);
        expect(baseElement).toBeTruthy();
    });
});
