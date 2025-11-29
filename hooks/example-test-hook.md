# Example Kiro Hook: Auto-Test on Save

This is an example of how you could create a Kiro agent hook for the Frankenstein Web Lab.

## Hook Configuration

**Trigger**: On file save
**Target Files**: `src/components/**/*.jsx`
**Action**: Run component validation

## Hook Logic

When a React component is saved:
1. Check for syntax errors
2. Verify imports are correct
3. Ensure component exports properly
4. Check for common React anti-patterns
5. Validate prop types (if using)

## Example Hook Code

```javascript
{
  "name": "Component Validator",
  "trigger": "onSave",
  "filePattern": "src/components/**/*.jsx",
  "action": "validate-component",
  "description": "Validates React components on save"
}
```

## Other Useful Hooks for This Project

### 1. Auto-Format CSS
- Trigger: On save
- Files: `*.css`
- Action: Format with consistent spacing

### 2. API Endpoint Sync
- Trigger: On backend route change
- Files: `backend/routes/*.js`
- Action: Update frontend API service

### 3. Theme Consistency Check
- Trigger: On CSS save
- Files: `src/styles/*.css`
- Action: Verify color variables match theme

### 4. MongoDB Model Validator
- Trigger: On model save
- Files: `backend/models/*.js`
- Action: Validate schema structure

## How to Create Hooks

1. Open Command Palette (Ctrl+Shift+P)
2. Search for "Open Kiro Hook UI"
3. Create new hook with your configuration
4. Test the hook by triggering the event

## Benefits for Frankenstein Lab

- Catch errors before runtime
- Maintain consistent code style
- Ensure theme colors stay consistent
- Validate API contracts
- Speed up development workflow

---

**Note**: This is an example. Create actual hooks through the Kiro UI.
