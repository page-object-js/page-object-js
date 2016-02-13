export function on<T>(ctor: {new(): T}): T {
    "use strict";
    const instance: T = new ctor();
    return instance;
}
