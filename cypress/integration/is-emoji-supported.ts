/// <reference types="cypress" />

import {isEmojiSupported, setCacheHandler} from '../../src/is-emoji-supported';

describe('isEmojiSupported', () => {
  it('Should support unicorn', () => {
    expect(isEmojiSupported('🦄')).equal(true);
  });

  it('Should not support text', () => {
    expect(isEmojiSupported('a')).equal(false);
    expect(isEmojiSupported(';')).equal(false);
  });

  it('Should not support empty text', () => {
    expect(isEmojiSupported(' ')).equal(false);
    expect(isEmojiSupported('')).equal(false);
  });

  it('Should not support multiple emojis', () => {
    // Check https://blog.emojipedia.org/emoji-zwj-sequences-three-letters-many-possibilities/
    // An emoji is sometimes a concatenation of multiple ones. If not supported it will display multiple emojis
    expect(isEmojiSupported(['👁', '👩'].join('\u200d'))).equal(false);
  });
});

describe('setCacheHandler', () => {
  it('Should handle cache', () => {
    const cache = new Map<string, boolean>();
    const hasSpy = cy.spy(cache, 'has');
    const getSpy = cy.spy(cache, 'get');
    const setSpy = cy.spy(cache, 'set');

    setCacheHandler(cache);

    isEmojiSupported('🦄');
    isEmojiSupported('🦄');

    expect(hasSpy).callCount(2);
    expect(hasSpy).calledWithExactly('🦄');

    expect(getSpy).callCount(1);
    expect(getSpy).calledWith('🦄');

    expect(setSpy).callCount(1);
    expect(setSpy).calledWith('🦄', true);
  });
});
