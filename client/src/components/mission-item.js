import { LitElement, html, css } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import styles from './styles/mission-item.js';

export class MissionItem extends LitElement {
  static properties = {
    mission: { type: Object },
    index: { type: Number },
  };

  static styles = [
    styles,
    css`
    .complete {
      text-decoration: line-through;
      color: gray;
    }
    td input[type="checkbox"] {
      transform: scale(1.2);
    }
  `];

  constructor() {
    super();
    this.mission = {};
    this.index = -1;
  }

  render() {
    return html`
        <td style="width: 100px;">${this.mission.points}</td>
        <td style="text-align: left; width: 225px;" class=${this.mission.status === 'complete' ? 'complete' : ''}>
            ${unsafeHTML(this.mission.title)}
        </td>
        <td style="vertical-align: middle;">
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
        </td>
    `;
  }
}  

customElements.define('mission-item', MissionItem);
