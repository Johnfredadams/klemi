import BaseObject from './base_object';

class Group extends BaseObject{
  constructor(attributes){
    super(attributes)
  }

  isYouthGroup(){
    var youth_match = new RegExp(window.I18n.t("youth"),"i");
    return (this.tags && this.tags.filter(t => t.name.match(youth_match)).length > 0)
  }

}

export default Group
