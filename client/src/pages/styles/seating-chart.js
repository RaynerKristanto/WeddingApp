import { css } from 'lit';

const styles = css`
  .seatingContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
  }

  h1 {
    color: var(--color-secondary);
    font-size: 2.2em;
    padding-top: 20px;
  }

  input {
    font-family: var(--base-font);
    font-size: 1em;
    border-radius: 20px;
    border: 1px solid lightgray;
    padding: 5px;
    padding-left: 10px;
  }

  .seatingWrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 800px;
  }

  .table {
    text-align: left;
    font-size: 2em;
    margin-bottom: 10px;
  }

  .table-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    gap: 20px;
  }

  .table-container {
    padding: 15px;
    width: 48%;
    box-sizing: border-box;
    text-align: center;
  }

  .table-container ul {
    list-style: none;
    padding-left: 30px;
    margin: 0;
    text-align: left;
    font-size: 1em;
  }

  .table-container ul li {
    padding: 2px 0;
  }

`;

export default styles;
