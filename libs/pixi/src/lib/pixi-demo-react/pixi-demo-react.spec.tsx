import { render } from '@testing-library/react';

import PixiDemoReact from './pixi-demo-react';

describe('PixiDemoReact', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<PixiDemoReact />);
        expect(baseElement).toBeTruthy();
    });
});
