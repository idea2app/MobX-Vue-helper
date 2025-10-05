# MobX-Vue-helper

[![NPM](https://img.shields.io/npm/v/mobx-vue-helper.svg)](https://www.npmjs.com/package/mobx-vue-helper)
[![License: LGPL v2.1](https://img.shields.io/badge/License-LGPL%20v2.1-blue.svg)](https://www.gnu.org/licenses/lgpl-2.1)

MobX observer decorator for Vue 3 components, providing seamless integration with MobX state management for both class and function components.

## Features

- 🎯 **Universal Support**: Works with both class and function components
- 🔄 **Auto Reactivity**: Automatically tracks and reacts to MobX observable state changes
- 🎨 **TypeScript First**: Full TypeScript support with type definitions
- 🚀 **Easy to Use**: Simple `@observer` decorator API, similar to `mobx-react`
- 💪 **Vue 3 Compatible**: Built for Vue 3 with composition API support

## Installation

```bash
npm install mobx-vue-helper mobx mobx-vue-lite vue-facing-decorator vue web-utility
```

## Usage

### Class Components

```tsx
import { Vue, Component, toNative } from 'vue-facing-decorator';
import { observer } from 'mobx-vue-helper';
import counterStore from './models/Counter';

@Component
@observer
class MyMobX extends Vue {
  render() {
    return (
      <button onClick={() => counterStore.increment()}>
        Count: {counterStore.count}
      </button>
    );
  }
}
export default toNative(MyMobX);
```

### Function Components

```tsx
import { observer } from 'mobx-vue-helper';
import counterStore from './models/Counter';

export const MyMobX = observer(() => (
  <button onClick={() => counterStore.increment()}>
    Count: {counterStore.count}
  </button>
));
```

### MobX Store Example

```tsx
import { observable } from 'mobx';

export class CounterStore {
  @observable
  accessor count = 0;

  increment() {
    this.count++;
  }

  decrement() {
    this.count--;
  }
}

export default new CounterStore();
```

## How It Works

The `@observer` decorator wraps your component's render function with MobX's `Observer` component from `mobx-vue-lite`. This enables automatic tracking of observable access during render and triggers re-renders when tracked observables change.

- **For class components**: The decorator wraps the `render` method
- **For function components**: The wrapper creates a Vue component with a setup function that wraps your functional component

## Requirements

- Vue 3.x
- MobX 6.x or higher
- TypeScript 5.x (recommended)
- vue-facing-decorator 3.x or higher
- mobx-vue-lite 1.x or higher
- web-utility 4.x or higher

## License

LGPL-2.1

## Credits

This package is part of the [idea2app](https://github.com/idea2app) ecosystem and is inspired by the observer pattern from `mobx-react`.