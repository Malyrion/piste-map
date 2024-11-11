## Piste Map annotation webapp:
- An app that allows muliple users to upload an image and add annotations in real-time to create a piste map.
## Libraries and Frameworks Used

![React](https://img.shields.io/badge/React-18.3.1-blue)
![Next.js](https://img.shields.io/badge/Next.js-15.0.3-black)
![Tldraw](https://img.shields.io/badge/Tldraw-3.4.1-orange)
![Axios](https://img.shields.io/badge/Axios-1.7.7-red)
![Liveblocks](https://img.shields.io/badge/Liveblocks-2.11.0-lightgrey)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6.3-blue)

### Instructions :
- Clone this repository : `https://github.com/Malyrion/piste-map`
- Install needed packages : `npm install`
- Replace your API key from Liveblocks
- Start local environment: `npm run dev`

## System Architecture

- **Frontend:** [React](https://reactjs.org/)
  - A JavaScript library for building user interfaces.

- **Backend:** [Next.js](https://nextjs.org/)
  - A React framework built on Node.js, enabling server-side rendering and static site generation.

- **Hosting:** [Vercel](https://vercel.com/)
  - Provides optimized hosting for Next.js applications with seamless integration.

- **Database:** [Vercel Postgres](https://vercel.com/postgres)
  - A managed PostgreSQL service by Vercel, ideal for reliable data storage.

- **Third-Party Integrations:**
  - **[Liveblocks](https://liveblocks.io/):** Offers APIs for real-time multiplayer collaboration.
  - **[Tldraw](https://tldraw.dev/):** Provides a customizable canvas equipped with various drawing tools.
    
## Key descisions 
- Use of Next js with Vercel allows to host and manage dabase from one place, making the project easier to manage.
- Use of Liveblocks was made as it had good examples on integration with Next.js and also included example of adding Tldraw that had a lot of usefull components needed for the app
- SQL database, used to store the snapshots of the board state. That can be sotred and restored from the database
## Next steps:
- Add a custom UI login interface before loading the Tldraw component and pass it the name and generated roomId.
- Display all current rooms on the canvas and allow the user to switch between the rooms by clicking on it.
- Set custom premission for the users to only allow editing of room with the roomId linked to thier name
- Upload user infomation to database when thier board is saved
- Remake the toolbar to have only needed tools and icons

## Porject Structure
- `tsconfig.json` -> TypeScript configuration file.
- `liveblocks.config.ts `-> Configuration file for the interfaces of Liveblocks elements, detailing the data they pass.
- `pages/api `-> Folder path for the API endpoints defined in the project.
- `pages/api/loadBoard.ts` -> API file used to manage database calls, specifically for loading the last saved version of the board.
- `pages/api/saveBoard.ts` -> API file used to save snapshots of the Tldraw board to the SQL database.
- `app/components/CollaborativeApp.tsx` -> Component that initializes the Tldraw canvas, including button logic for saving and loading the board state from the database.
- `app/components/Room.tsx` -> Room component that includes the LiveblocksProvider wrapper with apiKey, RoomProvider instance, fallback configuration, initial mouse position presence, and child components as props.
- `app/components/assets-urls.tsx` -> Imports TLUiAssetUrlOverrides from Tldraw to specify URLs for images used in custom tooltips.
- `app/components/components.tsx` -> Extends TLComponents and DefaultToolbar of Tldraw with additional tools for inserting specific text icons.
- `app/components/custom-tools.tsx` -> File defining properties of custom tools.
- `app/components/ui-overrides.ts` -> Ui override component to overwrite custom tooltip in Tldraw
 
## Database Structure

Here are some database entries used to store and load the board snapshots:

![image](https://github.com/user-attachments/assets/75398fa0-703f-4460-a7f1-13b9472374f9)

The database will have to be changed to account for users and keep track of all boards that they have made; it should look something like this:

![image](https://github.com/user-attachments/assets/71663ee0-ac59-4e26-a18d-a32e0b4fa7b3)

It can then be used to display all boards that the user owns on the canvas.


  
