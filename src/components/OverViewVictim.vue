<template>
	<v-layout wrap>
			<v-flex xs12 md4>
			<v-card>
				<v-card-text id="manpower">
					<barchart
            v-for="(chart, i) in charts"
            :key="'chart' + i"
            :title="chart.title"
            :labels="chart.labels" 
            :range="chart.range" 
            :values="chart.values">
          </barchart>
				</v-card-text>
			</v-card>
		</v-flex>
		<v-flex xs12 md8>
			<v-layout wrap>
				<v-flex xs12>
					<div v-for="(gbtn, i) in buttons" :key="'govbtn' + i" class="mb-2">
					<v-btn-toggle>
						<v-btn v-for="(btn, j) in gbtn.list" :key="'ovbtn' + j">{{btn}}</v-btn>
					</v-btn-toggle>
					</div>
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
							<tr>
								<td>{{ props.item.name }}</td>
								<td>{{ props.item.type }}</td>
								<td>{{ props.item.location }}</td>
								<td>{{ props.item.class }}</td>
								<td>{{ props.item.hname }}</td>
							</tr>
						</template>
					</v-data-table>
				</v-flex>
			</v-layout>
		</v-flex>
		</v-layout>
</template>

<script>
import barchart from '../components/Barchart.vue'
export default {
	name: "o-victim",
	components: {
		barchart
	},
	data: () => ({
		charts: [
			{
				title: "By class",
				values: [10, 20, 30, 50, 10],
				range: [0, 100],
				labels: ["position 1", "position 2", "position 3", "position 4", "position 5"]
			},
			{
				title: "By location",
				values: [20, 10, 30],
				range: [0, 100],
				labels: ["position 1", "position 2", "position 3"]
			}
		],
		total: 10,
    tableItems: [],
    loading: true,
    pagination: {},
    headers: [
      { text: 'NAME', value: 'name' },
      { text: 'Type', value: 'type' },
      { text: 'Location', value: 'location' },
			{ text: 'Class', value: 'class' },
			{ text: 'Hospital Name', value: 'hname' },
		],
		buttons: [
			{ list: ["All", "Class A", "Class B", "Class C", "Class D"] },
			{ list: ["All", "Location A", "Location B", "Location C"] },
			{ list: ["All", "Type A", "Type B", "Type C", "Type D"] },
		]
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
						type: "TYPE " + i,
						class: "Class " + i,
						name: "Name " + i,
						hname: "Hospital name " + i,
						location: "Location " + i,
					})
			}
			}, 1000)
		}
	}
}
</script>
