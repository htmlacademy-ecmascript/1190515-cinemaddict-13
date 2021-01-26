const POSITION = {
  AFTERBEGIN: `afterbegin`,
  AFTEREND: `afterend`,
  BEFOREEND: `beforeend`
};

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

const render = (container, component, position) => {
  const element = component.getElement();
  switch (position) {
    case POSITION.AFTERBEGIN:
      container.prepend(element);
      break;
    case POSITION.AFTEREND:
      container.after(element);
      break;
    case POSITION.BEFOREEND:
      container.append(element);
      break;
  }
};

const remove = (component) => {
  component.getElement().remove();
  component.removeElement();
};

const toggleElement = (container, component, action) => {
  const element = component.getElement();
  switch (action) {
    case `show`:
      container.appendChild(element);
      break;
    case `hide`:
      if (container.contains(element)) {
        container.removeChild(element);
      }
      break;
  }
};

const replace = (oldComponent, newComponent) => {
  const parentElement = oldComponent.getElement().parentElement;
  const newElement = newComponent.getElement();
  const oldElement = oldComponent.getElement();

  const isExistElements = !!(parentElement && newElement && oldElement);

  if (isExistElements && parentElement.contains(oldElement)) {
    parentElement.replaceChild(newElement, oldElement);
  }
};

export {createElement, render, POSITION, remove, toggleElement, replace};

//
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

export const remove = (component) => {
  component.getElement().remove();
  component.removeElement();
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
