# Sample Queries


### List of all tags
```
{
  tags{
    id
    name
    description
    colorCode
  }
}
```

### Tag by ID

```
{
  tag(id: "6007230a77929425708988e7") {
    id
    name
    description
    colorCode
  }
}
```

### Add a tag

```
mutation {
  addTag(name:"tag name", description:"tag description" colorCode: "ffffff"){
    id
    name
    description
    colorCode
    
  }
}
```


### List of all links
```
{
  links {
    id
    URL
    description
  }
}
```

### Link by ID
```
{
  link(id: "6007230a77929425708988e7") {
    URL
    description
    userId
  }
}
```


### Add a link

```
mutation {
  addLink(URL:"link url", description:"link description" userId: "user id"){
    id
    URL
    description
    userId
  }
}
```

### Add a user

```
mutation {
  addUser(userName:"usera", email:"usera@abc.com" firstName: "usera" lastName: "the first" password:"dont look its plaintext" avatar:"my pic" active: true){
    id
    
  }
}
```

### List Users

```
{
  users{
    id
    userName
    firstName
    lastName
    avatar
    active
}
}
```

