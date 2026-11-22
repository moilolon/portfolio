import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { hasLanguage, isLocale, sharedLanguagePath } from './lang.ts';

describe('isLocale', () => {
  it('accepts the languages of the site only', () => {
    assert.equal(isLocale('en'), true);
    assert.equal(isLocale('es'), true);

    for (const value of ['fr', 'EN', 'es-ES', '', undefined, null, 3]) {
      assert.equal(isLocale(value), false, String(value));
    }
  });
});

describe('hasLanguage', () => {
  it('sees the language at the start of the path', () => {
    for (const pathname of ['/en', '/es', '/es/', '/en/anything', '/es/a/b']) {
      assert.equal(hasLanguage(pathname), true, pathname);
    }
  });

  it('is not fooled by a path that only starts with the same letters', () => {
    for (const pathname of ['/', '/english', '/español', '/esp', '/blog/es', '/EN']) {
      assert.equal(hasLanguage(pathname), false, pathname);
    }
  });
});

describe('sharedLanguagePath', () => {
  it('sends the home to the language of the cookie', () => {
    assert.equal(sharedLanguagePath('/', 'es'), '/es');
    assert.equal(sharedLanguagePath('/', 'en'), '/en');
  });

  it('keeps the rest of the path', () => {
    assert.equal(sharedLanguagePath('/anything', 'es'), '/es/anything');
    assert.equal(sharedLanguagePath('/a/b', 'en'), '/en/a/b');
  });

  it('lets the language of the URL win over the cookie', () => {
    assert.equal(sharedLanguagePath('/en', 'es'), null);
    assert.equal(sharedLanguagePath('/en/anything', 'es'), null);
    assert.equal(sharedLanguagePath('/es', 'es'), null);
  });

  it('has no say without a cookie, or with one that is not a language', () => {
    for (const cookie of [undefined, '', 'fr', 'ES', 'en; path=/']) {
      assert.equal(sharedLanguagePath('/', cookie), null, String(cookie));
    }
  });
});
