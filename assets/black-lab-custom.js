/* Black Lab custom PDP script
   Moves the Kiwi Sizing "Size Chart" link into the Size option row.
   Kiwi injects its link after page load, so retry for up to ~10s. */
(function () {
  function moveSizeChart() {
    var chart = document.querySelector('.product__form__wrapper > .ks-chart-container');
    if (!chart) return false;
    var fieldsets = document.querySelectorAll('.product__selectors .radio__fieldset');
    var sizeFieldset = null;
    for (var i = 0; i < fieldsets.length; i++) {
      var label = fieldsets[i].querySelector('.radio__legend__label');
      if (label && /^size$/i.test(label.textContent.trim())) {
        sizeFieldset = fieldsets[i];
        break;
      }
    }
    if (!sizeFieldset) return false;
    sizeFieldset.appendChild(chart);
    return true;
  }

  function init() {
    if (!document.querySelector('.product__form__wrapper')) return;
    if (moveSizeChart()) return;
    var tries = 0;
    var timer = setInterval(function () {
      if (moveSizeChart() || ++tries > 40) clearInterval(timer);
    }, 250);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
