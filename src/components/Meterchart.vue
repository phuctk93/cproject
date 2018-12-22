<template>
	<div class="m-chart" @click="$emit('click')">
		<svg class="meter" xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="none"
    viewBox="0 0 240 200">

		<g class="circle" transform="rotate(180, 120, 100)">
		<circle id="low" r="100" cx="50%" cy="50" :stroke="color" stroke-width="20" stroke-dasharray="150 22 30 22 30 22 38 628" fill="none">
		</circle>

		<circle r="80" cx="50%" cy="50" stroke="#ccc" stroke-width="12" stroke-dasharray="502.4" :stroke-dashoffset="v_present" fill="none">
			<animate attributeName="stroke-dashoffset" from="502.4" :to="v_present" dur="1s" fill="freeze" />
		</circle>

		<circle r="80" cx="50%" cy="50" stroke="#1976d2" stroke-width="10" stroke-dasharray="502.4" :stroke-dashoffset="v_away" fill="none">
			<animate attributeName="stroke-dashoffset" from="502.4" :to="v_away" dur="2s" fill="freeze" />
		</circle>
		</g>

		<text class="total" x="50%" y="150" fill="red" text-anchor="middle">{{total}}</text>
		<text class="title" x="50%" y="180" fill="red" text-anchor="middle">{{title}}</text>

		</svg>
	</div>
</template>

<script>
export default {
	name: "meterchart",
	props: {
		title: String,
		max: Number,
		present: Number,
		away: Number,
		color: String
	},
	data: () => ({
		v_present: 0,
		v_away: 0,
		total: 0
	}),
	mounted() {
		this.v_present = 251.2 * (1 - (this.present / this.max)) + 251.2
		this.v_away = 251.2 * (1 - (this.away / this.max)) + 251.2
		this.total = this.present
	}
}
</script>


<style>
.meter {
	font-size: 1rem;
}

.meter circle{
	stroke-linecap: round;
}

.meter text.total{
	font-size: 3rem;
	font-weight: bold;
}

.meter text.title{
	font-size: 2rem;
	font-weight: bold;
}
</style>
