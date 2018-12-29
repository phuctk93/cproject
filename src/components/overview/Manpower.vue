<template>
	<v-layout wrap>
		<v-flex xs12 md6 class="autoscroll">
      <barchart
      v-for="(chart, i) in charts"
      :key="'chart' + i"
      :title="chart.title"
      :labels="chart.labels"
      :range="chart.range"
      :values="chart.values"
			>
      </barchart>
		</v-flex>
		<v-flex xs12 md6>
			<toggle all multilple type="o-manpower-h"></toggle>
			<v-data-table
				:headers="headers"
				:items="tableItems"
				:pagination.sync="pagination"
				:total-items="total"
				:loading="loading"
				class="elevation-1"
			>
				<template slot="items" slot-scope="props">
					<tr>
						<td>{{ props.item.name }}</td>
						<td>{{ props.item.unit }}</td>
						<td>{{ props.item.location }}</td>
					</tr>
				</template>
			</v-data-table>
		</v-flex>
	</v-layout>
</template>

<script>
import toggle from "../Toggle.vue"
import barchart from "../Barchart.vue"

export default {
	name: "o-manpower",
	components: {
		toggle,
		barchart
	},
	data: () => ({
		headers: [
			{ text: 'Name', value: 'name' },
			{ text: 'Unit', value: 'unit' },
			{ text: 'Location', value: 'location' }
		],
		charts: [
      {
        title: "Job role A",
        values: [10, 20, 30, 50, 10],
        range: [0, 100],
        labels: ["position 1", "position 2", "position 3", "position 4", "position 5"]
      },
      {
        title: "Job role B",
        values: [20, 10, 30],
        range: [0, 100],
        labels: ["position 1", "position 2", "position 3"]
      },
      {
        title: "Job role C",
        values: [20, 10, 30],
        range: [0, 100],
        labels: ["position 1", "position 2", "position 3"]
      }
		],
		total: 10,
    tableItems: [],
    loading: true,
    pagination: {},
	}),
	watch: {
    pagination: {
      handler () {
				this.tableItems = []
        this.fakeGetData(this.pagination.rowsPerPage)
      },
      deep: true
		}
	},
	methods: {
		fakeGetData(number) {
			this.loading = true
			setTimeout(() => {
				this.loading = false
				for (let i = 0; i < number; i++) {
					this.tableItems.push({
						value: false,
						name: "Name " + i,
						unit: "Unit " + i,
						location: "Location " + i,
					})
			}
			}, 1000)
		}
	}
}
</script>
