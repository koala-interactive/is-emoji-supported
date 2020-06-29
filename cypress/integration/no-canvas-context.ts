describe('No canvas context', () => {
  it('Should gracefully returns false if no canvas context', async () => {
    HTMLCanvasElement.prototype.getContext = () => null;
    const {isEmojiSupported} = await import('../../src/is-emoji-supported');
    expect(isEmojiSupported('🦄')).equal(false);
  });
});
