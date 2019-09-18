<template>
  <div id="app">
    <button @click="createNewValueUnit">Add ValueUnit</button>
    <ul>
      <li v-for="valueUnit in valueUnits" :key="valueUnit.id">
        {{valueUnit.name}} - {{valueUnit.content}} <button @click="deleteExistingValueUnit(valueUnit)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script>
  import API, {  graphqlOperation } from '@aws-amplify/api';
  import {createValueUnit, deleteValueUnit} from "./graphql/mutations";
  import { onCreateValueUnit, onDeleteValueUnit } from './graphql/subscriptions';
  import { listValueUnits } from './graphql/queries';

  export default {
    name: 'app',
    data(){
      return {
        valueUnits: []
      }
    },
    methods :{
      async deleteExistingValueUnit(valueUnit){
        await API.graphql(graphqlOperation(deleteValueUnit, { input: { id: valueUnit.id } }))
      },
      async createNewValueUnit(){
        const valueUnit = { name: "Use AppSync" , content: "Realtime and Offline" };
        await API.graphql(graphqlOperation(createValueUnit, { input: valueUnit }))
      },
      async getData(){
        const valueUnitData = await API.graphql(graphqlOperation(listValueUnits));
        this.valueUnits.push( ...this.valueUnits, ...valueUnitData.data.listValueUnits.items );
      },
      subscribe(){
        API.graphql(graphqlOperation(onCreateValueUnit)).subscribe({
          next: (eventData) => {
            const valueUnit = eventData.value.data.onCreateValueUnit;
            this.valueUnits.push(valueUnit);
          }
        })
        API.graphql(graphqlOperation(onDeleteValueUnit)).subscribe({
          next: (eventData) => {
            const valueUnit = eventData.value.data.onDeleteValueUnit;
            this.valueUnits = this.valueUnits.filter(function(el) { return el.id !== valueUnit.id; });
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
