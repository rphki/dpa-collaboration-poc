<template>
  <div id="app">
    <button @click="createNewValueUnit">Add ValueUnit</button>
    <ul>
      <li v-for="valueUnit in valueUnits" :key="valueUnit.id">
        {{valueUnit.name}} - {{valueUnit.content}}
      </li>
    </ul>
  </div>
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

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
