"use strict";
(() => {
  // node_modules/@splidejs/splide/dist/js/splide.esm.js
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", { writable: false });
    return Constructor;
  }
  var MEDIA_PREFERS_REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
  var CREATED = 1;
  var MOUNTED = 2;
  var IDLE = 3;
  var MOVING = 4;
  var SCROLLING = 5;
  var DRAGGING = 6;
  var DESTROYED = 7;
  var STATES = {
    CREATED,
    MOUNTED,
    IDLE,
    MOVING,
    SCROLLING,
    DRAGGING,
    DESTROYED
  };
  function empty(array) {
    array.length = 0;
  }
  function slice(arrayLike, start, end) {
    return Array.prototype.slice.call(arrayLike, start, end);
  }
  function apply(func) {
    return func.bind.apply(func, [null].concat(slice(arguments, 1)));
  }
  var nextTick = setTimeout;
  var noop = function noop2() {
  };
  function raf(func) {
    return requestAnimationFrame(func);
  }
  function typeOf(type, subject) {
    return typeof subject === type;
  }
  function isObject(subject) {
    return !isNull(subject) && typeOf("object", subject);
  }
  var isArray = Array.isArray;
  var isFunction = apply(typeOf, "function");
  var isString = apply(typeOf, "string");
  var isUndefined = apply(typeOf, "undefined");
  function isNull(subject) {
    return subject === null;
  }
  function isHTMLElement(subject) {
    try {
      return subject instanceof (subject.ownerDocument.defaultView || window).HTMLElement;
    } catch (e) {
      return false;
    }
  }
  function toArray(value) {
    return isArray(value) ? value : [value];
  }
  function forEach(values, iteratee) {
    toArray(values).forEach(iteratee);
  }
  function includes(array, value) {
    return array.indexOf(value) > -1;
  }
  function push(array, items) {
    array.push.apply(array, toArray(items));
    return array;
  }
  function toggleClass(elm, classes, add) {
    if (elm) {
      forEach(classes, function(name) {
        if (name) {
          elm.classList[add ? "add" : "remove"](name);
        }
      });
    }
  }
  function addClass(elm, classes) {
    toggleClass(elm, isString(classes) ? classes.split(" ") : classes, true);
  }
  function append(parent, children3) {
    forEach(children3, parent.appendChild.bind(parent));
  }
  function before(nodes, ref) {
    forEach(nodes, function(node) {
      var parent = (ref || node).parentNode;
      if (parent) {
        parent.insertBefore(node, ref);
      }
    });
  }
  function matches(elm, selector) {
    return isHTMLElement(elm) && (elm["msMatchesSelector"] || elm.matches).call(elm, selector);
  }
  function children(parent, selector) {
    var children22 = parent ? slice(parent.children) : [];
    return selector ? children22.filter(function(child3) {
      return matches(child3, selector);
    }) : children22;
  }
  function child(parent, selector) {
    return selector ? children(parent, selector)[0] : parent.firstElementChild;
  }
  var ownKeys = Object.keys;
  function forOwn(object, iteratee, right) {
    if (object) {
      (right ? ownKeys(object).reverse() : ownKeys(object)).forEach(function(key) {
        key !== "__proto__" && iteratee(object[key], key);
      });
    }
    return object;
  }
  function assign(object) {
    slice(arguments, 1).forEach(function(source) {
      forOwn(source, function(value, key) {
        object[key] = source[key];
      });
    });
    return object;
  }
  function merge(object) {
    slice(arguments, 1).forEach(function(source) {
      forOwn(source, function(value, key) {
        if (isArray(value)) {
          object[key] = value.slice();
        } else if (isObject(value)) {
          object[key] = merge({}, isObject(object[key]) ? object[key] : {}, value);
        } else {
          object[key] = value;
        }
      });
    });
    return object;
  }
  function omit(object, keys) {
    forEach(keys || ownKeys(object), function(key) {
      delete object[key];
    });
  }
  function removeAttribute(elms, attrs) {
    forEach(elms, function(elm) {
      forEach(attrs, function(attr) {
        elm && elm.removeAttribute(attr);
      });
    });
  }
  function setAttribute(elms, attrs, value) {
    if (isObject(attrs)) {
      forOwn(attrs, function(value2, name) {
        setAttribute(elms, name, value2);
      });
    } else {
      forEach(elms, function(elm) {
        isNull(value) || value === "" ? removeAttribute(elm, attrs) : elm.setAttribute(attrs, String(value));
      });
    }
  }
  function create(tag, attrs, parent) {
    var elm = document.createElement(tag);
    if (attrs) {
      isString(attrs) ? addClass(elm, attrs) : setAttribute(elm, attrs);
    }
    parent && append(parent, elm);
    return elm;
  }
  function style(elm, prop, value) {
    if (isUndefined(value)) {
      return getComputedStyle(elm)[prop];
    }
    if (!isNull(value)) {
      elm.style[prop] = "" + value;
    }
  }
  function display(elm, display22) {
    style(elm, "display", display22);
  }
  function focus(elm) {
    elm["setActive"] && elm["setActive"]() || elm.focus({
      preventScroll: true
    });
  }
  function getAttribute(elm, attr) {
    return elm.getAttribute(attr);
  }
  function hasClass(elm, className) {
    return elm && elm.classList.contains(className);
  }
  function rect(target) {
    return target.getBoundingClientRect();
  }
  function remove(nodes) {
    forEach(nodes, function(node) {
      if (node && node.parentNode) {
        node.parentNode.removeChild(node);
      }
    });
  }
  function parseHtml(html) {
    return child(new DOMParser().parseFromString(html, "text/html").body);
  }
  function prevent(e, stopPropagation) {
    e.preventDefault();
    if (stopPropagation) {
      e.stopPropagation();
      e.stopImmediatePropagation();
    }
  }
  function query(parent, selector) {
    return parent && parent.querySelector(selector);
  }
  function queryAll(parent, selector) {
    return selector ? slice(parent.querySelectorAll(selector)) : [];
  }
  function removeClass(elm, classes) {
    toggleClass(elm, classes, false);
  }
  function timeOf(e) {
    return e.timeStamp;
  }
  function unit(value) {
    return isString(value) ? value : value ? value + "px" : "";
  }
  var PROJECT_CODE = "splide";
  var DATA_ATTRIBUTE = "data-" + PROJECT_CODE;
  function assert(condition, message) {
    if (!condition) {
      throw new Error("[" + PROJECT_CODE + "] " + (message || ""));
    }
  }
  var min = Math.min;
  var max = Math.max;
  var floor = Math.floor;
  var ceil = Math.ceil;
  var abs = Math.abs;
  function approximatelyEqual(x, y, epsilon) {
    return abs(x - y) < epsilon;
  }
  function between(number, x, y, exclusive) {
    var minimum = min(x, y);
    var maximum = max(x, y);
    return exclusive ? minimum < number && number < maximum : minimum <= number && number <= maximum;
  }
  function clamp(number, x, y) {
    var minimum = min(x, y);
    var maximum = max(x, y);
    return min(max(minimum, number), maximum);
  }
  function sign(x) {
    return +(x > 0) - +(x < 0);
  }
  function format(string, replacements) {
    forEach(replacements, function(replacement) {
      string = string.replace("%s", "" + replacement);
    });
    return string;
  }
  function pad(number) {
    return number < 10 ? "0" + number : "" + number;
  }
  var ids = {};
  function uniqueId(prefix) {
    return "" + prefix + pad(ids[prefix] = (ids[prefix] || 0) + 1);
  }
  function EventBinder() {
    var listeners = [];
    function bind(targets, events, callback, options) {
      forEachEvent(targets, events, function(target, event, namespace) {
        var isEventTarget = "addEventListener" in target;
        var remover = isEventTarget ? target.removeEventListener.bind(target, event, callback, options) : target["removeListener"].bind(target, callback);
        isEventTarget ? target.addEventListener(event, callback, options) : target["addListener"](callback);
        listeners.push([target, event, namespace, callback, remover]);
      });
    }
    function unbind(targets, events, callback) {
      forEachEvent(targets, events, function(target, event, namespace) {
        listeners = listeners.filter(function(listener) {
          if (listener[0] === target && listener[1] === event && listener[2] === namespace && (!callback || listener[3] === callback)) {
            listener[4]();
            return false;
          }
          return true;
        });
      });
    }
    function dispatch(target, type, detail) {
      var e;
      var bubbles = true;
      if (typeof CustomEvent === "function") {
        e = new CustomEvent(type, {
          bubbles,
          detail
        });
      } else {
        e = document.createEvent("CustomEvent");
        e.initCustomEvent(type, bubbles, false, detail);
      }
      target.dispatchEvent(e);
      return e;
    }
    function forEachEvent(targets, events, iteratee) {
      forEach(targets, function(target) {
        target && forEach(events, function(events2) {
          events2.split(" ").forEach(function(eventNS) {
            var fragment = eventNS.split(".");
            iteratee(target, fragment[0], fragment[1]);
          });
        });
      });
    }
    function destroy() {
      listeners.forEach(function(data) {
        data[4]();
      });
      empty(listeners);
    }
    return {
      bind,
      unbind,
      dispatch,
      destroy
    };
  }
  var EVENT_MOUNTED = "mounted";
  var EVENT_READY = "ready";
  var EVENT_MOVE = "move";
  var EVENT_MOVED = "moved";
  var EVENT_CLICK = "click";
  var EVENT_ACTIVE = "active";
  var EVENT_INACTIVE = "inactive";
  var EVENT_VISIBLE = "visible";
  var EVENT_HIDDEN = "hidden";
  var EVENT_REFRESH = "refresh";
  var EVENT_UPDATED = "updated";
  var EVENT_RESIZE = "resize";
  var EVENT_RESIZED = "resized";
  var EVENT_DRAG = "drag";
  var EVENT_DRAGGING = "dragging";
  var EVENT_DRAGGED = "dragged";
  var EVENT_SCROLL = "scroll";
  var EVENT_SCROLLED = "scrolled";
  var EVENT_OVERFLOW = "overflow";
  var EVENT_DESTROY = "destroy";
  var EVENT_ARROWS_MOUNTED = "arrows:mounted";
  var EVENT_ARROWS_UPDATED = "arrows:updated";
  var EVENT_PAGINATION_MOUNTED = "pagination:mounted";
  var EVENT_PAGINATION_UPDATED = "pagination:updated";
  var EVENT_NAVIGATION_MOUNTED = "navigation:mounted";
  var EVENT_AUTOPLAY_PLAY = "autoplay:play";
  var EVENT_AUTOPLAY_PLAYING = "autoplay:playing";
  var EVENT_AUTOPLAY_PAUSE = "autoplay:pause";
  var EVENT_LAZYLOAD_LOADED = "lazyload:loaded";
  var EVENT_SLIDE_KEYDOWN = "sk";
  var EVENT_SHIFTED = "sh";
  var EVENT_END_INDEX_CHANGED = "ei";
  function EventInterface(Splide2) {
    var bus = Splide2 ? Splide2.event.bus : document.createDocumentFragment();
    var binder = EventBinder();
    function on(events, callback) {
      binder.bind(bus, toArray(events).join(" "), function(e) {
        callback.apply(callback, isArray(e.detail) ? e.detail : []);
      });
    }
    function emit(event) {
      binder.dispatch(bus, event, slice(arguments, 1));
    }
    if (Splide2) {
      Splide2.event.on(EVENT_DESTROY, binder.destroy);
    }
    return assign(binder, {
      bus,
      on,
      off: apply(binder.unbind, bus),
      emit
    });
  }
  function RequestInterval(interval, onInterval, onUpdate, limit) {
    var now = Date.now;
    var startTime;
    var rate = 0;
    var id;
    var paused = true;
    var count = 0;
    function update() {
      if (!paused) {
        rate = interval ? min((now() - startTime) / interval, 1) : 1;
        onUpdate && onUpdate(rate);
        if (rate >= 1) {
          onInterval();
          startTime = now();
          if (limit && ++count >= limit) {
            return pause();
          }
        }
        id = raf(update);
      }
    }
    function start(resume) {
      resume || cancel();
      startTime = now() - (resume ? rate * interval : 0);
      paused = false;
      id = raf(update);
    }
    function pause() {
      paused = true;
    }
    function rewind() {
      startTime = now();
      rate = 0;
      if (onUpdate) {
        onUpdate(rate);
      }
    }
    function cancel() {
      id && cancelAnimationFrame(id);
      rate = 0;
      id = 0;
      paused = true;
    }
    function set(time) {
      interval = time;
    }
    function isPaused() {
      return paused;
    }
    return {
      start,
      rewind,
      pause,
      cancel,
      set,
      isPaused
    };
  }
  function State(initialState) {
    var state = initialState;
    function set(value) {
      state = value;
    }
    function is(states) {
      return includes(toArray(states), state);
    }
    return {
      set,
      is
    };
  }
  function Throttle(func, duration) {
    var interval = RequestInterval(duration || 0, func, null, 1);
    return function() {
      interval.isPaused() && interval.start();
    };
  }
  function Media(Splide2, Components2, options) {
    var state = Splide2.state;
    var breakpoints = options.breakpoints || {};
    var reducedMotion = options.reducedMotion || {};
    var binder = EventBinder();
    var queries = [];
    function setup() {
      var isMin = options.mediaQuery === "min";
      ownKeys(breakpoints).sort(function(n, m) {
        return isMin ? +n - +m : +m - +n;
      }).forEach(function(key) {
        register(breakpoints[key], "(" + (isMin ? "min" : "max") + "-width:" + key + "px)");
      });
      register(reducedMotion, MEDIA_PREFERS_REDUCED_MOTION);
      update();
    }
    function destroy(completely) {
      if (completely) {
        binder.destroy();
      }
    }
    function register(options2, query2) {
      var queryList = matchMedia(query2);
      binder.bind(queryList, "change", update);
      queries.push([options2, queryList]);
    }
    function update() {
      var destroyed = state.is(DESTROYED);
      var direction = options.direction;
      var merged = queries.reduce(function(merged2, entry) {
        return merge(merged2, entry[1].matches ? entry[0] : {});
      }, {});
      omit(options);
      set(merged);
      if (options.destroy) {
        Splide2.destroy(options.destroy === "completely");
      } else if (destroyed) {
        destroy(true);
        Splide2.mount();
      } else {
        direction !== options.direction && Splide2.refresh();
      }
    }
    function reduce(enable) {
      if (matchMedia(MEDIA_PREFERS_REDUCED_MOTION).matches) {
        enable ? merge(options, reducedMotion) : omit(options, ownKeys(reducedMotion));
      }
    }
    function set(opts, base, notify) {
      merge(options, opts);
      base && merge(Object.getPrototypeOf(options), opts);
      if (notify || !state.is(CREATED)) {
        Splide2.emit(EVENT_UPDATED, options);
      }
    }
    return {
      setup,
      destroy,
      reduce,
      set
    };
  }
  var ARROW = "Arrow";
  var ARROW_LEFT = ARROW + "Left";
  var ARROW_RIGHT = ARROW + "Right";
  var ARROW_UP = ARROW + "Up";
  var ARROW_DOWN = ARROW + "Down";
  var RTL = "rtl";
  var TTB = "ttb";
  var ORIENTATION_MAP = {
    width: ["height"],
    left: ["top", "right"],
    right: ["bottom", "left"],
    x: ["y"],
    X: ["Y"],
    Y: ["X"],
    ArrowLeft: [ARROW_UP, ARROW_RIGHT],
    ArrowRight: [ARROW_DOWN, ARROW_LEFT]
  };
  function Direction(Splide2, Components2, options) {
    function resolve(prop, axisOnly, direction) {
      direction = direction || options.direction;
      var index = direction === RTL && !axisOnly ? 1 : direction === TTB ? 0 : -1;
      return ORIENTATION_MAP[prop] && ORIENTATION_MAP[prop][index] || prop.replace(/width|left|right/i, function(match, offset) {
        var replacement = ORIENTATION_MAP[match.toLowerCase()][index] || match;
        return offset > 0 ? replacement.charAt(0).toUpperCase() + replacement.slice(1) : replacement;
      });
    }
    function orient(value) {
      return value * (options.direction === RTL ? 1 : -1);
    }
    return {
      resolve,
      orient
    };
  }
  var ROLE = "role";
  var TAB_INDEX = "tabindex";
  var DISABLED = "disabled";
  var ARIA_PREFIX = "aria-";
  var ARIA_CONTROLS = ARIA_PREFIX + "controls";
  var ARIA_CURRENT = ARIA_PREFIX + "current";
  var ARIA_SELECTED = ARIA_PREFIX + "selected";
  var ARIA_LABEL = ARIA_PREFIX + "label";
  var ARIA_LABELLEDBY = ARIA_PREFIX + "labelledby";
  var ARIA_HIDDEN = ARIA_PREFIX + "hidden";
  var ARIA_ORIENTATION = ARIA_PREFIX + "orientation";
  var ARIA_ROLEDESCRIPTION = ARIA_PREFIX + "roledescription";
  var ARIA_LIVE = ARIA_PREFIX + "live";
  var ARIA_BUSY = ARIA_PREFIX + "busy";
  var ARIA_ATOMIC = ARIA_PREFIX + "atomic";
  var ALL_ATTRIBUTES = [ROLE, TAB_INDEX, DISABLED, ARIA_CONTROLS, ARIA_CURRENT, ARIA_LABEL, ARIA_LABELLEDBY, ARIA_HIDDEN, ARIA_ORIENTATION, ARIA_ROLEDESCRIPTION];
  var CLASS_PREFIX = PROJECT_CODE + "__";
  var STATUS_CLASS_PREFIX = "is-";
  var CLASS_ROOT = PROJECT_CODE;
  var CLASS_TRACK = CLASS_PREFIX + "track";
  var CLASS_LIST = CLASS_PREFIX + "list";
  var CLASS_SLIDE = CLASS_PREFIX + "slide";
  var CLASS_CLONE = CLASS_SLIDE + "--clone";
  var CLASS_CONTAINER = CLASS_SLIDE + "__container";
  var CLASS_ARROWS = CLASS_PREFIX + "arrows";
  var CLASS_ARROW = CLASS_PREFIX + "arrow";
  var CLASS_ARROW_PREV = CLASS_ARROW + "--prev";
  var CLASS_ARROW_NEXT = CLASS_ARROW + "--next";
  var CLASS_PAGINATION = CLASS_PREFIX + "pagination";
  var CLASS_PAGINATION_PAGE = CLASS_PAGINATION + "__page";
  var CLASS_PROGRESS = CLASS_PREFIX + "progress";
  var CLASS_PROGRESS_BAR = CLASS_PROGRESS + "__bar";
  var CLASS_TOGGLE = CLASS_PREFIX + "toggle";
  var CLASS_TOGGLE_PLAY = CLASS_TOGGLE + "__play";
  var CLASS_TOGGLE_PAUSE = CLASS_TOGGLE + "__pause";
  var CLASS_SPINNER = CLASS_PREFIX + "spinner";
  var CLASS_SR = CLASS_PREFIX + "sr";
  var CLASS_INITIALIZED = STATUS_CLASS_PREFIX + "initialized";
  var CLASS_ACTIVE = STATUS_CLASS_PREFIX + "active";
  var CLASS_PREV = STATUS_CLASS_PREFIX + "prev";
  var CLASS_NEXT = STATUS_CLASS_PREFIX + "next";
  var CLASS_VISIBLE = STATUS_CLASS_PREFIX + "visible";
  var CLASS_LOADING = STATUS_CLASS_PREFIX + "loading";
  var CLASS_FOCUS_IN = STATUS_CLASS_PREFIX + "focus-in";
  var CLASS_OVERFLOW = STATUS_CLASS_PREFIX + "overflow";
  var STATUS_CLASSES = [CLASS_ACTIVE, CLASS_VISIBLE, CLASS_PREV, CLASS_NEXT, CLASS_LOADING, CLASS_FOCUS_IN, CLASS_OVERFLOW];
  var CLASSES = {
    slide: CLASS_SLIDE,
    clone: CLASS_CLONE,
    arrows: CLASS_ARROWS,
    arrow: CLASS_ARROW,
    prev: CLASS_ARROW_PREV,
    next: CLASS_ARROW_NEXT,
    pagination: CLASS_PAGINATION,
    page: CLASS_PAGINATION_PAGE,
    spinner: CLASS_SPINNER
  };
  function closest(from, selector) {
    if (isFunction(from.closest)) {
      return from.closest(selector);
    }
    var elm = from;
    while (elm && elm.nodeType === 1) {
      if (matches(elm, selector)) {
        break;
      }
      elm = elm.parentElement;
    }
    return elm;
  }
  var FRICTION = 5;
  var LOG_INTERVAL = 200;
  var POINTER_DOWN_EVENTS = "touchstart mousedown";
  var POINTER_MOVE_EVENTS = "touchmove mousemove";
  var POINTER_UP_EVENTS = "touchend touchcancel mouseup click";
  function Elements(Splide2, Components2, options) {
    var _EventInterface = EventInterface(Splide2), on = _EventInterface.on, bind = _EventInterface.bind;
    var root = Splide2.root;
    var i18n = options.i18n;
    var elements = {};
    var slides = [];
    var rootClasses = [];
    var trackClasses = [];
    var track;
    var list;
    var isUsingKey;
    function setup() {
      collect();
      init();
      update();
    }
    function mount() {
      on(EVENT_REFRESH, destroy);
      on(EVENT_REFRESH, setup);
      on(EVENT_UPDATED, update);
      bind(document, POINTER_DOWN_EVENTS + " keydown", function(e) {
        isUsingKey = e.type === "keydown";
      }, {
        capture: true
      });
      bind(root, "focusin", function() {
        toggleClass(root, CLASS_FOCUS_IN, !!isUsingKey);
      });
    }
    function destroy(completely) {
      var attrs = ALL_ATTRIBUTES.concat("style");
      empty(slides);
      removeClass(root, rootClasses);
      removeClass(track, trackClasses);
      removeAttribute([track, list], attrs);
      removeAttribute(root, completely ? attrs : ["style", ARIA_ROLEDESCRIPTION]);
    }
    function update() {
      removeClass(root, rootClasses);
      removeClass(track, trackClasses);
      rootClasses = getClasses(CLASS_ROOT);
      trackClasses = getClasses(CLASS_TRACK);
      addClass(root, rootClasses);
      addClass(track, trackClasses);
      setAttribute(root, ARIA_LABEL, options.label);
      setAttribute(root, ARIA_LABELLEDBY, options.labelledby);
    }
    function collect() {
      track = find2("." + CLASS_TRACK);
      list = child(track, "." + CLASS_LIST);
      assert(track && list, "A track/list element is missing.");
      push(slides, children(list, "." + CLASS_SLIDE + ":not(." + CLASS_CLONE + ")"));
      forOwn({
        arrows: CLASS_ARROWS,
        pagination: CLASS_PAGINATION,
        prev: CLASS_ARROW_PREV,
        next: CLASS_ARROW_NEXT,
        bar: CLASS_PROGRESS_BAR,
        toggle: CLASS_TOGGLE
      }, function(className, key) {
        elements[key] = find2("." + className);
      });
      assign(elements, {
        root,
        track,
        list,
        slides
      });
    }
    function init() {
      var id = root.id || uniqueId(PROJECT_CODE);
      var role = options.role;
      root.id = id;
      track.id = track.id || id + "-track";
      list.id = list.id || id + "-list";
      if (!getAttribute(root, ROLE) && root.tagName !== "SECTION" && role) {
        setAttribute(root, ROLE, role);
      }
      setAttribute(root, ARIA_ROLEDESCRIPTION, i18n.carousel);
      setAttribute(list, ROLE, "presentation");
    }
    function find2(selector) {
      var elm = query(root, selector);
      return elm && closest(elm, "." + CLASS_ROOT) === root ? elm : void 0;
    }
    function getClasses(base) {
      return [base + "--" + options.type, base + "--" + options.direction, options.drag && base + "--draggable", options.isNavigation && base + "--nav", base === CLASS_ROOT && CLASS_ACTIVE];
    }
    return assign(elements, {
      setup,
      mount,
      destroy
    });
  }
  var SLIDE = "slide";
  var LOOP = "loop";
  var FADE = "fade";
  function Slide$1(Splide2, index, slideIndex, slide) {
    var event = EventInterface(Splide2);
    var on = event.on, emit = event.emit, bind = event.bind;
    var Components = Splide2.Components, root = Splide2.root, options = Splide2.options;
    var isNavigation = options.isNavigation, updateOnMove = options.updateOnMove, i18n = options.i18n, pagination = options.pagination, slideFocus = options.slideFocus;
    var resolve = Components.Direction.resolve;
    var styles = getAttribute(slide, "style");
    var label = getAttribute(slide, ARIA_LABEL);
    var isClone = slideIndex > -1;
    var container = child(slide, "." + CLASS_CONTAINER);
    var destroyed;
    function mount() {
      if (!isClone) {
        slide.id = root.id + "-slide" + pad(index + 1);
        setAttribute(slide, ROLE, pagination ? "tabpanel" : "group");
        setAttribute(slide, ARIA_ROLEDESCRIPTION, i18n.slide);
        setAttribute(slide, ARIA_LABEL, label || format(i18n.slideLabel, [index + 1, Splide2.length]));
      }
      listen();
    }
    function listen() {
      bind(slide, "click", apply(emit, EVENT_CLICK, self2));
      bind(slide, "keydown", apply(emit, EVENT_SLIDE_KEYDOWN, self2));
      on([EVENT_MOVED, EVENT_SHIFTED, EVENT_SCROLLED], update);
      on(EVENT_NAVIGATION_MOUNTED, initNavigation);
      if (updateOnMove) {
        on(EVENT_MOVE, onMove);
      }
    }
    function destroy() {
      destroyed = true;
      event.destroy();
      removeClass(slide, STATUS_CLASSES);
      removeAttribute(slide, ALL_ATTRIBUTES);
      setAttribute(slide, "style", styles);
      setAttribute(slide, ARIA_LABEL, label || "");
    }
    function initNavigation() {
      var controls = Splide2.splides.map(function(target) {
        var Slide2 = target.splide.Components.Slides.getAt(index);
        return Slide2 ? Slide2.slide.id : "";
      }).join(" ");
      setAttribute(slide, ARIA_LABEL, format(i18n.slideX, (isClone ? slideIndex : index) + 1));
      setAttribute(slide, ARIA_CONTROLS, controls);
      setAttribute(slide, ROLE, slideFocus ? "button" : "");
      slideFocus && removeAttribute(slide, ARIA_ROLEDESCRIPTION);
    }
    function onMove() {
      if (!destroyed) {
        update();
      }
    }
    function update() {
      if (!destroyed) {
        var curr = Splide2.index;
        updateActivity();
        updateVisibility();
        toggleClass(slide, CLASS_PREV, index === curr - 1);
        toggleClass(slide, CLASS_NEXT, index === curr + 1);
      }
    }
    function updateActivity() {
      var active = isActive();
      if (active !== hasClass(slide, CLASS_ACTIVE)) {
        toggleClass(slide, CLASS_ACTIVE, active);
        setAttribute(slide, ARIA_CURRENT, isNavigation && active || "");
        emit(active ? EVENT_ACTIVE : EVENT_INACTIVE, self2);
      }
    }
    function updateVisibility() {
      var visible = isVisible();
      var hidden = !visible && (!isActive() || isClone);
      if (!Splide2.state.is([MOVING, SCROLLING])) {
        setAttribute(slide, ARIA_HIDDEN, hidden || "");
      }
      setAttribute(queryAll(slide, options.focusableNodes || ""), TAB_INDEX, hidden ? -1 : "");
      if (slideFocus) {
        setAttribute(slide, TAB_INDEX, hidden ? -1 : 0);
      }
      if (visible !== hasClass(slide, CLASS_VISIBLE)) {
        toggleClass(slide, CLASS_VISIBLE, visible);
        emit(visible ? EVENT_VISIBLE : EVENT_HIDDEN, self2);
      }
      if (!visible && document.activeElement === slide) {
        var Slide2 = Components.Slides.getAt(Splide2.index);
        Slide2 && focus(Slide2.slide);
      }
    }
    function style$1(prop, value, useContainer) {
      style(useContainer && container || slide, prop, value);
    }
    function isActive() {
      var curr = Splide2.index;
      return curr === index || options.cloneStatus && curr === slideIndex;
    }
    function isVisible() {
      if (Splide2.is(FADE)) {
        return isActive();
      }
      var trackRect = rect(Components.Elements.track);
      var slideRect = rect(slide);
      var left = resolve("left", true);
      var right = resolve("right", true);
      return floor(trackRect[left]) <= ceil(slideRect[left]) && floor(slideRect[right]) <= ceil(trackRect[right]);
    }
    function isWithin(from, distance) {
      var diff = abs(from - index);
      if (!isClone && (options.rewind || Splide2.is(LOOP))) {
        diff = min(diff, Splide2.length - diff);
      }
      return diff <= distance;
    }
    var self2 = {
      index,
      slideIndex,
      slide,
      container,
      isClone,
      mount,
      destroy,
      update,
      style: style$1,
      isWithin
    };
    return self2;
  }
  function Slides(Splide2, Components2, options) {
    var _EventInterface2 = EventInterface(Splide2), on = _EventInterface2.on, emit = _EventInterface2.emit, bind = _EventInterface2.bind;
    var _Components2$Elements = Components2.Elements, slides = _Components2$Elements.slides, list = _Components2$Elements.list;
    var Slides2 = [];
    function mount() {
      init();
      on(EVENT_REFRESH, destroy);
      on(EVENT_REFRESH, init);
    }
    function init() {
      slides.forEach(function(slide, index) {
        register(slide, index, -1);
      });
    }
    function destroy() {
      forEach$12(function(Slide2) {
        Slide2.destroy();
      });
      empty(Slides2);
    }
    function update() {
      forEach$12(function(Slide2) {
        Slide2.update();
      });
    }
    function register(slide, index, slideIndex) {
      var object = Slide$1(Splide2, index, slideIndex, slide);
      object.mount();
      Slides2.push(object);
      Slides2.sort(function(Slide1, Slide2) {
        return Slide1.index - Slide2.index;
      });
    }
    function get(excludeClones) {
      return excludeClones ? filter(function(Slide2) {
        return !Slide2.isClone;
      }) : Slides2;
    }
    function getIn(page) {
      var Controller2 = Components2.Controller;
      var index = Controller2.toIndex(page);
      var max3 = Controller2.hasFocus() ? 1 : options.perPage;
      return filter(function(Slide2) {
        return between(Slide2.index, index, index + max3 - 1);
      });
    }
    function getAt(index) {
      return filter(index)[0];
    }
    function add(items, index) {
      forEach(items, function(slide) {
        if (isString(slide)) {
          slide = parseHtml(slide);
        }
        if (isHTMLElement(slide)) {
          var ref = slides[index];
          ref ? before(slide, ref) : append(list, slide);
          addClass(slide, options.classes.slide);
          observeImages(slide, apply(emit, EVENT_RESIZE));
        }
      });
      emit(EVENT_REFRESH);
    }
    function remove$1(matcher) {
      remove(filter(matcher).map(function(Slide2) {
        return Slide2.slide;
      }));
      emit(EVENT_REFRESH);
    }
    function forEach$12(iteratee, excludeClones) {
      get(excludeClones).forEach(iteratee);
    }
    function filter(matcher) {
      return Slides2.filter(isFunction(matcher) ? matcher : function(Slide2) {
        return isString(matcher) ? matches(Slide2.slide, matcher) : includes(toArray(matcher), Slide2.index);
      });
    }
    function style3(prop, value, useContainer) {
      forEach$12(function(Slide2) {
        Slide2.style(prop, value, useContainer);
      });
    }
    function observeImages(elm, callback) {
      var images = queryAll(elm, "img");
      var length = images.length;
      if (length) {
        images.forEach(function(img) {
          bind(img, "load error", function() {
            if (!--length) {
              callback();
            }
          });
        });
      } else {
        callback();
      }
    }
    function getLength(excludeClones) {
      return excludeClones ? slides.length : Slides2.length;
    }
    function isEnough() {
      return Slides2.length > options.perPage;
    }
    return {
      mount,
      destroy,
      update,
      register,
      get,
      getIn,
      getAt,
      add,
      remove: remove$1,
      forEach: forEach$12,
      filter,
      style: style3,
      getLength,
      isEnough
    };
  }
  function Layout(Splide2, Components2, options) {
    var _EventInterface3 = EventInterface(Splide2), on = _EventInterface3.on, bind = _EventInterface3.bind, emit = _EventInterface3.emit;
    var Slides2 = Components2.Slides;
    var resolve = Components2.Direction.resolve;
    var _Components2$Elements2 = Components2.Elements, root = _Components2$Elements2.root, track = _Components2$Elements2.track, list = _Components2$Elements2.list;
    var getAt = Slides2.getAt, styleSlides = Slides2.style;
    var vertical;
    var rootRect;
    var overflow;
    function mount() {
      init();
      bind(window, "resize load", Throttle(apply(emit, EVENT_RESIZE)));
      on([EVENT_UPDATED, EVENT_REFRESH], init);
      on(EVENT_RESIZE, resize);
    }
    function init() {
      vertical = options.direction === TTB;
      style(root, "maxWidth", unit(options.width));
      style(track, resolve("paddingLeft"), cssPadding(false));
      style(track, resolve("paddingRight"), cssPadding(true));
      resize(true);
    }
    function resize(force) {
      var newRect = rect(root);
      if (force || rootRect.width !== newRect.width || rootRect.height !== newRect.height) {
        style(track, "height", cssTrackHeight());
        styleSlides(resolve("marginRight"), unit(options.gap));
        styleSlides("width", cssSlideWidth());
        styleSlides("height", cssSlideHeight(), true);
        rootRect = newRect;
        emit(EVENT_RESIZED);
        if (overflow !== (overflow = isOverflow())) {
          toggleClass(root, CLASS_OVERFLOW, overflow);
          emit(EVENT_OVERFLOW, overflow);
        }
      }
    }
    function cssPadding(right) {
      var padding = options.padding;
      var prop = resolve(right ? "right" : "left");
      return padding && unit(padding[prop] || (isObject(padding) ? 0 : padding)) || "0px";
    }
    function cssTrackHeight() {
      var height = "";
      if (vertical) {
        height = cssHeight();
        assert(height, "height or heightRatio is missing.");
        height = "calc(" + height + " - " + cssPadding(false) + " - " + cssPadding(true) + ")";
      }
      return height;
    }
    function cssHeight() {
      return unit(options.height || rect(list).width * options.heightRatio);
    }
    function cssSlideWidth() {
      return options.autoWidth ? null : unit(options.fixedWidth) || (vertical ? "" : cssSlideSize());
    }
    function cssSlideHeight() {
      return unit(options.fixedHeight) || (vertical ? options.autoHeight ? null : cssSlideSize() : cssHeight());
    }
    function cssSlideSize() {
      var gap = unit(options.gap);
      return "calc((100%" + (gap && " + " + gap) + ")/" + (options.perPage || 1) + (gap && " - " + gap) + ")";
    }
    function listSize() {
      return rect(list)[resolve("width")];
    }
    function slideSize(index, withoutGap) {
      var Slide2 = getAt(index || 0);
      return Slide2 ? rect(Slide2.slide)[resolve("width")] + (withoutGap ? 0 : getGap()) : 0;
    }
    function totalSize(index, withoutGap) {
      var Slide2 = getAt(index);
      if (Slide2) {
        var right = rect(Slide2.slide)[resolve("right")];
        var left = rect(list)[resolve("left")];
        return abs(right - left) + (withoutGap ? 0 : getGap());
      }
      return 0;
    }
    function sliderSize(withoutGap) {
      return totalSize(Splide2.length - 1) - totalSize(0) + slideSize(0, withoutGap);
    }
    function getGap() {
      var Slide2 = getAt(0);
      return Slide2 && parseFloat(style(Slide2.slide, resolve("marginRight"))) || 0;
    }
    function getPadding(right) {
      return parseFloat(style(track, resolve("padding" + (right ? "Right" : "Left")))) || 0;
    }
    function isOverflow() {
      return Splide2.is(FADE) || sliderSize(true) > listSize();
    }
    return {
      mount,
      resize,
      listSize,
      slideSize,
      sliderSize,
      totalSize,
      getPadding,
      isOverflow
    };
  }
  var MULTIPLIER = 2;
  function Clones(Splide2, Components2, options) {
    var event = EventInterface(Splide2);
    var on = event.on;
    var Elements2 = Components2.Elements, Slides2 = Components2.Slides;
    var resolve = Components2.Direction.resolve;
    var clones = [];
    var cloneCount;
    function mount() {
      on(EVENT_REFRESH, remount);
      on([EVENT_UPDATED, EVENT_RESIZE], observe);
      if (cloneCount = computeCloneCount()) {
        generate(cloneCount);
        Components2.Layout.resize(true);
      }
    }
    function remount() {
      destroy();
      mount();
    }
    function destroy() {
      remove(clones);
      empty(clones);
      event.destroy();
    }
    function observe() {
      var count = computeCloneCount();
      if (cloneCount !== count) {
        if (cloneCount < count || !count) {
          event.emit(EVENT_REFRESH);
        }
      }
    }
    function generate(count) {
      var slides = Slides2.get().slice();
      var length = slides.length;
      if (length) {
        while (slides.length < count) {
          push(slides, slides);
        }
        push(slides.slice(-count), slides.slice(0, count)).forEach(function(Slide2, index) {
          var isHead = index < count;
          var clone = cloneDeep(Slide2.slide, index);
          isHead ? before(clone, slides[0].slide) : append(Elements2.list, clone);
          push(clones, clone);
          Slides2.register(clone, index - count + (isHead ? 0 : length), Slide2.index);
        });
      }
    }
    function cloneDeep(elm, index) {
      var clone = elm.cloneNode(true);
      addClass(clone, options.classes.clone);
      clone.id = Splide2.root.id + "-clone" + pad(index + 1);
      return clone;
    }
    function computeCloneCount() {
      var clones2 = options.clones;
      if (!Splide2.is(LOOP)) {
        clones2 = 0;
      } else if (isUndefined(clones2)) {
        var fixedSize = options[resolve("fixedWidth")] && Components2.Layout.slideSize(0);
        var fixedCount = fixedSize && ceil(rect(Elements2.track)[resolve("width")] / fixedSize);
        clones2 = fixedCount || options[resolve("autoWidth")] && Splide2.length || options.perPage * MULTIPLIER;
      }
      return clones2;
    }
    return {
      mount,
      destroy
    };
  }
  function Move(Splide2, Components2, options) {
    var _EventInterface4 = EventInterface(Splide2), on = _EventInterface4.on, emit = _EventInterface4.emit;
    var set = Splide2.state.set;
    var _Components2$Layout = Components2.Layout, slideSize = _Components2$Layout.slideSize, getPadding = _Components2$Layout.getPadding, totalSize = _Components2$Layout.totalSize, listSize = _Components2$Layout.listSize, sliderSize = _Components2$Layout.sliderSize;
    var _Components2$Directio = Components2.Direction, resolve = _Components2$Directio.resolve, orient = _Components2$Directio.orient;
    var _Components2$Elements3 = Components2.Elements, list = _Components2$Elements3.list, track = _Components2$Elements3.track;
    var Transition;
    function mount() {
      Transition = Components2.Transition;
      on([EVENT_MOUNTED, EVENT_RESIZED, EVENT_UPDATED, EVENT_REFRESH], reposition);
    }
    function reposition() {
      if (!Components2.Controller.isBusy()) {
        Components2.Scroll.cancel();
        jump(Splide2.index);
        Components2.Slides.update();
      }
    }
    function move(dest, index, prev, callback) {
      if (dest !== index && canShift(dest > prev)) {
        cancel();
        translate(shift(getPosition(), dest > prev), true);
      }
      set(MOVING);
      emit(EVENT_MOVE, index, prev, dest);
      Transition.start(index, function() {
        set(IDLE);
        emit(EVENT_MOVED, index, prev, dest);
        callback && callback();
      });
    }
    function jump(index) {
      translate(toPosition(index, true));
    }
    function translate(position, preventLoop) {
      if (!Splide2.is(FADE)) {
        var destination = preventLoop ? position : loop(position);
        style(list, "transform", "translate" + resolve("X") + "(" + destination + "px)");
        position !== destination && emit(EVENT_SHIFTED);
      }
    }
    function loop(position) {
      if (Splide2.is(LOOP)) {
        var index = toIndex(position);
        var exceededMax = index > Components2.Controller.getEnd();
        var exceededMin = index < 0;
        if (exceededMin || exceededMax) {
          position = shift(position, exceededMax);
        }
      }
      return position;
    }
    function shift(position, backwards) {
      var excess = position - getLimit(backwards);
      var size = sliderSize();
      position -= orient(size * (ceil(abs(excess) / size) || 1)) * (backwards ? 1 : -1);
      return position;
    }
    function cancel() {
      translate(getPosition(), true);
      Transition.cancel();
    }
    function toIndex(position) {
      var Slides2 = Components2.Slides.get();
      var index = 0;
      var minDistance = Infinity;
      for (var i = 0; i < Slides2.length; i++) {
        var slideIndex = Slides2[i].index;
        var distance = abs(toPosition(slideIndex, true) - position);
        if (distance <= minDistance) {
          minDistance = distance;
          index = slideIndex;
        } else {
          break;
        }
      }
      return index;
    }
    function toPosition(index, trimming) {
      var position = orient(totalSize(index - 1) - offset(index));
      return trimming ? trim(position) : position;
    }
    function getPosition() {
      var left = resolve("left");
      return rect(list)[left] - rect(track)[left] + orient(getPadding(false));
    }
    function trim(position) {
      if (options.trimSpace && Splide2.is(SLIDE)) {
        position = clamp(position, 0, orient(sliderSize(true) - listSize()));
      }
      return position;
    }
    function offset(index) {
      var focus2 = options.focus;
      return focus2 === "center" ? (listSize() - slideSize(index, true)) / 2 : +focus2 * slideSize(index) || 0;
    }
    function getLimit(max3) {
      return toPosition(max3 ? Components2.Controller.getEnd() : 0, !!options.trimSpace);
    }
    function canShift(backwards) {
      var shifted = orient(shift(getPosition(), backwards));
      return backwards ? shifted >= 0 : shifted <= list[resolve("scrollWidth")] - rect(track)[resolve("width")];
    }
    function exceededLimit(max3, position) {
      position = isUndefined(position) ? getPosition() : position;
      var exceededMin = max3 !== true && orient(position) < orient(getLimit(false));
      var exceededMax = max3 !== false && orient(position) > orient(getLimit(true));
      return exceededMin || exceededMax;
    }
    return {
      mount,
      move,
      jump,
      translate,
      shift,
      cancel,
      toIndex,
      toPosition,
      getPosition,
      getLimit,
      exceededLimit,
      reposition
    };
  }
  function Controller(Splide2, Components2, options) {
    var _EventInterface5 = EventInterface(Splide2), on = _EventInterface5.on, emit = _EventInterface5.emit;
    var Move2 = Components2.Move;
    var getPosition = Move2.getPosition, getLimit = Move2.getLimit, toPosition = Move2.toPosition;
    var _Components2$Slides = Components2.Slides, isEnough = _Components2$Slides.isEnough, getLength = _Components2$Slides.getLength;
    var omitEnd = options.omitEnd;
    var isLoop = Splide2.is(LOOP);
    var isSlide = Splide2.is(SLIDE);
    var getNext = apply(getAdjacent, false);
    var getPrev = apply(getAdjacent, true);
    var currIndex = options.start || 0;
    var endIndex;
    var prevIndex = currIndex;
    var slideCount;
    var perMove;
    var perPage;
    function mount() {
      init();
      on([EVENT_UPDATED, EVENT_REFRESH, EVENT_END_INDEX_CHANGED], init);
      on(EVENT_RESIZED, onResized);
    }
    function init() {
      slideCount = getLength(true);
      perMove = options.perMove;
      perPage = options.perPage;
      endIndex = getEnd();
      var index = clamp(currIndex, 0, omitEnd ? endIndex : slideCount - 1);
      if (index !== currIndex) {
        currIndex = index;
        Move2.reposition();
      }
    }
    function onResized() {
      if (endIndex !== getEnd()) {
        emit(EVENT_END_INDEX_CHANGED);
      }
    }
    function go(control, allowSameIndex, callback) {
      if (!isBusy()) {
        var dest = parse(control);
        var index = loop(dest);
        if (index > -1 && (allowSameIndex || index !== currIndex)) {
          setIndex(index);
          Move2.move(dest, index, prevIndex, callback);
        }
      }
    }
    function scroll(destination, duration, snap, callback) {
      Components2.Scroll.scroll(destination, duration, snap, function() {
        var index = loop(Move2.toIndex(getPosition()));
        setIndex(omitEnd ? min(index, endIndex) : index);
        callback && callback();
      });
    }
    function parse(control) {
      var index = currIndex;
      if (isString(control)) {
        var _ref = control.match(/([+\-<>])(\d+)?/) || [], indicator = _ref[1], number = _ref[2];
        if (indicator === "+" || indicator === "-") {
          index = computeDestIndex(currIndex + +("" + indicator + (+number || 1)), currIndex);
        } else if (indicator === ">") {
          index = number ? toIndex(+number) : getNext(true);
        } else if (indicator === "<") {
          index = getPrev(true);
        }
      } else {
        index = isLoop ? control : clamp(control, 0, endIndex);
      }
      return index;
    }
    function getAdjacent(prev, destination) {
      var number = perMove || (hasFocus() ? 1 : perPage);
      var dest = computeDestIndex(currIndex + number * (prev ? -1 : 1), currIndex, !(perMove || hasFocus()));
      if (dest === -1 && isSlide) {
        if (!approximatelyEqual(getPosition(), getLimit(!prev), 1)) {
          return prev ? 0 : endIndex;
        }
      }
      return destination ? dest : loop(dest);
    }
    function computeDestIndex(dest, from, snapPage) {
      if (isEnough() || hasFocus()) {
        var index = computeMovableDestIndex(dest);
        if (index !== dest) {
          from = dest;
          dest = index;
          snapPage = false;
        }
        if (dest < 0 || dest > endIndex) {
          if (!perMove && (between(0, dest, from, true) || between(endIndex, from, dest, true))) {
            dest = toIndex(toPage(dest));
          } else {
            if (isLoop) {
              dest = snapPage ? dest < 0 ? -(slideCount % perPage || perPage) : slideCount : dest;
            } else if (options.rewind) {
              dest = dest < 0 ? endIndex : 0;
            } else {
              dest = -1;
            }
          }
        } else {
          if (snapPage && dest !== from) {
            dest = toIndex(toPage(from) + (dest < from ? -1 : 1));
          }
        }
      } else {
        dest = -1;
      }
      return dest;
    }
    function computeMovableDestIndex(dest) {
      if (isSlide && options.trimSpace === "move" && dest !== currIndex) {
        var position = getPosition();
        while (position === toPosition(dest, true) && between(dest, 0, Splide2.length - 1, !options.rewind)) {
          dest < currIndex ? --dest : ++dest;
        }
      }
      return dest;
    }
    function loop(index) {
      return isLoop ? (index + slideCount) % slideCount || 0 : index;
    }
    function getEnd() {
      var end = slideCount - (hasFocus() || isLoop && perMove ? 1 : perPage);
      while (omitEnd && end-- > 0) {
        if (toPosition(slideCount - 1, true) !== toPosition(end, true)) {
          end++;
          break;
        }
      }
      return clamp(end, 0, slideCount - 1);
    }
    function toIndex(page) {
      return clamp(hasFocus() ? page : perPage * page, 0, endIndex);
    }
    function toPage(index) {
      return hasFocus() ? min(index, endIndex) : floor((index >= endIndex ? slideCount - 1 : index) / perPage);
    }
    function toDest(destination) {
      var closest2 = Move2.toIndex(destination);
      return isSlide ? clamp(closest2, 0, endIndex) : closest2;
    }
    function setIndex(index) {
      if (index !== currIndex) {
        prevIndex = currIndex;
        currIndex = index;
      }
    }
    function getIndex(prev) {
      return prev ? prevIndex : currIndex;
    }
    function hasFocus() {
      return !isUndefined(options.focus) || options.isNavigation;
    }
    function isBusy() {
      return Splide2.state.is([MOVING, SCROLLING]) && !!options.waitForTransition;
    }
    return {
      mount,
      go,
      scroll,
      getNext,
      getPrev,
      getAdjacent,
      getEnd,
      setIndex,
      getIndex,
      toIndex,
      toPage,
      toDest,
      hasFocus,
      isBusy
    };
  }
  var XML_NAME_SPACE = "http://www.w3.org/2000/svg";
  var PATH = "m15.5 0.932-4.3 4.38 14.5 14.6-14.5 14.5 4.3 4.4 14.6-14.6 4.4-4.3-4.4-4.4-14.6-14.6z";
  var SIZE = 40;
  function Arrows(Splide2, Components2, options) {
    var event = EventInterface(Splide2);
    var on = event.on, bind = event.bind, emit = event.emit;
    var classes = options.classes, i18n = options.i18n;
    var Elements2 = Components2.Elements, Controller2 = Components2.Controller;
    var placeholder = Elements2.arrows, track = Elements2.track;
    var wrapper = placeholder;
    var prev = Elements2.prev;
    var next = Elements2.next;
    var created;
    var wrapperClasses;
    var arrows = {};
    function mount() {
      init();
      on(EVENT_UPDATED, remount);
    }
    function remount() {
      destroy();
      mount();
    }
    function init() {
      var enabled = options.arrows;
      if (enabled && !(prev && next)) {
        createArrows();
      }
      if (prev && next) {
        assign(arrows, {
          prev,
          next
        });
        display(wrapper, enabled ? "" : "none");
        addClass(wrapper, wrapperClasses = CLASS_ARROWS + "--" + options.direction);
        if (enabled) {
          listen();
          update();
          setAttribute([prev, next], ARIA_CONTROLS, track.id);
          emit(EVENT_ARROWS_MOUNTED, prev, next);
        }
      }
    }
    function destroy() {
      event.destroy();
      removeClass(wrapper, wrapperClasses);
      if (created) {
        remove(placeholder ? [prev, next] : wrapper);
        prev = next = null;
      } else {
        removeAttribute([prev, next], ALL_ATTRIBUTES);
      }
    }
    function listen() {
      on([EVENT_MOUNTED, EVENT_MOVED, EVENT_REFRESH, EVENT_SCROLLED, EVENT_END_INDEX_CHANGED], update);
      bind(next, "click", apply(go, ">"));
      bind(prev, "click", apply(go, "<"));
    }
    function go(control) {
      Controller2.go(control, true);
    }
    function createArrows() {
      wrapper = placeholder || create("div", classes.arrows);
      prev = createArrow(true);
      next = createArrow(false);
      created = true;
      append(wrapper, [prev, next]);
      !placeholder && before(wrapper, track);
    }
    function createArrow(prev2) {
      var arrow = '<button class="' + classes.arrow + " " + (prev2 ? classes.prev : classes.next) + '" type="button"><svg xmlns="' + XML_NAME_SPACE + '" viewBox="0 0 ' + SIZE + " " + SIZE + '" width="' + SIZE + '" height="' + SIZE + '" focusable="false"><path d="' + (options.arrowPath || PATH) + '" />';
      return parseHtml(arrow);
    }
    function update() {
      if (prev && next) {
        var index = Splide2.index;
        var prevIndex = Controller2.getPrev();
        var nextIndex = Controller2.getNext();
        var prevLabel = prevIndex > -1 && index < prevIndex ? i18n.last : i18n.prev;
        var nextLabel = nextIndex > -1 && index > nextIndex ? i18n.first : i18n.next;
        prev.disabled = prevIndex < 0;
        next.disabled = nextIndex < 0;
        setAttribute(prev, ARIA_LABEL, prevLabel);
        setAttribute(next, ARIA_LABEL, nextLabel);
        emit(EVENT_ARROWS_UPDATED, prev, next, prevIndex, nextIndex);
      }
    }
    return {
      arrows,
      mount,
      destroy,
      update
    };
  }
  var INTERVAL_DATA_ATTRIBUTE = DATA_ATTRIBUTE + "-interval";
  function Autoplay(Splide2, Components2, options) {
    var _EventInterface6 = EventInterface(Splide2), on = _EventInterface6.on, bind = _EventInterface6.bind, emit = _EventInterface6.emit;
    var interval = RequestInterval(options.interval, Splide2.go.bind(Splide2, ">"), onAnimationFrame);
    var isPaused = interval.isPaused;
    var Elements2 = Components2.Elements, _Components2$Elements4 = Components2.Elements, root = _Components2$Elements4.root, toggle = _Components2$Elements4.toggle;
    var autoplay = options.autoplay;
    var hovered;
    var focused;
    var stopped = autoplay === "pause";
    function mount() {
      if (autoplay) {
        listen();
        toggle && setAttribute(toggle, ARIA_CONTROLS, Elements2.track.id);
        stopped || play();
        update();
      }
    }
    function listen() {
      if (options.pauseOnHover) {
        bind(root, "mouseenter mouseleave", function(e) {
          hovered = e.type === "mouseenter";
          autoToggle();
        });
      }
      if (options.pauseOnFocus) {
        bind(root, "focusin focusout", function(e) {
          focused = e.type === "focusin";
          autoToggle();
        });
      }
      if (toggle) {
        bind(toggle, "click", function() {
          stopped ? play() : pause(true);
        });
      }
      on([EVENT_MOVE, EVENT_SCROLL, EVENT_REFRESH], interval.rewind);
      on(EVENT_MOVE, onMove);
    }
    function play() {
      if (isPaused() && Components2.Slides.isEnough()) {
        interval.start(!options.resetProgress);
        focused = hovered = stopped = false;
        update();
        emit(EVENT_AUTOPLAY_PLAY);
      }
    }
    function pause(stop) {
      if (stop === void 0) {
        stop = true;
      }
      stopped = !!stop;
      update();
      if (!isPaused()) {
        interval.pause();
        emit(EVENT_AUTOPLAY_PAUSE);
      }
    }
    function autoToggle() {
      if (!stopped) {
        hovered || focused ? pause(false) : play();
      }
    }
    function update() {
      if (toggle) {
        toggleClass(toggle, CLASS_ACTIVE, !stopped);
        setAttribute(toggle, ARIA_LABEL, options.i18n[stopped ? "play" : "pause"]);
      }
    }
    function onAnimationFrame(rate) {
      var bar = Elements2.bar;
      bar && style(bar, "width", rate * 100 + "%");
      emit(EVENT_AUTOPLAY_PLAYING, rate);
    }
    function onMove(index) {
      var Slide2 = Components2.Slides.getAt(index);
      interval.set(Slide2 && +getAttribute(Slide2.slide, INTERVAL_DATA_ATTRIBUTE) || options.interval);
    }
    return {
      mount,
      destroy: interval.cancel,
      play,
      pause,
      isPaused
    };
  }
  function Cover(Splide2, Components2, options) {
    var _EventInterface7 = EventInterface(Splide2), on = _EventInterface7.on;
    function mount() {
      if (options.cover) {
        on(EVENT_LAZYLOAD_LOADED, apply(toggle, true));
        on([EVENT_MOUNTED, EVENT_UPDATED, EVENT_REFRESH], apply(cover, true));
      }
    }
    function cover(cover2) {
      Components2.Slides.forEach(function(Slide2) {
        var img = child(Slide2.container || Slide2.slide, "img");
        if (img && img.src) {
          toggle(cover2, img, Slide2);
        }
      });
    }
    function toggle(cover2, img, Slide2) {
      Slide2.style("background", cover2 ? 'center/cover no-repeat url("' + img.src + '")' : "", true);
      display(img, cover2 ? "none" : "");
    }
    return {
      mount,
      destroy: apply(cover, false)
    };
  }
  var BOUNCE_DIFF_THRESHOLD = 10;
  var BOUNCE_DURATION = 600;
  var FRICTION_FACTOR = 0.6;
  var BASE_VELOCITY = 1.5;
  var MIN_DURATION = 800;
  function Scroll(Splide2, Components2, options) {
    var _EventInterface8 = EventInterface(Splide2), on = _EventInterface8.on, emit = _EventInterface8.emit;
    var set = Splide2.state.set;
    var Move2 = Components2.Move;
    var getPosition = Move2.getPosition, getLimit = Move2.getLimit, exceededLimit = Move2.exceededLimit, translate = Move2.translate;
    var isSlide = Splide2.is(SLIDE);
    var interval;
    var callback;
    var friction = 1;
    function mount() {
      on(EVENT_MOVE, clear);
      on([EVENT_UPDATED, EVENT_REFRESH], cancel);
    }
    function scroll(destination, duration, snap, onScrolled, noConstrain) {
      var from = getPosition();
      clear();
      if (snap && (!isSlide || !exceededLimit())) {
        var size = Components2.Layout.sliderSize();
        var offset = sign(destination) * size * floor(abs(destination) / size) || 0;
        destination = Move2.toPosition(Components2.Controller.toDest(destination % size)) + offset;
      }
      var noDistance = approximatelyEqual(from, destination, 1);
      friction = 1;
      duration = noDistance ? 0 : duration || max(abs(destination - from) / BASE_VELOCITY, MIN_DURATION);
      callback = onScrolled;
      interval = RequestInterval(duration, onEnd, apply(update, from, destination, noConstrain), 1);
      set(SCROLLING);
      emit(EVENT_SCROLL);
      interval.start();
    }
    function onEnd() {
      set(IDLE);
      callback && callback();
      emit(EVENT_SCROLLED);
    }
    function update(from, to, noConstrain, rate) {
      var position = getPosition();
      var target = from + (to - from) * easing(rate);
      var diff = (target - position) * friction;
      translate(position + diff);
      if (isSlide && !noConstrain && exceededLimit()) {
        friction *= FRICTION_FACTOR;
        if (abs(diff) < BOUNCE_DIFF_THRESHOLD) {
          scroll(getLimit(exceededLimit(true)), BOUNCE_DURATION, false, callback, true);
        }
      }
    }
    function clear() {
      if (interval) {
        interval.cancel();
      }
    }
    function cancel() {
      if (interval && !interval.isPaused()) {
        clear();
        onEnd();
      }
    }
    function easing(t) {
      var easingFunc = options.easingFunc;
      return easingFunc ? easingFunc(t) : 1 - Math.pow(1 - t, 4);
    }
    return {
      mount,
      destroy: clear,
      scroll,
      cancel
    };
  }
  var SCROLL_LISTENER_OPTIONS = {
    passive: false,
    capture: true
  };
  function Drag(Splide2, Components2, options) {
    var _EventInterface9 = EventInterface(Splide2), on = _EventInterface9.on, emit = _EventInterface9.emit, bind = _EventInterface9.bind, unbind = _EventInterface9.unbind;
    var state = Splide2.state;
    var Move2 = Components2.Move, Scroll2 = Components2.Scroll, Controller2 = Components2.Controller, track = Components2.Elements.track, reduce = Components2.Media.reduce;
    var _Components2$Directio2 = Components2.Direction, resolve = _Components2$Directio2.resolve, orient = _Components2$Directio2.orient;
    var getPosition = Move2.getPosition, exceededLimit = Move2.exceededLimit;
    var basePosition;
    var baseEvent;
    var prevBaseEvent;
    var isFree;
    var dragging;
    var exceeded = false;
    var clickPrevented;
    var disabled;
    var target;
    function mount() {
      bind(track, POINTER_MOVE_EVENTS, noop, SCROLL_LISTENER_OPTIONS);
      bind(track, POINTER_UP_EVENTS, noop, SCROLL_LISTENER_OPTIONS);
      bind(track, POINTER_DOWN_EVENTS, onPointerDown, SCROLL_LISTENER_OPTIONS);
      bind(track, "click", onClick, {
        capture: true
      });
      bind(track, "dragstart", prevent);
      on([EVENT_MOUNTED, EVENT_UPDATED], init);
    }
    function init() {
      var drag = options.drag;
      disable(!drag);
      isFree = drag === "free";
    }
    function onPointerDown(e) {
      clickPrevented = false;
      if (!disabled) {
        var isTouch = isTouchEvent(e);
        if (isDraggable(e.target) && (isTouch || !e.button)) {
          if (!Controller2.isBusy()) {
            target = isTouch ? track : window;
            dragging = state.is([MOVING, SCROLLING]);
            prevBaseEvent = null;
            bind(target, POINTER_MOVE_EVENTS, onPointerMove, SCROLL_LISTENER_OPTIONS);
            bind(target, POINTER_UP_EVENTS, onPointerUp, SCROLL_LISTENER_OPTIONS);
            Move2.cancel();
            Scroll2.cancel();
            save(e);
          } else {
            prevent(e, true);
          }
        }
      }
    }
    function onPointerMove(e) {
      if (!state.is(DRAGGING)) {
        state.set(DRAGGING);
        emit(EVENT_DRAG);
      }
      if (e.cancelable) {
        if (dragging) {
          Move2.translate(basePosition + constrain(diffCoord(e)));
          var expired = diffTime(e) > LOG_INTERVAL;
          var hasExceeded = exceeded !== (exceeded = exceededLimit());
          if (expired || hasExceeded) {
            save(e);
          }
          clickPrevented = true;
          emit(EVENT_DRAGGING);
          prevent(e);
        } else if (isSliderDirection(e)) {
          dragging = shouldStart(e);
          prevent(e);
        }
      }
    }
    function onPointerUp(e) {
      if (state.is(DRAGGING)) {
        state.set(IDLE);
        emit(EVENT_DRAGGED);
      }
      if (dragging) {
        move(e);
        prevent(e);
      }
      unbind(target, POINTER_MOVE_EVENTS, onPointerMove);
      unbind(target, POINTER_UP_EVENTS, onPointerUp);
      dragging = false;
    }
    function onClick(e) {
      if (!disabled && clickPrevented) {
        prevent(e, true);
      }
    }
    function save(e) {
      prevBaseEvent = baseEvent;
      baseEvent = e;
      basePosition = getPosition();
    }
    function move(e) {
      var velocity = computeVelocity(e);
      var destination = computeDestination(velocity);
      var rewind = options.rewind && options.rewindByDrag;
      reduce(false);
      if (isFree) {
        Controller2.scroll(destination, 0, options.snap);
      } else if (Splide2.is(FADE)) {
        Controller2.go(orient(sign(velocity)) < 0 ? rewind ? "<" : "-" : rewind ? ">" : "+");
      } else if (Splide2.is(SLIDE) && exceeded && rewind) {
        Controller2.go(exceededLimit(true) ? ">" : "<");
      } else {
        Controller2.go(Controller2.toDest(destination), true);
      }
      reduce(true);
    }
    function shouldStart(e) {
      var thresholds = options.dragMinThreshold;
      var isObj = isObject(thresholds);
      var mouse = isObj && thresholds.mouse || 0;
      var touch = (isObj ? thresholds.touch : +thresholds) || 10;
      return abs(diffCoord(e)) > (isTouchEvent(e) ? touch : mouse);
    }
    function isSliderDirection(e) {
      return abs(diffCoord(e)) > abs(diffCoord(e, true));
    }
    function computeVelocity(e) {
      if (Splide2.is(LOOP) || !exceeded) {
        var time = diffTime(e);
        if (time && time < LOG_INTERVAL) {
          return diffCoord(e) / time;
        }
      }
      return 0;
    }
    function computeDestination(velocity) {
      return getPosition() + sign(velocity) * min(abs(velocity) * (options.flickPower || 600), isFree ? Infinity : Components2.Layout.listSize() * (options.flickMaxPages || 1));
    }
    function diffCoord(e, orthogonal) {
      return coordOf(e, orthogonal) - coordOf(getBaseEvent(e), orthogonal);
    }
    function diffTime(e) {
      return timeOf(e) - timeOf(getBaseEvent(e));
    }
    function getBaseEvent(e) {
      return baseEvent === e && prevBaseEvent || baseEvent;
    }
    function coordOf(e, orthogonal) {
      return (isTouchEvent(e) ? e.changedTouches[0] : e)["page" + resolve(orthogonal ? "Y" : "X")];
    }
    function constrain(diff) {
      return diff / (exceeded && Splide2.is(SLIDE) ? FRICTION : 1);
    }
    function isDraggable(target2) {
      var noDrag = options.noDrag;
      return !matches(target2, "." + CLASS_PAGINATION_PAGE + ", ." + CLASS_ARROW) && (!noDrag || !matches(target2, noDrag));
    }
    function isTouchEvent(e) {
      return typeof TouchEvent !== "undefined" && e instanceof TouchEvent;
    }
    function isDragging() {
      return dragging;
    }
    function disable(value) {
      disabled = value;
    }
    return {
      mount,
      disable,
      isDragging
    };
  }
  var NORMALIZATION_MAP = {
    Spacebar: " ",
    Right: ARROW_RIGHT,
    Left: ARROW_LEFT,
    Up: ARROW_UP,
    Down: ARROW_DOWN
  };
  function normalizeKey(key) {
    key = isString(key) ? key : key.key;
    return NORMALIZATION_MAP[key] || key;
  }
  var KEYBOARD_EVENT = "keydown";
  function Keyboard(Splide2, Components2, options) {
    var _EventInterface10 = EventInterface(Splide2), on = _EventInterface10.on, bind = _EventInterface10.bind, unbind = _EventInterface10.unbind;
    var root = Splide2.root;
    var resolve = Components2.Direction.resolve;
    var target;
    var disabled;
    function mount() {
      init();
      on(EVENT_UPDATED, destroy);
      on(EVENT_UPDATED, init);
      on(EVENT_MOVE, onMove);
    }
    function init() {
      var keyboard = options.keyboard;
      if (keyboard) {
        target = keyboard === "global" ? window : root;
        bind(target, KEYBOARD_EVENT, onKeydown);
      }
    }
    function destroy() {
      unbind(target, KEYBOARD_EVENT);
    }
    function disable(value) {
      disabled = value;
    }
    function onMove() {
      var _disabled = disabled;
      disabled = true;
      nextTick(function() {
        disabled = _disabled;
      });
    }
    function onKeydown(e) {
      if (!disabled) {
        var key = normalizeKey(e);
        if (key === resolve(ARROW_LEFT)) {
          Splide2.go("<");
        } else if (key === resolve(ARROW_RIGHT)) {
          Splide2.go(">");
        }
      }
    }
    return {
      mount,
      destroy,
      disable
    };
  }
  var SRC_DATA_ATTRIBUTE = DATA_ATTRIBUTE + "-lazy";
  var SRCSET_DATA_ATTRIBUTE = SRC_DATA_ATTRIBUTE + "-srcset";
  var IMAGE_SELECTOR = "[" + SRC_DATA_ATTRIBUTE + "], [" + SRCSET_DATA_ATTRIBUTE + "]";
  function LazyLoad(Splide2, Components2, options) {
    var _EventInterface11 = EventInterface(Splide2), on = _EventInterface11.on, off = _EventInterface11.off, bind = _EventInterface11.bind, emit = _EventInterface11.emit;
    var isSequential = options.lazyLoad === "sequential";
    var events = [EVENT_MOVED, EVENT_SCROLLED];
    var entries = [];
    function mount() {
      if (options.lazyLoad) {
        init();
        on(EVENT_REFRESH, init);
      }
    }
    function init() {
      empty(entries);
      register();
      if (isSequential) {
        loadNext();
      } else {
        off(events);
        on(events, check);
        check();
      }
    }
    function register() {
      Components2.Slides.forEach(function(Slide2) {
        queryAll(Slide2.slide, IMAGE_SELECTOR).forEach(function(img) {
          var src = getAttribute(img, SRC_DATA_ATTRIBUTE);
          var srcset = getAttribute(img, SRCSET_DATA_ATTRIBUTE);
          if (src !== img.src || srcset !== img.srcset) {
            var className = options.classes.spinner;
            var parent = img.parentElement;
            var spinner = child(parent, "." + className) || create("span", className, parent);
            entries.push([img, Slide2, spinner]);
            img.src || display(img, "none");
          }
        });
      });
    }
    function check() {
      entries = entries.filter(function(data) {
        var distance = options.perPage * ((options.preloadPages || 1) + 1) - 1;
        return data[1].isWithin(Splide2.index, distance) ? load(data) : true;
      });
      entries.length || off(events);
    }
    function load(data) {
      var img = data[0];
      addClass(data[1].slide, CLASS_LOADING);
      bind(img, "load error", apply(onLoad, data));
      setAttribute(img, "src", getAttribute(img, SRC_DATA_ATTRIBUTE));
      setAttribute(img, "srcset", getAttribute(img, SRCSET_DATA_ATTRIBUTE));
      removeAttribute(img, SRC_DATA_ATTRIBUTE);
      removeAttribute(img, SRCSET_DATA_ATTRIBUTE);
    }
    function onLoad(data, e) {
      var img = data[0], Slide2 = data[1];
      removeClass(Slide2.slide, CLASS_LOADING);
      if (e.type !== "error") {
        remove(data[2]);
        display(img, "");
        emit(EVENT_LAZYLOAD_LOADED, img, Slide2);
        emit(EVENT_RESIZE);
      }
      isSequential && loadNext();
    }
    function loadNext() {
      entries.length && load(entries.shift());
    }
    return {
      mount,
      destroy: apply(empty, entries),
      check
    };
  }
  function Pagination(Splide2, Components2, options) {
    var event = EventInterface(Splide2);
    var on = event.on, emit = event.emit, bind = event.bind;
    var Slides2 = Components2.Slides, Elements2 = Components2.Elements, Controller2 = Components2.Controller;
    var hasFocus = Controller2.hasFocus, getIndex = Controller2.getIndex, go = Controller2.go;
    var resolve = Components2.Direction.resolve;
    var placeholder = Elements2.pagination;
    var items = [];
    var list;
    var paginationClasses;
    function mount() {
      destroy();
      on([EVENT_UPDATED, EVENT_REFRESH, EVENT_END_INDEX_CHANGED], mount);
      var enabled = options.pagination;
      placeholder && display(placeholder, enabled ? "" : "none");
      if (enabled) {
        on([EVENT_MOVE, EVENT_SCROLL, EVENT_SCROLLED], update);
        createPagination();
        update();
        emit(EVENT_PAGINATION_MOUNTED, {
          list,
          items
        }, getAt(Splide2.index));
      }
    }
    function destroy() {
      if (list) {
        remove(placeholder ? slice(list.children) : list);
        removeClass(list, paginationClasses);
        empty(items);
        list = null;
      }
      event.destroy();
    }
    function createPagination() {
      var length = Splide2.length;
      var classes = options.classes, i18n = options.i18n, perPage = options.perPage;
      var max3 = hasFocus() ? Controller2.getEnd() + 1 : ceil(length / perPage);
      list = placeholder || create("ul", classes.pagination, Elements2.track.parentElement);
      addClass(list, paginationClasses = CLASS_PAGINATION + "--" + getDirection());
      setAttribute(list, ROLE, "tablist");
      setAttribute(list, ARIA_LABEL, i18n.select);
      setAttribute(list, ARIA_ORIENTATION, getDirection() === TTB ? "vertical" : "");
      for (var i = 0; i < max3; i++) {
        var li = create("li", null, list);
        var button = create("button", {
          class: classes.page,
          type: "button"
        }, li);
        var controls = Slides2.getIn(i).map(function(Slide2) {
          return Slide2.slide.id;
        });
        var text = !hasFocus() && perPage > 1 ? i18n.pageX : i18n.slideX;
        bind(button, "click", apply(onClick, i));
        if (options.paginationKeyboard) {
          bind(button, "keydown", apply(onKeydown, i));
        }
        setAttribute(li, ROLE, "presentation");
        setAttribute(button, ROLE, "tab");
        setAttribute(button, ARIA_CONTROLS, controls.join(" "));
        setAttribute(button, ARIA_LABEL, format(text, i + 1));
        setAttribute(button, TAB_INDEX, -1);
        items.push({
          li,
          button,
          page: i
        });
      }
    }
    function onClick(page) {
      go(">" + page, true);
    }
    function onKeydown(page, e) {
      var length = items.length;
      var key = normalizeKey(e);
      var dir = getDirection();
      var nextPage = -1;
      if (key === resolve(ARROW_RIGHT, false, dir)) {
        nextPage = ++page % length;
      } else if (key === resolve(ARROW_LEFT, false, dir)) {
        nextPage = (--page + length) % length;
      } else if (key === "Home") {
        nextPage = 0;
      } else if (key === "End") {
        nextPage = length - 1;
      }
      var item = items[nextPage];
      if (item) {
        focus(item.button);
        go(">" + nextPage);
        prevent(e, true);
      }
    }
    function getDirection() {
      return options.paginationDirection || options.direction;
    }
    function getAt(index) {
      return items[Controller2.toPage(index)];
    }
    function update() {
      var prev = getAt(getIndex(true));
      var curr = getAt(getIndex());
      if (prev) {
        var button = prev.button;
        removeClass(button, CLASS_ACTIVE);
        removeAttribute(button, ARIA_SELECTED);
        setAttribute(button, TAB_INDEX, -1);
      }
      if (curr) {
        var _button = curr.button;
        addClass(_button, CLASS_ACTIVE);
        setAttribute(_button, ARIA_SELECTED, true);
        setAttribute(_button, TAB_INDEX, "");
      }
      emit(EVENT_PAGINATION_UPDATED, {
        list,
        items
      }, prev, curr);
    }
    return {
      items,
      mount,
      destroy,
      getAt,
      update
    };
  }
  var TRIGGER_KEYS = [" ", "Enter"];
  function Sync(Splide2, Components2, options) {
    var isNavigation = options.isNavigation, slideFocus = options.slideFocus;
    var events = [];
    function mount() {
      Splide2.splides.forEach(function(target) {
        if (!target.isParent) {
          sync(Splide2, target.splide);
          sync(target.splide, Splide2);
        }
      });
      if (isNavigation) {
        navigate();
      }
    }
    function destroy() {
      events.forEach(function(event) {
        event.destroy();
      });
      empty(events);
    }
    function remount() {
      destroy();
      mount();
    }
    function sync(splide, target) {
      var event = EventInterface(splide);
      event.on(EVENT_MOVE, function(index, prev, dest) {
        target.go(target.is(LOOP) ? dest : index);
      });
      events.push(event);
    }
    function navigate() {
      var event = EventInterface(Splide2);
      var on = event.on;
      on(EVENT_CLICK, onClick);
      on(EVENT_SLIDE_KEYDOWN, onKeydown);
      on([EVENT_MOUNTED, EVENT_UPDATED], update);
      events.push(event);
      event.emit(EVENT_NAVIGATION_MOUNTED, Splide2.splides);
    }
    function update() {
      setAttribute(Components2.Elements.list, ARIA_ORIENTATION, options.direction === TTB ? "vertical" : "");
    }
    function onClick(Slide2) {
      Splide2.go(Slide2.index);
    }
    function onKeydown(Slide2, e) {
      if (includes(TRIGGER_KEYS, normalizeKey(e))) {
        onClick(Slide2);
        prevent(e);
      }
    }
    return {
      setup: apply(Components2.Media.set, {
        slideFocus: isUndefined(slideFocus) ? isNavigation : slideFocus
      }, true),
      mount,
      destroy,
      remount
    };
  }
  function Wheel(Splide2, Components2, options) {
    var _EventInterface12 = EventInterface(Splide2), bind = _EventInterface12.bind;
    var lastTime = 0;
    function mount() {
      if (options.wheel) {
        bind(Components2.Elements.track, "wheel", onWheel, SCROLL_LISTENER_OPTIONS);
      }
    }
    function onWheel(e) {
      if (e.cancelable) {
        var deltaY = e.deltaY;
        var backwards = deltaY < 0;
        var timeStamp = timeOf(e);
        var _min = options.wheelMinThreshold || 0;
        var sleep = options.wheelSleep || 0;
        if (abs(deltaY) > _min && timeStamp - lastTime > sleep) {
          Splide2.go(backwards ? "<" : ">");
          lastTime = timeStamp;
        }
        shouldPrevent(backwards) && prevent(e);
      }
    }
    function shouldPrevent(backwards) {
      return !options.releaseWheel || Splide2.state.is(MOVING) || Components2.Controller.getAdjacent(backwards) !== -1;
    }
    return {
      mount
    };
  }
  var SR_REMOVAL_DELAY = 90;
  function Live(Splide2, Components2, options) {
    var _EventInterface13 = EventInterface(Splide2), on = _EventInterface13.on;
    var track = Components2.Elements.track;
    var enabled = options.live && !options.isNavigation;
    var sr = create("span", CLASS_SR);
    var interval = RequestInterval(SR_REMOVAL_DELAY, apply(toggle, false));
    function mount() {
      if (enabled) {
        disable(!Components2.Autoplay.isPaused());
        setAttribute(track, ARIA_ATOMIC, true);
        sr.textContent = "\u2026";
        on(EVENT_AUTOPLAY_PLAY, apply(disable, true));
        on(EVENT_AUTOPLAY_PAUSE, apply(disable, false));
        on([EVENT_MOVED, EVENT_SCROLLED], apply(toggle, true));
      }
    }
    function toggle(active) {
      setAttribute(track, ARIA_BUSY, active);
      if (active) {
        append(track, sr);
        interval.start();
      } else {
        remove(sr);
        interval.cancel();
      }
    }
    function destroy() {
      removeAttribute(track, [ARIA_LIVE, ARIA_ATOMIC, ARIA_BUSY]);
      remove(sr);
    }
    function disable(disabled) {
      if (enabled) {
        setAttribute(track, ARIA_LIVE, disabled ? "off" : "polite");
      }
    }
    return {
      mount,
      disable,
      destroy
    };
  }
  var ComponentConstructors = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    Media,
    Direction,
    Elements,
    Slides,
    Layout,
    Clones,
    Move,
    Controller,
    Arrows,
    Autoplay,
    Cover,
    Scroll,
    Drag,
    Keyboard,
    LazyLoad,
    Pagination,
    Sync,
    Wheel,
    Live
  });
  var I18N = {
    prev: "Previous slide",
    next: "Next slide",
    first: "Go to first slide",
    last: "Go to last slide",
    slideX: "Go to slide %s",
    pageX: "Go to page %s",
    play: "Start autoplay",
    pause: "Pause autoplay",
    carousel: "carousel",
    slide: "slide",
    select: "Select a slide to show",
    slideLabel: "%s of %s"
  };
  var DEFAULTS = {
    type: "slide",
    role: "region",
    speed: 400,
    perPage: 1,
    cloneStatus: true,
    arrows: true,
    pagination: true,
    paginationKeyboard: true,
    interval: 5e3,
    pauseOnHover: true,
    pauseOnFocus: true,
    resetProgress: true,
    easing: "cubic-bezier(0.25, 1, 0.5, 1)",
    drag: true,
    direction: "ltr",
    trimSpace: true,
    focusableNodes: "a, button, textarea, input, select, iframe",
    live: true,
    classes: CLASSES,
    i18n: I18N,
    reducedMotion: {
      speed: 0,
      rewindSpeed: 0,
      autoplay: "pause"
    }
  };
  function Fade(Splide2, Components2, options) {
    var Slides2 = Components2.Slides;
    function mount() {
      EventInterface(Splide2).on([EVENT_MOUNTED, EVENT_REFRESH], init);
    }
    function init() {
      Slides2.forEach(function(Slide2) {
        Slide2.style("transform", "translateX(-" + 100 * Slide2.index + "%)");
      });
    }
    function start(index, done) {
      Slides2.style("transition", "opacity " + options.speed + "ms " + options.easing);
      nextTick(done);
    }
    return {
      mount,
      start,
      cancel: noop
    };
  }
  function Slide(Splide2, Components2, options) {
    var Move2 = Components2.Move, Controller2 = Components2.Controller, Scroll2 = Components2.Scroll;
    var list = Components2.Elements.list;
    var transition = apply(style, list, "transition");
    var endCallback;
    function mount() {
      EventInterface(Splide2).bind(list, "transitionend", function(e) {
        if (e.target === list && endCallback) {
          cancel();
          endCallback();
        }
      });
    }
    function start(index, done) {
      var destination = Move2.toPosition(index, true);
      var position = Move2.getPosition();
      var speed = getSpeed(index);
      if (abs(destination - position) >= 1 && speed >= 1) {
        if (options.useScroll) {
          Scroll2.scroll(destination, speed, false, done);
        } else {
          transition("transform " + speed + "ms " + options.easing);
          Move2.translate(destination, true);
          endCallback = done;
        }
      } else {
        Move2.jump(index);
        done();
      }
    }
    function cancel() {
      transition("");
      Scroll2.cancel();
    }
    function getSpeed(index) {
      var rewindSpeed = options.rewindSpeed;
      if (Splide2.is(SLIDE) && rewindSpeed) {
        var prev = Controller2.getIndex(true);
        var end = Controller2.getEnd();
        if (prev === 0 && index >= end || prev >= end && index === 0) {
          return rewindSpeed;
        }
      }
      return options.speed;
    }
    return {
      mount,
      start,
      cancel
    };
  }
  var _Splide = /* @__PURE__ */ (function() {
    function _Splide2(target, options) {
      this.event = EventInterface();
      this.Components = {};
      this.state = State(CREATED);
      this.splides = [];
      this._o = {};
      this._E = {};
      var root = isString(target) ? query(document, target) : target;
      assert(root, root + " is invalid.");
      this.root = root;
      options = merge({
        label: getAttribute(root, ARIA_LABEL) || "",
        labelledby: getAttribute(root, ARIA_LABELLEDBY) || ""
      }, DEFAULTS, _Splide2.defaults, options || {});
      try {
        merge(options, JSON.parse(getAttribute(root, DATA_ATTRIBUTE)));
      } catch (e) {
        assert(false, "Invalid JSON");
      }
      this._o = Object.create(merge({}, options));
    }
    var _proto = _Splide2.prototype;
    _proto.mount = function mount(Extensions, Transition) {
      var _this = this;
      var state = this.state, Components2 = this.Components;
      assert(state.is([CREATED, DESTROYED]), "Already mounted!");
      state.set(CREATED);
      this._C = Components2;
      this._T = Transition || this._T || (this.is(FADE) ? Fade : Slide);
      this._E = Extensions || this._E;
      var Constructors = assign({}, ComponentConstructors, this._E, {
        Transition: this._T
      });
      forOwn(Constructors, function(Component, key) {
        var component = Component(_this, Components2, _this._o);
        Components2[key] = component;
        component.setup && component.setup();
      });
      forOwn(Components2, function(component) {
        component.mount && component.mount();
      });
      this.emit(EVENT_MOUNTED);
      addClass(this.root, CLASS_INITIALIZED);
      state.set(IDLE);
      this.emit(EVENT_READY);
      return this;
    };
    _proto.sync = function sync(splide) {
      this.splides.push({
        splide
      });
      splide.splides.push({
        splide: this,
        isParent: true
      });
      if (this.state.is(IDLE)) {
        this._C.Sync.remount();
        splide.Components.Sync.remount();
      }
      return this;
    };
    _proto.go = function go(control) {
      this._C.Controller.go(control);
      return this;
    };
    _proto.on = function on(events, callback) {
      this.event.on(events, callback);
      return this;
    };
    _proto.off = function off(events) {
      this.event.off(events);
      return this;
    };
    _proto.emit = function emit(event) {
      var _this$event;
      (_this$event = this.event).emit.apply(_this$event, [event].concat(slice(arguments, 1)));
      return this;
    };
    _proto.add = function add(slides, index) {
      this._C.Slides.add(slides, index);
      return this;
    };
    _proto.remove = function remove3(matcher) {
      this._C.Slides.remove(matcher);
      return this;
    };
    _proto.is = function is(type) {
      return this._o.type === type;
    };
    _proto.refresh = function refresh() {
      this.emit(EVENT_REFRESH);
      return this;
    };
    _proto.destroy = function destroy(completely) {
      if (completely === void 0) {
        completely = true;
      }
      var event = this.event, state = this.state;
      if (state.is(CREATED)) {
        EventInterface(this).on(EVENT_READY, this.destroy.bind(this, completely));
      } else {
        forOwn(this._C, function(component) {
          component.destroy && component.destroy(completely);
        }, true);
        event.emit(EVENT_DESTROY);
        event.destroy();
        completely && empty(this.splides);
        state.set(DESTROYED);
      }
      return this;
    };
    _createClass(_Splide2, [{
      key: "options",
      get: function get() {
        return this._o;
      },
      set: function set(options) {
        this._C.Media.set(options, true, true);
      }
    }, {
      key: "length",
      get: function get() {
        return this._C.Slides.getLength(true);
      }
    }, {
      key: "index",
      get: function get() {
        return this._C.Controller.getIndex();
      }
    }]);
    return _Splide2;
  })();
  var Splide = _Splide;
  Splide.defaults = {};
  Splide.STATES = STATES;

  // node_modules/@splidejs/splide-extension-video/dist/js/splide-extension-video.esm.js
  function empty2(array) {
    array.length = 0;
  }
  function slice$1(arrayLike, start, end) {
    return Array.prototype.slice.call(arrayLike, start, end);
  }
  function apply$1(func) {
    return func.bind.apply(func, [null].concat(slice$1(arguments, 1)));
  }
  function typeOf$1(type, subject) {
    return typeof subject === type;
  }
  var isArray$1 = Array.isArray;
  apply$1(typeOf$1, "function");
  apply$1(typeOf$1, "string");
  apply$1(typeOf$1, "undefined");
  function toArray$1(value) {
    return isArray$1(value) ? value : [value];
  }
  function forEach$1(values, iteratee) {
    toArray$1(values).forEach(iteratee);
  }
  function includes2(array, value) {
    return array.indexOf(value) > -1;
  }
  var ownKeys$1 = Object.keys;
  function forOwn$1(object, iteratee, right) {
    if (object) {
      var keys = ownKeys$1(object);
      keys = right ? keys.reverse() : keys;
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        if (key !== "__proto__") {
          if (iteratee(object[key], key) === false) {
            break;
          }
        }
      }
    }
    return object;
  }
  function assign$1(object) {
    slice$1(arguments, 1).forEach(function(source) {
      forOwn$1(source, function(value, key) {
        object[key] = source[key];
      });
    });
    return object;
  }
  var PROJECT_CODE$1 = "splide";
  function EventBinder2() {
    var listeners = [];
    function bind(targets, events, callback, options) {
      forEachEvent(targets, events, function(target, event, namespace) {
        var isEventTarget = "addEventListener" in target;
        var remover = isEventTarget ? target.removeEventListener.bind(target, event, callback, options) : target["removeListener"].bind(target, callback);
        isEventTarget ? target.addEventListener(event, callback, options) : target["addListener"](callback);
        listeners.push([target, event, namespace, callback, remover]);
      });
    }
    function unbind(targets, events, callback) {
      forEachEvent(targets, events, function(target, event, namespace) {
        listeners = listeners.filter(function(listener) {
          if (listener[0] === target && listener[1] === event && listener[2] === namespace && (!callback || listener[3] === callback)) {
            listener[4]();
            return false;
          }
          return true;
        });
      });
    }
    function dispatch(target, type, detail) {
      var e;
      var bubbles = true;
      if (typeof CustomEvent === "function") {
        e = new CustomEvent(type, {
          bubbles,
          detail
        });
      } else {
        e = document.createEvent("CustomEvent");
        e.initCustomEvent(type, bubbles, false, detail);
      }
      target.dispatchEvent(e);
      return e;
    }
    function forEachEvent(targets, events, iteratee) {
      forEach$1(targets, function(target) {
        target && forEach$1(events, function(events2) {
          events2.split(" ").forEach(function(eventNS) {
            var fragment = eventNS.split(".");
            iteratee(target, fragment[0], fragment[1]);
          });
        });
      });
    }
    function destroy() {
      listeners.forEach(function(data) {
        data[4]();
      });
      empty2(listeners);
    }
    return {
      bind,
      unbind,
      dispatch,
      destroy
    };
  }
  var EVENT_MOUNTED2 = "mounted";
  var EVENT_MOVE2 = "move";
  var EVENT_MOVED2 = "moved";
  var EVENT_DRAG2 = "drag";
  var EVENT_DRAGGING2 = "dragging";
  var EVENT_SCROLL2 = "scroll";
  var EVENT_SCROLLED2 = "scrolled";
  var EVENT_DESTROY2 = "destroy";
  function EventInterface2(Splide2) {
    var bus = Splide2 ? Splide2.event.bus : document.createDocumentFragment();
    var binder = EventBinder2();
    function on(events, callback) {
      binder.bind(bus, toArray$1(events).join(" "), function(e) {
        callback.apply(callback, isArray$1(e.detail) ? e.detail : []);
      });
    }
    function emit(event) {
      binder.dispatch(bus, event, slice$1(arguments, 1));
    }
    if (Splide2) {
      Splide2.event.on(EVENT_DESTROY2, binder.destroy);
    }
    return assign$1(binder, {
      bus,
      on,
      off: apply$1(binder.unbind, bus),
      emit
    });
  }
  function State2(initialState) {
    var state = initialState;
    function set(value) {
      state = value;
    }
    function is(states) {
      return includes2(toArray$1(states), state);
    }
    return {
      set,
      is
    };
  }
  var CLASS_SLIDE2 = PROJECT_CODE$1 + "__slide";
  var CLASS_CONTAINER2 = CLASS_SLIDE2 + "__container";
  function slice2(arrayLike, start, end) {
    return Array.prototype.slice.call(arrayLike, start, end);
  }
  function find(arrayLike, predicate) {
    return slice2(arrayLike).filter(predicate)[0];
  }
  function apply2(func) {
    return func.bind(null, ...slice2(arguments, 1));
  }
  function typeOf2(type, subject) {
    return typeof subject === type;
  }
  function isObject2(subject) {
    return !isNull2(subject) && typeOf2("object", subject);
  }
  var isArray2 = Array.isArray;
  var isFunction2 = apply2(typeOf2, "function");
  var isString2 = apply2(typeOf2, "string");
  var isUndefined2 = apply2(typeOf2, "undefined");
  function isNull2(subject) {
    return subject === null;
  }
  function isHTMLElement2(subject) {
    return subject instanceof HTMLElement;
  }
  function toArray2(value) {
    return isArray2(value) ? value : [value];
  }
  function forEach2(values, iteratee) {
    toArray2(values).forEach(iteratee);
  }
  function toggleClass2(elm, classes, add) {
    if (elm) {
      forEach2(classes, (name) => {
        if (name) {
          elm.classList[add ? "add" : "remove"](name);
        }
      });
    }
  }
  function addClass2(elm, classes) {
    toggleClass2(elm, isString2(classes) ? classes.split(" ") : classes, true);
  }
  function append2(parent, children3) {
    forEach2(children3, parent.appendChild.bind(parent));
  }
  function matches2(elm, selector) {
    return isHTMLElement2(elm) && (elm["msMatchesSelector"] || elm.matches).call(elm, selector);
  }
  function children2(parent, selector) {
    const children22 = parent ? slice2(parent.children) : [];
    return selector ? children22.filter((child3) => matches2(child3, selector)) : children22;
  }
  function child2(parent, selector) {
    return selector ? children2(parent, selector)[0] : parent.firstElementChild;
  }
  var ownKeys2 = Object.keys;
  function forOwn2(object, iteratee, right) {
    if (object) {
      let keys = ownKeys2(object);
      keys = right ? keys.reverse() : keys;
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        if (key !== "__proto__") {
          if (iteratee(object[key], key) === false) {
            break;
          }
        }
      }
    }
    return object;
  }
  function assign2(object) {
    slice2(arguments, 1).forEach((source) => {
      forOwn2(source, (value, key) => {
        object[key] = source[key];
      });
    });
    return object;
  }
  function merge2(object) {
    slice2(arguments, 1).forEach((source) => {
      forOwn2(source, (value, key) => {
        if (isArray2(value)) {
          object[key] = value.slice();
        } else if (isObject2(value)) {
          object[key] = merge2({}, isObject2(object[key]) ? object[key] : {}, value);
        } else {
          object[key] = value;
        }
      });
    });
    return object;
  }
  function removeAttribute2(elms, attrs) {
    forEach2(elms, (elm) => {
      forEach2(attrs, (attr) => {
        elm && elm.removeAttribute(attr);
      });
    });
  }
  function setAttribute2(elms, attrs, value) {
    if (isObject2(attrs)) {
      forOwn2(attrs, (value2, name) => {
        setAttribute2(elms, name, value2);
      });
    } else {
      forEach2(elms, (elm) => {
        isNull2(value) || value === "" ? removeAttribute2(elm, attrs) : elm.setAttribute(attrs, String(value));
      });
    }
  }
  function create2(tag, attrs, parent) {
    const elm = document.createElement(tag);
    if (attrs) {
      isString2(attrs) ? addClass2(elm, attrs) : setAttribute2(elm, attrs);
    }
    parent && append2(parent, elm);
    return elm;
  }
  function style2(elm, prop, value) {
    if (isUndefined2(value)) {
      return getComputedStyle(elm)[prop];
    }
    if (!isNull2(value)) {
      elm.style[prop] = `${value}`;
    }
  }
  function display2(elm, display22) {
    style2(elm, "display", display22);
  }
  function getAttribute2(elm, attr) {
    return elm.getAttribute(attr);
  }
  function hasClass2(elm, className) {
    return elm && elm.classList.contains(className);
  }
  function remove2(nodes) {
    forEach2(nodes, (node) => {
      if (node && node.parentNode) {
        node.parentNode.removeChild(node);
      }
    });
  }
  function queryAll2(parent, selector) {
    return selector ? slice2(parent.querySelectorAll(selector)) : [];
  }
  function removeClass2(elm, classes) {
    toggleClass2(elm, classes, false);
  }
  var PROJECT_CODE2 = "splide";
  function error(message) {
    console.error(`[${PROJECT_CODE2}] ${message}`);
  }
  var { min: min2, max: max2, floor: floor2, ceil: ceil2, abs: abs2 } = Math;
  function clamp2(number, x, y) {
    const minimum = min2(x, y);
    const maximum = max2(x, y);
    return min2(max2(minimum, number), maximum);
  }
  var CLASS_VIDEO = "splide__video";
  var CLASS_VIDEO_WRAPPER = `${CLASS_VIDEO}__wrapper`;
  var CLASS_VIDEO_PLAY_BUTTON = `${CLASS_VIDEO}__play`;
  var CLASS_PLAYING = "is-playing";
  var CLASS_ERROR = "is-error";
  var CLASS_VIDEO_DISABLED = "is-video-disabled";
  var MODIFIER_HAS_VIDEO = "--has-video";
  var YOUTUBE_DATA_ATTRIBUTE = "data-splide-youtube";
  var VIMEO_DATA_ATTRIBUTE = "data-splide-vimeo";
  var HTML_VIDEO__DATA_ATTRIBUTE = "data-splide-html-video";
  var DEFAULTS2 = {
    hideControls: false,
    loop: false,
    mute: false,
    volume: 0.2
  };
  var EVENT_VIDEO_PLAY = "video:play";
  var EVENT_VIDEO_PAUSE = "video:pause";
  var EVENT_VIDEO_ENDED = "video:ended";
  var EVENT_VIDEO_ERROR = "video:error";
  var EVENT_VIDEO_CLICK = "video:click";
  var NOT_INITIALIZED = 1;
  var INITIALIZING = 2;
  var INITIALIZED = 3;
  var PENDING_PLAY = 4;
  var IDLE2 = 5;
  var LOADING = 6;
  var PLAY_REQUEST_ABORTED = 7;
  var PLAYING = 8;
  var ERROR = 9;
  var AbstractVideoPlayer = class {
    constructor(target, videoId, options) {
      this.state = State2(NOT_INITIALIZED);
      this.event = EventInterface2();
      this.target = target;
      this.videoId = videoId;
      this.options = options || {};
      this.onPlay = this.onPlay.bind(this);
      this.onPause = this.onPause.bind(this);
      this.onEnded = this.onEnded.bind(this);
      this.onPlayerReady = this.onPlayerReady.bind(this);
      this.onError = this.onError.bind(this);
    }
    on(events, callback) {
      this.event.on(events, callback);
    }
    play() {
      const { state } = this;
      if (state.is(ERROR)) {
        error("Can not play this video.");
        return;
      }
      this.event.emit("play");
      if (state.is(INITIALIZING)) {
        return state.set(PENDING_PLAY);
      }
      if (state.is(INITIALIZED)) {
        this.player = this.createPlayer(this.videoId);
        return state.set(PENDING_PLAY);
      }
      if (state.is([PENDING_PLAY, PLAYING])) {
        return;
      }
      if (state.is(IDLE2)) {
        state.set(LOADING);
        this.playVideo();
      }
    }
    pause() {
      const { state } = this;
      if (state.is(ERROR)) {
        return;
      }
      this.event.emit("pause");
      if (state.is(PENDING_PLAY)) {
        return state.set(INITIALIZING);
      }
      if (state.is(LOADING)) {
        return state.set(PLAY_REQUEST_ABORTED);
      }
      if (state.is(PLAYING)) {
        this.pauseVideo();
        this.state.set(IDLE2);
      }
    }
    isPaused() {
      return !this.state.is(PLAYING);
    }
    destroy() {
      this.event.destroy();
    }
    onPlayerReady() {
      const { state } = this;
      const isPending = state.is(PENDING_PLAY);
      state.set(IDLE2);
      if (isPending) {
        this.play();
      }
    }
    onPlay() {
      const { state } = this;
      const aborted = state.is(PLAY_REQUEST_ABORTED);
      state.set(PLAYING);
      if (aborted) {
        this.pause();
      } else {
        this.event.emit("played");
      }
    }
    onPause() {
      this.state.set(IDLE2);
      this.event.emit("paused");
    }
    onEnded() {
      this.state.set(IDLE2);
      this.event.emit("ended");
    }
    onError() {
      this.state.set(ERROR);
      this.event.emit("error");
    }
  };
  var HTMLVideoPlayer = class extends AbstractVideoPlayer {
    constructor(target, videoId, options = {}) {
      super(target, videoId, options);
      this.state.set(INITIALIZED);
    }
    createPlayer(videoId) {
      const { options, options: { playerOptions = {} } } = this;
      const player = create2("video", { src: videoId }, this.target);
      const on = player.addEventListener.bind(player);
      assign2(player, {
        controls: !options.hideControls,
        loop: options.loop,
        volume: clamp2(options.volume, 0, 1),
        muted: options.mute
      }, playerOptions.htmlVideo || {});
      on("play", this.onPlay);
      on("pause", this.onPause);
      on("ended", this.onEnded);
      on("loadeddata", this.onPlayerReady);
      on("error", this.onError);
      return player;
    }
    playVideo() {
      const promise = this.player.play();
      promise && promise.catch(this.onError.bind(this));
    }
    pauseVideo() {
      this.player.pause();
    }
    onError() {
      if (this.state.is(PLAY_REQUEST_ABORTED)) {
        this.state.set(IDLE2);
      } else {
        super.onError();
      }
    }
    destroy() {
      super.destroy();
      const { player } = this;
      const off = player.addEventListener.bind(player);
      off("play", this.onPlay);
      off("pause", this.onPause);
      off("ended", this.onEnded);
      off("loadeddata", this.onPlayerReady);
    }
  };
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties2(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  function _createClass2(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties2(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties2(Constructor, staticProps);
    return Constructor;
  }
  var isNode = typeof global !== "undefined" && {}.toString.call(global) === "[object global]";
  function getMethodName(prop, type) {
    if (prop.indexOf(type.toLowerCase()) === 0) {
      return prop;
    }
    return "".concat(type.toLowerCase()).concat(prop.substr(0, 1).toUpperCase()).concat(prop.substr(1));
  }
  function isDomElement(element) {
    return Boolean(element && element.nodeType === 1 && "nodeName" in element && element.ownerDocument && element.ownerDocument.defaultView);
  }
  function isInteger(value) {
    return !isNaN(parseFloat(value)) && isFinite(value) && Math.floor(value) == value;
  }
  function isVimeoUrl(url) {
    return /^(https?:)?\/\/((player|www)\.)?vimeo\.com(?=$|\/)/.test(url);
  }
  function isVimeoEmbed(url) {
    var expr = /^https:\/\/player\.vimeo\.com\/video\/\d+/;
    return expr.test(url);
  }
  function getVimeoUrl() {
    var oEmbedParameters2 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    var id = oEmbedParameters2.id;
    var url = oEmbedParameters2.url;
    var idOrUrl = id || url;
    if (!idOrUrl) {
      throw new Error("An id or url must be passed, either in an options object or as a data-vimeo-id or data-vimeo-url attribute.");
    }
    if (isInteger(idOrUrl)) {
      return "https://vimeo.com/".concat(idOrUrl);
    }
    if (isVimeoUrl(idOrUrl)) {
      return idOrUrl.replace("http:", "https:");
    }
    if (id) {
      throw new TypeError("\u201C".concat(id, "\u201D is not a valid video id."));
    }
    throw new TypeError("\u201C".concat(idOrUrl, "\u201D is not a vimeo.com url."));
  }
  var arrayIndexOfSupport = typeof Array.prototype.indexOf !== "undefined";
  var postMessageSupport = typeof window !== "undefined" && typeof window.postMessage !== "undefined";
  if (!isNode && (!arrayIndexOfSupport || !postMessageSupport)) {
    throw new Error("Sorry, the Vimeo Player API is not available in this browser.");
  }
  var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
  function createCommonjsModule(fn, module) {
    return module = { exports: {} }, fn(module, module.exports), module.exports;
  }
  (function(self2) {
    if (self2.WeakMap) {
      return;
    }
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var hasDefine = Object.defineProperty && (function() {
      try {
        return Object.defineProperty({}, "x", {
          value: 1
        }).x === 1;
      } catch (e) {
      }
    })();
    var defineProperty = function(object, name, value) {
      if (hasDefine) {
        Object.defineProperty(object, name, {
          configurable: true,
          writable: true,
          value
        });
      } else {
        object[name] = value;
      }
    };
    self2.WeakMap = (function() {
      function WeakMap2() {
        if (this === void 0) {
          throw new TypeError("Constructor WeakMap requires 'new'");
        }
        defineProperty(this, "_id", genId("_WeakMap"));
        if (arguments.length > 0) {
          throw new TypeError("WeakMap iterable is not supported");
        }
      }
      defineProperty(WeakMap2.prototype, "delete", function(key) {
        checkInstance(this, "delete");
        if (!isObject3(key)) {
          return false;
        }
        var entry = key[this._id];
        if (entry && entry[0] === key) {
          delete key[this._id];
          return true;
        }
        return false;
      });
      defineProperty(WeakMap2.prototype, "get", function(key) {
        checkInstance(this, "get");
        if (!isObject3(key)) {
          return void 0;
        }
        var entry = key[this._id];
        if (entry && entry[0] === key) {
          return entry[1];
        }
        return void 0;
      });
      defineProperty(WeakMap2.prototype, "has", function(key) {
        checkInstance(this, "has");
        if (!isObject3(key)) {
          return false;
        }
        var entry = key[this._id];
        if (entry && entry[0] === key) {
          return true;
        }
        return false;
      });
      defineProperty(WeakMap2.prototype, "set", function(key, value) {
        checkInstance(this, "set");
        if (!isObject3(key)) {
          throw new TypeError("Invalid value used as weak map key");
        }
        var entry = key[this._id];
        if (entry && entry[0] === key) {
          entry[1] = value;
          return this;
        }
        defineProperty(key, this._id, [key, value]);
        return this;
      });
      function checkInstance(x, methodName) {
        if (!isObject3(x) || !hasOwnProperty.call(x, "_id")) {
          throw new TypeError(methodName + " method called on incompatible receiver " + typeof x);
        }
      }
      function genId(prefix) {
        return prefix + "_" + rand() + "." + rand();
      }
      function rand() {
        return Math.random().toString().substring(2);
      }
      defineProperty(WeakMap2, "_polyfill", true);
      return WeakMap2;
    })();
    function isObject3(x) {
      return Object(x) === x;
    }
  })(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof commonjsGlobal !== "undefined" ? commonjsGlobal : commonjsGlobal);
  var npo_src = createCommonjsModule(function(module) {
    (function UMD(name, context, definition) {
      context[name] = context[name] || definition();
      if (module.exports) {
        module.exports = context[name];
      }
    })("Promise", typeof commonjsGlobal != "undefined" ? commonjsGlobal : commonjsGlobal, function DEF() {
      var builtInProp, cycle, scheduling_queue, ToString = Object.prototype.toString, timer = typeof setImmediate != "undefined" ? function timer2(fn) {
        return setImmediate(fn);
      } : setTimeout;
      try {
        Object.defineProperty({}, "x", {});
        builtInProp = function builtInProp2(obj, name, val, config) {
          return Object.defineProperty(obj, name, {
            value: val,
            writable: true,
            configurable: config !== false
          });
        };
      } catch (err) {
        builtInProp = function builtInProp2(obj, name, val) {
          obj[name] = val;
          return obj;
        };
      }
      scheduling_queue = /* @__PURE__ */ (function Queue() {
        var first, last, item;
        function Item(fn, self2) {
          this.fn = fn;
          this.self = self2;
          this.next = void 0;
        }
        return {
          add: function add(fn, self2) {
            item = new Item(fn, self2);
            if (last) {
              last.next = item;
            } else {
              first = item;
            }
            last = item;
            item = void 0;
          },
          drain: function drain() {
            var f = first;
            first = last = cycle = void 0;
            while (f) {
              f.fn.call(f.self);
              f = f.next;
            }
          }
        };
      })();
      function schedule(fn, self2) {
        scheduling_queue.add(fn, self2);
        if (!cycle) {
          cycle = timer(scheduling_queue.drain);
        }
      }
      function isThenable(o) {
        var _then, o_type = typeof o;
        if (o != null && (o_type == "object" || o_type == "function")) {
          _then = o.then;
        }
        return typeof _then == "function" ? _then : false;
      }
      function notify() {
        for (var i = 0; i < this.chain.length; i++) {
          notifyIsolated(this, this.state === 1 ? this.chain[i].success : this.chain[i].failure, this.chain[i]);
        }
        this.chain.length = 0;
      }
      function notifyIsolated(self2, cb, chain) {
        var ret, _then;
        try {
          if (cb === false) {
            chain.reject(self2.msg);
          } else {
            if (cb === true) {
              ret = self2.msg;
            } else {
              ret = cb.call(void 0, self2.msg);
            }
            if (ret === chain.promise) {
              chain.reject(TypeError("Promise-chain cycle"));
            } else if (_then = isThenable(ret)) {
              _then.call(ret, chain.resolve, chain.reject);
            } else {
              chain.resolve(ret);
            }
          }
        } catch (err) {
          chain.reject(err);
        }
      }
      function resolve(msg) {
        var _then, self2 = this;
        if (self2.triggered) {
          return;
        }
        self2.triggered = true;
        if (self2.def) {
          self2 = self2.def;
        }
        try {
          if (_then = isThenable(msg)) {
            schedule(function() {
              var def_wrapper = new MakeDefWrapper(self2);
              try {
                _then.call(msg, function $resolve$() {
                  resolve.apply(def_wrapper, arguments);
                }, function $reject$() {
                  reject.apply(def_wrapper, arguments);
                });
              } catch (err) {
                reject.call(def_wrapper, err);
              }
            });
          } else {
            self2.msg = msg;
            self2.state = 1;
            if (self2.chain.length > 0) {
              schedule(notify, self2);
            }
          }
        } catch (err) {
          reject.call(new MakeDefWrapper(self2), err);
        }
      }
      function reject(msg) {
        var self2 = this;
        if (self2.triggered) {
          return;
        }
        self2.triggered = true;
        if (self2.def) {
          self2 = self2.def;
        }
        self2.msg = msg;
        self2.state = 2;
        if (self2.chain.length > 0) {
          schedule(notify, self2);
        }
      }
      function iteratePromises(Constructor, arr, resolver, rejecter) {
        for (var idx = 0; idx < arr.length; idx++) {
          (function IIFE(idx2) {
            Constructor.resolve(arr[idx2]).then(function $resolver$(msg) {
              resolver(idx2, msg);
            }, rejecter);
          })(idx);
        }
      }
      function MakeDefWrapper(self2) {
        this.def = self2;
        this.triggered = false;
      }
      function MakeDef(self2) {
        this.promise = self2;
        this.state = 0;
        this.triggered = false;
        this.chain = [];
        this.msg = void 0;
      }
      function Promise2(executor) {
        if (typeof executor != "function") {
          throw TypeError("Not a function");
        }
        if (this.__NPO__ !== 0) {
          throw TypeError("Not a promise");
        }
        this.__NPO__ = 1;
        var def = new MakeDef(this);
        this["then"] = function then(success, failure) {
          var o = {
            success: typeof success == "function" ? success : true,
            failure: typeof failure == "function" ? failure : false
          };
          o.promise = new this.constructor(function extractChain(resolve2, reject2) {
            if (typeof resolve2 != "function" || typeof reject2 != "function") {
              throw TypeError("Not a function");
            }
            o.resolve = resolve2;
            o.reject = reject2;
          });
          def.chain.push(o);
          if (def.state !== 0) {
            schedule(notify, def);
          }
          return o.promise;
        };
        this["catch"] = function $catch$(failure) {
          return this.then(void 0, failure);
        };
        try {
          executor.call(void 0, function publicResolve(msg) {
            resolve.call(def, msg);
          }, function publicReject(msg) {
            reject.call(def, msg);
          });
        } catch (err) {
          reject.call(def, err);
        }
      }
      var PromisePrototype = builtInProp(
        {},
        "constructor",
        Promise2,
        /*configurable=*/
        false
      );
      Promise2.prototype = PromisePrototype;
      builtInProp(
        PromisePrototype,
        "__NPO__",
        0,
        /*configurable=*/
        false
      );
      builtInProp(Promise2, "resolve", function Promise$resolve(msg) {
        var Constructor = this;
        if (msg && typeof msg == "object" && msg.__NPO__ === 1) {
          return msg;
        }
        return new Constructor(function executor(resolve2, reject2) {
          if (typeof resolve2 != "function" || typeof reject2 != "function") {
            throw TypeError("Not a function");
          }
          resolve2(msg);
        });
      });
      builtInProp(Promise2, "reject", function Promise$reject(msg) {
        return new this(function executor(resolve2, reject2) {
          if (typeof resolve2 != "function" || typeof reject2 != "function") {
            throw TypeError("Not a function");
          }
          reject2(msg);
        });
      });
      builtInProp(Promise2, "all", function Promise$all(arr) {
        var Constructor = this;
        if (ToString.call(arr) != "[object Array]") {
          return Constructor.reject(TypeError("Not an array"));
        }
        if (arr.length === 0) {
          return Constructor.resolve([]);
        }
        return new Constructor(function executor(resolve2, reject2) {
          if (typeof resolve2 != "function" || typeof reject2 != "function") {
            throw TypeError("Not a function");
          }
          var len = arr.length, msgs = Array(len), count = 0;
          iteratePromises(Constructor, arr, function resolver(idx, msg) {
            msgs[idx] = msg;
            if (++count === len) {
              resolve2(msgs);
            }
          }, reject2);
        });
      });
      builtInProp(Promise2, "race", function Promise$race(arr) {
        var Constructor = this;
        if (ToString.call(arr) != "[object Array]") {
          return Constructor.reject(TypeError("Not an array"));
        }
        return new Constructor(function executor(resolve2, reject2) {
          if (typeof resolve2 != "function" || typeof reject2 != "function") {
            throw TypeError("Not a function");
          }
          iteratePromises(Constructor, arr, function resolver(idx, msg) {
            resolve2(msg);
          }, reject2);
        });
      });
      return Promise2;
    });
  });
  var callbackMap = /* @__PURE__ */ new WeakMap();
  function storeCallback(player, name, callback) {
    var playerCallbacks = callbackMap.get(player.element) || {};
    if (!(name in playerCallbacks)) {
      playerCallbacks[name] = [];
    }
    playerCallbacks[name].push(callback);
    callbackMap.set(player.element, playerCallbacks);
  }
  function getCallbacks(player, name) {
    var playerCallbacks = callbackMap.get(player.element) || {};
    return playerCallbacks[name] || [];
  }
  function removeCallback(player, name, callback) {
    var playerCallbacks = callbackMap.get(player.element) || {};
    if (!playerCallbacks[name]) {
      return true;
    }
    if (!callback) {
      playerCallbacks[name] = [];
      callbackMap.set(player.element, playerCallbacks);
      return true;
    }
    var index = playerCallbacks[name].indexOf(callback);
    if (index !== -1) {
      playerCallbacks[name].splice(index, 1);
    }
    callbackMap.set(player.element, playerCallbacks);
    return playerCallbacks[name] && playerCallbacks[name].length === 0;
  }
  function shiftCallbacks(player, name) {
    var playerCallbacks = getCallbacks(player, name);
    if (playerCallbacks.length < 1) {
      return false;
    }
    var callback = playerCallbacks.shift();
    removeCallback(player, name, callback);
    return callback;
  }
  function swapCallbacks(oldElement, newElement) {
    var playerCallbacks = callbackMap.get(oldElement);
    callbackMap.set(newElement, playerCallbacks);
    callbackMap.delete(oldElement);
  }
  function parseMessageData(data) {
    if (typeof data === "string") {
      try {
        data = JSON.parse(data);
      } catch (error2) {
        console.warn(error2);
        return {};
      }
    }
    return data;
  }
  function postMessage(player, method, params) {
    if (!player.element.contentWindow || !player.element.contentWindow.postMessage) {
      return;
    }
    var message = {
      method
    };
    if (params !== void 0) {
      message.value = params;
    }
    var ieVersion = parseFloat(navigator.userAgent.toLowerCase().replace(/^.*msie (\d+).*$/, "$1"));
    if (ieVersion >= 8 && ieVersion < 10) {
      message = JSON.stringify(message);
    }
    player.element.contentWindow.postMessage(message, player.origin);
  }
  function processData(player, data) {
    data = parseMessageData(data);
    var callbacks = [];
    var param;
    if (data.event) {
      if (data.event === "error") {
        var promises = getCallbacks(player, data.data.method);
        promises.forEach(function(promise) {
          var error2 = new Error(data.data.message);
          error2.name = data.data.name;
          promise.reject(error2);
          removeCallback(player, data.data.method, promise);
        });
      }
      callbacks = getCallbacks(player, "event:".concat(data.event));
      param = data.data;
    } else if (data.method) {
      var callback = shiftCallbacks(player, data.method);
      if (callback) {
        callbacks.push(callback);
        param = data.value;
      }
    }
    callbacks.forEach(function(callback2) {
      try {
        if (typeof callback2 === "function") {
          callback2.call(player, param);
          return;
        }
        callback2.resolve(param);
      } catch (e) {
      }
    });
  }
  var oEmbedParameters = ["autopause", "autoplay", "background", "byline", "color", "controls", "dnt", "height", "id", "interactive_params", "keyboard", "loop", "maxheight", "maxwidth", "muted", "playsinline", "portrait", "responsive", "speed", "texttrack", "title", "transparent", "url", "width"];
  function getOEmbedParameters(element) {
    var defaults = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    return oEmbedParameters.reduce(function(params, param) {
      var value = element.getAttribute("data-vimeo-".concat(param));
      if (value || value === "") {
        params[param] = value === "" ? 1 : value;
      }
      return params;
    }, defaults);
  }
  function createEmbed(_ref, element) {
    var html = _ref.html;
    if (!element) {
      throw new TypeError("An element must be provided");
    }
    if (element.getAttribute("data-vimeo-initialized") !== null) {
      return element.querySelector("iframe");
    }
    var div = document.createElement("div");
    div.innerHTML = html;
    element.appendChild(div.firstChild);
    element.setAttribute("data-vimeo-initialized", "true");
    return element.querySelector("iframe");
  }
  function getOEmbedData(videoUrl) {
    var params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    var element = arguments.length > 2 ? arguments[2] : void 0;
    return new Promise(function(resolve, reject) {
      if (!isVimeoUrl(videoUrl)) {
        throw new TypeError("\u201C".concat(videoUrl, "\u201D is not a vimeo.com url."));
      }
      var url = "https://vimeo.com/api/oembed.json?url=".concat(encodeURIComponent(videoUrl));
      for (var param in params) {
        if (params.hasOwnProperty(param)) {
          url += "&".concat(param, "=").concat(encodeURIComponent(params[param]));
        }
      }
      var xhr = "XDomainRequest" in window ? new XDomainRequest() : new XMLHttpRequest();
      xhr.open("GET", url, true);
      xhr.onload = function() {
        if (xhr.status === 404) {
          reject(new Error("\u201C".concat(videoUrl, "\u201D was not found.")));
          return;
        }
        if (xhr.status === 403) {
          reject(new Error("\u201C".concat(videoUrl, "\u201D is not embeddable.")));
          return;
        }
        try {
          var json = JSON.parse(xhr.responseText);
          if (json.domain_status_code === 403) {
            createEmbed(json, element);
            reject(new Error("\u201C".concat(videoUrl, "\u201D is not embeddable.")));
            return;
          }
          resolve(json);
        } catch (error2) {
          reject(error2);
        }
      };
      xhr.onerror = function() {
        var status = xhr.status ? " (".concat(xhr.status, ")") : "";
        reject(new Error("There was an error fetching the embed code from Vimeo".concat(status, ".")));
      };
      xhr.send();
    });
  }
  function initializeEmbeds() {
    var parent = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : document;
    var elements = [].slice.call(parent.querySelectorAll("[data-vimeo-id], [data-vimeo-url]"));
    var handleError = function handleError2(error2) {
      if ("console" in window && console.error) {
        console.error("There was an error creating an embed: ".concat(error2));
      }
    };
    elements.forEach(function(element) {
      try {
        if (element.getAttribute("data-vimeo-defer") !== null) {
          return;
        }
        var params = getOEmbedParameters(element);
        var url = getVimeoUrl(params);
        getOEmbedData(url, params, element).then(function(data) {
          return createEmbed(data, element);
        }).catch(handleError);
      } catch (error2) {
        handleError(error2);
      }
    });
  }
  function resizeEmbeds() {
    var parent = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : document;
    if (window.VimeoPlayerResizeEmbeds_) {
      return;
    }
    window.VimeoPlayerResizeEmbeds_ = true;
    var onMessage = function onMessage2(event) {
      if (!isVimeoUrl(event.origin)) {
        return;
      }
      if (!event.data || event.data.event !== "spacechange") {
        return;
      }
      var iframes = parent.querySelectorAll("iframe");
      for (var i = 0; i < iframes.length; i++) {
        if (iframes[i].contentWindow !== event.source) {
          continue;
        }
        var space = iframes[i].parentElement;
        space.style.paddingBottom = "".concat(event.data.data[0].bottom, "px");
        break;
      }
    };
    window.addEventListener("message", onMessage);
  }
  function initAppendVideoMetadata() {
    var parent = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : document;
    if (window.VimeoSeoMetadataAppended) {
      return;
    }
    window.VimeoSeoMetadataAppended = true;
    var onMessage = function onMessage2(event) {
      if (!isVimeoUrl(event.origin)) {
        return;
      }
      var data = parseMessageData(event.data);
      if (!data || data.event !== "ready") {
        return;
      }
      var iframes = parent.querySelectorAll("iframe");
      for (var i = 0; i < iframes.length; i++) {
        var iframe = iframes[i];
        var isValidMessageSource = iframe.contentWindow === event.source;
        if (isVimeoEmbed(iframe.src) && isValidMessageSource) {
          var player = new Player$1(iframe);
          player.callMethod("appendVideoMetadata", window.location.href);
        }
      }
    };
    window.addEventListener("message", onMessage);
  }
  function initializeScreenfull() {
    var fn = (function() {
      var val;
      var fnMap = [
        ["requestFullscreen", "exitFullscreen", "fullscreenElement", "fullscreenEnabled", "fullscreenchange", "fullscreenerror"],
        // New WebKit
        ["webkitRequestFullscreen", "webkitExitFullscreen", "webkitFullscreenElement", "webkitFullscreenEnabled", "webkitfullscreenchange", "webkitfullscreenerror"],
        // Old WebKit
        ["webkitRequestFullScreen", "webkitCancelFullScreen", "webkitCurrentFullScreenElement", "webkitCancelFullScreen", "webkitfullscreenchange", "webkitfullscreenerror"],
        ["mozRequestFullScreen", "mozCancelFullScreen", "mozFullScreenElement", "mozFullScreenEnabled", "mozfullscreenchange", "mozfullscreenerror"],
        ["msRequestFullscreen", "msExitFullscreen", "msFullscreenElement", "msFullscreenEnabled", "MSFullscreenChange", "MSFullscreenError"]
      ];
      var i = 0;
      var l = fnMap.length;
      var ret = {};
      for (; i < l; i++) {
        val = fnMap[i];
        if (val && val[1] in document) {
          for (i = 0; i < val.length; i++) {
            ret[fnMap[0][i]] = val[i];
          }
          return ret;
        }
      }
      return false;
    })();
    var eventNameMap = {
      fullscreenchange: fn.fullscreenchange,
      fullscreenerror: fn.fullscreenerror
    };
    var screenfull2 = {
      request: function request(element) {
        return new Promise(function(resolve, reject) {
          var onFullScreenEntered = function onFullScreenEntered2() {
            screenfull2.off("fullscreenchange", onFullScreenEntered2);
            resolve();
          };
          screenfull2.on("fullscreenchange", onFullScreenEntered);
          element = element || document.documentElement;
          var returnPromise = element[fn.requestFullscreen]();
          if (returnPromise instanceof Promise) {
            returnPromise.then(onFullScreenEntered).catch(reject);
          }
        });
      },
      exit: function exit() {
        return new Promise(function(resolve, reject) {
          if (!screenfull2.isFullscreen) {
            resolve();
            return;
          }
          var onFullScreenExit = function onFullScreenExit2() {
            screenfull2.off("fullscreenchange", onFullScreenExit2);
            resolve();
          };
          screenfull2.on("fullscreenchange", onFullScreenExit);
          var returnPromise = document[fn.exitFullscreen]();
          if (returnPromise instanceof Promise) {
            returnPromise.then(onFullScreenExit).catch(reject);
          }
        });
      },
      on: function on(event, callback) {
        var eventName = eventNameMap[event];
        if (eventName) {
          document.addEventListener(eventName, callback);
        }
      },
      off: function off(event, callback) {
        var eventName = eventNameMap[event];
        if (eventName) {
          document.removeEventListener(eventName, callback);
        }
      }
    };
    Object.defineProperties(screenfull2, {
      isFullscreen: {
        get: function get() {
          return Boolean(document[fn.fullscreenElement]);
        }
      },
      element: {
        enumerable: true,
        get: function get() {
          return document[fn.fullscreenElement];
        }
      },
      isEnabled: {
        enumerable: true,
        get: function get() {
          return Boolean(document[fn.fullscreenEnabled]);
        }
      }
    });
    return screenfull2;
  }
  var playerMap = /* @__PURE__ */ new WeakMap();
  var readyMap = /* @__PURE__ */ new WeakMap();
  var screenfull = {};
  var Player$1 = /* @__PURE__ */ (function() {
    function Player2(element) {
      var _this = this;
      var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      _classCallCheck(this, Player2);
      if (window.jQuery && element instanceof jQuery) {
        if (element.length > 1 && window.console && console.warn) {
          console.warn("A jQuery object with multiple elements was passed, using the first element.");
        }
        element = element[0];
      }
      if (typeof document !== "undefined" && typeof element === "string") {
        element = document.getElementById(element);
      }
      if (!isDomElement(element)) {
        throw new TypeError("You must pass either a valid element or a valid id.");
      }
      if (element.nodeName !== "IFRAME") {
        var iframe = element.querySelector("iframe");
        if (iframe) {
          element = iframe;
        }
      }
      if (element.nodeName === "IFRAME" && !isVimeoUrl(element.getAttribute("src") || "")) {
        throw new Error("The player element passed isn\u2019t a Vimeo embed.");
      }
      if (playerMap.has(element)) {
        return playerMap.get(element);
      }
      this._window = element.ownerDocument.defaultView;
      this.element = element;
      this.origin = "*";
      var readyPromise = new npo_src(function(resolve, reject) {
        _this._onMessage = function(event) {
          if (!isVimeoUrl(event.origin) || _this.element.contentWindow !== event.source) {
            return;
          }
          if (_this.origin === "*") {
            _this.origin = event.origin;
          }
          var data = parseMessageData(event.data);
          var isError = data && data.event === "error";
          var isReadyError = isError && data.data && data.data.method === "ready";
          if (isReadyError) {
            var error2 = new Error(data.data.message);
            error2.name = data.data.name;
            reject(error2);
            return;
          }
          var isReadyEvent = data && data.event === "ready";
          var isPingResponse = data && data.method === "ping";
          if (isReadyEvent || isPingResponse) {
            _this.element.setAttribute("data-ready", "true");
            resolve();
            return;
          }
          processData(_this, data);
        };
        _this._window.addEventListener("message", _this._onMessage);
        if (_this.element.nodeName !== "IFRAME") {
          var params = getOEmbedParameters(element, options);
          var url = getVimeoUrl(params);
          getOEmbedData(url, params, element).then(function(data) {
            var iframe2 = createEmbed(data, element);
            _this.element = iframe2;
            _this._originalElement = element;
            swapCallbacks(element, iframe2);
            playerMap.set(_this.element, _this);
            return data;
          }).catch(reject);
        }
      });
      readyMap.set(this, readyPromise);
      playerMap.set(this.element, this);
      if (this.element.nodeName === "IFRAME") {
        postMessage(this, "ping");
      }
      if (screenfull.isEnabled) {
        var exitFullscreen = function exitFullscreen2() {
          return screenfull.exit();
        };
        this.fullscreenchangeHandler = function() {
          if (screenfull.isFullscreen) {
            storeCallback(_this, "event:exitFullscreen", exitFullscreen);
          } else {
            removeCallback(_this, "event:exitFullscreen", exitFullscreen);
          }
          _this.ready().then(function() {
            postMessage(_this, "fullscreenchange", screenfull.isFullscreen);
          });
        };
        screenfull.on("fullscreenchange", this.fullscreenchangeHandler);
      }
      return this;
    }
    _createClass2(Player2, [{
      key: "callMethod",
      value: function callMethod(name) {
        var _this2 = this;
        var args = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        return new npo_src(function(resolve, reject) {
          return _this2.ready().then(function() {
            storeCallback(_this2, name, {
              resolve,
              reject
            });
            postMessage(_this2, name, args);
          }).catch(reject);
        });
      }
      /**
       * Get a promise for the value of a player property.
       *
       * @param {string} name The property name
       * @return {Promise}
       */
    }, {
      key: "get",
      value: function get(name) {
        var _this3 = this;
        return new npo_src(function(resolve, reject) {
          name = getMethodName(name, "get");
          return _this3.ready().then(function() {
            storeCallback(_this3, name, {
              resolve,
              reject
            });
            postMessage(_this3, name);
          }).catch(reject);
        });
      }
      /**
       * Get a promise for setting the value of a player property.
       *
       * @param {string} name The API method to call.
       * @param {mixed} value The value to set.
       * @return {Promise}
       */
    }, {
      key: "set",
      value: function set(name, value) {
        var _this4 = this;
        return new npo_src(function(resolve, reject) {
          name = getMethodName(name, "set");
          if (value === void 0 || value === null) {
            throw new TypeError("There must be a value to set.");
          }
          return _this4.ready().then(function() {
            storeCallback(_this4, name, {
              resolve,
              reject
            });
            postMessage(_this4, name, value);
          }).catch(reject);
        });
      }
      /**
       * Add an event listener for the specified event. Will call the
       * callback with a single parameter, `data`, that contains the data for
       * that event.
       *
       * @param {string} eventName The name of the event.
       * @param {function(*)} callback The function to call when the event fires.
       * @return {void}
       */
    }, {
      key: "on",
      value: function on(eventName, callback) {
        if (!eventName) {
          throw new TypeError("You must pass an event name.");
        }
        if (!callback) {
          throw new TypeError("You must pass a callback function.");
        }
        if (typeof callback !== "function") {
          throw new TypeError("The callback must be a function.");
        }
        var callbacks = getCallbacks(this, "event:".concat(eventName));
        if (callbacks.length === 0) {
          this.callMethod("addEventListener", eventName).catch(function() {
          });
        }
        storeCallback(this, "event:".concat(eventName), callback);
      }
      /**
       * Remove an event listener for the specified event. Will remove all
       * listeners for that event if a `callback` isn’t passed, or only that
       * specific callback if it is passed.
       *
       * @param {string} eventName The name of the event.
       * @param {function} [callback] The specific callback to remove.
       * @return {void}
       */
    }, {
      key: "off",
      value: function off(eventName, callback) {
        if (!eventName) {
          throw new TypeError("You must pass an event name.");
        }
        if (callback && typeof callback !== "function") {
          throw new TypeError("The callback must be a function.");
        }
        var lastCallback = removeCallback(this, "event:".concat(eventName), callback);
        if (lastCallback) {
          this.callMethod("removeEventListener", eventName).catch(function(e) {
          });
        }
      }
      /**
       * A promise to load a new video.
       *
       * @promise LoadVideoPromise
       * @fulfill {number} The video with this id or url successfully loaded.
       * @reject {TypeError} The id was not a number.
       */
      /**
       * Load a new video into this embed. The promise will be resolved if
       * the video is successfully loaded, or it will be rejected if it could
       * not be loaded.
       *
       * @param {number|string|object} options The id of the video, the url of the video, or an object with embed options.
       * @return {LoadVideoPromise}
       */
    }, {
      key: "loadVideo",
      value: function loadVideo(options) {
        return this.callMethod("loadVideo", options);
      }
      /**
       * A promise to perform an action when the Player is ready.
       *
       * @todo document errors
       * @promise LoadVideoPromise
       * @fulfill {void}
       */
      /**
       * Trigger a function when the player iframe has initialized. You do not
       * need to wait for `ready` to trigger to begin adding event listeners
       * or calling other methods.
       *
       * @return {ReadyPromise}
       */
    }, {
      key: "ready",
      value: function ready() {
        var readyPromise = readyMap.get(this) || new npo_src(function(resolve, reject) {
          reject(new Error("Unknown player. Probably unloaded."));
        });
        return npo_src.resolve(readyPromise);
      }
      /**
       * A promise to add a cue point to the player.
       *
       * @promise AddCuePointPromise
       * @fulfill {string} The id of the cue point to use for removeCuePoint.
       * @reject {RangeError} the time was less than 0 or greater than the
       *         video’s duration.
       * @reject {UnsupportedError} Cue points are not supported with the current
       *         player or browser.
       */
      /**
       * Add a cue point to the player.
       *
       * @param {number} time The time for the cue point.
       * @param {object} [data] Arbitrary data to be returned with the cue point.
       * @return {AddCuePointPromise}
       */
    }, {
      key: "addCuePoint",
      value: function addCuePoint(time) {
        var data = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        return this.callMethod("addCuePoint", {
          time,
          data
        });
      }
      /**
       * A promise to remove a cue point from the player.
       *
       * @promise AddCuePointPromise
       * @fulfill {string} The id of the cue point that was removed.
       * @reject {InvalidCuePoint} The cue point with the specified id was not
       *         found.
       * @reject {UnsupportedError} Cue points are not supported with the current
       *         player or browser.
       */
      /**
       * Remove a cue point from the video.
       *
       * @param {string} id The id of the cue point to remove.
       * @return {RemoveCuePointPromise}
       */
    }, {
      key: "removeCuePoint",
      value: function removeCuePoint(id) {
        return this.callMethod("removeCuePoint", id);
      }
      /**
       * A representation of a text track on a video.
       *
       * @typedef {Object} VimeoTextTrack
       * @property {string} language The ISO language code.
       * @property {string} kind The kind of track it is (captions or subtitles).
       * @property {string} label The human‐readable label for the track.
       */
      /**
       * A promise to enable a text track.
       *
       * @promise EnableTextTrackPromise
       * @fulfill {VimeoTextTrack} The text track that was enabled.
       * @reject {InvalidTrackLanguageError} No track was available with the
       *         specified language.
       * @reject {InvalidTrackError} No track was available with the specified
       *         language and kind.
       */
      /**
       * Enable the text track with the specified language, and optionally the
       * specified kind (captions or subtitles).
       *
       * When set via the API, the track language will not change the viewer’s
       * stored preference.
       *
       * @param {string} language The two‐letter language code.
       * @param {string} [kind] The kind of track to enable (captions or subtitles).
       * @return {EnableTextTrackPromise}
       */
    }, {
      key: "enableTextTrack",
      value: function enableTextTrack(language, kind) {
        if (!language) {
          throw new TypeError("You must pass a language.");
        }
        return this.callMethod("enableTextTrack", {
          language,
          kind
        });
      }
      /**
       * A promise to disable the active text track.
       *
       * @promise DisableTextTrackPromise
       * @fulfill {void} The track was disabled.
       */
      /**
       * Disable the currently-active text track.
       *
       * @return {DisableTextTrackPromise}
       */
    }, {
      key: "disableTextTrack",
      value: function disableTextTrack() {
        return this.callMethod("disableTextTrack");
      }
      /**
       * A promise to pause the video.
       *
       * @promise PausePromise
       * @fulfill {void} The video was paused.
       */
      /**
       * Pause the video if it’s playing.
       *
       * @return {PausePromise}
       */
    }, {
      key: "pause",
      value: function pause() {
        return this.callMethod("pause");
      }
      /**
       * A promise to play the video.
       *
       * @promise PlayPromise
       * @fulfill {void} The video was played.
       */
      /**
       * Play the video if it’s paused. **Note:** on iOS and some other
       * mobile devices, you cannot programmatically trigger play. Once the
       * viewer has tapped on the play button in the player, however, you
       * will be able to use this function.
       *
       * @return {PlayPromise}
       */
    }, {
      key: "play",
      value: function play() {
        return this.callMethod("play");
      }
      /**
       * Request that the player enters fullscreen.
       * @return {Promise}
       */
    }, {
      key: "requestFullscreen",
      value: function requestFullscreen() {
        if (screenfull.isEnabled) {
          return screenfull.request(this.element);
        }
        return this.callMethod("requestFullscreen");
      }
      /**
       * Request that the player exits fullscreen.
       * @return {Promise}
       */
    }, {
      key: "exitFullscreen",
      value: function exitFullscreen() {
        if (screenfull.isEnabled) {
          return screenfull.exit();
        }
        return this.callMethod("exitFullscreen");
      }
      /**
       * Returns true if the player is currently fullscreen.
       * @return {Promise}
       */
    }, {
      key: "getFullscreen",
      value: function getFullscreen() {
        if (screenfull.isEnabled) {
          return npo_src.resolve(screenfull.isFullscreen);
        }
        return this.get("fullscreen");
      }
      /**
       * Request that the player enters picture-in-picture.
       * @return {Promise}
       */
    }, {
      key: "requestPictureInPicture",
      value: function requestPictureInPicture() {
        return this.callMethod("requestPictureInPicture");
      }
      /**
       * Request that the player exits picture-in-picture.
       * @return {Promise}
       */
    }, {
      key: "exitPictureInPicture",
      value: function exitPictureInPicture() {
        return this.callMethod("exitPictureInPicture");
      }
      /**
       * Returns true if the player is currently picture-in-picture.
       * @return {Promise}
       */
    }, {
      key: "getPictureInPicture",
      value: function getPictureInPicture() {
        return this.get("pictureInPicture");
      }
      /**
       * A promise to unload the video.
       *
       * @promise UnloadPromise
       * @fulfill {void} The video was unloaded.
       */
      /**
       * Return the player to its initial state.
       *
       * @return {UnloadPromise}
       */
    }, {
      key: "unload",
      value: function unload() {
        return this.callMethod("unload");
      }
      /**
       * Cleanup the player and remove it from the DOM
       *
       * It won't be usable and a new one should be constructed
       *  in order to do any operations.
       *
       * @return {Promise}
       */
    }, {
      key: "destroy",
      value: function destroy() {
        var _this5 = this;
        return new npo_src(function(resolve) {
          readyMap.delete(_this5);
          playerMap.delete(_this5.element);
          if (_this5._originalElement) {
            playerMap.delete(_this5._originalElement);
            _this5._originalElement.removeAttribute("data-vimeo-initialized");
          }
          if (_this5.element && _this5.element.nodeName === "IFRAME" && _this5.element.parentNode) {
            if (_this5.element.parentNode.parentNode && _this5._originalElement && _this5._originalElement !== _this5.element.parentNode) {
              _this5.element.parentNode.parentNode.removeChild(_this5.element.parentNode);
            } else {
              _this5.element.parentNode.removeChild(_this5.element);
            }
          }
          if (_this5.element && _this5.element.nodeName === "DIV" && _this5.element.parentNode) {
            _this5.element.removeAttribute("data-vimeo-initialized");
            var iframe = _this5.element.querySelector("iframe");
            if (iframe && iframe.parentNode) {
              if (iframe.parentNode.parentNode && _this5._originalElement && _this5._originalElement !== iframe.parentNode) {
                iframe.parentNode.parentNode.removeChild(iframe.parentNode);
              } else {
                iframe.parentNode.removeChild(iframe);
              }
            }
          }
          _this5._window.removeEventListener("message", _this5._onMessage);
          if (screenfull.isEnabled) {
            screenfull.off("fullscreenchange", _this5.fullscreenchangeHandler);
          }
          resolve();
        });
      }
      /**
       * A promise to get the autopause behavior of the video.
       *
       * @promise GetAutopausePromise
       * @fulfill {boolean} Whether autopause is turned on or off.
       * @reject {UnsupportedError} Autopause is not supported with the current
       *         player or browser.
       */
      /**
       * Get the autopause behavior for this player.
       *
       * @return {GetAutopausePromise}
       */
    }, {
      key: "getAutopause",
      value: function getAutopause() {
        return this.get("autopause");
      }
      /**
       * A promise to set the autopause behavior of the video.
       *
       * @promise SetAutopausePromise
       * @fulfill {boolean} Whether autopause is turned on or off.
       * @reject {UnsupportedError} Autopause is not supported with the current
       *         player or browser.
       */
      /**
       * Enable or disable the autopause behavior of this player.
       *
       * By default, when another video is played in the same browser, this
       * player will automatically pause. Unless you have a specific reason
       * for doing so, we recommend that you leave autopause set to the
       * default (`true`).
       *
       * @param {boolean} autopause
       * @return {SetAutopausePromise}
       */
    }, {
      key: "setAutopause",
      value: function setAutopause(autopause) {
        return this.set("autopause", autopause);
      }
      /**
       * A promise to get the buffered property of the video.
       *
       * @promise GetBufferedPromise
       * @fulfill {Array} Buffered Timeranges converted to an Array.
       */
      /**
       * Get the buffered property of the video.
       *
       * @return {GetBufferedPromise}
       */
    }, {
      key: "getBuffered",
      value: function getBuffered() {
        return this.get("buffered");
      }
      /**
       * @typedef {Object} CameraProperties
       * @prop {number} props.yaw - Number between 0 and 360.
       * @prop {number} props.pitch - Number between -90 and 90.
       * @prop {number} props.roll - Number between -180 and 180.
       * @prop {number} props.fov - The field of view in degrees.
       */
      /**
       * A promise to get the camera properties of the player.
       *
       * @promise GetCameraPromise
       * @fulfill {CameraProperties} The camera properties.
       */
      /**
       * For 360° videos get the camera properties for this player.
       *
       * @return {GetCameraPromise}
       */
    }, {
      key: "getCameraProps",
      value: function getCameraProps() {
        return this.get("cameraProps");
      }
      /**
       * A promise to set the camera properties of the player.
       *
       * @promise SetCameraPromise
       * @fulfill {Object} The camera was successfully set.
       * @reject {RangeError} The range was out of bounds.
       */
      /**
       * For 360° videos set the camera properties for this player.
       *
       * @param {CameraProperties} camera The camera properties
       * @return {SetCameraPromise}
       */
    }, {
      key: "setCameraProps",
      value: function setCameraProps(camera) {
        return this.set("cameraProps", camera);
      }
      /**
       * A representation of a chapter.
       *
       * @typedef {Object} VimeoChapter
       * @property {number} startTime The start time of the chapter.
       * @property {object} title The title of the chapter.
       * @property {number} index The place in the order of Chapters. Starts at 1.
       */
      /**
       * A promise to get chapters for the video.
       *
       * @promise GetChaptersPromise
       * @fulfill {VimeoChapter[]} The chapters for the video.
       */
      /**
       * Get an array of all the chapters for the video.
       *
       * @return {GetChaptersPromise}
       */
    }, {
      key: "getChapters",
      value: function getChapters() {
        return this.get("chapters");
      }
      /**
       * A promise to get the currently active chapter.
       *
       * @promise GetCurrentChaptersPromise
       * @fulfill {VimeoChapter|undefined} The current chapter for the video.
       */
      /**
       * Get the currently active chapter for the video.
       *
       * @return {GetCurrentChaptersPromise}
       */
    }, {
      key: "getCurrentChapter",
      value: function getCurrentChapter() {
        return this.get("currentChapter");
      }
      /**
       * A promise to get the color of the player.
       *
       * @promise GetColorPromise
       * @fulfill {string} The hex color of the player.
       */
      /**
       * Get the color for this player.
       *
       * @return {GetColorPromise}
       */
    }, {
      key: "getColor",
      value: function getColor() {
        return this.get("color");
      }
      /**
       * A promise to set the color of the player.
       *
       * @promise SetColorPromise
       * @fulfill {string} The color was successfully set.
       * @reject {TypeError} The string was not a valid hex or rgb color.
       * @reject {ContrastError} The color was set, but the contrast is
       *         outside of the acceptable range.
       * @reject {EmbedSettingsError} The owner of the player has chosen to
       *         use a specific color.
       */
      /**
       * Set the color of this player to a hex or rgb string. Setting the
       * color may fail if the owner of the video has set their embed
       * preferences to force a specific color.
       *
       * @param {string} color The hex or rgb color string to set.
       * @return {SetColorPromise}
       */
    }, {
      key: "setColor",
      value: function setColor(color) {
        return this.set("color", color);
      }
      /**
       * A representation of a cue point.
       *
       * @typedef {Object} VimeoCuePoint
       * @property {number} time The time of the cue point.
       * @property {object} data The data passed when adding the cue point.
       * @property {string} id The unique id for use with removeCuePoint.
       */
      /**
       * A promise to get the cue points of a video.
       *
       * @promise GetCuePointsPromise
       * @fulfill {VimeoCuePoint[]} The cue points added to the video.
       * @reject {UnsupportedError} Cue points are not supported with the current
       *         player or browser.
       */
      /**
       * Get an array of the cue points added to the video.
       *
       * @return {GetCuePointsPromise}
       */
    }, {
      key: "getCuePoints",
      value: function getCuePoints() {
        return this.get("cuePoints");
      }
      /**
       * A promise to get the current time of the video.
       *
       * @promise GetCurrentTimePromise
       * @fulfill {number} The current time in seconds.
       */
      /**
       * Get the current playback position in seconds.
       *
       * @return {GetCurrentTimePromise}
       */
    }, {
      key: "getCurrentTime",
      value: function getCurrentTime() {
        return this.get("currentTime");
      }
      /**
       * A promise to set the current time of the video.
       *
       * @promise SetCurrentTimePromise
       * @fulfill {number} The actual current time that was set.
       * @reject {RangeError} the time was less than 0 or greater than the
       *         video’s duration.
       */
      /**
       * Set the current playback position in seconds. If the player was
       * paused, it will remain paused. Likewise, if the player was playing,
       * it will resume playing once the video has buffered.
       *
       * You can provide an accurate time and the player will attempt to seek
       * to as close to that time as possible. The exact time will be the
       * fulfilled value of the promise.
       *
       * @param {number} currentTime
       * @return {SetCurrentTimePromise}
       */
    }, {
      key: "setCurrentTime",
      value: function setCurrentTime(currentTime) {
        return this.set("currentTime", currentTime);
      }
      /**
       * A promise to get the duration of the video.
       *
       * @promise GetDurationPromise
       * @fulfill {number} The duration in seconds.
       */
      /**
       * Get the duration of the video in seconds. It will be rounded to the
       * nearest second before playback begins, and to the nearest thousandth
       * of a second after playback begins.
       *
       * @return {GetDurationPromise}
       */
    }, {
      key: "getDuration",
      value: function getDuration() {
        return this.get("duration");
      }
      /**
       * A promise to get the ended state of the video.
       *
       * @promise GetEndedPromise
       * @fulfill {boolean} Whether or not the video has ended.
       */
      /**
       * Get the ended state of the video. The video has ended if
       * `currentTime === duration`.
       *
       * @return {GetEndedPromise}
       */
    }, {
      key: "getEnded",
      value: function getEnded() {
        return this.get("ended");
      }
      /**
       * A promise to get the loop state of the player.
       *
       * @promise GetLoopPromise
       * @fulfill {boolean} Whether or not the player is set to loop.
       */
      /**
       * Get the loop state of the player.
       *
       * @return {GetLoopPromise}
       */
    }, {
      key: "getLoop",
      value: function getLoop() {
        return this.get("loop");
      }
      /**
       * A promise to set the loop state of the player.
       *
       * @promise SetLoopPromise
       * @fulfill {boolean} The loop state that was set.
       */
      /**
       * Set the loop state of the player. When set to `true`, the player
       * will start over immediately once playback ends.
       *
       * @param {boolean} loop
       * @return {SetLoopPromise}
       */
    }, {
      key: "setLoop",
      value: function setLoop(loop) {
        return this.set("loop", loop);
      }
      /**
       * A promise to set the muted state of the player.
       *
       * @promise SetMutedPromise
       * @fulfill {boolean} The muted state that was set.
       */
      /**
       * Set the muted state of the player. When set to `true`, the player
       * volume will be muted.
       *
       * @param {boolean} muted
       * @return {SetMutedPromise}
       */
    }, {
      key: "setMuted",
      value: function setMuted(muted) {
        return this.set("muted", muted);
      }
      /**
       * A promise to get the muted state of the player.
       *
       * @promise GetMutedPromise
       * @fulfill {boolean} Whether or not the player is muted.
       */
      /**
       * Get the muted state of the player.
       *
       * @return {GetMutedPromise}
       */
    }, {
      key: "getMuted",
      value: function getMuted() {
        return this.get("muted");
      }
      /**
       * A promise to get the paused state of the player.
       *
       * @promise GetLoopPromise
       * @fulfill {boolean} Whether or not the video is paused.
       */
      /**
       * Get the paused state of the player.
       *
       * @return {GetLoopPromise}
       */
    }, {
      key: "getPaused",
      value: function getPaused() {
        return this.get("paused");
      }
      /**
       * A promise to get the playback rate of the player.
       *
       * @promise GetPlaybackRatePromise
       * @fulfill {number} The playback rate of the player on a scale from 0.5 to 2.
       */
      /**
       * Get the playback rate of the player on a scale from `0.5` to `2`.
       *
       * @return {GetPlaybackRatePromise}
       */
    }, {
      key: "getPlaybackRate",
      value: function getPlaybackRate() {
        return this.get("playbackRate");
      }
      /**
       * A promise to set the playbackrate of the player.
       *
       * @promise SetPlaybackRatePromise
       * @fulfill {number} The playback rate was set.
       * @reject {RangeError} The playback rate was less than 0.5 or greater than 2.
       */
      /**
       * Set the playback rate of the player on a scale from `0.5` to `2`. When set
       * via the API, the playback rate will not be synchronized to other
       * players or stored as the viewer's preference.
       *
       * @param {number} playbackRate
       * @return {SetPlaybackRatePromise}
       */
    }, {
      key: "setPlaybackRate",
      value: function setPlaybackRate(playbackRate) {
        return this.set("playbackRate", playbackRate);
      }
      /**
       * A promise to get the played property of the video.
       *
       * @promise GetPlayedPromise
       * @fulfill {Array} Played Timeranges converted to an Array.
       */
      /**
       * Get the played property of the video.
       *
       * @return {GetPlayedPromise}
       */
    }, {
      key: "getPlayed",
      value: function getPlayed() {
        return this.get("played");
      }
      /**
       * A promise to get the qualities available of the current video.
       *
       * @promise GetQualitiesPromise
       * @fulfill {Array} The qualities of the video.
       */
      /**
       * Get the qualities of the current video.
       *
       * @return {GetQualitiesPromise}
       */
    }, {
      key: "getQualities",
      value: function getQualities() {
        return this.get("qualities");
      }
      /**
       * A promise to get the current set quality of the video.
       *
       * @promise GetQualityPromise
       * @fulfill {string} The current set quality.
       */
      /**
       * Get the current set quality of the video.
       *
       * @return {GetQualityPromise}
       */
    }, {
      key: "getQuality",
      value: function getQuality() {
        return this.get("quality");
      }
      /**
       * A promise to set the video quality.
       *
       * @promise SetQualityPromise
       * @fulfill {number} The quality was set.
       * @reject {RangeError} The quality is not available.
       */
      /**
       * Set a video quality.
       *
       * @param {string} quality
       * @return {SetQualityPromise}
       */
    }, {
      key: "setQuality",
      value: function setQuality(quality) {
        return this.set("quality", quality);
      }
      /**
       * A promise to get the seekable property of the video.
       *
       * @promise GetSeekablePromise
       * @fulfill {Array} Seekable Timeranges converted to an Array.
       */
      /**
       * Get the seekable property of the video.
       *
       * @return {GetSeekablePromise}
       */
    }, {
      key: "getSeekable",
      value: function getSeekable() {
        return this.get("seekable");
      }
      /**
       * A promise to get the seeking property of the player.
       *
       * @promise GetSeekingPromise
       * @fulfill {boolean} Whether or not the player is currently seeking.
       */
      /**
       * Get if the player is currently seeking.
       *
       * @return {GetSeekingPromise}
       */
    }, {
      key: "getSeeking",
      value: function getSeeking() {
        return this.get("seeking");
      }
      /**
       * A promise to get the text tracks of a video.
       *
       * @promise GetTextTracksPromise
       * @fulfill {VimeoTextTrack[]} The text tracks associated with the video.
       */
      /**
       * Get an array of the text tracks that exist for the video.
       *
       * @return {GetTextTracksPromise}
       */
    }, {
      key: "getTextTracks",
      value: function getTextTracks() {
        return this.get("textTracks");
      }
      /**
       * A promise to get the embed code for the video.
       *
       * @promise GetVideoEmbedCodePromise
       * @fulfill {string} The `<iframe>` embed code for the video.
       */
      /**
       * Get the `<iframe>` embed code for the video.
       *
       * @return {GetVideoEmbedCodePromise}
       */
    }, {
      key: "getVideoEmbedCode",
      value: function getVideoEmbedCode() {
        return this.get("videoEmbedCode");
      }
      /**
       * A promise to get the id of the video.
       *
       * @promise GetVideoIdPromise
       * @fulfill {number} The id of the video.
       */
      /**
       * Get the id of the video.
       *
       * @return {GetVideoIdPromise}
       */
    }, {
      key: "getVideoId",
      value: function getVideoId() {
        return this.get("videoId");
      }
      /**
       * A promise to get the title of the video.
       *
       * @promise GetVideoTitlePromise
       * @fulfill {number} The title of the video.
       */
      /**
       * Get the title of the video.
       *
       * @return {GetVideoTitlePromise}
       */
    }, {
      key: "getVideoTitle",
      value: function getVideoTitle() {
        return this.get("videoTitle");
      }
      /**
       * A promise to get the native width of the video.
       *
       * @promise GetVideoWidthPromise
       * @fulfill {number} The native width of the video.
       */
      /**
       * Get the native width of the currently‐playing video. The width of
       * the highest‐resolution available will be used before playback begins.
       *
       * @return {GetVideoWidthPromise}
       */
    }, {
      key: "getVideoWidth",
      value: function getVideoWidth() {
        return this.get("videoWidth");
      }
      /**
       * A promise to get the native height of the video.
       *
       * @promise GetVideoHeightPromise
       * @fulfill {number} The native height of the video.
       */
      /**
       * Get the native height of the currently‐playing video. The height of
       * the highest‐resolution available will be used before playback begins.
       *
       * @return {GetVideoHeightPromise}
       */
    }, {
      key: "getVideoHeight",
      value: function getVideoHeight() {
        return this.get("videoHeight");
      }
      /**
       * A promise to get the vimeo.com url for the video.
       *
       * @promise GetVideoUrlPromise
       * @fulfill {number} The vimeo.com url for the video.
       * @reject {PrivacyError} The url isn’t available because of the video’s privacy setting.
       */
      /**
       * Get the vimeo.com url for the video.
       *
       * @return {GetVideoUrlPromise}
       */
    }, {
      key: "getVideoUrl",
      value: function getVideoUrl() {
        return this.get("videoUrl");
      }
      /**
       * A promise to get the volume level of the player.
       *
       * @promise GetVolumePromise
       * @fulfill {number} The volume level of the player on a scale from 0 to 1.
       */
      /**
       * Get the current volume level of the player on a scale from `0` to `1`.
       *
       * Most mobile devices do not support an independent volume from the
       * system volume. In those cases, this method will always return `1`.
       *
       * @return {GetVolumePromise}
       */
    }, {
      key: "getVolume",
      value: function getVolume() {
        return this.get("volume");
      }
      /**
       * A promise to set the volume level of the player.
       *
       * @promise SetVolumePromise
       * @fulfill {number} The volume was set.
       * @reject {RangeError} The volume was less than 0 or greater than 1.
       */
      /**
       * Set the volume of the player on a scale from `0` to `1`. When set
       * via the API, the volume level will not be synchronized to other
       * players or stored as the viewer’s preference.
       *
       * Most mobile devices do not support setting the volume. An error will
       * *not* be triggered in that situation.
       *
       * @param {number} volume
       * @return {SetVolumePromise}
       */
    }, {
      key: "setVolume",
      value: function setVolume(volume) {
        return this.set("volume", volume);
      }
    }]);
    return Player2;
  })();
  if (!isNode) {
    screenfull = initializeScreenfull();
    initializeEmbeds();
    resizeEmbeds();
    initAppendVideoMetadata();
  }
  var VimeoPlayer = class extends AbstractVideoPlayer {
    constructor(target, videoId, options = {}) {
      super(target, videoId, options);
      this.state.set(INITIALIZED);
    }
    createPlayer(videoId) {
      const { options, options: { playerOptions = {} } } = this;
      const vimeoOptions = videoId.indexOf("http") === 0 ? { url: videoId } : { id: +videoId };
      const player = new Player$1(this.target, assign2(vimeoOptions, {
        controls: !options.hideControls,
        loop: options.loop,
        muted: options.mute
      }, playerOptions.vimeo || {}));
      player.on("play", this.onPlay);
      player.on("pause", this.onPause);
      player.on("ended", this.onEnded);
      player.ready().then(this.onPlayerReady, this.onError);
      if (!player.getMuted()) {
        player.setVolume(clamp2(options.volume, 0, 1));
      }
      return player;
    }
    playVideo() {
      this.player.play().catch(() => {
        if (this.state.is(PLAY_REQUEST_ABORTED)) {
          this.state.set(IDLE2);
        }
      });
    }
    pauseVideo() {
      this.player.pause();
    }
  };
  var YOUTUBE_API_SRC = "//www.youtube.com/player_api";
  var YouTubeIframeAPILoader = class {
    load(callback) {
      if (window.YT && isFunction2(window.YT.Player)) {
        return callback();
      }
      this.attachCallback(callback);
      if (this.shouldLoad()) {
        create2("script", { src: `${location.protocol}${YOUTUBE_API_SRC}` }, document.head);
      }
    }
    shouldLoad() {
      return !queryAll2(document, "script").some((script) => script.src.replace(/^https?:/, "") === YOUTUBE_API_SRC);
    }
    attachCallback(callback) {
      let oldCallback;
      if (!isUndefined2(window.onYouTubeIframeAPIReady)) {
        oldCallback = window.onYouTubeIframeAPIReady;
      }
      window.onYouTubeIframeAPIReady = () => {
        oldCallback && oldCallback();
        callback();
      };
    }
  };
  var YouTubePlayer = class extends AbstractVideoPlayer {
    constructor(target, videoId, options = {}) {
      super(target, videoId, options);
      this.videoId = this.parseVideoId(videoId);
      if (this.videoId) {
        this.state.set(INITIALIZING);
        new YouTubeIframeAPILoader().load(this.onAPIReady.bind(this));
      }
    }
    onAPIReady() {
      const { state } = this;
      const isPending = state.is(PENDING_PLAY);
      state.set(INITIALIZED);
      if (isPending) {
        this.play();
      }
    }
    createPlayer(videoId) {
      const { options, options: { playerOptions = {} } } = this;
      return new YT.Player(this.target, {
        videoId,
        host: options.host,
        playerVars: assign2({
          controls: options.hideControls ? 0 : 1,
          iv_load_policy: 3,
          loop: options.loop ? 1 : 0,
          playlist: options.loop ? videoId : void 0,
          rel: 0,
          autoplay: 0,
          mute: options.mute ? 1 : 0
        }, playerOptions.youtube || {}),
        events: {
          onReady: this.onPlayerReady.bind(this),
          onStateChange: this.onPlayerStateChange.bind(this),
          onError: this.onError.bind(this)
        }
      });
    }
    onPlayerReady() {
      super.onPlayerReady();
      this.player.setVolume(clamp2(this.options.volume, 0, 1) * 100);
    }
    onPlayerStateChange(e) {
      const { PLAYING: PLAYING2, PAUSED, ENDED } = YT.PlayerState;
      switch (true) {
        case e.data === PLAYING2:
          this.onPlay();
          break;
        case e.data === PAUSED:
          this.onPause();
          break;
        case e.data === ENDED:
          this.onEnded();
          break;
      }
    }
    playVideo() {
      this.player.playVideo();
    }
    pauseVideo() {
      this.player.pauseVideo();
    }
    parseVideoId(id) {
      return id.indexOf("http") === 0 ? this.parseUrl(id) : id;
    }
    parseUrl(url) {
      const [, search] = url.split(/[#?]/);
      const query2 = find(search.split("&"), (query22) => query22.indexOf("v=") === 0);
      return query2 && query2.replace("v=", "");
    }
  };
  var I18N2 = {
    playVideo: "Play Video"
  };
  var PlayerUI = class {
    constructor(Splide2, slide) {
      this.event = EventInterface2();
      this.Splide = Splide2;
      this.slide = slide;
      this.container = child2(this.slide, `.${CLASS_CONTAINER2}`);
      this.parent = this.container || this.slide;
      this.init();
      this.create();
      this.show();
      this.listen();
    }
    init() {
      addClass2(this.slide, `${CLASS_SLIDE2}${MODIFIER_HAS_VIDEO}`);
      addClass2(this.container, `${CLASS_CONTAINER2}${MODIFIER_HAS_VIDEO}`);
    }
    create() {
      this.video = create2("div", CLASS_VIDEO, this.parent);
      this.playButton = create2("button", {
        class: CLASS_VIDEO_PLAY_BUTTON,
        type: "button",
        "aria-label": this.Splide.options.i18n.playVideo || I18N2.playVideo
      }, this.video);
      this.wrapper = create2("div", CLASS_VIDEO_WRAPPER, this.video);
      this.placeholder = create2("div", null, this.wrapper);
    }
    listen() {
      this.parent.addEventListener("click", () => {
        this.event.emit("click");
      });
    }
    toggleButton(show) {
      display2(this.playButton, show ? "" : "none");
    }
    toggleWrapper(show) {
      display2(this.wrapper, show ? "" : "none");
    }
    getPlaceholder() {
      return this.placeholder;
    }
    hide() {
      this.toggleButton(false);
      this.toggleWrapper(true);
    }
    show() {
      if (!this.disabled) {
        this.toggleButton(true);
      }
      this.toggleWrapper(false);
    }
    disable(disabled) {
      this.disabled = disabled;
      if (disabled) {
        this.toggleButton(false);
      }
    }
    on(events, callback) {
      this.event.on(events, callback);
    }
    destroy() {
      removeClass2(this.slide, `${CLASS_SLIDE2}${MODIFIER_HAS_VIDEO}`);
      removeClass2(this.container, `${CLASS_CONTAINER2}${MODIFIER_HAS_VIDEO}`);
      remove2(this.video);
      this.event.destroy();
    }
  };
  var VIDEO_PLAYER_MAP = [
    [YOUTUBE_DATA_ATTRIBUTE, YouTubePlayer],
    [VIMEO_DATA_ATTRIBUTE, VimeoPlayer],
    [HTML_VIDEO__DATA_ATTRIBUTE, HTMLVideoPlayer]
  ];
  var Player = class {
    constructor(Splide2, slide) {
      this.Splide = Splide2;
      this.slide = slide;
      this.event = EventInterface2(Splide2);
      this.options = merge2(merge2({}, DEFAULTS2), this.Splide.options.video);
      this.createPlayer(slide);
      if (this.player) {
        this.listen();
      }
    }
    createPlayer(slide) {
      VIDEO_PLAYER_MAP.forEach(([attr, Constructor]) => {
        const id = getAttribute2(slide, attr);
        if (id) {
          this.ui = new PlayerUI(this.Splide, slide);
          this.player = new Constructor(this.ui.getPlaceholder(), id, this.options);
          this.ui.disable(this.options.disableOverlayUI);
        }
      });
    }
    listen() {
      const { player, event } = this;
      this.ui.on("click", this.onClick.bind(this));
      player.on("play", this.onPlay.bind(this));
      player.on("played", this.onPlayed.bind(this));
      player.on("pause", this.onPause.bind(this));
      player.on("paused", this.onPaused.bind(this));
      player.on("ended", this.onEnded.bind(this));
      player.on("error", this.onError.bind(this));
      event.on([EVENT_MOVE2, EVENT_SCROLL2], this.pause.bind(this));
      event.on(EVENT_VIDEO_CLICK, this.onVideoClick.bind(this));
      event.on(EVENT_DRAG2, () => {
        event.off(EVENT_DRAGGING2);
        event.on(EVENT_DRAGGING2, () => {
          this.pause();
          event.off(EVENT_DRAGGING2);
        });
      });
      if (this.options.autoplay) {
        event.on([EVENT_MOUNTED2, EVENT_MOVED2, EVENT_SCROLLED2], this.onAutoplayRequested.bind(this));
      }
    }
    onClick() {
      this.isPaused() ? this.play() : this.pause();
      this.event.emit(EVENT_VIDEO_CLICK, this);
    }
    onVideoClick(player) {
      if (this !== player) {
        this.pause();
      }
    }
    onPlay() {
      this.ui.hide();
    }
    onPlayed() {
      this.ui.hide();
      this.togglePlaying(true);
      this.event.emit(EVENT_VIDEO_PLAY, this);
    }
    onPause() {
      this.ui.show();
    }
    onPaused() {
      this.togglePlaying(false);
      this.event.emit(EVENT_VIDEO_PAUSE, this);
    }
    onEnded() {
      this.togglePlaying(false);
      this.event.emit(EVENT_VIDEO_ENDED, this);
    }
    onError() {
      addClass2(this.slide, CLASS_ERROR);
      this.ui.show();
      this.event.emit(EVENT_VIDEO_ERROR, this);
    }
    onAutoplayRequested() {
      const activeSlide = this.Splide.Components.Slides.getAt(this.Splide.index);
      if (activeSlide.slide === this.slide) {
        this.play();
      }
    }
    togglePlaying(add) {
      toggleClass2(this.Splide.root, CLASS_PLAYING, add);
    }
    play() {
      if (this.player && !this.disabled) {
        this.player.play();
      }
    }
    pause() {
      if (this.player && !this.disabled) {
        this.player.pause();
      }
    }
    destroy() {
      if (this.player) {
        this.ui.destroy();
        this.player.destroy();
      }
      this.disable(false);
    }
    disable(disabled) {
      this.disabled = disabled;
      toggleClass2(this.Splide.root, CLASS_VIDEO_DISABLED, disabled);
    }
    isPaused() {
      return this.player.isPaused();
    }
  };
  function Video(Splide2, Components2) {
    const { on } = EventInterface2(Splide2);
    const { Slides: Slides2 } = Components2;
    const players = {};
    function mount() {
      create3();
      on("refresh", create3);
    }
    function create3() {
      Slides2.forEach((Slide2) => {
        const { slide } = Slide2;
        if (!hasClass2(slide, `${CLASS_SLIDE2}${MODIFIER_HAS_VIDEO}`)) {
          players[Slide2.index] = new Player(Splide2, slide);
        }
      });
      Slides2.update();
    }
    function destroy() {
      forOwn2(players, (player) => {
        player.destroy();
      });
    }
    function play(index = Splide2.index) {
      const player = players[index];
      if (player) {
        player.play();
      }
    }
    function pause() {
      forOwn2(players, (player) => {
        player.pause();
      });
    }
    function disable(disabled) {
      forOwn2(players, (player) => {
        player.disable(disabled);
      });
    }
    return {
      mount,
      destroy,
      play,
      pause,
      disable
    };
  }

  // node_modules/@splidejs/splide/dist/css/splide-core.min.css
  var splide_core_min_default = "@keyframes splide-loading{0%{transform:rotate(0)}to{transform:rotate(1turn)}}.splide__track--draggable{-webkit-touch-callout:none;-webkit-user-select:none;-ms-user-select:none;user-select:none}.splide__track--fade>.splide__list>.splide__slide{margin:0!important;opacity:0;z-index:0}.splide__track--fade>.splide__list>.splide__slide.is-active{opacity:1;z-index:1}.splide--rtl{direction:rtl}.splide__track--ttb>.splide__list{display:block}.splide__container{box-sizing:border-box;position:relative}.splide__list{backface-visibility:hidden;display:-ms-flexbox;display:flex;height:100%;margin:0!important;padding:0!important}.splide.is-initialized:not(.is-active) .splide__list{display:block}.splide__pagination{-ms-flex-align:center;align-items:center;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;-ms-flex-pack:center;justify-content:center;margin:0;pointer-events:none}.splide__pagination li{display:inline-block;line-height:1;list-style-type:none;margin:0;pointer-events:auto}.splide:not(.is-overflow) .splide__pagination{display:none}.splide__progress__bar{width:0}.splide{position:relative;visibility:hidden}.splide.is-initialized,.splide.is-rendered{visibility:visible}.splide__slide{backface-visibility:hidden;box-sizing:border-box;-ms-flex-negative:0;flex-shrink:0;list-style-type:none!important;margin:0;position:relative}.splide__slide img{vertical-align:bottom}.splide__spinner{animation:splide-loading 1s linear infinite;border:2px solid #999;border-left-color:transparent;border-radius:50%;bottom:0;contain:strict;display:inline-block;height:20px;left:0;margin:auto;position:absolute;right:0;top:0;width:20px}.splide__sr{clip:rect(0 0 0 0);border:0;height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;width:1px}.splide__toggle.is-active .splide__toggle__play,.splide__toggle__pause{display:none}.splide__toggle.is-active .splide__toggle__pause{display:inline}.splide__track{overflow:hidden;position:relative;z-index:0}";

  // src/utils/hero-slider.css
  var hero_slider_default = ".splide__slide { overflow: hidden; }\n[data-slide-progress-bar] { position: absolute; top: 0; left: 0; height: 3px; width: 0%; background: #D6F277; z-index: 30; pointer-events: none; transition: opacity 0.3s; }\n.splide__video { position: absolute; inset: 0; z-index: 1; display: block !important; }\n.splide__video__wrapper,\n.splide__video__wrapper > div { position: absolute; inset: 0; width: 100% !important; height: 100% !important; display: block !important; }\n.splide__video__wrapper iframe { position: absolute; inset: 0; width: 100% !important; height: 100% !important; }\n[data-video-thumb] { position: absolute; inset: 0; z-index: 15; cursor: pointer; }\n.hero-video-controls { position: absolute !important; bottom: 0; left: 0; right: 0; z-index: 20; display: none; }\n[data-video-thumb] .hero-play-btn { pointer-events: none; color: #000; }\n[data-video-thumb] .hero-play-btn svg { fill: #000; width: 22px; height: 26px; }\n[data-video-thumb] .hero-play-btn svg * { fill: #000; }\n[data-video-timeline] { position: relative; cursor: pointer; flex: 1; background: rgba(214, 242, 119, 0.25); }\n[data-video-progress] { position: absolute; top: 0; left: 0; height: 100%; width: 0%; pointer-events: none; background: #D6F277; }\n[data-video-play-pause], [data-video-mute] { display: flex; align-items: center; }\n[data-video-mute] { aspect-ratio: 1; width: 40px; height: 40px; cursor: pointer; }\n[data-video-subtitle] { display: flex; align-items: center; width: 40px; height: 40px; cursor: pointer; }\n[data-video-subtitle] svg { display: block; height: 100%; width: auto; aspect-ratio: 1; }\n[data-video-play-pause] svg, [data-video-mute] svg { display: block; height: 100%; width: auto; aspect-ratio: 1; }\n";

  // src/utils/hero-slider.ts
  var stylesInjected = false;
  function injectHeroSliderStyles() {
    if (stylesInjected) return;
    stylesInjected = true;
    const style3 = document.createElement("style");
    style3.textContent = splide_core_min_default + hero_slider_default;
    document.head.appendChild(style3);
  }
  function initHeroSlider(container = "[data-hero-slider]") {
    const el = typeof container === "string" ? document.querySelector(container) : container;
    if (!el) return;
    injectHeroSliderStyles();
    let activeIframe = null;
    let activeSdkPlayer = null;
    let isPlaying = false;
    let isMuted = false;
    let subsEnabled = false;
    let subsAvailable = false;
    let availableTracks = [];
    let videoDuration = 0;
    const registeredSdkPlayers = /* @__PURE__ */ new WeakSet();
    const ICON_PLAY = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#D6F277"><polygon points="5,3 19,12 5,21"/></svg>';
    const ICON_PAUSE = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#D6F277"><rect x="5" y="3" width="4" height="18"/><rect x="15" y="3" width="4" height="18"/></svg>';
    const ICON_VOL = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#D6F277"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>';
    const ICON_MUTED = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#D6F277"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H4v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73 4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>';
    const ICON_CC_OFF = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect x="1" y="5" width="22" height="14" rx="3" fill="none" stroke="#D6F277" stroke-width="1.5"/><text x="12" y="12" text-anchor="middle" dominant-baseline="central" fill="#D6F277" font-size="9" font-family="Arial,sans-serif" font-weight="bold">CC</text></svg>';
    const ICON_CC_ON = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect x="1" y="5" width="22" height="14" rx="3" fill="#D6F277"/><text x="12" y="12" text-anchor="middle" dominant-baseline="central" fill="#000" font-size="9" font-family="Arial,sans-serif" font-weight="bold">CC</text></svg>';
    const setPlayPauseIcon = (playing) => {
      el.querySelectorAll("[data-video-play-pause]").forEach((btn) => {
        btn.innerHTML = playing ? ICON_PAUSE : ICON_PLAY;
      });
    };
    const setMuteIcon = (muted) => {
      el.querySelectorAll("[data-video-mute]").forEach((btn) => {
        btn.innerHTML = muted ? ICON_MUTED : ICON_VOL;
      });
    };
    const setSubtitleIcon = (enabled) => {
      el.querySelectorAll("[data-video-subtitle]").forEach((btn) => {
        btn.innerHTML = enabled ? ICON_CC_ON : ICON_CC_OFF;
      });
    };
    const setSubtitleAvailable = (available) => {
      el.querySelectorAll("[data-video-subtitle]").forEach((btn) => {
        btn.style.opacity = available ? "" : "0.3";
        btn.style.pointerEvents = available ? "" : "none";
      });
    };
    const setProgress = (percent) => {
      el.querySelectorAll("[data-video-progress]").forEach((bar) => {
        bar.style.width = `${percent * 100}%`;
      });
    };
    const vimeoMsg = (method, value) => {
      if (!activeIframe?.contentWindow) return;
      const payload = { method };
      if (value !== void 0) payload.value = value;
      activeIframe.contentWindow.postMessage(payload, "https://player.vimeo.com");
    };
    const splide = new Splide(el, {
      type: "fade",
      rewind: true,
      pagination: false,
      arrows: false,
      autoplay: true,
      interval: 6e3,
      pauseOnHover: true,
      resetProgress: false,
      video: {
        autoplay: false,
        mute: false,
        hideControls: true,
        disableOverlayUI: true,
        playerOptions: {
          vimeo: {
            title: false,
            byline: false,
            portrait: false,
            dnt: true
          }
        }
      }
    });
    const getSlide = (index) => el.querySelectorAll(".splide__slide")[index];
    splide.on("video:play", (extPlayer) => {
      const slide = getSlide(splide.index);
      slide?.querySelectorAll("[data-video-thumb]").forEach((t) => {
        t.style.opacity = "0";
      });
      el.querySelectorAll(".splide__video__wrapper").forEach((wrapper) => {
        wrapper.style.width = "100%";
        wrapper.style.height = "100%";
        const vimeoDiv = wrapper.querySelector("[data-vimeo-initialized]");
        if (vimeoDiv) {
          vimeoDiv.style.width = "100%";
          vimeoDiv.style.height = "100%";
        }
        const iframe2 = wrapper.querySelector("iframe");
        if (iframe2) {
          iframe2.style.width = "100%";
          iframe2.style.height = "100%";
        }
      });
      el.querySelectorAll(".hero-video-controls").forEach((c) => {
        c.style.display = "flex";
      });
      splide.Components.Autoplay?.pause();
      progressBar.style.opacity = "0";
      isPlaying = true;
      setPlayPauseIcon(true);
      const iframe = slide?.querySelector("iframe");
      if (iframe) {
        activeIframe = iframe;
        const sdkPlayer = extPlayer?.player?.player;
        if (sdkPlayer && typeof sdkPlayer.on === "function") {
          activeSdkPlayer = sdkPlayer;
          if (!registeredSdkPlayers.has(sdkPlayer)) {
            registeredSdkPlayers.add(sdkPlayer);
            sdkPlayer.on("timeupdate", ({ percent }) => setProgress(percent));
            sdkPlayer.on("durationchange", ({ duration }) => {
              videoDuration = duration;
            });
          }
          sdkPlayer.getTextTracks().then((tracks) => {
            availableTracks = tracks;
            subsAvailable = tracks.length > 0;
            setSubtitleAvailable(subsAvailable);
          });
        }
      }
    });
    splide.on("video:pause", () => {
      isPlaying = false;
      setPlayPauseIcon(false);
      splide.Components.Autoplay?.play();
      progressBar.style.opacity = "";
    });
    splide.on("move", (_newIndex, prevIndex) => {
      const leavingSlide = getSlide(prevIndex);
      leavingSlide?.querySelectorAll("[data-video-thumb]").forEach((t) => {
        t.style.opacity = "";
      });
      el.querySelectorAll(".hero-video-controls").forEach((c) => {
        c.style.display = "none";
      });
      activeIframe = null;
      activeSdkPlayer = null;
      isPlaying = false;
      isMuted = false;
      subsEnabled = false;
      subsAvailable = false;
      availableTracks = [];
      videoDuration = 0;
      setPlayPauseIcon(false);
      setSubtitleIcon(false);
      setSubtitleAvailable(false);
      setProgress(0);
      progressBar.style.width = "0%";
    });
    const videoComponent = () => splide.Components.Video;
    document.querySelectorAll(".hero-video-controls").forEach((controls) => {
      el.appendChild(controls);
    });
    const progressBar = document.createElement("div");
    progressBar.setAttribute("data-slide-progress-bar", "");
    el.appendChild(progressBar);
    el.addEventListener("click", (e) => {
      const target = e.target;
      if (!target.closest("[data-video-thumb]") && !target.closest(".splide__video__play")) return;
      if (isPlaying) videoComponent()?.pause();
      else videoComponent()?.play();
    });
    el.querySelectorAll(".hero-video-controls").forEach((controls) => {
      controls.addEventListener("click", (e) => {
        e.stopPropagation();
        if (!activeIframe) return;
        const target = e.target;
        if (target.closest("[data-video-subtitle]") && activeSdkPlayer && subsAvailable) {
          subsEnabled = !subsEnabled;
          if (subsEnabled) activeSdkPlayer.enableTextTrack(availableTracks[0].language);
          else activeSdkPlayer.disableTextTrack();
          setSubtitleIcon(subsEnabled);
          return;
        }
        if (target.closest("[data-video-mute]")) {
          isMuted = !isMuted;
          vimeoMsg("setMuted", isMuted);
          setMuteIcon(isMuted);
          return;
        }
        const timeline = target.closest("[data-video-timeline]");
        if (timeline) {
          const rect2 = timeline.getBoundingClientRect();
          const percent = Math.max(0, Math.min(1, (e.clientX - rect2.left) / rect2.width));
          vimeoMsg("setCurrentTime", percent * videoDuration);
          return;
        }
        if (target.closest("[data-video-play-pause]")) {
          if (isPlaying) videoComponent()?.pause();
          else videoComponent()?.play();
        }
      });
    });
    splide.on("autoplay:playing", (rate) => {
      progressBar.style.width = `${rate * 100}%`;
    });
    setPlayPauseIcon(false);
    setMuteIcon(false);
    setSubtitleIcon(false);
    setSubtitleAvailable(false);
    setProgress(0);
    splide.mount({ Video });
  }

  // src/pages/case.ts
  function initHeroHeading() {
    const heading = document.querySelector("[data-case-hero-heading]");
    if (!heading || heading.textContent?.trim()) return;
    const name = document.querySelector("[data-case-name]");
    if (name?.textContent) heading.textContent = name.textContent;
  }
  function initResultsButton() {
    const btn = document.querySelector("[data-results-btn]");
    if (!btn) return;
    btn.style.display = document.getElementById("results") ? "" : "none";
  }
  function initTagLinks() {
    document.querySelectorAll("[data-tag-link]").forEach((tag) => {
      const slug = tag.dataset.tagSlug;
      if (slug) tag.href = `/cases?tag=${encodeURIComponent(slug)}`;
    });
  }
  document.addEventListener("DOMContentLoaded", () => {
    initHeroSlider();
    initHeroHeading();
    initResultsButton();
    initTagLinks();
  });
})();
/*! Bundled license information:

@splidejs/splide/dist/js/splide.esm.js:
  (*!
   * Splide.js
   * Version  : 4.1.4
   * License  : MIT
   * Copyright: 2022 Naotoshi Fujita
   *)

@splidejs/splide-extension-video/dist/js/splide-extension-video.esm.js:
  (*!
   * Splide.js
   * Version  : 0.8.0
   * License  : MIT
   * Copyright: 2022 Naotoshi Fujita
   *)
  (*! @vimeo/player v2.17.1 | (c) 2022 Vimeo | MIT License | https://github.com/vimeo/player.js *)
  (*!
   * weakmap-polyfill v2.0.4 - ECMAScript6 WeakMap polyfill
   * https://github.com/polygonplanet/weakmap-polyfill
   * Copyright (c) 2015-2021 polygonplanet <polygon.planet.aqua@gmail.com>
   * @license MIT
   *)
  (*! Native Promise Only
      v0.8.1 (c) Kyle Simpson
      MIT License: http://getify.mit-license.org
  *)
*/
