function buildmetadata(sample) {
    
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then(data => {
        
        let meta = data.metadata;
        let Array = meta.filter(sampleObj => sampleObj.id == sample);
        let result = Array[0];

        
        let DemoInfo = d3.select("#sample-metadata");

        DemoInfo.html("");

        for (let key in result) {
            DemoInfo.append("h6").text(`${key}: ${result[key]}`);
        }
    }).catch(error => {
        console.error("Error", error);
    });
}



function buildCharts(sample) {
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then(data => {
        let samp = data.samples;
        let Array = samp.filter(sampleObj => sampleObj.id == sample);
        let result = Array[0];

        let ids = result.otu_ids;
        let labels = result.otu_labels;
        let values = result.sample_values;

        let bubbleLayout = {
            title: "Bacteria Cultures Per Sample",
            margin: { t: 0, b: 30 },
            hovermode: "closest",
            xaxis: { title: 'OTU ID' },
        };

        let bubbleData = [{
            x: ids,
            y: values,
            text: labels,
            mode: "markers",
            marker: {
                size: values,
                color: ids,
                colorscale: 'Earth'
            }
        }];

        Plotly.newPlot("bubble", bubbleData, bubbleLayout);

        
        let yticks = ids.slice(0, 10).map(otuID => `OTU ${otuID}`);
        let barData = [
            {
                y: yticks,
                x: values.slice(0, 10).reverse(),
                text: labels.slice(0, 10).reverse(),
                type: "bar",
                orientation: "h"
            }
        ];

        let barLayout = {
            title: "Top 10 Bacteria Found",
            margin: { t: 30, l: 150 }
        };

        Plotly.newPlot("bar", barData, barLayout);
    }).catch(error => {
        console.error("Error", error);
    });
}

function init() {

    let selector = d3.select("#selDataset"); 

    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then(data => {
        let names = data.names;

        for (let i = 0; i < names.length; i++){
            selector
                .append("option")
                .text(names[i])
                .property("value", names[i]); 
        };

        let firstSample = names[0];
        buildCharts(firstSample);
        buildmetadata(firstSample);
    }).catch(error => {
        console.error("Error initializing:", error);
    });
}

function optionChanged(newSample) {
    buildCharts(newSample);
    buildmetadata(newSample);
}

init();