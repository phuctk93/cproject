<template>
	<div class="m-chart" @click="$emit('click')">
		<svg class="meter" xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="none"
    viewBox="0 0 300 200">

		<text text-anchor="middle" :x="lenghtToPos(0.5, 130).x" :y="lenghtToPos(0.5, 130).y">OC</text>
		<text text-anchor="middle" :x="lenghtToPos(0.7, 130).x" :y="lenghtToPos(0.7, 130).y">DC</text>
		<text text-anchor="middle" :x="lenghtToPos(0.9, 130).x" :y="lenghtToPos(0.9, 130).y">MTOC</text>
		<text text-anchor="middle" :x="lenghtToPos(1, 130).x" :y="lenghtToPos(1, 130).y">MTL</text>

		<g class="circle" transform="rotate(180, 150, 100)">
		<circle id="low" r="100" cx="50%" cy="50" :stroke="color" stroke-width="15" stroke-dasharray="150 20 30 20 30 20 44 628" fill="none">
		</circle>

		<circle r="80" cx="50%" cy="50" stroke="#ccc" stroke-width="12" stroke-dasharray="502.4" :stroke-dashoffset="v_present" fill="none">
			<animate attributeName="stroke-dashoffset" from="502.4" :to="v_present" dur="1s" />
		</circle>

		<circle r="80" cx="50%" cy="50" stroke="#1976d2" stroke-width="10" stroke-dasharray="502.4" :stroke-dashoffset="v_away" fill="none">
			<animate attributeName="stroke-dashoffset" from="502.4" :to="v_away" dur="2s" />
		</circle>
		</g>

		<text text-anchor="middle" :x="lenghtToPos(away / max / 2, 60).x" :y="lenghtToPos(away / max / 2, 60).y">{{away}}</text>
		<text text-anchor="middle" :x="lenghtToPos((present + away) / 2 / max, 60).x" :y="lenghtToPos((present + away) / 2 / max, 60).y">{{present - away}}</text>

		<text class="total" x="50%" y="150" text-anchor="middle">{{total}}</text>
		<text class="title" x="50%" y="180" text-anchor="middle">{{title}}</text>

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
	}),
	computed: {
		v_present() {
			return 251.2 * (1 - (this.present / this.max)) + 251.2
		},
		v_away() {
			return 251.2 * (1 - (this.away / this.max)) + 251.2
		},
		total() {
			return this.present
		} 
	},
	methods: {
		//S is lenght of arc, r is radius of circle
		lenghtToPos(percent, r) {
			return {
				x: 150 + (r * Math.cos(3.14 * percent + 3.14)),
				y: 150 + (r * Math.sin(3.14 * percent + 3.14))
			}
		}
	}
}
</script>


<style>
.meter {
	font-size: 1rem;
	cursor: pointer;
	
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
