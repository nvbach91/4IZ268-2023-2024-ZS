import { AppService } from '../app.service.js'
import { Events } from '../enums/Events.enum.js'
import { gitConfig } from './git.config.js'

export class GitService {

	getUser = (user) => {
		this.requestUser(user)
			.then((data) => {
				AppService.emit(Events.PostUser, true, data)
				this.getRepositories(data.login)
					.then((reposData) => {
						AppService.emit(Events.PostRepositories, true, reposData)
					})
			})
			.catch((error) => {
				AppService.emit(Events.PostUser, false, error)
			})
	}

	requestUser = (user) => {
		const gitHubURLBase = gitConfig.baseURL
		const clientID = gitConfig.clientID
		const secret = gitConfig.clientSecret
		const url = `${gitHubURLBase}/users/${user}?client_id=${clientID}&client_secret=${secret}`

		return new Promise((resolve, reject) => {
			$.ajax({
				url: url,
				dataType: 'json',
				success: (response) => {
					if (response) { resolve(response) }
				},
				error: (status) => {
					reject(`Error status: ${status.responseJSON.message.toString()}`)
				}
			})
		})
	}

	getRepositories = (userName) => {
		const gitHubURLBase = gitConfig.baseURL
		const url = `${gitHubURLBase}/users/${userName}/repos`
		return new Promise((resolve, reject) => {
			$.ajax({
				url: url,
				dataType: 'json',
				success: (response) => {
					if (response) { resolve(response) }
				},
				error: (status) => {
					reject(`Error status: ${status.responseJSON.message.toString()}`)
				}
			})
		})
	}
}