import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import Helper, { helper } from '@ember/component/helper';

module('Integration | Helper | helper', function(hooks) {
  setupRenderingTest(hooks);

  test('it looks up a simple helper by name', async function(assert) {
    this.owner.register('helper:hello', helper(function([to]) {
      document.getElementById('output').textContent = `hello, simple ${to}!`;
    }));

    await render(hbs`
      <button {{action (helper 'hello' 'world')}}>Hello</button>

      <div id='output'></div>
    `);

    assert.equal(this.element.querySelector('#output').textContent.trim(), '');

    await click('button');

    assert.equal(this.element.querySelector('#output').textContent.trim(), 'hello, simple world!');
  });

  test('it looks up a class-based helper by name', async function(assert) {
    this.owner.register('helper:hello', Helper.extend({
      compute([to]) {
        document.getElementById('output').textContent = `hello, class ${to}!`;
      }
    }));

    await render(hbs`
      <button {{action (helper 'hello' 'world')}}>Hello</button>

      <div id='output'></div>
    `);

    assert.equal(this.element.querySelector('#output').textContent.trim(), '');

    await click('button');

    assert.equal(this.element.querySelector('#output').textContent.trim(), 'hello, class world!');
  });
});
