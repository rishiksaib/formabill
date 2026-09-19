import { r as __exportAll } from "../../_runtime.mjs";
import { a as VersionedStruct, c as Reserved, d as uint16be, f as uint16le, h as uint8, l as BufferT, m as uint32le, o as Struct, p as uint32be, r as PNG$1, s as StringT, u as ArrayT } from "./font+[...].mjs";
import $52ZIf$fs from "fs";
import path from "path";
import url from "url";
//#region node_modules/@react-pdf/primitives/lib/index.js
var lib_exports = /* @__PURE__ */ __exportAll({
	Canvas: () => Canvas,
	Checkbox: () => Checkbox,
	Circle: () => Circle,
	ClipPath: () => ClipPath,
	Defs: () => Defs,
	Document: () => Document,
	Ellipse: () => Ellipse,
	FieldSet: () => FieldSet,
	Fragment: () => Fragment,
	G: () => "G",
	Image: () => Image,
	ImageBackground: () => ImageBackground,
	Line: () => Line,
	LinearGradient: () => LinearGradient,
	Link: () => Link,
	List: () => List,
	Marker: () => Marker$1,
	Note: () => Note,
	Page: () => Page,
	Path: () => Path,
	Polygon: () => Polygon,
	Polyline: () => Polyline,
	RadialGradient: () => RadialGradient,
	Rect: () => Rect,
	Select: () => Select,
	Stop: () => Stop,
	Svg: () => "SVG",
	Text: () => Text,
	TextInput: () => TextInput,
	TextInstance: () => TextInstance,
	Tspan: () => Tspan,
	View: () => View
});
var View = "VIEW";
var Text = "TEXT";
var Link = "LINK";
var Page = "PAGE";
var Note = "NOTE";
var Path = "PATH";
var Rect = "RECT";
var Line = "LINE";
var FieldSet = "FIELD_SET";
var TextInput = "TEXT_INPUT";
var Select = "SELECT";
var Checkbox = "CHECKBOX";
var List = "LIST";
var Stop = "STOP";
var Defs = "DEFS";
var Image = "IMAGE";
var ImageBackground = "IMAGE_BACKGROUND";
var Tspan = "TSPAN";
var Canvas = "CANVAS";
var Circle = "CIRCLE";
var Ellipse = "ELLIPSE";
var Polygon = "POLYGON";
var Document = "DOCUMENT";
var Polyline = "POLYLINE";
var ClipPath = "CLIP_PATH";
var TextInstance = "TEXT_INSTANCE";
var Fragment = "FRAGMENT";
var LinearGradient = "LINEAR_GRADIENT";
var RadialGradient = "RADIAL_GRADIENT";
var Marker$1 = "MARKER";
//#endregion
//#region node_modules/jay-peg/src/markers/dac.js
var DACTable = new Struct({
	identifier: new BufferT(1),
	value: new BufferT(1)
});
var DACMarker = {
	name: () => "DAC",
	length: uint16be,
	tables: new ArrayT(DACTable, (parent) => parent.length / 2)
};
//#endregion
//#region node_modules/jay-peg/src/markers/utils.js
var readUInt8 = (array, offset) => {
	return array[offset];
};
var readUInt16BE = (array, offset) => {
	return array[offset] << 8 | array[offset + 1];
};
var readUInt16LE = (array, offset) => {
	return array[offset] | array[offset + 1] << 8;
};
var readUInt32BE = (array, offset) => {
	return readInt32BE(array, offset) >>> 0;
};
var readUInt32LE = (array, offset) => {
	return readInt32LE(array, offset) >>> 0;
};
var uint8ArrayToHexString = (uint8Array) => {
	return Array.from(uint8Array, (byte) => byte.toString(16).padStart(2, "0")).join("");
};
var decoder = new TextDecoder("utf-8");
var uint8ArrayToString = (uint8Array) => {
	return decoder.decode(uint8Array);
};
var concatenateUint8Arrays = (arrays) => {
	const totalLength = arrays.reduce((length, arr) => length + arr.length, 0);
	const concatenatedArray = new Uint8Array(totalLength);
	let offset = 0;
	arrays.forEach((arr) => {
		concatenatedArray.set(arr, offset);
		offset += arr.length;
	});
	return concatenatedArray;
};
var readInt32BE = (array, offset) => {
	return array[offset] << 24 | array[offset + 1] << 16 | array[offset + 2] << 8 | array[offset + 3];
};
var readInt32LE = (array, offset) => {
	return array[offset] | array[offset + 1] << 8 | array[offset + 2] << 16 | array[offset + 3] << 24;
};
//#endregion
//#region node_modules/jay-peg/src/markers/dht.js
var HuffmanTableElements = class {
	decode(stream, parent) {
		const tables = {};
		let buffer = stream.buffer.slice(stream.pos, stream.pos + parent.length - 2);
		while (buffer.length > 0) {
			let offset = 1;
			const elements = [];
			const identifier = readUInt8(buffer, 0);
			const lengths = buffer.slice(offset, offset + 16);
			offset += 16;
			for (const length of lengths) {
				elements.push(buffer.slice(offset, offset + length));
				offset += length;
			}
			buffer = buffer.slice(offset);
			tables[identifier] = concatenateUint8Arrays(elements);
		}
		stream.pos += parent.length - 2;
		return tables;
	}
};
var DefineHuffmanTableMarker = {
	name: () => "DHT",
	length: uint16be,
	tables: new HuffmanTableElements()
};
//#endregion
//#region node_modules/jay-peg/src/markers/dqt.js
var DQTMarker = {
	name: () => "DQT",
	length: uint16be,
	tables: new ArrayT(new Struct({
		identifier: new BufferT(1),
		data: new BufferT(64)
	}), (parent) => (parent.length - 2) / 65)
};
//#endregion
//#region node_modules/jay-peg/src/markers/dri.js
var DRIMarker = {
	name: () => "DRI",
	length: uint16be,
	restartInterval: uint16be
};
//#endregion
//#region node_modules/jay-peg/src/markers/eoi.js
var EndOfImageMarker = {
	name: () => "EOI",
	afterEOI: new Reserved(uint8, Infinity)
};
//#endregion
//#region node_modules/jay-peg/src/markers/exif.js
var tags = {
	ifd: {
		"010e": "imageDescription",
		"010f": "make",
		"011a": "xResolution",
		"011b": "yResolution",
		"011c": "planarConfiguration",
		"012d": "transferFunction",
		"013b": "artist",
		"013e": "whitePoint",
		"013f": "primaryChromaticities",
		"0100": "imageWidth",
		"0101": "imageHeight",
		"0102": "bitsPerSample",
		"0103": "compression",
		"0106": "photometricInterpretation",
		"0110": "model",
		"0111": "stripOffsets",
		"0112": "orientation",
		"0115": "samplesPerPixel",
		"0116": "rowsPerStrip",
		"0117": "stripByteCounts",
		"0128": "resolutionUnit",
		"0131": "software",
		"0132": "dateTime",
		"0201": "jpegInterchangeFormat",
		"0202": "jpegInterchangeFormatLength",
		"0211": "ycbCrCoefficients",
		"0212": "ycbCrSubSampling",
		"0213": "ycbCrPositioning",
		"0214": "referenceBlackWhite",
		"829a": "exposureTime",
		"829d": "fNumber",
		"920a": "focalLength",
		"927c": "makerNote",
		8298: "copyright",
		8769: "exifIFDPointer",
		8822: "exposureProgram",
		8824: "spectralSensitivity",
		8825: "gpsInfoIFDPointer",
		8827: "photographicSensitivity",
		8828: "oecf",
		8830: "sensitivityType",
		8831: "standardOutputSensitivity",
		8832: "recommendedExposureIndex",
		8833: "isoSpeed",
		8834: "isoSpeedLatitudeyyy",
		8835: "isoSpeedLatitudezzz",
		9e3: "exifVersion",
		9003: "dateTimeOriginal",
		9004: "dateTimeDigitized",
		9101: "componentsConfiguration",
		9102: "compressedBitsPerPixel",
		9201: "shutterSpeedValue",
		9202: "apertureValue",
		9203: "brightnessValue",
		9204: "exposureBiasValue",
		9205: "maxApertureValue",
		9206: "subjectDistance",
		9207: "meteringMode",
		9208: "lightSource",
		9209: "flash",
		9214: "subjectArea",
		9286: "userComment",
		9290: "subSecTime",
		9291: "subSecTimeOriginal",
		9292: "subSecTimeDigitized",
		a000: "flashpixVersion",
		a001: "colorSpace",
		a002: "pixelXDimension",
		a003: "pixelYDimension",
		a004: "relatedSoundFile",
		a005: "interoperabilityIFDPointer",
		a20b: "flashEnergy",
		a20c: "spatialFrequencyResponse",
		a20e: "focalPlaneXResolution",
		a20f: "focalPlaneYResolution",
		a40a: "sharpness",
		a40b: "deviceSettingDescription",
		a40c: "subjectDistanceRange",
		a210: "focalPlaneResolutionUnit",
		a214: "subjectLocation",
		a215: "exposureIndex",
		a217: "sensingMethod",
		a300: "fileSource",
		a301: "sceneType",
		a302: "cfaPattern",
		a401: "customRendered",
		a402: "exposureMode",
		a403: "whiteBalance",
		a404: "digitalZoomRatio",
		a405: "focalLengthIn35mmFilm",
		a406: "sceneCaptureType",
		a407: "gainControl",
		a408: "contrast",
		a409: "saturation",
		a420: "imageUniqueID",
		a430: "cameraOwnerName",
		a431: "bodySerialNumber",
		a432: "lensSpecification",
		a433: "lensMake",
		a434: "lensModel",
		a435: "lensSerialNumber",
		a500: "gamma"
	},
	gps: {
		"0000": "gpsVersionID",
		"0001": "gpsLatitudeRef",
		"0002": "gpsLatitude",
		"0003": "gpsLongitudeRef",
		"0004": "gpsLongitude",
		"0005": "gpsAltitudeRef",
		"0006": "gpsAltitude",
		"0007": "gpsTimeStamp",
		"0008": "gpsSatellites",
		"0009": "gpsStatus",
		"000a": "gpsMeasureMode",
		"000b": "gpsDOP",
		"000c": "gpsSpeedRef",
		"000d": "gpsSpeed",
		"000e": "gpsTrackRef",
		"000f": "gpsTrack",
		"0010": "gpsImgDirectionRef",
		"0011": "gpsImgDirection",
		"0012": "gpsMapDatum",
		"0013": "gpsDestLatitudeRef",
		"0014": "gpsDestLatitude",
		"0015": "gpsDestLongitudeRef",
		"0016": "gpsDestLongitude",
		"0017": "gpsDestBearingRef",
		"0018": "gpsDestBearing",
		"0019": "gpsDestDistanceRef",
		"001a": "gpsDestDistance",
		"001b": "gpsProcessingMethod",
		"001c": "gpsAreaInformation",
		"001d": "gpsDateStamp",
		"001e": "gpsDifferential",
		"001f": "gpsHPositioningError"
	}
};
var IDFEntries = class {
	constructor(bigEndian) {
		this.bigEndian = bigEndian;
		this.bytes = [
			0,
			1,
			1,
			2,
			4,
			8,
			1,
			1,
			2,
			4,
			8,
			4,
			8
		];
	}
	_getTagValue(dataValue, dataFormat, componentsNumber) {
		switch (dataFormat) {
			case 2: return dataValue.toString("ascii").replace(/\0+$/, "");
			case 129: return dataValue.toString("utf8").replace(/\0+$/, "");
			case 7: return "0x" + dataValue.toString("hex");
			default: return this._getTagValueForNumericalData(dataValue, dataFormat, componentsNumber);
		}
	}
	_getTagValueForNumericalData(dataValue, dataFormat, componentsNumber) {
		const tagValue = [];
		const componentsBytes = this.bytes[dataFormat];
		for (let i = 0; i < componentsNumber; i += 1) tagValue.push(this._getSingleTagValueForNumericalData(dataValue, dataFormat, i * componentsBytes));
		return tagValue.length === 1 ? tagValue[0] : tagValue;
	}
	_getSingleTagValueForNumericalData(dataValue, dataFormat, pos) {
		const uint16 = (pos) => this.bigEndian ? readUInt16BE(dataValue, pos) : readUInt16LE(dataValue, pos);
		const uint32 = (pos) => this.bigEndian ? readUInt32BE(dataValue, pos) : readUInt32LE(dataValue, pos);
		const int32 = (pos) => this.bigEndian ? readInt32BE(dataValue, pos) : readInt32LE(dataValue, pos);
		switch (dataFormat) {
			case 1: return readUInt8(dataValue, pos);
			case 3: return uint16(pos);
			case 4: return uint32(pos);
			case 5: return uint32(pos) / uint32(pos + 4);
			case 9: return int32(pos);
			case 10: return int32(pos) / int32(pos + 4);
		}
	}
	_decodeIDFEntries(buffer, tags, offset, log = false) {
		let pos = 2 + offset;
		const entries = {};
		const uint16 = (pos) => this.bigEndian ? readUInt16BE(buffer, pos) : readUInt16LE(buffer, pos);
		const uint32 = (pos) => this.bigEndian ? readUInt32BE(buffer, pos) : readUInt32LE(buffer, pos);
		const numberOfEntries = uint16(offset);
		for (let i = 0; i < numberOfEntries; i++) {
			const tagAddress = buffer.slice(pos, pos + 2);
			const dataFormat = uint16(pos + 2);
			const componentsNumber = uint32(pos + 4);
			const dataLength = componentsNumber * this.bytes[dataFormat];
			let dataValue = buffer.slice(pos + 8, pos + 12);
			if (dataLength > 4) {
				const dataOffset = this.bigEndian ? readUInt32BE(dataValue, 0) : readUInt32LE(dataValue, 0);
				dataValue = buffer.slice(dataOffset, dataOffset + dataLength);
			}
			const tagValue = this._getTagValue(dataValue, dataFormat, componentsNumber);
			const tagName = tags[this.bigEndian ? uint8ArrayToHexString(tagAddress) : uint8ArrayToHexString(tagAddress.reverse())];
			entries[tagName] = tagValue;
			pos += 12;
		}
		return entries;
	}
	decode(stream, parent) {
		const buffer = stream.buffer.slice(stream.pos - 8);
		const offsetToFirstIFD = parent.offsetToFirstIFD;
		if (offsetToFirstIFD > buffer.length) {
			stream.pos += parent.parent.length - 16;
			return {};
		}
		const entries = this._decodeIDFEntries(buffer, tags.ifd, offsetToFirstIFD);
		const { exifIFDPointer, gpsInfoIFDPointer } = entries;
		if (exifIFDPointer) entries.subExif = this._decodeIDFEntries(buffer, tags.ifd, exifIFDPointer);
		if (gpsInfoIFDPointer) {
			const gps = gpsInfoIFDPointer;
			entries.gpsInfo = this._decodeIDFEntries(buffer, tags.gps, gps, true);
		}
		stream.pos += parent.parent.length - 16;
		return entries;
	}
};
var IFDData = (bigEndian) => {
	return new Struct({
		fortyTwo: bigEndian ? uint16be : uint16le,
		offsetToFirstIFD: bigEndian ? uint32be : uint32le,
		entries: new IDFEntries(bigEndian)
	});
};
var TIFFHeader = class {
	decode(stream, parent) {
		const bigEndian = uint8ArrayToString(stream.buffer.slice(stream.pos, stream.pos + 2)) === "MM";
		stream.pos += 2;
		return IFDData(bigEndian).decode(stream, parent).entries;
	}
};
var EXIFMarker = {
	name: () => "EXIF",
	length: uint16be,
	identifier: new StringT(6),
	entries: new TIFFHeader()
};
//#endregion
//#region node_modules/jay-peg/src/markers/jfif.js
var JFIFMarker = {
	name: () => "JFIF",
	length: uint16be,
	identifier: new StringT(5),
	version: uint16be,
	units: uint8,
	xDensity: uint16be,
	yDensity: uint16be,
	thumbnailWidth: uint8,
	thumbnailHeight: uint8
};
//#endregion
//#region node_modules/jay-peg/src/markers/sos.js
var ImageData = class {
	decode(stream) {
		const buffer = stream.buffer.slice(stream.pos);
		let length = 0;
		let i = buffer.indexOf(255);
		while (i !== -1) {
			length = i;
			const nextByte = buffer[length + 1];
			if (nextByte !== 0 && !(nextByte >= 208 && nextByte <= 215)) break;
			i = buffer.indexOf(255, i + 1);
		}
		stream.pos += length;
		return buffer.slice(0, length);
	}
};
var SOSComponentSpecification = new Struct({
	scanComponentSelector: uint8,
	entropyCodingTable: new BufferT(1)
});
var SOSMarker = {
	name: () => "SOS",
	length: uint16be,
	numberOfImageComponents: uint8,
	componentSpecifications: new ArrayT(SOSComponentSpecification, (parent) => parent.numberOfImageComponents),
	startOfSpectral: uint8,
	endOfSpectral: uint8,
	successiveApproximationBit: new BufferT(1),
	data: new ImageData()
};
//#endregion
//#region node_modules/jay-peg/src/markers/sof.js
var FrameColorComponent = new Struct({
	id: uint8,
	samplingFactors: uint8,
	quantizationTableId: uint8
});
var StartOfFrameMarker = {
	name: () => "SOF",
	length: uint16be,
	precision: uint8,
	height: uint16be,
	width: uint16be,
	numberOfComponents: uint8,
	components: new ArrayT(FrameColorComponent, (parent) => parent.numberOfComponents)
};
//#endregion
//#region node_modules/jay-peg/src/markers/soi.js
var StartOfImageMarker = { name: () => "SOI" };
//#endregion
//#region node_modules/jay-peg/src/index.js
var UnknownMarker = {
	length: uint16be,
	buf: new BufferT((parent) => parent.length - 2)
};
var unknownMarkers = Array(63).fill(0).reduce((acc, v, i) => ({
	...acc,
	[i + 65472]: UnknownMarker
}), {});
var Marker = new VersionedStruct(uint16be, {
	...unknownMarkers,
	65472: StartOfFrameMarker,
	65473: StartOfFrameMarker,
	65474: StartOfFrameMarker,
	65475: StartOfFrameMarker,
	65476: DefineHuffmanTableMarker,
	65477: StartOfFrameMarker,
	65478: StartOfFrameMarker,
	65479: StartOfFrameMarker,
	65481: StartOfFrameMarker,
	65482: StartOfFrameMarker,
	65483: StartOfFrameMarker,
	65484: DACMarker,
	65485: StartOfFrameMarker,
	65486: StartOfFrameMarker,
	65487: StartOfFrameMarker,
	65496: StartOfImageMarker,
	65497: EndOfImageMarker,
	65498: SOSMarker,
	65499: DQTMarker,
	65501: DRIMarker,
	65504: JFIFMarker,
	65505: EXIFMarker
});
var JPEG$1 = new ArrayT(Marker);
var decode = (buffer) => {
	return JPEG$1.fromBuffer(buffer).map(({ version, ...rest }) => ({
		type: version,
		...rest
	}));
};
var src_default = { decode };
//#endregion
//#region node_modules/@react-pdf/svg/lib/index.js
var XML_ENTITY_MAP = {
	amp: "&",
	lt: "<",
	gt: ">",
	quot: "\"",
	apos: "'"
};
var ENTITY_REGEX = /&(amp|lt|gt|quot|apos);/g;
var ATTR_REGEX = /([a-zA-Z][a-zA-Z0-9_:-]*)\s*=\s*(?:"([^"]*)"|'([^']*)')/g;
function decodeXmlEntities(str) {
	return str.replace(ENTITY_REGEX, (_, key) => XML_ENTITY_MAP[key]);
}
function parseAttributes(attrString) {
	const attrs = {};
	ATTR_REGEX.lastIndex = 0;
	let match;
	while ((match = ATTR_REGEX.exec(attrString)) !== null) attrs[match[1]] = decodeXmlEntities(match[2] ?? match[3]);
	return attrs;
}
function tokenize(xmlString) {
	const str = xmlString.replace(/<\?xml[^?]*\?>|<!DOCTYPE[^>]*>|<!--[\s\S]*?-->/gi, "");
	const tokens = [];
	let pos = 0;
	while (pos < str.length) {
		const nextTag = str.indexOf("<", pos);
		if (nextTag === -1) break;
		if (nextTag > pos) {
			const raw = str.slice(pos, nextTag);
			if (/\S/.test(raw)) tokens.push({
				type: "text",
				text: decodeXmlEntities(raw)
			});
		}
		if (str.startsWith("<![CDATA[", nextTag)) {
			const cdataEnd = str.indexOf("]]>", nextTag + 9);
			if (cdataEnd === -1) break;
			const text = str.slice(nextTag + 9, cdataEnd);
			if (text) tokens.push({
				type: "text",
				text
			});
			pos = cdataEnd + 3;
			continue;
		}
		const tagEnd = str.indexOf(">", nextTag);
		if (tagEnd === -1) break;
		const tagContent = str.slice(nextTag + 1, tagEnd);
		pos = tagEnd + 1;
		if (tagContent.startsWith("/")) {
			tokens.push({
				type: "close",
				tagName: tagContent.slice(1).trim()
			});
			continue;
		}
		const isSelfClosing = tagContent.endsWith("/");
		const rawTag = isSelfClosing ? tagContent.slice(0, -1) : tagContent;
		const spaceIndex = rawTag.search(/[\s/]/);
		const tagName = spaceIndex === -1 ? rawTag.trim() : rawTag.slice(0, spaceIndex).trim();
		const attrString = spaceIndex === -1 ? "" : rawTag.slice(spaceIndex);
		tokens.push({
			type: isSelfClosing ? "self-close" : "open",
			tagName,
			attributes: parseAttributes(attrString)
		});
	}
	return tokens;
}
var CAMEL_CASE_REGEX = /[-:]([a-z])/g;
var TAG_NAME_MAP = {
	svg: "SVG",
	g: "G",
	path: Path,
	rect: Rect,
	circle: Circle,
	ellipse: Ellipse,
	line: Line,
	polyline: Polyline,
	polygon: Polygon,
	text: Text,
	tspan: Tspan,
	defs: Defs,
	clippath: ClipPath,
	lineargradient: LinearGradient,
	radialgradient: RadialGradient,
	marker: Marker$1,
	stop: Stop,
	image: Image
};
var SKIP_ELEMENTS = /* @__PURE__ */ new Set([
	"script",
	"foreignobject",
	"filter",
	"mask",
	"pattern",
	"use",
	"symbol",
	"animate",
	"animatetransform",
	"animatemotion",
	"set"
]);
var TEXT_TYPES = /* @__PURE__ */ new Set([Text, Tspan]);
function toCamelCase(str) {
	return str.replace(CAMEL_CASE_REGEX, (_, letter) => letter.toUpperCase());
}
function parseStyleAttribute(styleString) {
	if (!styleString) return {};
	const result = {};
	for (const declaration of styleString.split(";")) {
		const colonIndex = declaration.indexOf(":");
		if (colonIndex === -1) continue;
		const property = declaration.slice(0, colonIndex).trim();
		const value = declaration.slice(colonIndex + 1).trim();
		if (property && value) result[toCamelCase(property)] = value;
	}
	return result;
}
function convertAttributes(attributes) {
	const props = {};
	for (const [name, value] of Object.entries(attributes)) if (name === "style") Object.assign(props, parseStyleAttribute(value));
	else props[toCamelCase(name)] = value;
	return props;
}
function buildTree(tokens) {
	const stack = [];
	const tagNames = [];
	let root = null;
	let skipDepth = 0;
	for (const token of tokens) {
		if (token.type === "text") {
			if (skipDepth || stack.length === 0) continue;
			const parent = stack[stack.length - 1];
			if (!TEXT_TYPES.has(parent.type)) continue;
			const text = token.text.trim();
			if (text) parent.children.push({
				type: TextInstance,
				props: {},
				value: text
			});
			continue;
		}
		if (token.type === "close") {
			if (skipDepth) skipDepth--;
			else if (stack.length > 1) {
				if (tagNames[tagNames.length - 1] === token.tagName) {
					tagNames.pop();
					stack.pop();
				}
			}
			continue;
		}
		if (skipDepth) {
			if (token.type === "open") skipDepth++;
			continue;
		}
		const lowerTag = token.tagName.toLowerCase();
		if (SKIP_ELEMENTS.has(lowerTag)) {
			console.warn(`Unsupported SVG element: <${lowerTag}> will be skipped`);
			if (token.type === "open") skipDepth = 1;
			continue;
		}
		const mappedType = TAG_NAME_MAP[lowerTag];
		if (!mappedType) {
			if (token.type === "open") skipDepth = 1;
			continue;
		}
		const node = {
			type: mappedType,
			props: convertAttributes(token.attributes),
			children: []
		};
		if (stack.length > 0) stack[stack.length - 1].children.push(node);
		if (!root) root = node;
		if (token.type === "open") {
			tagNames.push(token.tagName);
			stack.push(node);
		}
	}
	return root;
}
var EMPTY_SVG = {
	type: "SVG",
	props: {},
	children: []
};
function parseSvg(svgString) {
	const root = buildTree(tokenize(svgString));
	if (!root) {
		console.warn("SVG parse error: failed to parse XML");
		return EMPTY_SVG;
	}
	return root;
}
//#endregion
//#region node_modules/@react-pdf/image/lib/index.js
var PNG = class {
	data;
	width;
	height;
	format;
	constructor(data) {
		const png = new PNG$1(data);
		this.data = data;
		this.width = png.width;
		this.height = png.height;
		this.format = "png";
	}
	static isValid(data) {
		return data && Buffer.isBuffer(data) && data[0] === 137 && data[1] === 80 && data[2] === 78 && data[3] === 71 && data[4] === 13 && data[5] === 10 && data[6] === 26 && data[7] === 10;
	}
};
var JPEG = class {
	data;
	width;
	height;
	format;
	constructor(data) {
		this.data = data;
		this.format = "jpeg";
		this.width = 0;
		this.height = 0;
		if (data.readUInt16BE(0) !== 65496) throw new Error("SOI not found in JPEG");
		const markers = src_default.decode(this.data);
		let orientation;
		for (let i = 0; i < markers.length; i += 1) {
			const marker = markers[i];
			if (marker.name === "EXIF" && marker.entries.orientation) orientation = marker.entries.orientation;
			if (marker.name === "SOF") {
				this.width ||= marker.width;
				this.height ||= marker.height;
			}
		}
		if (orientation > 4) [this.width, this.height] = [this.height, this.width];
	}
	static isValid(data) {
		return data && Buffer.isBuffer(data) && data.readUInt16BE(0) === 65496;
	}
};
var UNIT_TO_PT = {
	px: 72 / 96,
	pt: 1,
	in: 72,
	cm: 72 / 2.54,
	mm: 72 / 25.4
};
function parseNumber(value) {
	if (typeof value !== "string") return void 0;
	const match = value.match(/^(-?\d*\.?\d+)(px|pt|in|cm|mm)?$/);
	if (!match) return void 0;
	const num = parseFloat(match[1]);
	const unit = match[2];
	if (!unit) return num;
	return num * (UNIT_TO_PT[unit] ?? 1);
}
function parseViewBox(value) {
	if (typeof value !== "string") return void 0;
	const parts = value.trim().split(/[\s,]+/).map(Number);
	if (parts.length !== 4 || parts.some(isNaN)) return void 0;
	return {
		minX: parts[0],
		minY: parts[1],
		maxX: parts[2],
		maxY: parts[3]
	};
}
var SVG = class {
	data;
	width;
	height;
	format;
	constructor(data) {
		const parsed = parseSvg(data.toString("utf-8"));
		const viewBox = parseViewBox(parsed.props.viewBox);
		this.data = parsed;
		this.format = "svg";
		this.width = parseNumber(parsed.props.width) ?? viewBox?.maxX ?? 0;
		this.height = parseNumber(parsed.props.height) ?? viewBox?.maxY ?? 0;
	}
	static isValid(data) {
		if (!Buffer.isBuffer(data)) return false;
		const str = data.toString("utf-8").trimStart();
		return str.startsWith("<?xml") || str.startsWith("<svg");
	}
};
var createCache = ({ limit = 100 } = {}) => {
	let cache = /* @__PURE__ */ new Map();
	return {
		get: (key) => key ? cache.get(key) ?? void 0 : null,
		set: (key, value) => {
			cache.delete(key);
			if (cache.size >= limit) {
				const firstKey = cache.keys().next().value;
				cache.delete(firstKey);
			}
			cache.set(key, value);
		},
		reset: () => {
			cache = /* @__PURE__ */ new Map();
		},
		length: () => cache.size
	};
};
var IMAGE_CACHE = createCache({ limit: 30 });
var isBuffer = Buffer.isBuffer;
var isBlob = (src) => {
	return typeof Blob !== "undefined" && src instanceof Blob;
};
var isDataImageSrc = (src) => {
	return "data" in src;
};
var isDataUri = (imageSrc) => "uri" in imageSrc && imageSrc.uri.startsWith("data:");
var getAbsoluteLocalPath = (src) => {
	try {
		const parsed = new URL(src);
		if (parsed.protocol !== "file:" || parsed.username || parsed.password || parsed.host) return;
		return url.fileURLToPath(parsed.href);
	} catch {
		if (!src) return;
		if (/^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(src)) return;
		return path.resolve(src);
	}
};
var fetchLocalFile = (src) => new Promise((resolve, reject) => {
	try {
		const absolutePath = getAbsoluteLocalPath(src.uri);
		if (!absolutePath) {
			reject(/* @__PURE__ */ new Error(`Cannot fetch non-local path: ${src.uri}`));
			return;
		}
		$52ZIf$fs.readFile(absolutePath, (err, data) => err ? reject(err) : resolve(data));
	} catch (err) {
		reject(err);
	}
});
var fetchRemoteFile = async (src) => {
	const { method = "GET", headers, body, credentials } = src;
	const buffer = await (await fetch(src.uri, {
		method,
		headers,
		body,
		credentials
	})).arrayBuffer();
	return Buffer.from(buffer);
};
var isValidFormat = (format) => {
	const lower = format.toLowerCase();
	return lower === "jpg" || lower === "jpeg" || lower === "png" || lower === "svg" || lower === "svg+xml";
};
var getImageFormat = (buffer) => {
	let format;
	if (JPEG.isValid(buffer)) format = "jpg";
	else if (PNG.isValid(buffer)) format = "png";
	else if (SVG.isValid(buffer)) format = "svg";
	return format;
};
function getImage(body, format) {
	switch (format.toLowerCase()) {
		case "jpg":
		case "jpeg": return new JPEG(body);
		case "png": return new PNG(body);
		case "svg":
		case "svg+xml": return new SVG(body);
		default: return null;
	}
}
var resolveBase64Image = async ({ uri }) => {
	const match = /^data:image\/([a-zA-Z+]*);base64,([^"]*)/g.exec(uri);
	if (!match) throw new Error(`Invalid base64 image: ${uri}`);
	const format = match[1];
	const data = match[2];
	if (!isValidFormat(format)) throw new Error(`Base64 image invalid format: ${format}`);
	return getImage(Buffer.from(data, "base64"), format);
};
var resolveImageFromData = async (src) => {
	if (src.data && src.format) return getImage(src.data, src.format);
	throw new Error(`Invalid data given for local file: ${JSON.stringify(src)}`);
};
var resolveBufferImage = async (buffer) => {
	const format = getImageFormat(buffer);
	if (format) return getImage(buffer, format);
	return null;
};
var resolveBlobImage = async (blob) => {
	const { type } = blob;
	if (!type || type === "application/octet-stream") {
		const arrayBuffer = await blob.arrayBuffer();
		return resolveBufferImage(Buffer.from(arrayBuffer));
	}
	if (!type.startsWith("image/")) throw new Error(`Invalid blob type: ${type}`);
	const format = type.replace("image/", "");
	if (!isValidFormat(format)) throw new Error(`Invalid blob type: ${type}`);
	const buffer = await blob.arrayBuffer();
	return getImage(Buffer.from(buffer), format);
};
var resolveImageFromUrl = async (src) => {
	const data = getAbsoluteLocalPath(src.uri) ? await fetchLocalFile(src) : await fetchRemoteFile(src);
	const format = getImageFormat(data);
	if (!format) throw new Error("Not valid image extension");
	return getImage(data, format);
};
var getCacheKey = (src) => {
	if (isBlob(src) || isBuffer(src)) return null;
	if (isDataImageSrc(src)) return src.data?.toString("base64") ?? null;
	return src.uri;
};
var resolveImage = (src, { cache = true } = {}) => {
	let image;
	const cacheKey = getCacheKey(src);
	if (isBlob(src)) image = resolveBlobImage(src);
	else if (isBuffer(src)) image = resolveBufferImage(src);
	else if (cache && IMAGE_CACHE.get(cacheKey)) return IMAGE_CACHE.get(cacheKey);
	else if (isDataUri(src)) image = resolveBase64Image(src);
	else if (isDataImageSrc(src)) image = resolveImageFromData(src);
	else image = resolveImageFromUrl(src);
	if (cache && cacheKey) IMAGE_CACHE.set(cacheKey, image);
	return image;
};
//#endregion
export { lib_exports as A, Rect as C, TextInstance as D, TextInput as E, Tspan as O, RadialGradient as S, Text as T, Note as _, Defs as a, Polygon as b, FieldSet as c, ImageBackground as d, Line as f, Marker$1 as g, List as h, Circle as i, View as k, Fragment as l, Link as m, Canvas as n, Document as o, LinearGradient as p, Checkbox as r, Ellipse as s, resolveImage as t, Image as u, Page as v, Select as w, Polyline as x, Path as y };
