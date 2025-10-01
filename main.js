import './style.css';

const registry1 = new CustomElementRegistry();
const registry2 = new CustomElementRegistry();

class FlagIcon extends HTMLElement {
  constructor() {
    super();
    this._countryCode = null;
  }

  static observedAttributes = ["country"];

  attributeChangedCallback(name, oldValue, newValue) {
    // name will always be "country" due to observedAttributes
    this._countryCode = newValue;
    this._updateRendering();
  }
  connectedCallback() {
    this._updateRendering();
  }

  get country() {
    return this._countryCode;
  }
  set country(v) {
    this.setAttribute("country", v);
  }

  _updateRendering = () => {
    // Left as an exercise for the reader. But, you'll probably want to
    // check this.ownerDocument.defaultView to see if we've been
    // inserted into a document with a browsing context, and avoid
    // doing any work if not.
    if (!this.shadowRoot) {
        this.attachShadow({ mode: "open", clonable: true });
    }
    
    this.shadowRoot.innerHTML = `country - ${this.country}`;
  }
}

class CountryName extends HTMLElement {
  connectedCallback() {
    this._updateRendering();
  }

  _updateRendering = () => {
    // Left as an exercise for the reader. But, you'll probably want to
    // check this.ownerDocument.defaultView to see if we've been
    // inserted into a document with a browsing context, and avoid
    // doing any work if not.
    if (!this.shadowRoot) {
        this.attachShadow({ mode: "open", clonable: true });
    }
    
    this.shadowRoot.innerHTML = `Some country name`;
  }
}

console.log('Hello World Vite app is running!')

registry2.define("country-name", CountryName);

class FlagWrapper extends HTMLElement {
  connectedCallback() {
    this._updateRendering();
  }

  _updateRendering = () => {
    // Left as an exercise for the reader. But, you'll probably want to
    // check this.ownerDocument.defaultView to see if we've been
    // inserted into a document with a browsing context, and avoid
    // doing any work if not.
    if (!this.shadowRoot) {
        this.attachShadow({ mode: "open", clonable: true, customElementRegistry: registry2 });
    }
    
    this.shadowRoot.innerHTML = `<flag-icon country="nl"></flag-icon> / <country-name></country-name>`;
  }
}
registry2.define("flag-icon", FlagIcon);
customElements.define("flag-icon", FlagIcon);
customElements.define('flag-wrapper', FlagWrapper);