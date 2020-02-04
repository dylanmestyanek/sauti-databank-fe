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

  useEffect(() => {
    setCsvFormattedData(csvFormater(props.csvData))
    setCsvHeaders(headers(props))
    setCsvFilename(csvName(props))
  }, [props.csvData])
  console.log('filename', csvFilename)

  return (
    <div className="Graph-Container">
      <div className='dwnld-btn'>
        <CsvDownloader
          datas={csvFormattedData}
          columns={csvHeaders}//required: the headers(keys from data) determines the columns. WIthout them, the values aren't inserted.
          filename={csvFilename}
          suffix={`${new Date().toISOString()}`}//adds to the filename
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