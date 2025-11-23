[![@javiert.dev/yxtus](https://s6.imgcdn.dev/YKte7y.png)](https://github.com/javiertdev/jtYxtus)

Read this in [english](https://github.com/javiertdev/jtYxtus/blob/main/README.md).

¿Necesitas una forma más rápida de escribir en tus blogs, proyectos o incluso en las traducciones de tus sitios web?

**jtYxtus** es tu respuesta.

¡Es tu **traductor** a HTML desde texto plano! Similar a [Markdown](https://www.markdownguide.org), pero con muchas, muchas más capcidades, tan solo con escribir en un formato especifico, ahorrarás mucho tiempo y podrás crear publicaciones increibles.

> [!NOTE]
> Este proyecto está hecho con [Typescript](https://www.typescriptlang.org) e incluye las interfaces y el tipado de las funciones.

[![Documentación](https://s6.imgcdn.dev/YKtbC9.png)](https://github.com/javiertdev/jtYxtus/wiki)
¿Todo bien para escribir tus ideas de una forma más eficiente? 🚀

Incursiona en la [**Wiki del proyecto**](https://github.com/javiertdev/jtYxtus/wiki). Allí te espera la guía completa, ejemplos prácticos y todos los secretos para dominar **jtYxtus** como todo un experto.

[![Instalación](https://s6.imgcdn.dev/YKtXRH.png)](https://github.com/javiertdev/jtYxtus/wiki)
¡Empezar con **jtYxtus** es más que fácil! Solo necesitas un gestor de paquetes como npm, yarn o pnpm. Si ya tienes uno instalado, simplemente ejecuta uno de los siguientes comandos en la raíz de tu proyecto:

```bash
npm install @javiert.dev/yxtus
```

```bash
yarn add @javiert.dev/yxtus
```

```bash
pnpm add @javiert.dev/yxtus
```

¡Y ya tienes la mitad del trabajo hecho!

[![¿Cómo se utiliza?](https://s6.imgcdn.dev/YKtFw2.png)](https://github.com/javiertdev/jtYxtus/wiki)

Aquí te muestro un ejemplo muy sencillo de como convertir tus notas a HTML.

```typescript
import jtYxtus from '@javiert.dev/yxtus';

// Crea una instancia para pasarle algunas configuraciones.
// (Le puedes poner el nombre que tu quieras a la instancia)
const jtYxtusInstance = new jtYxtus();

let text = '*esto* /es/ una ~test~ _prueba_';

let output = jtYxtusInstance.parse(text);

// ! Precaución al hacer innerHtml en el body, eliminarás todo lo demás jeje. Luego lo adaptas a lo que necesites.
document.body.innerHTML = output;
```

¡TAH DAH! Ahora tienes tus notas en HTML, le podrás dar el estilo y forma que tu quieras. Recuerda revisar la [**documentación**](https://github.com/javiertdev/jtYxtus/wiki) con más detalles sobre cada utilidad disponible en esta interesante librería.

[![Elementos soportados](https://s6.imgcdn.dev/YKWDIM.png)](https://github.com/javiertdev/jtYxtus/wiki)

| Carácterística | Estado | Ejemplo de uso |
| :---: | :---: | --- |
| [Bold](https://github.com/javiertdev/jtYxtus/wiki/Bold) | Implementado | `*texto*` |
| [Italic](https://github.com/javiertdev/jtYxtus/wiki/Italic) | Implementado | `/texto/` |
| [Strike](https://github.com/javiertdev/jtYxtus/wiki/Strike) | Implementado | `~texto~` |
| [Underline](https://github.com/javiertdev/jtYxtus/wiki/Underline) | Implementado | `_texto_` |
| [Links](https://github.com/javiertdev/jtYxtus/wiki/Link) | Implementado | `[texto](url)` |
| [Headings](https://github.com/javiertdev/jtYxtus/wiki/Heading) | Implementado | `# Título` |
| [Line breaks](https://github.com/javiertdev/jtYxtus/wiki/Paragraph) | Implementado | `Texto  ` |
| [Paragraphs](https://github.com/javiertdev/jtYxtus/wiki/Paragraph) | Implementado | `Texto automático` |
| [Images](https://github.com/javiertdev/jtYxtus/wiki/Image) | Implementado | `![alt](url)` |
| [Videos](https://github.com/javiertdev/jtYxtus/wiki/Video) | Implementado | `[video{1\|0\|1}](url)` |
| [Audio](https://github.com/javiertdev/jtYxtus/wiki/Audio) | Implementado | `[audio{1\|0\|1}](url)` |
| [YouTube](https://github.com/javiertdev/jtYxtus/wiki/YouTube) | Implementado | `[yt{1\|0\|640x480}](URL o ID)` |
| [Inline code](https://github.com/javiertdev/jtYxtus/wiki/InlineCode) | Implementado | ```` `código` ```` |
| [Code blocks](https://github.com/javiertdev/jtYxtus/wiki/CodeBlock) | Implementado | ```` ```código``` ```` |
| [Tables](https://github.com/javiertdev/jtYxtus/wiki/Table) | Implementado | `\| Header \| \| --- \| \| Body \|` |
| [Iframes](https://github.com/javiertdev/jtYxtus/wiki/Iframe) | Implementado | `[iframe{640x480}](url)` |
| [Buttons](https://github.com/javiertdev/jtYxtus/wiki/Button) | Implementado | `[button{download,file.pdf}Text](url)` |
| [Horizontal lines](https://github.com/javiertdev/jtYxtus/wiki/Hr) | Implementado | `---` |
| [Blockquotes](https://github.com/javiertdev/jtYxtus/wiki/Blockquote) | Implementado | `> Texto` |
| [Special blockquotes](https://github.com/javiertdev/jtYxtus/wiki/Blockquote) | Implementado | `> [!NOTE@Título]\n> Texto` |
| [Comments](https://github.com/javiertdev/jtYxtus/wiki/Comment) | Implementado | `<!-- comentario -->` |
| [Ordered lists](https://github.com/javiertdev/jtYxtus/wiki/OrderedList) | Implementado | `1. Item` |
| [Unordered lists](https://github.com/javiertdev/jtYxtus/wiki/UnorderedList) | Implementado | `- Item` |
| [Task lists](https://github.com/javiertdev/jtYxtus/wiki/TaskList) | Implementado | `- [ ] Item` |
| [Abbreviations](https://github.com/javiertdev/jtYxtus/wiki/Abbreviation) | Implementado | `{HTML}\n*[HTML]: Hyper Text Markup Language` |
| [Colors](https://github.com/javiertdev/jtYxtus/wiki/Color) | Implementado | `!{color}(texto)` |
| [Highlight](https://github.com/javiertdev/jtYxtus/wiki/Highlight) | Implementado | `==texto==` |
| [Icons](https://github.com/javiertdev/jtYxtus/wiki/Icon) | Implementado | `;heart;` |
| [Text Align Center](https://github.com/javiertdev/jtYxtus/wiki/Alignment) | Implementado | `-:- texto` |
| [Text Align Left](https://github.com/javiertdev/jtYxtus/wiki/Alignment) | Implementado | `:-- texto` |
| [Text Align Right](https://github.com/javiertdev/jtYxtus/wiki/Alignment) | Implementado | `--: texto` |
| cURL | Planificado | Pensando en cómo hacerlo |
| Footnotes | Planificado | `Texto[^1]` |
| Captys embed | Planificado | `[captys{512x512}](URL o ID)` |
