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

import './app.scss';

@Component
export default class App extends Vue {
  render(h: CreateElement) {
    return (
      <div id="app">
        <transition name="rise-fade">
          <router-view />
        </transition>
      </div>
    );
  }
}
