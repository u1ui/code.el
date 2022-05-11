class code extends HTMLElement {
    constructor() {
        super();
        let shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `
        <style>
        </style>
        <slot></slot>
        `;
    }
    connectedCallback() {
        var code = this.innerHTML;

    }
    disconnectedCallback() {
    }
    // set value
    //static get observedAttributes() { return ['value'] }
    /*
    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'value') this.value = newValue;
        if (name === 'from') this._start = parseFloat(newValue);
        if (name === 'no-grouping') this.noGrouping = newValue!==null;
    }
    set value(value){
        let [integer, digits=''] = value.trim().split('.');
        this._minDigits = digits.length;

        this._end = Number(value);
        // todo: recalculate finalWidth
        this._animate(this.animatedValue, this._end);
    }
    */

}



customElements.define('u1-code', code)
