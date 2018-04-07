import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import Helper, { helper } from '@ember/component/helper';

module('Integration | Helper | helper', function(hooks) {
  setupRenderingTest(hooks);

  test('simple helper', async function(assert) {
    this.owner.register('helper:hello', helper(function([to]) {
      document.getElementById('output').textContent = `hello, simple ${to}!`;
    }));

    await render(hbs`
      <button onclick={{action (helper 'hello' 'world')}}>Hello</button>

      <div id='output'></div>
    `);

    assert.equal(this.element.querySelector('#output').textContent.trim(), '');

    await click('button');

    assert.equal(this.element.querySelector('#output').textContent.trim(), 'hello, simple world!');
  });

  test('class-based helper', async function(assert) {
    this.owner.register('helper:hello', Helper.extend({
      compute([to]) {
        document.getElementById('output').textContent = `hello, class ${to}!`;
      }
    }));

    await render(hbs`
      <button onclick={{action (helper 'hello' 'world')}}>Hello</button>

      <div id='output'></div>
    `);

    assert.equal(this.element.querySelector('#output').textContent.trim(), '');

    await click('button');

    assert.equal(this.element.querySelector('#output').textContent.trim(), 'hello, class world!');
  });

  test('partial application', async function(assert) {
    this.owner.register('helper:plus', helper(function([x, y]) {
      document.getElementById('output').textContent = `${x} + ${y} = ${x + Number(y)}`;
    }));

    await render(hbs`
      <button onclick={{action (helper 'plus' 1) value='target.value'}} value='2'>Plus</button>

      <div id='output'></div>
    `);

    assert.equal(this.element.querySelector('#output').textContent.trim(), '');

    await click('button');

    assert.equal(this.element.querySelector('#output').textContent.trim(), '1 + 2 = 3');
  });

  test('when the helper name is null or undefined, no error occurs', async function(assert) {
    assert.expect(0);

    await render(hbs`
      <button onclick={{action (helper null)}}>Null</button>
    `);

    await click('button');
  });
});
