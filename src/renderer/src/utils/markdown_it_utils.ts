import markdown from 'markdown-it';
import attrs from 'markdown-it-attrs';
import hljs from 'highlight.js';
class MarkDownRenender {
    private md: markdown;
    constructor() {
        this.init();
    }
    init() {
        this.md = markdown({
            html: true,
            linkify: true,
            typographer: true,
            highlight: function (str: string, lang: string) {
                if (lang && hljs.getLanguage(lang)) {
                    try {
                        return hljs.highlight(lang, str).value;
                    } catch (__) {
                        console.error(__);
                    }
                }

                return ''; // 使用内置的转义功能
            },
        });
        this.md.use(attrs);
    }
    public render(content: string) {
        return this.md.render(content)
    }
}
const markdownRender = new MarkDownRenender();
export default markdownRender;
