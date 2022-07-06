import { ReactReduxContext } from 'react-redux';
import { Stage as PixiStage } from '@inlet/react-pixi';
import { Container } from '@inlet/react-pixi';
import { utils } from 'pixi.js';

const PixiContainer = (props: any) => {
    return <Container {...props} />;
};

export default PixiContainer;

// helper to convert string or rgb values to hex
// so PIXI can handle it
export const toHex = (color: string): number =>
    /^#/.test(color)
        ? utils.string2hex(color)
        : utils.rgb2hex(
              color
                  .replace(/^rgba?\(|\s+|\)$/g, '')
                  .split(',')
                  .map((val: string) => parseInt(val, 10) / 255)
          );

// the context bridge:
const ContextBridge = ({ children, Context, render }: any) => {
    return (
        <Context.Consumer>
            {(value: any) =>
                render(
                    <Context.Provider value={value}>
                        {children}
                    </Context.Provider>
                )
            }
        </Context.Consumer>
    );
};

export const Stage = ({ children, ...props }: any) => {
    return (
        <ContextBridge
            Context={ReactReduxContext}
            render={(children: any) => (
                <PixiStage {...props}>{children}</PixiStage>
            )}
        >
            {children}
        </ContextBridge>
    );
};
