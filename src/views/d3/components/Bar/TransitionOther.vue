<template>
	<a-card title="Transition Other" :bordered="false">
		<div class="container-other">
			<svg class="chart-other"></svg>
		</div>
	</a-card>
</template>

<script>
export default {
	mounted() {
		const data = [
			{ name: 'south australia', sale: 97300 },
			{ name: 'victoria', sale: 92595 },
			{ name: 'New south wales', sale: 76469 },
			{ name: 'Queensland ', sale: 56197 },
			{ name: 'Western Australia', sale: 48055 },
			{ name: 'Australian Capital Territory', sale: 40678 },
			{ name: 'Northern Territory', sale: 39366 }
		]

		const margin = { top: 50, right: 30, bottom: 10, left: 50 }
		const containerWidth = document.querySelector('.container-other')
			.clientWidth
		console.log(containerWidth)
		const width = containerWidth - margin.left - margin.right
		const height = 800 - margin.top - margin.bottom

		const x = this.$d3
			.scaleBand(
				data.map(d => d.name),
				[0, height]
			)
			.paddingInner(0.1)
			.paddingOuter(0.3)

		const y = this.$d3.scaleLinear(
			[0, this.$d3.max(data, d => d.sale)],
			[0, width]
		)

		const xAxis = this.$d3.axisLeft(x)
		const yAxis = this.$d3.axisTop(y)

		const svg = this.$d3
			.select('.chart-other')
			.attr('width', width + margin.left + margin.right)
			.attr('height', height + margin.top + margin.bottom)

		svg
			.append('text')
			.attr('x', width / 2)
			.attr('y', 0)
			.attr('dy', 16)
			.style('text-anchor', 'middle')
			.text('2019 state sale')

		const chart = svg
			.append('g')
			.attr('transform', `translate(${margin.left},${margin.top})`)

		chart
			.append('g')
			.attr('class', 'x axis')
			.call(xAxis)
		chart
			.append('g')
			.attr('class', 'y axis')
			.call(yAxis)

		const bar = chart
			.selectAll('.bar')
			.data(data)
			.enter()
			.append('g')
			.attr('class', 'bar')
			.attr('transform', d => `translate(0, ${x(d.name)})`)

		bar
			.append('rect')
			.attr('height', x.bandwidth())
			.transition()
			.delay((d, i) => i * 50)
			.duration(500)
			.ease(this.$d3.easeCubicOut)
			.attr('width', d => y(d.sale))

		bar
			.append('text')
			.style('fill', '#fff')
			.attr('y', x.bandwidth() / 2)
			.attr('dy', 3)
			.text(d => d.sale)
			.transition()
			.delay((d, i) => i * 50)
			.duration(500)
			.ease(this.$d3.easeCubicOut)
			.attr('x', d => y(d.sale) - 5)
	}
}
</script>

<style lang="scss" scoped>
.container-other {
	width: 100%;
}

.chart-other::v-deep {
	.bar {
		fill: steelblue;
		font-size: 10px;
		text-anchor: end;
	}

	.axis text {
		font: 10px sans-serif;
	}

	.axis path,
	.axis line {
		fill: none;
		stroke: #000;
		shape-rendering: crispEdges;
	}
}
</style>
