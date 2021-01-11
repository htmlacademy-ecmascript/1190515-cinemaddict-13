/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/dayjs/dayjs.min.js":
/*!*****************************************!*\
  !*** ./node_modules/dayjs/dayjs.min.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

!function(t,e){ true?module.exports=e():undefined}(this,function(){"use strict";var t="millisecond",e="second",n="minute",r="hour",i="day",s="week",u="month",a="quarter",o="year",f="date",h=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[^0-9]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?.?(\d+)?$/,c=/\[([^\]]+)]|Y{2,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,d={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_")},$=function(t,e,n){var r=String(t);return!r||r.length>=e?t:""+Array(e+1-r.length).join(n)+t},l={s:$,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),r=Math.floor(n/60),i=n%60;return(e<=0?"+":"-")+$(r,2,"0")+":"+$(i,2,"0")},m:function t(e,n){if(e.date()<n.date())return-t(n,e);var r=12*(n.year()-e.year())+(n.month()-e.month()),i=e.clone().add(r,u),s=n-i<0,a=e.clone().add(r+(s?-1:1),u);return+(-(r+(n-i)/(s?i-a:a-i))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(h){return{M:u,y:o,w:s,d:i,D:f,h:r,m:n,s:e,ms:t,Q:a}[h]||String(h||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},y="en",M={};M[y]=d;var m=function(t){return t instanceof S},D=function(t,e,n){var r;if(!t)return y;if("string"==typeof t)M[t]&&(r=t),e&&(M[t]=e,r=t);else{var i=t.name;M[i]=t,r=i}return!n&&r&&(y=r),r||!n&&y},v=function(t,e){if(m(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new S(n)},g=l;g.l=D,g.i=m,g.w=function(t,e){return v(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var S=function(){function d(t){this.$L=D(t.locale,null,!0),this.parse(t)}var $=d.prototype;return $.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(g.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var r=e.match(h);if(r){var i=r[2]-1||0,s=(r[7]||"0").substring(0,3);return n?new Date(Date.UTC(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)):new Date(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)}}return new Date(e)}(t),this.$x=t.x||{},this.init()},$.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},$.$utils=function(){return g},$.isValid=function(){return!("Invalid Date"===this.$d.toString())},$.isSame=function(t,e){var n=v(t);return this.startOf(e)<=n&&n<=this.endOf(e)},$.isAfter=function(t,e){return v(t)<this.startOf(e)},$.isBefore=function(t,e){return this.endOf(e)<v(t)},$.$g=function(t,e,n){return g.u(t)?this[e]:this.set(n,t)},$.unix=function(){return Math.floor(this.valueOf()/1e3)},$.valueOf=function(){return this.$d.getTime()},$.startOf=function(t,a){var h=this,c=!!g.u(a)||a,d=g.p(t),$=function(t,e){var n=g.w(h.$u?Date.UTC(h.$y,e,t):new Date(h.$y,e,t),h);return c?n:n.endOf(i)},l=function(t,e){return g.w(h.toDate()[t].apply(h.toDate("s"),(c?[0,0,0,0]:[23,59,59,999]).slice(e)),h)},y=this.$W,M=this.$M,m=this.$D,D="set"+(this.$u?"UTC":"");switch(d){case o:return c?$(1,0):$(31,11);case u:return c?$(1,M):$(0,M+1);case s:var v=this.$locale().weekStart||0,S=(y<v?y+7:y)-v;return $(c?m-S:m+(6-S),M);case i:case f:return l(D+"Hours",0);case r:return l(D+"Minutes",1);case n:return l(D+"Seconds",2);case e:return l(D+"Milliseconds",3);default:return this.clone()}},$.endOf=function(t){return this.startOf(t,!1)},$.$set=function(s,a){var h,c=g.p(s),d="set"+(this.$u?"UTC":""),$=(h={},h[i]=d+"Date",h[f]=d+"Date",h[u]=d+"Month",h[o]=d+"FullYear",h[r]=d+"Hours",h[n]=d+"Minutes",h[e]=d+"Seconds",h[t]=d+"Milliseconds",h)[c],l=c===i?this.$D+(a-this.$W):a;if(c===u||c===o){var y=this.clone().set(f,1);y.$d[$](l),y.init(),this.$d=y.set(f,Math.min(this.$D,y.daysInMonth())).$d}else $&&this.$d[$](l);return this.init(),this},$.set=function(t,e){return this.clone().$set(t,e)},$.get=function(t){return this[g.p(t)]()},$.add=function(t,a){var f,h=this;t=Number(t);var c=g.p(a),d=function(e){var n=v(h);return g.w(n.date(n.date()+Math.round(e*t)),h)};if(c===u)return this.set(u,this.$M+t);if(c===o)return this.set(o,this.$y+t);if(c===i)return d(1);if(c===s)return d(7);var $=(f={},f[n]=6e4,f[r]=36e5,f[e]=1e3,f)[c]||1,l=this.$d.getTime()+t*$;return g.w(l,this)},$.subtract=function(t,e){return this.add(-1*t,e)},$.format=function(t){var e=this;if(!this.isValid())return"Invalid Date";var n=t||"YYYY-MM-DDTHH:mm:ssZ",r=g.z(this),i=this.$locale(),s=this.$H,u=this.$m,a=this.$M,o=i.weekdays,f=i.months,h=function(t,r,i,s){return t&&(t[r]||t(e,n))||i[r].substr(0,s)},d=function(t){return g.s(s%12||12,t,"0")},$=i.meridiem||function(t,e,n){var r=t<12?"AM":"PM";return n?r.toLowerCase():r},l={YY:String(this.$y).slice(-2),YYYY:this.$y,M:a+1,MM:g.s(a+1,2,"0"),MMM:h(i.monthsShort,a,f,3),MMMM:h(f,a),D:this.$D,DD:g.s(this.$D,2,"0"),d:String(this.$W),dd:h(i.weekdaysMin,this.$W,o,2),ddd:h(i.weekdaysShort,this.$W,o,3),dddd:o[this.$W],H:String(s),HH:g.s(s,2,"0"),h:d(1),hh:d(2),a:$(s,u,!0),A:$(s,u,!1),m:String(u),mm:g.s(u,2,"0"),s:String(this.$s),ss:g.s(this.$s,2,"0"),SSS:g.s(this.$ms,3,"0"),Z:r};return n.replace(c,function(t,e){return e||l[t]||r.replace(":","")})},$.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},$.diff=function(t,f,h){var c,d=g.p(f),$=v(t),l=6e4*($.utcOffset()-this.utcOffset()),y=this-$,M=g.m(this,$);return M=(c={},c[o]=M/12,c[u]=M,c[a]=M/3,c[s]=(y-l)/6048e5,c[i]=(y-l)/864e5,c[r]=y/36e5,c[n]=y/6e4,c[e]=y/1e3,c)[d]||y,h?M:g.a(M)},$.daysInMonth=function(){return this.endOf(u).$D},$.$locale=function(){return M[this.$L]},$.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),r=D(t,e,!0);return r&&(n.$L=r),n},$.clone=function(){return g.w(this.$d,this)},$.toDate=function(){return new Date(this.valueOf())},$.toJSON=function(){return this.isValid()?this.toISOString():null},$.toISOString=function(){return this.$d.toISOString()},$.toString=function(){return this.$d.toUTCString()},d}(),p=S.prototype;return v.prototype=p,[["$ms",t],["$s",e],["$m",n],["$H",r],["$W",i],["$M",u],["$y",o],["$D",f]].forEach(function(t){p[t[1]]=function(e){return this.$g(e,t[0],t[1])}}),v.extend=function(t,e){return t(e,S,v),v},v.locale=D,v.isDayjs=m,v.unix=function(t){return v(1e3*t)},v.en=M[y],v.Ls=M,v.p={},v});


/***/ }),

/***/ "./src/const.js":
/*!**********************!*\
  !*** ./src/const.js ***!
  \**********************/
/*! exports provided: LOREM_TEXT_PLACEHOLDER, DESCRIPTION_MAX_LENGTH, MAX_RATING_IN_PERCENTS, userRankStrings, EXTRA_LIST_TOP_RATED_KEY, EXTRA_LIST_MOST_COMMENTED_KEY, extraListsTitles, filterTypeKeys, filterTypes, filmsMockData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LOREM_TEXT_PLACEHOLDER", function() { return LOREM_TEXT_PLACEHOLDER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DESCRIPTION_MAX_LENGTH", function() { return DESCRIPTION_MAX_LENGTH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MAX_RATING_IN_PERCENTS", function() { return MAX_RATING_IN_PERCENTS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "userRankStrings", function() { return userRankStrings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EXTRA_LIST_TOP_RATED_KEY", function() { return EXTRA_LIST_TOP_RATED_KEY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EXTRA_LIST_MOST_COMMENTED_KEY", function() { return EXTRA_LIST_MOST_COMMENTED_KEY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "extraListsTitles", function() { return extraListsTitles; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "filterTypeKeys", function() { return filterTypeKeys; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "filterTypes", function() { return filterTypes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "filmsMockData", function() { return filmsMockData; });
const LOREM_TEXT_PLACEHOLDER = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;

const DESCRIPTION_MAX_LENGTH = 5;
const MAX_RATING_IN_PERCENTS = 100;

const userRankStrings = {
  NOVICE: `Novice`,
  FAN: `Fan`,
  MOVIE_BUFF: `Movie Buff`,
};

const EXTRA_LIST_TOP_RATED_KEY = `topRated`;
const EXTRA_LIST_MOST_COMMENTED_KEY = `mostCommented`;

const extraListsTitles = {
  [EXTRA_LIST_TOP_RATED_KEY]: `Top rated`,
  [EXTRA_LIST_MOST_COMMENTED_KEY]: `Most commented`,
};

const filterTypeKeys = {
  ALL: `all`,
  WATCHLIST: `watchlist`,
  HISTORY: `history`,
  FAVORITES: `favorites`,
};

const filterTypes = {
  [filterTypeKeys.ALL]: {
    link: `#all`,
    signature: `All Items`,
  },
  [filterTypeKeys.WATCHLIST]: {
    link: `#watchilst`,
    signature: `Watchlist`,
  },
  [filterTypeKeys.HISTORY]: {
    link: `#watchilst`,
    signature: `History`,
  },
  [filterTypeKeys.FAVORITES]: {
    link: `#watchilst`,
    signature: `Favorites`,
  },
};

const filmsMockData = {
  titles: [
    `Made for each other`,
    `Popeye meets sinbad`,
    `Sagebrush trail`,
    `Santa claus conquers the martians`,
    `The dance of life`,
    `The great flamarion`,
    `The man with the golden arm`,
  ],

  posters: [
    `./images/posters/made-for-each-other.png`,
    `./images/posters/popeye-meets-sinbad.png`,
    `./images/posters/sagebrush-trail.jpg`,
    `./images/posters/santa-claus-conquers-the-martians.jpg`,
    `./images/posters/the-dance-of-life.jpg`,
    `./images/posters/the-great-flamarion.jpg`,
    `./images/posters/the-man-with-the-golden-arm.jpg`,
  ],

  genres: [
    `Musical`,
    `Western`,
    `Drama`,
    `Comedy`,
    `Cartoon`,
    `Mystery`,
  ],

  names: [
    `Anthony Mannet`,
    `Anne Wigton`,
    `Heinz Herald`,
    `Richard Weil`,
    `Erich von Stroheim`,
    `Mary Beth Hughes`,
    `Dan Duryea`,
  ],

  countries: [
    `USA`,
    `Russia`,
    `Germany`,
    `France`,
  ],
};



/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/utils.js");
/* harmony import */ var _const__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./const */ "./src/const.js");
/* harmony import */ var _view_user_status__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./view/user-status */ "./src/view/user-status.js");
/* harmony import */ var _view_navigation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./view/navigation */ "./src/view/navigation.js");
/* harmony import */ var _view_board__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./view/board */ "./src/view/board.js");
/* harmony import */ var _view_films_list__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./view/films-list */ "./src/view/films-list.js");
/* harmony import */ var _view_sort__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./view/sort */ "./src/view/sort.js");
/* harmony import */ var _view_card_film__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./view/card-film */ "./src/view/card-film.js");
/* harmony import */ var _view_load_more_button__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./view/load-more-button */ "./src/view/load-more-button.js");
/* harmony import */ var _view_statistics__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./view/statistics */ "./src/view/statistics.js");
/* harmony import */ var _view_detail_film__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./view/detail-film */ "./src/view/detail-film.js");
/* harmony import */ var _mock_card_film__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./mock/card-film */ "./src/mock/card-film.js");
/* harmony import */ var _mock_filter__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./mock/filter */ "./src/mock/filter.js");
/* harmony import */ var _mock_user_rank__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./mock/user-rank */ "./src/mock/user-rank.js");
/* harmony import */ var _mock_extra_list__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./mock/extra-list */ "./src/mock/extra-list.js");
















const CARD_COUNT = 17;
const CARDS_COUNT_PER_STEP = 5;

const films = new Array(CARD_COUNT).fill().map(_mock_card_film__WEBPACK_IMPORTED_MODULE_11__["generateFilm"]);
const filters = Object(_mock_filter__WEBPACK_IMPORTED_MODULE_12__["generateFilters"])(films);
const extraListsData = Object(_mock_extra_list__WEBPACK_IMPORTED_MODULE_14__["generateExtraLists"])(films);
const userRankLabel = Object(_mock_user_rank__WEBPACK_IMPORTED_MODULE_13__["generateUserRank"])(films);


const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const footerElement = document.querySelector(`.footer`);


Object(_utils__WEBPACK_IMPORTED_MODULE_0__["render"])(headerElement, Object(_view_user_status__WEBPACK_IMPORTED_MODULE_2__["createUserStatusTemplate"])(userRankLabel), `beforeend`);
Object(_utils__WEBPACK_IMPORTED_MODULE_0__["render"])(mainElement, Object(_view_navigation__WEBPACK_IMPORTED_MODULE_3__["createNavigationTemplate"])(filters), `beforeend`);
Object(_utils__WEBPACK_IMPORTED_MODULE_0__["render"])(mainElement, Object(_view_sort__WEBPACK_IMPORTED_MODULE_6__["createSortTemplate"])(), `beforeend`);
Object(_utils__WEBPACK_IMPORTED_MODULE_0__["render"])(mainElement, Object(_view_board__WEBPACK_IMPORTED_MODULE_4__["createBoardTemplate"])(), `beforeend`);

const boardElement = mainElement.querySelector(`.films`);
Object(_utils__WEBPACK_IMPORTED_MODULE_0__["render"])(boardElement, Object(_view_films_list__WEBPACK_IMPORTED_MODULE_5__["createListTemplate"])({
  title: `All movies. Upcoming`,
  isTitleHidden: true,
}), `beforeend`);
const mainList = boardElement.querySelector(`.films-list`);
const mainListContainer = mainList.querySelector(`.films-list__container`);

for (let i = 0; i < Math.min(films.length, CARDS_COUNT_PER_STEP); i++) {
  Object(_utils__WEBPACK_IMPORTED_MODULE_0__["render"])(mainListContainer, Object(_view_card_film__WEBPACK_IMPORTED_MODULE_7__["createFilmTemplate"])(films[i]), `beforeend`);
}

if (films.length > CARDS_COUNT_PER_STEP) {
  let renderedFilmsCount = CARDS_COUNT_PER_STEP;

  Object(_utils__WEBPACK_IMPORTED_MODULE_0__["render"])(mainList, Object(_view_load_more_button__WEBPACK_IMPORTED_MODULE_8__["showMoreButtonTemplate"])(), `beforeend`);

  const showMoreButton = boardElement.querySelector(`.films-list__show-more`);

  showMoreButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    films
      .slice(renderedFilmsCount, renderedFilmsCount + CARDS_COUNT_PER_STEP)
      .forEach((film) => Object(_utils__WEBPACK_IMPORTED_MODULE_0__["render"])(mainListContainer, Object(_view_card_film__WEBPACK_IMPORTED_MODULE_7__["createFilmTemplate"])(film), `beforeend`));

    renderedFilmsCount += CARDS_COUNT_PER_STEP;

    if (renderedFilmsCount >= films.length) {
      showMoreButton.remove();
    }
  });
}

extraListsData.forEach(({key}) => {
  Object(_utils__WEBPACK_IMPORTED_MODULE_0__["render"])(boardElement, Object(_view_films_list__WEBPACK_IMPORTED_MODULE_5__["createListTemplate"])({
    className: `films-list--extra`,
    title: _const__WEBPACK_IMPORTED_MODULE_1__["extraListsTitles"][key]
  }), `beforeend`);
});

const extraLists = boardElement.querySelectorAll(`.films-list--extra`);

extraLists.forEach((list, i) => {
  const listContainer = list.querySelector(`.films-list__container`);
  const extraFilms = extraListsData[i].films;

  extraFilms.forEach((extraFilm) => Object(_utils__WEBPACK_IMPORTED_MODULE_0__["render"])(listContainer, Object(_view_card_film__WEBPACK_IMPORTED_MODULE_7__["createFilmTemplate"])(extraFilm), `beforeend`));
});

const statisticsContainer = document.querySelector(`.footer__statistics`);
Object(_utils__WEBPACK_IMPORTED_MODULE_0__["render"])(statisticsContainer, Object(_view_statistics__WEBPACK_IMPORTED_MODULE_9__["createStatisticsTemplate"])(films.length), `beforeend`);

Object(_utils__WEBPACK_IMPORTED_MODULE_0__["render"])(footerElement, Object(_view_detail_film__WEBPACK_IMPORTED_MODULE_10__["createFilmDetailsTemplate"])(films[0]), `afterend`);



/***/ }),

/***/ "./src/mock/card-film.js":
/*!*******************************!*\
  !*** ./src/mock/card-film.js ***!
  \*******************************/
/*! exports provided: generateFilm */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateFilm", function() { return generateFilm; });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ "./src/utils.js");
/* harmony import */ var _const__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../const */ "./src/const.js");
/* harmony import */ var _comments__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./comments */ "./src/mock/comments.js");
/* harmony import */ var _detail_card_film__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./detail-card-film */ "./src/mock/detail-card-film.js");







const generateDescription = () => {
  const loremSentences = _const__WEBPACK_IMPORTED_MODULE_1__["LOREM_TEXT_PLACEHOLDER"].split(`. `);

  return Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getSeveralRandomArrayItems"])(loremSentences, _const__WEBPACK_IMPORTED_MODULE_1__["DESCRIPTION_MAX_LENGTH"]).join(`. `);
};

const generateRating = () => {
  return Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getRandomInteger"])(0, _const__WEBPACK_IMPORTED_MODULE_1__["MAX_RATING_IN_PERCENTS"]) / 10;
};

const generateDuration = () => {
  const duration = {
    h: Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getRandomInteger"])(0, 30),
    m: Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getRandomInteger"])(0, 60),
  };

  return Object.entries(duration)
    .map(([key, value]) => value ? `${value}${key}` : ``)
    .filter(Boolean)
    .join(` `);
};

const generateFilm = () => {
  return {
    title: Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getRandomArrayItem"])(_const__WEBPACK_IMPORTED_MODULE_1__["filmsMockData"].titles),
    poster: Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getRandomArrayItem"])(_const__WEBPACK_IMPORTED_MODULE_1__["filmsMockData"].posters),
    description: generateDescription(),
    rating: generateRating(),
    dueDate: Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getRandomDate"])(),
    duration: generateDuration(),
    genre: Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getRandomArrayItem"])(_const__WEBPACK_IMPORTED_MODULE_1__["filmsMockData"].genres),
    filmDetails: Object(_detail_card_film__WEBPACK_IMPORTED_MODULE_3__["generateFilmDetails"])(),
    comments: Object(_comments__WEBPACK_IMPORTED_MODULE_2__["generateComments"])(Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getRandomInteger"])(0, 5)),
    isInWatchlist: Boolean(Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getRandomInteger"])(0, 1)),
    isWatched: Boolean(Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getRandomInteger"])(0, 1)),
    isFavorite: Boolean(Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getRandomInteger"])(0, 1)),
  };
};


/***/ }),

/***/ "./src/mock/comments.js":
/*!******************************!*\
  !*** ./src/mock/comments.js ***!
  \******************************/
/*! exports provided: generateComments */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateComments", function() { return generateComments; });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ "./src/utils.js");


const authors = [
  `Tim`,
  `John`,
  `Frank`
];

const comments = [
  `Booo`,
  `Wow!`,
  `Greate!`
];

const emotion = [
  `./images/emoji/smile.png`,
  `./images/emoji/puke.png`,
  `./images/emoji/angry.png`,
  `./images/emoji/sleeping.png`
];

const generateComment = () => {
  return {
    emotion: Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getRandomArrayItem"])(emotion),
    author: Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getRandomArrayItem"])(authors),
    text: Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getRandomArrayItem"])(comments),
    commentDate: Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getRandomDate"])(),
  };
};

const generateComments = (length) => {
  return new Array(length).fill().map(generateComment);
};


/***/ }),

/***/ "./src/mock/detail-card-film.js":
/*!**************************************!*\
  !*** ./src/mock/detail-card-film.js ***!
  \**************************************/
/*! exports provided: generateFilmDetails */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateFilmDetails", function() { return generateFilmDetails; });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ "./src/utils.js");
/* harmony import */ var _const__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../const */ "./src/const.js");



const generateFilmDetails = () => {
  return {
    originalTitle: Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getRandomArrayItem"])(_const__WEBPACK_IMPORTED_MODULE_1__["filmsMockData"].titles),
    director: Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getRandomArrayItem"])(_const__WEBPACK_IMPORTED_MODULE_1__["filmsMockData"].names),
    writers: Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getSeveralRandomArrayItems"])(_const__WEBPACK_IMPORTED_MODULE_1__["filmsMockData"].names, 3),
    actors: Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getSeveralRandomArrayItems"])(_const__WEBPACK_IMPORTED_MODULE_1__["filmsMockData"].names, 3),
    country: Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getRandomArrayItem"])(_const__WEBPACK_IMPORTED_MODULE_1__["filmsMockData"].countries),
    rating: Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getRandomInteger"])(0, 18) + `+`,
    genres: Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getSeveralRandomArrayItems"])(_const__WEBPACK_IMPORTED_MODULE_1__["filmsMockData"].genres, 3),
  };
};


/***/ }),

/***/ "./src/mock/extra-list.js":
/*!********************************!*\
  !*** ./src/mock/extra-list.js ***!
  \********************************/
/*! exports provided: generateExtraLists */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateExtraLists", function() { return generateExtraLists; });
/* harmony import */ var _const__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../const */ "./src/const.js");


const getTopRatedFilms = (films) => {
  return [...films].sort((a, b) => b.rating - a.rating).slice(0, 2);
};

const getMostCommentedFilms = (films) => {
  return [...films].sort((a, b) => b.comments.length - a.comments.length).slice(0, 2);
};

const extraFilmsLists = [
  {
    key: _const__WEBPACK_IMPORTED_MODULE_0__["EXTRA_LIST_TOP_RATED_KEY"],
    getFilms: getTopRatedFilms,
  },
  {
    key: _const__WEBPACK_IMPORTED_MODULE_0__["EXTRA_LIST_MOST_COMMENTED_KEY"],
    getFilms: getMostCommentedFilms,
  }
];

const generateExtraList = (films, extraData) => {
  return {
    key: extraData.key,
    films: extraData.getFilms(films),
  };
};

const generateExtraLists = (films) => {
  return extraFilmsLists.map((extraData) => generateExtraList(films, extraData));
};


/***/ }),

/***/ "./src/mock/filter.js":
/*!****************************!*\
  !*** ./src/mock/filter.js ***!
  \****************************/
/*! exports provided: generateFilters */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateFilters", function() { return generateFilters; });
/* harmony import */ var _const__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../const */ "./src/const.js");


const filmToFilterMap = {
  [_const__WEBPACK_IMPORTED_MODULE_0__["filterTypeKeys"].ALL]: (films) => films.length,
  [_const__WEBPACK_IMPORTED_MODULE_0__["filterTypeKeys"].WATCHLIST]: (films) => films.filter((film) => film.isInWatchlist).length,
  [_const__WEBPACK_IMPORTED_MODULE_0__["filterTypeKeys"].HISTORY]: (films) => films.filter((film) => film.isWatched).length,
  [_const__WEBPACK_IMPORTED_MODULE_0__["filterTypeKeys"].FAVORITES]: (films) => films.filter((film) => film.isFavorite).length,
};

const generateFilters = (films) => {
  return Object.entries(filmToFilterMap).map(([filterTypeKey, getCount]) => {
    return {
      signature: _const__WEBPACK_IMPORTED_MODULE_0__["filterTypes"][filterTypeKey].signature,
      link: _const__WEBPACK_IMPORTED_MODULE_0__["filterTypes"][filterTypeKey].link,
      count: getCount(films),
    };
  });
};


/***/ }),

/***/ "./src/mock/user-rank.js":
/*!*******************************!*\
  !*** ./src/mock/user-rank.js ***!
  \*******************************/
/*! exports provided: generateUserRank */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateUserRank", function() { return generateUserRank; });
/* harmony import */ var _const__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../const */ "./src/const.js");


const getUserRank = (count) => {
  if (count > 0 && count <= 10) {
    return _const__WEBPACK_IMPORTED_MODULE_0__["userRankStrings"].NOVICE;
  }
  if (count > 10 && count <= 20) {
    return _const__WEBPACK_IMPORTED_MODULE_0__["userRankStrings"].FAN;
  }
  if (count > 20) {
    return _const__WEBPACK_IMPORTED_MODULE_0__["userRankStrings"].MOVIE_BUFF;
  }
  return ``;
};

const generateUserRank = (films) => {
  const watchedFilmsCount = films.filter((film) => film.isWatched).length;

  return getUserRank(watchedFilmsCount);
};


/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! exports provided: render, getRandomInteger, getRandomDate, getRandomArrayItem, getSeveralRandomArrayItems, truncateString, humanizeDate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRandomInteger", function() { return getRandomInteger; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRandomDate", function() { return getRandomDate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRandomArrayItem", function() { return getRandomArrayItem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSeveralRandomArrayItems", function() { return getSeveralRandomArrayItems; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "truncateString", function() { return truncateString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "humanizeDate", function() { return humanizeDate; });
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dayjs */ "./node_modules/dayjs/dayjs.min.js");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_0__);


const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomDate = () => {
  const maxDaysGasp = 7;
  const daysGap = getRandomInteger(-maxDaysGasp, maxDaysGasp);

  return dayjs__WEBPACK_IMPORTED_MODULE_0___default()().add(daysGap, `day`).toDate;
};

const getRandomArrayItem = (dataArray) => {
  const randomIndex = getRandomInteger(0, dataArray.length - 1);

  return dataArray[randomIndex];
};

const getSeveralRandomArrayItems = (dataArray, maxItemsCount) => {
  const itemsCount = getRandomInteger(1, maxItemsCount);

  return [...dataArray].sort(() => 0.5 - Math.random()).slice(0, itemsCount);
};

const truncateString = (value, length) => {
  return value.length > length ? `${value.slice(0, length)}...` : value;
};

const humanizeDate = (dueDate) => {
  return dayjs__WEBPACK_IMPORTED_MODULE_0___default()(dueDate).format(`D/M/YYYY`).toDate;
};



/***/ }),

/***/ "./src/view/board.js":
/*!***************************!*\
  !*** ./src/view/board.js ***!
  \***************************/
/*! exports provided: createBoardTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createBoardTemplate", function() { return createBoardTemplate; });
const createBoardTemplate = () => {
  return (
    `<section class="films"></section>`
  );
};


/***/ }),

/***/ "./src/view/card-film.js":
/*!*******************************!*\
  !*** ./src/view/card-film.js ***!
  \*******************************/
/*! exports provided: createFilmTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createFilmTemplate", function() { return createFilmTemplate; });
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dayjs */ "./node_modules/dayjs/dayjs.min.js");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils */ "./src/utils.js");



const MAX_DESCRIPTION_LENGTH = 140;

const createFilmTemplate = ({
  title = ``,
  poster = ``,
  description = ``,
  rating = 0,
  dueDate = dayjs__WEBPACK_IMPORTED_MODULE_0___default()(),
  duration = ``,
  genre = ``,
  comments = [],
  isInWatchlist,
  isWatched,
  isFavorite,
}) => {
  const year = dayjs__WEBPACK_IMPORTED_MODULE_0___default()(dueDate).format(`YYYY`);
  const truncatedDescription = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["truncateString"])(description, MAX_DESCRIPTION_LENGTH);

  const controlActiveClassname = `film-card__controls-item--active`;

  const watchlistClassname = isInWatchlist ? controlActiveClassname : ``;
  const watchedClassname = isWatched ? controlActiveClassname : ``;
  const favoriteClassname = isFavorite ? controlActiveClassname : ``;

  return (
    `<article class="film-card">
          <h3 class="film-card__title">${title}</h3>
            <p class="film-card__rating">${rating}</p>
            <p class="film-card__info">
              <span class="film-card__year">${year}</span>
              <span class="film-card__duration">${duration}</span>
              <span class="film-card__genre">${genre}</span>
            </p>
          <img src="${poster}" alt="" class="film-card__poster">
          <p class="film-card__description">${truncatedDescription}</p>
          <a class="film-card__comments">${comments.length}</a>
          <div class="film-card__controls">
            <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${watchlistClassname}">Add to watchlist</button>
            <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${watchedClassname}">Mark as watched</button>
            <button class="film-card__controls-item button film-card__controls-item--favorite ${favoriteClassname}">Mark as favorite</button>
          </div>
        </article>`
  );
};


/***/ }),

/***/ "./src/view/detail-film.js":
/*!*********************************!*\
  !*** ./src/view/detail-film.js ***!
  \*********************************/
/*! exports provided: createFilmDetailsTemplate, createDetailsCommentTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createFilmDetailsTemplate", function() { return createFilmDetailsTemplate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createDetailsCommentTemplate", function() { return createDetailsCommentTemplate; });
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dayjs */ "./node_modules/dayjs/dayjs.min.js");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils */ "./src/utils.js");



const createFilmDetailsTemplate = ({
  title = ``,
  poster = ``,
  description = ``,
  rating = 0,
  dueDate = dayjs__WEBPACK_IMPORTED_MODULE_0___default()(),
  duration = ``,
  filmDetails: {
    originalTitle = ``,
    director = ``,
    writers = [],
    actors = [],
    country = ``,
    genres = [],
  },
  comments = [],
}) => {
  const genresLabel = genres.length > 1 ? `Genres` : `Genre`;

  return (
    `<form class="film-details__inner" action="" method="get">
        <div class="form-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="${poster}" alt="">
              <p class="film-details__age">${rating}+</p>
            </div>
            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${title}</h3>
                  <p class="film-details__title-original">Original: ${originalTitle}</p>
                </div>
                <div class="film-details__rating">
                  <p class="film-details__total-rating">${rating}</p>
                </div>
              </div>
              <table class="film-details__table">
                <tr class="film-details__row">
                  <td class="film-details__term">Director</td>
                  <td class="film-details__cell">${director}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Writers</td>
                  <td class="film-details__cell">${writers.join(`, `)}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Actors</td>
                  <td class="film-details__cell">${actors.join(`, `)}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Release Date</td>
                  <td class="film-details__cell">${Object(_utils__WEBPACK_IMPORTED_MODULE_1__["humanizeDate"])(dueDate)}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Runtime</td>
                  <td class="film-details__cell">${duration}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">${country}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">${genresLabel}</td>
                  <td class="film-details__cell">
                    ${genres.map((genre) => (`<span class="film-details__genre">${genre}</span>`)).join(``)}
                  </td>
                </tr>
              </table>
              <p class="film-details__film-description">${description}</p>
            </div>
          </div>
          <section class="film-details__controls">
            <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist">
            <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>
            <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched">
            <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>
            <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite">
            <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
          </section>
        </div>
        <div class="form-details__bottom-container">
          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">
              Comments <span class="film-details__comments-count">${comments.length}</span>
            </h3>
            <ul class="film-details__comments-list">
              ${comments.map((comment) => createDetailsCommentTemplate(comment)).join(``)}
            </ul>
            <div class="film-details__new-comment">
              <div for="add-emoji" class="film-details__add-emoji-label"></div>
              <label class="film-details__comment-label">
                <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
              </label>
              <div class="film-details__emoji-list">
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
                <label class="film-details__emoji-label" for="emoji-smile">
                  <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
                </label>
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
                <label class="film-details__emoji-label" for="emoji-sleeping">
                  <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
                </label>
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
                <label class="film-details__emoji-label" for="emoji-puke">
                  <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
                </label>
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
                <label class="film-details__emoji-label" for="emoji-angry">
                  <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
                </label>
              </div>
            </div>
          </section>
        </div>
      </form>`
  );
};

const createDetailsCommentTemplate = ({
  emotion,
  text,
  author,
  dueDate,
}) => {
  return (
    `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="${emotion}" width="55" height="55" alt="emoji-smile">
      </span>
      <div>
        <p class="film-details__comment-text">${text}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${author}</span>
          <span class="film-details__comment-day">${Object(_utils__WEBPACK_IMPORTED_MODULE_1__["humanizeDate"])(dueDate)}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`
  );
};




/***/ }),

/***/ "./src/view/films-list.js":
/*!********************************!*\
  !*** ./src/view/films-list.js ***!
  \********************************/
/*! exports provided: createListTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createListTemplate", function() { return createListTemplate; });
const createListTemplate = ({
  className = `films-list`,
  title = ``,
  isTitleHidden,
}) => {
  const titleHiddenClassName = isTitleHidden ? `visually-hidden` : ``;
  return (
    `<section class="${className}">
      <h2 class="films-list__title ${titleHiddenClassName}">${title}</h2>
      <div class="films-list__container"></div>
    </section>`
  );
};


/***/ }),

/***/ "./src/view/load-more-button.js":
/*!**************************************!*\
  !*** ./src/view/load-more-button.js ***!
  \**************************************/
/*! exports provided: showMoreButtonTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "showMoreButtonTemplate", function() { return showMoreButtonTemplate; });
const showMoreButtonTemplate = () => {
  return `<button class="films-list__show-more">Show more</button>`;
};


/***/ }),

/***/ "./src/view/navigation.js":
/*!********************************!*\
  !*** ./src/view/navigation.js ***!
  \********************************/
/*! exports provided: createNavigationTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createNavigationTemplate", function() { return createNavigationTemplate; });
const createNavigationTemplate = (filters, isActive) => {
  const activeClassname = isActive ? `main-navigation__item--active` : ``;
  return (
    `<nav class="main-navigation">
    <div class="main-navigation__items">
    ${filters.map(({signature, link, count}) => (`<a href="${link}" class="main-navigation__item ${activeClassname}">${signature} ${renderNavCount(count)}</a>`)).join(``)}
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};

const renderNavCount = (value) => {
  return value ? `<span class="main-navigation__item-count">${value}</span>` : ``;
};


/***/ }),

/***/ "./src/view/profile.js":
/*!*****************************!*\
  !*** ./src/view/profile.js ***!
  \*****************************/
/*! exports provided: generateProfile */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateProfile", function() { return generateProfile; });
const generateProfile = () => {
  return {
    avatar: `./images/bitmap@2x.png`,
  };
};


/***/ }),

/***/ "./src/view/sort.js":
/*!**************************!*\
  !*** ./src/view/sort.js ***!
  \**************************/
/*! exports provided: createSortTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createSortTemplate", function() { return createSortTemplate; });
const createSortTemplate = () => {
  return `<ul class="sort">
    <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
    <li><a href="#" class="sort__button">Sort by date</a></li>
    <li><a href="#" class="sort__button">Sort by rating</a></li>
  </ul>`;
};


/***/ }),

/***/ "./src/view/statistics.js":
/*!********************************!*\
  !*** ./src/view/statistics.js ***!
  \********************************/
/*! exports provided: createStatisticsTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createStatisticsTemplate", function() { return createStatisticsTemplate; });
const createStatisticsTemplate = (count) => {
  return (
    `<p>${count} movies inside</p>`
  );
};



/***/ }),

/***/ "./src/view/user-status.js":
/*!*********************************!*\
  !*** ./src/view/user-status.js ***!
  \*********************************/
/*! exports provided: createUserStatusTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createUserStatusTemplate", function() { return createUserStatusTemplate; });
/* harmony import */ var _profile__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./profile */ "./src/view/profile.js");


const createUserStatusTemplate = (rank) => {
  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${rank}</p>
      <img class="profile__avatar" src="${_profile__WEBPACK_IMPORTED_MODULE_0__["generateProfile"]}" alt="Avatar" width="35" height="35">
    </section>`
  );
};


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map