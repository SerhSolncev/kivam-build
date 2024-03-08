document.addEventListener('DOMContentLoaded', (event) => {

  const getElement = (context, selector) => {
    if (!context && !selector) {
      return null;
    }

    return context.querySelector(selector);
  };

  // lazy-load
  const el = document.querySelectorAll('.lazy');
  window.observer = lozad(el);
  window.observer.observe();

  const shopSlider = document.querySelectorAll('[data-slider="shop-slider"]');

  if(shopSlider !== null) {

    shopSlider.forEach((el) => {
      const shopSwiper = new Swiper(el.querySelector('.swiper-container'), {
        freeMode: false,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
        simulateTouch: true,
        lazy: {
          loadOnTransitionStart: true,
          loadPrevNextAmount: 2,
          loadPrevNext: true
        },
        loop: false,
        slidesPerView: 5,
        slidesPerGroup: 1,
        followFinger: true,
        spaceBetween: 20,
        on: {
          afterInit: (event) => {

          },

        },
        navigation: {
          nextEl: getElement(el.closest('[data-slider="shop-slider"]'), '.js-next-swiper'),
          prevEl: getElement(el.closest('[data-slider="shop-slider"]'), '.js-prev-swiper'),
          disabledClass: 'swiper-lock'
        },
        pagination: {
          el: el.querySelector('.swiper-pagination'),
          clickable: true,
          type: 'progressbar'
        },
        breakpoints: {
          320: {
            slidesPerView: 1,
            spaceBetween: 8
          },
          420: {
            slidesPerView: 2,
            spaceBetween: 8,
          },
          599: {
            slidesPerView: 3,
            spaceBetween: 8,
          },
          720: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          1025: {
            slidesPerView: 6
          }
        },
      });
    })


  }


  const masterSlider = document.querySelectorAll('[data-slider="service-slider"]');

  if(masterSlider !== null) {

    masterSlider.forEach((el) => {
      const masterSwiper = new Swiper(el.querySelector('.swiper-container'), {
        freeMode: false,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
        simulateTouch: true,
        lazy: {
          loadOnTransitionStart: true,
          loadPrevNextAmount: 2,
          loadPrevNext: true
        },
        // autoplay: {
        //   delay: 5000,
        // },
        // effect: 'fade',
        // fadeEffect: {
        //   crossFade: true
        // },
        loop: false,
        slidesPerView: 1,
        slidesPerGroup: 1,
        followFinger: true,
        on: {
          afterInit: (event) => {
            el.querySelectorAll('.swiper-slide').forEach((visible, i) => {
              if(!visible.classList.contains('swiper-slide-visible')) {
                visible.querySelector('[tabindex]').setAttribute('tabindex', '-1')
              }
            })
          },
          slideChangeTransitionEnd: () => {
            el.querySelectorAll('.swiper-slide').forEach((visible, i) => {
              if(!visible.classList.contains('swiper-slide-visible')) {
                visible.querySelectorAll('[tabindex]').forEach((el) => {
                  el.setAttribute('tabindex', '-1')
                })
              }
            })
            setTimeout(() => {
              el.querySelectorAll('.swiper-slide-visible').forEach((visible, i) => {
                visible.querySelectorAll('[tabindex]').forEach((el) => {
                  el.setAttribute('tabindex', '0')

                })
                if(i === 0) {
                  visible.querySelector('[tabindex]').focus()
                }
              })
            }, 100)
          }
        },
        navigation: {
          nextEl: getElement(el.closest('[data-slider="service-slider"]'), '.js-next-swiper'),
          prevEl: getElement(el.closest('[data-slider="service-slider"]'), '.js-prev-swiper'),
          disabledClass: 'swiper-lock'
        },
        pagination: {
          el: el.querySelector('.swiper-pagination'),
          clickable: true,
          // type: 'progressbar'
        },
      });
    })


  }

  $('body').on('click', '.js-close-magnific', () => {
    $.magnificPopup.close()
  })
  $('body').on('click', '.js-open-modal', (event) => {
    let $this = event.currentTarget;
    let $modalId = $($this).data('modal');

    $.magnificPopup.open({
      mainClass: 'mfp-with-zoom',
      items: {
        src: $modalId, // can be a HTML string, jQuery object, or CSS selector
        type: 'inline'
      },
      callbacks: {
        open() {
          $('body').addClass('popup-open')
        } ,
        close() {
          $('body').removeClass('popup-open')
        }
      }
    });
  })

  // $(document).on('click', 'a[href^="#"]', function (event) {
  //   event.preventDefault();
  //
  //   $('html, body').animate({
  //     scrollTop: $($.attr(this, 'href')).offset().top
  //   }, 500);
  // });

  // $('.popup-gallery').magnificPopup({
  //   delegate: 'a',
  //   type: 'image',
  //   tLoading: 'Loading image #%curr%...',
  //   mainClass: 'mfp-img-mobile',
  //   gallery: {
  //     enabled: true,
  //     navigateByImgClick: true,
  //
  //     preload: [0,1] // Will preload 0 - before current, and 1 after the current image
  //   },
  //   image: {
  //     tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
  //     titleSrc: function(item) {
  //       return item.el.attr('title');
  //     }
  //   },
  // });

  $(window).on('scroll', function () {
    if(document.querySelector('.search-block') !== null) {
      if($(window).scrollTop() > 200 ){
        document.querySelector('.search-block').classList.add('scroll')
      } else if($(window).scrollTop() < 200){
        document.querySelector('.search-block').classList.remove('scroll')
      }
    }
  })

  const blockInView = document.querySelectorAll('.js-inview');
  blockInView.forEach((el, i) => {
    $(el).bind('inview', function (event, visible, visiblePartX, visiblePartY) {
      if (visible) {
        if($(el).closest('.section--left-animate').length) {
          $(el).closest('.animate-svg').addClass('is-views');
        } else {
          $(el).closest('.animate-svg').addClass('is-views');
        }
      } else {
        setTimeout(() => {
          $(el).closest('.animate-svg').removeClass('is-views');
        })
      }
    });
  });

  // $('.js-tabs-wrap').each((i, wrap) => {
  //     const buttons = $(wrap).find('.js-tab-button');
  //     const blocks = $(wrap).find('.js-tab-block');
  //
  //     buttons.each((i, button) => {
  //       const id = $(button).data('id');
  //       $(button).on('click', () => {
  //         buttons.removeClass('is-active')
  //         $(button).addClass('is-active')
  //         blocks.hide()
  //         $(wrap).find('.js-tab-block[data-id="'+ id+'"]').fadeIn()
  //       })
  //     })
  // })


  $('.js-send-form').each(function () {
    $(this).submit(function(e) {
      e.preventDefault();
      let formBlock = $(this).serialize();
      let form = $(this).serialize();

      let validate = true
      let validateField = this.querySelectorAll(".form-required")
      if(validateField){
        validateField.forEach(field=>{
          console.log(field);
          let fieldParent = field.closest(".form-item-valid")
          // empty fields
          if(field.value == ""){
            validate = false
            fieldParent.classList.add("error")
          }else{
            fieldParent.classList.remove("error")
          }
          // empty fields

          // checkbox
          if(field.classList.contains("stepper-checkbox")){
            if(!field.checked){
              validate = false
              fieldParent.classList.add("error")
            }else{
              fieldParent.classList.remove("error")
            }
          }

          // radios
          // checkbox end

          // email
          if(field.classList.contains('mail-field')){
            let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
            let value = field.value;
            if (value.match(pattern)) {
              fieldParent.classList.remove("error-mail")
            } else {
              fieldParent.classList.add("error-mail")
              validate = false
            }
            if (value.length < 1) {
              fieldParent.classList.remove("error-mail")
            }
          }
          // email end

          // phone field
          if(field.classList.contains("phone-field")){
            if(field.value.length < 16){
              fieldParent.classList.add("error__number")
              validate = false
            }else{
              fieldParent.classList.remove("error__number")
            }
          }
          // phone field end

          return validate
        })
      }

      if(validate) {
        $(this).addClass('loading')
        $.ajax({
          type: "POST",
          url: "mail.php",
          data: $(this).serialize()
        }).done(function() {
          console.log('form-sended');
        });
      }
    });
  })

  var uploadField = document.getElementById("file");

  if(uploadField !== null) {
    uploadField.onchange = function() {
      var filename = uploadField.value.split('\\').pop();
      document.querySelector('.input-file-wrap__name').innerHTML = filename;
      if(this.files[0].size > 3000000000){
        alert("File is too big!");
        this.value = "";
        document.querySelector('.input-file-wrap__name').innerHTML = ''
      };
    };
  }

  $('.js-uniq-burger').on('click', () => {

    if($('.js-uniq-burger').hasClass('active')) {
      $('.js-uniq-body').removeClass('active');
      $('.js-uniq-burger').removeClass('active');
      $('.js-uniq-body').find('[tabindex]').each((i, el) => {
        $(el).attr('tabindex', '-1').prop('tabindex', '-1')
      })
    } else {
      $('.js-uniq-body').addClass('active');
      $('.js-uniq-burger').addClass('active');
      $('.js-uniq-body').find('[tabindex]').each((i, el) => {
        $(el).attr('tabindex', '0').prop('tabindex', '0')
      })
    }
  })

  // $('body').on('click',function(event){
  //   if(!$(event.target).is('.js-uniq-burger')){
  //     $('.js-uniq-burger').removeClass('active');
  //     $('.js-uniq-body').removeClass('active');
  //   }
  // });

  $('.ac-trigger').each(function () {
    let $this = $(this);
    let $parent = $this.closest('.ac');
    let $parentWrap = $parent.closest('.js-accordion');
    let $block = $parent.find('.ac-panel');
    let mitiple = $parentWrap.data('multiple');

    if ($parent.hasClass('is-active')) {
      $parent.removeClass('is-active');
      $block.slideUp(400);
      $this.attr('aria-expanded', 'false').prop('aria-expanded', 'false');
    } else {
      if (!mitiple) {
        $parentWrap.find('.ac-panel').slideUp(400);
        $parentWrap.find('.ac').removeClass('is-active');
        $parentWrap.find('.ac-trigger').attr('aria-expanded', 'false').prop('aria-expanded', 'false');
      }
      $parent.addClass('is-active');
      $block.slideDown(400)
      $this.attr('aria-expanded', 'true').prop('aria-expanded', 'true');
    }
  })

  $('body').on('click', '.ac-trigger', (event) => {
    let $this = $(event.currentTarget);
    let $parent = $this.closest('.ac');
    let $parentWrap = $parent.closest('.js-accordion');
    let $block = $parent.find('.ac-panel');
    let mitiple = $parentWrap.data('multiple');

    if ($parent.hasClass('is-active')) {
      $parent.removeClass('is-active');
      $block.slideUp(400);
      $this.attr('aria-expanded', 'false').prop('aria-expanded', 'false');
    } else {
      if (!mitiple) {
        $parentWrap.find('.ac-panel').slideUp(400);
        $parentWrap.find('.ac').removeClass('is-active');
        $parentWrap.find('.ac-trigger').attr('aria-expanded', 'false').prop('aria-expanded', 'false');
      }
      $parent.addClass('is-active');
      $block.slideDown(400)
      $this.attr('aria-expanded', 'true').prop('aria-expanded', 'true');
    }
  })


  $('.js-select').each((i, el) => {
    $(el).select2({
      allowClear: true,
      placeholder: $(this).data('placeholder'),
      minimumResultsForSearch: $(el).data('search-min-length') === undefined ? '10' : $(el).data('search-min-length'),
      dropdownPosition: 'below',
      dropdownParent: $(el).parent(),
      maximumSelectionLength: $(el).data('max-length'),
      language: {
        noResults: () => {
          return 'noResults';
        },
        maximumSelected: () => {
          return + $(el).data('max-length') + ' ' +
              'maximumSelected 5 ';
        },
        searching: function (params) {
          query = params;
          return 'Searching…';
        }
      },
      templateResult: function (item) {
        if (item.loading) {
          return item.text;
        }
        var term = query.term || '';
        var $result = markMatch(item.text, term);
        return $result;
      },
      // ajax: {
      //   url: '/select2.json',
      //   dataType: 'json'
      // }
    });

    function markMatch(text, term) {
      var match = text.toUpperCase().indexOf(term.toUpperCase());
      var $result = $('<span></span>');
      if (match < 0) {
        return $result.text(text);
      }
      $result.text(text.substring(0, match));
      var $match = $('<span class="select2-rendered__match"></span>');
      $match.text(text.substring(match, match + term.length));
      $result.append($match);
      $result.append(text.substring(match + term.length));
      return $result;
    }

    // clone and append choises

    $(el).on('select2:select', function (e) {

    })

    $(el).on('select2:unselect', function (e) {

    })

    $(el).on('select2:open', function (e) {

    })

    $(el).on('select2:closing', function () {

    })
  })

  const mediaElem = document.querySelectorAll(".js-video");

  mediaElem.forEach((video) => {
    video.addEventListener('loadeddata', function() {
      setTimeout(() => {
        video.play()
      }, 0)
    }, false);

  })

  const menuitem = document.querySelectorAll('.js-open-submenu');

  menuitem.forEach((menuItem) => {
    menuItem.addEventListener('click', (ev) => {
      menuitem.forEach((all) => {
        all.classList.remove('opened')
      })
      if(menuItem.classList.contains('opened')) {
        menuItem.classList.remove('opened')
      } else {
        menuItem.classList.add('opened')
      }
    })

    menuItem.addEventListener('keydown', (event) => {
      var code = event.keyCode || event.which;
      if(document.activeElement.classList.contains('js-open-submenu') && code === 40) {
        event.preventDefault()
        menuItem.querySelectorAll('.js-submenu-link').forEach((link, i) => {
          if(i === 0) {
            link.focus()
          }
        })
      }
    })
  })

  document.body.addEventListener('click', (ev) => {
    if(!ev.target.classList.contains('js-open-submenu') && ev.target.closest('.js-open-submenu') === null) {
      menuitem.forEach((all) => {
        if(all.classList.contains('opened')) {
          all.classList.remove('opened')
        }
      })
    }

    if(!ev.target.classList.contains('js-uniq-burger') && ev.target.closest('.js-uniq-burger') === null) {
      $('.js-uniq-body').removeClass('active');
      $('.js-uniq-burger').removeClass('active');
    }
  })

  const openMenu = document.querySelector('.js-open-menu');
  const closeMenu = document.querySelector('.js-close-menu');

  if(openMenu !== null) {
    openMenu.addEventListener('click', (ev) => {
      document.querySelector('.big-menu').classList.add('open');
      openMenu.setAttribute('aria-expanded', true)
    })

    closeMenu.addEventListener('click', (ev) => {
      document.querySelector('.big-menu').classList.remove('open');
      openMenu.setAttribute('aria-expanded', false)
    })
  }

  var countries = [
    { value: 'city1', data: 'AD' },
    // ...
    { value: 'city2', data: 'ZZ' }
  ];

  $('.autocomplete').each((i, el) => {
    $(el).autocomplete({
      appendTo: $(el).next('.suggest-block'),
      lookup: countries,
      onSelect: function (suggestion) {
        alert('You selected: ' + suggestion.value + ', ' + suggestion.data);
      }
    })
  })

  $(document).on('click', 'a[href^="#"]', function (event) {
    event.preventDefault();

    $('html, body').animate({
      scrollTop: $($.attr(this, 'href')).offset().top
    }, 2000);
  });

})
