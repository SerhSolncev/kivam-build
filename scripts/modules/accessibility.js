
document.addEventListener('keyup', function (event) {
  var code = event.keyCode || event.which;
  console.log(document.activeElement);

  if(document.activeElement.classList.contains('fake-tabindex')) {
    document.querySelector('.js-close-menu').focus()
  }

  const menuitem = document.querySelectorAll('.js-open-submenu');
  menuitem.forEach((menuItem) => {
    if (document.activeElement === menuItem) {
      menuitem.forEach((all) => {
        all.classList.remove('opened')
        all.setAttribute('aria-expanded', false);
      })
      if(menuItem.classList.contains('opened')) {
        menuItem.classList.remove('opened');
        menuItem.setAttribute('aria-expanded', false);
      } else {
        menuItem.classList.add('opened');
        menuItem.setAttribute('aria-expanded', true);
      }
    }
  })

  if(!document.activeElement.classList.contains('js-open-submenu') && !document.activeElement.classList.contains('js-submenu-link')) {
    menuitem.forEach((all) => {
      all.classList.remove('opened')
      all.setAttribute('aria-expanded', false);
    })
  }
});

const linesList = document.querySelectorAll('.js-uniq-body-link');

linesList.forEach((lines) => {
  lines.addEventListener('keydown', () => {
    setTimeout(() => {
      if(!document.activeElement.classList.contains('js-uniq-body-link')) {
        $('.js-uniq-body').removeClass('active');
        $('.js-uniq-burger').removeClass('active');
        $('.js-uniq-body').find('[tabindex]').each((i, el) => {
          $(el).attr('tabindex', '-1').prop('tabindex', '-1')
        })
      }
    }, 500)
  })
})

const menuItem = document.querySelectorAll('.js-open-submenu');
menuItem.forEach((item) => {
  item.querySelectorAll('.js-submenu-link').forEach((link, i, arr) => {
    const id = link.getAttribute('id');
    const parent = link.closest('.sub-menu');
    link.addEventListener('keydown', (event) => {
      var code = event.keyCode || event.which;
      const next = event.currentTarget.closest('li').nextElementSibling;
      const prev = event.currentTarget.closest('li').previousElementSibling;

      if(document.activeElement === link) {
        parent.setAttribute('aria-activedescendant', id)
      }
      if(code === 40) {
        event.preventDefault()
        if(next !== null) {
          setTimeout(() => {
            next.querySelector('.js-submenu-link').focus()
          }, 50)
        } else {
          arr.forEach((link, i, arr) => {
            if(i === 0) {
              setTimeout(() => {
                link.focus();
              }, 50)
            }
          })
        }
      }

      if(code === 38) {
        event.preventDefault()
        if(prev !== null) {
          setTimeout(() => {
            prev.querySelector('.js-submenu-link').focus()
          }, 50)
        } else {
          arr.forEach((link, key, arr) => {
            setTimeout(() => {
              link.focus();
            }, 50)
          });
        }
      }
    })
  })
})

const openMenu = document.querySelector('.js-open-menu');
const closeMenu = document.querySelector('.js-close-menu');

if(closeMenu !== null) {
  closeMenu.addEventListener('keydown', (event) => {
    var code = event.keyCode || event.which;
    if(event.shiftKey && code === 9) {
      setTimeout(() => {
        document.querySelector('.js-close-menu').focus()
      }, 50)
    }

    if(code === 13) {
      setTimeout(() => {
        document.querySelector('.js-open-menu').focus();
        document.querySelector('.big-menu').querySelectorAll('[tabindex]').forEach((tabindex) => {
          tabindex.setAttribute('tabindex', '-1')
        })
      }, 100)
    }
  })
}

if(openMenu !== null) {
  openMenu.addEventListener('keydown', (event) => {
    var code = event.keyCode || event.which;

    if(event.shiftKey && code === 13 || code === 13) {
      document.querySelector('.big-menu').classList.add('open');
      openMenu.setAttribute('aria-expanded', true)
      setTimeout(() => {
        document.querySelector('.big-menu').classList.add('open');
        openMenu.setAttribute('aria-expanded', true)
      }, 50)
      setTimeout(() => {
        document.querySelector('.js-close-menu').focus()
      }, 100)
      document.querySelector('.big-menu').querySelectorAll('[tabindex]').forEach((tabindex) => {
        tabindex.setAttribute('tabindex', '0')
      })
    }
  })
}

