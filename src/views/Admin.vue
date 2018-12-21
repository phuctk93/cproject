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
      <v-btn>USER PROFILE</v-btn>
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
			]
    }),
    props: {
      source: String
    },
    mounted() {
      var now = new Date(Date.now())
      this.now = now.getDate() + "/" + now.getMonth() + "/" + now.getFullYear() + " " + now.getHours() + ":" + now.getMinutes()
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
      }
		}
  }
</script>