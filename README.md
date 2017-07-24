# SharpFormatter

TypeScript implementation for .NET-style value formatter.

## Usage

```
<script src="SharpFormatter.js"></script>

Shipwreck.SharpFormatter.format('format {0} and {1}', [arg1, arg2]);
```
## Supported types

`number` and 'Date'. Other values will be converted by `toString()`.

You can register custom `IFormatter` to `SharpFormatter.formatters`.

## Globalization

To enable globalization, you must load `CultureInfo.js`. Otherwise, invariant culture number format will be used.

You can specify two letter language code as the third argument.

### Limitation

SharpFormatter is basically designed to work strictly same as `System.Double` and `System.DateTimeOffset`. But there are some difference. SharpFormatter is currently ignoring non-gregorian Calendars. Known errors for standard cultures and formats are below:

|Type|Culture|format|Difference|
|--|--|--|--|
|Date|ar, fa, ps, th|*|Not a gregorian calendar.|
|Date|ky|d, g, G|Outputs genitive month name.|
|Date|lo, ti|D, f, F, U|Era is always 'A.D.'.|
|Date|ca, gl, oc|y, Y|Outputs non-genitive month name.|

## License

MIT License