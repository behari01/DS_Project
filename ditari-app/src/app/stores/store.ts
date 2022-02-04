import { createContext, useContext } from "react";
import CommonStore from "./commonStore";
import MesimdhenesiStore from "./mesimdhenesiStore";
import NxenesiUserStore from "./nxenesiUserStore";

interface Store {
    mesimdhenesiStore: MesimdhenesiStore
    commonStore: CommonStore;
    nxenesiUserStore: NxenesiUserStore;
}

export const store: Store = {
    mesimdhenesiStore: new MesimdhenesiStore(),
    commonStore: new CommonStore(),
    nxenesiUserStore: new NxenesiUserStore(),
}

export const StoreContext = createContext(store);

export function useStore(){
    return useContext(StoreContext);
}