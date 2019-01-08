<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      fixed
      app
    >
        <v-list three-line>
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <img :src="$store.state.user.photo">
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>Welcome</v-list-tile-title>
              <v-list-tile-title>{{$store.state.user.name}}</v-list-tile-title>
              <v-list-tile-title>{{now}}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      <v-list dense>
        <div v-for="item in navItems" :key="item.name">
        <v-list-group no-action v-if="item.child">
          <v-list-tile slot="activator">
            <v-list-tile-title>{{item.name}}</v-list-tile-title>
          </v-list-tile>
          <v-list-tile v-for="child in item.child" :key="child.name" @click="changeRouter(child)">
            <v-list-tile-title>{{child.name}}</v-list-tile-title>
          </v-list-tile>
          </v-list-group>
          <v-list-tile v-else @click="changeRouter(item)">
            <v-list-tile-title>{{item.name}}</v-list-tile-title>
          </v-list-tile>
        </div>
        <v-list-tile @click="logOut()">
          <v-list-tile-title>Logout</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="primary" dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn v-for="icon in icons" :key="'icon' + icon.name"
      @click="changeIncident(icon)"
      :outline="!icon.active" class="red"
      >
        {{icon.name}}
      </v-btn>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-content>
      <v-container grid-list-md>
        <router-view />
      </v-container>
    </v-content>
  </div>
</template>

<script>
  export default {
		name: "admin",
    data: () => ({
      drawer: null,
      title: "Overview",
      now: {},
			navItems: [
				{name: "Overview", path: "overview"},
				{name: "Housing", path: "housing", child: [
          {name: "Housing 1", path: "housing", id: 1},
          {name: "Housing 2", path: "housing", id: 2},
          {name: "Housing 3", path: "housing", id: 3}
        ]},
        {name: "Manpower", path: "manpower"},
        {name: "Victim", path: "victim"},
				{name: "Alert", path: "alert"}
      ],
      icons: [
        { name: "Incident A", active: false, id: 0 },
        { name: "Incident B", active: false, id: 1 },
        { name: "Incident C", active: false, id: 2 },
      ]
    }),
    props: {
      source: String
    },
    mounted() {
      var now = Date.now()
      this.now = this.$root.dateFormated(now).slice(0, 16) //get dd/mm/yyyy hh:mm
    },
		methods: {
			logOut() {
				this.$store.state.token = ""
				this.$router.push({name: "login"})
      },
      changeRouter(e) {
        this.title = e.name
        if (e.id) {
          this.$router.push("/housing/" + e.id)
        } else {
          this.$router.push({name: e.path})
        }
        this.icons.forEach( i => {
          i.active = false
        })
      },
      changeIncident(e) {
        this.title = e.name
        this.$router.push("/incident/" + e.id)
        this.icons.forEach( i => {
          i.active = false
        })
        this.icons[e.id].active = true
      }
		}
  }
</script>

<style>
#activity-list, .autoscroll {
  max-height: 80vh;
  overflow-y: auto
}
</style>
