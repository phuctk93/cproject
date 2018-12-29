<template>
	<v-layout row wrap>
		<v-flex>
			<v-btn v-if="all" color="blue" @click="toggleAll()" dark small>{{allBtn.name}}</v-btn>
			<v-btn v-for="(btn, i) in list" :key="btn.name" @click="toggle(i)" color="blue" :outline="!btn.active" :dark="btn.active" small>
				{{btn.name}}
			</v-btn>
		</v-flex>
	</v-layout>

</template>

<script>
export default {
	name: "btn-toggle",
	props: {
		type: String,
		all: Boolean,
		multilple: Boolean
	},
	data: () => ({
		allBtn: {
			name: "All",
			value: "all",
			active: true
		},
	}),
	computed: {
		list() {
			return this.$store.state.toggles[this.type]
		}
	},
	methods: {
		toggle(i) {
			if (this.allBtn.active) {
				this.allBtn.active = false
			}
			var result = { type: this.type, index: i}
			if (this.multilple) {
				this.$store.commit("activeToggle", result)
			} else {
				this.$store.commit("activeSingleToggle", result)
			}
		},
		toggleAll() {
			this.allBtn.active = true
			this.$store.commit("allToggle", this.type)
		}
	}
}
</script>
