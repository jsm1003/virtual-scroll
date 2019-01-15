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
import { MixinExample } from './mixin-example';

@Component
export class Comp1 extends MixinExample {
  render(h: CreateElement) {
    return <div>Comp1：{this.count}</div>;
  }
}
