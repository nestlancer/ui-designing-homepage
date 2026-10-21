/* Nestlancer compositor — slot runtime.
 *
 * The 29 shortlist samples were written as standalone mini-documents. Each one
 * boots its own theme toggle and queries the whole document from its script.
 * On a composed page there is exactly one theme writer (the header control, via
 * shared/theme-boot.js), so this runtime gives every fragment script a
 * `document` facade that:
 *
 *   - can only see that slot's subtree (no cross-slot id/class collisions)
 *   - resolves theme controls to a detached stub, so a fragment can never bind
 *     a second toggle or write data-theme
 *   - never throws when an expected node is missing
 *
 * `NL.rescue` is the safety net: if a fragment script throws, its reveal
 * elements are forced visible instead of leaving a blank section on the page.
 */
window.NL = (function () {
  var stub = null;
  function themeStub() {
    if (!stub) {
      stub = document.createElement('button');
      stub.type = 'button';
    }
    return stub;
  }
  function isThemeSelector(sel) {
    if (typeof sel !== 'string') return false;
    if (/#theme-toggle\b/.test(sel)) return true;
    if (/themeToggle/.test(sel)) return true;
    if (/data-theme-toggle/.test(sel)) return true;
    if (/\.theme-fab\b/.test(sel)) return true;
    if (/(^|[\s>+~,])\.theme(?![\w-])/.test(sel)) return true;
    return false;
  }
  function escapeId(id) {
    if (window.CSS && CSS.escape) return CSS.escape(id);
    return String(id).replace(/[^\w-]/g, '\\$&');
  }
  function scope(slot) {
    var root = document.querySelector('[data-slot="' + slot + '"]');
    return {
      documentElement: document.documentElement,
      body: document.body,
      getElementById: function (id) {
        if (id === 'theme-toggle' || id === 'themeToggle') return themeStub();
        if (!root) return themeStub();
        return root.querySelector('#' + escapeId(id)) || themeStub();
      },
      querySelector: function (sel) {
        if (isThemeSelector(sel)) return themeStub();
        return root ? root.querySelector(sel) : null;
      },
      querySelectorAll: function (sel) {
        if (isThemeSelector(sel)) return [];
        return root ? root.querySelectorAll(sel) : [];
      },
      getElementsByClassName: function (cls) {
        return root ? root.getElementsByClassName(cls) : [];
      },
      createElement: function (tag) { return document.createElement(tag); },
      addEventListener: function () { return document.addEventListener.apply(document, arguments); },
      removeEventListener: function () { return document.removeEventListener.apply(document, arguments); }
    };
  }
  function rescue(slot, err) {
    try {
      console.warn('[nestlancer] slot "' + slot + '" script failed — revealing its content.', err);
      var root = document.querySelector('[data-slot="' + slot + '"]');
      if (!root) return;
      var nodes = root.querySelectorAll('[data-reveal], .slot, .reveal');
      for (var i = 0; i < nodes.length; i++) {
        nodes[i].classList.add('is-in');
        nodes[i].classList.add('in');
      }
    } catch (e) { /* never let the rescue break the page */ }
  }
  return { scope: scope, rescue: rescue, themeStub: themeStub };
})();
