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
					<tr @click="dialog = true">
						<td>{{ props.item.cat }}</td>
						<td>{{ props.item.type }}</td>
						<td>{{ props.item.id }}</td>
						<td>{{ props.item.location }}</td>
						<td>{{ props.item.support }}</td>
						<td>{{ props.item.status }}</td>
						<td>{{ props.item.updated }}</td>
					</tr>
				</template>
			</v-data-table>
		</v-flex>
		<v-dialog v-model="dialog" scrollable>
			<v-card>
				<v-card-title>
					<v-toolbar card class="white">
						<v-spacer></v-spacer>
						<v-btn icon @click="dialog = false">
							<v-icon>close</v-icon>
						</v-btn>
					</v-toolbar>
				</v-card-title>
				<v-card-text>
					<v-layout wrap>
						<v-flex v-for="(item, i) in tableItems" :key="'profile' + i" xs12 md4 class="pa-1">
							<v-card>
								<v-card-text>
									<v-layout wrap>
										<v-flex xs4>
											<v-img
												:src="$store.state.user.photo"
												height="130px"
												contain
											>
											</v-img>
											<div class="text-xs-center">
												<p>ROLE</p>
											</div>
										</v-flex>
										<v-flex xs8>
											<div class="px-2">
											<div class="mb-1">
												<b>Name: </b>
												<span>{{item.id}}</span>
											</div>
											<div class="mb-1">
												<b>Rank: </b>
												<span>{{item.rank}}</span>
											</div>
											<div class="mb-1">
												<b>Type: </b>
												<span>{{item.type}}</span>
											</div>
											<div class="mb-1">
												<b>Unit: </b>
												<span>{{item.unit}}</span>
											</div>
											<div class="mb-1">
												<b>Skill: </b>
												<span>{{item.skill}}</span>
											</div>
											<div class="mb-1">
												<b>Location: </b>
												<span>{{item.location}}</span>
											</div>
											</div>
										</v-flex>
										<v-flex xs12 class="text-xs-center">
											<p>Check-in time: {{getTime()}}</p>
										</v-flex>
									</v-layout>
								</v-card-text>
							</v-card>
						</v-flex>
					</v-layout>
				</v-card-text>
			</v-card>
		</v-dialog>
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
		dialog: false,
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
						cat: "CAT " + i,
						type: "TYPE " + i,
						id: "Name " + i,
						location: "Location " + i,
						support: "Support " + i,
						status: "status " + i,
						rank: "Rank " + i,
						skill: "Skill " + i,
						unit: "Unit" + i,
						updated: this.getTime()
					})
			}
			}, 1000)
		},
		getTime() {
			var now = Date.now()
			return this.$root.dateFormated(now).slice(0, 16)
		}
	}
}
</script>