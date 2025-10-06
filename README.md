# MobX-Vue-helper

MobX Class & [JSX helpers for Vue 3 components][1], providing seamless integration with MobX state management for both class and function components.

[![NPM publishing](https://github.com/idea2app/MobX-Vue-helper/actions/workflows/publish.yml/badge.svg)][2] [![NPM](https://img.shields.io/npm/v/mobx-vue-helper.svg)][3] [![License: LGPL v2.1](https://img.shields.io/badge/License-LGPL%20v2.1-blue.svg)][4]

## Features

- 🎯 **Universal Support**: Works with both `class` and `function` components
- 🔄 **Auto Reactivity**: Automatically tracks and reacts to MobX observable state changes
- ⚡ **Reaction Decorator**: `@reaction()` decorator for declarative side effects on observable changes
- 🎨 **TypeScript First**: Full TypeScript support with type definitions
- 🚀 **Easy to Use**: Simple `@observer` decorator API, similar to `mobx-react`
- 💪 **Vue 3 Compatible**: Built for Vue 3 with composition API support

## Installation

```bash
npm install mobx mobx-vue-helper vue-facing-decorator
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

### Using `@reaction()` Decorator

The `@reaction()` decorator allows you to define side effects that run when specific observable values change. It's based on MobX's [reaction API](https://mobx.js.org/reactions.html#reaction).

```tsx
import { Vue, Component, toNative } from 'vue-facing-decorator';
import { observer, reaction } from 'mobx-vue-helper';

import counterStore from './models/Counter';

@Component
@observer
class MyComponent extends Vue {
  // This method will be called whenever count changes
  @reaction(({ count }) => counterStore.count)
  handleCountChange(newValue: number, oldValue: number) {
    console.log(`Count changed from ${oldValue} to ${newValue}`);
  }

  render() {
    return (
      <button onClick={() => counterStore.increment()}>
        Count: {counterStore.count}
      </button>
    );
  }
}
export default toNative(MyComponent);
```

**Note**: The `@reaction()` decorator should be used with the `@observer` decorator on the class. Reactions are automatically disposed when the component is unmounted.

## How It Works

The `@observer` decorator wraps your component's render function with MobX's `<Observer />` component from `mobx-vue-lite`. This enables automatic tracking of observable access during render and triggers re-renders when tracked observables change.

- **For class components**: The decorator uses class inheritance to create a wrapper component that extends your original component, wrapping the `render()` method and managing MobX reactions lifecycle
- **For function components**: The wrapper creates a Vue component with a setup function that wraps your functional component

The `@reaction()` decorator allows you to define MobX reactions directly on class methods. These reactions are automatically initialized when the component mounts and disposed when it unmounts.

### Limits

As the implementation of Vue 3 & Vue-facing-decorator are dependent on `Proxy` API, and MobX 6+ & [ES Decorator stage-3][5] are dependent on `accessor` properties (which is used the [Private Field][6] inside), it'll throw errors when they are working together, so we can't [put `@observable` on fields of class components directly as React & WebCell do][7].

There're 2 alternatives to work around this:

1.  create a separate store class with `@observable` properties and use it inside your Vue class component.

    ```tsx
    import { Vue, Component, toNative } from 'vue-facing-decorator';
    import { observable } from 'mobx';
    import { observer } from 'mobx-vue-helper';

    class State {
      @observable
      accessor count = 0;

      increment() {
        this.count++;
      }

      decrement() {
        this.count--;
      }
    }

    @Component
    @observer
    class MyMobX extends Vue {
      state = new State();

      render() {
        const { state } = this;

        return (
          <button onClick={() => state.increment()}>
            Count: {state.count}
          </button>
        );
      }
    }
    export default toNative(MyMobX);
    ```

2.  use `makeAutoObservable(this)` in the constructor of your Vue class component to make all properties observable.

    ```tsx
    import { Vue, Component, toNative } from 'vue-facing-decorator';
    import { observer } from 'mobx-vue-helper';
    import { makeAutoObservable } from 'mobx';

    @Component
    @observer
    class MyMobX extends Vue {
      count = 0;

      constructor() {
        super();
        makeAutoObservable(this);
      }

      increment() {
        this.count++;
      }

      decrement() {
        this.count--;
      }

      render() {
        return (
          <button onClick={() => this.increment()}>Count: {this.count}</button>
        );
      }
    }
    export default toNative(MyMobX);
    ```

## Requirements

- TypeScript 5.x
- Vue 3.x
- MobX 6.x
- Vue-facing-decorator 4.x

## Credits

This package is part of the [idea2app][8] ecosystem and is inspired by the observer pattern from `mobx-react`.

## Related projects

1. https://github.com/idea2app/MobX-React-helper
2. https://github.com/idea2app/Vue-MobX-Prime-ts

[1]: https://vuejs.org/guide/extras/render-function#jsx-tsx
[2]: https://github.com/idea2app/MobX-Vue-helper/actions/workflows/publish.yml
[3]: https://www.npmjs.com/package/mobx-vue-helper
[4]: https://www.gnu.org/licenses/lgpl-2.1
[5]: https://github.com/tc39/proposal-decorators
[6]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_elements
[7]: https://github.com/EasyWebApp/WebCell/blob/main/guide/Migrating.md#react-style-state-has-been-totally-dropped
[8]: https://idea2.app
