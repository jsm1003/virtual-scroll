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
import './page0.scss';

@Component({
  components: { ppt },
})
export default class Page0 extends Vue {
  render(h: CreateElement) {
    return (
      <page title="分享">
        <ppt />
      </page>
    );
  }
}
