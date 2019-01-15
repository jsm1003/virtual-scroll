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

import './comp2.scss';

@Component
export class Comp2 extends MixinExample {
  handleClick() {
    this.count += 1;
  }

  render(h: CreateElement) {
    return (
      <div>
        Comp2：
        <button class="comp2-button" on-click={this.handleClick}>
          add
        </button>
        <span>{this.count}</span>
      </div>
    );
  }
}
