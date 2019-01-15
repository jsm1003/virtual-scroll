import {
  Component,
  Vue,
  Prop,
  Inject,
  Model,
  Provide,
  Watch,
} from 'vue-property-decorator';
import { CreateElement } from 'vue';

import './page11.scss';

@Component
export default class Page11 extends Vue {
  items = Array.from({ length: 10000 }).map((_, index) => `#item ${index}`);

  renderList(h: CreateElement) {
    return this.items.map(item => (
      <div class="example3_item" key={item}>
        {item}
      </div>
    ));
  }

  render(h: CreateElement) {
    return (
      <page title="DEMO 2">
        <example>
          <virtual-scroll3
            class="example3"
            item-source={this.renderList(h)}
            min-buffer-px={100}
            item-height={50}
          />
        </example>
      </page>
    );
  }
}
