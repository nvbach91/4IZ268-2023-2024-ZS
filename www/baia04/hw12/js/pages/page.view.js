export class PageView {

	constructor(pageService) {
		this.pageService = pageService
		this.body = document.querySelector("body")
		this.dataValues = {}
	}

	getBody = () => { return this.body }
	getInput = () => { return this.input.value }
	getMain = () => { return this.main }

	append = (elem1, elem2) => { $(elem1).append(elem2) }

	create = () => {
		const container = document.createElement("main")
		this.main = container
		$(container).addClass("main-container")

		const header = document.createElement("h1")
		$(header).text("Git The Hub")
		const subheader = document.createElement("p")
		$(subheader).text("Enter a username to search for an user on GitHub")
		$(container).append(header, subheader)

		const inputContainer = document.createElement("div")
		$(inputContainer).addClass("input-container")
		const input = document.createElement("input")
		$(input).addClass("input")
		this.input = input
		const submit = document.createElement("button")
		$(submit).addClass("submit")
		$(submit).text("Submit")
		$(submit).on("click", this.pageService.onSubmit)
		$(inputContainer).append(input, submit)
		$(container).append(inputContainer)

		return container
	}

	getError = (error) => {
		const errorContainer = document.createElement("div")
		$(errorContainer).addClass("error")
		const errorHeader = document.createElement("h3")
		$(errorHeader).text("Došlo k chybě")
		const errorText = document.createElement("p")
		$(errorText).text(error)
		$(errorContainer).append(errorHeader, errorText)
		return errorContainer
	}

	getUser = (data) => {
		const userContainer = document.createElement("div")
		$(userContainer).addClass("user-container")
		const userHeaderContainer = document.createElement("div")
		$(userHeaderContainer).addClass("user-header-container")
		const userHeader = document.createElement("h2")
		$(userHeader).text(data.name)
		this.userHeader = userHeader
		$(userHeaderContainer).append(userHeader)
		$(userContainer).append(userHeaderContainer)
		const twoSideBox = document.createElement("div")
		$(twoSideBox).addClass("twoside-box")
		const left = document.createElement("div")
		$(left).addClass("left-box")
		const right = document.createElement("div")
		$(right).addClass("right-box")
		$(twoSideBox).append(left, right)

		let userData = document.createElement("div")
		$(userData).addClass("user-block")
		let dataNameContainer = document.createElement("div")
		$(dataNameContainer).addClass("data-name-container")
		$(dataNameContainer).text("Login:")
		let dataValueContainer = document.createElement("div")
		$(dataValueContainer).addClass("data-value-container")
			.text(data.login)
		Object.defineProperty(this.dataValues, "Login", dataValueContainer)
		$(userData).append(dataNameContainer, dataValueContainer)
		$(left).append(userData)

		userData = document.createElement("div")
		$(userData).addClass("user-block")
		dataNameContainer = document.createElement("div")
		$(dataNameContainer).addClass("data-name-container")
		$(dataNameContainer).text("Biography:")
		dataValueContainer = document.createElement("div")
		$(dataValueContainer).addClass("data-value-container")
			.text(data.bio)
		Object.defineProperty(this.dataValues, "Bio", dataValueContainer)
		$(userData).append(dataNameContainer, dataValueContainer)
		$(left).append(userData)

		userData = document.createElement("div")
		$(userData).addClass("user-block")
		dataNameContainer = document.createElement("div")
		$(dataNameContainer).addClass("data-name-container")
		$(dataNameContainer).text("Location:")
		dataValueContainer = document.createElement("div")
		$(dataValueContainer).addClass("data-value-container")
			.text(data.location)
		Object.defineProperty(this.dataValues, "Location", dataValueContainer)
		$(userData).append(dataNameContainer, dataValueContainer)
		$(left).append(userData)

		userData = document.createElement("div")
		$(userData).addClass("user-block")
		dataNameContainer = document.createElement("div")
		$(dataNameContainer).addClass("data-name-container")
		$(dataNameContainer).text("Description:")
		dataValueContainer = document.createElement("div")
		$(dataValueContainer).addClass("data-value-container")
			.text(data.description)
		Object.defineProperty(this.dataValues, "Description", dataValueContainer)
		$(userData).append(dataNameContainer, dataValueContainer)
		$(left).append(userData)

		userData = document.createElement("div")
		$(userData).addClass("user-block")
		dataNameContainer = document.createElement("div")
		$(dataNameContainer).addClass("data-name-container")
		$(dataNameContainer).text("Email:")
		dataValueContainer = document.createElement("div")
		$(dataValueContainer).addClass("data-value-container")
			.text(data.email)
		Object.defineProperty(this.dataValues, "Email", dataValueContainer)
		$(userData).append(dataNameContainer, dataValueContainer)
		$(left).append(userData)

		userData = document.createElement("div")
		$(userData).addClass("user-block")
		dataNameContainer = document.createElement("div")
		$(dataNameContainer).addClass("data-name-container")
		$(dataNameContainer).text("Followers:")
		dataValueContainer = document.createElement("div")
		$(dataValueContainer).addClass("data-value-container")
			.text(data.followers)
		Object.defineProperty(this.dataValues, "Followers", dataValueContainer)
		$(userData).append(dataNameContainer, dataValueContainer)
		$(left).append(userData)

		userData = document.createElement("div")
		$(userData).addClass("user-block")
		dataNameContainer = document.createElement("div")
		$(dataNameContainer).addClass("data-name-container")
		$(dataNameContainer).text("Registered At:")
		dataValueContainer = document.createElement("div")
		$(dataValueContainer).addClass("data-value-container")
			.text(data.createdAt)
		Object.defineProperty(this.dataValues, "Registered", dataValueContainer)
		$(userData).append(dataNameContainer, dataValueContainer)
		$(left).append(userData)

		userData = document.createElement("div")
		$(userData).addClass("user-block")
		dataNameContainer = document.createElement("div")
		$(dataNameContainer).addClass("data-name-container")
		$(dataNameContainer).text("Link:")
		dataValueContainer = document.createElement("div")
		$(dataValueContainer).addClass("data-value-container")
			.text(data.url)
		Object.defineProperty(this.dataValues, "Link", dataValueContainer)
		$(userData).append(dataNameContainer, dataValueContainer)
		$(left).append(userData)

		const userProfile = document.createElement("div")
		const avatar = document.createElement("img")
		$(avatar).addClass("avatar")
		$(avatar).attr("src", data.avatarUrl)
		const viewLink = document.createElement("a")
		const viewButton = document.createElement("div")
		$(viewButton).addClass("view-button")
			.text("View Profile")
		$(viewLink).attr("href", data.url)
		$(viewLink).append(viewButton)
		$(userProfile).append(avatar, viewLink)
		$(right).append(userProfile)
		$(userContainer).append(twoSideBox)

		return userContainer
	}

	getRepositories = (count, repositories) => {
		const repoContainer = document.createElement("div")
		$(repoContainer).addClass("repository-container")
		const header = document.createElement("h2")
		$(header).text("Repositories")
		const subheader = document.createElement("p")
		$(subheader).text(`Tento uživatel má ${count} repositářů`)
		$(repoContainer).append(header, subheader)

		repositories.forEach((repository) => {
			const repo = document.createElement("div")
			$(repo).addClass("user-block")
			const dataNameContainer = document.createElement("div")
			$(dataNameContainer).addClass("data-name-container")
			$(dataNameContainer).text(repository.name)
			const dataValueContainer = document.createElement("div")
			$(dataValueContainer).addClass("data-value-container")
				.text(repository.link)
			$(repo).append(dataNameContainer, dataValueContainer)
			$(repoContainer).append(repo)
		})
		return repoContainer
	}
}