import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  array;

  transform(data:any[] , searchTerm: string ): any[] {
    if(!searchTerm)
    {
      return data;
    }
    else
    {
      this.array = (data.filter(obj=>(obj.title.toUpperCase().indexOf(searchTerm.toUpperCase())!==-1)||obj.activity.toUpperCase().indexOf(searchTerm.toUpperCase())!==-1))
      return this.array;
    }
  }

}


