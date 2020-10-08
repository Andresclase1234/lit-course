import { LitElement, html } from 'lit-element';
import { commonStyles } from '../../utils/custom-styles';
import '../../components/common-header';
import '../../components/work-header';
import './empleado-vacaciones/solicitud-vacaciones';
import './admin-vacaciones/admin-vacaciones';

const stat = ['Pendiente de aprobación', 'Aprobado', 'No aprobado'];
const data = [
  { id: 1, name: 'Andrés Blanco', request: '16/09/20', start: '15/10/20', finish: '20/10/20', state: stat[0], stateD: '16/09/20', arrState: stat },
  { id: 2, name: 'Mario Lopez', request: '17/09/20', start: '21/10/20', finish: '25/10/20', state: stat[1], stateD: '17/09/20', arrState: stat },
  { id: 3, name: 'Karina Bueno', request: '18/09/20', start: '22/10/20', finish: '30/10/20', state: stat[1], stateD: '18/09/20', arrState: stat }
];

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
      <solicitud-vacaciones></solicitud-vacaciones>
      <admin-vacaciones .list="${data}" .nElements="${2}"></admin-vacaciones>
    `;
  }
}

window.customElements.define('andresclase1234-page', Andresclase1234Page);
