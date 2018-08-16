Vue Undo Redo Stack
======

This simple mixin adds unopinionated undo/redo logic to a Vue Mixin. You can easily control what data is added to the undo/redo stack.

- [Installation](#installation)
- [Usage](#usage)
- [Acknowledgements](#acknowledgements)

## Installation

With NPM:

```sh
npm install --save-dev vue-undo-redo-stack
```

With Yarn:

```sh
yarn add vue-undo-redo-stack
```

## Usage

Add the Mixin to any Vue Component and implement a `checkpointData` computed property and a `restoreCheckpoint()` method:

```html
<template>
  <!-- ... -->
</template>

<script>
  import vueUndoRedo from 'vue-undo-redo';

  export default {
    name: 'my-component',
    mixins: [vueUndoRedo], // 1. Add the mixin

    /* ... */

    computed: {
      checkpointData() {
        return this.name; // 2. Declare what data to stack when this.checkpoint() is called
      },
    },

    methods: {
      restoreCheckpoint(checkpointData) {
        this.name = checkpointData; // 3. Restore the component's properties given the to-be-restored checkpoint's data
      },
    },
  }
</script>
```

Three methods are made available on this component:

- `this.checkpoint()` - Sends the value of `this.checkpointData` to the stack
- `this.undo()`
- `this.redo()`

These methods can be used as follows to enable undo and redo functionality:

```html
<template>
  <!-- ... -->
</template>

<script>
  import vueUndoRedo from 'vue-undo-redo';

  export default {
    name: 'my-component',

    /* ... */

    data() {
      return {
        name: 'Ben',
      };
    },

    methods: {
      someLogic() {
        this.name; // Ben
        this.checkpoint(); // Saves name

        this.name = 'James';
        this.checkpoint(); // Saves name

        this.undo();

        this.name; // Ben

        this.redo();

        this.name; // James
      },
    },
  }
</script>
```

## Acknowledgements

Adapted from [ember-undo-stack](https://github.com/intercom/ember-undo-stack/blob/master/addon/undo-stack.js).
