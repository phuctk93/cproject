<template>
	<v-card>
		<v-card-text>
			<v-layout wrap>
				<v-flex xs12>
					<toggle all multilple type="housing">
					</toggle>
				</v-flex>
				<v-flex xs12></v-flex>
			</v-layout>
			<v-data-table
				:headers="headers"
				:items="list"
				class="elevation-1"
				>
				<template slot="items" slot-scope="props">
					<tr @click="dialog = !dialog">
						<td>{{ props.item.type }}</td>
						<td>{{ props.item.id }}</td>
						<td>{{ props.item.unit }}</td>
						<td>{{ props.item.location }}</td>
					</tr>
				</template>
			</v-data-table>
		</v-card-text>
	</v-card>
</template>

<script>
import toggle from "../Toggle.vue"
export default {
	name: "h-filter",
	props: {
		list: Array
	},
	components: {
		toggle
	},
	data: () => ({
		dialog: false,
		headers: [
			{ text: 'Type', value: 'type' },
			{ text: 'ID/NAME', value: 'id' },
			{ text: 'Unit', value: 'unit' },
			{ text: 'Location', value: 'location' }
		]
	}),
	methods: {
		toggleFilter(data) {
			var type = data.type
			var value = data.value
			if (value != "all") {
				var btn = this.buttons[value]
				btn.active = !btn.active
				console.log(type)
			}
			else {
				this.buttons.forEach(btn => {
					btn.active = false
				});
				console.log("all")
			}
		}
	}
}
</script>
