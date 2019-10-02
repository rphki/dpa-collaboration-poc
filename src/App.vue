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
					<v-subheader>... in einer App im Connect-Ecosystem</v-subheader>
				</v-stepper>

				<v-list-item>
				<v-list-item-content>
					<v-list-item-content>
						<v-list-item-title>...bei einer Werteinheit:</v-list-item-title>
					</v-list-item-content>
				</v-list-item-content>
				</v-list-item>
				<ValueUnitAdd v-bind:client="client"/>

			</v-list>
		</v-navigation-drawer>

		<v-content>
			<ValueUnitList v-bind:client="client"/>
		</v-content>

	</v-app>
</template>

<script>

	import ValueUnitAdd from './components/ValueUnitAdd';
	import ValueUnitList from './components/ValueUnitList';

	import AWSAppSyncClient, { AUTH_TYPE } from 'aws-appsync';
	import awsconfig from './aws-exports';
	const client = new AWSAppSyncClient({
		url: awsconfig.aws_appsync_graphqlEndpoint,
		region: awsconfig.aws_appsync_region,
		auth: {
			type: AUTH_TYPE.API_KEY,
			apiKey: awsconfig.aws_appsync_apiKey,
		},
		offlineConfig: {
			callback: (err, succ) => {
				if(err) {
					// Maybe some sort of storage error? Seems unlikely that this is ever reached
					/*const { mutation, variables } = err;

					console.warn(`ERROR for ${mutation}`, err);*/
				} else {
					// The server received the mutation and has confirmed reception
					const { mutation, variables } = succ;

					console.info(`SUCCESS for ${mutation} with variables ${variables}`, succ);
				}
			},
		},
	});

	export default {
		name: 'app',
		components: {
			ValueUnitAdd,
			ValueUnitList,
		},
		data: () => ({
			drawer: null,
			client: client
		})
	};
</script>


