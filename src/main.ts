import './main.css';


const indicator = document.querySelector<HTMLDivElement>(
    '.loading-indicator'
);
indicator?.parentElement?.removeChild(indicator);

import('./app').then(m => {
    const elementId = '.page-wrapper';
    const container = document.querySelector<HTMLDivElement>(elementId);
    if (!container) {
        throw new Error(`Element with id ${elementId} doesn't exists !`)
    }
    const app = new m.App(container);
    app.run();
}).catch(ex => {
    console.error(ex);
});
