/*

	KSS Boilerplate

	Site Development by Kitchen Sink Studios, Inc

	Developers:
		Jeremy_Fishman(jfish)
		Jeff_Williams(jwill10s)
		Braden_Witherwax(radenB)

*/

var winWidth, winHeight;

var mobileSliderSize = function() {
	var sliders = Array.from(document.getElementsByClassName('mobile-swipe-slider'))

	winWidth < 768 ?
		sliders.map( slider => {
			var slides = Array.from(slider.children[0].children)
			var height = 0

			slides.map( s => s.clientHeight > height ? height = s.clientHeight : null )
			slider.style.height = height + 'px'
		})
	: sliders.map( slider => slider.style.height = 'inherit' )
}

$(document).ready(function() {

var lastScrollTop = 0;
var headerHeight = 70;

$(window).on('resize', function() {
	winWidth = $(window).width();
	winHeight = $(window).height();
	mobileSliderSize()
})

$(window).on('load', function() {
	winWidth = $(window).width();
	winHeight = $(window).height();
	mobileSliderSize()
});

$('.mobile-icon').on('click', function() {
	$('.main-nav, .mobile-icon').toggleClass('show')
})

$('.hero-slider').slick({
	autoplay:true,
	prevArrow:'<img class="slider-button left" role="button" src="assets/img/left_arrow.png" />',
	nextArrow:'<img class="slider-button right" role="button" src="assets/img/right_arrow.png" />',
	dots:true
})

$('.plus').on('click', function() {
	var input = $(this).parent().find($('.quant-display'))
	var currentVal = parseInt($(input).val())+1
	$(input).val(currentVal)
})

$('.minus').on('click', function() {
	var input = $(this).parent().find($('.quant-display'))
	var currentVal = parseInt($(input).val()) - 1
	if (currentVal > 1) {
		$(input).val(currentVal)
	}
	else (
		$(input.val(1))
	)
})

$('.filter-display .product').on('mouseover', function() {
	$(this).find('.quick-view').addClass('show')
})

$('.filter-display .product').on('mouseleave', function() {
	$(this).find('.quick-view').removeClass('show')
})

$('.filter-toggle').on('click', function() {
	$('.filters-strip, .filter-icon').toggleClass('show')
})


var $categories = $('.filter-categories input')
var categoriesRef = $.map($categories, function( cat ) {
	return {
		el:$(cat)[0],
		name:$(cat).data('category')
	}
})

var $products = $('.filter-display .product')
var productsRef = $.map($products, function( product ) {
	return {
		el:$(product)[0],
		index:$(product).index(),
		categories:$(product).data('categories'),
		visible:true
	}
})

var selectedCheckBoxes = []
var availableCheckboxes = []

setFilterResults(productsRef.length)

$categories.on('change', function() {
	availableCheckboxes = []
	activeProductCount = 0
	$(this).attr('aria-checked', $(this).prop('checked'))
	var thisCategory = $(this).data('category')
	if ($(this).prop('checked')) {
		selectedCheckBoxes.push( thisCategory )
	}
	else {
		selectedCheckBoxes.splice(selectedCheckBoxes.indexOf(thisCategory), 1)
	}

	if ( selectedCheckBoxes.length == 0 ) {
		$products.removeClass('hide')
		$('.filter-categories label').css({ 'opacity' : 1.0 })
		$categories.prop('disabled', false)
		setFilterResults(productsRef.length)
	}
	else {
		$products.addClass('hide')
		productsRef.forEach( function( product ) {
			var isFound = true
	 		selectedCheckBoxes.forEach( function( category ) {
				// console.log('boxes inside == > ',category)
				// console.log(product.categories)
				if (product.categories.indexOf(category) == -1) {
					product.el.classList.add('hide')
					product.visible = false
					isFound = false
				}
			})
			if (isFound) {
				product.el.classList.remove('hide')
				product.visible = true
				availableCheckboxes = availableCheckboxes.concat(product.categories)
			}
		})

		// grey out checkboxes that aren't in remaining product category options
		categoriesRef.forEach( function(category) {
			if (availableCheckboxes.indexOf(category.name) === -1) {
				// console.log(category)
				category.el.parentNode.style.opacity = .3
				category.el.disabled = true
			}
			else {
				category.el.parentNode.style.opacity = 1.0
				category.el.disabled = false
			}
		})

		setFilterResults(productsRef.filter( function( prod ) {
			return prod.visible
		}).length)
	}
})

function setFilterResults(results) {
	var prodStr = results == 1 ? ' Product' : ' Products'
	$('.filter-display .results').html('Showing ' + results + prodStr + '</p>')
}

  /* Accordion elements */
  
  $('.accordion-block .collapse-link').click(function(e) {
    e.preventDefault();
    var curLink = this;
    $(this).closest('.accordion-block').find('.collapse-panel').removeClass('show');
    $(this).closest('.accordion-block').find('.collapse-link').each(function(idx, el){
      if(el !== curLink) {
        $(el).attr('aria-expanded', 'false');
      }
    });

    if($(this).attr('aria-expanded') === 'true') {
      $(this).attr('aria-expanded', 'false');
      $(this).closest('.collapse-heading').next('.collapse-panel').removeClass('show');
    }
    else {
      $(this).attr('aria-expanded', 'true');
      $(this).closest('.collapse-heading').next('.collapse-panel').addClass('show');
    }
  });

  /* Single Product slider */

  $('.product-slider .product-slider-main').slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    asNavFor: '.product-slider .product-slider-thumb'
  });
  $('.product-slider .product-slider-thumb').slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: '.product-slider .product-slider-main',
    dots: true,
    centerMode: false,
    focusOnSelect: true
  });

  if($('.learn-products-slider').length > 0) {

    $('.learn-products-slider').slick({
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 3,
      arrows: false,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: true,
          }
        },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        },
      ]
    });

  }

  /* Common toggle collapse behavior */

  $('[data-toggle="collapse"]').on('click', function(e) {
    e.preventDefault();

    var target = $(this).attr('data-target');

    if(target) {
      $(target).toggleClass('expanded');

      if($(this).attr('aria-expanded') == 'true') {
        $(this).attr('aria-expanded', 'false');
      }
      else {
        $(this).attr('aria-expanded', 'true');
      }
    }
  });

  /* increase and decrease spinners */

  $('.input-group-spinner').each(function() {
    var spinner = $(this),
      input   = spinner.find('input'),
      btnUp   = spinner.find('.plus'),
      btnDown = spinner.find('.minus'),
      min   = input.attr('min'),
      max   = input.attr('max'),

      unitMsr = '',
      isNumber = input.attr('type') == 'number';

    if(input.get(0).hasAttribute('unit')) { 
      unitMsr = input.attr('unit');
    }

    btnUp.click(function() {
      var oldVal = parseFloat(input.val());
      var newVal = oldVal;
      if (oldVal < max) {
          newVal = oldVal + 1;
      }
      if (!isNumber && unitMsr != '') {
          newVal = newVal + ' ' + unitMsr;
      }

      input.val(newVal);
      input.trigger('change');

      btnDown.removeAttr('disabled');
    });

    btnDown.click(function() {
      var oldVal = parseFloat(input.val());
      var newVal = oldVal;
      if (oldVal > min) {
          newVal = oldVal - 1;
      }

      if (!isNumber && unitMsr != '') {
          newVal = newVal + ' ' + unitMsr;
      }

      input.val(newVal);
      input.trigger('change');
    });
  });


});


/* 
* Toggle hidden display elements when a check input changed 
*  invertBehaviour if false or undefined will show the target when checked and hide when not cheked, 
*  if true will hide the target when checked and make it visible when uncheck
*/

function toggleDisplayChecked(el, invertBehaviour) {
  var checked = el.checked,
      target = $(el).attr('data-target');
  console.log(checked, target);

  if(invertBehaviour == undefined) {
    invertBehaviour = false;
  }

  if (checked) {
    if(invertBehaviour !== true) {
      $(target).removeClass('hidden');
    }
    else {
      $(target).addClass('hidden');
    }
  }
  else {
    if(invertBehaviour !== true) {
      $(target).addClass('hidden');
    }
    else {
      $(target).removeClass('hidden');
    }
  }
}


