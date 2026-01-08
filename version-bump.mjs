import { readFileSync, writeFileSync } from "fs";

const targetVersion = process.env.npm_package_version;

// Validate that version is defined
if (!targetVersion) {
	console.error('Error: npm_package_version is not defined');
	console.error('This script should be run via npm version command');
	process.exit(1);
}

// Read minAppVersion from manifest.json
let manifest = JSON.parse(readFileSync("manifest.json", "utf8"));
const { minAppVersion } = manifest;
manifest.version = targetVersion;
writeFileSync("manifest.json", JSON.stringify(manifest, null, "\t"));

// Update versions.json with target version and minAppVersion from manifest.json
let versions = JSON.parse(readFileSync("versions.json", "utf8"));
versions[targetVersion] = minAppVersion;
writeFileSync("versions.json", JSON.stringify(versions, null, "\t"));
