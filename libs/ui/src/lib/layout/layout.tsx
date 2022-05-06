/* eslint-disable-next-line */
export interface LayoutProps {}

export const Layout: React.FC = ({ children }) => {
    return (
        <>
            {children}

            <div className="absolute bottom-0 right-0 z-99 pb-2 pr-2">
                <p id="release-info" className="text-right">
                    {process.env['NEXT_PUBLIC_VERSION'] || 'development'}
                </p>
            </div>
        </>
    );
};

export default Layout;
