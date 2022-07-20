/**
 * @jest-environment jsdom
 */
import {expect} from '@jest/globals';

it('does not call console.error in jsdom', async () => {
  const consoleErrorSpy = jest.spyOn(console, 'error');

  // Must use dynamic import because
  // `document.createElement('canvas').getContext('2d')` is called when the
  // module is imported
  const {isEmojiSupported} = await import('./is-emoji-supported');

  expect(consoleErrorSpy).not.toHaveBeenCalled();
  expect(isEmojiSupported('😂')).toBe(false);
});
