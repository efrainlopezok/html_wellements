$kss=[];var root;$(document).ready(function(){$kss.contentWidth=$("section").outerWidth(),$kss.contentHeight=$("section").outerHeight(),root=$("footer.site-footer").data("root"),$("img.svg").each(function(){var t=$(this),i=t.attr("id"),o=t.attr("class"),e=t.attr("src");$.get(e,function(e){var n=$(e).find("svg");"undefined"!=typeof i&&(n=n.attr("id",i)),"undefined"!=typeof o&&(n=n.attr("class",o+" replaced-svg")),n=n.removeAttr("xmlns:a"),!n.attr("viewBox")&&n.attr("height")&&n.attr("width")&&n.attr("viewBox","0 0 "+n.attr("height")+" "+n.attr("width")),t.replaceWith(n)},"xml")}),$(window).on("resize",function(){windowWidth=$(window).width(),windowHeight=$(window).height()}),$(window).on("scroll",function(){}),$(window).load(function(){$("#loader").animate({opacity:0},500,function(){$(this).hide(),$("#page").animate({opacity:1},500,function(){})})})});