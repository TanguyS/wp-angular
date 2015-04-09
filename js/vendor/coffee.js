(function() {
  var MutationObserver, Util, WeakMap, getComputedStyle, getComputedStyleRX, mod, sgdf, templateUrl, tplVCUrl,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  sgdf = angular.module("sgdf", ['ui.router', 'ngAnimate', 'ui.bootstrap', 'infinite-scroll', 'angularFileUpload', 'masonry', 'angularjs.media.directives']);

  sgdf.run([
    "$rootScope", function($rootScope) {
      return $rootScope.globalData = {
        views: blogInfo.views,
        site: blogInfo.site,
        imgpath: blogInfo.img,
        api: blogInfo.api
      };
    }
  ]);

  sgdf.run([
    '$rootScope', function($rootScope) {
      (new WOW).init();
      $rootScope.$on('$stateChangeStart', function(next, current) {
        (new WOW).sync();
      });
    }
  ]);

  sgdf.filter("to_html_safe", [
    "$sce", function($sce) {
      return function(text) {
        return $sce.trustAsHtml(text);
      };
    }
  ]);

  sgdf.filter('getById', function() {
    return function(input, id) {
      var i, len;
      i = 0;
      len = input.length;
      while (i < len) {
        if (+input[i].id === +id) {
          return input[i];
        }
        i++;
      }
      return null;
    };
  });

  sgdf.filter('range', function() {
    return function(input, total) {
      var i;
      total = parseInt(total);
      i = 0;
      while (i < total) {
        input.push(i);
        i++;
      }
      return input;
    };
  });

  if (!String.linkify) {
    String.prototype.linkify = function() {
      var emailAddressPattern, pseudoUrlPattern, urlPattern;
      urlPattern = /\b(?:https?|ftp):\/\/[a-z0-9-+&@#\/%?=~_|!:,.;]*[a-z0-9-+&@#\/%=~_|]/g;
      pseudoUrlPattern = /(^|[^\/])(www\.[\S]+(\b|$))/g;
      emailAddressPattern = /\w+@[a-zA-Z_]+?(?:\.[a-zA-Z]{2,6})+/g;
      return this.replace(urlPattern, "<a href=\"$&\">$&</a>").replace(pseudoUrlPattern, "$1<a href=\"http://$2\">$2</a>").replace(emailAddressPattern, "<a href=\"mailto:$&\">$&</a>");
    };
  }

  jQuery(document).ready(function($) {
    var absoluteCentered, alignOn, centerIn, centerVertically, copyParentHW, equalizeHeights, fade, fillHeight, fillWidth, heightChildrenBased, maxWidth, videoSizes;
    $("[data-slideTarget]").click(function() {
      var target;
      target = $(this).attr("data-slideTarget");
      if (target === "next") {
        if ($(this).next().is(":visible")) {
          $(this).next().slideUp();
        } else {
          $(this).next().slideDown();
        }
      } else {
        if ($(target).is(":visible")) {
          $(target).slideUp();
        } else {
          $(target).slideDown();
        }
      }
    });
    fillHeight = function() {
      return $("[data-fillH]").each(function() {
        var hei, less;
        less = 0;
        if ($(this).attr("data-hLess").length !== 0) {
          less = parseInt($(this).attr("data-hLess"));
        }
        hei = $(this).attr("data-fillH");
        $(this).css("min-height", (window.screenHeight * hei / 100) - less);
      });
    };
    fillHeight();
    $(window).on("resize orientationchange", function() {
      return fillHeight();
    });
    alignOn = function() {
      $("[data-align-on]").each(function() {
        var alignMin, fH, minLength;
        if ($(this).attr("data-align-min").length > 0) {
          alignMin = parseInt($(this).attr("data-align-min"));
        } else {
          alignMin = 0;
        }
        if (typeof $(this).attr("data-min-width") !== "undefined") {
          minLength = parseInt($(this).attr("data-min-width"));
          if (minLength > window.screenWidth) {
            $(this).css("height", alignMin);
            $("#" + $(this).attr("data-align-on")).css("height", "auto");
            return;
          }
        }
        fH = $("#" + $(this).attr("data-align-on")).outerHeight();
        if (fH > alignMin) {
          $(this).css("height", fH);
        } else {
          $(this).css("height", alignMin);
          $("#" + $(this).attr("data-align-on")).css("height", alignMin);
        }
      });
    };
    alignOn();
    $(window).on("resize orientationchange", function() {
      return alignOn();
    });
    copyParentHW = function() {
      $(".copyParentWidth").each(function() {
        $(this).css("width", $(this).parent().width());
      });
      $(".copyParentHeight").each(function() {
        $(this).css("height", $(this).parent().height());
      });
    };
    copyParentHW();
    $(window).on("resize orientationchange", function() {
      copyParentHW();
    });
    videoSizes = function() {
      var $wrapper, futureHeight, futureWidth, over, under, wrapperHeight, wrapperWidth;
      if ($(".wp-video").length !== 0) {
        if ($(".wp-video").parents(".backgroundVideo").length === 0) {
          $(".wp-video").css({
            width: window.screenWidth,
            height: window.screenWidth * 9 / 16
          });
        } else {
          $wrapper = $(".wp-video").parents(".backgroundVideo");
          wrapperWidth = $wrapper.width();
          wrapperHeight = $wrapper.height();
          futureWidth = window.screenWidth;
          futureHeight = window.screenWidth * 9 / 16;
          over = futureWidth / futureHeight;
          under = futureHeight / futureWidth;
          if (wrapperWidth / wrapperHeight >= over) {
            $(".wp-video").css({
              width: wrapperWidth + "px",
              height: Math.ceil(under * wrapperWidth) + "px",
              marginLeft: "0px",
              marginTop: Math.abs((under * wrapperWidth) - wrapperHeight) / -2 + "px"
            });
          } else {
            $(".wp-video").css({
              width: Math.ceil(over * wrapperHeight) + "px",
              height: wrapperHeight + "px",
              marginTop: "0px",
              marginLeft: Math.abs((over * wrapperHeight) - wrapperWidth) / -2 + "px",
              maxWidth: "none"
            });
          }
        }
        $("video").css({
          width: "100%",
          height: "100%"
        });
      }
      if ($(".wp-audio").length !== 0) {
        $(".wp-audio").css({
          width: window.screenWidth,
          height: "50px"
        });
        return $("audio").css({
          width: "100%",
          height: "100%"
        });
      }
    };
    videoSizes();
    $(window).on("resize orientationchange", function() {
      return videoSizes();
    });
    fade = 750;
    if ($(".slider-data").length !== 0) {
      $(".slider-data").each(function() {
        var sliderImages, target;
        target = $(this).attr("data-target");
        if (typeof target !== "undefined") {
          sliderImages = [];
          $(this).find("img").each(function() {
            return sliderImages.push($(this).attr("src"));
          });
          if (sliderImages.length > 0) {
            $("#" + target).backstretch(sliderImages, {
              duration: 3000,
              fade: fade
            });
          }
          return;
        }
      });
    }
    centerVertically = function() {
      $("[data-centerVertically]").each(function() {
        var h, margins, minMargins, rH;
        minMargins = parseInt($(this).attr("data-centerVertically"));
        if ($(this).find(".center").length === 0) {
          $(this).wrapInner("<div class='center clearfix relative' />");
        }
        h = $(this).find(".center").height();
        if (h === 0) {
          $(this).find(".center").children().each(function() {
            h += $(this).height();
          });
          $(this).find(".center").css("height", h);
        }
        rH = $(this).height();
        margins = (rH - h) / 2;
        if (margins >= minMargins) {
          $(this).css({
            paddingTop: margins,
            paddingBottom: margins
          });
        } else {
          $(this).css({
            paddingTop: minMargins,
            paddingBottom: minMargins
          });
        }
      });
    };
    centerVertically();
    $(window).on("resize orientationchange", function() {
      centerVertically();
    });
    absoluteCentered = function() {
      $("[data-absoluteCentered]").each(function() {
        return $(this).css({
          top: "50%",
          left: "50%",
          marginLeft: -1 / 2 * $(this).outerWidth(),
          marginTop: -1 / 2 * $(this).outerHeight()
        });
      });
    };
    absoluteCentered();
    $(window).on("resize orientationchange", function() {
      absoluteCentered();
    });
    heightChildrenBased = function() {
      return $("[data-hcb]").each(function() {
        var maxHeight, selector;
        selector = $(this).data("hcb");
        maxHeight = Math.max.apply(null, $(this).find(selector).map(function() {
          return $(this).height();
        }));
        $(this).css("height", maxHeight);
      });
    };
    heightChildrenBased();
    $(window).on("resize orientationchange", function() {
      heightChildrenBased();
    });
    maxWidth = function() {
      $("[data-maxW]").each(function() {
        var baseW, max;
        baseW = $(this).attr('data-baseW');
        if (typeof baseW === "undefined" || baseW === false) {
          baseW = $(this).width();
          $(this).attr('data-baseW', baseW);
        }
        baseW = parseInt(baseW);
        max = parseInt($(this).attr("data-maxW"));
        if ($(this).width() + max > $(window).width()) {
          $(this).css("width", $(window).width() - max);
        } else {
          if ($(window).width() - max > baseW) {
            $(this).css("width", baseW);
          } else {
            $(this).css("width", $(window).width() - max);
          }
        }
      });
    };
    maxWidth();
    $(window).on("resize orientationchange", function() {
      maxWidth();
    });
    $("[data-toggleFade]").each(function() {
      var toggleTarget;
      toggleTarget = $(this).data("toggleFade");
      $(this).click(function() {
        if ($(toggleTarget).is(":visible")) {
          $(toggleTarget).fadeOut("fast");
        } else {
          $(toggleTarget).fadeIn("fast");
        }
      });
    });
    equalizeHeights = function() {
      $("[data-equalizeHeight]").each(function() {
        var maxHeight, sel;
        sel = $(this).attr("data-equalizeHeight");
        maxHeight = Math.max.apply(null, $(this).find(sel).map(function() {
          return $(this).outerHeight();
        }));
        $(this).find(sel).css({
          height: maxHeight
        });
      });
    };
    equalizeHeights();
    $(window).on("resize orientationchange", function() {
      equalizeHeights();
    });
    centerIn = function() {
      return $("[data-centerH]").each(function() {
        var containerH, mg;
        containerH = parseInt($(this).attr("data-centerH"));
        mg = (containerH - $(this).height()) / 2;
        $(this).css({
          paddingTop: mg,
          paddingBottom: mg
        });
      });
    };
    centerIn();
    $(window).on("resize orientationchange", function() {
      centerIn();
    });
    $(".dropdown").each(function() {
      var h;
      h = $(this).children().first().outerHeight() - 3;
      $(this).css({
        height: h,
        overflow: "hidden",
        display: "block"
      });
    });
    $(document).on("mouseenter", ".dropdown", function() {
      var innerHeight;
      innerHeight = $(this).children().length * $(this).children().first().outerHeight() - 3;
      $(this).stop(true, true).animate({
        height: innerHeight
      }, 300, "easeInOutQuint");
    });
    $(document).on("mouseleave", ".dropdown", function() {
      var firstH;
      firstH = $(this).children().first().outerHeight() - 3;
      $(this).stop(true, true).animate({
        height: firstH
      }, 300, "easeInOutQuint");
    });
    $(document).on("click", ".dropdown", function() {
      var firstH, innerHeight;
      firstH = $(this).children().first().outerHeight() - 3;
      if ($(this).height() === firstH) {
        innerHeight = $(this).children().length * ($(this).children().first().outerHeight() - 3);
        $(this).stop(true, true).animate({
          height: innerHeight
        }, 300, "easeInOutQuint");
      } else {
        $(this).stop(true, true).animate({
          height: firstH
        }, 300, "easeInOutQuint");
      }
    });
    fillWidth = function() {
      $("[data-fillW]").each(function() {
        var w;
        w = $(window).width() * parseInt($(this).attr("data-fillW")) / 100;
        $(this).css({
          width: w
        });
      });
    };
    fillWidth();
    $(window).on("resize orientationchange", function() {
      fillWidth();
    });
    if ($(".masonry").length !== 0) {
      $(".masonry").each(function() {
        $(this).imagesLoaded((function(_this) {
          return function() {
            return $(_this).masonry({
              itemSelector: 'article'
            });
          };
        })(this));
        return;
      });
    }
  });

  sgdf.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");
    $stateProvider.state('sas', {
      url: '/',
      views: {
        'container@': {
          templateUrl: blogInfo.views + '/sas.html',
          controller: 'sascontroller',
          resolve: {
            response: function(getData) {
              return getData.getSas().then(function(data) {
                var res;
                res = {
                  postdata: data
                };
                return res;
              });
            }
          }
        }
      }
    }).state('root', {
      url: '',
      abstract: true,
      views: {
        'header': {
          templateUrl: blogInfo.views + '/header.html',
          controller: 'headercontroller',
          resolve: {
            response: function(getData) {
              return getData.getHeader().then(function(data) {
                var res;
                res = {
                  postdata: data
                };
                return res;
              });
            }
          }
        },
        'footer': {
          templateUrl: blogInfo.views + '/footer.html',
          controller: 'footercontroller',
          resolve: {
            response: function(getData) {
              return getData.getFooter().then(function(data) {
                var res;
                res = {
                  postdata: data
                };
                return res;
              });
            }
          }
        }
      }
    }).state('root.home', {
      url: '/home',
      views: {
        'container@': {
          templateUrl: blogInfo.views + "/home.html",
          controller: 'homecontroller',
          resolve: {
            response: function(getData) {
              return getData.getHome().then(function(data) {
                var res;
                res = {
                  postdata: data
                };
                return res;
              });
            }
          }
        }
      }
    }).state('root.category', {
      url: '/cat/:id?page&article',
      views: {
        'container@': {
          templateUrl: blogInfo.views + "/category.html",
          controller: 'categorycontroller',
          resolve: {
            response: function(getData, $stateParams) {
              return getData.getCategory($stateParams.id, $stateParams.page, $stateParams.article).then(function(data) {
                var res;
                res = {
                  postdata: data
                };
                return res;
              });
            }
          }
        }
      }
    }).state('root.question', {
      url: '/question?id&page',
      views: {
        'container@': {
          templateUrl: blogInfo.views + "/question.html",
          controller: 'questioncontroller',
          resolve: {
            response: function(getData, $stateParams) {
              return getData.getQuestions($stateParams.id, $stateParams.page).then(function(data) {
                var res;
                res = {
                  postdata: data
                };
                return res;
              });
            }
          }
        }
      }
    }).state('root.temoignage', {
      url: '/temoignage?id&page',
      views: {
        'container@': {
          templateUrl: blogInfo.views + "/temoignage.html",
          controller: 'temoignagecontroller',
          resolve: {
            response: function(getData, $stateParams) {
              return getData.getTemoignages($stateParams.id, $stateParams.page).then(function(data) {
                var res;
                res = {
                  postdata: data
                };
                return res;
              });
            }
          }
        }
      }
    }).state('root.contact', {
      url: '/contact',
      views: {
        'container@': {
          templateUrl: blogInfo.views + "/contact.html",
          controller: 'contactcontroller',
          resolve: {
            response: function(getData, $stateParams) {
              return getData.getContact().then(function(data) {
                var res;
                res = {
                  postdata: data
                };
                return res;
              });
            }
          }
        }
      }
    }).state('root.aventure', {
      url: '/aventure',
      views: {
        'container@': {
          templateUrl: blogInfo.views + "/aventure.html",
          controller: 'aventurecontroller',
          resolve: {
            response: function(getData, $stateParams) {
              return getData.getAventure().then(function(data) {
                var res;
                res = {
                  postdata: data
                };
                return res;
              });
            }
          }
        }
      }
    }).state('root.page', {
      url: '/page/:id',
      views: {
        'container@': {
          templateUrl: blogInfo.views + "/page.html",
          controller: 'pagecontroller',
          resolve: {
            response: function(getData, $stateParams) {
              return getData.getPage($stateParams.id).then(function(data) {
                var res;
                res = {
                  postdata: data
                };
                return res;
              });
            }
          }
        }
      }
    }).state('root.search', {
      url: '/search?s',
      views: {
        'container@': {
          templateUrl: blogInfo.views + "/search.html",
          controller: 'searchcontroller',
          resolve: {
            response: function(getData, $stateParams) {
              return getData.getSearchResults($stateParams.s).then(function(data) {
                var res;
                res = {
                  postdata: data
                };
                return res;
              });
            }
          }
        }
      }
    }).state('root.docenstock', {
      url: '/docenstock',
      views: {
        'container@': {
          templateUrl: blogInfo.views + "/docenstock.html",
          controller: 'docenstockcontroller',
          resolve: {
            response: function(getData, $stateParams) {
              return getData.getDocenstock().then(function(data) {
                var res;
                res = {
                  postdata: data
                };
                return res;
              });
            }
          }
        }
      }
    }).state('root.getDocenstockResults', {
      url: '/docenstock-results?s&c',
      views: {
        'container@': {
          templateUrl: blogInfo.views + "/docenstock-results.html",
          controller: 'docenstockResultscontroller',
          resolve: {
            response: function(getData, $stateParams) {
              return getData.getDocenstockResults($stateParams.s, $stateParams.c).then(function(data) {
                var res;
                res = {
                  postdata: data
                };
                return res;
              });
            }
          }
        }
      }
    }).state('root.medias', {
      url: '/medias/:id',
      views: {
        'container@': {
          templateUrl: blogInfo.views + "/media.html",
          controller: 'mediascontroller',
          resolve: {
            response: function(getData, $stateParams) {
              return getData.getMedias($stateParams.id).then(function(data) {
                var res;
                res = {
                  postdata: data
                };
                return res;
              });
            }
          }
        }
      }
    }).state('root.videos', {
      url: '/videos',
      views: {
        'container@': {
          templateUrl: blogInfo.views + "/videos.html",
          controller: 'videoscontroller',
          resolve: {
            response: function(getData) {
              return getData.getVideos().then(function(data) {
                var res;
                res = {
                  postdata: data
                };
                return res;
              });
            }
          }
        }
      }
    }).state('root.jouer', {
      url: '/jouer',
      views: {
        'container@': {
          templateUrl: blogInfo.views + "/jouer.html",
          controller: 'jouercontroller',
          resolve: {
            response: function(getData, $stateParams) {
              return getData.getJouer().then(function(data) {
                var res;
                res = {
                  postdata: data
                };
                return res;
              });
            }
          }
        }
      }
    }).state('root.reveille', {
      url: '/reveille',
      views: {
        'container@': {
          templateUrl: blogInfo.views + "/reveille.html",
          controller: 'reveillecontroller',
          resolve: {
            response: function(getData, $stateParams) {
              return getData.getReveille().then(function(data) {
                var res;
                res = {
                  postdata: data
                };
                return res;
              });
            }
          }
        }
      }
    });
  });

  Util = (function() {
    function Util() {}

    Util.prototype.extend = function(custom, defaults) {
      var key, value;
      for (key in defaults) {
        value = defaults[key];
        if (custom[key] == null) {
          custom[key] = value;
        }
      }
      return custom;
    };

    Util.prototype.isMobile = function(agent) {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(agent);
    };

    Util.prototype.addEvent = function(elem, event, fn) {
      if (elem.addEventListener != null) {
        return elem.addEventListener(event, fn, false);
      } else if (elem.attachEvent != null) {
        return elem.attachEvent("on" + event, fn);
      } else {
        return elem[event] = fn;
      }
    };

    Util.prototype.removeEvent = function(elem, event, fn) {
      if (elem.removeEventListener != null) {
        return elem.removeEventListener(event, fn, false);
      } else if (elem.detachEvent != null) {
        return elem.detachEvent("on" + event, fn);
      } else {
        return delete elem[event];
      }
    };

    Util.prototype.innerHeight = function() {
      if ('innerHeight' in window) {
        return window.innerHeight;
      } else {
        return document.documentElement.clientHeight;
      }
    };

    return Util;

  })();

  WeakMap = this.WeakMap || this.MozWeakMap || (WeakMap = (function() {
    function WeakMap() {
      this.keys = [];
      this.values = [];
    }

    WeakMap.prototype.get = function(key) {
      var i, item, _i, _len, _ref;
      _ref = this.keys;
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        item = _ref[i];
        if (item === key) {
          return this.values[i];
        }
      }
    };

    WeakMap.prototype.set = function(key, value) {
      var i, item, _i, _len, _ref;
      _ref = this.keys;
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        item = _ref[i];
        if (item === key) {
          this.values[i] = value;
          return;
        }
      }
      this.keys.push(key);
      return this.values.push(value);
    };

    return WeakMap;

  })());

  MutationObserver = this.MutationObserver || this.WebkitMutationObserver || this.MozMutationObserver || (MutationObserver = (function() {
    function MutationObserver() {
      if (typeof console !== "undefined" && console !== null) {
        console.warn('MutationObserver is not supported by your browser.');
      }
      if (typeof console !== "undefined" && console !== null) {
        console.warn('WOW.js cannot detect dom mutations, please call .sync() after loading new content.');
      }
    }

    MutationObserver.notSupported = true;

    MutationObserver.prototype.observe = function() {};

    return MutationObserver;

  })());

  getComputedStyle = this.getComputedStyle || function(el, pseudo) {
    this.getPropertyValue = function(prop) {
      var _ref;
      if (prop === 'float') {
        prop = 'styleFloat';
      }
      if (getComputedStyleRX.test(prop)) {
        prop.replace(getComputedStyleRX, function(_, _char) {
          return _char.toUpperCase();
        });
      }
      return ((_ref = el.currentStyle) != null ? _ref[prop] : void 0) || null;
    };
    return this;
  };

  getComputedStyleRX = /(\-([a-z]){1})/g;

  this.WOW = (function() {
    WOW.prototype.defaults = {
      boxClass: 'wow',
      animateClass: 'animated',
      offset: 0,
      mobile: true,
      live: true,
      callback: null
    };

    function WOW(options) {
      if (options == null) {
        options = {};
      }
      this.scrollCallback = __bind(this.scrollCallback, this);
      this.scrollHandler = __bind(this.scrollHandler, this);
      this.start = __bind(this.start, this);
      this.scrolled = true;
      this.config = this.util().extend(options, this.defaults);
      this.animationNameCache = new WeakMap();
    }

    WOW.prototype.init = function() {
      var _ref;
      this.element = window.document.documentElement;
      if ((_ref = document.readyState) === "interactive" || _ref === "complete") {
        this.start();
      } else {
        this.util().addEvent(document, 'DOMContentLoaded', this.start);
      }
      return this.finished = [];
    };

    WOW.prototype.start = function() {
      var box, _i, _len, _ref;
      this.stopped = false;
      this.boxes = (function() {
        var _i, _len, _ref, _results;
        _ref = this.element.querySelectorAll("." + this.config.boxClass);
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          box = _ref[_i];
          _results.push(box);
        }
        return _results;
      }).call(this);
      this.all = (function() {
        var _i, _len, _ref, _results;
        _ref = this.boxes;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          box = _ref[_i];
          _results.push(box);
        }
        return _results;
      }).call(this);
      if (this.boxes.length) {
        if (this.disabled()) {
          this.resetStyle();
        } else {
          _ref = this.boxes;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            box = _ref[_i];
            this.applyStyle(box, true);
          }
        }
      }
      if (!this.disabled()) {
        this.util().addEvent(window, 'scroll', this.scrollHandler);
        this.util().addEvent(window, 'resize', this.scrollHandler);
        this.interval = setInterval(this.scrollCallback, 50);
      }
      if (this.config.live) {
        return new MutationObserver((function(_this) {
          return function(records) {
            var node, record, _j, _len1, _results;
            _results = [];
            for (_j = 0, _len1 = records.length; _j < _len1; _j++) {
              record = records[_j];
              _results.push((function() {
                var _k, _len2, _ref1, _results1;
                _ref1 = record.addedNodes || [];
                _results1 = [];
                for (_k = 0, _len2 = _ref1.length; _k < _len2; _k++) {
                  node = _ref1[_k];
                  _results1.push(this.doSync(node));
                }
                return _results1;
              }).call(_this));
            }
            return _results;
          };
        })(this)).observe(document.body, {
          childList: true,
          subtree: true
        });
      }
    };

    WOW.prototype.stop = function() {
      this.stopped = true;
      this.util().removeEvent(window, 'scroll', this.scrollHandler);
      this.util().removeEvent(window, 'resize', this.scrollHandler);
      if (this.interval != null) {
        return clearInterval(this.interval);
      }
    };

    WOW.prototype.sync = function(element) {
      if (MutationObserver.notSupported) {
        return this.doSync(this.element);
      }
    };

    WOW.prototype.doSync = function(element) {
      var box, _i, _len, _ref, _results;
      if (element == null) {
        element = this.element;
      }
      if (element.nodeType !== 1) {
        return;
      }
      element = element.parentNode || element;
      _ref = element.querySelectorAll("." + this.config.boxClass);
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        box = _ref[_i];
        if (__indexOf.call(this.all, box) < 0) {
          this.boxes.push(box);
          this.all.push(box);
          if (this.stopped || this.disabled()) {
            this.resetStyle();
          } else {
            this.applyStyle(box, true);
          }
          _results.push(this.scrolled = true);
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    WOW.prototype.show = function(box) {
      this.applyStyle(box);
      box.className = "" + box.className + " " + this.config.animateClass;
      if (this.config.callback != null) {
        return this.config.callback(box);
      }
    };

    WOW.prototype.applyStyle = function(box, hidden) {
      var delay, duration, iteration;
      duration = box.getAttribute('data-wow-duration');
      delay = box.getAttribute('data-wow-delay');
      iteration = box.getAttribute('data-wow-iteration');
      return this.animate((function(_this) {
        return function() {
          return _this.customStyle(box, hidden, duration, delay, iteration);
        };
      })(this));
    };

    WOW.prototype.animate = (function() {
      if ('requestAnimationFrame' in window) {
        return function(callback) {
          return window.requestAnimationFrame(callback);
        };
      } else {
        return function(callback) {
          return callback();
        };
      }
    })();

    WOW.prototype.resetStyle = function() {
      var box, _i, _len, _ref, _results;
      _ref = this.boxes;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        box = _ref[_i];
        _results.push(box.style.visibility = 'visible');
      }
      return _results;
    };

    WOW.prototype.customStyle = function(box, hidden, duration, delay, iteration) {
      if (hidden) {
        this.cacheAnimationName(box);
      }
      box.style.visibility = hidden ? 'hidden' : 'visible';
      if (duration) {
        this.vendorSet(box.style, {
          animationDuration: duration
        });
      }
      if (delay) {
        this.vendorSet(box.style, {
          animationDelay: delay
        });
      }
      if (iteration) {
        this.vendorSet(box.style, {
          animationIterationCount: iteration
        });
      }
      this.vendorSet(box.style, {
        animationName: hidden ? 'none' : this.cachedAnimationName(box)
      });
      return box;
    };

    WOW.prototype.vendors = ["moz", "webkit"];

    WOW.prototype.vendorSet = function(elem, properties) {
      var name, value, vendor, _results;
      _results = [];
      for (name in properties) {
        value = properties[name];
        elem["" + name] = value;
        _results.push((function() {
          var _i, _len, _ref, _results1;
          _ref = this.vendors;
          _results1 = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            vendor = _ref[_i];
            _results1.push(elem["" + vendor + (name.charAt(0).toUpperCase()) + (name.substr(1))] = value);
          }
          return _results1;
        }).call(this));
      }
      return _results;
    };

    WOW.prototype.vendorCSS = function(elem, property) {
      var result, style, vendor, _i, _len, _ref;
      style = getComputedStyle(elem);
      result = style.getPropertyCSSValue(property);
      _ref = this.vendors;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        vendor = _ref[_i];
        result = result || style.getPropertyCSSValue("-" + vendor + "-" + property);
      }
      return result;
    };

    WOW.prototype.animationName = function(box) {
      var animationName;
      try {
        animationName = this.vendorCSS(box, 'animation-name').cssText;
      } catch (_error) {
        animationName = getComputedStyle(box).getPropertyValue('animation-name');
      }
      if (animationName === 'none') {
        return '';
      } else {
        return animationName;
      }
    };

    WOW.prototype.cacheAnimationName = function(box) {
      return this.animationNameCache.set(box, this.animationName(box));
    };

    WOW.prototype.cachedAnimationName = function(box) {
      return this.animationNameCache.get(box);
    };

    WOW.prototype.scrollHandler = function() {
      return this.scrolled = true;
    };

    WOW.prototype.scrollCallback = function() {
      var box;
      if (this.scrolled) {
        this.scrolled = false;
        this.boxes = (function() {
          var _i, _len, _ref, _results;
          _ref = this.boxes;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            box = _ref[_i];
            if (!(box)) {
              continue;
            }
            if (this.isVisible(box)) {
              this.show(box);
              continue;
            }
            _results.push(box);
          }
          return _results;
        }).call(this);
        if (!(this.boxes.length || this.config.live)) {
          return this.stop();
        }
      }
    };

    WOW.prototype.offsetTop = function(element) {
      var top;
      while (element.offsetTop === void 0) {
        element = element.parentNode;
      }
      top = element.offsetTop;
      while (element = element.offsetParent) {
        top += element.offsetTop;
      }
      return top;
    };

    WOW.prototype.isVisible = function(box) {
      var bottom, offset, top, viewBottom, viewTop;
      offset = box.getAttribute('data-wow-offset') || this.config.offset;
      viewTop = window.pageYOffset;
      viewBottom = viewTop + Math.min(this.element.clientHeight, this.util().innerHeight()) - offset;
      top = this.offsetTop(box);
      bottom = top + box.clientHeight;
      return top <= viewBottom && bottom >= viewTop;
    };

    WOW.prototype.util = function() {
      return this._util != null ? this._util : this._util = new Util();
    };

    WOW.prototype.disabled = function() {
      return !this.config.mobile && this.util().isMobile(navigator.userAgent);
    };

    return WOW;

  })();

  jQuery(document).ready(function($) {
    var customizeMain, loadPageParts, showNouveautes, showSurLeWeb, showThematics;
    showNouveautes = function(show) {
      if (show == null) {
        show = true;
      }
      if (show) {
        $("#customize-control-sgdf_nouveautes_cat").show();
      } else {
        $("#customize-control-sgdf_nouveautes_cat").hide();
      }
    };
    showSurLeWeb = function(show) {
      if (show == null) {
        show = true;
      }
      if (show) {
        $("#customize-control-sgdf_surleweb_cat").show();
      } else {
        $("#customize-control-sgdf_surleweb_cat").hide();
      }
    };
    showThematics = function(show) {
      if (show == null) {
        show = true;
      }
      if (show) {
        $("#customize-control-sgdf_thematics_0").show();
        $("#customize-control-sgdf_thematics_1").show();
        $("#customize-control-sgdf_thematics_2").show();
      } else {
        $("#customize-control-sgdf_thematics_0").hide();
        $("#customize-control-sgdf_thematics_1").hide();
        $("#customize-control-sgdf_thematics_2").hide();
      }
    };
    if ($("body.wp-customizer").length > 0) {
      $(document).on("click", "#accordion-section-sgdf_customizer_section_configuration", function() {
        customizeMain();
      });
    }
    customizeMain = function() {
      showNouveautes($("#customize-control-sgdf_nouveautes input").prop('checked'));
      $("#customize-control-sgdf_nouveautes input").on("change", function() {
        showNouveautes($("#customize-control-sgdf_nouveautes input").prop('checked'));
      });
      showSurLeWeb($("#customize-control-sgdf_surleweb input").prop('checked'));
      $("#customize-control-sgdf_surleweb input").on("change", function() {
        showSurLeWeb($("#customize-control-sgdf_surleweb input").prop('checked'));
      });
      showThematics($("#customize-control-sgdf_thematics input").prop('checked'));
      $("#customize-control-sgdf_thematics input").on("change", function() {
        showSurLeWeb($("#customize-control-sgdf_thematics input").prop('checked'));
      });
    };
    loadPageParts = function() {
      var $selectors, template;
      template = $("#page_template option:selected").val();
      $selectors = $("#section-thematics-page, #section-regular");
      $selectors.hide();
      if (template === "medias.php" || template === "aventure.php") {
        return $("#section-thematics-page").show();
      } else {
        return $("#section-regular").show();
      }
    };
    if ($("#page_template").length > 0) {
      loadPageParts();
      $("#page_template").change(function() {
        loadPageParts();
      });
      return;
    }
  });

  sgdf.controller("aventurecontroller", [
    "$scope", "response", "$upload", "formHandler", function($scope, response, $upload, formHandler) {
      $scope.postdata = response.postdata;
      $scope.imgpath = $scope.$parent.globalData.imgpath;
      $scope.uploadedFiles = [];
      $scope.$watch('files', function() {
        $scope.upload($scope.files);
      });
      $scope.upload = function(files) {
        var file, i;
        if (files && files.length) {
          i = 0;
          while (i < files.length) {
            file = files[i];
            $upload.upload({
              url: blogInfo.api + 'handle_upload/',
              file: file
            }).progress(function(evt) {
              var progressPercentage;
              progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
              console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
            }).success(function(data, status, headers, config) {
              $scope.uploadedFiles.push(data.url);
            });
            i++;
          }
        }
      };
      $scope.removeFile = function(file) {
        $scope.uploadedFiles.splice($scope.uploadedFiles.indexOf(file), 1);
      };
      $scope.aventure = {
        submitted: false,
        submit: function(form) {
          $scope.aventure.submitted = true;
          if (form.$valid) {
            formHandler.sendAventure($scope.aventure.name, $scope.aventure.email, $scope.aventure.tribu, $scope.aventure.commentaire, $scope.aventure.aventure_titre, $scope.aventure.aventure_text, $scope.uploadedFiles).then(function(result) {
              $scope.aventure.name = "";
              $scope.aventure.email = "";
              $scope.aventure.tribu = "";
              $scope.aventure.commentaire = "";
              $scope.aventure.aventure_titre = "";
              $scope.aventure.aventure_text = "";
              $scope.uploadedFiles = [];
              $scope.aventure.validated = false;
              if (result.success === true) {
                $scope.aventure.aventure_text = "Votre aventure a bien été transmise.";
              } else {
                $scope.aventure.aventure_text = "Erreur lors de l'envoi.";
              }
              return $scope.aventure.submitted = false;
            });
          }
        }
      };
    }
  ]);

  sgdf.controller("categorycontroller", [
    "$scope", "response", "$state", "$filter", "getData", function($scope, response, $state, $filter, getData) {
      var busy, finished;
      $scope.page = 1;
      busy = false;
      finished = false;
      $scope.loadMoreArticles = function() {
        if (!busy && !finished) {
          busy = true;
          $scope.page++;
          getData.getCategory($state.params.id, $scope.page).then(function(result) {
            var i;
            busy = false;
            if (result.articles.length === 0) {
              finished = true;
            } else {
              for (i in result.articles) {
                $scope.postadata.articles.push(result.articles[i]);
              }
            }
          });
        }
      };
      $scope.postdata = response.postdata;
      if ($scope.postdata.article !== void 0) {
        $scope.postdata.article.content = $scope.postdata.article.content.replace(/\r\n/g, '<br>');
      }
    }
  ]);

  sgdf.controller("contactcontroller", [
    "$scope", "response", "formHandler", function($scope, response, formHandler) {
      $scope.postdata = response.postdata;
      $scope.imgpath = $scope.$parent.globalData.imgpath;
      $scope.postdata.contact.content = $scope.postdata.contact.content.replace(/\r\n/g, '<br>');
      $scope.contactform = {
        submitted: false,
        submit: function(form) {
          $scope.contactform.submitted = true;
          if (form.$valid) {
            formHandler.sendContact($scope.contactform.name, $scope.contactform.email, $scope.contactform.content, $scope.contactform.me).then(function(result) {
              $scope.contactform.name = "";
              $scope.contactform.email = "";
              $scope.contactform.me = false;
              if (result.success === true) {
                $scope.contactform.content = "Votre message a bien été transmis.";
              } else {
                $scope.contactform.content = "Erreur lors de l'envoi.";
              }
              return $scope.contactform.submitted = false;
            });
          }
        }
      };
    }
  ]);

  sgdf.controller("docenstockcontroller", [
    "$scope", "response", "$state", function($scope, response, $state) {
      $scope.postdata = response.postdata;
      $scope.imgpath = $scope.$parent.globalData.imgpath;
      $scope.highlight = function(s, hovered) {
        if (hovered == null) {
          hovered = true;
        }
        s.cat.hover = hovered;
      };
      $scope.desform = {
        search: null
      };
      $scope.desform = {
        submit: function(form) {
          if (form.$valid) {
            $state.go("root.getDocenstockResults", {
              s: $scope.desform.search
            });
          }
          return false;
        }
      };
    }
  ]);

  sgdf.controller("docenstockResultscontroller", [
    "$scope", "response", "formHandler", function($scope, response, formHandler) {
      $scope.postdata = response.postdata;
      return $scope.imgpath = $scope.$parent.globalData.imgpath;
    }
  ]);

  sgdf.controller("footercontroller", [
    "$scope", "response", function($scope, response) {
      $scope.postdata = response.postdata;
      $scope.imgpath = $scope.$parent.globalData.imgpath;
    }
  ]);

  sgdf.controller("headercontroller", [
    "$scope", "response", "$rootScope", "$state", "$window", function($scope, response, $rootScope, $state, $window) {
      var changeStateIsSearch, wd;
      $scope.postdata = response.postdata;
      $scope.imgpath = $scope.$parent.globalData.imgpath;
      changeStateIsSearch = function(state) {
        var oldV;
        oldV = $scope.isSearch;
        if (state === "root.search") {
          $scope.isSearch = true;
        } else {
          $scope.isSearch = false;
        }
      };
      changeStateIsSearch($state.current.name);
      if ($state.current.name === "root.search") {
        $scope.searchQuery = $state.params.s;
      } else {
        $scope.searchQuery = "";
      }
      $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {
        changeStateIsSearch(toState.name);
      });
      $scope.menuMobileActive = false;
      wd = angular.element($window);
      $scope.windowW = wd.width();
      $scope.toggleActiveMobile = function() {
        $scope.menuMobileActive = !$scope.menuMobileActive;
      };
      wd.bind("resize", function() {
        $scope.windowW = wd.width();
        $scope.$apply();
      });
      $scope.toggleActiveitem = function(item) {
        item.active = !item.active;
        $scope.$apply();
      };
    }
  ]);

  sgdf.controller("homecontroller", [
    "$scope", "response", function($scope, response) {
      $scope.postdata = response.postdata;
      $scope.imgpath = $scope.$parent.globalData.imgpath;
      $scope.videosItems = Math.ceil(($scope.postdata.videos.length - 1) / 4);
      if ($scope.postdata.nouveautes !== void 0) {
        $scope.nouveautesItems = Math.ceil($scope.postdata.nouveautes.length / 2);
      }
    }
  ]);

  sgdf.controller("jouercontroller", [
    "$scope", "response", function($scope, response) {
      $scope.postdata = response.postdata;
      $scope.imgpath = $scope.$parent.globalData.imgpath;
    }
  ]);

  sgdf.controller("mediascontroller", [
    "$scope", "response", function($scope, response) {
      $scope.postdata = response.postdata;
      $scope.imgpath = $scope.$parent.globalData.imgpath;
    }
  ]);

  sgdf.controller("pagecontroller", [
    "$scope", "response", function($scope, response) {
      $scope.postdata = response.postdata;
      $scope.imgpath = $scope.$parent.globalData.imgpath;
      $scope.postdata.content = $scope.postdata.content.replace(/\r\n\r\n/g, '<br>');
    }
  ]);

  sgdf.controller("questioncontroller", [
    "$scope", "response", "formHandler", "$timeout", "$window", function($scope, response, formHandler, $timeout, $window) {
      var selectAllTags, selectQuestions, selectedTags;
      $scope.postdata = response.postdata;
      $scope.imgpath = $scope.$parent.globalData.imgpath;
      $timeout(function() {
        return $scope.update();
      }, 500);
      $scope.toggleOpen = function(question) {
        if (!question.opened) {
          question.opened = true;
        } else {
          question.opened = false;
        }
        $scope.update();
      };
      selectedTags = [];
      $scope.reload = function() {
        selectAllTags();
        selectQuestions();
        $scope.update();
      };
      selectAllTags = function() {
        angular.forEach($scope.postdata.tags, function(t, key) {
          t.selected = null;
          return selectedTags.push(parseInt(t.term_id));
        });
      };
      selectQuestions = function() {
        angular.forEach($scope.postdata.questions, function(q, key) {
          q.selected = false;
          return angular.forEach(q.tags, function(t, key) {
            if (selectedTags.indexOf(t) > -1) {
              return q.selected = true;
            }
          });
        });
      };
      selectAllTags();
      selectQuestions();
      $scope.toggleSelect = function(tag) {
        if (tag.selected === null) {
          angular.forEach($scope.postdata.tags, function(t, key) {
            t.selected = false;
            return selectedTags.splice(selectedTags.indexOf(t.term_id), 1);
          });
          tag.selected = true;
          selectedTags.push(parseInt(tag.term_id));
        } else {
          if (tag.selected === true) {
            tag.selected = false;
            selectedTags.splice(selectedTags.indexOf(parseInt(tag.term_id)), 1);
          } else {
            tag.selected = true;
            selectedTags.push(parseInt(tag.term_id));
          }
        }
        if (selectedTags.length === 0) {
          selectAllTags();
        }
        selectQuestions();
        $scope.update();
      };
      $scope.questionform = {
        submitted: false,
        submit: function(form) {
          $scope.questionform.submitted = true;
          if (form.$valid) {
            formHandler.addQuestion($scope.questionform.author, $scope.questionform.age, $scope.questionform.content).then(function(result) {
              if (result.success === true) {
                $scope.questionform.author = "";
                $scope.questionform.age = "";
                $scope.questionform.content = "Votre question a été soumise.";
              } else {
                $scope.questionform.author = "";
                $scope.questionform.age = "";
                $scope.questionform.content = "Erreur lors de la soumission.";
              }
              return $scope.questionform.submitted = false;
            });
          }
        }
      };
    }
  ]);

  sgdf.controller("reveillecontroller", [
    "$scope", "response", function($scope, response) {
      $scope.postdata = response.postdata;
      $scope.imgpath = $scope.$parent.globalData.imgpath;
    }
  ]);

  sgdf.controller("sascontroller", [
    "$scope", "response", function($scope, response) {
      $scope.postdata = response.postdata;
      $scope.imgpath = $scope.$parent.globalData.imgpath;
    }
  ]);

  sgdf.controller("searchcontroller", [
    "$scope", "response", "$rootScope", "$state", function($scope, response, $rootScope, $state) {
      $scope.postdata = response.postdata;
      $rootScope.$on("search-performed", function(event, args) {
        return $state.go("root.search", {
          s: args.s
        }, {
          replace: true
        });
      });
    }
  ]);

  sgdf.controller("temoignagecontroller", [
    "$scope", "response", "formHandler", "$timeout", "$window", function($scope, response, formHandler, $timeout, $window) {
      var selectAllTags, selectTemoignages, selectedTags;
      $scope.postdata = response.postdata;
      $scope.imgpath = $scope.$parent.globalData.imgpath;
      $timeout(function() {
        return $scope.update();
      }, 500);
      selectedTags = [];
      $scope.reload = function() {
        selectAllTags();
        selectTemoignages();
        $scope.update();
      };
      selectAllTags = function() {
        angular.forEach($scope.postdata.tags, function(t, key) {
          t.selected = null;
          return selectedTags.push(parseInt(t.term_id));
        });
      };
      selectTemoignages = function() {
        angular.forEach($scope.postdata.temoignages, function(q, key) {
          q.selected = false;
          return angular.forEach(q.tags, function(t, key) {
            if (selectedTags.indexOf(t) > -1) {
              return q.selected = true;
            }
          });
        });
      };
      selectAllTags();
      selectTemoignages();
      $scope.toggleSelect = function(tag) {
        if (tag.selected === null) {
          angular.forEach($scope.postdata.tags, function(t, key) {
            t.selected = false;
            return selectedTags.splice(selectedTags.indexOf(t.term_id), 1);
          });
          tag.selected = true;
          selectedTags.push(parseInt(tag.term_id));
        } else {
          if (tag.selected === true) {
            tag.selected = false;
            selectedTags.splice(selectedTags.indexOf(parseInt(tag.term_id)), 1);
          } else {
            tag.selected = true;
            selectedTags.push(parseInt(tag.term_id));
          }
        }
        if (selectedTags.length === 0) {
          selectAllTags();
        }
        selectTemoignages();
        $scope.update();
      };
      $scope.temoignageform = {
        submitted: false,
        submit: function(form) {
          $scope.temoignageform.submitted = true;
          if (form.$valid) {
            formHandler.addTemoignage($scope.temoignageform.author, $scope.temoignageform.age, $scope.temoignageform.content).then(function(result) {
              if (result.success === true) {
                $scope.temoignageform.author = "";
                $scope.temoignageform.age = "";
                $scope.temoignageform.content = "Votre temoignage a été soumis.";
              } else {
                $scope.temoignageform.author = "";
                $scope.temoignageform.age = "";
                $scope.temoignageform.content = "Erreur lors de la soumission.";
              }
              return $scope.temoignageform.submitted = false;
            });
          }
        }
      };
    }
  ]);

  sgdf.controller("videoscontroller", [
    "$scope", "response", function($scope, response) {
      $scope.postdata = response.postdata;
      $scope.imgpath = $scope.$parent.globalData.imgpath;
      $scope.videosItems = Math.ceil(($scope.postdata.videos.length - 1) / 4);
    }
  ]);

  sgdf.directive('arrowLead', function($window, $document) {
    return {
      template: "<img src='{{ source }}' id='{{ elemid }}' style='display: none;' alt='' />",
      scope: {
        source: "@",
        delayStart: "=?",
        delayStop: "=?",
        duration: "=?",
        disappear: "=?",
        elemid: "=?"
      },
      transclude: true,
      restrict: "A",
      link: function(scope, element, attrs) {
        var blink, img, imgElement, w;
        if (typeof scope.delayStart === "undefined") {
          scope.delayStart = 1000;
        }
        if (typeof scope.delayStop === "undefined") {
          scope.delayStop = 5000;
        }
        if (typeof scope.duration === "undefined") {
          scope.duration = 1000;
        }
        if (typeof scope.disappear === "undefined") {
          scope.disappear = false;
        }
        if (typeof scope.elemid === "undefined") {
          scope.elemid = "arrowLead";
        }
        w = angular.element($window);
        element.css({
          position: "relative"
        });
        imgElement = element.children();
        img = new Image();
        img.onload = function() {
          var hi, wi;
          wi = this.width > w.width() / 5 ? w.width() / 5 : this.width;
          hi = this.width > w.width() / 5 ? (this.height / this.width) * (w.width() / 5) : this.height;
          imgElement.css({
            position: "absolute",
            zIndex: 2000,
            left: "50%",
            bottom: "30px",
            cursor: "pointer",
            marginLeft: -wi / 2,
            marginTop: -hi / 2,
            maxWidth: "20%"
          });
          return blink();
        };
        img.src = scope.source;
        imgElement.bind("click", function() {
          angular.element($document[0].body).animate({
            scrollTop: w.height()
          }, scope.duration);
          if (scope.disappear) {
            imgElement.fadeOut("slow");
          }
        });
        blink = function() {
          if (!Modernizr.touch) {
            setTimeout((function() {
              imgElement.fadeIn().fadeOut().fadeIn().fadeOut().fadeIn("slow", function() {
                setTimeout((function() {
                  if (scope.disappear) {
                    imgElement.fadeOut("slow");
                  }
                }), scope.delayStop);
              });
            }), scope.delayStart);
          }
        };
      }
    };
  });

  sgdf.directive('hamburgerButton', function($timeout) {
    return {
      restrict: "A",
      link: function(scope, element, attrs) {
        var animateButton;
        animateButton = function() {
          var pad, padExt;
          pad = "7px";
          padExt = "8px";
          if (scope.menuMobileActive) {
            element.children(".icon-bar").css({
              webkitTransition: "transform 1s",
              transition: 'transform 1s'
            });
            element.children(".icon-bar:first").css({
              msTransform: "translate(0px," + pad + ")",
              mozTransform: "translate(0px," + pad + ")",
              webkitTransform: "translate(0px," + pad + ")",
              transform: "translate(0px," + pad + ")"
            });
            $timeout(function() {
              element.children(".icon-bar:first").css({
                msTransform: "translate(0px," + padExt + ") rotate(45deg)",
                mozTransform: "translate(0px," + padExt + ") rotate(45deg)",
                webkitTransform: "translate(0px," + padExt + ") rotate(45deg)",
                transform: "translate(0px," + padExt + ") rotate(45deg)"
              });
            }, 1000);
            element.children(".icon-bar:last").css({
              msTransform: "translate(0px,-" + pad + ")",
              mozTransform: "translate(0px,-" + pad + ")",
              webkitTransform: "translate(0px,-" + pad + ")",
              transform: "translate(0px,-" + pad + ")"
            });
            $timeout(function() {
              element.children(".icon-bar").first().next().css({
                opacity: 0
              });
              element.children(".icon-bar:last").css({
                msTransform: "translate(0px,-" + padExt + ") rotate(-45deg)",
                mozTransform: "translate(0px,-" + padExt + ") rotate(-45deg)",
                webkitTransform: "translate(0px,-" + padExt + ") rotate(-45deg)",
                transform: "translate(0px,-" + padExt + ") rotate(-45deg)"
              });
            }, 1000);
          } else {
            element.children(".icon-bar:first").css({
              msTransform: "translate(0px," + padExt + ") rotate(0deg)",
              mozTransform: "translate(0px," + padExt + ") rotate(0deg)",
              webkitTransform: "translate(0px," + padExt + ") rotate(0deg)",
              transform: "translate(0px," + padExt + ") rotate(0deg)"
            });
            element.children(".icon-bar:last").css({
              msTransform: "translate(0px,-" + padExt + ") rotate(0deg)",
              mozTransform: "translate(0px,-" + padExt + ") rotate(0deg)",
              webkitTransform: "translate(0px,-" + padExt + ") rotate(0deg)",
              transform: "translate(0px,-" + padExt + ") rotate(0deg)"
            });
            $timeout(function() {
              element.children(".icon-bar:first").css({
                msTransform: "translate(0px,0px) rotate(0deg)",
                mozTransform: "translate(0px,0px) rotate(0deg)",
                webkitTransform: "translate(0px,0px) rotate(0deg)",
                transform: "translate(0px,0px) rotate(0deg)"
              });
              element.children(".icon-bar").first().next().css({
                opacity: 1
              });
              return element.children(".icon-bar:last").css({
                msTransform: "translate(0px,0px) rotate(0deg)",
                mozTransform: "translate(0px,0px) rotate(0deg)",
                webkitTransform: "translate(0px,0px) rotate(0deg)",
                transform: "translate(0px,0px) rotate(0deg)"
              });
            }, 1000);
          }
        };
        scope.$watch('menuMobileActive', function(newValue, oldValue) {
          return animateButton();
        });
      }
    };
  });

  sgdf.directive('overlayTransition', function($window, $rootScope, $state, $timeout, $document) {
    return {
      restrict: "C",
      link: function($scope, element) {
        var changeEventStarted, currentStamp, goUp, makeTransition, minTime, stateChangedDelayed;
        changeEventStarted = false;
        minTime = 500;
        currentStamp = null;
        stateChangedDelayed = false;
        goUp = function() {
          $("html, body").animate({
            scrollTop: 0
          }, 500);
        };
        makeTransition = function() {
          $(".zoomIn").addClass("zoomOut").removeClass("zoomIn");
          $(".fadeInLeft").addClass("fadeOutLeft").removeClass("fadeInLeft");
          goUp();
        };
        $scope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
          if (fromState.name === "root.search" || toState.name === "root.search") {
            return;
          }
          currentStamp = Date.now();
          makeTransition();
        });
        return $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
          var difference, nextStamp;
          if ((fromState.name !== "root.search" && toState.name !== "root.search") || (fromState.name === "root.search" && toState.name === "root.search")) {
            return;
          }
          nextStamp = Date.now();
          difference = nextStamp - currentStamp;
        });
      }
    };
  });


  /*
  sgdf.directive 'overlayTransition', ( $window, $rootScope, $state, $timeout, $document ) ->
  	restrict: "C"
  	link: ($scope, element) ->
  		overs = $(".layer-over")
  		changeEventStarted = false
  
  		goUp = () ->
  			$("html, body").animate
  				scrollTop: 0
  			, 500
  
  
  			return
  
  		makeTransition = () ->
  			overs.show()
  			overs.addClass("mask")
  			$timeout( () ->
  				overs.hide()
  				overs.removeClass("mask")
  			, 1500)
  
  			return
  
  		 * save html
  		$rootScope.$on "$stateChangeStart", (event, toState, toParams, fromState, fromParams) ->
  
  			return if toState.name is 'root.search' or fromState.name is 'root.search'
  
  			return if changeEventStarted
  
  			event.preventDefault()
  
  			changeEventStarted = true
  
  			goUp()
  
  			makeTransition()
  
  			$timeout( () ->
  				$state.go toState.name, toParams
  				$timeout(->
  					changeEventStarted = false
  				, 300)
  			, 750)
  		return
   */

  sgdf.controller('percentHeightCtrl', [
    "$scope", "$window", function($scope, $window) {
      var wdw;
      wdw = angular.element($window);
      if ($scope.lessPx === "undefined") {
        $scope.lessPx = 0;
      }
      if ($scope.maxRatio === "undefined") {
        $scope.maxRatio = null;
      }
      $scope.getWindowDimensions = function() {
        return {
          h: wdw.height(),
          w: wdw.width()
        };
      };
      $scope.getHeight = function(width, height) {
        var fHeight, max;
        max = 0;
        if ($scope.maxRatio) {
          max = $scope.maxRatio * width;
        }
        fHeight = height * $scope.percentHeight / 100 - $scope.lessPx;
        if (max > 0 && fHeight > max) {
          fHeight = max;
        }
        return fHeight;
      };
      return wdw.bind('resize', function() {
        return $scope.$apply();
      });
    }
  ]).directive('percentHeight', function($window) {
    return {
      controller: "percentHeightCtrl",
      scope: {
        percentHeight: "=",
        lessPx: "=",
        maxRatio: "="
      },
      restrict: "A",
      link: function(scope, element, attrs) {
        var resizeElement, windowSize;
        resizeElement = function(w, h) {
          element.css({
            height: scope.getHeight(w, h)
          });
        };
        windowSize = scope.getWindowDimensions();
        resizeElement(windowSize.w, windowSize.h);
        scope.$watch(scope.getWindowDimensions, function(newValue, oldValue) {
          if (newValue !== oldValue) {
            resizeElement(newValue.w, newValue.h);
          }
        }, true);
      }
    };
  });

  sgdf.directive('sas', function($window) {
    return {
      restrict: "A",
      link: function(scope, element, attrs) {
        var angle, backWrapFixMargin, distanceMid, elemLeftW, elemRightW, leftElem, listenToHover, positionContent, positionElements, rightElem, rightMask, sizesOfBacks, sizesOfSides, w, wSize;
        angle = 10.75;
        wSize = {};
        distanceMid = 0;
        elemLeftW = 0;
        elemRightW = 0;
        leftElem = element.children(".left");
        rightElem = element.children(".right");
        rightMask = rightElem.find(".mask");
        w = angular.element($window);
        scope.getWindowDimensions = function() {
          return {
            h: w.height(),
            w: w.width()
          };
        };
        backWrapFixMargin = function() {
          distanceMid = wSize.h * Math.tan(angle * Math.PI / 180);
          element.children(".right").find(".bg-wrapper").css({
            marginLeft: -distanceMid
          });
          element.children(".right").find(".background").css({
            right: -distanceMid / 2
          });
        };
        sizesOfSides = function() {
          element.css({
            width: wSize.w,
            height: wSize.h
          });
          elemLeftW = wSize.w / 2 + distanceMid / 2;
          element.children(".left").css({
            width: Math.ceil(elemLeftW) + 1
          });
          elemRightW = wSize.w / 2 - distanceMid / 2;
          element.children(".right").css({
            width: Math.ceil(elemRightW) + 1
          });
          element.children(".right").find(".mask").css({
            width: wSize.w / 2 + distanceMid
          });
        };
        sizesOfBacks = function() {
          var coverImage;
          coverImage = function(imgElement, imgWidth, imgHeight, containerWidth, containerHeight) {
            var over, under;
            over = imgWidth / imgHeight;
            under = imgHeight / imgWidth;
            if (containerWidth / containerHeight >= over) {
              imgElement.parent().css({
                width: containerWidth,
                height: Math.ceil(under * containerWidth),
                top: Math.abs(under * containerWidth - containerHeight) / -2
              });
            } else {
              imgElement.parent().css({
                width: Math.ceil(over * containerHeight),
                height: containerHeight,
                top: 0
              });
            }
          };
          coverImage(element.children(".left").find(".background img"), scope.postdata.home[0].image.width, scope.postdata.home[0].image.height, elemLeftW + 50 + distanceMid * 2, wSize.h);
          coverImage(element.children(".right").find(".background img"), scope.postdata.home[1].image.width, scope.postdata.home[1].image.height, elemRightW + 50 + distanceMid * 2, wSize.h);
        };
        positionContent = function() {
          leftElem.find(".content").css({
            width: wSize.w / 2 - distanceMid - wSize.w / 12,
            marginLeft: wSize.w / 12,
            marginRight: wSize.w / 12,
            left: 0
          });
          rightElem.find(".content").css({
            width: wSize.w / 2 - distanceMid - wSize.w / 12,
            marginLeft: wSize.w / 12,
            marginRight: wSize.w / 12,
            right: 0
          });
        };
        listenToHover = function() {
          var animateSizes;
          animateSizes = function(direction) {
            if (direction == null) {
              direction = "left";
            }
            if (direction === "left") {
              leftElem.css({
                width: elemLeftW + 50
              });
              rightElem.css({
                width: elemRightW - 50
              });
              rightMask.css({
                width: wSize.w / 2 + distanceMid - 50
              });
            } else if (direction === "right") {
              leftElem.css({
                width: elemLeftW - 50
              });
              rightElem.css({
                width: elemRightW + 50
              });
              rightMask.css({
                width: wSize.w / 2 + distanceMid + 50
              });
            } else {
              leftElem.css({
                width: elemLeftW + 1
              });
              rightElem.css({
                width: elemRightW + 1
              });
              rightMask.css({
                width: wSize.w / 2 + distanceMid
              });
            }
          };
          leftElem.bind("mouseenter", function() {
            animateSizes("left");
          });
          leftElem.bind("mouseleave", function() {
            animateSizes("middle");
          });
          rightElem.bind("mouseenter", function() {
            animateSizes("right");
          });
          rightElem.bind("mouseleave", function() {
            animateSizes("middle");
          });
        };
        positionElements = function(size) {
          wSize = size;
          backWrapFixMargin();
          sizesOfSides();
          sizesOfBacks();
          positionContent();
        };
        positionElements(scope.getWindowDimensions());
        listenToHover();
        scope.$watch(scope.getWindowDimensions, function(newValue, oldValue) {
          if (newValue !== oldValue) {
            positionElements(newValue);
          }
        }, true);
        w.bind('resize', function() {
          return scope.$apply();
        });
      }
    };
  });

  sgdf.directive('searchInput', function($window, $rootScope, $state, $timeout) {
    return {
      restrict: "C",
      link: function($scope, element) {
        var changeEventStarted, delay, modifyInputWidth, w;
        w = angular.element($window);
        modifyInputWidth = function(entering) {
          var widWin;
          if (entering == null) {
            entering = true;
          }
          widWin = w.width() - 200;
          if (entering) {
            element.css({
              width: widWin
            });
          } else {
            element.css({
              width: 0
            });
          }
        };
        element.css({
          width: 0
        });
        if ($state.current.name === "root.search") {
          modifyInputWidth(true);
        }
        changeEventStarted = false;
        $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {
          if ((fromState.name !== "root.search" && toState.name !== "root.search") || (fromState.name === "root.search" && toState.name === "root.search")) {
            return;
          }
          if (changeEventStarted) {
            return;
          }
          changeEventStarted = true;
          event.preventDefault();
          $timeout(function() {
            $state.go(toState.name, toParams);
            if (fromState.name === "root.search") {
              modifyInputWidth(false);
            } else if (toState.name === "root.search") {
              modifyInputWidth(true);
            }
            return $timeout(function() {
              return changeEventStarted = false;
            }, 300);
          }, 100);
        });
        delay = (function() {
          var timer;
          timer = 0;
          return function(callback, ms) {
            clearTimeout(timer);
            timer = setTimeout(callback, ms);
          };
        })();
        element.bind("keyup", function() {
          delay((function() {
            var val;
            val = element.val();
            if (val.trim() !== "") {
              $rootScope.$broadcast('search-performed', {
                s: val
              });
            }
          }), 500);
        });
      }
    };
  });


  /*
  sgdf.directive 'singleArticle', ($state, $filter, $rootScope) ->
  
  	restrict: "C"
  	link: ($scope, element) ->
  
  		loadArticle = ( id ) ->
  			 * filter data
  			data = $filter('getById')( $scope.postdata.articles, id )
  			
  			 * replace content of article
  			element.children("h1").text( data.title or "" )
  			element.children(".main-image").attr( "src", data.image.url or "" )
  			element.children(".intro").html( data.excerpt or "" )
  			element.children(".content").html( data.content or "" )
  
  			 * animate scroll to article top when loaded
  			jQuery("html, body").animate
  				scrollTop: element[0].offsetTop
  			, 500
  
  			return
  
  		 * on transition
  		$rootScope.$on "$stateChangeStart", (event, toState, toParams, fromState, fromParams) ->
  
  			if toState.name is "root.category"
  				newArticle = toParams.article
  
  				 * load article
  				loadArticle( newArticle)
  
  				event.preventDefault()
  
  				$state.go( 'root.category', { article:newArticle }, { notify:false } )
  
  				return
  
  			
  
  		return
   */

  mod = angular.module('infinite-scroll', []);

  mod.value('THROTTLE_MILLISECONDS', null);

  mod.directive('infiniteScroll', [
    '$rootScope', '$window', '$interval', 'THROTTLE_MILLISECONDS', function($rootScope, $window, $interval, THROTTLE_MILLISECONDS) {
      return {
        scope: {
          infiniteScroll: '&',
          infiniteScrollContainer: '=',
          infiniteScrollDistance: '=',
          infiniteScrollDisabled: '=',
          infiniteScrollUseDocumentBottom: '=',
          infiniteScrollListenForEvent: '@'
        },
        link: function(scope, elem, attrs) {
          var changeContainer, checkWhenEnabled, container, handleInfiniteScrollContainer, handleInfiniteScrollDisabled, handleInfiniteScrollDistance, handleInfiniteScrollUseDocumentBottom, handler, height, immediateCheck, offsetTop, pageYOffset, scrollDistance, scrollEnabled, throttle, unregisterEventListener, useDocumentBottom, windowElement;
          windowElement = angular.element($window);
          scrollDistance = null;
          scrollEnabled = null;
          checkWhenEnabled = null;
          container = null;
          immediateCheck = true;
          useDocumentBottom = false;
          unregisterEventListener = null;
          height = function(elem) {
            elem = elem[0] || elem;
            if (isNaN(elem.offsetHeight)) {
              return elem.document.documentElement.clientHeight;
            } else {
              return elem.offsetHeight;
            }
          };
          offsetTop = function(elem) {
            if (!elem[0].getBoundingClientRect || elem.css('none')) {
              return;
            }
            return elem[0].getBoundingClientRect().top + pageYOffset(elem);
          };
          pageYOffset = function(elem) {
            elem = elem[0] || elem;
            if (isNaN(window.pageYOffset)) {
              return elem.document.documentElement.scrollTop;
            } else {
              return elem.ownerDocument.defaultView.pageYOffset;
            }
          };
          handler = function() {
            var containerBottom, containerTopOffset, elementBottom, remaining, shouldScroll;
            if (container === windowElement) {
              containerBottom = height(container) + pageYOffset(container[0].document.documentElement);
              elementBottom = offsetTop(elem) + height(elem);
            } else {
              containerBottom = height(container);
              containerTopOffset = 0;
              if (offsetTop(container) !== void 0) {
                containerTopOffset = offsetTop(container);
              }
              elementBottom = offsetTop(elem) - containerTopOffset + height(elem);
            }
            if (useDocumentBottom) {
              elementBottom = height((elem[0].ownerDocument || elem[0].document).documentElement);
            }
            remaining = elementBottom - containerBottom;
            shouldScroll = remaining <= height(container) * scrollDistance + 1;
            if (shouldScroll) {
              checkWhenEnabled = true;
              if (scrollEnabled) {
                if (scope.$$phase || $rootScope.$$phase) {
                  return scope.infiniteScroll();
                } else {
                  return scope.$apply(scope.infiniteScroll);
                }
              }
            } else {
              return checkWhenEnabled = false;
            }
          };
          throttle = function(func, wait) {
            var later, previous, timeout;
            timeout = null;
            previous = 0;
            later = function() {
              var context;
              previous = new Date().getTime();
              $interval.cancel(timeout);
              timeout = null;
              func.call();
              return context = null;
            };
            return function() {
              var now, remaining;
              now = new Date().getTime();
              remaining = wait - (now - previous);
              if (remaining <= 0) {
                clearTimeout(timeout);
                $interval.cancel(timeout);
                timeout = null;
                previous = now;
                return func.call();
              } else {
                if (!timeout) {
                  return timeout = $interval(later, remaining, 1);
                }
              }
            };
          };
          if (THROTTLE_MILLISECONDS != null) {
            handler = throttle(handler, THROTTLE_MILLISECONDS);
          }
          scope.$on('$destroy', function() {
            container.unbind('scroll', handler);
            if (unregisterEventListener != null) {
              unregisterEventListener();
              return unregisterEventListener = null;
            }
          });
          handleInfiniteScrollDistance = function(v) {
            return scrollDistance = parseFloat(v) || 0;
          };
          scope.$watch('infiniteScrollDistance', handleInfiniteScrollDistance);
          handleInfiniteScrollDistance(scope.infiniteScrollDistance);
          handleInfiniteScrollDisabled = function(v) {
            scrollEnabled = !v;
            if (scrollEnabled && checkWhenEnabled) {
              checkWhenEnabled = false;
              return handler();
            }
          };
          scope.$watch('infiniteScrollDisabled', handleInfiniteScrollDisabled);
          handleInfiniteScrollDisabled(scope.infiniteScrollDisabled);
          handleInfiniteScrollUseDocumentBottom = function(v) {
            return useDocumentBottom = v;
          };
          scope.$watch('infiniteScrollUseDocumentBottom', handleInfiniteScrollUseDocumentBottom);
          handleInfiniteScrollUseDocumentBottom(scope.infiniteScrollUseDocumentBottom);
          changeContainer = function(newContainer) {
            if (container != null) {
              container.unbind('scroll', handler);
            }
            container = newContainer;
            if (newContainer != null) {
              return container.bind('scroll', handler);
            }
          };
          changeContainer(windowElement);
          if (scope.infiniteScrollListenForEvent) {
            unregisterEventListener = $rootScope.$on(scope.infiniteScrollListenForEvent, handler);
          }
          handleInfiniteScrollContainer = function(newContainer) {
            if ((newContainer == null) || newContainer.length === 0) {
              return;
            }
            if (newContainer instanceof HTMLElement) {
              newContainer = angular.element(newContainer);
            } else if (typeof newContainer.append === 'function') {
              newContainer = angular.element(newContainer[newContainer.length - 1]);
            } else if (typeof newContainer === 'string') {
              newContainer = angular.element(document.querySelector(newContainer));
            }
            if (newContainer != null) {
              return changeContainer(newContainer);
            } else {
              throw new Exception("invalid infinite-scroll-container attribute.");
            }
          };
          scope.$watch('infiniteScrollContainer', handleInfiniteScrollContainer);
          handleInfiniteScrollContainer(scope.infiniteScrollContainer || []);
          if (attrs.infiniteScrollParent != null) {
            changeContainer(angular.element(elem.parent()));
          }
          if (attrs.infiniteScrollImmediateCheck != null) {
            immediateCheck = scope.$eval(attrs.infiniteScrollImmediateCheck);
          }
          return $interval((function() {
            if (immediateCheck) {
              return handler();
            }
          }), 0, 1);
        }
      };
    }
  ]);

  sgdf.directive('newsBloc', [
    function() {
      return {
        restrict: 'C',
        scope: {
          title: "@?",
          image: "@?",
          catimage: "@?",
          link: "@?",
          author: "@?",
          age: "@?",
          allLink: "@?",
          index: "@?",
          tag: "@?",
          rss: "@?",
          fonction: "@?",
          upimage: "@?",
          downimage: "@?"
        },
        templateUrl: function(tElement, tAttrs) {
          var newsBlocTemplateUrl;
          newsBlocTemplateUrl = blogInfo.modules + "/news-blocs/templates";
          if (tAttrs.type) {
            if (tAttrs.type === 'home') {
              return newsBlocTemplateUrl + '/home.html';
            }
            if (tAttrs.type === 'category') {
              return newsBlocTemplateUrl + '/category.html';
            } else if (tAttrs.type === 'question') {
              return newsBlocTemplateUrl + '/question.html';
            } else if (tAttrs.type === 'astuce') {
              return newsBlocTemplateUrl + '/astuce.html';
            } else if (tAttrs.type === 'temoignage') {
              return newsBlocTemplateUrl + '/temoignage.html';
            } else if (tAttrs.type === 'tag') {
              return newsBlocTemplateUrl + '/tag.html';
            } else if (tAttrs.type === 'jouer') {
              return newsBlocTemplateUrl + '/jouer.html';
            } else if (tAttrs.type === 'reveille') {
              return newsBlocTemplateUrl + '/reveille.html';
            }
          }
        }
      };
    }
  ]);


  /**
  SIMPLE SLIDESHOW
  inspired strongly by ui.bootstrap carousel
   */

  templateUrl = blogInfo.modules + "/simple-slideshow/templates";

  sgdf.controller("slideshowController", [
    "$scope", "$timeout", "$interval", "$transition", function($scope, $timeout, $interval, $transition) {
      var containerHeight, controlLeft, controlRight, currentIndex, currentInterval, destroyed, isPlaying, resetTimer, restartTimer, self, slides, timerFn;
      self = this;
      slides = self.slides = $scope.slides = [];
      currentIndex = -1;
      currentInterval = void 0;
      isPlaying = void 0;
      destroyed = false;
      controlLeft = void 0;
      controlRight = void 0;
      self.currentSlide = null;
      containerHeight = null;
      restartTimer = function() {
        var interval;
        resetTimer();
        interval = +$scope.interval;
        if (!isNaN(interval) && interval > 0) {
          currentInterval = $interval(timerFn, interval);
        }
      };
      resetTimer = function() {
        if (currentInterval) {
          $interval.cancel(currentInterval);
          currentInterval = null;
        }
      };
      timerFn = function() {
        var interval;
        interval = +$scope.interval;
        if (isPlaying && !isNaN(interval) && interval > 0) {
          $scope.next();
        } else {
          $scope.pause();
        }
      };
      self.select = $scope.select = function(nextSlide, direction) {
        var goNext, nextIndex, transitionDone;
        goNext = function() {
          var nextTransition, reflow, trigger;
          if (destroyed) {
            return;
          }
          if (self.currentSlide && angular.isString(direction) && !$scope.noTransition && nextSlide.$element) {
            nextSlide.$element.addClass(direction);
            reflow = nextSlide.$element[0].offsetWidth;
            angular.forEach(slides, function(slide) {
              angular.extend(slide, {
                direction: "",
                entering: false,
                leaving: false,
                active: false
              });
            });
            angular.extend(nextSlide, {
              direction: direction,
              active: true,
              entering: true
            });
            angular.extend(self.currentSlide || {}, {
              direction: direction,
              leaving: true
            });
            trigger = {};
            $scope.$currentTransition = $transition(nextSlide.$element, trigger);
            nextTransition = function(next, current) {
              $scope.$currentTransition.then((function() {
                transitionDone(next, current);
              }), function() {
                console.log("errortransition");
                transitionDone(next, current);
              });
            };
            nextTransition(nextSlide, self.currentSlide);
          } else {
            transitionDone(nextSlide, self.currentSlide);
          }
          self.currentSlide = nextSlide;
          currentIndex = nextIndex;
          restartTimer();
        };
        transitionDone = function(next, current) {
          angular.extend(next, {
            direction: "",
            active: true,
            leaving: false,
            entering: false
          });
          angular.extend(current || {}, {
            direction: "",
            active: false,
            leaving: false,
            entering: false
          });
          $scope.$currentTransition = null;
        };
        nextIndex = slides.indexOf(nextSlide);
        if (typeof direction === "undefined") {
          direction = (nextIndex > currentIndex ? "next" : "prev");
        }
        if (nextSlide && nextSlide !== self.currentSlide) {
          if ($scope.$currentTransition) {
            $scope.$currentTransition.cancel();
            $timeout(goNext);
          } else {
            goNext();
          }
        }
      };
      $scope.next = function() {
        var newIndex;
        newIndex = (currentIndex + 1) % slides.length;
        if (!$scope.$currentTransition) {
          return self.select(slides[newIndex], "next");
        }
      };
      $scope.prev = function() {
        var newIndex;
        newIndex = (currentIndex - 1 < 0 ? slides.length - 1 : currentIndex - 1);
        if (!$scope.$currentTransition) {
          return self.select(slides[newIndex], "prev");
        }
      };
      $scope.isActive = function(slide) {
        return self.currentSlide === slide;
      };
      $scope.play = function() {
        if (!isPlaying) {
          isPlaying = true;
          restartTimer();
        }
      };
      $scope.pause = function() {
        if (!$scope.noPause) {
          isPlaying = false;
          resetTimer();
        }
      };
      $scope.$on("$destroy", function() {
        destroyed = true;
      });
      $scope.$watch("interval", restartTimer);
      $scope.$on("$destroy", resetTimer);
      self.indexOfSlide = function(slide) {
        return slides.indexOf(slide);
      };
      self.addSlide = function(slide, element) {
        slide.$element = element;
        slides.push(slide);
        if (slides.length === 1 || slide.active) {
          self.select(slides[slides.length - 1]);
          if (slides.length === 1) {
            $scope.play();
          }
        } else {
          slide.active = false;
        }
      };
      return self.removeSlide = function(slide) {
        var index;
        index = slides.indexOf(slide);
        slides.splice(index, 1);
        if (slides.length > 0 && slide.active) {
          if (index >= slides.length) {
            self.select(slides[index - 1]);
          } else {
            self.select(slides[index]);
          }
        } else {
          if (currentIndex > index) {
            currentIndex--;
          }
        }
      };
    }
  ]);

  sgdf.directive("simpleSlideshow", function($window) {
    return {
      restrict: "EA",
      transclude: true,
      replace: true,
      controller: "slideshowController",
      templateUrl: templateUrl + "/slideshow.html",
      scope: {
        interval: "=",
        noTransition: "=",
        noPause: "=",
        controlLeft: "@",
        controlRight: "@"
      },
      link: function(scope, element, attrs) {
        var container, setHeight, windowElement;
        windowElement = angular.element($window);
        container = element.parent();
        setHeight = function() {
          scope.containerHeight = container.height();
          element.css({
            height: scope.containerHeight
          });
        };
        setHeight();
        windowElement.bind("resize", function() {
          setHeight();
        });
      }
    };
  });

  sgdf.directive("simpleslide", function() {
    return {
      require: "^simpleSlideshow",
      restrict: "EA",
      transclude: true,
      replace: true,
      templateUrl: templateUrl + "/slide.html",
      scope: {
        active: "=?",
        linked: "@",
        image: "@"
      },
      link: function(scope, element, attrs, slideshowCtrl) {
        slideshowCtrl.addSlide(scope, element);
        element.css({
          backgroundImage: 'url(' + scope.image + ')'
        });
        scope.$on("$destroy", function() {
          slideshowCtrl.removeSlide(scope);
        });
        scope.$watch("active", function(active) {
          if (active) {
            slideshowCtrl.select(scope);
          }
        });
        element.bind("click", function() {
          return window.location.href = scope.linked;
        });
      }
    };
  });

  tplVCUrl = blogInfo.modules + "/video-carousel/templates";

  sgdf.controller("videoController", [
    "$scope", "$window", "$timeout", function($scope, $window, $timeout) {
      var self, w, _getWindowDimension;
      self = this;
      $scope.currentEmbed = '';
      $scope.itemsCount = 0;
      w = angular.element($window);
      _getWindowDimension = function() {
        var wd;
        return wd = {
          w: w.width(),
          h: w.height()
        };
      };
      this.addItem = function() {
        $scope.itemsCount++;
        $scope.maxStep = $scope.itemsCount - 2 > 0 ? $scope.itemsCount - 2 : 0;
        $timeout(function() {
          return $scope.$apply();
        });
      };
      this._getEmbed = function(url) {
        var windowDimensions;
        windowDimensions = _getWindowDimension();
        return '<iframe src="' + url + '?autohide=1&theme=light&hd=1&modestbranding=1&rel=0&showinfo=0&showsearch=0&wmode=transparent&autoplay=1" data-width="' + windowDimensions.w + '" data-height="550" width="' + windowDimensions.w + '" height="550" frameborder="0" allowfullscreen></iframe>';
      };
      this.setEmbed = function(embed) {
        $scope.currentEmbed = embed;
        if (!$scope.$$phase) {
          $scope.$apply();
        }
      };
    }
  ]);

  sgdf.directive("videoCarousel", function($window, $timeout) {
    return {
      restrict: "C",
      controller: "videoController",
      scope: {
        controlLeft: "@",
        controlRight: "@"
      },
      link: function(scope, element, attrs) {
        var bindControls, closePlayer, items, itemsCount, list, loadVideo, maxSteps, moveList, nextControl, player, playerContainer, prevControl, sizeList, step, toggleActive, wdw, wrapper;
        wrapper = element.children(".wrapper");
        player = wrapper.children(".player");
        playerContainer = player.children(".video-container");
        closePlayer = player.children(".close-video");
        list = wrapper.children(".list");
        items = list.children(".items");
        prevControl = list.children(".video-list-control.left");
        nextControl = list.children(".video-list-control.right");
        itemsCount = 0;
        step = 0;
        maxSteps = 0;
        wdw = angular.element($window);
        toggleActive = function(active) {
          if (active == null) {
            active = true;
          }
          if (active) {
            player.addClass("active");
            list.addClass("active");
          } else {
            player.removeClass("active");
            list.removeClass("active");
          }
        };
        loadVideo = function(embed) {
          var active;
          playerContainer.html(embed);
          active = !(embed === "");
          toggleActive(active);
        };
        closePlayer.bind("click", function() {
          toggleActive(false);
          $timeout(function() {
            scope.currentEmbed = "";
            return scope.$apply();
          }, 500);
        });
        scope.$watch("currentEmbed", function(embed) {
          loadVideo(embed);
        });
        sizeList = function() {
          var windowWidth;
          if (itemsCount === 0) {
            return;
          }
          windowWidth = wdw.width();
          items.css({
            width: windowWidth / 2 * itemsCount + "px"
          });
          items.children().css({
            width: windowWidth / 2 + "px"
          });
        };
        bindControls = function() {
          prevControl.bind("click", function() {
            moveList(false);
          });
          nextControl.bind("click", function() {
            moveList(true);
          });
        };
        moveList = function(forward) {
          var transform;
          if (forward == null) {
            forward = true;
          }
          if (step === 0 && !forward) {
            return;
          }
          if (step === maxSteps && forward) {
            return;
          }
          step = forward ? step + 1 : step - 1;
          transform = wdw.width() / 2 * step * -1;
          items.css({
            "-webkit-transform": "translateX(" + transform + "px)",
            "-ms-transform": "translateX(" + transform + "px)",
            "transform": "translateX(" + transform + "px)"
          });
        };
        bindControls();
        scope.getWindowDimensions = function() {
          return {
            h: wdw.height(),
            w: wdw.width()
          };
        };
        scope.$watch(scope.getWindowDimensions, function(newValue, oldValue) {
          if (newValue !== oldValue) {
            sizeList();
          }
        }, true);
        scope.$watch("itemsCount", function(value) {
          itemsCount = value;
          maxSteps = (itemsCount - 1) / 4 + 1 - 2;
          sizeList();
        });
        wdw.bind('resize', function() {
          return scope.$apply();
        });
      }
    };
  });

  sgdf.directive("videoitem", function() {
    return {
      require: "^videoCarousel",
      restrict: "C",
      transclude: true,
      replace: false,
      templateUrl: tplVCUrl + "/video-item.html",
      scope: {
        image: "@",
        embed: "@",
        title: "@",
        play: "@"
      },
      link: function(scope, element, attrs, videoCtrl) {
        var embed;
        embed = videoCtrl._getEmbed(scope.embed);
        videoCtrl.addItem(scope);
        element.bind("click", function() {
          videoCtrl.setEmbed(embed);
        });
      }
    };
  });


  /* global YT */

  angular.module('youtube-embed', ['ng']).service('youtubeEmbedUtils', [
    '$window', '$rootScope', function($window, $rootScope) {
      var Service, contains, timeRegexp, youtubeRegexp;
      Service = {};
      youtubeRegexp = /https?:\/\/(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube(?:-nocookie)?\.com\S*[^\w\s-])([\w-]{11})(?=[^\w-]|$)(?![?=&+%\w.-]*(?:['"][^<>]*>|<\/a>))[?=&+%\w.-]*/ig;
      timeRegexp = /t=(\d+)[ms]?(\d+)?s?/;
      contains = function(str, substr) {
        return str.indexOf(substr) > -1;
      };
      Service.getIdFromURL = function(url) {
        var id, pieces, uriComponent;
        id = url.replace(youtubeRegexp, '$1');
        if (contains(id, ';')) {
          pieces = id.split(';');
          if (contains(pieces[1], '%')) {
            uriComponent = decodeURIComponent(id.split(';')[1]);
            id = ('http://youtube.com' + uriComponent).replace(youtubeRegexp, '$1');
          } else {
            id = pieces[0];
          }
        } else if (contains(id, '#')) {
          id = id.split('#')[0];
        }
        return id;
      };
      Service.getTimeFromURL = function(url) {
        var full, minutes, seconds, times;
        url = url || '';
        times = url.match(timeRegexp);
        if (!times) {
          return 0;
        }
        full = times[0];
        minutes = times[1];
        seconds = times[2];
        if (typeof seconds !== 'undefined') {
          seconds = parseInt(seconds, 10);
          minutes = parseInt(minutes, 10);
        } else if (contains(full, 'm')) {
          minutes = parseInt(minutes, 10);
          seconds = 0;
        } else {
          seconds = parseInt(minutes, 10);
          minutes = 0;
        }
        return seconds + minutes * 60;
      };
      (function() {
        var firstScriptTag, tag;
        tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      })();
      Service.ready = false;
      $window.onYouTubeIframeAPIReady = function() {
        $rootScope.$apply(function() {
          Service.ready = true;
        });
      };
      return Service;
    }
  ]).directive('youtubeVideo', [
    'youtubeEmbedUtils', function(youtubeEmbedUtils) {
      var eventPrefix, stateNames, uniqId;
      uniqId = 1;
      stateNames = {
        '-1': 'unstarted',
        0: 'ended',
        1: 'playing',
        2: 'paused',
        3: 'buffering',
        5: 'queued'
      };
      eventPrefix = 'youtube.player.';
      return {
        restrict: 'EA',
        scope: {
          videoId: '=?',
          videoUrl: '=?',
          player: '=?',
          playerVars: '=?',
          playerHeight: '=?',
          playerWidth: '=?'
        },
        link: function(scope, element, attrs) {
          var applyBroadcast, createPlayer, loadPlayer, onPlayerReady, onPlayerStateChange, playerId, stopWatchingReady;
          applyBroadcast = function() {
            var args;
            args = Array.prototype.slice.call(arguments);
            scope.$apply(function() {
              scope.$emit.apply(scope, args);
            });
          };
          onPlayerStateChange = function(event) {
            var state;
            state = stateNames[event.data];
            if (typeof state !== 'undefined') {
              applyBroadcast(eventPrefix + state, scope.player, event);
            }
            scope.$apply(function() {
              scope.player.currentState = state;
            });
          };
          onPlayerReady = function(event) {
            applyBroadcast(eventPrefix + 'ready', scope.player, event);
          };
          createPlayer = function() {
            var player, playerVars;
            playerVars = angular.copy(scope.playerVars);
            playerVars.start = playerVars.start || scope.urlStartTime;
            player = new YT.Player(playerId, {
              height: scope.playerHeight,
              width: scope.playerWidth,
              videoId: scope.videoId,
              playerVars: playerVars,
              events: {
                onReady: onPlayerReady,
                onStateChange: onPlayerStateChange
              }
            });
            player.id = playerId;
            return player;
          };
          loadPlayer = function() {
            if (scope.videoId || scope.playerVars.list) {
              if (scope.player && scope.player.d && typeof scope.player.destroy === 'function') {
                scope.player.destroy();
              }
              scope.player = createPlayer();
            }
          };
          scope.utils = youtubeEmbedUtils;
          playerId = attrs.playerId || element[0].id || 'unique-youtube-embed-id-' + uniqId++;
          element[0].id = playerId;
          scope.playerHeight = scope.playerHeight || 390;
          scope.playerWidth = scope.playerWidth || 640;
          scope.playerVars = scope.playerVars || {};
          stopWatchingReady = scope.$watch((function() {
            return scope.utils.ready && (typeof scope.videoUrl !== 'undefined' || typeof scope.videoId !== 'undefined' || typeof scope.playerVars.list !== 'undefined');
          }), function(ready) {
            if (ready) {
              stopWatchingReady();
              if (typeof scope.videoUrl !== 'undefined') {
                scope.$watch('videoUrl', function(url) {
                  scope.videoId = scope.utils.getIdFromURL(url);
                  scope.urlStartTime = scope.utils.getTimeFromURL(url);
                  loadPlayer();
                });
              } else if (typeof scope.videoId !== 'undefined') {
                scope.$watch('videoId', function() {
                  scope.urlStartTime = null;
                  loadPlayer();
                });
              } else {
                scope.$watch('playerVars.list', function() {
                  scope.urlStartTime = null;
                  loadPlayer();
                });
              }
            }
          });
          scope.$watchCollection(['playerHeight', 'playerWidth'], function() {
            if (scope.player) {
              scope.player.setSize(scope.playerWidth, scope.playerHeight);
            }
          });
          scope.$on('$destroy', function() {
            scope.player && scope.player.destroy();
          });
        }
      };
    }
  ]);

  sgdf.factory("formHandler", function($http) {
    return {
      addQuestion: function(author, age, content) {
        return $http({
          url: blogInfo.api + 'add_question/',
          method: 'POST',
          data: {
            author: author,
            age: age,
            content: content
          }
        }).then(function(result) {
          return result.data;
        });
      },
      addTemoignage: function(author, age, content) {
        return $http({
          url: blogInfo.api + 'add_temoignage/',
          method: 'POST',
          data: {
            author: author,
            age: age,
            content: content
          }
        }).then(function(result) {
          return result.data;
        });
      },
      sendContact: function(name, email, content, me) {
        return $http({
          url: blogInfo.api + 'send_contact/',
          method: 'POST',
          data: {
            name: name,
            email: email,
            content: content,
            me: me
          }
        }).then(function(result) {
          return result.data;
        });
      },
      sendAventure: function(name, email, tribu, commentaire, aventure_titre, aventure_text, files) {
        return $http({
          url: blogInfo.api + 'send_aventure/',
          method: 'POST',
          data: {
            name: name,
            email: email,
            tribu: tribu,
            commentaire: commentaire,
            aventure_titre: aventure_titre,
            aventure_text: aventure_text,
            files: files
          }
        }).then(function(result) {
          return result.data;
        });
      }
    };
  });

  sgdf.factory("getData", function($http) {
    return {
      getHeader: function() {
        return $http({
          url: blogInfo.api + 'get_header/'
        }).then(function(result) {
          return result.data;
        });
      },
      getFooter: function() {
        return $http({
          url: blogInfo.api + 'get_footer/'
        }).then(function(result) {
          return result.data;
        });
      },
      getSas: function() {
        return $http({
          url: blogInfo.api + 'get_sas/'
        }).then(function(result) {
          return result.data;
        });
      },
      getHome: function() {
        return $http({
          url: blogInfo.api + 'get_home/'
        }).then(function(result) {
          return result.data;
        });
      },
      getCategory: function(id, page, article) {
        if (id == null) {
          id = null;
        }
        if (page == null) {
          page = 1;
        }
        if (article == null) {
          article = null;
        }
        return $http({
          url: blogInfo.api + 'get_category/',
          params: {
            id: id,
            page: page,
            article: article
          }
        }).then(function(result) {
          return result.data;
        });
      },
      getQuestions: function(page) {
        if (page == null) {
          page = 1;
        }
        return $http({
          url: blogInfo.api + 'get_questions/',
          params: {
            page: page
          }
        }).then(function(result) {
          return result.data;
        });
      },
      getTemoignages: function(page) {
        if (page == null) {
          page = 1;
        }
        return $http({
          url: blogInfo.api + 'get_temoignages/',
          params: {
            page: page
          }
        }).then(function(result) {
          return result.data;
        });
      },
      getContact: function() {
        return $http({
          url: blogInfo.api + 'get_contact/'
        }).then(function(result) {
          return result.data;
        });
      },
      getPage: function(id) {
        if (id == null) {
          id = null;
        }
        return $http({
          url: blogInfo.api + 'get_page/',
          params: {
            id: id
          }
        }).then(function(result) {
          return result.data;
        });
      },
      getSearchResults: function(search) {
        if (search == null) {
          search = null;
        }
        return $http({
          url: blogInfo.api + 'get_search/',
          params: {
            search: search
          }
        }).then(function(result) {
          return result.data;
        });
      },
      getDocenstock: function() {
        return $http({
          url: blogInfo.api + 'get_docenstock/'
        }).then(function(result) {
          return result.data;
        });
      },
      getDocenstockResults: function(search, cat) {
        if (search == null) {
          search = null;
        }
        if (cat == null) {
          cat = null;
        }
        return $http({
          url: blogInfo.api + 'get_docenstock_results/',
          params: {
            search: search,
            cat: cat
          }
        }).then(function(result) {
          return result.data;
        });
      },
      getAventure: function() {
        return $http({
          url: blogInfo.api + 'get_aventure/'
        }).then(function(result) {
          return result.data;
        });
      },
      getMedias: function(id) {
        return $http({
          url: blogInfo.api + 'get_medias/',
          params: {
            id: id
          }
        }).then(function(result) {
          return result.data;
        });
      },
      getVideos: function() {
        return $http({
          url: blogInfo.api + 'get_videos/'
        }).then(function(result) {
          return result.data;
        });
      },
      getJouer: function() {
        return $http({
          url: blogInfo.api + 'get_jouer/'
        }).then(function(result) {
          return result.data;
        });
      },
      getReveille: function() {
        return $http({
          url: blogInfo.api + 'get_reveille/'
        }).then(function(result) {
          return result.data;
        });
      }
    };
  });

}).call(this);
