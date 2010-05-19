// utility shared between views

(function($){
  // deal with the iPhone's shitty ability to center things
  //   you probably need to set a width and a height on this guy
  $.fn.vertical_center = function() {
    var height = $(this).height(), screen_height = $(window).height(),
        scroll = $(window).scrollTop();
    return $(this).css({
      position: 'absolute',
      top: (scroll + (screen_height / 2) - (height / 2)) + 'px'
    });
  };
  
  
  
  // captures the click event for the element and loads the given url into the
  // replaceSel selector
  // NOTE: Uses live events, so must be used with a selector in the same
  // way as live events
  $.fn.targetContent = function(replaceSel) {
    return $(this.selector).live('click', function(ev) {
      ev.preventDefault();  
      
      // work around browser inconsitencies to ensure we
      // have the absolute href
      var href = '';
      if ($.support.hrefNormalized) {
        href = this.href;
      } else {
        href = this.getAttribute('href', 4);
      }
      
      $.loadContent(replaceSel, href);
    });
  };
  
  $.fn.formTargetContent = function(replaceSel) {
    return $(this.selector).live('submit', function(ev) {
      ev.preventDefault();
      
      // set the spinner in motion in the content area
      $(replaceSel).html("<div id='contentSpinner'></div>");
      
      $.post($(this).attr('action'), $(this).serialize(), function(data) {
        $(replaceSel).html(data);
        FB.XFBML.Host.parseDomTree();
      });
    });
  }
    
  $.loadContent = function(replaceSel, href) {
    // set the spinner in motion in the content area
    // $(replaceSel).html("<div id='contentSpinner'></div>");
    
    // replace the outerHTML of replaceSel with the 
    // data returned from the specified url
    $.get(href, function(data) {
      $(replaceSel).replaceWith(data);
      $(window).trigger('ajaxLoad');
      FB.XFBML.Host.parseDomTree();
    });    
  };  
}(jQuery));