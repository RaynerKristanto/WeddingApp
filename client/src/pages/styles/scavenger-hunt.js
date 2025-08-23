import { css } from 'lit';

const styles = css`
  h1 {
    color: var(--color-secondary);
    font-size: 2.2em;
  }

  .productContainer {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    margin: 20px;
  }

  .riddleContainer {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-content: center;
    margin-bottom: 20px;
  }
  .number {
    font-size: 2em;
    color: var(--site-name-color);
  }

  .riddle {
    font-size: 1.3em;
  }
`;

export default styles;