import Vue from 'vue';
import Router, { RouteConfig } from 'vue-router';

Vue.use(Router);

export const routes: RouteConfig[] = [
  {
    path: '/share',
    name: 'share',
    component: () => import(/* webpackChunkName: "share" */ '@/views/page0-theme/page0'),
  },
  {
    path: '/introduction',
    name: 'introduction',
    component: () =>
      import(/* webpackChunkName: "introduction" */ '@/views/page1-introduction/page1'),
  },
  {
    path: '/application-scenario',
    name: 'application-scenario',
    component: () =>
      import(/* webpackChunkName: "application-scenario" */ '@/views/page2-application-scenario/page2'),
  },
  {
    path: '/sollution',
    name: 'sollution',
    component: () =>
      import(/* webpackChunkName: "sollution" */ '@/views/page3-sollution/page3'),
  },
  {
    path: '/classification',
    name: 'classification',
    component: () =>
      import(/* webpackChunkName: "classification" */ '@/views/page4-classification/page4'),
  },
  {
    path: '/basic-code',
    name: 'basic-code',
    component: () =>
      import(/* webpackChunkName: "basic-code" */ '@/views/page5-basic-code/page5'),
  },
  {
    path: '/basic-use',
    name: 'basic-use',
    component: () =>
      import(/* webpackChunkName: "basic-use" */ '@/views/page6-basic-use/page6'),
  },
  {
    path: '/basic-implementation',
    name: 'basic-implementation',
    component: () =>
      import(/* webpackChunkName: "basic-implementation" */ '@/views/page7-basic-implementation/page7'),
  },
  {
    path: '/throttle',
    name: 'throttle',
    component: () =>
      import(/* webpackChunkName: "throttle" */ '@/views/page8-throttle/page8'),
  },
  {
    path: '/improve',
    name: 'improve',
    component: () =>
      import(/* webpackChunkName: "improve" */ '@/views/page9-improve/page9'),
  },
  {
    path: '/buffer',
    name: 'buffer',
    component: () =>
      import(/* webpackChunkName: "buffer" */ '@/views/page10-buffer/page10'),
  },
  {
    path: 'demo-buffer',
    name: 'demo-buffer',
    component: () =>
      import(/* webpackChunkName: "demo-buffer" */ '@/views/page11-demo-buffer/page11'),
  },
  {
    path: '/mixin',
    name: 'mixin',
    component: () =>
      import(/* webpackChunkName: "mixin" */ '@/views/page12-mixin/page12'),
  },
  {
    path: '/qrcode',
    name: 'qrcode',
    component: () =>
      import(/* webpackChunkName: "qrcode" */ '@/views/page13-qrcode/page13'),
  },
  {
    path: '*',
    redirect: '/share',
  },
];

export default new Router({
  routes,
});
