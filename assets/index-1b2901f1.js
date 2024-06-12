;(function () {
  const t = document.createElement('link').relList
  if (t && t.supports && t.supports('modulepreload')) return
  for (const s of document.querySelectorAll('link[rel="modulepreload"]')) i(s)
  new MutationObserver((s) => {
    for (const n of s)
      if (n.type === 'childList')
        for (const o of n.addedNodes) o.tagName === 'LINK' && o.rel === 'modulepreload' && i(o)
  }).observe(document, { childList: !0, subtree: !0 })
  function e(s) {
    const n = {}
    return (
      s.integrity && (n.integrity = s.integrity),
      s.referrerPolicy && (n.referrerPolicy = s.referrerPolicy),
      s.crossOrigin === 'use-credentials'
        ? (n.credentials = 'include')
        : s.crossOrigin === 'anonymous'
          ? (n.credentials = 'omit')
          : (n.credentials = 'same-origin'),
      n
    )
  }
  function i(s) {
    if (s.ep) return
    s.ep = !0
    const n = e(s)
    fetch(s.href, n)
  }
})()
/**
 * @vue/shared v3.4.27
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/ /*! #__NO_SIDE_EFFECTS__ */ function td(r, t) {
  const e = new Set(r.split(','))
  return t ? (i) => e.has(i.toLowerCase()) : (i) => e.has(i)
}
const wt = {},
  Fi = [],
  ue = () => {},
  dm = () => !1,
  Kh = (r) =>
    r.charCodeAt(0) === 111 &&
    r.charCodeAt(1) === 110 &&
    (r.charCodeAt(2) > 122 || r.charCodeAt(2) < 97),
  ed = (r) => r.startsWith('onUpdate:'),
  te = Object.assign,
  qh = (r, t) => {
    const e = r.indexOf(t)
    e > -1 && r.splice(e, 1)
  },
  fm = Object.prototype.hasOwnProperty,
  mt = (r, t) => fm.call(r, t),
  lt = Array.isArray,
  ms = (r) => _o(r) === '[object Map]',
  pm = (r) => _o(r) === '[object Set]',
  ct = (r) => typeof r == 'function',
  pe = (r) => typeof r == 'string',
  ks = (r) => typeof r == 'symbol',
  Lt = (r) => r !== null && typeof r == 'object',
  rd = (r) => (Lt(r) || ct(r)) && ct(r.then) && ct(r.catch),
  mm = Object.prototype.toString,
  _o = (r) => mm.call(r),
  gm = (r) => _o(r).slice(8, -1),
  _m = (r) => _o(r) === '[object Object]',
  Zh = (r) => pe(r) && r !== 'NaN' && r[0] !== '-' && '' + parseInt(r, 10) === r,
  gs = td(
    ',key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted'
  ),
  yo = (r) => {
    const t = Object.create(null)
    return (e) => t[e] || (t[e] = r(e))
  },
  ym = /-(\w)/g,
  tr = yo((r) => r.replace(ym, (t, e) => (e ? e.toUpperCase() : ''))),
  Am = /\B([A-Z])/g,
  Gs = yo((r) => r.replace(Am, '-$1').toLowerCase()),
  vm = yo((r) => r.charAt(0).toUpperCase() + r.slice(1)),
  Vo = yo((r) => (r ? `on${vm(r)}` : '')),
  er = (r, t) => !Object.is(r, t),
  Xo = (r, t) => {
    for (let e = 0; e < r.length; e++) r[e](t)
  },
  id = (r, t, e, i = !1) => {
    Object.defineProperty(r, t, { configurable: !0, enumerable: !1, writable: i, value: e })
  },
  xm = (r) => {
    const t = parseFloat(r)
    return isNaN(t) ? r : t
  }
let jl
const sd = () =>
  jl ||
  (jl =
    typeof globalThis < 'u'
      ? globalThis
      : typeof self < 'u'
        ? self
        : typeof window < 'u'
          ? window
          : typeof global < 'u'
            ? global
            : {})
function Jh(r) {
  if (lt(r)) {
    const t = {}
    for (let e = 0; e < r.length; e++) {
      const i = r[e],
        s = pe(i) ? wm(i) : Jh(i)
      if (s) for (const n in s) t[n] = s[n]
    }
    return t
  } else if (pe(r) || Lt(r)) return r
}
const bm = /;(?![^(]*\))/g,
  Em = /:([^]+)/,
  Tm = /\/\*[^]*?\*\//g
function wm(r) {
  const t = {}
  return (
    r
      .replace(Tm, '')
      .split(bm)
      .forEach((e) => {
        if (e) {
          const i = e.split(Em)
          i.length > 1 && (t[i[0].trim()] = i[1].trim())
        }
      }),
    t
  )
}
function tl(r) {
  let t = ''
  if (pe(r)) t = r
  else if (lt(r))
    for (let e = 0; e < r.length; e++) {
      const i = tl(r[e])
      i && (t += i + ' ')
    }
  else if (Lt(r)) for (const e in r) r[e] && (t += e + ' ')
  return t.trim()
}
/**
 * @vue/reactivity v3.4.27
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/ let Ae
class nd {
  constructor(t = !1) {
    ;(this.detached = t),
      (this._active = !0),
      (this.effects = []),
      (this.cleanups = []),
      (this.parent = Ae),
      !t && Ae && (this.index = (Ae.scopes || (Ae.scopes = [])).push(this) - 1)
  }
  get active() {
    return this._active
  }
  run(t) {
    if (this._active) {
      const e = Ae
      try {
        return (Ae = this), t()
      } finally {
        Ae = e
      }
    }
  }
  on() {
    Ae = this
  }
  off() {
    Ae = this.parent
  }
  stop(t) {
    if (this._active) {
      let e, i
      for (e = 0, i = this.effects.length; e < i; e++) this.effects[e].stop()
      for (e = 0, i = this.cleanups.length; e < i; e++) this.cleanups[e]()
      if (this.scopes) for (e = 0, i = this.scopes.length; e < i; e++) this.scopes[e].stop(!0)
      if (!this.detached && this.parent && !t) {
        const s = this.parent.scopes.pop()
        s && s !== this && ((this.parent.scopes[this.index] = s), (s.index = this.index))
      }
      ;(this.parent = void 0), (this._active = !1)
    }
  }
}
function od(r) {
  return new nd(r)
}
function Sm(r, t = Ae) {
  t && t.active && t.effects.push(r)
}
function ad() {
  return Ae
}
function Cm(r) {
  Ae && Ae.cleanups.push(r)
}
let ii
class el {
  constructor(t, e, i, s) {
    ;(this.fn = t),
      (this.trigger = e),
      (this.scheduler = i),
      (this.active = !0),
      (this.deps = []),
      (this._dirtyLevel = 4),
      (this._trackId = 0),
      (this._runnings = 0),
      (this._shouldSchedule = !1),
      (this._depsLength = 0),
      Sm(this, s)
  }
  get dirty() {
    if (this._dirtyLevel === 2 || this._dirtyLevel === 3) {
      ;(this._dirtyLevel = 1), Nr()
      for (let t = 0; t < this._depsLength; t++) {
        const e = this.deps[t]
        if (e.computed && (Im(e.computed), this._dirtyLevel >= 4)) break
      }
      this._dirtyLevel === 1 && (this._dirtyLevel = 0), Ur()
    }
    return this._dirtyLevel >= 4
  }
  set dirty(t) {
    this._dirtyLevel = t ? 4 : 0
  }
  run() {
    if (((this._dirtyLevel = 0), !this.active)) return this.fn()
    let t = Mr,
      e = ii
    try {
      return (Mr = !0), (ii = this), this._runnings++, Wl(this), this.fn()
    } finally {
      $l(this), this._runnings--, (ii = e), (Mr = t)
    }
  }
  stop() {
    this.active && (Wl(this), $l(this), this.onStop && this.onStop(), (this.active = !1))
  }
}
function Im(r) {
  return r.value
}
function Wl(r) {
  r._trackId++, (r._depsLength = 0)
}
function $l(r) {
  if (r.deps.length > r._depsLength) {
    for (let t = r._depsLength; t < r.deps.length; t++) hd(r.deps[t], r)
    r.deps.length = r._depsLength
  }
}
function hd(r, t) {
  const e = r.get(t)
  e !== void 0 && t._trackId !== e && (r.delete(t), r.size === 0 && r.cleanup())
}
let Mr = !0,
  Na = 0
const ld = []
function Nr() {
  ld.push(Mr), (Mr = !1)
}
function Ur() {
  const r = ld.pop()
  Mr = r === void 0 ? !0 : r
}
function rl() {
  Na++
}
function il() {
  for (Na--; !Na && Ua.length; ) Ua.shift()()
}
function cd(r, t, e) {
  if (t.get(r) !== r._trackId) {
    t.set(r, r._trackId)
    const i = r.deps[r._depsLength]
    i !== t ? (i && hd(i, r), (r.deps[r._depsLength++] = t)) : r._depsLength++
  }
}
const Ua = []
function ud(r, t, e) {
  rl()
  for (const i of r.keys()) {
    let s
    i._dirtyLevel < t &&
      (s ?? (s = r.get(i) === i._trackId)) &&
      (i._shouldSchedule || (i._shouldSchedule = i._dirtyLevel === 0), (i._dirtyLevel = t)),
      i._shouldSchedule &&
        (s ?? (s = r.get(i) === i._trackId)) &&
        (i.trigger(),
        (!i._runnings || i.allowRecurse) &&
          i._dirtyLevel !== 2 &&
          ((i._shouldSchedule = !1), i.scheduler && Ua.push(i.scheduler)))
  }
  il()
}
const dd = (r, t) => {
    const e = new Map()
    return (e.cleanup = r), (e.computed = t), e
  },
  ka = new WeakMap(),
  si = Symbol(''),
  Ga = Symbol('')
function me(r, t, e) {
  if (Mr && ii) {
    let i = ka.get(r)
    i || ka.set(r, (i = new Map()))
    let s = i.get(e)
    s || i.set(e, (s = dd(() => i.delete(e)))), cd(ii, s)
  }
}
function dr(r, t, e, i, s, n) {
  const o = ka.get(r)
  if (!o) return
  let a = []
  if (t === 'clear') a = [...o.values()]
  else if (e === 'length' && lt(r)) {
    const h = Number(i)
    o.forEach((l, c) => {
      ;(c === 'length' || (!ks(c) && c >= h)) && a.push(l)
    })
  } else
    switch ((e !== void 0 && a.push(o.get(e)), t)) {
      case 'add':
        lt(r) ? Zh(e) && a.push(o.get('length')) : (a.push(o.get(si)), ms(r) && a.push(o.get(Ga)))
        break
      case 'delete':
        lt(r) || (a.push(o.get(si)), ms(r) && a.push(o.get(Ga)))
        break
      case 'set':
        ms(r) && a.push(o.get(si))
        break
    }
  rl()
  for (const h of a) h && ud(h, 4)
  il()
}
const Rm = td('__proto__,__v_isRef,__isVue'),
  fd = new Set(
    Object.getOwnPropertyNames(Symbol)
      .filter((r) => r !== 'arguments' && r !== 'caller')
      .map((r) => Symbol[r])
      .filter(ks)
  ),
  zl = Pm()
function Pm() {
  const r = {}
  return (
    ['includes', 'indexOf', 'lastIndexOf'].forEach((t) => {
      r[t] = function (...e) {
        const i = yt(this)
        for (let n = 0, o = this.length; n < o; n++) me(i, 'get', n + '')
        const s = i[t](...e)
        return s === -1 || s === !1 ? i[t](...e.map(yt)) : s
      }
    }),
    ['push', 'pop', 'shift', 'unshift', 'splice'].forEach((t) => {
      r[t] = function (...e) {
        Nr(), rl()
        const i = yt(this)[t].apply(this, e)
        return il(), Ur(), i
      }
    }),
    r
  )
}
function Mm(r) {
  ks(r) || (r = String(r))
  const t = yt(this)
  return me(t, 'has', r), t.hasOwnProperty(r)
}
class pd {
  constructor(t = !1, e = !1) {
    ;(this._isReadonly = t), (this._isShallow = e)
  }
  get(t, e, i) {
    const s = this._isReadonly,
      n = this._isShallow
    if (e === '__v_isReactive') return !s
    if (e === '__v_isReadonly') return s
    if (e === '__v_isShallow') return n
    if (e === '__v_raw')
      return i === (s ? (n ? jm : yd) : n ? _d : gd).get(t) ||
        Object.getPrototypeOf(t) === Object.getPrototypeOf(i)
        ? t
        : void 0
    const o = lt(t)
    if (!s) {
      if (o && mt(zl, e)) return Reflect.get(zl, e, i)
      if (e === 'hasOwnProperty') return Mm
    }
    const a = Reflect.get(t, e, i)
    return (ks(e) ? fd.has(e) : Rm(e)) || (s || me(t, 'get', e), n)
      ? a
      : ge(a)
        ? o && Zh(e)
          ? a
          : a.value
        : Lt(a)
          ? s
            ? al(a)
            : ol(a)
          : a
  }
}
class md extends pd {
  constructor(t = !1) {
    super(!1, t)
  }
  set(t, e, i, s) {
    let n = t[e]
    if (!this._isShallow) {
      const h = Is(n)
      if ((!Xn(i) && !Is(i) && ((n = yt(n)), (i = yt(i))), !lt(t) && ge(n) && !ge(i)))
        return h ? !1 : ((n.value = i), !0)
    }
    const o = lt(t) && Zh(e) ? Number(e) < t.length : mt(t, e),
      a = Reflect.set(t, e, i, s)
    return t === yt(s) && (o ? er(i, n) && dr(t, 'set', e, i) : dr(t, 'add', e, i)), a
  }
  deleteProperty(t, e) {
    const i = mt(t, e)
    t[e]
    const s = Reflect.deleteProperty(t, e)
    return s && i && dr(t, 'delete', e, void 0), s
  }
  has(t, e) {
    const i = Reflect.has(t, e)
    return (!ks(e) || !fd.has(e)) && me(t, 'has', e), i
  }
  ownKeys(t) {
    return me(t, 'iterate', lt(t) ? 'length' : si), Reflect.ownKeys(t)
  }
}
class Bm extends pd {
  constructor(t = !1) {
    super(!0, t)
  }
  set(t, e) {
    return !0
  }
  deleteProperty(t, e) {
    return !0
  }
}
const Fm = new md(),
  Dm = new Bm(),
  Om = new md(!0)
const sl = (r) => r,
  Ao = (r) => Reflect.getPrototypeOf(r)
function Ks(r, t, e = !1, i = !1) {
  r = r.__v_raw
  const s = yt(r),
    n = yt(t)
  e || (er(t, n) && me(s, 'get', t), me(s, 'get', n))
  const { has: o } = Ao(s),
    a = i ? sl : e ? ll : Rs
  if (o.call(s, t)) return a(r.get(t))
  if (o.call(s, n)) return a(r.get(n))
  r !== s && r.get(t)
}
function qs(r, t = !1) {
  const e = this.__v_raw,
    i = yt(e),
    s = yt(r)
  return (
    t || (er(r, s) && me(i, 'has', r), me(i, 'has', s)), r === s ? e.has(r) : e.has(r) || e.has(s)
  )
}
function Zs(r, t = !1) {
  return (r = r.__v_raw), !t && me(yt(r), 'iterate', si), Reflect.get(r, 'size', r)
}
function Yl(r) {
  r = yt(r)
  const t = yt(this)
  return Ao(t).has.call(t, r) || (t.add(r), dr(t, 'add', r, r)), this
}
function Ql(r, t) {
  t = yt(t)
  const e = yt(this),
    { has: i, get: s } = Ao(e)
  let n = i.call(e, r)
  n || ((r = yt(r)), (n = i.call(e, r)))
  const o = s.call(e, r)
  return e.set(r, t), n ? er(t, o) && dr(e, 'set', r, t) : dr(e, 'add', r, t), this
}
function Kl(r) {
  const t = yt(this),
    { has: e, get: i } = Ao(t)
  let s = e.call(t, r)
  s || ((r = yt(r)), (s = e.call(t, r))), i && i.call(t, r)
  const n = t.delete(r)
  return s && dr(t, 'delete', r, void 0), n
}
function ql() {
  const r = yt(this),
    t = r.size !== 0,
    e = r.clear()
  return t && dr(r, 'clear', void 0, void 0), e
}
function Js(r, t) {
  return function (i, s) {
    const n = this,
      o = n.__v_raw,
      a = yt(o),
      h = t ? sl : r ? ll : Rs
    return !r && me(a, 'iterate', si), o.forEach((l, c) => i.call(s, h(l), h(c), n))
  }
}
function tn(r, t, e) {
  return function (...i) {
    const s = this.__v_raw,
      n = yt(s),
      o = ms(n),
      a = r === 'entries' || (r === Symbol.iterator && o),
      h = r === 'keys' && o,
      l = s[r](...i),
      c = e ? sl : t ? ll : Rs
    return (
      !t && me(n, 'iterate', h ? Ga : si),
      {
        next() {
          const { value: u, done: d } = l.next()
          return d ? { value: u, done: d } : { value: a ? [c(u[0]), c(u[1])] : c(u), done: d }
        },
        [Symbol.iterator]() {
          return this
        }
      }
    )
  }
}
function yr(r) {
  return function (...t) {
    return r === 'delete' ? !1 : r === 'clear' ? void 0 : this
  }
}
function Lm() {
  const r = {
      get(n) {
        return Ks(this, n)
      },
      get size() {
        return Zs(this)
      },
      has: qs,
      add: Yl,
      set: Ql,
      delete: Kl,
      clear: ql,
      forEach: Js(!1, !1)
    },
    t = {
      get(n) {
        return Ks(this, n, !1, !0)
      },
      get size() {
        return Zs(this)
      },
      has: qs,
      add: Yl,
      set: Ql,
      delete: Kl,
      clear: ql,
      forEach: Js(!1, !0)
    },
    e = {
      get(n) {
        return Ks(this, n, !0)
      },
      get size() {
        return Zs(this, !0)
      },
      has(n) {
        return qs.call(this, n, !0)
      },
      add: yr('add'),
      set: yr('set'),
      delete: yr('delete'),
      clear: yr('clear'),
      forEach: Js(!0, !1)
    },
    i = {
      get(n) {
        return Ks(this, n, !0, !0)
      },
      get size() {
        return Zs(this, !0)
      },
      has(n) {
        return qs.call(this, n, !0)
      },
      add: yr('add'),
      set: yr('set'),
      delete: yr('delete'),
      clear: yr('clear'),
      forEach: Js(!0, !0)
    }
  return (
    ['keys', 'values', 'entries', Symbol.iterator].forEach((n) => {
      ;(r[n] = tn(n, !1, !1)),
        (e[n] = tn(n, !0, !1)),
        (t[n] = tn(n, !1, !0)),
        (i[n] = tn(n, !0, !0))
    }),
    [r, e, t, i]
  )
}
const [Nm, Um, km, Gm] = Lm()
function nl(r, t) {
  const e = t ? (r ? Gm : km) : r ? Um : Nm
  return (i, s, n) =>
    s === '__v_isReactive'
      ? !r
      : s === '__v_isReadonly'
        ? r
        : s === '__v_raw'
          ? i
          : Reflect.get(mt(e, s) && s in i ? e : i, s, n)
}
const Hm = { get: nl(!1, !1) },
  Vm = { get: nl(!1, !0) },
  Xm = { get: nl(!0, !1) }
const gd = new WeakMap(),
  _d = new WeakMap(),
  yd = new WeakMap(),
  jm = new WeakMap()
function Wm(r) {
  switch (r) {
    case 'Object':
    case 'Array':
      return 1
    case 'Map':
    case 'Set':
    case 'WeakMap':
    case 'WeakSet':
      return 2
    default:
      return 0
  }
}
function $m(r) {
  return r.__v_skip || !Object.isExtensible(r) ? 0 : Wm(gm(r))
}
function ol(r) {
  return Is(r) ? r : hl(r, !1, Fm, Hm, gd)
}
function zm(r) {
  return hl(r, !1, Om, Vm, _d)
}
function al(r) {
  return hl(r, !0, Dm, Xm, yd)
}
function hl(r, t, e, i, s) {
  if (!Lt(r) || (r.__v_raw && !(t && r.__v_isReactive))) return r
  const n = s.get(r)
  if (n) return n
  const o = $m(r)
  if (o === 0) return r
  const a = new Proxy(r, o === 2 ? i : e)
  return s.set(r, a), a
}
function _s(r) {
  return Is(r) ? _s(r.__v_raw) : !!(r && r.__v_isReactive)
}
function Is(r) {
  return !!(r && r.__v_isReadonly)
}
function Xn(r) {
  return !!(r && r.__v_isShallow)
}
function Ad(r) {
  return r ? !!r.__v_raw : !1
}
function yt(r) {
  const t = r && r.__v_raw
  return t ? yt(t) : r
}
function Ym(r) {
  return Object.isExtensible(r) && id(r, '__v_skip', !0), r
}
const Rs = (r) => (Lt(r) ? ol(r) : r),
  ll = (r) => (Lt(r) ? al(r) : r)
class vd {
  constructor(t, e, i, s) {
    ;(this.getter = t),
      (this._setter = e),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this.__v_isReadonly = !1),
      (this.effect = new el(
        () => t(this._value),
        () => ys(this, this.effect._dirtyLevel === 2 ? 2 : 3)
      )),
      (this.effect.computed = this),
      (this.effect.active = this._cacheable = !s),
      (this.__v_isReadonly = i)
  }
  get value() {
    const t = yt(this)
    return (
      (!t._cacheable || t.effect.dirty) && er(t._value, (t._value = t.effect.run())) && ys(t, 4),
      cl(t),
      t.effect._dirtyLevel >= 2 && ys(t, 2),
      t._value
    )
  }
  set value(t) {
    this._setter(t)
  }
  get _dirty() {
    return this.effect.dirty
  }
  set _dirty(t) {
    this.effect.dirty = t
  }
}
function Qm(r, t, e = !1) {
  let i, s
  const n = ct(r)
  return n ? ((i = r), (s = ue)) : ((i = r.get), (s = r.set)), new vd(i, s, n || !s, e)
}
function cl(r) {
  var t
  Mr &&
    ii &&
    ((r = yt(r)),
    cd(
      ii,
      (t = r.dep) != null ? t : (r.dep = dd(() => (r.dep = void 0), r instanceof vd ? r : void 0))
    ))
}
function ys(r, t = 4, e) {
  r = yt(r)
  const i = r.dep
  i && ud(i, t)
}
function ge(r) {
  return !!(r && r.__v_isRef === !0)
}
function kt(r) {
  return Km(r, !1)
}
function Km(r, t) {
  return ge(r) ? r : new qm(r, t)
}
class qm {
  constructor(t, e) {
    ;(this.__v_isShallow = e),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this._rawValue = e ? t : yt(t)),
      (this._value = e ? t : Rs(t))
  }
  get value() {
    return cl(this), this._value
  }
  set value(t) {
    const e = this.__v_isShallow || Xn(t) || Is(t)
    ;(t = e ? t : yt(t)),
      er(t, this._rawValue) && ((this._rawValue = t), (this._value = e ? t : Rs(t)), ys(this, 4))
  }
}
function Et(r) {
  return ge(r) ? r.value : r
}
const Zm = {
  get: (r, t, e) => Et(Reflect.get(r, t, e)),
  set: (r, t, e, i) => {
    const s = r[t]
    return ge(s) && !ge(e) ? ((s.value = e), !0) : Reflect.set(r, t, e, i)
  }
}
function xd(r) {
  return _s(r) ? r : new Proxy(r, Zm)
}
class Jm {
  constructor(t) {
    ;(this.dep = void 0), (this.__v_isRef = !0)
    const { get: e, set: i } = t(
      () => cl(this),
      () => ys(this)
    )
    ;(this._get = e), (this._set = i)
  }
  get value() {
    return this._get()
  }
  set value(t) {
    this._set(t)
  }
}
function bd(r) {
  return new Jm(r)
}
/**
 * @vue/runtime-core v3.4.27
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/ function Br(r, t, e, i) {
  try {
    return i ? r(...i) : r()
  } catch (s) {
    vo(s, t, e)
  }
}
function De(r, t, e, i) {
  if (ct(r)) {
    const s = Br(r, t, e, i)
    return (
      s &&
        rd(s) &&
        s.catch((n) => {
          vo(n, t, e)
        }),
      s
    )
  }
  if (lt(r)) {
    const s = []
    for (let n = 0; n < r.length; n++) s.push(De(r[n], t, e, i))
    return s
  }
}
function vo(r, t, e, i = !0) {
  const s = t ? t.vnode : null
  if (t) {
    let n = t.parent
    const o = t.proxy,
      a = `https://vuejs.org/error-reference/#runtime-${e}`
    for (; n; ) {
      const l = n.ec
      if (l) {
        for (let c = 0; c < l.length; c++) if (l[c](r, o, a) === !1) return
      }
      n = n.parent
    }
    const h = t.appContext.config.errorHandler
    if (h) {
      Nr(), Br(h, null, 10, [r, o, a]), Ur()
      return
    }
  }
  tg(r, e, s, i)
}
function tg(r, t, e, i = !0) {
  console.error(r)
}
let Ps = !1,
  Ha = !1
const re = []
let Ke = 0
const Di = []
let br = null,
  qr = 0
const Ed = Promise.resolve()
let ul = null
function Yi(r) {
  const t = ul || Ed
  return r ? t.then(this ? r.bind(this) : r) : t
}
function eg(r) {
  let t = Ke + 1,
    e = re.length
  for (; t < e; ) {
    const i = (t + e) >>> 1,
      s = re[i],
      n = Ms(s)
    n < r || (n === r && s.pre) ? (t = i + 1) : (e = i)
  }
  return t
}
function dl(r) {
  ;(!re.length || !re.includes(r, Ps && r.allowRecurse ? Ke + 1 : Ke)) &&
    (r.id == null ? re.push(r) : re.splice(eg(r.id), 0, r), Td())
}
function Td() {
  !Ps && !Ha && ((Ha = !0), (ul = Ed.then(Sd)))
}
function rg(r) {
  const t = re.indexOf(r)
  t > Ke && re.splice(t, 1)
}
function ig(r) {
  lt(r) ? Di.push(...r) : (!br || !br.includes(r, r.allowRecurse ? qr + 1 : qr)) && Di.push(r), Td()
}
function Zl(r, t, e = Ps ? Ke + 1 : 0) {
  for (; e < re.length; e++) {
    const i = re[e]
    if (i && i.pre) {
      if (r && i.id !== r.uid) continue
      re.splice(e, 1), e--, i()
    }
  }
}
function wd(r) {
  if (Di.length) {
    const t = [...new Set(Di)].sort((e, i) => Ms(e) - Ms(i))
    if (((Di.length = 0), br)) {
      br.push(...t)
      return
    }
    for (br = t, qr = 0; qr < br.length; qr++) br[qr]()
    ;(br = null), (qr = 0)
  }
}
const Ms = (r) => (r.id == null ? 1 / 0 : r.id),
  sg = (r, t) => {
    const e = Ms(r) - Ms(t)
    if (e === 0) {
      if (r.pre && !t.pre) return -1
      if (t.pre && !r.pre) return 1
    }
    return e
  }
function Sd(r) {
  ;(Ha = !1), (Ps = !0), re.sort(sg)
  const t = ue
  try {
    for (Ke = 0; Ke < re.length; Ke++) {
      const e = re[Ke]
      e && e.active !== !1 && Br(e, null, 14)
    }
  } finally {
    ;(Ke = 0), (re.length = 0), wd(), (Ps = !1), (ul = null), (re.length || Di.length) && Sd()
  }
}
function ng(r, t, ...e) {
  if (r.isUnmounted) return
  const i = r.vnode.props || wt
  let s = e
  const n = t.startsWith('update:'),
    o = n && t.slice(7)
  if (o && o in i) {
    const c = `${o === 'modelValue' ? 'model' : o}Modifiers`,
      { number: u, trim: d } = i[c] || wt
    d && (s = e.map((f) => (pe(f) ? f.trim() : f))), u && (s = e.map(xm))
  }
  let a,
    h = i[(a = Vo(t))] || i[(a = Vo(tr(t)))]
  !h && n && (h = i[(a = Vo(Gs(t)))]), h && De(h, r, 6, s)
  const l = i[a + 'Once']
  if (l) {
    if (!r.emitted) r.emitted = {}
    else if (r.emitted[a]) return
    ;(r.emitted[a] = !0), De(l, r, 6, s)
  }
}
function Cd(r, t, e = !1) {
  const i = t.emitsCache,
    s = i.get(r)
  if (s !== void 0) return s
  const n = r.emits
  let o = {},
    a = !1
  if (!ct(r)) {
    const h = (l) => {
      const c = Cd(l, t, !0)
      c && ((a = !0), te(o, c))
    }
    !e && t.mixins.length && t.mixins.forEach(h),
      r.extends && h(r.extends),
      r.mixins && r.mixins.forEach(h)
  }
  return !n && !a
    ? (Lt(r) && i.set(r, null), null)
    : (lt(n) ? n.forEach((h) => (o[h] = null)) : te(o, n), Lt(r) && i.set(r, o), o)
}
function xo(r, t) {
  return !r || !Kh(t)
    ? !1
    : ((t = t.slice(2).replace(/Once$/, '')),
      mt(r, t[0].toLowerCase() + t.slice(1)) || mt(r, Gs(t)) || mt(r, t))
}
let ae = null,
  Id = null
function jn(r) {
  const t = ae
  return (ae = r), (Id = (r && r.type.__scopeId) || null), t
}
function Wn(r, t = ae, e) {
  if (!t || r._n) return r
  const i = (...s) => {
    i._d && lc(-1)
    const n = jn(t)
    let o
    try {
      o = r(...s)
    } finally {
      jn(n), i._d && lc(1)
    }
    return o
  }
  return (i._n = !0), (i._c = !0), (i._d = !0), i
}
function jo(r) {
  const {
      type: t,
      vnode: e,
      proxy: i,
      withProxy: s,
      propsOptions: [n],
      slots: o,
      attrs: a,
      emit: h,
      render: l,
      renderCache: c,
      props: u,
      data: d,
      setupState: f,
      ctx: p,
      inheritAttrs: m
    } = r,
    g = jn(r)
  let A, x
  try {
    if (e.shapeFlag & 4) {
      const v = s || i,
        S = v
      ;(A = ze(l.call(S, v, c, u, f, d, p))), (x = a)
    } else {
      const v = t
      ;(A = ze(v.length > 1 ? v(u, { attrs: a, slots: o, emit: h }) : v(u, null))),
        (x = t.props ? a : og(a))
    }
  } catch (v) {
    ;(bs.length = 0), vo(v, r, 1), (A = Ot(ve))
  }
  let _ = A
  if (x && m !== !1) {
    const v = Object.keys(x),
      { shapeFlag: S } = _
    v.length && S & 7 && (n && v.some(ed) && (x = ag(x, n)), (_ = Fr(_, x, !1, !0)))
  }
  return (
    e.dirs && ((_ = Fr(_, null, !1, !0)), (_.dirs = _.dirs ? _.dirs.concat(e.dirs) : e.dirs)),
    e.transition && (_.transition = e.transition),
    (A = _),
    jn(g),
    A
  )
}
const og = (r) => {
    let t
    for (const e in r) (e === 'class' || e === 'style' || Kh(e)) && ((t || (t = {}))[e] = r[e])
    return t
  },
  ag = (r, t) => {
    const e = {}
    for (const i in r) (!ed(i) || !(i.slice(9) in t)) && (e[i] = r[i])
    return e
  }
function hg(r, t, e) {
  const { props: i, children: s, component: n } = r,
    { props: o, children: a, patchFlag: h } = t,
    l = n.emitsOptions
  if (t.dirs || t.transition) return !0
  if (e && h >= 0) {
    if (h & 1024) return !0
    if (h & 16) return i ? Jl(i, o, l) : !!o
    if (h & 8) {
      const c = t.dynamicProps
      for (let u = 0; u < c.length; u++) {
        const d = c[u]
        if (o[d] !== i[d] && !xo(l, d)) return !0
      }
    }
  } else
    return (s || a) && (!a || !a.$stable) ? !0 : i === o ? !1 : i ? (o ? Jl(i, o, l) : !0) : !!o
  return !1
}
function Jl(r, t, e) {
  const i = Object.keys(t)
  if (i.length !== Object.keys(r).length) return !0
  for (let s = 0; s < i.length; s++) {
    const n = i[s]
    if (t[n] !== r[n] && !xo(e, n)) return !0
  }
  return !1
}
function lg({ vnode: r, parent: t }, e) {
  for (; t; ) {
    const i = t.subTree
    if ((i.suspense && i.suspense.activeBranch === r && (i.el = r.el), i === r))
      ((r = t.vnode).el = e), (t = t.parent)
    else break
  }
}
const cg = Symbol.for('v-ndc'),
  ug = (r) => r.__isSuspense
function dg(r, t) {
  t && t.pendingBranch ? (lt(r) ? t.effects.push(...r) : t.effects.push(r)) : ig(r)
}
const fg = Symbol.for('v-scx'),
  pg = () => ni(fg)
function Rd(r, t) {
  return bo(r, null, t)
}
function mg(r, t) {
  return bo(r, null, { flush: 'sync' })
}
const en = {}
function Se(r, t, e) {
  return bo(r, t, e)
}
function bo(r, t, { immediate: e, deep: i, flush: s, once: n, onTrack: o, onTrigger: a } = wt) {
  if (t && n) {
    const C = t
    t = (...I) => {
      C(...I), S()
    }
  }
  const h = ie,
    l = (C) => (i === !0 ? C : Pi(C, i === !1 ? 1 : void 0))
  let c,
    u = !1,
    d = !1
  if (
    (ge(r)
      ? ((c = () => r.value), (u = Xn(r)))
      : _s(r)
        ? ((c = () => l(r)), (u = !0))
        : lt(r)
          ? ((d = !0),
            (u = r.some((C) => _s(C) || Xn(C))),
            (c = () =>
              r.map((C) => {
                if (ge(C)) return C.value
                if (_s(C)) return l(C)
                if (ct(C)) return Br(C, h, 2)
              })))
          : ct(r)
            ? t
              ? (c = () => Br(r, h, 2))
              : (c = () => (f && f(), De(r, h, 3, [p])))
            : (c = ue),
    t && i)
  ) {
    const C = c
    c = () => Pi(C())
  }
  let f,
    p = (C) => {
      f = _.onStop = () => {
        Br(C, h, 4), (f = _.onStop = void 0)
      }
    },
    m
  if (Co)
    if (((p = ue), t ? e && De(t, h, 3, [c(), d ? [] : void 0, p]) : c(), s === 'sync')) {
      const C = pg()
      m = C.__watcherHandles || (C.__watcherHandles = [])
    } else return ue
  let g = d ? new Array(r.length).fill(en) : en
  const A = () => {
    if (!(!_.active || !_.dirty))
      if (t) {
        const C = _.run()
        ;(i || u || (d ? C.some((I, T) => er(I, g[T])) : er(C, g))) &&
          (f && f(), De(t, h, 3, [C, g === en ? void 0 : d && g[0] === en ? [] : g, p]), (g = C))
      } else _.run()
  }
  A.allowRecurse = !!t
  let x
  s === 'sync'
    ? (x = A)
    : s === 'post'
      ? (x = () => le(A, h && h.suspense))
      : ((A.pre = !0), h && (A.id = h.uid), (x = () => dl(A)))
  const _ = new el(c, ue, x),
    v = ad(),
    S = () => {
      _.stop(), v && qh(v.effects, _)
    }
  return (
    t ? (e ? A() : (g = _.run())) : s === 'post' ? le(_.run.bind(_), h && h.suspense) : _.run(),
    m && m.push(S),
    S
  )
}
function gg(r, t, e) {
  const i = this.proxy,
    s = pe(r) ? (r.includes('.') ? Pd(i, r) : () => i[r]) : r.bind(i, i)
  let n
  ct(t) ? (n = t) : ((n = t.handler), (e = t))
  const o = Vs(this),
    a = bo(s, n.bind(i), e)
  return o(), a
}
function Pd(r, t) {
  const e = t.split('.')
  return () => {
    let i = r
    for (let s = 0; s < e.length && i; s++) i = i[e[s]]
    return i
  }
}
function Pi(r, t = 1 / 0, e) {
  if (t <= 0 || !Lt(r) || r.__v_skip || ((e = e || new Set()), e.has(r))) return r
  if ((e.add(r), t--, ge(r))) Pi(r.value, t, e)
  else if (lt(r)) for (let i = 0; i < r.length; i++) Pi(r[i], t, e)
  else if (pm(r) || ms(r))
    r.forEach((i) => {
      Pi(i, t, e)
    })
  else if (_m(r)) for (const i in r) Pi(r[i], t, e)
  return r
}
function Hr(r, t, e, i) {
  const s = r.dirs,
    n = t && t.dirs
  for (let o = 0; o < s.length; o++) {
    const a = s[o]
    n && (a.oldValue = n[o].value)
    let h = a.dir[i]
    h && (Nr(), De(h, e, 8, [r.el, a, r, t]), Ur())
  }
}
const Er = Symbol('_leaveCb'),
  rn = Symbol('_enterCb')
function _g() {
  const r = { isMounted: !1, isLeaving: !1, isUnmounting: !1, leavingVNodes: new Map() }
  return (
    wo(() => {
      r.isMounted = !0
    }),
    fl(() => {
      r.isUnmounting = !0
    }),
    r
  )
}
const be = [Function, Array],
  yg = {
    mode: String,
    appear: Boolean,
    persisted: Boolean,
    onBeforeEnter: be,
    onEnter: be,
    onAfterEnter: be,
    onEnterCancelled: be,
    onBeforeLeave: be,
    onLeave: be,
    onAfterLeave: be,
    onLeaveCancelled: be,
    onBeforeAppear: be,
    onAppear: be,
    onAfterAppear: be,
    onAppearCancelled: be
  },
  Ag = {
    name: 'BaseTransition',
    props: yg,
    setup(r, { slots: t }) {
      const e = Hs(),
        i = _g()
      return () => {
        const s = t.default && Bd(t.default(), !0)
        if (!s || !s.length) return
        let n = s[0]
        if (s.length > 1) {
          for (const d of s)
            if (d.type !== ve) {
              n = d
              break
            }
        }
        const o = yt(r),
          { mode: a } = o
        if (i.isLeaving) return Wo(n)
        const h = tc(n)
        if (!h) return Wo(n)
        const l = Va(h, o, i, e)
        Xa(h, l)
        const c = e.subTree,
          u = c && tc(c)
        if (u && u.type !== ve && !Zr(h, u)) {
          const d = Va(u, o, i, e)
          if ((Xa(u, d), a === 'out-in' && h.type !== ve))
            return (
              (i.isLeaving = !0),
              (d.afterLeave = () => {
                ;(i.isLeaving = !1), e.update.active !== !1 && ((e.effect.dirty = !0), e.update())
              }),
              Wo(n)
            )
          a === 'in-out' &&
            h.type !== ve &&
            (d.delayLeave = (f, p, m) => {
              const g = Md(i, u)
              ;(g[String(u.key)] = u),
                (f[Er] = () => {
                  p(), (f[Er] = void 0), delete l.delayedLeave
                }),
                (l.delayedLeave = m)
            })
        }
        return n
      }
    }
  },
  vg = Ag
function Md(r, t) {
  const { leavingVNodes: e } = r
  let i = e.get(t.type)
  return i || ((i = Object.create(null)), e.set(t.type, i)), i
}
function Va(r, t, e, i) {
  const {
      appear: s,
      mode: n,
      persisted: o = !1,
      onBeforeEnter: a,
      onEnter: h,
      onAfterEnter: l,
      onEnterCancelled: c,
      onBeforeLeave: u,
      onLeave: d,
      onAfterLeave: f,
      onLeaveCancelled: p,
      onBeforeAppear: m,
      onAppear: g,
      onAfterAppear: A,
      onAppearCancelled: x
    } = t,
    _ = String(r.key),
    v = Md(e, r),
    S = (T, F) => {
      T && De(T, i, 9, F)
    },
    C = (T, F) => {
      const k = F[1]
      S(T, F), lt(T) ? T.every((rt) => rt.length <= 1) && k() : T.length <= 1 && k()
    },
    I = {
      mode: n,
      persisted: o,
      beforeEnter(T) {
        let F = a
        if (!e.isMounted)
          if (s) F = m || a
          else return
        T[Er] && T[Er](!0)
        const k = v[_]
        k && Zr(r, k) && k.el[Er] && k.el[Er](), S(F, [T])
      },
      enter(T) {
        let F = h,
          k = l,
          rt = c
        if (!e.isMounted)
          if (s) (F = g || h), (k = A || l), (rt = x || c)
          else return
        let G = !1
        const E = (T[rn] = (M) => {
          G ||
            ((G = !0),
            M ? S(rt, [T]) : S(k, [T]),
            I.delayedLeave && I.delayedLeave(),
            (T[rn] = void 0))
        })
        F ? C(F, [T, E]) : E()
      },
      leave(T, F) {
        const k = String(r.key)
        if ((T[rn] && T[rn](!0), e.isUnmounting)) return F()
        S(u, [T])
        let rt = !1
        const G = (T[Er] = (E) => {
          rt ||
            ((rt = !0), F(), E ? S(p, [T]) : S(f, [T]), (T[Er] = void 0), v[k] === r && delete v[k])
        })
        ;(v[k] = r), d ? C(d, [T, G]) : G()
      },
      clone(T) {
        return Va(T, t, e, i)
      }
    }
  return I
}
function Wo(r) {
  if (Eo(r)) return (r = Fr(r)), (r.children = null), r
}
function tc(r) {
  if (!Eo(r)) return r
  const { shapeFlag: t, children: e } = r
  if (e) {
    if (t & 16) return e[0]
    if (t & 32 && ct(e.default)) return e.default()
  }
}
function Xa(r, t) {
  r.shapeFlag & 6 && r.component
    ? Xa(r.component.subTree, t)
    : r.shapeFlag & 128
      ? ((r.ssContent.transition = t.clone(r.ssContent)),
        (r.ssFallback.transition = t.clone(r.ssFallback)))
      : (r.transition = t)
}
function Bd(r, t = !1, e) {
  let i = [],
    s = 0
  for (let n = 0; n < r.length; n++) {
    let o = r[n]
    const a = e == null ? o.key : String(e) + String(o.key != null ? o.key : n)
    o.type === ce
      ? (o.patchFlag & 128 && s++, (i = i.concat(Bd(o.children, t, a))))
      : (t || o.type !== ve) && i.push(a != null ? Fr(o, { key: a }) : o)
  }
  if (s > 1) for (let n = 0; n < i.length; n++) i[n].patchFlag = -2
  return i
}
/*! #__NO_SIDE_EFFECTS__ */ function xe(r, t) {
  return ct(r) ? (() => te({ name: r.name }, t, { setup: r }))() : r
}
const As = (r) => !!r.type.__asyncLoader,
  Eo = (r) => r.type.__isKeepAlive
function xg(r, t) {
  Fd(r, 'a', t)
}
function bg(r, t) {
  Fd(r, 'da', t)
}
function Fd(r, t, e = ie) {
  const i =
    r.__wdc ||
    (r.__wdc = () => {
      let s = e
      for (; s; ) {
        if (s.isDeactivated) return
        s = s.parent
      }
      return r()
    })
  if ((To(t, i, e), e)) {
    let s = e.parent
    for (; s && s.parent; ) Eo(s.parent.vnode) && Eg(i, t, e, s), (s = s.parent)
  }
}
function Eg(r, t, e, i) {
  const s = To(t, r, i, !0)
  Dd(() => {
    qh(i[t], s)
  }, e)
}
function To(r, t, e = ie, i = !1) {
  if (e) {
    const s = e[r] || (e[r] = []),
      n =
        t.__weh ||
        (t.__weh = (...o) => {
          if (e.isUnmounted) return
          Nr()
          const a = Vs(e),
            h = De(t, e, r, o)
          return a(), Ur(), h
        })
    return i ? s.unshift(n) : s.push(n), n
  }
}
const _r =
    (r) =>
    (t, e = ie) =>
      (!Co || r === 'sp') && To(r, (...i) => t(...i), e),
  Tg = _r('bm'),
  wo = _r('m'),
  wg = _r('bu'),
  Sg = _r('u'),
  fl = _r('bum'),
  Dd = _r('um'),
  Cg = _r('sp'),
  Ig = _r('rtg'),
  Rg = _r('rtc')
function Pg(r, t = ie) {
  To('ec', r, t)
}
function Od(r, t, e, i) {
  let s
  const n = e && e[i]
  if (lt(r) || pe(r)) {
    s = new Array(r.length)
    for (let o = 0, a = r.length; o < a; o++) s[o] = t(r[o], o, void 0, n && n[o])
  } else if (typeof r == 'number') {
    s = new Array(r)
    for (let o = 0; o < r; o++) s[o] = t(o + 1, o, void 0, n && n[o])
  } else if (Lt(r))
    if (r[Symbol.iterator]) s = Array.from(r, (o, a) => t(o, a, void 0, n && n[a]))
    else {
      const o = Object.keys(r)
      s = new Array(o.length)
      for (let a = 0, h = o.length; a < h; a++) {
        const l = o[a]
        s[a] = t(r[l], l, a, n && n[a])
      }
    }
  else s = []
  return e && (e[i] = s), s
}
function Ld(r, t, e = {}, i, s) {
  if (ae.isCE || (ae.parent && As(ae.parent) && ae.parent.isCE))
    return t !== 'default' && (e.name = t), Ot('slot', e, i && i())
  let n = r[t]
  n && n._c && (n._d = !1), Gt()
  const o = n && Nd(n(e)),
    a = oi(
      ce,
      { key: e.key || (o && o.key) || `_${t}` },
      o || (i ? i() : []),
      o && r._ === 1 ? 64 : -2
    )
  return !s && a.scopeId && (a.slotScopeIds = [a.scopeId + '-s']), n && n._c && (n._d = !0), a
}
function Nd(r) {
  return r.some((t) => (zn(t) ? !(t.type === ve || (t.type === ce && !Nd(t.children))) : !0))
    ? r
    : null
}
const ja = (r) => (r ? (Zd(r) ? yl(r) || r.proxy : ja(r.parent)) : null),
  vs = te(Object.create(null), {
    $: (r) => r,
    $el: (r) => r.vnode.el,
    $data: (r) => r.data,
    $props: (r) => r.props,
    $attrs: (r) => r.attrs,
    $slots: (r) => r.slots,
    $refs: (r) => r.refs,
    $parent: (r) => ja(r.parent),
    $root: (r) => ja(r.root),
    $emit: (r) => r.emit,
    $options: (r) => pl(r),
    $forceUpdate: (r) =>
      r.f ||
      (r.f = () => {
        ;(r.effect.dirty = !0), dl(r.update)
      }),
    $nextTick: (r) => r.n || (r.n = Yi.bind(r.proxy)),
    $watch: (r) => gg.bind(r)
  }),
  $o = (r, t) => r !== wt && !r.__isScriptSetup && mt(r, t),
  Mg = {
    get({ _: r }, t) {
      if (t === '__v_skip') return !0
      const { ctx: e, setupState: i, data: s, props: n, accessCache: o, type: a, appContext: h } = r
      let l
      if (t[0] !== '$') {
        const f = o[t]
        if (f !== void 0)
          switch (f) {
            case 1:
              return i[t]
            case 2:
              return s[t]
            case 4:
              return e[t]
            case 3:
              return n[t]
          }
        else {
          if ($o(i, t)) return (o[t] = 1), i[t]
          if (s !== wt && mt(s, t)) return (o[t] = 2), s[t]
          if ((l = r.propsOptions[0]) && mt(l, t)) return (o[t] = 3), n[t]
          if (e !== wt && mt(e, t)) return (o[t] = 4), e[t]
          Wa && (o[t] = 0)
        }
      }
      const c = vs[t]
      let u, d
      if (c) return t === '$attrs' && me(r.attrs, 'get', ''), c(r)
      if ((u = a.__cssModules) && (u = u[t])) return u
      if (e !== wt && mt(e, t)) return (o[t] = 4), e[t]
      if (((d = h.config.globalProperties), mt(d, t))) return d[t]
    },
    set({ _: r }, t, e) {
      const { data: i, setupState: s, ctx: n } = r
      return $o(s, t)
        ? ((s[t] = e), !0)
        : i !== wt && mt(i, t)
          ? ((i[t] = e), !0)
          : mt(r.props, t) || (t[0] === '$' && t.slice(1) in r)
            ? !1
            : ((n[t] = e), !0)
    },
    has(
      { _: { data: r, setupState: t, accessCache: e, ctx: i, appContext: s, propsOptions: n } },
      o
    ) {
      let a
      return (
        !!e[o] ||
        (r !== wt && mt(r, o)) ||
        $o(t, o) ||
        ((a = n[0]) && mt(a, o)) ||
        mt(i, o) ||
        mt(vs, o) ||
        mt(s.config.globalProperties, o)
      )
    },
    defineProperty(r, t, e) {
      return (
        e.get != null ? (r._.accessCache[t] = 0) : mt(e, 'value') && this.set(r, t, e.value, null),
        Reflect.defineProperty(r, t, e)
      )
    }
  }
function ec(r) {
  return lt(r) ? r.reduce((t, e) => ((t[e] = null), t), {}) : r
}
let Wa = !0
function Bg(r) {
  const t = pl(r),
    e = r.proxy,
    i = r.ctx
  ;(Wa = !1), t.beforeCreate && rc(t.beforeCreate, r, 'bc')
  const {
    data: s,
    computed: n,
    methods: o,
    watch: a,
    provide: h,
    inject: l,
    created: c,
    beforeMount: u,
    mounted: d,
    beforeUpdate: f,
    updated: p,
    activated: m,
    deactivated: g,
    beforeDestroy: A,
    beforeUnmount: x,
    destroyed: _,
    unmounted: v,
    render: S,
    renderTracked: C,
    renderTriggered: I,
    errorCaptured: T,
    serverPrefetch: F,
    expose: k,
    inheritAttrs: rt,
    components: G,
    directives: E,
    filters: M
  } = t
  if ((l && Fg(l, i, null), o))
    for (const H in o) {
      const W = o[H]
      ct(W) && (i[H] = W.bind(e))
    }
  if (s) {
    const H = s.call(e, e)
    Lt(H) && (r.data = ol(H))
  }
  if (((Wa = !0), n))
    for (const H in n) {
      const W = n[H],
        gt = ct(W) ? W.bind(e, e) : ct(W.get) ? W.get.bind(e, e) : ue,
        N = !ct(W) && ct(W.set) ? W.set.bind(e) : ue,
        U = ir({ get: gt, set: N })
      Object.defineProperty(i, H, {
        enumerable: !0,
        configurable: !0,
        get: () => U.value,
        set: (ot) => (U.value = ot)
      })
    }
  if (a) for (const H in a) Ud(a[H], i, e, H)
  if (h) {
    const H = ct(h) ? h.call(e) : h
    Reflect.ownKeys(H).forEach((W) => {
      ml(W, H[W])
    })
  }
  c && rc(c, r, 'c')
  function Z(H, W) {
    lt(W) ? W.forEach((gt) => H(gt.bind(e))) : W && H(W.bind(e))
  }
  if (
    (Z(Tg, u),
    Z(wo, d),
    Z(wg, f),
    Z(Sg, p),
    Z(xg, m),
    Z(bg, g),
    Z(Pg, T),
    Z(Rg, C),
    Z(Ig, I),
    Z(fl, x),
    Z(Dd, v),
    Z(Cg, F),
    lt(k))
  )
    if (k.length) {
      const H = r.exposed || (r.exposed = {})
      k.forEach((W) => {
        Object.defineProperty(H, W, { get: () => e[W], set: (gt) => (e[W] = gt) })
      })
    } else r.exposed || (r.exposed = {})
  S && r.render === ue && (r.render = S),
    rt != null && (r.inheritAttrs = rt),
    G && (r.components = G),
    E && (r.directives = E)
}
function Fg(r, t, e = ue) {
  lt(r) && (r = $a(r))
  for (const i in r) {
    const s = r[i]
    let n
    Lt(s)
      ? 'default' in s
        ? (n = ni(s.from || i, s.default, !0))
        : (n = ni(s.from || i))
      : (n = ni(s)),
      ge(n)
        ? Object.defineProperty(t, i, {
            enumerable: !0,
            configurable: !0,
            get: () => n.value,
            set: (o) => (n.value = o)
          })
        : (t[i] = n)
  }
}
function rc(r, t, e) {
  De(lt(r) ? r.map((i) => i.bind(t.proxy)) : r.bind(t.proxy), t, e)
}
function Ud(r, t, e, i) {
  const s = i.includes('.') ? Pd(e, i) : () => e[i]
  if (pe(r)) {
    const n = t[r]
    ct(n) && Se(s, n)
  } else if (ct(r)) Se(s, r.bind(e))
  else if (Lt(r))
    if (lt(r)) r.forEach((n) => Ud(n, t, e, i))
    else {
      const n = ct(r.handler) ? r.handler.bind(e) : t[r.handler]
      ct(n) && Se(s, n, r)
    }
}
function pl(r) {
  const t = r.type,
    { mixins: e, extends: i } = t,
    {
      mixins: s,
      optionsCache: n,
      config: { optionMergeStrategies: o }
    } = r.appContext,
    a = n.get(t)
  let h
  return (
    a
      ? (h = a)
      : !s.length && !e && !i
        ? (h = t)
        : ((h = {}), s.length && s.forEach((l) => $n(h, l, o, !0)), $n(h, t, o)),
    Lt(t) && n.set(t, h),
    h
  )
}
function $n(r, t, e, i = !1) {
  const { mixins: s, extends: n } = t
  n && $n(r, n, e, !0), s && s.forEach((o) => $n(r, o, e, !0))
  for (const o in t)
    if (!(i && o === 'expose')) {
      const a = Dg[o] || (e && e[o])
      r[o] = a ? a(r[o], t[o]) : t[o]
    }
  return r
}
const Dg = {
  data: ic,
  props: sc,
  emits: sc,
  methods: as,
  computed: as,
  beforeCreate: ne,
  created: ne,
  beforeMount: ne,
  mounted: ne,
  beforeUpdate: ne,
  updated: ne,
  beforeDestroy: ne,
  beforeUnmount: ne,
  destroyed: ne,
  unmounted: ne,
  activated: ne,
  deactivated: ne,
  errorCaptured: ne,
  serverPrefetch: ne,
  components: as,
  directives: as,
  watch: Lg,
  provide: ic,
  inject: Og
}
function ic(r, t) {
  return t
    ? r
      ? function () {
          return te(ct(r) ? r.call(this, this) : r, ct(t) ? t.call(this, this) : t)
        }
      : t
    : r
}
function Og(r, t) {
  return as($a(r), $a(t))
}
function $a(r) {
  if (lt(r)) {
    const t = {}
    for (let e = 0; e < r.length; e++) t[r[e]] = r[e]
    return t
  }
  return r
}
function ne(r, t) {
  return r ? [...new Set([].concat(r, t))] : t
}
function as(r, t) {
  return r ? te(Object.create(null), r, t) : t
}
function sc(r, t) {
  return r
    ? lt(r) && lt(t)
      ? [...new Set([...r, ...t])]
      : te(Object.create(null), ec(r), ec(t ?? {}))
    : t
}
function Lg(r, t) {
  if (!r) return t
  if (!t) return r
  const e = te(Object.create(null), r)
  for (const i in t) e[i] = ne(r[i], t[i])
  return e
}
function kd() {
  return {
    app: null,
    config: {
      isNativeTag: dm,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: Object.create(null),
    optionsCache: new WeakMap(),
    propsCache: new WeakMap(),
    emitsCache: new WeakMap()
  }
}
let Ng = 0
function Ug(r, t) {
  return function (i, s = null) {
    ct(i) || (i = te({}, i)), s != null && !Lt(s) && (s = null)
    const n = kd(),
      o = new WeakSet()
    let a = !1
    const h = (n.app = {
      _uid: Ng++,
      _component: i,
      _props: s,
      _container: null,
      _context: n,
      _instance: null,
      version: l_,
      get config() {
        return n.config
      },
      set config(l) {},
      use(l, ...c) {
        return (
          o.has(l) ||
            (l && ct(l.install) ? (o.add(l), l.install(h, ...c)) : ct(l) && (o.add(l), l(h, ...c))),
          h
        )
      },
      mixin(l) {
        return n.mixins.includes(l) || n.mixins.push(l), h
      },
      component(l, c) {
        return c ? ((n.components[l] = c), h) : n.components[l]
      },
      directive(l, c) {
        return c ? ((n.directives[l] = c), h) : n.directives[l]
      },
      mount(l, c, u) {
        if (!a) {
          const d = Ot(i, s)
          return (
            (d.appContext = n),
            u === !0 ? (u = 'svg') : u === !1 && (u = void 0),
            c && t ? t(d, l) : r(d, l, u),
            (a = !0),
            (h._container = l),
            (l.__vue_app__ = h),
            yl(d.component) || d.component.proxy
          )
        }
      },
      unmount() {
        a && (r(null, h._container), delete h._container.__vue_app__)
      },
      provide(l, c) {
        return (n.provides[l] = c), h
      },
      runWithContext(l) {
        const c = xs
        xs = h
        try {
          return l()
        } finally {
          xs = c
        }
      }
    })
    return h
  }
}
let xs = null
function ml(r, t) {
  if (ie) {
    let e = ie.provides
    const i = ie.parent && ie.parent.provides
    i === e && (e = ie.provides = Object.create(i)), (e[r] = t)
  }
}
function ni(r, t, e = !1) {
  const i = ie || ae
  if (i || xs) {
    const s = i
      ? i.parent == null
        ? i.vnode.appContext && i.vnode.appContext.provides
        : i.parent.provides
      : xs._context.provides
    if (s && r in s) return s[r]
    if (arguments.length > 1) return e && ct(t) ? t.call(i && i.proxy) : t
  }
}
const Gd = {},
  Hd = () => Object.create(Gd),
  Vd = (r) => Object.getPrototypeOf(r) === Gd
function kg(r, t, e, i = !1) {
  const s = {},
    n = Hd()
  ;(r.propsDefaults = Object.create(null)), Xd(r, t, s, n)
  for (const o in r.propsOptions[0]) o in s || (s[o] = void 0)
  e ? (r.props = i ? s : zm(s)) : r.type.props ? (r.props = s) : (r.props = n), (r.attrs = n)
}
function Gg(r, t, e, i) {
  const {
      props: s,
      attrs: n,
      vnode: { patchFlag: o }
    } = r,
    a = yt(s),
    [h] = r.propsOptions
  let l = !1
  if ((i || o > 0) && !(o & 16)) {
    if (o & 8) {
      const c = r.vnode.dynamicProps
      for (let u = 0; u < c.length; u++) {
        let d = c[u]
        if (xo(r.emitsOptions, d)) continue
        const f = t[d]
        if (h)
          if (mt(n, d)) f !== n[d] && ((n[d] = f), (l = !0))
          else {
            const p = tr(d)
            s[p] = za(h, a, p, f, r, !1)
          }
        else f !== n[d] && ((n[d] = f), (l = !0))
      }
    }
  } else {
    Xd(r, t, s, n) && (l = !0)
    let c
    for (const u in a)
      (!t || (!mt(t, u) && ((c = Gs(u)) === u || !mt(t, c)))) &&
        (h
          ? e && (e[u] !== void 0 || e[c] !== void 0) && (s[u] = za(h, a, u, void 0, r, !0))
          : delete s[u])
    if (n !== a) for (const u in n) (!t || !mt(t, u)) && (delete n[u], (l = !0))
  }
  l && dr(r.attrs, 'set', '')
}
function Xd(r, t, e, i) {
  const [s, n] = r.propsOptions
  let o = !1,
    a
  if (t)
    for (let h in t) {
      if (gs(h)) continue
      const l = t[h]
      let c
      s && mt(s, (c = tr(h)))
        ? !n || !n.includes(c)
          ? (e[c] = l)
          : ((a || (a = {}))[c] = l)
        : xo(r.emitsOptions, h) || ((!(h in i) || l !== i[h]) && ((i[h] = l), (o = !0)))
    }
  if (n) {
    const h = yt(e),
      l = a || wt
    for (let c = 0; c < n.length; c++) {
      const u = n[c]
      e[u] = za(s, h, u, l[u], r, !mt(l, u))
    }
  }
  return o
}
function za(r, t, e, i, s, n) {
  const o = r[e]
  if (o != null) {
    const a = mt(o, 'default')
    if (a && i === void 0) {
      const h = o.default
      if (o.type !== Function && !o.skipFactory && ct(h)) {
        const { propsDefaults: l } = s
        if (e in l) i = l[e]
        else {
          const c = Vs(s)
          ;(i = l[e] = h.call(null, t)), c()
        }
      } else i = h
    }
    o[0] && (n && !a ? (i = !1) : o[1] && (i === '' || i === Gs(e)) && (i = !0))
  }
  return i
}
function jd(r, t, e = !1) {
  const i = t.propsCache,
    s = i.get(r)
  if (s) return s
  const n = r.props,
    o = {},
    a = []
  let h = !1
  if (!ct(r)) {
    const c = (u) => {
      h = !0
      const [d, f] = jd(u, t, !0)
      te(o, d), f && a.push(...f)
    }
    !e && t.mixins.length && t.mixins.forEach(c),
      r.extends && c(r.extends),
      r.mixins && r.mixins.forEach(c)
  }
  if (!n && !h) return Lt(r) && i.set(r, Fi), Fi
  if (lt(n))
    for (let c = 0; c < n.length; c++) {
      const u = tr(n[c])
      nc(u) && (o[u] = wt)
    }
  else if (n)
    for (const c in n) {
      const u = tr(c)
      if (nc(u)) {
        const d = n[c],
          f = (o[u] = lt(d) || ct(d) ? { type: d } : te({}, d))
        if (f) {
          const p = hc(Boolean, f.type),
            m = hc(String, f.type)
          ;(f[0] = p > -1), (f[1] = m < 0 || p < m), (p > -1 || mt(f, 'default')) && a.push(u)
        }
      }
    }
  const l = [o, a]
  return Lt(r) && i.set(r, l), l
}
function nc(r) {
  return r[0] !== '$' && !gs(r)
}
function oc(r) {
  return r === null
    ? 'null'
    : typeof r == 'function'
      ? r.name || ''
      : (typeof r == 'object' && r.constructor && r.constructor.name) || ''
}
function ac(r, t) {
  return oc(r) === oc(t)
}
function hc(r, t) {
  return lt(t) ? t.findIndex((e) => ac(e, r)) : ct(t) && ac(t, r) ? 0 : -1
}
const Wd = (r) => r[0] === '_' || r === '$stable',
  gl = (r) => (lt(r) ? r.map(ze) : [ze(r)]),
  Hg = (r, t, e) => {
    if (t._n) return t
    const i = Wn((...s) => gl(t(...s)), e)
    return (i._c = !1), i
  },
  $d = (r, t, e) => {
    const i = r._ctx
    for (const s in r) {
      if (Wd(s)) continue
      const n = r[s]
      if (ct(n)) t[s] = Hg(s, n, i)
      else if (n != null) {
        const o = gl(n)
        t[s] = () => o
      }
    }
  },
  zd = (r, t) => {
    const e = gl(t)
    r.slots.default = () => e
  },
  Vg = (r, t) => {
    const e = (r.slots = Hd())
    if (r.vnode.shapeFlag & 32) {
      const i = t._
      i ? (te(e, t), id(e, '_', i, !0)) : $d(t, e)
    } else t && zd(r, t)
  },
  Xg = (r, t, e) => {
    const { vnode: i, slots: s } = r
    let n = !0,
      o = wt
    if (i.shapeFlag & 32) {
      const a = t._
      a
        ? e && a === 1
          ? (n = !1)
          : (te(s, t), !e && a === 1 && delete s._)
        : ((n = !t.$stable), $d(t, s)),
        (o = t)
    } else t && (zd(r, t), (o = { default: 1 }))
    if (n) for (const a in s) !Wd(a) && o[a] == null && delete s[a]
  }
function Ya(r, t, e, i, s = !1) {
  if (lt(r)) {
    r.forEach((d, f) => Ya(d, t && (lt(t) ? t[f] : t), e, i, s))
    return
  }
  if (As(i) && !s) return
  const n = i.shapeFlag & 4 ? yl(i.component) || i.component.proxy : i.el,
    o = s ? null : n,
    { i: a, r: h } = r,
    l = t && t.r,
    c = a.refs === wt ? (a.refs = {}) : a.refs,
    u = a.setupState
  if (
    (l != null &&
      l !== h &&
      (pe(l) ? ((c[l] = null), mt(u, l) && (u[l] = null)) : ge(l) && (l.value = null)),
    ct(h))
  )
    Br(h, a, 12, [o, c])
  else {
    const d = pe(h),
      f = ge(h)
    if (d || f) {
      const p = () => {
        if (r.f) {
          const m = d ? (mt(u, h) ? u[h] : c[h]) : h.value
          s
            ? lt(m) && qh(m, n)
            : lt(m)
              ? m.includes(n) || m.push(n)
              : d
                ? ((c[h] = [n]), mt(u, h) && (u[h] = c[h]))
                : ((h.value = [n]), r.k && (c[r.k] = h.value))
        } else d ? ((c[h] = o), mt(u, h) && (u[h] = o)) : f && ((h.value = o), r.k && (c[r.k] = o))
      }
      o ? ((p.id = -1), le(p, e)) : p()
    }
  }
}
const le = dg
function jg(r) {
  return Wg(r)
}
function Wg(r, t) {
  const e = sd()
  e.__VUE__ = !0
  const {
      insert: i,
      remove: s,
      patchProp: n,
      createElement: o,
      createText: a,
      createComment: h,
      setText: l,
      setElementText: c,
      parentNode: u,
      nextSibling: d,
      setScopeId: f = ue,
      insertStaticContent: p
    } = r,
    m = (y, b, w, R = null, P = null, O = null, $ = void 0, L = null, V = !!b.dynamicChildren) => {
      if (y === b) return
      y && !Zr(y, b) && ((R = Mt(y)), ot(y, P, O, !0), (y = null)),
        b.patchFlag === -2 && ((V = !1), (b.dynamicChildren = null))
      const { type: B, ref: Q, shapeFlag: it } = b
      switch (B) {
        case So:
          g(y, b, w, R)
          break
        case ve:
          A(y, b, w, R)
          break
        case Yo:
          y == null && x(b, w, R, $)
          break
        case ce:
          G(y, b, w, R, P, O, $, L, V)
          break
        default:
          it & 1
            ? S(y, b, w, R, P, O, $, L, V)
            : it & 6
              ? E(y, b, w, R, P, O, $, L, V)
              : (it & 64 || it & 128) && B.process(y, b, w, R, P, O, $, L, V, It)
      }
      Q != null && P && Ya(Q, y && y.ref, O, b || y, !b)
    },
    g = (y, b, w, R) => {
      if (y == null) i((b.el = a(b.children)), w, R)
      else {
        const P = (b.el = y.el)
        b.children !== y.children && l(P, b.children)
      }
    },
    A = (y, b, w, R) => {
      y == null ? i((b.el = h(b.children || '')), w, R) : (b.el = y.el)
    },
    x = (y, b, w, R) => {
      ;[y.el, y.anchor] = p(y.children, b, w, R, y.el, y.anchor)
    },
    _ = ({ el: y, anchor: b }, w, R) => {
      let P
      for (; y && y !== b; ) (P = d(y)), i(y, w, R), (y = P)
      i(b, w, R)
    },
    v = ({ el: y, anchor: b }) => {
      let w
      for (; y && y !== b; ) (w = d(y)), s(y), (y = w)
      s(b)
    },
    S = (y, b, w, R, P, O, $, L, V) => {
      b.type === 'svg' ? ($ = 'svg') : b.type === 'math' && ($ = 'mathml'),
        y == null ? C(b, w, R, P, O, $, L, V) : F(y, b, P, O, $, L, V)
    },
    C = (y, b, w, R, P, O, $, L) => {
      let V, B
      const { props: Q, shapeFlag: it, transition: et, dirs: at } = y
      if (
        ((V = y.el = o(y.type, O, Q && Q.is, Q)),
        it & 8 ? c(V, y.children) : it & 16 && T(y.children, V, null, R, P, zo(y, O), $, L),
        at && Hr(y, null, R, 'created'),
        I(V, y, y.scopeId, $, R),
        Q)
      ) {
        for (const bt in Q)
          bt !== 'value' && !gs(bt) && n(V, bt, null, Q[bt], O, y.children, R, P, At)
        'value' in Q && n(V, 'value', null, Q.value, O), (B = Q.onVnodeBeforeMount) && ke(B, R, y)
      }
      at && Hr(y, null, R, 'beforeMount')
      const dt = $g(P, et)
      dt && et.beforeEnter(V),
        i(V, b, w),
        ((B = Q && Q.onVnodeMounted) || dt || at) &&
          le(() => {
            B && ke(B, R, y), dt && et.enter(V), at && Hr(y, null, R, 'mounted')
          }, P)
    },
    I = (y, b, w, R, P) => {
      if ((w && f(y, w), R)) for (let O = 0; O < R.length; O++) f(y, R[O])
      if (P) {
        let O = P.subTree
        if (b === O) {
          const $ = P.vnode
          I(y, $, $.scopeId, $.slotScopeIds, P.parent)
        }
      }
    },
    T = (y, b, w, R, P, O, $, L, V = 0) => {
      for (let B = V; B < y.length; B++) {
        const Q = (y[B] = L ? Tr(y[B]) : ze(y[B]))
        m(null, Q, b, w, R, P, O, $, L)
      }
    },
    F = (y, b, w, R, P, O, $) => {
      const L = (b.el = y.el)
      let { patchFlag: V, dynamicChildren: B, dirs: Q } = b
      V |= y.patchFlag & 16
      const it = y.props || wt,
        et = b.props || wt
      let at
      if (
        (w && Vr(w, !1),
        (at = et.onVnodeBeforeUpdate) && ke(at, w, b, y),
        Q && Hr(b, y, w, 'beforeUpdate'),
        w && Vr(w, !0),
        B
          ? k(y.dynamicChildren, B, L, w, R, zo(b, P), O)
          : $ || W(y, b, L, null, w, R, zo(b, P), O, !1),
        V > 0)
      ) {
        if (V & 16) rt(L, b, it, et, w, R, P)
        else if (
          (V & 2 && it.class !== et.class && n(L, 'class', null, et.class, P),
          V & 4 && n(L, 'style', it.style, et.style, P),
          V & 8)
        ) {
          const dt = b.dynamicProps
          for (let bt = 0; bt < dt.length; bt++) {
            const Pt = dt[bt],
              $t = it[Pt],
              Ce = et[Pt]
            ;(Ce !== $t || Pt === 'value') && n(L, Pt, $t, Ce, P, y.children, w, R, At)
          }
        }
        V & 1 && y.children !== b.children && c(L, b.children)
      } else !$ && B == null && rt(L, b, it, et, w, R, P)
      ;((at = et.onVnodeUpdated) || Q) &&
        le(() => {
          at && ke(at, w, b, y), Q && Hr(b, y, w, 'updated')
        }, R)
    },
    k = (y, b, w, R, P, O, $) => {
      for (let L = 0; L < b.length; L++) {
        const V = y[L],
          B = b[L],
          Q = V.el && (V.type === ce || !Zr(V, B) || V.shapeFlag & 70) ? u(V.el) : w
        m(V, B, Q, null, R, P, O, $, !0)
      }
    },
    rt = (y, b, w, R, P, O, $) => {
      if (w !== R) {
        if (w !== wt)
          for (const L in w) !gs(L) && !(L in R) && n(y, L, w[L], null, $, b.children, P, O, At)
        for (const L in R) {
          if (gs(L)) continue
          const V = R[L],
            B = w[L]
          V !== B && L !== 'value' && n(y, L, B, V, $, b.children, P, O, At)
        }
        'value' in R && n(y, 'value', w.value, R.value, $)
      }
    },
    G = (y, b, w, R, P, O, $, L, V) => {
      const B = (b.el = y ? y.el : a('')),
        Q = (b.anchor = y ? y.anchor : a(''))
      let { patchFlag: it, dynamicChildren: et, slotScopeIds: at } = b
      at && (L = L ? L.concat(at) : at),
        y == null
          ? (i(B, w, R), i(Q, w, R), T(b.children || [], w, Q, P, O, $, L, V))
          : it > 0 && it & 64 && et && y.dynamicChildren
            ? (k(y.dynamicChildren, et, w, P, O, $, L),
              (b.key != null || (P && b === P.subTree)) && Yd(y, b, !0))
            : W(y, b, w, Q, P, O, $, L, V)
    },
    E = (y, b, w, R, P, O, $, L, V) => {
      ;(b.slotScopeIds = L),
        y == null
          ? b.shapeFlag & 512
            ? P.ctx.activate(b, w, R, $, V)
            : M(b, w, R, P, O, $, V)
          : K(y, b, V)
    },
    M = (y, b, w, R, P, O, $) => {
      const L = (y.component = r_(y, R, P))
      if ((Eo(y) && (L.ctx.renderer = It), i_(L), L.asyncDep)) {
        if ((P && P.registerDep(L, Z), !y.el)) {
          const V = (L.subTree = Ot(ve))
          A(null, V, b, w)
        }
      } else Z(L, y, b, w, P, O, $)
    },
    K = (y, b, w) => {
      const R = (b.component = y.component)
      if (hg(y, b, w))
        if (R.asyncDep && !R.asyncResolved) {
          H(R, b, w)
          return
        } else (R.next = b), rg(R.update), (R.effect.dirty = !0), R.update()
      else (b.el = y.el), (R.vnode = b)
    },
    Z = (y, b, w, R, P, O, $) => {
      const L = () => {
          if (y.isMounted) {
            let { next: Q, bu: it, u: et, parent: at, vnode: dt } = y
            {
              const gi = Qd(y)
              if (gi) {
                Q && ((Q.el = dt.el), H(y, Q, $)),
                  gi.asyncDep.then(() => {
                    y.isUnmounted || L()
                  })
                return
              }
            }
            let bt = Q,
              Pt
            Vr(y, !1),
              Q ? ((Q.el = dt.el), H(y, Q, $)) : (Q = dt),
              it && Xo(it),
              (Pt = Q.props && Q.props.onVnodeBeforeUpdate) && ke(Pt, at, Q, dt),
              Vr(y, !0)
            const $t = jo(y),
              Ce = y.subTree
            ;(y.subTree = $t),
              m(Ce, $t, u(Ce.el), Mt(Ce), y, P, O),
              (Q.el = $t.el),
              bt === null && lg(y, $t.el),
              et && le(et, P),
              (Pt = Q.props && Q.props.onVnodeUpdated) && le(() => ke(Pt, at, Q, dt), P)
          } else {
            let Q
            const { el: it, props: et } = b,
              { bm: at, m: dt, parent: bt } = y,
              Pt = As(b)
            if (
              (Vr(y, !1),
              at && Xo(at),
              !Pt && (Q = et && et.onVnodeBeforeMount) && ke(Q, bt, b),
              Vr(y, !0),
              it && Rt)
            ) {
              const $t = () => {
                ;(y.subTree = jo(y)), Rt(it, y.subTree, y, P, null)
              }
              Pt ? b.type.__asyncLoader().then(() => !y.isUnmounted && $t()) : $t()
            } else {
              const $t = (y.subTree = jo(y))
              m(null, $t, w, R, y, P, O), (b.el = $t.el)
            }
            if ((dt && le(dt, P), !Pt && (Q = et && et.onVnodeMounted))) {
              const $t = b
              le(() => ke(Q, bt, $t), P)
            }
            ;(b.shapeFlag & 256 || (bt && As(bt.vnode) && bt.vnode.shapeFlag & 256)) &&
              y.a &&
              le(y.a, P),
              (y.isMounted = !0),
              (b = w = R = null)
          }
        },
        V = (y.effect = new el(L, ue, () => dl(B), y.scope)),
        B = (y.update = () => {
          V.dirty && V.run()
        })
      ;(B.id = y.uid), Vr(y, !0), B()
    },
    H = (y, b, w) => {
      b.component = y
      const R = y.vnode.props
      ;(y.vnode = b), (y.next = null), Gg(y, b.props, R, w), Xg(y, b.children, w), Nr(), Zl(y), Ur()
    },
    W = (y, b, w, R, P, O, $, L, V = !1) => {
      const B = y && y.children,
        Q = y ? y.shapeFlag : 0,
        it = b.children,
        { patchFlag: et, shapeFlag: at } = b
      if (et > 0) {
        if (et & 128) {
          N(B, it, w, R, P, O, $, L, V)
          return
        } else if (et & 256) {
          gt(B, it, w, R, P, O, $, L, V)
          return
        }
      }
      at & 8
        ? (Q & 16 && At(B, P, O), it !== B && c(w, it))
        : Q & 16
          ? at & 16
            ? N(B, it, w, R, P, O, $, L, V)
            : At(B, P, O, !0)
          : (Q & 8 && c(w, ''), at & 16 && T(it, w, R, P, O, $, L, V))
    },
    gt = (y, b, w, R, P, O, $, L, V) => {
      ;(y = y || Fi), (b = b || Fi)
      const B = y.length,
        Q = b.length,
        it = Math.min(B, Q)
      let et
      for (et = 0; et < it; et++) {
        const at = (b[et] = V ? Tr(b[et]) : ze(b[et]))
        m(y[et], at, w, null, P, O, $, L, V)
      }
      B > Q ? At(y, P, O, !0, !1, it) : T(b, w, R, P, O, $, L, V, it)
    },
    N = (y, b, w, R, P, O, $, L, V) => {
      let B = 0
      const Q = b.length
      let it = y.length - 1,
        et = Q - 1
      for (; B <= it && B <= et; ) {
        const at = y[B],
          dt = (b[B] = V ? Tr(b[B]) : ze(b[B]))
        if (Zr(at, dt)) m(at, dt, w, null, P, O, $, L, V)
        else break
        B++
      }
      for (; B <= it && B <= et; ) {
        const at = y[it],
          dt = (b[et] = V ? Tr(b[et]) : ze(b[et]))
        if (Zr(at, dt)) m(at, dt, w, null, P, O, $, L, V)
        else break
        it--, et--
      }
      if (B > it) {
        if (B <= et) {
          const at = et + 1,
            dt = at < Q ? b[at].el : R
          for (; B <= et; ) m(null, (b[B] = V ? Tr(b[B]) : ze(b[B])), w, dt, P, O, $, L, V), B++
        }
      } else if (B > et) for (; B <= it; ) ot(y[B], P, O, !0), B++
      else {
        const at = B,
          dt = B,
          bt = new Map()
        for (B = dt; B <= et; B++) {
          const _e = (b[B] = V ? Tr(b[B]) : ze(b[B]))
          _e.key != null && bt.set(_e.key, B)
        }
        let Pt,
          $t = 0
        const Ce = et - dt + 1
        let gi = !1,
          Hl = 0
        const Ji = new Array(Ce)
        for (B = 0; B < Ce; B++) Ji[B] = 0
        for (B = at; B <= it; B++) {
          const _e = y[B]
          if ($t >= Ce) {
            ot(_e, P, O, !0)
            continue
          }
          let Ue
          if (_e.key != null) Ue = bt.get(_e.key)
          else
            for (Pt = dt; Pt <= et; Pt++)
              if (Ji[Pt - dt] === 0 && Zr(_e, b[Pt])) {
                Ue = Pt
                break
              }
          Ue === void 0
            ? ot(_e, P, O, !0)
            : ((Ji[Ue - dt] = B + 1),
              Ue >= Hl ? (Hl = Ue) : (gi = !0),
              m(_e, b[Ue], w, null, P, O, $, L, V),
              $t++)
        }
        const Vl = gi ? zg(Ji) : Fi
        for (Pt = Vl.length - 1, B = Ce - 1; B >= 0; B--) {
          const _e = dt + B,
            Ue = b[_e],
            Xl = _e + 1 < Q ? b[_e + 1].el : R
          Ji[B] === 0
            ? m(null, Ue, w, Xl, P, O, $, L, V)
            : gi && (Pt < 0 || B !== Vl[Pt] ? U(Ue, w, Xl, 2) : Pt--)
        }
      }
    },
    U = (y, b, w, R, P = null) => {
      const { el: O, type: $, transition: L, children: V, shapeFlag: B } = y
      if (B & 6) {
        U(y.component.subTree, b, w, R)
        return
      }
      if (B & 128) {
        y.suspense.move(b, w, R)
        return
      }
      if (B & 64) {
        $.move(y, b, w, It)
        return
      }
      if ($ === ce) {
        i(O, b, w)
        for (let it = 0; it < V.length; it++) U(V[it], b, w, R)
        i(y.anchor, b, w)
        return
      }
      if ($ === Yo) {
        _(y, b, w)
        return
      }
      if (R !== 2 && B & 1 && L)
        if (R === 0) L.beforeEnter(O), i(O, b, w), le(() => L.enter(O), P)
        else {
          const { leave: it, delayLeave: et, afterLeave: at } = L,
            dt = () => i(O, b, w),
            bt = () => {
              it(O, () => {
                dt(), at && at()
              })
            }
          et ? et(O, dt, bt) : bt()
        }
      else i(O, b, w)
    },
    ot = (y, b, w, R = !1, P = !1) => {
      const {
        type: O,
        props: $,
        ref: L,
        children: V,
        dynamicChildren: B,
        shapeFlag: Q,
        patchFlag: it,
        dirs: et
      } = y
      if ((L != null && Ya(L, null, w, y, !0), Q & 256)) {
        b.ctx.deactivate(y)
        return
      }
      const at = Q & 1 && et,
        dt = !As(y)
      let bt
      if ((dt && (bt = $ && $.onVnodeBeforeUnmount) && ke(bt, b, y), Q & 6)) Ht(y.component, w, R)
      else {
        if (Q & 128) {
          y.suspense.unmount(w, R)
          return
        }
        at && Hr(y, null, b, 'beforeUnmount'),
          Q & 64
            ? y.type.remove(y, b, w, P, It, R)
            : B && (O !== ce || (it > 0 && it & 64))
              ? At(B, b, w, !1, !0)
              : ((O === ce && it & 384) || (!P && Q & 16)) && At(V, b, w),
          R && _t(y)
      }
      ;((dt && (bt = $ && $.onVnodeUnmounted)) || at) &&
        le(() => {
          bt && ke(bt, b, y), at && Hr(y, null, b, 'unmounted')
        }, w)
    },
    _t = (y) => {
      const { type: b, el: w, anchor: R, transition: P } = y
      if (b === ce) {
        vt(w, R)
        return
      }
      if (b === Yo) {
        v(y)
        return
      }
      const O = () => {
        s(w), P && !P.persisted && P.afterLeave && P.afterLeave()
      }
      if (y.shapeFlag & 1 && P && !P.persisted) {
        const { leave: $, delayLeave: L } = P,
          V = () => $(w, O)
        L ? L(y.el, O, V) : V()
      } else O()
    },
    vt = (y, b) => {
      let w
      for (; y !== b; ) (w = d(y)), s(y), (y = w)
      s(b)
    },
    Ht = (y, b, w) => {
      const { bum: R, scope: P, update: O, subTree: $, um: L } = y
      R && Xo(R),
        P.stop(),
        O && ((O.active = !1), ot($, y, b, w)),
        L && le(L, b),
        le(() => {
          y.isUnmounted = !0
        }, b),
        b &&
          b.pendingBranch &&
          !b.isUnmounted &&
          y.asyncDep &&
          !y.asyncResolved &&
          y.suspenseId === b.pendingId &&
          (b.deps--, b.deps === 0 && b.resolve())
    },
    At = (y, b, w, R = !1, P = !1, O = 0) => {
      for (let $ = O; $ < y.length; $++) ot(y[$], b, w, R, P)
    },
    Mt = (y) =>
      y.shapeFlag & 6
        ? Mt(y.component.subTree)
        : y.shapeFlag & 128
          ? y.suspense.next()
          : d(y.anchor || y.el)
  let Vt = !1
  const ee = (y, b, w) => {
      y == null
        ? b._vnode && ot(b._vnode, null, null, !0)
        : m(b._vnode || null, y, b, null, null, null, w),
        Vt || ((Vt = !0), Zl(), wd(), (Vt = !1)),
        (b._vnode = y)
    },
    It = { p: m, um: ot, m: U, r: _t, mt: M, mc: T, pc: W, pbc: k, n: Mt, o: r }
  let xt, Rt
  return t && ([xt, Rt] = t(It)), { render: ee, hydrate: xt, createApp: Ug(ee, xt) }
}
function zo({ type: r, props: t }, e) {
  return (e === 'svg' && r === 'foreignObject') ||
    (e === 'mathml' && r === 'annotation-xml' && t && t.encoding && t.encoding.includes('html'))
    ? void 0
    : e
}
function Vr({ effect: r, update: t }, e) {
  r.allowRecurse = t.allowRecurse = e
}
function $g(r, t) {
  return (!r || (r && !r.pendingBranch)) && t && !t.persisted
}
function Yd(r, t, e = !1) {
  const i = r.children,
    s = t.children
  if (lt(i) && lt(s))
    for (let n = 0; n < i.length; n++) {
      const o = i[n]
      let a = s[n]
      a.shapeFlag & 1 &&
        !a.dynamicChildren &&
        ((a.patchFlag <= 0 || a.patchFlag === 32) && ((a = s[n] = Tr(s[n])), (a.el = o.el)),
        e || Yd(o, a)),
        a.type === So && (a.el = o.el)
    }
}
function zg(r) {
  const t = r.slice(),
    e = [0]
  let i, s, n, o, a
  const h = r.length
  for (i = 0; i < h; i++) {
    const l = r[i]
    if (l !== 0) {
      if (((s = e[e.length - 1]), r[s] < l)) {
        ;(t[i] = s), e.push(i)
        continue
      }
      for (n = 0, o = e.length - 1; n < o; ) (a = (n + o) >> 1), r[e[a]] < l ? (n = a + 1) : (o = a)
      l < r[e[n]] && (n > 0 && (t[i] = e[n - 1]), (e[n] = i))
    }
  }
  for (n = e.length, o = e[n - 1]; n-- > 0; ) (e[n] = o), (o = t[o])
  return e
}
function Qd(r) {
  const t = r.subTree.component
  if (t) return t.asyncDep && !t.asyncResolved ? t : Qd(t)
}
const Yg = (r) => r.__isTeleport,
  ce = Symbol.for('v-fgt'),
  So = Symbol.for('v-txt'),
  ve = Symbol.for('v-cmt'),
  Yo = Symbol.for('v-stc'),
  bs = []
let Fe = null
function Gt(r = !1) {
  bs.push((Fe = r ? null : []))
}
function Qg() {
  bs.pop(), (Fe = bs[bs.length - 1] || null)
}
let Bs = 1
function lc(r) {
  Bs += r
}
function Kd(r) {
  return (r.dynamicChildren = Bs > 0 ? Fe || Fi : null), Qg(), Bs > 0 && Fe && Fe.push(r), r
}
function fe(r, t, e, i, s, n) {
  return Kd(rr(r, t, e, i, s, n, !0))
}
function oi(r, t, e, i, s) {
  return Kd(Ot(r, t, e, i, s, !0))
}
function zn(r) {
  return r ? r.__v_isVNode === !0 : !1
}
function Zr(r, t) {
  return r.type === t.type && r.key === t.key
}
const qd = ({ key: r }) => r ?? null,
  Mn = ({ ref: r, ref_key: t, ref_for: e }) => (
    typeof r == 'number' && (r = '' + r),
    r != null ? (pe(r) || ge(r) || ct(r) ? { i: ae, r, k: t, f: !!e } : r) : null
  )
function rr(r, t = null, e = null, i = 0, s = null, n = r === ce ? 0 : 1, o = !1, a = !1) {
  const h = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: r,
    props: t,
    key: t && qd(t),
    ref: t && Mn(t),
    scopeId: Id,
    slotScopeIds: null,
    children: e,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: n,
    patchFlag: i,
    dynamicProps: s,
    dynamicChildren: null,
    appContext: null,
    ctx: ae
  }
  return (
    a ? (_l(h, e), n & 128 && r.normalize(h)) : e && (h.shapeFlag |= pe(e) ? 8 : 16),
    Bs > 0 && !o && Fe && (h.patchFlag > 0 || n & 6) && h.patchFlag !== 32 && Fe.push(h),
    h
  )
}
const Ot = Kg
function Kg(r, t = null, e = null, i = 0, s = null, n = !1) {
  if (((!r || r === cg) && (r = ve), zn(r))) {
    const a = Fr(r, t, !0)
    return (
      e && _l(a, e),
      Bs > 0 && !n && Fe && (a.shapeFlag & 6 ? (Fe[Fe.indexOf(r)] = a) : Fe.push(a)),
      (a.patchFlag |= -2),
      a
    )
  }
  if ((a_(r) && (r = r.__vccOpts), t)) {
    t = qg(t)
    let { class: a, style: h } = t
    a && !pe(a) && (t.class = tl(a)),
      Lt(h) && (Ad(h) && !lt(h) && (h = te({}, h)), (t.style = Jh(h)))
  }
  const o = pe(r) ? 1 : ug(r) ? 128 : Yg(r) ? 64 : Lt(r) ? 4 : ct(r) ? 2 : 0
  return rr(r, t, e, i, s, o, n, !0)
}
function qg(r) {
  return r ? (Ad(r) || Vd(r) ? te({}, r) : r) : null
}
function Fr(r, t, e = !1, i = !1) {
  const { props: s, ref: n, patchFlag: o, children: a, transition: h } = r,
    l = t ? Jg(s || {}, t) : s,
    c = {
      __v_isVNode: !0,
      __v_skip: !0,
      type: r.type,
      props: l,
      key: l && qd(l),
      ref: t && t.ref ? (e && n ? (lt(n) ? n.concat(Mn(t)) : [n, Mn(t)]) : Mn(t)) : n,
      scopeId: r.scopeId,
      slotScopeIds: r.slotScopeIds,
      children: a,
      target: r.target,
      targetAnchor: r.targetAnchor,
      staticCount: r.staticCount,
      shapeFlag: r.shapeFlag,
      patchFlag: t && r.type !== ce ? (o === -1 ? 16 : o | 16) : o,
      dynamicProps: r.dynamicProps,
      dynamicChildren: r.dynamicChildren,
      appContext: r.appContext,
      dirs: r.dirs,
      transition: h,
      component: r.component,
      suspense: r.suspense,
      ssContent: r.ssContent && Fr(r.ssContent),
      ssFallback: r.ssFallback && Fr(r.ssFallback),
      el: r.el,
      anchor: r.anchor,
      ctx: r.ctx,
      ce: r.ce
    }
  return h && i && (c.transition = h.clone(c)), c
}
function Zg(r = ' ', t = 0) {
  return Ot(So, null, r, t)
}
function Qo(r = '', t = !1) {
  return t ? (Gt(), oi(ve, null, r)) : Ot(ve, null, r)
}
function ze(r) {
  return r == null || typeof r == 'boolean'
    ? Ot(ve)
    : lt(r)
      ? Ot(ce, null, r.slice())
      : typeof r == 'object'
        ? Tr(r)
        : Ot(So, null, String(r))
}
function Tr(r) {
  return (r.el === null && r.patchFlag !== -1) || r.memo ? r : Fr(r)
}
function _l(r, t) {
  let e = 0
  const { shapeFlag: i } = r
  if (t == null) t = null
  else if (lt(t)) e = 16
  else if (typeof t == 'object')
    if (i & 65) {
      const s = t.default
      s && (s._c && (s._d = !1), _l(r, s()), s._c && (s._d = !0))
      return
    } else {
      e = 32
      const s = t._
      !s && !Vd(t)
        ? (t._ctx = ae)
        : s === 3 && ae && (ae.slots._ === 1 ? (t._ = 1) : ((t._ = 2), (r.patchFlag |= 1024)))
    }
  else
    ct(t)
      ? ((t = { default: t, _ctx: ae }), (e = 32))
      : ((t = String(t)), i & 64 ? ((e = 16), (t = [Zg(t)])) : (e = 8))
  ;(r.children = t), (r.shapeFlag |= e)
}
function Jg(...r) {
  const t = {}
  for (let e = 0; e < r.length; e++) {
    const i = r[e]
    for (const s in i)
      if (s === 'class') t.class !== i.class && (t.class = tl([t.class, i.class]))
      else if (s === 'style') t.style = Jh([t.style, i.style])
      else if (Kh(s)) {
        const n = t[s],
          o = i[s]
        o && n !== o && !(lt(n) && n.includes(o)) && (t[s] = n ? [].concat(n, o) : o)
      } else s !== '' && (t[s] = i[s])
  }
  return t
}
function ke(r, t, e, i = null) {
  De(r, t, 7, [e, i])
}
const t_ = kd()
let e_ = 0
function r_(r, t, e) {
  const i = r.type,
    s = (t ? t.appContext : r.appContext) || t_,
    n = {
      uid: e_++,
      vnode: r,
      type: i,
      parent: t,
      appContext: s,
      root: null,
      next: null,
      subTree: null,
      effect: null,
      update: null,
      scope: new nd(!0),
      render: null,
      proxy: null,
      exposed: null,
      exposeProxy: null,
      withProxy: null,
      provides: t ? t.provides : Object.create(s.provides),
      accessCache: null,
      renderCache: [],
      components: null,
      directives: null,
      propsOptions: jd(i, s),
      emitsOptions: Cd(i, s),
      emit: null,
      emitted: null,
      propsDefaults: wt,
      inheritAttrs: i.inheritAttrs,
      ctx: wt,
      data: wt,
      props: wt,
      attrs: wt,
      slots: wt,
      refs: wt,
      setupState: wt,
      setupContext: null,
      attrsProxy: null,
      slotsProxy: null,
      suspense: e,
      suspenseId: e ? e.pendingId : 0,
      asyncDep: null,
      asyncResolved: !1,
      isMounted: !1,
      isUnmounted: !1,
      isDeactivated: !1,
      bc: null,
      c: null,
      bm: null,
      m: null,
      bu: null,
      u: null,
      um: null,
      bum: null,
      da: null,
      a: null,
      rtg: null,
      rtc: null,
      ec: null,
      sp: null
    }
  return (
    (n.ctx = { _: n }), (n.root = t ? t.root : n), (n.emit = ng.bind(null, n)), r.ce && r.ce(n), n
  )
}
let ie = null
const Hs = () => ie || ae
let Yn, Qa
{
  const r = sd(),
    t = (e, i) => {
      let s
      return (
        (s = r[e]) || (s = r[e] = []),
        s.push(i),
        (n) => {
          s.length > 1 ? s.forEach((o) => o(n)) : s[0](n)
        }
      )
    }
  ;(Yn = t('__VUE_INSTANCE_SETTERS__', (e) => (ie = e))),
    (Qa = t('__VUE_SSR_SETTERS__', (e) => (Co = e)))
}
const Vs = (r) => {
    const t = ie
    return (
      Yn(r),
      r.scope.on(),
      () => {
        r.scope.off(), Yn(t)
      }
    )
  },
  cc = () => {
    ie && ie.scope.off(), Yn(null)
  }
function Zd(r) {
  return r.vnode.shapeFlag & 4
}
let Co = !1
function i_(r, t = !1) {
  t && Qa(t)
  const { props: e, children: i } = r.vnode,
    s = Zd(r)
  kg(r, e, s, t), Vg(r, i)
  const n = s ? s_(r, t) : void 0
  return t && Qa(!1), n
}
function s_(r, t) {
  const e = r.type
  ;(r.accessCache = Object.create(null)), (r.proxy = new Proxy(r.ctx, Mg))
  const { setup: i } = e
  if (i) {
    const s = (r.setupContext = i.length > 1 ? o_(r) : null),
      n = Vs(r)
    Nr()
    const o = Br(i, r, 0, [r.props, s])
    if ((Ur(), n(), rd(o))) {
      if ((o.then(cc, cc), t))
        return o
          .then((a) => {
            uc(r, a, t)
          })
          .catch((a) => {
            vo(a, r, 0)
          })
      r.asyncDep = o
    } else uc(r, o, t)
  } else Jd(r, t)
}
function uc(r, t, e) {
  ct(t)
    ? r.type.__ssrInlineRender
      ? (r.ssrRender = t)
      : (r.render = t)
    : Lt(t) && (r.setupState = xd(t)),
    Jd(r, e)
}
let dc
function Jd(r, t, e) {
  const i = r.type
  if (!r.render) {
    if (!t && dc && !i.render) {
      const s = i.template || pl(r).template
      if (s) {
        const { isCustomElement: n, compilerOptions: o } = r.appContext.config,
          { delimiters: a, compilerOptions: h } = i,
          l = te(te({ isCustomElement: n, delimiters: a }, o), h)
        i.render = dc(s, l)
      }
    }
    r.render = i.render || ue
  }
  {
    const s = Vs(r)
    Nr()
    try {
      Bg(r)
    } finally {
      Ur(), s()
    }
  }
}
const n_ = {
  get(r, t) {
    return me(r, 'get', ''), r[t]
  }
}
function o_(r) {
  const t = (e) => {
    r.exposed = e || {}
  }
  return { attrs: new Proxy(r.attrs, n_), slots: r.slots, emit: r.emit, expose: t }
}
function yl(r) {
  if (r.exposed)
    return (
      r.exposeProxy ||
      (r.exposeProxy = new Proxy(xd(Ym(r.exposed)), {
        get(t, e) {
          if (e in t) return t[e]
          if (e in vs) return vs[e](r)
        },
        has(t, e) {
          return e in t || e in vs
        }
      }))
    )
}
function a_(r) {
  return ct(r) && '__vccOpts' in r
}
const ir = (r, t) => Qm(r, t, Co)
function fc(r, t, e = wt) {
  const i = Hs(),
    s = tr(t),
    n = Gs(t),
    o = bd((h, l) => {
      let c
      return (
        mg(() => {
          const u = r[t]
          er(c, u) && ((c = u), l())
        }),
        {
          get() {
            return h(), e.get ? e.get(c) : c
          },
          set(u) {
            const d = i.vnode.props
            !(
              d &&
              (t in d || s in d || n in d) &&
              (`onUpdate:${t}` in d || `onUpdate:${s}` in d || `onUpdate:${n}` in d)
            ) &&
              er(u, c) &&
              ((c = u), l()),
              i.emit(`update:${t}`, e.set ? e.set(u) : u)
          }
        }
      )
    }),
    a = t === 'modelValue' ? 'modelModifiers' : `${t}Modifiers`
  return (
    (o[Symbol.iterator] = () => {
      let h = 0
      return {
        next() {
          return h < 2 ? { value: h++ ? r[a] || {} : o, done: !1 } : { done: !0 }
        }
      }
    }),
    o
  )
}
function h_(r, t, e) {
  const i = arguments.length
  return i === 2
    ? Lt(t) && !lt(t)
      ? zn(t)
        ? Ot(r, null, [t])
        : Ot(r, t)
      : Ot(r, null, t)
    : (i > 3 ? (e = Array.prototype.slice.call(arguments, 2)) : i === 3 && zn(e) && (e = [e]),
      Ot(r, t, e))
}
const l_ = '3.4.27',
  c_ = ue
function tf(r) {
  return (r = r ?? []), Array.isArray(r) ? r : [r]
}
const ef = (r) => Object.prototype.toString.call(r)
function u_() {}
const Al = (r) => typeof r == 'function',
  rf = (r) => ef(r) === '[object Object]',
  d_ = (r) => ef(r) === '[object Undefined]'
var pi = ((r) => (
    (r[(r.WEBGL_LEGACY = 0)] = 'WEBGL_LEGACY'),
    (r[(r.WEBGL = 1)] = 'WEBGL'),
    (r[(r.WEBGL2 = 2)] = 'WEBGL2'),
    r
  ))(pi || {}),
  sf = ((r) => (
    (r[(r.UNKNOWN = 0)] = 'UNKNOWN'),
    (r[(r.WEBGL = 1)] = 'WEBGL'),
    (r[(r.CANVAS = 2)] = 'CANVAS'),
    r
  ))(sf || {}),
  Ka = ((r) => (
    (r[(r.COLOR = 16384)] = 'COLOR'),
    (r[(r.DEPTH = 256)] = 'DEPTH'),
    (r[(r.STENCIL = 1024)] = 'STENCIL'),
    r
  ))(Ka || {}),
  st = ((r) => (
    (r[(r.NORMAL = 0)] = 'NORMAL'),
    (r[(r.ADD = 1)] = 'ADD'),
    (r[(r.MULTIPLY = 2)] = 'MULTIPLY'),
    (r[(r.SCREEN = 3)] = 'SCREEN'),
    (r[(r.OVERLAY = 4)] = 'OVERLAY'),
    (r[(r.DARKEN = 5)] = 'DARKEN'),
    (r[(r.LIGHTEN = 6)] = 'LIGHTEN'),
    (r[(r.COLOR_DODGE = 7)] = 'COLOR_DODGE'),
    (r[(r.COLOR_BURN = 8)] = 'COLOR_BURN'),
    (r[(r.HARD_LIGHT = 9)] = 'HARD_LIGHT'),
    (r[(r.SOFT_LIGHT = 10)] = 'SOFT_LIGHT'),
    (r[(r.DIFFERENCE = 11)] = 'DIFFERENCE'),
    (r[(r.EXCLUSION = 12)] = 'EXCLUSION'),
    (r[(r.HUE = 13)] = 'HUE'),
    (r[(r.SATURATION = 14)] = 'SATURATION'),
    (r[(r.COLOR = 15)] = 'COLOR'),
    (r[(r.LUMINOSITY = 16)] = 'LUMINOSITY'),
    (r[(r.NORMAL_NPM = 17)] = 'NORMAL_NPM'),
    (r[(r.ADD_NPM = 18)] = 'ADD_NPM'),
    (r[(r.SCREEN_NPM = 19)] = 'SCREEN_NPM'),
    (r[(r.NONE = 20)] = 'NONE'),
    (r[(r.SRC_OVER = 0)] = 'SRC_OVER'),
    (r[(r.SRC_IN = 21)] = 'SRC_IN'),
    (r[(r.SRC_OUT = 22)] = 'SRC_OUT'),
    (r[(r.SRC_ATOP = 23)] = 'SRC_ATOP'),
    (r[(r.DST_OVER = 24)] = 'DST_OVER'),
    (r[(r.DST_IN = 25)] = 'DST_IN'),
    (r[(r.DST_OUT = 26)] = 'DST_OUT'),
    (r[(r.DST_ATOP = 27)] = 'DST_ATOP'),
    (r[(r.ERASE = 26)] = 'ERASE'),
    (r[(r.SUBTRACT = 28)] = 'SUBTRACT'),
    (r[(r.XOR = 29)] = 'XOR'),
    r
  ))(st || {}),
  qe = ((r) => (
    (r[(r.POINTS = 0)] = 'POINTS'),
    (r[(r.LINES = 1)] = 'LINES'),
    (r[(r.LINE_LOOP = 2)] = 'LINE_LOOP'),
    (r[(r.LINE_STRIP = 3)] = 'LINE_STRIP'),
    (r[(r.TRIANGLES = 4)] = 'TRIANGLES'),
    (r[(r.TRIANGLE_STRIP = 5)] = 'TRIANGLE_STRIP'),
    (r[(r.TRIANGLE_FAN = 6)] = 'TRIANGLE_FAN'),
    r
  ))(qe || {}),
  D = ((r) => (
    (r[(r.RGBA = 6408)] = 'RGBA'),
    (r[(r.RGB = 6407)] = 'RGB'),
    (r[(r.RG = 33319)] = 'RG'),
    (r[(r.RED = 6403)] = 'RED'),
    (r[(r.RGBA_INTEGER = 36249)] = 'RGBA_INTEGER'),
    (r[(r.RGB_INTEGER = 36248)] = 'RGB_INTEGER'),
    (r[(r.RG_INTEGER = 33320)] = 'RG_INTEGER'),
    (r[(r.RED_INTEGER = 36244)] = 'RED_INTEGER'),
    (r[(r.ALPHA = 6406)] = 'ALPHA'),
    (r[(r.LUMINANCE = 6409)] = 'LUMINANCE'),
    (r[(r.LUMINANCE_ALPHA = 6410)] = 'LUMINANCE_ALPHA'),
    (r[(r.DEPTH_COMPONENT = 6402)] = 'DEPTH_COMPONENT'),
    (r[(r.DEPTH_STENCIL = 34041)] = 'DEPTH_STENCIL'),
    r
  ))(D || {}),
  Oi = ((r) => (
    (r[(r.TEXTURE_2D = 3553)] = 'TEXTURE_2D'),
    (r[(r.TEXTURE_CUBE_MAP = 34067)] = 'TEXTURE_CUBE_MAP'),
    (r[(r.TEXTURE_2D_ARRAY = 35866)] = 'TEXTURE_2D_ARRAY'),
    (r[(r.TEXTURE_CUBE_MAP_POSITIVE_X = 34069)] = 'TEXTURE_CUBE_MAP_POSITIVE_X'),
    (r[(r.TEXTURE_CUBE_MAP_NEGATIVE_X = 34070)] = 'TEXTURE_CUBE_MAP_NEGATIVE_X'),
    (r[(r.TEXTURE_CUBE_MAP_POSITIVE_Y = 34071)] = 'TEXTURE_CUBE_MAP_POSITIVE_Y'),
    (r[(r.TEXTURE_CUBE_MAP_NEGATIVE_Y = 34072)] = 'TEXTURE_CUBE_MAP_NEGATIVE_Y'),
    (r[(r.TEXTURE_CUBE_MAP_POSITIVE_Z = 34073)] = 'TEXTURE_CUBE_MAP_POSITIVE_Z'),
    (r[(r.TEXTURE_CUBE_MAP_NEGATIVE_Z = 34074)] = 'TEXTURE_CUBE_MAP_NEGATIVE_Z'),
    r
  ))(Oi || {}),
  tt = ((r) => (
    (r[(r.UNSIGNED_BYTE = 5121)] = 'UNSIGNED_BYTE'),
    (r[(r.UNSIGNED_SHORT = 5123)] = 'UNSIGNED_SHORT'),
    (r[(r.UNSIGNED_SHORT_5_6_5 = 33635)] = 'UNSIGNED_SHORT_5_6_5'),
    (r[(r.UNSIGNED_SHORT_4_4_4_4 = 32819)] = 'UNSIGNED_SHORT_4_4_4_4'),
    (r[(r.UNSIGNED_SHORT_5_5_5_1 = 32820)] = 'UNSIGNED_SHORT_5_5_5_1'),
    (r[(r.UNSIGNED_INT = 5125)] = 'UNSIGNED_INT'),
    (r[(r.UNSIGNED_INT_10F_11F_11F_REV = 35899)] = 'UNSIGNED_INT_10F_11F_11F_REV'),
    (r[(r.UNSIGNED_INT_2_10_10_10_REV = 33640)] = 'UNSIGNED_INT_2_10_10_10_REV'),
    (r[(r.UNSIGNED_INT_24_8 = 34042)] = 'UNSIGNED_INT_24_8'),
    (r[(r.UNSIGNED_INT_5_9_9_9_REV = 35902)] = 'UNSIGNED_INT_5_9_9_9_REV'),
    (r[(r.BYTE = 5120)] = 'BYTE'),
    (r[(r.SHORT = 5122)] = 'SHORT'),
    (r[(r.INT = 5124)] = 'INT'),
    (r[(r.FLOAT = 5126)] = 'FLOAT'),
    (r[(r.FLOAT_32_UNSIGNED_INT_24_8_REV = 36269)] = 'FLOAT_32_UNSIGNED_INT_24_8_REV'),
    (r[(r.HALF_FLOAT = 36193)] = 'HALF_FLOAT'),
    r
  ))(tt || {}),
  z = ((r) => (
    (r[(r.FLOAT = 0)] = 'FLOAT'), (r[(r.INT = 1)] = 'INT'), (r[(r.UINT = 2)] = 'UINT'), r
  ))(z || {}),
  Qt = ((r) => ((r[(r.NEAREST = 0)] = 'NEAREST'), (r[(r.LINEAR = 1)] = 'LINEAR'), r))(Qt || {}),
  fr = ((r) => (
    (r[(r.CLAMP = 33071)] = 'CLAMP'),
    (r[(r.REPEAT = 10497)] = 'REPEAT'),
    (r[(r.MIRRORED_REPEAT = 33648)] = 'MIRRORED_REPEAT'),
    r
  ))(fr || {}),
  sr = ((r) => (
    (r[(r.OFF = 0)] = 'OFF'),
    (r[(r.POW2 = 1)] = 'POW2'),
    (r[(r.ON = 2)] = 'ON'),
    (r[(r.ON_MANUAL = 3)] = 'ON_MANUAL'),
    r
  ))(sr || {}),
  de = ((r) => (
    (r[(r.NPM = 0)] = 'NPM'),
    (r[(r.UNPACK = 1)] = 'UNPACK'),
    (r[(r.PMA = 2)] = 'PMA'),
    (r[(r.NO_PREMULTIPLIED_ALPHA = 0)] = 'NO_PREMULTIPLIED_ALPHA'),
    (r[(r.PREMULTIPLY_ON_UPLOAD = 1)] = 'PREMULTIPLY_ON_UPLOAD'),
    (r[(r.PREMULTIPLIED_ALPHA = 2)] = 'PREMULTIPLIED_ALPHA'),
    r
  ))(de || {}),
  Ye = ((r) => (
    (r[(r.NO = 0)] = 'NO'),
    (r[(r.YES = 1)] = 'YES'),
    (r[(r.AUTO = 2)] = 'AUTO'),
    (r[(r.BLEND = 0)] = 'BLEND'),
    (r[(r.CLEAR = 1)] = 'CLEAR'),
    (r[(r.BLIT = 2)] = 'BLIT'),
    r
  ))(Ye || {}),
  vl = ((r) => ((r[(r.AUTO = 0)] = 'AUTO'), (r[(r.MANUAL = 1)] = 'MANUAL'), r))(vl || {}),
  Te = ((r) => ((r.LOW = 'lowp'), (r.MEDIUM = 'mediump'), (r.HIGH = 'highp'), r))(Te || {}),
  Wt = ((r) => (
    (r[(r.NONE = 0)] = 'NONE'),
    (r[(r.SCISSOR = 1)] = 'SCISSOR'),
    (r[(r.STENCIL = 2)] = 'STENCIL'),
    (r[(r.SPRITE = 3)] = 'SPRITE'),
    (r[(r.COLOR = 4)] = 'COLOR'),
    r
  ))(Wt || {}),
  Xt = ((r) => (
    (r[(r.NONE = 0)] = 'NONE'),
    (r[(r.LOW = 2)] = 'LOW'),
    (r[(r.MEDIUM = 4)] = 'MEDIUM'),
    (r[(r.HIGH = 8)] = 'HIGH'),
    r
  ))(Xt || {}),
  Ze = ((r) => (
    (r[(r.ELEMENT_ARRAY_BUFFER = 34963)] = 'ELEMENT_ARRAY_BUFFER'),
    (r[(r.ARRAY_BUFFER = 34962)] = 'ARRAY_BUFFER'),
    (r[(r.UNIFORM_BUFFER = 35345)] = 'UNIFORM_BUFFER'),
    r
  ))(Ze || {})
const f_ = {
    createCanvas: (r, t) => {
      const e = document.createElement('canvas')
      return (e.width = r), (e.height = t), e
    },
    getCanvasRenderingContext2D: () => CanvasRenderingContext2D,
    getWebGLRenderingContext: () => WebGLRenderingContext,
    getNavigator: () => navigator,
    getBaseUrl: () => document.baseURI ?? window.location.href,
    getFontFaceSet: () => document.fonts,
    fetch: (r, t) => fetch(r, t),
    parseXML: (r) => new DOMParser().parseFromString(r, 'text/xml')
  },
  Y = { ADAPTER: f_, RESOLUTION: 1, CREATE_IMAGE_BITMAP: !1, ROUND_PIXELS: !1 }
var Ko = /iPhone/i,
  pc = /iPod/i,
  mc = /iPad/i,
  gc = /\biOS-universal(?:.+)Mac\b/i,
  qo = /\bAndroid(?:.+)Mobile\b/i,
  _c = /Android/i,
  _i = /(?:SD4930UR|\bSilk(?:.+)Mobile\b)/i,
  sn = /Silk/i,
  ar = /Windows Phone/i,
  yc = /\bWindows(?:.+)ARM\b/i,
  Ac = /BlackBerry/i,
  vc = /BB10/i,
  xc = /Opera Mini/i,
  bc = /\b(CriOS|Chrome)(?:.+)Mobile/i,
  Ec = /Mobile(?:.+)Firefox\b/i,
  Tc = function (r) {
    return (
      typeof r < 'u' &&
      r.platform === 'MacIntel' &&
      typeof r.maxTouchPoints == 'number' &&
      r.maxTouchPoints > 1 &&
      typeof MSStream > 'u'
    )
  }
function p_(r) {
  return function (t) {
    return t.test(r)
  }
}
function wc(r) {
  var t = { userAgent: '', platform: '', maxTouchPoints: 0 }
  !r && typeof navigator < 'u'
    ? (t = {
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        maxTouchPoints: navigator.maxTouchPoints || 0
      })
    : typeof r == 'string'
      ? (t.userAgent = r)
      : r &&
        r.userAgent &&
        (t = {
          userAgent: r.userAgent,
          platform: r.platform,
          maxTouchPoints: r.maxTouchPoints || 0
        })
  var e = t.userAgent,
    i = e.split('[FBAN')
  typeof i[1] < 'u' && (e = i[0]), (i = e.split('Twitter')), typeof i[1] < 'u' && (e = i[0])
  var s = p_(e),
    n = {
      apple: {
        phone: s(Ko) && !s(ar),
        ipod: s(pc),
        tablet: !s(Ko) && (s(mc) || Tc(t)) && !s(ar),
        universal: s(gc),
        device: (s(Ko) || s(pc) || s(mc) || s(gc) || Tc(t)) && !s(ar)
      },
      amazon: { phone: s(_i), tablet: !s(_i) && s(sn), device: s(_i) || s(sn) },
      android: {
        phone: (!s(ar) && s(_i)) || (!s(ar) && s(qo)),
        tablet: !s(ar) && !s(_i) && !s(qo) && (s(sn) || s(_c)),
        device: (!s(ar) && (s(_i) || s(sn) || s(qo) || s(_c))) || s(/\bokhttp\b/i)
      },
      windows: { phone: s(ar), tablet: s(yc), device: s(ar) || s(yc) },
      other: {
        blackberry: s(Ac),
        blackberry10: s(vc),
        opera: s(xc),
        firefox: s(Ec),
        chrome: s(bc),
        device: s(Ac) || s(vc) || s(xc) || s(Ec) || s(bc)
      },
      any: !1,
      phone: !1,
      tablet: !1
    }
  return (
    (n.any = n.apple.device || n.android.device || n.windows.device || n.other.device),
    (n.phone = n.apple.phone || n.android.phone || n.windows.phone),
    (n.tablet = n.apple.tablet || n.android.tablet || n.windows.tablet),
    n
  )
}
const m_ = wc.default ?? wc,
  lr = m_(globalThis.navigator)
Y.RETINA_PREFIX = /@([0-9\.]+)x/
Y.FAIL_IF_MAJOR_PERFORMANCE_CAVEAT = !1
var Bn =
  typeof globalThis < 'u'
    ? globalThis
    : typeof window < 'u'
      ? window
      : typeof global < 'u'
        ? global
        : typeof self < 'u'
          ? self
          : {}
function nf(r) {
  return r && r.__esModule && Object.prototype.hasOwnProperty.call(r, 'default') ? r.default : r
}
function g_(r) {
  if (r.__esModule) return r
  var t = r.default
  if (typeof t == 'function') {
    var e = function i() {
      return this instanceof i
        ? Reflect.construct(t, arguments, this.constructor)
        : t.apply(this, arguments)
    }
    e.prototype = t.prototype
  } else e = {}
  return (
    Object.defineProperty(e, '__esModule', { value: !0 }),
    Object.keys(r).forEach(function (i) {
      var s = Object.getOwnPropertyDescriptor(r, i)
      Object.defineProperty(
        e,
        i,
        s.get
          ? s
          : {
              enumerable: !0,
              get: function () {
                return r[i]
              }
            }
      )
    }),
    e
  )
}
var of = { exports: {} }
;(function (r) {
  var t = Object.prototype.hasOwnProperty,
    e = '~'
  function i() {}
  Object.create && ((i.prototype = Object.create(null)), new i().__proto__ || (e = !1))
  function s(h, l, c) {
    ;(this.fn = h), (this.context = l), (this.once = c || !1)
  }
  function n(h, l, c, u, d) {
    if (typeof c != 'function') throw new TypeError('The listener must be a function')
    var f = new s(c, u || h, d),
      p = e ? e + l : l
    return (
      h._events[p]
        ? h._events[p].fn
          ? (h._events[p] = [h._events[p], f])
          : h._events[p].push(f)
        : ((h._events[p] = f), h._eventsCount++),
      h
    )
  }
  function o(h, l) {
    --h._eventsCount === 0 ? (h._events = new i()) : delete h._events[l]
  }
  function a() {
    ;(this._events = new i()), (this._eventsCount = 0)
  }
  ;(a.prototype.eventNames = function () {
    var l = [],
      c,
      u
    if (this._eventsCount === 0) return l
    for (u in (c = this._events)) t.call(c, u) && l.push(e ? u.slice(1) : u)
    return Object.getOwnPropertySymbols ? l.concat(Object.getOwnPropertySymbols(c)) : l
  }),
    (a.prototype.listeners = function (l) {
      var c = e ? e + l : l,
        u = this._events[c]
      if (!u) return []
      if (u.fn) return [u.fn]
      for (var d = 0, f = u.length, p = new Array(f); d < f; d++) p[d] = u[d].fn
      return p
    }),
    (a.prototype.listenerCount = function (l) {
      var c = e ? e + l : l,
        u = this._events[c]
      return u ? (u.fn ? 1 : u.length) : 0
    }),
    (a.prototype.emit = function (l, c, u, d, f, p) {
      var m = e ? e + l : l
      if (!this._events[m]) return !1
      var g = this._events[m],
        A = arguments.length,
        x,
        _
      if (g.fn) {
        switch ((g.once && this.removeListener(l, g.fn, void 0, !0), A)) {
          case 1:
            return g.fn.call(g.context), !0
          case 2:
            return g.fn.call(g.context, c), !0
          case 3:
            return g.fn.call(g.context, c, u), !0
          case 4:
            return g.fn.call(g.context, c, u, d), !0
          case 5:
            return g.fn.call(g.context, c, u, d, f), !0
          case 6:
            return g.fn.call(g.context, c, u, d, f, p), !0
        }
        for (_ = 1, x = new Array(A - 1); _ < A; _++) x[_ - 1] = arguments[_]
        g.fn.apply(g.context, x)
      } else {
        var v = g.length,
          S
        for (_ = 0; _ < v; _++)
          switch ((g[_].once && this.removeListener(l, g[_].fn, void 0, !0), A)) {
            case 1:
              g[_].fn.call(g[_].context)
              break
            case 2:
              g[_].fn.call(g[_].context, c)
              break
            case 3:
              g[_].fn.call(g[_].context, c, u)
              break
            case 4:
              g[_].fn.call(g[_].context, c, u, d)
              break
            default:
              if (!x) for (S = 1, x = new Array(A - 1); S < A; S++) x[S - 1] = arguments[S]
              g[_].fn.apply(g[_].context, x)
          }
      }
      return !0
    }),
    (a.prototype.on = function (l, c, u) {
      return n(this, l, c, u, !1)
    }),
    (a.prototype.once = function (l, c, u) {
      return n(this, l, c, u, !0)
    }),
    (a.prototype.removeListener = function (l, c, u, d) {
      var f = e ? e + l : l
      if (!this._events[f]) return this
      if (!c) return o(this, f), this
      var p = this._events[f]
      if (p.fn) p.fn === c && (!d || p.once) && (!u || p.context === u) && o(this, f)
      else {
        for (var m = 0, g = [], A = p.length; m < A; m++)
          (p[m].fn !== c || (d && !p[m].once) || (u && p[m].context !== u)) && g.push(p[m])
        g.length ? (this._events[f] = g.length === 1 ? g[0] : g) : o(this, f)
      }
      return this
    }),
    (a.prototype.removeAllListeners = function (l) {
      var c
      return (
        l
          ? ((c = e ? e + l : l), this._events[c] && o(this, c))
          : ((this._events = new i()), (this._eventsCount = 0)),
        this
      )
    }),
    (a.prototype.off = a.prototype.removeListener),
    (a.prototype.addListener = a.prototype.on),
    (a.prefixed = e),
    (a.EventEmitter = a),
    (r.exports = a)
})(of)
var __ = of.exports
const Xs = nf(__)
var xl = { exports: {} }
xl.exports = Io
xl.exports.default = Io
function Io(r, t, e) {
  e = e || 2
  var i = t && t.length,
    s = i ? t[0] * e : r.length,
    n = af(r, 0, s, e, !0),
    o = []
  if (!n || n.next === n.prev) return o
  var a, h, l, c, u, d, f
  if ((i && (n = b_(r, t, n, e)), r.length > 80 * e)) {
    ;(a = l = r[0]), (h = c = r[1])
    for (var p = e; p < s; p += e)
      (u = r[p]),
        (d = r[p + 1]),
        u < a && (a = u),
        d < h && (h = d),
        u > l && (l = u),
        d > c && (c = d)
    ;(f = Math.max(l - a, c - h)), (f = f !== 0 ? 32767 / f : 0)
  }
  return Fs(n, o, e, a, h, f, 0), o
}
function af(r, t, e, i, s) {
  var n, o
  if (s === Ja(r, t, e, i) > 0) for (n = t; n < e; n += i) o = Sc(n, r[n], r[n + 1], o)
  else for (n = e - i; n >= t; n -= i) o = Sc(n, r[n], r[n + 1], o)
  return o && Ro(o, o.next) && (Os(o), (o = o.next)), o
}
function ui(r, t) {
  if (!r) return r
  t || (t = r)
  var e = r,
    i
  do
    if (((i = !1), !e.steiner && (Ro(e, e.next) || Ft(e.prev, e, e.next) === 0))) {
      if ((Os(e), (e = t = e.prev), e === e.next)) break
      i = !0
    } else e = e.next
  while (i || e !== t)
  return t
}
function Fs(r, t, e, i, s, n, o) {
  if (r) {
    !o && n && C_(r, i, s, n)
    for (var a = r, h, l; r.prev !== r.next; ) {
      if (((h = r.prev), (l = r.next), n ? A_(r, i, s, n) : y_(r))) {
        t.push((h.i / e) | 0),
          t.push((r.i / e) | 0),
          t.push((l.i / e) | 0),
          Os(r),
          (r = l.next),
          (a = l.next)
        continue
      }
      if (((r = l), r === a)) {
        o
          ? o === 1
            ? ((r = v_(ui(r), t, e)), Fs(r, t, e, i, s, n, 2))
            : o === 2 && x_(r, t, e, i, s, n)
          : Fs(ui(r), t, e, i, s, n, 1)
        break
      }
    }
  }
}
function y_(r) {
  var t = r.prev,
    e = r,
    i = r.next
  if (Ft(t, e, i) >= 0) return !1
  for (
    var s = t.x,
      n = e.x,
      o = i.x,
      a = t.y,
      h = e.y,
      l = i.y,
      c = s < n ? (s < o ? s : o) : n < o ? n : o,
      u = a < h ? (a < l ? a : l) : h < l ? h : l,
      d = s > n ? (s > o ? s : o) : n > o ? n : o,
      f = a > h ? (a > l ? a : l) : h > l ? h : l,
      p = i.next;
    p !== t;

  ) {
    if (
      p.x >= c &&
      p.x <= d &&
      p.y >= u &&
      p.y <= f &&
      Mi(s, a, n, h, o, l, p.x, p.y) &&
      Ft(p.prev, p, p.next) >= 0
    )
      return !1
    p = p.next
  }
  return !0
}
function A_(r, t, e, i) {
  var s = r.prev,
    n = r,
    o = r.next
  if (Ft(s, n, o) >= 0) return !1
  for (
    var a = s.x,
      h = n.x,
      l = o.x,
      c = s.y,
      u = n.y,
      d = o.y,
      f = a < h ? (a < l ? a : l) : h < l ? h : l,
      p = c < u ? (c < d ? c : d) : u < d ? u : d,
      m = a > h ? (a > l ? a : l) : h > l ? h : l,
      g = c > u ? (c > d ? c : d) : u > d ? u : d,
      A = qa(f, p, t, e, i),
      x = qa(m, g, t, e, i),
      _ = r.prevZ,
      v = r.nextZ;
    _ && _.z >= A && v && v.z <= x;

  ) {
    if (
      (_.x >= f &&
        _.x <= m &&
        _.y >= p &&
        _.y <= g &&
        _ !== s &&
        _ !== o &&
        Mi(a, c, h, u, l, d, _.x, _.y) &&
        Ft(_.prev, _, _.next) >= 0) ||
      ((_ = _.prevZ),
      v.x >= f &&
        v.x <= m &&
        v.y >= p &&
        v.y <= g &&
        v !== s &&
        v !== o &&
        Mi(a, c, h, u, l, d, v.x, v.y) &&
        Ft(v.prev, v, v.next) >= 0)
    )
      return !1
    v = v.nextZ
  }
  for (; _ && _.z >= A; ) {
    if (
      _.x >= f &&
      _.x <= m &&
      _.y >= p &&
      _.y <= g &&
      _ !== s &&
      _ !== o &&
      Mi(a, c, h, u, l, d, _.x, _.y) &&
      Ft(_.prev, _, _.next) >= 0
    )
      return !1
    _ = _.prevZ
  }
  for (; v && v.z <= x; ) {
    if (
      v.x >= f &&
      v.x <= m &&
      v.y >= p &&
      v.y <= g &&
      v !== s &&
      v !== o &&
      Mi(a, c, h, u, l, d, v.x, v.y) &&
      Ft(v.prev, v, v.next) >= 0
    )
      return !1
    v = v.nextZ
  }
  return !0
}
function v_(r, t, e) {
  var i = r
  do {
    var s = i.prev,
      n = i.next.next
    !Ro(s, n) &&
      hf(s, i, i.next, n) &&
      Ds(s, n) &&
      Ds(n, s) &&
      (t.push((s.i / e) | 0),
      t.push((i.i / e) | 0),
      t.push((n.i / e) | 0),
      Os(i),
      Os(i.next),
      (i = r = n)),
      (i = i.next)
  } while (i !== r)
  return ui(i)
}
function x_(r, t, e, i, s, n) {
  var o = r
  do {
    for (var a = o.next.next; a !== o.prev; ) {
      if (o.i !== a.i && P_(o, a)) {
        var h = lf(o, a)
        ;(o = ui(o, o.next)), (h = ui(h, h.next)), Fs(o, t, e, i, s, n, 0), Fs(h, t, e, i, s, n, 0)
        return
      }
      a = a.next
    }
    o = o.next
  } while (o !== r)
}
function b_(r, t, e, i) {
  var s = [],
    n,
    o,
    a,
    h,
    l
  for (n = 0, o = t.length; n < o; n++)
    (a = t[n] * i),
      (h = n < o - 1 ? t[n + 1] * i : r.length),
      (l = af(r, a, h, i, !1)),
      l === l.next && (l.steiner = !0),
      s.push(R_(l))
  for (s.sort(E_), n = 0; n < s.length; n++) e = T_(s[n], e)
  return e
}
function E_(r, t) {
  return r.x - t.x
}
function T_(r, t) {
  var e = w_(r, t)
  if (!e) return t
  var i = lf(e, r)
  return ui(i, i.next), ui(e, e.next)
}
function w_(r, t) {
  var e = t,
    i = r.x,
    s = r.y,
    n = -1 / 0,
    o
  do {
    if (s <= e.y && s >= e.next.y && e.next.y !== e.y) {
      var a = e.x + ((s - e.y) * (e.next.x - e.x)) / (e.next.y - e.y)
      if (a <= i && a > n && ((n = a), (o = e.x < e.next.x ? e : e.next), a === i)) return o
    }
    e = e.next
  } while (e !== t)
  if (!o) return null
  var h = o,
    l = o.x,
    c = o.y,
    u = 1 / 0,
    d
  e = o
  do
    i >= e.x &&
      e.x >= l &&
      i !== e.x &&
      Mi(s < c ? i : n, s, l, c, s < c ? n : i, s, e.x, e.y) &&
      ((d = Math.abs(s - e.y) / (i - e.x)),
      Ds(e, r) &&
        (d < u || (d === u && (e.x > o.x || (e.x === o.x && S_(o, e))))) &&
        ((o = e), (u = d))),
      (e = e.next)
  while (e !== h)
  return o
}
function S_(r, t) {
  return Ft(r.prev, r, t.prev) < 0 && Ft(t.next, r, r.next) < 0
}
function C_(r, t, e, i) {
  var s = r
  do
    s.z === 0 && (s.z = qa(s.x, s.y, t, e, i)), (s.prevZ = s.prev), (s.nextZ = s.next), (s = s.next)
  while (s !== r)
  ;(s.prevZ.nextZ = null), (s.prevZ = null), I_(s)
}
function I_(r) {
  var t,
    e,
    i,
    s,
    n,
    o,
    a,
    h,
    l = 1
  do {
    for (e = r, r = null, n = null, o = 0; e; ) {
      for (o++, i = e, a = 0, t = 0; t < l && (a++, (i = i.nextZ), !!i); t++);
      for (h = l; a > 0 || (h > 0 && i); )
        a !== 0 && (h === 0 || !i || e.z <= i.z)
          ? ((s = e), (e = e.nextZ), a--)
          : ((s = i), (i = i.nextZ), h--),
          n ? (n.nextZ = s) : (r = s),
          (s.prevZ = n),
          (n = s)
      e = i
    }
    ;(n.nextZ = null), (l *= 2)
  } while (o > 1)
  return r
}
function qa(r, t, e, i, s) {
  return (
    (r = ((r - e) * s) | 0),
    (t = ((t - i) * s) | 0),
    (r = (r | (r << 8)) & 16711935),
    (r = (r | (r << 4)) & 252645135),
    (r = (r | (r << 2)) & 858993459),
    (r = (r | (r << 1)) & 1431655765),
    (t = (t | (t << 8)) & 16711935),
    (t = (t | (t << 4)) & 252645135),
    (t = (t | (t << 2)) & 858993459),
    (t = (t | (t << 1)) & 1431655765),
    r | (t << 1)
  )
}
function R_(r) {
  var t = r,
    e = r
  do (t.x < e.x || (t.x === e.x && t.y < e.y)) && (e = t), (t = t.next)
  while (t !== r)
  return e
}
function Mi(r, t, e, i, s, n, o, a) {
  return (
    (s - o) * (t - a) >= (r - o) * (n - a) &&
    (r - o) * (i - a) >= (e - o) * (t - a) &&
    (e - o) * (n - a) >= (s - o) * (i - a)
  )
}
function P_(r, t) {
  return (
    r.next.i !== t.i &&
    r.prev.i !== t.i &&
    !M_(r, t) &&
    ((Ds(r, t) && Ds(t, r) && B_(r, t) && (Ft(r.prev, r, t.prev) || Ft(r, t.prev, t))) ||
      (Ro(r, t) && Ft(r.prev, r, r.next) > 0 && Ft(t.prev, t, t.next) > 0))
  )
}
function Ft(r, t, e) {
  return (t.y - r.y) * (e.x - t.x) - (t.x - r.x) * (e.y - t.y)
}
function Ro(r, t) {
  return r.x === t.x && r.y === t.y
}
function hf(r, t, e, i) {
  var s = on(Ft(r, t, e)),
    n = on(Ft(r, t, i)),
    o = on(Ft(e, i, r)),
    a = on(Ft(e, i, t))
  return !!(
    (s !== n && o !== a) ||
    (s === 0 && nn(r, e, t)) ||
    (n === 0 && nn(r, i, t)) ||
    (o === 0 && nn(e, r, i)) ||
    (a === 0 && nn(e, t, i))
  )
}
function nn(r, t, e) {
  return (
    t.x <= Math.max(r.x, e.x) &&
    t.x >= Math.min(r.x, e.x) &&
    t.y <= Math.max(r.y, e.y) &&
    t.y >= Math.min(r.y, e.y)
  )
}
function on(r) {
  return r > 0 ? 1 : r < 0 ? -1 : 0
}
function M_(r, t) {
  var e = r
  do {
    if (e.i !== r.i && e.next.i !== r.i && e.i !== t.i && e.next.i !== t.i && hf(e, e.next, r, t))
      return !0
    e = e.next
  } while (e !== r)
  return !1
}
function Ds(r, t) {
  return Ft(r.prev, r, r.next) < 0
    ? Ft(r, t, r.next) >= 0 && Ft(r, r.prev, t) >= 0
    : Ft(r, t, r.prev) < 0 || Ft(r, r.next, t) < 0
}
function B_(r, t) {
  var e = r,
    i = !1,
    s = (r.x + t.x) / 2,
    n = (r.y + t.y) / 2
  do
    e.y > n != e.next.y > n &&
      e.next.y !== e.y &&
      s < ((e.next.x - e.x) * (n - e.y)) / (e.next.y - e.y) + e.x &&
      (i = !i),
      (e = e.next)
  while (e !== r)
  return i
}
function lf(r, t) {
  var e = new Za(r.i, r.x, r.y),
    i = new Za(t.i, t.x, t.y),
    s = r.next,
    n = t.prev
  return (
    (r.next = t),
    (t.prev = r),
    (e.next = s),
    (s.prev = e),
    (i.next = e),
    (e.prev = i),
    (n.next = i),
    (i.prev = n),
    i
  )
}
function Sc(r, t, e, i) {
  var s = new Za(r, t, e)
  return (
    i
      ? ((s.next = i.next), (s.prev = i), (i.next.prev = s), (i.next = s))
      : ((s.prev = s), (s.next = s)),
    s
  )
}
function Os(r) {
  ;(r.next.prev = r.prev),
    (r.prev.next = r.next),
    r.prevZ && (r.prevZ.nextZ = r.nextZ),
    r.nextZ && (r.nextZ.prevZ = r.prevZ)
}
function Za(r, t, e) {
  ;(this.i = r),
    (this.x = t),
    (this.y = e),
    (this.prev = null),
    (this.next = null),
    (this.z = 0),
    (this.prevZ = null),
    (this.nextZ = null),
    (this.steiner = !1)
}
Io.deviation = function (r, t, e, i) {
  var s = t && t.length,
    n = s ? t[0] * e : r.length,
    o = Math.abs(Ja(r, 0, n, e))
  if (s)
    for (var a = 0, h = t.length; a < h; a++) {
      var l = t[a] * e,
        c = a < h - 1 ? t[a + 1] * e : r.length
      o -= Math.abs(Ja(r, l, c, e))
    }
  var u = 0
  for (a = 0; a < i.length; a += 3) {
    var d = i[a] * e,
      f = i[a + 1] * e,
      p = i[a + 2] * e
    u += Math.abs((r[d] - r[p]) * (r[f + 1] - r[d + 1]) - (r[d] - r[f]) * (r[p + 1] - r[d + 1]))
  }
  return o === 0 && u === 0 ? 0 : Math.abs((u - o) / o)
}
function Ja(r, t, e, i) {
  for (var s = 0, n = t, o = e - i; n < e; n += i)
    (s += (r[o] - r[n]) * (r[n + 1] + r[o + 1])), (o = n)
  return s
}
Io.flatten = function (r) {
  for (
    var t = r[0][0].length, e = { vertices: [], holes: [], dimensions: t }, i = 0, s = 0;
    s < r.length;
    s++
  ) {
    for (var n = 0; n < r[s].length; n++) for (var o = 0; o < t; o++) e.vertices.push(r[s][n][o])
    s > 0 && ((i += r[s - 1].length), e.holes.push(i))
  }
  return e
}
var F_ = xl.exports
const D_ = nf(F_)
var Qn = { exports: {} }
/*! https://mths.be/punycode v1.4.1 by @mathias */ Qn.exports
;(function (r, t) {
  ;(function (e) {
    var i = t && !t.nodeType && t,
      s = r && !r.nodeType && r,
      n = typeof Bn == 'object' && Bn
    ;(n.global === n || n.window === n || n.self === n) && (e = n)
    var o,
      a = 2147483647,
      h = 36,
      l = 1,
      c = 26,
      u = 38,
      d = 700,
      f = 72,
      p = 128,
      m = '-',
      g = /^xn--/,
      A = /[^\x20-\x7E]/,
      x = /[\x2E\u3002\uFF0E\uFF61]/g,
      _ = {
        overflow: 'Overflow: input needs wider integers to process',
        'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
        'invalid-input': 'Invalid input'
      },
      v = h - l,
      S = Math.floor,
      C = String.fromCharCode,
      I
    function T(N) {
      throw new RangeError(_[N])
    }
    function F(N, U) {
      for (var ot = N.length, _t = []; ot--; ) _t[ot] = U(N[ot])
      return _t
    }
    function k(N, U) {
      var ot = N.split('@'),
        _t = ''
      ot.length > 1 && ((_t = ot[0] + '@'), (N = ot[1])), (N = N.replace(x, '.'))
      var vt = N.split('.'),
        Ht = F(vt, U).join('.')
      return _t + Ht
    }
    function rt(N) {
      for (var U = [], ot = 0, _t = N.length, vt, Ht; ot < _t; )
        (vt = N.charCodeAt(ot++)),
          vt >= 55296 && vt <= 56319 && ot < _t
            ? ((Ht = N.charCodeAt(ot++)),
              (Ht & 64512) == 56320
                ? U.push(((vt & 1023) << 10) + (Ht & 1023) + 65536)
                : (U.push(vt), ot--))
            : U.push(vt)
      return U
    }
    function G(N) {
      return F(N, function (U) {
        var ot = ''
        return (
          U > 65535 &&
            ((U -= 65536), (ot += C(((U >>> 10) & 1023) | 55296)), (U = 56320 | (U & 1023))),
          (ot += C(U)),
          ot
        )
      }).join('')
    }
    function E(N) {
      return N - 48 < 10 ? N - 22 : N - 65 < 26 ? N - 65 : N - 97 < 26 ? N - 97 : h
    }
    function M(N, U) {
      return N + 22 + 75 * (N < 26) - ((U != 0) << 5)
    }
    function K(N, U, ot) {
      var _t = 0
      for (N = ot ? S(N / d) : N >> 1, N += S(N / U); N > (v * c) >> 1; _t += h) N = S(N / v)
      return S(_t + ((v + 1) * N) / (N + u))
    }
    function Z(N) {
      var U = [],
        ot = N.length,
        _t,
        vt = 0,
        Ht = p,
        At = f,
        Mt,
        Vt,
        ee,
        It,
        xt,
        Rt,
        y,
        b,
        w
      for (Mt = N.lastIndexOf(m), Mt < 0 && (Mt = 0), Vt = 0; Vt < Mt; ++Vt)
        N.charCodeAt(Vt) >= 128 && T('not-basic'), U.push(N.charCodeAt(Vt))
      for (ee = Mt > 0 ? Mt + 1 : 0; ee < ot; ) {
        for (
          It = vt, xt = 1, Rt = h;
          ee >= ot && T('invalid-input'),
            (y = E(N.charCodeAt(ee++))),
            (y >= h || y > S((a - vt) / xt)) && T('overflow'),
            (vt += y * xt),
            (b = Rt <= At ? l : Rt >= At + c ? c : Rt - At),
            !(y < b);
          Rt += h
        )
          (w = h - b), xt > S(a / w) && T('overflow'), (xt *= w)
        ;(_t = U.length + 1),
          (At = K(vt - It, _t, It == 0)),
          S(vt / _t) > a - Ht && T('overflow'),
          (Ht += S(vt / _t)),
          (vt %= _t),
          U.splice(vt++, 0, Ht)
      }
      return G(U)
    }
    function H(N) {
      var U,
        ot,
        _t,
        vt,
        Ht,
        At,
        Mt,
        Vt,
        ee,
        It,
        xt,
        Rt = [],
        y,
        b,
        w,
        R
      for (N = rt(N), y = N.length, U = p, ot = 0, Ht = f, At = 0; At < y; ++At)
        (xt = N[At]), xt < 128 && Rt.push(C(xt))
      for (_t = vt = Rt.length, vt && Rt.push(m); _t < y; ) {
        for (Mt = a, At = 0; At < y; ++At) (xt = N[At]), xt >= U && xt < Mt && (Mt = xt)
        for (
          b = _t + 1, Mt - U > S((a - ot) / b) && T('overflow'), ot += (Mt - U) * b, U = Mt, At = 0;
          At < y;
          ++At
        )
          if (((xt = N[At]), xt < U && ++ot > a && T('overflow'), xt == U)) {
            for (
              Vt = ot, ee = h;
              (It = ee <= Ht ? l : ee >= Ht + c ? c : ee - Ht), !(Vt < It);
              ee += h
            )
              (R = Vt - It), (w = h - It), Rt.push(C(M(It + (R % w), 0))), (Vt = S(R / w))
            Rt.push(C(M(Vt, 0))), (Ht = K(ot, b, _t == vt)), (ot = 0), ++_t
          }
        ++ot, ++U
      }
      return Rt.join('')
    }
    function W(N) {
      return k(N, function (U) {
        return g.test(U) ? Z(U.slice(4).toLowerCase()) : U
      })
    }
    function gt(N) {
      return k(N, function (U) {
        return A.test(U) ? 'xn--' + H(U) : U
      })
    }
    if (
      ((o = {
        version: '1.4.1',
        ucs2: { decode: rt, encode: G },
        decode: Z,
        encode: H,
        toASCII: gt,
        toUnicode: W
      }),
      i && s)
    )
      if (r.exports == i) s.exports = o
      else for (I in o) o.hasOwnProperty(I) && (i[I] = o[I])
    else e.punycode = o
  })(Bn)
})(Qn, Qn.exports)
var O_ = Qn.exports,
  L_ = Error,
  N_ = EvalError,
  U_ = RangeError,
  k_ = ReferenceError,
  cf = SyntaxError,
  js = TypeError,
  G_ = URIError,
  H_ = function () {
    if (typeof Symbol != 'function' || typeof Object.getOwnPropertySymbols != 'function') return !1
    if (typeof Symbol.iterator == 'symbol') return !0
    var t = {},
      e = Symbol('test'),
      i = Object(e)
    if (
      typeof e == 'string' ||
      Object.prototype.toString.call(e) !== '[object Symbol]' ||
      Object.prototype.toString.call(i) !== '[object Symbol]'
    )
      return !1
    var s = 42
    t[e] = s
    for (e in t) return !1
    if (
      (typeof Object.keys == 'function' && Object.keys(t).length !== 0) ||
      (typeof Object.getOwnPropertyNames == 'function' &&
        Object.getOwnPropertyNames(t).length !== 0)
    )
      return !1
    var n = Object.getOwnPropertySymbols(t)
    if (n.length !== 1 || n[0] !== e || !Object.prototype.propertyIsEnumerable.call(t, e)) return !1
    if (typeof Object.getOwnPropertyDescriptor == 'function') {
      var o = Object.getOwnPropertyDescriptor(t, e)
      if (o.value !== s || o.enumerable !== !0) return !1
    }
    return !0
  },
  Cc = typeof Symbol < 'u' && Symbol,
  V_ = H_,
  X_ = function () {
    return typeof Cc != 'function' ||
      typeof Symbol != 'function' ||
      typeof Cc('foo') != 'symbol' ||
      typeof Symbol('bar') != 'symbol'
      ? !1
      : V_()
  },
  Zo = { __proto__: null, foo: {} },
  j_ = Object,
  W_ = function () {
    return { __proto__: Zo }.foo === Zo.foo && !(Zo instanceof j_)
  },
  $_ = 'Function.prototype.bind called on incompatible ',
  z_ = Object.prototype.toString,
  Y_ = Math.max,
  Q_ = '[object Function]',
  Ic = function (t, e) {
    for (var i = [], s = 0; s < t.length; s += 1) i[s] = t[s]
    for (var n = 0; n < e.length; n += 1) i[n + t.length] = e[n]
    return i
  },
  K_ = function (t, e) {
    for (var i = [], s = e || 0, n = 0; s < t.length; s += 1, n += 1) i[n] = t[s]
    return i
  },
  q_ = function (r, t) {
    for (var e = '', i = 0; i < r.length; i += 1) (e += r[i]), i + 1 < r.length && (e += t)
    return e
  },
  Z_ = function (t) {
    var e = this
    if (typeof e != 'function' || z_.apply(e) !== Q_) throw new TypeError($_ + e)
    for (
      var i = K_(arguments, 1),
        s,
        n = function () {
          if (this instanceof s) {
            var c = e.apply(this, Ic(i, arguments))
            return Object(c) === c ? c : this
          }
          return e.apply(t, Ic(i, arguments))
        },
        o = Y_(0, e.length - i.length),
        a = [],
        h = 0;
      h < o;
      h++
    )
      a[h] = '$' + h
    if (
      ((s = Function(
        'binder',
        'return function (' + q_(a, ',') + '){ return binder.apply(this,arguments); }'
      )(n)),
      e.prototype)
    ) {
      var l = function () {}
      ;(l.prototype = e.prototype), (s.prototype = new l()), (l.prototype = null)
    }
    return s
  },
  J_ = Z_,
  bl = Function.prototype.bind || J_,
  ty = Function.prototype.call,
  ey = Object.prototype.hasOwnProperty,
  ry = bl,
  iy = ry.call(ty, ey),
  ft,
  sy = L_,
  ny = N_,
  oy = U_,
  ay = k_,
  ji = cf,
  Li = js,
  hy = G_,
  uf = Function,
  Jo = function (r) {
    try {
      return uf('"use strict"; return (' + r + ').constructor;')()
    } catch {}
  },
  ai = Object.getOwnPropertyDescriptor
if (ai)
  try {
    ai({}, '')
  } catch {
    ai = null
  }
var ta = function () {
    throw new Li()
  },
  ly = ai
    ? (function () {
        try {
          return arguments.callee, ta
        } catch {
          try {
            return ai(arguments, 'callee').get
          } catch {
            return ta
          }
        }
      })()
    : ta,
  yi = X_(),
  cy = W_(),
  zt =
    Object.getPrototypeOf ||
    (cy
      ? function (r) {
          return r.__proto__
        }
      : null),
  bi = {},
  uy = typeof Uint8Array > 'u' || !zt ? ft : zt(Uint8Array),
  hi = {
    __proto__: null,
    '%AggregateError%': typeof AggregateError > 'u' ? ft : AggregateError,
    '%Array%': Array,
    '%ArrayBuffer%': typeof ArrayBuffer > 'u' ? ft : ArrayBuffer,
    '%ArrayIteratorPrototype%': yi && zt ? zt([][Symbol.iterator]()) : ft,
    '%AsyncFromSyncIteratorPrototype%': ft,
    '%AsyncFunction%': bi,
    '%AsyncGenerator%': bi,
    '%AsyncGeneratorFunction%': bi,
    '%AsyncIteratorPrototype%': bi,
    '%Atomics%': typeof Atomics > 'u' ? ft : Atomics,
    '%BigInt%': typeof BigInt > 'u' ? ft : BigInt,
    '%BigInt64Array%': typeof BigInt64Array > 'u' ? ft : BigInt64Array,
    '%BigUint64Array%': typeof BigUint64Array > 'u' ? ft : BigUint64Array,
    '%Boolean%': Boolean,
    '%DataView%': typeof DataView > 'u' ? ft : DataView,
    '%Date%': Date,
    '%decodeURI%': decodeURI,
    '%decodeURIComponent%': decodeURIComponent,
    '%encodeURI%': encodeURI,
    '%encodeURIComponent%': encodeURIComponent,
    '%Error%': sy,
    '%eval%': eval,
    '%EvalError%': ny,
    '%Float32Array%': typeof Float32Array > 'u' ? ft : Float32Array,
    '%Float64Array%': typeof Float64Array > 'u' ? ft : Float64Array,
    '%FinalizationRegistry%': typeof FinalizationRegistry > 'u' ? ft : FinalizationRegistry,
    '%Function%': uf,
    '%GeneratorFunction%': bi,
    '%Int8Array%': typeof Int8Array > 'u' ? ft : Int8Array,
    '%Int16Array%': typeof Int16Array > 'u' ? ft : Int16Array,
    '%Int32Array%': typeof Int32Array > 'u' ? ft : Int32Array,
    '%isFinite%': isFinite,
    '%isNaN%': isNaN,
    '%IteratorPrototype%': yi && zt ? zt(zt([][Symbol.iterator]())) : ft,
    '%JSON%': typeof JSON == 'object' ? JSON : ft,
    '%Map%': typeof Map > 'u' ? ft : Map,
    '%MapIteratorPrototype%':
      typeof Map > 'u' || !yi || !zt ? ft : zt(new Map()[Symbol.iterator]()),
    '%Math%': Math,
    '%Number%': Number,
    '%Object%': Object,
    '%parseFloat%': parseFloat,
    '%parseInt%': parseInt,
    '%Promise%': typeof Promise > 'u' ? ft : Promise,
    '%Proxy%': typeof Proxy > 'u' ? ft : Proxy,
    '%RangeError%': oy,
    '%ReferenceError%': ay,
    '%Reflect%': typeof Reflect > 'u' ? ft : Reflect,
    '%RegExp%': RegExp,
    '%Set%': typeof Set > 'u' ? ft : Set,
    '%SetIteratorPrototype%':
      typeof Set > 'u' || !yi || !zt ? ft : zt(new Set()[Symbol.iterator]()),
    '%SharedArrayBuffer%': typeof SharedArrayBuffer > 'u' ? ft : SharedArrayBuffer,
    '%String%': String,
    '%StringIteratorPrototype%': yi && zt ? zt(''[Symbol.iterator]()) : ft,
    '%Symbol%': yi ? Symbol : ft,
    '%SyntaxError%': ji,
    '%ThrowTypeError%': ly,
    '%TypedArray%': uy,
    '%TypeError%': Li,
    '%Uint8Array%': typeof Uint8Array > 'u' ? ft : Uint8Array,
    '%Uint8ClampedArray%': typeof Uint8ClampedArray > 'u' ? ft : Uint8ClampedArray,
    '%Uint16Array%': typeof Uint16Array > 'u' ? ft : Uint16Array,
    '%Uint32Array%': typeof Uint32Array > 'u' ? ft : Uint32Array,
    '%URIError%': hy,
    '%WeakMap%': typeof WeakMap > 'u' ? ft : WeakMap,
    '%WeakRef%': typeof WeakRef > 'u' ? ft : WeakRef,
    '%WeakSet%': typeof WeakSet > 'u' ? ft : WeakSet
  }
if (zt)
  try {
    null.error
  } catch (r) {
    var dy = zt(zt(r))
    hi['%Error.prototype%'] = dy
  }
var fy = function r(t) {
    var e
    if (t === '%AsyncFunction%') e = Jo('async function () {}')
    else if (t === '%GeneratorFunction%') e = Jo('function* () {}')
    else if (t === '%AsyncGeneratorFunction%') e = Jo('async function* () {}')
    else if (t === '%AsyncGenerator%') {
      var i = r('%AsyncGeneratorFunction%')
      i && (e = i.prototype)
    } else if (t === '%AsyncIteratorPrototype%') {
      var s = r('%AsyncGenerator%')
      s && zt && (e = zt(s.prototype))
    }
    return (hi[t] = e), e
  },
  Rc = {
    __proto__: null,
    '%ArrayBufferPrototype%': ['ArrayBuffer', 'prototype'],
    '%ArrayPrototype%': ['Array', 'prototype'],
    '%ArrayProto_entries%': ['Array', 'prototype', 'entries'],
    '%ArrayProto_forEach%': ['Array', 'prototype', 'forEach'],
    '%ArrayProto_keys%': ['Array', 'prototype', 'keys'],
    '%ArrayProto_values%': ['Array', 'prototype', 'values'],
    '%AsyncFunctionPrototype%': ['AsyncFunction', 'prototype'],
    '%AsyncGenerator%': ['AsyncGeneratorFunction', 'prototype'],
    '%AsyncGeneratorPrototype%': ['AsyncGeneratorFunction', 'prototype', 'prototype'],
    '%BooleanPrototype%': ['Boolean', 'prototype'],
    '%DataViewPrototype%': ['DataView', 'prototype'],
    '%DatePrototype%': ['Date', 'prototype'],
    '%ErrorPrototype%': ['Error', 'prototype'],
    '%EvalErrorPrototype%': ['EvalError', 'prototype'],
    '%Float32ArrayPrototype%': ['Float32Array', 'prototype'],
    '%Float64ArrayPrototype%': ['Float64Array', 'prototype'],
    '%FunctionPrototype%': ['Function', 'prototype'],
    '%Generator%': ['GeneratorFunction', 'prototype'],
    '%GeneratorPrototype%': ['GeneratorFunction', 'prototype', 'prototype'],
    '%Int8ArrayPrototype%': ['Int8Array', 'prototype'],
    '%Int16ArrayPrototype%': ['Int16Array', 'prototype'],
    '%Int32ArrayPrototype%': ['Int32Array', 'prototype'],
    '%JSONParse%': ['JSON', 'parse'],
    '%JSONStringify%': ['JSON', 'stringify'],
    '%MapPrototype%': ['Map', 'prototype'],
    '%NumberPrototype%': ['Number', 'prototype'],
    '%ObjectPrototype%': ['Object', 'prototype'],
    '%ObjProto_toString%': ['Object', 'prototype', 'toString'],
    '%ObjProto_valueOf%': ['Object', 'prototype', 'valueOf'],
    '%PromisePrototype%': ['Promise', 'prototype'],
    '%PromiseProto_then%': ['Promise', 'prototype', 'then'],
    '%Promise_all%': ['Promise', 'all'],
    '%Promise_reject%': ['Promise', 'reject'],
    '%Promise_resolve%': ['Promise', 'resolve'],
    '%RangeErrorPrototype%': ['RangeError', 'prototype'],
    '%ReferenceErrorPrototype%': ['ReferenceError', 'prototype'],
    '%RegExpPrototype%': ['RegExp', 'prototype'],
    '%SetPrototype%': ['Set', 'prototype'],
    '%SharedArrayBufferPrototype%': ['SharedArrayBuffer', 'prototype'],
    '%StringPrototype%': ['String', 'prototype'],
    '%SymbolPrototype%': ['Symbol', 'prototype'],
    '%SyntaxErrorPrototype%': ['SyntaxError', 'prototype'],
    '%TypedArrayPrototype%': ['TypedArray', 'prototype'],
    '%TypeErrorPrototype%': ['TypeError', 'prototype'],
    '%Uint8ArrayPrototype%': ['Uint8Array', 'prototype'],
    '%Uint8ClampedArrayPrototype%': ['Uint8ClampedArray', 'prototype'],
    '%Uint16ArrayPrototype%': ['Uint16Array', 'prototype'],
    '%Uint32ArrayPrototype%': ['Uint32Array', 'prototype'],
    '%URIErrorPrototype%': ['URIError', 'prototype'],
    '%WeakMapPrototype%': ['WeakMap', 'prototype'],
    '%WeakSetPrototype%': ['WeakSet', 'prototype']
  },
  Ws = bl,
  Kn = iy,
  py = Ws.call(Function.call, Array.prototype.concat),
  my = Ws.call(Function.apply, Array.prototype.splice),
  Pc = Ws.call(Function.call, String.prototype.replace),
  qn = Ws.call(Function.call, String.prototype.slice),
  gy = Ws.call(Function.call, RegExp.prototype.exec),
  _y =
    /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g,
  yy = /\\(\\)?/g,
  Ay = function (t) {
    var e = qn(t, 0, 1),
      i = qn(t, -1)
    if (e === '%' && i !== '%') throw new ji('invalid intrinsic syntax, expected closing `%`')
    if (i === '%' && e !== '%') throw new ji('invalid intrinsic syntax, expected opening `%`')
    var s = []
    return (
      Pc(t, _y, function (n, o, a, h) {
        s[s.length] = a ? Pc(h, yy, '$1') : o || n
      }),
      s
    )
  },
  vy = function (t, e) {
    var i = t,
      s
    if ((Kn(Rc, i) && ((s = Rc[i]), (i = '%' + s[0] + '%')), Kn(hi, i))) {
      var n = hi[i]
      if ((n === bi && (n = fy(i)), typeof n > 'u' && !e))
        throw new Li('intrinsic ' + t + ' exists, but is not available. Please file an issue!')
      return { alias: s, name: i, value: n }
    }
    throw new ji('intrinsic ' + t + ' does not exist!')
  },
  Qi = function (t, e) {
    if (typeof t != 'string' || t.length === 0)
      throw new Li('intrinsic name must be a non-empty string')
    if (arguments.length > 1 && typeof e != 'boolean')
      throw new Li('"allowMissing" argument must be a boolean')
    if (gy(/^%?[^%]*%?$/, t) === null)
      throw new ji(
        '`%` may not be present anywhere but at the beginning and end of the intrinsic name'
      )
    var i = Ay(t),
      s = i.length > 0 ? i[0] : '',
      n = vy('%' + s + '%', e),
      o = n.name,
      a = n.value,
      h = !1,
      l = n.alias
    l && ((s = l[0]), my(i, py([0, 1], l)))
    for (var c = 1, u = !0; c < i.length; c += 1) {
      var d = i[c],
        f = qn(d, 0, 1),
        p = qn(d, -1)
      if ((f === '"' || f === "'" || f === '`' || p === '"' || p === "'" || p === '`') && f !== p)
        throw new ji('property names with quotes must have matching quotes')
      if (((d === 'constructor' || !u) && (h = !0), (s += '.' + d), (o = '%' + s + '%'), Kn(hi, o)))
        a = hi[o]
      else if (a != null) {
        if (!(d in a)) {
          if (!e)
            throw new Li('base intrinsic for ' + t + ' exists, but the property is not available.')
          return
        }
        if (ai && c + 1 >= i.length) {
          var m = ai(a, d)
          ;(u = !!m), u && 'get' in m && !('originalValue' in m.get) ? (a = m.get) : (a = a[d])
        } else (u = Kn(a, d)), (a = a[d])
        u && !h && (hi[o] = a)
      }
    }
    return a
  },
  df = { exports: {} },
  ea,
  Mc
function El() {
  if (Mc) return ea
  Mc = 1
  var r = Qi,
    t = r('%Object.defineProperty%', !0) || !1
  if (t)
    try {
      t({}, 'a', { value: 1 })
    } catch {
      t = !1
    }
  return (ea = t), ea
}
var xy = Qi,
  Fn = xy('%Object.getOwnPropertyDescriptor%', !0)
if (Fn)
  try {
    Fn([], 'length')
  } catch {
    Fn = null
  }
var ff = Fn,
  Bc = El(),
  by = cf,
  Ai = js,
  Fc = ff,
  Ey = function (t, e, i) {
    if (!t || (typeof t != 'object' && typeof t != 'function'))
      throw new Ai('`obj` must be an object or a function`')
    if (typeof e != 'string' && typeof e != 'symbol')
      throw new Ai('`property` must be a string or a symbol`')
    if (arguments.length > 3 && typeof arguments[3] != 'boolean' && arguments[3] !== null)
      throw new Ai('`nonEnumerable`, if provided, must be a boolean or null')
    if (arguments.length > 4 && typeof arguments[4] != 'boolean' && arguments[4] !== null)
      throw new Ai('`nonWritable`, if provided, must be a boolean or null')
    if (arguments.length > 5 && typeof arguments[5] != 'boolean' && arguments[5] !== null)
      throw new Ai('`nonConfigurable`, if provided, must be a boolean or null')
    if (arguments.length > 6 && typeof arguments[6] != 'boolean')
      throw new Ai('`loose`, if provided, must be a boolean')
    var s = arguments.length > 3 ? arguments[3] : null,
      n = arguments.length > 4 ? arguments[4] : null,
      o = arguments.length > 5 ? arguments[5] : null,
      a = arguments.length > 6 ? arguments[6] : !1,
      h = !!Fc && Fc(t, e)
    if (Bc)
      Bc(t, e, {
        configurable: o === null && h ? h.configurable : !o,
        enumerable: s === null && h ? h.enumerable : !s,
        value: i,
        writable: n === null && h ? h.writable : !n
      })
    else if (a || (!s && !n && !o)) t[e] = i
    else
      throw new by(
        'This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.'
      )
  },
  th = El(),
  pf = function () {
    return !!th
  }
pf.hasArrayLengthDefineBug = function () {
  if (!th) return null
  try {
    return th([], 'length', { value: 1 }).length !== 1
  } catch {
    return !0
  }
}
var Ty = pf,
  wy = Qi,
  Dc = Ey,
  Sy = Ty(),
  Oc = ff,
  Lc = js,
  Cy = wy('%Math.floor%'),
  Iy = function (t, e) {
    if (typeof t != 'function') throw new Lc('`fn` is not a function')
    if (typeof e != 'number' || e < 0 || e > 4294967295 || Cy(e) !== e)
      throw new Lc('`length` must be a positive 32-bit integer')
    var i = arguments.length > 2 && !!arguments[2],
      s = !0,
      n = !0
    if ('length' in t && Oc) {
      var o = Oc(t, 'length')
      o && !o.configurable && (s = !1), o && !o.writable && (n = !1)
    }
    return (s || n || !i) && (Sy ? Dc(t, 'length', e, !0, !0) : Dc(t, 'length', e)), t
  }
;(function (r) {
  var t = bl,
    e = Qi,
    i = Iy,
    s = js,
    n = e('%Function.prototype.apply%'),
    o = e('%Function.prototype.call%'),
    a = e('%Reflect.apply%', !0) || t.call(o, n),
    h = El(),
    l = e('%Math.max%')
  r.exports = function (d) {
    if (typeof d != 'function') throw new s('a function is required')
    var f = a(t, o, arguments)
    return i(f, 1 + l(0, d.length - (arguments.length - 1)), !0)
  }
  var c = function () {
    return a(t, n, arguments)
  }
  h ? h(r.exports, 'apply', { value: c }) : (r.exports.apply = c)
})(df)
var Ry = df.exports,
  mf = Qi,
  gf = Ry,
  Py = gf(mf('String.prototype.indexOf')),
  My = function (t, e) {
    var i = mf(t, !!e)
    return typeof i == 'function' && Py(t, '.prototype.') > -1 ? gf(i) : i
  }
const By = {},
  Fy = Object.freeze(
    Object.defineProperty({ __proto__: null, default: By }, Symbol.toStringTag, { value: 'Module' })
  ),
  Dy = g_(Fy)
var Tl = typeof Map == 'function' && Map.prototype,
  ra =
    Object.getOwnPropertyDescriptor && Tl
      ? Object.getOwnPropertyDescriptor(Map.prototype, 'size')
      : null,
  Zn = Tl && ra && typeof ra.get == 'function' ? ra.get : null,
  Nc = Tl && Map.prototype.forEach,
  wl = typeof Set == 'function' && Set.prototype,
  ia =
    Object.getOwnPropertyDescriptor && wl
      ? Object.getOwnPropertyDescriptor(Set.prototype, 'size')
      : null,
  Jn = wl && ia && typeof ia.get == 'function' ? ia.get : null,
  Uc = wl && Set.prototype.forEach,
  Oy = typeof WeakMap == 'function' && WeakMap.prototype,
  Es = Oy ? WeakMap.prototype.has : null,
  Ly = typeof WeakSet == 'function' && WeakSet.prototype,
  Ts = Ly ? WeakSet.prototype.has : null,
  Ny = typeof WeakRef == 'function' && WeakRef.prototype,
  kc = Ny ? WeakRef.prototype.deref : null,
  Uy = Boolean.prototype.valueOf,
  ky = Object.prototype.toString,
  Gy = Function.prototype.toString,
  Hy = String.prototype.match,
  Sl = String.prototype.slice,
  Ir = String.prototype.replace,
  Vy = String.prototype.toUpperCase,
  Gc = String.prototype.toLowerCase,
  _f = RegExp.prototype.test,
  Hc = Array.prototype.concat,
  Qe = Array.prototype.join,
  Xy = Array.prototype.slice,
  Vc = Math.floor,
  eh = typeof BigInt == 'function' ? BigInt.prototype.valueOf : null,
  sa = Object.getOwnPropertySymbols,
  rh =
    typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol'
      ? Symbol.prototype.toString
      : null,
  Wi = typeof Symbol == 'function' && typeof Symbol.iterator == 'object',
  se =
    typeof Symbol == 'function' &&
    Symbol.toStringTag &&
    (typeof Symbol.toStringTag === Wi || 'symbol')
      ? Symbol.toStringTag
      : null,
  yf = Object.prototype.propertyIsEnumerable,
  Xc =
    (typeof Reflect == 'function' ? Reflect.getPrototypeOf : Object.getPrototypeOf) ||
    ([].__proto__ === Array.prototype
      ? function (r) {
          return r.__proto__
        }
      : null)
function jc(r, t) {
  if (r === 1 / 0 || r === -1 / 0 || r !== r || (r && r > -1e3 && r < 1e3) || _f.call(/e/, t))
    return t
  var e = /[0-9](?=(?:[0-9]{3})+(?![0-9]))/g
  if (typeof r == 'number') {
    var i = r < 0 ? -Vc(-r) : Vc(r)
    if (i !== r) {
      var s = String(i),
        n = Sl.call(t, s.length + 1)
      return Ir.call(s, e, '$&_') + '.' + Ir.call(Ir.call(n, /([0-9]{3})/g, '$&_'), /_$/, '')
    }
  }
  return Ir.call(t, e, '$&_')
}
var ih = Dy,
  Wc = ih.custom,
  $c = vf(Wc) ? Wc : null,
  jy = function r(t, e, i, s) {
    var n = e || {}
    if (wr(n, 'quoteStyle') && n.quoteStyle !== 'single' && n.quoteStyle !== 'double')
      throw new TypeError('option "quoteStyle" must be "single" or "double"')
    if (
      wr(n, 'maxStringLength') &&
      (typeof n.maxStringLength == 'number'
        ? n.maxStringLength < 0 && n.maxStringLength !== 1 / 0
        : n.maxStringLength !== null)
    )
      throw new TypeError(
        'option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`'
      )
    var o = wr(n, 'customInspect') ? n.customInspect : !0
    if (typeof o != 'boolean' && o !== 'symbol')
      throw new TypeError(
        'option "customInspect", if provided, must be `true`, `false`, or `\'symbol\'`'
      )
    if (
      wr(n, 'indent') &&
      n.indent !== null &&
      n.indent !== '	' &&
      !(parseInt(n.indent, 10) === n.indent && n.indent > 0)
    )
      throw new TypeError('option "indent" must be "\\t", an integer > 0, or `null`')
    if (wr(n, 'numericSeparator') && typeof n.numericSeparator != 'boolean')
      throw new TypeError('option "numericSeparator", if provided, must be `true` or `false`')
    var a = n.numericSeparator
    if (typeof t > 'u') return 'undefined'
    if (t === null) return 'null'
    if (typeof t == 'boolean') return t ? 'true' : 'false'
    if (typeof t == 'string') return bf(t, n)
    if (typeof t == 'number') {
      if (t === 0) return 1 / 0 / t > 0 ? '0' : '-0'
      var h = String(t)
      return a ? jc(t, h) : h
    }
    if (typeof t == 'bigint') {
      var l = String(t) + 'n'
      return a ? jc(t, l) : l
    }
    var c = typeof n.depth > 'u' ? 5 : n.depth
    if ((typeof i > 'u' && (i = 0), i >= c && c > 0 && typeof t == 'object'))
      return sh(t) ? '[Array]' : '[Object]'
    var u = hA(n, i)
    if (typeof s > 'u') s = []
    else if (xf(s, t) >= 0) return '[Circular]'
    function d(E, M, K) {
      if ((M && ((s = Xy.call(s)), s.push(M)), K)) {
        var Z = { depth: n.depth }
        return wr(n, 'quoteStyle') && (Z.quoteStyle = n.quoteStyle), r(E, Z, i + 1, s)
      }
      return r(E, n, i + 1, s)
    }
    if (typeof t == 'function' && !zc(t)) {
      var f = Jy(t),
        p = an(t, d)
      return (
        '[Function' +
        (f ? ': ' + f : ' (anonymous)') +
        ']' +
        (p.length > 0 ? ' { ' + Qe.call(p, ', ') + ' }' : '')
      )
    }
    if (vf(t)) {
      var m = Wi ? Ir.call(String(t), /^(Symbol\(.*\))_[^)]*$/, '$1') : rh.call(t)
      return typeof t == 'object' && !Wi ? ts(m) : m
    }
    if (nA(t)) {
      for (
        var g = '<' + Gc.call(String(t.nodeName)), A = t.attributes || [], x = 0;
        x < A.length;
        x++
      )
        g += ' ' + A[x].name + '=' + Af(Wy(A[x].value), 'double', n)
      return (
        (g += '>'),
        t.childNodes && t.childNodes.length && (g += '...'),
        (g += '</' + Gc.call(String(t.nodeName)) + '>'),
        g
      )
    }
    if (sh(t)) {
      if (t.length === 0) return '[]'
      var _ = an(t, d)
      return u && !aA(_) ? '[' + nh(_, u) + ']' : '[ ' + Qe.call(_, ', ') + ' ]'
    }
    if (zy(t)) {
      var v = an(t, d)
      return !('cause' in Error.prototype) && 'cause' in t && !yf.call(t, 'cause')
        ? '{ [' + String(t) + '] ' + Qe.call(Hc.call('[cause]: ' + d(t.cause), v), ', ') + ' }'
        : v.length === 0
          ? '[' + String(t) + ']'
          : '{ [' + String(t) + '] ' + Qe.call(v, ', ') + ' }'
    }
    if (typeof t == 'object' && o) {
      if ($c && typeof t[$c] == 'function' && ih) return ih(t, { depth: c - i })
      if (o !== 'symbol' && typeof t.inspect == 'function') return t.inspect()
    }
    if (tA(t)) {
      var S = []
      return (
        Nc &&
          Nc.call(t, function (E, M) {
            S.push(d(M, t, !0) + ' => ' + d(E, t))
          }),
        Yc('Map', Zn.call(t), S, u)
      )
    }
    if (iA(t)) {
      var C = []
      return (
        Uc &&
          Uc.call(t, function (E) {
            C.push(d(E, t))
          }),
        Yc('Set', Jn.call(t), C, u)
      )
    }
    if (eA(t)) return na('WeakMap')
    if (sA(t)) return na('WeakSet')
    if (rA(t)) return na('WeakRef')
    if (Qy(t)) return ts(d(Number(t)))
    if (qy(t)) return ts(d(eh.call(t)))
    if (Ky(t)) return ts(Uy.call(t))
    if (Yy(t)) return ts(d(String(t)))
    if (typeof window < 'u' && t === window) return '{ [object Window] }'
    if (t === Bn) return '{ [object globalThis] }'
    if (!$y(t) && !zc(t)) {
      var I = an(t, d),
        T = Xc ? Xc(t) === Object.prototype : t instanceof Object || t.constructor === Object,
        F = t instanceof Object ? '' : 'null prototype',
        k = !T && se && Object(t) === t && se in t ? Sl.call(kr(t), 8, -1) : F ? 'Object' : '',
        rt =
          T || typeof t.constructor != 'function'
            ? ''
            : t.constructor.name
              ? t.constructor.name + ' '
              : '',
        G = rt + (k || F ? '[' + Qe.call(Hc.call([], k || [], F || []), ': ') + '] ' : '')
      return I.length === 0
        ? G + '{}'
        : u
          ? G + '{' + nh(I, u) + '}'
          : G + '{ ' + Qe.call(I, ', ') + ' }'
    }
    return String(t)
  }
function Af(r, t, e) {
  var i = (e.quoteStyle || t) === 'double' ? '"' : "'"
  return i + r + i
}
function Wy(r) {
  return Ir.call(String(r), /"/g, '&quot;')
}
function sh(r) {
  return kr(r) === '[object Array]' && (!se || !(typeof r == 'object' && se in r))
}
function $y(r) {
  return kr(r) === '[object Date]' && (!se || !(typeof r == 'object' && se in r))
}
function zc(r) {
  return kr(r) === '[object RegExp]' && (!se || !(typeof r == 'object' && se in r))
}
function zy(r) {
  return kr(r) === '[object Error]' && (!se || !(typeof r == 'object' && se in r))
}
function Yy(r) {
  return kr(r) === '[object String]' && (!se || !(typeof r == 'object' && se in r))
}
function Qy(r) {
  return kr(r) === '[object Number]' && (!se || !(typeof r == 'object' && se in r))
}
function Ky(r) {
  return kr(r) === '[object Boolean]' && (!se || !(typeof r == 'object' && se in r))
}
function vf(r) {
  if (Wi) return r && typeof r == 'object' && r instanceof Symbol
  if (typeof r == 'symbol') return !0
  if (!r || typeof r != 'object' || !rh) return !1
  try {
    return rh.call(r), !0
  } catch {}
  return !1
}
function qy(r) {
  if (!r || typeof r != 'object' || !eh) return !1
  try {
    return eh.call(r), !0
  } catch {}
  return !1
}
var Zy =
  Object.prototype.hasOwnProperty ||
  function (r) {
    return r in this
  }
function wr(r, t) {
  return Zy.call(r, t)
}
function kr(r) {
  return ky.call(r)
}
function Jy(r) {
  if (r.name) return r.name
  var t = Hy.call(Gy.call(r), /^function\s*([\w$]+)/)
  return t ? t[1] : null
}
function xf(r, t) {
  if (r.indexOf) return r.indexOf(t)
  for (var e = 0, i = r.length; e < i; e++) if (r[e] === t) return e
  return -1
}
function tA(r) {
  if (!Zn || !r || typeof r != 'object') return !1
  try {
    Zn.call(r)
    try {
      Jn.call(r)
    } catch {
      return !0
    }
    return r instanceof Map
  } catch {}
  return !1
}
function eA(r) {
  if (!Es || !r || typeof r != 'object') return !1
  try {
    Es.call(r, Es)
    try {
      Ts.call(r, Ts)
    } catch {
      return !0
    }
    return r instanceof WeakMap
  } catch {}
  return !1
}
function rA(r) {
  if (!kc || !r || typeof r != 'object') return !1
  try {
    return kc.call(r), !0
  } catch {}
  return !1
}
function iA(r) {
  if (!Jn || !r || typeof r != 'object') return !1
  try {
    Jn.call(r)
    try {
      Zn.call(r)
    } catch {
      return !0
    }
    return r instanceof Set
  } catch {}
  return !1
}
function sA(r) {
  if (!Ts || !r || typeof r != 'object') return !1
  try {
    Ts.call(r, Ts)
    try {
      Es.call(r, Es)
    } catch {
      return !0
    }
    return r instanceof WeakSet
  } catch {}
  return !1
}
function nA(r) {
  return !r || typeof r != 'object'
    ? !1
    : typeof HTMLElement < 'u' && r instanceof HTMLElement
      ? !0
      : typeof r.nodeName == 'string' && typeof r.getAttribute == 'function'
}
function bf(r, t) {
  if (r.length > t.maxStringLength) {
    var e = r.length - t.maxStringLength,
      i = '... ' + e + ' more character' + (e > 1 ? 's' : '')
    return bf(Sl.call(r, 0, t.maxStringLength), t) + i
  }
  var s = Ir.call(Ir.call(r, /(['\\])/g, '\\$1'), /[\x00-\x1f]/g, oA)
  return Af(s, 'single', t)
}
function oA(r) {
  var t = r.charCodeAt(0),
    e = { 8: 'b', 9: 't', 10: 'n', 12: 'f', 13: 'r' }[t]
  return e ? '\\' + e : '\\x' + (t < 16 ? '0' : '') + Vy.call(t.toString(16))
}
function ts(r) {
  return 'Object(' + r + ')'
}
function na(r) {
  return r + ' { ? }'
}
function Yc(r, t, e, i) {
  var s = i ? nh(e, i) : Qe.call(e, ', ')
  return r + ' (' + t + ') {' + s + '}'
}
function aA(r) {
  for (var t = 0; t < r.length; t++)
    if (
      xf(
        r[t],
        `
`
      ) >= 0
    )
      return !1
  return !0
}
function hA(r, t) {
  var e
  if (r.indent === '	') e = '	'
  else if (typeof r.indent == 'number' && r.indent > 0) e = Qe.call(Array(r.indent + 1), ' ')
  else return null
  return { base: e, prev: Qe.call(Array(t + 1), e) }
}
function nh(r, t) {
  if (r.length === 0) return ''
  var e =
    `
` +
    t.prev +
    t.base
  return (
    e +
    Qe.call(r, ',' + e) +
    `
` +
    t.prev
  )
}
function an(r, t) {
  var e = sh(r),
    i = []
  if (e) {
    i.length = r.length
    for (var s = 0; s < r.length; s++) i[s] = wr(r, s) ? t(r[s], r) : ''
  }
  var n = typeof sa == 'function' ? sa(r) : [],
    o
  if (Wi) {
    o = {}
    for (var a = 0; a < n.length; a++) o['$' + n[a]] = n[a]
  }
  for (var h in r)
    wr(r, h) &&
      ((e && String(Number(h)) === h && h < r.length) ||
        (Wi && o['$' + h] instanceof Symbol) ||
        (_f.call(/[^\w$]/, h)
          ? i.push(t(h, r) + ': ' + t(r[h], r))
          : i.push(h + ': ' + t(r[h], r))))
  if (typeof sa == 'function')
    for (var l = 0; l < n.length; l++)
      yf.call(r, n[l]) && i.push('[' + t(n[l]) + ']: ' + t(r[n[l]], r))
  return i
}
var Ef = Qi,
  Ki = My,
  lA = jy,
  cA = js,
  hn = Ef('%WeakMap%', !0),
  ln = Ef('%Map%', !0),
  uA = Ki('WeakMap.prototype.get', !0),
  dA = Ki('WeakMap.prototype.set', !0),
  fA = Ki('WeakMap.prototype.has', !0),
  pA = Ki('Map.prototype.get', !0),
  mA = Ki('Map.prototype.set', !0),
  gA = Ki('Map.prototype.has', !0),
  Cl = function (r, t) {
    for (var e = r, i; (i = e.next) !== null; e = i)
      if (i.key === t) return (e.next = i.next), (i.next = r.next), (r.next = i), i
  },
  _A = function (r, t) {
    var e = Cl(r, t)
    return e && e.value
  },
  yA = function (r, t, e) {
    var i = Cl(r, t)
    i ? (i.value = e) : (r.next = { key: t, next: r.next, value: e })
  },
  AA = function (r, t) {
    return !!Cl(r, t)
  },
  vA = function () {
    var t,
      e,
      i,
      s = {
        assert: function (n) {
          if (!s.has(n)) throw new cA('Side channel does not contain ' + lA(n))
        },
        get: function (n) {
          if (hn && n && (typeof n == 'object' || typeof n == 'function')) {
            if (t) return uA(t, n)
          } else if (ln) {
            if (e) return pA(e, n)
          } else if (i) return _A(i, n)
        },
        has: function (n) {
          if (hn && n && (typeof n == 'object' || typeof n == 'function')) {
            if (t) return fA(t, n)
          } else if (ln) {
            if (e) return gA(e, n)
          } else if (i) return AA(i, n)
          return !1
        },
        set: function (n, o) {
          hn && n && (typeof n == 'object' || typeof n == 'function')
            ? (t || (t = new hn()), dA(t, n, o))
            : ln
              ? (e || (e = new ln()), mA(e, n, o))
              : (i || (i = { key: {}, next: null }), yA(i, n, o))
        }
      }
    return s
  },
  xA = String.prototype.replace,
  bA = /%20/g,
  oa = { RFC1738: 'RFC1738', RFC3986: 'RFC3986' },
  Il = {
    default: oa.RFC3986,
    formatters: {
      RFC1738: function (r) {
        return xA.call(r, bA, '+')
      },
      RFC3986: function (r) {
        return String(r)
      }
    },
    RFC1738: oa.RFC1738,
    RFC3986: oa.RFC3986
  },
  EA = Il,
  aa = Object.prototype.hasOwnProperty,
  Jr = Array.isArray,
  Ge = (function () {
    for (var r = [], t = 0; t < 256; ++t)
      r.push('%' + ((t < 16 ? '0' : '') + t.toString(16)).toUpperCase())
    return r
  })(),
  TA = function (t) {
    for (; t.length > 1; ) {
      var e = t.pop(),
        i = e.obj[e.prop]
      if (Jr(i)) {
        for (var s = [], n = 0; n < i.length; ++n) typeof i[n] < 'u' && s.push(i[n])
        e.obj[e.prop] = s
      }
    }
  },
  Tf = function (t, e) {
    for (var i = e && e.plainObjects ? Object.create(null) : {}, s = 0; s < t.length; ++s)
      typeof t[s] < 'u' && (i[s] = t[s])
    return i
  },
  wA = function r(t, e, i) {
    if (!e) return t
    if (typeof e != 'object') {
      if (Jr(t)) t.push(e)
      else if (t && typeof t == 'object')
        ((i && (i.plainObjects || i.allowPrototypes)) || !aa.call(Object.prototype, e)) &&
          (t[e] = !0)
      else return [t, e]
      return t
    }
    if (!t || typeof t != 'object') return [t].concat(e)
    var s = t
    return (
      Jr(t) && !Jr(e) && (s = Tf(t, i)),
      Jr(t) && Jr(e)
        ? (e.forEach(function (n, o) {
            if (aa.call(t, o)) {
              var a = t[o]
              a && typeof a == 'object' && n && typeof n == 'object'
                ? (t[o] = r(a, n, i))
                : t.push(n)
            } else t[o] = n
          }),
          t)
        : Object.keys(e).reduce(function (n, o) {
            var a = e[o]
            return aa.call(n, o) ? (n[o] = r(n[o], a, i)) : (n[o] = a), n
          }, s)
    )
  },
  SA = function (t, e) {
    return Object.keys(e).reduce(function (i, s) {
      return (i[s] = e[s]), i
    }, t)
  },
  CA = function (r, t, e) {
    var i = r.replace(/\+/g, ' ')
    if (e === 'iso-8859-1') return i.replace(/%[0-9a-f]{2}/gi, unescape)
    try {
      return decodeURIComponent(i)
    } catch {
      return i
    }
  },
  ha = 1024,
  IA = function (t, e, i, s, n) {
    if (t.length === 0) return t
    var o = t
    if (
      (typeof t == 'symbol'
        ? (o = Symbol.prototype.toString.call(t))
        : typeof t != 'string' && (o = String(t)),
      i === 'iso-8859-1')
    )
      return escape(o).replace(/%u[0-9a-f]{4}/gi, function (f) {
        return '%26%23' + parseInt(f.slice(2), 16) + '%3B'
      })
    for (var a = '', h = 0; h < o.length; h += ha) {
      for (var l = o.length >= ha ? o.slice(h, h + ha) : o, c = [], u = 0; u < l.length; ++u) {
        var d = l.charCodeAt(u)
        if (
          d === 45 ||
          d === 46 ||
          d === 95 ||
          d === 126 ||
          (d >= 48 && d <= 57) ||
          (d >= 65 && d <= 90) ||
          (d >= 97 && d <= 122) ||
          (n === EA.RFC1738 && (d === 40 || d === 41))
        ) {
          c[c.length] = l.charAt(u)
          continue
        }
        if (d < 128) {
          c[c.length] = Ge[d]
          continue
        }
        if (d < 2048) {
          c[c.length] = Ge[192 | (d >> 6)] + Ge[128 | (d & 63)]
          continue
        }
        if (d < 55296 || d >= 57344) {
          c[c.length] = Ge[224 | (d >> 12)] + Ge[128 | ((d >> 6) & 63)] + Ge[128 | (d & 63)]
          continue
        }
        ;(u += 1),
          (d = 65536 + (((d & 1023) << 10) | (l.charCodeAt(u) & 1023))),
          (c[c.length] =
            Ge[240 | (d >> 18)] +
            Ge[128 | ((d >> 12) & 63)] +
            Ge[128 | ((d >> 6) & 63)] +
            Ge[128 | (d & 63)])
      }
      a += c.join('')
    }
    return a
  },
  RA = function (t) {
    for (var e = [{ obj: { o: t }, prop: 'o' }], i = [], s = 0; s < e.length; ++s)
      for (var n = e[s], o = n.obj[n.prop], a = Object.keys(o), h = 0; h < a.length; ++h) {
        var l = a[h],
          c = o[l]
        typeof c == 'object' &&
          c !== null &&
          i.indexOf(c) === -1 &&
          (e.push({ obj: o, prop: l }), i.push(c))
      }
    return TA(e), t
  },
  PA = function (t) {
    return Object.prototype.toString.call(t) === '[object RegExp]'
  },
  MA = function (t) {
    return !t || typeof t != 'object'
      ? !1
      : !!(t.constructor && t.constructor.isBuffer && t.constructor.isBuffer(t))
  },
  BA = function (t, e) {
    return [].concat(t, e)
  },
  FA = function (t, e) {
    if (Jr(t)) {
      for (var i = [], s = 0; s < t.length; s += 1) i.push(e(t[s]))
      return i
    }
    return e(t)
  },
  wf = {
    arrayToObject: Tf,
    assign: SA,
    combine: BA,
    compact: RA,
    decode: CA,
    encode: IA,
    isBuffer: MA,
    isRegExp: PA,
    maybeMap: FA,
    merge: wA
  },
  Sf = vA,
  Dn = wf,
  ws = Il,
  DA = Object.prototype.hasOwnProperty,
  Cf = {
    brackets: function (t) {
      return t + '[]'
    },
    comma: 'comma',
    indices: function (t, e) {
      return t + '[' + e + ']'
    },
    repeat: function (t) {
      return t
    }
  },
  $e = Array.isArray,
  OA = Array.prototype.push,
  If = function (r, t) {
    OA.apply(r, $e(t) ? t : [t])
  },
  LA = Date.prototype.toISOString,
  Qc = ws.default,
  jt = {
    addQueryPrefix: !1,
    allowDots: !1,
    allowEmptyArrays: !1,
    arrayFormat: 'indices',
    charset: 'utf-8',
    charsetSentinel: !1,
    delimiter: '&',
    encode: !0,
    encodeDotInKeys: !1,
    encoder: Dn.encode,
    encodeValuesOnly: !1,
    format: Qc,
    formatter: ws.formatters[Qc],
    indices: !1,
    serializeDate: function (t) {
      return LA.call(t)
    },
    skipNulls: !1,
    strictNullHandling: !1
  },
  NA = function (t) {
    return (
      typeof t == 'string' ||
      typeof t == 'number' ||
      typeof t == 'boolean' ||
      typeof t == 'symbol' ||
      typeof t == 'bigint'
    )
  },
  la = {},
  UA = function r(t, e, i, s, n, o, a, h, l, c, u, d, f, p, m, g, A, x) {
    for (var _ = t, v = x, S = 0, C = !1; (v = v.get(la)) !== void 0 && !C; ) {
      var I = v.get(t)
      if (((S += 1), typeof I < 'u')) {
        if (I === S) throw new RangeError('Cyclic object value')
        C = !0
      }
      typeof v.get(la) > 'u' && (S = 0)
    }
    if (
      (typeof c == 'function'
        ? (_ = c(e, _))
        : _ instanceof Date
          ? (_ = f(_))
          : i === 'comma' &&
            $e(_) &&
            (_ = Dn.maybeMap(_, function (N) {
              return N instanceof Date ? f(N) : N
            })),
      _ === null)
    ) {
      if (o) return l && !g ? l(e, jt.encoder, A, 'key', p) : e
      _ = ''
    }
    if (NA(_) || Dn.isBuffer(_)) {
      if (l) {
        var T = g ? e : l(e, jt.encoder, A, 'key', p)
        return [m(T) + '=' + m(l(_, jt.encoder, A, 'value', p))]
      }
      return [m(e) + '=' + m(String(_))]
    }
    var F = []
    if (typeof _ > 'u') return F
    var k
    if (i === 'comma' && $e(_))
      g && l && (_ = Dn.maybeMap(_, l)),
        (k = [{ value: _.length > 0 ? _.join(',') || null : void 0 }])
    else if ($e(c)) k = c
    else {
      var rt = Object.keys(_)
      k = u ? rt.sort(u) : rt
    }
    var G = h ? e.replace(/\./g, '%2E') : e,
      E = s && $e(_) && _.length === 1 ? G + '[]' : G
    if (n && $e(_) && _.length === 0) return E + '[]'
    for (var M = 0; M < k.length; ++M) {
      var K = k[M],
        Z = typeof K == 'object' && typeof K.value < 'u' ? K.value : _[K]
      if (!(a && Z === null)) {
        var H = d && h ? K.replace(/\./g, '%2E') : K,
          W = $e(_) ? (typeof i == 'function' ? i(E, H) : E) : E + (d ? '.' + H : '[' + H + ']')
        x.set(t, S)
        var gt = Sf()
        gt.set(la, x),
          If(
            F,
            r(
              Z,
              W,
              i,
              s,
              n,
              o,
              a,
              h,
              i === 'comma' && g && $e(_) ? null : l,
              c,
              u,
              d,
              f,
              p,
              m,
              g,
              A,
              gt
            )
          )
      }
    }
    return F
  },
  kA = function (t) {
    if (!t) return jt
    if (typeof t.allowEmptyArrays < 'u' && typeof t.allowEmptyArrays != 'boolean')
      throw new TypeError('`allowEmptyArrays` option can only be `true` or `false`, when provided')
    if (typeof t.encodeDotInKeys < 'u' && typeof t.encodeDotInKeys != 'boolean')
      throw new TypeError('`encodeDotInKeys` option can only be `true` or `false`, when provided')
    if (t.encoder !== null && typeof t.encoder < 'u' && typeof t.encoder != 'function')
      throw new TypeError('Encoder has to be a function.')
    var e = t.charset || jt.charset
    if (typeof t.charset < 'u' && t.charset !== 'utf-8' && t.charset !== 'iso-8859-1')
      throw new TypeError('The charset option must be either utf-8, iso-8859-1, or undefined')
    var i = ws.default
    if (typeof t.format < 'u') {
      if (!DA.call(ws.formatters, t.format)) throw new TypeError('Unknown format option provided.')
      i = t.format
    }
    var s = ws.formatters[i],
      n = jt.filter
    ;(typeof t.filter == 'function' || $e(t.filter)) && (n = t.filter)
    var o
    if (
      (t.arrayFormat in Cf
        ? (o = t.arrayFormat)
        : 'indices' in t
          ? (o = t.indices ? 'indices' : 'repeat')
          : (o = jt.arrayFormat),
      'commaRoundTrip' in t && typeof t.commaRoundTrip != 'boolean')
    )
      throw new TypeError('`commaRoundTrip` must be a boolean, or absent')
    var a =
      typeof t.allowDots > 'u' ? (t.encodeDotInKeys === !0 ? !0 : jt.allowDots) : !!t.allowDots
    return {
      addQueryPrefix: typeof t.addQueryPrefix == 'boolean' ? t.addQueryPrefix : jt.addQueryPrefix,
      allowDots: a,
      allowEmptyArrays:
        typeof t.allowEmptyArrays == 'boolean' ? !!t.allowEmptyArrays : jt.allowEmptyArrays,
      arrayFormat: o,
      charset: e,
      charsetSentinel:
        typeof t.charsetSentinel == 'boolean' ? t.charsetSentinel : jt.charsetSentinel,
      commaRoundTrip: t.commaRoundTrip,
      delimiter: typeof t.delimiter > 'u' ? jt.delimiter : t.delimiter,
      encode: typeof t.encode == 'boolean' ? t.encode : jt.encode,
      encodeDotInKeys:
        typeof t.encodeDotInKeys == 'boolean' ? t.encodeDotInKeys : jt.encodeDotInKeys,
      encoder: typeof t.encoder == 'function' ? t.encoder : jt.encoder,
      encodeValuesOnly:
        typeof t.encodeValuesOnly == 'boolean' ? t.encodeValuesOnly : jt.encodeValuesOnly,
      filter: n,
      format: i,
      formatter: s,
      serializeDate: typeof t.serializeDate == 'function' ? t.serializeDate : jt.serializeDate,
      skipNulls: typeof t.skipNulls == 'boolean' ? t.skipNulls : jt.skipNulls,
      sort: typeof t.sort == 'function' ? t.sort : null,
      strictNullHandling:
        typeof t.strictNullHandling == 'boolean' ? t.strictNullHandling : jt.strictNullHandling
    }
  },
  GA = function (r, t) {
    var e = r,
      i = kA(t),
      s,
      n
    typeof i.filter == 'function'
      ? ((n = i.filter), (e = n('', e)))
      : $e(i.filter) && ((n = i.filter), (s = n))
    var o = []
    if (typeof e != 'object' || e === null) return ''
    var a = Cf[i.arrayFormat],
      h = a === 'comma' && i.commaRoundTrip
    s || (s = Object.keys(e)), i.sort && s.sort(i.sort)
    for (var l = Sf(), c = 0; c < s.length; ++c) {
      var u = s[c]
      ;(i.skipNulls && e[u] === null) ||
        If(
          o,
          UA(
            e[u],
            u,
            a,
            h,
            i.allowEmptyArrays,
            i.strictNullHandling,
            i.skipNulls,
            i.encodeDotInKeys,
            i.encode ? i.encoder : null,
            i.filter,
            i.sort,
            i.allowDots,
            i.serializeDate,
            i.format,
            i.formatter,
            i.encodeValuesOnly,
            i.charset,
            l
          )
        )
    }
    var d = o.join(i.delimiter),
      f = i.addQueryPrefix === !0 ? '?' : ''
    return (
      i.charsetSentinel &&
        (i.charset === 'iso-8859-1' ? (f += 'utf8=%26%2310003%3B&') : (f += 'utf8=%E2%9C%93&')),
      d.length > 0 ? f + d : ''
    )
  },
  $i = wf,
  oh = Object.prototype.hasOwnProperty,
  HA = Array.isArray,
  Nt = {
    allowDots: !1,
    allowEmptyArrays: !1,
    allowPrototypes: !1,
    allowSparse: !1,
    arrayLimit: 20,
    charset: 'utf-8',
    charsetSentinel: !1,
    comma: !1,
    decodeDotInKeys: !1,
    decoder: $i.decode,
    delimiter: '&',
    depth: 5,
    duplicates: 'combine',
    ignoreQueryPrefix: !1,
    interpretNumericEntities: !1,
    parameterLimit: 1e3,
    parseArrays: !0,
    plainObjects: !1,
    strictNullHandling: !1
  },
  VA = function (r) {
    return r.replace(/&#(\d+);/g, function (t, e) {
      return String.fromCharCode(parseInt(e, 10))
    })
  },
  Rf = function (r, t) {
    return r && typeof r == 'string' && t.comma && r.indexOf(',') > -1 ? r.split(',') : r
  },
  XA = 'utf8=%26%2310003%3B',
  jA = 'utf8=%E2%9C%93',
  WA = function (t, e) {
    var i = { __proto__: null },
      s = e.ignoreQueryPrefix ? t.replace(/^\?/, '') : t,
      n = e.parameterLimit === 1 / 0 ? void 0 : e.parameterLimit,
      o = s.split(e.delimiter, n),
      a = -1,
      h,
      l = e.charset
    if (e.charsetSentinel)
      for (h = 0; h < o.length; ++h)
        o[h].indexOf('utf8=') === 0 &&
          (o[h] === jA ? (l = 'utf-8') : o[h] === XA && (l = 'iso-8859-1'), (a = h), (h = o.length))
    for (h = 0; h < o.length; ++h)
      if (h !== a) {
        var c = o[h],
          u = c.indexOf(']='),
          d = u === -1 ? c.indexOf('=') : u + 1,
          f,
          p
        d === -1
          ? ((f = e.decoder(c, Nt.decoder, l, 'key')), (p = e.strictNullHandling ? null : ''))
          : ((f = e.decoder(c.slice(0, d), Nt.decoder, l, 'key')),
            (p = $i.maybeMap(Rf(c.slice(d + 1), e), function (g) {
              return e.decoder(g, Nt.decoder, l, 'value')
            }))),
          p && e.interpretNumericEntities && l === 'iso-8859-1' && (p = VA(p)),
          c.indexOf('[]=') > -1 && (p = HA(p) ? [p] : p)
        var m = oh.call(i, f)
        m && e.duplicates === 'combine'
          ? (i[f] = $i.combine(i[f], p))
          : (!m || e.duplicates === 'last') && (i[f] = p)
      }
    return i
  },
  $A = function (r, t, e, i) {
    for (var s = i ? t : Rf(t, e), n = r.length - 1; n >= 0; --n) {
      var o,
        a = r[n]
      if (a === '[]' && e.parseArrays) o = e.allowEmptyArrays && s === '' ? [] : [].concat(s)
      else {
        o = e.plainObjects ? Object.create(null) : {}
        var h = a.charAt(0) === '[' && a.charAt(a.length - 1) === ']' ? a.slice(1, -1) : a,
          l = e.decodeDotInKeys ? h.replace(/%2E/g, '.') : h,
          c = parseInt(l, 10)
        !e.parseArrays && l === ''
          ? (o = { 0: s })
          : !isNaN(c) && a !== l && String(c) === l && c >= 0 && e.parseArrays && c <= e.arrayLimit
            ? ((o = []), (o[c] = s))
            : l !== '__proto__' && (o[l] = s)
      }
      s = o
    }
    return s
  },
  zA = function (t, e, i, s) {
    if (t) {
      var n = i.allowDots ? t.replace(/\.([^.[]+)/g, '[$1]') : t,
        o = /(\[[^[\]]*])/,
        a = /(\[[^[\]]*])/g,
        h = i.depth > 0 && o.exec(n),
        l = h ? n.slice(0, h.index) : n,
        c = []
      if (l) {
        if (!i.plainObjects && oh.call(Object.prototype, l) && !i.allowPrototypes) return
        c.push(l)
      }
      for (var u = 0; i.depth > 0 && (h = a.exec(n)) !== null && u < i.depth; ) {
        if (
          ((u += 1),
          !i.plainObjects && oh.call(Object.prototype, h[1].slice(1, -1)) && !i.allowPrototypes)
        )
          return
        c.push(h[1])
      }
      return h && c.push('[' + n.slice(h.index) + ']'), $A(c, e, i, s)
    }
  },
  YA = function (t) {
    if (!t) return Nt
    if (typeof t.allowEmptyArrays < 'u' && typeof t.allowEmptyArrays != 'boolean')
      throw new TypeError('`allowEmptyArrays` option can only be `true` or `false`, when provided')
    if (typeof t.decodeDotInKeys < 'u' && typeof t.decodeDotInKeys != 'boolean')
      throw new TypeError('`decodeDotInKeys` option can only be `true` or `false`, when provided')
    if (t.decoder !== null && typeof t.decoder < 'u' && typeof t.decoder != 'function')
      throw new TypeError('Decoder has to be a function.')
    if (typeof t.charset < 'u' && t.charset !== 'utf-8' && t.charset !== 'iso-8859-1')
      throw new TypeError('The charset option must be either utf-8, iso-8859-1, or undefined')
    var e = typeof t.charset > 'u' ? Nt.charset : t.charset,
      i = typeof t.duplicates > 'u' ? Nt.duplicates : t.duplicates
    if (i !== 'combine' && i !== 'first' && i !== 'last')
      throw new TypeError('The duplicates option must be either combine, first, or last')
    var s =
      typeof t.allowDots > 'u' ? (t.decodeDotInKeys === !0 ? !0 : Nt.allowDots) : !!t.allowDots
    return {
      allowDots: s,
      allowEmptyArrays:
        typeof t.allowEmptyArrays == 'boolean' ? !!t.allowEmptyArrays : Nt.allowEmptyArrays,
      allowPrototypes:
        typeof t.allowPrototypes == 'boolean' ? t.allowPrototypes : Nt.allowPrototypes,
      allowSparse: typeof t.allowSparse == 'boolean' ? t.allowSparse : Nt.allowSparse,
      arrayLimit: typeof t.arrayLimit == 'number' ? t.arrayLimit : Nt.arrayLimit,
      charset: e,
      charsetSentinel:
        typeof t.charsetSentinel == 'boolean' ? t.charsetSentinel : Nt.charsetSentinel,
      comma: typeof t.comma == 'boolean' ? t.comma : Nt.comma,
      decodeDotInKeys:
        typeof t.decodeDotInKeys == 'boolean' ? t.decodeDotInKeys : Nt.decodeDotInKeys,
      decoder: typeof t.decoder == 'function' ? t.decoder : Nt.decoder,
      delimiter:
        typeof t.delimiter == 'string' || $i.isRegExp(t.delimiter) ? t.delimiter : Nt.delimiter,
      depth: typeof t.depth == 'number' || t.depth === !1 ? +t.depth : Nt.depth,
      duplicates: i,
      ignoreQueryPrefix: t.ignoreQueryPrefix === !0,
      interpretNumericEntities:
        typeof t.interpretNumericEntities == 'boolean'
          ? t.interpretNumericEntities
          : Nt.interpretNumericEntities,
      parameterLimit: typeof t.parameterLimit == 'number' ? t.parameterLimit : Nt.parameterLimit,
      parseArrays: t.parseArrays !== !1,
      plainObjects: typeof t.plainObjects == 'boolean' ? t.plainObjects : Nt.plainObjects,
      strictNullHandling:
        typeof t.strictNullHandling == 'boolean' ? t.strictNullHandling : Nt.strictNullHandling
    }
  },
  QA = function (r, t) {
    var e = YA(t)
    if (r === '' || r === null || typeof r > 'u') return e.plainObjects ? Object.create(null) : {}
    for (
      var i = typeof r == 'string' ? WA(r, e) : r,
        s = e.plainObjects ? Object.create(null) : {},
        n = Object.keys(i),
        o = 0;
      o < n.length;
      ++o
    ) {
      var a = n[o],
        h = zA(a, i[a], e, typeof r == 'string')
      s = $i.merge(s, h, e)
    }
    return e.allowSparse === !0 ? s : $i.compact(s)
  },
  KA = GA,
  qA = QA,
  ZA = Il,
  JA = { formats: ZA, parse: qA, stringify: KA },
  t0 = O_
function pr() {
  ;(this.protocol = null),
    (this.slashes = null),
    (this.auth = null),
    (this.host = null),
    (this.port = null),
    (this.hostname = null),
    (this.hash = null),
    (this.search = null),
    (this.query = null),
    (this.pathname = null),
    (this.path = null),
    (this.href = null)
}
var e0 = /^([a-z0-9.+-]+:)/i,
  r0 = /:[0-9]*$/,
  i0 = /^(\/\/?(?!\/)[^?\s]*)(\?[^\s]*)?$/,
  s0 = [
    '<',
    '>',
    '"',
    '`',
    ' ',
    '\r',
    `
`,
    '	'
  ],
  n0 = ['{', '}', '|', '\\', '^', '`'].concat(s0),
  ah = ["'"].concat(n0),
  Kc = ['%', '/', '?', ';', '#'].concat(ah),
  qc = ['/', '?', '#'],
  o0 = 255,
  Zc = /^[+a-z0-9A-Z_-]{0,63}$/,
  a0 = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
  h0 = { javascript: !0, 'javascript:': !0 },
  hh = { javascript: !0, 'javascript:': !0 },
  Ni = {
    http: !0,
    https: !0,
    ftp: !0,
    gopher: !0,
    file: !0,
    'http:': !0,
    'https:': !0,
    'ftp:': !0,
    'gopher:': !0,
    'file:': !0
  },
  lh = JA
function l0(r, t, e) {
  if (r && typeof r == 'object' && r instanceof pr) return r
  var i = new pr()
  return i.parse(r, t, e), i
}
pr.prototype.parse = function (r, t, e) {
  if (typeof r != 'string') throw new TypeError("Parameter 'url' must be a string, not " + typeof r)
  var i = r.indexOf('?'),
    s = i !== -1 && i < r.indexOf('#') ? '?' : '#',
    n = r.split(s),
    o = /\\/g
  ;(n[0] = n[0].replace(o, '/')), (r = n.join(s))
  var a = r
  if (((a = a.trim()), !e && r.split('#').length === 1)) {
    var h = i0.exec(a)
    if (h)
      return (
        (this.path = a),
        (this.href = a),
        (this.pathname = h[1]),
        h[2]
          ? ((this.search = h[2]),
            t
              ? (this.query = lh.parse(this.search.substr(1)))
              : (this.query = this.search.substr(1)))
          : t && ((this.search = ''), (this.query = {})),
        this
      )
  }
  var l = e0.exec(a)
  if (l) {
    l = l[0]
    var c = l.toLowerCase()
    ;(this.protocol = c), (a = a.substr(l.length))
  }
  if (e || l || a.match(/^\/\/[^@/]+@[^@/]+/)) {
    var u = a.substr(0, 2) === '//'
    u && !(l && hh[l]) && ((a = a.substr(2)), (this.slashes = !0))
  }
  if (!hh[l] && (u || (l && !Ni[l]))) {
    for (var d = -1, f = 0; f < qc.length; f++) {
      var p = a.indexOf(qc[f])
      p !== -1 && (d === -1 || p < d) && (d = p)
    }
    var m, g
    d === -1 ? (g = a.lastIndexOf('@')) : (g = a.lastIndexOf('@', d)),
      g !== -1 && ((m = a.slice(0, g)), (a = a.slice(g + 1)), (this.auth = decodeURIComponent(m))),
      (d = -1)
    for (var f = 0; f < Kc.length; f++) {
      var p = a.indexOf(Kc[f])
      p !== -1 && (d === -1 || p < d) && (d = p)
    }
    d === -1 && (d = a.length),
      (this.host = a.slice(0, d)),
      (a = a.slice(d)),
      this.parseHost(),
      (this.hostname = this.hostname || '')
    var A = this.hostname[0] === '[' && this.hostname[this.hostname.length - 1] === ']'
    if (!A)
      for (var x = this.hostname.split(/\./), f = 0, _ = x.length; f < _; f++) {
        var v = x[f]
        if (v && !v.match(Zc)) {
          for (var S = '', C = 0, I = v.length; C < I; C++)
            v.charCodeAt(C) > 127 ? (S += 'x') : (S += v[C])
          if (!S.match(Zc)) {
            var T = x.slice(0, f),
              F = x.slice(f + 1),
              k = v.match(a0)
            k && (T.push(k[1]), F.unshift(k[2])),
              F.length && (a = '/' + F.join('.') + a),
              (this.hostname = T.join('.'))
            break
          }
        }
      }
    this.hostname.length > o0
      ? (this.hostname = '')
      : (this.hostname = this.hostname.toLowerCase()),
      A || (this.hostname = t0.toASCII(this.hostname))
    var rt = this.port ? ':' + this.port : '',
      G = this.hostname || ''
    ;(this.host = G + rt),
      (this.href += this.host),
      A &&
        ((this.hostname = this.hostname.substr(1, this.hostname.length - 2)),
        a[0] !== '/' && (a = '/' + a))
  }
  if (!h0[c])
    for (var f = 0, _ = ah.length; f < _; f++) {
      var E = ah[f]
      if (a.indexOf(E) !== -1) {
        var M = encodeURIComponent(E)
        M === E && (M = escape(E)), (a = a.split(E).join(M))
      }
    }
  var K = a.indexOf('#')
  K !== -1 && ((this.hash = a.substr(K)), (a = a.slice(0, K)))
  var Z = a.indexOf('?')
  if (
    (Z !== -1
      ? ((this.search = a.substr(Z)),
        (this.query = a.substr(Z + 1)),
        t && (this.query = lh.parse(this.query)),
        (a = a.slice(0, Z)))
      : t && ((this.search = ''), (this.query = {})),
    a && (this.pathname = a),
    Ni[c] && this.hostname && !this.pathname && (this.pathname = '/'),
    this.pathname || this.search)
  ) {
    var rt = this.pathname || '',
      H = this.search || ''
    this.path = rt + H
  }
  return (this.href = this.format()), this
}
pr.prototype.format = function () {
  var r = this.auth || ''
  r && ((r = encodeURIComponent(r)), (r = r.replace(/%3A/i, ':')), (r += '@'))
  var t = this.protocol || '',
    e = this.pathname || '',
    i = this.hash || '',
    s = !1,
    n = ''
  this.host
    ? (s = r + this.host)
    : this.hostname &&
      ((s = r + (this.hostname.indexOf(':') === -1 ? this.hostname : '[' + this.hostname + ']')),
      this.port && (s += ':' + this.port)),
    this.query &&
      typeof this.query == 'object' &&
      Object.keys(this.query).length &&
      (n = lh.stringify(this.query, { arrayFormat: 'repeat', addQueryPrefix: !1 }))
  var o = this.search || (n && '?' + n) || ''
  return (
    t && t.substr(-1) !== ':' && (t += ':'),
    this.slashes || ((!t || Ni[t]) && s !== !1)
      ? ((s = '//' + (s || '')), e && e.charAt(0) !== '/' && (e = '/' + e))
      : s || (s = ''),
    i && i.charAt(0) !== '#' && (i = '#' + i),
    o && o.charAt(0) !== '?' && (o = '?' + o),
    (e = e.replace(/[?#]/g, function (a) {
      return encodeURIComponent(a)
    })),
    (o = o.replace('#', '%23')),
    t + s + e + o + i
  )
}
pr.prototype.resolve = function (r) {
  return this.resolveObject(l0(r, !1, !0)).format()
}
pr.prototype.resolveObject = function (r) {
  if (typeof r == 'string') {
    var t = new pr()
    t.parse(r, !1, !0), (r = t)
  }
  for (var e = new pr(), i = Object.keys(this), s = 0; s < i.length; s++) {
    var n = i[s]
    e[n] = this[n]
  }
  if (((e.hash = r.hash), r.href === '')) return (e.href = e.format()), e
  if (r.slashes && !r.protocol) {
    for (var o = Object.keys(r), a = 0; a < o.length; a++) {
      var h = o[a]
      h !== 'protocol' && (e[h] = r[h])
    }
    return (
      Ni[e.protocol] && e.hostname && !e.pathname && ((e.pathname = '/'), (e.path = e.pathname)),
      (e.href = e.format()),
      e
    )
  }
  if (r.protocol && r.protocol !== e.protocol) {
    if (!Ni[r.protocol]) {
      for (var l = Object.keys(r), c = 0; c < l.length; c++) {
        var u = l[c]
        e[u] = r[u]
      }
      return (e.href = e.format()), e
    }
    if (((e.protocol = r.protocol), !r.host && !hh[r.protocol])) {
      for (var _ = (r.pathname || '').split('/'); _.length && !(r.host = _.shift()); );
      r.host || (r.host = ''),
        r.hostname || (r.hostname = ''),
        _[0] !== '' && _.unshift(''),
        _.length < 2 && _.unshift(''),
        (e.pathname = _.join('/'))
    } else e.pathname = r.pathname
    if (
      ((e.search = r.search),
      (e.query = r.query),
      (e.host = r.host || ''),
      (e.auth = r.auth),
      (e.hostname = r.hostname || r.host),
      (e.port = r.port),
      e.pathname || e.search)
    ) {
      var d = e.pathname || '',
        f = e.search || ''
      e.path = d + f
    }
    return (e.slashes = e.slashes || r.slashes), (e.href = e.format()), e
  }
  var p = e.pathname && e.pathname.charAt(0) === '/',
    m = r.host || (r.pathname && r.pathname.charAt(0) === '/'),
    g = m || p || (e.host && r.pathname),
    A = g,
    x = (e.pathname && e.pathname.split('/')) || [],
    _ = (r.pathname && r.pathname.split('/')) || [],
    v = e.protocol && !Ni[e.protocol]
  if (
    (v &&
      ((e.hostname = ''),
      (e.port = null),
      e.host && (x[0] === '' ? (x[0] = e.host) : x.unshift(e.host)),
      (e.host = ''),
      r.protocol &&
        ((r.hostname = null),
        (r.port = null),
        r.host && (_[0] === '' ? (_[0] = r.host) : _.unshift(r.host)),
        (r.host = null)),
      (g = g && (_[0] === '' || x[0] === ''))),
    m)
  )
    (e.host = r.host || r.host === '' ? r.host : e.host),
      (e.hostname = r.hostname || r.hostname === '' ? r.hostname : e.hostname),
      (e.search = r.search),
      (e.query = r.query),
      (x = _)
  else if (_.length)
    x || (x = []), x.pop(), (x = x.concat(_)), (e.search = r.search), (e.query = r.query)
  else if (r.search != null) {
    if (v) {
      ;(e.host = x.shift()), (e.hostname = e.host)
      var S = e.host && e.host.indexOf('@') > 0 ? e.host.split('@') : !1
      S && ((e.auth = S.shift()), (e.hostname = S.shift()), (e.host = e.hostname))
    }
    return (
      (e.search = r.search),
      (e.query = r.query),
      (e.pathname !== null || e.search !== null) &&
        (e.path = (e.pathname ? e.pathname : '') + (e.search ? e.search : '')),
      (e.href = e.format()),
      e
    )
  }
  if (!x.length)
    return (
      (e.pathname = null),
      e.search ? (e.path = '/' + e.search) : (e.path = null),
      (e.href = e.format()),
      e
    )
  for (
    var C = x.slice(-1)[0],
      I = ((e.host || r.host || x.length > 1) && (C === '.' || C === '..')) || C === '',
      T = 0,
      F = x.length;
    F >= 0;
    F--
  )
    (C = x[F]),
      C === '.' ? x.splice(F, 1) : C === '..' ? (x.splice(F, 1), T++) : T && (x.splice(F, 1), T--)
  if (!g && !A) for (; T--; T) x.unshift('..')
  g && x[0] !== '' && (!x[0] || x[0].charAt(0) !== '/') && x.unshift(''),
    I && x.join('/').substr(-1) !== '/' && x.push('')
  var k = x[0] === '' || (x[0] && x[0].charAt(0) === '/')
  if (v) {
    ;(e.hostname = k ? '' : x.length ? x.shift() : ''), (e.host = e.hostname)
    var S = e.host && e.host.indexOf('@') > 0 ? e.host.split('@') : !1
    S && ((e.auth = S.shift()), (e.hostname = S.shift()), (e.host = e.hostname))
  }
  return (
    (g = g || (e.host && x.length)),
    g && !k && x.unshift(''),
    x.length > 0 ? (e.pathname = x.join('/')) : ((e.pathname = null), (e.path = null)),
    (e.pathname !== null || e.search !== null) &&
      (e.path = (e.pathname ? e.pathname : '') + (e.search ? e.search : '')),
    (e.auth = r.auth || e.auth),
    (e.slashes = e.slashes || r.slashes),
    (e.href = e.format()),
    e
  )
}
pr.prototype.parseHost = function () {
  var r = this.host,
    t = r0.exec(r)
  t && ((t = t[0]), t !== ':' && (this.port = t.substr(1)), (r = r.substr(0, r.length - t.length))),
    r && (this.hostname = r)
}
const Jc = {}
function ut(r, t, e = 3) {
  if (Jc[t]) return
  let i = new Error().stack
  typeof i > 'u'
    ? console.warn(
        'PixiJS Deprecation Warning: ',
        `${t}
Deprecated since v${r}`
      )
    : ((i = i
        .split(
          `
`
        )
        .splice(e).join(`
`)),
      console.groupCollapsed
        ? (console.groupCollapsed(
            '%cPixiJS Deprecation Warning: %c%s',
            'color:#614108;background:#fffbe6',
            'font-weight:normal;color:#614108;background:#fffbe6',
            `${t}
Deprecated since v${r}`
          ),
          console.warn(i),
          console.groupEnd())
        : (console.warn(
            'PixiJS Deprecation Warning: ',
            `${t}
Deprecated since v${r}`
          ),
          console.warn(i))),
    (Jc[t] = !0)
}
function Ie(r) {
  if (typeof r != 'string')
    throw new TypeError(`Path must be a string. Received ${JSON.stringify(r)}`)
}
function es(r) {
  return r.split('?')[0].split('#')[0]
}
function c0(r) {
  return r.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}
function u0(r, t, e) {
  return r.replace(new RegExp(c0(t), 'g'), e)
}
function d0(r, t) {
  let e = '',
    i = 0,
    s = -1,
    n = 0,
    o = -1
  for (let a = 0; a <= r.length; ++a) {
    if (a < r.length) o = r.charCodeAt(a)
    else {
      if (o === 47) break
      o = 47
    }
    if (o === 47) {
      if (!(s === a - 1 || n === 1))
        if (s !== a - 1 && n === 2) {
          if (
            e.length < 2 ||
            i !== 2 ||
            e.charCodeAt(e.length - 1) !== 46 ||
            e.charCodeAt(e.length - 2) !== 46
          ) {
            if (e.length > 2) {
              const h = e.lastIndexOf('/')
              if (h !== e.length - 1) {
                h === -1
                  ? ((e = ''), (i = 0))
                  : ((e = e.slice(0, h)), (i = e.length - 1 - e.lastIndexOf('/'))),
                  (s = a),
                  (n = 0)
                continue
              }
            } else if (e.length === 2 || e.length === 1) {
              ;(e = ''), (i = 0), (s = a), (n = 0)
              continue
            }
          }
          t && (e.length > 0 ? (e += '/..') : (e = '..'), (i = 2))
        } else
          e.length > 0 ? (e += `/${r.slice(s + 1, a)}`) : (e = r.slice(s + 1, a)), (i = a - s - 1)
      ;(s = a), (n = 0)
    } else o === 46 && n !== -1 ? ++n : (n = -1)
  }
  return e
}
const Kt = {
  toPosix(r) {
    return u0(r, '\\', '/')
  },
  isUrl(r) {
    return /^https?:/.test(this.toPosix(r))
  },
  isDataUrl(r) {
    return /^data:([a-z]+\/[a-z0-9-+.]+(;[a-z0-9-.!#$%*+.{}|~`]+=[a-z0-9-.!#$%*+.{}()_|~`]+)*)?(;base64)?,([a-z0-9!$&',()*+;=\-._~:@\/?%\s<>]*?)$/i.test(
      r
    )
  },
  isBlobUrl(r) {
    return r.startsWith('blob:')
  },
  hasProtocol(r) {
    return /^[^/:]+:/.test(this.toPosix(r))
  },
  getProtocol(r) {
    Ie(r), (r = this.toPosix(r))
    const t = /^file:\/\/\//.exec(r)
    if (t) return t[0]
    const e = /^[^/:]+:\/{0,2}/.exec(r)
    return e ? e[0] : ''
  },
  toAbsolute(r, t, e) {
    if ((Ie(r), this.isDataUrl(r) || this.isBlobUrl(r))) return r
    const i = es(this.toPosix(t ?? Y.ADAPTER.getBaseUrl())),
      s = es(this.toPosix(e ?? this.rootname(i)))
    return (
      (r = this.toPosix(r)),
      r.startsWith('/') ? Kt.join(s, r.slice(1)) : this.isAbsolute(r) ? r : this.join(i, r)
    )
  },
  normalize(r) {
    if ((Ie(r), r.length === 0)) return '.'
    if (this.isDataUrl(r) || this.isBlobUrl(r)) return r
    r = this.toPosix(r)
    let t = ''
    const e = r.startsWith('/')
    this.hasProtocol(r) && ((t = this.rootname(r)), (r = r.slice(t.length)))
    const i = r.endsWith('/')
    return (r = d0(r, !1)), r.length > 0 && i && (r += '/'), e ? `/${r}` : t + r
  },
  isAbsolute(r) {
    return Ie(r), (r = this.toPosix(r)), this.hasProtocol(r) ? !0 : r.startsWith('/')
  },
  join(...r) {
    if (r.length === 0) return '.'
    let t
    for (let e = 0; e < r.length; ++e) {
      const i = r[e]
      if ((Ie(i), i.length > 0))
        if (t === void 0) t = i
        else {
          const s = r[e - 1] ?? ''
          this.joinExtensions.includes(this.extname(s).toLowerCase())
            ? (t += `/../${i}`)
            : (t += `/${i}`)
        }
    }
    return t === void 0 ? '.' : this.normalize(t)
  },
  dirname(r) {
    if ((Ie(r), r.length === 0)) return '.'
    r = this.toPosix(r)
    let t = r.charCodeAt(0)
    const e = t === 47
    let i = -1,
      s = !0
    const n = this.getProtocol(r),
      o = r
    r = r.slice(n.length)
    for (let a = r.length - 1; a >= 1; --a)
      if (((t = r.charCodeAt(a)), t === 47)) {
        if (!s) {
          i = a
          break
        }
      } else s = !1
    return i === -1
      ? e
        ? '/'
        : this.isUrl(o)
          ? n + r
          : n
      : e && i === 1
        ? '//'
        : n + r.slice(0, i)
  },
  rootname(r) {
    Ie(r), (r = this.toPosix(r))
    let t = ''
    if ((r.startsWith('/') ? (t = '/') : (t = this.getProtocol(r)), this.isUrl(r))) {
      const e = r.indexOf('/', t.length)
      e !== -1 ? (t = r.slice(0, e)) : (t = r), t.endsWith('/') || (t += '/')
    }
    return t
  },
  basename(r, t) {
    Ie(r), t && Ie(t), (r = es(this.toPosix(r)))
    let e = 0,
      i = -1,
      s = !0,
      n
    if (t !== void 0 && t.length > 0 && t.length <= r.length) {
      if (t.length === r.length && t === r) return ''
      let o = t.length - 1,
        a = -1
      for (n = r.length - 1; n >= 0; --n) {
        const h = r.charCodeAt(n)
        if (h === 47) {
          if (!s) {
            e = n + 1
            break
          }
        } else
          a === -1 && ((s = !1), (a = n + 1)),
            o >= 0 && (h === t.charCodeAt(o) ? --o === -1 && (i = n) : ((o = -1), (i = a)))
      }
      return e === i ? (i = a) : i === -1 && (i = r.length), r.slice(e, i)
    }
    for (n = r.length - 1; n >= 0; --n)
      if (r.charCodeAt(n) === 47) {
        if (!s) {
          e = n + 1
          break
        }
      } else i === -1 && ((s = !1), (i = n + 1))
    return i === -1 ? '' : r.slice(e, i)
  },
  extname(r) {
    Ie(r), (r = es(this.toPosix(r)))
    let t = -1,
      e = 0,
      i = -1,
      s = !0,
      n = 0
    for (let o = r.length - 1; o >= 0; --o) {
      const a = r.charCodeAt(o)
      if (a === 47) {
        if (!s) {
          e = o + 1
          break
        }
        continue
      }
      i === -1 && ((s = !1), (i = o + 1)),
        a === 46 ? (t === -1 ? (t = o) : n !== 1 && (n = 1)) : t !== -1 && (n = -1)
    }
    return t === -1 || i === -1 || n === 0 || (n === 1 && t === i - 1 && t === e + 1)
      ? ''
      : r.slice(t, i)
  },
  parse(r) {
    Ie(r)
    const t = { root: '', dir: '', base: '', ext: '', name: '' }
    if (r.length === 0) return t
    r = es(this.toPosix(r))
    let e = r.charCodeAt(0)
    const i = this.isAbsolute(r)
    let s
    ;(t.root = this.rootname(r)), i || this.hasProtocol(r) ? (s = 1) : (s = 0)
    let n = -1,
      o = 0,
      a = -1,
      h = !0,
      l = r.length - 1,
      c = 0
    for (; l >= s; --l) {
      if (((e = r.charCodeAt(l)), e === 47)) {
        if (!h) {
          o = l + 1
          break
        }
        continue
      }
      a === -1 && ((h = !1), (a = l + 1)),
        e === 46 ? (n === -1 ? (n = l) : c !== 1 && (c = 1)) : n !== -1 && (c = -1)
    }
    return (
      n === -1 || a === -1 || c === 0 || (c === 1 && n === a - 1 && n === o + 1)
        ? a !== -1 &&
          (o === 0 && i ? (t.base = t.name = r.slice(1, a)) : (t.base = t.name = r.slice(o, a)))
        : (o === 0 && i
            ? ((t.name = r.slice(1, n)), (t.base = r.slice(1, a)))
            : ((t.name = r.slice(o, n)), (t.base = r.slice(o, a))),
          (t.ext = r.slice(n, a))),
      (t.dir = this.dirname(r)),
      t
    )
  },
  sep: '/',
  delimiter: ':',
  joinExtensions: ['.html']
}
let ca
async function f0() {
  return (
    ca ??
      (ca = (async () => {
        var n
        const r = document.createElement('canvas').getContext('webgl')
        if (!r) return de.UNPACK
        const t = await new Promise((o) => {
          const a = document.createElement('video')
          ;(a.onloadeddata = () => o(a)),
            (a.onerror = () => o(null)),
            (a.autoplay = !1),
            (a.crossOrigin = 'anonymous'),
            (a.preload = 'auto'),
            (a.src =
              'data:video/webm;base64,GkXfo59ChoEBQveBAULygQRC84EIQoKEd2VibUKHgQJChYECGFOAZwEAAAAAAAHTEU2bdLpNu4tTq4QVSalmU6yBoU27i1OrhBZUrmtTrIHGTbuMU6uEElTDZ1OsggEXTbuMU6uEHFO7a1OsggG97AEAAAAAAABZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVSalmoCrXsYMPQkBNgIRMYXZmV0GETGF2ZkSJiEBEAAAAAAAAFlSua8yuAQAAAAAAAEPXgQFzxYgAAAAAAAAAAZyBACK1nIN1bmSIgQCGhVZfVlA5g4EBI+ODhAJiWgDglLCBArqBApqBAlPAgQFVsIRVuYEBElTDZ9Vzc9JjwItjxYgAAAAAAAAAAWfInEWjh0VOQ09ERVJEh49MYXZjIGxpYnZweC12cDlnyKJFo4hEVVJBVElPTkSHlDAwOjAwOjAwLjA0MDAwMDAwMAAAH0O2dcfngQCgwqGggQAAAIJJg0IAABAAFgA4JBwYSgAAICAAEb///4r+AAB1oZ2mm+6BAaWWgkmDQgAAEAAWADgkHBhKAAAgIABIQBxTu2uRu4+zgQC3iveBAfGCAXHwgQM='),
            a.load()
        })
        if (!t) return de.UNPACK
        const e = r.createTexture()
        r.bindTexture(r.TEXTURE_2D, e)
        const i = r.createFramebuffer()
        r.bindFramebuffer(r.FRAMEBUFFER, i),
          r.framebufferTexture2D(r.FRAMEBUFFER, r.COLOR_ATTACHMENT0, r.TEXTURE_2D, e, 0),
          r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !1),
          r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL, r.NONE),
          r.texImage2D(r.TEXTURE_2D, 0, r.RGBA, r.RGBA, r.UNSIGNED_BYTE, t)
        const s = new Uint8Array(4)
        return (
          r.readPixels(0, 0, 1, 1, r.RGBA, r.UNSIGNED_BYTE, s),
          r.deleteFramebuffer(i),
          r.deleteTexture(e),
          (n = r.getExtension('WEBGL_lose_context')) == null || n.loseContext(),
          s[0] <= s[3] ? de.PMA : de.UNPACK
        )
      })()),
    ca
  )
}
let ua
function p0() {
  return (
    typeof ua > 'u' &&
      (ua = (function () {
        var t
        const r = { stencil: !0, failIfMajorPerformanceCaveat: Y.FAIL_IF_MAJOR_PERFORMANCE_CAVEAT }
        try {
          if (!Y.ADAPTER.getWebGLRenderingContext()) return !1
          const e = Y.ADAPTER.createCanvas()
          let i = e.getContext('webgl', r) || e.getContext('experimental-webgl', r)
          const s = !!((t = i == null ? void 0 : i.getContextAttributes()) != null && t.stencil)
          if (i) {
            const n = i.getExtension('WEBGL_lose_context')
            n && n.loseContext()
          }
          return (i = null), s
        } catch {
          return !1
        }
      })()),
    ua
  )
}
var m0 = { grad: 0.9, turn: 360, rad: 360 / (2 * Math.PI) },
  hr = function (r) {
    return typeof r == 'string' ? r.length > 0 : typeof r == 'number'
  },
  Yt = function (r, t, e) {
    return t === void 0 && (t = 0), e === void 0 && (e = Math.pow(10, t)), Math.round(e * r) / e + 0
  },
  we = function (r, t, e) {
    return t === void 0 && (t = 0), e === void 0 && (e = 1), r > e ? e : r > t ? r : t
  },
  Pf = function (r) {
    return (r = isFinite(r) ? r % 360 : 0) > 0 ? r : r + 360
  },
  tu = function (r) {
    return { r: we(r.r, 0, 255), g: we(r.g, 0, 255), b: we(r.b, 0, 255), a: we(r.a) }
  },
  da = function (r) {
    return { r: Yt(r.r), g: Yt(r.g), b: Yt(r.b), a: Yt(r.a, 3) }
  },
  g0 = /^#([0-9a-f]{3,8})$/i,
  cn = function (r) {
    var t = r.toString(16)
    return t.length < 2 ? '0' + t : t
  },
  Mf = function (r) {
    var t = r.r,
      e = r.g,
      i = r.b,
      s = r.a,
      n = Math.max(t, e, i),
      o = n - Math.min(t, e, i),
      a = o ? (n === t ? (e - i) / o : n === e ? 2 + (i - t) / o : 4 + (t - e) / o) : 0
    return { h: 60 * (a < 0 ? a + 6 : a), s: n ? (o / n) * 100 : 0, v: (n / 255) * 100, a: s }
  },
  Bf = function (r) {
    var t = r.h,
      e = r.s,
      i = r.v,
      s = r.a
    ;(t = (t / 360) * 6), (e /= 100), (i /= 100)
    var n = Math.floor(t),
      o = i * (1 - e),
      a = i * (1 - (t - n) * e),
      h = i * (1 - (1 - t + n) * e),
      l = n % 6
    return {
      r: 255 * [i, a, o, o, h, i][l],
      g: 255 * [h, i, i, a, o, o][l],
      b: 255 * [o, o, h, i, i, a][l],
      a: s
    }
  },
  eu = function (r) {
    return { h: Pf(r.h), s: we(r.s, 0, 100), l: we(r.l, 0, 100), a: we(r.a) }
  },
  ru = function (r) {
    return { h: Yt(r.h), s: Yt(r.s), l: Yt(r.l), a: Yt(r.a, 3) }
  },
  iu = function (r) {
    return Bf(
      ((e = (t = r).s),
      {
        h: t.h,
        s: (e *= ((i = t.l) < 50 ? i : 100 - i) / 100) > 0 ? ((2 * e) / (i + e)) * 100 : 0,
        v: i + e,
        a: t.a
      })
    )
  },
  Ss = function (r) {
    return {
      h: (t = Mf(r)).h,
      s:
        (s = ((200 - (e = t.s)) * (i = t.v)) / 100) > 0 && s < 200
          ? ((e * i) / 100 / (s <= 100 ? s : 200 - s)) * 100
          : 0,
      l: s / 2,
      a: t.a
    }
  },
  _0 =
    /^hsla?\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s*,\s*([+-]?\d*\.?\d+)%\s*,\s*([+-]?\d*\.?\d+)%\s*(?:,\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,
  y0 =
    /^hsla?\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s+([+-]?\d*\.?\d+)%\s+([+-]?\d*\.?\d+)%\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,
  A0 =
    /^rgba?\(\s*([+-]?\d*\.?\d+)(%)?\s*,\s*([+-]?\d*\.?\d+)(%)?\s*,\s*([+-]?\d*\.?\d+)(%)?\s*(?:,\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,
  v0 =
    /^rgba?\(\s*([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,
  ch = {
    string: [
      [
        function (r) {
          var t = g0.exec(r)
          return t
            ? (r = t[1]).length <= 4
              ? {
                  r: parseInt(r[0] + r[0], 16),
                  g: parseInt(r[1] + r[1], 16),
                  b: parseInt(r[2] + r[2], 16),
                  a: r.length === 4 ? Yt(parseInt(r[3] + r[3], 16) / 255, 2) : 1
                }
              : r.length === 6 || r.length === 8
                ? {
                    r: parseInt(r.substr(0, 2), 16),
                    g: parseInt(r.substr(2, 2), 16),
                    b: parseInt(r.substr(4, 2), 16),
                    a: r.length === 8 ? Yt(parseInt(r.substr(6, 2), 16) / 255, 2) : 1
                  }
                : null
            : null
        },
        'hex'
      ],
      [
        function (r) {
          var t = A0.exec(r) || v0.exec(r)
          return t
            ? t[2] !== t[4] || t[4] !== t[6]
              ? null
              : tu({
                  r: Number(t[1]) / (t[2] ? 100 / 255 : 1),
                  g: Number(t[3]) / (t[4] ? 100 / 255 : 1),
                  b: Number(t[5]) / (t[6] ? 100 / 255 : 1),
                  a: t[7] === void 0 ? 1 : Number(t[7]) / (t[8] ? 100 : 1)
                })
            : null
        },
        'rgb'
      ],
      [
        function (r) {
          var t = _0.exec(r) || y0.exec(r)
          if (!t) return null
          var e,
            i,
            s = eu({
              h: ((e = t[1]), (i = t[2]), i === void 0 && (i = 'deg'), Number(e) * (m0[i] || 1)),
              s: Number(t[3]),
              l: Number(t[4]),
              a: t[5] === void 0 ? 1 : Number(t[5]) / (t[6] ? 100 : 1)
            })
          return iu(s)
        },
        'hsl'
      ]
    ],
    object: [
      [
        function (r) {
          var t = r.r,
            e = r.g,
            i = r.b,
            s = r.a,
            n = s === void 0 ? 1 : s
          return hr(t) && hr(e) && hr(i)
            ? tu({ r: Number(t), g: Number(e), b: Number(i), a: Number(n) })
            : null
        },
        'rgb'
      ],
      [
        function (r) {
          var t = r.h,
            e = r.s,
            i = r.l,
            s = r.a,
            n = s === void 0 ? 1 : s
          if (!hr(t) || !hr(e) || !hr(i)) return null
          var o = eu({ h: Number(t), s: Number(e), l: Number(i), a: Number(n) })
          return iu(o)
        },
        'hsl'
      ],
      [
        function (r) {
          var t = r.h,
            e = r.s,
            i = r.v,
            s = r.a,
            n = s === void 0 ? 1 : s
          if (!hr(t) || !hr(e) || !hr(i)) return null
          var o = (function (a) {
            return { h: Pf(a.h), s: we(a.s, 0, 100), v: we(a.v, 0, 100), a: we(a.a) }
          })({ h: Number(t), s: Number(e), v: Number(i), a: Number(n) })
          return Bf(o)
        },
        'hsv'
      ]
    ]
  },
  su = function (r, t) {
    for (var e = 0; e < t.length; e++) {
      var i = t[e][0](r)
      if (i) return [i, t[e][1]]
    }
    return [null, void 0]
  },
  x0 = function (r) {
    return typeof r == 'string'
      ? su(r.trim(), ch.string)
      : typeof r == 'object' && r !== null
        ? su(r, ch.object)
        : [null, void 0]
  },
  fa = function (r, t) {
    var e = Ss(r)
    return { h: e.h, s: we(e.s + 100 * t, 0, 100), l: e.l, a: e.a }
  },
  pa = function (r) {
    return (299 * r.r + 587 * r.g + 114 * r.b) / 1e3 / 255
  },
  nu = function (r, t) {
    var e = Ss(r)
    return { h: e.h, s: e.s, l: we(e.l + 100 * t, 0, 100), a: e.a }
  },
  uh = (function () {
    function r(t) {
      ;(this.parsed = x0(t)[0]), (this.rgba = this.parsed || { r: 0, g: 0, b: 0, a: 1 })
    }
    return (
      (r.prototype.isValid = function () {
        return this.parsed !== null
      }),
      (r.prototype.brightness = function () {
        return Yt(pa(this.rgba), 2)
      }),
      (r.prototype.isDark = function () {
        return pa(this.rgba) < 0.5
      }),
      (r.prototype.isLight = function () {
        return pa(this.rgba) >= 0.5
      }),
      (r.prototype.toHex = function () {
        return (
          (t = da(this.rgba)),
          (e = t.r),
          (i = t.g),
          (s = t.b),
          (o = (n = t.a) < 1 ? cn(Yt(255 * n)) : ''),
          '#' + cn(e) + cn(i) + cn(s) + o
        )
      }),
      (r.prototype.toRgb = function () {
        return da(this.rgba)
      }),
      (r.prototype.toRgbString = function () {
        return (
          (t = da(this.rgba)),
          (e = t.r),
          (i = t.g),
          (s = t.b),
          (n = t.a) < 1
            ? 'rgba(' + e + ', ' + i + ', ' + s + ', ' + n + ')'
            : 'rgb(' + e + ', ' + i + ', ' + s + ')'
        )
      }),
      (r.prototype.toHsl = function () {
        return ru(Ss(this.rgba))
      }),
      (r.prototype.toHslString = function () {
        return (
          (t = ru(Ss(this.rgba))),
          (e = t.h),
          (i = t.s),
          (s = t.l),
          (n = t.a) < 1
            ? 'hsla(' + e + ', ' + i + '%, ' + s + '%, ' + n + ')'
            : 'hsl(' + e + ', ' + i + '%, ' + s + '%)'
        )
      }),
      (r.prototype.toHsv = function () {
        return (t = Mf(this.rgba)), { h: Yt(t.h), s: Yt(t.s), v: Yt(t.v), a: Yt(t.a, 3) }
      }),
      (r.prototype.invert = function () {
        return He({ r: 255 - (t = this.rgba).r, g: 255 - t.g, b: 255 - t.b, a: t.a })
      }),
      (r.prototype.saturate = function (t) {
        return t === void 0 && (t = 0.1), He(fa(this.rgba, t))
      }),
      (r.prototype.desaturate = function (t) {
        return t === void 0 && (t = 0.1), He(fa(this.rgba, -t))
      }),
      (r.prototype.grayscale = function () {
        return He(fa(this.rgba, -1))
      }),
      (r.prototype.lighten = function (t) {
        return t === void 0 && (t = 0.1), He(nu(this.rgba, t))
      }),
      (r.prototype.darken = function (t) {
        return t === void 0 && (t = 0.1), He(nu(this.rgba, -t))
      }),
      (r.prototype.rotate = function (t) {
        return t === void 0 && (t = 15), this.hue(this.hue() + t)
      }),
      (r.prototype.alpha = function (t) {
        return typeof t == 'number'
          ? He({ r: (e = this.rgba).r, g: e.g, b: e.b, a: t })
          : Yt(this.rgba.a, 3)
      }),
      (r.prototype.hue = function (t) {
        var e = Ss(this.rgba)
        return typeof t == 'number' ? He({ h: t, s: e.s, l: e.l, a: e.a }) : Yt(e.h)
      }),
      (r.prototype.isEqual = function (t) {
        return this.toHex() === He(t).toHex()
      }),
      r
    )
  })(),
  He = function (r) {
    return r instanceof uh ? r : new uh(r)
  },
  ou = [],
  b0 = function (r) {
    r.forEach(function (t) {
      ou.indexOf(t) < 0 && (t(uh, ch), ou.push(t))
    })
  }
function E0(r, t) {
  var e = {
      white: '#ffffff',
      bisque: '#ffe4c4',
      blue: '#0000ff',
      cadetblue: '#5f9ea0',
      chartreuse: '#7fff00',
      chocolate: '#d2691e',
      coral: '#ff7f50',
      antiquewhite: '#faebd7',
      aqua: '#00ffff',
      azure: '#f0ffff',
      whitesmoke: '#f5f5f5',
      papayawhip: '#ffefd5',
      plum: '#dda0dd',
      blanchedalmond: '#ffebcd',
      black: '#000000',
      gold: '#ffd700',
      goldenrod: '#daa520',
      gainsboro: '#dcdcdc',
      cornsilk: '#fff8dc',
      cornflowerblue: '#6495ed',
      burlywood: '#deb887',
      aquamarine: '#7fffd4',
      beige: '#f5f5dc',
      crimson: '#dc143c',
      cyan: '#00ffff',
      darkblue: '#00008b',
      darkcyan: '#008b8b',
      darkgoldenrod: '#b8860b',
      darkkhaki: '#bdb76b',
      darkgray: '#a9a9a9',
      darkgreen: '#006400',
      darkgrey: '#a9a9a9',
      peachpuff: '#ffdab9',
      darkmagenta: '#8b008b',
      darkred: '#8b0000',
      darkorchid: '#9932cc',
      darkorange: '#ff8c00',
      darkslateblue: '#483d8b',
      gray: '#808080',
      darkslategray: '#2f4f4f',
      darkslategrey: '#2f4f4f',
      deeppink: '#ff1493',
      deepskyblue: '#00bfff',
      wheat: '#f5deb3',
      firebrick: '#b22222',
      floralwhite: '#fffaf0',
      ghostwhite: '#f8f8ff',
      darkviolet: '#9400d3',
      magenta: '#ff00ff',
      green: '#008000',
      dodgerblue: '#1e90ff',
      grey: '#808080',
      honeydew: '#f0fff0',
      hotpink: '#ff69b4',
      blueviolet: '#8a2be2',
      forestgreen: '#228b22',
      lawngreen: '#7cfc00',
      indianred: '#cd5c5c',
      indigo: '#4b0082',
      fuchsia: '#ff00ff',
      brown: '#a52a2a',
      maroon: '#800000',
      mediumblue: '#0000cd',
      lightcoral: '#f08080',
      darkturquoise: '#00ced1',
      lightcyan: '#e0ffff',
      ivory: '#fffff0',
      lightyellow: '#ffffe0',
      lightsalmon: '#ffa07a',
      lightseagreen: '#20b2aa',
      linen: '#faf0e6',
      mediumaquamarine: '#66cdaa',
      lemonchiffon: '#fffacd',
      lime: '#00ff00',
      khaki: '#f0e68c',
      mediumseagreen: '#3cb371',
      limegreen: '#32cd32',
      mediumspringgreen: '#00fa9a',
      lightskyblue: '#87cefa',
      lightblue: '#add8e6',
      midnightblue: '#191970',
      lightpink: '#ffb6c1',
      mistyrose: '#ffe4e1',
      moccasin: '#ffe4b5',
      mintcream: '#f5fffa',
      lightslategray: '#778899',
      lightslategrey: '#778899',
      navajowhite: '#ffdead',
      navy: '#000080',
      mediumvioletred: '#c71585',
      powderblue: '#b0e0e6',
      palegoldenrod: '#eee8aa',
      oldlace: '#fdf5e6',
      paleturquoise: '#afeeee',
      mediumturquoise: '#48d1cc',
      mediumorchid: '#ba55d3',
      rebeccapurple: '#663399',
      lightsteelblue: '#b0c4de',
      mediumslateblue: '#7b68ee',
      thistle: '#d8bfd8',
      tan: '#d2b48c',
      orchid: '#da70d6',
      mediumpurple: '#9370db',
      purple: '#800080',
      pink: '#ffc0cb',
      skyblue: '#87ceeb',
      springgreen: '#00ff7f',
      palegreen: '#98fb98',
      red: '#ff0000',
      yellow: '#ffff00',
      slateblue: '#6a5acd',
      lavenderblush: '#fff0f5',
      peru: '#cd853f',
      palevioletred: '#db7093',
      violet: '#ee82ee',
      teal: '#008080',
      slategray: '#708090',
      slategrey: '#708090',
      aliceblue: '#f0f8ff',
      darkseagreen: '#8fbc8f',
      darkolivegreen: '#556b2f',
      greenyellow: '#adff2f',
      seagreen: '#2e8b57',
      seashell: '#fff5ee',
      tomato: '#ff6347',
      silver: '#c0c0c0',
      sienna: '#a0522d',
      lavender: '#e6e6fa',
      lightgreen: '#90ee90',
      orange: '#ffa500',
      orangered: '#ff4500',
      steelblue: '#4682b4',
      royalblue: '#4169e1',
      turquoise: '#40e0d0',
      yellowgreen: '#9acd32',
      salmon: '#fa8072',
      saddlebrown: '#8b4513',
      sandybrown: '#f4a460',
      rosybrown: '#bc8f8f',
      darksalmon: '#e9967a',
      lightgoldenrodyellow: '#fafad2',
      snow: '#fffafa',
      lightgrey: '#d3d3d3',
      lightgray: '#d3d3d3',
      dimgray: '#696969',
      dimgrey: '#696969',
      olivedrab: '#6b8e23',
      olive: '#808000'
    },
    i = {}
  for (var s in e) i[e[s]] = s
  var n = {}
  ;(r.prototype.toName = function (o) {
    if (!(this.rgba.a || this.rgba.r || this.rgba.g || this.rgba.b)) return 'transparent'
    var a,
      h,
      l = i[this.toHex()]
    if (l) return l
    if (o != null && o.closest) {
      var c = this.toRgb(),
        u = 1 / 0,
        d = 'black'
      if (!n.length) for (var f in e) n[f] = new r(e[f]).toRgb()
      for (var p in e) {
        var m =
          ((a = c),
          (h = n[p]),
          Math.pow(a.r - h.r, 2) + Math.pow(a.g - h.g, 2) + Math.pow(a.b - h.b, 2))
        m < u && ((u = m), (d = p))
      }
      return d
    }
  }),
    t.string.push([
      function (o) {
        var a = o.toLowerCase(),
          h = a === 'transparent' ? '#0000' : e[a]
        return h ? new r(h).toRgb() : null
      },
      'name'
    ])
}
b0([E0])
const Ei = class On {
  constructor(t = 16777215) {
    ;(this._value = null),
      (this._components = new Float32Array(4)),
      this._components.fill(1),
      (this._int = 16777215),
      (this.value = t)
  }
  get red() {
    return this._components[0]
  }
  get green() {
    return this._components[1]
  }
  get blue() {
    return this._components[2]
  }
  get alpha() {
    return this._components[3]
  }
  setValue(t) {
    return (this.value = t), this
  }
  set value(t) {
    if (t instanceof On)
      (this._value = this.cloneSource(t._value)),
        (this._int = t._int),
        this._components.set(t._components)
    else {
      if (t === null) throw new Error('Cannot set PIXI.Color#value to null')
      ;(this._value === null || !this.isSourceEqual(this._value, t)) &&
        (this.normalize(t), (this._value = this.cloneSource(t)))
    }
  }
  get value() {
    return this._value
  }
  cloneSource(t) {
    return typeof t == 'string' || typeof t == 'number' || t instanceof Number || t === null
      ? t
      : Array.isArray(t) || ArrayBuffer.isView(t)
        ? t.slice(0)
        : typeof t == 'object' && t !== null
          ? { ...t }
          : t
  }
  isSourceEqual(t, e) {
    const i = typeof t
    if (i !== typeof e) return !1
    if (i === 'number' || i === 'string' || t instanceof Number) return t === e
    if ((Array.isArray(t) && Array.isArray(e)) || (ArrayBuffer.isView(t) && ArrayBuffer.isView(e)))
      return t.length !== e.length ? !1 : t.every((s, n) => s === e[n])
    if (t !== null && e !== null) {
      const s = Object.keys(t),
        n = Object.keys(e)
      return s.length !== n.length ? !1 : s.every((o) => t[o] === e[o])
    }
    return t === e
  }
  toRgba() {
    const [t, e, i, s] = this._components
    return { r: t, g: e, b: i, a: s }
  }
  toRgb() {
    const [t, e, i] = this._components
    return { r: t, g: e, b: i }
  }
  toRgbaString() {
    const [t, e, i] = this.toUint8RgbArray()
    return `rgba(${t},${e},${i},${this.alpha})`
  }
  toUint8RgbArray(t) {
    const [e, i, s] = this._components
    return (
      (t = t ?? []),
      (t[0] = Math.round(e * 255)),
      (t[1] = Math.round(i * 255)),
      (t[2] = Math.round(s * 255)),
      t
    )
  }
  toRgbArray(t) {
    t = t ?? []
    const [e, i, s] = this._components
    return (t[0] = e), (t[1] = i), (t[2] = s), t
  }
  toNumber() {
    return this._int
  }
  toLittleEndianNumber() {
    const t = this._int
    return (t >> 16) + (t & 65280) + ((t & 255) << 16)
  }
  multiply(t) {
    const [e, i, s, n] = On.temp.setValue(t)._components
    return (
      (this._components[0] *= e),
      (this._components[1] *= i),
      (this._components[2] *= s),
      (this._components[3] *= n),
      this.refreshInt(),
      (this._value = null),
      this
    )
  }
  premultiply(t, e = !0) {
    return (
      e && ((this._components[0] *= t), (this._components[1] *= t), (this._components[2] *= t)),
      (this._components[3] = t),
      this.refreshInt(),
      (this._value = null),
      this
    )
  }
  toPremultiplied(t, e = !0) {
    if (t === 1) return (255 << 24) + this._int
    if (t === 0) return e ? 0 : this._int
    let i = (this._int >> 16) & 255,
      s = (this._int >> 8) & 255,
      n = this._int & 255
    return (
      e && ((i = (i * t + 0.5) | 0), (s = (s * t + 0.5) | 0), (n = (n * t + 0.5) | 0)),
      ((t * 255) << 24) + (i << 16) + (s << 8) + n
    )
  }
  toHex() {
    const t = this._int.toString(16)
    return `#${'000000'.substring(0, 6 - t.length) + t}`
  }
  toHexa() {
    const t = Math.round(this._components[3] * 255).toString(16)
    return this.toHex() + '00'.substring(0, 2 - t.length) + t
  }
  setAlpha(t) {
    return (this._components[3] = this._clamp(t)), this
  }
  round(t) {
    const [e, i, s] = this._components
    return (
      (this._components[0] = Math.round(e * t) / t),
      (this._components[1] = Math.round(i * t) / t),
      (this._components[2] = Math.round(s * t) / t),
      this.refreshInt(),
      (this._value = null),
      this
    )
  }
  toArray(t) {
    t = t ?? []
    const [e, i, s, n] = this._components
    return (t[0] = e), (t[1] = i), (t[2] = s), (t[3] = n), t
  }
  normalize(t) {
    let e, i, s, n
    if ((typeof t == 'number' || t instanceof Number) && t >= 0 && t <= 16777215) {
      const o = t
      ;(e = ((o >> 16) & 255) / 255), (i = ((o >> 8) & 255) / 255), (s = (o & 255) / 255), (n = 1)
    } else if ((Array.isArray(t) || t instanceof Float32Array) && t.length >= 3 && t.length <= 4)
      (t = this._clamp(t)), ([e, i, s, n = 1] = t)
    else if (
      (t instanceof Uint8Array || t instanceof Uint8ClampedArray) &&
      t.length >= 3 &&
      t.length <= 4
    )
      (t = this._clamp(t, 0, 255)),
        ([e, i, s, n = 255] = t),
        (e /= 255),
        (i /= 255),
        (s /= 255),
        (n /= 255)
    else if (typeof t == 'string' || typeof t == 'object') {
      if (typeof t == 'string') {
        const a = On.HEX_PATTERN.exec(t)
        a && (t = `#${a[2]}`)
      }
      const o = He(t)
      o.isValid() && (({ r: e, g: i, b: s, a: n } = o.rgba), (e /= 255), (i /= 255), (s /= 255))
    }
    if (e !== void 0)
      (this._components[0] = e),
        (this._components[1] = i),
        (this._components[2] = s),
        (this._components[3] = n),
        this.refreshInt()
    else throw new Error(`Unable to convert color ${t}`)
  }
  refreshInt() {
    this._clamp(this._components)
    const [t, e, i] = this._components
    this._int = ((t * 255) << 16) + ((e * 255) << 8) + ((i * 255) | 0)
  }
  _clamp(t, e = 0, i = 1) {
    return typeof t == 'number'
      ? Math.min(Math.max(t, e), i)
      : (t.forEach((s, n) => {
          t[n] = Math.min(Math.max(s, e), i)
        }),
        t)
  }
}
;(Ei.shared = new Ei()),
  (Ei.temp = new Ei()),
  (Ei.HEX_PATTERN = /^(#|0x)?(([a-f0-9]{3}){1,2}([a-f0-9]{2})?)$/i)
let St = Ei
function T0(r) {
  return (
    ut('7.2.0', 'utils.hex2string is deprecated, use Color#toHex instead'),
    St.shared.setValue(r).toHex()
  )
}
function w0(r) {
  return (
    ut('7.2.0', 'utils.rgb2hex is deprecated, use Color#toNumber instead'),
    St.shared.setValue(r).toNumber()
  )
}
function S0() {
  const r = [],
    t = []
  for (let i = 0; i < 32; i++) (r[i] = i), (t[i] = i)
  ;(r[st.NORMAL_NPM] = st.NORMAL),
    (r[st.ADD_NPM] = st.ADD),
    (r[st.SCREEN_NPM] = st.SCREEN),
    (t[st.NORMAL] = st.NORMAL_NPM),
    (t[st.ADD] = st.ADD_NPM),
    (t[st.SCREEN] = st.SCREEN_NPM)
  const e = []
  return e.push(t), e.push(r), e
}
const Ff = S0()
function Df(r, t) {
  return Ff[t ? 1 : 0][r]
}
function C0(r, t = null) {
  const e = r * 6
  if (((t = t || new Uint16Array(e)), t.length !== e))
    throw new Error(`Out buffer length is incorrect, got ${t.length} and expected ${e}`)
  for (let i = 0, s = 0; i < e; i += 6, s += 4)
    (t[i + 0] = s + 0),
      (t[i + 1] = s + 1),
      (t[i + 2] = s + 2),
      (t[i + 3] = s + 0),
      (t[i + 4] = s + 2),
      (t[i + 5] = s + 3)
  return t
}
function Of(r) {
  if (r.BYTES_PER_ELEMENT === 4)
    return r instanceof Float32Array
      ? 'Float32Array'
      : r instanceof Uint32Array
        ? 'Uint32Array'
        : 'Int32Array'
  if (r.BYTES_PER_ELEMENT === 2) {
    if (r instanceof Uint16Array) return 'Uint16Array'
  } else if (r.BYTES_PER_ELEMENT === 1 && r instanceof Uint8Array) return 'Uint8Array'
  return null
}
function to(r) {
  return (
    (r += r === 0 ? 1 : 0),
    --r,
    (r |= r >>> 1),
    (r |= r >>> 2),
    (r |= r >>> 4),
    (r |= r >>> 8),
    (r |= r >>> 16),
    r + 1
  )
}
function au(r) {
  return !(r & (r - 1)) && !!r
}
function hu(r) {
  let t = (r > 65535 ? 1 : 0) << 4
  r >>>= t
  let e = (r > 255 ? 1 : 0) << 3
  return (
    (r >>>= e),
    (t |= e),
    (e = (r > 15 ? 1 : 0) << 2),
    (r >>>= e),
    (t |= e),
    (e = (r > 3 ? 1 : 0) << 1),
    (r >>>= e),
    (t |= e),
    t | (r >> 1)
  )
}
function Ui(r, t, e) {
  const i = r.length
  let s
  if (t >= i || e === 0) return
  e = t + e > i ? i - t : e
  const n = i - e
  for (s = t; s < n; ++s) r[s] = r[s + e]
  r.length = n
}
function Rr(r) {
  return r === 0 ? 0 : r < 0 ? -1 : 1
}
let I0 = 0
function di() {
  return ++I0
}
const dh = class {
  constructor(r, t, e, i) {
    ;(this.left = r), (this.top = t), (this.right = e), (this.bottom = i)
  }
  get width() {
    return this.right - this.left
  }
  get height() {
    return this.bottom - this.top
  }
  isEmpty() {
    return this.left === this.right || this.top === this.bottom
  }
}
dh.EMPTY = new dh(0, 0, 0, 0)
let lu = dh
const cu = {},
  Ve = Object.create(null),
  Ar = Object.create(null)
class R0 {
  constructor(t, e, i) {
    ;(this._canvas = Y.ADAPTER.createCanvas()),
      (this._context = this._canvas.getContext('2d')),
      (this.resolution = i || Y.RESOLUTION),
      this.resize(t, e)
  }
  clear() {
    this._checkDestroyed(),
      this._context.setTransform(1, 0, 0, 1, 0, 0),
      this._context.clearRect(0, 0, this._canvas.width, this._canvas.height)
  }
  resize(t, e) {
    this._checkDestroyed(),
      (this._canvas.width = Math.round(t * this.resolution)),
      (this._canvas.height = Math.round(e * this.resolution))
  }
  destroy() {
    ;(this._context = null), (this._canvas = null)
  }
  get width() {
    return this._checkDestroyed(), this._canvas.width
  }
  set width(t) {
    this._checkDestroyed(), (this._canvas.width = Math.round(t))
  }
  get height() {
    return this._checkDestroyed(), this._canvas.height
  }
  set height(t) {
    this._checkDestroyed(), (this._canvas.height = Math.round(t))
  }
  get canvas() {
    return this._checkDestroyed(), this._canvas
  }
  get context() {
    return this._checkDestroyed(), this._context
  }
  _checkDestroyed() {
    if (this._canvas === null)
      throw new TypeError('The CanvasRenderTarget has already been destroyed')
  }
}
function uu(r, t, e) {
  for (let i = 0, s = 4 * e * t; i < t; ++i, s += 4) if (r[s + 3] !== 0) return !1
  return !0
}
function du(r, t, e, i, s) {
  const n = 4 * t
  for (let o = i, a = i * n + 4 * e; o <= s; ++o, a += n) if (r[a + 3] !== 0) return !1
  return !0
}
function P0(r) {
  const { width: t, height: e } = r,
    i = r.getContext('2d', { willReadFrequently: !0 })
  if (i === null) throw new TypeError('Failed to get canvas 2D context')
  const s = i.getImageData(0, 0, t, e).data
  let n = 0,
    o = 0,
    a = t - 1,
    h = e - 1
  for (; o < e && uu(s, t, o); ) ++o
  if (o === e) return lu.EMPTY
  for (; uu(s, t, h); ) --h
  for (; du(s, t, n, o, h); ) ++n
  for (; du(s, t, a, o, h); ) --a
  return ++a, ++h, new lu(n, o, a, h)
}
function M0(r) {
  const t = P0(r),
    { width: e, height: i } = t
  let s = null
  if (!t.isEmpty()) {
    const n = r.getContext('2d')
    if (n === null) throw new TypeError('Failed to get canvas 2D context')
    s = n.getImageData(t.left, t.top, e, i)
  }
  return { width: e, height: i, data: s }
}
function B0(r, t = globalThis.location) {
  if (r.startsWith('data:')) return ''
  t = t || globalThis.location
  const e = new URL(r, document.baseURI)
  return e.hostname !== t.hostname || e.port !== t.port || e.protocol !== t.protocol
    ? 'anonymous'
    : ''
}
function mr(r, t = 1) {
  var i
  const e = (i = Y.RETINA_PREFIX) == null ? void 0 : i.exec(r)
  return e ? parseFloat(e[1]) : t
}
var j = ((r) => (
  (r.Renderer = 'renderer'),
  (r.Application = 'application'),
  (r.RendererSystem = 'renderer-webgl-system'),
  (r.RendererPlugin = 'renderer-webgl-plugin'),
  (r.CanvasRendererSystem = 'renderer-canvas-system'),
  (r.CanvasRendererPlugin = 'renderer-canvas-plugin'),
  (r.Asset = 'asset'),
  (r.LoadParser = 'load-parser'),
  (r.ResolveParser = 'resolve-parser'),
  (r.CacheParser = 'cache-parser'),
  (r.DetectionParser = 'detection-parser'),
  r
))(j || {})
const fh = (r) => {
    if (typeof r == 'function' || (typeof r == 'object' && r.extension)) {
      if (!r.extension) throw new Error('Extension class must have an extension object')
      r = { ...(typeof r.extension != 'object' ? { type: r.extension } : r.extension), ref: r }
    }
    if (typeof r == 'object') r = { ...r }
    else throw new Error('Invalid extension type')
    return typeof r.type == 'string' && (r.type = [r.type]), r
  },
  fu = (r, t) => fh(r).priority ?? t,
  q = {
    _addHandlers: {},
    _removeHandlers: {},
    _queue: {},
    remove(...r) {
      return (
        r.map(fh).forEach((t) => {
          t.type.forEach((e) => {
            var i, s
            return (s = (i = this._removeHandlers)[e]) == null ? void 0 : s.call(i, t)
          })
        }),
        this
      )
    },
    add(...r) {
      return (
        r.map(fh).forEach((t) => {
          t.type.forEach((e) => {
            var n, o
            const i = this._addHandlers,
              s = this._queue
            i[e]
              ? (n = i[e]) == null || n.call(i, t)
              : ((s[e] = s[e] || []), (o = s[e]) == null || o.push(t))
          })
        }),
        this
      )
    },
    handle(r, t, e) {
      var o
      const i = this._addHandlers,
        s = this._removeHandlers
      if (i[r] || s[r]) throw new Error(`Extension type ${r} already has a handler`)
      ;(i[r] = t), (s[r] = e)
      const n = this._queue
      return n[r] && ((o = n[r]) == null || o.forEach((a) => t(a)), delete n[r]), this
    },
    handleByMap(r, t) {
      return this.handle(
        r,
        (e) => {
          e.name && (t[e.name] = e.ref)
        },
        (e) => {
          e.name && delete t[e.name]
        }
      )
    },
    handleByList(r, t, e = -1) {
      return this.handle(
        r,
        (i) => {
          t.includes(i.ref) || (t.push(i.ref), t.sort((s, n) => fu(n, e) - fu(s, e)))
        },
        (i) => {
          const s = t.indexOf(i.ref)
          s !== -1 && t.splice(s, 1)
        }
      )
    }
  }
class ph {
  constructor(t) {
    typeof t == 'number'
      ? (this.rawBinaryData = new ArrayBuffer(t))
      : t instanceof Uint8Array
        ? (this.rawBinaryData = t.buffer)
        : (this.rawBinaryData = t),
      (this.uint32View = new Uint32Array(this.rawBinaryData)),
      (this.float32View = new Float32Array(this.rawBinaryData))
  }
  get int8View() {
    return this._int8View || (this._int8View = new Int8Array(this.rawBinaryData)), this._int8View
  }
  get uint8View() {
    return (
      this._uint8View || (this._uint8View = new Uint8Array(this.rawBinaryData)), this._uint8View
    )
  }
  get int16View() {
    return (
      this._int16View || (this._int16View = new Int16Array(this.rawBinaryData)), this._int16View
    )
  }
  get uint16View() {
    return (
      this._uint16View || (this._uint16View = new Uint16Array(this.rawBinaryData)), this._uint16View
    )
  }
  get int32View() {
    return (
      this._int32View || (this._int32View = new Int32Array(this.rawBinaryData)), this._int32View
    )
  }
  view(t) {
    return this[`${t}View`]
  }
  destroy() {
    ;(this.rawBinaryData = null),
      (this._int8View = null),
      (this._uint8View = null),
      (this._int16View = null),
      (this._uint16View = null),
      (this._int32View = null),
      (this.uint32View = null),
      (this.float32View = null)
  }
  static sizeOf(t) {
    switch (t) {
      case 'int8':
      case 'uint8':
        return 1
      case 'int16':
      case 'uint16':
        return 2
      case 'int32':
      case 'uint32':
      case 'float32':
        return 4
      default:
        throw new Error(`${t} isn't a valid view type`)
    }
  }
}
const F0 = [
  'precision mediump float;',
  'void main(void){',
  'float test = 0.1;',
  '%forloop%',
  'gl_FragColor = vec4(0.0);',
  '}'
].join(`
`)
function D0(r) {
  let t = ''
  for (let e = 0; e < r; ++e)
    e > 0 &&
      (t += `
else `),
      e < r - 1 && (t += `if(test == ${e}.0){}`)
  return t
}
function O0(r, t) {
  if (r === 0) throw new Error('Invalid value of `0` passed to `checkMaxIfStatementsInShader`')
  const e = t.createShader(t.FRAGMENT_SHADER)
  for (;;) {
    const i = F0.replace(/%forloop%/gi, D0(r))
    if ((t.shaderSource(e, i), t.compileShader(e), !t.getShaderParameter(e, t.COMPILE_STATUS)))
      r = (r / 2) | 0
    else break
  }
  return r
}
const ma = 0,
  ga = 1,
  _a = 2,
  ya = 3,
  Aa = 4,
  va = 5
class nr {
  constructor() {
    ;(this.data = 0),
      (this.blendMode = st.NORMAL),
      (this.polygonOffset = 0),
      (this.blend = !0),
      (this.depthMask = !0)
  }
  get blend() {
    return !!(this.data & (1 << ma))
  }
  set blend(t) {
    !!(this.data & (1 << ma)) !== t && (this.data ^= 1 << ma)
  }
  get offsets() {
    return !!(this.data & (1 << ga))
  }
  set offsets(t) {
    !!(this.data & (1 << ga)) !== t && (this.data ^= 1 << ga)
  }
  get culling() {
    return !!(this.data & (1 << _a))
  }
  set culling(t) {
    !!(this.data & (1 << _a)) !== t && (this.data ^= 1 << _a)
  }
  get depthTest() {
    return !!(this.data & (1 << ya))
  }
  set depthTest(t) {
    !!(this.data & (1 << ya)) !== t && (this.data ^= 1 << ya)
  }
  get depthMask() {
    return !!(this.data & (1 << va))
  }
  set depthMask(t) {
    !!(this.data & (1 << va)) !== t && (this.data ^= 1 << va)
  }
  get clockwiseFrontFace() {
    return !!(this.data & (1 << Aa))
  }
  set clockwiseFrontFace(t) {
    !!(this.data & (1 << Aa)) !== t && (this.data ^= 1 << Aa)
  }
  get blendMode() {
    return this._blendMode
  }
  set blendMode(t) {
    ;(this.blend = t !== st.NONE), (this._blendMode = t)
  }
  get polygonOffset() {
    return this._polygonOffset
  }
  set polygonOffset(t) {
    ;(this.offsets = !!t), (this._polygonOffset = t)
  }
  static for2d() {
    const t = new nr()
    return (t.depthTest = !1), (t.blend = !0), t
  }
}
nr.prototype.toString = function () {
  return `[@pixi/core:State blendMode=${this.blendMode} clockwiseFrontFace=${this.clockwiseFrontFace} culling=${this.culling} depthMask=${this.depthMask} polygonOffset=${this.polygonOffset}]`
}
const mh = []
function Lf(r, t) {
  if (!r) return null
  let e = ''
  if (typeof r == 'string') {
    const i = /\.(\w{3,4})(?:$|\?|#)/i.exec(r)
    i && (e = i[1].toLowerCase())
  }
  for (let i = mh.length - 1; i >= 0; --i) {
    const s = mh[i]
    if (s.test && s.test(r, e)) return new s(r, t)
  }
  throw new Error('Unrecognized source type to auto-detect Resource')
}
class Oe {
  constructor(t) {
    ;(this.items = []), (this._name = t), (this._aliasCount = 0)
  }
  emit(t, e, i, s, n, o, a, h) {
    if (arguments.length > 8) throw new Error('max arguments reached')
    const { name: l, items: c } = this
    this._aliasCount++
    for (let u = 0, d = c.length; u < d; u++) c[u][l](t, e, i, s, n, o, a, h)
    return c === this.items && this._aliasCount--, this
  }
  ensureNonAliasedItems() {
    this._aliasCount > 0 &&
      this.items.length > 1 &&
      ((this._aliasCount = 0), (this.items = this.items.slice(0)))
  }
  add(t) {
    return t[this._name] && (this.ensureNonAliasedItems(), this.remove(t), this.items.push(t)), this
  }
  remove(t) {
    const e = this.items.indexOf(t)
    return e !== -1 && (this.ensureNonAliasedItems(), this.items.splice(e, 1)), this
  }
  contains(t) {
    return this.items.includes(t)
  }
  removeAll() {
    return this.ensureNonAliasedItems(), (this.items.length = 0), this
  }
  destroy() {
    this.removeAll(), (this.items.length = 0), (this._name = '')
  }
  get empty() {
    return this.items.length === 0
  }
  get name() {
    return this._name
  }
}
Object.defineProperties(Oe.prototype, {
  dispatch: { value: Oe.prototype.emit },
  run: { value: Oe.prototype.emit }
})
class Ls {
  constructor(t = 0, e = 0) {
    ;(this._width = t),
      (this._height = e),
      (this.destroyed = !1),
      (this.internal = !1),
      (this.onResize = new Oe('setRealSize')),
      (this.onUpdate = new Oe('update')),
      (this.onError = new Oe('onError'))
  }
  bind(t) {
    this.onResize.add(t),
      this.onUpdate.add(t),
      this.onError.add(t),
      (this._width || this._height) && this.onResize.emit(this._width, this._height)
  }
  unbind(t) {
    this.onResize.remove(t), this.onUpdate.remove(t), this.onError.remove(t)
  }
  resize(t, e) {
    ;(t !== this._width || e !== this._height) &&
      ((this._width = t), (this._height = e), this.onResize.emit(t, e))
  }
  get valid() {
    return !!this._width && !!this._height
  }
  update() {
    this.destroyed || this.onUpdate.emit()
  }
  load() {
    return Promise.resolve(this)
  }
  get width() {
    return this._width
  }
  get height() {
    return this._height
  }
  style(t, e, i) {
    return !1
  }
  dispose() {}
  destroy() {
    this.destroyed ||
      ((this.destroyed = !0),
      this.dispose(),
      this.onError.removeAll(),
      (this.onError = null),
      this.onResize.removeAll(),
      (this.onResize = null),
      this.onUpdate.removeAll(),
      (this.onUpdate = null))
  }
  static test(t, e) {
    return !1
  }
}
class Po extends Ls {
  constructor(t, e) {
    const { width: i, height: s } = e || {}
    if (!i || !s) throw new Error('BufferResource width or height invalid')
    super(i, s), (this.data = t), (this.unpackAlignment = e.unpackAlignment ?? 4)
  }
  upload(t, e, i) {
    const s = t.gl
    s.pixelStorei(s.UNPACK_ALIGNMENT, this.unpackAlignment),
      s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL, e.alphaMode === de.UNPACK)
    const n = e.realWidth,
      o = e.realHeight
    return (
      i.width === n && i.height === o
        ? s.texSubImage2D(e.target, 0, 0, 0, n, o, e.format, i.type, this.data)
        : ((i.width = n),
          (i.height = o),
          s.texImage2D(e.target, 0, i.internalFormat, n, o, 0, e.format, i.type, this.data)),
      !0
    )
  }
  dispose() {
    this.data = null
  }
  static test(t) {
    return (
      t === null ||
      t instanceof Int8Array ||
      t instanceof Uint8Array ||
      t instanceof Uint8ClampedArray ||
      t instanceof Int16Array ||
      t instanceof Uint16Array ||
      t instanceof Int32Array ||
      t instanceof Uint32Array ||
      t instanceof Float32Array
    )
  }
}
const L0 = { scaleMode: Qt.NEAREST, alphaMode: de.NPM },
  gh = class Ti extends Xs {
    constructor(t = null, e = null) {
      super(), (e = Object.assign({}, Ti.defaultOptions, e))
      const {
        alphaMode: i,
        mipmap: s,
        anisotropicLevel: n,
        scaleMode: o,
        width: a,
        height: h,
        wrapMode: l,
        format: c,
        type: u,
        target: d,
        resolution: f,
        resourceOptions: p
      } = e
      t && !(t instanceof Ls) && ((t = Lf(t, p)), (t.internal = !0)),
        (this.resolution = f || Y.RESOLUTION),
        (this.width = Math.round((a || 0) * this.resolution) / this.resolution),
        (this.height = Math.round((h || 0) * this.resolution) / this.resolution),
        (this._mipmap = s),
        (this.anisotropicLevel = n),
        (this._wrapMode = l),
        (this._scaleMode = o),
        (this.format = c),
        (this.type = u),
        (this.target = d),
        (this.alphaMode = i),
        (this.uid = di()),
        (this.touched = 0),
        (this.isPowerOfTwo = !1),
        this._refreshPOT(),
        (this._glTextures = {}),
        (this.dirtyId = 0),
        (this.dirtyStyleId = 0),
        (this.cacheId = null),
        (this.valid = a > 0 && h > 0),
        (this.textureCacheIds = []),
        (this.destroyed = !1),
        (this.resource = null),
        (this._batchEnabled = 0),
        (this._batchLocation = 0),
        (this.parentTextureArray = null),
        this.setResource(t)
    }
    get realWidth() {
      return Math.round(this.width * this.resolution)
    }
    get realHeight() {
      return Math.round(this.height * this.resolution)
    }
    get mipmap() {
      return this._mipmap
    }
    set mipmap(t) {
      this._mipmap !== t && ((this._mipmap = t), this.dirtyStyleId++)
    }
    get scaleMode() {
      return this._scaleMode
    }
    set scaleMode(t) {
      this._scaleMode !== t && ((this._scaleMode = t), this.dirtyStyleId++)
    }
    get wrapMode() {
      return this._wrapMode
    }
    set wrapMode(t) {
      this._wrapMode !== t && ((this._wrapMode = t), this.dirtyStyleId++)
    }
    setStyle(t, e) {
      let i
      return (
        t !== void 0 && t !== this.scaleMode && ((this.scaleMode = t), (i = !0)),
        e !== void 0 && e !== this.mipmap && ((this.mipmap = e), (i = !0)),
        i && this.dirtyStyleId++,
        this
      )
    }
    setSize(t, e, i) {
      return (i = i || this.resolution), this.setRealSize(t * i, e * i, i)
    }
    setRealSize(t, e, i) {
      return (
        (this.resolution = i || this.resolution),
        (this.width = Math.round(t) / this.resolution),
        (this.height = Math.round(e) / this.resolution),
        this._refreshPOT(),
        this.update(),
        this
      )
    }
    _refreshPOT() {
      this.isPowerOfTwo = au(this.realWidth) && au(this.realHeight)
    }
    setResolution(t) {
      const e = this.resolution
      return e === t
        ? this
        : ((this.resolution = t),
          this.valid &&
            ((this.width = Math.round(this.width * e) / t),
            (this.height = Math.round(this.height * e) / t),
            this.emit('update', this)),
          this._refreshPOT(),
          this)
    }
    setResource(t) {
      if (this.resource === t) return this
      if (this.resource) throw new Error('Resource can be set only once')
      return t.bind(this), (this.resource = t), this
    }
    update() {
      this.valid
        ? (this.dirtyId++, this.dirtyStyleId++, this.emit('update', this))
        : this.width > 0 &&
          this.height > 0 &&
          ((this.valid = !0), this.emit('loaded', this), this.emit('update', this))
    }
    onError(t) {
      this.emit('error', this, t)
    }
    destroy() {
      this.resource &&
        (this.resource.unbind(this),
        this.resource.internal && this.resource.destroy(),
        (this.resource = null)),
        this.cacheId && (delete Ar[this.cacheId], delete Ve[this.cacheId], (this.cacheId = null)),
        (this.valid = !1),
        this.dispose(),
        Ti.removeFromCache(this),
        (this.textureCacheIds = null),
        (this.destroyed = !0),
        this.emit('destroyed', this),
        this.removeAllListeners()
    }
    dispose() {
      this.emit('dispose', this)
    }
    castToBaseTexture() {
      return this
    }
    static from(t, e, i = Y.STRICT_TEXTURE_CACHE) {
      const s = typeof t == 'string'
      let n = null
      if (s) n = t
      else {
        if (!t._pixiId) {
          const a = (e == null ? void 0 : e.pixiIdPrefix) || 'pixiid'
          t._pixiId = `${a}_${di()}`
        }
        n = t._pixiId
      }
      let o = Ar[n]
      if (s && i && !o) throw new Error(`The cacheId "${n}" does not exist in BaseTextureCache.`)
      return o || ((o = new Ti(t, e)), (o.cacheId = n), Ti.addToCache(o, n)), o
    }
    static fromBuffer(t, e, i, s) {
      t = t || new Float32Array(e * i * 4)
      const n = new Po(t, { width: e, height: i, ...(s == null ? void 0 : s.resourceOptions) })
      let o, a
      return (
        t instanceof Float32Array
          ? ((o = D.RGBA), (a = tt.FLOAT))
          : t instanceof Int32Array
            ? ((o = D.RGBA_INTEGER), (a = tt.INT))
            : t instanceof Uint32Array
              ? ((o = D.RGBA_INTEGER), (a = tt.UNSIGNED_INT))
              : t instanceof Int16Array
                ? ((o = D.RGBA_INTEGER), (a = tt.SHORT))
                : t instanceof Uint16Array
                  ? ((o = D.RGBA_INTEGER), (a = tt.UNSIGNED_SHORT))
                  : t instanceof Int8Array
                    ? ((o = D.RGBA), (a = tt.BYTE))
                    : ((o = D.RGBA), (a = tt.UNSIGNED_BYTE)),
        (n.internal = !0),
        new Ti(n, Object.assign({}, L0, { type: a, format: o }, s))
      )
    }
    static addToCache(t, e) {
      e &&
        (t.textureCacheIds.includes(e) || t.textureCacheIds.push(e),
        Ar[e] &&
          Ar[e] !== t &&
          console.warn(
            `BaseTexture added to the cache with an id [${e}] that already had an entry`
          ),
        (Ar[e] = t))
    }
    static removeFromCache(t) {
      if (typeof t == 'string') {
        const e = Ar[t]
        if (e) {
          const i = e.textureCacheIds.indexOf(t)
          return i > -1 && e.textureCacheIds.splice(i, 1), delete Ar[t], e
        }
      } else if (t != null && t.textureCacheIds) {
        for (let e = 0; e < t.textureCacheIds.length; ++e) delete Ar[t.textureCacheIds[e]]
        return (t.textureCacheIds.length = 0), t
      }
      return null
    }
  }
;(gh.defaultOptions = {
  mipmap: sr.POW2,
  anisotropicLevel: 0,
  scaleMode: Qt.LINEAR,
  wrapMode: fr.CLAMP,
  alphaMode: de.UNPACK,
  target: Oi.TEXTURE_2D,
  format: D.RGBA,
  type: tt.UNSIGNED_BYTE
}),
  (gh._globalBatch = 0)
let ht = gh
class _h {
  constructor() {
    ;(this.texArray = null),
      (this.blend = 0),
      (this.type = qe.TRIANGLES),
      (this.start = 0),
      (this.size = 0),
      (this.data = null)
  }
}
let N0 = 0
class Ut {
  constructor(t, e = !0, i = !1) {
    ;(this.data = t || new Float32Array(1)),
      (this._glBuffers = {}),
      (this._updateID = 0),
      (this.index = i),
      (this.static = e),
      (this.id = N0++),
      (this.disposeRunner = new Oe('disposeBuffer'))
  }
  update(t) {
    t instanceof Array && (t = new Float32Array(t)), (this.data = t || this.data), this._updateID++
  }
  dispose() {
    this.disposeRunner.emit(this, !1)
  }
  destroy() {
    this.dispose(), (this.data = null)
  }
  set index(t) {
    this.type = t ? Ze.ELEMENT_ARRAY_BUFFER : Ze.ARRAY_BUFFER
  }
  get index() {
    return this.type === Ze.ELEMENT_ARRAY_BUFFER
  }
  static from(t) {
    return t instanceof Array && (t = new Float32Array(t)), new Ut(t)
  }
}
class eo {
  constructor(t, e = 0, i = !1, s = tt.FLOAT, n, o, a, h = 1) {
    ;(this.buffer = t),
      (this.size = e),
      (this.normalized = i),
      (this.type = s),
      (this.stride = n),
      (this.start = o),
      (this.instance = a),
      (this.divisor = h)
  }
  destroy() {
    this.buffer = null
  }
  static from(t, e, i, s, n) {
    return new eo(t, e, i, s, n)
  }
}
const U0 = { Float32Array, Uint32Array, Int32Array, Uint8Array }
function k0(r, t) {
  let e = 0,
    i = 0
  const s = {}
  for (let h = 0; h < r.length; h++) (i += t[h]), (e += r[h].length)
  const n = new ArrayBuffer(e * 4)
  let o = null,
    a = 0
  for (let h = 0; h < r.length; h++) {
    const l = t[h],
      c = r[h],
      u = Of(c)
    s[u] || (s[u] = new U0[u](n)), (o = s[u])
    for (let d = 0; d < c.length; d++) {
      const f = ((d / l) | 0) * i + a,
        p = d % l
      o[f + p] = c[d]
    }
    a += l
  }
  return new Float32Array(n)
}
const pu = { 5126: 4, 5123: 2, 5121: 1 }
let G0 = 0
const H0 = { Float32Array, Uint32Array, Int32Array, Uint8Array, Uint16Array }
class Dr {
  constructor(t = [], e = {}) {
    ;(this.buffers = t),
      (this.indexBuffer = null),
      (this.attributes = e),
      (this.glVertexArrayObjects = {}),
      (this.id = G0++),
      (this.instanced = !1),
      (this.instanceCount = 1),
      (this.disposeRunner = new Oe('disposeGeometry')),
      (this.refCount = 0)
  }
  addAttribute(t, e, i = 0, s = !1, n, o, a, h = !1) {
    if (!e) throw new Error('You must pass a buffer when creating an attribute')
    e instanceof Ut || (e instanceof Array && (e = new Float32Array(e)), (e = new Ut(e)))
    const l = t.split('|')
    if (l.length > 1) {
      for (let u = 0; u < l.length; u++) this.addAttribute(l[u], e, i, s, n)
      return this
    }
    let c = this.buffers.indexOf(e)
    return (
      c === -1 && (this.buffers.push(e), (c = this.buffers.length - 1)),
      (this.attributes[t] = new eo(c, i, s, n, o, a, h)),
      (this.instanced = this.instanced || h),
      this
    )
  }
  getAttribute(t) {
    return this.attributes[t]
  }
  getBuffer(t) {
    return this.buffers[this.getAttribute(t).buffer]
  }
  addIndex(t) {
    return (
      t instanceof Ut || (t instanceof Array && (t = new Uint16Array(t)), (t = new Ut(t))),
      (t.type = Ze.ELEMENT_ARRAY_BUFFER),
      (this.indexBuffer = t),
      this.buffers.includes(t) || this.buffers.push(t),
      this
    )
  }
  getIndex() {
    return this.indexBuffer
  }
  interleave() {
    if (this.buffers.length === 1 || (this.buffers.length === 2 && this.indexBuffer)) return this
    const t = [],
      e = [],
      i = new Ut()
    let s
    for (s in this.attributes) {
      const n = this.attributes[s],
        o = this.buffers[n.buffer]
      t.push(o.data), e.push((n.size * pu[n.type]) / 4), (n.buffer = 0)
    }
    for (i.data = k0(t, e), s = 0; s < this.buffers.length; s++)
      this.buffers[s] !== this.indexBuffer && this.buffers[s].destroy()
    return (this.buffers = [i]), this.indexBuffer && this.buffers.push(this.indexBuffer), this
  }
  getSize() {
    for (const t in this.attributes) {
      const e = this.attributes[t]
      return this.buffers[e.buffer].data.length / (e.stride / 4 || e.size)
    }
    return 0
  }
  dispose() {
    this.disposeRunner.emit(this, !1)
  }
  destroy() {
    this.dispose(), (this.buffers = null), (this.indexBuffer = null), (this.attributes = null)
  }
  clone() {
    const t = new Dr()
    for (let e = 0; e < this.buffers.length; e++)
      t.buffers[e] = new Ut(this.buffers[e].data.slice(0))
    for (const e in this.attributes) {
      const i = this.attributes[e]
      t.attributes[e] = new eo(
        i.buffer,
        i.size,
        i.normalized,
        i.type,
        i.stride,
        i.start,
        i.instance
      )
    }
    return (
      this.indexBuffer &&
        ((t.indexBuffer = t.buffers[this.buffers.indexOf(this.indexBuffer)]),
        (t.indexBuffer.type = Ze.ELEMENT_ARRAY_BUFFER)),
      t
    )
  }
  static merge(t) {
    const e = new Dr(),
      i = [],
      s = [],
      n = []
    let o
    for (let a = 0; a < t.length; a++) {
      o = t[a]
      for (let h = 0; h < o.buffers.length; h++)
        (s[h] = s[h] || 0), (s[h] += o.buffers[h].data.length), (n[h] = 0)
    }
    for (let a = 0; a < o.buffers.length; a++)
      (i[a] = new H0[Of(o.buffers[a].data)](s[a])), (e.buffers[a] = new Ut(i[a]))
    for (let a = 0; a < t.length; a++) {
      o = t[a]
      for (let h = 0; h < o.buffers.length; h++)
        i[h].set(o.buffers[h].data, n[h]), (n[h] += o.buffers[h].data.length)
    }
    if (((e.attributes = o.attributes), o.indexBuffer)) {
      ;(e.indexBuffer = e.buffers[o.buffers.indexOf(o.indexBuffer)]),
        (e.indexBuffer.type = Ze.ELEMENT_ARRAY_BUFFER)
      let a = 0,
        h = 0,
        l = 0,
        c = 0
      for (let u = 0; u < o.buffers.length; u++)
        if (o.buffers[u] !== o.indexBuffer) {
          c = u
          break
        }
      for (const u in o.attributes) {
        const d = o.attributes[u]
        ;(d.buffer | 0) === c && (h += (d.size * pu[d.type]) / 4)
      }
      for (let u = 0; u < t.length; u++) {
        const d = t[u].indexBuffer.data
        for (let f = 0; f < d.length; f++) e.indexBuffer.data[f + l] += a
        ;(a += t[u].buffers[c].data.length / h), (l += d.length)
      }
    }
    return e
  }
}
class Nf extends Dr {
  constructor(t = !1) {
    super(),
      (this._buffer = new Ut(null, t, !1)),
      (this._indexBuffer = new Ut(null, t, !0)),
      this.addAttribute('aVertexPosition', this._buffer, 2, !1, tt.FLOAT)
        .addAttribute('aTextureCoord', this._buffer, 2, !1, tt.FLOAT)
        .addAttribute('aColor', this._buffer, 4, !0, tt.UNSIGNED_BYTE)
        .addAttribute('aTextureId', this._buffer, 1, !0, tt.FLOAT)
        .addIndex(this._indexBuffer)
  }
}
const ro = Math.PI * 2,
  V0 = 180 / Math.PI,
  X0 = Math.PI / 180
var Zt = ((r) => (
  (r[(r.POLY = 0)] = 'POLY'),
  (r[(r.RECT = 1)] = 'RECT'),
  (r[(r.CIRC = 2)] = 'CIRC'),
  (r[(r.ELIP = 3)] = 'ELIP'),
  (r[(r.RREC = 4)] = 'RREC'),
  r
))(Zt || {})
class pt {
  constructor(t = 0, e = 0) {
    ;(this.x = 0), (this.y = 0), (this.x = t), (this.y = e)
  }
  clone() {
    return new pt(this.x, this.y)
  }
  copyFrom(t) {
    return this.set(t.x, t.y), this
  }
  copyTo(t) {
    return t.set(this.x, this.y), t
  }
  equals(t) {
    return t.x === this.x && t.y === this.y
  }
  set(t = 0, e = t) {
    return (this.x = t), (this.y = e), this
  }
}
pt.prototype.toString = function () {
  return `[@pixi/math:Point x=${this.x} y=${this.y}]`
}
const un = [new pt(), new pt(), new pt(), new pt()]
class nt {
  constructor(t = 0, e = 0, i = 0, s = 0) {
    ;(this.x = Number(t)),
      (this.y = Number(e)),
      (this.width = Number(i)),
      (this.height = Number(s)),
      (this.type = Zt.RECT)
  }
  get left() {
    return this.x
  }
  get right() {
    return this.x + this.width
  }
  get top() {
    return this.y
  }
  get bottom() {
    return this.y + this.height
  }
  static get EMPTY() {
    return new nt(0, 0, 0, 0)
  }
  clone() {
    return new nt(this.x, this.y, this.width, this.height)
  }
  copyFrom(t) {
    return (this.x = t.x), (this.y = t.y), (this.width = t.width), (this.height = t.height), this
  }
  copyTo(t) {
    return (t.x = this.x), (t.y = this.y), (t.width = this.width), (t.height = this.height), t
  }
  contains(t, e) {
    return this.width <= 0 || this.height <= 0
      ? !1
      : t >= this.x && t < this.x + this.width && e >= this.y && e < this.y + this.height
  }
  intersects(t, e) {
    if (!e) {
      const T = this.x < t.x ? t.x : this.x
      if ((this.right > t.right ? t.right : this.right) <= T) return !1
      const F = this.y < t.y ? t.y : this.y
      return (this.bottom > t.bottom ? t.bottom : this.bottom) > F
    }
    const i = this.left,
      s = this.right,
      n = this.top,
      o = this.bottom
    if (s <= i || o <= n) return !1
    const a = un[0].set(t.left, t.top),
      h = un[1].set(t.left, t.bottom),
      l = un[2].set(t.right, t.top),
      c = un[3].set(t.right, t.bottom)
    if (l.x <= a.x || h.y <= a.y) return !1
    const u = Math.sign(e.a * e.d - e.b * e.c)
    if (
      u === 0 ||
      (e.apply(a, a),
      e.apply(h, h),
      e.apply(l, l),
      e.apply(c, c),
      Math.max(a.x, h.x, l.x, c.x) <= i ||
        Math.min(a.x, h.x, l.x, c.x) >= s ||
        Math.max(a.y, h.y, l.y, c.y) <= n ||
        Math.min(a.y, h.y, l.y, c.y) >= o)
    )
      return !1
    const d = u * (h.y - a.y),
      f = u * (a.x - h.x),
      p = d * i + f * n,
      m = d * s + f * n,
      g = d * i + f * o,
      A = d * s + f * o
    if (Math.max(p, m, g, A) <= d * a.x + f * a.y || Math.min(p, m, g, A) >= d * c.x + f * c.y)
      return !1
    const x = u * (a.y - l.y),
      _ = u * (l.x - a.x),
      v = x * i + _ * n,
      S = x * s + _ * n,
      C = x * i + _ * o,
      I = x * s + _ * o
    return !(Math.max(v, S, C, I) <= x * a.x + _ * a.y || Math.min(v, S, C, I) >= x * c.x + _ * c.y)
  }
  pad(t = 0, e = t) {
    return (this.x -= t), (this.y -= e), (this.width += t * 2), (this.height += e * 2), this
  }
  fit(t) {
    const e = Math.max(this.x, t.x),
      i = Math.min(this.x + this.width, t.x + t.width),
      s = Math.max(this.y, t.y),
      n = Math.min(this.y + this.height, t.y + t.height)
    return (
      (this.x = e),
      (this.width = Math.max(i - e, 0)),
      (this.y = s),
      (this.height = Math.max(n - s, 0)),
      this
    )
  }
  ceil(t = 1, e = 0.001) {
    const i = Math.ceil((this.x + this.width - e) * t) / t,
      s = Math.ceil((this.y + this.height - e) * t) / t
    return (
      (this.x = Math.floor((this.x + e) * t) / t),
      (this.y = Math.floor((this.y + e) * t) / t),
      (this.width = i - this.x),
      (this.height = s - this.y),
      this
    )
  }
  enlarge(t) {
    const e = Math.min(this.x, t.x),
      i = Math.max(this.x + this.width, t.x + t.width),
      s = Math.min(this.y, t.y),
      n = Math.max(this.y + this.height, t.y + t.height)
    return (this.x = e), (this.width = i - e), (this.y = s), (this.height = n - s), this
  }
}
nt.prototype.toString = function () {
  return `[@pixi/math:Rectangle x=${this.x} y=${this.y} width=${this.width} height=${this.height}]`
}
class Mo {
  constructor(t = 0, e = 0, i = 0) {
    ;(this.x = t), (this.y = e), (this.radius = i), (this.type = Zt.CIRC)
  }
  clone() {
    return new Mo(this.x, this.y, this.radius)
  }
  contains(t, e) {
    if (this.radius <= 0) return !1
    const i = this.radius * this.radius
    let s = this.x - t,
      n = this.y - e
    return (s *= s), (n *= n), s + n <= i
  }
  getBounds() {
    return new nt(this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2)
  }
}
Mo.prototype.toString = function () {
  return `[@pixi/math:Circle x=${this.x} y=${this.y} radius=${this.radius}]`
}
class Bo {
  constructor(t = 0, e = 0, i = 0, s = 0) {
    ;(this.x = t), (this.y = e), (this.width = i), (this.height = s), (this.type = Zt.ELIP)
  }
  clone() {
    return new Bo(this.x, this.y, this.width, this.height)
  }
  contains(t, e) {
    if (this.width <= 0 || this.height <= 0) return !1
    let i = (t - this.x) / this.width,
      s = (e - this.y) / this.height
    return (i *= i), (s *= s), i + s <= 1
  }
  getBounds() {
    return new nt(this.x - this.width, this.y - this.height, this.width, this.height)
  }
}
Bo.prototype.toString = function () {
  return `[@pixi/math:Ellipse x=${this.x} y=${this.y} width=${this.width} height=${this.height}]`
}
class li {
  constructor(...t) {
    let e = Array.isArray(t[0]) ? t[0] : t
    if (typeof e[0] != 'number') {
      const i = []
      for (let s = 0, n = e.length; s < n; s++) i.push(e[s].x, e[s].y)
      e = i
    }
    ;(this.points = e), (this.type = Zt.POLY), (this.closeStroke = !0)
  }
  clone() {
    const t = this.points.slice(),
      e = new li(t)
    return (e.closeStroke = this.closeStroke), e
  }
  contains(t, e) {
    let i = !1
    const s = this.points.length / 2
    for (let n = 0, o = s - 1; n < s; o = n++) {
      const a = this.points[n * 2],
        h = this.points[n * 2 + 1],
        l = this.points[o * 2],
        c = this.points[o * 2 + 1]
      h > e != c > e && t < (l - a) * ((e - h) / (c - h)) + a && (i = !i)
    }
    return i
  }
}
li.prototype.toString = function () {
  return `[@pixi/math:PolygoncloseStroke=${this.closeStroke}points=${this.points.reduce((r, t) => `${r}, ${t}`, '')}]`
}
class Fo {
  constructor(t = 0, e = 0, i = 0, s = 0, n = 20) {
    ;(this.x = t),
      (this.y = e),
      (this.width = i),
      (this.height = s),
      (this.radius = n),
      (this.type = Zt.RREC)
  }
  clone() {
    return new Fo(this.x, this.y, this.width, this.height, this.radius)
  }
  contains(t, e) {
    if (this.width <= 0 || this.height <= 0) return !1
    if (t >= this.x && t <= this.x + this.width && e >= this.y && e <= this.y + this.height) {
      const i = Math.max(0, Math.min(this.radius, Math.min(this.width, this.height) / 2))
      if (
        (e >= this.y + i && e <= this.y + this.height - i) ||
        (t >= this.x + i && t <= this.x + this.width - i)
      )
        return !0
      let s = t - (this.x + i),
        n = e - (this.y + i)
      const o = i * i
      if (
        s * s + n * n <= o ||
        ((s = t - (this.x + this.width - i)), s * s + n * n <= o) ||
        ((n = e - (this.y + this.height - i)), s * s + n * n <= o) ||
        ((s = t - (this.x + i)), s * s + n * n <= o)
      )
        return !0
    }
    return !1
  }
}
Fo.prototype.toString = function () {
  return `[@pixi/math:RoundedRectangle x=${this.x} y=${this.y}width=${this.width} height=${this.height} radius=${this.radius}]`
}
class Ct {
  constructor(t = 1, e = 0, i = 0, s = 1, n = 0, o = 0) {
    ;(this.array = null),
      (this.a = t),
      (this.b = e),
      (this.c = i),
      (this.d = s),
      (this.tx = n),
      (this.ty = o)
  }
  fromArray(t) {
    ;(this.a = t[0]),
      (this.b = t[1]),
      (this.c = t[3]),
      (this.d = t[4]),
      (this.tx = t[2]),
      (this.ty = t[5])
  }
  set(t, e, i, s, n, o) {
    return (
      (this.a = t), (this.b = e), (this.c = i), (this.d = s), (this.tx = n), (this.ty = o), this
    )
  }
  toArray(t, e) {
    this.array || (this.array = new Float32Array(9))
    const i = e || this.array
    return (
      t
        ? ((i[0] = this.a),
          (i[1] = this.b),
          (i[2] = 0),
          (i[3] = this.c),
          (i[4] = this.d),
          (i[5] = 0),
          (i[6] = this.tx),
          (i[7] = this.ty),
          (i[8] = 1))
        : ((i[0] = this.a),
          (i[1] = this.c),
          (i[2] = this.tx),
          (i[3] = this.b),
          (i[4] = this.d),
          (i[5] = this.ty),
          (i[6] = 0),
          (i[7] = 0),
          (i[8] = 1)),
      i
    )
  }
  apply(t, e) {
    e = e || new pt()
    const i = t.x,
      s = t.y
    return (e.x = this.a * i + this.c * s + this.tx), (e.y = this.b * i + this.d * s + this.ty), e
  }
  applyInverse(t, e) {
    e = e || new pt()
    const i = 1 / (this.a * this.d + this.c * -this.b),
      s = t.x,
      n = t.y
    return (
      (e.x = this.d * i * s + -this.c * i * n + (this.ty * this.c - this.tx * this.d) * i),
      (e.y = this.a * i * n + -this.b * i * s + (-this.ty * this.a + this.tx * this.b) * i),
      e
    )
  }
  translate(t, e) {
    return (this.tx += t), (this.ty += e), this
  }
  scale(t, e) {
    return (
      (this.a *= t),
      (this.d *= e),
      (this.c *= t),
      (this.b *= e),
      (this.tx *= t),
      (this.ty *= e),
      this
    )
  }
  rotate(t) {
    const e = Math.cos(t),
      i = Math.sin(t),
      s = this.a,
      n = this.c,
      o = this.tx
    return (
      (this.a = s * e - this.b * i),
      (this.b = s * i + this.b * e),
      (this.c = n * e - this.d * i),
      (this.d = n * i + this.d * e),
      (this.tx = o * e - this.ty * i),
      (this.ty = o * i + this.ty * e),
      this
    )
  }
  append(t) {
    const e = this.a,
      i = this.b,
      s = this.c,
      n = this.d
    return (
      (this.a = t.a * e + t.b * s),
      (this.b = t.a * i + t.b * n),
      (this.c = t.c * e + t.d * s),
      (this.d = t.c * i + t.d * n),
      (this.tx = t.tx * e + t.ty * s + this.tx),
      (this.ty = t.tx * i + t.ty * n + this.ty),
      this
    )
  }
  setTransform(t, e, i, s, n, o, a, h, l) {
    return (
      (this.a = Math.cos(a + l) * n),
      (this.b = Math.sin(a + l) * n),
      (this.c = -Math.sin(a - h) * o),
      (this.d = Math.cos(a - h) * o),
      (this.tx = t - (i * this.a + s * this.c)),
      (this.ty = e - (i * this.b + s * this.d)),
      this
    )
  }
  prepend(t) {
    const e = this.tx
    if (t.a !== 1 || t.b !== 0 || t.c !== 0 || t.d !== 1) {
      const i = this.a,
        s = this.c
      ;(this.a = i * t.a + this.b * t.c),
        (this.b = i * t.b + this.b * t.d),
        (this.c = s * t.a + this.d * t.c),
        (this.d = s * t.b + this.d * t.d)
    }
    return (
      (this.tx = e * t.a + this.ty * t.c + t.tx), (this.ty = e * t.b + this.ty * t.d + t.ty), this
    )
  }
  decompose(t) {
    const e = this.a,
      i = this.b,
      s = this.c,
      n = this.d,
      o = t.pivot,
      a = -Math.atan2(-s, n),
      h = Math.atan2(i, e),
      l = Math.abs(a + h)
    return (
      l < 1e-5 || Math.abs(ro - l) < 1e-5
        ? ((t.rotation = h), (t.skew.x = t.skew.y = 0))
        : ((t.rotation = 0), (t.skew.x = a), (t.skew.y = h)),
      (t.scale.x = Math.sqrt(e * e + i * i)),
      (t.scale.y = Math.sqrt(s * s + n * n)),
      (t.position.x = this.tx + (o.x * e + o.y * s)),
      (t.position.y = this.ty + (o.x * i + o.y * n)),
      t
    )
  }
  invert() {
    const t = this.a,
      e = this.b,
      i = this.c,
      s = this.d,
      n = this.tx,
      o = t * s - e * i
    return (
      (this.a = s / o),
      (this.b = -e / o),
      (this.c = -i / o),
      (this.d = t / o),
      (this.tx = (i * this.ty - s * n) / o),
      (this.ty = -(t * this.ty - e * n) / o),
      this
    )
  }
  identity() {
    return (
      (this.a = 1), (this.b = 0), (this.c = 0), (this.d = 1), (this.tx = 0), (this.ty = 0), this
    )
  }
  clone() {
    const t = new Ct()
    return (
      (t.a = this.a),
      (t.b = this.b),
      (t.c = this.c),
      (t.d = this.d),
      (t.tx = this.tx),
      (t.ty = this.ty),
      t
    )
  }
  copyTo(t) {
    return (
      (t.a = this.a),
      (t.b = this.b),
      (t.c = this.c),
      (t.d = this.d),
      (t.tx = this.tx),
      (t.ty = this.ty),
      t
    )
  }
  copyFrom(t) {
    return (
      (this.a = t.a),
      (this.b = t.b),
      (this.c = t.c),
      (this.d = t.d),
      (this.tx = t.tx),
      (this.ty = t.ty),
      this
    )
  }
  static get IDENTITY() {
    return new Ct()
  }
  static get TEMP_MATRIX() {
    return new Ct()
  }
}
Ct.prototype.toString = function () {
  return `[@pixi/math:Matrix a=${this.a} b=${this.b} c=${this.c} d=${this.d} tx=${this.tx} ty=${this.ty}]`
}
const Wr = [1, 1, 0, -1, -1, -1, 0, 1, 1, 1, 0, -1, -1, -1, 0, 1],
  $r = [0, 1, 1, 1, 0, -1, -1, -1, 0, 1, 1, 1, 0, -1, -1, -1],
  zr = [0, -1, -1, -1, 0, 1, 1, 1, 0, 1, 1, 1, 0, -1, -1, -1],
  Yr = [1, 1, 0, -1, -1, -1, 0, 1, -1, -1, 0, 1, 1, 1, 0, -1],
  yh = [],
  Uf = [],
  dn = Math.sign
function j0() {
  for (let r = 0; r < 16; r++) {
    const t = []
    yh.push(t)
    for (let e = 0; e < 16; e++) {
      const i = dn(Wr[r] * Wr[e] + zr[r] * $r[e]),
        s = dn($r[r] * Wr[e] + Yr[r] * $r[e]),
        n = dn(Wr[r] * zr[e] + zr[r] * Yr[e]),
        o = dn($r[r] * zr[e] + Yr[r] * Yr[e])
      for (let a = 0; a < 16; a++)
        if (Wr[a] === i && $r[a] === s && zr[a] === n && Yr[a] === o) {
          t.push(a)
          break
        }
    }
  }
  for (let r = 0; r < 16; r++) {
    const t = new Ct()
    t.set(Wr[r], $r[r], zr[r], Yr[r], 0, 0), Uf.push(t)
  }
}
j0()
const Bt = {
  E: 0,
  SE: 1,
  S: 2,
  SW: 3,
  W: 4,
  NW: 5,
  N: 6,
  NE: 7,
  MIRROR_VERTICAL: 8,
  MAIN_DIAGONAL: 10,
  MIRROR_HORIZONTAL: 12,
  REVERSE_DIAGONAL: 14,
  uX: (r) => Wr[r],
  uY: (r) => $r[r],
  vX: (r) => zr[r],
  vY: (r) => Yr[r],
  inv: (r) => (r & 8 ? r & 15 : -r & 7),
  add: (r, t) => yh[r][t],
  sub: (r, t) => yh[r][Bt.inv(t)],
  rotate180: (r) => r ^ 4,
  isVertical: (r) => (r & 3) === 2,
  byDirection: (r, t) =>
    Math.abs(r) * 2 <= Math.abs(t)
      ? t >= 0
        ? Bt.S
        : Bt.N
      : Math.abs(t) * 2 <= Math.abs(r)
        ? r > 0
          ? Bt.E
          : Bt.W
        : t > 0
          ? r > 0
            ? Bt.SE
            : Bt.SW
          : r > 0
            ? Bt.NE
            : Bt.NW,
  matrixAppendRotationInv: (r, t, e = 0, i = 0) => {
    const s = Uf[Bt.inv(t)]
    ;(s.tx = e), (s.ty = i), r.append(s)
  }
}
class cr {
  constructor(t, e, i = 0, s = 0) {
    ;(this._x = i), (this._y = s), (this.cb = t), (this.scope = e)
  }
  clone(t = this.cb, e = this.scope) {
    return new cr(t, e, this._x, this._y)
  }
  set(t = 0, e = t) {
    return (
      (this._x !== t || this._y !== e) && ((this._x = t), (this._y = e), this.cb.call(this.scope)),
      this
    )
  }
  copyFrom(t) {
    return (
      (this._x !== t.x || this._y !== t.y) &&
        ((this._x = t.x), (this._y = t.y), this.cb.call(this.scope)),
      this
    )
  }
  copyTo(t) {
    return t.set(this._x, this._y), t
  }
  equals(t) {
    return t.x === this._x && t.y === this._y
  }
  get x() {
    return this._x
  }
  set x(t) {
    this._x !== t && ((this._x = t), this.cb.call(this.scope))
  }
  get y() {
    return this._y
  }
  set y(t) {
    this._y !== t && ((this._y = t), this.cb.call(this.scope))
  }
}
cr.prototype.toString = function () {
  return `[@pixi/math:ObservablePoint x=${this.x} y=${this.y} scope=${this.scope}]`
}
const Ah = class {
  constructor() {
    ;(this.worldTransform = new Ct()),
      (this.localTransform = new Ct()),
      (this.position = new cr(this.onChange, this, 0, 0)),
      (this.scale = new cr(this.onChange, this, 1, 1)),
      (this.pivot = new cr(this.onChange, this, 0, 0)),
      (this.skew = new cr(this.updateSkew, this, 0, 0)),
      (this._rotation = 0),
      (this._cx = 1),
      (this._sx = 0),
      (this._cy = 0),
      (this._sy = 1),
      (this._localID = 0),
      (this._currentLocalID = 0),
      (this._worldID = 0),
      (this._parentID = 0)
  }
  onChange() {
    this._localID++
  }
  updateSkew() {
    ;(this._cx = Math.cos(this._rotation + this.skew.y)),
      (this._sx = Math.sin(this._rotation + this.skew.y)),
      (this._cy = -Math.sin(this._rotation - this.skew.x)),
      (this._sy = Math.cos(this._rotation - this.skew.x)),
      this._localID++
  }
  updateLocalTransform() {
    const r = this.localTransform
    this._localID !== this._currentLocalID &&
      ((r.a = this._cx * this.scale.x),
      (r.b = this._sx * this.scale.x),
      (r.c = this._cy * this.scale.y),
      (r.d = this._sy * this.scale.y),
      (r.tx = this.position.x - (this.pivot.x * r.a + this.pivot.y * r.c)),
      (r.ty = this.position.y - (this.pivot.x * r.b + this.pivot.y * r.d)),
      (this._currentLocalID = this._localID),
      (this._parentID = -1))
  }
  updateTransform(r) {
    const t = this.localTransform
    if (
      (this._localID !== this._currentLocalID &&
        ((t.a = this._cx * this.scale.x),
        (t.b = this._sx * this.scale.x),
        (t.c = this._cy * this.scale.y),
        (t.d = this._sy * this.scale.y),
        (t.tx = this.position.x - (this.pivot.x * t.a + this.pivot.y * t.c)),
        (t.ty = this.position.y - (this.pivot.x * t.b + this.pivot.y * t.d)),
        (this._currentLocalID = this._localID),
        (this._parentID = -1)),
      this._parentID !== r._worldID)
    ) {
      const e = r.worldTransform,
        i = this.worldTransform
      ;(i.a = t.a * e.a + t.b * e.c),
        (i.b = t.a * e.b + t.b * e.d),
        (i.c = t.c * e.a + t.d * e.c),
        (i.d = t.c * e.b + t.d * e.d),
        (i.tx = t.tx * e.a + t.ty * e.c + e.tx),
        (i.ty = t.tx * e.b + t.ty * e.d + e.ty),
        (this._parentID = r._worldID),
        this._worldID++
    }
  }
  setFromMatrix(r) {
    r.decompose(this), this._localID++
  }
  get rotation() {
    return this._rotation
  }
  set rotation(r) {
    this._rotation !== r && ((this._rotation = r), this.updateSkew())
  }
}
Ah.IDENTITY = new Ah()
let Do = Ah
Do.prototype.toString = function () {
  return `[@pixi/math:Transform position=(${this.position.x}, ${this.position.y}) rotation=${this.rotation} scale=(${this.scale.x}, ${this.scale.y}) skew=(${this.skew.x}, ${this.skew.y}) ]`
}
var W0 = `varying vec2 vTextureCoord;

uniform sampler2D uSampler;

void main(void){
   gl_FragColor *= texture2D(uSampler, vTextureCoord);
}`,
  $0 = `attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat3 projectionMatrix;

varying vec2 vTextureCoord;

void main(void){
   gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);
   vTextureCoord = aTextureCoord;
}
`
function mu(r, t, e) {
  const i = r.createShader(t)
  return r.shaderSource(i, e), r.compileShader(i), i
}
function xa(r) {
  const t = new Array(r)
  for (let e = 0; e < t.length; e++) t[e] = !1
  return t
}
function kf(r, t) {
  switch (r) {
    case 'float':
      return 0
    case 'vec2':
      return new Float32Array(2 * t)
    case 'vec3':
      return new Float32Array(3 * t)
    case 'vec4':
      return new Float32Array(4 * t)
    case 'int':
    case 'uint':
    case 'sampler2D':
    case 'sampler2DArray':
      return 0
    case 'ivec2':
      return new Int32Array(2 * t)
    case 'ivec3':
      return new Int32Array(3 * t)
    case 'ivec4':
      return new Int32Array(4 * t)
    case 'uvec2':
      return new Uint32Array(2 * t)
    case 'uvec3':
      return new Uint32Array(3 * t)
    case 'uvec4':
      return new Uint32Array(4 * t)
    case 'bool':
      return !1
    case 'bvec2':
      return xa(2 * t)
    case 'bvec3':
      return xa(3 * t)
    case 'bvec4':
      return xa(4 * t)
    case 'mat2':
      return new Float32Array([1, 0, 0, 1])
    case 'mat3':
      return new Float32Array([1, 0, 0, 0, 1, 0, 0, 0, 1])
    case 'mat4':
      return new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])
  }
  return null
}
const ki = [
    {
      test: (r) => r.type === 'float' && r.size === 1 && !r.isArray,
      code: (r) => `
            if(uv["${r}"] !== ud["${r}"].value)
            {
                ud["${r}"].value = uv["${r}"]
                gl.uniform1f(ud["${r}"].location, uv["${r}"])
            }
            `
    },
    {
      test: (r, t) =>
        (r.type === 'sampler2D' || r.type === 'samplerCube' || r.type === 'sampler2DArray') &&
        r.size === 1 &&
        !r.isArray &&
        (t == null || t.castToBaseTexture !== void 0),
      code: (r) => `t = syncData.textureCount++;

            renderer.texture.bind(uv["${r}"], t);

            if(ud["${r}"].value !== t)
            {
                ud["${r}"].value = t;
                gl.uniform1i(ud["${r}"].location, t);
; // eslint-disable-line max-len
            }`
    },
    {
      test: (r, t) => r.type === 'mat3' && r.size === 1 && !r.isArray && t.a !== void 0,
      code: (r) => `
            gl.uniformMatrix3fv(ud["${r}"].location, false, uv["${r}"].toArray(true));
            `,
      codeUbo: (r) => `
                var ${r}_matrix = uv.${r}.toArray(true);

                data[offset] = ${r}_matrix[0];
                data[offset+1] = ${r}_matrix[1];
                data[offset+2] = ${r}_matrix[2];
        
                data[offset + 4] = ${r}_matrix[3];
                data[offset + 5] = ${r}_matrix[4];
                data[offset + 6] = ${r}_matrix[5];
        
                data[offset + 8] = ${r}_matrix[6];
                data[offset + 9] = ${r}_matrix[7];
                data[offset + 10] = ${r}_matrix[8];
            `
    },
    {
      test: (r, t) => r.type === 'vec2' && r.size === 1 && !r.isArray && t.x !== void 0,
      code: (r) => `
                cv = ud["${r}"].value;
                v = uv["${r}"];

                if(cv[0] !== v.x || cv[1] !== v.y)
                {
                    cv[0] = v.x;
                    cv[1] = v.y;
                    gl.uniform2f(ud["${r}"].location, v.x, v.y);
                }`,
      codeUbo: (r) => `
                v = uv.${r};

                data[offset] = v.x;
                data[offset+1] = v.y;
            `
    },
    {
      test: (r) => r.type === 'vec2' && r.size === 1 && !r.isArray,
      code: (r) => `
                cv = ud["${r}"].value;
                v = uv["${r}"];

                if(cv[0] !== v[0] || cv[1] !== v[1])
                {
                    cv[0] = v[0];
                    cv[1] = v[1];
                    gl.uniform2f(ud["${r}"].location, v[0], v[1]);
                }
            `
    },
    {
      test: (r, t) => r.type === 'vec4' && r.size === 1 && !r.isArray && t.width !== void 0,
      code: (r) => `
                cv = ud["${r}"].value;
                v = uv["${r}"];

                if(cv[0] !== v.x || cv[1] !== v.y || cv[2] !== v.width || cv[3] !== v.height)
                {
                    cv[0] = v.x;
                    cv[1] = v.y;
                    cv[2] = v.width;
                    cv[3] = v.height;
                    gl.uniform4f(ud["${r}"].location, v.x, v.y, v.width, v.height)
                }`,
      codeUbo: (r) => `
                    v = uv.${r};

                    data[offset] = v.x;
                    data[offset+1] = v.y;
                    data[offset+2] = v.width;
                    data[offset+3] = v.height;
                `
    },
    {
      test: (r, t) => r.type === 'vec4' && r.size === 1 && !r.isArray && t.red !== void 0,
      code: (r) => `
                cv = ud["${r}"].value;
                v = uv["${r}"];

                if(cv[0] !== v.red || cv[1] !== v.green || cv[2] !== v.blue || cv[3] !== v.alpha)
                {
                    cv[0] = v.red;
                    cv[1] = v.green;
                    cv[2] = v.blue;
                    cv[3] = v.alpha;
                    gl.uniform4f(ud["${r}"].location, v.red, v.green, v.blue, v.alpha)
                }`,
      codeUbo: (r) => `
                    v = uv.${r};

                    data[offset] = v.red;
                    data[offset+1] = v.green;
                    data[offset+2] = v.blue;
                    data[offset+3] = v.alpha;
                `
    },
    {
      test: (r, t) => r.type === 'vec3' && r.size === 1 && !r.isArray && t.red !== void 0,
      code: (r) => `
                cv = ud["${r}"].value;
                v = uv["${r}"];

                if(cv[0] !== v.red || cv[1] !== v.green || cv[2] !== v.blue || cv[3] !== v.a)
                {
                    cv[0] = v.red;
                    cv[1] = v.green;
                    cv[2] = v.blue;
    
                    gl.uniform3f(ud["${r}"].location, v.red, v.green, v.blue)
                }`,
      codeUbo: (r) => `
                    v = uv.${r};

                    data[offset] = v.red;
                    data[offset+1] = v.green;
                    data[offset+2] = v.blue;
                `
    },
    {
      test: (r) => r.type === 'vec4' && r.size === 1 && !r.isArray,
      code: (r) => `
                cv = ud["${r}"].value;
                v = uv["${r}"];

                if(cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2] || cv[3] !== v[3])
                {
                    cv[0] = v[0];
                    cv[1] = v[1];
                    cv[2] = v[2];
                    cv[3] = v[3];

                    gl.uniform4f(ud["${r}"].location, v[0], v[1], v[2], v[3])
                }`
    }
  ],
  z0 = {
    float: `
    if (cv !== v)
    {
        cu.value = v;
        gl.uniform1f(location, v);
    }`,
    vec2: `
    if (cv[0] !== v[0] || cv[1] !== v[1])
    {
        cv[0] = v[0];
        cv[1] = v[1];

        gl.uniform2f(location, v[0], v[1])
    }`,
    vec3: `
    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2])
    {
        cv[0] = v[0];
        cv[1] = v[1];
        cv[2] = v[2];

        gl.uniform3f(location, v[0], v[1], v[2])
    }`,
    vec4: `
    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2] || cv[3] !== v[3])
    {
        cv[0] = v[0];
        cv[1] = v[1];
        cv[2] = v[2];
        cv[3] = v[3];

        gl.uniform4f(location, v[0], v[1], v[2], v[3]);
    }`,
    int: `
    if (cv !== v)
    {
        cu.value = v;

        gl.uniform1i(location, v);
    }`,
    ivec2: `
    if (cv[0] !== v[0] || cv[1] !== v[1])
    {
        cv[0] = v[0];
        cv[1] = v[1];

        gl.uniform2i(location, v[0], v[1]);
    }`,
    ivec3: `
    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2])
    {
        cv[0] = v[0];
        cv[1] = v[1];
        cv[2] = v[2];

        gl.uniform3i(location, v[0], v[1], v[2]);
    }`,
    ivec4: `
    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2] || cv[3] !== v[3])
    {
        cv[0] = v[0];
        cv[1] = v[1];
        cv[2] = v[2];
        cv[3] = v[3];

        gl.uniform4i(location, v[0], v[1], v[2], v[3]);
    }`,
    uint: `
    if (cv !== v)
    {
        cu.value = v;

        gl.uniform1ui(location, v);
    }`,
    uvec2: `
    if (cv[0] !== v[0] || cv[1] !== v[1])
    {
        cv[0] = v[0];
        cv[1] = v[1];

        gl.uniform2ui(location, v[0], v[1]);
    }`,
    uvec3: `
    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2])
    {
        cv[0] = v[0];
        cv[1] = v[1];
        cv[2] = v[2];

        gl.uniform3ui(location, v[0], v[1], v[2]);
    }`,
    uvec4: `
    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2] || cv[3] !== v[3])
    {
        cv[0] = v[0];
        cv[1] = v[1];
        cv[2] = v[2];
        cv[3] = v[3];

        gl.uniform4ui(location, v[0], v[1], v[2], v[3]);
    }`,
    bool: `
    if (cv !== v)
    {
        cu.value = v;
        gl.uniform1i(location, v);
    }`,
    bvec2: `
    if (cv[0] != v[0] || cv[1] != v[1])
    {
        cv[0] = v[0];
        cv[1] = v[1];

        gl.uniform2i(location, v[0], v[1]);
    }`,
    bvec3: `
    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2])
    {
        cv[0] = v[0];
        cv[1] = v[1];
        cv[2] = v[2];

        gl.uniform3i(location, v[0], v[1], v[2]);
    }`,
    bvec4: `
    if (cv[0] !== v[0] || cv[1] !== v[1] || cv[2] !== v[2] || cv[3] !== v[3])
    {
        cv[0] = v[0];
        cv[1] = v[1];
        cv[2] = v[2];
        cv[3] = v[3];

        gl.uniform4i(location, v[0], v[1], v[2], v[3]);
    }`,
    mat2: 'gl.uniformMatrix2fv(location, false, v)',
    mat3: 'gl.uniformMatrix3fv(location, false, v)',
    mat4: 'gl.uniformMatrix4fv(location, false, v)',
    sampler2D: `
    if (cv !== v)
    {
        cu.value = v;

        gl.uniform1i(location, v);
    }`,
    samplerCube: `
    if (cv !== v)
    {
        cu.value = v;

        gl.uniform1i(location, v);
    }`,
    sampler2DArray: `
    if (cv !== v)
    {
        cu.value = v;

        gl.uniform1i(location, v);
    }`
  },
  Y0 = {
    float: 'gl.uniform1fv(location, v)',
    vec2: 'gl.uniform2fv(location, v)',
    vec3: 'gl.uniform3fv(location, v)',
    vec4: 'gl.uniform4fv(location, v)',
    mat4: 'gl.uniformMatrix4fv(location, false, v)',
    mat3: 'gl.uniformMatrix3fv(location, false, v)',
    mat2: 'gl.uniformMatrix2fv(location, false, v)',
    int: 'gl.uniform1iv(location, v)',
    ivec2: 'gl.uniform2iv(location, v)',
    ivec3: 'gl.uniform3iv(location, v)',
    ivec4: 'gl.uniform4iv(location, v)',
    uint: 'gl.uniform1uiv(location, v)',
    uvec2: 'gl.uniform2uiv(location, v)',
    uvec3: 'gl.uniform3uiv(location, v)',
    uvec4: 'gl.uniform4uiv(location, v)',
    bool: 'gl.uniform1iv(location, v)',
    bvec2: 'gl.uniform2iv(location, v)',
    bvec3: 'gl.uniform3iv(location, v)',
    bvec4: 'gl.uniform4iv(location, v)',
    sampler2D: 'gl.uniform1iv(location, v)',
    samplerCube: 'gl.uniform1iv(location, v)',
    sampler2DArray: 'gl.uniform1iv(location, v)'
  }
function Q0(r, t) {
  var i
  const e = [
    `
        var v = null;
        var cv = null;
        var cu = null;
        var t = 0;
        var gl = renderer.gl;
    `
  ]
  for (const s in r.uniforms) {
    const n = t[s]
    if (!n) {
      ;((i = r.uniforms[s]) == null ? void 0 : i.group) === !0 &&
        (r.uniforms[s].ubo
          ? e.push(`
                        renderer.shader.syncUniformBufferGroup(uv.${s}, '${s}');
                    `)
          : e.push(`
                        renderer.shader.syncUniformGroup(uv.${s}, syncData);
                    `))
      continue
    }
    const o = r.uniforms[s]
    let a = !1
    for (let h = 0; h < ki.length; h++)
      if (ki[h].test(n, o)) {
        e.push(ki[h].code(s, o)), (a = !0)
        break
      }
    if (!a) {
      const h = (n.size === 1 && !n.isArray ? z0 : Y0)[n.type].replace(
        'location',
        `ud["${s}"].location`
      )
      e.push(`
            cu = ud["${s}"];
            cv = cu.value;
            v = uv["${s}"];
            ${h};`)
    }
  }
  return new Function(
    'ud',
    'uv',
    'renderer',
    'syncData',
    e.join(`
`)
  )
}
const Gf = {}
let vi = Gf
function K0() {
  if (vi === Gf || (vi != null && vi.isContextLost())) {
    const r = Y.ADAPTER.createCanvas()
    let t
    Y.PREFER_ENV >= pi.WEBGL2 && (t = r.getContext('webgl2', {})),
      t ||
        ((t = r.getContext('webgl', {}) || r.getContext('experimental-webgl', {})),
        t ? t.getExtension('WEBGL_draw_buffers') : (t = null)),
      (vi = t)
  }
  return vi
}
let fn
function q0() {
  if (!fn) {
    fn = Te.MEDIUM
    const r = K0()
    if (r && r.getShaderPrecisionFormat) {
      const t = r.getShaderPrecisionFormat(r.FRAGMENT_SHADER, r.HIGH_FLOAT)
      t && (fn = t.precision ? Te.HIGH : Te.MEDIUM)
    }
  }
  return fn
}
function gu(r, t) {
  const e = r
      .getShaderSource(t)
      .split(
        `
`
      )
      .map((l, c) => `${c}: ${l}`),
    i = r.getShaderInfoLog(t),
    s = i.split(`
`),
    n = {},
    o = s
      .map((l) => parseFloat(l.replace(/^ERROR\: 0\:([\d]+)\:.*$/, '$1')))
      .filter((l) => (l && !n[l] ? ((n[l] = !0), !0) : !1)),
    a = ['']
  o.forEach((l) => {
    ;(e[l - 1] = `%c${e[l - 1]}%c`),
      a.push('background: #FF0000; color:#FFFFFF; font-size: 10px', 'font-size: 10px')
  })
  const h = e.join(`
`)
  ;(a[0] = h),
    console.error(i),
    console.groupCollapsed('click to view full shader code'),
    console.warn(...a),
    console.groupEnd()
}
function Z0(r, t, e, i) {
  r.getProgramParameter(t, r.LINK_STATUS) ||
    (r.getShaderParameter(e, r.COMPILE_STATUS) || gu(r, e),
    r.getShaderParameter(i, r.COMPILE_STATUS) || gu(r, i),
    console.error('PixiJS Error: Could not initialize shader.'),
    r.getProgramInfoLog(t) !== '' &&
      console.warn('PixiJS Warning: gl.getProgramInfoLog()', r.getProgramInfoLog(t)))
}
const J0 = {
  float: 1,
  vec2: 2,
  vec3: 3,
  vec4: 4,
  int: 1,
  ivec2: 2,
  ivec3: 3,
  ivec4: 4,
  uint: 1,
  uvec2: 2,
  uvec3: 3,
  uvec4: 4,
  bool: 1,
  bvec2: 2,
  bvec3: 3,
  bvec4: 4,
  mat2: 4,
  mat3: 9,
  mat4: 16,
  sampler2D: 1
}
function Hf(r) {
  return J0[r]
}
let pn = null
const _u = {
  FLOAT: 'float',
  FLOAT_VEC2: 'vec2',
  FLOAT_VEC3: 'vec3',
  FLOAT_VEC4: 'vec4',
  INT: 'int',
  INT_VEC2: 'ivec2',
  INT_VEC3: 'ivec3',
  INT_VEC4: 'ivec4',
  UNSIGNED_INT: 'uint',
  UNSIGNED_INT_VEC2: 'uvec2',
  UNSIGNED_INT_VEC3: 'uvec3',
  UNSIGNED_INT_VEC4: 'uvec4',
  BOOL: 'bool',
  BOOL_VEC2: 'bvec2',
  BOOL_VEC3: 'bvec3',
  BOOL_VEC4: 'bvec4',
  FLOAT_MAT2: 'mat2',
  FLOAT_MAT3: 'mat3',
  FLOAT_MAT4: 'mat4',
  SAMPLER_2D: 'sampler2D',
  INT_SAMPLER_2D: 'sampler2D',
  UNSIGNED_INT_SAMPLER_2D: 'sampler2D',
  SAMPLER_CUBE: 'samplerCube',
  INT_SAMPLER_CUBE: 'samplerCube',
  UNSIGNED_INT_SAMPLER_CUBE: 'samplerCube',
  SAMPLER_2D_ARRAY: 'sampler2DArray',
  INT_SAMPLER_2D_ARRAY: 'sampler2DArray',
  UNSIGNED_INT_SAMPLER_2D_ARRAY: 'sampler2DArray'
}
function Vf(r, t) {
  if (!pn) {
    const e = Object.keys(_u)
    pn = {}
    for (let i = 0; i < e.length; ++i) {
      const s = e[i]
      pn[r[s]] = _u[s]
    }
  }
  return pn[t]
}
function yu(r, t, e) {
  if (r.substring(0, 9) !== 'precision') {
    let i = t
    return (
      t === Te.HIGH && e !== Te.HIGH && (i = Te.MEDIUM),
      `precision ${i} float;
${r}`
    )
  } else if (e !== Te.HIGH && r.substring(0, 15) === 'precision highp')
    return r.replace('precision highp', 'precision mediump')
  return r
}
let rs
function tv() {
  if (typeof rs == 'boolean') return rs
  try {
    rs =
      new Function('param1', 'param2', 'param3', 'return param1[param2] === param3;')(
        { a: 'b' },
        'a',
        'b'
      ) === !0
  } catch {
    rs = !1
  }
  return rs
}
let ev = 0
const mn = {},
  vh = class wi {
    constructor(t, e, i = 'pixi-shader', s = {}) {
      ;(this.extra = {}),
        (this.id = ev++),
        (this.vertexSrc = t || wi.defaultVertexSrc),
        (this.fragmentSrc = e || wi.defaultFragmentSrc),
        (this.vertexSrc = this.vertexSrc.trim()),
        (this.fragmentSrc = this.fragmentSrc.trim()),
        (this.extra = s),
        this.vertexSrc.substring(0, 8) !== '#version' &&
          ((i = i.replace(/\s+/g, '-')),
          mn[i] ? (mn[i]++, (i += `-${mn[i]}`)) : (mn[i] = 1),
          (this.vertexSrc = `#define SHADER_NAME ${i}
${this.vertexSrc}`),
          (this.fragmentSrc = `#define SHADER_NAME ${i}
${this.fragmentSrc}`),
          (this.vertexSrc = yu(this.vertexSrc, wi.defaultVertexPrecision, Te.HIGH)),
          (this.fragmentSrc = yu(this.fragmentSrc, wi.defaultFragmentPrecision, q0()))),
        (this.glPrograms = {}),
        (this.syncUniforms = null)
    }
    static get defaultVertexSrc() {
      return $0
    }
    static get defaultFragmentSrc() {
      return W0
    }
    static from(t, e, i) {
      const s = t + e
      let n = cu[s]
      return n || (cu[s] = n = new wi(t, e, i)), n
    }
  }
;(vh.defaultVertexPrecision = Te.HIGH),
  (vh.defaultFragmentPrecision = lr.apple.device ? Te.HIGH : Te.MEDIUM)
let ur = vh,
  rv = 0
class Le {
  constructor(t, e, i) {
    ;(this.group = !0),
      (this.syncUniforms = {}),
      (this.dirtyId = 0),
      (this.id = rv++),
      (this.static = !!e),
      (this.ubo = !!i),
      t instanceof Ut
        ? ((this.buffer = t),
          (this.buffer.type = Ze.UNIFORM_BUFFER),
          (this.autoManage = !1),
          (this.ubo = !0))
        : ((this.uniforms = t),
          this.ubo &&
            ((this.buffer = new Ut(new Float32Array(1))),
            (this.buffer.type = Ze.UNIFORM_BUFFER),
            (this.autoManage = !0)))
  }
  update() {
    this.dirtyId++, !this.autoManage && this.buffer && this.buffer.update()
  }
  add(t, e, i) {
    if (!this.ubo) this.uniforms[t] = new Le(e, i)
    else
      throw new Error(
        '[UniformGroup] uniform groups in ubo mode cannot be modified, or have uniform groups nested in them'
      )
  }
  static from(t, e, i) {
    return new Le(t, e, i)
  }
  static uboFrom(t, e) {
    return new Le(t, e ?? !0, !0)
  }
}
class Je {
  constructor(t, e) {
    ;(this.uniformBindCount = 0),
      (this.program = t),
      e
        ? e instanceof Le
          ? (this.uniformGroup = e)
          : (this.uniformGroup = new Le(e))
        : (this.uniformGroup = new Le({})),
      (this.disposeRunner = new Oe('disposeShader'))
  }
  checkUniformExists(t, e) {
    if (e.uniforms[t]) return !0
    for (const i in e.uniforms) {
      const s = e.uniforms[i]
      if (s.group === !0 && this.checkUniformExists(t, s)) return !0
    }
    return !1
  }
  destroy() {
    ;(this.uniformGroup = null), this.disposeRunner.emit(this), this.disposeRunner.destroy()
  }
  get uniforms() {
    return this.uniformGroup.uniforms
  }
  static from(t, e, i) {
    const s = ur.from(t, e)
    return new Je(s, i)
  }
}
class iv {
  constructor(t, e) {
    if (
      ((this.vertexSrc = t),
      (this.fragTemplate = e),
      (this.programCache = {}),
      (this.defaultGroupCache = {}),
      !e.includes('%count%'))
    )
      throw new Error('Fragment template must contain "%count%".')
    if (!e.includes('%forloop%')) throw new Error('Fragment template must contain "%forloop%".')
  }
  generateShader(t) {
    if (!this.programCache[t]) {
      const i = new Int32Array(t)
      for (let n = 0; n < t; n++) i[n] = n
      this.defaultGroupCache[t] = Le.from({ uSamplers: i }, !0)
      let s = this.fragTemplate
      ;(s = s.replace(/%count%/gi, `${t}`)),
        (s = s.replace(/%forloop%/gi, this.generateSampleSrc(t))),
        (this.programCache[t] = new ur(this.vertexSrc, s))
    }
    const e = {
      tint: new Float32Array([1, 1, 1, 1]),
      translationMatrix: new Ct(),
      default: this.defaultGroupCache[t]
    }
    return new Je(this.programCache[t], e)
  }
  generateSampleSrc(t) {
    let e = ''
    ;(e += `
`),
      (e += `
`)
    for (let i = 0; i < t; i++)
      i > 0 &&
        (e += `
else `),
        i < t - 1 && (e += `if(vTextureId < ${i}.5)`),
        (e += `
{`),
        (e += `
	color = texture2D(uSamplers[${i}], vTextureCoord);`),
        (e += `
}`)
    return (
      (e += `
`),
      (e += `
`),
      e
    )
  }
}
class xh {
  constructor() {
    ;(this.elements = []), (this.ids = []), (this.count = 0)
  }
  clear() {
    for (let t = 0; t < this.count; t++) this.elements[t] = null
    this.count = 0
  }
}
function sv() {
  return !lr.apple.device
}
function nv(r) {
  let t = !0
  const e = Y.ADAPTER.getNavigator()
  if (lr.tablet || lr.phone) {
    if (lr.apple.device) {
      const i = e.userAgent.match(/OS (\d+)_(\d+)?/)
      i && parseInt(i[1], 10) < 11 && (t = !1)
    }
    if (lr.android.device) {
      const i = e.userAgent.match(/Android\s([0-9.]*)/)
      i && parseInt(i[1], 10) < 7 && (t = !1)
    }
  }
  return t ? r : 4
}
class Oo {
  constructor(t) {
    this.renderer = t
  }
  flush() {}
  destroy() {
    this.renderer = null
  }
  start() {}
  stop() {
    this.flush()
  }
  render(t) {}
}
var ov = `varying vec2 vTextureCoord;
varying vec4 vColor;
varying float vTextureId;
uniform sampler2D uSamplers[%count%];

void main(void){
    vec4 color;
    %forloop%
    gl_FragColor = color * vColor;
}
`,
  av = `precision highp float;
attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;
attribute vec4 aColor;
attribute float aTextureId;

uniform mat3 projectionMatrix;
uniform mat3 translationMatrix;
uniform vec4 tint;

varying vec2 vTextureCoord;
varying vec4 vColor;
varying float vTextureId;

void main(void){
    gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);

    vTextureCoord = aTextureCoord;
    vTextureId = aTextureId;
    vColor = aColor * tint;
}
`
const hs = class Pe extends Oo {
  constructor(t) {
    super(t),
      this.setShaderGenerator(),
      (this.geometryClass = Nf),
      (this.vertexSize = 6),
      (this.state = nr.for2d()),
      (this.size = Pe.defaultBatchSize * 4),
      (this._vertexCount = 0),
      (this._indexCount = 0),
      (this._bufferedElements = []),
      (this._bufferedTextures = []),
      (this._bufferSize = 0),
      (this._shader = null),
      (this._packedGeometries = []),
      (this._packedGeometryPoolSize = 2),
      (this._flushId = 0),
      (this._aBuffers = {}),
      (this._iBuffers = {}),
      (this.maxTextures = 1),
      this.renderer.on('prerender', this.onPrerender, this),
      t.runners.contextChange.add(this),
      (this._dcIndex = 0),
      (this._aIndex = 0),
      (this._iIndex = 0),
      (this._attributeBuffer = null),
      (this._indexBuffer = null),
      (this._tempBoundTextures = [])
  }
  static get defaultMaxTextures() {
    return (this._defaultMaxTextures = this._defaultMaxTextures ?? nv(32)), this._defaultMaxTextures
  }
  static set defaultMaxTextures(t) {
    this._defaultMaxTextures = t
  }
  static get canUploadSameBuffer() {
    return (
      (this._canUploadSameBuffer = this._canUploadSameBuffer ?? sv()), this._canUploadSameBuffer
    )
  }
  static set canUploadSameBuffer(t) {
    this._canUploadSameBuffer = t
  }
  get MAX_TEXTURES() {
    return (
      ut('7.1.0', 'BatchRenderer#MAX_TEXTURES renamed to BatchRenderer#maxTextures'),
      this.maxTextures
    )
  }
  static get defaultVertexSrc() {
    return av
  }
  static get defaultFragmentTemplate() {
    return ov
  }
  setShaderGenerator({
    vertex: t = Pe.defaultVertexSrc,
    fragment: e = Pe.defaultFragmentTemplate
  } = {}) {
    this.shaderGenerator = new iv(t, e)
  }
  contextChange() {
    const t = this.renderer.gl
    Y.PREFER_ENV === pi.WEBGL_LEGACY
      ? (this.maxTextures = 1)
      : ((this.maxTextures = Math.min(
          t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS),
          Pe.defaultMaxTextures
        )),
        (this.maxTextures = O0(this.maxTextures, t))),
      (this._shader = this.shaderGenerator.generateShader(this.maxTextures))
    for (let e = 0; e < this._packedGeometryPoolSize; e++)
      this._packedGeometries[e] = new this.geometryClass()
    this.initFlushBuffers()
  }
  initFlushBuffers() {
    const { _drawCallPool: t, _textureArrayPool: e } = Pe,
      i = this.size / 4,
      s = Math.floor(i / this.maxTextures) + 1
    for (; t.length < i; ) t.push(new _h())
    for (; e.length < s; ) e.push(new xh())
    for (let n = 0; n < this.maxTextures; n++) this._tempBoundTextures[n] = null
  }
  onPrerender() {
    this._flushId = 0
  }
  render(t) {
    t._texture.valid &&
      (this._vertexCount + t.vertexData.length / 2 > this.size && this.flush(),
      (this._vertexCount += t.vertexData.length / 2),
      (this._indexCount += t.indices.length),
      (this._bufferedTextures[this._bufferSize] = t._texture.baseTexture),
      (this._bufferedElements[this._bufferSize++] = t))
  }
  buildTexturesAndDrawCalls() {
    const { _bufferedTextures: t, maxTextures: e } = this,
      i = Pe._textureArrayPool,
      s = this.renderer.batch,
      n = this._tempBoundTextures,
      o = this.renderer.textureGC.count
    let a = ++ht._globalBatch,
      h = 0,
      l = i[0],
      c = 0
    s.copyBoundTextures(n, e)
    for (let u = 0; u < this._bufferSize; ++u) {
      const d = t[u]
      ;(t[u] = null),
        d._batchEnabled !== a &&
          (l.count >= e &&
            (s.boundArray(l, n, a, e), this.buildDrawCalls(l, c, u), (c = u), (l = i[++h]), ++a),
          (d._batchEnabled = a),
          (d.touched = o),
          (l.elements[l.count++] = d))
    }
    l.count > 0 && (s.boundArray(l, n, a, e), this.buildDrawCalls(l, c, this._bufferSize), ++h, ++a)
    for (let u = 0; u < n.length; u++) n[u] = null
    ht._globalBatch = a
  }
  buildDrawCalls(t, e, i) {
    const { _bufferedElements: s, _attributeBuffer: n, _indexBuffer: o, vertexSize: a } = this,
      h = Pe._drawCallPool
    let l = this._dcIndex,
      c = this._aIndex,
      u = this._iIndex,
      d = h[l]
    ;(d.start = this._iIndex), (d.texArray = t)
    for (let f = e; f < i; ++f) {
      const p = s[f],
        m = p._texture.baseTexture,
        g = Ff[m.alphaMode ? 1 : 0][p.blendMode]
      ;(s[f] = null),
        e < f &&
          d.blend !== g &&
          ((d.size = u - d.start), (e = f), (d = h[++l]), (d.texArray = t), (d.start = u)),
        this.packInterleavedGeometry(p, n, o, c, u),
        (c += (p.vertexData.length / 2) * a),
        (u += p.indices.length),
        (d.blend = g)
    }
    e < i && ((d.size = u - d.start), ++l),
      (this._dcIndex = l),
      (this._aIndex = c),
      (this._iIndex = u)
  }
  bindAndClearTexArray(t) {
    const e = this.renderer.texture
    for (let i = 0; i < t.count; i++) e.bind(t.elements[i], t.ids[i]), (t.elements[i] = null)
    t.count = 0
  }
  updateGeometry() {
    const { _packedGeometries: t, _attributeBuffer: e, _indexBuffer: i } = this
    Pe.canUploadSameBuffer
      ? (t[this._flushId]._buffer.update(e.rawBinaryData),
        t[this._flushId]._indexBuffer.update(i),
        this.renderer.geometry.updateBuffers())
      : (this._packedGeometryPoolSize <= this._flushId &&
          (this._packedGeometryPoolSize++, (t[this._flushId] = new this.geometryClass())),
        t[this._flushId]._buffer.update(e.rawBinaryData),
        t[this._flushId]._indexBuffer.update(i),
        this.renderer.geometry.bind(t[this._flushId]),
        this.renderer.geometry.updateBuffers(),
        this._flushId++)
  }
  drawBatches() {
    const t = this._dcIndex,
      { gl: e, state: i } = this.renderer,
      s = Pe._drawCallPool
    let n = null
    for (let o = 0; o < t; o++) {
      const { texArray: a, type: h, size: l, start: c, blend: u } = s[o]
      n !== a && ((n = a), this.bindAndClearTexArray(a)),
        (this.state.blendMode = u),
        i.set(this.state),
        e.drawElements(h, l, e.UNSIGNED_SHORT, c * 2)
    }
  }
  flush() {
    this._vertexCount !== 0 &&
      ((this._attributeBuffer = this.getAttributeBuffer(this._vertexCount)),
      (this._indexBuffer = this.getIndexBuffer(this._indexCount)),
      (this._aIndex = 0),
      (this._iIndex = 0),
      (this._dcIndex = 0),
      this.buildTexturesAndDrawCalls(),
      this.updateGeometry(),
      this.drawBatches(),
      (this._bufferSize = 0),
      (this._vertexCount = 0),
      (this._indexCount = 0))
  }
  start() {
    this.renderer.state.set(this.state),
      this.renderer.texture.ensureSamplerType(this.maxTextures),
      this.renderer.shader.bind(this._shader),
      Pe.canUploadSameBuffer && this.renderer.geometry.bind(this._packedGeometries[this._flushId])
  }
  stop() {
    this.flush()
  }
  destroy() {
    for (let t = 0; t < this._packedGeometryPoolSize; t++)
      this._packedGeometries[t] && this._packedGeometries[t].destroy()
    this.renderer.off('prerender', this.onPrerender, this),
      (this._aBuffers = null),
      (this._iBuffers = null),
      (this._packedGeometries = null),
      (this._attributeBuffer = null),
      (this._indexBuffer = null),
      this._shader && (this._shader.destroy(), (this._shader = null)),
      super.destroy()
  }
  getAttributeBuffer(t) {
    const e = to(Math.ceil(t / 8)),
      i = hu(e),
      s = e * 8
    this._aBuffers.length <= i && (this._iBuffers.length = i + 1)
    let n = this._aBuffers[s]
    return n || (this._aBuffers[s] = n = new ph(s * this.vertexSize * 4)), n
  }
  getIndexBuffer(t) {
    const e = to(Math.ceil(t / 12)),
      i = hu(e),
      s = e * 12
    this._iBuffers.length <= i && (this._iBuffers.length = i + 1)
    let n = this._iBuffers[i]
    return n || (this._iBuffers[i] = n = new Uint16Array(s)), n
  }
  packInterleavedGeometry(t, e, i, s, n) {
    const { uint32View: o, float32View: a } = e,
      h = s / this.vertexSize,
      l = t.uvs,
      c = t.indices,
      u = t.vertexData,
      d = t._texture.baseTexture._batchLocation,
      f = Math.min(t.worldAlpha, 1),
      p = St.shared.setValue(t._tintRGB).toPremultiplied(f, t._texture.baseTexture.alphaMode > 0)
    for (let m = 0; m < u.length; m += 2)
      (a[s++] = u[m]),
        (a[s++] = u[m + 1]),
        (a[s++] = l[m]),
        (a[s++] = l[m + 1]),
        (o[s++] = p),
        (a[s++] = d)
    for (let m = 0; m < c.length; m++) i[n++] = h + c[m]
  }
}
;(hs.defaultBatchSize = 4096),
  (hs.extension = { name: 'batch', type: j.RendererPlugin }),
  (hs._drawCallPool = []),
  (hs._textureArrayPool = [])
let Qr = hs
q.add(Qr)
var hv = `varying vec2 vTextureCoord;

uniform sampler2D uSampler;

void main(void){
   gl_FragColor = texture2D(uSampler, vTextureCoord);
}
`,
  lv = `attribute vec2 aVertexPosition;

uniform mat3 projectionMatrix;

varying vec2 vTextureCoord;

uniform vec4 inputSize;
uniform vec4 outputFrame;

vec4 filterVertexPosition( void )
{
    vec2 position = aVertexPosition * max(outputFrame.zw, vec2(0.)) + outputFrame.xy;

    return vec4((projectionMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);
}

vec2 filterTextureCoord( void )
{
    return aVertexPosition * (outputFrame.zw * inputSize.zw);
}

void main(void)
{
    gl_Position = filterVertexPosition();
    vTextureCoord = filterTextureCoord();
}
`
const bh = class ls extends Je {
  constructor(t, e, i) {
    const s = ur.from(t || ls.defaultVertexSrc, e || ls.defaultFragmentSrc)
    super(s, i),
      (this.padding = 0),
      (this.resolution = ls.defaultResolution),
      (this.multisample = ls.defaultMultisample),
      (this.enabled = !0),
      (this.autoFit = !0),
      (this.state = new nr())
  }
  apply(t, e, i, s, n) {
    t.applyFilter(this, e, i, s)
  }
  get blendMode() {
    return this.state.blendMode
  }
  set blendMode(t) {
    this.state.blendMode = t
  }
  get resolution() {
    return this._resolution
  }
  set resolution(t) {
    this._resolution = t
  }
  static get defaultVertexSrc() {
    return lv
  }
  static get defaultFragmentSrc() {
    return hv
  }
}
;(bh.defaultResolution = 1), (bh.defaultMultisample = Xt.NONE)
let Jt = bh
class io {
  constructor() {
    ;(this.clearBeforeRender = !0), (this._backgroundColor = new St(0)), (this.alpha = 1)
  }
  init(t) {
    this.clearBeforeRender = t.clearBeforeRender
    const { backgroundColor: e, background: i, backgroundAlpha: s } = t,
      n = i ?? e
    n !== void 0 && (this.color = n), (this.alpha = s)
  }
  get color() {
    return this._backgroundColor.value
  }
  set color(t) {
    this._backgroundColor.setValue(t)
  }
  get alpha() {
    return this._backgroundColor.alpha
  }
  set alpha(t) {
    this._backgroundColor.setAlpha(t)
  }
  get backgroundColor() {
    return this._backgroundColor
  }
  destroy() {}
}
;(io.defaultOptions = { backgroundAlpha: 1, backgroundColor: 0, clearBeforeRender: !0 }),
  (io.extension = { type: [j.RendererSystem, j.CanvasRendererSystem], name: 'background' })
q.add(io)
class Xf {
  constructor(t) {
    ;(this.renderer = t),
      (this.emptyRenderer = new Oo(t)),
      (this.currentRenderer = this.emptyRenderer)
  }
  setObjectRenderer(t) {
    this.currentRenderer !== t &&
      (this.currentRenderer.stop(), (this.currentRenderer = t), this.currentRenderer.start())
  }
  flush() {
    this.setObjectRenderer(this.emptyRenderer)
  }
  reset() {
    this.setObjectRenderer(this.emptyRenderer)
  }
  copyBoundTextures(t, e) {
    const { boundTextures: i } = this.renderer.texture
    for (let s = e - 1; s >= 0; --s) (t[s] = i[s] || null), t[s] && (t[s]._batchLocation = s)
  }
  boundArray(t, e, i, s) {
    const { elements: n, ids: o, count: a } = t
    let h = 0
    for (let l = 0; l < a; l++) {
      const c = n[l],
        u = c._batchLocation
      if (u >= 0 && u < s && e[u] === c) {
        o[l] = u
        continue
      }
      for (; h < s; ) {
        const d = e[h]
        if (d && d._batchEnabled === i && d._batchLocation === h) {
          h++
          continue
        }
        ;(o[l] = h), (c._batchLocation = h), (e[h] = c)
        break
      }
    }
  }
  destroy() {
    this.renderer = null
  }
}
Xf.extension = { type: j.RendererSystem, name: 'batch' }
q.add(Xf)
let Au = 0
class so {
  constructor(t) {
    ;(this.renderer = t),
      (this.webGLVersion = 1),
      (this.extensions = {}),
      (this.supports = { uint32Indices: !1 }),
      (this.handleContextLost = this.handleContextLost.bind(this)),
      (this.handleContextRestored = this.handleContextRestored.bind(this))
  }
  get isLost() {
    return !this.gl || this.gl.isContextLost()
  }
  contextChange(t) {
    ;(this.gl = t), (this.renderer.gl = t), (this.renderer.CONTEXT_UID = Au++)
  }
  init(t) {
    if (t.context) this.initFromContext(t.context)
    else {
      const e = this.renderer.background.alpha < 1,
        i = t.premultipliedAlpha
      ;(this.preserveDrawingBuffer = t.preserveDrawingBuffer),
        (this.useContextAlpha = t.useContextAlpha),
        (this.powerPreference = t.powerPreference),
        this.initFromOptions({
          alpha: e,
          premultipliedAlpha: i,
          antialias: t.antialias,
          stencil: !0,
          preserveDrawingBuffer: t.preserveDrawingBuffer,
          powerPreference: t.powerPreference
        })
    }
  }
  initFromContext(t) {
    ;(this.gl = t),
      this.validateContext(t),
      (this.renderer.gl = t),
      (this.renderer.CONTEXT_UID = Au++),
      this.renderer.runners.contextChange.emit(t)
    const e = this.renderer.view
    e.addEventListener !== void 0 &&
      (e.addEventListener('webglcontextlost', this.handleContextLost, !1),
      e.addEventListener('webglcontextrestored', this.handleContextRestored, !1))
  }
  initFromOptions(t) {
    const e = this.createContext(this.renderer.view, t)
    this.initFromContext(e)
  }
  createContext(t, e) {
    let i
    if ((Y.PREFER_ENV >= pi.WEBGL2 && (i = t.getContext('webgl2', e)), i)) this.webGLVersion = 2
    else if (
      ((this.webGLVersion = 1),
      (i = t.getContext('webgl', e) || t.getContext('experimental-webgl', e)),
      !i)
    )
      throw new Error('This browser does not support WebGL. Try using the canvas renderer')
    return (this.gl = i), this.getExtensions(), this.gl
  }
  getExtensions() {
    const { gl: t } = this,
      e = {
        loseContext: t.getExtension('WEBGL_lose_context'),
        anisotropicFiltering: t.getExtension('EXT_texture_filter_anisotropic'),
        floatTextureLinear: t.getExtension('OES_texture_float_linear'),
        s3tc: t.getExtension('WEBGL_compressed_texture_s3tc'),
        s3tc_sRGB: t.getExtension('WEBGL_compressed_texture_s3tc_srgb'),
        etc: t.getExtension('WEBGL_compressed_texture_etc'),
        etc1: t.getExtension('WEBGL_compressed_texture_etc1'),
        pvrtc:
          t.getExtension('WEBGL_compressed_texture_pvrtc') ||
          t.getExtension('WEBKIT_WEBGL_compressed_texture_pvrtc'),
        atc: t.getExtension('WEBGL_compressed_texture_atc'),
        astc: t.getExtension('WEBGL_compressed_texture_astc'),
        bptc: t.getExtension('EXT_texture_compression_bptc')
      }
    this.webGLVersion === 1
      ? Object.assign(this.extensions, e, {
          drawBuffers: t.getExtension('WEBGL_draw_buffers'),
          depthTexture: t.getExtension('WEBGL_depth_texture'),
          vertexArrayObject:
            t.getExtension('OES_vertex_array_object') ||
            t.getExtension('MOZ_OES_vertex_array_object') ||
            t.getExtension('WEBKIT_OES_vertex_array_object'),
          uint32ElementIndex: t.getExtension('OES_element_index_uint'),
          floatTexture: t.getExtension('OES_texture_float'),
          floatTextureLinear: t.getExtension('OES_texture_float_linear'),
          textureHalfFloat: t.getExtension('OES_texture_half_float'),
          textureHalfFloatLinear: t.getExtension('OES_texture_half_float_linear')
        })
      : this.webGLVersion === 2 &&
        Object.assign(this.extensions, e, {
          colorBufferFloat: t.getExtension('EXT_color_buffer_float')
        })
  }
  handleContextLost(t) {
    t.preventDefault(),
      setTimeout(() => {
        this.gl.isContextLost() &&
          this.extensions.loseContext &&
          this.extensions.loseContext.restoreContext()
      }, 0)
  }
  handleContextRestored() {
    this.renderer.runners.contextChange.emit(this.gl)
  }
  destroy() {
    const t = this.renderer.view
    ;(this.renderer = null),
      t.removeEventListener !== void 0 &&
        (t.removeEventListener('webglcontextlost', this.handleContextLost),
        t.removeEventListener('webglcontextrestored', this.handleContextRestored)),
      this.gl.useProgram(null),
      this.extensions.loseContext && this.extensions.loseContext.loseContext()
  }
  postrender() {
    this.renderer.objectRenderer.renderingToScreen && this.gl.flush()
  }
  validateContext(t) {
    const e = t.getContextAttributes(),
      i = 'WebGL2RenderingContext' in globalThis && t instanceof globalThis.WebGL2RenderingContext
    i && (this.webGLVersion = 2),
      e &&
        !e.stencil &&
        console.warn(
          'Provided WebGL context does not have a stencil buffer, masks may not render correctly'
        )
    const s = i || !!t.getExtension('OES_element_index_uint')
    ;(this.supports.uint32Indices = s),
      s ||
        console.warn(
          'Provided WebGL context does not support 32 index buffer, complex graphics may not render correctly'
        )
  }
}
;(so.defaultOptions = {
  context: null,
  antialias: !1,
  premultipliedAlpha: !0,
  preserveDrawingBuffer: !1,
  powerPreference: 'default'
}),
  (so.extension = { type: j.RendererSystem, name: 'context' })
q.add(so)
class Eh {
  constructor(t, e) {
    if (((this.width = Math.round(t)), (this.height = Math.round(e)), !this.width || !this.height))
      throw new Error('Framebuffer width or height is zero')
    ;(this.stencil = !1),
      (this.depth = !1),
      (this.dirtyId = 0),
      (this.dirtyFormat = 0),
      (this.dirtySize = 0),
      (this.depthTexture = null),
      (this.colorTextures = []),
      (this.glFramebuffers = {}),
      (this.disposeRunner = new Oe('disposeFramebuffer')),
      (this.multisample = Xt.NONE)
  }
  get colorTexture() {
    return this.colorTextures[0]
  }
  addColorTexture(t = 0, e) {
    return (
      (this.colorTextures[t] =
        e ||
        new ht(null, {
          scaleMode: Qt.NEAREST,
          resolution: 1,
          mipmap: sr.OFF,
          width: this.width,
          height: this.height
        })),
      this.dirtyId++,
      this.dirtyFormat++,
      this
    )
  }
  addDepthTexture(t) {
    return (
      (this.depthTexture =
        t ||
        new ht(null, {
          scaleMode: Qt.NEAREST,
          resolution: 1,
          width: this.width,
          height: this.height,
          mipmap: sr.OFF,
          format: D.DEPTH_COMPONENT,
          type: tt.UNSIGNED_SHORT
        })),
      this.dirtyId++,
      this.dirtyFormat++,
      this
    )
  }
  enableDepth() {
    return (this.depth = !0), this.dirtyId++, this.dirtyFormat++, this
  }
  enableStencil() {
    return (this.stencil = !0), this.dirtyId++, this.dirtyFormat++, this
  }
  resize(t, e) {
    if (((t = Math.round(t)), (e = Math.round(e)), !t || !e))
      throw new Error('Framebuffer width and height must not be zero')
    if (!(t === this.width && e === this.height)) {
      ;(this.width = t), (this.height = e), this.dirtyId++, this.dirtySize++
      for (let i = 0; i < this.colorTextures.length; i++) {
        const s = this.colorTextures[i],
          n = s.resolution
        s.setSize(t / n, e / n)
      }
      if (this.depthTexture) {
        const i = this.depthTexture.resolution
        this.depthTexture.setSize(t / i, e / i)
      }
    }
  }
  dispose() {
    this.disposeRunner.emit(this, !1)
  }
  destroyDepthTexture() {
    this.depthTexture &&
      (this.depthTexture.destroy(), (this.depthTexture = null), ++this.dirtyId, ++this.dirtyFormat)
  }
}
class jf extends ht {
  constructor(t = {}) {
    if (typeof t == 'number') {
      const e = arguments[0],
        i = arguments[1],
        s = arguments[2],
        n = arguments[3]
      t = { width: e, height: i, scaleMode: s, resolution: n }
    }
    ;(t.width = t.width ?? 100),
      (t.height = t.height ?? 100),
      t.multisample ?? (t.multisample = Xt.NONE),
      super(null, t),
      (this.mipmap = sr.OFF),
      (this.valid = !0),
      (this._clear = new St([0, 0, 0, 0])),
      (this.framebuffer = new Eh(this.realWidth, this.realHeight).addColorTexture(0, this)),
      (this.framebuffer.multisample = t.multisample),
      (this.maskStack = []),
      (this.filterStack = [{}])
  }
  set clearColor(t) {
    this._clear.setValue(t)
  }
  get clearColor() {
    return this._clear.value
  }
  get clear() {
    return this._clear
  }
  get multisample() {
    return this.framebuffer.multisample
  }
  set multisample(t) {
    this.framebuffer.multisample = t
  }
  resize(t, e) {
    this.framebuffer.resize(t * this.resolution, e * this.resolution),
      this.setRealSize(this.framebuffer.width, this.framebuffer.height)
  }
  dispose() {
    this.framebuffer.dispose(), super.dispose()
  }
  destroy() {
    super.destroy(), this.framebuffer.destroyDepthTexture(), (this.framebuffer = null)
  }
}
class gr extends Ls {
  constructor(t) {
    const e = t,
      i = e.naturalWidth || e.videoWidth || e.displayWidth || e.width,
      s = e.naturalHeight || e.videoHeight || e.displayHeight || e.height
    super(i, s), (this.source = t), (this.noSubImage = !1)
  }
  static crossOrigin(t, e, i) {
    i === void 0 && !e.startsWith('data:')
      ? (t.crossOrigin = B0(e))
      : i !== !1 && (t.crossOrigin = typeof i == 'string' ? i : 'anonymous')
  }
  upload(t, e, i, s) {
    const n = t.gl,
      o = e.realWidth,
      a = e.realHeight
    if (((s = s || this.source), typeof HTMLImageElement < 'u' && s instanceof HTMLImageElement)) {
      if (!s.complete || s.naturalWidth === 0) return !1
    } else if (typeof HTMLVideoElement < 'u' && s instanceof HTMLVideoElement && s.readyState <= 1)
      return !1
    return (
      n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL, e.alphaMode === de.UNPACK),
      !this.noSubImage && e.target === n.TEXTURE_2D && i.width === o && i.height === a
        ? n.texSubImage2D(n.TEXTURE_2D, 0, 0, 0, e.format, i.type, s)
        : ((i.width = o),
          (i.height = a),
          n.texImage2D(e.target, 0, i.internalFormat, e.format, i.type, s)),
      !0
    )
  }
  update() {
    if (this.destroyed) return
    const t = this.source,
      e = t.naturalWidth || t.videoWidth || t.width,
      i = t.naturalHeight || t.videoHeight || t.height
    this.resize(e, i), super.update()
  }
  dispose() {
    this.source = null
  }
}
class Wf extends gr {
  constructor(t, e) {
    if (((e = e || {}), typeof t == 'string')) {
      const i = new Image()
      gr.crossOrigin(i, t, e.crossorigin), (i.src = t), (t = i)
    }
    super(t),
      !t.complete && this._width && this._height && ((this._width = 0), (this._height = 0)),
      (this.url = t.src),
      (this._process = null),
      (this.preserveBitmap = !1),
      (this.createBitmap =
        (e.createBitmap ?? Y.CREATE_IMAGE_BITMAP) && !!globalThis.createImageBitmap),
      (this.alphaMode = typeof e.alphaMode == 'number' ? e.alphaMode : null),
      (this.bitmap = null),
      (this._load = null),
      e.autoLoad !== !1 && this.load()
  }
  load(t) {
    return this._load
      ? this._load
      : (t !== void 0 && (this.createBitmap = t),
        (this._load = new Promise((e, i) => {
          const s = this.source
          this.url = s.src
          const n = () => {
            this.destroyed ||
              ((s.onload = null),
              (s.onerror = null),
              this.update(),
              (this._load = null),
              this.createBitmap ? e(this.process()) : e(this))
          }
          s.complete && s.src
            ? n()
            : ((s.onload = n),
              (s.onerror = (o) => {
                i(o), this.onError.emit(o)
              }))
        })),
        this._load)
  }
  process() {
    const t = this.source
    if (this._process !== null) return this._process
    if (this.bitmap !== null || !globalThis.createImageBitmap) return Promise.resolve(this)
    const e = globalThis.createImageBitmap,
      i = !t.crossOrigin || t.crossOrigin === 'anonymous'
    return (
      (this._process = fetch(t.src, { mode: i ? 'cors' : 'no-cors' })
        .then((s) => s.blob())
        .then((s) =>
          e(s, 0, 0, t.width, t.height, {
            premultiplyAlpha:
              this.alphaMode === null || this.alphaMode === de.UNPACK ? 'premultiply' : 'none'
          })
        )
        .then((s) =>
          this.destroyed
            ? Promise.reject()
            : ((this.bitmap = s), this.update(), (this._process = null), Promise.resolve(this))
        )),
      this._process
    )
  }
  upload(t, e, i) {
    if ((typeof this.alphaMode == 'number' && (e.alphaMode = this.alphaMode), !this.createBitmap))
      return super.upload(t, e, i)
    if (!this.bitmap && (this.process(), !this.bitmap)) return !1
    if ((super.upload(t, e, i, this.bitmap), !this.preserveBitmap)) {
      let s = !0
      const n = e._glTextures
      for (const o in n) {
        const a = n[o]
        if (a !== i && a.dirtyId !== e.dirtyId) {
          s = !1
          break
        }
      }
      s && (this.bitmap.close && this.bitmap.close(), (this.bitmap = null))
    }
    return !0
  }
  dispose() {
    ;(this.source.onload = null),
      (this.source.onerror = null),
      super.dispose(),
      this.bitmap && (this.bitmap.close(), (this.bitmap = null)),
      (this._process = null),
      (this._load = null)
  }
  static test(t) {
    return typeof HTMLImageElement < 'u' && (typeof t == 'string' || t instanceof HTMLImageElement)
  }
}
class Rl {
  constructor() {
    ;(this.x0 = 0),
      (this.y0 = 0),
      (this.x1 = 1),
      (this.y1 = 0),
      (this.x2 = 1),
      (this.y2 = 1),
      (this.x3 = 0),
      (this.y3 = 1),
      (this.uvsFloat32 = new Float32Array(8))
  }
  set(t, e, i) {
    const s = e.width,
      n = e.height
    if (i) {
      const o = t.width / 2 / s,
        a = t.height / 2 / n,
        h = t.x / s + o,
        l = t.y / n + a
      ;(i = Bt.add(i, Bt.NW)),
        (this.x0 = h + o * Bt.uX(i)),
        (this.y0 = l + a * Bt.uY(i)),
        (i = Bt.add(i, 2)),
        (this.x1 = h + o * Bt.uX(i)),
        (this.y1 = l + a * Bt.uY(i)),
        (i = Bt.add(i, 2)),
        (this.x2 = h + o * Bt.uX(i)),
        (this.y2 = l + a * Bt.uY(i)),
        (i = Bt.add(i, 2)),
        (this.x3 = h + o * Bt.uX(i)),
        (this.y3 = l + a * Bt.uY(i))
    } else
      (this.x0 = t.x / s),
        (this.y0 = t.y / n),
        (this.x1 = (t.x + t.width) / s),
        (this.y1 = t.y / n),
        (this.x2 = (t.x + t.width) / s),
        (this.y2 = (t.y + t.height) / n),
        (this.x3 = t.x / s),
        (this.y3 = (t.y + t.height) / n)
    ;(this.uvsFloat32[0] = this.x0),
      (this.uvsFloat32[1] = this.y0),
      (this.uvsFloat32[2] = this.x1),
      (this.uvsFloat32[3] = this.y1),
      (this.uvsFloat32[4] = this.x2),
      (this.uvsFloat32[5] = this.y2),
      (this.uvsFloat32[6] = this.x3),
      (this.uvsFloat32[7] = this.y3)
  }
}
Rl.prototype.toString = function () {
  return `[@pixi/core:TextureUvs x0=${this.x0} y0=${this.y0} x1=${this.x1} y1=${this.y1} x2=${this.x2} y2=${this.y2} x3=${this.x3} y3=${this.y3}]`
}
const vu = new Rl()
function gn(r) {
  ;(r.destroy = function () {}),
    (r.on = function () {}),
    (r.once = function () {}),
    (r.emit = function () {})
}
class X extends Xs {
  constructor(t, e, i, s, n, o, a) {
    if (
      (super(),
      (this.noFrame = !1),
      e || ((this.noFrame = !0), (e = new nt(0, 0, 1, 1))),
      t instanceof X && (t = t.baseTexture),
      (this.baseTexture = t),
      (this._frame = e),
      (this.trim = s),
      (this.valid = !1),
      (this.destroyed = !1),
      (this._uvs = vu),
      (this.uvMatrix = null),
      (this.orig = i || e),
      (this._rotate = Number(n || 0)),
      n === !0)
    )
      this._rotate = 2
    else if (this._rotate % 2 !== 0)
      throw new Error('attempt to use diamond-shaped UVs. If you are sure, set rotation manually')
    ;(this.defaultAnchor = o ? new pt(o.x, o.y) : new pt(0, 0)),
      (this.defaultBorders = a),
      (this._updateID = 0),
      (this.textureCacheIds = []),
      t.valid
        ? this.noFrame
          ? t.valid && this.onBaseTextureUpdated(t)
          : (this.frame = e)
        : t.once('loaded', this.onBaseTextureUpdated, this),
      this.noFrame && t.on('update', this.onBaseTextureUpdated, this)
  }
  update() {
    this.baseTexture.resource && this.baseTexture.resource.update()
  }
  onBaseTextureUpdated(t) {
    if (this.noFrame) {
      if (!this.baseTexture.valid) return
      ;(this._frame.width = t.width),
        (this._frame.height = t.height),
        (this.valid = !0),
        this.updateUvs()
    } else this.frame = this._frame
    this.emit('update', this)
  }
  destroy(t) {
    if (this.baseTexture) {
      if (t) {
        const { resource: e } = this.baseTexture
        e != null && e.url && Ve[e.url] && X.removeFromCache(e.url), this.baseTexture.destroy()
      }
      this.baseTexture.off('loaded', this.onBaseTextureUpdated, this),
        this.baseTexture.off('update', this.onBaseTextureUpdated, this),
        (this.baseTexture = null)
    }
    ;(this._frame = null),
      (this._uvs = null),
      (this.trim = null),
      (this.orig = null),
      (this.valid = !1),
      X.removeFromCache(this),
      (this.textureCacheIds = null),
      (this.destroyed = !0),
      this.emit('destroyed', this),
      this.removeAllListeners()
  }
  clone() {
    var s
    const t = this._frame.clone(),
      e = this._frame === this.orig ? t : this.orig.clone(),
      i = new X(
        this.baseTexture,
        !this.noFrame && t,
        e,
        (s = this.trim) == null ? void 0 : s.clone(),
        this.rotate,
        this.defaultAnchor,
        this.defaultBorders
      )
    return this.noFrame && (i._frame = t), i
  }
  updateUvs() {
    this._uvs === vu && (this._uvs = new Rl()),
      this._uvs.set(this._frame, this.baseTexture, this.rotate),
      this._updateID++
  }
  static from(t, e = {}, i = Y.STRICT_TEXTURE_CACHE) {
    const s = typeof t == 'string'
    let n = null
    if (s) n = t
    else if (t instanceof ht) {
      if (!t.cacheId) {
        const a = (e == null ? void 0 : e.pixiIdPrefix) || 'pixiid'
        ;(t.cacheId = `${a}-${di()}`), ht.addToCache(t, t.cacheId)
      }
      n = t.cacheId
    } else {
      if (!t._pixiId) {
        const a = (e == null ? void 0 : e.pixiIdPrefix) || 'pixiid'
        t._pixiId = `${a}_${di()}`
      }
      n = t._pixiId
    }
    let o = Ve[n]
    if (s && i && !o) throw new Error(`The cacheId "${n}" does not exist in TextureCache.`)
    return (
      !o && !(t instanceof ht)
        ? (e.resolution || (e.resolution = mr(t)),
          (o = new X(new ht(t, e))),
          (o.baseTexture.cacheId = n),
          ht.addToCache(o.baseTexture, n),
          X.addToCache(o, n))
        : !o && t instanceof ht && ((o = new X(t)), X.addToCache(o, n)),
      o
    )
  }
  static fromURL(t, e) {
    const i = Object.assign({ autoLoad: !1 }, e == null ? void 0 : e.resourceOptions),
      s = X.from(t, Object.assign({ resourceOptions: i }, e), !1),
      n = s.baseTexture.resource
    return s.baseTexture.valid ? Promise.resolve(s) : n.load().then(() => Promise.resolve(s))
  }
  static fromBuffer(t, e, i, s) {
    return new X(ht.fromBuffer(t, e, i, s))
  }
  static fromLoader(t, e, i, s) {
    const n = new ht(
        t,
        Object.assign({ scaleMode: ht.defaultOptions.scaleMode, resolution: mr(e) }, s)
      ),
      { resource: o } = n
    o instanceof Wf && (o.url = e)
    const a = new X(n)
    return (
      i || (i = e),
      ht.addToCache(a.baseTexture, i),
      X.addToCache(a, i),
      i !== e && (ht.addToCache(a.baseTexture, e), X.addToCache(a, e)),
      a.baseTexture.valid
        ? Promise.resolve(a)
        : new Promise((h) => {
            a.baseTexture.once('loaded', () => h(a))
          })
    )
  }
  static addToCache(t, e) {
    e &&
      (t.textureCacheIds.includes(e) || t.textureCacheIds.push(e),
      Ve[e] &&
        Ve[e] !== t &&
        console.warn(`Texture added to the cache with an id [${e}] that already had an entry`),
      (Ve[e] = t))
  }
  static removeFromCache(t) {
    if (typeof t == 'string') {
      const e = Ve[t]
      if (e) {
        const i = e.textureCacheIds.indexOf(t)
        return i > -1 && e.textureCacheIds.splice(i, 1), delete Ve[t], e
      }
    } else if (t != null && t.textureCacheIds) {
      for (let e = 0; e < t.textureCacheIds.length; ++e)
        Ve[t.textureCacheIds[e]] === t && delete Ve[t.textureCacheIds[e]]
      return (t.textureCacheIds.length = 0), t
    }
    return null
  }
  get resolution() {
    return this.baseTexture.resolution
  }
  get frame() {
    return this._frame
  }
  set frame(t) {
    ;(this._frame = t), (this.noFrame = !1)
    const { x: e, y: i, width: s, height: n } = t,
      o = e + s > this.baseTexture.width,
      a = i + n > this.baseTexture.height
    if (o || a) {
      const h = o && a ? 'and' : 'or',
        l = `X: ${e} + ${s} = ${e + s} > ${this.baseTexture.width}`,
        c = `Y: ${i} + ${n} = ${i + n} > ${this.baseTexture.height}`
      throw new Error(
        `Texture Error: frame does not fit inside the base Texture dimensions: ${l} ${h} ${c}`
      )
    }
    ;(this.valid = s && n && this.baseTexture.valid),
      !this.trim && !this.rotate && (this.orig = t),
      this.valid && this.updateUvs()
  }
  get rotate() {
    return this._rotate
  }
  set rotate(t) {
    ;(this._rotate = t), this.valid && this.updateUvs()
  }
  get width() {
    return this.orig.width
  }
  get height() {
    return this.orig.height
  }
  castToBaseTexture() {
    return this.baseTexture
  }
  static get EMPTY() {
    return (
      X._EMPTY || ((X._EMPTY = new X(new ht())), gn(X._EMPTY), gn(X._EMPTY.baseTexture)), X._EMPTY
    )
  }
  static get WHITE() {
    if (!X._WHITE) {
      const t = Y.ADAPTER.createCanvas(16, 16),
        e = t.getContext('2d')
      ;(t.width = 16),
        (t.height = 16),
        (e.fillStyle = 'white'),
        e.fillRect(0, 0, 16, 16),
        (X._WHITE = new X(ht.from(t))),
        gn(X._WHITE),
        gn(X._WHITE.baseTexture)
    }
    return X._WHITE
  }
}
class mi extends X {
  constructor(t, e) {
    super(t, e),
      (this.valid = !0),
      (this.filterFrame = null),
      (this.filterPoolKey = null),
      this.updateUvs()
  }
  get framebuffer() {
    return this.baseTexture.framebuffer
  }
  get multisample() {
    return this.framebuffer.multisample
  }
  set multisample(t) {
    this.framebuffer.multisample = t
  }
  resize(t, e, i = !0) {
    const s = this.baseTexture.resolution,
      n = Math.round(t * s) / s,
      o = Math.round(e * s) / s
    ;(this.valid = n > 0 && o > 0),
      (this._frame.width = this.orig.width = n),
      (this._frame.height = this.orig.height = o),
      i && this.baseTexture.resize(n, o),
      this.updateUvs()
  }
  setResolution(t) {
    const { baseTexture: e } = this
    e.resolution !== t && (e.setResolution(t), this.resize(e.width, e.height, !1))
  }
  static create(t) {
    return new mi(new jf(t))
  }
}
class $f {
  constructor(t) {
    ;(this.texturePool = {}),
      (this.textureOptions = t || {}),
      (this.enableFullScreen = !1),
      (this._pixelsWidth = 0),
      (this._pixelsHeight = 0)
  }
  createTexture(t, e, i = Xt.NONE) {
    const s = new jf(
      Object.assign({ width: t, height: e, resolution: 1, multisample: i }, this.textureOptions)
    )
    return new mi(s)
  }
  getOptimalTexture(t, e, i = 1, s = Xt.NONE) {
    let n
    ;(t = Math.max(Math.ceil(t * i - 1e-6), 1)),
      (e = Math.max(Math.ceil(e * i - 1e-6), 1)),
      !this.enableFullScreen || t !== this._pixelsWidth || e !== this._pixelsHeight
        ? ((t = to(t)),
          (e = to(e)),
          (n = (((t & 65535) << 16) | (e & 65535)) >>> 0),
          s > 1 && (n += s * 4294967296))
        : (n = s > 1 ? -s : -1),
      this.texturePool[n] || (this.texturePool[n] = [])
    let o = this.texturePool[n].pop()
    return o || (o = this.createTexture(t, e, s)), (o.filterPoolKey = n), o.setResolution(i), o
  }
  getFilterTexture(t, e, i) {
    const s = this.getOptimalTexture(t.width, t.height, e || t.resolution, i || Xt.NONE)
    return (s.filterFrame = t.filterFrame), s
  }
  returnTexture(t) {
    const e = t.filterPoolKey
    ;(t.filterFrame = null), this.texturePool[e].push(t)
  }
  returnFilterTexture(t) {
    this.returnTexture(t)
  }
  clear(t) {
    if (((t = t !== !1), t))
      for (const e in this.texturePool) {
        const i = this.texturePool[e]
        if (i) for (let s = 0; s < i.length; s++) i[s].destroy(!0)
      }
    this.texturePool = {}
  }
  setScreenSize(t) {
    if (!(t.width === this._pixelsWidth && t.height === this._pixelsHeight)) {
      this.enableFullScreen = t.width > 0 && t.height > 0
      for (const e in this.texturePool) {
        if (!(Number(e) < 0)) continue
        const i = this.texturePool[e]
        if (i) for (let s = 0; s < i.length; s++) i[s].destroy(!0)
        this.texturePool[e] = []
      }
      ;(this._pixelsWidth = t.width), (this._pixelsHeight = t.height)
    }
  }
}
$f.SCREEN_KEY = -1
class cv extends Dr {
  constructor() {
    super(),
      this.addAttribute('aVertexPosition', new Float32Array([0, 0, 1, 0, 1, 1, 0, 1])).addIndex([
        0, 1, 3, 2
      ])
  }
}
class zf extends Dr {
  constructor() {
    super(),
      (this.vertices = new Float32Array([-1, -1, 1, -1, 1, 1, -1, 1])),
      (this.uvs = new Float32Array([0, 0, 1, 0, 1, 1, 0, 1])),
      (this.vertexBuffer = new Ut(this.vertices)),
      (this.uvBuffer = new Ut(this.uvs)),
      this.addAttribute('aVertexPosition', this.vertexBuffer)
        .addAttribute('aTextureCoord', this.uvBuffer)
        .addIndex([0, 1, 2, 0, 2, 3])
  }
  map(t, e) {
    let i = 0,
      s = 0
    return (
      (this.uvs[0] = i),
      (this.uvs[1] = s),
      (this.uvs[2] = i + e.width / t.width),
      (this.uvs[3] = s),
      (this.uvs[4] = i + e.width / t.width),
      (this.uvs[5] = s + e.height / t.height),
      (this.uvs[6] = i),
      (this.uvs[7] = s + e.height / t.height),
      (i = e.x),
      (s = e.y),
      (this.vertices[0] = i),
      (this.vertices[1] = s),
      (this.vertices[2] = i + e.width),
      (this.vertices[3] = s),
      (this.vertices[4] = i + e.width),
      (this.vertices[5] = s + e.height),
      (this.vertices[6] = i),
      (this.vertices[7] = s + e.height),
      this.invalidate(),
      this
    )
  }
  invalidate() {
    return this.vertexBuffer._updateID++, this.uvBuffer._updateID++, this
  }
}
class uv {
  constructor() {
    ;(this.renderTexture = null),
      (this.target = null),
      (this.legacy = !1),
      (this.resolution = 1),
      (this.multisample = Xt.NONE),
      (this.sourceFrame = new nt()),
      (this.destinationFrame = new nt()),
      (this.bindingSourceFrame = new nt()),
      (this.bindingDestinationFrame = new nt()),
      (this.filters = []),
      (this.transform = null)
  }
  clear() {
    ;(this.target = null), (this.filters = null), (this.renderTexture = null)
  }
}
const _n = [new pt(), new pt(), new pt(), new pt()],
  ba = new Ct()
class Yf {
  constructor(t) {
    ;(this.renderer = t),
      (this.defaultFilterStack = [{}]),
      (this.texturePool = new $f()),
      (this.statePool = []),
      (this.quad = new cv()),
      (this.quadUv = new zf()),
      (this.tempRect = new nt()),
      (this.activeState = {}),
      (this.globalUniforms = new Le(
        {
          outputFrame: new nt(),
          inputSize: new Float32Array(4),
          inputPixel: new Float32Array(4),
          inputClamp: new Float32Array(4),
          resolution: 1,
          filterArea: new Float32Array(4),
          filterClamp: new Float32Array(4)
        },
        !0
      )),
      (this.forceClear = !1),
      (this.useMaxPadding = !1)
  }
  init() {
    this.texturePool.setScreenSize(this.renderer.view)
  }
  push(t, e) {
    const i = this.renderer,
      s = this.defaultFilterStack,
      n = this.statePool.pop() || new uv(),
      o = i.renderTexture
    let a, h
    if (o.current) {
      const g = o.current
      ;(a = g.resolution), (h = g.multisample)
    } else (a = i.resolution), (h = i.multisample)
    let l = e[0].resolution || a,
      c = e[0].multisample ?? h,
      u = e[0].padding,
      d = e[0].autoFit,
      f = e[0].legacy ?? !0
    for (let g = 1; g < e.length; g++) {
      const A = e[g]
      ;(l = Math.min(l, A.resolution || a)),
        (c = Math.min(c, A.multisample ?? h)),
        (u = this.useMaxPadding ? Math.max(u, A.padding) : u + A.padding),
        (d = d && A.autoFit),
        (f = f || (A.legacy ?? !0))
    }
    s.length === 1 && (this.defaultFilterStack[0].renderTexture = o.current),
      s.push(n),
      (n.resolution = l),
      (n.multisample = c),
      (n.legacy = f),
      (n.target = t),
      n.sourceFrame.copyFrom(t.filterArea || t.getBounds(!0)),
      n.sourceFrame.pad(u)
    const p = this.tempRect.copyFrom(o.sourceFrame)
    i.projection.transform && this.transformAABB(ba.copyFrom(i.projection.transform).invert(), p),
      d
        ? (n.sourceFrame.fit(p),
          (n.sourceFrame.width <= 0 || n.sourceFrame.height <= 0) &&
            ((n.sourceFrame.width = 0), (n.sourceFrame.height = 0)))
        : n.sourceFrame.intersects(p) || ((n.sourceFrame.width = 0), (n.sourceFrame.height = 0)),
      this.roundFrame(
        n.sourceFrame,
        o.current ? o.current.resolution : i.resolution,
        o.sourceFrame,
        o.destinationFrame,
        i.projection.transform
      ),
      (n.renderTexture = this.getOptimalFilterTexture(
        n.sourceFrame.width,
        n.sourceFrame.height,
        l,
        c
      )),
      (n.filters = e),
      (n.destinationFrame.width = n.renderTexture.width),
      (n.destinationFrame.height = n.renderTexture.height)
    const m = this.tempRect
    ;(m.x = 0),
      (m.y = 0),
      (m.width = n.sourceFrame.width),
      (m.height = n.sourceFrame.height),
      (n.renderTexture.filterFrame = n.sourceFrame),
      n.bindingSourceFrame.copyFrom(o.sourceFrame),
      n.bindingDestinationFrame.copyFrom(o.destinationFrame),
      (n.transform = i.projection.transform),
      (i.projection.transform = null),
      o.bind(n.renderTexture, n.sourceFrame, m),
      i.framebuffer.clear(0, 0, 0, 0)
  }
  pop() {
    const t = this.defaultFilterStack,
      e = t.pop(),
      i = e.filters
    this.activeState = e
    const s = this.globalUniforms.uniforms
    ;(s.outputFrame = e.sourceFrame), (s.resolution = e.resolution)
    const n = s.inputSize,
      o = s.inputPixel,
      a = s.inputClamp
    if (
      ((n[0] = e.destinationFrame.width),
      (n[1] = e.destinationFrame.height),
      (n[2] = 1 / n[0]),
      (n[3] = 1 / n[1]),
      (o[0] = Math.round(n[0] * e.resolution)),
      (o[1] = Math.round(n[1] * e.resolution)),
      (o[2] = 1 / o[0]),
      (o[3] = 1 / o[1]),
      (a[0] = 0.5 * o[2]),
      (a[1] = 0.5 * o[3]),
      (a[2] = e.sourceFrame.width * n[2] - 0.5 * o[2]),
      (a[3] = e.sourceFrame.height * n[3] - 0.5 * o[3]),
      e.legacy)
    ) {
      const l = s.filterArea
      ;(l[0] = e.destinationFrame.width),
        (l[1] = e.destinationFrame.height),
        (l[2] = e.sourceFrame.x),
        (l[3] = e.sourceFrame.y),
        (s.filterClamp = s.inputClamp)
    }
    this.globalUniforms.update()
    const h = t[t.length - 1]
    if ((this.renderer.framebuffer.blit(), i.length === 1))
      i[0].apply(this, e.renderTexture, h.renderTexture, Ye.BLEND, e),
        this.returnFilterTexture(e.renderTexture)
    else {
      let l = e.renderTexture,
        c = this.getOptimalFilterTexture(l.width, l.height, e.resolution)
      c.filterFrame = l.filterFrame
      let u = 0
      for (u = 0; u < i.length - 1; ++u) {
        u === 1 &&
          e.multisample > 1 &&
          ((c = this.getOptimalFilterTexture(l.width, l.height, e.resolution)),
          (c.filterFrame = l.filterFrame)),
          i[u].apply(this, l, c, Ye.CLEAR, e)
        const d = l
        ;(l = c), (c = d)
      }
      i[u].apply(this, l, h.renderTexture, Ye.BLEND, e),
        u > 1 && e.multisample > 1 && this.returnFilterTexture(e.renderTexture),
        this.returnFilterTexture(l),
        this.returnFilterTexture(c)
    }
    e.clear(), this.statePool.push(e)
  }
  bindAndClear(t, e = Ye.CLEAR) {
    const { renderTexture: i, state: s } = this.renderer
    if (
      (t === this.defaultFilterStack[this.defaultFilterStack.length - 1].renderTexture
        ? (this.renderer.projection.transform = this.activeState.transform)
        : (this.renderer.projection.transform = null),
      t == null ? void 0 : t.filterFrame)
    ) {
      const o = this.tempRect
      ;(o.x = 0),
        (o.y = 0),
        (o.width = t.filterFrame.width),
        (o.height = t.filterFrame.height),
        i.bind(t, t.filterFrame, o)
    } else
      t !== this.defaultFilterStack[this.defaultFilterStack.length - 1].renderTexture
        ? i.bind(t)
        : this.renderer.renderTexture.bind(
            t,
            this.activeState.bindingSourceFrame,
            this.activeState.bindingDestinationFrame
          )
    const n = s.stateId & 1 || this.forceClear
    ;(e === Ye.CLEAR || (e === Ye.BLIT && n)) && this.renderer.framebuffer.clear(0, 0, 0, 0)
  }
  applyFilter(t, e, i, s) {
    const n = this.renderer
    n.state.set(t.state),
      this.bindAndClear(i, s),
      (t.uniforms.uSampler = e),
      (t.uniforms.filterGlobals = this.globalUniforms),
      n.shader.bind(t),
      (t.legacy = !!t.program.attributeData.aTextureCoord),
      t.legacy
        ? (this.quadUv.map(e._frame, e.filterFrame),
          n.geometry.bind(this.quadUv),
          n.geometry.draw(qe.TRIANGLES))
        : (n.geometry.bind(this.quad), n.geometry.draw(qe.TRIANGLE_STRIP))
  }
  calculateSpriteMatrix(t, e) {
    const { sourceFrame: i, destinationFrame: s } = this.activeState,
      { orig: n } = e._texture,
      o = t.set(s.width, 0, 0, s.height, i.x, i.y),
      a = e.worldTransform.copyTo(Ct.TEMP_MATRIX)
    return (
      a.invert(),
      o.prepend(a),
      o.scale(1 / n.width, 1 / n.height),
      o.translate(e.anchor.x, e.anchor.y),
      o
    )
  }
  destroy() {
    ;(this.renderer = null), this.texturePool.clear(!1)
  }
  getOptimalFilterTexture(t, e, i = 1, s = Xt.NONE) {
    return this.texturePool.getOptimalTexture(t, e, i, s)
  }
  getFilterTexture(t, e, i) {
    if (typeof t == 'number') {
      const n = t
      ;(t = e), (e = n)
    }
    t = t || this.activeState.renderTexture
    const s = this.texturePool.getOptimalTexture(t.width, t.height, e || t.resolution, i || Xt.NONE)
    return (s.filterFrame = t.filterFrame), s
  }
  returnFilterTexture(t) {
    this.texturePool.returnTexture(t)
  }
  emptyPool() {
    this.texturePool.clear(!0)
  }
  resize() {
    this.texturePool.setScreenSize(this.renderer.view)
  }
  transformAABB(t, e) {
    const i = _n[0],
      s = _n[1],
      n = _n[2],
      o = _n[3]
    i.set(e.left, e.top),
      s.set(e.left, e.bottom),
      n.set(e.right, e.top),
      o.set(e.right, e.bottom),
      t.apply(i, i),
      t.apply(s, s),
      t.apply(n, n),
      t.apply(o, o)
    const a = Math.min(i.x, s.x, n.x, o.x),
      h = Math.min(i.y, s.y, n.y, o.y),
      l = Math.max(i.x, s.x, n.x, o.x),
      c = Math.max(i.y, s.y, n.y, o.y)
    ;(e.x = a), (e.y = h), (e.width = l - a), (e.height = c - h)
  }
  roundFrame(t, e, i, s, n) {
    if (!(t.width <= 0 || t.height <= 0 || i.width <= 0 || i.height <= 0)) {
      if (n) {
        const { a: o, b: a, c: h, d: l } = n
        if (
          (Math.abs(a) > 1e-4 || Math.abs(h) > 1e-4) &&
          (Math.abs(o) > 1e-4 || Math.abs(l) > 1e-4)
        )
          return
      }
      ;(n = n ? ba.copyFrom(n) : ba.identity()),
        n
          .translate(-i.x, -i.y)
          .scale(s.width / i.width, s.height / i.height)
          .translate(s.x, s.y),
        this.transformAABB(n, t),
        t.ceil(e),
        this.transformAABB(n.invert(), t)
    }
  }
}
Yf.extension = { type: j.RendererSystem, name: 'filter' }
q.add(Yf)
class dv {
  constructor(t) {
    ;(this.framebuffer = t),
      (this.stencil = null),
      (this.dirtyId = -1),
      (this.dirtyFormat = -1),
      (this.dirtySize = -1),
      (this.multisample = Xt.NONE),
      (this.msaaBuffer = null),
      (this.blitFramebuffer = null),
      (this.mipLevel = 0)
  }
}
const fv = new nt()
class Qf {
  constructor(t) {
    ;(this.renderer = t),
      (this.managedFramebuffers = []),
      (this.unknownFramebuffer = new Eh(10, 10)),
      (this.msaaSamples = null)
  }
  contextChange() {
    this.disposeAll(!0)
    const t = (this.gl = this.renderer.gl)
    if (
      ((this.CONTEXT_UID = this.renderer.CONTEXT_UID),
      (this.current = this.unknownFramebuffer),
      (this.viewport = new nt()),
      (this.hasMRT = !0),
      (this.writeDepthTexture = !0),
      this.renderer.context.webGLVersion === 1)
    ) {
      let e = this.renderer.context.extensions.drawBuffers,
        i = this.renderer.context.extensions.depthTexture
      Y.PREFER_ENV === pi.WEBGL_LEGACY && ((e = null), (i = null)),
        e
          ? (t.drawBuffers = (s) => e.drawBuffersWEBGL(s))
          : ((this.hasMRT = !1), (t.drawBuffers = () => {})),
        i || (this.writeDepthTexture = !1)
    } else this.msaaSamples = t.getInternalformatParameter(t.RENDERBUFFER, t.RGBA8, t.SAMPLES)
  }
  bind(t, e, i = 0) {
    const { gl: s } = this
    if (t) {
      const n = t.glFramebuffers[this.CONTEXT_UID] || this.initFramebuffer(t)
      this.current !== t && ((this.current = t), s.bindFramebuffer(s.FRAMEBUFFER, n.framebuffer)),
        n.mipLevel !== i && (t.dirtyId++, t.dirtyFormat++, (n.mipLevel = i)),
        n.dirtyId !== t.dirtyId &&
          ((n.dirtyId = t.dirtyId),
          n.dirtyFormat !== t.dirtyFormat
            ? ((n.dirtyFormat = t.dirtyFormat),
              (n.dirtySize = t.dirtySize),
              this.updateFramebuffer(t, i))
            : n.dirtySize !== t.dirtySize &&
              ((n.dirtySize = t.dirtySize), this.resizeFramebuffer(t)))
      for (let o = 0; o < t.colorTextures.length; o++) {
        const a = t.colorTextures[o]
        this.renderer.texture.unbind(a.parentTextureArray || a)
      }
      if ((t.depthTexture && this.renderer.texture.unbind(t.depthTexture), e)) {
        const o = e.width >> i,
          a = e.height >> i,
          h = o / e.width
        this.setViewport(e.x * h, e.y * h, o, a)
      } else {
        const o = t.width >> i,
          a = t.height >> i
        this.setViewport(0, 0, o, a)
      }
    } else
      this.current && ((this.current = null), s.bindFramebuffer(s.FRAMEBUFFER, null)),
        e
          ? this.setViewport(e.x, e.y, e.width, e.height)
          : this.setViewport(0, 0, this.renderer.width, this.renderer.height)
  }
  setViewport(t, e, i, s) {
    const n = this.viewport
    ;(t = Math.round(t)),
      (e = Math.round(e)),
      (i = Math.round(i)),
      (s = Math.round(s)),
      (n.width !== i || n.height !== s || n.x !== t || n.y !== e) &&
        ((n.x = t), (n.y = e), (n.width = i), (n.height = s), this.gl.viewport(t, e, i, s))
  }
  get size() {
    return this.current
      ? { x: 0, y: 0, width: this.current.width, height: this.current.height }
      : { x: 0, y: 0, width: this.renderer.width, height: this.renderer.height }
  }
  clear(t, e, i, s, n = Ka.COLOR | Ka.DEPTH) {
    const { gl: o } = this
    o.clearColor(t, e, i, s), o.clear(n)
  }
  initFramebuffer(t) {
    const { gl: e } = this,
      i = new dv(e.createFramebuffer())
    return (
      (i.multisample = this.detectSamples(t.multisample)),
      (t.glFramebuffers[this.CONTEXT_UID] = i),
      this.managedFramebuffers.push(t),
      t.disposeRunner.add(this),
      i
    )
  }
  resizeFramebuffer(t) {
    const { gl: e } = this,
      i = t.glFramebuffers[this.CONTEXT_UID]
    if (i.stencil) {
      e.bindRenderbuffer(e.RENDERBUFFER, i.stencil)
      let o
      this.renderer.context.webGLVersion === 1
        ? (o = e.DEPTH_STENCIL)
        : t.depth && t.stencil
          ? (o = e.DEPTH24_STENCIL8)
          : t.depth
            ? (o = e.DEPTH_COMPONENT24)
            : (o = e.STENCIL_INDEX8),
        i.msaaBuffer
          ? e.renderbufferStorageMultisample(e.RENDERBUFFER, i.multisample, o, t.width, t.height)
          : e.renderbufferStorage(e.RENDERBUFFER, o, t.width, t.height)
    }
    const s = t.colorTextures
    let n = s.length
    e.drawBuffers || (n = Math.min(n, 1))
    for (let o = 0; o < n; o++) {
      const a = s[o],
        h = a.parentTextureArray || a
      this.renderer.texture.bind(h, 0),
        o === 0 &&
          i.msaaBuffer &&
          (e.bindRenderbuffer(e.RENDERBUFFER, i.msaaBuffer),
          e.renderbufferStorageMultisample(
            e.RENDERBUFFER,
            i.multisample,
            h._glTextures[this.CONTEXT_UID].internalFormat,
            t.width,
            t.height
          ))
    }
    t.depthTexture && this.writeDepthTexture && this.renderer.texture.bind(t.depthTexture, 0)
  }
  updateFramebuffer(t, e) {
    const { gl: i } = this,
      s = t.glFramebuffers[this.CONTEXT_UID],
      n = t.colorTextures
    let o = n.length
    i.drawBuffers || (o = Math.min(o, 1)),
      s.multisample > 1 && this.canMultisampleFramebuffer(t)
        ? (s.msaaBuffer = s.msaaBuffer || i.createRenderbuffer())
        : s.msaaBuffer &&
          (i.deleteRenderbuffer(s.msaaBuffer),
          (s.msaaBuffer = null),
          s.blitFramebuffer && (s.blitFramebuffer.dispose(), (s.blitFramebuffer = null)))
    const a = []
    for (let h = 0; h < o; h++) {
      const l = n[h],
        c = l.parentTextureArray || l
      this.renderer.texture.bind(c, 0),
        h === 0 && s.msaaBuffer
          ? (i.bindRenderbuffer(i.RENDERBUFFER, s.msaaBuffer),
            i.renderbufferStorageMultisample(
              i.RENDERBUFFER,
              s.multisample,
              c._glTextures[this.CONTEXT_UID].internalFormat,
              t.width,
              t.height
            ),
            i.framebufferRenderbuffer(
              i.FRAMEBUFFER,
              i.COLOR_ATTACHMENT0,
              i.RENDERBUFFER,
              s.msaaBuffer
            ))
          : (i.framebufferTexture2D(
              i.FRAMEBUFFER,
              i.COLOR_ATTACHMENT0 + h,
              l.target,
              c._glTextures[this.CONTEXT_UID].texture,
              e
            ),
            a.push(i.COLOR_ATTACHMENT0 + h))
    }
    if ((a.length > 1 && i.drawBuffers(a), t.depthTexture && this.writeDepthTexture)) {
      const h = t.depthTexture
      this.renderer.texture.bind(h, 0),
        i.framebufferTexture2D(
          i.FRAMEBUFFER,
          i.DEPTH_ATTACHMENT,
          i.TEXTURE_2D,
          h._glTextures[this.CONTEXT_UID].texture,
          e
        )
    }
    if ((t.stencil || t.depth) && !(t.depthTexture && this.writeDepthTexture)) {
      s.stencil = s.stencil || i.createRenderbuffer()
      let h, l
      this.renderer.context.webGLVersion === 1
        ? ((h = i.DEPTH_STENCIL_ATTACHMENT), (l = i.DEPTH_STENCIL))
        : t.depth && t.stencil
          ? ((h = i.DEPTH_STENCIL_ATTACHMENT), (l = i.DEPTH24_STENCIL8))
          : t.depth
            ? ((h = i.DEPTH_ATTACHMENT), (l = i.DEPTH_COMPONENT24))
            : ((h = i.STENCIL_ATTACHMENT), (l = i.STENCIL_INDEX8)),
        i.bindRenderbuffer(i.RENDERBUFFER, s.stencil),
        s.msaaBuffer
          ? i.renderbufferStorageMultisample(i.RENDERBUFFER, s.multisample, l, t.width, t.height)
          : i.renderbufferStorage(i.RENDERBUFFER, l, t.width, t.height),
        i.framebufferRenderbuffer(i.FRAMEBUFFER, h, i.RENDERBUFFER, s.stencil)
    } else s.stencil && (i.deleteRenderbuffer(s.stencil), (s.stencil = null))
  }
  canMultisampleFramebuffer(t) {
    return (
      this.renderer.context.webGLVersion !== 1 && t.colorTextures.length <= 1 && !t.depthTexture
    )
  }
  detectSamples(t) {
    const { msaaSamples: e } = this
    let i = Xt.NONE
    if (t <= 1 || e === null) return i
    for (let s = 0; s < e.length; s++)
      if (e[s] <= t) {
        i = e[s]
        break
      }
    return i === 1 && (i = Xt.NONE), i
  }
  blit(t, e, i) {
    const { current: s, renderer: n, gl: o, CONTEXT_UID: a } = this
    if (n.context.webGLVersion !== 2 || !s) return
    const h = s.glFramebuffers[a]
    if (!h) return
    if (!t) {
      if (!h.msaaBuffer) return
      const c = s.colorTextures[0]
      if (!c) return
      h.blitFramebuffer ||
        ((h.blitFramebuffer = new Eh(s.width, s.height)), h.blitFramebuffer.addColorTexture(0, c)),
        (t = h.blitFramebuffer),
        t.colorTextures[0] !== c && ((t.colorTextures[0] = c), t.dirtyId++, t.dirtyFormat++),
        (t.width !== s.width || t.height !== s.height) &&
          ((t.width = s.width), (t.height = s.height), t.dirtyId++, t.dirtySize++)
    }
    e || ((e = fv), (e.width = s.width), (e.height = s.height)), i || (i = e)
    const l = e.width === i.width && e.height === i.height
    this.bind(t),
      o.bindFramebuffer(o.READ_FRAMEBUFFER, h.framebuffer),
      o.blitFramebuffer(
        e.left,
        e.top,
        e.right,
        e.bottom,
        i.left,
        i.top,
        i.right,
        i.bottom,
        o.COLOR_BUFFER_BIT,
        l ? o.NEAREST : o.LINEAR
      ),
      o.bindFramebuffer(o.READ_FRAMEBUFFER, t.glFramebuffers[this.CONTEXT_UID].framebuffer)
  }
  disposeFramebuffer(t, e) {
    const i = t.glFramebuffers[this.CONTEXT_UID],
      s = this.gl
    if (!i) return
    delete t.glFramebuffers[this.CONTEXT_UID]
    const n = this.managedFramebuffers.indexOf(t)
    n >= 0 && this.managedFramebuffers.splice(n, 1),
      t.disposeRunner.remove(this),
      e ||
        (s.deleteFramebuffer(i.framebuffer),
        i.msaaBuffer && s.deleteRenderbuffer(i.msaaBuffer),
        i.stencil && s.deleteRenderbuffer(i.stencil)),
      i.blitFramebuffer && this.disposeFramebuffer(i.blitFramebuffer, e)
  }
  disposeAll(t) {
    const e = this.managedFramebuffers
    this.managedFramebuffers = []
    for (let i = 0; i < e.length; i++) this.disposeFramebuffer(e[i], t)
  }
  forceStencil() {
    const t = this.current
    if (!t) return
    const e = t.glFramebuffers[this.CONTEXT_UID]
    if (!e || (e.stencil && t.stencil)) return
    t.stencil = !0
    const i = t.width,
      s = t.height,
      n = this.gl,
      o = (e.stencil = n.createRenderbuffer())
    n.bindRenderbuffer(n.RENDERBUFFER, o)
    let a, h
    this.renderer.context.webGLVersion === 1
      ? ((a = n.DEPTH_STENCIL_ATTACHMENT), (h = n.DEPTH_STENCIL))
      : t.depth
        ? ((a = n.DEPTH_STENCIL_ATTACHMENT), (h = n.DEPTH24_STENCIL8))
        : ((a = n.STENCIL_ATTACHMENT), (h = n.STENCIL_INDEX8)),
      e.msaaBuffer
        ? n.renderbufferStorageMultisample(n.RENDERBUFFER, e.multisample, h, i, s)
        : n.renderbufferStorage(n.RENDERBUFFER, h, i, s),
      n.framebufferRenderbuffer(n.FRAMEBUFFER, a, n.RENDERBUFFER, o)
  }
  reset() {
    ;(this.current = this.unknownFramebuffer), (this.viewport = new nt())
  }
  destroy() {
    this.renderer = null
  }
}
Qf.extension = { type: j.RendererSystem, name: 'framebuffer' }
q.add(Qf)
const Ea = { 5126: 4, 5123: 2, 5121: 1 }
class Kf {
  constructor(t) {
    ;(this.renderer = t),
      (this._activeGeometry = null),
      (this._activeVao = null),
      (this.hasVao = !0),
      (this.hasInstance = !0),
      (this.canUseUInt32ElementIndex = !1),
      (this.managedGeometries = {})
  }
  contextChange() {
    this.disposeAll(!0)
    const t = (this.gl = this.renderer.gl),
      e = this.renderer.context
    if (((this.CONTEXT_UID = this.renderer.CONTEXT_UID), e.webGLVersion !== 2)) {
      let i = this.renderer.context.extensions.vertexArrayObject
      Y.PREFER_ENV === pi.WEBGL_LEGACY && (i = null),
        i
          ? ((t.createVertexArray = () => i.createVertexArrayOES()),
            (t.bindVertexArray = (s) => i.bindVertexArrayOES(s)),
            (t.deleteVertexArray = (s) => i.deleteVertexArrayOES(s)))
          : ((this.hasVao = !1),
            (t.createVertexArray = () => null),
            (t.bindVertexArray = () => null),
            (t.deleteVertexArray = () => null))
    }
    if (e.webGLVersion !== 2) {
      const i = t.getExtension('ANGLE_instanced_arrays')
      i
        ? ((t.vertexAttribDivisor = (s, n) => i.vertexAttribDivisorANGLE(s, n)),
          (t.drawElementsInstanced = (s, n, o, a, h) =>
            i.drawElementsInstancedANGLE(s, n, o, a, h)),
          (t.drawArraysInstanced = (s, n, o, a) => i.drawArraysInstancedANGLE(s, n, o, a)))
        : (this.hasInstance = !1)
    }
    this.canUseUInt32ElementIndex = e.webGLVersion === 2 || !!e.extensions.uint32ElementIndex
  }
  bind(t, e) {
    e = e || this.renderer.shader.shader
    const { gl: i } = this
    let s = t.glVertexArrayObjects[this.CONTEXT_UID],
      n = !1
    s ||
      ((this.managedGeometries[t.id] = t),
      t.disposeRunner.add(this),
      (t.glVertexArrayObjects[this.CONTEXT_UID] = s = {}),
      (n = !0))
    const o = s[e.program.id] || this.initGeometryVao(t, e, n)
    ;(this._activeGeometry = t),
      this._activeVao !== o &&
        ((this._activeVao = o),
        this.hasVao ? i.bindVertexArray(o) : this.activateVao(t, e.program)),
      this.updateBuffers()
  }
  reset() {
    this.unbind()
  }
  updateBuffers() {
    const t = this._activeGeometry,
      e = this.renderer.buffer
    for (let i = 0; i < t.buffers.length; i++) {
      const s = t.buffers[i]
      e.update(s)
    }
  }
  checkCompatibility(t, e) {
    const i = t.attributes,
      s = e.attributeData
    for (const n in s)
      if (!i[n])
        throw new Error(`shader and geometry incompatible, geometry missing the "${n}" attribute`)
  }
  getSignature(t, e) {
    const i = t.attributes,
      s = e.attributeData,
      n = ['g', t.id]
    for (const o in i) s[o] && n.push(o, s[o].location)
    return n.join('-')
  }
  initGeometryVao(t, e, i = !0) {
    const s = this.gl,
      n = this.CONTEXT_UID,
      o = this.renderer.buffer,
      a = e.program
    a.glPrograms[n] || this.renderer.shader.generateProgram(e), this.checkCompatibility(t, a)
    const h = this.getSignature(t, a),
      l = t.glVertexArrayObjects[this.CONTEXT_UID]
    let c = l[h]
    if (c) return (l[a.id] = c), c
    const u = t.buffers,
      d = t.attributes,
      f = {},
      p = {}
    for (const m in u) (f[m] = 0), (p[m] = 0)
    for (const m in d)
      !d[m].size && a.attributeData[m]
        ? (d[m].size = a.attributeData[m].size)
        : d[m].size ||
          console.warn(
            `PIXI Geometry attribute '${m}' size cannot be determined (likely the bound shader does not have the attribute)`
          ),
        (f[d[m].buffer] += d[m].size * Ea[d[m].type])
    for (const m in d) {
      const g = d[m],
        A = g.size
      g.stride === void 0 &&
        (f[g.buffer] === A * Ea[g.type] ? (g.stride = 0) : (g.stride = f[g.buffer])),
        g.start === void 0 && ((g.start = p[g.buffer]), (p[g.buffer] += A * Ea[g.type]))
    }
    ;(c = s.createVertexArray()), s.bindVertexArray(c)
    for (let m = 0; m < u.length; m++) {
      const g = u[m]
      o.bind(g), i && g._glBuffers[n].refCount++
    }
    return (
      this.activateVao(t, a),
      (l[a.id] = c),
      (l[h] = c),
      s.bindVertexArray(null),
      o.unbind(Ze.ARRAY_BUFFER),
      c
    )
  }
  disposeGeometry(t, e) {
    var a
    if (!this.managedGeometries[t.id]) return
    delete this.managedGeometries[t.id]
    const i = t.glVertexArrayObjects[this.CONTEXT_UID],
      s = this.gl,
      n = t.buffers,
      o = (a = this.renderer) == null ? void 0 : a.buffer
    if ((t.disposeRunner.remove(this), !!i)) {
      if (o)
        for (let h = 0; h < n.length; h++) {
          const l = n[h]._glBuffers[this.CONTEXT_UID]
          l && (l.refCount--, l.refCount === 0 && !e && o.dispose(n[h], e))
        }
      if (!e) {
        for (const h in i)
          if (h[0] === 'g') {
            const l = i[h]
            this._activeVao === l && this.unbind(), s.deleteVertexArray(l)
          }
      }
      delete t.glVertexArrayObjects[this.CONTEXT_UID]
    }
  }
  disposeAll(t) {
    const e = Object.keys(this.managedGeometries)
    for (let i = 0; i < e.length; i++) this.disposeGeometry(this.managedGeometries[e[i]], t)
  }
  activateVao(t, e) {
    const i = this.gl,
      s = this.CONTEXT_UID,
      n = this.renderer.buffer,
      o = t.buffers,
      a = t.attributes
    t.indexBuffer && n.bind(t.indexBuffer)
    let h = null
    for (const l in a) {
      const c = a[l],
        u = o[c.buffer],
        d = u._glBuffers[s]
      if (e.attributeData[l]) {
        h !== d && (n.bind(u), (h = d))
        const f = e.attributeData[l].location
        if (
          (i.enableVertexAttribArray(f),
          i.vertexAttribPointer(f, c.size, c.type || i.FLOAT, c.normalized, c.stride, c.start),
          c.instance)
        )
          if (this.hasInstance) i.vertexAttribDivisor(f, c.divisor)
          else throw new Error('geometry error, GPU Instancing is not supported on this device')
      }
    }
  }
  draw(t, e, i, s) {
    const { gl: n } = this,
      o = this._activeGeometry
    if (o.indexBuffer) {
      const a = o.indexBuffer.data.BYTES_PER_ELEMENT,
        h = a === 2 ? n.UNSIGNED_SHORT : n.UNSIGNED_INT
      a === 2 || (a === 4 && this.canUseUInt32ElementIndex)
        ? o.instanced
          ? n.drawElementsInstanced(t, e || o.indexBuffer.data.length, h, (i || 0) * a, s || 1)
          : n.drawElements(t, e || o.indexBuffer.data.length, h, (i || 0) * a)
        : console.warn('unsupported index buffer type: uint32')
    } else
      o.instanced
        ? n.drawArraysInstanced(t, i, e || o.getSize(), s || 1)
        : n.drawArrays(t, i, e || o.getSize())
    return this
  }
  unbind() {
    this.gl.bindVertexArray(null), (this._activeVao = null), (this._activeGeometry = null)
  }
  destroy() {
    this.renderer = null
  }
}
Kf.extension = { type: j.RendererSystem, name: 'geometry' }
q.add(Kf)
const xu = new Ct()
class Pl {
  constructor(t, e) {
    ;(this._texture = t),
      (this.mapCoord = new Ct()),
      (this.uClampFrame = new Float32Array(4)),
      (this.uClampOffset = new Float32Array(2)),
      (this._textureID = -1),
      (this._updateID = 0),
      (this.clampOffset = 0),
      (this.clampMargin = typeof e > 'u' ? 0.5 : e),
      (this.isSimple = !1)
  }
  get texture() {
    return this._texture
  }
  set texture(t) {
    ;(this._texture = t), (this._textureID = -1)
  }
  multiplyUvs(t, e) {
    e === void 0 && (e = t)
    const i = this.mapCoord
    for (let s = 0; s < t.length; s += 2) {
      const n = t[s],
        o = t[s + 1]
      ;(e[s] = n * i.a + o * i.c + i.tx), (e[s + 1] = n * i.b + o * i.d + i.ty)
    }
    return e
  }
  update(t) {
    const e = this._texture
    if (!e || !e.valid || (!t && this._textureID === e._updateID)) return !1
    ;(this._textureID = e._updateID), this._updateID++
    const i = e._uvs
    this.mapCoord.set(i.x1 - i.x0, i.y1 - i.y0, i.x3 - i.x0, i.y3 - i.y0, i.x0, i.y0)
    const s = e.orig,
      n = e.trim
    n &&
      (xu.set(s.width / n.width, 0, 0, s.height / n.height, -n.x / n.width, -n.y / n.height),
      this.mapCoord.append(xu))
    const o = e.baseTexture,
      a = this.uClampFrame,
      h = this.clampMargin / o.resolution,
      l = this.clampOffset
    return (
      (a[0] = (e._frame.x + h + l) / o.width),
      (a[1] = (e._frame.y + h + l) / o.height),
      (a[2] = (e._frame.x + e._frame.width - h + l) / o.width),
      (a[3] = (e._frame.y + e._frame.height - h + l) / o.height),
      (this.uClampOffset[0] = l / o.realWidth),
      (this.uClampOffset[1] = l / o.realHeight),
      (this.isSimple =
        e._frame.width === o.width && e._frame.height === o.height && e.rotate === 0),
      !0
    )
  }
}
var pv = `varying vec2 vMaskCoord;
varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform sampler2D mask;
uniform float alpha;
uniform float npmAlpha;
uniform vec4 maskClamp;

void main(void)
{
    float clip = step(3.5,
        step(maskClamp.x, vMaskCoord.x) +
        step(maskClamp.y, vMaskCoord.y) +
        step(vMaskCoord.x, maskClamp.z) +
        step(vMaskCoord.y, maskClamp.w));

    vec4 original = texture2D(uSampler, vTextureCoord);
    vec4 masky = texture2D(mask, vMaskCoord);
    float alphaMul = 1.0 - npmAlpha * (1.0 - masky.a);

    original *= (alphaMul * masky.r * alpha * clip);

    gl_FragColor = original;
}
`,
  mv = `attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat3 projectionMatrix;
uniform mat3 otherMatrix;

varying vec2 vMaskCoord;
varying vec2 vTextureCoord;

void main(void)
{
    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);

    vTextureCoord = aTextureCoord;
    vMaskCoord = ( otherMatrix * vec3( aTextureCoord, 1.0)  ).xy;
}
`
class gv extends Jt {
  constructor(t, e, i) {
    let s = null
    typeof t != 'string' &&
      e === void 0 &&
      i === void 0 &&
      ((s = t), (t = void 0), (e = void 0), (i = void 0)),
      super(t || mv, e || pv, i),
      (this.maskSprite = s),
      (this.maskMatrix = new Ct())
  }
  get maskSprite() {
    return this._maskSprite
  }
  set maskSprite(t) {
    ;(this._maskSprite = t), this._maskSprite && (this._maskSprite.renderable = !1)
  }
  apply(t, e, i, s) {
    const n = this._maskSprite,
      o = n._texture
    o.valid &&
      (o.uvMatrix || (o.uvMatrix = new Pl(o, 0)),
      o.uvMatrix.update(),
      (this.uniforms.npmAlpha = o.baseTexture.alphaMode ? 0 : 1),
      (this.uniforms.mask = o),
      (this.uniforms.otherMatrix = t
        .calculateSpriteMatrix(this.maskMatrix, n)
        .prepend(o.uvMatrix.mapCoord)),
      (this.uniforms.alpha = n.worldAlpha),
      (this.uniforms.maskClamp = o.uvMatrix.uClampFrame),
      t.applyFilter(this, e, i, s))
  }
}
class _v {
  constructor(t = null) {
    ;(this.type = Wt.NONE),
      (this.autoDetect = !0),
      (this.maskObject = t || null),
      (this.pooled = !1),
      (this.isMaskData = !0),
      (this.resolution = null),
      (this.multisample = Jt.defaultMultisample),
      (this.enabled = !0),
      (this.colorMask = 15),
      (this._filters = null),
      (this._stencilCounter = 0),
      (this._scissorCounter = 0),
      (this._scissorRect = null),
      (this._scissorRectLocal = null),
      (this._colorMask = 15),
      (this._target = null)
  }
  get filter() {
    return this._filters ? this._filters[0] : null
  }
  set filter(t) {
    t ? (this._filters ? (this._filters[0] = t) : (this._filters = [t])) : (this._filters = null)
  }
  reset() {
    this.pooled && ((this.maskObject = null), (this.type = Wt.NONE), (this.autoDetect = !0)),
      (this._target = null),
      (this._scissorRectLocal = null)
  }
  copyCountersOrReset(t) {
    t
      ? ((this._stencilCounter = t._stencilCounter),
        (this._scissorCounter = t._scissorCounter),
        (this._scissorRect = t._scissorRect))
      : ((this._stencilCounter = 0), (this._scissorCounter = 0), (this._scissorRect = null))
  }
}
class qf {
  constructor(t) {
    ;(this.renderer = t),
      (this.enableScissor = !0),
      (this.alphaMaskPool = []),
      (this.maskDataPool = []),
      (this.maskStack = []),
      (this.alphaMaskIndex = 0)
  }
  setMaskStack(t) {
    ;(this.maskStack = t),
      this.renderer.scissor.setMaskStack(t),
      this.renderer.stencil.setMaskStack(t)
  }
  push(t, e) {
    let i = e
    if (!i.isMaskData) {
      const n = this.maskDataPool.pop() || new _v()
      ;(n.pooled = !0), (n.maskObject = e), (i = n)
    }
    const s = this.maskStack.length !== 0 ? this.maskStack[this.maskStack.length - 1] : null
    if (
      (i.copyCountersOrReset(s),
      (i._colorMask = s ? s._colorMask : 15),
      i.autoDetect && this.detect(i),
      (i._target = t),
      i.type !== Wt.SPRITE && this.maskStack.push(i),
      i.enabled)
    )
      switch (i.type) {
        case Wt.SCISSOR:
          this.renderer.scissor.push(i)
          break
        case Wt.STENCIL:
          this.renderer.stencil.push(i)
          break
        case Wt.SPRITE:
          i.copyCountersOrReset(null), this.pushSpriteMask(i)
          break
        case Wt.COLOR:
          this.pushColorMask(i)
          break
      }
    i.type === Wt.SPRITE && this.maskStack.push(i)
  }
  pop(t) {
    const e = this.maskStack.pop()
    if (!(!e || e._target !== t)) {
      if (e.enabled)
        switch (e.type) {
          case Wt.SCISSOR:
            this.renderer.scissor.pop(e)
            break
          case Wt.STENCIL:
            this.renderer.stencil.pop(e.maskObject)
            break
          case Wt.SPRITE:
            this.popSpriteMask(e)
            break
          case Wt.COLOR:
            this.popColorMask(e)
            break
        }
      if ((e.reset(), e.pooled && this.maskDataPool.push(e), this.maskStack.length !== 0)) {
        const i = this.maskStack[this.maskStack.length - 1]
        i.type === Wt.SPRITE && i._filters && (i._filters[0].maskSprite = i.maskObject)
      }
    }
  }
  detect(t) {
    const e = t.maskObject
    e
      ? e.isSprite
        ? (t.type = Wt.SPRITE)
        : this.enableScissor && this.renderer.scissor.testScissor(t)
          ? (t.type = Wt.SCISSOR)
          : (t.type = Wt.STENCIL)
      : (t.type = Wt.COLOR)
  }
  pushSpriteMask(t) {
    const { maskObject: e } = t,
      i = t._target
    let s = t._filters
    s ||
      ((s = this.alphaMaskPool[this.alphaMaskIndex]),
      s || (s = this.alphaMaskPool[this.alphaMaskIndex] = [new gv()])),
      (s[0].resolution = t.resolution),
      (s[0].multisample = t.multisample),
      (s[0].maskSprite = e)
    const n = i.filterArea
    ;(i.filterArea = e.getBounds(!0)),
      this.renderer.filter.push(i, s),
      (i.filterArea = n),
      t._filters || this.alphaMaskIndex++
  }
  popSpriteMask(t) {
    this.renderer.filter.pop(),
      t._filters
        ? (t._filters[0].maskSprite = null)
        : (this.alphaMaskIndex--, (this.alphaMaskPool[this.alphaMaskIndex][0].maskSprite = null))
  }
  pushColorMask(t) {
    const e = t._colorMask,
      i = (t._colorMask = e & t.colorMask)
    i !== e &&
      this.renderer.gl.colorMask((i & 1) !== 0, (i & 2) !== 0, (i & 4) !== 0, (i & 8) !== 0)
  }
  popColorMask(t) {
    const e = t._colorMask,
      i = this.maskStack.length > 0 ? this.maskStack[this.maskStack.length - 1]._colorMask : 15
    i !== e &&
      this.renderer.gl.colorMask((i & 1) !== 0, (i & 2) !== 0, (i & 4) !== 0, (i & 8) !== 0)
  }
  destroy() {
    this.renderer = null
  }
}
qf.extension = { type: j.RendererSystem, name: 'mask' }
q.add(qf)
class Zf {
  constructor(t) {
    ;(this.renderer = t), (this.maskStack = []), (this.glConst = 0)
  }
  getStackLength() {
    return this.maskStack.length
  }
  setMaskStack(t) {
    const { gl: e } = this.renderer,
      i = this.getStackLength()
    this.maskStack = t
    const s = this.getStackLength()
    s !== i && (s === 0 ? e.disable(this.glConst) : (e.enable(this.glConst), this._useCurrent()))
  }
  _useCurrent() {}
  destroy() {
    ;(this.renderer = null), (this.maskStack = null)
  }
}
const bu = new Ct(),
  Eu = [],
  Jf = class Ln extends Zf {
    constructor(t) {
      super(t), (this.glConst = Y.ADAPTER.getWebGLRenderingContext().SCISSOR_TEST)
    }
    getStackLength() {
      const t = this.maskStack[this.maskStack.length - 1]
      return t ? t._scissorCounter : 0
    }
    calcScissorRect(t) {
      if (t._scissorRectLocal) return
      const e = t._scissorRect,
        { maskObject: i } = t,
        { renderer: s } = this,
        n = s.renderTexture,
        o = i.getBounds(!0, Eu.pop() ?? new nt())
      this.roundFrameToPixels(
        o,
        n.current ? n.current.resolution : s.resolution,
        n.sourceFrame,
        n.destinationFrame,
        s.projection.transform
      ),
        e && o.fit(e),
        (t._scissorRectLocal = o)
    }
    static isMatrixRotated(t) {
      if (!t) return !1
      const { a: e, b: i, c: s, d: n } = t
      return (
        (Math.abs(i) > 1e-4 || Math.abs(s) > 1e-4) && (Math.abs(e) > 1e-4 || Math.abs(n) > 1e-4)
      )
    }
    testScissor(t) {
      const { maskObject: e } = t
      if (
        !e.isFastRect ||
        !e.isFastRect() ||
        Ln.isMatrixRotated(e.worldTransform) ||
        Ln.isMatrixRotated(this.renderer.projection.transform)
      )
        return !1
      this.calcScissorRect(t)
      const i = t._scissorRectLocal
      return i.width > 0 && i.height > 0
    }
    roundFrameToPixels(t, e, i, s, n) {
      Ln.isMatrixRotated(n) ||
        ((n = n ? bu.copyFrom(n) : bu.identity()),
        n
          .translate(-i.x, -i.y)
          .scale(s.width / i.width, s.height / i.height)
          .translate(s.x, s.y),
        this.renderer.filter.transformAABB(n, t),
        t.fit(s),
        (t.x = Math.round(t.x * e)),
        (t.y = Math.round(t.y * e)),
        (t.width = Math.round(t.width * e)),
        (t.height = Math.round(t.height * e)))
    }
    push(t) {
      t._scissorRectLocal || this.calcScissorRect(t)
      const { gl: e } = this.renderer
      t._scissorRect || e.enable(e.SCISSOR_TEST),
        t._scissorCounter++,
        (t._scissorRect = t._scissorRectLocal),
        this._useCurrent()
    }
    pop(t) {
      const { gl: e } = this.renderer
      t && Eu.push(t._scissorRectLocal),
        this.getStackLength() > 0 ? this._useCurrent() : e.disable(e.SCISSOR_TEST)
    }
    _useCurrent() {
      const t = this.maskStack[this.maskStack.length - 1]._scissorRect
      let e
      this.renderer.renderTexture.current ? (e = t.y) : (e = this.renderer.height - t.height - t.y),
        this.renderer.gl.scissor(t.x, e, t.width, t.height)
    }
  }
Jf.extension = { type: j.RendererSystem, name: 'scissor' }
let yv = Jf
q.add(yv)
class tp extends Zf {
  constructor(t) {
    super(t), (this.glConst = Y.ADAPTER.getWebGLRenderingContext().STENCIL_TEST)
  }
  getStackLength() {
    const t = this.maskStack[this.maskStack.length - 1]
    return t ? t._stencilCounter : 0
  }
  push(t) {
    const e = t.maskObject,
      { gl: i } = this.renderer,
      s = t._stencilCounter
    s === 0 &&
      (this.renderer.framebuffer.forceStencil(),
      i.clearStencil(0),
      i.clear(i.STENCIL_BUFFER_BIT),
      i.enable(i.STENCIL_TEST)),
      t._stencilCounter++
    const n = t._colorMask
    n !== 0 && ((t._colorMask = 0), i.colorMask(!1, !1, !1, !1)),
      i.stencilFunc(i.EQUAL, s, 4294967295),
      i.stencilOp(i.KEEP, i.KEEP, i.INCR),
      (e.renderable = !0),
      e.render(this.renderer),
      this.renderer.batch.flush(),
      (e.renderable = !1),
      n !== 0 &&
        ((t._colorMask = n),
        i.colorMask((n & 1) !== 0, (n & 2) !== 0, (n & 4) !== 0, (n & 8) !== 0)),
      this._useCurrent()
  }
  pop(t) {
    const e = this.renderer.gl
    if (this.getStackLength() === 0) e.disable(e.STENCIL_TEST)
    else {
      const i = this.maskStack.length !== 0 ? this.maskStack[this.maskStack.length - 1] : null,
        s = i ? i._colorMask : 15
      s !== 0 && ((i._colorMask = 0), e.colorMask(!1, !1, !1, !1)),
        e.stencilOp(e.KEEP, e.KEEP, e.DECR),
        (t.renderable = !0),
        t.render(this.renderer),
        this.renderer.batch.flush(),
        (t.renderable = !1),
        s !== 0 &&
          ((i._colorMask = s),
          e.colorMask((s & 1) !== 0, (s & 2) !== 0, (s & 4) !== 0, (s & 8) !== 0)),
        this._useCurrent()
    }
  }
  _useCurrent() {
    const t = this.renderer.gl
    t.stencilFunc(t.EQUAL, this.getStackLength(), 4294967295), t.stencilOp(t.KEEP, t.KEEP, t.KEEP)
  }
}
tp.extension = { type: j.RendererSystem, name: 'stencil' }
q.add(tp)
class ep {
  constructor(t) {
    ;(this.renderer = t),
      (this.plugins = {}),
      Object.defineProperties(this.plugins, {
        extract: {
          enumerable: !1,
          get() {
            return ut('7.0.0', 'renderer.plugins.extract has moved to renderer.extract'), t.extract
          }
        },
        prepare: {
          enumerable: !1,
          get() {
            return ut('7.0.0', 'renderer.plugins.prepare has moved to renderer.prepare'), t.prepare
          }
        },
        interaction: {
          enumerable: !1,
          get() {
            return (
              ut('7.0.0', 'renderer.plugins.interaction has been deprecated, use renderer.events'),
              t.events
            )
          }
        }
      })
  }
  init() {
    const t = this.rendererPlugins
    for (const e in t) this.plugins[e] = new t[e](this.renderer)
  }
  destroy() {
    for (const t in this.plugins) this.plugins[t].destroy(), (this.plugins[t] = null)
  }
}
ep.extension = { type: [j.RendererSystem, j.CanvasRendererSystem], name: '_plugin' }
q.add(ep)
class rp {
  constructor(t) {
    ;(this.renderer = t),
      (this.destinationFrame = null),
      (this.sourceFrame = null),
      (this.defaultFrame = null),
      (this.projectionMatrix = new Ct()),
      (this.transform = null)
  }
  update(t, e, i, s) {
    ;(this.destinationFrame = t || this.destinationFrame || this.defaultFrame),
      (this.sourceFrame = e || this.sourceFrame || t),
      this.calculateProjection(this.destinationFrame, this.sourceFrame, i, s),
      this.transform && this.projectionMatrix.append(this.transform)
    const n = this.renderer
    ;(n.globalUniforms.uniforms.projectionMatrix = this.projectionMatrix),
      n.globalUniforms.update(),
      n.shader.shader && n.shader.syncUniformGroup(n.shader.shader.uniforms.globals)
  }
  calculateProjection(t, e, i, s) {
    const n = this.projectionMatrix,
      o = s ? -1 : 1
    n.identity(),
      (n.a = (1 / e.width) * 2),
      (n.d = o * ((1 / e.height) * 2)),
      (n.tx = -1 - e.x * n.a),
      (n.ty = -o - e.y * n.d)
  }
  setTransform(t) {}
  destroy() {
    this.renderer = null
  }
}
rp.extension = { type: j.RendererSystem, name: 'projection' }
q.add(rp)
const Av = new Do(),
  Tu = new nt()
class ip {
  constructor(t) {
    ;(this.renderer = t), (this._tempMatrix = new Ct())
  }
  generateTexture(t, e) {
    const { region: i, ...s } = e || {},
      n = (i == null ? void 0 : i.copyTo(Tu)) || t.getLocalBounds(Tu, !0),
      o = s.resolution || this.renderer.resolution
    ;(n.width = Math.max(n.width, 1 / o)),
      (n.height = Math.max(n.height, 1 / o)),
      (s.width = n.width),
      (s.height = n.height),
      (s.resolution = o),
      s.multisample ?? (s.multisample = this.renderer.multisample)
    const a = mi.create(s)
    ;(this._tempMatrix.tx = -n.x), (this._tempMatrix.ty = -n.y)
    const h = t.transform
    return (
      (t.transform = Av),
      this.renderer.render(t, {
        renderTexture: a,
        transform: this._tempMatrix,
        skipUpdateTransform: !!t.parent,
        blit: !0
      }),
      (t.transform = h),
      a
    )
  }
  destroy() {}
}
ip.extension = { type: [j.RendererSystem, j.CanvasRendererSystem], name: 'textureGenerator' }
q.add(ip)
const Xr = new nt(),
  is = new nt()
class sp {
  constructor(t) {
    ;(this.renderer = t),
      (this.defaultMaskStack = []),
      (this.current = null),
      (this.sourceFrame = new nt()),
      (this.destinationFrame = new nt()),
      (this.viewportFrame = new nt())
  }
  contextChange() {
    var e
    const t = (e = this.renderer) == null ? void 0 : e.gl.getContextAttributes()
    this._rendererPremultipliedAlpha = !!(t && t.alpha && t.premultipliedAlpha)
  }
  bind(t = null, e, i) {
    const s = this.renderer
    this.current = t
    let n, o, a
    t
      ? ((n = t.baseTexture),
        (a = n.resolution),
        e || ((Xr.width = t.frame.width), (Xr.height = t.frame.height), (e = Xr)),
        i ||
          ((is.x = t.frame.x),
          (is.y = t.frame.y),
          (is.width = e.width),
          (is.height = e.height),
          (i = is)),
        (o = n.framebuffer))
      : ((a = s.resolution),
        e || ((Xr.width = s._view.screen.width), (Xr.height = s._view.screen.height), (e = Xr)),
        i || ((i = Xr), (i.width = e.width), (i.height = e.height)))
    const h = this.viewportFrame
    ;(h.x = i.x * a),
      (h.y = i.y * a),
      (h.width = i.width * a),
      (h.height = i.height * a),
      t || (h.y = s.view.height - (h.y + h.height)),
      h.ceil(),
      this.renderer.framebuffer.bind(o, h),
      this.renderer.projection.update(i, e, a, !o),
      t
        ? this.renderer.mask.setMaskStack(n.maskStack)
        : this.renderer.mask.setMaskStack(this.defaultMaskStack),
      this.sourceFrame.copyFrom(e),
      this.destinationFrame.copyFrom(i)
  }
  clear(t, e) {
    const i = this.current
        ? this.current.baseTexture.clear
        : this.renderer.background.backgroundColor,
      s = St.shared.setValue(t || i)
    ;((this.current && this.current.baseTexture.alphaMode > 0) ||
      (!this.current && this._rendererPremultipliedAlpha)) &&
      s.premultiply(s.alpha)
    const n = this.destinationFrame,
      o = this.current ? this.current.baseTexture : this.renderer._view.screen,
      a = n.width !== o.width || n.height !== o.height
    if (a) {
      let { x: h, y: l, width: c, height: u } = this.viewportFrame
      ;(h = Math.round(h)),
        (l = Math.round(l)),
        (c = Math.round(c)),
        (u = Math.round(u)),
        this.renderer.gl.enable(this.renderer.gl.SCISSOR_TEST),
        this.renderer.gl.scissor(h, l, c, u)
    }
    this.renderer.framebuffer.clear(s.red, s.green, s.blue, s.alpha, e),
      a && this.renderer.scissor.pop()
  }
  resize() {
    this.bind(null)
  }
  reset() {
    this.bind(null)
  }
  destroy() {
    this.renderer = null
  }
}
sp.extension = { type: j.RendererSystem, name: 'renderTexture' }
q.add(sp)
class vv {
  constructor(t, e) {
    ;(this.program = t),
      (this.uniformData = e),
      (this.uniformGroups = {}),
      (this.uniformDirtyGroups = {}),
      (this.uniformBufferBindings = {})
  }
  destroy() {
    ;(this.uniformData = null),
      (this.uniformGroups = null),
      (this.uniformDirtyGroups = null),
      (this.uniformBufferBindings = null),
      (this.program = null)
  }
}
function xv(r, t) {
  const e = {},
    i = t.getProgramParameter(r, t.ACTIVE_ATTRIBUTES)
  for (let s = 0; s < i; s++) {
    const n = t.getActiveAttrib(r, s)
    if (n.name.startsWith('gl_')) continue
    const o = Vf(t, n.type),
      a = { type: o, name: n.name, size: Hf(o), location: t.getAttribLocation(r, n.name) }
    e[n.name] = a
  }
  return e
}
function bv(r, t) {
  const e = {},
    i = t.getProgramParameter(r, t.ACTIVE_UNIFORMS)
  for (let s = 0; s < i; s++) {
    const n = t.getActiveUniform(r, s),
      o = n.name.replace(/\[.*?\]$/, ''),
      a = !!n.name.match(/\[.*?\]$/),
      h = Vf(t, n.type)
    e[o] = { name: o, index: s, type: h, size: n.size, isArray: a, value: kf(h, n.size) }
  }
  return e
}
function Ev(r, t) {
  var a
  const e = mu(r, r.VERTEX_SHADER, t.vertexSrc),
    i = mu(r, r.FRAGMENT_SHADER, t.fragmentSrc),
    s = r.createProgram()
  r.attachShader(s, e), r.attachShader(s, i)
  const n = (a = t.extra) == null ? void 0 : a.transformFeedbackVaryings
  if (
    (n &&
      (typeof r.transformFeedbackVaryings != 'function'
        ? console.warn(
            'TransformFeedback is not supported but TransformFeedbackVaryings are given.'
          )
        : r.transformFeedbackVaryings(
            s,
            n.names,
            n.bufferMode === 'separate' ? r.SEPARATE_ATTRIBS : r.INTERLEAVED_ATTRIBS
          )),
    r.linkProgram(s),
    r.getProgramParameter(s, r.LINK_STATUS) || Z0(r, s, e, i),
    (t.attributeData = xv(s, r)),
    (t.uniformData = bv(s, r)),
    !/^[ \t]*#[ \t]*version[ \t]+300[ \t]+es[ \t]*$/m.test(t.vertexSrc))
  ) {
    const h = Object.keys(t.attributeData)
    h.sort((l, c) => (l > c ? 1 : -1))
    for (let l = 0; l < h.length; l++)
      (t.attributeData[h[l]].location = l), r.bindAttribLocation(s, l, h[l])
    r.linkProgram(s)
  }
  r.deleteShader(e), r.deleteShader(i)
  const o = {}
  for (const h in t.uniformData) {
    const l = t.uniformData[h]
    o[h] = { location: r.getUniformLocation(s, h), value: kf(l.type, l.size) }
  }
  return new vv(s, o)
}
function Tv(r, t, e, i, s) {
  e.buffer.update(s)
}
const wv = {
    float: `
        data[offset] = v;
    `,
    vec2: `
        data[offset] = v[0];
        data[offset+1] = v[1];
    `,
    vec3: `
        data[offset] = v[0];
        data[offset+1] = v[1];
        data[offset+2] = v[2];

    `,
    vec4: `
        data[offset] = v[0];
        data[offset+1] = v[1];
        data[offset+2] = v[2];
        data[offset+3] = v[3];
    `,
    mat2: `
        data[offset] = v[0];
        data[offset+1] = v[1];

        data[offset+4] = v[2];
        data[offset+5] = v[3];
    `,
    mat3: `
        data[offset] = v[0];
        data[offset+1] = v[1];
        data[offset+2] = v[2];

        data[offset + 4] = v[3];
        data[offset + 5] = v[4];
        data[offset + 6] = v[5];

        data[offset + 8] = v[6];
        data[offset + 9] = v[7];
        data[offset + 10] = v[8];
    `,
    mat4: `
        for(var i = 0; i < 16; i++)
        {
            data[offset + i] = v[i];
        }
    `
  },
  np = {
    float: 4,
    vec2: 8,
    vec3: 12,
    vec4: 16,
    int: 4,
    ivec2: 8,
    ivec3: 12,
    ivec4: 16,
    uint: 4,
    uvec2: 8,
    uvec3: 12,
    uvec4: 16,
    bool: 4,
    bvec2: 8,
    bvec3: 12,
    bvec4: 16,
    mat2: 16 * 2,
    mat3: 16 * 3,
    mat4: 16 * 4
  }
function Sv(r) {
  const t = r.map((n) => ({ data: n, offset: 0, dataLen: 0, dirty: 0 }))
  let e = 0,
    i = 0,
    s = 0
  for (let n = 0; n < t.length; n++) {
    const o = t[n]
    if (
      ((e = np[o.data.type]),
      o.data.size > 1 && (e = Math.max(e, 16) * o.data.size),
      (o.dataLen = e),
      i % e !== 0 && i < 16)
    ) {
      const a = (i % e) % 16
      ;(i += a), (s += a)
    }
    i + e > 16
      ? ((s = Math.ceil(s / 16) * 16), (o.offset = s), (s += e), (i = e))
      : ((o.offset = s), (i += e), (s += e))
  }
  return (s = Math.ceil(s / 16) * 16), { uboElements: t, size: s }
}
function Cv(r, t) {
  const e = []
  for (const i in r) t[i] && e.push(t[i])
  return e.sort((i, s) => i.index - s.index), e
}
function Iv(r, t) {
  if (!r.autoManage) return { size: 0, syncFunc: Tv }
  const e = Cv(r.uniforms, t),
    { uboElements: i, size: s } = Sv(e),
    n = [
      `
    var v = null;
    var v2 = null;
    var cv = null;
    var t = 0;
    var gl = renderer.gl
    var index = 0;
    var data = buffer.data;
    `
    ]
  for (let o = 0; o < i.length; o++) {
    const a = i[o],
      h = r.uniforms[a.data.name],
      l = a.data.name
    let c = !1
    for (let u = 0; u < ki.length; u++) {
      const d = ki[u]
      if (d.codeUbo && d.test(a.data, h)) {
        n.push(`offset = ${a.offset / 4};`, ki[u].codeUbo(a.data.name, h)), (c = !0)
        break
      }
    }
    if (!c)
      if (a.data.size > 1) {
        const u = Hf(a.data.type),
          d = Math.max(np[a.data.type] / 16, 1),
          f = u / d,
          p = (4 - (f % 4)) % 4
        n.push(`
                cv = ud.${l}.value;
                v = uv.${l};
                offset = ${a.offset / 4};

                t = 0;

                for(var i=0; i < ${a.data.size * d}; i++)
                {
                    for(var j = 0; j < ${f}; j++)
                    {
                        data[offset++] = v[t++];
                    }
                    offset += ${p};
                }

                `)
      } else {
        const u = wv[a.data.type]
        n.push(`
                cv = ud.${l}.value;
                v = uv.${l};
                offset = ${a.offset / 4};
                ${u};
                `)
      }
  }
  return (
    n.push(`
       renderer.buffer.update(buffer);
    `),
    {
      size: s,
      syncFunc: new Function(
        'ud',
        'uv',
        'renderer',
        'syncData',
        'buffer',
        n.join(`
`)
      )
    }
  )
}
let Rv = 0
const yn = { textureCount: 0, uboCount: 0 }
class op {
  constructor(t) {
    ;(this.destroyed = !1),
      (this.renderer = t),
      this.systemCheck(),
      (this.gl = null),
      (this.shader = null),
      (this.program = null),
      (this.cache = {}),
      (this._uboCache = {}),
      (this.id = Rv++)
  }
  systemCheck() {
    if (!tv())
      throw new Error(
        'Current environment does not allow unsafe-eval, please use @pixi/unsafe-eval module to enable support.'
      )
  }
  contextChange(t) {
    ;(this.gl = t), this.reset()
  }
  bind(t, e) {
    t.disposeRunner.add(this), (t.uniforms.globals = this.renderer.globalUniforms)
    const i = t.program,
      s = i.glPrograms[this.renderer.CONTEXT_UID] || this.generateProgram(t)
    return (
      (this.shader = t),
      this.program !== i && ((this.program = i), this.gl.useProgram(s.program)),
      e || ((yn.textureCount = 0), (yn.uboCount = 0), this.syncUniformGroup(t.uniformGroup, yn)),
      s
    )
  }
  setUniforms(t) {
    const e = this.shader.program,
      i = e.glPrograms[this.renderer.CONTEXT_UID]
    e.syncUniforms(i.uniformData, t, this.renderer)
  }
  syncUniformGroup(t, e) {
    const i = this.getGlProgram()
    ;(!t.static || t.dirtyId !== i.uniformDirtyGroups[t.id]) &&
      ((i.uniformDirtyGroups[t.id] = t.dirtyId), this.syncUniforms(t, i, e))
  }
  syncUniforms(t, e, i) {
    ;(t.syncUniforms[this.shader.program.id] || this.createSyncGroups(t))(
      e.uniformData,
      t.uniforms,
      this.renderer,
      i
    )
  }
  createSyncGroups(t) {
    const e = this.getSignature(t, this.shader.program.uniformData, 'u')
    return (
      this.cache[e] || (this.cache[e] = Q0(t, this.shader.program.uniformData)),
      (t.syncUniforms[this.shader.program.id] = this.cache[e]),
      t.syncUniforms[this.shader.program.id]
    )
  }
  syncUniformBufferGroup(t, e) {
    const i = this.getGlProgram()
    if (!t.static || t.dirtyId !== 0 || !i.uniformGroups[t.id]) {
      t.dirtyId = 0
      const s = i.uniformGroups[t.id] || this.createSyncBufferGroup(t, i, e)
      t.buffer.update(), s(i.uniformData, t.uniforms, this.renderer, yn, t.buffer)
    }
    this.renderer.buffer.bindBufferBase(t.buffer, i.uniformBufferBindings[e])
  }
  createSyncBufferGroup(t, e, i) {
    const { gl: s } = this.renderer
    this.renderer.buffer.bind(t.buffer)
    const n = this.gl.getUniformBlockIndex(e.program, i)
    ;(e.uniformBufferBindings[i] = this.shader.uniformBindCount),
      s.uniformBlockBinding(e.program, n, this.shader.uniformBindCount),
      this.shader.uniformBindCount++
    const o = this.getSignature(t, this.shader.program.uniformData, 'ubo')
    let a = this._uboCache[o]
    if ((a || (a = this._uboCache[o] = Iv(t, this.shader.program.uniformData)), t.autoManage)) {
      const h = new Float32Array(a.size / 4)
      t.buffer.update(h)
    }
    return (e.uniformGroups[t.id] = a.syncFunc), e.uniformGroups[t.id]
  }
  getSignature(t, e, i) {
    const s = t.uniforms,
      n = [`${i}-`]
    for (const o in s) n.push(o), e[o] && n.push(e[o].type)
    return n.join('-')
  }
  getGlProgram() {
    return this.shader ? this.shader.program.glPrograms[this.renderer.CONTEXT_UID] : null
  }
  generateProgram(t) {
    const e = this.gl,
      i = t.program,
      s = Ev(e, i)
    return (i.glPrograms[this.renderer.CONTEXT_UID] = s), s
  }
  reset() {
    ;(this.program = null), (this.shader = null)
  }
  disposeShader(t) {
    this.shader === t && (this.shader = null)
  }
  destroy() {
    ;(this.renderer = null), (this.destroyed = !0)
  }
}
op.extension = { type: j.RendererSystem, name: 'shader' }
q.add(op)
class no {
  constructor(t) {
    this.renderer = t
  }
  run(t) {
    const { renderer: e } = this
    e.runners.init.emit(e.options),
      t.hello && console.log(`PixiJS 7.4.2 - ${e.rendererLogId} - https://pixijs.com`),
      e.resize(e.screen.width, e.screen.height)
  }
  destroy() {}
}
;(no.defaultOptions = { hello: !1 }),
  (no.extension = { type: [j.RendererSystem, j.CanvasRendererSystem], name: 'startup' })
q.add(no)
function Pv(r, t = []) {
  return (
    (t[st.NORMAL] = [r.ONE, r.ONE_MINUS_SRC_ALPHA]),
    (t[st.ADD] = [r.ONE, r.ONE]),
    (t[st.MULTIPLY] = [r.DST_COLOR, r.ONE_MINUS_SRC_ALPHA, r.ONE, r.ONE_MINUS_SRC_ALPHA]),
    (t[st.SCREEN] = [r.ONE, r.ONE_MINUS_SRC_COLOR, r.ONE, r.ONE_MINUS_SRC_ALPHA]),
    (t[st.OVERLAY] = [r.ONE, r.ONE_MINUS_SRC_ALPHA]),
    (t[st.DARKEN] = [r.ONE, r.ONE_MINUS_SRC_ALPHA]),
    (t[st.LIGHTEN] = [r.ONE, r.ONE_MINUS_SRC_ALPHA]),
    (t[st.COLOR_DODGE] = [r.ONE, r.ONE_MINUS_SRC_ALPHA]),
    (t[st.COLOR_BURN] = [r.ONE, r.ONE_MINUS_SRC_ALPHA]),
    (t[st.HARD_LIGHT] = [r.ONE, r.ONE_MINUS_SRC_ALPHA]),
    (t[st.SOFT_LIGHT] = [r.ONE, r.ONE_MINUS_SRC_ALPHA]),
    (t[st.DIFFERENCE] = [r.ONE, r.ONE_MINUS_SRC_ALPHA]),
    (t[st.EXCLUSION] = [r.ONE, r.ONE_MINUS_SRC_ALPHA]),
    (t[st.HUE] = [r.ONE, r.ONE_MINUS_SRC_ALPHA]),
    (t[st.SATURATION] = [r.ONE, r.ONE_MINUS_SRC_ALPHA]),
    (t[st.COLOR] = [r.ONE, r.ONE_MINUS_SRC_ALPHA]),
    (t[st.LUMINOSITY] = [r.ONE, r.ONE_MINUS_SRC_ALPHA]),
    (t[st.NONE] = [0, 0]),
    (t[st.NORMAL_NPM] = [r.SRC_ALPHA, r.ONE_MINUS_SRC_ALPHA, r.ONE, r.ONE_MINUS_SRC_ALPHA]),
    (t[st.ADD_NPM] = [r.SRC_ALPHA, r.ONE, r.ONE, r.ONE]),
    (t[st.SCREEN_NPM] = [r.SRC_ALPHA, r.ONE_MINUS_SRC_COLOR, r.ONE, r.ONE_MINUS_SRC_ALPHA]),
    (t[st.SRC_IN] = [r.DST_ALPHA, r.ZERO]),
    (t[st.SRC_OUT] = [r.ONE_MINUS_DST_ALPHA, r.ZERO]),
    (t[st.SRC_ATOP] = [r.DST_ALPHA, r.ONE_MINUS_SRC_ALPHA]),
    (t[st.DST_OVER] = [r.ONE_MINUS_DST_ALPHA, r.ONE]),
    (t[st.DST_IN] = [r.ZERO, r.SRC_ALPHA]),
    (t[st.DST_OUT] = [r.ZERO, r.ONE_MINUS_SRC_ALPHA]),
    (t[st.DST_ATOP] = [r.ONE_MINUS_DST_ALPHA, r.SRC_ALPHA]),
    (t[st.XOR] = [r.ONE_MINUS_DST_ALPHA, r.ONE_MINUS_SRC_ALPHA]),
    (t[st.SUBTRACT] = [r.ONE, r.ONE, r.ONE, r.ONE, r.FUNC_REVERSE_SUBTRACT, r.FUNC_ADD]),
    t
  )
}
const Mv = 0,
  Bv = 1,
  Fv = 2,
  Dv = 3,
  Ov = 4,
  Lv = 5,
  ap = class Th {
    constructor() {
      ;(this.gl = null),
        (this.stateId = 0),
        (this.polygonOffset = 0),
        (this.blendMode = st.NONE),
        (this._blendEq = !1),
        (this.map = []),
        (this.map[Mv] = this.setBlend),
        (this.map[Bv] = this.setOffset),
        (this.map[Fv] = this.setCullFace),
        (this.map[Dv] = this.setDepthTest),
        (this.map[Ov] = this.setFrontFace),
        (this.map[Lv] = this.setDepthMask),
        (this.checks = []),
        (this.defaultState = new nr()),
        (this.defaultState.blend = !0)
    }
    contextChange(t) {
      ;(this.gl = t), (this.blendModes = Pv(t)), this.set(this.defaultState), this.reset()
    }
    set(t) {
      if (((t = t || this.defaultState), this.stateId !== t.data)) {
        let e = this.stateId ^ t.data,
          i = 0
        for (; e; ) e & 1 && this.map[i].call(this, !!(t.data & (1 << i))), (e = e >> 1), i++
        this.stateId = t.data
      }
      for (let e = 0; e < this.checks.length; e++) this.checks[e](this, t)
    }
    forceState(t) {
      t = t || this.defaultState
      for (let e = 0; e < this.map.length; e++) this.map[e].call(this, !!(t.data & (1 << e)))
      for (let e = 0; e < this.checks.length; e++) this.checks[e](this, t)
      this.stateId = t.data
    }
    setBlend(t) {
      this.updateCheck(Th.checkBlendMode, t), this.gl[t ? 'enable' : 'disable'](this.gl.BLEND)
    }
    setOffset(t) {
      this.updateCheck(Th.checkPolygonOffset, t),
        this.gl[t ? 'enable' : 'disable'](this.gl.POLYGON_OFFSET_FILL)
    }
    setDepthTest(t) {
      this.gl[t ? 'enable' : 'disable'](this.gl.DEPTH_TEST)
    }
    setDepthMask(t) {
      this.gl.depthMask(t)
    }
    setCullFace(t) {
      this.gl[t ? 'enable' : 'disable'](this.gl.CULL_FACE)
    }
    setFrontFace(t) {
      this.gl.frontFace(this.gl[t ? 'CW' : 'CCW'])
    }
    setBlendMode(t) {
      if (t === this.blendMode) return
      this.blendMode = t
      const e = this.blendModes[t],
        i = this.gl
      e.length === 2 ? i.blendFunc(e[0], e[1]) : i.blendFuncSeparate(e[0], e[1], e[2], e[3]),
        e.length === 6
          ? ((this._blendEq = !0), i.blendEquationSeparate(e[4], e[5]))
          : this._blendEq && ((this._blendEq = !1), i.blendEquationSeparate(i.FUNC_ADD, i.FUNC_ADD))
    }
    setPolygonOffset(t, e) {
      this.gl.polygonOffset(t, e)
    }
    reset() {
      this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, !1),
        this.forceState(this.defaultState),
        (this._blendEq = !0),
        (this.blendMode = -1),
        this.setBlendMode(0)
    }
    updateCheck(t, e) {
      const i = this.checks.indexOf(t)
      e && i === -1 ? this.checks.push(t) : !e && i !== -1 && this.checks.splice(i, 1)
    }
    static checkBlendMode(t, e) {
      t.setBlendMode(e.blendMode)
    }
    static checkPolygonOffset(t, e) {
      t.setPolygonOffset(1, e.polygonOffset)
    }
    destroy() {
      this.gl = null
    }
  }
ap.extension = { type: j.RendererSystem, name: 'state' }
let Nv = ap
q.add(Nv)
class Uv extends Xs {
  constructor() {
    super(...arguments), (this.runners = {}), (this._systemsHash = {})
  }
  setup(t) {
    this.addRunners(...t.runners)
    const e = (t.priority ?? []).filter((s) => t.systems[s]),
      i = [...e, ...Object.keys(t.systems).filter((s) => !e.includes(s))]
    for (const s of i) this.addSystem(t.systems[s], s)
  }
  addRunners(...t) {
    t.forEach((e) => {
      this.runners[e] = new Oe(e)
    })
  }
  addSystem(t, e) {
    const i = new t(this)
    if (this[e]) throw new Error(`Whoops! The name "${e}" is already in use`)
    ;(this[e] = i), (this._systemsHash[e] = i)
    for (const s in this.runners) this.runners[s].add(i)
    return this
  }
  emitWithCustomOptions(t, e) {
    const i = Object.keys(this._systemsHash)
    t.items.forEach((s) => {
      const n = i.find((o) => this._systemsHash[o] === s)
      s[t.name](e[n])
    })
  }
  destroy() {
    Object.values(this.runners).forEach((t) => {
      t.destroy()
    }),
      (this._systemsHash = {})
  }
}
const cs = class Nn {
  constructor(t) {
    ;(this.renderer = t),
      (this.count = 0),
      (this.checkCount = 0),
      (this.maxIdle = Nn.defaultMaxIdle),
      (this.checkCountMax = Nn.defaultCheckCountMax),
      (this.mode = Nn.defaultMode)
  }
  postrender() {
    this.renderer.objectRenderer.renderingToScreen &&
      (this.count++,
      this.mode !== vl.MANUAL &&
        (this.checkCount++,
        this.checkCount > this.checkCountMax && ((this.checkCount = 0), this.run())))
  }
  run() {
    const t = this.renderer.texture,
      e = t.managedTextures
    let i = !1
    for (let s = 0; s < e.length; s++) {
      const n = e[s]
      n.resource &&
        this.count - n.touched > this.maxIdle &&
        (t.destroyTexture(n, !0), (e[s] = null), (i = !0))
    }
    if (i) {
      let s = 0
      for (let n = 0; n < e.length; n++) e[n] !== null && (e[s++] = e[n])
      e.length = s
    }
  }
  unload(t) {
    const e = this.renderer.texture,
      i = t._texture
    i && !i.framebuffer && e.destroyTexture(i)
    for (let s = t.children.length - 1; s >= 0; s--) this.unload(t.children[s])
  }
  destroy() {
    this.renderer = null
  }
}
;(cs.defaultMode = vl.AUTO),
  (cs.defaultMaxIdle = 60 * 60),
  (cs.defaultCheckCountMax = 60 * 10),
  (cs.extension = { type: j.RendererSystem, name: 'textureGC' })
let Kr = cs
q.add(Kr)
class Ta {
  constructor(t) {
    ;(this.texture = t),
      (this.width = -1),
      (this.height = -1),
      (this.dirtyId = -1),
      (this.dirtyStyleId = -1),
      (this.mipmap = !1),
      (this.wrapMode = 33071),
      (this.type = tt.UNSIGNED_BYTE),
      (this.internalFormat = D.RGBA),
      (this.samplerType = 0)
  }
}
function kv(r) {
  let t
  return (
    'WebGL2RenderingContext' in globalThis && r instanceof globalThis.WebGL2RenderingContext
      ? (t = {
          [r.RGB]: z.FLOAT,
          [r.RGBA]: z.FLOAT,
          [r.ALPHA]: z.FLOAT,
          [r.LUMINANCE]: z.FLOAT,
          [r.LUMINANCE_ALPHA]: z.FLOAT,
          [r.R8]: z.FLOAT,
          [r.R8_SNORM]: z.FLOAT,
          [r.RG8]: z.FLOAT,
          [r.RG8_SNORM]: z.FLOAT,
          [r.RGB8]: z.FLOAT,
          [r.RGB8_SNORM]: z.FLOAT,
          [r.RGB565]: z.FLOAT,
          [r.RGBA4]: z.FLOAT,
          [r.RGB5_A1]: z.FLOAT,
          [r.RGBA8]: z.FLOAT,
          [r.RGBA8_SNORM]: z.FLOAT,
          [r.RGB10_A2]: z.FLOAT,
          [r.RGB10_A2UI]: z.FLOAT,
          [r.SRGB8]: z.FLOAT,
          [r.SRGB8_ALPHA8]: z.FLOAT,
          [r.R16F]: z.FLOAT,
          [r.RG16F]: z.FLOAT,
          [r.RGB16F]: z.FLOAT,
          [r.RGBA16F]: z.FLOAT,
          [r.R32F]: z.FLOAT,
          [r.RG32F]: z.FLOAT,
          [r.RGB32F]: z.FLOAT,
          [r.RGBA32F]: z.FLOAT,
          [r.R11F_G11F_B10F]: z.FLOAT,
          [r.RGB9_E5]: z.FLOAT,
          [r.R8I]: z.INT,
          [r.R8UI]: z.UINT,
          [r.R16I]: z.INT,
          [r.R16UI]: z.UINT,
          [r.R32I]: z.INT,
          [r.R32UI]: z.UINT,
          [r.RG8I]: z.INT,
          [r.RG8UI]: z.UINT,
          [r.RG16I]: z.INT,
          [r.RG16UI]: z.UINT,
          [r.RG32I]: z.INT,
          [r.RG32UI]: z.UINT,
          [r.RGB8I]: z.INT,
          [r.RGB8UI]: z.UINT,
          [r.RGB16I]: z.INT,
          [r.RGB16UI]: z.UINT,
          [r.RGB32I]: z.INT,
          [r.RGB32UI]: z.UINT,
          [r.RGBA8I]: z.INT,
          [r.RGBA8UI]: z.UINT,
          [r.RGBA16I]: z.INT,
          [r.RGBA16UI]: z.UINT,
          [r.RGBA32I]: z.INT,
          [r.RGBA32UI]: z.UINT,
          [r.DEPTH_COMPONENT16]: z.FLOAT,
          [r.DEPTH_COMPONENT24]: z.FLOAT,
          [r.DEPTH_COMPONENT32F]: z.FLOAT,
          [r.DEPTH_STENCIL]: z.FLOAT,
          [r.DEPTH24_STENCIL8]: z.FLOAT,
          [r.DEPTH32F_STENCIL8]: z.FLOAT
        })
      : (t = {
          [r.RGB]: z.FLOAT,
          [r.RGBA]: z.FLOAT,
          [r.ALPHA]: z.FLOAT,
          [r.LUMINANCE]: z.FLOAT,
          [r.LUMINANCE_ALPHA]: z.FLOAT,
          [r.DEPTH_STENCIL]: z.FLOAT
        }),
    t
  )
}
function Gv(r) {
  let t
  return (
    'WebGL2RenderingContext' in globalThis && r instanceof globalThis.WebGL2RenderingContext
      ? (t = {
          [tt.UNSIGNED_BYTE]: {
            [D.RGBA]: r.RGBA8,
            [D.RGB]: r.RGB8,
            [D.RG]: r.RG8,
            [D.RED]: r.R8,
            [D.RGBA_INTEGER]: r.RGBA8UI,
            [D.RGB_INTEGER]: r.RGB8UI,
            [D.RG_INTEGER]: r.RG8UI,
            [D.RED_INTEGER]: r.R8UI,
            [D.ALPHA]: r.ALPHA,
            [D.LUMINANCE]: r.LUMINANCE,
            [D.LUMINANCE_ALPHA]: r.LUMINANCE_ALPHA
          },
          [tt.BYTE]: {
            [D.RGBA]: r.RGBA8_SNORM,
            [D.RGB]: r.RGB8_SNORM,
            [D.RG]: r.RG8_SNORM,
            [D.RED]: r.R8_SNORM,
            [D.RGBA_INTEGER]: r.RGBA8I,
            [D.RGB_INTEGER]: r.RGB8I,
            [D.RG_INTEGER]: r.RG8I,
            [D.RED_INTEGER]: r.R8I
          },
          [tt.UNSIGNED_SHORT]: {
            [D.RGBA_INTEGER]: r.RGBA16UI,
            [D.RGB_INTEGER]: r.RGB16UI,
            [D.RG_INTEGER]: r.RG16UI,
            [D.RED_INTEGER]: r.R16UI,
            [D.DEPTH_COMPONENT]: r.DEPTH_COMPONENT16
          },
          [tt.SHORT]: {
            [D.RGBA_INTEGER]: r.RGBA16I,
            [D.RGB_INTEGER]: r.RGB16I,
            [D.RG_INTEGER]: r.RG16I,
            [D.RED_INTEGER]: r.R16I
          },
          [tt.UNSIGNED_INT]: {
            [D.RGBA_INTEGER]: r.RGBA32UI,
            [D.RGB_INTEGER]: r.RGB32UI,
            [D.RG_INTEGER]: r.RG32UI,
            [D.RED_INTEGER]: r.R32UI,
            [D.DEPTH_COMPONENT]: r.DEPTH_COMPONENT24
          },
          [tt.INT]: {
            [D.RGBA_INTEGER]: r.RGBA32I,
            [D.RGB_INTEGER]: r.RGB32I,
            [D.RG_INTEGER]: r.RG32I,
            [D.RED_INTEGER]: r.R32I
          },
          [tt.FLOAT]: {
            [D.RGBA]: r.RGBA32F,
            [D.RGB]: r.RGB32F,
            [D.RG]: r.RG32F,
            [D.RED]: r.R32F,
            [D.DEPTH_COMPONENT]: r.DEPTH_COMPONENT32F
          },
          [tt.HALF_FLOAT]: {
            [D.RGBA]: r.RGBA16F,
            [D.RGB]: r.RGB16F,
            [D.RG]: r.RG16F,
            [D.RED]: r.R16F
          },
          [tt.UNSIGNED_SHORT_5_6_5]: { [D.RGB]: r.RGB565 },
          [tt.UNSIGNED_SHORT_4_4_4_4]: { [D.RGBA]: r.RGBA4 },
          [tt.UNSIGNED_SHORT_5_5_5_1]: { [D.RGBA]: r.RGB5_A1 },
          [tt.UNSIGNED_INT_2_10_10_10_REV]: {
            [D.RGBA]: r.RGB10_A2,
            [D.RGBA_INTEGER]: r.RGB10_A2UI
          },
          [tt.UNSIGNED_INT_10F_11F_11F_REV]: { [D.RGB]: r.R11F_G11F_B10F },
          [tt.UNSIGNED_INT_5_9_9_9_REV]: { [D.RGB]: r.RGB9_E5 },
          [tt.UNSIGNED_INT_24_8]: { [D.DEPTH_STENCIL]: r.DEPTH24_STENCIL8 },
          [tt.FLOAT_32_UNSIGNED_INT_24_8_REV]: { [D.DEPTH_STENCIL]: r.DEPTH32F_STENCIL8 }
        })
      : (t = {
          [tt.UNSIGNED_BYTE]: {
            [D.RGBA]: r.RGBA,
            [D.RGB]: r.RGB,
            [D.ALPHA]: r.ALPHA,
            [D.LUMINANCE]: r.LUMINANCE,
            [D.LUMINANCE_ALPHA]: r.LUMINANCE_ALPHA
          },
          [tt.UNSIGNED_SHORT_5_6_5]: { [D.RGB]: r.RGB },
          [tt.UNSIGNED_SHORT_4_4_4_4]: { [D.RGBA]: r.RGBA },
          [tt.UNSIGNED_SHORT_5_5_5_1]: { [D.RGBA]: r.RGBA }
        }),
    t
  )
}
class hp {
  constructor(t) {
    ;(this.renderer = t),
      (this.boundTextures = []),
      (this.currentLocation = -1),
      (this.managedTextures = []),
      (this._unknownBoundTextures = !1),
      (this.unknownTexture = new ht()),
      (this.hasIntegerTextures = !1)
  }
  contextChange() {
    const t = (this.gl = this.renderer.gl)
    ;(this.CONTEXT_UID = this.renderer.CONTEXT_UID),
      (this.webGLVersion = this.renderer.context.webGLVersion),
      (this.internalFormats = Gv(t)),
      (this.samplerTypes = kv(t))
    const e = t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS)
    this.boundTextures.length = e
    for (let s = 0; s < e; s++) this.boundTextures[s] = null
    this.emptyTextures = {}
    const i = new Ta(t.createTexture())
    t.bindTexture(t.TEXTURE_2D, i.texture),
      t.texImage2D(t.TEXTURE_2D, 0, t.RGBA, 1, 1, 0, t.RGBA, t.UNSIGNED_BYTE, new Uint8Array(4)),
      (this.emptyTextures[t.TEXTURE_2D] = i),
      (this.emptyTextures[t.TEXTURE_CUBE_MAP] = new Ta(t.createTexture())),
      t.bindTexture(t.TEXTURE_CUBE_MAP, this.emptyTextures[t.TEXTURE_CUBE_MAP].texture)
    for (let s = 0; s < 6; s++)
      t.texImage2D(
        t.TEXTURE_CUBE_MAP_POSITIVE_X + s,
        0,
        t.RGBA,
        1,
        1,
        0,
        t.RGBA,
        t.UNSIGNED_BYTE,
        null
      )
    t.texParameteri(t.TEXTURE_CUBE_MAP, t.TEXTURE_MAG_FILTER, t.LINEAR),
      t.texParameteri(t.TEXTURE_CUBE_MAP, t.TEXTURE_MIN_FILTER, t.LINEAR)
    for (let s = 0; s < this.boundTextures.length; s++) this.bind(null, s)
  }
  bind(t, e = 0) {
    const { gl: i } = this
    if (
      ((t = t == null ? void 0 : t.castToBaseTexture()),
      (t == null ? void 0 : t.valid) && !t.parentTextureArray)
    ) {
      t.touched = this.renderer.textureGC.count
      const s = t._glTextures[this.CONTEXT_UID] || this.initTexture(t)
      this.boundTextures[e] !== t &&
        (this.currentLocation !== e &&
          ((this.currentLocation = e), i.activeTexture(i.TEXTURE0 + e)),
        i.bindTexture(t.target, s.texture)),
        s.dirtyId !== t.dirtyId
          ? (this.currentLocation !== e &&
              ((this.currentLocation = e), i.activeTexture(i.TEXTURE0 + e)),
            this.updateTexture(t))
          : s.dirtyStyleId !== t.dirtyStyleId && this.updateTextureStyle(t),
        (this.boundTextures[e] = t)
    } else
      this.currentLocation !== e && ((this.currentLocation = e), i.activeTexture(i.TEXTURE0 + e)),
        i.bindTexture(i.TEXTURE_2D, this.emptyTextures[i.TEXTURE_2D].texture),
        (this.boundTextures[e] = null)
  }
  reset() {
    ;(this._unknownBoundTextures = !0), (this.hasIntegerTextures = !1), (this.currentLocation = -1)
    for (let t = 0; t < this.boundTextures.length; t++) this.boundTextures[t] = this.unknownTexture
  }
  unbind(t) {
    const { gl: e, boundTextures: i } = this
    if (this._unknownBoundTextures) {
      this._unknownBoundTextures = !1
      for (let s = 0; s < i.length; s++) i[s] === this.unknownTexture && this.bind(null, s)
    }
    for (let s = 0; s < i.length; s++)
      i[s] === t &&
        (this.currentLocation !== s &&
          (e.activeTexture(e.TEXTURE0 + s), (this.currentLocation = s)),
        e.bindTexture(t.target, this.emptyTextures[t.target].texture),
        (i[s] = null))
  }
  ensureSamplerType(t) {
    const { boundTextures: e, hasIntegerTextures: i, CONTEXT_UID: s } = this
    if (i)
      for (let n = t - 1; n >= 0; --n) {
        const o = e[n]
        o && o._glTextures[s].samplerType !== z.FLOAT && this.renderer.texture.unbind(o)
      }
  }
  initTexture(t) {
    const e = new Ta(this.gl.createTexture())
    return (
      (e.dirtyId = -1),
      (t._glTextures[this.CONTEXT_UID] = e),
      this.managedTextures.push(t),
      t.on('dispose', this.destroyTexture, this),
      e
    )
  }
  initTextureType(t, e) {
    var i
    ;(e.internalFormat =
      ((i = this.internalFormats[t.type]) == null ? void 0 : i[t.format]) ?? t.format),
      (e.samplerType = this.samplerTypes[e.internalFormat] ?? z.FLOAT),
      this.webGLVersion === 2 && t.type === tt.HALF_FLOAT
        ? (e.type = this.gl.HALF_FLOAT)
        : (e.type = t.type)
  }
  updateTexture(t) {
    var s
    const e = t._glTextures[this.CONTEXT_UID]
    if (!e) return
    const i = this.renderer
    if ((this.initTextureType(t, e), (s = t.resource) == null ? void 0 : s.upload(i, t, e)))
      e.samplerType !== z.FLOAT && (this.hasIntegerTextures = !0)
    else {
      const n = t.realWidth,
        o = t.realHeight,
        a = i.gl
      ;(e.width !== n || e.height !== o || e.dirtyId < 0) &&
        ((e.width = n),
        (e.height = o),
        a.texImage2D(t.target, 0, e.internalFormat, n, o, 0, t.format, e.type, null))
    }
    t.dirtyStyleId !== e.dirtyStyleId && this.updateTextureStyle(t), (e.dirtyId = t.dirtyId)
  }
  destroyTexture(t, e) {
    const { gl: i } = this
    if (
      ((t = t.castToBaseTexture()),
      t._glTextures[this.CONTEXT_UID] &&
        (this.unbind(t),
        i.deleteTexture(t._glTextures[this.CONTEXT_UID].texture),
        t.off('dispose', this.destroyTexture, this),
        delete t._glTextures[this.CONTEXT_UID],
        !e))
    ) {
      const s = this.managedTextures.indexOf(t)
      s !== -1 && Ui(this.managedTextures, s, 1)
    }
  }
  updateTextureStyle(t) {
    var i
    const e = t._glTextures[this.CONTEXT_UID]
    e &&
      ((t.mipmap === sr.POW2 || this.webGLVersion !== 2) && !t.isPowerOfTwo
        ? (e.mipmap = !1)
        : (e.mipmap = t.mipmap >= 1),
      this.webGLVersion !== 2 && !t.isPowerOfTwo
        ? (e.wrapMode = fr.CLAMP)
        : (e.wrapMode = t.wrapMode),
      ((i = t.resource) != null && i.style(this.renderer, t, e)) || this.setStyle(t, e),
      (e.dirtyStyleId = t.dirtyStyleId))
  }
  setStyle(t, e) {
    const i = this.gl
    if (
      (e.mipmap && t.mipmap !== sr.ON_MANUAL && i.generateMipmap(t.target),
      i.texParameteri(t.target, i.TEXTURE_WRAP_S, e.wrapMode),
      i.texParameteri(t.target, i.TEXTURE_WRAP_T, e.wrapMode),
      e.mipmap)
    ) {
      i.texParameteri(
        t.target,
        i.TEXTURE_MIN_FILTER,
        t.scaleMode === Qt.LINEAR ? i.LINEAR_MIPMAP_LINEAR : i.NEAREST_MIPMAP_NEAREST
      )
      const s = this.renderer.context.extensions.anisotropicFiltering
      if (s && t.anisotropicLevel > 0 && t.scaleMode === Qt.LINEAR) {
        const n = Math.min(t.anisotropicLevel, i.getParameter(s.MAX_TEXTURE_MAX_ANISOTROPY_EXT))
        i.texParameterf(t.target, s.TEXTURE_MAX_ANISOTROPY_EXT, n)
      }
    } else
      i.texParameteri(
        t.target,
        i.TEXTURE_MIN_FILTER,
        t.scaleMode === Qt.LINEAR ? i.LINEAR : i.NEAREST
      )
    i.texParameteri(
      t.target,
      i.TEXTURE_MAG_FILTER,
      t.scaleMode === Qt.LINEAR ? i.LINEAR : i.NEAREST
    )
  }
  destroy() {
    this.renderer = null
  }
}
hp.extension = { type: j.RendererSystem, name: 'texture' }
q.add(hp)
class lp {
  constructor(t) {
    this.renderer = t
  }
  contextChange() {
    ;(this.gl = this.renderer.gl), (this.CONTEXT_UID = this.renderer.CONTEXT_UID)
  }
  bind(t) {
    const { gl: e, CONTEXT_UID: i } = this,
      s = t._glTransformFeedbacks[i] || this.createGLTransformFeedback(t)
    e.bindTransformFeedback(e.TRANSFORM_FEEDBACK, s)
  }
  unbind() {
    const { gl: t } = this
    t.bindTransformFeedback(t.TRANSFORM_FEEDBACK, null)
  }
  beginTransformFeedback(t, e) {
    const { gl: i, renderer: s } = this
    e && s.shader.bind(e), i.beginTransformFeedback(t)
  }
  endTransformFeedback() {
    const { gl: t } = this
    t.endTransformFeedback()
  }
  createGLTransformFeedback(t) {
    const { gl: e, renderer: i, CONTEXT_UID: s } = this,
      n = e.createTransformFeedback()
    ;(t._glTransformFeedbacks[s] = n), e.bindTransformFeedback(e.TRANSFORM_FEEDBACK, n)
    for (let o = 0; o < t.buffers.length; o++) {
      const a = t.buffers[o]
      a &&
        (i.buffer.update(a),
        a._glBuffers[s].refCount++,
        e.bindBufferBase(e.TRANSFORM_FEEDBACK_BUFFER, o, a._glBuffers[s].buffer || null))
    }
    return e.bindTransformFeedback(e.TRANSFORM_FEEDBACK, null), t.disposeRunner.add(this), n
  }
  disposeTransformFeedback(t, e) {
    const i = t._glTransformFeedbacks[this.CONTEXT_UID],
      s = this.gl
    t.disposeRunner.remove(this)
    const n = this.renderer.buffer
    if (n)
      for (let o = 0; o < t.buffers.length; o++) {
        const a = t.buffers[o]
        if (!a) continue
        const h = a._glBuffers[this.CONTEXT_UID]
        h && (h.refCount--, h.refCount === 0 && !e && n.dispose(a, e))
      }
    i && (e || s.deleteTransformFeedback(i), delete t._glTransformFeedbacks[this.CONTEXT_UID])
  }
  destroy() {
    this.renderer = null
  }
}
lp.extension = { type: j.RendererSystem, name: 'transformFeedback' }
q.add(lp)
class oo {
  constructor(t) {
    this.renderer = t
  }
  init(t) {
    ;(this.screen = new nt(0, 0, t.width, t.height)),
      (this.element = t.view || Y.ADAPTER.createCanvas()),
      (this.resolution = t.resolution || Y.RESOLUTION),
      (this.autoDensity = !!t.autoDensity)
  }
  resizeView(t, e) {
    ;(this.element.width = Math.round(t * this.resolution)),
      (this.element.height = Math.round(e * this.resolution))
    const i = this.element.width / this.resolution,
      s = this.element.height / this.resolution
    ;(this.screen.width = i),
      (this.screen.height = s),
      this.autoDensity &&
        ((this.element.style.width = `${i}px`), (this.element.style.height = `${s}px`)),
      this.renderer.emit('resize', i, s),
      this.renderer.runners.resize.emit(this.screen.width, this.screen.height)
  }
  destroy(t) {
    var e
    t && ((e = this.element.parentNode) == null || e.removeChild(this.element)),
      (this.renderer = null),
      (this.element = null),
      (this.screen = null)
  }
}
;(oo.defaultOptions = { width: 800, height: 600, resolution: void 0, autoDensity: !1 }),
  (oo.extension = { type: [j.RendererSystem, j.CanvasRendererSystem], name: '_view' })
q.add(oo)
Y.PREFER_ENV = pi.WEBGL2
Y.STRICT_TEXTURE_CACHE = !1
Y.RENDER_OPTIONS = {
  ...so.defaultOptions,
  ...io.defaultOptions,
  ...oo.defaultOptions,
  ...no.defaultOptions
}
Object.defineProperties(Y, {
  WRAP_MODE: {
    get() {
      return ht.defaultOptions.wrapMode
    },
    set(r) {
      ut('7.1.0', 'settings.WRAP_MODE is deprecated, use BaseTexture.defaultOptions.wrapMode'),
        (ht.defaultOptions.wrapMode = r)
    }
  },
  SCALE_MODE: {
    get() {
      return ht.defaultOptions.scaleMode
    },
    set(r) {
      ut('7.1.0', 'settings.SCALE_MODE is deprecated, use BaseTexture.defaultOptions.scaleMode'),
        (ht.defaultOptions.scaleMode = r)
    }
  },
  MIPMAP_TEXTURES: {
    get() {
      return ht.defaultOptions.mipmap
    },
    set(r) {
      ut('7.1.0', 'settings.MIPMAP_TEXTURES is deprecated, use BaseTexture.defaultOptions.mipmap'),
        (ht.defaultOptions.mipmap = r)
    }
  },
  ANISOTROPIC_LEVEL: {
    get() {
      return ht.defaultOptions.anisotropicLevel
    },
    set(r) {
      ut(
        '7.1.0',
        'settings.ANISOTROPIC_LEVEL is deprecated, use BaseTexture.defaultOptions.anisotropicLevel'
      ),
        (ht.defaultOptions.anisotropicLevel = r)
    }
  },
  FILTER_RESOLUTION: {
    get() {
      return (
        ut('7.1.0', 'settings.FILTER_RESOLUTION is deprecated, use Filter.defaultResolution'),
        Jt.defaultResolution
      )
    },
    set(r) {
      Jt.defaultResolution = r
    }
  },
  FILTER_MULTISAMPLE: {
    get() {
      return (
        ut('7.1.0', 'settings.FILTER_MULTISAMPLE is deprecated, use Filter.defaultMultisample'),
        Jt.defaultMultisample
      )
    },
    set(r) {
      Jt.defaultMultisample = r
    }
  },
  SPRITE_MAX_TEXTURES: {
    get() {
      return Qr.defaultMaxTextures
    },
    set(r) {
      ut(
        '7.1.0',
        'settings.SPRITE_MAX_TEXTURES is deprecated, use BatchRenderer.defaultMaxTextures'
      ),
        (Qr.defaultMaxTextures = r)
    }
  },
  SPRITE_BATCH_SIZE: {
    get() {
      return Qr.defaultBatchSize
    },
    set(r) {
      ut('7.1.0', 'settings.SPRITE_BATCH_SIZE is deprecated, use BatchRenderer.defaultBatchSize'),
        (Qr.defaultBatchSize = r)
    }
  },
  CAN_UPLOAD_SAME_BUFFER: {
    get() {
      return Qr.canUploadSameBuffer
    },
    set(r) {
      ut(
        '7.1.0',
        'settings.CAN_UPLOAD_SAME_BUFFER is deprecated, use BatchRenderer.canUploadSameBuffer'
      ),
        (Qr.canUploadSameBuffer = r)
    }
  },
  GC_MODE: {
    get() {
      return Kr.defaultMode
    },
    set(r) {
      ut('7.1.0', 'settings.GC_MODE is deprecated, use TextureGCSystem.defaultMode'),
        (Kr.defaultMode = r)
    }
  },
  GC_MAX_IDLE: {
    get() {
      return Kr.defaultMaxIdle
    },
    set(r) {
      ut('7.1.0', 'settings.GC_MAX_IDLE is deprecated, use TextureGCSystem.defaultMaxIdle'),
        (Kr.defaultMaxIdle = r)
    }
  },
  GC_MAX_CHECK_COUNT: {
    get() {
      return Kr.defaultCheckCountMax
    },
    set(r) {
      ut(
        '7.1.0',
        'settings.GC_MAX_CHECK_COUNT is deprecated, use TextureGCSystem.defaultCheckCountMax'
      ),
        (Kr.defaultCheckCountMax = r)
    }
  },
  PRECISION_VERTEX: {
    get() {
      return ur.defaultVertexPrecision
    },
    set(r) {
      ut('7.1.0', 'settings.PRECISION_VERTEX is deprecated, use Program.defaultVertexPrecision'),
        (ur.defaultVertexPrecision = r)
    }
  },
  PRECISION_FRAGMENT: {
    get() {
      return ur.defaultFragmentPrecision
    },
    set(r) {
      ut(
        '7.1.0',
        'settings.PRECISION_FRAGMENT is deprecated, use Program.defaultFragmentPrecision'
      ),
        (ur.defaultFragmentPrecision = r)
    }
  }
})
var Or = ((r) => (
  (r[(r.INTERACTION = 50)] = 'INTERACTION'),
  (r[(r.HIGH = 25)] = 'HIGH'),
  (r[(r.NORMAL = 0)] = 'NORMAL'),
  (r[(r.LOW = -25)] = 'LOW'),
  (r[(r.UTILITY = -50)] = 'UTILITY'),
  r
))(Or || {})
class wa {
  constructor(t, e = null, i = 0, s = !1) {
    ;(this.next = null),
      (this.previous = null),
      (this._destroyed = !1),
      (this.fn = t),
      (this.context = e),
      (this.priority = i),
      (this.once = s)
  }
  match(t, e = null) {
    return this.fn === t && this.context === e
  }
  emit(t) {
    this.fn && (this.context ? this.fn.call(this.context, t) : this.fn(t))
    const e = this.next
    return this.once && this.destroy(!0), this._destroyed && (this.next = null), e
  }
  connect(t) {
    ;(this.previous = t), t.next && (t.next.previous = this), (this.next = t.next), (t.next = this)
  }
  destroy(t = !1) {
    ;(this._destroyed = !0),
      (this.fn = null),
      (this.context = null),
      this.previous && (this.previous.next = this.next),
      this.next && (this.next.previous = this.previous)
    const e = this.next
    return (this.next = t ? null : e), (this.previous = null), e
  }
}
const cp = class ye {
  constructor() {
    ;(this.autoStart = !1),
      (this.deltaTime = 1),
      (this.lastTime = -1),
      (this.speed = 1),
      (this.started = !1),
      (this._requestId = null),
      (this._maxElapsedMS = 100),
      (this._minElapsedMS = 0),
      (this._protected = !1),
      (this._lastFrame = -1),
      (this._head = new wa(null, null, 1 / 0)),
      (this.deltaMS = 1 / ye.targetFPMS),
      (this.elapsedMS = 1 / ye.targetFPMS),
      (this._tick = (t) => {
        ;(this._requestId = null),
          this.started &&
            (this.update(t),
            this.started &&
              this._requestId === null &&
              this._head.next &&
              (this._requestId = requestAnimationFrame(this._tick)))
      })
  }
  _requestIfNeeded() {
    this._requestId === null &&
      this._head.next &&
      ((this.lastTime = performance.now()),
      (this._lastFrame = this.lastTime),
      (this._requestId = requestAnimationFrame(this._tick)))
  }
  _cancelIfNeeded() {
    this._requestId !== null && (cancelAnimationFrame(this._requestId), (this._requestId = null))
  }
  _startIfPossible() {
    this.started ? this._requestIfNeeded() : this.autoStart && this.start()
  }
  add(t, e, i = Or.NORMAL) {
    return this._addListener(new wa(t, e, i))
  }
  addOnce(t, e, i = Or.NORMAL) {
    return this._addListener(new wa(t, e, i, !0))
  }
  _addListener(t) {
    let e = this._head.next,
      i = this._head
    if (!e) t.connect(i)
    else {
      for (; e; ) {
        if (t.priority > e.priority) {
          t.connect(i)
          break
        }
        ;(i = e), (e = e.next)
      }
      t.previous || t.connect(i)
    }
    return this._startIfPossible(), this
  }
  remove(t, e) {
    let i = this._head.next
    for (; i; ) i.match(t, e) ? (i = i.destroy()) : (i = i.next)
    return this._head.next || this._cancelIfNeeded(), this
  }
  get count() {
    if (!this._head) return 0
    let t = 0,
      e = this._head
    for (; (e = e.next); ) t++
    return t
  }
  start() {
    this.started || ((this.started = !0), this._requestIfNeeded())
  }
  stop() {
    this.started && ((this.started = !1), this._cancelIfNeeded())
  }
  destroy() {
    if (!this._protected) {
      this.stop()
      let t = this._head.next
      for (; t; ) t = t.destroy(!0)
      this._head.destroy(), (this._head = null)
    }
  }
  update(t = performance.now()) {
    let e
    if (t > this.lastTime) {
      if (
        ((e = this.elapsedMS = t - this.lastTime),
        e > this._maxElapsedMS && (e = this._maxElapsedMS),
        (e *= this.speed),
        this._minElapsedMS)
      ) {
        const n = (t - this._lastFrame) | 0
        if (n < this._minElapsedMS) return
        this._lastFrame = t - (n % this._minElapsedMS)
      }
      ;(this.deltaMS = e), (this.deltaTime = this.deltaMS * ye.targetFPMS)
      const i = this._head
      let s = i.next
      for (; s; ) s = s.emit(this.deltaTime)
      i.next || this._cancelIfNeeded()
    } else this.deltaTime = this.deltaMS = this.elapsedMS = 0
    this.lastTime = t
  }
  get FPS() {
    return 1e3 / this.elapsedMS
  }
  get minFPS() {
    return 1e3 / this._maxElapsedMS
  }
  set minFPS(t) {
    const e = Math.min(this.maxFPS, t),
      i = Math.min(Math.max(0, e) / 1e3, ye.targetFPMS)
    this._maxElapsedMS = 1 / i
  }
  get maxFPS() {
    return this._minElapsedMS ? Math.round(1e3 / this._minElapsedMS) : 0
  }
  set maxFPS(t) {
    if (t === 0) this._minElapsedMS = 0
    else {
      const e = Math.max(this.minFPS, t)
      this._minElapsedMS = 1 / (e / 1e3)
    }
  }
  static get shared() {
    if (!ye._shared) {
      const t = (ye._shared = new ye())
      ;(t.autoStart = !0), (t._protected = !0)
    }
    return ye._shared
  }
  static get system() {
    if (!ye._system) {
      const t = (ye._system = new ye())
      ;(t.autoStart = !0), (t._protected = !0)
    }
    return ye._system
  }
}
cp.targetFPMS = 0.06
let Tt = cp
Object.defineProperties(Y, {
  TARGET_FPMS: {
    get() {
      return Tt.targetFPMS
    },
    set(r) {
      ut('7.1.0', 'settings.TARGET_FPMS is deprecated, use Ticker.targetFPMS'), (Tt.targetFPMS = r)
    }
  }
})
class up {
  static init(t) {
    ;(t = Object.assign({ autoStart: !0, sharedTicker: !1 }, t)),
      Object.defineProperty(this, 'ticker', {
        set(e) {
          this._ticker && this._ticker.remove(this.render, this),
            (this._ticker = e),
            e && e.add(this.render, this, Or.LOW)
        },
        get() {
          return this._ticker
        }
      }),
      (this.stop = () => {
        this._ticker.stop()
      }),
      (this.start = () => {
        this._ticker.start()
      }),
      (this._ticker = null),
      (this.ticker = t.sharedTicker ? Tt.shared : new Tt()),
      t.autoStart && this.start()
  }
  static destroy() {
    if (this._ticker) {
      const t = this._ticker
      ;(this.ticker = null), t.destroy()
    }
  }
}
up.extension = j.Application
q.add(up)
const dp = []
q.handleByList(j.Renderer, dp)
function Hv(r) {
  for (const t of dp) if (t.test(r)) return new t(r)
  throw new Error('Unable to auto-detect a suitable renderer.')
}
var Vv = `attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat3 projectionMatrix;

varying vec2 vTextureCoord;

void main(void)
{
    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);
    vTextureCoord = aTextureCoord;
}`,
  Xv = `attribute vec2 aVertexPosition;

uniform mat3 projectionMatrix;

varying vec2 vTextureCoord;

uniform vec4 inputSize;
uniform vec4 outputFrame;

vec4 filterVertexPosition( void )
{
    vec2 position = aVertexPosition * max(outputFrame.zw, vec2(0.)) + outputFrame.xy;

    return vec4((projectionMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);
}

vec2 filterTextureCoord( void )
{
    return aVertexPosition * (outputFrame.zw * inputSize.zw);
}

void main(void)
{
    gl_Position = filterVertexPosition();
    vTextureCoord = filterTextureCoord();
}
`
const jv = Vv,
  fp = Xv
class pp {
  constructor(t) {
    this.renderer = t
  }
  contextChange(t) {
    let e
    if (this.renderer.context.webGLVersion === 1) {
      const i = t.getParameter(t.FRAMEBUFFER_BINDING)
      t.bindFramebuffer(t.FRAMEBUFFER, null),
        (e = t.getParameter(t.SAMPLES)),
        t.bindFramebuffer(t.FRAMEBUFFER, i)
    } else {
      const i = t.getParameter(t.DRAW_FRAMEBUFFER_BINDING)
      t.bindFramebuffer(t.DRAW_FRAMEBUFFER, null),
        (e = t.getParameter(t.SAMPLES)),
        t.bindFramebuffer(t.DRAW_FRAMEBUFFER, i)
    }
    e >= Xt.HIGH
      ? (this.multisample = Xt.HIGH)
      : e >= Xt.MEDIUM
        ? (this.multisample = Xt.MEDIUM)
        : e >= Xt.LOW
          ? (this.multisample = Xt.LOW)
          : (this.multisample = Xt.NONE)
  }
  destroy() {}
}
pp.extension = { type: j.RendererSystem, name: '_multisample' }
q.add(pp)
class Wv {
  constructor(t) {
    ;(this.buffer = t || null), (this.updateID = -1), (this.byteLength = -1), (this.refCount = 0)
  }
}
class mp {
  constructor(t) {
    ;(this.renderer = t), (this.managedBuffers = {}), (this.boundBufferBases = {})
  }
  destroy() {
    this.renderer = null
  }
  contextChange() {
    this.disposeAll(!0),
      (this.gl = this.renderer.gl),
      (this.CONTEXT_UID = this.renderer.CONTEXT_UID)
  }
  bind(t) {
    const { gl: e, CONTEXT_UID: i } = this,
      s = t._glBuffers[i] || this.createGLBuffer(t)
    e.bindBuffer(t.type, s.buffer)
  }
  unbind(t) {
    const { gl: e } = this
    e.bindBuffer(t, null)
  }
  bindBufferBase(t, e) {
    const { gl: i, CONTEXT_UID: s } = this
    if (this.boundBufferBases[e] !== t) {
      const n = t._glBuffers[s] || this.createGLBuffer(t)
      ;(this.boundBufferBases[e] = t), i.bindBufferBase(i.UNIFORM_BUFFER, e, n.buffer)
    }
  }
  bindBufferRange(t, e, i) {
    const { gl: s, CONTEXT_UID: n } = this
    i = i || 0
    const o = t._glBuffers[n] || this.createGLBuffer(t)
    s.bindBufferRange(s.UNIFORM_BUFFER, e || 0, o.buffer, i * 256, 256)
  }
  update(t) {
    const { gl: e, CONTEXT_UID: i } = this,
      s = t._glBuffers[i] || this.createGLBuffer(t)
    if (t._updateID !== s.updateID)
      if (
        ((s.updateID = t._updateID),
        e.bindBuffer(t.type, s.buffer),
        s.byteLength >= t.data.byteLength)
      )
        e.bufferSubData(t.type, 0, t.data)
      else {
        const n = t.static ? e.STATIC_DRAW : e.DYNAMIC_DRAW
        ;(s.byteLength = t.data.byteLength), e.bufferData(t.type, t.data, n)
      }
  }
  dispose(t, e) {
    if (!this.managedBuffers[t.id]) return
    delete this.managedBuffers[t.id]
    const i = t._glBuffers[this.CONTEXT_UID],
      s = this.gl
    t.disposeRunner.remove(this),
      i && (e || s.deleteBuffer(i.buffer), delete t._glBuffers[this.CONTEXT_UID])
  }
  disposeAll(t) {
    const e = Object.keys(this.managedBuffers)
    for (let i = 0; i < e.length; i++) this.dispose(this.managedBuffers[e[i]], t)
  }
  createGLBuffer(t) {
    const { CONTEXT_UID: e, gl: i } = this
    return (
      (t._glBuffers[e] = new Wv(i.createBuffer())),
      (this.managedBuffers[t.id] = t),
      t.disposeRunner.add(this),
      t._glBuffers[e]
    )
  }
}
mp.extension = { type: j.RendererSystem, name: 'buffer' }
q.add(mp)
class gp {
  constructor(t) {
    this.renderer = t
  }
  render(t, e) {
    const i = this.renderer
    let s, n, o, a
    if (
      (e && ((s = e.renderTexture), (n = e.clear), (o = e.transform), (a = e.skipUpdateTransform)),
      (this.renderingToScreen = !s),
      i.runners.prerender.emit(),
      i.emit('prerender'),
      (i.projection.transform = o),
      !i.context.isLost)
    ) {
      if ((s || (this.lastObjectRendered = t), !a)) {
        const h = t.enableTempParent()
        t.updateTransform(), t.disableTempParent(h)
      }
      i.renderTexture.bind(s),
        i.batch.currentRenderer.start(),
        (n ?? i.background.clearBeforeRender) && i.renderTexture.clear(),
        t.render(i),
        i.batch.currentRenderer.flush(),
        s && (e.blit && i.framebuffer.blit(), s.baseTexture.update()),
        i.runners.postrender.emit(),
        (i.projection.transform = null),
        i.emit('postrender')
    }
  }
  destroy() {
    ;(this.renderer = null), (this.lastObjectRendered = null)
  }
}
gp.extension = { type: j.RendererSystem, name: 'objectRenderer' }
q.add(gp)
const Un = class wh extends Uv {
  constructor(t) {
    super(),
      (this.type = sf.WEBGL),
      (t = Object.assign({}, Y.RENDER_OPTIONS, t)),
      (this.gl = null),
      (this.CONTEXT_UID = 0),
      (this.globalUniforms = new Le({ projectionMatrix: new Ct() }, !0))
    const e = {
      runners: [
        'init',
        'destroy',
        'contextChange',
        'resolutionChange',
        'reset',
        'update',
        'postrender',
        'prerender',
        'resize'
      ],
      systems: wh.__systems,
      priority: [
        '_view',
        'textureGenerator',
        'background',
        '_plugin',
        'startup',
        'context',
        'state',
        'texture',
        'buffer',
        'geometry',
        'framebuffer',
        'transformFeedback',
        'mask',
        'scissor',
        'stencil',
        'projection',
        'textureGC',
        'filter',
        'renderTexture',
        'batch',
        'objectRenderer',
        '_multisample'
      ]
    }
    this.setup(e),
      'useContextAlpha' in t &&
        (ut(
          '7.0.0',
          'options.useContextAlpha is deprecated, use options.premultipliedAlpha and options.backgroundAlpha instead'
        ),
        (t.premultipliedAlpha = t.useContextAlpha && t.useContextAlpha !== 'notMultiplied'),
        (t.backgroundAlpha = t.useContextAlpha === !1 ? 1 : t.backgroundAlpha)),
      (this._plugin.rendererPlugins = wh.__plugins),
      (this.options = t),
      this.startup.run(this.options)
  }
  static test(t) {
    return t != null && t.forceCanvas ? !1 : p0()
  }
  render(t, e) {
    this.objectRenderer.render(t, e)
  }
  resize(t, e) {
    this._view.resizeView(t, e)
  }
  reset() {
    return this.runners.reset.emit(), this
  }
  clear() {
    this.renderTexture.bind(), this.renderTexture.clear()
  }
  destroy(t = !1) {
    this.runners.destroy.items.reverse(),
      this.emitWithCustomOptions(this.runners.destroy, { _view: t }),
      super.destroy()
  }
  get plugins() {
    return this._plugin.plugins
  }
  get multisample() {
    return this._multisample.multisample
  }
  get width() {
    return this._view.element.width
  }
  get height() {
    return this._view.element.height
  }
  get resolution() {
    return this._view.resolution
  }
  set resolution(t) {
    ;(this._view.resolution = t), this.runners.resolutionChange.emit(t)
  }
  get autoDensity() {
    return this._view.autoDensity
  }
  get view() {
    return this._view.element
  }
  get screen() {
    return this._view.screen
  }
  get lastObjectRendered() {
    return this.objectRenderer.lastObjectRendered
  }
  get renderingToScreen() {
    return this.objectRenderer.renderingToScreen
  }
  get rendererLogId() {
    return `WebGL ${this.context.webGLVersion}`
  }
  get clearBeforeRender() {
    return (
      ut(
        '7.0.0',
        'renderer.clearBeforeRender has been deprecated, please use renderer.background.clearBeforeRender instead.'
      ),
      this.background.clearBeforeRender
    )
  }
  get useContextAlpha() {
    return (
      ut(
        '7.0.0',
        'renderer.useContextAlpha has been deprecated, please use renderer.context.premultipliedAlpha instead.'
      ),
      this.context.useContextAlpha
    )
  }
  get preserveDrawingBuffer() {
    return (
      ut(
        '7.0.0',
        'renderer.preserveDrawingBuffer has been deprecated, we cannot truly know this unless pixi created the context'
      ),
      this.context.preserveDrawingBuffer
    )
  }
  get backgroundColor() {
    return (
      ut(
        '7.0.0',
        'renderer.backgroundColor has been deprecated, use renderer.background.color instead.'
      ),
      this.background.color
    )
  }
  set backgroundColor(t) {
    ut(
      '7.0.0',
      'renderer.backgroundColor has been deprecated, use renderer.background.color instead.'
    ),
      (this.background.color = t)
  }
  get backgroundAlpha() {
    return (
      ut(
        '7.0.0',
        'renderer.backgroundAlpha has been deprecated, use renderer.background.alpha instead.'
      ),
      this.background.alpha
    )
  }
  set backgroundAlpha(t) {
    ut(
      '7.0.0',
      'renderer.backgroundAlpha has been deprecated, use renderer.background.alpha instead.'
    ),
      (this.background.alpha = t)
  }
  get powerPreference() {
    return (
      ut(
        '7.0.0',
        'renderer.powerPreference has been deprecated, we can only know this if pixi creates the context'
      ),
      this.context.powerPreference
    )
  }
  generateTexture(t, e) {
    return this.textureGenerator.generateTexture(t, e)
  }
}
;(Un.extension = { type: j.Renderer, priority: 1 }), (Un.__plugins = {}), (Un.__systems = {})
let Ml = Un
q.handleByMap(j.RendererPlugin, Ml.__plugins)
q.handleByMap(j.RendererSystem, Ml.__systems)
q.add(Ml)
class _p extends Ls {
  constructor(t, e) {
    const { width: i, height: s } = e || {}
    super(i, s), (this.items = []), (this.itemDirtyIds = [])
    for (let n = 0; n < t; n++) {
      const o = new ht()
      this.items.push(o), this.itemDirtyIds.push(-2)
    }
    ;(this.length = t), (this._load = null), (this.baseTexture = null)
  }
  initFromArray(t, e) {
    for (let i = 0; i < this.length; i++)
      t[i] &&
        (t[i].castToBaseTexture
          ? this.addBaseTextureAt(t[i].castToBaseTexture(), i)
          : t[i] instanceof Ls
            ? this.addResourceAt(t[i], i)
            : this.addResourceAt(Lf(t[i], e), i))
  }
  dispose() {
    for (let t = 0, e = this.length; t < e; t++) this.items[t].destroy()
    ;(this.items = null), (this.itemDirtyIds = null), (this._load = null)
  }
  addResourceAt(t, e) {
    if (!this.items[e]) throw new Error(`Index ${e} is out of bounds`)
    return (
      t.valid && !this.valid && this.resize(t.width, t.height), this.items[e].setResource(t), this
    )
  }
  bind(t) {
    if (this.baseTexture !== null)
      throw new Error('Only one base texture per TextureArray is allowed')
    super.bind(t)
    for (let e = 0; e < this.length; e++)
      (this.items[e].parentTextureArray = t), this.items[e].on('update', t.update, t)
  }
  unbind(t) {
    super.unbind(t)
    for (let e = 0; e < this.length; e++)
      (this.items[e].parentTextureArray = null), this.items[e].off('update', t.update, t)
  }
  load() {
    if (this._load) return this._load
    const t = this.items
      .map((e) => e.resource)
      .filter((e) => e)
      .map((e) => e.load())
    return (
      (this._load = Promise.all(t).then(() => {
        const { realWidth: e, realHeight: i } = this.items[0]
        return this.resize(e, i), this.update(), Promise.resolve(this)
      })),
      this._load
    )
  }
}
class $v extends _p {
  constructor(t, e) {
    const { width: i, height: s } = e || {}
    let n, o
    Array.isArray(t) ? ((n = t), (o = t.length)) : (o = t),
      super(o, { width: i, height: s }),
      n && this.initFromArray(n, e)
  }
  addBaseTextureAt(t, e) {
    if (t.resource) this.addResourceAt(t.resource, e)
    else throw new Error('ArrayResource does not support RenderTexture')
    return this
  }
  bind(t) {
    super.bind(t), (t.target = Oi.TEXTURE_2D_ARRAY)
  }
  upload(t, e, i) {
    const { length: s, itemDirtyIds: n, items: o } = this,
      { gl: a } = t
    i.dirtyId < 0 &&
      a.texImage3D(
        a.TEXTURE_2D_ARRAY,
        0,
        i.internalFormat,
        this._width,
        this._height,
        s,
        0,
        e.format,
        i.type,
        null
      )
    for (let h = 0; h < s; h++) {
      const l = o[h]
      n[h] < l.dirtyId &&
        ((n[h] = l.dirtyId),
        l.valid &&
          a.texSubImage3D(
            a.TEXTURE_2D_ARRAY,
            0,
            0,
            0,
            h,
            l.resource.width,
            l.resource.height,
            1,
            e.format,
            i.type,
            l.resource.source
          ))
    }
    return !0
  }
}
class zv extends gr {
  constructor(t) {
    super(t)
  }
  static test(t) {
    const { OffscreenCanvas: e } = globalThis
    return e && t instanceof e ? !0 : globalThis.HTMLCanvasElement && t instanceof HTMLCanvasElement
  }
}
const yp = class us extends _p {
  constructor(t, e) {
    const { width: i, height: s, autoLoad: n, linkBaseTexture: o } = e || {}
    if (t && t.length !== us.SIDES) throw new Error(`Invalid length. Got ${t.length}, expected 6`)
    super(6, { width: i, height: s })
    for (let a = 0; a < us.SIDES; a++) this.items[a].target = Oi.TEXTURE_CUBE_MAP_POSITIVE_X + a
    ;(this.linkBaseTexture = o !== !1), t && this.initFromArray(t, e), n !== !1 && this.load()
  }
  bind(t) {
    super.bind(t), (t.target = Oi.TEXTURE_CUBE_MAP)
  }
  addBaseTextureAt(t, e, i) {
    if ((i === void 0 && (i = this.linkBaseTexture), !this.items[e]))
      throw new Error(`Index ${e} is out of bounds`)
    if (!this.linkBaseTexture || t.parentTextureArray || Object.keys(t._glTextures).length > 0)
      if (t.resource) this.addResourceAt(t.resource, e)
      else throw new Error('CubeResource does not support copying of renderTexture.')
    else
      (t.target = Oi.TEXTURE_CUBE_MAP_POSITIVE_X + e),
        (t.parentTextureArray = this.baseTexture),
        (this.items[e] = t)
    return (
      t.valid && !this.valid && this.resize(t.realWidth, t.realHeight), (this.items[e] = t), this
    )
  }
  upload(t, e, i) {
    const s = this.itemDirtyIds
    for (let n = 0; n < us.SIDES; n++) {
      const o = this.items[n]
      ;(s[n] < o.dirtyId || i.dirtyId < e.dirtyId) &&
        (o.valid && o.resource
          ? (o.resource.upload(t, o, i), (s[n] = o.dirtyId))
          : s[n] < -1 &&
            (t.gl.texImage2D(
              o.target,
              0,
              i.internalFormat,
              e.realWidth,
              e.realHeight,
              0,
              e.format,
              i.type,
              null
            ),
            (s[n] = -1)))
    }
    return !0
  }
  static test(t) {
    return Array.isArray(t) && t.length === us.SIDES
  }
}
yp.SIDES = 6
let Yv = yp
class Bi extends gr {
  constructor(t, e) {
    e = e || {}
    let i, s, n
    typeof t == 'string' ? ((i = Bi.EMPTY), (s = t), (n = !0)) : ((i = t), (s = null), (n = !1)),
      super(i),
      (this.url = s),
      (this.crossOrigin = e.crossOrigin ?? !0),
      (this.alphaMode = typeof e.alphaMode == 'number' ? e.alphaMode : null),
      (this.ownsImageBitmap = e.ownsImageBitmap ?? n),
      (this._load = null),
      e.autoLoad !== !1 && this.load()
  }
  load() {
    return this._load
      ? this._load
      : ((this._load = new Promise(async (t, e) => {
          if (this.url === null) {
            t(this)
            return
          }
          try {
            const i = await Y.ADAPTER.fetch(this.url, {
              mode: this.crossOrigin ? 'cors' : 'no-cors'
            })
            if (this.destroyed) return
            const s = await i.blob()
            if (this.destroyed) return
            const n = await createImageBitmap(s, {
              premultiplyAlpha:
                this.alphaMode === null || this.alphaMode === de.UNPACK ? 'premultiply' : 'none'
            })
            if (this.destroyed) {
              n.close()
              return
            }
            ;(this.source = n), this.update(), t(this)
          } catch (i) {
            if (this.destroyed) return
            e(i), this.onError.emit(i)
          }
        })),
        this._load)
  }
  upload(t, e, i) {
    return this.source instanceof ImageBitmap
      ? (typeof this.alphaMode == 'number' && (e.alphaMode = this.alphaMode), super.upload(t, e, i))
      : (this.load(), !1)
  }
  dispose() {
    this.ownsImageBitmap && this.source instanceof ImageBitmap && this.source.close(),
      super.dispose(),
      (this._load = null)
  }
  static test(t) {
    return (
      !!globalThis.createImageBitmap &&
      typeof ImageBitmap < 'u' &&
      (typeof t == 'string' || t instanceof ImageBitmap)
    )
  }
  static get EMPTY() {
    return (Bi._EMPTY = Bi._EMPTY ?? Y.ADAPTER.createCanvas(0, 0)), Bi._EMPTY
  }
}
const Sh = class kn extends gr {
  constructor(t, e) {
    ;(e = e || {}),
      super(Y.ADAPTER.createCanvas()),
      (this._width = 0),
      (this._height = 0),
      (this.svg = t),
      (this.scale = e.scale || 1),
      (this._overrideWidth = e.width),
      (this._overrideHeight = e.height),
      (this._resolve = null),
      (this._crossorigin = e.crossorigin),
      (this._load = null),
      e.autoLoad !== !1 && this.load()
  }
  load() {
    return this._load
      ? this._load
      : ((this._load = new Promise((t) => {
          if (
            ((this._resolve = () => {
              this.update(), t(this)
            }),
            kn.SVG_XML.test(this.svg.trim()))
          ) {
            if (!btoa) throw new Error("Your browser doesn't support base64 conversions.")
            this.svg = `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(this.svg)))}`
          }
          this._loadSvg()
        })),
        this._load)
  }
  _loadSvg() {
    const t = new Image()
    gr.crossOrigin(t, this.svg, this._crossorigin),
      (t.src = this.svg),
      (t.onerror = (e) => {
        this._resolve && ((t.onerror = null), this.onError.emit(e))
      }),
      (t.onload = () => {
        if (!this._resolve) return
        const e = t.width,
          i = t.height
        if (!e || !i)
          throw new Error(
            'The SVG image must have width and height defined (in pixels), canvas API needs them.'
          )
        let s = e * this.scale,
          n = i * this.scale
        ;(this._overrideWidth || this._overrideHeight) &&
          ((s = this._overrideWidth || (this._overrideHeight / i) * e),
          (n = this._overrideHeight || (this._overrideWidth / e) * i)),
          (s = Math.round(s)),
          (n = Math.round(n))
        const o = this.source
        ;(o.width = s),
          (o.height = n),
          (o._pixiId = `canvas_${di()}`),
          o.getContext('2d').drawImage(t, 0, 0, e, i, 0, 0, s, n),
          this._resolve(),
          (this._resolve = null)
      })
  }
  static getSize(t) {
    const e = kn.SVG_SIZE.exec(t),
      i = {}
    return (
      e && ((i[e[1]] = Math.round(parseFloat(e[3]))), (i[e[5]] = Math.round(parseFloat(e[7])))), i
    )
  }
  dispose() {
    super.dispose(), (this._resolve = null), (this._crossorigin = null)
  }
  static test(t, e) {
    return (
      e === 'svg' ||
      (typeof t == 'string' && t.startsWith('data:image/svg+xml')) ||
      (typeof t == 'string' && kn.SVG_XML.test(t))
    )
  }
}
;(Sh.SVG_XML = /^(<\?xml[^?]+\?>)?\s*(<!--[^(-->)]*-->)?\s*\<svg/m),
  (Sh.SVG_SIZE =
    /<svg[^>]*(?:\s(width|height)=('|")(\d*(?:\.\d+)?)(?:px)?('|"))[^>]*(?:\s(width|height)=('|")(\d*(?:\.\d+)?)(?:px)?('|"))[^>]*>/i)
let Ch = Sh
class Qv extends gr {
  constructor(t) {
    super(t)
  }
  static test(t) {
    return !!globalThis.VideoFrame && t instanceof globalThis.VideoFrame
  }
}
const Ih = class Rh extends gr {
  constructor(t, e) {
    if (((e = e || {}), !(t instanceof HTMLVideoElement))) {
      const i = document.createElement('video')
      e.autoLoad !== !1 && i.setAttribute('preload', 'auto'),
        e.playsinline !== !1 &&
          (i.setAttribute('webkit-playsinline', ''), i.setAttribute('playsinline', '')),
        e.muted === !0 && (i.setAttribute('muted', ''), (i.muted = !0)),
        e.loop === !0 && i.setAttribute('loop', ''),
        e.autoPlay !== !1 && i.setAttribute('autoplay', ''),
        typeof t == 'string' && (t = [t])
      const s = t[0].src || t[0]
      gr.crossOrigin(i, s, e.crossorigin)
      for (let n = 0; n < t.length; ++n) {
        const o = document.createElement('source')
        let { src: a, mime: h } = t[n]
        if (((a = a || t[n]), a.startsWith('data:'))) h = a.slice(5, a.indexOf(';'))
        else if (!a.startsWith('blob:')) {
          const l = a.split('?').shift().toLowerCase(),
            c = l.slice(l.lastIndexOf('.') + 1)
          h = h || Rh.MIME_TYPES[c] || `video/${c}`
        }
        ;(o.src = a), h && (o.type = h), i.appendChild(o)
      }
      t = i
    }
    super(t),
      (this.noSubImage = !0),
      (this._autoUpdate = !0),
      (this._isConnectedToTicker = !1),
      (this._updateFPS = e.updateFPS || 0),
      (this._msToNextUpdate = 0),
      (this.autoPlay = e.autoPlay !== !1),
      (this._videoFrameRequestCallback = this._videoFrameRequestCallback.bind(this)),
      (this._videoFrameRequestCallbackHandle = null),
      (this._load = null),
      (this._resolve = null),
      (this._reject = null),
      (this._onCanPlay = this._onCanPlay.bind(this)),
      (this._onError = this._onError.bind(this)),
      (this._onPlayStart = this._onPlayStart.bind(this)),
      (this._onPlayStop = this._onPlayStop.bind(this)),
      (this._onSeeked = this._onSeeked.bind(this)),
      e.autoLoad !== !1 && this.load()
  }
  update(t = 0) {
    if (!this.destroyed) {
      if (this._updateFPS) {
        const e = Tt.shared.elapsedMS * this.source.playbackRate
        this._msToNextUpdate = Math.floor(this._msToNextUpdate - e)
      }
      ;(!this._updateFPS || this._msToNextUpdate <= 0) &&
        (super.update(),
        (this._msToNextUpdate = this._updateFPS ? Math.floor(1e3 / this._updateFPS) : 0))
    }
  }
  _videoFrameRequestCallback() {
    this.update(),
      this.destroyed
        ? (this._videoFrameRequestCallbackHandle = null)
        : (this._videoFrameRequestCallbackHandle = this.source.requestVideoFrameCallback(
            this._videoFrameRequestCallback
          ))
  }
  load() {
    if (this._load) return this._load
    const t = this.source
    return (
      (t.readyState === t.HAVE_ENOUGH_DATA || t.readyState === t.HAVE_FUTURE_DATA) &&
        t.width &&
        t.height &&
        (t.complete = !0),
      t.addEventListener('play', this._onPlayStart),
      t.addEventListener('pause', this._onPlayStop),
      t.addEventListener('seeked', this._onSeeked),
      this._isSourceReady()
        ? this._onCanPlay()
        : (t.addEventListener('canplay', this._onCanPlay),
          t.addEventListener('canplaythrough', this._onCanPlay),
          t.addEventListener('error', this._onError, !0)),
      (this._load = new Promise((e, i) => {
        this.valid ? e(this) : ((this._resolve = e), (this._reject = i), t.load())
      })),
      this._load
    )
  }
  _onError(t) {
    this.source.removeEventListener('error', this._onError, !0),
      this.onError.emit(t),
      this._reject && (this._reject(t), (this._reject = null), (this._resolve = null))
  }
  _isSourcePlaying() {
    const t = this.source
    return !t.paused && !t.ended
  }
  _isSourceReady() {
    return this.source.readyState > 2
  }
  _onPlayStart() {
    this.valid || this._onCanPlay(), this._configureAutoUpdate()
  }
  _onPlayStop() {
    this._configureAutoUpdate()
  }
  _onSeeked() {
    this._autoUpdate &&
      !this._isSourcePlaying() &&
      ((this._msToNextUpdate = 0), this.update(), (this._msToNextUpdate = 0))
  }
  _onCanPlay() {
    const t = this.source
    t.removeEventListener('canplay', this._onCanPlay),
      t.removeEventListener('canplaythrough', this._onCanPlay)
    const e = this.valid
    ;(this._msToNextUpdate = 0),
      this.update(),
      (this._msToNextUpdate = 0),
      !e && this._resolve && (this._resolve(this), (this._resolve = null), (this._reject = null)),
      this._isSourcePlaying() ? this._onPlayStart() : this.autoPlay && t.play()
  }
  dispose() {
    this._configureAutoUpdate()
    const t = this.source
    t &&
      (t.removeEventListener('play', this._onPlayStart),
      t.removeEventListener('pause', this._onPlayStop),
      t.removeEventListener('seeked', this._onSeeked),
      t.removeEventListener('canplay', this._onCanPlay),
      t.removeEventListener('canplaythrough', this._onCanPlay),
      t.removeEventListener('error', this._onError, !0),
      t.pause(),
      (t.src = ''),
      t.load()),
      super.dispose()
  }
  get autoUpdate() {
    return this._autoUpdate
  }
  set autoUpdate(t) {
    t !== this._autoUpdate && ((this._autoUpdate = t), this._configureAutoUpdate())
  }
  get updateFPS() {
    return this._updateFPS
  }
  set updateFPS(t) {
    t !== this._updateFPS && ((this._updateFPS = t), this._configureAutoUpdate())
  }
  _configureAutoUpdate() {
    this._autoUpdate && this._isSourcePlaying()
      ? !this._updateFPS && this.source.requestVideoFrameCallback
        ? (this._isConnectedToTicker &&
            (Tt.shared.remove(this.update, this),
            (this._isConnectedToTicker = !1),
            (this._msToNextUpdate = 0)),
          this._videoFrameRequestCallbackHandle === null &&
            (this._videoFrameRequestCallbackHandle = this.source.requestVideoFrameCallback(
              this._videoFrameRequestCallback
            )))
        : (this._videoFrameRequestCallbackHandle !== null &&
            (this.source.cancelVideoFrameCallback(this._videoFrameRequestCallbackHandle),
            (this._videoFrameRequestCallbackHandle = null)),
          this._isConnectedToTicker ||
            (Tt.shared.add(this.update, this),
            (this._isConnectedToTicker = !0),
            (this._msToNextUpdate = 0)))
      : (this._videoFrameRequestCallbackHandle !== null &&
          (this.source.cancelVideoFrameCallback(this._videoFrameRequestCallbackHandle),
          (this._videoFrameRequestCallbackHandle = null)),
        this._isConnectedToTicker &&
          (Tt.shared.remove(this.update, this),
          (this._isConnectedToTicker = !1),
          (this._msToNextUpdate = 0)))
  }
  static test(t, e) {
    return (globalThis.HTMLVideoElement && t instanceof HTMLVideoElement) || Rh.TYPES.includes(e)
  }
}
;(Ih.TYPES = ['mp4', 'm4v', 'webm', 'ogg', 'ogv', 'h264', 'avi', 'mov']),
  (Ih.MIME_TYPES = { ogv: 'video/ogg', mov: 'video/quicktime', m4v: 'video/mp4' })
let Ap = Ih
mh.push(Bi, Wf, zv, Ap, Qv, Ch, Po, Yv, $v)
class ao {
  constructor() {
    ;(this.minX = 1 / 0),
      (this.minY = 1 / 0),
      (this.maxX = -1 / 0),
      (this.maxY = -1 / 0),
      (this.rect = null),
      (this.updateID = -1)
  }
  isEmpty() {
    return this.minX > this.maxX || this.minY > this.maxY
  }
  clear() {
    ;(this.minX = 1 / 0), (this.minY = 1 / 0), (this.maxX = -1 / 0), (this.maxY = -1 / 0)
  }
  getRectangle(t) {
    return this.minX > this.maxX || this.minY > this.maxY
      ? nt.EMPTY
      : ((t = t || new nt(0, 0, 1, 1)),
        (t.x = this.minX),
        (t.y = this.minY),
        (t.width = this.maxX - this.minX),
        (t.height = this.maxY - this.minY),
        t)
  }
  addPoint(t) {
    ;(this.minX = Math.min(this.minX, t.x)),
      (this.maxX = Math.max(this.maxX, t.x)),
      (this.minY = Math.min(this.minY, t.y)),
      (this.maxY = Math.max(this.maxY, t.y))
  }
  addPointMatrix(t, e) {
    const { a: i, b: s, c: n, d: o, tx: a, ty: h } = t,
      l = i * e.x + n * e.y + a,
      c = s * e.x + o * e.y + h
    ;(this.minX = Math.min(this.minX, l)),
      (this.maxX = Math.max(this.maxX, l)),
      (this.minY = Math.min(this.minY, c)),
      (this.maxY = Math.max(this.maxY, c))
  }
  addQuad(t) {
    let e = this.minX,
      i = this.minY,
      s = this.maxX,
      n = this.maxY,
      o = t[0],
      a = t[1]
    ;(e = o < e ? o : e),
      (i = a < i ? a : i),
      (s = o > s ? o : s),
      (n = a > n ? a : n),
      (o = t[2]),
      (a = t[3]),
      (e = o < e ? o : e),
      (i = a < i ? a : i),
      (s = o > s ? o : s),
      (n = a > n ? a : n),
      (o = t[4]),
      (a = t[5]),
      (e = o < e ? o : e),
      (i = a < i ? a : i),
      (s = o > s ? o : s),
      (n = a > n ? a : n),
      (o = t[6]),
      (a = t[7]),
      (e = o < e ? o : e),
      (i = a < i ? a : i),
      (s = o > s ? o : s),
      (n = a > n ? a : n),
      (this.minX = e),
      (this.minY = i),
      (this.maxX = s),
      (this.maxY = n)
  }
  addFrame(t, e, i, s, n) {
    this.addFrameMatrix(t.worldTransform, e, i, s, n)
  }
  addFrameMatrix(t, e, i, s, n) {
    const o = t.a,
      a = t.b,
      h = t.c,
      l = t.d,
      c = t.tx,
      u = t.ty
    let d = this.minX,
      f = this.minY,
      p = this.maxX,
      m = this.maxY,
      g = o * e + h * i + c,
      A = a * e + l * i + u
    ;(d = g < d ? g : d),
      (f = A < f ? A : f),
      (p = g > p ? g : p),
      (m = A > m ? A : m),
      (g = o * s + h * i + c),
      (A = a * s + l * i + u),
      (d = g < d ? g : d),
      (f = A < f ? A : f),
      (p = g > p ? g : p),
      (m = A > m ? A : m),
      (g = o * e + h * n + c),
      (A = a * e + l * n + u),
      (d = g < d ? g : d),
      (f = A < f ? A : f),
      (p = g > p ? g : p),
      (m = A > m ? A : m),
      (g = o * s + h * n + c),
      (A = a * s + l * n + u),
      (d = g < d ? g : d),
      (f = A < f ? A : f),
      (p = g > p ? g : p),
      (m = A > m ? A : m),
      (this.minX = d),
      (this.minY = f),
      (this.maxX = p),
      (this.maxY = m)
  }
  addVertexData(t, e, i) {
    let s = this.minX,
      n = this.minY,
      o = this.maxX,
      a = this.maxY
    for (let h = e; h < i; h += 2) {
      const l = t[h],
        c = t[h + 1]
      ;(s = l < s ? l : s), (n = c < n ? c : n), (o = l > o ? l : o), (a = c > a ? c : a)
    }
    ;(this.minX = s), (this.minY = n), (this.maxX = o), (this.maxY = a)
  }
  addVertices(t, e, i, s) {
    this.addVerticesMatrix(t.worldTransform, e, i, s)
  }
  addVerticesMatrix(t, e, i, s, n = 0, o = n) {
    const a = t.a,
      h = t.b,
      l = t.c,
      c = t.d,
      u = t.tx,
      d = t.ty
    let f = this.minX,
      p = this.minY,
      m = this.maxX,
      g = this.maxY
    for (let A = i; A < s; A += 2) {
      const x = e[A],
        _ = e[A + 1],
        v = a * x + l * _ + u,
        S = c * _ + h * x + d
      ;(f = Math.min(f, v - n)),
        (m = Math.max(m, v + n)),
        (p = Math.min(p, S - o)),
        (g = Math.max(g, S + o))
    }
    ;(this.minX = f), (this.minY = p), (this.maxX = m), (this.maxY = g)
  }
  addBounds(t) {
    const e = this.minX,
      i = this.minY,
      s = this.maxX,
      n = this.maxY
    ;(this.minX = t.minX < e ? t.minX : e),
      (this.minY = t.minY < i ? t.minY : i),
      (this.maxX = t.maxX > s ? t.maxX : s),
      (this.maxY = t.maxY > n ? t.maxY : n)
  }
  addBoundsMask(t, e) {
    const i = t.minX > e.minX ? t.minX : e.minX,
      s = t.minY > e.minY ? t.minY : e.minY,
      n = t.maxX < e.maxX ? t.maxX : e.maxX,
      o = t.maxY < e.maxY ? t.maxY : e.maxY
    if (i <= n && s <= o) {
      const a = this.minX,
        h = this.minY,
        l = this.maxX,
        c = this.maxY
      ;(this.minX = i < a ? i : a),
        (this.minY = s < h ? s : h),
        (this.maxX = n > l ? n : l),
        (this.maxY = o > c ? o : c)
    }
  }
  addBoundsMatrix(t, e) {
    this.addFrameMatrix(e, t.minX, t.minY, t.maxX, t.maxY)
  }
  addBoundsArea(t, e) {
    const i = t.minX > e.x ? t.minX : e.x,
      s = t.minY > e.y ? t.minY : e.y,
      n = t.maxX < e.x + e.width ? t.maxX : e.x + e.width,
      o = t.maxY < e.y + e.height ? t.maxY : e.y + e.height
    if (i <= n && s <= o) {
      const a = this.minX,
        h = this.minY,
        l = this.maxX,
        c = this.maxY
      ;(this.minX = i < a ? i : a),
        (this.minY = s < h ? s : h),
        (this.maxX = n > l ? n : l),
        (this.maxY = o > c ? o : c)
    }
  }
  pad(t = 0, e = t) {
    this.isEmpty() || ((this.minX -= t), (this.maxX += t), (this.minY -= e), (this.maxY += e))
  }
  addFramePad(t, e, i, s, n, o) {
    ;(t -= n),
      (e -= o),
      (i += n),
      (s += o),
      (this.minX = this.minX < t ? this.minX : t),
      (this.maxX = this.maxX > i ? this.maxX : i),
      (this.minY = this.minY < e ? this.minY : e),
      (this.maxY = this.maxY > s ? this.maxY : s)
  }
}
class Dt extends Xs {
  constructor() {
    super(),
      (this.tempDisplayObjectParent = null),
      (this.transform = new Do()),
      (this.alpha = 1),
      (this.visible = !0),
      (this.renderable = !0),
      (this.cullable = !1),
      (this.cullArea = null),
      (this.parent = null),
      (this.worldAlpha = 1),
      (this._lastSortedIndex = 0),
      (this._zIndex = 0),
      (this.filterArea = null),
      (this.filters = null),
      (this._enabledFilters = null),
      (this._bounds = new ao()),
      (this._localBounds = null),
      (this._boundsID = 0),
      (this._boundsRect = null),
      (this._localBoundsRect = null),
      (this._mask = null),
      (this._maskRefCount = 0),
      (this._destroyed = !1),
      (this.isSprite = !1),
      (this.isMask = !1)
  }
  static mixin(t) {
    const e = Object.keys(t)
    for (let i = 0; i < e.length; ++i) {
      const s = e[i]
      Object.defineProperty(Dt.prototype, s, Object.getOwnPropertyDescriptor(t, s))
    }
  }
  get destroyed() {
    return this._destroyed
  }
  _recursivePostUpdateTransform() {
    this.parent
      ? (this.parent._recursivePostUpdateTransform(),
        this.transform.updateTransform(this.parent.transform))
      : this.transform.updateTransform(this._tempDisplayObjectParent.transform)
  }
  updateTransform() {
    this._boundsID++,
      this.transform.updateTransform(this.parent.transform),
      (this.worldAlpha = this.alpha * this.parent.worldAlpha)
  }
  getBounds(t, e) {
    return (
      t ||
        (this.parent
          ? (this._recursivePostUpdateTransform(), this.updateTransform())
          : ((this.parent = this._tempDisplayObjectParent),
            this.updateTransform(),
            (this.parent = null))),
      this._bounds.updateID !== this._boundsID &&
        (this.calculateBounds(), (this._bounds.updateID = this._boundsID)),
      e || (this._boundsRect || (this._boundsRect = new nt()), (e = this._boundsRect)),
      this._bounds.getRectangle(e)
    )
  }
  getLocalBounds(t) {
    t || (this._localBoundsRect || (this._localBoundsRect = new nt()), (t = this._localBoundsRect)),
      this._localBounds || (this._localBounds = new ao())
    const e = this.transform,
      i = this.parent
    ;(this.parent = null),
      (this._tempDisplayObjectParent.worldAlpha = (i == null ? void 0 : i.worldAlpha) ?? 1),
      (this.transform = this._tempDisplayObjectParent.transform)
    const s = this._bounds,
      n = this._boundsID
    this._bounds = this._localBounds
    const o = this.getBounds(!1, t)
    return (
      (this.parent = i),
      (this.transform = e),
      (this._bounds = s),
      (this._bounds.updateID += this._boundsID - n),
      o
    )
  }
  toGlobal(t, e, i = !1) {
    return (
      i ||
        (this._recursivePostUpdateTransform(),
        this.parent
          ? this.displayObjectUpdateTransform()
          : ((this.parent = this._tempDisplayObjectParent),
            this.displayObjectUpdateTransform(),
            (this.parent = null))),
      this.worldTransform.apply(t, e)
    )
  }
  toLocal(t, e, i, s) {
    return (
      e && (t = e.toGlobal(t, i, s)),
      s ||
        (this._recursivePostUpdateTransform(),
        this.parent
          ? this.displayObjectUpdateTransform()
          : ((this.parent = this._tempDisplayObjectParent),
            this.displayObjectUpdateTransform(),
            (this.parent = null))),
      this.worldTransform.applyInverse(t, i)
    )
  }
  setParent(t) {
    if (!t || !t.addChild) throw new Error('setParent: Argument must be a Container')
    return t.addChild(this), t
  }
  removeFromParent() {
    var t
    ;(t = this.parent) == null || t.removeChild(this)
  }
  setTransform(t = 0, e = 0, i = 1, s = 1, n = 0, o = 0, a = 0, h = 0, l = 0) {
    return (
      (this.position.x = t),
      (this.position.y = e),
      (this.scale.x = i || 1),
      (this.scale.y = s || 1),
      (this.rotation = n),
      (this.skew.x = o),
      (this.skew.y = a),
      (this.pivot.x = h),
      (this.pivot.y = l),
      this
    )
  }
  destroy(t) {
    this.removeFromParent(),
      (this._destroyed = !0),
      (this.transform = null),
      (this.parent = null),
      (this._bounds = null),
      (this.mask = null),
      (this.cullArea = null),
      (this.filters = null),
      (this.filterArea = null),
      (this.hitArea = null),
      (this.eventMode = 'auto'),
      (this.interactiveChildren = !1),
      this.emit('destroyed'),
      this.removeAllListeners()
  }
  get _tempDisplayObjectParent() {
    return (
      this.tempDisplayObjectParent === null && (this.tempDisplayObjectParent = new Kv()),
      this.tempDisplayObjectParent
    )
  }
  enableTempParent() {
    const t = this.parent
    return (this.parent = this._tempDisplayObjectParent), t
  }
  disableTempParent(t) {
    this.parent = t
  }
  get x() {
    return this.position.x
  }
  set x(t) {
    this.transform.position.x = t
  }
  get y() {
    return this.position.y
  }
  set y(t) {
    this.transform.position.y = t
  }
  get worldTransform() {
    return this.transform.worldTransform
  }
  get localTransform() {
    return this.transform.localTransform
  }
  get position() {
    return this.transform.position
  }
  set position(t) {
    this.transform.position.copyFrom(t)
  }
  get scale() {
    return this.transform.scale
  }
  set scale(t) {
    this.transform.scale.copyFrom(t)
  }
  get pivot() {
    return this.transform.pivot
  }
  set pivot(t) {
    this.transform.pivot.copyFrom(t)
  }
  get skew() {
    return this.transform.skew
  }
  set skew(t) {
    this.transform.skew.copyFrom(t)
  }
  get rotation() {
    return this.transform.rotation
  }
  set rotation(t) {
    this.transform.rotation = t
  }
  get angle() {
    return this.transform.rotation * V0
  }
  set angle(t) {
    this.transform.rotation = t * X0
  }
  get zIndex() {
    return this._zIndex
  }
  set zIndex(t) {
    this._zIndex !== t && ((this._zIndex = t), this.parent && (this.parent.sortDirty = !0))
  }
  get worldVisible() {
    let t = this
    do {
      if (!t.visible) return !1
      t = t.parent
    } while (t)
    return !0
  }
  get mask() {
    return this._mask
  }
  set mask(t) {
    if (this._mask !== t) {
      if (this._mask) {
        const e = this._mask.isMaskData ? this._mask.maskObject : this._mask
        e && (e._maskRefCount--, e._maskRefCount === 0 && ((e.renderable = !0), (e.isMask = !1)))
      }
      if (((this._mask = t), this._mask)) {
        const e = this._mask.isMaskData ? this._mask.maskObject : this._mask
        e && (e._maskRefCount === 0 && ((e.renderable = !1), (e.isMask = !0)), e._maskRefCount++)
      }
    }
  }
}
class Kv extends Dt {
  constructor() {
    super(...arguments), (this.sortDirty = null)
  }
}
Dt.prototype.displayObjectUpdateTransform = Dt.prototype.updateTransform
const qv = new Ct()
function Zv(r, t) {
  return r.zIndex === t.zIndex ? r._lastSortedIndex - t._lastSortedIndex : r.zIndex - t.zIndex
}
const vp = class Ph extends Dt {
  constructor() {
    super(),
      (this.children = []),
      (this.sortableChildren = Ph.defaultSortableChildren),
      (this.sortDirty = !1)
  }
  onChildrenChange(t) {}
  addChild(...t) {
    if (t.length > 1) for (let e = 0; e < t.length; e++) this.addChild(t[e])
    else {
      const e = t[0]
      e.parent && e.parent.removeChild(e),
        (e.parent = this),
        (this.sortDirty = !0),
        (e.transform._parentID = -1),
        this.children.push(e),
        this._boundsID++,
        this.onChildrenChange(this.children.length - 1),
        this.emit('childAdded', e, this, this.children.length - 1),
        e.emit('added', this)
    }
    return t[0]
  }
  addChildAt(t, e) {
    if (e < 0 || e > this.children.length)
      throw new Error(
        `${t}addChildAt: The index ${e} supplied is out of bounds ${this.children.length}`
      )
    return (
      t.parent && t.parent.removeChild(t),
      (t.parent = this),
      (this.sortDirty = !0),
      (t.transform._parentID = -1),
      this.children.splice(e, 0, t),
      this._boundsID++,
      this.onChildrenChange(e),
      t.emit('added', this),
      this.emit('childAdded', t, this, e),
      t
    )
  }
  swapChildren(t, e) {
    if (t === e) return
    const i = this.getChildIndex(t),
      s = this.getChildIndex(e)
    ;(this.children[i] = e), (this.children[s] = t), this.onChildrenChange(i < s ? i : s)
  }
  getChildIndex(t) {
    const e = this.children.indexOf(t)
    if (e === -1) throw new Error('The supplied DisplayObject must be a child of the caller')
    return e
  }
  setChildIndex(t, e) {
    if (e < 0 || e >= this.children.length)
      throw new Error(`The index ${e} supplied is out of bounds ${this.children.length}`)
    const i = this.getChildIndex(t)
    Ui(this.children, i, 1), this.children.splice(e, 0, t), this.onChildrenChange(e)
  }
  getChildAt(t) {
    if (t < 0 || t >= this.children.length)
      throw new Error(`getChildAt: Index (${t}) does not exist.`)
    return this.children[t]
  }
  removeChild(...t) {
    if (t.length > 1) for (let e = 0; e < t.length; e++) this.removeChild(t[e])
    else {
      const e = t[0],
        i = this.children.indexOf(e)
      if (i === -1) return null
      ;(e.parent = null),
        (e.transform._parentID = -1),
        Ui(this.children, i, 1),
        this._boundsID++,
        this.onChildrenChange(i),
        e.emit('removed', this),
        this.emit('childRemoved', e, this, i)
    }
    return t[0]
  }
  removeChildAt(t) {
    const e = this.getChildAt(t)
    return (
      (e.parent = null),
      (e.transform._parentID = -1),
      Ui(this.children, t, 1),
      this._boundsID++,
      this.onChildrenChange(t),
      e.emit('removed', this),
      this.emit('childRemoved', e, this, t),
      e
    )
  }
  removeChildren(t = 0, e = this.children.length) {
    const i = t,
      s = e,
      n = s - i
    let o
    if (n > 0 && n <= s) {
      o = this.children.splice(i, n)
      for (let a = 0; a < o.length; ++a)
        (o[a].parent = null), o[a].transform && (o[a].transform._parentID = -1)
      this._boundsID++, this.onChildrenChange(t)
      for (let a = 0; a < o.length; ++a)
        o[a].emit('removed', this), this.emit('childRemoved', o[a], this, a)
      return o
    } else if (n === 0 && this.children.length === 0) return []
    throw new RangeError('removeChildren: numeric values are outside the acceptable range.')
  }
  sortChildren() {
    let t = !1
    for (let e = 0, i = this.children.length; e < i; ++e) {
      const s = this.children[e]
      ;(s._lastSortedIndex = e), !t && s.zIndex !== 0 && (t = !0)
    }
    t && this.children.length > 1 && this.children.sort(Zv), (this.sortDirty = !1)
  }
  updateTransform() {
    this.sortableChildren && this.sortDirty && this.sortChildren(),
      this._boundsID++,
      this.transform.updateTransform(this.parent.transform),
      (this.worldAlpha = this.alpha * this.parent.worldAlpha)
    for (let t = 0, e = this.children.length; t < e; ++t) {
      const i = this.children[t]
      i.visible && i.updateTransform()
    }
  }
  calculateBounds() {
    this._bounds.clear(), this._calculateBounds()
    for (let t = 0; t < this.children.length; t++) {
      const e = this.children[t]
      if (!(!e.visible || !e.renderable))
        if ((e.calculateBounds(), e._mask)) {
          const i = e._mask.isMaskData ? e._mask.maskObject : e._mask
          i
            ? (i.calculateBounds(), this._bounds.addBoundsMask(e._bounds, i._bounds))
            : this._bounds.addBounds(e._bounds)
        } else
          e.filterArea
            ? this._bounds.addBoundsArea(e._bounds, e.filterArea)
            : this._bounds.addBounds(e._bounds)
    }
    this._bounds.updateID = this._boundsID
  }
  getLocalBounds(t, e = !1) {
    const i = super.getLocalBounds(t)
    if (!e)
      for (let s = 0, n = this.children.length; s < n; ++s) {
        const o = this.children[s]
        o.visible && o.updateTransform()
      }
    return i
  }
  _calculateBounds() {}
  _renderWithCulling(t) {
    const e = t.renderTexture.sourceFrame
    if (!(e.width > 0 && e.height > 0)) return
    let i, s
    this.cullArea
      ? ((i = this.cullArea), (s = this.worldTransform))
      : this._render !== Ph.prototype._render && (i = this.getBounds(!0))
    const n = t.projection.transform
    if ((n && (s ? ((s = qv.copyFrom(s)), s.prepend(n)) : (s = n)), i && e.intersects(i, s)))
      this._render(t)
    else if (this.cullArea) return
    for (let o = 0, a = this.children.length; o < a; ++o) {
      const h = this.children[o],
        l = h.cullable
      ;(h.cullable = l || !this.cullArea), h.render(t), (h.cullable = l)
    }
  }
  render(t) {
    var e
    if (!(!this.visible || this.worldAlpha <= 0 || !this.renderable))
      if (this._mask || ((e = this.filters) != null && e.length)) this.renderAdvanced(t)
      else if (this.cullable) this._renderWithCulling(t)
      else {
        this._render(t)
        for (let i = 0, s = this.children.length; i < s; ++i) this.children[i].render(t)
      }
  }
  renderAdvanced(t) {
    var n, o, a
    const e = this.filters,
      i = this._mask
    if (e) {
      this._enabledFilters || (this._enabledFilters = []), (this._enabledFilters.length = 0)
      for (let h = 0; h < e.length; h++) e[h].enabled && this._enabledFilters.push(e[h])
    }
    const s =
      (e && ((n = this._enabledFilters) == null ? void 0 : n.length)) ||
      (i && (!i.isMaskData || (i.enabled && (i.autoDetect || i.type !== Wt.NONE))))
    if (
      (s && t.batch.flush(),
      e &&
        (o = this._enabledFilters) != null &&
        o.length &&
        t.filter.push(this, this._enabledFilters),
      i && t.mask.push(this, this._mask),
      this.cullable)
    )
      this._renderWithCulling(t)
    else {
      this._render(t)
      for (let h = 0, l = this.children.length; h < l; ++h) this.children[h].render(t)
    }
    s && t.batch.flush(),
      i && t.mask.pop(this),
      e && (a = this._enabledFilters) != null && a.length && t.filter.pop()
  }
  _render(t) {}
  destroy(t) {
    super.destroy(), (this.sortDirty = !1)
    const e = typeof t == 'boolean' ? t : t == null ? void 0 : t.children,
      i = this.removeChildren(0, this.children.length)
    if (e) for (let s = 0; s < i.length; ++s) i[s].destroy(t)
  }
  get width() {
    return this.scale.x * this.getLocalBounds().width
  }
  set width(t) {
    const e = this.getLocalBounds().width
    e !== 0 ? (this.scale.x = t / e) : (this.scale.x = 1), (this._width = t)
  }
  get height() {
    return this.scale.y * this.getLocalBounds().height
  }
  set height(t) {
    const e = this.getLocalBounds().height
    e !== 0 ? (this.scale.y = t / e) : (this.scale.y = 1), (this._height = t)
  }
}
vp.defaultSortableChildren = !1
let he = vp
he.prototype.containerUpdateTransform = he.prototype.updateTransform
Object.defineProperties(Y, {
  SORTABLE_CHILDREN: {
    get() {
      return he.defaultSortableChildren
    },
    set(r) {
      ut(
        '7.1.0',
        'settings.SORTABLE_CHILDREN is deprecated, use Container.defaultSortableChildren'
      ),
        (he.defaultSortableChildren = r)
    }
  }
})
const ss = new pt(),
  Jv = new Uint16Array([0, 1, 2, 0, 2, 3])
class or extends he {
  constructor(t) {
    super(),
      (this._anchor = new cr(
        this._onAnchorUpdate,
        this,
        t ? t.defaultAnchor.x : 0,
        t ? t.defaultAnchor.y : 0
      )),
      (this._texture = null),
      (this._width = 0),
      (this._height = 0),
      (this._tintColor = new St(16777215)),
      (this._tintRGB = null),
      (this.tint = 16777215),
      (this.blendMode = st.NORMAL),
      (this._cachedTint = 16777215),
      (this.uvs = null),
      (this.texture = t || X.EMPTY),
      (this.vertexData = new Float32Array(8)),
      (this.vertexTrimmedData = null),
      (this._transformID = -1),
      (this._textureID = -1),
      (this._transformTrimmedID = -1),
      (this._textureTrimmedID = -1),
      (this.indices = Jv),
      (this.pluginName = 'batch'),
      (this.isSprite = !0),
      (this._roundPixels = Y.ROUND_PIXELS)
  }
  _onTextureUpdate() {
    ;(this._textureID = -1),
      (this._textureTrimmedID = -1),
      (this._cachedTint = 16777215),
      this._width && (this.scale.x = (Rr(this.scale.x) * this._width) / this._texture.orig.width),
      this._height && (this.scale.y = (Rr(this.scale.y) * this._height) / this._texture.orig.height)
  }
  _onAnchorUpdate() {
    ;(this._transformID = -1), (this._transformTrimmedID = -1)
  }
  calculateVertices() {
    const t = this._texture
    if (this._transformID === this.transform._worldID && this._textureID === t._updateID) return
    this._textureID !== t._updateID && (this.uvs = this._texture._uvs.uvsFloat32),
      (this._transformID = this.transform._worldID),
      (this._textureID = t._updateID)
    const e = this.transform.worldTransform,
      i = e.a,
      s = e.b,
      n = e.c,
      o = e.d,
      a = e.tx,
      h = e.ty,
      l = this.vertexData,
      c = t.trim,
      u = t.orig,
      d = this._anchor
    let f = 0,
      p = 0,
      m = 0,
      g = 0
    if (
      (c
        ? ((p = c.x - d._x * u.width),
          (f = p + c.width),
          (g = c.y - d._y * u.height),
          (m = g + c.height))
        : ((p = -d._x * u.width), (f = p + u.width), (g = -d._y * u.height), (m = g + u.height)),
      (l[0] = i * p + n * g + a),
      (l[1] = o * g + s * p + h),
      (l[2] = i * f + n * g + a),
      (l[3] = o * g + s * f + h),
      (l[4] = i * f + n * m + a),
      (l[5] = o * m + s * f + h),
      (l[6] = i * p + n * m + a),
      (l[7] = o * m + s * p + h),
      this._roundPixels)
    ) {
      const A = Y.RESOLUTION
      for (let x = 0; x < l.length; ++x) l[x] = Math.round(l[x] * A) / A
    }
  }
  calculateTrimmedVertices() {
    if (!this.vertexTrimmedData) this.vertexTrimmedData = new Float32Array(8)
    else if (
      this._transformTrimmedID === this.transform._worldID &&
      this._textureTrimmedID === this._texture._updateID
    )
      return
    ;(this._transformTrimmedID = this.transform._worldID),
      (this._textureTrimmedID = this._texture._updateID)
    const t = this._texture,
      e = this.vertexTrimmedData,
      i = t.orig,
      s = this._anchor,
      n = this.transform.worldTransform,
      o = n.a,
      a = n.b,
      h = n.c,
      l = n.d,
      c = n.tx,
      u = n.ty,
      d = -s._x * i.width,
      f = d + i.width,
      p = -s._y * i.height,
      m = p + i.height
    if (
      ((e[0] = o * d + h * p + c),
      (e[1] = l * p + a * d + u),
      (e[2] = o * f + h * p + c),
      (e[3] = l * p + a * f + u),
      (e[4] = o * f + h * m + c),
      (e[5] = l * m + a * f + u),
      (e[6] = o * d + h * m + c),
      (e[7] = l * m + a * d + u),
      this._roundPixels)
    ) {
      const g = Y.RESOLUTION
      for (let A = 0; A < e.length; ++A) e[A] = Math.round(e[A] * g) / g
    }
  }
  _render(t) {
    this.calculateVertices(),
      t.batch.setObjectRenderer(t.plugins[this.pluginName]),
      t.plugins[this.pluginName].render(this)
  }
  _calculateBounds() {
    const t = this._texture.trim,
      e = this._texture.orig
    !t || (t.width === e.width && t.height === e.height)
      ? (this.calculateVertices(), this._bounds.addQuad(this.vertexData))
      : (this.calculateTrimmedVertices(), this._bounds.addQuad(this.vertexTrimmedData))
  }
  getLocalBounds(t) {
    return this.children.length === 0
      ? (this._localBounds || (this._localBounds = new ao()),
        (this._localBounds.minX = this._texture.orig.width * -this._anchor._x),
        (this._localBounds.minY = this._texture.orig.height * -this._anchor._y),
        (this._localBounds.maxX = this._texture.orig.width * (1 - this._anchor._x)),
        (this._localBounds.maxY = this._texture.orig.height * (1 - this._anchor._y)),
        t ||
          (this._localBoundsRect || (this._localBoundsRect = new nt()),
          (t = this._localBoundsRect)),
        this._localBounds.getRectangle(t))
      : super.getLocalBounds.call(this, t)
  }
  containsPoint(t) {
    this.worldTransform.applyInverse(t, ss)
    const e = this._texture.orig.width,
      i = this._texture.orig.height,
      s = -e * this.anchor.x
    let n = 0
    return ss.x >= s && ss.x < s + e && ((n = -i * this.anchor.y), ss.y >= n && ss.y < n + i)
  }
  destroy(t) {
    if (
      (super.destroy(t),
      this._texture.off('update', this._onTextureUpdate, this),
      (this._anchor = null),
      typeof t == 'boolean' ? t : t == null ? void 0 : t.texture)
    ) {
      const e = typeof t == 'boolean' ? t : t == null ? void 0 : t.baseTexture
      this._texture.destroy(!!e)
    }
    this._texture = null
  }
  static from(t, e) {
    const i = t instanceof X ? t : X.from(t, e)
    return new or(i)
  }
  set roundPixels(t) {
    this._roundPixels !== t && ((this._transformID = -1), (this._transformTrimmedID = -1)),
      (this._roundPixels = t)
  }
  get roundPixels() {
    return this._roundPixels
  }
  get width() {
    return Math.abs(this.scale.x) * this._texture.orig.width
  }
  set width(t) {
    const e = Rr(this.scale.x) || 1
    ;(this.scale.x = (e * t) / this._texture.orig.width), (this._width = t)
  }
  get height() {
    return Math.abs(this.scale.y) * this._texture.orig.height
  }
  set height(t) {
    const e = Rr(this.scale.y) || 1
    ;(this.scale.y = (e * t) / this._texture.orig.height), (this._height = t)
  }
  get anchor() {
    return this._anchor
  }
  set anchor(t) {
    this._anchor.copyFrom(t)
  }
  get tint() {
    return this._tintColor.value
  }
  set tint(t) {
    this._tintColor.setValue(t), (this._tintRGB = this._tintColor.toLittleEndianNumber())
  }
  get tintValue() {
    return this._tintColor.toNumber()
  }
  get texture() {
    return this._texture
  }
  set texture(t) {
    this._texture !== t &&
      (this._texture && this._texture.off('update', this._onTextureUpdate, this),
      (this._texture = t || X.EMPTY),
      (this._cachedTint = 16777215),
      (this._textureID = -1),
      (this._textureTrimmedID = -1),
      t &&
        (t.baseTexture.valid
          ? this._onTextureUpdate()
          : t.once('update', this._onTextureUpdate, this)))
  }
}
const xp = new Ct()
Dt.prototype._cacheAsBitmap = !1
Dt.prototype._cacheData = null
Dt.prototype._cacheAsBitmapResolution = null
Dt.prototype._cacheAsBitmapMultisample = null
class tx {
  constructor() {
    ;(this.textureCacheId = null),
      (this.originalRender = null),
      (this.originalRenderCanvas = null),
      (this.originalCalculateBounds = null),
      (this.originalGetLocalBounds = null),
      (this.originalUpdateTransform = null),
      (this.originalDestroy = null),
      (this.originalMask = null),
      (this.originalFilterArea = null),
      (this.originalContainsPoint = null),
      (this.sprite = null)
  }
}
Object.defineProperties(Dt.prototype, {
  cacheAsBitmapResolution: {
    get() {
      return this._cacheAsBitmapResolution
    },
    set(r) {
      r !== this._cacheAsBitmapResolution &&
        ((this._cacheAsBitmapResolution = r),
        this.cacheAsBitmap && ((this.cacheAsBitmap = !1), (this.cacheAsBitmap = !0)))
    }
  },
  cacheAsBitmapMultisample: {
    get() {
      return this._cacheAsBitmapMultisample
    },
    set(r) {
      r !== this._cacheAsBitmapMultisample &&
        ((this._cacheAsBitmapMultisample = r),
        this.cacheAsBitmap && ((this.cacheAsBitmap = !1), (this.cacheAsBitmap = !0)))
    }
  },
  cacheAsBitmap: {
    get() {
      return this._cacheAsBitmap
    },
    set(r) {
      if (this._cacheAsBitmap === r) return
      this._cacheAsBitmap = r
      let t
      r
        ? (this._cacheData || (this._cacheData = new tx()),
          (t = this._cacheData),
          (t.originalRender = this.render),
          (t.originalRenderCanvas = this.renderCanvas),
          (t.originalUpdateTransform = this.updateTransform),
          (t.originalCalculateBounds = this.calculateBounds),
          (t.originalGetLocalBounds = this.getLocalBounds),
          (t.originalDestroy = this.destroy),
          (t.originalContainsPoint = this.containsPoint),
          (t.originalMask = this._mask),
          (t.originalFilterArea = this.filterArea),
          (this.render = this._renderCached),
          (this.renderCanvas = this._renderCachedCanvas),
          (this.destroy = this._cacheAsBitmapDestroy))
        : ((t = this._cacheData),
          t.sprite && this._destroyCachedDisplayObject(),
          (this.render = t.originalRender),
          (this.renderCanvas = t.originalRenderCanvas),
          (this.calculateBounds = t.originalCalculateBounds),
          (this.getLocalBounds = t.originalGetLocalBounds),
          (this.destroy = t.originalDestroy),
          (this.updateTransform = t.originalUpdateTransform),
          (this.containsPoint = t.originalContainsPoint),
          (this._mask = t.originalMask),
          (this.filterArea = t.originalFilterArea))
    }
  }
})
Dt.prototype._renderCached = function (r) {
  !this.visible ||
    this.worldAlpha <= 0 ||
    !this.renderable ||
    (this._initCachedDisplayObject(r),
    (this._cacheData.sprite.transform._worldID = this.transform._worldID),
    (this._cacheData.sprite.worldAlpha = this.worldAlpha),
    this._cacheData.sprite._render(r))
}
Dt.prototype._initCachedDisplayObject = function (r) {
  var d, f
  if ((d = this._cacheData) != null && d.sprite) return
  const t = this.alpha
  ;(this.alpha = 1), r.batch.flush()
  const e = this.getLocalBounds(new nt(), !0)
  if ((f = this.filters) != null && f.length) {
    const p = this.filters[0].padding
    e.pad(p)
  }
  const i = this.cacheAsBitmapResolution || r.resolution
  e.ceil(i), (e.width = Math.max(e.width, 1 / i)), (e.height = Math.max(e.height, 1 / i))
  const s = r.renderTexture.current,
    n = r.renderTexture.sourceFrame.clone(),
    o = r.renderTexture.destinationFrame.clone(),
    a = r.projection.transform,
    h = mi.create({
      width: e.width,
      height: e.height,
      resolution: i,
      multisample: this.cacheAsBitmapMultisample ?? r.multisample
    }),
    l = `cacheAsBitmap_${di()}`
  ;(this._cacheData.textureCacheId = l), ht.addToCache(h.baseTexture, l), X.addToCache(h, l)
  const c = this.transform.localTransform.copyTo(xp).invert().translate(-e.x, -e.y)
  ;(this.render = this._cacheData.originalRender),
    r.render(this, { renderTexture: h, clear: !0, transform: c, skipUpdateTransform: !1 }),
    r.framebuffer.blit(),
    (r.projection.transform = a),
    r.renderTexture.bind(s, n, o),
    (this.render = this._renderCached),
    (this.updateTransform = this.displayObjectUpdateTransform),
    (this.calculateBounds = this._calculateCachedBounds),
    (this.getLocalBounds = this._getCachedLocalBounds),
    (this._mask = null),
    (this.filterArea = null),
    (this.alpha = t)
  const u = new or(h)
  ;(u.transform.worldTransform = this.transform.worldTransform),
    (u.anchor.x = -(e.x / e.width)),
    (u.anchor.y = -(e.y / e.height)),
    (u.alpha = t),
    (u._bounds = this._bounds),
    (this._cacheData.sprite = u),
    (this.transform._parentID = -1),
    this.parent
      ? this.updateTransform()
      : (this.enableTempParent(), this.updateTransform(), this.disableTempParent(null)),
    (this.containsPoint = u.containsPoint.bind(u))
}
Dt.prototype._renderCachedCanvas = function (r) {
  !this.visible ||
    this.worldAlpha <= 0 ||
    !this.renderable ||
    (this._initCachedDisplayObjectCanvas(r),
    (this._cacheData.sprite.worldAlpha = this.worldAlpha),
    this._cacheData.sprite._renderCanvas(r))
}
Dt.prototype._initCachedDisplayObjectCanvas = function (r) {
  var c
  if ((c = this._cacheData) != null && c.sprite) return
  const t = this.getLocalBounds(new nt(), !0),
    e = this.alpha
  this.alpha = 1
  const i = r.canvasContext.activeContext,
    s = r._projTransform,
    n = this.cacheAsBitmapResolution || r.resolution
  t.ceil(n), (t.width = Math.max(t.width, 1 / n)), (t.height = Math.max(t.height, 1 / n))
  const o = mi.create({ width: t.width, height: t.height, resolution: n }),
    a = `cacheAsBitmap_${di()}`
  ;(this._cacheData.textureCacheId = a), ht.addToCache(o.baseTexture, a), X.addToCache(o, a)
  const h = xp
  this.transform.localTransform.copyTo(h),
    h.invert(),
    (h.tx -= t.x),
    (h.ty -= t.y),
    (this.renderCanvas = this._cacheData.originalRenderCanvas),
    r.render(this, { renderTexture: o, clear: !0, transform: h, skipUpdateTransform: !1 }),
    (r.canvasContext.activeContext = i),
    (r._projTransform = s),
    (this.renderCanvas = this._renderCachedCanvas),
    (this.updateTransform = this.displayObjectUpdateTransform),
    (this.calculateBounds = this._calculateCachedBounds),
    (this.getLocalBounds = this._getCachedLocalBounds),
    (this._mask = null),
    (this.filterArea = null),
    (this.alpha = e)
  const l = new or(o)
  ;(l.transform.worldTransform = this.transform.worldTransform),
    (l.anchor.x = -(t.x / t.width)),
    (l.anchor.y = -(t.y / t.height)),
    (l.alpha = e),
    (l._bounds = this._bounds),
    (this._cacheData.sprite = l),
    (this.transform._parentID = -1),
    this.parent
      ? this.updateTransform()
      : ((this.parent = r._tempDisplayObjectParent), this.updateTransform(), (this.parent = null)),
    (this.containsPoint = l.containsPoint.bind(l))
}
Dt.prototype._calculateCachedBounds = function () {
  this._bounds.clear(),
    (this._cacheData.sprite.transform._worldID = this.transform._worldID),
    this._cacheData.sprite._calculateBounds(),
    (this._bounds.updateID = this._boundsID)
}
Dt.prototype._getCachedLocalBounds = function () {
  return this._cacheData.sprite.getLocalBounds(null)
}
Dt.prototype._destroyCachedDisplayObject = function () {
  this._cacheData.sprite._texture.destroy(!0),
    (this._cacheData.sprite = null),
    ht.removeFromCache(this._cacheData.textureCacheId),
    X.removeFromCache(this._cacheData.textureCacheId),
    (this._cacheData.textureCacheId = null)
}
Dt.prototype._cacheAsBitmapDestroy = function (r) {
  ;(this.cacheAsBitmap = !1), this.destroy(r)
}
Dt.prototype.name = null
he.prototype.getChildByName = function (r, t) {
  for (let e = 0, i = this.children.length; e < i; e++)
    if (this.children[e].name === r) return this.children[e]
  if (t)
    for (let e = 0, i = this.children.length; e < i; e++) {
      const s = this.children[e]
      if (!s.getChildByName) continue
      const n = s.getChildByName(r, !0)
      if (n) return n
    }
  return null
}
Dt.prototype.getGlobalPosition = function (r = new pt(), t = !1) {
  return (
    this.parent
      ? this.parent.toGlobal(this.position, r, t)
      : ((r.x = this.position.x), (r.y = this.position.y)),
    r
  )
}
var ex = `varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform float uAlpha;

void main(void)
{
   gl_FragColor = texture2D(uSampler, vTextureCoord) * uAlpha;
}
`
class bp extends Jt {
  constructor(t = 1) {
    super(jv, ex, { uAlpha: 1 }), (this.alpha = t)
  }
  get alpha() {
    return this.uniforms.uAlpha
  }
  set alpha(t) {
    this.uniforms.uAlpha = t
  }
}
const rx = {
    5: [0.153388, 0.221461, 0.250301],
    7: [0.071303, 0.131514, 0.189879, 0.214607],
    9: [0.028532, 0.067234, 0.124009, 0.179044, 0.20236],
    11: [0.0093, 0.028002, 0.065984, 0.121703, 0.175713, 0.198596],
    13: [0.002406, 0.009255, 0.027867, 0.065666, 0.121117, 0.174868, 0.197641],
    15: [489e-6, 0.002403, 0.009246, 0.02784, 0.065602, 0.120999, 0.174697, 0.197448]
  },
  ix = [
    'varying vec2 vBlurTexCoords[%size%];',
    'uniform sampler2D uSampler;',
    'void main(void)',
    '{',
    '    gl_FragColor = vec4(0.0);',
    '    %blur%',
    '}'
  ].join(`
`)
function sx(r) {
  const t = rx[r],
    e = t.length
  let i = ix,
    s = ''
  const n = 'gl_FragColor += texture2D(uSampler, vBlurTexCoords[%index%]) * %value%;'
  let o
  for (let a = 0; a < r; a++) {
    let h = n.replace('%index%', a.toString())
    ;(o = a),
      a >= e && (o = r - a - 1),
      (h = h.replace('%value%', t[o].toString())),
      (s += h),
      (s += `
`)
  }
  return (i = i.replace('%blur%', s)), (i = i.replace('%size%', r.toString())), i
}
const nx = `
    attribute vec2 aVertexPosition;

    uniform mat3 projectionMatrix;

    uniform float strength;

    varying vec2 vBlurTexCoords[%size%];

    uniform vec4 inputSize;
    uniform vec4 outputFrame;

    vec4 filterVertexPosition( void )
    {
        vec2 position = aVertexPosition * max(outputFrame.zw, vec2(0.)) + outputFrame.xy;

        return vec4((projectionMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);
    }

    vec2 filterTextureCoord( void )
    {
        return aVertexPosition * (outputFrame.zw * inputSize.zw);
    }

    void main(void)
    {
        gl_Position = filterVertexPosition();

        vec2 textureCoord = filterTextureCoord();
        %blur%
    }`
function ox(r, t) {
  const e = Math.ceil(r / 2)
  let i = nx,
    s = '',
    n
  t
    ? (n = 'vBlurTexCoords[%index%] =  textureCoord + vec2(%sampleIndex% * strength, 0.0);')
    : (n = 'vBlurTexCoords[%index%] =  textureCoord + vec2(0.0, %sampleIndex% * strength);')
  for (let o = 0; o < r; o++) {
    let a = n.replace('%index%', o.toString())
    ;(a = a.replace('%sampleIndex%', `${o - (e - 1)}.0`)),
      (s += a),
      (s += `
`)
  }
  return (i = i.replace('%blur%', s)), (i = i.replace('%size%', r.toString())), i
}
class Mh extends Jt {
  constructor(t, e = 8, i = 4, s = Jt.defaultResolution, n = 5) {
    const o = ox(n, t),
      a = sx(n)
    super(o, a),
      (this.horizontal = t),
      (this.resolution = s),
      (this._quality = 0),
      (this.quality = i),
      (this.blur = e)
  }
  apply(t, e, i, s) {
    if (
      (i
        ? this.horizontal
          ? (this.uniforms.strength = (1 / i.width) * (i.width / e.width))
          : (this.uniforms.strength = (1 / i.height) * (i.height / e.height))
        : this.horizontal
          ? (this.uniforms.strength = (1 / t.renderer.width) * (t.renderer.width / e.width))
          : (this.uniforms.strength = (1 / t.renderer.height) * (t.renderer.height / e.height)),
      (this.uniforms.strength *= this.strength),
      (this.uniforms.strength /= this.passes),
      this.passes === 1)
    )
      t.applyFilter(this, e, i, s)
    else {
      const n = t.getFilterTexture(),
        o = t.renderer
      let a = e,
        h = n
      ;(this.state.blend = !1), t.applyFilter(this, a, h, Ye.CLEAR)
      for (let l = 1; l < this.passes - 1; l++) {
        t.bindAndClear(a, Ye.BLIT), (this.uniforms.uSampler = h)
        const c = h
        ;(h = a), (a = c), o.shader.bind(this), o.geometry.draw(5)
      }
      ;(this.state.blend = !0), t.applyFilter(this, h, i, s), t.returnFilterTexture(n)
    }
  }
  get blur() {
    return this.strength
  }
  set blur(t) {
    ;(this.padding = 1 + Math.abs(t) * 2), (this.strength = t)
  }
  get quality() {
    return this._quality
  }
  set quality(t) {
    ;(this._quality = t), (this.passes = t)
  }
}
class Ep extends Jt {
  constructor(t = 8, e = 4, i = Jt.defaultResolution, s = 5) {
    super(),
      (this._repeatEdgePixels = !1),
      (this.blurXFilter = new Mh(!0, t, e, i, s)),
      (this.blurYFilter = new Mh(!1, t, e, i, s)),
      (this.resolution = i),
      (this.quality = e),
      (this.blur = t),
      (this.repeatEdgePixels = !1)
  }
  apply(t, e, i, s) {
    const n = Math.abs(this.blurXFilter.strength),
      o = Math.abs(this.blurYFilter.strength)
    if (n && o) {
      const a = t.getFilterTexture()
      this.blurXFilter.apply(t, e, a, Ye.CLEAR),
        this.blurYFilter.apply(t, a, i, s),
        t.returnFilterTexture(a)
    } else o ? this.blurYFilter.apply(t, e, i, s) : this.blurXFilter.apply(t, e, i, s)
  }
  updatePadding() {
    this._repeatEdgePixels
      ? (this.padding = 0)
      : (this.padding =
          Math.max(Math.abs(this.blurXFilter.strength), Math.abs(this.blurYFilter.strength)) * 2)
  }
  get blur() {
    return this.blurXFilter.blur
  }
  set blur(t) {
    ;(this.blurXFilter.blur = this.blurYFilter.blur = t), this.updatePadding()
  }
  get quality() {
    return this.blurXFilter.quality
  }
  set quality(t) {
    this.blurXFilter.quality = this.blurYFilter.quality = t
  }
  get blurX() {
    return this.blurXFilter.blur
  }
  set blurX(t) {
    ;(this.blurXFilter.blur = t), this.updatePadding()
  }
  get blurY() {
    return this.blurYFilter.blur
  }
  set blurY(t) {
    ;(this.blurYFilter.blur = t), this.updatePadding()
  }
  get blendMode() {
    return this.blurYFilter.blendMode
  }
  set blendMode(t) {
    this.blurYFilter.blendMode = t
  }
  get repeatEdgePixels() {
    return this._repeatEdgePixels
  }
  set repeatEdgePixels(t) {
    ;(this._repeatEdgePixels = t), this.updatePadding()
  }
}
var ax = `varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform float m[20];
uniform float uAlpha;

void main(void)
{
    vec4 c = texture2D(uSampler, vTextureCoord);

    if (uAlpha == 0.0) {
        gl_FragColor = c;
        return;
    }

    // Un-premultiply alpha before applying the color matrix. See issue #3539.
    if (c.a > 0.0) {
      c.rgb /= c.a;
    }

    vec4 result;

    result.r = (m[0] * c.r);
        result.r += (m[1] * c.g);
        result.r += (m[2] * c.b);
        result.r += (m[3] * c.a);
        result.r += m[4];

    result.g = (m[5] * c.r);
        result.g += (m[6] * c.g);
        result.g += (m[7] * c.b);
        result.g += (m[8] * c.a);
        result.g += m[9];

    result.b = (m[10] * c.r);
       result.b += (m[11] * c.g);
       result.b += (m[12] * c.b);
       result.b += (m[13] * c.a);
       result.b += m[14];

    result.a = (m[15] * c.r);
       result.a += (m[16] * c.g);
       result.a += (m[17] * c.b);
       result.a += (m[18] * c.a);
       result.a += m[19];

    vec3 rgb = mix(c.rgb, result.rgb, uAlpha);

    // Premultiply alpha again.
    rgb *= result.a;

    gl_FragColor = vec4(rgb, result.a);
}
`
class ho extends Jt {
  constructor() {
    const t = {
      m: new Float32Array([1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0]),
      uAlpha: 1
    }
    super(fp, ax, t), (this.alpha = 1)
  }
  _loadMatrix(t, e = !1) {
    let i = t
    e && (this._multiply(i, this.uniforms.m, t), (i = this._colorMatrix(i))), (this.uniforms.m = i)
  }
  _multiply(t, e, i) {
    return (
      (t[0] = e[0] * i[0] + e[1] * i[5] + e[2] * i[10] + e[3] * i[15]),
      (t[1] = e[0] * i[1] + e[1] * i[6] + e[2] * i[11] + e[3] * i[16]),
      (t[2] = e[0] * i[2] + e[1] * i[7] + e[2] * i[12] + e[3] * i[17]),
      (t[3] = e[0] * i[3] + e[1] * i[8] + e[2] * i[13] + e[3] * i[18]),
      (t[4] = e[0] * i[4] + e[1] * i[9] + e[2] * i[14] + e[3] * i[19] + e[4]),
      (t[5] = e[5] * i[0] + e[6] * i[5] + e[7] * i[10] + e[8] * i[15]),
      (t[6] = e[5] * i[1] + e[6] * i[6] + e[7] * i[11] + e[8] * i[16]),
      (t[7] = e[5] * i[2] + e[6] * i[7] + e[7] * i[12] + e[8] * i[17]),
      (t[8] = e[5] * i[3] + e[6] * i[8] + e[7] * i[13] + e[8] * i[18]),
      (t[9] = e[5] * i[4] + e[6] * i[9] + e[7] * i[14] + e[8] * i[19] + e[9]),
      (t[10] = e[10] * i[0] + e[11] * i[5] + e[12] * i[10] + e[13] * i[15]),
      (t[11] = e[10] * i[1] + e[11] * i[6] + e[12] * i[11] + e[13] * i[16]),
      (t[12] = e[10] * i[2] + e[11] * i[7] + e[12] * i[12] + e[13] * i[17]),
      (t[13] = e[10] * i[3] + e[11] * i[8] + e[12] * i[13] + e[13] * i[18]),
      (t[14] = e[10] * i[4] + e[11] * i[9] + e[12] * i[14] + e[13] * i[19] + e[14]),
      (t[15] = e[15] * i[0] + e[16] * i[5] + e[17] * i[10] + e[18] * i[15]),
      (t[16] = e[15] * i[1] + e[16] * i[6] + e[17] * i[11] + e[18] * i[16]),
      (t[17] = e[15] * i[2] + e[16] * i[7] + e[17] * i[12] + e[18] * i[17]),
      (t[18] = e[15] * i[3] + e[16] * i[8] + e[17] * i[13] + e[18] * i[18]),
      (t[19] = e[15] * i[4] + e[16] * i[9] + e[17] * i[14] + e[18] * i[19] + e[19]),
      t
    )
  }
  _colorMatrix(t) {
    const e = new Float32Array(t)
    return (e[4] /= 255), (e[9] /= 255), (e[14] /= 255), (e[19] /= 255), e
  }
  brightness(t, e) {
    const i = [t, 0, 0, 0, 0, 0, t, 0, 0, 0, 0, 0, t, 0, 0, 0, 0, 0, 1, 0]
    this._loadMatrix(i, e)
  }
  tint(t, e) {
    const [i, s, n] = St.shared.setValue(t).toArray(),
      o = [i, 0, 0, 0, 0, 0, s, 0, 0, 0, 0, 0, n, 0, 0, 0, 0, 0, 1, 0]
    this._loadMatrix(o, e)
  }
  greyscale(t, e) {
    const i = [t, t, t, 0, 0, t, t, t, 0, 0, t, t, t, 0, 0, 0, 0, 0, 1, 0]
    this._loadMatrix(i, e)
  }
  blackAndWhite(t) {
    const e = [0.3, 0.6, 0.1, 0, 0, 0.3, 0.6, 0.1, 0, 0, 0.3, 0.6, 0.1, 0, 0, 0, 0, 0, 1, 0]
    this._loadMatrix(e, t)
  }
  hue(t, e) {
    t = ((t || 0) / 180) * Math.PI
    const i = Math.cos(t),
      s = Math.sin(t),
      n = Math.sqrt,
      o = 1 / 3,
      a = n(o),
      h = i + (1 - i) * o,
      l = o * (1 - i) - a * s,
      c = o * (1 - i) + a * s,
      u = o * (1 - i) + a * s,
      d = i + o * (1 - i),
      f = o * (1 - i) - a * s,
      p = o * (1 - i) - a * s,
      m = o * (1 - i) + a * s,
      g = i + o * (1 - i),
      A = [h, l, c, 0, 0, u, d, f, 0, 0, p, m, g, 0, 0, 0, 0, 0, 1, 0]
    this._loadMatrix(A, e)
  }
  contrast(t, e) {
    const i = (t || 0) + 1,
      s = -0.5 * (i - 1),
      n = [i, 0, 0, 0, s, 0, i, 0, 0, s, 0, 0, i, 0, s, 0, 0, 0, 1, 0]
    this._loadMatrix(n, e)
  }
  saturate(t = 0, e) {
    const i = (t * 2) / 3 + 1,
      s = (i - 1) * -0.5,
      n = [i, s, s, 0, 0, s, i, s, 0, 0, s, s, i, 0, 0, 0, 0, 0, 1, 0]
    this._loadMatrix(n, e)
  }
  desaturate() {
    this.saturate(-1)
  }
  negative(t) {
    const e = [-1, 0, 0, 1, 0, 0, -1, 0, 1, 0, 0, 0, -1, 1, 0, 0, 0, 0, 1, 0]
    this._loadMatrix(e, t)
  }
  sepia(t) {
    const e = [
      0.393, 0.7689999, 0.18899999, 0, 0, 0.349, 0.6859999, 0.16799999, 0, 0, 0.272, 0.5339999,
      0.13099999, 0, 0, 0, 0, 0, 1, 0
    ]
    this._loadMatrix(e, t)
  }
  technicolor(t) {
    const e = [
      1.9125277891456083, -0.8545344976951645, -0.09155508482755585, 0, 11.793603434377337,
      -0.3087833385928097, 1.7658908555458428, -0.10601743074722245, 0, -70.35205161461398,
      -0.231103377548616, -0.7501899197440212, 1.847597816108189, 0, 30.950940869491138, 0, 0, 0, 1,
      0
    ]
    this._loadMatrix(e, t)
  }
  polaroid(t) {
    const e = [
      1.438, -0.062, -0.062, 0, 0, -0.122, 1.378, -0.122, 0, 0, -0.016, -0.016, 1.483, 0, 0, 0, 0,
      0, 1, 0
    ]
    this._loadMatrix(e, t)
  }
  toBGR(t) {
    const e = [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0]
    this._loadMatrix(e, t)
  }
  kodachrome(t) {
    const e = [
      1.1285582396593525, -0.3967382283601348, -0.03992559172921793, 0, 63.72958762196502,
      -0.16404339962244616, 1.0835251566291304, -0.05498805115633132, 0, 24.732407896706203,
      -0.16786010706155763, -0.5603416277695248, 1.6014850761964943, 0, 35.62982807460946, 0, 0, 0,
      1, 0
    ]
    this._loadMatrix(e, t)
  }
  browni(t) {
    const e = [
      0.5997023498159715, 0.34553243048391263, -0.2708298674538042, 0, 47.43192855600873,
      -0.037703249837783157, 0.8609577587992641, 0.15059552388459913, 0, -36.96841498319127,
      0.24113635128153335, -0.07441037908422492, 0.44972182064877153, 0, -7.562075277591283, 0, 0,
      0, 1, 0
    ]
    this._loadMatrix(e, t)
  }
  vintage(t) {
    const e = [
      0.6279345635605994, 0.3202183420819367, -0.03965408211312453, 0, 9.651285835294123,
      0.02578397704808868, 0.6441188644374771, 0.03259127616149294, 0, 7.462829176470591,
      0.0466055556782719, -0.0851232987247891, 0.5241648018700465, 0, 5.159190588235296, 0, 0, 0, 1,
      0
    ]
    this._loadMatrix(e, t)
  }
  colorTone(t, e, i, s, n) {
    ;(t = t || 0.2), (e = e || 0.15), (i = i || 16770432), (s = s || 3375104)
    const o = St.shared,
      [a, h, l] = o.setValue(i).toArray(),
      [c, u, d] = o.setValue(s).toArray(),
      f = [0.3, 0.59, 0.11, 0, 0, a, h, l, t, 0, c, u, d, e, 0, a - c, h - u, l - d, 0, 0]
    this._loadMatrix(f, n)
  }
  night(t, e) {
    t = t || 0.1
    const i = [t * -2, -t, 0, 0, 0, -t, 0, t, 0, 0, 0, t, t * 2, 0, 0, 0, 0, 0, 1, 0]
    this._loadMatrix(i, e)
  }
  predator(t, e) {
    const i = [
      11.224130630493164 * t,
      -4.794486999511719 * t,
      -2.8746118545532227 * t,
      0 * t,
      0.40342438220977783 * t,
      -3.6330697536468506 * t,
      9.193157196044922 * t,
      -2.951810836791992 * t,
      0 * t,
      -1.316135048866272 * t,
      -3.2184197902679443 * t,
      -4.2375030517578125 * t,
      7.476448059082031 * t,
      0 * t,
      0.8044459223747253 * t,
      0,
      0,
      0,
      1,
      0
    ]
    this._loadMatrix(i, e)
  }
  lsd(t) {
    const e = [2, -0.4, 0.5, 0, 0, -0.5, 2, -0.4, 0, 0, -0.4, -0.5, 3, 0, 0, 0, 0, 0, 1, 0]
    this._loadMatrix(e, t)
  }
  reset() {
    const t = [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0]
    this._loadMatrix(t, !1)
  }
  get matrix() {
    return this.uniforms.m
  }
  set matrix(t) {
    this.uniforms.m = t
  }
  get alpha() {
    return this.uniforms.uAlpha
  }
  set alpha(t) {
    this.uniforms.uAlpha = t
  }
}
ho.prototype.grayscale = ho.prototype.greyscale
var hx = `varying vec2 vFilterCoord;
varying vec2 vTextureCoord;

uniform vec2 scale;
uniform mat2 rotation;
uniform sampler2D uSampler;
uniform sampler2D mapSampler;

uniform highp vec4 inputSize;
uniform vec4 inputClamp;

void main(void)
{
  vec4 map =  texture2D(mapSampler, vFilterCoord);

  map -= 0.5;
  map.xy = scale * inputSize.zw * (rotation * map.xy);

  gl_FragColor = texture2D(uSampler, clamp(vec2(vTextureCoord.x + map.x, vTextureCoord.y + map.y), inputClamp.xy, inputClamp.zw));
}
`,
  lx = `attribute vec2 aVertexPosition;

uniform mat3 projectionMatrix;
uniform mat3 filterMatrix;

varying vec2 vTextureCoord;
varying vec2 vFilterCoord;

uniform vec4 inputSize;
uniform vec4 outputFrame;

vec4 filterVertexPosition( void )
{
    vec2 position = aVertexPosition * max(outputFrame.zw, vec2(0.)) + outputFrame.xy;

    return vec4((projectionMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);
}

vec2 filterTextureCoord( void )
{
    return aVertexPosition * (outputFrame.zw * inputSize.zw);
}

void main(void)
{
	gl_Position = filterVertexPosition();
	vTextureCoord = filterTextureCoord();
	vFilterCoord = ( filterMatrix * vec3( vTextureCoord, 1.0)  ).xy;
}
`
class Tp extends Jt {
  constructor(t, e) {
    const i = new Ct()
    ;(t.renderable = !1),
      super(lx, hx, {
        mapSampler: t._texture,
        filterMatrix: i,
        scale: { x: 1, y: 1 },
        rotation: new Float32Array([1, 0, 0, 1])
      }),
      (this.maskSprite = t),
      (this.maskMatrix = i),
      e == null && (e = 20),
      (this.scale = new pt(e, e))
  }
  apply(t, e, i, s) {
    ;(this.uniforms.filterMatrix = t.calculateSpriteMatrix(this.maskMatrix, this.maskSprite)),
      (this.uniforms.scale.x = this.scale.x),
      (this.uniforms.scale.y = this.scale.y)
    const n = this.maskSprite.worldTransform,
      o = Math.sqrt(n.a * n.a + n.b * n.b),
      a = Math.sqrt(n.c * n.c + n.d * n.d)
    o !== 0 &&
      a !== 0 &&
      ((this.uniforms.rotation[0] = n.a / o),
      (this.uniforms.rotation[1] = n.b / o),
      (this.uniforms.rotation[2] = n.c / a),
      (this.uniforms.rotation[3] = n.d / a)),
      t.applyFilter(this, e, i, s)
  }
  get map() {
    return this.uniforms.mapSampler
  }
  set map(t) {
    this.uniforms.mapSampler = t
  }
}
var cx = `varying vec2 v_rgbNW;
varying vec2 v_rgbNE;
varying vec2 v_rgbSW;
varying vec2 v_rgbSE;
varying vec2 v_rgbM;

varying vec2 vFragCoord;
uniform sampler2D uSampler;
uniform highp vec4 inputSize;


/**
 Basic FXAA implementation based on the code on geeks3d.com with the
 modification that the texture2DLod stuff was removed since it's
 unsupported by WebGL.

 --

 From:
 https://github.com/mitsuhiko/webgl-meincraft

 Copyright (c) 2011 by Armin Ronacher.

 Some rights reserved.

 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions are
 met:

 * Redistributions of source code must retain the above copyright
 notice, this list of conditions and the following disclaimer.

 * Redistributions in binary form must reproduce the above
 copyright notice, this list of conditions and the following
 disclaimer in the documentation and/or other materials provided
 with the distribution.

 * The names of the contributors may not be used to endorse or
 promote products derived from this software without specific
 prior written permission.

 THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

#ifndef FXAA_REDUCE_MIN
#define FXAA_REDUCE_MIN   (1.0/ 128.0)
#endif
#ifndef FXAA_REDUCE_MUL
#define FXAA_REDUCE_MUL   (1.0 / 8.0)
#endif
#ifndef FXAA_SPAN_MAX
#define FXAA_SPAN_MAX     8.0
#endif

//optimized version for mobile, where dependent
//texture reads can be a bottleneck
vec4 fxaa(sampler2D tex, vec2 fragCoord, vec2 inverseVP,
          vec2 v_rgbNW, vec2 v_rgbNE,
          vec2 v_rgbSW, vec2 v_rgbSE,
          vec2 v_rgbM) {
    vec4 color;
    vec3 rgbNW = texture2D(tex, v_rgbNW).xyz;
    vec3 rgbNE = texture2D(tex, v_rgbNE).xyz;
    vec3 rgbSW = texture2D(tex, v_rgbSW).xyz;
    vec3 rgbSE = texture2D(tex, v_rgbSE).xyz;
    vec4 texColor = texture2D(tex, v_rgbM);
    vec3 rgbM  = texColor.xyz;
    vec3 luma = vec3(0.299, 0.587, 0.114);
    float lumaNW = dot(rgbNW, luma);
    float lumaNE = dot(rgbNE, luma);
    float lumaSW = dot(rgbSW, luma);
    float lumaSE = dot(rgbSE, luma);
    float lumaM  = dot(rgbM,  luma);
    float lumaMin = min(lumaM, min(min(lumaNW, lumaNE), min(lumaSW, lumaSE)));
    float lumaMax = max(lumaM, max(max(lumaNW, lumaNE), max(lumaSW, lumaSE)));

    mediump vec2 dir;
    dir.x = -((lumaNW + lumaNE) - (lumaSW + lumaSE));
    dir.y =  ((lumaNW + lumaSW) - (lumaNE + lumaSE));

    float dirReduce = max((lumaNW + lumaNE + lumaSW + lumaSE) *
                          (0.25 * FXAA_REDUCE_MUL), FXAA_REDUCE_MIN);

    float rcpDirMin = 1.0 / (min(abs(dir.x), abs(dir.y)) + dirReduce);
    dir = min(vec2(FXAA_SPAN_MAX, FXAA_SPAN_MAX),
              max(vec2(-FXAA_SPAN_MAX, -FXAA_SPAN_MAX),
                  dir * rcpDirMin)) * inverseVP;

    vec3 rgbA = 0.5 * (
                       texture2D(tex, fragCoord * inverseVP + dir * (1.0 / 3.0 - 0.5)).xyz +
                       texture2D(tex, fragCoord * inverseVP + dir * (2.0 / 3.0 - 0.5)).xyz);
    vec3 rgbB = rgbA * 0.5 + 0.25 * (
                                     texture2D(tex, fragCoord * inverseVP + dir * -0.5).xyz +
                                     texture2D(tex, fragCoord * inverseVP + dir * 0.5).xyz);

    float lumaB = dot(rgbB, luma);
    if ((lumaB < lumaMin) || (lumaB > lumaMax))
        color = vec4(rgbA, texColor.a);
    else
        color = vec4(rgbB, texColor.a);
    return color;
}

void main() {

      vec4 color;

      color = fxaa(uSampler, vFragCoord, inputSize.zw, v_rgbNW, v_rgbNE, v_rgbSW, v_rgbSE, v_rgbM);

      gl_FragColor = color;
}
`,
  ux = `
attribute vec2 aVertexPosition;

uniform mat3 projectionMatrix;

varying vec2 v_rgbNW;
varying vec2 v_rgbNE;
varying vec2 v_rgbSW;
varying vec2 v_rgbSE;
varying vec2 v_rgbM;

varying vec2 vFragCoord;

uniform vec4 inputSize;
uniform vec4 outputFrame;

vec4 filterVertexPosition( void )
{
    vec2 position = aVertexPosition * max(outputFrame.zw, vec2(0.)) + outputFrame.xy;

    return vec4((projectionMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);
}

void texcoords(vec2 fragCoord, vec2 inverseVP,
               out vec2 v_rgbNW, out vec2 v_rgbNE,
               out vec2 v_rgbSW, out vec2 v_rgbSE,
               out vec2 v_rgbM) {
    v_rgbNW = (fragCoord + vec2(-1.0, -1.0)) * inverseVP;
    v_rgbNE = (fragCoord + vec2(1.0, -1.0)) * inverseVP;
    v_rgbSW = (fragCoord + vec2(-1.0, 1.0)) * inverseVP;
    v_rgbSE = (fragCoord + vec2(1.0, 1.0)) * inverseVP;
    v_rgbM = vec2(fragCoord * inverseVP);
}

void main(void) {

   gl_Position = filterVertexPosition();

   vFragCoord = aVertexPosition * outputFrame.zw;

   texcoords(vFragCoord, inputSize.zw, v_rgbNW, v_rgbNE, v_rgbSW, v_rgbSE, v_rgbM);
}
`
class wp extends Jt {
  constructor() {
    super(ux, cx)
  }
}
var dx = `precision highp float;

varying vec2 vTextureCoord;
varying vec4 vColor;

uniform float uNoise;
uniform float uSeed;
uniform sampler2D uSampler;

float rand(vec2 co)
{
    return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
}

void main()
{
    vec4 color = texture2D(uSampler, vTextureCoord);
    float randomValue = rand(gl_FragCoord.xy * uSeed);
    float diff = (randomValue - 0.5) * uNoise;

    // Un-premultiply alpha before applying the color matrix. See issue #3539.
    if (color.a > 0.0) {
        color.rgb /= color.a;
    }

    color.r += diff;
    color.g += diff;
    color.b += diff;

    // Premultiply alpha again.
    color.rgb *= color.a;

    gl_FragColor = color;
}
`
class Sp extends Jt {
  constructor(t = 0.5, e = Math.random()) {
    super(fp, dx, { uNoise: 0, uSeed: 0 }), (this.noise = t), (this.seed = e)
  }
  get noise() {
    return this.uniforms.uNoise
  }
  set noise(t) {
    this.uniforms.uNoise = t
  }
  get seed() {
    return this.uniforms.uSeed
  }
  set seed(t) {
    this.uniforms.uSeed = t
  }
}
const wu = {
  AlphaFilter: bp,
  BlurFilter: Ep,
  BlurFilterPass: Mh,
  ColorMatrixFilter: ho,
  DisplacementFilter: Tp,
  FXAAFilter: wp,
  NoiseFilter: Sp
}
Object.entries(wu).forEach(([r, t]) => {
  Object.defineProperty(wu, r, {
    get() {
      return ut('7.1.0', `filters.${r} has moved to ${r}`), t
    }
  })
})
class fx {
  constructor() {
    ;(this.interactionFrequency = 10),
      (this._deltaTime = 0),
      (this._didMove = !1),
      (this.tickerAdded = !1),
      (this._pauseUpdate = !0)
  }
  init(t) {
    this.removeTickerListener(),
      (this.events = t),
      (this.interactionFrequency = 10),
      (this._deltaTime = 0),
      (this._didMove = !1),
      (this.tickerAdded = !1),
      (this._pauseUpdate = !0)
  }
  get pauseUpdate() {
    return this._pauseUpdate
  }
  set pauseUpdate(t) {
    this._pauseUpdate = t
  }
  addTickerListener() {
    this.tickerAdded ||
      !this.domElement ||
      (Tt.system.add(this.tickerUpdate, this, Or.INTERACTION), (this.tickerAdded = !0))
  }
  removeTickerListener() {
    this.tickerAdded && (Tt.system.remove(this.tickerUpdate, this), (this.tickerAdded = !1))
  }
  pointerMoved() {
    this._didMove = !0
  }
  update() {
    if (!this.domElement || this._pauseUpdate) return
    if (this._didMove) {
      this._didMove = !1
      return
    }
    const t = this.events.rootPointerEvent
    ;(this.events.supportsTouchEvents && t.pointerType === 'touch') ||
      globalThis.document.dispatchEvent(
        new PointerEvent('pointermove', { clientX: t.clientX, clientY: t.clientY })
      )
  }
  tickerUpdate(t) {
    ;(this._deltaTime += t),
      !(this._deltaTime < this.interactionFrequency) && ((this._deltaTime = 0), this.update())
  }
}
const Cr = new fx()
class $s {
  constructor(t) {
    ;(this.bubbles = !0),
      (this.cancelBubble = !0),
      (this.cancelable = !1),
      (this.composed = !1),
      (this.defaultPrevented = !1),
      (this.eventPhase = $s.prototype.NONE),
      (this.propagationStopped = !1),
      (this.propagationImmediatelyStopped = !1),
      (this.layer = new pt()),
      (this.page = new pt()),
      (this.NONE = 0),
      (this.CAPTURING_PHASE = 1),
      (this.AT_TARGET = 2),
      (this.BUBBLING_PHASE = 3),
      (this.manager = t)
  }
  get layerX() {
    return this.layer.x
  }
  get layerY() {
    return this.layer.y
  }
  get pageX() {
    return this.page.x
  }
  get pageY() {
    return this.page.y
  }
  get data() {
    return this
  }
  composedPath() {
    return (
      this.manager &&
        (!this.path || this.path[this.path.length - 1] !== this.target) &&
        (this.path = this.target ? this.manager.propagationPath(this.target) : []),
      this.path
    )
  }
  initEvent(t, e, i) {
    throw new Error(
      'initEvent() is a legacy DOM API. It is not implemented in the Federated Events API.'
    )
  }
  initUIEvent(t, e, i, s, n) {
    throw new Error(
      'initUIEvent() is a legacy DOM API. It is not implemented in the Federated Events API.'
    )
  }
  preventDefault() {
    this.nativeEvent instanceof Event &&
      this.nativeEvent.cancelable &&
      this.nativeEvent.preventDefault(),
      (this.defaultPrevented = !0)
  }
  stopImmediatePropagation() {
    this.propagationImmediatelyStopped = !0
  }
  stopPropagation() {
    this.propagationStopped = !0
  }
}
class lo extends $s {
  constructor() {
    super(...arguments),
      (this.client = new pt()),
      (this.movement = new pt()),
      (this.offset = new pt()),
      (this.global = new pt()),
      (this.screen = new pt())
  }
  get clientX() {
    return this.client.x
  }
  get clientY() {
    return this.client.y
  }
  get x() {
    return this.clientX
  }
  get y() {
    return this.clientY
  }
  get movementX() {
    return this.movement.x
  }
  get movementY() {
    return this.movement.y
  }
  get offsetX() {
    return this.offset.x
  }
  get offsetY() {
    return this.offset.y
  }
  get globalX() {
    return this.global.x
  }
  get globalY() {
    return this.global.y
  }
  get screenX() {
    return this.screen.x
  }
  get screenY() {
    return this.screen.y
  }
  getLocalPosition(t, e, i) {
    return t.worldTransform.applyInverse(i || this.global, e)
  }
  getModifierState(t) {
    return 'getModifierState' in this.nativeEvent && this.nativeEvent.getModifierState(t)
  }
  initMouseEvent(t, e, i, s, n, o, a, h, l, c, u, d, f, p, m) {
    throw new Error('Method not implemented.')
  }
}
class Me extends lo {
  constructor() {
    super(...arguments), (this.width = 0), (this.height = 0), (this.isPrimary = !1)
  }
  getCoalescedEvents() {
    return this.type === 'pointermove' || this.type === 'mousemove' || this.type === 'touchmove'
      ? [this]
      : []
  }
  getPredictedEvents() {
    throw new Error('getPredictedEvents is not supported!')
  }
}
class Gi extends lo {
  constructor() {
    super(...arguments),
      (this.DOM_DELTA_PIXEL = 0),
      (this.DOM_DELTA_LINE = 1),
      (this.DOM_DELTA_PAGE = 2)
  }
}
;(Gi.DOM_DELTA_PIXEL = 0), (Gi.DOM_DELTA_LINE = 1), (Gi.DOM_DELTA_PAGE = 2)
const px = 2048,
  mx = new pt(),
  Sa = new pt()
class gx {
  constructor(t) {
    ;(this.dispatch = new Xs()),
      (this.moveOnAll = !1),
      (this.enableGlobalMoveEvents = !0),
      (this.mappingState = { trackingData: {} }),
      (this.eventPool = new Map()),
      (this._allInteractiveElements = []),
      (this._hitElements = []),
      (this._isPointerMoveEvent = !1),
      (this.rootTarget = t),
      (this.hitPruneFn = this.hitPruneFn.bind(this)),
      (this.hitTestFn = this.hitTestFn.bind(this)),
      (this.mapPointerDown = this.mapPointerDown.bind(this)),
      (this.mapPointerMove = this.mapPointerMove.bind(this)),
      (this.mapPointerOut = this.mapPointerOut.bind(this)),
      (this.mapPointerOver = this.mapPointerOver.bind(this)),
      (this.mapPointerUp = this.mapPointerUp.bind(this)),
      (this.mapPointerUpOutside = this.mapPointerUpOutside.bind(this)),
      (this.mapWheel = this.mapWheel.bind(this)),
      (this.mappingTable = {}),
      this.addEventMapping('pointerdown', this.mapPointerDown),
      this.addEventMapping('pointermove', this.mapPointerMove),
      this.addEventMapping('pointerout', this.mapPointerOut),
      this.addEventMapping('pointerleave', this.mapPointerOut),
      this.addEventMapping('pointerover', this.mapPointerOver),
      this.addEventMapping('pointerup', this.mapPointerUp),
      this.addEventMapping('pointerupoutside', this.mapPointerUpOutside),
      this.addEventMapping('wheel', this.mapWheel)
  }
  addEventMapping(t, e) {
    this.mappingTable[t] || (this.mappingTable[t] = []),
      this.mappingTable[t].push({ fn: e, priority: 0 }),
      this.mappingTable[t].sort((i, s) => i.priority - s.priority)
  }
  dispatchEvent(t, e) {
    ;(t.propagationStopped = !1),
      (t.propagationImmediatelyStopped = !1),
      this.propagate(t, e),
      this.dispatch.emit(e || t.type, t)
  }
  mapEvent(t) {
    if (!this.rootTarget) return
    const e = this.mappingTable[t.type]
    if (e) for (let i = 0, s = e.length; i < s; i++) e[i].fn(t)
    else console.warn(`[EventBoundary]: Event mapping not defined for ${t.type}`)
  }
  hitTest(t, e) {
    Cr.pauseUpdate = !0
    const i =
        this._isPointerMoveEvent && this.enableGlobalMoveEvents
          ? 'hitTestMoveRecursive'
          : 'hitTestRecursive',
      s = this[i](
        this.rootTarget,
        this.rootTarget.eventMode,
        mx.set(t, e),
        this.hitTestFn,
        this.hitPruneFn
      )
    return s && s[0]
  }
  propagate(t, e) {
    if (!t.target) return
    const i = t.composedPath()
    t.eventPhase = t.CAPTURING_PHASE
    for (let s = 0, n = i.length - 1; s < n; s++)
      if (
        ((t.currentTarget = i[s]),
        this.notifyTarget(t, e),
        t.propagationStopped || t.propagationImmediatelyStopped)
      )
        return
    if (
      ((t.eventPhase = t.AT_TARGET),
      (t.currentTarget = t.target),
      this.notifyTarget(t, e),
      !(t.propagationStopped || t.propagationImmediatelyStopped))
    ) {
      t.eventPhase = t.BUBBLING_PHASE
      for (let s = i.length - 2; s >= 0; s--)
        if (
          ((t.currentTarget = i[s]),
          this.notifyTarget(t, e),
          t.propagationStopped || t.propagationImmediatelyStopped)
        )
          return
    }
  }
  all(t, e, i = this._allInteractiveElements) {
    if (i.length === 0) return
    t.eventPhase = t.BUBBLING_PHASE
    const s = Array.isArray(e) ? e : [e]
    for (let n = i.length - 1; n >= 0; n--)
      s.forEach((o) => {
        ;(t.currentTarget = i[n]), this.notifyTarget(t, o)
      })
  }
  propagationPath(t) {
    const e = [t]
    for (let i = 0; i < px && t !== this.rootTarget; i++) {
      if (!t.parent) throw new Error('Cannot find propagation path to disconnected target')
      e.push(t.parent), (t = t.parent)
    }
    return e.reverse(), e
  }
  hitTestMoveRecursive(t, e, i, s, n, o = !1) {
    let a = !1
    if (this._interactivePrune(t)) return null
    if (
      ((t.eventMode === 'dynamic' || e === 'dynamic') && (Cr.pauseUpdate = !1),
      t.interactiveChildren && t.children)
    ) {
      const c = t.children
      for (let u = c.length - 1; u >= 0; u--) {
        const d = c[u],
          f = this.hitTestMoveRecursive(
            d,
            this._isInteractive(e) ? e : d.eventMode,
            i,
            s,
            n,
            o || n(t, i)
          )
        if (f) {
          if (f.length > 0 && !f[f.length - 1].parent) continue
          const p = t.isInteractive()
          ;(f.length > 0 || p) && (p && this._allInteractiveElements.push(t), f.push(t)),
            this._hitElements.length === 0 && (this._hitElements = f),
            (a = !0)
        }
      }
    }
    const h = this._isInteractive(e),
      l = t.isInteractive()
    return (
      h && l && this._allInteractiveElements.push(t),
      o || this._hitElements.length > 0
        ? null
        : a
          ? this._hitElements
          : h && !n(t, i) && s(t, i)
            ? l
              ? [t]
              : []
            : null
    )
  }
  hitTestRecursive(t, e, i, s, n) {
    if (this._interactivePrune(t) || n(t, i)) return null
    if (
      ((t.eventMode === 'dynamic' || e === 'dynamic') && (Cr.pauseUpdate = !1),
      t.interactiveChildren && t.children)
    ) {
      const h = t.children
      for (let l = h.length - 1; l >= 0; l--) {
        const c = h[l],
          u = this.hitTestRecursive(c, this._isInteractive(e) ? e : c.eventMode, i, s, n)
        if (u) {
          if (u.length > 0 && !u[u.length - 1].parent) continue
          const d = t.isInteractive()
          return (u.length > 0 || d) && u.push(t), u
        }
      }
    }
    const o = this._isInteractive(e),
      a = t.isInteractive()
    return o && s(t, i) ? (a ? [t] : []) : null
  }
  _isInteractive(t) {
    return t === 'static' || t === 'dynamic'
  }
  _interactivePrune(t) {
    return !!(
      !t ||
      t.isMask ||
      !t.visible ||
      !t.renderable ||
      t.eventMode === 'none' ||
      (t.eventMode === 'passive' && !t.interactiveChildren) ||
      t.isMask
    )
  }
  hitPruneFn(t, e) {
    var i
    if (t.hitArea && (t.worldTransform.applyInverse(e, Sa), !t.hitArea.contains(Sa.x, Sa.y)))
      return !0
    if (t._mask) {
      const s = t._mask.isMaskData ? t._mask.maskObject : t._mask
      if (s && !((i = s.containsPoint) != null && i.call(s, e))) return !0
    }
    return !1
  }
  hitTestFn(t, e) {
    return t.eventMode === 'passive'
      ? !1
      : t.hitArea
        ? !0
        : t.containsPoint
          ? t.containsPoint(e)
          : !1
  }
  notifyTarget(t, e) {
    var n, o
    e = e ?? t.type
    const i = `on${e}`
    ;(o = (n = t.currentTarget)[i]) == null || o.call(n, t)
    const s = t.eventPhase === t.CAPTURING_PHASE || t.eventPhase === t.AT_TARGET ? `${e}capture` : e
    this.notifyListeners(t, s), t.eventPhase === t.AT_TARGET && this.notifyListeners(t, e)
  }
  mapPointerDown(t) {
    if (!(t instanceof Me)) {
      console.warn('EventBoundary cannot map a non-pointer event as a pointer event')
      return
    }
    const e = this.createPointerEvent(t)
    if ((this.dispatchEvent(e, 'pointerdown'), e.pointerType === 'touch'))
      this.dispatchEvent(e, 'touchstart')
    else if (e.pointerType === 'mouse' || e.pointerType === 'pen') {
      const s = e.button === 2
      this.dispatchEvent(e, s ? 'rightdown' : 'mousedown')
    }
    const i = this.trackingData(t.pointerId)
    ;(i.pressTargetsByButton[t.button] = e.composedPath()), this.freeEvent(e)
  }
  mapPointerMove(t) {
    var h, l
    if (!(t instanceof Me)) {
      console.warn('EventBoundary cannot map a non-pointer event as a pointer event')
      return
    }
    ;(this._allInteractiveElements.length = 0),
      (this._hitElements.length = 0),
      (this._isPointerMoveEvent = !0)
    const e = this.createPointerEvent(t)
    this._isPointerMoveEvent = !1
    const i = e.pointerType === 'mouse' || e.pointerType === 'pen',
      s = this.trackingData(t.pointerId),
      n = this.findMountedTarget(s.overTargets)
    if (((h = s.overTargets) == null ? void 0 : h.length) > 0 && n !== e.target) {
      const c = t.type === 'mousemove' ? 'mouseout' : 'pointerout',
        u = this.createPointerEvent(t, c, n)
      if (
        (this.dispatchEvent(u, 'pointerout'),
        i && this.dispatchEvent(u, 'mouseout'),
        !e.composedPath().includes(n))
      ) {
        const d = this.createPointerEvent(t, 'pointerleave', n)
        for (d.eventPhase = d.AT_TARGET; d.target && !e.composedPath().includes(d.target); )
          (d.currentTarget = d.target),
            this.notifyTarget(d),
            i && this.notifyTarget(d, 'mouseleave'),
            (d.target = d.target.parent)
        this.freeEvent(d)
      }
      this.freeEvent(u)
    }
    if (n !== e.target) {
      const c = t.type === 'mousemove' ? 'mouseover' : 'pointerover',
        u = this.clonePointerEvent(e, c)
      this.dispatchEvent(u, 'pointerover'), i && this.dispatchEvent(u, 'mouseover')
      let d = n == null ? void 0 : n.parent
      for (; d && d !== this.rootTarget.parent && d !== e.target; ) d = d.parent
      if (!d || d === this.rootTarget.parent) {
        const f = this.clonePointerEvent(e, 'pointerenter')
        for (
          f.eventPhase = f.AT_TARGET;
          f.target && f.target !== n && f.target !== this.rootTarget.parent;

        )
          (f.currentTarget = f.target),
            this.notifyTarget(f),
            i && this.notifyTarget(f, 'mouseenter'),
            (f.target = f.target.parent)
        this.freeEvent(f)
      }
      this.freeEvent(u)
    }
    const o = [],
      a = this.enableGlobalMoveEvents ?? !0
    this.moveOnAll ? o.push('pointermove') : this.dispatchEvent(e, 'pointermove'),
      a && o.push('globalpointermove'),
      e.pointerType === 'touch' &&
        (this.moveOnAll ? o.splice(1, 0, 'touchmove') : this.dispatchEvent(e, 'touchmove'),
        a && o.push('globaltouchmove')),
      i &&
        (this.moveOnAll ? o.splice(1, 0, 'mousemove') : this.dispatchEvent(e, 'mousemove'),
        a && o.push('globalmousemove'),
        (this.cursor = (l = e.target) == null ? void 0 : l.cursor)),
      o.length > 0 && this.all(e, o),
      (this._allInteractiveElements.length = 0),
      (this._hitElements.length = 0),
      (s.overTargets = e.composedPath()),
      this.freeEvent(e)
  }
  mapPointerOver(t) {
    var o
    if (!(t instanceof Me)) {
      console.warn('EventBoundary cannot map a non-pointer event as a pointer event')
      return
    }
    const e = this.trackingData(t.pointerId),
      i = this.createPointerEvent(t),
      s = i.pointerType === 'mouse' || i.pointerType === 'pen'
    this.dispatchEvent(i, 'pointerover'),
      s && this.dispatchEvent(i, 'mouseover'),
      i.pointerType === 'mouse' && (this.cursor = (o = i.target) == null ? void 0 : o.cursor)
    const n = this.clonePointerEvent(i, 'pointerenter')
    for (n.eventPhase = n.AT_TARGET; n.target && n.target !== this.rootTarget.parent; )
      (n.currentTarget = n.target),
        this.notifyTarget(n),
        s && this.notifyTarget(n, 'mouseenter'),
        (n.target = n.target.parent)
    ;(e.overTargets = i.composedPath()), this.freeEvent(i), this.freeEvent(n)
  }
  mapPointerOut(t) {
    if (!(t instanceof Me)) {
      console.warn('EventBoundary cannot map a non-pointer event as a pointer event')
      return
    }
    const e = this.trackingData(t.pointerId)
    if (e.overTargets) {
      const i = t.pointerType === 'mouse' || t.pointerType === 'pen',
        s = this.findMountedTarget(e.overTargets),
        n = this.createPointerEvent(t, 'pointerout', s)
      this.dispatchEvent(n), i && this.dispatchEvent(n, 'mouseout')
      const o = this.createPointerEvent(t, 'pointerleave', s)
      for (o.eventPhase = o.AT_TARGET; o.target && o.target !== this.rootTarget.parent; )
        (o.currentTarget = o.target),
          this.notifyTarget(o),
          i && this.notifyTarget(o, 'mouseleave'),
          (o.target = o.target.parent)
      ;(e.overTargets = null), this.freeEvent(n), this.freeEvent(o)
    }
    this.cursor = null
  }
  mapPointerUp(t) {
    if (!(t instanceof Me)) {
      console.warn('EventBoundary cannot map a non-pointer event as a pointer event')
      return
    }
    const e = performance.now(),
      i = this.createPointerEvent(t)
    if ((this.dispatchEvent(i, 'pointerup'), i.pointerType === 'touch'))
      this.dispatchEvent(i, 'touchend')
    else if (i.pointerType === 'mouse' || i.pointerType === 'pen') {
      const a = i.button === 2
      this.dispatchEvent(i, a ? 'rightup' : 'mouseup')
    }
    const s = this.trackingData(t.pointerId),
      n = this.findMountedTarget(s.pressTargetsByButton[t.button])
    let o = n
    if (n && !i.composedPath().includes(n)) {
      let a = n
      for (; a && !i.composedPath().includes(a); ) {
        if (
          ((i.currentTarget = a),
          this.notifyTarget(i, 'pointerupoutside'),
          i.pointerType === 'touch')
        )
          this.notifyTarget(i, 'touchendoutside')
        else if (i.pointerType === 'mouse' || i.pointerType === 'pen') {
          const h = i.button === 2
          this.notifyTarget(i, h ? 'rightupoutside' : 'mouseupoutside')
        }
        a = a.parent
      }
      delete s.pressTargetsByButton[t.button], (o = a)
    }
    if (o) {
      const a = this.clonePointerEvent(i, 'click')
      ;(a.target = o),
        (a.path = null),
        s.clicksByButton[t.button] ||
          (s.clicksByButton[t.button] = { clickCount: 0, target: a.target, timeStamp: e })
      const h = s.clicksByButton[t.button]
      if (
        (h.target === a.target && e - h.timeStamp < 200 ? ++h.clickCount : (h.clickCount = 1),
        (h.target = a.target),
        (h.timeStamp = e),
        (a.detail = h.clickCount),
        a.pointerType === 'mouse')
      ) {
        const l = a.button === 2
        this.dispatchEvent(a, l ? 'rightclick' : 'click')
      } else a.pointerType === 'touch' && this.dispatchEvent(a, 'tap')
      this.dispatchEvent(a, 'pointertap'), this.freeEvent(a)
    }
    this.freeEvent(i)
  }
  mapPointerUpOutside(t) {
    if (!(t instanceof Me)) {
      console.warn('EventBoundary cannot map a non-pointer event as a pointer event')
      return
    }
    const e = this.trackingData(t.pointerId),
      i = this.findMountedTarget(e.pressTargetsByButton[t.button]),
      s = this.createPointerEvent(t)
    if (i) {
      let n = i
      for (; n; )
        (s.currentTarget = n),
          this.notifyTarget(s, 'pointerupoutside'),
          s.pointerType === 'touch'
            ? this.notifyTarget(s, 'touchendoutside')
            : (s.pointerType === 'mouse' || s.pointerType === 'pen') &&
              this.notifyTarget(s, s.button === 2 ? 'rightupoutside' : 'mouseupoutside'),
          (n = n.parent)
      delete e.pressTargetsByButton[t.button]
    }
    this.freeEvent(s)
  }
  mapWheel(t) {
    if (!(t instanceof Gi)) {
      console.warn('EventBoundary cannot map a non-wheel event as a wheel event')
      return
    }
    const e = this.createWheelEvent(t)
    this.dispatchEvent(e), this.freeEvent(e)
  }
  findMountedTarget(t) {
    if (!t) return null
    let e = t[0]
    for (let i = 1; i < t.length && t[i].parent === e; i++) e = t[i]
    return e
  }
  createPointerEvent(t, e, i) {
    const s = this.allocateEvent(Me)
    return (
      this.copyPointerData(t, s),
      this.copyMouseData(t, s),
      this.copyData(t, s),
      (s.nativeEvent = t.nativeEvent),
      (s.originalEvent = t),
      (s.target = i ?? this.hitTest(s.global.x, s.global.y) ?? this._hitElements[0]),
      typeof e == 'string' && (s.type = e),
      s
    )
  }
  createWheelEvent(t) {
    const e = this.allocateEvent(Gi)
    return (
      this.copyWheelData(t, e),
      this.copyMouseData(t, e),
      this.copyData(t, e),
      (e.nativeEvent = t.nativeEvent),
      (e.originalEvent = t),
      (e.target = this.hitTest(e.global.x, e.global.y)),
      e
    )
  }
  clonePointerEvent(t, e) {
    const i = this.allocateEvent(Me)
    return (
      (i.nativeEvent = t.nativeEvent),
      (i.originalEvent = t.originalEvent),
      this.copyPointerData(t, i),
      this.copyMouseData(t, i),
      this.copyData(t, i),
      (i.target = t.target),
      (i.path = t.composedPath().slice()),
      (i.type = e ?? i.type),
      i
    )
  }
  copyWheelData(t, e) {
    ;(e.deltaMode = t.deltaMode),
      (e.deltaX = t.deltaX),
      (e.deltaY = t.deltaY),
      (e.deltaZ = t.deltaZ)
  }
  copyPointerData(t, e) {
    t instanceof Me &&
      e instanceof Me &&
      ((e.pointerId = t.pointerId),
      (e.width = t.width),
      (e.height = t.height),
      (e.isPrimary = t.isPrimary),
      (e.pointerType = t.pointerType),
      (e.pressure = t.pressure),
      (e.tangentialPressure = t.tangentialPressure),
      (e.tiltX = t.tiltX),
      (e.tiltY = t.tiltY),
      (e.twist = t.twist))
  }
  copyMouseData(t, e) {
    t instanceof lo &&
      e instanceof lo &&
      ((e.altKey = t.altKey),
      (e.button = t.button),
      (e.buttons = t.buttons),
      e.client.copyFrom(t.client),
      (e.ctrlKey = t.ctrlKey),
      (e.metaKey = t.metaKey),
      e.movement.copyFrom(t.movement),
      e.screen.copyFrom(t.screen),
      (e.shiftKey = t.shiftKey),
      e.global.copyFrom(t.global))
  }
  copyData(t, e) {
    ;(e.isTrusted = t.isTrusted),
      (e.srcElement = t.srcElement),
      (e.timeStamp = performance.now()),
      (e.type = t.type),
      (e.detail = t.detail),
      (e.view = t.view),
      (e.which = t.which),
      e.layer.copyFrom(t.layer),
      e.page.copyFrom(t.page)
  }
  trackingData(t) {
    return (
      this.mappingState.trackingData[t] ||
        (this.mappingState.trackingData[t] = {
          pressTargetsByButton: {},
          clicksByButton: {},
          overTarget: null
        }),
      this.mappingState.trackingData[t]
    )
  }
  allocateEvent(t) {
    this.eventPool.has(t) || this.eventPool.set(t, [])
    const e = this.eventPool.get(t).pop() || new t(this)
    return (e.eventPhase = e.NONE), (e.currentTarget = null), (e.path = null), (e.target = null), e
  }
  freeEvent(t) {
    if (t.manager !== this)
      throw new Error('It is illegal to free an event not managed by this EventBoundary!')
    const e = t.constructor
    this.eventPool.has(e) || this.eventPool.set(e, []), this.eventPool.get(e).push(t)
  }
  notifyListeners(t, e) {
    const i = t.currentTarget._events[e]
    if (i && t.currentTarget.isInteractive())
      if ('fn' in i)
        i.once && t.currentTarget.removeListener(e, i.fn, void 0, !0), i.fn.call(i.context, t)
      else
        for (let s = 0, n = i.length; s < n && !t.propagationImmediatelyStopped; s++)
          i[s].once && t.currentTarget.removeListener(e, i[s].fn, void 0, !0),
            i[s].fn.call(i[s].context, t)
  }
}
const _x = 1,
  yx = {
    touchstart: 'pointerdown',
    touchend: 'pointerup',
    touchendoutside: 'pointerupoutside',
    touchmove: 'pointermove',
    touchcancel: 'pointercancel'
  },
  Bh = class Fh {
    constructor(t) {
      ;(this.supportsTouchEvents = 'ontouchstart' in globalThis),
        (this.supportsPointerEvents = !!globalThis.PointerEvent),
        (this.domElement = null),
        (this.resolution = 1),
        (this.renderer = t),
        (this.rootBoundary = new gx(null)),
        Cr.init(this),
        (this.autoPreventDefault = !0),
        (this.eventsAdded = !1),
        (this.rootPointerEvent = new Me(null)),
        (this.rootWheelEvent = new Gi(null)),
        (this.cursorStyles = { default: 'inherit', pointer: 'pointer' }),
        (this.features = new Proxy(
          { ...Fh.defaultEventFeatures },
          {
            set: (e, i, s) => (
              i === 'globalMove' && (this.rootBoundary.enableGlobalMoveEvents = s), (e[i] = s), !0
            )
          }
        )),
        (this.onPointerDown = this.onPointerDown.bind(this)),
        (this.onPointerMove = this.onPointerMove.bind(this)),
        (this.onPointerUp = this.onPointerUp.bind(this)),
        (this.onPointerOverOut = this.onPointerOverOut.bind(this)),
        (this.onWheel = this.onWheel.bind(this))
    }
    static get defaultEventMode() {
      return this._defaultEventMode
    }
    init(t) {
      const { view: e, resolution: i } = this.renderer
      this.setTargetElement(e),
        (this.resolution = i),
        (Fh._defaultEventMode = t.eventMode ?? 'auto'),
        Object.assign(this.features, t.eventFeatures ?? {}),
        (this.rootBoundary.enableGlobalMoveEvents = this.features.globalMove)
    }
    resolutionChange(t) {
      this.resolution = t
    }
    destroy() {
      this.setTargetElement(null), (this.renderer = null)
    }
    setCursor(t) {
      t = t || 'default'
      let e = !0
      if (
        (globalThis.OffscreenCanvas && this.domElement instanceof OffscreenCanvas && (e = !1),
        this.currentCursor === t)
      )
        return
      this.currentCursor = t
      const i = this.cursorStyles[t]
      if (i)
        switch (typeof i) {
          case 'string':
            e && (this.domElement.style.cursor = i)
            break
          case 'function':
            i(t)
            break
          case 'object':
            e && Object.assign(this.domElement.style, i)
            break
        }
      else
        e &&
          typeof t == 'string' &&
          !Object.prototype.hasOwnProperty.call(this.cursorStyles, t) &&
          (this.domElement.style.cursor = t)
    }
    get pointer() {
      return this.rootPointerEvent
    }
    onPointerDown(t) {
      if (!this.features.click) return
      this.rootBoundary.rootTarget = this.renderer.lastObjectRendered
      const e = this.normalizeToPointerData(t)
      this.autoPreventDefault &&
        e[0].isNormalized &&
        (t.cancelable || !('cancelable' in t)) &&
        t.preventDefault()
      for (let i = 0, s = e.length; i < s; i++) {
        const n = e[i],
          o = this.bootstrapEvent(this.rootPointerEvent, n)
        this.rootBoundary.mapEvent(o)
      }
      this.setCursor(this.rootBoundary.cursor)
    }
    onPointerMove(t) {
      if (!this.features.move) return
      ;(this.rootBoundary.rootTarget = this.renderer.lastObjectRendered), Cr.pointerMoved()
      const e = this.normalizeToPointerData(t)
      for (let i = 0, s = e.length; i < s; i++) {
        const n = this.bootstrapEvent(this.rootPointerEvent, e[i])
        this.rootBoundary.mapEvent(n)
      }
      this.setCursor(this.rootBoundary.cursor)
    }
    onPointerUp(t) {
      if (!this.features.click) return
      this.rootBoundary.rootTarget = this.renderer.lastObjectRendered
      let e = t.target
      t.composedPath && t.composedPath().length > 0 && (e = t.composedPath()[0])
      const i = e !== this.domElement ? 'outside' : '',
        s = this.normalizeToPointerData(t)
      for (let n = 0, o = s.length; n < o; n++) {
        const a = this.bootstrapEvent(this.rootPointerEvent, s[n])
        ;(a.type += i), this.rootBoundary.mapEvent(a)
      }
      this.setCursor(this.rootBoundary.cursor)
    }
    onPointerOverOut(t) {
      if (!this.features.click) return
      this.rootBoundary.rootTarget = this.renderer.lastObjectRendered
      const e = this.normalizeToPointerData(t)
      for (let i = 0, s = e.length; i < s; i++) {
        const n = this.bootstrapEvent(this.rootPointerEvent, e[i])
        this.rootBoundary.mapEvent(n)
      }
      this.setCursor(this.rootBoundary.cursor)
    }
    onWheel(t) {
      if (!this.features.wheel) return
      const e = this.normalizeWheelEvent(t)
      ;(this.rootBoundary.rootTarget = this.renderer.lastObjectRendered),
        this.rootBoundary.mapEvent(e)
    }
    setTargetElement(t) {
      this.removeEvents(), (this.domElement = t), (Cr.domElement = t), this.addEvents()
    }
    addEvents() {
      if (this.eventsAdded || !this.domElement) return
      Cr.addTickerListener()
      const t = this.domElement.style
      t &&
        (globalThis.navigator.msPointerEnabled
          ? ((t.msContentZooming = 'none'), (t.msTouchAction = 'none'))
          : this.supportsPointerEvents && (t.touchAction = 'none')),
        this.supportsPointerEvents
          ? (globalThis.document.addEventListener('pointermove', this.onPointerMove, !0),
            this.domElement.addEventListener('pointerdown', this.onPointerDown, !0),
            this.domElement.addEventListener('pointerleave', this.onPointerOverOut, !0),
            this.domElement.addEventListener('pointerover', this.onPointerOverOut, !0),
            globalThis.addEventListener('pointerup', this.onPointerUp, !0))
          : (globalThis.document.addEventListener('mousemove', this.onPointerMove, !0),
            this.domElement.addEventListener('mousedown', this.onPointerDown, !0),
            this.domElement.addEventListener('mouseout', this.onPointerOverOut, !0),
            this.domElement.addEventListener('mouseover', this.onPointerOverOut, !0),
            globalThis.addEventListener('mouseup', this.onPointerUp, !0),
            this.supportsTouchEvents &&
              (this.domElement.addEventListener('touchstart', this.onPointerDown, !0),
              this.domElement.addEventListener('touchend', this.onPointerUp, !0),
              this.domElement.addEventListener('touchmove', this.onPointerMove, !0))),
        this.domElement.addEventListener('wheel', this.onWheel, { passive: !0, capture: !0 }),
        (this.eventsAdded = !0)
    }
    removeEvents() {
      if (!this.eventsAdded || !this.domElement) return
      Cr.removeTickerListener()
      const t = this.domElement.style
      globalThis.navigator.msPointerEnabled
        ? ((t.msContentZooming = ''), (t.msTouchAction = ''))
        : this.supportsPointerEvents && (t.touchAction = ''),
        this.supportsPointerEvents
          ? (globalThis.document.removeEventListener('pointermove', this.onPointerMove, !0),
            this.domElement.removeEventListener('pointerdown', this.onPointerDown, !0),
            this.domElement.removeEventListener('pointerleave', this.onPointerOverOut, !0),
            this.domElement.removeEventListener('pointerover', this.onPointerOverOut, !0),
            globalThis.removeEventListener('pointerup', this.onPointerUp, !0))
          : (globalThis.document.removeEventListener('mousemove', this.onPointerMove, !0),
            this.domElement.removeEventListener('mousedown', this.onPointerDown, !0),
            this.domElement.removeEventListener('mouseout', this.onPointerOverOut, !0),
            this.domElement.removeEventListener('mouseover', this.onPointerOverOut, !0),
            globalThis.removeEventListener('mouseup', this.onPointerUp, !0),
            this.supportsTouchEvents &&
              (this.domElement.removeEventListener('touchstart', this.onPointerDown, !0),
              this.domElement.removeEventListener('touchend', this.onPointerUp, !0),
              this.domElement.removeEventListener('touchmove', this.onPointerMove, !0))),
        this.domElement.removeEventListener('wheel', this.onWheel, !0),
        (this.domElement = null),
        (this.eventsAdded = !1)
    }
    mapPositionToPoint(t, e, i) {
      const s = this.domElement.isConnected
          ? this.domElement.getBoundingClientRect()
          : {
              x: 0,
              y: 0,
              width: this.domElement.width,
              height: this.domElement.height,
              left: 0,
              top: 0
            },
        n = 1 / this.resolution
      ;(t.x = (e - s.left) * (this.domElement.width / s.width) * n),
        (t.y = (i - s.top) * (this.domElement.height / s.height) * n)
    }
    normalizeToPointerData(t) {
      const e = []
      if (this.supportsTouchEvents && t instanceof TouchEvent)
        for (let i = 0, s = t.changedTouches.length; i < s; i++) {
          const n = t.changedTouches[i]
          typeof n.button > 'u' && (n.button = 0),
            typeof n.buttons > 'u' && (n.buttons = 1),
            typeof n.isPrimary > 'u' &&
              (n.isPrimary = t.touches.length === 1 && t.type === 'touchstart'),
            typeof n.width > 'u' && (n.width = n.radiusX || 1),
            typeof n.height > 'u' && (n.height = n.radiusY || 1),
            typeof n.tiltX > 'u' && (n.tiltX = 0),
            typeof n.tiltY > 'u' && (n.tiltY = 0),
            typeof n.pointerType > 'u' && (n.pointerType = 'touch'),
            typeof n.pointerId > 'u' && (n.pointerId = n.identifier || 0),
            typeof n.pressure > 'u' && (n.pressure = n.force || 0.5),
            typeof n.twist > 'u' && (n.twist = 0),
            typeof n.tangentialPressure > 'u' && (n.tangentialPressure = 0),
            typeof n.layerX > 'u' && (n.layerX = n.offsetX = n.clientX),
            typeof n.layerY > 'u' && (n.layerY = n.offsetY = n.clientY),
            (n.isNormalized = !0),
            (n.type = t.type),
            e.push(n)
        }
      else if (
        !globalThis.MouseEvent ||
        (t instanceof MouseEvent &&
          (!this.supportsPointerEvents || !(t instanceof globalThis.PointerEvent)))
      ) {
        const i = t
        typeof i.isPrimary > 'u' && (i.isPrimary = !0),
          typeof i.width > 'u' && (i.width = 1),
          typeof i.height > 'u' && (i.height = 1),
          typeof i.tiltX > 'u' && (i.tiltX = 0),
          typeof i.tiltY > 'u' && (i.tiltY = 0),
          typeof i.pointerType > 'u' && (i.pointerType = 'mouse'),
          typeof i.pointerId > 'u' && (i.pointerId = _x),
          typeof i.pressure > 'u' && (i.pressure = 0.5),
          typeof i.twist > 'u' && (i.twist = 0),
          typeof i.tangentialPressure > 'u' && (i.tangentialPressure = 0),
          (i.isNormalized = !0),
          e.push(i)
      } else e.push(t)
      return e
    }
    normalizeWheelEvent(t) {
      const e = this.rootWheelEvent
      return (
        this.transferMouseData(e, t),
        (e.deltaX = t.deltaX),
        (e.deltaY = t.deltaY),
        (e.deltaZ = t.deltaZ),
        (e.deltaMode = t.deltaMode),
        this.mapPositionToPoint(e.screen, t.clientX, t.clientY),
        e.global.copyFrom(e.screen),
        e.offset.copyFrom(e.screen),
        (e.nativeEvent = t),
        (e.type = t.type),
        e
      )
    }
    bootstrapEvent(t, e) {
      return (
        (t.originalEvent = null),
        (t.nativeEvent = e),
        (t.pointerId = e.pointerId),
        (t.width = e.width),
        (t.height = e.height),
        (t.isPrimary = e.isPrimary),
        (t.pointerType = e.pointerType),
        (t.pressure = e.pressure),
        (t.tangentialPressure = e.tangentialPressure),
        (t.tiltX = e.tiltX),
        (t.tiltY = e.tiltY),
        (t.twist = e.twist),
        this.transferMouseData(t, e),
        this.mapPositionToPoint(t.screen, e.clientX, e.clientY),
        t.global.copyFrom(t.screen),
        t.offset.copyFrom(t.screen),
        (t.isTrusted = e.isTrusted),
        t.type === 'pointerleave' && (t.type = 'pointerout'),
        t.type.startsWith('mouse') && (t.type = t.type.replace('mouse', 'pointer')),
        t.type.startsWith('touch') && (t.type = yx[t.type] || t.type),
        t
      )
    }
    transferMouseData(t, e) {
      ;(t.isTrusted = e.isTrusted),
        (t.srcElement = e.srcElement),
        (t.timeStamp = performance.now()),
        (t.type = e.type),
        (t.altKey = e.altKey),
        (t.button = e.button),
        (t.buttons = e.buttons),
        (t.client.x = e.clientX),
        (t.client.y = e.clientY),
        (t.ctrlKey = e.ctrlKey),
        (t.metaKey = e.metaKey),
        (t.movement.x = e.movementX),
        (t.movement.y = e.movementY),
        (t.page.x = e.pageX),
        (t.page.y = e.pageY),
        (t.relatedTarget = null),
        (t.shiftKey = e.shiftKey)
    }
  }
;(Bh.extension = { name: 'events', type: [j.RendererSystem, j.CanvasRendererSystem] }),
  (Bh.defaultEventFeatures = { move: !0, globalMove: !0, click: !0, wheel: !0 })
let Dh = Bh
q.add(Dh)
function Su(r) {
  return r === 'dynamic' || r === 'static'
}
const Ax = {
  onclick: null,
  onmousedown: null,
  onmouseenter: null,
  onmouseleave: null,
  onmousemove: null,
  onglobalmousemove: null,
  onmouseout: null,
  onmouseover: null,
  onmouseup: null,
  onmouseupoutside: null,
  onpointercancel: null,
  onpointerdown: null,
  onpointerenter: null,
  onpointerleave: null,
  onpointermove: null,
  onglobalpointermove: null,
  onpointerout: null,
  onpointerover: null,
  onpointertap: null,
  onpointerup: null,
  onpointerupoutside: null,
  onrightclick: null,
  onrightdown: null,
  onrightup: null,
  onrightupoutside: null,
  ontap: null,
  ontouchcancel: null,
  ontouchend: null,
  ontouchendoutside: null,
  ontouchmove: null,
  onglobaltouchmove: null,
  ontouchstart: null,
  onwheel: null,
  _internalInteractive: void 0,
  get interactive() {
    return this._internalInteractive ?? Su(Dh.defaultEventMode)
  },
  set interactive(r) {
    ut(
      '7.2.0',
      "Setting interactive is deprecated, use eventMode = 'none'/'passive'/'auto'/'static'/'dynamic' instead."
    ),
      (this._internalInteractive = r),
      (this.eventMode = r ? 'static' : 'auto')
  },
  _internalEventMode: void 0,
  get eventMode() {
    return this._internalEventMode ?? Dh.defaultEventMode
  },
  set eventMode(r) {
    ;(this._internalInteractive = Su(r)), (this._internalEventMode = r)
  },
  isInteractive() {
    return this.eventMode === 'static' || this.eventMode === 'dynamic'
  },
  interactiveChildren: !0,
  hitArea: null,
  addEventListener(r, t, e) {
    const i = (typeof e == 'boolean' && e) || (typeof e == 'object' && e.capture),
      s = typeof e == 'object' ? e.signal : void 0,
      n = typeof e == 'object' ? e.once === !0 : !1,
      o = typeof t == 'function' ? void 0 : t
    r = i ? `${r}capture` : r
    const a = typeof t == 'function' ? t : t.handleEvent,
      h = this
    s &&
      s.addEventListener('abort', () => {
        h.off(r, a, o)
      }),
      n ? h.once(r, a, o) : h.on(r, a, o)
  },
  removeEventListener(r, t, e) {
    const i = (typeof e == 'boolean' && e) || (typeof e == 'object' && e.capture),
      s = typeof t == 'function' ? void 0 : t
    ;(r = i ? `${r}capture` : r),
      (t = typeof t == 'function' ? t : t.handleEvent),
      this.off(r, t, s)
  },
  dispatchEvent(r) {
    if (!(r instanceof $s))
      throw new Error('DisplayObject cannot propagate events outside of the Federated Events API')
    return (
      (r.defaultPrevented = !1),
      (r.path = null),
      (r.target = this),
      r.manager.dispatchEvent(r),
      !r.defaultPrevented
    )
  }
}
Dt.mixin(Ax)
const vx = {
  accessible: !1,
  accessibleTitle: null,
  accessibleHint: null,
  tabIndex: 0,
  _accessibleActive: !1,
  _accessibleDiv: null,
  accessibleType: 'button',
  accessiblePointerEvents: 'auto',
  accessibleChildren: !0,
  renderId: -1
}
Dt.mixin(vx)
const xx = 9,
  An = 100,
  bx = 0,
  Ex = 0,
  Cu = 2,
  Iu = 1,
  Tx = -1e3,
  wx = -1e3,
  Sx = 2
class Cp {
  constructor(t) {
    ;(this.debug = !1),
      (this._isActive = !1),
      (this._isMobileAccessibility = !1),
      (this.pool = []),
      (this.renderId = 0),
      (this.children = []),
      (this.androidUpdateCount = 0),
      (this.androidUpdateFrequency = 500),
      (this._hookDiv = null),
      (lr.tablet || lr.phone) && this.createTouchHook()
    const e = document.createElement('div')
    ;(e.style.width = `${An}px`),
      (e.style.height = `${An}px`),
      (e.style.position = 'absolute'),
      (e.style.top = `${bx}px`),
      (e.style.left = `${Ex}px`),
      (e.style.zIndex = Cu.toString()),
      (this.div = e),
      (this.renderer = t),
      (this._onKeyDown = this._onKeyDown.bind(this)),
      (this._onMouseMove = this._onMouseMove.bind(this)),
      globalThis.addEventListener('keydown', this._onKeyDown, !1)
  }
  get isActive() {
    return this._isActive
  }
  get isMobileAccessibility() {
    return this._isMobileAccessibility
  }
  createTouchHook() {
    const t = document.createElement('button')
    ;(t.style.width = `${Iu}px`),
      (t.style.height = `${Iu}px`),
      (t.style.position = 'absolute'),
      (t.style.top = `${Tx}px`),
      (t.style.left = `${wx}px`),
      (t.style.zIndex = Sx.toString()),
      (t.style.backgroundColor = '#FF0000'),
      (t.title = 'select to enable accessibility for this content'),
      t.addEventListener('focus', () => {
        ;(this._isMobileAccessibility = !0), this.activate(), this.destroyTouchHook()
      }),
      document.body.appendChild(t),
      (this._hookDiv = t)
  }
  destroyTouchHook() {
    this._hookDiv && (document.body.removeChild(this._hookDiv), (this._hookDiv = null))
  }
  activate() {
    var t
    this._isActive ||
      ((this._isActive = !0),
      globalThis.document.addEventListener('mousemove', this._onMouseMove, !0),
      globalThis.removeEventListener('keydown', this._onKeyDown, !1),
      this.renderer.on('postrender', this.update, this),
      (t = this.renderer.view.parentNode) == null || t.appendChild(this.div))
  }
  deactivate() {
    var t
    !this._isActive ||
      this._isMobileAccessibility ||
      ((this._isActive = !1),
      globalThis.document.removeEventListener('mousemove', this._onMouseMove, !0),
      globalThis.addEventListener('keydown', this._onKeyDown, !1),
      this.renderer.off('postrender', this.update),
      (t = this.div.parentNode) == null || t.removeChild(this.div))
  }
  updateAccessibleObjects(t) {
    if (!t.visible || !t.accessibleChildren) return
    t.accessible &&
      t.isInteractive() &&
      (t._accessibleActive || this.addChild(t), (t.renderId = this.renderId))
    const e = t.children
    if (e) for (let i = 0; i < e.length; i++) this.updateAccessibleObjects(e[i])
  }
  update() {
    const t = performance.now()
    if (
      (lr.android.device && t < this.androidUpdateCount) ||
      ((this.androidUpdateCount = t + this.androidUpdateFrequency),
      !this.renderer.renderingToScreen)
    )
      return
    this.renderer.lastObjectRendered &&
      this.updateAccessibleObjects(this.renderer.lastObjectRendered)
    const { x: e, y: i, width: s, height: n } = this.renderer.view.getBoundingClientRect(),
      { width: o, height: a, resolution: h } = this.renderer,
      l = (s / o) * h,
      c = (n / a) * h
    let u = this.div
    ;(u.style.left = `${e}px`),
      (u.style.top = `${i}px`),
      (u.style.width = `${o}px`),
      (u.style.height = `${a}px`)
    for (let d = 0; d < this.children.length; d++) {
      const f = this.children[d]
      if (f.renderId !== this.renderId)
        (f._accessibleActive = !1),
          Ui(this.children, d, 1),
          this.div.removeChild(f._accessibleDiv),
          this.pool.push(f._accessibleDiv),
          (f._accessibleDiv = null),
          d--
      else {
        u = f._accessibleDiv
        let p = f.hitArea
        const m = f.worldTransform
        f.hitArea
          ? ((u.style.left = `${(m.tx + p.x * m.a) * l}px`),
            (u.style.top = `${(m.ty + p.y * m.d) * c}px`),
            (u.style.width = `${p.width * m.a * l}px`),
            (u.style.height = `${p.height * m.d * c}px`))
          : ((p = f.getBounds()),
            this.capHitArea(p),
            (u.style.left = `${p.x * l}px`),
            (u.style.top = `${p.y * c}px`),
            (u.style.width = `${p.width * l}px`),
            (u.style.height = `${p.height * c}px`),
            u.title !== f.accessibleTitle &&
              f.accessibleTitle !== null &&
              (u.title = f.accessibleTitle),
            u.getAttribute('aria-label') !== f.accessibleHint &&
              f.accessibleHint !== null &&
              u.setAttribute('aria-label', f.accessibleHint)),
          (f.accessibleTitle !== u.title || f.tabIndex !== u.tabIndex) &&
            ((u.title = f.accessibleTitle),
            (u.tabIndex = f.tabIndex),
            this.debug && this.updateDebugHTML(u))
      }
    }
    this.renderId++
  }
  updateDebugHTML(t) {
    t.innerHTML = `type: ${t.type}</br> title : ${t.title}</br> tabIndex: ${t.tabIndex}`
  }
  capHitArea(t) {
    t.x < 0 && ((t.width += t.x), (t.x = 0)), t.y < 0 && ((t.height += t.y), (t.y = 0))
    const { width: e, height: i } = this.renderer
    t.x + t.width > e && (t.width = e - t.x), t.y + t.height > i && (t.height = i - t.y)
  }
  addChild(t) {
    let e = this.pool.pop()
    e ||
      ((e = document.createElement('button')),
      (e.style.width = `${An}px`),
      (e.style.height = `${An}px`),
      (e.style.backgroundColor = this.debug ? 'rgba(255,255,255,0.5)' : 'transparent'),
      (e.style.position = 'absolute'),
      (e.style.zIndex = Cu.toString()),
      (e.style.borderStyle = 'none'),
      navigator.userAgent.toLowerCase().includes('chrome')
        ? e.setAttribute('aria-live', 'off')
        : e.setAttribute('aria-live', 'polite'),
      navigator.userAgent.match(/rv:.*Gecko\//)
        ? e.setAttribute('aria-relevant', 'additions')
        : e.setAttribute('aria-relevant', 'text'),
      e.addEventListener('click', this._onClick.bind(this)),
      e.addEventListener('focus', this._onFocus.bind(this)),
      e.addEventListener('focusout', this._onFocusOut.bind(this))),
      (e.style.pointerEvents = t.accessiblePointerEvents),
      (e.type = t.accessibleType),
      t.accessibleTitle && t.accessibleTitle !== null
        ? (e.title = t.accessibleTitle)
        : (!t.accessibleHint || t.accessibleHint === null) &&
          (e.title = `displayObject ${t.tabIndex}`),
      t.accessibleHint &&
        t.accessibleHint !== null &&
        e.setAttribute('aria-label', t.accessibleHint),
      this.debug && this.updateDebugHTML(e),
      (t._accessibleActive = !0),
      (t._accessibleDiv = e),
      (e.displayObject = t),
      this.children.push(t),
      this.div.appendChild(t._accessibleDiv),
      (t._accessibleDiv.tabIndex = t.tabIndex)
  }
  _dispatchEvent(t, e) {
    const { displayObject: i } = t.target,
      s = this.renderer.events.rootBoundary,
      n = Object.assign(new $s(s), { target: i })
    ;(s.rootTarget = this.renderer.lastObjectRendered), e.forEach((o) => s.dispatchEvent(n, o))
  }
  _onClick(t) {
    this._dispatchEvent(t, ['click', 'pointertap', 'tap'])
  }
  _onFocus(t) {
    t.target.getAttribute('aria-live') || t.target.setAttribute('aria-live', 'assertive'),
      this._dispatchEvent(t, ['mouseover'])
  }
  _onFocusOut(t) {
    t.target.getAttribute('aria-live') || t.target.setAttribute('aria-live', 'polite'),
      this._dispatchEvent(t, ['mouseout'])
  }
  _onKeyDown(t) {
    t.keyCode === xx && this.activate()
  }
  _onMouseMove(t) {
    ;(t.movementX === 0 && t.movementY === 0) || this.deactivate()
  }
  destroy() {
    this.destroyTouchHook(),
      (this.div = null),
      globalThis.document.removeEventListener('mousemove', this._onMouseMove, !0),
      globalThis.removeEventListener('keydown', this._onKeyDown),
      (this.pool = null),
      (this.children = null),
      (this.renderer = null)
  }
}
Cp.extension = { name: 'accessibility', type: [j.RendererPlugin, j.CanvasRendererPlugin] }
q.add(Cp)
const Ip = class Oh {
  constructor(t) {
    ;(this.stage = new he()),
      (t = Object.assign({ forceCanvas: !1 }, t)),
      (this.renderer = Hv(t)),
      Oh._plugins.forEach((e) => {
        e.init.call(this, t)
      })
  }
  render() {
    this.renderer.render(this.stage)
  }
  get view() {
    var t
    return (t = this.renderer) == null ? void 0 : t.view
  }
  get screen() {
    var t
    return (t = this.renderer) == null ? void 0 : t.screen
  }
  destroy(t, e) {
    const i = Oh._plugins.slice(0)
    i.reverse(),
      i.forEach((s) => {
        s.destroy.call(this)
      }),
      this.stage.destroy(e),
      (this.stage = null),
      this.renderer.destroy(t),
      (this.renderer = null)
  }
}
Ip._plugins = []
let Rp = Ip
q.handleByList(j.Application, Rp._plugins)
class Pp {
  static init(t) {
    Object.defineProperty(this, 'resizeTo', {
      set(e) {
        globalThis.removeEventListener('resize', this.queueResize),
          (this._resizeTo = e),
          e && (globalThis.addEventListener('resize', this.queueResize), this.resize())
      },
      get() {
        return this._resizeTo
      }
    }),
      (this.queueResize = () => {
        this._resizeTo &&
          (this.cancelResize(), (this._resizeId = requestAnimationFrame(() => this.resize())))
      }),
      (this.cancelResize = () => {
        this._resizeId && (cancelAnimationFrame(this._resizeId), (this._resizeId = null))
      }),
      (this.resize = () => {
        if (!this._resizeTo) return
        this.cancelResize()
        let e, i
        if (this._resizeTo === globalThis.window)
          (e = globalThis.innerWidth), (i = globalThis.innerHeight)
        else {
          const { clientWidth: s, clientHeight: n } = this._resizeTo
          ;(e = s), (i = n)
        }
        this.renderer.resize(e, i), this.render()
      }),
      (this._resizeId = null),
      (this._resizeTo = null),
      (this.resizeTo = t.resizeTo || null)
  }
  static destroy() {
    globalThis.removeEventListener('resize', this.queueResize),
      this.cancelResize(),
      (this.cancelResize = null),
      (this.queueResize = null),
      (this.resizeTo = null),
      (this.resize = null)
  }
}
Pp.extension = j.Application
q.add(Pp)
const Ru = {
  loader: j.LoadParser,
  resolver: j.ResolveParser,
  cache: j.CacheParser,
  detection: j.DetectionParser
}
q.handle(
  j.Asset,
  (r) => {
    const t = r.ref
    Object.entries(Ru)
      .filter(([e]) => !!t[e])
      .forEach(([e, i]) => q.add(Object.assign(t[e], { extension: t[e].extension ?? i })))
  },
  (r) => {
    const t = r.ref
    Object.keys(Ru)
      .filter((e) => !!t[e])
      .forEach((e) => q.remove(t[e]))
  }
)
class Cx {
  constructor(t, e = !1) {
    ;(this._loader = t),
      (this._assetList = []),
      (this._isLoading = !1),
      (this._maxConcurrent = 1),
      (this.verbose = e)
  }
  add(t) {
    t.forEach((e) => {
      this._assetList.push(e)
    }),
      this.verbose && console.log('[BackgroundLoader] assets: ', this._assetList),
      this._isActive && !this._isLoading && this._next()
  }
  async _next() {
    if (this._assetList.length && this._isActive) {
      this._isLoading = !0
      const t = [],
        e = Math.min(this._assetList.length, this._maxConcurrent)
      for (let i = 0; i < e; i++) t.push(this._assetList.pop())
      await this._loader.load(t), (this._isLoading = !1), this._next()
    }
  }
  get active() {
    return this._isActive
  }
  set active(t) {
    this._isActive !== t && ((this._isActive = t), t && !this._isLoading && this._next())
  }
}
function qi(r, t) {
  if (Array.isArray(t)) {
    for (const e of t) if (r.startsWith(`data:${e}`)) return !0
    return !1
  }
  return r.startsWith(`data:${t}`)
}
function Gr(r, t) {
  const e = r.split('?')[0],
    i = Kt.extname(e).toLowerCase()
  return Array.isArray(t) ? t.includes(i) : i === t
}
const Be = (r, t, e = !1) => (
    Array.isArray(r) || (r = [r]), t ? r.map((i) => (typeof i == 'string' || e ? t(i) : i)) : r
  ),
  Lh = (r, t) => {
    const e = t.split('?')[1]
    return e && (r += `?${e}`), r
  }
function Mp(r, t, e, i, s) {
  const n = t[e]
  for (let o = 0; o < n.length; o++) {
    const a = n[o]
    e < t.length - 1 ? Mp(r.replace(i[e], a), t, e + 1, i, s) : s.push(r.replace(i[e], a))
  }
}
function Ix(r) {
  const t = /\{(.*?)\}/g,
    e = r.match(t),
    i = []
  if (e) {
    const s = []
    e.forEach((n) => {
      const o = n.substring(1, n.length - 1).split(',')
      s.push(o)
    }),
      Mp(r, s, 0, e, i)
  } else i.push(r)
  return i
}
const co = (r) => !Array.isArray(r)
class Rx {
  constructor() {
    ;(this._parsers = []), (this._cache = new Map()), (this._cacheMap = new Map())
  }
  reset() {
    this._cacheMap.clear(), this._cache.clear()
  }
  has(t) {
    return this._cache.has(t)
  }
  get(t) {
    const e = this._cache.get(t)
    return e || console.warn(`[Assets] Asset id ${t} was not found in the Cache`), e
  }
  set(t, e) {
    const i = Be(t)
    let s
    for (let a = 0; a < this.parsers.length; a++) {
      const h = this.parsers[a]
      if (h.test(e)) {
        s = h.getCacheableAssets(i, e)
        break
      }
    }
    s ||
      ((s = {}),
      i.forEach((a) => {
        s[a] = e
      }))
    const n = Object.keys(s),
      o = { cacheKeys: n, keys: i }
    if (
      (i.forEach((a) => {
        this._cacheMap.set(a, o)
      }),
      n.forEach((a) => {
        this._cache.has(a) &&
          this._cache.get(a) !== e &&
          console.warn('[Cache] already has key:', a),
          this._cache.set(a, s[a])
      }),
      e instanceof X)
    ) {
      const a = e
      i.forEach((h) => {
        a.baseTexture !== X.EMPTY.baseTexture && ht.addToCache(a.baseTexture, h), X.addToCache(a, h)
      })
    }
  }
  remove(t) {
    if (!this._cacheMap.has(t)) {
      console.warn(`[Assets] Asset id ${t} was not found in the Cache`)
      return
    }
    const e = this._cacheMap.get(t)
    e.cacheKeys.forEach((i) => {
      this._cache.delete(i)
    }),
      e.keys.forEach((i) => {
        this._cacheMap.delete(i)
      })
  }
  get parsers() {
    return this._parsers
  }
}
const ti = new Rx()
class Px {
  constructor() {
    ;(this._parsers = []),
      (this._parsersValidated = !1),
      (this.parsers = new Proxy(this._parsers, {
        set: (t, e, i) => ((this._parsersValidated = !1), (t[e] = i), !0)
      })),
      (this.promiseCache = {})
  }
  reset() {
    ;(this._parsersValidated = !1), (this.promiseCache = {})
  }
  _getLoadPromiseAndParser(t, e) {
    const i = { promise: null, parser: null }
    return (
      (i.promise = (async () => {
        var o, a
        let s = null,
          n = null
        if (
          (e.loadParser &&
            ((n = this._parserHash[e.loadParser]),
            n ||
              console.warn(
                `[Assets] specified load parser "${e.loadParser}" not found while loading ${t}`
              )),
          !n)
        ) {
          for (let h = 0; h < this.parsers.length; h++) {
            const l = this.parsers[h]
            if (l.load && (o = l.test) != null && o.call(l, t, e, this)) {
              n = l
              break
            }
          }
          if (!n)
            return (
              console.warn(
                `[Assets] ${t} could not be loaded as we don't know how to parse it, ensure the correct parser has been added`
              ),
              null
            )
        }
        ;(s = await n.load(t, e, this)), (i.parser = n)
        for (let h = 0; h < this.parsers.length; h++) {
          const l = this.parsers[h]
          l.parse &&
            l.parse &&
            (await ((a = l.testParse) == null ? void 0 : a.call(l, s, e, this))) &&
            ((s = (await l.parse(s, e, this)) || s), (i.parser = l))
        }
        return s
      })()),
      i
    )
  }
  async load(t, e) {
    this._parsersValidated || this._validateParsers()
    let i = 0
    const s = {},
      n = co(t),
      o = Be(t, (l) => ({ alias: [l], src: l })),
      a = o.length,
      h = o.map(async (l) => {
        const c = Kt.toAbsolute(l.src)
        if (!s[l.src])
          try {
            this.promiseCache[c] || (this.promiseCache[c] = this._getLoadPromiseAndParser(c, l)),
              (s[l.src] = await this.promiseCache[c].promise),
              e && e(++i / a)
          } catch (u) {
            throw (
              (delete this.promiseCache[c],
              delete s[l.src],
              new Error(`[Loader.load] Failed to load ${c}.
${u}`))
            )
          }
      })
    return await Promise.all(h), n ? s[o[0].src] : s
  }
  async unload(t) {
    const e = Be(t, (i) => ({ alias: [i], src: i })).map(async (i) => {
      var o, a
      const s = Kt.toAbsolute(i.src),
        n = this.promiseCache[s]
      if (n) {
        const h = await n.promise
        delete this.promiseCache[s],
          (a = (o = n.parser) == null ? void 0 : o.unload) == null || a.call(o, h, i, this)
      }
    })
    await Promise.all(e)
  }
  _validateParsers() {
    ;(this._parsersValidated = !0),
      (this._parserHash = this._parsers
        .filter((t) => t.name)
        .reduce(
          (t, e) => (
            t[e.name] && console.warn(`[Assets] loadParser name conflict "${e.name}"`),
            { ...t, [e.name]: e }
          ),
          {}
        ))
  }
}
var Ne = ((r) => (
  (r[(r.Low = 0)] = 'Low'), (r[(r.Normal = 1)] = 'Normal'), (r[(r.High = 2)] = 'High'), r
))(Ne || {})
const Mx = '.json',
  Bx = 'application/json',
  Fx = {
    extension: { type: j.LoadParser, priority: Ne.Low },
    name: 'loadJson',
    test(r) {
      return qi(r, Bx) || Gr(r, Mx)
    },
    async load(r) {
      return await (await Y.ADAPTER.fetch(r)).json()
    }
  }
q.add(Fx)
const Dx = '.txt',
  Ox = 'text/plain',
  Lx = {
    name: 'loadTxt',
    extension: { type: j.LoadParser, priority: Ne.Low },
    test(r) {
      return qi(r, Ox) || Gr(r, Dx)
    },
    async load(r) {
      return await (await Y.ADAPTER.fetch(r)).text()
    }
  }
q.add(Lx)
const Nx = ['normal', 'bold', '100', '200', '300', '400', '500', '600', '700', '800', '900'],
  Ux = ['.ttf', '.otf', '.woff', '.woff2'],
  kx = ['font/ttf', 'font/otf', 'font/woff', 'font/woff2'],
  Gx = /^(--|-?[A-Z_])[0-9A-Z_-]*$/i
function Hx(r) {
  const t = Kt.extname(r),
    e = Kt.basename(r, t)
      .replace(/(-|_)/g, ' ')
      .toLowerCase()
      .split(' ')
      .map((n) => n.charAt(0).toUpperCase() + n.slice(1))
  let i = e.length > 0
  for (const n of e)
    if (!n.match(Gx)) {
      i = !1
      break
    }
  let s = e.join(' ')
  return i || (s = `"${s.replace(/[\\"]/g, '\\$&')}"`), s
}
const Vx = /^[0-9A-Za-z%:/?#\[\]@!\$&'()\*\+,;=\-._~]*$/
function Xx(r) {
  return Vx.test(r) ? r : encodeURI(r)
}
const jx = {
  extension: { type: j.LoadParser, priority: Ne.Low },
  name: 'loadWebFont',
  test(r) {
    return qi(r, kx) || Gr(r, Ux)
  },
  async load(r, t) {
    var i, s, n
    const e = Y.ADAPTER.getFontFaceSet()
    if (e) {
      const o = [],
        a = ((i = t.data) == null ? void 0 : i.family) ?? Hx(r),
        h = ((n = (s = t.data) == null ? void 0 : s.weights) == null
          ? void 0
          : n.filter((c) => Nx.includes(c))) ?? ['normal'],
        l = t.data ?? {}
      for (let c = 0; c < h.length; c++) {
        const u = h[c],
          d = new FontFace(a, `url(${Xx(r)})`, { ...l, weight: u })
        await d.load(), e.add(d), o.push(d)
      }
      return o.length === 1 ? o[0] : o
    }
    return console.warn('[loadWebFont] FontFace API is not supported. Skipping loading font'), null
  },
  unload(r) {
    ;(Array.isArray(r) ? r : [r]).forEach((t) => Y.ADAPTER.getFontFaceSet().delete(t))
  }
}
q.add(jx)
const Wx = `(function() {
  "use strict";
  const WHITE_PNG = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII=";
  async function checkImageBitmap() {
    try {
      if (typeof createImageBitmap != "function")
        return !1;
      const imageBlob = await (await fetch(WHITE_PNG)).blob(), imageBitmap = await createImageBitmap(imageBlob);
      return imageBitmap.width === 1 && imageBitmap.height === 1;
    } catch {
      return !1;
    }
  }
  checkImageBitmap().then((result) => {
    self.postMessage(result);
  });
})();
`
let Hi = null,
  Nh = class {
    constructor() {
      Hi || (Hi = URL.createObjectURL(new Blob([Wx], { type: 'application/javascript' }))),
        (this.worker = new Worker(Hi))
    }
  }
Nh.revokeObjectURL = function () {
  Hi && (URL.revokeObjectURL(Hi), (Hi = null))
}
const $x = `(function() {
  "use strict";
  async function loadImageBitmap(url) {
    const response = await fetch(url);
    if (!response.ok)
      throw new Error(\`[WorkerManager.loadImageBitmap] Failed to fetch \${url}: \${response.status} \${response.statusText}\`);
    const imageBlob = await response.blob();
    return await createImageBitmap(imageBlob);
  }
  self.onmessage = async (event) => {
    try {
      const imageBitmap = await loadImageBitmap(event.data.data[0]);
      self.postMessage({
        data: imageBitmap,
        uuid: event.data.uuid,
        id: event.data.id
      }, [imageBitmap]);
    } catch (e) {
      self.postMessage({
        error: e,
        uuid: event.data.uuid,
        id: event.data.id
      });
    }
  };
})();
`
let Vi = null
class Bp {
  constructor() {
    Vi || (Vi = URL.createObjectURL(new Blob([$x], { type: 'application/javascript' }))),
      (this.worker = new Worker(Vi))
  }
}
Bp.revokeObjectURL = function () {
  Vi && (URL.revokeObjectURL(Vi), (Vi = null))
}
let Pu = 0,
  Ca
class zx {
  constructor() {
    ;(this._initialized = !1),
      (this._createdWorkers = 0),
      (this.workerPool = []),
      (this.queue = []),
      (this.resolveHash = {})
  }
  isImageBitmapSupported() {
    return this._isImageBitmapSupported !== void 0
      ? this._isImageBitmapSupported
      : ((this._isImageBitmapSupported = new Promise((t) => {
          const { worker: e } = new Nh()
          e.addEventListener('message', (i) => {
            e.terminate(), Nh.revokeObjectURL(), t(i.data)
          })
        })),
        this._isImageBitmapSupported)
  }
  loadImageBitmap(t) {
    return this._run('loadImageBitmap', [t])
  }
  async _initWorkers() {
    this._initialized || (this._initialized = !0)
  }
  getWorker() {
    Ca === void 0 && (Ca = navigator.hardwareConcurrency || 4)
    let t = this.workerPool.pop()
    return (
      !t &&
        this._createdWorkers < Ca &&
        (this._createdWorkers++,
        (t = new Bp().worker),
        t.addEventListener('message', (e) => {
          this.complete(e.data), this.returnWorker(e.target), this.next()
        })),
      t
    )
  }
  returnWorker(t) {
    this.workerPool.push(t)
  }
  complete(t) {
    t.error !== void 0
      ? this.resolveHash[t.uuid].reject(t.error)
      : this.resolveHash[t.uuid].resolve(t.data),
      (this.resolveHash[t.uuid] = null)
  }
  async _run(t, e) {
    await this._initWorkers()
    const i = new Promise((s, n) => {
      this.queue.push({ id: t, arguments: e, resolve: s, reject: n })
    })
    return this.next(), i
  }
  next() {
    if (!this.queue.length) return
    const t = this.getWorker()
    if (!t) return
    const e = this.queue.pop(),
      i = e.id
    ;(this.resolveHash[Pu] = { resolve: e.resolve, reject: e.reject }),
      t.postMessage({ data: e.arguments, uuid: Pu++, id: i })
  }
}
const Mu = new zx()
function zs(r, t, e) {
  r.resource.internal = !0
  const i = new X(r),
    s = () => {
      delete t.promiseCache[e], ti.has(e) && ti.remove(e)
    }
  return (
    i.baseTexture.once('destroyed', () => {
      e in t.promiseCache &&
        (console.warn(
          '[Assets] A BaseTexture managed by Assets was destroyed instead of unloaded! Use Assets.unload() instead of destroying the BaseTexture.'
        ),
        s())
    }),
    i.once('destroyed', () => {
      r.destroyed ||
        (console.warn(
          '[Assets] A Texture managed by Assets was destroyed instead of unloaded! Use Assets.unload() instead of destroying the Texture.'
        ),
        s())
    }),
    i
  )
}
const Yx = ['.jpeg', '.jpg', '.png', '.webp', '.avif'],
  Qx = ['image/jpeg', 'image/png', 'image/webp', 'image/avif']
async function Kx(r) {
  const t = await Y.ADAPTER.fetch(r)
  if (!t.ok) throw new Error(`[loadImageBitmap] Failed to fetch ${r}: ${t.status} ${t.statusText}`)
  const e = await t.blob()
  return await createImageBitmap(e)
}
const Lo = {
  name: 'loadTextures',
  extension: { type: j.LoadParser, priority: Ne.High },
  config: { preferWorkers: !0, preferCreateImageBitmap: !0, crossOrigin: 'anonymous' },
  test(r) {
    return qi(r, Qx) || Gr(r, Yx)
  },
  async load(r, t, e) {
    var a
    const i = globalThis.createImageBitmap && this.config.preferCreateImageBitmap
    let s
    i
      ? this.config.preferWorkers && (await Mu.isImageBitmapSupported())
        ? (s = await Mu.loadImageBitmap(r))
        : (s = await Kx(r))
      : (s = await new Promise((h, l) => {
          const c = new Image()
          ;(c.crossOrigin = this.config.crossOrigin),
            (c.src = r),
            c.complete ? h(c) : ((c.onload = () => h(c)), (c.onerror = (u) => l(u)))
        }))
    const n = { ...t.data }
    n.resolution ?? (n.resolution = mr(r)),
      i &&
        ((a = n.resourceOptions) == null ? void 0 : a.ownsImageBitmap) === void 0 &&
        ((n.resourceOptions = { ...n.resourceOptions }), (n.resourceOptions.ownsImageBitmap = !0))
    const o = new ht(s, n)
    return (o.resource.src = r), zs(o, e, r)
  },
  unload(r) {
    r.destroy(!0)
  }
}
q.add(Lo)
const qx = '.svg',
  Zx = 'image/svg+xml',
  Jx = {
    extension: { type: j.LoadParser, priority: Ne.High },
    name: 'loadSVG',
    test(r) {
      return qi(r, Zx) || Gr(r, qx)
    },
    async testParse(r) {
      return Ch.test(r)
    },
    async parse(r, t, e) {
      var n
      const i = new Ch(r, (n = t == null ? void 0 : t.data) == null ? void 0 : n.resourceOptions)
      await i.load()
      const s = new ht(i, { resolution: mr(r), ...(t == null ? void 0 : t.data) })
      return (s.resource.src = t.src), zs(s, e, t.src)
    },
    async load(r, t) {
      return (await Y.ADAPTER.fetch(r)).text()
    },
    unload: Lo.unload
  }
q.add(Jx)
const tb = ['.mp4', '.m4v', '.webm', '.ogv'],
  eb = ['video/mp4', 'video/webm', 'video/ogg'],
  rb = {
    name: 'loadVideo',
    extension: { type: j.LoadParser, priority: Ne.High },
    config: {
      defaultAutoPlay: !0,
      defaultUpdateFPS: 0,
      defaultLoop: !1,
      defaultMuted: !1,
      defaultPlaysinline: !0
    },
    test(r) {
      return qi(r, eb) || Gr(r, tb)
    },
    async load(r, t, e) {
      var o
      let i
      const s = await (await Y.ADAPTER.fetch(r)).blob(),
        n = URL.createObjectURL(s)
      try {
        const a = {
            autoPlay: this.config.defaultAutoPlay,
            updateFPS: this.config.defaultUpdateFPS,
            loop: this.config.defaultLoop,
            muted: this.config.defaultMuted,
            playsinline: this.config.defaultPlaysinline,
            ...((o = t == null ? void 0 : t.data) == null ? void 0 : o.resourceOptions),
            autoLoad: !0
          },
          h = new Ap(n, a)
        await h.load()
        const l = new ht(h, {
          alphaMode: await f0(),
          resolution: mr(r),
          ...(t == null ? void 0 : t.data)
        })
        ;(l.resource.src = r),
          (i = zs(l, e, r)),
          i.baseTexture.once('destroyed', () => {
            URL.revokeObjectURL(n)
          })
      } catch (a) {
        throw (URL.revokeObjectURL(n), a)
      }
      return i
    },
    unload(r) {
      r.destroy(!0)
    }
  }
q.add(rb)
class ib {
  constructor() {
    ;(this._defaultBundleIdentifierOptions = {
      connector: '-',
      createBundleAssetId: (t, e) => `${t}${this._bundleIdConnector}${e}`,
      extractAssetIdFromBundle: (t, e) => e.replace(`${t}${this._bundleIdConnector}`, '')
    }),
      (this._bundleIdConnector = this._defaultBundleIdentifierOptions.connector),
      (this._createBundleAssetId = this._defaultBundleIdentifierOptions.createBundleAssetId),
      (this._extractAssetIdFromBundle =
        this._defaultBundleIdentifierOptions.extractAssetIdFromBundle),
      (this._assetMap = {}),
      (this._preferredOrder = []),
      (this._parsers = []),
      (this._resolverHash = {}),
      (this._bundles = {})
  }
  setBundleIdentifier(t) {
    if (
      ((this._bundleIdConnector = t.connector ?? this._bundleIdConnector),
      (this._createBundleAssetId = t.createBundleAssetId ?? this._createBundleAssetId),
      (this._extractAssetIdFromBundle =
        t.extractAssetIdFromBundle ?? this._extractAssetIdFromBundle),
      this._extractAssetIdFromBundle('foo', this._createBundleAssetId('foo', 'bar')) !== 'bar')
    )
      throw new Error('[Resolver] GenerateBundleAssetId are not working correctly')
  }
  prefer(...t) {
    t.forEach((e) => {
      this._preferredOrder.push(e), e.priority || (e.priority = Object.keys(e.params))
    }),
      (this._resolverHash = {})
  }
  set basePath(t) {
    this._basePath = t
  }
  get basePath() {
    return this._basePath
  }
  set rootPath(t) {
    this._rootPath = t
  }
  get rootPath() {
    return this._rootPath
  }
  get parsers() {
    return this._parsers
  }
  reset() {
    this.setBundleIdentifier(this._defaultBundleIdentifierOptions),
      (this._assetMap = {}),
      (this._preferredOrder = []),
      (this._resolverHash = {}),
      (this._rootPath = null),
      (this._basePath = null),
      (this._manifest = null),
      (this._bundles = {}),
      (this._defaultSearchParams = null)
  }
  setDefaultSearchParams(t) {
    if (typeof t == 'string') this._defaultSearchParams = t
    else {
      const e = t
      this._defaultSearchParams = Object.keys(e)
        .map((i) => `${encodeURIComponent(i)}=${encodeURIComponent(e[i])}`)
        .join('&')
    }
  }
  getAlias(t) {
    const { alias: e, name: i, src: s, srcs: n } = t
    return Be(
      e || i || s || n,
      (o) =>
        typeof o == 'string'
          ? o
          : Array.isArray(o)
            ? o.map((a) => (a == null ? void 0 : a.src) ?? (a == null ? void 0 : a.srcs) ?? a)
            : (o != null && o.src) || (o != null && o.srcs)
              ? o.src ?? o.srcs
              : o,
      !0
    )
  }
  addManifest(t) {
    this._manifest && console.warn('[Resolver] Manifest already exists, this will be overwritten'),
      (this._manifest = t),
      t.bundles.forEach((e) => {
        this.addBundle(e.name, e.assets)
      })
  }
  addBundle(t, e) {
    const i = []
    Array.isArray(e)
      ? e.forEach((s) => {
          const n = s.src ?? s.srcs,
            o = s.alias ?? s.name
          let a
          if (typeof o == 'string') {
            const h = this._createBundleAssetId(t, o)
            i.push(h), (a = [o, h])
          } else {
            const h = o.map((l) => this._createBundleAssetId(t, l))
            i.push(...h), (a = [...o, ...h])
          }
          this.add({ ...s, alias: a, src: n })
        })
      : Object.keys(e).forEach((s) => {
          const n = [s, this._createBundleAssetId(t, s)]
          if (typeof e[s] == 'string') this.add({ alias: n, src: e[s] })
          else if (Array.isArray(e[s])) this.add({ alias: n, src: e[s] })
          else {
            const o = e[s],
              a = o.src ?? o.srcs
            this.add({ ...o, alias: n, src: Array.isArray(a) ? a : [a] })
          }
          i.push(...n)
        }),
      (this._bundles[t] = i)
  }
  add(t, e, i, s, n) {
    const o = []
    typeof t == 'string' || (Array.isArray(t) && typeof t[0] == 'string')
      ? (ut(
          '7.2.0',
          `Assets.add now uses an object instead of individual parameters.
Please use Assets.add({ alias, src, data, format, loadParser }) instead.`
        ),
        o.push({ alias: t, src: e, data: i, format: s, loadParser: n }))
      : Array.isArray(t)
        ? o.push(...t)
        : o.push(t)
    let a
    ;(a = (h) => {
      this.hasKey(h) && console.warn(`[Resolver] already has key: ${h} overwriting`)
    }),
      Be(o).forEach((h) => {
        const { src: l, srcs: c } = h
        let { data: u, format: d, loadParser: f } = h
        const p = Be(l || c).map((A) =>
            typeof A == 'string' ? Ix(A) : Array.isArray(A) ? A : [A]
          ),
          m = this.getAlias(h)
        Array.isArray(m) ? m.forEach(a) : a(m)
        const g = []
        p.forEach((A) => {
          A.forEach((x) => {
            let _ = {}
            if (typeof x != 'object') {
              _.src = x
              for (let v = 0; v < this._parsers.length; v++) {
                const S = this._parsers[v]
                if (S.test(x)) {
                  _ = S.parse(x)
                  break
                }
              }
            } else
              (u = x.data ?? u), (d = x.format ?? d), (f = x.loadParser ?? f), (_ = { ..._, ...x })
            if (!m) throw new Error(`[Resolver] alias is undefined for this asset: ${_.src}`)
            ;(_ = this.buildResolvedAsset(_, { aliases: m, data: u, format: d, loadParser: f })),
              g.push(_)
          })
        }),
          m.forEach((A) => {
            this._assetMap[A] = g
          })
      })
  }
  resolveBundle(t) {
    const e = co(t)
    t = Be(t)
    const i = {}
    return (
      t.forEach((s) => {
        const n = this._bundles[s]
        if (n) {
          const o = this.resolve(n),
            a = {}
          for (const h in o) {
            const l = o[h]
            a[this._extractAssetIdFromBundle(s, h)] = l
          }
          i[s] = a
        }
      }),
      e ? i[t[0]] : i
    )
  }
  resolveUrl(t) {
    const e = this.resolve(t)
    if (typeof t != 'string') {
      const i = {}
      for (const s in e) i[s] = e[s].src
      return i
    }
    return e.src
  }
  resolve(t) {
    const e = co(t)
    t = Be(t)
    const i = {}
    return (
      t.forEach((s) => {
        if (!this._resolverHash[s])
          if (this._assetMap[s]) {
            let n = this._assetMap[s]
            const o = n[0],
              a = this._getPreferredOrder(n)
            a == null ||
              a.priority.forEach((h) => {
                a.params[h].forEach((l) => {
                  const c = n.filter((u) => (u[h] ? u[h] === l : !1))
                  c.length && (n = c)
                })
              }),
              (this._resolverHash[s] = n[0] ?? o)
          } else this._resolverHash[s] = this.buildResolvedAsset({ alias: [s], src: s }, {})
        i[s] = this._resolverHash[s]
      }),
      e ? i[t[0]] : i
    )
  }
  hasKey(t) {
    return !!this._assetMap[t]
  }
  hasBundle(t) {
    return !!this._bundles[t]
  }
  _getPreferredOrder(t) {
    for (let e = 0; e < t.length; e++) {
      const i = t[0],
        s = this._preferredOrder.find((n) => n.params.format.includes(i.format))
      if (s) return s
    }
    return this._preferredOrder[0]
  }
  _appendDefaultSearchParams(t) {
    if (!this._defaultSearchParams) return t
    const e = /\?/.test(t) ? '&' : '?'
    return `${t}${e}${this._defaultSearchParams}`
  }
  buildResolvedAsset(t, e) {
    const { aliases: i, data: s, loadParser: n, format: o } = e
    return (
      (this._basePath || this._rootPath) &&
        (t.src = Kt.toAbsolute(t.src, this._basePath, this._rootPath)),
      (t.alias = i ?? t.alias ?? [t.src]),
      (t.src = this._appendDefaultSearchParams(t.src)),
      (t.data = { ...(s || {}), ...t.data }),
      (t.loadParser = n ?? t.loadParser),
      (t.format = o ?? t.format ?? Kt.extname(t.src).slice(1)),
      (t.srcs = t.src),
      (t.name = t.alias),
      t
    )
  }
}
class sb {
  constructor() {
    ;(this._detections = []),
      (this._initialized = !1),
      (this.resolver = new ib()),
      (this.loader = new Px()),
      (this.cache = ti),
      (this._backgroundLoader = new Cx(this.loader)),
      (this._backgroundLoader.active = !0),
      this.reset()
  }
  async init(t = {}) {
    var n, o
    if (this._initialized) {
      console.warn(
        '[Assets]AssetManager already initialized, did you load before calling this Assets.init()?'
      )
      return
    }
    if (
      ((this._initialized = !0),
      t.defaultSearchParams && this.resolver.setDefaultSearchParams(t.defaultSearchParams),
      t.basePath && (this.resolver.basePath = t.basePath),
      t.bundleIdentifier && this.resolver.setBundleIdentifier(t.bundleIdentifier),
      t.manifest)
    ) {
      let a = t.manifest
      typeof a == 'string' && (a = await this.load(a)), this.resolver.addManifest(a)
    }
    const e = ((n = t.texturePreference) == null ? void 0 : n.resolution) ?? 1,
      i = typeof e == 'number' ? [e] : e,
      s = await this._detectFormats({
        preferredFormats: (o = t.texturePreference) == null ? void 0 : o.format,
        skipDetections: t.skipDetections,
        detections: this._detections
      })
    this.resolver.prefer({ params: { format: s, resolution: i } }),
      t.preferences && this.setPreferences(t.preferences)
  }
  add(t, e, i, s, n) {
    this.resolver.add(t, e, i, s, n)
  }
  async load(t, e) {
    this._initialized || (await this.init())
    const i = co(t),
      s = Be(t).map((a) => {
        if (typeof a != 'string') {
          const h = this.resolver.getAlias(a)
          return h.some((l) => !this.resolver.hasKey(l)) && this.add(a), Array.isArray(h) ? h[0] : h
        }
        return this.resolver.hasKey(a) || this.add({ alias: a, src: a }), a
      }),
      n = this.resolver.resolve(s),
      o = await this._mapLoadToResolve(n, e)
    return i ? o[s[0]] : o
  }
  addBundle(t, e) {
    this.resolver.addBundle(t, e)
  }
  async loadBundle(t, e) {
    this._initialized || (await this.init())
    let i = !1
    typeof t == 'string' && ((i = !0), (t = [t]))
    const s = this.resolver.resolveBundle(t),
      n = {},
      o = Object.keys(s)
    let a = 0,
      h = 0
    const l = () => {
        e == null || e(++a / h)
      },
      c = o.map((u) => {
        const d = s[u]
        return (
          (h += Object.keys(d).length),
          this._mapLoadToResolve(d, l).then((f) => {
            n[u] = f
          })
        )
      })
    return await Promise.all(c), i ? n[t[0]] : n
  }
  async backgroundLoad(t) {
    this._initialized || (await this.init()), typeof t == 'string' && (t = [t])
    const e = this.resolver.resolve(t)
    this._backgroundLoader.add(Object.values(e))
  }
  async backgroundLoadBundle(t) {
    this._initialized || (await this.init()), typeof t == 'string' && (t = [t])
    const e = this.resolver.resolveBundle(t)
    Object.values(e).forEach((i) => {
      this._backgroundLoader.add(Object.values(i))
    })
  }
  reset() {
    this.resolver.reset(), this.loader.reset(), this.cache.reset(), (this._initialized = !1)
  }
  get(t) {
    if (typeof t == 'string') return ti.get(t)
    const e = {}
    for (let i = 0; i < t.length; i++) e[i] = ti.get(t[i])
    return e
  }
  async _mapLoadToResolve(t, e) {
    const i = Object.values(t),
      s = Object.keys(t)
    this._backgroundLoader.active = !1
    const n = await this.loader.load(i, e)
    this._backgroundLoader.active = !0
    const o = {}
    return (
      i.forEach((a, h) => {
        const l = n[a.src],
          c = [a.src]
        a.alias && c.push(...a.alias), (o[s[h]] = l), ti.set(c, l)
      }),
      o
    )
  }
  async unload(t) {
    this._initialized || (await this.init())
    const e = Be(t).map((s) => (typeof s != 'string' ? s.src : s)),
      i = this.resolver.resolve(e)
    await this._unloadFromResolved(i)
  }
  async unloadBundle(t) {
    this._initialized || (await this.init()), (t = Be(t))
    const e = this.resolver.resolveBundle(t),
      i = Object.keys(e).map((s) => this._unloadFromResolved(e[s]))
    await Promise.all(i)
  }
  async _unloadFromResolved(t) {
    const e = Object.values(t)
    e.forEach((i) => {
      ti.remove(i.src)
    }),
      await this.loader.unload(e)
  }
  async _detectFormats(t) {
    let e = []
    t.preferredFormats &&
      (e = Array.isArray(t.preferredFormats) ? t.preferredFormats : [t.preferredFormats])
    for (const i of t.detections)
      t.skipDetections || (await i.test())
        ? (e = await i.add(e))
        : t.skipDetections || (e = await i.remove(e))
    return (e = e.filter((i, s) => e.indexOf(i) === s)), e
  }
  get detections() {
    return this._detections
  }
  get preferWorkers() {
    return Lo.config.preferWorkers
  }
  set preferWorkers(t) {
    ut(
      '7.2.0',
      'Assets.prefersWorkers is deprecated, use Assets.setPreferences({ preferWorkers: true }) instead.'
    ),
      this.setPreferences({ preferWorkers: t })
  }
  setPreferences(t) {
    this.loader.parsers.forEach((e) => {
      e.config &&
        Object.keys(e.config)
          .filter((i) => i in t)
          .forEach((i) => {
            e.config[i] = t[i]
          })
    })
  }
}
const vn = new sb()
q.handleByList(j.LoadParser, vn.loader.parsers)
  .handleByList(j.ResolveParser, vn.resolver.parsers)
  .handleByList(j.CacheParser, vn.cache.parsers)
  .handleByList(j.DetectionParser, vn.detections)
const nb = {
  extension: j.CacheParser,
  test: (r) => Array.isArray(r) && r.every((t) => t instanceof X),
  getCacheableAssets: (r, t) => {
    const e = {}
    return (
      r.forEach((i) => {
        t.forEach((s, n) => {
          e[i + (n === 0 ? '' : n + 1)] = s
        })
      }),
      e
    )
  }
}
q.add(nb)
async function Fp(r) {
  if ('Image' in globalThis)
    return new Promise((t) => {
      const e = new Image()
      ;(e.onload = () => {
        t(!0)
      }),
        (e.onerror = () => {
          t(!1)
        }),
        (e.src = r)
    })
  if ('createImageBitmap' in globalThis && 'fetch' in globalThis) {
    try {
      const t = await (await fetch(r)).blob()
      await createImageBitmap(t)
    } catch {
      return !1
    }
    return !0
  }
  return !1
}
const ob = {
  extension: { type: j.DetectionParser, priority: 1 },
  test: async () =>
    Fp(
      'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A='
    ),
  add: async (r) => [...r, 'avif'],
  remove: async (r) => r.filter((t) => t !== 'avif')
}
q.add(ob)
const ab = {
  extension: { type: j.DetectionParser, priority: 0 },
  test: async () =>
    Fp('data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA='),
  add: async (r) => [...r, 'webp'],
  remove: async (r) => r.filter((t) => t !== 'webp')
}
q.add(ab)
const Bu = ['png', 'jpg', 'jpeg'],
  hb = {
    extension: { type: j.DetectionParser, priority: -1 },
    test: () => Promise.resolve(!0),
    add: async (r) => [...r, ...Bu],
    remove: async (r) => r.filter((t) => !Bu.includes(t))
  }
q.add(hb)
const lb = 'WorkerGlobalScope' in globalThis && globalThis instanceof globalThis.WorkerGlobalScope
function Bl(r) {
  return lb ? !1 : document.createElement('video').canPlayType(r) !== ''
}
const cb = {
  extension: { type: j.DetectionParser, priority: 0 },
  test: async () => Bl('video/webm'),
  add: async (r) => [...r, 'webm'],
  remove: async (r) => r.filter((t) => t !== 'webm')
}
q.add(cb)
const ub = {
  extension: { type: j.DetectionParser, priority: 0 },
  test: async () => Bl('video/mp4'),
  add: async (r) => [...r, 'mp4', 'm4v'],
  remove: async (r) => r.filter((t) => t !== 'mp4' && t !== 'm4v')
}
q.add(ub)
const db = {
  extension: { type: j.DetectionParser, priority: 0 },
  test: async () => Bl('video/ogg'),
  add: async (r) => [...r, 'ogv'],
  remove: async (r) => r.filter((t) => t !== 'ogv')
}
q.add(db)
const fb = {
  extension: j.ResolveParser,
  test: Lo.test,
  parse: (r) => {
    var t
    return {
      resolution: parseFloat(((t = Y.RETINA_PREFIX.exec(r)) == null ? void 0 : t[1]) ?? '1'),
      format: Kt.extname(r).slice(1),
      src: r
    }
  }
}
q.add(fb)
var qt = ((r) => (
  (r[(r.COMPRESSED_RGB_S3TC_DXT1_EXT = 33776)] = 'COMPRESSED_RGB_S3TC_DXT1_EXT'),
  (r[(r.COMPRESSED_RGBA_S3TC_DXT1_EXT = 33777)] = 'COMPRESSED_RGBA_S3TC_DXT1_EXT'),
  (r[(r.COMPRESSED_RGBA_S3TC_DXT3_EXT = 33778)] = 'COMPRESSED_RGBA_S3TC_DXT3_EXT'),
  (r[(r.COMPRESSED_RGBA_S3TC_DXT5_EXT = 33779)] = 'COMPRESSED_RGBA_S3TC_DXT5_EXT'),
  (r[(r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT = 35917)] = 'COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT'),
  (r[(r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT = 35918)] = 'COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT'),
  (r[(r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT = 35919)] = 'COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT'),
  (r[(r.COMPRESSED_SRGB_S3TC_DXT1_EXT = 35916)] = 'COMPRESSED_SRGB_S3TC_DXT1_EXT'),
  (r[(r.COMPRESSED_R11_EAC = 37488)] = 'COMPRESSED_R11_EAC'),
  (r[(r.COMPRESSED_SIGNED_R11_EAC = 37489)] = 'COMPRESSED_SIGNED_R11_EAC'),
  (r[(r.COMPRESSED_RG11_EAC = 37490)] = 'COMPRESSED_RG11_EAC'),
  (r[(r.COMPRESSED_SIGNED_RG11_EAC = 37491)] = 'COMPRESSED_SIGNED_RG11_EAC'),
  (r[(r.COMPRESSED_RGB8_ETC2 = 37492)] = 'COMPRESSED_RGB8_ETC2'),
  (r[(r.COMPRESSED_RGBA8_ETC2_EAC = 37496)] = 'COMPRESSED_RGBA8_ETC2_EAC'),
  (r[(r.COMPRESSED_SRGB8_ETC2 = 37493)] = 'COMPRESSED_SRGB8_ETC2'),
  (r[(r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC = 37497)] = 'COMPRESSED_SRGB8_ALPHA8_ETC2_EAC'),
  (r[(r.COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2 = 37494)] =
    'COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2'),
  (r[(r.COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2 = 37495)] =
    'COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2'),
  (r[(r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG = 35840)] = 'COMPRESSED_RGB_PVRTC_4BPPV1_IMG'),
  (r[(r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG = 35842)] = 'COMPRESSED_RGBA_PVRTC_4BPPV1_IMG'),
  (r[(r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG = 35841)] = 'COMPRESSED_RGB_PVRTC_2BPPV1_IMG'),
  (r[(r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG = 35843)] = 'COMPRESSED_RGBA_PVRTC_2BPPV1_IMG'),
  (r[(r.COMPRESSED_RGB_ETC1_WEBGL = 36196)] = 'COMPRESSED_RGB_ETC1_WEBGL'),
  (r[(r.COMPRESSED_RGB_ATC_WEBGL = 35986)] = 'COMPRESSED_RGB_ATC_WEBGL'),
  (r[(r.COMPRESSED_RGBA_ATC_EXPLICIT_ALPHA_WEBGL = 35987)] =
    'COMPRESSED_RGBA_ATC_EXPLICIT_ALPHA_WEBGL'),
  (r[(r.COMPRESSED_RGBA_ATC_INTERPOLATED_ALPHA_WEBGL = 34798)] =
    'COMPRESSED_RGBA_ATC_INTERPOLATED_ALPHA_WEBGL'),
  (r[(r.COMPRESSED_RGBA_ASTC_4x4_KHR = 37808)] = 'COMPRESSED_RGBA_ASTC_4x4_KHR'),
  (r[(r.COMPRESSED_RGBA_BPTC_UNORM_EXT = 36492)] = 'COMPRESSED_RGBA_BPTC_UNORM_EXT'),
  (r[(r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT = 36493)] = 'COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT'),
  (r[(r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT = 36494)] = 'COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT'),
  (r[(r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT = 36495)] =
    'COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT'),
  r
))(qt || {})
const uo = {
  33776: 0.5,
  33777: 0.5,
  33778: 1,
  33779: 1,
  35916: 0.5,
  35917: 0.5,
  35918: 1,
  35919: 1,
  37488: 0.5,
  37489: 0.5,
  37490: 1,
  37491: 1,
  37492: 0.5,
  37496: 1,
  37493: 0.5,
  37497: 1,
  37494: 0.5,
  37495: 0.5,
  35840: 0.5,
  35842: 0.5,
  35841: 0.25,
  35843: 0.25,
  36196: 0.5,
  35986: 0.5,
  35987: 1,
  34798: 1,
  37808: 1,
  36492: 1,
  36493: 1,
  36494: 1,
  36495: 1
}
let Xe, Si
function Fu() {
  Si = {
    bptc: Xe.getExtension('EXT_texture_compression_bptc'),
    astc: Xe.getExtension('WEBGL_compressed_texture_astc'),
    etc: Xe.getExtension('WEBGL_compressed_texture_etc'),
    s3tc: Xe.getExtension('WEBGL_compressed_texture_s3tc'),
    s3tc_sRGB: Xe.getExtension('WEBGL_compressed_texture_s3tc_srgb'),
    pvrtc:
      Xe.getExtension('WEBGL_compressed_texture_pvrtc') ||
      Xe.getExtension('WEBKIT_WEBGL_compressed_texture_pvrtc'),
    etc1: Xe.getExtension('WEBGL_compressed_texture_etc1'),
    atc: Xe.getExtension('WEBGL_compressed_texture_atc')
  }
}
const pb = {
  extension: { type: j.DetectionParser, priority: 2 },
  test: async () => {
    const r = Y.ADAPTER.createCanvas().getContext('webgl')
    return r ? ((Xe = r), !0) : (console.warn('WebGL not available for compressed textures.'), !1)
  },
  add: async (r) => {
    Si || Fu()
    const t = []
    for (const e in Si) Si[e] && t.push(e)
    return [...t, ...r]
  },
  remove: async (r) => (Si || Fu(), r.filter((t) => !(t in Si)))
}
q.add(pb)
class mb extends Po {
  constructor(t, e = { width: 1, height: 1, autoLoad: !0 }) {
    let i, s
    typeof t == 'string' ? ((i = t), (s = new Uint8Array())) : ((i = null), (s = t)),
      super(s, e),
      (this.origin = i),
      (this.buffer = s ? new ph(s) : null),
      (this._load = null),
      (this.loaded = !1),
      this.origin !== null && e.autoLoad !== !1 && this.load(),
      this.origin === null &&
        this.buffer &&
        ((this._load = Promise.resolve(this)),
        (this.loaded = !0),
        this.onBlobLoaded(this.buffer.rawBinaryData))
  }
  onBlobLoaded(t) {}
  load() {
    return this._load
      ? this._load
      : ((this._load = fetch(this.origin)
          .then((t) => t.blob())
          .then((t) => t.arrayBuffer())
          .then(
            (t) => (
              (this.data = new Uint32Array(t)),
              (this.buffer = new ph(t)),
              (this.loaded = !0),
              this.onBlobLoaded(t),
              this.update(),
              this
            )
          )),
        this._load)
  }
}
class ci extends mb {
  constructor(t, e) {
    super(t, e),
      (this.format = e.format),
      (this.levels = e.levels || 1),
      (this._width = e.width),
      (this._height = e.height),
      (this._extension = ci._formatToExtension(this.format)),
      (e.levelBuffers || this.buffer) &&
        (this._levelBuffers =
          e.levelBuffers ||
          ci._createLevelBuffers(
            t instanceof Uint8Array ? t : this.buffer.uint8View,
            this.format,
            this.levels,
            4,
            4,
            this.width,
            this.height
          ))
  }
  upload(t, e, i) {
    const s = t.gl
    if (!t.context.extensions[this._extension])
      throw new Error(`${this._extension} textures are not supported on the current machine`)
    if (!this._levelBuffers) return !1
    s.pixelStorei(s.UNPACK_ALIGNMENT, 4)
    for (let n = 0, o = this.levels; n < o; n++) {
      const { levelID: a, levelWidth: h, levelHeight: l, levelBuffer: c } = this._levelBuffers[n]
      s.compressedTexImage2D(s.TEXTURE_2D, a, this.format, h, l, 0, c)
    }
    return !0
  }
  onBlobLoaded() {
    this._levelBuffers = ci._createLevelBuffers(
      this.buffer.uint8View,
      this.format,
      this.levels,
      4,
      4,
      this.width,
      this.height
    )
  }
  static _formatToExtension(t) {
    if (t >= 33776 && t <= 33779) return 's3tc'
    if (t >= 35916 && t <= 35919) return 's3tc_sRGB'
    if (t >= 37488 && t <= 37497) return 'etc'
    if (t >= 35840 && t <= 35843) return 'pvrtc'
    if (t === 36196) return 'etc1'
    if (t === 35986 || t === 35987 || t === 34798) return 'atc'
    if (t >= 36492 && t <= 36495) return 'bptc'
    if (t === 37808) return 'astc'
    throw new Error(`Invalid (compressed) texture format given: ${t}`)
  }
  static _createLevelBuffers(t, e, i, s, n, o, a) {
    const h = new Array(i)
    let l = t.byteOffset,
      c = o,
      u = a,
      d = (c + s - 1) & ~(s - 1),
      f = (u + n - 1) & ~(n - 1),
      p = d * f * uo[e]
    for (let m = 0; m < i; m++)
      (h[m] = {
        levelID: m,
        levelWidth: i > 1 ? c : d,
        levelHeight: i > 1 ? u : f,
        levelBuffer: new Uint8Array(t.buffer, l, p)
      }),
        (l += p),
        (c = c >> 1 || 1),
        (u = u >> 1 || 1),
        (d = (c + s - 1) & ~(s - 1)),
        (f = (u + n - 1) & ~(n - 1)),
        (p = d * f * uo[e])
    return h
  }
}
const Ia = 4,
  xn = 124,
  gb = 32,
  Du = 20,
  _b = 542327876,
  bn = { SIZE: 1, FLAGS: 2, HEIGHT: 3, WIDTH: 4, MIPMAP_COUNT: 7, PIXEL_FORMAT: 19 },
  yb = {
    SIZE: 0,
    FLAGS: 1,
    FOURCC: 2,
    RGB_BITCOUNT: 3,
    R_BIT_MASK: 4,
    G_BIT_MASK: 5,
    B_BIT_MASK: 6,
    A_BIT_MASK: 7
  },
  En = { DXGI_FORMAT: 0, RESOURCE_DIMENSION: 1, MISC_FLAG: 2, ARRAY_SIZE: 3, MISC_FLAGS2: 4 },
  Ab = 1,
  vb = 2,
  xb = 4,
  bb = 64,
  Eb = 512,
  Tb = 131072,
  wb = 827611204,
  Sb = 861165636,
  Cb = 894720068,
  Ib = 808540228,
  Rb = 4,
  Pb = {
    [wb]: qt.COMPRESSED_RGBA_S3TC_DXT1_EXT,
    [Sb]: qt.COMPRESSED_RGBA_S3TC_DXT3_EXT,
    [Cb]: qt.COMPRESSED_RGBA_S3TC_DXT5_EXT
  },
  Mb = {
    70: qt.COMPRESSED_RGBA_S3TC_DXT1_EXT,
    71: qt.COMPRESSED_RGBA_S3TC_DXT1_EXT,
    73: qt.COMPRESSED_RGBA_S3TC_DXT3_EXT,
    74: qt.COMPRESSED_RGBA_S3TC_DXT3_EXT,
    76: qt.COMPRESSED_RGBA_S3TC_DXT5_EXT,
    77: qt.COMPRESSED_RGBA_S3TC_DXT5_EXT,
    72: qt.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT,
    75: qt.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT,
    78: qt.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT,
    96: qt.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT,
    95: qt.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT,
    98: qt.COMPRESSED_RGBA_BPTC_UNORM_EXT,
    99: qt.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT
  }
function Bb(r) {
  const t = new Uint32Array(r)
  if (t[0] !== _b) throw new Error('Invalid DDS file magic word')
  const e = new Uint32Array(r, 0, xn / Uint32Array.BYTES_PER_ELEMENT),
    i = e[bn.HEIGHT],
    s = e[bn.WIDTH],
    n = e[bn.MIPMAP_COUNT],
    o = new Uint32Array(
      r,
      bn.PIXEL_FORMAT * Uint32Array.BYTES_PER_ELEMENT,
      gb / Uint32Array.BYTES_PER_ELEMENT
    ),
    a = o[Ab]
  if (a & xb) {
    const h = o[yb.FOURCC]
    if (h !== Ib) {
      const x = Pb[h],
        _ = Ia + xn,
        v = new Uint8Array(r, _)
      return [new ci(v, { format: x, width: s, height: i, levels: n })]
    }
    const l = Ia + xn,
      c = new Uint32Array(t.buffer, l, Du / Uint32Array.BYTES_PER_ELEMENT),
      u = c[En.DXGI_FORMAT],
      d = c[En.RESOURCE_DIMENSION],
      f = c[En.MISC_FLAG],
      p = c[En.ARRAY_SIZE],
      m = Mb[u]
    if (m === void 0) throw new Error(`DDSParser cannot parse texture data with DXGI format ${u}`)
    if (f === Rb) throw new Error('DDSParser does not support cubemap textures')
    if (d === 6) throw new Error('DDSParser does not supported 3D texture data')
    const g = new Array(),
      A = Ia + xn + Du
    if (p === 1) g.push(new Uint8Array(r, A))
    else {
      const x = uo[m]
      let _ = 0,
        v = s,
        S = i
      for (let I = 0; I < n; I++) {
        const T = Math.max(1, (v + 3) & -4),
          F = Math.max(1, (S + 3) & -4),
          k = T * F * x
        ;(_ += k), (v = v >>> 1), (S = S >>> 1)
      }
      let C = A
      for (let I = 0; I < p; I++) g.push(new Uint8Array(r, C, _)), (C += _)
    }
    return g.map((x) => new ci(x, { format: m, width: s, height: i, levels: n }))
  }
  throw a & bb
    ? new Error('DDSParser does not support uncompressed texture data.')
    : a & Eb
      ? new Error('DDSParser does not supported YUV uncompressed texture data.')
      : a & Tb
        ? new Error('DDSParser does not support single-channel (lumninance) texture data!')
        : a & vb
          ? new Error('DDSParser does not support single-channel (alpha) texture data!')
          : new Error('DDSParser failed to load a texture file due to an unknown reason!')
}
const Ou = [171, 75, 84, 88, 32, 49, 49, 187, 13, 10, 26, 10],
  Fb = 67305985,
  Re = {
    FILE_IDENTIFIER: 0,
    ENDIANNESS: 12,
    GL_TYPE: 16,
    GL_TYPE_SIZE: 20,
    GL_FORMAT: 24,
    GL_INTERNAL_FORMAT: 28,
    GL_BASE_INTERNAL_FORMAT: 32,
    PIXEL_WIDTH: 36,
    PIXEL_HEIGHT: 40,
    PIXEL_DEPTH: 44,
    NUMBER_OF_ARRAY_ELEMENTS: 48,
    NUMBER_OF_FACES: 52,
    NUMBER_OF_MIPMAP_LEVELS: 56,
    BYTES_OF_KEY_VALUE_DATA: 60
  },
  Uh = 64,
  Lu = {
    [tt.UNSIGNED_BYTE]: 1,
    [tt.UNSIGNED_SHORT]: 2,
    [tt.INT]: 4,
    [tt.UNSIGNED_INT]: 4,
    [tt.FLOAT]: 4,
    [tt.HALF_FLOAT]: 8
  },
  Db = {
    [D.RGBA]: 4,
    [D.RGB]: 3,
    [D.RG]: 2,
    [D.RED]: 1,
    [D.LUMINANCE]: 1,
    [D.LUMINANCE_ALPHA]: 2,
    [D.ALPHA]: 1
  },
  Ob = {
    [tt.UNSIGNED_SHORT_4_4_4_4]: 2,
    [tt.UNSIGNED_SHORT_5_5_5_1]: 2,
    [tt.UNSIGNED_SHORT_5_6_5]: 2
  }
function Lb(r, t, e = !1) {
  const i = new DataView(t)
  if (!Nb(r, i)) return null
  const s = i.getUint32(Re.ENDIANNESS, !0) === Fb,
    n = i.getUint32(Re.GL_TYPE, s),
    o = i.getUint32(Re.GL_FORMAT, s),
    a = i.getUint32(Re.GL_INTERNAL_FORMAT, s),
    h = i.getUint32(Re.PIXEL_WIDTH, s),
    l = i.getUint32(Re.PIXEL_HEIGHT, s) || 1,
    c = i.getUint32(Re.PIXEL_DEPTH, s) || 1,
    u = i.getUint32(Re.NUMBER_OF_ARRAY_ELEMENTS, s) || 1,
    d = i.getUint32(Re.NUMBER_OF_FACES, s),
    f = i.getUint32(Re.NUMBER_OF_MIPMAP_LEVELS, s),
    p = i.getUint32(Re.BYTES_OF_KEY_VALUE_DATA, s)
  if (l === 0 || c !== 1) throw new Error('Only 2D textures are supported')
  if (d !== 1) throw new Error('CubeTextures are not supported by KTXLoader yet!')
  if (u !== 1) throw new Error('WebGL does not support array textures')
  const m = 4,
    g = 4,
    A = (h + 3) & -4,
    x = (l + 3) & -4,
    _ = new Array(u)
  let v = h * l
  n === 0 && (v = A * x)
  let S
  if ((n !== 0 ? (Lu[n] ? (S = Lu[n] * Db[o]) : (S = Ob[n])) : (S = uo[a]), S === void 0))
    throw new Error('Unable to resolve the pixel format stored in the *.ktx file!')
  const C = e ? kb(i, p, s) : null
  let I = v * S,
    T = h,
    F = l,
    k = A,
    rt = x,
    G = Uh + p
  for (let E = 0; E < f; E++) {
    const M = i.getUint32(G, s)
    let K = G + 4
    for (let Z = 0; Z < u; Z++) {
      let H = _[Z]
      H || (H = _[Z] = new Array(f)),
        (H[E] = {
          levelID: E,
          levelWidth: f > 1 || n !== 0 ? T : k,
          levelHeight: f > 1 || n !== 0 ? F : rt,
          levelBuffer: new Uint8Array(t, K, I)
        }),
        (K += I)
    }
    ;(G += M + 4),
      (G = G % 4 !== 0 ? G + 4 - (G % 4) : G),
      (T = T >> 1 || 1),
      (F = F >> 1 || 1),
      (k = (T + m - 1) & ~(m - 1)),
      (rt = (F + g - 1) & ~(g - 1)),
      (I = k * rt * S)
  }
  return n !== 0
    ? {
        uncompressed: _.map((E) => {
          let M = E[0].levelBuffer,
            K = !1
          return (
            n === tt.FLOAT
              ? (M = new Float32Array(
                  E[0].levelBuffer.buffer,
                  E[0].levelBuffer.byteOffset,
                  E[0].levelBuffer.byteLength / 4
                ))
              : n === tt.UNSIGNED_INT
                ? ((K = !0),
                  (M = new Uint32Array(
                    E[0].levelBuffer.buffer,
                    E[0].levelBuffer.byteOffset,
                    E[0].levelBuffer.byteLength / 4
                  )))
                : n === tt.INT &&
                  ((K = !0),
                  (M = new Int32Array(
                    E[0].levelBuffer.buffer,
                    E[0].levelBuffer.byteOffset,
                    E[0].levelBuffer.byteLength / 4
                  ))),
            {
              resource: new Po(M, { width: E[0].levelWidth, height: E[0].levelHeight }),
              type: n,
              format: K ? Ub(o) : o
            }
          )
        }),
        kvData: C
      }
    : {
        compressed: _.map(
          (E) => new ci(null, { format: a, width: h, height: l, levels: f, levelBuffers: E })
        ),
        kvData: C
      }
}
function Nb(r, t) {
  for (let e = 0; e < Ou.length; e++)
    if (t.getUint8(e) !== Ou[e]) return console.error(`${r} is not a valid *.ktx file!`), !1
  return !0
}
function Ub(r) {
  switch (r) {
    case D.RGBA:
      return D.RGBA_INTEGER
    case D.RGB:
      return D.RGB_INTEGER
    case D.RG:
      return D.RG_INTEGER
    case D.RED:
      return D.RED_INTEGER
    default:
      return r
  }
}
function kb(r, t, e) {
  const i = new Map()
  let s = 0
  for (; s < t; ) {
    const n = r.getUint32(Uh + s, e),
      o = Uh + s + 4,
      a = 3 - ((n + 3) % 4)
    if (n === 0 || n > t - s) {
      console.error('KTXLoader: keyAndValueByteSize out of bounds')
      break
    }
    let h = 0
    for (; h < n && r.getUint8(o + h) !== 0; h++);
    if (h === -1) {
      console.error('KTXLoader: Failed to find null byte terminating kvData key')
      break
    }
    const l = new TextDecoder().decode(new Uint8Array(r.buffer, o, h)),
      c = new DataView(r.buffer, o + h + 1, n - h - 1)
    i.set(l, c), (s += 4 + n + a)
  }
  return i
}
const Gb = {
  extension: { type: j.LoadParser, priority: Ne.High },
  name: 'loadDDS',
  test(r) {
    return Gr(r, '.dds')
  },
  async load(r, t, e) {
    const i = await (await Y.ADAPTER.fetch(r)).arrayBuffer(),
      s = Bb(i).map((n) => {
        const o = new ht(n, {
          mipmap: sr.OFF,
          alphaMode: de.NO_PREMULTIPLIED_ALPHA,
          resolution: mr(r),
          ...t.data
        })
        return zs(o, e, r)
      })
    return s.length === 1 ? s[0] : s
  },
  unload(r) {
    Array.isArray(r) ? r.forEach((t) => t.destroy(!0)) : r.destroy(!0)
  }
}
q.add(Gb)
const Hb = {
  extension: { type: j.LoadParser, priority: Ne.High },
  name: 'loadKTX',
  test(r) {
    return Gr(r, '.ktx')
  },
  async load(r, t, e) {
    const i = await (await Y.ADAPTER.fetch(r)).arrayBuffer(),
      { compressed: s, uncompressed: n, kvData: o } = Lb(r, i),
      a = s ?? n,
      h = { mipmap: sr.OFF, alphaMode: de.NO_PREMULTIPLIED_ALPHA, resolution: mr(r), ...t.data },
      l = a.map((c) => {
        a === n && Object.assign(h, { type: c.type, format: c.format })
        const u = c.resource ?? c,
          d = new ht(u, h)
        return (d.ktxKeyValueData = o), zs(d, e, r)
      })
    return l.length === 1 ? l[0] : l
  },
  unload(r) {
    Array.isArray(r) ? r.forEach((t) => t.destroy(!0)) : r.destroy(!0)
  }
}
q.add(Hb)
const Vb = ['s3tc', 's3tc_sRGB', 'etc', 'etc1', 'pvrtc', 'atc', 'astc', 'bptc'],
  Xb = {
    extension: j.ResolveParser,
    test: (r) => {
      const t = Kt.extname(r).slice(1)
      return ['basis', 'ktx', 'dds'].includes(t)
    },
    parse: (r) => {
      var i, s
      const t = r.split('.'),
        e = t.pop()
      if (['ktx', 'dds'].includes(e)) {
        const n = t.pop()
        if (Vb.includes(n))
          return {
            resolution: parseFloat(((i = Y.RETINA_PREFIX.exec(r)) == null ? void 0 : i[1]) ?? '1'),
            format: n,
            src: r
          }
      }
      return {
        resolution: parseFloat(((s = Y.RETINA_PREFIX.exec(r)) == null ? void 0 : s[1]) ?? '1'),
        format: e,
        src: r
      }
    }
  }
q.add(Xb)
const Tn = new nt(),
  jb = 4,
  Dp = class ds {
    constructor(t) {
      ;(this.renderer = t), (this._rendererPremultipliedAlpha = !1)
    }
    contextChange() {
      var e
      const t = (e = this.renderer) == null ? void 0 : e.gl.getContextAttributes()
      this._rendererPremultipliedAlpha = !!(t && t.alpha && t.premultipliedAlpha)
    }
    async image(t, e, i, s) {
      const n = new Image()
      return (n.src = await this.base64(t, e, i, s)), n
    }
    async base64(t, e, i, s) {
      const n = this.canvas(t, s)
      if (n.toBlob !== void 0)
        return new Promise((o, a) => {
          n.toBlob(
            (h) => {
              if (!h) {
                a(new Error('ICanvas.toBlob failed!'))
                return
              }
              const l = new FileReader()
              ;(l.onload = () => o(l.result)), (l.onerror = a), l.readAsDataURL(h)
            },
            e,
            i
          )
        })
      if (n.toDataURL !== void 0) return n.toDataURL(e, i)
      if (n.convertToBlob !== void 0) {
        const o = await n.convertToBlob({ type: e, quality: i })
        return new Promise((a, h) => {
          const l = new FileReader()
          ;(l.onload = () => a(l.result)), (l.onerror = h), l.readAsDataURL(o)
        })
      }
      throw new Error(
        'Extract.base64() requires ICanvas.toDataURL, ICanvas.toBlob, or ICanvas.convertToBlob to be implemented'
      )
    }
    canvas(t, e) {
      const {
        pixels: i,
        width: s,
        height: n,
        flipY: o,
        premultipliedAlpha: a
      } = this._rawPixels(t, e)
      o && ds._flipY(i, s, n), a && ds._unpremultiplyAlpha(i)
      const h = new R0(s, n, 1),
        l = new ImageData(new Uint8ClampedArray(i.buffer), s, n)
      return h.context.putImageData(l, 0, 0), h.canvas
    }
    pixels(t, e) {
      const {
        pixels: i,
        width: s,
        height: n,
        flipY: o,
        premultipliedAlpha: a
      } = this._rawPixels(t, e)
      return o && ds._flipY(i, s, n), a && ds._unpremultiplyAlpha(i), i
    }
    _rawPixels(t, e) {
      const i = this.renderer
      if (!i) throw new Error('The Extract has already been destroyed')
      let s,
        n = !1,
        o = !1,
        a,
        h = !1
      t &&
        (t instanceof mi
          ? (a = t)
          : ((a = i.generateTexture(t, {
              region: e,
              resolution: i.resolution,
              multisample: i.multisample
            })),
            (h = !0),
            e && ((Tn.width = e.width), (Tn.height = e.height), (e = Tn))))
      const l = i.gl
      if (a) {
        if (
          ((s = a.baseTexture.resolution),
          (e = e ?? a.frame),
          (n = !1),
          (o = a.baseTexture.alphaMode > 0 && a.baseTexture.format === D.RGBA),
          !h)
        ) {
          i.renderTexture.bind(a)
          const f = a.framebuffer.glFramebuffers[i.CONTEXT_UID]
          f.blitFramebuffer && i.framebuffer.bind(f.blitFramebuffer)
        }
      } else
        (s = i.resolution),
          e || ((e = Tn), (e.width = i.width / s), (e.height = i.height / s)),
          (n = !0),
          (o = this._rendererPremultipliedAlpha),
          i.renderTexture.bind()
      const c = Math.max(Math.round(e.width * s), 1),
        u = Math.max(Math.round(e.height * s), 1),
        d = new Uint8Array(jb * c * u)
      return (
        l.readPixels(Math.round(e.x * s), Math.round(e.y * s), c, u, l.RGBA, l.UNSIGNED_BYTE, d),
        h && (a == null || a.destroy(!0)),
        { pixels: d, width: c, height: u, flipY: n, premultipliedAlpha: o }
      )
    }
    destroy() {
      this.renderer = null
    }
    static _flipY(t, e, i) {
      const s = e << 2,
        n = i >> 1,
        o = new Uint8Array(s)
      for (let a = 0; a < n; a++) {
        const h = a * s,
          l = (i - a - 1) * s
        o.set(t.subarray(h, h + s)), t.copyWithin(h, l, l + s), t.set(o, l)
      }
    }
    static _unpremultiplyAlpha(t) {
      t instanceof Uint8ClampedArray && (t = new Uint8Array(t.buffer))
      const e = t.length
      for (let i = 0; i < e; i += 4) {
        const s = t[i + 3]
        if (s !== 0) {
          const n = 255.001 / s
          ;(t[i] = t[i] * n + 0.5), (t[i + 1] = t[i + 1] * n + 0.5), (t[i + 2] = t[i + 2] * n + 0.5)
        }
      }
    }
  }
Dp.extension = { name: 'extract', type: j.RendererSystem }
let Wb = Dp
q.add(Wb)
const fo = {
  build(r) {
    const t = r.points
    let e, i, s, n, o, a
    if (r.type === Zt.CIRC) {
      const p = r.shape
      ;(e = p.x), (i = p.y), (o = a = p.radius), (s = n = 0)
    } else if (r.type === Zt.ELIP) {
      const p = r.shape
      ;(e = p.x), (i = p.y), (o = p.width), (a = p.height), (s = n = 0)
    } else {
      const p = r.shape,
        m = p.width / 2,
        g = p.height / 2
      ;(e = p.x + m),
        (i = p.y + g),
        (o = a = Math.max(0, Math.min(p.radius, Math.min(m, g)))),
        (s = m - o),
        (n = g - a)
    }
    if (!(o >= 0 && a >= 0 && s >= 0 && n >= 0)) {
      t.length = 0
      return
    }
    const h = Math.ceil(2.3 * Math.sqrt(o + a)),
      l = h * 8 + (s ? 4 : 0) + (n ? 4 : 0)
    if (((t.length = l), l === 0)) return
    if (h === 0) {
      ;(t.length = 8),
        (t[0] = t[6] = e + s),
        (t[1] = t[3] = i + n),
        (t[2] = t[4] = e - s),
        (t[5] = t[7] = i - n)
      return
    }
    let c = 0,
      u = h * 4 + (s ? 2 : 0) + 2,
      d = u,
      f = l
    {
      const p = s + o,
        m = n,
        g = e + p,
        A = e - p,
        x = i + m
      if (((t[c++] = g), (t[c++] = x), (t[--u] = x), (t[--u] = A), n)) {
        const _ = i - m
        ;(t[d++] = A), (t[d++] = _), (t[--f] = _), (t[--f] = g)
      }
    }
    for (let p = 1; p < h; p++) {
      const m = (Math.PI / 2) * (p / h),
        g = s + Math.cos(m) * o,
        A = n + Math.sin(m) * a,
        x = e + g,
        _ = e - g,
        v = i + A,
        S = i - A
      ;(t[c++] = x),
        (t[c++] = v),
        (t[--u] = v),
        (t[--u] = _),
        (t[d++] = _),
        (t[d++] = S),
        (t[--f] = S),
        (t[--f] = x)
    }
    {
      const p = s,
        m = n + a,
        g = e + p,
        A = e - p,
        x = i + m,
        _ = i - m
      ;(t[c++] = g),
        (t[c++] = x),
        (t[--f] = _),
        (t[--f] = g),
        s && ((t[c++] = A), (t[c++] = x), (t[--f] = _), (t[--f] = A))
    }
  },
  triangulate(r, t) {
    const e = r.points,
      i = t.points,
      s = t.indices
    if (e.length === 0) return
    let n = i.length / 2
    const o = n
    let a, h
    if (r.type !== Zt.RREC) {
      const c = r.shape
      ;(a = c.x), (h = c.y)
    } else {
      const c = r.shape
      ;(a = c.x + c.width / 2), (h = c.y + c.height / 2)
    }
    const l = r.matrix
    i.push(r.matrix ? l.a * a + l.c * h + l.tx : a, r.matrix ? l.b * a + l.d * h + l.ty : h),
      n++,
      i.push(e[0], e[1])
    for (let c = 2; c < e.length; c += 2) i.push(e[c], e[c + 1]), s.push(n++, o, n)
    s.push(o + 1, o, n)
  }
}
function Nu(r, t = !1) {
  const e = r.length
  if (e < 6) return
  let i = 0
  for (let s = 0, n = r[e - 2], o = r[e - 1]; s < e; s += 2) {
    const a = r[s],
      h = r[s + 1]
    ;(i += (a - n) * (h + o)), (n = a), (o = h)
  }
  if ((!t && i > 0) || (t && i <= 0)) {
    const s = e / 2
    for (let n = s + (s % 2); n < e; n += 2) {
      const o = e - n - 2,
        a = e - n - 1,
        h = n,
        l = n + 1
      ;([r[o], r[h]] = [r[h], r[o]]), ([r[a], r[l]] = [r[l], r[a]])
    }
  }
}
const Op = {
    build(r) {
      r.points = r.shape.points.slice()
    },
    triangulate(r, t) {
      let e = r.points
      const i = r.holes,
        s = t.points,
        n = t.indices
      if (e.length >= 6) {
        Nu(e, !1)
        const o = []
        for (let l = 0; l < i.length; l++) {
          const c = i[l]
          Nu(c.points, !0), o.push(e.length / 2), (e = e.concat(c.points))
        }
        const a = D_(e, o, 2)
        if (!a) return
        const h = s.length / 2
        for (let l = 0; l < a.length; l += 3)
          n.push(a[l] + h), n.push(a[l + 1] + h), n.push(a[l + 2] + h)
        for (let l = 0; l < e.length; l++) s.push(e[l])
      }
    }
  },
  $b = {
    build(r) {
      const t = r.shape,
        e = t.x,
        i = t.y,
        s = t.width,
        n = t.height,
        o = r.points
      ;(o.length = 0), s >= 0 && n >= 0 && o.push(e, i, e + s, i, e + s, i + n, e, i + n)
    },
    triangulate(r, t) {
      const e = r.points,
        i = t.points
      if (e.length === 0) return
      const s = i.length / 2
      i.push(e[0], e[1], e[2], e[3], e[6], e[7], e[4], e[5]),
        t.indices.push(s, s + 1, s + 2, s + 1, s + 2, s + 3)
    }
  },
  zb = {
    build(r) {
      fo.build(r)
    },
    triangulate(r, t) {
      fo.triangulate(r, t)
    }
  }
var Ee = ((r) => ((r.MITER = 'miter'), (r.BEVEL = 'bevel'), (r.ROUND = 'round'), r))(Ee || {}),
  Pr = ((r) => ((r.BUTT = 'butt'), (r.ROUND = 'round'), (r.SQUARE = 'square'), r))(Pr || {})
const zi = {
  adaptive: !0,
  maxLength: 10,
  minSegments: 8,
  maxSegments: 2048,
  epsilon: 1e-4,
  _segmentsCount(r, t = 20) {
    if (!this.adaptive || !r || isNaN(r)) return t
    let e = Math.ceil(r / this.maxLength)
    return (
      e < this.minSegments
        ? (e = this.minSegments)
        : e > this.maxSegments && (e = this.maxSegments),
      e
    )
  }
}
class Uu {
  static curveTo(t, e, i, s, n, o) {
    const a = o[o.length - 2],
      h = o[o.length - 1] - e,
      l = a - t,
      c = s - e,
      u = i - t,
      d = Math.abs(h * u - l * c)
    if (d < 1e-8 || n === 0)
      return (o[o.length - 2] !== t || o[o.length - 1] !== e) && o.push(t, e), null
    const f = h * h + l * l,
      p = c * c + u * u,
      m = h * c + l * u,
      g = (n * Math.sqrt(f)) / d,
      A = (n * Math.sqrt(p)) / d,
      x = (g * m) / f,
      _ = (A * m) / p,
      v = g * u + A * l,
      S = g * c + A * h,
      C = l * (A + x),
      I = h * (A + x),
      T = u * (g + _),
      F = c * (g + _),
      k = Math.atan2(I - S, C - v),
      rt = Math.atan2(F - S, T - v)
    return {
      cx: v + t,
      cy: S + e,
      radius: n,
      startAngle: k,
      endAngle: rt,
      anticlockwise: l * c > u * h
    }
  }
  static arc(t, e, i, s, n, o, a, h, l) {
    const c = a - o,
      u = zi._segmentsCount(Math.abs(c) * n, Math.ceil(Math.abs(c) / ro) * 40),
      d = c / (u * 2),
      f = d * 2,
      p = Math.cos(d),
      m = Math.sin(d),
      g = u - 1,
      A = (g % 1) / g
    for (let x = 0; x <= g; ++x) {
      const _ = x + A * x,
        v = d + o + f * _,
        S = Math.cos(v),
        C = -Math.sin(v)
      l.push((p * S + m * C) * n + i, (p * -C + m * S) * n + s)
    }
  }
}
class Yb {
  constructor() {
    this.reset()
  }
  begin(t, e, i) {
    this.reset(), (this.style = t), (this.start = e), (this.attribStart = i)
  }
  end(t, e) {
    ;(this.attribSize = e - this.attribStart), (this.size = t - this.start)
  }
  reset() {
    ;(this.style = null),
      (this.size = 0),
      (this.start = 0),
      (this.attribStart = 0),
      (this.attribSize = 0)
  }
}
class Fl {
  static curveLength(t, e, i, s, n, o, a, h) {
    let l = 0,
      c = 0,
      u = 0,
      d = 0,
      f = 0,
      p = 0,
      m = 0,
      g = 0,
      A = 0,
      x = 0,
      _ = 0,
      v = t,
      S = e
    for (let C = 1; C <= 10; ++C)
      (c = C / 10),
        (u = c * c),
        (d = u * c),
        (f = 1 - c),
        (p = f * f),
        (m = p * f),
        (g = m * t + 3 * p * c * i + 3 * f * u * n + d * a),
        (A = m * e + 3 * p * c * s + 3 * f * u * o + d * h),
        (x = v - g),
        (_ = S - A),
        (v = g),
        (S = A),
        (l += Math.sqrt(x * x + _ * _))
    return l
  }
  static curveTo(t, e, i, s, n, o, a) {
    const h = a[a.length - 2],
      l = a[a.length - 1]
    a.length -= 2
    const c = zi._segmentsCount(Fl.curveLength(h, l, t, e, i, s, n, o))
    let u = 0,
      d = 0,
      f = 0,
      p = 0,
      m = 0
    a.push(h, l)
    for (let g = 1, A = 0; g <= c; ++g)
      (A = g / c),
        (u = 1 - A),
        (d = u * u),
        (f = d * u),
        (p = A * A),
        (m = p * A),
        a.push(
          f * h + 3 * d * A * t + 3 * u * p * i + m * n,
          f * l + 3 * d * A * e + 3 * u * p * s + m * o
        )
  }
}
function ku(r, t, e, i, s, n, o, a) {
  const h = r - e * s,
    l = t - i * s,
    c = r + e * n,
    u = t + i * n
  let d, f
  o ? ((d = i), (f = -e)) : ((d = -i), (f = e))
  const p = h + d,
    m = l + f,
    g = c + d,
    A = u + f
  return a.push(p, m, g, A), 2
}
function jr(r, t, e, i, s, n, o, a) {
  const h = e - r,
    l = i - t
  let c = Math.atan2(h, l),
    u = Math.atan2(s - r, n - t)
  a && c < u ? (c += Math.PI * 2) : !a && c > u && (u += Math.PI * 2)
  let d = c
  const f = u - c,
    p = Math.abs(f),
    m = Math.sqrt(h * h + l * l),
    g = (((15 * p * Math.sqrt(m)) / Math.PI) >> 0) + 1,
    A = f / g
  if (((d += A), a)) {
    o.push(r, t, e, i)
    for (let x = 1, _ = d; x < g; x++, _ += A)
      o.push(r, t, r + Math.sin(_) * m, t + Math.cos(_) * m)
    o.push(r, t, s, n)
  } else {
    o.push(e, i, r, t)
    for (let x = 1, _ = d; x < g; x++, _ += A)
      o.push(r + Math.sin(_) * m, t + Math.cos(_) * m, r, t)
    o.push(s, n, r, t)
  }
  return g * 2
}
function Qb(r, t) {
  const e = r.shape
  let i = r.points || e.points.slice()
  const s = t.closePointEps
  if (i.length === 0) return
  const n = r.lineStyle,
    o = new pt(i[0], i[1]),
    a = new pt(i[i.length - 2], i[i.length - 1]),
    h = e.type !== Zt.POLY || e.closeStroke,
    l = Math.abs(o.x - a.x) < s && Math.abs(o.y - a.y) < s
  if (h) {
    ;(i = i.slice()), l && (i.pop(), i.pop(), a.set(i[i.length - 2], i[i.length - 1]))
    const H = (o.x + a.x) * 0.5,
      W = (a.y + o.y) * 0.5
    i.unshift(H, W), i.push(H, W)
  }
  const c = t.points,
    u = i.length / 2
  let d = i.length
  const f = c.length / 2,
    p = n.width / 2,
    m = p * p,
    g = n.miterLimit * n.miterLimit
  let A = i[0],
    x = i[1],
    _ = i[2],
    v = i[3],
    S = 0,
    C = 0,
    I = -(x - v),
    T = A - _,
    F = 0,
    k = 0,
    rt = Math.sqrt(I * I + T * T)
  ;(I /= rt), (T /= rt), (I *= p), (T *= p)
  const G = n.alignment,
    E = (1 - G) * 2,
    M = G * 2
  h ||
    (n.cap === Pr.ROUND
      ? (d +=
          jr(
            A - I * (E - M) * 0.5,
            x - T * (E - M) * 0.5,
            A - I * E,
            x - T * E,
            A + I * M,
            x + T * M,
            c,
            !0
          ) + 2)
      : n.cap === Pr.SQUARE && (d += ku(A, x, I, T, E, M, !0, c))),
    c.push(A - I * E, x - T * E, A + I * M, x + T * M)
  for (let H = 1; H < u - 1; ++H) {
    ;(A = i[(H - 1) * 2]),
      (x = i[(H - 1) * 2 + 1]),
      (_ = i[H * 2]),
      (v = i[H * 2 + 1]),
      (S = i[(H + 1) * 2]),
      (C = i[(H + 1) * 2 + 1]),
      (I = -(x - v)),
      (T = A - _),
      (rt = Math.sqrt(I * I + T * T)),
      (I /= rt),
      (T /= rt),
      (I *= p),
      (T *= p),
      (F = -(v - C)),
      (k = _ - S),
      (rt = Math.sqrt(F * F + k * k)),
      (F /= rt),
      (k /= rt),
      (F *= p),
      (k *= p)
    const W = _ - A,
      gt = x - v,
      N = _ - S,
      U = C - v,
      ot = W * N + gt * U,
      _t = gt * N - U * W,
      vt = _t < 0
    if (Math.abs(_t) < 0.001 * Math.abs(ot)) {
      c.push(_ - I * E, v - T * E, _ + I * M, v + T * M),
        ot >= 0 &&
          (n.join === Ee.ROUND
            ? (d += jr(_, v, _ - I * E, v - T * E, _ - F * E, v - k * E, c, !1) + 4)
            : (d += 2),
          c.push(_ - F * M, v - k * M, _ + F * E, v + k * E))
      continue
    }
    const Ht = (-I + A) * (-T + v) - (-I + _) * (-T + x),
      At = (-F + S) * (-k + v) - (-F + _) * (-k + C),
      Mt = (W * At - N * Ht) / _t,
      Vt = (U * Ht - gt * At) / _t,
      ee = (Mt - _) * (Mt - _) + (Vt - v) * (Vt - v),
      It = _ + (Mt - _) * E,
      xt = v + (Vt - v) * E,
      Rt = _ - (Mt - _) * M,
      y = v - (Vt - v) * M,
      b = Math.min(W * W + gt * gt, N * N + U * U),
      w = vt ? E : M,
      R = b + w * w * m,
      P = ee <= R
    let O = n.join
    if ((O === Ee.MITER && ee / m > g && (O = Ee.BEVEL), P))
      switch (O) {
        case Ee.MITER: {
          c.push(It, xt, Rt, y)
          break
        }
        case Ee.BEVEL: {
          vt
            ? c.push(It, xt, _ + I * M, v + T * M, It, xt, _ + F * M, v + k * M)
            : c.push(_ - I * E, v - T * E, Rt, y, _ - F * E, v - k * E, Rt, y),
            (d += 2)
          break
        }
        case Ee.ROUND: {
          vt
            ? (c.push(It, xt, _ + I * M, v + T * M),
              (d += jr(_, v, _ + I * M, v + T * M, _ + F * M, v + k * M, c, !0) + 4),
              c.push(It, xt, _ + F * M, v + k * M))
            : (c.push(_ - I * E, v - T * E, Rt, y),
              (d += jr(_, v, _ - I * E, v - T * E, _ - F * E, v - k * E, c, !1) + 4),
              c.push(_ - F * E, v - k * E, Rt, y))
          break
        }
      }
    else {
      switch ((c.push(_ - I * E, v - T * E, _ + I * M, v + T * M), O)) {
        case Ee.MITER: {
          vt ? c.push(Rt, y, Rt, y) : c.push(It, xt, It, xt), (d += 2)
          break
        }
        case Ee.ROUND: {
          vt
            ? (d += jr(_, v, _ + I * M, v + T * M, _ + F * M, v + k * M, c, !0) + 2)
            : (d += jr(_, v, _ - I * E, v - T * E, _ - F * E, v - k * E, c, !1) + 2)
          break
        }
      }
      c.push(_ - F * E, v - k * E, _ + F * M, v + k * M), (d += 2)
    }
  }
  ;(A = i[(u - 2) * 2]),
    (x = i[(u - 2) * 2 + 1]),
    (_ = i[(u - 1) * 2]),
    (v = i[(u - 1) * 2 + 1]),
    (I = -(x - v)),
    (T = A - _),
    (rt = Math.sqrt(I * I + T * T)),
    (I /= rt),
    (T /= rt),
    (I *= p),
    (T *= p),
    c.push(_ - I * E, v - T * E, _ + I * M, v + T * M),
    h ||
      (n.cap === Pr.ROUND
        ? (d +=
            jr(
              _ - I * (E - M) * 0.5,
              v - T * (E - M) * 0.5,
              _ - I * E,
              v - T * E,
              _ + I * M,
              v + T * M,
              c,
              !1
            ) + 2)
        : n.cap === Pr.SQUARE && (d += ku(_, v, I, T, E, M, !1, c)))
  const K = t.indices,
    Z = zi.epsilon * zi.epsilon
  for (let H = f; H < d + f - 2; ++H)
    (A = c[H * 2]),
      (x = c[H * 2 + 1]),
      (_ = c[(H + 1) * 2]),
      (v = c[(H + 1) * 2 + 1]),
      (S = c[(H + 2) * 2]),
      (C = c[(H + 2) * 2 + 1]),
      !(Math.abs(A * (v - C) + _ * (C - x) + S * (x - v)) < Z) && K.push(H, H + 1, H + 2)
}
function Kb(r, t) {
  let e = 0
  const i = r.shape,
    s = r.points || i.points,
    n = i.type !== Zt.POLY || i.closeStroke
  if (s.length === 0) return
  const o = t.points,
    a = t.indices,
    h = s.length / 2,
    l = o.length / 2
  let c = l
  for (o.push(s[0], s[1]), e = 1; e < h; e++) o.push(s[e * 2], s[e * 2 + 1]), a.push(c, c + 1), c++
  n && a.push(c, l)
}
function Gu(r, t) {
  r.lineStyle.native ? Kb(r, t) : Qb(r, t)
}
class Dl {
  static curveLength(t, e, i, s, n, o) {
    const a = t - 2 * i + n,
      h = e - 2 * s + o,
      l = 2 * i - 2 * t,
      c = 2 * s - 2 * e,
      u = 4 * (a * a + h * h),
      d = 4 * (a * l + h * c),
      f = l * l + c * c,
      p = 2 * Math.sqrt(u + d + f),
      m = Math.sqrt(u),
      g = 2 * u * m,
      A = 2 * Math.sqrt(f),
      x = d / m
    return (
      (g * p + m * d * (p - A) + (4 * f * u - d * d) * Math.log((2 * m + x + p) / (x + A))) /
      (4 * g)
    )
  }
  static curveTo(t, e, i, s, n) {
    const o = n[n.length - 2],
      a = n[n.length - 1],
      h = zi._segmentsCount(Dl.curveLength(o, a, t, e, i, s))
    let l = 0,
      c = 0
    for (let u = 1; u <= h; ++u) {
      const d = u / h
      ;(l = o + (t - o) * d),
        (c = a + (e - a) * d),
        n.push(l + (t + (i - t) * d - l) * d, c + (e + (s - e) * d - c) * d)
    }
  }
}
const Ra = { [Zt.POLY]: Op, [Zt.CIRC]: fo, [Zt.ELIP]: fo, [Zt.RECT]: $b, [Zt.RREC]: zb },
  Hu = [],
  wn = []
class po {
  constructor(t, e = null, i = null, s = null) {
    ;(this.points = []),
      (this.holes = []),
      (this.shape = t),
      (this.lineStyle = i),
      (this.fillStyle = e),
      (this.matrix = s),
      (this.type = t.type)
  }
  clone() {
    return new po(this.shape, this.fillStyle, this.lineStyle, this.matrix)
  }
  destroy() {
    ;(this.shape = null),
      (this.holes.length = 0),
      (this.holes = null),
      (this.points.length = 0),
      (this.points = null),
      (this.lineStyle = null),
      (this.fillStyle = null)
  }
}
const xi = new pt(),
  Lp = class Np extends Nf {
    constructor() {
      super(),
        (this.closePointEps = 1e-4),
        (this.boundsPadding = 0),
        (this.uvsFloat32 = null),
        (this.indicesUint16 = null),
        (this.batchable = !1),
        (this.points = []),
        (this.colors = []),
        (this.uvs = []),
        (this.indices = []),
        (this.textureIds = []),
        (this.graphicsData = []),
        (this.drawCalls = []),
        (this.batchDirty = -1),
        (this.batches = []),
        (this.dirty = 0),
        (this.cacheDirty = -1),
        (this.clearDirty = 0),
        (this.shapeIndex = 0),
        (this._bounds = new ao()),
        (this.boundsDirty = -1)
    }
    get bounds() {
      return (
        this.updateBatches(),
        this.boundsDirty !== this.dirty &&
          ((this.boundsDirty = this.dirty), this.calculateBounds()),
        this._bounds
      )
    }
    invalidate() {
      ;(this.boundsDirty = -1),
        this.dirty++,
        this.batchDirty++,
        (this.shapeIndex = 0),
        (this.points.length = 0),
        (this.colors.length = 0),
        (this.uvs.length = 0),
        (this.indices.length = 0),
        (this.textureIds.length = 0)
      for (let t = 0; t < this.drawCalls.length; t++)
        this.drawCalls[t].texArray.clear(), wn.push(this.drawCalls[t])
      this.drawCalls.length = 0
      for (let t = 0; t < this.batches.length; t++) {
        const e = this.batches[t]
        e.reset(), Hu.push(e)
      }
      this.batches.length = 0
    }
    clear() {
      return (
        this.graphicsData.length > 0 &&
          (this.invalidate(), this.clearDirty++, (this.graphicsData.length = 0)),
        this
      )
    }
    drawShape(t, e = null, i = null, s = null) {
      const n = new po(t, e, i, s)
      return this.graphicsData.push(n), this.dirty++, this
    }
    drawHole(t, e = null) {
      if (!this.graphicsData.length) return null
      const i = new po(t, null, null, e),
        s = this.graphicsData[this.graphicsData.length - 1]
      return (i.lineStyle = s.lineStyle), s.holes.push(i), this.dirty++, this
    }
    destroy() {
      super.destroy()
      for (let t = 0; t < this.graphicsData.length; ++t) this.graphicsData[t].destroy()
      ;(this.points.length = 0),
        (this.points = null),
        (this.colors.length = 0),
        (this.colors = null),
        (this.uvs.length = 0),
        (this.uvs = null),
        (this.indices.length = 0),
        (this.indices = null),
        this.indexBuffer.destroy(),
        (this.indexBuffer = null),
        (this.graphicsData.length = 0),
        (this.graphicsData = null),
        (this.drawCalls.length = 0),
        (this.drawCalls = null),
        (this.batches.length = 0),
        (this.batches = null),
        (this._bounds = null)
    }
    containsPoint(t) {
      const e = this.graphicsData
      for (let i = 0; i < e.length; ++i) {
        const s = e[i]
        if (
          s.fillStyle.visible &&
          s.shape &&
          (s.matrix ? s.matrix.applyInverse(t, xi) : xi.copyFrom(t), s.shape.contains(xi.x, xi.y))
        ) {
          let n = !1
          if (s.holes) {
            for (let o = 0; o < s.holes.length; o++)
              if (s.holes[o].shape.contains(xi.x, xi.y)) {
                n = !0
                break
              }
          }
          if (!n) return !0
        }
      }
      return !1
    }
    updateBatches() {
      if (!this.graphicsData.length) {
        this.batchable = !0
        return
      }
      if (!this.validateBatching()) return
      this.cacheDirty = this.dirty
      const t = this.uvs,
        e = this.graphicsData
      let i = null,
        s = null
      this.batches.length > 0 && ((i = this.batches[this.batches.length - 1]), (s = i.style))
      for (let h = this.shapeIndex; h < e.length; h++) {
        this.shapeIndex++
        const l = e[h],
          c = l.fillStyle,
          u = l.lineStyle
        Ra[l.type].build(l),
          l.matrix && this.transformPoints(l.points, l.matrix),
          (c.visible || u.visible) && this.processHoles(l.holes)
        for (let d = 0; d < 2; d++) {
          const f = d === 0 ? c : u
          if (!f.visible) continue
          const p = f.texture.baseTexture,
            m = this.indices.length,
            g = this.points.length / 2
          ;(p.wrapMode = fr.REPEAT), d === 0 ? this.processFill(l) : this.processLine(l)
          const A = this.points.length / 2 - g
          A !== 0 &&
            (i && !this._compareStyles(s, f) && (i.end(m, g), (i = null)),
            i || ((i = Hu.pop() || new Yb()), i.begin(f, m, g), this.batches.push(i), (s = f)),
            this.addUvs(this.points, t, f.texture, g, A, f.matrix))
        }
      }
      const n = this.indices.length,
        o = this.points.length / 2
      if ((i && i.end(n, o), this.batches.length === 0)) {
        this.batchable = !0
        return
      }
      const a = o > 65535
      this.indicesUint16 &&
      this.indices.length === this.indicesUint16.length &&
      a === this.indicesUint16.BYTES_PER_ELEMENT > 2
        ? this.indicesUint16.set(this.indices)
        : (this.indicesUint16 = a ? new Uint32Array(this.indices) : new Uint16Array(this.indices)),
        (this.batchable = this.isBatchable()),
        this.batchable ? this.packBatches() : this.buildDrawCalls()
    }
    _compareStyles(t, e) {
      return !(
        !t ||
        !e ||
        t.texture.baseTexture !== e.texture.baseTexture ||
        t.color + t.alpha !== e.color + e.alpha ||
        !!t.native != !!e.native
      )
    }
    validateBatching() {
      if (this.dirty === this.cacheDirty || !this.graphicsData.length) return !1
      for (let t = 0, e = this.graphicsData.length; t < e; t++) {
        const i = this.graphicsData[t],
          s = i.fillStyle,
          n = i.lineStyle
        if ((s && !s.texture.baseTexture.valid) || (n && !n.texture.baseTexture.valid)) return !1
      }
      return !0
    }
    packBatches() {
      this.batchDirty++, (this.uvsFloat32 = new Float32Array(this.uvs))
      const t = this.batches
      for (let e = 0, i = t.length; e < i; e++) {
        const s = t[e]
        for (let n = 0; n < s.size; n++) {
          const o = s.start + n
          this.indicesUint16[o] = this.indicesUint16[o] - s.attribStart
        }
      }
    }
    isBatchable() {
      if (this.points.length > 65535 * 2) return !1
      const t = this.batches
      for (let e = 0; e < t.length; e++) if (t[e].style.native) return !1
      return this.points.length < Np.BATCHABLE_SIZE * 2
    }
    buildDrawCalls() {
      let t = ++ht._globalBatch
      for (let u = 0; u < this.drawCalls.length; u++)
        this.drawCalls[u].texArray.clear(), wn.push(this.drawCalls[u])
      this.drawCalls.length = 0
      const e = this.colors,
        i = this.textureIds
      let s = wn.pop()
      s || ((s = new _h()), (s.texArray = new xh())),
        (s.texArray.count = 0),
        (s.start = 0),
        (s.size = 0),
        (s.type = qe.TRIANGLES)
      let n = 0,
        o = null,
        a = 0,
        h = !1,
        l = qe.TRIANGLES,
        c = 0
      this.drawCalls.push(s)
      for (let u = 0; u < this.batches.length; u++) {
        const d = this.batches[u],
          f = 8,
          p = d.style,
          m = p.texture.baseTexture
        h !== !!p.native &&
          ((h = !!p.native), (l = h ? qe.LINES : qe.TRIANGLES), (o = null), (n = f), t++),
          o !== m &&
            ((o = m),
            m._batchEnabled !== t &&
              (n === f &&
                (t++,
                (n = 0),
                s.size > 0 &&
                  ((s = wn.pop()),
                  s || ((s = new _h()), (s.texArray = new xh())),
                  this.drawCalls.push(s)),
                (s.start = c),
                (s.size = 0),
                (s.texArray.count = 0),
                (s.type = l)),
              (m.touched = 1),
              (m._batchEnabled = t),
              (m._batchLocation = n),
              (m.wrapMode = fr.REPEAT),
              (s.texArray.elements[s.texArray.count++] = m),
              n++)),
          (s.size += d.size),
          (c += d.size),
          (a = m._batchLocation),
          this.addColors(e, p.color, p.alpha, d.attribSize, d.attribStart),
          this.addTextureIds(i, a, d.attribSize, d.attribStart)
      }
      ;(ht._globalBatch = t), this.packAttributes()
    }
    packAttributes() {
      const t = this.points,
        e = this.uvs,
        i = this.colors,
        s = this.textureIds,
        n = new ArrayBuffer(t.length * 3 * 4),
        o = new Float32Array(n),
        a = new Uint32Array(n)
      let h = 0
      for (let l = 0; l < t.length / 2; l++)
        (o[h++] = t[l * 2]),
          (o[h++] = t[l * 2 + 1]),
          (o[h++] = e[l * 2]),
          (o[h++] = e[l * 2 + 1]),
          (a[h++] = i[l]),
          (o[h++] = s[l])
      this._buffer.update(n), this._indexBuffer.update(this.indicesUint16)
    }
    processFill(t) {
      t.holes.length ? Op.triangulate(t, this) : Ra[t.type].triangulate(t, this)
    }
    processLine(t) {
      Gu(t, this)
      for (let e = 0; e < t.holes.length; e++) Gu(t.holes[e], this)
    }
    processHoles(t) {
      for (let e = 0; e < t.length; e++) {
        const i = t[e]
        Ra[i.type].build(i), i.matrix && this.transformPoints(i.points, i.matrix)
      }
    }
    calculateBounds() {
      const t = this._bounds
      t.clear(),
        t.addVertexData(this.points, 0, this.points.length),
        t.pad(this.boundsPadding, this.boundsPadding)
    }
    transformPoints(t, e) {
      for (let i = 0; i < t.length / 2; i++) {
        const s = t[i * 2],
          n = t[i * 2 + 1]
        ;(t[i * 2] = e.a * s + e.c * n + e.tx), (t[i * 2 + 1] = e.b * s + e.d * n + e.ty)
      }
    }
    addColors(t, e, i, s, n = 0) {
      const o = St.shared.setValue(e).toLittleEndianNumber(),
        a = St.shared.setValue(o).toPremultiplied(i)
      t.length = Math.max(t.length, n + s)
      for (let h = 0; h < s; h++) t[n + h] = a
    }
    addTextureIds(t, e, i, s = 0) {
      t.length = Math.max(t.length, s + i)
      for (let n = 0; n < i; n++) t[s + n] = e
    }
    addUvs(t, e, i, s, n, o = null) {
      let a = 0
      const h = e.length,
        l = i.frame
      for (; a < n; ) {
        let u = t[(s + a) * 2],
          d = t[(s + a) * 2 + 1]
        if (o) {
          const f = o.a * u + o.c * d + o.tx
          ;(d = o.b * u + o.d * d + o.ty), (u = f)
        }
        a++, e.push(u / l.width, d / l.height)
      }
      const c = i.baseTexture
      ;(l.width < c.width || l.height < c.height) && this.adjustUvs(e, i, h, n)
    }
    adjustUvs(t, e, i, s) {
      const n = e.baseTexture,
        o = 1e-6,
        a = i + s * 2,
        h = e.frame,
        l = h.width / n.width,
        c = h.height / n.height
      let u = h.x / h.width,
        d = h.y / h.height,
        f = Math.floor(t[i] + o),
        p = Math.floor(t[i + 1] + o)
      for (let m = i + 2; m < a; m += 2)
        (f = Math.min(f, Math.floor(t[m] + o))), (p = Math.min(p, Math.floor(t[m + 1] + o)))
      ;(u -= f), (d -= p)
      for (let m = i; m < a; m += 2) (t[m] = (t[m] + u) * l), (t[m + 1] = (t[m + 1] + d) * c)
    }
  }
Lp.BATCHABLE_SIZE = 100
let qb = Lp
class No {
  constructor() {
    ;(this.color = 16777215),
      (this.alpha = 1),
      (this.texture = X.WHITE),
      (this.matrix = null),
      (this.visible = !1),
      this.reset()
  }
  clone() {
    const t = new No()
    return (
      (t.color = this.color),
      (t.alpha = this.alpha),
      (t.texture = this.texture),
      (t.matrix = this.matrix),
      (t.visible = this.visible),
      t
    )
  }
  reset() {
    ;(this.color = 16777215),
      (this.alpha = 1),
      (this.texture = X.WHITE),
      (this.matrix = null),
      (this.visible = !1)
  }
  destroy() {
    ;(this.texture = null), (this.matrix = null)
  }
}
class Ol extends No {
  constructor() {
    super(...arguments),
      (this.width = 0),
      (this.alignment = 0.5),
      (this.native = !1),
      (this.cap = Pr.BUTT),
      (this.join = Ee.MITER),
      (this.miterLimit = 10)
  }
  clone() {
    const t = new Ol()
    return (
      (t.color = this.color),
      (t.alpha = this.alpha),
      (t.texture = this.texture),
      (t.matrix = this.matrix),
      (t.visible = this.visible),
      (t.width = this.width),
      (t.alignment = this.alignment),
      (t.native = this.native),
      (t.cap = this.cap),
      (t.join = this.join),
      (t.miterLimit = this.miterLimit),
      t
    )
  }
  reset() {
    super.reset(),
      (this.color = 0),
      (this.alignment = 0.5),
      (this.width = 0),
      (this.native = !1),
      (this.cap = Pr.BUTT),
      (this.join = Ee.MITER),
      (this.miterLimit = 10)
  }
}
const Pa = {},
  kh = class Gn extends he {
    constructor(t = null) {
      super(),
        (this.shader = null),
        (this.pluginName = 'batch'),
        (this.currentPath = null),
        (this.batches = []),
        (this.batchTint = -1),
        (this.batchDirty = -1),
        (this.vertexData = null),
        (this._fillStyle = new No()),
        (this._lineStyle = new Ol()),
        (this._matrix = null),
        (this._holeMode = !1),
        (this.state = nr.for2d()),
        (this._geometry = t || new qb()),
        this._geometry.refCount++,
        (this._transformID = -1),
        (this._tintColor = new St(16777215)),
        (this.blendMode = st.NORMAL)
    }
    get geometry() {
      return this._geometry
    }
    clone() {
      return this.finishPoly(), new Gn(this._geometry)
    }
    set blendMode(t) {
      this.state.blendMode = t
    }
    get blendMode() {
      return this.state.blendMode
    }
    get tint() {
      return this._tintColor.value
    }
    set tint(t) {
      this._tintColor.setValue(t)
    }
    get fill() {
      return this._fillStyle
    }
    get line() {
      return this._lineStyle
    }
    lineStyle(t = null, e = 0, i, s = 0.5, n = !1) {
      return (
        typeof t == 'number' && (t = { width: t, color: e, alpha: i, alignment: s, native: n }),
        this.lineTextureStyle(t)
      )
    }
    lineTextureStyle(t) {
      const e = {
        width: 0,
        texture: X.WHITE,
        color: t != null && t.texture ? 16777215 : 0,
        matrix: null,
        alignment: 0.5,
        native: !1,
        cap: Pr.BUTT,
        join: Ee.MITER,
        miterLimit: 10
      }
      ;(t = Object.assign(e, t)), this.normalizeColor(t), this.currentPath && this.startPoly()
      const i = t.width > 0 && t.alpha > 0
      return (
        i
          ? (t.matrix && ((t.matrix = t.matrix.clone()), t.matrix.invert()),
            Object.assign(this._lineStyle, { visible: i }, t))
          : this._lineStyle.reset(),
        this
      )
    }
    startPoly() {
      if (this.currentPath) {
        const t = this.currentPath.points,
          e = this.currentPath.points.length
        e > 2 &&
          (this.drawShape(this.currentPath),
          (this.currentPath = new li()),
          (this.currentPath.closeStroke = !1),
          this.currentPath.points.push(t[e - 2], t[e - 1]))
      } else (this.currentPath = new li()), (this.currentPath.closeStroke = !1)
    }
    finishPoly() {
      this.currentPath &&
        (this.currentPath.points.length > 2
          ? (this.drawShape(this.currentPath), (this.currentPath = null))
          : (this.currentPath.points.length = 0))
    }
    moveTo(t, e) {
      return (
        this.startPoly(), (this.currentPath.points[0] = t), (this.currentPath.points[1] = e), this
      )
    }
    lineTo(t, e) {
      this.currentPath || this.moveTo(0, 0)
      const i = this.currentPath.points,
        s = i[i.length - 2],
        n = i[i.length - 1]
      return (s !== t || n !== e) && i.push(t, e), this
    }
    _initCurve(t = 0, e = 0) {
      this.currentPath
        ? this.currentPath.points.length === 0 && (this.currentPath.points = [t, e])
        : this.moveTo(t, e)
    }
    quadraticCurveTo(t, e, i, s) {
      this._initCurve()
      const n = this.currentPath.points
      return n.length === 0 && this.moveTo(0, 0), Dl.curveTo(t, e, i, s, n), this
    }
    bezierCurveTo(t, e, i, s, n, o) {
      return this._initCurve(), Fl.curveTo(t, e, i, s, n, o, this.currentPath.points), this
    }
    arcTo(t, e, i, s, n) {
      this._initCurve(t, e)
      const o = this.currentPath.points,
        a = Uu.curveTo(t, e, i, s, n, o)
      if (a) {
        const { cx: h, cy: l, radius: c, startAngle: u, endAngle: d, anticlockwise: f } = a
        this.arc(h, l, c, u, d, f)
      }
      return this
    }
    arc(t, e, i, s, n, o = !1) {
      if (s === n) return this
      if ((!o && n <= s ? (n += ro) : o && s <= n && (s += ro), n - s === 0)) return this
      const a = t + Math.cos(s) * i,
        h = e + Math.sin(s) * i,
        l = this._geometry.closePointEps
      let c = this.currentPath ? this.currentPath.points : null
      if (c) {
        const u = Math.abs(c[c.length - 2] - a),
          d = Math.abs(c[c.length - 1] - h)
        ;(u < l && d < l) || c.push(a, h)
      } else this.moveTo(a, h), (c = this.currentPath.points)
      return Uu.arc(a, h, t, e, i, s, n, o, c), this
    }
    beginFill(t = 0, e) {
      return this.beginTextureFill({ texture: X.WHITE, color: t, alpha: e })
    }
    normalizeColor(t) {
      const e = St.shared.setValue(t.color ?? 0)
      ;(t.color = e.toNumber()), t.alpha ?? (t.alpha = e.alpha)
    }
    beginTextureFill(t) {
      const e = { texture: X.WHITE, color: 16777215, matrix: null }
      ;(t = Object.assign(e, t)), this.normalizeColor(t), this.currentPath && this.startPoly()
      const i = t.alpha > 0
      return (
        i
          ? (t.matrix && ((t.matrix = t.matrix.clone()), t.matrix.invert()),
            Object.assign(this._fillStyle, { visible: i }, t))
          : this._fillStyle.reset(),
        this
      )
    }
    endFill() {
      return this.finishPoly(), this._fillStyle.reset(), this
    }
    drawRect(t, e, i, s) {
      return this.drawShape(new nt(t, e, i, s))
    }
    drawRoundedRect(t, e, i, s, n) {
      return this.drawShape(new Fo(t, e, i, s, n))
    }
    drawCircle(t, e, i) {
      return this.drawShape(new Mo(t, e, i))
    }
    drawEllipse(t, e, i, s) {
      return this.drawShape(new Bo(t, e, i, s))
    }
    drawPolygon(...t) {
      let e,
        i = !0
      const s = t[0]
      s.points ? ((i = s.closeStroke), (e = s.points)) : Array.isArray(t[0]) ? (e = t[0]) : (e = t)
      const n = new li(e)
      return (n.closeStroke = i), this.drawShape(n), this
    }
    drawShape(t) {
      return (
        this._holeMode
          ? this._geometry.drawHole(t, this._matrix)
          : this._geometry.drawShape(
              t,
              this._fillStyle.clone(),
              this._lineStyle.clone(),
              this._matrix
            ),
        this
      )
    }
    clear() {
      return (
        this._geometry.clear(),
        this._lineStyle.reset(),
        this._fillStyle.reset(),
        this._boundsID++,
        (this._matrix = null),
        (this._holeMode = !1),
        (this.currentPath = null),
        this
      )
    }
    isFastRect() {
      const t = this._geometry.graphicsData
      return (
        t.length === 1 &&
        t[0].shape.type === Zt.RECT &&
        !t[0].matrix &&
        !t[0].holes.length &&
        !(t[0].lineStyle.visible && t[0].lineStyle.width)
      )
    }
    _render(t) {
      this.finishPoly()
      const e = this._geometry
      e.updateBatches(),
        e.batchable
          ? (this.batchDirty !== e.batchDirty && this._populateBatches(), this._renderBatched(t))
          : (t.batch.flush(), this._renderDirect(t))
    }
    _populateBatches() {
      const t = this._geometry,
        e = this.blendMode,
        i = t.batches.length
      ;(this.batchTint = -1),
        (this._transformID = -1),
        (this.batchDirty = t.batchDirty),
        (this.batches.length = i),
        (this.vertexData = new Float32Array(t.points))
      for (let s = 0; s < i; s++) {
        const n = t.batches[s],
          o = n.style.color,
          a = new Float32Array(this.vertexData.buffer, n.attribStart * 4 * 2, n.attribSize * 2),
          h = new Float32Array(t.uvsFloat32.buffer, n.attribStart * 4 * 2, n.attribSize * 2),
          l = new Uint16Array(t.indicesUint16.buffer, n.start * 2, n.size),
          c = {
            vertexData: a,
            blendMode: e,
            indices: l,
            uvs: h,
            _batchRGB: St.shared.setValue(o).toRgbArray(),
            _tintRGB: o,
            _texture: n.style.texture,
            alpha: n.style.alpha,
            worldAlpha: 1
          }
        this.batches[s] = c
      }
    }
    _renderBatched(t) {
      if (this.batches.length) {
        t.batch.setObjectRenderer(t.plugins[this.pluginName]),
          this.calculateVertices(),
          this.calculateTints()
        for (let e = 0, i = this.batches.length; e < i; e++) {
          const s = this.batches[e]
          ;(s.worldAlpha = this.worldAlpha * s.alpha), t.plugins[this.pluginName].render(s)
        }
      }
    }
    _renderDirect(t) {
      const e = this._resolveDirectShader(t),
        i = this._geometry,
        s = this.worldAlpha,
        n = e.uniforms,
        o = i.drawCalls
      ;(n.translationMatrix = this.transform.worldTransform),
        St.shared.setValue(this._tintColor).premultiply(s).toArray(n.tint),
        t.shader.bind(e),
        t.geometry.bind(i, e),
        t.state.set(this.state)
      for (let a = 0, h = o.length; a < h; a++) this._renderDrawCallDirect(t, i.drawCalls[a])
    }
    _renderDrawCallDirect(t, e) {
      const { texArray: i, type: s, size: n, start: o } = e,
        a = i.count
      for (let h = 0; h < a; h++) t.texture.bind(i.elements[h], h)
      t.geometry.draw(s, n, o)
    }
    _resolveDirectShader(t) {
      let e = this.shader
      const i = this.pluginName
      if (!e) {
        if (!Pa[i]) {
          const { maxTextures: s } = t.plugins[i],
            n = new Int32Array(s)
          for (let h = 0; h < s; h++) n[h] = h
          const o = {
              tint: new Float32Array([1, 1, 1, 1]),
              translationMatrix: new Ct(),
              default: Le.from({ uSamplers: n }, !0)
            },
            a = t.plugins[i]._shader.program
          Pa[i] = new Je(a, o)
        }
        e = Pa[i]
      }
      return e
    }
    _calculateBounds() {
      this.finishPoly()
      const t = this._geometry
      if (!t.graphicsData.length) return
      const { minX: e, minY: i, maxX: s, maxY: n } = t.bounds
      this._bounds.addFrame(this.transform, e, i, s, n)
    }
    containsPoint(t) {
      return (
        this.worldTransform.applyInverse(t, Gn._TEMP_POINT),
        this._geometry.containsPoint(Gn._TEMP_POINT)
      )
    }
    calculateTints() {
      if (this.batchTint !== this.tint) {
        this.batchTint = this._tintColor.toNumber()
        for (let t = 0; t < this.batches.length; t++) {
          const e = this.batches[t]
          e._tintRGB = St.shared
            .setValue(this._tintColor)
            .multiply(e._batchRGB)
            .toLittleEndianNumber()
        }
      }
    }
    calculateVertices() {
      const t = this.transform._worldID
      if (this._transformID === t) return
      this._transformID = t
      const e = this.transform.worldTransform,
        i = e.a,
        s = e.b,
        n = e.c,
        o = e.d,
        a = e.tx,
        h = e.ty,
        l = this._geometry.points,
        c = this.vertexData
      let u = 0
      for (let d = 0; d < l.length; d += 2) {
        const f = l[d],
          p = l[d + 1]
        ;(c[u++] = i * f + n * p + a), (c[u++] = o * p + s * f + h)
      }
    }
    closePath() {
      const t = this.currentPath
      return t && ((t.closeStroke = !0), this.finishPoly()), this
    }
    setMatrix(t) {
      return (this._matrix = t), this
    }
    beginHole() {
      return this.finishPoly(), (this._holeMode = !0), this
    }
    endHole() {
      return this.finishPoly(), (this._holeMode = !1), this
    }
    destroy(t) {
      this._geometry.refCount--,
        this._geometry.refCount === 0 && this._geometry.dispose(),
        (this._matrix = null),
        (this.currentPath = null),
        this._lineStyle.destroy(),
        (this._lineStyle = null),
        this._fillStyle.destroy(),
        (this._fillStyle = null),
        (this._geometry = null),
        (this.shader = null),
        (this.vertexData = null),
        (this.batches.length = 0),
        (this.batches = null),
        super.destroy(t)
    }
  }
;(kh.curves = zi), (kh._TEMP_POINT = new pt())
let Uo = kh
class Zb {
  constructor(t, e) {
    ;(this.uvBuffer = t),
      (this.uvMatrix = e),
      (this.data = null),
      (this._bufferUpdateId = -1),
      (this._textureUpdateId = -1),
      (this._updateID = 0)
  }
  update(t) {
    if (
      !t &&
      this._bufferUpdateId === this.uvBuffer._updateID &&
      this._textureUpdateId === this.uvMatrix._updateID
    )
      return
    ;(this._bufferUpdateId = this.uvBuffer._updateID),
      (this._textureUpdateId = this.uvMatrix._updateID)
    const e = this.uvBuffer.data
    ;(!this.data || this.data.length !== e.length) && (this.data = new Float32Array(e.length)),
      this.uvMatrix.multiplyUvs(e, this.data),
      this._updateID++
  }
}
const Ma = new pt(),
  Vu = new li(),
  Up = class kp extends he {
    constructor(t, e, i, s = qe.TRIANGLES) {
      super(),
        (this.geometry = t),
        (this.shader = e),
        (this.state = i || nr.for2d()),
        (this.drawMode = s),
        (this.start = 0),
        (this.size = 0),
        (this.uvs = null),
        (this.indices = null),
        (this.vertexData = new Float32Array(1)),
        (this.vertexDirty = -1),
        (this._transformID = -1),
        (this._roundPixels = Y.ROUND_PIXELS),
        (this.batchUvs = null)
    }
    get geometry() {
      return this._geometry
    }
    set geometry(t) {
      this._geometry !== t &&
        (this._geometry &&
          (this._geometry.refCount--, this._geometry.refCount === 0 && this._geometry.dispose()),
        (this._geometry = t),
        this._geometry && this._geometry.refCount++,
        (this.vertexDirty = -1))
    }
    get uvBuffer() {
      return this.geometry.buffers[1]
    }
    get verticesBuffer() {
      return this.geometry.buffers[0]
    }
    set material(t) {
      this.shader = t
    }
    get material() {
      return this.shader
    }
    set blendMode(t) {
      this.state.blendMode = t
    }
    get blendMode() {
      return this.state.blendMode
    }
    set roundPixels(t) {
      this._roundPixels !== t && (this._transformID = -1), (this._roundPixels = t)
    }
    get roundPixels() {
      return this._roundPixels
    }
    get tint() {
      return 'tint' in this.shader ? this.shader.tint : null
    }
    set tint(t) {
      this.shader.tint = t
    }
    get tintValue() {
      return this.shader.tintValue
    }
    get texture() {
      return 'texture' in this.shader ? this.shader.texture : null
    }
    set texture(t) {
      this.shader.texture = t
    }
    _render(t) {
      const e = this.geometry.buffers[0].data
      this.shader.batchable && this.drawMode === qe.TRIANGLES && e.length < kp.BATCHABLE_SIZE * 2
        ? this._renderToBatch(t)
        : this._renderDefault(t)
    }
    _renderDefault(t) {
      const e = this.shader
      ;(e.alpha = this.worldAlpha),
        e.update && e.update(),
        t.batch.flush(),
        (e.uniforms.translationMatrix = this.transform.worldTransform.toArray(!0)),
        t.shader.bind(e),
        t.state.set(this.state),
        t.geometry.bind(this.geometry, e),
        t.geometry.draw(this.drawMode, this.size, this.start, this.geometry.instanceCount)
    }
    _renderToBatch(t) {
      const e = this.geometry,
        i = this.shader
      i.uvMatrix && (i.uvMatrix.update(), this.calculateUvs()),
        this.calculateVertices(),
        (this.indices = e.indexBuffer.data),
        (this._tintRGB = i._tintRGB),
        (this._texture = i.texture)
      const s = this.material.pluginName
      t.batch.setObjectRenderer(t.plugins[s]), t.plugins[s].render(this)
    }
    calculateVertices() {
      const t = this.geometry.buffers[0],
        e = t.data,
        i = t._updateID
      if (i === this.vertexDirty && this._transformID === this.transform._worldID) return
      ;(this._transformID = this.transform._worldID),
        this.vertexData.length !== e.length && (this.vertexData = new Float32Array(e.length))
      const s = this.transform.worldTransform,
        n = s.a,
        o = s.b,
        a = s.c,
        h = s.d,
        l = s.tx,
        c = s.ty,
        u = this.vertexData
      for (let d = 0; d < u.length / 2; d++) {
        const f = e[d * 2],
          p = e[d * 2 + 1]
        ;(u[d * 2] = n * f + a * p + l), (u[d * 2 + 1] = o * f + h * p + c)
      }
      if (this._roundPixels) {
        const d = Y.RESOLUTION
        for (let f = 0; f < u.length; ++f) u[f] = Math.round(u[f] * d) / d
      }
      this.vertexDirty = i
    }
    calculateUvs() {
      const t = this.geometry.buffers[1],
        e = this.shader
      e.uvMatrix.isSimple
        ? (this.uvs = t.data)
        : (this.batchUvs || (this.batchUvs = new Zb(t, e.uvMatrix)),
          this.batchUvs.update(),
          (this.uvs = this.batchUvs.data))
    }
    _calculateBounds() {
      this.calculateVertices(),
        this._bounds.addVertexData(this.vertexData, 0, this.vertexData.length)
    }
    containsPoint(t) {
      if (!this.getBounds().contains(t.x, t.y)) return !1
      this.worldTransform.applyInverse(t, Ma)
      const e = this.geometry.getBuffer('aVertexPosition').data,
        i = Vu.points,
        s = this.geometry.getIndex().data,
        n = s.length,
        o = this.drawMode === 4 ? 3 : 1
      for (let a = 0; a + 2 < n; a += o) {
        const h = s[a] * 2,
          l = s[a + 1] * 2,
          c = s[a + 2] * 2
        if (
          ((i[0] = e[h]),
          (i[1] = e[h + 1]),
          (i[2] = e[l]),
          (i[3] = e[l + 1]),
          (i[4] = e[c]),
          (i[5] = e[c + 1]),
          Vu.contains(Ma.x, Ma.y))
        )
          return !0
      }
      return !1
    }
    destroy(t) {
      super.destroy(t),
        this._cachedTexture && (this._cachedTexture.destroy(), (this._cachedTexture = null)),
        (this.geometry = null),
        (this.shader = null),
        (this.state = null),
        (this.uvs = null),
        (this.indices = null),
        (this.vertexData = null)
    }
  }
Up.BATCHABLE_SIZE = 100
let fi = Up
class ko extends Dr {
  constructor(t, e, i) {
    super()
    const s = new Ut(t),
      n = new Ut(e, !0),
      o = new Ut(i, !0, !0)
    this.addAttribute('aVertexPosition', s, 2, !1, tt.FLOAT)
      .addAttribute('aTextureCoord', n, 2, !1, tt.FLOAT)
      .addIndex(o),
      (this._updateId = -1)
  }
  get vertexDirtyId() {
    return this.buffers[0]._updateID
  }
}
var Jb = `varying vec2 vTextureCoord;
uniform vec4 uColor;

uniform sampler2D uSampler;

void main(void)
{
    gl_FragColor = texture2D(uSampler, vTextureCoord) * uColor;
}
`,
  t1 = `attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat3 projectionMatrix;
uniform mat3 translationMatrix;
uniform mat3 uTextureMatrix;

varying vec2 vTextureCoord;

void main(void)
{
    gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);

    vTextureCoord = (uTextureMatrix * vec3(aTextureCoord, 1.0)).xy;
}
`
class Ns extends Je {
  constructor(t, e) {
    const i = {
      uSampler: t,
      alpha: 1,
      uTextureMatrix: Ct.IDENTITY,
      uColor: new Float32Array([1, 1, 1, 1])
    }
    ;(e = Object.assign({ tint: 16777215, alpha: 1, pluginName: 'batch' }, e)),
      e.uniforms && Object.assign(i, e.uniforms),
      super(e.program || ur.from(t1, Jb), i),
      (this._colorDirty = !1),
      (this.uvMatrix = new Pl(t)),
      (this.batchable = e.program === void 0),
      (this.pluginName = e.pluginName),
      (this._tintColor = new St(e.tint)),
      (this._tintRGB = this._tintColor.toLittleEndianNumber()),
      (this._colorDirty = !0),
      (this.alpha = e.alpha)
  }
  get texture() {
    return this.uniforms.uSampler
  }
  set texture(t) {
    this.uniforms.uSampler !== t &&
      (!this.uniforms.uSampler.baseTexture.alphaMode != !t.baseTexture.alphaMode &&
        (this._colorDirty = !0),
      (this.uniforms.uSampler = t),
      (this.uvMatrix.texture = t))
  }
  set alpha(t) {
    t !== this._alpha && ((this._alpha = t), (this._colorDirty = !0))
  }
  get alpha() {
    return this._alpha
  }
  set tint(t) {
    t !== this.tint &&
      (this._tintColor.setValue(t),
      (this._tintRGB = this._tintColor.toLittleEndianNumber()),
      (this._colorDirty = !0))
  }
  get tint() {
    return this._tintColor.value
  }
  get tintValue() {
    return this._tintColor.toNumber()
  }
  update() {
    if (this._colorDirty) {
      this._colorDirty = !1
      const t = this.texture.baseTexture.alphaMode
      St.shared.setValue(this._tintColor).premultiply(this._alpha, t).toArray(this.uniforms.uColor)
    }
    this.uvMatrix.update() && (this.uniforms.uTextureMatrix = this.uvMatrix.mapCoord)
  }
}
class e1 extends ko {
  constructor(t = 100, e = 100, i = 10, s = 10) {
    super(),
      (this.segWidth = i),
      (this.segHeight = s),
      (this.width = t),
      (this.height = e),
      this.build()
  }
  build() {
    const t = this.segWidth * this.segHeight,
      e = [],
      i = [],
      s = [],
      n = this.segWidth - 1,
      o = this.segHeight - 1,
      a = this.width / n,
      h = this.height / o
    for (let c = 0; c < t; c++) {
      const u = c % this.segWidth,
        d = (c / this.segWidth) | 0
      e.push(u * a, d * h), i.push(u / n, d / o)
    }
    const l = n * o
    for (let c = 0; c < l; c++) {
      const u = c % n,
        d = (c / n) | 0,
        f = d * this.segWidth + u,
        p = d * this.segWidth + u + 1,
        m = (d + 1) * this.segWidth + u,
        g = (d + 1) * this.segWidth + u + 1
      s.push(f, p, m, p, g, m)
    }
    ;(this.buffers[0].data = new Float32Array(e)),
      (this.buffers[1].data = new Float32Array(i)),
      (this.indexBuffer.data = new Uint16Array(s)),
      this.buffers[0].update(),
      this.buffers[1].update(),
      this.indexBuffer.update()
  }
}
class r1 extends ko {
  constructor(t = 200, e, i = 0) {
    super(
      new Float32Array(e.length * 4),
      new Float32Array(e.length * 4),
      new Uint16Array((e.length - 1) * 6)
    ),
      (this.points = e),
      (this._width = t),
      (this.textureScale = i),
      this.build()
  }
  get width() {
    return this._width
  }
  build() {
    const t = this.points
    if (!t) return
    const e = this.getBuffer('aVertexPosition'),
      i = this.getBuffer('aTextureCoord'),
      s = this.getIndex()
    if (t.length < 1) return
    e.data.length / 4 !== t.length &&
      ((e.data = new Float32Array(t.length * 4)),
      (i.data = new Float32Array(t.length * 4)),
      (s.data = new Uint16Array((t.length - 1) * 6)))
    const n = i.data,
      o = s.data
    ;(n[0] = 0), (n[1] = 0), (n[2] = 0), (n[3] = 1)
    let a = 0,
      h = t[0]
    const l = this._width * this.textureScale,
      c = t.length
    for (let d = 0; d < c; d++) {
      const f = d * 4
      if (this.textureScale > 0) {
        const p = h.x - t[d].x,
          m = h.y - t[d].y,
          g = Math.sqrt(p * p + m * m)
        ;(h = t[d]), (a += g / l)
      } else a = d / (c - 1)
      ;(n[f] = a), (n[f + 1] = 0), (n[f + 2] = a), (n[f + 3] = 1)
    }
    let u = 0
    for (let d = 0; d < c - 1; d++) {
      const f = d * 2
      ;(o[u++] = f),
        (o[u++] = f + 1),
        (o[u++] = f + 2),
        (o[u++] = f + 2),
        (o[u++] = f + 1),
        (o[u++] = f + 3)
    }
    i.update(), s.update(), this.updateVertices()
  }
  updateVertices() {
    const t = this.points
    if (t.length < 1) return
    let e = t[0],
      i,
      s = 0,
      n = 0
    const o = this.buffers[0].data,
      a = t.length,
      h = this.textureScale > 0 ? (this.textureScale * this._width) / 2 : this._width / 2
    for (let l = 0; l < a; l++) {
      const c = t[l],
        u = l * 4
      l < t.length - 1 ? (i = t[l + 1]) : (i = c), (n = -(i.x - e.x)), (s = i.y - e.y)
      const d = Math.sqrt(s * s + n * n)
      d < 1e-6 ? ((s = 0), (n = 0)) : ((s /= d), (n /= d), (s *= h), (n *= h)),
        (o[u] = c.x + s),
        (o[u + 1] = c.y + n),
        (o[u + 2] = c.x - s),
        (o[u + 3] = c.y - n),
        (e = c)
    }
    this.buffers[0].update()
  }
  update() {
    this.textureScale > 0 ? this.build() : this.updateVertices()
  }
}
class Ll extends fi {
  constructor(t, e, i) {
    const s = new e1(t.width, t.height, e, i),
      n = new Ns(X.WHITE)
    super(s, n), (this.texture = t), (this.autoResize = !0)
  }
  textureUpdated() {
    this._textureID = this.shader.texture._updateID
    const t = this.geometry,
      { width: e, height: i } = this.shader.texture
    this.autoResize &&
      (t.width !== e || t.height !== i) &&
      ((t.width = this.shader.texture.width), (t.height = this.shader.texture.height), t.build())
  }
  set texture(t) {
    this.shader.texture !== t &&
      ((this.shader.texture = t),
      (this._textureID = -1),
      t.baseTexture.valid ? this.textureUpdated() : t.once('update', this.textureUpdated, this))
  }
  get texture() {
    return this.shader.texture
  }
  _render(t) {
    this._textureID !== this.shader.texture._updateID && this.textureUpdated(), super._render(t)
  }
  destroy(t) {
    this.shader.texture.off('update', this.textureUpdated, this), super.destroy(t)
  }
}
const Sn = 10
class i1 extends Ll {
  constructor(t, e, i, s, n) {
    var o, a, h, l
    super(X.WHITE, 4, 4),
      (this._origWidth = t.orig.width),
      (this._origHeight = t.orig.height),
      (this._width = this._origWidth),
      (this._height = this._origHeight),
      (this._leftWidth = e ?? ((o = t.defaultBorders) == null ? void 0 : o.left) ?? Sn),
      (this._rightWidth = s ?? ((a = t.defaultBorders) == null ? void 0 : a.right) ?? Sn),
      (this._topHeight = i ?? ((h = t.defaultBorders) == null ? void 0 : h.top) ?? Sn),
      (this._bottomHeight = n ?? ((l = t.defaultBorders) == null ? void 0 : l.bottom) ?? Sn),
      (this.texture = t)
  }
  textureUpdated() {
    ;(this._textureID = this.shader.texture._updateID), this._refresh()
  }
  get vertices() {
    return this.geometry.getBuffer('aVertexPosition').data
  }
  set vertices(t) {
    this.geometry.getBuffer('aVertexPosition').data = t
  }
  updateHorizontalVertices() {
    const t = this.vertices,
      e = this._getMinScale()
    ;(t[9] = t[11] = t[13] = t[15] = this._topHeight * e),
      (t[17] = t[19] = t[21] = t[23] = this._height - this._bottomHeight * e),
      (t[25] = t[27] = t[29] = t[31] = this._height)
  }
  updateVerticalVertices() {
    const t = this.vertices,
      e = this._getMinScale()
    ;(t[2] = t[10] = t[18] = t[26] = this._leftWidth * e),
      (t[4] = t[12] = t[20] = t[28] = this._width - this._rightWidth * e),
      (t[6] = t[14] = t[22] = t[30] = this._width)
  }
  _getMinScale() {
    const t = this._leftWidth + this._rightWidth,
      e = this._width > t ? 1 : this._width / t,
      i = this._topHeight + this._bottomHeight,
      s = this._height > i ? 1 : this._height / i
    return Math.min(e, s)
  }
  get width() {
    return this._width
  }
  set width(t) {
    ;(this._width = t), this._refresh()
  }
  get height() {
    return this._height
  }
  set height(t) {
    ;(this._height = t), this._refresh()
  }
  get leftWidth() {
    return this._leftWidth
  }
  set leftWidth(t) {
    ;(this._leftWidth = t), this._refresh()
  }
  get rightWidth() {
    return this._rightWidth
  }
  set rightWidth(t) {
    ;(this._rightWidth = t), this._refresh()
  }
  get topHeight() {
    return this._topHeight
  }
  set topHeight(t) {
    ;(this._topHeight = t), this._refresh()
  }
  get bottomHeight() {
    return this._bottomHeight
  }
  set bottomHeight(t) {
    ;(this._bottomHeight = t), this._refresh()
  }
  _refresh() {
    const t = this.texture,
      e = this.geometry.buffers[1].data
    ;(this._origWidth = t.orig.width), (this._origHeight = t.orig.height)
    const i = 1 / this._origWidth,
      s = 1 / this._origHeight
    ;(e[0] = e[8] = e[16] = e[24] = 0),
      (e[1] = e[3] = e[5] = e[7] = 0),
      (e[6] = e[14] = e[22] = e[30] = 1),
      (e[25] = e[27] = e[29] = e[31] = 1),
      (e[2] = e[10] = e[18] = e[26] = i * this._leftWidth),
      (e[4] = e[12] = e[20] = e[28] = 1 - i * this._rightWidth),
      (e[9] = e[11] = e[13] = e[15] = s * this._topHeight),
      (e[17] = e[19] = e[21] = e[23] = 1 - s * this._bottomHeight),
      this.updateHorizontalVertices(),
      this.updateVerticalVertices(),
      this.geometry.buffers[0].update(),
      this.geometry.buffers[1].update()
  }
}
class s1 extends fi {
  constructor(t = X.EMPTY, e, i, s, n) {
    const o = new ko(e, i, s)
    o.getBuffer('aVertexPosition').static = !1
    const a = new Ns(t)
    super(o, a, null, n), (this.autoUpdate = !0)
  }
  get vertices() {
    return this.geometry.getBuffer('aVertexPosition').data
  }
  set vertices(t) {
    this.geometry.getBuffer('aVertexPosition').data = t
  }
  _render(t) {
    this.autoUpdate && this.geometry.getBuffer('aVertexPosition').update(), super._render(t)
  }
}
class n1 extends fi {
  constructor(t, e, i = 0) {
    const s = new r1(t.height, e, i),
      n = new Ns(t)
    i > 0 && (t.baseTexture.wrapMode = fr.REPEAT), super(s, n), (this.autoUpdate = !0)
  }
  _render(t) {
    const e = this.geometry
    ;(this.autoUpdate || e._width !== this.shader.texture.height) &&
      ((e._width = this.shader.texture.height), e.update()),
      super._render(t)
  }
}
class Xu {
  constructor(t, e, i) {
    ;(this.geometry = new Dr()),
      (this.indexBuffer = null),
      (this.size = i),
      (this.dynamicProperties = []),
      (this.staticProperties = [])
    for (let s = 0; s < t.length; ++s) {
      let n = t[s]
      ;(n = {
        attributeName: n.attributeName,
        size: n.size,
        uploadFunction: n.uploadFunction,
        type: n.type || tt.FLOAT,
        offset: n.offset
      }),
        e[s] ? this.dynamicProperties.push(n) : this.staticProperties.push(n)
    }
    ;(this.staticStride = 0),
      (this.staticBuffer = null),
      (this.staticData = null),
      (this.staticDataUint32 = null),
      (this.dynamicStride = 0),
      (this.dynamicBuffer = null),
      (this.dynamicData = null),
      (this.dynamicDataUint32 = null),
      (this._updateID = 0),
      this.initBuffers()
  }
  initBuffers() {
    const t = this.geometry
    let e = 0
    ;(this.indexBuffer = new Ut(C0(this.size), !0, !0)),
      t.addIndex(this.indexBuffer),
      (this.dynamicStride = 0)
    for (let o = 0; o < this.dynamicProperties.length; ++o) {
      const a = this.dynamicProperties[o]
      ;(a.offset = e), (e += a.size), (this.dynamicStride += a.size)
    }
    const i = new ArrayBuffer(this.size * this.dynamicStride * 4 * 4)
    ;(this.dynamicData = new Float32Array(i)),
      (this.dynamicDataUint32 = new Uint32Array(i)),
      (this.dynamicBuffer = new Ut(this.dynamicData, !1, !1))
    let s = 0
    this.staticStride = 0
    for (let o = 0; o < this.staticProperties.length; ++o) {
      const a = this.staticProperties[o]
      ;(a.offset = s), (s += a.size), (this.staticStride += a.size)
    }
    const n = new ArrayBuffer(this.size * this.staticStride * 4 * 4)
    ;(this.staticData = new Float32Array(n)),
      (this.staticDataUint32 = new Uint32Array(n)),
      (this.staticBuffer = new Ut(this.staticData, !0, !1))
    for (let o = 0; o < this.dynamicProperties.length; ++o) {
      const a = this.dynamicProperties[o]
      t.addAttribute(
        a.attributeName,
        this.dynamicBuffer,
        0,
        a.type === tt.UNSIGNED_BYTE,
        a.type,
        this.dynamicStride * 4,
        a.offset * 4
      )
    }
    for (let o = 0; o < this.staticProperties.length; ++o) {
      const a = this.staticProperties[o]
      t.addAttribute(
        a.attributeName,
        this.staticBuffer,
        0,
        a.type === tt.UNSIGNED_BYTE,
        a.type,
        this.staticStride * 4,
        a.offset * 4
      )
    }
  }
  uploadDynamic(t, e, i) {
    for (let s = 0; s < this.dynamicProperties.length; s++) {
      const n = this.dynamicProperties[s]
      n.uploadFunction(
        t,
        e,
        i,
        n.type === tt.UNSIGNED_BYTE ? this.dynamicDataUint32 : this.dynamicData,
        this.dynamicStride,
        n.offset
      )
    }
    this.dynamicBuffer._updateID++
  }
  uploadStatic(t, e, i) {
    for (let s = 0; s < this.staticProperties.length; s++) {
      const n = this.staticProperties[s]
      n.uploadFunction(
        t,
        e,
        i,
        n.type === tt.UNSIGNED_BYTE ? this.staticDataUint32 : this.staticData,
        this.staticStride,
        n.offset
      )
    }
    this.staticBuffer._updateID++
  }
  destroy() {
    ;(this.indexBuffer = null),
      (this.dynamicProperties = null),
      (this.dynamicBuffer = null),
      (this.dynamicData = null),
      (this.dynamicDataUint32 = null),
      (this.staticProperties = null),
      (this.staticBuffer = null),
      (this.staticData = null),
      (this.staticDataUint32 = null),
      this.geometry.destroy()
  }
}
var o1 = `varying vec2 vTextureCoord;
varying vec4 vColor;

uniform sampler2D uSampler;

void main(void){
    vec4 color = texture2D(uSampler, vTextureCoord) * vColor;
    gl_FragColor = color;
}`,
  a1 = `attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;
attribute vec4 aColor;

attribute vec2 aPositionCoord;
attribute float aRotation;

uniform mat3 translationMatrix;
uniform vec4 uColor;

varying vec2 vTextureCoord;
varying vec4 vColor;

void main(void){
    float x = (aVertexPosition.x) * cos(aRotation) - (aVertexPosition.y) * sin(aRotation);
    float y = (aVertexPosition.x) * sin(aRotation) + (aVertexPosition.y) * cos(aRotation);

    vec2 v = vec2(x, y);
    v = v + aPositionCoord;

    gl_Position = vec4((translationMatrix * vec3(v, 1.0)).xy, 0.0, 1.0);

    vTextureCoord = aTextureCoord;
    vColor = aColor * uColor;
}
`
class Gp extends Oo {
  constructor(t) {
    super(t),
      (this.shader = null),
      (this.properties = null),
      (this.tempMatrix = new Ct()),
      (this.properties = [
        {
          attributeName: 'aVertexPosition',
          size: 2,
          uploadFunction: this.uploadVertices,
          offset: 0
        },
        {
          attributeName: 'aPositionCoord',
          size: 2,
          uploadFunction: this.uploadPosition,
          offset: 0
        },
        { attributeName: 'aRotation', size: 1, uploadFunction: this.uploadRotation, offset: 0 },
        { attributeName: 'aTextureCoord', size: 2, uploadFunction: this.uploadUvs, offset: 0 },
        {
          attributeName: 'aColor',
          size: 1,
          type: tt.UNSIGNED_BYTE,
          uploadFunction: this.uploadTint,
          offset: 0
        }
      ]),
      (this.shader = Je.from(a1, o1, {})),
      (this.state = nr.for2d())
  }
  render(t) {
    const e = t.children,
      i = t._maxSize,
      s = t._batchSize,
      n = this.renderer
    let o = e.length
    if (o === 0) return
    o > i && !t.autoResize && (o = i)
    let a = t._buffers
    a || (a = t._buffers = this.generateBuffers(t))
    const h = e[0]._texture.baseTexture,
      l = h.alphaMode > 0
    ;(this.state.blendMode = Df(t.blendMode, l)), n.state.set(this.state)
    const c = n.gl,
      u = t.worldTransform.copyTo(this.tempMatrix)
    u.prepend(n.globalUniforms.uniforms.projectionMatrix),
      (this.shader.uniforms.translationMatrix = u.toArray(!0)),
      (this.shader.uniforms.uColor = St.shared
        .setValue(t.tintRgb)
        .premultiply(t.worldAlpha, l)
        .toArray(this.shader.uniforms.uColor)),
      (this.shader.uniforms.uSampler = h),
      this.renderer.shader.bind(this.shader)
    let d = !1
    for (let f = 0, p = 0; f < o; f += s, p += 1) {
      let m = o - f
      m > s && (m = s), p >= a.length && a.push(this._generateOneMoreBuffer(t))
      const g = a[p]
      g.uploadDynamic(e, f, m)
      const A = t._bufferUpdateIDs[p] || 0
      ;(d = d || g._updateID < A),
        d && ((g._updateID = t._updateID), g.uploadStatic(e, f, m)),
        n.geometry.bind(g.geometry),
        c.drawElements(c.TRIANGLES, m * 6, c.UNSIGNED_SHORT, 0)
    }
  }
  generateBuffers(t) {
    const e = [],
      i = t._maxSize,
      s = t._batchSize,
      n = t._properties
    for (let o = 0; o < i; o += s) e.push(new Xu(this.properties, n, s))
    return e
  }
  _generateOneMoreBuffer(t) {
    const e = t._batchSize,
      i = t._properties
    return new Xu(this.properties, i, e)
  }
  uploadVertices(t, e, i, s, n, o) {
    let a = 0,
      h = 0,
      l = 0,
      c = 0
    for (let u = 0; u < i; ++u) {
      const d = t[e + u],
        f = d._texture,
        p = d.scale.x,
        m = d.scale.y,
        g = f.trim,
        A = f.orig
      g
        ? ((h = g.x - d.anchor.x * A.width),
          (a = h + g.width),
          (c = g.y - d.anchor.y * A.height),
          (l = c + g.height))
        : ((a = A.width * (1 - d.anchor.x)),
          (h = A.width * -d.anchor.x),
          (l = A.height * (1 - d.anchor.y)),
          (c = A.height * -d.anchor.y)),
        (s[o] = h * p),
        (s[o + 1] = c * m),
        (s[o + n] = a * p),
        (s[o + n + 1] = c * m),
        (s[o + n * 2] = a * p),
        (s[o + n * 2 + 1] = l * m),
        (s[o + n * 3] = h * p),
        (s[o + n * 3 + 1] = l * m),
        (o += n * 4)
    }
  }
  uploadPosition(t, e, i, s, n, o) {
    for (let a = 0; a < i; a++) {
      const h = t[e + a].position
      ;(s[o] = h.x),
        (s[o + 1] = h.y),
        (s[o + n] = h.x),
        (s[o + n + 1] = h.y),
        (s[o + n * 2] = h.x),
        (s[o + n * 2 + 1] = h.y),
        (s[o + n * 3] = h.x),
        (s[o + n * 3 + 1] = h.y),
        (o += n * 4)
    }
  }
  uploadRotation(t, e, i, s, n, o) {
    for (let a = 0; a < i; a++) {
      const h = t[e + a].rotation
      ;(s[o] = h), (s[o + n] = h), (s[o + n * 2] = h), (s[o + n * 3] = h), (o += n * 4)
    }
  }
  uploadUvs(t, e, i, s, n, o) {
    for (let a = 0; a < i; ++a) {
      const h = t[e + a]._texture._uvs
      h
        ? ((s[o] = h.x0),
          (s[o + 1] = h.y0),
          (s[o + n] = h.x1),
          (s[o + n + 1] = h.y1),
          (s[o + n * 2] = h.x2),
          (s[o + n * 2 + 1] = h.y2),
          (s[o + n * 3] = h.x3),
          (s[o + n * 3 + 1] = h.y3),
          (o += n * 4))
        : ((s[o] = 0),
          (s[o + 1] = 0),
          (s[o + n] = 0),
          (s[o + n + 1] = 0),
          (s[o + n * 2] = 0),
          (s[o + n * 2 + 1] = 0),
          (s[o + n * 3] = 0),
          (s[o + n * 3 + 1] = 0),
          (o += n * 4))
    }
  }
  uploadTint(t, e, i, s, n, o) {
    for (let a = 0; a < i; ++a) {
      const h = t[e + a],
        l = St.shared
          .setValue(h._tintRGB)
          .toPremultiplied(h.alpha, h.texture.baseTexture.alphaMode > 0)
      ;(s[o] = l), (s[o + n] = l), (s[o + n * 2] = l), (s[o + n * 3] = l), (o += n * 4)
    }
  }
  destroy() {
    super.destroy(),
      this.shader && (this.shader.destroy(), (this.shader = null)),
      (this.tempMatrix = null)
  }
}
Gp.extension = { name: 'particle', type: j.RendererPlugin }
q.add(Gp)
var Go = ((r) => (
  (r[(r.LINEAR_VERTICAL = 0)] = 'LINEAR_VERTICAL'),
  (r[(r.LINEAR_HORIZONTAL = 1)] = 'LINEAR_HORIZONTAL'),
  r
))(Go || {})
const Cn = { willReadFrequently: !0 },
  je = class J {
    static get experimentalLetterSpacingSupported() {
      let t = J._experimentalLetterSpacingSupported
      if (t !== void 0) {
        const e = Y.ADAPTER.getCanvasRenderingContext2D().prototype
        t = J._experimentalLetterSpacingSupported = 'letterSpacing' in e || 'textLetterSpacing' in e
      }
      return t
    }
    constructor(t, e, i, s, n, o, a, h, l) {
      ;(this.text = t),
        (this.style = e),
        (this.width = i),
        (this.height = s),
        (this.lines = n),
        (this.lineWidths = o),
        (this.lineHeight = a),
        (this.maxLineWidth = h),
        (this.fontProperties = l)
    }
    static measureText(t, e, i, s = J._canvas) {
      i = i ?? e.wordWrap
      const n = e.toFontString(),
        o = J.measureFont(n)
      o.fontSize === 0 && ((o.fontSize = e.fontSize), (o.ascent = e.fontSize))
      const a = s.getContext('2d', Cn)
      a.font = n
      const h = (i ? J.wordWrap(t, e, s) : t).split(/(?:\r\n|\r|\n)/),
        l = new Array(h.length)
      let c = 0
      for (let p = 0; p < h.length; p++) {
        const m = J._measureText(h[p], e.letterSpacing, a)
        ;(l[p] = m), (c = Math.max(c, m))
      }
      let u = c + e.strokeThickness
      e.dropShadow && (u += e.dropShadowDistance)
      const d = e.lineHeight || o.fontSize + e.strokeThickness
      let f =
        Math.max(d, o.fontSize + e.strokeThickness * 2) +
        e.leading +
        (h.length - 1) * (d + e.leading)
      return (
        e.dropShadow && (f += e.dropShadowDistance), new J(t, e, u, f, h, l, d + e.leading, c, o)
      )
    }
    static _measureText(t, e, i) {
      let s = !1
      J.experimentalLetterSpacingSupported &&
        (J.experimentalLetterSpacing
          ? ((i.letterSpacing = `${e}px`), (i.textLetterSpacing = `${e}px`), (s = !0))
          : ((i.letterSpacing = '0px'), (i.textLetterSpacing = '0px')))
      let n = i.measureText(t).width
      return n > 0 && (s ? (n -= e) : (n += (J.graphemeSegmenter(t).length - 1) * e)), n
    }
    static wordWrap(t, e, i = J._canvas) {
      const s = i.getContext('2d', Cn)
      let n = 0,
        o = '',
        a = ''
      const h = Object.create(null),
        { letterSpacing: l, whiteSpace: c } = e,
        u = J.collapseSpaces(c),
        d = J.collapseNewlines(c)
      let f = !u
      const p = e.wordWrapWidth + l,
        m = J.tokenize(t)
      for (let g = 0; g < m.length; g++) {
        let A = m[g]
        if (J.isNewline(A)) {
          if (!d) {
            ;(a += J.addLine(o)), (f = !u), (o = ''), (n = 0)
            continue
          }
          A = ' '
        }
        if (u) {
          const _ = J.isBreakingSpace(A),
            v = J.isBreakingSpace(o[o.length - 1])
          if (_ && v) continue
        }
        const x = J.getFromCache(A, l, h, s)
        if (x > p)
          if (
            (o !== '' && ((a += J.addLine(o)), (o = ''), (n = 0)), J.canBreakWords(A, e.breakWords))
          ) {
            const _ = J.wordWrapSplit(A)
            for (let v = 0; v < _.length; v++) {
              let S = _[v],
                C = S,
                I = 1
              for (; _[v + I]; ) {
                const F = _[v + I]
                if (!J.canBreakChars(C, F, A, v, e.breakWords)) S += F
                else break
                ;(C = F), I++
              }
              v += I - 1
              const T = J.getFromCache(S, l, h, s)
              T + n > p && ((a += J.addLine(o)), (f = !1), (o = ''), (n = 0)), (o += S), (n += T)
            }
          } else {
            o.length > 0 && ((a += J.addLine(o)), (o = ''), (n = 0))
            const _ = g === m.length - 1
            ;(a += J.addLine(A, !_)), (f = !1), (o = ''), (n = 0)
          }
        else
          x + n > p && ((f = !1), (a += J.addLine(o)), (o = ''), (n = 0)),
            (o.length > 0 || !J.isBreakingSpace(A) || f) && ((o += A), (n += x))
      }
      return (a += J.addLine(o, !1)), a
    }
    static addLine(t, e = !0) {
      return (
        (t = J.trimRight(t)),
        (t = e
          ? `${t}
`
          : t),
        t
      )
    }
    static getFromCache(t, e, i, s) {
      let n = i[t]
      return typeof n != 'number' && ((n = J._measureText(t, e, s) + e), (i[t] = n)), n
    }
    static collapseSpaces(t) {
      return t === 'normal' || t === 'pre-line'
    }
    static collapseNewlines(t) {
      return t === 'normal'
    }
    static trimRight(t) {
      if (typeof t != 'string') return ''
      for (let e = t.length - 1; e >= 0; e--) {
        const i = t[e]
        if (!J.isBreakingSpace(i)) break
        t = t.slice(0, -1)
      }
      return t
    }
    static isNewline(t) {
      return typeof t != 'string' ? !1 : J._newlines.includes(t.charCodeAt(0))
    }
    static isBreakingSpace(t, e) {
      return typeof t != 'string' ? !1 : J._breakingSpaces.includes(t.charCodeAt(0))
    }
    static tokenize(t) {
      const e = []
      let i = ''
      if (typeof t != 'string') return e
      for (let s = 0; s < t.length; s++) {
        const n = t[s],
          o = t[s + 1]
        if (J.isBreakingSpace(n, o) || J.isNewline(n)) {
          i !== '' && (e.push(i), (i = '')), e.push(n)
          continue
        }
        i += n
      }
      return i !== '' && e.push(i), e
    }
    static canBreakWords(t, e) {
      return e
    }
    static canBreakChars(t, e, i, s, n) {
      return !0
    }
    static wordWrapSplit(t) {
      return J.graphemeSegmenter(t)
    }
    static measureFont(t) {
      if (J._fonts[t]) return J._fonts[t]
      const e = { ascent: 0, descent: 0, fontSize: 0 },
        i = J._canvas,
        s = J._context
      s.font = t
      const n = J.METRICS_STRING + J.BASELINE_SYMBOL,
        o = Math.ceil(s.measureText(n).width)
      let a = Math.ceil(s.measureText(J.BASELINE_SYMBOL).width)
      const h = Math.ceil(J.HEIGHT_MULTIPLIER * a)
      if (((a = (a * J.BASELINE_MULTIPLIER) | 0), o === 0 || h === 0)) return (J._fonts[t] = e), e
      ;(i.width = o),
        (i.height = h),
        (s.fillStyle = '#f00'),
        s.fillRect(0, 0, o, h),
        (s.font = t),
        (s.textBaseline = 'alphabetic'),
        (s.fillStyle = '#000'),
        s.fillText(n, 0, a)
      const l = s.getImageData(0, 0, o, h).data,
        c = l.length,
        u = o * 4
      let d = 0,
        f = 0,
        p = !1
      for (d = 0; d < a; ++d) {
        for (let m = 0; m < u; m += 4)
          if (l[f + m] !== 255) {
            p = !0
            break
          }
        if (!p) f += u
        else break
      }
      for (e.ascent = a - d, f = c - u, p = !1, d = h; d > a; --d) {
        for (let m = 0; m < u; m += 4)
          if (l[f + m] !== 255) {
            p = !0
            break
          }
        if (!p) f -= u
        else break
      }
      return (e.descent = d - a), (e.fontSize = e.ascent + e.descent), (J._fonts[t] = e), e
    }
    static clearMetrics(t = '') {
      t ? delete J._fonts[t] : (J._fonts = {})
    }
    static get _canvas() {
      var t
      if (!J.__canvas) {
        let e
        try {
          const i = new OffscreenCanvas(0, 0)
          if ((t = i.getContext('2d', Cn)) != null && t.measureText) return (J.__canvas = i), i
          e = Y.ADAPTER.createCanvas()
        } catch {
          e = Y.ADAPTER.createCanvas()
        }
        ;(e.width = e.height = 10), (J.__canvas = e)
      }
      return J.__canvas
    }
    static get _context() {
      return J.__context || (J.__context = J._canvas.getContext('2d', Cn)), J.__context
    }
  }
;(je.METRICS_STRING = '|ÉqÅ'),
  (je.BASELINE_SYMBOL = 'M'),
  (je.BASELINE_MULTIPLIER = 1.4),
  (je.HEIGHT_MULTIPLIER = 2),
  (je.graphemeSegmenter = (() => {
    if (typeof (Intl == null ? void 0 : Intl.Segmenter) == 'function') {
      const r = new Intl.Segmenter()
      return (t) => [...r.segment(t)].map((e) => e.segment)
    }
    return (r) => [...r]
  })()),
  (je.experimentalLetterSpacing = !1),
  (je._fonts = {}),
  (je._newlines = [10, 13]),
  (je._breakingSpaces = [
    9, 32, 8192, 8193, 8194, 8195, 8196, 8197, 8198, 8200, 8201, 8202, 8287, 12288
  ])
let Sr = je
const h1 = ['serif', 'sans-serif', 'monospace', 'cursive', 'fantasy', 'system-ui'],
  Hp = class fs {
    constructor(t) {
      ;(this.styleID = 0), this.reset(), Fa(this, t, t)
    }
    clone() {
      const t = {}
      return Fa(t, this, fs.defaultStyle), new fs(t)
    }
    reset() {
      Fa(this, fs.defaultStyle, fs.defaultStyle)
    }
    get align() {
      return this._align
    }
    set align(t) {
      this._align !== t && ((this._align = t), this.styleID++)
    }
    get breakWords() {
      return this._breakWords
    }
    set breakWords(t) {
      this._breakWords !== t && ((this._breakWords = t), this.styleID++)
    }
    get dropShadow() {
      return this._dropShadow
    }
    set dropShadow(t) {
      this._dropShadow !== t && ((this._dropShadow = t), this.styleID++)
    }
    get dropShadowAlpha() {
      return this._dropShadowAlpha
    }
    set dropShadowAlpha(t) {
      this._dropShadowAlpha !== t && ((this._dropShadowAlpha = t), this.styleID++)
    }
    get dropShadowAngle() {
      return this._dropShadowAngle
    }
    set dropShadowAngle(t) {
      this._dropShadowAngle !== t && ((this._dropShadowAngle = t), this.styleID++)
    }
    get dropShadowBlur() {
      return this._dropShadowBlur
    }
    set dropShadowBlur(t) {
      this._dropShadowBlur !== t && ((this._dropShadowBlur = t), this.styleID++)
    }
    get dropShadowColor() {
      return this._dropShadowColor
    }
    set dropShadowColor(t) {
      const e = Ba(t)
      this._dropShadowColor !== e && ((this._dropShadowColor = e), this.styleID++)
    }
    get dropShadowDistance() {
      return this._dropShadowDistance
    }
    set dropShadowDistance(t) {
      this._dropShadowDistance !== t && ((this._dropShadowDistance = t), this.styleID++)
    }
    get fill() {
      return this._fill
    }
    set fill(t) {
      const e = Ba(t)
      this._fill !== e && ((this._fill = e), this.styleID++)
    }
    get fillGradientType() {
      return this._fillGradientType
    }
    set fillGradientType(t) {
      this._fillGradientType !== t && ((this._fillGradientType = t), this.styleID++)
    }
    get fillGradientStops() {
      return this._fillGradientStops
    }
    set fillGradientStops(t) {
      l1(this._fillGradientStops, t) || ((this._fillGradientStops = t), this.styleID++)
    }
    get fontFamily() {
      return this._fontFamily
    }
    set fontFamily(t) {
      this.fontFamily !== t && ((this._fontFamily = t), this.styleID++)
    }
    get fontSize() {
      return this._fontSize
    }
    set fontSize(t) {
      this._fontSize !== t && ((this._fontSize = t), this.styleID++)
    }
    get fontStyle() {
      return this._fontStyle
    }
    set fontStyle(t) {
      this._fontStyle !== t && ((this._fontStyle = t), this.styleID++)
    }
    get fontVariant() {
      return this._fontVariant
    }
    set fontVariant(t) {
      this._fontVariant !== t && ((this._fontVariant = t), this.styleID++)
    }
    get fontWeight() {
      return this._fontWeight
    }
    set fontWeight(t) {
      this._fontWeight !== t && ((this._fontWeight = t), this.styleID++)
    }
    get letterSpacing() {
      return this._letterSpacing
    }
    set letterSpacing(t) {
      this._letterSpacing !== t && ((this._letterSpacing = t), this.styleID++)
    }
    get lineHeight() {
      return this._lineHeight
    }
    set lineHeight(t) {
      this._lineHeight !== t && ((this._lineHeight = t), this.styleID++)
    }
    get leading() {
      return this._leading
    }
    set leading(t) {
      this._leading !== t && ((this._leading = t), this.styleID++)
    }
    get lineJoin() {
      return this._lineJoin
    }
    set lineJoin(t) {
      this._lineJoin !== t && ((this._lineJoin = t), this.styleID++)
    }
    get miterLimit() {
      return this._miterLimit
    }
    set miterLimit(t) {
      this._miterLimit !== t && ((this._miterLimit = t), this.styleID++)
    }
    get padding() {
      return this._padding
    }
    set padding(t) {
      this._padding !== t && ((this._padding = t), this.styleID++)
    }
    get stroke() {
      return this._stroke
    }
    set stroke(t) {
      const e = Ba(t)
      this._stroke !== e && ((this._stroke = e), this.styleID++)
    }
    get strokeThickness() {
      return this._strokeThickness
    }
    set strokeThickness(t) {
      this._strokeThickness !== t && ((this._strokeThickness = t), this.styleID++)
    }
    get textBaseline() {
      return this._textBaseline
    }
    set textBaseline(t) {
      this._textBaseline !== t && ((this._textBaseline = t), this.styleID++)
    }
    get trim() {
      return this._trim
    }
    set trim(t) {
      this._trim !== t && ((this._trim = t), this.styleID++)
    }
    get whiteSpace() {
      return this._whiteSpace
    }
    set whiteSpace(t) {
      this._whiteSpace !== t && ((this._whiteSpace = t), this.styleID++)
    }
    get wordWrap() {
      return this._wordWrap
    }
    set wordWrap(t) {
      this._wordWrap !== t && ((this._wordWrap = t), this.styleID++)
    }
    get wordWrapWidth() {
      return this._wordWrapWidth
    }
    set wordWrapWidth(t) {
      this._wordWrapWidth !== t && ((this._wordWrapWidth = t), this.styleID++)
    }
    toFontString() {
      const t = typeof this.fontSize == 'number' ? `${this.fontSize}px` : this.fontSize
      let e = this.fontFamily
      Array.isArray(this.fontFamily) || (e = this.fontFamily.split(','))
      for (let i = e.length - 1; i >= 0; i--) {
        let s = e[i].trim()
        !/([\"\'])[^\'\"]+\1/.test(s) && !h1.includes(s) && (s = `"${s}"`), (e[i] = s)
      }
      return `${this.fontStyle} ${this.fontVariant} ${this.fontWeight} ${t} ${e.join(',')}`
    }
  }
Hp.defaultStyle = {
  align: 'left',
  breakWords: !1,
  dropShadow: !1,
  dropShadowAlpha: 1,
  dropShadowAngle: Math.PI / 6,
  dropShadowBlur: 0,
  dropShadowColor: 'black',
  dropShadowDistance: 5,
  fill: 'black',
  fillGradientType: Go.LINEAR_VERTICAL,
  fillGradientStops: [],
  fontFamily: 'Arial',
  fontSize: 26,
  fontStyle: 'normal',
  fontVariant: 'normal',
  fontWeight: 'normal',
  leading: 0,
  letterSpacing: 0,
  lineHeight: 0,
  lineJoin: 'miter',
  miterLimit: 10,
  padding: 0,
  stroke: 'black',
  strokeThickness: 0,
  textBaseline: 'alphabetic',
  trim: !1,
  whiteSpace: 'pre',
  wordWrap: !1,
  wordWrapWidth: 100
}
let Lr = Hp
function Ba(r) {
  const t = St.shared,
    e = (i) => {
      const s = t.setValue(i)
      return s.alpha === 1 ? s.toHex() : s.toRgbaString()
    }
  return Array.isArray(r) ? r.map(e) : e(r)
}
function l1(r, t) {
  if (!Array.isArray(r) || !Array.isArray(t) || r.length !== t.length) return !1
  for (let e = 0; e < r.length; ++e) if (r[e] !== t[e]) return !1
  return !0
}
function Fa(r, t, e) {
  for (const i in e) Array.isArray(t[i]) ? (r[i] = t[i].slice()) : (r[i] = t[i])
}
const c1 = { texture: !0, children: !1, baseTexture: !0 },
  Vp = class Gh extends or {
    constructor(t, e, i) {
      let s = !1
      i || ((i = Y.ADAPTER.createCanvas()), (s = !0)), (i.width = 3), (i.height = 3)
      const n = X.from(i)
      ;(n.orig = new nt()),
        (n.trim = new nt()),
        super(n),
        (this._ownCanvas = s),
        (this.canvas = i),
        (this.context = i.getContext('2d', { willReadFrequently: !0 })),
        (this._resolution = Gh.defaultResolution ?? Y.RESOLUTION),
        (this._autoResolution = Gh.defaultAutoResolution),
        (this._text = null),
        (this._style = null),
        (this._styleListener = null),
        (this._font = ''),
        (this.text = t),
        (this.style = e),
        (this.localStyleID = -1)
    }
    static get experimentalLetterSpacing() {
      return Sr.experimentalLetterSpacing
    }
    static set experimentalLetterSpacing(t) {
      ut(
        '7.1.0',
        'Text.experimentalLetterSpacing is deprecated, use TextMetrics.experimentalLetterSpacing'
      ),
        (Sr.experimentalLetterSpacing = t)
    }
    updateText(t) {
      const e = this._style
      if (
        (this.localStyleID !== e.styleID && ((this.dirty = !0), (this.localStyleID = e.styleID)),
        !this.dirty && t)
      )
        return
      this._font = this._style.toFontString()
      const i = this.context,
        s = Sr.measureText(this._text || ' ', this._style, this._style.wordWrap, this.canvas),
        n = s.width,
        o = s.height,
        a = s.lines,
        h = s.lineHeight,
        l = s.lineWidths,
        c = s.maxLineWidth,
        u = s.fontProperties
      ;(this.canvas.width = Math.ceil(
        Math.ceil(Math.max(1, n) + e.padding * 2) * this._resolution
      )),
        (this.canvas.height = Math.ceil(
          Math.ceil(Math.max(1, o) + e.padding * 2) * this._resolution
        )),
        i.scale(this._resolution, this._resolution),
        i.clearRect(0, 0, this.canvas.width, this.canvas.height),
        (i.font = this._font),
        (i.lineWidth = e.strokeThickness),
        (i.textBaseline = e.textBaseline),
        (i.lineJoin = e.lineJoin),
        (i.miterLimit = e.miterLimit)
      let d, f
      const p = e.dropShadow ? 2 : 1
      for (let m = 0; m < p; ++m) {
        const g = e.dropShadow && m === 0,
          A = g ? Math.ceil(Math.max(1, o) + e.padding * 2) : 0,
          x = A * this._resolution
        if (g) {
          ;(i.fillStyle = 'black'), (i.strokeStyle = 'black')
          const v = e.dropShadowColor,
            S = e.dropShadowBlur * this._resolution,
            C = e.dropShadowDistance * this._resolution
          ;(i.shadowColor = St.shared.setValue(v).setAlpha(e.dropShadowAlpha).toRgbaString()),
            (i.shadowBlur = S),
            (i.shadowOffsetX = Math.cos(e.dropShadowAngle) * C),
            (i.shadowOffsetY = Math.sin(e.dropShadowAngle) * C + x)
        } else
          (i.fillStyle = this._generateFillStyle(e, a, s)),
            (i.strokeStyle = e.stroke),
            (i.shadowColor = 'black'),
            (i.shadowBlur = 0),
            (i.shadowOffsetX = 0),
            (i.shadowOffsetY = 0)
        let _ = (h - u.fontSize) / 2
        h - u.fontSize < 0 && (_ = 0)
        for (let v = 0; v < a.length; v++)
          (d = e.strokeThickness / 2),
            (f = e.strokeThickness / 2 + v * h + u.ascent + _),
            e.align === 'right' ? (d += c - l[v]) : e.align === 'center' && (d += (c - l[v]) / 2),
            e.stroke &&
              e.strokeThickness &&
              this.drawLetterSpacing(a[v], d + e.padding, f + e.padding - A, !0),
            e.fill && this.drawLetterSpacing(a[v], d + e.padding, f + e.padding - A)
      }
      this.updateTexture()
    }
    drawLetterSpacing(t, e, i, s = !1) {
      const n = this._style.letterSpacing
      let o = !1
      if (
        (Sr.experimentalLetterSpacingSupported &&
          (Sr.experimentalLetterSpacing
            ? ((this.context.letterSpacing = `${n}px`),
              (this.context.textLetterSpacing = `${n}px`),
              (o = !0))
            : ((this.context.letterSpacing = '0px'), (this.context.textLetterSpacing = '0px'))),
        n === 0 || o)
      ) {
        s ? this.context.strokeText(t, e, i) : this.context.fillText(t, e, i)
        return
      }
      let a = e
      const h = Sr.graphemeSegmenter(t)
      let l = this.context.measureText(t).width,
        c = 0
      for (let u = 0; u < h.length; ++u) {
        const d = h[u]
        s ? this.context.strokeText(d, a, i) : this.context.fillText(d, a, i)
        let f = ''
        for (let p = u + 1; p < h.length; ++p) f += h[p]
        ;(c = this.context.measureText(f).width), (a += l - c + n), (l = c)
      }
    }
    updateTexture() {
      const t = this.canvas
      if (this._style.trim) {
        const o = M0(t)
        o.data &&
          ((t.width = o.width), (t.height = o.height), this.context.putImageData(o.data, 0, 0))
      }
      const e = this._texture,
        i = this._style,
        s = i.trim ? 0 : i.padding,
        n = e.baseTexture
      ;(e.trim.width = e._frame.width = t.width / this._resolution),
        (e.trim.height = e._frame.height = t.height / this._resolution),
        (e.trim.x = -s),
        (e.trim.y = -s),
        (e.orig.width = e._frame.width - s * 2),
        (e.orig.height = e._frame.height - s * 2),
        this._onTextureUpdate(),
        n.setRealSize(t.width, t.height, this._resolution),
        e.updateUvs(),
        (this.dirty = !1)
    }
    _render(t) {
      this._autoResolution &&
        this._resolution !== t.resolution &&
        ((this._resolution = t.resolution), (this.dirty = !0)),
        this.updateText(!0),
        super._render(t)
    }
    updateTransform() {
      this.updateText(!0), super.updateTransform()
    }
    getBounds(t, e) {
      return this.updateText(!0), this._textureID === -1 && (t = !1), super.getBounds(t, e)
    }
    getLocalBounds(t) {
      return this.updateText(!0), super.getLocalBounds.call(this, t)
    }
    _calculateBounds() {
      this.calculateVertices(), this._bounds.addQuad(this.vertexData)
    }
    _generateFillStyle(t, e, i) {
      const s = t.fill
      if (Array.isArray(s)) {
        if (s.length === 1) return s[0]
      } else return s
      let n
      const o = t.dropShadow ? t.dropShadowDistance : 0,
        a = t.padding || 0,
        h = this.canvas.width / this._resolution - o - a * 2,
        l = this.canvas.height / this._resolution - o - a * 2,
        c = s.slice(),
        u = t.fillGradientStops.slice()
      if (!u.length) {
        const d = c.length + 1
        for (let f = 1; f < d; ++f) u.push(f / d)
      }
      if (
        (c.unshift(s[0]),
        u.unshift(0),
        c.push(s[s.length - 1]),
        u.push(1),
        t.fillGradientType === Go.LINEAR_VERTICAL)
      ) {
        n = this.context.createLinearGradient(h / 2, a, h / 2, l + a)
        const d = i.fontProperties.fontSize + t.strokeThickness
        for (let f = 0; f < e.length; f++) {
          const p = i.lineHeight * (f - 1) + d,
            m = i.lineHeight * f
          let g = m
          f > 0 && p > m && (g = (m + p) / 2)
          const A = m + d,
            x = i.lineHeight * (f + 1)
          let _ = A
          f + 1 < e.length && x < A && (_ = (A + x) / 2)
          const v = (_ - g) / l
          for (let S = 0; S < c.length; S++) {
            let C = 0
            typeof u[S] == 'number' ? (C = u[S]) : (C = S / c.length)
            let I = Math.min(1, Math.max(0, g / l + C * v))
            ;(I = Number(I.toFixed(5))), n.addColorStop(I, c[S])
          }
        }
      } else {
        n = this.context.createLinearGradient(a, l / 2, h + a, l / 2)
        const d = c.length + 1
        let f = 1
        for (let p = 0; p < c.length; p++) {
          let m
          typeof u[p] == 'number' ? (m = u[p]) : (m = f / d), n.addColorStop(m, c[p]), f++
        }
      }
      return n
    }
    destroy(t) {
      typeof t == 'boolean' && (t = { children: t }),
        (t = Object.assign({}, c1, t)),
        super.destroy(t),
        this._ownCanvas && (this.canvas.height = this.canvas.width = 0),
        (this.context = null),
        (this.canvas = null),
        (this._style = null)
    }
    get width() {
      return this.updateText(!0), Math.abs(this.scale.x) * this._texture.orig.width
    }
    set width(t) {
      this.updateText(!0)
      const e = Rr(this.scale.x) || 1
      ;(this.scale.x = (e * t) / this._texture.orig.width), (this._width = t)
    }
    get height() {
      return this.updateText(!0), Math.abs(this.scale.y) * this._texture.orig.height
    }
    set height(t) {
      this.updateText(!0)
      const e = Rr(this.scale.y) || 1
      ;(this.scale.y = (e * t) / this._texture.orig.height), (this._height = t)
    }
    get style() {
      return this._style
    }
    set style(t) {
      ;(t = t || {}),
        t instanceof Lr ? (this._style = t) : (this._style = new Lr(t)),
        (this.localStyleID = -1),
        (this.dirty = !0)
    }
    get text() {
      return this._text
    }
    set text(t) {
      ;(t = String(t ?? '')), this._text !== t && ((this._text = t), (this.dirty = !0))
    }
    get resolution() {
      return this._resolution
    }
    set resolution(t) {
      ;(this._autoResolution = !1),
        this._resolution !== t && ((this._resolution = t), (this.dirty = !0))
    }
  }
Vp.defaultAutoResolution = !0
let Xi = Vp
class u1 {
  constructor(t) {
    ;(this.maxItemsPerFrame = t), (this.itemsLeft = 0)
  }
  beginFrame() {
    this.itemsLeft = this.maxItemsPerFrame
  }
  allowedToUpload() {
    return this.itemsLeft-- > 0
  }
}
function d1(r, t) {
  var i
  let e = !1
  if ((i = r == null ? void 0 : r._textures) != null && i.length) {
    for (let s = 0; s < r._textures.length; s++)
      if (r._textures[s] instanceof X) {
        const n = r._textures[s].baseTexture
        t.includes(n) || (t.push(n), (e = !0))
      }
  }
  return e
}
function f1(r, t) {
  if (r.baseTexture instanceof ht) {
    const e = r.baseTexture
    return t.includes(e) || t.push(e), !0
  }
  return !1
}
function p1(r, t) {
  if (r._texture && r._texture instanceof X) {
    const e = r._texture.baseTexture
    return t.includes(e) || t.push(e), !0
  }
  return !1
}
function m1(r, t) {
  return t instanceof Xi ? (t.updateText(!0), !0) : !1
}
function g1(r, t) {
  if (t instanceof Lr) {
    const e = t.toFontString()
    return Sr.measureFont(e), !0
  }
  return !1
}
function _1(r, t) {
  if (r instanceof Xi) {
    t.includes(r.style) || t.push(r.style), t.includes(r) || t.push(r)
    const e = r._texture.baseTexture
    return t.includes(e) || t.push(e), !0
  }
  return !1
}
function y1(r, t) {
  return r instanceof Lr ? (t.includes(r) || t.push(r), !0) : !1
}
const Xp = class jp {
  constructor(t) {
    ;(this.limiter = new u1(jp.uploadsPerFrame)),
      (this.renderer = t),
      (this.uploadHookHelper = null),
      (this.queue = []),
      (this.addHooks = []),
      (this.uploadHooks = []),
      (this.completes = []),
      (this.ticking = !1),
      (this.delayedTick = () => {
        this.queue && this.prepareItems()
      }),
      this.registerFindHook(_1),
      this.registerFindHook(y1),
      this.registerFindHook(d1),
      this.registerFindHook(f1),
      this.registerFindHook(p1),
      this.registerUploadHook(m1),
      this.registerUploadHook(g1)
  }
  upload(t) {
    return new Promise((e) => {
      t && this.add(t),
        this.queue.length
          ? (this.completes.push(e),
            this.ticking || ((this.ticking = !0), Tt.system.addOnce(this.tick, this, Or.UTILITY)))
          : e()
    })
  }
  tick() {
    setTimeout(this.delayedTick, 0)
  }
  prepareItems() {
    for (this.limiter.beginFrame(); this.queue.length && this.limiter.allowedToUpload(); ) {
      const t = this.queue[0]
      let e = !1
      if (t && !t._destroyed) {
        for (let i = 0, s = this.uploadHooks.length; i < s; i++)
          if (this.uploadHooks[i](this.uploadHookHelper, t)) {
            this.queue.shift(), (e = !0)
            break
          }
      }
      e || this.queue.shift()
    }
    if (this.queue.length) Tt.system.addOnce(this.tick, this, Or.UTILITY)
    else {
      this.ticking = !1
      const t = this.completes.slice(0)
      this.completes.length = 0
      for (let e = 0, i = t.length; e < i; e++) t[e]()
    }
  }
  registerFindHook(t) {
    return t && this.addHooks.push(t), this
  }
  registerUploadHook(t) {
    return t && this.uploadHooks.push(t), this
  }
  add(t) {
    for (let e = 0, i = this.addHooks.length; e < i && !this.addHooks[e](t, this.queue); e++);
    if (t instanceof he) for (let e = t.children.length - 1; e >= 0; e--) this.add(t.children[e])
    return this
  }
  destroy() {
    this.ticking && Tt.system.remove(this.tick, this),
      (this.ticking = !1),
      (this.addHooks = null),
      (this.uploadHooks = null),
      (this.renderer = null),
      (this.completes = null),
      (this.queue = null),
      (this.limiter = null),
      (this.uploadHookHelper = null)
  }
}
Xp.uploadsPerFrame = 4
let Hh = Xp
Object.defineProperties(Y, {
  UPLOADS_PER_FRAME: {
    get() {
      return Hh.uploadsPerFrame
    },
    set(r) {
      ut(
        '7.1.0',
        'settings.UPLOADS_PER_FRAME is deprecated, use prepare.BasePrepare.uploadsPerFrame'
      ),
        (Hh.uploadsPerFrame = r)
    }
  }
})
function Wp(r, t) {
  return t instanceof ht ? (t._glTextures[r.CONTEXT_UID] || r.texture.bind(t), !0) : !1
}
function A1(r, t) {
  if (!(t instanceof Uo)) return !1
  const { geometry: e } = t
  t.finishPoly(), e.updateBatches()
  const { batches: i } = e
  for (let s = 0; s < i.length; s++) {
    const { texture: n } = i[s].style
    n && Wp(r, n.baseTexture)
  }
  return e.batchable || r.geometry.bind(e, t._resolveDirectShader(r)), !0
}
function v1(r, t) {
  return r instanceof Uo ? (t.push(r), !0) : !1
}
class $p extends Hh {
  constructor(t) {
    super(t),
      (this.uploadHookHelper = this.renderer),
      this.registerFindHook(v1),
      this.registerUploadHook(Wp),
      this.registerUploadHook(A1)
  }
}
$p.extension = { name: 'prepare', type: j.RendererSystem }
q.add($p)
class Us extends or {
  constructor(t, e = !0) {
    super(t[0] instanceof X ? t[0] : t[0].texture),
      (this._textures = null),
      (this._durations = null),
      (this._autoUpdate = e),
      (this._isConnectedToTicker = !1),
      (this.animationSpeed = 1),
      (this.loop = !0),
      (this.updateAnchor = !1),
      (this.onComplete = null),
      (this.onFrameChange = null),
      (this.onLoop = null),
      (this._currentTime = 0),
      (this._playing = !1),
      (this._previousFrame = null),
      (this.textures = t)
  }
  stop() {
    this._playing &&
      ((this._playing = !1),
      this._autoUpdate &&
        this._isConnectedToTicker &&
        (Tt.shared.remove(this.update, this), (this._isConnectedToTicker = !1)))
  }
  play() {
    this._playing ||
      ((this._playing = !0),
      this._autoUpdate &&
        !this._isConnectedToTicker &&
        (Tt.shared.add(this.update, this, Or.HIGH), (this._isConnectedToTicker = !0)))
  }
  gotoAndStop(t) {
    this.stop(), (this.currentFrame = t)
  }
  gotoAndPlay(t) {
    ;(this.currentFrame = t), this.play()
  }
  update(t) {
    if (!this._playing) return
    const e = this.animationSpeed * t,
      i = this.currentFrame
    if (this._durations !== null) {
      let s = (this._currentTime % 1) * this._durations[this.currentFrame]
      for (s += (e / 60) * 1e3; s < 0; )
        this._currentTime--, (s += this._durations[this.currentFrame])
      const n = Math.sign(this.animationSpeed * t)
      for (
        this._currentTime = Math.floor(this._currentTime);
        s >= this._durations[this.currentFrame];

      )
        (s -= this._durations[this.currentFrame] * n), (this._currentTime += n)
      this._currentTime += s / this._durations[this.currentFrame]
    } else this._currentTime += e
    this._currentTime < 0 && !this.loop
      ? (this.gotoAndStop(0), this.onComplete && this.onComplete())
      : this._currentTime >= this._textures.length && !this.loop
        ? (this.gotoAndStop(this._textures.length - 1), this.onComplete && this.onComplete())
        : i !== this.currentFrame &&
          (this.loop &&
            this.onLoop &&
            ((this.animationSpeed > 0 && this.currentFrame < i) ||
              (this.animationSpeed < 0 && this.currentFrame > i)) &&
            this.onLoop(),
          this.updateTexture())
  }
  updateTexture() {
    const t = this.currentFrame
    this._previousFrame !== t &&
      ((this._previousFrame = t),
      (this._texture = this._textures[t]),
      (this._textureID = -1),
      (this._textureTrimmedID = -1),
      (this._cachedTint = 16777215),
      (this.uvs = this._texture._uvs.uvsFloat32),
      this.updateAnchor && this._anchor.copyFrom(this._texture.defaultAnchor),
      this.onFrameChange && this.onFrameChange(this.currentFrame))
  }
  destroy(t) {
    this.stop(),
      super.destroy(t),
      (this.onComplete = null),
      (this.onFrameChange = null),
      (this.onLoop = null)
  }
  static fromFrames(t) {
    const e = []
    for (let i = 0; i < t.length; ++i) e.push(X.from(t[i]))
    return new Us(e)
  }
  static fromImages(t) {
    const e = []
    for (let i = 0; i < t.length; ++i) e.push(X.from(t[i]))
    return new Us(e)
  }
  get totalFrames() {
    return this._textures.length
  }
  get textures() {
    return this._textures
  }
  set textures(t) {
    if (t[0] instanceof X) (this._textures = t), (this._durations = null)
    else {
      ;(this._textures = []), (this._durations = [])
      for (let e = 0; e < t.length; e++)
        this._textures.push(t[e].texture), this._durations.push(t[e].time)
    }
    ;(this._previousFrame = null), this.gotoAndStop(0), this.updateTexture()
  }
  get currentFrame() {
    let t = Math.floor(this._currentTime) % this._textures.length
    return t < 0 && (t += this._textures.length), t
  }
  set currentFrame(t) {
    if (t < 0 || t > this.totalFrames - 1)
      throw new Error(
        `[AnimatedSprite]: Invalid frame index value ${t}, expected to be between 0 and totalFrames ${this.totalFrames}.`
      )
    const e = this.currentFrame
    ;(this._currentTime = t), e !== this.currentFrame && this.updateTexture()
  }
  get playing() {
    return this._playing
  }
  get autoUpdate() {
    return this._autoUpdate
  }
  set autoUpdate(t) {
    t !== this._autoUpdate &&
      ((this._autoUpdate = t),
      !this._autoUpdate && this._isConnectedToTicker
        ? (Tt.shared.remove(this.update, this), (this._isConnectedToTicker = !1))
        : this._autoUpdate &&
          !this._isConnectedToTicker &&
          this._playing &&
          (Tt.shared.add(this.update, this), (this._isConnectedToTicker = !0)))
  }
}
const ns = new pt()
class Ho extends or {
  constructor(t, e = 100, i = 100) {
    super(t),
      (this.tileTransform = new Do()),
      (this._width = e),
      (this._height = i),
      (this.uvMatrix = this.texture.uvMatrix || new Pl(t)),
      (this.pluginName = 'tilingSprite'),
      (this.uvRespectAnchor = !1)
  }
  get clampMargin() {
    return this.uvMatrix.clampMargin
  }
  set clampMargin(t) {
    ;(this.uvMatrix.clampMargin = t), this.uvMatrix.update(!0)
  }
  get tileScale() {
    return this.tileTransform.scale
  }
  set tileScale(t) {
    this.tileTransform.scale.copyFrom(t)
  }
  get tilePosition() {
    return this.tileTransform.position
  }
  set tilePosition(t) {
    this.tileTransform.position.copyFrom(t)
  }
  _onTextureUpdate() {
    this.uvMatrix && (this.uvMatrix.texture = this._texture), (this._cachedTint = 16777215)
  }
  _render(t) {
    const e = this._texture
    !e ||
      !e.valid ||
      (this.tileTransform.updateLocalTransform(),
      this.uvMatrix.update(),
      t.batch.setObjectRenderer(t.plugins[this.pluginName]),
      t.plugins[this.pluginName].render(this))
  }
  _calculateBounds() {
    const t = this._width * -this._anchor._x,
      e = this._height * -this._anchor._y,
      i = this._width * (1 - this._anchor._x),
      s = this._height * (1 - this._anchor._y)
    this._bounds.addFrame(this.transform, t, e, i, s)
  }
  getLocalBounds(t) {
    return this.children.length === 0
      ? ((this._bounds.minX = this._width * -this._anchor._x),
        (this._bounds.minY = this._height * -this._anchor._y),
        (this._bounds.maxX = this._width * (1 - this._anchor._x)),
        (this._bounds.maxY = this._height * (1 - this._anchor._y)),
        t ||
          (this._localBoundsRect || (this._localBoundsRect = new nt()),
          (t = this._localBoundsRect)),
        this._bounds.getRectangle(t))
      : super.getLocalBounds.call(this, t)
  }
  containsPoint(t) {
    this.worldTransform.applyInverse(t, ns)
    const e = this._width,
      i = this._height,
      s = -e * this.anchor._x
    if (ns.x >= s && ns.x < s + e) {
      const n = -i * this.anchor._y
      if (ns.y >= n && ns.y < n + i) return !0
    }
    return !1
  }
  destroy(t) {
    super.destroy(t), (this.tileTransform = null), (this.uvMatrix = null)
  }
  static from(t, e) {
    const i = t instanceof X ? t : X.from(t, e)
    return new Ho(i, e.width, e.height)
  }
  get width() {
    return this._width
  }
  set width(t) {
    this._width = t
  }
  get height() {
    return this._height
  }
  set height(t) {
    this._height = t
  }
}
var x1 = `#version 300 es
#define SHADER_NAME Tiling-Sprite-100

precision lowp float;

in vec2 vTextureCoord;

out vec4 fragmentColor;

uniform sampler2D uSampler;
uniform vec4 uColor;
uniform mat3 uMapCoord;
uniform vec4 uClampFrame;
uniform vec2 uClampOffset;

void main(void)
{
    vec2 coord = vTextureCoord + ceil(uClampOffset - vTextureCoord);
    coord = (uMapCoord * vec3(coord, 1.0)).xy;
    vec2 unclamped = coord;
    coord = clamp(coord, uClampFrame.xy, uClampFrame.zw);

    vec4 texSample = texture(uSampler, coord, unclamped == coord ? 0.0f : -32.0f);// lod-bias very negative to force lod 0

    fragmentColor = texSample * uColor;
}
`,
  b1 = `#version 300 es
#define SHADER_NAME Tiling-Sprite-300

precision lowp float;

in vec2 aVertexPosition;
in vec2 aTextureCoord;

uniform mat3 projectionMatrix;
uniform mat3 translationMatrix;
uniform mat3 uTransform;

out vec2 vTextureCoord;

void main(void)
{
    gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);

    vTextureCoord = (uTransform * vec3(aTextureCoord, 1.0)).xy;
}
`,
  E1 = `#version 100
#ifdef GL_EXT_shader_texture_lod
    #extension GL_EXT_shader_texture_lod : enable
#endif
#define SHADER_NAME Tiling-Sprite-100

precision lowp float;

varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform vec4 uColor;
uniform mat3 uMapCoord;
uniform vec4 uClampFrame;
uniform vec2 uClampOffset;

void main(void)
{
    vec2 coord = vTextureCoord + ceil(uClampOffset - vTextureCoord);
    coord = (uMapCoord * vec3(coord, 1.0)).xy;
    vec2 unclamped = coord;
    coord = clamp(coord, uClampFrame.xy, uClampFrame.zw);

    #ifdef GL_EXT_shader_texture_lod
        vec4 texSample = unclamped == coord
            ? texture2D(uSampler, coord) 
            : texture2DLodEXT(uSampler, coord, 0);
    #else
        vec4 texSample = texture2D(uSampler, coord);
    #endif

    gl_FragColor = texSample * uColor;
}
`,
  ju = `#version 100
#define SHADER_NAME Tiling-Sprite-100

precision lowp float;

attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat3 projectionMatrix;
uniform mat3 translationMatrix;
uniform mat3 uTransform;

varying vec2 vTextureCoord;

void main(void)
{
    gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);

    vTextureCoord = (uTransform * vec3(aTextureCoord, 1.0)).xy;
}
`,
  T1 = `#version 100
#define SHADER_NAME Tiling-Sprite-Simple-100

precision lowp float;

varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform vec4 uColor;

void main(void)
{
    vec4 texSample = texture2D(uSampler, vTextureCoord);
    gl_FragColor = texSample * uColor;
}
`
const In = new Ct()
class zp extends Oo {
  constructor(t) {
    super(t), t.runners.contextChange.add(this), (this.quad = new zf()), (this.state = nr.for2d())
  }
  contextChange() {
    const t = this.renderer,
      e = { globals: t.globalUniforms }
    ;(this.simpleShader = Je.from(ju, T1, e)),
      (this.shader = t.context.webGLVersion > 1 ? Je.from(b1, x1, e) : Je.from(ju, E1, e))
  }
  render(t) {
    const e = this.renderer,
      i = this.quad
    let s = i.vertices
    ;(s[0] = s[6] = t._width * -t.anchor.x),
      (s[1] = s[3] = t._height * -t.anchor.y),
      (s[2] = s[4] = t._width * (1 - t.anchor.x)),
      (s[5] = s[7] = t._height * (1 - t.anchor.y))
    const n = t.uvRespectAnchor ? t.anchor.x : 0,
      o = t.uvRespectAnchor ? t.anchor.y : 0
    ;(s = i.uvs),
      (s[0] = s[6] = -n),
      (s[1] = s[3] = -o),
      (s[2] = s[4] = 1 - n),
      (s[5] = s[7] = 1 - o),
      i.invalidate()
    const a = t._texture,
      h = a.baseTexture,
      l = h.alphaMode > 0,
      c = t.tileTransform.localTransform,
      u = t.uvMatrix
    let d = h.isPowerOfTwo && a.frame.width === h.width && a.frame.height === h.height
    d &&
      (h._glTextures[e.CONTEXT_UID]
        ? (d = h.wrapMode !== fr.CLAMP)
        : h.wrapMode === fr.CLAMP && (h.wrapMode = fr.REPEAT))
    const f = d ? this.simpleShader : this.shader,
      p = a.width,
      m = a.height,
      g = t._width,
      A = t._height
    In.set((c.a * p) / g, (c.b * p) / A, (c.c * m) / g, (c.d * m) / A, c.tx / g, c.ty / A),
      In.invert(),
      d
        ? In.prepend(u.mapCoord)
        : ((f.uniforms.uMapCoord = u.mapCoord.toArray(!0)),
          (f.uniforms.uClampFrame = u.uClampFrame),
          (f.uniforms.uClampOffset = u.uClampOffset)),
      (f.uniforms.uTransform = In.toArray(!0)),
      (f.uniforms.uColor = St.shared
        .setValue(t.tint)
        .premultiply(t.worldAlpha, l)
        .toArray(f.uniforms.uColor)),
      (f.uniforms.translationMatrix = t.transform.worldTransform.toArray(!0)),
      (f.uniforms.uSampler = a),
      e.shader.bind(f),
      e.geometry.bind(i),
      (this.state.blendMode = Df(t.blendMode, l)),
      e.state.set(this.state),
      e.geometry.draw(this.renderer.gl.TRIANGLES, 6, 0)
  }
}
zp.extension = { name: 'tilingSprite', type: j.RendererPlugin }
q.add(zp)
const Yp = class ps {
  constructor(t, e, i) {
    ;(this.linkedSheets = []),
      (t instanceof ht || t instanceof X) && (t = { texture: t, data: e, resolutionFilename: i })
    const { texture: s, data: n, resolutionFilename: o = null, cachePrefix: a = '' } = t
    ;(this.cachePrefix = a),
      (this._texture = s instanceof X ? s : null),
      (this.baseTexture = s instanceof ht ? s : this._texture.baseTexture),
      (this.textures = {}),
      (this.animations = {}),
      (this.data = n)
    const h = this.baseTexture.resource
    ;(this.resolution = this._updateResolution(o || (h ? h.url : null))),
      (this._frames = this.data.frames),
      (this._frameKeys = Object.keys(this._frames)),
      (this._batchIndex = 0),
      (this._callback = null)
  }
  _updateResolution(t = null) {
    const { scale: e } = this.data.meta
    let i = mr(t, null)
    return (
      i === null && (i = typeof e == 'number' ? e : parseFloat(e ?? '1')),
      i !== 1 && this.baseTexture.setResolution(i),
      i
    )
  }
  parse() {
    return new Promise((t) => {
      ;(this._callback = t),
        (this._batchIndex = 0),
        this._frameKeys.length <= ps.BATCH_SIZE
          ? (this._processFrames(0), this._processAnimations(), this._parseComplete())
          : this._nextBatch()
    })
  }
  _processFrames(t) {
    let e = t
    const i = ps.BATCH_SIZE
    for (; e - t < i && e < this._frameKeys.length; ) {
      const s = this._frameKeys[e],
        n = this._frames[s],
        o = n.frame
      if (o) {
        let a = null,
          h = null
        const l = n.trimmed !== !1 && n.sourceSize ? n.sourceSize : n.frame,
          c = new nt(0, 0, Math.floor(l.w) / this.resolution, Math.floor(l.h) / this.resolution)
        n.rotated
          ? (a = new nt(
              Math.floor(o.x) / this.resolution,
              Math.floor(o.y) / this.resolution,
              Math.floor(o.h) / this.resolution,
              Math.floor(o.w) / this.resolution
            ))
          : (a = new nt(
              Math.floor(o.x) / this.resolution,
              Math.floor(o.y) / this.resolution,
              Math.floor(o.w) / this.resolution,
              Math.floor(o.h) / this.resolution
            )),
          n.trimmed !== !1 &&
            n.spriteSourceSize &&
            (h = new nt(
              Math.floor(n.spriteSourceSize.x) / this.resolution,
              Math.floor(n.spriteSourceSize.y) / this.resolution,
              Math.floor(o.w) / this.resolution,
              Math.floor(o.h) / this.resolution
            )),
          (this.textures[s] = new X(
            this.baseTexture,
            a,
            c,
            h,
            n.rotated ? 2 : 0,
            n.anchor,
            n.borders
          )),
          X.addToCache(this.textures[s], this.cachePrefix + s.toString())
      }
      e++
    }
  }
  _processAnimations() {
    const t = this.data.animations || {}
    for (const e in t) {
      this.animations[e] = []
      for (let i = 0; i < t[e].length; i++) {
        const s = t[e][i]
        this.animations[e].push(this.textures[s])
      }
    }
  }
  _parseComplete() {
    const t = this._callback
    ;(this._callback = null), (this._batchIndex = 0), t.call(this, this.textures)
  }
  _nextBatch() {
    this._processFrames(this._batchIndex * ps.BATCH_SIZE),
      this._batchIndex++,
      setTimeout(() => {
        this._batchIndex * ps.BATCH_SIZE < this._frameKeys.length
          ? this._nextBatch()
          : (this._processAnimations(), this._parseComplete())
      }, 0)
  }
  destroy(t = !1) {
    var e
    for (const i in this.textures) this.textures[i].destroy()
    ;(this._frames = null),
      (this._frameKeys = null),
      (this.data = null),
      (this.textures = null),
      t && ((e = this._texture) == null || e.destroy(), this.baseTexture.destroy()),
      (this._texture = null),
      (this.baseTexture = null),
      (this.linkedSheets = [])
  }
}
Yp.BATCH_SIZE = 1e3
let Wu = Yp
const w1 = [
  'jpg',
  'png',
  'jpeg',
  'avif',
  'webp',
  's3tc',
  's3tc_sRGB',
  'etc',
  'etc1',
  'pvrtc',
  'atc',
  'astc',
  'bptc'
]
function Qp(r, t, e) {
  const i = {}
  if (
    (r.forEach((s) => {
      i[s] = t
    }),
    Object.keys(t.textures).forEach((s) => {
      i[`${t.cachePrefix}${s}`] = t.textures[s]
    }),
    !e)
  ) {
    const s = Kt.dirname(r[0])
    t.linkedSheets.forEach((n, o) => {
      Object.assign(i, Qp([`${s}/${t.data.meta.related_multi_packs[o]}`], n, !0))
    })
  }
  return i
}
const S1 = {
  extension: j.Asset,
  cache: { test: (r) => r instanceof Wu, getCacheableAssets: (r, t) => Qp(r, t, !1) },
  resolver: {
    test: (r) => {
      const t = r.split('?')[0].split('.'),
        e = t.pop(),
        i = t.pop()
      return e === 'json' && w1.includes(i)
    },
    parse: (r) => {
      var e
      const t = r.split('.')
      return {
        resolution: parseFloat(((e = Y.RETINA_PREFIX.exec(r)) == null ? void 0 : e[1]) ?? '1'),
        format: t[t.length - 2],
        src: r
      }
    }
  },
  loader: {
    name: 'spritesheetLoader',
    extension: { type: j.LoadParser, priority: Ne.Normal },
    async testParse(r, t) {
      return Kt.extname(t.src).toLowerCase() === '.json' && !!r.frames
    },
    async parse(r, t, e) {
      var c, u
      const { texture: i, imageFilename: s, cachePrefix: n } = (t == null ? void 0 : t.data) ?? {}
      let o = Kt.dirname(t.src)
      o && o.lastIndexOf('/') !== o.length - 1 && (o += '/')
      let a
      if (i && i.baseTexture) a = i
      else {
        const d = Lh(o + (s ?? r.meta.image), t.src)
        a = (await e.load([d]))[d]
      }
      const h = new Wu({
        texture: a.baseTexture,
        data: r,
        resolutionFilename: t.src,
        cachePrefix: n
      })
      await h.parse()
      const l = (c = r == null ? void 0 : r.meta) == null ? void 0 : c.related_multi_packs
      if (Array.isArray(l)) {
        const d = []
        for (const p of l) {
          if (typeof p != 'string') continue
          let m = o + p
          ;((u = t.data) != null && u.ignoreMultiPack) ||
            ((m = Lh(m, t.src)), d.push(e.load({ src: m, data: { ignoreMultiPack: !0 } })))
        }
        const f = await Promise.all(d)
        ;(h.linkedSheets = f),
          f.forEach((p) => {
            p.linkedSheets = [h].concat(h.linkedSheets.filter((m) => m !== p))
          })
      }
      return h
    },
    unload(r) {
      r.destroy(!0)
    }
  }
}
q.add(S1)
class mo {
  constructor() {
    ;(this.info = []),
      (this.common = []),
      (this.page = []),
      (this.char = []),
      (this.kerning = []),
      (this.distanceField = [])
  }
}
class Hn {
  static test(t) {
    return typeof t == 'string' && t.startsWith('info face=')
  }
  static parse(t) {
    const e = t.match(/^[a-z]+\s+.+$/gm),
      i = {
        info: [],
        common: [],
        page: [],
        char: [],
        chars: [],
        kerning: [],
        kernings: [],
        distanceField: []
      }
    for (const n in e) {
      const o = e[n].match(/^[a-z]+/gm)[0],
        a = e[n].match(/[a-zA-Z]+=([^\s"']+|"([^"]*)")/gm),
        h = {}
      for (const l in a) {
        const c = a[l].split('='),
          u = c[0],
          d = c[1].replace(/"/gm, ''),
          f = parseFloat(d),
          p = isNaN(f) ? d : f
        h[u] = p
      }
      i[o].push(h)
    }
    const s = new mo()
    return (
      i.info.forEach((n) => s.info.push({ face: n.face, size: parseInt(n.size, 10) })),
      i.common.forEach((n) => s.common.push({ lineHeight: parseInt(n.lineHeight, 10) })),
      i.page.forEach((n) => s.page.push({ id: parseInt(n.id, 10), file: n.file })),
      i.char.forEach((n) =>
        s.char.push({
          id: parseInt(n.id, 10),
          page: parseInt(n.page, 10),
          x: parseInt(n.x, 10),
          y: parseInt(n.y, 10),
          width: parseInt(n.width, 10),
          height: parseInt(n.height, 10),
          xoffset: parseInt(n.xoffset, 10),
          yoffset: parseInt(n.yoffset, 10),
          xadvance: parseInt(n.xadvance, 10)
        })
      ),
      i.kerning.forEach((n) =>
        s.kerning.push({
          first: parseInt(n.first, 10),
          second: parseInt(n.second, 10),
          amount: parseInt(n.amount, 10)
        })
      ),
      i.distanceField.forEach((n) =>
        s.distanceField.push({
          distanceRange: parseInt(n.distanceRange, 10),
          fieldType: n.fieldType
        })
      ),
      s
    )
  }
}
class Vh {
  static test(t) {
    const e = t
    return (
      typeof t != 'string' &&
      'getElementsByTagName' in t &&
      e.getElementsByTagName('page').length &&
      e.getElementsByTagName('info')[0].getAttribute('face') !== null
    )
  }
  static parse(t) {
    const e = new mo(),
      i = t.getElementsByTagName('info'),
      s = t.getElementsByTagName('common'),
      n = t.getElementsByTagName('page'),
      o = t.getElementsByTagName('char'),
      a = t.getElementsByTagName('kerning'),
      h = t.getElementsByTagName('distanceField')
    for (let l = 0; l < i.length; l++)
      e.info.push({
        face: i[l].getAttribute('face'),
        size: parseInt(i[l].getAttribute('size'), 10)
      })
    for (let l = 0; l < s.length; l++)
      e.common.push({ lineHeight: parseInt(s[l].getAttribute('lineHeight'), 10) })
    for (let l = 0; l < n.length; l++)
      e.page.push({
        id: parseInt(n[l].getAttribute('id'), 10) || 0,
        file: n[l].getAttribute('file')
      })
    for (let l = 0; l < o.length; l++) {
      const c = o[l]
      e.char.push({
        id: parseInt(c.getAttribute('id'), 10),
        page: parseInt(c.getAttribute('page'), 10) || 0,
        x: parseInt(c.getAttribute('x'), 10),
        y: parseInt(c.getAttribute('y'), 10),
        width: parseInt(c.getAttribute('width'), 10),
        height: parseInt(c.getAttribute('height'), 10),
        xoffset: parseInt(c.getAttribute('xoffset'), 10),
        yoffset: parseInt(c.getAttribute('yoffset'), 10),
        xadvance: parseInt(c.getAttribute('xadvance'), 10)
      })
    }
    for (let l = 0; l < a.length; l++)
      e.kerning.push({
        first: parseInt(a[l].getAttribute('first'), 10),
        second: parseInt(a[l].getAttribute('second'), 10),
        amount: parseInt(a[l].getAttribute('amount'), 10)
      })
    for (let l = 0; l < h.length; l++)
      e.distanceField.push({
        fieldType: h[l].getAttribute('fieldType'),
        distanceRange: parseInt(h[l].getAttribute('distanceRange'), 10)
      })
    return e
  }
}
class Xh {
  static test(t) {
    return typeof t == 'string' && t.includes('<font>') ? Vh.test(Y.ADAPTER.parseXML(t)) : !1
  }
  static parse(t) {
    return Vh.parse(Y.ADAPTER.parseXML(t))
  }
}
const Da = [Hn, Vh, Xh]
function C1(r) {
  for (let t = 0; t < Da.length; t++) if (Da[t].test(r)) return Da[t]
  return null
}
function I1(r, t, e, i, s, n) {
  const o = e.fill
  if (Array.isArray(o)) {
    if (o.length === 1) return o[0]
  } else return o
  let a
  const h = e.dropShadow ? e.dropShadowDistance : 0,
    l = e.padding || 0,
    c = r.width / i - h - l * 2,
    u = r.height / i - h - l * 2,
    d = o.slice(),
    f = e.fillGradientStops.slice()
  if (!f.length) {
    const p = d.length + 1
    for (let m = 1; m < p; ++m) f.push(m / p)
  }
  if (
    (d.unshift(o[0]),
    f.unshift(0),
    d.push(o[o.length - 1]),
    f.push(1),
    e.fillGradientType === Go.LINEAR_VERTICAL)
  ) {
    a = t.createLinearGradient(c / 2, l, c / 2, u + l)
    let p = 0
    const m = (n.fontProperties.fontSize + e.strokeThickness) / u
    for (let g = 0; g < s.length; g++) {
      const A = n.lineHeight * g
      for (let x = 0; x < d.length; x++) {
        let _ = 0
        typeof f[x] == 'number' ? (_ = f[x]) : (_ = x / d.length)
        const v = A / u + _ * m
        let S = Math.max(p, v)
        ;(S = Math.min(S, 1)), a.addColorStop(S, d[x]), (p = S)
      }
    }
  } else {
    a = t.createLinearGradient(l, u / 2, c + l, u / 2)
    const p = d.length + 1
    let m = 1
    for (let g = 0; g < d.length; g++) {
      let A
      typeof f[g] == 'number' ? (A = f[g]) : (A = m / p), a.addColorStop(A, d[g]), m++
    }
  }
  return a
}
function R1(r, t, e, i, s, n, o) {
  const a = e.text,
    h = e.fontProperties
  t.translate(i, s), t.scale(n, n)
  const l = o.strokeThickness / 2,
    c = -(o.strokeThickness / 2)
  if (
    ((t.font = o.toFontString()),
    (t.lineWidth = o.strokeThickness),
    (t.textBaseline = o.textBaseline),
    (t.lineJoin = o.lineJoin),
    (t.miterLimit = o.miterLimit),
    (t.fillStyle = I1(r, t, o, n, [a], e)),
    (t.strokeStyle = o.stroke),
    o.dropShadow)
  ) {
    const u = o.dropShadowColor,
      d = o.dropShadowBlur * n,
      f = o.dropShadowDistance * n
    ;(t.shadowColor = St.shared.setValue(u).setAlpha(o.dropShadowAlpha).toRgbaString()),
      (t.shadowBlur = d),
      (t.shadowOffsetX = Math.cos(o.dropShadowAngle) * f),
      (t.shadowOffsetY = Math.sin(o.dropShadowAngle) * f)
  } else (t.shadowColor = 'black'), (t.shadowBlur = 0), (t.shadowOffsetX = 0), (t.shadowOffsetY = 0)
  o.stroke && o.strokeThickness && t.strokeText(a, l, c + e.lineHeight - h.descent),
    o.fill && t.fillText(a, l, c + e.lineHeight - h.descent),
    t.setTransform(1, 0, 0, 1, 0, 0),
    (t.fillStyle = 'rgba(0, 0, 0, 0)')
}
function Vn(r) {
  return r.codePointAt ? r.codePointAt(0) : r.charCodeAt(0)
}
function Kp(r) {
  return Array.from ? Array.from(r) : r.split('')
}
function P1(r) {
  typeof r == 'string' && (r = [r])
  const t = []
  for (let e = 0, i = r.length; e < i; e++) {
    const s = r[e]
    if (Array.isArray(s)) {
      if (s.length !== 2)
        throw new Error(
          `[BitmapFont]: Invalid character range length, expecting 2 got ${s.length}.`
        )
      const n = s[0].charCodeAt(0),
        o = s[1].charCodeAt(0)
      if (o < n) throw new Error('[BitmapFont]: Invalid character range.')
      for (let a = n, h = o; a <= h; a++) t.push(String.fromCharCode(a))
    } else t.push(...Kp(s))
  }
  if (t.length === 0) throw new Error('[BitmapFont]: Empty set when resolving characters.')
  return t
}
const vr = class We {
  constructor(t, e, i) {
    var c
    const [s] = t.info,
      [n] = t.common,
      [o] = t.page,
      [a] = t.distanceField,
      h = mr(o.file),
      l = {}
    ;(this._ownsTextures = i),
      (this.font = s.face),
      (this.size = s.size),
      (this.lineHeight = n.lineHeight / h),
      (this.chars = {}),
      (this.pageTextures = l)
    for (let u = 0; u < t.page.length; u++) {
      const { id: d, file: f } = t.page[u]
      ;(l[d] = e instanceof Array ? e[u] : e[f]),
        a != null &&
          a.fieldType &&
          a.fieldType !== 'none' &&
          ((l[d].baseTexture.alphaMode = de.NO_PREMULTIPLIED_ALPHA),
          (l[d].baseTexture.mipmap = sr.OFF))
    }
    for (let u = 0; u < t.char.length; u++) {
      const { id: d, page: f } = t.char[u]
      let { x: p, y: m, width: g, height: A, xoffset: x, yoffset: _, xadvance: v } = t.char[u]
      ;(p /= h), (m /= h), (g /= h), (A /= h), (x /= h), (_ /= h), (v /= h)
      const S = new nt(p + l[f].frame.x / h, m + l[f].frame.y / h, g, A)
      this.chars[d] = {
        xOffset: x,
        yOffset: _,
        xAdvance: v,
        kerning: {},
        texture: new X(l[f].baseTexture, S),
        page: f
      }
    }
    for (let u = 0; u < t.kerning.length; u++) {
      let { first: d, second: f, amount: p } = t.kerning[u]
      ;(d /= h), (f /= h), (p /= h), this.chars[f] && (this.chars[f].kerning[d] = p)
    }
    ;(this.distanceFieldRange = a == null ? void 0 : a.distanceRange),
      (this.distanceFieldType =
        ((c = a == null ? void 0 : a.fieldType) == null ? void 0 : c.toLowerCase()) ?? 'none')
  }
  destroy() {
    for (const t in this.chars) this.chars[t].texture.destroy(), (this.chars[t].texture = null)
    for (const t in this.pageTextures)
      this._ownsTextures && this.pageTextures[t].destroy(!0), (this.pageTextures[t] = null)
    ;(this.chars = null), (this.pageTextures = null)
  }
  static install(t, e, i) {
    let s
    if (t instanceof mo) s = t
    else {
      const o = C1(t)
      if (!o) throw new Error('Unrecognized data format for font.')
      s = o.parse(t)
    }
    e instanceof X && (e = [e])
    const n = new We(s, e, i)
    return (We.available[n.font] = n), n
  }
  static uninstall(t) {
    const e = We.available[t]
    if (!e) throw new Error(`No font found named '${t}'`)
    e.destroy(), delete We.available[t]
  }
  static from(t, e, i) {
    if (!t) throw new Error('[BitmapFont] Property `name` is required.')
    const {
        chars: s,
        padding: n,
        resolution: o,
        textureWidth: a,
        textureHeight: h,
        ...l
      } = Object.assign({}, We.defaultOptions, i),
      c = P1(s),
      u = e instanceof Lr ? e : new Lr(e),
      d = a,
      f = new mo()
    ;(f.info[0] = { face: u.fontFamily, size: u.fontSize }),
      (f.common[0] = { lineHeight: u.fontSize })
    let p = 0,
      m = 0,
      g,
      A,
      x,
      _ = 0
    const v = []
    for (let C = 0; C < c.length; C++) {
      g ||
        ((g = Y.ADAPTER.createCanvas()),
        (g.width = a),
        (g.height = h),
        (A = g.getContext('2d')),
        (x = new ht(g, { resolution: o, ...l })),
        v.push(new X(x)),
        f.page.push({ id: v.length - 1, file: '' }))
      const I = c[C],
        T = Sr.measureText(I, u, !1, g),
        F = T.width,
        k = Math.ceil(T.height),
        rt = Math.ceil((u.fontStyle === 'italic' ? 2 : 1) * F)
      if (m >= h - k * o) {
        if (m === 0)
          throw new Error(
            `[BitmapFont] textureHeight ${h}px is too small (fontFamily: '${u.fontFamily}', fontSize: ${u.fontSize}px, char: '${I}')`
          )
        --C, (g = null), (A = null), (x = null), (m = 0), (p = 0), (_ = 0)
        continue
      }
      if (((_ = Math.max(k + T.fontProperties.descent, _)), rt * o + p >= d)) {
        if (p === 0)
          throw new Error(
            `[BitmapFont] textureWidth ${a}px is too small (fontFamily: '${u.fontFamily}', fontSize: ${u.fontSize}px, char: '${I}')`
          )
        --C, (m += _ * o), (m = Math.ceil(m)), (p = 0), (_ = 0)
        continue
      }
      R1(g, A, T, p, m, o, u)
      const G = Vn(T.text)
      f.char.push({
        id: G,
        page: v.length - 1,
        x: p / o,
        y: m / o,
        width: rt,
        height: k,
        xoffset: 0,
        yoffset: 0,
        xadvance: F - (u.dropShadow ? u.dropShadowDistance : 0) - (u.stroke ? u.strokeThickness : 0)
      }),
        (p += (rt + 2 * n) * o),
        (p = Math.ceil(p))
    }
    if (!(i != null && i.skipKerning))
      for (let C = 0, I = c.length; C < I; C++) {
        const T = c[C]
        for (let F = 0; F < I; F++) {
          const k = c[F],
            rt = A.measureText(T).width,
            G = A.measureText(k).width,
            E = A.measureText(T + k).width - (rt + G)
          E && f.kerning.push({ first: Vn(T), second: Vn(k), amount: E })
        }
      }
    const S = new We(f, v, !0)
    return We.available[t] !== void 0 && We.uninstall(t), (We.available[t] = S), S
  }
}
;(vr.ALPHA = [['a', 'z'], ['A', 'Z'], ' ']),
  (vr.NUMERIC = [['0', '9']]),
  (vr.ALPHANUMERIC = [['a', 'z'], ['A', 'Z'], ['0', '9'], ' ']),
  (vr.ASCII = [[' ', '~']]),
  (vr.defaultOptions = {
    resolution: 1,
    textureWidth: 512,
    textureHeight: 512,
    padding: 4,
    chars: vr.ALPHANUMERIC
  }),
  (vr.available = {})
let xr = vr
var M1 = `// Pixi texture info\r
varying vec2 vTextureCoord;\r
uniform sampler2D uSampler;\r
\r
// Tint\r
uniform vec4 uColor;\r
\r
// on 2D applications fwidth is screenScale / glyphAtlasScale * distanceFieldRange\r
uniform float uFWidth;\r
\r
void main(void) {\r
\r
  // To stack MSDF and SDF we need a non-pre-multiplied-alpha texture.\r
  vec4 texColor = texture2D(uSampler, vTextureCoord);\r
\r
  // MSDF\r
  float median = texColor.r + texColor.g + texColor.b -\r
                  min(texColor.r, min(texColor.g, texColor.b)) -\r
                  max(texColor.r, max(texColor.g, texColor.b));\r
  // SDF\r
  median = min(median, texColor.a);\r
\r
  float screenPxDistance = uFWidth * (median - 0.5);\r
  float alpha = clamp(screenPxDistance + 0.5, 0.0, 1.0);\r
  if (median < 0.01) {\r
    alpha = 0.0;\r
  } else if (median > 0.99) {\r
    alpha = 1.0;\r
  }\r
\r
  // Gamma correction for coverage-like alpha\r
  float luma = dot(uColor.rgb, vec3(0.299, 0.587, 0.114));\r
  float gamma = mix(1.0, 1.0 / 2.2, luma);\r
  float coverage = pow(uColor.a * alpha, gamma);  \r
\r
  // NPM Textures, NPM outputs\r
  gl_FragColor = vec4(uColor.rgb, coverage);\r
}\r
`,
  B1 = `// Mesh material default fragment\r
attribute vec2 aVertexPosition;\r
attribute vec2 aTextureCoord;\r
\r
uniform mat3 projectionMatrix;\r
uniform mat3 translationMatrix;\r
uniform mat3 uTextureMatrix;\r
\r
varying vec2 vTextureCoord;\r
\r
void main(void)\r
{\r
    gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\r
\r
    vTextureCoord = (uTextureMatrix * vec3(aTextureCoord, 1.0)).xy;\r
}\r
`
const $u = [],
  zu = [],
  Yu = [],
  qp = class Zp extends he {
    constructor(t, e = {}) {
      super()
      const {
        align: i,
        tint: s,
        maxWidth: n,
        letterSpacing: o,
        fontName: a,
        fontSize: h
      } = Object.assign({}, Zp.styleDefaults, e)
      if (!xr.available[a]) throw new Error(`Missing BitmapFont "${a}"`)
      ;(this._activePagesMeshData = []),
        (this._textWidth = 0),
        (this._textHeight = 0),
        (this._align = i),
        (this._tintColor = new St(s)),
        (this._font = void 0),
        (this._fontName = a),
        (this._fontSize = h),
        (this.text = t),
        (this._maxWidth = n),
        (this._maxLineHeight = 0),
        (this._letterSpacing = o),
        (this._anchor = new cr(
          () => {
            this.dirty = !0
          },
          this,
          0,
          0
        )),
        (this._roundPixels = Y.ROUND_PIXELS),
        (this.dirty = !0),
        (this._resolution = Y.RESOLUTION),
        (this._autoResolution = !0),
        (this._textureCache = {})
    }
    updateText() {
      var rt
      const t = xr.available[this._fontName],
        e = this.fontSize,
        i = e / t.size,
        s = new pt(),
        n = [],
        o = [],
        a = [],
        h =
          this._text.replace(
            /(?:\r\n|\r)/g,
            `
`
          ) || ' ',
        l = Kp(h),
        c = (this._maxWidth * t.size) / e,
        u = t.distanceFieldType === 'none' ? $u : zu
      let d = null,
        f = 0,
        p = 0,
        m = 0,
        g = -1,
        A = 0,
        x = 0,
        _ = 0,
        v = 0
      for (let G = 0; G < l.length; G++) {
        const E = l[G],
          M = Vn(E)
        if (
          (/(?:\s)/.test(E) && ((g = G), (A = f), v++),
          E === '\r' ||
            E ===
              `
`)
        ) {
          o.push(f),
            a.push(-1),
            (p = Math.max(p, f)),
            ++m,
            ++x,
            (s.x = 0),
            (s.y += t.lineHeight),
            (d = null),
            (v = 0)
          continue
        }
        const K = t.chars[M]
        if (!K) continue
        d && K.kerning[d] && (s.x += K.kerning[d])
        const Z = Yu.pop() || {
          texture: X.EMPTY,
          line: 0,
          charCode: 0,
          prevSpaces: 0,
          position: new pt()
        }
        ;(Z.texture = K.texture),
          (Z.line = m),
          (Z.charCode = M),
          (Z.position.x = Math.round(s.x + K.xOffset + this._letterSpacing / 2)),
          (Z.position.y = Math.round(s.y + K.yOffset)),
          (Z.prevSpaces = v),
          n.push(Z),
          (f = Z.position.x + Math.max(K.xAdvance - K.xOffset, K.texture.orig.width)),
          (s.x += K.xAdvance + this._letterSpacing),
          (_ = Math.max(_, K.yOffset + K.texture.height)),
          (d = M),
          g !== -1 &&
            c > 0 &&
            s.x > c &&
            (++x,
            Ui(n, 1 + g - x, 1 + G - g),
            (G = g),
            (g = -1),
            o.push(A),
            a.push(n.length > 0 ? n[n.length - 1].prevSpaces : 0),
            (p = Math.max(p, A)),
            m++,
            (s.x = 0),
            (s.y += t.lineHeight),
            (d = null),
            (v = 0))
      }
      const S = l[l.length - 1]
      S !== '\r' &&
        S !==
          `
` &&
        (/(?:\s)/.test(S) && (f = A), o.push(f), (p = Math.max(p, f)), a.push(-1))
      const C = []
      for (let G = 0; G <= m; G++) {
        let E = 0
        this._align === 'right'
          ? (E = p - o[G])
          : this._align === 'center'
            ? (E = (p - o[G]) / 2)
            : this._align === 'justify' && (E = a[G] < 0 ? 0 : (p - o[G]) / a[G]),
          C.push(E)
      }
      const I = n.length,
        T = {},
        F = [],
        k = this._activePagesMeshData
      u.push(...k)
      for (let G = 0; G < I; G++) {
        const E = n[G].texture,
          M = E.baseTexture.uid
        if (!T[M]) {
          let K = u.pop()
          if (!K) {
            const H = new ko()
            let W, gt
            t.distanceFieldType === 'none'
              ? ((W = new Ns(X.EMPTY)), (gt = st.NORMAL))
              : ((W = new Ns(X.EMPTY, { program: ur.from(B1, M1), uniforms: { uFWidth: 0 } })),
                (gt = st.NORMAL_NPM))
            const N = new fi(H, W)
            ;(N.blendMode = gt),
              (K = {
                index: 0,
                indexCount: 0,
                vertexCount: 0,
                uvsCount: 0,
                total: 0,
                mesh: N,
                vertices: null,
                uvs: null,
                indices: null
              })
          }
          ;(K.index = 0), (K.indexCount = 0), (K.vertexCount = 0), (K.uvsCount = 0), (K.total = 0)
          const { _textureCache: Z } = this
          ;(Z[M] = Z[M] || new X(E.baseTexture)),
            (K.mesh.texture = Z[M]),
            (K.mesh.tint = this._tintColor.value),
            F.push(K),
            (T[M] = K)
        }
        T[M].total++
      }
      for (let G = 0; G < k.length; G++) F.includes(k[G]) || this.removeChild(k[G].mesh)
      for (let G = 0; G < F.length; G++) F[G].mesh.parent !== this && this.addChild(F[G].mesh)
      this._activePagesMeshData = F
      for (const G in T) {
        const E = T[G],
          M = E.total
        if (
          !(((rt = E.indices) == null ? void 0 : rt.length) > 6 * M) ||
          E.vertices.length < fi.BATCHABLE_SIZE * 2
        )
          (E.vertices = new Float32Array(4 * 2 * M)),
            (E.uvs = new Float32Array(4 * 2 * M)),
            (E.indices = new Uint16Array(6 * M))
        else {
          const K = E.total,
            Z = E.vertices
          for (let H = K * 4 * 2; H < Z.length; H++) Z[H] = 0
        }
        E.mesh.size = 6 * M
      }
      for (let G = 0; G < I; G++) {
        const E = n[G]
        let M = E.position.x + C[E.line] * (this._align === 'justify' ? E.prevSpaces : 1)
        this._roundPixels && (M = Math.round(M))
        const K = M * i,
          Z = E.position.y * i,
          H = E.texture,
          W = T[H.baseTexture.uid],
          gt = H.frame,
          N = H._uvs,
          U = W.index++
        ;(W.indices[U * 6 + 0] = 0 + U * 4),
          (W.indices[U * 6 + 1] = 1 + U * 4),
          (W.indices[U * 6 + 2] = 2 + U * 4),
          (W.indices[U * 6 + 3] = 0 + U * 4),
          (W.indices[U * 6 + 4] = 2 + U * 4),
          (W.indices[U * 6 + 5] = 3 + U * 4),
          (W.vertices[U * 8 + 0] = K),
          (W.vertices[U * 8 + 1] = Z),
          (W.vertices[U * 8 + 2] = K + gt.width * i),
          (W.vertices[U * 8 + 3] = Z),
          (W.vertices[U * 8 + 4] = K + gt.width * i),
          (W.vertices[U * 8 + 5] = Z + gt.height * i),
          (W.vertices[U * 8 + 6] = K),
          (W.vertices[U * 8 + 7] = Z + gt.height * i),
          (W.uvs[U * 8 + 0] = N.x0),
          (W.uvs[U * 8 + 1] = N.y0),
          (W.uvs[U * 8 + 2] = N.x1),
          (W.uvs[U * 8 + 3] = N.y1),
          (W.uvs[U * 8 + 4] = N.x2),
          (W.uvs[U * 8 + 5] = N.y2),
          (W.uvs[U * 8 + 6] = N.x3),
          (W.uvs[U * 8 + 7] = N.y3)
      }
      ;(this._textWidth = p * i), (this._textHeight = (s.y + t.lineHeight) * i)
      for (const G in T) {
        const E = T[G]
        if (this.anchor.x !== 0 || this.anchor.y !== 0) {
          let H = 0
          const W = this._textWidth * this.anchor.x,
            gt = this._textHeight * this.anchor.y
          for (let N = 0; N < E.total; N++)
            (E.vertices[H++] -= W),
              (E.vertices[H++] -= gt),
              (E.vertices[H++] -= W),
              (E.vertices[H++] -= gt),
              (E.vertices[H++] -= W),
              (E.vertices[H++] -= gt),
              (E.vertices[H++] -= W),
              (E.vertices[H++] -= gt)
        }
        this._maxLineHeight = _ * i
        const M = E.mesh.geometry.getBuffer('aVertexPosition'),
          K = E.mesh.geometry.getBuffer('aTextureCoord'),
          Z = E.mesh.geometry.getIndex()
        ;(M.data = E.vertices),
          (K.data = E.uvs),
          (Z.data = E.indices),
          M.update(),
          K.update(),
          Z.update()
      }
      for (let G = 0; G < n.length; G++) Yu.push(n[G])
      ;(this._font = t), (this.dirty = !1)
    }
    updateTransform() {
      this.validate(), this.containerUpdateTransform()
    }
    _render(t) {
      this._autoResolution &&
        this._resolution !== t.resolution &&
        ((this._resolution = t.resolution), (this.dirty = !0))
      const { distanceFieldRange: e, distanceFieldType: i, size: s } = xr.available[this._fontName]
      if (i !== 'none') {
        const { a: n, b: o, c: a, d: h } = this.worldTransform,
          l = Math.sqrt(n * n + o * o),
          c = Math.sqrt(a * a + h * h),
          u = (Math.abs(l) + Math.abs(c)) / 2,
          d = this.fontSize / s,
          f = t._view.resolution
        for (const p of this._activePagesMeshData) p.mesh.shader.uniforms.uFWidth = u * e * d * f
      }
      super._render(t)
    }
    getLocalBounds() {
      return this.validate(), super.getLocalBounds()
    }
    validate() {
      const t = xr.available[this._fontName]
      if (!t) throw new Error(`Missing BitmapFont "${this._fontName}"`)
      this._font !== t && (this.dirty = !0), this.dirty && this.updateText()
    }
    get tint() {
      return this._tintColor.value
    }
    set tint(t) {
      if (this.tint !== t) {
        this._tintColor.setValue(t)
        for (let e = 0; e < this._activePagesMeshData.length; e++)
          this._activePagesMeshData[e].mesh.tint = t
      }
    }
    get align() {
      return this._align
    }
    set align(t) {
      this._align !== t && ((this._align = t), (this.dirty = !0))
    }
    get fontName() {
      return this._fontName
    }
    set fontName(t) {
      if (!xr.available[t]) throw new Error(`Missing BitmapFont "${t}"`)
      this._fontName !== t && ((this._fontName = t), (this.dirty = !0))
    }
    get fontSize() {
      return this._fontSize ?? xr.available[this._fontName].size
    }
    set fontSize(t) {
      this._fontSize !== t && ((this._fontSize = t), (this.dirty = !0))
    }
    get anchor() {
      return this._anchor
    }
    set anchor(t) {
      typeof t == 'number' ? this._anchor.set(t) : this._anchor.copyFrom(t)
    }
    get text() {
      return this._text
    }
    set text(t) {
      ;(t = String(t ?? '')), this._text !== t && ((this._text = t), (this.dirty = !0))
    }
    get maxWidth() {
      return this._maxWidth
    }
    set maxWidth(t) {
      this._maxWidth !== t && ((this._maxWidth = t), (this.dirty = !0))
    }
    get maxLineHeight() {
      return this.validate(), this._maxLineHeight
    }
    get textWidth() {
      return this.validate(), this._textWidth
    }
    get letterSpacing() {
      return this._letterSpacing
    }
    set letterSpacing(t) {
      this._letterSpacing !== t && ((this._letterSpacing = t), (this.dirty = !0))
    }
    get roundPixels() {
      return this._roundPixels
    }
    set roundPixels(t) {
      t !== this._roundPixels && ((this._roundPixels = t), (this.dirty = !0))
    }
    get textHeight() {
      return this.validate(), this._textHeight
    }
    get resolution() {
      return this._resolution
    }
    set resolution(t) {
      ;(this._autoResolution = !1),
        this._resolution !== t && ((this._resolution = t), (this.dirty = !0))
    }
    destroy(t) {
      const { _textureCache: e } = this,
        i = xr.available[this._fontName].distanceFieldType === 'none' ? $u : zu
      i.push(...this._activePagesMeshData)
      for (const s of this._activePagesMeshData) this.removeChild(s.mesh)
      ;(this._activePagesMeshData = []),
        i
          .filter((s) => e[s.mesh.texture.baseTexture.uid])
          .forEach((s) => {
            s.mesh.texture = X.EMPTY
          })
      for (const s in e) e[s].destroy(), delete e[s]
      ;(this._font = null), (this._tintColor = null), (this._textureCache = null), super.destroy(t)
    }
  }
qp.styleDefaults = { align: 'left', tint: 16777215, maxWidth: 0, letterSpacing: 0 }
let Jp = qp
const F1 = ['.xml', '.fnt'],
  D1 = {
    extension: { type: j.LoadParser, priority: Ne.Normal },
    name: 'loadBitmapFont',
    test(r) {
      return F1.includes(Kt.extname(r).toLowerCase())
    },
    async testParse(r) {
      return Hn.test(r) || Xh.test(r)
    },
    async parse(r, t, e) {
      const i = Hn.test(r) ? Hn.parse(r) : Xh.parse(r),
        { src: s } = t,
        { page: n } = i,
        o = []
      for (let l = 0; l < n.length; ++l) {
        const c = n[l].file
        let u = Kt.join(Kt.dirname(s), c)
        ;(u = Lh(u, s)), o.push(u)
      }
      const a = await e.load(o),
        h = o.map((l) => a[l])
      return xr.install(i, h, !0)
    },
    async load(r, t) {
      return (await Y.ADAPTER.fetch(r)).text()
    },
    unload(r) {
      r.destroy()
    }
  }
q.add(D1)
const jh = class Ci extends Lr {
  constructor() {
    super(...arguments),
      (this._fonts = []),
      (this._overrides = []),
      (this._stylesheet = ''),
      (this.fontsDirty = !1)
  }
  static from(t) {
    return new Ci(Object.keys(Ci.defaultOptions).reduce((e, i) => ({ ...e, [i]: t[i] }), {}))
  }
  cleanFonts() {
    this._fonts.length > 0 &&
      (this._fonts.forEach((t) => {
        URL.revokeObjectURL(t.src),
          t.refs--,
          t.refs === 0 &&
            (t.fontFace && document.fonts.delete(t.fontFace),
            delete Ci.availableFonts[t.originalUrl])
      }),
      (this.fontFamily = 'Arial'),
      (this._fonts.length = 0),
      this.styleID++,
      (this.fontsDirty = !0))
  }
  loadFont(t, e = {}) {
    const { availableFonts: i } = Ci
    if (i[t]) {
      const s = i[t]
      return (
        this._fonts.push(s), s.refs++, this.styleID++, (this.fontsDirty = !0), Promise.resolve()
      )
    }
    return Y.ADAPTER.fetch(t)
      .then((s) => s.blob())
      .then(
        async (s) =>
          new Promise((n, o) => {
            const a = URL.createObjectURL(s),
              h = new FileReader()
            ;(h.onload = () => n([a, h.result])), (h.onerror = o), h.readAsDataURL(s)
          })
      )
      .then(async ([s, n]) => {
        const o = Object.assign(
          {
            family: Kt.basename(t, Kt.extname(t)),
            weight: 'normal',
            style: 'normal',
            display: 'auto',
            src: s,
            dataSrc: n,
            refs: 1,
            originalUrl: t,
            fontFace: null
          },
          e
        )
        ;(i[t] = o), this._fonts.push(o), this.styleID++
        const a = new FontFace(o.family, `url(${o.src})`, {
          weight: o.weight,
          style: o.style,
          display: o.display
        })
        ;(o.fontFace = a),
          await a.load(),
          document.fonts.add(a),
          await document.fonts.ready,
          this.styleID++,
          (this.fontsDirty = !0)
      })
  }
  addOverride(...t) {
    const e = t.filter((i) => !this._overrides.includes(i))
    e.length > 0 && (this._overrides.push(...e), this.styleID++)
  }
  removeOverride(...t) {
    const e = t.filter((i) => this._overrides.includes(i))
    e.length > 0 &&
      ((this._overrides = this._overrides.filter((i) => !e.includes(i))), this.styleID++)
  }
  toCSS(t) {
    return [
      `transform: scale(${t})`,
      'transform-origin: top left',
      'display: inline-block',
      `color: ${this.normalizeColor(this.fill)}`,
      `font-size: ${this.fontSize}px`,
      `font-family: ${this.fontFamily}`,
      `font-weight: ${this.fontWeight}`,
      `font-style: ${this.fontStyle}`,
      `font-variant: ${this.fontVariant}`,
      `letter-spacing: ${this.letterSpacing}px`,
      `text-align: ${this.align}`,
      `padding: ${this.padding}px`,
      `white-space: ${this.whiteSpace}`,
      ...(this.lineHeight ? [`line-height: ${this.lineHeight}px`] : []),
      ...(this.wordWrap
        ? [
            `word-wrap: ${this.breakWords ? 'break-all' : 'break-word'}`,
            `max-width: ${this.wordWrapWidth}px`
          ]
        : []),
      ...(this.strokeThickness
        ? [
            `-webkit-text-stroke-width: ${this.strokeThickness}px`,
            `-webkit-text-stroke-color: ${this.normalizeColor(this.stroke)}`,
            `text-stroke-width: ${this.strokeThickness}px`,
            `text-stroke-color: ${this.normalizeColor(this.stroke)}`,
            'paint-order: stroke'
          ]
        : []),
      ...(this.dropShadow ? [this.dropShadowToCSS()] : []),
      ...this._overrides
    ].join(';')
  }
  toGlobalCSS() {
    return this._fonts.reduce(
      (t, e) => `${t}
            @font-face {
                font-family: "${e.family}";
                src: url('${e.dataSrc}');
                font-weight: ${e.weight};
                font-style: ${e.style};
                font-display: ${e.display};
            }`,
      this._stylesheet
    )
  }
  get stylesheet() {
    return this._stylesheet
  }
  set stylesheet(t) {
    this._stylesheet !== t && ((this._stylesheet = t), this.styleID++)
  }
  normalizeColor(t) {
    return Array.isArray(t) && (t = w0(t)), typeof t == 'number' ? T0(t) : t
  }
  dropShadowToCSS() {
    let t = this.normalizeColor(this.dropShadowColor)
    const e = this.dropShadowAlpha,
      i = Math.round(Math.cos(this.dropShadowAngle) * this.dropShadowDistance),
      s = Math.round(Math.sin(this.dropShadowAngle) * this.dropShadowDistance)
    t.startsWith('#') && e < 1 && (t += ((e * 255) | 0).toString(16).padStart(2, '0'))
    const n = `${i}px ${s}px`
    return this.dropShadowBlur > 0
      ? `text-shadow: ${n} ${this.dropShadowBlur}px ${t}`
      : `text-shadow: ${n} ${t}`
  }
  reset() {
    Object.assign(this, Ci.defaultOptions)
  }
  onBeforeDraw() {
    const { fontsDirty: t } = this
    return (
      (this.fontsDirty = !1),
      this.isSafari && this._fonts.length > 0 && t
        ? new Promise((e) => setTimeout(e, 100))
        : Promise.resolve()
    )
  }
  get isSafari() {
    const { userAgent: t } = Y.ADAPTER.getNavigator()
    return /^((?!chrome|android).)*safari/i.test(t)
  }
  set fillGradientStops(t) {
    console.warn('[HTMLTextStyle] fillGradientStops is not supported by HTMLText')
  }
  get fillGradientStops() {
    return super.fillGradientStops
  }
  set fillGradientType(t) {
    console.warn('[HTMLTextStyle] fillGradientType is not supported by HTMLText')
  }
  get fillGradientType() {
    return super.fillGradientType
  }
  set miterLimit(t) {
    console.warn('[HTMLTextStyle] miterLimit is not supported by HTMLText')
  }
  get miterLimit() {
    return super.miterLimit
  }
  set trim(t) {
    console.warn('[HTMLTextStyle] trim is not supported by HTMLText')
  }
  get trim() {
    return super.trim
  }
  set textBaseline(t) {
    console.warn('[HTMLTextStyle] textBaseline is not supported by HTMLText')
  }
  get textBaseline() {
    return super.textBaseline
  }
  set leading(t) {
    console.warn('[HTMLTextStyle] leading is not supported by HTMLText')
  }
  get leading() {
    return super.leading
  }
  set lineJoin(t) {
    console.warn('[HTMLTextStyle] lineJoin is not supported by HTMLText')
  }
  get lineJoin() {
    return super.lineJoin
  }
}
;(jh.availableFonts = {}),
  (jh.defaultOptions = {
    align: 'left',
    breakWords: !1,
    dropShadow: !1,
    dropShadowAlpha: 1,
    dropShadowAngle: Math.PI / 6,
    dropShadowBlur: 0,
    dropShadowColor: 'black',
    dropShadowDistance: 5,
    fill: 'black',
    fontFamily: 'Arial',
    fontSize: 26,
    fontStyle: 'normal',
    fontVariant: 'normal',
    fontWeight: 'normal',
    letterSpacing: 0,
    lineHeight: 0,
    padding: 0,
    stroke: 'black',
    strokeThickness: 0,
    whiteSpace: 'normal',
    wordWrap: !1,
    wordWrapWidth: 100
  })
let Oa = jh
const Rn = class Ii extends or {
  constructor(t = '', e = {}) {
    super(X.EMPTY),
      (this._text = null),
      (this._style = null),
      (this._autoResolution = !0),
      (this.localStyleID = -1),
      (this.dirty = !1),
      (this._updateID = 0),
      (this.ownsStyle = !1)
    const i = new Image(),
      s = X.from(i, { scaleMode: Y.SCALE_MODE, resourceOptions: { autoLoad: !1 } })
    ;(s.orig = new nt()), (s.trim = new nt()), (this.texture = s)
    const n = 'http://www.w3.org/2000/svg',
      o = 'http://www.w3.org/1999/xhtml',
      a = document.createElementNS(n, 'svg'),
      h = document.createElementNS(n, 'foreignObject'),
      l = document.createElementNS(o, 'div'),
      c = document.createElementNS(o, 'style')
    h.setAttribute('width', '10000'),
      h.setAttribute('height', '10000'),
      (h.style.overflow = 'hidden'),
      a.appendChild(h),
      (this.maxWidth = Ii.defaultMaxWidth),
      (this.maxHeight = Ii.defaultMaxHeight),
      (this._domElement = l),
      (this._styleElement = c),
      (this._svgRoot = a),
      (this._foreignObject = h),
      this._foreignObject.appendChild(c),
      this._foreignObject.appendChild(l),
      (this._image = i),
      (this._loadImage = new Image()),
      (this._autoResolution = Ii.defaultAutoResolution),
      (this._resolution = Ii.defaultResolution ?? Y.RESOLUTION),
      (this.text = t),
      (this.style = e)
  }
  measureText(t) {
    var c, u
    const {
      text: e,
      style: i,
      resolution: s
    } = Object.assign({ text: this._text, style: this._style, resolution: this._resolution }, t)
    Object.assign(this._domElement, { innerHTML: e, style: i.toCSS(s) }),
      (this._styleElement.textContent = i.toGlobalCSS()),
      document.body.appendChild(this._svgRoot)
    const n = this._domElement.getBoundingClientRect()
    this._svgRoot.remove()
    const { width: o, height: a } = n
    ;(o > this.maxWidth || a > this.maxHeight) &&
      console.warn(
        '[HTMLText] Large expanse of text, increase HTMLText.maxWidth or HTMLText.maxHeight property.'
      )
    const h = Math.min(this.maxWidth, Math.ceil(o)),
      l = Math.min(this.maxHeight, Math.ceil(a))
    return (
      this._svgRoot.setAttribute('width', h.toString()),
      this._svgRoot.setAttribute('height', l.toString()),
      e !== this._text && (this._domElement.innerHTML = this._text),
      i !== this._style &&
        (Object.assign(this._domElement, {
          style: (c = this._style) == null ? void 0 : c.toCSS(s)
        }),
        (this._styleElement.textContent = (u = this._style) == null ? void 0 : u.toGlobalCSS())),
      { width: h + i.padding * 2, height: l + i.padding * 2 }
    )
  }
  async updateText(t = !0) {
    const { style: e, _image: i, _loadImage: s } = this
    if (
      (this.localStyleID !== e.styleID && ((this.dirty = !0), (this.localStyleID = e.styleID)),
      !this.dirty && t)
    )
      return
    const { width: n, height: o } = this.measureText()
    ;(i.width = s.width = Math.ceil(Math.max(1, n))),
      (i.height = s.height = Math.ceil(Math.max(1, o))),
      this._updateID++
    const a = this._updateID
    await new Promise((h) => {
      s.onload = async () => {
        if (a < this._updateID) {
          h()
          return
        }
        await e.onBeforeDraw(),
          (i.src = s.src),
          (s.onload = null),
          (s.src = ''),
          this.updateTexture(),
          h()
      }
      const l = new XMLSerializer().serializeToString(this._svgRoot)
      s.src = `data:image/svg+xml;charset=utf8,${encodeURIComponent(l)}`
    })
  }
  get source() {
    return this._image
  }
  updateTexture() {
    const { style: t, texture: e, _image: i, resolution: s } = this,
      { padding: n } = t,
      { baseTexture: o } = e
    ;(e.trim.width = e._frame.width = i.width / s),
      (e.trim.height = e._frame.height = i.height / s),
      (e.trim.x = -n),
      (e.trim.y = -n),
      (e.orig.width = e._frame.width - n * 2),
      (e.orig.height = e._frame.height - n * 2),
      this._onTextureUpdate(),
      o.setRealSize(i.width, i.height, s),
      (this.dirty = !1)
  }
  _render(t) {
    this._autoResolution &&
      this._resolution !== t.resolution &&
      ((this._resolution = t.resolution), (this.dirty = !0)),
      this.updateText(!0),
      super._render(t)
  }
  _renderCanvas(t) {
    this._autoResolution &&
      this._resolution !== t.resolution &&
      ((this._resolution = t.resolution), (this.dirty = !0)),
      this.updateText(!0),
      super._renderCanvas(t)
  }
  getLocalBounds(t) {
    return this.updateText(!0), super.getLocalBounds(t)
  }
  _calculateBounds() {
    this.updateText(!0), this.calculateVertices(), this._bounds.addQuad(this.vertexData)
  }
  _onStyleChange() {
    this.dirty = !0
  }
  destroy(t) {
    var i, s, n, o, a
    typeof t == 'boolean' && (t = { children: t }),
      (t = Object.assign({}, Ii.defaultDestroyOptions, t)),
      super.destroy(t)
    const e = null
    this.ownsStyle && ((i = this._style) == null || i.cleanFonts()),
      (this._style = e),
      (s = this._svgRoot) == null || s.remove(),
      (this._svgRoot = e),
      (n = this._domElement) == null || n.remove(),
      (this._domElement = e),
      (o = this._foreignObject) == null || o.remove(),
      (this._foreignObject = e),
      (a = this._styleElement) == null || a.remove(),
      (this._styleElement = e),
      (this._loadImage.src = ''),
      (this._loadImage.onload = null),
      (this._loadImage = e),
      (this._image.src = ''),
      (this._image = e)
  }
  get width() {
    return this.updateText(!0), (Math.abs(this.scale.x) * this._image.width) / this.resolution
  }
  set width(t) {
    this.updateText(!0)
    const e = Rr(this.scale.x) || 1
    ;(this.scale.x = (e * t) / this._image.width / this.resolution), (this._width = t)
  }
  get height() {
    return this.updateText(!0), (Math.abs(this.scale.y) * this._image.height) / this.resolution
  }
  set height(t) {
    this.updateText(!0)
    const e = Rr(this.scale.y) || 1
    ;(this.scale.y = (e * t) / this._image.height / this.resolution), (this._height = t)
  }
  get style() {
    return this._style
  }
  set style(t) {
    this._style !== t &&
      ((t = t || {}),
      t instanceof Oa
        ? ((this.ownsStyle = !1), (this._style = t))
        : t instanceof Lr
          ? (console.warn(
              '[HTMLText] Cloning TextStyle, if this is not what you want, use HTMLTextStyle'
            ),
            (this.ownsStyle = !0),
            (this._style = Oa.from(t)))
          : ((this.ownsStyle = !0), (this._style = new Oa(t))),
      (this.localStyleID = -1),
      (this.dirty = !0))
  }
  get text() {
    return this._text
  }
  set text(t) {
    ;(t = String(t === '' || t === null || t === void 0 ? ' ' : t)),
      (t = this.sanitiseText(t)),
      this._text !== t && ((this._text = t), (this.dirty = !0))
  }
  get resolution() {
    return this._resolution
  }
  set resolution(t) {
    ;(this._autoResolution = !1),
      this._resolution !== t && ((this._resolution = t), (this.dirty = !0))
  }
  sanitiseText(t) {
    return t
      .replace(/<br>/gi, '<br/>')
      .replace(/<hr>/gi, '<hr/>')
      .replace(/&nbsp;/gi, '&#160;')
  }
}
;(Rn.defaultDestroyOptions = { texture: !0, children: !1, baseTexture: !0 }),
  (Rn.defaultMaxWidth = 2024),
  (Rn.defaultMaxHeight = 2024),
  (Rn.defaultAutoResolution = !0)
function tm(r, t = {}) {
  for (const e in t) r.baseTexture[e] = t[e]
}
function O1(r, t, e, i) {
  const s = od()
  function n() {
    var o
    e && i !== e && ((o = r[`__${t}_scope`]) == null || o.stop(), delete r[`__${t}_scope`])
    for (const [a, h] of Object.entries(i)) r[t][a] = h
  }
  return (
    s.run(() => {
      Rd(n), Yi(n)
    }),
    r.on('destroyed', () => s.stop()),
    (r[`__${t}_scope`] = s),
    !0
  )
}
function L1(r, t, e, i, s) {
  switch (e) {
    case t:
      return rf(s) ? O1(r, t, i, s) : N1(r, t, s)
    case `${t}X`:
      return Wh(r[t], 'x', () => (r[t].x = s))
    case `${t}Y`:
      return Wh(r[t], 'y', () => (r[t].y = s))
  }
  return !1
}
function Wh(r, t, e) {
  const i = `__${t}_init`
  function s() {
    e()
  }
  return r[i] ? s() : (Reflect.set(r, i, !0), Yi(s)), !0
}
function N1(r, t, e) {
  const [i, s] = Array.isArray(e) ? e : [e, e],
    n = `__${t}_init`
  function o() {
    return r[t].set(i, s)
  }
  return r[n] ? o() : (Reflect.set(r, n, !0), Yi(o)), !0
}
function ei(r) {
  return typeof r == 'string' ? X.from(r) : r
}
function U1(r, t) {
  const e = t.startsWith(r)
  return (
    (t = tr(t)),
    (t = t.charAt(0).toUpperCase() + t.slice(1)),
    (e && t.slice(r.length) === 'Filter') || t === 'Filter'
  )
}
function k1(r) {
  return Object.keys(r || {}).some((t) => t.startsWith('on'))
}
var G1 = ['accessible', 'cullable', 'renderable', 'visible', 'isMask'],
  H1 = ['dirty', 'roundPixels'],
  V1 = ['uvRespectAnchor'],
  X1 = ['loop', 'updateAnchor'],
  j1 = ['roundPixels'],
  W1 = ['roundPixels', 'autoResize'],
  $1 = ['position', 'scale', 'pivot', 'skew', 'anchor', 'tilePosition', 'tileScale']
function z1(r, t, e, i) {
  t = tr(t)
  const s = [
    { element: or, patch: Y1 },
    { element: Uo, patch: Q1 },
    { element: Jp, patch: K1 },
    { element: Ho, patch: q1 },
    { element: Us, patch: Z1 },
    { element: fi, patch: J1 },
    { element: Ll, patch: tE }
  ]
  for (const { element: n, patch: o } of s) if (r instanceof n && o(r, t, e, i)) return
  Zi(r, G1, t, i) || eE(r, t, e, i) || rE(r, t, e, i) || Reflect.set(r, t, i)
}
function Y1(r, t, e, i) {
  return t === 'texture'
    ? ((r.texture = ei(i)), !0)
    : t === 'textureOptions'
      ? (tm(r.texture, i), !0)
      : !1
}
function Q1(r, t, e, i) {
  if (t === 'onDraw' && !e && typeof i == 'function') {
    const s = od()
    return s.run(() => Rd(() => i(r))), r.on('destroyed', () => s.stop()), !0
  }
  return !1
}
function K1(r, t, e, i) {
  return Zi(r, H1, t, i)
}
function q1(r, t, e, i) {
  return t === 'texture'
    ? ((r.texture = ei(i)), !0)
    : t === 'textureOptions'
      ? (tm(r.texture, i), !0)
      : Zi(r, V1, t, i)
}
function Z1(r, t, e, i) {
  return t === 'play' ? Wh(r, t, () => (i ? r.play() : r.stop())) : Zi(r, X1, t, i)
}
function J1(r, t, e, i) {
  return Zi(r, j1, t, i)
}
function tE(r, t, e, i) {
  return Zi(r, W1, t, i)
}
function eE(r, t, e, i) {
  for (const s of $1) if (t.startsWith(s)) return L1(r, s, t, e, i)
  return !1
}
function rE(r, t, e, i) {
  if (!t.startsWith('on')) return !1
  const s = t.slice(2).toLowerCase()
  return e && r.off(s, e), i && (r == null || r.on(s, i)), !0
}
function Zi(r, t, e, i) {
  return t.includes(e) && i === '' ? ((r[e] = !0), !0) : !1
}
var Qu = {
  Container: () => new he(),
  Sprite: (r) => new or(ei(r.texture)),
  SimpleMesh: () => new s1(),
  Graphics: (r) => new Uo(r == null ? void 0 : r.geometry),
  Text: (r) => new Xi(r.text, r.style, r.canvas),
  BitmapText: (r) => new Jp(r.text, r.style),
  TilingSprite: (r) => new Ho(ei(r.texture), r.width, r.height),
  AnimatedSprite: (r) => new Us(r.textures, r.autoUpdate),
  Mesh: (r) => new fi(r.geometry, r.shader, r.state, r.drawMode),
  NineSlicePlane: (r) => new i1(ei(r.texture)),
  SimplePlane: (r) => new Ll(ei(r.texture), r.verticesX, r.verticesY),
  SimpleRope: (r) => new n1(ei(r.texture), r.points, r.textureScale),
  BlurFilter: (r) => new Ep(r.strength, r.quality, r.resolution, r.kernelSize),
  AlphaFilter: (r) => new bp(r.alpha),
  DisplacementFilter: (r) => new Tp(r.sprite, r.scale),
  ColorMatrixFilter: () => new ho(),
  NoiseFilter: (r) => new Sp(r.noise, r.seed),
  FXAAFilter: () => new wp()
}
function iE(r = {}) {
  const { prefix: t = 'pixi' } = r
  return jg({
    createElement: (e, i, s, n) => {
      var o
      const a = U1(t, e)
        ? (o = n == null ? void 0 : n.is) == null
          ? void 0
          : o.call(n, n)
        : sE(t, e, n)
      return (
        a instanceof he &&
          ((a.filters = []), k1(n) && a.eventMode === 'auto' && (a.eventMode = 'static')),
        a
      )
    },
    patchProp: z1,
    parentNode: (e) => e.parent,
    createText: (e) => new Xi(e),
    createComment: () => new he(),
    remove: (e) => e.destroy(),
    insert: (e, i, s) => {
      e instanceof Jt ? oE(e, i) : nE(e, i, s)
    },
    nextSibling: (e) => (e instanceof Jt ? aE(e) : hE(e)),
    setElementText: (e, i) => {
      e instanceof Xi ? (e.text = i.trim()) : c_()
    },
    setText: (e, i) => {
      e instanceof Xi && (e.text = i)
    }
  })
}
function sE(r, t, e) {
  let i
  return (
    t.startsWith(r)
      ? ((t = tr(t)), (i = Qu[t.slice(r.length)]))
      : ((t = tr(t)), (t = t.charAt(0).toUpperCase() + t.slice(1)), (i = Qu[t])),
    i ? i(e ?? {}) : new he()
  )
}
function nE(r, t, e) {
  e ? t.addChildAt(r, t.getChildIndex(e)) : t.addChild(r)
}
function oE(r, t, e) {
  function i() {
    var s
    ;(s = t.filters) == null || s.splice(t.filters.indexOf(r) >>> 0, 1)
  }
  ;(r.parent = t), (r.destroy = i), t.filters.push(r)
}
function aE(r) {
  const t = r.parent.filters.indexOf(r)
  return r.parent.filters.length <= t + 1 ? null : r
}
function hE(r) {
  var t
  const e = r.parent.getChildIndex(r)
  return r.parent.children.length <= e + 1
    ? null
    : (t = r.parent.getChildAt(e + 1)) != null
      ? t
      : null
}
var { createApp: lE, render: KT } = iE()
function cE(r, t) {
  let e, i, s
  const n = kt(!0),
    o = () => {
      ;(n.value = !0), s()
    }
  Se(r, o, { flush: 'sync' })
  const a = typeof t == 'function' ? t : t.get,
    h = typeof t == 'function' ? void 0 : t.set,
    l = bd(
      (c, u) => (
        (i = c),
        (s = u),
        {
          get() {
            return n.value && ((e = a()), (n.value = !1)), i(), e
          },
          set(d) {
            h == null || h(d)
          }
        }
      )
    )
  return Object.isExtensible(l) && (l.trigger = o), l
}
function Ys(r) {
  return ad() ? (Cm(r), !0) : !1
}
function oe(r) {
  return typeof r == 'function' ? r() : Et(r)
}
const uE = typeof window < 'u' && typeof document < 'u'
typeof WorkerGlobalScope < 'u' && globalThis instanceof WorkerGlobalScope
const dE = Object.prototype.toString,
  fE = (r) => dE.call(r) === '[object Object]',
  pE = () => {}
function mE(r, t = !1, e = 'Timeout') {
  return new Promise((i, s) => {
    setTimeout(t ? () => s(e) : i, r)
  })
}
function em(r) {
  return r
}
function rm(r) {
  return r || Hs()
}
function gE(r, t) {
  rm(t) && fl(r, t)
}
function _E(r, t = !0, e) {
  rm() ? wo(r, e) : t ? r() : Yi(r)
}
function Ku(r, t, e) {
  const i = Se(
    r,
    (s, n, o) => {
      s && (e != null && e.once && Yi(() => i()), t(s, n, o))
    },
    { ...e, once: !1 }
  )
  return i
}
function $h(r) {
  var t
  const e = oe(r)
  return (t = e == null ? void 0 : e.$el) != null ? t : e
}
const Qs = uE ? window : void 0
function go(...r) {
  let t, e, i, s
  if (
    (typeof r[0] == 'string' || Array.isArray(r[0])
      ? (([e, i, s] = r), (t = Qs))
      : ([t, e, i, s] = r),
    !t)
  )
    return pE
  Array.isArray(e) || (e = [e]), Array.isArray(i) || (i = [i])
  const n = [],
    o = () => {
      n.forEach((c) => c()), (n.length = 0)
    },
    a = (c, u, d, f) => (c.addEventListener(u, d, f), () => c.removeEventListener(u, d, f)),
    h = Se(
      () => [$h(t), oe(s)],
      ([c, u]) => {
        if ((o(), !c)) return
        const d = fE(u) ? { ...u } : u
        n.push(...e.flatMap((f) => i.map((p) => a(c, f, p, d))))
      },
      { immediate: !0, flush: 'post' }
    ),
    l = () => {
      h(), o()
    }
  return Ys(l), l
}
function yE(r) {
  return typeof r == 'function'
    ? r
    : typeof r == 'string'
      ? (t) => t.key === r
      : Array.isArray(r)
        ? (t) => r.includes(t.key)
        : () => !0
}
function AE(...r) {
  let t,
    e,
    i = {}
  r.length === 3
    ? ((t = r[0]), (e = r[1]), (i = r[2]))
    : r.length === 2
      ? typeof r[1] == 'object'
        ? ((t = !0), (e = r[0]), (i = r[1]))
        : ((t = r[0]), (e = r[1]))
      : ((t = !0), (e = r[0]))
  const { target: s = Qs, eventName: n = 'keydown', passive: o = !1, dedupe: a = !1 } = i,
    h = yE(t)
  return go(
    s,
    n,
    (c) => {
      ;(c.repeat && oe(a)) || (h(c) && e(c))
    },
    o
  )
}
function vE(r, t, e = {}) {
  return AE(r, t, { ...e, eventName: 'keydown' })
}
function xE() {
  const r = kt(!1),
    t = Hs()
  return (
    t &&
      wo(() => {
        r.value = !0
      }, t),
    r
  )
}
function bE(r) {
  const t = xE()
  return ir(() => (t.value, !!r()))
}
function EE(r, t = {}) {
  const { immediate: e = !0, fpsLimit: i = void 0, window: s = Qs } = t,
    n = kt(!1),
    o = i ? 1e3 / i : null
  let a = 0,
    h = null
  function l(d) {
    if (!n.value || !s) return
    a || (a = d)
    const f = d - a
    if (o && f < o) {
      h = s.requestAnimationFrame(l)
      return
    }
    ;(a = d), r({ delta: f, timestamp: d }), (h = s.requestAnimationFrame(l))
  }
  function c() {
    !n.value && s && ((n.value = !0), (a = 0), (h = s.requestAnimationFrame(l)))
  }
  function u() {
    ;(n.value = !1), h != null && s && (s.cancelAnimationFrame(h), (h = null))
  }
  return e && c(), Ys(u), { isActive: al(n), pause: u, resume: c }
}
function TE(r, t, e = {}) {
  const { window: i = Qs, ...s } = e
  let n
  const o = bE(() => i && 'ResizeObserver' in i),
    a = () => {
      n && (n.disconnect(), (n = void 0))
    },
    h = ir(() => (Array.isArray(r) ? r.map((u) => $h(u)) : [$h(r)])),
    l = Se(
      h,
      (u) => {
        if ((a(), o.value && i)) {
          n = new ResizeObserver(t)
          for (const d of u) d && n.observe(d, s)
        }
      },
      { immediate: !0, flush: 'post' }
    ),
    c = () => {
      a(), l()
    }
  return Ys(c), { isSupported: o, stop: c }
}
function wE(r, t = {}) {
  const { delayEnter: e = 0, delayLeave: i = 0, window: s = Qs } = t,
    n = kt(!1)
  let o
  const a = (h) => {
    const l = h ? e : i
    o && (clearTimeout(o), (o = void 0)),
      l ? (o = setTimeout(() => (n.value = h), l)) : (n.value = h)
  }
  return (
    s &&
      (go(r, 'mouseenter', () => a(!0), { passive: !0 }),
      go(r, 'mouseleave', () => a(!1), { passive: !0 })),
    n
  )
}
const SE = {
    easeInSine: [0.12, 0, 0.39, 0],
    easeOutSine: [0.61, 1, 0.88, 1],
    easeInOutSine: [0.37, 0, 0.63, 1],
    easeInQuad: [0.11, 0, 0.5, 0],
    easeOutQuad: [0.5, 1, 0.89, 1],
    easeInOutQuad: [0.45, 0, 0.55, 1],
    easeInCubic: [0.32, 0, 0.67, 0],
    easeOutCubic: [0.33, 1, 0.68, 1],
    easeInOutCubic: [0.65, 0, 0.35, 1],
    easeInQuart: [0.5, 0, 0.75, 0],
    easeOutQuart: [0.25, 1, 0.5, 1],
    easeInOutQuart: [0.76, 0, 0.24, 1],
    easeInQuint: [0.64, 0, 0.78, 0],
    easeOutQuint: [0.22, 1, 0.36, 1],
    easeInOutQuint: [0.83, 0, 0.17, 1],
    easeInExpo: [0.7, 0, 0.84, 0],
    easeOutExpo: [0.16, 1, 0.3, 1],
    easeInOutExpo: [0.87, 0, 0.13, 1],
    easeInCirc: [0.55, 0, 1, 0.45],
    easeOutCirc: [0, 0.55, 0.45, 1],
    easeInOutCirc: [0.85, 0, 0.15, 1],
    easeInBack: [0.36, 0, 0.66, -0.56],
    easeOutBack: [0.34, 1.56, 0.64, 1],
    easeInOutBack: [0.68, -0.6, 0.32, 1.6]
  },
  im = Object.assign({}, { linear: em }, SE)
function CE([r, t, e, i]) {
  const s = (c, u) => 1 - 3 * u + 3 * c,
    n = (c, u) => 3 * u - 6 * c,
    o = (c) => 3 * c,
    a = (c, u, d) => ((s(u, d) * c + n(u, d)) * c + o(u)) * c,
    h = (c, u, d) => 3 * s(u, d) * c * c + 2 * n(u, d) * c + o(u),
    l = (c) => {
      let u = c
      for (let d = 0; d < 4; ++d) {
        const f = h(u, r, e)
        if (f === 0) return u
        const p = a(u, r, e) - c
        u -= p / f
      }
      return u
    }
  return (c) => (r === t && e === i ? c : a(l(c), t, i))
}
function qu(r, t, e) {
  return r + e * (t - r)
}
function La(r) {
  return (typeof r == 'number' ? [r] : r) || []
}
function IE(r, t, e, i = {}) {
  var s, n
  const o = oe(t),
    a = oe(e),
    h = La(o),
    l = La(a),
    c = (s = oe(i.duration)) != null ? s : 1e3,
    u = Date.now(),
    d = Date.now() + c,
    f = typeof i.transition == 'function' ? i.transition : (n = oe(i.transition)) != null ? n : em,
    p = typeof f == 'function' ? f : CE(f)
  return new Promise((m) => {
    r.value = o
    const g = () => {
      var A
      if ((A = i.abort) != null && A.call(i)) {
        m()
        return
      }
      const x = Date.now(),
        _ = p((x - u) / c),
        v = La(r.value).map((S, C) => qu(h[C], l[C], _))
      Array.isArray(r.value)
        ? (r.value = v.map((S, C) => {
            var I, T
            return qu((I = h[C]) != null ? I : 0, (T = l[C]) != null ? T : 0, _)
          }))
        : typeof r.value == 'number' && (r.value = v[0]),
        x < d ? requestAnimationFrame(g) : ((r.value = a), m())
    }
    g()
  })
}
function sm(r, t = {}) {
  let e = 0
  const i = () => {
      const n = oe(r)
      return typeof n == 'number' ? n : n.map(oe)
    },
    s = kt(i())
  return (
    Se(
      i,
      async (n) => {
        var o, a
        if (oe(t.disabled)) return
        const h = ++e
        if ((t.delay && (await mE(oe(t.delay))), h !== e)) return
        const l = Array.isArray(n) ? n.map(oe) : oe(n)
        ;(o = t.onStarted) == null || o.call(t),
          await IE(s, s.value, l, {
            ...t,
            abort: () => {
              var c
              return h !== e || ((c = t.abort) == null ? void 0 : c.call(t))
            }
          }),
          (a = t.onFinished) == null || a.call(t)
      },
      { deep: !0 }
    ),
    Se(
      () => oe(t.disabled),
      (n) => {
        n && (e++, (s.value = i()))
      }
    ),
    Ys(() => {
      e++
    }),
    ir(() => (oe(t.disabled) ? i() : s.value))
  )
}
var zh = Symbol('pixi_application')
function RE(r) {
  function t() {
    Tt.shared.add(r)
  }
  function e() {
    Tt.shared.remove(r)
  }
  return _E(t), gE(e), e
}
function PE(r) {
  const t = Hs()
  if (t.pixiAppRef) return t.pixiAppRef
  if (r) return ir(() => Et(r).app)
  const e = kt(ni(zh, kt()))
  return e.value || (ml(zh, e), (t.pixiAppRef = e)), e
}
function Nl(r) {
  const t = r || PE(),
    e = ir(() => {
      var n
      return (n = Et(t)) == null ? void 0 : n.view
    }),
    i = new nt(),
    s = cE(
      () => e.value,
      () => {
        var n
        return ((n = t.value) == null ? void 0 : n.screen) || i
      }
    )
  return TE(e, s.trigger), s
}
function ME([r, t, e, i]) {
  const s = (c, u) => 1 - 3 * u + 3 * c,
    n = (c, u) => 3 * u - 6 * c,
    o = (c) => 3 * c,
    a = (c, u, d) => ((s(u, d) * c + n(u, d)) * c + o(u)) * c,
    h = (c, u, d) => 3 * s(u, d) * c * c + 2 * n(u, d) * c + o(u),
    l = (c) => {
      let u = c
      for (let d = 0; d < 4; ++d) {
        const f = h(u, r, e)
        if (f === 0) return u
        const p = a(u, r, e) - c
        u -= p / f
      }
      return u
    }
  return (c) => (r === t && e === i ? c : a(l(c), t, i))
}
function BE(r) {
  return new Promise((t) => setTimeout(t, r))
}
function FE(r) {
  return r
}
function DE(r, t, e) {
  return r + e * (t - r)
}
function OE(r) {
  try {
    return r()
  } catch {}
}
function Ul() {
  let r, t
  const e = new Promise((i, s) => {
    ;(r = i), (t = s)
  })
  return (
    (e.resolve = (i) => {
      r(i)
    }),
    (e.reject = t),
    e
  )
}
var nm = ['pivot', 'anchor', 'position', 'scale', 'tileScale', 'tilePosition', 'skew', 'tile']
function om(r, t, e) {
  const i = nm.find((s) => t.startsWith(s))
  if (!i) {
    r[t] = e
    return
  }
  switch (t) {
    case i:
      return typeof e == 'object' ? LE(r, i, e) : NE(r, i, e)
    case `${i}X`:
      return Yh(r[i], 'x', e)
    case `${i}Y`:
      return Yh(r[i], 'y', e)
  }
}
function LE(r, t, e) {
  for (const i in e) Yh(r[t], i, e[i])
}
function Yh(r, t, e) {
  r[t] !== void 0 && Reflect.set(r, t, e)
}
function NE(r, t, e) {
  r[t].set(e, e)
}
function UE(r, t) {
  const e = ['delay', 'duration', 'ease']
  for (const i of t) {
    const s = Object.keys(i).filter((n) => !e.includes(n))
    for (const n of s) om(r, n, i[n])
  }
}
function kE(r, t) {
  const e = nm.find((i) => t.startsWith(i))
  if (!e) return r[t]
  switch (t) {
    case e:
      return r[e].x || r[e].y
    case `${e}X`:
      return r[e].x
    case `${e}Y`:
      return r[e].y
  }
}
async function Ri(r, t, e) {
  const i = `on${e[0].toLocaleUpperCase()}${e.slice(1)}`,
    s = t[e] || t[i],
    n = r.filters || []
  if (s) {
    if (Al(s)) {
      s(r)
      return
    }
    n.forEach((o) => Ri(o, o, e)), UE(r, tf(s))
  }
}
async function Qh(r, t, e, i, s) {
  var n
  const o = `on${e[0].toLocaleUpperCase()}${e.slice(1)}`,
    a = t[e] || t[o]
  for (const d of r.filters || []) Qh(d, d, e, u_)
  if (!a) return
  s = s || ((n = r._v_t_context) != null ? n : (r._v_t_context = { id: 0, time: 0 }))
  const h = ++s.id,
    l = () => h !== s.id
  if (Al(a)) return e === 'enter' ? HE(a(r, i), i, l, s) : VE(a(r, i), i, l, s)
  const u = tf(a)
    .filter(Boolean)
    .map((d) => {
      var f, p
      const m = t.duration || d.duration
      return GE(r, (p = (f = XE(m)) == null ? void 0 : f[e]) != null ? p : 1e3, d, l)
    })
  await Promise.all(u), i()
}
async function GE(r, t, e, i) {
  var s
  e.delay && (await BE(e.delay))
  const n = ['delay', 'duration', 'ease'],
    o = Object.keys(e).filter((u) => !n.includes(u)),
    a = Date.now(),
    h = Date.now() + t
  ;(s = e.ease) != null || (e.ease = FE)
  const l = Al(e.ease) ? e.ease : ME(e.ease)
  function c(u) {
    const d = kE(r, u),
      f = Number(e[u]),
      p = Ul()
    if (isNaN(f) || d_(d)) throw new Error(`Transition - {${u}} not valid field`)
    function m() {
      if (i != null && i()) return p.resolve()
      const g = Date.now(),
        A = l((g - a) / t)
      OE(() => om(r, u, DE(d, f, A))), g > h && p.resolve()
    }
    return Tt.shared.add(m), p.then(() => Tt.shared.remove(m)), p
  }
  await Promise.all(o.map(c))
}
async function HE(r, t, e, i) {
  if (!r) return
  const { duration: s, tick: n } = r,
    o = Date.now() - i.time,
    a = Date.now() + s - i.time,
    h = Ul()
  function l() {
    if (e()) return h.resolve()
    const c = Date.now(),
      u = (c - o) / s
    ;(i.time = c - o), n(u), a > c ? requestAnimationFrame(l) : h.resolve()
  }
  return l(), Tt.shared.add(l), h.then(() => Tt.shared.remove(l)), h.then(() => t()), h
}
async function VE(r, t, e, i) {
  if (!r) return
  const { duration: s, tick: n } = r,
    o = Date.now() + s,
    a = Ul()
  function h() {
    if (e != null && e()) return a.resolve()
    const l = Date.now(),
      c = (o - l) / s
    ;(i.time = o - l), n(c), o > l ? requestAnimationFrame(h) : a.resolve()
  }
  return Tt.shared.add(h), a.then(() => Tt.shared.remove(h)), a.then(() => t()), a
}
function XE(r) {
  if (r == null) return null
  if (rf(r)) return r
  {
    const t = Number(r)
    return { enter: t, leave: t }
  }
}
var jE = {
    duration: [Number, Object],
    beforeEnter: [Function, Object, Array],
    enter: [Function, Object, Array],
    afterEnter: [Function, Object, Array],
    enterCancelled: [Function, Object, Array],
    beforeLeave: [Function, Object, Array],
    leave: [Function, Object, Array],
    afterLeave: [Function, Object, Array],
    onBeforeEnter: Function,
    onEnter: Function,
    onAfterEnter: Function,
    onEnterCancelled: Function,
    onBeforeLeave: Function,
    onLeave: Function,
    onAfterLeave: Function,
    appear: Boolean
  },
  WE = xe({
    name: 'PTransition',
    props: jE,
    setup(r, { slots: t }) {
      const e = $E(r, { id: 0, time: 0 })
      return () => h_(vg, e, t)
    }
  })
function $E(r, t) {
  function e(l) {
    Ri(l, r, 'beforeEnter')
  }
  function i(l, c) {
    Qh(l, r, 'enter', c, t)
  }
  function s(l) {
    Ri(l, r, 'afterEnter')
  }
  function n(l) {
    Ri(l, r, 'afterEnter')
  }
  function o(l) {
    Ri(l, r, 'beforeLeave')
  }
  async function a(l, c) {
    Qh(l, r, 'leave', c, t)
  }
  function h(l) {
    Ri(l, r, 'afterLeave')
  }
  return {
    css: !1,
    onBeforeEnter: e,
    onEnter: i,
    onAfterEnter: s,
    onEnterCancelled: n,
    onBeforeLeave: o,
    onLeave: a,
    onAfterLeave: h,
    appear: r.appear
  }
}
const zE = ['x', 'y', 'scale'],
  YE = ['mask'],
  QE = xe({
    __name: 'Main',
    setup(r) {
      const t = Nl(),
        e = ir(() => {
          const { width: o, height: a } = t.value
          return Math.min(o / 640, a / 480)
        }),
        i = ir(() => (t.value, { x: 0, y: 0 })),
        s = kt()
      function n(o) {
        o.beginFill(16711680, 0.5).drawRect(0, 0, 900, 480).endFill()
      }
      return (o, a) => (
        Gt(),
        fe(
          'container',
          { x: i.value.x, y: i.value.y, scale: e.value },
          [
            rr('graphics', { ref_key: 'mask', ref: s, 'is-mask': '', onDraw: n }, null, 544),
            rr('container', { mask: s.value }, [Ld(o.$slots, 'default')], 8, YE)
          ],
          8,
          zE
        )
      )
    }
  }),
  KE = '/pixijs-ubt-project/assets/background-day-472c806b.png'
function kl(r = 1) {
  const t = kt(0)
  function e(i) {
    t.value += i * 3.5 * r
  }
  return Tt.shared.add(e), Ys(() => Tt.shared.remove(e)), t
}
const qE = ['tile-position-x', 'width', 'texture', 'texture-options'],
  ZE = ['blur'],
  JE = xe({
    __name: 'Background',
    props: { blur: { type: Boolean } },
    setup(r) {
      const t = r,
        e = kl(0.25),
        i = Nl(),
        s = sm(() => (t.blur ? 20 : 0), { transition: im.easeOutQuad, duration: 350 })
      return (n, o) => (
        Gt(),
        fe(
          'tiling-sprite',
          {
            'tile-position-x': Et(e),
            width: Et(i).width * 2,
            height: 480,
            texture: Et(KE),
            'texture-options': { scaleMode: Et(Qt).NEAREST }
          },
          [rr('blur-filter', { strength: 10, blur: Et(s) }, null, 8, ZE)],
          8,
          qE
        )
      )
    }
  }),
  tT =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAVAAAABwBAMAAAC6HTVoAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAGFBMVEVUOEfk/Ytzvy6c5llVgCLXqEze2JX////FcUEnAAAAAWJLR0QHFmGI6wAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAAd0SU1FB+MDDAACE+f6JbgAAACmSURBVHja7c5BCQIBAAVRK1jBClawghXsH0HYu7AHYefDm9Mc3+2mP3cfaQf6OHoelX8M2vH8/C1oyPPzp6BXG079EvRyw6kfgl5vOPU70IDh1O9AXyPtQN8j7UA/I4GC1gMFrQcKWg8UtB4oaD1Q0HqgoPVAQeuBgtYDBa0HCloPFLQeKGg9UNB6oKD1QEHrgYLWAwWtBwpaDxS0HihoPVDQejPQL4Py73DUmV51AAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE5LTAzLTExVDE4OjAyOjE5KzA2OjAw4So5wwAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxOS0wMy0xMVQxODowMjoxOSswNjowMJB3gX8AAAAASUVORK5CYII=',
  eT = ['texture', 'texture-options', 'tile-position-x', 'width'],
  rT = xe({
    __name: 'Ground',
    setup(r) {
      const t = kl(0.25),
        e = Nl()
      return (i, s) => (
        Gt(),
        fe(
          'tiling-sprite',
          {
            texture: Et(tT),
            'texture-options': { scaleMode: Et(Qt).NEAREST },
            'tile-position-x': Et(t),
            width: Et(e).width * 2,
            height: 112,
            y: 390
          },
          null,
          8,
          eT
        )
      )
    }
  }),
  iT = xe({
    __name: 'AlphaTransition',
    setup(r) {
      return (t, e) => (
        Gt(),
        oi(
          Et(WE),
          { duration: 300, 'before-enter': { alpha: 0 }, enter: { alpha: 1 }, leave: { alpha: 0 } },
          { default: Wn(() => [Ld(t.$slots, 'default')]), _: 3 }
        )
      )
    }
  })
function am(r) {
  const t = wE(r)
  return sm(() => (t.value ? 1.1 : 1), { transition: im.easeOutBack, duration: 150 })
}
function hm(r = 2, t = 10) {
  const e = kt(0),
    i = ir(() => Math.cos((e.value / 1e3) * r) * t)
  return EE(({ delta: s }) => (e.value += s)), i
}
const sT =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMAAAAAqBAMAAAAXLUnQAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAAAMFBMVEX///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABUOEdUOEf////8oEjkYBjLZMaeAAAADHRSTlMAAAQCBgMHAQgFC/yb7hewAAAAAWJLR0QAiAUdSAAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB+MDDAACE+f6JbgAAAGWSURBVEjH1ZfBbcMwDEW1QpAFAk3QoEAXaAZID5kggNFrT5qgQI69ZoWuUq6gFbSCKlsSSclW6rQ10/6DTVv8fBGtOIpSSgNqNSHVq74OSha9XV2UEgCAzboGkF3wuDRg90Rj60OvbWkPmS7qEoB6iPWjx8IRU03KMr8L6PIU1nriubD6lwBATSzqD4RX039kYx4w62gagJdvAU5nHTqvzx1mdfqQdB9SHQGaooZkwJSLst7xnhTA97K0YEsBsHXAAD6WIxETrVKAOsNx8YHgIEB9sCODOMBNAsg5ONqAsUEQUNb5AcDfFOAaAF7kK0BZ6RYAX0bs+lpA/O7KA+p51uj5gPJV8RcAbhaAmfjr+n8CPnan527RGcx5XDxM667l8ixLCHBX/3xXUxyFcd01XN6yLFmAx1TfBHi27kpXakxfn7ISYC8EwFwW1YBhJLWncOXGhDNgFpQtWg6wwdwoSxEeUjiMMAC6LJ4h3RuCuKL3SwM25Z8h29w65hEGoA097hHzPchjYgAFs6U4YWIo79iT3iQAn8mLTAIWG8M1AAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE5LTAzLTExVDE4OjAyOjE5KzA2OjAw4So5wwAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxOS0wMy0xMVQxODowMjoxOSswNjowMJB3gX8AAAAASUVORK5CYII=',
  nT =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAkAgMAAADuoRK9AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAAADFBMVEX///8UGBz////////2m4G3AAAAAXRSTlMAQObYZgAAAAFiS0dEAxEMTPIAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAAHdElNRQfjAwsXHjuwhl1TAAAAIklEQVQI12MIBYEABigVtQoIQsmhltKcIs9lYI/BKVZkCgAfh283T0bg2QAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxOS0wMy0xMVQxODozMDo1OSswNTowMOrCLusAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTktMDMtMTFUMTg6MzA6NTkrMDU6MDCbn5ZXAAAAAElFTkSuQmCC',
  oT =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAkAgMAAAD9dlJJAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAAACVBMVEX///8UGBz///+s9/umAAAAAXRSTlMAQObYZgAAAAFiS0dEAIgFHUgAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAAHdElNRQfjAwwAAhPn+iW4AAAAIklEQVQI12MIDQ0NYAATUatWhRJDhMIJVnoQQLdBCAYYAQB5FjxRWzkKdgAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxOS0wMy0xMVQxODowMjoxOSswNjowMOEqOcMAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTktMDMtMTFUMTg6MDI6MTkrMDY6MDCQd4F/AAAAAElFTkSuQmCC',
  aT =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAkAgMAAADuoRK9AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAAACVBMVEX///8UGBz///+s9/umAAAAAXRSTlMAQObYZgAAAAFiS0dEAIgFHUgAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAAHdElNRQfjAwwAAhPn+iW4AAAAK0lEQVQI12MIBYEABigVtQoIQkmngJqRKHJNQaeWAs1DUGS7DKQdSrEiUwDYIGzBlB1c5gAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxOS0wMy0xMVQxODowMjoxOSswNjowMOEqOcMAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTktMDMtMTFUMTg6MDI6MTkrMDY6MDCQd4F/AAAAAElFTkSuQmCC',
  hT =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAkAgMAAADuoRK9AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAAACVBMVEX///8UGBz///+s9/umAAAAAXRSTlMAQObYZgAAAAFiS0dEAIgFHUgAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAAHdElNRQfjAwwAAhPn+iW4AAAAJUlEQVQI12MIBYEABigVtQoIQkmngJqRKHJNoYWZYI/BKVZkCgDVZGzBQwBU9wAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxOS0wMy0xMVQxODowMjoxOSswNjowMOEqOcMAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTktMDMtMTFUMTg6MDI6MTkrMDY6MDCQd4F/AAAAAElFTkSuQmCC',
  lT =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAkAgMAAADuoRK9AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAAACVBMVEX///8UGBz///+s9/umAAAAAXRSTlMAQObYZgAAAAFiS0dEAIgFHUgAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAAHdElNRQfjAwwAAhPn+iW4AAAALElEQVQI12MIBYEABigVtWrpqlWh9KRWkUUBHYtEsaJQDAysqBRQFYJiQFAAnyJlLafRQSwAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTktMDMtMTFUMTg6MDI6MTkrMDY6MDDhKjnDAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE5LTAzLTExVDE4OjAyOjE5KzA2OjAwkHeBfwAAAABJRU5ErkJggg==',
  cT =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAkAgMAAADuoRK9AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAAACVBMVEX///8UGBz///+s9/umAAAAAXRSTlMAQObYZgAAAAFiS0dEAIgFHUgAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAAHdElNRQfjAwwAAhPn+iW4AAAAK0lEQVQI12MIBYEABigVtQoIQsmhlgL1IyhyTUGmgCYhURSYAnISlGJFpgDYIGzBC9eWKwAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxOS0wMy0xMVQxODowMjoxOSswNjowMOEqOcMAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTktMDMtMTFUMTg6MDI6MTkrMDY6MDCQd4F/AAAAAElFTkSuQmCC',
  uT =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAkAgMAAADuoRK9AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAAACVBMVEX///8UGBz///+s9/umAAAAAXRSTlMAQObYZgAAAAFiS0dEAIgFHUgAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAAHdElNRQfjAwwAAhPn+iW4AAAAKklEQVQI12MIBYEABigVtQoIQsmhlgL1IyhyTUEzE4UizxSwx+AUKzIFAFJzbhWTyvl8AAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE5LTAzLTExVDE4OjAyOjE5KzA2OjAw4So5wwAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxOS0wMy0xMVQxODowMjoxOSswNjowMJB3gX8AAAAASUVORK5CYII=',
  dT =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAkAgMAAADuoRK9AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAAACVBMVEX///8UGBz///+s9/umAAAAAXRSTlMAQObYZgAAAAFiS0dEAIgFHUgAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAAHdElNRQfjAwwAAhPn+iW4AAAAK0lEQVQI12MIBYEABigVtQoIQsmhlpJFAS1FolhRKAYGVupQQNMRFAOCAgBQZlgNPvKb5wAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxOS0wMy0xMVQxODowMjoxOSswNjowMOEqOcMAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTktMDMtMTFUMTg6MDI6MTkrMDY6MDCQd4F/AAAAAElFTkSuQmCC',
  fT =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAkAgMAAADuoRK9AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAAACVBMVEX///8UGBz///+s9/umAAAAAXRSTlMAQObYZgAAAAFiS0dEAIgFHUgAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAAHdElNRQfjAwwAAhPn+iW4AAAAJElEQVQI12MIBYEABigVtQoIQsmhlqJQ5JpCfTPBHoNTrMgUADmab2ktBquqAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE5LTAzLTExVDE4OjAyOjE5KzA2OjAw4So5wwAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxOS0wMy0xMVQxODowMjoxOSswNjowMJB3gX8AAAAASUVORK5CYII=',
  pT =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAkAgMAAADuoRK9AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAAACVBMVEX///8UGBz///+s9/umAAAAAXRSTlMAQObYZgAAAAFiS0dEAIgFHUgAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAAHdElNRQfjAwwAAhPn+iW4AAAAKUlEQVQI12MIBYEABigVtQoIQsmhlqJQ5JqCTAEdhERRYAoQwChWZAoAv0duFRKLYEcAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTktMDMtMTFUMTg6MDI6MTkrMDY6MDDhKjnDAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE5LTAzLTExVDE4OjAyOjE5KzA2OjAwkHeBfwAAAABJRU5ErkJggg==',
  mT = ['x'],
  gT = ['texture', 'x', 'y', 'scale'],
  lm = xe({
    __name: 'Score',
    props: { score: {}, scale: {}, x: { default: 0 }, y: { default: 0 } },
    setup(r) {
      const t = [nT, oT, aT, hT, lT, cT, uT, dT, fT, pT].map((e) =>
        X.from(e, { scaleMode: Qt.NEAREST })
      )
      return (e, i) => (
        Gt(),
        fe(
          'container',
          { x: e.x, y: 0 },
          [
            (Gt(!0),
            fe(
              ce,
              null,
              Od(
                e.score.toString().split(''),
                (s, n) => (
                  Gt(),
                  fe(
                    'sprite',
                    {
                      key: n,
                      texture: Et(t)[+s],
                      x: n * 24,
                      anchor: 0.5,
                      y: e.y,
                      scale: e.scale || 1
                    },
                    null,
                    8,
                    gT
                  )
                )
              ),
              128
            ))
          ],
          8,
          mT
        )
      )
    }
  }),
  _T = ['y', 'texture', 'scale'],
  yT = xe({
    __name: 'GameOver',
    emits: ['restart'],
    setup(r, { emit: t }) {
      const e = t,
        i = ni('score'),
        s = X.from(sT, { scaleMode: Qt.NEAREST }),
        n = kt(),
        o = hm(),
        a = am(n)
      return (h, l) => (
        Gt(),
        fe('container', null, [
          rr(
            'container',
            {
              ref_key: 'containerRef',
              ref: n,
              'event-mode': 'static',
              x: 320,
              y: 180,
              scale: 1.35,
              onClick: l[0] || (l[0] = (c) => e('restart'))
            },
            [rr('sprite', { y: Et(o), texture: Et(s), anchor: 0.5, scale: Et(a) }, null, 8, _T)],
            512
          ),
          Ot(lm, { x: 320, y: 480 / 2 + 30, score: Et(i), scale: 1.5 }, null, 8, ['score'])
        ])
      )
    }
  }),
  AT =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALgAAAELBAMAAACYNFGbAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAAAJFBMVEUAAAD///8AAAAAAABUOEf6+vr///9Y2FgAqEjW1tZSN0X/KQ3vFycuAAAABHRSTlMAAAEVx1WzMAAAAAFiS0dEAf8CLd4AAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfjAwwAAhPn+iW4AAAE9klEQVR42u3bTW6cMBQAYFKhrmHTdZUr9AIsmJGyn+xTKbI0zQFyBQ4wqjS7niKbXK749/n5BzwZbB4SVjsD9vM34RmDybRVNZa6h9JVSaWeCq/tppx4fXjm5cTfTqm47BOOry0pJ27ivoIHOxTCIexLeKgHQdw6ZwH3T8mS+EnHj1X2lBK9atg6mB/CeekgqjZSCdxKCzoz+cfqGr0VxnVQh6ZXSbxHu8+4qsdkoJsVXBrHnUJbQfzgx9LH0ZxaGU99cX+mk56Jh3I4TP87cAehh8dzyK9axfHJ62kqjpE1cOjuboUmi4/LemK4ubTSw6dvFl1tn7LQCnjgZlEKdw/cqlHrjIPfap18Jjo/jtc+nVkTqc/SCwq1ZlMjdjKLJmsN1aElX3HctCqyM/nqKh9Hq78OrVaz45PLezzkgJ9SHymp4ffamXF/yCt3Z3v4vfZi+EMLpbmtSxNvbPLjtn0rHowvhSP7ZjzUoRCO7dvxQA+CuBMb67YW7g3wg7sVxB/c/sVxD4Aav80PsqIL48uVHd/xHSeGN+5NpADeLPEpTbXjO251mAwijM9E4TlZGp9cWgSuFnZ8g5Z8xfH4+g73bf3wBq1Ws+PTy2X08ald58uK+H32iniqjYe/WR9PTkpWvI3gqjHZoYG3C+Gtj49vhXDYJojD76hbt6pFzVHECTC7mfGe6WLhuqJF7VEct5vdvPi49S4Lg1z0TFa0Zpvv8t6h/HzT4T/xbl4cbI7rZARxrveh/GTFH3X4I96toOu4Jz6I62HcirBOuP7bLx2uy4L44ww+8MJUhsTR62iND7LFRFTmDAUNyp34Yzpu1ak99Q6DKytgaPU2602481IQh4GDEcQ4RNg/id2rOG5ehll8QAmyt9bF2SzuJuidFD6IYx/nVY+nfyyFAxncn0TBA59+KYyrcfQuXOLgkz9GXAfp4ANLwN9VPhkrjssjCg2ovkSJiGAyVsDhUGWDrg3ikcvzWD/YdflxOJhBj2Kva/GFi0GE20t96DAMBXE4GLHF5EJUO84NWkV4vWQwvlVnxkXcoBdFg7zKtrpW4mILR7i9ZHCvcTX98+L2Ywk8q1gPLtBuR7i95MJOn8GhZ6LlcetZEJ4PTW2g3X2CtIq6PrDQc2gGfLmiVts6tZvC5cmpMrsp3DqZt4Xb5/KmcKdEfjMFLXYIJbyaLUTxeTuQr/XxG+Ud38sqJWVYvjyAGfGkPgmnnneGNlGtFreZLtb84J/sNPC6PzL2emSv3cbw+sjO18voR3WieH08X6/Xy9PfMTMRnSZeP12vm8aFzraF84nPP+ASvwSQxGuejfPlaUyLzE63GVxMe27nSEtm/CwyItNy2Qpey/9iJt34nY4mLt4mb88kca3PFIo4z8i8TxBPywpFfMxKCk8RTys7vuN2mZ5NhPH6+NptEucroz//NoiLJR2bSAxZXOhTI7rjGfA8y7kC+FzZ8R3f8XXxza5bqOM/mFNeDKz/ivLdjfu9Ov72icvHi5UTsL0wAvgHY2+fH+IvewMdFW7jOAr454f6I99Bh4ddmRQURxJXem2+x1GjSRMfZ8WbGlBzMsI3UJAWE0cGV4f7aY+n9d2Z0FEcCTw4/SVulqLLXluWwcOXXPWdJaz/l7yeL4PHbnPjw7nAc3wfmhtXh7/jxXD5HdomcaWfL9vD5ZfFMZs2PvlvUArj/wEj2ar5d6+97gAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxOS0wMy0xMVQxODowMjoxOSswNjowMOEqOcMAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTktMDMtMTFUMTg6MDI6MTkrMDY6MDCQd4F/AAAAAElFTkSuQmCC',
  vT = ['y', 'texture', 'scale'],
  xT = xe({
    __name: 'GameMenu',
    emits: ['start'],
    setup(r, { emit: t }) {
      const e = t,
        i = X.from(AT, { scaleMode: Qt.NEAREST }),
        s = kt(),
        n = hm(),
        o = am(s)
      return (a, h) => (
        Gt(),
        fe(
          'container',
          {
            ref_key: 'containerRef',
            ref: s,
            x: 320,
            y: 180,
            scale: 1.35,
            onClick: h[0] || (h[0] = (l) => e('start'))
          },
          [
            rr(
              'tiling-sprite',
              {
                y: Et(n),
                texture: Et(i),
                width: 184,
                height: 60,
                anchor: 0.5,
                scale: Et(o),
                'tile-position': { x: 0, y: -1 }
              },
              null,
              8,
              vT
            )
          ],
          512
        )
      )
    }
  }),
  bT = '/pixijs-ubt-project/assets/die-6bd4fcd5.ogg',
  ET = Object.freeze(
    Object.defineProperty({ __proto__: null, default: bT }, Symbol.toStringTag, { value: 'Module' })
  ),
  TT = '/pixijs-ubt-project/assets/hit-fe72b3d1.ogg',
  wT = Object.freeze(
    Object.defineProperty({ __proto__: null, default: TT }, Symbol.toStringTag, { value: 'Module' })
  ),
  ST = '/pixijs-ubt-project/assets/point-72f06290.ogg',
  CT = Object.freeze(
    Object.defineProperty({ __proto__: null, default: ST }, Symbol.toStringTag, { value: 'Module' })
  ),
  IT = '/pixijs-ubt-project/assets/swoosh-7b45a189.ogg',
  RT = Object.freeze(
    Object.defineProperty({ __proto__: null, default: IT }, Symbol.toStringTag, { value: 'Module' })
  ),
  PT = '/pixijs-ubt-project/assets/wing-b24398c3.ogg',
  MT = Object.freeze(
    Object.defineProperty({ __proto__: null, default: PT }, Symbol.toStringTag, { value: 'Module' })
  ),
  cm = (r, t = 3, e) => {
    fetch(r)
      .then(e)
      .catch(() => {
        t && cm(r, t - 1)
      })
  },
  BT = { isDecoded: !1, isPlaying: !1, hasStarted: !1, source: null, gainNode: null },
  FT = () => {
    const r = {}
    return {
      listener(t, e) {
        r[t] = e
      },
      emit(t, e) {
        var i
        ;(i = r[t]) == null || i.call(r, e)
      }
    }
  },
  Zu = (r, t) => (r.state === 'suspended' ? r.resume().then(() => t.start(0)) : t.start(0)),
  os = ({ file: r, volume: t = 1, autoPlay: e = !1, loop: i = !1, preload: s = !1 }) => {
    const n = (() => {
        const c = window.AudioContext || window.webkitAudioContext
        return (
          c ||
            ((u) => {
              throw new Error(
                "`ts-audio`: Your browser doesn't support AudioContext - https://bit.ly/2YWmpnX"
              )
            })(),
          new c()
        )
      })(),
      o = { ...BT },
      a = FT(),
      h = ((c, u) => ({
        ready(d) {
          c.listener('decoded', d)
        },
        start(d) {
          c.listener('start', d)
        },
        end(d) {
          c.listener('end', d)
        },
        state(d) {
          u && (u.onstatechange = () => d({ data: u.state }))
        }
      }))(a, n)
    s && cm(r)
    const l = {
      play() {
        if (o.hasStarted) return n.resume(), void (o.isPlaying = !0)
        ;((u, d, f, p) => {
          const m = (p.source = u.createBufferSource()),
            g = (p.gainNode = u.createGain())
          ;(g.gain.value = d),
            g.connect(u.destination),
            m.connect(g),
            (m.onended = () => {
              ;(p.hasStarted = !1), (p.isPlaying = !1), f.emit('end', { data: null })
            })
        })(n, t, a, o)
        const { source: c } = o
        c &&
          (((u) => {
            ;(o.isDecoded = !1),
              ((d) =>
                fetch(d).then((f) => {
                  if (!f.ok) throw new Error(`HTTP error, status = ${f.status}`)
                  return f.arrayBuffer()
                }))(r)
                .then((d) =>
                  ((f, p, m, g, A, x, _) => {
                    f.decodeAudioData(
                      m,
                      (v) => {
                        ;(p.buffer = v),
                          (p.loop = A),
                          (x.isDecoded = !0),
                          _.emit('decoded', { data: v }),
                          g && (p.start(0), (x.isPlaying = !0))
                      },
                      console.error
                    )
                  })(n, u, d, e, i, o, a)
                )
                .catch(console.error)
          })(c),
          o.isDecoded ? Zu(n, c) : a.listener('decoded', () => Zu(n, c)),
          (o.hasStarted = !0),
          (o.isPlaying = !0),
          a.emit('start', { data: null }))
      },
      pause() {
        n.suspend(), (o.isPlaying = !1)
      },
      toggle() {
        o.isPlaying ? l.pause() : l.play()
      },
      stop() {
        var c
        o.hasStarted && ((c = o.source) == null || c.stop(0), (o.isPlaying = !1))
      },
      on(c, u) {
        var d
        ;(d = h[c]) == null || d.call(h, u)
      },
      get volume() {
        var c
        return ((c = o.gainNode) == null ? void 0 : c.gain.value) ?? 0
      },
      set volume(c) {
        o.gainNode && (o.gainNode.gain.value = c)
      },
      get loop() {
        var c
        return ((c = o.source) == null ? void 0 : c.loop) ?? !1
      },
      set loop(c) {
        o.source && (o.source.loop = c)
      },
      get state() {
        return n.state
      },
      get audioCtx() {
        return n
      }
    }
    return l
  },
  Ju = Object.assign({
    '../pixijs-ubt-project/assets/audio/die.ogg': ET,
    '../pixijs-ubt-project/assets/audio/hit.ogg': wT,
    '../pixijs-ubt-project/assets/audio/point.ogg': CT,
    '../pixijs-ubt-project/assets/audio/swoosh.ogg': RT,
    '../pixijs-ubt-project/assets/audio/wing.ogg': MT
  }),
  ri = {}
for (const r of Object.keys(Ju)) {
  const t = Ju[r],
    e = r.replace('../pixijs-ubt-project/assets/audio/', '').replace('.ogg', '')
  delete ri[r], (ri[e] = t.default)
}
const Cs = {
    die: os({ file: ri.die }),
    hit: os({ file: ri.hit }),
    point: os({ file: ri.point }),
    swoosh: os({ file: ri.swoosh }),
    wing: os({ file: ri.wing })
  },
  DT =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAFACAMAAADEYq+6AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAABmFBMVEX///9UOEfA3XHK5XfS7H3Z84Pf+Ifk/Yvf+YfY9IPS7X221WqszGKiw1qXulKNsUuDqER5nz1wmDZokC9giipahCZVgCLR7X3Y84Pf+YjZ9IPR7X7J5Xe21WmixFuYulOCqER5oDxwlzVnkS9hiSpahCXR7H3J5nfA3nGhw1pvlzZokDBhiipahSbZ9ILA3nC31WqNsEvJ5njA3XChw1uYulJwmDVnkDBgiSrg+Ifg+YfZ84LS7X6XulOCqEN5oD1wlzbf+IjJ5XiCp0NvmDZahSWEqkWVuFGlxl2002jE4XPc9oXD4XO102ikxl2Ut1B1nTpokTBdhyiFqUWVt1C11Gjc9obQ7H3D4HOkxVyUuFF2nDlpkTClxVzQ7Hy01GiEqUV2nDpehyiFqkWkxly01GnE4HN1nDpokTGEqUTR7Hy11Gl2nTqUt1Glxlzb9oXb9YXD4XTE4XReiCiFqUTc9YVdiCiVt1HQ7X1pkTG002mlxV2VuFCFqkTR7XyUuFCEqkRpkDC102nD4HSkxV3E4HRWgCL///9KJL3/AAAAAXRSTlMAQObYZgAAAAFiS0dEAIgFHUgAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAAHdElNRQfjAwwAAhPn+iW4AAAHIklEQVR42u2Z+1cSWxTHuyqipKm9xkdlWmFF7/fDsufwHMAGhBmFwRhAQMZHGCUaFubf3frec2cN1Az3cmTd1modfvaz1naf7977u/cc+Yvid4QS6urq7u7psdl6e+32vr7+fofDZuvp6e7u6jp6dGBgcPDYsaGh4eGRkePHT5w4efLUKXrI4ejv7+uz23t7W//x6X9+9BDHjY4itLGx8fGJiTNnurrOnh0YOHducnJo6Pz5qanp6QsXLl68dOnw0MQECa+vz2ZzOmdmLl9GeFeuABoenpq6etXlunbt+vXDQ3q6e3tv3AB08+atW0jE5OTt24CmpwH9FB4VxHH6w46POxx37ty9i/Du3bt/H4kYGXnw4OHDR49+STkFBNk8fmy3P3ny9Ons7MyM/rjPng0NPX8+N/fihctloggKyOkcHUXKX7602RyOV6/I4w4O6uER6KeUU0Gzszbb2BgSMTo6OwsZGYJ9/Xpu7s0bQG/fHh463eaPHvq/utGRNgP8G6GGeN7t9ni8Xp/P6fT77Xa/3+kMBAQhGAyFeD4cnp9/964zkChGIh5PNKpDCwuxWDzu9UqSLIvi4uLSUqcghJdIeL2BQDK5sIDwYjGfT1E8nlAolVpenp9//74zUDoty6qayWSzjYnweoPBSCSdzuVWVkzCo4Ly+UhEkhQlECgUCJRMxuPFoqrKMs+vrpqmnApCeIlENBoIxGJ6eNms15tI4HEXFy3/p7Yhni+VJEkQslkDCgSKRU2T5Xw+l7PQHhUUCgWDgJzOtTW7fX0djxuNQrCiaJEIKiiVApTJbGwQaG2N4yBYj8ft5nnIqFMQSkOSUBqxGCAkYnMzGvV4IhFRzOVcLhPBUkH5PMLzeuNxQ7DxuCAkEpFIC+1RQKIYCkkSoMbHFQQkAuHNz3/40DkoGFQUvQjX1tBYEF4olE5bppwCKpfd7mAwGtWhrS2nE41F0zoN8TyKUBB8Po7TE+HzZTKqisaClH/82CmINEu9NEjKURqynEq1mBptQ+VyKKRpREZbW4aMJAmCDYdNBwAVlE5j1CgKIFKEhQLKHTIqlxGe6QCggEQRKUdb1mWElBeLuoyWljoFYQAgPJ8vmTTaMkqjxaCmgkgLM0oDgt3YwPgslfC4Kysm4VFBPF+pqCoES8odicDjEvOBRJhqjwqCzcHjfvqky8jnQ7nLcosipIBIYzGa5cICgYLBUkkULcwHFZRO6zbHaMvZbCZDUr66aiojKkgUkQgyavRmiXLHAMD4dLlMGgsVhEGNlAcCRgsjgsX4BGQx3akgmA+fr1DQWxgGNawbIAsZUUGyDOumP65e7qqK8HK5zkFoljDzjc0ym1UUCJa0ZZPHpYJQ7iQRjZYAZp48rml4VBCxowiPGN/1daPcEd7nz52C0FiamyUxicT4hsMWMqKAUilYgu3tRuMLi12tVir5vKUdpYBEsVJJJDIZGCoiWNicaBRrA8anaXhUUDpdKlWrSDnHGZYARbizY1kaVJAokrUBMjKMr6KoaqlkOQCoIFgCWOzGZon1Do9L2nKnIDwukZE+PpHyTAYDYHfXotwpoUpF0wQBQ2193WiWmlapwGIvLZlYbCoIRVitGoPa7//yBTLStFptby8c/vrVZABQQbu7aGHNjQWjRpLc7lTKYpGkgjCodetGZJRMZrPfvuGIgbZsuhxTQalUJKKqxSISobflel0Q9vfJoLaQERVUqUCw9ToZahjUeFxi5i3GJxWEhR/l/v07GdTEuilKtYrx2eJK0DaUz5dKHs/29uYmx/061JaXTcOjglDusKMwvoDIoN7eRrOEjCxuLFSQLKPcjWMTWVlJEVp2IwqI52u1ahWNxbDYxI4Si23xuFQQ2nKx2HxaIIskRg0J7+Dg8BAeV9OM86Pfz3GBgKJI0s4OWY4tFNE2tLuLFoaUk0TAfNTreFxyAjJdhagg3XwYxhfmA4+LxmJh3SihSKRajUabU+717u/Xas1nrYODw0K1GhZ+3VBhkUTKNQ0trIVg24aIzRGE5lUIMsK5xNJHUEDlMgSrKPW63sIKBRxvMdQsU04F4bSgacbaQB63WJQk2BwItnMQSgPl3nhsgoxwxLAwH1QQWYUwanSI45ByjweCtWwsFBAMlaoSO9p4kEZbxkG6c1BjYyGWoFAgBzQIdnHxX7vRf4aQCKzh9XrzBx4yaiwHNRXkdiO8xk8UsASSVKuhCE1PC1RQKlWrqSoEq5vEQmFjAyaRGCoLm0MBIeXVarG4uakfBXHWwsLvdrecGm1De3uk3I3PLvhwgFFTqVi2MCqI7U9sf/rZfLD9ie1PrEewHsF6BOsR7MbCbizsxsJuLCbaYzcWdmNhNxbTRLAbCz3EXBjb1E7/pk2NaY9p73dpj10J2JXgT+8R7ErArgQHvzwuuxKwKwG7EnQKYlcCdiVohv6oK8EP29Zxi0juY/cAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTktMDMtMTFUMTg6MDI6MTkrMDY6MDDhKjnDAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE5LTAzLTExVDE4OjAyOjE5KzA2OjAwkHeBfwAAAABJRU5ErkJggg==',
  OT = ['x', 'y'],
  LT = ['texture'],
  NT = ['texture'],
  UT = xe({
    __name: 'Pipe',
    props: { x: {}, y: {} },
    setup(r) {
      const t = X.from(DT, { scaleMode: Qt.NEAREST })
      return (e, i) => (
        Gt(),
        fe(
          'container',
          { x: e.x, y: e.y },
          [
            rr(
              'sprite',
              { texture: Et(t), 'anchor-x': 0.5, y: -65, scale: [1.5, -1.5] },
              null,
              8,
              LT
            ),
            rr(
              'sprite',
              { texture: Et(t), 'anchor-x': 0.5, y: 65, scale: [-1.5, 1.5] },
              null,
              8,
              NT
            )
          ],
          8,
          OT
        )
      )
    }
  }),
  kT = xe({
    __name: 'Pipes',
    props: { pipes: {}, offset: {} },
    setup(r) {
      return (t, e) => (
        Gt(),
        fe('container', null, [
          (Gt(!0),
          fe(
            ce,
            null,
            Od(
              t.pipes,
              (i) => (Gt(), oi(UT, { key: i.x, x: i.x - t.offset, y: i.y }, null, 8, ['x', 'y']))
            ),
            128
          ))
        ])
      )
    }
  }),
  GT =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAYBAMAAABtiDI6AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAAAG1BMVEUAAABTOEb8cw/6+vr8OADX5sz4tzPTLwD///9hx+6LAAAAAXRSTlMAQObYZgAAAAFiS0dECIbelXoAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfjAwwAAhPn+iW4AAAAaUlEQVQY043RUQ3AIAwE0Fo4C1jAQi1gAQvY33EDtqyQ7L7oCw0FzBQo9spXgJQScsZZWLsTHgoC1pRCGBQE7n9FdJQe0bxJEG0uJFQFO9H0raGurp0UQqe7aSM6vYnmw0ZZc1v4irG+ACFWOPs4JaR0AAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE5LTAzLTExVDE4OjAyOjE5KzA2OjAw4So5wwAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxOS0wMy0xMVQxODowMjoxOSswNjowMJB3gX8AAAAASUVORK5CYII=',
  HT =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAYBAMAAABtiDI6AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAAAG1BMVEUAAABTOEb8cw/6+vr8OADX5sz4tzPTLwD///9hx+6LAAAAAXRSTlMAQObYZgAAAAFiS0dECIbelXoAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfjAwwAAhPn+iW4AAAAaklEQVQY04XR0Q3AIAgEUFa4FVzBFVjBFVzB9XsitbZoen+8KAYUscAiS74CpJSQM87CWpXwUBCwphSCUxCo/kuP00Hs1Wzkk2ykHy4UVAs2Mjq3hjo3EkVY9uC+tBPBsGWxUbz7+hMvuQDnyDdBQ+XoXAAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxOS0wMy0xMVQxODowMjoxOSswNjowMOEqOcMAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTktMDMtMTFUMTg6MDI6MTkrMDY6MDCQd4F/AAAAAElFTkSuQmCC',
  VT =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAYBAMAAABtiDI6AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAAAG1BMVEUAAABTOEb8cw/6+vr8OADX5sz4tzPTLwD///9hx+6LAAAAAXRSTlMAQObYZgAAAAFiS0dECIbelXoAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfjAwwAAhPn+iW4AAAAaUlEQVQY043R0Q3AIAgEUFa4FVzBFVjBFVyB9Ytg1YomvS99UYJIZIGFluwCpJSQM+6ie2aFSbu0kqxSFJyC+Okf8tJN2qJY7f6SKErFoVpwktaiiKDOiRxELBiXDkJwWwYbpQ9+/YmPPL+pOLcVIk6xAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE5LTAzLTExVDE4OjAyOjE5KzA2OjAw4So5wwAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxOS0wMy0xMVQxODowMjoxOSswNjowMJB3gX8AAAAASUVORK5CYII=',
  XT = ['x', 'y', 'texture'],
  jT = 0.4,
  WT = xe({
    __name: 'Bird',
    props: { x: {}, y: {}, disabled: { type: Boolean } },
    emits: ['die', 'update:x', 'update:y'],
    setup(r, { emit: t }) {
      const e = r,
        i = t,
        s = fc(e, 'x'),
        n = fc(e, 'y'),
        o = {
          down: X.from(GT, { scaleMode: Qt.NEAREST }),
          mid: X.from(HT, { scaleMode: Qt.NEAREST }),
          up: X.from(VT, { scaleMode: Qt.NEAREST })
        },
        a = kt(-6),
        h = ir(() => (a.value < -2 ? o.up : a.value < 2 ? o.mid : o.down)),
        l = RE((u) => {
          ;(n.value += a.value * u), (a.value += jT * u)
        })
      function c() {
        e.disabled || (Cs.wing.play(), (a.value = -8))
      }
      return (
        vE(' ', c),
        go('click', c),
        Ku(
          () => n.value > 379,
          () => {
            ;(n.value = 379), (a.value = 0), Cs.hit.play(), i('die'), l()
          }
        ),
        Ku(
          () => n.value < 10,
          () => {
            ;(n.value = 10), (a.value = 0)
          }
        ),
        (u, d) => (
          Gt(),
          fe(
            'sprite',
            { x: Et(s), y: Et(n), texture: h.value, 'anchor-x': 0.5, 'anchor-y': 0.5 },
            null,
            8,
            XT
          )
        )
      )
    }
  }),
  Pn = 300,
  $T = xe({
    __name: 'Game',
    emits: ['over'],
    setup(r, { emit: t }) {
      const e = t,
        i = ni('score'),
        s = kl(),
        n = kt([]),
        o = kt(200),
        a = kt(150),
        h = kt(!1)
      function l(c) {
        n.value.push({ x: c, y: Math.random() * 175 + 100 })
      }
      return (
        l(800),
        Se(s, (c, u) => {
          const d = Math.floor(c / Pn) * Pn + 800,
            f = Math.floor(u / Pn) * Pn + 800
          d !== f && l(d), n.value.length && n.value[0].x < c - 100 && n.value.shift()
        }),
        Se(s, (c, u) => {
          if (h.value) return
          const d = n.value.findIndex((x) => x.x > c + 150),
            f = n.value.findIndex((x) => x.x > u + 150)
          d !== f && (Cs.point.play(), i.value++)
          const p = n.value.findIndex((x) => x.x > c + 50)
          if (p === -1) return
          const m = n.value[p],
            g = new nt(m.x - 45, m.y - 65 - 1e3, 90, 1e3),
            A = new nt(m.x - 45, m.y + 65, 90, 1e3)
          ;(g.contains(c + o.value, a.value) || A.contains(c + o.value, a.value)) &&
            (Cs.hit.play(), setTimeout(() => Cs.die.play(), 100), (h.value = !0))
        }),
        Se(s, (c, u) => {
          h.value && ((o.value += u - c), o.value < -100 && e('over'))
        }),
        (c, u) => (
          Gt(),
          fe('container', null, [
            Ot(kT, { pipes: n.value, offset: Et(s) }, null, 8, ['pipes', 'offset']),
            Ot(lm, { x: 600, y: 30, score: Et(i) }, null, 8, ['score']),
            Ot(
              WT,
              {
                x: o.value,
                'onUpdate:x': u[0] || (u[0] = (d) => (o.value = d)),
                y: a.value,
                'onUpdate:y': u[1] || (u[1] = (d) => (a.value = d)),
                onDie: u[2] || (u[2] = (d) => (h.value = !0))
              },
              null,
              8,
              ['x', 'y']
            )
          ])
        )
      )
    }
  }),
  zT = { style: { width: '500px', position: 'relative', overflow: 'hidden', display: 'flex' } },
  YT = xe({
    __name: 'App',
    setup(r) {
      const t = kt(!1),
        e = kt(!1),
        i = kt(!1),
        s = kt(0)
      function n() {
        ;(s.value = 0), (t.value = !0), (e.value = !0), (i.value = !1)
      }
      function o() {
        ;(e.value = !1), setTimeout(() => (i.value = !0), 500)
      }
      return (
        ml('score', s),
        (a, h) => (
          Gt(),
          fe('div', zT, [
            Ot(QE, null, {
              default: Wn(() => [
                Ot(JE, { blur: !e.value }, null, 8, ['blur']),
                Ot(iT, null, {
                  default: Wn(() => [
                    t.value ? Qo('', !0) : (Gt(), oi(xT, { key: 0, onStart: n })),
                    e.value ? (Gt(), oi($T, { key: 1, onOver: o })) : Qo('', !0),
                    i.value ? (Gt(), oi(yT, { key: 2, onRestart: n })) : Qo('', !0)
                  ]),
                  _: 1
                }),
                Ot(rT)
              ]),
              _: 1
            })
          ])
        )
      )
    }
  })
const Gl = new Rp({ antialias: !0 })
document.body.appendChild(Gl.view)
const um = lE(YT)
um.provide(zh, Gl)
um.mount(Gl.stage)
