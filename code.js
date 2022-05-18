
const libPromise = import('https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.5.0/build/es/highlight.min.js');

class code extends HTMLElement {
    constructor() {
        super();
        let shadowRoot = this.attachShadow({mode:'open'});
        shadowRoot.innerHTML =
        `<style>
        :host {
            position:relative;
            white-space:normal !important;
            display:grid !important;
        }
        :host > * {
            grid-area:1/1/1/1;
            line-height:inherit;
            font:inherit;
            white-space: pre;
        }
        #code {
            width:max-content;
        }
        textarea {
            display:none;
            resize:none;
            background-color:transparent;
            color:#0000;
            caret-color:#000;
            border:none;
            margin:0;
            padding:0;
            outline:none;
        }
        #tools {
            transition:.1s;
            display:flex;
            justify-content:flex-end;
            align-items:start;
            pointer-events:none;
        }
        #tools > * {
            position:sticky;
            right:0;
            top:0;
            pointer-events:all;
        }
        :host(:not(:hover)) #tools {
            opacity:0;
            visibility:hidden;
        }
        :host([editable]) textarea {
            display:block !important;
        }
        </style>





        <div id=code></div>
        <textarea autocomplete=off autocorrect=off autocapitalize=off spellcheck=false>test</textarea> <!-- would be great, if in the case of a hightlighted textarea, the original textarea would be used -->
        <div id=tools>
            <!--button id=fullscreen>fullscreen</button-->
            <button id=copy>copy</button>
        </div>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.5.0/build/styles/github.min.css">
        `;

        this.textarea = shadowRoot.querySelector('textarea');

        shadowRoot.querySelector('#copy').addEventListener('click', () => {
            let code = shadowRoot.querySelector('#code').textContent;
            navigator.clipboard.writeText(code);
            document.execCommand('copy');
        });
        // shadowRoot.querySelector('#fullscreen').addEventListener('click', () => {
        //     this.requestFullscreen();
        // });
        this.textarea.addEventListener('input', e => {
            this.setHightlightValue(e.target.value);
            this.setSourceValue(e.target.value);
        });
        this.textarea.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                e.preventDefault();
                var start = this.selectionStart;
                var end = this.selectionEnd;
                this.value = this.value.substring(0, start) + "\t" + this.value.substring(end);
                this.selectionStart = this.selectionEnd = start + 1;
                this.dispatchEvent(new Event('input', { bubbles: true }));
            }
        });
    }
    setHightlightValue(value){
        libPromise.then( ({default:hljs})=>{
            let language = false; // todo
            this.shadowRoot.querySelector('#code').innerHTML = (
                language ?
                  hljs.highlight(value, {language}) :
                  hljs.highlightAuto(value)
              ).value + '<br>';
        });
    }
    setSourceValue(value){
        const el = this.sourceElement;
        if (el.tagName === 'TEXTAREA') { el.value = value; return; }
        //if (el.tagName === 'TEMPLATE') { el.innerHTML = value; return; }
        el.textContent = value;
    }
    getSourceValue(){
        const el = this.sourceElement;
        if (el.tagName === 'TEXTAREA') return el.value;
        //if (el.tagName === 'TEMPLATE') return el.innerHTML;
        if (el.tagName === 'SCRIPT') return el.textContent.replaceAll('\\/script>','/script>');
        return el.textContent;
    }
    connectedCallback() {
        //this.sourceElement = this.querySelector('pre>code,textarea,style,script,template') || this;
        this.sourceElement = this.querySelector('pre>code,textarea,style,script') || this;
        if (this.sourceElement.tagName === 'TEXTAREA') {
            this.setAttribute('editable','');
        }
        let value = this.getSourceValue();
        if (this.trim) value = trimCode(value);
        this.setHightlightValue(value);
        this.textarea.value = value;
    }
    disconnectedCallback() {
    }
    get value(){
        return this.getSourceValue();

    }
    static get observedAttributes() { return ['trim'] }
    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'trim') this.trim = newValue!=null;
    }

}

customElements.define('u1-code', code)


function trimCode(value){
    const lines = value.split('\n');
    // remove first and last line if only contains whitespaces
    if (lines[0].trim() === '') lines.shift();
    if (lines[lines.length - 1].trim() === '') lines.pop();
    // evaluate min num of starting whitespace
    let minWhitespace = 999;
    for (const line of lines) {
        const num = line.match(/^\s*/)[0].length;
        if (num < minWhitespace) minWhitespace = num;
    }
    // remove starting minWhitespaces and join lines
    return lines.map(line => line.slice(minWhitespace)).join('\n');
}
/*
function htmlDecode(input) {
    var doc = new DOMParser().parseFromString(input, "text/html");
    return doc.documentElement.textContent;
}
function htmlEncode(input) {
    return input.replace(/[\u00A0-\u9999<>\&]/g, function(i) {
        return '&#'+i.charCodeAt(0)+';';
    });
}
*/