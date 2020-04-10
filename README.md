ADD QUERY
mutation {
  addLogo (
    text: "Debugging Enterprises",
    color: "#ff33dd",
    backgroundColor: "#ffffff",
    borderColor: "#ffffff",
    borderThickness: 25,
    borderRadius: 25,
    padding: 25,
    margin: 25
    fontSize: 44
  ) {
    lastUpdate
  }
}

GET ALL QUERY
{
  logos {
    _id
    text
    color
    fontSize
    lastUpdate
    backgroundColor
    borderColor
    borderThickness
    borderRadius
    padding
    margin
  }
}

GET QUERY
{
  logo(id: "5e90b7b39094952becb1db08") {
    _id
    text
    color
    fontSize
    lastUpdate
    backgroundColor
    borderColor
    borderThickness
    borderRadius
    padding
    margin
  }
}

UPDATE LOGO
mutation {
  updateLogo (
    id: "5e90b7b39094952becb1db08",
    text: "Debugging Enterprises",
    color: "#ff33dd",
    backgroundColor: "#ffffff",
    borderColor: "#ffffff",
    borderThickness: 25,
    borderRadius: 25,
    padding: 25,
    margin: 25
    fontSize: 44
  ) {
    lastUpdate
  }
}

REMOVE LOGO
mutation {
  removeLogo (id: "5e90b7b39094952becb1db08") {
    _id
  }
}

