<template>
	<v-card>
		<v-card-text>
			<v-layout wrap>
			<v-flex xs12 md6>
				<h2>Muster</h2>
			</v-flex>
			<v-flex xs12 md6>
				<Meterchart 
          :title="'HU' + id"
          :max="chart.max"
          :present="chart.present"
          :away="chart.away"
          :color="chart.color"
        ></Meterchart>
			</v-flex>
			<v-flex xs12>
				<Barchart
					:title="barchart.title"
					:labels="barchart.labels" 
					:range="barchart.range" 
					:values="barchart.values">
				</Barchart>
			</v-flex>
			</v-layout>
		</v-card-text>
	</v-card>
</template>

<script>
import Meterchart from '../Meterchart.vue'
import Barchart from '../Barchart.vue'
export default {
	name: "h-muster",
	props: {
		id: String
	},
	components: {
		Meterchart,
		Barchart
	},
	data: () => ({
		chart: {
			max: 100,
			present: 80,
			away: 50,
			color: "#99f",
			size: 3
		},
		barchart: {
      title: "",
      values: [10, 20, 30, 50, 10],
      range: [0, 100],
      labels: ["position 1", "position 2", "position 3", "position 4", "position 5"]
    }
	})
}
</script>
