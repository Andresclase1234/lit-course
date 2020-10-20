import { LitElement, html } from 'lit-element';
import { commonStyles } from '../../utils/custom-styles';
import { dates } from './utils/data';
import '../../components/common-header';
import '../../components/work-header';
import './empleado-vacaciones/solicitud-vacaciones';
import './admin-vacaciones/admin-vacaciones';
import './info-holidays/info-holidays';

class Andresclase1234Page extends LitElement {
  static get styles() {
    return [
      commonStyles
    ];
  }

  render() {
    return html`
      <common-header></common-header>
      <section class="container">
        <work-header>Andresclase1234</work-header>
      </section>
      <info-holidays .list="${dates}" .nElements="${2}"></info-holidays>
    `;
  }
}

window.customElements.define('andresclase1234-page', Andresclase1234Page);
