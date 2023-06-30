![Logo](https://koala-interactive.com/logo.e927957b.svg)

# 🦄 is-emoji-supported

![No dependency](https://img.shields.io/badge/dependencies-none-blue.svg)
[![license: MIT](https://img.shields.io/badge/license-MIT-brightgreen.svg)](https://opensource.org/licenses/MIT)
![lint](https://github.com/koala-interactive/is-emoji-supported/workflows/lint/badge.svg?branch=master)
![e2e](https://github.com/koala-interactive/is-emoji-supported/workflows/e2e/badge.svg?branch=master)

## Description

**is-emoji-supported** is a library allowing you to detect if the running device supports the specified emoji and helps you providing a solution if it does not support it.

## 📖 Table of content

- [Installation](#🚀-installation)
- [How to use](#🖥️-how-to-use)
- [How to test](#⏳-how-to-test)
- [How to contribute](#🤝-how-to-contribute)
- [List of our other package](#📦-list-of-our-other-package)
- [Join us](#⛵-join-us)
- [License](#license)

## 🚀 Installation

Install with [yarn](https://yarnpkg.com):

    $ yarn add is-emoji-supported

Or install using [npm](https://npmjs.org):

    $ npm i is-emoji-supported

## 🖥️ How to use

### Basic usage

The most basic usage is to use the function directly to detect is the current device support the emoji.

```ts
import { isEmojiSupported } from "is-emoji-supported";

if (isEmojiSupported("🦄")) {
  alert("Houra 🦄 is supported");
} else {
  alert("No support for unicorn emoji yet");
}
```

### Usage with your own cache handler

This library is doing pixel comparison to determine if an emoji is supported. This check can be slow so there is a memory cache implemented.
For some reasons you may want to use your own cache implementation to store the result in either localStorage, IndexedDB or anything else for persistent cache.
You only need to match the [`Map`](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Map) interface.

```ts
import { setCacheHandler } from "is-emoji-supported";

const key = "emoji-cache";
const cache = JSON.parse(localStorage.getItem(key) || {});

setCacheHandler({
  has: (unicode: string) => unicode in cache,
  get: (unicode: string) => cache[unicode],
  set: (unicode: string, supported: boolean) => {
    cache[unicode] = supported;
    localStorage.setItem(key, JSON.stringify(cache));
  },
});
```

### Fallback to images

In most of the cases, you will want to fallback to images to handle unsupported emojis. The best way for this is to build an object with a fallback to all supported images.
You can build your own or use the one given by [JoyPixel](https://www.joypixels.com/), [Twemoji](https://twemoji.twitter.com/) or others services.

```jsx
import React from 'react';
import {isEmojiSupported} from 'is-emoji-supported';

const emojiMap = {
  '🦄': {
    alt: 'unicorn',
    src: '/images/unicorn.png'
  },
  ...
};

export const Emoji = ({ unicode }) => {
  const attrs = emojiMap[unicode];

  return !attrs ? null : isEmojiSupported(unicode) ? (
    <span role="img" aria-label={attrs.alt}>
      {unicode}
    </span>
  ) : (
    <img {...attrs} />
  );
};
```

## ⏳ How to test

    $ npm test

## 🤝 How to contribute

- fork the project
- (write how to to launch it)
- create a branch from main/master like that

      $ contribution/fix/your-github-identity

  OR

      $ contribution/improvment/your-github-identity

- push several (if needed) clear commits
- add tests following the way of the other ones have been wrote
- make sure that all test runs
- push your code

## 📦 List of our other package

- [frenchkiss](https://www.npmjs.com/package/frenchkiss)
- [wowza-webrtc-player](https://www.npmjs.com/package/wowza-webrtc-player)
- [react-rich-mentions](https://www.npmjs.com/package/react-rich-mentions)
- [react-anchor-navigation](https://www.npmjs.com/package/react-anchor-navigation)

## ⛵ Join us

May you want to share more than a pull request
check our [jobs opportunity](https://www.linkedin.com/company/koala-interactive/jobs/)

## License

Copyright (c) 2023 [Koala-Interactive](https://koala-interactive.com/)

This project is [MIT](link-to-your-license-file) licensed.
