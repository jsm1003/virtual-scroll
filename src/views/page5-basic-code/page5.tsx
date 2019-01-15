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

import ppt from './ppt.md';

@Component({
  components: { ppt },
})
export default class Page5 extends Vue {
  render(h: CreateElement) {
    return (
      <page title="CODE">
        <ppt />
      </page>
    );
  }
}
