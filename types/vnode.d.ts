import { Vue } from "./vue";

export type ScopedSlot = (props: any) => VNodeChildrenArrayContents | VNode | string;

export type VNodeChildren = VNodeChildrenArrayContents | [ScopedSlot] | string;
export interface VNodeChildrenArrayContents extends Array<VNode | string | VNodeChildrenArrayContents> {}

export interface VNode {
  tag?: string;
  data?: VNodeData;
  children?: VNode[];
  text?: string;
  elm?: Node;
  ns?: string;
  context?: Vue;
  key?: string | number;
  componentOptions?: VNodeComponentOptions;
  componentInstance?: Vue;
  parent?: VNode;
  raw?: boolean;
  isStatic?: boolean;
  isRootInsert: boolean;
  isComment: boolean;
}

export interface VNodeComponentOptions {
  Ctor: typeof Vue;
  propsData?: object;
  listeners?: object;
  children?: VNodeChildren;
  tag?: string;
}

export interface VNodeData {
  key?: string | number;
  slot?: string;
  scopedSlots?: { [key: string]: ScopedSlot | undefined };
  ref?: string;
  refInFor?: boolean;
  tag?: string;
  staticClass?: string;
  class?: any;
  staticStyle?: { [key: string]: any };
  style?: object[] | object;
  props?: { [key: string]: any };
  attrs?: { [key: string]: any };
  domProps?: { [key: string]: any };
  hook?: { [key: string]: Function };
  on?: { [key: string]: Function | Function[] };
  nativeOn?: { [key: string]: Function | Function[] };
  transition?: object;
  show?: boolean;
  inlineTemplate?: {
    render: Function;
    staticRenderFns: Function[];
  };
  directives?: VNodeDirective[];
  keepAlive?: boolean;
}

export interface VNodeDirective {
  name: string;
  value?: any;
  oldValue?: any;
  expression?: any;
  arg?: string;
  modifiers?: { [key: string]: boolean };
}
