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
    this.owner.register('helper:hi', helper(function() {
      document.getElementById('output').textContent = 'hi!';
    }));

    await render(hbs`
      <button onclick={{action (helper helperName)}}>Open Sesame</button>

      <div id='output'></div>
    `);

    this.set('helperName', null);
    await click('button');
    assert.equal(this.element.querySelector('#output').textContent.trim(), '');

    this.set('helperName', undefined);
    await click('button');
    assert.equal(this.element.querySelector('#output').textContent.trim(), '');

    this.set('helperName', 'hi');
    await click('button');
    assert.equal(this.element.querySelector('#output').textContent.trim(), 'hi!');
  });

  test('helper with options', async function(assert) {
    this.owner.register('helper:options', Helper.extend({
      compute(_, { config }) {
        document.getElementById('output').textContent = config;
      }
    }));

    await render(hbs`
      <button onclick={{action (helper 'options' config='foo')}}>Hello</button>

      <div id='output'></div>
    `);

    assert.equal(this.element.querySelector('#output').textContent.trim(), '');

    await click('button');

    assert.equal(this.element.querySelector('#output').textContent.trim(), 'foo');
  });

  test('helper with options and partial application', async function(assert) {
    this.owner.register('helper:options', Helper.extend({
      compute([a, b], { config }) {
        document.getElementById('output').textContent = `${a} ${b} ${config}`;
      }
    }));

    await render(hbs`
      <button onclick={{action (helper 'options' 'foo' config='wow') value='target.value'}} value='bar'>Options!</button>

      <div id='output'></div>
    `);

    assert.equal(this.element.querySelector('#output').textContent.trim(), '');

    await click('button');

    assert.equal(this.element.querySelector('#output').textContent.trim(), 'foo bar wow');
  });
});
