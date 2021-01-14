// import {createElement} from "../utils";

// const MovieTitle = {
//   hidden: `All movies. Upcoming`,
//   show: `There are no movies in our database`
// };

// export const createListTemplate = (hasMovies) => {
//   return `<section class="films-list">
//       <h2 class="films-list__title ${hasMovies ? `visually-hidden` : ``}">
//       ${hasMovies ? MovieTitle.hidden : MovieTitle.show}</h2>
//       <div class="films-list__container"></div>
//     </section>`;
// };

// export default class FilmsListView {
//   constructor(listData) {
//     this._listData = listData;

//     this._element = null;
//   }

//   getTemplate() {
//     return createListTemplate(this._listData);
//   }

//   getElement() {
//     if (!this._element) {
//       this._element = createElement(this.getTemplate());
//     }

//     return this._element;
//   }

//   removeElement() {
//     this._element = null;
//   }
// }
