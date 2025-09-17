import { html, TemplateResult } from 'lit';
import '../src/my-lit-example.js';

export default {
  title: 'MyLitExample',
  component: 'my-lit-example',
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

interface ArgTypes {
  header?: string;
  backgroundColor?: string;
}

const Template: Story<ArgTypes> = ({ header, backgroundColor = 'white' }: ArgTypes) => html`
  <my-lit-example style="--my-lit-example-background-color: ${backgroundColor}" .header=${header}></my-lit-example>
`;

export const App = Template.bind({});
App.args = {
  header: 'My app',
};
