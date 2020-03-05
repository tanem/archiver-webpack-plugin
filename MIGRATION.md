# Migrating

Details relating to major changes that aren't presently in `CHANGELOG.md`, due to limitations with how that file is being generated.

## v4.0.0

This release switched from default to named exports.

**Changed**

- `ArchiverWebpackPlugin` is now a named export.

## v3.0.0

This release added the ability to create `.tar` and `.tar.gz` archives.

**Added**

- `format` parameter. This is required since we no longer just create `.zip` archives by default.
- `formatOptions` option.

## v2.0.0

This release added the ability to specify glob options.

**Added**

- `globOptions` option.

**Changed**

- `glob` option renamed to `globPattern`.
