
class BaseObject {
  constructor(attributes){
    Object.keys(attributes).map(attribute => {
      this[attribute] = attributes[attribute]
    })
  }

}

export default BaseObject
