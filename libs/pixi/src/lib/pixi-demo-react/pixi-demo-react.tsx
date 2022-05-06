import { Stage, Container, Sprite } from '@inlet/react-pixi'

/* eslint-disable-next-line */
export interface PixiDemoReactProps {}

export function PixiDemoReact(props: PixiDemoReactProps) {
    return (
        <h2>PixiDemoReact</h2>
    );
    // return (
    //     <Stage>
    //         {/* <Sprite image="./my-image.png" x={100} y={100} /> */}
    //         <Container x={500}>
    //         <Text text="Hello World" filter={[blurFilter]} />
    //         </Container>
    //     </Stage>
    // );
}

export default PixiDemoReact;
