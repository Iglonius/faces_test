import {Component, OnInit} from '@angular/core';
import {IMenuRoute, MenuType} from "./models/navbar.metadata";
import {MENU_ITEMS} from "./navbar.config";
import {AuthService} from "../auth/services/auth.service";

/**
 * Navigation bar component handles the rendering of the navigation.
 */
@Component({
  selector: 'hiq-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  leftMenuItems: IMenuRoute[];
  rightMenuItems: IMenuRoute[];
  brandItem: IMenuRoute;
  isCollapsed: boolean;
  visible: boolean;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.brandItem = MENU_ITEMS.filter(item => item.type === MenuType.BRAND)[0];
    this.leftMenuItems = MENU_ITEMS.filter(item => item.type === MenuType.LEFT);
    this.rightMenuItems = MENU_ITEMS.filter(item => item.type === MenuType.RIGHT);

    this.authService.LoginStatus.subscribe(isLoggedIn => this.visible = isLoggedIn);
  }

  /**
   * Sets the class of a menu item with pull-xs-right if it is in mobile/tablet and if it is a menu item located on the right side.
   * @param menuItem - Menu item to lookup the statement on.
   * @returns {{pull-xs-right: boolean}} - Retruns true if the statement is true.
   */
  public getMenuItemClasses(menuItem: any) {
    return {
      'pull-xs-right': this.isCollapsed && menuItem.menuType !== MenuType.BRAND
    };
  }
}
