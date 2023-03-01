declare module 'fixturez' {
  interface FixturezOpts {
    glob?: string
    cleanup?: boolean
    root?: string
  }

  interface Fixturez {
    find(basename: string): string
    copy(basename: string): string
    temp(): string
    cleanup(): void
  }

  function fixturez(dirname: string, opts?: FixturezOpts): Fixturez

  export = fixturez
}
