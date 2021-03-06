(function (l, e) {
  "object" === typeof exports ? e(exports) : "function" === typeof define && define.amd ? define(["exports"], e) : e(l)
})(this, function (l) {
  function e(a) {
    this._targetElement = "undefined" != typeof a.length ? a : [a];
    "undefined" === typeof window._progressjsId && (window._progressjsId = 1);
    "undefined" === typeof window._progressjsIntervals && (window._progressjsIntervals = {});
    this._options = {
      theme: "blue",
      overlayMode: !1,
      considerTransition: !0
    }
  }

  function m(a, c) {
    var d = this;
    100 <= c && (c = 100);
    a.hasAttribute("data-progressjs") &&
      setTimeout(function () {
        "undefined" != typeof d._onProgressCallback && d._onProgressCallback.call(d, a, c);
        var b = h(a);
        b.style.width = parseInt(c) + "%";
        var b = b.querySelector(".progressjs-percent"),
          g = parseInt(b.innerHTML.replace("%", "")),
          e = parseInt(c),
          j = function (a, b, c) {
            var d = Math.abs(b - c);
            3 > d ? k = 30 : 20 > d ? k = 20 : intervanIn = 1;
            0 != b - c && (a.innerHTML = (f ? ++b : --b) + "%", setTimeout(function () {
              j(a, b, c)
            }, k))
          },
          f = !0;
        g > e && (f = !1);
        var k = 10;
        j(b, g, e)
      }, 50)
  }

  function h(a) {
    a = parseInt(a.getAttribute("data-progressjs"));
    return document.querySelector('.progressjs-container > .progressjs-progress[data-progressjs="' +
      a + '"] > .progressjs-inner')
  }

  function p(a) {
    for (var c = 0, d = this._targetElement.length; c < d; c++) {
      var b = this._targetElement[c];
      if (b.hasAttribute("data-progressjs")) {
        var g = h(b);
        (g = parseInt(g.style.width.replace("%", ""))) && m.call(this, b, g + (a || 1))
      }
    }
  }

  function q() {
    var a, c = document.createElement("fakeelement"),
      d = {
        transition: "transitionend",
        OTransition: "oTransitionEnd",
        MozTransition: "transitionend",
        WebkitTransition: "webkitTransitionEnd"
      };
    for (a in d)
      if (void 0 !== c.style[a]) return d[a]
  }
  var n = function (a) {
    if ("object" ===
      typeof a) return new e(a);
    if ("string" === typeof a) {
      if (a = document.querySelectorAll(a)) return new e(a);
      throw Error("There is no element with given selector.");
    }
    return new e(document.body)
  };
  n.version = "0.1.0";
  n.fn = e.prototype = {
    clone: function () {
      return new e(this)
    },
    setOption: function (a, c) {
      this._options[a] = c;
      return this
    },
    setOptions: function (a) {
      var c = this._options,
        d = {},
        b;
      for (b in c) d[b] = c[b];
      for (b in a) d[b] = a[b];
      this._options = d;
      return this
    },
    start: function () {
      "undefined" != typeof this._onBeforeStartCallback &&
        this._onBeforeStartCallback.call(this);
      if (!document.querySelector(".progressjs-container")) {
        var a = document.createElement("div");
        a.className = "progressjs-container";
        document.body.appendChild(a)
      }
      for (var a = 0, c = this._targetElement.length; a < c; a++) {
        var d = this._targetElement[a];
        if (!d.hasAttribute("data-progressjs")) {
          var b = d,
            g, e, j;
          "body" === b.tagName.toLowerCase() ? (g = b.clientWidth, e = b.clientHeight) : (g = b.offsetWidth, e = b.offsetHeight);
          for (var f = j = 0; b && !isNaN(b.offsetLeft) && !isNaN(b.offsetTop);) j += b.offsetLeft,
            f += b.offsetTop, b = b.offsetParent;
          b = f;
          d.setAttribute("data-progressjs", window._progressjsId);
          f = document.createElement("div");
          f.className = "progressjs-progress progressjs-theme-" + this._options.theme;
          f.style.position = "body" === d.tagName.toLowerCase() ? "fixed" : "absolute";
          f.setAttribute("data-progressjs", window._progressjsId);
          var k = document.createElement("div");
          k.className = "progressjs-inner";
          var h = document.createElement("div");
          h.className = "progressjs-percent";
          h.innerHTML = "1%";
          k.appendChild(h);
          this._options.overlayMode &&
            "body" === d.tagName.toLowerCase() ? (f.style.left = 0, f.style.right = 0, f.style.top = 0, f.style.bottom = 0) : (f.style.left = j + "px", f.style.top = b + "px", f.style.width = g + "px", this._options.overlayMode && (f.style.height = e + "px"));
          f.appendChild(k);
          document.querySelector(".progressjs-container").appendChild(f);
          m(d, 1);
          ++window._progressjsId
        }
      }
      return this
    },
    set: function (a) {
      for (var c = 0, d = this._targetElement.length; c < d; c++) m.call(this, this._targetElement[c], a);
      return this
    },
    increase: function (a) {
      p.call(this, a);
      return this
    },
    autoIncrease: function (a,
      c) {
      var d = this,
        b = parseInt(this._targetElement[0].getAttribute("data-progressjs"));
      "undefined" != typeof window._progressjsIntervals[b] && clearInterval(window._progressjsIntervals[b]);
      window._progressjsIntervals[b] = setInterval(function () {
        p.call(d, a)
      }, c);
      return this
    },
    end: function () {
      a: {
        "undefined" != typeof this._onBeforeEndCallback && (!0 === this._options.considerTransition ? h(this._targetElement[0]).addEventListener(q(), this._onBeforeEndCallback, !1) : this._onBeforeEndCallback.call(this));
        for (var a = parseInt(this._targetElement[0].getAttribute("data-progressjs")),
            c = 0, d = this._targetElement.length; c < d; c++) {
          var b = this._targetElement[c],
            e = h(b);
          if (!e) break a;
          var l = 1;
          100 > parseInt(e.style.width.replace("%", "")) && (m.call(this, b, 100), l = 500);
          (function (a, b) {
            setTimeout(function () {
              a.parentNode.className += " progressjs-end";
              setTimeout(function () {
                a.parentNode.parentNode.removeChild(a.parentNode);
                b.removeAttribute("data-progressjs")
              }, 1E3)
            }, l)
          })(e, b)
        }
        if (window._progressjsIntervals[a]) try {
          clearInterval(window._progressjsIntervals[a]), window._progressjsIntervals[a] = null, delete window._progressjsIntervals[a]
        } catch (j) {}
      }
      return this
    },
    onbeforeend: function (a) {
      if ("function" === typeof a) this._onBeforeEndCallback = a;
      else throw Error("Provided callback for onbeforeend was not a function");
      return this
    },
    onbeforestart: function (a) {
      if ("function" === typeof a) this._onBeforeStartCallback = a;
      else throw Error("Provided callback for onbeforestart was not a function");
      return this
    },
    onprogress: function (a) {
      if ("function" === typeof a) this._onProgressCallback = a;
      else throw Error("Provided callback for onprogress was not a function");
      return this
    }
  };
  return l.progressJs =
    n
});