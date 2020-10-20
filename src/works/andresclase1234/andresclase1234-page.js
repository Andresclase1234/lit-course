import { LitElement, html } from 'lit-element';
import { commonStyles } from '../../utils/custom-styles';
import { dates } from './utils/data';
import '../../components/common-header';
import '../../components/work-header';
import './admin-vacaciones/admin-vacaciones';

const components = {
  adminVacaciones: () => html`<admin-vacaciones list="${dates}"></admin-vacaciones>`
};

class Andresclase1234Page extends LitElement {
  static get styles() {
    return [
      commonStyles
    ];
  }

  static get properties() {
    return {
      current: { type: String, attribute: false }
    };
  }

  constructor() {
    super();
    this.current = 'adminVacaciones';
  }

  setComponent(component) {
    this.current = component;
  }

  render() {
    return html`
        <common-header></common-header>
        <section class="container">
          <work-header>andresclase1234</work-header>
          <div class="common-list">
            ${Object.keys(components).map(item => html`
              <button class="common-btn" @click="${() => this.setComponent(item)}">${item}</button>
            `)}
          </div>
          ${components[this.current]()}
        </section>
      `;
  }
}

window.customElements.define('andresclase1234-page', Andresclase1234Page);
