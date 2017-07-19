module Shipwreck {

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
    interface IToken {
        token: string;
        type: number;
    }
    interface ISection {
        tokens: IToken[];
        dot: number;
        exponential: boolean;
        coefficient: number;
        grouped: boolean;
        integerDigits: number;
        fractionDigits: number;
        firstPlaceholder: number;
    }
    export interface IFormatter {
        canFormat(obj: any): boolean;
        format(obj: any, format: string, culture: CultureInfo): string;
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
    export class SharpFormatter {
        private static _getCulture(culture: string | CultureInfo): CultureInfo {
            if (culture) {
                if ((culture as CultureInfo).negativeSign) {
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
            }]);
        }

        public static format(format: string, args: any[], culture?: string | CultureInfo) {
            var r = '';

            const S_LITERAL = 0;
            const S_OPENING = 1;
            const S_INDEX = 2;
            const S_ALIGNMENT = 3;
            const S_FORMAT = 4;

            var ci = SharpFormatter._getCulture(culture);

            var s = S_LITERAL;
            var index = 0;
            var align = 0;
            var alignSign = 1;
            var valueFormat: string;

            for (var i = 0; i < format.length; i++) {
                var c = format.charAt(i);

                switch (s) {
                    case S_LITERAL:
                        switch (c) {
                            case '{':
                                s = S_OPENING;
                                index = 0;
                                break;
                            default:
                                r += c;
                                break;
                        }
                        break;
                    case S_OPENING:
                        switch (c) {
                            case '{':
                                r += '{';
                                s = S_LITERAL;
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
                                index = parseInt(c);
                                align = 0;
                                valueFormat = '';
                                s = S_INDEX;
                                break;
                            default:
                                throw "Invalid format";
                        }
                        break;
                    case S_INDEX:
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
                                index = index * 10 + parseInt(c);
                                break;
                            case ',':
                                s = S_ALIGNMENT;
                                align = 0;
                                alignSign = 1;
                                break;
                            case ':':
                                s = S_FORMAT;
                                valueFormat = '';
                                break;
                            case '}':
                                var v = args[index];
                                var formatter = SharpFormatter.formatters.filter(f => f.canFormat(v))[0];
                                r += formatter ? formatter.format(v, null, ci) : (v ? v.toString() : '');
                                s = S_LITERAL;
                                break;
                            default:
                                throw "Invalid format";
                        }
                        break;
                    case S_ALIGNMENT:
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
                                align = 10 * align + parseInt(c);
                                break;
                            case ':':
                                s = S_FORMAT;
                                valueFormat = '';
                                break;
                            case '}':
                                var v = args[index];
                                var formatter = SharpFormatter.formatters.filter(f => f.canFormat(v))[0];
                                var vs = formatter ? formatter.format(v, null, ci) : (v ? v.toString() : '');
                                r += alignSign > 0 ? _padStart(vs, align, ' ') : _padEnd(vs, align, ' ');
                                s = S_LITERAL;
                                break;
                            default:
                                throw "Invalid format";
                        }
                        break;
                    case S_FORMAT:
                        if (c === '}') {
                            var v = args[index];
                            var formatter = SharpFormatter.formatters.filter(f => f.canFormat(v))[0];
                            var vs = formatter ? formatter.format(v, valueFormat, ci) : (v ? v.toString() : '');
                            if (align > 0) {
                                vs = alignSign > 0 ? _padStart(vs, align, ' ') : _padEnd(vs, align, ' ');
                            }
                            r += vs;
                            s = S_LITERAL;
                        } else {
                            valueFormat += c;
                        }
                        break;
                }
            }
            return r;
        }

        public static formatNumber(value: number, format: string, culture?: string | CultureInfo) {
            var T = SharpFormatter;

            return new NumberFormattingContext(SharpFormatter._getCulture(culture)).format(value, format);
        }
    }

    const TOKEN_TYPE_LITERAL = -1;
    const TOKEN_TYPE_ZERO = 0;
    const TOKEN_TYPE_NUMBER = 1;
    const TOKEN_TYPE_DOT = 2;
    const TOKEN_TYPE_GROUP = 3;
    const TOKEN_TYPE_PERCENT = 4;
    const TOKEN_TYPE_PERMILL = 5;
    const TOKEN_TYPE_EXPONENTIAL = 6;
    class NumberFormattingContext {
        private c: CultureInfo;
        constructor(culture: CultureInfo) {
            this.c = culture;
        }

        get NaNSymbol(): string {
            return this.c ? this.c.NaNSymbol : "NaN";
        }

        get positiveInifinitySymbol(): string {
            return this.c ? this.c.positiveInifinitySymbol : "Infinity";
        }

        get negativeInifinitySymbol(): string {
            return this.c ? this.c.negativeInifinitySymbol : "-Infinity";
        }
        get positiveSign(): string {
            return this.c ? this.c.positiveSign : "+";
        }
        get negativeSign(): string {
            return this.c ? this.c.negativeSign : "-";
        }

        get percentSymbol(): string {
            return this.c ? this.c.percentSymbol : "%";
        }

        get currencySymbol(): string {
            return this.c ? this.c.currencySymbol : '¤';
        }

        invariantType(): INumberTypeInfo {
            return {
                decimalSeparator: '.',
                decimalDigits: 2,
                groupSeparator: ',',
                groupSizes: [3]
            };
        }

        numberType(): INumberTypeInfo {
            return this.c ? this.c.numberType() : this.invariantType();
        }
        get numberDecimalSeparator(): string {
            return this.c ? this.c.numberDecimalSeparator : '.';
        }

        get numberNegativePattern(): SymbolPosition {
            return this.c ? this.c.numberNegativePattern : SymbolPosition.Left;
        }

        currencyType(): INumberTypeInfo {
            return this.c ? this.c.currencyType() : this.invariantType();
        }

        get currencyPositivePattern(): SymbolPosition {
            return this.c ? this.c.currencyPositivePattern : SymbolPosition.Left;
        }

        get currencyNegativePattern(): SymbolNegativePattern {
            return this.c ? this.c.currencyNegativePattern : SymbolNegativePattern.ParenthesizedLeft;
        }

        percentType(): INumberTypeInfo {
            return this.c ? this.c.percentType() : this.invariantType();
        }

        get percentPositivePattern(): SymbolPosition {
            return this.c ? this.c.percentPositivePattern : SymbolPosition.RightWithSpace;
        }

        get percentNegativePattern(): SymbolNegativePattern {
            return this.c ? this.c.percentNegativePattern : SymbolNegativePattern.SignNumberSpaceSymbol;
        }

        _appendNegative(value: number, text: string) {
            return value >= 0 ? text : (this.negativeSign + text);
        }

        public format(value: number, format: string) {
            if (!format) {
                return this.format(value, "g");
            }

            value = value * 1;

            if (!isFinite(value)) {
                if (isNaN(value)) {
                    return this.NaNSymbol;
                } else if (value > 0) {
                    return this.positiveInifinitySymbol;
                } else {
                    return this.negativeInifinitySymbol;
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
                        var r = this._formatNumeric(Math.abs(value), length, this.currencyType());
                        if (value < 0) {
                            return _formatSymbolNegativePattern(this.currencyNegativePattern, r, this.negativeSign, this.currencySymbol);
                        } else {
                            return _formatSymbolPattern(this.currencyPositivePattern, r, this.currencySymbol);
                        }
                    case 0x44: // 'D':
                    case 0x64: // 'd':
                        return this._appendNegative(value, _padStart(Math.abs(value).toFixed(), Math.max(0, length), '0'));
                    case 0x45: // 'E':
                    case 0x65: // 'e':
                        return this._appendNegative(value, this._formatExponential(Math.abs(value), length < 0 ? 6 : length, type == 0x45));
                    case 0x46: // 'F':
                    case 0x66: // 'f':
                        var nt = this.numberType();
                        var r = this._appendNegative(value, Math.abs(value).toFixed(length >= 0 ? length : nt.decimalDigits));
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
                            r = Math.abs(exp) < 10 ? ((Math.abs(value) * Math.pow(10, -exp)).toFixed(length - 1) + (type === 0x47 ? 'E' : 'e') + (exp >= 0 ? this.positiveSign : this.negativeSign) + '0' + Math.abs(exp)) : Math.abs(value).toExponential(length - 1);
                            if (this.positiveSign !== '+') {
                                r = r.replace('+', this.positiveSign);
                            }
                            if (Math.abs(exp) > 9 && type === 0x47) {
                                r = r.replace('e', 'E');
                            }
                        }
                        if (this.numberDecimalSeparator !== '.') {
                            r = r.replace('.', this.numberDecimalSeparator);
                        }
                        return this._appendNegative(value, r);

                    case 0x4e: // 'N'
                    case 0x6e: // 'n'
                        var r = this._formatNumeric(Math.abs(value), length, this.numberType());
                        if (value < 0) {
                            return _formatSymbolPattern(this.numberNegativePattern, r, this.negativeSign);
                        }
                        return r;

                    case 0x50: // 'P'
                    case 0x70: // 'p'
                        var r = this._formatNumeric(Math.abs(value) * 100, length, this.percentType());
                        if (value < 0) {
                            return _formatSymbolNegativePattern(this.percentNegativePattern, r, this.negativeSign, this.percentSymbol);
                        } else {
                            return _formatSymbolPattern(this.percentPositivePattern, r, this.percentSymbol);
                        }
                }
            } else if (/^.$/.test(format)) {
                throw "Invalid format";
            }

            return this._formatCustom(value, format);
        }

        private _formatExponential(value: number, length: number, capital: boolean): string {
            length = length >= 0 ? length : 6;
            var r = value.toExponential(length);
            var di = r.lastIndexOf('.');
            r = r.replace(/[-+][0-9]{1,2}$/, m => m.charAt(0) + (m.length === 2 ? "00" : "0") + m.substring(1));
            if (this.negativeSign !== '-' || this.positiveSign !== '+' || this.numberDecimalSeparator !== '.') {
                r = r.replace(/[-+.]/, v => v === '-' ? this.negativeSign : v === '+' ? this.positiveSign : this.numberDecimalSeparator);
            }
            return capital ? r.toUpperCase() : r;
        }
        private _formatNumeric(value: number, length: number, typeInfo: INumberTypeInfo): string {
            var r = value.toFixed(length >= 0 ? length : typeInfo.decimalDigits);
            var dp = r.indexOf('.');
            if (dp < 0) {
                dp = r.length;
            } else if (typeInfo.decimalSeparator !== '.') {
                r = r.substr(0, dp) + typeInfo.decimalSeparator + r.substring(dp + 1);
            }
            var size = typeInfo.groupSizes[0];
            var si = 0;
            var sep = typeInfo.groupSeparator;
            for (var i = dp - size; i > 0; i -= size) {
                r = r.substr(0, i) + sep + r.substring(i);
                if (++si < typeInfo.groupSizes.length) {
                    size = typeInfo.groupSizes[si];
                    if (size == 0) {
                        break;
                    }
                }
            }
            return r;
        }
        private _formatCustom(value: number, format: string): string {
            var sections = NumberFormattingContext._parseCustom(format);
            if (sections.length === 1) {
                return this._appendNegative(value, this._formatSection(Math.abs(value), sections[0]));
            } else if (sections.length === 2) {
                return this._formatSection(Math.abs(value), value < 0 ? sections[1] : sections[0]);
            } else {
                var sec: ISection;
                if (value > 0) {
                    sec = sections[0];
                } else if (value < 0) {
                    sec = sections[1];
                    if (sec.tokens.length == 0) {
                        sec = sections[0];
                    }
                } else {
                    sec = sections[2];
                }
                return this._formatSection(Math.abs(value), sec);
            }
        }

        private static _parseCustom(format: string): ISection[] {
            var sec: IToken[] = [];
            var sections: IToken[][] = [sec];
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
                        sec.push({ token: buff, type: TOKEN_TYPE_LITERAL });
                        buff = "";
                        quote = null;
                    } else {
                        buff += c;
                    }
                    continue;
                } else if (exp) {
                    if (c === '0') {
                        sec.push({ token: buff + c, type: TOKEN_TYPE_EXPONENTIAL });
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
                            sec.push({ token: buff, type: TOKEN_TYPE_LITERAL });
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
                        sec.push({ token: c, type: TOKEN_TYPE_ZERO });
                        break;
                    case '#':
                        sec.push({ token: c, type: TOKEN_TYPE_NUMBER });
                        break;
                    case '.':
                        sec.push({ token: c, type: TOKEN_TYPE_DOT });
                        break;
                    case ',':
                        sec.push({ token: c, type: TOKEN_TYPE_GROUP });
                        break;
                    case '%':
                        sec.push({ token: c, type: TOKEN_TYPE_PERCENT });
                        break;
                    case '‰':
                        sec.push({ token: c, type: TOKEN_TYPE_PERMILL });
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
                sec.push({ token: buff, type: TOKEN_TYPE_LITERAL });
            }

            var r: ISection[] = [];

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
                        case TOKEN_TYPE_ZERO:
                            if (fz < 0) {
                                fz = i;
                            }
                            lz = i;
                        case TOKEN_TYPE_NUMBER:
                            if (dotPos >= 0) {
                                fl++;
                            } else {
                                il++;
                            }
                            if (fp < 0) {
                                fp = i;
                            }
                            break;
                        case TOKEN_TYPE_DOT:
                            if (dotPos < 0) {
                                dotPos = i;
                            }
                            break;
                        case TOKEN_TYPE_GROUP:
                            if (dotPos < 0) {
                                var found = false;
                                for (var j = i + 1; j < sec.length; j++) {
                                    var ls = sec[j];
                                    if (ls.type === TOKEN_TYPE_DOT) {
                                        break;
                                    } else if (ls.type === TOKEN_TYPE_ZERO || ls.type === TOKEN_TYPE_NUMBER) {
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
                        case TOKEN_TYPE_PERCENT:
                            coeff *= 100;
                            break;
                        case TOKEN_TYPE_PERMILL:
                            coeff *= 1000;
                            break;
                        case TOKEN_TYPE_EXPONENTIAL:
                            hasExp = true;
                            break;
                    }
                }
                for (var i = fz + 1; i < lz; i++) {
                    var t = sec[i];
                    if (t.type === TOKEN_TYPE_NUMBER) {
                        t.type = TOKEN_TYPE_ZERO;
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

        private _formatSection(value: number, sec: ISection): string {
            var v = value * sec.coefficient, exp = 0;

            if (sec.exponential) {
                exp = Math.floor(Math.log(v) / Math.LN10) - Math.max(sec.integerDigits - 1, 0);
                v *= Math.pow(10, -exp);
            }

            var vs = v.toFixed(sec.fractionDigits);
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
            var nt = this.numberType();
            var sizes = nt.groupSizes;
            var gs = sec.grouped ? sizes[0] - 1 : NaN;
            var gi = 1;
            var ld = -1;

            for (var i = sec.tokens.length - 1; i >= 0; i--) {
                var t = sec.tokens[i];
                switch (t.type) {
                    case TOKEN_TYPE_ZERO:
                    case TOKEN_TYPE_NUMBER:
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
                                    && (prev.type === TOKEN_TYPE_ZERO || (prev.type === TOKEN_TYPE_NUMBER && j > 0))) {
                                    r = nt.groupSeparator + vs.charAt(j) + r;
                                    gs += gi < sizes.length ? sizes[gi++] : sizes[sizes.length - 1];
                                } else {
                                    r = vs.charAt(j) + r;
                                }
                            }
                            ld = Math.max(ld, i);
                        } else if (t.type === TOKEN_TYPE_ZERO) {
                            r = '0' + r;
                            ld = Math.max(ld, i);
                        }
                        ple++;
                        break;
                    case TOKEN_TYPE_LITERAL:
                    case TOKEN_TYPE_PERMILL:
                        r = t.token + r;
                        break;
                    case TOKEN_TYPE_DOT:
                        if (i === sec.dot && ld > -1) {
                            r = nt.decimalSeparator + r;
                        }
                        break;

                    case TOKEN_TYPE_PERCENT:
                        r = this.percentSymbol + r;
                        break;

                    case TOKEN_TYPE_EXPONENTIAL:
                        r = t.token.charAt(0) +
                            (exp >= 0 ? (t.token.charAt(1) === '+' ? this.positiveSign : '') : this.negativeSign) +
                            Math.abs(exp) +
                            r;
                        break;

                    case TOKEN_TYPE_GROUP:
                    default:
                        break;
                }
            }

            return r;
        }
    }
}