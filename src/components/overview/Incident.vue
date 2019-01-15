<template>
	<v-layout wrap>
		<v-flex xs12 md2>
			<toggle type="o-incident-d"></toggle>
		</v-flex>
		<v-flex xs12 md10>
			<v-layout wrap>
				<v-flex xs12>
					<toggle v-on:toggle="toggleEvent" all multilple type="o-incident-t"></toggle>
					<toggle v-on:toggle="toggleEvent" all multilple type="o-incident-h"></toggle>
				</v-flex>
				<v-flex xs12>
					<div class="d-flex">
						<span>{{typeActive}} / {{housingActive}} / {{totalDuration}}</span>
						<v-spacer></v-spacer>
						<span>{{dateTimeActive}} according to the event</span>
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
							<tr @click="dialog = true">
								<td>{{ props.item.type }}</td>
								<td>{{ props.item.time }}</td>
								<td>{{ props.item.des }}</td>
							</tr>
						</template>
					</v-data-table>
				</v-flex>
			</v-layout>
		</v-flex>
		<v-dialog v-model="dialog" max-width="480px" scrollable>
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
					<toggle all multilple type="o-incident-t"></toggle>
					<v-data-table
						:headers="headers2"
						:items="tableItems2"
						:pagination.sync="pagination2"
						:total-items="total"
						:loading="loading2"
						class="elevation-1"
						>
						<template slot="items" slot-scope="props">
							<tr @click="dialog2 = true">
								<td>{{ props.item.type }}</td>
								<td>{{ props.item.name }}</td>
							</tr>
						</template>
					</v-data-table>
				</v-card-text>
			</v-card>>
		</v-dialog>
		<v-dialog v-model="dialog2" scrollable>
			<v-card>
				<v-card-title>
					<v-toolbar card class="white">
						<v-spacer></v-spacer>
						<v-btn icon @click="dialog2 = false">
							<v-icon>close</v-icon>
						</v-btn>
					</v-toolbar>
				</v-card-title>
				<v-card-text>
					<v-layout wrap>
						<v-flex v-for="(item, i) in tableItems2" :key="'profile' + i" xs12 md4 class="pa-1">
							<v-card style="position: relative">
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
												<span>{{item.name}}</span>
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
			</v-card>>
		</v-dialog>
		</v-layout>
</template>

<script>
import toggle from "../Toggle.vue"
export default {
	name: "o-incident",
	components: {
		toggle
	},
	data: () => ({
		dialog: false,
		dialog2: false,
		total: 10,
		tableItems: [],
		tableItems2: [],
		loading: true,
		loading2: true,
		pagination: {},
		pagination2: {},
    headers: [
			{ text: 'Type', value: 'type' },
			{ text: 'Date / Time', value: 'time' },
      { text: 'Description', value: 'des' }
		],
		headers2: [
			{ text: 'Type', value: 'type' },
			{ text: 'ID / Name', value: 'name' }
		],
		dateBtn: [
			"Date/time", "Date/time", "Date/time", "Date/time"
		],
		typeActive: "All",
		housingActive: "All"
	}),
	watch: {
    pagination: {
      handler () {
				this.tableItems = []
        this.fakeGetData(this.pagination.rowsPerPage)
      },
      deep: true
		},
		pagination2: {
      handler () {
				this.tableItems2 = []
        this.fakeGetData2(this.pagination2.rowsPerPage)
      },
      deep: true
		}
	},
	computed: {
		totalDuration() {
			var ts = 0, tm = 0, th = 0;
			this.tableItems.forEach(item => {
				var s, m, h;
				s = parseInt(item.time.slice(17, 19))
				m = parseInt(item.time.slice(14, 16))
				h = parseInt(item.time.slice(11, 13))
				ts += s
				tm += m
				th += h
			})
			tm = tm + Math.floor(ts / 60)
			th = th + Math.floor(tm / 60)
			tm = tm % 60
			ts = ts % 60
			return th + ":" + tm + ":" + ts
		},
		dateTimeActive() {
			return this.$store.getters.activeFilter('o-incident-d')[0].name
		}
	},
	methods: {
		fakeGetData(number) {
			this.loading = true
			setTimeout(() => {
				this.loading = false
				var now = new Date()
				for (let i = 0; i < number; i++) {
					this.tableItems.push({
						value: false,
						type: "TYPE " + i,
						time: this.$root.dateFormated(now),
						des: "Description " + i
					})
			}
			}, 1000)
		},
		fakeGetData2(number) {
			this.loading2 = true
			setTimeout(() => {
				this.loading2 = false
				for (let i = 0; i < number; i++) {
					this.tableItems2.push({
						value: false,
						type: "TYPE " + i,
						rank: "Rank " + i,
						name: "Name " + i,
						unit: "Unit " + i,
						skill: "Skill " + i,
						location: "Location " + i,
					})
				}
			}, 1000)
		},
		getTime() {
			var now = new Date()
			return this.$root.dateFormated(now)
		},
		arrayToString(array) {
			var result = []
			array.forEach(element => {
				result.push(element.name)
			});
			return result
		},
		toggleEvent(data) {
			if (data.name == "o-incident-t") {
				this.typeActive = this.arrayToString(data.res)
			} else {
				this.housingActive = this.arrayToString(data.res)
			}
		},
	}
}
</script>
