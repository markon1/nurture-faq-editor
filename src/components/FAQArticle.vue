<template>
	<div class='faqArticle'>
		<input class='form-control' v-model.lazy="faqArticle.question" type="text" placeholder="Question">
		<br>
		<textarea rows='4' class='form-control' v-model.lazy="faqArticle.answer" placeholder="Answer"></textarea>
		<br>
		<div v-if="insertingLink" class='insertLink'>
			<h4>Insert Link</h4>
			<input class='form-control' v-model.lazy="newLink.linkURL" type="text" placeholder="Link URL">
			<br>
			<input class='form-control' v-model.lazy="newLink.linkText" type="text" placeholder="Link Text">
			<br>
			<button class='btn btn-success' @click="saveLink()">Insert</button>
			<button class='btn btn-danger' @click="cancelLink()">Cancel</button>
		</div>
		<button class='btn btn-primary' @click="insertLink()">Insert Link</button>
		<button class='btn btn-danger' @click="deleteArticle()">Delete this Q/A</button>
	</div>
</template>

<script>
import axios from "axios";

export default {
	name: "faqArticle",
	props: ["faqArticle"],
	data: function() {
		return {
			insertingLink: false,
			newLink: {
				linkURL: "",
				linkText: ""
			}
		};
	},
	methods: {
		deleteArticle: function() {
			if (confirm("Are you sure you want to delete this Q/A?")) {
				this.$emit("deleteArticle", this.faqArticle);
			}
		},
		insertLink: function() {
			this.insertingLink = true;
		},
		cancelLink: function() {
			this.insertingLink = false;
			this.newLink = {
				linkURL: "",
				linkText: ""
			};
		},
		saveLink: function() {
			this.insertingLink = false;
			this.faqArticle.answer = this.faqArticle.answer + ` <a href='${this.newLink.linkURL}' target='_blank'>${this.newLink.linkText}</a>`;
			this.newLink = {
				linkURL: "",
				linkText: ""
			};
		}
	}
};
</script>

<style>
.faqArticle {
	border: 1px solid black;
	border-radius: 15px;
	margin-bottom: 10px;
	padding: 10px;
	background-color: #dedede;
}
.insertLink {
	border: 1px solid blue;
	border-radius: 15px;
	margin-bottom: 10px;
	padding: 10px;
}
</style>
