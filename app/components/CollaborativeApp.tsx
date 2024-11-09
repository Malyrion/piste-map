"use client";
import { Tldraw } from 'tldraw'
import { useSyncDemo } from '@tldraw/sync'

import 'tldraw/tldraw.css'
import { useOthers } from "@liveblocks/react/suspense";

export function CollaborativeApp() {
    const handleMount = (editor:any) => {
		editor.createShape({
			type: 'text',
			x: 200,
			y: 200,
			props: {
				text: 'Hello world!',
			},
		})

		editor.selectAll()

		editor.zoomToSelection({
			animation: { duration: 5000 },
		})
	}


    const store = useSyncDemo({ roomId: 'myapp-abc125'})
    const others = useOthers();
    const userCount = others.length;
return (
<>
  <div>There are {userCount} other user(s) online</div>
    <div style={{ position: 'fixed', inset: 0 }}>
			<Tldraw onMount={handleMount} store={store} />
	</div>
</>);
}