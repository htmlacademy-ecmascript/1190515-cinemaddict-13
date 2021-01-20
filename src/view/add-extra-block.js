import AbstractComponent from "./abstract-component";

const createBlockExtraTemplate = () => {
  return `<section class="films-list--extra">
            <h2 class="films-list__title"></h2>
            <div class="films-list__container">
            </div>
          </section>`;
};

export default class AddExtraBlockView extends AbstractComponent {
  getTemplate() {
    return createBlockExtraTemplate();
  }
}
