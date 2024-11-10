import { Room } from "./components/Room";
import { CollaborativeApp } from "./components/CollaborativeApp";

export default function Page() {
  return (
    <Room userId='1001' roomId='room1001' >
      <CollaborativeApp />
    </Room>
  );
}