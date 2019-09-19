<template>
	<v-container>
		<v-layout>

			<v-btn @click="createNewValueUnit">Werteinheit hinzufügen</v-btn>
			<v-card	class="mx-auto" width="600" tile>
				<v-toolbar color="white" flat>
					<v-btn icon light>
						<v-icon color="grey darken-2">mdi-arrow-left</v-icon>
					</v-btn>
					<v-toolbar-title class="grey--text text--darken-4">Test-Folder</v-toolbar-title>
					<div class="flex-grow-1"></div>
					<v-subheader right><v-icon left>mdi-account</v-icon> N. N.</v-subheader>
				</v-toolbar>
				<v-list>
					<v-list-item two-line v-for="valueUnit in valueUnits" :key="valueUnit.id">
						<v-list-item-content>
							<v-list-item-title>
								{{valueUnit.name}}
								<v-icon @click="deleteExistingValueUnit(valueUnit)">mdi-delete</v-icon>
							</v-list-item-title>
							<v-list-item-subtitle>{{valueUnit.content}}</v-list-item-subtitle>
						</v-list-item-content>
					</v-list-item>
				</v-list>
			</v-card>
		</v-layout>
	</v-container>
</template>

<script>
	import API, {graphqlOperation} from '@aws-amplify/api';
	import {createValueUnit, deleteValueUnit} from "../graphql/mutations";
	import {onCreateValueUnit, onDeleteValueUnit} from '../graphql/subscriptions';
	import {listValueUnits} from '../graphql/queries';

	export default {
		name: 'ValueUnitList',
		data() {
			return {
				valueUnits: []
			}
		},
		methods: {
			async deleteExistingValueUnit(valueUnit) {
				await API.graphql(graphqlOperation(deleteValueUnit, {input: {id: valueUnit.id}}))
			},
			async createNewValueUnit() {
				const valueUnit = {name: "Use AppSync", content: "Realtime and Offline"};
				await API.graphql(graphqlOperation(createValueUnit, {input: valueUnit}))
			},
			async getData() {
				const valueUnitData = await API.graphql(graphqlOperation(listValueUnits));
				this.valueUnits.push(...this.valueUnits, ...valueUnitData.data.listValueUnits.items);
			},
			subscribe() {
				API.graphql(graphqlOperation(onCreateValueUnit)).subscribe({
					next: (eventData) => {
						const valueUnit = eventData.value.data.onCreateValueUnit;
						this.valueUnits.push(valueUnit);
					}
				})
				API.graphql(graphqlOperation(onDeleteValueUnit)).subscribe({
					next: (eventData) => {
						const valueUnit = eventData.value.data.onDeleteValueUnit;
						this.valueUnits = this.valueUnits.filter(function (el) {
							return el.id !== valueUnit.id;
						});
					}
				})
			}
		},
		created() {
			this.getData();
			this.subscribe();
		}
	};

</script>
