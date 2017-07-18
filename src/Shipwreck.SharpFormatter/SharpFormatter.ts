module Shipwreck {
    export class SharpFormatter {
        public static formatNumber(value: number, format: string) {
            if (!format) {
                return SharpFormatter.formatNumber(value, "g");
            }
            if (/^[Cc][0-9]*$/.test(format)) {
            } else if (/^[Dd][0-9]*$/.test(format)) {
                var length = format.length === 1 ? 0 : parseInt(format.substring(1), 10);
                var r = value.toFixed();
                while (r.length < length) {
                    r = '0' + r;
                }
                return r;
            } else if (/^[Ee][0-9]*$/.test(format)) {
                return this._formatExponentialNumber(value, format.length === 1 ? 6 : parseInt(format.substring(1), 10), format.charAt(0) === 'E');
            } else if (/^[Ff][0-9]*$/.test(format)) {
                var length = format.length === 1 ? 2 : parseInt(format.substring(1), 10);
                return value.toFixed(length);
            } else if (/^[Gg][0-9]*$/.test(format)) {
                var length = format.length === 1 ? 15 : parseInt(format.substring(1), 10);
                var r = SharpFormatter._formatExponentialNumber(value, length, false);
                if (/[Ee]-?[0-9]$/.test(r)) {
                    var i = r.length - RegExp.length;
                    var e = parseInt(format.substring(i + 1), 10);
                    if (-5 < e && e < length) {
                        return value.toFixed(length);
                    }
                }
                return format.charAt(0) === 'G' ? r.toUpperCase() : r;
                //} else if (/^[Nn][0-9]*$/.test(format)) {
                //    var length = format.length === 1 ? 2 : parseInt(format.substring(1), 10);
                //    var r = value.toFixed(length);
                //    var dp = r.indexOf('.');
            } else if (/^[Pp][0-9]*$/.test(format)) {
                var length = format.length === 1 ? 2 : parseInt(format.substring(1), 10);
                return (value * 100).toFixed(length) + "%";

                //} else if (/^[Rr][0-9]*$/.test(format)) {
                //} else if (/^[Xx][0-9]*$/.test(format)) {
            } else if (/^.$/) {
                throw "Invalid format";
            } else {
                throw "Not implemented";
                // custom:
            }
        }
        private static _formatExponentialNumber(value: number, length: number, capital: boolean): string {
            length = length >= 0 ? length : 6;
            var r = value.toExponential(length);
            r = r.replace(/[-+][0-9]{1,2}$/, m => m.charAt(0) + (m.length === 2 ? "00" : "0") + m.substring(1));
            return capital ? r.toUpperCase() : r;
        }
    }
}