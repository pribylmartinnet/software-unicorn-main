# PetHub Server

## Base rules

### Token 
After creating entity, is generating token. This token is for access updating and deleting.

### Admin token 
Admin token is defined in `env.js` file, this token is universal, so admin can update or delete everything.

## Video

### Create 
Video is creating in 2 steps. 
1) Create entity and set meta data

`POST: domain/video/create`

``{
"title": "Dogs",
"authorId": 3,
"tagIds": [1,2,4]
}``

Required is only `title`

Video can be created only if isset authorId and tagIds. 

Response example 

``{
"title": "Hunting dogs",
"authorId": 1,
"tagIds": [
1
],
"token": "25a858889b0379eaec2fb779ee4226c52f4e5394e73cfe7b3fac8891434b5e6c",
"id": 4
}``

You will need id and token to upload video

2) Upload video file (mp4 format only)

`POST: domain/video/upload`

Body type is form-data

``
{
    "id": "4",
    "token": "25a858889b0379eaec2fb779ee4226c52f4e5394e73cfe7b3fac8891434b5e6c",
    "file": ""
}
``

### GET

1) `GET: domain/video/get?id=1`

Response 

``
{
"title": "Cats and Dogs",
"authorId": 3,
"tagIds": [
3,
4
],
"token": "a9ed98da104da7aba18e438f21afc23facb8d6701b2f5e4bba32b9ac4bc1fef4",
"id": 1,
"path": "Storage/Videos/1.mp4"
}
``

2) `GET: domain/video/get-file?filepath=Storage/Videos/1.mp4`
`Filepath` is required
Response will contain file and Content-Type: video/mp4

### Delete
`POST: domain/video/delete`

``
{
"id": 2,
"token": "958530568f773be570f4a45bcc51ffffb7474596488914c5bba16147b26758a8aa62"
}
``
Both are required

### Get List

`POST: domain/video/list`

``
{
"filter": {
"field": "title",
"operator": "like",
"value": "Dogs"
},
"offset": {
"from": 0,
"to": 1
},
"order": "random"
}
``

You can use separated `filter`, `offset` and `order` or its combinations

### Update
`POST: domain/video/update`

``
"title": "Dogs",
"authorId": 3,
"tagIds": [1,2,4]
"id": 2,
"token": "4e1579b6e0b07514801793ec1ac97e0f544c357c377a702c06d70d5bb2817b99",
``

Required are `id` and `token` fields

## Tag

### Create
`POST: domain/tag/create`
``
{
"title": "Dogs"
}
``
`title` is required


### List
`POST: domain/tag/list`

``
{
"filter": {
"field": "title",
"operator": "like",
"value": "Dogs"
},
"offset": {
"from": 0,
"to": 1
},
"order": "random"
}
``

You can use separated `filter`, `offset` and `order` or its combinations


### Delete
`POST: domain/tag/delete`
``
{
"id": 2,
"token": "0398aab01dfdbdf9ffef8a29f2b6696a456f648ca76c1fa7b555cb3c4d0f0c2b"
}
``
Both are required


### Get
`GET: domain/tag/get?id=1`
`id` is required


## Author

### Create
`POST: domain/author/create`
``
{
"nickname": "Mary"
}
``
`title` is required


### List
`POST: domain/author/list`

``
{
"filter": {
"field": "title",
"operator": "like",
"value": "Dogs"
},
"offset": {
"from": 0,
"to": 1
},
"order": "random"
}
``

You can use separated `filter`, `offset` and `order` or its combinations


### Delete
`POST: domain/author/delete`
``
{
"id": 2,
"token": "0398aab01dfdbdf9ffef8a29f2b6696a456f648ca76c1fa7b555cb3c4d0f0c2b"
}
``
Both are required


### Get
`GET: domain/author/get?id=1`
`id` is required

### Update
`POST: domain/author/update`

``
{
"id": 3,
"token": "ff769956dc2fb6d032bb7e1ba7014d9db2f75fad1bf582a7efc5c3f0c534f93d",
"nickname": "Mary2"
}
``
