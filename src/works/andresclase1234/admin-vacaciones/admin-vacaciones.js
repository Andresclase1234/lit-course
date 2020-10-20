/* eslint-disable eqeqeq */
import { LitElement, css, html } from 'lit-element';

export class AdminVacaciones extends LitElement {
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
    `;
  }

  static get properties() {
    return {
      list: { type: Array },
      nElements: { type: Number },
      stepper: { type: Array, attribute: false },
      index: { type: Number, attribute: false },
      from: { type: Number, attribute: false },
      to: { type: Number, attribute: false }
    };
  }

  constructor() {
    super();
    this.list = [];
    this.nElements = 0;
    this.stepper = [];
    this.from = 0;
    this.to = this.nElements;
    this.index = 0;
  }

  async firstUpdated() {
    const nPages = Math.ceil(this.list.length / this.nElements);
    this.stepper = new Array(nPages).fill({});
    this.to = this.nElements;

    await this.updateComplete;
    this.setActiveStep(this.index);
  }

  setActiveStep(index) {
    this.shadowRoot.querySelectorAll('.step').forEach(row => {
      if (row.id === `_${index}`) {
        row.classList.add('active');
      } else {
        row.classList.remove('active');
      }
    });
  }

  showPage(index) {
    this.index = index;
    this.from = this.nElements * index;
    this.to = this.from + this.nElements;
    this.setActiveStep(index);
  }

  next() {
    if (this.index < this.stepper.length - 1) {
      this.showPage(this.index + 1);
    }
  }

  prev() {
    if (this.index > 0) {
      this.showPage(this.index - 1);
    }
  }

  orderList(column) {
    const orderedList = this.list.slice(this.from, this.to).sort((a, b) => {
      if (a[column] < b[column]) return -1;
      if (a[column] > b[column]) return 1;
      return 0;
    });

    if (JSON.stringify(this.list.slice(this.from, this.to)) === JSON.stringify((orderedList))) {
      orderedList.reverse();
    }

    const newList = [...this.list];
    let index = this.from;

    orderedList.forEach(orderedItem => {
      const element = this.list.find(item => item.id === orderedItem.id);
      newList[index] = element;
      index++;
    });

    this.list = [...newList];
  }

  renderStepper() {
    return html`
      <div class="stepper">
        <div class="step left" @click="${this.prev}">&#x25B7;</div>
        ${this.stepper.map((x, i) => html`
          <div id="${`_${i}`}" class="step" @click="${() => this.showPage(i)}">${i + 1}</div>
        `)}
        <div class="step" @click="${this.next}">&#x25B7;</div>
      </div>
    `;
  }

  render() {
    return html`
      <div class="container">
        ${this.renderStepper()}
        <table>
        <tr>
          <th><button class="order" @click="${() => this.orderList('name')}">Nombre del empleado <span>&#9662;</span></button></th>
          <th><button class="order" @click="${() => this.orderList('request')}">Fecha de solicitud <span>&#9662;</span></button></th>
          <th><button class="order" @click="${() => this.orderList('start')}">Fecha de inicio <span>&#9662;</span></button></th>
          <th><button class="order" @click="${() => this.orderList('finish')}">Fecha de fin <span>&#9662;</span></button></th>
          <th><button class="order">Estado de la solicitud </button></th>
          <th><button class="order" @click="${() => this.orderList('request')}">Fecha de estado <span>&#9662;</span></button></th>
        </tr>
        ${this.list.slice(this.from, this.to).map(item => html`
          <tr>
            <td>${item.name}</td>
            <td>${item.request}</td>
            <td>${item.start}</td>
            <td>${item.finish}</td>
            <td>
              <select>
              <option>${item.arrState[0]}</option>
              <option>${item.arrState[1]}</option>
              <option>${item.arrState[2]}</option>
              </select>
            </td>
            <td>${item.stateD}</td>
          </tr>
        `)}
        </table>
      </div>
    `;
  }
}
customElements.define('admin-vacaciones', AdminVacaciones);
