# URL Shortener API

A url shortener API made with NodeJS, ExpressJS, Passport and MongoDB

## Endpoints:

### User Registeration:

`POST /register`

Example request body:

```JSON
{ 
  "user" : {
    "username" : "name",
    "email"  : "email",
    "password" : "password",
    "contact" : "contactNo"
  }
}
```
> Response
  ```JSON
    - On Success
    {
      "status": "success",
      "message": "Please verify your email id"
    }

    - On error
    {
      "error": "true",
      "message": "error message"
    }
  ```
Required fields: `email`, `firstname`, `password`,`contact number`,`name`

### User Login:

`POST /login`

Example request body:

```JSON
{
  "user" : {
    "email"  : "email",
    "password" : "password"
    }
}
```
> Return 
```JSON
    {
      "status": "success/error",
      "message": "server token on success else error message",
      "username": "username of user"
    }
```

Required fields: `email`, `password`

### User Verification

`POST /verify`

Example request body:

```JSON
{
  "token" : {
    "token"  : "token recieved in query"
    }
}
```
> Return 
```JSON
    {
      "status": "success/error",
      "message": "verified on success else error message"
    }
```

### Generate Short URL

`POST /generate`

Example request body:

```JSON
{
  "url" : {
  "orignal"  : "orignal list to short",
  "passed" : "short url if passed"
}
}
```
> Return 
```JSON
    {
      "status": "success/error",
      "message": "short Url on success else error message"
    }
```


`Authentication required`, returns a [ShortUrl](#shorturl)

Required feilds: `orignal`

### Get Orignal Url 

`POST /getlink`
```JSON
  {
    "url" : {
      "hashLink"  : "url"
    }
  }
```
> Return 
```JSON
    {
      "status": "success/error",
      "message": "redirect Url on success else error message"
    }
```

No Authentication Required, redirect to mapped big url

Required feilds: `hashLink`


### Get All Url for Specific User

`POST /getalllink`

> No input require
> Return 
```JSON
    {
      "status": "success/error",
      "message": "array of url(s) on success else error message"
    }
```

`Authentication Required`, return all url for user informaition provided

Required feilds: `hashLink`

## Configuration
> see .sample-env file

