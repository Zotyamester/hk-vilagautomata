import { writable } from 'svelte/store';

export class Theme {
	colorScheme = 'light';
	invertedColorScheme = 'dark';

	constructor(initialTheme: string = 'light') {
		this.setColorScheme(initialTheme);
	}

	setColorScheme(value: string) {
		this.colorScheme = value;
		this.invertedColorScheme = value === 'light' ? 'dark' : 'light';
	}
}

export const theme = writable(new Theme());
