import { LitElement, html, css } from 'lit';
import styles from './styles/shipping.js';
import '../components/mission-item.js';

// missions as constants
const missions = [
  { points: 50, title: "Write message in guest book", status: "incomplete" },
  { points: 50, title: "Take a picture using the photo booth", status: "incomplete" },
  { points: 100, title: "Find at least X Labubus around the venue", status: "incomplete" },
  { points: 100, title: "Join the dance class", status: "incomplete" },
  { points: 100, title: "Win rock paper scissors competition", status: "incomplete" },
  { points: 50, title: "Introduce yourself to someone you don't know (up to 3 people for 150 points total)", status: "incomplete" },
  { points: 50, title: "Get a score of at least 60 on <a href='https://arithmetic.zetamac.com/'>this arithmetic game</a> with default settings", status: "incomplete" },
  { points: 100, title: "Upload or promise to upload media of event to google drive", status: "incomplete" },
  { points: 25, title: "Try every food that you want (with menu link)", status: "incomplete" },
  { points: 100, title: "Win \"last one standing\" game", status: "incomplete" },
];
export class Shipping extends LitElement {
  static properties = {
    missions: { type: Array },
    totalPoints: { type: Number }
  };

  static styles = [
    styles,
    css`
      .total-points {
        margin-top: 20px;
        font-weight: bold;
      }
    `
  ];

  constructor() {
    super();
    this.missions = missions.map(m => ({ ...m }));
    this.totalPoints = this.calculatePoints();
    this.toggleMission = this.toggleMission.bind(this);
  }

  toggleMission(index) {
    const updated = [...this.missions];
    updated[index].status = updated[index].status === 'complete' ? 'incomplete' : 'complete';
    this.missions = updated;
    this.totalPoints = this.calculatePoints();
  }

  calculatePoints() {
    return this.missions
      .filter(m => m.status === 'complete')
      .reduce((sum, m) => sum + m.points, 0);
  }

  render() {
    return html`
      <div class="shippingContainer">
        <h1>Missions</h1>
        <div class="shippingWrapper">
          <table style="width: 400px;">
            <tbody>
              ${this.missions.map((m, i) => html`
                <mission-item 
                  .mission=${m} 
                  .index=${i} 
                  @toggle-mission=${(e) => this.toggleMission(e.detail.index)}>
                </mission-item>
              `)}
            </tbody>
          </table>
        </div>
      </div>
      <div class="points">
        <div class="total-points">Total Points: ${this.totalPoints}</div>
      </div>
    `;
  }
}

customElements.define('app-shipping', Shipping);
