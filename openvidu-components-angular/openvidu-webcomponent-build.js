const fs = require("fs-extra");
const concat = require("concat");
const VERSION = require("./package.json").version;

module.exports.buildWebcomponent = async () => {
	console.log("Building OpenVidu Web Component (" + VERSION + ")");
	const tutorialWcPath = "../../openvidu-tutorials/openvidu-webcomponent/web";
	const e2eWcPath = "../webcomponent-test-e2e/web";

	try {
		await buildElement();
		await copyFiles(tutorialWcPath);
		await copyFiles(e2eWcPath);

		console.log("OpenVidu Web Component (" + VERSION + ") built");
	} catch (error) {
		console.error(error);
	}
};

async function buildElement() {
	const files = [
		// "./dist/openvidu-call/runtime.js",
		// "./dist/openvidu-call/polyfills.js",
		// "./dist/openvidu-call/scripts.js",
		// "./dist/openvidu-call/main.js",
		"./dist/openvidu-webcomponent/runtime.js",
		"./dist/openvidu-webcomponent/main.js",
		"./dist/openvidu-webcomponent/polyfills.js",
		// "./dist/openvidu-webcomponent/scripts.js",
	];

	try {
		await fs.ensureDir("openvidu-webcomponent");
		await concat(
			files,
			"./openvidu-webcomponent/openvidu-webcomponent-" + VERSION + ".js"
		);
		await fs.copy(
			"./dist/openvidu-webcomponent/styles.css",
			"./openvidu-webcomponent/openvidu-webcomponent-" + VERSION + ".css"
		);
		await fs.copy(
			"./dist/openvidu-webcomponent/assets",
			"./openvidu-webcomponent/assets"
		);
	} catch (err) {
		console.error("Error executing build function in webcomponent-builds.js");
		throw err;
	}
}

async function copyFiles(destination) {
	if (fs.existsSync(destination)) {
		try {
			console.log(
				"Copying openvidu-webcomponent files from: ./openvidu-webcomponent to: " +
					destination
			);
			await fs.ensureDir("openvidu-webcomponent");
			await fs.copy("./openvidu-webcomponent/", destination);
		} catch (err) {
			console.error("Error executing copy function in webcomponent-builds.js");
			throw err;
		}
	}
}

this.buildWebcomponent();