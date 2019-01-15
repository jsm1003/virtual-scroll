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
import { routes as originRoutes } from '@/router';
import { doubleClick } from '@/utils';

import './page.scss';

const routes = originRoutes.slice(0, -1);

@Component
export class Page extends Vue {
  @Prop({ type: String }) title!: string;

  v_routeIndex: number = 0;

  handleNextPage = doubleClick(this.goNextPage);

  handlePrevPage = doubleClick(this.goPrevPage);

  get routeIndex() {
    return this.v_routeIndex;
  }

  set routeIndex(value: number) {
    if (value > routes.length - 1) {
      this.v_routeIndex = 0;
    } else if (value < 0) {
      this.v_routeIndex = routes.length - 1;
    } else {
      this.v_routeIndex = value;
    }

    const targetRouteName = routes[this.v_routeIndex].name;
    // 用 push 在微信浏览器会显示底部工具栏
    this.$router.replace({ name: targetRouteName });
  }

  goNextPage() {
    this.routeIndex += 1;
  }

  goPrevPage() {
    this.routeIndex -= 1;
  }

  mounted() {
    this.routeIndex = routes.findIndex(route => route.name === this.$route.name);
  }

  render(h: CreateElement) {
    return (
      <div class="page">
        <div class="page-title">
          <div class="forward" on-click={this.handlePrevPage}>
            {this.title}
          </div>
          <div class="backward" on-click={this.handleNextPage} />
        </div>
        <div class="page-content">{this.$slots.default}</div>
      </div>
    );
  }
}
