import { App, Plugin, PluginSettingTab, Setting, Notice, TFile } from 'obsidian';

/**
 * Plugin Settings Interface
 */
interface PerfectPDFSettings {
	exportPreset: 'teaching' | 'professional' | 'minimal';
	fontSize: number;
	pageOrientation: 'portrait' | 'landscape' | 'auto';
	margins: 'narrow' | 'normal' | 'wide';
	preventTableSplits: boolean;
	preventCalloutSplits: boolean;
	preventListSplits: boolean;
	optimizeTableWidth: boolean;
	wordWrap: boolean;
}

/**
 * Default Settings
 */
const DEFAULT_SETTINGS: PerfectPDFSettings = {
	exportPreset: 'professional',
	fontSize: 10,
	pageOrientation: 'portrait',
	margins: 'normal',
	preventTableSplits: true,
	preventCalloutSplits: true,
	preventListSplits: false, // Allow lists to break if needed
	optimizeTableWidth: true,
	wordWrap: true
};

/**
 * Export Presets
 */
const PRESETS = {
	teaching: {
		fontSize: 11,
		margins: 'normal',
		preventTableSplits: true,
		preventCalloutSplits: true,
		preventListSplits: false,
		optimizeTableWidth: true,
		wordWrap: true
	},
	professional: {
		fontSize: 10,
		margins: 'normal',
		preventTableSplits: true,
		preventCalloutSplits: true,
		preventListSplits: false,
		optimizeTableWidth: true,
		wordWrap: true
	},
	minimal: {
		fontSize: 9,
		margins: 'narrow',
		preventTableSplits: true,
		preventCalloutSplits: false,
		preventListSplits: false,
		optimizeTableWidth: true,
		wordWrap: true
	}
};

/**
 * Main Plugin Class
 */
export default class PerfectPDFExportPlugin extends Plugin {
	settings: PerfectPDFSettings;

	async onload() {
		await this.loadSettings();

		// Add ribbon icon
		this.addRibbonIcon('file-down', 'Export to Perfect PDF', async (evt: MouseEvent) => {
			await this.exportCurrentFileToPDF();
		});

		// Add command
		this.addCommand({
			id: 'export-to-perfect-pdf',
			name: 'Export current note to Perfect PDF',
			callback: async () => {
				await this.exportCurrentFileToPDF();
			}
		});

		// Add command for batch export
		this.addCommand({
			id: 'export-folder-to-pdf',
			name: 'Export current folder to PDFs',
			callback: async () => {
				new Notice('Batch export coming in v0.2.0!');
			}
		});

		// Add settings tab
		this.addSettingTab(new PerfectPDFSettingTab(this.app, this));

		console.log('Perfect PDF Export plugin loaded');
	}

	onunload() {
		console.log('Perfect PDF Export plugin unloaded');
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

	/**
	 * Apply a preset to settings
	 */
	applyPreset(preset: 'teaching' | 'professional' | 'minimal') {
		const presetSettings = PRESETS[preset];
		Object.assign(this.settings, presetSettings);
		this.settings.exportPreset = preset;
	}

	/**
	 * Main export function
	 */
	async exportCurrentFileToPDF() {
		const activeFile = this.app.workspace.getActiveFile();
		
		if (!activeFile) {
			new Notice('No active file to export');
			return;
		}

		new Notice('Exporting to PDF...');

		try {
			// Get the file content
			const content = await this.app.vault.read(activeFile);
			
			// Apply our CSS optimizations
			const css = this.generateOptimizedCSS();
			
			// Use Obsidian's built-in print functionality with our CSS
			await this.printWithCustomCSS(content, css);
			
			new Notice('PDF export complete!');
		} catch (error) {
			console.error('Export failed:', error);
			new Notice('PDF export failed. See console for details.');
		}
	}

	/**
	 * Generate optimized CSS based on settings
	 */
	generateOptimizedCSS(): string {
		const { fontSize, margins, preventTableSplits, preventCalloutSplits, 
		        preventListSplits, optimizeTableWidth, wordWrap } = this.settings;

		let css = `
		@media print {
			/* Base font size */
			body {
				font-size: ${fontSize}pt;
				line-height: 1.5;
			}

			/* Margins */
			@page {
				margin: ${margins === 'narrow' ? '0.5in' : margins === 'wide' ? '1in' : '0.75in'};
			}

			/* Prevent horizontal overflow */
			* {
				max-width: 100%;
				box-sizing: border-box;
			}

			/* Word wrapping */
			${wordWrap ? `
			p, li, td, th {
				word-wrap: break-word;
				overflow-wrap: break-word;
				hyphens: auto;
			}
			` : ''}

			/* Table optimization */
			${preventTableSplits ? `
			table {
				page-break-inside: avoid !important;
			}
			` : ''}

			${optimizeTableWidth ? `
			table {
				width: 100%;
				max-width: 100%;
				table-layout: auto;
				font-size: 0.85em;
			}

			th, td {
				padding: 6px 8px;
				word-wrap: break-word;
				word-break: break-word;
				max-width: 200px;
			}
			` : ''}

			/* Callout optimization */
			${preventCalloutSplits ? `
			.callout {
				page-break-inside: avoid !important;
				margin: 1em 0;
			}
			` : ''}

			/* List optimization */
			${preventListSplits ? `
			ul, ol {
				page-break-inside: avoid !important;
			}
			` : `
			ul, ol {
				page-break-inside: auto;
			}
			`}

			li {
				page-break-inside: avoid !important;
			}

			/* Code blocks */
			pre, code {
				page-break-inside: avoid !important;
				white-space: pre-wrap !important;
				word-wrap: break-word !important;
			}

			/* Headings */
			h1, h2, h3, h4, h5, h6 {
				page-break-after: avoid !important;
				page-break-inside: avoid !important;
			}

			/* Keep heading with content */
			h1 + p, h2 + p, h3 + p {
				page-break-before: avoid !important;
			}

			/* Blockquotes */
			blockquote {
				page-break-inside: avoid !important;
			}

			/* Links - break if needed */
			a {
				word-break: break-all;
				overflow-wrap: break-word;
			}

			/* Images */
			img {
				page-break-inside: avoid !important;
				max-width: 100%;
			}
		}
		`;

		return css;
	}

	/**
	 * Print with custom CSS
	 * This is a placeholder - actual implementation will use Obsidian's print API
	 */
	async printWithCustomCSS(content: string, css: string) {
		// Create a temporary style element
		const styleEl = document.createElement('style');
		styleEl.id = 'perfect-pdf-export-styles';
		styleEl.textContent = css;
		document.head.appendChild(styleEl);

		// Trigger print dialog
		window.print();

		// Clean up after a delay
		setTimeout(() => {
			const el = document.getElementById('perfect-pdf-export-styles');
			if (el) el.remove();
		}, 1000);
	}
}

/**
 * Settings Tab
 */
class PerfectPDFSettingTab extends PluginSettingTab {
	plugin: PerfectPDFExportPlugin;

	constructor(app: App, plugin: PerfectPDFExportPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;
		containerEl.empty();

		containerEl.createEl('h2', { text: 'Perfect PDF Export Settings' });

		// Export Preset
		new Setting(containerEl)
			.setName('Export preset')
			.setDesc('Quick presets for different use cases')
			.addDropdown(dropdown => dropdown
				.addOption('teaching', 'Teaching (readable, optimized for lessons)')
				.addOption('professional', 'Professional (balanced, clean)')
				.addOption('minimal', 'Minimal (compact, more content)')
				.setValue(this.plugin.settings.exportPreset)
				.onChange(async (value) => {
					this.plugin.applyPreset(value as any);
					await this.plugin.saveSettings();
					this.display(); // Refresh display
				}));

		containerEl.createEl('h3', { text: 'Layout Options' });

		// Font Size
		new Setting(containerEl)
			.setName('Font size')
			.setDesc('Base font size in points (8-14)')
			.addSlider(slider => slider
				.setLimits(8, 14, 1)
				.setValue(this.plugin.settings.fontSize)
				.setDynamicTooltip()
				.onChange(async (value) => {
					this.plugin.settings.fontSize = value;
					await this.plugin.saveSettings();
				}));

		// Page Orientation
		new Setting(containerEl)
			.setName('Page orientation')
			.setDesc('Choose page orientation')
			.addDropdown(dropdown => dropdown
				.addOption('portrait', 'Portrait')
				.addOption('landscape', 'Landscape')
				.addOption('auto', 'Auto (detect wide tables)')
				.setValue(this.plugin.settings.pageOrientation)
				.onChange(async (value) => {
					this.plugin.settings.pageOrientation = value as any;
					await this.plugin.saveSettings();
				}));

		// Margins
		new Setting(containerEl)
			.setName('Margins')
			.setDesc('Page margins')
			.addDropdown(dropdown => dropdown
				.addOption('narrow', 'Narrow (0.5in)')
				.addOption('normal', 'Normal (0.75in)')
				.addOption('wide', 'Wide (1in)')
				.setValue(this.plugin.settings.margins)
				.onChange(async (value) => {
					this.plugin.settings.margins = value as any;
					await this.plugin.saveSettings();
				}));

		containerEl.createEl('h3', { text: 'Page Break Options' });

		// Prevent Table Splits
		new Setting(containerEl)
			.setName('Prevent table splits')
			.setDesc('Keep tables on one page when possible')
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.preventTableSplits)
				.onChange(async (value) => {
					this.plugin.settings.preventTableSplits = value;
					await this.plugin.saveSettings();
				}));

		// Prevent Callout Splits
		new Setting(containerEl)
			.setName('Prevent callout splits')
			.setDesc('Keep callouts on one page')
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.preventCalloutSplits)
				.onChange(async (value) => {
					this.plugin.settings.preventCalloutSplits = value;
					await this.plugin.saveSettings();
				}));

		// Prevent List Splits
		new Setting(containerEl)
			.setName('Prevent list splits')
			.setDesc('Keep entire lists on one page (may cause overflow)')
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.preventListSplits)
				.onChange(async (value) => {
					this.plugin.settings.preventListSplits = value;
					await this.plugin.saveSettings();
				}));

		containerEl.createEl('h3', { text: 'Content Optimization' });

		// Optimize Table Width
		new Setting(containerEl)
			.setName('Optimize table width')
			.setDesc('Automatically adjust table columns to fit page')
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.optimizeTableWidth)
				.onChange(async (value) => {
					this.plugin.settings.optimizeTableWidth = value;
					await this.plugin.saveSettings();
				}));

		// Word Wrap
		new Setting(containerEl)
			.setName('Enable word wrap')
			.setDesc('Break long words to prevent horizontal overflow')
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.wordWrap)
				.onChange(async (value) => {
					this.plugin.settings.wordWrap = value;
					await this.plugin.saveSettings();
				}));

		// Info section
		containerEl.createEl('div', {
			cls: 'setting-item-description',
			text: '💡 Tip: Use the ribbon icon or command palette to export the current note.'
		});
	}
}
