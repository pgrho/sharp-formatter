module Shipwreck {
	export enum SymbolPosition {
		Parenthesis,
		Left,
		LeftWithSpace,
		Right,
		RightWithSpace,
	}
	export enum PercentNegativePattern {
		SignNumberSpacePercent,
		SignNumberPercent,
		SignPercentNumber,
		PercentSignNumber,
		PercentNumberSign,
		NumberSignPercent,
		NumberPercentSign,
		SignPercentSpaceNumber,
		NumberSpacePercentSign,
		PercentSpaceNumberSign,
		PercentSpaceSignNumber,
		NumberSignSpacePercent
	}
	export class CultureInfo {
		
		private static _cache: { [name: string]: CultureInfo };
		private static _invariantCulture : CultureInfo;
		private static _currentCulture: CultureInfo;
		
		public name: string;
		public positiveSign: string;
		public negativeSign: string;
		public numberDecimalSeparator: string;
		public numberDecimalDigits: number;
		public numberNegativePattern: SymbolPosition;
		public numberGroupSeparator: string;
		public numberGroupSizes: number[];
		
		public percentSymbol: string;
		public percentPositivePattern: SymbolPosition;
		public percentNegativePattern: PercentNegativePattern;
		public percentDecimalDigits: number;
		public percentDecimalSeparator: string;
		public percentGroupSeparator: string;
		public percentGroupSizes: number[];
		
		private constructor(name: string, positiveSign: string, negativeSign: string, numberDecimalSeparator: string, numberDecimalDigits: number
		, numberNegativePattern: SymbolPosition, numberGroupSeparator: string, numberGroupSizes: number[]
		, percentSymbol: string, percentPositivePattern: SymbolPosition, percentNegativePattern: PercentNegativePattern
		, percentDecimalDigits: number, percentDecimalSeparator: string, percentGroupSeparator: string, percentGroupSizes: number[]) {
			this.name = name;
			this.positiveSign = positiveSign;
			this.negativeSign = negativeSign;
			this.numberDecimalSeparator = numberDecimalSeparator;
			this.numberDecimalDigits = numberDecimalDigits;
			this.numberNegativePattern = numberNegativePattern;
			this.numberGroupSeparator = numberGroupSeparator;
			this.numberGroupSizes = numberGroupSizes;

			this.percentSymbol = percentSymbol;
			this.percentPositivePattern = percentPositivePattern;
			this.percentNegativePattern = percentNegativePattern;
			this.percentDecimalDigits = percentDecimalDigits;
			this.percentDecimalSeparator = percentDecimalSeparator;
			this.percentGroupSeparator = percentGroupSeparator ;
			this.percentGroupSizes = percentGroupSizes;
		}

		public static get invariantCulture() : CultureInfo {
			return CultureInfo._invariantCulture || (CultureInfo._invariantCulture = new CultureInfo("", "+", "-", ".", 2, SymbolPosition.Left, ",", [3], "%", SymbolPosition.RightWithSpace, PercentNegativePattern.SignNumberSpacePercent, 2, ".", ",", [3]));
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
					case "ak":
					case "am":
					case "bm":
					case "bo":
					case "cy":
					case "ee":
					case "ga":
					case "gd":
					case "gv":
					case "ha":
					case "he":
					case "hy":
					case "ig":
					case "ii":
					case "ja":
					case "ki":
					case "kn":
					case "ko":
					case "kr":
					case "kw":
					case "lg":
					case "mg":
					case "mn":
					case "ms":
					case "mt":
					case "my":
					case "nd":
					case "ne":
					case "om":
					case "si":
					case "sn":
					case "so":
					case "sw":
					case "th":
					case "ti":
					case "to":
					case "ug":
					case "ur":
					case "vo":
					case "yi":
					case "yo":
					case "zh":
					case "zu":
						c = new CultureInfo(k, "+", "-", ".", 2, SymbolPosition.Left, ",", [3], "%", SymbolPosition.Right, PercentNegativePattern.SignNumberPercent, 2, ".", ",", [3]);
						break;
					case "af":
					case "ba":
					case "bg":
					case "eo":
					case "et":
					case "ff":
					case "hu":
					case "kk":
					case "ky":
					case "lv":
					case "nr":
					case "oc":
					case "os":
					case "pl":
					case "ru":
					case "sq":
					case "ss":
					case "st":
					case "tg":
					case "ts":
					case "uk":
					case "uz":
					case "ve":
						c = new CultureInfo(k, "+", "-", ",", 2, SymbolPosition.Left, " ", [3], "%", SymbolPosition.Right, PercentNegativePattern.SignNumberPercent, 2, ",", " ", [3]);
						break;
					case "ar":
					case "ce":
					case "dv":
					case "en":
					case "iu":
						c = new CultureInfo(k, "+", "-", ".", 2, SymbolPosition.Left, ",", [3], "%", SymbolPosition.RightWithSpace, PercentNegativePattern.SignNumberSpacePercent, 2, ".", ",", [3]);
						break;
					case "as":
					case "bn":
					case "gu":
					case "hi":
					case "ks":
					case "ml":
					case "mr":
					case "or":
					case "pa":
					case "ta":
					case "te":
						c = new CultureInfo(k, "+", "-", ".", 2, SymbolPosition.Left, ",", [3, 2], "%", SymbolPosition.Right, PercentNegativePattern.SignNumberPercent, 2, ".", ",", [3,2]);
						break;
					case "az":
					case "ca":
					case "el":
					case "fy":
					case "ia":
					case "id":
					case "is":
					case "it":
					case "jv":
					case "ln":
					case "lo":
					case "lu":
					case "mk":
					case "ps":
					case "pt":
					case "rw":
					case "sg":
					case "sr":
					case "vi":
						c = new CultureInfo(k, "+", "-", ",", 2, SymbolPosition.Left, ".", [3], "%", SymbolPosition.Right, PercentNegativePattern.SignNumberPercent, 2, ",", ".", [3]);
						break;
					case "be":
					case "br":
					case "co":
					case "cs":
					case "cu":
					case "fi":
					case "fr":
					case "ka":
					case "lb":
					case "lt":
					case "nb":
					case "nn":
					case "no":
					case "se":
					case "sk":
					case "sv":
					case "tk":
					case "tt":
					case "wo":
						c = new CultureInfo(k, "+", "-", ",", 2, SymbolPosition.Left, " ", [3], "%", SymbolPosition.RightWithSpace, PercentNegativePattern.SignNumberSpacePercent, 2, ",", " ", [3]);
						break;
					case "bs":
					case "da":
					case "de":
					case "es":
					case "fo":
					case "gl":
					case "gn":
					case "kl":
					case "nl":
					case "rn":
					case "ro":
					case "sl":
						c = new CultureInfo(k, "+", "-", ",", 2, SymbolPosition.Left, ".", [3], "%", SymbolPosition.RightWithSpace, PercentNegativePattern.SignNumberSpacePercent, 2, ",", ".", [3]);
						break;
					case "dz":
					case "sa":
						c = new CultureInfo(k, "+", "-", ".", 2, SymbolPosition.Left, ",", [3, 2], "%", SymbolPosition.RightWithSpace, PercentNegativePattern.SignNumberSpacePercent, 2, ".", ",", [3,2]);
						break;
					case "eu":
						c = new CultureInfo(k, "+", "-", ",", 2, SymbolPosition.Left, ".", [3], "%", SymbolPosition.LeftWithSpace, PercentNegativePattern.SignPercentSpaceNumber, 2, ",", ".", [3]);
						break;
					case "fa":
						c = new CultureInfo(k, "+", "-", "/", 2, SymbolPosition.Right, ",", [3], "%", SymbolPosition.RightWithSpace, PercentNegativePattern.NumberSignSpacePercent, 2, "/", ",", [3]);
						break;
					case "hr":
						c = new CultureInfo(k, "+", "-", ",", 2, SymbolPosition.LeftWithSpace, ".", [3], "%", SymbolPosition.Right, PercentNegativePattern.SignNumberPercent, 2, ",", ".", [3]);
						break;
					case "km":
						c = new CultureInfo(k, "+", "-", ".", 2, SymbolPosition.LeftWithSpace, ",", [3], "%", SymbolPosition.Right, PercentNegativePattern.SignNumberPercent, 2, ".", ",", [3]);
						break;
					case "ku":
						c = new CultureInfo(k, "+", "-", ".", 2, SymbolPosition.Left, ",", [3], "٪", SymbolPosition.Right, PercentNegativePattern.SignNumberPercent, 2, ".", ",", [3]);
						break;
					case "la":
						c = new CultureInfo(k, "+", "-", ".", 2, SymbolPosition.Left, ",", [3], "%", SymbolPosition.Right, PercentNegativePattern.SignNumberSpacePercent, 2, ".", ",", [3]);
						break;
					case "mi":
						c = new CultureInfo(k, "+", "-", ".", 2, SymbolPosition.Left, ",", [3], "%", SymbolPosition.Left, PercentNegativePattern.SignPercentNumber, 2, ".", ",", [3]);
						break;
					case "rm":
						c = new CultureInfo(k, "+", "-", ".", 2, SymbolPosition.Left, "’", [3], "%", SymbolPosition.RightWithSpace, PercentNegativePattern.SignNumberSpacePercent, 2, ".", "’", [3]);
						break;
					case "sd":
						c = new CultureInfo(k, "+", "-", ".", 2, SymbolPosition.Right, ",", [3], "%", SymbolPosition.LeftWithSpace, PercentNegativePattern.SignNumberSpacePercent, 2, ".", ",", [3]);
						break;
					case "tn":
					case "xh":
						c = new CultureInfo(k, "+", "-", ".", 2, SymbolPosition.Left, " ", [3], "%", SymbolPosition.Right, PercentNegativePattern.SignNumberPercent, 2, ".", " ", [3]);
						break;
					case "tr":
						c = new CultureInfo(k, "+", "-", ",", 2, SymbolPosition.Left, ".", [3], "%", SymbolPosition.Left, PercentNegativePattern.SignPercentNumber, 2, ",", ".", [3]);
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
