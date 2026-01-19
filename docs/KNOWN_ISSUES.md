# Known Issues

## Active
*No active bugs at this time.*

## Resolved
### [BUG-002] Language Change Requires Reload
**Severity**: Medium
**Status**: Fixed (v1.2.1)
**Description**: Changing the language via the Settings menu updates the user profile but does not immediately reflect in the application UI (specifically the Shopping List). Users must restart/reload the app to see the change.
**Fix**: Added language change event listener in `App.jsx` that forces re-render of main content when language changes. The `<main>` element now uses `key={currentLanguage}` to ensure complete re-mount on language switch.
**Reported**: 2026-01-19
**Resolved**: 2026-01-19

### [BUG-001] Norwegian Language Detection & Lint Error
**Severity**: Low
**Status**: Fixed (v1.2.0)
**Description**: 
1.  Lint error in `App.jsx` due to direct mutation of `i18n` object.
2.  Targeting `nb` / `nb-NO` locale did not correctly show "Norsk" in the settings dropdown.
**Fix**: Refactored `App.jsx` to use `useRef` and updated `SettingsMenu.jsx` selector logic.
