import Vue from 'vue'
import store from '@/store/index'
import router from '@/router'
import axios from 'axios'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import notification from 'ant-design-vue/es/notification'

let timer = null

const onError = error => {
	if (error.response) {
		const status = error.response.status
		const message = error.response.statusText
		const token = Vue.ss.get(ACCESS_TOKEN)

		if (status === 403) {
			notification.error({ message: 'Accee deny', description: message })
		}

		if (status === 404) {
			notification.error({ message: 'unknown resource', description: message })
		}

		if (status === 500) {
			notification.error({
				message: 'Server error',
				description: message
			})
		}

		if (status === 401 && !timer) {
			timer = setTimeout(() => {
				notification.error({
					message: 'Unauth',
					description: 'please login in again'
				})
				if (token) {
					store.dispatch('user/Logout').then(() => router.replace('/login'))
				}
				timer = null
			}, 500)
		}
	}
	return Promise.reject(error)
}

const request = axios.create({
	baseURL: '/api',
	timeout: 5000,
	headers: {
		'Content-Type': 'application/json;charset=UTF-8'
	},
	transformRequest: [
		function(data, headers) {
			const token = Vue.ss.get(ACCESS_TOKEN)
			if (token) {
				headers[ACCESS_TOKEN] = 'Bearer ' + token
			}
			if (headers['Content-Type'] === 'multipart/form-data') {
				return data
			} else {
				return JSON.stringify(data)
			}
		}
	]
})

request.interceptors.request.use(
	config => {
		if (process.env.NODE_ENV === 'development') {
			const { method } = config
			if (['post', 'put', 'patch'].includes(method)) {
				console.log(config.data)
			}
		}

		return config
	},
	error => {
		notification.error({
			message: 'Request failed',
			description: 'request failed'
		})
		return Promise.reject(error)
	}
)

request.interceptors.response.use(res => {
	console.log(res)
	const jsonPattern = /application\/json/gi
	if (jsonPattern.test(res.headers['content-type'])) {
		return res.data
	} else {
		return res
	}
}, onError)

export default request
