export const createListTemplate = ({
  className = `films-list`,
  title = ``,
  isTitleHidden,
}) => {
  const titleHiddenClassName = isTitleHidden ? `visually-hidden` : ``;
  return (
    `<section class="${className}">
      <h2 class="films-list__title ${titleHiddenClassName}">${title}</h2>
      <div class="films-list__container"></div>
    </section>`
  );
};
