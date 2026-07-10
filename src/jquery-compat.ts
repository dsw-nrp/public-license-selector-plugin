import $ from 'jquery'

// @ufal/license-selector still calls jQuery's `.size()` method, which was
// removed in jQuery 3.0. Restore it as a thin shim over `.length`. This must run
// before the modal is built (see licenseSelector.ts, which imports this first).
declare global {
    interface JQuery {
        size(): number
    }
}

if (typeof $.fn.size !== 'function') {
    // `this` is contextually typed as JQuery from the augmented `size` signature.
    $.fn.size = function () {
        return this.length
    }
}
