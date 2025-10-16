# Eng Techno: Podcast Player

## Frontend

SPA application with 3 main components:
* Podcast View
* Article View
* Audio Player View

Each is wired to a consistent userflow with a solid state management and proper memoization handling.

### Tech Stack
* Next JS
* Bootstrap v5.3 (for responsive designs)
* @payloadcms/richtext-lexical (for rendering rich-text obtained from Payload on the backend)
* ESLint (configured in `eslint.config.mjs`)

### Installation

1. **Env** file setup
	* `BACKEND_URL`: string <br/> (base-link for api) <br/> Note: Link should have the following available routes:
		* `/get-article`
		* `/get-podcasts`

2. run `npm run dev`

### Endpoints

* `/`: the SPA application

* `/api/get-podcasts`: 
	> Method: **GET** \
			Res: 200 | 500
	
	> **Res-body**
	```json
	{ 
		"data": ["..."] 
	}
	```

* `/api/get-article`: 
	> Method: **GET** \
			Res: 200 | 500

	> **Params**: \
		id: string

	> **Res-Body**
	```json
	{ 
		"data": ["..."] 
	}
	```

### Tasklist

#### Completed

- [x] Podcast List View
- [x] Audio player View
> Note: Shuffle button logic isn't implemented: Figma file doesn't provide a view about how to implement the playlist.
- [x] Article View

#### To Be Added

- [ ] Make use of signals for making a notification system
> Will improve error handling
- [ ] Make use of loaders for indicating when article or audio fragments are being fetched
> Enhances user experience
- [ ] Add an API to fetch media
> Currently, any GET requests for APIs have the backend URL hidden, but for the media files, they're directly point to the backend URL. For more security enhancment, an endpoint can be establised for fetching the media from the backend, and serving them to the frontend acting as a proxy.
- [ ] Convery audio player to be a dragable modal in table & mobile view
> Enhances table & mobile experience
- [ ] Adding secret key for server-2-server request validation
> Currently, any client can fetch data from either server sides, adding this secret key along with the proxy implementation ensures that only these 2 servers can talk to each other (case deploying on serverless platforms) \
> Note: Firewalls can be implemented for such purposes if we're using a VPS 

<hr/>

## Backend

Express app enhanced with nextjs routing for Payload implementation acting as:
* API for serving data & media from the database
* CMS for managing content

### Tech Stack
* Express JS
* Next JS Route Handler (for managing routes and not implementing from scratch)
* Supabase (for database)
* Vercel Blob Storage (for media uploads)
* Payload CMS (for CRUD operations)

### Installation

1. **Env** file setup
	* `PAYLOAD_SECRET`: string
	* `DATABASE_URI`: string
	* `BLOB_READ_WRITE_TOKEN`: string

### Endpoints
* `/front-api/get-podcasts`: 
	> Method: **GET** \
			Res: 200 | 500
	
	> **Res-body**
	```json
	{ 
		"data": ["..."] 
	}
	```

* `/front-api/get-article`: 
	> Method: **GET** \
			Res: 200 | 500

	> **Params**: \
		id: string

	> **Res-Body**
	```json
	{ 
		"data": ["..."] 
	}
	```