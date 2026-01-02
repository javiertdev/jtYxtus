
import jtYxtus from "../dist/index.js";

const parser = new jtYxtus();

// Variable to control whether passed tests are shown in detail
const showPassedTests = false;

const documentTests = [
    // Basic formatting tests
    {
        input: 'Hola *mundo*.',
        expected: {
            output: '<p class="jt-yxtus">Hola <strong class="jt-yxtus">mundo</strong>.</p>',
            anchors: []
        }
    },
    {
        input: 'Esto es /cursiva/.',
        expected: {
            output: '<p class="jt-yxtus">Esto es <em class="jt-yxtus">cursiva</em>.</p>',
            anchors: []
        }
    },
    {
        input: 'Texto ~tachado~.',
        expected: {
            output: '<p class="jt-yxtus">Texto <del class="jt-yxtus">tachado</del>.</p>',
            anchors: []
        }
    },
    {
        input: 'Texto _subrayado_.',
        expected: {
            output: '<p class="jt-yxtus">Texto <u class="jt-yxtus">subrayado</u>.</p>',
            anchors: []
        }
    },
    {
        input: 'Texto con *negrita*, /cursiva/ y _subrayado_.',
        expected: {
            output: '<p class="jt-yxtus">Texto con <strong class="jt-yxtus">negrita</strong>, <em class="jt-yxtus">cursiva</em> y <u class="jt-yxtus">subrayado</u>.</p>',
            anchors: []
        }
    },

    // Heading tests
    {
        input: '# Título',
        expected: {
            output: '<h1 id="titulo" class="jt-yxtus">Título</h1>',
            anchors: [{ hash: 'titulo', name: 'Título', level: 1, children: [] }]
        }
    },
    {
        input: '## Subtítulo',
        expected: {
            output: '<h2 id="subtitulo" class="jt-yxtus">Subtítulo</h2>',
            anchors: [{ hash: 'subtitulo', name: 'Subtítulo', level: 2, children: [] }]
        }
    },
    {
        input: '# Example *#1*',
        expected: {
            output: '<h1 id="example-1" class="jt-yxtus">Example <strong class="jt-yxtus">#1</strong></h1>',
            anchors: [{ hash: 'example-1', name: 'Example *#1*', level: 1, children: [] }]
        }
    },
    {
        input: '# Introducción\n## Sección 1\n### Subsección 1.1\n## Sección 2\n### Subsección 2.1\n#### Subsubsección 2.1.1',
        expected: {
            output: '<h1 id="introduccion" class="jt-yxtus">Introducción</h1>\n<h2 id="seccion-1" class="jt-yxtus">Sección 1</h2>\n<h3 id="subseccion-11" class="jt-yxtus">Subsección 1.1</h3>\n<h2 id="seccion-2" class="jt-yxtus">Sección 2</h2>\n<h3 id="subseccion-21" class="jt-yxtus">Subsección 2.1</h3>\n<h4 id="subsubseccion-211" class="jt-yxtus">Subsubsección 2.1.1</h4>',
            anchors: [
                {
                    hash: 'introduccion',
                    name: 'Introducción',
                    level: 1,
                    children: [
                        {
                            hash: 'seccion-1',
                            name: 'Sección 1',
                            level: 2,
                            children: [
                                {
                                    hash: 'subseccion-11',
                                    name: 'Subsección 1.1',
                                    level: 3,
                                    children: []
                                }
                            ]
                        },
                        {
                            hash: 'seccion-2',
                            name: 'Sección 2',
                            level: 2,
                            children: [
                                {
                                    hash: 'subseccion-21',
                                    name: 'Subsección 2.1',
                                    level: 3,
                                    children: [
                                        {
                                            hash: 'subsubseccion-211',
                                            name: 'Subsubsección 2.1.1',
                                            level: 4,
                                            children: []
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    },

    // Code tests
    {
        input: '`code`',
        expected: {
            output: '<code class="jt-yxtus jt-yxtus-code">code</code>',
            anchors: []
        }
    },
    {
        input: '```js\nconsole.log("Hola");\n```',
        expected: {
            output: '<div class="jt-yxtus jt-yxtus-code-block"><button class="jt-yxtus" onclick="navigator.clipboard.writeText(this.nextElementSibling.getAttribute(\'data-code\'));"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"m12.593 23.258-.011.002-.071.035-.02.004-.014-.004-.071-.035q-.016-.005-.024.005l-.004.01-.017.428.005.02.01.013.104.074.015.004.012-.004.104-.074.012-.016.004-.017-.017-.427q-.004-.016-.017-.018m.265-.113-.013.002-.185.093-.01.01-.003.011.018.43.005.012.008.007.201.093q.019.005.029-.008l.004-.014-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014-.034.614q.001.018.017.024l.015-.002.201-.093.01-.008.004-.011.017-.43-.003-.012-.01-.01z\"/><path fill=\"currentColor\" d=\"M19 2a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-2v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2V4a2 2 0 0 1 2-2zm-4 6H5v12h10zm-5 7a1 1 0 1 1 0 2H8a1 1 0 1 1 0-2zm9-11H9v2h6a2 2 0 0 1 2 2v8h2zm-7 7a1 1 0 0 1 .117 1.993L12 13H8a1 1 0 0 1-.117-1.993L8 11z\"/></svg></button><pre class="jt-yxtus jt-yxtus-code" lang="js" data-code="console.log("Hola");"><div class="line"><span class="line-number">1</span><span class="code-line">console.log("Hola");</span></div></pre></div>',
            anchors: []
        }
    },
    {
        input: '````\nconsole.log("Hola mundo");\n````',
        expected: {
            output: '<div class="jt-yxtus jt-yxtus-code-block"><button class="jt-yxtus" onclick="navigator.clipboard.writeText(this.nextElementSibling.getAttribute(\'data-code\'));"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"m12.593 23.258-.011.002-.071.035-.02.004-.014-.004-.071-.035q-.016-.005-.024.005l-.004.01-.017.428.005.02.01.013.104.074.015.004.012-.004.104-.074.012-.016.004-.017-.017-.427q-.004-.016-.017-.018m.265-.113-.013.002-.185.093-.01.01-.003.011.018.43.005.012.008.007.201.093q.019.005.029-.008l.004-.014-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014-.034.614q.001.018.017.024l.015-.002.201-.093.01-.008.004-.011.017-.43-.003-.012-.01-.01z\"/><path fill=\"currentColor\" d=\"M19 2a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-2v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2V4a2 2 0 0 1 2-2zm-4 6H5v12h10zm-5 7a1 1 0 1 1 0 2H8a1 1 0 1 1 0-2zm9-11H9v2h6a2 2 0 0 1 2 2v8h2zm-7 7a1 1 0 0 1 .117 1.993L12 13H8a1 1 0 0 1-.117-1.993L8 11z\"/></svg></button><pre class="jt-yxtus jt-yxtus-code" data-code="console.log("Hola mundo");"><div class="line"><span class="line-number">1</span><span class="code-line">console.log("Hola mundo");</span></div></pre></div>',
            anchors: []
        }
    },
    {
        input: '````javascript\nconsole.log("Hola mundo");\n````',
        expected: {
            output: '<div class="jt-yxtus jt-yxtus-code-block"><button class="jt-yxtus" onclick="navigator.clipboard.writeText(this.nextElementSibling.getAttribute(\'data-code\'));"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"m12.593 23.258-.011.002-.071.035-.02.004-.014-.004-.071-.035q-.016-.005-.024.005l-.004.01-.017.428.005.02.01.013.104.074.015.004.012-.004.104-.074.012-.016.004-.017-.017-.427q-.004-.016-.017-.018m.265-.113-.013.002-.185.093-.01.01-.003.011.018.43.005.012.008.007.201.093q.019.005.029-.008l.004-.014-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014-.034.614q.001.018.017.024l.015-.002.201-.093.01-.008.004-.011.017-.43-.003-.012-.01-.01z\"/><path fill=\"currentColor\" d=\"M19 2a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-2v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2V4a2 2 0 0 1 2-2zm-4 6H5v12h10zm-5 7a1 1 0 1 1 0 2H8a1 1 0 1 1 0-2zm9-11H9v2h6a2 2 0 0 1 2 2v8h2zm-7 7a1 1 0 0 1 .117 1.993L12 13H8a1 1 0 0 1-.117-1.993L8 11z\"/></svg></button><pre class="jt-yxtus jt-yxtus-code" lang="javascript" data-code="console.log("Hola mundo");"><div class="line"><span class="line-number">1</span><span class="code-line">console.log("Hola mundo");</span></div></pre></div>',
            anchors: []
        }
    },
    {
        input: '````\n```\nconsole.log("nested1");\n```\n````',
        expected: {
            output: '<div class="jt-yxtus jt-yxtus-code-block"><button class="jt-yxtus" onclick="navigator.clipboard.writeText(this.nextElementSibling.getAttribute(\'data-code\'));"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"m12.593 23.258-.011.002-.071.035-.02.004-.014-.004-.071-.035q-.016-.005-.024.005l-.004.01-.017.428.005.02.01.013.104.074.015.004.012-.004.104-.074.012-.016.004-.017-.017-.427q-.004-.016-.017-.018m.265-.113-.013.002-.185.093-.01.01-.003.011.018.43.005.012.008.007.201.093q.019.005.029-.008l.004-.014-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014-.034.614q.001.018.017.024l.015-.002.201-.093.01-.008.004-.011.017-.43-.003-.012-.01-.01z\"/><path fill=\"currentColor\" d=\"M19 2a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-2v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2V4a2 2 0 0 1 2-2zm-4 6H5v12h10zm-5 7a1 1 0 1 1 0 2H8a1 1 0 1 1 0-2zm9-11H9v2h6a2 2 0 0 1 2 2v8h2zm-7 7a1 1 0 0 1 .117 1.993L12 13H8a1 1 0 0 1-.117-1.993L8 11z\"/></svg></button><pre class="jt-yxtus jt-yxtus-code" data-code="```\nconsole.log("nested1");\n```"><div class="line"><span class="line-number">1</span><span class="code-line">```</span></div><div class="line"><span class="line-number">2</span><span class="code-line">console.log("nested1");</span></div><div class="line"><span class="line-number">3</span><span class="code-line">```</span></div></pre></div>',
            anchors: []
        }
    },
    {
        input: '```[2,4]typescript\nconst [width, height] = size.split(\'x\');\nreturn {\n  width: width || \'640\',\n  height: height || \'480\'\n};\n```',
        expected: {
            output: '<div class="jt-yxtus jt-yxtus-code-block"><button class="jt-yxtus" onclick="navigator.clipboard.writeText(this.nextElementSibling.getAttribute(\'data-code\'));"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"m12.593 23.258-.011.002-.071.035-.02.004-.014-.004-.071-.035q-.016-.005-.024.005l-.004.01-.017.428.005.02.01.013.104.074.015.004.012-.004.104-.074.012-.016.004-.017-.017-.427q-.004-.016-.017-.018m.265-.113-.013.002-.185.093-.01.01-.003.011.018.43.005.012.008.007.201.093q.019.005.029-.008l.004-.014-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014-.034.614q.001.018.017.024l.015-.002.201-.093.01-.008.004-.011.017-.43-.003-.012-.01-.01z\"/><path fill=\"currentColor\" d=\"M19 2a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-2v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2V4a2 2 0 0 1 2-2zm-4 6H5v12h10zm-5 7a1 1 0 1 1 0 2H8a1 1 0 1 1 0-2zm9-11H9v2h6a2 2 0 0 1 2 2v8h2zm-7 7a1 1 0 0 1 .117 1.993L12 13H8a1 1 0 0 1-.117-1.993L8 11z\"/></svg></button><pre class="jt-yxtus jt-yxtus-code" lang="typescript" data-code="const [width, height] = size.split(\'x\');\nreturn {\n  width: width || \'640\',\n  height: height || \'480\'\n};"><div class="line"><span class="line-number">1</span><span class="code-line">const [width, height] = size.split(\'x\');</span></div><div class="line highlight"><span class="line-number">2</span><span class="code-line">return {</span></div><div class="line"><span class="line-number">3</span><span class="code-line">  width: width || \'640\',</span></div><div class="line highlight"><span class="line-number">4</span><span class="code-line">  height: height || \'480\'</span></div><div class="line"><span class="line-number">5</span><span class="code-line">};</span></div></pre></div>',
            anchors: []
        }
    },

    // Media and link tests
    {
        input: '![Hola mundo](http://example.com/img.png)',
        expected: {
            output: '<img src="http://example.com/img.png" alt="Hola mundo" class="jt-yxtus" />',
            anchors: []
        }
    },
    {
        input: '[text](http://example.com)',
        expected: {
            output: '<a href="http://example.com" target="_blank" class="jt-yxtus jt-yxtus-link">text</a>',
            anchors: []
        }
    },
    {
        input: '![video{1|0|1}](http://example.com/video.mp4)',
        expected: {
            output: '<video src="http://example.com/video.mp4" autoplay controls class="jt-yxtus"></video>',
            anchors: []
        }
    },
    {
        input: '![audio{1|0|1}](http://example.com/audio.mp3)',
        expected: {
            output: '<audio src="http://example.com/audio.mp3" autoplay controls class="jt-yxtus"></audio>',
            anchors: []
        }
    },
    {
        input: '![yt{1|0|640x480}](https://youtu.be/dQw4w9WgXcQ)',
        expected: {
            output: '<iframe width="640" height="480" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="YouTube Embed from jtYxtus" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; autoplay" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen class="jt-yxtus jt-yxtus-yt"></iframe>',
            anchors: []
        }
    },
    {
        input: '[iframe{640x480}](https://example.com)',
        expected: {
            output: '<iframe src="https://example.com" width="640" height="480" frameborder="0" class="jt-yxtus jt-yxtus-iframe"></iframe>',
            anchors: []
        }
    },
    {
        input: '[iframe{0x0}](https://example.com)',
        expected: {
            output: '<iframe src="https://example.com" width="100%" height="512" frameborder="0" class="jt-yxtus jt-yxtus-iframe"></iframe>',
            anchors: []
        }
    },

    // Button tests
    {
        input: '[button{download,myfile.pdf}Descargar Archivo](http://example.com/file.pdf)',
        expected: {
            output: '<a href="http://example.com/file.pdf" download="myfile.pdf" class="jt-yxtus jt-yxtus-button">Descargar Archivo</a>',
            anchors: []
        }
    },
    {
        input: '[button{download,file.pdf}Descargar](http://example.com/document)',
        expected: {
            output: '<a href="http://example.com/document" download="file.pdf" class="jt-yxtus jt-yxtus-button">Descargar</a>',
            anchors: []
        }
    },

    // List tests
    {
        input: '1. texto\n2. *texto*\n3. /texto/',
        expected: {
            output: '<ol class="jt-yxtus"><li class="jt-yxtus">texto</li>\n<li class="jt-yxtus"><strong class="jt-yxtus">texto</strong></li>\n<li class="jt-yxtus"><em class="jt-yxtus">texto</em></li></ol>',
            anchors: []
        }
    },
    {
        input: '- texto\n- [texto](url)\n- texto',
        expected: {
            output: '<ul class="jt-yxtus"><li class="jt-yxtus">texto</li>\n<li class="jt-yxtus"><a href="url" target="_blank" class="jt-yxtus jt-yxtus-link">texto</a></li>\n<li class="jt-yxtus">texto</li></ul>',
            anchors: []
        }
    },
    {
        input: '- [ ] Tarea pendiente\n- [x] Tarea completada\n- [ ] Otra tarea',
        expected: {
            output: '<ul class="jt-yxtus task-list"><li class="jt-yxtus"><input type="checkbox" disabled class="jt-yxtus"> Tarea pendiente</li>\n<li class="jt-yxtus"><input type="checkbox" checked disabled class="jt-yxtus"> Tarea completada</li>\n<li class="jt-yxtus"><input type="checkbox" disabled class="jt-yxtus"> Otra tarea</li></ul>',
            anchors: []
        }
    },

    // Table tests
    {
        input: `| Header1 | Header2 | Header3 | Header4 |
| --- | :--- | :---: | ---: |
| Body1 | /Body2/ | | Body4 |
| *Body1.1* | | Body2.1 | ~Body4.1~ |`,
        expected: {
            output: '\n<table class="jt-yxtus"><thead><tr><th>Header1</th><th>Header2</th><th style="text-align: center;">Header3</th><th style="text-align: right;">Header4</th></tr></thead><tbody><tr><td>Body1</td><td><em class="jt-yxtus">Body2</em></td><td style="text-align: center;"></td><td style="text-align: right;">Body4</td></tr><tr><td><strong class="jt-yxtus">Body1.1</strong></td><td></td><td style="text-align: center;">Body2.1</td><td style="text-align: right;"><del class="jt-yxtus">Body4.1</del></td></tr></tbody></table>',
            anchors: []
        }
    },

    // HR tests
    {
        input: '---',
        expected: {
            output: '<hr class="jt-yxtus line-1">',
            anchors: []
        }
    },
    {
        input: '----',
        expected: {
            output: '<hr class="jt-yxtus line-2">',
            anchors: []
        }
    },
    {
        input: '-----',
        expected: {
            output: '<hr class="jt-yxtus line-3">',
            anchors: []
        }
    },

    // Blockquote tests
    {
        input: '> Esto es una cita',
        expected: {
            output: '<blockquote class="jt-yxtus"><p class="jt-yxtus">Esto es una cita</p></blockquote>',
            anchors: []
        }
    },
    {
        input: '> Primera línea\n> Segunda línea',
        expected: {
            output: '<blockquote class="jt-yxtus"><p class="jt-yxtus">Primera línea</p><br/><p class="jt-yxtus">Segunda línea</p></blockquote>',
            anchors: []
        }
    },
    {
        input: '> Nivel 1\n>> Nivel 2\n> De vuelta al nivel 1',
        expected: {
            output: '<blockquote class="jt-yxtus"><p class="jt-yxtus">Nivel 1</p><blockquote class="jt-yxtus"><p class="jt-yxtus">Nivel 2</p></blockquote><br/><p class="jt-yxtus">De vuelta al nivel 1</p></blockquote>',
            anchors: []
        }
    },
    {
        input: '> [!NOTE@Hola *mundo*]\n> Saludar es lo correcto',
        expected: {
            output: '<blockquote class="jt-yxtus note"><div class="jt-yxtus blockquote-title">Hola <strong class="jt-yxtus">mundo</strong></div><br/><p class="jt-yxtus">Saludar es lo correcto</p></blockquote>',
            anchors: []
        }
    },
    {
        input: '> [!INFO@Información]\n> Este es un blockquote de tipo info\n> informar es importante',
        expected: {
            output: '<blockquote class="jt-yxtus info"><div class="jt-yxtus blockquote-title">Información</div><br/><p class="jt-yxtus">Este es un blockquote de tipo info</p><br/><p class="jt-yxtus">informar es importante</p></blockquote>',
            anchors: []
        }
    },
    {
        input: '> [!INFO@;g-info; Información 2]\n> Este es un blockquote de tipo info\n> informar es importante',
        expected: {
            output: '<blockquote class="jt-yxtus info"><div class="jt-yxtus blockquote-title"><i class="jt-yxtus material-symbols-outlined">info</i> Información 2</div><br/><p class="jt-yxtus">Este es un blockquote de tipo info</p><br/><p class="jt-yxtus">informar es importante</p></blockquote>',
            anchors: []
        }
    },
    {
        input: '> This is *bold* text',
        expected: {
            output: '<blockquote class="jt-yxtus"><p class="jt-yxtus">This is <strong class="jt-yxtus">bold</strong> text</p></blockquote>',
            anchors: []
        }
    },
    {
        input: '> !{red}(Red text) here',
        expected: {
            output: '<blockquote class="jt-yxtus"><p class="jt-yxtus"><span class="jt-yxtus" style="color:red!important">Red text</span> here</p></blockquote>',
            anchors: []
        }
    },
    {
        input: '> First *bold*\n> Second !{blue}(blue)',
        expected: {
            output: '<blockquote class="jt-yxtus"><p class="jt-yxtus">First <strong class="jt-yxtus">bold</strong></p><br/><p class="jt-yxtus">Second <span class="jt-yxtus" style="color:blue!important">blue</span></p></blockquote>',
            anchors: []
        }
    },
    {
        input: '> - [x] Test\n> - [ ] test2',
        expected: {
            output: '<blockquote class="jt-yxtus"><ul class="jt-yxtus task-list"><li class="jt-yxtus"><input type="checkbox" checked disabled class="jt-yxtus"> Test</li>\n<li class="jt-yxtus"><input type="checkbox" disabled class="jt-yxtus"> test2</li></ul></blockquote>',
            anchors: []
        }
    },

    // Abbreviation tests
    {
        input: 'This is {HTML} and it works.\n\n*[HTML]: Hyper Text Markup Language',
        expected: {
            output: '<p class="jt-yxtus">This is <abbr title="Hyper Text Markup Language" class="jt-yxtus">HTML</abbr> and it works.</p>',
            anchors: []
        }
    },
    {
        input: '{CSS} is cool.\n\n*[CSS]: Cascading Style Sheets\n*[HTML]: Hyper Text Markup Language',
        expected: {
            output: '<p class="jt-yxtus"><abbr title="Cascading Style Sheets" class="jt-yxtus">CSS</abbr> is cool.</p>',
            anchors: []
        }
    },
    {
        input: '*Bold* text and {ABBR}.\n\n*[ABBR]: Abbreviation',
        expected: {
            output: '<p class="jt-yxtus"><strong class="jt-yxtus">Bold</strong> text and <abbr title="Abbreviation" class="jt-yxtus">ABBR</abbr>.</p>',
            anchors: []
        }
    },

    // Mark test
    {
        input: 'Texto ==resaltado==.',
        expected: {
            output: '<p class="jt-yxtus">Texto <mark class="jt-yxtus">resaltado</mark>.</p>',
            anchors: []
        }
    },

    // Icon tests
    {
        input: 'Love this ;heart;.',
        expected: {
            output: '<p class="jt-yxtus">Love this <i class="jt-yxtus ico-heart"></i>.</p>',
            anchors: []
        }
    },
    {
        input: 'Great job ;check;.',
        expected: {
            output: '<p class="jt-yxtus">Great job <i class="jt-yxtus ico-check"></i>.</p>',
            anchors: []
        }
    },
    {
        input: 'Unknown ;unknown;.',
        expected: {
            output: '<p class="jt-yxtus">Unknown <i class="jt-yxtus ico-unknown"></i>.</p>',
            anchors: []
        }
    },
    {
        input: 'Check ;g-notifications;.',
        expected: {
            output: '<p class="jt-yxtus">Check <i class="jt-yxtus material-symbols-outlined">notifications</i>.</p>',
            anchors: []
        }
    },

    // Color tests
    {
        input: '!{red}(This is red)',
        expected: {
            output: '<p class="jt-yxtus"><span class="jt-yxtus" style="color:red!important">This is red</span></p>',
            anchors: []
        }
    },
    {
        input: '!{blue}(Blue text) and normal',
        expected: {
            output: '<p class="jt-yxtus"><span class="jt-yxtus" style="color:blue!important">Blue text</span> and normal</p>',
            anchors: []
        }
    },
    {
        input: '!{#ff0000}(Hex color)',
        expected: {
            output: '<p class="jt-yxtus"><span class="jt-yxtus" style="color:#ff0000!important">Hex color</span></p>',
            anchors: []
        }
    },
    {
        input: '!{#4caf50}(/Hola/ *mundo*) mundial.',
        expected: {
            output: '<p class="jt-yxtus"><span class="jt-yxtus" style="color:#4caf50!important"><em class="jt-yxtus">Hola</em> <strong class="jt-yxtus">mundo</strong></span> mundial.</p>',
            anchors: []
        }
    },
    {
        input: '| Header | !{red}(Red) |\n| --- | --- |\n| Cell | Normal |',
        expected: {
            output: '\n<table class="jt-yxtus"><thead><tr><th>Header</th><th><span class="jt-yxtus" style="color:red!important">Red</span></th></tr></thead><tbody><tr><td>Cell</td><td>Normal</td></tr></tbody></table>',
            anchors: []
        }
    },
    {
        input: '[!{blue}(Blue link)](http://example.com)',
        expected: {
            output: '<a href="http://example.com" target="_blank" class="jt-yxtus jt-yxtus-link"><span class="jt-yxtus" style="color:blue!important">Blue link</span></a>',
            anchors: []
        }
    },

    // Alignment tests
    {
        input: '-:- Texto centrado',
        expected: {
            output: '<p class="jt-yxtus" style="text-align: center;">Texto centrado</p>',
            anchors: []
        }
    },
    {
        input: '-:- # Titulo',
        expected: {
            output: '<h1 id="titulo" class="jt-yxtus" style="text-align: center;">Titulo</h1>',
            anchors: [{ hash: 'titulo', name: 'Titulo', level: 1, children: [] }]
        }
    },
    {
        input: ':-- Texto alineado a la izquierda',
        expected: {
            output: '<p class="jt-yxtus" style="text-align: left;">Texto alineado a la izquierda</p>',
            anchors: []
        }
    },
    {
        input: '--: Texto alineado a la derecha',
        expected: {
            output: '<p class="jt-yxtus" style="text-align: right;">Texto alineado a la derecha</p>',
            anchors: []
        }
    },
    {
        input: '-:- Texto *negrita* centrado',
        expected: {
            output: '<p class="jt-yxtus" style="text-align: center;">Texto <strong class="jt-yxtus">negrita</strong> centrado</p>',
            anchors: []
        }
    },
    {
        input: ':-- Texto /cursiva/ a la izquierda',
        expected: {
            output: '<p class="jt-yxtus" style="text-align: left;">Texto <em class="jt-yxtus">cursiva</em> a la izquierda</p>',
            anchors: []
        }
    },
    {
        input: '--: Texto _subrayado_ a la derecha',
        expected: {
            output: '<p class="jt-yxtus" style="text-align: right;">Texto <u class="jt-yxtus">subrayado</u> a la derecha</p>',
            anchors: []
        }
    },

    // Mixed content tests
    {
        input: '# Título\n[Enlace](https://example.com)\n![Imagen](http://example.com/img.png)',
        expected: {
            output: '<h1 id="titulo" class="jt-yxtus">Título</h1>\n<a href="https://example.com" target="_blank" class="jt-yxtus jt-yxtus-link">Enlace</a>\n<img src="http://example.com/img.png" alt="Imagen" class="jt-yxtus" />',
            anchors: [{ hash: 'titulo', name: 'Título', level: 1, children: [] }]
        }
    },
    {
        input: '[Enlace](https://test.com)\n`https://example.com`\n```\nGET https://api.example.com\n```',
        expected: {
            output: '<a href="https://test.com" target="_blank" class="jt-yxtus jt-yxtus-link">Enlace</a>\n<code class="jt-yxtus jt-yxtus-code">https://example.com</code>\n<div class="jt-yxtus jt-yxtus-code-block"><button class="jt-yxtus" onclick="navigator.clipboard.writeText(this.nextElementSibling.getAttribute(\'data-code\'));"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"m12.593 23.258-.011.002-.071.035-.02.004-.014-.004-.071-.035q-.016-.005-.024.005l-.004.01-.017.428.005.02.01.013.104.074.015.004.012-.004.104-.074.012-.016.004-.017-.017-.427q-.004-.016-.017-.018m.265-.113-.013.002-.185.093-.01.01-.003.011.018.43.005.012.008.007.201.093q.019.005.029-.008l.004-.014-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014-.034.614q.001.018.017.024l.015-.002.201-.093.01-.008.004-.011.017-.43-.003-.012-.01-.01z\"/><path fill=\"currentColor\" d=\"M19 2a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-2v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2V4a2 2 0 0 1 2-2zm-4 6H5v12h10zm-5 7a1 1 0 1 1 0 2H8a1 1 0 1 1 0-2zm9-11H9v2h6a2 2 0 0 1 2 2v8h2zm-7 7a1 1 0 0 1 .117 1.993L12 13H8a1 1 0 0 1-.117-1.993L8 11z\"/></svg></button><pre class="jt-yxtus jt-yxtus-code" data-code="GET https://api.example.com"><div class="line"><span class="line-number">1</span><span class="code-line">GET https://api.example.com</span></div></pre></div>',
            anchors: []
        }
    },
    {
        input: '`https://example.com`',
        expected: {
            output: '<code class="jt-yxtus jt-yxtus-code">https://example.com</code>',
            anchors: []
        }
    },
    {
        input: '```\nGET https://api.example.com\n```',
        expected: {
            output: '<div class="jt-yxtus jt-yxtus-code-block"><button class="jt-yxtus" onclick="navigator.clipboard.writeText(this.nextElementSibling.getAttribute(\'data-code\'));"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"m12.593 23.258-.011.002-.071.035-.02.004-.014-.004-.071-.035q-.016-.005-.024.005l-.004.01-.017.428.005.02.01.013.104.074.015.004.012-.004.104-.074.012-.016.004-.017-.017-.427q-.004-.016-.017-.018m.265-.113-.013.002-.185.093-.01.01-.003.011.018.43.005.012.008.007.201.093q.019.005.029-.008l.004-.014-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014-.034.614q.001.018.017.024l.015-.002.201-.093.01-.008.004-.011.017-.43-.003-.012-.01-.01z\"/><path fill=\"currentColor\" d=\"M19 2a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-2v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2V4a2 2 0 0 1 2-2zm-4 6H5v12h10zm-5 7a1 1 0 1 1 0 2H8a1 1 0 1 1 0-2zm9-11H9v2h6a2 2 0 0 1 2 2v8h2zm-7 7a1 1 0 0 1 .117 1.993L12 13H8a1 1 0 0 1-.117-1.993L8 11z\"/></svg></button><pre class="jt-yxtus jt-yxtus-code" data-code="GET https://api.example.com"><div class="line"><span class="line-number">1</span><span class="code-line">GET https://api.example.com</span></div></pre></div>',
            anchors: []
        }
    },
    {
        input: '# Hola mundo\n\n¿Cómo !{#4caf50}(está) el *mundo*?',
        expected: {
            output: '<h1 id="hola-mundo" class="jt-yxtus">Hola mundo</h1>\n\n<p class="jt-yxtus">¿Cómo <span class="jt-yxtus" style="color:#4caf50!important">está</span> el <strong class="jt-yxtus">mundo</strong>?</p>',
            anchors: [{ hash: 'hola-mundo', name: 'Hola mundo', level: 1, children: [] }]
        }
    },
    {
        input: '> ;g-info; Información',
        expected: {
            output: '<blockquote class="jt-yxtus"><p class="jt-yxtus"><i class="jt-yxtus material-symbols-outlined">info</i> Información</p></blockquote>',
            anchors: []
        }
    }
];


console.log('\n--- Document Tests ---');

let docPassed = 0;
let docFailed: number[] = [];
documentTests.forEach((test, i) => {
    const result = parser.document(test.input);
    const isPass = JSON.stringify(result) === JSON.stringify(test.expected);
    if (isPass) docPassed++;
    else docFailed.push(i + 1);
    if (!isPass || showPassedTests) {
        console.log(`Document Test ${i + 1}:`);
        console.log(`Input:     ${test.input}`);
        console.log(`Expected:  ${JSON.stringify(test.expected)}`);
        console.log(`Got:       ${JSON.stringify(result)}`);
        console.log(`Pass:      ${isPass ? 'YES' : 'NO'}`);
        console.log('---');
    }
});
console.log(`Document tests passed: ${docPassed}/${documentTests.length}`);
if (docFailed.length > 0) {
    console.log(`Failed document tests: ${docFailed.join(', ')}`);
} else {
    console.log('All document tests passed successfully!');
}