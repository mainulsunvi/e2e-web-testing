import pytest

from pages.search import DuckDuckGoSearchPage
from pages.result import DuckDuckGoResultPage
from pages.loginpage import WordPressLoginPage
from playwright.sync_api import Page


@pytest.fixture
def result_page(page: Page) -> DuckDuckGoResultPage:
    return DuckDuckGoResultPage(page)


@pytest.fixture
def search_page(page: Page) -> DuckDuckGoSearchPage:
    return DuckDuckGoSearchPage(page)


@pytest.fixture()
def login_page(page: Page) -> WordPressLoginPage:
    return WordPressLoginPage(page)
