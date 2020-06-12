export default {
	data() {
		return {
			columns: null,
			rows: null,
			tableLoading: false,
			pagination: {
				current: 1,
				pageSize: 10,
				total: 0,
				showSizeChanger: true,
				showTotal(total, range) {
					return `tOTAL ${total}`
				}
			}
		}
	},
	computed: {
		serial() {
			const {
				pagination: { current, pageSize }
			} = this
			return (current - 1) * pageSize
		}
	},
	methods: {
		handleTableChange(pagination, filters, sorter) {
			this.pagination.current = pagination.current
			this.pagination.pageSize = pagination.pageSize
			this.search()
		}
	}
}
