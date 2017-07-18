module Shipwreck {
    export class SharpFormatter {
        private static _getCulture(culture: string | CultureInfo): CultureInfo {
            if (culture) {
                if ((culture as CultureInfo).negativeSign) {
                    return (culture as CultureInfo);
                }
            }
            return Shipwreck.CultureInfo ? (culture ? CultureInfo.getCulture(culture.toString()) : CultureInfo.currentCulture) : null;
        }

        public static formatNumber(value: number, format: string, culture?: string | CultureInfo) {
            var T = SharpFormatter;
            if (!format) {
                return T.formatNumber(value, "g", culture);
            }

            if (/^[Xx][0-9]*$/.test(format)) {
                var length = format.length === 1 ? 0 : parseInt(format.substring(1), 10);
                var r = T._padStart(value.toString(16), length, '0');
                return format.charAt(0) === 'X' ? r.toUpperCase() : r;
            }

            var c = T._getCulture(culture);

            if (/^[Pp][0-9]*$/.test(format)) {
                // PercentPositivePattern
                // PercentNegativePattern

                var length = format.length === 1 ? 2 : parseInt(format.substring(1), 10);
                return T._formatNumberNumeric(value * 100, length) + '%';
            }

            if (value < 0) {
                return (c ? c.negativeSign : "-") + T.formatNumber(-value, format, c);
            }

            /* if (/^[Cc][0-9]*$/.test(format)) {
            } else */ if (/^[Dd][0-9]*$/.test(format)) {
                var length = format.length === 1 ? 0 : parseInt(format.substring(1), 10);
                return T._padStart(value.toFixed(), length, '0');
            } else if (/^[Ee][0-9]*$/.test(format)) {
                return this._formatNumberExponential(value, format.length === 1 ? 6 : parseInt(format.substring(1), 10), format.charAt(0) === 'E');
            } else if (/^[Ff][0-9]*$/.test(format)) {
                var length = format.length === 1 ? 2 : parseInt(format.substring(1), 10);
                return value.toFixed(length);
            } else if (/^[Gg][0-9]*$/.test(format)) {
                var length = format.length === 1 ? 15 : parseInt(format.substring(1), 10);
                var r = T._formatNumberExponential(value, length, false);
                if (/[Ee]-?[0-9]$/.test(r)) {
                    var i = r.length - RegExp.length;
                    var e = parseInt(format.substring(i + 1), 10);
                    if (-5 < e && e < length) {
                        return value.toFixed(length);
                    }
                }
                return format.charAt(0) === 'G' ? r.toUpperCase() : r;
            } else if (/^[Nn][0-9]*$/.test(format)) {
                var length = format.length === 1 ? 2 : parseInt(format.substring(1), 10);
                return T._formatNumberNumeric(value, length);

                //} else if (/^[Rr][0-9]*$/.test(format)) {
            } else if (/^.$/) {
                throw "Invalid format";
            } else {
                throw "Not implemented";
                // custom:
            }
        }
        private static _padStart(value: string, length: number, padChar: string): string {
            if ((value as any).padStart) {
                return (value as any).padStart(length, padChar);
            }
            while (value.length < length) {
                value = padChar + value;
            }
            return value;
        }
        private static _formatNumberExponential(value: number, length: number, capital: boolean): string {
            length = length >= 0 ? length : 6;
            var r = value.toExponential(length);
            r = r.replace(/[-+][0-9]{1,2}$/, m => m.charAt(0) + (m.length === 2 ? "00" : "0") + m.substring(1));
            return capital ? r.toUpperCase() : r;
        }
        private static _formatNumberNumeric(value: number, length: number): string {
            var r = value.toFixed(length);
            var dp = r.indexOf('.');
            dp = dp < 0 ? r.length : dp;
            for (var i = dp - 3; i > 0; i -= 3) {
                if (i === 1 && (r.charAt(0) === '+' || r.charAt(0) === '-')) {
                    break;
                }
                r = r.substr(0, i) + "," + r.substring(i);
            }
            return r;
        }
    }
}