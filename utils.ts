import { JSXElementConstructor, JSX, ComponentProps } from 'react';

type MaybeFunc<Value, Args extends Array<unknown>> =
  | Value
  | ((...args: Args) => Value);

type ReactComponent = keyof JSX.IntrinsicElements | JSXElementConstructor<any>;
type Slots = Record<string, ReactComponent>;

type PartialProps<T extends ReactComponent> = Partial<ComponentProps<T>>

type CallbacksCreator<DefaultProps extends Slots> = {
  [Key in keyof DefaultProps]?: Array<any>;
};

type Merge<T, U> = Omit<T, keyof U> & U

export type { Merge, MaybeFunc, ReactComponent, Slots, CallbacksCreator, PartialProps }
