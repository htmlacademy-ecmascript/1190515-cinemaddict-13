import AbstractComponent from "../view/abstract-component";
export const POSITION = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
  AFTEREND: `afterend`,
};

export const render = (container, child, place) => {
  if (container instanceof AbstractComponent) {
    container = container.getElement();
  }

  if (child instanceof AbstractComponent) {
    child = child.getElement();
  }
  switch (place) {
    case POSITION.AFTERBEGIN:
      container.prepend(child);
      break;
    case POSITION.BEFOREEND:
      container.append(child);
      break;
    case POSITION.AFTEREND:
      container.after(child);
      break;
  }
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

export const renderTemplate = (container, template, place) => {
  if (container instanceof AbstractComponent) {
    container = container.getElement();
  }
  container.insertAdjacentHTML(place, template);
};

export const remove = (component) => {
  if (!(component instanceof AbstractComponent)) {
    throw new Error(`Can remove only components`);
  }
  component.getElement().remove();
  component.removeElement();
};
