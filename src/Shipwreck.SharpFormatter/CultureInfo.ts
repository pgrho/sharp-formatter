module Shipwreck {
	"use strict";
	export class CultureInfo {
		
		private static _cache: { [name: string]: CultureInfo };
		private static _invariantCulture : CultureInfo;
		private static _currentCulture: CultureInfo;
		
		public name: string;
		public positiveSign: string;
		public negativeSign: string;
		
		public positiveInifinitySymbol: string;
		public negativeInifinitySymbol: string;
		public NaNSymbol: string;

		public numberDecimalSeparator: string;
		public numberDecimalDigits: number;
		public numberNegativePattern: SymbolPosition;
		public numberGroupSeparator: string;
		public numberGroupSizes: number[];
		
		public currencySymbol: string;
		public currencyPositivePattern: SymbolPosition;
		public currencyNegativePattern: SymbolNegativePattern;
		public currencyDecimalDigits: number;
		public currencyDecimalSeparator: string;
		public currencyGroupSeparator: string;
		public currencyGroupSizes: number[];
		
		public percentSymbol: string;
		public percentPositivePattern: SymbolPosition;
		public percentNegativePattern: SymbolNegativePattern;
		public percentDecimalDigits: number;
		public percentDecimalSeparator: string;
		public percentGroupSeparator: string;
		public percentGroupSizes: number[];
		
		private constructor(name: string, positiveSign: string, negativeSign: string
		, positiveInifinitySymbol: string, negativeInifinitySymbol: string, NaNSymbol: string
		, numberDecimalSeparator: string, numberDecimalDigits: number
		, numberNegativePattern: SymbolPosition, numberGroupSeparator: string, numberGroupSizes: number[]
		, currencySymbol: string, currencyPositivePattern: SymbolPosition, currencyNegativePattern: SymbolNegativePattern
		, currencyDecimalDigits: number, currencyDecimalSeparator: string, currencyGroupSeparator: string, currencyGroupSizes: number[]
		, percentSymbol: string, percentPositivePattern: SymbolPosition, percentNegativePattern: SymbolNegativePattern
		, percentDecimalDigits: number, percentDecimalSeparator: string, percentGroupSeparator: string, percentGroupSizes: number[]) {
			this.name = name;
			this.positiveSign = positiveSign;
			this.negativeSign = negativeSign;

			this.positiveInifinitySymbol = positiveInifinitySymbol;
			this.negativeInifinitySymbol = negativeInifinitySymbol;
			this.NaNSymbol = NaNSymbol;

			this.numberDecimalSeparator = numberDecimalSeparator;
			this.numberDecimalDigits = numberDecimalDigits;
			this.numberNegativePattern = numberNegativePattern;
			this.numberGroupSeparator = numberGroupSeparator;
			this.numberGroupSizes = numberGroupSizes;

			this.currencySymbol = currencySymbol;
			this.currencyPositivePattern = currencyPositivePattern;
			this.currencyNegativePattern = currencyNegativePattern;
			this.currencyDecimalDigits = currencyDecimalDigits;
			this.currencyDecimalSeparator = currencyDecimalSeparator;
			this.currencyGroupSeparator = currencyGroupSeparator ;
			this.currencyGroupSizes = currencyGroupSizes;

			this.percentSymbol = percentSymbol;
			this.percentPositivePattern = percentPositivePattern;
			this.percentNegativePattern = percentNegativePattern;
			this.percentDecimalDigits = percentDecimalDigits;
			this.percentDecimalSeparator = percentDecimalSeparator;
			this.percentGroupSeparator = percentGroupSeparator ;
			this.percentGroupSizes = percentGroupSizes;
		}
		
		public numberType() : INumberTypeInfo {
			return {
				decimalSeparator: this.numberDecimalSeparator,
				decimalDigits: this.numberDecimalDigits,
				groupSeparator: this.numberGroupSeparator,
				groupSizes: this.numberGroupSizes
			};
		}
		public percentType() : INumberTypeInfo {
			return {
				decimalSeparator: this.percentDecimalSeparator,
				decimalDigits: this.percentDecimalDigits,
				groupSeparator: this.percentGroupSeparator,
				groupSizes: this.percentGroupSizes
			};
		}
		public currencyType() : INumberTypeInfo {
			return {
				decimalSeparator: this.currencyDecimalSeparator,
				decimalDigits: this.currencyDecimalDigits,
				groupSeparator: this.currencyGroupSeparator,
				groupSizes: this.currencyGroupSizes
			};
		}

		public static get invariantCulture() : CultureInfo {
			return CultureInfo._invariantCulture || (CultureInfo._invariantCulture = new CultureInfo("", "+", "-", "Infinity", "-Infinity", "NaN", ".", 2, SymbolPosition.Left, ",", [3], "¤", SymbolPosition.Left, SymbolNegativePattern.ParenthesizedLeft, 2, ".", ",", [3], "%", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ".", ",", [3]));
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
					case "om":
						c = new CultureInfo(k, "+", "-", "∞", "-∞", "NaN", ".", 2, SymbolPosition.Left, ",", [3], "Br", SymbolPosition.Left, SymbolNegativePattern.SignSymbolNumber, 2, ".", ",", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ".", ",", [3]);
						break;
					case "af":
					case "nr":
					case "ss":
					case "st":
					case "ve":
						c = new CultureInfo(k, "+", "-", "∞", "-∞", "NaN", ",", 2, SymbolPosition.Left, " ", [3], "R", SymbolPosition.Left, SymbolNegativePattern.SignSymbolNumber, 2, ",", " ", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ",", " ", [3]);
						break;
					case "ak":
						c = new CultureInfo(k, "+", "-", "∞", "-∞", "NaN", ".", 2, SymbolPosition.Left, ",", [3], "GH₵", SymbolPosition.Left, SymbolNegativePattern.SignSymbolNumber, 2, ".", ",", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ".", ",", [3]);
						break;
					case "am":
						c = new CultureInfo(k, "+", "-", "∞", "-∞", "NaN", ".", 2, SymbolPosition.Left, ",", [3], "ብር", SymbolPosition.Left, SymbolNegativePattern.SignSymbolNumber, 2, ".", ",", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ".", ",", [3]);
						break;
					case "ar":
						c = new CultureInfo(k, "+", "-", "∞", "-∞", "ليس رقمًا", ".", 2, SymbolPosition.Left, ",", [3], "ر.س.‏", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ".", ",", [3], "%", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ".", ",", [3]);
						break;
					case "as":
					case "or":
					case "pa":
					case "ta":
						c = new CultureInfo(k, "+", "-", "∞", "-∞", "NaN", ".", 2, SymbolPosition.Left, ",", [3, 2], "₹", SymbolPosition.LeftWithSpace, SymbolNegativePattern.SymbolSpaceSignNumber, 2, ".", ",", [3,2], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ".", ",", [3,2]);
						break;
					case "az":
						c = new CultureInfo(k, "+", "-", "∞", "-∞", "NaN", ",", 2, SymbolPosition.Left, ".", [3], "₼", SymbolPosition.LeftWithSpace, SymbolNegativePattern.SignSymbolSpaceNumber, 2, ",", ".", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ",", ".", [3]);
						break;
					case "ba":
						c = new CultureInfo(k, "+", "-", "∞", "-∞", "NaN", ",", 2, SymbolPosition.Left, " ", [3], "₽", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ",", " ", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ",", " ", [3]);
						break;
					case "be":
						c = new CultureInfo(k, "+", "-", "∞", "-∞", "NaN", ",", 2, SymbolPosition.Left, " ", [3], "Br", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ",", " ", [3], "%", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ",", " ", [3]);
						break;
					case "bg":
						c = new CultureInfo(k, "+", "-", "∞", "-∞", "NaN", ",", 2, SymbolPosition.Left, " ", [3], "лв.", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ",", " ", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ",", " ", [3]);
						break;
					case "bm":
						c = new CultureInfo(k, "+", "-", "∞", "-∞", "NaN", ".", 2, SymbolPosition.Left, ",", [3], "CFA", SymbolPosition.Left, SymbolNegativePattern.SignSymbolNumber, 0, ".", ",", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ".", ",", [3]);
						break;
					case "bn":
						c = new CultureInfo(k, "+", "-", "∞", "-∞", "NaN", ".", 2, SymbolPosition.Left, ",", [3, 2], "৳", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ".", ",", [3,2], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ".", ",", [3,2]);
						break;
					case "bo":
						c = new CultureInfo(k, "+", "-", "∞", "-∞", "NaN", ".", 2, SymbolPosition.Left, ",", [3], "¥", SymbolPosition.Left, SymbolNegativePattern.SymbolSignNumber, 2, ".", ",", [3,0], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ".", ",", [3]);
						break;
					case "br":
					case "fr":
					case "lb":
					case "lt":
					case "sk":
						c = new CultureInfo(k, "+", "-", "∞", "-∞", "NaN", ",", 2, SymbolPosition.Left, " ", [3], "€", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ",", " ", [3], "%", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ",", " ", [3]);
						break;
					case "bs":
						c = new CultureInfo(k, "+", "-", "∞", "-∞", "NaN", ",", 2, SymbolPosition.Left, ".", [3], "KM", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ",", ".", [3], "%", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ",", ".", [3]);
						break;
					case "ca":
					case "el":
					case "it":
						c = new CultureInfo(k, "+", "-", "∞", "-∞", "NaN", ",", 2, SymbolPosition.Left, ".", [3], "€", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ",", ".", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ",", ".", [3]);
						break;
					case "ce":
						c = new CultureInfo(k, "+", "-", "∞", "-∞", "Терхьаш дац", ".", 2, SymbolPosition.Left, ",", [3], "₽", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ".", ",", [3], "%", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ".", ",", [3]);
						break;
					case "co":
						c = new CultureInfo(k, "+", "-", "+Infinitu", "-Infinitu", "Micca numericu", ",", 2, SymbolPosition.Left, " ", [3], "€", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ",", " ", [3], "%", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ",", " ", [3]);
						break;
					case "cs":
						c = new CultureInfo(k, "+", "-", "∞", "-∞", "NaN", ",", 2, SymbolPosition.Left, " ", [3], "Kč", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ",", " ", [3], "%", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ",", " ", [3]);
						break;
					case "cu":
					case "tt":
						c = new CultureInfo(k, "+", "-", "∞", "-∞", "NaN", ",", 2, SymbolPosition.Left, " ", [3], "₽", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ",", " ", [3], "%", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ",", " ", [3]);
						break;
					case "cy":
					case "gd":
					case "gv":
					case "kw":
						c = new CultureInfo(k, "+", "-", "∞", "-∞", "NaN", ".", 2, SymbolPosition.Left, ",", [3], "£", SymbolPosition.Left, SymbolNegativePattern.SignSymbolNumber, 2, ".", ",", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ".", ",", [3]);
						break;
					case "da":
						c = new CultureInfo(k, "+", "-", "∞", "-∞", "NaN", ",", 2, SymbolPosition.Left, ".", [3], "kr.", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ",", ".", [3], "%", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ",", ".", [3]);
						break;
					case "de":
					case "es":
					case "gl":
					case "sl":
						c = new CultureInfo(k, "+", "-", "∞", "-∞", "NaN", ",", 2, SymbolPosition.Left, ".", [3], "€", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ",", ".", [3], "%", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ",", ".", [3]);
						break;
					case "dv":
						c = new CultureInfo(k, "+", "-", "Infinity", "-Infinity", "NaN", ".", 2, SymbolPosition.Left, ",", [3], "ރ.", SymbolPosition.RightWithSpace, SymbolNegativePattern.NumberSpaceSymbolSign, 2, ".", ",", [3], "%", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ".", ",", [3]);
						break;
					case "dz":
						c = new CultureInfo(k, "+", "-", "∞", "-∞", "NaN", ".", 2, SymbolPosition.Left, ",", [3, 2], "Nu.", SymbolPosition.Left, SymbolNegativePattern.SignSymbolNumber, 2, ".", ",", [3,2], "%", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ".", ",", [3,2]);
						break;
					case "ee":
						c = new CultureInfo(k, "+", "-", "∞", "-∞", "mnn", ".", 2, SymbolPosition.Left, ",", [3], "GH₵", SymbolPosition.Left, SymbolNegativePattern.SignSymbolNumber, 2, ".", ",", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ".", ",", [3]);
						break;
					case "en":
						c = new CultureInfo(k, "+", "-", "∞", "-∞", "NaN", ".", 2, SymbolPosition.Left, ",", [3], "$", SymbolPosition.Left, SymbolNegativePattern.ParenthesizedLeft, 2, ".", ",", [3], "%", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ".", ",", [3]);
						break;
					case "eo":
						c = new CultureInfo(k, "+", "-", "∞", "-∞", "NaN", ",", 2, SymbolPosition.Left, " ", [3], "XDR", SymbolPosition.LeftWithSpace, SymbolNegativePattern.SignSymbolSpaceNumber, 2, ",", " ", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ",", " ", [3]);
						break;
					case "et":
						c = new CultureInfo(k, "+", "-", "∞", "-∞", "NaN", ",", 2, SymbolPosition.Left, " ", [3], "€", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ",", " ", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ",", " ", [3]);
						break;
					case "eu":
						c = new CultureInfo(k, "+", "-", "∞", "-∞", "NaN", ",", 2, SymbolPosition.Left, ".", [3], "€", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ",", ".", [3], "%", SymbolPosition.LeftWithSpace, SymbolNegativePattern.SignSymbolSpaceNumber, 2, ",", ".", [3]);
						break;
					case "fa":
						c = new CultureInfo(k, "+", "-", "∞", "-∞", "ناعدد", "/", 2, SymbolPosition.Right, ",", [3], "ريال", SymbolPosition.Right, SymbolNegativePattern.NumberSignSymbol, 2, "/", ",", [3], "%", SymbolPosition.RightWithSpace, SymbolNegativePattern.NumberSignSpaceSymbol, 2, "/", ",", [3]);
						break;
					case "ff":
						c = new CultureInfo(k, "+", "-", "∞", "-∞", "NaN", ",", 2, SymbolPosition.Left, " ", [3], "CFA", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ",", " ", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ",", " ", [3]);
						break;
					case "fi":
						c = new CultureInfo(k, "+", "-", "∞", "-∞", "epäluku", ",", 2, SymbolPosition.Left, " ", [3], "€", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ",", " ", [3], "%", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ",", " ", [3]);
						break;
					case "fo":
						c = new CultureInfo(k, "+", "-", "∞", "-∞", "NaN", ",", 2, SymbolPosition.Left, ".", [3], "kr", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ",", ".", [3], "%", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ",", ".", [3]);
						break;
					case "fy":
						c = new CultureInfo(k, "+", "-", "∞", "-∞", "NaN", ",", 2, SymbolPosition.Left, ".", [3], "€", SymbolPosition.LeftWithSpace, SymbolNegativePattern.SymbolSpaceNumberSign, 2, ",", ".", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ",", ".", [3]);
						break;
					case "ga":
					case "mt":
						c = new CultureInfo(k, "+", "-", "∞", "-∞", "NaN", ".", 2, SymbolPosition.Left, ",", [3], "€", SymbolPosition.Left, SymbolNegativePattern.SignSymbolNumber, 2, ".", ",", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ".", ",", [3]);
						break;
					case "gn":
						c = new CultureInfo(k, "+", "-", "Infinito", "-Infinito", "ndaha’éi papaha", ",", 2, SymbolPosition.Left, ".", [3], "₲", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 0, ",", ".", [3], "%", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ",", ".", [3]);
						break;
					case "gu":
					case "hi":
					case "te":
						c = new CultureInfo(k, "+", "-", "∞", "-∞", "NaN", ".", 2, SymbolPosition.Left, ",", [3, 2], "₹", SymbolPosition.Left, SymbolNegativePattern.SymbolSpaceSignNumber, 2, ".", ",", [3,2], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ".", ",", [3,2]);
						break;
					case "ha":
						c = new CultureInfo(k, "+", "-", "∞", "-∞", "NaN", ".", 2, SymbolPosition.Left, ",", [3], "₦", SymbolPosition.LeftWithSpace, SymbolNegativePattern.SignSymbolSpaceNumber, 2, ".", ",", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ".", ",", [3]);
						break;
					case "he":
						c = new CultureInfo(k, "+", "-", "∞", "-∞", "NaN", ".", 2, SymbolPosition.Left, ",", [3], "₪", SymbolPosition.LeftWithSpace, SymbolNegativePattern.SymbolSignNumber, 2, ".", ",", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ".", ",", [3]);
						break;
					case "hr":
						c = new CultureInfo(k, "+", "-", "∞", "-∞", "NaN", ",", 2, SymbolPosition.LeftWithSpace, ".", [3], "kn", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ",", ".", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ",", ".", [3]);
						break;
					case "hu":
						c = new CultureInfo(k, "+", "-", "∞", "-∞", "NaN", ",", 2, SymbolPosition.Left, " ", [3], "Ft", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ",", " ", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ",", " ", [3]);
						break;
					case "hy":
						c = new CultureInfo(k, "+", "-", "∞", "-∞", "ՈչԹ", ".", 2, SymbolPosition.Left, ",", [3], "֏", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ".", ",", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ".", ",", [3]);
						break;
					case "ia":
						c = new CultureInfo(k, "+", "-", "∞", "-∞", "NaN", ",", 2, SymbolPosition.Left, ".", [3], "€", SymbolPosition.LeftWithSpace, SymbolNegativePattern.SignSymbolSpaceNumber, 2, ",", ".", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ",", ".", [3]);
						break;
					case "id":
						c = new CultureInfo(k, "+", "-", "∞", "-∞", "NaN", ",", 2, SymbolPosition.Left, ".", [3], "Rp", SymbolPosition.Left, SymbolNegativePattern.SignSymbolNumber, 0, ",", ".", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ",", ".", [3]);
						break;
					case "ig":
					case "yo":
						c = new CultureInfo(k, "+", "-", "∞", "-∞", "NaN", ".", 2, SymbolPosition.Left, ",", [3], "₦", SymbolPosition.Left, SymbolNegativePattern.SignSymbolNumber, 2, ".", ",", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ".", ",", [3]);
						break;
					case "ii":
					case "ug":
					case "zh":
						c = new CultureInfo(k, "+", "-", "∞", "-∞", "NaN", ".", 2, SymbolPosition.Left, ",", [3], "¥", SymbolPosition.Left, SymbolNegativePattern.SymbolSignNumber, 2, ".", ",", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ".", ",", [3]);
						break;
					case "is":
						c = new CultureInfo(k, "+", "-", "∞", "-∞", "NaN", ",", 2, SymbolPosition.Left, ".", [3], "ISK", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 0, ",", ".", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ",", ".", [3]);
						break;
					case "iu":
						c = new CultureInfo(k, "+", "-", "Infinity", "-Infinity", "NaN", ".", 2, SymbolPosition.Left, ",", [3], "$", SymbolPosition.Left, SymbolNegativePattern.SignSymbolNumber, 2, ".", ",", [3], "%", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ".", ",", [3]);
						break;
					case "ja":
						c = new CultureInfo(k, "+", "-", "∞", "-∞", "NaN", ".", 2, SymbolPosition.Left, ",", [3], "¥", SymbolPosition.Left, SymbolNegativePattern.SignSymbolNumber, 0, ".", ",", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ".", ",", [3]);
						break;
					case "jv":
						c = new CultureInfo(k, "+", "-", "Infinity", "-Infinity", "NaN", ",", 2, SymbolPosition.Left, ".", [3], "Rp", SymbolPosition.Left, SymbolNegativePattern.SignSymbolNumber, 0, ",", ".", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ",", ".", [3]);
						break;
					case "ka":
						c = new CultureInfo(k, "+", "-", "∞", "-∞", "არ არის რიცხვი", ",", 2, SymbolPosition.Left, " ", [3], "₾", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ",", " ", [3], "%", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ",", " ", [3]);
						break;
					case "ki":
					case "sw":
						c = new CultureInfo(k, "+", "-", "∞", "-∞", "NaN", ".", 2, SymbolPosition.Left, ",", [3], "Ksh", SymbolPosition.Left, SymbolNegativePattern.SignSymbolNumber, 2, ".", ",", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ".", ",", [3]);
						break;
					case "kk":
						c = new CultureInfo(k, "+", "-", "∞", "-∞", "сан емес", ",", 2, SymbolPosition.Left, " ", [3], "₸", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ",", " ", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ",", " ", [3]);
						break;
					case "kl":
						c = new CultureInfo(k, "+", "-", "∞", "-∞", "¤¤¤", ",", 2, SymbolPosition.Left, ".", [3], "kr.", SymbolPosition.Left, SymbolNegativePattern.SymbolSpaceSignNumber, 2, ",", ".", [3,0], "%", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ",", ".", [3]);
						break;
					case "km":
						c = new CultureInfo(k, "+", "-", "∞", "-∞", "NaN", ".", 2, SymbolPosition.LeftWithSpace, ",", [3], "៛", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ".", ",", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ".", ",", [3]);
						break;
					case "kn":
						c = new CultureInfo(k, "+", "-", "∞", "-∞", "NaN", ".", 2, SymbolPosition.Left, ",", [3], "₹", SymbolPosition.Left, SymbolNegativePattern.SymbolSpaceSignNumber, 2, ".", ",", [3,2], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ".", ",", [3]);
						break;
					case "ko":
						c = new CultureInfo(k, "+", "-", "∞", "-∞", "NaN", ".", 2, SymbolPosition.Left, ",", [3], "₩", SymbolPosition.Left, SymbolNegativePattern.SignSymbolNumber, 0, ".", ",", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ".", ",", [3]);
						break;
					case "kr":
						c = new CultureInfo(k, "+", "-", "∞", "-∞", "NaN", ".", 2, SymbolPosition.Left, ",", [3], "₦", SymbolPosition.LeftWithSpace, SymbolNegativePattern.SignSymbolNumber, 2, ".", ",", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ".", ",", [3]);
						break;
					case "ks":
						c = new CultureInfo(k, "+", "-", "∞", "-∞", "NaN", ".", 2, SymbolPosition.Left, ",", [3, 2], "₹", SymbolPosition.LeftWithSpace, SymbolNegativePattern.SignSymbolSpaceNumber, 2, ".", ",", [3,2], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ".", ",", [3,2]);
						break;
					case "ku":
						c = new CultureInfo(k, "+", "-", "∞", "-∞", "NaN", ".", 2, SymbolPosition.Left, ",", [3], "د.ع.‏", SymbolPosition.Left, SymbolNegativePattern.SymbolSignNumber, 2, ".", ",", [3], "٪", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ".", ",", [3]);
						break;
					case "ky":
						c = new CultureInfo(k, "+", "-", "∞", "-∞", "сан эмес", ",", 2, SymbolPosition.Left, " ", [3], "сом", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ",", " ", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ",", " ", [3]);
						break;
					case "la":
						c = new CultureInfo(k, "+", "-", "∞", "-∞", "NaN", ".", 2, SymbolPosition.Left, ",", [3], "XDR", SymbolPosition.Left, SymbolNegativePattern.SignSymbolNumber, 2, ".", ",", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ".", ",", [3]);
						break;
					case "lg":
						c = new CultureInfo(k, "+", "-", "∞", "-∞", "NaN", ".", 2, SymbolPosition.Left, ",", [3], "USh", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 0, ".", ",", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ".", ",", [3]);
						break;
					case "ln":
						c = new CultureInfo(k, "+", "-", "∞", "-∞", "NaN", ",", 2, SymbolPosition.Left, ".", [3], "FC", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ",", ".", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ",", ".", [3]);
						break;
					case "lo":
						c = new CultureInfo(k, "+", "-", "∞", "-∞", "ບໍ່​ແມ່ນ​ໂຕ​ເລກ", ",", 2, SymbolPosition.Left, ".", [3], "₭", SymbolPosition.Left, SymbolNegativePattern.SymbolSignNumber, 0, ",", ".", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ",", ".", [3]);
						break;
					case "lu":
						c = new CultureInfo(k, "+", "-", "∞", "-∞", "NaN", ",", 2, SymbolPosition.Left, ".", [3], "FC", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ",", ".", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ",", ".", [3]);
						break;
					case "lv":
						c = new CultureInfo(k, "+", "-", "∞", "-∞", "NS", ",", 2, SymbolPosition.Left, " ", [3], "€", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ",", " ", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ",", " ", [3]);
						break;
					case "mg":
						c = new CultureInfo(k, "+", "-", "∞", "-∞", "NaN", ".", 2, SymbolPosition.Left, ",", [3], "Ar", SymbolPosition.LeftWithSpace, SymbolNegativePattern.SignSymbolSpaceNumber, 0, ".", ",", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ".", ",", [3]);
						break;
					case "mi":
						c = new CultureInfo(k, "+", "-", "Infinity", "-Infinity", "NaN", ".", 2, SymbolPosition.Left, ",", [3], "$", SymbolPosition.Left, SymbolNegativePattern.SignSymbolNumber, 2, ".", ",", [3], "%", SymbolPosition.Left, SymbolNegativePattern.SignSymbolNumber, 2, ".", ",", [3]);
						break;
					case "mk":
						c = new CultureInfo(k, "+", "-", "∞", "-∞", "NaN", ",", 2, SymbolPosition.Left, ".", [3], "ден", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ",", ".", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ",", ".", [3]);
						break;
					case "ml":
						c = new CultureInfo(k, "+", "-", "∞", "-∞", "NaN", ".", 2, SymbolPosition.Left, ",", [3, 2], "₹", SymbolPosition.Left, SymbolNegativePattern.SignSymbolNumber, 2, ".", ",", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ".", ",", [3,2]);
						break;
					case "mn":
						c = new CultureInfo(k, "+", "-", "∞", "-∞", "NaN", ".", 2, SymbolPosition.Left, ",", [3], "₮", SymbolPosition.LeftWithSpace, SymbolNegativePattern.SignSymbolSpaceNumber, 0, ".", ",", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ".", ",", [3]);
						break;
					case "mr":
						c = new CultureInfo(k, "+", "-", "∞", "-∞", "NaN", ".", 2, SymbolPosition.Left, ",", [3, 2], "₹", SymbolPosition.Left, SymbolNegativePattern.SymbolSpaceSignNumber, 2, "`", ",", [3,2], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ".", ",", [3,2]);
						break;
					case "ms":
						c = new CultureInfo(k, "+", "-", "∞", "-∞", "NaN", ".", 2, SymbolPosition.Left, ",", [3], "RM", SymbolPosition.Left, SymbolNegativePattern.SignSymbolNumber, 2, ".", ",", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ".", ",", [3]);
						break;
					case "my":
						c = new CultureInfo(k, "+", "-", "∞", "-∞", "ဂဏန်းမဟုတ်သော", ".", 2, SymbolPosition.Left, ",", [3], "K", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 0, ".", ",", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ".", ",", [3]);
						break;
					case "nb":
					case "no":
						c = new CultureInfo(k, "+", "-", "∞", "-∞", "NaN", ",", 2, SymbolPosition.Left, " ", [3], "kr", SymbolPosition.LeftWithSpace, SymbolNegativePattern.SignSymbolSpaceNumber, 2, ",", " ", [3], "%", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ",", " ", [3]);
						break;
					case "nd":
					case "sn":
						c = new CultureInfo(k, "+", "-", "∞", "-∞", "NaN", ".", 2, SymbolPosition.Left, ",", [3], "$", SymbolPosition.Left, SymbolNegativePattern.SignSymbolNumber, 2, ".", ",", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ".", ",", [3]);
						break;
					case "ne":
						c = new CultureInfo(k, "+", "-", "∞", "-∞", "NaN", ".", 2, SymbolPosition.Left, ",", [3], "रु", SymbolPosition.LeftWithSpace, SymbolNegativePattern.SignSymbolSpaceNumber, 2, ".", ",", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ".", ",", [3]);
						break;
					case "nl":
						c = new CultureInfo(k, "+", "-", "∞", "-∞", "NaN", ",", 2, SymbolPosition.Left, ".", [3], "€", SymbolPosition.LeftWithSpace, SymbolNegativePattern.SymbolSpaceSignNumber, 2, ",", ".", [3], "%", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ",", ".", [3]);
						break;
					case "nn":
						c = new CultureInfo(k, "+", "-", "∞", "-∞", "NaN", ",", 2, SymbolPosition.Left, " ", [3], "kr", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ",", " ", [3], "%", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ",", " ", [3]);
						break;
					case "oc":
						c = new CultureInfo(k, "+", "-", "+Infinit", "-Infinit", "Micca numericu", ",", 2, SymbolPosition.Left, " ", [3], "€", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ",", " ", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ",", " ", [3]);
						break;
					case "os":
						c = new CultureInfo(k, "+", "-", "∞", "-∞", "НН", ",", 2, SymbolPosition.Left, " ", [3], "₾", SymbolPosition.LeftWithSpace, SymbolNegativePattern.SignSymbolSpaceNumber, 2, ",", " ", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ",", " ", [3]);
						break;
					case "pl":
						c = new CultureInfo(k, "+", "-", "∞", "-∞", "NaN", ",", 2, SymbolPosition.Left, " ", [3], "zł", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ",", " ", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ",", " ", [3]);
						break;
					case "ps":
						c = new CultureInfo(k, "+", "-", "∞", "-∞", "NaN", ",", 2, SymbolPosition.Left, ".", [3], "؋", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 0, ",", ".", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ",", ".", [3]);
						break;
					case "pt":
						c = new CultureInfo(k, "+", "-", "∞", "-∞", "NaN", ",", 2, SymbolPosition.Left, ".", [3], "R$", SymbolPosition.Left, SymbolNegativePattern.SignSymbolNumber, 2, ",", ".", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ",", ".", [3]);
						break;
					case "rm":
						c = new CultureInfo(k, "+", "-", "∞", "-∞", "NaN", ".", 2, SymbolPosition.Left, "’", [3], "CHF", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ".", "’", [3], "%", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ".", "’", [3]);
						break;
					case "rn":
						c = new CultureInfo(k, "+", "-", "∞", "-∞", "NaN", ",", 2, SymbolPosition.Left, ".", [3], "FBu", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 0, ",", ".", [3], "%", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ",", ".", [3]);
						break;
					case "ro":
						c = new CultureInfo(k, "+", "-", "∞", "-∞", "NaN", ",", 2, SymbolPosition.Left, ".", [3], "lei", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ",", ".", [3], "%", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ",", ".", [3]);
						break;
					case "ru":
						c = new CultureInfo(k, "+", "-", "∞", "-∞", "не число", ",", 2, SymbolPosition.Left, " ", [3], "₽", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ",", " ", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ",", " ", [3]);
						break;
					case "rw":
						c = new CultureInfo(k, "+", "-", "∞", "-∞", "NaN", ",", 2, SymbolPosition.Left, ".", [3], "RF", SymbolPosition.LeftWithSpace, SymbolNegativePattern.SignSymbolSpaceNumber, 0, ",", ".", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ",", ".", [3]);
						break;
					case "sa":
						c = new CultureInfo(k, "+", "-", "Infinity", "-Infinity", "NaN", ".", 2, SymbolPosition.Left, ",", [3, 2], "₹", SymbolPosition.LeftWithSpace, SymbolNegativePattern.SymbolSpaceSignNumber, 2, ".", ",", [3,2], "%", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ".", ",", [3,2]);
						break;
					case "sd":
						c = new CultureInfo(k, "+", "-", "Infinity", "Infinity-", "NaN", ".", 2, SymbolPosition.Right, ",", [3], "Rs", SymbolPosition.LeftWithSpace, SymbolNegativePattern.SignSymbolSpaceNumber, 2, ".", ",", [3], "%", SymbolPosition.LeftWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ".", ",", [3]);
						break;
					case "se":
						c = new CultureInfo(k, "+", "-", "∞", "-∞", "¤¤¤", ",", 2, SymbolPosition.Left, " ", [3], "kr", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ",", " ", [3], "%", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ",", " ", [3]);
						break;
					case "sg":
						c = new CultureInfo(k, "+", "-", "∞", "-∞", "NaN", ",", 2, SymbolPosition.Left, ".", [3], "FCFA", SymbolPosition.Left, SymbolNegativePattern.SymbolSignNumber, 0, ",", ".", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ",", ".", [3]);
						break;
					case "si":
						c = new CultureInfo(k, "+", "-", "∞", "-∞", "NaN", ".", 2, SymbolPosition.Left, ",", [3], "රු.", SymbolPosition.Left, SymbolNegativePattern.SignSymbolNumber, 2, ".", ",", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ".", ",", [3]);
						break;
					case "so":
						c = new CultureInfo(k, "+", "-", "∞", "-∞", "NaN", ".", 2, SymbolPosition.Left, ",", [3], "S", SymbolPosition.Left, SymbolNegativePattern.SignSymbolNumber, 0, ".", ",", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ".", ",", [3]);
						break;
					case "sq":
						c = new CultureInfo(k, "+", "-", "∞", "-∞", "NaN", ",", 2, SymbolPosition.Left, " ", [3], "Lekë", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 0, ",", " ", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ",", " ", [3]);
						break;
					case "sr":
						c = new CultureInfo(k, "+", "-", "∞", "-∞", "NaN", ",", 2, SymbolPosition.Left, ".", [3], "RSD", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 0, ",", ".", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ",", ".", [3]);
						break;
					case "sv":
						c = new CultureInfo(k, "+", "-", "∞", "-∞", "¤¤¤", ",", 2, SymbolPosition.Left, " ", [3], "kr", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ",", ".", [3], "%", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ",", " ", [3]);
						break;
					case "tg":
						c = new CultureInfo(k, "+", "-", "∞", "-∞", "NaN", ",", 2, SymbolPosition.Left, " ", [3], "смн", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ",", " ", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ",", " ", [3]);
						break;
					case "th":
						c = new CultureInfo(k, "+", "-", "∞", "-∞", "NaN", ".", 2, SymbolPosition.Left, ",", [3], "฿", SymbolPosition.Left, SymbolNegativePattern.SignSymbolNumber, 2, ".", ",", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ".", ",", [3]);
						break;
					case "ti":
						c = new CultureInfo(k, "+", "-", "∞", "-∞", "NaN", ".", 2, SymbolPosition.Left, ",", [3], "Nfk", SymbolPosition.Left, SymbolNegativePattern.SignSymbolNumber, 2, ".", ",", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ".", ",", [3]);
						break;
					case "tk":
						c = new CultureInfo(k, "+", "-", "∞", "-∞", "san däl", ",", 2, SymbolPosition.Left, " ", [3], "m.", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ",", " ", [3], "%", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ",", " ", [3]);
						break;
					case "tn":
					case "xh":
						c = new CultureInfo(k, "+", "-", "∞", "-∞", "NaN", ".", 2, SymbolPosition.Left, " ", [3], "R", SymbolPosition.Left, SymbolNegativePattern.SignSymbolNumber, 2, ".", " ", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ".", " ", [3]);
						break;
					case "to":
						c = new CultureInfo(k, "+", "-", "∞", "-∞", "TF", ".", 2, SymbolPosition.Left, ",", [3], "T$", SymbolPosition.LeftWithSpace, SymbolNegativePattern.SignSymbolSpaceNumber, 2, ".", ",", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ".", ",", [3]);
						break;
					case "tr":
						c = new CultureInfo(k, "+", "-", "∞", "-∞", "NaN", ",", 2, SymbolPosition.Left, ".", [3], "₺", SymbolPosition.Left, SymbolNegativePattern.SignSymbolNumber, 2, ",", ".", [3], "%", SymbolPosition.Left, SymbolNegativePattern.SignSymbolNumber, 2, ",", ".", [3]);
						break;
					case "ts":
						c = new CultureInfo(k, "+", "-", "∞", "-∞", "NaN", ",", 2, SymbolPosition.Left, " ", [3], "R", SymbolPosition.LeftWithSpace, SymbolNegativePattern.SignSymbolSpaceNumber, 2, ",", " ", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ",", " ", [3]);
						break;
					case "uk":
						c = new CultureInfo(k, "+", "-", "∞", "-∞", "NaN", ",", 2, SymbolPosition.Left, " ", [3], "₴", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ",", " ", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ",", " ", [3]);
						break;
					case "ur":
						c = new CultureInfo(k, "+", "-", "∞", "-∞", "NaN", ".", 2, SymbolPosition.Left, ",", [3], "Rs", SymbolPosition.LeftWithSpace, SymbolNegativePattern.SignSymbolSpaceNumber, 2, ".", ",", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ".", ",", [3]);
						break;
					case "uz":
						c = new CultureInfo(k, "+", "-", "∞", "-∞", "haqiqiy son emas", ",", 2, SymbolPosition.Left, " ", [3], "soʻm", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 0, ",", " ", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ",", " ", [3]);
						break;
					case "vi":
						c = new CultureInfo(k, "+", "-", "∞", "-∞", "NaN", ",", 2, SymbolPosition.Left, ".", [3], "₫", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ",", ".", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ",", ".", [3]);
						break;
					case "vo":
					case "yi":
						c = new CultureInfo(k, "+", "-", "∞", "-∞", "NaN", ".", 2, SymbolPosition.Left, ",", [3], "XDR", SymbolPosition.LeftWithSpace, SymbolNegativePattern.SignSymbolSpaceNumber, 2, ".", ",", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ".", ",", [3]);
						break;
					case "wo":
						c = new CultureInfo(k, "+", "-", "+Infini", "-Infini", "Non Numérique", ",", 2, SymbolPosition.Left, " ", [3], "CFA", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ",", " ", [3], "%", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ",", " ", [3]);
						break;
					case "zu":
						c = new CultureInfo(k, "+", "-", "∞", "-∞", "NaN", ".", 2, SymbolPosition.Left, ",", [3], "R", SymbolPosition.Left, SymbolNegativePattern.SignSymbolNumber, 2, ".", ",", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ".", ",", [3]);
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
