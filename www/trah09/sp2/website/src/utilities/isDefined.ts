export const isDefined = <V>(value: V | undefined | null): value is V => value !== undefined && value !== null
