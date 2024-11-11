import { StateNode } from 'tldraw';

// Position offset for placing icons slightly away from the pointer location
const OFFSET = 12;

// Toilets Sticker Tool
export class ToiletsTool extends StateNode {
  static override id = 'toilets'; // Unique ID for the ToiletsTool

  // Set cursor to a crosshair when the tool is activated
  override onEnter() {
    this.editor.setCursor({ type: 'cross', rotation: 0 });
  }

  // Create the toilet icon shape on the canvas at the pointer position
  override onPointerDown() {
    const { currentPagePoint } = this.editor.inputs; // Get current pointer location
    this.editor.createShape({
      type: 'text',                     // Shape type set to text for emoji rendering
      x: currentPagePoint.x - OFFSET,   // Adjust x position by offset
      y: currentPagePoint.y - OFFSET,   // Adjust y position by offset
      props: { text: '🚻' },            // Set text property to the toilet emoji
    });
  }
}

// Food Sticker Tool
export class FoodTool extends StateNode {
  static override id = 'food'; // Unique ID for the FoodTool

  // Set cursor to a crosshair when the tool is activated
  override onEnter() {
    this.editor.setCursor({ type: 'cross', rotation: 0 });
  }

  // Create the food icon shape on the canvas at the pointer position
  override onPointerDown() {
    const { currentPagePoint } = this.editor.inputs; // Get current pointer location
    this.editor.createShape({
      type: 'text',                     // Shape type set to text for emoji rendering
      x: currentPagePoint.x - OFFSET,   // Adjust x position by offset
      y: currentPagePoint.y - OFFSET,   // Adjust y position by offset
      props: { text: '🍴' },            // Set text property to the food emoji
    });
  }
}
