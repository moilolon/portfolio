import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { CONTACT_LIMITS, readContactErrors, validateContact } from './contact.ts';

const valid = {
  name: 'Ada Lovelace',
  email: 'ada@example.com',
  subject: 'Hello',
  message: 'A message',
};

describe('validateContact', () => {
  it('accepts a complete message', () => {
    const result = validateContact(valid);

    assert.equal(result.valid, true);
    assert.deepEqual(result.errors, {});
    assert.deepEqual(result.data, valid);
  });

  it('requires every field', () => {
    const result = validateContact({});

    assert.equal(result.valid, false);
    assert.deepEqual(result.errors, {
      name: 'required',
      email: 'required',
      subject: 'required',
      message: 'required',
    });
  });

  it('treats values that are not text as missing', () => {
    const result = validateContact({ ...valid, name: { first: 'Ada' }, message: 42 });

    assert.deepEqual(result.errors, { name: 'required', message: 'required' });
  });

  it('does not fail on input that is not an object', () => {
    for (const input of [null, undefined, 'text', 7]) {
      assert.equal(validateContact(input).valid, false);
    }
  });

  it('rejects a field over its limit and accepts it at the limit', () => {
    const atLimit = 'a'.repeat(CONTACT_LIMITS.subject);

    assert.equal(validateContact({ ...valid, subject: atLimit }).valid, true);
    assert.deepEqual(validateContact({ ...valid, subject: `${atLimit}a` }).errors, { subject: 'tooLong' });
  });

  it('rejects an address that is not an email', () => {
    for (const email of ['ada', 'ada@', '@example.com', 'ada@example', 'ada lovelace@example.com']) {
      assert.deepEqual(validateContact({ ...valid, email }).errors, { email: 'invalidEmail' }, email);
    }
  });

  it('trims the fields and lowercases the email', () => {
    const { data } = validateContact({ ...valid, name: '  Ada  ', email: ' ADA@Example.COM ' });

    assert.equal(data.name, 'Ada');
    assert.equal(data.email, 'ada@example.com');
  });

  it('keeps the single-line fields on one line', () => {
    const { data } = validateContact({ ...valid, subject: 'Hello\r\nBcc: someone@example.com' });

    assert.equal(data.subject, 'Hello Bcc: someone@example.com');
  });

  it('keeps the line breaks of the message, normalised', () => {
    const { data } = validateContact({ ...valid, message: 'One\r\nTwo\rThree\n' });

    assert.equal(data.message, 'One\nTwo\nThree');
  });
});

describe('readContactErrors', () => {
  it('keeps the known codes of the known fields', () => {
    assert.deepEqual(
      readContactErrors({ name: 'required', email: 'invalidEmail', subject: 'tooLong' }),
      { name: 'required', email: 'invalidEmail', subject: 'tooLong' },
    );
  });

  it('drops unknown fields and unknown codes', () => {
    assert.deepEqual(readContactErrors({ name: 'whatever', phone: 'required', message: 3 }), {});
  });

  it('does not fail on input that is not an object', () => {
    assert.deepEqual(readContactErrors(null), {});
    assert.deepEqual(readContactErrors('validation'), {});
  });
});
