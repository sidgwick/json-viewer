type ButtonClickEvent = Event & {
  currentTarget: EventTarget & HTMLButtonElement;
};

type InputChangeEvent = Event & {
  currentTarget: EventTarget & HTMLInputElement;
};
