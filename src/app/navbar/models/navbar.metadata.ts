/**
 * Type of menu and which location on the screen it has.
 *
 * BRAND: Is the logotype and on the left side.
 * LEFT: Added menu items on the left side of the screen.
 * RIGHT: Added menu items on the right side of the screen.
 */
export enum MenuType{
  BRAND,
  LEFT,
  RIGHT
}

/**
 * Interface to represent the menu route items.
 */
export interface IMenuRoute {
  path: string[];
  title: string;
  type: MenuType;
}
