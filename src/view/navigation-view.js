import AbstractView from "./abstract-view";
import {NavigationItem} from "../const";

export const NAVIGATION_ITEM_ACTIVE = `main-navigation__item--active`;

export default class NavigationView extends AbstractView {
  getTemplate() {
    return `<nav class="main-navigation">
        <a href="#stats" data-id="${NavigationItem.STATS}" class="main-navigation__additional">Stats</a>
      </nav>`;
  }

  setOnChangeHandler(callback) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();
      if (evt.target.tagName !== `A` && evt.target.tagName !== `SPAN`) {
        return;
      }

      if (evt.target.dataset.id === NavigationItem.STATS) {
        document.querySelectorAll(`.main-navigation__item`).forEach((item) => {
          item.classList.remove(NAVIGATION_ITEM_ACTIVE);
        });
      }

      callback(evt.target.dataset.id);
      evt.target.classList.add(NAVIGATION_ITEM_ACTIVE);
    });
  }
}
