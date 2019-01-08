<template>
	<v-layout wrap>
			<v-flex xs12 md4>
			<v-card>
				<v-card-text>
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
					<toggle	all multilple type="o-victim-c"></toggle>
					<toggle	all multilple type="o-victim-l"></toggle>
					<toggle	all multilple type="o-victim-t"></toggle>
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
import barchart from '../Barchart.vue'
import toggle from '../Toggle.vue'
export default {
	name: "o-victim",
	components: {
		barchart,
		toggle
	},
	data: () => ({
		dialog: false,
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
						rank: "Rank " + i,
						unit: "Unit" + i,
						skill: "Skill " + i
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
