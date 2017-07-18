module Shipwreck {
	export enum NumberNegativePattern {
		Parenthesis,
		Left,
		LeftWithSpace,
		Right,
		RightWithSpace,
	}
    export class CultureInfo {
		
		private static _cache: { [name: string]: CultureInfo };
		private static _invariantCulture : CultureInfo;
		private static _currentCulture: CultureInfo;
		
		public name: string;
		public negativeSign: string;
		public positiveSign: string;
		public numberDecimalSeparator: string;
		public numberDecimalDigits: number;
		public numberNegativePattern: NumberNegativePattern;
		public numberGroupSeparator: string;
		public numberGroupSizes: number[];

		private constructor(name: string, negativeSign: string, positiveSign: string, numberDecimalSeparator: string, numberDecimalDigits: number
		, numberNegativePattern: NumberNegativePattern, numberGroupSeparator: string, numberGroupSizes: number[]) {
			this.name = name;
			this.negativeSign = negativeSign;
			this.positiveSign = positiveSign;
			this.numberDecimalSeparator = numberDecimalSeparator;
			this.numberDecimalDigits = numberDecimalDigits;
			this.numberNegativePattern = numberNegativePattern;
			this.numberGroupSeparator = numberGroupSeparator;
			this.numberGroupSizes = numberGroupSizes;
		}

		public static get invariantCulture() : CultureInfo {
			return CultureInfo._invariantCulture || (CultureInfo._invariantCulture = new CultureInfo("", "-", "+", ".", 2, NumberNegativePattern.Left, ",", [3]));
		}
		public static get currentCulture() : CultureInfo {
			return CultureInfo._currentCulture || (CultureInfo._currentCulture = CultureInfo.getCulture((navigator as any).userLanguage || (navigator as any).browserLanguage || navigator.language));
		}

		public static getCulture(name: string): CultureInfo {
			if (name) {
				var k = name.substring(0, 2).toLowerCase();
				var c : CultureInfo;
				if (CultureInfo._cache) {
					c = CultureInfo._cache[k];
					if (c) {
						return c;
					}
				} else {
					CultureInfo._cache = {};
				}
				switch (k) {
					case "aa":
						c = new CultureInfo("aa", "-", "+", ".", 2, NumberNegativePattern.Left, ",", [3]);
						break;
					case "af":
						c = new CultureInfo("af", "-", "+", ",", 2, NumberNegativePattern.Left, " ", [3]);
						break;
					case "ak":
						c = new CultureInfo("ak", "-", "+", ".", 2, NumberNegativePattern.Left, ",", [3]);
						break;
					case "am":
						c = new CultureInfo("am", "-", "+", ".", 2, NumberNegativePattern.Left, ",", [3]);
						break;
					case "ar":
						c = new CultureInfo("ar", "-", "+", ".", 2, NumberNegativePattern.Left, ",", [3]);
						break;
					case "as":
						c = new CultureInfo("as", "-", "+", ".", 2, NumberNegativePattern.Left, ",", [3, 2]);
						break;
					case "az":
						c = new CultureInfo("az", "-", "+", ",", 2, NumberNegativePattern.Left, ".", [3]);
						break;
					case "ba":
						c = new CultureInfo("ba", "-", "+", ",", 2, NumberNegativePattern.Left, " ", [3]);
						break;
					case "be":
						c = new CultureInfo("be", "-", "+", ",", 2, NumberNegativePattern.Left, " ", [3]);
						break;
					case "bg":
						c = new CultureInfo("bg", "-", "+", ",", 2, NumberNegativePattern.Left, " ", [3]);
						break;
					case "bm":
						c = new CultureInfo("bm", "-", "+", ".", 2, NumberNegativePattern.Left, ",", [3]);
						break;
					case "bn":
						c = new CultureInfo("bn", "-", "+", ".", 2, NumberNegativePattern.Left, ",", [3, 2]);
						break;
					case "bo":
						c = new CultureInfo("bo", "-", "+", ".", 2, NumberNegativePattern.Left, ",", [3]);
						break;
					case "br":
						c = new CultureInfo("br", "-", "+", ",", 2, NumberNegativePattern.Left, " ", [3]);
						break;
					case "bs":
						c = new CultureInfo("bs", "-", "+", ",", 2, NumberNegativePattern.Left, ".", [3]);
						break;
					case "ca":
						c = new CultureInfo("ca", "-", "+", ",", 2, NumberNegativePattern.Left, ".", [3]);
						break;
					case "ce":
						c = new CultureInfo("ce", "-", "+", ".", 2, NumberNegativePattern.Left, ",", [3]);
						break;
					case "co":
						c = new CultureInfo("co", "-", "+", ",", 2, NumberNegativePattern.Left, " ", [3]);
						break;
					case "cs":
						c = new CultureInfo("cs", "-", "+", ",", 2, NumberNegativePattern.Left, " ", [3]);
						break;
					case "cu":
						c = new CultureInfo("cu", "-", "+", ",", 2, NumberNegativePattern.Left, " ", [3]);
						break;
					case "cy":
						c = new CultureInfo("cy", "-", "+", ".", 2, NumberNegativePattern.Left, ",", [3]);
						break;
					case "da":
						c = new CultureInfo("da", "-", "+", ",", 2, NumberNegativePattern.Left, ".", [3]);
						break;
					case "de":
						c = new CultureInfo("de", "-", "+", ",", 2, NumberNegativePattern.Left, ".", [3]);
						break;
					case "dv":
						c = new CultureInfo("dv", "-", "+", ".", 2, NumberNegativePattern.Left, ",", [3]);
						break;
					case "dz":
						c = new CultureInfo("dz", "-", "+", ".", 2, NumberNegativePattern.Left, ",", [3, 2]);
						break;
					case "ee":
						c = new CultureInfo("ee", "-", "+", ".", 2, NumberNegativePattern.Left, ",", [3]);
						break;
					case "el":
						c = new CultureInfo("el", "-", "+", ",", 2, NumberNegativePattern.Left, ".", [3]);
						break;
					case "en":
						c = new CultureInfo("en", "-", "+", ".", 2, NumberNegativePattern.Left, ",", [3]);
						break;
					case "eo":
						c = new CultureInfo("eo", "-", "+", ",", 2, NumberNegativePattern.Left, " ", [3]);
						break;
					case "es":
						c = new CultureInfo("es", "-", "+", ",", 2, NumberNegativePattern.Left, ".", [3]);
						break;
					case "et":
						c = new CultureInfo("et", "-", "+", ",", 2, NumberNegativePattern.Left, " ", [3]);
						break;
					case "eu":
						c = new CultureInfo("eu", "-", "+", ",", 2, NumberNegativePattern.Left, ".", [3]);
						break;
					case "fa":
						c = new CultureInfo("fa", "-", "+", "/", 2, NumberNegativePattern.Right, ",", [3]);
						break;
					case "ff":
						c = new CultureInfo("ff", "-", "+", ",", 2, NumberNegativePattern.Left, " ", [3]);
						break;
					case "fi":
						c = new CultureInfo("fi", "-", "+", ",", 2, NumberNegativePattern.Left, " ", [3]);
						break;
					case "fo":
						c = new CultureInfo("fo", "-", "+", ",", 2, NumberNegativePattern.Left, ".", [3]);
						break;
					case "fr":
						c = new CultureInfo("fr", "-", "+", ",", 2, NumberNegativePattern.Left, " ", [3]);
						break;
					case "fy":
						c = new CultureInfo("fy", "-", "+", ",", 2, NumberNegativePattern.Left, ".", [3]);
						break;
					case "ga":
						c = new CultureInfo("ga", "-", "+", ".", 2, NumberNegativePattern.Left, ",", [3]);
						break;
					case "gd":
						c = new CultureInfo("gd", "-", "+", ".", 2, NumberNegativePattern.Left, ",", [3]);
						break;
					case "gl":
						c = new CultureInfo("gl", "-", "+", ",", 2, NumberNegativePattern.Left, ".", [3]);
						break;
					case "gn":
						c = new CultureInfo("gn", "-", "+", ",", 2, NumberNegativePattern.Left, ".", [3]);
						break;
					case "gu":
						c = new CultureInfo("gu", "-", "+", ".", 2, NumberNegativePattern.Left, ",", [3, 2]);
						break;
					case "gv":
						c = new CultureInfo("gv", "-", "+", ".", 2, NumberNegativePattern.Left, ",", [3]);
						break;
					case "ha":
						c = new CultureInfo("ha", "-", "+", ".", 2, NumberNegativePattern.Left, ",", [3]);
						break;
					case "he":
						c = new CultureInfo("he", "-", "+", ".", 2, NumberNegativePattern.Left, ",", [3]);
						break;
					case "hi":
						c = new CultureInfo("hi", "-", "+", ".", 2, NumberNegativePattern.Left, ",", [3, 2]);
						break;
					case "hr":
						c = new CultureInfo("hr", "-", "+", ",", 2, NumberNegativePattern.LeftWithSpace, ".", [3]);
						break;
					case "hu":
						c = new CultureInfo("hu", "-", "+", ",", 2, NumberNegativePattern.Left, " ", [3]);
						break;
					case "hy":
						c = new CultureInfo("hy", "-", "+", ".", 2, NumberNegativePattern.Left, ",", [3]);
						break;
					case "ia":
						c = new CultureInfo("ia", "-", "+", ",", 2, NumberNegativePattern.Left, ".", [3]);
						break;
					case "id":
						c = new CultureInfo("id", "-", "+", ",", 2, NumberNegativePattern.Left, ".", [3]);
						break;
					case "ig":
						c = new CultureInfo("ig", "-", "+", ".", 2, NumberNegativePattern.Left, ",", [3]);
						break;
					case "ii":
						c = new CultureInfo("ii", "-", "+", ".", 2, NumberNegativePattern.Left, ",", [3]);
						break;
					case "is":
						c = new CultureInfo("is", "-", "+", ",", 2, NumberNegativePattern.Left, ".", [3]);
						break;
					case "it":
						c = new CultureInfo("it", "-", "+", ",", 2, NumberNegativePattern.Left, ".", [3]);
						break;
					case "iu":
						c = new CultureInfo("iu", "-", "+", ".", 2, NumberNegativePattern.Left, ",", [3]);
						break;
					case "ja":
						c = new CultureInfo("ja", "-", "+", ".", 2, NumberNegativePattern.Left, ",", [3]);
						break;
					case "jv":
						c = new CultureInfo("jv", "-", "+", ",", 2, NumberNegativePattern.Left, ".", [3]);
						break;
					case "ka":
						c = new CultureInfo("ka", "-", "+", ",", 2, NumberNegativePattern.Left, " ", [3]);
						break;
					case "ki":
						c = new CultureInfo("ki", "-", "+", ".", 2, NumberNegativePattern.Left, ",", [3]);
						break;
					case "kk":
						c = new CultureInfo("kk", "-", "+", ",", 2, NumberNegativePattern.Left, " ", [3]);
						break;
					case "kl":
						c = new CultureInfo("kl", "-", "+", ",", 2, NumberNegativePattern.Left, ".", [3]);
						break;
					case "km":
						c = new CultureInfo("km", "-", "+", ".", 2, NumberNegativePattern.LeftWithSpace, ",", [3]);
						break;
					case "kn":
						c = new CultureInfo("kn", "-", "+", ".", 2, NumberNegativePattern.Left, ",", [3]);
						break;
					case "ko":
						c = new CultureInfo("ko", "-", "+", ".", 2, NumberNegativePattern.Left, ",", [3]);
						break;
					case "kr":
						c = new CultureInfo("kr", "-", "+", ".", 2, NumberNegativePattern.Left, ",", [3]);
						break;
					case "ks":
						c = new CultureInfo("ks", "-", "+", ".", 2, NumberNegativePattern.Left, ",", [3, 2]);
						break;
					case "ku":
						c = new CultureInfo("ku", "-", "+", ".", 2, NumberNegativePattern.Left, ",", [3]);
						break;
					case "kw":
						c = new CultureInfo("kw", "-", "+", ".", 2, NumberNegativePattern.Left, ",", [3]);
						break;
					case "ky":
						c = new CultureInfo("ky", "-", "+", ",", 2, NumberNegativePattern.Left, " ", [3]);
						break;
					case "la":
						c = new CultureInfo("la", "-", "+", ".", 2, NumberNegativePattern.Left, ",", [3]);
						break;
					case "lb":
						c = new CultureInfo("lb", "-", "+", ",", 2, NumberNegativePattern.Left, " ", [3]);
						break;
					case "lg":
						c = new CultureInfo("lg", "-", "+", ".", 2, NumberNegativePattern.Left, ",", [3]);
						break;
					case "ln":
						c = new CultureInfo("ln", "-", "+", ",", 2, NumberNegativePattern.Left, ".", [3]);
						break;
					case "lo":
						c = new CultureInfo("lo", "-", "+", ",", 2, NumberNegativePattern.Left, ".", [3]);
						break;
					case "lt":
						c = new CultureInfo("lt", "-", "+", ",", 2, NumberNegativePattern.Left, " ", [3]);
						break;
					case "lu":
						c = new CultureInfo("lu", "-", "+", ",", 2, NumberNegativePattern.Left, ".", [3]);
						break;
					case "lv":
						c = new CultureInfo("lv", "-", "+", ",", 2, NumberNegativePattern.Left, " ", [3]);
						break;
					case "mg":
						c = new CultureInfo("mg", "-", "+", ".", 2, NumberNegativePattern.Left, ",", [3]);
						break;
					case "mi":
						c = new CultureInfo("mi", "-", "+", ".", 2, NumberNegativePattern.Left, ",", [3]);
						break;
					case "mk":
						c = new CultureInfo("mk", "-", "+", ",", 2, NumberNegativePattern.Left, ".", [3]);
						break;
					case "ml":
						c = new CultureInfo("ml", "-", "+", ".", 2, NumberNegativePattern.Left, ",", [3, 2]);
						break;
					case "mn":
						c = new CultureInfo("mn", "-", "+", ".", 2, NumberNegativePattern.Left, ",", [3]);
						break;
					case "mr":
						c = new CultureInfo("mr", "-", "+", ".", 2, NumberNegativePattern.Left, ",", [3, 2]);
						break;
					case "ms":
						c = new CultureInfo("ms", "-", "+", ".", 2, NumberNegativePattern.Left, ",", [3]);
						break;
					case "mt":
						c = new CultureInfo("mt", "-", "+", ".", 2, NumberNegativePattern.Left, ",", [3]);
						break;
					case "my":
						c = new CultureInfo("my", "-", "+", ".", 2, NumberNegativePattern.Left, ",", [3]);
						break;
					case "nb":
						c = new CultureInfo("nb", "-", "+", ",", 2, NumberNegativePattern.Left, " ", [3]);
						break;
					case "nd":
						c = new CultureInfo("nd", "-", "+", ".", 2, NumberNegativePattern.Left, ",", [3]);
						break;
					case "ne":
						c = new CultureInfo("ne", "-", "+", ".", 2, NumberNegativePattern.Left, ",", [3]);
						break;
					case "nl":
						c = new CultureInfo("nl", "-", "+", ",", 2, NumberNegativePattern.Left, ".", [3]);
						break;
					case "nn":
						c = new CultureInfo("nn", "-", "+", ",", 2, NumberNegativePattern.Left, " ", [3]);
						break;
					case "no":
						c = new CultureInfo("no", "-", "+", ",", 2, NumberNegativePattern.Left, " ", [3]);
						break;
					case "nr":
						c = new CultureInfo("nr", "-", "+", ",", 2, NumberNegativePattern.Left, " ", [3]);
						break;
					case "oc":
						c = new CultureInfo("oc", "-", "+", ",", 2, NumberNegativePattern.Left, " ", [3]);
						break;
					case "om":
						c = new CultureInfo("om", "-", "+", ".", 2, NumberNegativePattern.Left, ",", [3]);
						break;
					case "or":
						c = new CultureInfo("or", "-", "+", ".", 2, NumberNegativePattern.Left, ",", [3, 2]);
						break;
					case "os":
						c = new CultureInfo("os", "-", "+", ",", 2, NumberNegativePattern.Left, " ", [3]);
						break;
					case "pa":
						c = new CultureInfo("pa", "-", "+", ".", 2, NumberNegativePattern.Left, ",", [3, 2]);
						break;
					case "pl":
						c = new CultureInfo("pl", "-", "+", ",", 2, NumberNegativePattern.Left, " ", [3]);
						break;
					case "ps":
						c = new CultureInfo("ps", "-", "+", ",", 2, NumberNegativePattern.Left, ".", [3]);
						break;
					case "pt":
						c = new CultureInfo("pt", "-", "+", ",", 2, NumberNegativePattern.Left, ".", [3]);
						break;
					case "rm":
						c = new CultureInfo("rm", "-", "+", ".", 2, NumberNegativePattern.Left, "’", [3]);
						break;
					case "rn":
						c = new CultureInfo("rn", "-", "+", ",", 2, NumberNegativePattern.Left, ".", [3]);
						break;
					case "ro":
						c = new CultureInfo("ro", "-", "+", ",", 2, NumberNegativePattern.Left, ".", [3]);
						break;
					case "ru":
						c = new CultureInfo("ru", "-", "+", ",", 2, NumberNegativePattern.Left, " ", [3]);
						break;
					case "rw":
						c = new CultureInfo("rw", "-", "+", ",", 2, NumberNegativePattern.Left, ".", [3]);
						break;
					case "sa":
						c = new CultureInfo("sa", "-", "+", ".", 2, NumberNegativePattern.Left, ",", [3, 2]);
						break;
					case "sd":
						c = new CultureInfo("sd", "-", "+", ".", 2, NumberNegativePattern.Right, ",", [3]);
						break;
					case "se":
						c = new CultureInfo("se", "-", "+", ",", 2, NumberNegativePattern.Left, " ", [3]);
						break;
					case "sg":
						c = new CultureInfo("sg", "-", "+", ",", 2, NumberNegativePattern.Left, ".", [3]);
						break;
					case "si":
						c = new CultureInfo("si", "-", "+", ".", 2, NumberNegativePattern.Left, ",", [3]);
						break;
					case "sk":
						c = new CultureInfo("sk", "-", "+", ",", 2, NumberNegativePattern.Left, " ", [3]);
						break;
					case "sl":
						c = new CultureInfo("sl", "-", "+", ",", 2, NumberNegativePattern.Left, ".", [3]);
						break;
					case "sn":
						c = new CultureInfo("sn", "-", "+", ".", 2, NumberNegativePattern.Left, ",", [3]);
						break;
					case "so":
						c = new CultureInfo("so", "-", "+", ".", 2, NumberNegativePattern.Left, ",", [3]);
						break;
					case "sq":
						c = new CultureInfo("sq", "-", "+", ",", 2, NumberNegativePattern.Left, " ", [3]);
						break;
					case "sr":
						c = new CultureInfo("sr", "-", "+", ",", 2, NumberNegativePattern.Left, ".", [3]);
						break;
					case "ss":
						c = new CultureInfo("ss", "-", "+", ",", 2, NumberNegativePattern.Left, " ", [3]);
						break;
					case "st":
						c = new CultureInfo("st", "-", "+", ",", 2, NumberNegativePattern.Left, " ", [3]);
						break;
					case "sv":
						c = new CultureInfo("sv", "-", "+", ",", 2, NumberNegativePattern.Left, " ", [3]);
						break;
					case "sw":
						c = new CultureInfo("sw", "-", "+", ".", 2, NumberNegativePattern.Left, ",", [3]);
						break;
					case "ta":
						c = new CultureInfo("ta", "-", "+", ".", 2, NumberNegativePattern.Left, ",", [3, 2]);
						break;
					case "te":
						c = new CultureInfo("te", "-", "+", ".", 2, NumberNegativePattern.Left, ",", [3, 2]);
						break;
					case "tg":
						c = new CultureInfo("tg", "-", "+", ",", 2, NumberNegativePattern.Left, " ", [3]);
						break;
					case "th":
						c = new CultureInfo("th", "-", "+", ".", 2, NumberNegativePattern.Left, ",", [3]);
						break;
					case "ti":
						c = new CultureInfo("ti", "-", "+", ".", 2, NumberNegativePattern.Left, ",", [3]);
						break;
					case "tk":
						c = new CultureInfo("tk", "-", "+", ",", 2, NumberNegativePattern.Left, " ", [3]);
						break;
					case "tn":
						c = new CultureInfo("tn", "-", "+", ".", 2, NumberNegativePattern.Left, " ", [3]);
						break;
					case "to":
						c = new CultureInfo("to", "-", "+", ".", 2, NumberNegativePattern.Left, ",", [3]);
						break;
					case "tr":
						c = new CultureInfo("tr", "-", "+", ",", 2, NumberNegativePattern.Left, ".", [3]);
						break;
					case "ts":
						c = new CultureInfo("ts", "-", "+", ",", 2, NumberNegativePattern.Left, " ", [3]);
						break;
					case "tt":
						c = new CultureInfo("tt", "-", "+", ",", 2, NumberNegativePattern.Left, " ", [3]);
						break;
					case "ug":
						c = new CultureInfo("ug", "-", "+", ".", 2, NumberNegativePattern.Left, ",", [3]);
						break;
					case "uk":
						c = new CultureInfo("uk", "-", "+", ",", 2, NumberNegativePattern.Left, " ", [3]);
						break;
					case "ur":
						c = new CultureInfo("ur", "-", "+", ".", 2, NumberNegativePattern.Left, ",", [3]);
						break;
					case "uz":
						c = new CultureInfo("uz", "-", "+", ",", 2, NumberNegativePattern.Left, " ", [3]);
						break;
					case "ve":
						c = new CultureInfo("ve", "-", "+", ",", 2, NumberNegativePattern.Left, " ", [3]);
						break;
					case "vi":
						c = new CultureInfo("vi", "-", "+", ",", 2, NumberNegativePattern.Left, ".", [3]);
						break;
					case "vo":
						c = new CultureInfo("vo", "-", "+", ".", 2, NumberNegativePattern.Left, ",", [3]);
						break;
					case "wo":
						c = new CultureInfo("wo", "-", "+", ",", 2, NumberNegativePattern.Left, " ", [3]);
						break;
					case "xh":
						c = new CultureInfo("xh", "-", "+", ".", 2, NumberNegativePattern.Left, " ", [3]);
						break;
					case "yi":
						c = new CultureInfo("yi", "-", "+", ".", 2, NumberNegativePattern.Left, ",", [3]);
						break;
					case "yo":
						c = new CultureInfo("yo", "-", "+", ".", 2, NumberNegativePattern.Left, ",", [3]);
						break;
					case "zh":
						c = new CultureInfo("zh", "-", "+", ".", 2, NumberNegativePattern.Left, ",", [3]);
						break;
					case "zu":
						c = new CultureInfo("zu", "-", "+", ".", 2, NumberNegativePattern.Left, ",", [3]);
						break;
				}
				if (c) {
					CultureInfo._cache[k] = c;
					return c;
				}
			}
			return CultureInfo.invariantCulture;
		}
	}
}
