export default {
	data() {
		return {
			formFold: true,
			formItemLayout: {
				labelCol: {
					md: { span: 6 },
					sm: { span: 4 }
				},
				wrapperCol: {
					md: { span: 18 },
					sm: { span: 20 }
				}
			}
		}
	},
	methods: {
		toggleFold() {
			this.formFold = !this.formFold
		}
	}
}
