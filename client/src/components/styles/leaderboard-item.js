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
  }
  .user-image {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-left: 10px; 
    object-fit: cover;
  }
  .user-points {
    margin-right: 20px;
  }
`;

export default styles;
