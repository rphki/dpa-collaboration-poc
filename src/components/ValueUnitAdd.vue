<template>
	<v-list-item @click="createNewValueUnit">
		<v-list-item-action>
			<v-icon>mdi-bookmark-plus</v-icon>
		</v-list-item-action>
		<v-list-item-content>
			<v-list-item-title>in "Test-Folder" legen</v-list-item-title>
		</v-list-item-content>
	</v-list-item>
</template>

<script>
	import API, {graphqlOperation} from '@aws-amplify/api';
	import {createValueUnit} from "../graphql/mutations";

	export default {
		name: 'ValueUnitAdd',
		methods: {
			async createNewValueUnit() {
				let idx = Math.floor(Math.random() * examples.length);
				const valueUnit = {name: examples[idx].name, content: examples[idx].content};
				await API.graphql(graphqlOperation(createValueUnit, {input: valueUnit}))
			}
		}
	}

	var examples = [{
		name: "Zahl der Baugenehmigungen geht abermals zurück",
		content: "Der Immobilienmarkt in Deutschland boomt, doch das Angebot an Wohnungen hält nicht mit der großen Nachfrage Schritt. Im Sommer..."
	}, {
		name: "VW und Porsche rufen wegen Airbag-Problems fast 227 000 Autos zurück ",
		content: "Wolfsburg/Stuttgart (dpa) - Volkswagen und Porsche müssen wegen eines Problems mit Airbags und Gurtstraffern knapp 227 000 Autos..."
	}, {
		name: "Gabelstapler-Hersteller Kion profitiert von Angst vor No-Deal-Brexit",
		content: "Frankfurt/Main (dpa) - Der Gabelstapler-Hersteller Kion profitiert von der Angst vor einem ungeregelten Brexit. Immer mehr Unternehmen..."
	}, {
		name: "Eon treibt mit Mehrheit an Innogy Umbau voran",
		content: "Essen (dpa) - Unmittelbar nach Zustimmung der EU-Wettbewerbshüter hat der Energiekonzern Eon die Mehrheit an der RWE-Tochter..."
	}, {
		name: "Aufsichtsrat untersagt der Bahn Beraterverträge mit Ex-Managern",
		content: "Fragwürdige Beraterverträge auf der einen Seite, Milliarden aus der Staatskasse auf der anderen. Bei der Bahn..."
	}, {
		name: "«Cum-Ex»-Prozess: Angeklagter beschreibt Akteure als «Industrie»",
		content: "Waren «Cum-Ex»-Aktiengeschäfte nur dreiste Abzocke unter Ausnutzung einer Gesetzeslücke oder eine Straftat? Diese Frage beschäftigt..."
	}, {
		name: "Grünen-Fraktionschef Hofreiter auf Monsanto-Listen",
		content: "Berlin (dpa) - Auf einer der umstrittenen Listen des von Bayer übernommenen US-Saatgutherstellers Monsanto steht auch der Name..."
	}, {
		name: "Aus für «gelbe Scheine» - auch Hotel-Anmeldung nicht mehr auf Papier ",
		content: "Die Digitalisierung soll nun auch Einzug halten bei Krankmeldungen und Hotel-Meldescheinen - endlich, werden viele sagen. Unternehmen sollen..."
	}, {
		name: "«Leuchtturm» Leipzig wird Standort der neuen Agentur für Innovationen",
		content: "Sie soll bahnbrechenden Entdeckungen «Made in Germany» zum Durchbruch helfen: eine Agentur für «Sprunginnovationen». Standort wird..."
	}, {
		name: "DIW: Mietenregulierung kann schlecht für Mieter sein",
		content: "Berlin (dpa) - Wenn der Staat die Mieten bremst oder deckelt, kann das unter Umständen auch zulasten von Mietern gehen. Denn je strenger..."
	}, {
		name: "Automat tauscht alte Smartphones ein",
		content: "Millionen Handys verstauben in Schubladen. Dabei gibt's für funktionierende Altgeräte gutes Geld - im Laden, im Internet und jetzt sogar..."
	}
	];
</script>
