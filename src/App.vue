<template>
	<a-locale-provider :locale="en">
		<div id="app">
			<router-view />
		</div>
	</a-locale-provider>
</template>

<script>
// eslint-disable-next-line
import { deviceEnquire } from '@/utils/device'

export default {
	name: 'app',
	data() {
		return {
			en
		}
	},
	mounted() {
		deviceEnquire(deviceType =>
			this.$store.commit('app/SET_DEVICE', deviceType)
		)
	}
}
</script>
