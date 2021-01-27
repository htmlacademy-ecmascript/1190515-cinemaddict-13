import AbstractComponent from "./abstract-component";

export default class ProfileRatingView extends AbstractComponent {
  constructor(rating) {
    super();

    this._rating = rating;
  }

  getTemplate() {
    return (
      `<section class="header__profile profile">
        <p class="profile__rating">${this._rating}</p>
        <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      </section>`
    );
  }
}
