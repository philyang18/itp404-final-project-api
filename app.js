const express = require('express');
const cors = require('cors');
const app = express();

const { ENVIRONMENT, PORT } = process.env;
const IS_DEVELOPMENT = ENVIRONMENT === 'development';

// middleware
app.use(express.json());
app.use(cors({
  origin: IS_DEVELOPMENT ? 'http://localhost:3000' : 'https://dtang-react-crud.surge.sh'
}));

const db = {
    favorites: {
        mars: [
            {
                id: 1,
                url: "google.com",
                comment: "ipsum these"
            },
            {
                id: 2,
                url: "yahoo.com",
                comment: "ipsum these"
            }
        ],
        apod: [
            {
                id: 1,
                url: "facebook.com",
                comment: "ipsum these"
            } 
            {
                id: 2,
                url: "apple.com",
                comment: "ipsum these"
            } 
        ]  
    }
}

app.get("/api/favorites", (request, response) => {
    response.json(db.favorites);
});

app.get("/api/favorites/mars/:id", (request, response) => {
    const id = Number(request.params.id);
    const post = db.favorites.mars.find((post) => {
        return post.id === id;
    });
    
    if(post) {
        response.json(post);
    } else {
        response.status(404).send();
    }
});

app.get("/api/favorites/apod/:id", (request, response) => {
    const id = Number(request.params.id);
    const post = db.favorites.apod.find((post) => {
        return post.id === id;
    });
    
    if(post) {
        response.json(post);
    } else {
        response.status(404).send();
    }
});

app.post("/api/favorites/mars", (request, response) => {
    const post = request.body;
    post.id = db.favorites.mars.length + 1;
    db.favorites.mars.push(post);
    response.json(post);
});

app.post("/api/favorites/apod", (request, response) => {
    const post = request.body;
    post.id = db.favorites.apod.length + 1;
    db.favorites.apod.push(post);
    response.json(post);
});

app.delete("/api/favorites/mars/:id", (request, response) => {
    const id = Number(request.params.id);

    const post = db.favorites.mars.find(post => {
        return id === post.id;
    });
    if (post) {
        db.favorites.mars = db.favorites.mars.filter(post => {
            return post.id !== id;
        });
        response.status(204).send();
    } else {
        response.status(404).send();
    }
});

app.delete("/api/favorites/apod/:id", (request, response) => {
    const id = Number(request.params.id);

    const post = db.favorites.apod.find(post => {
        return id === post.id;
    });
    if (post) {
        db.favorites.apod = db.favorites.apod.filter(post => {
            return post.id !== id;
        });
        response.status(204).send();
    } else {
        response.status(404).send();
    }
});

app.put("/api/favorites/mars/:id", (request, response) => {
    const id = Number(request.params.id);
    const post = db.favorites.mars.find( post => {
        return post.id === id;
    });
    if (post) {
        Object.assign(post, request.body);
        response.json(post);
    } else {
        response.status(404).send();
    }
});

app.put("/api/favorites/apod/:id", (request, response) => {
    const id = Number(request.params.id);
    const post = db.favorites.apod.find( post => {
        return post.id === id;
    });
    if (post) {
        Object.assign(post, request.body);
        response.json(post);
    } else {
        response.status(404).send();
    }
});

app.listen(PORT || 8000);