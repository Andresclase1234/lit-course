/* eslint-disable eqeqeq */
import { LitElement, css, html } from 'lit-element';

export class SolicitudVacaciones extends LitElement {
  static get styles() {
    return css`
    table {
        border: 1px solid #e4e4e4;
        padding: 10px;
        width: 90%;
        margin-left: 5%;
        margin-right: 5%;
      }

      tr {
        text-align: left;
      }
      
      .order {
        padding: 0;
        background-color: transparent;
        border: none;
        margin-bottom: 10px;
        cursor: pointer;
      }

      .stepper {
        margin: 10px 0;
        width: 90%;
        margin-left: 5%;
        margin-right: 5%;        
      }

      .stepper .step:hover {
        background-color: #f1f1f1;
      }

      .step {
        display: inline-block;
        padding: 5px;
        border: 1px solid #d8d7d7;
        width: 20px;
        height: auto;
        text-align: center;
        cursor: pointer;
      }

      .step.active {
        background-color: #535353 !important;
        color: white;
      }

      .step.left {
        transform: rotate(180deg);
      }

      .stepper, .step {
        user-select: none;
      }

      .form {
        padding: 10px;
        width: 90%;
        margin-left: 5%;
        margin-right: 5%;
      }
        `;
  }

  static get properties() {
    return {
      table: { type: Array },
      aproved: { type: String },
      asc: { type: Boolean }
    };
  }

  constructor() {
    super();
    this.table = [];
    this.aproved = 'Pendiente  de aprobación';
    this.asc = true;
  };

  /**
     * Añade un nuevo elemento al array.
     */
  add() {
    const input1 = new Date();
    const input2 = this.shadowRoot.querySelector('#start');
    const input3 = this.shadowRoot.querySelector('#end');
    const item = {
      request: input1.getDate() + '/' + (input1.getMonth() + 1) + '/' + input1.getFullYear(),
      start: input2.value,
      finish: input3.value,
      aproved: this.aproved
    };
    this.table = [...[item], ...this.table];
  }

  /**
     * Ordenar por valor el pasado por parámetro
     */
  sort(colum) {
    const fechas = this.table;
    if (this.asc == true) {
      fechas.sort(function(a, b) {
        if (a[colum] > b[colum]) {
          return 1;
        }
        if (a.start < b.start) {
          return -1;
        }
        return 0;
      });
      this.table = [...fechas];
      this.asc = !this.asc;
    } else {
      this.table = [...fechas.reverse()];
      this.asc = !this.asc;
    }
  }

  /**
     * Borra el elemento de la posición.
     * @param index Posición del elemento.
     */
  deleteItem(index) {
    const array = this.table;
    if (this.table[index].aproved === 'Pendiente  de aprobación') {
      array.splice(index, 1);
      this.table = [...array];
    } else {
      // eslint-disable-next-line no-alert
      alert('Operación imposible. Solicitud ya aceptada.');
    }
  }

  render() {
    return html`
        <div class="menu-list">
            <h2 title="Solicitud de vacaciones">Solicitud de vacaciones</h2>
            <div class="form"> 
                Fecha Inicio <input type="date" id="start" min="2020-01-01" max="2021-12-31">
                Fecha Fin <input type="date" id="end" min="2020-01-01" max="2021-12-31"> 
                <button @click="${this.add}">Agregar</button>
            </div>
        </div>
        <table>
            <tr>
                <td> Fecha de Solicitud <button @click="${() => this.sort('request')}">Ordenar</button></td>
                <td> Fecha de Inicio  <button @click="${() => this.sort('start')}">Ordenar</button></td>
                <td> Fecha de Fin  <button @click="${() => this.sort('finish')}">Ordenar</button></td>
                <td> Estado de la solicitud </td>
                <td> Fecha de estado  </td>
                <td> Eliminar </td>
            </tr>
            ${this.table.map((item, i) => html`
            <tr>
                <td>${item.request}</td>
                <td>${item.start}</td>
                <td>${item.finish}</td>
                <td>${item.aproved}</td>
                <td>${item.request}</td>
                <td><button @click="${() => this.deleteItem(i)}">&times;</button></td>
            </tr>
                `)}
        </table>
        `;
  }
}
customElements.define('solicitud-vacaciones', SolicitudVacaciones);
