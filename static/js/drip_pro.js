/*
 * jQuery BBQ: Back Button & Query Library - v1.3pre - 8/26/2010
 * http://benalman.com/projects/jquery-bbq-plugin/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
(function($,r){var h,n=Array.prototype.slice,t=decodeURIComponent,a=$.param,j,c,m,y,b=$.bbq=$.bbq||{},s,x,k,e=$.event.special,d="hashchange",B="querystring",F="fragment",z="elemUrlAttr",l="href",w="src",p=/^.*\?|#.*$/g,u,H,g,i,C,E={};function G(I){return typeof I==="string"}function D(J){var I=n.call(arguments,1);return function(){return J.apply(this,I.concat(n.call(arguments)))}}function o(I){return I.replace(H,"$2")}function q(I){return I.replace(/(?:^[^?#]*\?([^#]*).*$)?.*/,"$1")}function f(K,P,I,L,J){var R,O,N,Q,M;if(L!==h){N=I.match(K?H:/^([^#?]*)\??([^#]*)(#?.*)/);M=N[3]||"";if(J===2&&G(L)){O=L.replace(K?u:p,"")}else{Q=m(N[2]);L=G(L)?m[K?F:B](L):L;O=J===2?L:J===1?$.extend({},L,Q):$.extend({},Q,L);O=j(O);if(K){O=O.replace(g,t)}}R=N[1]+(K?C:O||!N[1]?"?":"")+O+M}else{R=P(I!==h?I:location.href)}return R}a[B]=D(f,0,q);a[F]=c=D(f,1,o);a.sorted=j=function(J,K){var I=[],L={};$.each(a(J,K).split("&"),function(P,M){var O=M.replace(/(?:%5B|=).*$/,""),N=L[O];if(!N){N=L[O]=[];I.push(O)}N.push(M)});return $.map(I.sort(),function(M){return L[M]}).join("&")};c.noEscape=function(J){J=J||"";var I=$.map(J.split(""),encodeURIComponent);g=new RegExp(I.join("|"),"g")};c.noEscape(",/");c.ajaxCrawlable=function(I){if(I!==h){if(I){u=/^.*(?:#!|#)/;H=/^([^#]*)(?:#!|#)?(.*)$/;C="#!"}else{u=/^.*#/;H=/^([^#]*)#?(.*)$/;C="#"}i=!!I}return i};c.ajaxCrawlable(0);$.deparam=m=function(L,I){var K={},J={"true":!0,"false":!1,"null":null};$.each(L.replace(/\+/g," ").split("&"),function(O,T){var N=T.split("="),S=t(N[0]),M,R=K,P=0,U=S.split("]["),Q=U.length-1;if(/\[/.test(U[0])&&/\]$/.test(U[Q])){U[Q]=U[Q].replace(/\]$/,"");U=U.shift().split("[").concat(U);Q=U.length-1}else{Q=0}if(N.length===2){M=t(N[1]);if(I){M=M&&!isNaN(M)?+M:M==="undefined"?h:J[M]!==h?J[M]:M}if(Q){for(;P<=Q;P++){S=U[P]===""?R.length:U[P];R=R[S]=P<Q?R[S]||(U[P+1]&&isNaN(U[P+1])?{}:[]):M}}else{if($.isArray(K[S])){K[S].push(M)}else{if(K[S]!==h){K[S]=[K[S],M]}else{K[S]=M}}}}else{if(S){K[S]=I?h:""}}});return K};function A(K,I,J){if(I===h||typeof I==="boolean"){J=I;I=a[K?F:B]()}else{I=G(I)?I.replace(K?u:p,""):I}return m(I,J)}m[B]=D(A,0);m[F]=y=D(A,1);$[z]||($[z]=function(I){return $.extend(E,I)})({a:l,base:l,iframe:w,img:w,input:w,form:"action",link:l,script:w});k=$[z];function v(L,J,K,I){if(!G(K)&&typeof K!=="object"){I=K;K=J;J=h}return this.each(function(){var O=$(this),M=J||k()[(this.nodeName||"").toLowerCase()]||"",N=M&&O.attr(M)||"";O.attr(M,a[L](N,K,I))})}$.fn[B]=D(v,B);$.fn[F]=D(v,F);b.pushState=s=function(L,I){if(G(L)&&/^#/.test(L)&&I===h){I=2}var K=L!==h,J=c(location.href,K?L:{},K?I:2);location.href=J};b.getState=x=function(I,J){return I===h||typeof I==="boolean"?y(I):y(J)[I]};b.removeState=function(I){var J={};if(I!==h){J=x();$.each($.isArray(I)?I:arguments,function(L,K){delete J[K]})}s(J,2)};e[d]=$.extend(e[d],{add:function(I){var K;function J(M){var L=M[F]=c();M.getState=function(N,O){return N===h||typeof N==="boolean"?m(L,N):m(L,O)[N]};K.apply(this,arguments)}if($.isFunction(I)){K=I;return J}else{K=I.handler;I.handler=J}}})})(jQuery,this);

/* ^^^ this library allows us to easily read querystring params */

/*

  Drip Power Tools
  v1.0
  Copyright 2016, Double Your Freelancing
  Author: Brennan Dunn

*/

(function(){
  DripPro = (function(){
    function DripPro() {}

    DripPro.prototype.settings = {
      debug: false,
      cookie_prefix: 'drippro_',
      offer_fn_name: 'drip_plinko',
      template_path: '/',
      template_ext: '.html',
      modal_delay: 1000,
      modal_sensitivity: 20,
      pre_init: function() {}
    }

    DripPro.prototype.renderers = {
      replacer: function(intent, content) {
        this.debug('Rendering HTML in placeholder: ' + intent, content)
        jQuery('[data-placeholder='+intent+']').html(content)
      },
      modal: function(intent, content) {
        window._delayTimer = null
        sensitivity = this.settings.modal_sensitivity
        delay = this.settings.modal_delay

        function handleMouseEnter(e) {
          if (_delayTimer) {
            clearTimeout(_delayTimer);
            _delayTimer = null;
          }
        }

        function handleMouseLeave(e) {
          var cookie_name = this.settings.cookie_prefix+'_ig_'+intent
          if (e.clientY > sensitivity) return
          if (!!jQuery.cookie(cookie_name)) return

          _delayTimer = setTimeout(function(){
            if (jQuery.modal.isActive()) return

            this.debug('Displaying modal')

            var modal = jQuery('<div class="modal">')
                          .data('placeholder', intent)
                          .html(content)
                          .appendTo('body')
                          .modal()
            modal.on('modal:after-close', function(){
              jQuery.cookie(cookie_name, '1', {
                path: '/',
                expires: 365
              })
            })
          }.bind(this), delay);
        }
  
        jQuery('body').on('mouseenter', handleMouseEnter);
        jQuery('body').on('mouseleave', handleMouseLeave.bind(this));
      }
    }

    DripPro.prototype.init = function(settings, renderers) {
      this.settings = jQuery.extend(this.settings, settings)
      this.renderers = jQuery.extend(this.renderers, renderers)

      this.settings.pre_init()
      _dcq.push(['identify', { success: this.drip_response_received.bind(this) }])
      this.extract_utms()
      this.modify_forms()
      return this
    }

    /* Initializer functions */

    DripPro.prototype.extract_utms = function() {
      var utm_hash = ''
      p = jQuery.deparam.querystring()

      if (!jQuery.isEmptyObject(p)) {

        this.debug('UTM params:', p)
        
        res = {}
        for (var key in p) {
          if (key.indexOf('utm') === 0)
            res[key] = p[key]
        }

        jQuery.cookie(this.settings.cookie_prefix + '_utm', jQuery.param(res), {
          path: '/',
          expires: 365
        })
      }
    }

    DripPro.prototype.modify_forms = function() {
      var t = this
      jQuery('[data-drip-embedded-form]').each(function(){
        var utms = jQuery.cookie(t.settings.cookie_prefix + '_utm')

        jQuery(this).append(jQuery('<input type="hidden">').attr('name', 'fields[optin_url]').val(window.location.origin + window.location.pathname))

        if (utms) {
          utms = jQuery.deparam(utms)
          for (var key in utms) {
            t.debug('Adding hidden UTM field to form: '+key)
            jQuery(this).append(jQuery('<input type="hidden">').attr('name', 'fields['+key+']').val(utms[key]))
          }
        }
      })
    }

    /* After Drip payload received */

    DripPro.prototype.drip_response_received = function(payload) {
      this.drip_contact = payload
      this.is_anon = payload.anonymous
      if (this.is_anon) this.debug('Visitor is anonymous')
      this.offer = this.determine_offer()
      this.apply_offer_ctas()
    }

    DripPro.prototype.determine_offer = function() {
      try {
        return window[this.settings.offer_fn_name](new this.fn_helper(this))
      } catch(err) {
        this.debug('Error firing the offer function: ' + this.settings.offer_fn_name + ', ' + err)
        return null
      }
    }

    DripPro.prototype.apply_offer_ctas = function() {
      var o = jQuery.extend({}, this.offer)
      offer_name = o.offer
      delete o.offer

      for (var intent in o) {
        var fn = (this.renderers[intent] || this.renderers.replacer).bind(this)
        var tmpl = o[intent]
        if (o[intent] instanceof Array) {
          fn = this.renderers[o[intent][1]].bind(this)
          tmpl = o[intent][0]
        }

        var d = jQuery.Deferred()
        d.intent = intent
        d.fn = fn

        this.load_template(tmpl, d)

        jQuery.when(d).done(function(ready){
          ready.fn(ready.intent, ready.response)
        })

      }
    }

    /* Helper functions */

    DripPro.prototype.fn_helper = function(context) {
      this.is_anon = context.is_anon
      this.has_tag = function(tag_name) {
        return context.drip_contact.tags.indexOf(tag_name) !== -1;
      }
    }

    DripPro.prototype.load_template = function(file, def) {
      jQuery.ajax({
        type: 'GET',
        dataType: 'html',
        url: this.settings.template_path + file + this.settings.template_ext,
        success: function(response) {
          def.resolve({
            intent: def.intent,
            response: response,
            fn: def.fn
          })
        }
      })
    }

    DripPro.prototype.debug = function(message, obj) {
      if (this.settings.debug) {
        obj ? console.log(message, obj) : console.log(message)
      }
    }

    return DripPro
  })()

}).call(this)

