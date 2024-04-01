import type { Equal, Expect } from '@type-challenges/utils'
import type { Slots, SlotsCreator, SlotsProps } from "./index"
import type { ComponentProps, PropsWithChildren, JSX } from 'react'

const SLOTS = {
  Name1: 'a',
  Custom: () => <></>,
  Custom1: (props: PropsWithChildren) => <></>
} satisfies Slots

type SlotsConfig = SlotsCreator<typeof SLOTS, { Name1: [number], Custom: [{ id: number, name: string }] }>

type Props = SlotsProps<SlotsConfig, { Custom: (props: PropsWithChildren) => JSX.Element }>

type Cases = [
  Expect<Equal<Props,
    {
      slots?: {
        Custom: (props: PropsWithChildren) => JSX.Element;
      },
      slotProps?: {
        name1?: Partial<ComponentProps<'a'>> | ((...args: [number]) => Partial<ComponentProps<'a'>>);
        custom?: Partial<PropsWithChildren> | ((...args: [{ id: number, name: string }]) => Partial<Partial<PropsWithChildren>>)
        custom1?: Partial<PropsWithChildren>
      }
    }
  >>
]
