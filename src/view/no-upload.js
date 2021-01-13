// import {createElement} from "../utils";

export const createIndexNoDataTemplate = () => {
  return (
    `<section class="films">
    <section class="films-list">
      <h2 class="films-list__title">There are no movies in our database</h2>
    </section>
    </section>`
  );
};

// export default class IndexNoData {
//   getTemplate() {
//     return createIndexNoDataTemplate();
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
