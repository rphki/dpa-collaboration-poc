<template>
	<v-btn @click="createNewValueUnit">Werteinheit hinzufügen</v-btn>
</template>

<script>
	import API, {graphqlOperation} from '@aws-amplify/api';
	import {createValueUnit} from "../graphql/mutations";

	export default {
		name: 'ValueUnitAdd',
		methods: {
			async createNewValueUnit() {
				const valueUnit = {name: "Use AppSync", content: "Realtime and Offline"};
				await API.graphql(graphqlOperation(createValueUnit, {input: valueUnit}))
			}
		}
	}
</script>
