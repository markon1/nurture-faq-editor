<template>
	<div class='container-fluid'>
		<div class='col-xl-4 offset-xl-4 col-lg-4 offset-lg-4 col-md-10 offset-md-1 col-sm-12 offset-sm-1 col-12 text-center'>
			<h1>FAQ Groups</h1>
			<v-expansion-panel>
				<v-expansion-panel-content v-for="faqGroup in faqGroups" :key="faqGroup._id">
					<div slot="header">{{faqGroup.name}}</div>
					<v-card>
						<FAQGroup v-bind:key="faqGroup._id" :faqGroup="faqGroup" v-on:deleteGroup="deleteGroup" v-on:modifyGroup="modifyGroup" />
					</v-card>
				</v-expansion-panel-content>
			</v-expansion-panel>
			<h2>Add New FAQ Group:</h2>

			<input class='form-control' type="text" v-model="newGroupName" placeholder="New FAQ Group Name">
			<br>
			<button class='btn btn-success' @click="addNewGroup" :disabled="!newGroupName">Add New FAQ Group</button>
			<br>
		</div>
	</div>
</template>

<script>
import axios from "axios";
import FAQGroup from "./FAQGroup";

const apiURL = "/faqGroups";

export default {
	name: "faqEditor",
	components: {
		FAQGroup: FAQGroup
	},
	data: function() {
		return {
			newGroupName: "",
			faqGroups: []
		};
	},
	mounted: function() {
		axios
			.get(apiURL)
			.then(response => {
				this.faqGroups = response.data;
			})
			.catch(error => {
				console.log(error);
			});
	},
	methods: {
		addNewGroup: function() {
			axios
				.post(apiURL, { name: this.newGroupName, articles: [] })
				.then(response => {
					this.faqGroups.push(response.data);
					this.newGroupName = "";
				})
				.catch(error => {
					console.log(error);
				});
		},
		deleteGroup: function(_id) {
			axios
				.delete(`${apiURL}/${_id}`)
				.then(response => {
					this.faqGroups = this.faqGroups.filter(fg => fg._id != _id);
				})
				.catch(error => {
					console.log(error);
				});
		},
		modifyGroup: function(faqGroup) {
			axios
				.patch(`${apiURL}/${faqGroup._id}`, faqGroup)
				.then(response => {
					const index = this.faqGroups.findIndex(fg => fg._id === faqGroup._id);
					this.faqGroups.splice(index, 1, faqGroup);
				})
				.catch(error => {
					console.log(error);
				});
		}
	}
};
</script>

<style>
.btn:not(:disabled) {
	cursor: pointer;
}
.btn:disabled {
	cursor: not-allowed;
}
</style>
