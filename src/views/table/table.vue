<template>
	<div>
		<a-card title="user admin" :bordered="false">
			<div class="table-search-wrapper">
				<a-form>
					<a-row :gutter="48">
						<a-col :md="8" :sm="24">
							<a-form-item label="username" v-bind="formItemLayout">
								<a-input v-model="form.username" />
							</a-form-item>
						</a-col>
						<a-col :md="8" :sm="24">
							<a-form-item label="contact" v-bind="formItemLayout">
								<a-input v-model="form.contacts" />
							</a-form-item>
						</a-col>
						<template v-if="!formFold">
							<a-col :md="8" :sm="24">
								<a-form-item label="role" v-bind="formItemLayout">
									<a-select
										v-model="form.customsId"
										:options="roleOptions"
										allowClear
										placeholder="please choose"
									></a-select>
								</a-form-item>
							</a-col>
							<a-col :md="8" :sm="24">
								<a-form-item label="status" v-bind="formItemLayout">
									<a-select
										v-model="form.declareStatus"
										allowClear
										placeholder="please select"
									>
										<a-select-option :value="1">active</a-select-option>
										<a-select-option :value="0">deactive</a-select-option>
									</a-select>
								</a-form-item>
							</a-col>
							<a-col :md="8" :sm="24">
								<a-form-item label="Updated at" v-bind="formItemLayout">
									<a-range-picker
										v-model="rangeDate"
										:ranges="{ Today: [moment(), moment()] }"
										:disabledDate="currentDate => currentDate > moment()"
										:allowClear="false"
										style="width: 100%;"
									></a-range-picker>
								</a-form-item>
							</a-col>
						</template>
						<a-col :md="(formFold && 8) || 24" :sm="24">
							<span
								class="search-buttons"
								:style="
									(!formFold && { float: 'right', overflow: 'hidden' }) || {}
								"
							>
								<a-button type="primary" icon="search" @click="handleSearch"
									>查询</a-button
								>
								<a-button
									icon="sync"
									@click="handleResetForm"
									style="margin-left: 8px"
									>重置</a-button
								>
								<a @click="toggleFold" style="margin-left: 8px">
									{{ formFold ? 'down' : 'up' }}
									<a-icon :type="formFold ? 'down' : 'up'" />
								</a>
							</span>
						</a-col>
					</a-row>
				</a-form>
			</div>

			<div class="operate-wrapper">
				<a-button @click="onCreate" class="btn-item" type="primary"
					>新增</a-button
				>
			</div>

			<a-table
				:columns="columns"
				:dataSource="rows"
				:rowSelection="rowSelection"
				rowKey="id"
				:pagination="pagination"
				:loading="tableLoading"
				@change="handleTableChange"
				:scroll="{ x: 1500 }"
			>
				<span slot="serial" slot-scope="text, record, index">{{
					serial + index + 1
				}}</span>

				<span slot="role" slot-scope="roleId">{{
					roleId | roleFilter(roleOptions)
				}}</span>

				<span slot="status" slot-scope="status">{{
					status === 1 ? 'active' : 'deactive'
				}}</span>

				<span slot="updateTime" slot-scope="updateTime">
					{{ new Date(updateTime) | formatDate('yyyy-MM-dd hh:mm:ss') }}
				</span>

				<div slot="actions" slot-scope="record">
					<a @click="onEdit(record)" href="javascript:0;">编辑</a>
					<a-divider type="vertical" />
					<a @click="onDelete(record.id)" href="javascript:0;">删除</a>
				</div>
			</a-table>
		</a-card>

		<!--add/edit user-->
		<account-modal
			:visible="visible"
			:account="currentAccount"
			@close="onModalClose"
		/>
	</div>
</template>

<script>
import { queryFormMixin, tableMixin, rangePickerMixin } from '@/mixins'
import AccountModal from './components/AccountModal'
import { getUsers, deleteAccount, getRoles } from '@/api/form'

const columns = [
	{
		title: '#',
		scopedSlots: { customRender: 'serial' },
		width: 50,
		align: 'center',
		fixed: 'left'
	},
	{
		title: 'user id',
		dataIndex: 'id',
		align: 'center'
	},
	{
		title: 'user name',
		dataIndex: 'username',
		align: 'center'
	},
	{
		title: 'contact',
		dataIndex: 'contacts',
		align: 'center'
	},
	{
		title: 'email',
		dataIndex: 'contactsEmail',
		align: 'center'
	},
	{
		title: '地址',
		dataIndex: 'address',
		width: 200,
		align: 'center'
	},
	{
		title: 'role',
		dataIndex: 'roleId',
		scopedSlots: { customRender: 'role' },
		align: 'center'
	},
	{
		title: 'status',
		dataIndex: 'status',
		scopedSlots: { customRender: 'status' },
		align: 'center'
	},
	{
		title: 'updatedAt',
		dataIndex: 'updateTime',
		scopedSlots: { customRender: 'updateTime' },
		width: 160,
		align: 'center'
	},
	{
		title: 'Action',
		scopedSlots: { customRender: 'actions' },
		width: 120,
		align: 'center',
		fixed: 'right'
	}
]

export default {
	mixins: [queryFormMixin, tableMixin, rangePickerMixin],
	components: { AccountModal },
	filters: {
		roleFilter(roleId, roleOptions) {
			let role = null
			roleOptions.forEach(item => {
				if (item.value === roleId) {
					role = item
				}
			})
			return role.label
		}
	},
	data() {
		return {
			form: {},
			selectedRowKeys: [],

			roleOptions: [],

			visible: false,
			currentAccount: null
		}
	},
	computed: {
		rowSelection() {
			const self = this
			return {
				selectedRowKeys: self.selectedRowKeys,
				onChange: (keys, rows) => {
					self.selectedRowKeys = keys
				},
				getCheckboxProps: record => ({
					props: {
						disabled: record.status === 1
					}
				})
			}
		},
		isDisabled() {
			return this.selectedRowKeys.length === 0
		}
	},
	methods: {
		async search() {
			this.tableLoading = true
			const { current, pageSize } = this.pagination
			const res = await getUsers({
				...this.form,
				current,
				pageSize
			})
			this.rows = res
			this.pagination.total = res.length
			this.tableLoading = false
		},
		handleSearch() {
			this.pagination.current = 1
			this.search()
		},
		onCreate() {
			this.visible = true
		},
		onEdit(row) {
			this.currentAccount = row
			this.visible = true
		},
		async onDelete(id) {
			const self = this
			this.$confirm({
				title: 'Delete',
				content: `Are you sure to delete the user`,
				okText: 'Delete',
				okType: 'danger',
				async onOk() {
					await deleteAccount(id)
					self.$message.success('Delete successfully')
					self.search()
				},
				onCancel() {
					self.$message.warning('Cancel delete')
				}
			})
		},
		async queryRoles() {
			const res = await getRoles()
			this.roleOptions = res
		},
		onModalClose(isRefresh) {
			if (isRefresh) {
				this.search()
			}
			this.currentAccount = null
			this.visible = false
		}
	},
	created() {
		this.columns = columns
		this.queryRoles()
		this.search()
	}
}
</script>
