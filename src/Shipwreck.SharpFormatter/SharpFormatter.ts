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

            if (/^[C-GNPRX][0-9]*$/i.test(format)) {
                var type = format.charCodeAt(0);
                var length = format.length === 1 ? -1 : parseInt(format.substring(1), 10);
                switch (type) {
                    case 0x58: // 'X'
                    case 0x78: // 'x'
                        var r = T._padStart(value.toString(16), Math.max(0, length), '0');
                        return format.charAt(0) === 'X' ? r.toUpperCase() : r;
                    // R, r
                }

                var c = T._getCulture(culture);

                switch (type) {
                    case 0x44: // 'D':
                    case 0x64: // 'd':
                        return (value < 0 ? (c ? c.negativeSign : "-") : "") +
                            T._padStart(Math.abs(value).toFixed(), Math.max(0, length), '0');
                    case 0x45: // 'E':
                    case 0x65: // 'e':
                        return (value < 0 ? (c ? c.negativeSign : "-") : "") +
                            this._formatNumberExponential(Math.abs(value), length < 0 ? 6 : length, type == 0x45, c);
                    case 0x46: // 'F':
                    case 0x66: // 'f':
                        var r = (value < 0 ? (c ? c.negativeSign : "-") : "") +
                            Math.abs(value).toFixed(length >= 0 ? length : (c ? c.numberDecimalDigits : 2));
                        if (c && c.numberDecimalSeparator !== '.') {
                            r = r.replace('.', c.numberDecimalSeparator);
                        }
                        return r;

                    case 0x4e: // 'N'
                    case 0x6e: // 'n'
                        var r = T._formatNumberNumeric(
                            Math.abs(value),
                            length >= 0 ? length : (c ? c.numberDecimalDigits : 2),
                            c ? c.percentDecimalSeparator : null,
                            c ? c.numberGroupSeparator : null,
                            c ? c.numberGroupSizes : null);
                        if (value < 0) {
                            if (c) {
                                switch (c.numberNegativePattern) {
                                    case SymbolPosition.Parenthesis:
                                        return `(${r})`;
                                    case SymbolPosition.LeftWithSpace:
                                        return c.negativeSign + " " + r;
                                    case SymbolPosition.Right:
                                        return r + c.negativeSign;
                                    case SymbolPosition.RightWithSpace:
                                        return r + " " + c.negativeSign;
                                }
                            }
                            return (c ? c.negativeSign : "-") + r;
                        }
                        return r;

                    case 0x50: // 'P'
                    case 0x70: // 'p'
                        var r = T._formatNumberNumeric(
                            Math.abs(value) * 100,
                            length >= 0 ? length : (c ? c.percentDecimalDigits : 2),
                            c ? c.percentDecimalSeparator : null,
                            c ? c.percentGroupSeparator : null,
                            c ? c.percentGroupSizes : null);
                        var ps = c ? c.percentSymbol : '%';
                        if (value < 0) {
                            var ns = c ? c.negativeSign : "-";
                            if (c) {
                                switch (c.percentNegativePattern) {
                                    case PercentNegativePattern.SignNumberPercent:
                                        return ns + r + ps;
                                    case PercentNegativePattern.SignPercentNumber:
                                        return ns + ps + r;
                                    case PercentNegativePattern.PercentSignNumber:
                                        return ps + ns + r;
                                    case PercentNegativePattern.PercentNumberSign:
                                        return ps + r + ns;
                                    case PercentNegativePattern.NumberSignPercent:
                                        return r + ns + ps;
                                    case PercentNegativePattern.NumberPercentSign:
                                        return r + ps + ns;
                                    case PercentNegativePattern.SignPercentSpaceNumber:
                                        return ns + ps + ' ' + r;
                                    case PercentNegativePattern.NumberSpacePercentSign:
                                        return r + ' ' + ps + ns;
                                    case PercentNegativePattern.PercentSpaceNumberSign:
                                        return ps + ' ' + r + ns;
                                    case PercentNegativePattern.PercentSpaceSignNumber:
                                        return ps + ' ' + ns + r;
                                    case PercentNegativePattern.NumberSignSpacePercent:
                                        return r + ns + ' ' + ps;
                                }
                            }
                            return ns + r + ' ' + ps;
                        } else {
                            if (c) {
                                switch (c.percentPositivePattern) {
                                    case SymbolPosition.Left:
                                        return ps + r;
                                    case SymbolPosition.LeftWithSpace:
                                        return ps + ' ' + r;
                                    case SymbolPosition.Right:
                                        return r + ps;
                                }
                            }
                            return r + ' ' + ps;
                        }
                }
            } else if (/^.$/) {
                throw "Invalid format";
            }

            var c = T._getCulture(culture);

            if (value < 0) {
                return (c ? c.negativeSign : "-") + T.formatNumber(-value, format, c);
            }

            /* if (/^[Cc][0-9]*$/.test(format)) {
            } else */
            if (/^[Gg][0-9]*$/.test(format)) {
                var length = format.length === 1 ? 15 : parseInt(format.substring(1), 10);
                var r = T._formatNumberExponential(value, length, false, c);
                if (/[Ee]-?[0-9]$/.test(r)) {
                    var i = r.length - RegExp.length;
                    var e = parseInt(format.substring(i + 1), 10);
                    if (-5 < e && e < length) {
                        return value.toFixed(length);
                    }
                }
                return format.charAt(0) === 'G' ? r.toUpperCase() : r;
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
        private static _formatNumberExponential(value: number, length: number, capital: boolean, c: CultureInfo): string {
            length = length >= 0 ? length : 6;
            var r = value.toExponential(length);
            var di = r.lastIndexOf('.');
            r = r.replace(/[-+][0-9]{1,2}$/, m => m.charAt(0) + (m.length === 2 ? "00" : "0") + m.substring(1));
            if (c && (c.negativeSign !== '-' || c.positiveSign !== '+' || c.numberDecimalSeparator !== '.')) {
                r = r.replace(/[-+.]/, v => v === '-' ? c.negativeSign : v === '+' ? c.positiveSign : c.numberDecimalSeparator);
            }
            return capital ? r.toUpperCase() : r;
        }
        private static _formatNumberNumeric(value: number, length: number, decimalSeparator: string, groupSeperator: string, groupSizes: number[]): string {
            var r = value.toFixed(length);
            var dp = r.indexOf('.');
            if (dp < 0) {
                dp = r.length;
            } else if (decimalSeparator !== '.') {
                r = r.substr(0, dp) + decimalSeparator + r.substring(dp + 1);
            }
            var size = groupSizes ? groupSizes[0] : 3;
            var si = 0;
            var sep = groupSeperator || ",";
            for (var i = dp - size; i > 0; i -= size) {
                r = r.substr(0, i) + sep + r.substring(i);
                if (groupSizes && ++si < groupSizes.length) {
                    size = groupSizes[si];
                    if (size == 0) {
                        break;
                    }
                }
            }
            return r;
        }
    }
}