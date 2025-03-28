import React from 'react';
import App from './App';
import ReactDOM from 'react-dom/client';
import {InteropContext, LogContext} from "./keys.ts";
import Interop from "./types/Interop.ts";
import interopFallback from "./interop-fallback.ts";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore the unknown interop on window object
const interop: Interop = (window as never).interop || interopFallback;

const Root: React.FC = () => {
    return (
        <InteropContext.Provider value={interop}>
            <LogContext.Provider value={interop.log}>
                <App />
            </LogContext.Provider>
        </InteropContext.Provider>
    );
};

ReactDOM.createRoot(document.getElementById('root')!).render(<Root />);
