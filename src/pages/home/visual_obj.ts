class visual_obj{
    _data;

    constructor(data: Object, types: string[]){
        for (let s of types){
            let arr: number[];
            this._data[s] = arr;
        }
        console.log(this._data);
    };


}