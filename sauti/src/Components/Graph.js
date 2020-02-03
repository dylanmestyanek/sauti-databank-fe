import React, { useState, useEffect } from "react";
import { ResponsiveBar } from "@nivo/bar";
import CsvDownloader from 'react-csv-downloader';
import {headers, csvFormater, csvName} from './csvFileData';

const Graph = props => {
  const [csvHeaders, setCsvHeaders] = useState([]);
  const [csvFilename, setCsvFilename] = useState('');
  const [csvFormattedData, setCsvFormattedData] = useState([]);

  useEffect(() => {
    if (props.filteredData && props.checkboxOptions !== props.filteredData) {
      props.setCheckboxOptions(props.filteredData);
    }
  }, []);

  // //This func creates an array of headers(column titles/labels) for CSV download by extracting keys from data. Pass in CsvData when calling this func as it contains all data before being sliced or numbers changed to percentages.
  // let headers = (data) => {
  //   let allHeaders = [];
  //   if (!props.crossFilter) {
  //     allHeaders = [props.index];
  //     allHeaders.push({ id: `${props.sampleSize}`, displayName: `Sample Size: ${props.sampleSize}` })
  //   } else {
  //   //crossfilter is "...props.keys". addFilter is added, too, to clarify that filters were implemented to data.
  //     allHeaders = [
  //       { id: `${props.index}`, displayName: `${props.index}` },
  //       ...props.keys,
  //       { id: `${props.additionalFilter}` },
  //       { id: `${props.sampleSize}`, displayName: `Sample Size: ${props.sampleSize}` }
  //     ]
  //   }
  //   return allHeaders;
  // }

  // // This func reassigns values so they're all in one column instead of cascading.
  // // Ex. Male: 10, Female : 11... "10" and "11" are one column because they eblong to genders, not diff columns for each gender.
  // let csvFormater = (data) => {
  //   if (props.additionalFilter) {
  //     data = data.map(obj => {
  //       let key = Object.keys(props.selectedCheckbox)[0];
  //       let val = Object.values(props.selectedCheckbox)[0];
  //       let o = Object.assign({}, obj);
  //       o[key] = val;
  //       return o;
  //     })
  //   }
  //   return data.map(obj=> {return Object.values(obj)}) 
  // }

  // //This creates filename assigned to csv file based on data and its filters.
  let fileName = '';
  fileName = `${props.index && props.index}${props.crossFilter && ('_by_' + props.crossFilter)}${props.additionalFilter && `_where_${props.additionalFilter}:(${Object.values(props.selectedCheckbox)[0]})`}`

  useEffect(() => {
    setCsvFormattedData(csvFormater(props.csvData))
    setCsvHeaders(headers(props))
    setCsvFilename(csvName(props))
  }, [props.csvData])
  // console.log('csvdata', headers(props))

  return (
    <div className="Graph-Container">
      <div className='dwnld-btn'>
        <CsvDownloader
          datas={csvFormattedData}
          columns={csvHeaders}
          filename={csvFilename}
          suffix={`${new Date().toISOString()}`}
        ><button>Download⯆</button></CsvDownloader>
      </div>
      <ResponsiveBar
        data={props.data}
        keys={props.keys}
        indexBy={props.index}
        groupMode={props.groupMode} // Possibly add toggle selector to change group mode.
        margin={{ top: 50, right: 170, bottom: 75, left: 80 }}
        padding={0.3}
        innerPadding={3}
        maxValue={100}
        colors={{ scheme: "nivo" }}
        borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
        axisTop={null}
        axisRight={null}
        tooltip={({ id, value }) => (
          <strong
            style={{
              color: "#000000",
              fontSize: "15px",
              fontFamily: "Helvetica"
            }}
          >
            {id}: {value}%
          </strong>
        )}
        labelFormat={d => <tspan y={-15}>{d}% </tspan>}
        labelForm={d => <text>{d}% </text>}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend:
            props.label +
            " (values as percent of total)," +
            ` sample size = ${props.sampleSize}`,
          legendPosition: "middle",
          legendOffset: 35
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Percentage", // Possibly toggle percentage or number in future release
          legendPosition: "middle",
          legendOffset: -60
        }}
        labelSkipWidth={0}
        labelSkipHeight={0}
        labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
        legends={[
          {
            dataFrom: "keys",
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: "left-to-right",
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
              {
                on: "hover",
                style: {
                  itemOpacity: 1
                }
              }
            ]
          }
        ]}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
      />
    </div>
  );
};

export default Graph;