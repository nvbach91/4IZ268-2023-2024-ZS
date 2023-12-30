import { AppService } from '../app.service.js'
import { Events } from '../enums/Events.enum.js'
import { PageView } from './page.view.js'

export class PageService {

	constructor() {
		this.view = new PageView(this)
		this.initPage()
	}

	initPage = () => {
		this.view.append(
			this.view.getBody(),
			this.view.create()
		)
	}

	onSubmit = () => {
		const value = this.view.getInput()
		AppService.emit(Events.GetUser, value)
	}

	postUser = (isFound, data) => {
		if (!isFound) {
			$(this.error).remove()
			$(this.userContainer).remove()
			$(this.repositories).remove()
			this.error = this.view.getError(data)
			this.view.append(
				this.view.getMain(),
				this.error
			)
			return
		}

		$(this.repositories).remove()
		$(this.error).remove()
		$(this.repoError).remove()
		const dataParsed = {
			name: data.name || "Unknown",
			login: data.login,
			bio: data.bio || "Unknown",
			location: data.location || "Unknown",
			description: data.description || "Unknown",
			email: data.email || "Unknown",
			followers: data.followers || 0,
			createdAt: this.getDate(data.created_at),
			url: data.html_url,
			avatarUrl: data.avatar_url
		}

		$(this.userContainer).remove()
		this.userContainer = this.view.getUser(dataParsed)
		this.view.append(
			this.view.getMain(),
			this.userContainer
		)
	}

	getDate = (createdAt) => {
		const date = new Date(createdAt)
		return `${date.getDay()}.${date.getMonth()}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
	}

	postRepositories = (isFound, data) => {
		if (!isFound) {
			$(this.repoError).remove()
			this.repoError = this.view.getError(data)
			this.view.append(
				this.view.getMain(),
				this.repoError
			)
			return
		}

		const length = data.length
		const repositories = []
		Object.getOwnPropertyNames(data).forEach((repositoryName) => {
			if (repositoryName === "length") return
			const repository = data[repositoryName]
			if (repository.private) return
			repositories.push(
				{
					name: repository.name,
					link: repository.html_url
				}
			)
		})

		$(this.repositories).remove()
		this.repositories = this.view.getRepositories(length, repositories)
		this.view.append(
			this.view.getMain(),
			this.repositories
		)
	}
}