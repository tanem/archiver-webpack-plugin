# Migrating

Details relating to major changes that aren't presently in `CHANGELOG.md`, due to limitations with how that file is being generated.

## v10.0.0

**Added**

- Added Node.js v22 support.

**Removed**

- Dropped Node.js v16 support.

## v9.0.0

**Removed**

- Dropped Node.js v14 support.

## v8.0.0

**Added**

- Added Node.js v18 support.

**Changed**

- `readdir-glob` is now used instead of `glob`.

## v7.0.0

**Removed**

- Dropped Node.js v12 support.

## v6.0.0

**Removed**

- Dropped Node.js v10 support.

## v5.0.0

**Removed**

- Dropped Node.js v8 support.

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
