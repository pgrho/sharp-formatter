/// <reference path="CultureInfo.ts" />
module Shipwreck {
    "use strict";
    function _padStart(value: string, length: number, padChar: string): string {
        if ((value as any).padStart) {
            return (value as any).padStart(length, padChar);
        }
        while (value.length < length) {
            value = padChar + value;
        }
        return value;
    }
    function _padEnd(value: string, length: number, padChar: string): string {
        if ((value as any).padEnd) {
            return (value as any).padEnd(length, padChar);
        }
        while (value.length < length) {
            value += padChar;
        }
        return value;
    }

    function _formatSymbolPattern(pattern: SymbolPosition, r: string, ps: string): string {
        switch (pattern) {
            case SymbolPosition.Parenthesis:
                return '(' + r + ')';
            case SymbolPosition.Left:
                return ps + r;
            case SymbolPosition.LeftWithSpace:
                return ps + ' ' + r;
            case SymbolPosition.Right:
                return r + ps;
            case SymbolPosition.RightWithSpace:
                return r + ' ' + ps;
        }
        return null;
    }
    function _formatSymbolNegativePattern(pattern: SymbolNegativePattern, value: string, negativeSign: string, symbol: string): string {
        switch (pattern) {
            case SymbolNegativePattern.SignNumberSpaceSymbol:
                return negativeSign + value + ' ' + symbol;
            case SymbolNegativePattern.SignNumberSymbol:
                return negativeSign + value + symbol;
            case SymbolNegativePattern.SignSymbolNumber:
                return negativeSign + symbol + value;
            case SymbolNegativePattern.SymbolSignNumber:
                return symbol + negativeSign + value;
            case SymbolNegativePattern.SymbolNumberSign:
                return symbol + value + negativeSign;
            case SymbolNegativePattern.NumberSignSymbol:
                return value + negativeSign + symbol;
            case SymbolNegativePattern.NumberSymbolSign:
                return value + symbol + negativeSign;
            case SymbolNegativePattern.SignSymbolSpaceNumber:
                return negativeSign + symbol + ' ' + value;
            case SymbolNegativePattern.NumberSpaceSymbolSign:
                return value + ' ' + symbol + negativeSign;
            case SymbolNegativePattern.SymbolSpaceNumberSign:
                return symbol + ' ' + value + negativeSign;
            case SymbolNegativePattern.SymbolSpaceSignNumber:
                return symbol + ' ' + negativeSign + value;
            case SymbolNegativePattern.NumberSignSpaceSymbol:
                return value + negativeSign + ' ' + symbol;
            case SymbolNegativePattern.ParenthesizedLeft:
                return `(${symbol}${value})`;
            case SymbolNegativePattern.ParenthesizedLeftWithSpace:
                return `(${symbol} ${value})`;
            case SymbolNegativePattern.ParenthesizedRight:
                return `(${value}${symbol})`;
            case SymbolNegativePattern.ParenthesizedRightWithSpace:
                return `(${value} ${symbol})`;
        }
        return null;
    }

    export interface IFormatter {
        canFormat(obj: any): boolean;
        format(obj: any, format: string, culture: CultureInfo): string;
    }
    const enum FormatState {
        Literal,
        Opening,
        Index,
        Alignment,
        Format
    }
    export class SharpFormatter {
        private static _getCulture(culture: string | CultureInfo): CultureInfo {
            if (culture) {
                if ((culture as CultureInfo).numberFormat) {
                    return (culture as CultureInfo);
                }
            }
            return Shipwreck.CultureInfo ? (culture !== null && culture !== undefined ? CultureInfo.getCulture(culture.toString()) : CultureInfo.currentCulture) : null;
        }

        private static _formatters: IFormatter[];

        public static get formatters(): IFormatter[] {
            return this._formatters || (this._formatters = [{
                canFormat(obj) {
                    return typeof (obj) === 'number';
                },
                format(obj: any, format: string, culture: CultureInfo) {
                    return SharpFormatter.formatNumber(obj, format, culture);
                }
            },
            {
                canFormat(obj) {
                    return obj instanceof Date;
                },
                format(obj: any, format: string, culture: CultureInfo) {
                    return SharpFormatter.formatDate(obj, format, culture);
                }
            }]);
        }

        public static format(format: string, args: any[], culture?: string | CultureInfo) {
            var r = '';

            var ci = SharpFormatter._getCulture(culture);

            var s = FormatState.Literal;
            var index = 0;
            var align = 0;
            var alignSign = 1;
            var valueFormat: string;

            for (var i = 0; i < format.length; i++) {
                var c = format.charAt(i);

                switch (s) {
                    case FormatState.Literal:
                        switch (c) {
                            case '{':
                                s = FormatState.Opening;
                                index = 0;
                                break;
                            default:
                                r += c;
                                break;
                        }
                        break;
                    case FormatState.Opening:
                        switch (c) {
                            case '{':
                                r += '{';
                                s = FormatState.Literal;
                                break;
                            case '0':
                            case '1':
                            case '2':
                            case '3':
                            case '4':
                            case '5':
                            case '6':
                            case '7':
                            case '8':
                            case '9':
                                index = c.charCodeAt(0) - 0x30;
                                align = 0;
                                valueFormat = '';
                                s = FormatState.Index;
                                break;
                            default:
                                throw "Invalid format";
                        }
                        break;
                    case FormatState.Index:
                        switch (c) {
                            case '0':
                            case '1':
                            case '2':
                            case '3':
                            case '4':
                            case '5':
                            case '6':
                            case '7':
                            case '8':
                            case '9':
                                index = index * 10 + c.charCodeAt(0) - 0x30;
                                break;
                            case ',':
                                s = FormatState.Alignment;
                                align = 0;
                                alignSign = 1;
                                break;
                            case ':':
                                s = FormatState.Format;
                                valueFormat = '';
                                break;
                            case '}':
                                var v = args[index];
                                var formatter = SharpFormatter.formatters.filter(f => f.canFormat(v))[0];
                                r += formatter ? formatter.format(v, null, ci) : (v ? v.toString() : '');
                                s = FormatState.Literal;
                                break;
                            default:
                                throw "Invalid format";
                        }
                        break;
                    case FormatState.Alignment:
                        switch (c) {
                            case '+':
                                alignSign = 1;
                                break;
                            case '-':
                                alignSign = -1;
                                break;
                            case '0':
                            case '1':
                            case '2':
                            case '3':
                            case '4':
                            case '5':
                            case '6':
                            case '7':
                            case '8':
                            case '9':
                                align = 10 * align + c.charCodeAt(0) - 0x30;
                                break;
                            case ':':
                                s = FormatState.Format;
                                valueFormat = '';
                                break;
                            case '}':
                                var v = args[index];
                                var formatter = SharpFormatter.formatters.filter(f => f.canFormat(v))[0];
                                var vs: string = formatter ? formatter.format(v, null, ci) : (v ? v.toString() : '');
                                r += alignSign > 0 ? _padStart(vs, align, ' ') : _padEnd(vs, align, ' ');
                                s = FormatState.Literal;
                                break;
                            default:
                                throw "Invalid format";
                        }
                        break;
                    case FormatState.Format:
                        if (c === '}') {
                            var v = args[index];
                            var formatter = SharpFormatter.formatters.filter(f => f.canFormat(v))[0];
                            var vs: string = formatter ? formatter.format(v, valueFormat, ci) : (v ? v.toString() : '');
                            if (align > 0) {
                                vs = alignSign > 0 ? _padStart(vs, align, ' ') : _padEnd(vs, align, ' ');
                            }
                            r += vs;
                            s = FormatState.Literal;
                        } else {
                            valueFormat += c;
                        }
                        break;
                }
            }
            return r;
        }

        public static formatNumber(value: number, format: string, culture?: string | CultureInfo | NumberFormatInfo) {
            var nf = culture as NumberFormatInfo;
            if (!nf || !nf.positiveSign) {
                var c = SharpFormatter._getCulture(culture as any);
                if (c) {
                    nf = c.numberFormat;
                }
            }
            return _format(nf, value, format);
        }
        public static formatDate(value: Date, format: string, culture?: string | CultureInfo) {
            return _formatDate(value, format);
        }
    }

    // #region formatNumber
    const enum NumberFormatTokenType {
        Literal,
        Zero,
        Number,
        Dot,
        Comma,
        Percent,
        Permill,
        Exponential
    }

    interface INumberFormatToken {
        token: string;
        type: NumberFormatTokenType;
    }
    interface INumberFormatSection {
        tokens: INumberFormatToken[];
        dot: number;
        exponential: boolean;
        coefficient: number;
        grouped: boolean;
        integerDigits: number;
        fractionDigits: number;
        firstPlaceholder: number;
    }
    export interface INumberTypeInfo {
        decimalSeparator: string;
        decimalDigits: number;
        groupSeparator: string;
        groupSizes: number[];
    }
    export enum SymbolPosition {
        Parenthesis,
        Left,
        LeftWithSpace,
        Right,
        RightWithSpace,
    }
    export enum SymbolNegativePattern {
        SignNumberSpaceSymbol,
        SignNumberSymbol,
        SignSymbolNumber,
        SymbolSignNumber,
        SymbolNumberSign,
        NumberSignSymbol,
        NumberSymbolSign,
        SignSymbolSpaceNumber,
        NumberSpaceSymbolSign,
        SymbolSpaceNumberSign,
        SymbolSpaceSignNumber,
        NumberSignSpaceSymbol,
        ParenthesizedLeft,
        ParenthesizedLeftWithSpace,
        ParenthesizedRight,
        ParenthesizedRightWithSpace,
    }

    // #region NumberFormatInfo

    function _positiveSign(c: NumberFormatInfo): string {
        return c ? c.positiveSign : "+";
    }
    function _negativeSign(c: NumberFormatInfo): string {
        return c ? c.negativeSign : "-";
    }
    function _percentSymbol(c: NumberFormatInfo): string {
        return c ? c.percentSymbol : "%";
    }

    function _currencySymbol(c: NumberFormatInfo): string {
        return c ? c.currencySymbol : '¤';
    }

    function _numberDecimalSeparator(c: NumberFormatInfo): string {
        return c ? c.numberDecimalSeparator : ".";
    }
    function _numberNegativePattern(c: NumberFormatInfo): SymbolPosition {
        return c ? c.numberNegativePattern : SymbolPosition.Left;
    }

    function _currencyPositivePattern(c: NumberFormatInfo): SymbolPosition {
        return c ? c.currencyPositivePattern : SymbolPosition.Left;
    }

    function _currencyNegativePattern(c: NumberFormatInfo): SymbolNegativePattern {
        return c ? c.currencyNegativePattern : SymbolNegativePattern.ParenthesizedLeft;
    }

    function _percentPositivePattern(c: NumberFormatInfo): SymbolPosition {
        return c ? c.percentPositivePattern : SymbolPosition.RightWithSpace;
    }

    function _percentNegativePattern(c: NumberFormatInfo): SymbolNegativePattern {
        return c ? c.percentNegativePattern : SymbolNegativePattern.SignNumberSpaceSymbol;
    }
    function _invariantType(): INumberTypeInfo {
        return {
            decimalSeparator: '.',
            decimalDigits: 2,
            groupSeparator: ',',
            groupSizes: [3]
        };
    }

    function _numberType(c: NumberFormatInfo): INumberTypeInfo {
        return c ? c.numberType() : _invariantType();
    }
    function _currencyType(c: NumberFormatInfo): INumberTypeInfo {
        return c ? c.currencyType() : _invariantType();
    }

    function _percentType(c: NumberFormatInfo): INumberTypeInfo {
        return c ? c.percentType() : _invariantType();
    }

    // #endregion CultureInfo

    function _appendNegative(c: NumberFormatInfo, value: number, text: string) {
        return value >= 0 ? text : (_negativeSign(c) + text);
    }

    function _format(c: NumberFormatInfo, value: number, format: string): string {
        if (!format) {
            return _format(c, value, "g");
        }

        value = value * 1;

        if (!isFinite(value)) {
            if (isNaN(value)) {
                return c ? c.NaNSymbol : "NaN";
            } else if (value > 0) {
                return c ? c.positiveInifinitySymbol : "Infinity";
            } else {
                return c ? c.negativeInifinitySymbol : "-Infinity";
            }
        }

        if (/^[C-GNPRX][0-9]*$/i.test(format)) {
            var type = format.charCodeAt(0);
            var length = format.length === 1 ? -1 : parseInt(format.substring(1), 10);
            switch (type) {
                case 0x58: // 'X'
                case 0x78: // 'x'
                    var r = _padStart(value.toString(16), Math.max(0, length), '0');
                    return format.charAt(0) === 'X' ? r.toUpperCase() : r;
            }

            switch (type) {
                case 0x43: // 'C'
                case 0x63: // 'c'
                    var r = _formatNumeric(Math.abs(value), length, _currencyType(c));
                    if (value < 0) {
                        return _formatSymbolNegativePattern(_currencyNegativePattern(c), r, _negativeSign(c), _currencySymbol(c));
                    } else {
                        return _formatSymbolPattern(_currencyPositivePattern(c), r, _currencySymbol(c));
                    }
                case 0x44: // 'D':
                case 0x64: // 'd':
                    return _appendNegative(c, value, _padStart(Math.abs(value).toFixed(), Math.max(0, length), '0'));
                case 0x45: // 'E':
                case 0x65: // 'e':
                    return _formatExponential(c, Math.abs(value), length < 0 ? 6 : length, type === 0x45);
                case 0x46: // 'F':
                case 0x66: // 'f':
                    var nt = _numberType(c);
                    var r = _appendNegative(c, value, Math.abs(value).toFixed(length >= 0 ? length : nt.decimalDigits));
                    if (nt.decimalSeparator !== '.') {
                        r = r.replace('.', nt.decimalSeparator);
                    }
                    return r;
                case 0x47: // 'G':
                case 0x67: // 'g':
                case 0x52: // 'R'
                case 0x72: // 'r'
                    length = (type & 1) && length >= 0 ? length : 15;
                    if (value === 0) {
                        return '0';
                    }
                    var exp = Math.floor(Math.log(Math.abs(value)) / Math.LN10);
                    if (-5 < exp && exp < length) {
                        r = Math.abs(value).toFixed(length - exp - 1);
                        r = r.replace(/\.?0+$/, '');
                    } else {
                        r = Math.abs(exp) < 10 ? ((Math.abs(value) * Math.pow(10, -exp)).toFixed(length - 1) + (type === 0x47 ? 'E' : 'e') + (exp >= 0 ? _positiveSign(c) : _negativeSign(c)) + '0' + Math.abs(exp)) : Math.abs(value).toExponential(length - 1);
                        if (c && c.positiveSign !== '+') {
                            r = r.replace('+', c.positiveSign);
                        }
                        if (Math.abs(exp) > 9 && type === 0x47) {
                            r = r.replace('e', 'E');
                        }
                    }
                    if (c && c.numberDecimalSeparator !== '.') {
                        r = r.replace('.', c.numberDecimalSeparator);
                    }
                    return _appendNegative(c, value, r);

                case 0x4e: // 'N'
                case 0x6e: // 'n'
                    var r = _formatNumeric(Math.abs(value), length, _numberType(c));
                    if (value < 0) {
                        return _formatSymbolPattern(_numberNegativePattern(c), r, _negativeSign(c));
                    }
                    return r;

                case 0x50: // 'P'
                case 0x70: // 'p'
                    var r = _formatNumeric(Math.abs(value) * 100, length, _percentType(c));
                    if (value < 0) {
                        return _formatSymbolNegativePattern(_percentNegativePattern(c), r, _negativeSign(c), _percentSymbol(c));
                    } else {
                        return _formatSymbolPattern(_percentPositivePattern(c), r, _percentSymbol(c));
                    }
            }
        } else if (/^.$/.test(format)) {
            throw "Invalid format";
        }

        return _formatCustom(c, value, format);
    }

    function _formatExponential(c: NumberFormatInfo, value: number, length: number, capital: boolean): string {
        // get JavaScript exponential notation
        var r = Math.abs(value).toExponential(length >= 0 ? length : 6);

        // capitalize result and  Insert zeros to the exponential part to be 3digits
        r = r.replace(
            /E[-+][0-9]+$/i,
            m => (capital ? 'E' : 'e') +
                (m.charAt(1) === '+' ? _positiveSign(c) : _negativeSign(c)) +
                _padStart(m.substring(2), 3, '0'));

        // localize decimal separator
        if (c && c.numberDecimalSeparator !== '.') {
            r = r.replace('.', c.numberDecimalSeparator);
        }

        // append negative sign if needed
        return _appendNegative(c, value, r);
    }

    function _formatNumeric(value: number, length: number, typeInfo: INumberTypeInfo): string {
        // get JavaScript fixed notation
        var r = value.toFixed(length >= 0 ? length : typeInfo.decimalDigits);

        // find decimal separator
        var dp = r.indexOf('.');
        if (dp < 0) {
            dp = r.length;
        } else if (typeInfo.decimalSeparator !== '.') {
            r = r.replace('.', typeInfo.decimalSeparator);
        }

        // insert group separators
        var size = typeInfo.groupSizes[0];
        var si = 0;
        var sep = typeInfo.groupSeparator;
        for (var i = dp - size; i > 0; i -= size) {
            r = r.substr(0, i) + sep + r.substring(i);
            if (++si < typeInfo.groupSizes.length) {
                size = typeInfo.groupSizes[si];
                if (size === 0) {
                    break;
                }
            }
        }

        return r;
    }

    // #region _formatCustom
    function _formatCustom(c: NumberFormatInfo, value: number, format: string): string {
        var sections = _parseCustom(format);
        if (sections.length === 1) {
            return _appendNegative(c, value, _formatSection(c, Math.abs(value), sections[0]));
        } else if (sections.length === 2) {
            return _formatSection(c, Math.abs(value), value < 0 ? sections[1] : sections[0]);
        } else {
            var sec: INumberFormatSection;
            if (value > 0) {
                sec = sections[0];
            } else if (value < 0) {
                sec = sections[1];
                if (sec.tokens.length === 0) {
                    sec = sections[0];
                }
            } else {
                sec = sections[2];
            }
            return _formatSection(c, Math.abs(value), sec);
        }
    }

    function _parseCustom(format: string): INumberFormatSection[] {
        var sec: INumberFormatToken[] = [];
        var sections: INumberFormatToken[][] = [sec];
        var escaped = false;
        var quote: string = null;
        var buff = "";
        var exp = false;
        for (var i = 0; i < format.length; i++) {
            var c = format.charAt(i);

            if (escaped) {
                buff += c;
                escaped = false;
                continue;
            } else if (quote) {
                if (c === '\\') {
                    escaped = true;
                } else if (c === quote) {
                    sec.push({ token: buff, type: NumberFormatTokenType.Literal });
                    buff = "";
                    quote = null;
                } else {
                    buff += c;
                }
                continue;
            } else if (exp) {
                if (c === '0') {
                    sec.push({ token: buff + c, type: NumberFormatTokenType.Exponential });
                    buff = "";
                    exp = false;
                    continue;
                } else if (buff.length === 1 && (c === '+' || c === '-')) {
                    buff += c;
                    continue;
                } else {
                    buff += c;
                }
            }

            switch (c) {
                case ';':
                case '\'':
                case '"':
                case 'E':
                case 'e':
                case '0':
                case '#':
                case '.':
                case ',':
                case '%':
                case '‰':
                    if (buff) {
                        sec.push({ token: buff, type: NumberFormatTokenType.Literal });
                        buff = "";
                    }
                    break;
            }

            switch (c) {
                case ';':
                    sec = [];
                    sections.push(sec);
                    break;
                case '\'':
                case '"':
                    quote = c;
                    break;
                case 'E':
                case 'e':
                    buff = c;
                    exp = true;
                    continue;
                case '\\':
                    escaped = true;
                    break;
                case '0':
                    sec.push({ token: c, type: NumberFormatTokenType.Zero });
                    break;
                case '#':
                    sec.push({ token: c, type: NumberFormatTokenType.Number });
                    break;
                case '.':
                    sec.push({ token: c, type: NumberFormatTokenType.Dot });
                    break;
                case ',':
                    sec.push({ token: c, type: NumberFormatTokenType.Comma });
                    break;
                case '%':
                    sec.push({ token: c, type: NumberFormatTokenType.Percent });
                    break;
                case '‰':
                    sec.push({ token: c, type: NumberFormatTokenType.Permill });
                    break;
                default:
                    if (!exp) {
                        buff += c;
                    }
                    break;
            }
            exp = false;
        }
        if (escaped) {
            buff += '\\';
        }
        if (buff) {
            sec.push({ token: buff, type: NumberFormatTokenType.Literal });
        }

        var r: INumberFormatSection[] = [];

        for (var sec of sections) {
            var hasExp = false;
            var dotPos = -1;
            var grouped = false;
            var coeff = 1;
            var il = 0;
            var fl = 0;
            var fp = -1;
            var fz = -1;
            var lz = -1;
            for (var i = 0; i < sec.length; i++) {
                var t = sec[i];
                switch (t.type) {
                    case NumberFormatTokenType.Zero:
                        if (fz < 0) {
                            fz = i;
                        }
                        lz = i;
                    case NumberFormatTokenType.Number:
                        if (dotPos >= 0) {
                            fl++;
                        } else {
                            il++;
                        }
                        if (fp < 0) {
                            fp = i;
                        }
                        break;
                    case NumberFormatTokenType.Dot:
                        if (dotPos < 0) {
                            dotPos = i;
                        }
                        break;
                    case NumberFormatTokenType.Comma:
                        if (dotPos < 0) {
                            var found = false;
                            for (var j = i + 1; j < sec.length; j++) {
                                var ls = sec[j];
                                if (ls.type === NumberFormatTokenType.Dot) {
                                    break;
                                } else if (ls.type === NumberFormatTokenType.Zero || ls.type === NumberFormatTokenType.Number) {
                                    found = true;
                                    break;
                                }
                            }
                            if (found) {
                                grouped = true;
                            } else {
                                coeff *= 0.001;
                            }
                        } else {
                            grouped = true;
                        }
                        break;
                    case NumberFormatTokenType.Percent:
                        coeff *= 100;
                        break;
                    case NumberFormatTokenType.Permill:
                        coeff *= 1000;
                        break;
                    case NumberFormatTokenType.Exponential:
                        hasExp = true;
                        break;
                }
            }
            for (var i = fz + 1; i < lz; i++) {
                var t = sec[i];
                if (t.type === NumberFormatTokenType.Number) {
                    t.type = NumberFormatTokenType.Zero;
                }
            }
            r.push({
                tokens: sec,
                exponential: hasExp,
                coefficient: coeff,
                dot: dotPos,
                grouped: grouped,
                integerDigits: il,
                fractionDigits: fl,
                firstPlaceholder: fp
            });
        }

        return r;
    }

    function _formatSection(c: NumberFormatInfo, value: number, sec: INumberFormatSection): string {
        var v = value * sec.coefficient, exp = 0;

        if (sec.exponential) {
            exp = Math.floor(Math.log(v) / Math.LN10) - Math.max(sec.integerDigits - 1, 0);
            v *= Math.pow(10, -exp);
        }

        var vs: string = v.toFixed(sec.fractionDigits);
        var dp = vs.lastIndexOf('.');
        if (dp < 0) {
            if (vs === '0') {
                vs = '';
            }
            dp = vs.length;
        } else {
            vs = vs.replace(/\.?0*$/, '');
        }
        var r = "";

        var ple = -sec.fractionDigits;
        var nt = _numberType(c);
        var sizes = nt.groupSizes;
        var gs = sec.grouped ? sizes[0] - 1 : NaN;
        var gi = 1;
        var ld = -1;

        for (var i = sec.tokens.length - 1; i >= 0; i--) {
            var t = sec.tokens[i];
            switch (t.type) {
                case NumberFormatTokenType.Zero:
                case NumberFormatTokenType.Number:
                    var j = dp - ple - (ple >= 0 ? 1 : 0);
                    if (0 <= j && j < vs.length) {
                        if (i === sec.firstPlaceholder) {
                            if (sec.grouped) {
                                while (j >= 0) {
                                    if (0 < j && gs === ple) {
                                        r = nt.groupSeparator + vs.charAt(j) + r;
                                        gs += gi < sizes.length ? sizes[gi++] : sizes[sizes.length - 1];
                                    } else {
                                        r = vs.charAt(j) + r;
                                    }
                                    ple++;
                                    j--;
                                }
                            } else {
                                r = vs.substring(0, j + 1) + r;
                            }
                        } else {
                            var prev = sec.tokens[i - 1];
                            if (sec.grouped
                                && gs === ple
                                && (prev.type === NumberFormatTokenType.Zero || (prev.type === NumberFormatTokenType.Number && j > 0))) {
                                r = nt.groupSeparator + vs.charAt(j) + r;
                                gs += gi < sizes.length ? sizes[gi++] : sizes[sizes.length - 1];
                            } else {
                                r = vs.charAt(j) + r;
                            }
                        }
                        ld = Math.max(ld, i);
                    } else if (t.type === NumberFormatTokenType.Zero) {
                        r = '0' + r;
                        ld = Math.max(ld, i);
                    }
                    ple++;
                    break;
                case NumberFormatTokenType.Literal:
                case NumberFormatTokenType.Permill:
                    r = t.token + r;
                    break;
                case NumberFormatTokenType.Dot:
                    if (i === sec.dot && ld > -1) {
                        r = nt.decimalSeparator + r;
                    }
                    break;

                case NumberFormatTokenType.Percent:
                    r = _percentSymbol(c) + r;
                    break;

                case NumberFormatTokenType.Exponential:
                    r = t.token.charAt(0) +
                        (exp >= 0 ? (t.token.charAt(1) === '+' ? _positiveSign(c) : '') : _negativeSign(c)) +
                        Math.abs(exp) +
                        r;
                    break;

                case NumberFormatTokenType.Comma:
                default:
                    break;
            }
        }

        return r;
    }

    // #endregion

    // #endregion formatNumber

    // #region formatDate

    const enum DateFormatTokenType {
        Literal,
        Value,
        DateSeparator,
        TimeSeparator
    }

    interface IDateFormatToken {
        token: string;
        type: DateFormatTokenType;
    }

    function getAbbreviatedDayName(d: number) {
        switch (d) {
            case 0:
                return "Sun";
            case 1:
                return "Mon";
            case 2:
                return "Tue";
            case 3:
                return "Wed";
            case 4:
                return "Thu";
            case 5:
                return "Fri";
            case 6:
                return "Sat";
        }
        throw "Invalid day " + d;
    }
    function getDayName(d: number) {
        switch (d) {
            case 0:
                return "Sunday";
            case 1:
                return "Monday";
            case 2:
                return "Tuesday";
            case 3:
                return "Wednesday";
            case 4:
                return "Thursday";
            case 5:
                return "Friday";
            case 6:
                return "Saturday";
        }
        throw "Invalid day " + d;
    }
    function getAbbreviatedMonthName(d: number) {
        switch (d) {
            case 0:
                return "Jan";
            case 1:
                return "Feb";
            case 2:
                return "Mar";
            case 3:
                return "Apr";
            case 4:
                return "May";
            case 5:
                return "Jun";
            case 6:
                return "Jul";
            case 7:
                return "Aug";
            case 8:
                return "Sep";
            case 9:
                return "Oct";
            case 10:
                return "Nov";
            case 11:
                return "Dec";
        }
        throw "Invalid month " + d;
    }
    function getMonthName(d: number) {
        switch (d) {
            case 0:
                return "January";
            case 1:
                return "February";
            case 2:
                return "March";
            case 3:
                return "April";
            case 4:
                return "May";
            case 5:
                return "June";
            case 6:
                return "July";
            case 7:
                return "August";
            case 8:
                return "September";
            case 9:
                return "October";
            case 10:
                return "November";
            case 11:
                return "December";
        }
        throw "Invalid month " + d;
    }

    function _formatDate(date: Date, format: string) {
        var f = format || 'G';
        var utc = false;
        if (f.length === 1) {
            switch (f) {
                case "s": // SortableDateTimePattern
                    f = "yyyy'-'MM'-'dd'T'HH':'mm':'ss";
                    break;
                case "d": //ShortDatePattern
                    f = "MM/dd/yyyy";
                    break;
                case "D": //LongDatePattern
                    f = "dddd, dd MMMM yyyy";
                    break;
                case "f": //LongDatePattern + ShortTimePattern
                    f = "dddd, dd MMMM yyyy HH:mm";
                    break;
                case "F": //FullDateTimePattern
                    f = "dddd, dd MMMM yyyy HH:mm:ss";
                    break;
                case "g": //ShortDatePattern + ShortTimePattern
                    f = "MM/dd/yyyy HH:mm";
                    break;
                case "G": //ShortDatePattern + LongTimePattern
                    f = "MM/dd/yyyy HH:mm:ss";
                    break;
                case "M":
                case "m": // MonthDayPattern
                    f = "MMMM dd";
                    break;
                case 'O':
                case 'o':
                    f = "yyyy'-'MM'-'dd'T'HH':'mm':'ss'.'fffffffzz";
                    break;
                case "R":
                case "r": // RFC1123Pattern
                    f = "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'";
                    utc = true;
                    break;
                case "t": // ShortTimePattern
                    f = "HH:mm";
                    break;
                case "T": // LongTimePattern
                    f = "HH:mm:ss";
                    break;
                case "u": //UniversalSortableDateTimePattern
                    f = "yyyy'-'MM'-'dd HH':'mm':'ss'Z'";
                    utc = true;
                    break;
                case "U": //FullDateTimePattern
                    f = "dddd, dd MMMM yyyy HH:mm:ss";
                    utc = true;
                    break;
                case "Y":
                case "y": // YearMonthPattern
                    f = "yyyy MMMM";
                    break;
                default:
                    throw "Invalid format";
            }
        }
        var tokens = _parseDateFormat(f);
        var r = '';
        for (var t of tokens) {
            var tl = t.token.length;
            switch (t.type) {
                case DateFormatTokenType.Literal:
                    r += t.token;
                    continue;
                case DateFormatTokenType.DateSeparator:
                    r += '/';
                    continue;
                case DateFormatTokenType.TimeSeparator:
                    r += ':';
                    continue;
                case DateFormatTokenType.Value:
                    switch (t.token) {
                        case "d":
                        case "dd":
                            r += _padStart((utc ? date.getUTCDate() : date.getDate()).toString(), tl, '0');
                            continue;
                        case "ddd": // AbbreviatedDayNames
                            var v = utc ? date.getUTCDay() : date.getDay();
                            r += getAbbreviatedDayName(v);
                            continue;
                        case "dddd": // DayNames
                            var v = utc ? date.getUTCDay() : date.getDay();
                            r += getDayName(v);
                            continue;
                        case "f":
                        case "ff":
                        case "fff":
                        case "ffff":
                        case "fffff":
                        case "ffffff":
                        case "fffffff":
                            var v = utc ? date.getUTCMilliseconds() : date.getMilliseconds();
                            r += (v * 10000 + 10000000).toString().substr(1, tl);
                            continue;
                        case "F":
                        case "FF":
                        case "FFF":
                        case "FFFF":
                        case "FFFFF":
                        case "FFFFFF":
                        case "FFFFFFF":
                            var v = utc ? date.getUTCMilliseconds() : date.getMilliseconds();
                            if (v === 0) {
                                r = r.replace(/\.$/, '');
                            } else {
                                r += (v * 10000 + 10000000).toString().substr(1, tl).replace(/0+$/, '');
                            }
                            continue;
                        case "g":
                        case "gg":
                            r += 'A.D.';
                            continue;
                        case "h":
                        case "hh":
                            r += _padStart((((utc ? date.getUTCHours() : date.getHours()) + 11) % 12 + 1).toString(), tl, '0');
                            continue;
                        case "H":
                        case "HH":
                            r += _padStart((utc ? date.getUTCHours() : date.getHours()).toString(), tl, '0');
                            continue;
                        case "K":
                        case "zzz":
                            var v = date.getTimezoneOffset();
                            if (v === 0 && t.token !== "zzz") {
                                r += 'Z';
                            } else {
                                r += (v > 0 ? '+' : '-') +
                                    _padStart(Math.floor(Math.abs(v) / 60).toString(), 2, '0') +
                                    _padStart((Math.abs(v) % 60).toString(), 2, '0');
                            }
                            continue;
                        case "m":
                        case "mm":
                            r += _padStart((utc ? date.getUTCMinutes() : date.getMinutes()).toString(), tl, '0');
                            continue;
                        case "M":
                        case "MM":
                            r += _padStart(((utc ? date.getUTCMonth() : date.getMonth()) + 1).toString(), tl, '0');
                            continue;
                        case "MMM":
                            var v = utc ? date.getUTCMonth() : date.getMonth();
                            r += getAbbreviatedMonthName(v);
                            continue;
                        case "MMMM": // MonthNames
                            var v = utc ? date.getUTCMonth() : date.getMonth();
                            r += getMonthName(v);
                            continue;
                        case "s":
                        case "ss":
                            r += _padStart((utc ? date.getUTCSeconds() : date.getSeconds()).toString(), tl, '0');
                            continue;
                        case "t":
                            var v = utc ? date.getUTCHours() : date.getHours();
                            return v < 12 ? 'A' : 'P';
                        case "tt":
                            var v = utc ? date.getUTCHours() : date.getHours();
                            return v < 12 ? 'AM' : 'PM';
                        case "y":
                        case "yy":
                        case "yyy":
                        case "yyyy":
                        case "yyyyy":
                            r += _padStart((utc ? date.getUTCFullYear() : date.getFullYear()).toString(), tl, '0');
                            continue;
                        case "z":
                        case "zz":
                            var v = date.getTimezoneOffset();
                            var v2 = Math.abs(v) % 60;
                            r += (v >= 0 ? '+' : '-') + _padStart(Math.floor(Math.abs(v / 60)).toString(), tl, '0') + (v2 > 0 ? ":" + _padStart(v2.toString(), 2, '0') : "");
                            continue;
                    }
                    break;
            }
            throw "Invalid format";
        }

        return r;
    }

    function _parseDateFormat(format: string): IDateFormatToken[] {
        var tokens: IDateFormatToken[] = [];
        var escaped = false;
        var prev: IDateFormatToken;
        var quote: string = null;
        for (var i = 0; i < format.length; i++) {
            var c = format.charAt(i);
            if (quote) {
                if (escaped) {
                }
            }
            if (escaped) {
                if (!prev || prev.type !== DateFormatTokenType.Literal) {
                    prev = {
                        token: c,
                        type: DateFormatTokenType.Literal
                    };
                    tokens.push(prev);
                } else {
                    prev.token += c;
                }
                escaped = false;
            } else if (quote) {
                if (c === quote) {
                    quote = null;
                } else if (c === '\\') {
                    escaped = true;
                } else {
                    if (!prev || prev.type !== DateFormatTokenType.Literal) {
                        prev = {
                            token: c,
                            type: DateFormatTokenType.Literal
                        };
                        tokens.push(prev);
                    } else {
                        prev.token += c;
                    }
                }
            } else {
                switch (c) {
                    case 'd':
                    case 'f':
                    case 'F':
                    case 'g':
                    case 'h':
                    case 'H':
                    case 'K':
                    case 'm':
                    case 'M':
                    case 's':
                    case 't':
                    case 'y':
                    case 'z':
                        if (!prev || prev.type !== DateFormatTokenType.Value || prev.token.charAt(0) !== c) {
                            prev = {
                                token: c,
                                type: DateFormatTokenType.Value
                            };
                            tokens.push(prev);
                        } else {
                            prev.token += c;
                        }
                        break;
                    case '%':
                        prev = null;
                        break;
                    case ':':
                        prev = null;
                        tokens.push({
                            token: c,
                            type: DateFormatTokenType.TimeSeparator
                        });
                        break;
                    case '/':
                        prev = null;
                        tokens.push({
                            token: c,
                            type: DateFormatTokenType.DateSeparator
                        });
                        break;
                    case '\\':
                        prev = null;
                        escaped = true;
                        break;
                    case '\'':
                    case '"':
                        prev = null;
                        quote = c;
                        break;
                    default:
                        if (!prev || prev.type !== DateFormatTokenType.Literal) {
                            prev = {
                                token: c,
                                type: DateFormatTokenType.Literal
                            };
                            tokens.push(prev);
                        } else {
                            prev.token += c;
                        }
                        break;
                }
            }
        }

        return tokens;
    }

    // #endregion formatDate
}