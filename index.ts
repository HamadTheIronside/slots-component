import { CallbacksCreator, MaybeFunc, Merge, PartialProps, ReactComponent, Slots } from './utils';

type SlotsConfigCreator<
  TDefaultSlots extends Slots,
  TCallbacks extends CallbacksCreator<TDefaultSlots>
> = {
  DefaultSlots: TDefaultSlots;
  Slots: Partial<Record<keyof TDefaultSlots, ReactComponent>>;
  Callbacks: TCallbacks;
};

type SlotPropsCreator<
  TSlotsConfig extends SlotsConfigCreator<any, any>,
  TSlots extends Slots,
> = {
    [SlotKey in keyof TSlots as Lowercase<string & SlotKey>]?:
      // Get the props and rename it to Props
      PartialProps<TSlots[SlotKey]> extends infer Props ?
        // get the slot args for slotProps callback if avaliable, name it Args
        TSlotsConfig["Callbacks"][SlotKey] extends infer Args extends Array<any>
          ? MaybeFunc<Props, Args> : Props
      : never
  };

type SlotsProps<
  TSlotsConfig extends SlotsConfigCreator<any, any>,
  TSlots extends TSlotsConfig['Slots'],
> = {
  slots?: TSlots;
  slotProps?: 
    SlotPropsCreator<
      TSlotsConfig,
      Merge<TSlotsConfig['DefaultSlots'], TSlots>
    >
};

export type { SlotsProps, SlotsConfigCreator, Slots, CallbacksCreator };
