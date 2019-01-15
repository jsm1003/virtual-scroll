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
export default class Page10 extends Vue {
  render(h: CreateElement) {
    return (
      <page title="增加缓冲区">
        <ppt />
      </page>
    );
  }
}
