import { css } from 'lit';

const styles = css`
    .signInContainer {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-family: var(--base-font);
        font-size: 1em;
    }

    h1 {
        color: var(--color-secondary);
        font-size: 2.5em;
    }

    .name {
        padding: 10px;
    }

    input {
        font-family: var(--base-font);
        font-size: 1em;
        border-radius: 20px;
        border: 1px solid lightgray;
        padding: 5px;
        padding-left: 10px;
    }
    
    .dialogButton {
        margin-top: 20px;
        --mdc-typography-button-font-family: var(--base-font);
        --mdc-typography-button-font-size: 1em;
        --mdc-typography-button-font-weight: bold;
        --mdc-theme-primary: var(--site-name-color);
        border: 1px solid lightgray;
        border-radius: 5px;
        padding: 5px;
    }
    
`;

export default styles;