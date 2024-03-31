import { ComponentProps, JSXElementConstructor, JSX } from 'react';

type MaybeFunc<Value, Args extends Array<unknown>> =
  | Value
  | ((...args: Args) => Value);

type ReactComponent = keyof JSX.IntrinsicElements | JSXElementConstructor<any>;
type Slots = Record<string, ReactComponent>;

type CallbacksCreator<DefaultProps extends Slots> = {
  [Key in keyof DefaultProps]?: Array<any>;
};

type SlotProps<
  TSlots extends Slots,
  SlotPropsWithCallback extends CallbacksCreator<TSlots>
> = {
    [SlotKey in keyof TSlots as SlotKey extends string
    ? Lowercase<SlotKey>
    : never]: TSlots[SlotKey] extends ReactComponent
    ? SlotPropsWithCallback[SlotKey] extends Array<any>
    ? MaybeFunc<
      Partial<ComponentProps<TSlots[SlotKey]>>,
      SlotPropsWithCallback[SlotKey]
    >
    : Partial<ComponentProps<TSlots[SlotKey]>>
    : never;
  };

type SlotsCreator<
  TDefaultSlots extends Slots,
  TCallbacks extends CallbacksCreator<TDefaultSlots>
> = {
  DefaultSlots: TDefaultSlots;
  Slots: { [Key in keyof TDefaultSlots]?: ReactComponent };
  Callbacks: TCallbacks;
};

type SlotsProps<
  TSlotsConfig extends SlotsCreator<any, any>,
  TSlots extends TSlotsConfig['Slots']
> = {
  slots?: TSlots;
  slotProps?: Partial<
    SlotProps<
      Omit<TSlotsConfig['DefaultSlots'], keyof TSlots> & TSlots,
      TSlotsConfig['Callbacks']
    >
  >;
};

export type { SlotsProps, SlotsCreator, Slots };
