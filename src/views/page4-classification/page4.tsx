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
export default class Page4 extends Vue {
  render(h: CreateElement) {
    return (
      <page title="分类">
        <ppt />
      </page>
    );
  }
}
