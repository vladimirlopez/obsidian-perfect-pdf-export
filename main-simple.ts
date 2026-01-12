import { App, Plugin, PluginSettingTab, Setting, Notice, TFile, MarkdownView, Menu } from 'obsidian';

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
	showExportInstructions: boolean;
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
	preventListSplits: false,
	optimizeTableWidth: true,
	wordWrap: true,
	showExportInstructions: true
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

		// Add ribbon icon with PROPER ICON
		this.addRibbonIcon('lucide-file-pdf', 'Export to PDF', async (evt: MouseEvent) => {
			await this.exportCurrentFileToPDF();
		});

		// Add command
		this.addCommand({
			id: 'export-to-perfect-pdf',
			name: 'Export current note to PDF',
			callback: async () => {
				await this.exportCurrentFileToPDF();
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
	 * Main export function - SIMPLIFIED TO ACTUALLY WORK
	 */
	async exportCurrentFileToPDF() {
		const activeFile = this.app.workspace.getActiveFile();
		
		if (!activeFile) {
			new Notice('No active file to export');
			return;
		}

		const activeView = this.app.workspace.getActiveViewOfType(MarkdownView);
		if (!activeView) {
			new Notice('Please open the note in reading or editing view to export');
			return;
		}

		try {
			// Generate CSS
			const css = this.generateOptimizedCSS();
			
			// Show notice
			new Notice('💡 Opening print dialog...\n\n🖨️ Select "Save as PDF" from your printer options', 5000);
			
			// Apply CSS and trigger print
			await this.applyPrintCSSAndPrint(css);
			
		} catch (error) {
			console.error('Export failed:', error);
			new Notice('PDF export failed. Check console for details.');
		}
	}

	/**
	 * Apply print CSS and trigger print dialog
	 */
	async applyPrintCSSAndPrint(css: string) {
		// Remove existing style
		const existingStyle = document.getElementById('perfect-pdf-styles');
		if (existingStyle) existingStyle.remove();

		// Add print styles
		const styleEl = document.createElement('style');
		styleEl.id = 'perfect-pdf-styles';
		styleEl.textContent = css;
		document.head.appendChild(styleEl);

		// Small delay to let CSS apply
		await new Promise(resolve => setTimeout(resolve, 200));

		// Trigger print
		window.print();

		// Cleanup after print dialog closes
		const cleanup = () => {
			const el = document.getElementById('perfect-pdf-styles');
			if (el) el.remove();
		};

		// Listen for both events
		window.addEventListener('afterprint', cleanup, { once: true });
		// Fallback cleanup after 10 seconds
		setTimeout(cleanup, 10000);
	}

	/**
	 * Generate optimized CSS based on settings
	 */
	generateOptimizedCSS(): string {
		const { fontSize, margins, preventTableSplits, preventCalloutSplits, 
		        preventListSplits, optimizeTableWidth, wordWrap } = this.settings;

		let css = `
		@media print {
			/* Hide Obsidian UI */
			.titlebar,
			.workspace-ribbon,
			.workspace-tab-header-container,
			.status-bar,
			.view-header,
			.nav-files-container,
			.workspace-split.mod-left-split,
			.workspace-split.mod-right-split {
				display: none !important;
			}

			/* Make workspace fill page */
			.workspace-leaf-content {
				padding: 0 !important;
			}

			/* Base font size */
			body, .markdown-preview-view, .markdown-reading-view {
				font-size: ${fontSize}pt !important;
				line-height: 1.5 !important;
				color: black !important;
				background: white !important;
			}

			/* Page margins */
			@page {
				margin: ${margins === 'narrow' ? '0.5in' : margins === 'wide' ? '1in' : '0.75in'};
				size: ${this.settings.pageOrientation === 'landscape' ? 'landscape' : 'portrait'};
			}

			/* Prevent overflow */
			* {
				max-width: 100% !important;
				box-sizing: border-box !important;
			}

			/* Word wrapping */
			${wordWrap ? `
			p, li, td, th {
				word-wrap: break-word !important;
				overflow-wrap: break-word !important;
				hyphens: auto !important;
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
				width: 100% !important;
				table-layout: fixed !important;
			}
			td, th {
				word-wrap: break-word !important;
			}
			` : ''}

			/* Callout boxes */
			${preventCalloutSplits ? `
			.callout {
				page-break-inside: avoid !important;
			}
			` : ''}

			/* Code blocks */
			pre, code {
				page-break-inside: avoid !important;
				white-space: pre-wrap !important;
			}

			/* Lists */
			${preventListSplits ? `
			li {
				page-break-inside: avoid !important;
			}
			` : ''}

			/* Headings */
			h1, h2, h3, h4, h5, h6 {
				page-break-after: avoid !important;
			}

			/* Images */
			img {
				max-width: 100% !important;
				height: auto !important;
				page-break-inside: avoid !important;
			}

			/* Links - show URLs */
			a[href]:after {
				content: " (" attr(href) ")" !important;
				font-size: 0.8em !important;
				color: #666 !important;
			}
		}
		`;

		return css;
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
		const {containerEl} = this;
		containerEl.empty();

		containerEl.createEl('h2', {text: 'Perfect PDF Export Settings'});

		// Export preset
		new Setting(containerEl)
			.setName('Export preset')
			.setDesc('Quick presets for common use cases')
			.addDropdown(dropdown => dropdown
				.addOption('teaching', 'Teaching (11pt, readable)')
				.addOption('professional', 'Professional (10pt, balanced)')
				.addOption('minimal', 'Minimal (9pt, compact)')
				.setValue(this.plugin.settings.exportPreset)
				.onChange(async (value: 'teaching' | 'professional' | 'minimal') => {
					this.plugin.applyPreset(value);
					await this.plugin.saveSettings();
					this.display(); // Refresh settings
				}));

		// Font size
		new Setting(containerEl)
			.setName('Font size')
			.setDesc('Base font size in points')
			.addSlider(slider => slider
				.setLimits(8, 14, 1)
				.setValue(this.plugin.settings.fontSize)
				.setDynamicTooltip()
				.onChange(async (value) => {
					this.plugin.settings.fontSize = value;
					await this.plugin.saveSettings();
				}));

		// Page orientation
		new Setting(containerEl)
			.setName('Page orientation')
			.setDesc('Portrait or landscape')
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
				.addOption('narrow', 'Narrow (0.5")')
				.addOption('normal', 'Normal (0.75")')
				.addOption('wide', 'Wide (1")')
				.setValue(this.plugin.settings.margins)
				.onChange(async (value) => {
					this.plugin.settings.margins = value as any;
					await this.plugin.saveSettings();
				}));

		containerEl.createEl('h3', {text: 'Page Break Prevention'});

		// Table splits
		new Setting(containerEl)
			.setName('Prevent table splits')
			.setDesc('Keep tables together on one page')
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.preventTableSplits)
				.onChange(async (value) => {
					this.plugin.settings.preventTableSplits = value;
					await this.plugin.saveSettings();
				}));

		// Callout splits
		new Setting(containerEl)
			.setName('Prevent callout splits')
			.setDesc('Keep callout boxes together')
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.preventCalloutSplits)
				.onChange(async (value) => {
					this.plugin.settings.preventCalloutSplits = value;
					await this.plugin.saveSettings();
				}));

		containerEl.createEl('h3', {text: 'Table Optimization'});

		// Optimize table width
		new Setting(containerEl)
			.setName('Optimize table width')
			.setDesc('Auto-fit tables to page width')
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.optimizeTableWidth)
				.onChange(async (value) => {
					this.plugin.settings.optimizeTableWidth = value;
					await this.plugin.saveSettings();
				}));

		// Word wrap
		new Setting(containerEl)
			.setName('Word wrap')
			.setDesc('Wrap long words in tables and text')
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.wordWrap)
				.onChange(async (value) => {
					this.plugin.settings.wordWrap = value;
					await this.plugin.saveSettings();
				}));

		// Show instructions
		new Setting(containerEl)
			.setName('Show export instructions')
			.setDesc('Display help message when exporting')
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.showExportInstructions)
				.onChange(async (value) => {
					this.plugin.settings.showExportInstructions = value;
					await this.plugin.saveSettings();
				}));
	}
}
