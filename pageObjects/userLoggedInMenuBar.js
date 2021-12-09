import BasePage from "./basePage.js";
import Button from "../elementObjects/button.js";
import Dropdown from "../elementObjects/dropdown.js";

class UserLoggedInMenuBar extends BasePage {
    constructor() {
        super();
        
        this.accountPopupMenuSelector = 'button#navbarAccount';
        this.logoutButtonSelector = 'button#navbarLogoutButton';
    }

    getBaseElement() {
        return $(this.accountPopupMenuSelector);
    }

    async openAccountPopupMenu() {
        let accountPopupMenu = new Dropdown($(this.accountPopupMenuSelector), "Account Popup menu");
        await this.waitForPageAvailable();
        await accountPopupMenu.click();
    }

    async getLogoutButton() {
        await this.openAccountPopupMenu();
        return new Button($(this.logoutButtonSelector), "Logout button");
    }
}

export default new UserLoggedInMenuBar();