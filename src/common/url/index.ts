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

  return `file:///${path}` // Do not use new URL(), it will not preserve spaces
}

export function fileURLToPath(url: URL | string): string {
  const pathname = typeof url === 'string' ? new URL(url).pathname : url.pathname
  return normalize(decodeURIComponent(pathname))
}
