<template>

	<v-app>

		<v-app-bar app color="rgb(174, 210, 153)">
			<v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
			<v-toolbar-title class="headline text-uppercase">
				<img class="logo" src="https://www.dpa.com/typo3conf/ext/dpa/Resources/Public/assets/images/logo.svg" alt="dpa">
			</v-toolbar-title>
			<v-spacer></v-spacer>
			<v-toolbar-title class="headline">
				<span>dpa Collaboration PoC</span>
			</v-toolbar-title>
			<v-spacer></v-spacer>
			<v-toolbar-title class="headline">
				<span class="font-weight-light">GraphQL &middot; DynamoDB &middot; Vue.js</span>
			</v-toolbar-title>
		</v-app-bar>

		<v-navigation-drawer v-model="drawer" app>
			<v-list dense>

				<v-stepper>
					<v-subheader>(App im Connect-Ecosystem)</v-subheader>
				</v-stepper>

				<ValueUnitAdd/>

			</v-list>
		</v-navigation-drawer>

		<v-content>
			<ValueUnitList/>
		</v-content>

	</v-app>
</template>

<script>
	import ValueUnitAdd from './components/ValueUnitAdd';
	import ValueUnitList from './components/ValueUnitList';

	export default {
		name: 'app',
		components: {
			ValueUnitAdd,
			ValueUnitList,
		},
		data: () => ({
			drawer: null,
		})
	};
</script>


