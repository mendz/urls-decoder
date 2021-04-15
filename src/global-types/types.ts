/**
 * Selection type with modify function which not exists on the type
 * could be because it currently is "Non-standard" - https://developer.mozilla.org/en-US/docs/Web/API/Selection/modify
 */
export type SelectionModify =
  | (Selection & {
      modify: (alter: string, direction: string, granularity: string) => void;
    })
  | null;

export type HTMLElementReactMouseEvent<
  T extends HTMLElement
> = React.MouseEvent<T, MouseEvent> & {
  target: T;
};
