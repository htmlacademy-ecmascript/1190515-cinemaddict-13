import AbstractComponent from "./abstract-component";

export const createStatisticsTemplate = (count) => {
  return (
    `<p>${count} movies inside</p>`
  );
};

export default class FooterStatistics extends AbstractComponent {
  constructor(count) {
    super();
    this._count = count;
  }

  getTemplate() {
    return createStatisticsTemplate(this._count);
  }
}
