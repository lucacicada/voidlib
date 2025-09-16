import { normalize } from '../path'

export function pathToFileURL(path: string): string {
  path = path
    .replace(/\\/g, '/')
    .replaceAll('%', '%25')
    .replaceAll('#', '%23')
    .replaceAll('?', '%3F')
    .replaceAll('\n', '%0A')
    .replaceAll('\r', '%0D')
    .replaceAll('\t', '%09')
    .replace(/^[^\w\-./]+/, match => encodeURIComponent(match))
    .replace(/[^\w\-./]+$/, match => encodeURIComponent(match))

  return `file:${path}` // new URL(`file:${path}`) // Do not use URL, its not truly standard across js runtimes
}

export function fileURLToPath(url: URL | string): string {
  if (typeof url === 'string') {
    url = new URL(url)
  }

  // if (url.protocol !== 'file:') {
  //   throw new Error('The URL must use the file: protocol')
  // }

  // if (url.hostname) {
  //   throw new Error('The file: URL host must be \'localhost\' or empty')
  // }

  const pathname = normalize(decodeURIComponent(url.pathname))

  return pathname
}
