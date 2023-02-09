export function checkFields(obj: {[key: string]: any} | undefined | null, ...fields: string[]): boolean {
    if ( !obj ) return false;

    let result = true;

    for ( let i = 0; i < fields.length; i++ ) {
        if ( !(fields[i] in obj) || !obj[fields[i]] ) {
            result = false;
            break;
        }
    }

    return result;
}

export function lengthObjValues(obj: Object) {
    let length = 0;
    const values = Object.values(obj);

    for ( let value of values ) {
        if ( Array.isArray(value) ) length += value.length;
    }

    return length;
}