import AbstractComponent from "./abstract-component";

export const createStatisticTemplate = (count) => {
  return (
    `${count} movies inside`
  );
};

export default class FooterStatisticView extends AbstractComponent {
  constructor(count) {
    super();
    this._count = count;
  }

  getTemplate() {
    return createStatisticTemplate(this._count);
  }
}
