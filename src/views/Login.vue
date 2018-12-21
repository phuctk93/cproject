<template>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4 class="text-xs-center">
				<v-img
          :src="require('../assets/logo.svg')"
          class="my-1"
          contain
          height="100"
        ></v-img>
				<h1>Welcome to Title</h1>
				<p>Please enter your login credentials to proceed</p>
        <v-card class="elevation-12">
          <v-card-text>
            <v-form v-model="valid" lazy-validation>
              <v-text-field v-model="user.name" prepend-icon="person" name="login" label="Login" type="text" :rules="nameRules" required></v-text-field>
              <v-text-field v-model="user.pass" id="password" prepend-icon="lock" name="password" label="Password" type="password" :rules="passRules" required></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="login()" :disabled="!valid">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
</template>

<script>
//import axios from "axios"
export default {
  data: () => ({
		valid: false,
		user: {
			name: "",
			pass: ""
		},
		nameRules: [
			v => !!v || 'Name is required',
		],
		passRules: [
			v => !!v || 'Passsword is required',
		]
	}),
	methods: {
		login() {
			//Fake login
			if (this.user.name == "test" && this.user.pass == "test") {
				this.$store.state.token = "yeye"
				this.$store.state.user.name = this.user.name
				this.$store.state.user.photo = "https://randomuser.me/api/portraits/men/85.jpg"
				this.$store.commit("showNotify", {type: "success", mess: "Successful!"})
				this.$router.push("/overview")
			} else {
				this.$store.commit("showNotify", {type: "error", mess: "Error!"})
			}
			// Real login
			/*axios.get(this.$store.state.localhost)
			.then( response => {
				this.$store.commit("showNotify", {type: "success", mess: "Successful!"})
				this.$store.state.token = response.token
				this.$store.state.user = response.user
				localStorage.setItem("token", this.$store.token)
			})
			.catch( err => {
				this.$store.commit("showNotify", {type: "error", mess: "Error: " + err.mess})
			})*/
    }
	}
}
</script>
