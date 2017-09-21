import {MenuType, IMenuRoute} from "./models/navbar.metadata";
/**
 * Menu items to show up in the navigation bar.
 */
export const MENU_ITEMS: IMenuRoute[] = [
  { path: [''], title: 'HiQ', type: MenuType.BRAND },
  { path: [''], title: 'Ansikten', type: MenuType.LEFT },
  { path: ['resume/edit'], title:'Mitt CV', type: MenuType.LEFT},
  { path: ['logout'], title: 'Logga ut', type: MenuType.RIGHT },
];
