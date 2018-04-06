ember-helper-helper
==============================================================================

This add-on provides a `helper` helper that looks up the helper by name and returns a function with partial application (commonly called "currying"). It is useful when you want to use a helper as an action.

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

Contributing
------------------------------------------------------------------------------

### Installation

* `git clone https://github.com/ember-sapporo/ember-helper-helper.git`
* `cd ember-helper-helper`
* `yarn install`

### Linting

* `yarn lint:js`
* `yarn lint:js --fix`

### Running tests

* `ember test` – Runs the test suite on the current Ember version
* `ember test --server` – Runs the test suite in "watch mode"
* `yarn test` – Runs `ember try:each` to test your addon against multiple Ember versions

### Running the dummy application

* `ember serve`
* Visit the dummy application at [http://localhost:4200](http://localhost:4200).

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).

License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
