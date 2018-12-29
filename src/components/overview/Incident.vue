<template>
	<v-layout wrap>
		<v-flex xs12 md2>
			<toggle type="o-incident-d"></toggle>
		</v-flex>
		<v-flex xs12 md10>
			<v-layout wrap>
				<v-flex xs12>
					<toggle all multilple type="o-incident-t"></toggle>
					<toggle all multilple type="o-incident-h"></toggle>
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
								<td>{{ props.item.type }}</td>
								<td>{{ props.item.status }}</td>
								<td>{{ props.item.location }}</td>
								<td>{{ props.item.updated }}</td>
								<td>{{ props.item.hname }}</td>
								<td>{{ props.item.action }}</td>
							</tr>
						</template>
					</v-data-table>
				</v-flex>
			</v-layout>
		</v-flex>
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
		total: 10,
    tableItems: [],
    loading: true,
    pagination: {},
    headers: [
			{ text: 'Support Type', value: 'type' },
			{ text: 'Status', value: 'status' },
      { text: 'Location', value: 'location' },
			{ text: 'Last updated', value: 'updated' },
			{ text: 'Hospital Name', value: 'hname' },
			{ text: 'Action taken', value: 'action' }
		],
		dateBtn: [
			"Date/time", "Date/time", "Date/time", "Date/time"
		],
		buttons: [
			{ list: ["All", "Incident Type A", "Incident Type B", "Incident Type C", "Incident Type D"] },
			{ list: ["All", "Housing A", "Housing B", "Housing C"] }
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
						status: "Status " + i,
						name: "Name " + i,
						hname: "Hospital name " + i,
						location: "Location " + i,
						action: "Action " + i,
						updated: this.getTime()
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
