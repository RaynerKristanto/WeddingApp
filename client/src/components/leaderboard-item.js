import { LitElement, html } from 'lit';
import styles from './styles/leaderboard-item.js';

export class LeaderboardItem extends LitElement{
    static properties = {
      rank: { type: Number },
      imageSrc: { type: String },
      name: { type: String },
      points: { type: Number },
    };

    constructor(rank, imageSrc, name, points) {
      super();
      this.rank = rank;
      this.imageSrc = imageSrc;
      this.name = name;
      this.points = points;
    }

    static styles = styles;
  
    render() {
      return html`
        <div class="user-item">
          <span class="rank">${this.rank}.</span>
          <img src="${this.imageSrc}" alt="${this.name}" class="user-image">
          <span class="user-name">${this.name}</span>
          <span class="user-points">${this.points}</span>
        </div>
      `;
    }
  }

  customElements.define('leaderboard-item', LeaderboardItem);
  