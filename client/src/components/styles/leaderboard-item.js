import { css } from 'lit';

const styles = css`
  .user-item {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    padding: 10px;
  }
  .user-name {
    margin-left: 10px;
    margin-right: auto; 
    font-size: 1.5em;
  }
  .user-image {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-left: 10px; 
    object-fit: cover;
  }

  .rank{
   font-size: 1.5em;
   text-align: right;
  }

  .user-points {
    margin-right: 20px;
    font-size: 1.5em;
  }
`;

export default styles;
