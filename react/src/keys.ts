// import { InjectionKey } from 'vue'
import Interop from './types/Interop'
import {createContext} from "react";

// export const KEY_INTEROP = Symbol() as InjectionKey<Interop>
// export const KEY_LOG = Symbol() as InjectionKey<Interop['log']>

export const InteropContext = createContext<Interop | null>(null);
export const LogContext = createContext<Interop['log'] | null>(null);
