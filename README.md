# EVT2
Easy vue test 2

## Goal
The previous easy-vue-test has an awkward API. It is very hard to extend its functionality with TypeScript. EVT2 is the next generation of easy-vue-test to provide a better API.

## Brainstorming of the API Features
### 0. No need backward compatibility
Just start from the scratch

### 1. Provide only sub-element accessor and actor invocation method at the first level
For example, `get` is the sub-element accessor invocation method, and `do` is the actor invocation method:

```javascript
await easy.get(domElement('input.price')).do(setInputValue('3.16')).untilAsyncTasksDone();
await easy.get(subComponent('submit-button')).do(click()).untilAsyncTasksDone();
expect(easy.do(getDataField('price'))).toEqual('3.16');
```

### 2. Provide acutall sub-element accessors and actor implementations as functions
For example, the `domElement` and `subComponent` are different sub-element accessors, and `setInputValue`, `click`, `getDataField` are different actors.

In this case, there is no need to extend any interfaces to implement a new sub-element accessor or actor.

### 3. Provide sufficient context to the sub-elememnt accessors and actors implementation
For example, the interface of sub-element accessors and actors can be defined like:

```typescript
interface Accessor extends CallbackBuilder {
  (...args: any[]): ({ currentElement: WrappedElement, rootElement: WrappedElement }) => WrappedElement;
}
interface Actor extends CallbackBuilder {
  (...args: any[]): ({ currentElement: WrappedElement, rootElement: WrappedElement }) => any;
}
```

In this case, it is very easy to reuse existing accessors and actors, e.g.:

```javascript
const customButton: Accessor = (selector) => function ({ currentElement, rootElement }) {
  return currentElement.get(subComponent('custom-button', selector))
}
```
