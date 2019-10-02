import arraySort from 'array-sort'
import BaseObject from './base_object';

class MembersRole extends BaseObject{
  constructor(attributes){
    super(attributes)
  }

  static make_date(year,month,day,default_years_from_now = 0){
    var date = new Date()
    if(!day){
      day = 1
    }
    if(!month){
      month = 1
    }
    if(!year){
      year = 1900 + date.getYear() + default_years_from_now
    }
    console.log(year,month,day)
    // we have to reduce the month by one to work with Date
    return new Date(year, month-1, day)
  }

  static readable_date(year,month,day){
    var string = ""
    if (day){
      string += day.toString()
      string += " "
    }
    if (month){
      string += window.I18n.translations[window.I18n.locale].date.abbr_month_names[month]
      string += " "
    }
    if (year){
      string += year.toString()
    }
    return string
  }

  static sortAndGroupByRoleName(members_roles){
    const sort_mr = function(a,b){
      return (a.isCurrent() ? new Date() : a.end_date()) > (b.isCurrent() ? new Date() : b.end_date())
    }
    members_roles = arraySort(members_roles, sort_mr);
    var grouped_members_roles = members_roles.reduce((roles, members_role) => {
      var key = members_role.role.name;
      roles[key] = roles[key] || [];
      roles[key].push(members_role);
      return roles;
    }, {});
    //console.log(members_roles)

    var keys = arraySort(Object.keys(grouped_members_roles),function(a,b){
      var a_value = (a.match(/lead|i\/c|I\/C|head/i) ? "1" + a : "0" + a)
      var b_value =  (b.match(/lead|i\/c|head/i) ? "1" + b : "0" + b)
      //console.log(a_value, b_value);
      a_value > b_value
    })
    var sorted = {}
    keys.map(k => {
      sorted[k] = grouped_members_roles[k].sort(function(a,b){
        return (b.isCurrent() ? new Date() : b.end_date(1000)) - (a.isCurrent() ? new Date() : a.end_date(1000))
      })
    })
    return sorted;
  }

  static sortRolesByName(role_names){
    return arraySort(role_names,function(a,b){
      var a_value = (a.match(/lead|i\/c|I\/C|head/i) ? "1" + a : "0" + a)
      var b_value =  (b.match(/lead|i\/c|head/i) ? "1" + b : "0" + b)
      //console.log(a_value, b_value);
      return b_value.localeCompare(a_value)
    })
  }

  start_date(default_years_from_now = 0){
    return this.constructor.make_date(this.startYear, this.startMonth, this.startDay,default_years_from_now)
  }

  end_date(default_years_from_now = 0){
    return this.constructor.make_date(this.endYear, this.endMonth, this.endDay,default_years_from_now)
  }


  isCurrent(){
    return (this.start_date(-2000) <= new Date() && this.end_date(2000) > new Date());
  }

  isFuture(){
    return (this.start_date() > new Date());
  }


  tidyDates(){
    var start = this.constructor.readable_date(this.startYear, this.startMonth, this.startDay);
    var end = this.constructor.readable_date(this.endYear, this.endMonth, this.endDay);
    return (start.length > 0 ? start : "?") + " - " + (end.length > 0 ? end : "?")
  }





}

export default MembersRole
