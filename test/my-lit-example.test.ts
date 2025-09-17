import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';

import type { MyLitExample } from '../src/my-lit-example.js';
import '../src/my-lit-example.js';

describe('MyLitExample', () => {
  let element: MyLitExample;
  beforeEach(async () => {
    element = await fixture(html`<my-lit-example></my-lit-example>`);
  });

  it('renders a h1', () => {
    const h1 = element.shadowRoot!.querySelector('h1')!;
    expect(h1).to.exist;
    expect(h1.textContent).to.equal('My app');
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
