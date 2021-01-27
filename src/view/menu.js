import AbstractComponent from './abstract-component.js';

export default class SiteNavigationView extends AbstractComponent {
  getTemplate() {
    return `<nav class="main-navigation">
              <a href="#stats" class="main-navigation__additional">Stats</a>
            </nav>`;
  }

  setClickHandler(callback) {
    this.getElement().addEventListener(`click`, (evt) => {
      if (evt.target.tagName !== `A`) {
        return;
      }

      callback(evt.target.getAttribute(`href`) === `#stats`);
    });
  }
}
