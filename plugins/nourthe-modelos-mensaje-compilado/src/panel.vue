<template>
	<div class="text" :class="{ 'has-header': showHeader }">
		Seleccionaste el curso: {{ course }}, y la semana: {{ week }}
	</div>
	<div class="text" :class="{ 'has-header': showHeader }">
		<div v-for="message in messages" :key="message.id">
			<h2>Título: {{ message.title }}</h2>
			<div v-html="message.message"></div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useApi, useStores } from '@directus/extensions-sdk';

const COURSE_DURATION_IN_WEEKS = 14;

export default defineComponent({
	data() {
		return {
			directusApi: null,
			messages: {} as any,
		};
	},
	props: {
		showHeader: {
			type: Boolean,
			default: false,
		},
		course: {
			type: String,
			default: '',
		},
		week: {
			type: String,
			default: '',
		},
	},
	methods: {
		async compileMessage() {
			const currentEditions = await this.directusApi.get('/items/editions')
				.then((res) => res.data.data)
				.then((editions) => {
					if (this.course === '') {
						const currentEditions = editions.filter(currentEditionFilter);
						return currentEditions;
					}
				})
			this.messages = await this.directusApi.get('/items/messages')
				.then((res) => res.data.data)
			console.log(this.messages)
		}
	},
	watch: {
		course: 'compileMessage',
		week: 'compileMessage',
	},
	mounted() {
		this.directusApi = useApi();
		this.compileMessage();
	},
});

const currentEditionFilter = (edition) => {
	const today = new Date();
	const startDate = new Date(edition.starting_day);
	const endDate = dateAddWeeks(startDate, COURSE_DURATION_IN_WEEKS);
	console.debug({ edition: edition.id, startDate, endDate, today })
	return startDate <= today && endDate >= today;
}

function dateAddWeeks(dateObj: Date, numberOfWeeks: number) {
	const newDate = new Date()
	newDate.setDate(
		dateObj.getDate() + numberOfWeeks * 7
	)
	return newDate
}

</script>

<style scoped>
.text {
	padding: 12px;
}

.text.has-header {
	padding: 0 12px;
}
</style>
