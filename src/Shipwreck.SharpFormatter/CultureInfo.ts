module Shipwreck {
	"use strict";
	export class CultureInfo {
		
		private static _cache: { [name: string]: CultureInfo };
		private static _invariantCulture : CultureInfo;
		private static _currentCulture: CultureInfo;
		
		public name: string;
		
		private _numberFormat: NumberFormatInfo;
		private _dateTimeFormat: DateTimeFormatInfo;

		private constructor(name: string) {
			this.name = name;
		}
		
		public get numberFormat(): NumberFormatInfo {
			return this._numberFormat || (this._numberFormat = NumberFormatInfo.getInstance(this.name));
		}

		public get dateTimeFormat(): DateTimeFormatInfo {
			return this._dateTimeFormat || (this._dateTimeFormat = DateTimeFormatInfo.getInstance(this.name));
		}

		public static get invariantCulture() : CultureInfo {
			return CultureInfo._invariantCulture || (CultureInfo._invariantCulture = new CultureInfo(""));
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
				c = new CultureInfo(k);
				CultureInfo._cache[k] = c;
				return c;
			}
			return CultureInfo.invariantCulture;
		}
	}
	export class NumberFormatInfo {

		private static _invariantInfo: NumberFormatInfo;
		private static _cache: { [name: string]: NumberFormatInfo };

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
		private constructor(positiveSign: string, negativeSign: string, positiveInifinitySymbol: string, negativeInifinitySymbol: string, NaNSymbol: string, numberDecimalSeparator: string, numberDecimalDigits: number, numberNegativePattern: SymbolPosition, numberGroupSeparator: string, numberGroupSizes: number[], currencySymbol: string, currencyPositivePattern: SymbolPosition, currencyNegativePattern: SymbolNegativePattern, currencyDecimalDigits: number, currencyDecimalSeparator: string, currencyGroupSeparator: string, currencyGroupSizes: number[], percentSymbol: string, percentPositivePattern: SymbolPosition, percentNegativePattern: SymbolNegativePattern, percentDecimalDigits: number, percentDecimalSeparator: string, percentGroupSeparator: string, percentGroupSizes: number[]) {
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
			this.currencyGroupSeparator = currencyGroupSeparator;
			this.currencyGroupSizes = currencyGroupSizes;
			this.percentSymbol = percentSymbol;
			this.percentPositivePattern = percentPositivePattern;
			this.percentNegativePattern = percentNegativePattern;
			this.percentDecimalDigits = percentDecimalDigits;
			this.percentDecimalSeparator = percentDecimalSeparator;
			this.percentGroupSeparator = percentGroupSeparator;
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
		
		public static get invariantInfo() : NumberFormatInfo {
			return NumberFormatInfo._invariantInfo || (NumberFormatInfo._invariantInfo = new NumberFormatInfo("+", "-", "Infinity", "-Infinity", "NaN", ".", 2, SymbolPosition.Left, ",", [3], "¤", SymbolPosition.Left, SymbolNegativePattern.ParenthesizedLeft, 2, ".", ",", [3], "%", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ".", ",", [3]));
		}

		public static getInstance(name: string): NumberFormatInfo {
			if (name) {
				var k = name.substring(0, 2).toLowerCase();
				var c : NumberFormatInfo;
				if (NumberFormatInfo._cache) {
					c = NumberFormatInfo._cache[k];
					if (c) {
						return c;
					}
				} else {
					NumberFormatInfo._cache = {};
				}
				switch (k) {
					case "aa":
					case "om":
						c = new NumberFormatInfo("+", "-", "∞", "-∞", "NaN", ".", 2, SymbolPosition.Left, ",", [3], "Br", SymbolPosition.Left, SymbolNegativePattern.SignSymbolNumber, 2, ".", ",", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ".", ",", [3]);
						break;
					case "af":
					case "nr":
					case "ss":
					case "st":
					case "ve":
						c = new NumberFormatInfo("+", "-", "∞", "-∞", "NaN", ",", 2, SymbolPosition.Left, " ", [3], "R", SymbolPosition.Left, SymbolNegativePattern.SignSymbolNumber, 2, ",", " ", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ",", " ", [3]);
						break;
					case "ak":
						c = new NumberFormatInfo("+", "-", "∞", "-∞", "NaN", ".", 2, SymbolPosition.Left, ",", [3], "GH₵", SymbolPosition.Left, SymbolNegativePattern.SignSymbolNumber, 2, ".", ",", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ".", ",", [3]);
						break;
					case "am":
						c = new NumberFormatInfo("+", "-", "∞", "-∞", "NaN", ".", 2, SymbolPosition.Left, ",", [3], "ብር", SymbolPosition.Left, SymbolNegativePattern.SignSymbolNumber, 2, ".", ",", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ".", ",", [3]);
						break;
					case "ar":
						c = new NumberFormatInfo("+", "-", "∞", "-∞", "ليس رقمًا", ".", 2, SymbolPosition.Left, ",", [3], "ر.س.‏", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ".", ",", [3], "%", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ".", ",", [3]);
						break;
					case "as":
					case "or":
					case "pa":
					case "ta":
						c = new NumberFormatInfo("+", "-", "∞", "-∞", "NaN", ".", 2, SymbolPosition.Left, ",", [3, 2], "₹", SymbolPosition.LeftWithSpace, SymbolNegativePattern.SymbolSpaceSignNumber, 2, ".", ",", [3, 2], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ".", ",", [3, 2]);
						break;
					case "az":
						c = new NumberFormatInfo("+", "-", "∞", "-∞", "NaN", ",", 2, SymbolPosition.Left, ".", [3], "₼", SymbolPosition.LeftWithSpace, SymbolNegativePattern.SignSymbolSpaceNumber, 2, ",", ".", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ",", ".", [3]);
						break;
					case "ba":
						c = new NumberFormatInfo("+", "-", "∞", "-∞", "NaN", ",", 2, SymbolPosition.Left, " ", [3], "₽", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ",", " ", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ",", " ", [3]);
						break;
					case "be":
						c = new NumberFormatInfo("+", "-", "∞", "-∞", "NaN", ",", 2, SymbolPosition.Left, " ", [3], "Br", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ",", " ", [3], "%", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ",", " ", [3]);
						break;
					case "bg":
						c = new NumberFormatInfo("+", "-", "∞", "-∞", "NaN", ",", 2, SymbolPosition.Left, " ", [3], "лв.", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ",", " ", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ",", " ", [3]);
						break;
					case "bm":
						c = new NumberFormatInfo("+", "-", "∞", "-∞", "NaN", ".", 2, SymbolPosition.Left, ",", [3], "CFA", SymbolPosition.Left, SymbolNegativePattern.SignSymbolNumber, 0, ".", ",", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ".", ",", [3]);
						break;
					case "bn":
						c = new NumberFormatInfo("+", "-", "∞", "-∞", "NaN", ".", 2, SymbolPosition.Left, ",", [3, 2], "৳", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ".", ",", [3, 2], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ".", ",", [3, 2]);
						break;
					case "bo":
						c = new NumberFormatInfo("+", "-", "∞", "-∞", "NaN", ".", 2, SymbolPosition.Left, ",", [3], "¥", SymbolPosition.Left, SymbolNegativePattern.SymbolSignNumber, 2, ".", ",", [3, 0], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ".", ",", [3]);
						break;
					case "br":
					case "fr":
					case "lb":
					case "lt":
					case "sk":
						c = new NumberFormatInfo("+", "-", "∞", "-∞", "NaN", ",", 2, SymbolPosition.Left, " ", [3], "€", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ",", " ", [3], "%", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ",", " ", [3]);
						break;
					case "bs":
						c = new NumberFormatInfo("+", "-", "∞", "-∞", "NaN", ",", 2, SymbolPosition.Left, ".", [3], "KM", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ",", ".", [3], "%", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ",", ".", [3]);
						break;
					case "ca":
					case "el":
					case "it":
						c = new NumberFormatInfo("+", "-", "∞", "-∞", "NaN", ",", 2, SymbolPosition.Left, ".", [3], "€", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ",", ".", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ",", ".", [3]);
						break;
					case "ce":
						c = new NumberFormatInfo("+", "-", "∞", "-∞", "Терхьаш дац", ".", 2, SymbolPosition.Left, ",", [3], "₽", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ".", ",", [3], "%", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ".", ",", [3]);
						break;
					case "co":
						c = new NumberFormatInfo("+", "-", "+Infinitu", "-Infinitu", "Micca numericu", ",", 2, SymbolPosition.Left, " ", [3], "€", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ",", " ", [3], "%", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ",", " ", [3]);
						break;
					case "cs":
						c = new NumberFormatInfo("+", "-", "∞", "-∞", "NaN", ",", 2, SymbolPosition.Left, " ", [3], "Kč", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ",", " ", [3], "%", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ",", " ", [3]);
						break;
					case "cu":
					case "tt":
						c = new NumberFormatInfo("+", "-", "∞", "-∞", "NaN", ",", 2, SymbolPosition.Left, " ", [3], "₽", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ",", " ", [3], "%", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ",", " ", [3]);
						break;
					case "cy":
					case "gd":
					case "gv":
					case "kw":
						c = new NumberFormatInfo("+", "-", "∞", "-∞", "NaN", ".", 2, SymbolPosition.Left, ",", [3], "£", SymbolPosition.Left, SymbolNegativePattern.SignSymbolNumber, 2, ".", ",", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ".", ",", [3]);
						break;
					case "da":
						c = new NumberFormatInfo("+", "-", "∞", "-∞", "NaN", ",", 2, SymbolPosition.Left, ".", [3], "kr.", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ",", ".", [3], "%", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ",", ".", [3]);
						break;
					case "de":
					case "es":
					case "gl":
					case "sl":
						c = new NumberFormatInfo("+", "-", "∞", "-∞", "NaN", ",", 2, SymbolPosition.Left, ".", [3], "€", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ",", ".", [3], "%", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ",", ".", [3]);
						break;
					case "dv":
						c = new NumberFormatInfo("+", "-", "Infinity", "-Infinity", "NaN", ".", 2, SymbolPosition.Left, ",", [3], "ރ.", SymbolPosition.RightWithSpace, SymbolNegativePattern.NumberSpaceSymbolSign, 2, ".", ",", [3], "%", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ".", ",", [3]);
						break;
					case "dz":
						c = new NumberFormatInfo("+", "-", "∞", "-∞", "NaN", ".", 2, SymbolPosition.Left, ",", [3, 2], "Nu.", SymbolPosition.Left, SymbolNegativePattern.SignSymbolNumber, 2, ".", ",", [3, 2], "%", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ".", ",", [3, 2]);
						break;
					case "ee":
						c = new NumberFormatInfo("+", "-", "∞", "-∞", "mnn", ".", 2, SymbolPosition.Left, ",", [3], "GH₵", SymbolPosition.Left, SymbolNegativePattern.SignSymbolNumber, 2, ".", ",", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ".", ",", [3]);
						break;
					case "en":
						c = new NumberFormatInfo("+", "-", "∞", "-∞", "NaN", ".", 2, SymbolPosition.Left, ",", [3], "$", SymbolPosition.Left, SymbolNegativePattern.ParenthesizedLeft, 2, ".", ",", [3], "%", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ".", ",", [3]);
						break;
					case "eo":
						c = new NumberFormatInfo("+", "-", "∞", "-∞", "NaN", ",", 2, SymbolPosition.Left, " ", [3], "XDR", SymbolPosition.LeftWithSpace, SymbolNegativePattern.SignSymbolSpaceNumber, 2, ",", " ", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ",", " ", [3]);
						break;
					case "et":
						c = new NumberFormatInfo("+", "-", "∞", "-∞", "NaN", ",", 2, SymbolPosition.Left, " ", [3], "€", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ",", " ", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ",", " ", [3]);
						break;
					case "eu":
						c = new NumberFormatInfo("+", "-", "∞", "-∞", "NaN", ",", 2, SymbolPosition.Left, ".", [3], "€", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ",", ".", [3], "%", SymbolPosition.LeftWithSpace, SymbolNegativePattern.SignSymbolSpaceNumber, 2, ",", ".", [3]);
						break;
					case "fa":
						c = new NumberFormatInfo("+", "-", "∞", "-∞", "ناعدد", "/", 2, SymbolPosition.Right, ",", [3], "ريال", SymbolPosition.Right, SymbolNegativePattern.NumberSignSymbol, 2, "/", ",", [3], "%", SymbolPosition.RightWithSpace, SymbolNegativePattern.NumberSignSpaceSymbol, 2, "/", ",", [3]);
						break;
					case "ff":
						c = new NumberFormatInfo("+", "-", "∞", "-∞", "NaN", ",", 2, SymbolPosition.Left, " ", [3], "CFA", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ",", " ", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ",", " ", [3]);
						break;
					case "fi":
						c = new NumberFormatInfo("+", "-", "∞", "-∞", "epäluku", ",", 2, SymbolPosition.Left, " ", [3], "€", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ",", " ", [3], "%", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ",", " ", [3]);
						break;
					case "fo":
						c = new NumberFormatInfo("+", "-", "∞", "-∞", "NaN", ",", 2, SymbolPosition.Left, ".", [3], "kr", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ",", ".", [3], "%", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ",", ".", [3]);
						break;
					case "fy":
						c = new NumberFormatInfo("+", "-", "∞", "-∞", "NaN", ",", 2, SymbolPosition.Left, ".", [3], "€", SymbolPosition.LeftWithSpace, SymbolNegativePattern.SymbolSpaceNumberSign, 2, ",", ".", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ",", ".", [3]);
						break;
					case "ga":
					case "mt":
						c = new NumberFormatInfo("+", "-", "∞", "-∞", "NaN", ".", 2, SymbolPosition.Left, ",", [3], "€", SymbolPosition.Left, SymbolNegativePattern.SignSymbolNumber, 2, ".", ",", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ".", ",", [3]);
						break;
					case "gn":
						c = new NumberFormatInfo("+", "-", "Infinito", "-Infinito", "ndaha’éi papaha", ",", 2, SymbolPosition.Left, ".", [3], "₲", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 0, ",", ".", [3], "%", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ",", ".", [3]);
						break;
					case "gu":
					case "hi":
					case "te":
						c = new NumberFormatInfo("+", "-", "∞", "-∞", "NaN", ".", 2, SymbolPosition.Left, ",", [3, 2], "₹", SymbolPosition.Left, SymbolNegativePattern.SymbolSpaceSignNumber, 2, ".", ",", [3, 2], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ".", ",", [3, 2]);
						break;
					case "ha":
						c = new NumberFormatInfo("+", "-", "∞", "-∞", "NaN", ".", 2, SymbolPosition.Left, ",", [3], "₦", SymbolPosition.LeftWithSpace, SymbolNegativePattern.SignSymbolSpaceNumber, 2, ".", ",", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ".", ",", [3]);
						break;
					case "he":
						c = new NumberFormatInfo("+", "-", "∞", "-∞", "NaN", ".", 2, SymbolPosition.Left, ",", [3], "₪", SymbolPosition.LeftWithSpace, SymbolNegativePattern.SymbolSignNumber, 2, ".", ",", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ".", ",", [3]);
						break;
					case "hr":
						c = new NumberFormatInfo("+", "-", "∞", "-∞", "NaN", ",", 2, SymbolPosition.LeftWithSpace, ".", [3], "kn", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ",", ".", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ",", ".", [3]);
						break;
					case "hu":
						c = new NumberFormatInfo("+", "-", "∞", "-∞", "NaN", ",", 2, SymbolPosition.Left, " ", [3], "Ft", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ",", " ", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ",", " ", [3]);
						break;
					case "hy":
						c = new NumberFormatInfo("+", "-", "∞", "-∞", "ՈչԹ", ".", 2, SymbolPosition.Left, ",", [3], "֏", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ".", ",", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ".", ",", [3]);
						break;
					case "ia":
						c = new NumberFormatInfo("+", "-", "∞", "-∞", "NaN", ",", 2, SymbolPosition.Left, ".", [3], "€", SymbolPosition.LeftWithSpace, SymbolNegativePattern.SignSymbolSpaceNumber, 2, ",", ".", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ",", ".", [3]);
						break;
					case "id":
						c = new NumberFormatInfo("+", "-", "∞", "-∞", "NaN", ",", 2, SymbolPosition.Left, ".", [3], "Rp", SymbolPosition.Left, SymbolNegativePattern.SignSymbolNumber, 0, ",", ".", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ",", ".", [3]);
						break;
					case "ig":
					case "yo":
						c = new NumberFormatInfo("+", "-", "∞", "-∞", "NaN", ".", 2, SymbolPosition.Left, ",", [3], "₦", SymbolPosition.Left, SymbolNegativePattern.SignSymbolNumber, 2, ".", ",", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ".", ",", [3]);
						break;
					case "ii":
					case "ug":
					case "zh":
						c = new NumberFormatInfo("+", "-", "∞", "-∞", "NaN", ".", 2, SymbolPosition.Left, ",", [3], "¥", SymbolPosition.Left, SymbolNegativePattern.SymbolSignNumber, 2, ".", ",", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ".", ",", [3]);
						break;
					case "is":
						c = new NumberFormatInfo("+", "-", "∞", "-∞", "NaN", ",", 2, SymbolPosition.Left, ".", [3], "ISK", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 0, ",", ".", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ",", ".", [3]);
						break;
					case "iu":
						c = new NumberFormatInfo("+", "-", "Infinity", "-Infinity", "NaN", ".", 2, SymbolPosition.Left, ",", [3], "$", SymbolPosition.Left, SymbolNegativePattern.SignSymbolNumber, 2, ".", ",", [3], "%", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ".", ",", [3]);
						break;
					case "ja":
						c = new NumberFormatInfo("+", "-", "∞", "-∞", "NaN", ".", 2, SymbolPosition.Left, ",", [3], "¥", SymbolPosition.Left, SymbolNegativePattern.SignSymbolNumber, 0, ".", ",", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ".", ",", [3]);
						break;
					case "jv":
						c = new NumberFormatInfo("+", "-", "Infinity", "-Infinity", "NaN", ",", 2, SymbolPosition.Left, ".", [3], "Rp", SymbolPosition.Left, SymbolNegativePattern.SignSymbolNumber, 0, ",", ".", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ",", ".", [3]);
						break;
					case "ka":
						c = new NumberFormatInfo("+", "-", "∞", "-∞", "არ არის რიცხვი", ",", 2, SymbolPosition.Left, " ", [3], "₾", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ",", " ", [3], "%", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ",", " ", [3]);
						break;
					case "ki":
					case "sw":
						c = new NumberFormatInfo("+", "-", "∞", "-∞", "NaN", ".", 2, SymbolPosition.Left, ",", [3], "Ksh", SymbolPosition.Left, SymbolNegativePattern.SignSymbolNumber, 2, ".", ",", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ".", ",", [3]);
						break;
					case "kk":
						c = new NumberFormatInfo("+", "-", "∞", "-∞", "сан емес", ",", 2, SymbolPosition.Left, " ", [3], "₸", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ",", " ", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ",", " ", [3]);
						break;
					case "kl":
						c = new NumberFormatInfo("+", "-", "∞", "-∞", "¤¤¤", ",", 2, SymbolPosition.Left, ".", [3], "kr.", SymbolPosition.Left, SymbolNegativePattern.SymbolSpaceSignNumber, 2, ",", ".", [3, 0], "%", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ",", ".", [3]);
						break;
					case "km":
						c = new NumberFormatInfo("+", "-", "∞", "-∞", "NaN", ".", 2, SymbolPosition.LeftWithSpace, ",", [3], "៛", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ".", ",", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ".", ",", [3]);
						break;
					case "kn":
						c = new NumberFormatInfo("+", "-", "∞", "-∞", "NaN", ".", 2, SymbolPosition.Left, ",", [3], "₹", SymbolPosition.Left, SymbolNegativePattern.SymbolSpaceSignNumber, 2, ".", ",", [3, 2], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ".", ",", [3]);
						break;
					case "ko":
						c = new NumberFormatInfo("+", "-", "∞", "-∞", "NaN", ".", 2, SymbolPosition.Left, ",", [3], "₩", SymbolPosition.Left, SymbolNegativePattern.SignSymbolNumber, 0, ".", ",", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ".", ",", [3]);
						break;
					case "kr":
						c = new NumberFormatInfo("+", "-", "∞", "-∞", "NaN", ".", 2, SymbolPosition.Left, ",", [3], "₦", SymbolPosition.LeftWithSpace, SymbolNegativePattern.SignSymbolNumber, 2, ".", ",", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ".", ",", [3]);
						break;
					case "ks":
						c = new NumberFormatInfo("+", "-", "∞", "-∞", "NaN", ".", 2, SymbolPosition.Left, ",", [3, 2], "₹", SymbolPosition.LeftWithSpace, SymbolNegativePattern.SignSymbolSpaceNumber, 2, ".", ",", [3, 2], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ".", ",", [3, 2]);
						break;
					case "ku":
						c = new NumberFormatInfo("+", "-", "∞", "-∞", "NaN", ".", 2, SymbolPosition.Left, ",", [3], "د.ع.‏", SymbolPosition.Left, SymbolNegativePattern.SymbolSignNumber, 2, ".", ",", [3], "٪", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ".", ",", [3]);
						break;
					case "ky":
						c = new NumberFormatInfo("+", "-", "∞", "-∞", "сан эмес", ",", 2, SymbolPosition.Left, " ", [3], "сом", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ",", " ", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ",", " ", [3]);
						break;
					case "la":
						c = new NumberFormatInfo("+", "-", "∞", "-∞", "NaN", ".", 2, SymbolPosition.Left, ",", [3], "XDR", SymbolPosition.Left, SymbolNegativePattern.SignSymbolNumber, 2, ".", ",", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ".", ",", [3]);
						break;
					case "lg":
						c = new NumberFormatInfo("+", "-", "∞", "-∞", "NaN", ".", 2, SymbolPosition.Left, ",", [3], "USh", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 0, ".", ",", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ".", ",", [3]);
						break;
					case "ln":
						c = new NumberFormatInfo("+", "-", "∞", "-∞", "NaN", ",", 2, SymbolPosition.Left, ".", [3], "FC", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ",", ".", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ",", ".", [3]);
						break;
					case "lo":
						c = new NumberFormatInfo("+", "-", "∞", "-∞", "ບໍ່​ແມ່ນ​ໂຕ​ເລກ", ",", 2, SymbolPosition.Left, ".", [3], "₭", SymbolPosition.Left, SymbolNegativePattern.SymbolSignNumber, 0, ",", ".", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ",", ".", [3]);
						break;
					case "lu":
						c = new NumberFormatInfo("+", "-", "∞", "-∞", "NaN", ",", 2, SymbolPosition.Left, ".", [3], "FC", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ",", ".", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ",", ".", [3]);
						break;
					case "lv":
						c = new NumberFormatInfo("+", "-", "∞", "-∞", "NS", ",", 2, SymbolPosition.Left, " ", [3], "€", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ",", " ", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ",", " ", [3]);
						break;
					case "mg":
						c = new NumberFormatInfo("+", "-", "∞", "-∞", "NaN", ".", 2, SymbolPosition.Left, ",", [3], "Ar", SymbolPosition.LeftWithSpace, SymbolNegativePattern.SignSymbolSpaceNumber, 0, ".", ",", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ".", ",", [3]);
						break;
					case "mi":
						c = new NumberFormatInfo("+", "-", "Infinity", "-Infinity", "NaN", ".", 2, SymbolPosition.Left, ",", [3], "$", SymbolPosition.Left, SymbolNegativePattern.SignSymbolNumber, 2, ".", ",", [3], "%", SymbolPosition.Left, SymbolNegativePattern.SignSymbolNumber, 2, ".", ",", [3]);
						break;
					case "mk":
						c = new NumberFormatInfo("+", "-", "∞", "-∞", "NaN", ",", 2, SymbolPosition.Left, ".", [3], "ден", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ",", ".", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ",", ".", [3]);
						break;
					case "ml":
						c = new NumberFormatInfo("+", "-", "∞", "-∞", "NaN", ".", 2, SymbolPosition.Left, ",", [3, 2], "₹", SymbolPosition.Left, SymbolNegativePattern.SignSymbolNumber, 2, ".", ",", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ".", ",", [3, 2]);
						break;
					case "mn":
						c = new NumberFormatInfo("+", "-", "∞", "-∞", "NaN", ".", 2, SymbolPosition.Left, ",", [3], "₮", SymbolPosition.LeftWithSpace, SymbolNegativePattern.SignSymbolSpaceNumber, 0, ".", ",", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ".", ",", [3]);
						break;
					case "mr":
						c = new NumberFormatInfo("+", "-", "∞", "-∞", "NaN", ".", 2, SymbolPosition.Left, ",", [3, 2], "₹", SymbolPosition.Left, SymbolNegativePattern.SymbolSpaceSignNumber, 2, "`", ",", [3, 2], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ".", ",", [3, 2]);
						break;
					case "ms":
						c = new NumberFormatInfo("+", "-", "∞", "-∞", "NaN", ".", 2, SymbolPosition.Left, ",", [3], "RM", SymbolPosition.Left, SymbolNegativePattern.SignSymbolNumber, 2, ".", ",", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ".", ",", [3]);
						break;
					case "my":
						c = new NumberFormatInfo("+", "-", "∞", "-∞", "ဂဏန်းမဟုတ်သော", ".", 2, SymbolPosition.Left, ",", [3], "K", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 0, ".", ",", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ".", ",", [3]);
						break;
					case "nb":
					case "no":
						c = new NumberFormatInfo("+", "-", "∞", "-∞", "NaN", ",", 2, SymbolPosition.Left, " ", [3], "kr", SymbolPosition.LeftWithSpace, SymbolNegativePattern.SignSymbolSpaceNumber, 2, ",", " ", [3], "%", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ",", " ", [3]);
						break;
					case "nd":
					case "sn":
						c = new NumberFormatInfo("+", "-", "∞", "-∞", "NaN", ".", 2, SymbolPosition.Left, ",", [3], "$", SymbolPosition.Left, SymbolNegativePattern.SignSymbolNumber, 2, ".", ",", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ".", ",", [3]);
						break;
					case "ne":
						c = new NumberFormatInfo("+", "-", "∞", "-∞", "NaN", ".", 2, SymbolPosition.Left, ",", [3], "रु", SymbolPosition.LeftWithSpace, SymbolNegativePattern.SignSymbolSpaceNumber, 2, ".", ",", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ".", ",", [3]);
						break;
					case "nl":
						c = new NumberFormatInfo("+", "-", "∞", "-∞", "NaN", ",", 2, SymbolPosition.Left, ".", [3], "€", SymbolPosition.LeftWithSpace, SymbolNegativePattern.SymbolSpaceSignNumber, 2, ",", ".", [3], "%", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ",", ".", [3]);
						break;
					case "nn":
						c = new NumberFormatInfo("+", "-", "∞", "-∞", "NaN", ",", 2, SymbolPosition.Left, " ", [3], "kr", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ",", " ", [3], "%", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ",", " ", [3]);
						break;
					case "oc":
						c = new NumberFormatInfo("+", "-", "+Infinit", "-Infinit", "Micca numericu", ",", 2, SymbolPosition.Left, " ", [3], "€", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ",", " ", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ",", " ", [3]);
						break;
					case "os":
						c = new NumberFormatInfo("+", "-", "∞", "-∞", "НН", ",", 2, SymbolPosition.Left, " ", [3], "₾", SymbolPosition.LeftWithSpace, SymbolNegativePattern.SignSymbolSpaceNumber, 2, ",", " ", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ",", " ", [3]);
						break;
					case "pl":
						c = new NumberFormatInfo("+", "-", "∞", "-∞", "NaN", ",", 2, SymbolPosition.Left, " ", [3], "zł", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ",", " ", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ",", " ", [3]);
						break;
					case "ps":
						c = new NumberFormatInfo("+", "-", "∞", "-∞", "NaN", ",", 2, SymbolPosition.Left, ".", [3], "؋", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 0, ",", ".", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ",", ".", [3]);
						break;
					case "pt":
						c = new NumberFormatInfo("+", "-", "∞", "-∞", "NaN", ",", 2, SymbolPosition.Left, ".", [3], "R$", SymbolPosition.Left, SymbolNegativePattern.SignSymbolNumber, 2, ",", ".", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ",", ".", [3]);
						break;
					case "rm":
						c = new NumberFormatInfo("+", "-", "∞", "-∞", "NaN", ".", 2, SymbolPosition.Left, "’", [3], "CHF", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ".", "’", [3], "%", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ".", "’", [3]);
						break;
					case "rn":
						c = new NumberFormatInfo("+", "-", "∞", "-∞", "NaN", ",", 2, SymbolPosition.Left, ".", [3], "FBu", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 0, ",", ".", [3], "%", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ",", ".", [3]);
						break;
					case "ro":
						c = new NumberFormatInfo("+", "-", "∞", "-∞", "NaN", ",", 2, SymbolPosition.Left, ".", [3], "lei", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ",", ".", [3], "%", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ",", ".", [3]);
						break;
					case "ru":
						c = new NumberFormatInfo("+", "-", "∞", "-∞", "не число", ",", 2, SymbolPosition.Left, " ", [3], "₽", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ",", " ", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ",", " ", [3]);
						break;
					case "rw":
						c = new NumberFormatInfo("+", "-", "∞", "-∞", "NaN", ",", 2, SymbolPosition.Left, ".", [3], "RF", SymbolPosition.LeftWithSpace, SymbolNegativePattern.SignSymbolSpaceNumber, 0, ",", ".", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ",", ".", [3]);
						break;
					case "sa":
						c = new NumberFormatInfo("+", "-", "Infinity", "-Infinity", "NaN", ".", 2, SymbolPosition.Left, ",", [3, 2], "₹", SymbolPosition.LeftWithSpace, SymbolNegativePattern.SymbolSpaceSignNumber, 2, ".", ",", [3, 2], "%", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ".", ",", [3, 2]);
						break;
					case "sd":
						c = new NumberFormatInfo("+", "-", "Infinity", "Infinity-", "NaN", ".", 2, SymbolPosition.Right, ",", [3], "Rs", SymbolPosition.LeftWithSpace, SymbolNegativePattern.SignSymbolSpaceNumber, 2, ".", ",", [3], "%", SymbolPosition.LeftWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ".", ",", [3]);
						break;
					case "se":
						c = new NumberFormatInfo("+", "-", "∞", "-∞", "¤¤¤", ",", 2, SymbolPosition.Left, " ", [3], "kr", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ",", " ", [3], "%", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ",", " ", [3]);
						break;
					case "sg":
						c = new NumberFormatInfo("+", "-", "∞", "-∞", "NaN", ",", 2, SymbolPosition.Left, ".", [3], "FCFA", SymbolPosition.Left, SymbolNegativePattern.SymbolSignNumber, 0, ",", ".", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ",", ".", [3]);
						break;
					case "si":
						c = new NumberFormatInfo("+", "-", "∞", "-∞", "NaN", ".", 2, SymbolPosition.Left, ",", [3], "රු.", SymbolPosition.Left, SymbolNegativePattern.SignSymbolNumber, 2, ".", ",", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ".", ",", [3]);
						break;
					case "so":
						c = new NumberFormatInfo("+", "-", "∞", "-∞", "NaN", ".", 2, SymbolPosition.Left, ",", [3], "S", SymbolPosition.Left, SymbolNegativePattern.SignSymbolNumber, 0, ".", ",", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ".", ",", [3]);
						break;
					case "sq":
						c = new NumberFormatInfo("+", "-", "∞", "-∞", "NaN", ",", 2, SymbolPosition.Left, " ", [3], "Lekë", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 0, ",", " ", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ",", " ", [3]);
						break;
					case "sr":
						c = new NumberFormatInfo("+", "-", "∞", "-∞", "NaN", ",", 2, SymbolPosition.Left, ".", [3], "RSD", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 0, ",", ".", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ",", ".", [3]);
						break;
					case "sv":
						c = new NumberFormatInfo("+", "-", "∞", "-∞", "¤¤¤", ",", 2, SymbolPosition.Left, " ", [3], "kr", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ",", ".", [3], "%", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ",", " ", [3]);
						break;
					case "tg":
						c = new NumberFormatInfo("+", "-", "∞", "-∞", "NaN", ",", 2, SymbolPosition.Left, " ", [3], "смн", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ",", " ", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ",", " ", [3]);
						break;
					case "th":
						c = new NumberFormatInfo("+", "-", "∞", "-∞", "NaN", ".", 2, SymbolPosition.Left, ",", [3], "฿", SymbolPosition.Left, SymbolNegativePattern.SignSymbolNumber, 2, ".", ",", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ".", ",", [3]);
						break;
					case "ti":
						c = new NumberFormatInfo("+", "-", "∞", "-∞", "NaN", ".", 2, SymbolPosition.Left, ",", [3], "Nfk", SymbolPosition.Left, SymbolNegativePattern.SignSymbolNumber, 2, ".", ",", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ".", ",", [3]);
						break;
					case "tk":
						c = new NumberFormatInfo("+", "-", "∞", "-∞", "san däl", ",", 2, SymbolPosition.Left, " ", [3], "m.", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ",", " ", [3], "%", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ",", " ", [3]);
						break;
					case "tn":
					case "xh":
						c = new NumberFormatInfo("+", "-", "∞", "-∞", "NaN", ".", 2, SymbolPosition.Left, " ", [3], "R", SymbolPosition.Left, SymbolNegativePattern.SignSymbolNumber, 2, ".", " ", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ".", " ", [3]);
						break;
					case "to":
						c = new NumberFormatInfo("+", "-", "∞", "-∞", "TF", ".", 2, SymbolPosition.Left, ",", [3], "T$", SymbolPosition.LeftWithSpace, SymbolNegativePattern.SignSymbolSpaceNumber, 2, ".", ",", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ".", ",", [3]);
						break;
					case "tr":
						c = new NumberFormatInfo("+", "-", "∞", "-∞", "NaN", ",", 2, SymbolPosition.Left, ".", [3], "₺", SymbolPosition.Left, SymbolNegativePattern.SignSymbolNumber, 2, ",", ".", [3], "%", SymbolPosition.Left, SymbolNegativePattern.SignSymbolNumber, 2, ",", ".", [3]);
						break;
					case "ts":
						c = new NumberFormatInfo("+", "-", "∞", "-∞", "NaN", ",", 2, SymbolPosition.Left, " ", [3], "R", SymbolPosition.LeftWithSpace, SymbolNegativePattern.SignSymbolSpaceNumber, 2, ",", " ", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ",", " ", [3]);
						break;
					case "uk":
						c = new NumberFormatInfo("+", "-", "∞", "-∞", "NaN", ",", 2, SymbolPosition.Left, " ", [3], "₴", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ",", " ", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ",", " ", [3]);
						break;
					case "ur":
						c = new NumberFormatInfo("+", "-", "∞", "-∞", "NaN", ".", 2, SymbolPosition.Left, ",", [3], "Rs", SymbolPosition.LeftWithSpace, SymbolNegativePattern.SignSymbolSpaceNumber, 2, ".", ",", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ".", ",", [3]);
						break;
					case "uz":
						c = new NumberFormatInfo("+", "-", "∞", "-∞", "haqiqiy son emas", ",", 2, SymbolPosition.Left, " ", [3], "soʻm", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 0, ",", " ", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ",", " ", [3]);
						break;
					case "vi":
						c = new NumberFormatInfo("+", "-", "∞", "-∞", "NaN", ",", 2, SymbolPosition.Left, ".", [3], "₫", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ",", ".", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ",", ".", [3]);
						break;
					case "vo":
					case "yi":
						c = new NumberFormatInfo("+", "-", "∞", "-∞", "NaN", ".", 2, SymbolPosition.Left, ",", [3], "XDR", SymbolPosition.LeftWithSpace, SymbolNegativePattern.SignSymbolSpaceNumber, 2, ".", ",", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ".", ",", [3]);
						break;
					case "wo":
						c = new NumberFormatInfo("+", "-", "+Infini", "-Infini", "Non Numérique", ",", 2, SymbolPosition.Left, " ", [3], "CFA", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ",", " ", [3], "%", SymbolPosition.RightWithSpace, SymbolNegativePattern.SignNumberSpaceSymbol, 2, ",", " ", [3]);
						break;
					case "zu":
						c = new NumberFormatInfo("+", "-", "∞", "-∞", "NaN", ".", 2, SymbolPosition.Left, ",", [3], "R", SymbolPosition.Left, SymbolNegativePattern.SignSymbolNumber, 2, ".", ",", [3], "%", SymbolPosition.Right, SymbolNegativePattern.SignNumberSymbol, 2, ".", ",", [3]);
						break;
				}
				if (c) {
					NumberFormatInfo._cache[k] = c;
					return c;
				}
			}
			return NumberFormatInfo.invariantInfo;
		}
	}
	
	export class DateTimeFormatInfo {

		private static _invariantInfo: DateTimeFormatInfo;
		private static _cache: { [name: string]: DateTimeFormatInfo };
		
		public fullDateTimePattern: string;
		public sortableDateTimePattern: string;
		public universalSortableDateTimePattern: string;
		public rfc1123Pattern: string;
		public yearMonthPattern: string;
		public monthDayPattern: string;
		public longDatePattern: string;
		public shortDatePattern: string;
		public longTimePattern: string;
		public shortTimePattern: string;
		public dateSeparator: string;
		public timeSeparator: string;
		public monthNames: string[];
		public monthGenitiveNames: string[];
		public abbreviatedMonthNames: string[];
		public abbreviatedMonthGenitiveNames: string[];
		public dayNames: string[];
		public abbreviatedDayNames: string[];
		public shortestDayNames: string[];
		public amDesignator: string;
		public pmDesignator: string;
		private constructor(fullDateTimePattern: string, sortableDateTimePattern: string, universalSortableDateTimePattern: string, rfc1123Pattern: string, yearMonthPattern: string, monthDayPattern: string, longDatePattern: string, shortDatePattern: string, longTimePattern: string, shortTimePattern: string, dateSeparator: string, timeSeparator: string, monthNames: string[], monthGenitiveNames: string[], abbreviatedMonthNames: string[], abbreviatedMonthGenitiveNames: string[], dayNames: string[], abbreviatedDayNames: string[], shortestDayNames: string[], amDesignator: string, pmDesignator: string) {
			this.fullDateTimePattern = fullDateTimePattern;
			this.sortableDateTimePattern = sortableDateTimePattern;
			this.universalSortableDateTimePattern = universalSortableDateTimePattern;
			this.rfc1123Pattern = rfc1123Pattern;
			this.yearMonthPattern = yearMonthPattern;
			this.monthDayPattern = monthDayPattern;
			this.longDatePattern = longDatePattern;
			this.shortDatePattern = shortDatePattern;
			this.longTimePattern = longTimePattern;
			this.shortTimePattern = shortTimePattern;
			this.dateSeparator = dateSeparator;
			this.timeSeparator = timeSeparator;
			this.monthNames = monthNames;
			this.monthGenitiveNames = monthGenitiveNames;
			this.abbreviatedMonthNames = abbreviatedMonthNames;
			this.abbreviatedMonthGenitiveNames = abbreviatedMonthGenitiveNames;
			this.dayNames = dayNames;
			this.abbreviatedDayNames = abbreviatedDayNames;
			this.shortestDayNames = shortestDayNames;
			this.amDesignator = amDesignator;
			this.pmDesignator = pmDesignator;
		}

		public static get invariantInfo() : DateTimeFormatInfo {
			return DateTimeFormatInfo._invariantInfo || (DateTimeFormatInfo._invariantInfo = new DateTimeFormatInfo("dddd, dd MMMM yyyy HH:mm:ss","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","yyyy MMMM","MMMM dd","dddd, dd MMMM yyyy","MM/dd/yyyy","HH:mm:ss","HH:mm","/",":",["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December", ""],["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December", ""],["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", ""],["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", ""],["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],"AM","PM"));
		}

		public static getInstance(name: string): DateTimeFormatInfo {
			if (name) {
				var k = name.substring(0, 2).toLowerCase();
				var c : DateTimeFormatInfo;
				if (DateTimeFormatInfo._cache) {
					c = DateTimeFormatInfo._cache[k];
					if (c) {
						return c;
					}
				} else {
					DateTimeFormatInfo._cache = {};
				}
				switch (k) {
					case "aa":
						c = new DateTimeFormatInfo("dddd, MMMM dd, yyyy h:mm:ss tt","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","yyyy MMMM","MMMM d","dddd, MMMM dd, yyyy","dd/MM/yyyy","h:mm:ss tt","h:mm tt","/",":",["Qunxa Garablu", "Kudo", "Ciggilta Kudo", "Agda Baxis", "Caxah Alsa", "Qasa Dirri", "Qado Dirri", "Liiqen", "Waysu", "Diteli", "Ximoli", "Kaxxa Garablu", ""],["Qunxa Garablu", "Kudo", "Ciggilta Kudo", "Agda Baxis", "Caxah Alsa", "Qasa Dirri", "Qado Dirri", "Liiqen", "Waysu", "Diteli", "Ximoli", "Kaxxa Garablu", ""],["Qun", "Nah", "Cig", "Agd", "Cax", "Qas", "Qad", "Leq", "Way", "Dit", "Xim", "Kax", ""],["Qun", "Nah", "Cig", "Agd", "Cax", "Qas", "Qad", "Leq", "Way", "Dit", "Xim", "Kax", ""],["Acaada", "Etleeni", "Talaata", "Arbaqa", "Kamiisi", "Gumqata", "Sabti"],["Aca", "Etl", "Tal", "Arb", "Kam", "Gum", "Sab"],["Aca", "Etl", "Tal", "Arb", "Kam", "Gum", "Sab"],"saaku","carra");
						break;
					case "af":
						c = new DateTimeFormatInfo("dddd, dd MMMM yyyy HH:mm:ss","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","MMMM yyyy","d MMMM","dddd, dd MMMM yyyy","yyyy-MM-dd","HH:mm:ss","HH:mm","-",":",["Januarie", "Februarie", "Maart", "April", "Mei", "Junie", "Julie", "Augustus", "September", "Oktober", "November", "Desember", ""],["Januarie", "Februarie", "Maart", "April", "Mei", "Junie", "Julie", "Augustus", "September", "Oktober", "November", "Desember", ""],["Jan.", "Feb.", "Mrt.", "Apr.", "Mei", "Jun.", "Jul.", "Aug.", "Sep.", "Okt.", "Nov.", "Des.", ""],["Jan.", "Feb.", "Mrt.", "Apr.", "Mei", "Jun.", "Jul.", "Aug.", "Sep.", "Okt.", "Nov.", "Des.", ""],["Sondag", "Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrydag", "Saterdag"],["So.", "Ma.", "Di.", "Wo.", "Do.", "Vr.", "Sa."],["So.", "Ma.", "Di.", "Wo.", "Do.", "Vr.", "Sa."],"vm.","nm.");
						break;
					case "ak":
						c = new DateTimeFormatInfo("dddd, yyyy MMMM dd h:mm:ss tt","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","MMMM yyyy","MMMM d","dddd, yyyy MMMM dd","yyyy/MM/dd","h:mm:ss tt","h:mm tt","/",":",["Sanda-Ɔpɛpɔn", "Kwakwar-Ɔgyefuo", "Ebɔw-Ɔbenem", "Ebɔbira-Oforisuo", "Esusow Aketseaba-Kɔtɔnimba", "Obirade-Ayɛwohomumu", "Ayɛwoho-Kitawonsa", "Difuu-Ɔsandaa", "Fankwa-Ɛbɔ", "Ɔbɛsɛ-Ahinime", "Ɔberɛfɛw-Obubuo", "Mumu-Ɔpɛnimba", ""],["Sanda-Ɔpɛpɔn", "Kwakwar-Ɔgyefuo", "Ebɔw-Ɔbenem", "Ebɔbira-Oforisuo", "Esusow Aketseaba-Kɔtɔnimba", "Obirade-Ayɛwohomumu", "Ayɛwoho-Kitawonsa", "Difuu-Ɔsandaa", "Fankwa-Ɛbɔ", "Ɔbɛsɛ-Ahinime", "Ɔberɛfɛw-Obubuo", "Mumu-Ɔpɛnimba", ""],["S-Ɔ", "K-Ɔ", "E-Ɔ", "E-O", "E-K", "O-A", "A-K", "D-Ɔ", "F-Ɛ", "Ɔ-A", "Ɔ-O", "M-Ɔ", ""],["S-Ɔ", "K-Ɔ", "E-Ɔ", "E-O", "E-K", "O-A", "A-K", "D-Ɔ", "F-Ɛ", "Ɔ-A", "Ɔ-O", "M-Ɔ", ""],["Kwesida", "Dwowda", "Benada", "Wukuda", "Yawda", "Fida", "Memeneda"],["Kwe", "Dwo", "Ben", "Wuk", "Yaw", "Fia", "Mem"],["Kwe", "Dwo", "Ben", "Wuk", "Yaw", "Fia", "Mem"],"AN","EW");
						break;
					case "am":
						c = new DateTimeFormatInfo("dddd ፣d MMMM yyyy h:mm:ss tt","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","MMMM yyyy","MMMM d","dddd ፣d MMMM yyyy","dd/MM/yyyy","h:mm:ss tt","h:mm tt","/",":",["ጃንዩወሪ", "ፌብሩወሪ", "ማርች", "ኤፕሪል", "ሜይ", "ጁን", "ጁላይ", "ኦገስት", "ሴፕቴምበር", "ኦክቶበር", "ኖቬምበር", "ዲሴምበር", ""],["ጃንዩወሪ", "ፌብሩወሪ", "ማርች", "ኤፕሪል", "ሜይ", "ጁን", "ጁላይ", "ኦገስት", "ሴፕቴምበር", "ኦክቶበር", "ኖቬምበር", "ዲሴምበር", ""],["ጃንዩ", "ፌብሩ", "ማርች", "ኤፕሪ", "ሜይ", "ጁን", "ጁላይ", "ኦገስ", "ሴፕቴ", "ኦክቶ", "ኖቬም", "ዲሴም", ""],["ጃንዩ", "ፌብሩ", "ማርች", "ኤፕሪ", "ሜይ", "ጁን", "ጁላይ", "ኦገስ", "ሴፕቴ", "ኦክቶ", "ኖቬም", "ዲሴም", ""],["እሑድ", "ሰኞ", "ማክሰኞ", "ረቡዕ", "ሐሙስ", "ዓርብ", "ቅዳሜ"],["እሑድ", "ሰኞ", "ማክሰ", "ረቡዕ", "ሐሙስ", "ዓርብ", "ቅዳሜ"],["እ", "ሰ", "ማ", "ረ", "ሐ", "ዓ", "ቅ"],"ጥዋት","ከሰዓት");
						break;
					case "ar":
						c = new DateTimeFormatInfo("dd/MMMM/yyyy hh:mm:ss tt","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","MMMM, yyyy","dd MMMM","dd/MMMM/yyyy","dd/MM/yy","hh:mm:ss tt","hh:mm tt","/",":",["محرم", "صفر", "ربيع الأول", "ربيع الثاني", "جمادى الأولى", "جمادى الثانية", "رجب", "شعبان", "رمضان", "شوال", "ذو القعدة", "ذو الحجة", ""],["محرم", "صفر", "ربيع الأول", "ربيع الثاني", "جمادى الأولى", "جمادى الثانية", "رجب", "شعبان", "رمضان", "شوال", "ذو القعدة", "ذو الحجة", ""],["محرم", "صفر", "ربيع الأول", "ربيع الثاني", "جمادى الأولى", "جمادى الثانية", "رجب", "شعبان", "رمضان", "شوال", "ذو القعدة", "ذو الحجة", ""],["محرم", "صفر", "ربيع الأول", "ربيع الثاني", "جمادى الأولى", "جمادى الثانية", "رجب", "شعبان", "رمضان", "شوال", "ذو القعدة", "ذو الحجة", ""],["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"],["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"],["ح", "ن", "ث", "ر", "خ", "ج", "س"],"ص","م");
						break;
					case "as":
						c = new DateTimeFormatInfo("yyyy,MMMM dd, dddd tt h:mm:ss","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","MMMM,yy","d MMMM","yyyy,MMMM dd, dddd","dd-MM-yyyy","tt h:mm:ss","tt h:mm","-",":",["জানুৱাৰী", "ফেব্রুৱাৰী", "মার্চ", "এপ্রিল", "মে", "জুন", "জুলাই", "আগষ্ট", "চেপ্টেম্বৰ", "অক্টোবৰ", "নবেম্বৰ", "ডিচেম্বৰ", ""],["জানুৱাৰী", "ফেব্রুৱাৰী", "মার্চ", "এপ্রিল", "মে", "জুন", "জুলাই", "আগষ্ট", "চেপ্টেম্বৰ", "অক্টোবৰ", "নবেম্বৰ", "ডিচেম্বৰ", ""],["জানু", "ফেব্রু", "মার্চ", "এপ্রিল", "মে", "জুন", "জুলাই", "আগষ্ট", "চেপ্টে", "অক্টো", "নবে", "ডিচে", ""],["জানু", "ফেব্রু", "মার্চ", "এপ্রিল", "মে", "জুন", "জুলাই", "আগষ্ট", "চেপ্টে", "অক্টো", "নবে", "ডিচে", ""],["ৰবিবাৰ", "সোমবাৰ", "মঙ্গলবাৰ", "বুধবাৰ", "বৃহস্পতিবাৰ", "শুক্রবাৰ", "শনিবাৰ"],["ৰবি.", "সোম.", "মঙ্গল.", "বুধ.", "বৃহ.", "শুক্র.", "শনি."],["ৰ", "সো", "ম", "বু", "বৃ", "শু", "শ"],"ৰাতিপু","আবেলি");
						break;
					case "az":
						c = new DateTimeFormatInfo("d MMMM yyyy, dddd HH:mm:ss","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","yyyy MMMM","MMMM d","d MMMM yyyy, dddd","dd.MM.yyyy","HH:mm:ss","HH:mm",".",":",["Yanvar", "Fevral", "Mart", "Aprel", "May", "İyun", "İyul", "Avqust", "Sentyabr", "Oktyabr", "Noyabr", "Dekabr", ""],["yanvar", "fevral", "mart", "aprel", "may", "iyun", "iyul", "avqust", "sentyabr", "oktyabr", "noyabr", "dekabr", ""],["yan", "fev", "mar", "apr", "may", "iyn", "iyl", "avq", "sen", "okt", "noy", "dek", ""],["yan", "fev", "mar", "apr", "may", "iyn", "iyl", "avq", "sen", "okt", "noy", "dek", ""],["bazar", "bazar ertəsi", "çərşənbə axşamı", "çərşənbə", "cümə axşamı", "cümə", "şənbə"],["B.", "B.E.", "Ç.A.", "Ç.", "C.A.", "C.", "Ş."],["B.", "B.E.", "Ç.A.", "Ç.", "C.A.", "C.", "Ş."],"AM","PM");
						break;
					case "ba":
						c = new DateTimeFormatInfo("d MMMM yyyy 'й' H:mm:ss","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","MMMM yyyy","d MMMM","d MMMM yyyy 'й'","dd.MM.yy","H:mm:ss","H:mm",".",":",["ғинуар", "февраль", "март", "апрель", "май", "июнь", "июль", "август", "сентябрь", "октябрь", "ноябрь", "декабрь", ""],["ғинуар", "февраль", "март", "апрель", "май", "июнь", "июль", "август", "сентябрь", "октябрь", "ноябрь", "декабрь", ""],["ғин", "фев", "мар", "апр", "май", "июн", "июл", "авг", "сен", "окт", "ноя", "дек", ""],["ғин", "фев", "мар", "апр", "май", "июн", "июл", "авг", "сен", "окт", "ноя", "дек", ""],["Йәкшәмбе", "Дүшәмбе", "Шишәмбе", "Шаршамбы", "Кесаҙна", "Йома", "Шәмбе"],["Йш", "Дш", "Шш", "Шр", "Кс", "Йм", "Шб"],["Йш", "Дш", "Шш", "Шр", "Кс", "Йм", "Шб"],"","");
						break;
					case "be":
						c = new DateTimeFormatInfo("d MMMM yyyy HH:mm:ss","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","MMMM yyyy г.","d MMMM","d MMMM yyyy","dd.MM.yy","HH:mm:ss","HH:mm",".",":",["студзень", "люты", "сакавік", "красавік", "май", "чэрвень", "ліпень", "жнівень", "верасень", "кастрычнік", "лістапад", "снежань", ""],["студзеня", "лютага", "сакавіка", "красавіка", "мая", "чэрвеня", "ліпеня", "жніўня", "верасня", "кастрычніка", "лістапада", "снежня", ""],["студз", "лют", "сак", "крас", "май", "чэрв", "ліп", "жн", "вер", "кастр", "ліст", "снеж", ""],["студз", "лют", "сак", "крас", "май", "чэрв", "ліп", "жн", "вер", "кастр", "ліст", "снеж", ""],["нядзеля", "панядзелак", "аўторак", "серада", "чацвер", "пятніца", "субота"],["нд", "пн", "аўт", "ср", "чц", "пт", "сб"],["нд", "пн", "аў", "ср", "чц", "пт", "сб"],"","");
						break;
					case "bg":
						c = new DateTimeFormatInfo("dd MMMM yyyy 'г.' H:mm:ss","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","MMMM yyyy 'г.'","d MMMM","dd MMMM yyyy 'г.'","d.M.yyyy 'г.'","H:mm:ss","H:mm",".",":",["януари", "февруари", "март", "април", "май", "юни", "юли", "август", "септември", "октомври", "ноември", "декември", ""],["януари", "февруари", "март", "април", "май", "юни", "юли", "август", "септември", "октомври", "ноември", "декември", ""],["яну", "фев", "мар", "апр", "май", "юни", "юли", "авг", "сеп", "окт", "ное", "дек", ""],["яну", "фев", "мар", "апр", "май", "юни", "юли", "авг", "сеп", "окт", "ное", "дек", ""],["неделя", "понеделник", "вторник", "сряда", "четвъртък", "петък", "събота"],["нед", "пон", "вт", "ср", "четв", "пет", "съб"],["нд", "пн", "вт", "ср", "чт", "пт", "сб"],"","");
						break;
					case "bm":
						c = new DateTimeFormatInfo("dddd d MMMM yyyy HH:mm:ss","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","MMMM yyyy","d MMMM","dddd d MMMM yyyy","d/M/yyyy","HH:mm:ss","HH:mm","/",":",["zanwuye", "feburuye", "marisi", "awirili", "mɛ", "zuwɛn", "zuluye", "uti", "sɛtanburu", "ɔkutɔburu", "nowanburu", "desanburu", ""],["zanwuye", "feburuye", "marisi", "awirili", "mɛ", "zuwɛn", "zuluye", "uti", "sɛtanburu", "ɔkutɔburu", "nowanburu", "desanburu", ""],["zan", "feb", "mar", "awi", "mɛ", "zuw", "zul", "uti", "sɛt", "ɔku", "now", "des", ""],["zan", "feb", "mar", "awi", "mɛ", "zuw", "zul", "uti", "sɛt", "ɔku", "now", "des", ""],["kari", "ntɛnɛ", "tarata", "araba", "alamisa", "juma", "sibiri"],["kar", "ntɛ", "tar", "ara", "ala", "jum", "sib"],["kar", "ntɛ", "tar", "ara", "ala", "jum", "sib"],"AM","PM");
						break;
					case "bn":
						c = new DateTimeFormatInfo("dd MMMM yyyy HH.mm.ss","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","MMMM, yyyy","dd MMMM","dd MMMM yyyy","dd-MM-yy","HH.mm.ss","HH.mm","-",".",["জানুয়ারী", "ফেব্রুয়ারী", "মার্চ", "এপ্রিল", "মে", "জুন", "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর", ""],["জানুয়ারী", "ফেব্রুয়ারী", "মার্চ", "এপ্রিল", "মে", "জুন", "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর", ""],["জানু.", "ফেব্রু.", "মার্চ", "এপ্রিল", "মে", "জুন", "জুলাই", "আগ.", "সেপ্টে.", "অক্টো.", "নভে.", "ডিসে.", ""],["জানু.", "ফেব্রু.", "মার্চ", "এপ্রিল", "মে", "জুন", "জুলাই", "আগ.", "সেপ্টে.", "অক্টো.", "নভে.", "ডিসে.", ""],["রবিবার", "সোমবার", "মঙ্গলবার", "বুধবার", "বৃহস্পতিবার", "শুক্রবার", "শনিবার"],["রবি.", "সোম.", "মঙ্গল.", "বুধ.", "বৃহ.", "শুক্র.", "শনি."],["র", "সো", "ম", "বু", "বৃ", "শু", "শ"],"পুর্বাহ্ন","অপরাহ্ন");
						break;
					case "bo":
						c = new DateTimeFormatInfo("yyyy'ལོའི་ཟླ' M'ཚེས' d HH:mm:ss","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","yyyy'ལོའི་ཟླ་' M","ཟླ་Mཚེས་d","yyyy'ལོའི་ཟླ' M'ཚེས' d","yyyy/M/d","HH:mm:ss","HH:mm","/",":",["སྤྱི་ཟླ་དང་པོ།", "སྤྱི་ཟླ་གཉིས་པ།", "སྤྱི་ཟླ་གསུམ་པ།", "སྤྱི་ཟླ་བཞི་པ།", "སྤྱི་ཟླ་ལྔ་པ།", "སྤྱི་ཟླ་དྲུག་པ།", "སྤྱི་ཟླ་བདུན་པ།", "སྤྱི་ཟླ་བརྒྱད་པ།", "སྤྱི་ཟླ་དགུ་པ།", "སྤྱི་ཟླ་བཅུ་པ།", "སྤྱི་ཟླ་བཅུ་གཅིག་པ།", "སྤྱི་ཟླ་བཅུ་གཉིས་པ།", ""],["སྤྱི་ཟླ་དང་པོའི་", "སྤྱི་ཟླ་གཉིས་པའི་", "སྤྱི་ཟླ་གསུམ་པའི་", "སྤྱི་ཟླ་བཞི་པའི་", "སྤྱི་ཟླ་ལྔ་པའི་", "སྤྱི་ཟླ་དྲུག་པའི་", "སྤྱི་ཟླ་བདུན་པའི་", "སྤྱི་ཟླ་བརྒྱད་པའི་", "སྤྱི་ཟླ་དགུ་པའི་", "སྤྱི་ཟླ་བཅུ་པའི་", "སྤྱི་ཟླ་བཅུ་གཅིག་པའི་", "སྤྱི་ཟླ་བཅུ་གཉིས་པའི་", ""],["ཟླ་ ༡", "ཟླ་ ༢", "ཟླ་ ༣", "ཟླ་ ༤", "ཟླ་ ༥", "ཟླ་ ༦", "ཟླ་ ༧", "ཟླ་ ༨", "ཟླ་ ༩", "ཟླ་ ༡༠", "ཟླ་ ༡༡", "ཟླ་ ༡༢", ""],["ཟླ་ ༡", "ཟླ་ ༢", "ཟླ་ ༣", "ཟླ་ ༤", "ཟླ་ ༥", "ཟླ་ ༦", "ཟླ་ ༧", "ཟླ་ ༨", "ཟླ་ ༩", "ཟླ་ ༡༠", "ཟླ་ ༡༡", "ཟླ་ ༡༢", ""],["གཟའ་ཉི་མ།", "གཟའ་ཟླ་བ།", "གཟའ་མིག་དམར།", "གཟའ་ལྷག་པ།", "གཟའ་ཕུར་བུ།", "གཟའ་པ་སངས།", "གཟའ་སྤེན་པ།"],["ཉི་མ།", "ཟླ་བ།", "མིག་དམར།", "ལྷག་པ།", "ཕུར་བུ།", "པ་སངས།", "སྤེན་པ།"],["ཉི།", "ཟླ།", "དམར།", "ལྷག", "ཕུར།", "སངས།", "སྤེན།"],"སྔ་དྲོ","ཕྱི་དྲོ");
						break;
					case "br":
						c = new DateTimeFormatInfo("yyyy MMMM d, dddd HH:mm:ss","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","yyyy MMMM","MMMM d","yyyy MMMM d, dddd","yyyy-MM-dd","HH:mm:ss","HH:mm","-",":",["Genver", "Cʼhwevrer", "Meurzh", "Ebrel", "Mae", "Mezheven", "Gouere", "Eost", "Gwengolo", "Here", "Du", "Kerzu", ""],["Genver", "Cʼhwevrer", "Meurzh", "Ebrel", "Mae", "Mezheven", "Gouere", "Eost", "Gwengolo", "Here", "Du", "Kerzu", ""],["Gen.", "Cʼhwe.", "Meur.", "Ebr.", "Mae", "Mezh.", "Goue.", "Eost", "Gwen.", "Here", "Du", "Ker.", ""],["Gen.", "Cʼhwe.", "Meur.", "Ebr.", "Mae", "Mezh.", "Goue.", "Eost", "Gwen.", "Here", "Du", "Kzu.", ""],["Sul", "Lun", "Meurzh", "Mercʼher", "Yaou", "Gwener", "Sadorn"],["Sul", "Lun", "Meu.", "Mer.", "Yaou", "Gwe.", "Sad."],["Sul", "Lun", "Meu.", "Mer.", "Yaou", "Gwe.", "Sad."],"A.M.","G.M.");
						break;
					case "bs":
						c = new DateTimeFormatInfo("dddd, d. MMMM yyyy. HH:mm:ss","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","MMMM yyyy.","d. MMMM","dddd, d. MMMM yyyy.","d.M.yyyy.","HH:mm:ss","HH:mm",".",":",["januar", "februar", "mart", "april", "maj", "juni", "juli", "avgust", "septembar", "oktobar", "novembar", "decembar", ""],["januar", "februar", "mart", "april", "maj", "juni", "juli", "avgust", "septembar", "oktobar", "novembar", "decembar", ""],["jan", "feb", "mar", "apr", "maj", "jun", "jul", "avg", "sep", "okt", "nov", "dec", ""],["jan", "feb", "mar", "apr", "maj", "jun", "jul", "avg", "sep", "okt", "nov", "dec", ""],["nedjelja", "ponedjeljak", "utorak", "srijeda", "četvrtak", "petak", "subota"],["ned", "pon", "uto", "sri", "čet", "pet", "sub"],["ned", "pon", "uto", "sri", "čet", "pet", "sub"],"prijepodne","popodne");
						break;
					case "ca":
						c = new DateTimeFormatInfo("dddd, d MMMM 'de' yyyy H:mm:ss","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","MMMM 'de' yyyy","d MMMM","dddd, d MMMM 'de' yyyy","d/M/yyyy","H:mm:ss","H:mm","/",":",["gener", "febrer", "març", "abril", "maig", "juny", "juliol", "agost", "setembre", "octubre", "novembre", "desembre", ""],["de gener", "de febrer", "de març", "d’abril", "de maig", "de juny", "de juliol", "d’agost", "de setembre", "d’octubre", "de novembre", "de desembre", ""],["gen.", "febr.", "març", "abr.", "maig", "juny", "jul.", "ag.", "set.", "oct.", "nov.", "des.", ""],["de gen.", "de febr.", "de març", "d’abr.", "de maig", "de juny", "de jul.", "d’ag.", "de set.", "d’oct.", "de nov.", "de des.", ""],["diumenge", "dilluns", "dimarts", "dimecres", "dijous", "divendres", "dissabte"],["dg.", "dl.", "dt.", "dc.", "dj.", "dv.", "ds."],["dg.", "dl.", "dt.", "dc.", "dj.", "dv.", "ds."],"a. m.","p. m.");
						break;
					case "ce":
						c = new DateTimeFormatInfo("yyyy MMMM d, dddd HH:mm:ss","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","yyyy MMMM","MMMM d","yyyy MMMM d, dddd","yyyy-MM-dd","HH:mm:ss","HH:mm","-",":",["январь", "февраль", "март", "апрель", "май", "июнь", "июль", "август", "сентябрь", "октябрь", "ноябрь", "декабрь", ""],["январь", "февраль", "март", "апрель", "май", "июнь", "июль", "август", "сентябрь", "октябрь", "ноябрь", "декабрь", ""],["янв", "фев", "мар", "апр", "май", "июн", "июл", "авг", "сен", "окт", "ноя", "дек", ""],["янв", "фев", "мар", "апр", "май", "июн", "июл", "авг", "сен", "окт", "ноя", "дек", ""],["кӀиранан де", "оршотан де", "шинарин де", "кхаарин де", "еарин де", "пӀераскан де", "шот де"],["кӀиранан де", "оршотан де", "шинарин де", "кхаарин де", "еарин де", "пӀераскан де", "шот де"],["кӀиранан де", "оршотан де", "шинарин де", "кхаарин де", "еарин де", "пӀераскан де", "шот де"],"AM","PM");
						break;
					case "co":
						c = new DateTimeFormatInfo("dddd d MMMM yyyy H:mm:ss","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","MMMM' di u 'yyyy","d' di 'MMMM","dddd d MMMM yyyy","dd/MM/yyyy","H:mm:ss","HH:mm","/",":",["ghjennaghju", "ferraghju", "marzu", "aprile", "maghju", "ghjunghju", "lugliu", "aostu", "settembre", "ottobre", "nuvembre", "dicembre", ""],["ghjennaghju", "ferraghju", "marzu", "aprile", "maghju", "ghjunghju", "lugliu", "aostu", "settembre", "ottobre", "nuvembre", "dicembre", ""],["ghje", "ferr", "marz", "apri", "magh", "ghju", "lugl", "aost", "sett", "otto", "nuve", "dice", ""],["ghje", "ferr", "marz", "apri", "magh", "ghju", "lugl", "aost", "sett", "otto", "nuve", "dice", ""],["dumenica", "luni", "marti", "mercuri", "ghjovi", "venneri", "sabbatu"],["dum.", "lun.", "mar.", "mer.", "ghj.", "ven.", "sab."],["du", "lu", "ma", "me", "gh", "ve", "sa"],"","");
						break;
					case "cs":
						c = new DateTimeFormatInfo("dddd d. MMMM yyyy H:mm:ss","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","MMMM yyyy","d. MMMM","dddd d. MMMM yyyy","dd.MM.yyyy","H:mm:ss","H:mm",".",":",["leden", "únor", "březen", "duben", "květen", "červen", "červenec", "srpen", "září", "říjen", "listopad", "prosinec", ""],["ledna", "února", "března", "dubna", "května", "června", "července", "srpna", "září", "října", "listopadu", "prosince", ""],["led", "úno", "bře", "dub", "kvě", "čvn", "čvc", "srp", "zář", "říj", "lis", "pro", ""],["led", "úno", "bře", "dub", "kvě", "čvn", "čvc", "srp", "zář", "říj", "lis", "pro", ""],["neděle", "pondělí", "úterý", "středa", "čtvrtek", "pátek", "sobota"],["ne", "po", "út", "st", "čt", "pá", "so"],["ne", "po", "út", "st", "čt", "pá", "so"],"dop.","odp.");
						break;
					case "cu":
						c = new DateTimeFormatInfo("dddd, d MMMM 'л'. yyyy. HH:mm:ss","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","yyyy MMMM","MMMM d","dddd, d MMMM 'л'. yyyy.","yyyy.MM.dd","HH:mm:ss","HH:mm",".",":",["і҆аннꙋа́рїй", "феврꙋа́рїй", "ма́ртъ", "а҆прі́ллїй", "ма́їй", "і҆ꙋ́нїй", "і҆ꙋ́лїй", "а҆́ѵгꙋстъ", "септе́мврїй", "ѻ҆ктѡ́врїй", "ное́мврїй", "деке́мврїй", ""],["і҆аннꙋа́рїа", "феврꙋа́рїа", "ма́рта", "а҆прі́ллїа", "ма́їа", "і҆ꙋ́нїа", "і҆ꙋ́лїа", "а҆́ѵгꙋста", "септе́мврїа", "ѻ҆ктѡ́врїа", "ное́мврїа", "деке́мврїа", ""],["і҆аⷩ҇", "феⷡ҇", "маⷬ҇", "а҆пⷬ҇", "маꙵ", "і҆ꙋⷩ҇", "і҆ꙋⷧ҇", "а҆́ѵⷢ҇", "сеⷫ҇", "ѻ҆кⷮ", "ноеⷨ", "деⷦ҇", ""],["і҆аⷩ҇", "феⷡ҇", "маⷬ҇", "а҆пⷬ҇", "маꙵ", "і҆ꙋⷩ҇", "і҆ꙋⷧ҇", "а҆́ѵⷢ҇", "сеⷫ҇", "ѻ҆кⷮ", "ноеⷨ", "деⷦ҇", ""],["недѣ́лѧ", "понедѣ́льникъ", "вто́рникъ", "среда̀", "четверто́къ", "пѧто́къ", "сꙋббѡ́та"],["ндⷧ҇ѧ", "пнⷣе", "втоⷬ҇", "срⷣе", "чеⷦ҇", "пѧⷦ҇", "сꙋⷠ҇"],["ндⷧ҇ѧ", "пнⷣе", "втоⷬ҇", "срⷣе", "чеⷦ҇", "пѧⷦ҇", "сꙋⷠ҇"],"ДП","ПП");
						break;
					case "cy":
						c = new DateTimeFormatInfo("dddd, d MMMM yyyy HH:mm:ss","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","MMMM yyyy","MMMM d","dddd, d MMMM yyyy","dd/MM/yyyy","HH:mm:ss","HH:mm","/",":",["Ionawr", "Chwefror", "Mawrth", "Ebrill", "Mai", "Mehefin", "Gorffennaf", "Awst", "Medi", "Hydref", "Tachwedd", "Rhagfyr", ""],["Ionawr", "Chwefror", "Mawrth", "Ebrill", "Mai", "Mehefin", "Gorffennaf", "Awst", "Medi", "Hydref", "Tachwedd", "Rhagfyr", ""],["Ion", "Chw", "Maw", "Ebr", "Mai", "Meh", "Gor", "Awst", "Medi", "Hyd", "Tach", "Rhag", ""],["Ion", "Chwef", "Maw", "Ebrill", "Mai", "Meh", "Gorff", "Awst", "Medi", "Hyd", "Tach", "Rhag", ""],["Dydd Sul", "Dydd Llun", "Dydd Mawrth", "Dydd Mercher", "Dydd Iau", "Dydd Gwener", "Dydd Sadwrn"],["Sul", "Llun", "Maw", "Mer", "Iau", "Gwen", "Sad"],["Su", "Ll", "Ma", "Me", "Ia", "Gw", "Sa"],"yb","yh");
						break;
					case "da":
						c = new DateTimeFormatInfo("d. MMMM yyyy HH:mm:ss","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","MMMM yyyy","d. MMMM","d. MMMM yyyy","dd-MM-yyyy","HH:mm:ss","HH:mm","-",":",["januar", "februar", "marts", "april", "maj", "juni", "juli", "august", "september", "oktober", "november", "december", ""],["januar", "februar", "marts", "april", "maj", "juni", "juli", "august", "september", "oktober", "november", "december", ""],["jan", "feb", "mar", "apr", "maj", "jun", "jul", "aug", "sep", "okt", "nov", "dec", ""],["jan", "feb", "mar", "apr", "maj", "jun", "jul", "aug", "sep", "okt", "nov", "dec", ""],["søndag", "mandag", "tirsdag", "onsdag", "torsdag", "fredag", "lørdag"],["sø", "ma", "ti", "on", "to", "fr", "lø"],["sø", "ma", "ti", "on", "to", "fr", "lø"],"","");
						break;
					case "de":
						c = new DateTimeFormatInfo("dddd, d. MMMM yyyy HH:mm:ss","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","MMMM yyyy","d. MMMM","dddd, d. MMMM yyyy","dd.MM.yyyy","HH:mm:ss","HH:mm",".",":",["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember", ""],["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember", ""],["Jan", "Feb", "Mrz", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez", ""],["Jan", "Feb", "Mrz", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez", ""],["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"],["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],"","");
						break;
					case "dv":
						c = new DateTimeFormatInfo("ddd, yyyy MMMM dd HH:mm:ss","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","yyyy, MMMM","MMMM dd","ddd, yyyy MMMM dd","dd/MM/yy","HH:mm:ss","HH:mm","/",":",["ޖަނަވަރީ", "ފެބްރުއަރީ", "މާރޗް", "އޭޕްރިލް", "މެއި", "ޖޫން", "ޖުލައި", "އޮގަސްޓް", "ސެޕްޓެމްބަރ", "އޮކްޓޯބަރ", "ނޮވެމްބަރ", "ޑިސެމްބަރ", ""],["ޖަނަވަރީ", "ފެބްރުއަރީ", "މާރޗް", "އޭޕްރިލް", "މެއި", "ޖޫން", "ޖުލައި", "އޮގަސްޓް", "ސެޕްޓެމްބަރ", "އޮކްޓޯބަރ", "ނޮވެމްބަރ", "ޑިސެމްބަރ", ""],["ޖަނަވަރީ", "ފެބްރުއަރީ", "މާރޗް", "އޭޕްރިލް", "މެއި", "ޖޫން", "ޖުލައި", "އޮގަސްޓް", "ސެޕްޓެމްބަރ", "އޮކްޓޯބަރ", "ނޮވެމްބަރ", "ޑިސެމްބަރ", ""],["ޖަނަވަރީ", "ފެބްރުއަރީ", "މާރޗް", "އޭޕްރިލް", "މެއި", "ޖޫން", "ޖުލައި", "އޮގަސްޓް", "ސެޕްޓެމްބަރ", "އޮކްޓޯބަރ", "ނޮވެމްބަރ", "ޑިސެމްބަރ", ""],["އާދީއްތަ", "ހޯމަ", "އަންގާރަ", "ބުދަ", "ބުރާސްފަތި", "ހުކުރު", "ހޮނިހިރު"],["އާދީއްތަ", "ހޯމަ", "އަންގާރަ", "ބުދަ", "ބުރާސްފަތި", "ހުކުރު", "ހޮނިހިރު"],["އާ", "ހޯ", "އަ", "ބު", "ބު", "ހު", "ހޮ"],"މކ","މފ");
						break;
					case "dz":
						c = new DateTimeFormatInfo("dddd, སྤྱི་ལོ་yyyy MMMM ཚེས་dd ཆུ་ཚོད་h:mm:ss tt","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","yyyy MMMM","MMMM d","dddd, སྤྱི་ལོ་yyyy MMMM ཚེས་dd","yyyy-MM-dd","ཆུ་ཚོད་h:mm:ss tt","ཆུ་ཚོད་ h སྐར་མ་ mm tt","-",":",["སྤྱི་ཟླ་དངཔ་", "སྤྱི་ཟླ་གཉིས་པ་", "སྤྱི་ཟླ་གསུམ་པ་", "སྤྱི་ཟླ་བཞི་པ", "སྤྱི་ཟླ་ལྔ་པ་", "སྤྱི་ཟླ་དྲུག་པ", "སྤྱི་ཟླ་བདུན་པ་", "སྤྱི་ཟླ་བརྒྱད་པ་", "སྤྱི་ཟླ་དགུ་པ་", "སྤྱི་ཟླ་བཅུ་པ་", "སྤྱི་ཟླ་བཅུ་གཅིག་པ་", "སྤྱི་ཟླ་བཅུ་གཉིས་པ་", ""],["ཟླ་དངཔ་", "ཟླ་གཉིས་པ་", "ཟླ་གསུམ་པ་", "ཟླ་བཞི་པ་", "ཟླ་ལྔ་པ་", "ཟླ་དྲུག་པ", "ཟླ་བདུན་པ་", "ཟླ་བརྒྱད་པ་", "ཟླ་དགུ་པ་", "ཟླ་བཅུ་པ་", "ཟླ་བཅུ་གཅིག་པ་", "ཟླ་བཅུ་གཉིས་པ་", ""],["ཟླ་༡", "ཟླ་༢", "ཟླ་༣", "ཟླ་༤", "ཟླ་༥", "ཟླ་༦", "ཟླ་༧", "ཟླ་༨", "ཟླ་༩", "ཟླ་༡༠", "ཟླ་༡༡", "ཟླ་༡༢", ""],["༡", "༢", "༣", "༤", "༥", "༦", "༧", "༨", "༩", "༡༠", "༡༡", "12", ""],["གཟའ་ཟླ་བ་", "གཟའ་མིག་དམར་", "གཟའ་ལྷག་པ་", "གཟའ་ཕུར་བུ་", "གཟའ་པ་སངས་", "གཟའ་སྤེན་པ་", "གཟའ་ཉི་མ་"],["ཟླ་", "མིར་", "ལྷག་", "ཕུར་", "སངས་", "སྤེན་", "ཉི་"],["ཟླ་", "མིར་", "ལྷག་", "ཕུར་", "སངས་", "སྤེན་", "ཉི་"],"སྔ་ཆ་","ཕྱི་ཆ་");
						break;
					case "ee":
						c = new DateTimeFormatInfo("dddd, MMMM d 'lia' yyyy tt 'ga' h:mm:ss","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","MMMM yyyy","MMMM d 'lia'","dddd, MMMM d 'lia' yyyy","M/d/yyyy","tt 'ga' h:mm:ss","tt 'ga' h:mm","/",":",["dzove", "dzodze", "tedoxe", "afɔfĩe", "dama", "masa", "siamlɔm", "deasiamime", "anyɔnyɔ", "kele", "adeɛmekpɔxe", "dzome", ""],["dzove", "dzodze", "tedoxe", "afɔfĩe", "dama", "masa", "siamlɔm", "deasiamime", "anyɔnyɔ", "kele", "adeɛmekpɔxe", "dzome", ""],["dzv", "dzd", "ted", "afɔ", "dam", "mas", "sia", "dea", "any", "kel", "ade", "dzm", ""],["dzv", "dzd", "ted", "afɔ", "dam", "mas", "sia", "dea", "any", "kel", "ade", "dzm", ""],["kɔsiɖa", "dzoɖa", "blaɖa", "kuɖa", "yawoɖa", "fiɖa", "memleɖa"],["kɔs", "dzo", "bla", "kuɖ", "yaw", "fiɖ", "mem"],["kɔs", "dzo", "bla", "kuɖ", "yaw", "fiɖ", "mem"],"ŋdi","ɣetrɔ");
						break;
					case "el":
						c = new DateTimeFormatInfo("dddd, d MMMM yyyy h:mm:ss tt","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","MMMM yyyy","d MMMM","dddd, d MMMM yyyy","d/M/yyyy","h:mm:ss tt","h:mm tt","/",":",["Ιανουάριος", "Φεβρουάριος", "Μάρτιος", "Απρίλιος", "Μάιος", "Ιούνιος", "Ιούλιος", "Αύγουστος", "Σεπτέμβριος", "Οκτώβριος", "Νοέμβριος", "Δεκέμβριος", ""],["Ιανουαρίου", "Φεβρουαρίου", "Μαρτίου", "Απριλίου", "Μαΐου", "Ιουνίου", "Ιουλίου", "Αυγούστου", "Σεπτεμβρίου", "Οκτωβρίου", "Νοεμβρίου", "Δεκεμβρίου", ""],["Ιαν", "Φεβ", "Μαρ", "Απρ", "Μαϊ", "Ιουν", "Ιουλ", "Αυγ", "Σεπ", "Οκτ", "Νοε", "Δεκ", ""],["Ιαν", "Φεβ", "Μαρ", "Απρ", "Μαϊ", "Ιουν", "Ιουλ", "Αυγ", "Σεπ", "Οκτ", "Νοε", "Δεκ", ""],["Κυριακή", "Δευτέρα", "Τρίτη", "Τετάρτη", "Πέμπτη", "Παρασκευή", "Σάββατο"],["Κυρ", "Δευ", "Τρι", "Τετ", "Πεμ", "Παρ", "Σαβ"],["Κυ", "Δε", "Τρ", "Τε", "Πε", "Πα", "Σα"],"πμ","μμ");
						break;
					case "en":
						c = new DateTimeFormatInfo("dddd, MMMM d, yyyy h:mm:ss tt","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","MMMM yyyy","MMMM d","dddd, MMMM d, yyyy","M/d/yyyy","h:mm:ss tt","h:mm tt","/",":",["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December", ""],["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December", ""],["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", ""],["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", ""],["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],"AM","PM");
						break;
					case "eo":
						c = new DateTimeFormatInfo("dddd, d-'a' 'de' MMMM yyyy HH:mm:ss","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","yyyy MMMM","MMMM d","dddd, d-'a' 'de' MMMM yyyy","yyyy-MM-dd","HH:mm:ss","HH:mm","-",":",["januaro", "februaro", "marto", "aprilo", "majo", "junio", "julio", "aŭgusto", "septembro", "oktobro", "novembro", "decembro", ""],["januaro", "februaro", "marto", "aprilo", "majo", "junio", "julio", "aŭgusto", "septembro", "oktobro", "novembro", "decembro", ""],["jan", "feb", "mar", "apr", "maj", "jun", "jul", "aŭg", "sep", "okt", "nov", "dec", ""],["jan", "feb", "mar", "apr", "maj", "jun", "jul", "aŭg", "sep", "okt", "nov", "dec", ""],["dimanĉo", "lundo", "mardo", "merkredo", "ĵaŭdo", "vendredo", "sabato"],["di", "lu", "ma", "me", "ĵa", "ve", "sa"],["di", "lu", "ma", "me", "ĵa", "ve", "sa"],"atm","ptm");
						break;
					case "es":
						c = new DateTimeFormatInfo("dddd, d' de 'MMMM' de 'yyyy H:mm:ss","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","MMMM' de 'yyyy","d 'de' MMMM","dddd, d' de 'MMMM' de 'yyyy","dd/MM/yyyy","H:mm:ss","H:mm","/",":",["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre", ""],["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre", ""],["ene.", "feb.", "mar.", "abr.", "may.", "jun.", "jul.", "ago.", "sep.", "oct.", "nov.", "dic.", ""],["ene.", "feb.", "mar.", "abr.", "may.", "jun.", "jul.", "ago.", "sep.", "oct.", "nov.", "dic.", ""],["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],["do.", "lu.", "ma.", "mi.", "ju.", "vi.", "sá."],["D", "L", "M", "X", "J", "V", "S"],"","");
						break;
					case "et":
						c = new DateTimeFormatInfo("dddd, d. MMMM yyyy HH:mm:ss","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","MMMM yyyy","d. MMMM","dddd, d. MMMM yyyy","dd.MM.yyyy","HH:mm:ss","HH:mm",".",":",["jaanuar", "veebruar", "märts", "aprill", "mai", "juuni", "juuli", "august", "september", "oktoober", "november", "detsember", ""],["jaanuar", "veebruar", "märts", "aprill", "mai", "juuni", "juuli", "august", "september", "oktoober", "november", "detsember", ""],["jaan", "veebr", "märts", "apr", "mai", "juuni", "juuli", "aug", "sept", "okt", "nov", "dets", ""],["jaan", "veebr", "märts", "apr", "mai", "juuni", "juuli", "aug", "sept", "okt", "nov", "dets", ""],["pühapäev", "esmaspäev", "teisipäev", "kolmapäev", "neljapäev", "reede", "laupäev"],["P", "E", "T", "K", "N", "R", "L"],["P", "E", "T", "K", "N", "R", "L"],"AM","PM");
						break;
					case "eu":
						c = new DateTimeFormatInfo("yyyy('e')'ko' MMMM d, dddd HH:mm:ss","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","yyyy('e')'ko' MMMM","MMMM d","yyyy('e')'ko' MMMM d, dddd","yyyy/M/d","HH:mm:ss","HH:mm","/",":",["urtarrila", "Otsaila", "Martxoa", "Apirila", "Maiatza", "Ekaina", "Uztaila", "Abuztua", "Iraila", "Urria", "Azaroa", "Abendua", ""],["urtarrila", "otsaila", "martxoa", "apirila", "maiatza", "ekaina", "uztaila", "abuztua", "iraila", "urria", "azaroa", "abendua", ""],["urt.", "ots.", "mar.", "api.", "mai.", "eka.", "uzt.", "abu.", "ira.", "urr.", "aza.", "abe.", ""],["urt.", "ots.", "mar.", "api.", "mai.", "eka.", "uzt.", "abu.", "ira.", "urr.", "aza.", "abe.", ""],["igandea", "astelehena", "asteartea", "asteazkena", "osteguna", "ostirala", "larunbata"],["ig.", "al.", "ar.", "az.", "og.", "or.", "lr."],["ig.", "al.", "ar.", "az.", "og.", "or.", "lr."],"AM","PM");
						break;
					case "fa":
						c = new DateTimeFormatInfo("dddd, d MMMM yyyy hh:mm:ss tt","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","MMMM, yyyy","d MMMM","dddd, d MMMM yyyy","dd/MM/yyyy","hh:mm:ss tt","hh:mm tt","/",":",["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور", "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند", ""],["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور", "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند", ""],["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور", "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند", ""],["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور", "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند", ""],["يكشنبه", "دوشنبه", "سه شنبه", "چهارشنبه", "پنجشنبه", "جمعه", "شنبه"],["يكشنبه", "دوشنبه", "سه شنبه", "چهارشنبه", "پنجشنبه", "جمعه", "شنبه"],["ی", "د", "س", "چ", "پ", "ج", "ش"],"ق.ظ","ب.ظ");
						break;
					case "ff":
						c = new DateTimeFormatInfo("dddd d MMMM yyyy HH:mm:ss","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","MMMM yyyy","dd MMMM","dddd d MMMM yyyy","dd/MM/yyyy","HH:mm:ss","HH:mm","/",":",["samwiee", "feeburyee", "marsa", "awril", "me", "suyeŋ", "sulyee", "ut", "satambara", "oktoobar", "nowamburu", "deesamburu", ""],["samwiee", "feeburyee", "marsa", "awril", "me", "suyeŋ", "sulyee", "ut", "satambara", "oktoobar", "nowamburu", "deesamburu", ""],["samw", "feeb", "mar", "awr", "me", "suy", "sul", "ut", "sat", "okt", "now", "dees", ""],["samw", "feeb", "mar", "awr", "me", "suy", "sul", "ut", "sat", "okt", "now", "dees", ""],["alete", "altine", "talaata", "alarba", "alkamiisa", "aljumaa", "asete"],["alet", "alt.", "tal.", "alar.", "alk.", "alj.", "aset"],["Al", "Te", "Ta", "Al", "Al", "Ju", "As"],"","");
						break;
					case "fi":
						c = new DateTimeFormatInfo("dddd d. MMMM yyyy H.mm.ss","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","MMMM yyyy","d. MMMM","dddd d. MMMM yyyy","d.M.yyyy","H.mm.ss","H.mm",".",".",["tammikuu", "helmikuu", "maaliskuu", "huhtikuu", "toukokuu", "kesäkuu", "heinäkuu", "elokuu", "syyskuu", "lokakuu", "marraskuu", "joulukuu", ""],["tammikuuta", "helmikuuta", "maaliskuuta", "huhtikuuta", "toukokuuta", "kesäkuuta", "heinäkuuta", "elokuuta", "syyskuuta", "lokakuuta", "marraskuuta", "joulukuuta", ""],["tammi", "helmi", "maalis", "huhti", "touko", "kesä", "heinä", "elo", "syys", "loka", "marras", "joulu", ""],["tammik.", "helmik.", "maalisk.", "huhtik.", "toukok.", "kesäk.", "heinäk.", "elok.", "syysk.", "lokak.", "marrask.", "jouluk.", ""],["sunnuntai", "maanantai", "tiistai", "keskiviikko", "torstai", "perjantai", "lauantai"],["su", "ma", "ti", "ke", "to", "pe", "la"],["su", "ma", "ti", "ke", "to", "pe", "la"],"ap.","ip.");
						break;
					case "fo":
						c = new DateTimeFormatInfo("dddd, d. MMMM yyyy HH:mm:ss","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","MMMM yyyy","d. MMMM","dddd, d. MMMM yyyy","dd.MM.yyyy","HH:mm:ss","HH:mm",".",":",["januar", "februar", "mars", "apríl", "mai", "juni", "juli", "august", "september", "oktober", "november", "desember", ""],["januar", "februar", "mars", "apríl", "mai", "juni", "juli", "august", "september", "oktober", "november", "desember", ""],["jan", "feb", "mar", "apr", "mai", "jun", "jul", "aug", "sep", "okt", "nov", "des", ""],["jan.", "feb.", "mar.", "apr.", "mai", "jun.", "jul.", "aug.", "sep.", "okt.", "nov.", "des.", ""],["sunnudagur", "mánadagur", "týsdagur", "mikudagur", "hósdagur", "fríggjadagur", "leygardagur"],["sun.", "mán.", "týs.", "mik.", "hós.", "frí.", "ley."],["su.", "má.", "tý.", "mi.", "hó.", "fr.", "le."],"um fyr.","um sein.");
						break;
					case "fr":
						c = new DateTimeFormatInfo("dddd d MMMM yyyy HH:mm:ss","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","MMMM yyyy","d MMMM","dddd d MMMM yyyy","dd/MM/yyyy","HH:mm:ss","HH:mm","/",":",["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre", ""],["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre", ""],["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc.", ""],["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc.", ""],["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"],["dim.", "lun.", "mar.", "mer.", "jeu.", "ven.", "sam."],["di", "lu", "ma", "me", "je", "ve", "sa"],"","");
						break;
					case "fy":
						c = new DateTimeFormatInfo("dddd d MMMM yyyy HH:mm:ss","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","MMMM yyyy","d MMMM","dddd d MMMM yyyy","dd-MM-yyyy","HH:mm:ss","HH:mm","-",":",["Jannewaris", "Febrewaris", "Maart", "April", "Maaie", "Juny", "July", "Augustus", "Septimber", "Oktober", "Novimber", "Desimber", ""],["Jannewaris", "Febrewaris", "Maart", "April", "Maaie", "Juny", "July", "Augustus", "Septimber", "Oktober", "Novimber", "Desimber", ""],["Jan", "Feb", "Mrt", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Des", ""],["Jan", "Feb", "Mrt", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Des", ""],["snein", "moandei", "tiisdei", "woansdei", "tongersdei", "freed", "sneon"],["si", "mo", "ti", "wo", "to", "fr", "so"],["si", "mo", "ti", "wo", "to", "fr", "so"],"AM","PM");
						break;
					case "ga":
						c = new DateTimeFormatInfo("dddd d MMMM yyyy HH:mm:ss","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","MMMM yyyy","d MMMM","dddd d MMMM yyyy","dd/MM/yyyy","HH:mm:ss","HH:mm","/",":",["Eanáir", "Feabhra", "Márta", "Aibreán", "Bealtaine", "Meitheamh", "Iúil", "Lúnasa", "Meán Fómhair", "Deireadh Fómhair", "Samhain", "Nollaig", ""],["Eanáir", "Feabhra", "Márta", "Aibreán", "Bealtaine", "Meitheamh", "Iúil", "Lúnasa", "Meán Fómhair", "Deireadh Fómhair", "Samhain", "Nollaig", ""],["Ean", "Feabh", "Márta", "Aib", "Beal", "Meith", "Iúil", "Lún", "MFómh", "DFómh", "Samh", "Noll", ""],["Ean", "Feabh", "Márta", "Aib", "Beal", "Meith", "Iúil", "Lún", "MFómh", "DFómh", "Samh", "Noll", ""],["Dé Domhnaigh", "Dé Luain", "Dé Máirt", "Dé Céadaoin", "Déardaoin", "Dé hAoine", "Dé Sathairn"],["Domh", "Luan", "Máirt", "Céad", "Déar", "Aoine", "Sath"],["Do", "Lu", "Má", "Cé", "Dé", "Ao", "Sa"],"a.m.","p.m.");
						break;
					case "gd":
						c = new DateTimeFormatInfo("dddd, d'mh' MMMM yyyy HH:mm:ss","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","MMMM yyyy","d'mh' MMMM","dddd, d'mh' MMMM yyyy","dd/MM/yyyy","HH:mm:ss","HH:mm","/",":",["Am Faoilleach", "An Gearran", "Am Màrt", "An Giblean", "An Cèitean", "An t-Ògmhios", "An t-Iuchar", "An Lùnastal", "An t-Sultain", "An Dàmhair", "An t-Samhain", "An Dùbhlachd", ""],["dhen Fhaoilleach", "dhen Ghearran", "dhen Mhàrt", "dhen Ghiblean", "dhen Chèitean", "dhen Ògmhios", "dhen Iuchar", "dhen Lùnastal", "dhen t-Sultain", "dhen Dàmhair", "dhen t-Samhain", "dhen Dùbhlachd", ""],["Faoi", "Gearr", "Màrt", "Gibl", "Cèit", "Ògmh", "Iuch", "Lùna", "Sult", "Dàmh", "Samh", "Dùbh", ""],["Faoi", "Gearr", "Màrt", "Gibl", "Cèit", "Ògmh", "Iuch", "Lùna", "Sult", "Dàmh", "Samh", "Dùbh", ""],["DiDòmhnaich", "DiLuain", "DiMàirt", "DiCiadain", "DiarDaoin", "DihAoine", "DiSathairne"],["DiD", "DiL", "DiM", "DiC", "Dia", "Dih", "DiS"],["Dò", "Lu", "Mà", "Ci", "Da", "hA", "Sa"],"m","f");
						break;
					case "gl":
						c = new DateTimeFormatInfo("dddd, d 'de' MMMM 'de' yyyy HH:mm:ss","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","MMMM 'de' yyyy","d 'de' MMMM","dddd, d 'de' MMMM 'de' yyyy","dd/MM/yyyy","HH:mm:ss","HH:mm","/",":",["Xaneiro", "Febreiro", "Marzo", "Abril", "Maio", "Xuño", "Xullo", "Agosto", "Setembro", "Outubro", "Novembro", "Decembro", ""],["xaneiro", "febreiro", "marzo", "abril", "maio", "xuño", "xullo", "agosto", "setembro", "outubro", "novembro", "decembro", ""],["Xan.", "Feb.", "Mar.", "Abr.", "Maio", "Xuño", "Xul.", "Ago.", "Set.", "Out.", "Nov.", "Dec.", ""],["xan.", "feb.", "mar.", "abr.", "maio", "xuño", "xul.", "ago.", "set.", "out.", "nov.", "dec.", ""],["domingo", "luns", "martes", "mércores", "xoves", "venres", "sábado"],["dom.", "luns", "mar.", "mér.", "xov.", "ven.", "sáb."],["dom.", "luns", "mar.", "mér.", "xov.", "ven.", "sáb."],"a.m.","p.m.");
						break;
					case "gn":
						c = new DateTimeFormatInfo("dddd, dd MMMM, yyyy HH:mm:ss","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","MMMM, yyyy","dd MMMM","dddd, dd MMMM, yyyy","dd/MM/yyyy","HH:mm:ss","HH:mm","/",":",["jasyteĩ", "jasykõi", "jasyapy", "jasyrundy", "jasypo", "jasypoteĩ", "jasypokõi", "jasypoapy", "jasyporundy", "jasypa", "jasypateĩ", "jasypakõi", ""],["jasyteĩ", "jasykõi", "jasyapy", "jasyrundy", "jasypo", "jasypoteĩ", "jasypokõi", "jasypoapy", "jasyporundy", "jasypa", "jasypateĩ", "jasypakõi", ""],["jteĩ", "jkõi", "japy", "jrun", "jpo", "jpot", "jpok", "jpoa", "jpor", "jpa", "jpat", "jpak", ""],["jteĩ", "jkõi", "japy", "jrun", "jpo", "jpot", "jpok", "jpoa", "jpor", "jpa", "jpat", "jpak", ""],["arateĩ", "arakõi", "araapy", "ararundy", "arapo", "arapoteĩ", "arapokõi"],["teĩ", "kõi", "apy", "ndy", "po", "oteĩ", "okõi"],["A1", "A2", "A3", "A4", "A5", "A6", "A7"],"a.m.","p.m.");
						break;
					case "gu":
						c = new DateTimeFormatInfo("dd MMMM yyyy HH:mm:ss","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","MMMM, yyyy","dd MMMM","dd MMMM yyyy","dd-MM-yy","HH:mm:ss","HH:mm","-",":",["જાન્યુઆરી", "ફેબ્રુઆરી", "માર્ચ", "એપ્રિલ", "મે", "જૂન", "જુલાઈ", "ઑગસ્ટ", "સપ્ટેમ્બર", "ઑક્ટોબર", "નવેમ્બર", "ડિસેમ્બર", ""],["જાન્યુઆરી", "ફેબ્રુઆરી", "માર્ચ", "એપ્રિલ", "મે", "જૂન", "જુલાઈ", "ઑગસ્ટ", "સપ્ટેમ્બર", "ઑક્ટોબર", "નવેમ્બર", "ડિસેમ્બર", ""],["જાન્યુ", "ફેબ્રુ", "માર્ચ", "એપ્રિલ", "મે", "જૂન", "જુલાઈ", "ઑગ", "સપ્ટે", "ઑક્ટો", "નવે", "ડિસે", ""],["જાન્યુ", "ફેબ્રુ", "માર્ચ", "એપ્રિલ", "મે", "જૂન", "જુલાઈ", "ઑગ", "સપ્ટે", "ઑક્ટો", "નવે", "ડિસે", ""],["રવિવાર", "સોમવાર", "મંગળવાર", "બુધવાર", "ગુરુવાર", "શુક્રવાર", "શનિવાર"],["રવિ", "સોમ", "મંગળ", "બુધ", "ગુરુ", "શુક્ર", "શનિ"],["ર", "સો", "મં", "બુ", "ગુ", "શુ", "શ"],"પૂર્વ મધ્યાહ્ન","ઉત્તર મધ્યાહ્ન");
						break;
					case "gv":
						c = new DateTimeFormatInfo("dddd dd MMMM yyyy HH:mm:ss","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","yyyy MMMM","MMMM d","dddd dd MMMM yyyy","dd/MM/yyyy","HH:mm:ss","HH:mm","/",":",["Jerrey-geuree", "Toshiaght-arree", "Mayrnt", "Averil", "Boaldyn", "Mean-souree", "Jerrey-souree", "Luanistyn", "Mean-fouyir", "Jerrey-fouyir", "Mee Houney", "Mee ny Nollick", ""],["Jerrey-geuree", "Toshiaght-arree", "Mayrnt", "Averil", "Boaldyn", "Mean-souree", "Jerrey-souree", "Luanistyn", "Mean-fouyir", "Jerrey-fouyir", "Mee Houney", "Mee ny Nollick", ""],["J-guer", "T-arree", "Mayrnt", "Avrril", "Boaldyn", "M-souree", "J-souree", "Luanistyn", "M-fouyir", "J-fouyir", "M-Houney", "M-Nollick", ""],["J-guer", "T-arree", "Mayrnt", "Avrril", "Boaldyn", "M-souree", "J-souree", "Luanistyn", "M-fouyir", "J-fouyir", "M-Houney", "M-Nollick", ""],["Jedoonee", "Jelhein", "Jemayrt", "Jercean", "Jerdein", "Jeheiney", "Jesarn"],["Jed", "Jel", "Jem", "Jerc", "Jerd", "Jeh", "Jes"],["Jed", "Jel", "Jem", "Jerc", "Jerd", "Jeh", "Jes"],"a.m.","p.m.");
						break;
					case "ha":
						c = new DateTimeFormatInfo("dddd, d MMMM, yyyy HH:mm:ss","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","MMMM yyyy","MMMM d","dddd, d MMMM, yyyy","d/M/yyyy","HH:mm:ss","HH:mm","/",":",["Janairu", "Faburairu", "Maris", "Afirilu", "Mayu", "Yuni", "Yuli", "Agusta", "Satumba", "Oktoba", "Nuwamba", "Disamba", ""],["Janairu", "Faburairu", "Maris", "Afirilu", "Mayu", "Yuni", "Yuli", "Agusta", "Satumba", "Oktoba", "Nuwamba", "Disamba", ""],["Jan", "Fab", "Mar", "Afi", "May", "Yun", "Yul", "Agu", "Sat", "Okt", "Nuw", "Dis", ""],["Jan", "Fab", "Mar", "Afi", "May", "Yun", "Yul", "Agu", "Sat", "Okt", "Nuw", "Dis", ""],["Lahadi", "Litinin", "Talata", "Laraba", "Alhamis", "Jummaʼa", "Asabar"],["Lah", "Lit", "Tal", "Lar", "Alh", "Jum", "Asa"],["Lh", "Li", "Ta", "Lr", "Al", "Ju", "As"],"AM","PM");
						break;
					case "he":
						c = new DateTimeFormatInfo("dddd dd MMMM yyyy HH:mm:ss","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","MMMM yyyy","dd MMMM","dddd dd MMMM yyyy","dd/MM/yyyy","HH:mm:ss","HH:mm","/",":",["ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני", "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר", ""],["ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני", "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר", ""],["ינו", "פבר", "מרץ", "אפר", "מאי", "יונ", "יול", "אוג", "ספט", "אוק", "נוב", "דצמ", ""],["ינו", "פבר", "מרץ", "אפר", "מאי", "יונ", "יול", "אוג", "ספט", "אוק", "נוב", "דצמ", ""],["יום ראשון", "יום שני", "יום שלישי", "יום רביעי", "יום חמישי", "יום שישי", "שבת"],["יום א", "יום ב", "יום ג", "יום ד", "יום ה", "יום ו", "שבת"],["א", "ב", "ג", "ד", "ה", "ו", "ש"],"AM","PM");
						break;
					case "hi":
						c = new DateTimeFormatInfo("dd MMMM yyyy HH:mm:ss","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","MMMM, yyyy","dd MMMM","dd MMMM yyyy","dd-MM-yyyy","HH:mm:ss","HH:mm","-",":",["जनवरी", "फरवरी", "मार्च", "अप्रैल", "मई", "जून", "जुलाई", "अगस्त", "सितम्बर", "अक्तूबर", "नवम्बर", "दिसम्बर", ""],["जनवरी", "फरवरी", "मार्च", "अप्रैल", "मई", "जून", "जुलाई", "अगस्त", "सितम्बर", "अक्तूबर", "नवम्बर", "दिसम्बर", ""],["जनवरी", "फरवरी", "मार्च", "अप्रैल", "मई", "जून", "जुलाई", "अगस्त", "सितम्बर", "अक्तूबर", "नवम्बर", "दिसम्बर", ""],["जनवरी", "फरवरी", "मार्च", "अप्रैल", "मई", "जून", "जुलाई", "अगस्त", "सितम्बर", "अक्तूबर", "नवम्बर", "दिसम्बर", ""],["रविवार", "सोमवार", "मंगलवार", "बुधवार", "गुरुवार", "शुक्रवार", "शनिवार"],["रवि.", "सोम.", "मंगल.", "बुध.", "गुरु.", "शुक्र.", "शनि."],["र", "स", "म", "ब", "ग", "श", "श"],"पूर्वाह्न","अपराह्न");
						break;
					case "hr":
						c = new DateTimeFormatInfo("d. MMMM yyyy. H:mm:ss","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","MMMM, yyyy","d. MMMM","d. MMMM yyyy.","d.M.yyyy.","H:mm:ss","H:mm",".",":",["siječanj", "veljača", "ožujak", "travanj", "svibanj", "lipanj", "srpanj", "kolovoz", "rujan", "listopad", "studeni", "prosinac", ""],["siječnja", "veljače", "ožujka", "travnja", "svibnja", "lipnja", "srpnja", "kolovoza", "rujna", "listopada", "studenog", "prosinca", ""],["sij", "vlj", "ožu", "tra", "svi", "lip", "srp", "kol", "ruj", "lis", "stu", "pro", ""],["sij", "vlj", "ožu", "tra", "svi", "lip", "srp", "kol", "ruj", "lis", "stu", "pro", ""],["nedjelja", "ponedjeljak", "utorak", "srijeda", "četvrtak", "petak", "subota"],["ned", "pon", "uto", "sri", "čet", "pet", "sub"],["ne", "po", "ut", "sr", "če", "pe", "su"],"","");
						break;
					case "hu":
						c = new DateTimeFormatInfo("yyyy. MMMM d., dddd H:mm:ss","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","yyyy. MMMM","MMMM d.","yyyy. MMMM d., dddd","yyyy. MM. dd.","H:mm:ss","H:mm",". ",":",["január", "február", "március", "április", "május", "június", "július", "augusztus", "szeptember", "október", "november", "december", ""],["január", "február", "március", "április", "május", "június", "július", "augusztus", "szeptember", "október", "november", "december", ""],["jan.", "febr.", "márc.", "ápr.", "máj.", "jún.", "júl.", "aug.", "szept.", "okt.", "nov.", "dec.", ""],["jan.", "febr.", "márc.", "ápr.", "máj.", "jún.", "júl.", "aug.", "szept.", "okt.", "nov.", "dec.", ""],["vasárnap", "hétfő", "kedd", "szerda", "csütörtök", "péntek", "szombat"],["V", "H", "K", "Sze", "Cs", "P", "Szo"],["V", "H", "K", "Sze", "Cs", "P", "Szo"],"de.","du.");
						break;
					case "hy":
						c = new DateTimeFormatInfo("d MMMM, yyyy HH:mm:ss","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","MMMM, yyyy","d MMMM","d MMMM, yyyy","dd.MM.yyyy","HH:mm:ss","HH:mm",".",":",["Հունվար", "Փետրվար", "Մարտ", "Ապրիլ", "Մայիս", "Հունիս", "Հուլիս", "Օգոստոս", "Սեպտեմբեր", "Հոկտեմբեր", "Նոյեմբեր", "Դեկտեմբեր", ""],["հունվարի", "փետրվարի", "մարտի", "ապրիլի", "մայիսի", "հունիսի", "հուլիսի", "օգոստոսի", "սեպտեմբերի", "հոկտեմբերի", "նոյեմբերի", "դեկտեմբերի", ""],["Հնվ", "Փտվ", "Մրտ", "Ապր", "Մյս", "Հնս", "Հլս", "Օգս", "Սպտ", "Հկտ", "Նյմ", "Դկտ", ""],["Հնվ", "Փտվ", "Մրտ", "Ապր", "Մյս", "Հնս", "Հլս", "Օգս", "Սպտ", "Հկտ", "Նյմ", "Դկտ", ""],["Կիրակի", "Երկուշաբթի", "Երեքշաբթի", "Չորեքշաբթի", "Հինգշաբթի", "Ուրբաթ", "Շաբաթ"],["Կիր", "Երկ", "Երք", "Չրք", "Հնգ", "Ուր", "Շբթ"],["Կ", "Ե", "Ե", "Չ", "Հ", "Ո", "Շ"],"","");
						break;
					case "ia":
						c = new DateTimeFormatInfo("dddd, yyyy MMMM dd HH:mm:ss","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","yyyy MMMM","MMMM d","dddd, yyyy MMMM dd","yyyy/MM/dd","HH:mm:ss","HH:mm","/",":",["januario", "februario", "martio", "april", "maio", "junio", "julio", "augusto", "septembre", "octobre", "novembre", "decembre", ""],["januario", "februario", "martio", "april", "maio", "junio", "julio", "augusto", "septembre", "octobre", "novembre", "decembre", ""],["jan", "feb", "mar", "apr", "mai", "jun", "jul", "aug", "sep", "oct", "nov", "dec", ""],["jan", "feb", "mar", "apr", "mai", "jun", "jul", "aug", "sep", "oct", "nov", "dec", ""],["dominica", "lunedi", "martedi", "mercuridi", "jovedi", "venerdi", "sabbato"],["dom", "lun", "mar", "mer", "jov", "ven", "sab"],["dom", "lun", "mar", "mer", "jov", "ven", "sab"],"a.m.","p.m.");
						break;
					case "id":
						c = new DateTimeFormatInfo("dddd, dd MMMM yyyy HH.mm.ss","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","MMMM yyyy","d MMMM","dddd, dd MMMM yyyy","dd/MM/yyyy","HH.mm.ss","HH.mm","/",".",["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember", ""],["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember", ""],["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agt", "Sep", "Okt", "Nov", "Des", ""],["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agt", "Sep", "Okt", "Nov", "Des", ""],["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"],["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"],["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"],"AM","PM");
						break;
					case "ig":
						c = new DateTimeFormatInfo("dddd, d MMMM yyyy HH:mm:ss","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","MMMM yyyy","MMMM d","dddd, d MMMM yyyy","dd/MM/yyyy","HH:mm:ss","HH:mm","/",":",["Jenụwarị", "Febrụwarị", "Maachị", "Eprel", "Mee", "Juun", "Julaị", "Ọgọọst", "Septemba", "Ọktoba", "Novemba", "Disemba", ""],["Jenụwarị", "Febrụwarị", "Maachị", "Eprel", "Mee", "Juun", "Julaị", "Ọgọọst", "Septemba", "Ọktoba", "Novemba", "Disemba", ""],["Jen", "Feb", "Maa", "Epr", "Mee", "Juu", "Jul", "Ọgọ", "Sep", "Ọkt", "Nov", "Dis", ""],["Jen", "Feb", "Maa", "Epr", "Mee", "Juu", "Jul", "Ọgọ", "Sep", "Ọkt", "Nov", "Dis", ""],["Mbọsị Ụka", "Mọnde", "Tiuzdee", "Wenezdee", "Tọọzdee", "Fraịdee", "Satọdee"],["Ụka", "Mọn", "Tiu", "Wen", "Tọọ", "Fraị", "Sat"],["Ụka", "Mọn", "Tiu", "Wen", "Tọọ", "Fraị", "Sat"],"A.M.","P.M.");
						break;
					case "ii":
						c = new DateTimeFormatInfo("yyyy'ꈎ' M'ꆪ' d'ꑍ' tt h:mm:ss","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","yyyy'ꈎ' M'ꆪ'","M’ ꆪ’d’ ꑍ’","yyyy'ꈎ' M'ꆪ' d'ꑍ'","yyyy/M/d","tt h:mm:ss","tt h:mm","/",":",["ꋍꆪ", "ꑍꆪ", "ꌕꆪ", "ꇖꆪ", "ꉬꆪ", "ꃘꆪ", "ꏃꆪ", "ꉆꆪ", "ꈬꆪ", "ꊰꆪ", "ꊯꊪꆪ", "ꊰꑋꆪ", ""],["ꋍꆪ", "ꑍꆪ", "ꌕꆪ", "ꇖꆪ", "ꉬꆪ", "ꃘꆪ", "ꏃꆪ", "ꉆꆪ", "ꈬꆪ", "ꊰꆪ", "ꊯꊪꆪ", "ꊰꑋꆪ", ""],["ꋍꆪ", "ꑍꆪ", "ꌕꆪ", "ꇖꆪ", "ꉬꆪ", "ꃘꆪ", "ꏃꆪ", "ꉆꆪ", "ꈬꆪ", "ꊰꆪ", "ꊯꊪꆪ", "ꊰꑋꆪ", ""],["ꋍꆪ", "ꑍꆪ", "ꌕꆪ", "ꇖꆪ", "ꉬꆪ", "ꃘꆪ", "ꏃꆪ", "ꉆꆪ", "ꈬꆪ", "ꊰꆪ", "ꊯꊪꆪ", "ꊰꑋꆪ", ""],["ꑭꆏꑍ", "ꆏꊂ꒔", "ꆏꊂꑍ", "ꆏꊂꌕ", "ꆏꊂꇖ", "ꆏꊂꉬ", "ꆏꊂꃘ"],["ꑭꆏ", "ꆏ꒔", "ꆏꑍ", "ꆏꌕ", "ꆏꇖ", "ꆏꉬ", "ꆏꃘ"],["ꆏ", "꒔", "ꑍ", "ꌕ", "ꇖ", "ꉬ", "ꃘ"],"ꂵꆪꈌꈐ","ꂵꆪꈌꉈ");
						break;
					case "is":
						c = new DateTimeFormatInfo("dddd, d. MMMM yyyy HH:mm:ss","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","MMMM yyyy","d. MMMM","dddd, d. MMMM yyyy","d.M.yyyy","HH:mm:ss","HH:mm",".",":",["janúar", "febrúar", "mars", "apríl", "maí", "júní", "júlí", "ágúst", "september", "október", "nóvember", "desember", ""],["janúar", "febrúar", "mars", "apríl", "maí", "júní", "júlí", "ágúst", "september", "október", "nóvember", "desember", ""],["jan.", "feb.", "mar.", "apr.", "maí", "jún.", "júl.", "ágú.", "sep.", "okt.", "nóv.", "des.", ""],["jan.", "feb.", "mar.", "apr.", "maí", "jún.", "júl.", "ágú.", "sep.", "okt.", "nóv.", "des.", ""],["sunnudagur", "mánudagur", "þriðjudagur", "miðvikudagur", "fimmtudagur", "föstudagur", "laugardagur"],["sun.", "mán.", "þri.", "mið.", "fim.", "fös.", "lau."],["su.", "má.", "þr.", "mi.", "fi.", "fö.", "la."],"f.h.","e.h.");
						break;
					case "it":
						c = new DateTimeFormatInfo("dddd d MMMM yyyy HH:mm:ss","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","MMMM yyyy","d MMMM","dddd d MMMM yyyy","dd/MM/yyyy","HH:mm:ss","HH:mm","/",":",["gennaio", "febbraio", "marzo", "aprile", "maggio", "giugno", "luglio", "agosto", "settembre", "ottobre", "novembre", "dicembre", ""],["gennaio", "febbraio", "marzo", "aprile", "maggio", "giugno", "luglio", "agosto", "settembre", "ottobre", "novembre", "dicembre", ""],["gen", "feb", "mar", "apr", "mag", "giu", "lug", "ago", "set", "ott", "nov", "dic", ""],["gen", "feb", "mar", "apr", "mag", "giu", "lug", "ago", "set", "ott", "nov", "dic", ""],["domenica", "lunedì", "martedì", "mercoledì", "giovedì", "venerdì", "sabato"],["dom", "lun", "mar", "mer", "gio", "ven", "sab"],["do", "lu", "ma", "me", "gi", "ve", "sa"],"","");
						break;
					case "iu":
						c = new DateTimeFormatInfo("dddd, dd MMMM, yyyy h:mm:ss tt","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","MMMM, yyyy","MMMM d","dddd, dd MMMM, yyyy","d/MM/yyyy","h:mm:ss tt","h:mm tt","/",":",["Jaannuari", "Viivvuari", "Maatsi", "Iipuri", "Mai", "Juuni", "Julai", "Aaggiisi", "Sitipiri", "Utupiri", "Nuvipiri", "Tisipiri", ""],["Jaannuari", "Viivvuari", "Maatsi", "Iipuri", "Mai", "Juuni", "Julai", "Aaggiisi", "Sitipiri", "Utupiri", "Nuvipiri", "Tisipiri", ""],["Jan", "Viv", "Mas", "Ipu", "Mai", "Jun", "Jul", "Agi", "Sii", "Uut", "Nuv", "Tis", ""],["Jan", "Viv", "Mas", "Ipu", "Mai", "Jun", "Jul", "Agi", "Sii", "Uut", "Nuv", "Tis", ""],["Naattiinguja", "Naggajjau", "Aippiq", "Pingatsiq", "Sitammiq", "Tallirmiq", "Sivataarvik"],["Nat", "Nag", "Aip", "Pi", "Sit", "Tal", "Siv"],["Nt", "Ng", "A", "P", "S", "T", "S"],"AM","PM");
						break;
					case "ja":
						c = new DateTimeFormatInfo("yyyy'年'M'月'd'日' H:mm:ss","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","yyyy'年'M'月'","M月d日","yyyy'年'M'月'd'日'","yyyy/MM/dd","H:mm:ss","H:mm","/",":",["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月", ""],["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月", ""],["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", ""],["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", ""],["日曜日", "月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日"],["日", "月", "火", "水", "木", "金", "土"],["日", "月", "火", "水", "木", "金", "土"],"午前","午後");
						break;
					case "jv":
						c = new DateTimeFormatInfo("dd MMMM yyyy HH.mm.ss","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","MMMM yyyy","dd MMMM","dd MMMM yyyy","dd/MM/yyyy","HH.mm.ss","HH.mm","/",".",["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember", ""],["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember", ""],["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agust", "Sep", "Okt", "Nov", "Des", ""],["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agust", "Sep", "Okt", "Nov", "Des", ""],["Minggu", "Senèn", "Selasa", "Rebo", "Kemis", "Jemuwah", "Setu"],["Min", "Sen", "Sel", "Reb", "Kem", "Jem", "Set"],["Mi", "Sn", "Sl", "Re", "Ke", "Je", "St"],"","");
						break;
					case "ka":
						c = new DateTimeFormatInfo("dddd, dd MMMM, yyyy HH:mm:ss","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","MMMM, yyyy","d MMMM","dddd, dd MMMM, yyyy","dd.MM.yyyy","HH:mm:ss","HH:mm",".",":",["იანვარი", "თებერვალი", "მარტი", "აპრილი", "მაისი", "ივნისი", "ივლისი", "აგვისტო", "სექტემბერი", "ოქტომბერი", "ნოემბერი", "დეკემბერი", ""],["იანვარი", "თებერვალი", "მარტი", "აპრილი", "მაისი", "ივნისი", "ივლისი", "აგვისტო", "სექტემბერი", "ოქტომბერი", "ნოემბერი", "დეკემბერი", ""],["იან", "თებ", "მარ", "აპრ", "მაი", "ივნ", "ივლ", "აგვ", "სექ", "ოქტ", "ნოე", "დეკ", ""],["იან", "თებ", "მარ", "აპრ", "მაი", "ივნ", "ივლ", "აგვ", "სექ", "ოქტ", "ნოე", "დეკ", ""],["კვირა", "ორშაბათი", "სამშაბათი", "ოთხშაბათი", "ხუთშაბათი", "პარასკევი", "შაბათი"],["კვი", "ორშ", "სამ", "ოთხ", "ხუთ", "პარ", "შაბ"],["კვ", "ორ", "სმ", "ოთ", "ხთ", "პრ", "შბ"],"AM","PM");
						break;
					case "ki":
						c = new DateTimeFormatInfo("dddd, d MMMM yyyy HH:mm:ss","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","MMMM yyyy","MMMM d","dddd, d MMMM yyyy","dd/MM/yyyy","HH:mm:ss","HH:mm","/",":",["Njenuarĩ", "Mwere wa kerĩ", "Mwere wa gatatũ", "Mwere wa kana", "Mwere wa gatano", "Mwere wa gatandatũ", "Mwere wa mũgwanja", "Mwere wa kanana", "Mwere wa kenda", "Mwere wa ikũmi", "Mwere wa ikũmi na ũmwe", "Ndithemba", ""],["Njenuarĩ", "Mwere wa kerĩ", "Mwere wa gatatũ", "Mwere wa kana", "Mwere wa gatano", "Mwere wa gatandatũ", "Mwere wa mũgwanja", "Mwere wa kanana", "Mwere wa kenda", "Mwere wa ikũmi", "Mwere wa ikũmi na ũmwe", "Ndithemba", ""],["JEN", "WKR", "WGT", "WKN", "WTN", "WTD", "WMJ", "WNN", "WKD", "WIK", "WMW", "DIT", ""],["JEN", "WKR", "WGT", "WKN", "WTN", "WTD", "WMJ", "WNN", "WKD", "WIK", "WMW", "DIT", ""],["Kiumia", "Njumatatũ", "Njumaine", "Njumatana", "Aramithi", "Njumaa", "Njumamothi"],["KMA", "NTT", "NMN", "NMT", "ART", "NMA", "NMM"],["KMA", "NTT", "NMN", "NMT", "ART", "NMA", "NMM"],"Kiroko","Hwaĩ-inĩ");
						break;
					case "kk":
						c = new DateTimeFormatInfo("yyyy 'ж'. d MMMM, dddd HH:mm:ss","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","yyyy 'ж'. MMMM","d MMMM","yyyy 'ж'. d MMMM, dddd","dd.MM.yyyy","HH:mm:ss","HH:mm",".",":",["Қаңтар", "Ақпан", "Наурыз", "Сәуір", "Мамыр", "Маусым", "Шілде", "Тамыз", "Қыркүйек", "Қазан", "Қараша", "Желтоқсан", ""],["қаңтар", "ақпан", "наурыз", "сәуір", "мамыр", "маусым", "шілде", "тамыз", "қыркүйек", "қазан", "қараша", "желтоқсан", ""],["Қаң.", "Ақп.", "Нау.", "Сәу.", "Мам.", "Мау.", "Шіл.", "Там.", "Қыр.", "Қаз.", "Қар.", "Жел.", ""],["қаң.", "ақп.", "нау.", "сәу.", "мам.", "мау.", "шіл.", "там.", "қыр.", "қаз.", "қар.", "жел.", ""],["жексенбі", "дүйсенбі", "сейсенбі", "сәрсенбі", "бейсенбі", "жұма", "сенбі"],["Жс", "Дс", "Сс", "Ср", "Бс", "Жм", "Сб"],["Жс", "Дс", "Сс", "Ср", "Бс", "Жм", "Сб"],"AM","PM");
						break;
					case "kl":
						c = new DateTimeFormatInfo("MMMM d'.-at, 'yyyy HH:mm:ss","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","MMMM yyyy","MMMM d'.-at'","MMMM d'.-at, 'yyyy","dd-MM-yyyy","HH:mm:ss","HH:mm","-",":",["januaari", "februaari", "marsi", "apriili", "maaji", "juuni", "juuli", "aggusti", "septembari", "oktobari", "novembari", "decembari", ""],["januaarip", "februaarip", "marsip", "apriilip", "maajip", "juunip", "juulip", "aggustip", "septembarip", "oktobarip", "novembarip", "decembarip", ""],["jan", "feb", "mar", "apr", "mai", "jun", "jul", "aug", "sep", "okt", "nov", "dec", ""],["jan", "feb", "mar", "apr", "mai", "jun", "jul", "aug", "sep", "okt", "nov", "dec", ""],["sapaat", "ataasinngorneq", "marlunngorneq", "pingasunngorneq", "sisamanngorneq", "tallimanngorneq", "arfininngorneq"],["sap.", "at.", "marl.", "ping.", "sis.", "tall.", "arf."],["sa", "at", "ma", "pi", "si", "ta", "ar"],"","");
						break;
					case "km":
						c = new DateTimeFormatInfo("d MMMM yyyy HH:mm:ss","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","'ខែ' MM 'ឆ្នាំ' yyyy","d MMMM","d MMMM yyyy","dd/MM/yy","HH:mm:ss","H:mm","/",":",["មករា", "កុម្ភៈ", "មិនា", "មេសា", "ឧសភា", "មិថុនា", "កក្កដា", "សីហា", "កញ្ញា", "តុលា", "វិច្ឆិកា", "ធ្នូ", ""],["មករា", "កុម្ភៈ", "មិនា", "មេសា", "ឧសភា", "មិថុនា", "កក្កដា", "សីហា", "កញ្ញា", "តុលា", "វិច្ឆិកា", "ធ្នូ", ""],["១", "២", "៣", "៤", "៥", "៦", "៧", "៨", "៩", "១០", "១១", "១២", ""],["១", "២", "៣", "៤", "៥", "៦", "៧", "៨", "៩", "១០", "១១", "១២", ""],["ថ្ងៃអាទិត្យ", "ថ្ងៃច័ន្ទ", "ថ្ងៃអង្គារ", "ថ្ងៃពុធ", "ថ្ងៃព្រហស្បតិ៍", "ថ្ងៃសុក្រ", "ថ្ងៃសៅរ៍"],["អាទិ.", "ច.", "អ.", "ពុ", "ព្រហ.", "សុ.", "ស."],["អា", "ច", "អ", "ពុ", "ព", "សុ", "ស"],"ព្រឹក","ល្ងាច");
						break;
					case "kn":
						c = new DateTimeFormatInfo("dd MMMM yyyy HH:mm:ss","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","MMMM, yyyy","MMMM d","dd MMMM yyyy","dd-MM-yy","HH:mm:ss","HH:mm","-",":",["ಜನವರಿ", "ಫೆಬ್ರವರಿ", "ಮಾರ್ಚ್", "ಏಪ್ರೀಲ್", "ಮೇ", "ಜೂನ್", "ಜುಲೈ", "ಆಗಸ್ಟ್", "ಸೆಪ್ಟಂಬರ್", "ಅಕ್ಟೋಬರ್", "ನವೆಂಬರ್", "ಡಿಸೆಂಬರ್", ""],["ಜನವರಿ", "ಫೆಬ್ರವರಿ", "ಮಾರ್ಚ್", "ಏಪ್ರೀಲ್", "ಮೇ", "ಜೂನ್", "ಜುಲೈ", "ಆಗಸ್ಟ್", "ಸೆಪ್ಟಂಬರ್", "ಅಕ್ಟೋಬರ್", "ನವೆಂಬರ್", "ಡಿಸೆಂಬರ್", ""],["ಜನವರಿ", "ಫೆಬ್ರವರಿ", "ಮಾರ್ಚ್", "ಎಪ್ರಿಲ್", "ಮೇ", "ಜೂನ್", "ಜುಲೈ", "ಆಗಸ್ಟ್", "ಸೆಪ್ಟಂಬರ್", "ಅಕ್ಟೋಬರ್", "ನವೆಂಬರ್", "ಡಿಸೆಂಬರ್", ""],["ಜನವರಿ", "ಫೆಬ್ರವರಿ", "ಮಾರ್ಚ್", "ಎಪ್ರಿಲ್", "ಮೇ", "ಜೂನ್", "ಜುಲೈ", "ಆಗಸ್ಟ್", "ಸೆಪ್ಟಂಬರ್", "ಅಕ್ಟೋಬರ್", "ನವೆಂಬರ್", "ಡಿಸೆಂಬರ್", ""],["ಭಾನುವಾರ", "ಸೋಮವಾರ", "ಮಂಗಳವಾರ", "ಬುಧವಾರ", "ಗುರುವಾರ", "ಶುಕ್ರವಾರ", "ಶನಿವಾರ"],["ಭಾನು.", "ಸೋಮ.", "ಮಂಗಳ.", "ಬುಧ.", "ಗುರು.", "ಶುಕ್ರ.", "ಶನಿ."],["ರ", "ಸ", "ಮ", "ಬ", "ಗ", "ಶ", "ಶ"],"ಪೂರ್ವಾಹ್ನ","ಅಪರಾಹ್ನ");
						break;
					case "ko":
						c = new DateTimeFormatInfo("yyyy'년' M'월' d'일' dddd tt h:mm:ss","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","yyyy'년' M'월'","M월 d일","yyyy'년' M'월' d'일' dddd","yyyy-MM-dd","tt h:mm:ss","tt h:mm","-",":",["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월", ""],["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월", ""],["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", ""],["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", ""],["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"],["일", "월", "화", "수", "목", "금", "토"],["일", "월", "화", "수", "목", "금", "토"],"오전","오후");
						break;
					case "kr":
						c = new DateTimeFormatInfo("dddd, MMMM dd, yyyy h:mm:ss tt","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","yyyy MMMM","MMMM dd","dddd, MMMM dd, yyyy","d/M/yyyy","h:mm:ss tt","h:mm tt","/",":",["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December", ""],["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December", ""],["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", ""],["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", ""],["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],"AM","PM");
						break;
					case "ks":
						c = new DateTimeFormatInfo("dddd, MMMM d, yyyy h:mm:ss tt","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","MMMM yyyy","MMMM d","dddd, MMMM d, yyyy","M/d/yyyy","h:mm:ss tt","h:mm tt","/",":",["جنؤری", "فرؤری", "مارٕچ", "اپریل", "میٔ", "جوٗن", "جوٗلایی", "اگست", "ستمبر", "اکتوٗبر", "نومبر", "دسمبر", ""],["جنؤری", "فرؤری", "مارٕچ", "اپریل", "میٔ", "جوٗن", "جوٗلایی", "اگست", "ستمبر", "اکتوٗبر", "نومبر", "دسمبر", ""],["جنؤری", "فرؤری", "مارٕچ", "اپریل", "میٔ", "جوٗن", "جوٗلایی", "اگست", "ستمبر", "اکتوٗبر", "نومبر", "دسمبر", ""],["جنؤری", "فرؤری", "مارٕچ", "اپریل", "میٔ", "جوٗن", "جوٗلایی", "اگست", "ستمبر", "اکتوٗبر", "نومبر", "دسمبر", ""],["اَتھوار", "ژٔنٛدرٕروار", "بوٚموار", "بودوار", "برٛٮ۪سوار", "جُمہ", "بٹوار"],["آتھوار", "ژٔنٛدٕروار", "بوٚموار", "بودوار", "برٛٮ۪سوار", "جُمہ", "بٹوار"],["آتھوار", "ژٔنٛدٕروار", "بوٚموار", "بودوار", "برٛٮ۪سوار", "جُمہ", "بٹوار"],"AM","PM");
						break;
					case "ku":
						c = new DateTimeFormatInfo("dddd, dd MMMM, yyyy hh:mm:ss tt","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","MMMM, yyyy","d MMMM","dddd, dd MMMM, yyyy","yyyy/MM/dd","hh:mm:ss tt","hh:mm tt","/",":",["کانوونی دووەم", "شوبات", "ئازار", "نیسان", "ئایار", "حوزەیران", "تەمووز", "ئاب", "ئەیلوول", "تشرینی یەکەم", "تشرینی دووەم", "کانونی یەکەم", ""],["کانوونی دووەم", "شوبات", "ئازار", "نیسان", "ئایار", "حوزەیران", "تەمووز", "ئاب", "ئەیلوول", "تشرینی یەکەم", "تشرینی دووەم", "کانونی یەکەم", ""],["کانوونی دووەم", "شوبات", "ئازار", "نیسان", "ئایار", "حوزەیران", "تەمووز", "ئاب", "ئەیلوول", "تشرینی یەکەم", "تشرینی دووەم", "کانونی یەکەم", ""],["کانوونی دووەم", "شوبات", "ئازار", "نیسان", "ئایار", "حوزەیران", "تەمووز", "ئاب", "ئەیلوول", "تشرینی یەکەم", "تشرینی دووەم", "کانونی یەکەم", ""],["یەکشەممە", "دووشەممە", "سێشەممە", "چوارشەممە", "پێنجشەممە", "ھەینی", "شەممە"],["یەکشەممە", "دووشەممە", "سێشەممە", "چوارشەممە", "پێنجشەممە", "ھەینی", "شەممە"],["ی", "د", "س", "چ", "پ", "ھ", "ش"],"پ.ن","د.ن");
						break;
					case "kw":
						c = new DateTimeFormatInfo("dddd d MMMM yyyy HH:mm:ss","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","yyyy MMMM","MMMM d","dddd d MMMM yyyy","dd/MM/yyyy","HH:mm:ss","HH:mm","/",":",["mis Genver", "mis Hwevrer", "mis Meurth", "mis Ebrel", "mis Me", "mis Metheven", "mis Gortheren", "mis Est", "mis Gwynngala", "mis Hedra", "mis Du", "mis Kevardhu", ""],["mis Genver", "mis Hwevrer", "mis Meurth", "mis Ebrel", "mis Me", "mis Metheven", "mis Gortheren", "mis Est", "mis Gwynngala", "mis Hedra", "mis Du", "mis Kevardhu", ""],["Gen", "Hwe", "Meu", "Ebr", "Me", "Met", "Gor", "Est", "Gwn", "Hed", "Du", "Kev", ""],["Gen", "Hwe", "Meu", "Ebr", "Me", "Met", "Gor", "Est", "Gwn", "Hed", "Du", "Kev", ""],["dy Sul", "dy Lun", "dy Meurth", "dy Merher", "dy Yow", "dy Gwener", "dy Sadorn"],["Sul", "Lun", "Mth", "Mhr", "Yow", "Gwe", "Sad"],["Sul", "Lun", "Mth", "Mhr", "Yow", "Gwe", "Sad"],"a.m.","p.m.");
						break;
					case "ky":
						c = new DateTimeFormatInfo("dd-MMMM yyyy'-ж.' HH:mm:ss","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","MMMM yyyy'-ж.'","d-MMMM","dd-MMMM yyyy'-ж.'","d-MMM yy","HH:mm:ss","HH:mm","-",":",["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь", ""],["январь", "февраль", "март", "апрель", "май", "июнь", "июль", "август", "сентябрь", "октябрь", "ноябрь", "декабрь", ""],["янв", "фев", "мар", "апр", "май", "июн", "июл", "авг", "сен", "окт", "ноя", "дек", ""],["янв.", "фев.", "мар.", "апр.", "май", "июн.", "июл.", "авг.", "сен.", "окт.", "ноя.", "дек.", ""],["жекшемби", "дүйшөмбү", "шейшемби", "шаршемби", "бейшемби", "жума", "ишемби"],["Жш", "Дш", "Шш", "Шр", "Бш", "Жм", "Иш"],["Жш", "Дш", "Шш", "Шр", "Бш", "Жм", "Иш"],"","");
						break;
					case "la":
						c = new DateTimeFormatInfo("dddd d MMMM yyyy HH:mm:ss","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","MMMM yyyy","MMMM dd","dddd d MMMM yyyy","dd/MM/yyyy","HH:mm:ss","H:mm","/",":",["Ianuarius", "Februarius", "Martius", "Aprilis", "Maius", "Iunius", "Quintilis", "Sextilis", "September", "October", "November", "December", ""],["Ianuarius", "Februarius", "Martius", "Aprilis", "Maius", "Iunius", "Quintilis", "Sextilis", "September", "October", "November", "December", ""],["Ian", "Feb", "Mar", "Apr", "Mai", "Iun", "Quint", "Sext", "Sept", "Oct", "Nov", "Dec", ""],["Ian", "Feb", "Mar", "Apr", "Mai", "Iun", "Quint", "Sext", "Sept", "Oct", "Nov", "Dec", ""],["Solis", "Lunae", "Martis", "Mercurii", "Jovis", "Veneris", "Saturni"],["Sol", "Lun", "Mar", "Mer", "Jov", "Ven", "Sat"],["So", "Lu", "Ma", "Me", "Jo", "Ve", "Sa"],"","");
						break;
					case "lb":
						c = new DateTimeFormatInfo("d. MMMM yyyy HH:mm:ss","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","MMMM yyyy","dd. MMMM","d. MMMM yyyy","dd.MM.yy","HH:mm:ss","HH:mm",".",":",["Januar", "Februar", "Mäerz", "Abrëll", "Mee", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember", ""],["Januar", "Februar", "Mäerz", "Abrëll", "Mee", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember", ""],["Jan", "Feb", "Mäe", "Abr", "Mee", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez", ""],["Jan", "Feb", "Mäe", "Abr", "Mee", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez", ""],["Sonndeg", "Méindeg", "Dënschdeg", "Mëttwoch", "Donneschdeg", "Freideg", "Samschdeg"],["Son", "Méi", "Dën", "Mët", "Don", "Fre", "Sam"],["So", "Mé", "Dë", "Më", "Do", "Fr", "Sa"],"","");
						break;
					case "lg":
						c = new DateTimeFormatInfo("dddd, d MMMM yyyy HH:mm:ss","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","MMMM yyyy","MMMM d","dddd, d MMMM yyyy","dd/MM/yyyy","HH:mm:ss","HH:mm","/",":",["Janwaliyo", "Febwaliyo", "Marisi", "Apuli", "Maayi", "Juuni", "Julaayi", "Agusito", "Sebuttemba", "Okitobba", "Novemba", "Desemba", ""],["Janwaliyo", "Febwaliyo", "Marisi", "Apuli", "Maayi", "Juuni", "Julaayi", "Agusito", "Sebuttemba", "Okitobba", "Novemba", "Desemba", ""],["Jan", "Feb", "Mar", "Apu", "Maa", "Juu", "Jul", "Agu", "Seb", "Oki", "Nov", "Des", ""],["Jan", "Feb", "Mar", "Apu", "Maa", "Juu", "Jul", "Agu", "Seb", "Oki", "Nov", "Des", ""],["Sabbiiti", "Balaza", "Lwakubiri", "Lwakusatu", "Lwakuna", "Lwakutaano", "Lwamukaaga"],["Sab", "Bal", "Lw2", "Lw3", "Lw4", "Lw5", "Lw6"],["Sab", "Bal", "Lw2", "Lw3", "Lw4", "Lw5", "Lw6"],"AM","PM");
						break;
					case "ln":
						c = new DateTimeFormatInfo("dddd d MMMM yyyy HH:mm:ss","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","yyyy MMMM","MMMM d","dddd d MMMM yyyy","d/M/yyyy","HH:mm:ss","HH:mm","/",":",["sánzá ya yambo", "sánzá ya míbalé", "sánzá ya mísáto", "sánzá ya mínei", "sánzá ya mítáno", "sánzá ya motóbá", "sánzá ya nsambo", "sánzá ya mwambe", "sánzá ya libwa", "sánzá ya zómi", "sánzá ya zómi na mɔ̌kɔ́", "sánzá ya zómi na míbalé", ""],["sánzá ya yambo", "sánzá ya míbalé", "sánzá ya mísáto", "sánzá ya mínei", "sánzá ya mítáno", "sánzá ya motóbá", "sánzá ya nsambo", "sánzá ya mwambe", "sánzá ya libwa", "sánzá ya zómi", "sánzá ya zómi na mɔ̌kɔ́", "sánzá ya zómi na míbalé", ""],["yan", "fbl", "msi", "apl", "mai", "yun", "yul", "agt", "stb", "ɔtb", "nvb", "dsb", ""],["yan", "fbl", "msi", "apl", "mai", "yun", "yul", "agt", "stb", "ɔtb", "nvb", "dsb", ""],["eyenga", "mokɔlɔ mwa yambo", "mokɔlɔ mwa míbalé", "mokɔlɔ mwa mísáto", "mokɔlɔ ya mínéi", "mokɔlɔ ya mítáno", "mpɔ́sɔ"],["eye", "ybo", "mbl", "mst", "min", "mtn", "mps"],["eye", "ybo", "mbl", "mst", "min", "mtn", "mps"],"ntɔ́ngɔ́","mpókwa");
						break;
					case "lo":
						c = new DateTimeFormatInfo("dddd ທີ d MMMM gg yyyy H:mm:ss","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","yyyy MMMM","MMMM d","dddd ທີ d MMMM gg yyyy","d/M/yyyy","H:mm:ss","H:mm","/",":",["ມັງກອນ", "ກຸມພາ", "ມີນາ", "ເມສາ", "ພຶດສະພາ", "ມິຖຸນາ", "ກໍລະກົດ", "ສິງຫາ", "ກັນຍາ", "ຕຸລາ", "ພະຈິກ", "ທັນວາ", ""],["ມັງກອນ", "ກຸມພາ", "ມີນາ", "ເມສາ", "ພຶດສະພາ", "ມິຖຸນາ", "ກໍລະກົດ", "ສິງຫາ", "ກັນຍາ", "ຕຸລາ", "ພະຈິກ", "ທັນວາ", ""],["ມ.ກ.", "ກ.ພ.", "ມ.ນ.", "ມ.ສ.", "ພ.ພ.", "ມິ.ຖ.", "ກ.ລ.", "ສ.ຫ.", "ກ.ຍ.", "ຕ.ລ.", "ພ.ຈ.", "ທ.ວ.", ""],["ມ.ກ.", "ກ.ພ.", "ມ.ນ.", "ມ.ສ.", "ພ.ພ.", "ມິ.ຖ.", "ກ.ລ.", "ສ.ຫ.", "ກ.ຍ.", "ຕ.ລ.", "ພ.ຈ.", "ທ.ວ.", ""],["ວັນອາທິດ", "ວັນຈັນ", "ວັນອັງຄານ", "ວັນພຸດ", "ວັນພະຫັດ", "ວັນສຸກ", "ວັນເສົາ"],["ອາທິດ", "ຈັນ", "ອັງຄານ", "ພຸດ", "ພະຫັດ", "ສຸກ", "ເສົາ"],["ອາ.", "ຈ.", "ອ.", "ພ.", "ພຫ.", "ສຸ.", "ສ."],"ກ່ອນທ່ຽງ","ຫຼັງທ່ຽງ");
						break;
					case "lt":
						c = new DateTimeFormatInfo("yyyy 'm'. MMMM d 'd'., dddd HH:mm:ss","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","yyyy 'm'. MMMM","MMMM d 'd'.","yyyy 'm'. MMMM d 'd'., dddd","yyyy-MM-dd","HH:mm:ss","HH:mm","-",":",["sausis", "vasaris", "kovas", "balandis", "gegužė", "birželis", "liepa", "rugpjūtis", "rugsėjis", "spalis", "lapkritis", "gruodis", ""],["sausio", "vasario", "kovo", "balandžio", "gegužės", "birželio", "liepos", "rugpjūčio", "rugsėjo", "spalio", "lapkričio", "gruodžio", ""],["saus.", "vas.", "kov.", "bal.", "geg.", "birž.", "liep.", "rugp.", "rugs.", "spal.", "lapkr.", "gruod.", ""],["saus.", "vas.", "kov.", "bal.", "geg.", "birž.", "liep.", "rugp.", "rugs.", "spal.", "lapkr.", "gruod.", ""],["sekmadienis", "pirmadienis", "antradienis", "trečiadienis", "ketvirtadienis", "penktadienis", "šeštadienis"],["sk", "pr", "an", "tr", "kt", "pn", "št"],["Sk", "Pr", "An", "Tr", "Kt", "Pn", "Št"],"priešpiet","popiet");
						break;
					case "lu":
						c = new DateTimeFormatInfo("dddd d MMMM yyyy HH:mm:ss","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","yyyy MMMM","MMMM d","dddd d MMMM yyyy","d/M/yyyy","HH:mm:ss","HH:mm","/",":",["Ciongo", "Lùishi", "Lusòlo", "Mùuyà", "Lumùngùlù", "Lufuimi", "Kabàlàshìpù", "Lùshìkà", "Lutongolo", "Lungùdi", "Kaswèkèsè", "Ciswà", ""],["Ciongo", "Lùishi", "Lusòlo", "Mùuyà", "Lumùngùlù", "Lufuimi", "Kabàlàshìpù", "Lùshìkà", "Lutongolo", "Lungùdi", "Kaswèkèsè", "Ciswà", ""],["Cio", "Lui", "Lus", "Muu", "Lum", "Luf", "Kab", "Lush", "Lut", "Lun", "Kas", "Cis", ""],["Cio", "Lui", "Lus", "Muu", "Lum", "Luf", "Kab", "Lush", "Lut", "Lun", "Kas", "Cis", ""],["Lumingu", "Nkodya", "Ndàayà", "Ndangù", "Njòwa", "Ngòvya", "Lubingu"],["Lum", "Nko", "Ndy", "Ndg", "Njw", "Ngv", "Lub"],["Lum", "Nko", "Ndy", "Ndg", "Njw", "Ngv", "Lub"],"Dinda","Dilolo");
						break;
					case "lv":
						c = new DateTimeFormatInfo("dddd, yyyy. 'gada' d. MMMM HH:mm:ss","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","yyyy. 'g'. MMMM","d. MMMM","dddd, yyyy. 'gada' d. MMMM","dd.MM.yyyy","HH:mm:ss","HH:mm",".",":",["janvāris", "februāris", "marts", "aprīlis", "maijs", "jūnijs", "jūlijs", "augusts", "septembris", "oktobris", "novembris", "decembris", ""],["janvāris", "februāris", "marts", "aprīlis", "maijs", "jūnijs", "jūlijs", "augusts", "septembris", "oktobris", "novembris", "decembris", ""],["janv.", "febr.", "marts", "apr.", "maijs", "jūn.", "jūl.", "aug.", "sept.", "okt.", "nov.", "dec.", ""],["janv.", "febr.", "marts", "apr.", "maijs", "jūn.", "jūl.", "aug.", "sept.", "okt.", "nov.", "dec.", ""],["svētdiena", "pirmdiena", "otrdiena", "trešdiena", "ceturtdiena", "piektdiena", "sestdiena"],["svētd.", "pirmd.", "otrd.", "trešd.", "ceturtd.", "piektd.", "sestd."],["Sv", "Pr", "Ot", "Tr", "Ce", "Pk", "Se"],"priekšp.","pēcp.");
						break;
					case "mg":
						c = new DateTimeFormatInfo("dddd d MMMM yyyy HH:mm:ss","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","MMMM yyyy","d MMMM","dddd d MMMM yyyy","yyyy-MM-dd","HH:mm:ss","HH:mm","-",":",["Janoary", "Febroary", "Martsa", "Aprily", "Mey", "Jona", "Jolay", "Aogositra", "Septambra", "Oktobra", "Novambra", "Desambra", ""],["Janoary", "Febroary", "Martsa", "Aprily", "Mey", "Jona", "Jolay", "Aogositra", "Septambra", "Oktobra", "Novambra", "Desambra", ""],["Jan", "Feb", "Mar", "Apr", "Mey", "Jon", "Jol", "Aog", "Sep", "Okt", "Nov", "Des", ""],["Jan", "Feb", "Mar", "Apr", "Mey", "Jon", "Jol", "Aog", "Sep", "Okt", "Nov", "Des", ""],["Alahady", "Alatsinainy", "Talata", "Alarobia", "Alakamisy", "Zoma", "Asabotsy"],["Alah", "Alats", "Tal", "Alar", "Alak", "Zom", "Asab"],["Alah", "Alats", "Tal", "Alar", "Alak", "Zom", "Asab"],"AM","PM");
						break;
					case "mi":
						c = new DateTimeFormatInfo("dddd, dd MMMM, yyyy h:mm:ss tt","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","MMMM, yy","d MMMM","dddd, dd MMMM, yyyy","dd/MM/yyyy","h:mm:ss tt","h:mm tt","/",":",["Kohitātea", "Huitanguru", "Poutūterangi", "Paengawhāwhā", "Haratua", "Pipiri", "Hōngongoi", "Hereturikōkā", "Mahuru", "Whiringa ā-nuku", "Whiringa ā-rangi", "Hakihea", ""],["Kohitātea", "Huitanguru", "Poutūterangi", "Paengawhāwhā", "Haratua", "Pipiri", "Hōngongoi", "Hereturikōkā", "Mahuru", "Whiringa ā-nuku", "Whiringa ā-rangi", "Hakihea", ""],["Kohi", "Hui", "Pou", "Pae", "Hara", "Pipi", "Hōngo", "Here", "Mahu", "Nuku", "Rangi", "Haki", ""],["Kohi", "Hui", "Pou", "Pae", "Hara", "Pipi", "Hōngo", "Here", "Mahu", "Nuku", "Rangi", "Haki", ""],["Rātapu", "Rāhina", "Rātū", "Rāapa", "Rāpare", "Rāmere", "Rāhoroi"],["Ta", "Hi", "Tū", "Apa", "Pa", "Me", "Ho"],["Ta", "Hi", "Tū", "Aa", "Pa", "Me", "Ho"],"a.m.","p.m.");
						break;
					case "mk":
						c = new DateTimeFormatInfo("dddd, dd MMMM yyyy HH:mm:ss","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","MMMM yyyy 'г'.","d MMMM","dddd, dd MMMM yyyy","dd.M.yyyy","HH:mm:ss","HH:mm",".",":",["јануари", "февруари", "март", "април", "мај", "јуни", "јули", "август", "септември", "октомври", "ноември", "декември", ""],["јануари", "февруари", "март", "април", "мај", "јуни", "јули", "август", "септември", "октомври", "ноември", "декември", ""],["јан.", "фев.", "мар.", "апр.", "мај", "јун.", "јул.", "авг.", "септ.", "окт.", "ноем.", "дек.", ""],["јан.", "фев.", "мар.", "апр.", "мај", "јун.", "јул.", "авг.", "септ.", "окт.", "ноем.", "дек.", ""],["недела", "понеделник", "вторник", "среда", "четврток", "петок", "сабота"],["нед.", "пон.", "вт.", "сре.", "чет.", "пет.", "саб."],["не", "по", "вт", "ср", "че", "пе", "са"],"претпл.","попл.");
						break;
					case "ml":
						c = new DateTimeFormatInfo("yyyy, MMMM d, dddd h:mm:ss tt","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","yyyy MMMM","MMMM d","yyyy, MMMM d, dddd","d/M/yyyy","h:mm:ss tt","h:mm tt","/",":",["ജനുവരി", "ഫെബ്രുവരി", "മാർച്ച്", "ഏപ്രിൽ", "മേയ്", "ജൂൺ", "ജൂലൈ", "ഓഗസ്റ്റ്", "സെപ്റ്റംബർ", "ഒക്‌ടോബർ", "നവംബർ", "ഡിസംബർ", ""],["ജനുവരി", "ഫെബ്രുവരി", "മാർച്ച്", "ഏപ്രിൽ", "മേയ്", "ജൂൺ", "ജൂലൈ", "ഓഗസ്റ്റ്", "സെപ്റ്റംബർ", "ഒക്‌ടോബർ", "നവംബർ", "ഡിസംബർ", ""],["ജനു", "ഫെബ്രു", "മാർ", "ഏപ്രി", "മേയ്", "ജൂൺ", "ജൂലൈ", "ഓഗ", "സെപ്റ്റം", "ഒക്ടോ", "നവം", "ഡിസം", ""],["ജനു", "ഫെബ്രു", "മാർ", "ഏപ്രി", "മേയ്", "ജൂൺ", "ജൂലൈ", "ഓഗ", "സെപ്റ്റം", "ഒക്ടോ", "നവം", "ഡിസം", ""],["ഞായറാഴ്‌ച", "തിങ്കളാഴ്‌ച", "ചൊവ്വാഴ്ച", "ബുധനാഴ്‌ച", "വ്യാഴാഴ്‌ച", "വെള്ളിയാഴ്‌ച", "ശനിയാഴ്‌ച"],["ഞായർ", "തിങ്കൾ", "ചൊവ്വ", "ബുധൻ", "വ്യാഴം", "വെള്ളി", "ശനി"],["ഞാ", "തി", "ചൊ", "ബു", "വ്യാ", "വെ", "ശ"],"AM","PM");
						break;
					case "mn":
						c = new DateTimeFormatInfo("dddd, yyyy 'оны' MM 'сарын' d HH:mm:ss","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","yyyy MMMM","MMMM d","dddd, yyyy 'оны' MM 'сарын' d","yyyy-MM-dd","HH:mm:ss","HH:mm","-",":",["Нэгдүгээр сар", "Хоёрдугаар сар", "Гуравдугаар сар", "Дөрөвдүгээр сар", "Тавдугаар сар", "Зургадугаар сар", "Долдугаар сар", "Наймдугаар сар", "Есдүгээр сар", "Аравдугаар сар", "Арван нэгдүгээр сар", "Арван хоёрдугаар сар", ""],["Нэгдүгээр сар", "Хоёрдугаар сар", "Гуравдугаар сар", "Дөрөвдүгээр сар", "Тавдугаар сар", "Зургадугаар сар", "Долдугаар сар", "Наймдугаар сар", "Есдүгээр сар", "Аравдугаар сар", "Арван нэгдүгээр сар", "Арван хоёрдугаар сар", ""],["1-р сар", "2-р сар", "3-р сар", "4-р сар", "5-р сар", "6-р сар", "7-р сар", "8-р сар", "9-р сар", "10-р сар", "11-р сар", "12-р сар", ""],["1-р сар", "2-р сар", "3-р сар", "4-р сар", "5-р сар", "6-р сар", "7-р сар", "8-р сар", "9-р сар", "10-р сар", "11-р сар", "12-р сар", ""],["ням", "даваа", "мягмар", "лхагва", "пүрэв", "баасан", "бямба"],["Ня", "Да", "Мя", "Лх", "Пү", "Ба", "Бя"],["Ня", "Да", "Мя", "Лх", "Пү", "Ба", "Бя"],"ҮӨ","ҮХ");
						break;
					case "mr":
						c = new DateTimeFormatInfo("dd MMMM yyyy HH:mm:ss","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","MMMM, yyyy","dd MMMM","dd MMMM yyyy","dd-MM-yyyy","HH:mm:ss","HH:mm","-",":",["जानेवारी", "फेब्रुवारी", "मार्च", "एप्रिल", "मे", "जून", "जुलै", "ऑगस्ट", "सप्टेंबर", "ऑक्टोबर", "नोव्हेंबर", "डिसेंबर", ""],["जानेवारी", "फेब्रुवारी", "मार्च", "एप्रिल", "मे", "जून", "जुलै", "ऑगस्ट", "सप्टेंबर", "ऑक्टोबर", "नोव्हेंबर", "डिसेंबर", ""],["जाने.", "फेब्रु.", "मार्च", "एप्रि", "मे", "जून", "जुलै", "ऑग.", "सप्टें.", "ऑक्टो.", "नोव्हें.", "डिसें.", ""],["जाने.", "फेब्रु.", "मार्च", "एप्रि", "मे", "जून", "जुलै", "ऑग.", "सप्टें.", "ऑक्टो.", "नोव्हें.", "डिसें.", ""],["रविवार", "सोमवार", "मंगळवार", "बुधवार", "गुरुवार", "शुक्रवार", "शनिवार"],["रवि.", "सोम.", "मंगळ.", "बुध.", "गुरु.", "शुक्र.", "शनि."],["र", "सो", "मं", "बु", "गु", "शु", "श"],"म.पू.","म.नं.");
						break;
					case "ms":
						c = new DateTimeFormatInfo("dddd, d MMMM yyyy h:mm:ss tt","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","yyyy MMMM","d MMMM","dddd, d MMMM yyyy","d/MM/yyyy","h:mm:ss tt","h:mm tt","/",":",["Januari", "Februari", "Mac", "April", "Mei", "Jun", "Julai", "Ogos", "September", "Oktober", "November", "Disember", ""],["Januari", "Februari", "Mac", "April", "Mei", "Jun", "Julai", "Ogos", "September", "Oktober", "November", "Disember", ""],["Jan", "Feb", "Mac", "Apr", "Mei", "Jun", "Jul", "Ogo", "Sep", "Okt", "Nov", "Dis", ""],["Jan", "Feb", "Mac", "Apr", "Mei", "Jun", "Jul", "Ogo", "Sep", "Okt", "Nov", "Dis", ""],["Ahad", "Isnin", "Selasa", "Rabu", "Khamis", "Jumaat", "Sabtu"],["Ahd", "Isn", "Sel", "Rab", "Kha", "Jum", "Sab"],["Ah", "Is", "Se", "Ra", "Kh", "Ju", "Sa"],"PG","PTG");
						break;
					case "mt":
						c = new DateTimeFormatInfo("dddd, d 'ta'’ MMMM yyyy HH:mm:ss","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","MMMM yyyy","d 'ta'’ MMMM","dddd, d 'ta'’ MMMM yyyy","dd/MM/yyyy","HH:mm:ss","HH:mm","/",":",["Jannar", "Frar", "Marzu", "April", "Mejju", "Ġunju", "Lulju", "Awwissu", "Settembru", "Ottubru", "Novembru", "Diċembru", ""],["Jannar", "Frar", "Marzu", "April", "Mejju", "Ġunju", "Lulju", "Awwissu", "Settembru", "Ottubru", "Novembru", "Diċembru", ""],["Jan", "Fra", "Mar", "Apr", "Mej", "Ġun", "Lul", "Aww", "Set", "Ott", "Nov", "Diċ", ""],["Jan", "Fra", "Mar", "Apr", "Mej", "Ġun", "Lul", "Aww", "Set", "Ott", "Nov", "Diċ", ""],["Il-Ħadd", "It-Tnejn", "It-Tlieta", "L-Erbgħa", "Il-Ħamis", "Il-Ġimgħa", "Is-Sibt"],["Ħad", "Tne", "Tli", "Erb", "Ħam", "Ġim", "Sib"],["Ħad", "Tne", "Tli", "Erb", "Ħam", "Ġim", "Sib"],"AM","PM");
						break;
					case "my":
						c = new DateTimeFormatInfo("dddd d MMMM yyyy HH:mm:ss","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","MMMM yyyy","MMMM d","dddd d MMMM yyyy","dd-MM-yyyy","HH:mm:ss","HH:mm","-",":",["ဇန်နဝါရီ", "ဖေဖော်ဝါရီ", "မတ်", "ဧပြီ", "မေ", "ဇွန်", "ဇူလိုင်", "ဩဂုတ်", "စက်တင်ဘာ", "အောက်တိုဘာ", "နိုဝင်ဘာ", "ဒီဇင်ဘာ", ""],["ဇန်နဝါရီ", "ဖေဖော်ဝါရီ", "မတ်", "ဧပြီ", "မေ", "ဇွန်", "ဇူလိုင်", "ဩဂုတ်", "စက်တင်ဘာ", "အောက်တိုဘာ", "နိုဝင်ဘာ", "ဒီဇင်ဘာ", ""],["ဇန်", "ဖေ", "မတ်", "ဧ", "မေ", "ဇွန်", "ဇူ", "ဩ", "စက်", "အောက်", "နို", "ဒီ", ""],["ဇန်", "ဖေ", "မတ်", "ဧ", "မေ", "ဇွန်", "ဇူ", "ဩ", "စက်", "အောက်", "နို", "ဒီ", ""],["တနင်္ဂနွေ", "တနင်္လာ", "အင်္ဂါ", "ဗုဒ္ဓဟူး", "ကြာသပတေး", "သောကြာ", "စနေ"],["တနင်္ဂနွေ", "တနင်္လာ", "အင်္ဂါ", "ဗုဒ္ဓဟူး", "ကြာသပတေး", "သောကြာ", "စနေ"],["တနင်္ဂနွေ", "တနင်္လာ", "အင်္ဂါ", "ဗုဒ္ဓဟူး", "ကြာသပတေး", "သောကြာ", "စနေ"],"နံနက်","ညနေ");
						break;
					case "nb":
					case "no":
						c = new DateTimeFormatInfo("dddd d. MMMM yyyy HH:mm:ss","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","MMMM yyyy","d. MMMM","dddd d. MMMM yyyy","dd.MM.yyyy","HH:mm:ss","HH:mm",".",":",["januar", "februar", "mars", "april", "mai", "juni", "juli", "august", "september", "oktober", "november", "desember", ""],["januar", "februar", "mars", "april", "mai", "juni", "juli", "august", "september", "oktober", "november", "desember", ""],["jan", "feb", "mar", "apr", "mai", "jun", "jul", "aug", "sep", "okt", "nov", "des", ""],["jan.", "feb.", "mar.", "apr.", "mai", "jun.", "jul.", "aug.", "sep.", "okt.", "nov.", "des.", ""],["søndag", "mandag", "tirsdag", "onsdag", "torsdag", "fredag", "lørdag"],["søn.", "man.", "tir.", "ons.", "tor.", "fre.", "lør."],["sø.", "ma.", "ti.", "on.", "to.", "fr.", "lø."],"a.m.","p.m.");
						break;
					case "nd":
						c = new DateTimeFormatInfo("dddd, d MMMM yyyy HH:mm:ss","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","MMMM yyyy","MMMM d","dddd, d MMMM yyyy","dd/MM/yyyy","HH:mm:ss","HH:mm","/",":",["Zibandlela", "Nhlolanja", "Mbimbitho", "Mabasa", "Nkwenkwezi", "Nhlangula", "Ntulikazi", "Ncwabakazi", "Mpandula", "Mfumfu", "Lwezi", "Mpalakazi", ""],["Zibandlela", "Nhlolanja", "Mbimbitho", "Mabasa", "Nkwenkwezi", "Nhlangula", "Ntulikazi", "Ncwabakazi", "Mpandula", "Mfumfu", "Lwezi", "Mpalakazi", ""],["Zib", "Nhlo", "Mbi", "Mab", "Nkw", "Nhla", "Ntu", "Ncw", "Mpan", "Mfu", "Lwe", "Mpal", ""],["Zib", "Nhlo", "Mbi", "Mab", "Nkw", "Nhla", "Ntu", "Ncw", "Mpan", "Mfu", "Lwe", "Mpal", ""],["Sonto", "Mvulo", "Sibili", "Sithathu", "Sine", "Sihlanu", "Mgqibelo"],["Son", "Mvu", "Sib", "Sit", "Sin", "Sih", "Mgq"],["Son", "Mvu", "Sib", "Sit", "Sin", "Sih", "Mgq"],"AM","PM");
						break;
					case "ne":
						c = new DateTimeFormatInfo("dddd, MMMM dd, yyyy h:mm:ss tt","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","MMMM,yyyy","dd MMMM","dddd, MMMM dd, yyyy","M/d/yyyy","h:mm:ss tt","h:mm tt","/",":",["जनवरी", "फेब्रुअरी", "मार्च", "अप्रिल", "मे", "जून", "जुलाई", "अगस्त", "सेप्टेम्बर", "अक्टोबर", "नोभेम्बर", "डिसेम्बर", ""],["जनवरी", "फेब्रुअरी", "मार्च", "अप्रिल", "मे", "जून", "जुलाई", "अगस्त", "सेप्टेम्बर", "अक्टोबर", "नोभेम्बर", "डिसेम्बर", ""],["जन", "फेब", "मार्च", "अप्रिल", "मे", "जून", "जुलाई", "अग", "सेप्ट", "अक्ट", "नोभ", "डिस", ""],["जन", "फेब", "मार्च", "अप्रिल", "मे", "जून", "जुलाई", "अग", "सेप्ट", "अक्ट", "नोभ", "डिस", ""],["आइतवार", "सोमवार", "मङ्गलवार", "बुधवार", "बिहीवार", "शुक्रवार", "शनिवार"],["आइत", "सोम", "मङ्गल", "बुध", "बिही", "शुक्र", "शनि"],["आ", "सो", "म", "बु", "बि", "शु", "श"],"पूर्वाह्न","अपराह्न");
						break;
					case "nl":
						c = new DateTimeFormatInfo("dddd d MMMM yyyy HH:mm:ss","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","MMMM yyyy","d MMMM","dddd d MMMM yyyy","d-M-yyyy","HH:mm:ss","HH:mm","-",":",["januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december", ""],["januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december", ""],["jan", "feb", "mrt", "apr", "mei", "jun", "jul", "aug", "sep", "okt", "nov", "dec", ""],["jan", "feb", "mrt", "apr", "mei", "jun", "jul", "aug", "sep", "okt", "nov", "dec", ""],["zondag", "maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag"],["zo", "ma", "di", "wo", "do", "vr", "za"],["zo", "ma", "di", "wo", "do", "vr", "za"],"","");
						break;
					case "nn":
						c = new DateTimeFormatInfo("dddd d. MMMM yyyy HH:mm:ss","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","MMMM yyyy","d. MMMM","dddd d. MMMM yyyy","dd.MM.yyyy","HH:mm:ss","HH:mm",".",":",["januar", "februar", "mars", "april", "mai", "juni", "juli", "august", "september", "oktober", "november", "desember", ""],["januar", "februar", "mars", "april", "mai", "juni", "juli", "august", "september", "oktober", "november", "desember", ""],["jan", "feb", "mar", "apr", "mai", "jun", "jul", "aug", "sep", "okt", "nov", "des", ""],["jan.", "feb.", "mars", "apr.", "mai", "juni", "juli", "aug.", "sep.", "okt.", "nov.", "des.", ""],["søndag", "måndag", "tysdag", "onsdag", "torsdag", "fredag", "laurdag"],["sø.", "må.", "ty.", "on.", "to.", "fr.", "la."],["sø.", "må.", "ty.", "on.", "to.", "fr.", "la."],"f.m.","e.m.");
						break;
					case "nr":
						c = new DateTimeFormatInfo("yyyy MMMM d, dddd HH:mm:ss","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","yyyy MMMM","MMMM d","yyyy MMMM d, dddd","yyyy-MM-dd","HH:mm:ss","HH:mm","-",":",["Janabari", "uFeberbari", "uMatjhi", "u-Apreli", "Meyi", "Juni", "Julayi", "Arhostosi", "Septemba", "Oktoba", "Usinyikhaba", "Disemba", ""],["Janabari", "uFeberbari", "uMatjhi", "u-Apreli", "Meyi", "Juni", "Julayi", "Arhostosi", "Septemba", "Oktoba", "Usinyikhaba", "Disemba", ""],["Jan", "Feb", "Mat", "Apr", "Mey", "Jun", "Jul", "Arh", "Sep", "Okt", "Usi", "Dis", ""],["Jan", "Feb", "Mat", "Apr", "Mey", "Jun", "Jul", "Arh", "Sep", "Okt", "Usi", "Dis", ""],["uSonto", "uMvulo", "uLesibili", "Lesithathu", "uLesine", "ngoLesihlanu", "umGqibelo"],["Son", "Mvu", "Bil", "Tha", "Ne", "Hla", "Gqi"],["Son", "Mvu", "Bil", "Tha", "Ne", "Hla", "Gqi"],"AM","PM");
						break;
					case "oc":
						c = new DateTimeFormatInfo("dddd d MMMM' de 'yyyy HH.mm.ss","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","MMMM' de 'yyyy","d MMMM","dddd d MMMM' de 'yyyy","dd/MM/yyyy","HH.mm.ss","HH' h 'mm","/",".",["genièr", "febrièr", "març", "abril", "mai", "junh", "julhet", "agost", "setembre", "octobre", "novembre", "decembre", ""],["de genièr", "de febrièr", "de març", "d'abril", "de mai", "de junh", "de julhet", "d'agost", "de setembre", "d'octobre", "de novembre", "de decembre", ""],["gen.", "feb.", "març", "abr.", "mai", "junh", "julh", "ag.", "set.", "oct.", "nov.", "dec.", ""],["gen.", "feb.", "març", "abr.", "mai", "junh", "julh", "ag.", "set.", "oct.", "nov.", "dec.", ""],["dimenge", "diluns", "dimarts", "dimècres", "dijòus", "divendres", "dissabte"],["dg.", "dl.", "dma.", "dmc.", "dj.", "dv.", "ds."],["dg", "dl", "da", "dc", "dj", "dv", "ds"],"AM","PM");
						break;
					case "om":
						c = new DateTimeFormatInfo("dddd, MMMM d, yyyy h:mm:ss tt","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","MMMM yyyy","MMMM d","dddd, MMMM d, yyyy","dd/MM/yyyy","h:mm:ss tt","h:mm tt","/",":",["Amajjii", "Guraandhala", "Bitooteessa", "Elba", "Caamsa", "Waxabajjii", "Adooleessa", "Hagayya", "Fuulbana", "Onkololeessa", "Sadaasa", "Muddee", ""],["Amajjii", "Guraandhala", "Bitooteessa", "Elba", "Caamsa", "Waxabajjii", "Adooleessa", "Hagayya", "Fuulbana", "Onkololeessa", "Sadaasa", "Muddee", ""],["Ama", "Gur", "Bit", "Elb", "Cam", "Wax", "Ado", "Hag", "Ful", "Onk", "Sad", "Mud", ""],["Ama", "Gur", "Bit", "Elb", "Cam", "Wax", "Ado", "Hag", "Ful", "Onk", "Sad", "Mud", ""],["Dilbata", "Wiixata", "Qibxata", "Roobii", "Kamiisa", "Jimaata", "Sanbata"],["Dil", "Wix", "Qib", "Rob", "Kam", "Jim", "San"],["Dil", "Wix", "Qib", "Rob", "Kam", "Jim", "San"],"WD","WB");
						break;
					case "or":
						c = new DateTimeFormatInfo("dd MMMM yyyy HH:mm:ss","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","MMMM, yyyy","dd MMMM","dd MMMM yyyy","dd-MM-yy","HH:mm:ss","HH:mm","-",":",["ଜାନୁୟାରୀ", "ଫେବୃଆରୀ", "ମାର୍ଚ୍ଚ", "ଏପ୍ରିଲ୍‌", "ମେ", "ଜୁନ୍‌", "ଜୁଲାଇ", "ଅଗଷ୍ଟ", "ସେପ୍ଟେମ୍ବର", "ଅକ୍ଟୋବର", "ନଭେମ୍ବର", "ଡିସେମ୍ବର", ""],["ଜାନୁୟାରୀ", "ଫେବୃଆରୀ", "ମାର୍ଚ୍ଚ", "ଏପ୍ରିଲ୍‌", "ମେ", "ଜୁନ୍‌", "ଜୁଲାଇ", "ଅଗଷ୍ଟ", "ସେପ୍ଟେମ୍ବର", "ଅକ୍ଟୋବର", "ନଭେମ୍ବର", "ଡିସେମ୍ବର", ""],["ଜାନୁୟାରୀ", "ଫେବୃଆରୀ", "ମାର୍ଚ୍ଚ", "ଏପ୍ରିଲ୍‌", "ମେ", "ଜୁନ୍‌", "ଜୁଲାଇ", "ଅଗଷ୍ଟ", "ସେପ୍ଟେମ୍ବର", "ଅକ୍ଟୋବର", "ନଭେମ୍ବର", "ଡିସେମ୍ବର", ""],["ଜାନୁୟାରୀ", "ଫେବୃଆରୀ", "ମାର୍ଚ୍ଚ", "ଏପ୍ରିଲ୍‌", "ମେ", "ଜୁନ୍‌", "ଜୁଲାଇ", "ଅଗଷ୍ଟ", "ସେପ୍ଟେମ୍ବର", "ଅକ୍ଟୋବର", "ନଭେମ୍ବର", "ଡିସେମ୍ବର", ""],["ରବିବାର", "ସୋମବାର", "ମଙ୍ଗଳବାର", "ବୁଧବାର", "ଗୁରୁବାର", "ଶୁକ୍ରବାର", "ଶନିବାର"],["ରବି.", "ସୋମ.", "ମଙ୍ଗଳ.", "ବୁଧ.", "ଗୁରୁ.", "ଶୁକ୍ର.", "ଶନି."],["ର", "ସୋ", "ମ", "ବୁ", "ଗୁ", "ଶୁ", "ଶ"],"AM","PM");
						break;
					case "os":
						c = new DateTimeFormatInfo("dddd, d MMMM, yyyy 'аз' HH:mm:ss","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","yyyy MMMM","MMMM d","dddd, d MMMM, yyyy 'аз'","dd.MM.yyyy","HH:mm:ss","HH:mm",".",":",["Январь", "Февраль", "Мартъи", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь", ""],["январы", "февралы", "мартъийы", "апрелы", "майы", "июны", "июлы", "августы", "сентябры", "октябры", "ноябры", "декабры", ""],["Янв.", "Февр.", "Март.", "Апр.", "Май", "Июнь", "Июль", "Авг.", "Сент.", "Окт.", "Нояб.", "Дек.", ""],["янв.", "фев.", "мар.", "апр.", "майы", "июны", "июлы", "авг.", "сен.", "окт.", "ноя.", "дек.", ""],["хуыцаубон", "къуырисӕр", "дыццӕг", "ӕртыццӕг", "цыппӕрӕм", "майрӕмбон", "сабат"],["хцб", "крс", "дцг", "ӕрт", "цпр", "мрб", "сбт"],["хцб", "крс", "дцг", "ӕрт", "цпр", "мрб", "сбт"],"AM","PM");
						break;
					case "pa":
						c = new DateTimeFormatInfo("dd MMMM yyyy dddd tt hh:mm:ss","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","MMMM, yyyy","dd MMMM","dd MMMM yyyy dddd","dd-MM-yy","tt hh:mm:ss","tt hh:mm","-",":",["ਜਨਵਰੀ", "ਫ਼ਰਵਰੀ", "ਮਾਰਚ", "ਅਪ੍ਰੈਲ", "ਮਈ", "ਜੂਨ", "ਜੁਲਾਈ", "ਅਗਸਤ", "ਸਤੰਬਰ", "ਅਕਤੂਬਰ", "ਨਵੰਬਰ", "ਦਸੰਬਰ", ""],["ਜਨਵਰੀ", "ਫ਼ਰਵਰੀ", "ਮਾਰਚ", "ਅਪ੍ਰੈਲ", "ਮਈ", "ਜੂਨ", "ਜੁਲਾਈ", "ਅਗਸਤ", "ਸਤੰਬਰ", "ਅਕਤੂਬਰ", "ਨਵੰਬਰ", "ਦਸੰਬਰ", ""],["ਜਨਵਰੀ", "ਫ਼ਰਵਰੀ", "ਮਾਰਚ", "ਅਪ੍ਰੈਲ", "ਮਈ", "ਜੂਨ", "ਜੁਲਾਈ", "ਅਗਸਤ", "ਸਤੰਬਰ", "ਅਕਤੂਬਰ", "ਨਵੰਬਰ", "ਦਸੰਬਰ", ""],["ਜਨਵਰੀ", "ਫ਼ਰਵਰੀ", "ਮਾਰਚ", "ਅਪ੍ਰੈਲ", "ਮਈ", "ਜੂਨ", "ਜੁਲਾਈ", "ਅਗਸਤ", "ਸਤੰਬਰ", "ਅਕਤੂਬਰ", "ਨਵੰਬਰ", "ਦਸੰਬਰ", ""],["ਐਤਵਾਰ", "ਸੋਮਵਾਰ", "ਮੰਗਲਵਾਰ", "ਬੁੱਧਵਾਰ", "ਵੀਰਵਾਰ", "ਸ਼ੁੱਕਰਵਾਰ", "ਸ਼ਨਿੱਚਰਵਾਰ"],["ਐਤ.", "ਸੋਮ.", "ਮੰਗਲ.", "ਬੁੱਧ.", "ਵੀਰ.", "ਸ਼ੁਕਰ.", "ਸ਼ਨਿੱਚਰ."],["ਐ", "ਸ", "ਮ", "ਬ", "ਵ", "ਸ਼ੁ", "ਸ਼"],"ਸਵੇਰ","ਸ਼ਾਮ");
						break;
					case "pl":
						c = new DateTimeFormatInfo("dddd, d MMMM yyyy HH:mm:ss","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","MMMM yyyy","d MMMM","dddd, d MMMM yyyy","dd.MM.yyyy","HH:mm:ss","HH:mm",".",":",["styczeń", "luty", "marzec", "kwiecień", "maj", "czerwiec", "lipiec", "sierpień", "wrzesień", "październik", "listopad", "grudzień", ""],["stycznia", "lutego", "marca", "kwietnia", "maja", "czerwca", "lipca", "sierpnia", "września", "października", "listopada", "grudnia", ""],["sty", "lut", "mar", "kwi", "maj", "cze", "lip", "sie", "wrz", "paź", "lis", "gru", ""],["sty", "lut", "mar", "kwi", "maj", "cze", "lip", "sie", "wrz", "paź", "lis", "gru", ""],["niedziela", "poniedziałek", "wtorek", "środa", "czwartek", "piątek", "sobota"],["niedz.", "pon.", "wt.", "śr.", "czw.", "pt.", "sob."],["nie", "pon", "wto", "śro", "czw", "pią", "sob"],"AM","PM");
						break;
					case "ps":
						c = new DateTimeFormatInfo("d MMMM yyyy H:mm:ss","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","MMMM yyyy","d MMMM","d MMMM yyyy","yyyy/M/d","H:mm:ss","H:mm","/",":",["وری", "غويی", "غبرګولی", "چنګاښ", "زمری", "وږی", "تله", "لړم", "ليندۍ", "مرغومی", "سلواغه", "كب", ""],["وری", "غويی", "غبرګولی", "چنګاښ", "زمری", "وږی", "تله", "لړم", "ليندۍ", "مرغومی", "سلواغه", "كب", ""],["وری", "غويی", "غبرګولی", "چنګاښ", "زمری", "وږی", "تله", "لړم", "ليندۍ", "مرغومی", "سلواغه", "كب", ""],["وری", "غويی", "غبرګولی", "چنګاښ", "زمری", "وږی", "تله", "لړم", "ليندۍ", "مرغومی", "سلواغه", "كب", ""],["یکشنبه", "دوشنبه", "سه‌شنبه", "چارشنبه", "پنجشنبه", "جمعه", "شنبه"],["یکشنبه", "دوشنبه", "سه‌شنبه", "چارشنبه", "پنجشنبه", "جمعه", "شنبه"],["ی", "د", "س", "چ", "پ", "ج", "ش"],"غ.م.","غ.و.");
						break;
					case "pt":
						c = new DateTimeFormatInfo("dddd, d' de 'MMMM' de 'yyyy HH:mm:ss","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","MMMM' de 'yyyy","d 'de' MMMM","dddd, d' de 'MMMM' de 'yyyy","dd/MM/yyyy","HH:mm:ss","HH:mm","/",":",["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro", ""],["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro", ""],["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez", ""],["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez", ""],["domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado"],["dom", "seg", "ter", "qua", "qui", "sex", "sáb"],["D", "S", "T", "Q", "Q", "S", "S"],"","");
						break;
					case "rm":
						c = new DateTimeFormatInfo("dddd, 'ils' d 'da' MMMM yyyy HH:mm:ss","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","yyyy MMMM","d. MMMM","dddd, 'ils' d 'da' MMMM yyyy","dd-MM-yyyy","HH:mm:ss","HH:mm","-",":",["schaner", "favrer", "mars", "avrigl", "matg", "zercladur", "fanadur", "avust", "settember", "october", "november", "december", ""],["schaner", "favrer", "mars", "avrigl", "matg", "zercladur", "fanadur", "avust", "settember", "october", "november", "december", ""],["schan.", "favr.", "mars", "avr.", "matg", "zercl.", "fan.", "avust", "sett.", "oct.", "nov.", "dec.", ""],["schan.", "favr.", "mars", "avr.", "matg", "zercl.", "fan.", "avust", "sett.", "oct.", "nov.", "dec.", ""],["dumengia", "glindesdi", "mardi", "mesemna", "gievgia", "venderdi", "sonda"],["du", "gli", "ma", "me", "gie", "ve", "so"],["du", "gli", "ma", "me", "gie", "ve", "so"],"AM","PM");
						break;
					case "rn":
						c = new DateTimeFormatInfo("dddd d MMMM yyyy HH:mm:ss","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","yyyy MMMM","MMMM d","dddd d MMMM yyyy","d/M/yyyy","HH:mm:ss","HH:mm","/",":",["Nzero", "Ruhuhuma", "Ntwarante", "Ndamukiza", "Rusama", "Ruheshi", "Mukakaro", "Nyandagaro", "Nyakanga", "Gitugutu", "Munyonyo", "Kigarama", ""],["Nzero", "Ruhuhuma", "Ntwarante", "Ndamukiza", "Rusama", "Ruheshi", "Mukakaro", "Nyandagaro", "Nyakanga", "Gitugutu", "Munyonyo", "Kigarama", ""],["Mut.", "Gas.", "Wer.", "Mat.", "Gic.", "Kam.", "Nya.", "Kan.", "Nze.", "Ukw.", "Ugu.", "Uku.", ""],["Mut.", "Gas.", "Wer.", "Mat.", "Gic.", "Kam.", "Nya.", "Kan.", "Nze.", "Ukw.", "Ugu.", "Uku.", ""],["Ku w’indwi", "Ku wa mbere", "Ku wa kabiri", "Ku wa gatatu", "Ku wa kane", "Ku wa gatanu", "Ku wa gatandatu"],["cu.", "mbe.", "kab.", "gtu.", "kan.", "gnu.", "gnd."],["cu.", "mbe.", "kab.", "gtu.", "kan.", "gnu.", "gnd."],"Z.MU.","Z.MW.");
						break;
					case "ro":
						c = new DateTimeFormatInfo("dddd, d MMMM yyyy HH:mm:ss","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","MMMM yyyy","d MMMM","dddd, d MMMM yyyy","dd.MM.yyyy","HH:mm:ss","HH:mm",".",":",["ianuarie", "februarie", "martie", "aprilie", "mai", "iunie", "iulie", "august", "septembrie", "octombrie", "noiembrie", "decembrie", ""],["ianuarie", "februarie", "martie", "aprilie", "mai", "iunie", "iulie", "august", "septembrie", "octombrie", "noiembrie", "decembrie", ""],["ian.", "feb.", "mar.", "apr.", "mai", "iun.", "iul.", "aug.", "sept.", "oct.", "nov.", "dec.", ""],["ian.", "feb.", "mar.", "apr.", "mai", "iun.", "iul.", "aug.", "sept.", "oct.", "nov.", "dec.", ""],["duminică", "luni", "marți", "miercuri", "joi", "vineri", "sâmbătă"],["dum.", "lun.", "mar.", "mie.", "joi", "vin.", "sâm."],["du.", "lu.", "ma.", "mi.", "joi", "vi.", "sâ."],"a.m.","p.m.");
						break;
					case "ru":
						c = new DateTimeFormatInfo("d MMMM yyyy 'г.' H:mm:ss","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","MMMM yyyy","d MMMM","d MMMM yyyy 'г.'","dd.MM.yyyy","H:mm:ss","H:mm",".",":",["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь", ""],["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря", ""],["янв", "фев", "мар", "апр", "май", "июн", "июл", "авг", "сен", "окт", "ноя", "дек", ""],["янв", "фев", "мар", "апр", "мая", "июн", "июл", "авг", "сен", "окт", "ноя", "дек", ""],["воскресенье", "понедельник", "вторник", "среда", "четверг", "пятница", "суббота"],["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],"","");
						break;
					case "rw":
						c = new DateTimeFormatInfo("yyyy MMMM d, dddd HH:mm:ss","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","yyyy MMMM","MMMM d","yyyy MMMM d, dddd","yyyy-MM-dd","HH:mm:ss","HH:mm","-",":",["Mutarama", "Gashyantare", "Werurwe", "Mata", "Gicuransi", "Kamena", "Nyakanga", "Kanama", "Nzeli", "Ukwakira", "Ugushyingo", "Ukuboza", ""],["Mutarama", "Gashyantare", "Werurwe", "Mata", "Gicuransi", "Kamena", "Nyakanga", "Kanama", "Nzeli", "Ukwakira", "Ugushyingo", "Ukuboza", ""],["mut.", "gas.", "wer.", "mat.", "gic.", "kam.", "nya.", "kan.", "nze.", "ukw.", "ugu.", "uku.", ""],["mut.", "gas.", "wer.", "mat.", "gic.", "kam.", "nya.", "kan.", "nze.", "ukw.", "ugu.", "uku.", ""],["Ku cyumweru", "Kuwa mbere", "Kuwa kabiri", "Kuwa gatatu", "Kuwa kane", "Kuwa gatanu", "Kuwa gatandatu"],["cyu.", "mbe.", "kab.", "gtu.", "kan.", "gnu.", "gnd."],["cyu.", "mbe.", "kab.", "gtu.", "kan.", "gnu.", "gnd."],"AM","PM");
						break;
					case "sa":
						c = new DateTimeFormatInfo("dd MMMM yyyy dddd HH:mm:ss","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","MMMM, yyyy","dd MMMM","dd MMMM yyyy dddd","dd-MM-yyyy","HH:mm:ss","HH:mm","-",":",["जान्युअरी", "फेब्रुअरी", "मार्च", "एप्रिल", "मे", "जून", "जुलै", "ऑगस्ट", "सप्टेंबर", "ऑक्टोबर", "नोव्हेंबर", "डिसेंबर", ""],["जान्युअरी", "फेब्रुअरी", "मार्च", "एप्रिल", "मे", "जून", "जुलै", "ऑगस्ट", "सप्टेंबर", "ऑक्टोबर", "नोव्हेंबर", "डिसेंबर", ""],["जान्युअरी", "फेब्रुअरी", "मार्च", "एप्रिल", "मे", "जुन", "जुलै", "ऑगस्ट", "सप्टेंबर", "ऑक्टोबर", "नोव्हेंबर", "डिसेंबर", ""],["जान्युअरी", "फेब्रुअरी", "मार्च", "एप्रिल", "मे", "जुन", "जुलै", "ऑगस्ट", "सप्टेंबर", "ऑक्टोबर", "नोव्हेंबर", "डिसेंबर", ""],["रविवासरः", "सोमवासरः", "मङ्गलवासरः", "बुधवासरः", "गुरुवासरः", "शुक्रवासरः", "शनिवासरः"],["रवि", "सोम", "मङ्ग", "बुध", "गुरु", "शुक्र", "शनि"],["र", "सो", "म", "बु", "गु", "शु", "श"],"मध्यानपूर्व","मध्यानपच्यात");
						break;
					case "sd":
						c = new DateTimeFormatInfo("dddd, dd MMMM, yyyy h:mm:ss tt","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","MMMM, yyyy","dd MMMM","dddd, dd MMMM, yyyy","dd/MM/yyyy","h:mm:ss tt","h:mm tt","/",":",["جنوري", "فروري", "مارچ", "اپريل", "مٔي", "جون", "جولاءِ", "آگست", "ستمبر", "آکتوبر", "نومبر", "ڊسمبر", ""],["جنوري", "فروري", "مارچ", "اپريل", "مٔي", "جون", "جولاءِ", "آگست", "ستمبر", "آکتوبر", "نومبر", "ڊسمبر", ""],["جنوري", "فروري", "مارچ", "اپريل", "مٔي", "جون", "جولاءِ", "آگست", "ستمبر", "آکتوبر", "نومبر", "ڊسمبر", ""],["جنوري", "فروري", "مارچ", "اپريل", "مٔي", "جون", "جولاءِ", "آگست", "ستمبر", "آکتوبر", "نومبر", "ڊسمبر", ""],["سومر", "اڱارو", "اربع", "خميس", "جمعو", "ڇنڇر", "آچر"],["سو", "اڱ", "ار", "خم", "جمعو", "ڇن", "آچ"],["سو", "اڱ", "ار", "خم", "جم", "ڇن", "آچ"],"AM","PM");
						break;
					case "se":
						c = new DateTimeFormatInfo("yyyy MMMM d, dddd HH:mm:ss","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","yyyy MMMM","MMMM d","yyyy MMMM d, dddd","yyyy-MM-dd","HH:mm:ss","HH:mm","-",":",["ođđajagemánnu", "guovvamánnu", "njukčamánnu", "cuoŋománnu", "miessemánnu", "geassemánnu", "suoidnemánnu", "borgemánnu", "čakčamánnu", "golggotmánnu", "skábmamánnu", "juovlamánnu", ""],["ođđajagemánnu", "guovvamánnu", "njukčamánnu", "cuoŋománnu", "miessemánnu", "geassemánnu", "suoidnemánnu", "borgemánnu", "čakčamánnu", "golggotmánnu", "skábmamánnu", "juovlamánnu", ""],["ođđj", "guov", "njuk", "cuo", "mies", "geas", "suoi", "borg", "čakč", "golg", "skáb", "juov", ""],["ođđj", "guov", "njuk", "cuo", "mies", "geas", "suoi", "borg", "čakč", "golg", "skáb", "juov", ""],["sotnabeaivi", "vuossárga", "maŋŋebárga", "gaskavahkku", "duorasdat", "bearjadat", "lávvardat"],["sotn", "vuos", "maŋ", "gask", "duor", "bear", "láv"],["sotn", "vuos", "maŋ", "gask", "duor", "bear", "láv"],"i.b.","e.b.");
						break;
					case "sg":
						c = new DateTimeFormatInfo("dddd d MMMM yyyy HH:mm:ss","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","MMMM yyyy","d MMMM","dddd d MMMM yyyy","d/M/yyyy","HH:mm:ss","HH:mm","/",":",["Nyenye", "Fulundïgi", "Mbängü", "Ngubùe", "Bêläwü", "Föndo", "Lengua", "Kükürü", "Mvuka", "Ngberere", "Nabändüru", "Kakauka", ""],["Nyenye", "Fulundïgi", "Mbängü", "Ngubùe", "Bêläwü", "Föndo", "Lengua", "Kükürü", "Mvuka", "Ngberere", "Nabändüru", "Kakauka", ""],["Nye", "Ful", "Mbä", "Ngu", "Bêl", "Fön", "Len", "Kük", "Mvu", "Ngb", "Nab", "Kak", ""],["Nye", "Ful", "Mbä", "Ngu", "Bêl", "Fön", "Len", "Kük", "Mvu", "Ngb", "Nab", "Kak", ""],["Bikua-ôko", "Bïkua-ûse", "Bïkua-ptâ", "Bïkua-usïö", "Bïkua-okü", "Lâpôsö", "Lâyenga"],["Bk1", "Bk2", "Bk3", "Bk4", "Bk5", "Lâp", "Lây"],["Bk1", "Bk2", "Bk3", "Bk4", "Bk5", "Lâp", "Lây"],"ND","LK");
						break;
					case "si":
						c = new DateTimeFormatInfo("yyyy MMMM d, dddd HH.mm.ss","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","yyyy MMMM","MMMM d","yyyy MMMM d, dddd","yyyy-MM-dd","HH.mm.ss","HH.mm","-",".",["ජනවාරි", "පෙබරවාරි", "මාර්තු", "අප්‍රේල්", "මැයි", "ජූනි", "ජූලි", "අගෝස්තු", "සැප්තැම්බර්", "ඔක්තෝබර්", "නොවැම්බර්", "දෙසැම්බර්", ""],["ජනවාරි", "පෙබරවාරි", "මාර්තු", "අප්‍රේල්", "මැයි", "ජූනි", "ජූලි", "අගෝස්තු", "සැප්තැම්බර්", "ඔක්තෝබර්", "නොවැම්බර්", "දෙසැම්බර්", ""],["ජන", "පෙබ", "මාර්", "අප්‍රේල්", "මැයි", "ජූනි", "ජූලි", "අගෝ", "සැප්", "ඔක්", "නොවැ", "දෙසැ", ""],["ජන", "පෙබ", "මාර්තු", "අප්‍රේල්", "මැයි", "ජූනි", "ජූලි", "අගෝ", "සැප්", "ඔක්", "නොවැ", "දෙසැ", ""],["ඉරිදා", "සඳුදා", "අඟහරුවාදා", "බදාදා", "බ්‍රහස්පතින්දා", "සිකුරාදා", "සෙනසුරාදා"],["ඉරිදා", "සඳුදා", "අඟහ", "බදාදා", "බ්‍රහස්", "සිකු", "සෙන"],["ඉරි", "සඳු", "අඟ", "බදා", "බ්‍රහ", "සිකු", "සෙන"],"පෙ.ව.","ප.ව.");
						break;
					case "sk":
						c = new DateTimeFormatInfo("dddd, d. MMMM yyyy H:mm:ss","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","MMMM yyyy","d. MMMM","dddd, d. MMMM yyyy","d. M. yyyy","H:mm:ss","H:mm",". ",":",["január", "február", "marec", "apríl", "máj", "jún", "júl", "august", "september", "október", "november", "december", ""],["januára", "februára", "marca", "apríla", "mája", "júna", "júla", "augusta", "septembra", "októbra", "novembra", "decembra", ""],["jan", "feb", "mar", "apr", "máj", "jún", "júl", "aug", "sep", "okt", "nov", "dec", ""],["jan", "feb", "mar", "apr", "máj", "jún", "júl", "aug", "sep", "okt", "nov", "dec", ""],["nedeľa", "pondelok", "utorok", "streda", "štvrtok", "piatok", "sobota"],["ne", "po", "ut", "st", "št", "pi", "so"],["ne", "po", "ut", "st", "št", "pi", "so"],"AM","PM");
						break;
					case "sl":
						c = new DateTimeFormatInfo("dddd, dd. MMMM yyyy HH:mm:ss","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","MMMM yyyy","d. MMMM","dddd, dd. MMMM yyyy","d. MM. yyyy","HH:mm:ss","HH:mm",". ",":",["januar", "februar", "marec", "april", "maj", "junij", "julij", "avgust", "september", "oktober", "november", "december", ""],["januar", "februar", "marec", "april", "maj", "junij", "julij", "avgust", "september", "oktober", "november", "december", ""],["jan.", "feb.", "mar.", "apr.", "maj", "jun.", "jul.", "avg.", "sep.", "okt.", "nov.", "dec.", ""],["jan.", "feb.", "mar.", "apr.", "maj", "jun.", "jul.", "avg.", "sep.", "okt.", "nov.", "dec.", ""],["nedelja", "ponedeljek", "torek", "sreda", "četrtek", "petek", "sobota"],["ned.", "pon.", "tor.", "sre.", "čet.", "pet.", "sob."],["ned.", "pon.", "tor.", "sre.", "čet.", "pet.", "sob."],"dop.","pop.");
						break;
					case "sn":
						c = new DateTimeFormatInfo("yyyy MMMM d, dddd HH:mm:ss","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","yyyy MMMM","MMMM d","yyyy MMMM d, dddd","yyyy-MM-dd","HH:mm:ss","HH:mm","-",":",["Ndira", "Kukadzi", "Kurume", "Kubvumbi", "Chivabvu", "Chikumi", "Chikunguru", "Nyamavhuvhu", "Gunyana", "Gumiguru", "Mbudzi", "Zvita", ""],["Ndira", "Kukadzi", "Kurume", "Kubvumbi", "Chivabvu", "Chikumi", "Chikunguru", "Nyamavhuvhu", "Gunyana", "Gumiguru", "Mbudzi", "Zvita", ""],["Ndi", "Kuk", "Kur", "Kub", "Chv", "Chk", "Chg", "Nya", "Gun", "Gum", "Mbu", "Zvi", ""],["Ndi", "Kuk", "Kur", "Kub", "Chv", "Chk", "Chg", "Nya", "Gun", "Gum", "Mbu", "Zvi", ""],["Svondo", "Muvhuro", "Chipiri", "Chitatu", "China", "Chishanu", "Mugovera"],["Svo", "Muv", "Chp", "Cht", "Chn", "Chs", "Mug"],["Sv", "Mu", "Cp", "Ct", "Cn", "Cs", "Mg"],"AM","PM");
						break;
					case "so":
						c = new DateTimeFormatInfo("dddd, MMMM dd, yyyy h:mm:ss tt","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","MMMM yyyy","MMMM d","dddd, MMMM dd, yyyy","dd/MM/yyyy","h:mm:ss tt","h:mm tt","/",":",["Bisha Koobaad", "Bisha Labaad", "Bisha Saddexaad", "Bisha Afraad", "Bisha Shanaad", "Bisha Lixaad", "Bisha Todobaad", "Bisha Sideedaad", "Bisha Sagaalaad", "Bisha Tobnaad", "Bisha Kow iyo Tobnaad", "Bisha Laba iyo Tobnaad", ""],["Bisha Koobaad", "Bisha Labaad", "Bisha Saddexaad", "Bisha Afraad", "Bisha Shanaad", "Bisha Lixaad", "Bisha Todobaad", "Bisha Sideedaad", "Bisha Sagaalaad", "Bisha Tobnaad", "Bisha Kow iyo Tobnaad", "Bisha Laba iyo Tobnaad", ""],["Kob", "Lab", "Sad", "Afr", "Sha", "Lix", "Tod", "Sid", "Sag", "Tob", "KIT", "LIT", ""],["Kob", "Lab", "Sad", "Afr", "Sha", "Lix", "Tod", "Sid", "Sag", "Tob", "KIT", "LIT", ""],["Axad", "Isniin", "Talaado", "Arbaco", "Khamiis", "Jimco", "Sabti"],["Axd", "Isn", "Tal", "Arb", "Kha", "Jim", "Sab"],["Axd", "Isn", "Tal", "Arb", "Kha", "Jim", "Sab"],"sn.","gn.");
						break;
					case "sq":
						c = new DateTimeFormatInfo("dddd, d MMMM yyyy h:mm:ss tt","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","MMMM yyyy","d MMMM","dddd, d MMMM yyyy","d.M.yyyy","h:mm:ss tt","h:mm tt",".",":",["Janar", "Shkurt", "Mars", "Prill", "Maj", "Qershor", "Korrik", "Gusht", "Shtator", "Tetor", "Nëntor", "Dhjetor", ""],["janar", "shkurt", "mars", "prill", "maj", "qershor", "korrik", "gusht", "shtator", "tetor", "nëntor", "dhjetor", ""],["Jan", "Shk", "Mar", "Pri", "Maj", "Qer", "Kor", "Gsh", "Sht", "Tet", "Nën", "Dhj", ""],["jan", "shk", "mar", "pri", "maj", "qer", "kor", "gsh", "sht", "tet", "nën", "dhj", ""],["e diel", "e hënë", "e martë", "e mërkurë", "e enjte", "e premte", "e shtunë"],["Die", "Hën", "Mar", "Mër", "Enj", "Pre", "Sht"],["Die", "Hën", "Mar", "Mër", "Enj", "Pre", "Sht"],"e paradites","e pasdites");
						break;
					case "sr":
						c = new DateTimeFormatInfo("dddd, dd. MMMM yyyy. HH:mm:ss","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","MMMM yyyy.","d. MMMM","dddd, dd. MMMM yyyy.","d.M.yyyy.","HH:mm:ss","HH:mm",".",":",["januar", "februar", "mart", "april", "maj", "jun", "jul", "avgust", "septembar", "oktobar", "novembar", "decembar", ""],["januar", "februar", "mart", "april", "maj", "jun", "jul", "avgust", "septembar", "oktobar", "novembar", "decembar", ""],["jan", "feb", "mar", "apr", "maj", "jun", "jul", "avg", "sep", "okt", "nov", "dec", ""],["jan", "feb", "mar", "apr", "maj", "jun", "jul", "avg", "sep", "okt", "nov", "dec", ""],["nedelja", "ponedeljak", "utorak", "sreda", "četvrtak", "petak", "subota"],["ned", "pon", "uto", "sre", "čet", "pet", "sub"],["ne", "po", "ut", "sr", "če", "pe", "su"],"pre podne","po podne");
						break;
					case "ss":
						c = new DateTimeFormatInfo("yyyy MMMM d, dddd HH:mm:ss","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","yyyy MMMM","MMMM d","yyyy MMMM d, dddd","yyyy-MM-dd","HH:mm:ss","HH:mm","-",":",["Bhimbidvwane", "iNdlovana", "iNdlovu-lenkhulu", "Mabasa", "iNkhwekhweti", "iNhlaba", "Kholwane", "iNgci", "iNyoni", "iMphala", "Lweti", "iNgongoni", ""],["Bhimbidvwane", "iNdlovana", "iNdlovu-lenkhulu", "Mabasa", "iNkhwekhweti", "iNhlaba", "Kholwane", "iNgci", "iNyoni", "iMphala", "Lweti", "iNgongoni", ""],["Bhi", "Van", "Vol", "Mab", "Nkh", "Nhl", "Kho", "Ngc", "Nyo", "Mph", "Lwe", "Ngo", ""],["Bhi", "Van", "Vol", "Mab", "Nkh", "Nhl", "Kho", "Ngc", "Nyo", "Mph", "Lwe", "Ngo", ""],["Lisontfo", "uMsombuluko", "Lesibili", "Lesitsatfu", "Lesine", "Lesihlanu", "uMgcibelo"],["Son", "Mso", "Bil", "Tsa", "Ne", "Hla", "Mgc"],["Son", "Mso", "Bil", "Tsa", "Ne", "Hla", "Mgc"],"AM","PM");
						break;
					case "st":
						c = new DateTimeFormatInfo("yyyy MMMM d, dddd HH:mm:ss","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","yyyy MMMM","MMMM d","yyyy MMMM d, dddd","yyyy-MM-dd","HH:mm:ss","HH:mm","-",":",["Phesekgong", "Hlakola", "Hlakubele", "Mmese", "Motsheanong", "Phupjane", "Phupu", "Phata", "Leotshe", "Mphalane", "Pundungwane", "Tshitwe", ""],["Phesekgong", "Hlakola", "Hlakubele", "Mmese", "Motsheanong", "Phupjane", "Phupu", "Phata", "Leotshe", "Mphalane", "Pundungwane", "Tshitwe", ""],["Phe", "Kol", "Ube", "Mme", "Mot", "Jan", "Upu", "Pha", "Leo", "Mph", "Pun", "Tsh", ""],["Phe", "Kol", "Ube", "Mme", "Mot", "Jan", "Upu", "Pha", "Leo", "Mph", "Pun", "Tsh", ""],["Sontaha", "Mmantaha", "Labobedi", "Laboraru", "Labone", "Labohlane", "Moqebelo"],["Son", "Mma", "Bed", "Rar", "Ne", "Hla", "Moq"],["Son", "Mma", "Bed", "Rar", "Ne", "Hla", "Moq"],"AM","PM");
						break;
					case "sv":
						c = new DateTimeFormatInfo("'den 'd MMMM yyyy HH:mm:ss","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","MMMM yyyy","'den 'd MMMM","'den 'd MMMM yyyy","yyyy-MM-dd","HH:mm:ss","HH:mm","-",":",["januari", "februari", "mars", "april", "maj", "juni", "juli", "augusti", "september", "oktober", "november", "december", ""],["januari", "februari", "mars", "april", "maj", "juni", "juli", "augusti", "september", "oktober", "november", "december", ""],["jan", "feb", "mar", "apr", "maj", "jun", "jul", "aug", "sep", "okt", "nov", "dec", ""],["jan", "feb", "mar", "apr", "maj", "jun", "jul", "aug", "sep", "okt", "nov", "dec", ""],["söndag", "måndag", "tisdag", "onsdag", "torsdag", "fredag", "lördag"],["sön", "mån", "tis", "ons", "tor", "fre", "lör"],["sö", "må", "ti", "on", "to", "fr", "lö"],"","");
						break;
					case "sw":
						c = new DateTimeFormatInfo("dddd, d MMMM yyyy HH:mm:ss","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","MMMM yyyy","d MMMM","dddd, d MMMM yyyy","dd/MM/yyyy","HH:mm:ss","HH:mm","/",":",["Januari", "Februari", "Machi", "Aprili", "Mei", "Juni", "Julai", "Agosti", "Septemba", "Oktoba", "Novemba", "Desemba", ""],["Januari", "Februari", "Machi", "Aprili", "Mei", "Juni", "Julai", "Agosti", "Septemba", "Oktoba", "Novemba", "Desemba", ""],["Jan", "Feb", "Mac", "Apr", "Mei", "Jun", "Jul", "Ago", "Sep", "Okt", "Nov", "Des", ""],["Jan", "Feb", "Mac", "Apr", "Mei", "Jun", "Jul", "Ago", "Sep", "Okt", "Nov", "Des", ""],["Jumapili", "Jumatatu", "Jumanne", "Jumatano", "Alhamisi", "Ijumaa", "Jumamosi"],["Jumapili", "Jumatatu", "Jumanne", "Jumatano", "Alhamisi", "Ijumaa", "Jumamosi"],["Jumapili", "Jumatatu", "Jumanne", "Jumatano", "Alhamisi", "Ijumaa", "Jumamosi"],"AM","PM");
						break;
					case "ta":
						c = new DateTimeFormatInfo("dd MMMM yyyy HH:mm:ss","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","MMMM yyyy","d MMMM","dd MMMM yyyy","dd-MM-yyyy","HH:mm:ss","HH:mm","-",":",["ஜனவரி", "பிப்ரவரி", "மார்ச்", "ஏப்ரல்", "மே", "ஜூன்", "ஜூலை", "ஆகஸ்ட்", "செப்டம்பர்", "அக்டோபர்", "நவம்பர்", "டிசம்பர்", ""],["ஜனவரி", "பிப்ரவரி", "மார்ச்", "ஏப்ரல்", "மே", "ஜூன்", "ஜூலை", "ஆகஸ்ட்", "செப்டம்பர்", "அக்டோபர்", "நவம்பர்", "டிசம்பர்", ""],["ஜனவரி", "பிப்ரவரி", "மார்ச்", "ஏப்ரல்", "மே", "ஜூன்", "ஜூலை", "ஆகஸ்ட்", "செப்டம்பர்", "அக்டோபர்", "நவம்பர்", "டிசம்பர்", ""],["ஜனவரி", "பிப்ரவரி", "மார்ச்", "ஏப்ரல்", "மே", "ஜூன்", "ஜூலை", "ஆகஸ்ட்", "செப்டம்பர்", "அக்டோபர்", "நவம்பர்", "டிசம்பர்", ""],["ஞாயிற்றுக்கிழமை", "திங்கள்கிழமை", "செவ்வாய்க்கிழமை", "புதன்கிழமை", "வியாழக்கிழமை", "வெள்ளிக்கிழமை", "சனிக்கிழமை"],["ஞாயிறு", "திங்கள்", "செவ்வாய்", "புதன்", "வியாழன்", "வெள்ளி", "சனி"],["ஞா", "தி", "செ", "பு", "வி", "வெ", "ச"],"காலை","மாலை");
						break;
					case "te":
						c = new DateTimeFormatInfo("dd MMMM yyyy HH:mm:ss","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","MMMM, yyyy","MMMM d","dd MMMM yyyy","dd-MM-yy","HH:mm:ss","HH:mm","-",":",["జనవరి", "ఫిబ్రవరి", "మార్చి", "ఏప్రిల్", "మే", "జూన్", "జూలై", "ఆగస్టు", "సెప్టెంబర్", "అక్టోబర్", "నవంబర్", "డిసెంబర్", ""],["జనవరి", "ఫిబ్రవరి", "మార్చి", "ఏప్రిల్", "మే", "జూన్", "జూలై", "ఆగస్టు", "సెప్టెంబర్", "అక్టోబర్", "నవంబర్", "డిసెంబర్", ""],["జనవరి", "ఫిబ్రవరి", "మార్చి", "ఏప్రిల్", "మే", "జూన్", "జూలై", "ఆగస్టు", "సెప్టెంబర్", "అక్టోబర్", "నవంబర్", "డిసెంబర్", ""],["జనవరి", "ఫిబ్రవరి", "మార్చి", "ఏప్రిల్", "మే", "జూన్", "జూలై", "ఆగస్టు", "సెప్టెంబర్", "అక్టోబర్", "నవంబర్", "డిసెంబర్", ""],["ఆదివారం", "సోమవారం", "మంగళవారం", "బుధవారం", "గురువారం", "శుక్రవారం", "శనివారం"],["ఆది.", "సోమ.", "మంగళ.", "బుధ.", "గురు.", "శుక్ర.", "శని."],["ఆ", "సో", "మం", "బు", "గు", "శు", "శ"],"పూర్వాహ్న","అపరాహ్న");
						break;
					case "tg":
						c = new DateTimeFormatInfo("d MMMM yyyy' с.' HH:mm:ss","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","MMMM yyyy","dd MMMM","d MMMM yyyy' с.'","dd.MM.yyyy","HH:mm:ss","HH:mm",".",":",["январ", "феврал", "март", "апрел", "май", "июн", "июл", "август", "сентябр", "октябр", "ноябр", "декабр", ""],["январ", "феврал", "март", "апрел", "май", "июн", "июл", "август", "сентябр", "октябр", "ноябр", "декабр", ""],["янв", "фев", "мар", "апр", "май", "июн", "июл", "авг", "сен", "окт", "ноя", "дек", ""],["янв", "фев", "мар", "апр", "май", "июн", "июл", "авг", "сен", "окт", "ноя", "дек", ""],["якшанбе", "душанбе", "сешанбе", "чоршанбе", "панҷшанбе", "ҷумъа", "шанбе"],["пкш", "дшб", "сшб", "чшб", "пшб", "ҷум", "шнб"],["яш", "дш", "сш", "чш", "пш", "ҷм", "шб"],"","");
						break;
					case "th":
						c = new DateTimeFormatInfo("d MMMM yyyy H:mm:ss","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","MMMM yyyy","d MMMM","d MMMM yyyy","d/M/yyyy","H:mm:ss","H:mm","/",":",["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม", ""],["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม", ""],["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค.", ""],["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค.", ""],["อาทิตย์", "จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์", "เสาร์"],["อา.", "จ.", "อ.", "พ.", "พฤ.", "ศ.", "ส."],["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส"],"AM","PM");
						break;
					case "ti":
						c = new DateTimeFormatInfo("dddd፣ dd MMMM መዓልቲ yyyy gg h:mm:ss tt","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","MMMM yyyy","MMMM d","dddd፣ dd MMMM መዓልቲ yyyy gg","dd/MM/yyyy","h:mm:ss tt","h:mm tt","/",":",["ጥሪ", "ለካቲት", "መጋቢት", "ሚያዝያ", "ግንቦት", "ሰነ", "ሓምለ", "ነሓሰ", "መስከረም", "ጥቅምቲ", "ሕዳር", "ታሕሳስ", ""],["ጥሪ", "ለካቲት", "መጋቢት", "ሚያዝያ", "ግንቦት", "ሰነ", "ሓምለ", "ነሓሰ", "መስከረም", "ጥቅምቲ", "ሕዳር", "ታሕሳስ", ""],["ጥሪ", "ለካ", "መጋ", "ሚያ", "ግን", "ሰነ", "ሓም", "ነሓ", "መስ", "ጥቅ", "ሕዳ", "ታሕ", ""],["ጥሪ", "ለካ", "መጋ", "ሚያ", "ግን", "ሰነ", "ሓም", "ነሓ", "መስ", "ጥቅ", "ሕዳ", "ታሕ", ""],["ሰንበት", "ሰኑይ", "ሠሉስ", "ረቡዕ", "ኃሙስ", "ዓርቢ", "ቀዳም"],["ሰን", "ሰኑ", "ሰሉ", "ረቡ", "ሓሙ", "ዓር", "ቀዳ"],["ሰን", "ሰኑ", "ሰሉ", "ረቡ", "ሓሙ", "ዓር", "ቀዳ"],"ንጉሆ ሰዓተ","ድሕር ሰዓት");
						break;
					case "tk":
						c = new DateTimeFormatInfo("yyyy'-nji ýylyň 'd'-nji 'MMMM HH:mm:ss","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","yyyy 'ý.' MMMM","d MMMM","yyyy'-nji ýylyň 'd'-nji 'MMMM","dd.MM.yy 'ý.'","HH:mm:ss","HH:mm",".",":",["Ýanwar", "Fewral", "Mart", "Aprel", "Maý", "lýun", "lýul", "Awgust", "Sentýabr", "Oktýabr", "Noýabr", "Dekabr", ""],["Ýanwar", "Fewral", "Mart", "Aprel", "Maý", "lýun", "lýul", "Awgust", "Sentýabr", "Oktýabr", "Noýabr", "Dekabr", ""],["Ýan", "Few", "Mart", "Apr", "Maý", "lýun", "lýul", "Awg", "Sen", "Okt", "Noý", "Dek", ""],["Ýan", "Few", "Mart", "Apr", "Maý", "lýun", "lýul", "Awg", "Sen", "Okt", "Noý", "Dek", ""],["Ýekşenbe", "Duşenbe", "Sişenbe", "Çarşenbe", "Penşenbe", "Anna", "Şenbe"],["Ýb", "Db", "Sb", "Çb", "Pb", "An", "Şb"],["Ý", "D", "S", "Ç", "P", "A", "Ş"],"","");
						break;
					case "tn":
						c = new DateTimeFormatInfo("yyyy MMMM d, dddd HH:mm:ss","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","yyyy MMMM","MMMM d","yyyy MMMM d, dddd","yyyy-MM-dd","HH:mm:ss","HH:mm","-",":",["Ferikgong", "Tlhakole", "Mopitlo", "Moranang", "Motsheganang", "Seetebosigo", "Phukwi", "Phatwe", "Lwetse", "Diphalane", "Ngwanatsele", "Sedimonthole", ""],["Ferikgong", "Tlhakole", "Mopitlo", "Moranang", "Motsheganang", "Seetebosigo", "Phukwi", "Phatwe", "Lwetse", "Diphalane", "Ngwanatsele", "Sedimonthole", ""],["Fer", "Tlh", "Mop", "Mor", "Mot", "See", "Phu", "Pha", "Lwe", "Dip", "Ngw", "Sed", ""],["Fer", "Tlh", "Mop", "Mor", "Mot", "See", "Phu", "Pha", "Lwe", "Dip", "Ngw", "Sed", ""],["Tshipi", "Mosopulogo", "Labobedi", "Laboraro", "Labone", "Labotlhano", "Matlhatso"],["Tsh", "Mos", "Labb", "Labr", "Labn", "Labt", "Mat"],["Tsh", "Mos", "Labb", "Labr", "Labn", "Labt", "Mat"],"AM","PM");
						break;
					case "to":
						c = new DateTimeFormatInfo("dddd d MMMM yyyy h:mm:ss tt","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","MMMM yyyy","d MMMM","dddd d MMMM yyyy","d/M/yyyy","h:mm:ss tt","h:mm tt","/",":",["Sānuali", "Fēpueli", "Maʻasi", "ʻEpeleli", "Mē", "Sune", "Siulai", "ʻAokosi", "Sepitema", "ʻOkatopa", "Nōvema", "Tīsema", ""],["Sānuali", "Fēpueli", "Maʻasi", "ʻEpeleli", "Mē", "Sune", "Siulai", "ʻAokosi", "Sepitema", "ʻOkatopa", "Nōvema", "Tīsema", ""],["Sān", "Fēp", "Maʻa", "ʻEpe", "Mē", "Sun", "Siu", "ʻAok", "Sep", "ʻOka", "Nōv", "Tīs", ""],["Sān", "Fēp", "Maʻa", "ʻEpe", "Mē", "Sun", "Siu", "ʻAok", "Sep", "ʻOka", "Nōv", "Tīs", ""],["Sāpate", "Mōnite", "Tūsite", "Pulelulu", "Tuʻapulelulu", "Falaite", "Tokonaki"],["Sāp", "Mōn", "Tūs", "Pul", "Tuʻa", "Fal", "Tok"],["Sāp", "Mōn", "Tūs", "Pul", "Tuʻa", "Fal", "Tok"],"AM","PM");
						break;
					case "tr":
						c = new DateTimeFormatInfo("d MMMM yyyy dddd HH:mm:ss","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","MMMM yyyy","d MMMM","d MMMM yyyy dddd","d.MM.yyyy","HH:mm:ss","HH:mm",".",":",["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık", ""],["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık", ""],["Oca", "Şub", "Mar", "Nis", "May", "Haz", "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara", ""],["Oca", "Şub", "Mar", "Nis", "May", "Haz", "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara", ""],["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"],["Paz", "Pzt", "Sal", "Çar", "Per", "Cum", "Cmt"],["Pa", "Pt", "Sa", "Ça", "Pe", "Cu", "Ct"],"ÖÖ","ÖS");
						break;
					case "ts":
						c = new DateTimeFormatInfo("yyyy MMMM d, dddd HH:mm:ss","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","yyyy MMMM","MMMM d","yyyy MMMM d, dddd","yyyy-MM-dd","HH:mm:ss","HH:mm","-",":",["Sunguti", "Nyenyenyani", "Nyenyankulu", "Dzivamisoko", "Mudyaxihi", "Khotavuxika", "Mawuwani", "Mhawuri", "Ndzhati", "Nhlangula", "Hukuri", "N’wendzamhala", ""],["Sunguti", "Nyenyenyani", "Nyenyankulu", "Dzivamisoko", "Mudyaxihi", "Khotavuxika", "Mawuwani", "Mhawuri", "Ndzhati", "Nhlangula", "Hukuri", "N’wendzamhala", ""],["Sun", "Yan", "Kul", "Dzi", "Mud", "Kho", "Maw", "Mha", "Ndz", "Nhl", "Huk", "N’w", ""],["Sun", "Yan", "Kul", "Dzi", "Mud", "Kho", "Maw", "Mha", "Ndz", "Nhl", "Huk", "N’w", ""],["Sonta", "Musumbhunuku", "Ravumbirhi", "Ravunharhu", "Ravumune", "Ravuntlhanu", "Mugqivela"],["Son", "Mus", "Bir", "Har", "Ne", "Tlh", "Mug"],["Son", "Mus", "Bir", "Har", "Ne", "Tlh", "Mug"],"AM","PM");
						break;
					case "tt":
						c = new DateTimeFormatInfo("dd MMMM yyyy' ел' HH:mm:ss","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","MMMM yyyy","d MMMM","dd MMMM yyyy' ел'","dd.MM.yyyy","HH:mm:ss","HH:mm",".",":",["гыйнвар", "февраль", "март", "апрель", "май", "июнь", "июль", "август", "сентябрь", "октябрь", "ноябрь", "декабрь", ""],["гыйнвар", "февраль", "март", "апрель", "май", "июнь", "июль", "август", "сентябрь", "октябрь", "ноябрь", "декабрь", ""],["гыйн.", "фев.", "мар.", "апр.", "май", "июнь", "июль", "авг.", "сен.", "окт.", "нояб.", "дек.", ""],["гыйн.", "фев.", "мар.", "апр.", "май", "июнь", "июль", "авг.", "сен.", "окт.", "нояб.", "дек.", ""],["якшәмбе", "дүшәмбе", "сишәмбе", "чәршәмбе", "пәнҗешәмбе", "җомга", "шимбә"],["якш.", "дүш.", "сиш.", "чәрш.", "пәнҗ.", "җом.", "шим."],["я", "д", "с", "ч", "п", "җ", "ш"],"","");
						break;
					case "ug":
						c = new DateTimeFormatInfo("yyyy-'يىل' d-MMMM H:mm:ss","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","yyyy-'يىلى' MMMM","d-MMMM","yyyy-'يىل' d-MMMM","yyyy-M-d","H:mm:ss","H:mm","-",":",["يانۋار", "فېۋرال", "مارت", "ئاپرېل", "ماي", "ئىيۇن", "ئىيۇل", "ئاۋغۇست", "سېنتەبىر", "ئۆكتەبىر", "نويابىر", "دېكابىر", ""],["يانۋار", "فېۋرال", "مارت", "ئاپرېل", "ماي", "ئىيۇن", "ئىيۇل", "ئاۋغۇست", "سېنتەبىر", "ئۆكتەبىر", "نويابىر", "دېكابىر", ""],["1-ئاي", "2-ئاي", "3-ئاي", "4-ئاي", "5-ئاي", "6-ئاي", "7-ئاي", "8-ئاي", "9-ئاي", "10-ئاي", "11-ئاي", "12-ئاي", ""],["1-ئاي", "2-ئاي", "3-ئاي", "4-ئاي", "5-ئاي", "6-ئاي", "7-ئاي", "8-ئاي", "9-ئاي", "10-ئاي", "11-ئاي", "12-ئاي", ""],["يەكشەنبە", "دۈشەنبە", "سەيشەنبە", "چارشەنبە", "پەيشەنبە", "جۈمە", "شەنبە"],["يە", "دۈ", "سە", "چا", "پە", "جۈ", "شە"],["ي", "د", "س", "چ", "پ", "ج", "ش"],"چۈشتىن بۇرۇن","چۈشتىن كېيىن");
						break;
					case "uk":
						c = new DateTimeFormatInfo("d MMMM yyyy' р.' H:mm:ss","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","MMMM yyyy' р.'","d MMMM","d MMMM yyyy' р.'","dd.MM.yyyy","H:mm:ss","H:mm",".",":",["січень", "лютий", "березень", "квітень", "травень", "червень", "липень", "серпень", "вересень", "жовтень", "листопад", "грудень", ""],["січня", "лютого", "березня", "квітня", "травня", "червня", "липня", "серпня", "вересня", "жовтня", "листопада", "грудня", ""],["Січ", "Лют", "Бер", "Кві", "Тра", "Чер", "Лип", "Сер", "Вер", "Жов", "Лис", "Гру", ""],["січ", "лют", "бер", "кві", "тра", "чер", "лип", "сер", "вер", "жов", "лис", "гру", ""],["неділя", "понеділок", "вівторок", "середа", "четвер", "п'ятниця", "субота"],["Нд", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],["Нд", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],"","");
						break;
					case "ur":
						c = new DateTimeFormatInfo("dd MMMM, yyyy h:mm:ss tt","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","MMMM, yyyy","dd MMMM","dd MMMM, yyyy","dd/MM/yyyy","h:mm:ss tt","h:mm tt","/",":",["جنوری", "فروری", "مارچ", "اپریل", "مئی", "جون", "جولائی", "اگست", "ستمبر", "اکتوبر", "نومبر", "دسمبر", ""],["جنوری", "فروری", "مارچ", "اپریل", "مئی", "جون", "جولائی", "اگست", "ستمبر", "اکتوبر", "نومبر", "دسمبر", ""],["جنوری", "فروری", "مارچ", "اپریل", "مئی", "جون", "جولائی", "اگست", "ستمبر", "اکتوبر", "نومبر", "دسمبر", ""],["جنوری", "فروری", "مارچ", "اپریل", "مئی", "جون", "جولائی", "اگست", "ستمبر", "اکتوبر", "نومبر", "دسمبر", ""],["اتوار", "پير", "منگل", "بدھ", "جمعرات", "جمعه", "هفته"],["اتوار", "پير", "منگل", "بدھ", "جمعرات", "جمعه", "هفته"],["ا", "پ", "م", "ب", "ج", "ج", "ه"],"AM","PM");
						break;
					case "uz":
						c = new DateTimeFormatInfo("dddd, d-MMMM, yyyy HH:mm:ss","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","MMMM, yyyy","d-MMMM","dddd, d-MMMM, yyyy","dd/MM/yyyy","HH:mm:ss","HH:mm","/",":",["Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun", "Iyul", "Avgust", "Sentabr", "Oktabr", "Noyabr", "Dekabr", ""],["yanvar", "fevral", "mart", "aprel", "may", "iyun", "iyul", "avgust", "sentabr", "oktabr", "noyabr", "dekabr", ""],["Yan", "Fev", "Mar", "Apr", "May", "Iyn", "Iyl", "Avg", "Sen", "Okt", "Noy", "Dek", ""],["yan", "fev", "mar", "apr", "may", "iyn", "iyl", "avg", "sen", "okt", "noy", "dek", ""],["yakshanba", "dushanba", "seshanba", "chorshanba", "payshanba", "juma", "shanba"],["Yak", "Dush", "Sesh", "Chor", "Pay", "Jum", "Shan"],["Ya", "Du", "Se", "Ch", "Pa", "Ju", "Sh"],"TO","TK");
						break;
					case "ve":
						c = new DateTimeFormatInfo("yyyy MMMM d, dddd HH:mm:ss","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","yyyy MMMM","MMMM d","yyyy MMMM d, dddd","yyyy-MM-dd","HH:mm:ss","HH:mm","-",":",["Phando", "Luhuhi", "Ṱhafamuhwe", "Lambamai", "Shundunthule", "Fulwi", "Fulwana", "Ṱhangule", "Khubvumedzi", "Tshimedzi", "Ḽara", "Nyendavhusiku", ""],["Phando", "Luhuhi", "Ṱhafamuhwe", "Lambamai", "Shundunthule", "Fulwi", "Fulwana", "Ṱhangule", "Khubvumedzi", "Tshimedzi", "Ḽara", "Nyendavhusiku", ""],["Pha", "Luh", "Ṱhf", "Lam", "Shu", "Lwi", "Lwa", "Ṱha", "Khu", "Tsh", "Ḽar", "Nye", ""],["Pha", "Luh", "Ṱhf", "Lam", "Shu", "Lwi", "Lwa", "Ṱha", "Khu", "Tsh", "Ḽar", "Nye", ""],["Swondaha", "Musumbuluwo", "Ḽavhuvhili", "Ḽavhuraru", "Ḽavhuṋa", "Ḽavhuṱanu", "Mugivhela"],["Swo", "Mus", "Vhi", "Rar", "Ṋa", "Ṱan", "Mug"],["Swo", "Mus", "Vhi", "Rar", "Ṋa", "Ṱan", "Mug"],"AM","PM");
						break;
					case "vi":
						c = new DateTimeFormatInfo("dd MMMM yyyy h:mm:ss tt","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","MMMM yyyy","dd MMMM","dd MMMM yyyy","dd/MM/yyyy","h:mm:ss tt","h:mm tt","/",":",["Tháng Giêng", "Tháng Hai", "Tháng Ba", "Tháng Tư", "Tháng Năm", "Tháng Sáu", "Tháng Bảy", "Tháng Tám", "Tháng Chín", "Tháng Mười", "Tháng Mười Một", "Tháng Mười Hai", ""],["Tháng Giêng", "Tháng Hai", "Tháng Ba", "Tháng Tư", "Tháng Năm", "Tháng Sáu", "Tháng Bảy", "Tháng Tám", "Tháng Chín", "Tháng Mười", "Tháng Mười Một", "Tháng Mười Hai", ""],["Thg1", "Thg2", "Thg3", "Thg4", "Thg5", "Thg6", "Thg7", "Thg8", "Thg9", "Thg10", "Thg11", "Thg12", ""],["Thg1", "Thg2", "Thg3", "Thg4", "Thg5", "Thg6", "Thg7", "Thg8", "Thg9", "Thg10", "Thg11", "Thg12", ""],["Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"],["CN", "T2", "T3", "T4", "T5", "T6", "T7"],["C", "H", "B", "T", "N", "S", "B"],"SA","CH");
						break;
					case "vo":
						c = new DateTimeFormatInfo("yyyy MMMM'a' 'd'. d'id' HH:mm:ss","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","yyyy MMMM","MMMM d","yyyy MMMM'a' 'd'. d'id'","yyyy-MM-dd","HH:mm:ss","HH:mm","-",":",["yanul", "febul", "mäzul", "prilul", "mayul", "yunul", "yulul", "gustul", "setul", "tobul", "novul", "dekul", ""],["yanul", "febul", "mäzul", "prilul", "mayul", "yunul", "yulul", "gustul", "setul", "tobul", "novul", "dekul", ""],["yan", "feb", "mäz", "prl", "may", "yun", "yul", "gst", "set", "tob", "nov", "dek", ""],["yan", "feb", "mäz", "prl", "may", "yun", "yul", "gst", "set", "ton", "nov", "dek", ""],["sudel", "mudel", "tudel", "vedel", "dödel", "fridel", "zädel"],["su.", "mu.", "tu.", "ve.", "dö.", "fr.", "zä."],["su.", "mu.", "tu.", "ve.", "dö.", "fr.", "zä."],"AM","PM");
						break;
					case "wo":
						c = new DateTimeFormatInfo("dddd d MMMM yyyy HH:mm:ss","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","MMMM yyyy","d MMMM","dddd d MMMM yyyy","dd/MM/yyyy","HH:mm:ss","HH:mm","/",":",["Samwiye", "Fewriye", "Maars", "Awril", "Me", "Suwe", "Sullet", "Ut", "Septàmbar", "Oktoobar", "Noowàmbar", "Desàmbar", ""],["Samwiye", "Fewriye", "Maars", "Awril", "Me", "Suwe", "Sullet", "Ut", "Septàmbar", "Oktoobar", "Noowàmbar", "Deesàmbar", ""],["Sam.", "Few.", "Maa", "Awr.", "Me", "Suw", "Sul.", "Ut", "Sept.", "Okt.", "Now.", "Des.", ""],["Sam.", "Few.", "Maa", "Awr.", "Me", "Suwe", "Sul.", "Ut", "Sept.", "Okt.", "Noow.", "Des.", ""],["Dibéer", "Altine", "Talaata", "Àllarba", "Alxames", "Àjjuma", "Gaawu"],["Dib.", "Alt.", "Tal.", "Àll.", "Alx.", "Àjj.", "Gaa."],["Di", "Al", "Ta", "Àl", "Ax", "Àj", "Ga"],"","");
						break;
					case "xh":
						c = new DateTimeFormatInfo("yyyy MMMM d, dddd HH:mm:ss","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","yyyy MMMM","MMMM d","yyyy MMMM d, dddd","yyyy-MM-dd","HH:mm:ss","HH:mm","-",":",["Janyuwari", "Februwari", "Matshi", "Epreli", "Meyi", "Juni", "Julayi", "Agasti", "Septemba", "Okthoba", "Novemba", "Disemba", ""],["Janyuwari", "Februwari", "Matshi", "Epreli", "Meyi", "Juni", "Julayi", "Agasti", "Septemba", "Okthoba", "Novemba", "Disemba", ""],["Jan", "Feb", "Mat", "Epr", "Mey", "Jun", "Jul", "Aga", "Sep", "Okt", "Nov", "Dis", ""],["Jan", "Feb", "Mat", "Epr", "Mey", "Jun", "Jul", "Aga", "Sep", "Okt", "Nov", "Dis", ""],["Cawe", "Mvulo", "Lwesibini", "Lwesithathu", "Lwesine", "Lwesihlanu", "Mgqibelo"],["Caw", "Mvu", "Bin", "Tha", "Sin", "Hla", "Mgq"],["Caw", "Mvu", "Bin", "Tha", "Sin", "Hla", "Mgq"],"AM","PM");
						break;
					case "yi":
						c = new DateTimeFormatInfo("dddd, dטן MMMM yyyy HH:mm:ss","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","MMMM yyyy","MMMM d","dddd, dטן MMMM yyyy","dd/MM/yyyy","HH:mm:ss","HH:mm","/",":",["יאַנואַר", "פֿעברואַר", "מערץ", "אַפּריל", "מיי", "יוני", "יולי", "אויגוסט", "סעפּטעמבער", "אקטאבער", "נאוועמבער", "דעצעמבער", ""],["יאַנואַר", "פֿעברואַר", "מערץ", "אַפּריל", "מיי", "יוני", "יולי", "אויגוסט", "סעפּטעמבער", "אקטאבער", "נאוועמבער", "דעצעמבער", ""],["יאַנ", "פֿעב", "מערץ", "אַפּר", "מיי", "יוני", "יולי", "אויג", "סעפּ", "אקט", "נאוו", "דעצ", ""],["יאַנואַר", "פֿעברואַר", "מערץ", "אַפּריל", "מיי", "יוני", "יולי", "אויגוסט", "סעפּטעמבער", "אקטאבער", "נאוועמבער", "דעצעמבער", ""],["זונטיק", "מאָנטיק", "דינסטיק", "מיטוואך", "דאנערשטיק", "פֿרײַטיק", "שבת"],["זונטיק", "מאָנטיק", "דינסטיק", "מיטוואך", "דאנערשטיק", "פֿרײַטיק", "שבת"],["זונטיק", "מאָנטיק", "דינסטיק", "מיטוואך", "דאנערשטיק", "פֿרײַטיק", "שבת"],"פֿאַרמיטאָג","נאָכמיטאָג");
						break;
					case "yo":
						c = new DateTimeFormatInfo("dddd, d MMMM yyyy HH:mm:ss","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","MMMM yyyy","MMMM d","dddd, d MMMM yyyy","dd/MM/yyyy","HH:mm:ss","HH:mm","/",":",["Oṣù Ṣẹ́rẹ́", "Oṣù Èrèlè", "Oṣù Ẹrẹ̀nà", "Oṣù Ìgbé", "Oṣù Ẹ̀bibi", "Oṣù Òkúdu", "Oṣù Agẹmọ", "Oṣù Ògún", "Oṣù Owewe", "Oṣù Ọ̀wàrà", "Oṣù Bélú", "Oṣù Ọ̀pẹ̀", ""],["Oṣù Ṣẹ́rẹ́", "Oṣù Èrèlè", "Oṣù Ẹrẹ̀nà", "Oṣù Ìgbé", "Oṣù Ẹ̀bibi", "Oṣù Òkúdu", "Oṣù Agẹmọ", "Oṣù Ògún", "Oṣù Owewe", "Oṣù Ọ̀wàrà", "Oṣù Bélú", "Oṣù Ọ̀pẹ̀", ""],["Ṣẹ́rẹ́", "Èrèlè", "Ẹrẹ̀nà", "Ìgbé", "Ẹ̀bibi", "Òkúdu", "Agẹmọ", "Ògún", "Owewe", "Ọ̀wàrà", "Bélú", "Ọ̀pẹ̀", ""],["Ṣẹ́rẹ́", "Èrèlè", "Ẹrẹ̀nà", "Ìgbé", "Ẹ̀bibi", "Òkúdu", "Agẹmọ", "Ògún", "Owewe", "Ọ̀wàrà", "Bélú", "Ọ̀pẹ̀", ""],["Ọjọ́ Àìkú", "Ọjọ́ Ajé", "Ọjọ́ Ìsẹ́gun", "Ọjọ́rú", "Ọjọ́bọ", "Ọjọ́ Ẹtì", "Ọjọ́ Àbámẹ́ta"],["Àìkú", "Ajé", "Ìsẹ́gun", "Ọjọ́rú", "Ọjọ́bọ", "Ẹtì", "Àbámẹ́ta"],["Àìkú", "Ajé", "Ìsẹ́gun", "Ọjọ́rú", "Ọjọ́bọ", "Ẹtì", "Àbámẹ́ta"],"Àárọ̀","Ọ̀sán");
						break;
					case "zh":
						c = new DateTimeFormatInfo("yyyy'年'M'月'd'日' H:mm:ss","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","yyyy'年'M'月'","M月d日","yyyy'年'M'月'd'日'","yyyy/M/d","H:mm:ss","H:mm","/",":",["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月", ""],["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月", ""],["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月", ""],["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月", ""],["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],["周日", "周一", "周二", "周三", "周四", "周五", "周六"],["日", "一", "二", "三", "四", "五", "六"],"上午","下午");
						break;
					case "zu":
						c = new DateTimeFormatInfo("dddd, MMMM d, yyyy HH:mm:ss","yyyy'-'MM'-'dd'T'HH':'mm':'ss","yyyy'-'MM'-'dd HH':'mm':'ss'Z'","ddd, dd MMM yyyy HH':'mm':'ss 'GMT'","MMMM yyyy","MMMM d","dddd, MMMM d, yyyy","M/d/yyyy","HH:mm:ss","HH:mm","/",":",["Januwari", "Februwari", "Mashi", "Ephreli", "Meyi", "Juni", "Julayi", "Agasti", "Septhemba", "Okthoba", "Novemba", "Disemba", ""],["UMasingana", "Februwari", "Mashi", "Ephreli", "Meyi", "Juni", "Julayi", "Agasti", "Septhemba", "Okthoba", "Novemba", "Disemba", ""],["Jan", "Feb", "Mas", "Eph", "Mey", "Jun", "Jul", "Aga", "Sep", "Okt", "Nov", "Dis", ""],["Jan", "Feb", "Mas", "Eph", "Mey", "Jun", "Jul", "Aga", "Sep", "Okt", "Nov", "Dis", ""],["ISonto", "UMsombuluko", "ULwesibili", "ULwesithathu", "ULwesine", "ULwesihlanu", "UMgqibelo"],["Son", "Mso", "Bil", "Tha", "Sin", "Hla", "Mgq"],["Son", "Mso", "Bil", "Tha", "Sin", "Hla", "Mgq"],"AM","PM");
						break;
				}
				if (c) {
					DateTimeFormatInfo._cache[k] = c;
					return c;
				}
			}
			return DateTimeFormatInfo.invariantInfo;
		}
	}
}
