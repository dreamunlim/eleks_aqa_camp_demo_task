class UserLoggedInMenuBar {
    constructor() {
        this.accountPopupMenuSelector = 'button#navbarAccount';
        this.logoutButtonSelector = 'button#navbarLogoutButton';
    }

    async triggerAccountPopupMenu() {
        await $(this.accountPopupMenuSelector).click();
    }

    async getLogoutButton() {
        await this.triggerAccountPopupMenu();
        return $(this.logoutButtonSelector);
    }
}

export default new UserLoggedInMenuBar();