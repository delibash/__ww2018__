// encapsulates nullability
export type Nullable<T> = T | null;

// encapsulates an async response
export type Loading<T> = 'loading' | 'error' | T; 

// takes an object type and returns a new type 
// whose members have all the same types as the given type
// but are now optional
export type Nullified<T extends Object> = {
    [Member in keyof T]: Nullable<T[Member]>;
};

// takes an object type and returns a new type 
// whose members have all the same types as the given type
// but are now optional
export type Loadable<T> = {
    [Member in keyof T]: Loading<T[Member]>;
};

export type Fields<T extends Object> = {
    [Member in keyof T]: Member; 
};

export type Values<T extends Object> = {
    [Member in keyof T]: T[Member];
};

// returns true if the value is loaded
export const isLoaded = <T>(val: Loading<T>): boolean => {
    return val !== 'error' && val !== 'loading';
};

export const isErrored = <T>(val: Loading<T>): boolean => {
    if (val === 'error') {
        return true;
    }
    return false;
};

// returns true if the value has *not* been loaded
export const isLoading = <T extends object>(obj: Loadable<T>): boolean => {
    const keys = Object.keys(obj);

    return keys.reduce(
        (memo, key) => {
            const value = obj[key];
            return memo || !isLoaded(value);
        }, 
        false);
};

export const hasErrored = <T extends object>(obj: Loadable<T>): boolean => {
    const keys = Object.keys(obj);
    return keys.reduce((memo, val) => memo || isErrored(obj[val]), false);   
};

export const isNotNull = <T extends object>(obj: Nullified<T>): boolean => {
    const keys = Object.keys(obj);

    return keys.reduce(
        (memo, key) => {
            const value = obj[key];
            return memo || value === null;
        },
        false
    );
};