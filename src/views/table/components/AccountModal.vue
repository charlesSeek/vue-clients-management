<template>
	<!--新增/修改用户模态框-->
	<a-modal
		:visible="visible"
		@ok="onSubmit"
		@cancel="closeModal(false)"
		:maskClosable="false"
		:keyboard="false"
		:confirmLoading="loading"
		:width="480"
		:title="account ? 'User edit' : 'New user'"
	>
		<a-form :form="form">
			<a-form-item v-bind="formItemLayout" label="login in ">
				<a-input
					v-decorator="[
						'username',
						{
							initialValue: account && account.username,
							rules: [{ required: true, message: 'please input name!' }]
						}
					]"
					:disabled="!!account"
				/>
			</a-form-item>
			<a-form-item v-bind="formItemLayout" label="contact">
				<a-input
					v-decorator="[
						'contacts',
						{
							initialValue: account && account.contacts,
							rules: [{ required: true, message: 'please input contact!' }]
						}
					]"
				/>
			</a-form-item>
			<a-form-item v-bind="formItemLayout" label="email">
				<a-input
					v-decorator="[
						'contactsEmail',
						{
							initialValue: account && account.contactsEmail,
							rules: [
								{ required: true, message: 'please input email!' },
								{ type: 'email', message: 'format error' }
							]
						}
					]"
				/>
			</a-form-item>
			<a-form-item v-bind="formItemLayout" label="address">
				<a-textarea
					v-decorator="[
						'address',
						{
							initialValue: account && account.address,
							rules: [{ required: true, message: 'please input address!' }]
						}
					]"
					:autosize="{ minRows: 2, maxRows: 6 }"
				/>
			</a-form-item>
			<a-form-item v-bind="formItemLayout" label="role">
				<a-select
					v-decorator="[
						'roleId',
						{
							initialValue: account && account.roleId,
							rules: [{ required: true, message: 'please select role!' }]
						}
					]"
					:options="roleOptions"
				></a-select>
			</a-form-item>
			<a-form-item v-bind="formItemLayout" label="status">
				<a-select
					v-decorator="[
						'status',
						{
							initialValue: account && account.status,
							rules: [{ required: true, message: 'please select status!' }]
						}
					]"
				>
					<a-select-option :value="1">active</a-select-option>
					<a-select-option :value="0">deactive</a-select-option>
				</a-select>
			</a-form-item>
		</a-form>
	</a-modal>
</template>

<script>
import { createAccount, modifyAccount, getRoles } from '@/api/form'
import ATextarea from 'ant-design-vue/es/input/TextArea'

export default {
	components: { ATextarea },
	props: {
		visible: {
			type: Boolean,
			required: true
		},
		account: Object
	},
	data() {
		return {
			form: this.$form.createForm(this),
			roleOptions: [],
			loading: false,
			formItemLayout: {
				labelCol: { span: 6 },
				wrapperCol: { span: 18 }
			}
		}
	},
	methods: {
		async handleCreateAccount(params) {
			await createAccount(params)
			this.loading = false
			this.$message.success('创建用户成功')
			this.closeModal(true)
		},
		async handleModifyAccount(params) {
			await modifyAccount(params)
			this.loading = false
			this.$message.success('编辑成功')
			this.closeModal(true)
		},
		onSubmit() {
			this.form.validateFields((err, values) => {
				if (err) return

				this.loading = true
				const params = { ...this.account, ...values }
				if (params.id) {
					this.handleModifyAccount(params)
				} else {
					this.handleCreateAccount(params)
				}
			})
		},
		async queryRoles() {
			const res = await getRoles()
			this.roleOptions = res
		},
		closeModal(isRefresh) {
			this.form.resetFields()
			this.$emit('close', isRefresh)
		}
	},
	created() {
		this.queryRoles()
	}
}
</script>
