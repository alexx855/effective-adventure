import { render } from '@testing-library/react';

import Pixi from './pixi';

describe('Pixi', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<Pixi />);
        expect(baseElement).toBeTruthy();
    });
});
