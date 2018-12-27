<template>
	<v-card>
		<v-card-text>
			<v-layout wrap>
				<v-flex xs12>
					<v-layout wrap>
						<v-flex>
							<v-btn v-for="(btn, i) in buttons" :key="'hfbtn' + i" class="primary">
								{{btn}}
							</v-btn>
						</v-flex>
					</v-layout>
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
export default {
	name: "h-filter",
	props: {
		list: Array
	},
	data: () => ({
		dialog: false,
		headers: [
			{ text: 'Type', value: 'type' },
			{ text: 'ID/NAME', value: 'id' },
			{ text: 'Unit', value: 'unit' },
			{ text: 'Location', value: 'location' }
		],
		buttons: [ "All", "Class A", "Class B", "Class C", "Class D" ]
	})
}
</script>
