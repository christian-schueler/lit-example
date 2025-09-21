import { LitElement, html, css } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { Task } from '@lit/task';

declare type Joke = {
  id: number;
  type: string;
  setup: string;
  punchline: string;
};

@customElement('lit-task-example')
export class LitTaskExample extends LitElement {
  private _hidePunchline: boolean = true;

  static styles = css`
    :host {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      font-size: calc(10px + 2vmin);
      color: #1a2b42;
      max-width: 960px;
      margin: 0 auto;
      text-align: center;
      background-color: var(--lit-examples-background-color);
    }

    main {
      flex-grow: 1;
    }
  `;

  protected _fetchJoke = new Task(this, {
    task: async (): Promise<Joke> => {
      this._hidePunchline = true;
      const response: Response = await fetch("https://official-joke-api.appspot.com/random_joke");
      if (!response.ok) { throw new Error(`Error occurred: ${response.status}`); }
      return response.json() as unknown as Joke;
    },
  });

  private __showPunchline() {
    this._hidePunchline = false;
    this.requestUpdate();
  }

  async connectedCallback() {
        try {
            super.connectedCallback();
            this._fetchJoke.run();
        } catch (err: unknown) {
            console.error(`${(err as Error).name} ${(err as Error).message} at: ${(err as Error).stack}`);
        }
    }

  render() {
    return this._fetchJoke.render({
      pending: () => html`<p>Loading joke...</p>`,
      complete: (joke: Joke) => html`
          <p>${joke.setup}</p>
          <p
            ?hidden=${this._hidePunchline}
          >${joke.punchline}</p>
          <p>
            <button
              type="button"
              @click=${this.__showPunchline}
            >Show Punchline</button>
            <button
              type="button"
              @click=${() => this._fetchJoke.run()}
            >New Joke</button>
          </p>
        `,
      error: (e) => html`<p>Error: ${e}</p>`
    });
  }
}
