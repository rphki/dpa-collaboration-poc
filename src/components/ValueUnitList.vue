<template>
	<v-container>
		<v-layout>

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
								<v-icon @click="deleteExistingValueUnit(valueUnit)">mdi-delete</v-icon>
								{{valueUnit.name}}
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
	import {deleteValueUnit} from "../graphql/mutations";
	import {onCreateValueUnit, onDeleteValueUnit} from '../graphql/subscriptions';
	import {listValueUnits} from '../graphql/queries';
	import gql from 'graphql-tag';


	export default {
		name: 'ValueUnitList',
		props: ['client'],
		data() {
			return {
				valueUnits: [],
				sClient: this.client,
				createSub: null,
				deleteSub: null
			}
		},
		methods: {
			async deleteExistingValueUnit(valueUnit) {
				//await API.graphql(graphqlOperation(deleteValueUnit, {input: {id: valueUnit.id}}))
				await this.sClient.mutate({
					mutation: gql(deleteValueUnit),
					variables: {
						input: {id: valueUnit.id}
					},
					optimisticResponse: () => {
						const xx = {
							__typename: 'ValueUnit',
							id: valueUnit.id,
							...valueUnit
						};
						return {
							deleteValueUnit: xx
						}
					},
					update: (cache, { data: { deleteValueUnit } }) => {
						const query = gql(listValueUnits);
						try {
							const data = cache.readQuery({query: query, variables: this.variables});
							data.listValueUnits.items = [
								...data.listValueUnits.items.filter(item => item.id !== deleteValueUnit.id)
							];
							cache.writeQuery({query, data});
						} catch(e) { /* */ }
					}
				})
			},
			async getData() {
				try {
					const valueUnitData = await API.graphql(graphqlOperation(listValueUnits, {limit: 9999}));
					this.valueUnits.push(...this.valueUnits, ...valueUnitData.data['listValueUnits'].items);
				} catch(e) { /* */ }
			},
			subscribe() {
				const momSub = this.sClient.subscribe({ query: gql(onCreateValueUnit) });
				const momDel = this.sClient.subscribe({ query: gql(onDeleteValueUnit) });
				const resub = () => {
					const offline = function() {
						try {
							return !JSON.parse(localStorage.getItem('reduxPersist::offline')).online ;
						} catch(TypeError) {
							// Not in localstorage, so we are online
							return false;
						}};
					if(offline()) {
						setTimeout(
								function(that){
									try { that.subscribe(); } catch(ex){/* */}
								}(this), 500);
					} else {
						this.subscribe();
					}
				};
				const subCreateSetup = {
					next: (eventData) => {
						const valueUnit = eventData.data['onCreateValueUnit'];
						this.valueUnits.push(valueUnit);
					},
					error: resub
				};
				const subDeleteSetup = {
					next: (eventData) => {
						const valueUnit = eventData.data['onDeleteValueUnit'];
						this.valueUnits = this.valueUnits.filter(function (el) {
							return el.id !== valueUnit.id;
						});
					},
					error: resub
				};
				if(this.createSub !== null) {
					this.createSub.unsubscribe();
				}
				this.createSub = momSub.subscribe(subCreateSetup);
				if(this.deleteSub !== null) {
					this.deleteSub.unsubscribe();
				}
				this.deleteSub = momDel.subscribe(subDeleteSetup);
				}
		},
		created() {
			this.getData();
			this.subscribe();
		}
	};

</script>
