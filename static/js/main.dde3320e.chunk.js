(this.webpackJsonpweather=this.webpackJsonpweather||[]).push([[0],{24:function(e,t,a){e.exports={wrapper:"detailView_wrapper__KyF-P",containerW:"detailView_containerW__25jiu",weatherList:"detailView_weatherList__1f-Ma"}},29:function(e,t,a){e.exports={containerW:"weather_containerW__3hAFQ",weatherList:"weather_weatherList__18b1V"}},46:function(e,t,a){e.exports=a(75)},51:function(e,t,a){},52:function(e,t,a){},75:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(14),i=a.n(c),o=(a(51),a(16)),l=a(17),s=a(22),m=a(19),u=a(23),d=(a(52),a(12)),p=a(20),f=a.n(p),h="a2df596b1f176ee0d6618cf361f63153",v=function(e,t){return function(a){var n="https://api.openweathermap.org/data/2.5/weather?appid=".concat(h,"&"),r="";"byGeolocation"===t?r="lat=".concat(e.latitude,"&lon=").concat(e.longitude):"byCity"===t&&(r="q=".concat(e.city)),f()(n+r).then((function(e){return e.data})).then((function(e){a({type:"FETCH_WEATHER",payload:e})})).catch((function(e){console.log(e)}))}};var E=function(e){var t=e.loadWeather;return r.a.createElement("div",{className:"container"},r.a.createElement("form",{onSubmit:function(e){e.preventDefault();var a={city:e.target.elements.city.value};t(a,"byCity")}},r.a.createElement("input",{type:"text",placeholder:"City",name:"city"}),r.a.createElement("button",null,"+"),r.a.createElement("button",{type:"button",onClick:function(){!function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;if("geolocation"in navigator){navigator.geolocation.getCurrentPosition(e,t,{enableHighAccuracy:!0,maximumAge:3e4,timeout:27e3})}else t&&t("Permission denied")}((function(e){t(e.coords,"byGeolocation")}))}},"Geo")))};function y(e){return Math.floor(e-273.15)}var w=a(8),b=a.n(w),N=a(21),_=function(e){var t=e.info,a=e.isDetail,n=new Date(t.dt_txt).toLocaleString("ru-RU");return a?r.a.createElement("div",{className:b.a.cardContainer},r.a.createElement("div",{className:b.a.upper},r.a.createElement("div",{className:b.a.upperLeft},r.a.createElement("div",{className:"city"},t.name),r.a.createElement("div",{className:"cityCountry"},t.name,", ",t.sys.country)),r.a.createElement("div",{className:b.a.upperRight},r.a.createElement("div",{className:"weatherIcon"}),r.a.createElement("div",{className:"temperature"},y(t.main.temp),"\xb0"))),r.a.createElement("div",{className:b.a.lower},r.a.createElement("div",{className:"left"},t.main.humidity,"%"),r.a.createElement("div",{className:"right"},t.dt_txt?n:null))):r.a.createElement(N.b,{to:"/location/".concat(t.id)},r.a.createElement("div",{className:b.a.cardContainer},r.a.createElement("div",{className:b.a.upper},r.a.createElement("div",{className:b.a.upperLeft},r.a.createElement("div",{className:"city"},t.name),r.a.createElement("div",{className:"cityCountry"},t.name,", ",t.sys.country)),r.a.createElement("div",{className:b.a.upperRight},r.a.createElement("div",{className:"weatherIcon"}),r.a.createElement("div",{className:"temperature"},y(t.main.temp),"\xb0"))),r.a.createElement("div",{className:b.a.lower},r.a.createElement("div",{className:"left"},t.main.humidity,"%"),r.a.createElement("div",{className:"right"},t.dt_txt?n:null))))},g=a(29),C=a.n(g),j=function(e){var t=e.weatherInfo;if(t.length){var a=t.map((function(e,t){return r.a.createElement(_,{key:t,info:e})}));return r.a.createElement("div",{className:C.a.containerW},r.a.createElement("div",{className:C.a.weatherList},a))}return null},O=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(s.a)(this,Object(m.a)(t).call(this,e))).loadFavs(),a}return Object(u.a)(t,e),Object(l.a)(t,[{key:"loadFavs",value:function(){var e=this;["Novinki","Comrat","Sofia"].forEach((function(t){e.props.loadWeather({city:t},"byCity")}))}},{key:"render",value:function(){return r.a.createElement("div",{className:"container"},r.a.createElement(E,{loadWeather:this.props.loadWeather}),r.a.createElement(j,{weatherInfo:this.props.weatherInfo.weatherinfo}))}}]),t}(r.a.Component),W=Object(d.b)((function(e){return{weatherInfo:e.WeatherInfo}}),(function(e){return{loadWeather:function(t,a){return e(v(t,a))}}}))(O),L=a(43),k=a(24),I=a.n(k),x=function(e){var t=Object(n.useState)(null),a=Object(L.a)(t,2),c=a[0],i=a[1],o=e.match.params.id;if(Object(n.useEffect)((function(){f()("https://api.openweathermap.org/data/2.5/forecast?id=".concat(o,"&appid=").concat(h)).then((function(e){i(e.data)}))}),[o]),null===c)return null;var l=c.list.slice(0,5).map((function(e,t){return e.name=c.city.name,e.sys.country=c.city.country,r.a.createElement(_,{key:t,info:e,isDetail:!0})}));return r.a.createElement("div",{className:I.a.wrapper},r.a.createElement("div",{className:"detailsContainer"},r.a.createElement("div",{className:"city"},c.city.name,", ",c.city.country),r.a.createElement("div",{className:"temp"},y(c.list[0].main.temp),"\xb0")),r.a.createElement("div",{className:I.a.containerW},r.a.createElement("div",{className:I.a.weatherList},l)))},A=a(10),F=function(e){function t(){return Object(o.a)(this,t),Object(s.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return console.log(),r.a.createElement("div",{className:"App"},r.a.createElement(N.a,{basename:"/2019-2-Atom-Frontend-V-Carpa"},r.a.createElement(A.a,{exact:!0,path:"/",component:W}),r.a.createElement(A.a,{path:"/location/:id",component:x})))}}]),t}(r.a.Component),R=Object(d.b)((function(e){return{weatherInfo:e.WeatherInfo}}),(function(e){return{loadWeather:function(t,a){return e(v(t,a))}}}))(F);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var H=a(42),V=a(11),D=a(44),G=a(45),P=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{weatherinfo:[]},t=arguments.length>1?arguments[1]:void 0;if("FETCH_WEATHER"===t.type){var a=!1;e.weatherinfo.forEach((function(e){e&&e.id===t.payload.id&&(a=!0)})),a||(e=Object(G.a)({},e,{weatherinfo:[].concat(Object(D.a)(e.weatherinfo),[t.payload])}))}return e},S=Object(V.c)({WeatherInfo:P}),T=Object(V.a)(H.a),B=Object(V.d)(S,T);i.a.render(r.a.createElement(d.a,{store:B},r.a.createElement(R,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},8:function(e,t,a){e.exports={cardContainer:"weatherCard_cardContainer__3gGeO",upper:"weatherCard_upper__jmty2",upperLeft:"weatherCard_upperLeft__1YonX",upperRight:"weatherCard_upperRight__2PLff"}}},[[46,1,2]]]);
//# sourceMappingURL=main.dde3320e.chunk.js.map