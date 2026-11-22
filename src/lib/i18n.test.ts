import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { localize } from './i18n.ts';

describe('localize', () => {
  it('picks the text of the language', () => {
    const title = { en: 'Engineer', es: 'Ingeniero' };

    assert.equal(localize(title, 'en'), 'Engineer');
    assert.equal(localize(title, 'es'), 'Ingeniero');
  });

  it('reaches the texts inside objects and lists', () => {
    const content = {
      company: 'Acme',
      title: { en: 'Engineer', es: 'Ingeniero' },
      highlights: [
        { en: 'First', es: 'Primero' },
        { en: 'Second', es: 'Segundo' },
      ],
      sections: [{ title: { en: 'About', es: 'Sobre mí' }, paragraphs: [{ en: 'Hi', es: 'Hola' }] }],
    };

    assert.deepEqual(localize(content, 'es'), {
      company: 'Acme',
      title: 'Ingeniero',
      highlights: ['Primero', 'Segundo'],
      sections: [{ title: 'Sobre mí', paragraphs: ['Hola'] }],
    });
  });

  it('leaves what is not a text as it is', () => {
    const content = { year: 2020, tags: ['a', 'b'], links: {}, optional: null, live: true };

    assert.deepEqual(localize(content, 'en'), content);
  });

  it('does not take an object with other keys for a text', () => {
    // Only one language, or a third key: not a localized text, so it is kept whole
    assert.deepEqual(localize({ en: 'Only English' }, 'es'), { en: 'Only English' });
    assert.deepEqual(localize({ en: 'a', es: 'b', note: 'c' }, 'es'), { en: 'a', es: 'b', note: 'c' });
  });
});
