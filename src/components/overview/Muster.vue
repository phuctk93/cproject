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
					:headers="gHeaders"
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
      :values="barchart.values"></Barchart>
    </v-flex>
    <v-flex v-if="full" xs12 md4>
			<Toggle all multilple type="o-muster-t"></Toggle>
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
						<td>{{ props.item.type }}</td>
						<td>{{ props.item.id }}</td>
						<td>{{ props.item.location }}</td>
						<td>{{ props.item.unit }}</td>
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
		dialog: false,
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
		//Header for graph
		gHeaders: [
			{ text: "Present", value: "present" },
			{ text: "Away", value: "away" },
			{ text: "Total", value: "total" },
		],
		//Header for data
		headers: [
				{ text: "Type", value: "type" },
				{ text: "ID/Name", value: "id" },
				{ text: "Location", value: "location" },
				{ text: "Unit", value: "unit" },
		],
		total: 10,
    tableItems: [],
    loading: true,
    pagination: {},
		barchart: {
      title: "",
      values: [10, 20, 30, 50, 10],
      range: [0, 100],
      labels: ["position 1", "position 2", "position 3", "position 4", "position 5"]
    },
		full: false
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
			var now = Date.now()
			return this.$root.dateFormated(now).slice(0, 16)
		},
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
