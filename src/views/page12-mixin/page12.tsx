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
import { Comp1 } from './comp1';
import { Comp2 } from './comp2';

import ppt from './ppt.md';
import './page12.scss';

@Component({
  components: { Comp1, Comp2, ppt },
})
export default class Page12 extends Vue {
  render(h: CreateElement) {
    return (
      <page title="mixin">
        <ppt />
        <div class="page12-comp-wrapper">
          <comp1 />
          <comp2 />
        </div>
      </page>
    );
  }
}
