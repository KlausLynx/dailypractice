# Exercise 5: Redux DevTools detective

## (a) Time-travel back three actions

- Opened the **Redux** tab in the browser DevTools (F12).
- Hovered over an action in the list on the left and clicked **Jump**.
- The app changed to how it looked right after that action. Later todos (and the "Loaded 10 users" todo) disappeared.
- Nothing was deleted. Jumping only shows an earlier moment, and jumping to the last action brings the app back to the present.

## (b) Diff tab: which action changed `filter`

- Clicked an action in the list, then opened the **Diff** tab.
- Diff compares the state before and after one action and shows only what changed.
- The action that changed `filter` was `todo/filterChanged`.
  Diff showed: `todo > filter`, `"all"` (red, before) → `"active"` (green, after).
- Other actions did not touch `filter`. For example, `todo/todoToggled` showed `completed` changing from `false` (red) to `true` (green).

## (c) Dispatch a custom action from the dispatcher

Opened the **Dispatcher** panel in the Redux tab and sent:

```javascript
{
  type: 'todo/todoAdded',
  payload: {
    id: 'abc123',
    text: 'Added from DevTools',
    completed: false,
    createdAt: '2026-10-28T10:00:00.000Z'
  }
}
```

- The action type is the slice name plus the reducer name (`'todo'` + `'todoAdded'`). My slice is named `'todo'`, so it is `todo/todoAdded`.
- The todo appeared in the app.

## One thing I noticed

Dispatching an action by hand **skips `prepare`**. When I sent only `{ text: 'hi' }` as the payload, the todo was added with no `id`, because `prepare` (which makes the `id`, `completed` and `createdAt`) never ran. When you dispatch by hand, you have to write those values yourself.