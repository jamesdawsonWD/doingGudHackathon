export const addressZero = '0x' + '0'.repeat(40);
export const shortAddress = (value: string) => {
    if (value === undefined) {
        return '';
    }
    return value.substring(0, 6) + '...' + value.substring(value.length - 4, value.length + 1);
};
