import { o as __toESM, t as __commonJSMin } from "../../_runtime.mjs";
import { D as TextInstance, O as Tspan, T as Text, _ as Note, a as Defs, d as ImageBackground, g as Marker, m as Link, n as Canvas, t as resolveImage, u as Image, v as Page } from "./image+[...].mjs";
import { i as $747425b437e121da$export$2e2bcd8739ae039 } from "./font+[...].mjs";
import { _ as upperFirst, a as compose, c as isNil, d as matchPercent, f as omit$1, g as reverse, h as repeat, i as castArray, l as last, m as pick, n as asyncCompose, o as dropLast$2, p as parseFloat$1, r as capitalize, s as evolve, t as adjust, u as mapValues, v as without } from "../react-pdf__fns.mjs";
import { t as syllables } from "../hyphen+react-pdf__hyphenate.mjs";
//#region node_modules/color-string/node_modules/color-name/index.js
var colors = {
	aliceblue: [
		240,
		248,
		255
	],
	antiquewhite: [
		250,
		235,
		215
	],
	aqua: [
		0,
		255,
		255
	],
	aquamarine: [
		127,
		255,
		212
	],
	azure: [
		240,
		255,
		255
	],
	beige: [
		245,
		245,
		220
	],
	bisque: [
		255,
		228,
		196
	],
	black: [
		0,
		0,
		0
	],
	blanchedalmond: [
		255,
		235,
		205
	],
	blue: [
		0,
		0,
		255
	],
	blueviolet: [
		138,
		43,
		226
	],
	brown: [
		165,
		42,
		42
	],
	burlywood: [
		222,
		184,
		135
	],
	cadetblue: [
		95,
		158,
		160
	],
	chartreuse: [
		127,
		255,
		0
	],
	chocolate: [
		210,
		105,
		30
	],
	coral: [
		255,
		127,
		80
	],
	cornflowerblue: [
		100,
		149,
		237
	],
	cornsilk: [
		255,
		248,
		220
	],
	crimson: [
		220,
		20,
		60
	],
	cyan: [
		0,
		255,
		255
	],
	darkblue: [
		0,
		0,
		139
	],
	darkcyan: [
		0,
		139,
		139
	],
	darkgoldenrod: [
		184,
		134,
		11
	],
	darkgray: [
		169,
		169,
		169
	],
	darkgreen: [
		0,
		100,
		0
	],
	darkgrey: [
		169,
		169,
		169
	],
	darkkhaki: [
		189,
		183,
		107
	],
	darkmagenta: [
		139,
		0,
		139
	],
	darkolivegreen: [
		85,
		107,
		47
	],
	darkorange: [
		255,
		140,
		0
	],
	darkorchid: [
		153,
		50,
		204
	],
	darkred: [
		139,
		0,
		0
	],
	darksalmon: [
		233,
		150,
		122
	],
	darkseagreen: [
		143,
		188,
		143
	],
	darkslateblue: [
		72,
		61,
		139
	],
	darkslategray: [
		47,
		79,
		79
	],
	darkslategrey: [
		47,
		79,
		79
	],
	darkturquoise: [
		0,
		206,
		209
	],
	darkviolet: [
		148,
		0,
		211
	],
	deeppink: [
		255,
		20,
		147
	],
	deepskyblue: [
		0,
		191,
		255
	],
	dimgray: [
		105,
		105,
		105
	],
	dimgrey: [
		105,
		105,
		105
	],
	dodgerblue: [
		30,
		144,
		255
	],
	firebrick: [
		178,
		34,
		34
	],
	floralwhite: [
		255,
		250,
		240
	],
	forestgreen: [
		34,
		139,
		34
	],
	fuchsia: [
		255,
		0,
		255
	],
	gainsboro: [
		220,
		220,
		220
	],
	ghostwhite: [
		248,
		248,
		255
	],
	gold: [
		255,
		215,
		0
	],
	goldenrod: [
		218,
		165,
		32
	],
	gray: [
		128,
		128,
		128
	],
	green: [
		0,
		128,
		0
	],
	greenyellow: [
		173,
		255,
		47
	],
	grey: [
		128,
		128,
		128
	],
	honeydew: [
		240,
		255,
		240
	],
	hotpink: [
		255,
		105,
		180
	],
	indianred: [
		205,
		92,
		92
	],
	indigo: [
		75,
		0,
		130
	],
	ivory: [
		255,
		255,
		240
	],
	khaki: [
		240,
		230,
		140
	],
	lavender: [
		230,
		230,
		250
	],
	lavenderblush: [
		255,
		240,
		245
	],
	lawngreen: [
		124,
		252,
		0
	],
	lemonchiffon: [
		255,
		250,
		205
	],
	lightblue: [
		173,
		216,
		230
	],
	lightcoral: [
		240,
		128,
		128
	],
	lightcyan: [
		224,
		255,
		255
	],
	lightgoldenrodyellow: [
		250,
		250,
		210
	],
	lightgray: [
		211,
		211,
		211
	],
	lightgreen: [
		144,
		238,
		144
	],
	lightgrey: [
		211,
		211,
		211
	],
	lightpink: [
		255,
		182,
		193
	],
	lightsalmon: [
		255,
		160,
		122
	],
	lightseagreen: [
		32,
		178,
		170
	],
	lightskyblue: [
		135,
		206,
		250
	],
	lightslategray: [
		119,
		136,
		153
	],
	lightslategrey: [
		119,
		136,
		153
	],
	lightsteelblue: [
		176,
		196,
		222
	],
	lightyellow: [
		255,
		255,
		224
	],
	lime: [
		0,
		255,
		0
	],
	limegreen: [
		50,
		205,
		50
	],
	linen: [
		250,
		240,
		230
	],
	magenta: [
		255,
		0,
		255
	],
	maroon: [
		128,
		0,
		0
	],
	mediumaquamarine: [
		102,
		205,
		170
	],
	mediumblue: [
		0,
		0,
		205
	],
	mediumorchid: [
		186,
		85,
		211
	],
	mediumpurple: [
		147,
		112,
		219
	],
	mediumseagreen: [
		60,
		179,
		113
	],
	mediumslateblue: [
		123,
		104,
		238
	],
	mediumspringgreen: [
		0,
		250,
		154
	],
	mediumturquoise: [
		72,
		209,
		204
	],
	mediumvioletred: [
		199,
		21,
		133
	],
	midnightblue: [
		25,
		25,
		112
	],
	mintcream: [
		245,
		255,
		250
	],
	mistyrose: [
		255,
		228,
		225
	],
	moccasin: [
		255,
		228,
		181
	],
	navajowhite: [
		255,
		222,
		173
	],
	navy: [
		0,
		0,
		128
	],
	oldlace: [
		253,
		245,
		230
	],
	olive: [
		128,
		128,
		0
	],
	olivedrab: [
		107,
		142,
		35
	],
	orange: [
		255,
		165,
		0
	],
	orangered: [
		255,
		69,
		0
	],
	orchid: [
		218,
		112,
		214
	],
	palegoldenrod: [
		238,
		232,
		170
	],
	palegreen: [
		152,
		251,
		152
	],
	paleturquoise: [
		175,
		238,
		238
	],
	palevioletred: [
		219,
		112,
		147
	],
	papayawhip: [
		255,
		239,
		213
	],
	peachpuff: [
		255,
		218,
		185
	],
	peru: [
		205,
		133,
		63
	],
	pink: [
		255,
		192,
		203
	],
	plum: [
		221,
		160,
		221
	],
	powderblue: [
		176,
		224,
		230
	],
	purple: [
		128,
		0,
		128
	],
	rebeccapurple: [
		102,
		51,
		153
	],
	red: [
		255,
		0,
		0
	],
	rosybrown: [
		188,
		143,
		143
	],
	royalblue: [
		65,
		105,
		225
	],
	saddlebrown: [
		139,
		69,
		19
	],
	salmon: [
		250,
		128,
		114
	],
	sandybrown: [
		244,
		164,
		96
	],
	seagreen: [
		46,
		139,
		87
	],
	seashell: [
		255,
		245,
		238
	],
	sienna: [
		160,
		82,
		45
	],
	silver: [
		192,
		192,
		192
	],
	skyblue: [
		135,
		206,
		235
	],
	slateblue: [
		106,
		90,
		205
	],
	slategray: [
		112,
		128,
		144
	],
	slategrey: [
		112,
		128,
		144
	],
	snow: [
		255,
		250,
		250
	],
	springgreen: [
		0,
		255,
		127
	],
	steelblue: [
		70,
		130,
		180
	],
	tan: [
		210,
		180,
		140
	],
	teal: [
		0,
		128,
		128
	],
	thistle: [
		216,
		191,
		216
	],
	tomato: [
		255,
		99,
		71
	],
	turquoise: [
		64,
		224,
		208
	],
	violet: [
		238,
		130,
		238
	],
	wheat: [
		245,
		222,
		179
	],
	white: [
		255,
		255,
		255
	],
	whitesmoke: [
		245,
		245,
		245
	],
	yellow: [
		255,
		255,
		0
	],
	yellowgreen: [
		154,
		205,
		50
	]
};
for (const key in colors) Object.freeze(colors[key]);
var color_name_default = Object.freeze(colors);
//#endregion
//#region node_modules/color-string/index.js
var reverseNames = Object.create(null);
for (const name in color_name_default) if (Object.hasOwn(color_name_default, name)) reverseNames[color_name_default[name]] = name;
var cs = {
	to: {},
	get: {}
};
cs.get = function(string) {
	const prefix = string.slice(0, 3).toLowerCase();
	let value;
	let model;
	switch (prefix) {
		case "hsl":
			value = cs.get.hsl(string);
			model = "hsl";
			break;
		case "hwb":
			value = cs.get.hwb(string);
			model = "hwb";
			break;
		default:
			value = cs.get.rgb(string);
			model = "rgb";
	}
	if (!value) return null;
	return {
		model,
		value
	};
};
cs.get.rgb = function(string) {
	if (!string) return null;
	const abbr = /^#([a-f\d]{3,4})$/i;
	const hex = /^#([a-f\d]{6})([a-f\d]{2})?$/i;
	const rgba = /^rgba?\(\s*([+-]?(?:\d*\.)?\d+(?:e\d+)?)(?=[\s,])\s*(?:,\s*)?([+-]?(?:\d*\.)?\d+(?:e\d+)?)(?=[\s,])\s*(?:,\s*)?([+-]?(?:\d*\.)?\d+(?:e\d+)?)\s*(?:[\s,|/]\s*([+-]?(?:\d*\.)?\d+(?:e\d+)?)(%?)\s*)?\)$/i;
	const per = /^rgba?\(\s*([+-]?[\d.]+)%\s*,?\s*([+-]?[\d.]+)%\s*,?\s*([+-]?[\d.]+)%\s*(?:[\s,|/]\s*([+-]?[\d.]+)(%?)\s*)?\)$/i;
	const keyword = /^(\w+)$/;
	let rgb = [
		0,
		0,
		0,
		1
	];
	let match;
	let i;
	let hexAlpha;
	if (match = string.match(hex)) {
		hexAlpha = match[2];
		match = match[1];
		for (i = 0; i < 3; i++) {
			const i2 = i * 2;
			rgb[i] = Number.parseInt(match.slice(i2, i2 + 2), 16);
		}
		if (hexAlpha) rgb[3] = Number.parseInt(hexAlpha, 16) / 255;
	} else if (match = string.match(abbr)) {
		match = match[1];
		hexAlpha = match[3];
		for (i = 0; i < 3; i++) rgb[i] = Number.parseInt(match[i] + match[i], 16);
		if (hexAlpha) rgb[3] = Number.parseInt(hexAlpha + hexAlpha, 16) / 255;
	} else if (match = string.match(rgba)) {
		for (i = 0; i < 3; i++) rgb[i] = Number.parseFloat(match[i + 1]);
		if (match[4]) rgb[3] = match[5] ? Number.parseFloat(match[4]) * .01 : Number.parseFloat(match[4]);
	} else if (match = string.match(per)) {
		for (i = 0; i < 3; i++) rgb[i] = Math.round(Number.parseFloat(match[i + 1]) * 2.55);
		if (match[4]) rgb[3] = match[5] ? Number.parseFloat(match[4]) * .01 : Number.parseFloat(match[4]);
	} else if (match = string.toLowerCase().match(keyword)) {
		if (match[1] === "transparent") return [
			0,
			0,
			0,
			0
		];
		if (!Object.hasOwn(color_name_default, match[1])) return null;
		rgb = color_name_default[match[1]].slice();
		rgb[3] = 1;
		return rgb;
	} else return null;
	for (i = 0; i < 3; i++) rgb[i] = clamp(rgb[i], 0, 255);
	rgb[3] = clamp(rgb[3], 0, 1);
	return rgb;
};
cs.get.hsl = function(string) {
	if (!string) return null;
	const match = string.match(/^hsla?\(\s*([+-]?(?:\d{0,3}\.)?\d+)(?:deg)?\s*,?\s*([+-]?[\d.]+)%\s*,?\s*([+-]?[\d.]+)%\s*(?:[,|/]\s*([+-]?(?=\.\d|\d)(?:0|[1-9]\d*)?(?:\.\d*)?(?:e[+-]?\d+)?)\s*)?\)$/i);
	if (match) {
		const alpha = Number.parseFloat(match[4]);
		return [
			(Number.parseFloat(match[1]) % 360 + 360) % 360,
			clamp(Number.parseFloat(match[2]), 0, 100),
			clamp(Number.parseFloat(match[3]), 0, 100),
			clamp(Number.isNaN(alpha) ? 1 : alpha, 0, 1)
		];
	}
	return null;
};
cs.get.hwb = function(string) {
	if (!string) return null;
	const match = string.match(/^hwb\(\s*([+-]?\d{0,3}(?:\.\d+)?)(?:deg)?\s*[\s,]\s*([+-]?[\d.]+)%\s*[\s,]\s*([+-]?[\d.]+)%\s*(?:[\s,]\s*([+-]?(?=\.\d|\d)(?:0|[1-9]\d*)?(?:\.\d*)?(?:e[+-]?\d+)?)\s*)?\)$/i);
	if (match) {
		const alpha = Number.parseFloat(match[4]);
		return [
			(Number.parseFloat(match[1]) % 360 + 360) % 360,
			clamp(Number.parseFloat(match[2]), 0, 100),
			clamp(Number.parseFloat(match[3]), 0, 100),
			clamp(Number.isNaN(alpha) ? 1 : alpha, 0, 1)
		];
	}
	return null;
};
cs.to.hex = function(...rgba) {
	return "#" + hexDouble(rgba[0]) + hexDouble(rgba[1]) + hexDouble(rgba[2]) + (rgba[3] < 1 ? hexDouble(Math.round(rgba[3] * 255)) : "");
};
cs.to.rgb = function(...rgba) {
	return rgba.length < 4 || rgba[3] === 1 ? "rgb(" + Math.round(rgba[0]) + ", " + Math.round(rgba[1]) + ", " + Math.round(rgba[2]) + ")" : "rgba(" + Math.round(rgba[0]) + ", " + Math.round(rgba[1]) + ", " + Math.round(rgba[2]) + ", " + rgba[3] + ")";
};
cs.to.rgb.percent = function(...rgba) {
	const r = Math.round(rgba[0] / 255 * 100);
	const g = Math.round(rgba[1] / 255 * 100);
	const b = Math.round(rgba[2] / 255 * 100);
	return rgba.length < 4 || rgba[3] === 1 ? "rgb(" + r + "%, " + g + "%, " + b + "%)" : "rgba(" + r + "%, " + g + "%, " + b + "%, " + rgba[3] + ")";
};
cs.to.hsl = function(...hsla) {
	return hsla.length < 4 || hsla[3] === 1 ? "hsl(" + hsla[0] + ", " + hsla[1] + "%, " + hsla[2] + "%)" : "hsla(" + hsla[0] + ", " + hsla[1] + "%, " + hsla[2] + "%, " + hsla[3] + ")";
};
cs.to.hwb = function(...hwba) {
	let a = "";
	if (hwba.length >= 4 && hwba[3] !== 1) a = ", " + hwba[3];
	return "hwb(" + hwba[0] + ", " + hwba[1] + "%, " + hwba[2] + "%" + a + ")";
};
cs.to.keyword = function(...rgb) {
	return reverseNames[rgb.slice(0, 3)];
};
function clamp(number_, min, max) {
	return Math.min(Math.max(min, number_), max);
}
function hexDouble(number_) {
	const string_ = Math.round(number_).toString(16).toUpperCase();
	return string_.length < 2 ? "0" + string_ : string_;
}
//#endregion
//#region node_modules/media-engine/dist/queries.js
var require_queries = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Query;
	function Query(type, value) {
		var size = Number(value);
		switch (type) {
			case "max-height": return { match: function(o) {
				return o.height !== void 0 && size >= o.height;
			} };
			case "min-height": return { match: function(o) {
				return o.height !== void 0 && size <= o.height;
			} };
			case "max-width": return { match: function(o) {
				return o.width !== void 0 && size >= o.width;
			} };
			case "min-width": return { match: function(o) {
				return o.width !== void 0 && size <= o.width;
			} };
			case "orientation": return { match: function(o) {
				return value === o.orientation;
			} };
			default: throw new Error(value);
		}
	}
}));
//#endregion
//#region node_modules/media-engine/dist/operators.js
var require_operators = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Operator;
	function Operator(type, left, right) {
		switch (type) {
			case "and": return { match: function(o) {
				return left.match(o) && right.match(o);
			} };
			case ",": return { match: function(o) {
				return left.match(o) || right.match(o);
			} };
			default: throw new Error(type);
		}
	}
}));
//#endregion
//#region node_modules/media-engine/dist/parser.js
var require_parser = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.parse = parse;
	var queries_1 = require_queries();
	var operators_1 = require_operators();
	var NUMBERS = /[0-9]/;
	var LETTERS = /[a-z|\-]/i;
	var WHITESPACE = /\s/;
	var COLON = /:/;
	var COMMA = /,/;
	var AND = /and$/;
	var AT = /@/;
	function tokenizer(input) {
		var current = 0;
		var tokens = [];
		while (current < input.length) {
			var char = input[current];
			if (AT.test(char)) {
				char = input[++current];
				while (LETTERS.test(char) && char !== void 0) char = input[++current];
			}
			if (WHITESPACE.test(char) || char === ")" || char === "(") {
				current++;
				continue;
			}
			if (COLON.test(char) || COMMA.test(char)) {
				current++;
				tokens.push({
					type: "operator",
					value: char
				});
				continue;
			}
			if (NUMBERS.test(char)) {
				var value = "";
				while (NUMBERS.test(char)) {
					value += char;
					char = input[++current];
				}
				tokens.push({
					type: "number",
					value
				});
				continue;
			}
			if (LETTERS.test(char)) {
				var value = "";
				while (LETTERS.test(char) && char !== void 0) {
					value += char;
					char = input[++current];
				}
				if (AND.test(value)) tokens.push({
					type: "operator",
					value
				});
				else tokens.push({
					type: "literal",
					value
				});
				continue;
			}
			throw new TypeError("Tokenizer: I dont know what this character is: " + char);
		}
		return tokens;
	}
	function parser(tokens) {
		var output = [];
		var stack = [];
		while (tokens.length > 0) {
			var token = tokens.shift();
			if (token.type === "number" || token.type === "literal") {
				output.push(token);
				continue;
			}
			if (token.type === "operator") {
				if (COLON.test(token.value)) {
					token = {
						type: "query",
						key: output.pop(),
						value: tokens.shift()
					};
					output.push(token);
					continue;
				}
				while (stack.length > 0) output.unshift(stack.pop());
				stack.push(token);
			}
		}
		while (stack.length > 0) output.unshift(stack.pop());
		function walk() {
			var head = output.shift();
			if (head.type === "number" || head.type === "literal") return head.value;
			if (head.type === "operator") {
				var l = walk();
				var r = walk();
				return (0, operators_1.default)(head.value, l, r);
			}
			if (head.type === "query") return (0, queries_1.default)(head.key.value, head.value.value);
			throw new TypeError(head.type);
		}
		return walk();
	}
	var cache = {};
	function parse(query) {
		if (!cache[query]) cache[query] = parser(tokenizer(query));
		return cache[query];
	}
}));
//#endregion
//#region node_modules/media-engine/dist/index.js
var require_dist = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var parser_1 = require_parser();
	function matchMedia(queries, options) {
		var result = {};
		Object.keys(queries).forEach(function(query) {
			if ((0, parser_1.parse)(query).match(options)) Object.assign(result, queries[query]);
		});
		return result;
	}
	module.exports = matchMedia;
}));
//#endregion
//#region node_modules/hsl-to-rgb-for-reals/converter.js
var require_converter = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var hslToRgb = function(hue, saturation, lightness) {
		if (hue == void 0) return [
			0,
			0,
			0
		];
		var chroma = (1 - Math.abs(2 * lightness - 1)) * saturation;
		var huePrime = hue / 60;
		var secondComponent = chroma * (1 - Math.abs(huePrime % 2 - 1));
		huePrime = Math.floor(huePrime);
		var red;
		var green;
		var blue;
		if (huePrime === 0) {
			red = chroma;
			green = secondComponent;
			blue = 0;
		} else if (huePrime === 1) {
			red = secondComponent;
			green = chroma;
			blue = 0;
		} else if (huePrime === 2) {
			red = 0;
			green = chroma;
			blue = secondComponent;
		} else if (huePrime === 3) {
			red = 0;
			green = secondComponent;
			blue = chroma;
		} else if (huePrime === 4) {
			red = secondComponent;
			green = 0;
			blue = chroma;
		} else if (huePrime === 5) {
			red = chroma;
			green = 0;
			blue = secondComponent;
		}
		var lightnessAdjustment = lightness - chroma / 2;
		red += lightnessAdjustment;
		green += lightnessAdjustment;
		blue += lightnessAdjustment;
		return [
			Math.abs(Math.round(red * 255)),
			Math.abs(Math.round(green * 255)),
			Math.abs(Math.round(blue * 255))
		];
	};
	module.exports = hslToRgb;
}));
//#endregion
//#region node_modules/hsl-to-hex/index.js
var require_hsl_to_hex = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var toRgb = require_converter();
	function max(val, n) {
		return val > n ? n : val;
	}
	function min(val, n) {
		return val < n ? n : val;
	}
	function cycle(val) {
		val = max(val, 1e7);
		val = min(val, -1e7);
		while (val < 0) val += 360;
		while (val > 359) val -= 360;
		return val;
	}
	function hsl(hue, saturation, luminosity) {
		hue = cycle(hue);
		saturation = min(max(saturation, 100), 0);
		luminosity = min(max(luminosity, 100), 0);
		saturation /= 100;
		luminosity /= 100;
		return "#" + toRgb(hue, saturation, luminosity).map(function(n) {
			return (256 + n).toString(16).substr(-2);
		}).join("");
	}
	module.exports = hsl;
}));
//#endregion
//#region node_modules/postcss-value-parser/lib/parse.js
var require_parse = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var openParentheses = "(".charCodeAt(0);
	var closeParentheses = ")".charCodeAt(0);
	var singleQuote = "'".charCodeAt(0);
	var doubleQuote = "\"".charCodeAt(0);
	var backslash = "\\".charCodeAt(0);
	var slash = "/".charCodeAt(0);
	var comma = ",".charCodeAt(0);
	var colon = ":".charCodeAt(0);
	var star = "*".charCodeAt(0);
	var uLower = "u".charCodeAt(0);
	var uUpper = "U".charCodeAt(0);
	var plus = "+".charCodeAt(0);
	var isUnicodeRange = /^[a-f0-9?-]+$/i;
	module.exports = function(input) {
		var tokens = [];
		var value = input;
		var next, quote, prev, token, escape, escapePos, whitespacePos, parenthesesOpenPos;
		var pos = 0;
		var code = value.charCodeAt(pos);
		var max = value.length;
		var stack = [{ nodes: tokens }];
		var balanced = 0;
		var parent;
		var name = "";
		var before = "";
		var after = "";
		while (pos < max) if (code <= 32) {
			next = pos;
			do {
				next += 1;
				code = value.charCodeAt(next);
			} while (code <= 32);
			token = value.slice(pos, next);
			prev = tokens[tokens.length - 1];
			if (code === closeParentheses && balanced) after = token;
			else if (prev && prev.type === "div") {
				prev.after = token;
				prev.sourceEndIndex += token.length;
			} else if (code === comma || code === colon || code === slash && value.charCodeAt(next + 1) !== star && (!parent || parent && parent.type === "function" && parent.value !== "calc")) before = token;
			else tokens.push({
				type: "space",
				sourceIndex: pos,
				sourceEndIndex: next,
				value: token
			});
			pos = next;
		} else if (code === singleQuote || code === doubleQuote) {
			next = pos;
			quote = code === singleQuote ? "'" : "\"";
			token = {
				type: "string",
				sourceIndex: pos,
				quote
			};
			do {
				escape = false;
				next = value.indexOf(quote, next + 1);
				if (~next) {
					escapePos = next;
					while (value.charCodeAt(escapePos - 1) === backslash) {
						escapePos -= 1;
						escape = !escape;
					}
				} else {
					value += quote;
					next = value.length - 1;
					token.unclosed = true;
				}
			} while (escape);
			token.value = value.slice(pos + 1, next);
			token.sourceEndIndex = token.unclosed ? next : next + 1;
			tokens.push(token);
			pos = next + 1;
			code = value.charCodeAt(pos);
		} else if (code === slash && value.charCodeAt(pos + 1) === star) {
			next = value.indexOf("*/", pos);
			token = {
				type: "comment",
				sourceIndex: pos,
				sourceEndIndex: next + 2
			};
			if (next === -1) {
				token.unclosed = true;
				next = value.length;
				token.sourceEndIndex = next;
			}
			token.value = value.slice(pos + 2, next);
			tokens.push(token);
			pos = next + 2;
			code = value.charCodeAt(pos);
		} else if ((code === slash || code === star) && parent && parent.type === "function" && parent.value === "calc") {
			token = value[pos];
			tokens.push({
				type: "word",
				sourceIndex: pos - before.length,
				sourceEndIndex: pos + token.length,
				value: token
			});
			pos += 1;
			code = value.charCodeAt(pos);
		} else if (code === slash || code === comma || code === colon) {
			token = value[pos];
			tokens.push({
				type: "div",
				sourceIndex: pos - before.length,
				sourceEndIndex: pos + token.length,
				value: token,
				before,
				after: ""
			});
			before = "";
			pos += 1;
			code = value.charCodeAt(pos);
		} else if (openParentheses === code) {
			next = pos;
			do {
				next += 1;
				code = value.charCodeAt(next);
			} while (code <= 32);
			parenthesesOpenPos = pos;
			token = {
				type: "function",
				sourceIndex: pos - name.length,
				value: name,
				before: value.slice(parenthesesOpenPos + 1, next)
			};
			pos = next;
			if (name === "url" && code !== singleQuote && code !== doubleQuote) {
				next -= 1;
				do {
					escape = false;
					next = value.indexOf(")", next + 1);
					if (~next) {
						escapePos = next;
						while (value.charCodeAt(escapePos - 1) === backslash) {
							escapePos -= 1;
							escape = !escape;
						}
					} else {
						value += ")";
						next = value.length - 1;
						token.unclosed = true;
					}
				} while (escape);
				whitespacePos = next;
				do {
					whitespacePos -= 1;
					code = value.charCodeAt(whitespacePos);
				} while (code <= 32);
				if (parenthesesOpenPos < whitespacePos) {
					if (pos !== whitespacePos + 1) token.nodes = [{
						type: "word",
						sourceIndex: pos,
						sourceEndIndex: whitespacePos + 1,
						value: value.slice(pos, whitespacePos + 1)
					}];
					else token.nodes = [];
					if (token.unclosed && whitespacePos + 1 !== next) {
						token.after = "";
						token.nodes.push({
							type: "space",
							sourceIndex: whitespacePos + 1,
							sourceEndIndex: next,
							value: value.slice(whitespacePos + 1, next)
						});
					} else {
						token.after = value.slice(whitespacePos + 1, next);
						token.sourceEndIndex = next;
					}
				} else {
					token.after = "";
					token.nodes = [];
				}
				pos = next + 1;
				token.sourceEndIndex = token.unclosed ? next : pos;
				code = value.charCodeAt(pos);
				tokens.push(token);
			} else {
				balanced += 1;
				token.after = "";
				token.sourceEndIndex = pos + 1;
				tokens.push(token);
				stack.push(token);
				tokens = token.nodes = [];
				parent = token;
			}
			name = "";
		} else if (closeParentheses === code && balanced) {
			pos += 1;
			code = value.charCodeAt(pos);
			parent.after = after;
			parent.sourceEndIndex += after.length;
			after = "";
			balanced -= 1;
			stack[stack.length - 1].sourceEndIndex = pos;
			stack.pop();
			parent = stack[balanced];
			tokens = parent.nodes;
		} else {
			next = pos;
			do {
				if (code === backslash) next += 1;
				next += 1;
				code = value.charCodeAt(next);
			} while (next < max && !(code <= 32 || code === singleQuote || code === doubleQuote || code === comma || code === colon || code === slash || code === openParentheses || code === star && parent && parent.type === "function" && parent.value === "calc" || code === slash && parent.type === "function" && parent.value === "calc" || code === closeParentheses && balanced));
			token = value.slice(pos, next);
			if (openParentheses === code) name = token;
			else if ((uLower === token.charCodeAt(0) || uUpper === token.charCodeAt(0)) && plus === token.charCodeAt(1) && isUnicodeRange.test(token.slice(2))) tokens.push({
				type: "unicode-range",
				sourceIndex: pos,
				sourceEndIndex: next,
				value: token
			});
			else tokens.push({
				type: "word",
				sourceIndex: pos,
				sourceEndIndex: next,
				value: token
			});
			pos = next;
		}
		for (pos = stack.length - 1; pos; pos -= 1) {
			stack[pos].unclosed = true;
			stack[pos].sourceEndIndex = value.length;
		}
		return stack[0].nodes;
	};
}));
//#endregion
//#region node_modules/postcss-value-parser/lib/unit.js
var require_unit = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var minus = "-".charCodeAt(0);
	var plus = "+".charCodeAt(0);
	var dot = ".".charCodeAt(0);
	var exp = "e".charCodeAt(0);
	var EXP = "E".charCodeAt(0);
	function likeNumber(value) {
		var code = value.charCodeAt(0);
		var nextCode;
		if (code === plus || code === minus) {
			nextCode = value.charCodeAt(1);
			if (nextCode >= 48 && nextCode <= 57) return true;
			var nextNextCode = value.charCodeAt(2);
			if (nextCode === dot && nextNextCode >= 48 && nextNextCode <= 57) return true;
			return false;
		}
		if (code === dot) {
			nextCode = value.charCodeAt(1);
			if (nextCode >= 48 && nextCode <= 57) return true;
			return false;
		}
		if (code >= 48 && code <= 57) return true;
		return false;
	}
	module.exports = function(value) {
		var pos = 0;
		var length = value.length;
		var code;
		var nextCode;
		var nextNextCode;
		if (length === 0 || !likeNumber(value)) return false;
		code = value.charCodeAt(pos);
		if (code === plus || code === minus) pos++;
		while (pos < length) {
			code = value.charCodeAt(pos);
			if (code < 48 || code > 57) break;
			pos += 1;
		}
		code = value.charCodeAt(pos);
		nextCode = value.charCodeAt(pos + 1);
		if (code === dot && nextCode >= 48 && nextCode <= 57) {
			pos += 2;
			while (pos < length) {
				code = value.charCodeAt(pos);
				if (code < 48 || code > 57) break;
				pos += 1;
			}
		}
		code = value.charCodeAt(pos);
		nextCode = value.charCodeAt(pos + 1);
		nextNextCode = value.charCodeAt(pos + 2);
		if ((code === exp || code === EXP) && (nextCode >= 48 && nextCode <= 57 || (nextCode === plus || nextCode === minus) && nextNextCode >= 48 && nextNextCode <= 57)) {
			pos += nextCode === plus || nextCode === minus ? 3 : 2;
			while (pos < length) {
				code = value.charCodeAt(pos);
				if (code < 48 || code > 57) break;
				pos += 1;
			}
		}
		return {
			number: value.slice(0, pos),
			unit: value.slice(pos)
		};
	};
}));
//#endregion
//#region node_modules/@react-pdf/stylesheet/lib/index.js
var import_dist = /* @__PURE__ */ __toESM(require_dist(), 1);
var import_hsl_to_hex = /* @__PURE__ */ __toESM(require_hsl_to_hex(), 1);
var import_parse = /* @__PURE__ */ __toESM(require_parse(), 1);
var import_unit = /* @__PURE__ */ __toESM(require_unit(), 1);
/**
* Remove nil values from array
*
* @param array - Style array
* @returns Style array without nils
*/
var compact = (array) => array.filter((item) => item != null);
/**
* Merges style objects array
*
* @param styles - Style array
* @returns Merged style object
*/
var mergeStyles$2 = (styles) => styles.reduce((acc, style) => {
	const s = Array.isArray(style) ? flatten$1(style) : style;
	if (!s) return acc;
	for (const key of Object.keys(s)) if (s[key] != null) acc[key] = s[key];
	return acc;
}, {});
/**
* Flattens an array of style objects, into one aggregated style object.
* Supports nested arrays of styles.
*
* @param styles - Style or style array (can be nested)
* @returns Flattened style object
*/
var flatten$1 = compose(mergeStyles$2, compact, castArray);
/**
* Resolves media queries in styles object
*
* @param container - Container for which styles are resolved
* @param style - Style description
* @returns Resolved style object
*/
var resolveMediaQueries = (container, style) => {
	return Object.entries(style).reduce((acc, [key, value]) => {
		if (key.startsWith("@media")) return {
			...acc,
			...(0, import_dist.default)({ [key]: value }, container)
		};
		return {
			...acc,
			[key]: value
		};
	}, {});
};
var isRgb = (value) => /^rgba?\(/i.test(value);
var isHsl = (value) => /^hsla?\(/i.test(value);
/**
* Transform rgb color to hexa
*
* @param value - Styles value
* @returns Transformed value
*/
var parseRgb = (value) => {
	const rgb = cs.get.rgb(value);
	if (!rgb) return value;
	return cs.to.hex(rgb[0], rgb[1], rgb[2], rgb[3]);
};
/**
* Transform Hsl color to hexa
*
* @param value - Styles value
* @returns Transformed value
*/
var parseHsl = (value) => {
	const hsl = cs.get.hsl(value);
	if (!hsl) return value;
	const [h, s, l, a] = hsl;
	const hex = (0, import_hsl_to_hex.default)(Math.round(h), Math.round(s), Math.round(l));
	if (a !== void 0 && a < 1) {
		const alphaHex = Math.round(a * 255).toString(16).toUpperCase().padStart(2, "0");
		return hex.toUpperCase() + alphaHex;
	}
	return hex.toUpperCase();
};
/**
* Transform given color to hexa
*
* @param value - Styles value
* @returns Transformed value
*/
var transformColor = (value) => {
	const trimmed = value?.trim();
	if (isRgb(trimmed)) return parseRgb(trimmed);
	if (isHsl(trimmed)) return parseHsl(trimmed);
	return trimmed;
};
var VALUE_REGEX = /^(-?\d*\.?\d+)(in|mm|cm|pt|vh|vw|px|rem)?$/;
var DEFAULT_DPI = 72;
var DEFAULT_REM_BASE = 18;
var MM_PER_INCH = 25.4;
var CM_PER_INCH = 2.54;
/**
* Parses scalar value in value and unit pairs
*
* @param value - Scalar value
* @returns Parsed value
*/
var parseValue$1 = (value) => {
	if (typeof value === "number") return {
		value,
		unit: void 0
	};
	const match = VALUE_REGEX.exec(value);
	return match ? {
		value: parseFloat(match[1]),
		unit: match[2] || "pt"
	} : {
		value,
		unit: void 0
	};
};
/**
* Transform given scalar value to points
*
* @param container - Container with dimensions and settings
* @param value - Styles value
* @returns Transformed value in points
*/
var transformUnit$1 = (container, value) => {
	const scalar = parseValue$1(value);
	if (typeof scalar.value !== "number") return scalar.value;
	const inputDpi = container.dpi || DEFAULT_DPI;
	switch (scalar.unit) {
		case "rem": return scalar.value * (container.remBase || DEFAULT_REM_BASE);
		case "in": return scalar.value * DEFAULT_DPI;
		case "mm": return scalar.value * (DEFAULT_DPI / MM_PER_INCH);
		case "cm": return scalar.value * (DEFAULT_DPI / CM_PER_INCH);
		case "vh": return scalar.value * (container.height / 100);
		case "vw": return scalar.value * (container.width / 100);
		case "px": return Math.round(scalar.value * (DEFAULT_DPI / inputDpi));
		default: return scalar.value;
	}
};
var processNumberValue = (key, value) => ({ [key]: parseFloat$1(value) });
var processUnitValue = (key, value, container) => ({ [key]: transformUnit$1(container, value) });
var processColorValue = (key, value) => {
	return { [key]: transformColor(value) };
};
var processNoopValue = (key, value) => ({ [key]: value });
var BORDER_SHORTHAND_REGEX = /^(?<width>-?\d+(?:\.\d+)?(?:in|mm|cm|pt|vw|vh|px|rem)?)\s+(?<style>\S+)\s+(?<color>.+)$/;
var matchBorderShorthand = (value) => BORDER_SHORTHAND_REGEX.exec(value);
var resolveBorderShorthand = (key, value, container) => {
	const match = matchBorderShorthand(`${value}`);
	if (!match) {
		if (key.match(/Color$/)) {
			const color = transformColor(`${value}`);
			return {
				borderTopColor: color,
				borderRightColor: color,
				borderBottomColor: color,
				borderLeftColor: color
			};
		}
		if (key.match(/Style$/)) {
			const style = value;
			if (typeof style === "number") throw new Error(`Invalid border style: ${style}`);
			return {
				borderTopStyle: style,
				borderRightStyle: style,
				borderBottomStyle: style,
				borderLeftStyle: style
			};
		}
		if (key.match(/Width$/)) {
			const width = transformUnit$1(container, value);
			if (typeof width !== "number") throw new Error(`Invalid border width: ${width}`);
			return {
				borderTopWidth: width,
				borderRightWidth: width,
				borderBottomWidth: width,
				borderLeftWidth: width
			};
		}
		if (key.match(/Radius$/)) {
			const radius = transformUnit$1(container, value);
			if (typeof radius !== "number") throw new Error(`Invalid border radius: ${radius}`);
			return {
				borderTopLeftRadius: radius,
				borderTopRightRadius: radius,
				borderBottomRightRadius: radius,
				borderBottomLeftRadius: radius
			};
		}
		return { [key]: value };
	}
	const { width: widthMatch, style: styleMatch, color: colorMatch } = match.groups;
	const style = styleMatch;
	const color = transformColor(colorMatch);
	const width = transformUnit$1(container, widthMatch);
	if (key.match(/(Top|Right|Bottom|Left)$/)) return {
		[`${key}Color`]: color,
		[`${key}Style`]: style,
		[`${key}Width`]: width
	};
	if (typeof width !== "number") throw new Error(`Invalid border width: ${width}`);
	if (typeof style === "number") throw new Error(`Invalid border style: ${style}`);
	return {
		borderTopColor: color,
		borderTopStyle: style,
		borderTopWidth: width,
		borderRightColor: color,
		borderRightStyle: style,
		borderRightWidth: width,
		borderBottomColor: color,
		borderBottomStyle: style,
		borderBottomWidth: width,
		borderLeftColor: color,
		borderLeftStyle: style,
		borderLeftWidth: width
	};
};
var handlers$c = {
	border: resolveBorderShorthand,
	borderBottom: resolveBorderShorthand,
	borderBottomColor: processColorValue,
	borderBottomLeftRadius: processUnitValue,
	borderBottomRightRadius: processUnitValue,
	borderBottomStyle: processNoopValue,
	borderBottomWidth: processUnitValue,
	borderColor: resolveBorderShorthand,
	borderLeft: resolveBorderShorthand,
	borderLeftColor: processColorValue,
	borderLeftStyle: processNoopValue,
	borderLeftWidth: processUnitValue,
	borderRadius: resolveBorderShorthand,
	borderRight: resolveBorderShorthand,
	borderRightColor: processColorValue,
	borderRightStyle: processNoopValue,
	borderRightWidth: processUnitValue,
	borderStyle: resolveBorderShorthand,
	borderTop: resolveBorderShorthand,
	borderTopColor: processColorValue,
	borderTopLeftRadius: processUnitValue,
	borderTopRightRadius: processUnitValue,
	borderTopStyle: processNoopValue,
	borderTopWidth: processUnitValue,
	borderWidth: resolveBorderShorthand
};
var handlers$b = {
	backgroundColor: processColorValue,
	color: processColorValue,
	opacity: processNumberValue
};
var handlers$a = {
	height: processUnitValue,
	maxHeight: processUnitValue,
	maxWidth: processUnitValue,
	minHeight: processUnitValue,
	minWidth: processUnitValue,
	width: processUnitValue
};
var flexDefaults = [
	1,
	1,
	0
];
var flexAuto = [
	1,
	1,
	"auto"
];
var flexNone = [
	0,
	0,
	"auto"
];
var flexInitial = [
	0,
	1,
	"auto"
];
var processFlexShorthand = (key, value, container) => {
	let defaults = flexDefaults;
	let matches = [];
	if (value === "auto") defaults = flexAuto;
	else if (value === "none") defaults = flexNone;
	else if (value === "initial") defaults = flexInitial;
	else matches = `${value}`.split(" ");
	return {
		flexGrow: parseFloat$1(matches[0] || defaults[0]),
		flexShrink: parseFloat$1(matches[1] || defaults[1]),
		flexBasis: transformUnit$1(container, matches[2] || defaults[2])
	};
};
var handlers$9 = {
	alignContent: processNoopValue,
	alignItems: processNoopValue,
	alignSelf: processNoopValue,
	flex: processFlexShorthand,
	flexBasis: processUnitValue,
	flexDirection: processNoopValue,
	flexFlow: processNoopValue,
	flexGrow: processNumberValue,
	flexShrink: processNumberValue,
	flexWrap: processNoopValue,
	justifyContent: processNoopValue,
	justifySelf: processNoopValue
};
var processGapShorthand = (_key, value, container) => {
	const parts = `${value}`.split(" ");
	return {
		rowGap: transformUnit$1(container, parts[0]),
		columnGap: transformUnit$1(container, parts[1] || parts[0])
	};
};
var handlers$8 = {
	gap: processGapShorthand,
	columnGap: processUnitValue,
	rowGap: processUnitValue
};
var handlers$7 = {
	aspectRatio: processNumberValue,
	bottom: processUnitValue,
	clear: processNoopValue,
	display: processNoopValue,
	float: processNoopValue,
	left: processUnitValue,
	position: processNoopValue,
	right: processUnitValue,
	top: processUnitValue,
	overflow: processNoopValue,
	zIndex: processNumberValue
};
var BOX_MODEL_UNITS = /* @__PURE__ */ new Set([
	"px",
	"in",
	"mm",
	"cm",
	"pt",
	"%",
	"vw",
	"vh",
	"rem",
	""
]);
var logError = (style, value) => {
	const name = style.toString();
	console.error(`
    @react-pdf/stylesheet parsing error:
    ${name}: ${value},
    ${" ".repeat(name.length + 2)}^
    Unsupported ${name} value format
  `);
};
/**
* @param options
* @param [options.expandsTo]
* @param [options.maxValues]
* @param [options.autoSupported]
*/
var expandBoxModel = ({ expandsTo, maxValues = 1, autoSupported = false } = {}) => (model, value, container) => {
	const nodes = (0, import_parse.default)(`${value}`);
	const parts = [];
	for (let i = 0; i < nodes.length; i++) {
		const node = nodes[i];
		if (node.type === "function" || node.type === "string" || node.type === "div") {
			logError(model, value);
			return {};
		}
		if (node.type === "word") {
			if (node.value === "auto" && autoSupported) parts.push(node.value);
			else {
				const result = (0, import_unit.default)(node.value);
				if (result && BOX_MODEL_UNITS.has(result.unit)) parts.push(node.value);
				else {
					logError(model, value);
					return {};
				}
			}
		}
	}
	if (parts.length > maxValues) {
		logError(model, value);
		return {};
	}
	const first = transformUnit$1(container, parts[0]);
	if (expandsTo) return expandsTo({
		first,
		second: transformUnit$1(container, parts[1] || parts[0]),
		third: transformUnit$1(container, parts[2] || parts[0]),
		fourth: transformUnit$1(container, parts[3] || parts[1] || parts[0])
	});
	return { [model]: first };
};
var processMargin = expandBoxModel({
	expandsTo: ({ first, second, third, fourth }) => ({
		marginTop: first,
		marginRight: second,
		marginBottom: third,
		marginLeft: fourth
	}),
	maxValues: 4,
	autoSupported: true
});
var processMarginVertical = expandBoxModel({
	expandsTo: ({ first, second }) => ({
		marginTop: first,
		marginBottom: second
	}),
	maxValues: 2,
	autoSupported: true
});
var processMarginHorizontal = expandBoxModel({
	expandsTo: ({ first, second }) => ({
		marginRight: first,
		marginLeft: second
	}),
	maxValues: 2,
	autoSupported: true
});
var processMarginSingle = expandBoxModel({ autoSupported: true });
var handlers$6 = {
	margin: processMargin,
	marginBottom: processMarginSingle,
	marginHorizontal: processMarginHorizontal,
	marginLeft: processMarginSingle,
	marginRight: processMarginSingle,
	marginTop: processMarginSingle,
	marginVertical: processMarginVertical
};
var processPadding = expandBoxModel({
	expandsTo: ({ first, second, third, fourth }) => ({
		paddingTop: first,
		paddingRight: second,
		paddingBottom: third,
		paddingLeft: fourth
	}),
	maxValues: 4
});
var processPaddingVertical = expandBoxModel({
	expandsTo: ({ first, second }) => ({
		paddingTop: first,
		paddingBottom: second
	}),
	maxValues: 2
});
var processPaddingHorizontal = expandBoxModel({
	expandsTo: ({ first, second }) => ({
		paddingRight: first,
		paddingLeft: second
	}),
	maxValues: 2
});
var processPaddingSingle = expandBoxModel();
var handlers$5 = {
	padding: processPadding,
	paddingBottom: processPaddingSingle,
	paddingHorizontal: processPaddingHorizontal,
	paddingLeft: processPaddingSingle,
	paddingRight: processPaddingSingle,
	paddingTop: processPaddingSingle,
	paddingVertical: processPaddingVertical
};
var offsetKeyword = (value) => {
	switch (value) {
		case "top":
		case "left": return "0%";
		case "right":
		case "bottom": return "100%";
		case "center": return "50%";
		default: return value;
	}
};
var isVerticalKeyword = (value) => value === "top" || value === "bottom";
var processObjectPosition = (key, value, container) => {
	const match = `${value}`.split(" ");
	let xValue;
	let yValue;
	if (match.length === 1) {
		if (isVerticalKeyword(match[0])) {
			xValue = "center";
			yValue = match[0];
		} else {
			xValue = match[0];
			yValue = "center";
		}
	} else {
		xValue = match[0];
		yValue = match[1];
	}
	return {
		objectPositionX: offsetKeyword(transformUnit$1(container, xValue)),
		objectPositionY: offsetKeyword(transformUnit$1(container, yValue))
	};
};
var processObjectPositionValue = (key, value, container) => ({ [key]: offsetKeyword(transformUnit$1(container, value)) });
var handlers$4 = {
	objectPosition: processObjectPosition,
	objectPositionX: processObjectPositionValue,
	objectPositionY: processObjectPositionValue,
	objectFit: processNoopValue
};
var H_KEYWORDS = {
	left: "0%",
	center: "50%",
	right: "100%"
};
var V_KEYWORDS = {
	top: "0%",
	center: "50%",
	bottom: "100%"
};
var splitTokens = (value) => value.trim().split(/\s+/).filter(Boolean);
var toScalar = (container, token) => transformUnit$1(container, token);
var parsePosition = (container, position) => {
	let [x = "center", y = "center"] = position ? splitTokens(position) : [];
	if (x === "top" || x === "bottom" || y === "left" || y === "right") [x, y] = [y, x];
	return {
		cx: H_KEYWORDS[x] ?? toScalar(container, x),
		cy: V_KEYWORDS[y] ?? toScalar(container, y)
	};
};
var parseRadius = (container, token) => {
	if (!token || token === "closest-side") return "closest-side";
	if (token === "farthest-side") return "farthest-side";
	return toScalar(container, token);
};
var parseCircle = (container, args) => {
	const [radius, position] = args.split(/\bat\b/);
	return {
		type: "circle",
		...parsePosition(container, position),
		r: parseRadius(container, radius.trim())
	};
};
var parseEllipse = (container, args) => {
	const [radii, position] = args.split(/\bat\b/);
	const [rx = "", ry = ""] = splitTokens(radii);
	return {
		type: "ellipse",
		...parsePosition(container, position),
		rx: parseRadius(container, rx),
		ry: parseRadius(container, ry)
	};
};
var parsePolygon = (container, args) => {
	const parts = args.split(",").map((part) => part.trim());
	if (parts[0] === "nonzero" || parts[0] === "evenodd") parts.shift();
	const points = parts.filter(Boolean).map((pair) => {
		const [x = "0", y = "0"] = splitTokens(pair);
		return {
			x: toScalar(container, x),
			y: toScalar(container, y)
		};
	});
	return points.length < 3 ? null : {
		type: "polygon",
		points
	};
};
var parseInset = (container, args) => {
	const tokens = splitTokens(args.split(/\bround\b/)[0]);
	if (tokens.length === 0) return null;
	const [t, r = t, b = t, l = r] = tokens;
	return {
		type: "inset",
		top: toScalar(container, t),
		right: toScalar(container, r),
		bottom: toScalar(container, b),
		left: toScalar(container, l)
	};
};
/**
* Parse a CSS shape-outside basic shape. Lengths resolve to points here;
* percentages and side keywords stay symbolic because they depend on the
* float's laid-out box, which layout resolves later.
* Unsupported values (url(), reference boxes, malformed input) drop the
* property so layout falls back to the plain box exclusion.
*/
var parseShapeOutside = (container, value) => {
	const match = /^([a-z-]+)\((.*)\)$/i.exec(value.trim());
	if (!match) return null;
	const [, fn, args] = match;
	switch (fn) {
		case "circle": return parseCircle(container, args);
		case "ellipse": return parseEllipse(container, args);
		case "polygon": return parsePolygon(container, args);
		case "inset": return parseInset(container, args);
		default: return null;
	}
};
var processShapeOutside = (key, value, container) => {
	if (!value) return {};
	const shape = typeof value === "string" ? parseShapeOutside(container, value) : value;
	return shape ? { shapeOutside: shape } : {};
};
var handlers$3 = { shapeOutside: processShapeOutside };
var castInt = (value) => {
	if (typeof value === "number") return value;
	return parseInt(value, 10);
};
var DEFAULT_FONT_SIZE = 18;
var FONT_WEIGHTS = {
	thin: 100,
	hairline: 100,
	ultralight: 200,
	extralight: 200,
	light: 300,
	normal: 400,
	medium: 500,
	semibold: 600,
	demibold: 600,
	bold: 700,
	ultrabold: 800,
	extrabold: 800,
	heavy: 900,
	black: 900
};
var transformFontWeight = (value) => {
	if (!value) return FONT_WEIGHTS.normal;
	if (typeof value === "number") return value;
	const lv = value.toLowerCase();
	if (lv in FONT_WEIGHTS) return FONT_WEIGHTS[lv];
	return castInt(value);
};
var processFontWeight = (key, value) => {
	return { [key]: transformFontWeight(value) };
};
var transformFontFeatureSettings = (value) => {
	if (!value) return void 0;
	if (Array.isArray(value)) return Object.fromEntries(value.map((tag) => [tag, true]));
	return Object.fromEntries(Object.entries(value).map(([tag, enabled]) => [tag, Boolean(enabled)]));
};
var processFontFeatureSettings = (key, value) => {
	return { [key]: transformFontFeatureSettings(value) };
};
var transformLineHeight = (value, styles, container) => {
	if (value === "") return value;
	const fontSize = transformUnit$1(container, styles.fontSize || DEFAULT_FONT_SIZE);
	const lineHeight = transformUnit$1(container, value);
	const { percent } = matchPercent(lineHeight) || {};
	if (percent) return percent * fontSize;
	return isNaN(Number(value)) ? lineHeight : lineHeight * fontSize;
};
var processLineHeight = (key, value, container, styles) => {
	return { [key]: transformLineHeight(value, styles, container) };
};
var handlers$2 = {
	direction: processNoopValue,
	fontFamily: processNoopValue,
	fontSize: processUnitValue,
	fontStyle: processNoopValue,
	fontWeight: processFontWeight,
	fontFeatureSettings: processFontFeatureSettings,
	letterSpacing: processUnitValue,
	lineHeight: processLineHeight,
	maxLines: processNumberValue,
	textAlign: processNoopValue,
	textDecoration: processNoopValue,
	textDecorationColor: processColorValue,
	textDecorationStyle: processNoopValue,
	textIndent: processNoopValue,
	textOverflow: processNoopValue,
	textTransform: processNoopValue,
	verticalAlign: processNoopValue
};
var matchNumber = (value) => /^-?(\d+\.?\d*|\d*\.\d+)$/.test(value);
var castFloat = (value) => {
	if (typeof value !== "string") return value;
	if (matchNumber(value)) return parseFloat(value);
	return value;
};
var parse = (transformString) => {
	const transforms = transformString.trim().split(/\)[ ,]|\)/);
	if (transforms.length === 1) return [[transforms[0], true]];
	const parsed = [];
	for (let i = 0; i < transforms.length; i += 1) {
		const transform = transforms[i];
		if (transform) {
			const [name, rawValue] = transform.split("(");
			const splitChar = rawValue.indexOf(",") >= 0 ? "," : " ";
			const value = rawValue.split(splitChar).map((val) => val.trim());
			parsed.push({
				operation: name.trim(),
				value
			});
		}
	}
	return parsed;
};
var parseAngle = (value) => {
	const match = /(-?\d*\.?\d*)(\w*)?/i.exec(value);
	const angle = match?.[1] ?? "";
	const unit = match?.[2] ?? "";
	const number = Number.parseFloat(angle);
	return unit === "rad" ? number * 180 / Math.PI : number;
};
var normalizeTransformOperation = ({ operation, value }) => {
	switch (operation) {
		case "scale": {
			const [scaleX, scaleY = scaleX] = value.map((num) => Number.parseFloat(num));
			return {
				operation: "scale",
				value: [scaleX, scaleY]
			};
		}
		case "scaleX": return {
			operation: "scale",
			value: [Number.parseFloat(value[0]), 1]
		};
		case "scaleY": return {
			operation: "scale",
			value: [1, Number.parseFloat(value[0])]
		};
		case "rotate": return {
			operation: "rotate",
			value: [
				parseAngle(value[0]),
				value[1] ? Number.parseFloat(value[1]) : 0,
				value[2] ? Number.parseFloat(value[2]) : 0
			]
		};
		case "translate": {
			const [x, y] = value.map((num) => Number.parseFloat(num));
			return {
				operation: "translate",
				value: [x, y]
			};
		}
		case "translateX": return {
			operation: "translate",
			value: [Number.parseFloat(value[0]), 0]
		};
		case "translateY": return {
			operation: "translate",
			value: [0, Number.parseFloat(value[0])]
		};
		case "skew": return {
			operation: "skew",
			value: value.map(parseAngle)
		};
		case "skewX": return {
			operation: "skew",
			value: [parseAngle(value[0]), 0]
		};
		case "skewY": return {
			operation: "skew",
			value: [0, parseAngle(value[0])]
		};
		default: return {
			operation,
			value: value.map((num) => Number.parseFloat(num))
		};
	}
};
var normalize$1 = (operations) => {
	return operations.map((operation) => normalizeTransformOperation(operation));
};
var processTransform = (key, value) => {
	if (typeof value !== "string") return { [key]: value };
	return { [key]: normalize$1(parse(value)) };
};
var Y_AXIS_SHORTHANDS = {
	top: true,
	bottom: true
};
var sortTransformOriginPair = (a, b) => {
	if (Y_AXIS_SHORTHANDS[a]) return 1;
	if (Y_AXIS_SHORTHANDS[b]) return -1;
	return 0;
};
var getTransformOriginPair = (values) => {
	if (!values || values.length === 0) return ["center", "center"];
	return (values.length === 1 ? [values[0], "center"] : [values[0], values[1]]).sort(sortTransformOriginPair);
};
var processTransformOriginShorthand = (key, value, container) => {
	const pair = getTransformOriginPair(`${value}`.split(" "));
	const transformOriginX = transformUnit$1(container, pair[0]);
	const transformOriginY = transformUnit$1(container, pair[1]);
	return {
		transformOriginX: offsetKeyword(transformOriginX) || castFloat(transformOriginX),
		transformOriginY: offsetKeyword(transformOriginY) || castFloat(transformOriginY)
	};
};
var processTransformOriginValue = (key, value, container) => {
	const v = transformUnit$1(container, value);
	return { [key]: offsetKeyword(v) || castFloat(v) };
};
var handlers$1 = {
	transform: processTransform,
	gradientTransform: processTransform,
	transformOrigin: processTransformOriginShorthand,
	transformOriginX: processTransformOriginValue,
	transformOriginY: processTransformOriginValue
};
var handlers = {
	fill: processColorValue,
	stroke: processColorValue,
	strokeDasharray: processNoopValue,
	strokeWidth: processUnitValue,
	fillOpacity: processNumberValue,
	strokeOpacity: processNumberValue,
	fillRule: processNoopValue,
	textAnchor: processNoopValue,
	strokeLinecap: processNoopValue,
	strokeLinejoin: processNoopValue,
	visibility: processNoopValue,
	clipPath: processNoopValue,
	dominantBaseline: processNoopValue
};
var shorthands = {
	...handlers$c,
	...handlers$b,
	...handlers$a,
	...handlers$9,
	...handlers$8,
	...handlers$7,
	...handlers$6,
	...handlers$5,
	...handlers$4,
	...handlers$3,
	...handlers$2,
	...handlers$1,
	...handlers
};
/**
* Expand shorthand properties and resolve units/values.
*
* @param container - Container dimensions for unit resolution
* @returns Function that resolves a style object
*/
var resolve$2 = (container) => (style) => {
	const propsArray = Object.keys(style);
	const resolvedStyle = {};
	for (let i = 0; i < propsArray.length; i += 1) {
		const key = propsArray[i];
		const value = style[key];
		if (!shorthands[key]) {
			resolvedStyle[key] = value;
			continue;
		}
		const resolved = shorthands[key](key, value, container, style);
		Object.assign(resolvedStyle, resolved);
	}
	return resolvedStyle;
};
/**
* Resolves styles
*
* @param container
* @param style - Style
* @returns Resolved style
*/
var resolveStyles$1 = (container, style) => {
	const computeMediaQueries = (value) => resolveMediaQueries(container, value);
	return compose(resolve$2(container), computeMediaQueries, flatten$1)(style);
};
//#endregion
//#region node_modules/bidi-js/dist/bidi.mjs
function bidiFactory() {
	return (function(exports) {
		var DATA = {
			"R": "13k,1a,2,3,3,2+1j,ch+16,a+1,5+2,2+n,5,a,4,6+16,4+3,h+1b,4mo,179q,2+9,2+11,2i9+7y,2+68,4,3+4,5+13,4+3,2+4k,3+29,8+cf,1t+7z,w+17,3+3m,1t+3z,16o1+5r,8+30,8+mc,29+1r,29+4v,75+73",
			"EN": "1c+9,3d+1,6,187+9,513,4+5,7+9,sf+j,175h+9,qw+q,161f+1d,4xt+a,25i+9",
			"ES": "17,2,6dp+1,f+1,av,16vr,mx+1,4o,2",
			"ET": "z+2,3h+3,b+1,ym,3e+1,2o,p4+1,8,6u,7c,g6,1wc,1n9+4,30+1b,2n,6d,qhx+1,h0m,a+1,49+2,63+1,4+1,6bb+3,12jj",
			"AN": "16o+5,2j+9,2+1,35,ed,1ff2+9,87+u",
			"CS": "18,2+1,b,2u,12k,55v,l,17v0,2,3,53,2+1,b",
			"B": "a,3,f+2,2v,690",
			"S": "9,2,k",
			"WS": "c,k,4f4,1vk+a,u,1j,335",
			"ON": "x+1,4+4,h+5,r+5,r+3,z,5+3,2+1,2+1,5,2+2,3+4,o,w,ci+1,8+d,3+d,6+8,2+g,39+1,9,6+1,2,33,b8,3+1,3c+1,7+1,5r,b,7h+3,sa+5,2,3i+6,jg+3,ur+9,2v,ij+1,9g+9,7+a,8m,4+1,49+x,14u,2+2,c+2,e+2,e+2,e+1,i+n,e+e,2+p,u+2,e+2,36+1,2+3,2+1,b,2+2,6+5,2,2,2,h+1,5+4,6+3,3+f,16+2,5+3l,3+81,1y+p,2+40,q+a,m+13,2r+ch,2+9e,75+hf,3+v,2+2w,6e+5,f+6,75+2a,1a+p,2+2g,d+5x,r+b,6+3,4+o,g,6+1,6+2,2k+1,4,2j,5h+z,1m+1,1e+f,t+2,1f+e,d+3,4o+3,2s+1,w,535+1r,h3l+1i,93+2,2s,b+1,3l+x,2v,4g+3,21+3,kz+1,g5v+1,5a,j+9,n+v,2,3,2+8,2+1,3+2,2,3,46+1,4+4,h+5,r+5,r+a,3h+2,4+6,b+4,78,1r+24,4+c,4,1hb,ey+6,103+j,16j+c,1ux+7,5+g,fsh,jdq+1t,4,57+2e,p1,1m,1m,1m,1m,4kt+1,7j+17,5+2r,d+e,3+e,2+e,2+10,m+4,w,1n+5,1q,4z+5,4b+rb,9+c,4+c,4+37,d+2g,8+b,l+b,5+1j,9+9,7+13,9+t,3+1,27+3c,2+29,2+3q,d+d,3+4,4+2,6+6,a+o,8+6,a+2,e+6,16+42,2+1i",
			"BN": "0+8,6+d,2s+5,2+p,e,4m9,1kt+2,2b+5,5+5,17q9+v,7k,6p+8,6+1,119d+3,440+7,96s+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+75,6p+2rz,1ben+1,1ekf+1,1ekf+1",
			"NSM": "lc+33,7o+6,7c+18,2,2+1,2+1,2,21+a,1d+k,h,2u+6,3+5,3+1,2+3,10,v+q,2k+a,1n+8,a,p+3,2+8,2+2,2+4,18+2,3c+e,2+v,1k,2,5+7,5,4+6,b+1,u,1n,5+3,9,l+1,r,3+1,1m,5+1,5+1,3+2,4,v+1,4,c+1,1m,5+4,2+1,5,l+1,n+5,2,1n,3,2+3,9,8+1,c+1,v,1q,d,1f,4,1m+2,6+2,2+3,8+1,c+1,u,1n,g+1,l+1,t+1,1m+1,5+3,9,l+1,u,21,8+2,2,2j,3+6,d+7,2r,3+8,c+5,23+1,s,2,2,1k+d,2+4,2+1,6+a,2+z,a,2v+3,2+5,2+1,3+1,q+1,5+2,h+3,e,3+1,7,g,jk+2,qb+2,u+2,u+1,v+1,1t+1,2+6,9,3+a,a,1a+2,3c+1,z,3b+2,5+1,a,7+2,64+1,3,1n,2+6,2,2,3+7,7+9,3,1d+g,1s+3,1d,2+4,2,6,15+8,d+1,x+3,3+1,2+2,1l,2+1,4,2+2,1n+7,3+1,49+2,2+c,2+6,5,7,4+1,5j+1l,2+4,k1+w,2db+2,3y,2p+v,ff+3,30+1,n9x+3,2+9,x+1,29+1,7l,4,5,q+1,6,48+1,r+h,e,13+7,q+a,1b+2,1d,3+3,3+1,14,1w+5,3+1,3+1,d,9,1c,1g,2+2,3+1,6+1,2,17+1,9,6n,3,5,fn5,ki+f,h+f,r2,6b,46+4,1af+2,2+1,6+3,15+2,5,4m+1,fy+3,as+1,4a+a,4x,1j+e,1l+2,1e+3,3+1,1y+2,11+4,2+7,1r,d+1,1h+8,b+3,3,2o+2,3,2+1,7,4h,4+7,m+1,1m+1,4,12+6,4+4,5g+7,3+2,2,o,2d+5,2,5+1,2+1,6n+3,7+1,2+1,s+1,2e+7,3,2+1,2z,2,3+5,2,2u+2,3+3,2+4,78+8,2+1,75+1,2,5,41+3,3+1,5,x+5,3+1,15+5,3+3,9,a+5,3+2,1b+c,2+1,bb+6,2+5,2d+l,3+6,2+1,2+1,3f+5,4,2+1,2+6,2,21+1,4,2,9o+1,f0c+4,1o+6,t5,1s+3,2a,f5l+1,43t+2,i+7,3+6,v+3,45+2,1j0+1i,5+1d,9,f,n+4,2+e,11t+6,2+g,3+6,2+1,2+4,7a+6,c6+3,15t+6,32+6,gzhy+6n",
			"AL": "16w,3,2,e+1b,z+2,2+2s,g+1,8+1,b+m,2+t,s+2i,c+e,4h+f,1d+1e,1bwe+dp,3+3z,x+c,2+1,35+3y,2rm+z,5+7,b+5,dt+l,c+u,17nl+27,1t+27,4x+6n,3+d",
			"LRO": "6ct",
			"RLO": "6cu",
			"LRE": "6cq",
			"RLE": "6cr",
			"PDF": "6cs",
			"LRI": "6ee",
			"RLI": "6ef",
			"FSI": "6eg",
			"PDI": "6eh"
		};
		var TYPES = {};
		var TYPES_TO_NAMES = {};
		TYPES.L = 1;
		TYPES_TO_NAMES[1] = "L";
		Object.keys(DATA).forEach(function(type, i) {
			TYPES[type] = 1 << i + 1;
			TYPES_TO_NAMES[TYPES[type]] = type;
		});
		Object.freeze(TYPES);
		var ISOLATE_INIT_TYPES = TYPES.LRI | TYPES.RLI | TYPES.FSI;
		var STRONG_TYPES = TYPES.L | TYPES.R | TYPES.AL;
		var NEUTRAL_ISOLATE_TYPES = TYPES.B | TYPES.S | TYPES.WS | TYPES.ON | TYPES.FSI | TYPES.LRI | TYPES.RLI | TYPES.PDI;
		var BN_LIKE_TYPES = TYPES.BN | TYPES.RLE | TYPES.LRE | TYPES.RLO | TYPES.LRO | TYPES.PDF;
		var TRAILING_TYPES = TYPES.S | TYPES.WS | TYPES.B | ISOLATE_INIT_TYPES | TYPES.PDI | BN_LIKE_TYPES;
		var map = null;
		function parseData() {
			if (!map) {
				map = /* @__PURE__ */ new Map();
				var start = 0;
				for (var type in DATA) if (DATA.hasOwnProperty(type)) {
					var segments = DATA[type];
					var temp = "";
					var end = void 0;
					var state = false;
					var lastCode = 0;
					for (var i = 0; i <= segments.length + 1; i += 1) {
						var char = segments[i];
						if (char !== "," && i !== segments.length) {
							if (char === "+") {
								state = true;
								lastCode = start = lastCode + parseInt(temp, 36);
								temp = "";
							} else temp += char;
						} else {
							if (!state) {
								lastCode = start = lastCode + parseInt(temp, 36);
								end = start;
							} else end = start + parseInt(temp, 36);
							state = false;
							temp = "";
							lastCode = end;
							for (var j = start; j < end + 1; j += 1) map.set(j, TYPES[type]);
						}
					}
				}
			}
		}
		/**
		* @param {string} char
		* @return {number}
		*/
		function getBidiCharType(char) {
			parseData();
			return map.get(char.codePointAt(0)) || TYPES.L;
		}
		/**
		* Get Bidi Character Type Name
		* @param {string} char
		* @returns { "L" | "R" | "EN" | "ES" | "ET" | "AN" | "CS" | "B" | "S" | "WS" | "ON" | "BN" | "NSM" | "AL" | "LRO" | "RLO" | "LRE" | "RLE" | "PDF" | "LRI" | "RLI" | "FSI" | "PDI" }
		*/
		function getBidiCharTypeName(char) {
			return TYPES_TO_NAMES[getBidiCharType(char)];
		}
		var data$1 = {
			"pairs": "14>1,1e>2,u>2,2wt>1,1>1,1ge>1,1wp>1,1j>1,f>1,hm>1,1>1,u>1,u6>1,1>1,+5,28>1,w>1,1>1,+3,b8>1,1>1,+3,1>3,-1>-1,3>1,1>1,+2,1s>1,1>1,x>1,th>1,1>1,+2,db>1,1>1,+3,3>1,1>1,+2,14qm>1,1>1,+1,4q>1,1e>2,u>2,2>1,+1",
			"canonical": "6f1>-6dx,6dy>-6dx,6ec>-6ed,6ee>-6ed,6ww>2jj,-2ji>2jj,14r4>-1e7l,1e7m>-1e7l,1e7m>-1e5c,1e5d>-1e5b,1e5c>-14qx,14qy>-14qx,14vn>-1ecg,1ech>-1ecg,1edu>-1ecg,1eci>-1ecg,1eda>-1ecg,1eci>-1ecg,1eci>-168q,168r>-168q,168s>-14ye,14yf>-14ye"
		};
		/**
		* Parses an string that holds encoded codepoint mappings, e.g. for bracket pairs or
		* mirroring characters, as encoded by scripts/generateBidiData.js. Returns an object
		* holding the `map`, and optionally a `reverseMap` if `includeReverse:true`.
		* @param {string} encodedString
		* @param {boolean} includeReverse - true if you want reverseMap in the output
		* @return {{map: Map<number, number>, reverseMap?: Map<number, number>}}
		*/
		function parseCharacterMap(encodedString, includeReverse) {
			var radix = 36;
			var lastCode = 0;
			var map = /* @__PURE__ */ new Map();
			var reverseMap = includeReverse && /* @__PURE__ */ new Map();
			var prevPair;
			encodedString.split(",").forEach(function visit(entry) {
				if (entry.indexOf("+") !== -1) for (var i = +entry; i--;) visit(prevPair);
				else {
					prevPair = entry;
					var ref = entry.split(">");
					var a = ref[0];
					var b = ref[1];
					a = String.fromCodePoint(lastCode += parseInt(a, radix));
					b = String.fromCodePoint(lastCode += parseInt(b, radix));
					map.set(a, b);
					includeReverse && reverseMap.set(b, a);
				}
			});
			return {
				map,
				reverseMap
			};
		}
		var openToClose, closeToOpen, canonical;
		function parse$1() {
			if (!openToClose) {
				var ref = parseCharacterMap(data$1.pairs, true);
				var map = ref.map;
				var reverseMap = ref.reverseMap;
				openToClose = map;
				closeToOpen = reverseMap;
				canonical = parseCharacterMap(data$1.canonical, false).map;
			}
		}
		/**
		* Get the opening bracket character corresponding to a given closing bracket character.
		* @param {string} char
		* @returns {string | null}
		*/
		function openingToClosingBracket(char) {
			parse$1();
			return openToClose.get(char) || null;
		}
		/**
		* Get the closing bracket character corresponding to a given opening bracket character.
		* @param {string} char
		* @returns {string | null}
		*/
		function closingToOpeningBracket(char) {
			parse$1();
			return closeToOpen.get(char) || null;
		}
		/**
		* Retrieves the canonical form of a bracket character.
		* @param {string} char
		* @returns {string | null}
		*/
		function getCanonicalBracket(char) {
			parse$1();
			return canonical.get(char) || null;
		}
		var TYPE_L = TYPES.L;
		var TYPE_R = TYPES.R;
		var TYPE_EN = TYPES.EN;
		var TYPE_ES = TYPES.ES;
		var TYPE_ET = TYPES.ET;
		var TYPE_AN = TYPES.AN;
		var TYPE_CS = TYPES.CS;
		var TYPE_B = TYPES.B;
		var TYPE_S = TYPES.S;
		var TYPE_ON = TYPES.ON;
		var TYPE_BN = TYPES.BN;
		var TYPE_NSM = TYPES.NSM;
		var TYPE_AL = TYPES.AL;
		var TYPE_LRO = TYPES.LRO;
		var TYPE_RLO = TYPES.RLO;
		var TYPE_LRE = TYPES.LRE;
		var TYPE_RLE = TYPES.RLE;
		var TYPE_PDF = TYPES.PDF;
		var TYPE_LRI = TYPES.LRI;
		var TYPE_RLI = TYPES.RLI;
		var TYPE_FSI = TYPES.FSI;
		var TYPE_PDI = TYPES.PDI;
		/**
		* @typedef {object} GetEmbeddingLevelsResult
		* @property {{start: number, end: number, level: number}[]} paragraphs
		* @property {Uint8Array} levels
		*/
		/**
		* This function applies the Bidirectional Algorithm to a string, returning the resolved embedding levels
		* in a single Uint8Array plus a list of objects holding each paragraph's start and end indices and resolved
		* base embedding level.
		*
		* @param {string} string - The input string
		* @param {"ltr"|"rtl"|"auto"} [baseDirection] - Use "ltr" or "rtl" to force a base paragraph direction,
		*        otherwise a direction will be chosen automatically from each paragraph's contents.
		* @return {GetEmbeddingLevelsResult}
		*/
		function getEmbeddingLevels(string, baseDirection) {
			var MAX_DEPTH = 125;
			var charTypes = new Uint32Array(string.length);
			for (var i = 0; i < string.length; i++) charTypes[i] = getBidiCharType(string[i]);
			var charTypeCounts = /* @__PURE__ */ new Map();
			function changeCharType(i, type) {
				var oldType = charTypes[i];
				charTypes[i] = type;
				charTypeCounts.set(oldType, charTypeCounts.get(oldType) - 1);
				if (oldType & NEUTRAL_ISOLATE_TYPES) charTypeCounts.set(NEUTRAL_ISOLATE_TYPES, charTypeCounts.get(NEUTRAL_ISOLATE_TYPES) - 1);
				charTypeCounts.set(type, (charTypeCounts.get(type) || 0) + 1);
				if (type & NEUTRAL_ISOLATE_TYPES) charTypeCounts.set(NEUTRAL_ISOLATE_TYPES, (charTypeCounts.get(NEUTRAL_ISOLATE_TYPES) || 0) + 1);
			}
			var embedLevels = new Uint8Array(string.length);
			var isolationPairs = /* @__PURE__ */ new Map();
			var paragraphs = [];
			var paragraph = null;
			for (var i$1 = 0; i$1 < string.length; i$1++) {
				if (!paragraph) paragraphs.push(paragraph = {
					start: i$1,
					end: string.length - 1,
					level: baseDirection === "rtl" ? 1 : baseDirection === "ltr" ? 0 : determineAutoEmbedLevel(i$1, false)
				});
				if (charTypes[i$1] & TYPE_B) {
					paragraph.end = i$1;
					paragraph = null;
				}
			}
			var FORMATTING_TYPES = TYPE_RLE | TYPE_LRE | TYPE_RLO | TYPE_LRO | ISOLATE_INIT_TYPES | TYPE_PDI | TYPE_PDF | TYPE_B;
			var nextEven = function(n) {
				return n + (n & 1 ? 1 : 2);
			};
			var nextOdd = function(n) {
				return n + (n & 1 ? 2 : 1);
			};
			for (var paraIdx = 0; paraIdx < paragraphs.length; paraIdx++) {
				paragraph = paragraphs[paraIdx];
				var statusStack = [{
					_level: paragraph.level,
					_override: 0,
					_isolate: 0
				}];
				var stackTop = void 0;
				var overflowIsolateCount = 0;
				var overflowEmbeddingCount = 0;
				var validIsolateCount = 0;
				charTypeCounts.clear();
				for (var i$2 = paragraph.start; i$2 <= paragraph.end; i$2++) {
					var charType = charTypes[i$2];
					stackTop = statusStack[statusStack.length - 1];
					charTypeCounts.set(charType, (charTypeCounts.get(charType) || 0) + 1);
					if (charType & NEUTRAL_ISOLATE_TYPES) charTypeCounts.set(NEUTRAL_ISOLATE_TYPES, (charTypeCounts.get(NEUTRAL_ISOLATE_TYPES) || 0) + 1);
					if (charType & FORMATTING_TYPES) {
						if (charType & (TYPE_RLE | TYPE_LRE)) {
							embedLevels[i$2] = stackTop._level;
							var level = (charType === TYPE_RLE ? nextOdd : nextEven)(stackTop._level);
							if (level <= MAX_DEPTH && !overflowIsolateCount && !overflowEmbeddingCount) statusStack.push({
								_level: level,
								_override: 0,
								_isolate: 0
							});
							else if (!overflowIsolateCount) overflowEmbeddingCount++;
						} else if (charType & (TYPE_RLO | TYPE_LRO)) {
							embedLevels[i$2] = stackTop._level;
							var level$1 = (charType === TYPE_RLO ? nextOdd : nextEven)(stackTop._level);
							if (level$1 <= MAX_DEPTH && !overflowIsolateCount && !overflowEmbeddingCount) statusStack.push({
								_level: level$1,
								_override: charType & TYPE_RLO ? TYPE_R : TYPE_L,
								_isolate: 0
							});
							else if (!overflowIsolateCount) overflowEmbeddingCount++;
						} else if (charType & ISOLATE_INIT_TYPES) {
							if (charType & TYPE_FSI) charType = determineAutoEmbedLevel(i$2 + 1, true) === 1 ? TYPE_RLI : TYPE_LRI;
							embedLevels[i$2] = stackTop._level;
							if (stackTop._override) changeCharType(i$2, stackTop._override);
							var level$2 = (charType === TYPE_RLI ? nextOdd : nextEven)(stackTop._level);
							if (level$2 <= MAX_DEPTH && overflowIsolateCount === 0 && overflowEmbeddingCount === 0) {
								validIsolateCount++;
								statusStack.push({
									_level: level$2,
									_override: 0,
									_isolate: 1,
									_isolInitIndex: i$2
								});
							} else overflowIsolateCount++;
						} else if (charType & TYPE_PDI) {
							if (overflowIsolateCount > 0) overflowIsolateCount--;
							else if (validIsolateCount > 0) {
								overflowEmbeddingCount = 0;
								while (!statusStack[statusStack.length - 1]._isolate) statusStack.pop();
								var isolInitIndex = statusStack[statusStack.length - 1]._isolInitIndex;
								if (isolInitIndex != null) {
									isolationPairs.set(isolInitIndex, i$2);
									isolationPairs.set(i$2, isolInitIndex);
								}
								statusStack.pop();
								validIsolateCount--;
							}
							stackTop = statusStack[statusStack.length - 1];
							embedLevels[i$2] = stackTop._level;
							if (stackTop._override) changeCharType(i$2, stackTop._override);
						} else if (charType & TYPE_PDF) {
							if (overflowIsolateCount === 0) {
								if (overflowEmbeddingCount > 0) overflowEmbeddingCount--;
								else if (!stackTop._isolate && statusStack.length > 1) {
									statusStack.pop();
									stackTop = statusStack[statusStack.length - 1];
								}
							}
							embedLevels[i$2] = stackTop._level;
						} else if (charType & TYPE_B) embedLevels[i$2] = paragraph.level;
					} else {
						embedLevels[i$2] = stackTop._level;
						if (stackTop._override && charType !== TYPE_BN) changeCharType(i$2, stackTop._override);
					}
				}
				var levelRuns = [];
				var currentRun = null;
				for (var i$3 = paragraph.start; i$3 <= paragraph.end; i$3++) {
					var charType$1 = charTypes[i$3];
					if (!(charType$1 & BN_LIKE_TYPES)) {
						var lvl = embedLevels[i$3];
						var isIsolInit = charType$1 & ISOLATE_INIT_TYPES;
						var isPDI = charType$1 === TYPE_PDI;
						if (currentRun && lvl === currentRun._level) {
							currentRun._end = i$3;
							currentRun._endsWithIsolInit = isIsolInit;
						} else levelRuns.push(currentRun = {
							_start: i$3,
							_end: i$3,
							_level: lvl,
							_startsWithPDI: isPDI,
							_endsWithIsolInit: isIsolInit
						});
					}
				}
				var isolatingRunSeqs = [];
				for (var runIdx = 0; runIdx < levelRuns.length; runIdx++) {
					var run = levelRuns[runIdx];
					if (!run._startsWithPDI || run._startsWithPDI && !isolationPairs.has(run._start)) {
						var seqRuns = [currentRun = run];
						for (var pdiIndex = void 0; currentRun && currentRun._endsWithIsolInit && (pdiIndex = isolationPairs.get(currentRun._end)) != null;) for (var i$4 = runIdx + 1; i$4 < levelRuns.length; i$4++) if (levelRuns[i$4]._start === pdiIndex) {
							seqRuns.push(currentRun = levelRuns[i$4]);
							break;
						}
						var seqIndices = [];
						for (var i$5 = 0; i$5 < seqRuns.length; i$5++) {
							var run$1 = seqRuns[i$5];
							for (var j = run$1._start; j <= run$1._end; j++) seqIndices.push(j);
						}
						var firstLevel = embedLevels[seqIndices[0]];
						var prevLevel = paragraph.level;
						for (var i$6 = seqIndices[0] - 1; i$6 >= 0; i$6--) if (!(charTypes[i$6] & BN_LIKE_TYPES)) {
							prevLevel = embedLevels[i$6];
							break;
						}
						var lastIndex = seqIndices[seqIndices.length - 1];
						var lastLevel = embedLevels[lastIndex];
						var nextLevel = paragraph.level;
						if (!(charTypes[lastIndex] & ISOLATE_INIT_TYPES)) {
							for (var i$7 = lastIndex + 1; i$7 <= paragraph.end; i$7++) if (!(charTypes[i$7] & BN_LIKE_TYPES)) {
								nextLevel = embedLevels[i$7];
								break;
							}
						}
						isolatingRunSeqs.push({
							_seqIndices: seqIndices,
							_sosType: Math.max(prevLevel, firstLevel) % 2 ? TYPE_R : TYPE_L,
							_eosType: Math.max(nextLevel, lastLevel) % 2 ? TYPE_R : TYPE_L
						});
					}
				}
				for (var seqIdx = 0; seqIdx < isolatingRunSeqs.length; seqIdx++) {
					var ref = isolatingRunSeqs[seqIdx];
					var seqIndices$1 = ref._seqIndices;
					var sosType = ref._sosType;
					var eosType = ref._eosType;
					/**
					* All the level runs in an isolating run sequence have the same embedding level.
					* 
					* DO NOT change any `embedLevels[i]` within the current scope.
					*/
					var embedDirection = embedLevels[seqIndices$1[0]] & 1 ? TYPE_R : TYPE_L;
					if (charTypeCounts.get(TYPE_NSM)) for (var si = 0; si < seqIndices$1.length; si++) {
						var i$8 = seqIndices$1[si];
						if (charTypes[i$8] & TYPE_NSM) {
							var prevType = sosType;
							for (var sj = si - 1; sj >= 0; sj--) if (!(charTypes[seqIndices$1[sj]] & BN_LIKE_TYPES)) {
								prevType = charTypes[seqIndices$1[sj]];
								break;
							}
							changeCharType(i$8, prevType & (ISOLATE_INIT_TYPES | TYPE_PDI) ? TYPE_ON : prevType);
						}
					}
					if (charTypeCounts.get(TYPE_EN)) for (var si$1 = 0; si$1 < seqIndices$1.length; si$1++) {
						var i$9 = seqIndices$1[si$1];
						if (charTypes[i$9] & TYPE_EN) for (var sj$1 = si$1 - 1; sj$1 >= -1; sj$1--) {
							var prevCharType = sj$1 === -1 ? sosType : charTypes[seqIndices$1[sj$1]];
							if (prevCharType & STRONG_TYPES) {
								if (prevCharType === TYPE_AL) changeCharType(i$9, TYPE_AN);
								break;
							}
						}
					}
					if (charTypeCounts.get(TYPE_AL)) for (var si$2 = 0; si$2 < seqIndices$1.length; si$2++) {
						var i$10 = seqIndices$1[si$2];
						if (charTypes[i$10] & TYPE_AL) changeCharType(i$10, TYPE_R);
					}
					if (charTypeCounts.get(TYPE_ES) || charTypeCounts.get(TYPE_CS)) for (var si$3 = 1; si$3 < seqIndices$1.length - 1; si$3++) {
						var i$11 = seqIndices$1[si$3];
						if (charTypes[i$11] & (TYPE_ES | TYPE_CS)) {
							var prevType$1 = 0, nextType = 0;
							for (var sj$2 = si$3 - 1; sj$2 >= 0; sj$2--) {
								prevType$1 = charTypes[seqIndices$1[sj$2]];
								if (!(prevType$1 & BN_LIKE_TYPES)) break;
							}
							for (var sj$3 = si$3 + 1; sj$3 < seqIndices$1.length; sj$3++) {
								nextType = charTypes[seqIndices$1[sj$3]];
								if (!(nextType & BN_LIKE_TYPES)) break;
							}
							if (prevType$1 === nextType && (charTypes[i$11] === TYPE_ES ? prevType$1 === TYPE_EN : prevType$1 & (TYPE_EN | TYPE_AN))) changeCharType(i$11, prevType$1);
						}
					}
					if (charTypeCounts.get(TYPE_EN)) {
						for (var si$4 = 0; si$4 < seqIndices$1.length; si$4++) if (charTypes[seqIndices$1[si$4]] & TYPE_EN) {
							for (var sj$4 = si$4 - 1; sj$4 >= 0 && charTypes[seqIndices$1[sj$4]] & (TYPE_ET | BN_LIKE_TYPES); sj$4--) changeCharType(seqIndices$1[sj$4], TYPE_EN);
							for (si$4++; si$4 < seqIndices$1.length && charTypes[seqIndices$1[si$4]] & (TYPE_ET | BN_LIKE_TYPES | TYPE_EN); si$4++) if (charTypes[seqIndices$1[si$4]] !== TYPE_EN) changeCharType(seqIndices$1[si$4], TYPE_EN);
						}
					}
					if (charTypeCounts.get(TYPE_ET) || charTypeCounts.get(TYPE_ES) || charTypeCounts.get(TYPE_CS)) for (var si$5 = 0; si$5 < seqIndices$1.length; si$5++) {
						var i$13 = seqIndices$1[si$5];
						if (charTypes[i$13] & (TYPE_ET | TYPE_ES | TYPE_CS)) {
							changeCharType(i$13, TYPE_ON);
							for (var sj$5 = si$5 - 1; sj$5 >= 0 && charTypes[seqIndices$1[sj$5]] & BN_LIKE_TYPES; sj$5--) changeCharType(seqIndices$1[sj$5], TYPE_ON);
							for (var sj$6 = si$5 + 1; sj$6 < seqIndices$1.length && charTypes[seqIndices$1[sj$6]] & BN_LIKE_TYPES; sj$6++) changeCharType(seqIndices$1[sj$6], TYPE_ON);
						}
					}
					if (charTypeCounts.get(TYPE_EN)) for (var si$6 = 0, prevStrongType = sosType; si$6 < seqIndices$1.length; si$6++) {
						var i$14 = seqIndices$1[si$6];
						var type = charTypes[i$14];
						if (type & TYPE_EN) {
							if (prevStrongType === TYPE_L) changeCharType(i$14, TYPE_L);
						} else if (type & STRONG_TYPES) prevStrongType = type;
					}
					if (charTypeCounts.get(NEUTRAL_ISOLATE_TYPES)) {
						var R_TYPES_FOR_N_STEPS = TYPE_R | TYPE_EN | TYPE_AN;
						var STRONG_TYPES_FOR_N_STEPS = R_TYPES_FOR_N_STEPS | TYPE_L;
						var bracketPairs = [];
						var openerStack = [];
						for (var si$7 = 0; si$7 < seqIndices$1.length; si$7++) if (charTypes[seqIndices$1[si$7]] & NEUTRAL_ISOLATE_TYPES) {
							var char = string[seqIndices$1[si$7]];
							var oppositeBracket = void 0;
							if (openingToClosingBracket(char) !== null) {
								if (openerStack.length < 63) openerStack.push({
									char,
									seqIndex: si$7
								});
								else break;
							} else if ((oppositeBracket = closingToOpeningBracket(char)) !== null) for (var stackIdx = openerStack.length - 1; stackIdx >= 0; stackIdx--) {
								var stackChar = openerStack[stackIdx].char;
								if (stackChar === oppositeBracket || stackChar === closingToOpeningBracket(getCanonicalBracket(char)) || openingToClosingBracket(getCanonicalBracket(stackChar)) === char) {
									bracketPairs.push([openerStack[stackIdx].seqIndex, si$7]);
									openerStack.length = stackIdx;
									break;
								}
							}
						}
						bracketPairs.sort(function(a, b) {
							return a[0] - b[0];
						});
						for (var pairIdx = 0; pairIdx < bracketPairs.length; pairIdx++) {
							var ref$1 = bracketPairs[pairIdx];
							var openSeqIdx = ref$1[0];
							var closeSeqIdx = ref$1[1];
							var foundStrongType = false;
							var useStrongType = 0;
							for (var si$8 = openSeqIdx + 1; si$8 < closeSeqIdx; si$8++) {
								var i$15 = seqIndices$1[si$8];
								if (charTypes[i$15] & STRONG_TYPES_FOR_N_STEPS) {
									foundStrongType = true;
									var lr = charTypes[i$15] & R_TYPES_FOR_N_STEPS ? TYPE_R : TYPE_L;
									if (lr === embedDirection) {
										useStrongType = lr;
										break;
									}
								}
							}
							if (foundStrongType && !useStrongType) {
								useStrongType = sosType;
								for (var si$9 = openSeqIdx - 1; si$9 >= 0; si$9--) {
									var i$16 = seqIndices$1[si$9];
									if (charTypes[i$16] & STRONG_TYPES_FOR_N_STEPS) {
										var lr$1 = charTypes[i$16] & R_TYPES_FOR_N_STEPS ? TYPE_R : TYPE_L;
										if (lr$1 !== embedDirection) useStrongType = lr$1;
										else useStrongType = embedDirection;
										break;
									}
								}
							}
							if (useStrongType) {
								charTypes[seqIndices$1[openSeqIdx]] = charTypes[seqIndices$1[closeSeqIdx]] = useStrongType;
								if (useStrongType !== embedDirection) {
									for (var si$10 = openSeqIdx + 1; si$10 < seqIndices$1.length; si$10++) if (!(charTypes[seqIndices$1[si$10]] & BN_LIKE_TYPES)) {
										if (getBidiCharType(string[seqIndices$1[si$10]]) & TYPE_NSM) charTypes[seqIndices$1[si$10]] = useStrongType;
										break;
									}
								}
								if (useStrongType !== embedDirection) {
									for (var si$11 = closeSeqIdx + 1; si$11 < seqIndices$1.length; si$11++) if (!(charTypes[seqIndices$1[si$11]] & BN_LIKE_TYPES)) {
										if (getBidiCharType(string[seqIndices$1[si$11]]) & TYPE_NSM) charTypes[seqIndices$1[si$11]] = useStrongType;
										break;
									}
								}
							}
						}
						for (var si$12 = 0; si$12 < seqIndices$1.length; si$12++) if (charTypes[seqIndices$1[si$12]] & NEUTRAL_ISOLATE_TYPES) {
							var niRunStart = si$12, niRunEnd = si$12;
							var prevType$2 = sosType;
							for (var si2 = si$12 - 1; si2 >= 0; si2--) if (charTypes[seqIndices$1[si2]] & BN_LIKE_TYPES) niRunStart = si2;
							else {
								prevType$2 = charTypes[seqIndices$1[si2]] & R_TYPES_FOR_N_STEPS ? TYPE_R : TYPE_L;
								break;
							}
							var nextType$1 = eosType;
							for (var si2$1 = si$12 + 1; si2$1 < seqIndices$1.length; si2$1++) if (charTypes[seqIndices$1[si2$1]] & (NEUTRAL_ISOLATE_TYPES | BN_LIKE_TYPES)) niRunEnd = si2$1;
							else {
								nextType$1 = charTypes[seqIndices$1[si2$1]] & R_TYPES_FOR_N_STEPS ? TYPE_R : TYPE_L;
								break;
							}
							for (var sj$7 = niRunStart; sj$7 <= niRunEnd; sj$7++) charTypes[seqIndices$1[sj$7]] = prevType$2 === nextType$1 ? prevType$2 : embedDirection;
							si$12 = niRunEnd;
						}
					}
				}
				for (var i$17 = paragraph.start; i$17 <= paragraph.end; i$17++) {
					var level$3 = embedLevels[i$17];
					var type$1 = charTypes[i$17];
					if (level$3 & 1) {
						if (type$1 & (TYPE_L | TYPE_EN | TYPE_AN)) embedLevels[i$17]++;
					} else if (type$1 & TYPE_R) embedLevels[i$17]++;
					else if (type$1 & (TYPE_AN | TYPE_EN)) embedLevels[i$17] += 2;
					if (type$1 & BN_LIKE_TYPES) embedLevels[i$17] = i$17 === 0 ? paragraph.level : embedLevels[i$17 - 1];
					if (i$17 === paragraph.end || getBidiCharType(string[i$17]) & (TYPE_S | TYPE_B)) for (var j$1 = i$17; j$1 >= 0 && getBidiCharType(string[j$1]) & TRAILING_TYPES; j$1--) embedLevels[j$1] = paragraph.level;
				}
			}
			return {
				levels: embedLevels,
				paragraphs
			};
			function determineAutoEmbedLevel(start, isFSI) {
				for (var i = start; i < string.length; i++) {
					var charType = charTypes[i];
					if (charType & (TYPE_R | TYPE_AL)) return 1;
					if (charType & (TYPE_B | TYPE_L) || isFSI && charType === TYPE_PDI) return 0;
					if (charType & ISOLATE_INIT_TYPES) {
						var pdi = indexOfMatchingPDI(i);
						i = pdi === -1 ? string.length : pdi;
					}
				}
				return 0;
			}
			function indexOfMatchingPDI(isolateStart) {
				var isolationLevel = 1;
				for (var i = isolateStart + 1; i < string.length; i++) {
					var charType = charTypes[i];
					if (charType & TYPE_B) break;
					if (charType & TYPE_PDI) {
						if (--isolationLevel === 0) return i;
					} else if (charType & ISOLATE_INIT_TYPES) isolationLevel++;
				}
				return -1;
			}
		}
		var data = "14>1,j>2,t>2,u>2,1a>g,2v3>1,1>1,1ge>1,1wd>1,b>1,1j>1,f>1,ai>3,-2>3,+1,8>1k0,-1jq>1y7,-1y6>1hf,-1he>1h6,-1h5>1ha,-1h8>1qi,-1pu>1,6>3u,-3s>7,6>1,1>1,f>1,1>1,+2,3>1,1>1,+13,4>1,1>1,6>1eo,-1ee>1,3>1mg,-1me>1mk,-1mj>1mi,-1mg>1mi,-1md>1,1>1,+2,1>10k,-103>1,1>1,4>1,5>1,1>1,+10,3>1,1>8,-7>8,+1,-6>7,+1,a>1,1>1,u>1,u6>1,1>1,+5,26>1,1>1,2>1,2>2,8>1,7>1,4>1,1>1,+5,b8>1,1>1,+3,1>3,-2>1,2>1,1>1,+2,c>1,3>1,1>1,+2,h>1,3>1,a>1,1>1,2>1,3>1,1>1,d>1,f>1,3>1,1a>1,1>1,6>1,7>1,13>1,k>1,1>1,+19,4>1,1>1,+2,2>1,1>1,+18,m>1,a>1,1>1,lk>1,1>1,4>1,2>1,f>1,3>1,1>1,+3,db>1,1>1,+3,3>1,1>1,+2,14qm>1,1>1,+1,6>1,4j>1,j>2,t>2,u>2,2>1,+1";
		var mirrorMap;
		function parse() {
			if (!mirrorMap) {
				var ref = parseCharacterMap(data, true);
				var map = ref.map;
				ref.reverseMap.forEach(function(value, key) {
					map.set(key, value);
				});
				mirrorMap = map;
			}
		}
		/**
		* Get the mirrored character for a given character, if one exists.
		* @param {string} char
		* @return {string|null}
		*/
		function getMirroredCharacter(char) {
			parse();
			return mirrorMap.get(char) || null;
		}
		/**
		* Given a string and its resolved embedding levels, build a map of indices to replacement chars
		* for any characters in right-to-left segments that have defined mirrored characters.
		* @param {string} string
		* @param {Uint8Array} embeddingLevels
		* @param {number?} [start]
		* @param {number?} [end]
		* @return {Map<number, string>}
		*/
		function getMirroredCharactersMap(string, embeddingLevels, start, end) {
			var strLen = string.length;
			start = Math.max(0, start == null ? 0 : +start);
			end = Math.min(strLen - 1, end == null ? strLen - 1 : +end);
			var map = /* @__PURE__ */ new Map();
			for (var i = start; i <= end; i++) if (embeddingLevels[i] & 1) {
				var mirror = getMirroredCharacter(string[i]);
				if (mirror !== null) map.set(i, mirror);
			}
			return map;
		}
		/**
		* Given a start and end denoting a single line within a string, and a set of precalculated
		* bidi embedding levels, produce a list of segments whose ordering should be flipped, in sequence.
		* @param {string} string - the full input string
		* @param {GetEmbeddingLevelsResult} embeddingLevelsResult - the result object from getEmbeddingLevels
		* @param {number} [start] - first character in a subset of the full string
		* @param {number} [end] - last character in a subset of the full string
		* @return {number[][]} - the list of start/end segments that should be flipped, in order.
		*/
		function getReorderSegments(string, embeddingLevelsResult, start, end) {
			var strLen = string.length;
			start = Math.max(0, start == null ? 0 : +start);
			end = Math.min(strLen - 1, end == null ? strLen - 1 : +end);
			var segments = [];
			embeddingLevelsResult.paragraphs.forEach(function(paragraph) {
				var lineStart = Math.max(start, paragraph.start);
				var lineEnd = Math.min(end, paragraph.end);
				if (lineStart < lineEnd) {
					var lineLevels = embeddingLevelsResult.levels.slice(lineStart, lineEnd + 1);
					for (var i = lineEnd; i >= lineStart && getBidiCharType(string[i]) & TRAILING_TYPES; i--) lineLevels[i] = paragraph.level;
					var maxLevel = paragraph.level;
					var minOddLevel = Infinity;
					for (var i$1 = 0; i$1 < lineLevels.length; i$1++) {
						var level = lineLevels[i$1];
						if (level > maxLevel) maxLevel = level;
						if (level < minOddLevel) minOddLevel = level | 1;
					}
					for (var lvl = maxLevel; lvl >= minOddLevel; lvl--) for (var i$2 = 0; i$2 < lineLevels.length; i$2++) if (lineLevels[i$2] >= lvl) {
						var segStart = i$2;
						while (i$2 + 1 < lineLevels.length && lineLevels[i$2 + 1] >= lvl) i$2++;
						if (i$2 > segStart) segments.push([segStart + lineStart, i$2 + lineStart]);
					}
				}
			});
			return segments;
		}
		/**
		* @param {string} string
		* @param {GetEmbeddingLevelsResult} embedLevelsResult
		* @param {number} [start]
		* @param {number} [end]
		* @return {string} the new string with bidi segments reordered
		*/
		function getReorderedString(string, embedLevelsResult, start, end) {
			var indices = getReorderedIndices(string, embedLevelsResult, start, end);
			var chars = [].concat(string);
			indices.forEach(function(charIndex, i) {
				chars[i] = (embedLevelsResult.levels[charIndex] & 1 ? getMirroredCharacter(string[charIndex]) : null) || string[charIndex];
			});
			return chars.join("");
		}
		/**
		* @param {string} string
		* @param {GetEmbeddingLevelsResult} embedLevelsResult
		* @param {number} [start]
		* @param {number} [end]
		* @return {number[]} an array with character indices in their new bidi order
		*/
		function getReorderedIndices(string, embedLevelsResult, start, end) {
			var segments = getReorderSegments(string, embedLevelsResult, start, end);
			var indices = [];
			for (var i = 0; i < string.length; i++) indices[i] = i;
			segments.forEach(function(ref) {
				var start = ref[0];
				var end = ref[1];
				var slice = indices.slice(start, end + 1);
				for (var i = slice.length; i--;) indices[end - i] = slice[i];
			});
			return indices;
		}
		exports.closingToOpeningBracket = closingToOpeningBracket;
		exports.getBidiCharType = getBidiCharType;
		exports.getBidiCharTypeName = getBidiCharTypeName;
		exports.getCanonicalBracket = getCanonicalBracket;
		exports.getEmbeddingLevels = getEmbeddingLevels;
		exports.getMirroredCharacter = getMirroredCharacter;
		exports.getMirroredCharactersMap = getMirroredCharactersMap;
		exports.getReorderSegments = getReorderSegments;
		exports.getReorderedIndices = getReorderedIndices;
		exports.getReorderedString = getReorderedString;
		exports.openingToClosingBracket = openingToClosingBracket;
		Object.defineProperty(exports, "__esModule", { value: true });
		return exports;
	})({});
}
//#endregion
//#region node_modules/@react-pdf/textkit/lib/textkit.js
var scriptPattern = [
	"Bengali",
	"Devanagari",
	"Gujarati",
	"Gurmukhi",
	"Kannada",
	"Khmer",
	"Malayalam",
	"Myanmar",
	"Oriya",
	"Sinhala",
	"Tamil",
	"Telugu",
	"Tibetan"
].map((s) => `\\p{Script=${s}}`).join("|");
var HAS_COMPLEX_SCRIPT = new RegExp(scriptPattern, "u");
var COMPLEX_SCRIPT_CHARS = new RegExp(`(?:${scriptPattern})+`, "gu");
/**
* Selectively applies NFD decomposition only to characters from complex
* scripts that need it for correct glyph mapping. Other scripts remain
* in their original (NFC) form since fontkit handles them correctly.
*/
var selectiveNFD = (str) => {
	if (!HAS_COMPLEX_SCRIPT.test(str)) return str;
	return str.replace(COMPLEX_SCRIPT_CHARS, (match) => match.normalize("NFD"));
};
var isCustomFont = (run) => {
	const font = run.attributes?.font?.[0];
	return !!font && font.type !== "STANDARD";
};
/**
* Selectively decomposes Unicode characters in an attributed string.
* Only characters from complex scripts (Indic, Southeast Asian) are
* NFD-decomposed for custom fonts. Latin and other simple scripts
* remain in NFC form.
*
* @returns Layout step that transforms an attributed string
*/
var decomposeUnicode = () => {
	return (attributedString) => {
		let string = "";
		let offset = 0;
		let changed = false;
		const runs = [];
		for (let i = 0; i < attributedString.runs.length; i += 1) {
			const run = attributedString.runs[i];
			const rawString = attributedString.string.slice(run.start, run.end);
			const runString = isCustomFont(run) ? selectiveNFD(rawString) : rawString;
			if (runString !== rawString || run.start !== offset) changed = true;
			const fragmentLength = runString.length;
			runs.push({
				...run,
				start: offset,
				end: offset + fragmentLength
			});
			offset += fragmentLength;
			string += runString;
		}
		if (!changed) return attributedString;
		return {
			...attributedString,
			string,
			runs
		};
	};
};
/**
* Create attributed string from text fragments
*
* @param fragments - Fragments
* @returns Attributed string
*/
var fromFragments = (fragments) => {
	let offset = 0;
	const strings = [];
	const runs = [];
	for (let i = 0; i < fragments.length; i += 1) {
		const fragment = fragments[i];
		const fragmentLength = fragment.string.length;
		strings.push(fragment.string);
		runs.push({
			...fragment,
			start: offset,
			end: offset + fragmentLength,
			attributes: fragment.attributes || {}
		});
		offset += fragmentLength;
	}
	return {
		string: strings.join(""),
		runs
	};
};
var SOFT_HYPHEN$1 = "­";
/**
* Default word hyphenation engine used when no one provided.
* Does not perform word hyphenation at all
*
* @param word
* @returns Same word
*/
var defaultHyphenate = (word) => [word];
/**
* Remove soft hyphens from word
*
* @param word
* @returns Word without soft hyphens
*/
var removeSoftHyphens = (word) => {
	return word.replaceAll(SOFT_HYPHEN$1, "");
};
/**
* Wrap words of attribute string
*
* @param engines layout engines
* @param options layout options
*/
var wrapWords = (engines = {}, options = {}) => {
	/**
	* @param attributedString - Attributed string
	* @returns Attributed string including syllables
	*/
	return (attributedString) => {
		const syllables = [];
		const fragments = [];
		const builtinHyphenate = engines.wordHyphenation?.() || defaultHyphenate;
		const hyphenate = options.hyphenationCallback || builtinHyphenate;
		let offset = 0;
		for (let i = 0; i < attributedString.runs.length; i += 1) {
			let string = "";
			const run = attributedString.runs[i];
			const words = attributedString.string.slice(run.start, run.end).split(/([ ]+)/g).filter(Boolean);
			for (let j = 0; j < words.length; j += 1) {
				const word = words[j];
				const parts = hyphenate(word, builtinHyphenate).map(removeSoftHyphens);
				syllables.push(...parts);
				string += parts.join("");
			}
			const runOffset = run.end - run.start - string.length;
			const start = run.start - offset;
			const end = run.end - offset - runOffset;
			fragments.push({
				...run,
				start,
				end,
				string
			});
			offset += runOffset;
		}
		return {
			...fromFragments(fragments),
			syllables
		};
	};
};
/**
* Clone rect
*
* @param rect - Rect
* @returns Cloned rect
*/
var copy = (rect) => {
	return Object.assign({}, rect);
};
/**
* Partition rect in two in the vertical direction
*
* @param rect - Rect
* @param height - Height
* @returns Partitioned rects
*/
var partition = (rect, height) => {
	return [Object.assign({}, rect, { height }), Object.assign({}, rect, {
		y: rect.y + height,
		height: rect.height - height
	})];
};
/**
* Crop upper section of rect
*
* @param height - Height
* @param rect - Rect
* @returns Cropped rect
*/
var crop = (height, rect) => {
	const [, result] = partition(rect, height);
	return result;
};
/**
* Get paragraph block height
*
* @param paragraph - Paragraph
* @returns Paragraph block height
*/
var height$2 = (paragraph) => {
	return paragraph.reduce((acc, block) => acc + block.box.height, 0);
};
/**
* Calculate run scale
*
* @param run - Run
* @returns Scale
*/
var calculateScale = (run) => {
	const attributes = run.attributes || {};
	const fontSize = attributes.fontSize || 12;
	const font = attributes.font;
	const unitsPerEm = typeof font === "string" ? null : font?.[0]?.unitsPerEm;
	return unitsPerEm ? fontSize / unitsPerEm : 0;
};
/**
* Get run scale
*
* @param  run
* @returns Scale
*/
var scale = (run) => {
	return run.attributes?.scale || calculateScale(run);
};
/**
* Get ligature offset by index
*
* Ex. ffi ligature
*
*   glyphs:         l  o  f  f  i  m
*   stringIndices:   0  1  2  2  2  3
*   offset:         0  0  0  1  2  0
*
* @param index
* @param run - Run
* @returns Ligature offset
*/
var offset = (index, run) => {
	if (!run) return 0;
	const stringIndices = run.stringIndices || [];
	const value = stringIndices[index];
	if (value === void 0) return 0;
	let result = 0;
	for (let i = index - 1; i >= 0 && stringIndices[i] === value; i -= 1) result += 1;
	return result;
};
/**
* Get run font
*
* @param run - Run
* @returns Font
*/
var getFont = (run) => {
	return run.attributes?.font?.[0] || null;
};
/**
* Slice glyph between codePoints range.
* Useful for breaking ligatures into individual glyphs.
*
* @param start - Start code point index
* @param end - End code point index
* @param font - Font to generate new glyphs from
* @param glyph - Glyph to be sliced
* @returns Array of sliced glyph parts
*/
var slice$2 = (start, end, font, glyph) => {
	if (!glyph) return [];
	if (start === end) return [];
	const { codePoints } = glyph;
	if (start === 0 && end === codePoints.length) return [glyph];
	if (!font) return [glyph];
	const slicedCodePoints = codePoints.slice(start, end);
	const string = String.fromCodePoint(...slicedCodePoints);
	return font.layout(string, void 0, void 0, void 0, "ltr").glyphs;
};
/**
* Return last glyph index that maps to the given string index.
* Falls back to the string index itself if glyphIndices is not present.
*
* When multiple consecutive glyphs point to the same string index
* (e.g. decomposed characters), returns the last glyph in that group.
*
* @param index - String index
* @param run - Run
* @returns Glyph index
*/
var glyphIndexAt = (index, run) => {
	const glyphIndices = run?.glyphIndices;
	if (!glyphIndices) return index;
	if (glyphIndices.length > 0 && index > glyphIndices[glyphIndices.length - 1]) return glyphIndices.length;
	let low = 0;
	let high = glyphIndices.length - 1;
	let result = index;
	while (low <= high) {
		const mid = low + high >> 1;
		if (glyphIndices[mid] <= index) {
			result = mid;
			low = mid + 1;
		} else high = mid - 1;
	}
	return result;
};
/**
* Returns new array starting with zero, keeping the same relation between consecutive values.
*
* @param array - List of numbers
* @returns Normalized array starting at zero
*/
var normalize = (array) => {
	if (array.length === 0) return [];
	const offset = array[0];
	return array.map((value) => value - offset);
};
/**
* Slice run between string indices range
*
* @param start - String index
* @param end - String index
* @param run - Run
* @returns Sliced run
*/
var slice$1 = (start, end, run) => {
	const runScale = scale(run);
	const font = getFont(run);
	const startIndex = glyphIndexAt(start, run);
	const endIndex = glyphIndexAt(end - 1, run);
	const startGlyph = run.glyphs?.[startIndex];
	const endGlyph = run.glyphs?.[endIndex];
	const startOffset = offset(start, run);
	const startGlyphs = startOffset > 0 ? slice$2(startOffset, Infinity, font, startGlyph) : [];
	const endOffset = offset(end, run);
	const endGlyphs = slice$2(0, endOffset, font, endGlyph);
	const startGlyphCovers = (run.glyphIndices?.[startIndex] ?? startIndex) >= start;
	const sliceStart = startIndex + (startOffset > 0 || !startGlyphCovers ? 1 : 0);
	const sliceEnd = endIndex + 1 - Math.min(1, endOffset);
	const glyphs = (run.glyphs || []).slice(sliceStart, sliceEnd);
	const glyphPosition = (g) => ({
		xAdvance: g.advanceWidth * runScale,
		yAdvance: 0,
		xOffset: 0,
		yOffset: 0
	});
	const startPositions = startGlyphs.map(glyphPosition);
	const positions = (run.positions || []).slice(sliceStart, sliceEnd);
	const endPositions = endGlyphs.map(glyphPosition);
	const stringIndices = normalize((run.stringIndices || []).slice(start, end));
	const glyphIndices = [
		startGlyphs.map((_, i) => (run.glyphIndices?.[startIndex] ?? 0) - start + startOffset + i),
		(run.glyphIndices || []).slice(sliceStart, sliceEnd).map((v) => v - start),
		endGlyphs.map((_, i) => (run.glyphIndices?.[endIndex] ?? 0) - start + i)
	].flat();
	return Object.assign({}, run, {
		start: Math.max(run.start + start, 0),
		end: Math.max(Math.min(run.end, run.start + end), 0),
		stringIndices,
		glyphIndices,
		glyphs: [
			startGlyphs,
			glyphs,
			endGlyphs
		].flat(),
		positions: [
			startPositions,
			positions,
			endPositions
		].flat()
	});
};
/**
* Get run index that contains passed index
*
* @param index - Index
* @param runs - Runs
* @returns Run index
*/
var runIndexAt$1 = (index, runs) => {
	if (!runs) return -1;
	return runs.findIndex((run) => run.start <= index && index < run.end);
};
/**
* Filter runs contained between start and end
*
* @param start
* @param end
* @param runs
* @returns Filtered runs
*/
var filter = (start, end, runs) => {
	const startIndex = runIndexAt$1(start, runs);
	const endIndex = Math.max(runIndexAt$1(end - 1, runs), startIndex);
	return runs.slice(startIndex, endIndex + 1);
};
/**
* Subtract scalar to run
*
* @param index - Scalar
* @param run - Run
* @returns Subtracted run
*/
var subtract = (index, run) => {
	const start = run.start - index;
	const end = run.end - index;
	return Object.assign({}, run, {
		start,
		end
	});
};
/**
* Slice array of runs
*
* @param start - Offset
* @param end - Offset
* @param runs
* @returns Sliced runs
*/
var sliceRuns = (start, end, runs) => {
	const sliceFirstRun = (a) => slice$1(start - a.start, end - a.start, a);
	const sliceLastRun = (a) => slice$1(0, end - a.start, a);
	return runs.map((run, i) => {
		let result = run;
		const isFirst = i === 0;
		const isLast = !isFirst && i === runs.length - 1;
		if (isFirst) result = sliceFirstRun(run);
		if (isLast) result = sliceLastRun(run);
		return subtract(start, result);
	});
};
/**
* Slice attributed string between two indices
*
* @param start - Offset
* @param end - Offset
* @param attributedString - Attributed string
* @returns Attributed string
*/
var slice = (start, end, attributedString) => {
	if (attributedString.string.length === 0) return attributedString;
	const string = attributedString.string.slice(start, end);
	const slicedRuns = sliceRuns(start, end, filter(start, end, attributedString.runs));
	return Object.assign({}, attributedString, {
		string,
		runs: slicedRuns
	});
};
var WHITESPACE_REGEX = /\S/;
/**
* Find index of first non-whitespace character
*
* @param string - String to search
* @returns Index of first non-whitespace character, or -1 if not found
*/
var findCharIndex = (string) => {
	return string.search(WHITESPACE_REGEX);
};
/**
* Find index of last non-whitespace character
*
* @param string - String to search
* @returns Index of last non-whitespace character, or -1 if not found
*/
var findLastCharIndex = (string) => {
	for (let i = string.length - 1; i >= 0; i -= 1) if (WHITESPACE_REGEX.test(string[i])) return i;
	return -1;
};
/**
* Removes (strips) whitespace from both ends of the attributted string.
*
* @param attributedString - Attributed string
* @returns Attributed string
*/
var trim = (attributedString) => {
	return slice(findCharIndex(attributedString.string), findLastCharIndex(attributedString.string) + 1, attributedString);
};
/**
* Returns empty run
*
* @returns Empty run
*/
var empty$1 = () => {
	return {
		start: 0,
		end: 0,
		stringIndices: [],
		glyphIndices: [],
		glyphs: [],
		positions: [],
		attributes: {}
	};
};
/**
* Check if value is a number
*
* @param value - Value to check
* @returns Whether value is a number
*/
var isNumber = (value) => {
	return typeof value === "number";
};
/**
* Append glyph indices with given length
*
* Ex. appendIndices(3, [0, 1, 2, 2]) => [0, 1, 2, 2, 3, 3, 3]
*
* @param length - Length to append
* @param indices - Glyph indices
* @returns Extended glyph indices
*/
var appendIndices$1 = (length, indices) => {
	const lastIndex = last(indices);
	const value = isNil(lastIndex) ? 0 : lastIndex + 1;
	const newIndices = Array(length).fill(value);
	return indices.concat(newIndices);
};
/**
* Append a new glyph index entry to the end of the indices array.
* The appended value represents the character position of the new glyph,
* which corresponds to the current string length.
*
* @param value - The current string length (character position of the new glyph)
* @param indices - The existing glyph indices array
* @returns New array with the appended index
*/
var appendIndices = (value, indices) => {
	return indices.concat([value]);
};
/**
* Get glyph for a given code point
*
* @param codePoint - Unicode code point (0 is treated as invalid)
* @param font - Font to get glyph from
* @returns Glyph or null if font/codePoint is invalid
*/
var fromCodePoint = (codePoint, font) => {
	if (typeof font === "string") return null;
	if (!font || !codePoint) return null;
	return font.glyphForCodePoint(codePoint);
};
/**
* Append glyph to run
*
* @param glyph - Glyph
* @param run - Run
* @returns Run with glyph
*/
var appendGlyph = (glyph, run) => {
	const glyphLength = glyph.codePoints?.length || 0;
	const stringLength = run.stringIndices?.length || 0;
	const glyphs = run.glyphs.concat(glyph);
	const stringIndices = appendIndices$1(glyphLength, run.stringIndices);
	const glyphIndices = appendIndices(stringLength, run.glyphIndices);
	const end = run.end + glyphLength;
	if (!run.positions) return Object.assign({}, run, {
		end,
		glyphs,
		stringIndices,
		glyphIndices
	});
	const positions = run.positions.concat({
		xAdvance: glyph.advanceWidth * scale(run),
		yAdvance: 0,
		xOffset: 0,
		yOffset: 0
	});
	return Object.assign({}, run, {
		end,
		glyphs,
		stringIndices,
		glyphIndices,
		positions
	});
};
/**
* Append glyph or code point to run
*
* @param value - Glyph or codePoint
* @param run - Run
* @returns Run with glyph
*/
var append$1 = (value, run) => {
	if (!value) return run;
	const font = getFont(run);
	return appendGlyph(isNumber(value) ? fromCodePoint(value, font) : value, run);
};
/**
* Get string from array of code points
*
* @param codePoints - Points
* @returns String
*/
var stringFromCodePoints = (codePoints) => {
	return String.fromCodePoint(...codePoints || []);
};
/**
* Append glyph into last run of attributed string
*
* @param glyph - Glyph or code point
* @param attributedString - Attributed string
* @returns Attributed string with new glyph
*/
var append = (glyph, attributedString) => {
	const codePointsString = stringFromCodePoints((typeof glyph === "number" ? [glyph] : glyph?.codePoints) || []);
	const string = attributedString.string + codePointsString;
	const firstRuns = attributedString.runs.slice(0, -1);
	const lastRun = last(attributedString.runs) || empty$1();
	const runs = firstRuns.concat(append$1(glyph, lastRun));
	return Object.assign({}, attributedString, {
		string,
		runs
	});
};
var ELLIPSIS_UNICODE = 8230;
var ELLIPSIS_STRING = String.fromCharCode(ELLIPSIS_UNICODE);
/**
* Get ellipsis codepoint. This may be different in standard and embedded fonts
*
* @param font
* @returns Ellipsis codepoint
*/
var getEllipsisCodePoint = (font) => {
	if (!font.encode) return ELLIPSIS_UNICODE;
	const [codePoints] = font.encode(ELLIPSIS_STRING);
	return parseInt(codePoints[0], 16);
};
/**
* Trucante block with ellipsis
*
* @param paragraph - Paragraph
* @returns Sliced paragraph
*/
var truncate = (paragraph) => {
	const runs = last(paragraph)?.runs || [];
	const font = last(runs)?.attributes?.font[0];
	if (font) {
		const index = paragraph.length - 1;
		const codePoint = getEllipsisCodePoint(font);
		const lastBlock = append(font.glyphForCodePoint(codePoint), trim(paragraph[index]));
		return Object.assign([], paragraph, { [index]: lastBlock });
	}
	return paragraph;
};
/**
* Omit attribute from run
*
* @param value - Attribute key
* @param run - Run
* @returns Run without ommited attribute
*/
var omit = (value, run) => {
	if (!run.attributes || !(value in run.attributes)) return run;
	const attributes = Object.assign({}, run.attributes);
	delete attributes[value];
	return Object.assign({}, run, { attributes });
};
/**
* Get run ascent
*
* @param run - Run
* @returns Ascent
*/
var ascent$1 = (run) => {
	const { font, attachment } = run.attributes;
	const attachmentHeight = attachment?.height || 0;
	const fontAscent = typeof font === "string" ? 0 : font?.[0]?.ascent || 0;
	return Math.max(attachmentHeight, fontAscent * scale(run));
};
/**
* Get run descent
*
* @param run - Run
* @returns Descent
*/
var descent = (run) => {
	const font = run.attributes?.font;
	const fontDescent = typeof font === "string" ? 0 : font?.[0]?.descent || 0;
	return scale(run) * fontDescent;
};
/**
* Get run lineGap
*
* @param run - Run
* @returns LineGap
*/
var lineGap = (run) => {
	const font = run.attributes?.font;
	return (typeof font === "string" ? 0 : font?.[0]?.lineGap || 0) * scale(run);
};
/**
* Get run height
*
* @param run - Run
* @returns Height
*/
var height$1 = (run) => {
	return run.attributes?.lineHeight || lineGap(run) + ascent$1(run) - descent(run);
};
/**
* Returns attributed string height
*
* @param attributedString - Attributed string
* @returns Height
*/
var height$3 = (attributedString) => {
	const reducer = (acc, run) => Math.max(acc, height$1(run));
	return attributedString.runs.reduce(reducer, 0);
};
var ellipseInterval = (cx, cy, rx, ry, y0, y1) => {
	if (y1 <= cy - ry || y0 >= cy + ry) return null;
	const t = ry === 0 ? 0 : (Math.min(Math.max(cy, y0), y1) - cy) / ry;
	const halfWidth = rx * Math.sqrt(1 - t * t);
	return {
		x0: cx - halfWidth,
		x1: cx + halfWidth
	};
};
var polygonInterval = (points, y0, y1) => {
	const xs = [];
	for (let i = 0; i < points.length; i += 1) {
		const a = points[i];
		const b = points[(i + 1) % points.length];
		if (a.y >= y0 && a.y <= y1) xs.push(a.x);
		const crossings = [y0, y1];
		for (let j = 0; j < crossings.length; j += 1) {
			const y = crossings[j];
			if (a.y < y && b.y > y || a.y > y && b.y < y) xs.push(a.x + (y - a.y) / (b.y - a.y) * (b.x - a.x));
		}
	}
	if (xs.length === 0) return null;
	return {
		x0: Math.min(...xs),
		x1: Math.max(...xs)
	};
};
/**
* Horizontal extent a shape occupies within the y band [y0, y1].
* Conservative for polygons: concavities inside a band are filled,
* matching line-granularity flow in browsers.
*
* @param shape - Exclusion shape
* @param y0 - Band top
* @param y1 - Band bottom
* @returns Occupied x interval, or null if the shape misses the band
*/
var bandInterval = (shape, y0, y1) => {
	let interval;
	if (shape.type === "ellipse") interval = ellipseInterval(shape.cx, shape.cy, shape.rx, shape.ry, y0, y1);
	else if (shape.type === "polygon") interval = polygonInterval(shape.points, y0, y1);
	else interval = y1 <= shape.y || y0 >= shape.y + shape.height ? null : {
		x0: shape.x,
		x1: shape.x + shape.width
	};
	if (!interval || interval.x1 - interval.x0 <= 0) return null;
	return interval;
};
/**
* Returns max shape Y coordinate
*
* @param shape - Exclusion shape
* @returns Y coordinate
*/
var maxY = (shape) => {
	if (shape.type === "ellipse") return shape.cy + shape.ry;
	if (shape.type === "polygon") {
		let max = -Infinity;
		for (let i = 0; i < shape.points.length; i += 1) max = Math.max(max, shape.points[i].y);
		return max;
	}
	return shape.y + shape.height;
};
var getLineFragments = (rect, shapes) => {
	let fragments = [rect];
	for (let i = 0; i < shapes.length; i += 1) {
		const shape = shapes[i];
		const interval = bandInterval(shape, rect.y, rect.y + rect.height);
		if (!interval) continue;
		const x0 = shape.extend === "left" ? -Infinity : interval.x0;
		const x1 = shape.extend === "right" ? Infinity : interval.x1;
		fragments = fragments.reduce((acc, fragment) => {
			const fStart = fragment.x;
			const fEnd = fragment.x + fragment.width;
			if (x1 <= fStart || x0 >= fEnd) return acc.concat(fragment);
			const a = Object.assign({}, fragment, { width: x0 - fStart });
			const b = Object.assign({}, fragment, {
				x: x1,
				width: fEnd - x1
			});
			return acc.concat([a, b].filter((r) => r.width > 0));
		}, []);
	}
	return fragments;
};
var generateLineRects = (container, height) => {
	const { exclusions, ...rect } = container;
	if (!exclusions || exclusions.length === 0) return [rect];
	const lineRects = [];
	const maxY$1 = Math.max(...exclusions.map(maxY));
	let currentRect = rect;
	while (currentRect.y < maxY$1) {
		const [lineRect, rest] = partition(currentRect, height);
		const lineRectFragments = getLineFragments(lineRect, exclusions);
		currentRect = rest;
		lineRects.push(...lineRectFragments);
	}
	return [...lineRects, currentRect];
};
var ATTACHMENT_CODE$1 = "￼";
/**
* Remove attachment attribute if no char present
*
* @param line - Line
* @returns Line
*/
var purgeAttachments = (line) => {
	if (!!line.string.includes(ATTACHMENT_CODE$1)) return line;
	const runs = line.runs.map((run) => run.attributes?.attachment ? omit("attachment", run) : run);
	return Object.assign({}, line, { runs });
};
/**
* Layout paragraphs inside rectangle
*
* @param rects - Rects
* @param lines - Attributed strings
* @param indent
* @returns layout blocks
*/
var layoutLines = (rects, lines, indent) => {
	let rect = rects.shift();
	let currentY = rect.y;
	return lines.map((line, i) => {
		const lineIndent = i === 0 ? indent : 0;
		const style = line.runs?.[0]?.attributes || {};
		const height$1 = Math.max(height$3(line), style.lineHeight);
		if (currentY + height$1 > rect.y + rect.height && rects.length > 0) {
			rect = rects.shift();
			currentY = rect.y;
		}
		const newLine = {
			string: line.string,
			runs: line.runs,
			box: {
				x: rect.x + lineIndent,
				y: currentY,
				width: rect.width - lineIndent,
				height: height$1
			}
		};
		currentY += height$1;
		return purgeAttachments(newLine);
	});
};
/**
* Performs line breaking and layout
*
* @param engines - Engines
* @param options - Layout options
*/
var layoutParagraph = (engines, options = {}) => {
	/**
	* @param container - Container
	* @param paragraph - Attributed string
	* @returns Layout block
	*/
	return (container, paragraph) => {
		const height$1 = height$3(paragraph);
		const indent = paragraph.runs?.[0]?.attributes?.indent || 0;
		const rects = generateLineRects(container, height$1);
		const availableWidths = rects.map((r) => r.width);
		if (rects.length === 1) availableWidths.unshift(availableWidths[0] - indent);
		else availableWidths[0] -= indent;
		return layoutLines(rects, engines.linebreaker(options)(paragraph, availableWidths), indent);
	};
};
/**
* Slice block at given height
*
* @param height - Height
* @param paragraph - Paragraph
* @returns Sliced paragraph
*/
var sliceAtHeight = (height, paragraph) => {
	const newBlock = [];
	let counter = 0;
	for (let i = 0; i < paragraph.length; i += 1) {
		const line = paragraph[i];
		counter += line.box.height;
		if (counter < height) newBlock.push(line);
		else break;
	}
	return newBlock;
};
/**
* Layout paragraphs inside container until it does not
* fit anymore, performing line wrapping in the process.
*
* @param  engines - Engines
* @param  options - Layout options
* @param container - Container
*/
var typesetter = (engines, options, container) => {
	/**
	* @param attributedStrings - Attributed strings (paragraphs)
	* @returns Paragraph blocks
	*/
	return (attributedStrings) => {
		const result = [];
		const paragraphs = [...attributedStrings];
		const layout = layoutParagraph(engines, options);
		const maxLines = isNil(container.maxLines) ? Infinity : container.maxLines;
		const truncateEllipsis = container.truncateMode === "ellipsis";
		let linesCount = maxLines;
		let paragraphRect = copy(container);
		let nextParagraph = paragraphs.shift();
		while (linesCount > 0 && nextParagraph) {
			const paragraph = layout(paragraphRect, nextParagraph);
			const slicedBlock = paragraph.slice(0, linesCount);
			const linesHeight = height$2(slicedBlock);
			const shouldTruncate = truncateEllipsis && paragraph.length !== slicedBlock.length;
			linesCount -= slicedBlock.length;
			if (paragraphRect.height >= linesHeight) {
				result.push(shouldTruncate ? truncate(slicedBlock) : slicedBlock);
				paragraphRect = crop(linesHeight, paragraphRect);
				nextParagraph = paragraphs.shift();
			} else {
				result.push(truncate(sliceAtHeight(paragraphRect.height, slicedBlock)));
				break;
			}
		}
		return result;
	};
};
/**
* Resolve string indices based on glyphs code points.
* Maps each glyph to its corresponding string index, handling ligatures
* by assigning the same index to all code points within a ligature.
*
* @param glyphs - Array of glyphs (may contain undefined for missing glyphs)
* @returns Glyph indices array
*/
var resolve$1 = (glyphs = []) => {
	const result = [];
	let currentIndex = 0;
	for (let i = 0; i < glyphs.length; i += 1) {
		const codePointCount = glyphs[i]?.codePoints?.length || 0;
		for (let j = 0; j < codePointCount; j += 1) result.push(currentIndex);
		currentIndex += 1;
	}
	return result;
};
/**
* Resolve glyph indices based on glyphs code points.
* Maps each glyph to its starting character index in the original string,
* accounting for ligatures where a single glyph represents multiple code points.
*
* @param glyphs - Array of glyphs (may contain undefined for missing glyphs)
* @returns Array of character indices, one per glyph
*/
var resolve = (glyphs = []) => {
	const result = [];
	let currentIndex = 0;
	for (let i = 0; i < glyphs.length; i += 1) {
		const length = glyphs[i]?.codePoints?.length || 0;
		const value = length === 0 ? result[i - 1] : currentIndex;
		result.push(value);
		currentIndex += length;
	}
	return result;
};
/**
* Order runs for visual display, applying UAX #9 rule L2: from the highest
* bidi level down to level 1, reverse every contiguous sequence of runs at
* that level or above.
*
* @param runs - Runs
* @returns Run indices in visual order
*/
var reorderRuns = (runs) => {
	const levels = runs.map((run) => run.attributes.bidiLevel || 0);
	const order = runs.map((_, index) => index);
	const maxLevel = Math.max(...levels);
	for (let level = maxLevel; level >= 1; level -= 1) {
		let start = 0;
		while (start < order.length) {
			if (levels[order[start]] < level) {
				start += 1;
				continue;
			}
			let end = start + 1;
			while (end < order.length && levels[order[end]] >= level) end += 1;
			order.splice(start, end - start, ...order.slice(start, end).reverse());
			start = end;
		}
	}
	return order;
};
/**
* Reverse the glyphs and characters of a right to left run. Glyphs stay inside
* their own run, so run attributes are never mixed between runs.
*
* @param run - Run
* @param string - Run substring
* @returns Reversed run and string
*/
var reverseRun = (run, string) => {
	const glyphs = [...run.glyphs || []].reverse();
	const positions = [...run.positions || []].reverse();
	return {
		run: {
			...run,
			glyphs,
			positions,
			stringIndices: resolve$1(glyphs),
			glyphIndices: resolve(glyphs)
		},
		string: Array.from(string).reverse().join("")
	};
};
var reorderLine = (line) => {
	if (line.runs.length === 0) return line;
	const levels = line.runs.map((run) => run.attributes.bidiLevel || 0);
	if (Math.max(...levels) === 0) return line;
	let offset = 0;
	let string = "";
	const runs = reorderRuns(line.runs).map((index) => {
		const run = line.runs[index];
		const runString = line.string.slice(run.start, run.end);
		const reversed = levels[index] % 2 === 1 && reverseRun(run, runString);
		const start = offset;
		offset += run.end - run.start;
		string += reversed ? reversed.string : runString;
		return {
			...reversed ? reversed.run : run,
			start,
			end: offset
		};
	});
	return {
		...line,
		runs,
		string
	};
};
var reorderParagraph = (paragraph) => paragraph.map(reorderLine);
/**
* Perform bidi reordering
*
* @returns Reordered paragraphs
*/
var bidiReordering = () => {
	/**
	* @param paragraphs - Paragraphs
	* @returns Reordered paragraphs
	*/
	return (paragraphs) => paragraphs.map(reorderParagraph);
};
var getCharacterSpacing = (run) => {
	return run.attributes?.characterSpacing || 0;
};
/**
* Scale run positions
*
* @param  run
* @param  positions
* @returns Scaled positions
*/
var scalePositions = (run, positions) => {
	const runScale = scale(run);
	const characterSpacing = getCharacterSpacing(run);
	return positions.map((position, i) => {
		const xSpacing = i === positions.length ? 0 : characterSpacing;
		return {
			xAdvance: position.xAdvance * runScale + xSpacing,
			yAdvance: position.yAdvance * runScale,
			xOffset: position.xOffset * runScale,
			yOffset: position.yOffset * runScale,
			advanceWidth: position.advanceWidth
		};
	});
};
/**
* Create glyph run
*
* @param string string
*/
var layoutRun = (string) => {
	/**
	* @param run - Run
	* @returns Glyph run
	*/
	return (run) => {
		const { start, end, attributes = {} } = run;
		const { font, features } = attributes;
		if (!font) return {
			...run,
			glyphs: [],
			stringIndices: [],
			glyphIndices: [],
			positions: []
		};
		const runString = string.slice(start, end);
		if (typeof font === "string") throw new Error("Invalid font");
		const glyphRun = font[0].layout(runString, features, void 0, void 0, "ltr");
		const positions = scalePositions(run, glyphRun.positions);
		const stringIndices = resolve$1(glyphRun.glyphs);
		const glyphIndices = resolve(glyphRun.glyphs);
		return {
			...run,
			positions,
			stringIndices,
			glyphIndices,
			glyphs: glyphRun.glyphs
		};
	};
};
/**
* Generate glyphs for single attributed string
*/
var generateGlyphs = () => {
	/**
	* @param attributedString - Attributed string
	* @returns Attributed string with glyphs
	*/
	return (attributedString) => {
		const runs = attributedString.runs.map(layoutRun(attributedString.string));
		return Object.assign({}, attributedString, { runs });
	};
};
/**
* Resolves yOffset for run
*
* @param run - Run
* @returns Run
*/
var resolveRunYOffset = (run) => {
	if (!run.positions) return run;
	const unitsPerEm = run.attributes?.font?.[0]?.unitsPerEm || 0;
	const yOffset = (run.attributes?.yOffset || 0) * unitsPerEm;
	for (let i = 0; i < run.positions.length; i += 1) run.positions[i].yOffset = yOffset;
	return run;
};
/**
* Resolves yOffset for multiple paragraphs
*/
var resolveYOffset = () => {
	/**
	* @param attributedString - Attributed string
	* @returns Attributed string
	*/
	return (attributedString) => {
		const runs = attributedString.runs.map(resolveRunYOffset);
		return Object.assign({}, attributedString, { runs });
	};
};
/**
* Sort runs in ascending order
*
* @param runs
* @returns Sorted runs
*/
var sort = (runs) => {
	return runs.sort((a, b) => a.start - b.start || a.end - b.end);
};
/**
* Is run empty (start === end)
*
* @param run - Run
* @returns Is run empty
*/
var isEmpty = (run) => {
	return run.start === run.end;
};
/**
* Sort points in ascending order
* @param a - First point
* @param b - Second point
* @returns Sort order
*/
var sortPoints = (a, b) => {
	return a[1] - b[1] || a[3] - b[3];
};
/**
* @param runs
* @returns Points
*/
var generatePoints = (runs) => {
	const result = [];
	for (let i = 0; i < runs.length; i += 1) {
		const run = runs[i];
		result.push([
			"start",
			run.start,
			run.attributes,
			i
		], [
			"end",
			run.end,
			run.attributes,
			i
		]);
	}
	return result.sort(sortPoints);
};
/**
* @param runs
* @returns Merged runs
*/
var mergeRuns = (runs) => {
	return runs.reduce((acc, run) => {
		const attributes = Object.assign({}, acc.attributes, run.attributes);
		return Object.assign({}, run, { attributes });
	}, {});
};
/**
* @param runs
* @returns Grouped runs
*/
var groupEmptyRuns = (runs) => {
	const groups = runs.reduce((acc, run) => {
		if (!acc[run.start]) acc[run.start] = [];
		acc[run.start].push(run);
		return acc;
	}, []);
	return Object.values(groups);
};
/**
* @param runs
* @returns Flattened runs
*/
var flattenEmptyRuns = (runs) => {
	return groupEmptyRuns(runs).map(mergeRuns);
};
/**
* @param runs
* @returns Flattened runs
*/
var flattenRegularRuns = (runs) => {
	const res = [];
	const points = generatePoints(runs);
	let start = -1;
	const stack = [];
	for (let i = 0; i < points.length; i += 1) {
		const [type, offset, attributes] = points[i];
		if (start !== -1 && start < offset) res.push({
			start,
			end: offset,
			attributes: Object.assign({}, ...stack),
			stringIndices: [],
			glyphIndices: [],
			glyphs: [],
			positions: []
		});
		if (type === "start") stack.push(attributes);
		else for (let j = 0; j < stack.length; j += 1) if (stack[j] === attributes) stack.splice(j--, 1);
		start = offset;
	}
	return res;
};
/**
* Flatten many runs
*
* @param runs
* @returns Flattened runs
*/
var flatten = (runs = []) => {
	const emptyRuns = flattenEmptyRuns(runs.filter((run) => isEmpty(run)));
	const regularRuns = flattenRegularRuns(runs.filter((run) => !isEmpty(run)));
	return sort(emptyRuns.concat(regularRuns));
};
/**
* Returns empty attributed string
*
* @returns Empty attributed string
*/
var empty = () => ({
	string: "",
	runs: []
});
/**
* Performs font substitution and script itemization on attributed string
*
* @param engines - engines
*/
var preprocessRuns = (engines) => {
	/**
	* @param attributedString - Attributed string
	* @returns Processed attributed string
	*/
	return (attributedString) => {
		if (isNil(attributedString)) return empty();
		const { string } = attributedString;
		const { fontSubstitution, scriptItemizer, bidi } = engines;
		const { runs: itemizationRuns } = scriptItemizer()(attributedString);
		const { runs: substitutedRuns } = fontSubstitution()(attributedString);
		const { runs: bidiRuns } = bidi()(attributedString);
		return {
			string,
			runs: flatten(attributedString.runs.concat(bidiRuns).concat(itemizationRuns).concat(substitutedRuns))
		};
	};
};
/**
* Get attributed string start value
*
* @param attributedString - Attributed string
* @returns Start
*/
var start = (attributedString) => {
	const { runs } = attributedString;
	return runs.length === 0 ? 0 : runs[0].start;
};
/**
* Get attributed string end value
*
* @param attributedString - Attributed string
* @returns End
*/
var end = (attributedString) => {
	const { runs } = attributedString;
	return runs.length === 0 ? 0 : last(runs).end;
};
/**
* Get attributed string length
*
* @param attributedString - Attributed string
* @returns End
*/
var length$1 = (attributedString) => {
	return end(attributedString) - start(attributedString);
};
/**
* Breaks attributed string into paragraphs
*/
var splitParagraphs = () => {
	/**
	* @param attributedString - Attributed string
	* @returns Paragraphs attributed strings
	*/
	return (attributedString) => {
		const paragraphs = [];
		let start = 0;
		let breakPoint = attributedString.string.indexOf("\n") + 1;
		while (breakPoint > 0) {
			paragraphs.push(slice(start, breakPoint, attributedString));
			start = breakPoint;
			breakPoint = attributedString.string.indexOf("\n", breakPoint) + 1;
		}
		if (start === 0) paragraphs.push(attributedString);
		else if (start < attributedString.string.length) paragraphs.push(slice(start, length$1(attributedString), attributedString));
		return paragraphs;
	};
};
/**
* Return positions advance width
*
* @param positions - Positions
* @returns {number} advance width
*/
var advanceWidth$2 = (positions) => {
	return positions.reduce((acc, pos) => acc + (pos.xAdvance || 0), 0);
};
/**
* Return run advance width
*
* @param run - Run
* @returns Advance width
*/
var advanceWidth$1 = (run) => {
	return advanceWidth$2(run.positions || []);
};
/**
* Returns attributed string advancewidth
*
* @param attributedString - Attributed string
* @returns Advance width
*/
var advanceWidth = (attributedString) => {
	const reducer = (acc, run) => acc + advanceWidth$1(run);
	return attributedString.runs.reduce(reducer, 0);
};
/**
* ASCII code for space character.
* Note: Only space (32) is considered whitespace for typographic layout purposes,
* not tabs, newlines, or other control characters.
*/
var SPACE_CODE = 32;
/**
* Check if glyph contains a space character
*
* @param glyph - Glyph
* @returns Whether glyph contains a space
*/
var isWhiteSpace$1 = (glyph) => {
	return (glyph?.codePoints || []).includes(SPACE_CODE);
};
/**
* Check if run is entirely whitespace
*
* @param run - Run
* @returns Whether run is entirely whitespace
*/
var isWhiteSpace = (run) => {
	const glyphs = run?.glyphs || [];
	return glyphs.length > 0 && glyphs.every(isWhiteSpace$1);
};
/**
* Get white space leading positions
*
* @param run - Run
* @returns White space leading positions
*/
var leadingPositions = (run) => {
	const glyphs = run.glyphs || [];
	const positions = run.positions || [];
	const leadingWhitespaces = glyphs.findIndex((g) => !isWhiteSpace$1(g));
	return leadingWhitespaces === -1 ? positions : positions.slice(0, leadingWhitespaces);
};
/**
* Get run leading white space offset
*
* @param run - Run
* @returns Leading white space offset
*/
var leadingOffset$1 = (run) => {
	if (!run) return 0;
	return leadingPositions(run).reduce((acc, pos) => acc + (pos.xAdvance || 0), 0);
};
/**
* Get attributed string leading white space offset
*
* @param attributedString - Attributed string
* @returns Leading white space offset
*/
var leadingOffset = (attributedString) => {
	const runs = attributedString.runs || [];
	let offset = 0;
	for (const run of runs) {
		offset += leadingOffset$1(run);
		if (!isWhiteSpace(run)) break;
	}
	return offset;
};
/**
* Get white space trailing positions
*
* @param run run
* @returns White space trailing positions
*/
var trailingPositions = (run) => {
	const glyphs = reverse(run.glyphs || []);
	const positions = reverse(run.positions || []);
	const leadingWhitespaces = glyphs.findIndex((g) => !isWhiteSpace$1(g));
	return leadingWhitespaces === -1 ? positions : positions.slice(0, leadingWhitespaces);
};
/**
* Get run trailing white space offset
*
* @param run - Run
* @returns Trailing white space offset
*/
var trailingOffset$1 = (run) => {
	if (!run) return 0;
	return trailingPositions(run).reduce((acc, pos) => acc + (pos.xAdvance || 0), 0);
};
/**
* Get attributed string trailing white space offset
*
* @param attributedString - Attributed string
* @returns Trailing white space offset
*/
var trailingOffset = (attributedString) => {
	const runs = attributedString.runs || [];
	let offset = 0;
	for (let i = runs.length - 1; i >= 0; i -= 1) {
		const run = runs[i];
		offset += trailingOffset$1(run);
		if (!isWhiteSpace(run)) break;
	}
	return offset;
};
/**
* Drop last char of run
*
* @param run - Run
* @returns Run without last char
*/
var dropLast$1 = (run) => {
	return slice$1(0, run.end - run.start - 1, run);
};
/**
* Drop last glyph
*
* @param attributedString - Attributed string
* @returns Attributed string with new glyph
*/
var dropLast = (attributedString) => {
	const string = dropLast$2(attributedString.string);
	const runs = adjust(-1, dropLast$1, attributedString.runs);
	return Object.assign({}, attributedString, {
		string,
		runs
	});
};
var ALIGNMENT_FACTORS$1 = {
	center: .5,
	right: 1
};
/**
* Remove new line char at the end of line if present
*
* @param line
* @returns Line
*/
var removeNewLine = (line) => {
	return last(line.string) === "\n" ? dropLast(line) : line;
};
var getOverflowLeft = (line) => {
	return leadingOffset(line) + (line.overflowLeft || 0);
};
var getOverflowRight = (line) => {
	return trailingOffset(line) + (line.overflowRight || 0);
};
/**
* Ignore whitespace at the start and end of a line for alignment
*
* @param line
* @returns Line
*/
var adjustOverflow = (line) => {
	const overflowLeft = getOverflowLeft(line);
	const overflowRight = getOverflowRight(line);
	const x = line.box.x - overflowLeft;
	const width = line.box.width + overflowLeft + overflowRight;
	const box = Object.assign({}, line.box, {
		x,
		width
	});
	return Object.assign({}, line, {
		box,
		overflowLeft,
		overflowRight
	});
};
/**
* Performs line justification by calling appropiate engine
*
* @param engines - Engines
* @param options - Layout options
* @param align - Text align
*/
var justifyLine$1 = (engines, options, align) => {
	/**
	* @param line - Line
	* @returns Line
	*/
	return (line) => {
		const lineWidth = advanceWidth(line);
		const alignFactor = ALIGNMENT_FACTORS$1[align] || 0;
		const remainingWidth = Math.max(0, line.box.width - lineWidth);
		const shouldJustify = align === "justify" || lineWidth > line.box.width;
		const x = line.box.x + remainingWidth * alignFactor;
		const box = Object.assign({}, line.box, { x });
		const newLine = Object.assign({}, line, { box });
		return shouldJustify ? engines.justification(options)(newLine) : newLine;
	};
};
var finalizeLine = (line) => {
	let lineAscent = 0;
	let lineDescent = 0;
	let lineHeight = 0;
	let lineXAdvance = 0;
	const runs = line.runs.map((run) => {
		const height = height$1(run);
		const ascent = ascent$1(run);
		const descent$1 = descent(run);
		const xAdvance = advanceWidth$1(run);
		lineHeight = Math.max(lineHeight, height);
		lineAscent = Math.max(lineAscent, ascent);
		lineDescent = Math.max(lineDescent, descent$1);
		lineXAdvance += xAdvance;
		return Object.assign({}, run, {
			height,
			ascent,
			descent: descent$1,
			xAdvance
		});
	});
	return Object.assign({}, line, {
		runs,
		height: lineHeight,
		ascent: lineAscent,
		descent: lineDescent,
		xAdvance: lineXAdvance
	});
};
/**
* Finalize line by performing line justification
* and text decoration (using appropiate engines)
*
* @param engines - Engines
* @param options - Layout options
*/
var finalizeBlock = (engines, options) => {
	/**
	* @param line - Line
	* @param i - Line index
	* @param lines - Total lines
	* @returns Line
	*/
	return (line, index, lines) => {
		const isLastFragment = index === lines.length - 1;
		const style = line.runs?.[0]?.attributes || {};
		const align = isLastFragment ? style.alignLastLine : style.align;
		return compose(finalizeLine, engines.textDecoration(), justifyLine$1(engines, options, align), adjustOverflow, removeNewLine)(line);
	};
};
/**
* Finalize line block by performing line justification
* and text decoration (using appropiate engines)
*
* @param engines - Engines
* @param options - Layout options
*/
var finalizeFragments = (engines, options) => {
	/**
	* @param paragraphs - Paragraphs
	* @returns Paragraphs
	*/
	return (paragraphs) => {
		const blockFinalizer = finalizeBlock(engines, options);
		return paragraphs.map((paragraph) => paragraph.map(blockFinalizer));
	};
};
var ATTACHMENT_CODE = 65532;
var isReplaceGlyph = (glyph) => glyph.codePoints.includes(ATTACHMENT_CODE);
/**
* Resolve attachments of run
*
* @param run
* @returns Run
*/
var resolveRunAttachments = (run) => {
	if (!run.positions) return run;
	const glyphs = run.glyphs || [];
	const attachment = run.attributes?.attachment;
	if (!attachment) return run;
	const positions = run.positions.map((position, i) => {
		const glyph = glyphs[i];
		if (attachment.width && isReplaceGlyph(glyph)) return Object.assign({}, position, { xAdvance: attachment.width });
		return Object.assign({}, position);
	});
	return Object.assign({}, run, { positions });
};
/**
* Resolve attachments for multiple paragraphs
*/
var resolveAttachments = () => {
	/**
	* @param attributedString - Attributed string
	* @returns Attributed string
	*/
	return (attributedString) => {
		const runs = attributedString.runs.map(resolveRunAttachments);
		return Object.assign({}, attributedString, { runs });
	};
};
/**
* @param attributes - Attributes
* @returns Attributes with defaults
*/
var applyAttributes = (a) => {
	return {
		align: a.align || (a.direction === "rtl" ? "right" : "left"),
		alignLastLine: a.alignLastLine || (a.align === "justify" ? "left" : a.align || "left"),
		attachment: a.attachment || null,
		backgroundColor: a.backgroundColor || null,
		bullet: a.bullet || null,
		characterSpacing: a.characterSpacing || 0,
		color: a.color || "black",
		direction: a.direction || "ltr",
		features: a.features || [],
		fill: a.fill !== false,
		font: a.font || [],
		fontSize: a.fontSize || 12,
		hangingPunctuation: a.hangingPunctuation || false,
		hyphenationFactor: a.hyphenationFactor || 0,
		indent: a.indent || 0,
		justificationFactor: a.justificationFactor || 1,
		lineHeight: a.lineHeight || null,
		lineSpacing: a.lineSpacing || 0,
		link: a.link || null,
		marginLeft: a.marginLeft || a.margin || 0,
		marginRight: a.marginRight || a.margin || 0,
		opacity: a.opacity,
		paddingTop: a.paddingTop || a.padding || 0,
		paragraphSpacing: a.paragraphSpacing || 0,
		script: a.script || null,
		shrinkFactor: a.shrinkFactor || 0,
		strike: a.strike || false,
		strikeColor: a.strikeColor || a.color || "black",
		strikeStyle: a.strikeStyle || "solid",
		stroke: a.stroke || false,
		underline: a.underline || false,
		underlineColor: a.underlineColor || a.color || "black",
		underlineStyle: a.underlineStyle || "solid",
		verticalAlign: a.verticalAlign || null,
		wordSpacing: a.wordSpacing || 0,
		yOffset: a.yOffset || 0
	};
};
/**
* Apply default style to run
*
* @param run - Run
* @returns Run with default styles
*/
var applyRunStyles = (run) => {
	const attributes = applyAttributes(run.attributes);
	return Object.assign({}, run, { attributes });
};
/**
* Apply default attributes for an attributed string
*/
var applyDefaultStyles = () => {
	return (attributedString) => {
		return {
			string: attributedString.string || "",
			runs: (attributedString.runs || []).map(applyRunStyles)
		};
	};
};
/**
* Apply scaling and yOffset for verticalAlign 'sub' and 'super'.
*/
var verticalAlignment = () => {
	/**
	* @param attributedString - Attributed string
	* @returns Attributed string
	*/
	return (attributedString) => {
		attributedString.runs.forEach((run) => {
			const { attributes } = run;
			const { verticalAlign } = attributes;
			if (verticalAlign === "sub") attributes.yOffset = -.2;
			else if (verticalAlign === "super") attributes.yOffset = .4;
		});
		return attributedString;
	};
};
var bidi$1 = bidiFactory();
/**
* @param runs
* @returns Bidi levels
*/
var getBidiLevels = (runs) => {
	return runs.reduce((acc, run) => {
		const length = run.end - run.start;
		const levels = repeat(run.attributes.bidiLevel, length);
		return acc.concat(levels);
	}, []);
};
/**
* Perform bidi mirroring
*/
var mirrorString = () => {
	/**
	* @param attributedString - Attributed string
	* @returns Attributed string
	*/
	return (attributedString) => {
		const levels = getBidiLevels(attributedString.runs);
		let updatedString = "";
		attributedString.string.split("").forEach((char, index) => {
			const mirroredChar = levels[index] % 2 === 1 ? bidi$1.getMirroredCharacter(attributedString.string.charAt(index)) : null;
			updatedString += mirroredChar || char;
		});
		return {
			...attributedString,
			string: updatedString
		};
	};
};
/**
* A LayoutEngine is the main object that performs text layout.
* It accepts an AttributedString and a Container object
* to layout text into, and uses several helper objects to perform
* various layout tasks. These objects can be overridden to customize
* layout behavior.
*/
var layoutEngine = (engines) => {
	return (attributedString, container, options = {}) => {
		const processParagraph = compose(resolveYOffset(), resolveAttachments(), verticalAlignment(), generateGlyphs(), wrapWords(engines, options), mirrorString(), preprocessRuns(engines));
		const processParagraphs = (paragraphs) => paragraphs.map(processParagraph);
		return compose(finalizeFragments(engines, options), bidiReordering(), typesetter(engines, options, container), processParagraphs, splitParagraphs(), applyDefaultStyles(), decomposeUnicode())(attributedString);
	};
};
var bidi = bidiFactory();
var bidiEngine = () => {
	/**
	* @param attributedString - Attributed string
	* @returns Attributed string
	*/
	return (attributedString) => {
		const { string } = attributedString;
		const direction = attributedString.runs[0]?.attributes.direction;
		const { levels } = bidi.getEmbeddingLevels(string, direction);
		let lastLevel = null;
		let lastIndex = 0;
		let index = 0;
		const runs = [];
		for (let i = 0; i < levels.length; i += 1) {
			const level = levels[i];
			if (level !== lastLevel) {
				if (lastLevel !== null) runs.push({
					start: lastIndex,
					end: index,
					attributes: { bidiLevel: lastLevel }
				});
				lastIndex = index;
				lastLevel = level;
			}
			index += 1;
		}
		if (lastIndex < string.length) runs.push({
			start: lastIndex,
			end: string.length,
			attributes: { bidiLevel: lastLevel }
		});
		return {
			string,
			runs
		};
	};
};
var INFINITY = 1e4;
var skipPastGlueAndPenalty = (nodes, start) => {
	let j = start + 1;
	for (; j < nodes.length; j++) if (nodes[j].type !== "glue" && nodes[j].type !== "penalty") break;
	return nodes[j - 1];
};
var getNextBreakpoint = (subnodes, widths, lineNumber) => {
	let position = null;
	let minimumBadness = Infinity;
	const sum = {
		width: 0,
		stretch: 0,
		shrink: 0
	};
	const lineLength = widths[Math.min(lineNumber, widths.length - 1)];
	const calculateRatio = (node) => {
		const stretch = "stretch" in node ? node.stretch : null;
		if (sum.width < lineLength) {
			if (!stretch) return INFINITY;
			return sum.stretch - stretch > 0 ? (lineLength - sum.width) / sum.stretch : INFINITY;
		}
		const shrink = "shrink" in node ? node.shrink : null;
		if (sum.width > lineLength) {
			if (!shrink) return INFINITY;
			return sum.shrink - shrink > 0 ? (lineLength - sum.width) / sum.shrink : INFINITY;
		}
		return 0;
	};
	let hyphenWidth = 0;
	for (let i = 0; i < subnodes.length; i += 1) {
		const node = subnodes[i];
		if (node.type === "box") sum.width += node.width;
		if (node.type === "glue") {
			sum.width += node.width;
			sum.stretch += node.stretch;
			sum.shrink += node.shrink;
		}
		const potentialEndOfLine = skipPastGlueAndPenalty(subnodes, i);
		hyphenWidth = potentialEndOfLine.type === "penalty" ? potentialEndOfLine.width : 0;
		if (sum.width - sum.shrink + hyphenWidth > lineLength) {
			if (position === null) {
				let j = i === 0 ? i + 1 : i;
				while (j < subnodes.length && (subnodes[j].type === "glue" || subnodes[j].type === "penalty")) j++;
				position = j - 1;
			}
			break;
		}
		if (node.type === "penalty" || node.type === "glue") {
			const ratio = calculateRatio(node);
			const penalty = node.type === "penalty" ? node.penalty : 0;
			const badness = 100 * Math.abs(ratio) ** 3 + penalty;
			if (minimumBadness >= badness) {
				position = i;
				minimumBadness = badness;
			}
		}
	}
	return sum.width - sum.shrink + hyphenWidth > lineLength ? position : null;
};
var applyBestFit = (nodes, widths) => {
	let count = 0;
	let lineNumber = 0;
	let subnodes = nodes;
	const breakpoints = [0];
	while (subnodes.length > 0) {
		const breakpoint = getNextBreakpoint(subnodes, widths, lineNumber);
		if (breakpoint !== null) {
			count += breakpoint;
			breakpoints.push(count);
			subnodes = subnodes.slice(breakpoint + 1, subnodes.length);
			count++;
			lineNumber++;
		} else subnodes = [];
	}
	return breakpoints;
};
var LinkedListNode = class {
	data;
	prev;
	next;
	constructor(data) {
		this.data = data;
		this.prev = null;
		this.next = null;
	}
};
var LinkedList = class {
	static Node = LinkedListNode;
	head;
	tail;
	listSize;
	listLength;
	constructor() {
		this.head = null;
		this.tail = null;
		this.listSize = 0;
		this.listLength = 0;
	}
	isLinked(node) {
		return !(node && node.prev === null && node.next === null && this.tail !== node && this.head !== node || this.isEmpty());
	}
	size() {
		return this.listSize;
	}
	isEmpty() {
		return this.listSize === 0;
	}
	first() {
		return this.head;
	}
	last() {
		return this.last;
	}
	forEach(callback) {
		let node = this.head;
		while (node !== null) {
			callback(node);
			node = node.next;
		}
	}
	at(i) {
		let node = this.head;
		let index = 0;
		if (i >= this.listLength || i < 0) return null;
		while (node !== null) {
			if (i === index) return node;
			node = node.next;
			index += 1;
		}
		return null;
	}
	insertAfter(node, newNode) {
		if (!this.isLinked(node)) return this;
		newNode.prev = node;
		newNode.next = node.next;
		if (node.next === null) this.tail = newNode;
		else node.next.prev = newNode;
		node.next = newNode;
		this.listSize += 1;
		return this;
	}
	insertBefore(node, newNode) {
		if (!this.isLinked(node)) return this;
		newNode.prev = node.prev;
		newNode.next = node;
		if (node.prev === null) this.head = newNode;
		else node.prev.next = newNode;
		node.prev = newNode;
		this.listSize += 1;
		return this;
	}
	push(node) {
		if (this.head === null) this.unshift(node);
		else this.insertAfter(this.tail, node);
		return this;
	}
	unshift(node) {
		if (this.head === null) {
			this.head = node;
			this.tail = node;
			node.prev = null;
			node.next = null;
			this.listSize += 1;
		} else this.insertBefore(this.head, node);
		return this;
	}
	remove(node) {
		if (!this.isLinked(node)) return this;
		if (node.prev === null) this.head = node.next;
		else node.prev.next = node.next;
		if (node.next === null) this.tail = node.prev;
		else node.next.prev = node.prev;
		this.listSize -= 1;
		return this;
	}
};
/**
* Licensed under the new BSD License.
* Copyright 2009-2010, Bram Stein
* All rights reserved.
*/
function breakpoint(position, demerits, line, fitnessClass, totals, previous) {
	return {
		position,
		demerits,
		line,
		fitnessClass,
		totals: totals || {
			width: 0,
			stretch: 0,
			shrink: 0
		},
		previous
	};
}
function computeCost(nodes, lineLengths, sum, end, active, currentLine) {
	let width = sum.width - active.totals.width;
	let stretch = 0;
	let shrink = 0;
	const lineLength = currentLine < lineLengths.length ? lineLengths[currentLine - 1] : lineLengths[lineLengths.length - 1];
	if (nodes[end].type === "penalty") width += nodes[end].width;
	if (width < lineLength) {
		stretch = sum.stretch - active.totals.stretch;
		if (stretch > 0) return (lineLength - width) / stretch;
		return linebreak.infinity;
	}
	if (width > lineLength) {
		shrink = sum.shrink - active.totals.shrink;
		if (shrink > 0) return (lineLength - width) / shrink;
		return linebreak.infinity;
	}
	return 0;
}
function computeSum(nodes, sum, breakPointIndex) {
	const result = {
		width: sum.width,
		stretch: sum.stretch,
		shrink: sum.shrink
	};
	for (let i = breakPointIndex; i < nodes.length; i += 1) {
		const node = nodes[i];
		if (node.type === "glue") {
			result.width += node.width;
			result.stretch += node.stretch;
			result.shrink += node.shrink;
		} else if (node.type === "box" || node.type === "penalty" && node.penalty === -linebreak.infinity && i > breakPointIndex) break;
	}
	return result;
}
function findBestBreakpoints(activeNodes) {
	const breakpoints = [];
	if (activeNodes.size() === 0) return [];
	let tmp = { data: { demerits: Infinity } };
	activeNodes.forEach((node) => {
		if (node.data.demerits < tmp.data.demerits) tmp = node;
	});
	while (tmp !== null) {
		breakpoints.push(tmp.data.position);
		tmp = tmp.data.previous;
	}
	return breakpoints.reverse();
}
/**
* @param nodes
* @param availableWidths
* @param tolerance
* @preserve Knuth and Plass line breaking algorithm in JavaScript
*/
var linebreak = (nodes, availableWidths, tolerance) => {
	const options = {
		demerits: {
			line: 10,
			flagged: 100,
			fitness: 3e3
		},
		tolerance: tolerance || 3
	};
	const activeNodes = new LinkedList();
	const sum = {
		width: 0,
		stretch: 0,
		shrink: 0
	};
	const lineLengths = availableWidths;
	activeNodes.push(new LinkedList.Node(breakpoint(0, 0, 0, 0, void 0, null)));
	const candidates = [
		{
			active: void 0,
			demerits: Infinity
		},
		{
			active: void 0,
			demerits: Infinity
		},
		{
			active: void 0,
			demerits: Infinity
		},
		{
			active: void 0,
			demerits: Infinity
		}
	];
	function mainLoop(node, index, nodes) {
		let active = activeNodes.first();
		while (active !== null) {
			let currentLine = 0;
			for (let i = 0; i < candidates.length; i += 1) {
				candidates[i].active = void 0;
				candidates[i].demerits = Infinity;
			}
			while (active !== null) {
				currentLine = active.data.line + 1;
				const ratio = computeCost(nodes, lineLengths, sum, index, active.data, currentLine);
				if (ratio < -1 || node.type === "penalty" && node.penalty === -linebreak.infinity) activeNodes.remove(active);
				if (ratio >= -1 && ratio <= options.tolerance) {
					const absRatio = Math.abs(ratio);
					const badness = 100 * absRatio * absRatio * absRatio;
					const lineDemerits = options.demerits.line + badness;
					let demerits = lineDemerits * lineDemerits;
					if (node.type === "penalty" && node.penalty >= 0) demerits += node.penalty * node.penalty;
					else if (node.type === "penalty" && node.penalty !== -linebreak.infinity) demerits -= node.penalty * node.penalty;
					if (node.type === "penalty" && nodes[active.data.position].type === "penalty") demerits += options.demerits.flagged * node.flagged * nodes[active.data.position].flagged;
					let currentClass;
					if (ratio < -.5) currentClass = 0;
					else if (ratio <= .5) currentClass = 1;
					else if (ratio <= 1) currentClass = 2;
					else currentClass = 3;
					if (Math.abs(currentClass - active.data.fitnessClass) > 1) demerits += options.demerits.fitness;
					demerits += active.data.demerits;
					if (demerits < candidates[currentClass].demerits) {
						candidates[currentClass].active = active;
						candidates[currentClass].demerits = demerits;
					}
				}
				active = active.next;
				if (active !== null && active.data.line >= currentLine && currentLine < lineLengths.length) break;
			}
			const tmpSum = computeSum(nodes, sum, index);
			for (let fitnessClass = 0; fitnessClass < candidates.length; fitnessClass += 1) {
				const candidate = candidates[fitnessClass];
				if (candidate.demerits === Infinity) continue;
				const newNode = new LinkedList.Node(breakpoint(index, candidate.demerits, candidate.active.data.line + 1, fitnessClass, tmpSum, candidate.active));
				if (active !== null) activeNodes.insertBefore(active, newNode);
				else activeNodes.push(newNode);
			}
		}
	}
	for (let index = 0; index < nodes.length; index += 1) {
		const node = nodes[index];
		if (node.type === "box") sum.width += node.width;
		else if (node.type === "glue") {
			if (index > 0 && nodes[index - 1].type === "box") mainLoop(node, index, nodes);
			sum.width += node.width;
			sum.stretch += node.stretch;
			sum.shrink += node.shrink;
		} else if (node.type === "penalty" && node.penalty !== linebreak.infinity) mainLoop(node, index, nodes);
	}
	return findBestBreakpoints(activeNodes);
};
linebreak.infinity = 1e4;
linebreak.glue = (width, start, end, stretch, shrink) => ({
	type: "glue",
	start,
	end,
	width,
	stretch,
	shrink
});
linebreak.box = (width, start, end, hyphenated = false) => ({
	type: "box",
	width,
	start,
	end,
	hyphenated
});
linebreak.penalty = (width, penalty, flagged) => ({
	type: "penalty",
	width,
	penalty,
	flagged
});
/**
* Add scalar to run
*
* @param index - Scalar
* @param run - Run
* @returns Added run
*/
var add = (index, run) => {
	const start = run.start + index;
	const end = run.end + index;
	return Object.assign({}, run, {
		start,
		end
	});
};
/**
* Get run length
*
* @param run - Run
* @returns Length
*/
var length = (run) => {
	return run.end - run.start;
};
var concatStringIndices = (runA, runB) => {
	const runAIndices = runA.stringIndices || [];
	const runALastIndex = last(runAIndices) || 0;
	const runBIndices = (runB.stringIndices || []).map((i) => i + runALastIndex + 1);
	return normalize(runAIndices.concat(runBIndices));
};
var concatGlyphIndices = (runA, runB) => {
	const runAIndices = runA.glyphIndices || [];
	const runALength = runA.stringIndices?.length || 0;
	const runBIndices = (runB.glyphIndices || []).map((i) => i + runALength);
	return normalize(runAIndices.concat(runBIndices));
};
/**
* Concats two runs into one
*
* @param runA - First run
* @param runB - Second run
* @returns Concatenated run
*/
var concat = (runA, runB) => {
	const end = runA.end + length(runB);
	const glyphs = (runA.glyphs || []).concat(runB.glyphs || []);
	const positions = (runA.positions || []).concat(runB.positions || []);
	const attributes = Object.assign({}, runA.attributes, runB.attributes);
	const stringIndices = concatStringIndices(runA, runB);
	const glyphIndices = concatGlyphIndices(runA, runB);
	return Object.assign({}, runA, {
		end,
		glyphs,
		positions,
		attributes,
		stringIndices,
		glyphIndices
	});
};
/**
* Insert glyph to run in the given index
*
* @param index - Index
* @param glyph - Glyph
* @param run - Run
* @returns Run with glyph
*/
var insertGlyph$1 = (index, glyph, run) => {
	if (!glyph) return run;
	const leadingRun = slice$1(0, index, run);
	const trailingRun = slice$1(index, Infinity, run);
	return concat(append$1(glyph, leadingRun), trailingRun);
};
/**
* Insert either glyph or code point to run in the given index
*
* @param index - Index
* @param value - Glyph or codePoint
* @param run - Run
* @returns Run with glyph
*/
var insert = (index, value, run) => {
	const font = getFont(run);
	return insertGlyph$1(index, isNumber(value) ? fromCodePoint(value, font) : value, run);
};
/**
* Get run index at char index
*
* @param index - Char index
* @param attributedString - Attributed string
* @returns Run index
*/
var runIndexAt = (index, attributedString) => {
	return runIndexAt$1(index, attributedString.runs);
};
/**
* Insert glyph into attributed string
*
* @param index - Index
* @param glyph - Glyph or code point
* @param attributedString - Attributed string
* @returns Attributed string with new glyph
*/
var insertGlyph = (index, glyph, attributedString) => {
	const runIndex = runIndexAt(index, attributedString);
	if (runIndex === -1) return append(glyph, attributedString);
	const codePoints = [glyph];
	const string = attributedString.string.slice(0, index) + stringFromCodePoints(codePoints) + attributedString.string.slice(index);
	const runs = attributedString.runs.map((run, i) => {
		if (i === runIndex) return insert(index - run.start, glyph, run);
		if (i > runIndex) return add(codePoints.length, run);
		return run;
	});
	return Object.assign({}, attributedString, {
		string,
		runs
	});
};
/**
* Advance width between two string indices
*
* @param start - Glyph index
* @param end - Glyph index
* @param run - Run
* @returns Advanced width run
*/
var advanceWidthBetween$1 = (start, end, run) => {
	const runStart = run.start || 0;
	const glyphStartIndex = Math.max(0, glyphIndexAt(start - runStart, run));
	const glyphEndIndex = Math.max(0, glyphIndexAt(end - runStart, run));
	return advanceWidth$2((run.positions || []).slice(glyphStartIndex, glyphEndIndex));
};
/**
* Advance width between start and end
* Does not consider ligature splitting for the moment.
* Check performance impact on supporting this
*
* @param start - Start offset
* @param end - End offset
* @param attributedString
* @returns Advance width
*/
var advanceWidthBetween = (start, end, attributedString) => {
	return filter(start, end, attributedString.runs).reduce((acc, run) => acc + advanceWidthBetween$1(start, end, run), 0);
};
var HYPHEN = 45;
var TOLERANCE_STEPS = 5;
var TOLERANCE_LIMIT = 50;
var opts = {
	width: 3,
	stretch: 6,
	shrink: 9
};
/**
* Slice attributed string to many lines
*
* @param attributedString - Attributed string
* @param nodes
* @param breaks
* @returns Attributed strings
*/
var breakLines = (attributedString, nodes, breaks) => {
	let start = 0;
	let end = null;
	const lines = [];
	for (const breakPoint of breaks) {
		const node = nodes[breakPoint];
		const prevNode = nodes[breakPoint - 1];
		if (breakPoint === nodes.length - 1) continue;
		let line;
		if (node.type === "penalty") {
			end = prevNode.end;
			line = slice(start, end, attributedString);
			line = insertGlyph(line.string.length, HYPHEN, line);
		} else {
			end = node.end;
			line = slice(start, end, attributedString);
		}
		start = end;
		lines.push(line);
	}
	lines.push(slice(start, attributedString.string.length, attributedString));
	return lines;
};
/**
* Return Knuth & Plass nodes based on line and previously calculated syllables
*
* @param attributedString - Attributed string
* @param attributes - Attributes
* @param options - Layout options
* @returns ?
*/
var getNodes = (attributedString, { align }, options) => {
	let start = 0;
	const hyphenWidth = 5;
	const { syllables } = attributedString;
	const hyphenPenalty = options.hyphenationPenalty || (align === "justify" ? 100 : 600);
	const result = syllables.reduce((acc, s, index) => {
		const width = advanceWidthBetween(start, start + s.length, attributedString);
		if (s.trim() === "") {
			const stretch = width * opts.width / opts.stretch;
			const shrink = width * opts.width / opts.shrink;
			const end = start + s.length;
			acc.push(linebreak.glue(width, start, end, stretch, shrink));
		} else {
			const hyphenated = syllables[index + 1] !== " ";
			const end = start + s.length;
			acc.push(linebreak.box(width, start, end, hyphenated));
			if (syllables[index + 1] && hyphenated) acc.push(linebreak.penalty(hyphenWidth, hyphenPenalty, 1));
		}
		start += s.length;
		return acc;
	}, []);
	result.push(linebreak.glue(0, start, start, linebreak.infinity, 0));
	result.push(linebreak.penalty(0, -linebreak.infinity, 1));
	return result;
};
/**
* @param attributedString - Attributed string
* @returns Attributes
*/
var getAttributes = (attributedString) => {
	return attributedString.runs?.[0]?.attributes || {};
};
/**
* Performs Knuth & Plass line breaking algorithm
* Fallbacks to best fit algorithm if latter not successful
*
* @param options - Layout options
*/
var linebreaker = (options) => {
	/**
	* @param attributedString - Attributed string
	* @param availableWidths - Available widths
	* @returns Attributed string
	*/
	return (attributedString, availableWidths) => {
		let tolerance = options.tolerance || 4;
		const nodes = getNodes(attributedString, getAttributes(attributedString), options);
		let breaks = linebreak(nodes, availableWidths, tolerance);
		while (breaks.length === 0 && tolerance < TOLERANCE_LIMIT) {
			tolerance += TOLERANCE_STEPS;
			breaks = linebreak(nodes, availableWidths, tolerance);
		}
		if (breaks.length === 0 || breaks.length === 1 && breaks[0] === 0) breaks = applyBestFit(nodes, availableWidths);
		return breakLines(attributedString, nodes, breaks.slice(1));
	};
};
var Direction$1;
(function(Direction) {
	Direction[Direction["GROW"] = 0] = "GROW";
	Direction[Direction["SHRINK"] = 1] = "SHRINK";
})(Direction$1 || (Direction$1 = {}));
var WHITESPACE_PRIORITY = 1;
var LETTER_PRIORITY = 2;
var EXPAND_WHITESPACE_FACTOR = {
	before: .5,
	after: .5,
	priority: WHITESPACE_PRIORITY,
	unconstrained: false
};
var EXPAND_CHAR_FACTOR = {
	before: .14453125,
	after: .14453125,
	priority: LETTER_PRIORITY,
	unconstrained: false
};
var SHRINK_WHITESPACE_FACTOR = {
	before: -.04296875,
	after: -.04296875,
	priority: WHITESPACE_PRIORITY,
	unconstrained: false
};
var SHRINK_CHAR_FACTOR = {
	before: -.04296875,
	after: -.04296875,
	priority: LETTER_PRIORITY,
	unconstrained: false
};
var getCharFactor = (direction, options) => {
	const expandCharFactor = options.expandCharFactor || {};
	const shrinkCharFactor = options.shrinkCharFactor || {};
	return direction === Direction$1.GROW ? Object.assign({}, EXPAND_CHAR_FACTOR, expandCharFactor) : Object.assign({}, SHRINK_CHAR_FACTOR, shrinkCharFactor);
};
var getWhitespaceFactor = (direction, options) => {
	const expandWhitespaceFactor = options.expandWhitespaceFactor || {};
	const shrinkWhitespaceFactor = options.shrinkWhitespaceFactor || {};
	return direction === Direction$1.GROW ? Object.assign({}, EXPAND_WHITESPACE_FACTOR, expandWhitespaceFactor) : Object.assign({}, SHRINK_WHITESPACE_FACTOR, shrinkWhitespaceFactor);
};
var cloneFactor = (f) => ({
	before: f.before,
	after: f.after,
	priority: f.priority,
	unconstrained: f.unconstrained
});
var factor = (direction, options) => (glyphs) => {
	const charFactor = getCharFactor(direction, options);
	const whitespaceFactor = getWhitespaceFactor(direction, options);
	const factors = [];
	for (let index = 0; index < glyphs.length; index += 1) {
		let f;
		const glyph = glyphs[index];
		if (isWhiteSpace$1(glyph)) {
			f = cloneFactor(whitespaceFactor);
			if (index === glyphs.length - 1) {
				f.before = 0;
				if (index > 0) factors[index - 1].after = 0;
			}
		} else if (glyph.isMark && index > 0) {
			f = cloneFactor(factors[index - 1]);
			f.before = 0;
			factors[index - 1].after = 0;
		} else f = cloneFactor(charFactor);
		factors.push(f);
	}
	return factors;
};
var getFactors = (gap, line, options) => {
	const getFactor = factor(gap > 0 ? Direction$1.GROW : Direction$1.SHRINK, options);
	const factors = line.runs.reduce((acc, run) => {
		return acc.concat(getFactor(run.glyphs));
	}, []);
	factors[0].before = 0;
	factors[factors.length - 1].after = 0;
	return factors;
};
var KASHIDA_PRIORITY = 0;
var NULL_PRIORITY = 3;
var getDistances = (gap, factors) => {
	let total = 0;
	const priorities = [];
	const unconstrained = [];
	for (let priority = KASHIDA_PRIORITY; priority <= NULL_PRIORITY; priority += 1) priorities[priority] = unconstrained[priority] = 0;
	for (let j = 0; j < factors.length; j += 1) {
		const f = factors[j];
		const sum = f.before + f.after;
		total += sum;
		priorities[f.priority] += sum;
		if (f.unconstrained) unconstrained[f.priority] += sum;
	}
	let highestPriority = -1;
	let highestPrioritySum = 0;
	let remainingGap = gap;
	let priority;
	for (priority = KASHIDA_PRIORITY; priority <= NULL_PRIORITY; priority += 1) {
		const prioritySum = priorities[priority];
		if (prioritySum !== 0) {
			if (highestPriority === -1) {
				highestPriority = priority;
				highestPrioritySum = prioritySum;
			}
			if (Math.abs(remainingGap) <= Math.abs(prioritySum)) {
				priorities[priority] = remainingGap / prioritySum;
				unconstrained[priority] = 0;
				remainingGap = 0;
				break;
			}
			priorities[priority] = 1;
			remainingGap -= prioritySum;
			if (unconstrained[priority] !== 0) {
				unconstrained[priority] = remainingGap / unconstrained[priority];
				remainingGap = 0;
				break;
			}
		}
	}
	for (let p = priority + 1; p <= NULL_PRIORITY; p += 1) {
		priorities[p] = 0;
		unconstrained[p] = 0;
	}
	if (remainingGap > 0 && highestPriority > -1) priorities[highestPriority] = (highestPrioritySum + (gap - total)) / highestPrioritySum;
	const distances = [];
	for (let index = 0; index < factors.length; index += 1) {
		const f = factors[index];
		const next = factors[index + 1];
		let dist = f.after * priorities[f.priority];
		if (next) dist += next.before * priorities[next.priority];
		if (f.unconstrained) {
			dist += f.after * unconstrained[f.priority];
			if (next) dist += next.before * unconstrained[next.priority];
		}
		distances.push(dist);
	}
	return distances;
};
/**
* Adjust run positions by given distances
*
* @param distances
* @param line
* @returns Line
*/
var justifyLine = (distances, line) => {
	let index = 0;
	for (const run of line.runs) for (const position of run.positions) position.xAdvance += distances[index++];
	return line;
};
/**
* A JustificationEngine is used by a Typesetter to perform line fragment
* justification. This implementation is based on a description of Apple's
* justification algorithm from a PDF in the Apple Font Tools package.
*
* @param options - Layout options
*/
var justification = (options) => {
	/**
	* @param line
	* @returns Line
	*/
	return (line) => {
		const gap = line.box.width - advanceWidth(line);
		if (gap === 0) return line;
		return justifyLine(getDistances(gap, getFactors(gap, line, options)), line);
	};
};
/**
* Returns attributed string ascent
*
* @param attributedString - Attributed string
* @returns Ascent
*/
var ascent = (attributedString) => {
	const reducer = (acc, run) => Math.max(acc, ascent$1(run));
	return attributedString.runs.reduce(reducer, 0);
};
var BASE_FONT_SIZE = 12;
/**
* A TextDecorationEngine is used by a Typesetter to generate
* DecorationLines for a line fragment, including underlines
* and strikes.
*/
var textDecoration = () => (line) => {
	let x = line.overflowLeft || 0;
	const overflowRight = line.overflowRight || 0;
	const maxX = advanceWidth(line) - overflowRight;
	line.decorationLines = [];
	for (let i = 0; i < line.runs.length; i += 1) {
		const run = line.runs[i];
		const width = Math.min(maxX - x, advanceWidth$1(run));
		const thickness = Math.max(.5, Math.floor(run.attributes.fontSize / BASE_FONT_SIZE));
		if (run.attributes.underline) {
			const decorationLine = {
				rect: {
					x,
					y: ascent(line) + thickness * 2,
					width,
					height: thickness
				},
				opacity: run.attributes.opacity,
				color: run.attributes.underlineColor || "black",
				style: run.attributes.underlineStyle || "solid"
			};
			line.decorationLines.push(decorationLine);
		}
		if (run.attributes.strike) {
			const y = ascent(line) - ascent$1(run) / 3;
			const decorationLine = {
				rect: {
					x,
					y,
					width,
					height: thickness
				},
				opacity: run.attributes.opacity,
				color: run.attributes.strikeColor || "black",
				style: run.attributes.strikeStyle || "solid"
			};
			line.decorationLines.push(decorationLine);
		}
		x += width;
	}
	return line;
};
var ignoredScripts = [
	"Common",
	"Inherited",
	"Unknown"
];
/**
* Resolves unicode script in runs, grouping equal runs together
*/
var scriptItemizer = () => {
	/**
	* @param attributedString - Attributed string
	* @returns Attributed string
	*/
	return (attributedString) => {
		const { string } = attributedString;
		let lastScript = "Unknown";
		let lastIndex = 0;
		let index = 0;
		const runs = [];
		if (!string) return empty();
		for (let i = 0; i < string.length; i += 1) {
			const char = string[i];
			const codePoint = char.codePointAt(0);
			const script = $747425b437e121da$export$2e2bcd8739ae039.getScript(codePoint);
			if (script !== lastScript && !ignoredScripts.includes(script)) {
				if (lastScript !== "Unknown") runs.push({
					start: lastIndex,
					end: index,
					attributes: { script: lastScript }
				});
				lastIndex = index;
				lastScript = script;
			}
			index += char.length;
		}
		if (lastIndex < string.length) runs.push({
			start: lastIndex,
			end: string.length,
			attributes: { script: lastScript }
		});
		return {
			string,
			runs
		};
	};
};
var SOFT_HYPHEN = "­";
var wordHyphenation = () => {
	/**
	* @param word - Word
	* @returns Word parts
	*/
	return (word) => {
		if (isNil(word)) return [];
		if (word.includes(SOFT_HYPHEN)) return word.split(SOFT_HYPHEN);
		return syllables(word);
	};
};
var IGNORED_CODE_POINTS = [173];
var getFontSize = (run) => run.attributes.fontSize || 12;
var pickFontFromFontStack = (codePoint, fontStack, lastFont) => {
	if (IGNORED_CODE_POINTS.includes(codePoint)) return lastFont;
	const fontStackWithFallback = [...fontStack, lastFont];
	for (let i = 0; i < fontStackWithFallback.length; i += 1) {
		const font = fontStackWithFallback[i];
		if (font && font.hasGlyphForCodePoint && font.hasGlyphForCodePoint(codePoint)) return font;
	}
	return fontStack.at(-1);
};
var fontSubstitution = () => ({ string, runs }) => {
	let lastFont = null;
	let lastFontSize = null;
	let lastIndex = 0;
	let index = 0;
	const res = [];
	for (let i = 0; i < runs.length; i += 1) {
		const run = runs[i];
		if (string.length === 0) {
			res.push({
				start: 0,
				end: 0,
				attributes: { font: run.attributes.font }
			});
			break;
		}
		const chars = string.slice(run.start, run.end);
		let j = 0;
		while (j < chars.length) {
			const codePoint = chars.codePointAt(j);
			const charLength = codePoint > 65535 ? 2 : 1;
			const font = pickFontFromFontStack(codePoint, run.attributes.font, lastFont);
			const fontSize = getFontSize(run);
			if (font !== lastFont || fontSize !== lastFontSize || font.unitsPerEm !== lastFont?.unitsPerEm) {
				if (lastFont) res.push({
					start: lastIndex,
					end: index,
					attributes: {
						font: [lastFont],
						scale: lastFontSize / lastFont.unitsPerEm
					}
				});
				lastFont = font;
				lastFontSize = fontSize;
				lastIndex = index;
			}
			j += charLength;
			index += charLength;
		}
	}
	if (lastIndex < string.length) {
		const fontSize = getFontSize(last(runs));
		res.push({
			start: lastIndex,
			end: string.length,
			attributes: {
				font: [lastFont],
				scale: fontSize / lastFont.unitsPerEm
			}
		});
	}
	return {
		string,
		runs: res
	};
};
//#endregion
//#region node_modules/yoga-layout/dist/binaries/yoga-wasm-base64-esm.js
var loadYoga$2 = (() => {
	var _scriptDir = import.meta.url;
	return (function(loadYoga) {
		loadYoga = loadYoga || {};
		var h;
		h || (h = typeof loadYoga !== "undefined" ? loadYoga : {});
		var aa, ca;
		h.ready = new Promise(function(a, b) {
			aa = a;
			ca = b;
		});
		var da = Object.assign({}, h), q = "";
		"undefined" != typeof document && document.currentScript && (q = document.currentScript.src);
		_scriptDir && (q = _scriptDir);
		0 !== q.indexOf("blob:") ? q = q.substr(0, q.replace(/[?#].*/, "").lastIndexOf("/") + 1) : q = "";
		var ea = h.print || console.log.bind(console), v = h.printErr || console.warn.bind(console);
		Object.assign(h, da);
		da = null;
		var w;
		h.wasmBinary && (w = h.wasmBinary);
		h.noExitRuntime;
		"object" != typeof WebAssembly && x("no native wasm support detected");
		var fa, ha = !1;
		function z(a, b, c) {
			c = b + c;
			for (var d = ""; !(b >= c);) {
				var e = a[b++];
				if (!e) break;
				if (e & 128) {
					var f = a[b++] & 63;
					if (192 == (e & 224)) d += String.fromCharCode((e & 31) << 6 | f);
					else {
						var g = a[b++] & 63;
						e = 224 == (e & 240) ? (e & 15) << 12 | f << 6 | g : (e & 7) << 18 | f << 12 | g << 6 | a[b++] & 63;
						65536 > e ? d += String.fromCharCode(e) : (e -= 65536, d += String.fromCharCode(55296 | e >> 10, 56320 | e & 1023));
					}
				} else d += String.fromCharCode(e);
			}
			return d;
		}
		var ia, ja, A, C, ka, D, E, la, ma;
		function na() {
			var a = fa.buffer;
			ia = a;
			h.HEAP8 = ja = new Int8Array(a);
			h.HEAP16 = C = new Int16Array(a);
			h.HEAP32 = D = new Int32Array(a);
			h.HEAPU8 = A = new Uint8Array(a);
			h.HEAPU16 = ka = new Uint16Array(a);
			h.HEAPU32 = E = new Uint32Array(a);
			h.HEAPF32 = la = new Float32Array(a);
			h.HEAPF64 = ma = new Float64Array(a);
		}
		var oa, pa = [], qa = [], ra = [];
		function sa() {
			var a = h.preRun.shift();
			pa.unshift(a);
		}
		var F = 0, ta = null, G = null;
		function x(a) {
			if (h.onAbort) h.onAbort(a);
			a = "Aborted(" + a + ")";
			v(a);
			ha = !0;
			a = new WebAssembly.RuntimeError(a + ". Build with -sASSERTIONS for more info.");
			ca(a);
			throw a;
		}
		function ua(a) {
			return a.startsWith("data:application/octet-stream;base64,");
		}
		var H = "data:application/octet-stream;base64,AGFzbQEAAAABugM3YAF/AGACf38AYAF/AX9gA39/fwBgAn98AGACf38Bf2ADf39/AX9gBH9/f30BfWADf398AGAAAGAEf39/fwBgAX8BfGACf38BfGAFf39/f38Bf2AAAX9gA39/fwF9YAZ/f31/fX8AYAV/f39/fwBgAn9/AX1gBX9/f319AX1gAX8BfWADf35/AX5gB39/f39/f38AYAZ/f39/f38AYAR/f39/AX9gBn9/f319fQF9YAR/f31/AGADf399AX1gBn98f39/fwF/YAR/fHx/AGACf30AYAh/f39/f39/fwBgDX9/f39/f39/f39/f38AYAp/f39/f39/f39/AGAFf39/f38BfGAEfHx/fwF9YA1/fX1/f399fX9/f39/AX9gB39/f319f38AYAJ+fwF/YAN/fX0BfWABfAF8YAN/fHwAYAR/f319AGAHf39/fX19fQF9YA1/fX99f31/fX19fX1/AX9gC39/f39/f399fX19AX9gCH9/f39/f319AGAEf39+fgBgB39/f39/f38Bf2ACfH8BfGAFf398fH8AYAN/f38BfGAEf39/fABgA39/fQBgBn9/fX99fwF/ArUBHgFhAWEAHwFhAWIAAwFhAWMACQFhAWQAFgFhAWUAEQFhAWYAIAFhAWcAAAFhAWgAIQFhAWkAAwFhAWoAAAFhAWsAFwFhAWwACgFhAW0ABQFhAW4AAwFhAW8AAQFhAXAAFwFhAXEABgFhAXIAAAFhAXMAIgFhAXQACgFhAXUADQFhAXYAFgFhAXcAAgFhAXgAAwFhAXkAGAFhAXoAAgFhAUEAAQFhAUIAEQFhAUMAAQFhAUQAAAOiAqACAgMSBwcACRkDAAoRBgYKEwAPDxMBBiMTCgcHGgMUASQFJRQHAwMKCgMmAQYYDxobFAAKBw8KBwMDAgkCAAAFGwACBwIHBgIDAQMIDAABKAkHBQURACkZASoAAAIrLAIALQcHBy4HLwkFCgMCMA0xAgMJAgACAQYKAQIBBQEACQIFAQEABQAODQ0GFQIBHBUGAgkCEAAAAAUyDzMMBQYINAUCAwUODg41AgMCAgIDBgICNgIBDAwMAQsLCwsLCx0CAAIAAAABABABBQICAQMCEgMMCwEBAQEBAQsLAQICAwICAgICAgIDAgIICAEICAgEBAQEBAQEBAQABAQABAQEBAAE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GiABQQA2AvADIAFCADcC6AMgAigC7AMiAyACKALoAyIERwRAIAMgBGsiBEEASA0FIAEgBBAeIgM2AuwDIAEgAzYC6AMgASADIARqNgLwAyACKALoAyIEIAIoAuwDIghHBEADQCADIAQoAgA2AgAgA0EEaiEDIARBBGoiBCAIRw0ACwsgASADNgLsAwsgASACKQL0AzcC9AMgASACKAKEBDYChAQgASACKQL8AzcC/AMgAUEANgLkAwsgBSABNgIAIAEgADYC5AMLIAZBAWohBiAFQQRqIgUgB0cNAAsLDwsQAgALUAACQAJAAkACQAJAIAIOBAQAAQIDCyAAIAEgAUEwahBDDwsgACABIAFBMGogAxBEDwsgACABIAFBMGoQQg8LECQACyAAIAEgAUEwaiADEEULcAIBfwF9IwBBEGsiBCQAIARBCGogACABQQJ0QdwlaigCACACEDZDAADAfyEFAkACQAJAIAQtAAxBAWsOAgABAgsgBCoCCCEFDAELIAQqAgggA5RDCtcjPJQhBQsgBEEQaiQAIAVDAAAAACAFIAVbGwt5AgF/AX0jAEEQayIDJAAgA0EIaiAAIAFBAnRB7CVqKAIAIAIQU0MAAMB/IQQCQAJAAkAgAy0ADEEBaw4CAAECCyADKgIIIQQMAQsgAyoCCEMAAAAAlEMK1yM8lCEECyADQRBqJAAgBEMAAAAAl0MAAAAAIAQgBFsbC1QAAkACQAJAAkACQCACDgQEAAECAwsgACABIAFBwgBqEEMPCyAAIAEgAUHCAGogAxBEDwsgACABIAFBwgBqEEIPCxAkAAsgACABIAFBwgBqIAMQRQsvACAAIAJFQQF0IgIgASADEGAgACACIAEQS5IgACACIAEgAxB/IAAgAiABEFKSkgvOAQIDfwJ9IwBBEGsiAyQAQQEhBCADQQhqIABB/ABqIgUgACABQQF0akH2AGoiAS8BABAfAkACQCADKgIIIgcgAioCACIGXARAIAcgB1sEQCACLQAEIQIMAgsgBiAGXCEECyACLQAEIQIgBEUNACADLQAMIAJB/wFxRg0BCyAFIAEgBiACEDkDQCAALQAAIgFBBHENASAAIAFBBHI6AAAgACgCECIBBEAgACABEQAACyAAQYCAgP4HNgKcASAAKALkAyIADQALCyADQRBqJAALzgECA38CfSMAQRBrIgMk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AWsOAgABAgsgBCoCCCEFDAELIAQqAgggA5RDCtcjPJQhBQsgBEEQaiQAIAVDAAAAACAFIAVbGwscACAAIAFBCCACpyACQiCIpyADpyADQiCIpxAVCwUAEFgACzkAIABFBEBBAA8LAn8gAUGAf3FBgL8DRiABQf8ATXJFBEBB/DtBGTYCAEF/DAELIAAgAToAAEEBCwvEAgACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQCABQQlrDhIACgsMCgsCAwQFDAsMDAoLBwgJCyACIAIoAgAiAUEEajYCACAAIAEoAgA2AgAPCwALIAIgAigCACIBQQRqNgIAIAAgATIBADcDAA8LIAIgAigCACIBQQRqNgIAIAAgATMBADcDAA8LIAIgAigCACIBQQRqNgIAIAAgATAAADcDAA8LIAIgAigCACIBQQRqNgIAIAAgATEAADcDAA8LAAsgAiACKAIAQQdqQXhxIgFBCGo2AgAgACABKwMAOQMADwsgACACIAMRAQALDwsgAiACKAIAIgFBBGo2AgAgACABNAIANwMADwsgAiACKAIAIgFBBGo2AgAgACABNQIANwMADwsgAiACKAIAQQdqQXhxIgFBCGo2AgAgACABKQMANwMAC84BAgN/An0jAEEQayIDJABBASEEIANBCGogAEH8AGoiBSAAIAFBAXRqQegAaiIBLwEAEB8CQAJAIAMqAggiByACKgIAIgZcBEAgByAHWwRAIAItAAQhAgwCCyAGIAZcIQQLIAItAAQhAiAERQ0AIAMtAAwgAkH/AXFGDQELIAUgASAGIAIQOQNAIAAtAAAiAUEEcQ0BIAAgAUEEcjoAACAAKAIQIgEEQCAAIAERAAALIABBgICA/gc2ApwBIAAoAuQDIgANAAsLIANBEGokAAtdAQR/IAAoAgAhAgNAIAIsAAAiAxBXBEBBfyEEIAAgAkEBaiICNgIAIAFBzJmz5gBNBH9BfyADQTBrIgMgAUEKbCIEaiADIARB/////wdzShsFIAQLIQEMAQsLIAELrhQCEn8BfiMAQdAAayIIJAAgCCABNgJMIAhBN2ohFyAIQThqIRQCQAJAAkACQANAIAEhDSAHIA5B/////wdzSg0BIAcgDmohDgJAAkACQCANIgctAAAiCQRAA0ACQAJAIAlB/wFxIgFFBEAgByEBDAELIAFBJUcNASAH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IQEgAEIANwIEIAAgATYCACABIAA2AgQgAkEQaiQAIAALGwEBfyAABEAgACgCACIBBEAgARAjCyAAECMLC0kBAn9BBBAeIQFBIBAeIgBBADYCHCAAQoCAgICAgIDAPzcCFCAAQgA3AgwgAEEAOgAIIABBAzYCBCAAQQA2AgAgASAANgIAIAELIAAgAkEFR0EAIAIbRQRAQbgwIAMgBBBJDwsgAyAEEHALIgEBfiABIAKtIAOtQiCGhCAEIAARFQAiBUIgiKckASAFpwuoAQEFfyAAKAJUIgMoAgAhBSADKAIEIgQgACgCFCAAKAIcIgdrIgYgBCAGSRsiBgRAIAUgByAGECsaIAMgAygCACAGaiIFNgIAIAMgAygCBCAGayIENgIECyAEIAIgAiAESxsiBARAIAUgASAEECsaIAMgAygCACAEaiIFNgIAIAMgAygCBCAEazYCBAsgBUEAOgAAIAAgACgCLCIBNgIcIAAgATYCFCACCwQAQgALBABBAAuKBQIGfgJ/IAEgASgCAEEHakF4cSIBQRBqNgIAIAAhCSABKQMAIQMgASkDCCEGIwBBIGsiCCQAAkAgBkL///////////8AgyIEQoCAgICAgMCAPH0gBEKAgICAgIDA/8MAfVQEQCAGQgSGIANCPIiEIQQgA0L//////////w+DIgNCgYCAgICAgIAIWgRAIARCgYCAgICAgIDAAHwhAgwCCyAEQoCAgICAgICAQH0hAiADQoCAgICAgICACFINASACIARCAYN8IQIMAQsgA1AgBEKAgICAgIDA//8AVCAEQoCAgICAgMD//wBRG0UEQCAGQgSGIANCPIiEQv////////8Dg0KAgICAgICA/P8AhCECDAELQoCAgICAgID4/wAhAiAEQv///////7//wwBWDQBCACECIARCMIinIgBBkfcASQ0AIAMhAiAGQv///////z+DQoCAgICAgMAAhCIFIQcCQCAAQYH3AGsiAUHAAHEEQCACIAFBQGqthiEHQgAhAgwBCyABRQ0AIAcgAa0iBIYgAkHAACABa62IhCEHIAIgBIYhAgsgCCACNwMQIAggBzcDGAJAQYH4ACAAayIAQcAAcQRAIAUgAEFAaq2IIQNCACEFDAELIABFDQAgBUHAACAAa62GIAMgAK0iAoiEIQMgBSACiCEFCyAIIAM3AwAgCCAF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ASAAKAIAIQAgASACQQFxBH8gASgCACAAaigCAAUgAAsRCwALYQECfyMAQRBrIgIkACABIAAoAgQiA0EBdWohASAAKAIAIQAgAiABIANBAXEEfyABKAIAIABqKAIABSAACxEBAEEQEB4iACACKQMINwMIIAAgAikDADcDACACQRBqJAAgAAtjAQJ/IwBBEGsiAyQAIAEgACgCBCIEQQF1aiEBIAAoAgAhACADIAEgAiAEQQFxBH8gASgCACAAaigCAAUgAAsRAwBBEBAeIgAgAykDCDcDCCAAIAMpAwA3AwAgA0EQaiQAIAALNwEBfyABIAAoAgQiA0EBdWohASAAKAIAIQAgASACIANBAXEEfyABKAIAIABqKAIABSAACxEEAAs5AQF/IAEgACgCBCIEQQF1aiEBIAAoAgAhACABIAIgAyAEQQFxBH8gASgCACAAaigCAAUgAAsRCAALCQAgASAAEQIACwUAQcM7Cw8AIAEgACgCAGogAjYCAAsNACABIAAoAgBqKAIACxgBAX9BEBAeIgBCADcDCCAAQQA2AgAgAAsYAQF/QRAQHiIAQgA3AwAgAEIANwMIIAALDABBMBAeQQBBMBAqCzcBAX8gASAAKAIEIgNBAXVqIQEgACgCACEAIAEgAiADQQFxBH8gASgCACAAaigCAAUgAAsRHgALBQBBvjsLIQAgACABKAIAIAEgASwAC0EASBtBuzsgAigCABAQNgIACyoBAX9BDBAeIgFBADoABCABIAAoAgA2AgggAEEANgIAIAFB2Cc2AgAgAQsFAEG7OwsFAEG4OwshACAAIAEoAgAgASABLAALQQBIG0GkOyACKAIAEBA2AgAL2AEBBH8jAEEgayIDJAAgASgCACIEQfD///8HSQRAAkACQCAEQQtPBEAgBEEPckEBaiIFEB4hBiADIAVBgICAgHhyNgIQIAMgBjYCCCADIAQ2AgwgBCAGaiEFDAELIAMgBDoAEyADQQhqIgYgBGohBSAERQ0BCyAGIAFBBGogBBArGgsgBUEAOgAAIAMgAjYCACADQRhqIANBCGogAyAAEQMAIAMoAhgQHSADKAIYIgAQBiADKAIAEAYgAywAE0EASARAIAMoAggQIwsgA0EgaiQAIAAPCxACAAsqAQF/QQwQHiIBQQA6AAQgASAAKAIANgIIIABBADYCACABQeAmNgIA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AkEIaiAIIAYQHyACIAcgAC8AABAfQQEhAyACKgIIIgogAioCACILXAR/IAogClsNAyALIAtcBSADC0UNAiACLQAMIAItAARHDQILIABBAmohAEEBIQMgBCEGQQEhBCAGRQ0ACyABLwB6IgBBB3FFBEAgBS0AekEHcUUNAgsgCCAAECAiCiAHIAUvAHoQICILWw0BIAogClsNACALIAtcDQELIAFBFGogBUEUakHoABArGiABQfwAaiAFQfwAahCgAQNAIAEtAAAiAEEEcQ0BIAEgAEEEcjoAACABKAIQIgAEQCABIAARAAALIAFBgICA/gc2ApwBIAEoAuQDIgENAAsLIAJBEGokAAvGAwEEfyMAQaAEayICJAAgACgCBCEBIABBADYCBCABBEAgASABKAIAKAIEEQAACyAAKAIIIQEgAEEANgIIIAEEQCABIAEoAgAoAgQRAAALAkAgACgCACIAKALoAyAAKALsA0YEQCAAKALkAw0BIAAgAkEYaiAAKAL0AxBcIgEpAgA3AgAgACABKAIQNgIQIAAgASkCCDcCCCAAQRRqIAFBFGpB6AAQKxogACABKQKMATcCjAEgACABKQKEATcChAEgACABKQJ8NwJ8IAEoApQBIQQgAUEANgKUASAAKAKUASEDIAAgBDYClAEgAwRAIAMQWwsgAEGYAWogAUGYAWpB0AIQKxogACgC6AMiAwRAIAAgAzYC7AMgAxAjCyAAIAEoAugDNgLoAyAAIAEoAuwDNgLsAyAAIAEoAvADNgLwAyABQQA2AvADIAFCADcC6AMgACABKQL8AzcC/AMgACABKQL0AzcC9AMgACABKAKEBDYChAQgASgClAEhACABQQA2ApQBIAAEQCAAEFsLIAJBoARqJAAPCyACQfAcNgIQIABBBUHYJSACQRBqECwQJAALIAJB5hE2AgAgAEEFQdglIAIQLBAkAAsLAEEMEB4gABCiAQsLAEEMEB5BABCiAQsNACAAKAIALQAIQQFxCwoAIAAoAgAoAhQLGQAgAUH/AXEEQBACAAsgACgCACgCEEEBcQsYACAAKAIAIgAgAC0ACEH+AXEgAXI6AAgLJgAgASAAKAIAIgAoAhRHBEAgACABNgIUIAAgACgCDEEBajYCDAsLkgEBAn8jAEEQayICJAAgACgCACEAIAFDAAAAAGAEQCABIAAqAhhcBEAgACABOAIYIAAgACgCDEEBajYCDAsgAkEQaiQADwsgAkGIFDYCACMAQRBrIgMkACADIAI2AgwCQCAARQRAQbgwQdglIAIQSRoMAQsgAEEAQQVB2CUgAiAAKAIEEQ0AGgsgA0EQaiQAECQACz8AIAFB/wFxRQRAIAIgACgCACIAKAIQIgFBAXFHBEAgACABQX5xIAJyNgIQIAAgACgCDEEBajYCDAsPCxACAAsL4CYjAEGACAuBHk9ubHkgbGVhZiBub2RlcyB3aXRoIGN1c3RvbSBtZWFzdXJlIGZ1bmN0aW9ucyBzaG91bGQgbWFudWFsbHkgbWFyayB0aGVtc2VsdmVzIGFzIGRpcnR5AGlzRGlydHkAbWFya0RpcnR5AGRlc3Ryb3kAc2V0RGlzcGxheQBnZXREaXNwbGF5AHNldEZsZXgALSsgICAwWDB4AC0wWCswWCAwWC0weCsweCAweABzZXRGbGV4R3JvdwBnZXRGbGV4R3JvdwBzZXRPdmVyZmxvdwBnZXRPdmVyZmxvdwBoYXNOZXdMYXlvdXQAY2FsY3VsYXRlTGF5b3V0AGdldENvbXB1dGVkTGF5b3V0AHVuc2lnbmVkIHNob3J0AGdldENoaWxkQ291bnQAdW5zaWduZWQgaW50AHNldEp1c3RpZnlDb250ZW50AGdldEp1c3RpZnlDb250ZW50AGF2YWlsYWJsZUhlaWdodCBpcyBpbmRlZmluaXRlIHNvIGhlaWdodFNpemluZ01vZGUgbXVzdCBiZSBTaXppbmdNb2RlOjpNYXhDb250ZW50AGF2YWlsYWJsZVdpZHRoIGlzIGluZGVmaW5pdGUgc28gd2lkdGhTaXppbmdNb2RlIG11c3QgYmUgU2l6aW5nTW9kZTo6TWF4Q29udGVudABzZXRBbGlnbkNvbnRlbnQAZ2V0QWxpZ25Db250ZW50AGdldFBhcmVudABpbXBsZW1lbnQAc2V0TWF4SGVpZ2h0UGVyY2VudABzZXRIZWlnaHRQZXJjZW50AHNldE1pbkhlaWdodFBlcmNlbnQAc2V0RmxleEJhc2lzUGVyY2VudABzZXRHYXBQZXJjZW50AHNldFBvc2l0aW9uUGVyY2VudABzZXRNYXJnaW5QZXJjZW50AHNldE1heFdpZHRoUGVyY2VudABzZXRXaWR0aFBlcmNlbnQAc2V0TWluV2lkdGhQZXJjZW50AHNldFBhZGRpbmdQZXJjZW50AGhhbmRsZS50eXBlKCkgPT0gU3R5bGVWYWx1ZUhhbmRsZTo6VHlwZTo6UG9pbnQgfHwgaGFuZGxlLnR5cGUoKSA9PSBTdHlsZVZhbHVlSGFuZGxlOjpUeXBlOjpQZXJjZW50AGNyZWF0ZURlZmF1bHQAdW5pdAByaWdodABoZWlnaHQAc2V0TWF4SGVpZ2h0AGdldE1heEhlaWdodABzZXRIZWlnaHQAZ2V0SGVpZ2h0AHNldE1pbkhlaWdodABnZXRNaW5IZWlnaHQAZ2V0Q29tcHV0ZWRIZWlnaHQAZ2V0Q29tcHV0ZWRSaWdodABsZWZ0AGdldENvbXB1dGVkTGVmdAByZXNldABfX2Rlc3RydWN0AGZsb2F0AHVpbnQ2NF90AHVzZVdlYkRlZmF1bHRzAHNldFVzZVdlYkRlZmF1bHRzAHNldEFsaWduSXRlbXMAZ2V0QWxpZ25JdGVtcwBzZXRGbGV4QmFzaXMAZ2V0RmxleEJhc2lzAENhbm5vdCBnZXQgbGF5b3V0IHByb3BlcnRpZXMgb2YgbXVsdGktZWRnZSBzaG9ydGhhbmRzAHNldFBvaW50U2NhbGVGYWN0b3IATWVhc3VyZUNhbGxiYWNrV3JhcHBlcgBEaXJ0aWVkQ2FsbGJhY2tXcmFwcGVyAENhbm5vdCByZXNldCBhIG5vZGUgc3RpbGwgYXR0YWNoZWQgdG8gYSBvd25lcgBzZXRCb3JkZXIAZ2V0Qm9yZGVyAGdldENvbXB1dGVkQm9yZGVyAGdldE51bWJlcgBoYW5kbGUudHlwZSgpID09IFN0eWxlVmFsdWVIYW5kbGU6OlR5cGU6Ok51bWJlcgB1bnNpZ25lZCBjaGFyAHRvcABnZXRDb21wdXRlZFRvcABzZXRGbGV4V3JhcABnZXRGbGV4V3JhcABzZXRHYXAAZ2V0R2FwACVwAHNldEhlaWdodEF1dG8Ac2V0RmxleEJhc2lzQXV0bwBzZXRQb3NpdGlvbkF1dG8Ac2V0TWFyZ2luQXV0bwBzZXRXaWR0aEF1dG8AU2NhbGUgZmFjdG9yIHNob3VsZCBub3QgYmUgbGVzcyB0aGFuIHplcm8Ac2V0QXNwZWN0UmF0aW8AZ2V0QXNwZWN0UmF0aW8Ac2V0UG9zaXRpb24AZ2V0UG9zaXRpb24Abm90aWZ5T25EZXN0cnVjdGlvbgBzZXRGbGV4RGlyZWN0aW9uAGdldEZsZXhEaXJlY3Rpb24Ac2V0RGlyZWN0aW9uAGdldERpcmVjdGlvbgBzZXRNYXJnaW4AZ2V0TWFyZ2luAGdldENvbXB1dGVkTWFyZ2luAG1hcmtMYXlvdXRTZWVuAG5hbgBib3R0b20AZ2V0Q29tcHV0ZWRCb3R0b20AYm9vbABlbXNjcmlwdGVuOjp2YWwAc2V0RmxleFNocmluawBnZXRGbGV4U2hyaW5rAHNldEFsd2F5c0Zvcm1zQ29udGFpbmluZ0Jsb2NrAE1lYXN1cmVDYWxsYmFjawBEaXJ0aWVkQ2FsbGJhY2sAZ2V0TGVuZ3RoAHdpZHRoAHNldE1heFdpZHRoAGdldE1heFdpZHRoAHNldFdpZHRoAGdldFdpZHRoAHNldE1pbldpZHRoAGdldE1pbldpZHRoAGdldENvbXB1dGVkV2lkdGgAcHVzaAAvaG9tZS9ydW5uZXIvd29yay95b2dhL3lvZ2EvamF2YXNjcmlwdC8uLi95b2dhL3N0eWxlL1NtYWxsVmFsdWVCdWZmZXIuaAAvaG9tZS9ydW5uZXIvd29yay95b2dhL3lvZ2EvamF2YXNjcmlwdC8uLi95b2dhL3N0eWxlL1N0eWxlVmFsdWVQb29sLmgAdW5zaWduZWQgbG9uZwBzZXRCb3hTaXppbmcAZ2V0Qm94U2l6aW5nAHN0ZDo6d3N0cmluZwBzdGQ6OnN0cmluZwBzdGQ6OnUxNnN0cmluZwBzdGQ6OnUzMnN0cmluZwBzZXRQYWRkaW5nAGdldFBhZGRpbmcAZ2V0Q29tcHV0ZWRQYWRkaW5nAFRyaWVkIHRvIGNvbnN0cnVjdCBZR05vZGUgd2l0aCBudWxsIGNvbmZpZwBBdHRlbXB0aW5nIHRvIGNvbnN0cnVjdCBOb2RlIHdpdGggbnVsbCBjb25maWcAY3JlYXRlV2l0aENvbmZpZwBpbmYAc2V0QWxpZ25TZWxmAGdldEFsaWduU2VsZgBTaXplAHZhbHVlAFZhbHVlAGNyZWF0ZQBtZWFzdXJlAHNldFBvc2l0aW9uVHlwZQBnZXRQb3NpdGlvblR5cGUAaXNSZWZlcmVuY2VCYXNlbGluZQBzZXRJc1JlZmVyZW5jZUJhc2VsaW5lAGNvcHlTdHlsZQBkb3VibGUATm9kZQBleHRlbmQAaW5zZXJ0Q2hpbGQAZ2V0Q2hpbGQAcmVtb3ZlQ2hpbGQAdm9pZABzZXRFeHBlcmltZW50YWxGZWF0dXJlRW5hYmxlZABpc0V4cGVyaW1lbnRhbEZlYXR1cmVFbmFibGVkAGRpcnRpZWQAQ2Fubm90IHJlc2V0IGEgbm9kZSB3aGljaCBzdGlsbCBoYXMgY2hpbGRyZW4gYXR0YWNoZWQAdW5zZXRNZWFzdXJlRnVuYwB1bnNldERpcnRpZWRGdW5jAHNldEVycmF0YQBnZXRFcnJhdGEATWVhc3VyZSBmdW5jdGlvbiByZXR1cm5lZCBhbiBpbnZhbGlkIGRpbWVuc2lvbiB0byBZb2dhOiBbd2lkdGg9JWYsIGhlaWdodD0lZl0ARXhwZWN0IGN1c3RvbSBiYXNlbGluZSBmdW5jdGlvbiB0byBub3QgcmV0dXJuIE5hTgBOQU4ASU5GAGVtc2NyaXB0ZW46Om1lbW9yeV92aWV3PHNob3J0PgBlbXNjcmlwdGVuOjptZW1vcnlfdmlldzx1bnNpZ25lZCBzaG9ydD4AZW1zY3JpcHRlbjo6bWVtb3J5X3ZpZXc8aW50PgBlbXNjcmlwdGVuOjptZW1vcnlfdmlldzx1bnNpZ25lZCBpbnQ+AGVtc2NyaXB0ZW46Om1lbW9yeV92aWV3PGZsb2F0PgBlbXNjcmlwdGVuOjptZW1vcnlfdmlldzx1aW50OF90PgBlbXNjcmlwdGVuOjptZW1vcnlfdmlldzxpbnQ4X3Q+AGVtc2NyaXB0ZW46Om1lbW9yeV92aWV3PHVpbnQxNl90PgBlbXNjcmlwdGVuOjptZW1vcnlfdmlldzxpbnQxNl90PgBlbXNjcmlwdGVuOjptZW1vcnlfdmlldzx1aW50MzJfdD4AZW1zY3JpcHRlbjo6bWVtb3J5X3ZpZXc8aW50MzJfdD4AZW1zY3JpcHRlbjo6bWVtb3J5X3ZpZXc8Y2hhcj4AZW1zY3JpcHRlbjo6bWVtb3J5X3ZpZXc8dW5zaWduZWQgY2hhcj4Ac3RkOjpiYXNpY19zdHJpbmc8dW5zaWduZWQgY2hhcj4AZW1zY3JpcHRlbjo6bWVtb3J5X3ZpZXc8c2lnbmVk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";
		if (!ua(H)) {
			var va = H;
			H = h.locateFile ? h.locateFile(va, q) : q + va;
		}
		function wa() {
			var a = H;
			try {
				if (a == H && w) return new Uint8Array(w);
				if (ua(a)) try {
					var b = xa(a.slice(37)), c = new Uint8Array(b.length);
					for (a = 0; a < b.length; ++a) c[a] = b.charCodeAt(a);
					var d = c;
				} catch (f) {
					throw Error("Converting base64 string to bytes failed.");
				}
				else d = void 0;
				var e = d;
				if (e) return e;
				throw "both async and sync fetching of the wasm failed";
			} catch (f) {
				x(f);
			}
		}
		function ya() {
			return w || "function" != typeof fetch ? Promise.resolve().then(function() {
				return wa();
			}) : fetch(H, { credentials: "same-origin" }).then(function(a) {
				if (!a.ok) throw "failed to load wasm binary file at '" + H + "'";
				return a.arrayBuffer();
			}).catch(function() {
				return wa();
			});
		}
		function za(a) {
			for (; 0 < a.length;) a.shift()(h);
		}
		function Aa(a) {
			if (void 0 === a) return "_unknown";
			a = a.replace(/[^a-zA-Z0-9_]/g, "$");
			var b = a.charCodeAt(0);
			return 48 <= b && 57 >= b ? "_" + a : a;
		}
		function Ba(a, b) {
			a = Aa(a);
			return function() {
				return b.apply(this, arguments);
			};
		}
		var J = [
			{},
			{ value: void 0 },
			{ value: null },
			{ value: !0 },
			{ value: !1 }
		], Ca = [];
		function Da(a) {
			var b = Error, c = Ba(a, function(d) {
				this.name = a;
				this.message = d;
				d = Error(d).stack;
				void 0 !== d && (this.stack = this.toString() + "\n" + d.replace(/^Error(:[^\n]*)?\n/, ""));
			});
			c.prototype = Object.create(b.prototype);
			c.prototype.constructor = c;
			c.prototype.toString = function() {
				return void 0 === this.message ? this.name : this.name + ": " + this.message;
			};
			return c;
		}
		var K = void 0;
		function L(a) {
			throw new K(a);
		}
		var M = (a) => {
			a || L("Cannot use deleted val. handle = " + a);
			return J[a].value;
		}, Ea = (a) => {
			switch (a) {
				case void 0: return 1;
				case null: return 2;
				case !0: return 3;
				case !1: return 4;
				default:
					var b = Ca.length ? Ca.pop() : J.length;
					J[b] = {
						ga: 1,
						value: a
					};
					return b;
			}
		}, Fa = void 0, Ga = void 0;
		function N(a) {
			for (var b = ""; A[a];) b += Ga[A[a++]];
			return b;
		}
		var O = [];
		function Ha() {
			for (; O.length;) {
				var a = O.pop();
				a.M.$ = !1;
				a["delete"]();
			}
		}
		var P = void 0, Q = {};
		function Ia(a, b) {
			for (void 0 === b && L("ptr should not be undefined"); a.R;) b = a.ba(b), a = a.R;
			return b;
		}
		var R = {};
		function Ja(a) {
			a = Ka(a);
			var b = N(a);
			S(a);
			return b;
		}
		function La(a, b) {
			var c = R[a];
			void 0 === c && L(b + " has unknown type " + Ja(a));
			return c;
		}
		function Ma() {}
		var Na = !1;
		function Oa(a) {
			--a.count.value;
			0 === a.count.value && (a.T ? a.U.W(a.T) : a.P.N.W(a.O));
		}
		function Pa(a, b, c) {
			if (b === c) return a;
			if (void 0 === c.R) return null;
			a = Pa(a, b, c.R);
			return null === a ? null : c.na(a);
		}
		var Qa = {};
		function Ra(a, b) {
			b = Ia(a, b);
			return Q[b];
		}
		var Sa = void 0;
		function Ta(a) {
			throw new Sa(a);
		}
		function Ua(a, b) {
			b.P && b.O || Ta("makeClassHandle requires ptr and ptrType");
			!!b.U !== !!b.T && Ta("Both smartPtrType and smartPtr must be specified");
			b.count = { value: 1 };
			return T(Object.create(a, { M: { value: b } }));
		}
		function T(a) {
			if ("undefined" === typeof FinalizationRegistry) return T = (b) => b, a;
			Na = new FinalizationRegistry((b) => {
				Oa(b.M);
			});
			T = (b) => {
				var c = b.M;
				c.T && Na.register(b, { M: c }, b);
				return b;
			};
			Ma = (b) => {
				Na.unregister(b);
			};
			return T(a);
		}
		var Va = {};
		function Wa(a) {
			for (; a.length;) {
				var b = a.pop();
				a.pop()(b);
			}
		}
		function Xa(a) {
			return this.fromWireType(D[a >> 2]);
		}
		var U = {}, Ya = {};
		function V(a, b, c) {
			function d(k) {
				k = c(k);
				k.length !== a.length && Ta("Mismatched type converter count");
				for (var m = 0; m < a.length; ++m) W(a[m], k[m]);
			}
			a.forEach(function(k) {
				Ya[k] = b;
			});
			var e = Array(b.length), f = [], g = 0;
			b.forEach((k, m) => {
				R.hasOwnProperty(k) ? e[m] = R[k] : (f.push(k), U.hasOwnProperty(k) || (U[k] = []), U[k].push(() => {
					e[m] = R[k];
					++g;
					g === f.length && d(e);
				}));
			});
			0 === f.length && d(e);
		}
		function Za(a) {
			switch (a) {
				case 1: return 0;
				case 2: return 1;
				case 4: return 2;
				case 8: return 3;
				default: throw new TypeError("Unknown type size: " + a);
			}
		}
		function W(a, b, c = {}) {
			if (!("argPackAdvance" in b)) throw new TypeError("registerType registeredInstance requires argPackAdvance");
			var d = b.name;
			a || L("type \"" + d + "\" must have a positive integer typeid pointer");
			if (R.hasOwnProperty(a)) {
				if (c.ua) return;
				L("Cannot register type '" + d + "' twice");
			}
			R[a] = b;
			delete Ya[a];
			U.hasOwnProperty(a) && (b = U[a], delete U[a], b.forEach((e) => e()));
		}
		function $a(a) {
			L(a.M.P.N.name + " instance already deleted");
		}
		function X() {}
		function ab(a, b, c) {
			if (void 0 === a[b].S) {
				var d = a[b];
				a[b] = function() {
					a[b].S.hasOwnProperty(arguments.length) || L("Function '" + c + "' called with an invalid number of arguments (" + arguments.length + ") - expects one of (" + a[b].S + ")!");
					return a[b].S[arguments.length].apply(this, arguments);
				};
				a[b].S = [];
				a[b].S[d.Z] = d;
			}
		}
		function bb(a, b) {
			h.hasOwnProperty(a) ? (L("Cannot register public name '" + a + "' twice"), ab(h, a, a), h.hasOwnProperty(void 0) && L("Cannot register multiple overloads of a function with the same number of arguments (undefined)!"), h[a].S[void 0] = b) : h[a] = b;
		}
		function cb(a, b, c, d, e, f, g, k) {
			this.name = a;
			this.constructor = b;
			this.X = c;
			this.W = d;
			this.R = e;
			this.pa = f;
			this.ba = g;
			this.na = k;
			this.ja = [];
		}
		function db(a, b, c) {
			for (; b !== c;) b.ba || L("Expected null or instance of " + c.name + ", got an instance of " + b.name), a = b.ba(a), b = b.R;
			return a;
		}
		function eb(a, b) {
			if (null === b) return this.ea && L("null is not a valid " + this.name), 0;
			b.M || L("Cannot pass \"" + fb(b) + "\" as a " + this.name);
			b.M.O || L("Cannot pass deleted object as a pointer of type " + this.name);
			return db(b.M.O, b.M.P.N, this.N);
		}
		function gb(a, b) {
			if (null === b) {
				this.ea && L("null is not a valid " + this.name);
				if (this.da) {
					var c = this.fa();
					null !== a && a.push(this.W, c);
					return c;
				}
				return 0;
			}
			b.M || L("Cannot pass \"" + fb(b) + "\" as a " + this.name);
			b.M.O || L("Cannot pass deleted object as a pointer of type " + this.name);
			!this.ca && b.M.P.ca && L("Cannot convert argument of type " + (b.M.U ? b.M.U.name : b.M.P.name) + " to parameter type " + this.name);
			c = db(b.M.O, b.M.P.N, this.N);
			if (this.da) switch (void 0 === b.M.T && L("Passing raw pointer to smart pointer is illegal"), this.Ba) {
				case 0:
					b.M.U === this ? c = b.M.T : L("Cannot convert argument of type " + (b.M.U ? b.M.U.name : b.M.P.name) + " to parameter type " + this.name);
					break;
				case 1:
					c = b.M.T;
					break;
				case 2:
					if (b.M.U === this) c = b.M.T;
					else {
						var d = b.clone();
						c = this.xa(c, Ea(function() {
							d["delete"]();
						}));
						null !== a && a.push(this.W, c);
					}
					break;
				default: L("Unsupporting sharing policy");
			}
			return c;
		}
		function hb(a, b) {
			if (null === b) return this.ea && L("null is not a valid " + this.name), 0;
			b.M || L("Cannot pass \"" + fb(b) + "\" as a " + this.name);
			b.M.O || L("Cannot pass deleted object as a pointer of type " + this.name);
			b.M.P.ca && L("Cannot convert argument of type " + b.M.P.name + " to parameter type " + this.name);
			return db(b.M.O, b.M.P.N, this.N);
		}
		function Y(a, b, c, d) {
			this.name = a;
			this.N = b;
			this.ea = c;
			this.ca = d;
			this.da = !1;
			this.W = this.xa = this.fa = this.ka = this.Ba = this.wa = void 0;
			void 0 !== b.R ? this.toWireType = gb : (this.toWireType = d ? eb : hb, this.V = null);
		}
		function ib(a, b) {
			h.hasOwnProperty(a) || Ta("Replacing nonexistant public symbol");
			h[a] = b;
			h[a].Z = void 0;
		}
		function jb(a, b) {
			var c = [];
			return function() {
				c.length = 0;
				Object.assign(c, arguments);
				if (a.includes("j")) {
					var d = h["dynCall_" + a];
					d = c && c.length ? d.apply(null, [b].concat(c)) : d.call(null, b);
				} else d = oa.get(b).apply(null, c);
				return d;
			};
		}
		function Z(a, b) {
			a = N(a);
			var c = a.includes("j") ? jb(a, b) : oa.get(b);
			"function" != typeof c && L("unknown function pointer with signature " + a + ": " + b);
			return c;
		}
		var mb = void 0;
		function nb(a, b) {
			function c(f) {
				e[f] || R[f] || (Ya[f] ? Ya[f].forEach(c) : (d.push(f), e[f] = !0));
			}
			var d = [], e = {};
			b.forEach(c);
			throw new mb(a + ": " + d.map(Ja).join([", "]));
		}
		function ob(a, b, c, d, e) {
			var f = b.length;
			2 > f && L("argTypes array size mismatch! Must at least get return value and 'this' types!");
			var g = null !== b[1] && null !== c, k = !1;
			for (c = 1; c < b.length; ++c) if (null !== b[c] && void 0 === b[c].V) {
				k = !0;
				break;
			}
			var m = "void" !== b[0].name, l = f - 2, n = Array(l), p = [], r = [];
			return function() {
				arguments.length !== l && L("function " + a + " called with " + arguments.length + " arguments, expected " + l + " args!");
				r.length = 0;
				p.length = g ? 2 : 1;
				p[0] = e;
				if (g) {
					var u = b[1].toWireType(r, this);
					p[1] = u;
				}
				for (var t = 0; t < l; ++t) n[t] = b[t + 2].toWireType(r, arguments[t]), p.push(n[t]);
				t = d.apply(null, p);
				if (k) Wa(r);
				else for (var y = g ? 1 : 2; y < b.length; y++) {
					var B = 1 === y ? u : n[y - 2];
					null !== b[y].V && b[y].V(B);
				}
				u = m ? b[0].fromWireType(t) : void 0;
				return u;
			};
		}
		function pb(a, b) {
			for (var c = [], d = 0; d < a; d++) c.push(E[b + 4 * d >> 2]);
			return c;
		}
		function qb(a) {
			4 < a && 0 === --J[a].ga && (J[a] = void 0, Ca.push(a));
		}
		function fb(a) {
			if (null === a) return "null";
			var b = typeof a;
			return "object" === b || "array" === b || "function" === b ? a.toString() : "" + a;
		}
		function rb(a, b) {
			switch (b) {
				case 2: return function(c) {
					return this.fromWireType(la[c >> 2]);
				};
				case 3: return function(c) {
					return this.fromWireType(ma[c >> 3]);
				};
				default: throw new TypeError("Unknown float type: " + a);
			}
		}
		function sb(a, b, c) {
			switch (b) {
				case 0: return c ? function(d) {
					return ja[d];
				} : function(d) {
					return A[d];
				};
				case 1: return c ? function(d) {
					return C[d >> 1];
				} : function(d) {
					return ka[d >> 1];
				};
				case 2: return c ? function(d) {
					return D[d >> 2];
				} : function(d) {
					return E[d >> 2];
				};
				default: throw new TypeError("Unknown integer type: " + a);
			}
		}
		function tb(a, b) {
			for (var c = "", d = 0; !(d >= b / 2); ++d) {
				var e = C[a + 2 * d >> 1];
				if (0 == e) break;
				c += String.fromCharCode(e);
			}
			return c;
		}
		function ub(a, b, c) {
			void 0 === c && (c = 2147483647);
			if (2 > c) return 0;
			c -= 2;
			var d = b;
			c = c < 2 * a.length ? c / 2 : a.length;
			for (var e = 0; e < c; ++e) C[b >> 1] = a.charCodeAt(e), b += 2;
			C[b >> 1] = 0;
			return b - d;
		}
		function vb(a) {
			return 2 * a.length;
		}
		function wb(a, b) {
			for (var c = 0, d = ""; !(c >= b / 4);) {
				var e = D[a + 4 * c >> 2];
				if (0 == e) break;
				++c;
				65536 <= e ? (e -= 65536, d += String.fromCharCode(55296 | e >> 10, 56320 | e & 1023)) : d += String.fromCharCode(e);
			}
			return d;
		}
		function xb(a, b, c) {
			void 0 === c && (c = 2147483647);
			if (4 > c) return 0;
			var d = b;
			c = d + c - 4;
			for (var e = 0; e < a.length; ++e) {
				var f = a.charCodeAt(e);
				if (55296 <= f && 57343 >= f) {
					var g = a.charCodeAt(++e);
					f = 65536 + ((f & 1023) << 10) | g & 1023;
				}
				D[b >> 2] = f;
				b += 4;
				if (b + 4 > c) break;
			}
			D[b >> 2] = 0;
			return b - d;
		}
		function yb(a) {
			for (var b = 0, c = 0; c < a.length; ++c) {
				var d = a.charCodeAt(c);
				55296 <= d && 57343 >= d && ++c;
				b += 4;
			}
			return b;
		}
		var zb = {};
		function Ab(a) {
			var b = zb[a];
			return void 0 === b ? N(a) : b;
		}
		var Bb = [];
		function Cb(a) {
			var b = Bb.length;
			Bb.push(a);
			return b;
		}
		function Db(a, b) {
			for (var c = Array(a), d = 0; d < a; ++d) c[d] = La(E[b + 4 * d >> 2], "parameter " + d);
			return c;
		}
		var Eb = [], Fb = [
			null,
			[],
			[]
		];
		K = h.BindingError = Da("BindingError");
		h.count_emval_handles = function() {
			for (var a = 0, b = 5; b < J.length; ++b) void 0 !== J[b] && ++a;
			return a;
		};
		h.get_first_emval = function() {
			for (var a = 5; a < J.length; ++a) if (void 0 !== J[a]) return J[a];
			return null;
		};
		Fa = h.PureVirtualError = Da("PureVirtualError");
		for (var Gb = Array(256), Hb = 0; 256 > Hb; ++Hb) Gb[Hb] = String.fromCharCode(Hb);
		Ga = Gb;
		h.getInheritedInstanceCount = function() {
			return Object.keys(Q).length;
		};
		h.getLiveInheritedInstances = function() {
			var a = [], b;
			for (b in Q) Q.hasOwnProperty(b) && a.push(Q[b]);
			return a;
		};
		h.flushPendingDeletes = Ha;
		h.setDelayFunction = function(a) {
			P = a;
			O.length && P && P(Ha);
		};
		Sa = h.InternalError = Da("InternalError");
		X.prototype.isAliasOf = function(a) {
			if (!(this instanceof X && a instanceof X)) return !1;
			var b = this.M.P.N, c = this.M.O, d = a.M.P.N;
			for (a = a.M.O; b.R;) c = b.ba(c), b = b.R;
			for (; d.R;) a = d.ba(a), d = d.R;
			return b === d && c === a;
		};
		X.prototype.clone = function() {
			this.M.O || $a(this);
			if (this.M.aa) return this.M.count.value += 1, this;
			var a = T, b = Object, c = b.create, d = Object.getPrototypeOf(this), e = this.M;
			a = a(c.call(b, d, { M: { value: {
				count: e.count,
				$: e.$,
				aa: e.aa,
				O: e.O,
				P: e.P,
				T: e.T,
				U: e.U
			} } }));
			a.M.count.value += 1;
			a.M.$ = !1;
			return a;
		};
		X.prototype["delete"] = function() {
			this.M.O || $a(this);
			this.M.$ && !this.M.aa && L("Object already scheduled for deletion");
			Ma(this);
			Oa(this.M);
			this.M.aa || (this.M.T = void 0, this.M.O = void 0);
		};
		X.prototype.isDeleted = function() {
			return !this.M.O;
		};
		X.prototype.deleteLater = function() {
			this.M.O || $a(this);
			this.M.$ && !this.M.aa && L("Object already scheduled for deletion");
			O.push(this);
			1 === O.length && P && P(Ha);
			this.M.$ = !0;
			return this;
		};
		Y.prototype.qa = function(a) {
			this.ka && (a = this.ka(a));
			return a;
		};
		Y.prototype.ha = function(a) {
			this.W && this.W(a);
		};
		Y.prototype.argPackAdvance = 8;
		Y.prototype.readValueFromPointer = Xa;
		Y.prototype.deleteObject = function(a) {
			if (null !== a) a["delete"]();
		};
		Y.prototype.fromWireType = function(a) {
			function b() {
				return this.da ? Ua(this.N.X, {
					P: this.wa,
					O: c,
					U: this,
					T: a
				}) : Ua(this.N.X, {
					P: this,
					O: a
				});
			}
			var c = this.qa(a);
			if (!c) return this.ha(a), null;
			var d = Ra(this.N, c);
			if (void 0 !== d) {
				if (0 === d.M.count.value) return d.M.O = c, d.M.T = a, d.clone();
				d = d.clone();
				this.ha(a);
				return d;
			}
			d = this.N.pa(c);
			d = Qa[d];
			if (!d) return b.call(this);
			d = this.ca ? d.la : d.pointerType;
			var e = Pa(c, this.N, d.N);
			return null === e ? b.call(this) : this.da ? Ua(d.N.X, {
				P: d,
				O: e,
				U: this,
				T: a
			}) : Ua(d.N.X, {
				P: d,
				O: e
			});
		};
		mb = h.UnboundTypeError = Da("UnboundTypeError");
		var xa = "function" == typeof atob ? atob : function(a) {
			var b = "", c = 0;
			a = a.replace(/[^A-Za-z0-9\+\/=]/g, "");
			do {
				var d = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(a.charAt(c++));
				var e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(a.charAt(c++));
				var f = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(a.charAt(c++));
				var g = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(a.charAt(c++));
				d = d << 2 | e >> 4;
				e = (e & 15) << 4 | f >> 2;
				var k = (f & 3) << 6 | g;
				b += String.fromCharCode(d);
				64 !== f && (b += String.fromCharCode(e));
				64 !== g && (b += String.fromCharCode(k));
			} while (c < a.length);
			return b;
		}, Jb = {
			l: function(a, b, c, d) {
				x("Assertion failed: " + (a ? z(A, a) : "") + ", at: " + [
					b ? b ? z(A, b) : "" : "unknown filename",
					c,
					d ? d ? z(A, d) : "" : "unknown function"
				]);
			},
			q: function(a, b, c) {
				a = N(a);
				b = La(b, "wrapper");
				c = M(c);
				var d = [].slice, e = b.N, f = e.X, g = e.R.X, k = e.R.constructor;
				a = Ba(a, function() {
					e.R.ja.forEach(function(l) {
						if (this[l] === g[l]) throw new Fa("Pure virtual function " + l + " must be implemented in JavaScript");
					}.bind(this));
					Object.defineProperty(this, "__parent", { value: f });
					this.__construct.apply(this, d.call(arguments));
				});
				f.__construct = function() {
					this === f && L("Pass correct 'this' to __construct");
					var l = k.implement.apply(void 0, [this].concat(d.call(arguments)));
					Ma(l);
					var n = l.M;
					l.notifyOnDestruction();
					n.aa = !0;
					Object.defineProperties(this, { M: { value: n } });
					T(this);
					l = n.O;
					l = Ia(e, l);
					Q.hasOwnProperty(l) ? L("Tried to register registered instance: " + l) : Q[l] = this;
				};
				f.__destruct = function() {
					this === f && L("Pass correct 'this' to __destruct");
					Ma(this);
					var l = this.M.O;
					l = Ia(e, l);
					Q.hasOwnProperty(l) ? delete Q[l] : L("Tried to unregister unregistered instance: " + l);
				};
				a.prototype = Object.create(f);
				for (var m in c) a.prototype[m] = c[m];
				return Ea(a);
			},
			j: function(a) {
				var b = Va[a];
				delete Va[a];
				var c = b.fa, d = b.W, e = b.ia, f = e.map((g) => g.ta).concat(e.map((g) => g.za));
				V([a], f, (g) => {
					var k = {};
					e.forEach((m, l) => {
						var n = g[l], p = m.ra, r = m.sa, u = g[l + e.length], t = m.ya, y = m.Aa;
						k[m.oa] = {
							read: (B) => n.fromWireType(p(r, B)),
							write: (B, ba) => {
								var I = [];
								t(y, B, u.toWireType(I, ba));
								Wa(I);
							}
						};
					});
					return [{
						name: b.name,
						fromWireType: function(m) {
							var l = {}, n;
							for (n in k) l[n] = k[n].read(m);
							d(m);
							return l;
						},
						toWireType: function(m, l) {
							for (var n in k) if (!(n in l)) throw new TypeError("Missing field:  \"" + n + "\"");
							var p = c();
							for (n in k) k[n].write(p, l[n]);
							null !== m && m.push(d, p);
							return p;
						},
						argPackAdvance: 8,
						readValueFromPointer: Xa,
						V: d
					}];
				});
			},
			v: function() {},
			B: function(a, b, c, d, e) {
				var f = Za(c);
				b = N(b);
				W(a, {
					name: b,
					fromWireType: function(g) {
						return !!g;
					},
					toWireType: function(g, k) {
						return k ? d : e;
					},
					argPackAdvance: 8,
					readValueFromPointer: function(g) {
						if (1 === c) var k = ja;
						else if (2 === c) k = C;
						else if (4 === c) k = D;
						else throw new TypeError("Unknown boolean type size: " + b);
						return this.fromWireType(k[g >> f]);
					},
					V: null
				});
			},
			f: function(a, b, c, d, e, f, g, k, m, l, n, p, r) {
				n = N(n);
				f = Z(e, f);
				k && (k = Z(g, k));
				l && (l = Z(m, l));
				r = Z(p, r);
				var u = Aa(n);
				bb(u, function() {
					nb("Cannot construct " + n + " due to unbound types", [d]);
				});
				V([
					a,
					b,
					c
				], d ? [d] : [], function(t) {
					t = t[0];
					if (d) {
						var y = t.N;
						var B = y.X;
					} else B = X.prototype;
					t = Ba(u, function() {
						if (Object.getPrototypeOf(this) !== ba) throw new K("Use 'new' to construct " + n);
						if (void 0 === I.Y) throw new K(n + " has no accessible constructor");
						var kb = I.Y[arguments.length];
						if (void 0 === kb) throw new K("Tried to invoke ctor of " + n + " with invalid number of parameters (" + arguments.length + ") - expected (" + Object.keys(I.Y).toString() + ") parameters instead!");
						return kb.apply(this, arguments);
					});
					var ba = Object.create(B, { constructor: { value: t } });
					t.prototype = ba;
					var I = new cb(n, t, ba, r, y, f, k, l);
					y = new Y(n, I, !0, !1);
					B = new Y(n + "*", I, !1, !1);
					var lb = new Y(n + " const*", I, !1, !0);
					Qa[a] = {
						pointerType: B,
						la: lb
					};
					ib(u, t);
					return [
						y,
						B,
						lb
					];
				});
			},
			d: function(a, b, c, d, e, f, g) {
				var k = pb(c, d);
				b = N(b);
				f = Z(e, f);
				V([], [a], function(m) {
					function l() {
						nb("Cannot call " + n + " due to unbound types", k);
					}
					m = m[0];
					var n = m.name + "." + b;
					b.startsWith("@@") && (b = Symbol[b.substring(2)]);
					var p = m.N.constructor;
					void 0 === p[b] ? (l.Z = c - 1, p[b] = l) : (ab(p, b, n), p[b].S[c - 1] = l);
					V([], k, function(r) {
						r = ob(n, [r[0], null].concat(r.slice(1)), null, f, g);
						void 0 === p[b].S ? (r.Z = c - 1, p[b] = r) : p[b].S[c - 1] = r;
						return [];
					});
					return [];
				});
			},
			p: function(a, b, c, d, e, f) {
				0 < b || x();
				var g = pb(b, c);
				e = Z(d, e);
				V([], [a], function(k) {
					k = k[0];
					var m = "constructor " + k.name;
					void 0 === k.N.Y && (k.N.Y = []);
					if (void 0 !== k.N.Y[b - 1]) throw new K("Cannot register multiple constructors with identical number of parameters (" + (b - 1) + ") for class '" + k.name + "'! Overload resolution is currently only performed using the parameter count, not actual type info!");
					k.N.Y[b - 1] = () => {
						nb("Cannot construct " + k.name + " due to unbound types", g);
					};
					V([], g, function(l) {
						l.splice(1, 0, null);
						k.N.Y[b - 1] = ob(m, l, null, e, f);
						return [];
					});
					return [];
				});
			},
			a: function(a, b, c, d, e, f, g, k) {
				var m = pb(c, d);
				b = N(b);
				f = Z(e, f);
				V([], [a], function(l) {
					function n() {
						nb("Cannot call " + p + " due to unbound types", m);
					}
					l = l[0];
					var p = l.name + "." + b;
					b.startsWith("@@") && (b = Symbol[b.substring(2)]);
					k && l.N.ja.push(b);
					var r = l.N.X, u = r[b];
					void 0 === u || void 0 === u.S && u.className !== l.name && u.Z === c - 2 ? (n.Z = c - 2, n.className = l.name, r[b] = n) : (ab(r, b, p), r[b].S[c - 2] = n);
					V([], m, function(t) {
						t = ob(p, t, l, f, g);
						void 0 === r[b].S ? (t.Z = c - 2, r[b] = t) : r[b].S[c - 2] = t;
						return [];
					});
					return [];
				});
			},
			A: function(a, b) {
				b = N(b);
				W(a, {
					name: b,
					fromWireType: function(c) {
						var d = M(c);
						qb(c);
						return d;
					},
					toWireType: function(c, d) {
						return Ea(d);
					},
					argPackAdvance: 8,
					readValueFromPointer: Xa,
					V: null
				});
			},
			n: function(a, b, c) {
				c = Za(c);
				b = N(b);
				W(a, {
					name: b,
					fromWireType: function(d) {
						return d;
					},
					toWireType: function(d, e) {
						return e;
					},
					argPackAdvance: 8,
					readValueFromPointer: rb(b, c),
					V: null
				});
			},
			e: function(a, b, c, d, e) {
				b = N(b);
				-1 === e && (e = 4294967295);
				e = Za(c);
				var f = (k) => k;
				if (0 === d) {
					var g = 32 - 8 * c;
					f = (k) => k << g >>> g;
				}
				c = b.includes("unsigned") ? function(k, m) {
					return m >>> 0;
				} : function(k, m) {
					return m;
				};
				W(a, {
					name: b,
					fromWireType: f,
					toWireType: c,
					argPackAdvance: 8,
					readValueFromPointer: sb(b, e, 0 !== d),
					V: null
				});
			},
			b: function(a, b, c) {
				function d(f) {
					f >>= 2;
					var g = E;
					return new e(ia, g[f + 1], g[f]);
				}
				var e = [
					Int8Array,
					Uint8Array,
					Int16Array,
					Uint16Array,
					Int32Array,
					Uint32Array,
					Float32Array,
					Float64Array
				][b];
				c = N(c);
				W(a, {
					name: c,
					fromWireType: d,
					argPackAdvance: 8,
					readValueFromPointer: d
				}, { ua: !0 });
			},
			o: function(a, b) {
				b = N(b);
				var c = "std::string" === b;
				W(a, {
					name: b,
					fromWireType: function(d) {
						var e = E[d >> 2], f = d + 4;
						if (c) for (var g = f, k = 0; k <= e; ++k) {
							var m = f + k;
							if (k == e || 0 == A[m]) {
								g = g ? z(A, g, m - g) : "";
								if (void 0 === l) var l = g;
								else l += String.fromCharCode(0), l += g;
								g = m + 1;
							}
						}
						else {
							l = Array(e);
							for (k = 0; k < e; ++k) l[k] = String.fromCharCode(A[f + k]);
							l = l.join("");
						}
						S(d);
						return l;
					},
					toWireType: function(d, e) {
						e instanceof ArrayBuffer && (e = new Uint8Array(e));
						var f, g = "string" == typeof e;
						g || e instanceof Uint8Array || e instanceof Uint8ClampedArray || e instanceof Int8Array || L("Cannot pass non-string to std::string");
						if (c && g) {
							var k = 0;
							for (f = 0; f < e.length; ++f) {
								var m = e.charCodeAt(f);
								127 >= m ? k++ : 2047 >= m ? k += 2 : 55296 <= m && 57343 >= m ? (k += 4, ++f) : k += 3;
							}
							f = k;
						} else f = e.length;
						k = Ib(4 + f + 1);
						m = k + 4;
						E[k >> 2] = f;
						if (c && g) {
							if (g = m, m = f + 1, f = A, 0 < m) {
								m = g + m - 1;
								for (var l = 0; l < e.length; ++l) {
									var n = e.charCodeAt(l);
									if (55296 <= n && 57343 >= n) {
										var p = e.charCodeAt(++l);
										n = 65536 + ((n & 1023) << 10) | p & 1023;
									}
									if (127 >= n) {
										if (g >= m) break;
										f[g++] = n;
									} else {
										if (2047 >= n) {
											if (g + 1 >= m) break;
											f[g++] = 192 | n >> 6;
										} else {
											if (65535 >= n) {
												if (g + 2 >= m) break;
												f[g++] = 224 | n >> 12;
											} else {
												if (g + 3 >= m) break;
												f[g++] = 240 | n >> 18;
												f[g++] = 128 | n >> 12 & 63;
											}
											f[g++] = 128 | n >> 6 & 63;
										}
										f[g++] = 128 | n & 63;
									}
								}
								f[g] = 0;
							}
						} else if (g) for (g = 0; g < f; ++g) l = e.charCodeAt(g), 255 < l && (S(m), L("String has UTF-16 code units that do not fit in 8 bits")), A[m + g] = l;
						else for (g = 0; g < f; ++g) A[m + g] = e[g];
						null !== d && d.push(S, k);
						return k;
					},
					argPackAdvance: 8,
					readValueFromPointer: Xa,
					V: function(d) {
						S(d);
					}
				});
			},
			i: function(a, b, c) {
				c = N(c);
				if (2 === b) {
					var d = tb;
					var e = ub;
					var f = vb;
					var g = () => ka;
					var k = 1;
				} else 4 === b && (d = wb, e = xb, f = yb, g = () => E, k = 2);
				W(a, {
					name: c,
					fromWireType: function(m) {
						for (var l = E[m >> 2], n = g(), p, r = m + 4, u = 0; u <= l; ++u) {
							var t = m + 4 + u * b;
							if (u == l || 0 == n[t >> k]) r = d(r, t - r), void 0 === p ? p = r : (p += String.fromCharCode(0), p += r), r = t + b;
						}
						S(m);
						return p;
					},
					toWireType: function(m, l) {
						"string" != typeof l && L("Cannot pass non-string to C++ string type " + c);
						var n = f(l), p = Ib(4 + n + b);
						E[p >> 2] = n >> k;
						e(l, p + 4, n + b);
						null !== m && m.push(S, p);
						return p;
					},
					argPackAdvance: 8,
					readValueFromPointer: Xa,
					V: function(m) {
						S(m);
					}
				});
			},
			k: function(a, b, c, d, e, f) {
				Va[a] = {
					name: N(b),
					fa: Z(c, d),
					W: Z(e, f),
					ia: []
				};
			},
			h: function(a, b, c, d, e, f, g, k, m, l) {
				Va[a].ia.push({
					oa: N(b),
					ta: c,
					ra: Z(d, e),
					sa: f,
					za: g,
					ya: Z(k, m),
					Aa: l
				});
			},
			C: function(a, b) {
				b = N(b);
				W(a, {
					va: !0,
					name: b,
					argPackAdvance: 0,
					fromWireType: function() {},
					toWireType: function() {}
				});
			},
			s: function(a, b, c, d, e) {
				a = Bb[a];
				b = M(b);
				c = Ab(c);
				var f = [];
				E[d >> 2] = Ea(f);
				return a(b, c, f, e);
			},
			t: function(a, b, c, d) {
				a = Bb[a];
				b = M(b);
				c = Ab(c);
				a(b, c, null, d);
			},
			g: qb,
			m: function(a, b) {
				var c = Db(a, b), d = c[0];
				b = d.name + "_$" + c.slice(1).map(function(g) {
					return g.name;
				}).join("_") + "$";
				var e = Eb[b];
				if (void 0 !== e) return e;
				var f = Array(a - 1);
				e = Cb((g, k, m, l) => {
					for (var n = 0, p = 0; p < a - 1; ++p) f[p] = c[p + 1].readValueFromPointer(l + n), n += c[p + 1].argPackAdvance;
					g = g[k].apply(g, f);
					for (p = 0; p < a - 1; ++p) c[p + 1].ma && c[p + 1].ma(f[p]);
					if (!d.va) return d.toWireType(m, g);
				});
				return Eb[b] = e;
			},
			D: function(a) {
				4 < a && (J[a].ga += 1);
			},
			r: function(a) {
				Wa(M(a));
				qb(a);
			},
			c: function() {
				x("");
			},
			x: function(a, b, c) {
				A.copyWithin(a, b, b + c);
			},
			w: function(a) {
				var b = A.length;
				a >>>= 0;
				if (2147483648 < a) return !1;
				for (var c = 1; 4 >= c; c *= 2) {
					var d = b * (1 + .2 / c);
					d = Math.min(d, a + 100663296);
					var e = Math;
					d = Math.max(a, d);
					e = e.min.call(e, 2147483648, d + (65536 - d % 65536) % 65536);
					a: {
						try {
							fa.grow(e - ia.byteLength + 65535 >>> 16);
							na();
							var f = 1;
							break a;
						} catch (g) {}
						f = void 0;
					}
					if (f) return !0;
				}
				return !1;
			},
			z: function() {
				return 52;
			},
			u: function() {
				return 70;
			},
			y: function(a, b, c, d) {
				for (var e = 0, f = 0; f < c; f++) {
					var g = E[b >> 2], k = E[b + 4 >> 2];
					b += 8;
					for (var m = 0; m < k; m++) {
						var l = A[g + m], n = Fb[a];
						0 === l || 10 === l ? ((1 === a ? ea : v)(z(n, 0)), n.length = 0) : n.push(l);
					}
					e += k;
				}
				E[d >> 2] = e;
				return 0;
			}
		};
		(function() {
			function a(e) {
				h.asm = e.exports;
				fa = h.asm.E;
				na();
				oa = h.asm.J;
				qa.unshift(h.asm.F);
				F--;
				h.monitorRunDependencies && h.monitorRunDependencies(F);
				0 == F && (null !== ta && (clearInterval(ta), ta = null), G && (e = G, G = null, e()));
			}
			function b(e) {
				a(e.instance);
			}
			function c(e) {
				return ya().then(function(f) {
					return WebAssembly.instantiate(f, d);
				}).then(function(f) {
					return f;
				}).then(e, function(f) {
					v("failed to asynchronously prepare wasm: " + f);
					x(f);
				});
			}
			var d = { a: Jb };
			F++;
			h.monitorRunDependencies && h.monitorRunDependencies(F);
			if (h.instantiateWasm) try {
				return h.instantiateWasm(d, a);
			} catch (e) {
				v("Module.instantiateWasm callback failed with error: " + e), ca(e);
			}
			(function() {
				return w || "function" != typeof WebAssembly.instantiateStreaming || ua(H) || "function" != typeof fetch ? c(b) : fetch(H, { credentials: "same-origin" }).then(function(e) {
					return WebAssembly.instantiateStreaming(e, d).then(b, function(f) {
						v("wasm streaming compile failed: " + f);
						v("falling back to ArrayBuffer instantiation");
						return c(b);
					});
				});
			})().catch(ca);
			return {};
		})();
		h.___wasm_call_ctors = function() {
			return (h.___wasm_call_ctors = h.asm.F).apply(null, arguments);
		};
		var Ka = h.___getTypeName = function() {
			return (Ka = h.___getTypeName = h.asm.G).apply(null, arguments);
		};
		h.__embind_initialize_bindings = function() {
			return (h.__embind_initialize_bindings = h.asm.H).apply(null, arguments);
		};
		var Ib = h._malloc = function() {
			return (Ib = h._malloc = h.asm.I).apply(null, arguments);
		}, S = h._free = function() {
			return (S = h._free = h.asm.K).apply(null, arguments);
		};
		h.dynCall_jiji = function() {
			return (h.dynCall_jiji = h.asm.L).apply(null, arguments);
		};
		var Kb;
		G = function Lb() {
			Kb || Mb();
			Kb || (G = Lb);
		};
		function Mb() {
			function a() {
				if (!Kb && (Kb = !0, h.calledRun = !0, !ha)) {
					za(qa);
					aa(h);
					if (h.onRuntimeInitialized) h.onRuntimeInitialized();
					if (h.postRun) for ("function" == typeof h.postRun && (h.postRun = [h.postRun]); h.postRun.length;) {
						var b = h.postRun.shift();
						ra.unshift(b);
					}
					za(ra);
				}
			}
			if (!(0 < F)) {
				if (h.preRun) for ("function" == typeof h.preRun && (h.preRun = [h.preRun]); h.preRun.length;) sa();
				za(pa);
				0 < F || (h.setStatus ? (h.setStatus("Running..."), setTimeout(function() {
					setTimeout(function() {
						h.setStatus("");
					}, 1);
					a();
				}, 1)) : a());
			}
		}
		if (h.preInit) for ("function" == typeof h.preInit && (h.preInit = [h.preInit]); 0 < h.preInit.length;) h.preInit.pop()();
		Mb();
		return loadYoga.ready;
	});
})();
//#endregion
//#region node_modules/yoga-layout/dist/src/generated/YGEnums.js
/**
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var Align = /*#__PURE__*/ function(Align) {
	Align[Align["Auto"] = 0] = "Auto";
	Align[Align["FlexStart"] = 1] = "FlexStart";
	Align[Align["Center"] = 2] = "Center";
	Align[Align["FlexEnd"] = 3] = "FlexEnd";
	Align[Align["Stretch"] = 4] = "Stretch";
	Align[Align["Baseline"] = 5] = "Baseline";
	Align[Align["SpaceBetween"] = 6] = "SpaceBetween";
	Align[Align["SpaceAround"] = 7] = "SpaceAround";
	Align[Align["SpaceEvenly"] = 8] = "SpaceEvenly";
	return Align;
}({});
var BoxSizing = /*#__PURE__*/ function(BoxSizing) {
	BoxSizing[BoxSizing["BorderBox"] = 0] = "BorderBox";
	BoxSizing[BoxSizing["ContentBox"] = 1] = "ContentBox";
	return BoxSizing;
}({});
var Dimension = /*#__PURE__*/ function(Dimension) {
	Dimension[Dimension["Width"] = 0] = "Width";
	Dimension[Dimension["Height"] = 1] = "Height";
	return Dimension;
}({});
var Direction = /*#__PURE__*/ function(Direction) {
	Direction[Direction["Inherit"] = 0] = "Inherit";
	Direction[Direction["LTR"] = 1] = "LTR";
	Direction[Direction["RTL"] = 2] = "RTL";
	return Direction;
}({});
var Display = /*#__PURE__*/ function(Display) {
	Display[Display["Flex"] = 0] = "Flex";
	Display[Display["None"] = 1] = "None";
	Display[Display["Contents"] = 2] = "Contents";
	return Display;
}({});
var Edge = /*#__PURE__*/ function(Edge) {
	Edge[Edge["Left"] = 0] = "Left";
	Edge[Edge["Top"] = 1] = "Top";
	Edge[Edge["Right"] = 2] = "Right";
	Edge[Edge["Bottom"] = 3] = "Bottom";
	Edge[Edge["Start"] = 4] = "Start";
	Edge[Edge["End"] = 5] = "End";
	Edge[Edge["Horizontal"] = 6] = "Horizontal";
	Edge[Edge["Vertical"] = 7] = "Vertical";
	Edge[Edge["All"] = 8] = "All";
	return Edge;
}({});
var Errata = /*#__PURE__*/ function(Errata) {
	Errata[Errata["None"] = 0] = "None";
	Errata[Errata["StretchFlexBasis"] = 1] = "StretchFlexBasis";
	Errata[Errata["AbsolutePositionWithoutInsetsExcludesPadding"] = 2] = "AbsolutePositionWithoutInsetsExcludesPadding";
	Errata[Errata["AbsolutePercentAgainstInnerSize"] = 4] = "AbsolutePercentAgainstInnerSize";
	Errata[Errata["All"] = 2147483647] = "All";
	Errata[Errata["Classic"] = 2147483646] = "Classic";
	return Errata;
}({});
var ExperimentalFeature = /*#__PURE__*/ function(ExperimentalFeature) {
	ExperimentalFeature[ExperimentalFeature["WebFlexBasis"] = 0] = "WebFlexBasis";
	return ExperimentalFeature;
}({});
var FlexDirection = /*#__PURE__*/ function(FlexDirection) {
	FlexDirection[FlexDirection["Column"] = 0] = "Column";
	FlexDirection[FlexDirection["ColumnReverse"] = 1] = "ColumnReverse";
	FlexDirection[FlexDirection["Row"] = 2] = "Row";
	FlexDirection[FlexDirection["RowReverse"] = 3] = "RowReverse";
	return FlexDirection;
}({});
var Gutter = /*#__PURE__*/ function(Gutter) {
	Gutter[Gutter["Column"] = 0] = "Column";
	Gutter[Gutter["Row"] = 1] = "Row";
	Gutter[Gutter["All"] = 2] = "All";
	return Gutter;
}({});
var Justify = /*#__PURE__*/ function(Justify) {
	Justify[Justify["FlexStart"] = 0] = "FlexStart";
	Justify[Justify["Center"] = 1] = "Center";
	Justify[Justify["FlexEnd"] = 2] = "FlexEnd";
	Justify[Justify["SpaceBetween"] = 3] = "SpaceBetween";
	Justify[Justify["SpaceAround"] = 4] = "SpaceAround";
	Justify[Justify["SpaceEvenly"] = 5] = "SpaceEvenly";
	return Justify;
}({});
var LogLevel = /*#__PURE__*/ function(LogLevel) {
	LogLevel[LogLevel["Error"] = 0] = "Error";
	LogLevel[LogLevel["Warn"] = 1] = "Warn";
	LogLevel[LogLevel["Info"] = 2] = "Info";
	LogLevel[LogLevel["Debug"] = 3] = "Debug";
	LogLevel[LogLevel["Verbose"] = 4] = "Verbose";
	LogLevel[LogLevel["Fatal"] = 5] = "Fatal";
	return LogLevel;
}({});
var MeasureMode = /*#__PURE__*/ function(MeasureMode) {
	MeasureMode[MeasureMode["Undefined"] = 0] = "Undefined";
	MeasureMode[MeasureMode["Exactly"] = 1] = "Exactly";
	MeasureMode[MeasureMode["AtMost"] = 2] = "AtMost";
	return MeasureMode;
}({});
var NodeType = /*#__PURE__*/ function(NodeType) {
	NodeType[NodeType["Default"] = 0] = "Default";
	NodeType[NodeType["Text"] = 1] = "Text";
	return NodeType;
}({});
var Overflow = /*#__PURE__*/ function(Overflow) {
	Overflow[Overflow["Visible"] = 0] = "Visible";
	Overflow[Overflow["Hidden"] = 1] = "Hidden";
	Overflow[Overflow["Scroll"] = 2] = "Scroll";
	return Overflow;
}({});
var PositionType = /*#__PURE__*/ function(PositionType) {
	PositionType[PositionType["Static"] = 0] = "Static";
	PositionType[PositionType["Relative"] = 1] = "Relative";
	PositionType[PositionType["Absolute"] = 2] = "Absolute";
	return PositionType;
}({});
var Unit = /*#__PURE__*/ function(Unit) {
	Unit[Unit["Undefined"] = 0] = "Undefined";
	Unit[Unit["Point"] = 1] = "Point";
	Unit[Unit["Percent"] = 2] = "Percent";
	Unit[Unit["Auto"] = 3] = "Auto";
	return Unit;
}({});
var Wrap = /*#__PURE__*/ function(Wrap) {
	Wrap[Wrap["NoWrap"] = 0] = "NoWrap";
	Wrap[Wrap["Wrap"] = 1] = "Wrap";
	Wrap[Wrap["WrapReverse"] = 2] = "WrapReverse";
	return Wrap;
}({});
var constants = {
	ALIGN_AUTO: Align.Auto,
	ALIGN_FLEX_START: Align.FlexStart,
	ALIGN_CENTER: Align.Center,
	ALIGN_FLEX_END: Align.FlexEnd,
	ALIGN_STRETCH: Align.Stretch,
	ALIGN_BASELINE: Align.Baseline,
	ALIGN_SPACE_BETWEEN: Align.SpaceBetween,
	ALIGN_SPACE_AROUND: Align.SpaceAround,
	ALIGN_SPACE_EVENLY: Align.SpaceEvenly,
	BOX_SIZING_BORDER_BOX: BoxSizing.BorderBox,
	BOX_SIZING_CONTENT_BOX: BoxSizing.ContentBox,
	DIMENSION_WIDTH: Dimension.Width,
	DIMENSION_HEIGHT: Dimension.Height,
	DIRECTION_INHERIT: Direction.Inherit,
	DIRECTION_LTR: Direction.LTR,
	DIRECTION_RTL: Direction.RTL,
	DISPLAY_FLEX: Display.Flex,
	DISPLAY_NONE: Display.None,
	DISPLAY_CONTENTS: Display.Contents,
	EDGE_LEFT: Edge.Left,
	EDGE_TOP: Edge.Top,
	EDGE_RIGHT: Edge.Right,
	EDGE_BOTTOM: Edge.Bottom,
	EDGE_START: Edge.Start,
	EDGE_END: Edge.End,
	EDGE_HORIZONTAL: Edge.Horizontal,
	EDGE_VERTICAL: Edge.Vertical,
	EDGE_ALL: Edge.All,
	ERRATA_NONE: Errata.None,
	ERRATA_STRETCH_FLEX_BASIS: Errata.StretchFlexBasis,
	ERRATA_ABSOLUTE_POSITION_WITHOUT_INSETS_EXCLUDES_PADDING: Errata.AbsolutePositionWithoutInsetsExcludesPadding,
	ERRATA_ABSOLUTE_PERCENT_AGAINST_INNER_SIZE: Errata.AbsolutePercentAgainstInnerSize,
	ERRATA_ALL: Errata.All,
	ERRATA_CLASSIC: Errata.Classic,
	EXPERIMENTAL_FEATURE_WEB_FLEX_BASIS: ExperimentalFeature.WebFlexBasis,
	FLEX_DIRECTION_COLUMN: FlexDirection.Column,
	FLEX_DIRECTION_COLUMN_REVERSE: FlexDirection.ColumnReverse,
	FLEX_DIRECTION_ROW: FlexDirection.Row,
	FLEX_DIRECTION_ROW_REVERSE: FlexDirection.RowReverse,
	GUTTER_COLUMN: Gutter.Column,
	GUTTER_ROW: Gutter.Row,
	GUTTER_ALL: Gutter.All,
	JUSTIFY_FLEX_START: Justify.FlexStart,
	JUSTIFY_CENTER: Justify.Center,
	JUSTIFY_FLEX_END: Justify.FlexEnd,
	JUSTIFY_SPACE_BETWEEN: Justify.SpaceBetween,
	JUSTIFY_SPACE_AROUND: Justify.SpaceAround,
	JUSTIFY_SPACE_EVENLY: Justify.SpaceEvenly,
	LOG_LEVEL_ERROR: LogLevel.Error,
	LOG_LEVEL_WARN: LogLevel.Warn,
	LOG_LEVEL_INFO: LogLevel.Info,
	LOG_LEVEL_DEBUG: LogLevel.Debug,
	LOG_LEVEL_VERBOSE: LogLevel.Verbose,
	LOG_LEVEL_FATAL: LogLevel.Fatal,
	MEASURE_MODE_UNDEFINED: MeasureMode.Undefined,
	MEASURE_MODE_EXACTLY: MeasureMode.Exactly,
	MEASURE_MODE_AT_MOST: MeasureMode.AtMost,
	NODE_TYPE_DEFAULT: NodeType.Default,
	NODE_TYPE_TEXT: NodeType.Text,
	OVERFLOW_VISIBLE: Overflow.Visible,
	OVERFLOW_HIDDEN: Overflow.Hidden,
	OVERFLOW_SCROLL: Overflow.Scroll,
	POSITION_TYPE_STATIC: PositionType.Static,
	POSITION_TYPE_RELATIVE: PositionType.Relative,
	POSITION_TYPE_ABSOLUTE: PositionType.Absolute,
	UNIT_UNDEFINED: Unit.Undefined,
	UNIT_POINT: Unit.Point,
	UNIT_PERCENT: Unit.Percent,
	UNIT_AUTO: Unit.Auto,
	WRAP_NO_WRAP: Wrap.NoWrap,
	WRAP_WRAP: Wrap.Wrap,
	WRAP_WRAP_REVERSE: Wrap.WrapReverse
};
//#endregion
//#region node_modules/yoga-layout/dist/src/wrapAssembly.js
/**
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*
* @format
*/
function wrapAssembly(lib) {
	function patch(prototype, name, fn) {
		const original = prototype[name];
		prototype[name] = function() {
			for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
			return fn.call(this, original, ...args);
		};
	}
	for (const fnName of [
		"setPosition",
		"setMargin",
		"setFlexBasis",
		"setWidth",
		"setHeight",
		"setMinWidth",
		"setMinHeight",
		"setMaxWidth",
		"setMaxHeight",
		"setPadding",
		"setGap"
	]) {
		const methods = {
			[Unit.Point]: lib.Node.prototype[fnName],
			[Unit.Percent]: lib.Node.prototype[`${fnName}Percent`],
			[Unit.Auto]: lib.Node.prototype[`${fnName}Auto`]
		};
		patch(lib.Node.prototype, fnName, function(original) {
			for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) args[_key2 - 1] = arguments[_key2];
			const value = args.pop();
			let unit, asNumber;
			if (value === "auto") {
				unit = Unit.Auto;
				asNumber = void 0;
			} else if (typeof value === "object") {
				unit = value.unit;
				asNumber = value.valueOf();
			} else {
				unit = typeof value === "string" && value.endsWith("%") ? Unit.Percent : Unit.Point;
				asNumber = parseFloat(value);
				if (value !== void 0 && !Number.isNaN(value) && Number.isNaN(asNumber)) throw new Error(`Invalid value ${value} for ${fnName}`);
			}
			if (!methods[unit]) throw new Error(`Failed to execute "${fnName}": Unsupported unit '${value}'`);
			if (asNumber !== void 0) return methods[unit].call(this, ...args, asNumber);
			else return methods[unit].call(this, ...args);
		});
	}
	function wrapMeasureFunction(measureFunction) {
		return lib.MeasureCallback.implement({ measure: function() {
			const { width, height } = measureFunction(...arguments);
			return {
				width: width ?? NaN,
				height: height ?? NaN
			};
		} });
	}
	patch(lib.Node.prototype, "setMeasureFunc", function(original, measureFunc) {
		if (measureFunc) return original.call(this, wrapMeasureFunction(measureFunc));
		else return this.unsetMeasureFunc();
	});
	function wrapDirtiedFunc(dirtiedFunction) {
		return lib.DirtiedCallback.implement({ dirtied: dirtiedFunction });
	}
	patch(lib.Node.prototype, "setDirtiedFunc", function(original, dirtiedFunc) {
		original.call(this, wrapDirtiedFunc(dirtiedFunc));
	});
	patch(lib.Config.prototype, "free", function() {
		lib.Config.destroy(this);
	});
	patch(lib.Node, "create", (_, config) => {
		return config ? lib.Node.createWithConfig(config) : lib.Node.createDefault();
	});
	patch(lib.Node.prototype, "free", function() {
		lib.Node.destroy(this);
	});
	patch(lib.Node.prototype, "freeRecursive", function() {
		for (let t = 0, T = this.getChildCount(); t < T; ++t) this.getChild(0).freeRecursive();
		this.free();
	});
	patch(lib.Node.prototype, "calculateLayout", function(original) {
		let width = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : NaN;
		let height = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : NaN;
		let direction = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : Direction.LTR;
		return original.call(this, width, height, direction);
	});
	return {
		Config: lib.Config,
		Node: lib.Node,
		...constants
	};
}
//#endregion
//#region node_modules/yoga-layout/dist/src/load.js
/**
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*
* @format
*/
async function loadYoga$1() {
	return wrapAssembly(await loadYoga$2());
}
//#endregion
//#region node_modules/emoji-regex-xs/index.mjs
var r = String.raw;
var seq = r`(?:\p{Emoji}\uFE0F\u20E3?|\p{Emoji_Modifier_Base}\p{Emoji_Modifier}?|\p{Emoji_Presentation})`;
var sTags = r`\u{E0061}-\u{E007A}`;
var emoji_regex_xs_default = () => new RegExp(r`[\u{1F1E6}-\u{1F1FF}]{2}|\u{1F3F4}[${sTags}]{2}[\u{E0030}-\u{E0039}${sTags}]{1,3}\u{E007F}|${seq}(?:\u200D${seq})*`, "gu");
//#endregion
//#region node_modules/@react-pdf/paginate/lib/index.js
var isLazy$1 = (item) => item.kind === "lazy";
var isColumn = (item) => item.kind === "column";
var isRow$1 = (item) => item.kind === "row";
var isPenalty = (item) => item.kind === "penalty";
var height = (fragment) => {
	const { item } = fragment;
	if (isPenalty(item) || isLazy$1(item)) return 0;
	if (isRow$1(item)) return fragment.children.reduce((acc, child) => Math.max(acc, height(child)), 0);
	if (isColumn(item)) return fragment.children.reduce((acc, child) => acc + height(child), 0);
	return item.height;
};
var isForbidPenalty = (item) => isPenalty(item) && item.type === "forbid";
var CONTINUE = () => ({ kind: "continue" });
var REWIND = () => ({ kind: "rewind" });
var DECLINE = () => ({ kind: "decline" });
var DONE = (result) => ({
	kind: "done",
	result
});
var reach = (placed) => placed.reduce((acc, item) => Math.max(acc, item.y + item.height), 0);
var toFragments = (items) => items.map((item) => ({
	item,
	isFirst: true,
	children: isRow$1(item) || isColumn(item) ? toFragments(item.children) : []
}));
var isRepeat = (item) => "repeat" in item && item.repeat === true;
var fullyPlaced = (placed, item) => placed.some((p) => p.item === item && p.part.isLast);
var repeatFragments = (fragment, inner, contentAbove) => {
	const isRepeatPlacement = (p) => isRepeat(p.item) || fragment.children.some((f) => f.origin !== void 0 && f.item === p.item);
	if (!contentAbove && inner.placed.length > 0 && inner.placed.every(isRepeatPlacement)) return [];
	const sources = [];
	for (const child of fragment.children) {
		if (child.origin !== void 0) {
			const { origin } = child;
			if (sources.includes(origin)) continue;
			if (fragment.children.filter((f) => f.origin === origin).every((f) => fullyPlaced(inner.placed, f.item))) sources.push(origin);
			continue;
		}
		if (isRepeat(child.item) && fullyPlaced(inner.placed, child.item)) sources.push(child.item);
	}
	return toFragments(sources);
};
var isRepeatPlaced = (placed) => isRepeat(placed.item) || !!placed.children?.length && placed.children.every(isRepeatPlaced);
var hasContentAbove = (state) => {
	const fromRepeatLazy = (placed) => state.fragments.some((f) => f.origin !== void 0 && isRepeat(f.origin) && f.item === placed.item);
	return state.contentAbove || state.placed.some((p) => !isRepeatPlaced(p) && !fromRepeatLazy(p));
};
var fit$3 = (state, fragment, index) => {
	const { isFirst } = fragment;
	const item = fragment.item;
	const availableHeight = state.height - state.usedHeight;
	if (availableHeight <= 0) return DECLINE();
	const canForce = state.canForce && state.placed.length === 0;
	const contentAbove = hasContentAbove(state);
	const inner = fill(fragment.children, availableHeight, state.pageNumber, canForce, contentAbove);
	const broke = inner.remaining.length > 0;
	if (broke && inner.placed.length === 0) {
		if (inner.remaining.length === fragment.children.length) return DECLINE();
		const remaining = [{
			item,
			isFirst,
			children: inner.remaining
		}, ...state.fragments.slice(index + 1)];
		return DONE({
			placed: state.placed,
			remaining
		});
	}
	state.placed.push({
		item,
		y: state.usedHeight,
		height: broke ? availableHeight : reach(inner.placed),
		part: {
			isFirst,
			isLast: !broke
		},
		children: inner.placed
	});
	if (!broke) return CONTINUE();
	const continuation = {
		item,
		isFirst: false,
		children: [...repeatFragments(fragment, inner, contentAbove), ...inner.remaining]
	};
	return DONE({
		placed: state.placed,
		remaining: [continuation, ...state.fragments.slice(index + 1)]
	});
};
var fit$2 = (state, fragment) => {
	const item = fragment.item;
	if (state.usedHeight + item.height > state.height) return DECLINE();
	state.placed.push({
		item,
		y: state.usedHeight,
		height: item.height,
		part: {
			isFirst: fragment.isFirst,
			isLast: true
		}
	});
	return CONTINUE();
};
var isLeaf = (item) => item.kind === "leaf" || item.kind === "spacer";
var place = (rowFragment, height$1, pageNumber, canForce = false, contentAbove = false) => {
	const placed = [];
	const remaining = [];
	for (const childFragment of rowFragment.children) {
		const child = childFragment.item;
		const { isFirst } = childFragment;
		if (isRow$1(child) || isColumn(child)) {
			const inner = fill(childFragment.children, height$1, pageNumber, canForce, contentAbove);
			const broke = inner.remaining.length > 0;
			if (broke && inner.placed.length === 0) return null;
			placed.push({
				item: child,
				y: 0,
				height: broke ? height$1 : reach(inner.placed),
				part: {
					isFirst,
					isLast: !broke
				},
				children: inner.placed
			});
			if (broke) {
				const repeats = repeatFragments(childFragment, inner, contentAbove);
				remaining.push({
					item: child,
					isFirst: false,
					children: [...repeats, ...inner.remaining]
				});
			}
			continue;
		}
		if (isLeaf(child) && child.height > height$1) {
			const split = child.split?.(height$1) ?? null;
			if (split === null) return null;
			placed.push({
				item: split.current,
				y: 0,
				height: height$1,
				part: {
					isFirst,
					isLast: false
				}
			});
			remaining.push({
				item: split.next,
				isFirst: false,
				children: []
			});
			continue;
		}
		placed.push({
			item: child,
			y: 0,
			height: height({
				item: child,
				children: []
			}),
			part: {
				isFirst,
				isLast: true
			}
		});
	}
	return {
		placed,
		remaining
	};
};
var fit$1 = (state, fragment, index) => {
	const { isFirst } = fragment;
	const item = fragment.item;
	const availableHeight = state.height - state.usedHeight;
	if (availableHeight <= 0) return DECLINE();
	const canForce = state.canForce && state.placed.length === 0;
	const contentAbove = hasContentAbove(state);
	const inner = place(fragment, availableHeight, state.pageNumber, canForce, contentAbove);
	if (inner === null) return DECLINE();
	const broke = inner.remaining.length > 0;
	if (broke && state.height < state.forbidUntil) return DECLINE();
	state.placed.push({
		item,
		y: state.usedHeight,
		height: broke ? availableHeight : inner.placed.reduce((acc, child) => Math.max(acc, child.height), 0),
		part: {
			isFirst,
			isLast: !broke
		},
		children: inner.placed
	});
	if (!broke) return CONTINUE();
	const continuation = {
		item,
		isFirst: false,
		children: inner.remaining
	};
	return DONE({
		placed: state.placed,
		remaining: [continuation, ...state.fragments.slice(index + 1)]
	});
};
var fit = (state, fragment, index) => {
	let step;
	if (isColumn(fragment.item)) step = fit$3(state, fragment, index);
	else if (isRow$1(fragment.item)) step = fit$1(state, fragment, index);
	else step = fit$2(state, fragment);
	if (step.kind !== "continue") return step;
	state.usedHeight += height(fragment);
	const next = state.fragments[index + 1];
	const insideWindow = state.usedHeight < state.forbidUntil;
	if ((next === void 0 || !isForbidPenalty(next.item)) && !insideWindow) state.bestBreak = {
		remainingIndex: index + 1,
		placedCount: state.placed.length
	};
	return CONTINUE();
};
var canSplit = (item) => isLeaf(item) && item.split !== void 0;
var restore = (state) => {
	if (state.pendingLazy === null) return null;
	const { spliceStart, fragment, count, placedAtMaterialize } = state.pendingLazy;
	state.pendingLazy = null;
	if (state.placed.length > placedAtMaterialize) return null;
	state.fragments.splice(spliceStart, count, fragment);
	return spliceStart;
};
var deferToNextPage = (state, i) => {
	const lazyIndex = restore(state);
	return DONE({
		placed: state.placed,
		remaining: state.fragments.slice(lazyIndex ?? i)
	});
};
var rewindToBestBreak = (state, bestBreak) => {
	state.placed.length = bestBreak.placedCount;
	const lazyIndex = restore(state);
	const remaining = state.fragments.slice(lazyIndex ?? bestBreak.remainingIndex);
	return DONE({
		placed: state.placed,
		remaining
	});
};
var spillOntoOwnPage = (state, i, fragment, height) => {
	const lazyIndex = restore(state);
	if (lazyIndex !== null) return DONE({
		placed: [],
		remaining: state.fragments.slice(lazyIndex)
	});
	const { item, isFirst } = fragment;
	const label = "id" in item && item.id ? ` "${item.id}"` : "";
	console.warn(`[paginate] Item${label} of height ${height} exceeds available height ${state.height}; placing on its own page.`);
	if (isRow$1(item)) {
		const placedChildren = place(fragment, height, state.pageNumber, true)?.placed ?? [];
		return DONE({
			placed: [{
				item,
				y: 0,
				height,
				part: {
					isFirst,
					isLast: true
				},
				children: placedChildren
			}],
			remaining: state.fragments.slice(i + 1)
		});
	}
	return DONE({
		placed: [{
			item,
			y: 0,
			height,
			part: {
				isFirst,
				isLast: true
			}
		}],
		remaining: state.fragments.slice(i + 1)
	});
};
var trySplitLeaf = (state, i, item, isFirst) => {
	const availHeight = state.height - state.usedHeight;
	const result = item.split(availHeight);
	if (!result) return null;
	state.placed.push({
		item: result.current,
		y: state.usedHeight,
		height: result.current.height,
		part: {
			isFirst,
			isLast: false
		}
	});
	const remainingFragment = {
		item: result.next,
		isFirst: false,
		children: []
	};
	return DONE({
		placed: state.placed,
		remaining: [remainingFragment, ...state.fragments.slice(i + 1)]
	});
};
var canRewind = (bestBreak, i) => bestBreak !== null && bestBreak.remainingIndex < i + 1;
var tryOverflow = (state, fragment, i) => {
	if (state.height >= state.forbidUntil && canSplit(fragment.item)) {
		const split = trySplitLeaf(state, i, fragment.item, fragment.isFirst);
		if (split !== null) return split;
	}
	if (canRewind(state.bestBreak, i)) return rewindToBestBreak(state, state.bestBreak);
	if (!state.canForce) {
		restore(state);
		return DONE({
			placed: [],
			remaining: state.fragments
		});
	}
	if (state.placed.length === 0) return spillOntoOwnPage(state, i, fragment, height(fragment));
	return deferToNextPage(state, i);
};
var isForcePenalty = (item) => isPenalty(item) && item.type === "force";
var materialize = (state, fragment, index) => {
	const item = fragment.item;
	const materialized = toFragments(item.materialize({ pageNumber: state.pageNumber }));
	if (isRepeat(item)) for (const f of materialized) f.origin = item;
	state.fragments.splice(index, 1, ...materialized);
	if (materialized.length > 0) state.pendingLazy = {
		spliceStart: index,
		fragment,
		count: materialized.length,
		placedAtMaterialize: state.placed.length
	};
	return REWIND();
};
var fillStep = (state, index) => {
	const fragment = state.fragments[index];
	if (isForcePenalty(fragment.item)) {
		const placed = state.placed;
		return DONE({
			placed,
			remaining: state.fragments.slice(index + 1)
		});
	}
	if (isForbidPenalty(fragment.item)) {
		const { ahead } = fragment.item;
		if (ahead && state.bestBreak !== null) state.forbidUntil = Math.max(state.forbidUntil, state.usedHeight + ahead);
		return CONTINUE();
	}
	if (isLazy$1(fragment.item)) return materialize(state, fragment, index);
	const step = fit(state, fragment, index);
	if (step.kind === "decline") return tryOverflow(state, fragment, index);
	return step;
};
var fill = (fragments, height, pageNumber, canForce = false, contentAbove = false) => {
	const state = {
		fragments,
		height,
		placed: [],
		usedHeight: 0,
		bestBreak: null,
		pendingLazy: null,
		pageNumber,
		canForce,
		contentAbove,
		forbidUntil: 0
	};
	for (let i = 0; i < state.fragments.length; i += 1) {
		const step = fillStep(state, i);
		if (step.kind === "done") return step.result;
		if (step.kind === "rewind") i -= 1;
	}
	return {
		placed: state.placed,
		remaining: []
	};
};
var FORCE_BREAK = {
	kind: "penalty",
	type: "force"
};
var FORBID_BREAK = {
	kind: "penalty",
	type: "forbid"
};
var presenceWindow = (ahead) => ({
	kind: "penalty",
	type: "forbid",
	ahead
});
var isContainer = (node) => "children" in node;
var isLazy = (node) => "materialize" in node;
var isAbsolute$1 = (node) => "absolute" in node && !!node.absolute;
var validate = (node) => {
	const mixed = node;
	if (mixed.children && (mixed.split || mixed.materialize)) throw new Error("[paginate] A node with children cannot also have split or materialize.");
	if (mixed.split && mixed.materialize) throw new Error("[paginate] A node cannot have both split and materialize.");
};
var marginTop$1 = (node) => node.box.marginTop || 0;
var marginBottom$1 = (node) => node.box.marginBottom || 0;
var edgeTop = (node) => node.box.edgeTop || 0;
var outerTop = (node) => node.box.top - marginTop$1(node);
var outerHeight = (node) => marginTop$1(node) + node.box.height + marginBottom$1(node);
var gapBefore = (flow, index) => {
	const previous = flow[index - 1];
	if (!previous) return 0;
	return outerTop(flow[index]) - outerTop(previous) - outerHeight(previous);
};
var space = (height, collapse = false) => ({
	kind: "spacer",
	height,
	split: (avail) => {
		if (!collapse && avail <= 0) return null;
		return {
			current: {
				kind: "spacer",
				height: avail
			},
			next: collapse ? {
				kind: "spacer",
				height: 0
			} : space(height - avail)
		};
	}
});
var splitOf$1 = (node) => {
	const { split } = node;
	if (!split) return void 0;
	return (availHeight) => {
		const pair = split(availHeight - marginTop$1(node));
		if (!pair) return null;
		return {
			current: leafOf$1(pair[0]),
			next: leafOf$1(pair[1])
		};
	};
};
var leafOf$1 = (node) => ({
	kind: "leaf",
	height: node.absolute ? 0 : outerHeight(node),
	id: node.id,
	data: node,
	split: node.absolute ? void 0 : splitOf$1(node)
});
var lazyOf$1 = (node) => ({
	kind: "lazy",
	id: node.id,
	materialize: (ctx) => [toItem$1(node.materialize(ctx))]
});
var withEdges = (node, bodyTop, bodyBottom, body) => {
	const topSpace = marginTop$1(node) + bodyTop;
	const bottomSpace = marginBottom$1(node) + node.box.height - bodyBottom;
	return {
		kind: "column",
		id: node.id,
		data: node,
		children: [
			...topSpace > 0 ? [space(topSpace)] : [],
			...body,
			...bottomSpace > 0 ? [space(bottomSpace)] : []
		]
	};
};
var withFlags$1 = (node, item) => ({
	...item,
	...node.repeat ? { repeat: true } : {}
});
var itemsOf = (children) => {
	const flow = children.filter((child) => !isAbsolute$1(child));
	return children.flatMap((child) => {
		if (isAbsolute$1(child)) return [withFlags$1(child, leafOf$1(child))];
		const index = flow.indexOf(child);
		const before = gapBefore(flow, index);
		const item = withFlags$1(child, toItem$1(child));
		return [
			child.break && index > 0 ? FORCE_BREAK : null,
			before > 0 ? space(before, true) : null,
			item,
			child.minPresenceAhead ? presenceWindow(child.minPresenceAhead) : null
		].filter(Boolean);
	});
};
var rowOf = (node) => {
	const flow = node.children.filter((child) => !isAbsolute$1(child));
	const cells = flow.map((child) => {
		const item = withFlags$1(child, toItem$1(child));
		const offset = outerTop(child) - edgeTop(node);
		if (offset <= .001) return item;
		return {
			kind: "column",
			children: [
				space(offset),
				FORBID_BREAK,
				item
			]
		};
	});
	const bodyBottom = Math.max(...flow.map((child) => outerTop(child) + outerHeight(child)));
	return withEdges(node, edgeTop(node), bodyBottom, [{
		kind: "row",
		children: cells
	}]);
};
var isWrapped = (flow) => flow.some((_, index) => gapBefore(flow, index) < -.001);
var columnOf = (node) => {
	const flow = node.children.filter((child) => !isAbsolute$1(child));
	if (isWrapped(flow)) return {
		kind: "leaf",
		height: outerHeight(node),
		id: node.id,
		data: node
	};
	const first = flow[0];
	const last = flow[flow.length - 1];
	return withEdges(node, first ? outerTop(first) : edgeTop(node), last ? outerTop(last) + outerHeight(last) : node.box.height, itemsOf(node.children));
};
var toItem$1 = (node) => {
	validate(node);
	if (isLazy(node)) return lazyOf$1(node);
	if (isContainer(node)) return node.direction === "row" ? rowOf(node) : columnOf(node);
	return leafOf$1(node);
};
var toItems = (nodes) => ({
	kind: "column",
	children: itemsOf(nodes)
});
var rebuild$1 = (placed, origin) => {
	const node = placed.item.data;
	const top = origin + placed.y;
	if (!node) return (placed.children || []).flatMap((child) => rebuild$1(child, top));
	const lead = placed.part.isFirst ? node.box.marginTop || 0 : 0;
	const data = "data" in node ? node.data : void 0;
	const children = placed.children?.flatMap((child) => rebuild$1(child, -lead));
	return [{
		box: {
			top,
			height: placed.height
		},
		part: placed.part,
		data,
		children
	}];
};
var toPlaced = (page) => page.flatMap((item) => rebuild$1(item, 0));
var createPaginator = (nodes) => {
	let pageNumber = 1;
	let fragments = toFragments([toItems(nodes)]);
	return {
		get done() {
			return fragments.length === 0;
		},
		next(height) {
			if (fragments.length === 0) throw new Error("[paginate] next() called after done");
			const result = fill(fragments, height, pageNumber, true);
			pageNumber += 1;
			fragments = result.remaining;
			return toPlaced(result.placed);
		}
	};
};
//#endregion
//#region node_modules/@react-pdf/layout/lib/index.js
/**
* Apply transformation to text string
*
* @param {string} text
* @param {string} transformation type
* @returns {string} transformed text
*/
var transformText = (text, transformation) => {
	switch (transformation) {
		case "uppercase": return text.toUpperCase();
		case "lowercase": return text.toLowerCase();
		case "capitalize": return capitalize(text);
		case "upperfirst": return upperFirst(text);
		default: return text;
	}
};
var isTspan = (node) => node.type === Tspan;
var isTextInstance$4 = (node) => node.type === TextInstance;
var engine$1 = layoutEngine({
	bidi: bidiEngine,
	linebreaker,
	justification,
	textDecoration,
	scriptItemizer,
	wordHyphenation,
	fontSubstitution
});
var getFragments$1 = (fontStore, instance) => {
	if (!instance) return [{ string: "" }];
	const fragments = [];
	const { fill = "black", fontFamily = "Helvetica", fontWeight, fontStyle, fontSize = 18, textDecorationColor, textDecorationStyle, textTransform, opacity } = instance.props;
	const _textDecoration = instance.props.textDecoration;
	const fontFamilies = typeof fontFamily === "string" ? [fontFamily] : [...fontFamily || []];
	fontFamilies.push("Helvetica");
	const attributes = {
		font: fontFamilies.map((fontFamilyName) => {
			const opts = {
				fontFamily: fontFamilyName,
				fontWeight,
				fontStyle
			};
			return fontStore.getFont(opts)?.data;
		}),
		opacity,
		fontSize,
		color: fill,
		underlineStyle: textDecorationStyle,
		underline: _textDecoration === "underline" || _textDecoration === "underline line-through" || _textDecoration === "line-through underline",
		underlineColor: textDecorationColor || fill,
		strike: _textDecoration === "line-through" || _textDecoration === "underline line-through" || _textDecoration === "line-through underline",
		strikeStyle: textDecorationStyle,
		strikeColor: textDecorationColor || fill
	};
	for (let i = 0; i < instance.children.length; i += 1) {
		const child = instance.children[i];
		if (isTextInstance$4(child)) fragments.push({
			string: transformText(child.value, textTransform),
			attributes
		});
		else if (child) fragments.push(...getFragments$1(fontStore, child));
	}
	return fragments;
};
var getAttributedString$1 = (fontStore, instance) => fromFragments(getFragments$1(fontStore, instance));
var AlmostInfinity = 999999999999;
var shrinkWhitespaceFactor = {
	before: -.5,
	after: -.5
};
var layoutTspan = (fontStore) => (node, xOffset) => {
	const lines = engine$1(getAttributedString$1(fontStore, node), {
		x: node.props.x === void 0 ? xOffset : node.props.x,
		y: node.props?.y || 0,
		width: AlmostInfinity,
		height: AlmostInfinity
	}, {
		hyphenationCallback: node.props.hyphenationCallback || fontStore?.getHyphenationCallback() || null,
		shrinkWhitespaceFactor
	}).flat();
	return Object.assign({}, node, { lines });
};
var joinTSpanLines = (node) => {
	const children = node.children.map((child, index) => {
		if (!isTspan(child)) return child;
		const textInstance = child.children[0];
		if (child.props.x === void 0 && index < node.children.length - 1 && textInstance?.value) return Object.assign({}, child, { children: [{
			...textInstance,
			value: `${textInstance.value} `
		}] });
		return child;
	}, []);
	return Object.assign({}, node, { children });
};
var layoutText$1 = (fontStore, node) => {
	if (!node.children) return node;
	let currentXOffset = node.props?.x || 0;
	const layoutFn = layoutTspan(fontStore);
	const children = joinTSpanLines(node).children.map((child) => {
		const childWithLayout = layoutFn(child, currentXOffset);
		currentXOffset += childWithLayout.lines[0].xAdvance;
		return childWithLayout;
	});
	return Object.assign({}, node, { children });
};
var isDefs$1 = (node) => node.type === Defs;
var getDefs = (node) => {
	return ((node.children || []).find(isDefs$1)?.children || []).reduce((acc, value) => {
		const id = value.props?.id;
		if (id) acc[id] = value;
		return acc;
	}, {});
};
var isNotDefs = (node) => node.type !== Defs;
var detachDefs = (node) => {
	if (!node.children) return node;
	const children = node.children.filter(isNotDefs);
	return Object.assign({}, node, { children });
};
var URL_REGEX$1 = /url\(['"]?#([^'"]+)['"]?\)/;
var replaceDef = (defs, value) => {
	if (!value) return void 0;
	if (!URL_REGEX$1.test(value)) return value;
	return defs[value.match(URL_REGEX$1)[1]];
};
var parseNodeDefs = (defs) => (node) => {
	const props = node.props;
	const fill = `fill` in props ? replaceDef(defs, props?.fill) : void 0;
	const clipPath = `clipPath` in props ? replaceDef(defs, props?.clipPath) : void 0;
	const markerStart = `markerStart` in props ? replaceDef(defs, props?.markerStart) : void 0;
	const markerMid = `markerMid` in props ? replaceDef(defs, props?.markerMid) : void 0;
	const markerEnd = `markerEnd` in props ? replaceDef(defs, props?.markerEnd) : void 0;
	const newProps = Object.assign({}, node.props, {
		fill,
		clipPath,
		markerStart,
		markerMid,
		markerEnd
	});
	const children = node.children ? node.children.map(parseNodeDefs(defs)) : void 0;
	return Object.assign({}, node, {
		props: newProps,
		children
	});
};
var parseDefs = (root) => {
	if (!root.children) return root;
	const defs = getDefs(root);
	const children = root.children.map(parseNodeDefs(defs));
	return Object.assign({}, root, { children });
};
var replaceDefs = (node) => {
	return detachDefs(parseDefs(node));
};
var parseViewbox = (value) => {
	if (!value) return null;
	if (typeof value !== "string") return value;
	const values = value.split(/[,\s]+/).map(parseFloat$1);
	if (values.length !== 4) return null;
	return {
		minX: values[0],
		minY: values[1],
		maxX: values[2],
		maxY: values[3]
	};
};
var getContainer$1 = (node) => {
	const viewbox = parseViewbox(node.props.viewBox);
	if (viewbox) return {
		width: viewbox.maxX,
		height: viewbox.maxY
	};
	if (node.props.width && node.props.height) return {
		width: parseFloat$1(node.props.width),
		height: parseFloat$1(node.props.height)
	};
	return {
		width: 0,
		height: 0
	};
};
var BASE_SVG_INHERITED_PROPS = [
	"x",
	"y",
	"clipPath",
	"clipRule",
	"opacity",
	"fill",
	"fillOpacity",
	"fillRule",
	"stroke",
	"strokeLinecap",
	"strokeLinejoin",
	"strokeOpacity",
	"strokeWidth",
	"textAnchor",
	"dominantBaseline",
	"color",
	"fontFamily",
	"fontSize",
	"fontStyle",
	"fontWeight",
	"fontFeatureSettings",
	"letterSpacing",
	"opacity",
	"textDecoration",
	"lineHeight",
	"textAlign",
	"visibility",
	"wordSpacing"
];
var TEXT_SVG_INHERITED_PROPS = without(["x"], BASE_SVG_INHERITED_PROPS);
var SVG_INHERITED_PROPS = { [Text]: TEXT_SVG_INHERITED_PROPS };
var getInheritProps = (node) => {
	const props = node.props || {};
	const svgInheritedProps = SVG_INHERITED_PROPS[node.type] ?? BASE_SVG_INHERITED_PROPS;
	return pick(svgInheritedProps, props);
};
var inheritProps = (node) => {
	if (!node.children) return node;
	const inheritedProps = getInheritProps(node);
	const children = node.children.map((child) => {
		const props = Object.assign({}, inheritedProps, child.props || {});
		return inheritProps(Object.assign({}, child, { props }));
	});
	return Object.assign({}, node, { children });
};
var parseAspectRatio = (value) => {
	if (typeof value !== "string") return value;
	const match = value.replace(/[\s\r\t\n]+/gm, " ").replace(/^defer\s/, "").split(" ");
	return {
		align: match[0] || "xMidYMid",
		meetOrSlice: match[1] || "meet"
	};
};
var isMarker = (node) => node.type === Marker;
var STYLE_PROPS = [
	"width",
	"height",
	"color",
	"stroke",
	"strokeWidth",
	"opacity",
	"fillOpacity",
	"strokeOpacity",
	"fill",
	"fillRule",
	"clipPath",
	"offset",
	"transform",
	"strokeLinejoin",
	"strokeLinecap",
	"strokeDasharray",
	"gradientUnits",
	"gradientTransform",
	"stopColor",
	"stopOpacity"
];
var VERTICAL_PROPS = [
	"y",
	"y1",
	"y2",
	"height",
	"cy",
	"ry"
];
var HORIZONTAL_PROPS = [
	"x",
	"x1",
	"x2",
	"width",
	"cx",
	"rx"
];
var isSvg$3 = (node) => node.type === "SVG";
var isText$7 = (node) => node.type === Text;
var isTextInstance$3 = (node) => node.type === TextInstance;
var transformPercent = (container) => (props) => mapValues(props, (value, key) => {
	const match = matchPercent(value);
	if (match && VERTICAL_PROPS.includes(key)) return match.percent * container.height;
	if (match && HORIZONTAL_PROPS.includes(key)) return match.percent * container.width;
	return value;
});
var parsePercent = (value) => {
	const match = matchPercent(value);
	return match ? match.percent : parseFloat$1(value);
};
var parseTransform = (container) => (value) => {
	return resolveStyles$1(container, { transform: value }).transform;
};
var URL_REGEX = /^url\(/;
var transformColorSafe = (value) => {
	if (typeof value === "string" && URL_REGEX.test(value)) return value;
	return transformColor(value);
};
var parseProps = (container) => (node) => {
	let props = transformPercent(container)(node.props);
	props = evolve({
		x: parseFloat$1,
		x1: parseFloat$1,
		x2: parseFloat$1,
		y: parseFloat$1,
		y1: parseFloat$1,
		y2: parseFloat$1,
		r: parseFloat$1,
		rx: parseFloat$1,
		ry: parseFloat$1,
		cx: parseFloat$1,
		cy: parseFloat$1,
		width: parseFloat$1,
		height: parseFloat$1,
		fontSize: parseFloat$1,
		strokeWidth: parseFloat$1,
		strokeMiterlimit: parseFloat$1,
		strokeDashoffset: parseFloat$1,
		offset: parsePercent,
		fill: transformColorSafe,
		fillOpacity: parsePercent,
		opacity: parsePercent,
		stroke: transformColorSafe,
		strokeOpacity: parsePercent,
		stopOpacity: parsePercent,
		stopColor: transformColor,
		transform: parseTransform(container),
		gradientTransform: parseTransform(container)
	}, props);
	return Object.assign({}, node, { props });
};
var resolveRectRadius = (node) => {
	if (node.type !== "RECT" || !node.props) return node;
	const { rx, ry } = node.props;
	if (rx && ry || !rx && !ry) return node;
	const newProps = Object.assign({}, node.props, {
		rx: rx ?? ry,
		ry: ry ?? rx
	});
	return Object.assign({}, node, { props: newProps });
};
var mergeStyles$1 = (node) => {
	const style = node.style || {};
	const props = Object.assign({}, style, node.props);
	return Object.assign({}, node, { props });
};
var removeNoneValues = (node) => {
	const removeNone = (value) => value === "none" ? null : value;
	const props = mapValues(node.props, removeNone);
	return Object.assign({}, node, { props });
};
var pickStyleProps = (node) => {
	const props = node.props || {};
	const styleProps = pick(STYLE_PROPS, props);
	const style = Object.assign({}, styleProps, node.style || {});
	return Object.assign({}, node, { style });
};
var parseSvgProps = (node) => {
	const props = evolve({
		width: parseFloat$1,
		height: parseFloat$1,
		viewBox: parseViewbox,
		preserveAspectRatio: parseAspectRatio
	}, node.props);
	return Object.assign({}, node, { props });
};
var wrapBetweenTspan = (node) => ({
	type: Tspan,
	props: {},
	style: {},
	wasSplit: false,
	children: [node]
});
var addMissingTspan = (node) => {
	if (!isText$7(node)) return node;
	if (!node.children) return node;
	const resolveChild = (child) => isTextInstance$3(child) ? wrapBetweenTspan(child) : child;
	const children = node.children.map(resolveChild);
	return Object.assign({}, node, { children });
};
var parseText = (fontStore) => (node) => {
	if (isText$7(node)) return layoutText$1(fontStore, node);
	if (!node.children) return node;
	const children = node.children.map(parseText(fontStore));
	return Object.assign({}, node, { children });
};
var resolveSvgNode = (container) => compose(pickStyleProps, resolveRectRadius, parseProps(container), addMissingTspan, removeNoneValues, mergeStyles$1);
var parseGradientTransform = parseTransform({
	width: 0,
	height: 0
});
var parseDefsProps = (node) => {
	const props = evolve({
		x1: parsePercent,
		y1: parsePercent,
		x2: parsePercent,
		y2: parsePercent,
		cx: parsePercent,
		cy: parsePercent,
		fx: parsePercent,
		fy: parsePercent,
		r: parsePercent,
		gradientTransform: parseGradientTransform,
		offset: parsePercent,
		stopColor: transformColor,
		stopOpacity: parsePercent,
		refX: parseFloat$1,
		refY: parseFloat$1,
		markerWidth: parseFloat$1,
		markerHeight: parseFloat$1,
		viewBox: parseViewbox
	}, node.props || {});
	return Object.assign({}, node, { props });
};
var getMarkerContainer = (node) => {
	const props = node.props || {};
	const viewBox = "viewBox" in props ? props.viewBox : null;
	if (viewBox) return {
		width: viewBox.maxX,
		height: viewBox.maxY
	};
	return {
		width: "markerWidth" in props ? props.markerWidth : 3,
		height: "markerHeight" in props ? props.markerHeight : 3
	};
};
var resolveMarkerChildren = (node) => {
	if (!node.children) return node;
	const container = getMarkerContainer(node);
	const resolveChild = compose(resolveChildren(container), resolveSvgNode(container));
	const children = node.children.map(resolveChild);
	return Object.assign({}, node, { children });
};
var resolveDefsChildren = (node) => {
	if (!node.children) return node;
	const children = node.children.map((child) => {
		const parsed = parseDefsProps(child);
		if (isMarker(parsed)) return resolveMarkerChildren(parsed);
		return resolveDefsChildren(parsed);
	});
	return Object.assign({}, node, { children });
};
var isDefs = (node) => node.type === Defs;
var resolveChildren = (container) => (node) => {
	if (!node.children) return node;
	const resolveChild = compose(resolveChildren(container), resolveSvgNode(container));
	const children = node.children.map((child) => isDefs(child) ? resolveDefsChildren(child) : resolveChild(child));
	return Object.assign({}, node, { children });
};
var buildXLinksIndex = (node) => {
	const idIndex = {};
	const listToExplore = node.children?.slice(0) || [];
	while (listToExplore.length > 0) {
		const child = listToExplore.shift();
		if (child.props && "id" in child.props) idIndex[child.props.id] = child;
		if (child.children) listToExplore.push(...child.children);
	}
	return idIndex;
};
var replaceXLinks = (node, idIndex) => {
	if (node.props && "xlinkHref" in node.props) {
		const linkedNode = idIndex[node.props.xlinkHref.replace(/^#/, "")];
		if (!linkedNode) return node;
		const newProps = Object.assign({}, linkedNode.props, node.props);
		delete newProps.xlinkHref;
		return Object.assign({}, linkedNode, { props: newProps });
	}
	const children = node.children?.map((child) => replaceXLinks(child, idIndex));
	return Object.assign({}, node, { children });
};
var resolveXLinks = (node) => {
	return replaceXLinks(node, buildXLinksIndex(node));
};
var resolveSvgRoot = (node, fontStore) => {
	const container = getContainer$1(node);
	return compose(replaceDefs, parseText(fontStore), parseSvgProps, pickStyleProps, inheritProps, resolveChildren(container), resolveXLinks)(node);
};
var isSvgImage = (node) => node.type === "IMAGE" && node.image?.format === "svg";
function convertParsedNode(node) {
	return {
		type: node.type,
		props: node.props,
		style: {},
		children: node.children?.map(convertParsedNode),
		..."value" in node && { value: node.value }
	};
}
function convertToSvgNode(imageNode) {
	const image = imageNode.image;
	const width = imageNode.style?.width ?? image.width;
	const height = imageNode.style?.height ?? image.height;
	return {
		type: "SVG",
		props: {
			width,
			height,
			viewBox: parseViewbox(image.data.props.viewBox),
			preserveAspectRatio: {
				align: "xMidYMid",
				meetOrSlice: "meet"
			}
		},
		style: {
			...imageNode.style,
			width,
			height
		},
		box: imageNode.box,
		origin: imageNode.origin,
		yogaNode: imageNode.yogaNode,
		wasSplit: false,
		children: image.data.children.map(convertParsedNode)
	};
}
/**
* Pre-process SVG nodes so they can be rendered in the next steps.
* Also converts Image nodes containing SVG data into SvgNodes.
*
* @param node - Root node
* @param fontStore - Font store
* @returns Root node
*/
var resolveSvg = (node, fontStore) => {
	const resolved = isSvgImage(node) ? convertToSvgNode(node) : node;
	if (!("children" in resolved)) return resolved;
	const resolveChild = (child) => resolveSvg(child, fontStore);
	const root = isSvg$3(resolved) ? resolveSvgRoot(resolved, fontStore) : resolved;
	const children = root.children?.map(resolveChild);
	return Object.assign({}, root, { children });
};
var instancePromise;
var loadYoga = async () => {
	const instance = await (instancePromise ??= loadYoga$1());
	const config = instance.Config.create();
	config.setPointScaleFactor(0);
	return { node: { create: () => instance.Node.createWithConfig(config) } };
};
var resolveYoga = async (root) => {
	const yoga = await loadYoga();
	return Object.assign({}, root, { yoga });
};
var getZIndex = (node) => node.style.zIndex;
var shouldSort = (node) => node.type !== "DOCUMENT" && node.type !== "SVG";
var sortZIndex = (a, b) => {
	const za = getZIndex(a);
	const zb = getZIndex(b);
	if (!za && !zb) return 0;
	if (!za) return 1;
	if (!zb) return -1;
	return zb - za;
};
/**
* Sort children by zIndex value
*
* @param node
* @returns Node
*/
var resolveNodeZIndex = (node) => {
	if (!node.children) return node;
	const children = (shouldSort(node) ? node.children.sort(sortZIndex) : node.children).map(resolveNodeZIndex);
	return Object.assign({}, node, { children });
};
/**
* Sort children by zIndex value
*
* @param node
* @returns Node
*/
var resolveZIndex = (root) => resolveNodeZIndex(root);
var emojis = {};
var regex = emoji_regex_xs_default();
/**
* When an emoji as no variations, it might still have 2 parts,
* the canonical emoji and an empty string.
* ex.
*   (no color) Array.from('❤️') => ["❤", "️"]
*   (w/ color) Array.from('👍🏿') => ["👍", "🏿"]
*
* The empty string needs to be removed otherwise the generated
* url will be incorect.
*/
var removeVariationSelectors = (x) => x !== "️";
var getCodePoints = (string, withVariationSelectors = false) => Array.from(string).filter(withVariationSelectors ? () => true : removeVariationSelectors).map((char) => char.codePointAt(0).toString(16)).join("-");
var buildEmojiUrl = (emoji, source) => {
	if ("builder" in source) return source.builder(getCodePoints(emoji, source.withVariationSelectors));
	const { url, format = "png", withVariationSelectors } = source;
	return `${url}${getCodePoints(emoji, withVariationSelectors)}.${format}`;
};
var fetchEmojis = (string, source) => {
	if (!source) return [];
	const promises = [];
	Array.from(string.matchAll(regex)).forEach((match) => {
		const emoji = match[0];
		if (!emojis[emoji] || emojis[emoji].loading) {
			const emojiUrl = buildEmojiUrl(emoji, source);
			emojis[emoji] = { loading: true };
			promises.push(resolveImage({ uri: emojiUrl }).then((image) => {
				emojis[emoji].loading = false;
				emojis[emoji].data = image.data;
			}).catch((e) => {
				console.warn(e, "Failed to load emoji image");
				emojis[emoji].loading = false;
			}));
		}
	});
	return promises;
};
var embedEmojis = (fragments) => {
	const result = [];
	for (let i = 0; i < fragments.length; i += 1) {
		const fragment = fragments[i];
		let lastIndex = 0;
		Array.from(fragment.string.matchAll(regex)).forEach((match) => {
			const { index } = match;
			const emoji = match[0];
			const emojiSize = fragment.attributes.fontSize;
			const chunk = fragment.string.slice(lastIndex, index + match[0].length);
			if (emojis[emoji] && emojis[emoji].data) result.push({
				string: chunk.replace(match[0], String.fromCharCode(65532)),
				attributes: {
					...fragment.attributes,
					attachment: {
						width: emojiSize,
						height: emojiSize,
						yOffset: Math.floor(emojiSize * .1),
						image: emojis[emoji].data
					}
				}
			});
			else result.push({
				string: chunk,
				attributes: fragment.attributes
			});
			lastIndex = index + emoji.length;
		});
		if (lastIndex < fragment.string.length) result.push({
			string: fragment.string.slice(lastIndex),
			attributes: fragment.attributes
		});
	}
	return result;
};
/**
* Parses an HTML-compatible srcSet string into structured entries.
* Only width descriptors (e.g. "300w") are supported.
*/
var parseSrcSet = (srcSet) => {
	return srcSet.split(",").map((entry) => entry.trim()).filter(Boolean).reduce((acc, entry) => {
		const parts = entry.split(/\s+/);
		const uri = parts[0];
		const descriptor = parts[1];
		if (descriptor && descriptor.endsWith("w")) {
			const width = parseFloat(descriptor);
			if (!Number.isNaN(width)) acc.push({
				uri,
				width
			});
		}
		return acc;
	}, []);
};
/**
* Selects the most appropriate image source from a parsed srcSet
* based on the target display width.
*
* Picks the smallest source that is >= targetWidth,
* or the largest available if none are large enough.
*/
var selectSource = (entries, targetWidth) => {
	if (entries.length === 0) return "";
	const sorted = [...entries].sort((a, b) => a.width - b.width);
	const match = sorted.find((e) => e.width >= targetWidth);
	return match ? match.uri : sorted[sorted.length - 1].uri;
};
/**
* Parses a CSS length value into points.
* Supports: px, pt (default), in, mm, cm, vw, %.
* vw and % are resolved relative to containerWidth.
*/
var parseLength = (value, containerWidth) => {
	const match = /^(-?\d*\.?\d+)\s*(px|pt|in|mm|cm|vw|%)?$/i.exec(value.trim());
	if (!match) return void 0;
	const num = parseFloat(match[1]);
	if (Number.isNaN(num)) return void 0;
	switch (match[2]?.toLowerCase()) {
		case "in": return num * 72;
		case "mm": return num * (72 / 25.4);
		case "cm": return num * (72 / 2.54);
		case "px": return num;
		case "vw": return num / 100 * containerWidth;
		case "%": return num / 100 * containerWidth;
		default: return num;
	}
};
/**
* Evaluates a media condition like "(min-width: 600px)" or "(max-width: 400px)"
* against the container width.
*/
var matchesCondition = (condition, containerWidth) => {
	const match = /\(\s*(min-width|max-width)\s*:\s*(-?\d*\.?\d+)\s*(px|pt|in|mm|cm|vw|%)?\s*\)/i.exec(condition);
	if (!match) return false;
	const feature = match[1].toLowerCase();
	const threshold = parseLength(`${match[2]}${match[3] || ""}`, containerWidth);
	if (threshold == null) return false;
	if (feature === "min-width") return containerWidth >= threshold;
	if (feature === "max-width") return containerWidth <= threshold;
	return false;
};
/**
* Parses sizes attribute to get the target display width.
*
* Accepts a number (used directly as points) or a string.
* For strings, evaluates media conditions against containerWidth
* and returns the first matching entry's length value.
*
* Format: "(media-condition) length, (media-condition) length, default-length"
*/
var parseSizes = (sizes, containerWidth) => {
	if (sizes == null) return void 0;
	if (typeof sizes === "number") return sizes;
	const entries = sizes.split(",").map((s) => s.trim());
	for (const entry of entries) {
		const conditionMatch = /^\(([^)]+)\)\s+(.+)$/.exec(entry);
		if (conditionMatch) {
			const condition = `(${conditionMatch[1]})`;
			const lengthStr = conditionMatch[2];
			if (matchesCondition(condition, containerWidth)) return parseLength(lengthStr, containerWidth);
		} else return parseLength(entry, containerWidth);
	}
};
/**
* Get image source, resolving srcSet if present.
*
* @param node - Image node
* @param pageWidth - Page width for srcSet resolution
* @returns Image src
*/
var getSource = (node, pageWidth) => {
	const { srcSet, sizes } = node.props;
	if (srcSet) {
		const entries = parseSrcSet(srcSet);
		if (entries.length > 0) {
			const uri = selectSource(entries, parseSizes(sizes, pageWidth) || pageWidth);
			if (uri) return uri;
		}
	}
	if (node.props.src) return node.props.src;
	if (node.props.source) return node.props.source;
};
/**
* Resolves `src` to `@react-pdf/image` interface.
*
* Also it handles factories and async sources.
*
* @param src
* @returns Resolved src
*/
var resolveSource = async (src) => {
	const source = typeof src === "function" ? await src() : await src;
	return typeof source === "string" ? { uri: source } : source;
};
/**
* Fetches image and appends data to node.
* Ideally this fn should be immutable.
*
* @param node - Image or ImageBackground node
* @param pageWidth - Page width for srcSet resolution
*/
var fetchImage = async (node, pageWidth) => {
	const { cache } = node.props;
	const src = getSource(node, pageWidth);
	if (!src) {
		console.warn(false, "Image should receive either a \"src\" or \"source\" prop");
		return;
	}
	try {
		const source = await resolveSource(src);
		if (!source) throw new Error(`Image's "src" or "source" prop returned ${source}`);
		node.image = await resolveImage(source, { cache });
		if (Buffer.isBuffer(source) || source instanceof Blob) return;
		node.image.key = "data" in source ? source.data.toString() : source.uri;
	} catch (e) {
		console.warn(e.message);
	}
};
var isImage$2 = (node) => node.type === Image;
var isImageBackground = (node) => node.type === ImageBackground;
/**
* Get all asset promises that need to be resolved
*
* @param fontStore - Font store
* @param node - Root node
* @returns Asset promises
*/
var fetchAssets = (fontStore, node, pageWidth) => {
	const promises = [];
	const listToExplore = [node];
	const emojiSource = fontStore ? fontStore.getEmojiSource() : null;
	while (listToExplore.length > 0) {
		const n = listToExplore.shift();
		if (isImage$2(n) || isImageBackground(n)) promises.push(fetchImage(n, pageWidth));
		if (fontStore && n.style?.fontFamily) {
			const fontFamilies = castArray(n.style.fontFamily);
			promises.push(...fontFamilies.map((fontFamily) => fontStore.load({
				fontFamily,
				fontStyle: n.style.fontStyle,
				fontWeight: n.style.fontWeight
			})));
		}
		if (typeof n === "string") promises.push(...fetchEmojis(n, emojiSource));
		if ("value" in n && typeof n.value === "string") promises.push(...fetchEmojis(n.value, emojiSource));
		if (n.children) n.children.forEach((childNode) => {
			listToExplore.push(childNode);
		});
	}
	return promises;
};
/**
* Fetch assets for a page
*
* @param fontStore - Font store
* @param page - Page node
* @returns Asset promises
*/
var fetchPageAssets = (fontStore, page) => {
	const pageWidth = page.style?.width;
	return page.children?.map((child) => fetchAssets(fontStore, child, pageWidth)).flat();
};
/**
* Fetch image, font and emoji assets in parallel.
* Layout process will not be resumed until promise resolves.
*
* @param node root node
* @param fontStore font store
* @returns Root node
*/
var resolveAssets = async (node, fontStore) => {
	const promises = node.children.map((page) => fetchPageAssets(fontStore, page)).flat();
	await Promise.all(promises);
	return node;
};
var isLink$1 = (node) => node.type === Link;
var DEFAULT_LINK_STYLES = {
	color: "blue",
	textDecoration: "underline"
};
/**
* Computes styles using stylesheet
*
* @param container
* @param node - Document node
* @returns Computed styles
*/
var computeStyle = (container, node) => {
	const style = resolveStyles$1(container, isLink$1(node) ? [DEFAULT_LINK_STYLES, node.style] : node.style);
	if (style.float === "left" || style.float === "right") style.position = "absolute";
	return style;
};
/**
* Resolves node styles
*
* @param container
* @returns Resolve node styles
*/
var resolveNodeStyles = (container) => (node) => {
	const style = computeStyle(container, node);
	const wasSplit = node.wasSplit ?? false;
	if (!node.children) return Object.assign({}, node, {
		style,
		wasSplit
	});
	const children = node.children.map(resolveNodeStyles(container));
	return Object.assign({}, node, {
		style,
		wasSplit,
		children
	});
};
/**
* Resolves page styles
*
* @param page Document page
* @returns Document page with resolved styles
*/
var resolvePageStyles = (page) => {
	const dpi = page.props?.dpi || 72;
	const style = page.style;
	return resolveNodeStyles({
		width: page.box?.width || style.width,
		height: page.box?.height || style.height,
		orientation: page.props?.orientation || "portrait",
		dpi,
		remBase: style?.fontSize || 18
	})(page);
};
/**
* Resolves document styles
*
* @param root - Document root
* @returns Document root with resolved styles
*/
var resolveStyles = (root) => {
	if (!root.children) return Object.assign({}, root, { wasSplit: false });
	const children = root.children.map(resolvePageStyles);
	return Object.assign({}, root, {
		wasSplit: false,
		children
	});
};
var isText$6 = (node) => node.type === Text;
var getNumericMargin = (value) => {
	return typeof value === "number" ? value : 0;
};
var isFloated = (node) => {
	const float = node.style?.float;
	return float === "left" || float === "right";
};
/**
* Calculate the minimum Y position that clears the specified float elements
*/
var getClearY = (floats, clearType) => {
	if (clearType === "none" || floats.length === 0) return 0;
	let maxY = 0;
	for (const float of floats) if (clearType === "both" || clearType === float.float) maxY = Math.max(maxY, float.bottom);
	return maxY;
};
/**
* Calculate the Y offset adjustment needed to clear float siblings
*/
var applyClear = (node, floats) => {
	const clearType = node.style?.clear;
	if (!clearType || clearType === "none") return 0;
	const currentY = node.box?.top ?? 0;
	const clearY = getClearY(floats, clearType);
	return Math.max(0, clearY - currentY);
};
/**
* Calculate left position for float element based on float direction
*/
var getFloatLeft = (node, parentWidth) => {
	const float = node.style?.float;
	const marginLeft = getNumericMargin(node.style?.marginLeft);
	const marginRight = getNumericMargin(node.style?.marginRight);
	if (float === "left") return marginLeft;
	if (float === "right") return parentWidth - (node.box?.width ?? 0) - marginRight;
	return node.box?.left ?? 0;
};
/**
* Position float element to the left or right edge of parent.
* Note: Yoga already applies marginTop to box.top for absolute positioned elements.
* Callers guarantee node.box — resolveFloats skips boxless children.
*/
var positionFloatElement = (node, parentWidth) => {
	const newLeft = getFloatLeft(node, parentWidth);
	const newBox = Object.assign({}, node.box, { left: newLeft });
	return Object.assign({}, node, { box: newBox });
};
var resolveScalar = (value, reference) => typeof value === "number" ? value : parseFloat(value) / 100 * reference;
var axisRadius = (radius, center, size) => {
	if (radius === "closest-side") return Math.min(center, size - center);
	if (radius === "farthest-side") return Math.max(center, size - center);
	return resolveScalar(radius, size);
};
/**
* Resolve a parsed shape-outside against the float's box into an exclusion
* shape in box-local coordinates (origin at the float's top-left corner).
*/
var resolveShapeOutside = (shape, box) => {
	if (shape.type === "circle") {
		const cx = resolveScalar(shape.cx, box.width);
		const cy = resolveScalar(shape.cy, box.height);
		const sides = [
			cx,
			cy,
			box.width - cx,
			box.height - cy
		];
		let r;
		if (shape.r === "closest-side") r = Math.min(...sides);
		else if (shape.r === "farthest-side") r = Math.max(...sides);
		else r = resolveScalar(shape.r, Math.hypot(box.width, box.height) / Math.SQRT2);
		return {
			type: "ellipse",
			cx,
			cy,
			rx: r,
			ry: r
		};
	}
	if (shape.type === "ellipse") {
		const cx = resolveScalar(shape.cx, box.width);
		const cy = resolveScalar(shape.cy, box.height);
		return {
			type: "ellipse",
			cx,
			cy,
			rx: axisRadius(shape.rx, cx, box.width),
			ry: axisRadius(shape.ry, cy, box.height)
		};
	}
	if (shape.type === "polygon") return {
		type: "polygon",
		points: shape.points.map((point) => ({
			x: resolveScalar(point.x, box.width),
			y: resolveScalar(point.y, box.height)
		}))
	};
	const top = resolveScalar(shape.top, box.height);
	const right = resolveScalar(shape.right, box.width);
	const bottom = resolveScalar(shape.bottom, box.height);
	const left = resolveScalar(shape.left, box.width);
	return {
		type: "rect",
		x: left,
		y: top,
		width: box.width - left - right,
		height: box.height - top - bottom
	};
};
var translateShape = (shape, dx, dy) => {
	if (shape.type === "ellipse") return {
		...shape,
		cx: shape.cx + dx,
		cy: shape.cy + dy
	};
	if (shape.type === "polygon") return {
		...shape,
		points: shape.points.map((p) => ({
			x: p.x + dx,
			y: p.y + dy
		}))
	};
	return {
		...shape,
		x: shape.x + dx,
		y: shape.y + dy
	};
};
/**
* Create Exclusion from a positioned node.
* Note: box.top already includes marginTop adjustment from positionFloatElement.
* Margins are folded into the rect: the text-facing side margin widens it and
* marginBottom extends it, so exclusion and clear read the geometry directly.
*/
var createExclusion = (node) => {
	const { box, style } = node;
	const float = style?.float;
	const marginRight = getNumericMargin(style?.marginRight);
	const marginLeft = getNumericMargin(style?.marginLeft);
	const shape = style?.shapeOutside ? resolveShapeOutside(style.shapeOutside, box) : null;
	if (shape) return {
		...translateShape(shape, box.left, box.top),
		extend: float
	};
	return {
		type: "rect",
		x: box.left - (float === "right" ? marginLeft : 0),
		y: box.top,
		width: box.width + (float === "left" ? marginRight : marginLeft),
		height: box.height + getNumericMargin(style?.marginBottom)
	};
};
var createFloatEdge = (node) => ({
	float: node.style?.float,
	bottom: node.box.top + node.box.height + getNumericMargin(node.style?.marginBottom)
});
/**
* Apply clear offset to a node's vertical position
*/
var applyClearOffset = (node, offset) => {
	if (offset <= 0 || !node.box) return node;
	const newBox = Object.assign({}, node.box, { top: node.box.top + offset });
	return Object.assign({}, node, { box: newBox });
};
/**
* Attach exclusion geometry to a text node for text wrapping.
* Skip if no floats or if text was split during pagination.
*/
var attachExclusions = (node, floats) => {
	if (floats.length === 0 || node.wasSplit) return node;
	return Object.assign({}, node, { exclusions: floats });
};
/**
* Resolve floats recursively for any node (document, page, view, etc.).
* Runs on the document after resolveDimensions, and per page in relayoutPage.
*/
var resolveFloats = (node) => {
	if (!node.children || node.children.length === 0) return node;
	const nodeChildren = node.children;
	const parentWidth = node.box?.width ?? 0;
	const processedFloats = [];
	const floatEdges = [];
	const children = [];
	let clearOffset = 0;
	for (const child of nodeChildren) {
		if (!child.box) {
			children.push(resolveFloats(child));
			continue;
		}
		if (isFloated(child)) {
			const positioned = positionFloatElement(child, parentWidth);
			processedFloats.push(createExclusion(positioned));
			floatEdges.push(createFloatEdge(positioned));
			children.push(resolveFloats(positioned));
			continue;
		}
		let processedChild = applyClearOffset(child, clearOffset);
		const additionalOffset = applyClear(processedChild, floatEdges);
		if (additionalOffset > 0) {
			clearOffset += additionalOffset;
			processedChild = applyClearOffset(processedChild, additionalOffset);
		}
		if (isText$6(processedChild)) processedChild = attachExclusions(processedChild, processedFloats);
		children.push(resolveFloats(processedChild));
	}
	const box = clearOffset > 0 && node.box ? Object.assign({}, node.box, { height: node.box.height + clearOffset }) : node.box;
	return Object.assign({}, node, {
		box,
		children
	});
};
var getTransformStyle = (s) => (node) => isNil(node.style?.[s]) ? "50%" : node.style?.[s] ?? null;
/**
* Get node origin
*
* @param node
* @returns {{ left?: number, top?: number }} node origin
*/
var getOrigin = (node) => {
	if (!node.box) return null;
	const { left, top, width, height } = node.box;
	const transformOriginX = getTransformStyle("transformOriginX")(node);
	const transformOriginY = getTransformStyle("transformOriginY")(node);
	const percentX = matchPercent(transformOriginX);
	const percentY = matchPercent(transformOriginY);
	const offsetX = percentX ? width * percentX.percent : transformOriginX;
	const offsetY = percentY ? height * percentY.percent : transformOriginY;
	if (isNil(offsetX) || typeof offsetX === "string") throw new Error(`Invalid origin offsetX: ${offsetX}`);
	if (isNil(offsetY) || typeof offsetY === "string") throw new Error(`Invalid origin offsetY: ${offsetY}`);
	return {
		left: left + offsetX,
		top: top + offsetY
	};
};
/**
* Resolve node origin
*
* @param node
* @returns Node with origin attribute
*/
var resolveNodeOrigin = (node) => {
	const origin = getOrigin(node);
	const newNode = Object.assign({}, node, { origin });
	if (!node.children) return newNode;
	const children = node.children.map(resolveNodeOrigin);
	return Object.assign({}, newNode, { children });
};
/**
* Resolve document origins
*
* @param root - Document root
* @returns Document root
*/
var resolveOrigin = (root) => {
	if (!root.children) return root;
	const children = root.children.map(resolveNodeOrigin);
	return Object.assign({}, root, { children });
};
/**
* Normalize bookmark value, expanding a plain string title into a full
* bookmark object with default fit and expanded values
*
* @param bookmark - Bookmark value
* @returns Normalized bookmark object
*/
var getBookmarkValue = (bookmark) => {
	return typeof bookmark === "string" ? {
		title: bookmark,
		fit: false,
		expanded: false
	} : bookmark;
};
/**
* Traverse document tree and resolve bookmark hierarchy, assigning each
* bookmark a ref index and a reference to its nearest bookmark ancestor
*
* @param node - Document node
* @returns Document node with resolved bookmarks
*/
var resolveBookmarks = (node) => {
	let refs = 0;
	const listToExplore = (node.children || []).map((value) => ({
		value,
		parent: null
	}));
	while (listToExplore.length > 0) {
		const element = listToExplore.shift();
		if (!element) break;
		const child = element.value;
		let parent = element.parent;
		if (child.props && "bookmark" in child.props && child.props.bookmark) {
			const bookmark = getBookmarkValue(child.props.bookmark);
			const newHierarchy = {
				ref: refs++,
				parent: parent?.ref,
				...bookmark
			};
			child.props.bookmark = newHierarchy;
			parent = newHierarchy;
		}
		if (child.children) child.children.forEach((childNode) => {
			listToExplore.push({
				value: childNode,
				parent
			});
		});
	}
	return node;
};
var VALID_ORIENTATIONS = ["portrait", "landscape"];
/**
* Get page orientation. Defaults to portrait
*
* @param page - Page object
* @returns Page orientation
*/
var getOrientation = (page) => {
	const value = page.props?.orientation || "portrait";
	return VALID_ORIENTATIONS.includes(value) ? value : "portrait";
};
/**
* Return true if page is landscape
*
* @param page - Page instance
* @returns Is page landscape
*/
var isLandscape = (page) => getOrientation(page) === "landscape";
var PAGE_SIZES = {
	"4A0": [4767.87, 6740.79],
	"2A0": [3370.39, 4767.87],
	A0: [2383.94, 3370.39],
	A1: [1683.78, 2383.94],
	A2: [1190.55, 1683.78],
	A3: [841.89, 1190.55],
	A4: [595.28, 841.89],
	A5: [419.53, 595.28],
	A6: [297.64, 419.53],
	A7: [209.76, 297.64],
	A8: [147.4, 209.76],
	A9: [104.88, 147.4],
	A10: [73.7, 104.88],
	B0: [2834.65, 4008.19],
	B1: [2004.09, 2834.65],
	B2: [1417.32, 2004.09],
	B3: [1000.63, 1417.32],
	B4: [708.66, 1000.63],
	B5: [498.9, 708.66],
	B6: [354.33, 498.9],
	B7: [249.45, 354.33],
	B8: [175.75, 249.45],
	B9: [124.72, 175.75],
	B10: [87.87, 124.72],
	C0: [2599.37, 3676.54],
	C1: [1836.85, 2599.37],
	C2: [1298.27, 1836.85],
	C3: [918.43, 1298.27],
	C4: [649.13, 918.43],
	C5: [459.21, 649.13],
	C6: [323.15, 459.21],
	C7: [229.61, 323.15],
	C8: [161.57, 229.61],
	C9: [113.39, 161.57],
	C10: [79.37, 113.39],
	RA0: [2437.8, 3458.27],
	RA1: [1729.13, 2437.8],
	RA2: [1218.9, 1729.13],
	RA3: [864.57, 1218.9],
	RA4: [609.45, 864.57],
	SRA0: [2551.18, 3628.35],
	SRA1: [1814.17, 2551.18],
	SRA2: [1275.59, 1814.17],
	SRA3: [907.09, 1275.59],
	SRA4: [637.8, 907.09],
	EXECUTIVE: [521.86, 756],
	FOLIO: [612, 936],
	LEGAL: [612, 1008],
	LETTER: [612, 792],
	TABLOID: [792, 1224],
	ID1: [153, 243]
};
/**
* Parses scalar value in value and unit pairs
*
* @param value - Scalar value
* @returns Parsed value
*/
var parseValue = (value) => {
	if (typeof value === "number") return {
		value,
		unit: void 0
	};
	const match = /^(-?\d*\.?\d+)(in|mm|cm|pt|px)?$/g.exec(value);
	return match ? {
		value: parseFloat(match[1]),
		unit: match[2] || "pt"
	} : {
		value,
		unit: void 0
	};
};
/**
* Transform given scalar value to 72dpi equivalent of size
*
* @param value - Styles value
* @param inputDpi - User defined dpi
* @returns Transformed value
*/
var transformUnit = (value, inputDpi) => {
	if (!value || value === "auto") return void 0;
	const scalar = parseValue(value);
	const outputDpi = 72;
	const mmFactor = 1 / 25.4 * outputDpi;
	const cmFactor = 1 / 2.54 * outputDpi;
	if (typeof scalar.value === "string") throw new Error(`Invalid page size: ${value}`);
	switch (scalar.unit) {
		case "in": return scalar.value * outputDpi;
		case "mm": return scalar.value * mmFactor;
		case "cm": return scalar.value * cmFactor;
		case "px": return Math.round(scalar.value * (outputDpi / inputDpi));
		default: return scalar.value;
	}
};
var transformUnits = ({ width, height }, dpi) => {
	const result = { width: transformUnit(width, dpi) || 0 };
	const h = transformUnit(height, dpi);
	if (h !== void 0) result.height = h;
	return result;
};
/**
* Transforms array into size object
*
* @param v - Values array
* @returns Size object with width and height
*/
var toSizeObject = (v) => ({
	width: v[0],
	height: v[1]
});
/**
* Flip size object
*
* @param v - Size object
* @returns Flipped size object
*/
var flipSizeObject = (v) => {
	const result = { width: v.height || 0 };
	if (v.width !== void 0) result.height = v.width;
	return result;
};
/**
* Returns size object from a given string
*
* @param v - Page size string
* @returns Size object with width and height
*/
var getStringSize = (v) => {
	return toSizeObject(PAGE_SIZES[v.toUpperCase()]);
};
/**
* Returns size object from a single number
*
* @param n - Page size number
* @returns Size object with width and height
*/
var getNumberSize = (n) => toSizeObject([n, n]);
/**
* Return page size in an object { width, height }
*
* @param page - Page node
* @returns Size object with width and height
*/
var getSize = (page) => {
	const value = page.props?.size || "A4";
	const dpi = page.props?.dpi || 72;
	let size;
	if (typeof value === "string") size = getStringSize(value);
	else if (Array.isArray(value)) size = transformUnits(toSizeObject(value), dpi);
	else if (typeof value === "number") size = transformUnits(getNumberSize(value), dpi);
	else size = transformUnits(value, dpi);
	return isLandscape(page) ? flipSizeObject(size) : size;
};
/**
* Resolves page size
*
* @param page
* @returns Page with resolved size in style attribute
*/
var resolvePageSize = (page) => {
	const size = getSize(page);
	const style = flatten$1(page.style || {});
	return {
		...page,
		style: {
			...style,
			...size
		}
	};
};
/**
* Resolves page sizes
*
* @param root  -Document root
* @returns Document root with resolved page sizes
*/
var resolvePageSizes = (root) => {
	if (!root.children) return root;
	const children = root.children.map(resolvePageSize);
	return Object.assign({}, root, { children });
};
var isFixed = (node) => {
	if (!node.props) return false;
	return "fixed" in node.props ? node.props.fixed === true : false;
};
/**
* Get Y position of a line at given index, relative to the first line.
* Reads actual line positions so gaps from float exclusion count.
*/
var getLineTop = (lines, index) => {
	if (!lines?.length || index <= 0) return 0;
	const startY = lines[0].box.y;
	if (index < lines.length) return lines[index].box.y - startY;
	const lastLine = lines[lines.length - 1];
	return lastLine.box.y - startY + lastLine.box.height;
};
/**
* Get line index at given height.
*
* @param node
* @param height
*/
var lineIndexAtHeight = (node, height) => {
	if (!node.lines) return 0;
	for (let i = 0; i < node.lines.length; i += 1) if (getLineTop(node.lines, i) + node.lines[i].box.height > height) return i;
	return node.lines.length;
};
/**
* Get height for given text line index.
* Uses actual line y position when available (float wrapping),
* otherwise uses cumulative height calculation.
*
* @param node
* @param index
*/
var heightAtLineIndex = (node, index) => getLineTop(node.lines, index);
var getLineBreak = (node, height) => {
	const top = node.box?.top || 0;
	const widows = node.props.widows || 2;
	const orphans = node.props.orphans || 2;
	const linesQuantity = node.lines.length;
	const slicedLine = lineIndexAtHeight(node, height - top);
	if (slicedLine === 0) return 0;
	if (linesQuantity < orphans) return linesQuantity;
	if (slicedLine < orphans || linesQuantity < orphans + widows) return 0;
	if (linesQuantity === orphans + widows) return orphans;
	if (linesQuantity - slicedLine < widows) return linesQuantity - widows;
	return slicedLine;
};
var splitText = (node, height) => {
	const slicedLineIndex = getLineBreak(node, height);
	const currentHeight = heightAtLineIndex(node, slicedLineIndex);
	const nextHeight = node.box.height - currentHeight;
	return [Object.assign({}, node, {
		box: {
			...node.box,
			height: currentHeight,
			borderBottomWidth: 0
		},
		style: {
			...node.style,
			marginBottom: 0,
			paddingBottom: 0,
			borderBottomWidth: 0,
			borderBottomLeftRadius: 0,
			borderBottomRightRadius: 0
		},
		lines: node.lines.slice(0, slicedLineIndex),
		exclusions: void 0,
		wasSplit: true
	}), Object.assign({}, node, {
		box: {
			...node.box,
			top: 0,
			height: nextHeight,
			borderTopWidth: 0
		},
		style: {
			...node.style,
			marginTop: 0,
			paddingTop: 0,
			borderTopWidth: 0,
			borderTopLeftRadius: 0,
			borderTopRightRadius: 0
		},
		lines: node.lines.slice(slicedLineIndex),
		exclusions: void 0,
		wasSplit: true
	})];
};
var getTop$1 = (node) => node.box?.top || 0;
var hasFixedHeight = (node) => !isNil(node.style?.height);
var splitNode = (node, height) => {
	if (!node) return [null, null];
	const nodeTop = getTop$1(node);
	const current = Object.assign({}, node, {
		box: {
			...node.box,
			borderBottomWidth: 0
		},
		style: {
			...node.style,
			marginBottom: 0,
			paddingBottom: 0,
			borderBottomWidth: 0,
			borderBottomLeftRadius: 0,
			borderBottomRightRadius: 0
		}
	});
	current.style.height = height - nodeTop;
	const nextHeight = hasFixedHeight(node) ? node.box.height - (height - nodeTop) : null;
	const next = Object.assign({}, node, {
		box: {
			...node.box,
			top: 0,
			borderTopWidth: 0
		},
		style: {
			...node.style,
			marginTop: 0,
			paddingTop: 0,
			borderTopWidth: 0,
			borderTopLeftRadius: 0,
			borderTopRightRadius: 0
		},
		props: {
			...node.props,
			bookmark: null
		}
	});
	if (nextHeight) next.style.height = nextHeight;
	return [current, next];
};
var NON_WRAP_TYPES = [
	"SVG",
	Note,
	Image,
	Canvas
];
var getWrap = (node) => {
	if (NON_WRAP_TYPES.includes(node.type)) return false;
	if (!node.props) return true;
	return "wrap" in node.props ? node.props.wrap : true;
};
var getComputedPadding = (node, edge) => {
	const { yogaNode } = node;
	return yogaNode ? yogaNode.getComputedPadding(edge) : null;
};
/**
* Get Yoga computed paddings. Zero otherwise
*
* @param  node
* @returns paddings
*/
var getPadding = (node) => {
	const { style, box } = node;
	return {
		paddingTop: getComputedPadding(node, Edge.Top) || box?.paddingTop || style?.paddingTop || 0,
		paddingRight: getComputedPadding(node, Edge.Right) || box?.paddingRight || style?.paddingRight || 0,
		paddingBottom: getComputedPadding(node, Edge.Bottom) || box?.paddingBottom || style?.paddingBottom || 0,
		paddingLeft: getComputedPadding(node, Edge.Left) || box?.paddingLeft || style?.paddingLeft || 0
	};
};
var getWrapArea = (page) => {
	const height = page.style?.height;
	const { paddingBottom } = getPadding(page);
	return height - paddingBottom;
};
var getContentArea = (page) => {
	const height = page.style?.height;
	const { paddingTop, paddingBottom } = getPadding(page);
	return height - paddingBottom - paddingTop;
};
var getBreak = (node) => "break" in node.props ? node.props.break : false;
var getMinPresenceAhead = (node) => "minPresenceAhead" in node.props ? node.props.minPresenceAhead : 0;
var getFurthestEnd = (elements) => {
	if (elements.length === 0) return null;
	return Math.max(...elements.map((node) => node.box.top + node.box.height));
};
var getEndOfMinPresenceAhead = (child) => {
	return child.box.top + child.box.height + child.box.marginBottom + getMinPresenceAhead(child);
};
var getEndOfPresence = (child, futureElements) => {
	const afterMinPresenceAhead = getEndOfMinPresenceAhead(child);
	const endOfFurthestFutureElement = getFurthestEnd(futureElements.filter((node) => !("fixed" in node.props)));
	if (endOfFurthestFutureElement === null) return afterMinPresenceAhead;
	return Math.min(afterMinPresenceAhead, endOfFurthestFutureElement);
};
var shouldBreak = (child, futureElements, height, previousElements) => {
	if ("fixed" in child.props) return false;
	const shouldSplit = height < child.box.top + child.box.height;
	const canWrap = getWrap(child);
	const endOfPresence = getEndOfPresence(child, futureElements);
	const breakingImprovesPresence = previousElements.filter((node) => !isFixed(node)).length > 0;
	return getBreak(child) || shouldSplit && !canWrap || !shouldSplit && endOfPresence > height && breakingImprovesPresence;
};
var IGNORABLE_CODEPOINTS = [
	8232,
	8233,
	8288
];
var buildSubsetForFont = (font) => IGNORABLE_CODEPOINTS.reduce((acc, codePoint) => {
	if (font && font.hasGlyphForCodePoint && font.hasGlyphForCodePoint(codePoint)) return acc;
	return [...acc, String.fromCharCode(codePoint)];
}, []);
var ignoreChars = (fragments) => fragments.map((fragment) => {
	const charSubset = buildSubsetForFont(fragment.attributes.font[0]);
	const subsetRegex = new RegExp(charSubset.join("|"));
	return {
		string: fragment.string.replace(subsetRegex, ""),
		attributes: fragment.attributes
	};
});
var PREPROCESSORS = [ignoreChars, embedEmojis];
var isImage$1 = (node) => node.type === Image;
var isRasterImage = (node) => !!node.image && node.image.format !== "svg";
var isTextInstance$2 = (node) => node.type === TextInstance;
/**
* Get textkit fragments of given node object
*
* @param fontStore - Font store
* @param instance - Node
* @param parentLink - Parent link
* @param level - Fragment level
* @returns Text fragments
*/
var getFragments = (fontStore, instance, parentLink = null, level = 0) => {
	if (!instance) return [{ string: "" }];
	let fragments = [];
	const { color = "black", direction = "ltr", fontFamily = "Helvetica", fontWeight, fontStyle, fontSize = 18, fontFeatureSettings, textAlign, lineHeight, textDecoration, textDecorationColor, textDecorationStyle, textTransform, letterSpacing, textIndent, opacity, verticalAlign } = instance.style;
	const fontFamilies = typeof fontFamily === "string" ? [fontFamily] : [...fontFamily || []];
	fontFamilies.push("Helvetica");
	const attributes = {
		font: fontFamilies.map((fontFamilyName) => {
			const opts = {
				fontFamily: fontFamilyName,
				fontWeight,
				fontStyle
			};
			return fontStore.getFont(opts)?.data;
		}),
		color,
		opacity,
		fontSize,
		lineHeight,
		direction,
		verticalAlign,
		backgroundColor: level === 0 ? null : instance.style.backgroundColor,
		indent: textIndent,
		characterSpacing: letterSpacing,
		strikeStyle: textDecorationStyle,
		underlineStyle: textDecorationStyle,
		underline: textDecoration === "underline" || textDecoration === "underline line-through" || textDecoration === "line-through underline",
		strike: textDecoration === "line-through" || textDecoration === "underline line-through" || textDecoration === "line-through underline",
		strikeColor: textDecorationColor || color,
		underlineColor: textDecorationColor || color,
		link: parentLink || instance.props?.src || instance.props?.href,
		align: textAlign || (direction === "rtl" ? "right" : "left"),
		features: fontFeatureSettings
	};
	for (let i = 0; i < instance.children.length; i += 1) {
		const child = instance.children[i];
		if (isImage$1(child) && isRasterImage(child)) fragments.push({
			string: String.fromCharCode(65532),
			attributes: {
				...attributes,
				attachment: {
					width: child.style.width || fontSize,
					height: child.style.height || fontSize,
					image: child.image.data
				}
			}
		});
		else if (isTextInstance$2(child)) fragments.push({
			string: transformText(child.value, textTransform),
			attributes
		});
		else if (child && !isImage$1(child)) fragments.push(...getFragments(fontStore, child, attributes.link, level + 1));
	}
	for (let i = 0; i < PREPROCESSORS.length; i += 1) {
		const preprocessor = PREPROCESSORS[i];
		fragments = preprocessor(fragments);
	}
	return fragments;
};
/**
* Get textkit attributed string from text node
*
* @param fontStore - Font store
* @param instance Node
* @returns Attributed string
*/
var getAttributedString = (fontStore, instance) => {
	return fromFragments(getFragments(fontStore, instance));
};
var engine = layoutEngine({
	bidi: bidiEngine,
	linebreaker,
	justification,
	textDecoration,
	scriptItemizer,
	wordHyphenation,
	fontSubstitution
});
var getMaxLines = (node) => node.style?.maxLines;
var getTextOverflow = (node) => node.style?.textOverflow;
/**
* Generate exclusion shapes from node exclusions for textkit,
* in coordinates relative to the text container.
*/
var getExclusions = (node) => {
	const exclusions = node.exclusions;
	if (!exclusions || exclusions.length === 0) return void 0;
	const offsetY = (node.box?.top ?? 0) + (node.box?.paddingTop ?? 0);
	return exclusions.map((exclusion) => {
		if (exclusion.type === "ellipse") return {
			...exclusion,
			cy: exclusion.cy - offsetY
		};
		if (exclusion.type === "polygon") return {
			...exclusion,
			points: exclusion.points.map((p) => ({
				x: p.x,
				y: p.y - offsetY
			}))
		};
		return {
			...exclusion,
			y: exclusion.y - offsetY
		};
	});
};
/**
* Get layout container for specific text node
*
* @param {number} width
* @param {number} height
* @param {Object} node
* @returns {Object} layout container
*/
var getContainer = (width, height, node) => {
	const maxLines = getMaxLines(node);
	const textOverflow = getTextOverflow(node);
	return {
		x: 0,
		y: 0,
		width,
		maxLines,
		height: height || Infinity,
		truncateMode: textOverflow,
		exclusions: getExclusions(node)
	};
};
/**
* Get text layout options for specific text node
*
* @param {Object} node instance
* @returns {Object} layout options
*/
var getLayoutOptions = (fontStore, node) => ({
	hyphenationPenalty: node.props.hyphenationPenalty,
	shrinkWhitespaceFactor: {
		before: -.5,
		after: -.5
	},
	hyphenationCallback: node.props.hyphenationCallback || fontStore?.getHyphenationCallback() || null
});
/**
* Get text lines for given node
*
* @param node - Node
* @param width - Container width
* @param height - Container height
* @param fontStore - Font store
* @returns Layout lines
*/
var layoutText = (node, width, height, fontStore) => {
	return engine(getAttributedString(fontStore, node), getContainer(width, height, node), getLayoutOptions(fontStore, node)).reduce((acc, line) => [...acc, ...line], []);
};
var isSvg$2 = (node) => node.type === "SVG";
var isText$5 = (node) => node.type === Text;
var shouldIterate = (node) => !isSvg$2(node) && !isText$5(node);
/**
* Check if text node needs layout.
* Re-layout is needed if no lines calculated yet or has exclusions.
*/
var shouldLayoutText = (node) => isText$5(node) && (!node.lines || (node.exclusions?.length ?? 0) > 0);
/**
* Performs text layout on text node if wasn't calculated before.
* Text layout is usually performed on Yoga's layout process (via setMeasureFunc),
* but we need to layout those nodes with fixed width and height.
*
* @param node
* @returns Layout node
*/
var resolveTextLayout = (node, fontStore) => {
	if (shouldLayoutText(node)) node.lines = layoutText(node, node.box.width - node.box.paddingRight - node.box.paddingLeft, node.exclusions?.length ? Infinity : node.box.height - node.box.paddingTop - node.box.paddingBottom, fontStore);
	if (shouldIterate(node)) {
		if (!node.children) return node;
		const mapChild = (child) => resolveTextLayout(child, fontStore);
		const children = node.children.map(mapChild);
		return Object.assign({}, node, { children });
	}
	return node;
};
var BASE_INHERITABLE_PROPERTIES = [
	"color",
	"fontFamily",
	"fontSize",
	"fontStyle",
	"fontWeight",
	"fontFeatureSettings",
	"letterSpacing",
	"opacity",
	"textDecoration",
	"textTransform",
	"lineHeight",
	"textAlign",
	"visibility",
	"wordSpacing"
];
var TEXT_INHERITABLE_PROPERTIES = [...BASE_INHERITABLE_PROPERTIES, "backgroundColor"];
var isType$2 = (type) => (node) => node.type === type;
var isSvg$1 = isType$2("SVG");
var isText$4 = isType$2(Text);
var mergeValues = (styleName, value, inheritedValue) => {
	switch (styleName) {
		case "textDecoration": return [inheritedValue, value].filter((v) => v && v !== "none").join(" ");
		default: return value;
	}
};
var merge = (inheritedStyles, style) => {
	const mergedStyles = { ...inheritedStyles };
	Object.entries(style).forEach(([styleName, value]) => {
		mergedStyles[styleName] = mergeValues(styleName, value, inheritedStyles[styleName]);
	});
	return mergedStyles;
};
/**
* Merges styles with node
*
* @param inheritedStyles - Style object
* @returns Merge styles function
*/
var mergeStyles = (inheritedStyles) => (node) => {
	const style = merge(inheritedStyles, node.style || {});
	return Object.assign({}, node, { style });
};
/**
* Inherit style values from the root to the leafs
*
* @param node - Document root
* @returns Document root with inheritance
*
*/
var resolveInheritance = (node) => {
	if (isSvg$1(node)) return node;
	if (!("children" in node)) return node;
	const inheritableProperties = isText$4(node) ? TEXT_INHERITABLE_PROPERTIES : BASE_INHERITABLE_PROPERTIES;
	const inheritStyles = pick(inheritableProperties, node.style || {});
	const resolveChild = compose(resolveInheritance, mergeStyles(inheritStyles));
	const children = node.children.map(resolveChild);
	return Object.assign({}, node, { children });
};
var getComputedMargin = (node, edge) => {
	const { yogaNode } = node;
	return yogaNode ? yogaNode.getComputedMargin(edge) : null;
};
/**
* Get Yoga computed magins. Zero otherwise
*
* @param node
* @returns Margins
*/
var getMargin = (node) => {
	const { style, box } = node;
	return {
		marginTop: getComputedMargin(node, Edge.Top) || box?.marginTop || style?.marginTop || 0,
		marginRight: getComputedMargin(node, Edge.Right) || box?.marginRight || style?.marginRight || 0,
		marginBottom: getComputedMargin(node, Edge.Bottom) || box?.marginBottom || style?.marginBottom || 0,
		marginLeft: getComputedMargin(node, Edge.Left) || box?.marginLeft || style?.marginLeft || 0
	};
};
/**
* Get Yoga computed position. Zero otherwise
*
* @param node
* @returns Position
*/
var getPosition = (node) => {
	const { yogaNode } = node;
	return {
		top: yogaNode?.getComputedTop() || 0,
		right: yogaNode?.getComputedRight() || 0,
		bottom: yogaNode?.getComputedBottom() || 0,
		left: yogaNode?.getComputedLeft() || 0
	};
};
var DEFAULT_DIMENSION = {
	width: 0,
	height: 0
};
/**
* Get Yoga computed dimensions. Zero otherwise
*
* @param node
* @returns Dimensions
*/
var getDimension = (node) => {
	const { yogaNode } = node;
	if (!yogaNode) return DEFAULT_DIMENSION;
	return {
		width: yogaNode.getComputedWidth(),
		height: yogaNode.getComputedHeight()
	};
};
var getComputedBorder = (yogaNode, edge) => yogaNode ? yogaNode.getComputedBorder(edge) : 0;
/**
* Get Yoga computed border width. Zero otherwise
*
* @param node
* @returns Border widths
*/
var getBorderWidth = (node) => {
	const { yogaNode } = node;
	return {
		borderTopWidth: getComputedBorder(yogaNode, Edge.Top),
		borderRightWidth: getComputedBorder(yogaNode, Edge.Right),
		borderBottomWidth: getComputedBorder(yogaNode, Edge.Bottom),
		borderLeftWidth: getComputedBorder(yogaNode, Edge.Left)
	};
};
/**
* Set display attribute to node's Yoga instance
*
* @param value - Display
* @returns Node instance wrapper
*/
var setDisplay = (value) => (node) => {
	const { yogaNode } = node;
	if (yogaNode) yogaNode.setDisplay(value === "none" ? Display.None : Display.Flex);
	return node;
};
var OVERFLOW = {
	hidden: Overflow.Hidden,
	scroll: Overflow.Scroll
};
/**
* Set overflow attribute to node's Yoga instance
*
* @param value - Overflow value
* @returns Node instance wrapper
*/
var setOverflow = (value) => (node) => {
	const { yogaNode } = node;
	if (!isNil(value) && yogaNode) {
		const overflow = OVERFLOW[value] || Overflow.Visible;
		yogaNode.setOverflow(overflow);
	}
	return node;
};
var FLEX_WRAP = {
	wrap: Wrap.Wrap,
	"wrap-reverse": Wrap.WrapReverse
};
/**
* Set flex wrap attribute to node's Yoga instance
*
* @param value - Flex wrap value
* @returns Node instance wrapper
*/
var setFlexWrap = (value) => (node) => {
	const { yogaNode } = node;
	if (yogaNode) {
		const flexWrap = FLEX_WRAP[value] || Wrap.NoWrap;
		yogaNode.setFlexWrap(flexWrap);
	}
	return node;
};
/**
* Set generic yoga attribute to node's Yoga instance, handing `auto`, edges and percentage cases
*
* @param attr - Property
* @param edge - Edge
* @returns Node instance wrapper
*/
var setYogaValue = (attr, edge) => (value) => (node) => {
	const { yogaNode } = node;
	if (!isNil(value) && yogaNode) {
		const hasEdge = !isNil(edge);
		const fixedMethod = `set${upperFirst(attr)}`;
		const autoMethod = `${fixedMethod}Auto`;
		const percentMethod = `${fixedMethod}Percent`;
		const percent = matchPercent(value);
		if (percent && !yogaNode[percentMethod]) throw new Error(`You can't pass percentage values to ${attr} property`);
		if (percent) {
			if (hasEdge) yogaNode[percentMethod]?.(edge, percent.value);
			else yogaNode[percentMethod]?.(percent.value);
		} else if (value === "auto") {
			if (hasEdge) yogaNode[autoMethod]?.(edge);
			else yogaNode[autoMethod]?.();
		} else if (hasEdge) yogaNode[fixedMethod]?.(edge, value);
		else yogaNode[fixedMethod]?.(value);
	}
	return node;
};
/**
* Set flex grow attribute to node's Yoga instance
*
* @param  value - Flex grow value
* @returns Node instance wrapper
*/
var setFlexGrow = (value) => (node) => {
	return setYogaValue("flexGrow")(value || 0)(node);
};
/**
* Set flex basis attribute to node's Yoga instance
*
* @param flex - Basis value
* @param node - Node instance
* @returns Node instance
*/
var setFlexBasis = setYogaValue("flexBasis");
var ALIGN = {
	"flex-start": Align.FlexStart,
	center: Align.Center,
	"flex-end": Align.FlexEnd,
	stretch: Align.Stretch,
	baseline: Align.Baseline,
	"space-between": Align.SpaceBetween,
	"space-around": Align.SpaceAround,
	"space-evenly": Align.SpaceEvenly
};
/**
* Set generic align attribute to node's Yoga instance
*
* @param attr - Specific align property
* @param value - Specific align value
* @param node - Node
* @returns Node
*/
var setAlign = (attr) => (value) => (node) => {
	const { yogaNode } = node;
	const defaultValue = attr === "items" ? Align.Stretch : Align.Auto;
	if (yogaNode) {
		const align = ALIGN[value] || defaultValue;
		yogaNode[`setAlign${upperFirst(attr)}`](align);
	}
	return node;
};
/**
* Set align self attribute to node's Yoga instance
*
* @param align - Value
* @param node - Node instance
* @returns Node instance
*/
var setAlignSelf = setAlign("self");
/**
* Set align items attribute to node's Yoga instance
*
* @param align - Value
* @param node - Node instance
* @returns Node instance
*/
var setAlignItems = setAlign("items");
/**
* Set flex shrink attribute to node's Yoga instance
*
* @param value - Flex shrink value
* @returns Node instance wrapper
*/
var setFlexShrink = (value) => (node) => {
	return setYogaValue("flexShrink")(value || 1)(node);
};
/**
* Set aspect ratio attribute to node's Yoga instance
*
* @param value - Ratio
* @returns Node instance
*/
var setAspectRatio = (value) => (node) => {
	const { yogaNode } = node;
	if (!isNil(value) && yogaNode) yogaNode.setAspectRatio(value);
	return node;
};
/**
* Set align content attribute to node's Yoga instance
*
* @param align - Value
* @param node - Instance
* @returns Node instance
*/
var setAlignContent = setAlign("content");
var POSITION = {
	absolute: PositionType.Absolute,
	relative: PositionType.Relative,
	static: PositionType.Static
};
/**
* Set position type attribute to node's Yoga instance
*
* @param value - Position position type
* @returns Node instance
*/
var setPositionType = (value) => (node) => {
	const { yogaNode } = node;
	if (!isNil(value) && yogaNode) yogaNode.setPositionType(POSITION[value]);
	return node;
};
var FLEX_DIRECTIONS = {
	row: FlexDirection.Row,
	"row-reverse": FlexDirection.RowReverse,
	"column-reverse": FlexDirection.ColumnReverse
};
/**
* Set flex direction attribute to node's Yoga instance
*
* @param value - Flex direction value
* @returns Node instance wrapper
*/
var setFlexDirection = (value) => (node) => {
	const { yogaNode } = node;
	if (yogaNode) {
		const flexDirection = FLEX_DIRECTIONS[value] || FlexDirection.Column;
		yogaNode.setFlexDirection(flexDirection);
	}
	return node;
};
var JUSTIFY_CONTENT = {
	center: Justify.Center,
	"flex-end": Justify.FlexEnd,
	"space-between": Justify.SpaceBetween,
	"space-around": Justify.SpaceAround,
	"space-evenly": Justify.SpaceEvenly
};
/**
* Set justify content attribute to node's Yoga instance
*
* @param value - Justify content value
* @returns Node instance wrapper
*/
var setJustifyContent = (value) => (node) => {
	const { yogaNode } = node;
	if (!isNil(value) && yogaNode) {
		const justifyContent = JUSTIFY_CONTENT[value] || Justify.FlexStart;
		yogaNode.setJustifyContent(justifyContent);
	}
	return node;
};
/**
* Set margin top attribute to node's Yoga instance
*
* @param margin - Margin top
* @param node - Node instance
* @returns Node instance
*/
var setMarginTop = setYogaValue("margin", Edge.Top);
/**
* Set margin right attribute to node's Yoga instance
*
* @param margin - Margin right
* @param node - Node instance
* @returns Node instance
*/
var setMarginRight = setYogaValue("margin", Edge.Right);
/**
* Set margin bottom attribute to node's Yoga instance
*
* @param margin - Margin bottom
* @param node - Node instance
* @returns Node instance
*/
var setMarginBottom = setYogaValue("margin", Edge.Bottom);
/**
* Set margin left attribute to node's Yoga instance
*
* @param margin - Margin left
* @param node - Node instance
* @returns Node instance
*/
var setMarginLeft = setYogaValue("margin", Edge.Left);
/**
* Set padding top attribute to node's Yoga instance
*
* @param padding - Padding top
* @param node - Node instance
* @returns Node instance
*/
var setPaddingTop = setYogaValue("padding", Edge.Top);
/**
* Set padding right attribute to node's Yoga instance
*
* @param padding - Padding right
* @param node - Node instance
* @returns Node instance
*/
var setPaddingRight = setYogaValue("padding", Edge.Right);
/**
* Set padding bottom attribute to node's Yoga instance
*
* @param padding - Padding bottom
* @param node Node instance
* @returns Node instance
*/
var setPaddingBottom = setYogaValue("padding", Edge.Bottom);
/**
* Set padding left attribute to node's Yoga instance
*
* @param padding - Padding left
* @param node - Node instance
* @returns Node instance
*/
var setPaddingLeft = setYogaValue("padding", Edge.Left);
/**
* Set border top attribute to node's Yoga instance
*
* @param border - Border top width
* @param node - Node instance
* @returns Node instance
*/
var setBorderTop = setYogaValue("border", Edge.Top);
/**
* Set border right attribute to node's Yoga instance
*
* @param border - Border right width
* @param node - Node instance
* @returns Node instance
*/
var setBorderRight = setYogaValue("border", Edge.Right);
/**
* Set border bottom attribute to node's Yoga instance
*
* @param border - Border bottom width
* @param node - Node instance
* @returns Node instance
*/
var setBorderBottom = setYogaValue("border", Edge.Bottom);
/**
* Set border left attribute to node's Yoga instance
*
* @param border - Border left width
* @param node - Node instance
* @returns Node instance
*/
var setBorderLeft = setYogaValue("border", Edge.Left);
/**
* Set position top attribute to node's Yoga instance
*
* @param position - Position top
* @param node - Node instance
* @returns Node instance
*/
var setPositionTop = setYogaValue("position", Edge.Top);
/**
* Set position right attribute to node's Yoga instance
*
* @param position - Position right
* @param node - Node instance
* @returns Node instance
*/
var setPositionRight = setYogaValue("position", Edge.Right);
/**
* Set position bottom attribute to node's Yoga instance
*
* @param position - Position bottom
* @param node - Node instance
* @returns Node instance
*/
var setPositionBottom = setYogaValue("position", Edge.Bottom);
/**
* Set position left attribute to node's Yoga instance
*
* @param position - Position left
* @param node - Node instance
* @returns Node instance
*/
var setPositionLeft = setYogaValue("position", Edge.Left);
/**
* Set width to node's Yoga instance
*
* @param width - Width
* @param node - Node instance
* @returns Node instance
*/
var setWidth = setYogaValue("width");
/**
* Set min width to node's Yoga instance
*
* @param min - Width
* @param node - Node instance
* @returns Node instance
*/
var setMinWidth = setYogaValue("minWidth");
/**
* Set max width to node's Yoga instance
*
* @param max - Width
* @param node - Node instance
* @returns Node instance
*/
var setMaxWidth = setYogaValue("maxWidth");
/**
* Set height to node's Yoga instance
*
* @param height - Height
* @param node - Node instance
* @returns Node instance
*/
var setHeight = setYogaValue("height");
/**
* Set min height to node's Yoga instance
*
* @param min - Height
* @param node - Node instance
* @returns Node instance
*/
var setMinHeight = setYogaValue("minHeight");
/**
* Set max height to node's Yoga instance
*
* @param max - Height
* @param node - Node instance
* @returns Node instance
*/
var setMaxHeight = setYogaValue("maxHeight");
/**
* Set rowGap value to node's Yoga instance
*
* @param value - Gap value
* @returns Node instance wrapper
*/
var setRowGap = setYogaValue("gap", Gutter.Row);
/**
* Set columnGap value to node's Yoga instance
*
* @param value - Gap value
* @returns Node instance wrapper
*/
var setColumnGap = setYogaValue("gap", Gutter.Column);
var getAspectRatio = (viewbox) => {
	if (!viewbox) return null;
	if (typeof viewbox === "string") return null;
	return (viewbox.maxX - viewbox.minX) / (viewbox.maxY - viewbox.minY);
};
/**
* Yoga svg measure function
*
* @param page
* @param node
* @returns Measure svg
*/
var measureCanvas$1 = (page, node) => (width, widthMode, height, heightMode) => {
	const aspectRatio = getAspectRatio(node.props.viewBox) || 1;
	if (widthMode === MeasureMode.Exactly || widthMode === MeasureMode.AtMost) return {
		width,
		height: width / aspectRatio
	};
	if (heightMode === MeasureMode.Exactly) return { width: height * aspectRatio };
	return {};
};
/**
* Get lines width (if any)
*
* @param node
* @returns Lines width
*/
var linesWidth = (node) => {
	if (!node.lines) return 0;
	return Math.max(0, ...node.lines.map((line) => line.xAdvance));
};
/**
* Get lines height (if any)
*
* @param node
* @returns Lines height
*/
var linesHeight = (node) => {
	if (!node.lines) return -1;
	return node.lines.reduce((acc, line) => acc + line.box.height, 0);
};
var ALIGNMENT_FACTORS = {
	center: .5,
	right: 1
};
/**
* Yoga text measure function
*
* @param page
* @param node
* @param fontStore
* @returns {MeasureText} measure text function
*/
var measureText = (page, node, fontStore) => (width, widthMode, height) => {
	if (widthMode === MeasureMode.Exactly) {
		if (!node.lines) node.lines = layoutText(node, width, height, fontStore);
		return {
			height: linesHeight(node),
			width
		};
	}
	if (widthMode === MeasureMode.AtMost) {
		const alignFactor = ALIGNMENT_FACTORS[node.style?.textAlign] || 0;
		if (!node.lines) {
			node.lines = layoutText(node, width, height, fontStore);
			node.alignOffset = (width - linesWidth(node)) * alignFactor;
		}
		return {
			height: linesHeight(node),
			width: Math.min(width, linesWidth(node))
		};
	}
	return {};
};
/**
* Get image ratio
*
* @param node - Image node
* @returns Image ratio
*/
var getRatio = (node) => {
	return node.image?.data ? node.image.width / node.image.height : 1;
};
/**
* Checks if page has auto height
*
* @param page
* @returns Is page height auto
*/
var isHeightAuto = (page) => isNil(page.box?.height);
var SAFETY_HEIGHT$1 = 10;
/**
* Yoga image measure function
*
* @param page - Page
* @param node - Node
* @returns Measure image
*/
var measureImage = (page, node) => (width, widthMode, height, heightMode) => {
	const imageRatio = getRatio(node);
	const imageMargin = getMargin(node);
	const pagePadding = getPadding(page);
	const pageArea = isHeightAuto(page) ? Infinity : (page.box?.height || 0) - pagePadding.paddingTop - pagePadding.paddingBottom - imageMargin.marginTop - imageMargin.marginBottom - SAFETY_HEIGHT$1;
	if (!node.image) return {
		width: 0,
		height: 0
	};
	if (widthMode === MeasureMode.Exactly && heightMode === MeasureMode.Undefined) {
		const scaledHeight = width / imageRatio;
		return { height: Math.min(pageArea, scaledHeight) };
	}
	if (heightMode === MeasureMode.Exactly && (widthMode === MeasureMode.AtMost || widthMode === MeasureMode.Undefined)) return { width: Math.min(height * imageRatio, width) };
	if (widthMode === MeasureMode.Exactly && heightMode === MeasureMode.AtMost) {
		const scaledHeight = width / imageRatio;
		return { height: Math.min(height, pageArea, scaledHeight) };
	}
	if (widthMode === MeasureMode.AtMost && heightMode === MeasureMode.AtMost) {
		if (imageRatio > 1) return {
			width,
			height: Math.min(width / imageRatio, height)
		};
		return {
			height,
			width: Math.min(height * imageRatio, width)
		};
	}
	return {
		height,
		width
	};
};
var SAFETY_HEIGHT = 10;
var getMax = (values) => Math.max(-Infinity, ...values);
/**
* Helper object to predict canvas size
* TODO: Implement remaining functions (as close as possible);
*/
var measureCtx = () => {
	const ctx = {};
	const points = [];
	const nil = () => ctx;
	const addPoint = (x, y) => points.push([x, y]);
	const moveTo = (x, y) => {
		addPoint(x, y);
		return ctx;
	};
	const rect = (x, y, w, h) => {
		addPoint(x, y);
		addPoint(x + w, y);
		addPoint(x, y + h);
		addPoint(x + w, y + h);
		return ctx;
	};
	const ellipse = (x, y, rx, ry) => {
		ry = ry || rx;
		addPoint(x - rx, y - ry);
		addPoint(x + rx, y - ry);
		addPoint(x + rx, y + ry);
		addPoint(x - rx, y + ry);
		return ctx;
	};
	const polygon = (...pts) => {
		points.push(...pts);
		return ctx;
	};
	ctx.rect = rect;
	ctx.moveTo = moveTo;
	ctx.lineTo = moveTo;
	ctx.circle = ellipse;
	ctx.polygon = polygon;
	ctx.ellipse = ellipse;
	ctx.roundedRect = rect;
	ctx.text = nil;
	ctx.path = nil;
	ctx.lineWidth = nil;
	ctx.bezierCurveTo = nil;
	ctx.quadraticCurveTo = nil;
	ctx.scale = nil;
	ctx.rotate = nil;
	ctx.translate = nil;
	ctx.dash = nil;
	ctx.clip = nil;
	ctx.save = nil;
	ctx.fill = nil;
	ctx.font = nil;
	ctx.stroke = nil;
	ctx.lineCap = nil;
	ctx.opacity = nil;
	ctx.restore = nil;
	ctx.lineJoin = nil;
	ctx.fontSize = nil;
	ctx.fillColor = nil;
	ctx.miterLimit = nil;
	ctx.strokeColor = nil;
	ctx.fillOpacity = nil;
	ctx.strokeOpacity = nil;
	ctx.linearGradient = nil;
	ctx.radialGradient = nil;
	ctx.getWidth = () => getMax(points.map((p) => p[0]));
	ctx.getHeight = () => getMax(points.map((p) => p[1]));
	return ctx;
};
/**
* @typedef {Function} MeasureCanvas
* @returns {{ width: number, height: number }} canvas width and height
*/
/**
* Yoga canvas measure function
*
* @param {Object} page
* @param {Object} node
* @returns {MeasureCanvas} measure canvas
*/
var measureCanvas = (page, node) => () => {
	const imageMargin = getMargin(node);
	const pagePadding = getPadding(page);
	const pageArea = isHeightAuto(page) ? Infinity : (page.box?.height || 0) - pagePadding.paddingTop - pagePadding.paddingBottom - imageMargin.marginTop - imageMargin.marginBottom - SAFETY_HEIGHT;
	const ctx = measureCtx();
	node.props.paint(ctx);
	return {
		width: ctx.getWidth(),
		height: Math.min(pageArea, ctx.getHeight())
	};
};
var isType$1 = (type) => (node) => node.type === type;
var isSvg = isType$1("SVG");
var isText$3 = isType$1(Text);
var isNote = isType$1(Note);
var isPage = isType$1(Page);
var isImage = isType$1(Image);
var isCanvas = isType$1(Canvas);
var isTextInstance$1 = isType$1(TextInstance);
var setNodeHeight = (node) => {
	return setHeight(isPage(node) ? node.box?.height : node.style?.height);
};
/**
* Set styles valeus into yoga node before layout calculation
*
* @param node
*/
var setYogaValues = (node) => {
	compose(setNodeHeight(node), setWidth(node.style.width), setMinWidth(node.style.minWidth), setMaxWidth(node.style.maxWidth), setMinHeight(node.style.minHeight), setMaxHeight(node.style.maxHeight), setMarginTop(node.style.marginTop), setMarginRight(node.style.marginRight), setMarginBottom(node.style.marginBottom), setMarginLeft(node.style.marginLeft), setPaddingTop(node.style.paddingTop), setPaddingRight(node.style.paddingRight), setPaddingBottom(node.style.paddingBottom), setPaddingLeft(node.style.paddingLeft), setPositionType(node.style.position), setPositionTop(node.style.top), setPositionRight(node.style.right), setPositionBottom(node.style.bottom), setPositionLeft(node.style.left), setBorderTop(node.style.borderTopWidth), setBorderRight(node.style.borderRightWidth), setBorderBottom(node.style.borderBottomWidth), setBorderLeft(node.style.borderLeftWidth), setDisplay(node.style.display), setFlexDirection(node.style.flexDirection), setAlignSelf(node.style.alignSelf), setAlignContent(node.style.alignContent), setAlignItems(node.style.alignItems), setJustifyContent(node.style.justifyContent), setFlexWrap(node.style.flexWrap), setOverflow(node.style.overflow), setAspectRatio(node.style.aspectRatio), setFlexBasis(node.style.flexBasis), setFlexGrow(node.style.flexGrow), setFlexShrink(node.style.flexShrink), setRowGap(node.style.rowGap), setColumnGap(node.style.columnGap))(node);
};
/**
* Inserts child into parent' yoga node
*
* @param parent parent
* @returns Insert yoga nodes
*/
var insertYogaNodes = (parent) => (child) => {
	parent.insertChild(child.yogaNode, parent.getChildCount());
	return child;
};
var setMeasureFunc = (node, page, fontStore) => {
	const { yogaNode } = node;
	if (isText$3(node)) yogaNode.setMeasureFunc(measureText(page, node, fontStore));
	if (isImage(node)) yogaNode.setMeasureFunc(measureImage(page, node));
	if (isCanvas(node)) yogaNode.setMeasureFunc(measureCanvas(page, node));
	if (isSvg(node)) yogaNode.setMeasureFunc(measureCanvas$1(page, node));
	return node;
};
var isLayoutElement = (node) => !isText$3(node) && !isNote(node) && !isSvg(node);
/**
* @typedef {Function} CreateYogaNodes
* @param {Object} node
* @returns {Object} node with appended yoga node
*/
/**
* Creates and add yoga node to document tree
* Handles measure function for text and image nodes
*
* @returns Create yoga nodes
*/
var createYogaNodes = (page, fontStore, yoga) => (node) => {
	const yogaNode = yoga.node.create();
	const result = Object.assign({}, node, { yogaNode });
	setYogaValues(result);
	if (isLayoutElement(node) && node.children) {
		const resolveChild = compose(insertYogaNodes(yogaNode), createYogaNodes(page, fontStore, yoga));
		result.children = node.children.map(resolveChild);
	}
	setMeasureFunc(result, page, fontStore);
	return result;
};
/**
* Performs yoga calculation
*
* @param page - Page node
* @returns Page node
*/
var calculateLayout = (page) => {
	page.yogaNode.calculateLayout();
	return page;
};
/**
* Saves Yoga layout result into 'box' attribute of node
*
* @param node
* @returns Node with box data
*/
var persistDimensions = (node) => {
	if (isTextInstance$1(node)) return node;
	const box = Object.assign(getPadding(node), getMargin(node), getBorderWidth(node), getPosition(node), getDimension(node));
	const newNode = Object.assign({}, node, { box });
	if (!node.children) return newNode;
	const children = node.children.map(persistDimensions);
	return Object.assign({}, newNode, { children });
};
/**
* Removes yoga node from document tree
*
* @param node
* @returns Node without yoga node
*/
var destroyYogaNodes = (node) => {
	const newNode = Object.assign({}, node);
	delete newNode.yogaNode;
	if (!node.children) return newNode;
	const children = node.children.map(destroyYogaNodes);
	return Object.assign({}, newNode, { children });
};
/**
* Free yoga node from document tree
*
* @param node
* @returns Node without yoga node
*/
var freeYogaNodes = (node) => {
	if (node.yogaNode) node.yogaNode.freeRecursive();
	return node;
};
/**
* Calculates page object layout using Yoga.
* Takes node values from 'box' and 'style' attributes, and persist them back into 'box'
* Destroy yoga values at the end.
*
* @param page - Object
* @returns Page object with correct 'box' layout attributes
*/
var resolvePageDimensions = (page, fontStore, yoga) => {
	if (isNil(page)) return null;
	return compose(destroyYogaNodes, freeYogaNodes, persistDimensions, calculateLayout, createYogaNodes(page, fontStore, yoga))(page);
};
/**
* Calculates root object layout using Yoga.
*
* @param node - Root object
* @param fontStore - Font store
* @returns Root object with correct 'box' layout attributes
*/
var resolveDimensions = (node, fontStore) => {
	if (!node.children) return node;
	const resolveChild = (child) => resolvePageDimensions(child, fontStore, node.yoga);
	const children = node.children.map(resolveChild);
	return Object.assign({}, node, { children });
};
var relayoutPage = compose(resolveTextLayout, resolveFloats, resolvePageDimensions, resolveInheritance, resolvePageStyles);
var isText$2 = (node) => node.type === Text;
var SAFETY_THRESHOLD = .001;
var assingChildren = (children, node) => Object.assign({}, node, { children });
var getTop = (node) => node.box?.top || 0;
var allFixed = (nodes) => nodes.every(isFixed);
var isDynamic$1 = (node) => node.props && "render" in node.props;
var warnUnavailableSpace = (node) => {
	console.warn(`Node of type ${node.type} can't wrap between pages and it's bigger than available page height`);
};
var splitNodes = (height, contentArea, nodes) => {
	const currentChildren = [];
	const nextChildren = [];
	for (let i = 0; i < nodes.length; i += 1) {
		const child = nodes[i];
		const futureNodes = nodes.slice(i + 1);
		const futureFixedNodes = futureNodes.filter(isFixed);
		const nodeTop = getTop(child);
		const nodeHeight = child.box.height;
		const isOutside = height <= nodeTop;
		const shouldBreak$1 = shouldBreak(child, futureNodes, height, currentChildren);
		const shouldSplit = height + SAFETY_THRESHOLD < nodeTop + nodeHeight;
		const canWrap = getWrap(child);
		const fitsInsidePage = nodeHeight <= contentArea;
		if (isFixed(child)) {
			nextChildren.push(child);
			currentChildren.push(child);
			continue;
		}
		if (isOutside) {
			const box = Object.assign({}, child.box, { top: child.box.top - height });
			const next = Object.assign({}, child, { box });
			nextChildren.push(next);
			continue;
		}
		if (!fitsInsidePage && !canWrap) {
			currentChildren.push(child);
			nextChildren.push(...futureNodes);
			warnUnavailableSpace(child);
			break;
		}
		if (shouldBreak$1) {
			const box = Object.assign({}, child.box, { top: child.box.top - height });
			const props = Object.assign({}, child.props, {
				wrap: true,
				break: false
			});
			const next = Object.assign({}, child, {
				box,
				props
			});
			currentChildren.push(...futureFixedNodes);
			nextChildren.push(next, ...futureNodes);
			break;
		}
		if (shouldSplit) {
			const [currentChild, nextChild] = split(child, height, contentArea);
			if (child.children.length > 0 && currentChild.children.length === 0) {
				if (currentChildren.length === 0) {
					currentChildren.push(child, ...futureFixedNodes);
					nextChildren.push(...futureNodes);
				} else {
					const box = Object.assign({}, child.box, { top: child.box.top - height });
					const next = Object.assign({}, child, { box });
					currentChildren.push(...futureFixedNodes);
					nextChildren.push(next, ...futureNodes);
				}
				break;
			}
			if (currentChild) currentChildren.push(currentChild);
			if (nextChild) nextChildren.push(nextChild);
			continue;
		}
		currentChildren.push(child);
	}
	return [currentChildren, nextChildren];
};
var splitChildren = (height, contentArea, node) => {
	const children = node.children || [];
	return splitNodes(height - getTop(node), contentArea, children);
};
var splitView = (node, height, contentArea) => {
	const [currentNode, nextNode] = splitNode(node, height);
	const [currentChilds, nextChildren] = splitChildren(height, contentArea, node);
	return [assingChildren(currentChilds, currentNode), assingChildren(nextChildren, nextNode)];
};
var split = (node, height, contentArea) => isText$2(node) ? splitText(node, height) : splitView(node, height, contentArea);
var shouldResolveDynamicNodes = (node) => {
	const children = node.children || [];
	return isDynamic$1(node) || children.some(shouldResolveDynamicNodes);
};
var resolveDynamicNodes = (props, node) => {
	const isNodeDynamic = isDynamic$1(node);
	const resolveChildren = (children = []) => {
		if (isNodeDynamic) {
			const res = node.props.render(props);
			return castArray(res).filter(Boolean).map((n) => resolveDynamicNodes(props, n));
		}
		return children.map((c) => resolveDynamicNodes(props, c));
	};
	const box = isNodeDynamic && isText$2(node) ? {
		...node.box,
		height: 0
	} : node.box;
	const children = resolveChildren(node.children);
	const lines = isNodeDynamic ? null : node.lines;
	return Object.assign({}, node, {
		box,
		lines,
		children
	});
};
var resolveDynamicPage = (props, page, fontStore, yoga) => {
	if (shouldResolveDynamicNodes(page)) return relayoutPage(resolveDynamicNodes(props, page), fontStore, yoga);
	return page;
};
var splitPage$1 = (page, pageNumber, fontStore, yoga) => {
	const wrapArea = getWrapArea(page);
	const contentArea = getContentArea(page);
	const dynamicPage = resolveDynamicPage({ pageNumber }, page, fontStore, yoga);
	const height = page.style.height;
	const [currentChilds, nextChilds] = splitNodes(wrapArea, contentArea, dynamicPage.children);
	const relayout = (node) => relayoutPage(node, fontStore, yoga);
	const currentBox = {
		...page.box,
		height
	};
	const currentPage = relayout(Object.assign({}, page, {
		box: currentBox,
		children: currentChilds
	}));
	if (nextChilds.length === 0 || allFixed(nextChilds)) return [currentPage, null];
	const nextBox = omit$1("height", page.box);
	const nextProps = omit$1("bookmark", page.props);
	return [currentPage, relayout(Object.assign({}, page, {
		props: nextProps,
		box: nextBox,
		children: nextChilds
	}))];
};
var resolvePageIndices = (fontStore, yoga, page, pageNumber, pages) => {
	return resolveDynamicPage({
		totalPages: pages.length,
		pageNumber: pageNumber + 1,
		subPageNumber: page.subPageNumber + 1,
		subPageTotalPages: page.subPageTotalPages
	}, page, fontStore, yoga);
};
var assocSubPageData = (subpages) => {
	return subpages.map((page, i) => ({
		...page,
		subPageNumber: i,
		subPageTotalPages: subpages.length
	}));
};
var dissocSubPageData = (page) => {
	return omit$1(["subPageNumber", "subPageTotalPages"], page);
};
var paginate = (page, pageNumber, fontStore, yoga) => {
	if (!page) return [];
	if (page.props?.wrap === false) return [page];
	let splittedPage = splitPage$1(page, pageNumber, fontStore, yoga);
	const pages = [splittedPage[0]];
	let nextPage = splittedPage[1];
	while (nextPage !== null) {
		splittedPage = splitPage$1(nextPage, pageNumber + pages.length, fontStore, yoga);
		pages.push(splittedPage[0]);
		nextPage = splittedPage[1];
	}
	return pages;
};
/**
* Performs pagination. This is the step responsible of breaking the whole document
* into pages following pagiation rules, such as `fixed`, `break` and dynamic nodes.
*
* @param root - Document node
* @param fontStore - Font store
* @returns Layout node
*/
var resolvePagination$1 = (root, fontStore) => {
	let pages = [];
	let pageNumber = 1;
	for (let i = 0; i < root.children.length; i += 1) {
		const page = root.children[i];
		let subpages = paginate(page, pageNumber, fontStore, root.yoga);
		subpages = assocSubPageData(subpages);
		pageNumber += subpages.length;
		pages = pages.concat(subpages);
	}
	pages = pages.map((...args) => dissocSubPageData(resolvePageIndices(fontStore, root.yoga, ...args)));
	return assingChildren(pages, root);
};
/**
* Translates page percentage horizontal paddings in fixed ones
*
* @param container - Page container
* @returns Resolve page horizontal padding
*/
var resolvePageHorizontalPadding = (container) => (value) => {
	const match = matchPercent(value);
	const width = container.width;
	return match ? match.percent * width : value;
};
/**
* Translates page percentage vertical paddings in fixed ones
*
* @param container - Page container
* @returns Resolve page vertical padding
*/
var resolvePageVerticalPadding = (container) => (value) => {
	const match = matchPercent(value);
	const height = container.height;
	return match ? match.percent * height : value;
};
/**
* Translates page percentage paddings in fixed ones
*
* @param page
* @returns Page with fixed paddings
*/
var resolvePagePaddings = (page) => {
	const container = page.style;
	const style = evolve({
		paddingTop: resolvePageVerticalPadding(container),
		paddingLeft: resolvePageHorizontalPadding(container),
		paddingRight: resolvePageHorizontalPadding(container),
		paddingBottom: resolvePageVerticalPadding(container)
	}, page.style);
	return Object.assign({}, page, { style });
};
/**
* Translates all pages percentage paddings in fixed ones
* This has to be computed from pages calculated size and not by Yoga
* because at this point we didn't performed pagination yet.
*
* @param root - Document root
* @returns Document root with translated page paddings
*/
var resolvePagesPaddings = (root) => {
	if (!root.children) return root;
	const children = root.children.map(resolvePagePaddings);
	return Object.assign({}, root, { children });
};
var PROBE_PROP = "__probe";
var CONTENT_PROP = "__content";
var probeElement = () => ({
	type: "VIEW",
	props: { [PROBE_PROP]: true },
	style: {
		flexGrow: 1,
		flexShrink: 1,
		alignSelf: "stretch"
	},
	children: []
});
var isProbe = (node) => !!node.props && PROBE_PROP in node.props;
var findProbe = (node) => {
	if (isProbe(node)) return node;
	for (const child of node.children || []) {
		const found = findProbe(child);
		if (found) return found;
	}
	return null;
};
var tagContent = (node) => ({
	...node,
	props: {
		...node.props,
		[CONTENT_PROP]: true
	}
});
var isContent = (node) => !!node.props && CONTENT_PROP in node.props;
var collectContent = (node, out = []) => {
	for (const child of node.children || []) if (isContent(child)) out.push(child);
	else collectContent(child, out);
	return out;
};
var identityLayout = (_, children) => children;
var instantiateTemplate = (layout = identityLayout, props, payload) => castArray(layout(props, payload)).filter(Boolean);
var countProbes = (node) => (isProbe(node) ? 1 : 0) + (node.children || []).reduce((acc, child) => acc + countProbes(child), 0);
var validateTemplate = (layout) => {
	const probes = instantiateTemplate(layout, { pageNumber: 1 }, [probeElement()]).reduce((acc, node) => acc + countProbes(node), 0);
	if (probes !== 1) throw new Error(`[layout] A page layout must render its children exactly once (found ${probes}).`);
};
var resolvePageTemplates = (root) => {
	const children = (root.children || []).map((page) => {
		const layout = page.props?.layout;
		if (layout) validateTemplate(layout);
		const nodes = instantiateTemplate(layout, { pageNumber: 1 }, (page.children || []).map(tagContent));
		return {
			...page,
			children: nodes
		};
	});
	return {
		...root,
		children
	};
};
var resolveRadius = (box) => (value) => {
	if (!value) return void 0;
	const match = matchPercent(value);
	return match ? match.percent * Math.min(box.width, box.height) : value;
};
/**
* Transforms percent border radius into fixed values
*
* @param node
* @returns Node
*/
var resolvePercentRadius = (node) => {
	const style = evolve({
		borderTopLeftRadius: resolveRadius(node.box),
		borderTopRightRadius: resolveRadius(node.box),
		borderBottomRightRadius: resolveRadius(node.box),
		borderBottomLeftRadius: resolveRadius(node.box)
	}, node.style || {});
	const newNode = Object.assign({}, node, { style });
	if (!node.children) return newNode;
	const children = node.children.map(resolvePercentRadius);
	return Object.assign({}, newNode, { children });
};
/**
* Transform percent height into fixed
*
* @param height
* @returns Height
*/
var transformHeight = (pageArea, height) => {
	const match = matchPercent(height);
	return match ? match.percent * pageArea : height;
};
/**
* Get page area (height minus paddings)
*
* @param page
* @returns Page area
*/
var getPageArea = (page) => {
	const pageHeight = page.style.height;
	const pagePaddingTop = page.style?.paddingTop || 0;
	const pagePaddingBottom = page.style?.paddingBottom || 0;
	return pageHeight - pagePaddingTop - pagePaddingBottom;
};
/**
* Transform node percent height to fixed
*
* @param page
* @param node
* @returns Transformed node
*/
var resolveNodePercentHeight = (page, node) => {
	if (isNil(page.style?.height)) return node;
	if (isNil(node.style?.height)) return node;
	const height = transformHeight(getPageArea(page), node.style.height);
	const style = Object.assign({}, node.style, { height });
	return Object.assign({}, node, { style });
};
/**
* Transform page immediate children with percent height to fixed
*
* @param page
* @returns Transformed page
*/
var resolvePagePercentHeight = (page) => {
	if (!page.children) return page;
	const resolveChild = (child) => resolveNodePercentHeight(page, child);
	const children = page.children.map(resolveChild);
	return Object.assign({}, page, { children });
};
/**
* Transform all page immediate children with percent height to fixed.
* This is needed for computing correct dimensions on pre-pagination layout.
*
* @param root - Document root
* @returns Transformed document root
*/
var resolvePercentHeight = (root) => {
	if (!root.children) return root;
	const children = root.children.map(resolvePagePercentHeight);
	return Object.assign({}, root, { children });
};
var isType = (type) => (node) => node.type === type;
var isLink = isType(Link);
var isText$1 = isType(Text);
var isTextInstance = isType(TextInstance);
/**
* Checks if node has render prop
*
* @param node
* @returns Has render prop?
*/
var hasRenderProp = (node) => "render" in node.props;
/**
* Checks if node is text type (Text or TextInstance)
*
* @param node
* @returns Are all children text instances?
*/
var isTextType = (node) => isText$1(node) || isTextInstance(node);
/**
* Checks if is tet link that needs to be wrapped in Text
*
* @param node
* @returns Are all children text instances?
*/
var isTextLink = (node) => {
	const children = node.children || [];
	if (children.every(isTextInstance)) return true;
	if (children.every(isText$1)) return false;
	return children.every(isTextType);
};
/**
* Wraps node children inside Text node
*
* @param node
* @returns Node with intermediate Text child
*/
var wrapText = (node) => {
	const textElement = {
		type: Text,
		props: {},
		style: {},
		box: {},
		children: node.children
	};
	return Object.assign({}, node, { children: [textElement] });
};
var transformLink = (node) => {
	if (!isLink(node)) return node;
	if (hasRenderProp(node)) return Object.assign({}, node, { type: Text });
	if (isTextLink(node)) return wrapText(node);
	return node;
};
/**
* Transforms Link layout to correctly render text and dynamic rendered links
*
* @param node
* @returns Node with link substitution
*/
var resolveLinkSubstitution = (node) => {
	if (!node.children) return node;
	const resolveChild = compose(transformLink, resolveLinkSubstitution);
	const children = node.children.map(resolveChild);
	return Object.assign({}, node, { children });
};
var isDynamic = (node) => {
	if (!node.props) return false;
	return "render" in node.props;
};
var hasDynamic = (node) => isDynamic(node) || (node.children || []).some((child) => hasDynamic(child));
var renderDynamic = (props, node) => {
	if (!isDynamic(node)) {
		const children = (node.children || []).map((child) => renderDynamic(props, child));
		return {
			...node,
			children
		};
	}
	const children = castArray(node.props.render(props)).filter(Boolean).map((child) => renderDynamic(props, child));
	const box = node.type === "TEXT" ? {
		...node.box,
		height: 0
	} : node.box;
	return {
		...node,
		box,
		lines: null,
		props: omit$1("render", node.props),
		children
	};
};
var ZERO_TOP_STYLE = {
	marginTop: 0,
	paddingTop: 0,
	borderTopWidth: 0,
	borderTopLeftRadius: 0,
	borderTopRightRadius: 0
};
var ZERO_BOTTOM_STYLE = {
	marginBottom: 0,
	paddingBottom: 0,
	borderBottomWidth: 0,
	borderBottomLeftRadius: 0,
	borderBottomRightRadius: 0
};
var ZERO_TOP_BOX = {
	marginTop: 0,
	paddingTop: 0,
	borderTopWidth: 0
};
var ZERO_BOTTOM_BOX = {
	marginBottom: 0,
	paddingBottom: 0,
	borderBottomWidth: 0
};
var numeric$1 = (value) => typeof value === "number" ? value : 0;
var marginTop = (node) => numeric$1(node.box?.marginTop);
var marginBottom = (node) => numeric$1(node.box?.marginBottom);
var isWhole = (placed) => placed.part.isFirst && placed.part.isLast;
var rebuild = (placed) => {
	const node = placed.data;
	if (!node) return (placed.children || []).flatMap(rebuild);
	if (node.style?.position === "absolute") return [{ ...node }];
	const { isFirst, isLast } = placed.part;
	const lead = isFirst ? marginTop(node) : 0;
	const borderTop = placed.box.top + lead;
	if (!placed.children || isWhole(placed)) return [{
		...node,
		box: {
			...node.box,
			top: borderTop
		}
	}];
	const height = placed.box.height - lead - (isLast ? marginBottom(node) : 0);
	return [{
		...node,
		box: {
			...node.box,
			top: borderTop,
			height,
			...isFirst ? {} : ZERO_TOP_BOX,
			...isLast ? {} : ZERO_BOTTOM_BOX
		},
		style: {
			...node.style,
			...isLast ? {} : { height },
			...isFirst ? {} : ZERO_TOP_STYLE,
			...isLast ? {} : ZERO_BOTTOM_STYLE
		},
		...isFirst ? {} : { props: {
			...node.props,
			bookmark: null
		} },
		children: placed.children.flatMap(rebuild)
	}];
};
var fromPage = (placed) => placed.flatMap(rebuild);
var splitBox = (node, height) => {
	const nextHeight = (node.box?.height || 0) - height;
	return [{
		...node,
		box: {
			...node.box,
			height,
			...ZERO_BOTTOM_BOX
		},
		style: {
			...node.style,
			height,
			...ZERO_BOTTOM_STYLE
		},
		wasSplit: true
	}, {
		...node,
		box: {
			...node.box,
			top: 0,
			height: nextHeight,
			...ZERO_TOP_BOX
		},
		style: {
			...node.style,
			height: nextHeight,
			...ZERO_TOP_STYLE
		},
		wasSplit: true
	}];
};
var isText = (node) => node.type === Text;
var isAbsolute = (node) => node.style?.position === "absolute";
var isRow = (node) => {
	const direction = node.style?.flexDirection;
	return direction === "row" || direction === "row-reverse";
};
var numeric = (value) => typeof value === "number" ? value : 0;
var boxHeight = (node) => node.box?.height || 0;
var boxTop = (node) => node.box?.top || 0;
var boxOf = (node) => ({
	top: boxTop(node),
	height: boxHeight(node),
	marginTop: numeric(node.box?.marginTop),
	marginBottom: numeric(node.box?.marginBottom),
	edgeTop: (node.box?.borderTopWidth || 0) + (node.box?.paddingTop || 0),
	edgeBottom: (node.box?.borderBottomWidth || 0) + (node.box?.paddingBottom || 0)
});
var flowChildren = (node) => (node.children || []).filter((child) => !isAbsolute(child));
var splitTextLeaf = (node) => (availHeight) => {
	if (availHeight <= 0) return null;
	const [current, next] = splitText(node, availHeight + boxTop(node));
	if (!current.lines?.length || !next.lines?.length) return null;
	return [leafOf({
		...current,
		box: {
			...current.box,
			...ZERO_BOTTOM_BOX
		}
	}), leafOf({
		...next,
		box: {
			...next.box,
			...ZERO_TOP_BOX
		}
	})];
};
var splitBoxLeaf = (node) => (availHeight) => {
	if (availHeight <= 0 || availHeight >= boxHeight(node)) return null;
	const [current, next] = splitBox(node, availHeight);
	return [leafOf(current), leafOf(next)];
};
var splitOf = (node) => {
	if (!getWrap(node)) return void 0;
	return isText(node) ? splitTextLeaf(node) : splitBoxLeaf(node);
};
var leafOf = (node) => ({
	box: boxOf(node),
	id: node.type,
	data: node,
	split: splitOf(node)
});
var measure = (node, ctx, pageNumber) => {
	const { page } = ctx;
	const rendered = renderDynamic(ctx.props(pageNumber), node);
	const width = (node.box?.width || page.box?.width || 0) + numeric(node.box?.marginLeft) + numeric(node.box?.marginRight);
	const measured = relayoutPage({
		type: Page,
		props: { dpi: page.props?.dpi },
		style: {
			width,
			height: page.style?.height,
			fontSize: page.style?.fontSize
		},
		box: { width },
		children: [rendered]
	}, ctx.fontStore, ctx.yoga).children[0];
	return {
		...measured,
		box: {
			...measured.box,
			top: 0
		}
	};
};
var lazyOf = (node, ctx) => ({
	box: boxOf(node),
	id: node.type,
	materialize: ({ pageNumber }) => toItem(measure(node, ctx, pageNumber), ctx)
});
var absoluteOf = (node, ctx) => {
	if (hasDynamic(node)) return {
		box: boxOf(node),
		id: node.type,
		materialize: ({ pageNumber }) => absoluteOf(measure(node, ctx, pageNumber), ctx)
	};
	return {
		box: boxOf(node),
		id: node.type,
		data: node,
		absolute: true
	};
};
var withFlags = (child, node) => {
	const presence = child.props.minPresenceAhead;
	return {
		...node,
		...isFixed(child) ? { repeat: true } : {},
		...typeof presence === "number" && presence > 0 ? { minPresenceAhead: presence } : {}
	};
};
var containerOf = (node, ctx) => ({
	box: boxOf(node),
	id: node.type,
	data: node,
	direction: isRow(node) ? "row" : "column",
	children: (node.children || []).map((child) => withFlags(child, toItem(child, ctx)))
});
var kindOf = (node, children) => {
	if (hasDynamic(node) && (isDynamic(node) || isRow(node) || !getWrap(node))) return "lazy";
	if (isText(node) || children.length === 0 || !getWrap(node)) return "leaf";
	return "container";
};
var toItem = (node, ctx) => {
	if (isAbsolute(node)) return absoluteOf(node, ctx);
	switch (kindOf(node, flowChildren(node))) {
		case "lazy": return lazyOf(node, ctx);
		case "leaf": return leafOf(node);
		default: return containerOf(node, ctx);
	}
};
var toFlow = (nodes, ctx) => nodes.map((child) => {
	const node = withFlags(child, toItem(child, ctx));
	return "break" in child.props && child.props.break ? {
		...node,
		break: true
	} : node;
});
var absoluteBox = (root, target, top = 0, left = 0) => {
	const boxTop = top + (root.box?.top || 0);
	const boxLeft = left + (root.box?.left || 0);
	if (root === target) return {
		top: boxTop,
		left: boxLeft,
		width: root.box?.width || 0,
		height: root.box?.height || 0
	};
	for (const child of root.children || []) {
		const found = absoluteBox(child, target, boxTop, boxLeft);
		if (found) return found;
	}
	return null;
};
var validateRegion = (region, referenceWidth, pageNumber, wrap) => {
	if (Math.abs(region.width - referenceWidth) > .001) throw new Error(`[layout] The page layout changes the content width on page ${pageNumber} (${region.width} vs ${referenceWidth}). Chrome may vary in height per page, not width.`);
	if (wrap && region.height <= 0) throw new Error(`[layout] The page layout leaves no room for content on page ${pageNumber}.`);
};
var splitPage = (page, props, { fontStore, yoga }) => {
	const template = page.props?.layout;
	const box = {
		...page.box,
		height: page.style.height
	};
	const pageCtx = {
		props,
		page,
		fontStore,
		yoga
	};
	const paginator = createPaginator(toFlow(collectContent(page), pageCtx));
	const instantiate = (pageProps, payload) => instantiateTemplate(template, pageProps, payload).map((node) => renderDynamic(pageProps, node));
	const measureRegion = (pageNumber) => {
		const nodes = instantiate(props(pageNumber), [probeElement()]);
		const laid = relayoutPage({
			...page,
			box,
			children: nodes
		}, fontStore, yoga);
		return absoluteBox(laid, findProbe(laid));
	};
	const wrap = page.props?.wrap !== false;
	const pages = [];
	let referenceWidth = null;
	let pageNumber = 1;
	while (!paginator.done) {
		const region = measureRegion(pageNumber);
		referenceWidth = referenceWidth ?? region.width;
		validateRegion(region, referenceWidth, pageNumber, wrap);
		const height = wrap ? region.height : Infinity;
		const fragments = fromPage(paginator.next(height));
		const index = pageNumber - 1;
		const nodes = instantiate(props(pageNumber), fragments);
		const built = {
			...page,
			box,
			props: index === 0 ? page.props : omit$1("bookmark", page.props),
			children: nodes
		};
		pages.push(relayoutPage(built, fontStore, yoga));
		pageNumber += 1;
	}
	return pages;
};
var paginateDocument = (root, ctx) => {
	let offset = 0;
	const subTotals = [];
	const children = [];
	root.children.forEach((page, index) => {
		const { totals } = ctx;
		const pagesBefore = offset;
		const props = (enginePageNumber) => ({
			pageNumber: pagesBefore + enginePageNumber,
			totalPages: totals?.totalPages,
			subPageNumber: enginePageNumber,
			subPageTotalPages: totals?.subTotals[index]
		});
		const pages = splitPage(page, props, ctx);
		subTotals.push(pages.length);
		offset += pages.length;
		children.push(...pages);
	});
	return {
		root: {
			...root,
			children
		},
		subTotals
	};
};
var needsTotalsRound = (root) => root.children.some((page) => hasDynamic(page) || page.props?.layout);
/**
* Splits every page into output pages: content keeps its first-pass
* measurements, the engine packs it into each page's flow region, and each
* output page renders its layout around the fragments that landed on it.
* Runs a second round when something reads totalPages.
*
* @param root - Document node
* @param fontStore - Font store
* @returns Document with paginated pages
*/
var resolvePagination = (root, fontStore) => {
	const ctx1 = {
		totals: null,
		fontStore,
		yoga: root.yoga
	};
	const round1 = paginateDocument(root, ctx1);
	if (!needsTotalsRound(root)) return round1.root;
	const totals = {
		totalPages: round1.root.children.length,
		subTotals: round1.subTotals
	};
	return paginateDocument(root, {
		...ctx1,
		totals
	}).root;
};
var wantsNextPagination = (root) => root.children.some((page) => page.props?.experimentalPagination || page.props?.layout);
var paginationStep = (root, fontStore) => wantsNextPagination(root) ? resolvePagination(root, fontStore) : resolvePagination$1(root, fontStore);
var layout = asyncCompose(resolveZIndex, resolveOrigin, resolveAssets, paginationStep, resolveTextLayout, resolveFloats, resolvePercentRadius, resolveDimensions, resolveSvg, resolveAssets, resolveInheritance, resolvePercentHeight, resolvePagesPaddings, resolveStyles, resolveLinkSubstitution, resolveBookmarks, resolvePageTemplates, resolvePageSizes, resolveYoga);
//#endregion
export { cs as n, layout as t };
