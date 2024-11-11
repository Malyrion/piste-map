// ui-overrides.ts
import { TLUiOverrides } from 'tldraw'

export const uiOverrides: TLUiOverrides = {
    tools(editor, tools) {
      tools.toilets = {
        id: 'toilets',
        icon: 'toilets-icon',
        label: 'Toilets',
        kbd: 't',
        onSelect: () => editor.setCurrentTool('toilets'),
      }
      tools.food = {
        id: 'food',
        icon: 'food-icon',
        label: 'Food',
        kbd: 'f',
        onSelect: () => editor.setCurrentTool('food'),
      }
      return tools
    },
  }
  