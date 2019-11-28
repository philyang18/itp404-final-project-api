const express = require('express');
const cors = require('cors');
const app = express();

// const { ENVIRONMENT, PORT } = process.env;
// const IS_DEVELOPMENT = ENVIRONMENT === 'development';

// middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000' //IS_DEVELOPMENT ?  xx : 'https://dtang-react-crud.surge.sh'
}));

const db = {
    favorites: {
        mars: [
            {
                id: "FLB_622990123EDR_F0763002FHAZ00341M_.JPG",
                url: "https://mars.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/02540/opgs/edr/fcam/FLB_622990123EDR_F0763002FHAZ00341M_.JPG",
                comment: "ipsum these"
            },
            {
                id: "FRB_622990123EDR_F0763002FHAZ00341M_.JPG",
                url: "https://mars.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/02540/opgs/edr/fcam/FRB_622990123EDR_F0763002FHAZ00341M_.JPG",
                comment: "ipsum these"
            },
            {
                id: "FLB_622990123EDR_F0763002FHAZ00341M_.JPG",
                url: "https://mars.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/02540/opgs/edr/fcam/FLB_622990123EDR_F0763002FHAZ00341M_.JPG",
                comment: "ipsum these"
            }
        ],
        apod: [
            {
                id: "VenJup191124_jcc_2000.jpg",
                url: "https://apod.nasa.gov/apod/image/1911/VenJup191124_jcc_2000.jpg",
                comment: "ipsum these"
            } ,
            {
                id: "NGC6995_Drudis_3942.jpg",
                url: "https://apod.nasa.gov/apod/image/1911/NGC6995_Drudis_3942.jpg",
                comment: "ipsum these"
            },
            {
                id: "Hoag_HubbleBlanco_3000.jpg",
                url: "https://apod.nasa.gov/apod/image/1911/Hoag_HubbleBlanco_3000.jpg",
                comment: "liked"
            }
        ]  
    }
}

app.get("/api/favorites", (request, response) => {
    response.json(db.favorites);
});
app.get("/api/favorites/mars", (request, response) => {
    response.json(db.favorites.mars);
});

app.get("/api/favorites/apod", (request, response) => {
    response.json(db.favorites.apod);
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
    // post.id = db.favorites.mars.length + 1;
    db.favorites.mars.push(post);
    response.json(post);
});

app.post("/api/favorites/apod", (request, response) => {
    const post = request.body;
    // post.id = db.favorites.apod.length + 1;
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
    const id = request.params.id;

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

// app.delete("/api/favorites/apod/:url", (request, response) => {
//     const url = String(request.params.url);
    
//     const post = db.favorites.apod.find(post => {
//         return url === post.url;
//     });
//     response.json(post);
//     if (post) {
//         db.favorites.apod = db.favorites.apod.filter(post => {
//             return post.url !== url;
//         });
//         response.status(204).send();
//     } else {
//         response.status(404).send();
//     }
// });
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

app.listen(process.env.PORT || 8000);