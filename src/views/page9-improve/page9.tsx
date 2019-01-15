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

import './page9.scss';

@Component
export default class Page9 extends Vue {
  items = Array.from({ length: 10000 }).map((_, index) => `#item ${index}`);

  renderList(h: CreateElement) {
    return this.items.map(item => (
      <div class="example1_item" key={item}>
        {item}
      </div>
    ));
  }

  render(h: CreateElement) {
    return (
      <page title="DEMO 1（改进）">
        <example>
          <virtual-scroll
            class="example1"
            item-source={this.renderList(h)}
            item-height={50}
          />
        </example>
      </page>
    );
  }
}
