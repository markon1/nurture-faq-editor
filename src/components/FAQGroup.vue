<template>
	<div class='faqGroup'>
		<h5>FAQ Group Name:</h5>
		<input class='form-control faqGroupName' v-model.lazy="faqGroup.name" type="text" placeholder="FAQ Group Name">
		<hr>
		<h3>Q/A s</h3>
		<FAQArticle v-for="article in faqGroup.articles" :faqArticle='article' v-on:deleteArticle="deleteArticle" v-bind:key="article.question" />
		<br>
		<div class='newArticle'>
			<h5>Add New Q/A</h5>
			<input class='form-control' v-model="newArticle.question" type="text" placeholder="New Question">
			<br>
			<textarea rows='4' class='form-control' v-model="newArticle.answer" type="text" placeholder="New Answer"></textarea>
			<br>
			<button class='btn btn-success' @click="addNewArticle()" :disabled="!newArticle.question || !newArticle.answer">Add New Q/A</button>
		</div>
		<button class='btn btn-danger' @click="deleteGroup()">Delete this FAQ Group</button>
	</div>
</template>

<script>
import axios from "axios";
import FAQArticle from "./FAQArticle";

export default {
	name: "faqGroup",
	components: {
		FAQArticle: FAQArticle
	},
	props: ["faqGroup"],
	data: function() {
		return {
			newArticle: {
				question: "",
				answer: ""
			}
		};
	},
	watch: {
		faqGroup: {
			handler(n, o) {
				console.log("group modified");
				this.$emit("modifyGroup", this.faqGroup);
			},
			deep: true
		}
	},
	methods: {
		addNewArticle: function() {
			if (!!this.newArticle.question && !!this.newArticle.answer) {
				this.faqGroup.articles.push(this.newArticle);
				this.newArticle = {
					question: "",
					answer: ""
				};
				this.$emit("modifyGroup", this.faqGroup);
			}
		},
		deleteArticle: function(article) {
			this.faqGroup.articles = this.faqGroup.articles.filter(a => a.question != article.question || a.answer != article.answer);
			this.$emit("modifyGroup", this.faqGroup);
		},
		deleteGroup: function() {
			if (confirm("Are you sure you want to delete this FAQ Group?")) {
				this.$emit("deleteGroup", this.faqGroup._id);
			}
		}
	}
};
</script>
<style>
.faqGroup {
	padding: 10px;
}

.faqGroupName {
	font-size: 25px;
	line-height: 25px;
}

.newArticle {
	border: 2px solid green;
	border-radius: 15px;
	margin-bottom: 10px;
	padding: 10px;
}
</style>
