export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const render = (container, component, place = RenderPosition.BEFOREEND) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(component.getElement());
      break;

    case RenderPosition.BEFOREEND:
      container.append(component.getElement());
      break;
  }
};

export const removeChild = (childComponent) => {
  const parent = childComponent.getElement().parentElement;
  parent.removeChild(childComponent.getElement());
};

export const appendChild = (place, childComponent) => {
  place.appendChild(childComponent.getElement());
};

export const replace = (newComponent, prevComponent) => {
  const parentElement = prevComponent.getElement().parentElement;
  const newChildElement = newComponent.getElement();
  const prevChildElement = prevComponent.getElement();

  const isExistElements = !!(parentElement && newChildElement && prevChildElement);
  if (isExistElements && parentElement.contains(prevChildElement)) {
    parentElement.replaceChild(newChildElement, prevChildElement);
  }
};
