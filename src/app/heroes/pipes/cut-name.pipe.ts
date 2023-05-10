import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'cutNamePipe'
})

export class cutNamePipe implements PipeTransform {
    transform(name: any): any {
        let arrName = name.split(' ')
        if(name[0] == ' '){ 
            let newSplit = name.split(' ', 3)
            if(newSplit.length > 1 && newSplit[0] != undefined){
                return newSplit[1] + ' ' + newSplit[2]
            }else { return name }
        }
        else if(arrName.length > 1 && arrName[0] != undefined){
            return arrName[0] + ' ' + arrName[1]
        }else { return name }
        
    }
}