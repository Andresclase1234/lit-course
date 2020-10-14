/* eslint-disable no-console */
import { LitElement, html } from 'lit-element';
import { commonStyles } from '../../utils/custom-styles';
import '../../components/common-header';
import '../../components/work-header';
import './components/vacation-form/components/vacation-form';
import './components/admin-vacation-form/components/admin-vacation-form';

class AntoniomaracilPage extends LitElement {
  static get styles() {
    return [
      commonStyles
    ];
  }

  static get properties() {
    return {
      list: { type: Array }
    };
  }

  constructor() {
    super();
    this.list = [];
  }

  updateArray(e) {
    this.list = [...e.detail.applications];
  }

  render() {
    return html`
      <common-header></common-header>
      <section class="container">
        <work-header>antoniomaracil</work-header>
        <h2 style="text-align:center;">Vacation Form</h2>
        <hr>
        <vacation-form @update-array="${this.updateArray}" .nElements="${10}" .list="${this.list}"></vacation-form>
        <hr>
        <h2 style="text-align:center;">Admin vacation Form</h2>
        <hr>
        <admin-vacation-form .list="${this.list}" .nElements="${10}" @update-array="${this.updateArray}"></admin-vacation-form>
      </section>
    `;
  }
}

window.customElements.define('antoniomaracil-page', AntoniomaracilPage);
