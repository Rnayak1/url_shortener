# URL Shortener API

A url shortener API made with NodeJS, ExpressJS, Passport and MongoDB

## Endpoints:

### Registration:

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

### Authentication:

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

### Verify

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

### Generate

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

Authentication required, returns a [ShortUrl](#shorturl)

Required feilds: `orignal`

### Redirect

`POST /getlink`
```JSON
  {
    "url" : {
      "hashLink"  : "url"
    }
  }
```
No Authentication Required, redirect to mapped big url

Required feilds: `hashLink`

### Get Redirects

`GET /redirects`

Authentication Required, returns a [Redirects](#redirects)


## Configuration
> see .sample-env file

