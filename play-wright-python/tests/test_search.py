from playwright.sync_api import Page, expect
from pages.search import DuckDuckGoSearchPage
from pages.result import DuckDuckGoResultPage
from pages.loginpage import WordPressLoginPage

Search_Term = 'panda'


# def test_basic_search(page: Page, search_page: DuckDuckGoSearchPage, result_page: DuckDuckGoResultPage) -> None:
#     # Search Term
#     search_term = Search_Term
#
#     # Given the DuckDuckGo home page is displayed
#     search_page.load()
#
#     # When the user searches for a phrase
#     search_page.search(search_term)
#
#     # Then the search result query is the phrase
#     expect(result_page.search_input).to_have_value(search_term)
#
#     # And the search result links pertain to the phrase
#     assert result_page.result_link_titles_contain_phrase(search_term)
#
#     # And the search result title contains the phrase
#     expect(page).to_have_title(f'{search_term} at DuckDuckGo')


def test_wp_login(page: Page, login_page: WordPressLoginPage) -> None:
    login_page.load()

    login_page.login('admin')

    expect(page.locator("#menu-dashboard")).to_contain_text("Dashboard")

    login_page.tourfic_setting_page()
