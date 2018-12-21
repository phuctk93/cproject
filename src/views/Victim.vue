<template>
	<v-layout wrap>
		<v-flex v-for="(chart, i) in charts" :key="'chart' + i" xs12 md4>
			<v-card>
				<v-card-text>
					<barchart
						:title="chart.title"
						:labels="chart.labels" 
						:range="chart.range" 
						:values="chart.values">
					</barchart>
				</v-card-text>
			</v-card>
		</v-flex>
		<v-flex xs12>
			<v-data-table
				:headers="headers"
				:items="tableItems"
				:pagination.sync="pagination"
				:total-items="total"
				:loading="loading"
				class="elevation-1"
			>
				<template slot="items" slot-scope="props">
					<td>{{ props.item.cat }}</td>
					<td>{{ props.item.type }}</td>
					<td>{{ props.item.id }}</td>
					<td>{{ props.item.location }}</td>
					<td>{{ props.item.support }}</td>
					<td>{{ props.item.status }}</td>
					<td>{{ props.item.updated }}</td>
				</template>
			</v-data-table>
		</v-flex>
	</v-layout>
</template>

<script>
import barchart from '../components/Barchart.vue'
export default {
	name: "victim",
	components: {
    barchart
  },
	data: () => ({
		charts: [
			{
				title: "Type",
				values: [10, 20, 30, 50, 10, 75],
				range: [0, 100],
				labels: ["type 1", "type 2", "type 3", "type 4", "type 5", "type 6"]
			},
			{
				title: "Category",
				values: [10, 30, 20, 60],
				range: [0, 100],
				labels: ["category 1", "category 2", "category 3", "category 4"]
			},
			{
				title: "Housing",
				values: [15, 20, 80, 10],
				range: [0, 100],
				labels: ["housing 1", "housing 2", "housing 3", "housing 4", "housing 5"]
			},
		],
		total: 10,
    tableItems: [],
    loading: true,
    pagination: {},
    headers: [
          { text: 'CAT', value: 'cat' },
          { text: 'Type', value: 'type' },
          { text: 'ID/NAME', value: 'id' },
          { text: 'Location', value: 'location' },
          { text: 'Support', value: 'support' },
					{ text: 'Status', value: 'status' },
					{ text: 'Last Updated', value: 'updated' },
		]
	}),
	mounted() {
		this.tableItems = []
		this.fakeGetData(5)
	},
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
			var now = new Date(Date.now())
      var fakeDate = now.getDate() + "/" + now.getMonth() + "/" + now.getFullYear() + " " + now.getHours() + ":" + now.getMinutes()
			setTimeout(() => {
				this.loading = false
				for (let i = 0; i < number; i++) {
					this.tableItems.push({
						value: false,
						cat: "CAT " + i,
						type: "TYPE " + i,
						id: "Name " + i,
						location: "Location " + i,
						support: "Support " + i,
						status: "status " + i,
						updated: fakeDate
					})
			}
			}, 1000)
		}
	}
}
</script>