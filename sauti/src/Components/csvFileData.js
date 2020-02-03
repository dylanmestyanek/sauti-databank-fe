//This func creates an array of headers(column titles/labels) for CSV download by extracting keys from data. Pass in CsvData when calling this func as it contains all data before being sliced or numbers changed to percentages. 
export let headers = (data) => {
    let allHeaders = [];
    if (!data.crossFilter) {
      allHeaders = [data.index];
      allHeaders.push({ id: `${data.sampleSize}`, displayName: `Sample Size: ${data.sampleSize}` })
    } 
    
    //crossfilter is "...data.keys". addFilter is added, too, to clarify that filters were implemented to data.
    else {
      allHeaders = [
        { id: `${data.index}`, displayName: `${data.index}` },
        ...data.keys,
        { id: `${data.additionalFilter}` },
        { id: `${data.sampleSize}`, displayName: `Sample Size: ${data.sampleSize}` }
      ]
    }
    return allHeaders;
}

// This func reassigns values so they're all in one column instead of cascading.
// Ex. Male: 10, Female : 11... "10" and "11" are one column because they eblong to genders, not diff columns for each gender.
export let csvFormater = (data) => {
if (data.additionalFilter) {
    data = data.map(obj => {
    let key = Object.keys(data.selectedCheckbox)[0];
    let val = Object.values(data.selectedCheckbox)[0];
    let o = Object.assign({}, obj);
    o[key] = val;
    return o;
    })
}
return data.map(obj=> {return Object.values(obj)}) 
}

//This creates filename assigned to csv file based on data and its filters.
export let csvName = (props) => {
    let fileName = '';
    fileName = `${props.index && props.index}${props.crossFilter && ('_by_' + props.crossFilter)}${props.additionalFilter && `_where_${props.additionalFilter}:(${Object.values(props.selectedCheckbox)[0]})`}`;
    return fileName;
}