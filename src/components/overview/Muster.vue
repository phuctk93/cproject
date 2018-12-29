<template>
	<v-layout wrap>
    <v-flex :class="full ? 'md4' : 'md12'">
      <v-layout wrap>
        <v-flex v-for="(chart, i) in charts" :key="'meter' + i" :class="'xs' + chart.size">
          <Meterchart 
          :title="chart.title"
          :max="chart.max"
          :present="chart.present"
          :away="chart.away"
          :color="chart.color"
          @click="changeMeter(i)"
          ></Meterchart>
        </v-flex>
        <v-flex xs12>
          <v-data-table
					:headers="headers"
					:items="table"
					hide-actions
					disable-initial-sort
					class="elevation-1"
					>
						<template slot="items" slot-scope="props">
							<tr>
								<td>{{ props.item.present }}</td>
								<td>{{ props.item.away }}</td>
								<td>{{ props.item.total }}</td>
							</tr>
						</template>
					</v-data-table>
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex v-if="full" xs12 md4>
			<h2>{{title}}</h2>
			<Toggle all multilple type="o-muster-h"></Toggle>
			<h2>Headcount Distribution ({{title}})</h2>
			<Barchart
			:title="barchart.title"
      :labels="barchart.labels" 
      :range="barchart.range" 
      :values="barchart.values">></Barchart>
    </v-flex>
    <v-flex v-if="full" xs12 md4>
			<Toggle all multilple type="o-muster-t"></Toggle>
			<v-data-table
			:headers="type.headers"
			:items="type.list"
			class="elevation-1"
			>
				<template slot="items" slot-scope="props">
					<tr>
						<td>{{ props.item.type }}</td>
						<td>{{ props.item.id }}</td>
						<td>{{ props.item.location }}</td>
						<td>{{ props.item.unit }}</td>
					</tr>
				</template>
			</v-data-table>
    </v-flex>
  </v-layout>
</template>

<script>
import Meterchart from '../Meterchart.vue'
import Barchart from '../Barchart.vue'
import Toggle from '../Toggle.vue'
export default {
	name: "o-muster",
	components: {
		Meterchart,
		Barchart,
		Toggle
	},
	data: () => ({
		charts: [
			{
				title: "HU 1",
				max: 100,
				present: 80,
				away: 50,
				color: "#99f",
				size: 3
			},
			{
				title: "HU 2",
				max: 100,
				present: 50,
				away: 45,
				color: "#9f9",
				size: 3
			},
			{
				title: "HU 3",
				max: 100,
				present: 90,
				away: 50,
				color: "#f99",
				size: 3
			},
			{
				title: "HU 4",
				max: 100,
				present: 100,
				away: 50,
				color: "#9ff",
				size: 3
			},
		],
		headers: [
			{ text: "Present", value: "present" },
			{ text: "Away", value: "away" },
			{ text: "Total", value: "total" },
		],
		type: {
			headers: [
				{ text: "Type", value: "type" },
				{ text: "ID/Name", value: "id" },
				{ text: "Location", value: "location" },
				{ text: "Unit", value: "unit" },
			],
			list: [
				{ type: "Type A", id: "Name A", location: "Location A", unit: "Unit A"},
				{ type: "Type B", id: "Name B", location: "Location B", unit: "Unit B"},
				{ type: "Type C", id: "Name C", location: "Location C", unit: "Unit C"},
				{ type: "Type D", id: "Name D", location: "Location D", unit: "Unit D"},
			]
		},
		barchart: {
      title: "",
      values: [10, 20, 30, 50, 10],
      range: [0, 100],
      labels: ["position 1", "position 2", "position 3", "position 4", "position 5"]
    },
		full: false
	}),
	computed: {
		table() {
      var table = [{
        present: 0,
				away: 0,
				total: 0
      }]
      for (let i = 0; i < this.charts.length; i++) {
        const chart = this.charts[i];
        table[0].present += chart.present
        table[0].away += chart.away
			}
			table[0].total = table[0].present + table[0].away
      return table
		},
		title() {
			return this.charts[0].title
		}
	},
	methods: {
		changeMeter(index) {
			var first = this.charts[index]
      this.charts.splice(index, 1)
      this.charts.unshift(first)
      for (let i = 0; i < this.charts.length; i++) {
        const chart = this.charts[i];
        if ( i == 0) {
          chart.size = 12
        } else {
          chart.size = 4
        }
      }
			this.$emit("changeMeter")
			this.full = true
		}
	}
}
</script>
