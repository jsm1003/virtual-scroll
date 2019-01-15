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

import './example.scss';

@Component
export class Example extends Vue {
  render(h: CreateElement) {
    return <div class="example">{this.$slots.default}</div>;
  }
}
