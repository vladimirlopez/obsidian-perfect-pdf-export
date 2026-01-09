import { App, Plugin, PluginSettingTab, Setting, Notice, TFile, TFolder, Modal } from 'obsidian';

/**
 * Saved Template Interface
 */
interface ExportTemplate {
	name: string;
	settings: PerfectPDFSettings;
}

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
	enablePageNumbers: boolean;
	pageNumberPosition: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
	customHeader: string;
	customFooter: string;
	savedTemplates: ExportTemplate[];
	showPreviewBeforeExport: boolean;
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
	wordWrap: true,
	enablePageNumbers: false,
	pageNumberPosition: 'bottom-center',
	customHeader: '',
	customFooter: '',
	savedTemplates: [],
	showPreviewBeforeExport: false
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
				await this.exportFolderToPDFs();
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

		// Show preview if enabled
		if (this.settings.showPreviewBeforeExport) {
			const shouldProceed = await this.showPreviewModal(activeFile);
			if (!shouldProceed) {
				return;
			}
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
	 * Batch export folder to PDFs
	 */
	async exportFolderToPDFs() {
		const activeFile = this.app.workspace.getActiveFile();
		
		if (!activeFile) {
			new Notice('Please open a file in the folder you want to export');
			return;
		}

		const folder = activeFile.parent;
		if (!folder) {
			new Notice('Could not determine folder');
			return;
		}

		const files = folder.children.filter(child => child instanceof TFile && child.extension === 'md') as TFile[];
		
		if (files.length === 0) {
			new Notice('No markdown files found in folder');
			return;
		}

		new Notice(`Exporting ${files.length} files from "${folder.name}"...`);

		let successCount = 0;
		let failCount = 0;

		for (const file of files) {
			try {
				const content = await this.app.vault.read(file);
				const css = this.generateOptimizedCSS();
				
				// Open each file before exporting
				await this.app.workspace.openLinkText(file.path, '', false);
				await new Promise(resolve => setTimeout(resolve, 500)); // Wait for file to open
				
				await this.printWithCustomCSS(content, css);
				successCount++;
				
				// Small delay between exports
				await new Promise(resolve => setTimeout(resolve, 1000));
			} catch (error) {
				console.error(`Failed to export ${file.name}:`, error);
				failCount++;
			}
		}

		new Notice(`Batch export complete: ${successCount} successful, ${failCount} failed`);
	}

	/**
	 * Show preview modal before export
	 */
	async showPreviewModal(file: TFile): Promise<boolean> {
		return new Promise((resolve) => {
			const modal = new PreviewModal(this.app, file, () => resolve(true), () => resolve(false));
			modal.open();
		});
	}

	/**
	 * Save current settings as a template
	 */
	saveTemplate(name: string) {
		const template: ExportTemplate = {
			name,
			settings: { ...this.settings }
		};
		
		// Remove templates array from the saved template
		const { savedTemplates, ...settingsToSave } = template.settings;
		template.settings = settingsToSave as PerfectPDFSettings;
		
		this.settings.savedTemplates.push(template);
		this.saveSettings();
		new Notice(`Template "${name}" saved!`);
	}

	/**
	 * Load a saved template
	 */
	loadTemplate(name: string) {
		const template = this.settings.savedTemplates.find(t => t.name === name);
		if (template) {
			const savedTemplates = this.settings.savedTemplates;
			Object.assign(this.settings, template.settings);
			this.settings.savedTemplates = savedTemplates;
			this.saveSettings();
			new Notice(`Template "${name}" loaded!`);
			return true;
		}
		return false;
	}

	/**
	 * Delete a saved template
	 */
	deleteTemplate(name: string) {
		const index = this.settings.savedTemplates.findIndex(t => t.name === name);
		if (index !== -1) {
			this.settings.savedTemplates.splice(index, 1);
			this.saveSettings();
			new Notice(`Template "${name}" deleted!`);
			return true;
		}
		return false;
	}

	/**
	 * Generate optimized CSS based on settings
	 */
	generateOptimizedCSS(): string {
		const { fontSize, margins, preventTableSplits, preventCalloutSplits, 
		        preventListSplits, optimizeTableWidth, wordWrap, enablePageNumbers,
		        pageNumberPosition, customHeader, customFooter, pageOrientation } = this.settings;

		// Determine page orientation CSS
		let orientationCSS = '';
		if (pageOrientation === 'landscape') {
			orientationCSS = 'size: landscape;';
		} else if (pageOrientation === 'portrait') {
			orientationCSS = 'size: portrait;';
		}
		// 'auto' will be handled by analyzing content (future enhancement)

		// Parse page number position
		const [vAlign, hAlign] = pageNumberPosition.split('-');
		let pageNumPosition = '';
		if (enablePageNumbers) {
			if (vAlign === 'top') {
				pageNumPosition = `
				@page {
					@top-${hAlign === 'center' ? 'center' : hAlign === 'left' ? 'left' : 'right'} {
						content: counter(page);
					}
				}`;
			} else {
				pageNumPosition = `
				@page {
					@bottom-${hAlign === 'center' ? 'center' : hAlign === 'left' ? 'left' : 'right'} {
						content: counter(page);
					}
				}`;
			}
		}

		// Custom headers and footers
		let headerCSS = '';
		let footerCSS = '';
		if (customHeader) {
			headerCSS = `
			@page {
				@top-center {
					content: "${customHeader}";
					font-size: 9pt;
					color: #666;
				}
			}`;
		}
		if (customFooter) {
			footerCSS = `
			@page {
				@bottom-center {
					content: "${customFooter}";
					font-size: 9pt;
					color: #666;
				}
			}`;
		}

		let css = `
		@media print {
			/* Base font size */
			body {
				font-size: ${fontSize}pt;
				line-height: 1.5;
			}

			/* Margins and page setup */
			@page {
				margin: ${margins === 'narrow' ? '0.5in' : margins === 'wide' ? '1in' : '0.75in'};
				${orientationCSS}
			}

			${pageNumPosition}
			${headerCSS}
			${footerCSS}

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

			/* Enhanced table optimization - fixes large table overflow */
			${preventTableSplits ? `
			table {
				page-break-inside: avoid !important;
			}
			` : ''}

			${optimizeTableWidth ? `
			table {
				width: 100% !important;
				max-width: 100% !important;
				table-layout: fixed !important;
				font-size: 0.85em;
				overflow: hidden;
			}

			th, td {
				padding: 4px 6px;
				word-wrap: break-word !important;
				word-break: break-word !important;
				overflow-wrap: break-word !important;
				max-width: none;
				overflow: hidden;
				text-overflow: ellipsis;
			}

			/* Auto-adjust for landscape if table is wide */
			table[data-wide="true"], table:has(> thead > tr > th:nth-child(6)) {
				font-size: 0.75em;
			}
			` : ''}

			/* Enhanced callout optimization - fixes nested callouts spacing */
			${preventCalloutSplits ? `
			.callout {
				page-break-inside: avoid !important;
				margin: 0.8em 0 !important;
				padding: 0.8em !important;
			}

			/* Nested callouts */
			.callout .callout {
				margin: 0.4em 0 !important;
				padding: 0.5em !important;
			}

			/* Deep nesting */
			.callout .callout .callout {
				margin: 0.2em 0 !important;
				padding: 0.3em !important;
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

		containerEl.createEl('h3', { text: 'Page Numbering & Headers' });

		// Enable Page Numbers
		new Setting(containerEl)
			.setName('Enable page numbers')
			.setDesc('Add page numbers to exported PDFs')
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.enablePageNumbers)
				.onChange(async (value) => {
					this.plugin.settings.enablePageNumbers = value;
					await this.plugin.saveSettings();
					this.display(); // Refresh to show/hide position setting
				}));

		// Page Number Position
		if (this.plugin.settings.enablePageNumbers) {
			new Setting(containerEl)
				.setName('Page number position')
				.setDesc('Where to place page numbers')
				.addDropdown(dropdown => dropdown
					.addOption('top-left', 'Top Left')
					.addOption('top-center', 'Top Center')
					.addOption('top-right', 'Top Right')
					.addOption('bottom-left', 'Bottom Left')
					.addOption('bottom-center', 'Bottom Center')
					.addOption('bottom-right', 'Bottom Right')
					.setValue(this.plugin.settings.pageNumberPosition)
					.onChange(async (value) => {
						this.plugin.settings.pageNumberPosition = value as any;
						await this.plugin.saveSettings();
					}));
		}

		// Custom Header
		new Setting(containerEl)
			.setName('Custom header')
			.setDesc('Add a custom header to each page (optional)')
			.addText(text => text
				.setPlaceholder('e.g., Company Name')
				.setValue(this.plugin.settings.customHeader)
				.onChange(async (value) => {
					this.plugin.settings.customHeader = value;
					await this.plugin.saveSettings();
				}));

		// Custom Footer
		new Setting(containerEl)
			.setName('Custom footer')
			.setDesc('Add a custom footer to each page (optional)')
			.addText(text => text
				.setPlaceholder('e.g., Confidential')
				.setValue(this.plugin.settings.customFooter)
				.onChange(async (value) => {
					this.plugin.settings.customFooter = value;
					await this.plugin.saveSettings();
				}));

		containerEl.createEl('h3', { text: 'Export Options' });

		// Show Preview
		new Setting(containerEl)
			.setName('Show preview before export')
			.setDesc('Display a preview modal before exporting')
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.showPreviewBeforeExport)
				.onChange(async (value) => {
					this.plugin.settings.showPreviewBeforeExport = value;
					await this.plugin.saveSettings();
				}));

		containerEl.createEl('h3', { text: 'Export Templates' });

		// Template management
		const templateDesc = containerEl.createDiv();
		templateDesc.addClass('setting-item-description');
		templateDesc.setText('Save and load custom export configurations');

		// Save template button
		new Setting(containerEl)
			.setName('Save current settings as template')
			.setDesc('Save your current settings for later use')
			.addText(text => text
				.setPlaceholder('Template name')
				.then((textComponent) => {
					new Setting(containerEl)
						.addButton(button => button
							.setButtonText('Save Template')
							.onClick(() => {
								const name = textComponent.getValue();
								if (name) {
									this.plugin.saveTemplate(name);
									textComponent.setValue('');
									this.display(); // Refresh to show new template
								} else {
									new Notice('Please enter a template name');
								}
							}));
				}));

		// List saved templates
		if (this.plugin.settings.savedTemplates.length > 0) {
			containerEl.createEl('h4', { text: 'Saved Templates' });
			
			this.plugin.settings.savedTemplates.forEach(template => {
				new Setting(containerEl)
					.setName(template.name)
					.addButton(button => button
						.setButtonText('Load')
						.onClick(() => {
							this.plugin.loadTemplate(template.name);
							this.display(); // Refresh display with loaded settings
						}))
					.addButton(button => button
						.setButtonText('Delete')
						.setWarning()
						.onClick(() => {
							this.plugin.deleteTemplate(template.name);
							this.display(); // Refresh display
						}));
			});
		}

		// Info section
		containerEl.createEl('div', {
			cls: 'setting-item-description',
			text: '💡 Tip: Use the ribbon icon or command palette to export the current note.'
		});
	}
}

/**
 * Preview Modal
 */
class PreviewModal extends Modal {
	file: TFile;
	onConfirm: () => void;
	onCancel: () => void;

	constructor(app: App, file: TFile, onConfirm: () => void, onCancel: () => void) {
		super(app);
		this.file = file;
		this.onConfirm = onConfirm;
		this.onCancel = onCancel;
	}

	onOpen() {
		const { contentEl } = this;
		
		contentEl.createEl('h2', { text: 'PDF Export Preview' });
		contentEl.createEl('p', { text: `Ready to export: ${this.file.basename}` });
		
		const buttonContainer = contentEl.createDiv();
		buttonContainer.style.display = 'flex';
		buttonContainer.style.gap = '10px';
		buttonContainer.style.marginTop = '20px';
		
		const confirmButton = buttonContainer.createEl('button', { text: 'Export to PDF' });
		confirmButton.addClass('mod-cta');
		confirmButton.onclick = () => {
			this.close();
			this.onConfirm();
		};
		
		const cancelButton = buttonContainer.createEl('button', { text: 'Cancel' });
		cancelButton.onclick = () => {
			this.close();
			this.onCancel();
		};
	}

	onClose() {
		const { contentEl } = this;
		contentEl.empty();
	}
}
