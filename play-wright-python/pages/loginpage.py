from playwright.sync_api import Page


class WordPressLoginPage:
    URL = 'http://tourfic.test.msunvi/wp-admin/'

    def __init__(self, page: Page) -> None:
        self.page = page
        self.username_input = page.locator("#user_login")
        self.password_input = page.locator("#user_pass")
        self.login_button = page.locator('#wp-submit')

    def load(self) -> None:
        self.page.goto('/wp-admin', wait_until='networkidle')

    def login(self, phrase: str) -> None:
        self.username_input.fill(phrase)
        self.password_input.fill(phrase)
        self.login_button.click()
        self.page.wait_for_url(self.URL)

    def tourfic_setting_page(self):
        self.page.goto('/wp-admin/admin.php?page=tf_settings#tab=general', wait_until='networkidle')
