import AbstractView from "./abstract-view";

export default class FooterStatisticView extends AbstractView {
  constructor(filmsCount) {
    super();
    this._filmsCount = filmsCount;
  }

  getTemplate() {
    return `<p>${this._filmsCount} movies inside</p>`;
  }
}
