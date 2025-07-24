import { LitElement, html} from 'lit';
import styles from './styles/shipping.js';
import '../components/mission-item.js';
import cache from '../utils/cache.js';
import { getMissionsForUser, updateMissionStatus } from '../utils/fetch.js';
import { getUserList } from '../utils/fetch.js';


export class Shipping extends LitElement {
  static properties = {
    missions: { type: Array },
    totalPoints: { type: Number },
    status: { type: String, state: true }
  };

  static get styles() {
    return styles;
  }

  constructor() {
    super();
    this.missions = [];
    this.totalPoints = this.calculatePoints();
    this.toggleMission = this.toggleMission.bind(this);
    this.status = 'loading';
    this.userId = null;
    this.user = null;
  }

  connectedCallback() {
    super.connectedCallback();
    this.handleRouteChange = this.handleRouteChange.bind(this);
    window.addEventListener('route', this.handleRouteChange);
  }

  disconnectedCallback() {
    window.removeEventListener('route', this.handleRouteChange);
    super.disconnectedCallback();
  }

  async firstUpdated() {
    await this.loadData();
  }

  async handleRouteChange() {
    if (window.location.pathname === '/shipping') {
      await this.loadData();
    }
  }

  async toggleMission(index) {
    const missionToUpdate = this.missions[index];
    const originalStatus = missionToUpdate.status;
    const newStatus =  missionToUpdate.status === 'complete' ? 'incomplete' : 'complete';

    // Optimistic UI update by creating a new array with a new object for the updated item
    this.missions = this.missions.map((mission, i) =>
      i === index ? { ...mission, status: newStatus } : mission
    );

    this.user.points = this.calculatePoints();
    console.log("user: ", this.user);

    // Persist change to backend
    const result = await updateMissionStatus(this.userId, missionToUpdate.mission_id, newStatus === 'complete');

    if (result?.apiError) {
      console.error("Failed to update mission status:", result.apiError);
      // Revert UI change on failure
      this.missions = this.missions.map((mission, i) =>
        i === index ? { ...mission, status: originalStatus } : mission
      );
      this.user.points = this.calculatePoints();
    }
    this.requestUpdate();
    // await this.loadData();
  }

  async loadData() {
    this.status = 'loading';
    this.requestUpdate();

    const params = new URLSearchParams(window.location.search);
    let userId = params.get('userId');
    
   if (userId) {
      console.log("if");
      this.userId = parseInt(userId, 10);
    } else {
      console.log("else");
      this.userId = await cache.get('userId')
    }

    let missionList = await getMissionsForUser(this.userId);
    let userList = await getUserList(); 
    if (missionList && !missionList.apiError) {
      this.missions = missionList.map(m => (
        { ...m, status: m.completed ? 'complete' : 'incomplete' }));
    } else {
      console.error(
        'Could not fetch user list for leaderboard',
        missionList?.apiError
      );
    }
    this.user = userList.find(u => u.id === this.userId);
    console.log("user: ", this.user);
    this.user.points = this.calculatePoints();

    this.status = 'loaded';
    this.requestUpdate();
  }

  calculatePoints() {
    return this.missions
      .filter(m => m.status === 'complete')
      .reduce((sum, m) => sum + m.points, 0);
  }

  render() {

    if (this.status === 'loading') {
      return html`<div class="shippingContainer">
        <h1>Missions</h1>
        <app-loading></app-loading>
      </div>`;
    }

    return html`
      <div class="shippingContainer">
        <h1>Missions</h1>
        <div class="shippingWrapper">
            ${this.missions.map((m, i) => html`
              <mission-item 
                .mission=${m} 
                .index=${i} 
                @toggle-mission=${(e) => this.toggleMission(e.detail.index)}>
              </mission-item>
            `)}
        </div>
      </div>
      <div class="points">
        <div class="total-points">Total Points: ${this.user.points}</div>
      </div>
    `;
  }
}

customElements.define('app-shipping', Shipping);
