describe('No canvas support', () => {
  it('Should gracefully returns false if get context is undefined', async () => {
    HTMLCanvasElement.prototype.getContext = undefined;
    const {isEmojiSupported} = await import('../../src/is-emoji-supported');
    expect(isEmojiSupported('🦄')).equal(false);
  });
});
