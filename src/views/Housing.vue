<template>
	<v-layout wrap>
		<!-- Activity and map area -->
		<v-flex xs12 md8>
			<activity></activity>
		</v-flex>

		<!-- Muster area -->
		<v-flex xs12 md4>
			<muster :id="id"></muster>
		</v-flex>

		<!-- Event area -->
		<v-flex xs12 md8>
			<event></event>
		</v-flex>

		<!-- Filter area -->
		<v-flex xs12 md4>
			<hfilter></hfilter>
		</v-flex>

	</v-layout>
</template>

<script>
import hfilter from '../components/housing/Filter.vue'
import activity from '../components/housing/Activity.vue'
import muster from '../components/housing/Muster.vue'
import event from '../components/housing/Event.vue'

export default {
	props: {
		id: String
	},
	components: {
		hfilter,
		activity,
		muster,
		event
	},
	data: () => ({

	}),

}
</script>
