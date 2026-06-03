import './app.css';

export class App {

    /** app title */
    public title = 'Hello, Rollup !';

    constructor(private container: HTMLElement) { }

    /**
     * run the app.
     */
    public run(): void {
        this.container.innerHTML = `<h1 class="text-3xl font-bold underline">${this.title}</h1> hello, world!`;
        this.container.classList.add('app');
    }

}
