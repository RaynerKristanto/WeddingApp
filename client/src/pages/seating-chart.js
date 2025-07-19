import { LitElement, html } from 'lit';
import styles from './styles/seating-chart.js';

import tablesJson from '../../table.json' with { type: 'json' };

export class SeatingChart extends LitElement {
  static properties = {
    tables: { type: Object },
  };

  static styles = [styles];

  constructor() {
    super();
    this.tables = tablesJson || {};
  }

  render() {
    const tableEntries = Object.entries(this.tables);
    const tablePairs = [];
    for (let i = 0; i < tableEntries.length; i += 2) {
      tablePairs.push(tableEntries.slice(i, i + 2));
    }

    return html`
      <div class="seatingContainer">
        <h1>Seating Chart</h1>
        <div class="searchBar">
          <label for="search">Search:</label>
          <input type="text" placeholder="Name" />
        </div>
        <div class="seatingWrapper">
          ${tablePairs.length > 0
            ? tablePairs.map(
                (pair) => html`
                  <div class="table-row">
                    ${pair.map(
                      ([table, guests]) => html`
                        <div class="table-container">
                          <div class="table">${table}</div>
                          <ul>
                            ${guests.map((guest) => html`<li>${guest}</li>`)}
                          </ul>
                        </div>
                      `
                    )}
                  </div>
                `
              )
            : html`<p>No table mappings found in package.json.</p>`}
        </div>
      </div>
    `;
  }
}

customElements.define('app-seating-chart', SeatingChart);