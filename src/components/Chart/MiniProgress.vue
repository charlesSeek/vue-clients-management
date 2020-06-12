<template>
	<div class="mini-progress">
		<div :style="{ left: indicatorLeft }" class="progress-indicator">
			<span :style="{ backgroundColor: color }"></span>
			<span :style="{ backgroundColor: color }"></span>
		</div>
		<div
			:style="{ backgroundColor: bgColor, borderRadius: roundSize }"
			class="progress-wrapper"
		>
			<div
				:style="{
					width: percent + '%',
					height: innerHeight,
					backgroundColor: color,
					borderRadius: roundSize
				}"
				class="progress-inner"
			></div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'MiniProgress',
	props: {
		percent: {
			type: Number,
			required: true
		},
		height: {
			type: [String, Number],
			default: 10
		},
		color: {
			type: String,
			default: '#13C2C2'
		},
		bgColor: {
			type: String,
			default: '#f5f5f5'
		},
		// 是否圆角
		round: Boolean
	},
	computed: {
		innerHeight() {
			const { height } = this
			return typeof this.height === 'number' ? height + 'px' : height
		},
		indicatorLeft() {
			const { percent } = this
			return percent < 98 ? percent + 2 + '%' : '100%'
		},
		roundSize() {
			const { height, round } = this
			if (!round) return '1px 0 0 1px'

			return height * 0.5 + 'px'
		}
	}
}
</script>

<style lang="scss" scoped>
.mini-progress {
	position: relative;
	width: 100%;
	padding: 5px 0;

	.progress-indicator {
		position: absolute;
		top: 0;
		bottom: 0;
		width: 2px;
		background-color: #fff;

		span {
			border-radius: 100px;
			position: absolute;
			top: 0;
			left: 0;
			height: 4px;
			width: 2px;

			&:last-child {
				top: auto;
				bottom: 0;
			}
		}
	}

	.progress-wrapper {
		position: relative;

		.progress-inner {
			transition: all 0.4s cubic-bezier(0.08, 0.82, 0.17, 1) 0s;
			width: 0;
			height: 100%;
		}
	}
}
</style>
