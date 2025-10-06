import { FunctionalComponent, defineComponent, SetupContext } from 'vue';
import { Vue } from 'vue-facing-decorator';
import { Observer } from 'mobx-vue-lite';
import { Constructor } from 'web-utility';
import {
  IReactionDisposer,
  IReactionPublic,
  reaction as mobxReaction
} from 'mobx';

export type VueInstance = InstanceType<typeof Vue>;

export type ReactionExpression<I = any, O = any> = (
  data: I,
  reaction: IReactionPublic
) => O;

export type ReactionEffect<V> = (
  newValue: V,
  oldValue: V,
  reaction: IReactionPublic
) => any;

interface ReactionItem {
  expression: ReactionExpression;
  effect: (...data: any[]) => any;
}

const reactionMap = new WeakMap<object, ReactionItem[]>();

/**
 * Method decorator of [MobX `reaction()`](https://mobx.js.org/reactions.html#reaction)
 *
 * @example
 * ```tsx
 * import { observable } from 'mobx';
 * import { Vue, Component, toNative } from 'vue-facing-decorator';
 * import { observer, reaction } from 'mobx-vue-helper';
 *
 * @Component
 * @observer
 * class MyTag extends Vue {
 *     @observable
 *     accessor count = 0;
 *
 *     @reaction(({ count }) => count)
 *     handleCountChange(newValue: number, oldValue: number) {
 *         console.log(`Count changed from ${oldValue} to ${newValue}`);
 *     }
 *
 *     render() {
 *        return (
 *            <button onClick={() => this.count++}>
 *                Up count {this.count}
 *            </button>
 *        );
 *    }
 * }
 * export default toNative(MyTag);
 * ```
 */
export const reaction =
  <C extends VueInstance, V>(expression: ReactionExpression<C, V>) =>
  (
    effect: ReactionEffect<V>,
    { addInitializer }: ClassMethodDecoratorContext<C>
  ) =>
    addInitializer(function () {
      const reactions = reactionMap.get(this) || [];

      reactions.push({ expression, effect });

      reactionMap.set(this, reactions);
    });

function wrapClass<T extends Constructor<VueInstance>>(Component: T): T {
  class ObserverComponent extends (Component as Constructor<VueInstance>) {
    protected disposers: IReactionDisposer[] = [];

    constructor(...args: any[]) {
      super(...args);

      // Wait for next tick to ensure component is fully initialized
      Promise.resolve().then(() => this.bootReactions());
    }

    protected bootReactions() {
      const reactions = reactionMap.get(this) || [];

      this.disposers.push(
        ...reactions.map(({ expression, effect }) =>
          mobxReaction(
            reaction => expression(this, reaction),
            effect.bind(this)
          )
        )
      );
    }

    render() {
      const parentRender = (Component.prototype as any).render as
        | (() => unknown)
        | undefined;
      if (typeof parentRender === 'function') {
        return <Observer>{() => parentRender.call(this)}</Observer>;
      }
      return null;
    }

    unmounted() {
      for (const disposer of this.disposers) disposer();
      this.disposers.length = 0;

      const parentUnmounted = (Component.prototype as any).unmounted as
        | (() => void)
        | undefined;
      if (typeof parentUnmounted === 'function') {
        parentUnmounted.call(this);
      }
    }
  }

  return ObserverComponent as unknown as T;
}

/**
 * Observer decorator/wrapper for both class and function components.
 * Automatically tracks and reacts to MobX observable state changes.
 *
 * For function components:
 * @example
 * ```tsx
 * import { observer } from 'mobx-vue-helper';
 * import counterStore from './models/Counter';
 *
 * export const MyMobX = observer(() => (
 *   <button onClick={() => counterStore.increment()}>
 *     Count: {counterStore.count}
 *   </button>
 * ));
 * ```
 *
 * For class components:
 * @example
 * ```tsx
 * import { Vue, Component, toNative } from 'vue-facing-decorator';
 * import { observer } from 'mobx-vue-helper';
 * import counterStore from './models/Counter';
 *
 * @Component
 * @observer
 * class MyMobX extends Vue {
 *   render() {
 *     return <button onClick={() => counterStore.increment()}>
 *       Count: {counterStore.count}
 *     </button>;
 *   }
 * }
 * export default toNative(MyMobX);
 * ```
 */
export function observer<T extends Constructor<VueInstance>>(
  ClassComponent: T,
  {}: ClassDecoratorContext<T>
): void | T;
export function observer<P extends Record<string, unknown> = {}>(
  functionComponent: FunctionalComponent<P>
): FunctionalComponent<P>;
export function observer(component: unknown): unknown {
  if (typeof component === 'function') {
    const { prototype } = component as { prototype?: Record<string, unknown> };

    if (prototype instanceof Vue || typeof prototype?.render === 'function') {
      return wrapClass(component as Constructor<VueInstance>);
    }
  }
  const FunctionComponent = component as FunctionalComponent<
    Record<string, unknown>
  >;
  return defineComponent({
    setup: (props: Record<string, unknown>, context: SetupContext) => () => (
      <Observer>{() => FunctionComponent(props, context)}</Observer>
    )
  });
}
