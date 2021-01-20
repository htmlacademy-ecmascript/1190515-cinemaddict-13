import AbstractComponent from "./abstract-component";

export const createStatisticsTemplate = (count) => {
  return (
    `${count} movies inside`
  );
};

export default class FooterStatisticsView extends AbstractComponent {
  constructor(count) {
    super();
    this._count = count;
  }

  getTemplate() {
    return createStatisticsTemplate(this._count);
  }
}
