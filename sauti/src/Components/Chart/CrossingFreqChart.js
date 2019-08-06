import React from "react";
import { ResponsiveBar } from "@nivo/bar";

class CrossingFreqChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        data: [],
        keys: ["Daily", "Weekly", "Monthly", "Never"],
        color: "nivo",
        dailyPercent: 0,
        weeklyPercent: 0,
        monthlyPercent: 0,
        neverPercent: 0
    };
  }



componentDidMount() {

   this.getPercentages()
}

getCounts =   () => {

   let dailyCount =   this.props.distinctUsers.filter(u => u.crossing_freq === "Daily").length;
 let weeklyCount =   this.props.distinctUsers.filter(u => u.crossing_freq === "Weekly").length;
 let monthlyCount =  this.props.distinctUsers.filter(u => u.crossing_freq === "Monthly").length;
  let neverCount =  this.props.distinctUsers.filter(u => u.crossing_freq === "Never").length;
  return [dailyCount, weeklyCount, monthlyCount, neverCount]
     
  }

getPercentages = () => {
    //  const cleanedData = this.props.distinctUsers.filter(u => u.crossing_freq === null)
    // // console.log("CLEAN", cleanedData.length)
    //  console.log("OLD", this.props.distinctUsers)

     const totalCount = this.getCounts().reduce((a,b) => a + b)

      // let totalCount = dailyCount + weeklyCount + monthlyCount + neverCount;
      let dailyPercent = Math.round((this.getCounts()[0] / totalCount) * 100);
      let weeklyPercent = Math.round((this.getCounts()[1] / totalCount) * 100);
      let monthlyPercent = Math.round((this.getCounts()[2] / totalCount) * 100);
      let neverPercent = Math.round((this.getCounts()[3] / totalCount) * 100);
    
      this.setState({
          ...this.state,
          dailyPercent: dailyPercent,
          weeklyPercent: weeklyPercent,
          monthlyPercent: monthlyPercent,
          neverPercent: neverPercent,
      }, () => {
        this.setState({
          ...this.state,
          data: [
              {   Frequency: "Daily",
                  Daily: this.state.dailyPercent,
                  DailyColor: "hsl(65, 70%, 50%)",
                },
                {
                  Frequency: "Weekly",
                  Weekly: this.state.weeklyPercent,
                  WeeklyColor: "hsl(65, 70%, 50%)",
                },
                {
                  Frequency: "Monthly",
                  Monthly: this.state.monthlyPercent,
                  MonthlyColor: "hsl(65, 70%, 50%)",
                },
                {
                  Frequency: "Never",
                  Never: this.state.neverPercent,
                  NeverColor: "hsl(65, 70%, 50%)",
                }
          ],
      })  
      })

   

 }

  
  render() {
    // const genderOptions = ["All", "Male", "Female"];
    // const yearOptions = ["All", "Daily", "Weekly", "Monthly", "Never"]

    return (
      <div className="Chart">
        <h2>
          Border Crossing Frequency
        </h2>
        <ResponsiveBar
          data={this.state.data} // Data needed
          keys={this.state.keys} // Values to display in Y axis
          indexBy="Frequency"
          margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
          padding={0.3}
          groupMode="stacked"
          colors={{ scheme: this.state.color }}
          borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
          maxValue={100}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Border Crossing Frequency",
            legendPosition: "middle",
            legendOffset: 30
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "%",
            legendPosition: "middle",
            legendOffset: -40
          }}
          labelSkipWidth={12}
          labelSkipHeight={12}
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
  }
}

export default CrossingFreqChart;