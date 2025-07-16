# voidlib

Collection of useful libraries for JavaScript and TypeScript.

Most notably:

## nonNullable<T>

Useful function to filter out `null` and `undefined` values from a type.

```ts
import { nonNullable } from 'voidlib'

arr.filter(nonNullable) // arr is now of type T[]
```

## walk

Powerful utility to walk through directories and files in a given path.

```ts
import { walk } from 'voidlib/node'

for await (const file of walk('/path/to/dir', {
  recursive: true,

  // Only yield files, nothing else
  include: (entry) => entry.isFile() && entry.name.endsWith('.ts'),

  // Do not recurse into hidden directories
  recurse: (entry => !entry.name.startsWith('.')),
})) {
  console.log(file) // file is a TypeScript (.ts) file
}
```

## deferPromise

Create a deferred promise that can be resolved or rejected later.

```ts
const p = deferPromise()

p.resolve('Hello, world!')
await p.promise // 'Hello, world!'
```

## task

Unwrap an inlined promise, return a promise task that can be awaited.

```ts
const t = task()
p.resolve('Hello, world!')
await p // 'Hello, world!'
```
