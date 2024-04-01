# Slots Component

This package provides flexible types for writing highly customziable components that accepts slots. it adds `slots` and `slotProps` to your component props with full TypeScript support.

Using this package, you can write components that can be used like the following:

```jsx
<List
  rows={data}
  slots={{
    Container: (props: { children: ReactNode }) => <div>{props.children}</div>,
  }}
  slotProps={{
    row: ({ name }) => ({ onClick: () => alert(name) }),
  }}
/>
```

You can pass another slot to replace the default or extra props.

See the example below to see how to write such a component.

## Installation

You can install slots-components via npm:

`npm i -D slots-components`

Or using yarn:

`yarn add slots-components`

## How to use it?

First you need to define your default slots

```jsx
import { SlotsProps, Slots, SlotsConfigCreator } from 'slots-component';

const DEFAULT_SLOTS = {
  Container: 'ul',
  Row: 'li',
} satisfies Slots;
```

Then you need to define the config, if you want to pass extra values to your props, let's say we want to pass `item` to `Row` component:

```jsx
interface TItem {
  id: string;
  name: string;
}

type SlotsConfig = SlotsConfigCreator<typeof DEFAULT_SLOTS, {
  Row: [TItem]
}>
```

Now define your component:

```jsx
interface Props {
  rows: TItem[];
}

export const List = <
  TSlots extends SlotsConfig["Slots"],
  >({ rows, slots, slotProps }: Props & SlotsProps<SlotsConfig, TSlots>) => {
  const combinedSlots = { ...DEFAULT_SLOTS, ...slots };

  return (
    <combinedSlots.Container {...slotProps?.container}>
      {rows.map((entity) => (
        <combinedSlots.Row
          key={row.id}
          {...(typeof slotProps?.row === 'function'
            ? slotProps?.row(entity)
            : slotProps?.row)}
        >
          {row.name}
        </combinedSlots.Row>
      ))}
    </combinedSlots.Container>
  );
};
```

### Full example

```jsx
import { SlotsProps, Slots, SlotsConfigCreator } from 'slots-component';

const DEFAULT_SLOTS = {
  Container: 'ul',
  Row: 'li',
} satisfies Slots;

interface TItem {
  id: string;
  name: string;
}

type SlotsConfig = SlotsConfigCreator<typeof DEFAULT_SLOTS, {
  Row: [TItem];
}>

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
    <combinedSlots.Container {...slotProps?.container}>
      {rows.map((entity) => (
        <combinedSlots.Row
          key={row.id}
          {...(typeof slotProps?.row === 'function'
            ? slotProps?.row(entity)
            : slotProps?.row)}
        >
          {row.name}
        </combinedSlots.Row>
      ))}
    </combinedSlots.Container>
  );
};
```

## Roadmap

- [ ] Add CD
- [ ] Write a simpler generic
- [ ] Better documentation
- [ ] Add example
