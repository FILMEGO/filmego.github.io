/**
 * Copyright (c) 2007-2014 Ariel Flesler - aflesler<a>gmail<d>com | http://flesler.blogspot.com
 * Licensed under MIT
 * @author Ariel Flesler
 * @version 1.4.12
 */
;(function(a){if(typeof define==='function'&&define.amd){define(['jquery'],a)}else{a(jQuery)}}(function($){var j=$.scrollTo=function(a,b,c){return $(window).scrollTo(a,b,c)};j.defaults={axis:'xy',duration:parseFloat($.fn.jquery)>=1.3?0:1,limit:true};j.window=function(a){return $(window)._scrollable()};$.fn._scrollable=function(){return this.map(function(){var a=this,isWin=!a.nodeName||$.inArray(a.nodeName.toLowerCase(),['iframe','#document','html','body'])!=-1;if(!isWin)return a;var b=(a.contentWindow||a).document||a.ownerDocument||a;return/webkit/i.test(navigator.userAgent)||b.compatMode=='BackCompat'?b.body:b.documentElement})};$.fn.scrollTo=function(f,g,h){if(typeof g=='object'){h=g;g=0}if(typeof h=='function')h={onAfter:h};if(f=='max')f=9e9;h=$.extend({},j.defaults,h);g=g||h.duration;h.queue=h.queue&&h.axis.length>1;if(h.queue)g/=2;h.offset=both(h.offset);h.over=both(h.over);return this._scrollable().each(function(){if(f==null)return;var d=this,$elem=$(d),targ=f,toff,attr={},win=$elem.is('html,body');switch(typeof targ){case'number':case'string':if(/^([+-]=?)?\d+(\.\d+)?(px|%)?$/.test(targ)){targ=both(targ);break}targ=win?$(targ):$(targ,this);if(!targ.length)return;case'object':if(targ.is||targ.style)toff=(targ=$(targ)).offset()}var e=$.isFunction(h.offset)&&h.offset(d,targ)||h.offset;$.each(h.axis.split(''),function(i,a){var b=a=='x'?'Left':'Top',pos=b.toLowerCase(),key='scroll'+b,old=d[key],max=j.max(d,a);if(toff){attr[key]=toff[pos]+(win?0:old-$elem.offset()[pos]);if(h.margin){attr[key]-=parseInt(targ.css('margin'+b))||0;attr[key]-=parseInt(targ.css('border'+b+'Width'))||0}attr[key]+=e[pos]||0;if(h.over[pos])attr[key]+=targ[a=='x'?'width':'height']()*h.over[pos]}else{var c=targ[pos];attr[key]=c.slice&&c.slice(-1)=='%'?parseFloat(c)/100*max:c}if(h.limit&&/^\d+$/.test(attr[key]))attr[key]=attr[key]<=0?0:Math.min(attr[key],max);if(!i&&h.queue){if(old!=attr[key])animate(h.onAfterFirst);delete attr[key]}});animate(h.onAfter);function animate(a){$elem.animate(attr,g,h.easing,a&&function(){a.call(this,targ,h)})}}).end()};j.max=function(a,b){var c=b=='x'?'Width':'Height',scroll='scroll'+c;if(!$(a).is('html,body'))return a[scroll]-$(a)[c.toLowerCase()]();var d='client'+c,html=a.ownerDocument.documentElement,body=a.ownerDocument.body;return Math.max(html[scroll],body[scroll])-Math.min(html[d],body[d])};function both(a){return $.isFunction(a)||typeof a=='object'?a:{top:a,left:a}};return j}));

/*
 * Viewport - jQuery selectors for finding elements in viewport
 *
 * Copyright (c) 2008-2009 Mika Tuupola
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Project home:
 *  http://www.appelsiini.net/projects/viewport
 *
 */
(function($){$.belowthefold=function(element,settings){var fold=$(window).height()+$(window).scrollTop();return fold<=$(element).offset().top-settings.threshold;};$.abovethetop=function(element,settings){var top=$(window).scrollTop();return top>=$(element).offset().top+$(element).height()-settings.threshold;};$.rightofscreen=function(element,settings){var fold=$(window).width()+$(window).scrollLeft();return fold<=$(element).offset().left-settings.threshold;};$.leftofscreen=function(element,settings){var left=$(window).scrollLeft();return left>=$(element).offset().left+$(element).width()-settings.threshold;};$.inviewport=function(element,settings){return!$.rightofscreen(element,settings)&&!$.leftofscreen(element,settings)&&!$.belowthefold(element,settings)&&!$.abovethetop(element,settings);};$.extend($.expr[':'],{"below-the-fold":function(a,i,m){return $.belowthefold(a,{threshold:0});},"above-the-top":function(a,i,m){return $.abovethetop(a,{threshold:0});},"left-of-screen":function(a,i,m){return $.leftofscreen(a,{threshold:0});},"right-of-screen":function(a,i,m){return $.rightofscreen(a,{threshold:0});},"in-viewport":function(a,i,m){return $.inviewport(a,{threshold:0});}});})(jQuery);

(function($) {
    "use strict";
    // Custom scripts

    $(document).ready(function(){

        var siteLoaded = false,
            deviceDesktop = true,
            countdownInterval = null,
            targetDate;

        var countdownDate = "22 March 2016 20:00:00"; //date format: DD MONTH YYYY HH:MM:SS

        /*device type*/
        if (isMobile.tablet || isMobile.phone ) {
            $('body .inview').removeClass('inview');
            deviceDesktop = false;
        } else {
            $('body').addClass('desktop');
        }
        if ($.browser.msie || navigator.userAgent.match(/Trident\/7\./)) {
            $('body').addClass('ie');
        }
        /*device type*/


        /*Begin Window Resize*/
        function windowResize() {
            var height = $(window).height();
            $('.window-height').css('height', height+'px');
        }

        if (deviceDesktop===false) { //fix height: 100vh on some mobile browsers
            $(window).resize(function(){
                windowResize();
            });
        }
        /*End Window Resize*/

        /*On scroll*/
        $(window).scroll(function() {
            if (deviceDesktop) {
                $("body .inview:in-viewport").each(function() {
                    var timeout = parseInt($(this).data('inview-timeout'),10) || 10;
                    var inview = $(this);
                    setTimeout(function() {
                        inview.show().addClass('animated ' + inview.data('inview-animation') );
                        inview.removeClass('inview');
                    }, timeout);
                });
            }
        });
        /*End on scroll*/

        /*Smooth scrolling*/
        $('#main-nav li a').on('click', function(event) {
            event.preventDefault();
            var href = $(this).attr('href');
            if ( href.indexOf('#')===0 ) { //it's internal link
                var target = $(href);
                if (target.length) {// and it's ID exists
                    $(window).scrollTo( target.offset().top, 200 );
                }
            } else {
                window.location = href; // external link
            }
        });
        /*End smooth scrolling*/

        /*navigation*/
        $('.rolex-nav').on('click', function() {
            if ($(this).hasClass('nav')) { //do not add active class on buttons outside the main navigation
                $(this).addClass('active').siblings().removeClass('active');
            }
            $($(this).data('target') + ' ' + $(this).data('slide-to')).addClass('active').siblings('.slide').removeClass('active');
            $(window).trigger('scroll');
        });
        /*End navigation*/


        /*Backgrounds image loop*/
        var backgrounds = $('#backgrounds .background'),
            backgroundsTimer = null,
            backgroundsInterval = parseInt($('#backgrounds').data('interval'), 10) || 4000;
        function backgroundsLoop() {
            var current = backgrounds.filter('.active'),
                next = current.nextAll('.background').filter(':first');
            if (next.length<1) {
                next = backgrounds.filter(':first');
            }
            current.removeClass('active');
            next.addClass('active');
            backgroundsTimer = setTimeout(function(){ backgroundsLoop() },backgroundsInterval);
        }
        if (backgrounds.length>1) {
            backgroundsTimer = setTimeout(function(){ backgroundsLoop() },backgroundsInterval);
        }
        /*End Backgrounds image loop*/

        /*placeholder in IE<10 */
        if ($.browser.msie  && parseInt($.browser.version, 10) < 10) {
            $('input, textarea').focus(function() {
                if ( $(this).val()==jQuery(this).attr('placeholder') ) $(this).val('');
            }); // end focus

            $('input, textarea').each(function() {
                if ( $(this).val().length<1 ) $(this).val($(this).attr('placeholder'));
            });

            $('input, textarea').blur(function() {
                if ( $(this).val().length<1 ) $(this).val($(this).attr('placeholder'));
            });
        }
        /*end placeholder in IE<10 */

        /*Contact Form*/
        var contactFormElem = jQuery("#contact-form");
        if (!!contactFormElem) {
            contactFormElem.submit(function(e)
            {
                var postData = contactFormElem.serializeArray();

                var formURL = window.location.href;
                formURL = formURL.substring(0,formURL.lastIndexOf('/')+1);

                formURL = contactFormElem.attr("action");

                jQuery.ajax(
                    {
                        url : formURL,
                        type: "POST",
                        data : postData,
                        success:function(data)
                        {
                            contactFormElem.find('input[type=text], textarea').val('');
                            jQuery("#contact-form-response").hide().html('<div class="form-info box-half-space"><span class="fa fa-envelope fa-fw"></span>'+data+'</div>').fadeIn();
                            jQuery.scrollTo('#contact-form-response');
                        },
                        error: function(jqXHR, textStatus, errorThrown)
                        {
                            jQuery("#contact-form-response").hide().html('<div class="form-info box-half-space"><span class="fa fa-exclamation-circle fa-fw"></span>Если Мы не ответим Вам в течении суток. Напишите напрямую на extensionsapp@gmail.com</div>').fadeIn();
                            jQuery.scrollTo('#contact-form-response');
                        }
                    });
                e.preventDefault(); //STOP default action
            });
        }
        /*End Contact Form*/


        /*Subscribe Form*/
        jQuery(".subscribe-form").each(function() {
            var form = $(this);
            form.submit(function(e)
            {
                var postData = form.serializeArray(),
                    formURL = form.attr("action"),
                    formMethod = form.attr("method"),
                    responseElement = form.find('.subscribe-response');

                jQuery.ajax(
                    {
                        url : formURL,
                        type: "POST",
                        cache: false,
                        contentType: "application/json; charset=utf-8",
                        data : postData,
                        method: formMethod,
                        dataType: 'json',
                        success:function(data, textStatus, jqXHR)
                        {
                            form.find('input[type=text]').val('');
                            var message = '';
                            if (data.result != "success") {
                                var message = data.msg.substring(4);
                            } else {
                                message = 'Almost finished! We sent you a confirmation email.';
                            }
                            responseElement.hide().html('<div class="form-info box-half-space"><span class="fa fa-envelope fa-fw"></span>'+ message +'</div>').fadeIn();
                            jQuery.scrollTo(responseElement);
                        },
                        error: function(jqXHR, textStatus, errorThrown)
                        {
                            responseElement.hide().html('<div class="form-info box-half-space"><span class="fa fa-exclamation-circle fa-fw"></span>Could not connect to server. Please try again later.</div>').fadeIn();
                            jQuery.scrollTo(responseElement);
                        }
                    });
                e.preventDefault(); //STOP default action
            });

        });
        /*End Subscribe Form*/


        /*Countdown */
        function countdownTickTock() {

            if (!isNaN(targetDate)) {
                var currentDate = Math.floor($.now() / 1000),
                    days, hours, minutes, seconds;

                if(targetDate <= currentDate) {
                    clearInterval(countdownInterval);
                }

                seconds = targetDate - currentDate;

                days = Math.floor(seconds / (60 * 60 * 24));
                seconds = seconds - days * 60 * 60 * 24;

                hours = Math.floor(seconds / (60 * 60));
                seconds = seconds - hours * 60 * 60;

                minutes = Math.floor(seconds / 60);
                seconds = seconds - minutes * 60;

                days = (String(days).length >= 2) ? days : "0" + days;
                hours = (String(hours).length >= 2) ? hours : "0" + hours;
                minutes = (String(minutes).length >= 2) ? minutes : "0" + minutes;
                seconds = (String(seconds).length >= 2) ? seconds : "0" + seconds;

                $("#rolexDays").text(days);
                $("#rolexHours").text(hours);
                $("#rolexMinutes").text(minutes);
                $("#rolexSeconds").text(seconds);

            } else {
                clearInterval(countdownInterval);
                alert("The entered date is invalid or not in the correct format. \n\nPlease use the format: DD MONTH YYYY HH:MM:SS\nFor example: 21 march 2016 20:30:02");
            }
        }
        /* End Countdown */

        /*After site load (preloader) */
        $(window).load(function() {
            siteLoaded = true;

            if (deviceDesktop===false) {
                windowResize(); //fix height: 100vh on some mobile browsers
            }

            /*Begin rolex Countdown */
            targetDate = Date.parse(countdownDate) / 1000;
            countdownInterval = setInterval(countdownTickTock,1000);  // start countdown interval
            countdownTickTock(); // start countdown immediately
            /*End rolex Countdown */

            $(window).trigger('scroll');

            $('#preloader').fadeOut();
        });
        /*End after site load */

    });  

	/*home text slider initialization */
	$('.slider').cycle({
		fx : 'scrollVert',
		timeout: 2000,
		delay: 800,
		speed: 1400,
		slides: '.slide',
		easing:'easeInOutElastic'
	});
	 /* ---- DOCUMENT READY END ---- */
	
})(jQuery);
