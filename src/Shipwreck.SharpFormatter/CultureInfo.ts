module Shipwreck {
    export class CultureInfo {
		
		private static _cache: { [name: string]: CultureInfo };
		private static _invariantCulture : CultureInfo;
		private static _currentCulture: CultureInfo;
		
		public name: string;
		public negativeSign: string;

		private constructor(name: string, negativeSign: string) {
			this.name = name;
			this.negativeSign = negativeSign;
		}

		public static get invariantCulture() : CultureInfo {
			return CultureInfo._invariantCulture || (CultureInfo._invariantCulture = new CultureInfo("", "-"));
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
						c = new CultureInfo("aa", "-");
						break;
					case "af":
						c = new CultureInfo("af", "-");
						break;
					case "ak":
						c = new CultureInfo("ak", "-");
						break;
					case "am":
						c = new CultureInfo("am", "-");
						break;
					case "ar":
						c = new CultureInfo("ar", "-");
						break;
					case "as":
						c = new CultureInfo("as", "-");
						break;
					case "az":
						c = new CultureInfo("az", "-");
						break;
					case "ba":
						c = new CultureInfo("ba", "-");
						break;
					case "be":
						c = new CultureInfo("be", "-");
						break;
					case "bg":
						c = new CultureInfo("bg", "-");
						break;
					case "bm":
						c = new CultureInfo("bm", "-");
						break;
					case "bn":
						c = new CultureInfo("bn", "-");
						break;
					case "bo":
						c = new CultureInfo("bo", "-");
						break;
					case "br":
						c = new CultureInfo("br", "-");
						break;
					case "bs":
						c = new CultureInfo("bs", "-");
						break;
					case "ca":
						c = new CultureInfo("ca", "-");
						break;
					case "ce":
						c = new CultureInfo("ce", "-");
						break;
					case "co":
						c = new CultureInfo("co", "-");
						break;
					case "cs":
						c = new CultureInfo("cs", "-");
						break;
					case "cu":
						c = new CultureInfo("cu", "-");
						break;
					case "cy":
						c = new CultureInfo("cy", "-");
						break;
					case "da":
						c = new CultureInfo("da", "-");
						break;
					case "de":
						c = new CultureInfo("de", "-");
						break;
					case "dv":
						c = new CultureInfo("dv", "-");
						break;
					case "dz":
						c = new CultureInfo("dz", "-");
						break;
					case "ee":
						c = new CultureInfo("ee", "-");
						break;
					case "el":
						c = new CultureInfo("el", "-");
						break;
					case "en":
						c = new CultureInfo("en", "-");
						break;
					case "eo":
						c = new CultureInfo("eo", "-");
						break;
					case "es":
						c = new CultureInfo("es", "-");
						break;
					case "et":
						c = new CultureInfo("et", "-");
						break;
					case "eu":
						c = new CultureInfo("eu", "-");
						break;
					case "fa":
						c = new CultureInfo("fa", "-");
						break;
					case "ff":
						c = new CultureInfo("ff", "-");
						break;
					case "fi":
						c = new CultureInfo("fi", "-");
						break;
					case "fo":
						c = new CultureInfo("fo", "-");
						break;
					case "fr":
						c = new CultureInfo("fr", "-");
						break;
					case "fy":
						c = new CultureInfo("fy", "-");
						break;
					case "ga":
						c = new CultureInfo("ga", "-");
						break;
					case "gd":
						c = new CultureInfo("gd", "-");
						break;
					case "gl":
						c = new CultureInfo("gl", "-");
						break;
					case "gn":
						c = new CultureInfo("gn", "-");
						break;
					case "gu":
						c = new CultureInfo("gu", "-");
						break;
					case "gv":
						c = new CultureInfo("gv", "-");
						break;
					case "ha":
						c = new CultureInfo("ha", "-");
						break;
					case "he":
						c = new CultureInfo("he", "-");
						break;
					case "hi":
						c = new CultureInfo("hi", "-");
						break;
					case "hr":
						c = new CultureInfo("hr", "-");
						break;
					case "hu":
						c = new CultureInfo("hu", "-");
						break;
					case "hy":
						c = new CultureInfo("hy", "-");
						break;
					case "ia":
						c = new CultureInfo("ia", "-");
						break;
					case "id":
						c = new CultureInfo("id", "-");
						break;
					case "ig":
						c = new CultureInfo("ig", "-");
						break;
					case "ii":
						c = new CultureInfo("ii", "-");
						break;
					case "is":
						c = new CultureInfo("is", "-");
						break;
					case "it":
						c = new CultureInfo("it", "-");
						break;
					case "iu":
						c = new CultureInfo("iu", "-");
						break;
					case "ja":
						c = new CultureInfo("ja", "-");
						break;
					case "jv":
						c = new CultureInfo("jv", "-");
						break;
					case "ka":
						c = new CultureInfo("ka", "-");
						break;
					case "ki":
						c = new CultureInfo("ki", "-");
						break;
					case "kk":
						c = new CultureInfo("kk", "-");
						break;
					case "kl":
						c = new CultureInfo("kl", "-");
						break;
					case "km":
						c = new CultureInfo("km", "-");
						break;
					case "kn":
						c = new CultureInfo("kn", "-");
						break;
					case "ko":
						c = new CultureInfo("ko", "-");
						break;
					case "kr":
						c = new CultureInfo("kr", "-");
						break;
					case "ks":
						c = new CultureInfo("ks", "-");
						break;
					case "ku":
						c = new CultureInfo("ku", "-");
						break;
					case "kw":
						c = new CultureInfo("kw", "-");
						break;
					case "ky":
						c = new CultureInfo("ky", "-");
						break;
					case "la":
						c = new CultureInfo("la", "-");
						break;
					case "lb":
						c = new CultureInfo("lb", "-");
						break;
					case "lg":
						c = new CultureInfo("lg", "-");
						break;
					case "ln":
						c = new CultureInfo("ln", "-");
						break;
					case "lo":
						c = new CultureInfo("lo", "-");
						break;
					case "lt":
						c = new CultureInfo("lt", "-");
						break;
					case "lu":
						c = new CultureInfo("lu", "-");
						break;
					case "lv":
						c = new CultureInfo("lv", "-");
						break;
					case "mg":
						c = new CultureInfo("mg", "-");
						break;
					case "mi":
						c = new CultureInfo("mi", "-");
						break;
					case "mk":
						c = new CultureInfo("mk", "-");
						break;
					case "ml":
						c = new CultureInfo("ml", "-");
						break;
					case "mn":
						c = new CultureInfo("mn", "-");
						break;
					case "mr":
						c = new CultureInfo("mr", "-");
						break;
					case "ms":
						c = new CultureInfo("ms", "-");
						break;
					case "mt":
						c = new CultureInfo("mt", "-");
						break;
					case "my":
						c = new CultureInfo("my", "-");
						break;
					case "nb":
						c = new CultureInfo("nb", "-");
						break;
					case "nd":
						c = new CultureInfo("nd", "-");
						break;
					case "ne":
						c = new CultureInfo("ne", "-");
						break;
					case "nl":
						c = new CultureInfo("nl", "-");
						break;
					case "nn":
						c = new CultureInfo("nn", "-");
						break;
					case "no":
						c = new CultureInfo("no", "-");
						break;
					case "nr":
						c = new CultureInfo("nr", "-");
						break;
					case "oc":
						c = new CultureInfo("oc", "-");
						break;
					case "om":
						c = new CultureInfo("om", "-");
						break;
					case "or":
						c = new CultureInfo("or", "-");
						break;
					case "os":
						c = new CultureInfo("os", "-");
						break;
					case "pa":
						c = new CultureInfo("pa", "-");
						break;
					case "pl":
						c = new CultureInfo("pl", "-");
						break;
					case "ps":
						c = new CultureInfo("ps", "-");
						break;
					case "pt":
						c = new CultureInfo("pt", "-");
						break;
					case "rm":
						c = new CultureInfo("rm", "-");
						break;
					case "rn":
						c = new CultureInfo("rn", "-");
						break;
					case "ro":
						c = new CultureInfo("ro", "-");
						break;
					case "ru":
						c = new CultureInfo("ru", "-");
						break;
					case "rw":
						c = new CultureInfo("rw", "-");
						break;
					case "sa":
						c = new CultureInfo("sa", "-");
						break;
					case "sd":
						c = new CultureInfo("sd", "-");
						break;
					case "se":
						c = new CultureInfo("se", "-");
						break;
					case "sg":
						c = new CultureInfo("sg", "-");
						break;
					case "si":
						c = new CultureInfo("si", "-");
						break;
					case "sk":
						c = new CultureInfo("sk", "-");
						break;
					case "sl":
						c = new CultureInfo("sl", "-");
						break;
					case "sn":
						c = new CultureInfo("sn", "-");
						break;
					case "so":
						c = new CultureInfo("so", "-");
						break;
					case "sq":
						c = new CultureInfo("sq", "-");
						break;
					case "sr":
						c = new CultureInfo("sr", "-");
						break;
					case "ss":
						c = new CultureInfo("ss", "-");
						break;
					case "st":
						c = new CultureInfo("st", "-");
						break;
					case "sv":
						c = new CultureInfo("sv", "-");
						break;
					case "sw":
						c = new CultureInfo("sw", "-");
						break;
					case "ta":
						c = new CultureInfo("ta", "-");
						break;
					case "te":
						c = new CultureInfo("te", "-");
						break;
					case "tg":
						c = new CultureInfo("tg", "-");
						break;
					case "th":
						c = new CultureInfo("th", "-");
						break;
					case "ti":
						c = new CultureInfo("ti", "-");
						break;
					case "tk":
						c = new CultureInfo("tk", "-");
						break;
					case "tn":
						c = new CultureInfo("tn", "-");
						break;
					case "to":
						c = new CultureInfo("to", "-");
						break;
					case "tr":
						c = new CultureInfo("tr", "-");
						break;
					case "ts":
						c = new CultureInfo("ts", "-");
						break;
					case "tt":
						c = new CultureInfo("tt", "-");
						break;
					case "ug":
						c = new CultureInfo("ug", "-");
						break;
					case "uk":
						c = new CultureInfo("uk", "-");
						break;
					case "ur":
						c = new CultureInfo("ur", "-");
						break;
					case "uz":
						c = new CultureInfo("uz", "-");
						break;
					case "ve":
						c = new CultureInfo("ve", "-");
						break;
					case "vi":
						c = new CultureInfo("vi", "-");
						break;
					case "vo":
						c = new CultureInfo("vo", "-");
						break;
					case "wo":
						c = new CultureInfo("wo", "-");
						break;
					case "xh":
						c = new CultureInfo("xh", "-");
						break;
					case "yi":
						c = new CultureInfo("yi", "-");
						break;
					case "yo":
						c = new CultureInfo("yo", "-");
						break;
					case "zh":
						c = new CultureInfo("zh", "-");
						break;
					case "zu":
						c = new CultureInfo("zu", "-");
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
