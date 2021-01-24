import AbstractComponent from "./abstract-component";

export const createContentTemplate = () => {
  return `<section class="films">
            <section class="films-list">
              <div class="films-list__container">
              </div>
            </section>
          </section>`;
};

export default class ContentView extends AbstractComponent {
  getTemplate() {
    return createContentTemplate();
  }
}
