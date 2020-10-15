/* eslint-disable no-alert */
/* eslint-disable eqeqeq */
import { LitElement, css, html } from 'lit-element';

export class SolicitudVacaciones extends LitElement {
  static get styles() {
    return css`
        table {
            border-collapse: collapse;
            border-spacing: 0;
            width: 90%;
            border: 1px solid #ddd;
            margin-left: 5%;
            margin-right: 5%;
        }
        td {
            text-align: left;
            padding: 8px;
            border: 1px solid #e4e4e4;
          }
        tr:nth-child(even){background-color: #f2f2f2}
        .menu-list {
            width:90%;
            margin:auto
        }
        .add{
          background-color: white;
          color: black;
          border: 2px solid #555555;
          padding: 3px 32px;
        }
        .add:hover {
          background-color: #555555;
          color: white;
        }
        button  {
        padding: 0;
        background-color: transparent;
        border: none;
        margin-bottom: 10px;
        cursor: pointer;
        }
        `;
  }

  static get properties() {
    return {
      table: { type: Array, attribute: false },
      aproved: { type: String, attribute: false },
      asc: { type: Boolean, attribute: false }
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
      alert('Operación imposible. Solicitud ya aceptada.');
    }
  }

  render() {
    return html`
        <div class="menu-list">
            <h2 title="Solicitud de vacaciones">Solicitud de vacaciones</h2>
            <p> 
                Fecha Inicio <input type="date" id="start" min="2020-01-01" max="2021-12-31">
                Fecha Fin <input type="date" id="end" min="2020-01-01" max="2021-12-31"> 
                <button class ="add" @click="${this.add}">Agregar</button>
            </p>
        </div>
        <table>
            <tr>
                <td><button @click="${() => this.sort('request')}">Fecha de Solicitud <span>&#9662;</span></button></td>
                <td><button @click="${() => this.sort('start')}">Fecha de Inicio <span>&#9662;</span></button></td>
                <td><button @click="${() => this.sort('finish')}">Fecha de Fin <span>&#9662;</span></button></td>
                <td><button> Estado de la solicitud </button> </td>
                <td><button> Fecha de estado </button>  </td>
                <td><button> Eliminar </button></td>
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
