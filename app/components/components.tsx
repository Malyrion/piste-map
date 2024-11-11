import {
  TLComponents,
  DefaultToolbar,
  DefaultToolbarContent,
  TldrawUiMenuItem,
  useIsToolSelected,
  useTools,
} from 'tldraw'

export const components: TLComponents = {
  Toolbar: (props) => {
    const tools = useTools()
    const isToiletsSelected = useIsToolSelected(tools['toilets'])
    const isFoodSelected = useIsToolSelected(tools['food'])

    return (
      <DefaultToolbar {...props}>
        {/* Add Toilets tool to the toolbar */}
        <TldrawUiMenuItem {...tools['toilets']} isSelected={isToiletsSelected} />
        
        {/* Add Food tool to the toolbar */}
        <TldrawUiMenuItem {...tools['food']} isSelected={isFoodSelected} />
        
        <DefaultToolbarContent />
      </DefaultToolbar>
    )
  },
}
