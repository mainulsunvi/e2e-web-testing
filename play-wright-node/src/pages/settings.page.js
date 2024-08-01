const { page } = require("@playwright/test")

class SetttingsPage {
	constructor(page) {
		this.page = page;
	}

	async load() {
		await this.page.goto('/wp-admin/admin.php?page=tf_settings#tab=general');

	}
}