export function match(value: string) {
    return /^[0-9]{1,18}$/.test(value);
}
