import { join as _join } from 'pathe'

// TODO: Reimplement this function or just re-export
export const join = _join as (...paths: string[]) => string
