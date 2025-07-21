import { LitElement, html, css } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import styles from './styles/mission-item.js';

export class MissionItem extends LitElement {
  static properties = {
    mission: { type: Object },
    index: { type: Number },
  };

  static get styles() {
    return styles;
  }

  constructor() {
    super();
    this.mission = {};
    this.index = -1;
  }

  render() {
    return html`
      <div class="mission-item ${this.mission.status === 'complete' ? 'complete' : ''}">
          <input 
            type="checkbox"
            .checked=${this.mission.status === 'complete'}
            @change=${() =>
                this.dispatchEvent(new CustomEvent('toggle-mission', {
                  detail: { index: this.index },
                  bubbles: true,
                  composed: true
                }))}
          />
          <div class="mission-description">${unsafeHTML(this.mission.description)}</div>
          <div class="mission-points">${this.mission.points}</div>
      </div>
    `;
  }
}  

customElements.define('mission-item', MissionItem);
