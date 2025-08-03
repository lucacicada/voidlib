export function pathToFileURL(path: string): string {
  path = path.replace(/\\/g, '/')

  if (path.startsWith('file://')) {
    return path
  }

  return `file://${path}`
}
