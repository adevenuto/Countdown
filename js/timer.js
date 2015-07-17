var $timer_template = $('.timer_template');
  var createNew = document.getElementById("createButton");

  createNew.addEventListener('click', function() {
    $timer_template.clone(true, true).toggleClass('timer_template timer').appendTo("#timers");
  });

  $('body').on('click', '.startButton', function(e) {
    var $this = $(e.target);
    var $this_timer = $this.parents('.timer');
    startTimer($this_timer);
  });

  $('body').on('click', '.closeTimer', function(e) {
    var $this = $(e.target);
    var $this_timer = $this.parents('.timer');
    $this_timer.remove();
  });

  $('body').on('click', '.resetButton', function(e) {
    var $this = $(e.target);
    var $this_timer = $this.parents('.timer');
    resetTimer($this_timer);
  });

  $('body').on('click', '.pauseButton', function(e) {
      var $this = $(e.target);
      var $this_timer = $this.parents('.timer');
      pauseTimer($this_timer);
  });

  $('body').on('keypress', 'input', function(e) {
    if (e.which < 48 || e.which > 57) {
      e.preventDefault();
    }
  });

  $('.closeTimer').hover(function(e) {
      var $this = $(e.target);
      var $this_timer = $this.parents('.timer')
      var $these_input_fields = $this_timer.find('.inputFields');
      var $these_controls = $this_timer.find('.controls');
      $these_input_fields.toggleClass('overlay');
      $these_controls.toggleClass('overlay');
  })

  function startTimer(timer) {
    if (timer.find('.hours').val() == '' && timer.find('.minutes').val() == '' && timer.find('.seconds').val() == '') {
      alert("Enter a time to begin");
    } else if (!timer.hasClass('running')) {
      timer.addClass('running');
      toggleInputs(timer);
      showHide(timer);
      doCountDown(timer);
    }
  }

  function showHide(timer) {
    timer.find('button').toggleClass('hidden');
  }

  // Toggle input fields from disabled to enabled
  // @params Array, Boolean
  function toggleInputs(timer) {
    if (timer.hasClass('running')) {
      timer.find('input').prop('disabled', true).attr('disabled', 'disabled');
    } else {
      timer.find('input').prop('disabled', false).removeAttr('disabled');
    }
  }

  function createSeconds(timer) {
    var seconds = parseInt(timer.find('.seconds').val() || 0) + (parseInt(timer.find('.minutes').val() || 0) * 60) + (parseInt(timer.find('.hours').val() || 0) * 3600);
    timer.data('seconds', seconds);
  }

  function resetTimer(timer) {
    window.clearInterval(timer.data('interval'));
    timer.removeClass('running');
    timer.find('input').val('');
    toggleInputs(timer);
    showHide(timer);
  }

  function pauseTimer(timer) {
    if (timer.hasClass('running')) {
      clearInterval(timer.data('interval'));
      timer.removeClass('running')
      timer.find('.pauseButton').text('Continue');
    } else {
      timer.addClass('running');
      timer.find('.pauseButton').text('Pause');
      doCountDown(timer);
    }
  };

  function doCountDown(timer) {
    var this_timer = timer;
    createSeconds(timer);
    var interval = setInterval(function() {
      watchCountDown(this_timer);
    }, 1000);
    timer.data('interval', interval);
  }

  function watchCountDown(timer) {
    var seconds = timer.data('seconds');
    seconds--;
    timer.data('seconds', seconds);
    if (seconds < 0) {
      clearInterval(timer.data('interval'));
      timerAlert(timer);
    } else {
      var h = parseInt(parseInt(seconds / 60) / 60) % 24;
      var m = parseInt(seconds / 60) % 60;
      var s = parseInt(seconds) % 60;
      timer.find('.hours').val(h);
      timer.find('.minutes').val(m);
      timer.find('.seconds').val(s);
    }
  }

  function timerAlert(timer) {
    timer.removeClass('running');
    toggleInputs(timer);
    showHide(timer);
  }