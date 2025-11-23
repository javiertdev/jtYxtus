[![@javiert.dev/yxtus](https://s6.imgcdn.dev/YKte7y.png)](https://github.com/javiertdev/jtYxtus)

Read this in [Spanish](https://github.com/javiertdev/jtYxtus/blob/main/README.es.md).

Do you need a faster way to write in your blogs, projects, or even in the translations of your websites?

**jtYxtus** is your answer.

It's your **translator** to HTML from plain text! Similar to [Markdown](https://www.markdownguide.org), but with many, many more capabilities, just by writing in a specific format, you'll save a lot of time and can create incredible publications.

> [!NOTE]
> This project is made with [TypeScript](https://www.typescriptlang.org) and includes the interfaces and typing of the functions.

[![Documentation](https://s6.imgcdn.dev/YKtm38.png)](https://github.com/javiertdev/jtYxtus/wiki)
All set to write your ideas more efficiently? 🚀

Dive into the [**project Wiki**](https://github.com/javiertdev/jtYxtus/wiki). There awaits the complete guide, practical examples, and all the secrets to master **jtYxtus** like a true expert.

[![Installation](https://s6.imgcdn.dev/YKtgoS.png)](https://github.com/javiertdev/jtYxtus/wiki)
Getting started with **jtYxtus** is more than easy! You just need a package manager like npm, yarn, or pnpm. If you already have one installed, simply run one of the following commands in the root of your project:

```bash
npm install @javiert.dev/yxtus
```

```bash
yarn add @javiert.dev/yxtus
```

```bash
pnpm add @javiert.dev/yxtus
```

And you already have half the work done!

[![How to use it?](https://s6.imgcdn.dev/YKtHUi.png)](https://github.com/javiertdev/jtYxtus/wiki)

Here I show you a very simple example of how to convert your notes to HTML.

```typescript
import jtYxtus from '@javiert.dev/yxtus';

// Create an instance to pass some configurations.
// (You can name the instance whatever you want)
const jtYxtusInstance = new jtYxtus();

let text = '*this* /is/ a ~test~ _sample_';

let output = jtYxtusInstance.parse(text);

// ! Caution when doing innerHTML on the body, you'll delete everything else haha. Then adapt it to what you need.
document.body.innerHTML = output;
```

TAH DAH! Now you have your notes in HTML, you can give it the style and shape you want. Remember to check the [**documentation**](https://github.com/javiertdev/jtYxtus/wiki) for more details on each utility available in this interesting library.

[![Supported Elements](https://s6.imgcdn.dev/YKtoH0.png)](https://github.com/javiertdev/jtYxtus/wiki)

| Feature | Status | Usage Example |
| :---: | :---: | --- |
| [Bold](https://github.com/javiertdev/jtYxtus/wiki/Bold) | Implemented | `*text*` |
| [Italic](https://github.com/javiertdev/jtYxtus/wiki/Italic) | Implemented | `/text/` |
| [Strike](https://github.com/javiertdev/jtYxtus/wiki/Strike) | Implemented | `~text~` |
| [Underline](https://github.com/javiertdev/jtYxtus/wiki/Underline) | Implemented | `_text_` |
| [Links](https://github.com/javiertdev/jtYxtus/wiki/Link) | Implemented | `[text](url)` |
| [Headings](https://github.com/javiertdev/jtYxtus/wiki/Heading) | Implemented | `# Title` |
| [Line breaks](https://github.com/javiertdev/jtYxtus/wiki/Paragraph) | Implemented | `Text  ` |
| [Paragraphs](https://github.com/javiertdev/jtYxtus/wiki/Paragraph) | Implemented | `Automatic text` |
| [Images](https://github.com/javiertdev/jtYxtus/wiki/Image) | Implemented | `![alt](url)` |
| [Videos](https://github.com/javiertdev/jtYxtus/wiki/Video) | Implemented | `[video{1\|0\|1}](url)` |
| [Audio](https://github.com/javiertdev/jtYxtus/wiki/Audio) | Implemented | `[audio{1\|0\|1}](url)` |
| [YouTube](https://github.com/javiertdev/jtYxtus/wiki/YouTube) | Implemented | `[yt{1\|0\|640x480}](URL or ID)` |
| [Inline code](https://github.com/javiertdev/jtYxtus/wiki/InlineCode) | Implemented | `` `code` `` |
| [Code blocks](https://github.com/javiertdev/jtYxtus/wiki/CodeBlock) | Implemented | `` ```code``` `` |
| [Tables](https://github.com/javiertdev/jtYxtus/wiki/Table) | Implemented | `\| Header \| \| --- \| \| Body \|` |
| [Iframes](https://github.com/javiertdev/jtYxtus/wiki/Iframe) | Implemented | `[iframe{640x480}](url)` |
| [Buttons](https://github.com/javiertdev/jtYxtus/wiki/Button) | Implemented | `[button{download,file.pdf}Text](url)` |
| [Horizontal lines](https://github.com/javiertdev/jtYxtus/wiki/Hr) | Implemented | `---` |
| [Blockquotes](https://github.com/javiertdev/jtYxtus/wiki/Blockquote) | Implemented | `> Text` |
| [Special blockquotes](https://github.com/javiertdev/jtYxtus/wiki/Blockquote) | Implemented | `> [!NOTE@Title]\n> Text` |
| [Comments](https://github.com/javiertdev/jtYxtus/wiki/Comment) | Implemented | `<!-- comment -->` |
| [Ordered lists](https://github.com/javiertdev/jtYxtus/wiki/OrderedList) | Implemented | `1. Item` |
| [Unordered lists](https://github.com/javiertdev/jtYxtus/wiki/UnorderedList) | Implemented | `- Item` |
| [Task lists](https://github.com/javiertdev/jtYxtus/wiki/TaskList) | Implemented | `- [ ] Item` |
| [Abbreviations](https://github.com/javiertdev/jtYxtus/wiki/Abbreviation) | Implemented | `{HTML}\n*[HTML]: Hyper Text Markup Language` |
| [Colors](https://github.com/javiertdev/jtYxtus/wiki/Color) | Implemented | `!{color}(text)` |
| [Highlight](https://github.com/javiertdev/jtYxtus/wiki/Highlight) | Implemented | `==text==` |
| [Icons](https://github.com/javiertdev/jtYxtus/wiki/Icon) | Implemented | `;heart;` |
| [Text Align Center](https://github.com/javiertdev/jtYxtus/wiki/Alignment) | Implemented | `-:- text` |
| [Text Align Left](https://github.com/javiertdev/jtYxtus/wiki/Alignment) | Implemented | `:-- text` |
| [Text Align Right](https://github.com/javiertdev/jtYxtus/wiki/Alignment) | Implemented | `--: text` |
| cURL | Planned | Thinking about how to do it |
| Footnotes | Planned | `Text[^1]` |
| Captys embed | Planned | `[captys{512x512}](URL or ID)` |