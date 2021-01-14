import {createElement} from "../utils";

export const createUserStatusTemplate = (rank) => {
  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${rank}</p>
      <img class="profile__avatar" src="Profile" alt="Avatar" width="35" height="35">
    </section>`
  );
};

export default class UserRankView {
  constructor(rank) {
    this._rank = rank;

    this._element = null;
  }

  getTemplate() {
    return createUserStatusTemplate(this._rank);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
