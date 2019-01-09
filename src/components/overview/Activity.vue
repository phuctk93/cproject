<template>
	<v-layout wrap>
    <v-flex xs12 md2>
      <toggle type="o-map-l"></toggle>
    </v-flex>
    <v-flex xs12 md6>
      <dragcamera
      @click="showDialog('cam')"
      :cameras="cameras"
      :circles="circles">
      </dragcamera>
    </v-flex>
    <v-flex xs12 md4>
      <v-card>
        <v-card-title>
          <v-spacer></v-spacer>
          <v-btn @click="showDialog('filter')" class="primary d-block">Filter icon</v-btn>
          <toggle all multilple type="o-map-h"></toggle>
          <toggle all multilple type="o-map-t"></toggle>
          <toggle all multilple type="o-map-a"></toggle>
        </v-card-title>
        <v-card-text id="activity-list">
          <div v-for="(item, i) in list" :key="'alist' + i" class="row">
            <div class="d-flex wrap" @click="showDialog('personel')" style="cursor: pointer">
              <b>{{ item.title }}</b>
              <v-spacer></v-spacer>
              <b>{{ item.date }}</b>
            </div>
            <div>{{ item.description }}</div>
            <v-divider
              v-if="i + 1 < list.length"
              :key="i"
              class="mb-2"
            ></v-divider>
          </div>
        </v-card-text>
      </v-card>
    </v-flex>
		<v-dialog v-model="dialog" scrollable :max-width="dialogName == 'filter' ? '480px' : '100%'">
			<v-card>
				<v-card-title>
					<v-toolbar card class="white">
            <h2 v-if="dialogName == 'filter'">Filter</h2>
            <h2 v-if="dialogName == 'personel'">Personel in [Housing] [Location]</h2>
						<v-spacer></v-spacer>
						<v-btn icon @click="dialog = false">
							<v-icon>close</v-icon>
						</v-btn>
					</v-toolbar>
				</v-card-title>
				<v-card-text v-if="dialogName == 'cam'">
					<dragcamera
					:editable="true"
					:cameras="cameras"
					:circles="circles">
					</dragcamera>
				</v-card-text>
        <v-card-text v-if="dialogName == 'personel'">
					<toggle all multilple type="o-map-t"></toggle>
          <v-data-table
          :headers="headers"
          :items="tableItems"
          :pagination.sync="pagination"
          :total-items="total"
          :loading="loading"
          class="elevation-1"
          >
            <template slot="items" slot-scope="props">
              <tr @click="dialogCard = true">
                <td>{{ props.item.type }}</td>
                <td>{{ props.item.name }}</td>
              </tr>
            </template>
          </v-data-table>
				</v-card-text>
        <v-card-text v-if="dialogName == 'filter'">
          <v-layout wrap>
            <v-flex xs12>
              <h3>Quick select</h3>
            </v-flex>
            <v-flex xs12>
              <v-btn v-for="(quick, i) in quicks" :key="'btn-quick' + i" @click="toggleQuick(i)"
              class="blue" :dark="!selectQuick(i)" :outline="selectQuick(i)">
                {{quick.name}}
              </v-btn>
            </v-flex>
            <v-flex xs12>
              <h3>Or select date range</h3>
            </v-flex>
            <v-flex xs6 v-for="(item, i) in date" :key="'menu' + i">
              <v-menu
              :ref="'menu'+ i"
              :close-on-content-click="false"
              v-model="item.show"
              :nudge-right="40"
              :return-value.sync="item.value"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              min-width="290px"
              >
                <v-text-field
                slot="activator"
                v-model="item.formated"
                :label="item.label"
                readonly
                ></v-text-field>
                <v-date-picker v-if="i % 2 == 0" v-model="item.value" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn flat color="primary" @click="item.show = false">Cancel</v-btn>
                  <v-btn flat color="primary" @click="save(i, item.value)">OK</v-btn>
                </v-date-picker>
                <v-time-picker v-else v-model="item.value">
                  <v-spacer></v-spacer>
                  <v-btn flat color="primary" @click="item.show = false">Cancel</v-btn>
                  <v-btn flat color="primary" @click="save(i, item.value)">OK</v-btn>
                </v-time-picker>
              </v-menu>
            </v-flex>
          </v-layout>
				</v-card-text>
        <v-card-actions v-if="dialogName == 'filter'">
          <v-btn @click="filterApply()" class="primary">Filter</v-btn>
          <v-btn @click="clear()" class="primary">Clear filter</v-btn>
        </v-card-actions>
			</v-card>
		</v-dialog>
    <v-dialog v-model="dialogCard" scrollable>
			<v-card>
				<v-card-title>
					<v-toolbar card class="white">
						<v-spacer></v-spacer>
						<v-btn icon @click="dialogCard = false">
							<v-icon>close</v-icon>
						</v-btn>
					</v-toolbar>
				</v-card-title>
				<v-card-text>
					<v-layout wrap>
						<v-flex v-for="(item, i) in tableItems" :key="'profile' + i" xs12 md4 class="pa-1">
							<v-card style="position: relative">
                <div class="cirType" :style="'background-color: ' + typeColor(i)">
                  {{item.type}}
                </div>
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
			</v-card>
		</v-dialog>
  </v-layout>
</template>

<script>
import dragcamera from '../DragCamera.vue'
import toggle from '../Toggle.vue'
export default {
	name: "o-activity",
	components: {
    dragcamera,
    toggle
	},
	data: () => ({
    dialog: false,
    dialogCard: false,
    dialogName: "cam",
    total: 10,
    tableItems: [],
    loading: true,
    pagination: {},
    headers: [
			{ text: 'Name', value: 'name' },
			{ text: 'Type', value: 'type' }
		],
    cameras: [{id: 0, link: "", cid: 0}],
    //Thanks for public viedo link at https://gist.github.com/jsturgis/3b19447b304616f18657
    circles: [
      {x: -61.10059, y: 36.291668, signed: false, fill: "#fff", video: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"},
      {x: -67.148209, y: 203.35715, signed: false, fill: "#fff", video: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"},
      {x: 264.7149, y: 167.07143, signed: false, fill: "#fff", video: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4"},
      {x: 4.6672826, y: 220.74405, signed: false, fill: "#fff", video: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"},
      {x: 75.726807, y: 143.63692, signed: false, fill: "#fff", video: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4"},
      {x: 177.02443, y: 63.505955, signed: false, fill: "#fff", video: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"},
      {x: 149.05418, y: 237.375, signed: false, fill: "#fff", video: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"}
    ],
    list: [
      { title: "HU/Type/Activity", date: "01/01/2019 12:00", description: "Description"},
      { title: "HU/Type/Activity", date: "01/01/2019 12:00", description: "Description"},
      { title: "HU/Type/Activity", date: "01/01/2019 12:00", description: "Description"},
      { title: "HU/Type/Activity", date: "01/01/2019 12:00", description: "Description"},
      { title: "HU/Type/Activity", date: "01/01/2019 12:00", description: "Description"},
      { title: "HU/Type/Activity", date: "01/01/2019 12:00", description: "Description"}
    ],
    quicks: [
      { name: "Past 1 hour", value: 1000 },
      { name: "Past 3 hour", value: 3000 },
      { name: "Past 6 hour", value: 6000 },
    ],
    currentQuick: 4,
    date: [
			//Start
			{ label: "Start date", show: false, value: new Date().toISOString().substr(0, 10), formated: "" },
			{ label: "Start time", show: false, value: "00:00", formated: "" },
			//End
			{ label: "End date", show: false, value: new Date().toISOString().substr(0, 10), formated: "" },
			{ label: "End time", show: false, value: "00:00", formated: "" }
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
    showDialog(name) {
      this.dialogName = name
      this.dialog = true
    },
    toggleQuick(number) {
      this.currentQuick = number
      this.date.forEach(d => {
        d.show = false
        d.formated = ""
      })
    },
    selectQuick(number) {
      return this.currentQuick != number
    },
    save(index, value) {
      this.currentQuick = 4
			var date = this.date[index]
			if (index % 2 == 0) {
				date.formated = this.$root.dateFormated(value).slice(0, 10)
			} else {
				date.formated = this.date[index].value
			}
			date.show = false
    },
    filterApply() {
      var start, end
      if (this.currentQuick != 4) {
        start = Date.now()
        end = start + this.quicks[this.currentQuick].value * 3600 //
      } else {
        start = Date.parse(this.date[0].value + " " + this.date[1].value)
        end = Date.parse(this.date[2].value + " " + this.date[3].value)
      }
      //Send to server start and end
      console.log("start: " + start + ", end: " + end)
    },
    clear() {
      this.date.forEach(d => {
        d.show = false
        d.formated = ""
      })
      this.currentQuick = 4
    },
    fakeGetData(number) {
			this.loading = true
			setTimeout(() => {
				this.loading = false
				for (let i = 0; i < number; i++) {
					this.tableItems.push({
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
			var now = Date.now()
			return this.$root.dateFormated(now).slice(0, 16)
    },
    typeColor(number) {
      return number % 2 == 0 ? "#f55" : "#5f5"
    }
  }
}
</script>

<style>
.cirType {
  position: absolute;
  border-radius: 50%;
  right: 8px;
  line-height: 48px;
  padding: 4px;
}
</style>
