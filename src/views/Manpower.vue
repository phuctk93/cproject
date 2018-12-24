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
					<div v-for="(gbtn, i) in buttons" :key="'gbtn' + i" class="mb-2">
					<v-btn-toggle>
						<v-btn v-for="(btn, j) in gbtn.list" :key="'btn' + j">{{btn}}</v-btn>
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
							<tr @click="dialog = !dialog">
								<td>{{ props.item.type }}</td>
								<td>{{ props.item.rank }}</td>
								<td>{{ props.item.id }}</td>
								<td>{{ props.item.unit }}</td>
								<td>{{ props.item.skill }}</td>
								<td>{{ props.item.location }}</td>
							</tr>
						</template>
					</v-data-table>
				</v-flex>
			</v-layout>
		</v-flex>
		<v-dialog v-model="dialog" scrollable>
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
                  ></v-img>
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
		</v-dialog>
	</v-layout>
</template>

<script>
import barchart from '../components/Barchart.vue'
export default {
	name: "manpower",
	components: {
    barchart
  },
	data: () => ({
		dialog: false,
		charts: [
      {
        title: "Chart 1",
        values: [10, 20, 30, 50, 10],
        range: [0, 100],
        labels: ["position 1", "position 2", "position 3", "position 4", "position 5"]
      },
      {
        title: "Chart 2",
        values: [20, 10, 30],
        range: [0, 100],
        labels: ["position 1", "position 2", "position 3"]
      },
      {
        title: "Chart 3",
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
			{ text: 'Type', value: 'type' },
			{ text: 'Rank', value: 'rank' },
			{ text: 'ID/NAME', value: 'id' },
			{ text: 'Unit', value: 'unit' },
			{ text: 'Skill', value: 'skill' },
      { text: 'Location', value: 'location' },
		],
		buttons: [
			{ list: ["All", "Status A", "Status B", "Status C", "Status D"] },
			{ list: ["All", "Skill A", "Skill B", "Skill C", "Skill D"] },
			{ list: ["All", "Unit A", "Unit B", "Unit C", "Unit D"] },
			{ list: ["All", "Housing A", "Housing B", "Housing C", "Housing D"] },
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
						rank: "Rank " + i,
						id: "Name " + i,
						unit: "Unit " + i,
						skill: "Skill " + i,
						location: "Location " + i,
					})
			}
			}, 1000)
		},
		getTime() {
			var now = new Date(Date.now())
			return now.getDate() + "/" + now.getMonth() + "/" + now.getFullYear() + " " + now.getHours() + ":" + now.getMinutes()
		}
	}
}
</script>

<style>

</style>
