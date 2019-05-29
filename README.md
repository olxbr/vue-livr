# Vue LIVR

## Install

`npm i -S livr`
`npm i -S vue-livr`

## Usage

In your script entry point:

```js
import Vue from 'vue';
import VueLIVR from 'vue-livr';

Vue.use(VueLIVR, {
  extraRules: {}, // Extra rules to be added
  patchRules: false, // Patch rules to return extended error codes
  errorHandlers: {}, // Error handler to each error code that LIVR returns, it will run only if patchRules
});
```

Now you are all set to use the plugin.

## Basic example

```html
<input :class="{ invalid: errors.hasError('name')}" @blur="validate('name')" v-model="name" />
<span>errors.getError('name')</span>
```

```js
const livrRules = {
  name: ['required', { max_length: 20 }],
};

export default {
  data() {
    return {
      name: '',
    };
  },
  methods: {
    validate(field) {
      const { name } = this;
      this.$livr.validate(schema, { name }, field);
    },
  },
};
```

## Credits

- Based on [Vee-validate's](https://github.com/baianat/vee-validate)

## License

MIT
