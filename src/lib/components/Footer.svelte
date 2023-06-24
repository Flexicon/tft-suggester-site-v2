<script lang="ts">
	export let buildTime: string;
	export let versionHash: string;

	const year = new Date().getFullYear();
</script>

<footer class="footer">
	<small>
		&copy; {year} TFT Suggester. Made by <a href="https://flexicon.dev/">Mike</a>. All Rights
		Reserved.
		<br />
		This site is not affiliated with Riot Games.
		<br />
		TFT Suggester was created under Riot Games' "Legal Jibber Jabber" policy using assets owned by Riot
		Games. Riot Games does not endorse or sponsor this project.
		<br />
		Last update: {buildTime}
		<br />
		<span class="version">{versionHash}</span>
	</small>
</footer>

<style lang="postcss">
	footer {
		background-color: #fafafa;
		padding: 3rem 1.5rem 6rem;
		@apply text-center text-gray-400;
	}

	footer a {
		@apply text-gray-500 hover:underline;
	}

	.version {
		@apply inline-block opacity-50 mt-3;
	}
</style>
