ember-helper-helper
==============================================================================

This add-on provides a `helper` helper that looks up the helper by name and returns a function with partial application (commonly called "currying"). It is useful when you want to use a helper as an action.


Compatibility
------------------------------------------------------------------------------

* Ember.js v3.4 or above
* Ember CLI v2.13 or above
* Node.js v8 or above


Installation
------------------------------------------------------------------------------

```
ember install ember-helper-helper
```


Usage
------------------------------------------------------------------------------

``` hbs
<button value='42' onclick={{pipe-action (action (helper 'store/find-record' 'user') value='target.value') (action (mut user))}}>
  Find and set user 42
</button>
```

### See Also

- [DockYard/ember-composable-helpers](https://github.com/DockYard/ember-composable-helpers) (`pipe-action`)
- [ember-sapporo/ember-store-helpers](https://github.com/ember-sapporo/ember-store-helpers) (`store/find-record`)

Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
