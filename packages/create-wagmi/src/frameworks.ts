import pc from 'picocolors'

type ColorFunc = (str: string | number) => string

type FrameworkVariant = {
  name: string
  display: string
  color: ColorFunc
  customCommand?: string
}

export type Framework = {
  name: string
  display: string
  color: ColorFunc
  variants: readonly FrameworkVariant[]
}

export const frameworks: readonly Framework[] = [
  {
    name: 'react',
    display: 'React',
    color: pc.cyan,
    variants: [
      {
        name: 'vite-react',
        display: 'Vite',
        color: pc.blue,
      },
      {
        name: 'next',
        display: 'Next',
        color: pc.yellow,
      },
    ],
  },
  {
    name: 'vanilla',
    display: 'Vanilla',
    color: pc.yellow,
    variants: [
      {
        name: 'vite-vanilla',
        display: 'Vite',
        color: pc.blue,
      },
    ],
  },
]
