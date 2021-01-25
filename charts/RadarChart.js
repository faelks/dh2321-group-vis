import {useEffect, useState} from "react";
import * as d3 from "d3";
import { RadarChartLib } from './RadarChartLib';


var w = 500,
	h = 500;

// Legend titles
var LegendOptions = [];

//Options for the Radar chart, other than default
var mycfg = {
	w: w,
	h: h,
	maxValue: 0.6,
	levels: 6,
	ExtraWidthX: 300
}

//Data
var d = [];

function readAvg(avgData){
    LegendOptions.push("Average");
    var dItem = [];
    for (var prop in avgData) {
        dItem.push(
            {axis: prop, value: parseFloat(avgData[prop])}
        );
    }
    d.push(dItem);
}

// Select data with an array of alias
function selectData(data, aliasArr) {
	var dItemGroup = [];
	var avgItem = [];
    aliasArr.forEach(function (alias, _) {
        var dItem = data[alias];
        dItemGroup.push(dItem);
    });
    dItemGroup[0].forEach(function(axisItem, index) {
        avgItem.push({
            axis: axisItem.axis,
            value: d3.mean(dItemGroup.map(dItem => dItem[index].value))
        });
    });
    d.push(avgItem);
}

export default function RadarChart({data, avgData}) {
    const [group, setGrop] = useState(["NoobKiz", "Monokuma"]);
    readAvg(avgData);
    
    useEffect(() => {
        selectData(data, group);
        RadarChartLib.draw("#chart", d, mycfg);
    });
    return (
        <div id="chart"/>
    )
}

