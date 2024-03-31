# Slots Component

## Installation

`npm i slots-component`

## How to use it?

```tsx
import { SlotsProps, Slots, SlotsCreator } from 'slots-component';

const DEFAULT_SLOTS = {
  List: 'ul',
  Row: 'li',
} satisfies Slots;

type SlotsConfig = SlotsCreator<typeof DEFAULT_SLOTS, {
  Row: [TItem];
}>

interface TItem {
  id: string;
  name: string;
}

interface Props {
  rows: TItem[];
}

export const List = <
  TSlots extends SlotsConfig["Slots"],
  >({ rows, slots, slotProps }: Props & SlotsProps<SlotsConfig, TSlots>) => {
  const combinedSlots = {
    ...DEFAULT_SLOTS,
    ...slots,
  };

  return (
    <combinedSlots.List {...slotProps?.list}>
      {rows.map((row) => (
        <combinedSlots.Row
          key={row.id}
          {...(typeof slotProps?.row === 'function'
            ? slotProps?.row(row)
            : slotProps?.row)}
        >
          {row.name}
        </combinedSlots.Row>
      ))}
    </combinedSlots.List>
  );
};
```
