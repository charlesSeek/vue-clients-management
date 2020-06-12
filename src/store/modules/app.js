import Vue from 'vue'
import {
	SYSTEM_MENU_THEME,
	SYSTEM_COLOR,
	SYSTEM_LAYOUT,
	SYSTEM_CONTENT_WIDTH,
	SYSTEM_FIXED_HEADER,
	SYSTEM_FIXED_SIDERBAR,
	SYSTEM_AUTOHIDE_HEADER,
	SYSTEM_COLORWEAK
} from '../mutation-types'

const app = {
	namespaced: true,
	state: {
		device: 'desktop',
		menuTheme: '',
		color: '',
		layout: '',
		contentWidth: '',
		fixedHeader: '',
		fixedSiderbar: '',
		autoHideHeader: '',
		colorWeak: ''
	},
	mutations: {
		SET_DEVICE(state, device) {
			state.device = device
		},
		SET_MENUTHEME(state, theme) {
			Vue.ls.set(SYSTEM_MENU_THEME, theme)
			state.menuTheme = theme
		},
		SET_COLOR(state, color) {
			Vue.ls.set(SYSTEM_COLOR, color)
			state.color = color
		},
		SET_LAYOUT(state, layout) {
			Vue.ls.set(SYSTEM_LAYOUT, layout)
			state.layout = layout
		},
		SET_CONTENTWIDTH(state, contentWidth) {
			Vue.ls.set(SYSTEM_CONTENT_WIDTH, contentWidth)
			state.contentWidth = contentWidth
		},
		SET_FIXEDHEADER(state, isFixed) {
			Vue.ls.set(SYSTEM_FIXED_HEADER, isFixed)
			state.fixedHeader = isFixed
		},
		SET_FIXEDSIDERBAR(state, isFixed) {
			Vue.ls.set(SYSTEM_FIXED_SIDERBAR, isFixed)
			state.fixedSiderbar = isFixed
		},
		SET_AUTOHIDENHEADER(state, isHidden) {
			Vue.ls.set(SYSTEM_AUTOHIDE_HEADER, isHidden)
			state.autoHideHeader = isHidden
		},
		SET_COLORWEAK(state, colorWeak) {
			Vue.ls.set(SYSTEM_COLORWEAK, colorWeak)
			state.colorWeak = colorWeak
		}
	},
	actions: {
		set_menuTheme({ commit }, menuTheme) {
			commit('SET_MENUTHEME', menuTheme)
		},
		set_color({ commit }, color) {
			commit('SET_COLOR', color)
		},
		set_layout({ commit }, layout) {
			commit('SET_LAYOUT', layout)
		},
		set_contentWidth({ commit }, contentWidth) {
			commit('SET_CONTENTWIDTH', contentWidth)
		},
		set_fixedHeader({ commit }, isFixed) {
			commit('SET_FIXEDHEADER', isFixed)
		},
		set_fixedSiderbar({ commit }, isFixed) {
			commit('SET_FIXEDSIDERBAR', isFixed)
		},
		set_autoHideHeader({ commit }, isHidden) {
			commit('SET_AUTOHIDENHEADER', isHidden)
		},
		set_colorWeak({ commit }, colorWeak) {
			commit('SET_COLORWEAK', colorWeak)
		}
	}
}

export default app
