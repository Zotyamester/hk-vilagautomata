<script lang="ts">
	let { filename }: { filename: string } = $props();

	let extension = $derived(filename.substring(filename.lastIndexOf('.') + 1));
    let classNames = $derived(getIconClassNames(extension));

	function getIconClassNames(extension: string) {
		switch (extension) {
			case 'pdf':
				return 'fa-solid fa-file-pdf';

			case 'doc':
			case 'docx':
				return 'fa-solid fa-file-word';

			case 'xls':
			case 'xlsx':
                return 'fa-solid fa-file-excel';

            case 'csv':
                    return 'fa-solid fa-file-csv';

			case 'jpg':
			case 'jpeg':
			case 'png':
			case 'webp':
				return 'fa-solid fa-file-image';

			default:
				return 'fa-solid fa-file-circle-question';
		}
	}
</script>

<i class={classNames} title={extension}></i>
