import { LitElement, html, css } from 'lit';
import styles from './styles/shipping.js'; // your existing styles

// missions as constants
const missions = [
  { points: 50, title: "Write message in guest book", status: "incomplete" },
  { points: 50, title: "Take a picture using the photo booth", status: "incomplete" },
  { points: 100, title: "Find at least X Labubus around the venue", status: "incomplete" },
  { points: 100, title: "Join the dance class", status: "incomplete" },
  { points: 100, title: "Win rock paper scissors competition", status: "incomplete" },
  { points: 50, title: "Introduce yourself to someone you don't know (up to 3 people for 150 points total)", status: "incomplete" },
  { points: 50, title: "Get a score of at least 60 on <a href='https://arithmetic.zetamac.com/'>https://arithmetic.zetamac.com/</a> with default settings", status: "incomplete" },
  { points: 100, title: "Upload or promise to upload media of event to google drive", status: "incomplete" },
  { points: 25, title: "Try every food that you want (with menu link)", status: "incomplete" },
  { points: 100, title: "Win \"last one standing\" game", status: "incomplete" },
];

export class Shipping extends LitElement {
  static properties = {
    missions: { type: Array },
    totalPoints: { type: Number }
  };

  // checklist styling
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
      .total-points {
        margin-top: 20px;
        font-weight: bold;
      }
    `
  ];

  constructor() {
    super();
    this.missions = [...missions];
    this.totalPoints = this.calculatePoints();
  }

  toggleMission(index) {
    const updated = [...this.missions];
    updated[index].status = updated[index].status == 'complete' ? 'incomplete' : 'complete';
    this.missions = updated;
    this.totalPoints = this.calculatePoints();
  }

  calculatePoints() {
    return this.missions
      .filter(m => m.status == 'complete')
      .reduce((sum, m) => sum + m.points, 0);
  }

  render() {
    return html`
      <div class="shippingContainer">
        <h1>Missions</h1>
        <div class="shippingWrapper">
          <table id="table">
            <tr>
              <th></th>
              <th>Points</th>
              <th style="text-align: left; text-indent: 50px">Mission</th>
            </tr>
            ${this.missions.map((m, i) => html`
              <tr>
                <td>
                  <input
                    type="checkbox"
                    .checked=${m.status == 'complete'}
                    @change=${() => this.toggleMission(i)}
                  />
                </td>
                <td>${m.points}</td>
                <td class=${m.status == 'complete' ? 'complete' : ''}>
                  ${unsafeHTML(m.title)}
                </td>
              </tr>
            `)}
          </table>
          <div class="total-points">Total Points Earned: ${this.totalPoints}</div>
        </div>
      </div>
    `;
  }
}

import { unsafeHTML } from 'lit/directives/unsafe-html.js';

customElements.define('app-shipping', Shipping);
