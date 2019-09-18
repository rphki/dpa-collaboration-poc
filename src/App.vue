<template>

	<v-app>
		<v-app-bar app color="indigo" dark>
			<v-toolbar-title class="headline">
				<span>dpa Collaboration PoC</span>
			</v-toolbar-title>
			<v-spacer></v-spacer>
			<v-toolbar-title class="headline">
				<span class="font-weight-light">GraphQL &middot; DynamoDB &middot; Vue.js</span>
			</v-toolbar-title>
		</v-app-bar>
		<v-content>

			<button @click="createNewValueUnit">Add ValueUnit</button>
			<ul>
				<li v-for="valueUnit in valueUnits" :key="valueUnit.id">
					{{valueUnit.name}} - {{valueUnit.content}}
				</li>
			</ul>

		</v-content>
	</v-app>
</template>

<script>
  import API, {  graphqlOperation } from '@aws-amplify/api';
  import { createValueUnit } from "./graphql/mutations";
  import { onCreateValueUnit } from './graphql/subscriptions';
  import { listValueUnits } from './graphql/queries';

  export default {
    name: 'app',
    data(){
      return {
        valueUnits: []
      }
    },
    methods :{
      async createNewValueUnit(){
        const valueUnit = { name: "Use AppSync" , content: "Realtime and Offline" };
        await API.graphql(graphqlOperation(createValueUnit, { input: valueUnit }))
      },
      async getData(){
        const valueUnitData = await API.graphql(graphqlOperation(listValueUnits));
        this.valueUnits.push(...this.valueUnits, ...valueUnitData.data.listValueUnits.items);
      },
      subscribe(){
        API.graphql(graphqlOperation(onCreateValueUnit)).subscribe({
          next: (eventData) => {
            const valueUnit = eventData.value.data.onCreateValueUnit;
            this.valueUnits.push(valueUnit);
          }
        })
      }
    },
    created(){
      this.getData();
      this.subscribe();
    }
  };
</script>


