import BaseObject from './base_object';

const ADULT_CUT_OFF_AGE_SECONDS = (3600 * 24 * 365 * 21)

class Member extends BaseObject{
  constructor(attributes){
    super(attributes)
  }

  family_members(){
    if(this.family){
      return this.family.members.filter(m => m.id !== this.id).map(m => new Member(m))
    } else {
      return []
    }

  }

  isAdult(){
    if(this.isParent){
      return true
    }
    if(this.dateOfBirth && this.dateOfBirth > ((new Date() / 1000) - ADULT_CUT_OFF_AGE_SECONDS)){
      return false
    }
    return true
  }

  parents(){
    if(!this.isAdult()){
      var definite_parents = this.family_members().filter(m => m.isParent)
      if(definite_parents.length > 0){
        return definite_parents
      } else {
        return this.family_members().filter(m => m.isAdult())
      }
    } else {
      return []
    }

  }

}

export default Member
