<template>
	<a-card title="Transition" :bordered="false">
		<div class="container">
			<svg class="chart"></svg>
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

		const margin = { top: 20, right: 30, bottom: 30, left: 50 }
		const containerWidth = document.querySelector('.container').clientWidth
		console.log(containerWidth)
		const width = containerWidth - margin.left - margin.right
		const height = 400 - margin.top - margin.bottom

		const x = this.$d3
			.scaleBand()
			.domain(data.map(d => d.name))
			.range([0, width])
			.paddingInner(0.1)
			.paddingOuter(0.1)

		const y = this.$d3.scaleLinear(
			[0, this.$d3.max(data, d => d.sale)],
			[height, 0]
		)
		const xAxis = this.$d3.axisBottom(x)
		const yAxis = this.$d3.axisLeft(y)

		const svg = this.$d3
			.select('.chart')
			.attr('width', width + margin.left + margin.right)
			.attr('height', height + margin.top + margin.bottom)

		svg
			.append('text')
			.attr('x', width / 2)
			.attr('y', 0)
			.attr('dy', 16)
			.style('text-anchor', 'middle')
			.text('2019 sales of state')

		const chart = svg
			.append('g')
			.attr('transform', `translate(${margin.left},${margin.top})`)

		chart
			.append('g')
			.attr('class', 'x axis')
			.attr('transform', `translate(0, ${height})`)
			.call(xAxis)

		chart
			.append('g')
			.attr('class', 'y axis')
			.call(yAxis)
			.append('text')
			.attr('class', 'unit')
			.attr('x', -8)
			.attr('dy', 5)
			.attr('fill', 'red')
			.text('Unit(Thusand)')

		chart
			.selectAll('.bar')
			.data(data)
			.enter()
			.append('rect')
			.attr('class', 'bar')
			.attr('x', d => x(d.name))
			.attr('y', d => y(d.sale))
			.attr('width', x.bandwidth())
			.transition()
			.delay((d, i) => i * 50)
			.duration(500)
			.ease(this.$d3.easeBounceOut)
			.attr('height', d => height - y(d.sale))
	}
}
</script>

<style lang="scss" scoped>
.container {
	width: 100%;
}

.chart::v-deep {
	.bar {
		fill: steelblue;
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
