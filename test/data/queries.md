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


