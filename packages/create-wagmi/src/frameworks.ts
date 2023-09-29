import { blue, cyan, yellow } from 'picocolors'

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
    color: cyan,
    variants: [
      {
        name: 'vite-react',
        display: 'Vite',
        color: blue,
      },
      {
        name: 'next',
        display: 'Next',
        color: yellow,
      },
    ],
  },
  {
    name: 'vanilla',
    display: 'Vanilla',
    color: yellow,
    variants: [
      {
        name: 'vite-vanilla',
        display: 'Vite',
        color: blue,
      },
    ],
  },
]
