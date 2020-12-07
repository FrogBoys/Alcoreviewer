import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(values: any[], filterby: string): unknown {
    if(filterby != undefined){      
      return values.filter(function(beverage){
        return beverage.name.toLowerCase().includes(filterby.toLowerCase());
      });
    }
    else{
      return values;
    }
  }

}
