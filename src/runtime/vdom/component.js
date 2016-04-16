import Vue from '../instance/index'
import { callHook } from '../instance/lifecycle'

export default function Component (Ctor, data, parent, children, context) {
  if (typeof Ctor === 'object') {
    Ctor = Vue.extend(Ctor)
  }
  // return a placeholder vnode
  return {
    tag: 'component',
    key: data && data.key,
    data: {
      hook: { init, insert, prepatch, destroy },
      Ctor, data, parent, children, context
    }
  }
}

function init (vnode) {
  const data = vnode.data
  const child = new data.Ctor({
    parent: data.parent,
    _context: data.context,
    _renderData: data.data,
    _renderChildren: data.children
  })
  child.$mount()
  data.child = child
}

function insert (vnode) {
  callHook(vnode.data.child, 'ready')
}

function prepatch (oldVnode, vnode) {
  const old = oldVnode.data
  const cur = vnode.data
  if (cur.Ctor !== old.Ctor) {
    // component changed, teardown and create new
    // TODO: keep-alive?
    old.child.$destroy()
    init(vnode)
  } else {
    cur.child = old.child
    // try re-render child. the child may optimize it
    // and just does nothing.
    old.child._updateFromParent(cur.data, cur.children, vnode.key)
  }
}

function destroy (vnode) {
  vnode.data.child.$destroy()
}
