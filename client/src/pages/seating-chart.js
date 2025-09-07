import { LitElement, html } from 'lit';
import styles from './styles/seating-chart.js';

import tablesJson from '../../atlanta.js';

export class SeatingChart extends LitElement {
  static properties = {
    tables: { type: Object },
    searchInput: { type: String, state: true },
  };

  static styles = [styles];

  constructor() {
    super();
    this.tables = tablesJson || {};
    this.searchInput = '';
  }

  searchName(e) {
    this.searchInput = e.target.value.toLowerCase();
  }

  get filteredTables() {
    if (!this.searchInput) {
      return this.tables;
    }

    return Object.entries(this.tables).reduce((acc, [table, guests]) => {
      const hasMatchingGuest = guests.some((guest) =>
        guest.toLowerCase().includes(this.searchInput)
      );
      if (hasMatchingGuest) {
        acc[table] = guests;
      }
      return acc;
    }, {});
  }

  render() {
    const tableEntries = Object.entries(this.filteredTables);
    const tablePairs = [];
    for (let i = 0; i < tableEntries.length; i += 2) {
      tablePairs.push(tableEntries.slice(i, i + 2));
    }

    return html`
      <div class="seatingContainer">
        <h1>Seating Chart</h1>
        <div class="searchBar">
          <label for="search">Search:</label>
          <input
            id="searchInput"
            type="text"
            placeholder="Name"
            @input=${this.searchName}
          />
        </div>
        <div class="seatingWrapper">
          ${tablePairs.length > 0
            ? tablePairs.map(
                (pair) => html`
                  <div class="table-row">
                    ${pair.map(
                      ([table, guests]) => html`
                        <div class="table-container" id="${table}">
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
            : this.searchInput
            ? html`<p>No guest found with that name.</p>`
            : html`<p>No table mappings found.</p>`}
        </div>
      </div>
    `;
  }
}

customElements.define('app-seating-chart', SeatingChart);