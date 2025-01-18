<script lang="ts">
	import { fade } from "svelte/transition";

    const SHOW_LOADING_DELAY_MS = 150;
    let showLoading = $state(false);

    $effect(() => {
        const interval = setInterval(() => showLoading = true, SHOW_LOADING_DELAY_MS);
        return () => { showLoading = false; clearInterval(interval); };
    });
</script>

{#if showLoading}
    <div class="progress" transition:fade>
        <div
            class="progress-bar progress-bar-striped progress-bar-animated"
            role="progressbar"
            aria-label="Betöltés folyamatban"
            aria-valuenow="100"
            aria-valuemin="0"
            aria-valuemax="100"
            style="width: 100%"
        ></div>
    </div>    
{/if}
