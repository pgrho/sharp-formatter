# SharpFormatter

TypeScript implementation for .NET-style value formatter.

## Usage

```
<script src="SharpFormatter.js"></script>

Shipwreck.SharpFormatter.format('format {0} and {1}', [arg1, arg2]);
```
## Supported types

`number` only. Other values will be converted by `toString()`.

You can register custom `IFormatter` to `SharpFormatter.formatters`.

## Globalization

To enable globalization, you must load `CultureInfo.js`. Otherwise, invariant culture number format will be used.

You can specify two letter language code as the third argument.

## License

MIT License