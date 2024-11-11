// custom-tools.ts
import { StateNode } from 'tldraw'

const OFFSET = 12

// Toilets Sticker Tool
export class ToiletsTool extends StateNode {
    static override id = 'toilets'
  
    override onEnter() {
      this.editor.setCursor({ type: 'cross', rotation: 0 })
    }
  
    override onPointerDown() {
      const { currentPagePoint } = this.editor.inputs
      this.editor.createShape({
        type: 'text',
        x: currentPagePoint.x - OFFSET,
        y: currentPagePoint.y - OFFSET,
        props: { text: '🚻',
        

         }, // Toilets icon
        
      })
    }
  }
  
  // Food Sticker Tool
  export class FoodTool extends StateNode {
    static override id = 'food'
  
    override onEnter() {
      this.editor.setCursor({ type: 'cross', rotation: 0 })
    }
  
    override onPointerDown() {
      const { currentPagePoint } = this.editor.inputs
      this.editor.createShape({
        type: 'text',
        x: currentPagePoint.x - OFFSET,
        y: currentPagePoint.y - OFFSET,
        props: { text: '🍴',

         }, // Food icon (fork and knife)
      })
    }
  }
  

