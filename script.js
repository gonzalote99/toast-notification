Toaster = function() {
  Toaster.amount = 0;

  Toaster.default = {
    color: '#C5C56A',
    autoClose: true,
    autoCloseDelay: 2000,
    position: 'right-top'

  };

  Toaster.toast = function(m, options = Toaster.default ) {
    if($('#toast-'+ Toaster.amount).length) Toaster.dismiss('#toast-'+Toaster.amount);
    Toaster.amount++;

    var id = 'toast-'+Toaster.amount;
    var selector = '#'+id;
    $toast = $('<div class="toaster"></div>').attr('id', id).text(m).css({'background': options.color || Toaster.default.color}).addClass('toaster-'+(options.position || Toaster.default.position));
    $('body').append($toast);
    setTimeout(function() {
      $(selector).addClass('toasting');

    }, 1);

    $(selector).click(function() {
      if(options.onClick) options.onClick();
      Toaster.dismiss(selector);
    });

    var autoClose= Toaster.default.autoClose;
    if(options.autoClose!==undefined) autoClose=options.autoClose;
    if (autoClose) {
      setTimeout(function() {
        Toaster.dismiss(selector);

      }, options.autoCloseDelay || Toaster.default.autoCloseDelay);
    }

  }

  Toaster.error = function(m, options) {
    Toaster.default.color = '#F44236';
    Toaster.toast(m, options);
    Toaster.default.color = '#C5C56A';

  }

  Toaster.dismiss = function(toast) {
    $(toast).removeClass('toasting').addClass('toasting-dismissed');
    setTimeout(function() {
      $(toast).remove();
    }, 1000);
  }

};

new Toaster();