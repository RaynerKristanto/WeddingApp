import { LitElement, html} from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import styles from './styles/mission-item.js';

const lock = new URL('../../assets/lock.png', import.meta.url).href;

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

  createMissionClass(mission) {
    if (mission.status === 'complete') {
      return 'complete';
    } else if (mission.hidden) {
      return 'hidden';
    }
    return '';
  }

  render() {
    return html`
      <div class="mission-item ${this.createMissionClass(this.mission)}">
          <input 
            type="checkbox"
            .checked=${this.mission.status === 'complete'}
            .disabled=${this.mission.hidden}
            @change=${() =>
                this.dispatchEvent(new CustomEvent('toggle-mission', {
                  detail: { index: this.index },
                  bubbles: true,
                  composed: true
                }))}
          />
          <div class="lock">
              <img src=${lock} alt="Lock"/>
          </div>
          <div class="missionWrapper">
            <div class="mission-description">${unsafeHTML(this.mission.description)}</div>
            <div class="mission-points">${this.mission.points}</div>
          </div>
      </div>
    `;
  }
}  

customElements.define('mission-item', MissionItem);
